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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['DataValidation'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/validation/datavalidation.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/validation/datavalidation-event.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/validation/datavalidation-event.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var CalcEngine = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var datavalidation_1 = __webpack_require__(/*! ./datavalidation */ './dist/plugins/validation/datavalidation.js');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var _DateTimeHelper = Common_1.Common._DateTimeHelper;
var StringHelper = Common_1.Common._StringHelper;
var util_common_util = Core_1._util;
var createRange = Core_1._createRange;
var util_device = util_common_util._device();
var browser = util_common_util._browser;
var $ = Core_1.GC$;
var createElement = util_common_util._createElement;
var adjustFontWithFallback = util_common_util._adjustFontWithFallback;
var cancelDefault = util_common_util._cancelDefault;
var DOCUMENT = document;
var Math_max = Math.max, Math_min = Math.min, cssPosition = 'position', cssAbsolute = 'absolute', cssBorder = 'border', cssPadding = 'padding', cssBoxShadow = 'box-shadow', cssFont = 'font', cssBackgroundColor = 'background-color', cssTop = 'top', cssLeft = 'left', cssZIndex = 'z-index', cssOutline = 'outline', cssAuto = 'auto', cssWhite = 'white', cssNone = 'none', attrSize = 'size', attrGcUIElement = 'gcUIElement';
$.extend(Core_1._SheetEventHandler.prototype, {
    _updateValidationUI: function (row, col) {
        function getValidatorProperty(obj, property) {
            if (obj && obj[property]) {
                if (typeof obj[property] === 'function') {
                    return obj[property]();
                }
                return obj[property];
            }
        }
        var self = this;
        var sheet = self._sheet, sheetParent = (sheet && sheet.parent);
        if (!sheetParent) {
            return;
        }


        var disposed = sheet._disposeValidationUI();
        if (!disposed) {
            return;
        }
        var activeSheet = sheetParent.getActiveSheet();
        if (!activeSheet) {
            var sheetTab = sheetParent.getActiveSheetTab();
            if (sheetTab) {
                activeSheet = sheetTab._sheet;
            }
        }
        if (!activeSheet || sheet.name() !== activeSheet.name()) {
            return;
        }
        var dv = sheet.getDataValidator(row, col);
        if (!dv) {
            return;
        }
        var rect = sheet.getCellRect(row, col);
        if (self._isInvalidRect(rect)) {
            return;
        }
        var containerDiv = sheetParent._getContainerDiv();
        var spreadHost = sheetParent.getHost();
        var zIndex = util_common_util._getPreferredZIndex(spreadHost);
        if (getValidatorProperty(dv, 'showInputMessage') && getValidatorProperty(dv, 'inputMessage')) {
            var StringHelper_replace = StringHelper._replace, StringHelper_escapeHtml = StringHelper._escapeHtml;
            var title = StringHelper_replace(StringHelper_escapeHtml(getValidatorProperty(dv, 'inputTitle')), '\n', '<br/>'), message = StringHelper_replace(StringHelper_escapeHtml(getValidatorProperty(dv, 'inputMessage')), '\n', '<br/>');
            var span = createElement('span');
            $(span).css(cssPosition, cssAbsolute)
                .css(cssBorder, '1px #C0C0C0 solid')
                .css(cssPadding, '3px 8px 3px 8px')
                .css(cssBackgroundColor, '#FFFFFF')
                .css(cssBoxShadow, '1px 2px 5px rgba(0,0,0,0.4)')
                .css(cssFont, 'normal normal normal 12px/normal Arial')
                .width(cssAuto)
                .height(cssAuto)
                .css(cssTop, rect.y + rect.height + 5)
                .css(cssLeft, rect.x + rect.width / 2)
                .css(cssZIndex, zIndex).html('<b>' + title + '</b><br/>' + message)
                .attr(attrGcUIElement, 'gcValidationInputMessage')
                .appendTo(containerDiv);
            sheet._validationInputMessage = span;
        }
        if (dv && getValidatorProperty(dv, 'type') === 3 && getValidatorProperty(dv, 'inCellDropdown') && getValidatorProperty(dv, 'condition')) {
            var validList_1 = getValidatorProperty(dv, 'condition').getValidListImp(sheet, row, col);
            var ignoreFormatting_1 = getValidatorProperty(dv, 'condition')._listFromFormula();
            var length_1 = validList_1.length;
            var select_1 = createElement('select');
            var cellText = sheet.getText(row, col);
            var selectedIndex = -1;
            var fragment = DOCUMENT.createDocumentFragment();
            var normalSpReg = new RegExp(String.fromCharCode(32), 'g'), htmlSp = String.fromCharCode(160);
            for (var i = 0; i < length_1; i++) {
                var v = validList_1[i].text;
                if (isNullOrUndefined(v) || (CalcEngine && v instanceof CalcEngine.CalcError)) {
                    continue;
                }
                if (selectedIndex < 0 && v === cellText) {
                    selectedIndex = i;
                }
                if (v instanceof Date) {
                    v = _DateTimeHelper._localeFormat(v, 'M/d/yyyy h:mm:ss');
                }
                var option = createElement('option');
                option.value = v;


                option.text = v.replace(normalSpReg, htmlSp);
                fragment.appendChild(option);
            }
            select_1.appendChild(fragment);
            select_1.selectedIndex = selectedIndex > 0 ? selectedIndex : 0;
            var cellStyle = sheet.getActualStyle(row, col), render = sheet._render;
            var font = (cellStyle && cellStyle.font) ? cellStyle.font : render._getDefaultFont();
            if (sheet.zoom() > 1) {
                font = render._getZoomFont(font);
            }
            var spans = sheet._modelManager.getSpans(createRange(row, col, 1, 1));
            var colSpan = 1;
            if (spans && spans.length > 0 && spans[0]) {
                colSpan = spans[0].colCount;
            }
            var isLastColumn = ((col + colSpan - 1) === sheet.getColumnCount() - 1);
            var buttonSize = sheet._getZoomRowHeight(row);
            var useTouchLayout = sheet.parent && sheet.parent.options.useTouchLayout;
            if (useTouchLayout) {
                buttonSize = Math_min(50, buttonSize);
            }
            else {
                buttonSize = Math_min(15, buttonSize);
            }
            var device = util_device, isSafariOnIpad_1 = browser.safari && (device.ipad || device.iphone), isAndroid_1 = device.android;
            var selectWidth = void 0, selectHeight = void 0, selectTop = void 0, selectLeft = void 0, backgroundColor = void 0;
            if (isSafariOnIpad_1) {
                selectWidth = rect.width + 3;
                selectHeight = rect.height + 3;
                selectTop = rect.y - 1.5;
                selectLeft = rect.x - 1.5;
                backgroundColor = cssWhite;
            }
            else {
                selectWidth = Math_max(rect.width + (isLastColumn ? 0 : buttonSize), sheet.defaults.colWidth);
                selectHeight = length_1 > 8 ? 140 : cssAuto;
                selectTop = rect.y + rect.height;
                var left = rect.x + rect.width + (isLastColumn ? 0 : buttonSize) - selectWidth;
                selectLeft = left < sheet._getCanvasOffset().left ? rect.x : left;
                backgroundColor = '';
            }
            var $select = $(select_1).css(cssOutline, cssNone)
                .css(cssPosition, cssAbsolute)
                .css(cssFont, adjustFontWithFallback(font))
                .css(cssZIndex, zIndex)
                .css(cssBackgroundColor, backgroundColor)
                .width(selectWidth)
                .height(selectHeight)

                .css(cssLeft, selectLeft)
                .attr(attrGcUIElement, 'gcValidationSelect')
                .appendTo(containerDiv)
                .attr(attrSize, length_1 > 2 ? length_1 : 2)
                .hide()
                .bind('click', function () {
                if (!isAndroid_1) {
                    self._commitSelectValue(select_1, row, col, validList_1, ignoreFormatting_1);
                    if (isSafariOnIpad_1) {
                        $(sheet._validationButton).show();
                    }
                }
            }).bind('keydown', function (event) {
                if (event.keyCode === 13 && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                    self._commitSelectValue(select_1, row, col, validList_1, ignoreFormatting_1);
                }
                else if (event.keyCode === 27 && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                    $(select_1).hide();
                }
                if (isSafariOnIpad_1) {
                    $(sheet._validationButton).show();
                }
            }).bind('change', function () {
                if (isAndroid_1) {
                    self._commitSelectValue(select_1, row, col, validList_1, ignoreFormatting_1);
                }
            });
            var spreadHeight = $(spreadHost).height();
            selectHeight = $select.outerHeight() + 1;
            if (selectHeight + selectTop > spreadHeight && selectTop > selectHeight) {
                if (!isSafariOnIpad_1) {
                    selectTop = rect.y - selectHeight;
                }
            }
            $select.css(cssTop, selectTop);
            if (isSafariOnIpad_1) {
                $select.bind('blur', function () {
                    self._commitSelectValue(select_1, row, col, validList_1, ignoreFormatting_1);
                    $(sheet._validationButton).show();
                });
            }
            sheet._validationSelect = select_1;
            var button = createElement('input');
            button.type = 'image';
            button.src = datavalidation_1._getImageSrc();
            button.alt = 'v';
            $(button).css(cssPosition, cssAbsolute)
                .width(buttonSize)
                .height(buttonSize)
                .css(cssTop, rect.y + rect.height - (buttonSize + 3))
                .css(cssLeft, rect.x + rect.width - (isLastColumn ? buttonSize : 0))
                .css(cssZIndex, zIndex)
                .css(cssBackgroundColor, cssWhite)
                .css(cssBorder, '1px solid gray')
                .attr(attrGcUIElement, 'gcValidationButton')
                .appendTo(containerDiv)
                .bind('click', function (e) {
                if (sheet.isEditing() && !sheet.endEdit()) {
                    return;
                }
                $(sheet._validationSelect).toggle().focus();
                if (isSafariOnIpad_1) {
                    $(sheet._validationButton).toggle();
                }
                cancelDefault(e);
            });
            sheet._validationButton = button;
        }
    }
});
/***/ }),

