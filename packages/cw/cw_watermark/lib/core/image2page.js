import { createWatermark, observeWatermark } from '../utils';
/**
 * @description 向页面中添加图片水印
 * @param config 水印配置
 * @return 监视器observe
 */
export var image2page = function (config) {
    var watermark = createWatermark(config);
    var observe = observeWatermark(watermark, config);
    return observe;
};
