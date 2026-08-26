import '@nasl/types';
import axios from 'axios';
import type { PDFPageProxy } from 'pdfjs-dist';
import readAsPDF from '@/utils/read-as-pdf';

/**
 * @NaslLogic
 * @type both
 * @title 上传pdf文件的第一页
 * @description 上传pdf文件的第一页
 * @param file 上传文件信息
 * @param uploadUrl 上传文件url
 * @returns result
 */
export async function uploadPdfFirstPage(
  file: nasl.core.String,
  uploadUrl: nasl.core.String = '/gateway/lowcode/api/v1/app/upload',
): Promise<nasl.core.String> {
  let res: string | null = null;
  const uploadFile = file as unknown as File;
  if (uploadFile.type !== 'application/pdf') {
    console.log('文件类型错误');
    return '文件类型错误';
  }

  const pdfDocument = await readAsPDF(uploadFile);
  if (pdfDocument && pdfDocument.numPages > 0) {
    const firstPage = await pdfDocument.getPage(1);
    try {
      res = await uploadCanvasAsFile(firstPage, String(uploadUrl));
    } catch {
      console.log('upload error');
    } finally {
      const canvasNode = document.querySelector('.pdf-canvas-renderer');
      canvasNode && document.body.removeChild(canvasNode);
    }
  }
  return res as nasl.core.String;
}

function getCookie(cname: string) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

function uploadCanvasAsFile(page: PDFPageProxy, uploadUrl: string) {
  return renderCanvas(page).then(() => {
    const canvas = document.querySelector('.pdf-canvas-renderer') as HTMLCanvasElement;
    return new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject('blob error');
          return;
        }
        const authorization = getCookie('authorization');
        const upload = new File([blob], 'firstPage.png', { type: 'image/png' });
        const formData = new FormData();
        const headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: authorization,
        };
        formData.append('file', upload);
        axios.post(uploadUrl, formData, { headers }).then((response) => {
          if (response.data.code === 200) {
            resolve(response.data.result);
          } else {
            reject(response.data.message);
          }
        });
      });
    });
  });
}

async function renderCanvas(page: PDFPageProxy) {
  const canvas = document.createElement('canvas');
  canvas.style.display = 'none';
  canvas.classList.add('pdf-canvas-renderer');
  document.body.appendChild(canvas);
  const context = canvas.getContext('2d');
  if (!context) return;
  const viewport = page.getViewport({ scale: 1 });
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  return page.render({
    canvasContext: context,
    viewport,
  }).promise;
}
