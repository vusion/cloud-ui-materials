/**
 * @description 将图片dom元素转换成canvas
 * @param image 图片dom元素
 * @returns [canvas, Context]
 */
export var createCanvas = function (image) {
    var width = image.width, height = image.height;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error("Not exist: document.createElement('canvas').getContext('2d')");
    }
    ctx.drawImage(image, 0, 0, width, height);
    return [canvas, ctx];
};
