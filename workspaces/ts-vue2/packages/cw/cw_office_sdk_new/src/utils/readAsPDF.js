import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.js?url';

// 设置 worker 路径
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
}

export default function readAsPDF(file) {
  let url = file;
  if (typeof file !== 'string') { 
    const blob = new Blob([file]);
    url = window.URL.createObjectURL(blob);
  }
  return pdfjsLib.getDocument(url).promise;
}
