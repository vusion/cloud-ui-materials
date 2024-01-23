import { getTextSize, createCanvas } from '../utils';
/**
 * @description 向图片中添加文字水印
 * @param config 水印配置
 */
export var text2image = function (config) {
    if (config.secret) {
        // 暗水印
        drawEncryptedText(config);
    }
    else {
        // 明水印
        drawSurfaceText(config);
    }
};
var drawEncryptedText = function (config) {
    var _a = createCanvas(config.target), canvas = _a[0], ctx = _a[1];
    var width = canvas.width, height = canvas.height;
    var targetImageData = ctx.getImageData(0, 0, width, height);
    var textImageData = _getTextImageData(config, width, height);
    var watermarkImageData = _mergeImageData(targetImageData, textImageData);
    ctx.putImageData(watermarkImageData, 0, 0);
    var base64 = canvas.toDataURL();
    config.target.src = base64;
    config.success && config.success(base64);
};
var drawSurfaceText = function (config) {
    var _a = createCanvas(config.target), canvas = _a[0], ctx = _a[1];
    var textCanvas = _drawTextToCanvas(canvas, config)[0];
    var base64 = textCanvas.toDataURL();
    config.target.src = base64;
    config.success && config.success(base64);
};
var _getTextImageData = function (config, width, height) {
    var data = new ImageData(1, 1);
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error("Not exist: document.createElement('canvas').getContext('2d')");
    }
    var _a = _drawTextToCanvas(canvas, config), textCanvas = _a[0], textCtx = _a[1];
    data = textCtx.getImageData(0, 0, width, height);
    return data;
};
var _mergeImageData = function (targetData, textData) {
    var oData = targetData.data;
    var tData = textData.data;
    var bit = 0;
    var offset = 3;
    // switch (rgb) {
    //   case 'G':
    //     bit = 1
    //     offset = 2
    //     break
    //   case 'B':
    //     bit = 2
    //     offset = 1
    //     break
    //   default:
    //     bit = 0
    //     offset = 3
    // }
    for (var i = 0; i < oData.length; i++) {
        if (i % 4 === bit) {
            // 对目标通道：文字为空的地方 原图处理为偶数；文字不为空的地方，原图处理为奇数
            if (tData[i + offset] === 0 && oData[i] % 2 === 1) {
                // 文字为空为原图为奇数 -> 变为偶数
                if (oData[i] === 255) {
                    oData[i]--;
                }
                else {
                    oData[i]++;
                }
            }
            else if (tData[i + offset] !== 0 && oData[i] % 2 === 0) {
                // 文字不为空，原图为偶数 -> 变为奇数
                oData[i]++;
            }
        }
    }
    return targetData;
};
var _drawTextToCanvas = function (canvas, config) {
    var position = config.position, color = config.color, fontSize = config.fontSize, cSpace = config.cSpace, vSpace = config.vSpace, angle = config.angle, text = config.text;
    var targetClone = canvas.cloneNode(true);
    var width = targetClone.width, height = targetClone.height;
    var ctx = targetClone.getContext('2d');
    if (!ctx) {
        throw new Error("Not exist: document.createElement('canvas').getContext('2d')");
    }
    ctx.font = "".concat(fontSize, "px microsoft yahei");
    ctx.fillStyle = color;
    switch (position) {
        case 'center':
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, width / 2, height / 2);
            break;
        case 'topLeft':
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(text, 0 + cSpace, 0 + vSpace);
            break;
        case 'topRight':
            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            ctx.fillText(text, width - cSpace, 0 + vSpace);
            break;
        case 'bottomRight':
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            ctx.fillText(text, width - cSpace, height - vSpace);
            break;
        case 'bottomLeft':
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillText(text, 0 + cSpace, height - vSpace);
            break;
        default:
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var textWith = getTextSize(text, fontSize).width;
            var wmWidth = textWith + cSpace;
            var wmHeight = textWith + vSpace;
            ctx.translate(width / 2, height / 2);
            ctx.rotate((Math.PI / 180) * angle);
            var diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
            var w = -diagonal / 2;
            var h = -diagonal / 2;
            while (h < diagonal / 2) {
                while (w < diagonal / 2) {
                    ctx.fillText(text, w, h);
                    w += wmWidth;
                }
                w = -diagonal / 2;
                h += wmHeight;
            }
    }
    return [targetClone, ctx];
};
