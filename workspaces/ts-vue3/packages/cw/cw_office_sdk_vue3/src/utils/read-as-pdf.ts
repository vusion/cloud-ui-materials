import './pdf-worker';
import { pdfjsLib } from './pdf-worker';

export default function readAsPDF(file: string | Blob | File | ArrayBuffer) {
  let url: string = file as string;
  if (typeof file !== 'string') {
    const blob = new Blob([file]);
    url = window.URL.createObjectURL(blob);
  }
  return pdfjsLib.getDocument(url).promise;
}
