import { text2page, image2page } from './core';
var PageWatermark = function (config, wmType) {
    // 添加水印
    var observe = wmType === 'image' ? image2page(config) : text2page(config);
    // 开始监控水印变化
    observe === null || observe === void 0 ? void 0 : observe.start();
    return {
        remove: function () {
            observe === null || observe === void 0 ? void 0 : observe.stop();
        }
    };
};
export default PageWatermark;