/***/ './dist/plugins/validation/datavalidation.entry.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/validation/datavalidation.entry.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
__webpack_require__(/*! ./datavalidation-event */ './dist/plugins/validation/datavalidation-event.js');
var datavalidation_1 = __webpack_require__(/*! ./datavalidation */ './dist/plugins/validation/datavalidation.js');
exports.CriteriaType = datavalidation_1.CriteriaType;
exports.DataValidationResult = datavalidation_1.DataValidationResult;
exports.ErrorStyle = datavalidation_1.ErrorStyle;
exports.DefaultDataValidator = datavalidation_1.DefaultDataValidator;
exports.HighlightType = datavalidation_1.HighlightType;
exports.HighlightPosition = datavalidation_1.HighlightPosition;
exports._getImageSrc = datavalidation_1._getImageSrc;
exports._isFormula = datavalidation_1._isFormula;
exports.createNumberValidator = datavalidation_1.createNumberValidator;
exports.createDateValidator = datavalidation_1.createDateValidator;
exports.createTimeValidator = datavalidation_1.createTimeValidator;
exports.createTextLengthValidator = datavalidation_1.createTextLengthValidator;
exports.createFormulaValidator = datavalidation_1.createFormulaValidator;
exports.createFormulaListValidator = datavalidation_1.createFormulaListValidator;
exports.createListValidator = datavalidation_1.createListValidator;
/***/ }),

/***/ './dist/plugins/validation/datavalidation.js':
/*!***************************************************!*\
  !*** ./dist/plugins/validation/datavalidation.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var ConditionalFormatting_1 = __webpack_require__(/*! ConditionalFormatting */ 'ConditionalFormatting');
var SheetsCalc = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var CalcEngine = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var _supportsCalc = !!CalcEngine;
var createConditional = ConditionalFormatting_1._createCondition;
var StringHelper_TrimStart = Common_1.Common._StringHelper._trimStart;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var cloneObject = Common_1.Common._Types._cloneObject;
var $ = Core_1.GC$;
var keyword_null = null, keyword_undefined = void 0;
var util = Core_1._util, defProperty = util._defProperty, isDefined = util._isDefined;
var adjustConditionFormulaWhenFromJSON = util._adjustConditionFormulaWhenFromJSON;
var createRange = Core_1._createRange;
var Math_min = Math.min, Math_max = Math.max;
var dateTimeHelper = Common_1.Common._DateTimeHelper;
var VALIDATOR_NS = '.validator';
var defaultColor = 'red', defaultPosition = 1, defaultIconPosition = 5;
var circleStyle = {
    type: 0,
    color: defaultColor
};
var dogEarStyle = {
    type: 1,
    color: defaultColor,
    position: defaultPosition
};
var iconStyle = {
    type: 2,
    color: defaultColor,
    position: defaultIconPosition,
    image: null,
};

var WINDOW = window;
function convertToDouble(val) {
    if (isNullOrUndefined(val)) {
        return 0.0;
    }
    if (typeof (val) === 'number') {
        return val;
    }
    if (typeof (val) === 'string') {
        var ret = parseFloat(val);
        if (!isNaN(ret) && ret.toString() === val) {
            return ret;
        }
    }
    return keyword_null;
}
function convertToDateTime(val) {
    if (val instanceof Date) {
        return val;
    }
    if (typeof val === 'string') {
        var dateTime = Common_1.Common._DateTimeHelper._parseLocale(val);
        if (!dateTime) {
            if (!isNaN(val)) {
                dateTime = Common_1.Common._DateTimeHelper._fromOADate(parseFloat(val));
                if (!dateTime) {
                    return keyword_null;
                }
            }
            else {
                dateTime = new Date(val);
                if (isNaN(dateTime.valueOf())) {
                    return keyword_null;
                }


                try {
                    var reg = /^[-+=\s]*(\d+)\W+(\d+)\W+(\d+)$/, stringHelper = Common_1.Common._StringHelper;
                    var value2 = stringHelper._trimEnd(Common_1.Common._StringHelper._trimStart(val.replace(/ |\n/g, ''), ' '), ' ');
                    var results = reg.exec(value2);
                    if (results && results.length === 4) {
                        if (results.indexOf(dateTime.getFullYear().toString()) === -1 || results.indexOf(dateTime.getMonth().toString()) === -1 || results.indexOf(dateTime.getDate().toString()) === -1) {
                            return keyword_null;
                        }
                    }
                }
                catch (ex) {
                    return keyword_null;
                }
            }
        }
        return dateTime;
    }
    if (typeof val === 'number') {
        if (isNaN(val)) {
            return keyword_null;
        }
        var dateTime = Common_1.Common._DateTimeHelper._fromOADate(val);
        if (!dateTime) {
            return keyword_null;
        }
        return dateTime;
    }
    return keyword_null;
}
function getConditionFromJson(type, validatorInfo) {
    if (isNullOrUndefined(type)) {
        return;
    }
    var dataValidation;
    if (type === 1 || type === 2 ) {
        dataValidation = createNumberValidator(validatorInfo.operator, validatorInfo.value1, validatorInfo.value2, type === 1 );
    }
    else if (type === 3 ) {
        if (validatorInfo.value) {
            dataValidation = createListValidator(validatorInfo.value);
        }
        else if (validatorInfo.formula) {
            dataValidation = createFormulaListValidator(validatorInfo.formula);
        }
    }
    else if (type === 4 || type === 5 ) {
        var value1 = validatorInfo.value1, value2 = validatorInfo.value2;
        if (value1 && value1.substr(0, 8) === '/OADate(') {
            value1 = dateTimeHelper._fromOADateString(value1);
        }
        if (value2 && value2.substr(0, 8) === '/OADate(') {
            value2 = dateTimeHelper._fromOADateString(value2);
        }
        if (type === 5 ) {
            dataValidation = createTimeValidator(validatorInfo.operator, value1, value2);
        }
        else {
            dataValidation = createDateValidator(validatorInfo.operator, value1, value2);
        }
    }
    else if (type === 6 ) {
        dataValidation = createTextLengthValidator(validatorInfo.operator, validatorInfo.value1, validatorInfo.value2);
    }
    else if (type === 7 && validatorInfo.formula !== undefined) {
        dataValidation = createFormulaValidator(validatorInfo.formula);
    }
    if (dataValidation) {
        return dataValidation.condition();
    }
}


