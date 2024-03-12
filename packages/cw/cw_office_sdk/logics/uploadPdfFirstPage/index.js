/**
 * @param {string} file <true> 上传文件信息
 * @param {string} uploadUrl <false> 上传文件url
 * @returns {string} result
 */
import axios from "axios";
export default async (
  file,
  uploadUrl = "/gateway/lowcode/api/v1/app/upload"
) => {
  let res = null;
  if (file.type !== "application/pdf") {
    console.log("文件类型错误");
    return "文件类型错误";
  }

  const pdfDocument = await readAsPDF(file);
  if (pdfDocument && pdfDocument.numPages > 0) {
    const firstPage = await pdfDocument.getPage(1);
    // canvas --> blob --> file --> upload
    try {
      res = await uploadCanvasAsFile(firstPage, uploadUrl);
    } catch (e) {
      console.log("upload error");
    } finally {
      const canvasNode = document.querySelector(".pdf-canvas-renderer");
      canvasNode && document.body.removeChild(canvasNode);
    }
  }
  return res;
};
function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}
function uploadCanvasAsFile(page, uploadUrl) {
  return renderCanvas(page).then((_) => {
    const canvas = document.querySelector(".pdf-canvas-renderer");
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        const authorization = getCookie("authorization");
        const file = new File([blob], "firstPage.png", { type: "image/png" });
        const formData = new FormData();
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: authorization,
        };
        formData.append("file", file);
        axios.post(uploadUrl, formData, headers).then((response) => {
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

async function readAsPDF(file) {
  const pdfjsLib = require("pdfjs-dist");
  const pdfjsWorker = require("pdfjs-dist/build/pdf.worker.entry");
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);
  return pdfjsLib.getDocument(url).promise;
}

function renderCanvas(page) {
  const canvas = document.createElement("canvas");
  canvas.style.display = "none";
  canvas.classList.add("pdf-canvas-renderer");
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");
  const viewport = page.getViewport({ scale: 1 });
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  return page.render(renderContext).promise;
}
