/** 
 * @param {string} url <false>  图片地址
 * @param {string} compression <false> 清晰度0-1,默认1最清晰
 * @param {string} boundary <false> 边界值
 * @returns {string} result 
 */
export default async (url,compression=1,boundary=3000) => {
    async function loadImg(url) {
        var image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = url
        return  new Promise((resolve,reject) => {
            image.onload = function () {
              resolve(image)
            }
            image.onerror = function () {
                reject(new Error('Could not load image at ' + url));
            }
          })
    }
    const image = await loadImg(url)
    const canvas = document.createElement('canvas')
    if (image.width > Number(boundary)) {
      canvas.width = parseInt(image.width / 5) 
      canvas.height =  parseInt(image.height / 5)
    } else {
      canvas.width = image.width;
      canvas.height = image.height;
    }

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, canvas.width, canvas.height); 
    var base64Data = canvas.toDataURL("image/jpeg", Number(compression))
    return base64Data
}