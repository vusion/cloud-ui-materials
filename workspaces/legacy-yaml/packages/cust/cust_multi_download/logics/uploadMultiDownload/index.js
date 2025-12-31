/** 
 * @param {string} scopeConfig <true> 自定义作用域
 * @param {string} componentName <true> 组件名
 * @param {boolean} isZip <false> 是否打包成压缩包下载
 * @returns {string} result 
 */
import download from 'downloadjs';
import JSZip from 'jszip';

export default (scopeConfig, componentName, isZip = false) => {
  try {
    const component = scopeConfig && scopeConfig.$refs[componentName];
    const fileList = component.currentValue;
    if (fileList && fileList.length > 0) {
      if (isZip) {
        const zip = new JSZip();
        fileList.forEach((item) => {
          zip.file(item.name, item.url);
        });
        zip.generateAsync({
          type: 'blob'
        }).then((content) => {
          download(content, 'files.zip');
        });
      } else {
        fileList.forEach((item) => {
          download(item.url, item.name);
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};