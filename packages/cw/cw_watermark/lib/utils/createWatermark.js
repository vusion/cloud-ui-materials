var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @description 根据水印的配置生成水印元素，并添加到target中
 * @param config 水印配置
 * @returns 生成的水印元素
 */
export var createWatermark = function (config) {
    var watermark = document.createElement('div');
    watermark.className = 'l-watermark';
    var target = config.target, image = config.image, imageWidth = config.imageWidth, imageHeight = config.imageHeight, zIndex = config.zIndex, style = config.style;
    var wmStyle = __assign({ 'background-image': "url(".concat(image, ")"), position: target === document.body ? 'fixed' : 'absolute', top: '0px', right: '0px', bottom: '0px', left: '0px', 'pointer-events': 'none', 'background-repeat': 'repeat', 'background-size': "".concat(imageWidth, "px ").concat(imageHeight, "px"), 'z-index': zIndex, display: 'block', visibility: 'visible', width: '100%', height: '100%', opacity: '1', transform: 'none' }, style);
    var styleOrigin = '';
    for (var key in wmStyle) {
        styleOrigin += "".concat(key, ": ").concat(wmStyle[key], " !important; ");
    }
    watermark.setAttribute('style', styleOrigin);
    config.target.style.position = 'relative';
    config.target.appendChild(watermark);
    return watermark;
};