var CriteriaType;
(function (CriteriaType) {
    CriteriaType[CriteriaType['anyValue'] = 0] = 'anyValue';

    CriteriaType[CriteriaType['wholeNumber'] = 1] = 'wholeNumber';

    CriteriaType[CriteriaType['decimalValues'] = 2] = 'decimalValues';

    CriteriaType[CriteriaType['list'] = 3] = 'list';

    CriteriaType[CriteriaType['date'] = 4] = 'date';

    CriteriaType[CriteriaType['time'] = 5] = 'time';

    CriteriaType[CriteriaType['textLength'] = 6] = 'textLength';

    CriteriaType[CriteriaType['custom'] = 7] = 'custom';
})(CriteriaType = exports.CriteriaType || (exports.CriteriaType = {}));


var DataValidationResult;
(function (DataValidationResult) {
    DataValidationResult[DataValidationResult['forceApply'] = 0] = 'forceApply';

    DataValidationResult[DataValidationResult['discard'] = 1] = 'discard';

    DataValidationResult[DataValidationResult['retry'] = 2] = 'retry';
})(DataValidationResult = exports.DataValidationResult || (exports.DataValidationResult = {}));


var ErrorStyle;
(function (ErrorStyle) {
    ErrorStyle[ErrorStyle['stop'] = 0] = 'stop';

    ErrorStyle[ErrorStyle['warning'] = 1] = 'warning';

    ErrorStyle[ErrorStyle['information'] = 2] = 'information';
})(ErrorStyle = exports.ErrorStyle || (exports.ErrorStyle = {}));


var HighlightType;
(function (HighlightType) {
    HighlightType[HighlightType['circle'] = 0] = 'circle';

    HighlightType[HighlightType['dogEar'] = 1] = 'dogEar';

    HighlightType[HighlightType['icon'] = 2] = 'icon';
})(HighlightType = exports.HighlightType || (exports.HighlightType = {}));


var HighlightPosition;
(function (HighlightPosition) {
    HighlightPosition[HighlightPosition['topLeft'] = 0] = 'topLeft';

    HighlightPosition[HighlightPosition['topRight'] = 1] = 'topRight';

    HighlightPosition[HighlightPosition['bottomRight'] = 2] = 'bottomRight';

    HighlightPosition[HighlightPosition['bottomLeft'] = 3] = 'bottomLeft';

    HighlightPosition[HighlightPosition['outsideLeft'] = 4] = 'outsideLeft';

    HighlightPosition[HighlightPosition['outsideRight'] = 5] = 'outsideRight';
})(HighlightPosition = exports.HighlightPosition || (exports.HighlightPosition = {}));


var ps = ['errorStyle', 'ignoreBlank', 'preciseCompareDate', 'inCellDropdown', 'showInputMessage', 'showErrorMessage', 'inputTitle',
    'errorTitle', 'inputMessage', 'errorMessage', 'comparisonOperator', 'type', 'condition'];
