var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createImage } from './createImage';
/**
 * @description 根据用户输入的水印配置，生成完整的水印配置
 *              0. 将string类型的target转换为图片dom元素
 *              1. 类型转换
 *              2. 填充默认配置
 * @param config 用户输入的配置
 * @returns 水印配置
 */
export var initConfig = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var dom, configs;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(typeof config.target === 'string')) return [3 /*break*/, 2];
                return [4 /*yield*/, createImage(config.target)];
            case 1:
                dom = _b.sent();
                if (!dom) {
                    throw new Error("An error occurred while loading image (src: ".concat(config.target, " )"));
                }
                config.target = dom;
                _b.label = 2;
            case 2:
                configs = {
                    target: config.target,
                    text: config.text || 'Sample Text',
                    image: config.image || '',
                    imageWidth: (config.imageWidth && Number(config.imageWidth)) || undefined,
                    imageHeight: (config.imageHeight && Number(config.imageHeight)) || undefined,
                    color: config.color || 'rgba(0, 0, 0, 0.07)',
                    fontSize: Number(config.fontSize) || 24,
                    zIndex: ((_a = config.zIndex) === null || _a === void 0 ? void 0 : _a.toString()) || '1000',
                    cSpace: Number(config.cSpace) || 0,
                    vSpace: Number(config.vSpace) || 0,
                    angle: Number(config.angle) || -25,
                    secret: config.secret || false,
                    position: config.position || 'repeat',
                    style: config.style || {},
                    onchange: config.onchange || (function () { return console.log('watermark.onchange'); }),
                    onerror: config.onerror || (function () { return console.log('watermark.onerror'); }),
                    success: config.success || (function () { return console.log('watermark.success'); }),
                };
                return [2 /*return*/, configs];
        }
    });
}); };
