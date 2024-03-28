export default function readAsPDF(file) {
  const pdfjsLib = require('pdfjs-dist');
  const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  let url = file;
  if (typeof file !== 'string') { 
    const blob = new Blob([file]);
    url = window.URL.createObjectURL(blob);
  }
  return pdfjsLib.getDocument(url).promise;
}