function removeRange(srcRange, row, column, rowCount, columnCount, size) {
    if (!srcRange.intersect(row, column, rowCount, columnCount)) {
        return [srcRange];
    }
    var srcRowCount = srcRange.rowCount;
    var srcColCount = srcRange.colCount;
    var srcRow = Math_max(0, srcRange.row);
    var srcCol = Math_max(0, srcRange.col);
    var wholeRow = false, wholeCol = false, removeWholeRow = false;
    row = Math_max(0, row);
    column = Math_max(0, column);
    if (!size) {
        size = [-1, -1];
    }

    var rc = size[0], cc = size[1];

    if (srcRowCount === -1) {
        srcRowCount = rc - srcRow;
        wholeCol = true;
    }
    if (srcColCount === -1) {
        srcColCount = cc - srcCol;
        wholeRow = true;
    }
    if (rowCount === -1) {
        rowCount = rc - row;
    }
    if (columnCount === -1) {
        columnCount = cc - column;
        removeWholeRow = true;
    }
    var sourceRowTop = srcRow;
    var sourceRowBottom = srcRow + srcRowCount - 1;
    var sourceColumnLeft = srcCol;
    var sourceColumnRight = srcCol + srcColCount - 1;
    var removeRowTop = row;
    var removeRowBottom = row + rowCount - 1;
    var removeColumnLeft = column;
    var removeColumnRight = column + columnCount - 1;
    var newRanges = [];

    if (sourceRowTop !== -1 && sourceColumnLeft !== -1 && removeRowTop !== -1 && removeColumnLeft !== -1) {
        if (removeColumnLeft - sourceColumnLeft > 0) {
            var left = createRange(sourceRowTop, sourceColumnLeft, wholeCol ? -1 : srcRowCount, removeColumnLeft - sourceColumnLeft);
            newRanges.push(left);
        }
        if (sourceColumnRight - removeColumnRight > 0) {
            var right = createRange(sourceRowTop, removeColumnRight + 1, wholeCol ? -1 : srcRowCount, sourceColumnRight - removeColumnRight);
            newRanges.push(right);
        }
        if (removeRowTop - sourceRowTop > 0) {
            var top_1 = createRange(sourceRowTop, Math_max(removeColumnLeft, sourceColumnLeft), removeRowTop - sourceRowTop, wholeRow && removeWholeRow ? -1 : Math_min(removeColumnRight, sourceColumnRight) - Math_max(removeColumnLeft, sourceColumnLeft) + 1);
            newRanges.push(top_1);
        }
        if (sourceRowBottom - removeRowBottom > 0) {
            var bottom = createRange(removeRowBottom + 1, Math_max(removeColumnLeft, sourceColumnLeft), sourceRowBottom - removeRowBottom, wholeRow && removeWholeRow ? -1 : Math_min(removeColumnRight, sourceColumnRight) - Math_max(removeColumnLeft, sourceColumnLeft) + 1);
            newRanges.push(bottom);
        }
    }
    newRanges._rangeAdjusted = true;
    return newRanges;
}
var DefaultDataValidator = (function () {
    function DefaultDataValidator(condition) {
        var self = this;
        self.id = DefaultDataValidator._validatorId;
        DefaultDataValidator._validatorId++;
        self._highlightStyle = cloneObject(circleStyle);
        if (condition) {
            self.condition(condition);
            self.condition().ignoreBlank(self.ignoreBlank());
        }
        self._ranges = [];
    }


    DefaultDataValidator.prototype.value1 = function (baseRow, baseColumn) {
        var condition = this.condition();
        var cond = (condition && condition.item1()) ? condition.item1() : condition;
        if (cond) {
            var formula = cond.formula(baseRow, baseColumn);
            if (formula && formula.length > 0) {
                return '=' + StringHelper_TrimStart($.trim(formula.toString()), '=');
            }
            return cond.expected();
        }
        return keyword_null;
    };


    DefaultDataValidator.prototype.value2 = function (baseRow, baseColumn) {
        var condition = this.condition();
        var cond = (condition && condition.item2()) ? condition.item2() : condition;
        if (cond) {
            var formula = cond.formula(baseRow, baseColumn);
            if (formula && formula.length > 0) {
                return '=' + StringHelper_TrimStart($.trim(formula.toString()), '=');
            }
            return cond.expected();
        }
        return keyword_null;
    };


    DefaultDataValidator.prototype.isValid = function (evaluator, baseRow, baseColumn, actual) {
        var self = this, condition = self.condition();
        if (condition) {
            if (self.ignoreBlank() && (isNullOrUndefined(actual) || actual === '')) {
                return true;
            }
            var val = actual, v = void 0;
            if (!isNullOrUndefined(actual)) {
                switch (self.type()) {
                    case 0 :
                        return true;
                    case 2 :
                    case 1 :
                        v = convertToDouble(actual);
                        if (!isNullOrUndefined(v)) {
                            val = v;
                        }
                        break;
                    case 4 :
                    case 5 :
                        v = convertToDateTime(actual);
                        if (!isNullOrUndefined(v)) {
                            val = v;
                        }
                        break;
                    case 7 :
                    case 3 :
                    case 6 :
                        break;
                }
            }
            if (evaluator) {
                evaluator._isDataValidator = true;
            }
            var result = void 0;
            try {
                result = condition.evaluate(evaluator, baseRow, baseColumn, val, val);
            }
            catch (ex) {
                result = true;
            }
            finally {
                if (evaluator) {
                    evaluator._isDataValidator = false;
                }
            }
            return result;
        }
        return true;
    };


    DefaultDataValidator.prototype.reset = function () {
        var self = this;
        self.errorStyle(0 );
        self.ignoreBlank(true);
        self.preciseCompareDate(false);
        self.inCellDropdown(true);
        self.showInputMessage(true);
        self.showErrorMessage(true);
        self.inputTitle('');
        self.errorTitle('');
        self.inputMessage('');
        self.errorMessage('');
        self.comparisonOperator(6 );
        self.type(0 );
        self.condition(keyword_null);
        self._ranges.length = 0;
    };


    DefaultDataValidator.prototype.getValidList = function (evaluator, baseRow, baseColumn) {
        var condition = this.condition();
        if (condition !== keyword_null && this.type() === 3 && condition.conType() === 12 ) {
            return condition.getValidList(evaluator, baseRow, baseColumn);
        }
        return keyword_null;
    };


    DefaultDataValidator.prototype.highlightStyle = function (style) {
        var self = this;
        if (arguments.length === 0) {
            return self._highlightStyle;
        }
        if (isNullOrUndefined(style)) {
            return;
        }
        if (self._highlightStyle.type !== style.type) {
            var type = style.type;
            switch (type) {
                case 1:
                    self._highlightStyle = cloneObject(dogEarStyle);
                    break;
                case 2:
                    self._highlightStyle = cloneObject(iconStyle);
                    break;
                default:
                    self._highlightStyle = cloneObject(circleStyle);
                    break;
            }
        }
        var _highlightStyle = self._highlightStyle;
        for (var p in _highlightStyle) {
            if (_highlightStyle.hasOwnProperty(p) && style.hasOwnProperty(p)) {
                _highlightStyle[p] = style[p];
            }
        }
        if (self._sheet) {
            self._sheet.repaint();
        }
        return self;
    };
    DefaultDataValidator.prototype.toJSON = function (context) {
        var self = this;
        var jsonData = {};
        ps.forEach(function (p) {
            var t = self[p]();
            if (!self[p].isDefault(t)) {
                jsonData[p] = (t && t.toJSON) ? t.toJSON(context) : t;
            }
        });

        var ranges = self._ranges.map(function (range) {
            return (range.row === -1 && range.col === -1) ? createRange(-1, 0, range.rowCount, range.colCount) : range;
        });
        jsonData.ranges = SheetsCalc.rangesToFormula(ranges, 0, 0, 15 , false);
        jsonData.highlightStyle = JSON.stringify(self._highlightStyle);
        if ($.isEmptyObject(jsonData)) {
            return keyword_undefined;
        }
        return jsonData;
    };
    DefaultDataValidator.prototype.fromJSON = function (settings, noSchema, context) {
        if (!settings || $.isEmptyObject(settings)) {
            return;
        }
        var self = this;

        if (settings.ranges) {
            self._ranges = SheetsCalc.formulaToRanges(context, settings.ranges, 0, 0, true )[0].ranges;
        }
        if (settings.highlightStyle) {
            self._highlightStyle = JSON.parse(settings.highlightStyle);
        }
        ps.forEach(function (p) {
            var t = settings[p];
            if (!isDefined(t)) {
                return;
            }
            if (p === 'condition') {
                var tempCondition = createConditional();
                tempCondition.fromJSON(settings.condition, context, noSchema);
                self.condition(tempCondition, false);
                var ranges = tempCondition.ranges();
                if (ranges && ranges.length) {
                    self._ranges = ranges;
                }
                else {
                    tempCondition.ranges(self._ranges);
                }
                tempCondition.context(context);
            }
            else {
                self[p](t, false);
            }
        });

        var validatorInfo = settings.validatorInfo;
        if (validatorInfo) {
            var isR1C1 = context._calcService.useR1C1;
            var condition = getConditionFromJson(settings.type, validatorInfo), operator = validatorInfo.operator;
            if (condition) {
                condition.ranges(self._ranges);

                condition.ignoreBlank(self.ignoreBlank());
                condition.context(context);


                if (isR1C1) {
                    adjustConditionFormulaWhenFromJSON(condition);
                }

                self.condition(condition);
            }
            if (!isNullOrUndefined(operator)) {
                self.comparisonOperator(operator);
            }
        }
    };
    DefaultDataValidator.prototype.clone = function (context) {
        if (this._fromCopyMove) {
            var condition = this.condition();
            if (condition) {
                condition.initExpression();
            }
            return this;
        }
        var validator = new DefaultDataValidator();
        validator.fromJSON(this.toJSON(context), false, context || this._sheet);
        validator._ranges = [];
        return validator;
    };
    DefaultDataValidator.prototype.context = function (context) {
        if (context) {
            this._context = context;
            var condition = this.condition();
            if (condition) {
                condition.ranges(this._ranges);
                condition.context(context);
            }
        }
        return this._context;
    };
    DefaultDataValidator.prototype._addRange = function (range) {
        if (range) {
            var ranges = this._ranges;
            for (var i = 0; i < ranges.length; i++) {
                if (ranges[i].containsRange(range)) {
                    return;
                }
            }
            ranges.push(range);
        }
    };
    DefaultDataValidator.prototype._removeRange = function (range, manager) {
        var self = this, ranges = self._ranges;
        if (range && ranges.length) {
            var row_1 = range.row, col_1 = range.col, rowCount_1 = range.rowCount, colCount_1 = range.colCount;
            var tmp_1 = [], rangeAdjusted_1 = false;
            var sheet = self._sheet, size_1 = sheet && [sheet.getRowCount(), sheet.getColumnCount()];
            ranges.forEach(function (rangeItem) {
                var tmpRange = removeRange(rangeItem, row_1, col_1, rowCount_1, colCount_1, size_1);
                if (tmpRange._rangeAdjusted) {
                    rangeAdjusted_1 = true;
                }
                tmp_1.push(tmpRange);
            });
            self._ranges = [].concat.apply([], tmp_1);
            if (rangeAdjusted_1) {
                manager._addChangedValidator(self);
            }
        }
    };
    DefaultDataValidator.prototype._getRanges = function () {
        return this._ranges;
    };
    DefaultDataValidator.prototype._ensureCondition = function () {
        var self = this;
        if (self.condition()) {
            self.condition().initExpression();
        }
    };
    DefaultDataValidator.prototype._setConditionRanges = function (ranges) {
        if (this.condition()) {
            this.condition().ranges(ranges);
        }
    };
    DefaultDataValidator.prototype._updateRangesByTable = function (tableRange, dataRange, deltaRowCount) {
        var self = this, isUpdated = false;
        self._ensureCondition();
        var ranges = self._ranges;
        for (var i = 0, length_1 = ranges.length; i < length_1; i++) {
            var range = ranges[i], row = range.row, rowCount = range.rowCount, col = range.col, colCount = range.colCount,

            isRowRangeEqualTableRowRange = row === tableRange.row && rowCount === tableRange.rowCount
                && tableRange.col <= col && colCount <= tableRange.colCount,

            isRowRangeEqualTableDataRowRange = row === dataRange.row && rowCount === dataRange.rowCount
                && dataRange.col <= col && colCount <= dataRange.colCount,

            isInTableRange = isRowRangeEqualTableRowRange || isRowRangeEqualTableDataRowRange;
            if (isInTableRange) {
                ranges[i] = createRange(row, col, rowCount + deltaRowCount, colCount);
                isUpdated = true;
            }
        }
        if (isUpdated) {
            self._setConditionRanges(ranges);
        }
        return isUpdated;
    };
    DefaultDataValidator.prototype._onRowsAdded = function (index, count, affectRanges, isFromTable) {
        if (index < 0 || count <= 0) {
            return;
        }
        if (this.condition()) {
            this.condition().initExpression();
        }
        for (var i = 0; i < this._ranges.length; i++) {
            var range = this._ranges[i];
            var r = range.row;
            if (affectRanges && affectRanges.length > 0) {
                var needBreak = false;
                for (var j = 0, len = affectRanges.length; j < len; j++) {
                    var affectRange = affectRanges[j];
                    if (affectRange && (affectRange.row === range.row && affectRange.row + affectRange.rowCount - count === range.row + range.rowCount && range.row === index)) {
                        range.rowCount += count;
                        needBreak = true;
                        break;
                    }
                }
                if (needBreak) {
                    break;
                }
            }
            if (!isFromTable) {
                if (index <= r) {
                    range.row += count;
                } else if (index > r && index <= r + range.rowCount) {
                    range.rowCount += count;
                }
            }

        }
        if (this.condition()) {
            this.condition().ranges(this._ranges);
        }
    };
    DefaultDataValidator.prototype._onRowsRemoved = function (index, count) {
        if (index < 0 || count <= 0) {
            return;
        }
        if (this.condition()) {
            this.condition().initExpression();
        }
        var ranges = [];
        this._ranges.forEach(function (range) {
            var row = range.row, rowCount = range.rowCount;
            if (index < row) {
                var diff = index + count - row;
                if (diff <= 0) {
                    row -= count;
                }
                else {
                    row -= diff;
                    range.rowCount -= diff;
                }
                if (row < 0) {
                    range.rowCount += row;
                    row = 0;
                }
                range.row = row;
            }
            else if (row <= index && index < row + rowCount) {
                range.rowCount -= Math_min(count, row + rowCount - index);
            }

            if (range.rowCount > 0 || (range.row === -1 && range.rowCount === -1)) {
                ranges.push(range);
            }
        });
        this._ranges = ranges;
        if (this.condition()) {
            this.condition().ranges(this._ranges);
        }
    };
    DefaultDataValidator.prototype._onColumnsAdded = function (index, count, affectRanges) {
        if (index < 0 || count <= 0) {
            return;
        }
        if (this.condition()) {
            this.condition().initExpression();
        }
        for (var i = 0; i < this._ranges.length; i++) {
            var range = this._ranges[i];
            if (affectRanges && affectRanges.length > 0) {
                var needContinue = false;
                var needBreak = false;
                for (var j = 0, len = affectRanges.length; j < len; j++) {
                    var affectRange = affectRanges[j];
                    if (affectRange && !affectRange.containsRange(range)) {
                        needContinue = true;
                        continue;
                    }
                    if (affectRange && (affectRange.col === range.col && affectRange.col + affectRange.colCount - count === range.col + range.colCount && affectRange.col === index)) {
                        range.colCount += count;
                        needBreak = true;
                        break;
                    }
                }
                if (needContinue) {
                    continue;
                }
                if (needBreak) {
                    break;
                }
            }
            var c = range.col;
            if (index <= c) {
                range.col += count;
            }
            else if (index <= c + range.colCount) {
                range.colCount += count;
            }
        }
        if (this.condition()) {
            this.condition().ranges(this._ranges);
        }
    };
    DefaultDataValidator.prototype._onColumnsRemoved = function (index, count) {
        if (index < 0 || count <= 0) {
            return;
        }
        if (this.condition()) {
            this.condition().initExpression();
        }
        var ranges = [];
        this._ranges.forEach(function (range) {
            var col = range.col, colCount = range.colCount;
            if (index < col) {
                var diff = index + count - col;
                if (diff <= 0) {
                    col -= count;
                }
                else {
                    col -= diff;
                    range.colCount -= diff;
                }
                if (col < 0) {
                    range.colCount += col;
                    col = 0;
                }
                range.col = col;
            }
            else if (col <= index && index < col + colCount) {
                range.colCount -= Math_min(count, col + colCount - index);
            }

            if (range.colCount > 0 || (range.col === -1 && range.colCount === -1)) {
                ranges.push(range);
            }
        });
        this._ranges = ranges;
        if (this.condition()) {
            this.condition().ranges(this._ranges);
        }
    };
    DefaultDataValidator._validatorId = 1;
    return DefaultDataValidator;
}());
exports.DefaultDataValidator = DefaultDataValidator;
var DefaultDataValidatorProperty = {


    errorStyle: defProperty('errorStyle', 0 ),


    ignoreBlank: defProperty('ignoreBlank', true, function (value) {
        if (this.condition()) {
            this.condition().ignoreBlank(value);
        }
    }),


    preciseCompareDate: defProperty('preciseCompareDate', false, function (value) {
        if (this.condition()) {
            this.condition().preciseCompareDate(value);
        }
    }),


    inCellDropdown: defProperty('inCellDropdown', true),


    showInputMessage: defProperty('showInputMessage', true),


    showErrorMessage: defProperty('showErrorMessage', true),


    inputTitle: defProperty('inputTitle', ''),


    errorTitle: defProperty('errorTitle', ''),


    inputMessage: defProperty('inputMessage', ''),


    errorMessage: defProperty('errorMessage', ''),


    comparisonOperator: defProperty('comparisonOperator', 6 ),


    condition: defProperty('condition', keyword_null),


    type: defProperty('type', 0 )
};
$.extend(DefaultDataValidator.prototype, DefaultDataValidatorProperty);
function _getImageSrc() {
    return 'data:image/png;base64,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';
}
exports._getImageSrc = _getImageSrc;
function _isFormula(val) {
    return _supportsCalc && val && (val[0] === '=');
}
exports._isFormula = _isFormula;


