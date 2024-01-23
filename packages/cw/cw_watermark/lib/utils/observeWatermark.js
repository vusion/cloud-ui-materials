/**
 * @description 监控水印的dom元素，防止被改变
 * @param watermark 水印dom元素
 * @param config 水印配置
 * @returns 监视器observe，配有remove方法，可以删除水印
 */
export var observeWatermark = function (watermark, config) {
    var onchange = config.onchange, success = config.success;
    var observe = new Guard(watermark, onchange);
    success();
    return observe;
};
var Guard = /** @class */ (function () {
    function Guard(watermark, onchange) {
        var _this = this;
        this.watermark = watermark;
        this.onchange = onchange;
        this._callback = function (mutationsList) {
            var needRestart = false;
            for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                var mutation = mutationsList_1[_i];
                if (mutation.type === 'childList') {
                    for (var i = 0; i < mutation.removedNodes.length; i++) {
                        if (mutation.removedNodes[i] === _this.watermark) {
                            needRestart = true;
                            break;
                        }
                    }
                }
                else if (mutation.target === _this.watermark) {
                    needRestart = true;
                }
                if (needRestart) {
                    _this.onchange(mutation);
                    _this._readdWatermark();
                    _this.start();
                    break;
                }
            }
        };
        // 获取watermark的父元素：监视的对象
        this.watermarkParent = this.watermark.parentElement;
        // 克隆一个watermark：当watermark被删除时添加watermarkClone
        this.watermarkClone = watermark.cloneNode(true);
    }
    Guard.prototype.start = function () {
        var config = { characterData: true, attributes: true, childList: true, subtree: true };
        this.observer = new MutationObserver(this._callback);
        if (!this.observer) {
            throw new Error("Not exist: new MutationObserver()");
        }
        this.observer.observe(this.watermarkParent, config);
    };
    Guard.prototype.stop = function () {
        this.observer.disconnect();
        this.watermark.remove();
    };
    // 重新添加水印dom
    Guard.prototype._readdWatermark = function () {
        var newWatermark = this.watermarkClone.cloneNode(true);
        this.watermarkParent.appendChild(newWatermark);
        this.watermark = newWatermark;
        this.observer.disconnect();
        this.start();
    };
    return Guard;
}());
export { Guard };
