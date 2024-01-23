/**
 * @description 根据文字和字号，计算该文字在网页上的宽度和高度
 * @param text 文字内容
 * @param fontSize 字号
 * @returns 文字的宽高
 */
export var getTextSize = function (text, fontSize) {
    var _a;
    var result = { width: 0, height: 0 };
    var span = document.createElement('span');
    result.width = span.offsetWidth;
    result.height = span.offsetWidth;
    span.style.visibility = 'hidden';
    span.style.fontSize = fontSize + 'px';
    document.body.appendChild(span);
    if (span.textContent) {
        span.textContent = text;
    }
    else {
        span.innerText = text;
    }
    result.width = span.offsetWidth - result.width;
    result.height = span.offsetHeight - result.height;
    (_a = span.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(span);
    return result;
};