function createNumberValidator(typeOperator, v1, v2, isIntegerValue) {
    var formula1 = keyword_null, expect1 = keyword_null, formula2 = keyword_null, expect2 = keyword_null;
    if (_isFormula(v1)) {
        formula1 = StringHelper_TrimStart(v1, '=');
    }
    else {
        expect1 = v1;
    }
    if (_isFormula(v2)) {
        formula2 = StringHelper_TrimStart(v2, '=');
    }
    else {
        expect2 = v2;
    }
    var conditionTemp = keyword_null, c1, c2;
    if (typeOperator === 6 ) {
        c1 = createConditional(1 , 3 , expect1, formula1);
        c1.integerValue(isIntegerValue);
        c2 = createConditional(1 , 5 , expect2, formula2);
        c2.integerValue(isIntegerValue);
        conditionTemp = createConditional(0 , 1 , keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, c1, c2);
    }
    if (typeOperator === 7 ) {
        c1 = createConditional(1 , 4 , expect1, formula1);
        c1.integerValue(isIntegerValue);
        c2 = createConditional(1 , 2 , expect2, formula2);
        c2.integerValue(isIntegerValue);
        conditionTemp = createConditional(0 , 0 , keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, c1, c2);
    }
    if (typeOperator >= 0 && typeOperator <= 5) {
        conditionTemp = createConditional(1 , typeOperator, expect1, formula1);
        conditionTemp.integerValue(isIntegerValue);
    }
    var t = new DefaultDataValidator(conditionTemp);
    t.type(isIntegerValue ? 1 : 2 );
    t.comparisonOperator(typeOperator);
    return t;
}
exports.createNumberValidator = createNumberValidator;
function createDateOrTimeValidator(typeOperator, v1, v2, conType, dataValidationType) {
    var formula1 = keyword_null, expect1 = keyword_null, formula2 = keyword_null, expect2 = keyword_null;
    if (_isFormula(v1)) {
        formula1 = StringHelper_TrimStart(v1, '=');
    }
    else {
        expect1 = v1;
    }
    if (_isFormula(v2)) {
        formula2 = StringHelper_TrimStart(v2, '=');
    }
    else {
        expect2 = v2;
    }
    var conditionTemp = keyword_null, c1, c2;
    if (typeOperator === 6 ) {
        c1 = createConditional(conType, 5 , expect1, formula1);
        c2 = createConditional(conType, 3 , expect2, formula2);
        conditionTemp = createConditional(0 , 1 , keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, c1, c2);
    }
    if (typeOperator === 7 ) {
        c1 = createConditional(conType, 2 , expect1, formula1);
        c2 = createConditional(conType, 4 , expect2, formula2);
        conditionTemp = createConditional(0 , 0 , keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, c1, c2);
    }
    var dateType;
    if (typeOperator >= 0 && typeOperator <= 5) {
        switch (typeOperator) {
            case 0 :
                dateType = 0 ;
                break;
            case 1 :
                dateType = 1 ;
                break;
            case 2 :
                dateType = 4 ;
                break;
            case 3 :
                dateType = 5 ;
                break;
            case 4 :
                dateType = 2 ;
                break;
            case 5 :
                dateType = 3 ;
                break;
        }
        conditionTemp = createConditional(conType, dateType, expect1, formula1);
    }
    var t = new DefaultDataValidator(conditionTemp);
    t.type(dataValidationType);
    t.comparisonOperator(typeOperator);
    return t;
}


