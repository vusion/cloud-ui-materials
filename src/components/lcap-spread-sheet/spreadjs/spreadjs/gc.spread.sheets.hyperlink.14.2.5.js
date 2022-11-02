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
  var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['Hyperlink'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/hyperlink/hyperlink.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/hyperlink/hyperlink.js':
/*!*********************************************!*\
  !*** ./dist/plugins/hyperlink/hyperlink.js ***!
  \*********************************************/
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
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var getFontHeight = Core_1._util._getFontHeight;
var _createElement = Core_1._util._createElement;
var getHAlignByValueType = Core_1._util._getHAlignByValueType;
var $ = Core_1.GC$;
var ActionBase = Core_1.Commands.ActionBase;
var BaseCellType = Core_1.CellTypes.Base;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var cloneObject = Common_1.Common._Types._cloneObject;
var escapeJavascript = Common_1.Common._StringHelper._escapeJavascript;
var ColorHelper = Common_1.Common._ColorHelper;
var keyword_undefined = undefined;
var keyword_null = null, Math_max = Math.max, Math_min = Math.min, Math_floor = Math.floor, window_open = window.open, startsWith = Common_1.Common._StringHelper._startsWith;
var cssPosition = 'position', cssAbsolute = 'absolute', cssMargin = 'margin', cssFont = 'font', cssLeft = 'left', cssTop = 'top', cssPadding = 'padding', cssBorder = 'border', cssBoxSizing = 'box-sizing', cssPointer = 'pointer', cssBackgroundColor = 'background-color', cssContentBox = 'content-box', cssDefault = 'default', cssWhite = 'white', STR_DIV = 'div', HYPERLINK_TOOLTIP_CLASS = 'gc-spread-hyperlink-tooltip', defaultLinkColor = 'hyperlink', defaultVisitedLinkColor = 'followedHyperlink';
var HYPERLINK = 'hyperlink', OPEN_URL = 'openUrl', GENERATE_HYPERLINK = 'generateHyperlink';
var sjsRefExp = /^sjs:\/\/\w+[\!]\w+([\:]\w+)?/;


var emailExp = /^(mailto:\/\/)?([A-Za-z0-9_\-\.\!\#$%&'*\+/=?^`{|}~])+\@([A-Za-z0-9\-])+\.([A-Za-z0-9\-]){2,63}(\?subject=.+)?$/gi;
var urlExp = /(((ht|f)tp(s?)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|((ht|f)tp(s?)):\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;


var HyperlinkTargetType;
(function (HyperlinkTargetType) {
    HyperlinkTargetType[HyperlinkTargetType['blank'] = 0] = 'blank';

    HyperlinkTargetType[HyperlinkTargetType['self'] = 1] = 'self';

    HyperlinkTargetType[HyperlinkTargetType['parent'] = 2] = 'parent';

    HyperlinkTargetType[HyperlinkTargetType['top'] = 3] = 'top';
})(HyperlinkTargetType = exports.HyperlinkTargetType || (exports.HyperlinkTargetType = {}));
Core_1.GC$.extend(Core_1._SheetModelManager.prototype, {
    getHyperlink: function (row, col, sheetArea) {
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3 ;
        }
        var self = this;
        var node = self._getSheetModel(sheetArea)._getNode(row, col);
        if (node && !isNullOrUndefined(node.hyperlink)) {
            return node.hyperlink;
        }
        return keyword_null;
    },
    setHyperlink: function (row, col, value, sheetArea) {
        var self = this;
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3 ;
        }
        var url = value && value.url;
        if (url && url.match(urlExp) && url.match(urlExp).length > 0) {
            var wwwPrefix = 'www.';
            if (startsWith(url, wwwPrefix)) {
                value.url = 'http://' + url;
            }
        }
        else if (url && url.match(emailExp) && url.match(emailExp).length > 0) {
            var emailPrefix = 'mailto:';
            if (!startsWith(url, emailPrefix)) {
                value.url = emailPrefix + url;
            }
        }
        var changeInfo = self._inTransaction > 0 ? [['sheetModels', sheetArea], keyword_undefined] : keyword_undefined;
        var node = self._getSheetModel(sheetArea)._getNode(row, col, true, changeInfo ? changeInfo[0] : keyword_undefined);
        if (!isNullOrUndefined(node)) {
            var oldHyperlinkInfo = node.hyperlink;
            if (isNullOrUndefined(value)) {
                node.hyperlink = null;
                delete node.hyperlink;
            }
            else {
                node.hyperlink = {
                    url: '',
                    linkColor: keyword_undefined,
                    visitedLinkColor: keyword_undefined,
                    tooltip: '',
                    target: 0 ,
                    drawUnderline: true,
                    isVisited: false,
                    command: ''
                };
                for (var key in node.hyperlink) {
                    if (value[key] !== keyword_undefined) {
                        node.hyperlink[key] = value[key];
                    }
                }
            }
            if (changeInfo) {
                changeInfo[0].push('hyperlink');
                changeInfo[1] = oldHyperlinkInfo;
            }
        }
        else if (changeInfo) {
            changeInfo.length = 0;
        }
        if (changeInfo && changeInfo.length > 0) {
            self._changes.push(changeInfo);
        }
    }
});
Core_1.GC$.extend(Core_1.Worksheet.prototype, {


    getHyperlink: function (row, col, sheetArea) {
        if (sheetArea === 0 ) {
            return keyword_null;
        }
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3 ;
        }
        var self = this;
        var modelManager = self._modelManager;
        return cloneObject(modelManager.getHyperlink(row, col, sheetArea));
    },


    setHyperlink: function (row, col, value, sheetArea) {
        if (sheetArea === 0 ) {
            return;
        }
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3 ;
        }
        var self = this;
        var modelManager = self._modelManager;
        var rowCount = modelManager.getRowCount(sheetArea), colCount = modelManager.getColumnCount(sheetArea);
        if (row < 0 || row >= rowCount || col < 0 || col >= colCount) {
            return;
        }
        modelManager.do('setHyperlink', row, col, value, sheetArea);

        this._invalidate();
    }
});
var HyperlinkOpenUrlAction = (function (_super) {
    __extends(HyperlinkOpenUrlAction, _super);
    function HyperlinkOpenUrlAction(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    HyperlinkOpenUrlAction.prototype.execute = function () {
        var self = this, sheet = self._sheet, ret = false;
        var link = self._command.url;
        if (isNullOrUndefined(link)) {
            return ret;
        }
        var targetValue = self._command.target || 0 ;
        var locationPrefix = 'sjs://';
        if (link.indexOf(locationPrefix) === 0 || link[0] === '#') {
            var locationPrefixLen = locationPrefix.length;
            var locate = link[0] === '#' ? link.substr(1) : link.substr(locationPrefixLen);
            var ref = SheetsCalc_1.formulaToRanges(sheet, locate, 0, 0, true);
            if (ref && ref.length > 0) {
                var selectedSheet = ref[0].sheetName;
                var range = ref[0].ranges[0];
                if (selectedSheet !== sheet.name()) {
                    var spread = sheet.parent, oldSheet = sheet;
                    var newSheet = spread.getSheetFromName(selectedSheet);
                    var activeArgs = {
                        oldSheet: oldSheet,
                        newSheet: newSheet,
                        cancel: false
                    };
                    spread._trigger(Core_1.Events.ActiveSheetChanging, activeArgs);
                    if (activeArgs.cancel) {
                        return;
                    }
                    spread.setActiveSheet(selectedSheet);
                    var index = spread.getActiveSheetIndex();
                    spread._tabStrip._scrollTabToView(index);
                    sheet = spread.getActiveSheet();
                    if (oldSheet !== sheet) {
                        spread._trigger(Core_1.Events.ActiveSheetChanged, {
                            oldSheet: oldSheet,
                            newSheet: sheet
                        });
                    }
                }
                sheet._scrollByMoveCell(range.row + range.rowCount, range.col + range.colCount);
                sheet.setSelection(range.row, range.col, range.rowCount, range.colCount);
            }
        }
        else {
            if (!isNullOrUndefined(link)) {
                var emailPrefix = 'mailto:';
                if (link.match(urlExp) && link.match(urlExp).length > 0) {
                    var wwwPrefix = 'www.';
                    if (startsWith(link, wwwPrefix)) {
                        link = 'http://' + link;
                    }
                }
                else if (link.match(emailExp) && link.match(emailExp).length > 0) {
                    if (!startsWith(link, emailPrefix)) {
                        link = emailPrefix + link;
                    }
                }
                if (startsWith(link, emailPrefix) && Common_1.Common._StringHelper._count(link, '?') > 1) {
                    var arr = link.split('?');
                    link = arr[0] + '?' + arr.slice(1).join('%3F');
                }
                window_open(escapeJavascript(link), ['_blank', '_self', '_parent', '_top'][targetValue]);
            }
        }
        return ret;
    };
    return HyperlinkOpenUrlAction;
}(ActionBase));


Core_1.Commands[OPEN_URL] = {
    canUndo: false,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, HyperlinkOpenUrlAction, options, isUndo);
    }
};
var AutoGenerateHyperlinkUndoAction = (function (_super) {
    __extends(AutoGenerateHyperlinkUndoAction, _super);
    function AutoGenerateHyperlinkUndoAction(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    AutoGenerateHyperlinkUndoAction.prototype.execute = function () {
        var self = this;
        var sheet = self._sheet;
        var _a = self._command, url = _a.url, row = _a.row, col = _a.col, sheetArea = _a.sheetArea;
        var tempURL;
        if (url === null) {
            tempURL = null;
        }
        else if (typeof url === 'string') {
            var match = url.match(urlExp);
            if (!match || match.length < 1) {
                match = url.match(emailExp);
                if (!match || match.length < 1) {
                    match = url.match(sjsRefExp);
                }
            }
            if (match && match.length > 0 && url.indexOf(match[0]) === 0 && url.length === match[0].length) {
                tempURL = { url: url, linkColor: defaultLinkColor, visitedLinkColor: defaultVisitedLinkColor };
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        sheet._modelManager.startTransaction();
        sheet.suspendPaint();
        sheet.suspendEvent();
        sheet.setHyperlink(row, col, tempURL, sheetArea);
        sheet.resumeEvent();
        sheet.resumePaint();
        var changesKey = Core_1.Commands._getChangesKey(sheet.name());
        self._command[changesKey] = sheet._modelManager.endTransaction();
        return true;
    };
    AutoGenerateHyperlinkUndoAction.prototype.undo = function () {
        var self = this;
        var sheet = self._sheet;
        sheet.suspendPaint();
        sheet.suspendEvent();
        var changesKey = Core_1.Commands._getChangesKey(sheet.name());
        sheet._modelManager.undo(this._command[changesKey]);
        sheet.resumeEvent();
        sheet.resumePaint();
        return true;
    };
    return AutoGenerateHyperlinkUndoAction;
}(ActionBase));
Core_1.Commands[GENERATE_HYPERLINK] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, AutoGenerateHyperlinkUndoAction, options, isUndo);
    }
};
var workbookAdapter = {
    init: function () {
        this.commandManager().register(OPEN_URL, Core_1.Commands[OPEN_URL]);
        this.commandManager().register(GENERATE_HYPERLINK, Core_1.Commands[GENERATE_HYPERLINK]);
    }
};
Core_1.Workbook._registerFeature(HYPERLINK, workbookAdapter);
var worksheetAdapter = {
    setHyperlinkWhenEditing: function (args) {
        var url = args.url, row = args.row, col = args.col, sheetArea = args.sheetArea;
        var sheet = this, spread = sheet.getParent();
        if (spread.options.allowAutoCreateHyperlink) {
            spread.commandManager().execute({
                cmd: GENERATE_HYPERLINK,
                sheetName: sheet.name(),
                url: url,
                row: row,
                col: col,
                sheetArea: sheetArea,
            });
        }
    },
};
Core_1.Worksheet._registerFeature(HYPERLINK, worksheetAdapter);
var baseCellTypeAdapter = {
    applyHyperlinkStyle: function (args) {
        var style = args.style, hyperlinkInfo = args.sheet.getHyperlink(args.row, args.col, args.sheetArea);
        !_unsupportedCellType(style) && _updateHyperlinkStyle(style, hyperlinkInfo);
    },
    getCellTextHitInfo: function (args) {
        var sheetArea = args.context.sheetArea, style = args.cellStyle, context = args.context, sheet = context.sheet, row = context.row, col = context.col;
        if (!_isHyperlink(sheet, row, col, sheetArea) || _unsupportedCellType(style)) {
            return;
        }

        var cellRect = args.cellRect;
        if (cellRect) {
            var rowViewportIndex = sheet._getRowViewportIndex(row), colViewportIndex = sheet._getColumnViewportIndex(col);
            var sheetLayout = sheet._getSheetLayout(), clipRect = void 0;

            if (isNullOrUndefined(sheetArea) || sheetArea === 3 ) {
                clipRect = sheetLayout._viewportRect(rowViewportIndex, colViewportIndex);
            }
            else if (sheetArea === 2 ) {
                clipRect = sheetLayout._rowHeaderRect(rowViewportIndex);
            }
            else if (sheetArea === 1 ) {
                clipRect = sheetLayout._colHeaderRect(colViewportIndex);
            }
            if (clipRect) {
                cellRect = cellRect.getIntersectRect(clipRect);
            }
        }
        if ((!isNullOrUndefined(sheetArea) || sheetArea === 3 ) && style && cellRect) {
            var text = sheet.getText(row, col, sheetArea);
            args.paddingHitInfo = {
                row: row,
                col: col,
                x: args.x,
                y: args.y,
                sheetArea: sheetArea,
                sheet: sheet,
                isFocusAware: true,
                isReservedLocation: isHitHyperlink(args.x, args.y, style, cellRect, context, text)
            };
        }
    },
    processMouseUpOnCellPadding: function (hitInfo) {
        var sheet = hitInfo.sheet, style = hitInfo.cellStyle, row = hitInfo.row, col = hitInfo.col, sheetArea = hitInfo.sheetArea;
        if (!sheet || sheet.isEditing() || !_isHyperlink(sheet, row, col, sheetArea) || _unsupportedCellType(style)) {
            return;
        }
        if (hitInfo.isReservedLocation) {
            var canvas = sheet._getCanvas();
            _hideLinkToolTip(sheet);
            if (canvas) {
                canvas.style.cursor = cssDefault;
            }
            var hyperlink = sheet._modelManager.getHyperlink(row, col, sheetArea);
            hyperlink.isVisited = true;
            var customPassedCommand = hyperlink.command;
            if (!isNullOrUndefined(customPassedCommand) && customPassedCommand !== '' && customPassedCommand !== OPEN_URL) {
                if (typeof customPassedCommand === 'string') {
                    sheet.getParent().commandManager().execute({ cmd: customPassedCommand, row: row, col: col, sheetName: sheet.name(), sheetArea: sheetArea });
                }
                else if (typeof customPassedCommand === 'function') {
                    customPassedCommand.call(keyword_null, sheet, row, col, sheetArea);
                }
            }
            else {
                sheet.getParent().commandManager().execute({
                    cmd: OPEN_URL,
                    sheetName: sheet.name(),
                    url: hyperlink.url,
                    target: hyperlink.target
                });
            }

            var colCount = sheet.getColumnCount();
            var rectRange = new Core_1.Range(row, -1, 1, colCount);
            sheet.repaint(sheet.getRangeRect(1, 1, rectRange));
        }
    },
    processMouseMoveOnCellPadding: function (hitInfo) {
        var row = hitInfo.row, col = hitInfo.col, sheet = hitInfo.sheet, style = hitInfo.cellStyle, sheetArea = hitInfo.sheetArea;
        if (!_isHyperlink(sheet, row, col, sheetArea) || _unsupportedCellType(style)) {
            return;
        }
        if (!sheet || sheet.isEditing() && sheet.getActiveRowIndex() === row && sheet.getActiveColumnIndex() === col) {
            return;
        }
        var canvas = sheet._getCanvas();
        var hyperlinkInfo = sheet.getHyperlink(row, col, sheetArea);
        if (hitInfo.isReservedLocation) {
            if (canvas) {
                _showLinkToolTip(sheet, hitInfo, hyperlinkInfo.tooltip);
                canvas.style.cursor = cssPointer;
            }
        }
        else {
            _hideLinkToolTip(sheet);
            if (canvas) {
                canvas.style.cursor = cssDefault;
            }
        }
        return;
    },
    processMouseLeaveOnCellPadding: function (hitInfo) {
        var sheet = hitInfo.sheet, row = hitInfo.row, col = hitInfo.col, sheetArea = hitInfo.sheetArea;
        _hideLinkToolTip(sheet);
        if (!_isHyperlink(sheet, row, col, sheetArea)) {
            return;
        }
        if (sheet) {
            var canvas = sheet._getCanvas();
            if (canvas) {
                canvas.style.cursor = cssDefault;
            }
        }
        return;
    },
    onUpdateContainer: function (args) {
        var style = args.cellStyle, row = args.context.row, col = args.context.col;
        var hyperlinkInfo = args.context.sheet.getHyperlink(row, col);
        !_unsupportedCellType(style) && _updateHyperlinkStyle(style, hyperlinkInfo);
    }
};
BaseCellType._registerFeature(HYPERLINK, baseCellTypeAdapter);
function _isHyperlink(sheet, row, col, sheetArea) {
    if (isNullOrUndefined(sheetArea)) {
        sheetArea = 3 ;
    }
    return !isNullOrUndefined(sheet.getHyperlink(row, col, sheetArea));
}
function _getLinkToolTipElement() {
    var div = _createElement(STR_DIV);
    $(div).css(cssPosition, cssAbsolute).css(cssMargin, 0).css(cssPadding, 2).css(cssBorder, '1px #c0c0c0 solid')
        .css('box-shadow', '1px 2px 5px rgba(0,0,0,0.4)').css(cssBoxSizing, cssContentBox)
        .css(cssBackgroundColor, cssWhite).css(cssFont, '9pt Arial');
    return div;
}
function _showLinkToolTip(sheet, hitInfo, tooltip) {
    if (tooltip) {
        var host = sheet && sheet._getHost();
        var tip = host.getElementsByClassName(HYPERLINK_TOOLTIP_CLASS)[0];
        var isFirstCreateTipDom = false;
        if (isNullOrUndefined(tip)) {
            tip = _getLinkToolTipElement();
            tip.className = HYPERLINK_TOOLTIP_CLASS;
            host.insertBefore(tip, keyword_null);
            isFirstCreateTipDom = true;
        }
        var $tip = $(tip);
        if (isFirstCreateTipDom || !$tip.isVisible()) {
            $tip.text(tooltip);
            var offset = sheet._eventHandler._getCanvasPosition();
            var left = offset.left + hitInfo.x;
            var top_1 = offset.top + hitInfo.y + 20 ;
            $tip.css(cssTop, top_1).css(cssLeft, left);
            $tip.show();
        }
    }
}
function _hideLinkToolTip(sheet) {
    var host = sheet && sheet._getHost();
    var tip = host.getElementsByClassName(HYPERLINK_TOOLTIP_CLASS)[0];
    if (!isNullOrUndefined(tip)) {
        $(tip).hide();
    }
}
function _updateHyperlinkStyle(style, hyperlink) {
    if (isNullOrUndefined(hyperlink)) {
        return;
    }
    if (hyperlink.drawUnderline) {
        if (isNullOrUndefined(style.textDecoration)) {
            style.textDecoration = 1 ;
        }
        else if (style.textDecoration !== 0 && (style.textDecoration & 1 ) !== 1 ) {
            style.textDecoration += 1;
        }
    }
    if (hyperlink.isVisited) {
        if (hyperlink.visitedLinkColor === keyword_null) {
            style.foreColor = 'rgba(0,0,0,0)';
        }
        else if (hyperlink.visitedLinkColor === keyword_undefined) {
            style.foreColor = defaultVisitedLinkColor;
        }
        else {
            style.foreColor = hyperlink.visitedLinkColor;
        }
    }
    else {
        if (!isNullOrUndefined(hyperlink.linkColor)) {
            style.foreColor = hyperlink.linkColor;
        }
        else if (hyperlink.linkColor === keyword_undefined && style.foreColor) {

        }
        else {
            style.foreColor = defaultLinkColor;
        }
    }
}
var reservedType = {
    0: true ,
    1: true ,
    2: true ,
    3: true ,
    4: true
};
function _unsupportedCellType(style) {
    if (style && style.cellType) {
        var typeName = style.cellType.typeName;
        if (!reservedType[typeName]) {
            return true;
        }
    }
    return false;
}
function calcPosition(cellRect, editorWidth, editorHeight, hAlign, vAlign, indent, context) {
    var x = 0;
    var y = 0;
    var width = cellRect.width;
    var height = cellRect.height;
    var outlineColumnOffset = getOutlineColumnOffset(context);
    if (outlineColumnOffset) {
        width -= outlineColumnOffset;
    }
    x = indent = indent || 0;
    if (hAlign === 1 ) {
        x = (width - editorWidth) / 2;
    }
    else if (hAlign === 2 ) {
        x = width - editorWidth - indent;
    }
    if (vAlign === 1 ) {
        y = (height - editorHeight) / 2;
    }
    else if (vAlign === 2 ) {
        y = height - editorHeight;
    }
    if (outlineColumnOffset) {
        x += outlineColumnOffset;
    }
    return { x: x, y: y };
}
function getOutlineColumnOffset(context) {
    var args = {
        context: context,
        value: 0
    };
    BaseCellType._callFeatureHandler(context.sheet, 'getOutlineColumnOffset', args);
    return args.value;
}
function getLinkRect(text, font) {
    var lineHeight = getFontHeight(font);
    var width = Math_max(0, Core_1._WordWrapHelper._measureText(text, font, true));
    var height = text.split(/\r\n|\r|\n/).length * lineHeight;
    return { x: 0, y: 0, width: width, height: height };
}
function getLinkRectForIsHitTest(text, hAlign, vAlign, font, cellRect, indent, context) {
    var ret = getLinkRect(text, font);
    var p = calcPosition(cellRect, ret.width, ret.height, hAlign, vAlign, indent, context);
    ret.x = p.x;
    ret.y = p.y;
    return ret;
}
function isHitHyperlink(x, y, cellStyle, cellRect, context, text) {
    var sheet = context.sheet, render = sheet._render;
    if (isNullOrUndefined(cellStyle)) {
        return false;
    }
    else if (cellStyle.textOrientation) {
        return true;
    }
    var value = sheet.getValue(context.row, context.col, context.sheetArea);
    if (!text) {
        text = sheet.getText(context.row, context.col, context.sheetArea);
    }
    if (!text) {
        return false;
    }
    text = text.replace(/\s+/g, ' ');
    var font = cellStyle && cellStyle.font ? cellStyle.font : render._getDefaultFont();
    font = render._getZoomFont(font);
    var lines = [text];
    var indent = getTextIndent(cellStyle);
    if (cellStyle.wordWrap) {
        lines = Core_1._WordWrapHelper._getWrapInfo(text, cellRect.width - 3 - indent, font);
        text = lines.join('\r\n');
    }
    var hAlign = cellStyle.hAlign, vAlign = cellStyle.vAlign;
    if (hAlign === 3 ) {
        hAlign = getHAlignByValueType(hAlign, value, cellStyle.formatter);
    }
    var LinkRectDiv = getLinkRectForIsHitTest(text, hAlign, vAlign, font, cellRect, indent, context);
    var y2 = cellRect.y + LinkRectDiv.y;
    for (var i = 0; i < lines.length; i++) {
        var linkRect = getLinkRectForIsHitTest(lines[i], hAlign, vAlign, font, cellRect, indent, context);
        var x1 = cellRect.x + linkRect.x;
        var x2 = Math_min(x1 + linkRect.width, cellRect.x + cellRect.width);
        var y1 = y2;
        y2 = Math_min(y1 + linkRect.height, cellRect.y + cellRect.height);
        if (x1 <= x && x < x2 && y1 <= y && y < y2) {
            return true;
        }
    }
    return false;
}
function getTextIndent(style) {
    return (style.textIndent || 0) * 8;
}
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
/***/ })

/******/ });
  return GC;
};
//# sourceMappingURL=gc.spread.sheets.hyperlink.14.2.5.js.map