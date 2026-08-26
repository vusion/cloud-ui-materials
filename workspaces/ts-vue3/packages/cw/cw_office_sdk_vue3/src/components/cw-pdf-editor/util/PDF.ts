import download from 'downloadjs';
import { PDFDocument } from 'pdf-lib';
import { readAsArrayBuffer } from './async-reader';
import { noop } from './helper';

type PdfObject = {
  type: string;
  file: Blob | File | string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function save(
  pdfFile: Blob | File,
  objects: PdfObject[][],
  name: string | number,
) {
  let pdfDoc;
  try {
    pdfDoc = await PDFDocument.load(await readAsArrayBuffer(pdfFile));
  } catch (e) {
    console.log('Failed to load PDF.', e);
    throw e;
  }
  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex] ?? [];
    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object) => {
      if (object.type === 'image') {
        const { file, x, y, width, height } = object;
        let img;
        try {
          if (typeof file === 'string' && file.startsWith('http')) {
            img = await pdfDoc.embedPng(await fetch(file).then((res) => res.arrayBuffer()));
          } else if ((file as File).type === 'image/jpeg') {
            img = await pdfDoc.embedJpg(await readAsArrayBuffer(file as Blob));
          } else {
            img = await pdfDoc.embedPng(await readAsArrayBuffer(file as Blob));
          }
          return () =>
            page.drawImage(img, {
              x,
              y: pageHeight - y - height,
              width,
              height,
            });
        } catch (e) {
          console.log('Failed to embed image.', e);
          return noop;
        }
      }
      return noop;
    });
    const drawProcesses = await Promise.all(embedProcesses);
    drawProcesses.forEach((p) => p());
  });
  await Promise.all(pagesProcesses);
  try {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, String(name), 'application/pdf');
  } catch (e) {
    console.log('Failed to save PDF.', e);
    throw e;
  }
}