function createDateValidator(typeOperator, v1, v2) {
    return createDateOrTimeValidator(typeOperator, v1, v2, 5 , 4 );
}
exports.createDateValidator = createDateValidator;


function createTimeValidator(typeOperator, v1, v2) {
    return createDateOrTimeValidator(typeOperator, v1, v2, 13 , 5 );
}
exports.createTimeValidator = createTimeValidator;


function createTextLengthValidator(typeOperator, v1, v2) {
    var formula1 = keyword_null, expect1 = keyword_null, formula2 = keyword_null, expect2 = keyword_null;
    if (_isFormula(v1)) {
        formula1 = StringHelper_TrimStart(v1, '=');
    }
    else {
        expect1 = v1;
    }
    if (_isFormula(v2)) {
        formula2 = StringHelper_TrimStart(v2, '=');
    }
    else {
        expect2 = v2;
    }
    var conditionTemp = keyword_null, c1, c2;
    if (typeOperator === 6 ) {
        c1 = createConditional(7 , 3 , expect1, formula1);
        c2 = createConditional(7 , 5 , expect2, formula2);
        conditionTemp = createConditional(0 , 1 , keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, c1, c2);
    }
    if (typeOperator === 7 ) {
        c1 = createConditional(7 , 4 , expect1, formula1);
        c2 = createConditional(7 , 2 , expect2, formula2);
        conditionTemp = createConditional(0 , 0 , keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, c1, c2);
    }
    if (typeOperator >= 0 && typeOperator <= 5) {
        conditionTemp = createConditional(7 , typeOperator, expect1, formula1);
    }
    var t = new DefaultDataValidator(conditionTemp);
    t.type(6 );
    t.comparisonOperator(typeOperator);
    return t;
}
exports.createTextLengthValidator = createTextLengthValidator;


function createFormulaValidator(formula) {
    if (!_supportsCalc) {
        return keyword_null;
    }
    var t = new DefaultDataValidator(createConditional(4 , keyword_null, keyword_null, StringHelper_TrimStart(formula, '='), 4 ));
    t.type(7 );
    return t;
}
exports.createFormulaValidator = createFormulaValidator;


function createFormulaListValidator(formula) {
    if (!_supportsCalc) {
        return keyword_null;
    }
    var t = new DefaultDataValidator(ConditionalFormatting_1.Condition.fromFormula(formula));
    t.type(3 );
    return t;
}
exports.createFormulaListValidator = createFormulaListValidator;


