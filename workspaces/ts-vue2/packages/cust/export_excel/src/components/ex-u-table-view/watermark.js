/**
 * 设置水印
 * @param {string} text 水印文本
 * @param {string} imageBase64 水印图片base64
 * @param {number} textAlpha 水印文本透明度
 * @param {number} imageAlpha 水印图片透明度
 * @returns {Promise<string>} 返回水印的base64图片
 */
export function createWatermark(text, imageBase64, textAlpha = 0.2, imageAlpha = 1) {
  if (!text && !imageBase64) return Promise.resolve(null);

  const canvas = document.createElement('canvas');
  canvas.width = 500; // 增加画布宽度
  canvas.height = 500; // 增加画布高度
  const ctx = canvas.getContext('2d');

  // 设置文本样式
  ctx.font = '32px Vedana';
  ctx.fillStyle = `rgba(130, 142, 162, ${textAlpha})`; // 使用 textAlpha
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 添加旋转变换，使水印倾斜
  const angle = -Math.PI / 4; // 倾斜角度，例如 -45 度
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  if (text && imageBase64) {
    // 同时展示文本和图片水印
    const img = new Image();
    img.src = imageBase64;
    return new Promise(resolve => {
      img.onload = () => {
        // 计算图片缩放比例
        let imgWidth = img.width;
        let imgHeight = img.height;
        const maxImgWidth = canvas.width * 0.6;
        const maxImgHeight = canvas.height * 0.6;

        if (imgWidth > maxImgWidth || imgHeight > maxImgHeight) {
          const ratio = Math.min(maxImgWidth / imgWidth, maxImgHeight / imgHeight);
          imgWidth *= ratio;
          imgHeight *= ratio;
        }

        // 绘制文本
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.fillText(text, 0, imgHeight / 2 + 120); // 调整文本位置，增加间距
        ctx.restore();
        
        // 绘制图片
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.globalAlpha = imageAlpha; // 设置图片透明度
        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        ctx.restore();
        ctx.globalAlpha = 1; // 恢复全局透明度
        
        resolve(canvas.toDataURL('image/png'));
      };
      
      img.onerror = () => {
        // 图片加载失败，只绘制文本
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.fillText(text, 0, 0);
        ctx.restore();
        resolve(canvas.toDataURL('image/png'));
      };
    });
  } else if (text) {
    // 只展示文本水印
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.fillText(text, 0, 0);
    ctx.restore();
    return Promise.resolve(canvas.toDataURL('image/png'));
  } else if (imageBase64) {
    // 只展示图片水印
    const img = new Image();
    img.src = imageBase64;
    return new Promise(resolve => {
      img.onload = () => {
        let imgWidth = img.width;
        let imgHeight = img.height;
        const maxImgWidth = canvas.width * 0.8;
        const maxImgHeight = canvas.height * 0.8;

        if (imgWidth > maxImgWidth || imgHeight > maxImgHeight) {
          const ratio = Math.min(maxImgWidth / imgWidth, maxImgHeight / imgHeight);
          imgWidth *= ratio;
          imgHeight *= ratio;
        }
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.globalAlpha = imageAlpha; // 设置图片透明度
        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        ctx.restore();
        ctx.globalAlpha = 1; // 恢复全局透明度
        resolve(canvas.toDataURL('image/png'));
      };
      
      img.onerror = () => {
        resolve(null);
      };
    });
  }
}