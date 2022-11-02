/*!
 *
 * SpreadJS Library 14.2.5
 *
 * Copyright(c) GrapeCity, Inc.  All rights reserved.
 *
 * Licensed under the SpreadJS Commercial License.
 * us.sales@grapecity.com
 * http://www.grapecity.com/en/licensing/grapecity/
 *
 *
 */
module.exports = function (GC) {
  var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['FloatingObjects'] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = '/assets/';
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/floatingObject/floatingobject.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/floatingObject/drawing/StatefulChartElementBase.js':
/*!*************************************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/StatefulChartElementBase.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });
var stateful_1 = __webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js');
var common_1 = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var keyword_null = null;
var StatefulChartElementBase = (function (_super) {
    __extends(StatefulChartElementBase, _super);
    function StatefulChartElementBase(p) {
        return _super.call(this, p) || this;
    }
    Object.defineProperty(StatefulChartElementBase.prototype, 'ChartFormat', {
        get: function () {
            var _this = this;
            if (common_1.UnitHelper.isNullOrUndefined(_this._format)) {
                _this._format = _this.GetDefaultFormat();
            }
            return _this._format;
        },
        set: function (value) {
            var _this = this;

            if (!common_1.UnitHelper.isNullOrUndefined(_this._format)) {
                _this._format.SetParentForChildren(value);
            }
            var _oldFormat = _this._format;
            _this._format = value;
            if (!common_1.UnitHelper.isNullOrUndefined(_oldFormat)) {
                _this._format.ParentStateful = _oldFormat.ParentStateful;
            }
        },
        enumerable: true,
        configurable: true
    });
    StatefulChartElementBase.prototype.CreateFormat = function () {
        return keyword_null;
    };
    StatefulChartElementBase.prototype.GetDefaultFormat = function () {
        return this.CreateFormat();
    };
    StatefulChartElementBase.prototype.GetFormatInternal = function () {
        return this._format;
    };
    StatefulChartElementBase.prototype.FromShapeProperties = function (sp ) {
        var _this = this;
        if (!common_1.UnitHelper.isNullOrUndefined(sp)) {
            if (common_1.UnitHelper.isNullOrUndefined(_this._format)) {
                _this._format = _this.CreateFormat();
            }
            _this._format.FromOOModel(sp);
        }
        else {
            _this.ClearFormat();
        }
    };
    StatefulChartElementBase.prototype.ToShapeProperties = function () {
        return !common_1.UnitHelper.isNullOrUndefined(this._format) ? this._format.ToOOModel() : keyword_null;
    };
    StatefulChartElementBase.prototype.Delete = function () {
        if (!common_1.UnitHelper.isNullOrUndefined(this._format)) {
            this._format.ParentStateful = keyword_null;
        }
    };
    StatefulChartElementBase.prototype.ClearFormat = function () {
        var _this = this;

        if (!common_1.UnitHelper.isNullOrUndefined(_this._format)) {
            _this._format.SetParentForChildren(keyword_null);
            _this._format.ParentStateful = keyword_null;
            _this._format = keyword_null;
        }
    };
    return StatefulChartElementBase;
}(stateful_1.StatefullBase));
exports.StatefulChartElementBase = StatefulChartElementBase;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/chart.ns.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/chart.ns.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(__webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js'));
__export(__webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js'));
__export(__webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js'));
__export(__webpack_require__(/*! ./color */ './dist/plugins/floatingObject/drawing/color.js'));
__export(__webpack_require__(/*! ./colorData */ './dist/plugins/floatingObject/drawing/colorData.js'));
__export(__webpack_require__(/*! ./colorFormat */ './dist/plugins/floatingObject/drawing/colorFormat.js'));
__export(__webpack_require__(/*! ./effects */ './dist/plugins/floatingObject/drawing/effects.js'));
__export(__webpack_require__(/*! ./fillFormat */ './dist/plugins/floatingObject/drawing/fillFormat.js'));
__export(__webpack_require__(/*! ./fontData */ './dist/plugins/floatingObject/drawing/fontData.js'));
__export(__webpack_require__(/*! ./fontFormat */ './dist/plugins/floatingObject/drawing/fontFormat.js'));
__export(__webpack_require__(/*! ./gradient */ './dist/plugins/floatingObject/drawing/gradient.js'));
__export(__webpack_require__(/*! ./lineFormat */ './dist/plugins/floatingObject/drawing/lineFormat.js'));
__export(__webpack_require__(/*! ./picture */ './dist/plugins/floatingObject/drawing/picture.js'));
__export(__webpack_require__(/*! ./threeDFormat */ './dist/plugins/floatingObject/drawing/threeDFormat.js'));
__export(__webpack_require__(/*! ./StatefulChartElementBase */ './dist/plugins/floatingObject/drawing/StatefulChartElementBase.js'));
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/color.js':
/*!******************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/color.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var common_1 = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var ColorHelper = Common_1.Common._ColorHelper;
var isNullOrUndefined = common_1.UnitHelper.isNullOrUndefined, keyword_null = null;
var ARGBColor = (function () {
    function ARGBColor(value, state, name, knownColor) {
        var _this = this;
        _this.value = value;
        _this.state = state;
        _this.name = name;
        _this.knownColor = knownColor;
    }
    ARGBColor.FromKnownColor = function (knownColor) {
        return new ARGBColor(0, ARGBColor.StateKnownColorValid, keyword_null, knownColor);
    };
    ARGBColor.FromIndexedColor = function (index, tint) {
        var IndexedColors = ARGBColor.IndexedColors;
        if (!IndexedColors) {
            IndexedColors = ARGBColor.IndexedColors = [
                0xff000000,
                0xffFFFFFF,
                0xffFF0000,
                0xff00FF00,
                0xff0000FF,
                0xffFFFF00,
                0xffFF00FF,
                0xff00FFFF,
                0xFF000000,
                0xffFFFFFF,
                0xffFF0000,
                0xff00FF00,
                0xff0000FF,
                0xffFFFF00,
                0xffFF00FF,
                0xff00FFFF,
                0xff800000,
                0xff008000,
                0xff000080,
                0xff808000,
                0xff800080,
                0xff008080,
                0xffC0C0C0,
                0xff808080,
                0xff9999FF,
                0xff993366,
                0xffFFFFCC,
                0xffCCFFFF,
                0xff660066,
                0xffFF8080,
                0xff0066CC,
                0xffCCCCFF,
                0xff000080,
                0xffFF00FF,
                0xffFFFF00,
                0xff00FFFF,
                0xff800080,
                0xff800000,
                0xff008080,
                0xff0000FF,
                0xff00CCFF,
                0xffCCFFFF,
                0xffCCFFCC,
                0xffFFFF99,
                0xff99CCFF,
                0xffFF99CC,
                0xffCC99FF,
                0xffFFCC99,
                0xff3366FF,
                0xff33CCCC,
                0xff99CC00,
                0xffFFCC00,
                0xffFF9900,
                0xffFF6600,
                0xff666699,
                0xff969696,
                0xff003366,
                0xff339966,
                0xff003300,
                0xff333300,
                0xff993300,
                0xff993366,
                0xff333399,
                0xff333333,

                ARGBColor.FromKnownColor(KnownColor.WindowText).ToArgb(),

                ARGBColor.FromKnownColor(KnownColor.Window).ToArgb()
            ];
        }
        return ARGBColor.FromArgb(IndexedColors[index]).GetTintColor(tint);
    };
    ARGBColor.FromArgb = function (argb) {
        return new ARGBColor(argb, ARGBColor.StateARGBValueValid, keyword_null, 0);
    };
    ARGBColor.FromArgbs = function (alpha, red, green, blue) {
        ARGBColor.CheckByte(alpha, 'alpha');
        ARGBColor.CheckByte(red, 'red');
        ARGBColor.CheckByte(green, 'green');
        ARGBColor.CheckByte(blue, 'blue');
        return new ARGBColor(ARGBColor.MakeArgb(alpha, red, green, blue), ARGBColor.StateARGBValueValid, keyword_null, 0);
    };
    ARGBColor.FromBaseColor = function (alpha, baseColor) {
        ARGBColor.CheckByte(alpha, 'alpha');
        return new ARGBColor(ARGBColor.MakeArgb(alpha, baseColor.R, baseColor.G, baseColor.B), ARGBColor.StateARGBValueValid, keyword_null, 0);
    };
    ARGBColor.FromRgb = function (red, green, blue) {
        return ARGBColor.FromArgbs(0xff, red, green, blue);
    };
    ARGBColor.CheckByte = function (value, name) {
        if (value < 0 || value > 0xff) {
            throw new Error('InvalidEx2BoundArgument');
        }
    };


    ARGBColor.MakeArgb = function (alpha, red, green, blue) {
        var POWER24 = Math.pow(2, 0x18);
        return POWER24 * alpha + (red << 0x10 | green << 8 | blue);
    };
    Object.defineProperty(ARGBColor.prototype, 'Transparent', {

        get: function () {
            return ARGBColor.FromKnownColor(KnownColor.Transparent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'R', {
        get: function () {
            return (this.Value >> 0x10 & 0xff);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'G', {
        get: function () {
            return (this.Value >> 8 & 0xff);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'B', {
        get: function () {
            return (this.Value & 0xff);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'A', {
        get: function () {
            return (this.Value >> 0x18 & 0xff);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'IsKnownColor', {
        get: function () {
            return (this.state & ARGBColor.StateKnownColorValid) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'IsEmpty', {
        get: function () {
            return (this.state === 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'IsNamedColor', {
        get: function () {
            if ((this.state & ARGBColor.StateNameValid) === 0) {
                return this.IsKnownColor;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'IsSystemColor', {
        get: function () {
            if (!this.IsKnownColor) {
                return false;
            }
            if (this.knownColor > 0x1a) {
                return (this.knownColor > 0xa7);
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'Name', {
        get: function () {
            var _this = this;
            if ((_this.state & ARGBColor.StateNameValid) !== 0) {
                return _this.name;
            }
            if (!_this.IsKnownColor) {
                return _this.value.toString(0x10);
            }

            var str = KnownColorTable.KnownColorToName(_this.knownColor);
            if (!isNullOrUndefined(str)) {
                return str;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ARGBColor.prototype, 'Value', {
        get: function () {
            var _this = this;
            if ((_this.state & ARGBColor.StateValueMask) !== 0) {
                return _this.value;
            }
            if (_this.IsKnownColor) {
                return KnownColorTable.KnownColorToArgb(_this.knownColor);
            }
            return ARGBColor.NotDefinedValue;
        },
        enumerable: true,
        configurable: true
    });
    ARGBColor.prototype.Equals = function (obj) {
        if (obj instanceof ARGBColor) {
            return this.Value === obj.Value;
        }
        return false;
    };
    ARGBColor.prototype.GetTintColor = function (tint) {
        var _this = this;
        if (tint === 0.0) {
            return _this;
        }
        var argbData = ColorHelper._applyTint({ r: _this.R, g: _this.G, b: _this.B }, tint);
        return ARGBColor.FromArgbs(argbData.a, argbData.r, argbData.g, argbData.b);
    };
    ARGBColor.prototype.GetBrightness = function () {
        var num = (this.R) / 255;
        var num2 = (this.G) / 255;
        var num3 = (this.B) / 255;
        var num4 = num;
        var num5 = num;
        if (num2 > num4) {
            num4 = num2;
        }
        if (num3 > num4) {
            num4 = num3;
        }
        if (num2 < num5) {
            num5 = num2;
        }
        if (num3 < num5) {
            num5 = num3;
        }
        return (num4 + num5) / 2;
    };
    ARGBColor.prototype.GetHue = function () {
        var _this = this;
        if (_this.R === _this.G && _this.G === _this.B) {
            return 0;
        }
        var num = (_this.R) / 255;
        var num2 = (_this.G) / 255;
        var num3 = (_this.B) / 255;
        var num7 = 0;
        var num4 = num;
        var num5 = num;
        if (num2 > num4) {
            num4 = num2;
        }
        if (num3 > num4) {
            num4 = num3;
        }
        if (num2 < num5) {
            num5 = num2;
        }
        if (num3 < num5) {
            num5 = num3;
        }
        var num6 = num4 - num5;
        if (num === num4) {
            num7 = (num2 - num3) / num6;
        }
        else if (num2 === num4) {
            num7 = 2 + (num3 - num) / num6;
        }
        else if (num3 === num4) {
            num7 = 4 + (num - num2) / num6;
        }
        num7 *= 60;
        if (num7 < 0) {
            num7 += 360;
        }
        return num7;
    };
    ARGBColor.prototype.GetSaturation = function () {
        var num = (this.R) / 255;
        var num2 = (this.G) / 255;
        var num3 = (this.B) / 255;
        var num7 = 0;
        var num4 = num;
        var num5 = num;
        if (num2 > num4) {
            num4 = num2;
        }
        if (num3 > num4) {
            num4 = num3;
        }
        if (num2 < num5) {
            num5 = num2;
        }
        if (num3 < num5) {
            num5 = num3;
        }
        if (num4 === num5) {
            return num7;
        }
        var num6 = (num4 + num5) / 2;
        if (num6 <= 0.5) {
            return (num4 - num5) / (num4 + num5);
        }
        return (num4 - num5) / (2 - num4 - num5);
    };
    ARGBColor.prototype.ToArgb = function () {
        return this.Value;
    };
    ARGBColor.prototype.ToKnownColor = function () {
        return this.knownColor;
    };
    ARGBColor.prototype.ToString = function () {
        var _this = this;
        var builder = 'ARGBColor';
        builder += (' [');
        if ((_this.state & ARGBColor.StateNameValid) !== 0) {
            builder += (_this.Name);
        }
        else if ((_this.state & ARGBColor.StateKnownColorValid) !== 0) {
            builder += (_this.Name);
        }
        else if ((_this.state & ARGBColor.StateValueMask) !== 0) {
            builder += ('A=');
            builder += (_this.A);
            builder += (', R=');
            builder += (_this.R);
            builder += (', G=');
            builder += (_this.G);
            builder += (', B=');
            builder += (_this.B);
        }
        else {
            builder += ('Empty');
        }
        builder += (']');
        return builder;
    };
    ARGBColor.StateKnownColorValid = 1;
    ARGBColor.StateARGBValueValid = 2;
    ARGBColor.StateValueMask = 2;
    ARGBColor.StateNameValid = 8;
    ARGBColor.NotDefinedValue = 0;
    return ARGBColor;
}());
exports.ARGBColor = ARGBColor;
common_1.ChartUtility._ToARGBColor = function (currentTheme, color) {
    var colorType = color.ColorType;
    if (colorType === drawingInterface_1.ColorType.Index) {
        return ARGBColor.FromIndexedColor(color.Value, color.Tint);
    }
    else if (colorType === drawingInterface_1.ColorType.Theme) {
        var themeColor = common_1.ChartUtility.toThemeColorString(color.Value, color.Tint);
        var colorObj = ColorHelper._fromString(currentTheme.getColor(themeColor));
        if (color.Transparency) {
            colorObj.a = parseInt(255 * (1 - color.Transparency) + '', 10);
        }
        return ARGBColor.FromArgbs(colorObj.a, colorObj.r, colorObj.g, colorObj.b);
    }
    else if (colorType === drawingInterface_1.ColorType.Auto) {
        return ARGBColor.FromKnownColor(KnownColor.WindowText);
    }
    else if (colorType === drawingInterface_1.ColorType.None) {
        return new ARGBColor();
    }
    return ARGBColor.FromArgb(color.Value).GetTintColor(color.Tint);
};
var KnownColor;
(function (KnownColor) {
    KnownColor[KnownColor['ActiveBorder'] = 1] = 'ActiveBorder';
    KnownColor[KnownColor['ActiveCaption'] = 2] = 'ActiveCaption';
    KnownColor[KnownColor['ActiveCaptionText'] = 3] = 'ActiveCaptionText';
    KnownColor[KnownColor['AliceBlue'] = 28] = 'AliceBlue';
    KnownColor[KnownColor['AntiqueWhite'] = 29] = 'AntiqueWhite';
    KnownColor[KnownColor['AppWorkspace'] = 4] = 'AppWorkspace';
    KnownColor[KnownColor['Aqua'] = 30] = 'Aqua';
    KnownColor[KnownColor['Aquamarine'] = 31] = 'Aquamarine';
    KnownColor[KnownColor['Azure'] = 32] = 'Azure';
    KnownColor[KnownColor['Beige'] = 33] = 'Beige';
    KnownColor[KnownColor['Bisque'] = 34] = 'Bisque';
    KnownColor[KnownColor['Black'] = 35] = 'Black';
    KnownColor[KnownColor['BlanchedAlmond'] = 36] = 'BlanchedAlmond';
    KnownColor[KnownColor['Blue'] = 37] = 'Blue';
    KnownColor[KnownColor['BlueViolet'] = 38] = 'BlueViolet';
    KnownColor[KnownColor['Brown'] = 39] = 'Brown';
    KnownColor[KnownColor['BurlyWood'] = 40] = 'BurlyWood';
    KnownColor[KnownColor['ButtonFace'] = 168] = 'ButtonFace';
    KnownColor[KnownColor['ButtonHighlight'] = 169] = 'ButtonHighlight';
    KnownColor[KnownColor['ButtonShadow'] = 170] = 'ButtonShadow';
    KnownColor[KnownColor['CadetBlue'] = 41] = 'CadetBlue';
    KnownColor[KnownColor['Chartreuse'] = 42] = 'Chartreuse';
    KnownColor[KnownColor['Chocolate'] = 43] = 'Chocolate';
    KnownColor[KnownColor['Control'] = 5] = 'Control';
    KnownColor[KnownColor['ControlDark'] = 6] = 'ControlDark';
    KnownColor[KnownColor['ControlDarkDark'] = 7] = 'ControlDarkDark';
    KnownColor[KnownColor['ControlLight'] = 8] = 'ControlLight';
    KnownColor[KnownColor['ControlLightLight'] = 9] = 'ControlLightLight';
    KnownColor[KnownColor['ControlText'] = 10] = 'ControlText';
    KnownColor[KnownColor['Coral'] = 44] = 'Coral';
    KnownColor[KnownColor['CornflowerBlue'] = 45] = 'CornflowerBlue';
    KnownColor[KnownColor['Cornsilk'] = 46] = 'Cornsilk';
    KnownColor[KnownColor['Crimson'] = 47] = 'Crimson';
    KnownColor[KnownColor['Cyan'] = 48] = 'Cyan';
    KnownColor[KnownColor['DarkBlue'] = 49] = 'DarkBlue';
    KnownColor[KnownColor['DarkCyan'] = 50] = 'DarkCyan';
    KnownColor[KnownColor['DarkGoldenrod'] = 51] = 'DarkGoldenrod';
    KnownColor[KnownColor['DarkGray'] = 52] = 'DarkGray';
    KnownColor[KnownColor['DarkGreen'] = 53] = 'DarkGreen';
    KnownColor[KnownColor['DarkKhaki'] = 54] = 'DarkKhaki';
    KnownColor[KnownColor['DarkMagenta'] = 55] = 'DarkMagenta';
    KnownColor[KnownColor['DarkOliveGreen'] = 56] = 'DarkOliveGreen';
    KnownColor[KnownColor['DarkOrange'] = 57] = 'DarkOrange';
    KnownColor[KnownColor['DarkOrchid'] = 58] = 'DarkOrchid';
    KnownColor[KnownColor['DarkRed'] = 59] = 'DarkRed';
    KnownColor[KnownColor['DarkSalmon'] = 60] = 'DarkSalmon';
    KnownColor[KnownColor['DarkSeaGreen'] = 61] = 'DarkSeaGreen';
    KnownColor[KnownColor['DarkSlateBlue'] = 62] = 'DarkSlateBlue';
    KnownColor[KnownColor['DarkSlateGray'] = 63] = 'DarkSlateGray';
    KnownColor[KnownColor['DarkTurquoise'] = 64] = 'DarkTurquoise';
    KnownColor[KnownColor['DarkViolet'] = 65] = 'DarkViolet';
    KnownColor[KnownColor['DeepPink'] = 66] = 'DeepPink';
    KnownColor[KnownColor['DeepSkyBlue'] = 67] = 'DeepSkyBlue';
    KnownColor[KnownColor['Desktop'] = 11] = 'Desktop';
    KnownColor[KnownColor['DimGray'] = 68] = 'DimGray';
    KnownColor[KnownColor['DodgerBlue'] = 69] = 'DodgerBlue';
    KnownColor[KnownColor['Firebrick'] = 70] = 'Firebrick';
    KnownColor[KnownColor['FloralWhite'] = 71] = 'FloralWhite';
    KnownColor[KnownColor['ForestGreen'] = 72] = 'ForestGreen';
    KnownColor[KnownColor['Fuchsia'] = 73] = 'Fuchsia';
    KnownColor[KnownColor['Gainsboro'] = 74] = 'Gainsboro';
    KnownColor[KnownColor['GhostWhite'] = 75] = 'GhostWhite';
    KnownColor[KnownColor['Gold'] = 76] = 'Gold';
    KnownColor[KnownColor['Goldenrod'] = 77] = 'Goldenrod';
    KnownColor[KnownColor['GradientActiveCaption'] = 171] = 'GradientActiveCaption';
    KnownColor[KnownColor['GradientInactiveCaption'] = 172] = 'GradientInactiveCaption';
    KnownColor[KnownColor['Gray'] = 78] = 'Gray';
    KnownColor[KnownColor['GrayText'] = 12] = 'GrayText';
    KnownColor[KnownColor['Green'] = 79] = 'Green';
    KnownColor[KnownColor['GreenYellow'] = 80] = 'GreenYellow';
    KnownColor[KnownColor['Highlight'] = 13] = 'Highlight';
    KnownColor[KnownColor['HighlightText'] = 14] = 'HighlightText';
    KnownColor[KnownColor['Honeydew'] = 81] = 'Honeydew';
    KnownColor[KnownColor['HotPink'] = 82] = 'HotPink';
    KnownColor[KnownColor['HotTrack'] = 15] = 'HotTrack';
    KnownColor[KnownColor['InactiveBorder'] = 16] = 'InactiveBorder';
    KnownColor[KnownColor['InactiveCaption'] = 17] = 'InactiveCaption';
    KnownColor[KnownColor['InactiveCaptionText'] = 18] = 'InactiveCaptionText';
    KnownColor[KnownColor['IndianRed'] = 83] = 'IndianRed';
    KnownColor[KnownColor['Indigo'] = 84] = 'Indigo';
    KnownColor[KnownColor['Info'] = 19] = 'Info';
    KnownColor[KnownColor['InfoText'] = 20] = 'InfoText';
    KnownColor[KnownColor['Ivory'] = 85] = 'Ivory';
    KnownColor[KnownColor['Khaki'] = 86] = 'Khaki';
    KnownColor[KnownColor['Lavender'] = 87] = 'Lavender';
    KnownColor[KnownColor['LavenderBlush'] = 88] = 'LavenderBlush';
    KnownColor[KnownColor['LawnGreen'] = 89] = 'LawnGreen';
    KnownColor[KnownColor['LemonChiffon'] = 90] = 'LemonChiffon';
    KnownColor[KnownColor['LightBlue'] = 91] = 'LightBlue';
    KnownColor[KnownColor['LightCoral'] = 92] = 'LightCoral';
    KnownColor[KnownColor['LightCyan'] = 93] = 'LightCyan';
    KnownColor[KnownColor['LightGoldenrodYellow'] = 94] = 'LightGoldenrodYellow';
    KnownColor[KnownColor['LightGray'] = 95] = 'LightGray';
    KnownColor[KnownColor['LightGreen'] = 96] = 'LightGreen';
    KnownColor[KnownColor['LightPink'] = 97] = 'LightPink';
    KnownColor[KnownColor['LightSalmon'] = 98] = 'LightSalmon';
    KnownColor[KnownColor['LightSeaGreen'] = 99] = 'LightSeaGreen';
    KnownColor[KnownColor['LightSkyBlue'] = 100] = 'LightSkyBlue';
    KnownColor[KnownColor['LightSlateGray'] = 101] = 'LightSlateGray';
    KnownColor[KnownColor['LightSteelBlue'] = 102] = 'LightSteelBlue';
    KnownColor[KnownColor['LightYellow'] = 103] = 'LightYellow';
    KnownColor[KnownColor['Lime'] = 104] = 'Lime';
    KnownColor[KnownColor['LimeGreen'] = 105] = 'LimeGreen';
    KnownColor[KnownColor['Linen'] = 106] = 'Linen';
    KnownColor[KnownColor['Magenta'] = 107] = 'Magenta';
    KnownColor[KnownColor['Maroon'] = 108] = 'Maroon';
    KnownColor[KnownColor['MediumAquamarine'] = 109] = 'MediumAquamarine';
    KnownColor[KnownColor['MediumBlue'] = 110] = 'MediumBlue';
    KnownColor[KnownColor['MediumOrchid'] = 111] = 'MediumOrchid';
    KnownColor[KnownColor['MediumPurple'] = 112] = 'MediumPurple';
    KnownColor[KnownColor['MediumSeaGreen'] = 113] = 'MediumSeaGreen';
    KnownColor[KnownColor['MediumSlateBlue'] = 114] = 'MediumSlateBlue';
    KnownColor[KnownColor['MediumSpringGreen'] = 115] = 'MediumSpringGreen';
    KnownColor[KnownColor['MediumTurquoise'] = 116] = 'MediumTurquoise';
    KnownColor[KnownColor['MediumVioletRed'] = 117] = 'MediumVioletRed';
    KnownColor[KnownColor['Menu'] = 21] = 'Menu';
    KnownColor[KnownColor['MenuBar'] = 173] = 'MenuBar';
    KnownColor[KnownColor['MenuHighlight'] = 174] = 'MenuHighlight';
    KnownColor[KnownColor['MenuText'] = 22] = 'MenuText';
    KnownColor[KnownColor['MidnightBlue'] = 118] = 'MidnightBlue';
    KnownColor[KnownColor['MintCream'] = 119] = 'MintCream';
    KnownColor[KnownColor['MistyRose'] = 120] = 'MistyRose';
    KnownColor[KnownColor['Moccasin'] = 121] = 'Moccasin';
    KnownColor[KnownColor['NavajoWhite'] = 122] = 'NavajoWhite';
    KnownColor[KnownColor['Navy'] = 123] = 'Navy';
    KnownColor[KnownColor['OldLace'] = 124] = 'OldLace';
    KnownColor[KnownColor['Olive'] = 125] = 'Olive';
    KnownColor[KnownColor['OliveDrab'] = 126] = 'OliveDrab';
    KnownColor[KnownColor['Orange'] = 127] = 'Orange';
    KnownColor[KnownColor['OrangeRed'] = 128] = 'OrangeRed';
    KnownColor[KnownColor['Orchid'] = 129] = 'Orchid';
    KnownColor[KnownColor['PaleGoldenrod'] = 130] = 'PaleGoldenrod';
    KnownColor[KnownColor['PaleGreen'] = 131] = 'PaleGreen';
    KnownColor[KnownColor['PaleTurquoise'] = 132] = 'PaleTurquoise';
    KnownColor[KnownColor['PaleVioletRed'] = 133] = 'PaleVioletRed';
    KnownColor[KnownColor['PapayaWhip'] = 134] = 'PapayaWhip';
    KnownColor[KnownColor['PeachPuff'] = 135] = 'PeachPuff';
    KnownColor[KnownColor['Peru'] = 136] = 'Peru';
    KnownColor[KnownColor['Pink'] = 137] = 'Pink';
    KnownColor[KnownColor['Plum'] = 138] = 'Plum';
    KnownColor[KnownColor['PowderBlue'] = 139] = 'PowderBlue';
    KnownColor[KnownColor['Purple'] = 140] = 'Purple';
    KnownColor[KnownColor['Red'] = 141] = 'Red';
    KnownColor[KnownColor['RosyBrown'] = 142] = 'RosyBrown';
    KnownColor[KnownColor['RoyalBlue'] = 143] = 'RoyalBlue';
    KnownColor[KnownColor['SaddleBrown'] = 144] = 'SaddleBrown';
    KnownColor[KnownColor['Salmon'] = 145] = 'Salmon';
    KnownColor[KnownColor['SandyBrown'] = 146] = 'SandyBrown';
    KnownColor[KnownColor['ScrollBar'] = 23] = 'ScrollBar';
    KnownColor[KnownColor['SeaGreen'] = 147] = 'SeaGreen';
    KnownColor[KnownColor['SeaShell'] = 148] = 'SeaShell';
    KnownColor[KnownColor['Sienna'] = 149] = 'Sienna';
    KnownColor[KnownColor['Silver'] = 150] = 'Silver';
    KnownColor[KnownColor['SkyBlue'] = 151] = 'SkyBlue';
    KnownColor[KnownColor['SlateBlue'] = 152] = 'SlateBlue';
    KnownColor[KnownColor['SlateGray'] = 153] = 'SlateGray';
    KnownColor[KnownColor['Snow'] = 154] = 'Snow';
    KnownColor[KnownColor['SpringGreen'] = 155] = 'SpringGreen';
    KnownColor[KnownColor['SteelBlue'] = 156] = 'SteelBlue';
    KnownColor[KnownColor['Tan'] = 157] = 'Tan';
    KnownColor[KnownColor['Teal'] = 158] = 'Teal';
    KnownColor[KnownColor['Thistle'] = 159] = 'Thistle';
    KnownColor[KnownColor['Tomato'] = 160] = 'Tomato';
    KnownColor[KnownColor['Transparent'] = 27] = 'Transparent';
    KnownColor[KnownColor['Turquoise'] = 161] = 'Turquoise';
    KnownColor[KnownColor['Violet'] = 162] = 'Violet';
    KnownColor[KnownColor['Wheat'] = 163] = 'Wheat';
    KnownColor[KnownColor['White'] = 164] = 'White';
    KnownColor[KnownColor['WhiteSmoke'] = 165] = 'WhiteSmoke';
    KnownColor[KnownColor['Window'] = 24] = 'Window';
    KnownColor[KnownColor['WindowFrame'] = 25] = 'WindowFrame';
    KnownColor[KnownColor['WindowText'] = 26] = 'WindowText';
    KnownColor[KnownColor['Yellow'] = 166] = 'Yellow';
    KnownColor[KnownColor['YellowGreen'] = 167] = 'YellowGreen';
})(KnownColor = exports.KnownColor || (exports.KnownColor = {}));
var addSystemColors = function (colorTable) {
    colorTable[1] = 0xffb4b4b4;
    colorTable[2] = 0xff99b4d1;
    colorTable[3] = 0xff000000;
    colorTable[4] = 0xffababab;
    colorTable[5] = 0xfff0f0f0;
    colorTable[6] = 0xffa0a0a0;
    colorTable[7] = 0xff696969;
    colorTable[8] = 0xffe3e3e3;
    colorTable[9] = 0xffffffff;
    colorTable[10] = 0xff000000;
    colorTable[11] = 0xff000000;
    colorTable[12] = 0xff6d6d6d;
    colorTable[13] = 0xff3399ff;
    colorTable[14] = 0xffffffff;
    colorTable[15] = 0xff0066cc;
    colorTable[16] = 0xfff4f7fc;
    colorTable[17] = 0xffbfcddb;
    colorTable[18] = 0xff000000;
    colorTable[19] = 0xffffffe1;
    colorTable[20] = 0xff000000;
    colorTable[21] = 0xfff0f0f0;
    colorTable[22] = 0xff000000;
    colorTable[23] = 0xffc8c8c8;
    colorTable[24] = 0xffffffff;
    colorTable[25] = 0xff646464;
    colorTable[26] = 0xff000000;
    colorTable[168] = 0xfff0f0f0;
    colorTable[169] = 0xffffffff;
    colorTable[170] = 0xffa0a0a0;
    colorTable[171] = 0xffb9d1ea;
    colorTable[172] = 0xffd7e4f2;
    colorTable[173] = 0xfff0f0f0;
    colorTable[174] = 0xff3399ff;
};
var KnownColorTable = (function () {
    function KnownColorTable() {
    }
    KnownColorTable.ArgbToKnownColor = function (targetARGB) {
        this.EnsureColorTable();
        for (var i = 0; i < KnownColorTable.colorTable.length; i++) {
            var num2 = KnownColorTable.colorTable[i];
            if (num2 === targetARGB) {
                var color = ARGBColor.FromArgb(i);
                if (!color.IsSystemColor) {
                    return color;
                }
            }
        }
        return ARGBColor.FromArgb(targetARGB);
    };
    KnownColorTable.Encode = function (alpha, red, green, blue) {
        return (((red << 0x10) | (green << 8)) | blue) | (alpha << 0x18);
    };
    KnownColorTable.EnsureColorNameTable = function () {
        if (isNullOrUndefined(KnownColorTable.colorNameTable)) {
            KnownColorTable.InitColorNameTable();
        }
    };
    KnownColorTable.EnsureColorTable = function () {
        if (isNullOrUndefined(KnownColorTable.colorTable)) {
            this.InitColorTable();
        }
    };
    KnownColorTable.InitColorNameTable = function () {
        var strArray = [];
        for (var p in KnownColor) {
            if (KnownColor.hasOwnProperty(p)) {
                strArray[KnownColor[p]] = p;
            }
        }
        KnownColorTable.colorNameTable = strArray;
    };
    KnownColorTable.InitColorTable = function () {
        var colorTable = [];
        addSystemColors(colorTable);
        colorTable[0x1b] = 0xffffff;
        colorTable[0x1c] = -984833;
        colorTable[0x1d] = -332841;
        colorTable[30] = -16711681;
        colorTable[0x1f] = -8388652;
        colorTable[0x20] = -983041;
        colorTable[0x21] = -657956;
        colorTable[0x22] = -6972;
        colorTable[0x23] = -16777216;
        colorTable[0x24] = -5171;
        colorTable[0x25] = -16776961;
        colorTable[0x26] = -7722014;
        colorTable[0x27] = -5952982;
        colorTable[40] = -2180985;
        colorTable[0x29] = -10510688;
        colorTable[0x2a] = -8388864;
        colorTable[0x2b] = -2987746;
        colorTable[0x2c] = -32944;
        colorTable[0x2d] = -10185235;
        colorTable[0x2e] = -1828;
        colorTable[0x2f] = -2354116;
        colorTable[0x30] = -16711681;
        colorTable[0x31] = -16777077;
        colorTable[50] = -16741493;
        colorTable[0x33] = -4684277;
        colorTable[0x34] = -5658199;
        colorTable[0x35] = -16751616;
        colorTable[0x36] = -4343957;
        colorTable[0x37] = -7667573;
        colorTable[0x38] = -11179217;
        colorTable[0x39] = -29696;
        colorTable[0x3a] = -6737204;
        colorTable[0x3b] = -7667712;
        colorTable[60] = -1468806;
        colorTable[0x3d] = -7357301;
        colorTable[0x3e] = -12042869;
        colorTable[0x3f] = -13676721;
        colorTable[0x40] = -16724271;
        colorTable[0x41] = -7077677;
        colorTable[0x42] = -60269;
        colorTable[0x43] = -16728065;
        colorTable[0x44] = -9868951;
        colorTable[0x45] = -14774017;
        colorTable[70] = -5103070;
        colorTable[0x47] = -1296;
        colorTable[0x48] = -14513374;
        colorTable[0x49] = -65281;
        colorTable[0x4a] = -2302756;
        colorTable[0x4b] = -460545;
        colorTable[0x4c] = -10496;
        colorTable[0x4d] = -2448096;
        colorTable[0x4e] = -8355712;
        colorTable[0x4f] = -16744448;
        colorTable[80] = -5374161;
        colorTable[0x51] = -983056;
        colorTable[0x52] = -38476;
        colorTable[0x53] = -3318692;
        colorTable[0x54] = -11861886;
        colorTable[0x55] = -16;
        colorTable[0x56] = -989556;
        colorTable[0x57] = -1644806;
        colorTable[0x58] = -3851;
        colorTable[0x59] = -8586240;
        colorTable[90] = -1331;
        colorTable[0x5b] = -5383962;
        colorTable[0x5c] = -1015680;
        colorTable[0x5d] = -2031617;
        colorTable[0x5e] = -329006;
        colorTable[0x5f] = -2894893;
        colorTable[0x60] = -7278960;
        colorTable[0x61] = -18751;
        colorTable[0x62] = -24454;
        colorTable[0x63] = -14634326;
        colorTable[100] = -7876870;
        colorTable[0x65] = -8943463;
        colorTable[0x66] = -5192482;
        colorTable[0x67] = -32;
        colorTable[0x68] = -16711936;
        colorTable[0x69] = -13447886;
        colorTable[0x6a] = -331546;
        colorTable[0x6b] = -65281;
        colorTable[0x6c] = -8388608;
        colorTable[0x6d] = -10039894;
        colorTable[110] = -16777011;
        colorTable[0x6f] = -4565549;
        colorTable[0x70] = -7114533;
        colorTable[0x71] = -12799119;
        colorTable[0x72] = -8689426;
        colorTable[0x73] = -16713062;
        colorTable[0x74] = -12004916;
        colorTable[0x75] = -3730043;
        colorTable[0x76] = -15132304;
        colorTable[0x77] = -655366;
        colorTable[120] = -6943;
        colorTable[0x79] = -6987;
        colorTable[0x7a] = -8531;
        colorTable[0x7b] = -16777088;
        colorTable[0x7c] = -133658;
        colorTable[0x7d] = -8355840;
        colorTable[0x7e] = -9728477;
        colorTable[0x7f] = -23296;
        colorTable[0x80] = -47872;
        colorTable[0x81] = -2461482;
        colorTable[130] = -1120086;
        colorTable[0x83] = -6751336;
        colorTable[0x84] = -5247250;
        colorTable[0x85] = -2396013;
        colorTable[0x86] = -4139;
        colorTable[0x87] = -9543;
        colorTable[0x88] = -3308225;
        colorTable[0x89] = -16181;
        colorTable[0x8a] = -2252579;
        colorTable[0x8b] = -5185306;
        colorTable[140] = -8388480;
        colorTable[0x8d] = -65536;
        colorTable[0x8e] = -4419697;
        colorTable[0x8f] = -12490271;
        colorTable[0x90] = -7650029;
        colorTable[0x91] = -360334;
        colorTable[0x92] = -744352;
        colorTable[0x93] = -13726889;
        colorTable[0x94] = -2578;
        colorTable[0x95] = -6270419;
        colorTable[150] = -4144960;
        colorTable[0x97] = -7876885;
        colorTable[0x98] = -9807155;
        colorTable[0x99] = -9404272;
        colorTable[0x9a] = -1286;
        colorTable[0x9b] = -16711809;
        colorTable[0x9c] = -12156236;
        colorTable[0x9d] = -2968436;
        colorTable[0x9e] = -16744320;
        colorTable[0x9f] = -2572328;
        colorTable[160] = -40121;
        colorTable[0xa1] = -12525360;
        colorTable[0xa2] = -1146130;
        colorTable[0xa3] = -663885;
        colorTable[0xa4] = -1;
        colorTable[0xa5] = -657931;
        colorTable[0xa6] = -256;
        colorTable[0xa7] = -6632142;
        KnownColorTable.colorTable = colorTable;
    };
    KnownColorTable.KnownColorToArgb = function (color) {
        this.EnsureColorTable();
        if (color <= KnownColor.MenuHighlight) {
            return this.colorTable[color];
        }
        return 0;
    };
    KnownColorTable.KnownColorToName = function (color) {
        this.EnsureColorNameTable();
        if (color <= KnownColor.MenuHighlight) {
            return KnownColorTable.colorNameTable[color];
        }
        return keyword_null;
    };
    KnownColorTable.IsKnowColor = function (argbValue) {
        KnownColorTable.EnsureColorTable();
        return KnownColorTable.colorTable.indexOf(argbValue) !== -1;
    };
    return KnownColorTable;
}());
exports.KnownColorTable = KnownColorTable;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/colorData.js':
/*!**********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/colorData.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var ColorDataFlag;
(function (ColorDataFlag) {
    ColorDataFlag[ColorDataFlag['None'] = 0] = 'None';
    ColorDataFlag[ColorDataFlag['ColorType'] = 1] = 'ColorType';
    ColorDataFlag[ColorDataFlag['Value'] = 2] = 'Value';
    ColorDataFlag[ColorDataFlag['Tint'] = 4] = 'Tint';
    ColorDataFlag[ColorDataFlag['All'] = 7] = 'All';
})(ColorDataFlag = exports.ColorDataFlag || (exports.ColorDataFlag = {}));
var ColorData = (function () {
    function ColorData() {
    }
    ColorData.ConvertHexStringToInt = function (hexString) {
        return parseInt(hexString, 16);
    };
    ColorData.prototype.Equals = function (other) {
        return this.ColorType === other.ColorType && this.Value === other.Value && this.Tint === other.Tint;
    };
    ColorData.prototype.Clone = function () {
        return this;
    };
    ColorData.prototype.Compose = function (other, conflictCompose) {
        if (conflictCompose === void 0) {
            conflictCompose = true;
        }
        if (other.Flag === ColorDataFlag.None) {
            return;
        }
        if (conflictCompose) {
            this.ConflictCompose(other);
        }
        else {
            this.NonConflictCompose(other);
        }
    };
    ColorData.prototype.ConflictCompose = function (other) {
        var _this = this;
        if ((other.Flag & ColorDataFlag.ColorType) === ColorDataFlag.ColorType &&
            _this.ColorType !== other.ColorType) {
            _this.ColorType = other.ColorType;
            _this.Value = 0;
            _this.Tint = 0;
        }
        if ((other.Flag & ColorDataFlag.Value) === ColorDataFlag.Value) {
            _this.Value = other.Value;
        }
        if ((other.Flag & ColorDataFlag.Tint) === ColorDataFlag.Tint) {
            _this.Tint = other.Tint;
        }
        _this.Flag |= other.Flag;
    };
    ColorData.prototype.NonConflictCompose = function (other) {
        var _this = this;
        if ((_this.Flag & ColorDataFlag.ColorType) !== ColorDataFlag.ColorType &&
            (other.Flag & ColorDataFlag.ColorType) === ColorDataFlag.ColorType) {
            _this.ColorType = other.ColorType;
            _this.Value = other.Value;
            _this.Tint = other.Tint;
            _this.Flag = other.Flag;
        }
    };
    ColorData.prototype.RemoveDuplicateStyle = function (other) {
        return this.Compare(other, false);
    };
    ColorData.prototype.RemoveDifferentStyle = function (other) {
        return this.Compare(other, true);
    };
    ColorData.prototype.Compare = function (other, removeDifferent) {
        var _this = this;
        var isChanged = false;
        var isDiffValue, isDiffTint;
        if ((_this.Flag & ColorDataFlag.ColorType) === ColorDataFlag.ColorType) {
            var isDiffColorType = (other.Flag & ColorDataFlag.ColorType) !== ColorDataFlag.ColorType || _this.ColorType !== other.ColorType;
            if (removeDifferent) {
                if (isDiffColorType) {
                    _this.Flag = ColorDataFlag.None;
                    isChanged = true;
                }
                else {
                    if ((_this.Flag & ColorDataFlag.Value) === ColorDataFlag.Value) {
                        isDiffValue = (other.Flag & ColorDataFlag.Value) !== ColorDataFlag.Value || _this.Value !== other.Value;
                        if (isDiffValue) {
                            _this.Flag = ColorDataFlag.None;
                            isChanged = true;
                        }
                    }
                    if ((_this.Flag & ColorDataFlag.Tint) === ColorDataFlag.Tint) {
                        isDiffTint = (other.Flag & ColorDataFlag.Tint) !== ColorDataFlag.Tint || _this.Tint !== other.Tint;
                        if (isDiffTint) {
                            _this.Flag = ColorDataFlag.None;
                            isChanged = true;
                        }
                    }
                }
            }
            else if (!isDiffColorType) {
                if ((_this.Flag & ColorDataFlag.Value) === ColorDataFlag.Value) {
                    isDiffValue = (other.Flag & ColorDataFlag.Value) !== ColorDataFlag.Value || _this.Value !== other.Value;
                    if (!isDiffValue) {
                        _this.Flag &= ~ColorDataFlag.Value;
                        isChanged = true;
                    }
                }
                if ((_this.Flag & ColorDataFlag.Tint) === ColorDataFlag.Tint) {
                    isDiffTint = (other.Flag & ColorDataFlag.Tint) !== ColorDataFlag.Tint || _this.Tint !== other.Tint;
                    if (!isDiffTint) {
                        _this.Flag &= ~ColorDataFlag.Tint;
                        isChanged = true;
                    }
                }
                if (_this.Flag === ColorDataFlag.ColorType) {
                    _this.Flag = ColorDataFlag.None;
                    isChanged = true;
                }
            }
        }
        return isChanged;
    };
    ColorData.prototype.UpdateDefaultValueFlag = function () {
        if (this.ColorType === drawingInterface_1.ColorType.None) {
            this.Flag = ColorDataFlag.None;
        }
        else {
            this.Flag = ColorDataFlag.All;
        }
    };
    ColorData.prototype.UpdateFlagFromBottom = function () {
    };
    ColorData.prototype.ClearFlag = function () {
        this.Flag = ColorDataFlag.None;
    };
    ColorData.prototype.SetFullFlag = function () {
        this.Flag = ColorDataFlag.All;
    };
    ColorData.prototype.IsFullFlag = function () {
        return this.Flag === ColorDataFlag.All;
    };
    return ColorData;
}());
exports.ColorData = ColorData;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/colorFormat.js':
/*!************************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/colorFormat.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var colorData_1 = __webpack_require__(/*! ./colorData */ './dist/plugins/floatingObject/drawing/colorData.js');
var color_1 = __webpack_require__(/*! ./color */ './dist/plugins/floatingObject/drawing/color.js');
var common_1 = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var stateful_1 = __webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var _ColorHelper = Common_1.Common._ColorHelper;
var isNullOrUndefined = common_1.UnitHelper.isNullOrUndefined, DefaultTransparent = common_1.ShapeConstants.DefaultTransparent, PositionConver = common_1.ShapeConstants.PositionConver, keyword_null = null, Math_abs = Math.abs, Math_floor = Math.floor;
function isThemeColor(theme, colorString) {
    return theme.getColor(colorString) !== colorString;
}
exports.createColorFormatFromRGB = function (context, colorType, rgb) {
    var color = new ColorFormat(context);
    color.ColorType = colorType;
    color.RGB = rgb;
    return color;
};
exports.createColorFormat = function (context, colorType, objectThemeColor, tintAndShade) {
    var color = new ColorFormat(context);
    color.ColorType = colorType;
    color.ObjectThemeColor = objectThemeColor;
    if (tintAndShade) {
        color.TintAndShade = tintAndShade;
    }
    return color;
};
var ColorFormat = (function (_super) {
    __extends(ColorFormat, _super);
    function ColorFormat(context, parent) {
        var _this_1 = _super.call(this, parent) || this;
        if (parent === void 0) {
            parent = keyword_null;
        }
        var _this = _this_1;
        _this._themeColor = drawingInterface_1.ColorSchemeIndex.None;
        _this._rgbColor = keyword_null;
        _this._tint = 0;
        _this._brightness = 0;
        _this._transparency = DefaultTransparent;
        _this._context = context;
        _this._parent = parent;
        var drawingType = _this._context.DrawingType;
        if (drawingType === drawingInterface_1.DrawingType.Shape) {
            _this._colorType = drawingInterface_1.SolidColorType.Theme;
        }
        else if (drawingType === drawingInterface_1.DrawingType.Chart) {
            _this._colorType = drawingInterface_1.SolidColorType.Automatic;
        }
        else if (drawingType === drawingInterface_1.DrawingType.Picture) {
            _this._colorType = drawingInterface_1.SolidColorType.None;
        }
        return _this;
    }
    ColorFormat.prototype.setColor = function (sheet, colorString) {
        var _this = this;
        if (sheet && isThemeColor(sheet.currentTheme(), colorString)) {
            var themeColorInfo = common_1.ChartUtility.fromThemeColorString(colorString);
            if (themeColorInfo) {
                _this.ObjectThemeColor = themeColorInfo.index;
                if (themeColorInfo.tint !== undefined) {
                    _this.Brightness = themeColorInfo.tint;
                }
            }
        }
        else {
            var aRgbColor = _ColorHelper._fromString(colorString);
            _this.RGB = color_1.ARGBColor.FromArgbs(aRgbColor.a, aRgbColor.r, aRgbColor.g, aRgbColor.b);
        }
    };
    ColorFormat.prototype.GetColorData = function () {
        var _this = this;
        var data = new colorData_1.ColorData();
        data.ColorType = drawingInterface_1.ColorType.RGB;
        var colorType = _this._colorType;
        if (colorType === drawingInterface_1.SolidColorType.None) {
            data.ColorType = drawingInterface_1.ColorType.None;
        }
        else if (colorType === drawingInterface_1.SolidColorType.Automatic) {
            data.ColorType = drawingInterface_1.ColorType.Auto;
            var autoColFormat = _this.GetAutoColorFormat();
            if (!isNullOrUndefined(autoColFormat)) {
                return autoColFormat.GetColorData();
            }
        }
        else if (colorType === drawingInterface_1.SolidColorType.RGB) {
            if (!isNullOrUndefined(_this._rgbColor)) {
                data.ColorType = drawingInterface_1.ColorType.RGB;

                var rgb = this._rgbColor;
                var alpha = 1 - _this._transparency;
                if (alpha !== 1) {
                    rgb = color_1.ARGBColor.FromArgbs(parseInt((255 * alpha), 10), rgb.R, rgb.G, rgb.B);
                }
                data.Value = rgb.ToArgb();

                data.Tint = _this._tint || _this._brightness;
            }
        }
        else if (colorType === drawingInterface_1.SolidColorType.Theme) {
            data.ColorType = drawingInterface_1.ColorType.Theme;
            data.Value = _this._themeColor;
            data.Tint = _this._tint || _this._brightness;
            data.Transparency = _this._transparency;
        }
        return data;
    };
    ColorFormat.prototype.HasOwnColor = function () {
        return this.GetState(drawingInterface_1.ColorFormatStates.ObjectThemeColor) ||
            this.GetState(drawingInterface_1.ColorFormatStates.RGB) ||
            this.GetAutoColorFormat() !== keyword_null;
    };
    ColorFormat.prototype.GetAutoColorFormat = function () {
        if (this.ColorType === drawingInterface_1.SolidColorType.Automatic && !isNullOrUndefined(this.AutoColorFormat)) {
            var auto = this.AutoColorFormat();
            if (!isNullOrUndefined(auto) && auto.ColorType !== drawingInterface_1.SolidColorType.Automatic) {
                return auto;
            }
        }
        return keyword_null;
    };
    ColorFormat.prototype.OnParentChanged = function (newParent) {
        this._parent = newParent;
    };
    ColorFormat.prototype.ClearModel = function () {
        this._ooModel = keyword_null;
        for (var _i = 0, _a = this.Children; _i < _a.length; _i++) {
            var item = _a[_i];
            item.ClearModel();
        }
    };
    ColorFormat.prototype.CalcBrightness = function (lumMod, lumOff) {
        if (lumMod && lumMod.length > 0 && lumOff && lumOff.length > 0) {
            return lumOff[0] / PositionConver;
        }
        if (lumMod && lumMod.length > 0) {
            return lumMod[0] / PositionConver - 1;
        }
        return 0;
    };
    ColorFormat.prototype.CalcLumModeOff = function (lumMod, lumOff) {
        var _this = this;
        if (_this.Brightness > 0) {
            lumMod.push(Math_floor((1 - _this.Brightness) * PositionConver));
            lumOff.push(Math_floor(_this.Brightness * PositionConver));
        }
        else if (_this.Brightness < 0) {
            lumMod.push(Math_floor((1 + _this.Brightness) * PositionConver));
        }
    };
    ColorFormat.prototype.FromCT_ColorProperties = function (color) {
        var _this = this;
        _this._ooModel = color;
        if (isNullOrUndefined(color)) {
            _this.ColorType = drawingInterface_1.SolidColorType.None;
        }
        else if (!isNullOrUndefined(color.schemeClr)) {
            var schemeClr = color.schemeClr;
            _this.ObjectThemeColor = schemeClr.val;
            _this.Brightness = _this.CalcBrightness(schemeClr.lumMod, schemeClr.lumOff);


            _this._tint = 0;
            if (!isNullOrUndefined(schemeClr.tint) && schemeClr.tint.length > 0) {
                _this.FromTint(schemeClr.tint[0]);
            }
            if (!isNullOrUndefined(schemeClr.alpha) && schemeClr.alpha.length > 0) {
                _this.FromTransparency(schemeClr.alpha[0]);
            }
            var shade = schemeClr.shade;
            if (shade && shade.length) {
                _this.FromShade(shade[0]);
            }
        }
        else if (!isNullOrUndefined(color.srgbClr) && !isNullOrUndefined(color.srgbClr.val) && color.srgbClr.val.length === 3) {
            var srgbClr = color.srgbClr;
            _this.RGB = color_1.ARGBColor.FromRgb(srgbClr.val[0], srgbClr.val[1], srgbClr.val[2]);
            _this.Brightness = _this.CalcBrightness(srgbClr.lumMod, srgbClr.lumOff);
            if (!isNullOrUndefined(srgbClr.alpha) && srgbClr.alpha.length > 0) {
                _this.FromTransparency(srgbClr.alpha[0]);
            }
            if (!isNullOrUndefined(srgbClr.tint) && srgbClr.tint.length > 0) {
                _this.FromTint(srgbClr.tint[0]);
            }
        }
        else if (!isNullOrUndefined(color.scrgbClr)) {
            var scrgbClr = color.scrgbClr;
            _this.RGB = color_1.ARGBColor.FromRgb(scrgbClr.r, scrgbClr.g, scrgbClr.b);
        }
        else if (!isNullOrUndefined(color.sysClr)) {
            var sysClr = color.sysClr;
            var sysColor = sysClr.val;
            if (!isNullOrUndefined(sysColor)) {
                _this.RGB = color_1.ARGBColor.FromKnownColor(sysColor);
            }
            else if (!isNullOrUndefined(sysClr.lastClr) && sysClr.lastClr.length === 3) {
                _this.RGB = color_1.ARGBColor.FromRgb(sysClr.lastClr[0], sysClr.lastClr[1], sysClr.lastClr[2]);
            }
            _this.Brightness = _this.CalcBrightness(sysClr.lumMod, sysClr.lumOff);
            if (!isNullOrUndefined(sysClr.alpha) && sysClr.alpha.length > 0) {
                _this.FromTransparency(sysClr.alpha[0]);
            }
        }
        else if (!isNullOrUndefined(color.prstClr)) {
            var prstClr = color.prstClr;
            var rgbval = common_1.ChartUtility.GetPresetColorRGB(prstClr.val);
            _this.RGB = color_1.ARGBColor.FromRgb(rgbval[0], rgbval[1], rgbval[2]);
            _this.Brightness = _this.CalcBrightness(prstClr.lumMod, prstClr.lumOff);
            if (!isNullOrUndefined(prstClr.alpha) && prstClr.alpha.length > 0) {
                _this.FromTransparency(prstClr.alpha[0]);
            }
        }
    };
    ColorFormat.prototype.ToCT_ColorProperties = function (colorProperties) {
        var _this = this;
        var ooColorProperties = _this._ooModel || colorProperties;
        var lumMod = [];
        var lumOff = [];
        var schemeClr = ooColorProperties.schemeClr;
        if (schemeClr) {
            common_1.ChartUtility.removeEmptyArrayProperties(schemeClr);
        }
        if (_this.ColorType === drawingInterface_1.SolidColorType.Theme) {
            removeColorItems(ooColorProperties);

            if (!schemeClr) {
                schemeClr = ooColorProperties.schemeClr = {};
            }
            schemeClr.val = _this.ObjectThemeColor;
            _this.CalcLumModeOff(lumMod, lumOff);
            setLumValues(schemeClr, lumMod, lumOff);
            if (_this.TintAndShade > 0) {
                schemeClr.tint = [_this.ToTint()];
            }
            else if (_this.TintAndShade < 0) {
                schemeClr.shade = [_this.ToShade()];
            }
            if (_this.Transparency !== DefaultTransparent) {
                schemeClr.alpha = [_this.ToTransparency()];
            }
        }
        else if (_this.ColorType === drawingInterface_1.SolidColorType.RGB) {
            removeColorItems(ooColorProperties);

            delete ooColorProperties.schemeClr;
            var sysColor = keyword_null;
            if (_this._rgbColor && _this._rgbColor.IsKnownColor) {
                sysColor = _this._rgbColor.ToKnownColor();
            }
            if (!isNullOrUndefined(sysColor)) {
                var sysClr = ooColorProperties.sysClr = {};
                sysClr.val = sysColor;
                sysClr.lastClr = [_this.RGB.R, _this.RGB.G, _this.RGB.B];
                _this.CalcLumModeOff(lumMod, lumOff);
                setLumValues(sysClr, lumMod, lumOff);
                if (_this.Transparency !== DefaultTransparent) {
                    sysClr.alpha = [_this.ToTransparency()];
                }
            }
            else {
                var srgbClr = ooColorProperties.srgbClr = {};
                srgbClr.val = [_this.RGB.R, _this.RGB.G, _this.RGB.B];
                _this.CalcLumModeOff(lumMod, lumOff);
                setLumValues(srgbClr, lumMod, lumOff);
                if (_this.Transparency !== DefaultTransparent) {
                    srgbClr.alpha = [_this.ToTransparency()];
                }
                if (_this.TintAndShade > 0) {
                    srgbClr.tint = [_this.ToTint()];
                }
                else if (_this.TintAndShade < 0) {
                    srgbClr.shade = [_this.ToShade()];
                }
            }
        }
        var colorFillType = colorProperties && colorProperties.colorFillType;
        if (!isNullOrUndefined(colorFillType)) {
            ooColorProperties.colorFillType = colorFillType;
        }
        return ooColorProperties;
    };
    ColorFormat.prototype.FromTint = function (val) {
        this.TintAndShade = 1 - val / PositionConver;
    };
    ColorFormat.prototype.FromShade = function (val) {
        this.TintAndShade = val / PositionConver - 1;
    };
    ColorFormat.prototype.ToTint = function () {
        return Math_floor(Math_abs((1 - this.TintAndShade) * PositionConver));
    };
    ColorFormat.prototype.ToShade = function () {
        return Math_floor(Math_abs((1 + this.TintAndShade) * PositionConver));
    };
    ColorFormat.prototype.FromTransparency = function (val) {
        this.Transparency = 1 - val / PositionConver;
    };
    ColorFormat.prototype.ToTransparency = function () {
        return Math_floor((1 - this.Transparency) * PositionConver);
    };
    ColorFormat.prototype.Clone = function () {
        var _this = this;
        var format = new ColorFormat(_this._context);
        format._brightness = _this._brightness;
        format._colorType = _this._colorType;
        format._context = _this._context;
        format._rgbColor = _this._rgbColor;
        format._themeColor = _this._themeColor;
        format._tint = _this._tint;
        format.AutoColorFormat = _this.AutoColorFormat;
        return format;
    };
    ColorFormat.prototype.FromOOModel = function (t) {
        this.FromCT_ColorProperties(t);
    };
    ColorFormat.prototype.ToOOModel = function () {
        var colorType = this.ColorType;
        if (colorType === drawingInterface_1.SolidColorType.Automatic) {
            return {} ;
        }
        else if (colorType === drawingInterface_1.SolidColorType.None) {
            return {
                colorFillType: drawingInterface_1.ColorFillType.NoFillProperties
            };
        }
        return this.ToCT_ColorProperties({ colorFillType: 0 } );
    };
    ColorFormat.prototype.Color_FromOOModel = function (t ) {
        this.FromCT_ColorProperties(t);
    };
    ColorFormat.prototype.Color_ToOOModel = function () {
        return this.ToCT_ColorProperties({} );
    };
    ColorFormat.prototype.GradientStop_FromOOModel = function (t ) {
        this.FromCT_ColorProperties(t);
    };
    ColorFormat.prototype.GradientStop_ToOOModel = function () {
        return this.ToCT_ColorProperties({} ) ;
    };
    ColorFormat.prototype.ColorData_FromOOModel = function (t) {
        if (t.ColorType === drawingInterface_1.ColorType.Index) {
            this.RGB = color_1.ARGBColor.FromArgb(t.Value);
        }
        else if (t.ColorType === drawingInterface_1.ColorType.Theme) {
            this.ObjectThemeColor = t.Value;
            this.TintAndShade = t.Tint;
        }
    };
    ColorFormat.prototype.ColorData_ToOOModel = function () {
        var _this = this;
        var colorData = new colorData_1.ColorData();
        if (_this.ColorType === drawingInterface_1.SolidColorType.RGB) {
            colorData.Value = _this.RGB.Value;
            colorData.ColorType = drawingInterface_1.ColorType.RGB;
        }
        else if (_this.ColorType === drawingInterface_1.SolidColorType.Theme) {
            colorData.Value = _this.ObjectThemeColor;
            colorData.Tint = _this.TintAndShade;
            colorData.ColorType = drawingInterface_1.ColorType.Theme;
        }
        return colorData;
    };
    Object.defineProperty(ColorFormat.prototype, 'Brightness', {
        get: function () {
            if (!this.GetState(drawingInterface_1.ColorFormatStates.Brightness) && !isNullOrUndefined(this._parent)) {
                return this._parent.Brightness;
            }
            return this._brightness;
        },
        set: function (value) {
            if (value < -1 || value > 1) {
                throw new Error();
            }
            this._brightness = value;
            this.Dirty(drawingInterface_1.ColorFormatStates.Brightness);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorFormat.prototype, 'ObjectThemeColor', {
        get: function () {
            if (!this.GetState(drawingInterface_1.ColorFormatStates.ObjectThemeColor) && !isNullOrUndefined(this._parent)) {
                return this._parent.ObjectThemeColor;
            }
            return this._themeColor;
        },
        set: function (value) {
            var _this = this;

            var themeColorDict = {
                13: 1,
                14: 0,
                15: 3,
                16: 2
            };
            if (!isNullOrUndefined(themeColorDict[value])) {
                value = themeColorDict[value];
            }
            _this._themeColor = value;
            _this.Dirty(drawingInterface_1.ColorFormatStates.ObjectThemeColor);
            _this.ColorType = drawingInterface_1.SolidColorType.Theme;
            _this._rgbColor = keyword_null;
            _this.UnDirty(drawingInterface_1.ColorFormatStates.RGB);
            _this._brightness = 0;
            _this.Dirty(drawingInterface_1.ColorFormatStates.Brightness);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorFormat.prototype, 'RGB', {
        get: function () {
            var _this = this;
            if (!_this.HasOwnColor() && !isNullOrUndefined(_this._parent)) {
                return _this._parent.RGB;
            }
            return _this._context._ToARGBColor(_this.GetColorData());
        },
        set: function (value) {
            var _this = this;
            _this._rgbColor = value;

            _this.Transparency = 1 - (value.A / 255);
            _this.Dirty(drawingInterface_1.ColorFormatStates.RGB);
            _this.ColorType = drawingInterface_1.SolidColorType.RGB;
            _this._themeColor = drawingInterface_1.ColorSchemeIndex.None;
            _this.Dirty(drawingInterface_1.ColorFormatStates.ObjectThemeColor);

            _this._brightness = 0;
            _this._tint = 0;
            _this.Dirty(drawingInterface_1.ColorFormatStates.Brightness);
            _this.Dirty(drawingInterface_1.ColorFormatStates.TintAndShade);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorFormat.prototype, 'TintAndShade', {
        get: function () {
            var _this = this;
            if (!_this.GetState(drawingInterface_1.ColorFormatStates.TintAndShade) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.TintAndShade;
            }
            return _this._tint;
        },
        set: function (value) {
            this._tint = value;
            this.Dirty(drawingInterface_1.ColorFormatStates.TintAndShade);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorFormat.prototype, 'Transparency', {
        get: function () {
            var _this = this;
            if (!_this.GetState(drawingInterface_1.ColorFormatStates.Transparency) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Transparency;
            }
            return _this._transparency;
        },
        set: function (value) {
            value = Math.max(0, Math.min(1, value));
            this._transparency = value;
            this.Dirty(drawingInterface_1.ColorFormatStates.Transparency);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorFormat.prototype, 'ColorType', {
        get: function () {
            var _this = this;
            if (!_this.GetState(drawingInterface_1.ColorFormatStates.ColorType) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.ColorType;
            }
            return _this._colorType;
        },
        set: function (value) {
            this._colorType = value;
            this.Dirty(drawingInterface_1.ColorFormatStates.ColorType);
        },
        enumerable: true,
        configurable: true
    });
    return ColorFormat;
}(stateful_1.StatefullBase));
exports.ColorFormat = ColorFormat;
function removeColorItems(ooColorProperties) {
    delete ooColorProperties.hslClr;
    delete ooColorProperties.prstClr;
    delete ooColorProperties.scrgbClr;
    delete ooColorProperties.srgbClr;
    delete ooColorProperties.sysClr;
}
function setLumValues(clr, lumMod, lumOff) {
    if (lumMod.length > 0) {
        clr.lumMod = lumMod;
    }
    if (lumOff.length > 0) {
        clr.lumOff = lumOff;
    }
}
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/common.js':
/*!*******************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/common.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var util_1 = __webpack_require__(/*! util */ './node_modules/util/util.js');
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var _DateTimeHelper = Common_1.Common._DateTimeHelper;
var keyword_null = null, keyword_undefined = void 0, Math_max = Math.max, Math_min = Math.min, Math_floor = Math.floor, Math_log = Math.log, Math_pow = Math.pow, Math_ceil = Math.ceil, Math_abs = Math.abs;
var MAX_ROW_COUNT = 1048576, MAX_COLUMN_COUNT = 16384;
function IsNumber(value) {
    return typeof value === 'number' || value instanceof Date;
}
function defineProperty(obj, prop, descriptor) {
    descriptor.configurable = true;
    descriptor.enumerable = true;
    Object.defineProperty(obj, prop, descriptor);
}
var DateTimeExtension = (function () {
    function DateTimeExtension() {
    }
    DateTimeExtension.FromOADate = _DateTimeHelper._fromOADate;
    DateTimeExtension.ToOADate = _DateTimeHelper._toOADate;

    DateTimeExtension.OADateMinAsDouble = -657435.0;

    DateTimeExtension.OADateMaxAsDouble = 2958466.0;
    return DateTimeExtension;
}());
exports.DateTimeExtension = DateTimeExtension;
var NumberExtension = (function () {
    function NumberExtension() {
    }
    NumberExtension.log = function (value, base) {
        return Math_log(value) / Math_log(base);
    };
    NumberExtension.round = function (value, digits) {
        var temp = Math_pow(10, digits);
        return Math.round(value * temp) / temp;
    };
    NumberExtension.isNaNOrInfinite = function (value) {
        return isNaN(value) || !isFinite(value);
    };
    NumberExtension.GetTriangleAngle = function (a, b, c) {
        if (a === 0 && b === 0) {
            return 0;
        }
        var cosB = (a * a + c * c - b * b) / Math_abs((2 * a * c));
        var addAngle = 0;
        if (a < 0 && b > 0) {
            addAngle = 90;
        }
        else if (a < 0 && b < 0) {
            addAngle = 180;
        }
        else if (a > 0 && b < 0) {
            addAngle = 270;
        }
        return Math.acos(cosB) * 180 / Math.PI + addAngle;
    };
    NumberExtension.INT32_MAX_VALUE = 2147483647;
    NumberExtension.DOUBLE_MAX_VALUE = Number.MAX_VALUE;
    NumberExtension.DOUBLE_MIN_VALUE = -Number.MAX_VALUE;
    return NumberExtension;
}());
exports.NumberExtension = NumberExtension;
function roundToDecimal(value, digits) {
    var mult = Math.pow(10, digits);
    return Math.round(value * mult) / mult;
}
var UnitHelper = (function () {
    function UnitHelper() {
    }
    UnitHelper.pointToPixel = function (point) {
        return roundToDecimal(point * 96 / 72, 2);
    };
    UnitHelper.IsNullOrEmpty = function (value) {
        return UnitHelper.isNullOrUndefined(value) || value === '';
    };
    UnitHelper.IsNegativeInfinity = function (value) {
        return value === Number.NEGATIVE_INFINITY ;
    };
    UnitHelper.IsPositiveInfinity = function (value) {
        return value === Number.POSITIVE_INFINITY ;
    };
    UnitHelper.isNullOrUndefined = function (value) {
        return value === keyword_undefined || value === keyword_null;
    };
    return UnitHelper;
}());
exports.UnitHelper = UnitHelper;
var CellRect = (function () {
    function CellRect(row, column, rowCount, columnCount) {
        var _this = this;
        _this.Row = row;
        _this.Column = column;
        _this.RowCount = rowCount;
        _this.ColumnCount = columnCount;
    }
    Object.defineProperty(CellRect.prototype, 'Left', {
        get: function () {
            return this.Column;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRect.prototype, 'Top', {
        get: function () {
            return this.Row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRect.prototype, 'Right', {
        get: function () {
            return this.Column + this.ColumnCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRect.prototype, 'Bottom', {
        get: function () {
            return this.Row + this.RowCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRect.prototype, 'IsFullColumn', {
        get: function () {
            return this.Row === 0 && this.RowCount === NumberExtension.INT32_MAX_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRect.prototype, 'IsFullRow', {
        get: function () {
            return this.Column === 0 && this.ColumnCount === NumberExtension.INT32_MAX_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    CellRect.prototype.Intersect = function (range) {
        var _this = this;
        var other = range;
        var left = Math_max(_this.Column, other.Column);
        var top = Math_max(_this.Row, other.Row);
        var right = Math_min(_this.Right, other.Right);
        var bottom = Math_min(_this.Bottom, other.Bottom);
        if (left >= right || top >= bottom) {
            _this.Column = 0;
            _this.Row = 0;
            _this.ColumnCount = 0;
            _this.RowCount = 0;
        }
        else {
            _this.Column = left;
            _this.Row = top;
            _this.ColumnCount = right - left;
            _this.RowCount = bottom - top;
        }
    };
    CellRect.prototype.IntersectsWith = function (range) {
        var _this = this;
        var other = range;
        if (_this.Left >= other.Right || _this.Right <= other.Left || _this.Top >= other.Bottom || _this.Bottom <= other.Top) {
            return false;
        }
        return true;
    };
    return CellRect;
}());
exports.CellRect = CellRect;
var Range = (function () {
    function Range(worksheet, cellRects) {
        this.Worksheet = worksheet;
        this._originalRects = cellRects;
        this.UpdateRects();
    }
    Range.prototype.UpdateRects = function () {
        var _this = this;
        _this._rects = [];
        var rowCount, columnCount, item, sheet = _this.Worksheet;
        var maxRowCount = sheet.getRowCount(), maxColumnCount = sheet.getColumnCount();
        for (var i = 0; i < _this._originalRects.length; i++) {
            item = _this._originalRects[i];
            var row = item.Row;
            var column = item.Column;
            rowCount = item.RowCount;
            columnCount = item.ColumnCount;
            if (row < 0 || rowCount < 0 || column < 0 || columnCount < 0) {
                if (row < 0 || rowCount < 0) {
                    row = 0;
                    rowCount = NumberExtension.INT32_MAX_VALUE;
                }
                if (column < 0 || columnCount < 0) {
                    column = 0;
                    columnCount = NumberExtension.INT32_MAX_VALUE;
                }
                _this._originalRects[i] = new CellRect(row, column, rowCount, columnCount);
            }


            if ((row !== 0 || rowCount !== NumberExtension.INT32_MAX_VALUE) &&
                (row < 0 || rowCount <= 0 || row + rowCount > MAX_ROW_COUNT)) {
                throw new Error();
            }
            if ((column !== 0 || columnCount !== NumberExtension.INT32_MAX_VALUE) &&
                (column < 0 || columnCount <= 0 || column + columnCount > MAX_COLUMN_COUNT)) {
                throw new Error();
            }
        }
        for (var _i = 0, _a = _this._originalRects; _i < _a.length; _i++) {
            item = _a[_i];
            rowCount = Math_min(item.Bottom, (maxRowCount + 1)) - item.Top;
            columnCount = Math_min(item.Right, (maxColumnCount + 1)) - item.Left;
            _this._rects.push(new CellRect(item.Row, item.Column, rowCount, columnCount));
        }
    };
    Object.defineProperty(Range.prototype, 'Row', {
        get: function () {
            var row = this._rects[0].Row;
            if (row < 0) {
                return 0;
            }
            return row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, 'Column', {
        get: function () {
            var column = this._rects[0].Column;
            if (column < 0) {
                return 0;
            }
            return column;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, 'RowCount', {
        get: function () {
            var _this = this;
            var rowCount = _this._rects[0].RowCount;
            var row = _this._rects[0].Row;
            if (rowCount < 0 || row < 0) {
                var sheet = _this.Worksheet, maxRowCount = sheet.getRowCount();
                return maxRowCount;
            }
            return rowCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, 'ColumnCount', {
        get: function () {
            var _this = this;
            var columnCount = this._rects[0].ColumnCount;
            var column = this._rects[0].Column;
            var sheet = _this.Worksheet, maxColumnCount = sheet.getColumnCount();
            if (columnCount < 0 || column < 0) {
                return maxColumnCount;
            }
            return columnCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, 'EntireRow', {
        get: function () {
            var cellList = [];
            for (var i = 0; i < this._rects.length; i++) {
                var rect = this._rects[i];
                rect.Column = -1;
                rect.ColumnCount = -1;
                cellList.push(rect);
            }
            return new Range(this.Worksheet, cellList);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, 'EntireColumn', {
        get: function () {
            var cellList = [];
            for (var i = 0; i < this._rects.length; i++) {
                var rect = this._rects[i];
                rect.Row = -1;
                rect.RowCount = -1;
                cellList.push(rect);
            }
            return new Range(this.Worksheet, cellList);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, 'Text', {
        get: function () {
            var _this = this;
            return _this.Worksheet._GetCellText(_this.Row, _this.Column, _this.RowCount, _this.ColumnCount);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, 'Areas', {
        get: function () {
            var rects = this._rects;
            var areas = [];
            for (var _i = 0, rects_1 = rects; _i < rects_1.length; _i++) {
                var rect = rects_1[_i];
                areas.push(new Range(this.Worksheet, [rect]));
            }
            return areas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, 'Hidden', {
        get: function () {
            return this.Worksheet._IsHidden(this._originalRects);
        }
        ,
        enumerable: true,
        configurable: true
    });
    return Range;
}());
exports.Range = Range;
var ReferenceKind;
(function (ReferenceKind) {
    ReferenceKind[ReferenceKind['Row'] = 1] = 'Row';
    ReferenceKind[ReferenceKind['Column'] = 2] = 'Column';
    ReferenceKind[ReferenceKind['RowIsRelative'] = 4] = 'RowIsRelative';
    ReferenceKind[ReferenceKind['ColumnIsRelative'] = 8] = 'ColumnIsRelative';
    ReferenceKind[ReferenceKind['LastRowIsRelative'] = 16] = 'LastRowIsRelative';
    ReferenceKind[ReferenceKind['LastColumnIsRelative'] = 32] = 'LastColumnIsRelative';
    ReferenceKind[ReferenceKind['Range'] = 64] = 'Range';
    ReferenceKind[ReferenceKind['Error'] = 128] = 'Error';
})(ReferenceKind || (ReferenceKind = {}));
var Reference = (function () {
    function Reference(worksheetName, row, column, lastRow, lastColumn) {
        var _this = this;
        _this.WorksheetName = worksheetName;
        _this.Row = row;
        _this.Column = column;
        if (typeof lastRow !== 'undefined') {
            _this.LastRow = lastRow;
        }
        if (typeof lastColumn !== 'undefined') {
            _this.LastColumn = lastColumn;
        }
    }
    Object.defineProperty(Reference.prototype, 'Row', {
        get: function () {
            if ((this.Kind & ReferenceKind.Row) === ReferenceKind.Row) {
                return this._row;
            }
            return 0;
        },
        set: function (value) {
            this._row = value;
            this.Kind |= ReferenceKind.Row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'Column', {
        get: function () {
            if ((this.Kind & ReferenceKind.Column) === ReferenceKind.Column) {
                return this._column;
            }
            return 0;
        },
        set: function (value) {
            this._column = value;
            this.Kind |= ReferenceKind.Column;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'RowCount', {
        get: function () {
            var _this = this;
            if (_this.IsRange) {
                if ((_this.Kind & ReferenceKind.Row) === ReferenceKind.Row) {
                    if (_this.RowIsRelative && _this.LastRowIsRelative || !_this.RowIsRelative && !_this.LastRowIsRelative) {
                        return _this.LastRow - _this.Row + 1;
                    }
                    return -1;
                }
                var sheet = _this.Worksheet, maxRowCount = sheet.getRowCount();
                return maxRowCount;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'ColumnCount', {
        get: function () {
            var _this = this;
            if (_this.IsRange) {
                if ((_this.Kind & ReferenceKind.Column) === ReferenceKind.Column) {
                    if (_this.ColumnIsRelative && _this.LastColumnIsRelative || !_this.ColumnIsRelative && !_this.LastColumnIsRelative) {
                        return _this.LastColumn - _this.Column + 1;
                    }
                    return -1;
                }
                return _this.Worksheet.getColumnCount();
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'LastColumn', {
        get: function () {
            var _this = this;
            if (_this.IsRange) {
                if ((_this.Kind & ReferenceKind.Column) === ReferenceKind.Column) {
                    return _this._lastColumn;
                }
                var sheet = _this.Worksheet, maxColumnCount = sheet.getColumnCount();
                return maxColumnCount - 1;
            }
            return _this.Column;
        },
        set: function (value) {
            this._lastColumn = value;
            this.Kind |= ReferenceKind.Column | ReferenceKind.Range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'LastRow', {
        get: function () {
            var _this = this;
            if (_this.IsRange) {
                if ((_this.Kind & ReferenceKind.Row) === ReferenceKind.Row) {
                    return _this._lastRow;
                }
                var sheet = _this.Worksheet, maxRowCount = sheet.getRowCount();
                return maxRowCount - 1;
            }
            return _this.Row;
        },
        set: function (value) {
            this._lastRow = value;
            this.Kind |= ReferenceKind.Row | ReferenceKind.Range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'RowIsRelative', {
        get: function () {
            return (this.Kind & (ReferenceKind.Row | ReferenceKind.RowIsRelative)) === (ReferenceKind.Row | ReferenceKind.RowIsRelative);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'ColumnIsRelative', {
        get: function () {
            return (this.Kind & (ReferenceKind.Column | ReferenceKind.ColumnIsRelative)) === (ReferenceKind.Column | ReferenceKind.ColumnIsRelative);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'LastRowIsRelative', {
        get: function () {
            if (this.IsRange) {
                return (this.Kind & (ReferenceKind.Row | ReferenceKind.LastRowIsRelative)) === (ReferenceKind.Row | ReferenceKind.LastRowIsRelative);
            }
            return this.RowIsRelative;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'LastColumnIsRelative', {
        get: function () {
            if (this.IsRange) {
                return (this.Kind & (ReferenceKind.Column | ReferenceKind.LastColumnIsRelative)) === (ReferenceKind.Column | ReferenceKind.LastColumnIsRelative);
            }
            return this.ColumnIsRelative;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'IsRange', {
        get: function () {
            return (this.Kind & ReferenceKind.Range) === ReferenceKind.Range;
        },
        set: function (value) {
            if (value) {
                this.Kind |= ReferenceKind.Range;
            }
            else {
                this.Kind &= ~ReferenceKind.Range;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, 'IsError', {
        get: function () {
            return this.WorksheetName === '#REF';
        },
        enumerable: true,
        configurable: true
    });
    Reference.prototype.GetSourceRange = function (targetRow, targetColumn) {
        var _this = this;
        var row = _this.Row;
        var column = _this.Column;
        var lastRow = _this.LastRow;
        var lastColumn = _this.LastColumn;
        return new CellRect(row, column, lastRow - row + 1, lastColumn - column + 1);
    };
    Reference.prototype.ToR1C1Text = function (defaultWorksheetName) {
        if (defaultWorksheetName === keyword_undefined) {
            defaultWorksheetName = keyword_null;
        }
        var _this = this;
        var formula = _this._formula;
        if (!util_1.isNullOrUndefined(formula)) {
            return formula;
        }
        if ((_this.Kind & ReferenceKind.Error) === ReferenceKind.Error) {
            return _this.GetPrevText(defaultWorksheetName) + '#REF!';
        }
        var text = '', r, c;
        if ((_this.Kind & ReferenceKind.Row) === ReferenceKind.Row) {
            r = _this.Row;
            if (_this.RowIsRelative) {
                if (r === 0) {
                    text += 'R';
                }
                else {
                    text += 'R[' + r.toString() + ']';
                }
            }
            else {
                text += 'R' + (r + 1).toString();
            }
        }
        if ((_this.Kind & ReferenceKind.Column) === ReferenceKind.Column) {
            c = _this.Column;
            if (_this.ColumnIsRelative) {
                if (c === 0) {
                    text += 'C';
                }
                else {
                    text += 'C[' + c.toString() + ']';
                }
            }
            else {
                text += 'C' + (c + 1).toString();
            }
        }
        if (_this.IsRange) {
            var ignore = false;
            if ((_this.Kind & (ReferenceKind.Row | ReferenceKind.Column)) !== (ReferenceKind.Row | ReferenceKind.Column)) {
                if ((_this.Kind & ReferenceKind.Row) === ReferenceKind.Row) {
                    if (_this.RowIsRelative === _this.LastRowIsRelative && _this.Row === _this.LastRow) {
                        ignore = true;
                    }
                }
                else if (_this.ColumnIsRelative === _this.LastColumnIsRelative && _this.Column === _this.LastColumn) {
                    ignore = true;
                }
            }
            if (!ignore) {
                text += ':';
                if ((_this.Kind & ReferenceKind.Row) === ReferenceKind.Row) {
                    r = _this.LastRow;
                    if (_this.LastRowIsRelative) {
                        if (r === 0) {
                            text += 'R';
                        }
                        else {
                            text += 'R[' + r.toString() + ']';
                        }
                    }
                    else {
                        text += 'R' + (r + 1).toString();
                    }
                }
                if ((_this.Kind & ReferenceKind.Column) === ReferenceKind.Column) {
                    c = _this.LastColumn;
                    if (_this.LastColumnIsRelative) {
                        if (c === 0) {
                            text += 'C';
                        }
                        else {
                            text += 'C[' + c.toString() + ']';
                        }
                    }
                    else {
                        text += 'C' + (c + 1).toString();
                    }
                }
            }
        }
        return _this.GetPrevText(defaultWorksheetName) + text;
    };
    Reference.prototype.ToA1Text = function (baseRow, baseColumn, defaultWorksheetName) {
        if (defaultWorksheetName === keyword_undefined) {
            defaultWorksheetName = keyword_null;
        }
        var _this = this;
        var formula = _this._formula;
        if (!util_1.isNullOrUndefined(formula)) {
            return formula;
        }
        if ((_this.Kind & ReferenceKind.Error) === ReferenceKind.Error) {
            return _this.GetPrevText(defaultWorksheetName) + '#REF!';
        }
        var text = '', r, c;
        if ((_this.Kind & ReferenceKind.Column) === ReferenceKind.Column) {
            c = _this.Column;
            if (_this.ColumnIsRelative) {
                c += baseColumn;
            }
            else {
                text += '$';
            }
            if (!isNaN(c)) {
                text += _this.GetColumnIndexInA1Letter(c);
            }
        }
        if ((_this.Kind & ReferenceKind.Row) === ReferenceKind.Row) {
            r = _this.Row;
            if (_this.RowIsRelative) {
                r += baseRow;
            }
            else {
                text += '$';
            }
            text += (r + 1).toString();
        }
        if (_this.IsRange) {
            text += ':';
            if ((_this.Kind & ReferenceKind.Column) === ReferenceKind.Column) {
                c = _this.LastColumn;
                if (_this.LastColumnIsRelative) {
                    c += baseColumn;
                }
                else {
                    text += '$';
                }
                if (!isNaN(c)) {
                    text += _this.GetColumnIndexInA1Letter(c);
                }
            }
            if ((_this.Kind & ReferenceKind.Row) === ReferenceKind.Row) {
                r = _this.LastRow;
                if (_this.LastRowIsRelative) {
                    r += baseRow;
                }
                else {
                    text += '$';
                }
                text += (r + 1).toString();
            }
        }
        return _this.GetPrevText(defaultWorksheetName) + text;
    };
    Reference.prototype.GetPrevText = function (defaultWorksheetName) {
        var _this = this;
        var prevText = '';
        if (_this.Workbook > 0) {
            prevText = '[' + _this.Workbook.toString() + ']';
        }
        var worksheetName = _this.WorksheetName;
        if (UnitHelper.isNullOrUndefined(worksheetName)) {
            worksheetName = defaultWorksheetName;
        }
        if (worksheetName) {
            if (!UnitHelper.isNullOrUndefined(_this.LastWorksheetName)) {
                prevText += worksheetName + ':' + _this.LastWorksheetName;
            }
            else {
                prevText += worksheetName;
            }
        }
        if (prevText) {
            if (_this.IsSpecialSheetName(worksheetName) || _this.IsSpecialSheetName(_this.LastWorksheetName)) {
                prevText = '\'' + prevText.replace('\'', '\'\'') + '\'';
            }
            prevText += '!';
        }
        else if (worksheetName === '') {
            prevText = '!';
        }
        return prevText;
    };
    Reference.prototype.IsSpecialSheetName = function (name) {
        if (!UnitHelper.isNullOrUndefined(name)) {
            if (name === Reference.ErrorWorksheetName) {
                return false;
            }
            for (var i = 0; i < name.length; i++) {
                var c = name[i];
                if (!(c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' || c >= '0' && c <= '9' || c === '_')) {
                    return true;
                }
            }
        }
        return false;
    };
    Reference.prototype.GetColumnIndexInA1Letter = function (num) {
        var Alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var sb = [];
        var index = 0;
        while (true) {
            index = num % 26;
            if (isNaN(index)) {
                break;
            }
            sb.unshift(Alpha[index]);
            num = parseInt((num / 26) + '', 10);
            if (num === 0) {
                break;
            }
            num--;
        }
        return sb.join('');
    };
    Reference.ErrorWorksheetName = '#REF';
    return Reference;
}());
exports.Reference = Reference;
exports.ChartConstants = {
    XValuesMinMax: 'XValuesMinMax',
    ValuesMinMax: 'ValuesMinMax',
    PrimaryValuesMinMax: 'PrimaryValuesMinMax',
    SecondaryValuesMinMax: 'SecondaryValuesMinMax',
    PrimaryXValuesMinMax: 'PrimaryXValuesMinMax',
    SecondaryXValuesMinMax: 'SecondaryXValuesMinMax',
    Collection: 'Collection',
    Restore: 'Restore',
    ChartType: 'ChartType',
    AxisGroup: 'AxisGroup',
    AreAllXValuesDateTime: 'AreAllXValuesDateTime',
    XValuesFormula: 'XValuesFormula',
    XValues: 'XValues',
    CategoryNames: 'CategoryNames',
    CategoryType: 'CategoryType',
    SecondaryPlot: 'SecondaryPlot',
    SplitType: 'SplitType',
    SplitValue: 'SplitValue',
    IsMultiLevelXValues: 'IsMultiLevelXValues',
    PlotOrder: 'PlotOrder',
    FIELD_TYPE_CELLRANGE: 'CELLRANGE',
    FIELD_TYPE_SERIESNAME: 'SERIESNAME',
    FIELD_TYPE_CATEGORYNAME: 'CATEGORYNAME',
    FIELD_TYPE_VALUE: 'VALUE',
    FIELD_TYPE_XVALUE: 'XVALUE',
    FIELD_TYPE_YVALUE: 'YVALUE',
    FIELD_TYPE_BUBBLESIZE: 'BUBBLESIZE',
    FIELD_TYPE_PERCENTAGE: 'PERCENTAGE',
    FIELD_TYPE_TXLINK: 'TxLink',
    FIELD_TEXT_CELLRANGE: '[CELLRANGE]',
    FIELD_TEXT_SERIESNAME: '[SERIES NAME]',
    FIELD_TEXT_CATEGORYNAME: '[CATEGORY NAME]',
    FIELD_TEXT_VALUE: '[VALUE]',
    FIELD_TEXT_XVALUE: '[XVALUE]',
    FIELD_TEXT_YVALUE: '[YVALUE]',
    FIELD_TEXT_BUBBLESIZE: '[BUBBLE SIZE]',
    CHART_LATIN_HEAD_FONT: '+mj-lt',
    CHART_LATIN_BODY_FONT: '+mn-lt',
    CHART_EA_HEAD_FONT: '+mj-ea',
    CHART_EA_BODY_FONT: '+mn-ea',
    CHART_CS_HEAD_FONT: '+mj-cs',
    CHART_CS_BODY_FONT: '+mn-cs',
    DefaultLineColorBrightness: 0.85,
    DefaultMarkerSize: 7
};
exports.ShapeConstants = {
    ShapeTypePrefix: 'Shape',
    PositiveFixedAngleConvert: 60000,
    PositionConver: 100000,
    CropPositionConver: 1000,
    ShadeConver: 200000,
    DefaultBrightness: 0.5,
    RelativeRectConver: 1000,
    DefaultTransparent: 0,
    PositiveFixedPercentageConvert: 100000,
    DefaultOffset: 2.07995176
};
var PATTERNTYPE = ['', 'Dotted-5%', 'Dotted-10%', 'Dotted-20%', 'Dotted-25%', 'Dotted-30%', 'Dotted-40%',
    'Dotted-50%', 'Dotted-60%', 'Dotted-70%', 'Dotted-75%', 'Dotted-80%', 'Dotted-90%',
    'HorizontalStripes-Dark', 'VerticalStripes-Dark', 'DiagonalStripes-DarkDownward', 'DiagonalStripes-DarkUpward', 'SmallCheckerBoard', 'Trellis',
    'HorizontalStripes-Light', 'VerticalStripes-Light', 'DiagonalStripes-LightDownward', 'DiagonalStripes-LightUpward', 'SmallGrid', 'DottedDiamondGrid',
    'DiagonalStripes-WideDownward', 'DiagonalStripes-WideUpward', 'Stripes-Slashes', 'Stripes-Backslashes', 'VerticalStripes-Narrow', 'HorizontalStripes-Narrow',
    'VerticalStripes-AlternatingVerticalLines', 'HorizontalStripes-AlternatingHorizontalLines', 'LargeConfetti', 'LargeGrid', 'HorizontalBrick', 'LargeCheckerBoard',
    'SmallConfetti', 'ZigZag', 'SolidDiamondGrid', 'DiagonalBrick', 'OutlinedDiamondGrid', 'Plaid',
    'Sphere', 'Weave', 'DottedGrid', 'Divot', 'Shingle', 'Wave'
];
var ThemeColorDict;
(function (ThemeColorDict) {
    ThemeColorDict[ThemeColorDict['background 1'] = 0] = 'background 1';
    ThemeColorDict[ThemeColorDict['background 2'] = 2] = 'background 2';
    ThemeColorDict[ThemeColorDict['text 1'] = 1] = 'text 1';
    ThemeColorDict[ThemeColorDict['text 2'] = 3] = 'text 2';
    ThemeColorDict[ThemeColorDict['accent 1'] = 4] = 'accent 1';
    ThemeColorDict[ThemeColorDict['accent 2'] = 5] = 'accent 2';
    ThemeColorDict[ThemeColorDict['accent 3'] = 6] = 'accent 3';
    ThemeColorDict[ThemeColorDict['accent 4'] = 7] = 'accent 4';
    ThemeColorDict[ThemeColorDict['accent 5'] = 8] = 'accent 5';
    ThemeColorDict[ThemeColorDict['accent 6'] = 9] = 'accent 6';
    ThemeColorDict[ThemeColorDict['hyperlink'] = 10] = 'hyperlink';
    ThemeColorDict[ThemeColorDict['followedhyperlink'] = 11] = 'followedhyperlink';
})(ThemeColorDict || (ThemeColorDict = {}));
function isEmptyObject(obj) {
    if (obj === null || obj === undefined) {
        return true;
    }

    if (Array.isArray(obj)) {
        return obj.length === 0;
    }

    if (obj instanceof Date) {
        return false;
    }

    if (typeof obj !== 'object') {
        return false;
    }


    for (var key in obj) {
        return false ;
    }
    return true;
}
function simpleJSONObject(obj, excludeFields) {
    if (isEmptyObject(obj)) {
        return null;
    }
    for (var key in obj) {
        if (excludeFields.indexOf(key) >= 0) {
            continue;
        }
        var item = obj[key];
        if (Array.isArray(item)) {
            if ((item.length === 0) || (simpleArray(item, excludeFields) === null)) {
                delete obj[key];
            }
        }
        else if (typeof item === 'object') {
            item = simpleJSONObject(item, excludeFields);
            if (item === null) {
                delete obj[key];
            }
        }
    }
    if (isEmptyObject(obj)) {
        return null;
    }
    return obj;
}
function simpleArray(array, excludeFields) {
    var result = [];
    var count = array.length;
    array.forEach(function (item) {
        var temp = simpleJSONObject(item, excludeFields);
        if (temp !== null) {
            result.push(temp);
        }
    });
    if (result.length < count) {
        [].splice.apply(array, [].concat(0, count, result));
    }
    return result.length ? array : null;
}

function deleteFillItems(target) {
    delete target.solidFill;
    delete target.pattFill;
    delete target.blipFill;
    delete target.gradFill;
    delete target.noFill;
    delete target.grpFill;
    delete target.uFill;
    delete target.uFillTx;
}
var ChartUtility = (function () {
    function ChartUtility() {
    }
    ChartUtility._ToARGBColor = function (currentTheme, color) {
        return;
    };
    ChartUtility._ToFont = function (currentTheme, themeFont) {
        if (themeFont === drawingInterface_1.ThemeFont.Major) {
            return currentTheme.getFont('Headings');
        }
        else if (themeFont === drawingInterface_1.ThemeFont.Minor) {
            return currentTheme.getFont('Body');
        }
        return '';
    };
    ChartUtility.colorFormatToString = function (obj, needThemeColor, needRGBA, notAddTransprent) {
        var colorFormat = obj && obj.Color;
        return ChartUtility.colorFormatToStringImp(colorFormat, needThemeColor, needRGBA, notAddTransprent);
    };
    ChartUtility.colorFormatToStringImp = function (colorFormat, needThemeColor, needRGBA, notAddTransprent) {
        if (colorFormat && colorFormat.ColorType !== drawingInterface_1.SolidColorType.None) {
            if (needThemeColor) {
                var colorData = colorFormat.GetColorData();
                if (colorData.ColorType === drawingInterface_1.ColorType.Theme) {
                    return ChartUtility.toThemeColorString(colorData.Value, colorData.Tint);
                }
            }
            var rgb = colorFormat.RGB;
            if (rgb) {
                if (needRGBA) {
                    return 'rgba(' + rgb.R + ',' + rgb.G + ',' + rgb.B + ',' + rgb.A / 255 + ')';
                }
                return 'rgb(' + rgb.R + ',' + rgb.G + ',' + rgb.B + ')';
            }
        }
        else if (colorFormat && colorFormat.ColorType === drawingInterface_1.SolidColorType.None && notAddTransprent) {
            return '';
        }
        return 'transparent';
    };
    ChartUtility.getFillFormatResult = function (obj, needThemeColor, needRGBA, notAddTransprent, needConvert) {
        var type = obj && obj.Type;
        if (type === 1 ) {
            var result = {};
            var PatternColorFormat = obj && obj.PatternColor;
            var fillColorFormat = obj && obj.Color;
            var foregroundColor = ChartUtility.colorFormatToStringImp(PatternColorFormat, needThemeColor, needRGBA, notAddTransprent);
            var backgroundColor = ChartUtility.colorFormatToStringImp(fillColorFormat, needThemeColor, needRGBA, notAddTransprent);
            if (needConvert) {
                result.type = 'Pattern';
                result.color = backgroundColor;
                result.pattern = [];
                result.pattern.push({
                    style: {
                        fill: foregroundColor
                    },
                    content: PATTERNTYPE[obj.Pattern]
                });
            }
            else {
                result.type = obj.Pattern;
                result.foregroundColor = foregroundColor;
                result.backgroundColor = backgroundColor;
            }
            return result;
        }
        else {
            return ChartUtility.colorFormatToString(obj, needThemeColor, needRGBA, notAddTransprent);
        }
    };
    ChartUtility.getTransparencyFromColorFormat = function (obj, ignoreFillColor) {
        var colorFormat = obj && obj.Color;
        if (colorFormat && (colorFormat.ColorType !== drawingInterface_1.SolidColorType.None || ignoreFillColor)) {
            if (!UnitHelper.isNullOrUndefined(colorFormat.Transparency)) {
                return parseFloat(colorFormat.Transparency.toFixed(2));
            }
            var rgb = colorFormat.RGB;
            if (rgb) {
                return parseFloat((rgb.A / 255).toFixed(2));
            }
        }
        return 0;
    };
    ChartUtility.toThemeColorString = function (index, tint) {
        return ThemeColorDict[index] + ' ' + parseInt(tint * 100 + '', 10);
    };
    ChartUtility.fromThemeColorString = function (colorString) {
        var tempArray = colorString.split(' '), length = tempArray.length;
        var firstItem = tempArray[0].toLowerCase(), secondItem = tempArray[1], thirdItem = tempArray[2];
        if (firstItem === 'hyperlink' || firstItem === 'followedhyperlink') {
            if (length === 1) {
                return {
                    index: ThemeColorDict[firstItem],
                    tint: 0
                };
            }
            if (length === 2) {
                return {
                    index: ThemeColorDict[firstItem],
                    tint: parseInt(secondItem, 10) / 100
                };
            }
        }
        if (length >= 2) {
            var index = ThemeColorDict[firstItem + ' ' + secondItem];
            if (index !== keyword_undefined) {
                if (length === 2) {
                    return {
                        index: index,
                        tint: 0
                    };
                }
                if (length === 3) {
                    return {
                        index: index,
                        tint: parseInt(thirdItem, 10) / 100
                    };
                }
            }
        }
    };
    ChartUtility.InitPresetColors = function () {
        var presetColors = ChartUtility.presetColors;
        presetColors[drawingInterface_1.ST_PresetColorVal.aliceBlue] = [240, 248, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.antiqueWhite] = [250, 235, 215];
        presetColors[drawingInterface_1.ST_PresetColorVal.aqua] = [0, 255, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.aquamarine] = [127, 255, 212];
        presetColors[drawingInterface_1.ST_PresetColorVal.azure] = [240, 255, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.beige] = [245, 245, 220];
        presetColors[drawingInterface_1.ST_PresetColorVal.bisque] = [255, 228, 196];
        presetColors[drawingInterface_1.ST_PresetColorVal.black] = [0, 0, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.blanchedAlmond] = [255, 235, 205];
        presetColors[drawingInterface_1.ST_PresetColorVal.blue] = [0, 0, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.blueViolet] = [138, 43, 226];
        presetColors[drawingInterface_1.ST_PresetColorVal.brown] = [165, 42, 42];
        presetColors[drawingInterface_1.ST_PresetColorVal.burlyWood] = [222, 184, 135];
        presetColors[drawingInterface_1.ST_PresetColorVal.cadetBlue] = [95, 158, 160];
        presetColors[drawingInterface_1.ST_PresetColorVal.chartreuse] = [127, 255, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.chocolate] = [210, 105, 30];
        presetColors[drawingInterface_1.ST_PresetColorVal.coral] = [255, 127, 80];
        presetColors[drawingInterface_1.ST_PresetColorVal.cornflowerBlue] = [100, 149, 237];
        presetColors[drawingInterface_1.ST_PresetColorVal.cornsilk] = [255, 248, 220];
        presetColors[drawingInterface_1.ST_PresetColorVal.crimson] = [220, 20, 60];
        presetColors[drawingInterface_1.ST_PresetColorVal.cyan] = [0, 255, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkBlue] = [0, 0, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkCyan] = [0, 139, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkGoldenrod] = [184, 134, 11];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkGray] = [169, 169, 169];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkGreen] = [0, 100, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkGrey] = [169, 169, 169];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkKhaki] = [189, 183, 107];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkMagenta] = [139, 0, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkOliveGreen] = [85, 107, 47];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkOrange] = [255, 140, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkOrchid] = [153, 50, 204];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkRed] = [139, 0, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkSalmon] = [233, 150, 122];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkSeaGreen] = [143, 188, 143];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkSlateBlue] = [72, 61, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkSlateGray] = [47, 79, 79];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkSlateGrey] = [47, 79, 79];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkTurquoise] = [0, 206, 209];
        presetColors[drawingInterface_1.ST_PresetColorVal.darkViolet] = [148, 0, 211];
        presetColors[drawingInterface_1.ST_PresetColorVal.deepPink] = [255, 20, 147];
        presetColors[drawingInterface_1.ST_PresetColorVal.deepSkyBlue] = [0, 191, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.dimGray] = [105, 105, 105];
        presetColors[drawingInterface_1.ST_PresetColorVal.dimGrey] = [105, 105, 105];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkBlue] = [0, 0, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkCyan] = [0, 139, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkGoldenrod] = [184, 134, 11];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkGray] = [169, 169, 169];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkGreen] = [0, 100, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkGrey] = [169, 169, 169];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkKhaki] = [189, 183, 107];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkMagenta] = [139, 0, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkOliveGreen] = [85, 107, 47];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkOrange] = [255, 140, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkOrchid] = [153, 50, 204];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkRed] = [139, 0, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkSalmon] = [233, 150, 122];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkSeaGreen] = [143, 188, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkSlateBlue] = [72, 61, 139];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkSlateGray] = [47, 79, 79];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkSlateGrey] = [47, 79, 79];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkTurquoise] = [0, 206, 209];
        presetColors[drawingInterface_1.ST_PresetColorVal.dkViolet] = [148, 0, 211];
        presetColors[drawingInterface_1.ST_PresetColorVal.dodgerBlue] = [30, 144, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.firebrick] = [178, 34, 34];
        presetColors[drawingInterface_1.ST_PresetColorVal.floralWhite] = [255, 250, 240];
        presetColors[drawingInterface_1.ST_PresetColorVal.forestGreen] = [34, 139, 34];
        presetColors[drawingInterface_1.ST_PresetColorVal.fuchsia] = [255, 0, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.gainsboro] = [220, 220, 220];
        presetColors[drawingInterface_1.ST_PresetColorVal.ghostWhite] = [248, 248, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.gold] = [255, 215, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.goldenrod] = [218, 165, 32];
        presetColors[drawingInterface_1.ST_PresetColorVal.gray] = [128, 128, 128];
        presetColors[drawingInterface_1.ST_PresetColorVal.green] = [0, 128, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.greenYellow] = [173, 255, 47];
        presetColors[drawingInterface_1.ST_PresetColorVal.grey] = [128, 128, 128];
        presetColors[drawingInterface_1.ST_PresetColorVal.honeydew] = [240, 255, 240];
        presetColors[drawingInterface_1.ST_PresetColorVal.hotPink] = [255, 105, 180];
        presetColors[drawingInterface_1.ST_PresetColorVal.indianRed] = [205, 92, 92];
        presetColors[drawingInterface_1.ST_PresetColorVal.indigo] = [75, 0, 130];
        presetColors[drawingInterface_1.ST_PresetColorVal.ivory] = [255, 255, 240];
        presetColors[drawingInterface_1.ST_PresetColorVal.khaki] = [240, 230, 140];
        presetColors[drawingInterface_1.ST_PresetColorVal.lavender] = [230, 230, 250];
        presetColors[drawingInterface_1.ST_PresetColorVal.lavenderBlush] = [255, 240, 245];
        presetColors[drawingInterface_1.ST_PresetColorVal.lawnGreen] = [124, 252, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.lemonChiffon] = [255, 250, 205];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightBlue] = [173, 216, 230];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightCoral] = [240, 128, 128];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightCyan] = [224, 255, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightGoldenrodYellow] = [250, 250, 210];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightGray] = [211, 211, 211];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightGreen] = [144, 238, 144];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightGrey] = [211, 211, 211];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightPink] = [255, 182, 193];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightSalmon] = [255, 160, 122];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightSeaGreen] = [32, 178, 170];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightSkyBlue] = [135, 206, 250];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightSlateGray] = [119, 136, 153];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightSlateGrey] = [119, 136, 153];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightSteelBlue] = [176, 196, 222];
        presetColors[drawingInterface_1.ST_PresetColorVal.lightYellow] = [255, 255, 224];
        presetColors[drawingInterface_1.ST_PresetColorVal.lime] = [0, 255, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.limeGreen] = [50, 205, 50];
        presetColors[drawingInterface_1.ST_PresetColorVal.linen] = [250, 240, 230];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltBlue] = [173, 216, 230];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltCoral] = [240, 128, 128];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltCyan] = [224, 255, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltGoldenrodYellow] = [250, 250, 120];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltGray] = [211, 211, 211];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltGreen] = [144, 238, 144];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltGrey] = [211, 211, 211];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltPink] = [255, 182, 193];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltSalmon] = [255, 160, 122];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltSeaGreen] = [32, 178, 170];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltSkyBlue] = [135, 206, 250];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltSlateGray] = [119, 136, 153];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltSlateGrey] = [119, 136, 153];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltSteelBlue] = [176, 196, 222];
        presetColors[drawingInterface_1.ST_PresetColorVal.ltYellow] = [255, 255, 224];
        presetColors[drawingInterface_1.ST_PresetColorVal.magenta] = [255, 0, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.maroon] = [128, 0, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.medAquamarine] = [102, 205, 170];
        presetColors[drawingInterface_1.ST_PresetColorVal.medBlue] = [0, 0, 205];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumAquamarine] = [102, 205, 170];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumBlue] = [0, 0, 205];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumOrchid] = [186, 85, 211];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumPurple] = [147, 112, 219];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumSeaGreen] = [60, 179, 113];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumSlateBlue] = [123, 104, 238];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumSpringGreen] = [0, 250, 154];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumTurquoise] = [72, 209, 204];
        presetColors[drawingInterface_1.ST_PresetColorVal.mediumVioletRed] = [199, 21, 133];
        presetColors[drawingInterface_1.ST_PresetColorVal.medOrchid] = [186, 85, 211];
        presetColors[drawingInterface_1.ST_PresetColorVal.medPurple] = [147, 112, 219];
        presetColors[drawingInterface_1.ST_PresetColorVal.medSeaGreen] = [60, 179, 113];
        presetColors[drawingInterface_1.ST_PresetColorVal.medSlateBlue] = [123, 104, 238];
        presetColors[drawingInterface_1.ST_PresetColorVal.medSpringGreen] = [0, 250, 154];
        presetColors[drawingInterface_1.ST_PresetColorVal.medTurquoise] = [72, 209, 204];
        presetColors[drawingInterface_1.ST_PresetColorVal.medVioletRed] = [199, 21, 133];
        presetColors[drawingInterface_1.ST_PresetColorVal.midnightBlue] = [25, 25, 112];
        presetColors[drawingInterface_1.ST_PresetColorVal.mintCream] = [245, 255, 250];
        presetColors[drawingInterface_1.ST_PresetColorVal.mistyRose] = [255, 228, 225];
        presetColors[drawingInterface_1.ST_PresetColorVal.moccasin] = [255, 228, 181];
        presetColors[drawingInterface_1.ST_PresetColorVal.navajoWhite] = [255, 222, 173];
        presetColors[drawingInterface_1.ST_PresetColorVal.navy] = [0, 0, 128];
        presetColors[drawingInterface_1.ST_PresetColorVal.oldLace] = [253, 245, 230];
        presetColors[drawingInterface_1.ST_PresetColorVal.olive] = [128, 128, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.oliveDrab] = [107, 142, 35];
        presetColors[drawingInterface_1.ST_PresetColorVal.orange] = [255, 165, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.orangeRed] = [255, 69, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.orchid] = [218, 112, 214];
        presetColors[drawingInterface_1.ST_PresetColorVal.paleGoldenrod] = [238, 232, 170];
        presetColors[drawingInterface_1.ST_PresetColorVal.paleGreen] = [152, 251, 152];
        presetColors[drawingInterface_1.ST_PresetColorVal.paleTurquoise] = [175, 238, 238];
        presetColors[drawingInterface_1.ST_PresetColorVal.paleVioletRed] = [219, 112, 147];
        presetColors[drawingInterface_1.ST_PresetColorVal.papayaWhip] = [255, 239, 213];
        presetColors[drawingInterface_1.ST_PresetColorVal.peachPuff] = [255, 218, 185];
        presetColors[drawingInterface_1.ST_PresetColorVal.peru] = [205, 133, 63];
        presetColors[drawingInterface_1.ST_PresetColorVal.pink] = [255, 192, 203];
        presetColors[drawingInterface_1.ST_PresetColorVal.plum] = [221, 160, 221];
        presetColors[drawingInterface_1.ST_PresetColorVal.powderBlue] = [176, 224, 230];
        presetColors[drawingInterface_1.ST_PresetColorVal.purple] = [128, 0, 128];
        presetColors[drawingInterface_1.ST_PresetColorVal.red] = [255, 0, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.rosyBrown] = [188, 143, 143];
        presetColors[drawingInterface_1.ST_PresetColorVal.royalBlue] = [65, 105, 225];
        presetColors[drawingInterface_1.ST_PresetColorVal.saddleBrown] = [139, 69, 19];
        presetColors[drawingInterface_1.ST_PresetColorVal.salmon] = [250, 128, 114];
        presetColors[drawingInterface_1.ST_PresetColorVal.sandyBrown] = [244, 164, 96];
        presetColors[drawingInterface_1.ST_PresetColorVal.seaGreen] = [46, 139, 87];
        presetColors[drawingInterface_1.ST_PresetColorVal.seaShell] = [255, 245, 238];
        presetColors[drawingInterface_1.ST_PresetColorVal.sienna] = [160, 82, 45];
        presetColors[drawingInterface_1.ST_PresetColorVal.silver] = [192, 192, 192];
        presetColors[drawingInterface_1.ST_PresetColorVal.skyBlue] = [135, 206, 235];
        presetColors[drawingInterface_1.ST_PresetColorVal.slateBlue] = [106, 90, 205];
        presetColors[drawingInterface_1.ST_PresetColorVal.slateGray] = [112, 128, 144];
        presetColors[drawingInterface_1.ST_PresetColorVal.slateGrey] = [112, 128, 144];
        presetColors[drawingInterface_1.ST_PresetColorVal.snow] = [255, 250, 250];
        presetColors[drawingInterface_1.ST_PresetColorVal.springGreen] = [0, 255, 127];
        presetColors[drawingInterface_1.ST_PresetColorVal.steelBlue] = [70, 130, 180];
        presetColors[drawingInterface_1.ST_PresetColorVal.tan] = [210, 180, 140];
        presetColors[drawingInterface_1.ST_PresetColorVal.teal] = [0, 128, 128];
        presetColors[drawingInterface_1.ST_PresetColorVal.thistle] = [216, 191, 216];
        presetColors[drawingInterface_1.ST_PresetColorVal.tomato] = [255, 99, 71];
        presetColors[drawingInterface_1.ST_PresetColorVal.turquoise] = [64, 224, 208];
        presetColors[drawingInterface_1.ST_PresetColorVal.violet] = [238, 130, 238];
        presetColors[drawingInterface_1.ST_PresetColorVal.wheat] = [245, 222, 179];
        presetColors[drawingInterface_1.ST_PresetColorVal.white] = [255, 255, 255];
        presetColors[drawingInterface_1.ST_PresetColorVal.whiteSmoke] = [245, 245, 245];
        presetColors[drawingInterface_1.ST_PresetColorVal.yellow] = [255, 255, 0];
        presetColors[drawingInterface_1.ST_PresetColorVal.yellowGreen] = [154, 205, 50];
    };
    ChartUtility.GetPresetColorRGB = function (color) {
        return ChartUtility.presetColors[color];
    };
    ChartUtility.GetDimensioin = function (chartType) {
        var dict = {
            0 : -1,
            1 : 2,
            33 : 2,
            34 : 2,
            35 : 2,
            36 : 2,
            11 : 3,
            48 : 3,
            57 : 2,
            58 : 2
        };
        return dict[chartType] || 1;
    };
    ChartUtility.AreValuesAllNum = function (sheet, range, ignoreNullOrCalError) {
        if (UnitHelper.isNullOrUndefined(range)) {
            return null;
        }
        var dataArray = sheet.getArray(range.row, range.col, range.rowCount, range.colCount);
        var areAllNum = true;
        for (var i = 0; i < dataArray.length; i++) {
            if (!this.AreAllNumbers(dataArray[i], ignoreNullOrCalError)) {
                areAllNum = false;
                break;
            }
        }
        return areAllNum;
    };
    ChartUtility.AreValuesDateTime = function (drawingSheet, refs, visibleOnly) {
        if (UnitHelper.isNullOrUndefined(refs) || refs.length === 0) {
            return false;
        }
        var areAllDateTimeFormat = true, value;
        var styles = this.GetStylesFromCellRefers(drawingSheet, refs, visibleOnly);
        var values = this.GetValuesFromCellRefers(drawingSheet, refs, visibleOnly);
        for (var i = 0; i < styles.length; i++) {
            var styleMatrix = styles[i];
            var rowCount = styleMatrix.length;
            var colCount = styleMatrix[0] && styleMatrix[0].length;
            for (var col = 0; col < colCount; col++) {
                for (var row = 0; row < rowCount; row++) {
                    var style = styleMatrix[row][col];
                    value = values[i] && values[i][row] && values[i][row][col];
                    if (!UnitHelper.isNullOrUndefined(value) && !(value instanceof Date)
                        && (UnitHelper.isNullOrUndefined(style) || !ChartUtility.IsDatesOrTimesNumberFormat(style.FormatCode) || !IsNumber(value))) {
                        areAllDateTimeFormat = false;
                        break;
                    }
                }
                if (!areAllDateTimeFormat) {
                    break;
                }
            }
            if (!areAllDateTimeFormat) {
                break;
            }
        }
        if (areAllDateTimeFormat) {
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var valueMatrix = values_1[_i];
                for (var _a = 0, valueMatrix_1 = valueMatrix; _a < valueMatrix_1.length; _a++) {
                    var valueMatrix_2 = valueMatrix_1[_a];
                    if (!UnitHelper.isNullOrUndefined(valueMatrix_2)) {
                        for (var _b = 0; _b < valueMatrix_2.length; _b++) {
                            value = valueMatrix_2[_b];
                            if (!UnitHelper.isNullOrUndefined(value)) {
                                return true;
                            }
                        }
                    }
                }
            }

            return false;
        }
        return false;
    };
    ChartUtility.AreAllNumbers = function (values, ignoreNullOrCalError) {
        if (!values) {
            return false;
        }
        var areAllNumbers = true;
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var val = values_2[_i];


            var isNum = IsNumber(val), isNull = ignoreNullOrCalError && (val === null || (val && val._error));
            if (!(isNum || isNull)) {
                areAllNumbers = false;
                break;
            }
        }
        return areAllNumbers;
    };
    ChartUtility.AreAllNull = function (values) {
        var areAllNull = true;
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var val = values_2[_i];
            if (val !== null && val !== undefined) {
                areAllNull = false;
                break;
            }
        }
        return areAllNull;
    };
    ChartUtility.AreAllDate = function (values, ignoreNullOrCalError) {
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var val = values_2[_i];
            var isNull = ignoreNullOrCalError && (val === null || (val && val._error));
            if (!(val instanceof Date) && !isNull) {
                return false;
            }
        }
        return true;
    };
    ChartUtility.TryAllToNumbers = function (values, result, ignoreNull) {
        if (UnitHelper.isNullOrUndefined(values) || values.length === 0) {
            return false;
        }
        var allNumbers = true;
        var numbers = [];
        var count = values.length;
        for (var _i = 0; _i < count; _i++) {
            var val = values[_i];
            if (UnitHelper.isNullOrUndefined(val)) {
                if (!ignoreNull) {
                    numbers.push(val);
                }
            }
            else {
                var outObj = { value: undefined };
                if (!this.TryToDouble(val, outObj)) {
                    if (CalcEngine_1.Convert && CalcEngine_1.Convert._isNotAvailableError(val)) {
                        numbers.push(Number.NaN);
                    }
                    else {
                        numbers.push(0);
                    }
                    allNumbers = false;
                }
                else {
                    numbers.push(outObj.value);
                }
            }
        }
        Array.prototype.push.apply(result, numbers);
        return allNumbers;
    };

    ChartUtility.TryToDouble = function (value, doubleValue, needParseString) {
        var monthStrings = {
            JAN: 1,
            FEB: 2,
            MAR: 3,
            APR: 4,
            MAY: 5,
            JUN: 6,
            JUL: 7,
            AUG: 8,
            SEP: 9,
            OCT: 10,
            NOV: 11,
            DEC: 12
        };
        var result = keyword_null;
        if (!value) {
            doubleValue.value = 0;
            return true;
        }
        var typestr = typeof value;
        try {
            if (typestr === 'number') {
                result = value;
            }
            else if (typestr === 'string' && needParseString) {
                value = value.trim();
                if (value.length === 0) {
                    doubleValue.value = 0;
                    return true;
                }


                var decimalSeparator = '.';
                var groupSeparator = ',';
                if ((decimalSeparator !== '.' && groupSeparator !== '.' && value.indexOf('.') >= 0)
                    || (decimalSeparator !== ',' && groupSeparator !== ',' && value.indexOf(',') >= 0)) {
                    return false;
                }

                var isPercent = false;
                if (value.charAt(value.length - 1) === '%') {
                    isPercent = true;
                    value = value.substr(0, value.length - 1);
                }


                if (value[0] === '$' || value[value.length - 1] === '$') {
                    return false;
                }

                if (value.indexOf(decimalSeparator) !== value.lastIndexOf(decimalSeparator)) {
                    return false;
                }


                if (value.length >= 2 && value[0] === '0' && value[1] === 'x') {
                    return false;
                }
                result = +value;
                if (NumberExtension.isNaNOrInfinite(result)) {
                    var c = value.charCodeAt(0);
                    c |= 0x20;
                    if (value.length > 4 && c >= 96 && c <= 122) {
                        var s = value[0] + value[1] + value[2];
                        s = s.toUpperCase();
                        if (!monthStrings[s]) {
                            return false;
                        }
                    }


                    if (value[0] === '/' || value[value.length - 1] === '/') {
                        return false;
                    }


                    if (value[0] === '#' || value[value.length - 1] === '#') {
                        return false;
                    }


                    result = new Date(value);
                    if (NumberExtension.isNaNOrInfinite(result.valueOf())) {
                        return false;
                    }
                    result = DateTimeExtension.ToOADate(result);
                }
                if (isPercent) {
                    result /= 100;
                }
            }
            else if (typestr === 'boolean') {
                result = value ? 1 : 0;
            }
            else if (value instanceof Date) {
                result = DateTimeExtension.ToOADate(value);
            }
            else {
                return false;
            }
        }
        catch (ex) {
            return false;
        }
        doubleValue.value = result;
        return true;
    };
    ChartUtility.IsBarChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.barClustered ||
            chartType === drawingInterface_1.ChartType.barClustered3D ||
            chartType === drawingInterface_1.ChartType.barStacked ||
            chartType === drawingInterface_1.ChartType.barStacked100 ||
            chartType === drawingInterface_1.ChartType.barStacked1003D ||
            chartType === drawingInterface_1.ChartType.barStacked3D;
    };
    ChartUtility._getChartTypeString = function (chartType) {
        var dict = ChartUtility.chartTypeDict;
        if (!dict) {
            dict = ChartUtility.chartTypeDict = {};

            for (var p in drawingInterface_1.ChartType) {
                dict[drawingInterface_1.ChartType[p]] = p.toLowerCase();
            }
        }
        return dict[chartType];
    };
    ChartUtility.IsColumnChart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('column') >= 0;
    };
    ChartUtility.IsAnyPieChart = function (chartType) {
        return this.IsPieChart(chartType) || this.IsDoughnutChart(chartType) || this.IsOfPieChart(chartType);
    };
    ChartUtility.IsFunnelChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.funnel;
    };
    ChartUtility.IsPieChart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('pie') >= 0;
    };
    ChartUtility.IsPieOrDoughnutChart = function (chartType) {
        return this.IsPieChart(chartType) || this.IsDoughnutChart(chartType);
    };
    ChartUtility.IsRadarChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.radar ||
            chartType === drawingInterface_1.ChartType.radarFilled ||
            chartType === drawingInterface_1.ChartType.radarMarkers;
    };
    ChartUtility.IsOfPieChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.pieOfPie ||
            chartType === drawingInterface_1.ChartType.barOfPie;
    };
    ChartUtility.IsStackedChart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('stacked') >= 0;
    };
    ChartUtility.IsStacked100Chart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('stacked100') >= 0;
    };
    ChartUtility.IsLineChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.line3D ||
            chartType === drawingInterface_1.ChartType.line ||
            chartType === drawingInterface_1.ChartType.lineMarkers ||
            chartType === drawingInterface_1.ChartType.lineMarkersStacked ||
            chartType === drawingInterface_1.ChartType.lineMarkersStacked100 ||
            chartType === drawingInterface_1.ChartType.lineStacked ||
            chartType === drawingInterface_1.ChartType.lineStacked100;
    };
    ChartUtility.IsLineMarkerChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.lineMarkers ||
            chartType === drawingInterface_1.ChartType.lineMarkersStacked ||
            chartType === drawingInterface_1.ChartType.lineMarkersStacked100;
    };
    ChartUtility.IsLineSeries = function (chartType) {
        return chartType === drawingInterface_1.ChartType.line ||
            chartType === drawingInterface_1.ChartType.lineMarkers ||
            chartType === drawingInterface_1.ChartType.lineMarkersStacked ||
            chartType === drawingInterface_1.ChartType.lineMarkersStacked100 ||
            chartType === drawingInterface_1.ChartType.lineStacked ||
            chartType === drawingInterface_1.ChartType.lineStacked100 ||
            chartType === drawingInterface_1.ChartType.xyScatterLines ||
            chartType === drawingInterface_1.ChartType.xyScatterLinesNoMarkers ||
            chartType === drawingInterface_1.ChartType.xyScatterSmooth ||
            chartType === drawingInterface_1.ChartType.xyScatterSmoothNoMarkers ||
            chartType === drawingInterface_1.ChartType.radar ||
            chartType === drawingInterface_1.ChartType.radarMarkers;
    };
    ChartUtility.IsMarkerSeries = function (chartType) {
        return chartType === drawingInterface_1.ChartType.lineMarkers ||
            chartType === drawingInterface_1.ChartType.lineMarkersStacked ||
            chartType === drawingInterface_1.ChartType.lineMarkersStacked100 ||
            chartType === drawingInterface_1.ChartType.radarMarkers ||
            chartType === drawingInterface_1.ChartType.xyScatter ||
            chartType === drawingInterface_1.ChartType.xyScatterLines ||
            chartType === drawingInterface_1.ChartType.xyScatterSmooth;
    };
    ChartUtility.IsErrorBarSeries = function (chartType) {
        return !ChartUtility.Is3DChart(chartType) && (ChartUtility.IsBarChart(chartType) ||
            ChartUtility.IsAreaChart(chartType) ||
            ChartUtility.IsLineChart(chartType) ||
            ChartUtility.IsColumnChart(chartType) ||
            ChartUtility.IsScatterChart(chartType) ||
            ChartUtility.IsBubbleChart(chartType));
    };
    ChartUtility.IsTrendlineSeries = function (chartType) {
        return !ChartUtility.Is3DChart(chartType)
            && !ChartUtility.IsStackedChart(chartType)
            && (chartType === drawingInterface_1.ChartType.barClustered
                || chartType === drawingInterface_1.ChartType.columnClustered
                || chartType === drawingInterface_1.ChartType.line
                || chartType === drawingInterface_1.ChartType.lineMarkers
                || chartType === drawingInterface_1.ChartType.area
                || ChartUtility.IsScatterChart(chartType)
                || ChartUtility.IsBubbleChart(chartType));
    };
    ChartUtility.IsFillSeries = function (chartType) {
        return !this.IsLineSeries(chartType) && chartType !== drawingInterface_1.ChartType.xyScatter;
    };
    ChartUtility.IsAreaChart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('area') >= 0;
    };
    ChartUtility.IsScatterChart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('scatter') >= 0;
    };
    ChartUtility.IsSurfaceChart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('surface') >= 0;
    };
    ChartUtility.IsBubbleChart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('bubble') >= 0;
    };
    ChartUtility.IsSmoothLine = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('smooth') >= 0;
    };
    ChartUtility.Is3DChart = function (chartType) {
        var typeStr = ChartUtility._getChartTypeString(chartType);
        return (typeStr.indexOf('3d') >= 0 && chartType !== drawingInterface_1.ChartType.bubble3DEffect) ||
            this.IsSurfaceChart(chartType) ||
            typeStr.indexOf('cylinder') >= 0 ||
            typeStr.indexOf('cone') >= 0 ||
            typeStr.indexOf('pyramid') >= 0;
    };
    ChartUtility.IsSurface3DChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.surface || chartType === drawingInterface_1.ChartType.surfaceWireframe;
    };
    ChartUtility.IsDoughnutChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.doughnut ||
            chartType === drawingInterface_1.ChartType.doughnutExploded;
    };
    ChartUtility.IsExplodedChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.pieExploded3D ||
            chartType === drawingInterface_1.ChartType.doughnutExploded ||
            chartType === drawingInterface_1.ChartType.pieExploded;
    };
    ChartUtility.HasSeriesAx = function (chartType) {
        return chartType === drawingInterface_1.ChartType.column3D ||
            chartType === drawingInterface_1.ChartType.area3D ||
            chartType === drawingInterface_1.ChartType.line3D ||
            this.IsSurfaceChart(chartType);
    };
    ChartUtility.IsStockChart = function (chartType) {
        return ChartUtility._getChartTypeString(chartType).indexOf('stock') >= 0;
    };
    ChartUtility.IsTreeMap = function (chartType) {
        return chartType === drawingInterface_1.ChartType.treemap;
    };
    ChartUtility.IsSunburstChart = function (chartType) {
        return chartType === drawingInterface_1.ChartType.sunburst;
    };
    ChartUtility.IsSunburstOrTreemapChart = function (chartType) {
        return ChartUtility.IsTreeMap(chartType) || ChartUtility.IsSunburstChart(chartType);
    };
    ChartUtility.IsStockHLC = function (chartType) {
        return chartType === drawingInterface_1.ChartType.stockHLC;
    };
    ChartUtility.IsBuiltInComboChart = function (chartType) {
        return this.IsStockChart(chartType);
    };
    ChartUtility.ConvertToTextUnderlineType = function (underline) {
        var result = drawingInterface_1.TextUnderlineType.None;
        if (underline === drawingInterface_1.UnderlineType.Single) {
            result = drawingInterface_1.TextUnderlineType.Single;
        }
        else if (underline === drawingInterface_1.UnderlineType.Double) {
            result = drawingInterface_1.TextUnderlineType.Double;
        }
        return result;
    };
    ChartUtility.ToUnderlineType = function (underline) {
        var result = drawingInterface_1.UnderlineType.None;
        if (underline === drawingInterface_1.TextUnderlineType.Single) {
            result = drawingInterface_1.UnderlineType.Single;
        }
        else if (underline === drawingInterface_1.TextUnderlineType.Double) {
            result = drawingInterface_1.UnderlineType.Double;
        }
        return result;
    };
    ChartUtility.MapToGroupType = function (chartType) {
        var dict = {
            12 : 9 ,
            13 : 9 ,
            14 : 9 ,
            15 : 3 ,
            16 : 3 ,
            17 : 3 ,
            6 : 3 ,
            18 : 8 ,
            19 : 8 ,
            20 : 8 ,
            21 : 2 ,
            22 : 2 ,
            23 : 2 ,
            9 : 11 ,
            24 : 11 ,
            25 : 11 ,
            26 : 11 ,
            27 : 11 ,
            28 : 11 ,
            5 : 4 ,
            10 : 12 ,
            29 : 12 ,
            30 : 12 ,
            32 : 12 ,
            31 : 5 ,
            4 : 5 ,
            1 : 14 ,
            33 : 14 ,
            34 : 14 ,
            35 : 14 ,
            36 : 14 ,
            8 : 7 ,
            37 : 7 ,
            38 : 7 ,
            39 : 1 ,
            40 : 1 ,
            7 : 1 ,
            3 : 10 ,
            41 : 10 ,
            2 : 13 ,
            42 : 13 ,
            43 : 13 ,
            44 : 6 ,
            45 : 6 ,
            46 : 6 ,
            47 : 6 ,
            11 : 14 ,
            48 : 14 ,
            49 : 11 ,
            50 : 11 ,
            51 : 11 ,
            52 : 11
        };
        return dict[chartType] || ChartGroupType.UnKnown;
    };
    ChartUtility.HasSeriesLines = function (chartType) {
        return this.IsOfPieChart(chartType);
    };
    ChartUtility.HasHiLoLines = function (chartType) {
        return this.IsStockChart(chartType);
    };
    ChartUtility.HasUpDownBars = function (chartType) {
        return chartType === drawingInterface_1.ChartType.stockOHLC ||
            chartType === drawingInterface_1.ChartType.stockVOHLC;
    };
    ChartUtility.RangeToReferences = function (range) {
        var result = [];
        for (var _i = 0, _a = range.Areas; _i < _a.length; _i++) {
            var item = _a[_i];
            result.push(ChartUtility.CreateReference(item.Worksheet.name(), item.Row, item.Column, item.RowCount, item.ColumnCount));
        }
        return result;
    };
    ChartUtility.CreateReference = function (worksheetName, row, col, rowCount, colCount) {
        if (rowCount === 1 && colCount === 1) {
            return new Reference(worksheetName, row, col);
        }
        return new Reference(worksheetName, row, col, row + rowCount - 1, col + colCount - 1);
    };
    ChartUtility.ReferencesToFormula = function (refs, r1c1) {
        if (r1c1 === keyword_undefined) {
            r1c1 = false;
        }
        if (UnitHelper.isNullOrUndefined(refs) || refs.length === 0) {
            return keyword_null;
        }
        var f = [];
        for (var i = 0; i < refs.length; i++) {
            if (i > 0) {
                f.push(',');
            }
            if (r1c1) {
                f.push(refs[i].ToR1C1Text());
            }
            else {
                f.push(refs[i].ToA1Text(0, 0));
            }
        }
        return f.join('');
    };
    ChartUtility.getRangeInfoByFormula = function (sheet, formula) {
        if (formula) {
            var result = SheetsCalc_1.formulaToRanges(sheet, formula, 0, 0), rangeItem = result[0];
            if (rangeItem) {
                var spread = sheet.parent, worksheet = spread.getSheetFromName(rangeItem.sheetName);
                if (worksheet) {
                    return {
                        sheet: worksheet,
                        range: rangeItem.ranges && rangeItem.ranges[0]
                    };
                }
            }
        }
        return { range: {} };
    };
    ChartUtility.isContinuousRange = function (rangeInfo1, rangeInfo2, isColumnBase) {
        if (rangeInfo1.sheet !== rangeInfo2.sheet) {
            return false;
        }
        var range1, row1, rowCount1, col1, colCount1, range2, row2, rowCount2, col2, colCount2;
        if (isColumnBase) {
            range1 = rangeInfo1.range;
            rowCount1 = range1.rowCount;
            col1 = range1.col;
            colCount1 = range1.colCount;
            range2 = rangeInfo2.range;
            rowCount2 = range2.rowCount;
            col2 = range2.col;
            if (rowCount1 === rowCount2 && col1 + colCount1 === col2) {
                return true;
            }
        }
        else {
            range1 = rangeInfo1.range;
            rowCount1 = range1.rowCount;
            row1 = range1.row;
            colCount1 = range1.colCount;
            range2 = rangeInfo2.range;
            colCount2 = range2.colCount;
            row2 = range1.row;
            if (colCount1 === colCount2 && row1 + rowCount1 === row2) {
                return true;
            }
        }
    };
    ChartUtility.GetValuesFromCellRefers = function (drawingSheet, refers, visibleOnly) {
        var values = [];
        if (UnitHelper.isNullOrUndefined(refers) || refers.length === 0 || refers.some(function (r) {
            return r.IsError;
        })) {
            return values;
        }
        for (var _i = 0, refers_1 = refers; _i < refers_1.length; _i++) {
            var rect = refers_1[_i];
            var valueMatrix = this.GetValuesFromCellRefer(drawingSheet, rect, visibleOnly);
            if (!UnitHelper.isNullOrUndefined(valueMatrix)) {
                values.push(valueMatrix);
            }
        }
        return values;
    };
    ChartUtility.GetValuesFromCellRefer = function (drawingSheet, refer, visibleOnly) {
        var sheet = drawingSheet._GetSheet(refer.WorksheetName);
        if (UnitHelper.isNullOrUndefined(sheet)) {
            return keyword_null;
        }
        var valueMatrix;
        if (visibleOnly) {
            valueMatrix = sheet._GetVisibleCellValues(refer.Row, refer.Column, refer.RowCount, refer.ColumnCount, true);
        }
        else {
            valueMatrix = sheet._GetCellValues(refer.Row, refer.Column, refer.RowCount, refer.ColumnCount, true);
        }
        return valueMatrix;
    };
    ChartUtility.GetStylesFromCellRefers = function (drawingSheet, refers, visibleOnly) {
        var styles = [];
        if (UnitHelper.isNullOrUndefined(refers) || refers.length === 0 || refers.some(function (r) {
            return r.IsError;
        })) {
            return styles;
        }
        for (var _i = 0, refers_2 = refers; _i < refers_2.length; _i++) {
            var refer = refers_2[_i];
            var styleMatrix = this.GetStylesFromCellRefer(drawingSheet, refer, visibleOnly);
            if (!UnitHelper.isNullOrUndefined(styleMatrix)) {
                styles.push(styleMatrix);
            }
        }
        return styles;
    };
    ChartUtility.GetStylesFromCellRefer = function (drawingSheet, refer, visibleOnly) {
        var sheet = drawingSheet._GetSheet(refer.WorksheetName);
        if (UnitHelper.isNullOrUndefined(sheet)) {
            return keyword_null;
        }
        var styleMatrix;
        if (visibleOnly) {
            styleMatrix = sheet._GetVisibleCellStyles(refer.Row, refer.Column, refer.RowCount, refer.ColumnCount);
        }
        else {
            styleMatrix = sheet._GetCellStyles(refer.Row, refer.Column, refer.RowCount, refer.ColumnCount);
        }
        return styleMatrix;
    };
    ChartUtility.GetPrimaryAxises = function (ooPlotArea ) {
        var result = [];
        var axesLength = ooPlotArea.axes.length;
        if (ooPlotArea.axes && axesLength > 0) {
            for (var i = 0; i < axesLength; i++) {
                var ax = ooPlotArea.axes[i];
                if (util_1.isNullOrUndefined(ax.AxisGroup)) {
                    if (axesLength > 2) {
                        if (i === 0 || i === 1) {
                            result.push(ax.axId);
                            result.push(ax.crossAx);
                            result.axisGroup = ax.AxisGroup;
                        }
                    }
                    else {
                        if (i === 0) {
                            result.push(ax.axId);
                            result.push(ax.crossAx);
                            result.axisGroup = ax.AxisGroup;
                        }
                    }
                }
                else if (ax.AxisGroup === 0) {
                    result.push(ax.axId);
                    result.push(ax.crossAx);
                    result.axisGroup = ax.AxisGroup;
                }
            }
        }
        return result;
    };
    ChartUtility.GetAxises = function (ooPlotArea , axisGroup) {
        var pAxes = ChartUtility.GetPrimaryAxises(ooPlotArea);
        if (axisGroup === drawingInterface_1.AxisGroup.primary) {
            return pAxes;
        }
        var sAxes = [];
        if (!UnitHelper.isNullOrUndefined(ooPlotArea.axes)) {
            var secondAxes = ooPlotArea.axes.filter(function (item) {
                return pAxes.indexOf(item.axId) < 0;
            });
            for (var _i = 0, secondAxes_1 = secondAxes; _i < secondAxes_1.length; _i++) {
                var axisItem = secondAxes_1[_i];
                sAxes.push(axisItem.axId);
            }
        }
        return sAxes;
    };
    ChartUtility.GetCategoryAxises = function (ooPlotArea ) {
        var result = [];
        for (var _i = 0, _a = ooPlotArea.chartGroups; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!UnitHelper.isNullOrUndefined(item.axId) && item.axId.length > 0) {
                result.push(item.axId[0]);
            }
        }
        return result;
    };
    ChartUtility.GetIs2016ChartByPlotArea = function (ooPlotArea ) {
        var new2016ChartType = ChartUtility.Get2016ChartType(ooPlotArea);
        return !!new2016ChartType;
    };
    ChartUtility.GetIs2016ChartByChartType = function (chartType ) {
        return chartType === 53 || chartType === 54 || chartType === 55 || chartType === 56 ||
            chartType === 57 || chartType === 58 || chartType === 59 || chartType === 60;
    };
    ChartUtility.Get2016ChartType = function (ooPlotArea ) {
        var series = ooPlotArea && ooPlotArea.plotAreaRegion && ooPlotArea.plotAreaRegion.series;
        var ctChartType;
        if (series && series.length > 0) {
            ctChartType = series[0].layoutId;
        }
        return ctChartType;
    };
    ChartUtility.GetChartType = function (ooPlotArea ) {
        var new2016ChartType = ChartUtility.Get2016ChartType(ooPlotArea);
        if (new2016ChartType) {
            return ChartUtility.GetChartTypeBy2016InnerChartType(new2016ChartType);
        }
        var stockChart = this.GetStockChartType(ooPlotArea);
        if (!UnitHelper.isNullOrUndefined(stockChart)) {
            return stockChart;
        }
        var types = [];
        for (var _i = 0, _a = ooPlotArea.chartGroups; _i < _a.length; _i++) {
            var chart = _a[_i];
            var type = ChartUtility.GetChartTypeByChartBase(chart);
            if (types.indexOf(type) < 0) {
                types.push(type);
            }
        }
        if (types.length === 0) {
            return drawingInterface_1.ChartType.columnClustered;
        }
        return types.length > 1 ? drawingInterface_1.ChartType.combo : types[0];
    };
    ChartUtility.GetStockChartType = function (ooPlotArea ) {
        var stockChart = ChartUtility.GetStockChart(ooPlotArea);
        if (stockChart.length === 0) {
            return keyword_null;
        }
        if ((!UnitHelper.isNullOrUndefined(ooPlotArea.chartGroups) && ooPlotArea.chartGroups.length > 1)) {
            if (stockChart[0].ser.length === 3) {
                return drawingInterface_1.ChartType.stockVHLC;
            }
            else if (stockChart[0].ser.length === 4) {
                return drawingInterface_1.ChartType.stockVOHLC;
            }
        }
        else if (stockChart[0].ser.length === 3) {
            return drawingInterface_1.ChartType.stockHLC;
        }
        else if (stockChart[0].ser.length === 4) {
            return drawingInterface_1.ChartType.stockOHLC;
        }
        return keyword_null;
    };
    ChartUtility.GetChartTypeByChartBase = function (chart , ser) {
        if (ser === keyword_undefined) {
            ser = keyword_null;
        }
        if (chart.chartType === drawingInterface_1.CT_ChartType.CT_BarChart || chart.chartType === drawingInterface_1.CT_ChartType.CT_Bar3DChart) {
            return ChartUtility.GetChartTypeByBarChart(chart);
        }
        else if (chart.chartType === drawingInterface_1.CT_ChartType.CT_AreaChart || chart.chartType === drawingInterface_1.CT_ChartType.CT_Area3DChart) {
            return ChartUtility.GetChartTypeByAreaChart(chart);
        }
        else if (chart.chartType === drawingInterface_1.CT_ChartType.CT_LineChart || chart.chartType === drawingInterface_1.CT_ChartType.CT_Line3DChart) {
            return ChartUtility.GetChartTypeByLineChart(chart, ser );
        }
        else if ([drawingInterface_1.CT_ChartType.CT_PieChart, drawingInterface_1.CT_ChartType.CT_Pie3DChart, drawingInterface_1.CT_ChartType.CT_DoughnutChart, drawingInterface_1.CT_ChartType.CT_OfPieChart].indexOf(chart.chartType) >= 0) {
            return ChartUtility.GetChartTypeByPieChart(chart);
        }
        else if (chart.chartType === drawingInterface_1.CT_ChartType.CT_RadarChart) {
            return ChartUtility.GetChartTypeByRadarChart(chart, ser );
        }
        else if (chart.chartType === drawingInterface_1.CT_ChartType.CT_ScatterChart) {
            return ChartUtility.GetChartTypeByScatterChart(chart, ser);
        }
        else if (chart.chartType === drawingInterface_1.CT_ChartType.CT_BubbleChart) {
            return ChartUtility.GetChartTypeByBubbleChart(chart);
        }
        else if (chart.chartType === drawingInterface_1.CT_ChartType.CT_SurfaceChart || chart.chartType === drawingInterface_1.CT_ChartType.CT_Surface3DChart) {
            return ChartUtility.GetChartTypeBySurfaceChart(chart);
        }
        return drawingInterface_1.ChartType.columnClustered;
    };
    ChartUtility.GetChartTypeBy2016InnerChartType = function (innerChartType) {
        if (!UnitHelper.isNullOrUndefined(innerChartType)) {
            switch (innerChartType) {
                case drawingInterface_1.CT_ChartType.CT_BoxWhisker:
                    return drawingInterface_1.ChartType.boxWhisker;
                case drawingInterface_1.CT_ChartType.CT_Funnel:
                    return drawingInterface_1.ChartType.funnel;
                case drawingInterface_1.CT_ChartType.CT_ParetoLine:
                    return drawingInterface_1.ChartType.paretoLine;
                case drawingInterface_1.CT_ChartType.CT_RegionMap:
                    return drawingInterface_1.ChartType.regionMap;
                case drawingInterface_1.CT_ChartType.CT_Sunburst:
                    return drawingInterface_1.ChartType.sunburst;
                case drawingInterface_1.CT_ChartType.CT_Treemap:
                    return drawingInterface_1.ChartType.treemap;
                case drawingInterface_1.CT_ChartType.CT_Waterfall:
                    return drawingInterface_1.ChartType.waterfall;
                case drawingInterface_1.CT_ChartType.CT_ClusteredColumn:
                    return drawingInterface_1.ChartType.clusteredColumn;
            }
        }
        return drawingInterface_1.CT_ChartType.CT_Treemap;
    };
    ChartUtility.Get2016InnerChartTypeByChartType = function (chartType) {
        if (!UnitHelper.isNullOrUndefined(chartType)) {
            switch (chartType) {
                case drawingInterface_1.ChartType.boxWhisker:
                    return drawingInterface_1.CT_ChartType.CT_BoxWhisker;
                case drawingInterface_1.ChartType.funnel:
                    return drawingInterface_1.CT_ChartType.CT_Funnel;
                case drawingInterface_1.ChartType.paretoLine:
                    return drawingInterface_1.CT_ChartType.CT_ParetoLine;
                case drawingInterface_1.ChartType.regionMap:
                    return drawingInterface_1.CT_ChartType.CT_RegionMap;
                case drawingInterface_1.ChartType.sunburst:
                    return drawingInterface_1.CT_ChartType.CT_Sunburst;
                case drawingInterface_1.ChartType.treemap:
                    return drawingInterface_1.CT_ChartType.CT_Treemap;
                case drawingInterface_1.ChartType.waterfall:
                    return drawingInterface_1.CT_ChartType.CT_Waterfall;
                case drawingInterface_1.ChartType.clusteredColumn:
                    return drawingInterface_1.CT_ChartType.CT_ClusteredColumn;
            }
        }
        return drawingInterface_1.CT_ChartType.CT_Treemap;
    };
    ChartUtility.GetChartTypeByBarChart = function (barChart ) {
        var is3dBar = barChart.chartType === drawingInterface_1.CT_ChartType.CT_Bar3DChart;
        if (!UnitHelper.isNullOrUndefined(barChart.grouping)) {
            switch (barChart.grouping) {
                case drawingInterface_1.ST_BarGrouping.percentStacked:
                    if (is3dBar) {
                        return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barStacked1003D : drawingInterface_1.ChartType.columnStacked1003D;
                    }
                    return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barStacked100 : drawingInterface_1.ChartType.columnStacked100;
                case drawingInterface_1.ST_BarGrouping.clustered:
                    if (is3dBar) {
                        return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barClustered3D : drawingInterface_1.ChartType.columnClustered3D;
                    }
                    return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barClustered : drawingInterface_1.ChartType.columnClustered;
                case drawingInterface_1.ST_BarGrouping.standard:
                    if (is3dBar) {
                        return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barClustered3D : drawingInterface_1.ChartType.column3D;
                    }
                    return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barClustered : drawingInterface_1.ChartType.columnClustered;
                case drawingInterface_1.ST_BarGrouping.stacked:
                    if (is3dBar) {
                        return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barStacked3D : drawingInterface_1.ChartType.columnStacked3D;
                    }
                    return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barStacked : drawingInterface_1.ChartType.columnStacked;
            }
        }
        else {
            if (is3dBar) {
                return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barClustered3D : drawingInterface_1.ChartType.columnClustered3D;
            }
            return barChart.barDir === drawingInterface_1.ST_BarDir.bar ? drawingInterface_1.ChartType.barClustered : drawingInterface_1.ChartType.columnClustered;
        }
        return drawingInterface_1.ChartType.columnClustered;
    };
    ChartUtility.GetChartTypeByAreaChart = function (areaChart ) {
        var is3dArea = areaChart.chartType === drawingInterface_1.CT_ChartType.CT_Area3DChart;
        if (!UnitHelper.isNullOrUndefined(areaChart.grouping)) {
            switch (areaChart.grouping) {
                case drawingInterface_1.ST_Grouping.percentStacked:
                    return is3dArea ? drawingInterface_1.ChartType.areaStacked1003D : drawingInterface_1.ChartType.areaStacked100;
                case drawingInterface_1.ST_Grouping.standard:
                    return is3dArea ? drawingInterface_1.ChartType.area3D : drawingInterface_1.ChartType.area;
                case drawingInterface_1.ST_Grouping.stacked:
                    return is3dArea ? drawingInterface_1.ChartType.areaStacked3D : drawingInterface_1.ChartType.areaStacked;
            }
        }
        else {
            return is3dArea ? drawingInterface_1.ChartType.area3D : drawingInterface_1.ChartType.area;
        }
        return drawingInterface_1.ChartType.area;
    };
    ChartUtility.GetChartTypeByLineChart = function (lineChart , lineSer ) {
        var is3dLine = lineChart.chartType === drawingInterface_1.CT_ChartType.CT_Line3DChart;
        var hasMarker = lineChart.marker;


        if (!UnitHelper.isNullOrUndefined(lineChart.grouping)) {
            switch (lineChart.grouping) {
                case drawingInterface_1.ST_Grouping.percentStacked:
                    if (is3dLine) {
                        return drawingInterface_1.ChartType.line3D;
                    }
                    return hasMarker ? drawingInterface_1.ChartType.lineMarkersStacked100 : drawingInterface_1.ChartType.lineStacked100;
                case drawingInterface_1.ST_Grouping.standard:
                    if (is3dLine) {
                        return drawingInterface_1.ChartType.line3D;
                    }
                    return hasMarker ? drawingInterface_1.ChartType.lineMarkers : drawingInterface_1.ChartType.line;
                case drawingInterface_1.ST_Grouping.stacked:
                    if (is3dLine) {
                        return drawingInterface_1.ChartType.line3D;
                    }
                    return hasMarker ? drawingInterface_1.ChartType.lineMarkersStacked : drawingInterface_1.ChartType.lineStacked;
                default:
                    return drawingInterface_1.ChartType.area;
            }
        }
        else if (is3dLine) {
            return drawingInterface_1.ChartType.line3D;
        }
        return hasMarker ? drawingInterface_1.ChartType.lineMarkers : drawingInterface_1.ChartType.line;
    };
    ChartUtility.GetChartTypeByPieChart = function (pieChart ) {
        if (pieChart.chartType === drawingInterface_1.CT_ChartType.CT_PieChart) {
            return drawingInterface_1.ChartType.pie;
        }
        else if (pieChart.chartType === drawingInterface_1.CT_ChartType.CT_Pie3DChart) {
            return drawingInterface_1.ChartType.pie3D;
        }
        else if (pieChart.chartType === drawingInterface_1.CT_ChartType.CT_OfPieChart) {
            var ofPieChart = pieChart;
            return ofPieChart.ofPieType === drawingInterface_1.ST_OfPieType.bar ? drawingInterface_1.ChartType.barOfPie : drawingInterface_1.ChartType.pieOfPie;
        }
        else if (pieChart.chartType === drawingInterface_1.CT_ChartType.CT_DoughnutChart) {
            return drawingInterface_1.ChartType.doughnut;
        }
        return drawingInterface_1.ChartType.pie;
    };
    ChartUtility.GetChartTypeByRadarChart = function (radarChart , radarSer ) {
        var noMarker = radarSer && radarSer.marker && radarSer.marker.symbol && radarSer.marker.symbol === drawingInterface_1.MarkerStyle.MarkerStyleNone;
        if (!UnitHelper.isNullOrUndefined(radarChart.radarStyle)) {
            switch (radarChart.radarStyle) {
                case drawingInterface_1.ST_RadarStyle.standard:
                case drawingInterface_1.ST_RadarStyle.marker:
                    return noMarker ? drawingInterface_1.ChartType.radar : drawingInterface_1.ChartType.radarMarkers;
                case drawingInterface_1.ST_RadarStyle.filled:
                    return drawingInterface_1.ChartType.radarFilled;
            }
        }
        return 2 ;
    };
    ChartUtility.GetChartTypeByScatterChart = function (scatterChart , seriesItem) {
        var scatterStyle = scatterChart.scatterStyle;
        if (!UnitHelper.isNullOrUndefined(scatterStyle)) {
            var dict = {
                0 : 1 ,
                1 : 36 ,
                2 : 35 ,
                3 : drawingInterface_1.ChartType.xyScatter,
                4 : 34 ,
                5 : 33 ,
            };

            var value = scatterStyle;


            var ser = seriesItem || scatterChart.ser[0], symbol = ser && ser.marker && ser.marker.symbol, noMarker = symbol === 4 , line = ser && ser.spPr && ser.spPr.ln, noLine = line && line.noFill;
            if (value === 2 ) {
                if (noLine) {
                    value = 3 ;
                }
                else if (noMarker) {
                    value = 1 ;
                }
            }
            else if (value === 5 ) {
                if (noMarker) {
                    value = 4 ;
                }
            }
            return dict[value];
        }
        return drawingInterface_1.ChartType.xyScatter;
    };
    ChartUtility.GetChartTypeByBubbleChart = function (bubbleChart ) {
        return bubbleChart.bubble3D ? drawingInterface_1.ChartType.bubble3DEffect : drawingInterface_1.ChartType.bubble;
    };
    ChartUtility.GetChartTypeBySurfaceChart = function (surfaceChart ) {
        var is3d = surfaceChart.chartType === drawingInterface_1.CT_ChartType.CT_Surface3DChart;
        if (is3d) {
            return surfaceChart.wireframe ? drawingInterface_1.ChartType.surfaceWireframe : drawingInterface_1.ChartType.surface;
        }
        return surfaceChart.wireframe ? drawingInterface_1.ChartType.surfaceTopViewWireframe : drawingInterface_1.ChartType.surfaceTopView;
    };
    ChartUtility.GetTextFieldTypeString = function (type) {
        var dict = {
            0 : exports.ChartConstants.FIELD_TYPE_CELLRANGE,
            1 : exports.ChartConstants.FIELD_TYPE_SERIESNAME,
            2 : exports.ChartConstants.FIELD_TYPE_CATEGORYNAME,
            3 : exports.ChartConstants.FIELD_TYPE_VALUE,
            4 : exports.ChartConstants.FIELD_TYPE_XVALUE,
            5 : exports.ChartConstants.FIELD_TYPE_YVALUE,
            6 : exports.ChartConstants.FIELD_TYPE_BUBBLESIZE,
            7 : exports.ChartConstants.FIELD_TYPE_PERCENTAGE,
            8 : exports.ChartConstants.FIELD_TYPE_TXLINK
        };
        return dict[type] || '';
    };
    ChartUtility.GetTextFieldTypeText = function (type) {
        var dict = {
            0 : exports.ChartConstants.FIELD_TEXT_CELLRANGE,
            1 : exports.ChartConstants.FIELD_TEXT_SERIESNAME,
            2 : exports.ChartConstants.FIELD_TEXT_CATEGORYNAME,
            3 : exports.ChartConstants.FIELD_TEXT_VALUE,
            4 : exports.ChartConstants.FIELD_TEXT_XVALUE,
            5 : exports.ChartConstants.FIELD_TEXT_YVALUE,
            6 : exports.ChartConstants.FIELD_TEXT_BUBBLESIZE
        };
        return dict[type] || '';
    };
    ChartUtility.GetTextFieldType = function (typeString) {
        var result = drawingInterface_1.TextFieldType.CellRange;
        switch (typeString) {
            case exports.ChartConstants.FIELD_TYPE_CELLRANGE:
                result = drawingInterface_1.TextFieldType.CellRange;
                break;
            case exports.ChartConstants.FIELD_TYPE_SERIESNAME:
                result = drawingInterface_1.TextFieldType.SeriesName;
                break;
            case exports.ChartConstants.FIELD_TYPE_CATEGORYNAME:
                result = drawingInterface_1.TextFieldType.CategoryName;
                break;
            case exports.ChartConstants.FIELD_TYPE_VALUE:
                result = drawingInterface_1.TextFieldType.Value;
                break;
            case exports.ChartConstants.FIELD_TYPE_XVALUE:
                result = drawingInterface_1.TextFieldType.XValue;
                break;
            case exports.ChartConstants.FIELD_TYPE_YVALUE:
                result = drawingInterface_1.TextFieldType.YValue;
                break;
            case exports.ChartConstants.FIELD_TYPE_BUBBLESIZE:
                result = drawingInterface_1.TextFieldType.BubbleSize;
                break;
            case exports.ChartConstants.FIELD_TYPE_PERCENTAGE:
                result = drawingInterface_1.TextFieldType.Percentage;
                break;
            case exports.ChartConstants.FIELD_TYPE_TXLINK:
                result = drawingInterface_1.TextFieldType.TxLink;
                break;
        }
        return result;
    };
    ChartUtility.GetPrimaryPieChart = function (pieCharts) {
        return pieCharts[0];
    };
    ChartUtility.GetPlotAreaCharts = function (plotArea, chartType) {
        if (plotArea.chartGroups) {
            return plotArea.chartGroups.filter(function (item) {
                return item.chartType === chartType;
            });
        }
        return [];
    };
    ChartUtility.GetAreaChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 4 );
    };
    ChartUtility.GetArea3DChart = function (plotArea) {
        var area3DChart = ChartUtility.GetPlotAreaCharts(plotArea, 5 );
        if (area3DChart.length > 0) {
            return area3DChart[0];
        }
        return keyword_null;
    };
    ChartUtility.GetBarChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 6 );
    };
    ChartUtility.GetBar3DChart = function (plotArea) {
        var bar3DCharts = ChartUtility.GetPlotAreaCharts(plotArea, 7 );
        if (bar3DCharts.length > 0) {
            return bar3DCharts[0];
        }
        return keyword_null;
    };
    ChartUtility.GetLineChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 8 );
    };
    ChartUtility.GetLine3DChart = function (plotArea) {
        var line3DCharts = ChartUtility.GetPlotAreaCharts(plotArea, 9 );
        if (line3DCharts.length > 0) {
            return line3DCharts[0];
        }
        return keyword_null;
    };
    ChartUtility.GetStockChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 0 );
    };
    ChartUtility.GetRadarChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 2 );
    };
    ChartUtility.GetScatterChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 1 );
    };
    ChartUtility.GetPieCharts = function (plotArea) {
        var chartTypes = [10 , 11 , 12 , 13 ];
        if (plotArea.chartGroups) {
            return plotArea.chartGroups.filter(function (item) {
                return chartTypes.indexOf(item.chartType) >= 0;
            });
        }
        return [];
    };
    ChartUtility.GetPieChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 10 );
    };
    ChartUtility.GetPie3DChart = function (plotArea) {
        var pie3DCharts = ChartUtility.GetPlotAreaCharts(plotArea, 11 );
        if (pie3DCharts.length > 0) {
            return pie3DCharts[0];
        }
        return keyword_null;
    };
    ChartUtility.GetDoughnutChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 12 );
    };
    ChartUtility.GetOfPieChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 13 );
    };
    ChartUtility.GetSurfaceChart = function (plotArea) {
        return ChartUtility.GetSurface3DChartOrChart(plotArea, 14 );
    };
    ChartUtility.GetSurface3DChart = function (plotArea) {
        return ChartUtility.GetSurface3DChartOrChart(plotArea, 15 );
    };
    ChartUtility.GetSurface3DChartOrChart = function (plotArea, chartType) {
        var surfaceCharts = ChartUtility.GetPlotAreaCharts(plotArea, chartType);
        if (surfaceCharts.length > 0) {
            return surfaceCharts[0];
        }
        return keyword_null;
    };
    ChartUtility.GetBubbleChart = function (plotArea) {
        return ChartUtility.GetPlotAreaCharts(plotArea, 3 );
    };
    ChartUtility.GetAxes = function (plotArea, axisType) {
        return plotArea.axes.filter(function (item) {
            return item.axisType === axisType;
        });
    };
    ChartUtility.removeEmptyArrayProperties = function (obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var item = obj[p];
                if (Array.isArray(item) && item.length === 0) {
                    delete obj[p];
                }
            }
        }
    };
    ChartUtility.allSeriesIsScatterOrBubble = function (argChart) {
        var chartType = argChart.ChartType;
        if (ChartUtility.IsBubbleChart(chartType) || ChartUtility.IsScatterChart(chartType)) {
            return true;
        }
        else if (chartType === 0 ) {
            var seriesArray = argChart.SeriesCollection.AllSers;
            var seriesLength = seriesArray.length;
            if (seriesLength > 0) {
                var tempSeriesChartType = seriesArray[0].ChartType, i = void 0;
                if (ChartUtility.IsBubbleChart(tempSeriesChartType)) {
                    for (i = 1; i < seriesLength; i++) {
                        if (!ChartUtility.IsBubbleChart(seriesArray[i].ChartType)) {
                            return false;
                        }
                    }
                    return true;
                }
                else if (ChartUtility.IsScatterChart(tempSeriesChartType)) {
                    for (i = 1; i < seriesLength; i++) {
                        if (!ChartUtility.IsScatterChart(seriesArray[i].ChartType)) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    };
    ChartUtility.getLineFormatInfo = function (value, needThemeColor, needRGBA, notAddTransprent, ignoreFillColor) {
        var formatLine = value && value.Format && value.Format.Line;
        if (formatLine) {
            var lineWidth = formatLine.Weight;
            var retLineInfo = {};
            if (lineWidth >= 0) {
                retLineInfo.width = lineWidth;
            }
            var rgbaColor = ChartUtility.colorFormatToString(formatLine, needThemeColor, needRGBA, notAddTransprent);
            if (!needRGBA) {
                retLineInfo.transparency = ChartUtility.getTransparencyFromColorFormat(formatLine, ignoreFillColor);
            }
            if (rgbaColor || (rgbaColor === '' && notAddTransprent)) {
                retLineInfo.color = rgbaColor;
            }
            if (!util_1.isNullOrUndefined(formatLine.DashStyle)) {
                retLineInfo.dashStyle = formatLine.DashStyle;
            }
            return retLineInfo;
        }
        return keyword_null;
    };
    ChartUtility.isSupportConnectedLineChartType = function (chartType) {
        return chartType === drawingInterface_1.ChartType.line
            || chartType === drawingInterface_1.ChartType.lineMarkers
            || chartType === drawingInterface_1.ChartType.xyScatterLines
            || chartType === drawingInterface_1.ChartType.xyScatterLinesNoMarkers
            || chartType === drawingInterface_1.ChartType.xyScatterSmooth
            || chartType === drawingInterface_1.ChartType.xyScatterSmoothNoMarkers;
    };
    ChartUtility.isSupportConnected = function (chartType, chart) {
        if (ChartUtility.isSupportConnectedLineChartType(chartType) || ChartUtility.IsRadarChart(chartType)) {
            return true;
        }
        if (chartType === 0 ) {
            var series = chart.SeriesCollection.AllSers;
            for (var i = 0; i < series.length; i++) {
                var seriesChartType = series[i].ChartType;
                if (ChartUtility.isSupportConnectedLineChartType(seriesChartType) || ChartUtility.IsRadarChart(seriesChartType)) {
                    return true;
                }
            }
        }
        return false;
    };
    ChartUtility.isSupportGaps = function (chartType) {
        return chartType !== drawingInterface_1.ChartType.sunburst
            && chartType !== drawingInterface_1.ChartType.treemap
            && chartType !== drawingInterface_1.ChartType.lineMarkersStacked
            && chartType !== drawingInterface_1.ChartType.lineMarkersStacked100
            && chartType !== drawingInterface_1.ChartType.lineStacked
            && chartType !== drawingInterface_1.ChartType.lineStacked100;
    };
    ChartUtility.IsDatesOrTimesNumberFormat = function (formatCode) {
        if (!formatCode || formatCode.length === 0) {
            return false;
        }
        formatCode = formatCode.toUpperCase().trim();
        if (formatCode[0] === '[') {
            var index = formatCode.indexOf(']');
            if (index === -1 || index === formatCode.length - 1) {
                return false;
            }
            formatCode = formatCode.substr(index + 1);
        }
        var start = -1;
        var length = 0;
        var inFormatPattern = false;
        var isValidDateOrTimePattern = keyword_null;
        var i = 0, subFormatPattern;
        for (; i < formatCode.length; i++) {
            var code = formatCode[i];
            if (code === '[') {
                do {
                    code = formatCode[i];
                    i++;
                } while (i < formatCode.length && code !== ']');
            }
            if (code === 'Y' || code === 'D' || code === 'M' || code === 'H' || code === 'S') {
                if (!inFormatPattern) {
                    if (i === 0 || formatCode[i - 1] !== '\\') {
                        inFormatPattern = true;
                        start = i;
                        length = 1;
                    }
                }
                else {
                    length++;
                }
            }
            else {
                inFormatPattern = false;
                if (code === ' ' && isValidDateOrTimePattern) {
                    return true;
                }
                if (length !== 0) {
                    subFormatPattern = formatCode.substr(start, length);
                    start = i;
                    length = 0;
                    if (UnitHelper.isNullOrUndefined(isValidDateOrTimePattern)) {
                        isValidDateOrTimePattern = ChartUtility.IsValidDateOrTimeFormatPattern(subFormatPattern);
                    }
                    else {
                        isValidDateOrTimePattern = isValidDateOrTimePattern && ChartUtility.IsValidDateOrTimeFormatPattern(subFormatPattern);
                    }
                }
            }
        }
        if (length !== 0 && i === formatCode.length) {
            subFormatPattern = formatCode.substr(start, length);
            if (UnitHelper.isNullOrUndefined(isValidDateOrTimePattern)) {
                isValidDateOrTimePattern = ChartUtility.IsValidDateOrTimeFormatPattern(subFormatPattern);
            }
            else {
                isValidDateOrTimePattern = isValidDateOrTimePattern && ChartUtility.IsValidDateOrTimeFormatPattern(subFormatPattern);
            }
        }
        return isValidDateOrTimePattern;
    };
    ChartUtility.IsValidDateOrTimeFormatPattern = function (pattern) {
        var DateAndTimeFormatElementDict = { Y: 4, D: 4, M: 5, H: 2, S: 2 };
        if (!pattern) {
            return false;
        }
        var itemGroups = {};
        for (var i = 0; i < pattern.length; i++) {
            var c = pattern[i];
            if (itemGroups[c]) {
                itemGroups[c] = itemGroups[c] + 1;
            }
            else {
                itemGroups[c] = 1;
            }
        }
        for (var prop in itemGroups) {
            if (itemGroups.hasOwnProperty(prop)) {
                var maxCount = DateAndTimeFormatElementDict[prop];
                if (typeof maxCount === 'undefined') {
                    return false;
                }
                if (itemGroups[prop] > maxCount) {
                    return false;
                }
            }
        }
        return true;
    };
    ChartUtility.presetColors = {};
    ChartUtility.defineProperty = defineProperty;
    ChartUtility.simpleJSONObject = simpleJSONObject;
    ChartUtility._deleteFillItems = deleteFillItems;
    return ChartUtility;
}());
exports.ChartUtility = ChartUtility;
ChartUtility.InitPresetColors();
var ShapeUtility = (function () {
    function ShapeUtility() {
    }
    ShapeUtility.InitGradientStopPresetColor = function (context, gradientFill) {
    };
    ShapeUtility.InitGradientStopTwoColor = function (context, gradientFill) {
    };
    ShapeUtility.InitGradientTwoColorCornerStops = function (context, gradientFill) {
    };
    ShapeUtility.InitGradientTwoColorCenterStops = function (context, gradientFill) {
    };
    ShapeUtility.InitGradientOneColorCornerStops = function (context, gradientFill) {
    };
    ShapeUtility.InitGradientOneColorCenterStops = function (context, gradientFill) {
    };
    ShapeUtility.InitGradientStopOneColor = function (context, gradientFill) {
    };
    ShapeUtility.InitGradientStops = function (context, gradientFill, colorType) {
    };
    ShapeUtility.GetGradientAngle = function (style, variant) {
        var res = 0;
        switch (style) {
            case drawingInterface_1.GradientStyle.GradientHorizontal:
                if (variant === 1) {
                    res = 90;
                }
                else if (variant === 2 || variant === 4) {
                    res = 270;
                }
                else if (variant === 3) {
                    res = 90;
                }
                break;
            case drawingInterface_1.GradientStyle.GradientVertical:
                if (variant === 1 || variant === 3) {
                    res = 0;
                }
                else if (variant === 2 || variant === 4) {
                    res = 180;
                }
                break;
            case drawingInterface_1.GradientStyle.GradientDiagonalUp:
                if (variant === 1 || variant === 3) {
                    res = 45;
                }
                else if (variant === 2 || variant === 4) {
                    res = 225;
                }
                break;
            case drawingInterface_1.GradientStyle.GradientDiagonalDown:
                if (variant === 1 || variant === 3) {
                    res = 135;
                }
                else if (variant === 2 || variant === 4) {
                    res = 315;
                }
                break;
            case drawingInterface_1.GradientStyle.GradientFromCorner:
            case drawingInterface_1.GradientStyle.GradientFromCenter:
                res = 135;
                break;
        }
        return res;
    };
    ShapeUtility.GetTintAndShadeByDegree = function (gradientDegree) {
        return (gradientDegree - 0.5) * 2;
    };
    ShapeUtility.ToLum = function (v) {
        return 100000 - Math_floor((1 - v) * 200000);
    };
    ShapeUtility.FromLum = function (d) {
        return 1 - (100000 - d) / 200000.0;
    };
    return ShapeUtility;
}());
exports.ShapeUtility = ShapeUtility;


function isOffsetNeeded(chartType) {
    return chartType === 8 ||
        (!ChartUtility.Is3DChart(chartType) &&
            (ChartUtility.IsBarChart(chartType) ||
                ChartUtility.IsColumnChart(chartType) || ChartUtility.IsLineChart(chartType)));
}
function shouldUseOffset(chart) {
    var chartType = chart.ChartType;
    if (chartType === 0 ) {
        var sers = chart.SeriesCollection.AllSers;
        for (var i = 0, count = sers.length; i < count; i++) {
            if (isOffsetNeeded(sers[i].ChartType)) {
                return true;
            }
        }
    }
    else {
        return isOffsetNeeded(chartType);
    }
    return false;
}
var AxisUtility = (function () {
    function AxisUtility() {
    }
    AxisUtility.CalculateValidMinimum = function (minimum, maximum, logarithmic, logarithmicBase, autoMinimum, autoMaximum) {
        if (logarithmic) {
            if (minimum === NumberExtension.DOUBLE_MAX_VALUE || minimum <= 0.0) {
                if (maximum === NumberExtension.DOUBLE_MIN_VALUE || maximum <= 0.0) {
                    minimum = 1.0;
                }
                else if (maximum < 1.0) {
                    minimum = maximum / logarithmicBase;
                }
                else if (maximum === 1.0) {
                    minimum = 1.0 / logarithmicBase;
                }
                else if (1.0 < maximum) {
                    minimum = 1.0;
                }
            }
            else if (maximum <= minimum) {
                if (maximum === NumberExtension.DOUBLE_MIN_VALUE || maximum <= 0.0) {

                }
                else if (maximum < 1.0 && (autoMinimum && !autoMaximum)) {
                    minimum = maximum / logarithmicBase;
                }
                else if (maximum === 1.0 && (autoMinimum && !autoMaximum)) {
                    minimum = 1.0 / logarithmicBase;
                }
                else if (1.0 < maximum && (autoMinimum || !autoMaximum)) {
                    minimum = 1.0;
                }
            }
            else if (autoMinimum) {
                minimum = 1.0;
            }
        }
        else if (minimum === NumberExtension.DOUBLE_MAX_VALUE) {
            if (maximum === NumberExtension.DOUBLE_MIN_VALUE) {
                minimum = 0.0;
            }
            else if (maximum < 0.0) {
                minimum = 2.0 * maximum;
            }
            else if (maximum === 0.0) {
                minimum = -1.0;
            }
            else if (0.0 < maximum) {
                minimum = 0.0;
            }
        }
        else if (maximum <= minimum) {
            if (maximum === NumberExtension.DOUBLE_MIN_VALUE) {

            }
            else if (maximum < 0.0 && (autoMinimum && !autoMaximum)) {
                if (maximum !== minimum) {
                    minimum = 2.0 * maximum;
                }
            }
            else if (maximum === 0.0 && (autoMinimum && !autoMaximum)) {
                minimum = -1.0;
            }
            else if (0.0 < maximum && (autoMinimum || !autoMaximum)) {
                minimum = 0.0;
            }
        }
        return minimum;
    };
    AxisUtility.CalculateValidMaximum = function (minimum, maximum, logarithmic, logarithmicBase) {
        if (logarithmic) {
            if (maximum <= minimum) {
                if (minimum < 1.0) {
                    maximum = 1.0;
                }
                else if (minimum === 1.0) {
                    maximum = logarithmicBase;
                }
                else if (1.0 < minimum) {
                    maximum = minimum * logarithmicBase;
                }
            }
        }
        else if (maximum <= minimum) {
            if (minimum < 0.0) {
                maximum = 0.0;
            }
            else if (minimum === 0.0) {
                maximum = 1.0;
            }
            else if (0.0 < minimum) {
                if (maximum !== minimum) {
                    maximum = 2.0 * minimum;
                }
            }
        }
        return maximum;
    };


    AxisUtility.calcMinMax = function (minimum, maximum, logarithmic, chart) {
        var diff = maximum - minimum, offset = 0.05 * diff, min, max;
        var chartType = chart.ChartType;
        if (logarithmic) {
            min = minimum;
            max = maximum;
            if (maximum < 1.0) {
                min = max = 1.0;
            }
        }
        else {
            if (minimum >= 0) {
                max = maximum;
                if (shouldUseOffset(chart)) {
                    max += offset;
                }
                if (6 * diff > maximum) {
                    min = 0;
                }
                else {
                    min = minimum - diff / 2;
                    if (ChartUtility.IsScatterChart(chartType) || ChartUtility.IsBubbleChart(chartType)) {
                        min = minimum;
                    }
                }
            }
            else if (maximum <= 0) {
                min = minimum;
                if (shouldUseOffset(chart)) {
                    min -= offset;
                }
                if (6 * diff + minimum > 0) {
                    max = 0;
                }
                else {
                    max = maximum + diff / 2;
                    if (ChartUtility.IsScatterChart(chartType) || ChartUtility.IsBubbleChart(chartType)) {
                        max = maximum;
                    }
                }
            }
            else {
                min = minimum - offset;
                max = maximum + offset;
            }
        }
        return { Min: min, Max: max };
    };
    AxisUtility.CalculateMinimum2 = function (minimum, maximum, majorUnit, logarithmic, logarithmicBase) {
        if (logarithmic) {
            minimum = Math_pow(logarithmicBase, Math_floor(NumberExtension.log(minimum, logarithmicBase)));
        }
        else {
            minimum = Math_floor(minimum / majorUnit) * majorUnit;
        }
        return minimum;
    };
    AxisUtility._axisIds = {};
    AxisUtility.CalculateMaximum2 = function (minimum, maximum, majorUnit, logarithmic, logarithmicBase) {
        if (logarithmic) {
            maximum = Math_pow(logarithmicBase, Math_ceil(NumberExtension.log(maximum, logarithmicBase)));
        }
        else {
            maximum = Math_ceil(maximum / majorUnit) * majorUnit;
        }
        return maximum;
    };
    AxisUtility.CalculateMajorUnit = function (minimum, maximum, autoMinorUnit, minorUnit, logarithmic, logarithmicBase) {
        var range = Math_abs(maximum - minimum);
        var majorUnit;
        if (logarithmic) {
            majorUnit = logarithmicBase;
        }
        else {
            majorUnit = Math_pow(10.0, Math_floor(NumberExtension.log(range, 10)));
            if (range / majorUnit <= 1.6) {
                majorUnit /= 5.0;
            }
            else if (range / majorUnit <= 4.0) {
                majorUnit /= 2.0;
            }
            else if (range / majorUnit > 8.0) {
                majorUnit *= 2.0;
            }
            if (!autoMinorUnit) {
                majorUnit = Math_max(majorUnit, minorUnit);
            }
        }
        return majorUnit;
    };
    AxisUtility.CalculateMinorUnit = function (minimum, maximum, majorUnit, logarithmic) {
        var minorUnit;
        if (logarithmic) {
            minorUnit = majorUnit;
        }
        else {
            minorUnit = majorUnit / 5.0;
        }
        return minorUnit;
    };
    AxisUtility.GenerateAxisId = function () {
        var id = 0;
        while (true) {
            id = Math_floor(Math.random() * 90000000) + 10000000;
            if (!this._axisIds[id]) {
                this._axisIds[id] = true;
                break;
            }
        }
        return id;
    };
    return AxisUtility;
}());
exports.AxisUtility = AxisUtility;
var ChartElementBase = (function () {
    function ChartElementBase() {
    }
    Object.defineProperty(ChartElementBase.prototype, 'ChartFormat', {
        get: function () {
            if (UnitHelper.isNullOrUndefined(this._format)) {
                this._format = this.GetDefaultFormat();
            }
            return this._format;
        },
        enumerable: true,
        configurable: true
    });
    ChartElementBase.prototype.CreateFormat = function () {
        return keyword_null;
    };
    ChartElementBase.prototype.GetDefaultFormat = function () {
        return this.CreateFormat();
    };
    ChartElementBase.prototype.GetFormatInternal = function () {
        return this._format;
    };
    ChartElementBase.prototype.FromShapeProperties = function (sp ) {
        var _this = this;
        if (!UnitHelper.isNullOrUndefined(sp)) {
            if (UnitHelper.isNullOrUndefined(_this._format)) {
                _this._format = _this.CreateFormat();
            }
            _this._format.FromOOModel(sp);
        }
        else {
            _this.ClearFormat();
        }
    };
    ChartElementBase.prototype.ToShapeProperties = function () {
        return !UnitHelper.isNullOrUndefined(this._format) ? this._format.ToOOModel() : keyword_null;
    };
    ChartElementBase.prototype.Delete = function () {
        if (!UnitHelper.isNullOrUndefined(this._format)) {
            this._format.ParentStateful = keyword_null;
        }
    };
    ChartElementBase.prototype.ClearFormat = function () {
        var _this = this;
        if (!UnitHelper.isNullOrUndefined(_this._format)) {
            _this._format.SetParentForChildren(keyword_null);
            _this._format.ParentStateful = keyword_null;
            _this._format = keyword_null;
        }
    };
    return ChartElementBase;
}());
exports.ChartElementBase = ChartElementBase;
var BevelType;
(function (BevelType) {
    BevelType[BevelType['BevelNone'] = 0] = 'BevelNone';


    BevelType[BevelType['BevelRelaxedInset'] = 1] = 'BevelRelaxedInset';


    BevelType[BevelType['BevelCircle'] = 2] = 'BevelCircle';


    BevelType[BevelType['BevelSlope'] = 3] = 'BevelSlope';


    BevelType[BevelType['BevelCross'] = 4] = 'BevelCross';


    BevelType[BevelType['BevelAngle'] = 5] = 'BevelAngle';


    BevelType[BevelType['BevelSoftRound'] = 6] = 'BevelSoftRound';


    BevelType[BevelType['BevelConvex'] = 7] = 'BevelConvex';


    BevelType[BevelType['BevelCoolSlant'] = 8] = 'BevelCoolSlant';


    BevelType[BevelType['BevelDivot'] = 9] = 'BevelDivot';


    BevelType[BevelType['BevelRiblet'] = 10] = 'BevelRiblet';


    BevelType[BevelType['BevelHardEdge'] = 11] = 'BevelHardEdge';


    BevelType[BevelType['BevelArtDeco'] = 12] = 'BevelArtDeco';
})(BevelType = exports.BevelType || (exports.BevelType = {}));
var ChartGroupType;
(function (ChartGroupType) {
    ChartGroupType[ChartGroupType['UnKnown'] = 0] = 'UnKnown';
    ChartGroupType[ChartGroupType['Area3DGroup'] = 1] = 'Area3DGroup';
    ChartGroupType[ChartGroupType['Bar3DGroup'] = 2] = 'Bar3DGroup';
    ChartGroupType[ChartGroupType['Column3DGroup'] = 3] = 'Column3DGroup';
    ChartGroupType[ChartGroupType['Line3DGroup'] = 4] = 'Line3DGroup';
    ChartGroupType[ChartGroupType['Pie3DGroup'] = 5] = 'Pie3DGroup';
    ChartGroupType[ChartGroupType['SurfaceGroup'] = 6] = 'SurfaceGroup';
    ChartGroupType[ChartGroupType['AreaGroup'] = 7] = 'AreaGroup';
    ChartGroupType[ChartGroupType['BarGroup'] = 8] = 'BarGroup';
    ChartGroupType[ChartGroupType['ColumnGroup'] = 9] = 'ColumnGroup';
    ChartGroupType[ChartGroupType['DoughnutGroup'] = 10] = 'DoughnutGroup';
    ChartGroupType[ChartGroupType['LineGroup'] = 11] = 'LineGroup';
    ChartGroupType[ChartGroupType['PieGroup'] = 12] = 'PieGroup';
    ChartGroupType[ChartGroupType['RadarGroup'] = 13] = 'RadarGroup';
    ChartGroupType[ChartGroupType['XYGroup'] = 14] = 'XYGroup';
})(ChartGroupType = exports.ChartGroupType || (exports.ChartGroupType = {}));
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/drawingInterface.js':
/*!*****************************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/drawingInterface.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var ST_TextStrikeType;
(function (ST_TextStrikeType) {
    ST_TextStrikeType[ST_TextStrikeType['noStrike'] = 0] = 'noStrike';
    ST_TextStrikeType[ST_TextStrikeType['sngStrike'] = 1] = 'sngStrike';
    ST_TextStrikeType[ST_TextStrikeType['dblStrike'] = 2] = 'dblStrike';
})(ST_TextStrikeType = exports.ST_TextStrikeType || (exports.ST_TextStrikeType = {}));
var ST_LineCap;
(function (ST_LineCap) {
    ST_LineCap[ST_LineCap['rnd'] = 0] = 'rnd';
    ST_LineCap[ST_LineCap['sq'] = 1] = 'sq';
    ST_LineCap[ST_LineCap['flat'] = 2] = 'flat';
})(ST_LineCap = exports.ST_LineCap || (exports.ST_LineCap = {}));
var ST_BlipCompression;
(function (ST_BlipCompression) {
    ST_BlipCompression[ST_BlipCompression['email'] = 0] = 'email';
    ST_BlipCompression[ST_BlipCompression['screen'] = 1] = 'screen';
    ST_BlipCompression[ST_BlipCompression['print'] = 2] = 'print';
    ST_BlipCompression[ST_BlipCompression['hqprint'] = 3] = 'hqprint';
    ST_BlipCompression[ST_BlipCompression['none'] = 4] = 'none';
})(ST_BlipCompression = exports.ST_BlipCompression || (exports.ST_BlipCompression = {}));
var ST_PathShadeType;
(function (ST_PathShadeType) {
    ST_PathShadeType[ST_PathShadeType['shape'] = 0] = 'shape';
    ST_PathShadeType[ST_PathShadeType['circle'] = 1] = 'circle';
    ST_PathShadeType[ST_PathShadeType['rect'] = 2] = 'rect';
})(ST_PathShadeType = exports.ST_PathShadeType || (exports.ST_PathShadeType = {}));
var ST_PresetMaterialType;
(function (ST_PresetMaterialType) {
    ST_PresetMaterialType[ST_PresetMaterialType['legacyMatte'] = 0] = 'legacyMatte';
    ST_PresetMaterialType[ST_PresetMaterialType['legacyPlastic'] = 1] = 'legacyPlastic';
    ST_PresetMaterialType[ST_PresetMaterialType['legacyMetal'] = 2] = 'legacyMetal';
    ST_PresetMaterialType[ST_PresetMaterialType['legacyWireframe'] = 3] = 'legacyWireframe';
    ST_PresetMaterialType[ST_PresetMaterialType['matte'] = 4] = 'matte';
    ST_PresetMaterialType[ST_PresetMaterialType['plastic'] = 5] = 'plastic';
    ST_PresetMaterialType[ST_PresetMaterialType['metal'] = 6] = 'metal';
    ST_PresetMaterialType[ST_PresetMaterialType['warmMatte'] = 7] = 'warmMatte';
    ST_PresetMaterialType[ST_PresetMaterialType['translucentPowder'] = 8] = 'translucentPowder';
    ST_PresetMaterialType[ST_PresetMaterialType['powder'] = 9] = 'powder';
    ST_PresetMaterialType[ST_PresetMaterialType['dkEdge'] = 10] = 'dkEdge';
    ST_PresetMaterialType[ST_PresetMaterialType['softEdge'] = 11] = 'softEdge';
    ST_PresetMaterialType[ST_PresetMaterialType['clear'] = 12] = 'clear';
    ST_PresetMaterialType[ST_PresetMaterialType['flat'] = 13] = 'flat';
    ST_PresetMaterialType[ST_PresetMaterialType['softmetal'] = 14] = 'softmetal';
})(ST_PresetMaterialType = exports.ST_PresetMaterialType || (exports.ST_PresetMaterialType = {}));
var ST_Orientation;
(function (ST_Orientation) {
    ST_Orientation[ST_Orientation['maxMin'] = 0] = 'maxMin';
    ST_Orientation[ST_Orientation['minMax'] = 1] = 'minMax';
})(ST_Orientation = exports.ST_Orientation || (exports.ST_Orientation = {}));
var ST_CrossBetween;
(function (ST_CrossBetween) {
    ST_CrossBetween[ST_CrossBetween['between'] = 0] = 'between';
    ST_CrossBetween[ST_CrossBetween['midCat'] = 1] = 'midCat';
})(ST_CrossBetween = exports.ST_CrossBetween || (exports.ST_CrossBetween = {}));
var AnchorType;
(function (AnchorType) {
    AnchorType[AnchorType['TwoCellAnchor'] = 0] = 'TwoCellAnchor';
    AnchorType[AnchorType['OneCellAnchor'] = 1] = 'OneCellAnchor';
    AnchorType[AnchorType['AbsoluteAnchor'] = 2] = 'AbsoluteAnchor';
    AnchorType[AnchorType['RelSizeAnchor'] = 3] = 'RelSizeAnchor';
    AnchorType[AnchorType['AbsSizeAnchor'] = 4] = 'AbsSizeAnchor';
})(AnchorType = exports.AnchorType || (exports.AnchorType = {}));
var ColorFillType;
(function (ColorFillType) {
    ColorFillType[ColorFillType['SolidColorFillProperties'] = 0] = 'SolidColorFillProperties';
    ColorFillType[ColorFillType['PatternFillProperties'] = 1] = 'PatternFillProperties';
    ColorFillType[ColorFillType['GradientFillProperties'] = 2] = 'GradientFillProperties';
    ColorFillType[ColorFillType['BlipFillProperties'] = 3] = 'BlipFillProperties';
    ColorFillType[ColorFillType['GroupFillProperties'] = 4] = 'GroupFillProperties';
    ColorFillType[ColorFillType['NoFillProperties'] = 5] = 'NoFillProperties';
})(ColorFillType = exports.ColorFillType || (exports.ColorFillType = {}));
var CT_ChartType;
(function (CT_ChartType) {
    CT_ChartType[CT_ChartType['CT_StockChart'] = 0] = 'CT_StockChart';
    CT_ChartType[CT_ChartType['CT_ScatterChart'] = 1] = 'CT_ScatterChart';
    CT_ChartType[CT_ChartType['CT_RadarChart'] = 2] = 'CT_RadarChart';
    CT_ChartType[CT_ChartType['CT_BubbleChart'] = 3] = 'CT_BubbleChart';
    CT_ChartType[CT_ChartType['CT_AreaChart'] = 4] = 'CT_AreaChart';
    CT_ChartType[CT_ChartType['CT_Area3DChart'] = 5] = 'CT_Area3DChart';
    CT_ChartType[CT_ChartType['CT_BarChart'] = 6] = 'CT_BarChart';
    CT_ChartType[CT_ChartType['CT_Bar3DChart'] = 7] = 'CT_Bar3DChart';
    CT_ChartType[CT_ChartType['CT_LineChart'] = 8] = 'CT_LineChart';
    CT_ChartType[CT_ChartType['CT_Line3DChart'] = 9] = 'CT_Line3DChart';
    CT_ChartType[CT_ChartType['CT_PieChart'] = 10] = 'CT_PieChart';
    CT_ChartType[CT_ChartType['CT_Pie3DChart'] = 11] = 'CT_Pie3DChart';
    CT_ChartType[CT_ChartType['CT_DoughnutChart'] = 12] = 'CT_DoughnutChart';
    CT_ChartType[CT_ChartType['CT_OfPieChart'] = 13] = 'CT_OfPieChart';
    CT_ChartType[CT_ChartType['CT_SurfaceChart'] = 14] = 'CT_SurfaceChart';
    CT_ChartType[CT_ChartType['CT_Surface3DChart'] = 15] = 'CT_Surface3DChart';
    CT_ChartType[CT_ChartType['CT_BoxWhisker'] = 16] = 'CT_BoxWhisker';
    CT_ChartType[CT_ChartType['CT_Funnel'] = 17] = 'CT_Funnel';
    CT_ChartType[CT_ChartType['CT_ParetoLine'] = 18] = 'CT_ParetoLine';
    CT_ChartType[CT_ChartType['CT_RegionMap'] = 19] = 'CT_RegionMap';
    CT_ChartType[CT_ChartType['CT_Sunburst'] = 20] = 'CT_Sunburst';
    CT_ChartType[CT_ChartType['CT_Treemap'] = 21] = 'CT_Treemap';
    CT_ChartType[CT_ChartType['CT_Waterfall'] = 22] = 'CT_Waterfall';
    CT_ChartType[CT_ChartType['CT_ClusteredColumn'] = 23] = 'CT_ClusteredColumn';
})(CT_ChartType = exports.CT_ChartType || (exports.CT_ChartType = {}));
var CT_AxisType;
(function (CT_AxisType) {
    CT_AxisType[CT_AxisType['CT_CatAx'] = 0] = 'CT_CatAx';
    CT_AxisType[CT_AxisType['CT_DateAx'] = 1] = 'CT_DateAx';
    CT_AxisType[CT_AxisType['CT_SerAx'] = 2] = 'CT_SerAx';
    CT_AxisType[CT_AxisType['CT_ValAx'] = 3] = 'CT_ValAx';
})(CT_AxisType = exports.CT_AxisType || (exports.CT_AxisType = {}));
var CT_HiddenExtensionType;
(function (CT_HiddenExtensionType) {
    CT_HiddenExtensionType[CT_HiddenExtensionType['CT_HiddenScene3dExtension'] = 0] = 'CT_HiddenScene3dExtension';
    CT_HiddenExtensionType[CT_HiddenExtensionType['CT_HiddenFillPropertiesExtension'] = 1] = 'CT_HiddenFillPropertiesExtension';
    CT_HiddenExtensionType[CT_HiddenExtensionType['CT_HiddenLinePropertiesBaseExtension'] = 2] = 'CT_HiddenLinePropertiesBaseExtension';
    CT_HiddenExtensionType[CT_HiddenExtensionType['CT_HiddenShape3dExtension'] = 3] = 'CT_HiddenShape3dExtension';
    CT_HiddenExtensionType[CT_HiddenExtensionType['CT_OfficeArtExtension'] = 4] = 'CT_OfficeArtExtension';
})(CT_HiddenExtensionType = exports.CT_HiddenExtensionType || (exports.CT_HiddenExtensionType = {}));
var ST_FontCollectionIndex;
(function (ST_FontCollectionIndex) {
    ST_FontCollectionIndex[ST_FontCollectionIndex['major'] = 0] = 'major';
    ST_FontCollectionIndex[ST_FontCollectionIndex['minor'] = 1] = 'minor';
    ST_FontCollectionIndex[ST_FontCollectionIndex['none'] = 2] = 'none';
})(ST_FontCollectionIndex = exports.ST_FontCollectionIndex || (exports.ST_FontCollectionIndex = {}));
var ST_PresetColorVal;
(function (ST_PresetColorVal) {
    ST_PresetColorVal[ST_PresetColorVal['aliceBlue'] = 0] = 'aliceBlue';
    ST_PresetColorVal[ST_PresetColorVal['antiqueWhite'] = 1] = 'antiqueWhite';
    ST_PresetColorVal[ST_PresetColorVal['aqua'] = 2] = 'aqua';
    ST_PresetColorVal[ST_PresetColorVal['aquamarine'] = 3] = 'aquamarine';
    ST_PresetColorVal[ST_PresetColorVal['azure'] = 4] = 'azure';
    ST_PresetColorVal[ST_PresetColorVal['beige'] = 5] = 'beige';
    ST_PresetColorVal[ST_PresetColorVal['bisque'] = 6] = 'bisque';
    ST_PresetColorVal[ST_PresetColorVal['black'] = 7] = 'black';
    ST_PresetColorVal[ST_PresetColorVal['blanchedAlmond'] = 8] = 'blanchedAlmond';
    ST_PresetColorVal[ST_PresetColorVal['blue'] = 9] = 'blue';
    ST_PresetColorVal[ST_PresetColorVal['blueViolet'] = 10] = 'blueViolet';
    ST_PresetColorVal[ST_PresetColorVal['brown'] = 11] = 'brown';
    ST_PresetColorVal[ST_PresetColorVal['burlyWood'] = 12] = 'burlyWood';
    ST_PresetColorVal[ST_PresetColorVal['cadetBlue'] = 13] = 'cadetBlue';
    ST_PresetColorVal[ST_PresetColorVal['chartreuse'] = 14] = 'chartreuse';
    ST_PresetColorVal[ST_PresetColorVal['chocolate'] = 15] = 'chocolate';
    ST_PresetColorVal[ST_PresetColorVal['coral'] = 16] = 'coral';
    ST_PresetColorVal[ST_PresetColorVal['cornflowerBlue'] = 17] = 'cornflowerBlue';
    ST_PresetColorVal[ST_PresetColorVal['cornsilk'] = 18] = 'cornsilk';
    ST_PresetColorVal[ST_PresetColorVal['crimson'] = 19] = 'crimson';
    ST_PresetColorVal[ST_PresetColorVal['cyan'] = 20] = 'cyan';
    ST_PresetColorVal[ST_PresetColorVal['darkBlue'] = 21] = 'darkBlue';
    ST_PresetColorVal[ST_PresetColorVal['darkCyan'] = 22] = 'darkCyan';
    ST_PresetColorVal[ST_PresetColorVal['darkGoldenrod'] = 23] = 'darkGoldenrod';
    ST_PresetColorVal[ST_PresetColorVal['darkGray'] = 24] = 'darkGray';
    ST_PresetColorVal[ST_PresetColorVal['darkGreen'] = 25] = 'darkGreen';
    ST_PresetColorVal[ST_PresetColorVal['darkGrey'] = 26] = 'darkGrey';
    ST_PresetColorVal[ST_PresetColorVal['darkKhaki'] = 27] = 'darkKhaki';
    ST_PresetColorVal[ST_PresetColorVal['darkMagenta'] = 28] = 'darkMagenta';
    ST_PresetColorVal[ST_PresetColorVal['darkOliveGreen'] = 29] = 'darkOliveGreen';
    ST_PresetColorVal[ST_PresetColorVal['darkOrange'] = 30] = 'darkOrange';
    ST_PresetColorVal[ST_PresetColorVal['darkOrchid'] = 31] = 'darkOrchid';
    ST_PresetColorVal[ST_PresetColorVal['darkRed'] = 32] = 'darkRed';
    ST_PresetColorVal[ST_PresetColorVal['darkSalmon'] = 33] = 'darkSalmon';
    ST_PresetColorVal[ST_PresetColorVal['darkSeaGreen'] = 34] = 'darkSeaGreen';
    ST_PresetColorVal[ST_PresetColorVal['darkSlateBlue'] = 35] = 'darkSlateBlue';
    ST_PresetColorVal[ST_PresetColorVal['darkSlateGray'] = 36] = 'darkSlateGray';
    ST_PresetColorVal[ST_PresetColorVal['darkSlateGrey'] = 37] = 'darkSlateGrey';
    ST_PresetColorVal[ST_PresetColorVal['darkTurquoise'] = 38] = 'darkTurquoise';
    ST_PresetColorVal[ST_PresetColorVal['darkViolet'] = 39] = 'darkViolet';
    ST_PresetColorVal[ST_PresetColorVal['deepPink'] = 40] = 'deepPink';
    ST_PresetColorVal[ST_PresetColorVal['deepSkyBlue'] = 41] = 'deepSkyBlue';
    ST_PresetColorVal[ST_PresetColorVal['dimGray'] = 42] = 'dimGray';
    ST_PresetColorVal[ST_PresetColorVal['dimGrey'] = 43] = 'dimGrey';
    ST_PresetColorVal[ST_PresetColorVal['dkBlue'] = 44] = 'dkBlue';
    ST_PresetColorVal[ST_PresetColorVal['dkCyan'] = 45] = 'dkCyan';
    ST_PresetColorVal[ST_PresetColorVal['dkGoldenrod'] = 46] = 'dkGoldenrod';
    ST_PresetColorVal[ST_PresetColorVal['dkGray'] = 47] = 'dkGray';
    ST_PresetColorVal[ST_PresetColorVal['dkGreen'] = 48] = 'dkGreen';
    ST_PresetColorVal[ST_PresetColorVal['dkGrey'] = 49] = 'dkGrey';
    ST_PresetColorVal[ST_PresetColorVal['dkKhaki'] = 50] = 'dkKhaki';
    ST_PresetColorVal[ST_PresetColorVal['dkMagenta'] = 51] = 'dkMagenta';
    ST_PresetColorVal[ST_PresetColorVal['dkOliveGreen'] = 52] = 'dkOliveGreen';
    ST_PresetColorVal[ST_PresetColorVal['dkOrange'] = 53] = 'dkOrange';
    ST_PresetColorVal[ST_PresetColorVal['dkOrchid'] = 54] = 'dkOrchid';
    ST_PresetColorVal[ST_PresetColorVal['dkRed'] = 55] = 'dkRed';
    ST_PresetColorVal[ST_PresetColorVal['dkSalmon'] = 56] = 'dkSalmon';
    ST_PresetColorVal[ST_PresetColorVal['dkSeaGreen'] = 57] = 'dkSeaGreen';
    ST_PresetColorVal[ST_PresetColorVal['dkSlateBlue'] = 58] = 'dkSlateBlue';
    ST_PresetColorVal[ST_PresetColorVal['dkSlateGray'] = 59] = 'dkSlateGray';
    ST_PresetColorVal[ST_PresetColorVal['dkSlateGrey'] = 60] = 'dkSlateGrey';
    ST_PresetColorVal[ST_PresetColorVal['dkTurquoise'] = 61] = 'dkTurquoise';
    ST_PresetColorVal[ST_PresetColorVal['dkViolet'] = 62] = 'dkViolet';
    ST_PresetColorVal[ST_PresetColorVal['dodgerBlue'] = 63] = 'dodgerBlue';
    ST_PresetColorVal[ST_PresetColorVal['firebrick'] = 64] = 'firebrick';
    ST_PresetColorVal[ST_PresetColorVal['floralWhite'] = 65] = 'floralWhite';
    ST_PresetColorVal[ST_PresetColorVal['forestGreen'] = 66] = 'forestGreen';
    ST_PresetColorVal[ST_PresetColorVal['fuchsia'] = 67] = 'fuchsia';
    ST_PresetColorVal[ST_PresetColorVal['gainsboro'] = 68] = 'gainsboro';
    ST_PresetColorVal[ST_PresetColorVal['ghostWhite'] = 69] = 'ghostWhite';
    ST_PresetColorVal[ST_PresetColorVal['gold'] = 70] = 'gold';
    ST_PresetColorVal[ST_PresetColorVal['goldenrod'] = 71] = 'goldenrod';
    ST_PresetColorVal[ST_PresetColorVal['gray'] = 72] = 'gray';
    ST_PresetColorVal[ST_PresetColorVal['green'] = 73] = 'green';
    ST_PresetColorVal[ST_PresetColorVal['greenYellow'] = 74] = 'greenYellow';
    ST_PresetColorVal[ST_PresetColorVal['grey'] = 75] = 'grey';
    ST_PresetColorVal[ST_PresetColorVal['honeydew'] = 76] = 'honeydew';
    ST_PresetColorVal[ST_PresetColorVal['hotPink'] = 77] = 'hotPink';
    ST_PresetColorVal[ST_PresetColorVal['indianRed'] = 78] = 'indianRed';
    ST_PresetColorVal[ST_PresetColorVal['indigo'] = 79] = 'indigo';
    ST_PresetColorVal[ST_PresetColorVal['ivory'] = 80] = 'ivory';
    ST_PresetColorVal[ST_PresetColorVal['khaki'] = 81] = 'khaki';
    ST_PresetColorVal[ST_PresetColorVal['lavender'] = 82] = 'lavender';
    ST_PresetColorVal[ST_PresetColorVal['lavenderBlush'] = 83] = 'lavenderBlush';
    ST_PresetColorVal[ST_PresetColorVal['lawnGreen'] = 84] = 'lawnGreen';
    ST_PresetColorVal[ST_PresetColorVal['lemonChiffon'] = 85] = 'lemonChiffon';
    ST_PresetColorVal[ST_PresetColorVal['lightBlue'] = 86] = 'lightBlue';
    ST_PresetColorVal[ST_PresetColorVal['lightCoral'] = 87] = 'lightCoral';
    ST_PresetColorVal[ST_PresetColorVal['lightCyan'] = 88] = 'lightCyan';
    ST_PresetColorVal[ST_PresetColorVal['lightGoldenrodYellow'] = 89] = 'lightGoldenrodYellow';
    ST_PresetColorVal[ST_PresetColorVal['lightGray'] = 90] = 'lightGray';
    ST_PresetColorVal[ST_PresetColorVal['lightGreen'] = 91] = 'lightGreen';
    ST_PresetColorVal[ST_PresetColorVal['lightGrey'] = 92] = 'lightGrey';
    ST_PresetColorVal[ST_PresetColorVal['lightPink'] = 93] = 'lightPink';
    ST_PresetColorVal[ST_PresetColorVal['lightSalmon'] = 94] = 'lightSalmon';
    ST_PresetColorVal[ST_PresetColorVal['lightSeaGreen'] = 95] = 'lightSeaGreen';
    ST_PresetColorVal[ST_PresetColorVal['lightSkyBlue'] = 96] = 'lightSkyBlue';
    ST_PresetColorVal[ST_PresetColorVal['lightSlateGray'] = 97] = 'lightSlateGray';
    ST_PresetColorVal[ST_PresetColorVal['lightSlateGrey'] = 98] = 'lightSlateGrey';
    ST_PresetColorVal[ST_PresetColorVal['lightSteelBlue'] = 99] = 'lightSteelBlue';
    ST_PresetColorVal[ST_PresetColorVal['lightYellow'] = 100] = 'lightYellow';
    ST_PresetColorVal[ST_PresetColorVal['lime'] = 101] = 'lime';
    ST_PresetColorVal[ST_PresetColorVal['limeGreen'] = 102] = 'limeGreen';
    ST_PresetColorVal[ST_PresetColorVal['linen'] = 103] = 'linen';
    ST_PresetColorVal[ST_PresetColorVal['ltBlue'] = 104] = 'ltBlue';
    ST_PresetColorVal[ST_PresetColorVal['ltCoral'] = 105] = 'ltCoral';
    ST_PresetColorVal[ST_PresetColorVal['ltCyan'] = 106] = 'ltCyan';
    ST_PresetColorVal[ST_PresetColorVal['ltGoldenrodYellow'] = 107] = 'ltGoldenrodYellow';
    ST_PresetColorVal[ST_PresetColorVal['ltGray'] = 108] = 'ltGray';
    ST_PresetColorVal[ST_PresetColorVal['ltGreen'] = 109] = 'ltGreen';
    ST_PresetColorVal[ST_PresetColorVal['ltGrey'] = 110] = 'ltGrey';
    ST_PresetColorVal[ST_PresetColorVal['ltPink'] = 111] = 'ltPink';
    ST_PresetColorVal[ST_PresetColorVal['ltSalmon'] = 112] = 'ltSalmon';
    ST_PresetColorVal[ST_PresetColorVal['ltSeaGreen'] = 113] = 'ltSeaGreen';
    ST_PresetColorVal[ST_PresetColorVal['ltSkyBlue'] = 114] = 'ltSkyBlue';
    ST_PresetColorVal[ST_PresetColorVal['ltSlateGray'] = 115] = 'ltSlateGray';
    ST_PresetColorVal[ST_PresetColorVal['ltSlateGrey'] = 116] = 'ltSlateGrey';
    ST_PresetColorVal[ST_PresetColorVal['ltSteelBlue'] = 117] = 'ltSteelBlue';
    ST_PresetColorVal[ST_PresetColorVal['ltYellow'] = 118] = 'ltYellow';
    ST_PresetColorVal[ST_PresetColorVal['magenta'] = 119] = 'magenta';
    ST_PresetColorVal[ST_PresetColorVal['maroon'] = 120] = 'maroon';
    ST_PresetColorVal[ST_PresetColorVal['medAquamarine'] = 121] = 'medAquamarine';
    ST_PresetColorVal[ST_PresetColorVal['medBlue'] = 122] = 'medBlue';
    ST_PresetColorVal[ST_PresetColorVal['mediumAquamarine'] = 123] = 'mediumAquamarine';
    ST_PresetColorVal[ST_PresetColorVal['mediumBlue'] = 124] = 'mediumBlue';
    ST_PresetColorVal[ST_PresetColorVal['mediumOrchid'] = 125] = 'mediumOrchid';
    ST_PresetColorVal[ST_PresetColorVal['mediumPurple'] = 126] = 'mediumPurple';
    ST_PresetColorVal[ST_PresetColorVal['mediumSeaGreen'] = 127] = 'mediumSeaGreen';
    ST_PresetColorVal[ST_PresetColorVal['mediumSlateBlue'] = 128] = 'mediumSlateBlue';
    ST_PresetColorVal[ST_PresetColorVal['mediumSpringGreen'] = 129] = 'mediumSpringGreen';
    ST_PresetColorVal[ST_PresetColorVal['mediumTurquoise'] = 130] = 'mediumTurquoise';
    ST_PresetColorVal[ST_PresetColorVal['mediumVioletRed'] = 131] = 'mediumVioletRed';
    ST_PresetColorVal[ST_PresetColorVal['medOrchid'] = 132] = 'medOrchid';
    ST_PresetColorVal[ST_PresetColorVal['medPurple'] = 133] = 'medPurple';
    ST_PresetColorVal[ST_PresetColorVal['medSeaGreen'] = 134] = 'medSeaGreen';
    ST_PresetColorVal[ST_PresetColorVal['medSlateBlue'] = 135] = 'medSlateBlue';
    ST_PresetColorVal[ST_PresetColorVal['medSpringGreen'] = 136] = 'medSpringGreen';
    ST_PresetColorVal[ST_PresetColorVal['medTurquoise'] = 137] = 'medTurquoise';
    ST_PresetColorVal[ST_PresetColorVal['medVioletRed'] = 138] = 'medVioletRed';
    ST_PresetColorVal[ST_PresetColorVal['midnightBlue'] = 139] = 'midnightBlue';
    ST_PresetColorVal[ST_PresetColorVal['mintCream'] = 140] = 'mintCream';
    ST_PresetColorVal[ST_PresetColorVal['mistyRose'] = 141] = 'mistyRose';
    ST_PresetColorVal[ST_PresetColorVal['moccasin'] = 142] = 'moccasin';
    ST_PresetColorVal[ST_PresetColorVal['navajoWhite'] = 143] = 'navajoWhite';
    ST_PresetColorVal[ST_PresetColorVal['navy'] = 144] = 'navy';
    ST_PresetColorVal[ST_PresetColorVal['oldLace'] = 145] = 'oldLace';
    ST_PresetColorVal[ST_PresetColorVal['olive'] = 146] = 'olive';
    ST_PresetColorVal[ST_PresetColorVal['oliveDrab'] = 147] = 'oliveDrab';
    ST_PresetColorVal[ST_PresetColorVal['orange'] = 148] = 'orange';
    ST_PresetColorVal[ST_PresetColorVal['orangeRed'] = 149] = 'orangeRed';
    ST_PresetColorVal[ST_PresetColorVal['orchid'] = 150] = 'orchid';
    ST_PresetColorVal[ST_PresetColorVal['paleGoldenrod'] = 151] = 'paleGoldenrod';
    ST_PresetColorVal[ST_PresetColorVal['paleGreen'] = 152] = 'paleGreen';
    ST_PresetColorVal[ST_PresetColorVal['paleTurquoise'] = 153] = 'paleTurquoise';
    ST_PresetColorVal[ST_PresetColorVal['paleVioletRed'] = 154] = 'paleVioletRed';
    ST_PresetColorVal[ST_PresetColorVal['papayaWhip'] = 155] = 'papayaWhip';
    ST_PresetColorVal[ST_PresetColorVal['peachPuff'] = 156] = 'peachPuff';
    ST_PresetColorVal[ST_PresetColorVal['peru'] = 157] = 'peru';
    ST_PresetColorVal[ST_PresetColorVal['pink'] = 158] = 'pink';
    ST_PresetColorVal[ST_PresetColorVal['plum'] = 159] = 'plum';
    ST_PresetColorVal[ST_PresetColorVal['powderBlue'] = 160] = 'powderBlue';
    ST_PresetColorVal[ST_PresetColorVal['purple'] = 161] = 'purple';
    ST_PresetColorVal[ST_PresetColorVal['red'] = 162] = 'red';
    ST_PresetColorVal[ST_PresetColorVal['rosyBrown'] = 163] = 'rosyBrown';
    ST_PresetColorVal[ST_PresetColorVal['royalBlue'] = 164] = 'royalBlue';
    ST_PresetColorVal[ST_PresetColorVal['saddleBrown'] = 165] = 'saddleBrown';
    ST_PresetColorVal[ST_PresetColorVal['salmon'] = 166] = 'salmon';
    ST_PresetColorVal[ST_PresetColorVal['sandyBrown'] = 167] = 'sandyBrown';
    ST_PresetColorVal[ST_PresetColorVal['seaGreen'] = 168] = 'seaGreen';
    ST_PresetColorVal[ST_PresetColorVal['seaShell'] = 169] = 'seaShell';
    ST_PresetColorVal[ST_PresetColorVal['sienna'] = 170] = 'sienna';
    ST_PresetColorVal[ST_PresetColorVal['silver'] = 171] = 'silver';
    ST_PresetColorVal[ST_PresetColorVal['skyBlue'] = 172] = 'skyBlue';
    ST_PresetColorVal[ST_PresetColorVal['slateBlue'] = 173] = 'slateBlue';
    ST_PresetColorVal[ST_PresetColorVal['slateGray'] = 174] = 'slateGray';
    ST_PresetColorVal[ST_PresetColorVal['slateGrey'] = 175] = 'slateGrey';
    ST_PresetColorVal[ST_PresetColorVal['snow'] = 176] = 'snow';
    ST_PresetColorVal[ST_PresetColorVal['springGreen'] = 177] = 'springGreen';
    ST_PresetColorVal[ST_PresetColorVal['steelBlue'] = 178] = 'steelBlue';
    ST_PresetColorVal[ST_PresetColorVal['tan'] = 179] = 'tan';
    ST_PresetColorVal[ST_PresetColorVal['teal'] = 180] = 'teal';
    ST_PresetColorVal[ST_PresetColorVal['thistle'] = 181] = 'thistle';
    ST_PresetColorVal[ST_PresetColorVal['tomato'] = 182] = 'tomato';
    ST_PresetColorVal[ST_PresetColorVal['turquoise'] = 183] = 'turquoise';
    ST_PresetColorVal[ST_PresetColorVal['violet'] = 184] = 'violet';
    ST_PresetColorVal[ST_PresetColorVal['wheat'] = 185] = 'wheat';
    ST_PresetColorVal[ST_PresetColorVal['white'] = 186] = 'white';
    ST_PresetColorVal[ST_PresetColorVal['whiteSmoke'] = 187] = 'whiteSmoke';
    ST_PresetColorVal[ST_PresetColorVal['yellow'] = 188] = 'yellow';
    ST_PresetColorVal[ST_PresetColorVal['yellowGreen'] = 189] = 'yellowGreen';
})(ST_PresetColorVal = exports.ST_PresetColorVal || (exports.ST_PresetColorVal = {}));
var ST_Grouping;
(function (ST_Grouping) {
    ST_Grouping[ST_Grouping['percentStacked'] = 0] = 'percentStacked';
    ST_Grouping[ST_Grouping['standard'] = 1] = 'standard';
    ST_Grouping[ST_Grouping['stacked'] = 2] = 'stacked';
})(ST_Grouping = exports.ST_Grouping || (exports.ST_Grouping = {}));
var ST_ScatterStyle;
(function (ST_ScatterStyle) {
    ST_ScatterStyle[ST_ScatterStyle['none'] = 0] = 'none';
    ST_ScatterStyle[ST_ScatterStyle['line'] = 1] = 'line';
    ST_ScatterStyle[ST_ScatterStyle['lineMarker'] = 2] = 'lineMarker';
    ST_ScatterStyle[ST_ScatterStyle['marker'] = 3] = 'marker';
    ST_ScatterStyle[ST_ScatterStyle['smooth'] = 4] = 'smooth';
    ST_ScatterStyle[ST_ScatterStyle['smoothMarker'] = 5] = 'smoothMarker';
})(ST_ScatterStyle = exports.ST_ScatterStyle || (exports.ST_ScatterStyle = {}));
var ST_RadarStyle;
(function (ST_RadarStyle) {
    ST_RadarStyle[ST_RadarStyle['standard'] = 0] = 'standard';
    ST_RadarStyle[ST_RadarStyle['marker'] = 1] = 'marker';
    ST_RadarStyle[ST_RadarStyle['filled'] = 2] = 'filled';
})(ST_RadarStyle = exports.ST_RadarStyle || (exports.ST_RadarStyle = {}));
var ST_BarGrouping;
(function (ST_BarGrouping) {
    ST_BarGrouping[ST_BarGrouping['percentStacked'] = 0] = 'percentStacked';
    ST_BarGrouping[ST_BarGrouping['clustered'] = 1] = 'clustered';
    ST_BarGrouping[ST_BarGrouping['standard'] = 2] = 'standard';
    ST_BarGrouping[ST_BarGrouping['stacked'] = 3] = 'stacked';
})(ST_BarGrouping = exports.ST_BarGrouping || (exports.ST_BarGrouping = {}));
var ST_BarDir;
(function (ST_BarDir) {
    ST_BarDir[ST_BarDir['bar'] = 0] = 'bar';
    ST_BarDir[ST_BarDir['col'] = 1] = 'col';
})(ST_BarDir = exports.ST_BarDir || (exports.ST_BarDir = {}));
var ST_OfPieType;
(function (ST_OfPieType) {
    ST_OfPieType[ST_OfPieType['pie'] = 0] = 'pie';
    ST_OfPieType[ST_OfPieType['bar'] = 1] = 'bar';
})(ST_OfPieType = exports.ST_OfPieType || (exports.ST_OfPieType = {}));
var ST_AxPos;
(function (ST_AxPos) {
    ST_AxPos[ST_AxPos['b'] = 0] = 'b';
    ST_AxPos[ST_AxPos['l'] = 1] = 'l';
    ST_AxPos[ST_AxPos['r'] = 2] = 'r';
    ST_AxPos[ST_AxPos['t'] = 3] = 't';
})(ST_AxPos = exports.ST_AxPos || (exports.ST_AxPos = {}));
var ShadowEffectType;
(function (ShadowEffectType) {
    ShadowEffectType[ShadowEffectType['OuterShadowEffect'] = 0] = 'OuterShadowEffect';
    ShadowEffectType[ShadowEffectType['InnerShadowEffect'] = 1] = 'InnerShadowEffect';
    ShadowEffectType[ShadowEffectType['PresetShadowEffect'] = 2] = 'PresetShadowEffect';
})(ShadowEffectType = exports.ShadowEffectType || (exports.ShadowEffectType = {}));
var SeriesType;
(function (SeriesType) {
    SeriesType[SeriesType['BarSer'] = 0] = 'BarSer';
    SeriesType[SeriesType['AreaSer'] = 1] = 'AreaSer';
    SeriesType[SeriesType['LineSer'] = 2] = 'LineSer';
    SeriesType[SeriesType['PieSer'] = 3] = 'PieSer';
    SeriesType[SeriesType['RadarSer'] = 4] = 'RadarSer';
    SeriesType[SeriesType['ScatterSer'] = 5] = 'ScatterSer';
    SeriesType[SeriesType['BubbleSer'] = 6] = 'BubbleSer';
    SeriesType[SeriesType['SurfaceSer'] = 7] = 'SurfaceSer';
    SeriesType[SeriesType['boxWhisker'] = 16] = 'boxWhisker';
    SeriesType[SeriesType['funnel'] = 17] = 'funnel';
    SeriesType[SeriesType['paretoLine'] = 18] = 'paretoLine';
    SeriesType[SeriesType['regionMap'] = 19] = 'regionMap';
    SeriesType[SeriesType['sunburst'] = 20] = 'sunburst';
    SeriesType[SeriesType['treemap'] = 21] = 'treemap';
    SeriesType[SeriesType['waterfall'] = 22] = 'waterfall';
    SeriesType[SeriesType['clusteredColumn'] = 23] = 'clusteredColumn';
})(SeriesType = exports.SeriesType || (exports.SeriesType = {}));
var ExtDataType;
(function (ExtDataType) {
    ExtDataType[ExtDataType['InvertSolidFillFmt'] = 0] = 'InvertSolidFillFmt';
    ExtDataType[ExtDataType['SeriesDataLabelsRange'] = 1] = 'SeriesDataLabelsRange';
    ExtDataType[ExtDataType['ChartDispNaAsBlank'] = 2] = 'ChartDispNaAsBlank';
})(ExtDataType = exports.ExtDataType || (exports.ExtDataType = {}));
var TextParagraphElementType;
(function (TextParagraphElementType) {
    TextParagraphElementType[TextParagraphElementType['RegularTextRun'] = 0] = 'RegularTextRun';
    TextParagraphElementType[TextParagraphElementType['TextLineBreak'] = 1] = 'TextLineBreak';
    TextParagraphElementType[TextParagraphElementType['TextField'] = 2] = 'TextField';
})(TextParagraphElementType = exports.TextParagraphElementType || (exports.TextParagraphElementType = {}));
var StyleDataFlag;
(function (StyleDataFlag) {
    StyleDataFlag[StyleDataFlag['None'] = 0] = 'None';
    StyleDataFlag[StyleDataFlag['Font'] = 1] = 'Font';
    StyleDataFlag[StyleDataFlag['Fill'] = 2] = 'Fill';
    StyleDataFlag[StyleDataFlag['Border'] = 4] = 'Border';
    StyleDataFlag[StyleDataFlag['Alignment'] = 8] = 'Alignment';
    StyleDataFlag[StyleDataFlag['Protection'] = 16] = 'Protection';
    StyleDataFlag[StyleDataFlag['FormatCode'] = 32] = 'FormatCode';
    StyleDataFlag[StyleDataFlag['All'] = 63] = 'All';
})(StyleDataFlag = exports.StyleDataFlag || (exports.StyleDataFlag = {}));


var ColorSchemeIndex;
(function (ColorSchemeIndex) {
    ColorSchemeIndex[ColorSchemeIndex['None'] = -4142] = 'None';


    ColorSchemeIndex[ColorSchemeIndex['LT1'] = 0] = 'LT1';


    ColorSchemeIndex[ColorSchemeIndex['DK1'] = 1] = 'DK1';


    ColorSchemeIndex[ColorSchemeIndex['LT2'] = 2] = 'LT2';


    ColorSchemeIndex[ColorSchemeIndex['DK2'] = 3] = 'DK2';


    ColorSchemeIndex[ColorSchemeIndex['Accent1'] = 4] = 'Accent1';


    ColorSchemeIndex[ColorSchemeIndex['Accent2'] = 5] = 'Accent2';


    ColorSchemeIndex[ColorSchemeIndex['Accent3'] = 6] = 'Accent3';


    ColorSchemeIndex[ColorSchemeIndex['Accent4'] = 7] = 'Accent4';


    ColorSchemeIndex[ColorSchemeIndex['Accent5'] = 8] = 'Accent5';


    ColorSchemeIndex[ColorSchemeIndex['Accent6'] = 9] = 'Accent6';


    ColorSchemeIndex[ColorSchemeIndex['Hlink'] = 10] = 'Hlink';


    ColorSchemeIndex[ColorSchemeIndex['FolHlink'] = 11] = 'FolHlink';
})(ColorSchemeIndex = exports.ColorSchemeIndex || (exports.ColorSchemeIndex = {}));
var ThemeFont;
(function (ThemeFont) {
    ThemeFont[ThemeFont['None'] = 0] = 'None';
    ThemeFont[ThemeFont['Major'] = 1] = 'Major';
    ThemeFont[ThemeFont['Minor'] = 2] = 'Minor';
})(ThemeFont = exports.ThemeFont || (exports.ThemeFont = {}));
var ReferenceKind;
(function (ReferenceKind) {
    ReferenceKind[ReferenceKind['Empty'] = 0] = 'Empty';
    ReferenceKind[ReferenceKind['Row'] = 1] = 'Row';
    ReferenceKind[ReferenceKind['Column'] = 2] = 'Column';
    ReferenceKind[ReferenceKind['RowIsRelative'] = 4] = 'RowIsRelative';
    ReferenceKind[ReferenceKind['ColumnIsRelative'] = 8] = 'ColumnIsRelative';
    ReferenceKind[ReferenceKind['LastRowIsRelative'] = 16] = 'LastRowIsRelative';
    ReferenceKind[ReferenceKind['LastColumnIsRelative'] = 32] = 'LastColumnIsRelative';
    ReferenceKind[ReferenceKind['Range'] = 64] = 'Range';
    ReferenceKind[ReferenceKind['Error'] = 128] = 'Error';
})(ReferenceKind = exports.ReferenceKind || (exports.ReferenceKind = {}));
var DrawingType;
(function (DrawingType) {
    DrawingType[DrawingType['Shape'] = 0] = 'Shape';
    DrawingType[DrawingType['Chart'] = 1] = 'Chart';
    DrawingType[DrawingType['Picture'] = 2] = 'Picture';
    DrawingType[DrawingType['Connector'] = 3] = 'Connector';
    DrawingType[DrawingType['GroupShape'] = 4] = 'GroupShape';
})(DrawingType = exports.DrawingType || (exports.DrawingType = {}));
var TextureAlignment;
(function (TextureAlignment) {
    TextureAlignment[TextureAlignment['TextureTopLeft'] = 0] = 'TextureTopLeft';

    TextureAlignment[TextureAlignment['TextureTop'] = 1] = 'TextureTop';

    TextureAlignment[TextureAlignment['TextureTopRight'] = 2] = 'TextureTopRight';

    TextureAlignment[TextureAlignment['TextureLeft'] = 3] = 'TextureLeft';

    TextureAlignment[TextureAlignment['TextureCenter'] = 4] = 'TextureCenter';

    TextureAlignment[TextureAlignment['TextureRight'] = 5] = 'TextureRight';

    TextureAlignment[TextureAlignment['TextureBottomLeft'] = 6] = 'TextureBottomLeft';

    TextureAlignment[TextureAlignment['TextureBottom'] = 7] = 'TextureBottom';

    TextureAlignment[TextureAlignment['TextureBottomRight'] = 8] = 'TextureBottomRight';
})(TextureAlignment = exports.TextureAlignment || (exports.TextureAlignment = {}));
var TextureFlipType;
(function (TextureFlipType) {
    TextureFlipType[TextureFlipType['None'] = 0] = 'None';
    TextureFlipType[TextureFlipType['Horizontal'] = 1] = 'Horizontal';
    TextureFlipType[TextureFlipType['Vertical'] = 2] = 'Vertical';
    TextureFlipType[TextureFlipType['Both'] = 3] = 'Both';
})(TextureFlipType = exports.TextureFlipType || (exports.TextureFlipType = {}));


var TextureType;
(function (TextureType) {
    TextureType[TextureType['TextureTypeNone'] = 0] = 'TextureTypeNone';


    TextureType[TextureType['TexturePreset'] = 1] = 'TexturePreset';


    TextureType[TextureType['TextureUserDefined'] = 2] = 'TextureUserDefined';
})(TextureType = exports.TextureType || (exports.TextureType = {}));


var FillType;
(function (FillType) {
    FillType[FillType['Solid'] = 0] = 'Solid';


    FillType[FillType['Patterned'] = 1] = 'Patterned';


    FillType[FillType['Gradient'] = 2] = 'Gradient';


    FillType[FillType['Textured'] = 3] = 'Textured';


    FillType[FillType['Background'] = 4] = 'Background';


    FillType[FillType['Picture'] = 5] = 'Picture';


    FillType[FillType['Group'] = 6] = 'Group';
})(FillType = exports.FillType || (exports.FillType = {}));


var PresetGradientType;
(function (PresetGradientType) {
    PresetGradientType[PresetGradientType['GradientEarlySunset'] = 0] = 'GradientEarlySunset';


    PresetGradientType[PresetGradientType['GradientLateSunset'] = 1] = 'GradientLateSunset';


    PresetGradientType[PresetGradientType['GradientNightfall'] = 2] = 'GradientNightfall';


    PresetGradientType[PresetGradientType['GradientDaybreak'] = 3] = 'GradientDaybreak';


    PresetGradientType[PresetGradientType['GradientHorizon'] = 4] = 'GradientHorizon';


    PresetGradientType[PresetGradientType['GradientDesert'] = 5] = 'GradientDesert';


    PresetGradientType[PresetGradientType['GradientOcean'] = 6] = 'GradientOcean';


    PresetGradientType[PresetGradientType['GradientCalmWater'] = 7] = 'GradientCalmWater';


    PresetGradientType[PresetGradientType['GradientFire'] = 8] = 'GradientFire';


    PresetGradientType[PresetGradientType['GradientFog'] = 9] = 'GradientFog';


    PresetGradientType[PresetGradientType['GradientMoss'] = 10] = 'GradientMoss';


    PresetGradientType[PresetGradientType['GradientPeacock'] = 11] = 'GradientPeacock';


    PresetGradientType[PresetGradientType['GradientWheat'] = 12] = 'GradientWheat';


    PresetGradientType[PresetGradientType['GradientParchment'] = 13] = 'GradientParchment';


    PresetGradientType[PresetGradientType['GradientMahogany'] = 14] = 'GradientMahogany';


    PresetGradientType[PresetGradientType['GradientRainbow'] = 15] = 'GradientRainbow';


    PresetGradientType[PresetGradientType['GradientRainbowII'] = 16] = 'GradientRainbowII';


    PresetGradientType[PresetGradientType['GradientGold'] = 17] = 'GradientGold';


    PresetGradientType[PresetGradientType['GradientGoldII'] = 18] = 'GradientGoldII';


    PresetGradientType[PresetGradientType['GradientBrass'] = 19] = 'GradientBrass';


    PresetGradientType[PresetGradientType['GradientChrome'] = 20] = 'GradientChrome';


    PresetGradientType[PresetGradientType['GradientChromeII'] = 21] = 'GradientChromeII';


    PresetGradientType[PresetGradientType['GradientSilver'] = 22] = 'GradientSilver';


    PresetGradientType[PresetGradientType['GradientSapphire'] = 23] = 'GradientSapphire';
})(PresetGradientType = exports.PresetGradientType || (exports.PresetGradientType = {}));


var PresetTexture;
(function (PresetTexture) {
    PresetTexture[PresetTexture['TexturePapyrus'] = 0] = 'TexturePapyrus';


    PresetTexture[PresetTexture['TextureCanvas'] = 1] = 'TextureCanvas';


    PresetTexture[PresetTexture['TextureDenim'] = 2] = 'TextureDenim';


    PresetTexture[PresetTexture['TextureWovenMat'] = 3] = 'TextureWovenMat';


    PresetTexture[PresetTexture['TextureWaterDroplets'] = 4] = 'TextureWaterDroplets';


    PresetTexture[PresetTexture['TexturePaperBag'] = 5] = 'TexturePaperBag';


    PresetTexture[PresetTexture['TextureFishFossil'] = 6] = 'TextureFishFossil';


    PresetTexture[PresetTexture['TextureSand'] = 7] = 'TextureSand';


    PresetTexture[PresetTexture['TextureGreenMarble'] = 8] = 'TextureGreenMarble';


    PresetTexture[PresetTexture['TextureWhiteMarble'] = 9] = 'TextureWhiteMarble';


    PresetTexture[PresetTexture['TextureBrownMarble'] = 10] = 'TextureBrownMarble';


    PresetTexture[PresetTexture['TextureGranite'] = 11] = 'TextureGranite';


    PresetTexture[PresetTexture['TextureNewsprint'] = 12] = 'TextureNewsprint';


    PresetTexture[PresetTexture['TextureRecycledPaper'] = 13] = 'TextureRecycledPaper';


    PresetTexture[PresetTexture['TextureParchment'] = 14] = 'TextureParchment';


    PresetTexture[PresetTexture['TextureStationery'] = 15] = 'TextureStationery';


    PresetTexture[PresetTexture['TextureBlueTissuePaper'] = 16] = 'TextureBlueTissuePaper';


    PresetTexture[PresetTexture['TexturePinkTissuePaper'] = 17] = 'TexturePinkTissuePaper';


    PresetTexture[PresetTexture['TexturePurpleMesh'] = 18] = 'TexturePurpleMesh';


    PresetTexture[PresetTexture['TextureBouquet'] = 19] = 'TextureBouquet';


    PresetTexture[PresetTexture['TextureCork'] = 20] = 'TextureCork';


    PresetTexture[PresetTexture['TextureWalnut'] = 21] = 'TextureWalnut';


    PresetTexture[PresetTexture['TextureOak'] = 22] = 'TextureOak';


    PresetTexture[PresetTexture['TextureMediumWood'] = 23] = 'TextureMediumWood';
})(PresetTexture = exports.PresetTexture || (exports.PresetTexture = {}));


var GradientColorType;
(function (GradientColorType) {
    GradientColorType[GradientColorType['GradientColorNone'] = 0] = 'GradientColorNone';


    GradientColorType[GradientColorType['GradientOneColor'] = 1] = 'GradientOneColor';


    GradientColorType[GradientColorType['GradientTwoColors'] = 2] = 'GradientTwoColors';


    GradientColorType[GradientColorType['GradientPresetColors'] = 3] = 'GradientPresetColors';

    GradientColorType[GradientColorType['GradientMultiColor'] = 4] = 'GradientMultiColor';
})(GradientColorType = exports.GradientColorType || (exports.GradientColorType = {}));


var PatternType;
(function (PatternType) {
    PatternType[PatternType['none'] = 0] = 'none';

    PatternType[PatternType['dottedPercent5'] = 1] = 'dottedPercent5';

    PatternType[PatternType['dottedPercent10'] = 2] = 'dottedPercent10';

    PatternType[PatternType['dottedPercent20'] = 3] = 'dottedPercent20';

    PatternType[PatternType['dottedPercent25'] = 4] = 'dottedPercent25';

    PatternType[PatternType['dottedPercent30'] = 5] = 'dottedPercent30';

    PatternType[PatternType['dottedPercent40'] = 6] = 'dottedPercent40';

    PatternType[PatternType['dottedPercent50'] = 7] = 'dottedPercent50';

    PatternType[PatternType['dottedPercent60'] = 8] = 'dottedPercent60';

    PatternType[PatternType['dottedPercent70'] = 9] = 'dottedPercent70';

    PatternType[PatternType['dottedPercent75'] = 10] = 'dottedPercent75';

    PatternType[PatternType['dottedPercent80'] = 11] = 'dottedPercent80';

    PatternType[PatternType['dottedPercent90'] = 12] = 'dottedPercent90';

    PatternType[PatternType['darkHorizontal'] = 13] = 'darkHorizontal';

    PatternType[PatternType['darkVertical'] = 14] = 'darkVertical';

    PatternType[PatternType['darkDownwardDiagonal'] = 15] = 'darkDownwardDiagonal';

    PatternType[PatternType['darkUpwardDiagonal'] = 16] = 'darkUpwardDiagonal';

    PatternType[PatternType['smallCheckerBoard'] = 17] = 'smallCheckerBoard';

    PatternType[PatternType['trellis'] = 18] = 'trellis';

    PatternType[PatternType['lightHorizontal'] = 19] = 'lightHorizontal';

    PatternType[PatternType['lightVertical'] = 20] = 'lightVertical';

    PatternType[PatternType['lightDownwardDiagonal'] = 21] = 'lightDownwardDiagonal';

    PatternType[PatternType['lightUpwardDiagonal'] = 22] = 'lightUpwardDiagonal';

    PatternType[PatternType['smallGrid'] = 23] = 'smallGrid';

    PatternType[PatternType['dottedDiamond'] = 24] = 'dottedDiamond';

    PatternType[PatternType['wideDownwardDiagonal'] = 25] = 'wideDownwardDiagonal';

    PatternType[PatternType['wideUpwardDiagonal'] = 26] = 'wideUpwardDiagonal';

    PatternType[PatternType['dashedUpwardDiagonal'] = 27] = 'dashedUpwardDiagonal';

    PatternType[PatternType['dashedDownwardDiagonal'] = 28] = 'dashedDownwardDiagonal';

    PatternType[PatternType['narrowVertical'] = 29] = 'narrowVertical';

    PatternType[PatternType['narrowHorizontal'] = 30] = 'narrowHorizontal';

    PatternType[PatternType['dashedVertical'] = 31] = 'dashedVertical';

    PatternType[PatternType['dashedHorizontal'] = 32] = 'dashedHorizontal';

    PatternType[PatternType['largeConfetti'] = 33] = 'largeConfetti';

    PatternType[PatternType['largeGrid'] = 34] = 'largeGrid';

    PatternType[PatternType['horizontalBrick'] = 35] = 'horizontalBrick';

    PatternType[PatternType['largeCheckerBoard'] = 36] = 'largeCheckerBoard';

    PatternType[PatternType['smallConfetti'] = 37] = 'smallConfetti';

    PatternType[PatternType['zigZag'] = 38] = 'zigZag';

    PatternType[PatternType['solidDiamond'] = 39] = 'solidDiamond';

    PatternType[PatternType['diagonalBrick'] = 40] = 'diagonalBrick';

    PatternType[PatternType['outlinedDiamond'] = 41] = 'outlinedDiamond';

    PatternType[PatternType['plaid'] = 42] = 'plaid';

    PatternType[PatternType['sphere'] = 43] = 'sphere';

    PatternType[PatternType['weave'] = 44] = 'weave';

    PatternType[PatternType['dottedGrid'] = 45] = 'dottedGrid';

    PatternType[PatternType['divot'] = 46] = 'divot';

    PatternType[PatternType['shingle'] = 47] = 'shingle';

    PatternType[PatternType['wave'] = 48] = 'wave';
})(PatternType = exports.PatternType || (exports.PatternType = {}));


var GradientStyle;
(function (GradientStyle) {
    GradientStyle[GradientStyle['GradientHorizontal'] = 0] = 'GradientHorizontal';


    GradientStyle[GradientStyle['GradientVertical'] = 1] = 'GradientVertical';


    GradientStyle[GradientStyle['GradientDiagonalUp'] = 2] = 'GradientDiagonalUp';


    GradientStyle[GradientStyle['GradientDiagonalDown'] = 3] = 'GradientDiagonalDown';


    GradientStyle[GradientStyle['GradientFromCorner'] = 4] = 'GradientFromCorner';


    GradientStyle[GradientStyle['GradientFromTitle'] = 5] = 'GradientFromTitle';


    GradientStyle[GradientStyle['GradientFromCenter'] = 6] = 'GradientFromCenter';


    GradientStyle[GradientStyle['GradientTopSpotlight'] = 7] = 'GradientTopSpotlight';


    GradientStyle[GradientStyle['GradientBottomSpotlight'] = 8] = 'GradientBottomSpotlight';
})(GradientStyle = exports.GradientStyle || (exports.GradientStyle = {}));


var ArrowheadLength;
(function (ArrowheadLength) {
    ArrowheadLength[ArrowheadLength['short'] = 0] = 'short';


    ArrowheadLength[ArrowheadLength['medium'] = 1] = 'medium';


    ArrowheadLength[ArrowheadLength['long'] = 2] = 'long';
})(ArrowheadLength = exports.ArrowheadLength || (exports.ArrowheadLength = {}));


var ArrowheadStyle;
(function (ArrowheadStyle) {
    ArrowheadStyle[ArrowheadStyle['none'] = 0] = 'none';


    ArrowheadStyle[ArrowheadStyle['triangle'] = 1] = 'triangle';


    ArrowheadStyle[ArrowheadStyle['stealth'] = 2] = 'stealth';


    ArrowheadStyle[ArrowheadStyle['diamond'] = 3] = 'diamond';


    ArrowheadStyle[ArrowheadStyle['oval'] = 4] = 'oval';


    ArrowheadStyle[ArrowheadStyle['open'] = 5] = 'open';
})(ArrowheadStyle = exports.ArrowheadStyle || (exports.ArrowheadStyle = {}));


var ArrowheadWidth;
(function (ArrowheadWidth) {
    ArrowheadWidth[ArrowheadWidth['narrow'] = 0] = 'narrow';


    ArrowheadWidth[ArrowheadWidth['medium'] = 1] = 'medium';


    ArrowheadWidth[ArrowheadWidth['wide'] = 2] = 'wide';
})(ArrowheadWidth = exports.ArrowheadWidth || (exports.ArrowheadWidth = {}));


var LineDashStyle;
(function (LineDashStyle) {
    LineDashStyle[LineDashStyle['solid'] = 0] = 'solid';


    LineDashStyle[LineDashStyle['squareDot'] = 1] = 'squareDot';


    LineDashStyle[LineDashStyle['dash'] = 2] = 'dash';


    LineDashStyle[LineDashStyle['longDash'] = 3] = 'longDash';


    LineDashStyle[LineDashStyle['dashDot'] = 4] = 'dashDot';


    LineDashStyle[LineDashStyle['longDashDot'] = 5] = 'longDashDot';

    LineDashStyle[LineDashStyle['longDashDotDot'] = 6] = 'longDashDotDot';

    LineDashStyle[LineDashStyle['sysDash'] = 7] = 'sysDash';

    LineDashStyle[LineDashStyle['sysDot'] = 8] = 'sysDot';

    LineDashStyle[LineDashStyle['sysDashDot'] = 9] = 'sysDashDot';


    LineDashStyle[LineDashStyle['dashDotDot'] = 10] = 'dashDotDot';


    LineDashStyle[LineDashStyle['roundDot'] = 11] = 'roundDot';
})(LineDashStyle = exports.LineDashStyle || (exports.LineDashStyle = {}));


var LineCapStyle;
(function (LineCapStyle) {
    LineCapStyle[LineCapStyle['flat'] = 2] = 'flat';


    LineCapStyle[LineCapStyle['square'] = 1] = 'square';


    LineCapStyle[LineCapStyle['round'] = 0] = 'round';
})(LineCapStyle = exports.LineCapStyle || (exports.LineCapStyle = {}));


var LineJoinStyle;
(function (LineJoinStyle) {
    LineJoinStyle[LineJoinStyle['round'] = 0] = 'round';


    LineJoinStyle[LineJoinStyle['miter'] = 1] = 'miter';


    LineJoinStyle[LineJoinStyle['bevel'] = 2] = 'bevel';
})(LineJoinStyle = exports.LineJoinStyle || (exports.LineJoinStyle = {}));


var LineStyle;
(function (LineStyle) {
    LineStyle[LineStyle['LineSingle'] = 0] = 'LineSingle';


    LineStyle[LineStyle['LineThinThin'] = 1] = 'LineThinThin';


    LineStyle[LineStyle['LineThinThick'] = 2] = 'LineThinThick';


    LineStyle[LineStyle['LineThickThin'] = 3] = 'LineThickThin';


    LineStyle[LineStyle['LineThickBetweenThin'] = 4] = 'LineThickBetweenThin';
})(LineStyle = exports.LineStyle || (exports.LineStyle = {}));


var PictureColorType;
(function (PictureColorType) {
    PictureColorType[PictureColorType['PictureAutomatic'] = 0] = 'PictureAutomatic';


    PictureColorType[PictureColorType['PictureGrayscale'] = 1] = 'PictureGrayscale';


    PictureColorType[PictureColorType['PictureBlackAndWhite'] = 2] = 'PictureBlackAndWhite';


    PictureColorType[PictureColorType['PictureWatermark'] = 3] = 'PictureWatermark';
})(PictureColorType = exports.PictureColorType || (exports.PictureColorType = {}));


var ShadowType;
(function (ShadowType) {
    ShadowType[ShadowType['Shadow1'] = 0] = 'Shadow1';


    ShadowType[ShadowType['Shadow2'] = 1] = 'Shadow2';


    ShadowType[ShadowType['Shadow3'] = 2] = 'Shadow3';


    ShadowType[ShadowType['Shadow4'] = 3] = 'Shadow4';


    ShadowType[ShadowType['Shadow5'] = 4] = 'Shadow5';


    ShadowType[ShadowType['Shadow6'] = 5] = 'Shadow6';


    ShadowType[ShadowType['Shadow7'] = 6] = 'Shadow7';


    ShadowType[ShadowType['Shadow8'] = 7] = 'Shadow8';


    ShadowType[ShadowType['Shadow9'] = 8] = 'Shadow9';


    ShadowType[ShadowType['Shadow10'] = 9] = 'Shadow10';


    ShadowType[ShadowType['Shadow11'] = 10] = 'Shadow11';


    ShadowType[ShadowType['Shadow12'] = 11] = 'Shadow12';


    ShadowType[ShadowType['Shadow13'] = 12] = 'Shadow13';


    ShadowType[ShadowType['Shadow14'] = 13] = 'Shadow14';


    ShadowType[ShadowType['Shadow15'] = 14] = 'Shadow15';


    ShadowType[ShadowType['Shadow16'] = 15] = 'Shadow16';


    ShadowType[ShadowType['Shadow17'] = 16] = 'Shadow17';


    ShadowType[ShadowType['Shadow18'] = 17] = 'Shadow18';


    ShadowType[ShadowType['Shadow19'] = 18] = 'Shadow19';


    ShadowType[ShadowType['Shadow20'] = 19] = 'Shadow20';


    ShadowType[ShadowType['Shadow21'] = 20] = 'Shadow21';


    ShadowType[ShadowType['Shadow22'] = 21] = 'Shadow22';


    ShadowType[ShadowType['Shadow23'] = 22] = 'Shadow23';


    ShadowType[ShadowType['Shadow24'] = 23] = 'Shadow24';


    ShadowType[ShadowType['Shadow25'] = 24] = 'Shadow25';


    ShadowType[ShadowType['Shadow26'] = 25] = 'Shadow26';


    ShadowType[ShadowType['Shadow27'] = 26] = 'Shadow27';


    ShadowType[ShadowType['Shadow28'] = 27] = 'Shadow28';


    ShadowType[ShadowType['Shadow29'] = 28] = 'Shadow29';


    ShadowType[ShadowType['Shadow30'] = 29] = 'Shadow30';


    ShadowType[ShadowType['Shadow31'] = 30] = 'Shadow31';


    ShadowType[ShadowType['Shadow32'] = 31] = 'Shadow32';


    ShadowType[ShadowType['Shadow33'] = 32] = 'Shadow33';


    ShadowType[ShadowType['Shadow34'] = 33] = 'Shadow34';


    ShadowType[ShadowType['Shadow35'] = 34] = 'Shadow35';


    ShadowType[ShadowType['Shadow36'] = 35] = 'Shadow36';


    ShadowType[ShadowType['Shadow37'] = 36] = 'Shadow37';


    ShadowType[ShadowType['Shadow38'] = 37] = 'Shadow38';


    ShadowType[ShadowType['Shadow39'] = 38] = 'Shadow39';


    ShadowType[ShadowType['Shadow40'] = 39] = 'Shadow40';


    ShadowType[ShadowType['Shadow41'] = 40] = 'Shadow41';


    ShadowType[ShadowType['Shadow42'] = 41] = 'Shadow42';


    ShadowType[ShadowType['Shadow43'] = 42] = 'Shadow43';
})(ShadowType = exports.ShadowType || (exports.ShadowType = {}));


var ShadowStyle;
(function (ShadowStyle) {
    ShadowStyle[ShadowStyle['ShadowStyleInnerShadow'] = 0] = 'ShadowStyleInnerShadow';


    ShadowStyle[ShadowStyle['ShadowStyleOuterShadow'] = 1] = 'ShadowStyleOuterShadow';
})(ShadowStyle = exports.ShadowStyle || (exports.ShadowStyle = {}));


var SoftEdgeType;
(function (SoftEdgeType) {
    SoftEdgeType[SoftEdgeType['SoftEdgeTypeNone'] = 0] = 'SoftEdgeTypeNone';


    SoftEdgeType[SoftEdgeType['SoftEdgeType1'] = 1] = 'SoftEdgeType1';


    SoftEdgeType[SoftEdgeType['SoftEdgeType2'] = 2] = 'SoftEdgeType2';


    SoftEdgeType[SoftEdgeType['SoftEdgeType3'] = 3] = 'SoftEdgeType3';


    SoftEdgeType[SoftEdgeType['SoftEdgeType4'] = 4] = 'SoftEdgeType4';


    SoftEdgeType[SoftEdgeType['SoftEdgeType5'] = 5] = 'SoftEdgeType5';


    SoftEdgeType[SoftEdgeType['SoftEdgeType6'] = 6] = 'SoftEdgeType6';
})(SoftEdgeType = exports.SoftEdgeType || (exports.SoftEdgeType = {}));


var PresetCamera;
(function (PresetCamera) {
    PresetCamera[PresetCamera['CameraLegacyObliqueTopLeft'] = 0] = 'CameraLegacyObliqueTopLeft';


    PresetCamera[PresetCamera['CameraLegacyObliqueTop'] = 1] = 'CameraLegacyObliqueTop';


    PresetCamera[PresetCamera['CameraLegacyObliqueTopRight'] = 2] = 'CameraLegacyObliqueTopRight';


    PresetCamera[PresetCamera['CameraLegacyObliqueLeft'] = 3] = 'CameraLegacyObliqueLeft';


    PresetCamera[PresetCamera['CameraLegacyObliqueFront'] = 4] = 'CameraLegacyObliqueFront';


    PresetCamera[PresetCamera['CameraLegacyObliqueRight'] = 5] = 'CameraLegacyObliqueRight';


    PresetCamera[PresetCamera['CameraLegacyObliqueBottomLeft'] = 6] = 'CameraLegacyObliqueBottomLeft';


    PresetCamera[PresetCamera['CameraLegacyObliqueBottom'] = 7] = 'CameraLegacyObliqueBottom';


    PresetCamera[PresetCamera['CameraLegacyObliqueBottomRight'] = 8] = 'CameraLegacyObliqueBottomRight';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveTopLeft'] = 9] = 'CameraLegacyPerspectiveTopLeft';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveTop'] = 10] = 'CameraLegacyPerspectiveTop';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveTopRight'] = 11] = 'CameraLegacyPerspectiveTopRight';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveLeft'] = 12] = 'CameraLegacyPerspectiveLeft';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveFront'] = 13] = 'CameraLegacyPerspectiveFront';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveRight'] = 14] = 'CameraLegacyPerspectiveRight';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveBottomLeft'] = 15] = 'CameraLegacyPerspectiveBottomLeft';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveBottom'] = 16] = 'CameraLegacyPerspectiveBottom';


    PresetCamera[PresetCamera['CameraLegacyPerspectiveBottomRight'] = 17] = 'CameraLegacyPerspectiveBottomRight';


    PresetCamera[PresetCamera['CameraOrthographicFront'] = 18] = 'CameraOrthographicFront';


    PresetCamera[PresetCamera['CameraIsometricTopUp'] = 19] = 'CameraIsometricTopUp';


    PresetCamera[PresetCamera['CameraIsometricTopDown'] = 20] = 'CameraIsometricTopDown';


    PresetCamera[PresetCamera['CameraIsometricBottomUp'] = 21] = 'CameraIsometricBottomUp';


    PresetCamera[PresetCamera['CameraIsometricBottomDown'] = 22] = 'CameraIsometricBottomDown';


    PresetCamera[PresetCamera['CameraIsometricLeftUp'] = 23] = 'CameraIsometricLeftUp';


    PresetCamera[PresetCamera['CameraIsometricLeftDown'] = 24] = 'CameraIsometricLeftDown';


    PresetCamera[PresetCamera['CameraIsometricRightUp'] = 25] = 'CameraIsometricRightUp';


    PresetCamera[PresetCamera['CameraIsometricRightDown'] = 26] = 'CameraIsometricRightDown';


    PresetCamera[PresetCamera['CameraIsometricOffAxis1Left'] = 27] = 'CameraIsometricOffAxis1Left';


    PresetCamera[PresetCamera['CameraIsometricOffAxis1Right'] = 28] = 'CameraIsometricOffAxis1Right';


    PresetCamera[PresetCamera['CameraIsometricOffAxis1Top'] = 29] = 'CameraIsometricOffAxis1Top';


    PresetCamera[PresetCamera['CameraIsometricOffAxis2Left'] = 30] = 'CameraIsometricOffAxis2Left';


    PresetCamera[PresetCamera['CameraIsometricOffAxis2Right'] = 31] = 'CameraIsometricOffAxis2Right';


    PresetCamera[PresetCamera['CameraIsometricOffAxis2Top'] = 32] = 'CameraIsometricOffAxis2Top';


    PresetCamera[PresetCamera['CameraIsometricOffAxis3Left'] = 33] = 'CameraIsometricOffAxis3Left';


    PresetCamera[PresetCamera['CameraIsometricOffAxis3Right'] = 34] = 'CameraIsometricOffAxis3Right';


    PresetCamera[PresetCamera['CameraIsometricOffAxis3Bottom'] = 35] = 'CameraIsometricOffAxis3Bottom';


    PresetCamera[PresetCamera['CameraIsometricOffAxis4Left'] = 36] = 'CameraIsometricOffAxis4Left';


    PresetCamera[PresetCamera['CameraIsometricOffAxis4Right'] = 37] = 'CameraIsometricOffAxis4Right';


    PresetCamera[PresetCamera['CameraIsometricOffAxis4Bottom'] = 38] = 'CameraIsometricOffAxis4Bottom';


    PresetCamera[PresetCamera['CameraObliqueTopLeft'] = 39] = 'CameraObliqueTopLeft';


    PresetCamera[PresetCamera['CameraObliqueTop'] = 40] = 'CameraObliqueTop';


    PresetCamera[PresetCamera['CameraObliqueTopRight'] = 41] = 'CameraObliqueTopRight';


    PresetCamera[PresetCamera['CameraObliqueLeft'] = 42] = 'CameraObliqueLeft';


    PresetCamera[PresetCamera['CameraObliqueRight'] = 43] = 'CameraObliqueRight';


    PresetCamera[PresetCamera['CameraObliqueBottomLeft'] = 44] = 'CameraObliqueBottomLeft';


    PresetCamera[PresetCamera['CameraObliqueBottom'] = 45] = 'CameraObliqueBottom';


    PresetCamera[PresetCamera['CameraObliqueBottomRight'] = 46] = 'CameraObliqueBottomRight';


    PresetCamera[PresetCamera['CameraPerspectiveFront'] = 47] = 'CameraPerspectiveFront';


    PresetCamera[PresetCamera['CameraPerspectiveLeft'] = 48] = 'CameraPerspectiveLeft';


    PresetCamera[PresetCamera['CameraPerspectiveRight'] = 49] = 'CameraPerspectiveRight';


    PresetCamera[PresetCamera['CameraPerspectiveAbove'] = 50] = 'CameraPerspectiveAbove';


    PresetCamera[PresetCamera['CameraPerspectiveBelow'] = 51] = 'CameraPerspectiveBelow';


    PresetCamera[PresetCamera['CameraPerspectiveAboveLeftFacing'] = 52] = 'CameraPerspectiveAboveLeftFacing';


    PresetCamera[PresetCamera['CameraPerspectiveAboveRightFacing'] = 53] = 'CameraPerspectiveAboveRightFacing';


    PresetCamera[PresetCamera['CameraPerspectiveContrastingLeftFacing'] = 54] = 'CameraPerspectiveContrastingLeftFacing';


    PresetCamera[PresetCamera['CameraPerspectiveContrastingRightFacing'] = 55] = 'CameraPerspectiveContrastingRightFacing';


    PresetCamera[PresetCamera['CameraPerspectiveHeroicLeftFacing'] = 56] = 'CameraPerspectiveHeroicLeftFacing';


    PresetCamera[PresetCamera['CameraPerspectiveHeroicRightFacing'] = 57] = 'CameraPerspectiveHeroicRightFacing';


    PresetCamera[PresetCamera['CameraPerspectiveHeroicExtremeLeftFacing'] = 58] = 'CameraPerspectiveHeroicExtremeLeftFacing';


    PresetCamera[PresetCamera['CameraPerspectiveHeroicExtremeRightFacing'] = 59] = 'CameraPerspectiveHeroicExtremeRightFacing';


    PresetCamera[PresetCamera['CameraPerspectiveRelaxed'] = 60] = 'CameraPerspectiveRelaxed';


    PresetCamera[PresetCamera['CameraPerspectiveRelaxedModerately'] = 61] = 'CameraPerspectiveRelaxedModerately';


    PresetCamera[PresetCamera['PresetCameraNone'] = 62] = 'PresetCameraNone';
})(PresetCamera = exports.PresetCamera || (exports.PresetCamera = {}));


var PresetLightingDirection;
(function (PresetLightingDirection) {
    PresetLightingDirection[PresetLightingDirection['LightingTopLeft'] = 0] = 'LightingTopLeft';


    PresetLightingDirection[PresetLightingDirection['LightingTop'] = 1] = 'LightingTop';


    PresetLightingDirection[PresetLightingDirection['LightingTopRight'] = 2] = 'LightingTopRight';


    PresetLightingDirection[PresetLightingDirection['LightingLeft'] = 3] = 'LightingLeft';


    PresetLightingDirection[PresetLightingDirection['LightingNone'] = 4] = 'LightingNone';


    PresetLightingDirection[PresetLightingDirection['LightingRight'] = 5] = 'LightingRight';


    PresetLightingDirection[PresetLightingDirection['LightingBottomLeft'] = 6] = 'LightingBottomLeft';


    PresetLightingDirection[PresetLightingDirection['LightingBottom'] = 7] = 'LightingBottom';


    PresetLightingDirection[PresetLightingDirection['LightingBottomRight'] = 8] = 'LightingBottomRight';
})(PresetLightingDirection = exports.PresetLightingDirection || (exports.PresetLightingDirection = {}));


var LightRigType;
(function (LightRigType) {
    LightRigType[LightRigType['LightRigLegacyFlat1'] = 0] = 'LightRigLegacyFlat1';


    LightRigType[LightRigType['LightRigLegacyFlat2'] = 1] = 'LightRigLegacyFlat2';


    LightRigType[LightRigType['LightRigLegacyFlat3'] = 2] = 'LightRigLegacyFlat3';


    LightRigType[LightRigType['LightRigLegacyFlat4'] = 3] = 'LightRigLegacyFlat4';


    LightRigType[LightRigType['LightRigLegacyNormal1'] = 4] = 'LightRigLegacyNormal1';


    LightRigType[LightRigType['LightRigLegacyNormal2'] = 5] = 'LightRigLegacyNormal2';


    LightRigType[LightRigType['LightRigLegacyNormal3'] = 6] = 'LightRigLegacyNormal3';


    LightRigType[LightRigType['LightRigLegacyNormal4'] = 7] = 'LightRigLegacyNormal4';


    LightRigType[LightRigType['LightRigLegacyHarsh1'] = 8] = 'LightRigLegacyHarsh1';


    LightRigType[LightRigType['LightRigLegacyHarsh2'] = 9] = 'LightRigLegacyHarsh2';


    LightRigType[LightRigType['LightRigLegacyHarsh3'] = 10] = 'LightRigLegacyHarsh3';


    LightRigType[LightRigType['LightRigLegacyHarsh4'] = 11] = 'LightRigLegacyHarsh4';


    LightRigType[LightRigType['LightRigThreePoint'] = 12] = 'LightRigThreePoint';


    LightRigType[LightRigType['LightRigBalanced'] = 13] = 'LightRigBalanced';


    LightRigType[LightRigType['LightRigSoft'] = 14] = 'LightRigSoft';


    LightRigType[LightRigType['LightRigHarsh'] = 15] = 'LightRigHarsh';


    LightRigType[LightRigType['LightRigFlood'] = 16] = 'LightRigFlood';


    LightRigType[LightRigType['LightRigContrasting'] = 17] = 'LightRigContrasting';


    LightRigType[LightRigType['LightRigMorning'] = 18] = 'LightRigMorning';


    LightRigType[LightRigType['LightRigSunrise'] = 19] = 'LightRigSunrise';


    LightRigType[LightRigType['LightRigSunset'] = 20] = 'LightRigSunset';


    LightRigType[LightRigType['LightRigChilly'] = 21] = 'LightRigChilly';


    LightRigType[LightRigType['LightRigFreezing'] = 22] = 'LightRigFreezing';


    LightRigType[LightRigType['LightRigFlat'] = 23] = 'LightRigFlat';


    LightRigType[LightRigType['LightRigTwoPoint'] = 24] = 'LightRigTwoPoint';


    LightRigType[LightRigType['LightRigGlow'] = 25] = 'LightRigGlow';


    LightRigType[LightRigType['LightRigBrightRoom'] = 26] = 'LightRigBrightRoom';
})(LightRigType = exports.LightRigType || (exports.LightRigType = {}));


var AxisType;
(function (AxisType) {
    AxisType[AxisType['Category'] = 0] = 'Category';


    AxisType[AxisType['Value'] = 1] = 'Value';


    AxisType[AxisType['SeriesAxis'] = 2] = 'SeriesAxis';
})(AxisType = exports.AxisType || (exports.AxisType = {}));


var TickLabelPosition;
(function (TickLabelPosition) {
    TickLabelPosition[TickLabelPosition['high'] = 0] = 'high';

    TickLabelPosition[TickLabelPosition['low'] = 1] = 'low';

    TickLabelPosition[TickLabelPosition['nextToAxis'] = 2] = 'nextToAxis';

    TickLabelPosition[TickLabelPosition['none'] = 3] = 'none';
})(TickLabelPosition = exports.TickLabelPosition || (exports.TickLabelPosition = {}));


var ScaleType;
(function (ScaleType) {
    ScaleType[ScaleType['ScaleLogarithmic'] = 0] = 'ScaleLogarithmic';


    ScaleType[ScaleType['ScaleLinear'] = 1] = 'ScaleLinear';
})(ScaleType = exports.ScaleType || (exports.ScaleType = {}));


var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit['days'] = 0] = 'days';


    TimeUnit[TimeUnit['months'] = 1] = 'months';


    TimeUnit[TimeUnit['years'] = 2] = 'years';
})(TimeUnit = exports.TimeUnit || (exports.TimeUnit = {}));


var TickMark;
(function (TickMark) {
    TickMark[TickMark['cross'] = 0] = 'cross';

    TickMark[TickMark['inside'] = 1] = 'inside';

    TickMark[TickMark['none'] = 2] = 'none';

    TickMark[TickMark['outside'] = 3] = 'outside';
})(TickMark = exports.TickMark || (exports.TickMark = {}));


var DisplayUnit;
(function (DisplayUnit) {
    DisplayUnit['hundreds'] = 'hundreds';

    DisplayUnit['thousands'] = 'thousands';

    DisplayUnit['tenThousands'] = 'tenThousands';

    DisplayUnit['hundredThousands'] = 'hundredThousands';

    DisplayUnit['millions'] = 'millions';

    DisplayUnit['tenMillions'] = 'tenMillions';

    DisplayUnit['hundredMillions'] = 'hundredMillions';

    DisplayUnit['billions'] = 'billions';

    DisplayUnit['trillions'] = 'trillions';
})(DisplayUnit = exports.DisplayUnit || (exports.DisplayUnit = {}));


var AxisCrossPoint;
(function (AxisCrossPoint) {
    AxisCrossPoint['automatic'] = 'auto';

    AxisCrossPoint['maximum'] = 'max';

    AxisCrossPoint['minimum'] = 'min';
})(AxisCrossPoint = exports.AxisCrossPoint || (exports.AxisCrossPoint = {}));


var AxisOrientation;
(function (AxisOrientation) {
    AxisOrientation[AxisOrientation['minMax'] = 0] = 'minMax';

    AxisOrientation[AxisOrientation['maxMin'] = 1] = 'maxMin';
})(AxisOrientation = exports.AxisOrientation || (exports.AxisOrientation = {}));


var CategoryType;
(function (CategoryType) {
    CategoryType[CategoryType['AutomaticScale'] = 0] = 'AutomaticScale';


    CategoryType[CategoryType['CategoryScale'] = 1] = 'CategoryScale';


    CategoryType[CategoryType['TimeScale'] = 2] = 'TimeScale';


    CategoryType[CategoryType['ValueScale'] = 3] = 'ValueScale';
})(CategoryType = exports.CategoryType || (exports.CategoryType = {}));


var AxisGroup;
(function (AxisGroup) {
    AxisGroup[AxisGroup['primary'] = 0] = 'primary';

    AxisGroup[AxisGroup['secondary'] = 1] = 'secondary';
})(AxisGroup = exports.AxisGroup || (exports.AxisGroup = {}));


var BarShape;
(function (BarShape) {
    BarShape[BarShape['ConeToPoint'] = 0] = 'ConeToPoint';


    BarShape[BarShape['ConeToMax'] = 1] = 'ConeToMax';


    BarShape[BarShape['Box'] = 2] = 'Box';


    BarShape[BarShape['Cylinder'] = 3] = 'Cylinder';


    BarShape[BarShape['PyramidToPoint'] = 4] = 'PyramidToPoint';


    BarShape[BarShape['PyramidToMax'] = 5] = 'PyramidToMax';
})(BarShape = exports.BarShape || (exports.BarShape = {}));


var ChartType;
(function (ChartType) {
    ChartType[ChartType['combo'] = 0] = 'combo';

    ChartType[ChartType['xyScatter'] = 1] = 'xyScatter';

    ChartType[ChartType['radar'] = 2] = 'radar';

    ChartType[ChartType['doughnut'] = 3] = 'doughnut';
    ChartType[ChartType['pie3D'] = 4] = 'pie3D';
    ChartType[ChartType['line3D'] = 5] = 'line3D';
    ChartType[ChartType['column3D'] = 6] = 'column3D';
    ChartType[ChartType['area3D'] = 7] = 'area3D';

    ChartType[ChartType['area'] = 8] = 'area';

    ChartType[ChartType['line'] = 9] = 'line';

    ChartType[ChartType['pie'] = 10] = 'pie';

    ChartType[ChartType['bubble'] = 11] = 'bubble';

    ChartType[ChartType['columnClustered'] = 12] = 'columnClustered';

    ChartType[ChartType['columnStacked'] = 13] = 'columnStacked';

    ChartType[ChartType['columnStacked100'] = 14] = 'columnStacked100';
    ChartType[ChartType['columnClustered3D'] = 15] = 'columnClustered3D';
    ChartType[ChartType['columnStacked3D'] = 16] = 'columnStacked3D';
    ChartType[ChartType['columnStacked1003D'] = 17] = 'columnStacked1003D';

    ChartType[ChartType['barClustered'] = 18] = 'barClustered';

    ChartType[ChartType['barStacked'] = 19] = 'barStacked';

    ChartType[ChartType['barStacked100'] = 20] = 'barStacked100';
    ChartType[ChartType['barClustered3D'] = 21] = 'barClustered3D';
    ChartType[ChartType['barStacked3D'] = 22] = 'barStacked3D';
    ChartType[ChartType['barStacked1003D'] = 23] = 'barStacked1003D';

    ChartType[ChartType['lineStacked'] = 24] = 'lineStacked';

    ChartType[ChartType['lineStacked100'] = 25] = 'lineStacked100';

    ChartType[ChartType['lineMarkers'] = 26] = 'lineMarkers';

    ChartType[ChartType['lineMarkersStacked'] = 27] = 'lineMarkersStacked';

    ChartType[ChartType['lineMarkersStacked100'] = 28] = 'lineMarkersStacked100';
    ChartType[ChartType['pieOfPie'] = 29] = 'pieOfPie';
    ChartType[ChartType['pieExploded'] = 30] = 'pieExploded';
    ChartType[ChartType['pieExploded3D'] = 31] = 'pieExploded3D';
    ChartType[ChartType['barOfPie'] = 32] = 'barOfPie';

    ChartType[ChartType['xyScatterSmooth'] = 33] = 'xyScatterSmooth';

    ChartType[ChartType['xyScatterSmoothNoMarkers'] = 34] = 'xyScatterSmoothNoMarkers';

    ChartType[ChartType['xyScatterLines'] = 35] = 'xyScatterLines';

    ChartType[ChartType['xyScatterLinesNoMarkers'] = 36] = 'xyScatterLinesNoMarkers';

    ChartType[ChartType['areaStacked'] = 37] = 'areaStacked';

    ChartType[ChartType['areaStacked100'] = 38] = 'areaStacked100';
    ChartType[ChartType['areaStacked3D'] = 39] = 'areaStacked3D';
    ChartType[ChartType['areaStacked1003D'] = 40] = 'areaStacked1003D';
    ChartType[ChartType['doughnutExploded'] = 41] = 'doughnutExploded';

    ChartType[ChartType['radarMarkers'] = 42] = 'radarMarkers';

    ChartType[ChartType['radarFilled'] = 43] = 'radarFilled';
    ChartType[ChartType['surface'] = 44] = 'surface';
    ChartType[ChartType['surfaceWireframe'] = 45] = 'surfaceWireframe';
    ChartType[ChartType['surfaceTopView'] = 46] = 'surfaceTopView';
    ChartType[ChartType['surfaceTopViewWireframe'] = 47] = 'surfaceTopViewWireframe';
    ChartType[ChartType['bubble3DEffect'] = 48] = 'bubble3DEffect';

    ChartType[ChartType['stockHLC'] = 49] = 'stockHLC';

    ChartType[ChartType['stockOHLC'] = 50] = 'stockOHLC';

    ChartType[ChartType['stockVHLC'] = 51] = 'stockVHLC';

    ChartType[ChartType['stockVOHLC'] = 52] = 'stockVOHLC';

    ChartType[ChartType['boxWhisker'] = 53] = 'boxWhisker';

    ChartType[ChartType['funnel'] = 54] = 'funnel';

    ChartType[ChartType['paretoLine'] = 55] = 'paretoLine';

    ChartType[ChartType['regionMap'] = 56] = 'regionMap';

    ChartType[ChartType['sunburst'] = 57] = 'sunburst';

    ChartType[ChartType['treemap'] = 58] = 'treemap';

    ChartType[ChartType['waterfall'] = 59] = 'waterfall';

    ChartType[ChartType['clusteredColumn'] = 60] = 'clusteredColumn';
})(ChartType = exports.ChartType || (exports.ChartType = {}));


var TrendlineType;
(function (TrendlineType) {
    TrendlineType[TrendlineType['exponential'] = 0] = 'exponential';

    TrendlineType[TrendlineType['linear'] = 1] = 'linear';

    TrendlineType[TrendlineType['logarithmic'] = 2] = 'logarithmic';

    TrendlineType[TrendlineType['movingAverage'] = 3] = 'movingAverage';

    TrendlineType[TrendlineType['polynomial'] = 4] = 'polynomial';

    TrendlineType[TrendlineType['power'] = 5] = 'power';
})(TrendlineType = exports.TrendlineType || (exports.TrendlineType = {}));


var DataLabelPosition;
(function (DataLabelPosition) {
    DataLabelPosition[DataLabelPosition['bestFit'] = 0] = 'bestFit';

    DataLabelPosition[DataLabelPosition['below'] = 1] = 'below';

    DataLabelPosition[DataLabelPosition['center'] = 2] = 'center';

    DataLabelPosition[DataLabelPosition['insideBase'] = 3] = 'insideBase';

    DataLabelPosition[DataLabelPosition['insideEnd'] = 4] = 'insideEnd';

    DataLabelPosition[DataLabelPosition['left'] = 5] = 'left';

    DataLabelPosition[DataLabelPosition['outsideEnd'] = 6] = 'outsideEnd';

    DataLabelPosition[DataLabelPosition['right'] = 7] = 'right';

    DataLabelPosition[DataLabelPosition['above'] = 8] = 'above';
})(DataLabelPosition = exports.DataLabelPosition || (exports.DataLabelPosition = {}));


var MarkerStyle;
(function (MarkerStyle) {
    MarkerStyle[MarkerStyle['MarkerStyleCircle'] = 0] = 'MarkerStyleCircle';


    MarkerStyle[MarkerStyle['MarkerStyleDash'] = 1] = 'MarkerStyleDash';


    MarkerStyle[MarkerStyle['MarkerStyleDiamond'] = 2] = 'MarkerStyleDiamond';


    MarkerStyle[MarkerStyle['MarkerStyleDot'] = 3] = 'MarkerStyleDot';


    MarkerStyle[MarkerStyle['MarkerStyleNone'] = 4] = 'MarkerStyleNone';


    MarkerStyle[MarkerStyle['MarkerStylePicture'] = 5] = 'MarkerStylePicture';


    MarkerStyle[MarkerStyle['MarkerStylePlus'] = 6] = 'MarkerStylePlus';


    MarkerStyle[MarkerStyle['MarkerStyleSquare'] = 7] = 'MarkerStyleSquare';


    MarkerStyle[MarkerStyle['MarkerStyleStar'] = 8] = 'MarkerStyleStar';


    MarkerStyle[MarkerStyle['MarkerStyleTriangle'] = 9] = 'MarkerStyleTriangle';


    MarkerStyle[MarkerStyle['MarkerStyleX'] = 10] = 'MarkerStyleX';


    MarkerStyle[MarkerStyle['MarkerStyleAutomatic'] = 11] = 'MarkerStyleAutomatic';
})(MarkerStyle = exports.MarkerStyle || (exports.MarkerStyle = {}));


var ErrorBarType;
(function (ErrorBarType) {
    ErrorBarType[ErrorBarType['both'] = 0] = 'both';

    ErrorBarType[ErrorBarType['minus'] = 1] = 'minus';

    ErrorBarType[ErrorBarType['plus'] = 2] = 'plus';
})(ErrorBarType = exports.ErrorBarType || (exports.ErrorBarType = {}));


var ErrorBarValueType;
(function (ErrorBarValueType) {
    ErrorBarValueType[ErrorBarValueType['custom'] = 0] = 'custom';

    ErrorBarValueType[ErrorBarValueType['fixedValue'] = 1] = 'fixedValue';

    ErrorBarValueType[ErrorBarValueType['percentage'] = 2] = 'percentage';

    ErrorBarValueType[ErrorBarValueType['standardDeviation'] = 3] = 'standardDeviation';

    ErrorBarValueType[ErrorBarValueType['standardError'] = 4] = 'standardError';
})(ErrorBarValueType = exports.ErrorBarValueType || (exports.ErrorBarValueType = {}));


var DrawingPictureType;
(function (DrawingPictureType) {
    DrawingPictureType[DrawingPictureType['Stretch'] = 0] = 'Stretch';


    DrawingPictureType[DrawingPictureType['Stack'] = 1] = 'Stack';


    DrawingPictureType[DrawingPictureType['StackScale'] = 2] = 'StackScale';
})(DrawingPictureType = exports.DrawingPictureType || (exports.DrawingPictureType = {}));


var SizeRepresents;
(function (SizeRepresents) {
    SizeRepresents[SizeRepresents['SizeIsArea'] = 0] = 'SizeIsArea';


    SizeRepresents[SizeRepresents['SizeIsWidth'] = 1] = 'SizeIsWidth';
})(SizeRepresents = exports.SizeRepresents || (exports.SizeRepresents = {}));


var ChartSplitType;
(function (ChartSplitType) {
    ChartSplitType[ChartSplitType['SplitByPosition'] = 0] = 'SplitByPosition';


    ChartSplitType[ChartSplitType['SplitByValue'] = 1] = 'SplitByValue';


    ChartSplitType[ChartSplitType['SplitByPercentValue'] = 2] = 'SplitByPercentValue';


    ChartSplitType[ChartSplitType['SplitByCustomSplit'] = 3] = 'SplitByCustomSplit';
})(ChartSplitType = exports.ChartSplitType || (exports.ChartSplitType = {}));


var LegendPosition;
(function (LegendPosition) {
    LegendPosition[LegendPosition['custom'] = 0] = 'custom';

    LegendPosition[LegendPosition['top'] = 1] = 'top';

    LegendPosition[LegendPosition['right'] = 2] = 'right';

    LegendPosition[LegendPosition['left'] = 3] = 'left';

    LegendPosition[LegendPosition['bottom'] = 4] = 'bottom';

    LegendPosition[LegendPosition['topRight'] = 5] = 'topRight';
})(LegendPosition = exports.LegendPosition || (exports.LegendPosition = {}));


var RowCol;
(function (RowCol) {
    RowCol[RowCol['rows'] = 0] = 'rows';

    RowCol[RowCol['columns'] = 1] = 'columns';
})(RowCol = exports.RowCol || (exports.RowCol = {}));


var SymbolShape;
(function (SymbolShape) {
    SymbolShape[SymbolShape['circle'] = 0] = 'circle';

    SymbolShape[SymbolShape['dash'] = 1] = 'dash';

    SymbolShape[SymbolShape['diamond'] = 2] = 'diamond';

    SymbolShape[SymbolShape['dot'] = 3] = 'dot';

    SymbolShape[SymbolShape['none'] = 4] = 'none';

    SymbolShape[SymbolShape['picture'] = 5] = 'picture';

    SymbolShape[SymbolShape['plus'] = 6] = 'plus';

    SymbolShape[SymbolShape['square'] = 7] = 'square';

    SymbolShape[SymbolShape['star'] = 8] = 'star';

    SymbolShape[SymbolShape['triangle'] = 9] = 'triangle';

    SymbolShape[SymbolShape['x'] = 10] = 'x';
})(SymbolShape = exports.SymbolShape || (exports.SymbolShape = {}));


var LineType;
(function (LineType) {
    LineType[LineType['solid'] = 0] = 'solid';

    LineType[LineType['dot'] = 1] = 'dot';

    LineType[LineType['dash'] = 2] = 'dash';

    LineType[LineType['lgDash'] = 3] = 'lgDash';

    LineType[LineType['dashDot'] = 4] = 'dashDot';

    LineType[LineType['lgDashDot'] = 5] = 'lgDashDot';

    LineType[LineType['lgDashDotDot'] = 6] = 'lgDashDotDot';

    LineType[LineType['sysDash'] = 7] = 'sysDash';

    LineType[LineType['sysDot'] = 8] = 'sysDot';

    LineType[LineType['sysDashDot'] = 9] = 'sysDashDot';

    LineType[LineType['sysDashDotDot'] = 10] = 'sysDashDotDot';
})(LineType = exports.LineType || (exports.LineType = {}));
var VertAlignType;
(function (VertAlignType) {
    VertAlignType[VertAlignType['Baseline'] = 0] = 'Baseline';
    VertAlignType[VertAlignType['Superscript'] = 1] = 'Superscript';
    VertAlignType[VertAlignType['Subscript'] = 2] = 'Subscript';
})(VertAlignType = exports.VertAlignType || (exports.VertAlignType = {}));


var Placement;
(function (Placement) {
    Placement[Placement['MoveAndSize'] = 0] = 'MoveAndSize';


    Placement[Placement['Move'] = 1] = 'Move';


    Placement[Placement['FreeFloating'] = 2] = 'FreeFloating';
})(Placement = exports.Placement || (exports.Placement = {}));


var ChartElements;
(function (ChartElements) {
    ChartElements[ChartElements['All'] = 0] = 'All';
    ChartElements[ChartElements['Chart'] = 1] = 'Chart';
    ChartElements[ChartElements['PlotArea'] = 2] = 'PlotArea';
    ChartElements[ChartElements['Series'] = 3] = 'Series';
    ChartElements[ChartElements['SeriesCollection'] = 4] = 'SeriesCollection';
    ChartElements[ChartElements['Point'] = 5] = 'Point';
    ChartElements[ChartElements['DataLabel'] = 6] = 'DataLabel';
    ChartElements[ChartElements['DataMarker'] = 7] = 'DataMarker';
    ChartElements[ChartElements['CategoryAxis'] = 8] = 'CategoryAxis';
    ChartElements[ChartElements['ValueAxis'] = 9] = 'ValueAxis';
    ChartElements[ChartElements['SeriesAxis'] = 10] = 'SeriesAxis';
    ChartElements[ChartElements['Lengend'] = 11] = 'Lengend';
    ChartElements[ChartElements['FloorWall'] = 12] = 'FloorWall';
    ChartElements[ChartElements['SideWall'] = 13] = 'SideWall';
    ChartElements[ChartElements['BackWall'] = 14] = 'BackWall';
    ChartElements[ChartElements['ChartTitle'] = 15] = 'ChartTitle';
    ChartElements[ChartElements['AxisTitle'] = 16] = 'AxisTitle';
    ChartElements[ChartElements['ChartGroup'] = 17] = 'ChartGroup';
})(ChartElements = exports.ChartElements || (exports.ChartElements = {}));
var ImageType;
(function (ImageType) {
    ImageType[ImageType['PNG'] = 0] = 'PNG';
    ImageType[ImageType['JPG'] = 1] = 'JPG';
    ImageType[ImageType['JPEG'] = 2] = 'JPEG';
    ImageType[ImageType['EMF'] = 3] = 'EMF';
})(ImageType = exports.ImageType || (exports.ImageType = {}));
var SolidColorType;
(function (SolidColorType) {
    SolidColorType[SolidColorType['None'] = 0] = 'None';
    SolidColorType[SolidColorType['Automatic'] = 1] = 'Automatic';
    SolidColorType[SolidColorType['RGB'] = 2] = 'RGB';
    SolidColorType[SolidColorType['Theme'] = 3] = 'Theme';
})(SolidColorType = exports.SolidColorType || (exports.SolidColorType = {}));
var TextUnderlineType;
(function (TextUnderlineType) {
    TextUnderlineType[TextUnderlineType['None'] = 0] = 'None';
    TextUnderlineType[TextUnderlineType['Words'] = 1] = 'Words';
    TextUnderlineType[TextUnderlineType['Single'] = 2] = 'Single';
    TextUnderlineType[TextUnderlineType['Double'] = 3] = 'Double';
    TextUnderlineType[TextUnderlineType['Heavy'] = 4] = 'Heavy';
    TextUnderlineType[TextUnderlineType['Dotted'] = 5] = 'Dotted';
    TextUnderlineType[TextUnderlineType['DottedHeavy'] = 6] = 'DottedHeavy';
    TextUnderlineType[TextUnderlineType['Dash'] = 7] = 'Dash';
    TextUnderlineType[TextUnderlineType['DashHeavy'] = 8] = 'DashHeavy';
    TextUnderlineType[TextUnderlineType['DashLong'] = 9] = 'DashLong';
    TextUnderlineType[TextUnderlineType['DashLongHeavy'] = 10] = 'DashLongHeavy';
    TextUnderlineType[TextUnderlineType['DotDash'] = 11] = 'DotDash';
    TextUnderlineType[TextUnderlineType['DotDashHeavy'] = 12] = 'DotDashHeavy';
    TextUnderlineType[TextUnderlineType['DotDotDash'] = 13] = 'DotDotDash';
    TextUnderlineType[TextUnderlineType['DotDotDashHeavy'] = 14] = 'DotDotDashHeavy';
    TextUnderlineType[TextUnderlineType['Wavy'] = 15] = 'Wavy';
    TextUnderlineType[TextUnderlineType['WavyHeavy'] = 16] = 'WavyHeavy';
    TextUnderlineType[TextUnderlineType['WavyDouble'] = 17] = 'WavyDouble';
})(TextUnderlineType = exports.TextUnderlineType || (exports.TextUnderlineType = {}));
var ReflectionType;
(function (ReflectionType) {
    ReflectionType[ReflectionType['ReflectionTypeNone'] = 0] = 'ReflectionTypeNone';
    ReflectionType[ReflectionType['ReflectionType1'] = 1] = 'ReflectionType1';
    ReflectionType[ReflectionType['ReflectionType2'] = 2] = 'ReflectionType2';
    ReflectionType[ReflectionType['ReflectionType3'] = 3] = 'ReflectionType3';
    ReflectionType[ReflectionType['ReflectionType4'] = 4] = 'ReflectionType4';
    ReflectionType[ReflectionType['ReflectionType5'] = 5] = 'ReflectionType5';
    ReflectionType[ReflectionType['ReflectionType6'] = 6] = 'ReflectionType6';
    ReflectionType[ReflectionType['ReflectionType7'] = 7] = 'ReflectionType7';
    ReflectionType[ReflectionType['ReflectionType8'] = 8] = 'ReflectionType8';
    ReflectionType[ReflectionType['ReflectionType9'] = 9] = 'ReflectionType9';
})(ReflectionType = exports.ReflectionType || (exports.ReflectionType = {}));
var TextFieldType;
(function (TextFieldType) {
    TextFieldType[TextFieldType['CellRange'] = 0] = 'CellRange';
    TextFieldType[TextFieldType['SeriesName'] = 1] = 'SeriesName';
    TextFieldType[TextFieldType['CategoryName'] = 2] = 'CategoryName';
    TextFieldType[TextFieldType['Value'] = 3] = 'Value';
    TextFieldType[TextFieldType['XValue'] = 4] = 'XValue';
    TextFieldType[TextFieldType['YValue'] = 5] = 'YValue';
    TextFieldType[TextFieldType['BubbleSize'] = 6] = 'BubbleSize';
    TextFieldType[TextFieldType['Percentage'] = 7] = 'Percentage';
    TextFieldType[TextFieldType['TxLink'] = 8] = 'TxLink';
})(TextFieldType = exports.TextFieldType || (exports.TextFieldType = {}));
var UnderlineType;
(function (UnderlineType) {
    UnderlineType[UnderlineType['None'] = 0] = 'None';
    UnderlineType[UnderlineType['Single'] = 1] = 'Single';
    UnderlineType[UnderlineType['Double'] = 2] = 'Double';
    UnderlineType[UnderlineType['SingleAccounting'] = 3] = 'SingleAccounting';
    UnderlineType[UnderlineType['DoubleAccounting'] = 4] = 'DoubleAccounting';
})(UnderlineType = exports.UnderlineType || (exports.UnderlineType = {}));
var ColorType;
(function (ColorType) {
    ColorType[ColorType['None'] = 0] = 'None';
    ColorType[ColorType['Auto'] = 1] = 'Auto';
    ColorType[ColorType['RGB'] = 2] = 'RGB';
    ColorType[ColorType['Index'] = 3] = 'Index';
    ColorType[ColorType['Theme'] = 4] = 'Theme';
})(ColorType = exports.ColorType || (exports.ColorType = {}));


var DisplayBlanksAs;
(function (DisplayBlanksAs) {
    DisplayBlanksAs[DisplayBlanksAs['connected'] = 0] = 'connected';

    DisplayBlanksAs[DisplayBlanksAs['gaps'] = 1] = 'gaps';

    DisplayBlanksAs[DisplayBlanksAs['zero'] = 2] = 'zero';
})(DisplayBlanksAs = exports.DisplayBlanksAs || (exports.DisplayBlanksAs = {}));
var LineFormatStates;
(function (LineFormatStates) {
    LineFormatStates[LineFormatStates['Color'] = 1] = 'Color';
    LineFormatStates[LineFormatStates['PatternColor'] = 2] = 'PatternColor';
    LineFormatStates[LineFormatStates['BeginArrowheadLength'] = 4] = 'BeginArrowheadLength';
    LineFormatStates[LineFormatStates['BeginArrowheadStyle'] = 8] = 'BeginArrowheadStyle';
    LineFormatStates[LineFormatStates['BeginArrowheadWidth'] = 16] = 'BeginArrowheadWidth';
    LineFormatStates[LineFormatStates['DashStyle'] = 32] = 'DashStyle';
    LineFormatStates[LineFormatStates['EndArrowheadLength'] = 64] = 'EndArrowheadLength';
    LineFormatStates[LineFormatStates['EndArrowheadStyle'] = 128] = 'EndArrowheadStyle';
    LineFormatStates[LineFormatStates['EndArrowheadWidth'] = 256] = 'EndArrowheadWidth';
    LineFormatStates[LineFormatStates['InsetPen'] = 512] = 'InsetPen';
    LineFormatStates[LineFormatStates['Pattern'] = 1024] = 'Pattern';
    LineFormatStates[LineFormatStates['Style'] = 2048] = 'Style';
    LineFormatStates[LineFormatStates['Transparency'] = 4096] = 'Transparency';
    LineFormatStates[LineFormatStates['Visible'] = 8192] = 'Visible';
    LineFormatStates[LineFormatStates['Weight'] = 16384] = 'Weight';
    LineFormatStates[LineFormatStates['CapStyle'] = 32768] = 'CapStyle';
    LineFormatStates[LineFormatStates['JoinStyle'] = 65536] = 'JoinStyle';
})(LineFormatStates = exports.LineFormatStates || (exports.LineFormatStates = {}));
var ColorFormatStates;
(function (ColorFormatStates) {
    ColorFormatStates[ColorFormatStates['Brightness'] = 1] = 'Brightness';
    ColorFormatStates[ColorFormatStates['ObjectThemeColor'] = 2] = 'ObjectThemeColor';
    ColorFormatStates[ColorFormatStates['RGB'] = 4] = 'RGB';
    ColorFormatStates[ColorFormatStates['TintAndShade'] = 8] = 'TintAndShade';
    ColorFormatStates[ColorFormatStates['ColorType'] = 16] = 'ColorType';
    ColorFormatStates[ColorFormatStates['Transparency'] = 32] = 'Transparency';
})(ColorFormatStates = exports.ColorFormatStates || (exports.ColorFormatStates = {}));
var PictureFormatType;
(function (PictureFormatType) {
    PictureFormatType[PictureFormatType['PictureShape'] = 0] = 'PictureShape';
    PictureFormatType[PictureFormatType['PictureFill'] = 1] = 'PictureFill';
    PictureFormatType[PictureFormatType['TextureFill'] = 2] = 'TextureFill';
})(PictureFormatType = exports.PictureFormatType || (exports.PictureFormatType = {}));
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/effects.js':
/*!********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/effects.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });
var stateful_1 = __webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js');
var common_1 = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var colorFormat_1 = __webpack_require__(/*! ./colorFormat */ './dist/plugins/floatingObject/drawing/colorFormat.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var ReflectionFormatStates;
(function (ReflectionFormatStates) {
    ReflectionFormatStates[ReflectionFormatStates['Blur'] = 1] = 'Blur';
    ReflectionFormatStates[ReflectionFormatStates['Offset'] = 2] = 'Offset';
    ReflectionFormatStates[ReflectionFormatStates['Size'] = 4] = 'Size';
    ReflectionFormatStates[ReflectionFormatStates['Transparency'] = 8] = 'Transparency';
    ReflectionFormatStates[ReflectionFormatStates['Type'] = 16] = 'Type';
})(ReflectionFormatStates || (ReflectionFormatStates = {}));
var isNullOrUndefined = common_1.UnitHelper.isNullOrUndefined;
var Math_floor = Math.floor, Math_sqrt = Math.sqrt;
var ShadowFormatStates;
(function (ShadowFormatStates) {
    ShadowFormatStates[ShadowFormatStates['Blur'] = 1] = 'Blur';
    ShadowFormatStates[ShadowFormatStates['Obscured'] = 2] = 'Obscured';
    ShadowFormatStates[ShadowFormatStates['OffsetX'] = 4] = 'OffsetX';
    ShadowFormatStates[ShadowFormatStates['OffsetY'] = 8] = 'OffsetY';
    ShadowFormatStates[ShadowFormatStates['RotateWithShape'] = 16] = 'RotateWithShape';
    ShadowFormatStates[ShadowFormatStates['Size'] = 32] = 'Size';
    ShadowFormatStates[ShadowFormatStates['Style'] = 64] = 'Style';
    ShadowFormatStates[ShadowFormatStates['Transparency'] = 128] = 'Transparency';
    ShadowFormatStates[ShadowFormatStates['Type'] = 256] = 'Type';
    ShadowFormatStates[ShadowFormatStates['Visible'] = 512] = 'Visible';
})(ShadowFormatStates || (ShadowFormatStates = {}));
var ShadowFormat = (function (_super) {
    __extends(ShadowFormat, _super);
    function ShadowFormat(context, parent) {
        var _this_1 = _super.call(this, parent) || this;
        var _this = _this_1;
        _this._blur = 5;
        _this._obscured = false;
        _this._offsetX = common_1.ShapeConstants.DefaultOffset;
        _this._offsetY = common_1.ShapeConstants.DefaultOffset;
        _this._rotateWithShape = false;
        _this._size = 100;
        _this._transparency = 0;
        _this._visible = false;
        _this.presetShadowOffset = -6.0;
        _this._context = context;
        _this._parent = parent;
        return _this_1;
    }
    ShadowFormat.prototype.OnStyleChange = function () {
        var _this = this;
        _this._blur = 0;
        _this._offsetX = 0;
        _this._offsetY = 0;
        _this._size = 100;
        _this._transparency = 0;
        _this.UnDirty(ShadowFormatStates.Type);
        if (_this.Style === drawingInterface_1.ShadowStyle.ShadowStyleInnerShadow) {
            _this._rotateWithShape = false;
        }
        else if (_this.Style === drawingInterface_1.ShadowStyle.ShadowStyleOuterShadow) {
            _this._rotateWithShape = true;
        }
    };
    ShadowFormat.prototype.OnTypeChange = function () {
        var _this = this;
        _this._blur = 5;
        _this._offsetX = _this.presetShadowOffset;
        _this._offsetY = _this.presetShadowOffset;
        _this._size = 100;
        _this._transparency = 0.5;
        _this.UnDirty(ShadowFormatStates.Style);
    };
    ShadowFormat.prototype.GetDefaultColor = function () {
        var foreColor = new colorFormat_1.ColorFormat(this._context, this._parent && this._parent._foreColor);
        foreColor.ColorType = drawingInterface_1.SolidColorType.None;
        return foreColor;
    };
    ShadowFormat.prototype.IncrementOffsetX = function (Increment) {
        this.OffsetX += Increment;
    };
    ShadowFormat.prototype.IncrementOffsetY = function (Increment) {
        this.OffsetY += Increment;
    };
    ShadowFormat.prototype.FromOOModel = function (t ) {
        this._ooModel = t;
    };
    ShadowFormat.prototype.ToOOModel = function () {
        return this._ooModel;
    };
    ShadowFormat.prototype.ToCT_PresetShadowEffect = function () {
        var _this = this;
        var offsetX = _this.OffsetX, offsetY = _this.OffsetY;
        var dis = Math_sqrt(offsetX * offsetX + offsetY * offsetY);
        var presetShadow = { dist: 0, dir: 0 } ;
        presetShadow.dist = dis;
        presetShadow.dir = Math_floor(common_1.NumberExtension.GetTriangleAngle(offsetX, offsetY, dis) * common_1.ShapeConstants.PositiveFixedAngleConvert);
        presetShadow.prst = _this.Type;
        _this.ToCT_Color(presetShadow);
        return presetShadow;
    };
    ShadowFormat.prototype.ToCT_InnerShadowEffect = function () {
        var _this = this;
        var offsetX = _this.OffsetX, offsetY = _this.OffsetY;
        var dis = Math_sqrt(offsetX * offsetX + offsetY * offsetY);
        var innerShadow = { blurRad: 0, dist: 0, dir: 0 } ;
        innerShadow.blurRad = _this.Blur;
        innerShadow.dist = dis;
        if (offsetX !== 0 || offsetY !== 0) {
            innerShadow.dir = Math_floor(common_1.NumberExtension.GetTriangleAngle(offsetX, offsetY, dis) * common_1.ShapeConstants.PositiveFixedAngleConvert);
        }
        innerShadow.scrgbClr = _this.ToCT_ScRgbColor();
        return innerShadow;
    };
    ShadowFormat.prototype.ToCT_OuterShadowEffect = function () {
        var _this = this;
        var offsetX = _this.OffsetX, offsetY = _this.OffsetY;
        var dis = Math_sqrt(offsetX * offsetX + offsetY * offsetY);
        var outerShadow = {
            blurRad: 0,
            dist: 0,
            dir: 0,
            sx: 100000,
            sy: 100000,
            kx: 0,
            ky: 0,
            algn: drawingInterface_1.TextureAlignment.TextureBottom,
            rotWithShape: true
        } ;
        outerShadow.blurRad = _this.Blur;
        outerShadow.dist = dis;
        if (offsetX !== 0 || offsetY !== 0) {
            outerShadow.dir = Math_floor(common_1.NumberExtension.GetTriangleAngle(offsetX, offsetY, dis) * common_1.ShapeConstants.PositiveFixedAngleConvert);
        }
        outerShadow.rotWithShape = _this.RotateWithShape === true;
        outerShadow.sx = Math_floor(_this.Size * common_1.ShapeConstants.RelativeRectConver);
        outerShadow.sy = Math_floor(_this.Size * common_1.ShapeConstants.RelativeRectConver);
        outerShadow.scrgbClr = _this.ToCT_ScRgbColor();
        return outerShadow;
    };
    ShadowFormat.prototype.ToCT_Color = function (presetShadow ) {
        var _this = this, percentage, percentage2, fixedPercentage;
        if (isNullOrUndefined(_this._foreColor)) {
            return;
        }
        if (_this._foreColor.ColorType === drawingInterface_1.SolidColorType.Theme) {
            var color = {};
            color.val = _this._foreColor.ObjectThemeColor;
            if (_this._foreColor.Brightness !== 0) {
                percentage = Math_floor(_this._foreColor.Brightness * 100000);
                color.lumMod = [percentage];
                percentage2 = Math_floor((1 - _this._foreColor.Brightness) * 100000);
                color.lumOff = [percentage2];
            }
            if (_this._foreColor.TintAndShade > 0 && _this._foreColor.TintAndShade < 1) {
                fixedPercentage = Math_floor(_this._foreColor.TintAndShade * common_1.ShapeConstants.ShadeConver);
                color.shade = [fixedPercentage];
            }


            presetShadow.schemeClr = color;
        }
        else if (_this._foreColor.ColorType === drawingInterface_1.SolidColorType.RGB) {
            var srgbColor = {};
            srgbColor.val = [_this._foreColor.RGB.R, _this._foreColor.RGB.G, _this._foreColor.RGB.B];
            if (_this._foreColor.Brightness !== 0) {
                percentage = Math_floor(_this._foreColor.Brightness * 100000);
                srgbColor.lumMod = [percentage];
                percentage2 = Math_floor((1 - _this._foreColor.Brightness) * 100000);
                srgbColor.lumOff = [percentage2];
            }
            if (_this.Transparency !== 0) {
                fixedPercentage = Math_floor(_this.Transparency * common_1.ShapeConstants.PositiveFixedPercentageConvert);
                srgbColor.alpha = [fixedPercentage];
            }
            presetShadow.srgbClr = srgbColor;
        }
    };
    ShadowFormat.prototype.ToCT_ScRgbColor = function () {
        var color = {};
        if (this.Transparency !== 0) {
            var percentage = Math_floor(this.Transparency * common_1.ShapeConstants.PositiveFixedPercentageConvert);
            color.alpha = [percentage];
        }
        return color;
    };
    ShadowFormat.prototype.SetState = function (prop, state) {
        _super.prototype.SetState.call(this, prop, state);
        if (prop === ShadowFormatStates.Blur ||
            prop === ShadowFormatStates.OffsetX ||
            prop === ShadowFormatStates.OffsetY ||
            prop === ShadowFormatStates.RotateWithShape ||
            prop === ShadowFormatStates.Size ||
            prop === ShadowFormatStates.Transparency) {
            if (!this.GetState(ShadowFormatStates.Style)) {
                this._style = drawingInterface_1.ShadowStyle.ShadowStyleOuterShadow;
            }
        }
    };
    Object.defineProperty(ShadowFormat.prototype, 'ForeColor', {
        get: function () {
            var _this = this;
            if (isNullOrUndefined(_this._foreColor)) {
                _this._foreColor = _this.GetDefaultColor();
            }
            return _this._foreColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'Obscured', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.Obscured) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Obscured;
            }
            return _this._obscured;
        },
        set: function (value) {
            this._obscured = value;
            this.SetState(ShadowFormatStates.Obscured, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'Blur', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.Blur) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Blur;
            }
            return _this._blur;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'Blue', {
        set: function (value) {
            this._blur = value;
            this.SetState(ShadowFormatStates.Blur, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'OffsetX', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.OffsetX) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.OffsetX;
            }
            return _this._offsetX;
        },
        set: function (value) {
            this._offsetX = value;
            this.SetState(ShadowFormatStates.OffsetX, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'OffsetY', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.OffsetY) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.OffsetY;
            }
            return _this._offsetY;
        },
        set: function (value) {
            this._offsetY = value;
            this.SetState(ShadowFormatStates.OffsetY, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'RotateWithShape', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.RotateWithShape) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.RotateWithShape;
            }
            return _this._rotateWithShape;
        },
        set: function (value) {
            var _this = this;
            if (_this.Style === drawingInterface_1.ShadowStyle.ShadowStyleInnerShadow || _this.GetState(ShadowFormatStates.Type)) {
                return;
            }
            _this._rotateWithShape = value;
            _this.SetState(ShadowFormatStates.RotateWithShape, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'Size', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.Size) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Size;
            }
            return _this._size;
        },
        set: function (value) {
            this._size = value;
            this.SetState(ShadowFormatStates.Size, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'Style', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.Style) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Style;
            }
            return _this._style;
        },
        set: function (value) {
            var _this = this;
            if (_this.Style !== value) {
                _this.OnStyleChange();
            }
            _this._style = value;
            _this.SetState(ShadowFormatStates.Style, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'Transparency', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.Transparency) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Transparency;
            }
            return _this._transparency;
        },
        set: function (value) {
            this._transparency = value;
            this.SetState(ShadowFormatStates.Transparency, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'Type', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.Type) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Type;
            }
            return _this._type;
        },
        set: function (value) {
            this._type = value;
            this.SetState(ShadowFormatStates.Type, true);
            this.OnTypeChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowFormat.prototype, 'Visible', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ShadowFormatStates.Visible) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Visible;
            }
            return _this._visible;
        },
        set: function (value) {
            var _this = this;
            _this._visible = value;
            _this.SetState(ShadowFormatStates.Visible, true);
            if (value !== false && !_this.GetState(ShadowFormatStates.Style)) {
                _this._style = drawingInterface_1.ShadowStyle.ShadowStyleOuterShadow;
            }
        },
        enumerable: true,
        configurable: true
    });
    return ShadowFormat;
}(stateful_1.StatefullBase));
exports.ShadowFormat = ShadowFormat;


var SoftEdgeFormat = (function (_super) {
    __extends(SoftEdgeFormat, _super);
    function SoftEdgeFormat(parent ) {
        return _super.call(this, parent) || this;
    }
    SoftEdgeFormat.prototype.FromOOModel = function (t ) {
        this._ooModel = t;
    };
    SoftEdgeFormat.prototype.ToOOModel = function () {
        return this._ooModel;
    };
    return SoftEdgeFormat;
}(stateful_1.StatefullBase));
exports.SoftEdgeFormat = SoftEdgeFormat;
var ReflectionFormat = (function (_super) {
    __extends(ReflectionFormat, _super);
    function ReflectionFormat(context, parent ) {
        var _this_1 = _super.call(this, parent) || this;
        var _this = _this_1;
        _this._size = 100;
        _this._type = drawingInterface_1.ReflectionType.ReflectionType1;
        _this.presetShadowOffset = -6.0;
        _this._context = context;
        _this._parent = parent;
        return _this_1;
    }
    Object.defineProperty(ReflectionFormat.prototype, 'Blur', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ReflectionFormatStates.Blur) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Blur;
            }
            return _this._blur;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReflectionFormat.prototype, 'Blue', {
        set: function (value) {
            this._blur = value;
            this.SetState(ReflectionFormatStates.Blur, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReflectionFormat.prototype, 'Offset', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ReflectionFormatStates.Offset) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Offset;
            }
            return _this._offset;
        },
        set: function (value) {
            this._offset = value;
            this.SetState(ReflectionFormatStates.Offset, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReflectionFormat.prototype, 'Size', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ReflectionFormatStates.Size) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Size;
            }
            return _this._size;
        },
        set: function (value) {
            this._size = value;
            this.SetState(ReflectionFormatStates.Size, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReflectionFormat.prototype, 'Transparency', {
        get: function () {
            var _this = this;
            if (!_this.GetState(ReflectionFormatStates.Transparency) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Transparency;
            }
            return _this._transparency;
        },
        set: function (value) {
            this._transparency = value;
            this.SetState(ReflectionFormatStates.Transparency, true);
        },
        enumerable: true,
        configurable: true
    });
    ReflectionFormat.prototype.FromOOModel = function (t ) {
        this._ooModel = t;
    };
    ReflectionFormat.prototype.ToOOModel = function () {
        return this._ooModel;
    };
    ReflectionFormat.prototype.OnTypeChange = function () {
        var _this = this;
        _this._blur = 5;
        _this._offset = _this.presetShadowOffset;
        _this._size = 100;
        _this._transparency = 0.5;
    };
    return ReflectionFormat;
}(stateful_1.StatefullBase));
exports.ReflectionFormat = ReflectionFormat;
var GlowFormatStates;
(function (GlowFormatStates) {
    GlowFormatStates[GlowFormatStates['Color'] = 1] = 'Color';
    GlowFormatStates[GlowFormatStates['Radius'] = 2] = 'Radius';
    GlowFormatStates[GlowFormatStates['Transparency'] = 4] = 'Transparency';
})(GlowFormatStates || (GlowFormatStates = {}));
var GlowFormat = (function (_super) {
    __extends(GlowFormat, _super);
    function GlowFormat(context, parent) {
        var _this_1 = _super.call(this, parent) || this;
        _this_1._context = context;
        _this_1._parent = parent;
        return _this_1;
    }
    Object.defineProperty(GlowFormat.prototype, 'Color', {
        get: function () {
            var _this = this;
            if (isNullOrUndefined(_this._color)) {
                _this._color = _this.GetDefaultColor();
            }
            return _this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFormat.prototype, 'Radius', {
        get: function () {
            var _this = this;
            if (!_this.GetState(GlowFormatStates.Radius) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Radius;
            }
            return _this.radius;
        },
        set: function (value) {
            this.radius = value;
            this.Dirty(GlowFormatStates.Radius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFormat.prototype, 'Transparency', {
        get: function () {
            var _this = this;
            if (!_this.GetState(GlowFormatStates.Transparency) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Transparency;
            }
            return _this._transparency;
        },
        set: function (value) {
            this._transparency = value;
            this.Dirty(GlowFormatStates.Transparency);
        },
        enumerable: true,
        configurable: true
    });
    GlowFormat.prototype.FromOOModel = function (t ) {
        this._ooModel = t;
    };
    GlowFormat.prototype.ToOOModel = function () {
        return this._ooModel;
    };
    GlowFormat.prototype.GetDefaultColor = function () {
        var color = new colorFormat_1.ColorFormat(this._context, this._parent && this._parent.Color);
        color.ColorType = drawingInterface_1.SolidColorType.None;
        return color;
    };
    GlowFormat.prototype.SetState = function (prop, state) {
        var _this = this;
        _super.prototype.SetState.call(_this, prop, state);
        if (prop === GlowFormatStates.Radius || prop === GlowFormatStates.Transparency) {
            if (_this._color && _this._color.ColorType === drawingInterface_1.SolidColorType.None) {
                _this._color.ColorType = drawingInterface_1.SolidColorType.RGB;
            }
        }
    };
    GlowFormat.prototype.ToCT_Color = function (glowEffect ) {
        var _this = this, percentage, percentage2, fixedPercentage;
        var color = _this._color;
        if (isNullOrUndefined(color)) {
            return;
        }
        var colorType = color.ColorType;
        var brightness = color.Brightness;
        if (colorType === drawingInterface_1.SolidColorType.Theme) {
            var schemeColor = {};
            schemeColor.val = color.ObjectThemeColor;
            if (brightness !== 0) {
                percentage = Math_floor(brightness * 100000);
                schemeColor.lumMod = [percentage];
                percentage2 = Math_floor((1 - brightness) * 100000);
                schemeColor.lumOff = [percentage2];
            }
            if (color.TintAndShade > 0 && color.TintAndShade < 1) {
                fixedPercentage = Math_floor(color.TintAndShade * common_1.ShapeConstants.ShadeConver);
                schemeColor.shade = [fixedPercentage];
            }


            glowEffect.schemeClr = schemeColor;
        }
        else if (colorType === drawingInterface_1.SolidColorType.RGB) {
            var srgbColor = {};
            srgbColor.val = [color.RGB.R, color.RGB.G, color.RGB.B];
            if (brightness !== 0) {
                percentage = Math_floor(brightness * 100000);
                srgbColor.lumMod = [percentage];
                percentage2 = Math_floor((1 - brightness) * 100000);
                srgbColor.lumOff = [percentage2];
            }
            if (_this.Transparency !== 0) {
                fixedPercentage = Math_floor(_this.Transparency * common_1.ShapeConstants.PositiveFixedPercentageConvert);
                srgbColor.alpha = [fixedPercentage];
            }
            glowEffect.srgbClr = srgbColor;
        }
    };
    return GlowFormat;
}(stateful_1.StatefullBase));
exports.GlowFormat = GlowFormat;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/fillFormat.js':
/*!***********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/fillFormat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });
var stateful_1 = __webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js');
var ChartCommon = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var colorFormat_1 = __webpack_require__(/*! ./colorFormat */ './dist/plugins/floatingObject/drawing/colorFormat.js');
var gradient_1 = __webpack_require__(/*! ./gradient */ './dist/plugins/floatingObject/drawing/gradient.js');
var picture_1 = __webpack_require__(/*! ./picture */ './dist/plugins/floatingObject/drawing/picture.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var ShapeConstants = ChartCommon.ShapeConstants, PositiveFixedPercentageConvert = ShapeConstants.PositiveFixedPercentageConvert, PositiveFixedAngleConvert = ShapeConstants.PositiveFixedAngleConvert, PositionConver = ShapeConstants.PositionConver, ShapeUtility = ChartCommon.ShapeUtility, UnitHelper = ChartCommon.UnitHelper, isNullOrUndefined = UnitHelper.isNullOrUndefined;
var keyword_null = null, keyword_undefined = void 0, Math_floor = Math.floor;
var errorMassage = 'The specified value is out of range';
var FillFormatStates;
(function (FillFormatStates) {
    FillFormatStates[FillFormatStates['GradientStops'] = 1] = 'GradientStops';
    FillFormatStates[FillFormatStates['GradientStyle'] = 2] = 'GradientStyle';
    FillFormatStates[FillFormatStates['GradientColorType'] = 4] = 'GradientColorType';
    FillFormatStates[FillFormatStates['Pattern'] = 8] = 'Pattern';
    FillFormatStates[FillFormatStates['PresetTexture'] = 16] = 'PresetTexture';
    FillFormatStates[FillFormatStates['RotateWithObject'] = 32] = 'RotateWithObject';
    FillFormatStates[FillFormatStates['TextureAlignment'] = 64] = 'TextureAlignment';
    FillFormatStates[FillFormatStates['TextureHorizontalScale'] = 128] = 'TextureHorizontalScale';
    FillFormatStates[FillFormatStates['TextureName'] = 256] = 'TextureName';
    FillFormatStates[FillFormatStates['TextureOffsetX'] = 512] = 'TextureOffsetX';
    FillFormatStates[FillFormatStates['TextureOffsetY'] = 1024] = 'TextureOffsetY';
    FillFormatStates[FillFormatStates['TextureTile'] = 2048] = 'TextureTile';
    FillFormatStates[FillFormatStates['TextureType'] = 4096] = 'TextureType';
    FillFormatStates[FillFormatStates['TextureVerticalScale'] = 8192] = 'TextureVerticalScale';
    FillFormatStates[FillFormatStates['Transparency'] = 16384] = 'Transparency';
    FillFormatStates[FillFormatStates['Type'] = 32768] = 'Type';
    FillFormatStates[FillFormatStates['Visible'] = 65536] = 'Visible';
    FillFormatStates[FillFormatStates['Color'] = 131072] = 'Color';
    FillFormatStates[FillFormatStates['PatternColor'] = 262144] = 'PatternColor';
    FillFormatStates[FillFormatStates['PictureFormat'] = 524288] = 'PictureFormat';
    FillFormatStates[FillFormatStates['GradientDegree'] = 1048576] = 'GradientDegree';
    FillFormatStates[FillFormatStates['GradientAngle'] = 2097152] = 'GradientAngle';
    FillFormatStates[FillFormatStates['GradientVariant'] = 4194304] = 'GradientVariant';
    FillFormatStates[FillFormatStates['PresetGradientType'] = 8388608] = 'PresetGradientType';
})(FillFormatStates || (FillFormatStates = {}));
var FillFormat = (function (_super) {
    __extends(FillFormat, _super);
    function FillFormat(context, parent, autoColorFormat, container ) {
        var _this_1 = _super.call(this, parent) || this;
        var _this = _this_1;
        _this._gradientScale = true;
        _this._pathShapeType = drawingInterface_1.ST_PathShadeType.rect;
        _this._pattern = drawingInterface_1.PatternType.none;
        _this._rotateWithObject = true;
        _this._visible = true;
        _this._ooFill = keyword_null;
        _this._context = context;
        _this._type = drawingInterface_1.FillType.Solid;
        _this._parent = parent;
        _this._autoColorFormat = autoColorFormat;
        _this._container = container;
        _this._pictureFormat = new picture_1.PictureFormat(drawingInterface_1.PictureFormatType.PictureFill, parent && parent.PictureFormat);
        _this._pictureFormat.Container = container;
        _this._textureHorizontalScale = 1;
        _this._textureVerticalScale = 1;
        _this._gradientStops = new gradient_1.GradientStops(_this._context);
        return _this_1;
    }
    Object.defineProperty(FillFormat.prototype, 'Parent', {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'PictureFormat', {
        get: function () {
            return this._pictureFormat;
        },
        set: function (value) {
            var _this = this;
            if (!isNullOrUndefined(_this._pictureFormat)) {
                _this._pictureFormat.SetParentForChildren(value);
            }
            var oldValue = _this._pictureFormat;
            _this._pictureFormat = value;
            if (!isNullOrUndefined(oldValue)) {
                _this._pictureFormat.ParentStateful = oldValue.ParentStateful;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'PatternColor', {
        get: function () {
            return this.PatternColorInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'Color', {
        get: function () {
            return this.ColorInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'GradientAngle', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.GradientAngle) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.GradientAngle;
            }
            if (_this.GradientStyle === drawingInterface_1.GradientStyle.GradientFromCenter ||
                _this.GradientStyle === drawingInterface_1.GradientStyle.GradientFromCorner) {
                throw new Error();
            }
            return _this._gradientAngle;
        },
        set: function (value) {
            this._gradientAngle = value;
            this.Dirty(FillFormatStates.GradientAngle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'GradientColorType', {
        get: function () {
            return this.GetGradientColorType();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'GradientDegree', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.GradientDegree) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.GradientDegree;
            }
            return _this._gradientDegree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'GradientStops', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.GradientStops) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.GradientStops;
            }
            return _this._gradientStops;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'GradientStyle', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.GradientStyle) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.GradientStyle;
            }
            return _this._gradientStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'GradientVariant', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.GradientVariant) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.GradientVariant;
            }
            return _this._gradientVariant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'Pattern', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.Pattern) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Pattern;
            }
            return _this._pattern;
        },
        set: function (value) {
            this._pattern = value;
            this.Dirty(FillFormatStates.Pattern);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'PresetGradientType', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.PresetGradientType) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.PresetGradientType;
            }
            return _this._presetGradientType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'RotateWithObject', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.RotateWithObject) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.RotateWithObject;
            }
            return _this._rotateWithObject;
        },
        set: function (value) {
            this._rotateWithObject = value;
            this.Dirty(FillFormatStates.RotateWithObject);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'TextureAlignment', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.TextureAlignment) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.TextureAlignment;
            }
            return _this._textureAlignment;
        },
        set: function (value) {
            this._textureAlignment = value;
            this.Dirty(FillFormatStates.TextureAlignment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'TextureHorizontalScale', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.TextureHorizontalScale) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.TextureHorizontalScale;
            }
            return _this._textureHorizontalScale;
        },
        set: function (value) {
            this._textureHorizontalScale = value;
            this.Dirty(FillFormatStates.TextureHorizontalScale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'TextureOffsetX', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.TextureOffsetX) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.TextureOffsetX;
            }
            return _this._textureOffsetX;
        },
        set: function (value) {
            this._textureOffsetX = value;
            this.Dirty(FillFormatStates.TextureOffsetX);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'TextureOffsetY', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.TextureOffsetY) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.TextureOffsetY;
            }
            return _this._textureOffsetY;
        },
        set: function (value) {
            this._textureOffsetY = value;
            this.Dirty(FillFormatStates.TextureOffsetY);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'TextureVerticalScale', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.TextureVerticalScale) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.TextureVerticalScale;
            }
            return _this._textureVerticalScale;
        },
        set: function (value) {
            this._textureVerticalScale = value;
            this.Dirty(FillFormatStates.TextureVerticalScale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'Transparency', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.Transparency) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Transparency;
            }
            return _this.ColorInternal.Transparency;
        },
        set: function (value) {
            this.ColorInternal.Transparency = value;
            this.Dirty(FillFormatStates.Transparency);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'Type', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.Type) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Type;
            }
            return _this._type;
        },
        set: function (value) {
            this._type = value;
            this.Dirty(FillFormatStates.Type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'Visible', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.Visible) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.Visible;
            }
            return _this._visible;
        },
        set: function (value) {
            this._visible = value;
            this.Dirty(FillFormatStates.Visible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'ColorInternal', {
        get: function () {
            var _this = this;
            if (isNullOrUndefined(_this._color)) {
                _this._color = new colorFormat_1.ColorFormat(_this._context, !isNullOrUndefined(_this._parent) ? _this._parent.Color : keyword_null);
                _this._color.AutoColorFormat = _this._autoColorFormat;
            }
            return _this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'PatternColorInternal', {
        get: function () {
            var _this = this;
            if (isNullOrUndefined(_this._patternColor)) {
                _this._patternColor = new colorFormat_1.ColorFormat(_this._context, !isNullOrUndefined(_this._parent) ? _this._parent.PatternColor : keyword_null);
            }
            return _this._patternColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FillFormat.prototype, 'PresetTexture', {
        get: function () {
            var _this = this;
            if (!_this.IsDirty(FillFormatStates.PresetTexture) && !isNullOrUndefined(_this._parent)) {
                return _this._parent.PresetTexture;
            }
            return _this._presetTexture;
        },
        set: function (value) {
            this._presetTexture = value;
            this.Dirty(FillFormatStates.PresetTexture);
        },
        enumerable: true,
        configurable: true
    });
    FillFormat.prototype.GetGradientColorType = function () {
        var colorStops = [];
        for (var _i = 0, _a = this._gradientStops.GradientStopList; _i < _a.length; _i++) {
            var stop_1 = _a[_i];
            if (!this.FindInColorStops(stop_1.Color, colorStops)) {
                colorStops.push(stop_1.Color);
            }
        }
        var count = colorStops.length;
        if (count === 0) {
            return drawingInterface_1.GradientColorType.GradientColorNone;
        }
        else if (count === 1) {
            return drawingInterface_1.GradientColorType.GradientOneColor;
        }
        else if (count === 2) {
            return drawingInterface_1.GradientColorType.GradientTwoColors;
        }
        else {
            return drawingInterface_1.GradientColorType.GradientMultiColor;
        }
    };
    FillFormat.prototype.FindInColorStops = function (color, colorStops) {
        for (var _i = 0, colorStops_1 = colorStops; _i < colorStops_1.length; _i++) {
            var item = colorStops_1[_i];
            var colorType = item.ColorType;
            if (colorType !== color.ColorType) {
                continue;
            }
            if (colorType === drawingInterface_1.SolidColorType.Theme) {
                if (item.ObjectThemeColor === color.ObjectThemeColor &&
                    item.TintAndShade === color.TintAndShade) {
                    return true;
                }
            }
            else if (colorType === drawingInterface_1.SolidColorType.RGB) {
                if (item.RGB.Equals(color.RGB) &&
                    item.TintAndShade === color.TintAndShade) {
                    return true;
                }
            }
        }
        return false;
    };
    FillFormat.prototype._SetGradientDegree = function (value) {
        this._gradientDegree = value;
        this.Dirty(FillFormatStates.GradientDegree);
    };
    FillFormat.prototype._SetGradientStops = function (value) {
        this._gradientStops = value;
        this.Dirty(FillFormatStates.GradientStops);
    };
    FillFormat.prototype._SetGradientStyle = function (value) {
        this._gradientStyle = value;
        this.Dirty(FillFormatStates.GradientStyle);
    };
    FillFormat.prototype._SetGradientVariant = function (value) {
        this._gradientVariant = value;
        this.Dirty(FillFormatStates.GradientVariant);
    };
    FillFormat.prototype._SetPattern = function (value) {
        if (value === drawingInterface_1.PatternType.none) {
            throw new Error(errorMassage);
        }
        var _this = this;
        if (_this.Pattern === drawingInterface_1.PatternType.none) {
            _this._SetType(drawingInterface_1.FillType.Patterned);
        }
        _this._pattern = value;
        _this.Dirty(FillFormatStates.Pattern);
    };
    FillFormat.prototype._SetPresetGradientType = function (value) {
        this._presetGradientType = value;
        this.Dirty(FillFormatStates.PresetGradientType);
    };
    FillFormat.prototype._SetType = function (value) {
        this._type = value;
        this.Dirty(FillFormatStates.Type);
    };
    FillFormat.prototype.InitGradientInfo = function (style, variant, presetType) {
        if (style === drawingInterface_1.GradientStyle.GradientFromTitle) {
            throw new Error(errorMassage);
        }
        var _this = this;
        _this._SetGradientStyle(style);
        _this._SetGradientVariant(variant);
        _this._SetType(drawingInterface_1.FillType.Gradient);
        _this._SetPresetGradientType(presetType);
    };
    FillFormat.prototype.OneColorGradient = function (Style, Variant, Degree) {
        if (Degree < 0 || Degree > 1) {
            throw new Error(errorMassage);
        }
        var _this = this;
        _this.InitGradientInfo(Style, Variant, drawingInterface_1.PresetGradientType.GradientEarlySunset);
        _this._SetGradientDegree(Degree);
        ShapeUtility.InitGradientStops(_this._context, _this, drawingInterface_1.GradientColorType.GradientOneColor);
    };
    FillFormat.prototype.TwoColorGradient = function (Style, Variant) {
        this.InitGradientInfo(Style, Variant, drawingInterface_1.PresetGradientType.GradientEarlySunset);
        ShapeUtility.InitGradientStops(this._context, this, drawingInterface_1.GradientColorType.GradientTwoColors);
    };
    FillFormat.prototype.PresetGradient = function (Style, Variant, presetGradientType) {
        this.InitGradientInfo(Style, Variant, presetGradientType);
        ShapeUtility.InitGradientStops(this._context, this, drawingInterface_1.GradientColorType.GradientPresetColors);
    };
    FillFormat.prototype.Patterned = function (Pattern) {
        this.SetPatternColor();
        this._SetType(drawingInterface_1.FillType.Patterned);
        this._SetPattern(Pattern);
    };
    FillFormat.prototype.SetPatternColor = function () {
        var _this = this;
        _this.Color.ObjectThemeColor = drawingInterface_1.ColorSchemeIndex.LT1;
        _this.PatternColor.ObjectThemeColor = drawingInterface_1.ColorSchemeIndex.Accent1;
        _this.Color.ClearModel();
        _this.PatternColor.ClearModel();
    };
    FillFormat.prototype.Solid = function () {
        this._SetType(drawingInterface_1.FillType.Solid);
        if (!isNullOrUndefined(this._color)) {
            this._color.ClearModel();
        }
    };


    FillFormat.prototype.ClearColor = function () {
        this._color = keyword_null;
    };
    FillFormat.prototype.GetState = function (prop, includingParent) {
        var _this = this;
        if (includingParent === keyword_undefined) {
            includingParent = false;
        }
        if (prop === FillFormatStates.Color && !isNullOrUndefined(_this._color)) {
            return _this._color.IsDirtyIncludingParent(includingParent);
        }
        if (prop === FillFormatStates.PatternColor && !isNullOrUndefined(_this._patternColor)) {
            return _this._patternColor.IsDirtyIncludingParent(includingParent);
        }
        return _super.prototype.GetState.call(_this, prop, includingParent);
    };
    FillFormat.prototype.IsDirtyIncludingParent = function (includingParent) {
        if (includingParent === void 0) { includingParent = false; }
        var _this = this;


        if (!isNullOrUndefined(_this._patternColor) && _this._patternColor.IsDirtyIncludingParent()) {
            return true;
        }
        if (!isNullOrUndefined(_this._color) && _this._color.IsDirtyIncludingParent()) {
            return true;
        }
        if (!isNullOrUndefined(_this._gradientStops) && _this._gradientStops.Count > 0) {
            return true;
        }
        if (!isNullOrUndefined(_this._pictureFormat) && _this._pictureFormat.IsDirtyIncludingParent()) {
            return true;
        }
        return _super.prototype.IsDirtyIncludingParent.call(_this, includingParent);
    };
    FillFormat.prototype.OnParentChanged = function (newParent) {
        var _this = this;
        _this._parent = newParent;
        if (!isNullOrUndefined(_this._parent)) {
            if (!isNullOrUndefined(_this._color)) {
                _this._color.ParentStateful = _this._parent.Color;
            }
            if (!isNullOrUndefined(_this._patternColor)) {
                _this._patternColor.ParentStateful = _this._parent.PatternColor;
            }
        }
        else {
            if (!isNullOrUndefined(_this._color)) {
                _this._color.ParentStateful = keyword_null;
            }
            if (!isNullOrUndefined(_this._patternColor)) {
                _this._patternColor.ParentStateful = keyword_null;
            }
        }
    };
    FillFormat.prototype.FromOOModel = function (t, colorFillType) {
        if (isNullOrUndefined(colorFillType)) {
            throw new Error('colorFillType not provided!');
        }
        var _this = this;
        _this._ooFill = t;
        if (colorFillType === drawingInterface_1.ColorFillType.SolidColorFillProperties) {
            _this.ColorInternal.FromOOModel(_this._ooFill);
            _this._type = drawingInterface_1.FillType.Solid;
            _this.SetState(FillFormatStates.Type, true);
        }
        else if (colorFillType === drawingInterface_1.ColorFillType.PatternFillProperties) {
            _this.FromCT_PatternFillProperties(t);
            _this._type = drawingInterface_1.FillType.Patterned;
            _this.SetState(FillFormatStates.Type, true);
        }
        else if (colorFillType === drawingInterface_1.ColorFillType.GradientFillProperties) {
            _this.FromCT_GradientFillProperties(t);
            _this._type = drawingInterface_1.FillType.Gradient;
            _this.SetState(FillFormatStates.Type, true);
        }
        else if (colorFillType === drawingInterface_1.ColorFillType.BlipFillProperties) {
            _this._pictureFormat.FromOOModel(t);
            _this._type = drawingInterface_1.FillType.Picture;
            _this.SetState(FillFormatStates.Type, true);
        }
        else if (colorFillType === drawingInterface_1.ColorFillType.GroupFillProperties) {
            _this._type = drawingInterface_1.FillType.Group;
            _this.SetState(FillFormatStates.Type, true);
        }
        else if (colorFillType === drawingInterface_1.ColorFillType.NoFillProperties) {
            _this._type = drawingInterface_1.FillType.Solid;
            _this.SetState(FillFormatStates.Type, true);
        }
    };
    FillFormat.prototype.ToOOModel = function (lossless) {
        var fill;
        if (this.Visible) {
            switch (this.Type) {
                case drawingInterface_1.FillType.Solid:
                    fill = this.ToCT_SolidColorFillProperties();
                    break;
                case drawingInterface_1.FillType.Patterned:
                    fill = this.ToCT_PatternFillProperties();
                    break;
                case drawingInterface_1.FillType.Gradient:
                    fill = this.ToCT_GradientFillProperties();
                    break;
                case drawingInterface_1.FillType.Textured:
                    fill = this.ToCT_TileFillProperties();
                    break;
                case drawingInterface_1.FillType.Background:
                    break;
                case drawingInterface_1.FillType.Picture:
                    fill = this.ToCT_PictureFillProperties();
                    break;
                case drawingInterface_1.FillType.Group:
                    fill = {
                        colorFillType: drawingInterface_1.ColorFillType.GroupFillProperties
                    };
                    break;
                default:
                    break;
            }
        }
        else {
            fill = {
                colorFillType: drawingInterface_1.ColorFillType.NoFillProperties
            };
        }
        return fill;
    };
    FillFormat.prototype.FromCT_PatternFillProperties = function (t ) {
        this._SetPattern(t.prst);
        this.ColorInternal.FromOOModel(t.bgClr);
        this.PatternColorInternal.FromOOModel(t.fgClr);
    };
    FillFormat.prototype.ToCT_PatternFillProperties = function () {
        var _this = this;
        if (_this._context.DrawingType === drawingInterface_1.DrawingType.GroupShape) {
            return keyword_null;
        }
        var patternFill = {
            colorFillType: drawingInterface_1.ColorFillType.PatternFillProperties
        };
        patternFill.prst = _this.Pattern;
        if (_this.PatternColorInternal.ColorType !== drawingInterface_1.SolidColorType.None) {
            patternFill.fgClr = _this.PatternColorInternal.Color_ToOOModel();
        }
        if (_this.Color.ColorType !== drawingInterface_1.SolidColorType.None) {
            patternFill.bgClr = _this.Color.Color_ToOOModel();
        }
        return patternFill;
    };
    FillFormat.prototype.FromCT_GradientFillProperties = function (gradientFill ) {
        var _this = this;
        _this._SetGradientStops(new gradient_1.GradientStops(_this._context));
        _this._gradientStops.FromOOModel(gradientFill.gsLst);
        _this.RotateWithObject = gradientFill.rotWithShape;
        if (!isNullOrUndefined(gradientFill.path)) {
            _this.FromCT_PathShadeProperties(gradientFill.path);
        }
        else if (!isNullOrUndefined(gradientFill.lin)) {
            _this.FromCT_LinearShadeProperties(gradientFill.lin);
            _this.FromTitleCT_RelativeRect(gradientFill.tileRect);
        }
    };
    FillFormat.prototype.ToCT_GradientFillProperties = function () {
        var _this = this;
        var gradientFill = {
            colorFillType: drawingInterface_1.ColorFillType.GradientFillProperties
        };
        gradientFill.rotWithShape = _this.RotateWithObject;
        if (!isNullOrUndefined(_this.GradientStops) && _this.GradientStops.Count > 0) {
            gradientFill.gsLst = _this.GradientStops.ToOOModel();
        }
        if (_this.GradientStyle === drawingInterface_1.GradientStyle.GradientFromCenter ||
            _this.GradientStyle === drawingInterface_1.GradientStyle.GradientFromCorner ||
            _this.GradientStyle === drawingInterface_1.GradientStyle.GradientTopSpotlight ||
            _this.GradientStyle === drawingInterface_1.GradientStyle.GradientBottomSpotlight) {
            gradientFill.path = _this.ToCT_PathShadeProperties();
        }
        else {
            gradientFill.lin = _this.ToCT_LinearShadeProperties();
        }
        gradientFill.tileRect = _this.ToTitleCT_RelativeRect();
        return gradientFill;
    };
    FillFormat.prototype.ToCT_PictureFillProperties = function () {
        return this._pictureFormat.ToOOModel();
    };
    FillFormat.prototype.FromTitleCT_RelativeRect = function (tileRect ) {
        var _this = this;
        if (isNullOrUndefined(tileRect)) {
            return;
        }
        if (tileRect.l === -PositiveFixedPercentageConvert &&
            tileRect.t === -PositiveFixedPercentageConvert) {
            _this._SetGradientVariant(1);
        }
        else if (tileRect.t === -PositiveFixedPercentageConvert &&
            tileRect.r === -PositiveFixedPercentageConvert) {
            _this._SetGradientVariant(2);
        }
        else if (tileRect.l === -PositiveFixedPercentageConvert &&
            tileRect.b === -PositiveFixedPercentageConvert) {
            _this._SetGradientVariant(3);
        }
        else if (tileRect.r === -PositiveFixedPercentageConvert &&
            tileRect.b === -PositiveFixedPercentageConvert) {
            _this._SetGradientVariant(4);
        }
    };
    FillFormat.prototype.ToTitleCT_RelativeRect = function () {
        var relativeRect = { l: 0, r: 0, t: 0, b: 0 };
        var gradientVariant = this.GradientVariant;
        if (this.GradientStyle === drawingInterface_1.GradientStyle.GradientFromCorner) {
            if (gradientVariant === 1) {
                relativeRect.l = -PositiveFixedPercentageConvert;
                relativeRect.t = -PositiveFixedPercentageConvert;
            }
            else if (gradientVariant === 2) {
                relativeRect.t = -PositiveFixedPercentageConvert;
                relativeRect.r = -PositiveFixedPercentageConvert;
            }
            else if (gradientVariant === 3) {
                relativeRect.l = -PositiveFixedPercentageConvert;
                relativeRect.b = -PositiveFixedPercentageConvert;
            }
            else if (gradientVariant === 4) {
                relativeRect.r = -PositiveFixedPercentageConvert;
                relativeRect.b = -PositiveFixedPercentageConvert;
            }
        }
        return relativeRect;
    };
    FillFormat.prototype.FromCT_LinearShadeProperties = function (lin ) {
        this.GradientAngle = lin.ang / PositiveFixedAngleConvert;
        this._isLinearShade = true;
        this._gradientScale = lin.scaled;
    };
    FillFormat.prototype.ToCT_LinearShadeProperties = function () {
        return {

            ang: Math_floor(this.GradientAngle * PositiveFixedAngleConvert),
            scaled: this._gradientScale
        };
    };
    FillFormat.prototype.FromCT_PathShadeProperties = function (path ) {
        if (isNullOrUndefined(path)) {
            return;
        }
        this._pathShapeType = path.path;
        this.FromCT_RelativeRect(path.fillToRect);
    };
    FillFormat.prototype.ToCT_PathShadeProperties = function () {
        return {

            path: this._pathShapeType,
            fillToRect: this.ToCT_RelativeRect()
        };
    };
    FillFormat.prototype.FromCT_RelativeRect = function (fillToRect ) {
        if (isNullOrUndefined(fillToRect)) {
            return;
        }
        var half = PositiveFixedPercentageConvert * 0.5;
        var _this = this;
        if (fillToRect.l === half &&
            fillToRect.t === half &&
            fillToRect.r === half &&
            fillToRect.b === half) {
            _this._SetGradientStyle(drawingInterface_1.GradientStyle.GradientFromCenter);
        }
        else if (fillToRect.r === PositiveFixedPercentageConvert &&
            fillToRect.b === PositiveFixedPercentageConvert) {
            _this._SetGradientStyle(drawingInterface_1.GradientStyle.GradientFromCorner);
            _this._SetGradientVariant(1);
        }
        else if (fillToRect.l === PositiveFixedPercentageConvert &&
            fillToRect.b === PositiveFixedPercentageConvert) {
            _this._SetGradientStyle(drawingInterface_1.GradientStyle.GradientFromCorner);
            _this._SetGradientVariant(2);
        }
        else if (fillToRect.r === PositiveFixedPercentageConvert &&
            fillToRect.t === PositiveFixedPercentageConvert) {
            _this._SetGradientStyle(drawingInterface_1.GradientStyle.GradientFromCorner);
            _this._SetGradientVariant(3);
        }
        else if (fillToRect.l === PositiveFixedPercentageConvert &&
            fillToRect.t === PositiveFixedPercentageConvert) {
            _this._SetGradientStyle(drawingInterface_1.GradientStyle.GradientFromCorner);
            _this._SetGradientVariant(4);
        }
        else if (fillToRect.l === half &&
            fillToRect.t === -PositiveFixedPercentageConvert * 0.8) {
            _this._SetGradientStyle(drawingInterface_1.GradientStyle.GradientTopSpotlight);
        }
        else if (fillToRect.l === half &&
            fillToRect.t === PositiveFixedPercentageConvert * 1.3) {
            _this._SetGradientStyle(drawingInterface_1.GradientStyle.GradientBottomSpotlight);
        }
    };
    FillFormat.prototype.ToCT_RelativeRect = function () {
        var relativeRect = { l: 0, r: 0, t: 0, b: 0 };
        var half = PositiveFixedPercentageConvert * 0.5;
        if (this.GradientStyle === drawingInterface_1.GradientStyle.GradientFromCenter) {
            relativeRect.l = half;
            relativeRect.t = half;
            relativeRect.r = half;
            relativeRect.b = half;
        }
        else if (this.GradientStyle === drawingInterface_1.GradientStyle.GradientFromCorner) {
            var gradientVariant = this.GradientVariant;
            if (gradientVariant === 1) {
                relativeRect.r = PositiveFixedPercentageConvert;
                relativeRect.b = PositiveFixedPercentageConvert;
            }
            else if (gradientVariant === 2) {
                relativeRect.l = PositiveFixedPercentageConvert;
                relativeRect.b = PositiveFixedPercentageConvert;
            }
            else if (gradientVariant === 3) {
                relativeRect.t = PositiveFixedPercentageConvert;
                relativeRect.r = PositiveFixedPercentageConvert;
            }
            else if (gradientVariant === 4) {
                relativeRect.l = PositiveFixedPercentageConvert;
                relativeRect.t = PositiveFixedPercentageConvert;
            }
        }
        else if (this.GradientStyle === drawingInterface_1.GradientStyle.GradientTopSpotlight) {
            relativeRect.l = half;
            relativeRect.r = half;
            relativeRect.t = -PositiveFixedAngleConvert * 0.8;
            relativeRect.b = PositiveFixedPercentageConvert * 1.8;
        }
        else if (this.GradientStyle === drawingInterface_1.GradientStyle.GradientBottomSpotlight) {
            relativeRect.l = half;
            relativeRect.r = half;
            relativeRect.t = PositiveFixedPercentageConvert * 1.3;
            relativeRect.b = -PositiveFixedAngleConvert * 0.3;
        }
        return relativeRect;
    };
    FillFormat.prototype.ToCT_SolidColorFillProperties = function () {
        return this.ColorInternal.ToOOModel();
    };
    FillFormat.prototype.ToCT_TileFillProperties = function () {
        var blipFill = this._pictureFormat.ToOOModel();
        blipFill.tile = this.ToCT_TileInfoProperties();
        return blipFill;
    };
    FillFormat.prototype.ToCT_TileInfoProperties = function () {
        var _this = this;
        return {

            algn: _this.TextureAlignment,
            tx: _this.TextureOffsetX,
            ty: _this.TextureOffsetY,
            sx: Math_floor(_this.TextureHorizontalScale * PositionConver),
            sy: Math_floor(_this.TextureVerticalScale * PositionConver)
        };
    };
    FillFormat.prototype.Clone = function () {
        var _this = this;
        var format = new FillFormat(_this._context, _this._parent, _this._autoColorFormat, _this._container);
        if (!isNullOrUndefined(_this._patternColor)) {
            format._patternColor = _this._patternColor.Clone();
        }
        if (!isNullOrUndefined(_this._color)) {
            format._color = _this._color.Clone();
        }
        format._gradientDegree = _this._gradientDegree;
        format._gradientScale = _this._gradientScale;
        format._gradientStops = _this._gradientStops;
        format._gradientVariant = _this._gradientVariant;
        format._pattern = _this._pattern;
        format._presetGradientType = _this._presetGradientType;
        format._presetTexture = _this._presetTexture;
        format._textureName = _this._textureName;
        format._textureType = _this._textureType;
        format._type = _this._type;
        format._gradientAngle = _this._gradientAngle;
        format._rotateWithObject = _this._rotateWithObject;
        format._textureAlignment = _this._textureAlignment;
        format._textureHorizontalScale = _this._textureHorizontalScale;
        format._textureOffsetX = _this._textureOffsetX;
        format._textureOffsetY = _this._textureOffsetY;
        format._textureTile = _this._textureTile;
        format._textureVerticalScale = _this._textureVerticalScale;
        format._transparency = _this._transparency;
        format._visible = _this._visible;
        format._states = _this._states;
        format._parent = _this._parent;
        return format;
    };
    return FillFormat;
}(stateful_1.StatefullBase));
exports.FillFormat = FillFormat;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/fontData.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/fontData.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var ChartCommon = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var colorData_1 = __webpack_require__(/*! ./colorData */ './dist/plugins/floatingObject/drawing/colorData.js');
var isNullOrUndefined = ChartCommon.UnitHelper.isNullOrUndefined;
var FontDataFlag;
(function (FontDataFlag) {
    FontDataFlag[FontDataFlag['None'] = 0] = 'None';
    FontDataFlag[FontDataFlag['Color'] = 1] = 'Color';
    FontDataFlag[FontDataFlag['Size'] = 2] = 'Size';
    FontDataFlag[FontDataFlag['Name'] = 4] = 'Name';
    FontDataFlag[FontDataFlag['Family'] = 8] = 'Family';
    FontDataFlag[FontDataFlag['CharSet'] = 16] = 'CharSet';
    FontDataFlag[FontDataFlag['Scheme'] = 32] = 'Scheme';
    FontDataFlag[FontDataFlag['Bold'] = 64] = 'Bold';
    FontDataFlag[FontDataFlag['Italic'] = 128] = 'Italic';
    FontDataFlag[FontDataFlag['Underline'] = 256] = 'Underline';
    FontDataFlag[FontDataFlag['Strike'] = 512] = 'Strike';
    FontDataFlag[FontDataFlag['VertAlign'] = 1024] = 'VertAlign';
    FontDataFlag[FontDataFlag['Shadow'] = 2048] = 'Shadow';
    FontDataFlag[FontDataFlag['Outline'] = 4096] = 'Outline';
    FontDataFlag[FontDataFlag['Condense'] = 8192] = 'Condense';
    FontDataFlag[FontDataFlag['Extend'] = 16384] = 'Extend';
    FontDataFlag[FontDataFlag['All'] = 32767] = 'All';
})(FontDataFlag || (FontDataFlag = {}));
var FontData = (function () {
    function FontData() {
        var _this = this;
        _this.Flag = FontDataFlag.None;
        _this.Size = 0;
        _this.Family = 0;
        _this.CharSet = 0;
        _this.Scheme = drawingInterface_1.ThemeFont.None;
        _this.Underline = drawingInterface_1.UnderlineType.None;
        _this.VertAlign = drawingInterface_1.VertAlignType.Baseline;
    }
    FontData.prototype.Equals = function (other) {
        if (isNullOrUndefined(other)) {
            return false;
        }
        var _this = this;
        return _this.Size === other.Size && _this.Color.Equals(other.Color) && _this.Name === other.Name && _this.Family === other.Family
            && _this.CharSet === other.CharSet && _this.Scheme === other.Scheme && _this.Bold === other.Bold && _this.Italic === other.Italic && _this.Underline === other.Underline
            && _this.Strike === other.Strike && _this.VertAlign === other.VertAlign && _this.Shadow === other.Shadow && _this.Outline === other.Outline
            && _this.Condense === other.Condense && _this.Extend === other.Extend && _this.NotUsed === other.NotUsed;
    };
    FontData.prototype.Clone = function () {
        var fData = new FontData();
        var _this = this;
        fData.Color = _this.Color;
        fData.Size = _this.Size;
        fData.Name = _this.Name;
        fData.Family = _this.Family;
        fData.CharSet = _this.CharSet;
        fData.Scheme = _this.Scheme;
        fData.Bold = _this.Bold;
        fData.Italic = _this.Italic;
        fData.Underline = _this.Underline;
        fData.Strike = _this.Strike;
        fData.VertAlign = _this.VertAlign;
        fData.Shadow = _this.Shadow;
        fData.Outline = _this.Outline;
        fData.Condense = _this.Condense;
        fData.Extend = _this.Extend;
        fData.Flag = _this.Flag;
        fData.NotUsed = _this.NotUsed;
        return fData;
    };
    FontData.prototype.UpdateDefaultValueFlag = function () {
        var _this = this;
        var flag = FontDataFlag.None;
        _this.Color.UpdateDefaultValueFlag();
        if (_this.Color.Flag !== colorData_1.ColorDataFlag.None) {
            flag |= FontDataFlag.Color;
        }
        if (_this.Size !== 0) {
            flag |= FontDataFlag.Size;
        }
        if (!isNullOrUndefined(_this.Name)) {
            flag |= FontDataFlag.Name;
        }
        if (_this.Family !== 0) {
            flag |= FontDataFlag.Family;
        }
        if (_this.CharSet !== 0) {
            flag |= FontDataFlag.CharSet;
        }
        if (_this.Scheme !== drawingInterface_1.ThemeFont.None) {
            flag |= FontDataFlag.Scheme;
        }
        if (_this.Bold) {
            flag |= FontDataFlag.Bold;
        }
        if (_this.Italic) {
            flag |= FontDataFlag.Italic;
        }
        if (_this.Underline !== drawingInterface_1.UnderlineType.None) {
            flag |= FontDataFlag.Underline;
        }
        if (_this.Strike) {
            flag |= FontDataFlag.Strike;
        }
        if (_this.VertAlign !== drawingInterface_1.VertAlignType.Baseline) {
            flag |= FontDataFlag.VertAlign;
        }
        if (_this.Shadow) {
            flag |= FontDataFlag.Shadow;
        }
        if (_this.Outline) {
            flag |= FontDataFlag.Outline;
        }
        if (_this.Condense) {
            flag |= FontDataFlag.Condense;
        }
        if (_this.Extend) {
            flag |= FontDataFlag.Extend;
        }
        _this.Flag = flag;
    };
    FontData.prototype.UpdateFlagFromBottom = function () {
        var _this = this;
        _this.Color.UpdateFlagFromBottom();
        if (_this.Color.Flag === colorData_1.ColorDataFlag.None) {
            _this.Flag &= ~FontDataFlag.Color;
        }
        else {
            _this.Flag |= FontDataFlag.Color;
        }
    };
    FontData.prototype.UpdateDefaultValueFlagForDxf = function () {
        var _this = this, flag = _this.Flag;
        var temp = FontDataFlag.None;
        if ((flag & FontDataFlag.Bold) === FontDataFlag.Bold) {
            temp |= FontDataFlag.Bold;
        }
        if ((flag & FontDataFlag.Italic) === FontDataFlag.Italic) {
            temp |= FontDataFlag.Italic;
        }
        _this.Color.UpdateDefaultValueFlag();
        if (_this.Color.Flag !== colorData_1.ColorDataFlag.None) {
            temp |= FontDataFlag.Color;
        }
        if (_this.Size !== 0) {
            temp |= FontDataFlag.Size;
        }
        if (!isNullOrUndefined(_this.Name)) {
            temp |= FontDataFlag.Name;
        }
        if (_this.Family !== 0) {
            temp |= FontDataFlag.Family;
        }
        if (_this.CharSet !== 0) {
            temp |= FontDataFlag.CharSet;
        }
        if (_this.Scheme !== drawingInterface_1.ThemeFont.None) {
            temp |= FontDataFlag.Scheme;
        }
        if (_this.Underline !== drawingInterface_1.UnderlineType.None) {
            temp |= FontDataFlag.Underline;
        }
        if (_this.Strike) {
            temp |= FontDataFlag.Strike;
        }
        if (_this.VertAlign !== drawingInterface_1.VertAlignType.Baseline) {
            temp |= FontDataFlag.VertAlign;
        }
        if (_this.Shadow) {
            temp |= FontDataFlag.Shadow;
        }
        if (_this.Outline) {
            temp |= FontDataFlag.Outline;
        }
        if (_this.Condense) {
            temp |= FontDataFlag.Condense;
        }
        if (_this.Extend) {
            temp |= FontDataFlag.Extend;
        }
        _this.Flag = temp;
    };
    FontData.prototype.Compose = function (other, conflictCompose) {
        if (conflictCompose === void 0) {
            conflictCompose = true;
        }
        if (other.Flag === FontDataFlag.None) {
            return;
        }
        if (conflictCompose) {
            this.ConflictCompose(other);
        }
        else {
            this.NonConflictCompose(other);
        }
    };
    FontData.prototype.ConflictCompose = function (other) {
        var _this = this;
        var flag = other.Flag;
        if ((flag & FontDataFlag.Color) === FontDataFlag.Color) {
            _this.Color.Compose(other.Color);
        }
        if ((flag & FontDataFlag.Size) === FontDataFlag.Size) {
            _this.Size = other.Size;
        }
        if ((flag & FontDataFlag.Name) === FontDataFlag.Name) {
            _this.Name = other.Name;
        }
        if ((flag & FontDataFlag.Family) === FontDataFlag.Family) {
            _this.Family = other.Family;
        }
        if ((flag & FontDataFlag.CharSet) === FontDataFlag.CharSet) {
            _this.CharSet = other.CharSet;
        }
        if ((flag & FontDataFlag.Scheme) === FontDataFlag.Scheme) {
            _this.Scheme = other.Scheme;
        }
        else if ((flag & FontDataFlag.Name) === FontDataFlag.Name) {
            _this.Scheme = drawingInterface_1.ThemeFont.None;
            flag &= ~FontDataFlag.Scheme;
        }
        if ((flag & FontDataFlag.Bold) === FontDataFlag.Bold) {
            _this.Bold = other.Bold;
        }
        if ((flag & FontDataFlag.Italic) === FontDataFlag.Italic) {
            _this.Italic = other.Italic;
        }
        if ((flag & FontDataFlag.Underline) === FontDataFlag.Underline) {
            _this.Underline = other.Underline;
        }
        if ((flag & FontDataFlag.Strike) === FontDataFlag.Strike) {
            _this.Strike = other.Strike;
        }
        if ((flag & FontDataFlag.VertAlign) === FontDataFlag.VertAlign) {
            _this.VertAlign = other.VertAlign;
        }
        if ((flag & FontDataFlag.Shadow) === FontDataFlag.Shadow) {
            _this.Shadow = other.Shadow;
        }
        if ((flag & FontDataFlag.Outline) === FontDataFlag.Outline) {
            _this.Outline = other.Outline;
        }
        if ((flag & FontDataFlag.Condense) === FontDataFlag.Condense) {
            _this.Condense = other.Condense;
        }
        if ((flag & FontDataFlag.Extend) === FontDataFlag.Extend) {
            _this.Extend = other.Extend;
        }
        _this.Flag |= flag;
    };
    FontData.prototype.NonConflictCompose = function (other) {
        var _this = this;
        var flag = _this.Flag;
        _this.Color.Compose(other.Color, false);
        if ((flag & FontDataFlag.Size) !== FontDataFlag.Size) {
            _this.Size = other.Size;
        }
        if ((flag & FontDataFlag.Name) !== FontDataFlag.Name) {
            _this.Name = other.Name;
        }
        if ((flag & FontDataFlag.Family) !== FontDataFlag.Family) {
            _this.Family = other.Family;
        }
        if ((flag & FontDataFlag.CharSet) !== FontDataFlag.CharSet) {
            _this.CharSet = other.CharSet;
        }
        if ((flag & FontDataFlag.Scheme) !== FontDataFlag.Scheme) {
            _this.Scheme = other.Scheme;
        }
        if ((flag & FontDataFlag.Bold) !== FontDataFlag.Bold) {
            _this.Bold = other.Bold;
        }
        if ((flag & FontDataFlag.Italic) !== FontDataFlag.Italic) {
            _this.Italic = other.Italic;
        }
        if ((flag & FontDataFlag.Underline) !== FontDataFlag.Underline) {
            _this.Underline = other.Underline;
        }
        if ((flag & FontDataFlag.Strike) !== FontDataFlag.Strike) {
            _this.Strike = other.Strike;
        }
        if ((flag & FontDataFlag.VertAlign) !== FontDataFlag.VertAlign) {
            _this.VertAlign = other.VertAlign;
        }
        if ((flag & FontDataFlag.Shadow) !== FontDataFlag.Shadow) {
            _this.Shadow = other.Shadow;
        }
        if ((flag & FontDataFlag.Outline) !== FontDataFlag.Outline) {
            _this.Outline = other.Outline;
        }
        if ((flag & FontDataFlag.Condense) !== FontDataFlag.Condense) {
            _this.Condense = other.Condense;
        }
        if ((flag & FontDataFlag.Extend) !== FontDataFlag.Extend) {
            _this.Extend = other.Extend;
        }
        _this.Flag |= other.Flag;
    };
    FontData.prototype.RemoveDuplicateStyle = function (other) {
        return this.Compare(other, false);
    };
    FontData.prototype.RemoveDifferentStyle = function (other) {
        return this.Compare(other, true);
    };
    FontData.prototype.Compare = function (other, removeDifferent) {
        var _this = this;
        var flag = _this.Flag, otherFlag = other.Flag, flags = [];
        var isChanged = false;
        var isDiff, shouldRemove;
        if ((flag & FontDataFlag.Color) === FontDataFlag.Color) {
            isDiff = (otherFlag & FontDataFlag.Color) !== FontDataFlag.Color;
            if (!isDiff) {
                if (removeDifferent) {
                    isChanged = _this.Color.RemoveDifferentStyle(other.Color);
                    isDiff = _this.Color.Flag === colorData_1.ColorDataFlag.None;
                }
                else {
                    isChanged = _this.Color.RemoveDuplicateStyle(other.Color);
                    isDiff = _this.Color.Flag !== colorData_1.ColorDataFlag.None;
                }
            }
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Color);
            }
        }
        if ((flag & FontDataFlag.Size) === FontDataFlag.Size) {
            isDiff = (otherFlag & FontDataFlag.Size) !== FontDataFlag.Size || _this.Size !== other.Size;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Size);
            }
        }
        if ((flag & FontDataFlag.Name) === FontDataFlag.Name) {
            isDiff = (otherFlag & FontDataFlag.Name) !== FontDataFlag.Name || _this.Name !== other.Name;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Name);
            }
        }
        if ((flag & FontDataFlag.Family) === FontDataFlag.Family) {
            isDiff = (otherFlag & FontDataFlag.Family) !== FontDataFlag.Family || _this.Family !== other.Family;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Family);
            }
        }
        if ((flag & FontDataFlag.CharSet) === FontDataFlag.CharSet) {
            isDiff = (otherFlag & FontDataFlag.CharSet) !== FontDataFlag.CharSet || _this.CharSet !== other.CharSet;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.CharSet);
            }
        }
        if ((flag & FontDataFlag.Scheme) === FontDataFlag.Scheme) {
            isDiff = (otherFlag & FontDataFlag.Scheme) !== FontDataFlag.Scheme || _this.Scheme !== other.Scheme;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Scheme);
            }
        }
        if ((flag & FontDataFlag.Bold) === FontDataFlag.Bold) {
            isDiff = (otherFlag & FontDataFlag.Bold) !== FontDataFlag.Bold || _this.Bold !== other.Bold;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Bold);
            }
        }
        if ((flag & FontDataFlag.Italic) === FontDataFlag.Italic) {
            isDiff = (otherFlag & FontDataFlag.Italic) !== FontDataFlag.Italic || _this.Italic !== other.Italic;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Italic);
            }
        }
        if ((flag & FontDataFlag.Underline) === FontDataFlag.Underline) {
            isDiff = (otherFlag & FontDataFlag.Underline) !== FontDataFlag.Underline || _this.Underline !== other.Underline;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Underline);
            }
        }
        if ((flag & FontDataFlag.Strike) === FontDataFlag.Strike) {
            isDiff = (otherFlag & FontDataFlag.Strike) !== FontDataFlag.Strike || _this.Strike !== other.Strike;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Strike);
            }
        }
        if ((flag & FontDataFlag.VertAlign) === FontDataFlag.VertAlign) {
            isDiff = (otherFlag & FontDataFlag.VertAlign) !== FontDataFlag.VertAlign || _this.VertAlign !== other.VertAlign;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.VertAlign);
            }
        }
        if ((flag & FontDataFlag.Shadow) === FontDataFlag.Shadow) {
            isDiff = (otherFlag & FontDataFlag.Shadow) !== FontDataFlag.Shadow || _this.Shadow !== other.Shadow;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(~FontDataFlag.Shadow);
            }
        }
        if ((flag & FontDataFlag.Outline) === FontDataFlag.Outline) {
            isDiff = (otherFlag & FontDataFlag.Outline) !== FontDataFlag.Outline || _this.Outline !== other.Outline;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Outline);
            }
        }
        if ((flag & FontDataFlag.Condense) === FontDataFlag.Condense) {
            isDiff = (otherFlag & FontDataFlag.Condense) !== FontDataFlag.Condense || _this.Condense !== other.Condense;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Condense);
            }
        }
        if ((flag & FontDataFlag.Extend) === FontDataFlag.Extend) {
            isDiff = (otherFlag & FontDataFlag.Extend) !== FontDataFlag.Extend || _this.Extend !== other.Extend;
            shouldRemove = removeDifferent ? isDiff : !isDiff;
            if (shouldRemove) {
                flags.push(FontDataFlag.Extend);
            }
        }
        var count = flags.length;
        if (count > 0) {
            isChanged = true;
            for (var i = 0; i < count; i++) {
                flag &= ~flags[i];
            }
        }
        _this.Flag = flag;
        return isChanged;
    };

    FontData.prototype.ClearFlag = function () {
        this.Color.ClearFlag();
        this.Flag = FontDataFlag.None;
    };
    FontData.prototype.SetFullFlag = function () {
        this.Color.SetFullFlag();
        this.Flag = FontDataFlag.All;
    };
    FontData.prototype.IsFullFlag = function () {
        if (this.Flag !== FontDataFlag.All) {
            return false;
        }
        return this.Color.IsFullFlag();
    };
    return FontData;
}());
exports.FontData = FontData;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/fontFormat.js':
/*!***********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/fontFormat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var stateful_1 = __webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js');
var ChartCommon = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var fillFormat_1 = __webpack_require__(/*! ./fillFormat */ './dist/plugins/floatingObject/drawing/fillFormat.js');
var fontData_1 = __webpack_require__(/*! ./fontData */ './dist/plugins/floatingObject/drawing/fontData.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var Types = Common_1.Common._Types, isEmptyObject = Types._isEmptyObject, ChartUtility = ChartCommon.ChartUtility, deleteFillItems = ChartUtility._deleteFillItems, ChartConstants = ChartCommon.ChartConstants, UnitHelper = ChartCommon.UnitHelper, isNullOrUndefined = UnitHelper.isNullOrUndefined;
var keyword_null = null, keyword_undefined = void 0;
var ReferenceText = (function () {
    function ReferenceText(drawing) {
        this._drawing = drawing;
    }
    Object.defineProperty(ReferenceText.prototype, 'Formula', {
        get: function () {
            return this.GetFormula(false);
        },
        set: function (value) {
            if (value !== this.Formula) {
                this.UpdateTextByFormulas(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReferenceText.prototype, 'FormulaR1C1', {
        get: function () {
            return this.GetFormula(true);
        },
        set: function (value) {
            if (value !== this.Formula) {
                this.UpdateTextByFormulas(value, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReferenceText.prototype, 'Parent', {
        get: function () {
            return this._drawing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReferenceText.prototype, 'ReferingText', {
        get: function () {
            return this.GetReferingText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReferenceText.prototype, 'Worksheet', {
        get: function () {
            return this._drawing.sheet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReferenceText.prototype, 'TextRefer', {
        get: function () {
            return this._textRefer;
        },
        set: function (value) {
            this.SetTextRefer(value);
        },
        enumerable: true,
        configurable: true
    });
    ReferenceText.prototype.SetTextRefer = function (value, updateFF) {
        if (updateFF === keyword_undefined) {
            updateFF = true;
        }
        this.SetTextReferInternal(value, updateFF);
        this.OnSetTextRefer(value);
    };
    ReferenceText.prototype.OnSetTextRefer = function (value) {
    };
    ReferenceText.prototype.GetReferingText = function () {
        var text = '';
        if (!isNullOrUndefined(this._textRefer)) {
            var txtList = this.GetTextList(this._textRefer);
            for (var _i = 0, txtList_1 = txtList; _i < txtList_1.length; _i++) {
                text += txtList_1[_i];
            }
        }
        return text;
    };
    ReferenceText.prototype.GetTextList = function (range) {
        var textList = [], worksheet = this.Worksheet;
        if (isNullOrUndefined(range.WorksheetName)) {
            range.WorksheetName = worksheet.name();
        }
        var sheet = worksheet._GetSheet(range.WorksheetName) ;
        for (var row = range.Row; row <= range.LastRow; row++) {
            for (var col = range.Column; col <= range.LastColumn; col++) {
                var txt = sheet._GetRange(row, col).Text;
                textList.push(!isNullOrUndefined(txt) ? txt : '');
            }
        }
        return textList;
    };
    ReferenceText.prototype.SetTextReferInternal = function (refer, updateFF) {
        this._textRefer = refer;
    };
    ReferenceText.prototype.GetFormula = function (r1c1) {
        if (r1c1 === keyword_undefined) {
            r1c1 = false;
        }
        var textRefer = this._textRefer;
        if (!textRefer) {
            return '';
        }
        var name = this.Worksheet.name();
        if (r1c1) {
            return textRefer.ToR1C1Text(name);
        }
        return textRefer.ToA1Text(0, 0, name);
    };
    ReferenceText.prototype.UpdateTextByFormulas = function (formula, r1c1) {
        if (r1c1 === keyword_undefined) {
            r1c1 = false;
        }
        var result = this.Worksheet._ParseFormula(formula, 0, 0, r1c1) ;
        var refers = result.references;
        this._textRefer = refers ? refers[0] : keyword_null;
    };
    return ReferenceText;
}());
exports.ReferenceText = ReferenceText;
var DrawingText = (function (_super) {
    __extends(DrawingText, _super);
    function DrawingText(drawing, parentFont, defaultText, fontDefaultOptions) {
        var _this_1 = _super.call(this, drawing) || this;
        if (parentFont === keyword_undefined) {
            parentFont = keyword_null;
        }
        if (defaultText === keyword_undefined) {
            defaultText = keyword_null;
        }
        if (fontDefaultOptions === keyword_undefined) {
            fontDefaultOptions = keyword_null;
        }
        var _this = _this_1;
        _this._textBody = keyword_null;
        _this._ooText = keyword_null;
        _this._defaultText = defaultText || '';
        _this._fontDefaultOptions = fontDefaultOptions;
        _this.InitRichTextFields(parentFont);
        return _this_1;
    }
    DrawingText.prototype.InitRichTextFields = function (parentFont) {
        var _this = this;
        var newTextBody = new DrawingTextBody(_this._drawing, _this._fontDefaultOptions);
        if (!isNullOrUndefined(_this._textBody)) {
            _this._textBody.Font.SetParentForChildren(newTextBody.Font);
        }
        _this._textBody = newTextBody;
        _this._textBody.Font.ParentStateful = parentFont;
        if (!isNullOrUndefined(_this._defaultText)) {
            _this._textBody.AddParagraph(_this._defaultText);
        }
    };
    Object.defineProperty(DrawingText.prototype, 'TextBody', {
        get: function () {
            return this._textBody;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingText.prototype, 'Font', {
        get: function () {
            return this._textBody.Font;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingText.prototype, 'Text', {
        get: function () {
            if (!isNullOrUndefined(this.TextRefer)) {
                return this.ReferingText;
            }
            return this._textBody.Text;
        },
        set: function (value) {
            this.SetTextInternal(value);
        },
        enumerable: true,
        configurable: true
    });
    DrawingText.prototype.SetTextInternal = function (value) {
        this.SetTextReferInternal(keyword_null);
        this.UpdateTextBody(value);
    };
    DrawingText.prototype.UpdateTextBody = function (text) {
        this._textBody.Clear();
        var actualText = !isNullOrUndefined(text) ? text : this._defaultText;
        if (!isNullOrUndefined(actualText)) {
            this._textBody.AddParagraph(actualText);
        }
    };
    DrawingText.prototype.OnSetTextRefer = function (value) {
        _super.prototype.OnSetTextRefer.call(this, value);
        this.UpdateTextBody(keyword_null);
    };
    DrawingText.prototype.FromOOModel = function (ooText ) {
        var _this = this;
        _this._ooText = ooText;
        _this.InitRichTextFields(_this._textBody.Font.ParentStateful);
        if (!isNullOrUndefined(ooText.rich)) {
            _this._textBody.FromOOModel(ooText.rich);
        }
        if (!isNullOrUndefined(ooText.strRef) && ooText.strRef.f) {
            _this.UpdateTextByFormulas(ooText.strRef.f);
        }
    };
    DrawingText.prototype.ToOOModel = function (is2016Chart) {
        var _this = this;
        var ooText = !isNullOrUndefined(_this._ooText) ? _this._ooText : {};
        if (!isNullOrUndefined(_this._textRefer)) {
            ooText.strRef = {
                f: _this.Formula
            };
            ooText.rich = _this._textBody.ToOOModel(is2016Chart);
        }
        else {
            ooText.rich = this._textBody.ToOOModel(is2016Chart);
        }
        return ooText;
    };
    DrawingText.prototype.SetParagraphSplitFlag = function (split) {
        var textBody = this._textBody;
        for (var i = 0, textBodyCount = textBody.Count; i < textBodyCount; i++) {
            textBody.Get(i).SplitSpaceFlag = split;
        }
    };
    DrawingText.prototype.UpdateFiledElementTextLink = function (textlink) {
        var textBody = this._textBody;
        for (var i = 0, textBodyCount = textBody.Count; i < textBodyCount; i++) {
            var paragraph = textBody.Get(i);
            for (var j = 0, paragraphCount = paragraph.Count; j < paragraphCount; j++) {
                var textField = paragraph.Get(j);
                if (isNullOrUndefined(textField) || textField.Type !== drawingInterface_1.TextFieldType.TxLink) {
                    continue;
                }
                textField.UpdateTextByFormulas(textlink);
                return;
            }
        }
    };
    return DrawingText;
}(ReferenceText));
exports.DrawingText = DrawingText;
var FontFormatStates = {
    Bold: 1,
    Color: 2,
    Italic: 4,
    Name: 8,
    OutlineFont: 16,
    Shadow: 32,
    Size: 64,
    Strikethrough: 128,
    Subscript: 256,
    Superscript: 512,
    ThemeFont: 1024,
    Underline: 2048
};
var FontFormat = (function (_super) {
    __extends(FontFormat, _super);
    function FontFormat(context, parent, defaults) {
        var _this_1 = this;
        if (parent === keyword_undefined) {
            parent = keyword_null;
        }
        if (defaults === keyword_undefined) {
            defaults = keyword_null;
        }
        _this_1 = _super.call(this, parent) || this;
        var _this = _this_1;
        _this._themeFont = drawingInterface_1.ThemeFont.None;
        _this._eaFontName = keyword_null;
        _this._latinFontName = keyword_null;
        _this._csFontName = keyword_null;
        _this._context = context;
        _this._fill = new fillFormat_1.FillFormat(context, parent && parent.FillInternal);
        _this._parent = parent;
        if (defaults) {
            if (!isNullOrUndefined(defaults.Size)) {
                _this._size = defaults.Size;
            }
            if (!isNullOrUndefined(defaults.Bold)) {
                _this._bold = defaults.Bold;
            }
        }
        return _this;
    }
    Object.defineProperty(FontFormat.prototype, 'Bold', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.GetState(FontFormatStates.Bold)) {
                return parent.Bold;
            }
            return this._bold;
        },
        set: function (value) {
            this._bold = value;
            this.SetState(FontFormatStates.Bold, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'Color', {
        get: function () {
            return this.FillInternal.Color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'Italic', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.GetState(FontFormatStates.Italic)) {
                return parent.Italic;
            }
            return this._italic;
        },
        set: function (value) {
            this._italic = value;
            this.SetState(FontFormatStates.Italic, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'Name', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.HasOwnFont()) {
                return parent.Name;
            }
            return this.GetOwnFont();
        },
        set: function (value) {
            this.SetFont(value);
            this.ClearOOFontNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'Size', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.GetState(FontFormatStates.Size)) {
                return parent.Size;
            }
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this.SetState(FontFormatStates.Size, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'Strikethrough', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.GetState(FontFormatStates.Strikethrough)) {
                return parent.Strikethrough;
            }
            return this._strikethrough;
        },
        set: function (value) {
            this._strikethrough = value;
            this.SetState(FontFormatStates.Strikethrough, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'Subscript', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.GetState(FontFormatStates.Subscript)) {
                return parent.Subscript;
            }
            return this._subscript;
        },
        set: function (value) {
            this._subscript = value;
            this.SetState(FontFormatStates.Subscript, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'Superscript', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.GetState(FontFormatStates.Superscript)) {
                return parent.Superscript;
            }
            return this._superscript;
        },
        set: function (value) {
            this._superscript = value;
            this.SetState(FontFormatStates.Superscript, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'Underline', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.GetState(FontFormatStates.Underline)) {
                return parent.Underline;
            }
            return this._underline;
        },
        set: function (value) {
            this._underline = value;
            this.SetState(FontFormatStates.Underline, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontFormat.prototype, 'ThemeFont', {
        get: function () {
            var parent = this._parent;
            if (parent && !this.GetState(FontFormatStates.ThemeFont)) {
                return parent.ThemeFont;
            }
            return this._themeFont;
        },
        set: function (value) {
            this.SetThemeFont(value);
            this.ClearOOFontNames();
        },
        enumerable: true,
        configurable: true
    });
    FontFormat.prototype.IsDirtyIncludingParent = function (includingParent) {
        if (this._fill && this._fill.IsDirtyIncludingParent(includingParent)) {
            return true;
        }
        return _super.prototype.IsDirtyIncludingParent.call(this, includingParent);
    };
    FontFormat.prototype.HasOwnFont = function () {
        return this.IsDirty(FontFormatStates.Name) || this.IsDirty(FontFormatStates.ThemeFont);
    };
    FontFormat.prototype.OnParentChanged = function (newParent) {
        this._parent = newParent;
        if (this._fill) {
            this._fill.ParentStateful = newParent && newParent.FillInternal;
        }
    };
    FontFormat.prototype.GetOwnFont = function () {
        if (this._themeFont === drawingInterface_1.ThemeFont.None) {
            return this._name;
        }
        return this._context._ToFont(this._themeFont);
    };
    FontFormat.prototype.SetFont = function (value) {
        var _this = this;
        if (value === ChartConstants.CHART_CS_HEAD_FONT ||
            value === ChartConstants.CHART_EA_HEAD_FONT ||
            value === ChartConstants.CHART_LATIN_HEAD_FONT) {
            _this.SetThemeFont(drawingInterface_1.ThemeFont.Major);
        }
        else if (value === ChartConstants.CHART_CS_BODY_FONT ||
            value === ChartConstants.CHART_EA_BODY_FONT ||
            value === ChartConstants.CHART_LATIN_BODY_FONT) {
            _this.SetThemeFont(drawingInterface_1.ThemeFont.Minor);
        }
        else {
            _this._name = value;
            _this.SetState(FontFormatStates.Name, true);
            _this._themeFont = drawingInterface_1.ThemeFont.None;
            _this.SetState(FontFormatStates.ThemeFont, false);
        }
    };
    FontFormat.prototype.SetThemeFont = function (value) {
        var _this = this;
        _this._themeFont = value;
        _this.SetState(FontFormatStates.ThemeFont, true);
        _this._name = keyword_null;
        _this.SetState(FontFormatStates.Name, false);
    };
    FontFormat.prototype.ClearOOFontNames = function () {
        this._latinFontName = keyword_null;
        this._csFontName = keyword_null;
        this._eaFontName = keyword_null;
    };
    FontFormat.prototype.GetActualFormat = function () {
        var _this = this;
        var fontFormat = new FontFormat(_this._context);

        for (var prop in FontFormatStates) {
            var state = FontFormatStates[prop];
            if (this.IsDirty(state)) {
                switch (state) {
                    case FontFormatStates.Bold:
                        fontFormat.Bold = this.Bold;
                        break;


                    case FontFormatStates.Italic:
                        fontFormat.Italic = this.Italic;
                        break;
                    case FontFormatStates.Name:
                        fontFormat.Name = this.Name;
                        break;


                    case FontFormatStates.Size:
                        fontFormat.Size = this.Size;
                        break;
                    case FontFormatStates.Strikethrough:
                        fontFormat.Strikethrough = this.Strikethrough;
                        break;
                    case FontFormatStates.Subscript:
                        fontFormat.Superscript = this.Superscript;
                        break;
                    case FontFormatStates.Superscript:
                        fontFormat.Subscript = this.Subscript;
                        break;
                    case FontFormatStates.ThemeFont:
                        fontFormat.ThemeFont = this.ThemeFont;
                        break;
                    case FontFormatStates.Underline:
                        fontFormat.Underline = this.Underline;
                        break;
                }
            }
        }
        return fontFormat;
    };
    Object.defineProperty(FontFormat.prototype, 'FillInternal', {
        get: function () {
            var _this = this;
            if (!_this._fill) {
                _this._fill = new fillFormat_1.FillFormat(_this._context, _this._parent && _this._parent.FillInternal);
            }
            return _this._fill;
        },
        enumerable: true,
        configurable: true
    });


    FontFormat.prototype.TextCharacterProperties_FromOOModel = function (chProperties ) {
        var _this = this;
        _this.SuspendClearChildrenState();
        _this._ooTextCharacterProps = chProperties;
        if (!isNullOrUndefined(chProperties.latin)) {
            _this._latinFontName = chProperties.latin.typeface;
        }
        if (!isNullOrUndefined(chProperties.ea)) {
            _this._eaFontName = chProperties.ea.typeface;
        }
        if (!isNullOrUndefined(chProperties.cs)) {
            _this._csFontName = chProperties.cs.typeface;
        }
        if (_this._latinFontName) {
            _this.SetFont(_this._latinFontName);
        }
        else if (_this._eaFontName) {
            _this.SetFont(_this._eaFontName);
        }
        else if (_this._csFontName) {
            _this.SetFont(_this._csFontName);
        }
        if (!isNullOrUndefined(chProperties.sz)) {
            var size = chProperties.sz;

            if (_this._size !== size) {
                _this.Size = size;
            }
        }
        else {

        }
        if (!isNullOrUndefined(chProperties.b)) {
            _this.Bold = chProperties.b;
        }
        if (!isNullOrUndefined(chProperties.i)) {
            _this.Italic = chProperties.i;
        }
        if (!isNullOrUndefined(chProperties.strike)) {
            _this.Strikethrough = chProperties.strike === drawingInterface_1.ST_TextStrikeType.sngStrike || chProperties.strike === drawingInterface_1.ST_TextStrikeType.dblStrike;
        }
        if (!isNullOrUndefined(chProperties.u)) {
            _this.Underline = chProperties.u;
        }
        if (!isNullOrUndefined(chProperties.baseline) && chProperties.baseline !== 0) {
            _this.Subscript = true;
        }
        else {
            _this.Subscript = false;
        }
        if (!isNullOrUndefined(chProperties.solidFill)) {
            _this.FillInternal.FromOOModel(chProperties.solidFill, drawingInterface_1.ColorFillType.SolidColorFillProperties);
        }
        else if (!isNullOrUndefined(chProperties.noFill)) {
            _this.FillInternal.Color.ColorType = drawingInterface_1.SolidColorType.None;
        }
        else if (!isNullOrUndefined(chProperties.blipFill)) {
            _this.FillInternal.FromOOModel(chProperties.blipFill, drawingInterface_1.ColorFillType.BlipFillProperties);
        }
        else if (!isNullOrUndefined(chProperties.gradFill)) {
            _this.FillInternal.FromOOModel(chProperties.gradFill, drawingInterface_1.ColorFillType.GradientFillProperties);
        }
        else if (!isNullOrUndefined(chProperties.pattFill)) {
            _this.FillInternal.FromOOModel(chProperties.pattFill, drawingInterface_1.ColorFillType.PatternFillProperties);
        }
        else {
            _this.SetFillField(keyword_null);
        }
        _this.ResumeClearChilrenState();
    };
    FontFormat.prototype.AdjustStateful = function (currentValue, newValue) {
        if (!isNullOrUndefined(currentValue)) {
            currentValue.SetParentForChildren(newValue);
            if (!isNullOrUndefined(newValue)) {
                newValue.ParentStateful = currentValue.ParentStateful;
            }
            currentValue.ParentStateful = keyword_null;
        }
    };
    FontFormat.prototype.SetFillField = function (value) {
        this.AdjustStateful(this._fill, value);
        this._fill = value;
    };
    FontFormat.prototype.TextCharacterProperties_ToOOModel = function () {
        var _this = this;
        if (!_this.IsDirtyIncludingParent(true)) {
            return {} ;
        }
        var ooModel = _this._ooTextCharacterProps || {} ;
        if (_this.IsPropDirtyIncludingParent(FontFormatStates.Name, true)) {
            var name_1 = _this.Name;
            if (isNullOrUndefined(ooModel.latin)) {
                ooModel.latin = {} ;
            }
            ooModel.latin.typeface = name_1;
        }
        else if (_this.IsPropDirtyIncludingParent(FontFormatStates.ThemeFont, true) &&
            _this.ThemeFont !== drawingInterface_1.ThemeFont.None) {
            if (isNullOrUndefined(ooModel.latin)) {
                ooModel.latin = {} ;
            }
            ooModel.latin.typeface = _this.ThemeFont === drawingInterface_1.ThemeFont.Major ?
                ChartConstants.CHART_LATIN_HEAD_FONT : ChartConstants.CHART_LATIN_BODY_FONT;
        }
        else if (_this._latinFontName ||
            _this._eaFontName ||
            _this._csFontName) {
            if (_this._latinFontName) {
                if (isNullOrUndefined(ooModel.latin)) {
                    ooModel.latin = {} ;
                }
                ooModel.latin.typeface = _this._latinFontName;
            }
            if (_this._eaFontName) {
                if (isNullOrUndefined(ooModel.ea)) {
                    ooModel.ea = {} ;
                }
                ooModel.ea.typeface = _this._eaFontName;
            }
            if (_this._csFontName) {
                if (isNullOrUndefined(ooModel.cs)) {
                    ooModel.cs = {} ;
                }
                ooModel.cs.typeface = _this._csFontName;
            }
        }


        if (_this.IsPropDirtyIncludingParent(FontFormatStates.Size, true) && _this.Size > 1) {
            ooModel.sz = _this.Size;
        }
        else {
            delete ooModel.sz;
        }
        if (_this.IsPropDirtyIncludingParent(FontFormatStates.Bold, true)) {
            ooModel.b = _this.Bold;
        }
        if (_this.IsPropDirtyIncludingParent(FontFormatStates.Italic, true)) {
            ooModel.i = _this.Italic;
        }
        if (_this.IsPropDirtyIncludingParent(FontFormatStates.Strikethrough, true)) {
            ooModel.strike = _this.Strikethrough ? drawingInterface_1.ST_TextStrikeType.sngStrike : drawingInterface_1.ST_TextStrikeType.noStrike;
        }
        if (_this.IsPropDirtyIncludingParent(FontFormatStates.Underline, true)) {
            ooModel.u = _this.Underline;
        }
        if (_this.Subscript && isNullOrUndefined(ooModel.baseline)) {
            ooModel.baseline = -25000;
        }
        else if (_this.Superscript && isNullOrUndefined(ooModel.baseline)) {
            ooModel.baseline = 30000;
        }
        else if (!_this.Subscript && !_this.Superscript) {
            delete ooModel.baseline;
        }
        deleteFillItems(ooModel);
        if (!isNullOrUndefined(_this._fill) && _this._fill.IsDirtyIncludingParent(true)) {
            var fill = _this._fill.ToOOModel(), colorFillType = fill.colorFillType;
            if (colorFillType === drawingInterface_1.ColorFillType.SolidColorFillProperties) {
                ooModel.solidFill = fill;
            }
            else if (colorFillType === drawingInterface_1.ColorFillType.PatternFillProperties) {
                ooModel.pattFill = fill;
            }
            else if (colorFillType === drawingInterface_1.ColorFillType.GradientFillProperties) {
                ooModel.gradFill = fill;
            }
            else if (colorFillType === drawingInterface_1.ColorFillType.BlipFillProperties) {
                ooModel.blipFill = fill;
            }
            else if (colorFillType === drawingInterface_1.ColorFillType.NoFillProperties) {
                ooModel.noFill = true;
            }
            delete fill.colorFillType;
        }
        return ooModel;
    };
    FontFormat.prototype.FromOOModel = function (font) {
        var _this = this;
        _this.Bold = font.Bold;
        _this.Italic = font.Italic;
        _this.Name = font.Name;
        if (font.Scheme !== drawingInterface_1.ThemeFont.None) {
            _this.ThemeFont = font.Scheme;
        }
        _this.Size = font.Size;
        _this.Underline = ChartUtility.ConvertToTextUnderlineType(font.Underline);
        _this.Strikethrough = font.Strike;
        _this.Subscript = (font.VertAlign & drawingInterface_1.VertAlignType.Subscript) === drawingInterface_1.VertAlignType.Subscript;
        _this.Superscript = (font.VertAlign & drawingInterface_1.VertAlignType.Superscript) === drawingInterface_1.VertAlignType.Superscript;
        _this.FillInternal.ColorInternal.ColorData_FromOOModel(font.Color);
    };
    FontFormat.prototype.ToOOModel = function () {
        var _this = this;
        var fontData = new fontData_1.FontData();
        fontData.Bold = _this.Bold;
        fontData.Italic = _this.Italic;
        fontData.Name = _this.Name;
        fontData.Scheme = _this.ThemeFont;
        fontData.Size = _this.Size;
        fontData.Underline = ChartUtility.ToUnderlineType(_this.Underline);
        fontData.Strike = _this.Strikethrough;
        if (_this.Subscript) {
            fontData.VertAlign = drawingInterface_1.VertAlignType.Subscript;
        }
        else if (_this.Superscript) {
            fontData.VertAlign = drawingInterface_1.VertAlignType.Superscript;
        }
        var fill = _this._fill;
        if (fill && fill.ColorInternal.IsDirtyIncludingParent(true) && fill.ColorInternal.ColorType !== drawingInterface_1.SolidColorType.None) {
            fontData.Color = fill.ColorInternal.ColorData_ToOOModel();
        }
        return fontData;
    };
    return FontFormat;
}(stateful_1.StatefullBase));
exports.FontFormat = FontFormat;

var DrawingTextElement = (function () {
    function DrawingTextElement(context, textParagraph) {
        var _this = this;
        _this._context = context;
        _this._textParagraph = textParagraph;
        _this._font = new FontFormat(context);
        _this._font.ParentStateful = textParagraph.Font;
    }
    Object.defineProperty(DrawingTextElement.prototype, 'Font', {
        get: function () {
            return this._font;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingTextElement.prototype, 'Text', {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingTextElement.prototype, 'IsCustomText', {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    DrawingTextElement.prototype.Delete = function () {
        this._textParagraph.DeleteElement(this);
        this._textParagraph = keyword_null;
    };
    DrawingTextElement.prototype.FromOOModel = function (t) {
    };
    DrawingTextElement.prototype.ToOOModel = function () {
    };
    return DrawingTextElement;
}());
exports.DrawingTextElement = DrawingTextElement;
var DrawingTextRun = (function (_super) {
    __extends(DrawingTextRun, _super);
    function DrawingTextRun(context, text, textParagraph) {
        var _this_1 = _super.call(this, context, textParagraph) || this;
        var _this = _this_1;
        _this._ooTextRun = keyword_null;
        _this._text = text;
        _this._context = context;
        _this.elementType = drawingInterface_1.TextParagraphElementType.RegularTextRun;
        return _this_1;
    }
    Object.defineProperty(DrawingTextRun.prototype, 'Text', {
        get: function () {
            return this._text;
        },
        set: function (value) {
            this._text = value;
        },
        enumerable: true,
        configurable: true
    });
    DrawingTextRun.prototype.FromOOModel = function (t ) {
        var _this = this;
        _this._ooTextRun = t;
        _this._text = t.t;
        if (!isNullOrUndefined(t.rPr)) {
            _this._font.TextCharacterProperties_FromOOModel(t.rPr);
        }
        else {
            _this._font = new FontFormat(_this._context, _this._font.ParentStateful);
        }
    };
    DrawingTextRun.prototype.ToOOModel = function () {
        var ooModel = this._ooTextRun || {
            elementType: drawingInterface_1.TextParagraphElementType.RegularTextRun
        } ;
        ooModel.t = this.Text;
        ooModel.rPr = this._font.TextCharacterProperties_ToOOModel();
        return ooModel;
    };
    return DrawingTextRun;
}(DrawingTextElement));
exports.DrawingTextRun = DrawingTextRun;
var DrawingTextField = (function (_super) {
    __extends(DrawingTextField, _super);
    function DrawingTextField(context, type, paragraph) {
        var _this_1 = _super.call(this, context, paragraph) || this;
        var _this = _this_1;
        _this._type = type;
        _this._drawing = context;
        _this._referenceText = new ReferenceText(_this._drawing);
        _this.elementType = drawingInterface_1.TextParagraphElementType.TextField;
        return _this_1;
    }
    Object.defineProperty(DrawingTextField.prototype, 'Type', {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingTextField.prototype, 'Text', {
        get: function () {
            if (this.Type === drawingInterface_1.TextFieldType.TxLink) {
                return this._referenceText.ReferingText;
            }
            return ChartUtility.GetTextFieldTypeText(this.Type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingTextField.prototype, 'Worksheet', {
        get: function () {
            return this._drawing && this._drawing.Parent;
        },
        enumerable: true,
        configurable: true
    });
    DrawingTextField.prototype.FromOOModel = function (t ) {
        var _this = this;
        _this._ooModel = t;
        _this.Type = ChartUtility.GetTextFieldType(t.type);
        if (!isNullOrUndefined(t.rPr)) {
            _this._font.TextCharacterProperties_FromOOModel(t.rPr);
        }
        else {
            _this._font = new FontFormat(_this._context, _this._font.ParentStateful);
        }
    };
    DrawingTextField.prototype._getRandomFId = function () {
        var randomStr = '{' + this._getRandom36Binary(8) + '-' + this._getRandom36Binary(4) + '-' + this._getRandom36Binary(4) + '-' + this._getRandom36Binary(4) + '-' + this._getRandom36Binary(12) + '}';
        return randomStr.toUpperCase();
    };

    DrawingTextField.prototype._getRandom36Binary = function (sliceNumber) {
        return Math.random().toString(16).slice(-sliceNumber);
    };
    DrawingTextField.prototype.ToOOModel = function () {
        var _this = this;
        var ooModel = _this._ooModel || {
            elementType: drawingInterface_1.TextParagraphElementType.TextField
        } ;
        var reg = /{[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}}/;
        if (isNullOrUndefined(ooModel.id) || (ooModel.id && !reg.test(ooModel.id))) {
            ooModel.id = this._getRandomFId();
        }
        ooModel.type = ChartUtility.GetTextFieldTypeString(_this.Type);
        if (isNullOrUndefined(ooModel.rPr)) {
            ooModel.rPr = {} ;
        }
        ooModel.rPr = _this._font.TextCharacterProperties_ToOOModel();
        ooModel.t = _this.Text;
        return ooModel;
    };
    DrawingTextField.prototype.UpdateTextByFormulas = function (formula, r1c1) {
        this._referenceText.UpdateTextByFormulas(formula, r1c1);
    };
    return DrawingTextField;
}(DrawingTextElement));
exports.DrawingTextField = DrawingTextField;
var DrawingLineBreak = (function (_super) {
    __extends(DrawingLineBreak, _super);
    function DrawingLineBreak(context, paragraph) {
        var _this_1 = _super.call(this, context, paragraph) || this;
        _this_1.elementType = drawingInterface_1.TextParagraphElementType.TextLineBreak;
        return _this_1;
    }
    Object.defineProperty(DrawingLineBreak.prototype, 'Text', {
        get: function () {
            return '\r\n';
        },
        enumerable: true,
        configurable: true
    });
    DrawingLineBreak.prototype.FromOOModel = function (t ) {
        this._ooModel = t;
    };
    DrawingLineBreak.prototype.ToOOModel = function () {
        return this._ooModel || {
            elementType: drawingInterface_1.TextParagraphElementType.TextLineBreak
        };
    };
    return DrawingLineBreak;
}(DrawingTextElement));
exports.DrawingLineBreak = DrawingLineBreak;
var DrawingTextParagraph = (function () {
    function DrawingTextParagraph(context, textBody) {
        var _this = this;
        _this._ooTextPara = keyword_null;
        _this._splitSpaceFlag = ' ';
        _this._context = context;
        _this._textBody = textBody;
        _this._font = new FontFormat(context);
        _this._font.ParentStateful = _this._textBody.Font;
        _this._elements = [];
    }
    Object.defineProperty(DrawingTextParagraph.prototype, 'SplitSpaceFlag', {
        get: function () {
            return this._splitSpaceFlag;
        },
        set: function (value) {
            this._splitSpaceFlag = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingTextParagraph.prototype, 'Text', {
        get: function () {
            var text = '';
            for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
                var r = _a[_i];


                if (!isNullOrUndefined(r.Text)) {
                    text += r.Text;
                }
            }
            return text;
        },
        set: function (value) {
            this.Clear();
            this.AddRun(value);
        },
        enumerable: true,
        configurable: true
    });
    DrawingTextParagraph.prototype.Get = function (index) {
        return this._elements[index];
    };
    Object.defineProperty(DrawingTextParagraph.prototype, 'Count', {
        get: function () {
            return this._elements.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingTextParagraph.prototype, 'Font', {
        get: function () {
            return this._font;
        },
        enumerable: true,
        configurable: true
    });


    DrawingTextParagraph.prototype.AddRun = function (text, index) {
        return this.AddRunInternal(text, index);
    };
    DrawingTextParagraph.prototype.AddField = function (type) {
        return this.AddFieldInternal(type);
    };
    DrawingTextParagraph.prototype.Clear = function () {
        for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
            var item = _a[_i];
            item.Font.ParentStateful = keyword_null;
        }
        this._elements.length = 0;
    };
    DrawingTextParagraph.prototype.FromOOModel = function (t ) {
        var _this = this;
        _this._ooTextPara = t;
        if (t.pPr && t.pPr.defRPr) {
            _this._font.TextCharacterProperties_FromOOModel(t.pPr.defRPr);
        }
        if (t.elements) {
            var totalCount = t.elements.length;
            var elements = _this._elements = [];
            var context = _this._context;
            for (var i = 0; i < totalCount; i++) {
                var item = t.elements[i];
                var elementType = item.elementType;
                var newItem = void 0;
                if (elementType === drawingInterface_1.TextParagraphElementType.RegularTextRun) {
                    newItem = new DrawingTextRun(context, (item ).t, _this);
                }
                else if (elementType === drawingInterface_1.TextParagraphElementType.TextLineBreak) {
                    newItem = new DrawingLineBreak(context, _this);
                }
                else if (elementType === drawingInterface_1.TextParagraphElementType.TextField) {
                    newItem = new DrawingTextField(context, ChartUtility.GetTextFieldType((item ).type), _this);
                }
                if (newItem) {
                    newItem.FromOOModel(item );
                    elements.push(newItem);
                }
            }
        }
    };
    DrawingTextParagraph.prototype.AddRunInternal = function (text, index) {
        var _this = this;
        if (index === keyword_undefined) {
            index = -1;
        }
        var run = new DrawingTextRun(_this._context, text, _this);
        var elements = this._elements;
        if (index < 0 || index >= elements.length) {
            elements.push(run);
        }
        else {
            elements.splice(index, 0, run);
        }
        return run;
    };
    DrawingTextParagraph.prototype.AddFieldInternal = function (type) {
        var fld = new DrawingTextField(this._context, type, this);
        this._elements.push(fld);
        return fld;
    };
    DrawingTextParagraph.prototype.ToOOModel = function () {
        var _this = this;
        var ooModel = _this._ooTextPara || { elements: [] } ;
        if (!ooModel.pPr) {
            ooModel.pPr = {} ;
        }
        var pPr = ooModel.pPr;
        if (!isNullOrUndefined(_this._font)) {
            pPr.defRPr = _this._font.TextCharacterProperties_ToOOModel();
        }
        var ooModelElements = ooModel.elements = [];
        for (var i = 0, elements = _this._elements, count = elements.length; i < count; i++) {
            ooModelElements.push(elements[i].ToOOModel());
        }
        if ((_this._context.DrawingType === drawingInterface_1.DrawingType.Chart || isNullOrUndefined(_this._ooTextPara)) &&
            isNullOrUndefined(ooModel.endParaRPr)) {
            ooModel.endParaRPr = {} ;
        }
        return ooModel;
    };
    DrawingTextParagraph.prototype.To2016ChartOOModel = function () {
        var _this = this;
        var ooModel = _this._ooTextPara || { elements: [] } ;
        if (!ooModel.pPr) {
            ooModel.pPr = {} ;
        }
        var pPr = ooModel.pPr;
        if (!isNullOrUndefined(_this._font)) {
            pPr.defRPr = _this._font.TextCharacterProperties_ToOOModel();
        }
        var ooModelElements = ooModel.elements = [];
        for (var i = 0, elements = _this._elements, count = elements.length; i < count; i++) {
            ooModelElements.push(elements[i].ToOOModel());
        }
        if (!isNullOrUndefined(_this._font)) {
            ooModel.endParaRPr = _this._font.TextCharacterProperties_ToOOModel();
        }
        return ooModel;
    };


    DrawingTextParagraph.prototype.Delete = function () {
        var _this = this;
        for (var i = _this._elements.length - 1; i >= 0; i--) {
            _this.DeleteElement(_this._elements[i]);
        }
        _this._textBody.DeleteParagraph(_this);
        _this._textBody = keyword_null;
    };
    DrawingTextParagraph.prototype.DeleteElement = function (element) {
        element.Font.ParentStateful = keyword_null;
        var index = this._elements.indexOf(element);
        if (index >= 0) {
            this._elements.splice(index, 1);
        }
    };
    return DrawingTextParagraph;
}());
exports.DrawingTextParagraph = DrawingTextParagraph;
var DrawingTextBody = (function () {
    function DrawingTextBody(context, fontDefaultOptions) {
        this._paragraphs = [];
        this._ooTextBody = keyword_null;
        this._context = context;
        this._fontDefaultOptions = fontDefaultOptions;
        this._font = new FontFormat(context, keyword_null, fontDefaultOptions);
        this._rotation = undefined;
    }
    Object.defineProperty(DrawingTextBody.prototype, 'Text', {
        get: function () {
            var text = '';
            for (var _i = 0, _a = this._paragraphs; _i < _a.length; _i++) {
                var p = _a[_i];
                if (text !== '') {
                    text += '\r\n';
                }
                text += p.Text;
            }
            return text;
        },
        set: function (value) {
            this.Clear();
            this.AddParagraph(value);
        },
        enumerable: true,
        configurable: true
    });
    DrawingTextBody.prototype.Get = function (index) {
        return this._paragraphs[index];
    };
    Object.defineProperty(DrawingTextBody.prototype, 'Count', {
        get: function () {
            return this._paragraphs.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingTextBody.prototype, 'Font', {
        get: function () {
            return this._font;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingTextBody.prototype, 'Rotation', {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            this._rotation = value;
        },
        enumerable: true,
        configurable: true
    });


    DrawingTextBody.prototype.setFontColor = function (sheet, colorString) {
        var _this = this, paragraphLength = _this._paragraphs.length;
        if (_this._font) {
            _this._font.Color.setColor(sheet, colorString);
        }
        for (var i = 0; i < paragraphLength; i++) {
            _this._paragraphs[i].Font.Color.setColor(sheet, colorString);
        }
    };
    DrawingTextBody.prototype.setFontTransparency = function (transparency) {
        var _this = this, paragraphLength = _this._paragraphs.length;
        if (_this._font) {
            _this._font.Color.Transparency = transparency;
        }
        for (var i = 0; i < paragraphLength; i++) {
            _this._paragraphs[i].Font.Color.Transparency = transparency;
        }
    };
    DrawingTextBody.prototype.updateFont = function (name, size, bold, italic) {
        var _this = this;
        var fonts = [_this._font];
        _this._paragraphs.forEach(function (p) {
            fonts.push(p.Font);
        });
        fonts.forEach(function (font) {
            if (font) {
                font.Name = name;
                font.Size = size;
                font.Bold = bold;
                font.Italic = italic;
            }
        });
    };
    DrawingTextBody.prototype.AddParagraph = function (text, index) {
        if (index === keyword_undefined) {
            index = -1;
        }
        var paragraph = new DrawingTextParagraph(this._context, this);
        if (!isNullOrUndefined(text)) {
            paragraph.AddRun(text);
        }
        var paragraphs = this._paragraphs;
        if (index < 0 || index >= paragraphs.length) {
            paragraphs.push(paragraph);
        }
        else {
            paragraphs.splice(index, 0, paragraph);
        }
        return paragraph;
    };
    DrawingTextBody.prototype.Clear = function () {
        for (var _i = 0, _a = this._paragraphs; _i < _a.length; _i++) {
            var item = _a[_i];
            item.Font.ParentStateful = keyword_null;
        }
        this._paragraphs.length = 0;
    };
    DrawingTextBody.prototype.ToOOModel = function (is2016Chart) {
        var _this = this;
        var ooModel = _this._ooTextBody || { p: [] } ;
        var paragraphs = this._paragraphs, count = paragraphs.length;
        if (count === 0 && !this._font.IsDirtyIncludingParent()) {
            return keyword_null;
        }
        var ps = ooModel.p = [];
        if (count > 0) {
            for (var _i = 0; _i < count; _i++) {
                var p = paragraphs[_i];
                ps.push(is2016Chart ? p.To2016ChartOOModel() : p.ToOOModel());
            }
        }
        else {
            var defaultP = new DrawingTextParagraph(_this._context, _this);

            var defaultOOPModel = defaultP.ToOOModel();
            defaultOOPModel.pPr.defRPr = _this._font.TextCharacterProperties_ToOOModel();
            ps.push(defaultOOPModel);
        }
        if (isNullOrUndefined(ooModel.bodyPr)) {
            ooModel.bodyPr = {} ;
        }
        var rot = this.Rotation;
        if (!isNullOrUndefined(rot)) {
            ooModel.bodyPr.rot = rot;
        }
        if (isNullOrUndefined(ooModel.lstStyle)) {
            ooModel.lstStyle = {} ;
        }
        return ooModel;
    };
    DrawingTextBody.prototype.FromOOModel = function (t ) {
        var _this = this;
        _this._ooTextBody = t;
        for (var _i = 0, _a = _this._paragraphs; _i < _a.length; _i++) {
            var p = _a[_i];
            p.Clear();
        }
        _this._paragraphs.length = 0;
        var newFont = new FontFormat(_this._context, keyword_null, _this._fontDefaultOptions);
        var font = _this._font;
        if (font) {
            font.SetParentForChildren(newFont);
            newFont.ParentStateful = font.ParentStateful;
            font.ParentStateful = keyword_null;
        }
        _this._font = newFont;
        if (t.p && t.p.length) {
            var pPr = t.p[0].pPr;
            var elementrPr = t.p[0].elements && t.p[0].elements[0] && t.p[0].elements[0].rPr;
            var endParaRPr = t.p[0].endParaRPr;
            var chProperties = void 0;
            if (pPr && pPr.defRPr && !isEmptyObject(pPr.defRPr)) {
                chProperties = pPr.defRPr;
                if (elementrPr && !isEmptyObject(elementrPr.solidFill)) {
                    chProperties = elementrPr;
                }
            }
            else if (endParaRPr && !isEmptyObject(endParaRPr)) {
                chProperties = endParaRPr;
            }
            if (chProperties) {
                _this._font.TextCharacterProperties_FromOOModel(chProperties);
            }


            for (var _b = 0, _c = t.p; _b < _c.length; _b++) {
                var oop = _c[_b];
                var chartP = new DrawingTextParagraph(_this._context, _this);
                chartP.FromOOModel(oop);
                _this._paragraphs.push(chartP);
            }
        }

        var bodyProperties = t.bodyPr;
        if (bodyProperties) {
            var rotationDegree = bodyProperties.rot;
            if (!isNullOrUndefined(rotationDegree)) {
                this._rotation = rotationDegree;
            }
        }
    };


    DrawingTextBody.prototype.Delete = function () {
        for (var paragraphs = this._paragraphs, i = paragraphs.length - 1; i >= 0; i--) {
            this.DeleteParagraph(paragraphs[i]);
        }
    };
    DrawingTextBody.prototype.DeleteParagraph = function (paragraph) {
        paragraph.Font.ParentStateful = keyword_null;
        var index = this._paragraphs.indexOf(paragraph);
        if (index >= 0) {
            this._paragraphs.splice(index, 1);
        }
    };
    return DrawingTextBody;
}());
exports.DrawingTextBody = DrawingTextBody;
var ComboColorFormat = (function (_super) {
    __extends(ComboColorFormat, _super);
    function ComboColorFormat(format1, format2) {
        var _this_1 = _super.call(this) || this;
        var _this = _this_1;
        _this.Format1 = format1;
        _this.Format2 = format2;
        return _this_1;
    }
    Object.defineProperty(ComboColorFormat.prototype, 'Stateful1', {
        get: function () {
            return this.Format1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboColorFormat.prototype, 'Stateful2', {
        get: function () {
            return this.Format2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboColorFormat.prototype, 'Brightness', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(drawingInterface_1.ColorFormatStates.Brightness, false)) {
                return _this.Format2.Brightness;
            }
            return _this.Format1.Brightness;
        },
        set: function (value) {
            this.Format1.Brightness = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboColorFormat.prototype, 'ColorType', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(drawingInterface_1.ColorFormatStates.ColorType, false)) {
                return _this.Format2.ColorType;
            }
            return _this.Format1.ColorType;
        },
        set: function (value) {
            this.Format1.ColorType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboColorFormat.prototype, 'ObjectThemeColor', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(drawingInterface_1.ColorFormatStates.ObjectThemeColor, false)) {
                return _this.Format2.ObjectThemeColor;
            }
            return _this.Format1.ObjectThemeColor;
        },
        set: function (value) {
            this.Format1.ObjectThemeColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboColorFormat.prototype, 'RGB', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(drawingInterface_1.ColorFormatStates.RGB, false)) {
                return _this.Format2.RGB;
            }
            return _this.Format1.RGB;
        },
        set: function (value) {
            this.Format1.RGB = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboColorFormat.prototype, 'TintAndShade', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(drawingInterface_1.ColorFormatStates.TintAndShade, false)) {
                return _this.Format2.TintAndShade;
            }
            return _this.Format1.TintAndShade;
        },
        set: function (value) {
            this.Format1.TintAndShade = value;
        },
        enumerable: true,
        configurable: true
    });
    ComboColorFormat.prototype.GetState = function () {
    };
    ComboColorFormat.prototype.SetState = function () {
    };
    ComboColorFormat.prototype.IsDirtyIncludingParent = function () {
    };
    ComboColorFormat.prototype.IsPropDirtyIncludingParent = function (t, includingParent) {
        return this.Stateful1.IsPropDirtyIncludingParent(t, includingParent) ||
            this.Stateful2.IsPropDirtyIncludingParent(t, includingParent);
    };
    ComboColorFormat.prototype.Dirty = function () {
    };
    ComboColorFormat.prototype.UnDirty = function () {
    };
    ComboColorFormat.prototype.SuspendClearChildrenState = function () {
    };
    ComboColorFormat.prototype.ResumeClearChilrenState = function () {
    };
    ComboColorFormat.prototype.AddChildInternal = function () {
    };
    ComboColorFormat.prototype.RemoveChildInternal = function () {
    };
    return ComboColorFormat;
}(stateful_1.StatefullBase));
exports.ComboColorFormat = ComboColorFormat;
var ComboFontFormat = (function (_super) {
    __extends(ComboFontFormat, _super);
    function ComboFontFormat(format1, format2) {
        var _this_1 = _super.call(this) || this;
        var _this = _this_1;
        _this.Format1 = format1;
        _this.Format2 = format2;
        return _this_1;
    }
    Object.defineProperty(ComboFontFormat.prototype, 'Stateful1', {
        get: function () {
            return this.Format1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Stateful2', {
        get: function () {
            return this.Format2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Bold', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.Bold, false)) {
                return _this.Format2.Bold;
            }
            return _this.Format1.Bold;
        },
        set: function (value) {
            this.Format1.Bold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Color', {
        get: function () {
            return new ComboColorFormat(this.Format1.Color, this.Format2.Color);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Italic', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.Italic, false)) {
                return _this.Format2.Bold;
            }
            return _this.Format1.Bold;
        },
        set: function (value) {
            this.Format1.Bold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Name', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.Name, false)) {
                return _this.Format2.Name;
            }
            return _this.Format1.Name;
        },
        set: function (value) {
            this.Format1.Name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Size', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.Size, false)) {
                return _this.Format2.Size;
            }
            return _this.Format1.Size;
        },
        set: function (value) {
            this.Format1.Size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Strikethrough', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.Strikethrough, false)) {
                return _this.Format2.Strikethrough;
            }
            return _this.Format1.Strikethrough;
        },
        set: function (value) {
            this.Format1.Strikethrough = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Subscript', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.Subscript, false)) {
                return _this.Format2.Subscript;
            }
            return _this.Format1.Subscript;
        },
        set: function (value) {
            this.Format1.Subscript = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Superscript', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.Superscript, false)) {
                return _this.Format2.Superscript;
            }
            return _this.Format1.Superscript;
        },
        set: function (value) {
            this.Format1.Superscript = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'ThemeFont', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.ThemeFont, false)) {
                return _this.Format2.ThemeFont;
            }
            return _this.Format1.ThemeFont;
        },
        set: function (value) {
            this.Format1.ThemeFont = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboFontFormat.prototype, 'Underline', {
        get: function () {
            var _this = this;
            if (!isNullOrUndefined(_this.Format2) && _this.Stateful2.IsPropDirtyIncludingParent(FontFormatStates.Underline, false)) {
                return _this.Format2.Underline;
            }
            return _this.Format1.Underline;
        },
        set: function (value) {
            this.Format1.Underline = value;
        },
        enumerable: true,
        configurable: true
    });
    ComboFontFormat.prototype.GetState = function () {
    };
    ComboFontFormat.prototype.SetState = function () {
    };
    ComboFontFormat.prototype.IsDirtyIncludingParent = function () {
    };
    ComboFontFormat.prototype.IsPropDirtyIncludingParent = function (t, includingParent) {
        return this.Stateful1.IsPropDirtyIncludingParent(t, includingParent) ||
            this.Stateful2.IsPropDirtyIncludingParent(t, includingParent);
    };
    ComboFontFormat.prototype.Dirty = function () {
    };
    ComboFontFormat.prototype.UnDirty = function () {
    };
    ComboFontFormat.prototype.SuspendClearChildrenState = function () {
    };
    ComboFontFormat.prototype.ResumeClearChilrenState = function () {
    };
    ComboFontFormat.prototype.AddChildInternal = function () {
    };
    ComboFontFormat.prototype.RemoveChildInternal = function () {
    };
    return ComboFontFormat;
}(stateful_1.StatefullBase));
exports.ComboFontFormat = ComboFontFormat;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/gradient.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/gradient.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var ChartCommon = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var color_1 = __webpack_require__(/*! ./color */ './dist/plugins/floatingObject/drawing/color.js');
var colorFormat_1 = __webpack_require__(/*! ./colorFormat */ './dist/plugins/floatingObject/drawing/colorFormat.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var PositionConver = ChartCommon.ShapeConstants.PositionConver, ShapeUtility = ChartCommon.ShapeUtility;
var keyword_undefined = void 0;
var GradientStop = (function () {
    function GradientStop(drawingContext) {
        this._drawingContext = drawingContext;
        this._color = new colorFormat_1.ColorFormat(this._drawingContext);
    }
    Object.defineProperty(GradientStop.prototype, 'Color', {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradientStop.prototype, 'Position', {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradientStop.prototype, 'Transparency', {
        get: function () {
            return this._color.Transparency;
        },
        set: function (value) {
            this._color.Transparency = value;
        },
        enumerable: true,
        configurable: true
    });
    GradientStop.prototype.FromOOModel = function (t) {
        this.Position = t.pos / PositionConver;
        this._color.FromOOModel(t);
    };
    GradientStop.prototype.ToOOModel = function () {
        var gradientStop = this._color.ToOOModel();
        gradientStop.pos = Math.round(this.Position * PositionConver);
        return gradientStop;
    };
    return GradientStop;
}());
exports.GradientStop = GradientStop;
var GradientStops = (function () {
    function GradientStops(drawingStyleContext) {
        this._drawingStyleContext = drawingStyleContext;
        this._gradientStopList = [];
    }
    GradientStops.prototype.Item = function (index) {
        return this._gradientStopList[index];
    };
    Object.defineProperty(GradientStops.prototype, 'Count', {
        get: function () {
            return this._gradientStopList.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradientStops.prototype, 'GradientStopList', {
        get: function () {
            return this._gradientStopList;
        },
        enumerable: true,
        configurable: true
    });
    GradientStops.prototype.Delete = function (index) {
        if (index === -1) {
            index = this.Count - 1;
        }
        this._gradientStopList.splice(index, 1);
    };
    GradientStops.prototype.Insert = function (RGB, Position, Transparency, Index, Brightness) {
        if (Transparency === keyword_undefined) {
            Transparency = 0;
        }
        if (Index === keyword_undefined) {
            Index = -1;
        }
        if (Brightness === keyword_undefined) {
            Brightness = 0;
        }
        var stop = new GradientStop(this._drawingStyleContext);
        stop.Color.RGB = color_1.ARGBColor.FromArgb(RGB);
        stop.Position = Position;
        stop.Transparency = Transparency;
        stop.Color.Brightness = Brightness;
        if (Index < 0) {
            this._gradientStopList.push(stop);
        }
        else {
            this._gradientStopList.splice(Index, 0, stop);
        }
    };
    GradientStops.prototype.FromOOModel = function (t) {
        for (var _i = 0, _a = t.gs; _i < _a.length; _i++) {
            var item = _a[_i];
            var stop_1 = new GradientStop(this._drawingStyleContext);
            stop_1.FromOOModel(item);
            this.GradientStopList.push(stop_1);
        }
    };
    GradientStops.prototype.ToOOModel = function () {
        var gradientStops = { gs: [] } ;
        for (var _i = 0, _a = this._gradientStopList; _i < _a.length; _i++) {
            var item = _a[_i];
            gradientStops.gs.push(item.ToOOModel());
        }
        return gradientStops;
    };
    return GradientStops;
}());
exports.GradientStops = GradientStops;
function createGradientStop(context, position, color) {
    var gradientStop = new GradientStop(context);
    gradientStop.Position = position;
    gradientStop.Color = color;
    return gradientStop;
}
function ARGBColor_FromArgb(argb) {
    return color_1.ARGBColor.FromArgb(argb);
}
ShapeUtility.InitGradientStopPresetColor = function (context, gradientFill) {
    var stop1, stop2, stop3, stop4, stop5, stop6, stop7, stop8, stop9, stop10, stop11, stop12, stop13;
    var gradientList = gradientFill.GradientStops.GradientStopList;
    switch (gradientFill.PresetGradientType) {
        case drawingInterface_1.PresetGradientType.GradientEarlySunset:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x000082)));
                stop2 = createGradientStop(context, 0.30000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x66008f)));
                stop3 = createGradientStop(context, 0.64999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xba0066)));
                stop4 = createGradientStop(context, 0.89999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xff0000)));
                stop5 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xff8200)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientLateSunset:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x000000)));
                stop2 = createGradientStop(context, 0.20000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x000040)));
                stop3 = createGradientStop(context, 0.50000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x400040)));
                stop4 = createGradientStop(context, 0.75000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x8f0040)));
                stop5 = createGradientStop(context, 0.89999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xf27300)));
                stop6 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffbf00)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientNightfall:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x000000)));
                stop2 = createGradientStop(context, 0.39999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x0a128c)));
                stop3 = createGradientStop(context, 0.70000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x181cc7)));
                stop4 = createGradientStop(context, 0.88000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x7005d4)));
                stop5 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x8c3d91)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientDaybreak:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x5e9eff)));
                stop2 = createGradientStop(context, 0.39999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x85c2ff)));
                stop3 = createGradientStop(context, 0.70000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xc4d6eb)));
                stop4 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffebfa)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientHorizon:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xdcebf5)));
                stop2 = createGradientStop(context, 0.08000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x83a7c3)));
                stop3 = createGradientStop(context, 0.13000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x768fb9)));
                stop4 = createGradientStop(context, 0.21001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x83a7c3)));
                stop5 = createGradientStop(context, 0.52000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffffff)));
                stop6 = createGradientStop(context, 0.56000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x9c6563)));
                stop7 = createGradientStop(context, 0.58000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x80302d)));
                stop8 = createGradientStop(context, 0.71001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xc0524e)));
                stop9 = createGradientStop(context, 0.94000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xebdad4)));
                stop10 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x55261c)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
                gradientList.push(stop9);
                gradientList.push(stop10);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientDesert:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfc9fcb)));
                stop2 = createGradientStop(context, 0.87000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xf8b049)));
                stop3 = createGradientStop(context, 0.78999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xf8b049)));
                stop4 = createGradientStop(context, 0.37000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfee7f2)));
                stop5 = createGradientStop(context, 0.33000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xf952a0)));
                stop6 = createGradientStop(context, 0.31000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xc50849)));
                stop7 = createGradientStop(context, 0.17999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xb43e85)));
                stop8 = createGradientStop(context, 0, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xf8b049)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientOcean:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x03d4a8)));
                stop2 = createGradientStop(context, 0.25000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x21d6e0)));
                stop3 = createGradientStop(context, 0.75000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x0087e6)));
                stop4 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x005cbf)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientCalmWater:
            {
                stop1 = createGradientStop(context, 0.5, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xccccff)));
                stop2 = createGradientStop(context, 0.41001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x99ccff)));
                stop3 = createGradientStop(context, 0.32000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x9966ff)));
                stop4 = createGradientStop(context, 0.19500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xcc99ff)));
                stop5 = createGradientStop(context, 0.8999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x99ccff)));
                stop6 = createGradientStop(context, 0, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xccccff)));
                stop7 = createGradientStop(context, 0.59000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x99ccff)));
                stop8 = createGradientStop(context, 0.68000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x9966ff)));
                stop9 = createGradientStop(context, 0.80500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xcc99ff)));
                stop10 = createGradientStop(context, 0.91001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x99ccff)));
                stop11 = createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xccccff)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
                gradientList.push(stop9);
                gradientList.push(stop10);
                gradientList.push(stop11);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientFire:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfff200)));
                stop2 = createGradientStop(context, 0.45000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xff7a00)));
                stop3 = createGradientStop(context, 0.70000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xff0300)));
                stop4 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x4d0808)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientFog:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x8488c4)));
                stop2 = createGradientStop(context, 0.53000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xd4deff)));
                stop3 = createGradientStop(context, 0.83000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xd4deff)));
                stop4 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x96ab94)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientMoss:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xddebcf)));
                stop2 = createGradientStop(context, 0.25000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x9cb86e)));
                stop3 = createGradientStop(context, 0.50000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x156b13)));
                stop4 = createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xddebcf)));
                stop5 = createGradientStop(context, 0.75000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x9cb86e)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientPeacock:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x3399ff)));
                stop2 = createGradientStop(context, 0.16000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x00cccc)));
                stop3 = createGradientStop(context, 0.47000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x9999ff)));
                stop4 = createGradientStop(context, 0.60001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x2e6792)));
                stop5 = createGradientStop(context, 0.71001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x3333cc)));
                stop6 = createGradientStop(context, 0.81000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x1170ff)));
                stop7 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x006699)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientWheat:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfbeac7)));
                stop2 = createGradientStop(context, 0.17999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfee7f2)));
                stop3 = createGradientStop(context, 0.36000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfac77d)));
                stop4 = createGradientStop(context, 0.61000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfba97d)));
                stop5 = createGradientStop(context, 0.82001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfbd49c)));
                stop6 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfee7f2)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientParchment:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffefd1)));
                stop2 = createGradientStop(context, 0.64999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xf0ebd5)));
                stop3 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xd1c39f)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientMahogany:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xd6b19c)));
                stop2 = createGradientStop(context, 0.15000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xd49e6c)));
                stop3 = createGradientStop(context, 0.35000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xa65528)));
                stop4 = createGradientStop(context, 0.50000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x663012)));
                stop5 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xd6b19c)));
                stop6 = createGradientStop(context, 0.85000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xd49e6c)));
                stop7 = createGradientStop(context, 0.65000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xa65528)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientRainbow:
            {
                stop1 = createGradientStop(context, 0.50000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xa603ab)));
                stop2 = createGradientStop(context, 0.39500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x0819fb)));
                stop3 = createGradientStop(context, 0.32499, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x1a8d48)));
                stop4 = createGradientStop(context, 0.24000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffff00)));
                stop5 = createGradientStop(context, 0.13500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xee3f17)));
                stop6 = createGradientStop(context, 0.6000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe81766)));
                stop7 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xa603ab)));
                stop8 = createGradientStop(context, 0.60501, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x0819fb)));
                stop9 = createGradientStop(context, 0.67501, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x1a8d48)));
                stop10 = createGradientStop(context, 0.76000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffff00)));
                stop11 = createGradientStop(context, 0.86500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xee3f17)));
                stop12 = createGradientStop(context, 0.94000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe81766)));
                stop13 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xa603ab)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
                gradientList.push(stop9);
                gradientList.push(stop10);
                gradientList.push(stop11);
                gradientList.push(stop12);
                gradientList.push(stop13);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientRainbowII:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xff3399)));
                stop2 = createGradientStop(context, 0.25000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xff6633)));
                stop3 = createGradientStop(context, 0.50000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffff00)));
                stop4 = createGradientStop(context, 0.75000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x01a78f)));
                stop5 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x3366ff)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientGold:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6dcac)));
                stop2 = createGradientStop(context, 0.12000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6d78a)));
                stop3 = createGradientStop(context, 0.30000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xc7ac4c)));
                stop4 = createGradientStop(context, 0.45000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6d78a)));
                stop5 = createGradientStop(context, 0.77000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xc7ac4c)));
                stop6 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6dcac)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientGoldII:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfbe4ae)));
                stop2 = createGradientStop(context, 0.13000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xbd922a)));
                stop3 = createGradientStop(context, 0.21001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xbd922a)));
                stop4 = createGradientStop(context, 0.63000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfbe4ae)));
                stop5 = createGradientStop(context, 0.67000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xbd922a)));
                stop6 = createGradientStop(context, 0.69000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x835e17)));
                stop7 = createGradientStop(context, 0.82001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xa28949)));
                stop8 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xfae3b7)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientBrass:
            {
                stop1 = createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x825600)));
                stop2 = createGradientStop(context, 0.87000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffa800)));
                stop3 = createGradientStop(context, 0.72000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x825600)));
                stop4 = createGradientStop(context, 0.57001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffa800)));
                stop5 = createGradientStop(context, 0.42000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x825600)));
                stop6 = createGradientStop(context, 0.28000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffa800)));
                stop7 = createGradientStop(context, 0.13000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x825600)));
                stop8 = createGradientStop(context, 0, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffa800)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientChrome:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffffff)));
                stop2 = createGradientStop(context, 0.16000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x1f1f1f)));
                stop3 = createGradientStop(context, 0.17999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffffff)));
                stop4 = createGradientStop(context, 0.42000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x636363)));
                stop5 = createGradientStop(context, 0.53000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xcfcfcf)));
                stop6 = createGradientStop(context, 0.66000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xcfcfcf)));
                stop7 = createGradientStop(context, 0.75999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x1f1f1f)));
                stop8 = createGradientStop(context, 0.78999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffffff)));
                stop9 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x7f7f7f)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
                gradientList.push(stop9);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientChromeII:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xcbcbcb)));
                stop2 = createGradientStop(context, 0.13000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x5f5f5f)));
                stop3 = createGradientStop(context, 0.21001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x5f5f5f)));
                stop4 = createGradientStop(context, 0.63000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffffff)));
                stop5 = createGradientStop(context, 0.67000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xb2b2b2)));
                stop6 = createGradientStop(context, 0.69000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x292929)));
                stop7 = createGradientStop(context, 0.82001, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x777777)));
                stop8 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xeaeaea)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientSilver:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xffffff)));
                stop2 = createGradientStop(context, 0.03501, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6e6e6)));
                stop3 = createGradientStop(context, 0.16000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x7d8496)));
                stop4 = createGradientStop(context, 0.23500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6e6e6)));
                stop5 = createGradientStop(context, 0.42501, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x7d8496)));
                stop6 = createGradientStop(context, 0.50000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6e6e6)));
                stop7 = createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6e6e6)));
                stop8 = createGradientStop(context, 0.96500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6e6e6)));
                stop9 = createGradientStop(context, 0.84000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x7d8496)));
                stop10 = createGradientStop(context, 0.76500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xe6e6e6)));
                stop11 = createGradientStop(context, 0.57500, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x7d8496)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
                gradientList.push(stop9);
                gradientList.push(stop10);
                gradientList.push(stop11);
            }
            break;
        case drawingInterface_1.PresetGradientType.GradientSapphire:
            {
                stop1 = createGradientStop(context, 0.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x000082)));
                stop2 = createGradientStop(context, 0.13000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x0047ff)));
                stop3 = createGradientStop(context, 0.28000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x000082)));
                stop4 = createGradientStop(context, 0.42999, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x0047ff)));
                stop5 = createGradientStop(context, 0.58000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x000082)));
                stop6 = createGradientStop(context, 0.72000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x0047ff)));
                stop7 = createGradientStop(context, 0.87000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x000082)));
                stop8 = createGradientStop(context, 1.00000, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0x0047ff)));
                gradientList.push(stop1);
                gradientList.push(stop2);
                gradientList.push(stop3);
                gradientList.push(stop4);
                gradientList.push(stop5);
                gradientList.push(stop6);
                gradientList.push(stop7);
                gradientList.push(stop8);
            }
            break;
    }
};
ShapeUtility.InitGradientStopTwoColor = function (context, gradientFill) {
    var gradientStyle = gradientFill.GradientStyle;
    if (gradientStyle === drawingInterface_1.GradientStyle.GradientFromCenter) {
        this.InitGradientTwoColorCenterStops(context, gradientFill);
        return;
    }
    else if (gradientStyle === drawingInterface_1.GradientStyle.GradientFromCorner) {
        this.InitGradientTwoColorCornerStops(context, gradientFill);
        return;
    }
    var gradientStopList = gradientFill.GradientStops.GradientStopList;
    var gradientVariant = gradientFill.GradientVariant;
    if (gradientVariant === 1 || gradientVariant === 2) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0XFFFFFF))));
    }
    else if (gradientVariant === 3) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 0.5, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0XFFFFFF))));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
    }
    else if (gradientVariant === 4) {
        gradientStopList.push(createGradientStop(context, 0.5, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0XFFFFFF))));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0XFFFFFF))));
    }
};
ShapeUtility.InitGradientTwoColorCornerStops = function (context, gradientFill) {
    var gradientStopList = gradientFill.GradientStops.GradientStopList;
    gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
    gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xFFFFFF))));
};
ShapeUtility.InitGradientTwoColorCenterStops = function (context, gradientFill) {
    var gradientStopList = gradientFill.GradientStops.GradientStopList;
    var gradientVariant = gradientFill.GradientVariant;
    if (gradientVariant === 1) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xFFFFFF))));
    }
    else if (gradientVariant === 2) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xFFFFFF))));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
    }
    else if (gradientVariant === 3) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 0.5, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xFFFFFF))));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
    }
    else if (gradientVariant === 4) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xFFFFFF))));
        gradientStopList.push(createGradientStop(context, 0.5, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormatFromRGB(context, drawingInterface_1.SolidColorType.RGB, ARGBColor_FromArgb(0xFFFFFF))));
    }
};
ShapeUtility.InitGradientOneColorCornerStops = function (context, gradientFill) {
    var color = colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1, this.GetTintAndShadeByDegree(gradientFill.GradientDegree));
    var gradientStopList = gradientFill.GradientStops.GradientStopList;
    gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
    gradientStopList.push(createGradientStop(context, 1, color));
};
ShapeUtility.InitGradientOneColorCenterStops = function (context, gradientFill) {
    var color = colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1, this.GetTintAndShadeByDegree(gradientFill.GradientDegree));
    var gradientStopList = gradientFill.GradientStops.GradientStopList;
    var gradientVariant = gradientFill.GradientVariant;
    if (gradientVariant === 1) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 1, color));
    }
    else if (gradientVariant === 2) {
        gradientStopList.push(createGradientStop(context, 0, color));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
    }
    else if (gradientVariant === 3) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 0.5, color));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
    }
    else if (gradientVariant === 4) {
        gradientStopList.push(createGradientStop(context, 0, color));
        gradientStopList.push(createGradientStop(context, 0.5, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 1, color));
    }
};
ShapeUtility.InitGradientStopOneColor = function (context, gradientFill) {
    var gradientStyle = gradientFill.GradientStyle;
    if (gradientStyle === drawingInterface_1.GradientStyle.GradientFromCenter) {
        this.InitGradientOneColorCenterStops(context, gradientFill);
        return;
    }
    else if (gradientStyle === drawingInterface_1.GradientStyle.GradientFromCorner) {
        this.InitGradientOneColorCornerStops(context, gradientFill);
        return;
    }
    var tintAndShade = this.GetTintAndShadeByDegree(gradientFill.GradientDegree);
    var gradientStopList = gradientFill.GradientStops.GradientStopList;
    var gradientVariant = gradientFill.GradientVariant;
    if (gradientVariant === 1 || gradientVariant === 2) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1, tintAndShade)));
    }
    else if (gradientVariant === 3) {
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 0.5, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1, tintAndShade)));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
    }
    else if (gradientVariant === 4) {
        gradientStopList.push(createGradientStop(context, 0.5, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 0, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1)));
        gradientStopList.push(createGradientStop(context, 1, colorFormat_1.createColorFormat(context, drawingInterface_1.SolidColorType.Theme, drawingInterface_1.ColorSchemeIndex.Accent1, tintAndShade)));
    }
};
ShapeUtility.InitGradientStops = function (context, gradientFill, colorType) {
    var _this = this;
    gradientFill._SetGradientStops(new GradientStops(context));
    if (colorType === drawingInterface_1.GradientColorType.GradientOneColor) {
        _this.InitGradientStopOneColor(context, gradientFill);
    }
    else if (colorType === drawingInterface_1.GradientColorType.GradientTwoColors) {
        _this.InitGradientStopTwoColor(context, gradientFill);
    }
    else if (colorType === drawingInterface_1.GradientColorType.GradientPresetColors) {
        _this.InitGradientStopPresetColor(context, gradientFill);
    }
    else {
        throw new Error();
    }
    gradientFill.GradientAngle = _this.GetGradientAngle(gradientFill.GradientStyle, gradientFill.GradientVariant);
};
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/lineFormat.js':
/*!***********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/lineFormat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });
var stateful_1 = __webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js');
var common_1 = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var fillFormat_1 = __webpack_require__(/*! ./fillFormat */ './dist/plugins/floatingObject/drawing/fillFormat.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var deleteFillItems = common_1.ChartUtility._deleteFillItems, isNullOrUndefined = common_1.UnitHelper.isNullOrUndefined;
var keyword_null = null;
function isValidEnumValue(value, min, max) {
    return value >= min && value <= max;
}
var LineFormat = (function (_super) {
    __extends(LineFormat, _super);
    function LineFormat(context, parent, autoColorFormat) {
        var _this_1 = _super.call(this, parent) || this;
        var _this = _this_1;
        _this._beginArrowheadLength = drawingInterface_1.ArrowheadLength.medium;
        _this._beginArrowheadStyle = drawingInterface_1.ArrowheadStyle.none;
        _this._beginArrowheadWidth = drawingInterface_1.ArrowheadWidth.medium;
        _this._dashStyle = drawingInterface_1.LineDashStyle.solid;
        _this._endArrowheadLength = drawingInterface_1.ArrowheadLength.medium;
        _this._endArrowheadStyle = drawingInterface_1.ArrowheadStyle.none;
        _this._endArrowheadWidth = drawingInterface_1.ArrowheadWidth.medium;
        _this._style = drawingInterface_1.LineStyle.LineSingle;
        _this._visible = true;
        _this._weight = -1;
        _this._ooLineProps = keyword_null;
        _this._context = context;
        _this._parent = parent;
        _this._autoColorFormat = autoColorFormat;
        _this._capStyle = drawingInterface_1.LineCapStyle.flat;
        _this._joinStyle = drawingInterface_1.LineJoinStyle.round;
        _this._fill = new fillFormat_1.FillFormat(context, parent && parent.FillInternal, autoColorFormat);
        return _this_1;
    }
    Object.defineProperty(LineFormat.prototype, 'PatternColor', {
        get: function () {
            return this.FillInternal.PatternColorInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'Color', {
        get: function () {
            return this.FillInternal.ColorInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'BeginArrowheadLength', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.BeginArrowheadLength) && !isNullOrUndefined(this._parent)) {
                return this._parent.BeginArrowheadLength;
            }
            return this._beginArrowheadLength;
        },
        set: function (value) {
            this._beginArrowheadLength = value;
            this.Dirty(drawingInterface_1.LineFormatStates.BeginArrowheadLength);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'BeginArrowheadStyle', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.BeginArrowheadStyle) && !isNullOrUndefined(this._parent)) {
                return this._parent.BeginArrowheadStyle;
            }
            return this._beginArrowheadStyle;
        },
        set: function (value) {
            this._beginArrowheadStyle = value;
            this.Dirty(drawingInterface_1.LineFormatStates.BeginArrowheadStyle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'BeginArrowheadWidth', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.BeginArrowheadWidth) && !isNullOrUndefined(this._parent)) {
                return this._parent.BeginArrowheadWidth;
            }
            return this._beginArrowheadWidth;
        },
        set: function (value) {
            this._beginArrowheadWidth = value;
            this.Dirty(drawingInterface_1.LineFormatStates.BeginArrowheadWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'DashStyle', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.DashStyle) && !isNullOrUndefined(this._parent)) {
                return this._parent.DashStyle;
            }
            return this._dashStyle;
        },
        set: function (value) {
            if (isValidEnumValue(value, 0, 11)) {
                this._dashStyle = value;
                this.Dirty(drawingInterface_1.LineFormatStates.DashStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'CapStyle', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.CapStyle) && !isNullOrUndefined(this._parent)) {
                return this._parent.CapStyle;
            }
            return this._capStyle;
        },
        set: function (value) {
            if (isValidEnumValue(value, 0, 2)) {
                this._capStyle = value;
                this.Dirty(drawingInterface_1.LineFormatStates.CapStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'JoinStyle', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.JoinStyle) && !isNullOrUndefined(this._parent)) {
                return this._parent.JoinStyle;
            }
            return this._joinStyle;
        },
        set: function (value) {
            if (isValidEnumValue(value, 0, 2)) {
                this._joinStyle = value;
                this.Dirty(drawingInterface_1.LineFormatStates.JoinStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'EndArrowheadLength', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.EndArrowheadLength) && !isNullOrUndefined(this._parent)) {
                return this._parent.EndArrowheadLength;
            }
            return this._endArrowheadLength;
        },
        set: function (value) {
            this._endArrowheadLength = value;
            this.Dirty(drawingInterface_1.LineFormatStates.EndArrowheadLength);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'EndArrowheadStyle', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.EndArrowheadStyle) && !isNullOrUndefined(this._parent)) {
                return this._parent.EndArrowheadStyle;
            }
            return this._endArrowheadStyle;
        },
        set: function (value) {
            this._endArrowheadStyle = value;
            this.Dirty(drawingInterface_1.LineFormatStates.EndArrowheadStyle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'EndArrowheadWidth', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.EndArrowheadWidth) && !isNullOrUndefined(this._parent)) {
                return this._parent.EndArrowheadWidth;
            }
            return this._endArrowheadWidth;
        },
        set: function (value) {
            this._endArrowheadWidth = value;
            this.Dirty(drawingInterface_1.LineFormatStates.EndArrowheadWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'InsetPen', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.InsetPen) && !isNullOrUndefined(this._parent)) {
                return this._parent.InsetPen;
            }
            return this._insetPen;
        },
        set: function (value) {
            this._insetPen = value;
            this.Dirty(drawingInterface_1.LineFormatStates.InsetPen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'Pattern', {
        get: function () {
            return this.FillInternal.Pattern;
        },
        set: function (value) {
            this.FillInternal._SetPattern(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'PresetGradientType', {
        get: function () {
            return this.FillInternal.PresetGradientType;
        },
        enumerable: true,
        configurable: true
    });
    LineFormat.prototype._SetPresetGradientType = function (value) {
        this.FillInternal._SetPresetGradientType(value);
    };
    Object.defineProperty(LineFormat.prototype, 'GradientAngle', {
        get: function () {
            return this.FillInternal.GradientAngle;
        },
        set: function (value) {
            this.FillInternal.GradientAngle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'GradientColorType', {
        get: function () {
            return this.FillInternal.GradientColorType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'GradientDegree', {
        get: function () {
            return this.FillInternal.GradientDegree;
        },
        enumerable: true,
        configurable: true
    });
    LineFormat.prototype._SetGradientDegree = function (value) {
        this.FillInternal._SetGradientDegree(value);
    };
    Object.defineProperty(LineFormat.prototype, 'GradientStops', {
        get: function () {
            return this.FillInternal.GradientStops;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'GradientStyle', {
        get: function () {
            return this.FillInternal.GradientStyle;
        },
        enumerable: true,
        configurable: true
    });
    LineFormat.prototype._SetGradientStyle = function (value) {
        this.FillInternal._SetGradientStyle(value);
    };
    Object.defineProperty(LineFormat.prototype, 'GradientVariant', {
        get: function () {
            return this.FillInternal.GradientVariant;
        },
        enumerable: true,
        configurable: true
    });
    LineFormat.prototype._SetGradientVariant = function (value) {
        this.FillInternal._SetGradientVariant(value);
    };
    Object.defineProperty(LineFormat.prototype, 'Style', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.Style) && !isNullOrUndefined(this._parent)) {
                return this._parent.Style;
            }
            return this._style;
        },
        set: function (value) {
            if (isValidEnumValue(value, 0, 4)) {
                this._style = value;
                this.Dirty(drawingInterface_1.LineFormatStates.Style);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'Transparency', {
        get: function () {
            return this.FillInternal.Transparency;
        },
        set: function (value) {
            this.FillInternal.Transparency = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'Visible', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.Visible) && !isNullOrUndefined(this._parent)) {
                return this._parent.Visible;
            }
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            this.Dirty(drawingInterface_1.LineFormatStates.Visible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'Weight', {
        get: function () {
            if (!this.IsDirty(drawingInterface_1.LineFormatStates.Weight) && !isNullOrUndefined(this._parent)) {
                return this._parent.Weight;
            }
            return this._weight;
        },
        set: function (value) {
            this._weight = value;
            this.Dirty(drawingInterface_1.LineFormatStates.Weight);
        },
        enumerable: true,
        configurable: true
    });
    LineFormat.prototype.OneColorGradient = function (Style, Variant, Degree) {
        this.FillInternal.OneColorGradient(Style, Variant, Degree);
    };
    LineFormat.prototype.TwoColorGradient = function (Style, Variant) {
        this.FillInternal.TwoColorGradient(Style, Variant);
    };
    LineFormat.prototype.PresetGradient = function (Style, Variant, presetGradientType) {
        this.FillInternal.PresetGradient(Style, Variant, presetGradientType);
    };
    LineFormat.prototype.Solid = function () {
        this.FillInternal.Solid();
    };
    LineFormat.prototype.Patterned = function (pattern) {
        this.FillInternal.Patterned(pattern);
    };
    Object.defineProperty(LineFormat.prototype, 'FillInternal', {
        get: function () {
            var _this = this;
            if (!_this._fill) {
                _this._fill = new fillFormat_1.FillFormat(_this._context, _this._parent && _this._parent.FillInternal, _this._autoColorFormat);
            }
            return _this._fill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineFormat.prototype, 'Type', {
        get: function () {
            return this.FillInternal.Type;
        },
        enumerable: true,
        configurable: true
    });
    LineFormat.prototype.GetState = function (prop, includingParent) {
        var fill = this._fill;
        if (fill) {
            if (prop === drawingInterface_1.LineFormatStates.Color && fill.Color) {
                return fill.Color.IsDirtyIncludingParent(includingParent);
            }
            if (prop === drawingInterface_1.LineFormatStates.PatternColor && fill.PatternColor) {
                return fill.PatternColor.IsDirtyIncludingParent(includingParent);
            }
        }
        return _super.prototype.GetState.call(this, prop, includingParent);
    };
    LineFormat.prototype.IsDirtyIncludingParent = function (includingParent) {
        var fill = this._fill;
        if (fill && fill.IsDirtyIncludingParent(includingParent)) {
            return true;
        }
        return _super.prototype.IsDirtyIncludingParent.call(this, includingParent);
    };
    LineFormat.prototype.OnParentChanged = function (newParent) {
        this._parent = newParent;
        var fill = this._fill;
        if (fill && newParent) {
            fill.ParentStateful = newParent.FillInternal;
        }
    };
    LineFormat.prototype.FromOOModel = function (t) {
        this._ooLineProps = t;
        this.FromCT_LineProperties(t);
    };
    LineFormat.prototype.ToOOModel = function () {
        return this.ToCT_LineProperties();
    };
    LineFormat.prototype.FromCT_LineProperties = function (ooModel) {
        var _this = this;
        if (!isNullOrUndefined(ooModel.solidFill)) {
            _this.FillInternal.FromOOModel(ooModel.solidFill, drawingInterface_1.ColorFillType.SolidColorFillProperties);
        }
        else if (!isNullOrUndefined(ooModel.pattFill)) {
            _this.FillInternal.FromOOModel(ooModel.pattFill, drawingInterface_1.ColorFillType.PatternFillProperties);
        }
        else if (!isNullOrUndefined(ooModel.gradFill)) {
            _this.FillInternal.FromOOModel(ooModel.gradFill, drawingInterface_1.ColorFillType.GradientFillProperties);
        }
        else if (!isNullOrUndefined(ooModel.noFill)) {
            _this.FillInternal.ColorInternal.ColorType = drawingInterface_1.SolidColorType.None;
        }
        if (!isNullOrUndefined(ooModel.headEnd)) {
            _this.FromCT_LineEndProperties(ooModel.headEnd);
        }
        if (!isNullOrUndefined(ooModel.tailEnd)) {
            _this.FromCT_TailLineEndProperties(ooModel.tailEnd);
        }
        if (!isNullOrUndefined(ooModel.w) && ooModel.w >= 0) {
            _this.Weight = ooModel.w;
        }
        else if (!isNullOrUndefined(ooModel.solidFill) || !isNullOrUndefined(ooModel.gradFill)) {
            _this.Weight = 1;
        }
        else {
            _this._weight = -1;
            _this.UnDirty(drawingInterface_1.LineFormatStates.Weight);
        }
        if (!isNullOrUndefined(ooModel.cmpd)) {
            _this.Style = ooModel.cmpd;
        }
        _this.Round = !!ooModel.round;
        if (!isNullOrUndefined(ooModel.prstDash)) {
            _this.DashStyle = ooModel.prstDash;
        }
        else {
            _this.UnDirty(drawingInterface_1.LineFormatStates.DashStyle);
        }
        if (!isNullOrUndefined(ooModel.cap)) {
            _this.CapStyle = ooModel.cap;
        }
        if (ooModel.bevel) {
            _this.JoinStyle = drawingInterface_1.LineJoinStyle.bevel;
        }
        else if (ooModel.round) {
            _this.JoinStyle = drawingInterface_1.LineJoinStyle.round;
        }
        else if (ooModel.miter) {
            _this.JoinStyle = drawingInterface_1.LineJoinStyle.miter;
        }
    };
    LineFormat.prototype.ToCT_LineProperties = function () {
        var _this = this;
        var lineProps = _this._ooLineProps;
        if (!_this.IsDirtyIncludingParent() && !isNullOrUndefined(lineProps)) {
            return lineProps;
        }
        var lineProp = lineProps || {} ;
        deleteFillItems(lineProp);

        if (!_this._visible) {
            lineProp.noFill = true;
        }
        else if (!isNullOrUndefined(_this._fill)) {
            var fillBase = _this._fill.ToOOModel();
            if (fillBase.colorFillType === drawingInterface_1.ColorFillType.SolidColorFillProperties) {
                lineProp.solidFill = fillBase;
            }
            else if (fillBase.colorFillType === drawingInterface_1.ColorFillType.PatternFillProperties) {
                lineProp.pattFill = fillBase;
            }
            else if (fillBase.colorFillType === drawingInterface_1.ColorFillType.GradientFillProperties) {
                lineProp.gradFill = fillBase;
            }
            else if (fillBase.colorFillType === drawingInterface_1.ColorFillType.NoFillProperties) {
                lineProp.noFill = true;
            }
            delete fillBase.colorFillType;
        }
        var lineItem;
        lineItem = _this.ToCT_HeadLineEndProperties();
        if (lineItem) {
            lineProp.headEnd = lineItem;
        }
        lineItem = _this.ToCT_TailLineEndProperties();
        if (lineItem) {
            lineProp.tailEnd = lineItem;
        }
        if (_this.Weight >= 0) {
            lineProp.w = _this.Weight;
        }
        if (_this.GetState(drawingInterface_1.LineFormatStates.Style, true)) {
            lineProp.cmpd = _this.Style;
        }
        if (_this.GetState(drawingInterface_1.LineFormatStates.DashStyle, true)) {
            lineProp.prstDash = _this.DashStyle;
        }
        if (_this.Round) {
            lineProp.round = true;
        }
        if (_this.GetState(drawingInterface_1.LineFormatStates.CapStyle, true)) {
            lineProp.cap = _this.CapStyle;
        }

        delete lineProp.bevel;
        delete lineProp.round;
        delete lineProp.miter;
        if (_this.GetState(drawingInterface_1.LineFormatStates.JoinStyle, true)) {
            var joinStyle = _this.JoinStyle;
            if (joinStyle === drawingInterface_1.LineJoinStyle.bevel) {
                lineProp.bevel = {};
            }
            else if (joinStyle === drawingInterface_1.LineJoinStyle.round) {
                lineProp.round = true;
            }
            else if (joinStyle === drawingInterface_1.LineJoinStyle.miter) {
                lineProp.miter = { lim: 800000 };
            }
        }

        return lineProp;
    };
    LineFormat.prototype.FromCT_LineEndProperties = function (ooModel) {
        var _this = this;
        _this._beginArrowheadStyle = ooModel.type;
        _this._beginArrowheadWidth = ooModel.w;
        _this._beginArrowheadLength = ooModel.len;
        _this.SetState(drawingInterface_1.LineFormatStates.BeginArrowheadStyle, true);
        _this.SetState(drawingInterface_1.LineFormatStates.BeginArrowheadWidth, true);
        _this.SetState(drawingInterface_1.LineFormatStates.BeginArrowheadLength, true);
    };
    LineFormat.prototype.ToCT_HeadLineEndProperties = function () {
        var lineBegin = {
            w: drawingInterface_1.ArrowheadWidth.medium,
            len: drawingInterface_1.ArrowheadLength.medium
        } ;
        var _this = this;
        var dirty = false;
        if (_this.GetState(drawingInterface_1.LineFormatStates.BeginArrowheadStyle, true)) {
            lineBegin.type = _this.BeginArrowheadStyle;
            dirty = true;
        }
        if (_this.GetState(drawingInterface_1.LineFormatStates.BeginArrowheadWidth, true)) {
            lineBegin.w = _this.BeginArrowheadWidth;
            dirty = true;
        }
        if (_this.GetState(drawingInterface_1.LineFormatStates.BeginArrowheadLength, true)) {
            lineBegin.len = _this.BeginArrowheadLength;
            dirty = true;
        }
        if (dirty) {
            return lineBegin;
        }
        return keyword_null;
    };
    LineFormat.prototype.FromCT_TailLineEndProperties = function (ooModel) {
        if (isNullOrUndefined(ooModel)) {
            return;
        }
        var _this = this;
        _this._endArrowheadStyle = ooModel.type;
        _this._endArrowheadWidth = ooModel.w;
        _this._endArrowheadLength = ooModel.len;
        _this.SetState(drawingInterface_1.LineFormatStates.EndArrowheadStyle, true);
        _this.SetState(drawingInterface_1.LineFormatStates.EndArrowheadWidth, true);
        _this.SetState(drawingInterface_1.LineFormatStates.EndArrowheadLength, true);
    };
    LineFormat.prototype.ToCT_TailLineEndProperties = function () {
        var lineEnd = {
            w: drawingInterface_1.ArrowheadWidth.medium,
            len: drawingInterface_1.ArrowheadLength.medium
        } ;
        var dirty = false;
        var _this = this;
        if (_this.GetState(drawingInterface_1.LineFormatStates.EndArrowheadStyle, true)) {
            lineEnd.type = _this.EndArrowheadStyle;
            dirty = true;
        }
        if (_this.GetState(drawingInterface_1.LineFormatStates.EndArrowheadWidth, true)) {
            lineEnd.w = _this.EndArrowheadWidth;
            dirty = true;
        }
        if (_this.GetState(drawingInterface_1.LineFormatStates.EndArrowheadLength, true)) {
            lineEnd.len = _this.EndArrowheadLength;
            dirty = true;
        }
        if (dirty) {
            return lineEnd;
        }
        return keyword_null;
    };

    LineFormat.prototype.Clone = function () {
        var _this = this;
        var format = new LineFormat(_this._context);
        format._fill = _this._fill && _this._fill.Clone();
        format._beginArrowheadLength = _this._beginArrowheadLength;
        format._beginArrowheadStyle = _this._beginArrowheadStyle;
        format._beginArrowheadWidth = _this._beginArrowheadWidth;
        format._dashStyle = _this._dashStyle;
        format._endArrowheadLength = _this._endArrowheadLength;
        format._endArrowheadStyle = _this._endArrowheadStyle;
        format._endArrowheadWidth = _this._endArrowheadWidth;
        format._insetPen = _this._insetPen;
        format._visible = _this._visible;
        format._weight = _this._weight;
        format._states = _this._states;
        format._parent = _this._parent;
        return format;
    };
    return LineFormat;
}(stateful_1.StatefullBase));
exports.LineFormat = LineFormat;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/picture.js':
/*!********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/picture.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });
var stateful_1 = __webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js');
var common_1 = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var PositionConver = common_1.ShapeConstants.PositionConver, PositiveFixedPercentageConvert = common_1.ShapeConstants.PositiveFixedPercentageConvert, fromLum = common_1.ShapeUtility.FromLum, toLum = common_1.ShapeUtility.ToLum, isNullOrUndefined = common_1.UnitHelper.isNullOrUndefined;
var keyword_null = null, keyword_undefined = void 0;
var Crop = (function () {
    function Crop(container) {
        var _this = this;
        _this._pictureOffsetX = 0;
        _this._pictureOffsetY = 0;
        _this._pictureWidth = 0;
        _this._pictureHeight = 0;
        _this._container = container;
    }
    Object.defineProperty(Crop.prototype, 'PictureHeight', {
        get: function () {
            return this._pictureHeight;
        },
        set: function (value) {
            this._pictureHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Crop.prototype, 'PictureOffsetX', {
        get: function () {
            return this._pictureOffsetX;
        },
        set: function (value) {
            this._pictureOffsetX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Crop.prototype, 'PictureOffsetY', {
        get: function () {
            return this._pictureOffsetY;
        },
        set: function (value) {
            this._pictureOffsetY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Crop.prototype, 'PictureWidth', {
        get: function () {
            return this._pictureWidth;
        },
        set: function (value) {
            this._pictureWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Crop.prototype, 'ShapeHeight', {
        get: function () {
            return this._container.Height;
        },
        set: function (value) {
            this._container.Height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Crop.prototype, 'ShapeLeft', {
        get: function () {
            return this._container.Left;
        },
        set: function (value) {
            this._container.Left = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Crop.prototype, 'ShapeTop', {
        get: function () {
            return this._container.Top;
        },
        set: function (value) {
            this._container.Top = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Crop.prototype, 'ShapeWidth', {
        get: function () {
            return this._container.Width;
        },
        set: function (value) {
            this._container.Width = value;
        },
        enumerable: true,
        configurable: true
    });
    Crop.prototype.Clone = function () {
        var _this = this;
        var crop = new Crop(_this._container);
        crop._pictureHeight = _this._pictureHeight;
        crop._pictureOffsetX = _this._pictureOffsetX;
        crop._pictureOffsetY = _this._pictureOffsetY;
        crop._pictureWidth = _this._pictureWidth;
        return crop;
    };
    return Crop;
}());
exports.Crop = Crop;
var PictureFormat = (function (_super) {
    __extends(PictureFormat, _super);
    function PictureFormat(formatType, parent) {
        var _this_1 = this;
        if (formatType === keyword_undefined) {
            formatType = drawingInterface_1.PictureFormatType.PictureShape;
        }
        if (parent === keyword_undefined) {
            parent = keyword_null;
        }
        _this_1 = _super.call(this, parent) || this;
        var _this = _this_1;
        _this._brightness = common_1.ShapeConstants.DefaultBrightness;
        _this._colorType = drawingInterface_1.PictureColorType.PictureAutomatic;
        _this._contrast = common_1.ShapeConstants.DefaultBrightness;
        _this._transparencyColor = common_1.ShapeConstants.DefaultTransparent;
        _this._pictureFormatType = formatType;
        _this._parent = parent;
        _this._transparentBackground = _this._pictureFormatType === drawingInterface_1.PictureFormatType.PictureShape;
        _this._transparency = common_1.ShapeConstants.DefaultTransparent;
        _this._stretch = { left: 0, right: 0, top: 0, bottom: 0 };
        _this._tile = { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1, alignment: 0, mirrorType: 0 };
        return _this;
    }
    Object.defineProperty(PictureFormat.prototype, 'Brightness', {
        get: function () {
            if (!this.IsDirty(1 ) && !isNullOrUndefined(this._parent)) {
                return this._parent.Brightness;
            }
            return this._brightness;
        },
        set: function (value) {
            if (value < 0 || value > 1) {
                throw new Error();
            }
            this._brightness = value;
            this.Dirty(1 );
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'ColorType', {
        get: function () {
            if (!this.IsDirty(2 ) && !isNullOrUndefined(this._parent)) {
                return this._parent.ColorType;
            }
            return this._colorType;
        },
        set: function (value) {
            if (value === drawingInterface_1.PictureColorType.PictureAutomatic) {
                this._brightness = common_1.ShapeConstants.DefaultBrightness;
                this._contrast = common_1.ShapeConstants.DefaultBrightness;
            }
            else if (value === drawingInterface_1.PictureColorType.PictureWatermark) {
                this._brightness = 0.85;
                this._contrast = 0.15;
            }
            this._colorType = value;
            this.Dirty(2 );
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'Contrast', {
        get: function () {
            if (!this.IsDirty(4 ) && !isNullOrUndefined(this._parent)) {
                return this._parent.Contrast;
            }
            return this._contrast;
        },
        set: function (value) {
            if (value < 0 || value > 1) {
                throw new Error();
            }
            this._contrast = value;
            this.Dirty(4 );
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'Crop', {
        get: function () {
            var _this = this;
            if (!_this._crop) {
                _this._crop = new Crop(_this._shapeBase);
            }
            return _this._crop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'CropBottom', {
        get: function () {
            return this.Crop.ShapeTop + this.Crop.ShapeHeight;
        },
        set: function (value) {
            this.Crop.ShapeHeight = value - this.Crop.ShapeTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'CropLeft', {
        get: function () {
            return this.Crop.ShapeLeft;
        },
        set: function (value) {
            this.Crop.ShapeLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'CropRight', {
        get: function () {
            return this.Crop.ShapeLeft + this.Crop.ShapeWidth;
        },
        set: function (value) {
            this.Crop.ShapeWidth = value - this.Crop.ShapeLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'CropTop', {
        get: function () {
            return this.Crop.ShapeTop;
        },
        set: function (value) {
            this.Crop.ShapeTop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'Stretch', {
        get: function () {
            return this._stretch;
        },
        set: function (v) {
            this._stretch = JSON.parse(JSON.stringify(v));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'Tile', {
        get: function () {
            return this._tile;
        },
        set: function (v) {
            this._tile = JSON.parse(JSON.stringify(v));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'Transparency', {
        get: function () {
            return this._transparency;
        },
        set: function (value) {
            value = Math.max(0, value);
            value = Math.min(1, value);
            this._transparency = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'TransparencyColor', {
        get: function () {
            if (!this.IsDirty(8 ) && !isNullOrUndefined(this._parent)) {
                return this._parent.TransparencyColor;
            }
            return this._transparencyColor;
        },
        set: function (value) {
            this._transparencyColor = value;
            this.Dirty(8 );
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'TransparentBackground', {
        get: function () {
            if (!this.IsDirty(16 ) && !isNullOrUndefined(this._parent)) {
                return this._parent.TransparentBackground;
            }
            return this._transparentBackground;
        },
        set: function (value) {
            this._transparentBackground = value;
            var fill = this._shapeBase.Fill;
            if (value) {
                fill.Transparency = 1;
            }
            fill.Solid();
            this.Dirty(16 );
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'Container', {
        get: function () {
            return this._shapeBase;
        },
        set: function (value ) {
            this._shapeBase = value;
            if (value) {
                var crop = this.Crop;
                crop.PictureWidth = value.Width;
                crop.PictureHeight = value.Height;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'PicFill', {
        get: function () {
            if (!this.IsDirty(32 ) && !isNullOrUndefined(this._parent)) {
                return this._parent.PicFill;
            }
            return this._picFill;
        },
        set: function (value) {
            this._picFill = value;
            this.Dirty(32 );
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictureFormat.prototype, 'PicType', {
        get: function () {
            if (!this.IsDirty(64 ) && !isNullOrUndefined(this._parent)) {
                return this._parent.PicType;
            }
            return this._picType;
        },
        set: function (value) {
            this._picType = value;
            this.Dirty(64 );
        },
        enumerable: true,
        configurable: true
    });
    PictureFormat.prototype.ClearModel = function () {
        this._oomodel = keyword_null;
        for (var _i = 0, _a = this.Children; _i < _a.length; _i++) {
            var item = _a[_i];
            item.ClearModel();
        }
    };
    Object.defineProperty(PictureFormat.prototype, 'PictureFormatType', {
        get: function () {
            return this._pictureFormatType;
        },
        set: function (value) {
            this._pictureFormatType = value;
        },
        enumerable: true,
        configurable: true
    });
    PictureFormat.prototype.HasOwnPicture = function () {
        return this.IsDirty(1 ) ||
            this.IsDirty(2 ) ||
            this.IsDirty(4 ) ||
            this.IsDirty(8 ) ||
            this.IsDirty(16 );
    };
    PictureFormat.prototype.SetPictureInfo = function (picFill, type, pictureFormatType) {
        this.PicFill = picFill;
        this.PicType = type;
        this.PictureFormatType = pictureFormatType;
    };
    PictureFormat.prototype.IncrementBrightness = function (Increment) {
        this.Brightness += Increment;
    };
    PictureFormat.prototype.IncrementContrast = function (Increment) {
        this.Contrast += Increment;
    };
    PictureFormat.prototype.FromOOModel = function (t) {
        var _this = this;
        _this._oomodel = t;
        if (isNullOrUndefined(t)) {
            return;
        }
        _this.FromCT_Blip(t.blip);
        var shapeBase = _this._shapeBase;
        if (isNullOrUndefined(shapeBase)) {
            return;
        }
        if (!isNullOrUndefined(t.tile)) {
            _this.PictureFormatType = drawingInterface_1.PictureFormatType.TextureFill;
        }
        _this.Crop.PictureWidth = shapeBase.Width;
        _this.Crop.PictureHeight = shapeBase.Height;
        if (_this.PictureFormatType === drawingInterface_1.PictureFormatType.PictureShape) {
            _this.FromCT_RelativeRect(t.srcRect);
        }
        else if (_this.PictureFormatType === drawingInterface_1.PictureFormatType.PictureFill) {
            _this.FromCT_Stretch(t.stretch);
        }
        else if (_this.PictureFormatType === drawingInterface_1.PictureFormatType.TextureFill) {
            _this.FromCT_Tile(t.tile);
        }
    };
    PictureFormat.prototype.ToOOModel = function () {
        var _this = this;
        var blipFill = _this._oomodel || {};
        blipFill.colorFillType = drawingInterface_1.ColorFillType.BlipFillProperties;
        blipFill.blip = _this.ToCT_Blip();
        var shapeBase = _this._shapeBase;
        if (isNullOrUndefined(shapeBase)) {
            return blipFill;
        }
        var pictureFormatType = _this.PictureFormatType;
        if (pictureFormatType === drawingInterface_1.PictureFormatType.PictureShape) {
            blipFill.srcRect = _this.ToCT_RelativeRect();
            blipFill.stretch = {} ;
            blipFill.stretch.fillRect = { l: 0, r: 0, t: 0, b: 0 };
        }
        else if (pictureFormatType === drawingInterface_1.PictureFormatType.PictureFill) {
            blipFill.stretch = _this.ToCT_Strecth();
            blipFill.srcRect = { l: 0, r: 0, t: 0, b: 0 };
            blipFill.tile = keyword_null;
        }
        else if (pictureFormatType === drawingInterface_1.PictureFormatType.TextureFill) {
            blipFill.stretch = keyword_null;
            blipFill.srcRect = keyword_null;
            blipFill.tile = _this.ToCT_Tile();
        }
        return blipFill;
    };
    PictureFormat.prototype.FromCT_Blip = function (blip) {
        if (isNullOrUndefined(blip)) {
            return;
        }
        var _this = this;
        _this.FromCT_ColorChangeEffect(blip.clrChange);
        _this.FromCT_LuminanceEffect(blip.lum);
        if (!isNullOrUndefined(blip.alphaModFix)) {
            _this.Transparency = 1 - (blip.alphaModFix.amt / PositiveFixedPercentageConvert);
        }
        if (!isNullOrUndefined(blip.grayscl)) {
            _this.ColorType = drawingInterface_1.PictureColorType.PictureGrayscale;
        }
        else if (!isNullOrUndefined(blip.biLevel)) {
            _this.ColorType = drawingInterface_1.PictureColorType.PictureBlackAndWhite;
        }
        _this.FromCT_BlipBlob(blip.blipBlob);
    };
    PictureFormat.prototype.ToCT_Blip = function () {
        var _this = this;
        var blip = _this._oomodel && _this._oomodel.blip || { cstate: drawingInterface_1.ST_BlipCompression.none } ;
        if (_this.TransparencyColor !== common_1.ShapeConstants.DefaultTransparent) {
            blip.clrChange = _this.ToCT_ColorChangeEffect();
        }
        if (_this.Brightness !== common_1.ShapeConstants.DefaultBrightness || _this.Contrast !== common_1.ShapeConstants.DefaultBrightness) {
            blip.lum = _this.ToCT_LuminanceEffect();
        }
        if (_this.Transparency !== common_1.ShapeConstants.DefaultTransparent) {
            blip.alphaModFix = { amt: (1 - _this.Transparency) * PositiveFixedPercentageConvert };
        }
        else {
            delete blip.alphaModFix;
        }
        if (_this.ColorType === drawingInterface_1.PictureColorType.PictureGrayscale) {
            blip.grayscl = {} ;
        }
        else if (_this.ColorType === drawingInterface_1.PictureColorType.PictureBlackAndWhite) {
            blip.biLevel = {

                thresh: 50000
            };
        }
        blip.blipBlob = _this.ToCT_BlipBlob();
        return blip;
    };
    PictureFormat.prototype.FromCT_ColorChangeEffect = function (clrChange) {
        var clr = clrChange && clrChange.clrFrom && clrChange.clrFrom.srgbClr;
        if (clr) {
            this.FromColorByteArr(clrChange.val);
        }
    };
    PictureFormat.prototype.ToCT_ColorChangeEffect = function () {
        var colorByteArr = this.ToColorByteArr(this._transparencyColor);
        return {
            useA: true ,
            clrFrom: {
                srgbClr: { val: colorByteArr }
            },
            clrTo: {
                srgbClr: {
                    val: colorByteArr,
                    alpha: [
                        0
                    ]
                }
            }
        };
    };
    PictureFormat.prototype.FromColorByteArr = function (val) {
        this._transparencyColor = (0 << 24) | (val[2] << 16) | (val[1] << 8) | val[0];
    };
    PictureFormat.prototype.ToColorByteArr = function (val) {
        var res = [];
        res[3] = Math.floor(val / (1 << 24));
        val = val % (1 << 24);
        res[2] = Math.floor(val / (1 << 16));
        val = val % (1 << 16);
        res[1] = Math.floor(val / (1 << 8));
        val = val % (1 << 8);
        res[0] = Math.floor(val);
        return res;
    };
    PictureFormat.prototype.FromCT_LuminanceEffect = function (lum) {
        if (lum) {
            this.Brightness = fromLum(lum.bright);
            this.Contrast = fromLum(lum.contrast);
        }
    };
    PictureFormat.prototype.ToCT_LuminanceEffect = function () {
        return {

            bright: toLum(this.Brightness),
            contrast: toLum(this.Contrast)
        };
    };
    PictureFormat.prototype.FromCT_BlipBlob = function (blipBlob) {
        if (blipBlob) {
            var _this = this;
            _this._picFill = blipBlob.blob;
            _this.Dirty(32 );
            _this._picType = blipBlob.type;
            _this.Dirty(64 );
        }
    };
    PictureFormat.prototype.ToCT_BlipBlob = function () {
        var _this = this;
        var blipBlob = _this._oomodel && _this._oomodel.blip && _this._oomodel.blip.blipBlob || { type: drawingInterface_1.ImageType.PNG } ;
        blipBlob.blob = _this.PicFill;
        blipBlob.type = _this.PicType;
        return blipBlob;
    };
    PictureFormat.prototype.FromCT_Tile = function (tile) {
        this._tile = {
            offsetX: tile.tx,
            offsetY: tile.ty,
            scaleX: tile.sx / PositionConver,
            scaleY: tile.sy / PositionConver,
            alignment: tile.algn,
            mirrorType: tile.flip
        };
    };
    PictureFormat.prototype.ToCT_Tile = function () {
        var tile = this.Tile;
        return {
            tx: tile.offsetX,
            ty: tile.offsetY,
            sx: Math.round(tile.scaleX * PositionConver),
            sy: Math.round(tile.scaleY * PositionConver),
            algn: tile.alignment,
            flip: tile.mirrorType
        };
    };
    PictureFormat.prototype.FromCT_Stretch = function (stretch) {
        var fillRect = stretch && stretch.fillRect;
        if (isNullOrUndefined(fillRect)) {
            return;
        }
        var left = fillRect.l / PositionConver;
        var right = fillRect.r / PositionConver;
        var top = fillRect.t / PositionConver;
        var bottom = fillRect.b / PositionConver;
        this._stretch = { left: left, right: right, top: top, bottom: bottom };
    };
    PictureFormat.prototype.ToCT_Strecth = function () {
        var _b = this.Stretch, left = _b.left, right = _b.right, top = _b.top, bottom = _b.bottom;
        return {
            fillRect: {
                l: Math.round(left * PositionConver),
                r: Math.round(right * PositionConver),
                t: Math.round(top * PositionConver),
                b: Math.round(bottom * PositionConver)
            }
        };
    };
    PictureFormat.prototype.FromCT_RelativeRect = function (srcRect) {
        var shapeBase = this._shapeBase;
        if (isNullOrUndefined(srcRect) || isNullOrUndefined(shapeBase)) {
            return;
        }
        var left = srcRect.l / PositionConver;
        var right = srcRect.r / PositionConver;
        var top = srcRect.t / PositionConver;
        var bottom = srcRect.b / PositionConver;
        var crop = this.Crop;
        var pictureWidth = crop.PictureWidth = shapeBase.Width / (1 - left - right);
        var pictureHeight = crop.PictureHeight = shapeBase.Height / (1 - top - bottom);
        crop.PictureOffsetX = (pictureWidth - shapeBase.Width) / 2 - left * pictureWidth;
        crop.PictureOffsetY = (pictureHeight - shapeBase.Height) / 2 - top * pictureHeight;
    };
    PictureFormat.prototype.ToCT_RelativeRect = function () {
        var shapeBase = this._shapeBase, crop = this.Crop, shapeHeight = crop.ShapeHeight, shapeWidth = crop.ShapeWidth;
        if (isNullOrUndefined(shapeBase) || shapeHeight === 0 || shapeWidth === 0) {
            return { l: 0, r: 0, t: 0, b: 0 };
        }
        var pictureWidth = crop.PictureWidth, pictureHeight = crop.PictureHeight, pictureOffsetX = crop.PictureOffsetX, pictureOffsetY = crop.PictureOffsetY;
        var left = ((pictureWidth - shapeWidth) / 2 - pictureOffsetX) / pictureWidth;
        var right = ((pictureWidth - shapeWidth) / 2 + pictureOffsetX) / pictureWidth;
        var top = ((pictureHeight - shapeHeight) / 2 - pictureOffsetY) / pictureHeight;
        var bottom = ((pictureHeight - shapeHeight) / 2 + pictureOffsetY) / pictureHeight;
        return {
            l: (left * PositionConver),
            r: (right * PositionConver),
            t: (top * PositionConver),
            b: (bottom * PositionConver),
        };
    };
    PictureFormat.prototype.Clone = function () {
        var _this = this;
        var format = new PictureFormat();
        format._brightness = _this._brightness;
        format._contrast = _this._contrast;
        format._colorType = _this._colorType;
        if (_this._crop) {
            format._crop = _this._crop.Clone();
        }
        format._transparency = _this._transparency;
        format._tile = JSON.parse(JSON.stringify(_this._tile));
        format._stretch = JSON.parse(JSON.stringify(_this._stretch));
        format._picFill = _this._picFill;
        format._pictureFormatType = _this._pictureFormatType;
        format._picType = _this._picType;
        format._shapeBase = _this._shapeBase;
        format._transparencyColor = _this._transparencyColor;
        format._transparentBackground = _this._transparentBackground;
        return format;
    };
    PictureFormat.prototype.OnParentChanged = function (newParent) {
        this._parent = newParent;
    };
    return PictureFormat;
}(stateful_1.StatefullBase));
exports.PictureFormat = PictureFormat;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/stateful.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/stateful.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Types = Common_1.Common._Types, isNullOrUndefined = Types._isNullOrUndefined;
var StatefullBase = (function () {
    function StatefullBase(parent) {
        var _this = this;
        _this._children = [];
        _this._workingState = 0;
        _this._states = 0;
        _this._parentStateFull = parent;
        if (_this._parentStateFull) {
            _this._parentStateFull.AddChildInternal(_this);
        }
    }
    StatefullBase.prototype.SetState = function (prop, state) {
        var _this = this;
        var stateValue = prop;
        if (state) {
            _this._states |= stateValue;
        }
        else {
            _this._states &= (~stateValue);
        }
        if (!_this.IsClearChildrenStateSuspended) {
            _this._children.forEach(function (item) {
                item.SetState(prop, false);
            });
        }
    };
    StatefullBase.prototype.GetState = function (prop, includingParent) {
        var _this = this;
        var stateValue = prop;
        var state = ((stateValue & _this._states) === stateValue);
        if (!state && includingParent && !isNullOrUndefined(_this._parentStateFull)) {
            state = _this._parentStateFull.GetState(prop, true);
        }
        return state;
    };
    StatefullBase.prototype.OnStateChanged = function (prop) {
    };
    StatefullBase.prototype.Dirty = function (prop) {
        this.SetState(prop, true);
    };
    StatefullBase.prototype.UnDirty = function (prop) {
        this.SetState(prop, false);
    };
    StatefullBase.prototype.UnDirtyAll = function () {
        this._states = 0;
    };
    StatefullBase.prototype.IsDirty = function (prop) {
        return this.GetState(prop);
    };
    StatefullBase.prototype.IsPropDirtyIncludingParent = function (prop, includingParent) {
        var _this = this;
        var dirty = _this.GetState(prop);
        if (dirty) {
            return true;
        }
        if (includingParent && !isNullOrUndefined(_this._parentStateFull)) {
            return _this._parentStateFull.IsPropDirtyIncludingParent(prop, true);
        }
        return false;
    };
    StatefullBase.prototype.IsDirtyIncludingParent = function (includingParent) {
        var _this = this;
        if (_this._states > 0) {
            return true;
        }
        if (includingParent && !isNullOrUndefined(_this._parentStateFull)) {
            return _this._parentStateFull.IsDirtyIncludingParent(true);
        }
        return false;
    };
    StatefullBase.prototype.AddChildInternal = function (child) {
        var children = this._children;
        if (children.indexOf(child) === -1) {
            children.push(child);
        }
    };
    StatefullBase.prototype.RemoveChildInternal = function (child) {
        var children = this._children, index = children.indexOf(child);
        if (index !== -1) {
            children.splice(index, 1);
        }
    };


    StatefullBase.prototype.SetParentForChildren = function (newParent) {
        var copy = this._children.slice(0);
        copy.forEach(function (item) {
            item.ParentStateful = newParent;
        });
    };
    StatefullBase.prototype.OnParentChanged = function (newParent) {
    };
    StatefullBase.prototype.SuspendClearChildrenState = function () {
        this._workingState++;
    };
    StatefullBase.prototype.ResumeClearChilrenState = function () {
        this._workingState--;
    };
    Object.defineProperty(StatefullBase.prototype, 'ParentStateful', {
        get: function () {
            return this._parentStateFull;
        },
        set: function (value) {
            var _this = this;
            if (value !== _this._parentStateFull) {
                if (_this._parentStateFull) {
                    _this._parentStateFull.RemoveChildInternal(this);
                }
                _this._parentStateFull = value;
                if (_this._parentStateFull) {
                    _this._parentStateFull.AddChildInternal(this);
                }
                _this.OnParentChanged(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatefullBase.prototype, 'Children', {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatefullBase.prototype, 'IsClearChildrenStateSuspended', {
        get: function () {
            return this._workingState > 0;
        },
        enumerable: true,
        configurable: true
    });
    return StatefullBase;
}());
exports.StatefullBase = StatefullBase;
/***/ }),

/***/ './dist/plugins/floatingObject/drawing/threeDFormat.js':
/*!*************************************************************!*\
  !*** ./dist/plugins/floatingObject/drawing/threeDFormat.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });
var common_1 = __webpack_require__(/*! ./common */ './dist/plugins/floatingObject/drawing/common.js');
var stateful_1 = __webpack_require__(/*! ./stateful */ './dist/plugins/floatingObject/drawing/stateful.js');
var drawingInterface_1 = __webpack_require__(/*! ./drawingInterface */ './dist/plugins/floatingObject/drawing/drawingInterface.js');
var PositiveFixedAngleConvert = common_1.ShapeConstants.PositiveFixedAngleConvert;
var isNullOrUndefined = common_1.UnitHelper.isNullOrUndefined;

var ThreeDFormatStates;
(function (ThreeDFormatStates) {
    ThreeDFormatStates[ThreeDFormatStates['BevelBottomDepth'] = 1] = 'BevelBottomDepth';
    ThreeDFormatStates[ThreeDFormatStates['BevelBottomInset'] = 2] = 'BevelBottomInset';
    ThreeDFormatStates[ThreeDFormatStates['BevelBottomType'] = 4] = 'BevelBottomType';
    ThreeDFormatStates[ThreeDFormatStates['BevelTopDepth'] = 8] = 'BevelTopDepth';
    ThreeDFormatStates[ThreeDFormatStates['BevelTopInset'] = 16] = 'BevelTopInset';
    ThreeDFormatStates[ThreeDFormatStates['BevelTopType'] = 32] = 'BevelTopType';
    ThreeDFormatStates[ThreeDFormatStates['ContourColor'] = 64] = 'ContourColor';
    ThreeDFormatStates[ThreeDFormatStates['ContourWidth'] = 128] = 'ContourWidth';
    ThreeDFormatStates[ThreeDFormatStates['Depth'] = 256] = 'Depth';
    ThreeDFormatStates[ThreeDFormatStates['ExtrusionColor'] = 512] = 'ExtrusionColor';
    ThreeDFormatStates[ThreeDFormatStates['ExtrusionColorType'] = 1024] = 'ExtrusionColorType';
    ThreeDFormatStates[ThreeDFormatStates['FieldOfView'] = 2048] = 'FieldOfView';
    ThreeDFormatStates[ThreeDFormatStates['LightAngle'] = 4096] = 'LightAngle';
    ThreeDFormatStates[ThreeDFormatStates['Perspective'] = 8192] = 'Perspective';
    ThreeDFormatStates[ThreeDFormatStates['PresetCamera'] = 16384] = 'PresetCamera';
    ThreeDFormatStates[ThreeDFormatStates['PresetExtrusionDirection'] = 32768] = 'PresetExtrusionDirection';
    ThreeDFormatStates[ThreeDFormatStates['PresetLighting'] = 65536] = 'PresetLighting';
    ThreeDFormatStates[ThreeDFormatStates['PresetLightingDirection'] = 131072] = 'PresetLightingDirection';
    ThreeDFormatStates[ThreeDFormatStates['PresetLightingSoftness'] = 262144] = 'PresetLightingSoftness';
    ThreeDFormatStates[ThreeDFormatStates['PresetMaterial'] = 524288] = 'PresetMaterial';
    ThreeDFormatStates[ThreeDFormatStates['PresetThreeDFormat'] = 1048576] = 'PresetThreeDFormat';
    ThreeDFormatStates[ThreeDFormatStates['ProjectText'] = 2097152] = 'ProjectText';
    ThreeDFormatStates[ThreeDFormatStates['RotationX'] = 4194304] = 'RotationX';
    ThreeDFormatStates[ThreeDFormatStates['RotationY'] = 8388608] = 'RotationY';
    ThreeDFormatStates[ThreeDFormatStates['RotationZ'] = 16777216] = 'RotationZ';
    ThreeDFormatStates[ThreeDFormatStates['Visible'] = 33554432] = 'Visible';
    ThreeDFormatStates[ThreeDFormatStates['Z'] = 67108864] = 'Z';
    ThreeDFormatStates[ThreeDFormatStates['AutoScale'] = 134217728] = 'AutoScale';
    ThreeDFormatStates[ThreeDFormatStates['DepthPercent'] = 268435456] = 'DepthPercent';
    ThreeDFormatStates[ThreeDFormatStates['HeightPercent'] = 536870912] = 'HeightPercent';
    ThreeDFormatStates[ThreeDFormatStates['RightAngleAxes'] = 1073741824] = 'RightAngleAxes';
})(ThreeDFormatStates = exports.ThreeDFormatStates || (exports.ThreeDFormatStates = {}));
var ExtrusionColorType;
(function (ExtrusionColorType) {
    ExtrusionColorType[ExtrusionColorType['ExtrusionColorAutomatic'] = 0] = 'ExtrusionColorAutomatic';


    ExtrusionColorType[ExtrusionColorType['ExtrusionColorCustom'] = 1] = 'ExtrusionColorCustom';
})(ExtrusionColorType || (ExtrusionColorType = {}));
var keyword_null = null;


var ThreeDFormat = (function (_super) {
    __extends(ThreeDFormat, _super);
    function ThreeDFormat(context, parent) {
        var _this_1 = _super.call(this, parent) || this;
        var _this = _this_1;
        _this._bevelBottomType = common_1.BevelType.BevelNone;
        _this._bevelTopType = common_1.BevelType.BevelNone;
        _this._extrusionColorType = ExtrusionColorType.ExtrusionColorAutomatic;
        _this._fieldOfView = 45;
        _this._visible = true;
        _this._dicCameraType = keyword_null;
        _this._autoScale = true;
        _this._depthPercent = 100;
        _this._heightPercent = 100;
        _this._rightAngleAxes = true;
        _this._context = context;
        _this._perspective = 30;
        _this._parent = parent;
        _this._SetPresetCamera(drawingInterface_1.PresetCamera.PresetCameraNone);
        return _this_1;
    }
    ThreeDFormat.prototype._SetPresetCamera = function (value) {
        var _this = this;
        _this._presetCamera = value;
        _this.Dirty(ThreeDFormatStates.PresetCamera);
    };
    ThreeDFormat.prototype.InitDicCameraType = function () {
        var dicCameraType = this._dicCameraType = [];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueTopLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueTop] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueTopRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueFront] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueBottomLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueBottom] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyObliqueBottomRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveTopLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveTop] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveTopRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveFront] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveBottomLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveBottom] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraLegacyPerspectiveBottomRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraOrthographicFront] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricTopUp] = [314.7191, 324.6037, 60.16242];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricTopDown] = [45.28088, 324.6037, 299.8376];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricBottomUp] = [45.28088, 35.39627, 60.16242];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricBottomDown] = [314.7191, 35.39627, 299.8376];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricLeftUp] = [45, 325, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricLeftDown] = [45, 35, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricRightUp] = [315, 35, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricRightDown] = [315, 325, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis1Left] = [64, 18, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis1Right] = [334, 18, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis1Top] = [306.5457, 301.2619, 57.6425];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis2Left] = [26, 18, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis2Right] = [296, 18, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis2Top] = [53.45424, 301.2619, 302.3575];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis3Left] = [64, 342, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis3Right] = [334, 342, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis3Bottom] = [306.5457, 58.73808, 302.3575];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis4Left] = [26, 342, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis4Right] = [296, 342, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraIsometricOffAxis4Bottom] = [53.45424, 58.73808, 57.64252];
        dicCameraType[drawingInterface_1.PresetCamera.CameraObliqueTopLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraObliqueTop] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraObliqueTopRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraObliqueLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraObliqueRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraObliqueBottomLeft] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraObliqueBottom] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraObliqueBottomRight] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveFront] = [0, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveLeft] = [20, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveRight] = [340, 0, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveAbove] = [0, 340, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveBelow] = [0, 20, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveAboveLeftFacing] = [14.33758, 39.30647, 341.1238];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveAboveRightFacing] = [345.6624, 39.30647, 18.87615];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveContrastingLeftFacing] = [43.93887, 10.39642, 356.4465];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveContrastingRightFacing] = [316.0611, 10.39642, 3.553517];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveHeroicLeftFacing] = [14.29302, 348.9837, 2.626817];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveHeroicRightFacing] = [345.7069, 348.9837, 357.3732];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveHeroicExtremeLeftFacing] = [34.46068, 8.12245, 357.0914];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveHeroicExtremeRightFacing] = [325.5393, 8.12245, 2.9086];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveRelaxed] = [0, 309.5601, 0];
        dicCameraType[drawingInterface_1.PresetCamera.CameraPerspectiveRelaxedModerately] = [0, 324.844, 0];
    };
    ThreeDFormat.prototype.SetPresetCamera = function (type) {
        var _this = this;
        _this._presetCamera = type;
        _this.Dirty(ThreeDFormatStates.PresetCamera);
    };
    ThreeDFormat.prototype.UpdatePresetCamera = function () {
        var _this = this;
        if (_this._presetCamera === drawingInterface_1.PresetCamera.PresetCameraNone) {
            _this.SetPresetCamera(drawingInterface_1.PresetCamera.CameraOrthographicFront);
        }
    };
    ThreeDFormat.prototype.IncrementRotationX = function (Increment) {
        this.RotationX += Increment;
    };
    ThreeDFormat.prototype.IncrementRotationY = function (Increment) {
        this.RotationY += Increment;
    };
    ThreeDFormat.prototype.IncrementRotationZ = function (Increment) {
        this.RotationZ += Increment;
    };
    ThreeDFormat.prototype.ResetRotation = function () {
        var self = this;
        self.RotationX = 0;
        self.RotationY = 0;
        self.RotationZ = 0;
    };
    ThreeDFormat.prototype.Clone = function () {
        var _this = this;
        var format = new ThreeDFormat(_this._context);
        format._bevelBottomDepth = _this._bevelBottomDepth;
        format._bevelBottomInset = _this._bevelBottomInset;
        format._bevelBottomType = _this._bevelBottomType;
        format._bevelTopDepth = _this._bevelTopDepth;
        format._bevelTopInset = _this._bevelTopInset;
        format._bevelTopType = _this._bevelTopType;
        if (!isNullOrUndefined(_this._contourColor)) {
            format._contourColor = _this._contourColor.Clone();
        }
        format._contourWidth = _this._contourWidth;
        format._depth = _this._depth;
        if (!isNullOrUndefined(_this._extrusionColor)) {
            format._extrusionColor = _this._extrusionColor.Clone();
        }
        format._extrusionColorType = _this._extrusionColorType;
        format._fieldOfView = _this._fieldOfView;
        format._lightAngle = _this._lightAngle;
        format._perspective = _this._perspective;
        format._presetCamera = _this._presetCamera;
        format._presetExtrusionDirection = _this._presetExtrusionDirection;
        format._presetLighting = _this._presetLighting;
        format._presetLightingDirection = _this._presetLightingDirection;
        format._presetLightingSoftness = _this._presetLightingSoftness;
        format._presetMaterial = _this._presetMaterial;
        format._presetThreeDFormat = _this._presetThreeDFormat;
        format._projectText = _this._projectText;
        format._rotationX = _this._rotationX;
        format._rotationY = _this._rotationY;
        format._rotationZ = _this._rotationZ;
        format._visible = _this._visible;
        format._z = _this._z;
        format._states = _this._states;
        format._parent = _this._parent;
        return format;
    };
    ThreeDFormat.prototype.IsDirtyIncludingParent = function (includingParent) {
        var _this = this;
        if (_this._contourColor && _this._contourColor.IsDirtyIncludingParent(includingParent)) {
            return true;
        }
        if (_this._extrusionColor && _this._extrusionColor.IsDirtyIncludingParent(includingParent)) {
            return true;
        }
        return _super.prototype.IsDirtyIncludingParent.call(this, includingParent);
    };
    ThreeDFormat.prototype.OnParentChanged = function (newParent) {
        var _this = this;
        _this._parent = newParent;
        if (isNullOrUndefined(_this._parent)) {
            if (_this._contourColor) {
                _this._contourColor.ParentStateful = keyword_null;
            }
            if (_this._extrusionColor) {
                _this._extrusionColor.ParentStateful = keyword_null;
            }
        }
    };
    ThreeDFormat.prototype.FromOOModel = function (t) {
        var _this = this;
        _this._ooModel = t;
        _this.FromCT_Scene3D(_this._ooModel.Scene3D);
        _this.FromCT_View3D(_this._ooModel.View3D);
        _this.FromCT_Shape3D(_this._ooModel.Shape3D);
    };
    ThreeDFormat.prototype.ToOOModel = function (lossless) {
        var _this = this;
        var ooModel = _this._ooModel || {};
        ooModel.View3D = _this.ToCT_View3D();
        if (_this.PresetCamera !== drawingInterface_1.PresetCamera.PresetCameraNone) {
            ooModel.Scene3D = _this.ToCT_Scene3D();
        }
        if (_this.IsPropDirtyIncludingParent(ThreeDFormatStates.Depth, true) ||
            _this.IsPropDirtyIncludingParent(ThreeDFormatStates.Z, true)) {
            ooModel.Shape3D = _this.ToCT_Shape3D();
        }
        return ooModel;
    };
    ThreeDFormat.prototype.FromCT_View3D = function (view3D) {
        var _this = this;
        if (isNullOrUndefined(view3D)) {
            return;
        }
        if (!isNullOrUndefined(view3D.hPercent)) {
            _this._HeightPercent = view3D.hPercent;
        }
        if (!isNullOrUndefined(view3D.depthPercent)) {
            _this._DepthPercent = view3D.depthPercent;
        }
        if (!isNullOrUndefined(view3D.rotX)) {
            _this.RotationY = view3D.rotX;
        }
        if (!isNullOrUndefined(view3D.rotY)) {
            _this.RotationX = view3D.rotY;
        }
        if (!isNullOrUndefined(view3D.rAngAx)) {
            _this._RightAngleAxes = view3D.rAngAx;
        }
        else {
            _this._RightAngleAxes = false;
        }
        if (!isNullOrUndefined(view3D.perspective)) {
            _this.Perspective = view3D.perspective / 2;
        }
    };
    ThreeDFormat.prototype.ToCT_View3D = function () {
        var _this = this;
        var view3D = _this._ooModel && _this._ooModel.View3D || {} ;
        if (!_this._AutoScale &&
            _this.IsDirty(ThreeDFormatStates.HeightPercent)) {
            view3D.hPercent = _this._HeightPercent;
        }
        if (_this.IsDirty(ThreeDFormatStates.DepthPercent)) {
            view3D.depthPercent = _this._DepthPercent;
        }

        if (_this.IsDirty(ThreeDFormatStates.RotationY)) {
            view3D.rotX = _this.RotationY;
        }
        if (_this.IsDirty(ThreeDFormatStates.RotationX)) {
            view3D.rotY = _this.RotationX;
        }
        if (_this.IsDirty(ThreeDFormatStates.RightAngleAxes)) {
            view3D.rAngAx = _this._RightAngleAxes;
        }
        if (!_this._RightAngleAxes &&
            _this.IsDirty(ThreeDFormatStates.Perspective)) {
            view3D.perspective = _this.Perspective * 2;
        }
        return view3D;
    };
    ThreeDFormat.prototype.FromCT_Scene3D = function (scene3D) {
        if (isNullOrUndefined(scene3D)) {
            return;
        }

        this.FromCT_Camera(scene3D.camera);
    };
    ThreeDFormat.prototype.ToCT_Scene3D = function () {
        var _this = this;
        var _ooModel = _this._ooModel;
        var scene3d = _ooModel && _ooModel.Scene3D || {} ;

        scene3d.camera = _this.ToCT_Camera();

        if (!isNullOrUndefined(scene3d.camera) && isNullOrUndefined(scene3d.lightRig)) {
            scene3d.lightRig = _this.ToDefaultCT_LightRig();
        }
        if (!isNullOrUndefined(scene3d.camera) || !isNullOrUndefined(scene3d.backdrop) || !isNullOrUndefined(scene3d.lightRig)) {
            return scene3d;
        }
        return keyword_null;
    };
    ThreeDFormat.prototype.GetActualCT_Scene3D = function () {
        var _this = this;
        if (!isNullOrUndefined(_this._ooModel) && !isNullOrUndefined(_this._ooModel.Scene3D)) {
            return _this._ooModel.Scene3D;
        }
        if (!isNullOrUndefined(_this._parent)) {
            return _this.GetActualCT_Scene3D();
        }
        return keyword_null;
    };
    ThreeDFormat.prototype.FromCT_Shape3D = function (shape3D) {
        var _this = this;
        if (isNullOrUndefined(shape3D)) {
            return;
        }

        if (shape3D.extrusionH !== 0) {
            _this.Depth = shape3D.extrusionH;
            _this.Dirty(ThreeDFormatStates.Depth);
        }


        if (shape3D.z !== 0) {
            _this.Z = shape3D.z;
            _this.Dirty(ThreeDFormatStates.Z);
        }
    };
    ThreeDFormat.prototype.ToCT_Shape3D = function () {
        var _this = this;
        var _ooModel = _this._ooModel;
        var shape3d = _ooModel && _ooModel.Shape3D || {
            z: 0,
            extrusionH: 0,
            contourW: 0,
            prstMaterial: drawingInterface_1.ST_PresetMaterialType.warmMatte
        } ;

        shape3d.extrusionH = _this.Depth;


        shape3d.z = _this.Z;
        return shape3d;
    };
    ThreeDFormat.prototype.ToDefaultCT_LightRig = function () {
        return {
            rig: drawingInterface_1.LightRigType.LightRigThreePoint,
            dir: drawingInterface_1.PresetLightingDirection.LightingTopLeft
        };
    };


    ThreeDFormat.prototype.FromCT_Camera = function (camera) {
        if (isNullOrUndefined(camera)) {
            return;
        }
        this._SetPresetCamera(camera.prst);
        if (!isNullOrUndefined(camera.rot)) {
            this.FromCameraCT_SphereCoords(camera.rot);
        }
    };
    ThreeDFormat.prototype.ToCT_Camera = function () {
        var _this = this;
        if (_this._context.DrawingType === drawingInterface_1.DrawingType.Shape ||
            _this._context.DrawingType === drawingInterface_1.DrawingType.GroupShape) {
            var camera = { zoom: 100000 } ;
            camera.prst = _this.PresetCamera;
            camera.rot = _this.ToCameraCT_SphereCoords();
            return camera;
        }
        var _ooModel = _this._ooModel;
        return _ooModel && _ooModel.Scene3D && _ooModel.Scene3D.camera || keyword_null;
    };
    ThreeDFormat.prototype.FromCameraCT_SphereCoords = function (coords) {
        var _this = this;
        if (isNullOrUndefined(coords)) {
            return;
        }
        _this.RotationX = coords.lon / PositiveFixedAngleConvert;


        _this.RotationY = coords.lat / PositiveFixedAngleConvert;


        _this.RotationZ = coords.rev / PositiveFixedAngleConvert;
    };


    ThreeDFormat.prototype.ToCameraCT_SphereCoords = function () {
        var _this = this;
        if (_this.RotationX === 0 &&
            _this.RotationY === 0 &&
            _this.RotationZ === 0) {
            return keyword_null;
        }
        var coords = {};
        var x = _this.RotationX;


        var y = _this.RotationY;


        var z = _this.RotationZ;


        coords.lon = x * PositiveFixedAngleConvert;
        coords.lat = y * PositiveFixedAngleConvert;
        coords.rev = z * PositiveFixedAngleConvert;
        return coords;
    };
    Object.defineProperty(ThreeDFormat.prototype, 'Perspective', {
        get: function () {
            var _this = this;
            _this.Dirty(ThreeDFormatStates.Perspective);
            if (!isNullOrUndefined(_this._parent)) {
                return _this._parent.Perspective;
            }
            return _this._perspective;
        },
        set: function (value) {
            var _this = this;
            _this._perspective = value;
            _this.Dirty(ThreeDFormatStates.Perspective);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, 'PresetCamera', {
        get: function () {
            var _this = this;
            _this.Dirty(ThreeDFormatStates.PresetCamera);
            if (!isNullOrUndefined(_this._parent)) {
                return _this._parent.PresetCamera;
            }
            return _this._presetCamera;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, 'RotationX', {
        get: function () {
            var _this = this;
            _this.Dirty(ThreeDFormatStates.RotationX);
            if (!isNullOrUndefined(_this._parent)) {
                return _this._parent.RotationX;
            }
            if (!_this.Visible) {
                return 0;
            }
            return _this._rotationX;
        },
        set: function (value) {
            var _this = this;

            if (value !== _this._rotationX) {
                _this._rotationX = value;
                _this.Dirty(ThreeDFormatStates.RotationX);
                _this.UpdatePresetCamera();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, 'RotationY', {
        get: function () {
            var _this = this;
            _this.Dirty(ThreeDFormatStates.RotationY);
            if (!isNullOrUndefined(_this._parent)) {
                return _this._parent.RotationY;
            }
            if (!_this.Visible) {
                return 0;
            }
            return _this._rotationY;
        },
        set: function (value) {
            var _this = this;
            if (_this._context.DrawingType === drawingInterface_1.DrawingType.Chart) {
                if (value < -90 && value >= 180) {
                    return;
                }
            }
            else if (value < 0 && value >= 360) {
                return;
            }
            _this._rotationY = value;
            _this.Dirty(ThreeDFormatStates.RotationY);
            _this.UpdatePresetCamera();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, 'RotationZ', {
        get: function () {
            var _this = this;
            _this.Dirty(ThreeDFormatStates.RotationZ);
            if (!isNullOrUndefined(_this._parent)) {
                return _this._parent.RotationZ;
            }
            if (!_this.Visible) {
                return 0;
            }
            return _this._rotationZ;
        },
        set: function (value) {
            var _this = this;

            if (value !== _this._rotationZ) {
                _this._rotationZ = value;
                _this.Dirty(ThreeDFormatStates.RotationZ);
                _this.UpdatePresetCamera();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, 'Visible', {
        get: function () {
            var _this = this;
            _this.Dirty(ThreeDFormatStates.Visible);
            if (!isNullOrUndefined(_this._parent)) {
                return _this._parent.Visible;
            }
            return _this._visible;
        },
        set: function (value) {
            var _this = this;
            _this._visible = value;
            _this.Dirty(ThreeDFormatStates.Visible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, 'Z', {
        get: function () {
            var _this = this;
            _this.Dirty(ThreeDFormatStates.Z);
            if (!isNullOrUndefined(_this._parent)) {
                return _this._parent.Z;
            }
            if (!_this.Visible) {
                return 0;
            }
            return _this._z;
        },
        set: function (value) {
            var _this = this;
            _this._z = value;
            _this.Dirty(ThreeDFormatStates.Z);
            _this.UpdatePresetCamera();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, 'Depth', {
        get: function () {
            var _this = this;
            _this.Dirty(ThreeDFormatStates.Depth);
            if (!isNullOrUndefined(_this._parent)) {
                return _this._parent.Depth;
            }
            if (!_this.Visible) {
                return 0;
            }
            return _this._depth;
        },
        set: function (value) {
            var _this = this;
            _this._depth = value;
            _this.Dirty(ThreeDFormatStates.Depth);
            _this.UpdatePresetCamera();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, 'DicCameraType', {
        get: function () {
            var _this = this;
            if (isNullOrUndefined(_this._dicCameraType)) {
                _this.InitDicCameraType();
            }
            return _this._dicCameraType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, '_InternalVisible', {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, '_AutoScale', {
        get: function () {
            return this._autoScale;
        },
        set: function (value) {
            var _this = this;
            _this._autoScale = value;
            _this.Dirty(ThreeDFormatStates.AutoScale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, '_DepthPercent', {
        get: function () {
            return this._depthPercent;
        },
        set: function (value) {
            var _this = this;
            if (value >= 20 && value <= 2000) {
                _this._depthPercent = value;
                _this.Dirty(ThreeDFormatStates.DepthPercent);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, '_HeightPercent', {
        get: function () {
            return this._heightPercent;
        },
        set: function (value) {
            var _this = this;
            if (value >= 5 && value <= 500) {
                _this._heightPercent = value;
                _this.Dirty(ThreeDFormatStates.HeightPercent);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDFormat.prototype, '_RightAngleAxes', {
        get: function () {
            return this._rightAngleAxes;
        },
        set: function (value) {
            var _this = this;
            _this._rightAngleAxes = value;
            _this.Dirty(ThreeDFormatStates.RightAngleAxes);
        },
        enumerable: true,
        configurable: true
    });
    return ThreeDFormat;
}(stateful_1.StatefullBase));
exports.ThreeDFormat = ThreeDFormat;
/***/ }),

/***/ './dist/plugins/floatingObject/floatingobject-actions.js':
/*!***************************************************************!*\
  !*** ./dist/plugins/floatingObject/floatingobject-actions.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var floatingobject_1 = __webpack_require__(/*! ./floatingobject */ './dist/plugins/floatingObject/floatingobject.js');
var $ = Core_1.GC$, $_isArray = $.isArray, getLength = Common_1.Common._ArrayHelper._getLength, keyword_null = null, Math_min = Math.min, isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var UN_SELECTE_ALL_FLOATINGOBJECT_S = 'unSelectAllFloatingObjects', DELETE_FLOATINGOBJECT_S = 'deleteFloatingObjects', NAVIGATION_NEXT_FLOATINGOBJECT = 'navigationNextFloatingObject', NAVIGATION_PREVIOUS_FLOATINGOBJECT = 'navigationPreviousFloatingObject', CUT_FLOATINGOBJECT_S = 'cutFloatingObjects', COPY_FLOATINGOBJECT_S = 'copyFloatingObjects', PASTE_FLOATINGOBJECT_S = 'pasteFloatingObjects', DRAG_COPY_FLOATINGOBJECT_S = 'dragCopyFloatingObjects', SELECT_ALL_FLOATINGOBJECT_S = 'selectAllFloatingObjects', MOVE_FLOATINGOBJECT_S = 'moveFloatingObjects', MOVE_FLOATINGOBJECT_S_UP = 'moveFloatingObjectsUp', MOVE_FLOATINGOBJECT_S_DOWN = 'moveFloatingObjectsDown', MOVE_FLOATINGOBJECT_S_LEFT = 'moveFloatingObjectsLeft', MOVE_FLOATINGOBJECT_S_RIGHT = 'moveFloatingObjectsRight', RESIZE_FLOATINGOBJECT_S = 'resizeFloatingObjects', IS_SELECTED = 'isSelected', NAME = 'name';
var executeCommand = Core_1.Commands._executeCommand;
function hasSelectedFloatingObject(sheet) {
    var floatingObjectModel = sheet._floatingObjectModel, selected = false;
    if (floatingObjectModel) {
        floatingObjectModel._all().forEach(function (p) {
            if (p && p[IS_SELECTED]()) {
                selected = true;
            }
        });
    }
    return selected;
}
function resetFloatingObjectFocusByName(sheet, names) {
    var len = getLength(names), i, item;
    if (getLength(names) > 0) {
        for (i = 0; i < len; i++) {
            item = sheet._floatingObjectModel._get(names[i]);
            if (item) {
                item.isSelected(true);
            }
        }
    }
}
function updateFloatingObjectCommandOldPosition(sheet, command, names, floatingObject, notNeedClearSelections) {
    var spread = sheet.parent;
    var floatingObjects = [];
    var floatingObjectModel = sheet._floatingObjectModel;
    if (!floatingObject) {
        for (var i = 0; i < names.length; i++) {
            floatingObjects.push(floatingObjectModel._get(names[i]));
        }
    }
    else {
        floatingObjects = floatingObject;
    }
    if (spread && command._oldPosition && floatingObjects[0]) {
        var activeCellRow = floatingObjects[0].startRow(), activeCellCol = floatingObjects[0].startColumn();
        spread.changeSelectionInCommandExecuting(command, activeCellRow, activeCellCol, [], floatingObjects);
        command._oldPosition._notNeedClearSelections = notNeedClearSelections;
    }
}
var FloatingObjectUndoActionBase = (function (_super) {
    __extends(FloatingObjectUndoActionBase, _super);
    function FloatingObjectUndoActionBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatingObjectUndoActionBase.prototype.canExecute = function () {
        if (hasSelectedFloatingObject(this._sheet)) {
            return true;
        }
        return false;
    };
    FloatingObjectUndoActionBase.prototype.canUndo = function () {
        var changesKey = Core_1.Commands._getChangesKey(this._sheet.name());
        var changes = this._command[changesKey];
        var floatingObjectChanges = changes && changes._floatingObjectChanges;
        if (floatingObjectChanges && getLength(floatingObjectChanges) > 0) {
            return true;
        }
        floatingObjectChanges = changes && changes._slicerChanges;
        if (floatingObjectChanges && getLength(floatingObjectChanges) > 0) {
            return true;
        }
        return false;
    };
    return FloatingObjectUndoActionBase;
}(Core_1.Commands.ActionBase));
exports.FloatingObjectUndoActionBase = FloatingObjectUndoActionBase;
var DeleteFloatingObjectUndoAction = (function (_super) {
    __extends(DeleteFloatingObjectUndoAction, _super);
    function DeleteFloatingObjectUndoAction(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    DeleteFloatingObjectUndoAction.prototype.execute = function () {
        var self = this, ret = false, sheet = self._sheet, command = self._command, names = command.floatingObjects;
        if (self.canExecute() && $_isArray(names)) {
            updateFloatingObjectCommandOldPosition(sheet, command, names);
            sheet._modelManager.startTransaction();
            self._beforeAction(sheet, true);
            var floatingObjectModel = sheet._floatingObjectModel;
            for (var i = 0, len = getLength(names); i < len; i++) {
                var item = floatingObjectModel._get(names[i]);
                if (item) {
                    var sc = sheet.slicers;
                    if (self._isSlicer(item) && sc) {
                        sc._removeInternal(item[NAME]());
                    }
                    floatingObjectModel._remove(names[i], true);
                    item[IS_SELECTED](false);
                }
            }
            sheet._loadAndSetSheetSelections();
            self._afterAction(sheet, true);
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            command[changesKey] = sheet._modelManager.endTransaction();
            ret = (getLength(names) > 0);
        }
        return ret;
    };
    DeleteFloatingObjectUndoAction.prototype.undo = function () {
        var self = this, command = self._command, sheet = self._sheet;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            sheet._modelManager.undo(command[changesKey]);


            sheet._saveAndClearSheetSelections();
            self._afterAction(sheet, true);
            return true;
        }
        return false;
    };
    DeleteFloatingObjectUndoAction.prototype._isSlicer = function (floatingObject) {
        return floatingObject && floatingObject.typeName === 'Slicer';
    };
    return DeleteFloatingObjectUndoAction;
}(FloatingObjectUndoActionBase));
exports.DeleteFloatingObjectUndoAction = DeleteFloatingObjectUndoAction;
function floatingObjectMoveResizeUndo(context) {
    var self = context, sheet = self._sheet;
    if (self.canUndo()) {
        self._beforeAction(sheet, true);
        var changesKey = Core_1.Commands._getChangesKey(sheet.name());
        sheet._modelManager.undo(self._command[changesKey]);
        self._afterAction(sheet, true);
        return true;
    }
    return false;
}
var MovingFloatingObjectUndoAction = (function (_super) {
    __extends(MovingFloatingObjectUndoAction, _super);
    function MovingFloatingObjectUndoAction(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    MovingFloatingObjectUndoAction.prototype.canExecute = function () {
        return true;
    };
    MovingFloatingObjectUndoAction.prototype.execute = function () {
        var self = this, ret = false, command = self._command, names = command.floatingObjects, sheet = self._sheet;
        if (self.canExecute() && $_isArray(names)) {
            updateFloatingObjectCommandOldPosition(sheet, command, names);
            sheet._modelManager.startTransaction();
            self._beforeAction(sheet, true);
            var floatingObjectModel = sheet._floatingObjectModel;
            for (var i = 0, len = getLength(names); i < len; i++) {
                var item = floatingObjectModel._get(names[i]);
                if (!item.allowMove()) {
                    continue;
                }
                var position = item.position();
                item.position(new Core_1.Point(position.x + command.offsetX, position.y + command.offsetY));
            }
            self._afterAction(sheet, true);
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            command[changesKey] = sheet._modelManager.endTransaction();
            ret = (getLength(names) > 0);
        }
        return ret;
    };
    MovingFloatingObjectUndoAction.prototype.undo = function () {
        return floatingObjectMoveResizeUndo(this);
    };
    return MovingFloatingObjectUndoAction;
}(FloatingObjectUndoActionBase));
exports.MovingFloatingObjectUndoAction = MovingFloatingObjectUndoAction;
var ResizingFloatingObjectUndoAction = (function (_super) {
    __extends(ResizingFloatingObjectUndoAction, _super);
    function ResizingFloatingObjectUndoAction(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    ResizingFloatingObjectUndoAction.prototype.execute = function () {
        var self = this, ret = false, command = self._command, names = command.floatingObjects, sheet = self._sheet;
        resetFloatingObjectFocusByName(sheet, names);
        if (self.canExecute() && $_isArray(names)) {
            updateFloatingObjectCommandOldPosition(sheet, command, names);
            sheet._modelManager.startTransaction();
            self._beforeAction(sheet, true);
            var floatingObjectModel = sheet._floatingObjectModel;
            for (var i = 0, len = getLength(names); i < len; i++) {
                var item = floatingObjectModel._get(names[i]);
                var position = item.position();
                item.width(item.width() + command.offsetWidth);
                item.height(item.height() + command.offsetHeight);
                item.position(new Core_1.Point(position.x + command.offsetX, position.y + command.offsetY));
            }
            self._afterAction(sheet, true);
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            command[changesKey] = sheet._modelManager.endTransaction();
            ret = (getLength(names) > 0);
        }
        return ret;
    };
    ResizingFloatingObjectUndoAction.prototype.undo = function () {
        return floatingObjectMoveResizeUndo(this);
    };
    return ResizingFloatingObjectUndoAction;
}(FloatingObjectUndoActionBase));
exports.ResizingFloatingObjectUndoAction = ResizingFloatingObjectUndoAction;
var FloatingObjectCopyPasteUndoAction = (function (_super) {
    __extends(FloatingObjectCopyPasteUndoAction, _super);
    function FloatingObjectCopyPasteUndoAction() {
        var _this = _super.call(this) || this;
        _this._sheet = keyword_null;
        return _this;
    }
    FloatingObjectCopyPasteUndoAction.prototype.canExecute = function () {
        var self = this, names = self._command.floatingObjects;
        if (getLength(names) > 0 && self._canEditObjects(names)) {
            return true;
        }
        return false;
    };
    FloatingObjectCopyPasteUndoAction.prototype.canUndo = function () {
        var changesKey = Core_1.Commands._getChangesKey(this._sheet.name());
        var changes = this._command[changesKey];
        var floatingObjectChanges = changes && changes._floatingObjectChanges;
        if (floatingObjectChanges && getLength(floatingObjectChanges) > 0) {
            return true;
        }
        return false;
    };
    FloatingObjectCopyPasteUndoAction.prototype._canEditObjects = function (names) {
        var self = this, sheet = self._sheet;
        var floatingObjectModel = sheet._floatingObjectModel;
        for (var i = 0, len = getLength(names); i < len; i++) {
            var item = floatingObjectModel._get(names[i]);
            if (item && !sheet._canEditFloatingObject(item)) {
                return false;
            }
        }
        return true;
    };
    FloatingObjectCopyPasteUndoAction.prototype._isSlicer = function (floatingObject) {
        return floatingObject && floatingObject.typeName === 'Slicer';
    };
    return FloatingObjectCopyPasteUndoAction;
}(Core_1.Commands.ActionBase));
exports.FloatingObjectCopyPasteUndoAction = FloatingObjectCopyPasteUndoAction;
var ClipboardPasteFloatingObjectUndoAction = (function (_super) {
    __extends(ClipboardPasteFloatingObjectUndoAction, _super);
    function ClipboardPasteFloatingObjectUndoAction(sheet, command) {
        var _this = _super.call(this) || this;
        var self = _this;
        self.OFFSET = 15;
        self._sheet = sheet;
        self._command = command;
        if (isNullOrUndefined(command.clipboardFloatingObjectData)) {
            command.clipboardFloatingObjectData = command.fromSheet._clipboardFloatingObjectData;
        }
        return _this;
    }
    ClipboardPasteFloatingObjectUndoAction.prototype.execute = function () {
        var self = this, command = self._command, names = command.floatingObjects;
        if (self.canExecute()) {
            var sheet = self._sheet, fromSheet = command.fromSheet;
            sheet._modelManager.startTransaction();
            self._beforeAction(sheet, true);
            var selectedObjects_1 = [];
            var floatingObjectModel = sheet._floatingObjectModel;

            var clipboardFloatingObjectData = command.clipboardFloatingObjectData;
            if (command._activeRowIndex === undefined) {
                if (hasSelectedFloatingObject(sheet)) {
                    floatingObjectModel._all().forEach(function (floatingObject) {
                        if (floatingObject && floatingObject[IS_SELECTED]()) {
                            selectedObjects_1.push(floatingObject);
                        }
                    });
                }
                command._activeRowIndex = self._sheet.getActiveRowIndex();
                command._activeColumnIndex = self._sheet.getActiveColumnIndex();
            }

            if (hasSelectedFloatingObject(sheet)) {
                floatingObjectModel._all().forEach(function (floatingObject) {
                    if (floatingObject && floatingObject[IS_SELECTED]()) {
                        floatingObject[IS_SELECTED](false);
                    }
                });
            }
            var newLocations = [], i = void 0, len = void 0, maxValue = Number.MAX_VALUE, cutX = maxValue, cutY = maxValue;
            var relativePotions = [];
            len = getLength(names);
            for (i = 0; i < len; i++) {
                var position = clipboardFloatingObjectData.find(names[i]).position();
                cutX = Math_min(cutX, position.x);
                cutY = Math_min(cutY, position.y);
                relativePotions.push(new Core_1.Point(position.x - cutX, position.y - cutY));
            }
            var pasteX = 0;
            var pasteY = 0;
            if (selectedObjects_1.length) {
                var minX_1 = maxValue, minY_1 = maxValue;
                selectedObjects_1.forEach(function (floatingObject) {
                    if (floatingObject) {
                        var floatingObjectPosition = floatingObject.position();
                        minX_1 = Math_min(minX_1, floatingObjectPosition.x);
                        minY_1 = Math_min(minY_1, floatingObjectPosition.y);
                    }
                });
                pasteX = (minX_1 < maxValue) ? minX_1 + self.OFFSET : 0;
                pasteY = (minY_1 < maxValue) ? minY_1 + self.OFFSET : 0;
            }
            else {
                for (var row = 0; row < command._activeRowIndex; row++) {
                    pasteY += sheet._getActualRowHeight(row, 3 );
                }
                for (var column = 0; column < command._activeColumnIndex; column++) {
                    pasteX += sheet._getActualColumnWidth(column, 3 );
                }
            }
            len = getLength(names);
            for (i = 0; i < len; i++) {
                var relativePoint = relativePotions[i];
                newLocations.push(new Core_1.Point(pasteX + relativePoint.x, pasteY + relativePoint.y));
            }
            var isCutting = command.isCutting;
            var fromModel = fromSheet._floatingObjectModel;
            var destObjects = [], srcObjects = [];
            len = getLength(names);
            for (i = 0; i < len; i++) {
                var srcFloatingObject = clipboardFloatingObjectData.find(names[i]);
                var destFloatingObject = srcFloatingObject.clone(sheet);
                destFloatingObject.sheet(sheet);
                destObjects.push(destFloatingObject);
                srcObjects.push(srcFloatingObject);
            }
            var isSuccess = false;

            var args = {
                sheet: sheet,
                sheetName: sheet.name(),
                objects: destObjects,
                cancel: false
            };
            sheet._trigger(Core_1.Events.ClipboardPasting, args);
            if (!args.cancel) {
                for (i = 0; i < len; i++) {
                    var destFloatingObject = destObjects[i], newName = void 0, needNewName = false;
                    var srcFloatingObject = srcObjects[i];
                    if (isCutting && !fromModel._get(names[i]) && !floatingObjectModel._get(names[i])) {
                        newName = srcFloatingObject.name();
                    }
                    else {
                        needNewName = destFloatingObject.name() === srcFloatingObject.name();
                        if (needNewName) {
                            var prefix = getFloatingObjectNamePrefix(destFloatingObject);
                            newName = self._isSlicer(destFloatingObject) ? sheet.slicers._getAutoSlicerName(destFloatingObject[NAME]())
                                : floatingObjectModel._generateFloatingObjectName(prefix);
                        }
                    }
                    if (needNewName) {
                        destFloatingObject[NAME](newName);
                    }
                    if (self._isSlicer(destFloatingObject)) {
                        sheet.slicers._addInternal(destFloatingObject);

                        destFloatingObject.width(srcFloatingObject.width());
                        destFloatingObject.height(srcFloatingObject.height());
                    }
                    destFloatingObject.isVisible(true);
                    destFloatingObject.position(newLocations[i]);
                    destFloatingObject[IS_SELECTED](true);
                    floatingObjectModel._add(destFloatingObject);
                }
                updateFloatingObjectCommandOldPosition(sheet, command, null, destObjects, true);

                sheet._trigger(Core_1.Events.ClipboardPasted, {
                    sheet: sheet,
                    sheetName: sheet.name(),
                    objects: destObjects,
                });
                isSuccess = true;
            }
            self._afterAction(sheet, true);
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            command[changesKey] = sheet._modelManager.endTransaction();
            if (!isSuccess) {
                command._canceled = true;
            }
            return isSuccess;
        }
        return false;
    };
    ClipboardPasteFloatingObjectUndoAction.prototype.undo = function () {
        var self = this;
        if (self.canUndo()) {
            var sheet = self._sheet;
            self._beforeAction(sheet, true);
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            sheet._modelManager.undo(self._command[changesKey]);
            self._afterAction(sheet, true);
            return true;
        }
        return false;
    };
    return ClipboardPasteFloatingObjectUndoAction;
}(FloatingObjectCopyPasteUndoAction));
exports.ClipboardPasteFloatingObjectUndoAction = ClipboardPasteFloatingObjectUndoAction;
var DragCopyFloatingObjectUndoAction = (function (_super) {
    __extends(DragCopyFloatingObjectUndoAction, _super);
    function DragCopyFloatingObjectUndoAction(sheet, command) {
        var _this = _super.call(this) || this;
        var self = _this;
        self._sheet = sheet;
        self._command = command;
        return _this;
    }
    DragCopyFloatingObjectUndoAction.prototype.execute = function () {
        var self = this, ret = false, command = self._command, names = command.floatingObjects, sheet = self._sheet;
        if (self.canExecute()) {
            updateFloatingObjectCommandOldPosition(sheet, command, names);
            sheet._modelManager.startTransaction();
            self._beforeAction(sheet, true);
            var floatingObjectModel = sheet._floatingObjectModel;
            var len = getLength(names);
            for (var i = 0; i < len; i++) {
                var item = floatingObjectModel._get(names[i]);
                if (item) {
                    var cloneObj = item.clone(sheet);
                    cloneObj.sheet(sheet);
                    var position = item.position();
                    cloneObj.position(new Core_1.Point(position.x + command.offsetX, position.y + command.offsetY));
                    cloneObj[NAME](floatingObjectModel._generateFloatingObjectName());
                    cloneObj[IS_SELECTED](true);
                    item[IS_SELECTED](false);
                    if (self._isSlicer(cloneObj) && sheet.slicers) {
                        var slicer = cloneObj;
                        var slicerName = sheet.slicers._getAutoSlicerName(slicer.columnName());
                        slicer[NAME](slicerName);
                        sheet.slicers._addInternal(slicer);
                    }
                    floatingObjectModel._add(cloneObj);
                }
            }
            self._afterAction(sheet, true);
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            command[changesKey] = sheet._modelManager.endTransaction();
            ret = true;
        }
        return ret;
    };
    DragCopyFloatingObjectUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            sheet._modelManager.undo(self._command[changesKey]);
            self._afterAction(sheet, true);
            return true;
        }
        return false;
    };
    return DragCopyFloatingObjectUndoAction;
}(FloatingObjectCopyPasteUndoAction));
exports.DragCopyFloatingObjectUndoAction = DragCopyFloatingObjectUndoAction;
function getSelectedFloatingObjects(sheet) {
    var names = [];
    sheet._floatingObjectModel._all().forEach(function (item) {
        if (item[IS_SELECTED]()) {
            names.push(item[NAME]());
        }
    });
    return names;
}
function clipboardFloatingObjectCopy(sheet, names, isCutting) {
    var ch = sheet._getFloatingObjectClipboardHelper(), fromSheet = ch.fromSheet;
    ch.fromSheet = sheet;
    ch.isCutting = isCutting;
    var floatingObjects = new floatingobject_1._NamedObjectArray();
    var length = 0;
    for (var index = 0; index < getLength(names); index++) {
        var floatingObject = sheet._floatingObjectModel._get(names[index]);
        if (floatingObject) {
            floatingObjects.push(floatingObject);
            length++;
        }
    }
    if (fromSheet) {
        fromSheet._clipboardFloatingObjectData = keyword_null;
    }
    sheet._clipboardFloatingObjectData = floatingObjects;
    return (length > 0);
}
function getFloatingObjectNamePrefix(floatingObject) {
    var prefix;
    var typeName = floatingObject.typeName;
    switch (typeName) {
        case '0':
        case '1':
            break;
        case '2':
            prefix = 'Chart ';
            break;
    }
    return prefix;
}
Core_1.Commands[UN_SELECTE_ALL_FLOATINGOBJECT_S] = {
    canUndo: false,
    execute: function (context, options) {
        var sheet = Core_1.Commands._getWorksheet(context, options);
        if (hasSelectedFloatingObject(sheet)) {
            sheet.suspendPaint();
            sheet._unSelectAllFloatingObjects();
            sheet._loadAndSetSheetSelections();
            sheet.resumePaint();
            return true;
        }
        return false;
    }
};
Core_1.Commands[SELECT_ALL_FLOATINGOBJECT_S] = {
    canUndo: false,
    execute: function (context, options) {
        var sheet = Core_1.Commands._getWorksheet(context, options);
        if (!sheet.isEditing()) {
            sheet.suspendPaint();
            sheet._floatingObjectModel._all().forEach(function (item) {
                item[IS_SELECTED](true);
            });
            sheet.resumePaint();
        }
    }
};


Core_1.Commands[DELETE_FLOATINGOBJECT_S] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        var sheet = Core_1.Commands._getWorksheet(context, options);
        if (!isUndo) {
            if (!options.cmd) {
                options.cmd = DELETE_FLOATINGOBJECT_S;
            }
            if (!options.floatingObjects) {
                var names = getSelectedFloatingObjects(sheet);
                options.floatingObjects = names;
            }
        }
        if (getLength(options.floatingObjects) > 0) {
            return executeCommand(context, DeleteFloatingObjectUndoAction, options, isUndo);
        }
        return false;
    }
};
Core_1.Commands[NAVIGATION_NEXT_FLOATINGOBJECT] = {
    canUndo: false,
    execute: function (context, options) {
        var sheet = Core_1.Commands._getWorksheet(context, options);
        if (hasSelectedFloatingObject(sheet)) {
            sheet.suspendPaint();
            var selected = void 0, first = void 0, next = void 0, i = void 0;
            var floatingObjects = sheet._floatingObjectModel._all(), floatingObjectsLength = floatingObjects.length;
            for (i = 0; i < floatingObjectsLength; i++) {
                var item = floatingObjects[i];
                if (!first) {
                    first = item;
                }
                if (selected) {
                    next = item;
                    break;
                }
                if (item && item[IS_SELECTED]()) {
                    selected = item;
                }
            }
            sheet._unSelectAllFloatingObjects();
            if (!next) {
                next = first;
            }
            if (next) {
                next[IS_SELECTED](true);
            }
            sheet.resumePaint();
            return true;
        }
        return false;
    }
};
Core_1.Commands[NAVIGATION_PREVIOUS_FLOATINGOBJECT] = {
    canUndo: false,
    execute: function (context, options) {
        var sheet = Core_1.Commands._getWorksheet(context, options);
        if (hasSelectedFloatingObject(sheet)) {
            sheet.suspendPaint();
            var first = void 0, prev = void 0, i = void 0;
            var floatingObjects = sheet._floatingObjectModel._all(), floatingObjectsLength = floatingObjects.length;
            for (i = 0; i < floatingObjectsLength; i++) {
                var item = floatingObjects[i];
                if (!first) {
                    first = item;
                }
                if (!first[IS_SELECTED]()) {
                    if (!item[IS_SELECTED]()) {
                        prev = item;
                    }
                    if (item[IS_SELECTED]()) {
                        break;
                    }
                }
                else {
                    prev = item;
                }
            }
            if (prev) {
                sheet._unSelectAllFloatingObjects();
                prev[IS_SELECTED](true);
            }
            sheet.resumePaint();
            return true;
        }
        return false;
    }
};
function findSelectedFloatingObjects(sheet) {
    var selectedFloatingObjects = [];
    sheet._floatingObjectModel._all().forEach(function (p) {
        if (p[IS_SELECTED]()) {
            selectedFloatingObjects.push(p[NAME]());
        }
    });
    return selectedFloatingObjects;
}
Core_1.Commands[CUT_FLOATINGOBJECT_S] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        var executeResult = false;
        if (isUndo) {
            executeResult = executeCommand(context, DeleteFloatingObjectUndoAction, options, isUndo);
        }
        else {
            var sheet_1 = Core_1.Commands._getWorksheet(context, options);
            if (!options.cmd) {
                options.cmd = CUT_FLOATINGOBJECT_S;
            }
            var ch = sheet_1._getFloatingObjectClipboardHelper();
            if (!options.floatingObjects) {
                var names = getSelectedFloatingObjects(sheet_1);
                options.floatingObjects = names;
                options.fromSheet = ch.fromSheet;
                options.isCutting = ch.isCutting;
            }
            var selectedFloatingObjectNames = options.floatingObjects;
            var args = void 0, selectedFloatingObjects = void 0, result = void 0;
            if (getLength(selectedFloatingObjectNames) > 0) {
                selectedFloatingObjects = selectedFloatingObjectNames.map(function (name) {
                    return sheet_1._floatingObjectModel._get(name);
                });
                args = {
                    sheet: sheet_1,
                    sheetName: sheet_1.name(),
                    objects: selectedFloatingObjects,
                    cancel: false
                };

                sheet_1._trigger(Core_1.Events.ClipboardChanging, args);
                if (!args.cancel) {
                    result = clipboardFloatingObjectCopy(sheet_1, selectedFloatingObjectNames, true);
                    if (result) {
                        sheet_1._clearShapeClipboardHelper && sheet_1._clearShapeClipboardHelper();

                        Core_1.Commands._cancelCutCopyIndicator(sheet_1.parent);
                    }
                    executeResult = executeCommand(context, DeleteFloatingObjectUndoAction, options, isUndo);


                    sheet_1._trigger(Core_1.Events.ClipboardChanged, {
                        sheet: sheet_1,
                        sheetName: sheet_1.name(),
                        objects: selectedFloatingObjects,
                    });
                }
                else {
                    options._canceled = true;
                }
            }
        }
        return executeResult;
    }
};
Core_1.Commands[COPY_FLOATINGOBJECT_S] = {
    canUndo: false,
    execute: function (context, options) {
        var sheet = Core_1.Commands._getWorksheet(context, options);
        var selectedFloatingObjectNames = findSelectedFloatingObjects(sheet);
        if (getLength(selectedFloatingObjectNames) > 0) {
            var selectedFloatingObjects = selectedFloatingObjectNames.map(function (name) {
                return sheet._floatingObjectModel._get(name);
            });
            var args = {
                sheet: sheet,
                sheetName: sheet.name(),
                objects: selectedFloatingObjects,
                cancel: false
            };
            sheet._trigger(Core_1.Events.ClipboardChanging, args);
            if (!args.cancel) {
                var result = clipboardFloatingObjectCopy(sheet, selectedFloatingObjectNames, false);
                if (result) {
                    sheet._clearShapeClipboardHelper && sheet._clearShapeClipboardHelper();

                    Core_1.Commands._cancelCutCopyIndicator(sheet.parent);
                }

                sheet._trigger(Core_1.Events.ClipboardChanged, {
                    sheet: sheet,
                    sheetName: sheet.name(),
                    objects: selectedFloatingObjects,
                });
                return result;
            }
            else {
                options._canceled = true;
            }
        }
        return false;
    }
};


Core_1.Commands[PASTE_FLOATINGOBJECT_S] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        var sheet = Core_1.Commands._getWorksheet(context, options);
        if (sheet.isEditing()) {
            return false;
        }
        var ch = sheet._getFloatingObjectClipboardHelper();
        var fromSheet = ch.fromSheet;
        var clipboardData = fromSheet && fromSheet._clipboardFloatingObjectData;
        if (!clipboardData) {
            return false;
        }
        var names = [];
        clipboardData.each(function (ele) {
            names.push(ele[NAME]());
        });
        if (getLength(names) === 0) {
            return false;
        }
        if (sheet._disposed) {
            return false;
        }


        if (!isUndo) {
            if (!options.cmd) {
                options.cmd = PASTE_FLOATINGOBJECT_S;
            }
            if (!options.floatingObjects) {
                options.floatingObjects = names;
                options.fromSheet = fromSheet;
                options.isCutting = ch.isCutting;
            }
        }
        if (getLength(options.floatingObjects) > 0) {
            return executeCommand(context, ClipboardPasteFloatingObjectUndoAction, options, isUndo);
        }
        return false;
    }
};


Core_1.Commands[DRAG_COPY_FLOATINGOBJECT_S] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return executeCommand(context, DragCopyFloatingObjectUndoAction, options, isUndo);
    }
};
var Direction;
(function (Direction) {
    Direction[Direction['left'] = 0] = 'left';
    Direction[Direction['up'] = 1] = 'up';
    Direction[Direction['right'] = 2] = 'right';
    Direction[Direction['down'] = 3] = 'down';
})(Direction || (Direction = {}));
function moveFloatingObjectFn(direction) {
    return function (context, options) {
        var sheet = Core_1.Commands._getWorksheet(context, options);
        var offsetX = 0;
        if (direction === Direction.left) {
            offsetX = -1;
        }
        else if (direction === Direction.right) {
            offsetX = 1;
        }
        var offsetY = 0;
        if (direction === Direction.up) {
            offsetY = -1;
        }
        else if (direction === Direction.down) {
            offsetY = 1;
        }
        var names = getSelectedFloatingObjects(sheet);
        return getLength(names) > 0 ? sheet._commandManager().execute({
            cmd: MOVE_FLOATINGOBJECT_S,
            sheetName: sheet.name(),
            floatingObjects: names,
            offsetX: offsetX,
            offsetY: offsetY
        }) : false;
    };
}
Core_1.Commands[MOVE_FLOATINGOBJECT_S_LEFT] = moveFloatingObjectFn(Direction.left);
Core_1.Commands[MOVE_FLOATINGOBJECT_S_UP] = moveFloatingObjectFn(Direction.up);
Core_1.Commands[MOVE_FLOATINGOBJECT_S_RIGHT] = moveFloatingObjectFn(Direction.right);
Core_1.Commands[MOVE_FLOATINGOBJECT_S_DOWN] = moveFloatingObjectFn(Direction.down);


Core_1.Commands[MOVE_FLOATINGOBJECT_S] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        if (options.offsetX === 0 && options.offsetY === 0) {
            return false;
        }
        return executeCommand(context, MovingFloatingObjectUndoAction, options, isUndo);
    }
};


Core_1.Commands[RESIZE_FLOATINGOBJECT_S] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return executeCommand(context, ResizingFloatingObjectUndoAction, options, isUndo);
    }
};
Core_1.Commands._initFloatingObjectsDefaultCommands = function (commands) {
    var isMac = Core_1._util._isMacOS(), ctrl = !isMac, meta = isMac;
    commands.register(UN_SELECTE_ALL_FLOATINGOBJECT_S, Core_1.Commands[UN_SELECTE_ALL_FLOATINGOBJECT_S], 27 , false, false, false, false);
    commands.register(SELECT_ALL_FLOATINGOBJECT_S, Core_1.Commands[SELECT_ALL_FLOATINGOBJECT_S], 65 , ctrl, false, false, meta);
    commands.register(DELETE_FLOATINGOBJECT_S, Core_1.Commands[DELETE_FLOATINGOBJECT_S], isMac ? 8 : 46 , false, false, false, false);
    commands.register(NAVIGATION_NEXT_FLOATINGOBJECT, Core_1.Commands[NAVIGATION_NEXT_FLOATINGOBJECT], 9 , false, false, false, false);
    commands.register(NAVIGATION_PREVIOUS_FLOATINGOBJECT, Core_1.Commands[NAVIGATION_PREVIOUS_FLOATINGOBJECT], 9 , false, true, false, false);
    commands.register(CUT_FLOATINGOBJECT_S, Core_1.Commands[CUT_FLOATINGOBJECT_S], 88 , ctrl, false, false, meta);
    commands.register(COPY_FLOATINGOBJECT_S, Core_1.Commands[COPY_FLOATINGOBJECT_S], 67 , ctrl, false, false, meta);
    commands.register(DRAG_COPY_FLOATINGOBJECT_S, Core_1.Commands[DRAG_COPY_FLOATINGOBJECT_S]);
    commands.register(PASTE_FLOATINGOBJECT_S, Core_1.Commands[PASTE_FLOATINGOBJECT_S], 86 , ctrl, false, false, meta);
    commands.register(MOVE_FLOATINGOBJECT_S, Core_1.Commands[MOVE_FLOATINGOBJECT_S]);
    commands.register(MOVE_FLOATINGOBJECT_S_UP, Core_1.Commands[MOVE_FLOATINGOBJECT_S_UP], 38 , false, false, false, false);
    commands.register(MOVE_FLOATINGOBJECT_S_DOWN, Core_1.Commands[MOVE_FLOATINGOBJECT_S_DOWN], 40 , false, false, false, false);
    commands.register(MOVE_FLOATINGOBJECT_S_LEFT, Core_1.Commands[MOVE_FLOATINGOBJECT_S_LEFT], 37 , false, false, false, false);
    commands.register(MOVE_FLOATINGOBJECT_S_RIGHT, Core_1.Commands[MOVE_FLOATINGOBJECT_S_RIGHT], 39 , false, false, false, false);
    commands.register(RESIZE_FLOATINGOBJECT_S, Core_1.Commands[RESIZE_FLOATINGOBJECT_S]);
};
/***/ }),

/***/ './dist/plugins/floatingObject/floatingobject-touch.js':
/*!*************************************************************!*\
  !*** ./dist/plugins/floatingObject/floatingobject-touch.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Touch_1 = __webpack_require__(/*! Touch */ 'Touch');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var floatingobject_1 = __webpack_require__(/*! ./floatingobject */ './dist/plugins/floatingObject/floatingobject.js');
var cancelDefault = Core_1._util._cancelDefault, keyword_null = null;

var FloatingObjectTouchManager = (function () {
    function FloatingObjectTouchManager(element, floatingObjectRender, touchEventProvider) {
        var self = this;
        self._touchMouseMessageFilter = new Touch_1._TouchMouseMessageFilter(self);
        self._touchTarget = new Touch_1._TouchTargetElement(element, 'FL_' + floatingObjectRender.name, self._touchMouseMessageFilter, 2, 200);
        self._touchEventProvider = touchEventProvider;
        self._touchEventHandler = new FloatingObjectTouchEventHandler(element, floatingObjectRender);
        var touchEventHandler = self._touchEventHandler;
        var touchTarget = self._touchTarget;
        touchTarget._canDoManipulation = function () {
            return floatingObjectRender._floatingObject.isSelected();
        };
        touchTarget._canDoTap = function () {
            return true;
        };
        touchTarget._manipulationStarting = function (e) {
            return touchEventHandler._doManipulationStarting(e);
        };
        touchTarget._manipulationStarted = function (e) {
            return touchEventHandler._doManipulationStarted(e);
        };
        touchTarget._manipulationDelta = function (e) {
            return touchEventHandler._doManipulationDelta(e);
        };


        touchTarget._manipulationCompleted = function (e) {
            return touchEventHandler._doManipulationCompleted(e);
        };
        touchTarget._tapped = function (e) {
            return touchEventHandler._doTapped(e);
        };
    }
    FloatingObjectTouchManager.prototype._attach = function () {
        var self = this, touchEventProvider = self._touchEventProvider;
        if (touchEventProvider) {
            touchEventProvider._attachDettach(self._touchTarget, true);
        }
    };
    FloatingObjectTouchManager.prototype._detach = function () {
        var self = this, touchEventProvider = self._touchEventProvider;
        if (touchEventProvider) {
            touchEventProvider._attachDettach(self._touchTarget, false);
        }
    };
    FloatingObjectTouchManager.prototype._preProcessMouseDown = function (event) {
        return this._touchMouseMessageFilter._preProcessMouseDown();
    };
    FloatingObjectTouchManager.prototype._preProcessMouseUp = function (event) {
        return this._touchMouseMessageFilter._preProcessMouseUp();
    };
    FloatingObjectTouchManager.prototype._preProcessMouseMove = function (event) {
        return this._touchMouseMessageFilter._preProcessMouseMove();
    };
    return FloatingObjectTouchManager;
}());
var FloatingObjectTouchEventHandler = (function () {
    function FloatingObjectTouchEventHandler(element, floatingObjectRender) {
        var self = this;
        self._floatingObjectRender = floatingObjectRender;
        self._floatingObject = floatingObjectRender._floatingObject;
        self._containerElement = element;
        self._touchZoomManager = new Touch_1._TouchZoomManager(floatingObjectRender._sheet);
    }
    FloatingObjectTouchEventHandler.prototype._positionToPage = function (position) {
        var newPosition = new Touch_1._TouchPoint(position.X, position.Y);
        var t = Core_1.GC$(this._containerElement).offset();
        if (t) {
            var body = document.body;
            newPosition.X += t.left + body.clientLeft || 0;
            newPosition.Y += t.top + body.clientTop || 0;
        }
        return newPosition;
    };
    FloatingObjectTouchEventHandler.prototype._doManipulationStarting = function (e) {
        e._Mode = 1 | 2 ;
    };
    FloatingObjectTouchEventHandler.prototype._doManipulationStarted = function (e, fromShape) {
        var self = this;
        var pagePosition = !fromShape ? self._positionToPage(e._Position) : e._Position;


        self._floatingObjectRender._doMouseDown({
            target: e._OriginalSource,
            isTouch: true,
            button: 0,
            pageX: pagePosition.X,
            pageY: pagePosition.Y,
            stopPropagation: function () {
            }
        });
        if (!fromShape) {
            self._touchZoomManager._startZoom();
        }
    };
    FloatingObjectTouchEventHandler.prototype._doManipulationDelta = function (e, fromShape) {
        var self = this;
        var pagePosition = !fromShape ? self._positionToPage(e._Position) : e._Position;


        var scale = e._Cumulative._Scale, sheet = self._floatingObjectRender._sheet, parent = sheet.parent;
        if (scale !== 1 && parent && parent.options.allowUserZoom && !fromShape) {
            sheet._eventHandler._isFloatingObjectWorking = false;
            self._floatingObjectRender._resetStatusOnMouseUp();
            self._touchZoomManager._continueZoom(scale);
        }
        else {
            self._floatingObjectRender._doMouseMove({
                isTouch: true,
                button: 0,
                pageX: pagePosition.X,
                pageY: pagePosition.Y,
                stopPropagation: function () {
                }
            });
        }
    };


    FloatingObjectTouchEventHandler.prototype._doManipulationCompleted = function (e, fromShape) {
        var self = this;
        var pagePosition = !fromShape ? self._positionToPage(e._Position) : e._Position;


        var scale = e._Cumulative._Scale, sheet = self._floatingObjectRender._sheet, parent = sheet.parent;
        if (scale !== 1 && parent && parent.options.allowUserZoom && !fromShape) {
            self._touchZoomManager._endZoom(scale);
        }
        else {
            this._floatingObjectRender._doMouseUp({
                isTouch: true,
                button: 0,
                pageX: pagePosition.X,
                pageY: pagePosition.Y,
                stopPropagation: function () {
                }
            });
        }
    };
    FloatingObjectTouchEventHandler.prototype._doTapped = function (e, fromShape) {
        var self = this, sheet;
        var pagePosition = !fromShape ? self._positionToPage(e._Position) : e._Position;
        var argObj = { e: { _Position: pagePosition }, r: keyword_null };
        FloatingObjectTouchEventHandler._callFeatureHandler(self, 'preProcessTapped', argObj);
        if (argObj.r) {
            return;
        }
        try {
            sheet = self._floatingObjectRender._sheet;
            sheet.suspendPaint();
            if (!self._floatingObject.isSelected()) {
                sheet._unSelectAllFloatingObjects();
                self._floatingObject.isSelected(true);
                sheet._trigger(Core_1.Events.FloatingElementSelected, { type: 'floatingObject' });
                Core_1._FocusHelper._setActiveElement(sheet);
            }
            sheet.clearSelection();
        }
        finally {
            sheet.resumePaint();
        }
    };
    return FloatingObjectTouchEventHandler;
}());
exports.FloatingObjectTouchEventHandler = FloatingObjectTouchEventHandler;
Core_1._defineFeature(FloatingObjectTouchEventHandler);

if (Core_1._supportedFeatures.touch) {
    floatingobject_1.FloatingObjectRender._registerFeature('touch', {
        init: function (element) {
            var self = this;
            var touchManager = self._touchManager = new FloatingObjectTouchManager(element, self, self._sheet.parent._touchEventProvider);
            touchManager._attach();
        },
        dispose: function () {
            var touchManager = this._touchManager;
            if (touchManager) {
                touchManager._detach();
            }
        },
        preProcessMouseDown: function (argObj) {
            var event = argObj.e;
            var touchManager = this._touchManager;
            if (touchManager && !event.isTouch && touchManager._preProcessMouseDown(event)) {
                cancelDefault(event);
                argObj.r = true;
            }
        },
        preProcessMouseMove: function (argObj) {
            var event = argObj.e;
            var touchManager = this._touchManager;
            if (touchManager && !event.isTouch && touchManager._preProcessMouseMove(event)) {
                cancelDefault(event);
                argObj.r = true;
            }
        },
        preProcessMouseUp: function (argObj) {
            var event = argObj.e;
            var touchManager = this._touchManager;
            if (touchManager && !event.isTouch && touchManager._preProcessMouseUp(event)) {
                cancelDefault(event);
                argObj.r = true;
            }
        }
    });
}
/***/ }),

/***/ './dist/plugins/floatingObject/floatingobject.entry.js':
/*!*************************************************************!*\
  !*** ./dist/plugins/floatingObject/floatingobject.entry.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(__webpack_require__(/*! ./picture */ './dist/plugins/floatingObject/picture.js'));
__export(__webpack_require__(/*! ./floatingobject */ './dist/plugins/floatingObject/floatingobject.js'));
__export(__webpack_require__(/*! ./floatingobject-actions */ './dist/plugins/floatingObject/floatingobject-actions.js'));
__export(__webpack_require__(/*! ./floatingobject-touch */ './dist/plugins/floatingObject/floatingobject-touch.js'));
__export(__webpack_require__(/*! ./floatingobject.ns */ './dist/plugins/floatingObject/floatingobject.ns.js'));
var Drawing = __webpack_require__(/*! ./drawing/chart.ns */ './dist/plugins/floatingObject/drawing/chart.ns.js');
exports.Drawing = Drawing;
/***/ }),

/***/ './dist/plugins/floatingObject/floatingobject.js':
/*!*******************************************************!*\
  !*** ./dist/plugins/floatingObject/floatingobject.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var floatingobject_ns_1 = __webpack_require__(/*! ./floatingobject.ns */ './dist/plugins/floatingObject/floatingobject.ns.js');
var _NamedObjectArray = (function () {
    function _NamedObjectArray() {
        this._elements = {};
    }
    _NamedObjectArray.prototype.push = function (element) {
        this._elements[getName(element)] = element;
    };
    _NamedObjectArray.prototype.remove = function (name) {
        delete this._elements[name];
    };
    _NamedObjectArray.prototype.find = function (name) {
        return this._elements[name];
    };
    _NamedObjectArray.prototype.empty = function () {
        delete this._elements;
        this._elements = {};
    };
    _NamedObjectArray.prototype.each = function (callback) {
        var elements = this._elements;
        for (var n in elements) {
            if (elements.hasOwnProperty(n)) {
                callback(elements[n]);
            }
        }
    };
    _NamedObjectArray.prototype.isEmpty = function () {
        var elements = this._elements;
        for (var n in elements) {
            if (elements.hasOwnProperty(n)) {
                return false;
            }
        }
        return true;
    };
    return _NamedObjectArray;
}());
exports._NamedObjectArray = _NamedObjectArray;
var rm = new Common_1.Common.ResourceManager(floatingobject_ns_1.SR, 'FloatingObjects');
var getSR = rm.getResource.bind(rm);
var _Types = Common_1.Common._Types, _hasOwnProperty = Common_1.Common._hasOwnProperty;
var isNullOrUndefined = _Types._isNullOrUndefined, isType = _Types._isType, defProperty = Core_1._util._defProperty, isDefined = Core_1._util._isDefined, createElement = Core_1._util._createElement, getDistance = Core_1._util._getDistance, NamedObjectArray = _NamedObjectArray, DOCUMENT = document, hasOwnProperty = _hasOwnProperty, keyword_null = null, keyword_undefined = void 0, Math_ceil = Math.ceil, Math_floor = Math.floor, Math_max = Math.max, Math_min = Math.min, Math_abs = Math.abs;
var UI_RES = {
    _DIV: 'div',
    _ON: 'on',
    _Z_INDEX: 'z-index',
    _MOVE: 'move',
    _UNSELECTABLE: 'unselectable',
    _VIEWPORTINDEX: 1,
    _BORDER: 'border',
    _MAX_NUMBER: 9007199254740992,
    _FLOATING_OBJECTS: 'floatingObjects',
    _GC_FLOATINGOBJECT_NS: '.gcFloatingObject',
    _NAME: 'name',
    _SCROLL: 'scroll',
    _X: 'x',
    _Y: 'y',
    _WIDTH: 'width',
    _HEIGHT: 'height',
    _START_ROW: 'startRow',
    _START_ROW_OFFSET: 'startRowOffset',
    _START_COLUMN: 'startColumn',
    _START_COLUMN_OFFSET: 'startColumnOffset',
    _END_ROW: 'endRow',
    _END_ROW_OFFSET: 'endRowOffset',
    _END_COLUMN: 'endColumn',
    _END_COLUMN_OFFSET: 'endColumnOffset',
    _IS_SELECTED: 'isSelected',
    _IS_LOCKED: 'isLocked',
    _IS_VISIBLE: 'isVisible',
    _CAN_PRINT: 'canPrint',
    _DYNAMIC_SIZE: 'dynamicSize',
    _DYNAMIC_MOVE: 'dynamicMove',
    _FIXED_POSITION: 'fixedPosition',
    _ALLOW_RESIZE: 'allowResize',
    _ALLOW_MOVE: 'allowMove',
    _CSS_ZINDEXDEFAULTVALUE: 700,
    _CSS_CONTAINERZINDEXVALUE: 701,
    _POSITION: 'position',
    _ABSOLUTE: 'absolute',
    _BACKGROUND: 'background',
    _CSS_CLASS_NONE_USER_SELECT: 'gc-no-user-select',
    _CSS_CLASS_FLOATINGOBJECT_SELECTED: 'gc-floatingobject-selected',
    _CSS_CLASS_FLOATINGOBJECT_UNSELECTED: 'gc-floatingobject-unselected',
    _CSS_CLASS_RESIZE_INDICATOR_SELECT: 'gc-floatingobject-resize-indicator-select',
    _CSS_CLASS_RESIZE_INDICATOR_UNSELECT: 'gc-floatingobject-resize-indicator-unSelect',
    _CSS_CLASS_FLOATINGOBJECT_CONTENT_CONTAINER: 'gc-floatingobject-content-container',
    _CSS_CLASS_FLOATINGOBJECT_CONTAINER: 'gc-floatingobject-container',
    _CSS_CLASS_FLOATINGOBJECT_MOVING_CONTAINER: 'gc-floatingobject-moving-container',
    _CSS_CLASS_FLOATINGOBJECT_MOVING_DIV: 'gc-floatingobject-moving-div',
    _CSS_SELECTOR_RESIZE_INDICATOR: '.gc-floatingobject-resize-indicator',
    _FLOATINGOBJECT_RESIZE_INDICATOR: 'gc-floatingobject-resize-indicator',
    _FLOATINGOBJECT_ABSOLUTE: 'gc-floatingobject-absolute',
    _FLOATINGOBJECT_TOP: 'gc-floatingobject-top',
    _FLOATINGOBJECT_MIDDLE: 'gc-floatingobject-middle',
    _FLOATINGOBJECT_BOTTOM: 'gcfloatingobject-bottom',
    _FLOATINGOBJECT_LEFT: 'gc-floatingobject-left',
    _FLOATINGOBJECT_CENTER: 'gc-floatingobject-center',
    _FLOATINGOBJECT_RIGHT: 'gc-floatingobject-right',
    _CONTENT: 'content',
    _NO_USER_SELECT: 'gc-no-user-select',
    _PERCENT_100: '100%',
    _CSS_CLASS_FLOATINGOBJECT_BACKGROUND_COVER: 'gc-floatingobject-background-cover',
    _NS: '.fos',
    _LEFT: 'left',
    _CENTER: 'center',
    _RIGHT: 'right',
    _TOP: 'top',
    _MIDDLE: 'middle',
    _BOTTOM: 'bottom',
    _DASH_RESIZE: '-resize',
    _CURSOR: 'cursor',
    _MOUSE_MOVE: 'mousemove',
    _MOUSE_UP: 'mouseup',
    _START_X: 'startX',
    _START_Y: 'startY',
    _START_WIDTH: 'startWidth',
    _START_HEIGHT: 'startHeight',
    _END_X: 'endX',
    _END_Y: 'endY',
    _START_TOP_ROW: 'startTopRow',
    _START_LEFT_COLUMN: 'startLeftColumn'
};
var DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR = UI_RES._DIV + '.' + UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR, CSS_SELECTOR_TOP_LEFT_RESIZE_INDICATOR = DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR + '.' + UI_RES._FLOATINGOBJECT_TOP + '.' + UI_RES._FLOATINGOBJECT_LEFT, CSS_SELECTOR_MIDDLE_LEFT_RESIZE_INDICATOR = DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR + '.' + UI_RES._FLOATINGOBJECT_MIDDLE + '.' + UI_RES._FLOATINGOBJECT_LEFT, CSS_SELECTOR_BOTTOM_LEFT_RESIZE_INDICATOR = DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR + '.' + UI_RES._FLOATINGOBJECT_BOTTOM + '.' + UI_RES._FLOATINGOBJECT_LEFT, CSS_SELECTOR_TOP_CENTER_RESIZE_INDICATOR = DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR + '.' + UI_RES._FLOATINGOBJECT_TOP + '.' + UI_RES._FLOATINGOBJECT_CENTER, CSS_SELECTOR_BOTTOM_CENTER_RESIZE_INDICATOR = DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR + '.' + UI_RES._FLOATINGOBJECT_BOTTOM + '.' + UI_RES._FLOATINGOBJECT_CENTER, CSS_SELECTOR_TOP_RIGHT_RESIZE_INDICATOR = DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR + '.' + UI_RES._FLOATINGOBJECT_TOP + '.' + UI_RES._FLOATINGOBJECT_RIGHT, CSS_SELECTOR_MIDDLE_RIGHT_RESIZE_INDICATOR = DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR + '.' + UI_RES._FLOATINGOBJECT_MIDDLE + '.' + UI_RES._FLOATINGOBJECT_RIGHT, CSS_SELECTOR_BOTTOM_RIGHT_RESIZE_INDICATOR = DIV_DOT_FLOATINGOBJECT_RESIZE_INDICATOR + '.' + UI_RES._FLOATINGOBJECT_BOTTOM + '.' + UI_RES._FLOATINGOBJECT_RIGHT, TOP_LEFT = UI_RES._TOP + UI_RES._LEFT, TOP_CENTER = UI_RES._TOP + UI_RES._CENTER, TOP_RIGHT = UI_RES._TOP + UI_RES._RIGHT, MIDDLE_LEFT = UI_RES._MIDDLE + UI_RES._LEFT, MIDDLE_RIGHT = UI_RES._MIDDLE + UI_RES._RIGHT, BOTTOM_LEFT = UI_RES._BOTTOM + UI_RES._LEFT, BOTTOM_CENTER = UI_RES._BOTTOM + UI_RES._CENTER, BOTTOM_RIGHT = UI_RES._BOTTOM + UI_RES._RIGHT;
function getName(obj) {
    if (typeof obj[UI_RES._NAME] === 'string') {
        return obj[UI_RES._NAME];
    }
    return obj[UI_RES._NAME]();
}
var sheetEx = function () {
    var _this = this;
    _this._unSelectAllFloatingObjects = function () {
        var floatingObjectModel = this._floatingObjectModel;
        if (floatingObjectModel) {
            floatingObjectModel._all().forEach(function (p) {
                p.isSelected(false);
            });
        }
    };
    _this._refreshObjectsAboveSheet = function () {
        var self = this, floatingObjectModel = self._floatingObjectModel;
        if (floatingObjectModel) {
            floatingObjectModel.isNeedToUpdateLayout = true;
        }
    };
    _this._getFloatingObjectClipboardHelper = function () {
        var self = this, workbook = self.parent, worksheetFOClipboardHelper = self._floatingObjectClipboardHelper, workbookFOClipboardHelper = workbook && workbook._floatingObjectClipboardHelper;
        if (!worksheetFOClipboardHelper) {
            worksheetFOClipboardHelper = self._floatingObjectClipboardHelper = workbookFOClipboardHelper ? workbookFOClipboardHelper : {
                fromSheet: keyword_null,
                isCutting: false
            };
        }
        return worksheetFOClipboardHelper;
    };
    _this._clearFloatingObjectClipboardHelper = function () {
        var self = this, foClipboardHelper = self._getFloatingObjectClipboardHelper(), fromSheet = foClipboardHelper && foClipboardHelper.fromSheet;
        if (fromSheet) {
            fromSheet._clipboardFloatingObjectData = keyword_null;
        }
        foClipboardHelper.fromSheet = keyword_null;
        foClipboardHelper.isCutting = false;
    };
    _this._canSelectFloatingObject = function (floatingObject) {
        var options = this.options;
        return !options.isProtected || !floatingObject.isLocked() || options.protectionOptions.allowEditObjects;
    };
    _this._canEditFloatingObject = function (floatingObject) {
        var options = this.options;
        return !options.isProtected || !floatingObject.isLocked() || options.protectionOptions.allowEditObjects;
    };
    _this.isPasteFloatingObject = function () {
        var self = this, fromSheet = self._getFloatingObjectClipboardHelper().fromSheet;
        var clipboardData = this._clipboardFloatingObjectData;
        if (!clipboardData && fromSheet) {
            clipboardData = fromSheet._clipboardFloatingObjectData;
        }
        return clipboardData && !clipboardData.isEmpty();
    };
    _this._getFloatingObjectRenderManager = function (rowViewportIndex, columnViewportIndex) {
        var self = this;
        if (!self._floatingObjectRenderManagers) {
            self._floatingObjectRenderManagers = [];
        }
        var rowViewportRenderManagers = self._floatingObjectRenderManagers[rowViewportIndex];
        if (!rowViewportRenderManagers) {
            self._floatingObjectRenderManagers[rowViewportIndex] = [];
        }
        var renderManger = self._floatingObjectRenderManagers[rowViewportIndex][columnViewportIndex];
        if (!renderManger) {
            self._floatingObjectRenderManagers[rowViewportIndex][columnViewportIndex] = new FloatingObjectRenderManager(self);
        }
        renderManger = self._floatingObjectRenderManagers[rowViewportIndex][columnViewportIndex];
        return renderManger;
    };
    _this._paintFloatingObject = function (rectangle, zoomFactor) {
        var self = this;
        var sheet = self;
        if (!sheet._hoverCell && sheet._floatingObjectModel && sheet._render && sheet._render._getCtx()) {
            var layout = sheet._getSheetLayout(), rect = void 0;
            if (zoomFactor === keyword_null || typeof (zoomFactor) === 'undefined') {
                zoomFactor = sheet.zoom();
            }
            for (var r = 0; r <= 2; r++) {
                for (var c = 0; c <= 2; c++) {
                    rect = layout._viewportRect(r, c);
                    if (!rect) {
                        continue;
                    }
                    var floatingObjectRenderManager = sheet._getFloatingObjectRenderManager(r, c);
                    if (floatingObjectRenderManager) {
                        floatingObjectRenderManager._render(r, c, zoomFactor);
                    }
                }
            }
        }
    };
};
sheetEx.call(Core_1.Worksheet.prototype);
function disposeFloatingObjectUI(sheet, clearCache) {
    var floatingObjectRenderManagers = sheet._floatingObjectRenderManagers;
    if (floatingObjectRenderManagers) {
        var i = void 0, j = void 0, rowCount = void 0, colCount = void 0;
        rowCount = floatingObjectRenderManagers.length;
        for (i = 0; i < rowCount; i++) {
            var rowViewportRenderManagers = floatingObjectRenderManagers[i];
            if (rowViewportRenderManagers) {
                colCount = rowViewportRenderManagers.length;
                for (j = 0; j < colCount; j++) {
                    var renderManager = rowViewportRenderManagers[j];
                    if (renderManager) {
                        renderManager._dispose();
                    }
                }
                rowViewportRenderManagers.length = 0;
            }
        }
        floatingObjectRenderManagers.length = 0;
        sheet._floatingObjectRenderManagers = keyword_null;
    }
    var floatingObjectModel = sheet._floatingObjectModel;
    if (floatingObjectModel && clearCache !== false) {
        floatingObjectModel._dispose();
    }
}
function addRows(floatingObjectModel, row, rowCount) {
    floatingObjectModel._all().forEach(function (item) {
        item._onRowsAdded(row, rowCount);
    });
}
function removeRows(floatingObjectModel, row, rowCount) {
    var i, len;
    var removeItems = [];
    floatingObjectModel._all().forEach(function (floatingObject) {
        if (!isCoverRange(row, -1, row + rowCount - 1, floatingObjectModel.sheet().getColumnCount(), floatingObject) || (!floatingObject.dynamicMove() && !floatingObject.dynamicSize())) {
            floatingObject._onRowsRemoved(row, rowCount);
        }
        else {
            removeItems.push(floatingObject);
        }
    });
    len = removeItems.length;
    for (i = 0; i < len; i++) {
        floatingObjectModel._remove(removeItems[i].name());
    }
}
function addColumns(floatingObjectModel, column, columnCount) {
    floatingObjectModel._all().forEach(function (item) {
        item._onColumnsAdded(column, columnCount);
    });
}
function removeColumns(floatingObjectModel, column, columnCount) {
    var i, len;
    var removeItems = [];
    floatingObjectModel._all().forEach(function (floatingObject) {
        if (!isCoverRange(-1, column, floatingObjectModel.sheet().getRowCount(), column + columnCount - 1, floatingObject) || (!floatingObject.dynamicMove() && !floatingObject.dynamicSize())) {
            floatingObject._onColumnsRemoved(column, columnCount);
        }
        else {
            removeItems.push(floatingObject);
        }
    });
    len = removeItems.length;
    for (i = 0; i < len; i++) {
        floatingObjectModel._remove(removeItems[i].name());
    }
}
function isCoverRange(row, column, endRow, endColumn, floatingObject) {
    var fStartRow = floatingObject[UI_RES._START_ROW]();
    var fStartColumn = floatingObject[UI_RES._START_COLUMN]();
    var fEndRow = floatingObject[UI_RES._END_ROW]();
    var fEndColumn = floatingObject[UI_RES._END_COLUMN]();
    return row <= fStartRow && column <= fStartColumn && endRow >= fEndRow && endColumn >= fEndColumn;
}
function toJsonFn(properties, jsData) {
    var self = this;
    if (!jsData) {
        jsData = {};
    }
    Core_1.GC$.each(properties, function (i, p) {
        var pt = self[p];
        var value = pt.call(self);
        if (!pt.isDefault(value)) {
            jsData[p] = value;
        }
    });
    return jsData;
}
exports.toJsonFn = toJsonFn;
function fromJsonFn(properties, jsData) {
    if (!jsData) {
        return;
    }
    var self = this;
    Core_1.GC$.each(properties, function (i, p) {
        if (jsData[p] !== keyword_undefined) {
            self[p].call(self, jsData[p], false);
        }
    });
}
exports.fromJsonFn = fromJsonFn;
function propertyRefreshCallback(propertyName) {
    var pname = propertyName;
    return function (value, oldValue) {
        var self = this, sheet = self.sheet();
        if (pname === UI_RES._CONTENT) {
            self._needRefresh = true;
        }
        if (sheet) {
            sheet._invalidate();
        }
        self.onPropertyChanged(pname, value, oldValue);
    };
}
exports.propertyRefreshCallback = propertyRefreshCallback;
function updateLocationRefreshCallback(propertyName) {
    var pname = propertyName;
    return function (value, oldValue) {
        var self = this, sheet = self.sheet();
        if (sheet) {
            updateFloatingObjectLocation(self);
            if (!self._ignoreAdjustEnd) {
                updateEndPosition(self);
            }
            sheet._invalidate();
        }
        self.onPropertyChanged(pname, value, oldValue);
    };
}
function updateSizeRefreshCallback(propertyName) {
    var pname = propertyName;
    return function (value, oldValue) {
        var self = this, sheet = self.sheet();
        if (sheet) {
            updateFloatingObjectSize(self);
            sheet._invalidate();
        }
        self.onPropertyChanged(pname, value, oldValue);
    };
}
function updateFloatingObjectLocation(floatingobject) {
    var sheet = floatingobject.sheet();
    if (!sheet) {
        return;
    }
    function updateLocation(startFn, totalFn, offsetFn, sizeFn) {
        var newValue = 0, startRow = startFn.call(floatingobject);
        newValue = totalFn.call(floatingobject, sheet, 0, startRow);
        updateStartOffset.call(floatingobject, startFn, offsetFn, sizeFn);
        newValue += offsetFn.call(floatingobject);
        return newValue;
    }
    var newY = updateLocation(floatingobject[UI_RES._START_ROW], getTotalHeight, floatingobject[UI_RES._START_ROW_OFFSET], sheet.getRowHeight);
    var newX = updateLocation(floatingobject[UI_RES._START_COLUMN], getTotalWidth, floatingobject[UI_RES._START_COLUMN_OFFSET], sheet.getColumnWidth);
    var oldX = floatingobject.x(), oldY = floatingobject.y();
    if (oldX !== newX || oldY !== newY) {
        floatingobject.x(newX, false);
        floatingobject.y(newY, false);
        floatingobject.onPropertyChanged('position', new Core_1.Point(newX, newY), new Core_1.Point(oldX, oldY));
    }
}

function updateStartOffset(startFn, offsetFn, sizeFn) {
    var self = this;
    var startRowOffset = offsetFn.call(self), startRowHeight = sizeFn.call(self.sheet(), startFn.call(self), 3 );
    if (startRowHeight > 0) {
        startRowHeight--;
    }
    if (startRowOffset > startRowHeight) {
        offsetFn.call(self, startRowHeight, false);
    }
}
function getTotalHeight(sheet, row1, row2, max) {
    var height = 0;
    for (var row = row1; row < row2; row++) {
        height += sheet.getRowHeight(row, 3 );
        if (height > max) {
            break;
        }
    }
    return height;
}
function getTotalWidth(sheet, col1, col2, max) {
    var width = 0;
    for (var column = col1; column < col2; column++) {
        width += sheet.getColumnWidth(column, 3 );
        if (width > max) {
            break;
        }
    }
    return width;
}
function updateStartPosition(floatingobject) {
    var sheet = floatingobject.sheet();
    if (!sheet) {
        return;
    }
    function updateStart(isRow, y, startFn, offsetFn, count) {
        var info = getAnchor(floatingobject, isRow, y);
        var index = info.index;
        offsetFn.call(floatingobject, info.offset, false);
        if (info.offset === -1) {
            index += 1;
            offsetFn.call(floatingobject, 0);
            if (index === count) {
                index = count - 1;
            }
        }
        startFn.call(floatingobject, index, false);
    }
    updateStart(true, floatingobject.y(), floatingobject[UI_RES._START_ROW], floatingobject[UI_RES._START_ROW_OFFSET], sheet.getRowCount());
    updateStart(false, floatingobject.x(), floatingobject[UI_RES._START_COLUMN], floatingobject[UI_RES._START_COLUMN_OFFSET], sheet.getColumnCount());
}
function updateEndPosition(floatingobject) {
    var sheet = floatingobject.sheet();
    if (!sheet) {
        return;
    }
    function updateEnd(isRow, y, endFn, endOffsetFn) {
        var info = getAnchor(floatingobject, isRow, y);
        endFn.call(floatingobject, info.index, false);
        endOffsetFn.call(floatingobject, info.offset, false);
    }
    updateEnd(true, floatingobject.y() + floatingobject[UI_RES._HEIGHT](), floatingobject[UI_RES._END_ROW], floatingobject[UI_RES._END_ROW_OFFSET]);
    updateEnd(false, floatingobject.x() + floatingobject[UI_RES._WIDTH](), floatingobject[UI_RES._END_COLUMN], floatingobject[UI_RES._END_COLUMN_OFFSET]);
}
function getAnchor(floatingobject, isRow, y) {
    var total = 0;
    var offset = 0;
    var sheet = floatingobject.sheet();
    var count = isRow ? sheet.getRowCount() : sheet.getColumnCount();
    var index;
    for (index = 0; index < count; index++) {
        var size = (isRow ? sheet.getRowHeight(index, 3 ) : sheet.getColumnWidth(index, 3));
        total += size;
        offset = total - y;
        if (offset > 0) {
            offset = offset > 0 ? size - offset : -1;
            break;
        }
        else if (offset === 0) {
            offset = 0;
            index += 1;
            break;
        }
    }
    if (index >= count) {
        index = count - 1;

        offset = (isRow ? sheet.getRowHeight(index, 3 ) : sheet.getColumnWidth(index, 3));
    }
    return {
        offset: offset,
        index: index
    };
}

function syncFloatingObjectZIndex(floatingObject, containerDiv) {
    setZIndex(containerDiv, getFloatingObjectZIndex(floatingObject));
}
function setZIndex(element, zIndex) {
    if (element) {
        element.style.zIndex = zIndex + '';
    }
}


function getFloatingObjectZIndex(floatingObject) {
    var zIndex = floatingObject._zIndex;
    if (isNullOrUndefined(zIndex)) {
        zIndex = floatingObject._zIndexAuto;
    }
    return zIndex;
}

function updateFloatingObjectZIndex(floatingObject, zIndex) {
    floatingObject._zIndex = zIndex;
    floatingObject._host.forEach(function (div) {
        var container = div.parentElement;
        while (container.className.indexOf(UI_RES._CSS_CLASS_FLOATINGOBJECT_CONTAINER) === -1) {
            container = container.parentElement;
        }
        setZIndex(container, zIndex);
    });
}

function adjustFloatingObjectZIndex(floatingObject, offset) {
    if (isNullOrUndefined(floatingObject._zIndex)) {
        floatingObject._zIndexAuto += offset;
    }
}
var FloatingObjectCollection = (function () {
    function FloatingObjectCollection(sheet, typeName) {
        this._sheet = sheet;
        this._kind = typeName;
    }
    FloatingObjectCollection.prototype._dispose = function () {
        this._sheet = keyword_null;
    };


    FloatingObjectCollection.prototype.add = function (floatingObjectOrName, src, x, y, width, height, dataRange, dataOrientation) {
        var self = this, foInstance;
        if (self._kind === '1' ) {
            foInstance = FloatingObject._getPictureInstance(floatingObjectOrName, src, x, y, width, height);
        }
        else if (self._kind === '0' ) {
            foInstance = floatingObjectOrName;
        }
        self._sheet._floatingObjectModel._add(foInstance);
        return foInstance;
    };


    FloatingObjectCollection.prototype.get = function (name) {
        return this._sheet._floatingObjectModel._get(name);
    };


    FloatingObjectCollection.prototype.remove = function (name) {
        this._sheet._floatingObjectModel._remove(name);
    };


    FloatingObjectCollection.prototype.clear = function () {
        return this._sheet._floatingObjectModel._clear(this._kind);
    };


    FloatingObjectCollection.prototype.all = function () {
        return this._sheet._floatingObjectModel._all(this._kind);
    };


    FloatingObjectCollection.prototype.zIndex = function (name, zIndex) {
        return this._sheet._floatingObjectModel._zIndex(name, zIndex);
    };
    FloatingObjectCollection.prototype._onGroupChanged = function (start, end, isRow) {
        this.all().forEach(function (floatingObject) {
            var floatingObjectStart = isRow ? floatingObject.startRow() : floatingObject.startColumn(), floatingObjectEnd = isRow ? floatingObject.endRow() : floatingObject.endColumn();
            if (!(end < floatingObjectStart || start > floatingObjectEnd) && floatingObject.dynamicSize()) {
                updateFloatingObjectSize(floatingObject);
            }
            updateFloatingObjectLocation(floatingObject);
        });
    };
    return FloatingObjectCollection;
}());
exports.FloatingObjectCollection = FloatingObjectCollection;
function bindEventsOnSheet(floatingobjectModel) {
    var sheet = floatingobjectModel.sheet();
    if (!sheet) {
        return;
    }
    Core_1.GC$(DOCUMENT.body).bind('scroll' + UI_RES._GC_FLOATINGOBJECT_NS, function () {
        var activeSheet = sheet.parent && sheet.parent.getActiveSheet();
        if (activeSheet && activeSheet._floatingObjectModel) {
            sheet._paintFloatingObject(activeSheet._getBounds());
        }
    });

    sheet._bind(Core_1.Events.ColumnChanged + UI_RES._GC_FLOATINGOBJECT_NS, function (event, data) {
        var propertyName = data.propertyName;
        if (propertyName === UI_RES._WIDTH || propertyName === UI_RES._IS_VISIBLE) {
            updateFloatingObjectsLayout(floatingobjectModel);
        }
    });
    sheet._bind(Core_1.Events.RowChanged + UI_RES._GC_FLOATINGOBJECT_NS, function (event, data) {
        var propertyName = data.propertyName;
        if (propertyName === UI_RES._HEIGHT || propertyName === UI_RES._IS_VISIBLE) {
            updateFloatingObjectsLayout(floatingobjectModel);
        }
    });
    sheet._bind(Core_1.Events.ColumnWidthChanged + UI_RES._GC_FLOATINGOBJECT_NS, function () {
        updateFloatingObjectsLayout(floatingobjectModel);
    });
    sheet._bind(Core_1.Events.RowHeightChanged + UI_RES._GC_FLOATINGOBJECT_NS, function () {
        updateFloatingObjectsLayout(floatingobjectModel);
    });
}
function updateFloatingObjectsLayout(floatingobjectModel) {
    var sheet = floatingobjectModel.sheet();

    floatingobjectModel.isNeedToUpdateLayout = true;
    sheet._paintFloatingObject(sheet._getBounds());
}

function containsInRect(x, y, rect) {
    return rect && rect.width > 0 && rect.height > 0 && (rect.x === x || rect.y === y || rect.contains(x, y));
}
var FloatingObjectModel = (function () {
    function FloatingObjectModel(sheet) {
        var self = this;
        self.sheet(sheet);
        bindEventsOnSheet(self);
        self._storage = {};
    }
    FloatingObjectModel.prototype._adjustFloatingObjectZIndex = function (offset) {
        this._all().forEach(function (floatingObject) {
            adjustFloatingObjectZIndex(floatingObject, offset);
        });
    };
    FloatingObjectModel.prototype._add = function (item, fixSameName) {
        var self = this, sheet = self.sheet();
        sheet.suspendPaint();
        var name = item.name();
        if (!name) {
            sheet.resumePaint();
            throw new Error(getSR().Exp_FloatingObjectNameEmptyError);
        }
        if (self._storage[name]) {
            if (fixSameName) {
                name = self._generateFloatingObjectName(name + '__');
                item.name(name);
            }
            else {
                sheet.resumePaint();
                throw new Error(getSR().Exp_FloatingObjectHasSameNameError);
            }
        }
        sheet._modelManager._saveFloatingObjectCollectionChange();
        self._adjustFloatingObjectZIndex(-1);
        item.sheet(sheet);
        self._storage[name] = item;
        sheet._onAddFloatingObject(item);
        sheet.resumePaint();
    };
    FloatingObjectModel.prototype._get = function (name) {
        return this._storage[name];
    };
    FloatingObjectModel.prototype._remove = function (name, needEvent) {
        var self = this;
        if (name) {
            var sheet = self.sheet(), item = self._get(name);
            sheet._modelManager._saveFloatingObjectCollectionChange();
            sheet.suspendPaint();
            if (needEvent) {
                var removingArgs = {
                    sheet: sheet,
                    sheetName: sheet.name(),
                    floatingObject: item,
                    cancel: false
                };
                sheet._trigger(Core_1.Events.FloatingObjectRemoving, removingArgs);
                if (removingArgs.cancel === false) {
                    delete self._storage[name];
                    sheet._trigger(Core_1.Events.FloatingObjectRemoved, {
                        sheet: sheet,
                        sheetName: sheet.name(),
                        floatingObject: item
                    });
                }
            }
            else {
                delete self._storage[name];
            }
            sheet.resumePaint();
            return true;
        }
        return false;
    };
    FloatingObjectModel.prototype._rename = function (oldName, newName) {
        var self = this, sheet = self.sheet();
        sheet.suspendPaint();
        if (!newName) {
            throw new Error(getSR().Exp_FloatingObjectNameEmptyError);
        }
        if (self._storage[newName]) {
            throw new Error(getSR().Exp_FloatingObjectHasSameNameError);
        }
        var floatingObject = self._storage[oldName];
        delete self._storage[oldName];
        self._storage[newName] = floatingObject;
        floatingObject.onNameChanged && floatingObject.onNameChanged(oldName, newName);
        sheet.resumePaint();
    };
    FloatingObjectModel.prototype._clear = function (typeName) {
        var self = this, sheet = self.sheet();
        sheet.suspendPaint();
        Core_1.GC$.each(this._storage, function (index, floatingObject) {
            if (!typeName || typeName === floatingObject._kind) {
                self._remove(floatingObject.name());
            }
        });
        sheet.resumePaint();
    };
    FloatingObjectModel.prototype._all = function (typeName) {
        var result = [];
        Core_1.GC$.each(this._storage, function (index, floatingObject) {
            if (!typeName || typeName === floatingObject._kind) {
                result.push(floatingObject);
            }
        });
        return result;
    };
    FloatingObjectModel.prototype._zIndex = function (name, zIndex) {
        var isGetValue = isNaN(zIndex);
        var floatingObject = this._get(name);
        if (floatingObject) {
            if (isGetValue) {
                return getFloatingObjectZIndex(floatingObject);
            }

            updateFloatingObjectZIndex(floatingObject, zIndex);
        }
        if (isGetValue) {
            return -1;
        }
    };
    FloatingObjectModel.prototype.toJSON = function () {
        var jsonData = [];
        this._all().forEach(function (floatingObject) {
            if (floatingObject instanceof FloatingObject && floatingObject._needSaveJsonToFloatingObjects()) {
                var jsData = floatingObject.toJSON();
                var zIndex = floatingObject._zIndex;
                if (!isNaN(zIndex)) {
                    jsData.zIndex = zIndex;
                }
                jsonData.push(jsData);
            }
        });
        return jsonData;
    };
    FloatingObjectModel.prototype.fromJSON = function (jsData, noSchema) {
        var self = this;
        if (!jsData || jsData.length === 0) {
            return;
        }
        for (var i = 0; i < jsData.length; i++) {
            var item = jsData[i];
            var floatingObject = void 0;
            if (item) {
                var FloatingObjectType = void 0, floatingObjectType = item.floatingObjectType, typeName = Core_1._util._isDefined(floatingObjectType) ? floatingObjectType + '' : item.typeName;
                if (typeName === '0' ) {
                    floatingObject = new FloatingObject();
                }
                else if (typeName === '1' ) {
                    floatingObject = FloatingObject._getPictureInstance();
                }
                else {
                    FloatingObjectType = Core_1.getTypeFromString(typeName);
                    if (FloatingObjectType) {
                        floatingObject = new FloatingObjectType();
                    }
                }
                if (floatingObject) {
                    var sheet = self.sheet(), workbook = sheet && sheet.parent;
                    var isPrintingWorkbook = workbook && workbook._isPrintWorkbook;
                    floatingObject.fromJSON(item, noSchema, isPrintingWorkbook);
                    self._add(floatingObject);
                    var zIndex = item.zIndex;
                    if (!isNullOrUndefined(zIndex)) {
                        floatingObject._zIndex = zIndex;
                    }
                }
            }
        }
    };
    FloatingObjectModel.prototype._dispose = function (clearCache) {
        Core_1.GC$(DOCUMENT.body).unbind('scroll' + UI_RES._GC_FLOATINGOBJECT_NS);
        var self = this, sheet = self.sheet();

        if (sheet) {
            sheet._unbind(Core_1.Events.ColumnChanged + UI_RES._GC_FLOATINGOBJECT_NS);
            sheet._unbind(Core_1.Events.RowChanged + UI_RES._GC_FLOATINGOBJECT_NS);
            sheet._unbind(Core_1.Events.ColumnWidthChanged + UI_RES._GC_FLOATINGOBJECT_NS);
            sheet._unbind(Core_1.Events.RowHeightChanged + UI_RES._GC_FLOATINGOBJECT_NS);
        }
        if (clearCache !== false) {
            if (self._storage) {
                Core_1.GC$.each(self._storage, function (index, storage) {
                    storage._dispose(clearCache);
                });
            }
            self.sheet(keyword_null);
        }
    };
    FloatingObjectModel.prototype.hitTest = function (x, y, ignoreProtected) {
        var sheet = this.sheet(), layout = sheet._getSheetLayout();
        var ret = keyword_null;
        if (layout) {
            for (var r = 0; r <= 2; r++) {
                for (var c = 0; c <= 2; c++) {
                    var rect = layout._viewportRect(r, c);
                    if (!rect || !rect.contains(x, y)) {
                        continue;
                    }
                    var floatingObjectRenderManager = sheet._getFloatingObjectRenderManager && sheet._getFloatingObjectRenderManager(r, c);
                    if (floatingObjectRenderManager) {
                        floatingObjectRenderManager._renders.each(function (render) {
                            var floatingObject = render._floatingObject;
                            if (floatingObject && floatingObject.isVisible()
                                && (sheet._canSelectFloatingObject(floatingObject)
                                    || ignoreProtected)
                                && containsInRect(x, y, render._containerRect)) {
                                if (!ret) {
                                    ret = { x: x, y: y, floatingObject: floatingObject, _render: render };
                                }
                                else if (getFloatingObjectZIndex(ret.floatingObject) < getFloatingObjectZIndex(floatingObject)) {
                                    ret.floatingobject = floatingObject;
                                }
                            }
                        });
                    }
                    if (ret) {
                        return ret;
                    }
                }
            }
        }
        return ret;
    };
    FloatingObjectModel.prototype._generateFloatingObjectName = function (prefix) {
        if (!prefix) {
            prefix = 'FloatingObject';
        }
        var len = 1;
        var newName = prefix + len.toString();
        while (this._get(newName)) {
            len++;
            newName = prefix + len.toString();
        }
        return newName;
    };
    return FloatingObjectModel;
}());
exports.FloatingObjectModel = FloatingObjectModel;
var proto = {
    sheet: defProperty('sheet', keyword_undefined),
};
Core_1.GC$.extend(FloatingObjectModel.prototype, proto);
function updateFloatingObjectSize(floatingobject) {
    var sheet = floatingobject.sheet();
    if (!sheet) {
        return;
    }
    function updateSize(startFn, endFn, totalFn, sizeFn, startOffsetFn, endOffsetFn) {
        var newValue = 0, startRow = startFn.call(floatingobject), endRow = endFn.call(floatingobject);
        newValue = totalFn.call(floatingobject, sheet, startRow, endRow);
        if (startRow === endRow) {
            updateStartOffset.call(floatingobject, endFn, endOffsetFn, sizeFn);
            newValue = endOffsetFn.call(floatingobject) - startOffsetFn.call(floatingobject);
        }
        else {
            var startRowHeight = sizeFn.call(sheet, startRow, 3 );
            if (startRowHeight > 0) {
                newValue -= startOffsetFn.call(floatingobject);
            }
            updateStartOffset.call(floatingobject, endFn, endOffsetFn, sizeFn);
            newValue += endOffsetFn.call(floatingobject);
        }
        return newValue;
    }
    var newHeight = updateSize(floatingobject[UI_RES._START_ROW], floatingobject[UI_RES._END_ROW], getTotalHeight, sheet.getRowHeight, floatingobject[UI_RES._START_ROW_OFFSET], floatingobject[UI_RES._END_ROW_OFFSET]);
    var newWidth = updateSize(floatingobject[UI_RES._START_COLUMN], floatingobject[UI_RES._END_COLUMN], getTotalWidth, sheet.getColumnWidth, floatingobject[UI_RES._START_COLUMN_OFFSET], floatingobject[UI_RES._END_COLUMN_OFFSET]);
    if (newWidth < 0) {
        newWidth = 0;
    }
    if (newHeight < 0) {
        newHeight = 0;
    }
    var oldWidth = floatingobject[UI_RES._WIDTH]();
    if (oldWidth !== newWidth) {
        floatingobject[UI_RES._WIDTH](newWidth, false);
        floatingobject.onPropertyChanged(UI_RES._WIDTH, newWidth, oldWidth);
    }
    var oldHeight = floatingobject[UI_RES._HEIGHT]();
    if (oldHeight !== newHeight) {
        floatingobject[UI_RES._HEIGHT](newHeight, false);
        floatingobject.onPropertyChanged(UI_RES._HEIGHT, newHeight, oldHeight);
    }
}
var borderStyles = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
function _isBorderStyleWork(style) {
    return borderStyles.indexOf(style) >= 0;
}
function checkFloatingObjectName(newName) {
    if (isDefined(newName) && (typeof newName !== 'string' || newName === '')) {
        throw new Error(getSR().Exp_FloatingObjectNameEmptyError);
    }
    var _this = this;
    if (newName === _this.name()) {
        return false;
    }
    var sheet = _this.sheet();
    if (sheet) {
        var floatingobject = sheet._floatingObjectModel._get(newName);
        return !floatingobject;
    }

    return true;
}
var ps = [UI_RES._NAME, UI_RES._X, UI_RES._Y, UI_RES._WIDTH, UI_RES._HEIGHT, UI_RES._START_ROW, UI_RES._START_ROW_OFFSET, UI_RES._START_COLUMN, UI_RES._START_COLUMN_OFFSET, UI_RES._END_ROW, UI_RES._END_ROW_OFFSET, UI_RES._END_COLUMN, UI_RES._END_COLUMN_OFFSET, UI_RES._CAN_PRINT, UI_RES._IS_SELECTED, UI_RES._IS_LOCKED, UI_RES._IS_VISIBLE, UI_RES._DYNAMIC_MOVE, UI_RES._DYNAMIC_SIZE, UI_RES._FIXED_POSITION, UI_RES._ALLOW_RESIZE, UI_RES._ALLOW_MOVE, 'alt'];
var propertiesInfo = [
    ['sheet', keyword_null, function () {
            updateFloatingObjectCoorinates(this);
        }],
    [UI_RES._NAME, keyword_undefined, function (newName, oldName) {
            var self = this;
            var sheet = self.sheet();
            if (sheet) {
                var model = sheet._floatingObjectModel;
                var oldFloatingObject = model._get(oldName);


                if (oldFloatingObject === self) {
                    model._rename(oldName, newName);
                }
            }
            self.onPropertyChanged('name', newName, oldName);
        }, checkFloatingObjectName],
    [UI_RES._X, 0, adjustSizeLocationCallback(UI_RES._X, false)],
    [UI_RES._Y, 0, adjustSizeLocationCallback(UI_RES._Y, false)],
    [UI_RES._HEIGHT, 0, adjustSizeLocationCallback(UI_RES._HEIGHT, true)],
    [UI_RES._WIDTH, 0, adjustSizeLocationCallback(UI_RES._WIDTH, true)],
    [UI_RES._START_ROW, keyword_undefined, updateLocationRefreshCallback(UI_RES._START_ROW)],
    [UI_RES._START_ROW_OFFSET, 0, updateLocationRefreshCallback(UI_RES._START_ROW_OFFSET)],
    [UI_RES._START_COLUMN, keyword_undefined, updateLocationRefreshCallback(UI_RES._START_COLUMN)],
    [UI_RES._START_COLUMN_OFFSET, 0, updateLocationRefreshCallback(UI_RES._START_COLUMN_OFFSET)],
    [UI_RES._END_ROW, keyword_undefined, updateSizeRefreshCallback(UI_RES._END_ROW)],
    [UI_RES._END_ROW_OFFSET, 0, updateSizeRefreshCallback(UI_RES._END_ROW_OFFSET)],
    [UI_RES._END_COLUMN, keyword_undefined, updateSizeRefreshCallback(UI_RES._END_COLUMN)],
    [UI_RES._END_COLUMN_OFFSET, 0, updateSizeRefreshCallback(UI_RES._END_COLUMN_OFFSET)],
    [UI_RES._IS_SELECTED, false, propertyRefreshCallback(UI_RES._IS_SELECTED)],
    [UI_RES._IS_LOCKED, true, propertyChangedCallback(UI_RES._IS_LOCKED)],
    [UI_RES._CAN_PRINT, true, propertyChangedCallback(UI_RES._CAN_PRINT)],
    [UI_RES._IS_VISIBLE, true, propertyRefreshCallback(UI_RES._IS_VISIBLE)],
    [UI_RES._DYNAMIC_MOVE, true, function (value, old) {
            propertyChangedCallback(UI_RES._DYNAMIC_MOVE).call(this, value, old);
        }, function (value) {
            if (typeof value !== 'boolean') {
                return false;
            }
            if (!value) {
                this.dynamicSize(false, false);
            }
            return (!this.fixedPosition());
        }],
    [UI_RES._DYNAMIC_SIZE, true, function (value, old) {
            propertyChangedCallback(UI_RES._DYNAMIC_SIZE).call(this, value, old);
        }, function (value) {
            return (typeof value === 'boolean' && this.dynamicMove() && !this.fixedPosition());
        }],
    [UI_RES._FIXED_POSITION, false, function (value, oldValue) {
            var self = this;
            if (value) {
                self.dynamicMove(false, false);
                self.dynamicSize(false, false);
            }
            self.onPropertyChanged(UI_RES._FIXED_POSITION, value, oldValue);
        }],
    [UI_RES._ALLOW_RESIZE, true, propertyRefreshCallback(UI_RES._ALLOW_RESIZE)],
    [UI_RES._ALLOW_MOVE, true, propertyRefreshCallback(UI_RES._ALLOW_MOVE)],
    ['alt', '', propertyChangedCallback('alt')]
];
function propertyChangedCallback(propertyName) {
    return function (value, oldValue) {
        this.onPropertyChanged(propertyName, value, oldValue);
    };
}
function adjustSizeLocationCallback(propertyName, needAdjustSize) {
    return function (value, oldValue) {
        var self = this, sheet = self.sheet();
        if (sheet) {
            if (needAdjustSize) {
                adjustSize(self);
            }
            adjustPosition(self);
            updateCoverRange(self);
            sheet._invalidate();
        }
        self.onPropertyChanged(propertyName, value, oldValue);
    };
}
function updateOnAdd(startFn, endFn, index, count) {
    var self = this;
    self._ignoreAdjustEnd = true;
    var s = startFn.call(self), e = endFn.call(self);
    if (index <= s) {
        if (self.dynamicMove()) {
            startFn.call(self, s + count);
            endFn.call(self, e + count);
        }
    }
    else if (index < e && self.dynamicSize()) {
        endFn.call(self, e + count);
    }
    self._ignoreAdjustEnd = false;
}
function updateOnRemove(startFn, startOffsetFn, endFn, endOffsetFn, index, count, bottomRemoveRow) {
    var self = this;
    self._ignoreAdjustEnd = true;
    var s = startFn.call(self), e = endFn.call(self);
    if (index <= s) {
        if (bottomRemoveRow < s) {
            if (self.dynamicMove()) {
                startFn.call(self, s - count);
                endFn.call(self, e - count);
            }
        }
        else if (bottomRemoveRow < e) {
            var removeCount = bottomRemoveRow - s + 1;
            var newCount = (e - s + 1) - removeCount;
            if (self.dynamicMove()) {
                startFn.call(self, index);
                startOffsetFn.call(self, 0);
            }
            if (self.dynamicSize()) {
                endFn.call(self, index + newCount - 1);
            }
        }
    }
    else if (index <= e) {
        if (bottomRemoveRow < e) {
            if (self.dynamicSize()) {
                endFn.call(self, e - count);
            }
        }
        else if (self.dynamicSize()) {
            endFn.call(self, index);
            endOffsetFn.call(self, 0);
        }
    }
    self._ignoreAdjustEnd = false;
}
function adjustSize(floatingobject) {
    var sheetHeight = getSheetHeight(floatingobject, floatingobject[UI_RES._HEIGHT]());
    var sheetWidth = getSheetWidth(floatingobject, floatingobject[UI_RES._WIDTH]());
    if (floatingobject[UI_RES._WIDTH]() > sheetWidth) {
        floatingobject[UI_RES._WIDTH](sheetWidth, false);
    }
    if (floatingobject[UI_RES._HEIGHT]() > sheetHeight) {
        floatingobject[UI_RES._HEIGHT](sheetHeight, false);
    }
}
function adjustPosition(floatingobject) {
    var right = floatingobject.x() + floatingobject[UI_RES._WIDTH]();
    var sheetWidth = getSheetWidth(floatingobject, right);
    if (right > sheetWidth) {
        floatingobject.x(Math_max(0, sheetWidth - floatingobject[UI_RES._WIDTH]()), false);
    }
    if (floatingobject.x() < 0) {
        floatingobject.x(0, false);
    }
    var bottom = floatingobject.y() + floatingobject[UI_RES._HEIGHT]();
    var sheetHeight = getSheetHeight(floatingobject, bottom);
    if (bottom > sheetHeight) {
        floatingobject.y(Math_max(0, sheetHeight - floatingobject[UI_RES._HEIGHT]()), false);
    }
    if (floatingobject.y() < 0) {
        floatingobject.y(0, false);
    }
}
function updateFloatingObjectCoorinates(floatingobject) {
    adjustSize(floatingobject);
    adjustPosition(floatingobject);
    var srow = floatingobject[UI_RES._START_ROW](), scol = floatingobject[UI_RES._START_COLUMN]();
    if (!isNullOrUndefined(srow) && !isNullOrUndefined(scol)) {
        updateFloatingObjectLocation(floatingobject);
    }
    else {
        updateStartPosition(floatingobject);
    }
    var erow = floatingobject[UI_RES._END_ROW](), ecol = floatingobject[UI_RES._END_COLUMN]();
    if (!isNullOrUndefined(erow) && !isNullOrUndefined(ecol)) {
        updateFloatingObjectSize(floatingobject);
    }
    else {
        updateEndPosition(floatingobject);
    }
}
function getSheetHeight(floatingobject, max) {
    var sheet = floatingobject.sheet();
    if (!sheet) {
        return UI_RES._MAX_NUMBER;
    }
    var rowCount = sheet.getRowCount();
    return getTotalHeight(sheet, 0, rowCount, max);
}
function getSheetWidth(floatingobject, max) {
    var sheet = floatingobject.sheet();
    if (!sheet) {
        return UI_RES._MAX_NUMBER;
    }
    var columnCount = sheet.getColumnCount();
    return getTotalWidth(sheet, 0, columnCount, max);
}
function updateCoverRange(floatingobject) {
    updateStartPosition(floatingobject);
    updateEndPosition(floatingobject);
}
function calSizeZoomFactor(start, end, startOffset, endOffset, zoomFactor, sheet, isRow) {
    var widthTemp = 0;
    var getFun = isRow ? sheet.getRowHeight : sheet.getColumnWidth;
    for (var i = start; i < end; i++) {
        widthTemp += Math_ceil(getFun.call(sheet, i) * zoomFactor);
    }
    widthTemp -= Math_ceil((startOffset || 0) * zoomFactor);
    widthTemp += Math_ceil((endOffset || 0) * zoomFactor);
    return widthTemp;
}
function getRealBeginSize(start, offset, sheet, isRow) {
    var result = 0;
    for (var index = 0; index < start; index++) {
        result += (isRow ? sheet.getRowHeight(index, 3 ) : sheet.getColumnWidth(index, 3));
    }
    result += offset;
    return result;
}
var FloatingObject = (function () {
    function FloatingObject(name, x, y, width, height) {
        var self = this;
        self._cacheOffset = {
            startRowOffset: keyword_undefined,
            startColumnOffset: keyword_undefined,
            endRowOffset: keyword_undefined,
            endColumnOffset: keyword_undefined
        };


        self.typeName = '0' ;
        self._kind = '0' ;
        self.name(name);
        self.x(x ? x : 0, false);
        self.y(y ? y : 0, false);
        self[UI_RES._WIDTH](width ? width : 0, false);
        self[UI_RES._HEIGHT](height ? height : 0, false);
        self._host = [];
        self._needRefresh = false;
        self._zIndexAuto = UI_RES._CSS_ZINDEXDEFAULTVALUE;
        self._ignoreAdjustEnd = false;
    }
    FloatingObject.prototype.position = function (value) {
        var self = this, sheet = self.sheet();
        if (arguments.length === 0) {
            return new Core_1.Point(self.x(), self.y());
        }
        var oldX = self.x(), oldY = self.y();
        if (isType(value, Core_1.Point) && (oldX !== value.x || oldY !== value.y)) {
            self.x(value.x, false);
            self.y(value.y, false);
            adjustPosition(self);
            updateCoverRange(self);
            if (sheet) {
                sheet._invalidate();
            }
            self.onPropertyChanged('position', value, new Core_1.Point(oldX, oldY));
        }
        return self;
    };


    FloatingObject.prototype.cloneContent = function () {
        var content = this.content();
        if (content) {
            var clonedElement = void 0;
            if (content.cloneNode) {
                clonedElement = content.cloneNode(true);
            }
            else {
                var div = createElement(UI_RES._DIV);
                div.innerHTML = content.outerHTML;
                clonedElement = div.firstChild;
            }
            return Core_1.GC$(clonedElement).removeAttr('id')[0];
        }
        return keyword_null;
    };


    FloatingObject.prototype.refreshContent = function (contentContainer) {
        var self = this;
        if (self._needRefresh && contentContainer) {
            var $content = Core_1.GC$(contentContainer);
            $content.empty();
            var child = self.cloneContent(), cssWidth = UI_RES._PERCENT_100, cssHeight = UI_RES._PERCENT_100, styleWidth = '', styleHeight = '';
            if (child && child.style) {
                styleWidth = child.style.width;
                styleHeight = child.style.height;
            }
            if (styleWidth !== '') {
                cssWidth = styleWidth;
            }
            if (styleHeight !== '') {
                cssHeight = styleHeight;
            }
            if (child !== keyword_null) {
                Core_1.GC$(child).css({ width: cssWidth, height: cssHeight })
                    .addClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_BACKGROUND_COVER)
                    .addClass(UI_RES._CSS_CLASS_NONE_USER_SELECT)
                    .attr(UI_RES._UNSELECTABLE, UI_RES._ON)
                    .appendTo(contentContainer);
                $content.css(UI_RES._BACKGROUND, '');
            }
            else {
                $content.css(UI_RES._BACKGROUND, '');
            }
            self._needRefresh = false;
        }
    };
    FloatingObject.prototype.toJSON = function () {
        var self = this, jsData = toJsonFn.call(self, ps);

        var cacheOffset = self._cacheOffset;
        for (var p in cacheOffset) {
            if (!isNullOrUndefined(cacheOffset[p])) {
                jsData[p] = cacheOffset[p];
            }
        }
        jsData.typeName = self.typeName;
        jsData[UI_RES._CONTENT] = Core_1.GC$(createElement(UI_RES._DIV)).append(self.cloneContent()).html();
        return jsData;
    };
    FloatingObject.prototype.fromJSON = function (jsData, noSchema) {
        if (!jsData) {
            return;
        }
        var self = this;
        self._loading = true;
        fromJsonFn.call(this, ps, jsData, noSchema);


        if (isNullOrUndefined(jsData[UI_RES._START_ROW])) {
            updateCoverRange(self);
        }
        if (jsData.content) {
            var contentContainer = createElement(UI_RES._DIV);
            contentContainer.innerHTML = jsData.content;
            self.content(Core_1.GC$(contentContainer.firstChild)[0]);
        }
        self._loading = keyword_undefined;
    };
    FloatingObject.prototype.clone = function (targetSheet) {
        var self = this, floatingObjectType = Core_1.getTypeFromString(self.typeName),
        floatingObject = floatingObjectType ? new floatingObjectType() : new FloatingObject();
        var jsonString = JSON.stringify(self.toJSON());
        floatingObject.fromJSON(JSON.parse(jsonString));
        floatingObject.content(self.cloneContent());
        return floatingObject;
    };
    FloatingObject.prototype.onPropertyChanged = function (name, value, oldValue) {
        var self = this;
        if (self._loading) {
            return;
        }
        var sheet = self.sheet();
        if (sheet) {
            sheet._modelManager._saveFloatingObjectPropertyChange(self, name, oldValue);
            self._trigger({
                sheet: sheet,
                sheetName: sheet.name(),
                floatingObject: self,
                propertyName: name
            });
        }
    };
    FloatingObject.prototype._trigger = function (args) {
        var sheet = this.sheet();
        if (sheet) {
            sheet._trigger(Core_1.Events.FloatingObjectChanged, args);
            if (args.propertyName === UI_RES._IS_SELECTED) {
                var selectionArgs = {
                    sheet: args.sheet,
                    sheetName: args.sheetName,
                    floatingObject: args.floatingObject
                };
                sheet._trigger(Core_1.Events.FloatingObjectSelectionChanged, selectionArgs);
            }
        }
    };
    FloatingObject.prototype._onRowsAdded = function (row, rowCount) {
        var self = this;
        row = Math_ceil(row);
        rowCount = Math_ceil(rowCount);
        updateOnAdd.call(self, self[UI_RES._START_ROW], self[UI_RES._END_ROW], row, rowCount);
    };
    FloatingObject.prototype._onRowsRemoved = function (row, rowCount) {
        var self = this, bottomRemoveRow = row + rowCount - 1;
        updateOnRemove.call(self, self[UI_RES._START_ROW], self[UI_RES._START_ROW_OFFSET], self[UI_RES._END_ROW], self[UI_RES._END_ROW_OFFSET], row, rowCount, bottomRemoveRow);
    };
    FloatingObject.prototype._onColumnsAdded = function (column, columnCount) {
        var self = this;
        column = Math_ceil(column);
        columnCount = Math_ceil(columnCount);
        updateOnAdd.call(self, self[UI_RES._START_COLUMN], self[UI_RES._END_COLUMN], column, columnCount);
    };
    FloatingObject.prototype._onColumnsRemoved = function (column, columnCount) {
        var self = this;
        column = Math_ceil(column);
        columnCount = Math_ceil(columnCount);
        var rightRemovedColumn = column + columnCount - 1;
        updateOnRemove.call(self, self[UI_RES._START_COLUMN], self[UI_RES._START_COLUMN_OFFSET], self[UI_RES._END_COLUMN], self[UI_RES._END_COLUMN_OFFSET], column, columnCount, rightRemovedColumn);
    };


    FloatingObject.prototype.getHost = function (rowViewportIndex, columnViewportIndex) {
        var hostArray = this._host.concat();

        if (!isNullOrUndefined(rowViewportIndex) && !isNullOrUndefined(columnViewportIndex)) {
            for (var i = 0; i < hostArray.length; i++) {
                var host = hostArray[i];
                if (host.rowViewportIndex === rowViewportIndex && host.columnViewportIndex === columnViewportIndex) {
                    return host;
                }
            }
            return keyword_null;
        }
        return hostArray;
    };
    FloatingObject.prototype._addContainer = function (contentContainer, rowViewportIndex, columnViewportIndex) {
        var host = this._host;
        if (contentContainer && host.indexOf(contentContainer) < 0) {
            contentContainer.rowViewportIndex = rowViewportIndex;
            contentContainer.columnViewportIndex = columnViewportIndex;
            host.push(contentContainer);
        }
    };
    FloatingObject.prototype._removeContainer = function (contentContainer) {
        var host = this._host, index = host.indexOf(contentContainer);
        if (index >= 0) {
            host.splice(index, 1);
        }
    };
    FloatingObject.prototype._createContentContainer = function (rowViewportIndex, columnViewportIndex) {
        var contentContainer = createElement(UI_RES._DIV);
        Core_1.GC$(contentContainer).addClass(UI_RES._NO_USER_SELECT)
            .addClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_CONTENT_CONTAINER)
            .attr(UI_RES._UNSELECTABLE, UI_RES._ON)
            .css(UI_RES._POSITION, UI_RES._ABSOLUTE);
        var content = this.cloneContent(), cssWidth = UI_RES._PERCENT_100, cssHeight = UI_RES._PERCENT_100, styleWidth = '', styleHeight = '';
        var contentStyle = content && content.style;
        if (contentStyle) {
            styleWidth = contentStyle.width;
            styleHeight = contentStyle.height;
        }
        if (styleWidth !== '') {
            cssWidth = styleWidth;
        }
        if (styleHeight !== '') {
            cssHeight = styleHeight;
        }
        if (content !== keyword_null) {
            Core_1.GC$(content).css({
                width: cssWidth,
                height: cssHeight
            }).addClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_BACKGROUND_COVER).addClass(UI_RES._NO_USER_SELECT)
                .attr(UI_RES._UNSELECTABLE, UI_RES._ON)
                .appendTo(contentContainer);
        }
        this._addContainer(contentContainer, rowViewportIndex, columnViewportIndex);
        return contentContainer;
    };
    FloatingObject.prototype._needSaveJsonToFloatingObjects = function () {
        return true;
    };
    FloatingObject.prototype._dispose = function (clearCache) {
    };
    FloatingObject.prototype._updateLocationSize = function () {
        updateFloatingObjectLocation(this);
        updateFloatingObjectSize(this);
    };
    FloatingObject.prototype._getZoomWidth = function (zoomFactor) {
        var self = this;
        if (zoomFactor === 1) {
            return Math_floor(self.width());
        }
        var startX = getRealBeginSize(self.startColumn(), self.startColumnOffset(), self.sheet(), false);
        var info = getAnchor(self, false, startX + self[UI_RES._WIDTH]());
        return calSizeZoomFactor(self.startColumn(), info.index, self.startColumnOffset(), info.offset, zoomFactor, self.sheet(), false);
    };
    FloatingObject.prototype._getZoomHeight = function (zoomFactor) {
        var self = this;
        if (zoomFactor === 1) {
            return Math_floor(self.height());
        }
        var startY = getRealBeginSize(self.startRow(), self.startRowOffset(), self.sheet(), true);
        var info = getAnchor(self, true, startY + self[UI_RES._HEIGHT]());
        return calSizeZoomFactor(self.startRow(), info.index, self.startRowOffset(), info.offset, zoomFactor, self.sheet(), true);
    };
    return FloatingObject;
}());
exports.FloatingObject = FloatingObject;
var floatObjectProto = {


    content: defProperty(UI_RES._CONTENT, keyword_null, propertyRefreshCallback(UI_RES._CONTENT)),
};


Core_1.GC$.each(propertiesInfo, function (p, v) {
    floatObjectProto[v[0]] = defProperty(v[0], v[1], v[2], v[3]);
});
Core_1.GC$.extend(FloatingObject.prototype, floatObjectProto);
function getFloatingObjectResizingRect(floatingObjectRender, direction, point) {
    var resizeInfo = floatingObjectRender._resizeInfo, x, y, width, height;
    switch (direction) {
        case TOP_LEFT:
            x = Math_min(resizeInfo[UI_RES._START_X] + resizeInfo[UI_RES._START_WIDTH], point.x);
            y = Math_min(resizeInfo[UI_RES._START_Y] + resizeInfo[UI_RES._START_HEIGHT], point.y);
            width = Math_abs(point.x - resizeInfo[UI_RES._START_X] - resizeInfo[UI_RES._START_WIDTH]);
            height = Math_abs(point.y - resizeInfo[UI_RES._START_Y] - resizeInfo[UI_RES._START_HEIGHT]);
            break;
        case TOP_CENTER:
            x = resizeInfo[UI_RES._START_X];
            y = Math_min(resizeInfo[UI_RES._START_Y] + resizeInfo[UI_RES._START_HEIGHT], point.y);
            width = resizeInfo[UI_RES._START_WIDTH];
            height = Math_abs(point.y - resizeInfo[UI_RES._START_Y] - resizeInfo[UI_RES._START_HEIGHT]);
            break;
        case TOP_RIGHT:
            x = Math_min(resizeInfo[UI_RES._START_X], point.x);
            y = Math_min(resizeInfo[UI_RES._START_Y] + resizeInfo[UI_RES._START_HEIGHT], point.y);
            width = Math_abs(point.x - resizeInfo[UI_RES._START_X]);
            height = Math_abs(point.y - resizeInfo[UI_RES._START_Y] - resizeInfo[UI_RES._START_HEIGHT]);
            break;
        case MIDDLE_LEFT:
            x = Math_min(resizeInfo[UI_RES._START_X] + resizeInfo[UI_RES._START_WIDTH], point.x);
            y = resizeInfo[UI_RES._START_Y];
            width = Math_abs(point.x - resizeInfo[UI_RES._START_X] - resizeInfo[UI_RES._START_WIDTH]);
            height = resizeInfo[UI_RES._START_HEIGHT];
            break;
        case MIDDLE_RIGHT:
            x = Math_min(resizeInfo[UI_RES._START_X], point.x);
            y = resizeInfo[UI_RES._START_Y];
            width = Math_abs(point.x - resizeInfo[UI_RES._START_X]);
            height = resizeInfo[UI_RES._START_HEIGHT];
            break;
        case BOTTOM_LEFT:
            x = Math_min(resizeInfo[UI_RES._START_X] + resizeInfo[UI_RES._START_WIDTH], point.x);
            y = Math_min(resizeInfo[UI_RES._START_Y], point.y);
            width = Math_abs(point.x - resizeInfo[UI_RES._START_X] - resizeInfo[UI_RES._START_WIDTH]);
            height = Math_abs(point.y - resizeInfo[UI_RES._START_Y]);
            break;
        case BOTTOM_CENTER:
            x = resizeInfo[UI_RES._START_X];
            y = Math_min(resizeInfo[UI_RES._START_Y], point.y);
            width = resizeInfo[UI_RES._START_WIDTH];
            height = Math_abs(point.y - resizeInfo[UI_RES._START_Y]);
            break;
        case BOTTOM_RIGHT:
            x = Math_min(resizeInfo[UI_RES._START_X], point.x);
            y = Math_min(resizeInfo[UI_RES._START_Y], point.y);
            width = Math_abs(point.x - resizeInfo[UI_RES._START_X]);
            height = Math_abs(point.y - resizeInfo[UI_RES._START_Y]);
            break;
    }
    return new Core_1.Rect(x, y, width, height);
}
function getHTMLElementBounds(element) {
    var $element = Core_1.GC$(element);
    var position = $element.position();
    return new Core_1.Rect(position.left, position.top, $element[UI_RES._WIDTH](), $element[UI_RES._HEIGHT]());
}
function attachMoveResizeDivToContainer(moveResizeDiv, container, x, y, width, height) {
    Core_1.GC$(moveResizeDiv)
        .css([UI_RES._TOP, UI_RES._LEFT, UI_RES._WIDTH, UI_RES._HEIGHT], [[y - 1], [x - 1], width, height])
        .addClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_MOVING_DIV).appendTo(container);
}
function hitTest(floatingObjectRender, resizeDirection) {
    if (!floatingObjectRender._layout ) {
        return keyword_null;
    }
    var info = {
        inMoving: false
    };
    if (!resizeDirection) {
        info.inMoving = true;
    }
    return info;
}
function getViewportRect(floatingObjectRender) {
    var self = floatingObjectRender, sheet = self._sheet, rowViewportIndex = self._rowViewportIndex, columnViewportIndex = self._columnViewportIndex;
    var frozenTrailingRowCount = sheet.frozenTrailingRowCount();
    var frozenTrailingColumnCount = sheet.frozenTrailingColumnCount();
    var layout = sheet._getSheetLayout(), rect = layout._viewportRect(rowViewportIndex, columnViewportIndex), topRow, bottomRow, leftColumn, rightColumn, tempRect, floatingObject = self._floatingObject, startRow = floatingObject[UI_RES._START_ROW](), startColumn = floatingObject[UI_RES._START_COLUMN](), endRow = floatingObject[UI_RES._END_ROW](), endColumn = floatingObject[UI_RES._END_COLUMN](), frozenRowCount = sheet.frozenRowCount(), frozenColCount = sheet.frozenColumnCount(), frozenTrailingRow = sheet.getRowCount(3 ) - frozenTrailingRowCount - 1, frozenTrailingColumn = sheet.getColumnCount(3 ) - frozenTrailingColumnCount - 1;
    if (rowViewportIndex === UI_RES._VIEWPORTINDEX) {
        if (frozenRowCount > 0) {
            topRow = sheet.getViewportTopRow(rowViewportIndex);

            if (startRow < frozenRowCount || topRow === frozenRowCount) {
                rect.y -= layout._frozenHeight;
                rect[UI_RES._HEIGHT] += layout._frozenHeight;
            }
        }
        if (frozenTrailingRowCount > 0) {
            bottomRow = sheet.getViewportBottomRow(rowViewportIndex);

            if (endRow > frozenTrailingRow && bottomRow === frozenTrailingRow) {
                rect[UI_RES._HEIGHT] += layout._frozenTrailingHeight;
            }
        }
    }
    else if (rowViewportIndex === UI_RES._VIEWPORTINDEX - 1) {
        topRow = sheet.getViewportTopRow(rowViewportIndex + 1);

        if (endRow >= topRow || topRow === frozenRowCount) {
            tempRect = layout._viewportRect(rowViewportIndex + 1, columnViewportIndex);
            rect[UI_RES._HEIGHT] += tempRect[UI_RES._HEIGHT];
        }
    }
    else if (rowViewportIndex === UI_RES._VIEWPORTINDEX + 1) {
        bottomRow = sheet.getViewportBottomRow(rowViewportIndex - 1);

        if (startRow <= bottomRow || bottomRow === frozenTrailingRow) {
            tempRect = layout._viewportRect(rowViewportIndex - 1, columnViewportIndex);
            rect.y = tempRect.y;
            rect[UI_RES._HEIGHT] += tempRect[UI_RES._HEIGHT];
        }
    }
    if (columnViewportIndex === UI_RES._VIEWPORTINDEX) {
        if (frozenColCount > 0) {
            leftColumn = sheet.getViewportLeftColumn(columnViewportIndex);

            if (startColumn < frozenColCount || leftColumn === frozenColCount) {
                rect.x -= layout._frozenWidth;
                rect[UI_RES._WIDTH] += layout._frozenWidth;
            }
        }
        if (sheet.frozenTrailingColumnCount() > 0) {
            rightColumn = sheet.getViewportRightColumn(columnViewportIndex);

            if (endColumn > frozenTrailingColumn || rightColumn === frozenTrailingColumn) {
                rect[UI_RES._WIDTH] += layout._frozenTrailingWidth;
            }
        }
    }
    else if (columnViewportIndex === UI_RES._VIEWPORTINDEX - 1) {
        leftColumn = sheet.getViewportLeftColumn(columnViewportIndex + 1);

        if (endColumn >= leftColumn || leftColumn === frozenColCount) {
            tempRect = layout._viewportRect(rowViewportIndex, columnViewportIndex + 1);
            rect[UI_RES._WIDTH] += tempRect[UI_RES._WIDTH];
        }
    }
    else if (columnViewportIndex === UI_RES._VIEWPORTINDEX + 1) {
        rightColumn = sheet.getViewportRightColumn(columnViewportIndex - 1);

        if (startColumn <= rightColumn || rightColumn === frozenTrailingColumn) {
            tempRect = layout._viewportRect(rowViewportIndex, columnViewportIndex - 1);
            rect.x = tempRect.x;
            rect[UI_RES._WIDTH] += tempRect[UI_RES._WIDTH];
        }
    }
    return rect;
}
function doResizeContainerImp(div, offsetLeft, offsetTop, offsetWidth, offsetHeight) {
    var bounds = getHTMLElementBounds(div);
    Core_1.GC$(div).css([UI_RES._TOP, UI_RES._LEFT, UI_RES._WIDTH, UI_RES._HEIGHT], [bounds.y + offsetTop, bounds.x + offsetLeft, bounds[UI_RES._WIDTH] + offsetWidth, bounds[UI_RES._HEIGHT] + offsetHeight]);
}
function doResizeContainer(floatingObjectRender) {
    var self = floatingObjectRender;
    if (self._mouseDownHittestInfo) {
        var point = self._mousePosition, layout = getViewportRect(self), moveResizeDiv = self._moveResizeDiv, resizeInfo = self._resizeInfo, direction = resizeInfo.direction, rect = void 0;
        point = new Core_1.Point(point.x - layout.x, point.y - layout.y);
        rect = getFloatingObjectResizingRect(self, direction, point);
        resizeInfo.endX = rect.x;
        resizeInfo.endY = rect.y;
        resizeInfo.endWidth = rect[UI_RES._WIDTH];
        resizeInfo.endHeight = rect[UI_RES._HEIGHT];
        var bounds = getHTMLElementBounds(moveResizeDiv);
        var offsetTop = rect.y - bounds.y;
        var offsetLeft = rect.x - bounds.x;
        var offsetWidth = rect[UI_RES._WIDTH] - bounds[UI_RES._WIDTH];
        var offsetHeight = rect[UI_RES._HEIGHT] - bounds[UI_RES._HEIGHT];
        doResizeContainerImp(moveResizeDiv, offsetLeft, offsetTop, offsetWidth, offsetHeight);
        var attachedMoveResizeDivDict = self._attachedMoveResizeDivDict;
        for (var item in attachedMoveResizeDivDict) {
            if (hasOwnProperty(attachedMoveResizeDivDict, item)) {
                var value = attachedMoveResizeDivDict[item];
                doResizeContainerImp(value.moveResizeDiv, offsetLeft, offsetTop, offsetWidth, offsetHeight);
            }
        }
    }
}
function doMouseWheel(floatingObjectRender, e ) {
    var sheet = floatingObjectRender._sheet;
    if (sheet) {
        var returnValue = sheet._mouseWheelDelegate(e);
        if (returnValue === false) {
            Core_1._util._cancelDefault(e);
        }
    }
}
function doCopyFloatingObject(floatingObjectRender) {
    var self = floatingObjectRender, sheet = self._sheet;
    var moveInfo = self._moveInfo;
    if (moveInfo) {
        var viewportOffsetHeight = getDistance(sheet, moveInfo[UI_RES._START_TOP_ROW], sheet.getViewportTopRow(self._rowViewportIndex), true);
        var viewportOffsetWidth = getDistance(sheet, moveInfo[UI_RES._START_LEFT_COLUMN], sheet.getViewportLeftColumn(self._columnViewportIndex), false);
        var offsetX = moveInfo[UI_RES._END_X] - moveInfo[UI_RES._START_X] + (moveInfo[UI_RES._END_X] > moveInfo[UI_RES._START_X] ? viewportOffsetWidth : -1 * viewportOffsetWidth);
        var offsetY = moveInfo[UI_RES._END_Y] - moveInfo[UI_RES._START_Y] + (moveInfo[UI_RES._END_Y] > moveInfo[UI_RES._START_Y] ? viewportOffsetHeight : -1 * viewportOffsetHeight);

        if (offsetX === 0 && offsetY === 0) {
            return;
        }
        var names = [];
        names.push(self._floatingObject.name());
        var attachedMoveResizeDivDict = self._attachedMoveResizeDivDict;
        for (var item in attachedMoveResizeDivDict) {
            if (hasOwnProperty(attachedMoveResizeDivDict, item)) {
                names.push(item);
            }
        }
        sheet._commandManager().execute({
            cmd: 'dragCopyFloatingObjects',
            sheetName: sheet.name(),
            floatingObjects: names,
            offsetX: offsetX,
            offsetY: offsetY
        });
    }
}
function doMoveFloatingObject(floatingObjectRender) {
    var self = floatingObjectRender, sheet = self._sheet, moveInfo = self._moveInfo, zoomFactor = sheet.zoom();
    if (moveInfo) {
        var viewportOffsetHeight = getDistance(sheet, moveInfo[UI_RES._START_TOP_ROW], sheet.getViewportTopRow(self._rowViewportIndex), true);
        var viewportOffsetWidth = getDistance(sheet, moveInfo[UI_RES._START_LEFT_COLUMN], sheet.getViewportLeftColumn(self._columnViewportIndex), false);
        var offsetX = moveInfo[UI_RES._END_X] - moveInfo[UI_RES._START_X] + (moveInfo[UI_RES._END_X] > moveInfo[UI_RES._START_X] ? viewportOffsetWidth : -1 * viewportOffsetWidth);
        var offsetY = moveInfo[UI_RES._END_Y] - moveInfo[UI_RES._START_Y] + (moveInfo[UI_RES._END_Y] > moveInfo[UI_RES._START_Y] ? viewportOffsetHeight : -1 * viewportOffsetHeight);
        offsetX = offsetX / zoomFactor;
        offsetY = offsetY / zoomFactor;
        var names = [];
        names.push(self._floatingObject.name());
        var attachedMoveResizeDivDict = self._attachedMoveResizeDivDict;
        for (var item in attachedMoveResizeDivDict) {
            if (hasOwnProperty(attachedMoveResizeDivDict, item)) {
                names.push(item);
            }
        }
        sheet._commandManager().execute({
            cmd: 'moveFloatingObjects',
            sheetName: sheet.name(),
            floatingObjects: names,
            offsetX: offsetX,
            offsetY: offsetY
        });
    }
}
function doResizeFloatingObject(floatingObjectRender) {
    var self = floatingObjectRender, sheet = self._sheet, zoomFactor = sheet.zoom(), floatingObject = self._floatingObject, resizeInfo = self._resizeInfo;
    if (resizeInfo) {
        var viewportOffsetHeight = getDistance(sheet, resizeInfo[UI_RES._START_TOP_ROW], sheet.getViewportTopRow(self._rowViewportIndex), true);
        var viewportOffsetWidth = getDistance(sheet, resizeInfo[UI_RES._START_LEFT_COLUMN], sheet.getViewportLeftColumn(self._columnViewportIndex), false);
        var offsetX = resizeInfo[UI_RES._END_X] - resizeInfo[UI_RES._START_X] + (resizeInfo[UI_RES._END_X] > resizeInfo[UI_RES._START_X] ? viewportOffsetWidth : -1 * viewportOffsetWidth);
        offsetX = offsetX / zoomFactor;
        var offsetY = resizeInfo[UI_RES._END_Y] - resizeInfo[UI_RES._START_Y] + (resizeInfo[UI_RES._END_Y] > resizeInfo[UI_RES._START_Y] ? viewportOffsetHeight : -1 * viewportOffsetHeight);
        offsetY = offsetY / zoomFactor;
        var offsetWidth = (resizeInfo.endWidth + viewportOffsetWidth) / zoomFactor - floatingObject[UI_RES._WIDTH]();
        var offsetHeight = (resizeInfo.endHeight + viewportOffsetHeight) / zoomFactor - floatingObject[UI_RES._HEIGHT]();
        var names = [];
        names.push(floatingObject.name());
        var attachedMoveResizeDivDict = self._attachedMoveResizeDivDict;
        for (var item in attachedMoveResizeDivDict) {
            if (hasOwnProperty(attachedMoveResizeDivDict, item)) {
                names.push(item);
            }
        }
        sheet._commandManager().execute({
            cmd: 'resizeFloatingObjects',
            sheetName: sheet.name(),
            floatingObjects: names,
            offsetX: offsetX,
            offsetY: offsetY,
            offsetWidth: offsetWidth,
            offsetHeight: offsetHeight
        });
    }
}
function doMoveContainer(floatingObjectRender, startPoint, endPoint) {
    var self = floatingObjectRender, moveResizeDiv = self._moveResizeDiv;
    if (moveResizeDiv) {
        var x = endPoint.x - startPoint.x;
        var y = endPoint.y - startPoint.y;
        doMoveContainerImp(moveResizeDiv, x, y);
        var attachedMoveResizeDivDict = self._attachedMoveResizeDivDict;
        for (var item in attachedMoveResizeDivDict) {
            if (hasOwnProperty(attachedMoveResizeDivDict, item)) {
                var value = attachedMoveResizeDivDict[item];
                doMoveContainerImp(value.moveResizeDiv, x, y);
            }
        }
    }
}
function doMoveContainerImp(div, x, y) {
    var $movingContainer = Core_1.GC$(div);
    var position = Core_1.GC$(div).position();
    $movingContainer.css([UI_RES._TOP, UI_RES._LEFT], [position[UI_RES._TOP] + y, position[UI_RES._LEFT] + x]);
}
function adjustMoveInfo(floatingObjectRender) {
    var self = floatingObjectRender;
    var info = self._moveInfo;
    if (!info) {
        return;
    }
    var fo = self._floatingObject, sheet = self._sheet, layout = sheet._getSheetLayout(), viewportWidth = layout[UI_RES._WIDTH] - layout._rowHeaderWidth - layout._headerX, viewportHeight = layout[UI_RES._HEIGHT] - layout._colHeaderHeight - layout._headerY, startX = info.startX, startY = info.startY;
    var foX = fo.position().x, foY = fo.position().y, width = fo[UI_RES._WIDTH](), height = fo[UI_RES._HEIGHT]();
    if (foX + info.endX - startX < 0) {
        info.endX = startX - foX;
    }
    if (foY + info.endY - startY < 0) {
        info.endY = startY - foY;
    }
    if (foX + width + info.endX - startX > viewportWidth) {
        info.endX = viewportWidth + startX - foX - width;
    }
    if (foY + height + info.endY - startY > viewportHeight) {
        info.endY = viewportHeight + startY - foY - height;
    }
    info.startTopRow = sheet.getViewportTopRow(self._rowViewportIndex);
    info.startLeftColumn = sheet.getViewportLeftColumn(self._columnViewportIndex);
}
function adjustResizeInfo(floatingObjectRender) {
    var self = floatingObjectRender;
    var info = self._resizeInfo;
    if (!info) {
        return;
    }
    var sheet = self._sheet, layout = sheet._getSheetLayout(), viewportWidth = layout[UI_RES._WIDTH] - layout._rowHeaderWidth - layout._headerX, viewportHeight = layout[UI_RES._HEIGHT] - layout._colHeaderHeight - layout._headerY;
    var resizeRect = new Core_1.Rect(info.endX, info.endY, info.endWidth, info.endHeight);
    resizeRect = resizeRect.getIntersect(0, 0, viewportWidth, viewportHeight);
    info.endX = resizeRect.x;
    info.endY = resizeRect.y;
    info.endWidth = resizeRect[UI_RES._WIDTH];
    info.endHeight = resizeRect[UI_RES._HEIGHT];
    info.startTopRow = sheet.getViewportTopRow(self._rowViewportIndex);
    info.startLeftColumn = sheet.getViewportLeftColumn(self._columnViewportIndex);
}
function createFloatingObjectContainer(floatingObjectRender) {
    var outer = createElement(UI_RES._DIV);
    var $outer = Core_1.GC$(outer);
    var self = floatingObjectRender;
    $outer.addClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_CONTAINER).addClass(UI_RES._CSS_CLASS_NONE_USER_SELECT)
        .attr(UI_RES._UNSELECTABLE, UI_RES._ON)
        .css(UI_RES._Z_INDEX, UI_RES._CSS_ZINDEXDEFAULTVALUE).bind('mousedown', function (event) {
        self._doMouseDown(event);
    }).bind(UI_RES._MOUSE_MOVE, function (event) {
        self._doMouseMove(event);
    }).bind(UI_RES._MOUSE_UP, function (event) {
        self._doMouseUp(event);
    });

    outer.addEventListener('mousewheel', function (event) {
        doMouseWheel(self, event);
    }, false);

    outer.addEventListener('DOMMouseScroll', function (event) {
        doMouseWheel(self, event);
    }, false);
    var topLeft = Core_1.GC$(createElement(UI_RES._DIV)).addClass(UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR + ' ' + UI_RES._FLOATINGOBJECT_TOP + ' ' + UI_RES._FLOATINGOBJECT_LEFT + ' ' + UI_RES._FLOATINGOBJECT_ABSOLUTE), topCenter = Core_1.GC$(createElement(UI_RES._DIV)).addClass(UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR + ' ' + UI_RES._FLOATINGOBJECT_TOP + ' ' + UI_RES._FLOATINGOBJECT_CENTER + ' ' + UI_RES._FLOATINGOBJECT_ABSOLUTE), topRight = Core_1.GC$(createElement(UI_RES._DIV)).addClass(UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR + ' ' + UI_RES._FLOATINGOBJECT_TOP + ' ' + UI_RES._FLOATINGOBJECT_RIGHT + ' ' + UI_RES._FLOATINGOBJECT_ABSOLUTE), middleLeft = Core_1.GC$(createElement(UI_RES._DIV)).addClass(UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR + ' ' + UI_RES._FLOATINGOBJECT_MIDDLE + ' ' + UI_RES._FLOATINGOBJECT_LEFT + ' ' + UI_RES._FLOATINGOBJECT_ABSOLUTE), middleRight = Core_1.GC$(createElement(UI_RES._DIV)).addClass(UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR + ' ' + UI_RES._FLOATINGOBJECT_MIDDLE + ' ' + UI_RES._FLOATINGOBJECT_RIGHT + ' ' + UI_RES._FLOATINGOBJECT_ABSOLUTE), bottomLeft = Core_1.GC$(createElement(UI_RES._DIV)).addClass(UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR + ' ' + UI_RES._FLOATINGOBJECT_BOTTOM + ' ' + UI_RES._FLOATINGOBJECT_LEFT + ' ' + UI_RES._FLOATINGOBJECT_ABSOLUTE), bottomCenter = Core_1.GC$(createElement(UI_RES._DIV)).addClass(UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR + ' ' + UI_RES._FLOATINGOBJECT_BOTTOM + ' ' + UI_RES._FLOATINGOBJECT_CENTER + ' ' + UI_RES._FLOATINGOBJECT_ABSOLUTE), bottomRight = Core_1.GC$(createElement(UI_RES._DIV)).addClass(UI_RES._FLOATINGOBJECT_RESIZE_INDICATOR + ' ' + UI_RES._FLOATINGOBJECT_BOTTOM + ' ' + UI_RES._FLOATINGOBJECT_RIGHT + ' ' + UI_RES._FLOATINGOBJECT_ABSOLUTE);
    $outer.append(topLeft).append(topCenter).append(topRight).append(middleLeft).append(middleRight).append(bottomLeft).append(bottomCenter).append(bottomRight);
    FloatingObjectRender._callFeatureHandler(self, 'init', outer);
    return outer;
}
function createMoveResizeContainer(floatingObjectRender) {
    var self = floatingObjectRender, layout = self._floatingObjectContainerDiv && self._layout;
    if (layout && !self._moveResizeDiv) {
        var moveResizeContainerDiv = self._moveResizeContainerDiv = createElement(UI_RES._DIV);
        self._moveResizeDiv = createElement(UI_RES._DIV);
        self._attachedMoveResizeDivDict = {};
        self._renderManager._renders.each(function (foContainer) {
            var fo = foContainer._floatingObject;
            if (fo && fo.name() !== self._floatingObject.name() && fo.isSelected() && !self._attachedMoveResizeDivDict[fo.name()]) {
                var containerLayout = foContainer._layout;
                self._attachedMoveResizeDivDict[fo.name()] = {
                    offsetX: containerLayout.x - layout.x,
                    offsetY: containerLayout.y - layout.y,
                    height: containerLayout[UI_RES._HEIGHT],
                    width: containerLayout[UI_RES._WIDTH],
                    moveResizeDiv: createElement(UI_RES._DIV)
                };
            }
        });
        var viewportRect = getViewportRect(self);
        var $movingContainer = Core_1.GC$(moveResizeContainerDiv);
        $movingContainer.css([UI_RES._Z_INDEX, UI_RES._TOP, UI_RES._LEFT, UI_RES._WIDTH, UI_RES._HEIGHT, UI_RES._BACKGROUND], [UI_RES._CSS_CONTAINERZINDEXVALUE, viewportRect.y, viewportRect.x, viewportRect[UI_RES._WIDTH], viewportRect[UI_RES._HEIGHT], 'rgba(255,255,255,0.01)'])
            .addClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_MOVING_CONTAINER).bind(UI_RES._MOUSE_MOVE, function (e) {
            self._doMouseMove(e);
        }).bind(UI_RES._MOUSE_UP, function (e) {
            self._doMouseUp(e);
        });
        var top_1 = layout.y - viewportRect.y;
        var left = layout.x - viewportRect.x;
        attachMoveResizeDivToContainer(self._moveResizeDiv, moveResizeContainerDiv, left, top_1, layout[UI_RES._WIDTH], layout[UI_RES._HEIGHT]);
        var attachedMoveResizeDivDict = self._attachedMoveResizeDivDict;
        for (var item in attachedMoveResizeDivDict) {
            if (hasOwnProperty(attachedMoveResizeDivDict, item)) {
                var value = attachedMoveResizeDivDict[item];
                attachMoveResizeDivToContainer(value.moveResizeDiv, self._moveResizeContainerDiv, left + value.offsetX, top_1 + value.offsetY, value[UI_RES._WIDTH], value[UI_RES._HEIGHT]);
            }
        }
        if (self._containerDiv) {
            Core_1.GC$(self._containerDiv).append(self._moveResizeContainerDiv);
        }
    }
}
function handleDocumentMouseMove(floatingObjectRender) {
    var self = floatingObjectRender;
    if (!self._isMouseCapture) {
        Core_1.GC$(DOCUMENT).bind(UI_RES._MOUSE_MOVE + UI_RES._GC_FLOATINGOBJECT_NS, function (e) {
            self._doMouseMove(e);
        }).bind(UI_RES._MOUSE_UP + UI_RES._GC_FLOATINGOBJECT_NS, function (e) {
            self._doMouseUp(e);
        });
        self._isMouseCapture = true;
    }
}
function unhandleDocumentMouseMove(floatingObjectRender) {
    var self = floatingObjectRender;
    if (self._isMouseCapture) {
        self._isMouseCapture = false;
        Core_1.GC$(DOCUMENT).unbind(UI_RES._MOUSE_MOVE + UI_RES._GC_FLOATINGOBJECT_NS).unbind(UI_RES._MOUSE_UP + UI_RES._GC_FLOATINGOBJECT_NS);
    }
}
function showResizeIndicator(floatingObjectRender, container) {
    var $indicators = Core_1.GC$(UI_RES._CSS_SELECTOR_RESIZE_INDICATOR, container);
    $indicators.removeClass(UI_RES._CSS_CLASS_RESIZE_INDICATOR_UNSELECT);
    var self = floatingObjectRender, containerBounds = getHTMLElementBounds(self._floatingObjectContainerDiv), contentDiv = self._floatingObjectContentDiv, floatingObject = self._floatingObject;
    if (self._borderDiv) {
        contentDiv = self._borderDiv;
    }
    var resizeIndicatorSize = FloatingObjectRender._resizeIndicatorSize;
    var contentBounds = getHTMLElementBounds(contentDiv), leftOffset = contentBounds.x, topOffset = contentBounds.y, bottomOffset = containerBounds[UI_RES._HEIGHT] - contentBounds.y - contentBounds[UI_RES._HEIGHT], rightOffset = containerBounds[UI_RES._WIDTH] - contentBounds.x - contentBounds[UI_RES._WIDTH], position = 0, resizeIndicatorSizeWithBorder = resizeIndicatorSize + 2, gapStripSize = Math_floor(resizeIndicatorSize / 2 + 1);

    if (floatingObject.typeName === '1' ) {
        var borderWidth = floatingObject.borderWidth(), borderStyle = floatingObject.borderStyle();
        if (!_isBorderStyleWork(borderStyle)) {
            borderWidth = 0;
        }
        if (borderWidth >= gapStripSize) {
            position = borderWidth - gapStripSize;
        }
        bottomOffset = containerBounds[UI_RES._HEIGHT] - topOffset - contentBounds[UI_RES._HEIGHT] - borderWidth;
        rightOffset = containerBounds[UI_RES._WIDTH] - leftOffset - contentBounds[UI_RES._WIDTH] - borderWidth;
        leftOffset += borderWidth;
        topOffset = topOffset + borderWidth;
    }
    var resizeRectInfos = [];
    if (leftOffset > 0) {
        applyPosition(self, topOffset > 0, CSS_SELECTOR_TOP_LEFT_RESIZE_INDICATOR, position, position, keyword_undefined, keyword_undefined, 'nw' + UI_RES._DASH_RESIZE, TOP_LEFT, resizeRectInfos);
        applyPosition(self, containerBounds[UI_RES._HEIGHT] > 0, CSS_SELECTOR_MIDDLE_LEFT_RESIZE_INDICATOR, position, (contentBounds[UI_RES._HEIGHT] - resizeIndicatorSizeWithBorder) / 2 + topOffset, keyword_undefined, keyword_undefined, 'w' + UI_RES._DASH_RESIZE, MIDDLE_LEFT, resizeRectInfos);
        applyPosition(self, bottomOffset > 0, CSS_SELECTOR_BOTTOM_LEFT_RESIZE_INDICATOR, position, keyword_undefined, keyword_undefined, position, 'ne' + UI_RES._DASH_RESIZE, BOTTOM_LEFT, resizeRectInfos);
    }
    else {
        resizeIndicatorUnselect(self, CSS_SELECTOR_TOP_LEFT_RESIZE_INDICATOR);
        resizeIndicatorUnselect(self, CSS_SELECTOR_MIDDLE_LEFT_RESIZE_INDICATOR);
        resizeIndicatorUnselect(self, CSS_SELECTOR_BOTTOM_LEFT_RESIZE_INDICATOR);
    }
    applyPosition(self, topOffset > 0, CSS_SELECTOR_TOP_CENTER_RESIZE_INDICATOR, (contentBounds[UI_RES._WIDTH] - resizeIndicatorSizeWithBorder) / 2 + leftOffset, position, keyword_undefined, keyword_undefined, 'n' + UI_RES._DASH_RESIZE, TOP_CENTER, resizeRectInfos);
    applyPosition(self, bottomOffset > 0, CSS_SELECTOR_BOTTOM_CENTER_RESIZE_INDICATOR, (contentBounds[UI_RES._WIDTH] - resizeIndicatorSizeWithBorder) / 2 + leftOffset, keyword_undefined, keyword_undefined, position, 'n' + UI_RES._DASH_RESIZE, BOTTOM_CENTER, resizeRectInfos);
    if (rightOffset > 0) {
        applyPosition(self, topOffset > 0, CSS_SELECTOR_TOP_RIGHT_RESIZE_INDICATOR, keyword_undefined, position, position, keyword_undefined, 'sw' + UI_RES._DASH_RESIZE, TOP_RIGHT, resizeRectInfos);
        applyPosition(self, containerBounds[UI_RES._HEIGHT] > 0, CSS_SELECTOR_MIDDLE_RIGHT_RESIZE_INDICATOR, keyword_undefined, (contentBounds[UI_RES._HEIGHT] - resizeIndicatorSizeWithBorder) / 2 + topOffset, position, keyword_undefined, 'w' + UI_RES._DASH_RESIZE, MIDDLE_RIGHT, resizeRectInfos);
        applyPosition(self, bottomOffset > 0, CSS_SELECTOR_BOTTOM_RIGHT_RESIZE_INDICATOR, keyword_undefined, keyword_undefined, position, position, 'se' + UI_RES._DASH_RESIZE, BOTTOM_RIGHT, resizeRectInfos);
    }
    else {
        resizeIndicatorUnselect(self, CSS_SELECTOR_TOP_RIGHT_RESIZE_INDICATOR);
        resizeIndicatorUnselect(self, CSS_SELECTOR_MIDDLE_RIGHT_RESIZE_INDICATOR);
        resizeIndicatorUnselect(self, CSS_SELECTOR_BOTTOM_RIGHT_RESIZE_INDICATOR);
    }
    self._isResizeIndicatorDisplayed = true;
    self._resizeRectInfos = resizeRectInfos;
}
function applyPosition(render, apply, selector, left, top, right, bottom, cursor, direction, resizeRectInfos) {
    var self = render, $indicatorDiv = Core_1.GC$(selector, self._floatingObjectContainerDiv);
    var resizeIndicatorSize = FloatingObjectRender._resizeIndicatorSize;
    if (apply) {
        $indicatorDiv.css([UI_RES._LEFT, UI_RES._TOP, UI_RES._RIGHT, UI_RES._BOTTOM, UI_RES._WIDTH, UI_RES._HEIGHT, UI_RES._CURSOR], [left, top, right, bottom, resizeIndicatorSize, resizeIndicatorSize, cursor])
            .addClass(UI_RES._CSS_CLASS_RESIZE_INDICATOR_SELECT).attr('resizeDirection', direction);
    }
    else {
        resizeIndicatorUnselect(self, selector);
    }
    if (resizeRectInfos) {
        var $containerDiv = Core_1.GC$(self._floatingObjectContainerDiv);
        var x = 0, y = 0;
        if (!isNullOrUndefined(left)) {
            x = left;
        }
        if (!isNullOrUndefined(top)) {
            y = top;
        }
        if (!isNullOrUndefined(right)) {
            x = $containerDiv.width() - right - resizeIndicatorSize;
        }
        if (!isNullOrUndefined(bottom)) {
            y = $containerDiv.height() - bottom - resizeIndicatorSize;
        }
        var rect = new Core_1.Rect(x, y, resizeIndicatorSize, resizeIndicatorSize);
        resizeRectInfos.push({ rect: rect, cursor: cursor, direction: direction });
    }
}
function resizeIndicatorUnselect(floatingObjectRender, selector) {
    Core_1.GC$(selector, floatingObjectRender._floatingObjectContainerDiv).removeClass(UI_RES._CSS_CLASS_RESIZE_INDICATOR_SELECT).addClass(UI_RES._CSS_CLASS_RESIZE_INDICATOR_UNSELECT);
}
function hideResizeIndicator(floatingObjectRender, container) {
    Core_1.GC$(UI_RES._CSS_SELECTOR_RESIZE_INDICATOR, container).removeClass(UI_RES._CSS_CLASS_RESIZE_INDICATOR_SELECT).addClass(UI_RES._CSS_CLASS_RESIZE_INDICATOR_UNSELECT);
    floatingObjectRender._isResizeIndicatorDisplayed = false;
}
function paintImage(floatingObjectRender) {
    var self = floatingObjectRender;
    var floatingObject = self._floatingObject;
    var src = floatingObject._rotatedSrc || floatingObject.src();
    var stretch = floatingObject.pictureStretch();
    var backColor = Core_1._ThemeContext._getColor(floatingObject.sheet(), floatingObject.backColor());
    var contentDiv = self._floatingObjectContentDiv;
    if (!src || !contentDiv) {
        return;
    }
    var content = Core_1.GC$(contentDiv);
    if (self._srcCache !== src) {
        self._srcCache = src;
        content.css([UI_RES._BACKGROUND + '-image', UI_RES._BACKGROUND + '-repeat'], ['url(\'' + src + '\')', 'no-repeat']);
    }
    content.css(UI_RES._BACKGROUND + '-color', backColor);
    if (stretch === keyword_null || stretch === keyword_undefined) {
        return;
    }
    if (floatingObject._isImageLoaded) {
        var imgWidth = floatingObject.getOriginalWidth(), imgHeight = floatingObject.getOriginalHeight(), contentWidth = content[UI_RES._WIDTH](), contentHeight = content[UI_RES._HEIGHT]();
        var srcScale = floatingObject._srcScale, backgroundInfo = void 0;
        if (srcScale) {
            var width = contentWidth / srcScale.width, height = contentHeight / srcScale.height;
            var left = width * srcScale.left, top_2 = height * srcScale.top;
            backgroundInfo = {
                position: -left + 'px ' + -top_2 + 'px',
                size: width + 'px ' + height + 'px'
            };
        }
        Core_1._util._applyBackgroundImageLayout(contentDiv, contentWidth, contentHeight, imgWidth, imgHeight, stretch, backgroundInfo);
    }
}
function applyBorderStyle(floatingObjectRender, contentRect, containerRect) {
    var borderDiv = floatingObjectRender._borderDiv, floatingObject = floatingObjectRender._floatingObject, borderWidth = floatingObject.borderWidth(), borderStyle = floatingObject.borderStyle(), borderColor = Core_1._ThemeContext._getColor(floatingObject.sheet(), floatingObject.borderColor()), borderRadius = floatingObject.borderRadius(), gapSize = 0, gapStripSize = Math_floor(FloatingObjectRender._resizeIndicatorSize / 2 + 1);
    if (!_isBorderStyleWork(borderStyle) || floatingObject.noFill()) {
        borderWidth = 0;
    }
    if (borderWidth < gapStripSize) {
        gapSize = gapStripSize - borderWidth;
    }
    var left = gapSize, top = gapSize, bottom = gapSize, right = gapSize;
    gapStripSize = Math_max(borderWidth, gapStripSize);
    if (contentRect.x < 0) {
        left += contentRect.x - gapStripSize;
    }
    else {
        if (contentRect.x < gapStripSize) {
            left += contentRect.x - gapStripSize;
        }
        else {
            left += 0;
        }
        right = containerRect[UI_RES._WIDTH] - left - contentRect[UI_RES._WIDTH] - 2 - 2 * borderWidth;
    }
    if (contentRect.y < 0) {
        top += contentRect.y - gapStripSize;
    }
    else {
        if (contentRect.y < gapStripSize) {
            top += contentRect.y - gapStripSize;
        }
        else {
            top += 0;
        }
        bottom = containerRect[UI_RES._HEIGHT] - top - contentRect[UI_RES._HEIGHT] - 2 - 2 * borderWidth;
    }
    Core_1.GC$(borderDiv).css([UI_RES._POSITION, UI_RES._LEFT, UI_RES._TOP, UI_RES._BOTTOM, UI_RES._RIGHT, UI_RES._BORDER + '-width', UI_RES._BORDER + '-style', UI_RES._BORDER + '-color', UI_RES._BORDER + '-radius'], [UI_RES._ABSOLUTE, left, top, bottom, right, borderWidth, borderStyle, borderColor, borderRadius]);
}
var FloatingObjectRender = (function () {
    function FloatingObjectRender(floatingObject, sheet) {
        this._srcCache = '';
        var self = this;
        self._floatingObject = floatingObject;
        self.name = floatingObject ? floatingObject.name() : '';
        self._sheet = sheet;
        self._isMouseCapture = false;
        self._isResizeIndicatorDisplayed = false;
    }
    FloatingObjectRender.prototype._getResizeDirection = function (event ) {
        var resizeDirection = Core_1.GC$(event.target).attr('resizeDirection');
        if (resizeDirection) {
            return resizeDirection;
        }
        var offset = Core_1.GC$(this._floatingObjectContainerDiv).offset();
        var x = event.pageX - offset.left, y = event.pageY - offset.top;
        var resizeRectInfos = this._resizeRectInfos;
        if (resizeRectInfos) {
            for (var i = 0; i < resizeRectInfos.length; i++) {
                var rectInfo = resizeRectInfos[i];
                if (rectInfo.rect.contains(x, y)) {
                    return rectInfo.direction;
                }
            }
        }
    };
    FloatingObjectRender.prototype._getResizeCursor = function (event ) {
        var target = event.target;
        var resizeDirection = Core_1.GC$(target).attr('resizeDirection');
        if (resizeDirection) {
            return target.style.cursor;
        }
        var offset = Core_1.GC$(this._floatingObjectContainerDiv).offset();
        var x = event.pageX - offset.left, y = event.pageY - offset.top;
        var resizeRectInfos = this._resizeRectInfos;
        if (resizeRectInfos) {
            for (var i = 0; i < resizeRectInfos.length; i++) {
                var rectInfo = resizeRectInfos[i];
                if (rectInfo.rect.contains(x, y)) {
                    return rectInfo.cursor;
                }
            }
        }
    };
    FloatingObjectRender.prototype._doMouseDown = function (event ) {
        var self = this, sheet = self._sheet, floatingObject = self._floatingObject, commentManager = sheet._modelManager._comments, rowViewportIndex = self._rowViewportIndex, columnViewportIndex = self._columnViewportIndex;
        if (!sheet._canEditFloatingObject(floatingObject)) {
            return;
        }
        if (!sheet.endEdit()) {
            return;
        }

        sheet._setFocus(true);
        var argObj = { e: event, r: keyword_null };
        FloatingObjectRender._callFeatureHandler(self, 'preProcessMouseDown', argObj);
        if (argObj.r) {
            return;
        }

        if (event.button === 0 || event.button === 2) {
            var isSelected = floatingObject.isSelected();
            if (event.ctrlKey || event.shiftKey) {
                floatingObject.isSelected(!isSelected);
            }
            else if (!isSelected) {
                sheet._unSelectAllFloatingObjects();
                floatingObject.isSelected(true);
            }
            if (!isSelected) {
                Core_1._FocusHelper._setActiveElement(sheet);
            }

            if (commentManager) {
                commentManager._clearActiveComment();
            }
            sheet._saveAndClearSheetSelections();
            if (sheet._disposeValidationUI) {
                sheet._disposeValidationUI();
            }

            if (event.button === 2) {
                return;
            }
            var eventHandler = sheet._eventHandler, canvasOffset = sheet._getCanvasOffset();
            var resizeDirection = self._getResizeDirection(event);
            var mousePosition = new Core_1.Point(event.pageX - canvasOffset.left, event.pageY - canvasOffset.top), mouseDownHittestInfo = hitTest(self, resizeDirection);
            if (!floatingObject.allowMove() && !(floatingObject.allowResize() && !mouseDownHittestInfo.inMoving)) {
                return;
            }
            self._mousePosition = mousePosition;
            self._isMouseLeftButtonDown = true;
            self._mouseDownHittestInfo = mouseDownHittestInfo;
            if (mouseDownHittestInfo.inMoving) {
                var moveInfo = {};
                moveInfo.startTopRow = sheet.getViewportTopRow(rowViewportIndex);
                moveInfo.startLeftColumn = sheet.getViewportLeftColumn(columnViewportIndex);
                moveInfo.startX = mousePosition.x;
                moveInfo.startY = mousePosition.y;
                self._moveInfo = moveInfo;
            }
            else {
                createMoveResizeContainer(self);
                var resizeInfo = {};
                var elementBounds = getHTMLElementBounds(self._moveResizeDiv);
                resizeInfo.startX = elementBounds.x;
                resizeInfo.startY = elementBounds.y;
                resizeInfo.startWidth = elementBounds[UI_RES._WIDTH];
                resizeInfo.startHeight = elementBounds[UI_RES._HEIGHT];
                resizeInfo.startTopRow = sheet.getViewportTopRow(rowViewportIndex);
                resizeInfo.startLeftColumn = sheet.getViewportLeftColumn(columnViewportIndex);
                resizeInfo.cursor = self._getResizeCursor(event);
                resizeInfo.direction = resizeDirection;
                self._resizeInfo = resizeInfo;
            }
            handleDocumentMouseMove(self);
            var sheetHitTestInfo = sheet.hitTest(mousePosition.x, mousePosition.y);
            eventHandler._startHitInfo = {
                _scrollRowViewportIndex: sheetHitTestInfo.rowViewportIndex,
                _scrollColViewportIndex: sheetHitTestInfo.colViewportIndex,
                _hitTestType: sheetHitTestInfo.hitTestType
            };
            eventHandler._mousePosition = mousePosition;
            eventHandler._startScroll();
            eventHandler._isFloatingObjectWorking = true;
            sheet._trigger(Core_1.Events.FloatingElementSelected, { type: 'floatingObject' });
        }
        return false;
    };
    FloatingObjectRender.prototype._doMouseMove = function (event ) {
        var self = this, sheet = self._sheet, floatingObjectContainerDiv = self._floatingObjectContainerDiv, moveResizeContainerDiv = self._moveResizeContainerDiv;
        if (!sheet._canEditFloatingObject(self._floatingObject)) {
            return;
        }
        var argObj = { e: event, r: keyword_null };
        FloatingObjectRender._callFeatureHandler(self, 'preProcessMouseMove', argObj);
        if (argObj.r) {
            var cursor = argObj.cursor;
            if (cursor) {
                Core_1.GC$(floatingObjectContainerDiv).css(UI_RES._CURSOR, cursor);
            }
            return;
        }
        var floatingObject = self._floatingObject, isLocked = floatingObject.isLocked() && sheet.options.isProtected;
        Core_1.GC$(floatingObjectContainerDiv).css(UI_RES._CURSOR, (isLocked || !floatingObject.allowMove()) ? 'default' : UI_RES._MOVE);
        if (sheet._isMouseDownInSheet) {
            if (floatingObjectContainerDiv) {
                Core_1.GC$(floatingObjectContainerDiv).css(UI_RES._CURSOR, 'default');
            }
            return true;
        }
        var eventHandler = sheet._eventHandler, canvasOffset = sheet._getCanvasOffset();
        var point = new Core_1.Point(event.pageX - canvasOffset.left, event.pageY - canvasOffset.top);
        if (self._isMouseLeftButtonDown) {
            if (self._mouseDownHittestInfo.inMoving) {
                self._isMoving = true;
                createMoveResizeContainer(self);
                doMoveContainer(self, self._mousePosition, point);
                Core_1.GC$(moveResizeContainerDiv).css(UI_RES._CURSOR, UI_RES._MOVE);
            }
            else if (self._floatingObject.allowResize()) {
                self._isResizing = true;
                doResizeContainer(self);
                Core_1.GC$(moveResizeContainerDiv).css(UI_RES._CURSOR, self._resizeInfo[UI_RES._CURSOR]);
            }
            if (self._isMoving || self._isResizing) {
                self._mousePosition = point;
                eventHandler._mousePosition = point;
                eventHandler._continueScroll();
                Core_1.GC$(DOCUMENT.body).addClass(UI_RES._CSS_CLASS_NONE_USER_SELECT)
                    .attr(UI_RES._UNSELECTABLE, UI_RES._ON);
            }
        }
        else {
            var workbook = sheet.parent;
            if (workbook.options.enableAccessibility) {
                workbook._updateAccessibilityContent(floatingObject.alt());
            }
        }
        return false;
    };
    FloatingObjectRender.prototype._doMouseUp = function (event ) {
        var self = this, sheet = self._sheet, eventHandler = sheet._eventHandler, floatingObject = self._floatingObject, floatingObjectContainerDiv = self._floatingObjectContainerDiv, mouseDownHittestInfo = self._mouseDownHittestInfo;
        if (!sheet._canEditFloatingObject(floatingObject)) {
            return;
        }
        var argObj = { e: event, r: keyword_null };
        FloatingObjectRender._callFeatureHandler(self, 'preProcessMouseUp', argObj);
        if (argObj.r) {
            return;
        }
        if (sheet._isMouseDownInSheet) {
            Core_1.GC$(floatingObjectContainerDiv).css(UI_RES._CURSOR, UI_RES._MOVE);
            return true;
        }
        eventHandler._isFloatingObjectWorking = false;
        eventHandler._stopScroll();
        var canvasOffset = sheet._getCanvasOffset();
        var point = new Core_1.Point(event.pageX - canvasOffset.left, event.pageY - canvasOffset.top);
        var moveInfo = self._moveInfo;
        if (moveInfo) {
            moveInfo.endX = point.x;
            moveInfo.endY = point.y;
        }
        if (mouseDownHittestInfo) {
            var fixedPosition = floatingObject.fixedPosition();
            if (mouseDownHittestInfo.inMoving && self._isMoving) {
                if (fixedPosition) {
                    adjustMoveInfo(self);
                }
                if (event.ctrlKey) {
                    doCopyFloatingObject(self);
                }
                else {
                    doMoveFloatingObject(self);
                }
            }
            else if (self._isResizing) {
                if (fixedPosition) {
                    adjustResizeInfo(self);
                }
                doResizeFloatingObject(self);
            }
            Core_1.GC$(DOCUMENT.body).removeClass(UI_RES._CSS_CLASS_NONE_USER_SELECT);
        }
        self._resetStatusOnMouseUp();
        return false;
    };
    FloatingObjectRender.prototype._resetStatusOnMouseUp = function () {
        var self = this;
        self._resizeInfo = keyword_null;
        self._moveInfo = keyword_null;
        self._attachedMoveResizeDivDict = keyword_null;
        Core_1.GC$(self._moveResizeContainerDiv).remove();
        self._moveResizeDiv = keyword_null;
        self._isMouseLeftButtonDown = false;
        unhandleDocumentMouseMove(self);
        self._isMoving = false;
        self._isResizing = false;
    };
    FloatingObjectRender.prototype._render = function (containerRect, contentRect) {
        var self = this, floatingObject = self._floatingObject, sheet = self._sheet;
        if (!floatingObject) {
            return;
        }
        var isFloatingObjectCreate = false;
        self._rect = containerRect;
        var containerDiv = self._floatingObjectContainerDiv;
        if (!containerDiv) {
            if (containerRect.width <= 0 || containerRect.height <= 0) {
                return;
            }
            containerDiv = self._floatingObjectContainerDiv = createFloatingObjectContainer(self);
            syncFloatingObjectZIndex(floatingObject, containerDiv);
            var workbook = sheet.parent;
            if (workbook) {
                var workbookContainerDiv = self._containerDiv = workbook._getContainerDiv();
                if (workbookContainerDiv) {
                    Core_1.GC$(workbookContainerDiv).append(containerDiv);
                }
            }
        }
        var contentDiv = self._floatingObjectContentDiv;

        if (!contentDiv) {
            contentDiv = self._floatingObjectContentDiv = floatingObject._createContentContainer(self._rowViewportIndex, self._columnViewportIndex);

            if (floatingObject.typeName === '1' ) {
                self._borderDiv = createElement(UI_RES._DIV);
                Core_1.GC$(self._borderDiv).addClass(UI_RES._CSS_CLASS_NONE_USER_SELECT + ' ' + UI_RES._CSS_CLASS_FLOATINGOBJECT_CONTENT_CONTAINER)
                    .attr(UI_RES._UNSELECTABLE, UI_RES._ON);
                containerDiv.appendChild(self._borderDiv);
                self._borderDiv.appendChild(contentDiv);
            }
            else {
                containerDiv.appendChild(contentDiv);
                isFloatingObjectCreate = true;
            }
        }
        if (self._borderDiv) {
            applyBorderStyle(self, contentRect, containerRect);
            contentRect.x = 0;
            contentRect.y = 0;
        }
        var $content = Core_1.GC$(contentDiv);
        Core_1.GC$(containerDiv).css([UI_RES._TOP, UI_RES._LEFT, UI_RES._WIDTH, UI_RES._HEIGHT], [containerRect.y, containerRect.x, containerRect[UI_RES._WIDTH], containerRect[UI_RES._HEIGHT]]);
        $content.css([UI_RES._TOP, UI_RES._LEFT, UI_RES._WIDTH, UI_RES._HEIGHT], [contentRect.y, contentRect.x, contentRect[UI_RES._WIDTH], contentRect[UI_RES._HEIGHT]]);
        self._containerRect = containerRect;
        if (floatingObject.refreshContent) {
            floatingObject.refreshContent(contentDiv);
        }
        if (self._borderDiv) {
            paintImage(self);
        }
        if (floatingObject.isSelected()) {
            $content.removeClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_UNSELECTED).addClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_SELECTED);
            if (floatingObject.allowResize()) {
                showResizeIndicator(self, containerDiv);
            }
            else if (self._isResizeIndicatorDisplayed) {
                hideResizeIndicator(self, containerDiv);
            }
        }
        else {
            $content.removeClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_SELECTED).addClass(UI_RES._CSS_CLASS_FLOATINGOBJECT_UNSELECTED);
            hideResizeIndicator(self, containerDiv);
        }
        if (isFloatingObjectCreate) {
            var element = contentDiv.firstChild;
            sheet._trigger(Core_1.Events.FloatingObjectLoaded, {
                sheet: sheet,
                sheetName: sheet.name(),
                floatingObject: floatingObject,
                element: element
            });
        }
    };
    FloatingObjectRender.prototype._dispose = function () {
        var self = this, floatingObject = self._floatingObject, floatingObjectContainerDiv = self._floatingObjectContainerDiv, moveResizeContainerDiv = self._moveResizeContainerDiv, contentContainerDiv = self._floatingObjectContentDiv;
        FloatingObjectRender._callFeatureHandler(self, 'dispose');
        if (contentContainerDiv && floatingObject._removeContainer) {
            floatingObject._removeContainer(contentContainerDiv);
            floatingObject._dispose(false);
        }
        if (floatingObjectContainerDiv) {
            Core_1.GC$(floatingObjectContainerDiv).remove();
            self._floatingObjectContainerDiv = keyword_null;
        }
        if (moveResizeContainerDiv) {
            Core_1.GC$(moveResizeContainerDiv).remove();
            self._moveResizeContainerDiv = keyword_null;
        }
    };
    FloatingObjectRender._resizeIndicatorSize = 7;
    return FloatingObjectRender;
}());
exports.FloatingObjectRender = FloatingObjectRender;
Core_1._defineFeature(FloatingObjectRender);
function updateFloatingsObjectlayoutOnColumnRowChanged(floatingobjectModel) {
    floatingobjectModel._all().forEach(function (item) {
        if (item.dynamicMove()) {
            updateFloatingObjectLocation(item);
        }
        else {
            updateStartPosition(item);
        }
        if (item.dynamicSize()) {
            updateFloatingObjectSize(item);
        }
        else {
            updateEndPosition(item);
        }
    });
}
function rendeManagerGetViewportRect(floatingObjectRenderManager, rowViewportIndex, columnViewportIndex) {
    var sheet = floatingObjectRenderManager._sheet, columnLayout = sheet._getViewportColumnLayout(columnViewportIndex), x = 0, y = 0, width = 0, height = 0;
    if (columnLayout && columnLayout.length > 0) {
        var firstColumnLayout = columnLayout[0], lastColumnLayout = columnLayout[columnLayout.length - 1];
        x = firstColumnLayout.x;
        width = lastColumnLayout.x + lastColumnLayout[UI_RES._WIDTH] - x;
    }
    var rowLayout = sheet._getViewportRowLayout(rowViewportIndex);
    if (rowLayout && rowLayout.length > 0) {
        var firstRowLayout = rowLayout[0], lastRowLayout = rowLayout[rowLayout.length - 1];
        y = firstRowLayout.y;
        height = lastRowLayout.y + lastRowLayout[UI_RES._HEIGHT] - y;
    }
    var layout = sheet._getSheetLayout();
    var rect = layout._viewportRect(rowViewportIndex, columnViewportIndex);
    return rect.getIntersect(x, y, width, height) || new Core_1.Rect(0, 0, 0, 0);
}
function createViewportFloatingObjectLayoutModel(floatingObjectRenderManager, rowViewportIndex, columnViewportIndex, zoomFactor) {
    var self = floatingObjectRenderManager, sheet = self._sheet;
    var model = new NamedObjectArray();
    var floatingObjectModel = sheet._floatingObjectModel;
    if (floatingObjectModel.isNeedToUpdateLayout) {
        updateFloatingsObjectlayoutOnColumnRowChanged(floatingObjectModel);
        floatingObjectModel.isNeedToUpdateLayout = false;
    }
    var sheetLayout = sheet._getSheetLayout(), cachePool = sheet._cachePool, colLayouts = sheet._getViewportColumnLayout(columnViewportIndex), rowLayouts = sheet._getViewportRowLayout(rowViewportIndex);
    if (colLayouts.length <= 0 || rowLayouts.length <= 0) {
        return model;
    }
    var viewportLeftColLayout = colLayouts[0], viewportRightColLayout = colLayouts[colLayouts.length - 1], viewportTopRowLayout = rowLayouts[0], viewportBottomRowLayout = rowLayouts[rowLayouts.length - 1];
    floatingObjectModel._all().forEach(function (item) {
        if (item && item.isVisible()) {
            var x = void 0, y = void 0;
            var startRow = item[UI_RES._START_ROW](), startColumn = item[UI_RES._START_COLUMN](), endRow = item[UI_RES._END_ROW](), endColumn = item[UI_RES._END_COLUMN]();
            if (item.fixedPosition()) {
                var position = item.position();
                x = position.x * zoomFactor + sheetLayout._frozenX;
                y = position.y * zoomFactor + sheetLayout._frozenY;
            }
            else {
                var startColumnLayout = colLayouts.findCol(startColumn);
                if (startColumnLayout) {
                    x = startColumnLayout.x;
                }
                else if (startColumn < viewportLeftColLayout.col) {
                    x = viewportLeftColLayout.x;
                    for (var c = viewportLeftColLayout.col - 1; c >= startColumn; c--) {
                        x -= cachePool._getZoomColWidth(c);
                    }
                }
                else {
                    x = viewportRightColLayout.x + viewportRightColLayout[UI_RES._WIDTH];
                    for (var col = viewportRightColLayout.col + 1; col <= startColumn; col++) {
                        x += cachePool._getZoomColWidth(col);
                    }
                }
                x += item[UI_RES._START_COLUMN_OFFSET]() * zoomFactor;
                var startRowLayout = rowLayouts.findRow(startRow);
                if (startRowLayout) {
                    y = startRowLayout.y;
                }
                else if (startRow < viewportTopRowLayout.row) {
                    y = viewportTopRowLayout.y;
                    for (var r = viewportTopRowLayout.row - 1; r >= startRow; r--) {
                        y -= cachePool._getZoomRowHeight(r);
                    }
                }
                else {
                    y = viewportBottomRowLayout.y + viewportBottomRowLayout[UI_RES._HEIGHT];
                    for (var row = viewportBottomRowLayout.row + 1; row <= startRow; row++) {
                        y += cachePool._getZoomRowHeight(row);
                    }
                }
                y += item[UI_RES._START_ROW_OFFSET]() * zoomFactor;
            }
            var width = void 0, height = void 0;


            width = item._getZoomWidth(zoomFactor);
            height = item._getZoomHeight(zoomFactor);


            if (!isHiddenByGroup(sheet, startRow, startColumn, endRow, endColumn)) {
                model.push({ name: item.name(), x: x, y: y, width: width, height: height });
            }
        }
    });
    return model;
}
function isHiddenByGroup(sheet, startRow, startCol, endRow, endCol) {
    var isHiddenByRowOutlines, isHiddenByColumnOutlines, i;
    if (sheet.rowOutlines) {
        isHiddenByRowOutlines = true;
        for (i = startRow; i <= endRow; i++) {
            if (!sheet.rowOutlines.isCollapsed(i)) {
                isHiddenByRowOutlines = false;
                break;
            }
        }
    }
    if (sheet.columnOutlines) {
        isHiddenByColumnOutlines = true;
        for (i = startCol; i <= endCol; i++) {
            if (!sheet.columnOutlines.isCollapsed(i)) {
                isHiddenByColumnOutlines = false;
                break;
            }
        }
    }
    return isHiddenByRowOutlines || isHiddenByColumnOutlines;
}
var FloatingObjectRenderManager = (function () {
    function FloatingObjectRenderManager(sheet) {
        this._sheet = sheet;

        this._renders = new NamedObjectArray();
    }
    FloatingObjectRenderManager.prototype._dispose = function () {
        var renders = this._renders;
        renders.each(function (e) {
            e._dispose();
        });
        renders.empty();
        this._sheet = keyword_null;
    };
    FloatingObjectRenderManager.prototype._render = function (rowViewportIndex, columnViewportIndex, zoomFactor) {
        if (rowViewportIndex < 0 || columnViewportIndex < 0) {
            return;
        }
        var self = this, sheet = self._sheet, renders = self._renders, floatingObjectModel = sheet._floatingObjectModel;
        var floatingObjectLayoutModel = createViewportFloatingObjectLayoutModel(self, rowViewportIndex, columnViewportIndex, zoomFactor);
        var willRemoveRenders = [];
        renders.each(function (ele) {
            if (!floatingObjectLayoutModel.find(ele.name)) {
                willRemoveRenders.push(ele);
            }
        });
        var i, len = willRemoveRenders.length;
        for (i = 0; i < len; i++) {
            var render = willRemoveRenders[i];
            render._renderManager = keyword_null;
            renders.remove(render.name);
            render._dispose();
        }
        var useTouchLayout = sheet.parent && sheet.parent.options.useTouchLayout;
        FloatingObjectRender._resizeIndicatorSize = useTouchLayout ? 11 : 7;
        floatingObjectLayoutModel.each(function (layout) {
            var floatingObject = floatingObjectModel._get(layout.name), visibleGapSize = Math_floor(FloatingObjectRender._resizeIndicatorSize / 2 + 1);
            if (floatingObject && floatingObject.typeName === '1' ) {
                var borderWidth = floatingObject.borderWidth(), borderStyle = floatingObject.borderStyle();
                if (!_isBorderStyleWork(borderStyle)) {
                    borderWidth = 0;
                }
                if (borderWidth > visibleGapSize) {
                    visibleGapSize = borderWidth;
                }
            }
            var viewportRect = rendeManagerGetViewportRect(self, rowViewportIndex, columnViewportIndex);
            var contentDivBorderWidth = 1;

            var left = layout.x - visibleGapSize - contentDivBorderWidth;
            var top = layout.y - visibleGapSize - contentDivBorderWidth;
            var width = layout[UI_RES._WIDTH] + 2 * visibleGapSize + 2 * contentDivBorderWidth;
            var height = layout[UI_RES._HEIGHT] + 2 * visibleGapSize + 2 * contentDivBorderWidth;

            var outContainerTop = Math_max(viewportRect.y, top);
            var outContainerLeft = Math_max(viewportRect.x, left);
            var outContainerHeight = height;
            var outContainerWidth = width;
            var topOffset = visibleGapSize;
            var leftOffset = visibleGapSize;
            var minusGapSize = -1 * visibleGapSize - contentDivBorderWidth;
            topOffset = top - outContainerTop + topOffset;
            leftOffset = left - outContainerLeft + leftOffset;
            if (topOffset <= 0) {
                outContainerHeight += topOffset;
                outContainerHeight += minusGapSize;
            }
            else if (topOffset < visibleGapSize && topOffset > 0) {
                outContainerHeight -= (visibleGapSize - topOffset);
            }
            if (leftOffset <= 0) {
                outContainerWidth += leftOffset;
                outContainerWidth += minusGapSize;
            }
            else if (leftOffset < visibleGapSize && leftOffset > 0) {
                outContainerWidth -= (visibleGapSize - leftOffset);
            }
            var container = renders.find(layout.name);
            if (!container) {
                container = new FloatingObjectRender(floatingObjectModel._get(layout.name), sheet);
                container._renderManager = self;
                renders.push(container);
            }
            container._layout = layout;
            container._rowViewportIndex = rowViewportIndex;
            container._columnViewportIndex = columnViewportIndex;
            var clipRect = new Core_1.Rect(viewportRect.x, viewportRect.y, viewportRect[UI_RES._WIDTH], viewportRect[UI_RES._HEIGHT]);
            container._render(new Core_1.Rect(outContainerLeft, outContainerTop, outContainerWidth, outContainerHeight).getIntersectRect(clipRect) || new Core_1.Rect(outContainerLeft, outContainerTop, 0, 0), new Core_1.Rect(leftOffset, topOffset, layout[UI_RES._WIDTH], layout[UI_RES._HEIGHT]));
        });
    };
    return FloatingObjectRenderManager;
}());
var adapter = {

    init: function () {
        var sheet = this;
        var floatingObjectListeners = sheet._floatingObjectListeners = [];
        sheet._onAddFloatingObject = function (floatingObject) {
            floatingObjectListeners.forEach(function (item) {
                item._onAddItem && item._onAddItem(floatingObject);
            });
        };
        sheet._floatingObjectModel = sheet._modelManager._floatingObjectModel;


        sheet.pictures = new FloatingObjectCollection(sheet, '1' );


        sheet.floatingObjects = new FloatingObjectCollection(sheet, '0' );
    },

    dispose: function (argus) {
        var self = this;
        disposeFloatingObjectUI(self, argus.clearCache);
        if (self._floatingObjectModel) {
            Core_1.GC$.each(self._floatingObjectModel._all(), function (index, floatingObject) {
                floatingObject._dispose(argus.clearCache);
            });
        }

        if (argus.clearCache !== false) {
            if (self.pictures) {
                self.pictures._dispose();
                self.pictures = keyword_null;
            }
            if (self.floatingObjects) {
                self.floatingObjects._dispose();
                self.floatingObjects = keyword_null;
            }
            self._paintFloatingObject = keyword_null;
            self._onAddFloatingObject = keyword_null;
            self._getFloatingObjectRenderManager = keyword_null;
        }
        self.unbind(Core_1.Events.TableFiltered + UI_RES._NS);
        self.unbind(Core_1.Events.RangeFiltered + UI_RES._NS);
        self.unbind(Core_1.Events.FloatingElementSelected + UI_RES._NS);
    },
    setHost: function (host) {
        if (!host) {
            return;
        }
        var self = this;


        self.bind(Core_1.Events.TableFiltered + UI_RES._NS, function () {
            self._refreshObjectsAboveSheet();
        });
        self.bind(Core_1.Events.RangeFiltered + UI_RES._NS, function () {
            self._refreshObjectsAboveSheet();
        });
        self.bind(Core_1.Events.FloatingElementSelected + UI_RES._NS, function (event, data) {
            if (data.type !== 'floatingObject') {
                self._unSelectAllFloatingObjects();
            }
        });
    },
    onLayoutChanged: function (e) {
        var changeType = e.changeType;
        var row = e.row;
        var rowCount = e.rowCount;
        var col = e.col;
        var colCount = e.colCount;
        var floatingObjectModel = this._floatingObjectModel;
        if (changeType === 'addRows') {
            addRows(floatingObjectModel, row, rowCount);
        }
        else if (changeType === 'deleteRows') {
            removeRows(floatingObjectModel, row, rowCount);
        }
        else if (changeType === 'addColumns') {
            addColumns(floatingObjectModel, col, colCount);
        }
        else if (changeType === 'deleteColumns') {
            removeColumns(floatingObjectModel, col, colCount);
        }
    },
    paint: function (e) {
        var self = this;
        var clipRect = e.clipRect;
        self._paintFloatingObject(clipRect);
    },
    lastNonNullRowAndCol: function () {
        var lastNonNullRow = 0, lastNonNullCol = 0;
        var floatingObjectModel = this._floatingObjectModel;
        if (floatingObjectModel) {
            floatingObjectModel._all().forEach(function (fo) {
                if (fo) {
                    if (fo[UI_RES._END_ROW]() > lastNonNullRow) {
                        lastNonNullRow = fo[UI_RES._END_ROW]();
                    }
                    if (fo[UI_RES._END_COLUMN]() > lastNonNullCol) {
                        lastNonNullCol = fo[UI_RES._END_COLUMN]();
                    }
                }
            });
        }
        return {
            lastNonNullRow: lastNonNullRow, lastNonNullCol: lastNonNullCol
        };
    },
    toJson: function (data, serializationOption) {
        var ignoreStyle = serializationOption && serializationOption.ignoreStyle;
        if (ignoreStyle) {
            return;
        }
        var floatingObjects = this._floatingObjectModel.toJSON();
        if (floatingObjects.length > 0) {
            data.floatingObjects = floatingObjects;
        }
    },
    fromJson: function (data, noSchema, deserializationOptions) {
        var ignoreStyle = deserializationOptions && deserializationOptions.ignoreStyle;
        if (ignoreStyle) {
            return;
        }
        var self = this;
        self._floatingObjectModel = new FloatingObjectModel(self);
        self._modelManager._floatingObjectModel = self._floatingObjectModel;
        var floatingObjectArray = data && data.floatingObjectArray;
        var state = noSchema ? (floatingObjectArray && floatingObjectArray.floatingObjects) : data.floatingObjects;
        if (state) {
            self._floatingObjectModel.fromJSON(state, noSchema);
        }
    },
    preProcessMouseDown: function (eventArgus) {
        var e = eventArgus.e;
        var t = this._getCanvasOffset();
        var x = e.pageX - t.left, y = e.pageY - t.top;
        if (!this._formulaTextBox && this._formulaTextBoxForChart) {
            var target = this.hitTest(x, y);
            var frInfo = target && target.formulaRangeHitInfo;
            if (frInfo && (frInfo.inBorder || frInfo.inTopLeft || frInfo.inTopRight || frInfo.inBottomLeft || frInfo.inBottomRight)) {
                return;
            }
        }
        this._unSelectAllFloatingObjects();
    },
    processKeyDown: function (argObj) {
        var floatingObjectModel = this._floatingObjectModel;
        if (floatingObjectModel) {
            var floatingObjects = floatingObjectModel._all();
            var i = void 0, length_1 = floatingObjects.length;
            for (i = 0; i < length_1; i++) {
                var item = floatingObjects[i];
                if (item.isSelected()) {
                    argObj.r = true;
                    return;
                }
            }
        }
    },
    onGroupChanged: function (args) {
        this.floatingObjects._onGroupChanged(args.start, args.end, args.isRow);
        this.pictures._onGroupChanged(args.start, args.end, args.isRow);
    }
};
Core_1.Worksheet._registerFeature(UI_RES._FLOATING_OBJECTS, adapter);
var ssAdapter = {
    init: function () {
        Core_1.Commands._initFloatingObjectsDefaultCommands(this.commandManager());
    },
    onCommandExecuting: function (worksheet) {
        var floatingObjects = worksheet._floatingObjectModel._all();
        floatingObjects.forEach(function (floatingObject) {
            floatingObject.isSelected(false);
        });
    },
    onCultureChanged: function () {
        getSR();
    }
};
Core_1.Workbook._registerFeature(UI_RES._FLOATING_OBJECTS, ssAdapter);
Core_1.GC$.extend(Core_1._SheetModelManager.prototype, {
    _saveFloatingObjectPropertyChange: function (floatingObject, name, value) {
        var changes = this._changes;
        if (changes) {
            var floatingObjectChanges = changes._floatingObjectChanges;
            if (!floatingObjectChanges) {
                floatingObjectChanges = changes._floatingObjectChanges = [];
            }
            floatingObjectChanges.push({
                type: 'property',
                floatingObject: floatingObject,
                name: name,
                value: value
            });
        }
    },
    _saveFloatingObjectCollectionChange: function () {
        var changes = this._changes;
        if (changes) {
            var floatingObjectChanges = changes._floatingObjectChanges;
            if (!floatingObjectChanges) {
                floatingObjectChanges = changes._floatingObjectChanges = [];
            }
            var floatingObjects_1 = {};
            var floatingObjectModel = this._floatingObjectModel;
            Core_1.GC$.each(floatingObjectModel._storage, function (name, floatingObject) {
                floatingObjects_1[name] = floatingObject;
            });
            floatingObjectChanges.push({ type: 'collection', floatingObjects: floatingObjects_1 });
        }
    },
    _restoreFloatingObjects: function (floatingObjectChanges) {
        if (floatingObjectChanges) {
            var floatingObjectModel = this._floatingObjectModel;
            for (var i = floatingObjectChanges.length - 1; i >= 0; i--) {
                var change = floatingObjectChanges[i];
                if (change.type === 'collection') {
                    floatingObjectModel._storage = change.floatingObjects;
                }
                else if (change.type === 'property') {
                    var locationSizeArray = ['startRow', 'startRowOffset', 'startColumn', 'startColumnOffset', 'endRow', 'endRowOffset', 'endColumn', 'endColumnOffset'];
                    var floatingObject = change.floatingObject, propertyName = change.name, propertyValue = change.value;
                    floatingObject[propertyName](propertyValue);


                    if (locationSizeArray.indexOf(propertyName) >= 0) {
                        updateFloatingObjectLocation(floatingObject);
                        updateFloatingObjectSize(floatingObject);
                        floatingObject.sheet()._invalidate();
                    }
                }
            }
        }
    }
});
Core_1._SheetModelManager._registerFeature(UI_RES._FLOATING_OBJECTS, {
    init: function () {
        this._floatingObjectModel = new FloatingObjectModel(this._sheet);
    },
    undo: function (changes) {
        var floatingObjectChanges = changes._floatingObjectChanges;
        if (floatingObjectChanges) {
            this._restoreFloatingObjects(floatingObjectChanges);
        }
    },
    dispose: function (args) {
        var self = this, clearCache = args && args.clearCache;
        if (clearCache !== false) {
            if (self._floatingObjectModel) {
                self._floatingObjectModel._dispose();
                self._floatingObjectModel = keyword_null;
            }
        }
    }
});
/***/ }),

/***/ './dist/plugins/floatingObject/floatingobject.ns.js':
/*!**********************************************************!*\
  !*** ./dist/plugins/floatingObject/floatingobject.ns.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var en = __webpack_require__(/*! ./floatingobject.res.en */ './dist/plugins/floatingObject/floatingobject.res.en.js');
exports.SR = {
    en: en
};
/***/ }),

/***/ './dist/plugins/floatingObject/floatingobject.res.en.js':
/*!**************************************************************!*\
  !*** ./dist/plugins/floatingObject/floatingobject.res.en.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_FloatingObjectHasSameNameError = 'The current worksheet already has a floating object with the same name.';
exports.Exp_FloatingObjectNameEmptyError = 'Floating object must have name';
/***/ }),

/***/ './dist/plugins/floatingObject/picture.js':
/*!************************************************!*\
  !*** ./dist/plugins/floatingObject/picture.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var floatingobject_1 = __webpack_require__(/*! ./floatingobject */ './dist/plugins/floatingObject/floatingobject.js');
var createElement = Core_1._util._createElement, defProperty = Core_1._util._defProperty;
var $ = Core_1.GC$;
var keyword_null = null, keyword_undefined = void 0;
var SRC = 'src', BACK_COLOR = 'backColor', PICTURE_STRETCH = 'pictureStretch', BORDER_RADIUS = 'borderRadius', BORDER_WIDTH = 'borderWidth', BORDER_STYLE = 'borderStyle', BORDER_COLOR = 'borderColor', BORDER_NOFILL = 'noFill';
var ps = [SRC, BACK_COLOR, BORDER_RADIUS, BORDER_WIDTH, BORDER_STYLE, BORDER_NOFILL, BORDER_COLOR, PICTURE_STRETCH];
function isValidNumber(v) {
    return typeof v === 'number' && !isNaN(v);
}
floatingobject_1.FloatingObject._getPictureInstance = function (name, src, x, y, width, height) {
    return new Picture(name, src, x, y, width, height);
};
var Picture = (function (_super) {
    __extends(Picture, _super);


    function Picture(name, src, x, y, width, height) {
        var _this = _super.call(this, name, x, y, width, height) || this;
        var self = _this;
        self.typeName = '1' ;
        self._kind = '1' ;
        self._imageLoader = keyword_null;
        self._isImageLoaded = false;
        self._isTakeOriginalSize = false;
        if (typeof src === 'string') {
            self._isTakeOriginalSize = !(isValidNumber(width) && isValidNumber(height));
            self.src(src);
        }
        return _this;
    }
    Picture.prototype.onPropertyChanged = function (name, value, oldValue) {
        var self = this;
        if (self._loading) {
            return;
        }
        var sheet = self.sheet();
        if (sheet) {
            sheet._modelManager._saveFloatingObjectPropertyChange(self, name, oldValue);
            this._trigger({
                sheet: sheet,
                sheetName: sheet.name(),
                picture: self,
                propertyName: name
            });
        }
    };
    Picture.prototype.toJSON = function () {
        var self = this;
        var jsData = _super.prototype.toJSON.call(this);
        floatingobject_1.toJsonFn.call(self, ps, jsData);
        jsData.originalWidth = self.getOriginalWidth();
        jsData.originalHeight = self.getOriginalHeight();
        if (self._rot) {
            jsData.rot = self._rot;
        }
        var srcScale = self._srcScale;
        if (srcScale) {
            var left = srcScale.left, top_1 = srcScale.top;
            jsData.srcRect = {
                l: left,
                t: top_1,
                r: 1 - left - srcScale.width,
                b: 1 - top_1 - srcScale.height
            };
        }
        delete jsData.content;
        return jsData;
    };
    Picture.prototype.fromJSON = function (jsData , noSchema, isPrintingWorkbook) {
        if (!jsData) {
            return;
        }
        var self = this;
        self._loading = true;


        if (isPrintingWorkbook) {
            var noNeedToRecalcPictrueSize = isValidNumber(jsData.x) && isValidNumber(jsData.y) && isValidNumber(jsData.width) && isValidNumber(jsData.height);
            if (noNeedToRecalcPictrueSize) {
                jsData.endRow = null;
                jsData.endRowOffset = null;
                jsData.endColumn = null;
                jsData.endColumnOffset = null;
            }
        }
        _super.prototype.fromJSON.call(this, jsData, noSchema);
        floatingobject_1.fromJsonFn.call(self, ps, jsData, noSchema);
        if (jsData.rot) {
            self._rot = jsData.rot;
        }
        self._isImageLoaded = false;
        var srcRect = jsData.srcRect;
        if (srcRect) {
            var left = srcRect.l, top_2 = srcRect.t;
            self._srcScale = {
                left: left,
                top: top_2,
                width: 1 - left - srcRect.r,
                height: 1 - top_2 - srcRect.b
            };
        }
        loadImage(self);
        self._loading = keyword_undefined;
    };
    Picture.prototype.clone = function () {
        var picture = new Picture();
        var jsonString = JSON.stringify(this.toJSON());
        picture.fromJSON(JSON.parse(jsonString));
        return picture;
    };


    Picture.prototype.getOriginalWidth = function () {
        return this._originalWidth;
    };


    Picture.prototype.getOriginalHeight = function () {
        return this._originalHeight;
    };
    Picture.prototype._isBorderStyleWork = function (style) {
        var borderStyles = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
        return borderStyles.indexOf(style) >= 0;
    };
    Picture.prototype._createContentContainer = function (rowViewportIndex, columnViewportIndex) {
        var contentContainer = createElement('div');
        $(contentContainer).addClass('gc-floatingobject-content-container')
            .addClass('gc-no-user-select')
            .attr('unselectable', 'on')
            .css('position', 'absolute');
        this._addContainer(contentContainer, rowViewportIndex, columnViewportIndex);
        return contentContainer;
    };
    Picture.prototype._trigger = function (args ) {
        var sheet = this.sheet();
        if (sheet) {
            sheet._trigger(Core_1.Events.PictureChanged, args);
            if (args.propertyName === 'isSelected') {
                var selectionArgs = {
                    sheet: args.sheet,
                    sheetName: args.sheetName,
                    picture: args.picture
                };
                sheet._trigger(Core_1.Events.PictureSelectionChanged, selectionArgs);
            }
        }
    };
    Picture.prototype._dispose = function (clearCache) {
        var self = this;
        if (self._imageLoader && clearCache !== false) {
            self._imageLoader._dispose();
            self._imageLoader = keyword_null;
        }
    };
    return Picture;
}(floatingobject_1.FloatingObject));
exports.Picture = Picture;
function loadImage(picture) {
    var self = picture, src = self.src(), sheet = self.sheet();
    if (!self._imageLoader) {
        self._imageLoader = new Core_1._ImageLoader(function () {
            loadImage(self);
        });
    }
    var imageLoader = self._imageLoader;
    try {
        if (imageLoader._getState(src)) {
            self._isImageLoaded = true;
            var img = imageLoader._getImage(src);
            self._originalWidth = img.width;
            self._originalHeight = img.height;
            if (self._rot && self._rot % 90 === 0) {
                self._rotatedSrc = generateRotatedSrc(img, img.width, img.height, self._rot);
            }
            if (self._isTakeOriginalSize) {
                self.width(img.width, true);
                self.height(img.height, true);
                self._isTakeOriginalSize = false;
            }


            self._trigger({
                sheet: sheet,
                sheetName: sheet.name(),
                picture: self,
                propertyName: 'originalSize'
            });
            if (self.isVisible()) {
                sheet && sheet.repaint();
            }
        }
        else {
            imageLoader._addImage(src);
        }
    }
    catch (ex) {

    }
}
function generateRotatedSrc(img, width, height, rot) {
    var canvasWidth = width, canvasHeight = height;
    if (rot === 90 || rot === 270) {
        canvasWidth = height;
        canvasHeight = width;
    }
    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate(rot / 180 * Math.PI);
    ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
    ctx.drawImage(img, 0, 0, width, height, (canvasWidth - width) / 2, (canvasHeight - height) / 2, width, height);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return canvas.toDataURL();
}
var propertiesInfo = [
    [SRC, keyword_undefined, function (value, oldValue) {
            var self = this;

            self._isImageLoaded = false;
            loadImage(self);
            if (!self.srccallback) {
                self.srccallback = floatingobject_1.propertyRefreshCallback(SRC);
            }
            self.srccallback.call(self, value, oldValue);
        }],
    [BACK_COLOR, keyword_null, floatingobject_1.propertyRefreshCallback(BACK_COLOR)],
    [BORDER_RADIUS, -1, floatingobject_1.propertyRefreshCallback(BORDER_RADIUS), isValidNumber],
    [BORDER_WIDTH, 1, floatingobject_1.propertyRefreshCallback(BORDER_WIDTH), isValidNumber],
    [BORDER_STYLE, 'none', function (value, oldValue) {
            var self = this;
            if (!self._isBorderStyleWork(value)) {
                self.borderWidth(0);
            }
            if (!self.bscallback) {
                self.bscallback = floatingobject_1.propertyRefreshCallback(BORDER_STYLE);
            }
            self.bscallback.call(self, value, oldValue);
        }],
    [BORDER_NOFILL, keyword_undefined],
    [BORDER_COLOR, keyword_null, floatingobject_1.propertyRefreshCallback(BORDER_COLOR)],
    [PICTURE_STRETCH, 0, floatingobject_1.propertyRefreshCallback(PICTURE_STRETCH)]
];
var proto = Picture.prototype;
$.each(propertiesInfo, function (p, v) {
    proto[v[0]] = defProperty(v[0], v[1], v[2], v[3]);
});
/***/ }),

/***/ './node_modules/process/browser.js':
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {
var process = module.exports = {};


var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ());
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    }

    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
    }

    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};


function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = '';
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return []; };

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/'; };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };
/***/ }),

/***/ './node_modules/util/node_modules/inherits/inherits_browser.js':
/*!*********************************************************************!*\
  !*** ./node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {
if (typeof Object.create === 'function') {
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
/***/ }),

/***/ './node_modules/util/support/isBufferBrowser.js':
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
};
/***/ }),

/***/ './node_modules/util/util.js':
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
/* WEBPACK VAR INJECTION */(function(process) {
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }


  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    ctx.showHidden = opts;
  } else if (opts) {
    exports._extend(ctx, opts);
  }

  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};


inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',

  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&

      value.inspect !== exports.inspect &&

      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }


  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }


  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];


  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, '\\\'')
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');

  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, '\\\'')
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, '\'');
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ './node_modules/util/support/isBufferBrowser.js');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];


function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


exports.inherits = __webpack_require__(/*! inherits */ './node_modules/util/node_modules/inherits/inherits_browser.js');

exports._extend = function(origin, add) {
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
};

exports.promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }


  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };


    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret); },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb); });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ './node_modules/process/browser.js')));
/***/ }),

/***/ 'CalcEngine':
/*!***************************************!*\
  !*** external "GC.Spread.CalcEngine" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.CalcEngine;
/***/ }),

/***/ 'Common':
/*!****************************!*\
  !*** external "GC.Spread" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread;
/***/ }),

/***/ 'Core':
/*!***********************************!*\
  !*** external "GC.Spread.Sheets" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.Sheets;
/***/ }),

/***/ 'SheetsCalc':
/*!**********************************************!*\
  !*** external "GC.Spread.Sheets.CalcEngine" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.Sheets.CalcEngine;
/***/ }),

/***/ 'Touch':
/*!*****************************************!*\
  !*** external "GC.Spread.Sheets.Touch" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.Sheets.Touch;
/***/ })

/******/ });
  return GC;
};
//# sourceMappingURL=gc.spread.sheets.floatingobjects.14.2.5.js.map