function createListValidator(source) {
    var t = new DefaultDataValidator(ConditionalFormatting_1.Condition.fromSource(source));
    t.type(3 );
    return t;
}
exports.createListValidator = createListValidator;
$.extend(Core_1.Worksheet.prototype, {


    getDataValidator: function (row, col, sheetArea) {
        var validators = this._getDataValidators(row, col, sheetArea);
        return validators ? validators[0] : keyword_undefined;
    },
    _getDataValidators: function (row, col, sheetArea) {
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3 ;
        }
        if (sheetArea === 3 ) {
            return this._validations._getValidators(row, col);
        }
        return keyword_undefined;
    },


    setDataValidator: function (row, col, rowCount, colCount, value, sheetArea) {
        var self = this, validations = self._validations;
        if (arguments.length < 5) {
            value = rowCount;
            sheetArea = colCount;

            rowCount = row === -1 ? -1 : 1;
            colCount = col === -1 ? -1 : 1;
        }
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3 ;
        }


        if (sheetArea === 3) {
            var oldValue = self.getDataValidator(row, col, sheetArea);
            var isSingle = (rowCount === 1) && (colCount === 1);
            if (isSingle && (oldValue === value)) {
                return;
            }
            self._modelManager._backupValidations();
            var range = createRange(row, col, rowCount, colCount);
            validations._removeValidator(range);
            if (value) {
                validations._addValidator(value, range);
            }
            var pn = 'validator';
            if (isSingle) {
                self._raiseCellChanged(pn, row, col, sheetArea, oldValue, value);
                if (row !== -1 && col === -1) {
                    self._raiseRowChanged(row, sheetArea, pn, value, oldValue);
                }
                else if (row === -1 && col !== -1) {
                    self._raiseColumnChanged(col, sheetArea, pn, value, oldValue);
                }
            }
            self._invalidate();
        }
    },


    isValid: function (row, column, value) {
        var self = this;
        try {
            self._validatingRow = row;
            self._validatingColumn = column;
            self._validatingValue = value;
            self._isValidatingCell = true;
            var dv = self.getDataValidator(row, column);
            if (dv) {
                return dv.isValid(self, row, column, value);
            }
        }
        finally {
            self._validatingRow = -1;
            self._validatingColumn = -1;
            self._validatingValue = keyword_null;
            self._isValidatingCell = false;
        }
        return true;
    },
    _disposeValidationUI: function () {
        var self = this;


        if (self._isDisposingValidationUI) {
            return false;
        }
        self._isDisposingValidationUI = true;
        var validationInputMessage = self._validationInputMessage, parent;
        if (validationInputMessage) {
            parent = validationInputMessage.parentNode;
            if (parent) {
                parent.removeChild(validationInputMessage);
            }
            self._validationInputMessage = keyword_null;
        }
        var validationButton = self._validationButton;
        if (validationButton) {
            $(validationButton).unbind('click');
            parent = validationButton.parentNode;
            if (parent) {
                parent.removeChild(validationButton);
            }
            self._validationButton = keyword_null;
        }
        var validationSelect = self._validationSelect;
        if (validationSelect) {
            $(validationSelect).unbind('keydown').unbind('blur').unbind('click').unbind('change');
            parent = validationSelect.parentNode;
            if (parent) {
                parent.removeChild(validationSelect);
            }
            self._validationSelect = keyword_null;
        }
        self._isDisposingValidationUI = false;
        return true;
    },
    _getValidatorsWithFormula: function () {
        var self = this, result = [];
        var validations = self._validations, validators = validations && validations._validators;
        if (validators) {
            for (var key in validators) {
                var validator = validators[key];
                var condition = validator && validator.condition();
                if (condition && condition.getExpressions && condition.getExpressions().length > 0) {
                    result.push({ validator: validator, sheet: self });
                }
            }
        }
        return result;
    }
});
$.extend(Core_1.Workbook.prototype, {
    _getValidatorsWithFormula: function () {
        var result = [];
        var self = this, sheets = self.sheets;
        sheets.forEach(function (sheet) {
            var validators = sheet._getValidatorsWithFormula();
            if (validators && validators.length) {
                validators.forEach(function (item) {
                    result.push(item);
                });
            }
        });
        return result;
    }
});
$.extend(Core_1.CellRange.prototype, {


    validator: function (value) {
        var self = this, sheet = self.sheet, sheetArea = self.sheetArea;
        var row = self.row, col = self.col, rowCount = self.rowCount, colCount = self.colCount;
        if (arguments.length === 0) {
            return sheet.getDataValidator(row, col, sheetArea);
        }
        sheet.setDataValidator(row, col, rowCount, colCount, value, sheetArea);
        return self;
    }
});
function _getSheetActualRange(range) {
    return this._getActualRange(range);
}
function _cloneToActualRanges(sheet, ranges) {
    if (sheet && ranges && ranges.length) {
        return ranges.map(_getSheetActualRange.bind(sheet));
    }
}
function _getAdjustedRange(actualRange, rowCount, columnCount) {
    var rc = actualRange.rowCount, cc = actualRange.colCount;
    var range = createRange(actualRange.row, actualRange.col, rc, cc);
    if (actualRange.row === 0 && rc === rowCount) {
        range.row = -1;
    }
    if (actualRange.col === 0 && cc === columnCount) {
        range.col = -1;
    }
    return range;
}
function _cloneToRanges(sheet, actualRanges) {
    var
    rowCount = sheet.getRowCount(), columnCount = sheet.getColumnCount();
    return actualRanges.map(function (actualRange) {
        return _getAdjustedRange(actualRange, rowCount, columnCount);
    });
}
function _updateCache(range, sheetRowCount, sheetColCount, manager, validator) {
    var cache = manager._cellDataValidationCache;
    var rangeRow = range.row, rangeCol = range.col, rangeRowCount = range.rowCount, rangeColCount = range.colCount;
    if (rangeRow + rangeRowCount - 1 >= sheetRowCount) {
        rangeRowCount = sheetRowCount - rangeRow;
    }
    if (rangeCol + rangeColCount - 1 >= sheetColCount) {
        rangeColCount = sheetColCount - rangeCol;
    }
    for (var r = 0, row = rangeRow; r < rangeRowCount; r++, row++) {
        var rowCache = cache[row];
        if (!rowCache) {
            cache[row] = rowCache = {};
        }
        for (var c = 0, col = rangeCol; c < rangeColCount; c++, col++) {
            var oldValidator = rowCache[col];
            oldValidator && (oldValidator !== validator) && oldValidator._removeRange(range, manager);
            rowCache[col] = validator;
        }
    }
}
function _removeFromCache(range, manager) {
    var rowCache, cache = manager._cellDataValidationCache;
    for (var r = 0, row = range.row, rowCount = range.rowCount; r < rowCount; r++, row++) {
        rowCache = cache[row];
        if (!rowCache) {
            continue;
        }
        for (var c = 0, col = range.col, colCount = range.colCount; c < colCount; c++, col++) {
            var oldValidator = rowCache[col];
            oldValidator && oldValidator._removeRange(range, manager);
            rowCache[col] = keyword_undefined;
        }
    }
}
function toArray(src) {
    var result = [];
    if (src) {
        for (var key in src) {
            var item = src[key];
            if (item) {
                result.push(item);
            }
        }
    }
    return result;
}
var DataValidationManager = (function () {
    function DataValidationManager(worksheet) {
        this._worksheet = worksheet;
        this._validators = {};
        this._cellDataValidationCache = {};
        this._changedValidators = [];
    }
    DataValidationManager.prototype._dispose = function () {
        this._worksheet = keyword_null;
    };
    DataValidationManager.prototype._cloneToActualRanges = function (ranges) {
        return _cloneToActualRanges(this._worksheet, ranges);
    };
    DataValidationManager.prototype._cloneToRanges = function (actualRanges) {
        return _cloneToRanges(this._worksheet, actualRanges);
    };

    DataValidationManager.prototype._resetCache = function (isFromJson) {
        var self = this, validators = self._validators;
        self._cellDataValidationCache = {};
        if (validators) {
            for (var key in validators) {
                var validator = validators[key];
                if (validator) {
                    isFromJson && delete validator._json;
                    self._addCache(validator, true);
                }
            }
        }
        self._adjustValidators();
    };
    DataValidationManager.prototype._addChangedValidator = function (validator) {
        var changedValidators = this._changedValidators;

        if (changedValidators.indexOf(validator) === -1) {
            changedValidators.push(validator);
        }
    };
    DataValidationManager.prototype._addCache = function (validator, notAdjust) {
        var self = this, ranges = self._cloneToActualRanges(validator._getRanges()), sheet = self._worksheet, sheetRowCount = sheet.getRowCount(), sheetColCount = sheet.getColumnCount();
        if (ranges) {
            self._changedValidators.length = 0;
            ranges.forEach(function (range) {
                _updateCache(range, sheetRowCount, sheetColCount, self, validator);
            });
            if (!notAdjust) {
                self._adjustValidators();
            }
        }
    };
    DataValidationManager.prototype._removeCache = function (validator) {
        var self = this, ranges = self._cloneToActualRanges(validator._getRanges());
        self._changedValidators.length = 0;
        ranges.forEach(function (range) {
            _removeFromCache(range, self);
        });
        self._adjustValidators();
    };
    DataValidationManager.prototype._removeCacheByRange = function (range) {
        var self = this;
        range && _removeFromCache(self._worksheet._getActualRange(range), self);
        self._adjustValidators();
    };
    DataValidationManager.prototype._adjustValidators = function () {
        var changedValidators = this._changedValidators;
        if (changedValidators.length) {
            var validators_1 = this._validators;
            changedValidators.forEach(function (validator) {
                if (validator._getRanges().length) {
                    if (validator.condition()) {
                        validator.condition().ranges(validator._getRanges());
                    }
                }
                else {
                    delete validators_1[validator.id];
                    delete validator._sheet;
                }
            });
            changedValidators.length = 0;
        }
    };
    DataValidationManager.prototype._addValidator = function (validator, range) {
        var self = this, sheet = self._worksheet;
        if (range) {
            if (validator._sheet && sheet !== validator._sheet) {
                validator = validator.clone(sheet);
            }
            validator._sheet = sheet;
            validator._addRange(range);
        }
        if (sheet) {
            validator.context(sheet);
            self._validators[validator.id] = validator;
            self._addCache(validator);
            return validator;
        }
    };
    DataValidationManager.prototype._removeValidator = function (range) {
        if (range) {
            var self_1 = this, sheet = self_1._worksheet;
            self_1._removeCacheByRange(range);
            sheet._invalidate();
        }
    };
    DataValidationManager.prototype._clear = function () {
        var self = this, sheet = self._worksheet;
        if (sheet) {
            self._validators = {};
            self._resetCache();
        }
    };
    DataValidationManager.prototype._getValidators = function (row, column) {
        var self = this, validators = self._validators;
        if (arguments.length === 0) {
            return toArray(validators);
        }
        var result = [], cache = self._cellDataValidationCache, rowCache;
        if (row === keyword_undefined) {
            row = -1;
        }
        if (column === keyword_undefined) {
            column = -1;
        }
        if (row === -1 && column === -1) {
            return toArray(validators);
        }
        if (row !== -1 && column !== -1) {
            rowCache = cache[row];
            if (rowCache && rowCache[column]) {
                result.push(rowCache[column]);
            }
        }
        else if (row === -1) {
            $.each(cache, function (p, rowCacheItem) {
                var cellCache = rowCacheItem[column];
                if (cellCache && result.indexOf(cellCache) === -1) {
                    result.push(cellCache);
                }
            });
        }
        else {
            rowCache = cache[row];
            if (rowCache) {
                $.each(rowCache, function (p, cellCache) {
                    if (cellCache && result.indexOf(cellCache) === -1) {
                        result.push(cellCache);
                    }
                });
            }
        }
        return result;
    };
    DataValidationManager.prototype._updateRangesByTable = function (tableRange, dataRange, deltaRowCount) {
        var self = this, sheet = self._worksheet, modelManager = sheet._modelManager, validators = self._validators, isUpdated = false;
        if (isNullOrUndefined(validators)) {
            return;
        }
        modelManager._backupValidations();
        for (var key in validators) {
            var validator = validators[key];
            if (validator && validator._updateRangesByTable(tableRange, dataRange, deltaRowCount)) {
                isUpdated = true;
            }
        }
        if (isUpdated) {
            self._resetCache();
        }
    };
    DataValidationManager.prototype._addData = function (index, count, isRow, affectRanges, isFromTable) {
        var self = this, validators = self._validators;
        if (validators) {
            for (var key in validators) {
                var validator = validators[key];
                if (validator) {
                    if (isRow) {
                        validator._onRowsAdded(index, count, affectRanges, isFromTable);
                    }
                    else {
                        validator._onColumnsAdded(index, count, affectRanges);
                    }
                }
            }
        }
        self._resetCache();
    };
    DataValidationManager.prototype._onRowsAdded = function (row, rowCount, affectRanges, isFromTable) {
        this._addData(row, rowCount, true, affectRanges, isFromTable);
    };
    DataValidationManager.prototype._onColumnsAdded = function (col, colCount, affectRanges) {
        this._addData(col, colCount, false, affectRanges);
    };
    DataValidationManager.prototype._removeData = function (index, count, isRow) {
        var self = this, validators = self._validators;
        if (validators) {
            for (var key in validators) {
                var validator = validators[key];
                if (validator) {
                    if (isRow) {
                        validator._onRowsRemoved(index, count);
                    }
                    else {
                        validator._onColumnsRemoved(index, count);
                    }
                    if (validator._ranges.length === 0) {
                        validators[key] = keyword_undefined;
                    }
                }
            }
        }
        self._resetCache();
    };
    DataValidationManager.prototype._onRowsRemoved = function (row, rowCount) {
        this._removeData(row, rowCount, true);
    };
    DataValidationManager.prototype._onColumnsRemoved = function (col, colCount) {
        this._removeData(col, colCount, false);
    };
    DataValidationManager.prototype.toJSON = function (context) {
        var validators = this._validators, result = [];
        for (var key in validators) {
            var validator = validators[key];
            if (validator) {
                result.push(validator.toJSON(context));
            }
        }
        return result;
    };
    DataValidationManager.prototype.fromJSON = function (settings, noSchema, context) {
        var self = this, sheet = self._worksheet;
        self._validators = {};
        if (settings && settings.length) {
            settings.forEach(function (json) {
                var validator = new DefaultDataValidator();
                validator.fromJSON(json, noSchema, context);
                validator._sheet = sheet;
                self._validators[validator.id] = validator;
            });
            self._resetCache();
        }
    };

    DataValidationManager.prototype._importValidator = function (row, col, validator) {
        this._worksheet.setDataValidator(row, col, validator);
    };
    return DataValidationManager;
}());
$.extend(Core_1._SheetModelManager.prototype, {
    _backupValidations: function () {
        var self = this;
        var changes = self._changes;
        if (changes && !changes._originalValidators) {
            var validators = self._validations._validators;
            var originalValidators = [];
            for (var key in validators) {
                var item = validators[key];
                if (item) {
                    var ranges = item._ranges.map(function (range) {
                        return createRange(range.row, range.col, range.rowCount, range.colCount);
                    });
                    originalValidators.push({
                        validator: item,
                        ranges: ranges
                    });
                }
            }
            changes._originalValidators = originalValidators;
        }
    },
    _restoreValidations: function (originalValidators) {
        if (originalValidators) {
            var validations = this._validations;
            var validators_2 = {};
            originalValidators.forEach(function (item) {
                var validator = item.validator;
                validator._ranges = item.ranges;
                if (validator.condition()) {
                    validator.condition().ranges(validator._ranges);
                }
                validators_2[validator.id] = validator;
            });
            validations._validators = validators_2;
            validations._resetCache(false);
        }
    },
    _onRowsAdded_Validator: function (row, rowCount, affectRanges, isFromTable) {
        this._backupValidations();
        this._validations._onRowsAdded(row, rowCount, affectRanges, isFromTable);
    },
    _onRowsRemoved_Validator: function (row, rowCount) {
        this._backupValidations();
        this._validations._onRowsRemoved(row, rowCount);
    },
    _onColumnsAdded_Validator: function (col, colCount, affectRanges) {
        this._backupValidations();
        this._validations._onColumnsAdded(col, colCount, affectRanges);
    },
    _onColumnsRemoved_Validator: function (col, colCount) {
        this._backupValidations();
        this._validations._onColumnsRemoved(col, colCount);
    },
    _onClear_Validator: function (range) {
        this._backupValidations();
        this._validations._removeCacheByRange(range);
    },
    _onSetRowColumnCount_Validator: function () {
        this._backupValidations();
        this._validations._resetCache();
    }
});
Core_1._SheetModelManager._registerFeature('validator', {
    init: function () {
        this._validations = new DataValidationManager(this._sheet);
    },
    undo: function (changes) {
        var originalValidations = changes._originalValidators;
        if (originalValidations) {
            this._restoreValidations(originalValidations);
        }
    },
    dispose: function (args) {
        var clearCache = args && args.clearCache;
        if (clearCache !== false) {
            if (this._validations) {
                this._validations._dispose();
                this._validations = keyword_null;
            }
        }
    }
});
Core_1.Worksheet._registerFeature('validator', {
    init: function () {
        var self = this;
        self._validations = self._modelManager._validations;
        self._unbind(Core_1.Events.FloatingElementSelected + VALIDATOR_NS);
        self._bind(Core_1.Events.FloatingElementSelected + VALIDATOR_NS, function (info, data) {
            if (data.type !== 'worksheet') {
                self._disposeValidationUI();
            }
        });
    },
    dispose: function (argus) {
        var self = this;
        self._disposeValidationUI();
        argus.clearCache && self._validations._clear();
        if (argus.clearCache !== false) {
            self._unbind(Core_1.Events.FloatingElementSelected + VALIDATOR_NS);
        }
    },
    onLayoutChanged: function (e) {
        var changeType = e.changeType;
        var row = e.row;
        var rowCount = e.rowCount;
        var col = e.col;
        var colCount = e.colCount;
        var sheetArea = e.sheetArea;
        var modelManager = this._modelManager;
        var tableManager = this.tables;
        if (changeType === 'addRows') {
            modelManager._onRowsAdded_Validator(row, rowCount, tableManager && tableManager._getTableListRanges(row, -1, rowCount, -1, true ));
        }
        else if (changeType === 'deleteRows') {
            modelManager._onRowsRemoved_Validator(row, rowCount);
        }
        else if (changeType === 'addColumns') {
            modelManager._onColumnsAdded_Validator(col, colCount, tableManager && tableManager._getTableListRanges(-1, col, -1, colCount, false ));
        }
        else if (changeType === 'deleteColumns') {
            modelManager._onColumnsRemoved_Validator(col, colCount);
        }
        else if (changeType === 'clear') {
            if (sheetArea === 3 && (e.type & 2 ) === 2) {
                modelManager._onClear_Validator(createRange(row, col, rowCount, colCount));
            }
        }
        else if (changeType === 'setColumnCount' || changeType === 'setRowCount') {
            if (sheetArea === 3 || sheetArea === 1 ) {
                modelManager._onSetRowColumnCount_Validator();
            }
        }
    },
    toJson: function (data, serializationOption) {
        var validations = this._validations;
        var ignoreStyle = serializationOption && serializationOption.ignoreStyle;
        if (validations && !ignoreStyle) {
            var validators = validations.toJSON(this);
            if (validators && validators.length) {
                data.validations = validators;
            }
        }
    },
    fromJson: function (data, noSchema, deserializationOptions) {
        var ignoreStyle = deserializationOptions && deserializationOptions.ignoreStyle;
        if (data && data.validations && !ignoreStyle) {
            var obj = data.validations;
            this._validations.fromJSON(obj, noSchema, this);
        }
    }
});

Core_1.Style._registerFeature('validator', {
    fromJson: function (arg) {
        if (arg.p === 'validator') {
            var validator = new DefaultDataValidator();
            validator.fromJSON(arg.v, arg.noSchema, arg.context);

            this.validator = validator;
            arg.r = true;
        }
    }
});

WINDOW._gcGlobal._clickOutsideSheetCallBack.push(function (activeElement, hitElement) {
    if (!hitElement && activeElement._disposeValidationUI) {
        activeElement._disposeValidationUI();
    }
});
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

/***/ 'ConditionalFormatting':
/*!*********************************************************!*\
  !*** external "GC.Spread.Sheets.ConditionalFormatting" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.Sheets.ConditionalFormatting;
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
/***/ })

/******/ });
    return GC;
};
//# sourceMappingURL=gc.spread.sheets.datavalidation.14.2.5.js.map