import { getTextSize, createWatermark, observeWatermark } from '../utils';
/**
 * @description 向页面中添加文字水印
 * @param config 水印配置
 * @return 监视器observe
 */
export var text2page = function (config) {
    var canvas = document.createElement('canvas');
    var _a = getTextSize(config.text, config.fontSize), width = _a.width, height = _a.height;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = (width + config.cSpace) * dpr;
    canvas.height = (width + config.vSpace) * dpr;
    if (!ctx) {
        throw new Error("Not exist: document.createElement('canvas').getContext('2d')");
    }
    ctx.font = "".concat(config.fontSize, "px Microsoft YaHei");
    ctx.fillStyle = config.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((Math.PI / 180) * config.angle);
    ctx.scale(dpr, dpr);
    ctx.fillText(config.text, 0, 0);
    config.imageWidth = canvas.width / dpr;
    config.imageHeight = canvas.height / dpr;
    config.image = canvas.toDataURL();
    var watermark = createWatermark(config);
    var observe = observeWatermark(watermark, config);
    return observe;
};
