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
  var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['Fill'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/fill/fill.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/fill/drag-fill.js':
/*!****************************************!*\
  !*** ./dist/plugins/fill/drag-fill.js ***!
  \****************************************/
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
var fill_1 = __webpack_require__(/*! ./fill */ './dist/plugins/fill/fill.js');
var fill_ns_1 = __webpack_require__(/*! ./fill.ns */ './dist/plugins/fill/fill.ns.js');
var CalcEngine = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var _supportsCalc = !!CalcEngine;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined, keyword_null = null, keyword_undefined = void 0, createRange = Core_1._createRange, $ = Core_1.GC$, Math_max = Math.max, Math_floor = Math.floor;
var ActionBase = Core_1.Commands.ActionBase, ChangedCells = Core_1.Commands._ChangedCells, raiseRangeDataChanged = Core_1.Commands._raiseRangeDataChanged;
var ALL_OPTION = 2047 , START_RANGE = 'startRange', FILL_RANGE = 'fillRange', AUTO_FILL_TYPE = 'autoFillType', FILL_DIRECTION = 'fillDirection', CANCEL = 'cancel', FILL = 'fill', DRAG_DROP = 'dragDrop', $_isEmptyObject = $.isEmptyObject;
var rm = new Common_1.Common.ResourceManager(fill_ns_1.SR, 'Fill');
var getSR = rm.getResource.bind(rm);
function getRowCount(obj) {
    return obj.rowCount;
}
function getColCount(obj) {
    return obj.colCount;
}
function getSheetRowCount(sheet, sheetArea) {
    return sheet.getRowCount(sheetArea);
}
function getSheetColumnCount(sheet, sheetArea) {
    return sheet.getColumnCount(sheetArea);
}

function checkFillRange(startRange, wholeRange, series, direction) {
    if (!startRange || !wholeRange || !wholeRange.containsRange(startRange)) {
        return false;
    }
    if (!isNullOrUndefined(series)) {
        if (series === 1 && startRange.row === wholeRange.row && getRowCount(startRange) === getRowCount(wholeRange) ||
            series === 0 && startRange.col === wholeRange.col && getColCount(startRange) === getColCount(wholeRange)) {
            return true;
        }
    }
    if (!isNullOrUndefined(direction)) {
        if ((direction === 2 || direction === 3 ) && startRange.col === wholeRange.col && getColCount(startRange) === getColCount(wholeRange) ||
            (direction === 0 || direction === 1 ) && startRange.row === wholeRange.row && getRowCount(startRange) === getRowCount(wholeRange)) {
            return true;
        }
    }
    return false;
}
var sheetEx = {


    fillAuto: function (startRange, wholeRange, options) {
        if (!wholeRange) {
            throw new Error(getSR().Exp_RangeIsNull);
        }
        var self = this, fillType = options.fillType, series = options.series, direction = options.direction, step = options.step, stop = options.stop, fill = new fill_1._FillImp(self), originalTableRangesBeforeExpand = options._originalTableRangesBeforeExpand;
        if (!checkFillRange(startRange, wholeRange, direction ? keyword_null : series, direction)) {
            return;
        }
        self.suspendPaint();
        if (startRange) {
            self._eventHandler._dragFillStartRange = startRange;
        }
        try {
            if (fillType === 4 ) {
                fill._fillAuto(wholeRange, series, false, options.withTag, options.withoutStyle, originalTableRangesBeforeExpand);
            }
            else if (fillType === 0 ) {
                fill._fillAutoByDirection(wholeRange, direction);
            }
            else if (fillType === 1 || fillType === 2 ) {
                fill._fillLinearOrGrowth(fillType === 1, wholeRange, series, step, stop);
            }
            else if (fillType === 3 ) {
                fill._seriesFillRange(wholeRange, series, 3 , step, isNullOrUndefined(stop) ? keyword_null : Common_1.Common._DateTimeHelper._toOADate(stop), options.unit);
            }
        }
        finally {
            self.resumePaint();
        }
    }
};
$.extend(Core_1.Worksheet.prototype, sheetEx);


Core_1.Worksheet._registerFeature(FILL, {
    init: function () {
        this._ruleFilter = new fill_1._RuleFilter(this);
    },
    setHost: function (host) {
        if (!host) {
            return;
        }
        var commands = this._commandManager();
        if (!commands[FILL]) {
            commands.register(FILL, Core_1.Commands[FILL]);
        }
        if (!commands[DRAG_DROP]) {
            commands.register(DRAG_DROP, Core_1.Commands[DRAG_DROP]);
        }
    },
    dispose: function (args) {
        if (args.clearCache !== false) {
            var self_1 = this;
            if (self_1._ruleFilter) {
                self_1._ruleFilter._dispose();
                self_1._ruleFilter = keyword_null;
            }
        }
    }
});
Core_1.Workbook._registerFeature(FILL, {
    onCultureChanged: function () {
        getSR();
    }
});


var DragFillUndoAction = (function (_super) {
    __extends(DragFillUndoAction, _super);
    function DragFillUndoAction(sheet, dragFillExtent) {
        var _this = _super.call(this) || this;
        var self = _this, fillDirection = dragFillExtent[FILL_DIRECTION], isLeftDirection = fillDirection === 0 , isLeftOrRightDirection = isLeftDirection || fillDirection === 1 , fillRange = dragFillExtent[FILL_RANGE], startRange = dragFillExtent[START_RANGE], startRange_row = startRange.row, startRange_col = startRange.col, startRange_rowCount = getRowCount(startRange), startRange_colCount = getColCount(startRange);
        self._sheet = sheet;
        self._dragFillExtent = dragFillExtent;
        if (dragFillExtent[AUTO_FILL_TYPE] === 4 ) {
            self._clearValueUndoAction = new Core_1.Commands._ClearValueUndoAction(sheet, { ranges: [dragFillExtent[FILL_RANGE]] });
        }
        else if (isLeftOrRightDirection) {
            self._wholeFillRange = createRange(startRange_row, isLeftDirection ? fillRange.col : startRange_col, startRange_rowCount, startRange_colCount + getColCount(fillRange));
        }
        else {
            self._wholeFillRange = createRange(fillDirection === 2 ? fillRange.row : startRange_row, startRange_col, startRange_rowCount + getRowCount(fillRange), startRange_colCount);
        }
        self._fillSeries = isLeftOrRightDirection ? 1 : 0 ;
        return _this;
    }
    DragFillUndoAction.prototype.canExecute = function () {
        var self = this, sheet = self._sheet, dragFillExtent = self._dragFillExtent, startRange = dragFillExtent[START_RANGE], fillRange = dragFillExtent[FILL_RANGE];
        if (!sheet._canChange(fillRange.row, fillRange.col, getRowCount(fillRange), getColCount(fillRange), undefined, undefined, undefined, undefined, true)) {
            return false;
        }
        return dragFillExtent[AUTO_FILL_TYPE] === 4 ? true : !fillRange.intersect(startRange.row, startRange.col, getRowCount(startRange), getColCount(startRange));
    };
    DragFillUndoAction.prototype.execute = function () {
        var self = this;
        if (self.canExecute()) {
            var dragFillExtent = self._dragFillExtent, fillRange = dragFillExtent[FILL_RANGE], sheet = self._sheet;
            sheet._modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                if (_supportsCalc) {
                    sheet.suspendCalcService();
                }
                var oldSelections = sheet.getSelections();
                if (!sheet.isDirtySuspended()) {
                    self._savedBeforeFillChangedCells = new ChangedCells(sheet, dragFillExtent[FILL_RANGE], ALL_OPTION);
                }
                if (dragFillExtent[AUTO_FILL_TYPE] === 4 ) {
                    self._executeDragFillClear(sheet);
                }
                else {
                    self._executeDragFill(sheet);
                }
                if (sheet._raiseSelectionChanging(oldSelections, sheet.getSelections())) {
                    sheet._raiseSelectionChanged(oldSelections);
                }
            }
            finally {
                self._afterAction(sheet, true);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                dragFillExtent[changesKey] = sheet._modelManager.endTransaction();
                if (_supportsCalc) {
                    sheet.resumeCalcService(false);
                }


                if (sheet._updateTableSlicer) {
                    sheet._updateTableSlicer(fillRange.row, fillRange.col, getRowCount(fillRange), getColCount(fillRange));
                }
                var changedCells = [];
                if (!sheet.isDirtySuspended()) {
                    self._savedAfterFilledChangedCells = new ChangedCells(sheet, fillRange, ALL_OPTION);
                    self._savedAfterFilledChangedCells._mergeCellsHasDiffData(self._savedBeforeFillChangedCells._getCellsData());
                    changedCells = self._savedAfterFilledChangedCells._getChangedCells();
                }
                raiseRangeDataChanged(sheet, fillRange.row, fillRange.col, getRowCount(fillRange), getColCount(fillRange), changedCells, 1 );
            }
        }
    };
    DragFillUndoAction.prototype._executeDragFillClear = function (sheetView) {
        var self = this;
        self._clearValueUndoAction.execute(sheetView);
        var dragFillExtent = self._dragFillExtent, startRange = dragFillExtent[START_RANGE], clearRange = dragFillExtent[FILL_RANGE], isColumnSeries = self._fillSeries === 0 , newRange, startRange_rowCount = getRowCount(startRange), startRange_colCount = getColCount(startRange), newRowCount = isColumnSeries ? Math_max(1, startRange_rowCount - getRowCount(clearRange)) : startRange_rowCount, newColCount = isColumnSeries ? startRange_colCount : Math_max(1, startRange_colCount - getColCount(clearRange));
        if (!startRange.equals(clearRange)) {
            newRange = createRange(startRange.row, startRange.col, newRowCount, newColCount);
            sheetView._setActiveCellImp(Math_max(sheetView._getFirstVisualRow(), newRange.row), Math_max(sheetView._getFirstVisualColumn(), newRange.col), sheetView._activeRowViewportIndex, sheetView._activeColViewportIndex);
            sheetView._clearSelectionImp();
            sheetView.addSelection(newRange.row, newRange.col, getRowCount(newRange), getColCount(newRange));
        }
    };
    DragFillUndoAction.prototype._executeDragFill = function (sheetView) {
        var self = this, sheet = self._sheet, startRange = self._dragFillExtent[START_RANGE], fillRange = self._dragFillExtent[FILL_RANGE], autoFillType = self._dragFillExtent[AUTO_FILL_TYPE], wholeFillRange = self._wholeFillRange, r, c, fillAutoArgs = {
            fillType: 4 ,
            series: self._fillSeries,
            withTag: true,
        };
        var tables = sheet.tables;
        if (tables) {
            try {
                var originalTableRangesBeforeExpand = [];
                tables._changeValueBesideTable(wholeFillRange, keyword_undefined, keyword_undefined, keyword_undefined, originalTableRangesBeforeExpand);
                if (originalTableRangesBeforeExpand.length > 0) {
                    fillAutoArgs._originalTableRangesBeforeExpand = originalTableRangesBeforeExpand;
                }
            }
            catch (e) {
                sheet._raiseInvalidOperation(6 , e.message);
                sheet.resumePaint();
                return;
            }
        }
        if (autoFillType === 1 ) {
            sheet.fillAuto(startRange, wholeFillRange, fillAutoArgs);


            if (sheet._modelManager._hasSpans(startRange.row, startRange.col, startRange.rowCount, startRange.colCount)) {
                for (r = 0; r < fillRange.rowCount; r++) {
                    for (c = 0; c < fillRange.colCount; c++) {
                        var style = sheet._getStyleObject(startRange.row + Math_floor(r % startRange.rowCount), startRange.col + Math_floor(c % startRange.colCount));
                        if (style && style.clone) {
                            style = style.clone();
                        }
                        sheet._setStyleObject(fillRange.row + r, fillRange.col + c, style);
                    }
                }
            }
        }
        else if (autoFillType === 0 ) {
            var copyToWithoutCommentOption = ALL_OPTION ^ 4 ;
            self._copyCells(startRange, fillRange, copyToWithoutCommentOption);
        }
        else if (autoFillType === 2 ) {
            self._copyCells(startRange, fillRange, 64 | 128 );
        }
        else if (autoFillType === 3 ) {
            var isDragSingleCell = (getRowCount(startRange) === 1 && getColCount(startRange) === 1) && !(startRange.row === -1 && startRange.col !== -1) && !(startRange.col === -1 && startRange.row !== -1);
            if (isDragSingleCell) {
                var noStyleOption = 2 | 8 | 32 | 16 | 128 | 1 ;
                self._copyCells(startRange, fillRange, noStyleOption);
            }
            else {
                fillAutoArgs.withoutStyle = true;
                sheet.fillAuto(startRange, wholeFillRange, fillAutoArgs);
            }
        }
        sheet._setActiveCellImp(Math_max(sheetView._getFirstVisualRow(), wholeFillRange.row), Math_max(sheetView._getFirstVisualColumn(), wholeFillRange.col), sheetView._activeRowViewportIndex, sheetView._activeColViewportIndex);
        if (sheetView._clearSelectionImp) {
            sheetView._clearSelectionImp();
        }
        sheet.addSelection(wholeFillRange.row, wholeFillRange.col, getRowCount(wholeFillRange), getColCount(wholeFillRange));
    };


    DragFillUndoAction.prototype._copyCells = function (fromRange, toRange, copyOption) {
        var self = this, sheet = self._sheet, adjustedFromRange = sheet._getActualRange(fromRange), adjustedToRange = sheet._getActualRange(toRange), adjustedFromRange_row = adjustedFromRange.row, adjustedFromRange_col = adjustedFromRange.col, adjustedFromRange_rowCount = getRowCount(adjustedFromRange), adjustedFromRange_colCount = getColCount(adjustedFromRange), adjustedToRange_row = adjustedToRange.row, adjustedToRange_col = adjustedToRange.col, adjustedToRange_rowCount = getRowCount(adjustedToRange), adjustedToRange_colCount = getColCount(adjustedToRange), fillDirection = self._dragFillExtent[FILL_DIRECTION], isDownDirection = fillDirection === 3 , isRightDirection = fillDirection === 1 , rows = Math_floor(adjustedToRange_rowCount / adjustedFromRange_rowCount), lastCopyRows = adjustedToRange_rowCount % adjustedFromRange_rowCount, columns = Math_floor(adjustedToRange_colCount / adjustedFromRange_colCount), lastCopyColumns = adjustedToRange_colCount % adjustedFromRange_colCount, i, fromRow, fromColumn, toRow, toColumn;
        if (self._fillSeries === 0 ) {
            for (i = 0; i < rows; i++) {
                toRow = isDownDirection ? adjustedToRange_row + i * adjustedFromRange_rowCount : adjustedToRange_row + adjustedToRange_rowCount - (i + 1) * adjustedFromRange_rowCount;
                sheet._copyToCore(adjustedFromRange_row, adjustedFromRange_col, toRow, adjustedToRange_col, adjustedFromRange_rowCount, adjustedFromRange_colCount, copyOption, true, true);
            }
            if (lastCopyRows !== 0) {
                fromRow = isDownDirection ? adjustedFromRange_row : adjustedFromRange_row + (rows + 1) * adjustedFromRange_rowCount - adjustedToRange_rowCount;
                toRow = isDownDirection ? adjustedToRange_row + adjustedFromRange_rowCount * rows : adjustedToRange_row + adjustedToRange_rowCount - rows * adjustedFromRange_rowCount - lastCopyRows;
                sheet._copyToCore(fromRow, adjustedFromRange_col, toRow, adjustedToRange_col, lastCopyRows, adjustedFromRange_colCount, copyOption, true, true);
            }
        }
        else {
            for (i = 0; i < columns; i++) {
                toColumn = isRightDirection ? adjustedToRange_col + i * adjustedFromRange_colCount : adjustedToRange_col + adjustedToRange_colCount - (i + 1) * adjustedFromRange_colCount;
                sheet._copyToCore(adjustedFromRange_row, adjustedFromRange_col, adjustedToRange_row, toColumn, adjustedFromRange_rowCount, adjustedFromRange_colCount, copyOption, true, true);
            }
            if (lastCopyColumns !== 0) {
                fromColumn = isRightDirection ? adjustedFromRange_col : adjustedFromRange_col + (columns + 1) * adjustedFromRange_colCount - adjustedToRange_colCount;
                toColumn = isRightDirection ? adjustedToRange_col + adjustedFromRange_colCount * columns : adjustedToRange_col + adjustedToRange_colCount - columns * adjustedFromRange_colCount - lastCopyColumns;
                sheet._copyToCore(adjustedFromRange_row, fromColumn, adjustedToRange_row, toColumn, adjustedFromRange_rowCount, lastCopyColumns, copyOption, true, true);
            }
        }
    };
    DragFillUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, result = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                if (_supportsCalc) {
                    sheet.suspendCalcService();
                }
                var oldSelections = sheet.getSelections(), dragFillExtent = self._dragFillExtent, smartTag = sheet._fillDialog, fillRange = dragFillExtent[FILL_RANGE];
                result = dragFillExtent[AUTO_FILL_TYPE] === 4 ? self._undoDragClear(sheet) : self._undoDragFill(sheet);
                if (!sheet._skipCloseDragFillSmartTag && smartTag) {
                    smartTag.close();
                }
                raiseRangeDataChanged(sheet, fillRange.row, fillRange.col, getRowCount(fillRange), getColCount(fillRange), self._savedAfterFilledChangedCells ? self._savedAfterFilledChangedCells._getChangedCells() : [], 1 , keyword_undefined, true);
                if (sheet._raiseSelectionChanging(oldSelections, sheet.getSelections())) {
                    sheet._raiseSelectionChanged(oldSelections);
                }
            }
            finally {
                self._afterAction(sheet, true);
                if (_supportsCalc) {
                    sheet.resumeCalcService(false);
                }
            }
        }
        return result;
    };
    DragFillUndoAction.prototype._undoDragClear = function (sheet) {
        var self = this, startRange = self._dragFillExtent[START_RANGE], startRange_row = startRange.row, startRange_col = startRange.col;
        var changesKey = Core_1.Commands._getChangesKey(sheet.name());
        sheet._modelManager.undo(self._dragFillExtent[changesKey]);
        sheet._setActiveCellImp(Math_max(sheet._getFirstVisualRow(), startRange_row), Math_max(sheet._getFirstVisualColumn(), startRange_col), sheet._activeRowViewportIndex, sheet._activeColViewportIndex);
        return true;
    };
    DragFillUndoAction.prototype._undoDragFill = function (sheet) {
        var self = this, dragFillExtent = self._dragFillExtent, startRange = dragFillExtent[START_RANGE], startRange_row = startRange.row, startRange_col = startRange.col;
        if (_supportsCalc) {
            sheet.suspendCalcService();
        }
        try {
            var changesKey = Core_1.Commands._getChangesKey(sheet.name());
            sheet._modelManager.undo(dragFillExtent[changesKey]);
            sheet._setActiveCellImp(Math_max(sheet._getFirstVisualRow(), startRange_row), Math_max(sheet._getFirstVisualColumn(), startRange_col), sheet._activeRowViewportIndex, sheet._activeColViewportIndex);
        }
        finally {
            if (_supportsCalc) {
                sheet.resumeCalcService(false);
            }
        }
        sheet.invalidateLayout();
        return true;
    };
    return DragFillUndoAction;
}(ActionBase));


var FillUndoAction = (function (_super) {
    __extends(FillUndoAction, _super);
    function FillUndoAction(sheet, fillExtent) {
        var _this = _super.call(this) || this;
        var self = _this;
        self._sheet = sheet;
        self._fillExtent = fillExtent;
        self._startRange = fillExtent[START_RANGE];
        self._fillRange = fillExtent[FILL_RANGE];
        self._autoFillType = fillExtent[AUTO_FILL_TYPE];
        self._fillDirection = fillExtent[FILL_DIRECTION];
        return _this;
    }
    FillUndoAction.prototype.execute = function () {
        var self = this;
        var succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, spread = sheet.parent, fillRange = self._fillRange, command = self._fillExtent;
            sheet._modelManager.startTransaction();
            self._beforeDataChange();
            self._beforeAction(sheet, true);
            sheet._needCalcEvent = true;
            try {
                var oldSelections = sheet.getSelections();
                var newSelections = void 0;
                var eventHandler = sheet._eventHandler, args = { sheet: sheet, sheetName: sheet.name() };
                args[CANCEL] = false;
                args[FILL_RANGE] = fillRange;
                args[AUTO_FILL_TYPE] = self._autoFillType;
                args[FILL_DIRECTION] = self._fillDirection;
                sheet._trigger(Core_1.Events.DragFillBlock, args);
                eventHandler._currentDragFillType = args[AUTO_FILL_TYPE];
                eventHandler._isCancelDragFill = args[CANCEL];
                if (!args[CANCEL]) {
                    self._executeDragFillAction(args);
                    sheet._trigger(Core_1.Events.DragFillBlockCompleted, args);
                }
                succeed = true;
                newSelections = sheet.getSelections();
                if (sheet._raiseSelectionChanging(oldSelections, newSelections)) {
                    sheet._raiseSelectionChanged(oldSelections);
                }
                if (spread && command._oldPosition) {
                    spread.changeSelectionInCommandExecuting(command, null, null, newSelections);
                }
            }
            finally {
                self._afterAction(sheet, true);
                sheet._needCalcEvent = false;
                self._afterDataChange(sheet, fillRange);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._fillExtent[changesKey] = sheet._modelManager.endTransaction();
            }
        }
        return succeed;
    };
    FillUndoAction.prototype._executeDragFillAction = function (args) {
        var self = this, sheet = self._sheet, eventHandler = sheet._eventHandler, fillRange = self._fillRange, autoFillType = self._autoFillType;
        eventHandler._currentDragFillType = autoFillType;
        if (!eventHandler._isCancelDragFill) {
            var dragFillExtent = {};
            dragFillExtent[START_RANGE] = self._startRange;
            dragFillExtent[FILL_RANGE] = fillRange;
            dragFillExtent[AUTO_FILL_TYPE] = args[AUTO_FILL_TYPE] === 5 ? autoFillType : args[AUTO_FILL_TYPE];
            dragFillExtent[FILL_DIRECTION] = self._fillDirection;
            var dragFillUndoAction = new DragFillUndoAction(sheet, dragFillExtent);
            sheet.suspendEvent();
            dragFillUndoAction.execute();
            sheet.resumeEvent();
            self._fillExtent._dragFillUndoAction = dragFillUndoAction;
        }
    };
    FillUndoAction.prototype._beforeDataChange = function () {
        var self = this;
        if (!self._sheet.isDirtySuspended()) {
            self._savedBeforeFillChangedCells = new ChangedCells(self._sheet, self._fillRange, ALL_OPTION);
        }
    };
    FillUndoAction.prototype.undo = function () {
        var self = this;
        if (self.canUndo()) {
            var sheet = self._sheet, fillRange = self._fillRange, spread = sheet.parent, command = self._fillExtent;
            self._beforeDataChange();
            self._beforeAction(sheet, true);
            try {
                var oldSelections = sheet.getSelections();
                sheet.suspendEvent();
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                sheet._modelManager.undo(self._fillExtent[changesKey]);
                sheet.resumeEvent();
                var newSelection = command[START_RANGE];
                if (sheet._raiseSelectionChanging(oldSelections, [newSelection])) {
                    sheet._raiseSelectionChanged(oldSelections);
                }
                if (spread && command._oldPosition) {
                    spread.changeSelectionInCommandExecuting(command, null, null, [newSelection]);
                }
            }
            finally {
                self._afterAction(sheet, true);
                self._afterDataChange(sheet, fillRange, true);
            }
        }
        return true;
    };
    FillUndoAction.prototype._afterDataChange = function (sheet, fillRange, isUndo) {
        var self = this;
        var changedCells = [];
        if (!sheet.isDirtySuspended()) {
            var savedAfterFilledChangedCells = new ChangedCells(sheet, fillRange, ALL_OPTION);
            savedAfterFilledChangedCells._mergeCellsHasDiffData(self._savedBeforeFillChangedCells._getCellsData());
            changedCells = savedAfterFilledChangedCells._getChangedCells();
        }
        raiseRangeDataChanged(sheet, fillRange.row, fillRange.col, getRowCount(fillRange), getColCount(fillRange), changedCells, 1 , keyword_undefined, isUndo);
    };
    return FillUndoAction;
}(ActionBase));


function dragDropUndoAction_updateSelection(sheet, r, c, rc, cc, command) {
    var oldSelections = sheet.getSelections();
    var newSelections;
    sheet._clearSelectionImp();
    sheet.addSelection(r, c, rc, cc);
    newSelections = sheet.getSelections();
    sheet._raiseSelectionChanged(oldSelections);
    var ar = r > 0 ? r : sheet._getFirstVisualRow();
    var ac = c > 0 ? c : sheet._getFirstVisualColumn();
    sheet._setActiveCellImp(ar, ac, sheet._activeRowViewportIndex, sheet._activeColViewportIndex);
    if (sheet.parent && command._oldPosition) {
        sheet.parent.changeSelectionInCommandExecuting(command, null, null, newSelections);
    }
}
function repaintActiveSheet(sheet) {
    var spread = sheet.parent;
    var activeSheet = spread.getActiveSheet();
    if (activeSheet && sheet !== activeSheet) {
        activeSheet.repaint();
    }
}
var DragDropUndoAction = (function (_super) {
    __extends(DragDropUndoAction, _super);
    function DragDropUndoAction(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    DragDropUndoAction.prototype.canExecute = function () {
        var self = this;
        var sheet = self._sheet, command = self._command;
        var fromRow = command.fromRow, fromColumn = command.fromColumn, rowCount = getRowCount(command), columnCount = command.columnCount, toRow = command.toRow, toColumn = command.toColumn;
        var isDragMove = !command.copy;
        var fromRange = {
            row: fromRow,
            col: fromColumn,
            rowCount: rowCount,
            colCount: columnCount
        };
        var toRange = {
            row: toRow,
            col: toColumn,
            rowCount: rowCount,
            colCount: columnCount
        };
        if (sheet.tables && sheet.tables._isTableIntersect(sheet, fromRange, sheet, toRange, isDragMove)) {
            return false;
        }
        if (!sheet._isValidRange(fromRow, fromColumn, rowCount, columnCount, getSheetRowCount(sheet), getSheetColumnCount(sheet))) {
            return false;
        }
        if (!command.insert) {
            if (!sheet._isValidRange(toRow, toColumn, rowCount, columnCount, getSheetRowCount(sheet), getSheetColumnCount(sheet))) {
                return false;
            }
        }
        var rowCondition = toRow >= 0 && toColumn < 0 && fromRow >= 0 && fromColumn < 0 && rowCount > 0 && columnCount < 0;
        var columnCondition = toRow < 0 && toColumn >= 0 && fromRow < 0 && fromColumn >= 0 && rowCount < 0 && columnCount > 0;
        var isAllowDragInsert = self._canAllowOptionIsProtected(rowCondition, columnCondition);
        return sheet._canChange(toRow, toColumn, rowCount, columnCount, keyword_null, keyword_null, isAllowDragInsert)
            && sheet._canChange(fromRow, fromColumn, rowCount, columnCount, keyword_null, keyword_null, isAllowDragInsert);
    };
    DragDropUndoAction.prototype._canAllowOptionIsProtected = function (rowCondition, columnCondition) {
        var self = this, command = self._command, sheet = self._sheet, insert = command.insert;
        var isProtected = sheet.options.isProtected, protectionOptions = sheet.options.protectionOptions;
        if (isProtected && !$_isEmptyObject(protectionOptions)) {
            var allowDragInsertRows = protectionOptions.allowDragInsertRows;
            var allowDragInsertColumns = protectionOptions.allowDragInsertColumns;
            if (insert
                && ((allowDragInsertRows && rowCondition)
                    || (allowDragInsertColumns && columnCondition) )) {
                return true;
            }
        }
        return false;
    };
    DragDropUndoAction.prototype._getSheets = function (sheet) {
        var sheets = [].concat(sheet.parent.sheets);
        if (sheet && sheet._parentSheet) {
            sheets.push(sheet);
        }
        return sheets;
    };
    DragDropUndoAction.prototype.execute = function () {
        var self = this;
        var succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, command = self._command;
            self._beforeDataChange();
            var from = void 0, to = void 0, count = void 0;
            var fromRow = command.fromRow, fromColumn = command.fromColumn, toRow = command.toRow, toColumn = command.toColumn, rowCount = getRowCount(command), columnCount = command.columnCount, option = command.option, toRowCount = rowCount, toColumnCount = columnCount;
            var sheets = self._getSheets(sheet), pasteSkipInvisibleRange = sheet._getPasteSkipInvisibleRange();
            if (pasteSkipInvisibleRange) {
                toRowCount += sheet._getNextInvisibleCount(toRow, rowCount, true);
                toColumnCount += sheet._getNextInvisibleCount(toColumn, columnCount);
            }
            Core_1.Commands._startTransactionAll(sheets);
            self._beforeAction(sheet, true);
            sheet._needCalcEvent = true;
            try {
                try {
                    sheet.tables && sheet.tables._changeValueBesideTable(new Core_1.Range(toRow, toColumn, toRowCount, toColumnCount), new Core_1.Range(fromRow, fromColumn, rowCount, columnCount));
                }
                catch (e) {
                    sheet._raiseInvalidOperation(6 , e.message);
                    sheet.resumePaint();
                    return;
                }
                if (command.insert) {
                    if (fromColumn >= 0 && fromRow < 0) {
                        from = fromColumn;
                        to = toColumn;
                        count = columnCount;
                        var activeColumn = toColumn;
                        sheet.addColumns(to, count);
                        if (command.copy) {
                            sheet.copyTo(-1, (to <= from ? from + count : from), -1, to, -1, count, option);
                        }
                        else {
                            sheet.moveTo(-1, (to <= from ? from + count : from), -1, to, -1, count, option);
                            sheet.deleteColumns((to <= from ? from + count : from), count);
                            if (from < to) {
                                activeColumn = to - count;
                            }
                        }
                        dragDropUndoAction_updateSelection(sheet, -1, activeColumn, getSheetRowCount(sheet), count, command);
                    }
                    else if (fromRow >= 0 && fromColumn < 0) {
                        from = fromRow;
                        to = toRow;
                        count = rowCount;
                        var activeRow = toRow;
                        sheet.addRows(to, count);
                        if (command.copy) {
                            sheet.copyTo((to <= from ? from + count : from), -1, to, -1, count, -1, option);
                        }
                        else {
                            sheet.moveTo((to <= from ? from + count : from), -1, to, -1, count, -1, option);
                            sheet.deleteRows((to <= from ? from + count : from), count);
                            if (from < to) {
                                activeRow = to - count;
                            }
                        }
                        dragDropUndoAction_updateSelection(sheet, activeRow, -1, count, getSheetColumnCount(sheet), command);
                    }
                }
                else {
                    if (command.copy) {
                        sheet.copyTo(fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, option);
                    }
                    else {
                        sheet.moveTo(fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, option);
                    }
                    if (sheet) {
                        dragDropUndoAction_updateSelection(sheet, toRow, toColumn, toRowCount, toColumnCount, command);
                        var state = command._state;
                        if (!command.copy && !sheet.isDirtySuspended()) {
                            state._savedFromAfterPastedChangedCells = self._mergeCellsData(sheet, state._savedFromBeforePastedChangedCells, fromRow, fromColumn, rowCount, columnCount);
                        }
                        if (!sheet.isDirtySuspended()) {
                            state._savedToAfterPastedChangedCells = self._mergeCellsData(sheet, state._savedToBeforePastedChangedCells, toRow, toColumn, rowCount, columnCount);
                        }
                    }
                }
                succeed = true;
            }
            finally {
                sheet._eventHandler._dragRect = {};
                self._afterAction(sheet, true);
                sheet._needCalcEvent = false;
                Core_1.Commands._endTransactionAll(sheets, command);
            }
            repaintActiveSheet(sheet);
        }
        return succeed;
    };
    DragDropUndoAction.prototype._mergeCellsData = function (sheet, beforePastedChangedCells, r, c, rc, cc) {
        var afterPastedChangedCells = new ChangedCells(sheet, createRange(r, c, rc, cc), this._command.option);
        var tableNames = sheet.tables && sheet.tables._completelyContainstables && sheet.tables._completelyContainstables(r, c, rc, cc);
        if (tableNames && tableNames.length > 0) {
            this._command.tableNamesObj = {
                r: r,
                c: c,
                rc: rc,
                cc: cc,
                tableNames: tableNames
            };
        }
        afterPastedChangedCells._mergeCellsHasDiffData(beforePastedChangedCells._getCellsData());
        raiseRangeDataChanged(sheet, r, c, rc, cc, afterPastedChangedCells._getChangedCells(), 0 , tableNames);
        return afterPastedChangedCells;
    };
    DragDropUndoAction.prototype._beforeDataChange = function () {
        var self = this;
        var sheet = self._sheet, command = self._command;
        var state = command._state = {};
        var dragDropExtent_fromRow = command.fromRow, dragDropExtent_fromColumn = command.fromColumn, dragDropExtent_toRow = command.toRow, dragDropExtent_toColumn = command.toColumn, option = command.option;
        var fromRow = dragDropExtent_fromRow < 0 ? 0 : dragDropExtent_fromRow;
        var fromColumn = dragDropExtent_fromColumn < 0 ? 0 : dragDropExtent_fromColumn;
        var toRow = dragDropExtent_toRow < 0 ? 0 : dragDropExtent_toRow;
        var toColumn = dragDropExtent_toColumn < 0 ? 0 : dragDropExtent_toColumn;
        var rowCount = dragDropExtent_fromRow < 0 ? getSheetRowCount(sheet) : getRowCount(command);
        var columnCount = dragDropExtent_fromColumn < 0 ? getSheetColumnCount(sheet) : command.columnCount;
        if (!command.insert && !sheet.isDirtySuspended()) {
            if (!command.copy) {
                state._savedFromBeforePastedChangedCells = new ChangedCells(sheet, createRange(fromRow, fromColumn, rowCount, columnCount), option);
            }
            state._savedToBeforePastedChangedCells = new ChangedCells(sheet, createRange(toRow, toColumn, rowCount, columnCount), option);
        }
        state._savedAcitveRowViewportIndex = sheet._activeRowViewportIndex;
        state._savedAcitveColumnViewportIndex = sheet._activeColViewportIndex;
        state._savedActiveRow = sheet._activeRowIndex;
        state._savedActiveColumn = sheet._activeColIndex;
    };
    DragDropUndoAction.prototype.undo = function () {
        var self = this;
        if (self.canUndo()) {
            var sheet = self._sheet, command = self._command;
            var dragDropExtent_fromRow = command.fromRow, dragDropExtent_fromColumn = command.fromColumn, dragDropExtent_toRow = command.toRow, dragDropExtent_toColumn = command.toColumn, dragDropExtent_rowCount = getRowCount(command), dragDropExtent_columnCount = command.columnCount;
            if (!sheet._isValidRange(dragDropExtent_fromRow, dragDropExtent_fromColumn, dragDropExtent_rowCount, dragDropExtent_columnCount, getSheetRowCount(sheet), getSheetColumnCount(sheet))) {
                return false;
            }
            if (!command.insert) {
                if (!sheet._isValidRange(dragDropExtent_toRow, dragDropExtent_toColumn, dragDropExtent_rowCount, dragDropExtent_columnCount, getSheetRowCount(sheet), getSheetColumnCount(sheet))) {
                    return false;
                }
            }
            var count = void 0;
            var state = command._state;
            self._beforeAction(sheet, true);
            var sheets = self._getSheets(sheet);
            Core_1.Commands._undoTransactionAll(sheets, command);
            try {
                if (command.insert) {
                    if (!(dragDropExtent_fromColumn >= 0 && dragDropExtent_fromRow >= 0)) {
                        if (dragDropExtent_fromColumn >= 0) {
                            var activeColumn = dragDropExtent_fromColumn;
                            count = dragDropExtent_columnCount;
                            if (sheet) {
                                dragDropUndoAction_updateSelection(sheet, -1, activeColumn, getSheetRowCount(sheet), count, command);
                            }
                        }
                        else if (dragDropExtent_fromRow >= 0) {
                            count = dragDropExtent_rowCount;
                            var activeRow = dragDropExtent_fromRow;
                            if (sheet) {
                                dragDropUndoAction_updateSelection(sheet, activeRow, -1, count, getSheetColumnCount(sheet), command);
                            }
                        }
                    }
                }
                else {
                    var fromRow = dragDropExtent_fromRow < 0 ? 0 : dragDropExtent_fromRow;
                    var fromColumn = dragDropExtent_fromColumn < 0 ? 0 : dragDropExtent_fromColumn;
                    var toRow = dragDropExtent_toRow < 0 ? 0 : dragDropExtent_toRow;
                    var toColumn = dragDropExtent_toColumn < 0 ? 0 : dragDropExtent_toColumn;
                    var rowCount = dragDropExtent_fromRow < 0 ? getSheetRowCount(sheet) : dragDropExtent_rowCount;
                    var columnCount = dragDropExtent_fromColumn < 0 ? getSheetColumnCount(sheet) : dragDropExtent_columnCount;
                    if (sheet) {
                        dragDropUndoAction_updateSelection(sheet, dragDropExtent_fromRow, dragDropExtent_fromColumn, dragDropExtent_rowCount, dragDropExtent_columnCount, command);
                        var tableNamesObj = command.tableNamesObj, afterPastedChangedTables = [], fromPastedChangedTables = [];
                        if (tableNamesObj) {
                            if (tableNamesObj.r === toRow && tableNamesObj.c === toColumn && tableNamesObj.rc === rowCount && tableNamesObj.cc === columnCount) {
                                fromPastedChangedTables = tableNamesObj.tableNames;
                            }
                            else {
                                afterPastedChangedTables = tableNamesObj.tableNames;
                            }
                        }
                        raiseRangeDataChanged(sheet, toRow, toColumn, rowCount, columnCount, state._savedToAfterPastedChangedCells ? state._savedToAfterPastedChangedCells._getChangedCells() : [], 0 , afterPastedChangedTables, true);
                        raiseRangeDataChanged(sheet, fromRow, fromColumn, rowCount, columnCount, state._savedFromAfterPastedChangedCells ? state._savedFromAfterPastedChangedCells._getChangedCells() : [], 0 , fromPastedChangedTables, true);
                    }
                }
                if (sheet) {
                    if (state._savedActiveRow !== -1 && state._savedActiveColumn !== -1) {
                        var selection = sheet.getSelections()[0];
                        if (selection.contains(state._savedActiveRow, state._savedActiveColumn)) {
                            sheet._setActiveCellCore(state._savedActiveRow, state._savedActiveColumn);
                        }
                        else {
                            sheet._setActiveCellCore(selection.row, selection.col);
                        }
                    }
                    if (state._savedAcitveRowViewportIndex !== -2 && state._savedAcitveColumnViewportIndex !== -2 &&
                        state._savedActiveRow !== -1 && state._savedActiveColumn !== -1) {
                        sheet.showCell(state._savedActiveRow, state._savedActiveColumn, 3 , 3 );
                    }
                }
            }
            finally {
                self._afterAction(sheet, true);
            }

            repaintActiveSheet(sheet);
        }
        return true;
    };
    return DragDropUndoAction;
}(ActionBase));


Core_1.Commands[FILL] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, FillUndoAction, options, isUndo);
    }
};


Core_1.Commands[DRAG_DROP] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, DragDropUndoAction, options, isUndo);
    }
};
/***/ }),

/***/ './dist/plugins/fill/fill-event.js':
/*!*****************************************!*\
  !*** ./dist/plugins/fill/fill-event.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var fill_ui_1 = __webpack_require__(/*! ./fill-ui */ './dist/plugins/fill/fill-ui.js');
var fill_1 = __webpack_require__(/*! ./fill */ './dist/plugins/fill/fill.js');
var fill_ns_1 = __webpack_require__(/*! ./fill.ns */ './dist/plugins/fill/fill.ns.js');
var CalcEngine = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var hasCalc = !!CalcEngine;
var $ = Core_1.GC$, createRange = Core_1._createRange, isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var keyword_null = null, keyword_undefined = void 0, Math_min = Math.min, Math_abs = Math.abs, Math_max = Math.max;
var DRAGDROPTOOLTIP_OFFSET = 5, DRAGFILLTOOLTIP_OFFSET = 3;
var DRAG = 'drag', CORNER = 'corner', STR_BLACK = 'black', LINE_COLOR = '#A9A9B8';
var COPY_OPTION_ALL = 2047;
var StringHelper = Common_1.Common._StringHelper;
var rm = new Common_1.Common.ResourceManager(fill_ns_1.SR);
var getSR = rm.getResource.bind(rm);
function getRowViewportIndex(object) {
    return object.rowViewportIndex;
}
function getColViewportIndex(object) {
    return object.colViewportIndex;
}
function getFrozenRowCount(sheet) {
    return sheet.frozenRowCount();
}
function getFrozenColumnCount(sheet) {
    return sheet.frozenColumnCount();
}
function getHitTestType(object) {
    return object.hitTestType;
}
function getSheetRowCount(sheet, sheetArea) {
    return sheet.getRowCount(sheetArea);
}
function getSheetColumnCount(sheet, sheetArea) {
    return sheet.getColumnCount(sheetArea);
}
function getColCount(obj) {
    return obj.colCount;
}
function getRowCount(obj) {
    return obj.rowCount;
}
function getHeight(obj) {
    return obj.height;
}
function getWidth(obj) {
    return obj.width;
}
function paintDragLine(ctx, fromX, fromY, toX, toY) {
    ctx.save();
    ctx.strokeStyle = LINE_COLOR;
    var line2;
    if (fromX === toX) {
        ctx.rect(fromX - 2, fromY, 7, Math_abs(toY - fromY));
        ctx.clip();
        ctx.beginPath();
        if (fromY < toY) {
            fromY -= 3;
            toY += 3;
        }
        else {
            fromY += 3;
            toY -= 3;
        }
        line2 = Core_1._createLine(fromX, fromY, toX, toY, STR_BLACK, 51 );
    }
    else if (fromY === toY) {
        ctx.rect(fromX, fromY - 2, Math_abs(toX - fromX), 7);
        ctx.clip();
        ctx.beginPath();
        if (fromX < toX) {
            fromX -= 3;
            toX += 3;
        }
        else {
            fromX += 3;
            toX -= 3;
        }
        line2 = Core_1._createLine(fromX, fromY, toX, toY, STR_BLACK, 51 );
    }
    line2 && line2._paintLine(ctx);
    ctx.stroke();
    ctx.beginPath();
    ctx.restore();
}
function _raiseDragDropBlockOrBlockCompleted(sheet, isDragDropBlock, fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, copy, insert, copyOption) {
    var triggerEvent = isDragDropBlock ? Core_1.Events.DragDropBlock : Core_1.Events.DragDropBlockCompleted, args = {
        sheet: sheet,
        sheetName: sheet.name(),
        fromRow: fromRow,
        fromCol: fromColumn,
        toRow: toRow,
        toCol: toColumn,
        rowCount: rowCount,
        colCount: columnCount,
        copy: copy,
        insert: insert,
        copyOption: copyOption
    };
    if (isDragDropBlock) {
        args.cancel = false;
    }
    sheet._trigger(triggerEvent, args);
    return args.cancel;
}
function hasSameSpan(sheet, startRangeSpan, fillRange, hasSameRowAndRowCount, hasSameColAndColCount) {
    for (var r = 0; r < fillRange.rowCount; r++) {
        for (var c = 0; c < fillRange.colCount; c++) {
            var span = sheet.getSpan(fillRange.row + r, fillRange.col + c);
            if (!span || span.rowCount !== startRangeSpan.rowCount || span.colCount !== startRangeSpan.colCount) {
                return false;
            }
            if (hasSameRowAndRowCount) {
                c += startRangeSpan.colCount;
            }
        }
        if (hasSameColAndColCount) {
            r += startRangeSpan.rowCount;
        }
    }
    return true;
}
function canDragFillSpan(sheet, startRange, fillRange) {
    var startRange_row = startRange.row, startRange_rowCount = startRange.rowCount, startRange_col = startRange.col, startRange_colCount = startRange.colCount;
    var fillRange_row = fillRange.row, fillRange_rowCount = fillRange.rowCount, fillRange_col = fillRange.col, fillRange_colCount = fillRange.colCount;
    var hasSameRowAndRowCount = startRange_row === fillRange_row && startRange_rowCount === fillRange_rowCount, hasSameColAndColCount = startRange_col === fillRange_col && startRange_colCount === fillRange_colCount;
    if (!hasSameRowAndRowCount && !hasSameColAndColCount) {
        return false;
    }
    var startRangeSpan = sheet.getSpan(startRange_row, startRange_col);
    if (!startRangeSpan || !hasSameSpan(sheet, startRangeSpan, startRange, hasSameRowAndRowCount, hasSameColAndColCount)) {
        return false;
    }
    if (sheet._modelManager._hasPartSpans(fillRange_row, fillRange_col, fillRange_rowCount, fillRange_colCount)) {
        return false;
    }
    return hasSameSpan(sheet, startRangeSpan, fillRange, hasSameRowAndRowCount, hasSameColAndColCount);
}
$.extend(Core_1._SheetEventHandler.prototype, {

    _startDragDropping: function (target) {
        var self = this;
        if (self._isDragDropping) {
            return;
        }
        var sheet = self._sheet;
        var fromRange = keyword_null;
        var selections = sheet._modelManager.getSelections();
        if (selections.length === 1) {
            fromRange = selections[0];
        }
        else if (selections.length < 1) {
            fromRange = sheet._modelManager.getSpan(sheet._activeRowIndex, sheet._activeColIndex);
        }
        if (fromRange) {
            self._isDragDropping = true;
            self._isWorking = true;
            self._dragDropFromRange = fromRange;
            var rect = sheet.getRangeRect(getRowViewportIndex(target), getColViewportIndex(target), fromRange);
            var dragRect = self._dragRect;
            dragRect.x = rect.x;
            dragRect.y = rect.y;
            dragRect.width = rect.width - 1;
            dragRect.height = rect.height - 1;
            dragRect.row = fromRange.row;
            dragRect.col = fromRange.col;
            dragRect.rowCount = getRowCount(fromRange);
            dragRect.colCount = getColCount(fromRange);
            var rg = sheet._getActualRange(fromRange);
            var hitRow = target.row, hitCol = target.col;
            if (hitRow < rg.row) {
                hitRow = rg.row;
            }
            if (hitRow >= rg.row + getRowCount(rg)) {
                hitRow = rg.row + getRowCount(rg) - 1;
            }
            if (hitCol < rg.col) {
                hitCol = rg.col;
            }
            if (hitCol >= rg.col + getColCount(rg)) {
                hitCol = rg.col + getColCount(rg) - 1;
            }
            dragRect.hitRow = hitRow;
            dragRect.hitCol = hitCol;
            dragRect.rowOffset = hitRow - rg.row;
            dragRect.colOffset = hitCol - rg.col;
            self._startHitInfo = {
                _scrollRowViewportIndex: getRowViewportIndex(target),
                _scrollColViewportIndex: getColViewportIndex(target),
                _hitTestType: getHitTestType(target)
            };
            self._startScroll();
        }
    },
    _continueDragDropping: function () {
        var self = this;
        if (!self._startHitInfo || !self._isWorking) {
            return;
        }
        if (!self._isDragDropping || !self._dragDropFromRange) {
            return;
        }
        var mousePosition = self._mousePosition;
        var dragRect = self._dragRect;
        var startCellRect = self._sheet.getCellRect(dragRect.hitRow, dragRect.hitCol);
        var halfWidth = startCellRect.width / 2, midX = startCellRect.x + halfWidth;
        var halfHeight = startCellRect.height / 2, midY = startCellRect.y + halfHeight;
        dragRect.hitTarget = { x: mousePosition.x, y: mousePosition.y };
        var hitRow = self._getHitRowIndex();
        var hitCol = self._getHitColumnIndex();
        var canDrag = false;
        if (Math_abs(midX - mousePosition.x) > (halfWidth + 5) || Math_abs(midY - mousePosition.y) > (halfHeight + 5)) {
            canDrag = true;
        }
        if (hitRow >= 0 && hitCol >= 0 && canDrag) {
            self._updateDragDropRect(hitRow, hitCol);
        }
        self._continueScroll();
    },
    _updateDragDropRect: function (hitRow, hitCol) {
        var self = this;
        if (!self._isDragDropping || !self._dragDropFromRange) {
            return;
        }
        var sheet = self._sheet;
        var dragRect = self._dragRect;
        var pasteSkipInvisibleRange = sheet._getPasteSkipInvisibleRange();
        var activeSelRange = sheet._getActiveSelectedRange();
        var sheetRowCount = getSheetRowCount(sheet), sheetColCount = getSheetColumnCount(sheet);
        var acColIndex = Math_min(sheetColCount - getColCount(dragRect), hitCol - dragRect.colOffset),
        acRowIndex = Math_min(sheetRowCount - getRowCount(dragRect), hitRow - dragRect.rowOffset);
        if (pasteSkipInvisibleRange) {
            var prevInvisibleColCount = sheet._getPrevInvisibleCount(hitCol, dragRect.colOffset + 1),
            prevInvisibleRowCount = sheet._getPrevInvisibleCount(hitRow, dragRect.rowOffset + 1, true);
            acColIndex -= prevInvisibleColCount;
            acRowIndex -= prevInvisibleRowCount;
            if (sheet.getColumnWidth(acColIndex) === 0) {
                acColIndex = sheet._getPrevVisualColumn(acColIndex);
            }
            if (sheet.getRowHeight(acRowIndex) === 0) {
                acRowIndex = sheet._getPrevVisualRow(acRowIndex);
            }
        }
        if (activeSelRange.row === -1 && activeSelRange.col !== -1) {
            dragRect.row = -1;
            dragRect.col = Math_max(0, acColIndex);
        }
        else if (activeSelRange.row !== -1 && activeSelRange.col === -1) {
            dragRect.row = Math_max(0, acRowIndex);
            dragRect.col = -1;
        }
        else {
            dragRect.row = dragRect.row < 0 ? -1 :
                Math_max(0, acRowIndex);
            dragRect.col = dragRect.col < 0 ? -1 :
                Math_max(0, acColIndex);
        }
        dragRect.hitRow = hitRow;
        dragRect.hitCol = hitCol;
        var dragRange = sheet._getActualRange(dragRect);
        if (pasteSkipInvisibleRange) {
            var invisibleRowCount = sheet._getNextInvisibleCount(dragRange.row, dragRange.rowCount, true);
            var invisibleColCount = sheet._getNextInvisibleCount(dragRange.col, dragRange.colCount);
            dragRange.rowCount += invisibleRowCount;
            dragRange.colCount += invisibleColCount;
            dragRange.rowCount = Math_min(sheetRowCount, dragRange.rowCount);
            dragRange.colCount = Math_min(sheetColCount, dragRange.colCount);
            if (dragRange.row + dragRange.rowCount > sheetRowCount) {
                dragRange.row = sheetRowCount - dragRange.rowCount;
                dragRect.row = dragRange.row;
            }
            if (dragRange.col + dragRange.colCount > sheetColCount) {
                dragRange.col = sheetColCount - dragRange.colCount;
                dragRect.col = dragRange.col;
            }
        }

        var oldDragRange = self._oldDragRange;
        if (oldDragRange) {
            if (dragRange.row === oldDragRange.row &&
                dragRange.col === oldDragRange.col &&
                getRowCount(dragRange) === getRowCount(oldDragRange) &&
                getColCount(dragRange) === getColCount(oldDragRange) &&
                dragRange.row > sheet._getFirstVisualRow() &&
                dragRange.col > sheet._getFirstVisualColumn() &&
                dragRange.row + getRowCount(dragRange) - 1 < sheet._getLastVisualRow() &&
                dragRange.col + getColCount(dragRange) - 1 < sheet._getLastVisualColumn()) {
                return;
            }
        }
        self._actualDragRange = dragRange;
        sheet._render._refreshDragDropIndicator();
        self._oldDragRange = dragRange;
        var workbook = sheet.parent;
        if (workbook && workbook.options.showDragDropTip) {
            var left = dragRect.x + dragRect.width + DRAGDROPTOOLTIP_OFFSET;
            var top_1 = dragRect.y + dragRect.height + DRAGDROPTOOLTIP_OFFSET;
            workbook._showTooltip(StringHelper._escapeHtml(self._getDragDropRectString(dragRange)), left, top_1);
        }
    },
    _getDragDropRectString: function (dragRange) {
        if (dragRange && hasCalc) {
            var sheet = this._sheet;
            var activeSelRange = sheet._getActiveSelectedRange(), activeRowCount = getRowCount(activeSelRange), activeColCount = getColCount(activeSelRange);
            var activeRow = sheet.getActiveRowIndex();
            var activeCol = sheet.getActiveColumnIndex();
            var exp = void 0;
            var pasteSkipInvisibleRange = sheet._getPasteSkipInvisibleRange();
            activeRow = activeRow < 0 ? 0 : activeRow;
            activeCol = activeCol < 0 ? 0 : activeCol;
            if (activeRowCount === 1 && activeColCount === 1) {
                exp = CalcEngine._createCellExpression(keyword_null, keyword_null, dragRange.row - activeRow, dragRange.col - activeCol, true, true);
            }
            else {
                var row = void 0, col = void 0, endRow = void 0, endCol = void 0, rowCount = 0, colCount = 0;
                if (activeSelRange.row === -1 && activeSelRange.col >= 0) {
                    row = endRow = SheetsCalc_1.BAND_INDEX_CONST;
                    col = dragRange.col - activeCol;
                    endCol = dragRange.col - activeCol + activeColCount - 1;
                    colCount = activeColCount;
                }
                else if (activeSelRange.col === -1 && activeSelRange.row >= 0) {
                    col = endCol = SheetsCalc_1.BAND_INDEX_CONST;
                    row = dragRange.row - activeRow;
                    endRow = dragRange.row - activeRow + activeRowCount - 1;
                    rowCount = activeRowCount;
                }
                else if (activeSelRange.row >= 0 && activeSelRange.col >= 0) {
                    row = dragRange.row - activeRow;
                    endRow = dragRange.row - activeRow + activeRowCount - 1;
                    col = dragRange.col - activeCol;
                    endCol = dragRange.col - activeCol + activeColCount - 1;
                    rowCount = activeRowCount;
                    colCount = activeColCount;
                }
                if (pasteSkipInvisibleRange) {
                    endRow += sheet._getNextInvisibleCount(dragRange.row, rowCount, true);
                    endCol += sheet._getNextInvisibleCount(dragRange.col, colCount);
                }
                exp = CalcEngine._createRangeExpression(keyword_null, keyword_null, row, col, endRow, endCol, true, true, true, true, activeRow, activeCol);
            }
            return sheet._getCalcServiceInternal().unparse(sheet._getSheetSource(), exp, activeRow, activeCol);
        }
        return keyword_undefined;
    },
    _stopDragDrop: function () {
        var self = this;
        var isInvalid = false;
        var invalidMessage = '';
        var doCommandSuccessfully = false;
        var sheet = self._sheet;
        var rg;
        self._startHitInfo = keyword_null;
        self._stopScroll();
        var selectedRange = sheet._getActiveSelectedRange();
        if (selectedRange && (getRowCount(selectedRange) > 0 || getColCount(selectedRange) > 0)) {
            rg = {
                r: selectedRange.row,
                c: selectedRange.col,
                rc: getRowCount(selectedRange),
                cc: getColCount(selectedRange)
            };
        }
        else {
            rg = {
                r: sheet._activeRowIndex,
                c: sheet._activeColIndex,
                rc: 1,
                cc: 1
            };
        }
        if (self._isDragDropping === true && self._isWorking === true) {
            var fromRow = rg.r;
            var fromColumn = rg.c;
            var rowCount = rg.rc;
            var columnCount = rg.cc;
            var toRow = self._dragRect.row;
            var toColumn = self._dragRect.col;
            var protectionOptions = sheet.options.protectionOptions;
            var cancel = void 0;
            var e = {
                fromRow: fromRow,
                fromColumn: fromColumn,
                rowCount: rowCount,
                columnCount: columnCount,
                toRow: toRow,
                toColumn: toColumn,
                isDragInsert: self._isDragInsert,
                isDragCopy: self._isDragCopy
            };
            sheet._trigger(Core_1.Events.BeforeDragDrop, e);
            invalidMessage = e.invalidMessage;
            if (!invalidMessage || invalidMessage.length === 0) {
                if (self._isDragInsert && (fromRow === -1 || fromColumn === -1)) {
                    if (fromColumn >= 0) {
                        if ((self._isDragCopy && (toColumn <= fromColumn || toColumn >= fromColumn + columnCount)) ||
                            (!self._isDragCopy && (toColumn < fromColumn || toColumn > fromColumn + columnCount))) {
                            if (sheet._hasPartSpans(-1, fromColumn, -1, columnCount) ||
                                sheet._hasPartSpans(-1, toColumn, -1, 0)) {
                                isInvalid = true;
                                invalidMessage = getSR().Exp_ChangeMergedCell;
                            }


                            var allowDragInsertColumns = protectionOptions && protectionOptions.allowDragInsertColumns;
                            if (!isInvalid && sheet.options.isProtected && allowDragInsertColumns !== true) {
                                isInvalid = true;
                                invalidMessage = getSR().Exp_ColumnReadOnly;
                            }
                            if (!isInvalid) {
                                cancel = _raiseDragDropBlockOrBlockCompleted(sheet, true, -1, fromColumn, -1, toColumn, -1, columnCount, self._isDragCopy, true, COPY_OPTION_ALL );
                                if (!cancel) {
                                    doCommandSuccessfully = sheet._commandManager()
                                        .execute({
                                        cmd: 'dragDrop',
                                        sheetName: sheet.name(),
                                        fromRow: -1,
                                        fromColumn: fromColumn,
                                        toRow: -1,
                                        toColumn: toColumn,
                                        rowCount: -1,
                                        columnCount: columnCount,
                                        copy: self._isDragCopy,
                                        insert: true,
                                        option: COPY_OPTION_ALL
                                    });
                                    _raiseDragDropBlockOrBlockCompleted(sheet, false, -1, fromColumn, -1, toColumn, -1, columnCount, self._isDragCopy, true, COPY_OPTION_ALL );
                                }
                            }
                        }
                    }
                    else if (fromRow >= 0 && fromColumn < 0) {
                        if ((self._isDragCopy && (toRow <= fromRow || toRow >= fromRow + rowCount)) ||
                            (!self._isDragCopy && (toRow < fromRow || toRow > fromRow + rowCount))) {
                            if (sheet._hasPartSpans(fromRow, -1, rowCount, -1) || sheet._hasPartSpans(toRow, -1, 0, -1)) {
                                isInvalid = true;
                                invalidMessage = getSR().Exp_ChangeMergedCell;
                            }
                            if (!isInvalid) {
                                if (hasCalc && (sheet._hasPartArrayFormulas(fromRow, -1, rowCount, -1) || sheet._hasPartArrayFormulas(toRow, -1, 0, -1))) {
                                    isInvalid = true;
                                    invalidMessage = getSR().Exp_ChangePartOfArray;
                                }
                            }
                            var allowDragInsertRows = protectionOptions && protectionOptions.allowDragInsertRows;
                            if (!isInvalid && sheet.options.isProtected && allowDragInsertRows !== true) {
                                isInvalid = true;
                                invalidMessage = getSR().Exp_RowReadOnly;
                            }
                            if (!isInvalid) {
                                cancel = _raiseDragDropBlockOrBlockCompleted(sheet, true, fromRow, -1, toRow, -1, rowCount, -1, self._isDragCopy, true, COPY_OPTION_ALL );
                                if (!cancel) {
                                    doCommandSuccessfully = sheet._commandManager()
                                        .execute({
                                        cmd: 'dragDrop',
                                        sheetName: sheet.name(),
                                        fromRow: fromRow,
                                        fromColumn: -1,
                                        toRow: toRow,
                                        toColumn: -1,
                                        rowCount: rowCount,
                                        columnCount: -1,
                                        copy: self._isDragCopy,
                                        insert: true,
                                        option: COPY_OPTION_ALL
                                    });
                                    _raiseDragDropBlockOrBlockCompleted(sheet, false, fromRow, -1, toRow, -1, rowCount, -1, self._isDragCopy, true, COPY_OPTION_ALL );
                                }
                            }
                        }
                    }
                }
                else if (toRow !== fromRow || toColumn !== fromColumn) {
                    if (sheet._hasPartSpans(fromRow, fromColumn, rowCount, columnCount) ||
                        sheet._hasPartSpans(toRow, toColumn, rowCount, columnCount)) {
                        isInvalid = true;
                        invalidMessage = getSR().Exp_ChangeMergedCell;
                    }
                    if (!isInvalid) {
                        if (hasCalc && (sheet._hasPartArrayFormulas(fromRow, fromColumn, rowCount, columnCount) ||
                            sheet._hasPartArrayFormulas(toRow, toColumn, rowCount, columnCount))) {
                            isInvalid = true;
                            invalidMessage = getSR().Exp_ChangePartOfArray;
                        }
                    }
                    if (!isInvalid && sheet.options.isProtected) {
                        if ((!self._isDragCopy && sheet._isAnyCellInRangeLocked(createRange(fromRow, fromColumn, rowCount, columnCount), true)) ||
                            sheet._isAnyCellInRangeLocked(createRange(toRow, toColumn, rowCount, columnCount), true)) {
                            isInvalid = true;
                            invalidMessage = getSR().Exp_CellReadOnly;
                        }
                    }
                    if (!isInvalid) {
                        cancel = _raiseDragDropBlockOrBlockCompleted(sheet, true, fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, self._isDragCopy, false, COPY_OPTION_ALL );
                        if (!cancel) {
                            doCommandSuccessfully = sheet._commandManager().execute({
                                cmd: 'dragDrop',
                                sheetName: sheet.name(),
                                fromRow: fromRow,
                                fromColumn: fromColumn,
                                toRow: toRow,
                                toColumn: toColumn,
                                rowCount: rowCount,
                                columnCount: columnCount,
                                copy: self._isDragCopy,
                                insert: false,
                                option: COPY_OPTION_ALL
                            });
                            _raiseDragDropBlockOrBlockCompleted(sheet, false, fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, self._isDragCopy, false, COPY_OPTION_ALL );
                        }
                    }
                }
            }
        }
        self._isWorking = false;
        self._isDragDropping = false;
        self._dragDropFromRange = keyword_null;
        self._isDragInsert = false;
        self._isDragCopy = false;
        self._oldDragRange = keyword_null;
        self._removeTooltip();
        if (!doCommandSuccessfully) {
            self._dragRect = {};
            sheet.repaint();
        }
        if (isInvalid) {
            sheet._raiseInvalidOperation(3 , invalidMessage);
        }
    },

    _startDragFill: function (target) {
        var self = this;
        if (self._isDraggingFill === true || self._isWorking === true) {
            return;
        }
        self._updateDragFillStartRange();
        if (!self._dragFillStartRange) {
            return;
        }
        self._isWorking = true;
        self._isDraggingFill = true;
        self._isDragAroundIndicator = true;
        self._dragStartRowViewport = target;
        self._dragStartColumnViewport = getColViewportIndex(target);
        self._dragToRowViewport = getRowViewportIndex(target);
        self._dragToColumnViewport = getColViewportIndex(target);
        self._updateDragStartRangeViewports();
        self._startHitInfo = {
            _scrollRowViewportIndex: getRowViewportIndex(target),
            _scrollColViewportIndex: getColViewportIndex(target),
            _hitTestType: getHitTestType(target)
        };
        self._startScroll();
    },
    _updateDragStartRangeViewports: function () {
        var self = this;
        var frozenRowCount = getFrozenRowCount(self._sheet);
        var frozenColCount = getFrozenColumnCount(self._sheet);
        var dragFillStartTopRow = self._dragFillStartTopRow();
        if (dragFillStartTopRow >= 0 && dragFillStartTopRow < frozenRowCount) {
            self._dragFillStartTopRowViewport = 0;
        }
        else if (dragFillStartTopRow >= frozenRowCount && dragFillStartTopRow <= getSheetRowCount(self._sheet)) {
            self._dragFillStartTopRowViewport = 1;
        }
        if (self._isDragFillWholeColumns()) {
            self._dragFillStartBottomRowViewport = 1;
        }
        else {
            self._dragFillStartBottomRowViewport = self._dragStartRowViewport;
        }
        var dragFillStartLeftColumn = self._dragFillStartLeftColumn();
        if (dragFillStartLeftColumn >= 0 && dragFillStartLeftColumn < frozenColCount) {
            self._dragFillStartLeftColumnViewport = 0;
        }
        else if (dragFillStartLeftColumn >= frozenColCount &&
            dragFillStartLeftColumn <= getSheetColumnCount(self._sheet)) {
            self._dragFillStartLeftColumnViewport = 1;
        }
        if (self._isDragFillWholeRows()) {
            self._dragFillStartRightColumnViewport = 1;
        }
        else {
            self._dragFillStartRightColumnViewport = self._dragStartColumnViewport;
        }
    },
    _continueDragFill: function () {
        var self = this;
        if (!self._startHitInfo || !self._isDraggingFill) {
            return;
        }
        if (!self._isWorking || !self._dragFillStartRange) {
            return;
        }
        self._dragToRowViewport = self._getHitRowViewportIndex();
        self._dragToColumnViewport = self._getHitColumnViewportIndex();
        self._dragToRow = self._getHitRowIndex();
        self._dragToColumn = self._getHitColumnIndex();
        if (self._dragToRow >= 0 && self._dragToColumn >= 0) {
            self._updateCurrentFillSettings();
            self._updateCurrentFillRange();
            var workbook = self._sheet.parent;
            var canDragFill = false;
            var wholeFillRange = self._getDragFillFrameRange();
            if (wholeFillRange) {
                canDragFill = self._validateFillRange(self._dragFillStartRange, self._currentFillRange, true);
            }
            if (workbook && workbook.options.showDragFillTip && canDragFill) {
                self._showDragFillTooltip();
            }
            self._refreshDragFill();
        }
        self._continueScroll();
    },
    _getDragFillTooltipContent: function () {
        var self = this;
        var sheet = self._sheet;
        var startRange = self._dragFillStartRange;
        var fillRange = self._currentFillRange;
        var sheetAutoFillType = sheet.parent.options.defaultDragFillType;
        var actualFillType = self._getDragAutoFillType((sheetAutoFillType === 3 ) ? 5 : sheetAutoFillType, (sheetAutoFillType === 3 )
        );
        var fillDirection = self._getCurrentFillDirection();
        var dragFillFrameRange = self._getDragFillFrameRange();
        var fillSeries, cellRange;
        if (actualFillType === 1 ) {
            if (fillDirection === 0 || fillDirection === 1 ) {
                fillSeries = 1 ;
            }
            else {
                fillSeries = 0 ;
            }
            var fill = new fill_1._FillImp(sheet);
            var trendValue = fill._fillAuto(dragFillFrameRange, fillSeries, true);
            cellRange = self._getAvailableRange(fillDirection, fillRange, startRange);
            var style = sheet.getActualStyle(cellRange.row, cellRange.col);
            var ct = (style.cellType || sheet._getDefaultCellType());
            var fmt = style.formatter ? style.formatter : style._autoFormatter;
            var GeneralFormatter = Common_1.Formatter && Common_1.Formatter.GeneralFormatter;
            if (trendValue instanceof Date && GeneralFormatter) {
                fmt = new GeneralFormatter(Common_1.Common.CultureManager._getCultureInfo().DateTimeFormat.shortDatePattern + ' hh:mm:ss AM/PM;@', '0');
            }
            var hitInfo = self._startHitInfo, hitType = 3 ;
            if (hitInfo) {
                hitType = hitInfo._hitTestType;
            }
            var context = {
                sheet: sheet,
                row: cellRange.row,
                col: cellRange.col,
                sheetArea: hitType,
                quotePrefix: style.quotePrefix
            };
            var formattedData = {};
            return ct.format(trendValue, fmt, formattedData, context);
        }
        else if (actualFillType === 0 ) {
            cellRange = self._getAvailableRange(fillDirection, fillRange, startRange);
            var formula = sheet.getFormula(cellRange.row, cellRange.col);
            if (formula) {
                return keyword_null;
            }
            return sheet.getText(cellRange.row, cellRange.col);
        }
        return keyword_null;
    },
    _getAvailableRange: function (fillDirection, fillRange, startRange) {
        var startRangeRow = startRange.row;
        var startRangeCol = startRange.col;
        var startRangeRowCount = getRowCount(startRange);
        var startRangeColCount = getColCount(startRange);
        var cellRange = createRange(startRangeRow, startRangeCol, 1, 1);
        var index;
        if (fillDirection === 3 ) {
            index = getRowCount(fillRange) % startRangeRowCount;
            if (index === 0) {
                index = startRangeRow + startRangeRowCount - 1;
            }
            else {
                index = startRangeRow + index - 1;
            }
            cellRange.row = index;
            cellRange.col = startRangeCol;
        }
        else if (fillDirection === 1 ) {
            index = getColCount(fillRange) % startRangeColCount;
            if (index === 0) {
                index = startRangeCol + startRangeColCount - 1;
            }
            else {
                index = startRangeCol + index - 1;
            }
            cellRange.row = startRangeRow;
            cellRange.col = index;
        }
        else if (fillDirection === 0 ) {
            index = getColCount(fillRange) % startRangeColCount;
            if (index === 0) {
                index = startRangeCol;
            }
            else {
                index = startRangeCol + startRangeColCount - index;
            }
            cellRange.row = startRangeRow;
            cellRange.col = index;
        }
        else if (fillDirection === 2 ) {
            index = getRowCount(fillRange) % startRangeRowCount;
            if (index === 0) {
                index = startRangeRow;
            }
            else {
                index = startRangeRow + startRangeRowCount - index;
            }
            cellRange.row = index;
            cellRange.col = startRangeCol;
        }
        return cellRange;
    },
    _showDragFillTooltip: function () {
        var self = this;
        var sheet = self._sheet;
        var autoFillType = self._getDragAutoFillType();
        if (autoFillType === 4 ||
            self._isDragFillWholeRows() ||
            self._isDragFillWholeColumns()) {
            self._removeTooltip();
            return keyword_null;
        }
        var left, top, info;
        var fillDirection = self._getCurrentFillDirection();
        var dragFillFrameRange = self._getDragFillFrameRange();
        var rect = sheet._getRangeWholeRect(dragFillFrameRange);
        info = self._getDragFillTooltipContent();
        if (fillDirection === 3 || fillDirection === 1 ) {
            left = rect.x + rect.width + DRAGFILLTOOLTIP_OFFSET;
            top = rect.y + rect.height + DRAGFILLTOOLTIP_OFFSET;
        }
        else if (fillDirection === 0 ) {
            left = rect.x + DRAGFILLTOOLTIP_OFFSET;
            top = rect.y + rect.height + DRAGFILLTOOLTIP_OFFSET;
        }
        else if (fillDirection === 2 ) {
            left = rect.x + rect.width + DRAGFILLTOOLTIP_OFFSET;
            top = rect.y + DRAGFILLTOOLTIP_OFFSET;
        }
        self._showTooltip(info, left, top);
    },
    _refreshDragFill: function () {
        var self = this;
        self._clearDragFill();
        self._refreshSelectionBorder();
        self._paintDragFill();
        self._oldDragFillFrameRange = self._getDragFillFrameRange();
    },
    _clearDragFill: function () {
        var sheet = this._sheet;
        if (this._oldDragFillFrameRange) {
            var oldDragFillRect = sheet._getRangeWholeRect(this._oldDragFillFrameRange);
            oldDragFillRect.x -= 2;
            oldDragFillRect.y -= 2;
            oldDragFillRect.width += 4;
            oldDragFillRect.height += 4;
            sheet._render._copyDoubleBufferRect(oldDragFillRect);
        }
    },
    _refreshSelectionBorder: function (ctx) {
        var sheet = this._sheet;
        sheet._render._repaintSelection(this._dragFillStartRange, keyword_null, ctx);
    },
    _paintDragFill: function () {
        var sheet = this._sheet;
        var render = sheet._render;
        var dragFillFrameRange = this._getDragFillFrameRange();
        if (!dragFillFrameRange) {
            return;
        }
        var ctx = render._getCtx();
        var dragFillRect = sheet._getRangeWholeRect(dragFillFrameRange);
        ctx.save();
        ctx.beginPath();
        render._paintDragRectangle(ctx, dragFillRect);
        ctx.restore();
    },
    _updateCurrentFillRange: function () {
        this._currentFillRange = this._getCurrentFillRange();
    },
    _isDragFillWholeRows: function () {
        return this._dragFillStartRange.col === -1 && this._dragFillStartRange.row !== -1;
    },
    _isDragFillWholeColumns: function () {
        return this._dragFillStartRange.row === -1 && this._dragFillStartRange.col !== -1;
    },
    _isDragClear: function () {
        return this._currentFillDirection === 4 || this._currentFillDirection === 5 ;
    },
    _getCurrentFillRange: function () {
        var self = this;
        var row = -1, column = -1, rowCount = -1, columnCount = -1;
        switch (self._currentFillDirection) {
            case 0 :
                if (self._isDragFillWholeColumns()) {
                    row = -1;
                    rowCount = -1;
                }
                else {
                    row = self._dragFillStartTopRow();
                    rowCount = getRowCount(self._dragFillStartRange);
                }
                column = self._dragToColumn;
                columnCount = self._dragFillStartLeftColumn() - column;
                break;
            case 1 :
                if (self._isDragFillWholeColumns()) {
                    row = -1;
                    rowCount = -1;
                }
                else {
                    row = self._dragFillStartTopRow();
                    rowCount = getRowCount(self._dragFillStartRange);
                }
                column = self._dragFillStartRightColumn() + 1;
                columnCount = self._dragToColumn - column + 1;
                break;
            case 2 :
                row = self._dragToRow;
                rowCount = self._dragFillStartTopRow() - row;
                if (self._isDragFillWholeRows()) {
                    column = -1;
                    columnCount = -1;
                }
                else {
                    column = self._dragFillStartLeftColumn();
                    columnCount = getColCount(self._dragFillStartRange);
                }
                break;
            case 3 :
                row = self._dragFillStartBottomRow() + 1;
                rowCount = self._dragToRow - row + 1;
                if (self._isDragFillWholeRows()) {
                    column = -1;
                    columnCount = -1;
                }
                else {
                    column = self._dragFillStartLeftColumn();
                    columnCount = getColCount(self._dragFillStartRange);
                }
                break;
            case 5 :
                row = self._dragToRow;
                rowCount = self._dragFillStartBottomRow() - row + 1;
                if (self._isDragFillWholeRows()) {
                    column = -1;
                    columnCount = -1;
                }
                else {
                    column = self._dragFillStartLeftColumn();
                    columnCount = getColCount(self._dragFillStartRange);
                }
                break;
            case 4 :
                if (self._isDragFillWholeColumns()) {
                    row = -1;
                    rowCount = -1;
                }
                else {
                    row = self._dragFillStartRange.row;
                    rowCount = getRowCount(self._dragFillStartRange);
                }
                column = self._dragToColumn;
                columnCount = self._dragFillStartRightColumn() - column + 1;
                break;
            default:
                break;
        }
        return createRange(row, column, rowCount, columnCount);
    },
    _dragFillStartBottomRowLayout: function () {
        var dragStartBottomRow = this._dragFillStartBottomRow();
        if (dragStartBottomRow !== -1) {
            return this._sheet._getRowLayout(this._dragFillStartBottomRowViewport).findRow(dragStartBottomRow);
        }
        return keyword_null;
    },
    _dragFillToViewportBottomRowLayout: function () {
        return this._sheet._getRowLayout(this._dragToRowViewport).findRow(this._dragFillToViewportBottomRow());
    },
    _dragFillToViewportBottomRow: function () {
        return this._sheet.getViewportBottomRow(this._dragToRowViewport);
    },
    _dragFillStartRightColumnLayout: function () {
        var dragStartRightColumn = this._dragFillStartRightColumn();
        if (dragStartRightColumn !== -1) {
            return this._sheet._getColumnLayout(this._dragFillStartRightColumnViewport).findCol(dragStartRightColumn);
        }
        return keyword_null;
    },
    _dragFillToViewportRightColumnLayout: function () {
        return this._sheet._getColumnLayout(this._dragToColumnViewport).findCol(this._dragFillToViewportRightColumn());
    },
    _dragFillToViewportRightColumn: function () {
        return this._sheet.getViewportRightColumn(this._dragToColumnViewport);
    },
    _updateCurrentFillSettings: function () {
        var self = this;
        var isWholeRows = self._isDragFillWholeRows(), isWholeColumns = self._isDragFillWholeColumns();
        var t = $(self._sheet._getCanvas()).offset();
        var e = self._mousePosition.e, x = self._mousePosition.x, y = self._mousePosition.y;
        var actualX = e.pageX - t.left, actualY = e.pageY - t.top, notClear = false;
        var hOffset, vOffset;
        if (!isWholeRows && !isWholeColumns) {
            if (self._dragToRow >= self._dragFillStartTopRow() && self._dragToRow <= self._dragFillStartBottomRow()) {
                if (self._dragToColumn >= self._dragFillStartLeftColumn() &&
                    self._dragToColumn <= self._dragFillStartRightColumn()) {
                    hOffset = Math_abs(self._dragToColumn - self._dragFillStartRightColumn());
                    vOffset = Math_abs(self._dragToRow - self._dragFillStartBottomRow());
                    if (vOffset > hOffset) {
                        self._currentFillDirection = 5 ;
                    }
                    else if (vOffset < hOffset) {
                        self._currentFillDirection = 4 ;
                    }
                    else {
                        var dragFillStartBottomRowLayout = self._dragFillStartBottomRowLayout();
                        if (!dragFillStartBottomRowLayout) {
                            dragFillStartBottomRowLayout = self._dragFillToViewportBottomRowLayout();
                        }
                        if (y > dragFillStartBottomRowLayout.y + dragFillStartBottomRowLayout.height) {
                            self._currentFillDirection = 3 ;
                        }
                        else {
                            var dragFillStartRightColumnLayout = self._dragFillStartRightColumnLayout();
                            if (!dragFillStartRightColumnLayout) {
                                dragFillStartRightColumnLayout = self._dragFillToViewportRightColumnLayout();
                            }
                            var hDistance = dragFillStartRightColumnLayout.x + dragFillStartRightColumnLayout.width - x;
                            var vDistance = dragFillStartBottomRowLayout.y + dragFillStartBottomRowLayout.height - y;
                            if (actualX >= dragFillStartRightColumnLayout.x &&
                                actualX <= dragFillStartRightColumnLayout.x + dragFillStartRightColumnLayout.width &&
                                actualY >= dragFillStartBottomRowLayout.y &&
                                actualY <= dragFillStartBottomRowLayout.y + dragFillStartBottomRowLayout.height) {
                                if (hDistance >= vDistance) {
                                    self._currentFillDirection = 4 ;
                                }
                                else {
                                    self._currentFillDirection = 5 ;
                                }
                            }
                            else {
                                notClear = true;
                            }
                        }
                    }
                }
                else if (self._dragToColumn < self._dragFillStartLeftColumn()) {
                    self._currentFillDirection = 0 ;
                }
                else if (self._dragToColumn > self._dragFillStartRightColumn()) {
                    self._currentFillDirection = 1 ;
                }
            }
            else if (self._dragToRow < self._dragFillStartTopRow()) {
                if (self._dragToColumn >= self._dragFillStartLeftColumn() &&
                    self._dragToColumn <= self._dragFillStartRightColumn()) {
                    self._currentFillDirection = 2 ;
                }
                else if (self._dragToColumn < self._dragFillStartLeftColumn()) {
                    hOffset = Math_abs(self._dragToColumn - self._dragFillStartLeftColumn());
                    vOffset = Math_abs(self._dragToRow - self._dragFillStartTopRow());
                    if (vOffset >= hOffset) {
                        self._currentFillDirection = 2 ;
                    }
                    else {
                        self._currentFillDirection = 0 ;
                    }
                }
                else if (self._dragToColumn > self._dragFillStartRightColumn()) {
                    hOffset = Math_abs(self._dragToColumn - self._dragFillStartRightColumn());
                    vOffset = Math_abs(self._dragToRow - self._dragFillStartTopRow());
                    if (vOffset >= hOffset) {
                        self._currentFillDirection = 2 ;
                    }
                    else {
                        self._currentFillDirection = 1 ;
                    }
                }
            }
            else if (self._dragToRow > self._dragFillStartBottomRow()) {
                if (self._dragToColumn >= self._dragFillStartLeftColumn() &&
                    self._dragToColumn <= self._dragFillStartRightColumn()) {
                    self._currentFillDirection = 3 ;
                }
                else if (self._dragToColumn < self._dragFillStartLeftColumn()) {
                    hOffset = Math_abs(self._dragToColumn - self._dragFillStartLeftColumn());
                    vOffset = Math_abs(self._dragToRow - self._dragFillStartBottomRow());
                    if (vOffset >= hOffset) {
                        self._currentFillDirection = 3 ;
                    }
                    else {
                        self._currentFillDirection = 0 ;
                    }
                }
                else if (self._dragToColumn > self._dragFillStartRightColumn()) {
                    hOffset = Math_abs(self._dragToColumn - self._dragFillStartRightColumn());
                    vOffset = Math_abs(self._dragToRow - self._dragFillStartBottomRow());
                    if (vOffset >= hOffset) {
                        self._currentFillDirection = 3 ;
                    }
                    else {
                        self._currentFillDirection = 1 ;
                    }
                }
            }
        }
        else if (isWholeColumns) {
            if (self._dragToColumn >= self._dragFillStartLeftColumn() &&
                self._dragToColumn <= self._dragFillStartRightColumn()) {
                self._currentFillDirection = 4 ;
            }
            else if (self._dragToColumn < self._dragFillStartLeftColumn()) {
                self._currentFillDirection = 0 ;
            }
            else if (self._dragToColumn > self._dragFillStartRightColumn()) {
                self._currentFillDirection = 1 ;
            }
        }
        else if (isWholeRows) {
            if (self._dragToRow >= self._dragFillStartTopRow() && self._dragToRow <= self._dragFillStartBottomRow()) {
                self._currentFillDirection = 5 ;
            }
            else if (self._dragToRow < self._dragFillStartTopRow()) {
                self._currentFillDirection = 2 ;
            }
            else if (self._dragToRow > self._dragFillStartBottomRow()) {
                self._currentFillDirection = 3 ;
            }
        }
        var rect = self._sheet._render._dragFillIndicatorRect;
        if (rect) {
            var currentRow = self._dragFillStartBottomRow(), currentColumn = self._dragFillStartRightColumn(), nextRow = currentRow + 1, nextColumn = currentColumn + 1;
            var currentRowHieght = self._sheet.getRowHeight(currentRow, 3 ), currentColumnWidth = self._sheet.getColumnWidth(currentColumn, 3 ), nextRowHeight = self._sheet.getRowHeight(nextRow, 3 ), nextColumnWidth = self._sheet.getColumnWidth(nextColumn, 3 );
            var minX = (rect.x + rect.width / 2) - Math_min(10, currentColumnWidth / 2), maxX = (rect.x + rect.width / 2) + Math_min(10, nextColumnWidth / 2), minY = (rect.y + rect.height / 2) - Math_min(10, currentRowHieght / 2), maxY = (rect.y + rect.height / 2) + Math_min(10, nextRowHeight / 2);
            var isAroundIndicator = false;
            if (!isWholeRows && !isWholeColumns) {
                isAroundIndicator = (minX <= actualX && actualX <= maxX && minY <= actualY && actualY <= maxY);
            }
            else if (isWholeColumns) {
                isAroundIndicator = (minX <= actualX && actualX <= maxX);
            }
            else {
                isAroundIndicator = (minY <= actualY && actualY <= maxY);
            }
            if (isAroundIndicator || notClear) {
                self._isDragAroundIndicator = true;
                self._currentFillDirection = 4 ;
            }
            else {
                self._isDragAroundIndicator = false;
            }
        }
    },
    _dragFillStartTopRow: function () {
        if (!this._dragFillStartRange) {
            return -1;
        }
        else if (this._dragFillStartRange.row === -1) {
            return 0;
        }
        return this._dragFillStartRange.row;
    },
    _dragFillStartBottomRow: function () {
        var self = this;
        if (!self._dragFillStartRange) {
            return -1;
        }
        else if (self._dragFillStartRange.row === -1) {
            return getSheetRowCount(self._sheet) - 1;
        }
        return self._dragFillStartRange.row + getRowCount(self._dragFillStartRange) - 1;
    },
    _dragFillStartLeftColumn: function () {
        if (!this._dragFillStartRange) {
            return -1;
        }
        else if (this._dragFillStartRange.col === -1) {
            return 0;
        }
        return this._dragFillStartRange.col;
    },
    _dragFillStartRightColumn: function () {
        var self = this;
        if (!self._dragFillStartRange) {
            return -1;
        }
        else if (self._dragFillStartRange.col === -1) {
            return getSheetColumnCount(self._sheet) - 1;
        }
        return self._dragFillStartRange.col + getColCount(self._dragFillStartRange) - 1;
    },
    _fixFillRange: function (startRange, fillRange) {
        var range = createRange(fillRange.row, fillRange.col, fillRange.rowCount, fillRange.colCount);
        var sheet = this._sheet;
        if (sheet._modelManager.findSpan(startRange.row, startRange.col)) {
            var startRange_rowCount = startRange.rowCount, fillRange_rowCount = range.rowCount;
            if (Math.floor(fillRange_rowCount % startRange_rowCount) !== 0) {
                var tempRowCount = Math.ceil(fillRange_rowCount / startRange_rowCount) * startRange_rowCount;
                if (range.row + tempRowCount <= sheet.getRowCount()) {
                    range.rowCount = tempRowCount;
                }
            }
            var startRange_colCount = startRange.colCount, fillRange_colCount = range.colCount;
            if (Math.floor(fillRange_colCount % startRange_colCount) !== 0) {
                var tempColCount = Math.ceil(fillRange_colCount / startRange_colCount) * startRange_colCount;
                if (range.col + tempColCount <= sheet.getColumnCount()) {
                    range.colCount = tempColCount;
                }
            }
        }
        return range;
    },
    _endDragFill: function () {
        var self = this, sheet = self._sheet;
        self._startHitInfo = keyword_null;
        self._stopScroll();
        self._removeTooltip();
        if (!self._isDraggingFill || !self._isWorking) {
            self._resetDragFill();
            return;
        }
        self._isDraggingFill = false;
        self._isWorking = false;
        var wholeFillRange = self._getDragFillFrameRange();
        if (!wholeFillRange) {
            return;
        }
        var canDragFill = self._validateFillRange(self._dragFillStartRange, self._currentFillRange);
        if (!canDragFill || self._isDragAroundIndicator) {
            self._resetDragFill();
            self._refreshSelection(wholeFillRange);
        }
        else {
            var startRange = sheet._eventHandler._dragFillStartRange, fillRange = self._fixFillRange(startRange, self._currentFillRange);
            var autoFillType = self._getDragAutoFillType();
            sheet._commandManager().execute({
                cmd: 'fill', sheetName: sheet.name(),
                startRange: startRange, fillRange: fillRange,
                autoFillType: autoFillType, fillDirection: sheet._eventHandler._getCurrentFillDirection()
            });
            var cancel = self._isCancelDragFill;
            if (!cancel && self._isDragFill() && sheet.parent.options.showDragFillSmartTag &&
                self._currentDragFillType !== 4 ) {
                self._showDragFillSmartTag(self._currentDragFillType);
            }
            else {
                self._refreshSelection(wholeFillRange);
            }
            self._resetDragFill();
        }
    },
    _showDragFillSmartTag: function (autoFillType) {
        var sheet = this._sheet;
        var rect = sheet._render._dragFillIndicatorRect;
        var fillInfo = {
            x: rect.x + rect.width,
            y: rect.y + rect.height,
            fillType: autoFillType
        };
        sheet._fillDialog = new fill_ui_1._FillDialog(sheet.parent._getContainerDiv(), sheet, fillInfo);
        sheet._fillDialog._open();
    },
    _updateDragFillStartRange: function () {
        var sheet = this._sheet;
        var selections = sheet._modelManager.getSelections();
        if (selections.length === 1) {
            this._dragFillStartRange = selections[0];
        }
        else if (sheet._activeRowIndex >= 0 && sheet._activeColIndex >= 0) {
            this._dragFillStartRange = createRange(sheet._activeRowIndex, sheet._activeColIndex, 1, 1);
        }
    },
    _resetDragFill: function () {
        this._isWorking = false;
        this._isDraggingFill = false;
    },
    _refreshSelection: function (range) {
        this._sheet._render._repaintSelection(range);
    },
    _getDragAutoFillType: function (fillType, isFillWithoutFormatting) {
        var self = this, sheet = self._sheet, defaultDragFillType = fillType !== keyword_undefined ? fillType : sheet.parent.options.defaultDragFillType;
        if (self._isDragClear()) {
            return 4 ;
        }
        if (defaultDragFillType !== 5 ) {
            return defaultDragFillType;
        }
        var isDragSingleCell = (getRowCount(self._dragFillStartRange) === 1 &&
            getColCount(self._dragFillStartRange) === 1) && !self._isDragFillWholeColumns() && !self._isDragFillWholeRows();
        if (isDragSingleCell) {
            if (self._isControlPressed && !isFillWithoutFormatting) {
                return 1 ;
            }
            return 0 ;
        }
        if (self._isControlPressed && !isFillWithoutFormatting) {
            return 0 ;
        }
        return 1 ;
    },
    _getDragFillFrameRange: function () {
        var self = this;
        if (!self._dragFillStartRange) {
            return keyword_null;
        }
        if (self._isDragClear()) {
            return self._dragFillStartRange;
        }
        if (!self._currentFillRange) {
            return keyword_null;
        }
        var row = 0, rowCount = 0, column = 0, columnCount = 0;
        if (self._isVerticalDragFill()) {
            row = self._currentFillDirection === 2 ? self._currentFillRange.row : self._dragFillStartRange.row;
            rowCount = getRowCount(self._dragFillStartRange) + getRowCount(self._currentFillRange);
            column = self._dragFillStartRange.col;
            columnCount = getColCount(self._dragFillStartRange);
        }
        else {
            row = self._dragFillStartRange.row;
            rowCount = getRowCount(self._dragFillStartRange);
            column = self._currentFillDirection === 0 ? self._currentFillRange.col : self._dragFillStartRange.col;
            columnCount = getColCount(self._dragFillStartRange) + getColCount(self._currentFillRange);
        }
        return createRange(row, column, rowCount, columnCount);
    },
    _validateFillRange: function (startRange, fillRange, ignoreEvent) {
        var sheet = this._sheet;
        var canDragFill = true;
        var invalidMessage = '';
        if (sheet._modelManager._hasSpans(fillRange.row, fillRange.col, getRowCount(fillRange), getColCount(fillRange)) && !canDragFillSpan(sheet, startRange, fillRange)) {
            canDragFill = false;
            invalidMessage = getSR().Exp_FillRangeContainsMergedCell;
        }
        if (canDragFill && sheet.options.isProtected && sheet._isAnyCellInRangeLocked(fillRange, true)) {
            canDragFill = false;
            invalidMessage = getSR().Exp_FillCellsReadOnly;
        }
        if (!canDragFill && !ignoreEvent) {
            sheet._raiseInvalidOperation(2 , invalidMessage);
        }
        return canDragFill;
    },
    _isDragFill: function () {
        return this._isIncreaseFill() || this._isDecreaseFill();
    },
    _isIncreaseFill: function () {
        return this._currentFillDirection === 3 || this._currentFillDirection === 1 ;
    },
    _isDecreaseFill: function () {
        return this._currentFillDirection === 0 || this._currentFillDirection === 2 ;
    },
    _isVerticalDragFill: function () {
        return this._currentFillDirection === 2 ||
            this._currentFillDirection === 3 ||
            this._currentFillDirection === 5 ;
    },
    _getCurrentFillDirection: function () {
        var currentFillDirection = this._currentFillDirection;
        if (currentFillDirection >= 0 && currentFillDirection <= 3) {
            return currentFillDirection;
        }
        if (currentFillDirection === 4 ) {
            return 0 ;
        }
        if (currentFillDirection === 5) {
            return 2 ;
        }
        return 3 ;
    },
    _getDragInfo: function (target, x, y) {
        var self = this;
        var op = keyword_null;
        var rowViewportIndex = getRowViewportIndex(target), colViewportIndex = getColViewportIndex(target);
        var sheet = self._sheet, parent = sheet.parent;
        if (isNullOrUndefined(rowViewportIndex) || isNullOrUndefined(colViewportIndex) || !parent.options.allowUserDragDrop && !parent.options.allowUserDragFill) {
            return op;
        }
        var activeSelRange = sheet._getActiveSelectedRange();
        if (activeSelRange.row === -1 && activeSelRange.col === -1) {
            return op;
        }
        if (rowViewportIndex >= 0 && colViewportIndex >= 0 && sheet._modelManager.getSelections().length === 1) {
            if (self._inGrayArea(rowViewportIndex, colViewportIndex, x, y)) {
                return op;
            }

            var r = sheet.getRangeRect(rowViewportIndex, colViewportIndex, activeSelRange);
            if (r.x - 4 < x && x < r.x + 4 && r.y <= y && y < r.y + r.height) {
                op = { action: DRAG, side: 'left' };
            }
            if (!op) {
                var rect = self._sheet._render._dragFillIndicatorRect;
                if (rect && rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height) {
                    op = { action: DRAG, side: CORNER };
                }
            }
            if (!op) {
                if (r.x + r.width - 4 < x && x < r.x + r.width + 4 && r.y <= y && y < r.y + r.height) {
                    op = { action: DRAG, side: 'right' };
                }
            }
            if (!op) {
                if (r.y - 4 < y && y < r.y + 4 && r.x <= x && x < r.x + r.width) {
                    op = { action: DRAG, side: 'top' };
                }
            }
            if (!op) {
                if (r.y + r.height - 4 < y && y < r.y + r.height + 4 && r.x <= x && x < r.x + r.width) {
                    op = { action: DRAG, side: 'bottom' };
                }
            }
            if (op) {
                if (x < r.x || x > r.x + r.width || y < r.y || y > r.y + r.height) {
                    op.outside = true;
                }
            }
        }
        if (!parent || !parent.options.allowUserDragDrop) {
            if (op && op.side !== CORNER) {
                op.side = keyword_null;
            }
        }
        if (!parent || !parent.options.allowUserDragFill) {
            if (op && op.side === CORNER) {
                op.side = keyword_null;
            }
        }
        return op;
    },
    _isCellHaveValue: function (row, col) {
        var self = this, sheet = self._sheet;
        var cellInSpan = sheet.getSpan(row, col, 3);
        if (cellInSpan) {
            return !isNullOrUndefined(self._sheet.getValue(cellInSpan.row, cellInSpan.col, 3 , 0 ));
        }
        return !isNullOrUndefined(self._sheet.getValue(row, col, 3 , 0 ));
    },
    _isAllHasValue: function (row, col, rowCount, colCount) {
        var self = this;
        for (var c = col; c < col + colCount; c++) {
            if (!self._isCellHaveValue(row, c)) {
                return false;
            }
        }
        return true;
    },
    _isAllIsEmpty: function (row, col, rowCount, colCount) {
        var self = this;
        for (var c = col; c < col + colCount; c++) {
            if (self._isCellHaveValue(row, c)) {
                return false;
            }
        }
        return true;
    },
    _setSearchInfo: function (row, col, searchObj, directionFlag) {
        var self = this;
        var sheet = self._sheet;
        if (directionFlag === 'left') {
            for (var i = 0; i < col; i++) {
                if (self._isCellHaveValue(row, i)) {
                    searchObj.searchArray[i] = true;
                }
            }
            var leftCol = col - 1;
            var searchLeftLength = 1;
            while (searchObj.searchArray[leftCol]) {
                leftCol--;
                searchLeftLength++;
            }
            searchObj.searchLength = searchLeftLength;
        }
        if (directionFlag === 'right') {
            var columnCount = sheet.getColumnCount();
            for (var j = col; j < columnCount; j++) {
                if (self._isCellHaveValue(row, j)) {
                    searchObj.searchArray[j - col] = true;
                }
            }
            var rightCol = 0;
            var searchRightLength = 1;
            while (searchObj.searchArray[rightCol]) {
                rightCol++;
                searchRightLength++;
            }
            searchObj.searchLength = searchRightLength;
        }
        return searchObj;
    },
    _getDoubleClickFillRowCountImp: function (startRange, topCellRow, bottomCellRow, mostLeftCellCol, mostRightCellCol) {
        var self = this;
        var sheet = self._sheet;
        var fillRowCount = 0;
        var searchLeftObj = {
            searchArray: new Array(mostLeftCellCol),
            searchLength: 1
        };
        var searchRightObj = {
            searchArray: new Array(sheet.getColumnCount() - mostRightCellCol),
            searchLength: 1
        };
        for (var r = topCellRow; r < bottomCellRow; r++) {
            searchLeftObj = self._setSearchInfo(r, startRange.col, searchLeftObj, 'left');
            searchRightObj = self._setSearchInfo(r, startRange.col + startRange.colCount - 1, searchRightObj, 'right');
        }
        while (self._isAllIsEmpty(bottomCellRow + fillRowCount, startRange.col, 1, startRange.colCount)) {
            var needSearchRightFlag = true;
            var needReturnFlag = false;
            searchLeftObj = self._setSearchInfo(bottomCellRow + fillRowCount, mostLeftCellCol, searchLeftObj, 'left');
            searchRightObj = self._setSearchInfo(bottomCellRow + fillRowCount, mostRightCellCol, searchRightObj, 'right');

            for (var cL = mostLeftCellCol - 1; cL >= mostLeftCellCol - searchLeftObj.searchLength; cL--) {
                if (self._isCellHaveValue(bottomCellRow + fillRowCount, cL)) {
                    fillRowCount++;
                    needSearchRightFlag = false;
                    break;
                }
            }

            if (needSearchRightFlag) {
                for (var cR = mostRightCellCol + 1; cR <= mostRightCellCol + searchRightObj.searchLength; cR++) {
                    if (self._isCellHaveValue(bottomCellRow + fillRowCount, cR)) {
                        fillRowCount++;
                        needReturnFlag = true;
                        break;
                    }
                }
                if (!needReturnFlag) {
                    return fillRowCount;
                }
            }
        }
        return fillRowCount;
    },
    _getFillDirectDownRowCount: function (startRange) {
        var self = this;
        var fillRowCount = 0;
        while (self._isAllHasValue(startRange.row + startRange.rowCount + fillRowCount, startRange.col, 1, startRange.colCount)) {
            fillRowCount++;
        }
        return fillRowCount;
    },
    _getDoubleClickFillRowCount: function (startRange) {
        var self = this;
        var mostLeftCellCol, mostRightCellCol, topCellRow, bottomCellRow;
        if (self._isAllHasValue(startRange.row + startRange.rowCount, startRange.col, 1, startRange.colCount)) {
            return self._getFillDirectDownRowCount(startRange);
        }

        topCellRow = startRange.row - 2;
        bottomCellRow = startRange.row + startRange.rowCount;
        if (startRange.colCount === 1) {
            mostRightCellCol = mostLeftCellCol = startRange.col;
        }
        else {
            mostLeftCellCol = startRange.col;
            mostRightCellCol = startRange.col + startRange.colCount - 1;
        }
        return self._getDoubleClickFillRowCountImp(startRange, topCellRow, bottomCellRow, mostLeftCellCol, mostRightCellCol);
    },
    _doDoubleClickFill: function () {
        var self = this;
        var sheet = self._sheet;
        var startRange = sheet._eventHandler._dragFillStartRange;
        var fillRowCount = self._getDoubleClickFillRowCount(startRange);
        if (fillRowCount === 0) {
            return;
        }
        var fillRange = createRange(startRange.row + startRange.rowCount, startRange.col, fillRowCount, startRange.colCount);
        self._currentFillDirection = 3;

        self._currentFillRange = fillRange;
        var autoFillType = self._getDragAutoFillType();
        var cancel = self._isCancelDragFill;
        sheet._commandManager().execute({
            cmd: 'fill', sheetName: sheet.name(),
            startRange: startRange,
            fillRange: fillRange,
            autoFillType: autoFillType,
            fillDirection: self._currentFillDirection
        });
        if (!cancel && sheet.parent.options.showDragFillSmartTag &&
            self._currentDragFillType !== 4 ) {
            self._showDragFillSmartTag(self._currentDragFillType);
        }
    }
});
$.extend(Core_1._SheetRender.prototype, {
    _getDragFillIndicatorRect: function (selectRect, themeVersion) {
        var sheet = this._sheet;
        var selectRect_x = selectRect.x, selectRect_y = selectRect.y, selectRect_width = getWidth(selectRect), selectRect_height = getHeight(selectRect);
        var range = sheet._getActiveSelectedRange();
        var layout = sheet._getSheetLayout();
        var sizeAdjust = 4, posAdjust = -2 - 0.5;
        if (themeVersion > 2007 ) {
            sizeAdjust = 5;
            posAdjust = -3;
        }
        var rect = new Core_1.Rect(-4, -4, sizeAdjust, sizeAdjust);
        if (range.col === -1) {
            rect.x = layout._frozenX;
            rect.y = selectRect_y + selectRect_height + posAdjust;
        }
        else if (range.row === -1) {
            rect.x = selectRect_x + selectRect_width + posAdjust;
            rect.y = layout._frozenY;
        }
        else {
            rect.x = selectRect_x + selectRect_width + posAdjust;
            rect.y = selectRect_y + selectRect_height + posAdjust;
        }
        return rect;
    },
    _paintDragFillIndicator: function (ctx, rowViewportIndex, colViewportIndex, selectRect, clipRect) {
        var self = this, sheet = self._sheet;
        var layout = sheet._getSheetLayout();
        var parent = sheet.parent, themeVersion = parent && parent._themeVersion;
        var indicatorRect = self._getDragFillIndicatorRect(selectRect, themeVersion), indicatorRect_x = indicatorRect.x, indicatorRect_y = indicatorRect.y, indicatorRect_width = getWidth(indicatorRect), indicatorRect_height = getHeight(indicatorRect);
        var viewportRect = layout._viewportRect(rowViewportIndex, colViewportIndex);
        if (!clipRect || indicatorRect.intersectRect(clipRect)) {
            if (indicatorRect.intersectRect(viewportRect)) {
                var adjustSize = -1.5;
                if (themeVersion > 2007 ) {
                    adjustSize = -1;
                }
                var copyRect = new Core_1.Rect(indicatorRect_x + adjustSize, indicatorRect_y + adjustSize, indicatorRect_width + 2, indicatorRect_height + 2);
                copyRect.x = Math_max(copyRect.x, viewportRect.x);
                copyRect.y = Math_max(copyRect.y, viewportRect.y);
                self._copyDoubleBufferRect(copyRect);
                ctx.save();
                if (clipRect && !clipRect.containsRect(indicatorRect)) {
                    ctx.rect(clipRect.x, clipRect.y, getWidth(clipRect), getHeight(clipRect));
                    ctx.clip();
                }
                ctx.beginPath();
                ctx.fillStyle = Core_1._ThemeContext._getColor(sheet, sheet.getSelectionBorderColor());
                ctx.fillRect(indicatorRect_x, indicatorRect_y, indicatorRect_width, indicatorRect_height);
                self._dragFillIndicatorRect = new Core_1.Rect(indicatorRect.x, indicatorRect.y, 4, 4);
                ctx.beginPath();
                ctx.restore();
            }
        }
    },
    _paintDragRectangle: function (ctx, rect) {
        var x = rect.x, y = rect.y, rightX = x + getWidth(rect), bottomY = y + getHeight(rect);

        paintDragLine(ctx, x, y, rightX, y);

        paintDragLine(ctx, x, bottomY, rightX, bottomY);

        paintDragLine(ctx, x, y, x, bottomY);

        paintDragLine(ctx, rightX, y, rightX, bottomY);
    },
    _paintDragDropIndicator: function (ctx, viewportClipRect) {
        var self = this;
        var sheet = self._sheet;
        var dragRect = sheet._eventHandler._dragRect, hitTarget = dragRect.hitTarget;
        if (!dragRect || !hitTarget) {
            return;
        }
        var dragRect_hitCol = dragRect.hitCol, dragRect_hitRow = dragRect.hitRow;
        var isDragInsert = sheet._eventHandler._isDragInsert;
        var oldRect = sheet._dragOldRect, clipRect;
        ctx.save();
        if (isDragInsert === true && (dragRect.row === -1 || dragRect.col === -1)) {
            if (dragRect.row === -1 && dragRect.col !== -1) {
                var cl = sheet._getColumnLayout(0).findCol(dragRect_hitCol);
                if (!cl) {
                    cl = sheet._getColumnLayout(1).findCol(dragRect_hitCol);
                }
                if (!cl) {
                    cl = sheet._getColumnLayout(2).findCol(dragRect_hitCol);
                }
                if (cl) {
                    var x = cl.x;
                    var width = getWidth(cl);
                    dragRect.col = dragRect_hitCol;
                    if (hitTarget.x > x + width / 2 && (dragRect.col < sheet._getLastFullyVisibleColumn() || dragRect.col === sheet._getLastVisualColumn())) {
                        x = cl.x + getWidth(cl);
                        dragRect.col++;
                    }
                    if (!oldRect || getWidth(oldRect) !== 0) {
                        oldRect = sheet._eventHandler._dragRect;
                    }
                    if (oldRect) {
                        clipRect = new Core_1.Rect(oldRect.x - 2, oldRect.y - 2, getWidth(oldRect) + 4, getHeight(oldRect) + 4);
                        self._copyDoubleBufferRect(clipRect, viewportClipRect);
                        self._repaintSelection(sheet._getActiveSelectedRange(), viewportClipRect);
                    }
                    sheet._insertDragRect = new Core_1.Rect(x, dragRect.y, 0, getHeight(dragRect));
                    ctx.rect(viewportClipRect.x, viewportClipRect.y, getWidth(viewportClipRect), getHeight(viewportClipRect));
                    ctx.clip();
                    ctx.beginPath();
                    paintDragLine(ctx, x, dragRect.y, x, dragRect.y + getHeight(dragRect));
                }
            }
            else if (dragRect.row !== -1 && dragRect.col === -1) {
                var rl = sheet._getRowLayout(0).findRow(dragRect_hitRow);
                if (!rl) {
                    rl = sheet._getRowLayout(1).findRow(dragRect_hitRow);
                }
                if (!rl) {
                    rl = sheet._getRowLayout(2).findRow(dragRect_hitRow);
                }
                if (rl) {
                    var y = rl.y;
                    var height = getHeight(rl);
                    dragRect.row = dragRect_hitRow;
                    if (hitTarget.y > y + height / 2 && (dragRect.row < sheet._getLastFullyVisibleRow() || dragRect.row === sheet._getLastVisualRow())) {
                        y = rl.y + getHeight(rl);
                        dragRect.row++;
                    }
                    if (!oldRect || getHeight(oldRect) !== 0) {
                        oldRect = sheet._eventHandler._dragRect;
                    }
                    if (oldRect) {
                        clipRect = new Core_1.Rect(oldRect.x - 2, oldRect.y - 2, getWidth(oldRect) + 4, getHeight(oldRect) + 4);
                        self._copyDoubleBufferRect(clipRect, viewportClipRect);
                        self._repaintSelection(sheet._getActiveSelectedRange(), viewportClipRect);
                    }
                    sheet._insertDragRect = new Core_1.Rect(dragRect.x, y, getWidth(dragRect), 0);
                    ctx.rect(viewportClipRect.x, viewportClipRect.y, getWidth(viewportClipRect), getHeight(viewportClipRect));
                    ctx.clip();
                    ctx.beginPath();
                    paintDragLine(ctx, dragRect.x, y, dragRect.x + getWidth(dragRect), y);
                }
            }
        }
        else {
            if (oldRect) {
                clipRect = new Core_1.Rect(oldRect.x - 2, oldRect.y - 2, getWidth(oldRect) + 4, getHeight(oldRect) + 4);
                self._copyDoubleBufferRect(clipRect, viewportClipRect);
                self._repaintSelection(sheet._getActiveSelectedRange(), viewportClipRect);
            }
            ctx.rect(viewportClipRect.x, viewportClipRect.y, getWidth(viewportClipRect), getHeight(viewportClipRect));
            ctx.clip();
            ctx.beginPath();
            self._paintDragRectangle(ctx, dragRect);
        }

        ctx.beginPath();
        ctx.restore();
    },
    _refreshDragDropIndicator: function () {
        var self = this;
        var sheet = self._sheet;
        var target = sheet._currentTarget;
        var dragRange = sheet._eventHandler._actualDragRange;
        if (!target || !target.dragInfo || !dragRange) {
            return;
        }
        var ctx = self._getCtx();
        var layout = sheet._getSheetLayout();
        var dragRect = sheet._eventHandler._dragRect;
        var rect = sheet._getRangeWholeRect(dragRange);

        var frozenTrailingColCount = sheet.frozenTrailingColumnCount(), frozenTrailingRowCount = sheet.frozenTrailingRowCount();
        var endCol = sheet.getColumnCount() - frozenTrailingColCount, endRow = sheet.getRowCount() - frozenTrailingRowCount;
        var vpRect = layout._viewportRect(1, 1);
        if (frozenTrailingColCount > 0 && dragRange.col + dragRange.colCount <= endCol && rect.x + getWidth(rect) > vpRect.x + getWidth(vpRect) && rect.intersectRect(vpRect)) {
            rect = rect.getIntersectRect(vpRect);
        }
        if (frozenTrailingRowCount > 0 && dragRange.row + dragRange.rowCount <= endRow && rect.y + getHeight(rect) > vpRect.y + getHeight(vpRect) && rect.intersectRect(vpRect)) {
            rect = rect.getIntersectRect(vpRect);
        }

        var viewportRect = new Core_1.Rect(layout._frozenX, layout._frozenY, layout._frozenTrailingX + layout._frozenTrailingWidth, layout._frozenTrailingY + layout._frozenTrailingHeight);
        if (getWidth(rect) > 0 && getHeight(rect) > 0) {
            dragRect.x = rect.x;
            dragRect.y = rect.y;
            dragRect.width = getWidth(rect) - 1;
            dragRect.height = getHeight(rect) - 1;
            self._paintDragDropIndicator(ctx, viewportRect);
        }
        else if (getWidth(rect) === 0 || getHeight(rect) === 0) {
            dragRect.x = rect.x;
            dragRect.y = rect.y;
            dragRect.width = getWidth(rect);
            dragRect.height = getHeight(rect);
            self._paintDragDropIndicator(ctx, viewportRect);
        }
        var isDragInsert = sheet._eventHandler._isDragInsert;
        if (isDragInsert === true) {
            sheet._dragOldRect = sheet._insertDragRect;
        }
        else {
            sheet._dragOldRect = new Core_1.Rect(dragRect.x, dragRect.y, getWidth(dragRect), getHeight(dragRect));
        }
    }
});
/***/ }),

/***/ './dist/plugins/fill/fill-ui.js':
/*!**************************************!*\
  !*** ./dist/plugins/fill/fill-ui.js ***!
  \**************************************/
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
var fill_ns_1 = __webpack_require__(/*! ./fill.ns */ './dist/plugins/fill/fill.ns.js');
var $ = Core_1.GC$, createElement = Core_1._util._createElement, getPreferredZIndex = Core_1._util._getPreferredZIndex, $DOCUMENT = $(document);
var BUTTON_CLASS = ' btn btn-default', UI_STATE_HOVER_CLASS = 'ui-state-hover ', ITEM_CLASS = 'gc-fill-type-item', MENU_CLASS = 'gc-fill-menu-container', UI_STATE_AND_SMART_MENU_HOVER_CLASS = UI_STATE_HOVER_CLASS + 'gc-smartMenu-item-hover', UI_STATE_AND_SMART_TAG_HOVER_CLASS = UI_STATE_HOVER_CLASS + 'gc-smart-tag-hover', MENU_RADIO_CLASS = 'ui-icon ui-icon-check gc-check-image', MENU_ITEM_INPUT_CLASS = 'gc-menu-item-input', TOGGLE_CLASS = 'ui-state-active gc-smart-tag-active', TAG_CONTAINER_CLASS = 'gc-tag-container', FLOAT = 'float', LEFT = 'left', TOP = 'top', DISPLAY = 'display', WIDTH = 'width', MIN_WIDTH = 'min-width', HEIGHT = 'height', MARGIN = 'margin', CHANGE = 'change', INPUT_RADIO = 'input[type=radio]', MOUSE_OVER = 'mouseover', MOUSE_OUT = 'mouseout', CLICK = 'click', FILL_TYPE_CHANGED = 'fillTypeChanged', FILL_KEY_DOWN = 'keydown.ui-fill';


var rm = new Common_1.Common.ResourceManager(fill_ns_1.SR);
var getSR = rm.getResource.bind(rm);

function createMenuItem(sheet, id, itemClass, text, inputValue, checked) {
    var isTouchMode = sheet._isTouchMode, minWidth = isTouchMode ? '160px' : '150px', height = isTouchMode ? '25px' : '20px', outerDiv = $(createElement('div')).css([DISPLAY, MIN_WIDTH , HEIGHT, 'padding', MARGIN], ['block', minWidth, height, 0, 0]).addClass('gc-smartMenu-item-default ' + itemClass + ' ui-state-default' + BUTTON_CLASS), inputDiv = $(createElement('div')).addClass(MENU_ITEM_INPUT_CLASS).appendTo(outerDiv), spanDiv = $(createElement('div')).addClass('gc-menu-item-text').appendTo(outerDiv), itemInput = $(createElement('input')).attr({
        id: id,
        value: inputValue,
        type: 'radio',
        name: 'fill-group',
        style: 'display:none'
    }).appendTo(inputDiv);
    $(createElement('span')).text(text).appendTo(spanDiv);
    if (checked) {
        inputDiv.addClass(MENU_RADIO_CLASS);
        itemInput.prop('checked', 'checked');
    }
    else {
        itemInput.prop('checked', '');
    }
    return outerDiv;
}
var _FillMenuDialog = (function (_super) {
    __extends(_FillMenuDialog, _super);
    function _FillMenuDialog(host, sheet) {
        var _this = _super.call(this, host, getPreferredZIndex(sheet.parent._host)) || this;
        var menuContainer;
        _this._sheet = sheet;
        _this._smartTagContainer = $('.' + TAG_CONTAINER_CLASS);
        menuContainer = _this._menuContainer = _this._getContainer();
        menuContainer.addClass(MENU_CLASS);
        createMenuItem(sheet, 'smartMenuCopyCells', ITEM_CLASS, getSR().CopyCells, '0', true).appendTo(menuContainer);
        createMenuItem(sheet, 'smartMenuFillSeries', ITEM_CLASS, getSR().FillSeries, '1').appendTo(menuContainer);
        if (!sheet._parentSheet) {
            createMenuItem(sheet, 'smartMenuFillFormattingOnly', ITEM_CLASS, getSR().FillFormattingOnly, '2').appendTo(menuContainer);
            createMenuItem(sheet, 'smartMenuFillWithoutFormatting', ITEM_CLASS, getSR().FillWithoutFormatting, '3').appendTo(menuContainer);
        }
        return _this;
    }
    _FillMenuDialog.prototype._show = function () {
        _super.prototype._show.call(this);
    };
    _FillMenuDialog.prototype._attachEvent = function () {
        var self = this;
        var $smartMenuItem = $('.' + ITEM_CLASS);
        $smartMenuItem.bind(MOUSE_OVER, function () {
            $(this).addClass(UI_STATE_AND_SMART_MENU_HOVER_CLASS);
        }).bind(MOUSE_OUT, function () {
            $(this).removeClass(UI_STATE_AND_SMART_MENU_HOVER_CLASS);
        }).bind(CLICK, function () {
            var $menuItem = $(this), smartTagContainer = self._smartTagContainer, radioArray = $menuItem.find(INPUT_RADIO), radio = radioArray[0];
            radio.checked = true;
            radioArray.trigger(CHANGE);
            smartTagContainer.trigger(CLICK);
            smartTagContainer.trigger(MOUSE_OUT);
            $menuItem.removeClass(UI_STATE_AND_SMART_MENU_HOVER_CLASS);
            var fillType = parseInt($(radio).attr('value'), 10);
            self._changeFill(fillType);
        });
        var smartMenuRadio = self._menuContainer.find(INPUT_RADIO);
        smartMenuRadio.bind(CHANGE, function () {
            $('.' + MENU_ITEM_INPUT_CLASS).removeClass(MENU_RADIO_CLASS);
            $(this).parent().addClass(MENU_RADIO_CLASS);
        });
    };
    _FillMenuDialog.prototype._dettachEvent = function () {
        $('.' + ITEM_CLASS).unbind(MOUSE_OVER).unbind(MOUSE_OUT).unbind(CLICK);
        this._menuContainer.find(INPUT_RADIO).unbind(CHANGE);
    };
    _FillMenuDialog.prototype._changeFill = function (fillType ) {
        var self = this, sheet = self._sheet, eventHandler = sheet._eventHandler;
        if (self._fillType === fillType) {
            return;
        }
        self._fillType = fillType;
        sheet._skipCloseDragFillSmartTag = true;
        sheet.suspendEvent();
        try {
            Core_1.Commands.undo.execute(sheet.parent, { sheetName: sheet.name() });
        }
        finally {
            sheet.resumeEvent();
        }
        sheet._skipCloseDragFillSmartTag = false;
        sheet._commandManager().execute({
            cmd: 'fill', sheetName: sheet.name(),
            startRange: eventHandler._dragFillStartRange, fillRange: eventHandler._currentFillRange,
            autoFillType: fillType, fillDirection: eventHandler._currentFillDirection
        });
        self._smartTagContainer.trigger(FILL_TYPE_CHANGED, fillType);
    };
    _FillMenuDialog.prototype._isOpen = function () {
        return !!$('.' + MENU_CLASS).length;
    };
    return _FillMenuDialog;
}(Core_1._BaseDialog));
var _FillDialog = (function (_super) {
    __extends(_FillDialog, _super);
    function _FillDialog(host, sheet, fillInfo) {
        var _this = _super.call(this, host, getPreferredZIndex(sheet.parent._host)) || this;
        var tagContainer;
        _this._sheet = sheet;
        _this._fillInfo = fillInfo;
        tagContainer = _this._tagContainer = _this._getContainer().addClass('gc-smart-tag-default ' + TAG_CONTAINER_CLASS + ' gc-no-user-select ui-widget-header' + BUTTON_CLASS);
        _this._smartTag = $(createElement('div')).attr('class', 'fillSmartTag').css(FLOAT, LEFT).appendTo(tagContainer);
        _this._smartTagDown = $(createElement('div')).attr('class', 'fillSmartTagDown').css([FLOAT, DISPLAY], [LEFT, 'none']).appendTo(tagContainer);
        return _this;
    }
    _FillDialog.prototype._doMouseEvent = function (isMouseOver, tagContainer, isSafariOnIpad) {
        var self = this, isTouchMode = self._sheet._isTouchMode, $tagContainer = $(tagContainer), menuDialog = self._menuDialog, smartTagDown = self._smartTagDown, hoverInWidth = isTouchMode ? '38px' : '32px', hoverOutWidth = isTouchMode ? '24px' : '18px';
        if (menuDialog && menuDialog._isOpen()) {
            return;
        }

        isMouseOver ? $tagContainer.addClass(UI_STATE_AND_SMART_TAG_HOVER_CLASS) : $tagContainer.removeClass(UI_STATE_AND_SMART_TAG_HOVER_CLASS);

        $tagContainer.css([WIDTH, HEIGHT], [isMouseOver ? hoverInWidth : hoverOutWidth, hoverOutWidth ]);
        if (!isSafariOnIpad) {
            isMouseOver ? smartTagDown.show() : smartTagDown.hide();
        }
    };
    _FillDialog.prototype._registerEvent = function () {
        var self = this, tagContainer = self._tagContainer, device = Core_1._util._device(), isSafariOnIpad = Core_1._util._browser.safari && (device.ipad || device.iphone);
        tagContainer.bind(MOUSE_OVER, function () {
            self._doMouseEvent(true, this, isSafariOnIpad);
        }).bind(MOUSE_OUT, function () {
            self._doMouseEvent(false, this, isSafariOnIpad);
        });
        tagContainer.bind(CLICK, function () {
            var $tagContainer = $(this), menuDialog = self._menuDialog, smartTagDown = self._smartTagDown, isOpen = menuDialog && menuDialog._isOpen();
            if (isOpen) {
                isSafariOnIpad && smartTagDown.hide();
                $tagContainer.removeClass(TOGGLE_CLASS);
                self._closeMenu();
            }
            else {
                isSafariOnIpad && smartTagDown.show();
                $tagContainer.addClass(TOGGLE_CLASS);
                self._openMenu();
                var menuContainer = self._menuContainer, radio = menuContainer && menuContainer.find(INPUT_RADIO)[self._fillInfo.fillType];
                if (radio && !radio.checked ) {
                    radio.checked = true;
                    $(radio).trigger(CHANGE);
                }
            }
        });
        $DOCUMENT.bind(FILL_KEY_DOWN, function (event) {
            if (event.keyCode === 27 ) {
                if (self._menuDialog && self._menuDialog._isOpen()) {
                    self._closeMenu();
                }
                else {
                    self.close();
                }
                Core_1._util._cancelDefault(event);
            }
        });
    };
    _FillDialog.prototype._open = function () {
        var self = this, tagContainer = self._tagContainer, fillInfo = self._fillInfo, isTouchMode = self._sheet._isTouchMode, margin = isTouchMode ? '3px' : '0px', height = isTouchMode ? '24px' : '18px';
        if (tagContainer) {
            tagContainer.css([LEFT, TOP], [fillInfo.x, fillInfo.y]);
            self._show();
            self._registerEvent();
            self._smartTag.css(MARGIN, margin);
            self._smartTagDown.css(HEIGHT, height);
            self._reset();
        }
    };
    _FillDialog.prototype._openMenu = function () {
        var self = this, sheet = self._sheet;
        if (!self._menuDialog) {
            self._menuDialog = new _FillMenuDialog(sheet.parent._getContainerDiv(), sheet);
            self._menuContainer = self._menuDialog._getContainer();
        }
        var $tagContainer = self._tagContainer, left = $tagContainer.css(LEFT), topTemp = ($tagContainer.css(TOP)), topNumber = parseFloat(topTemp), top, menuDialog = self._menuDialog, fillInfo = self._fillInfo;
        menuDialog._fillType = fillInfo.fillType;
        if (!isNaN(topNumber)) {
            top = topNumber + ($tagContainer.height()) + 2;
        }
        self._menuContainer.css([LEFT, TOP], [left, top]);
        menuDialog._show();
        menuDialog._attachEvent();

        menuDialog._smartTagContainer.unbind(FILL_TYPE_CHANGED).bind(FILL_TYPE_CHANGED, function (e, args) {
            fillInfo.fillType = args;
        });
    };
    _FillDialog.prototype._closeMenu = function () {
        var menuDialog = this._menuDialog;
        if (menuDialog) {
            menuDialog._dettachEvent();
            menuDialog.close();
        }
    };
    _FillDialog.prototype._reset = function () {
        var self = this, menuDialog = self._menuDialog, tagContainer = self._tagContainer;
        if (menuDialog) {
            if (menuDialog._isOpen()) {
                tagContainer.trigger(CLICK);
            }
            tagContainer.trigger(MOUSE_OUT);
        }
    };
    _FillDialog.prototype.close = function () {
        var self = this, sheet = self._sheet;
        self._reset();
        $DOCUMENT.unbind(FILL_KEY_DOWN);
        _super.prototype.close.call(this);
        var canvas = sheet._canvas;
        if (canvas) {
            canvas.style.cursor = 'default';
        }
        if (sheet) {
            sheet._setFocus();
        }
    };
    return _FillDialog;
}(Core_1._BaseDialog));
exports._FillDialog = _FillDialog;
/***/ }),

/***/ './dist/plugins/fill/fill.entry.js':
/*!*****************************************!*\
  !*** ./dist/plugins/fill/fill.entry.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__webpack_require__(/*! ./drag-fill */ './dist/plugins/fill/drag-fill.js');
__webpack_require__(/*! ./fill-event */ './dist/plugins/fill/fill-event.js');
__export(__webpack_require__(/*! ./fill-ui */ './dist/plugins/fill/fill-ui.js'));
__export(__webpack_require__(/*! ./fill */ './dist/plugins/fill/fill.js'));
__export(__webpack_require__(/*! ./fill.ns */ './dist/plugins/fill/fill.ns.js'));
/***/ }),

/***/ './dist/plugins/fill/fill.js':
/*!***********************************!*\
  !*** ./dist/plugins/fill/fill.js ***!
  \***********************************/
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
var CalcEngine = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var fill_ns_1 = __webpack_require__(/*! ./fill.ns */ './dist/plugins/fill/fill.ns.js');
var _supportsCalc = !!CalcEngine;
var Types = Common_1.Common._Types;
var keyword_null = null, keyword_undefined = void 0, Math_floor = Math.floor, createRange = Core_1._createRange, isNullOrUndefined = Types._isNullOrUndefined, FormatConverter_toDouble = Types._toDouble, arrayHelper = Common_1.Common._ArrayHelper, arrayHelper_insert = arrayHelper._insert, arrayHelper_getLength = arrayHelper._getLength, dateTimeHelper = Common_1.Common._DateTimeHelper, dateTimeHelper_toOADate = dateTimeHelper._toOADate, dateTimeHelper_fromOADate = dateTimeHelper._fromOADate;
var NUMBER_STRING = 'number', DATE_STRING = 'date', STR_STRING = 'string', DEFAULT_STRING = 'default';
var rm = new Common_1.Common.ResourceManager(fill_ns_1.SR);
var getSR = rm.getResource.bind(rm);
var CultureManager = Common_1.Common.CultureManager;
function isNumber(value) {
    return isString(value) ? false : Types._isNumber(value);
}
function isString(value) {
    return typeof (value) === 'string';
}
function isLinkerAtLast(value, linker) {
    return value.lastIndexOf(linker) !== -1;
}


var AutoFillType;
(function (AutoFillType) {
    AutoFillType[AutoFillType['copyCells'] = 0] = 'copyCells';

    AutoFillType[AutoFillType['fillSeries'] = 1] = 'fillSeries';

    AutoFillType[AutoFillType['fillFormattingOnly'] = 2] = 'fillFormattingOnly';

    AutoFillType[AutoFillType['fillWithoutFormatting'] = 3] = 'fillWithoutFormatting';

    AutoFillType[AutoFillType['clearValues'] = 4] = 'clearValues';

    AutoFillType[AutoFillType['auto'] = 5] = 'auto';
})(AutoFillType = exports.AutoFillType || (exports.AutoFillType = {}));


var FillDirection;
(function (FillDirection) {
    FillDirection[FillDirection['left'] = 0] = 'left';

    FillDirection[FillDirection['right'] = 1] = 'right';

    FillDirection[FillDirection['up'] = 2] = 'up';

    FillDirection[FillDirection['down'] = 3] = 'down';
})(FillDirection = exports.FillDirection || (exports.FillDirection = {}));


var FillSeries;
(function (FillSeries) {
    FillSeries[FillSeries['column'] = 0] = 'column';

    FillSeries[FillSeries['row'] = 1] = 'row';
})(FillSeries = exports.FillSeries || (exports.FillSeries = {}));


var FillType;
(function (FillType) {
    FillType[FillType['direction'] = 0] = 'direction';

    FillType[FillType['linear'] = 1] = 'linear';

    FillType[FillType['growth'] = 2] = 'growth';

    FillType[FillType['date'] = 3] = 'date';

    FillType[FillType['auto'] = 4] = 'auto';
})(FillType = exports.FillType || (exports.FillType = {}));


var FillDateUnit;
(function (FillDateUnit) {
    FillDateUnit[FillDateUnit['day'] = 0] = 'day';

    FillDateUnit[FillDateUnit['weekday'] = 1] = 'weekday';

    FillDateUnit[FillDateUnit['month'] = 2] = 'month';

    FillDateUnit[FillDateUnit['year'] = 3] = 'year';
})(FillDateUnit = exports.FillDateUnit || (exports.FillDateUnit = {}));

function toArray(array) {
    var result = [array];
    result.rowCount = 1;
    result.colCount = arrayHelper_getLength(array);
    return result;
}
function getNumber(value) {
    return value;
}
function getTrendOrGrowthValue(isTrend, values, indexes, dest) {
    var valuesArray = toArray(values), indexesArray = toArray(indexes), destArray = toArray([dest]), result = isTrend ? Common_1.Common._trend(valuesArray, indexesArray, destArray, true, getNumber, keyword_null, keyword_null, keyword_null)
        : Common_1.Common._growth(valuesArray, indexesArray, destArray, true, keyword_null, keyword_null, keyword_null), value = result && result[0][0];
    return (typeof value === NUMBER_STRING) ? Common_1.Common._NumberHelper._fixNumber(value, 13) : value;
}
function getLowerCase(source) {
    return source.toLowerCase();
}


var TrendDataSource = (function () {
    function TrendDataSource(startIndex) {
        this._indexes = [];
        this._innerValues = [];
        this._originValues = [];
        this._type = keyword_null;
        this._sourceNumbers = [];
        this._sourceString = keyword_null;
        this._startIndex = isNullOrUndefined(startIndex) ? -1 : startIndex;
    }
    TrendDataSource.prototype._dataCount = function () {
        return arrayHelper_getLength(this._indexes);
    };
    TrendDataSource.prototype._values = function () {
        var self = this, values = [], innerValues = self._innerValues, i, value;
        for (i = 0; i < arrayHelper_getLength(innerValues); i++) {
            value = innerValues[i];
            values.push(self._type === 'object' ? self._toDateTime(value) : value);
        }
        return values;
    };
    TrendDataSource.prototype._indexes2 = function () {
        var self = this, indexes = self._indexes;
        if (arrayHelper_getLength(indexes) > 0) {
            var startIndex = self._startIndex, value = [], i = void 0;
            if (startIndex === -1) {
                startIndex = indexes[0];
            }
            for (i = 0; i < arrayHelper_getLength(indexes); i++) {
                value[i] = indexes[i] - startIndex + 1;
            }
            return value;
        }
        return keyword_null;
    };
    TrendDataSource.prototype._values2 = function () {
        var innerValues = this._innerValues;
        return arrayHelper_getLength(innerValues) ? innerValues : keyword_null;
    };
    TrendDataSource.prototype._insert = function (insertIndex, index, value) {
        if (!isNumber(value)) {
            throw new Error(getSR().Exp_NumberOnly);
        }
        var self = this;
        if (isNullOrUndefined(self._type)) {
            self._type = value instanceof Date ? DATE_STRING : NUMBER_STRING;
        }
        arrayHelper_insert(self._indexes, insertIndex, index);
        arrayHelper_insert(self._innerValues, insertIndex, FormatConverter_toDouble(value));
    };
    TrendDataSource.prototype._add = function (index, value) {
        var self = this, isTypeNullOrUndefined = isNullOrUndefined(self._type);
        if (isNumber(value)) {
            if (isTypeNullOrUndefined) {
                if (value instanceof Date) {
                    self._type = DATE_STRING;
                }
                else {
                    self._type = NUMBER_STRING;
                }
            }
            self._innerValues.push(FormatConverter_toDouble(value));
        }
        else if (isTypeNullOrUndefined) {
            self._type = isString(value) ? STR_STRING : DEFAULT_STRING;
        }
        self._indexes.push(index);
        self._originValues.push(value);
    };
    TrendDataSource.prototype._toActualValue = function (value) {
        return this._type === DATE_STRING ? this._toDateTime(value) : value;
    };
    TrendDataSource.prototype._toDateTime = function (value) {
        var ret = keyword_null;
        if (value instanceof Date) {
            ret = value;
        }
        else if (CalcEngine) {
            try {
                ret = CalcEngine.Convert._toDateTime(value);
            }
            catch (err) {
                ret = value;
            }
        }
        return ret;
    };
    return TrendDataSource;
}());

var CustomRuleLists = (function () {
    function CustomRuleLists(sheet) {
        this._baseIndex = -1;
        this._matchItem = [];
        this._step = -1;
        this._sheet = sheet;
    }
    CustomRuleLists.prototype._dispose = function () {
        this._sheet = keyword_null;
    };
    CustomRuleLists.prototype._getLists = function () {
        var sheet = this._sheet;
        return sheet.parent && sheet.parent._getCustomFillingLists() || [];
    };
    CustomRuleLists.prototype._match = function (sourceArr) {
        var sourceArrLength = sourceArr.length, result = false;
        if (sourceArr && sourceArrLength > 0) {
            var firstSource = getLowerCase(sourceArr[0]), fillingLists = this._getLists(), listIndex = void 0, list = void 0, lowerCaseList = void 0, matchIndex = void 0, currentIndex = void 0, indexStep = void 0;
            for (listIndex = 0; listIndex < fillingLists.length; listIndex++) {
                list = fillingLists[listIndex];
                lowerCaseList = list.map(function (item) {
                    return getLowerCase(item);
                });
                matchIndex = lowerCaseList.indexOf(firstSource);
                if (matchIndex >= 0) {
                    currentIndex = matchIndex;
                    var listLength = lowerCaseList.length, nextIndex = void 0, source = void 0, step = void 0;
                    for (var i = 1; i < sourceArrLength; i++) {
                        source = getLowerCase(sourceArr[i]);
                        nextIndex = lowerCaseList.indexOf(source);
                        if (nextIndex >= 0) {
                            step = nextIndex - currentIndex + listLength;
                            if (!indexStep) {
                                result = true;
                                indexStep = step;
                                currentIndex = nextIndex;
                            }
                            else if (indexStep !== step) {
                                result = false;
                                break;
                            }
                        }
                        else {
                            result = false;
                            break;
                        }
                    }
                    var isSingleSource = sourceArrLength === 1;
                    if (result || isSingleSource) {
                        result = true;
                        this._baseIndex = matchIndex;
                        this._matchItem = list;
                        this._step = isSingleSource ? 1 : indexStep;
                        break;
                    }
                }
            }
        }
        return result;
    };
    CustomRuleLists.prototype._getValue = function (target) {
        var currentList = this._matchItem, baseIndex = this._baseIndex, step = this._step, length = currentList.length, numberIndex = getNumberIndex(target, length), colIndex;
        colIndex = (baseIndex + step * numberIndex) % length;
        return currentList[colIndex];
    };
    return CustomRuleLists;
}());
var BaseStringTarget = (function () {
    function BaseStringTarget() {
        this._prefix = '';
        this._suffix = '';
        this._step = 0;
        this._baseValue = 1;
        this._padding = '';
    }
    BaseStringTarget.prototype._getValue = function (n) {
        var fn = this._step * (n - 1) + this._baseValue, paddingLength = this._padding.length, fnResult = '' + Math.abs(fn), fnLength = fnResult.length, paddingResult = this._padding + fnResult, paddingResultLength = paddingResult.length;
        fnResult = fnLength > paddingLength ? fnResult : paddingResult.substr(paddingResultLength - paddingLength);
        return this._prefix + fnResult + this._suffix;
    };
    return BaseStringTarget;
}());
function getStep(dataArr) {
    var length = dataArr.length, step = 1, tempStep;
    if (length > 1) {
        step = dataArr[1] - dataArr[0];
        for (var i = 2; i < length; i++) {
            tempStep = dataArr[i] - dataArr[i - 1];
            if (step !== tempStep) {
                step = 0;
                break;
            }
        }
    }
    return step;
}
function getNumberIndex(target, sourceLength) {
    return target > 0 ? ((target - 1) % sourceLength) : (sourceLength - Math.abs(target) % sourceLength - 1);
}
function getPadding(sourceNumberLength) {
    var padding = '', length = 0;
    while (length < sourceNumberLength) {
        padding += '0';
        length++;
    }
    return padding;
}
function getDeltaMonth(date1, date2) {
    return (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth());
}
function getIsFirstDayOfMonth(dateArr) {
    return dateArr.every(function (dateValue) {
        var date = dateValue.getDate();
        return date === 1;
    });
}
function getIsLastDayOfMonth(dateArr) {
    return dateArr.every(function (dateValue) {
        var year = dateValue.getFullYear();
        var month = dateValue.getMonth();
        var date = dateValue.getDate();
        var currentMonthDateCount = new Date(year, month + 1, 0).getDate();
        return date === currentMonthDateCount;
    });
}
function getSameDayOfMonth(dateArr) {
    var day = 0;
    var isSame = dateArr.every(function (dateValue) {
        var date = dateValue.getDate();
        if (!day) {
            day = date;
        }
        return day === date;
    });
    return isSame ? day : 0;
}
function getIsDeltaMonthEqual(dateArr, deltaMonth) {
    var dateArrCount = dateArr.length, isDeltaMonthEqual = true, currentDeltaMonth;
    for (var dateArrIndex = 2; dateArrIndex < dateArrCount; dateArrIndex++) {
        currentDeltaMonth = getDeltaMonth(dateArr[dateArrIndex - 1], dateArr[dateArrIndex]);
        isDeltaMonthEqual = deltaMonth === currentDeltaMonth;
        if (!isDeltaMonthEqual) {
            break;
        }
    }
    return isDeltaMonthEqual;
}
function getTableHasTime(dateArr) {
    return dateArr.every(function (dateValue) {
        var hour = dateValue.getHours(), minute = dateValue.getMinutes(), seconds = dateValue.getSeconds();
        return hour !== 0 || minute !== 0 || seconds !== 0;
    });
}
function getDayCountOfMonth(finalYear, finalMonth) {
    return new Date(finalYear, finalMonth + 1, 0).getDate();
}
function isNeedPadding(value) {
    return value[0] === '0';
}
function matchRule(self, dataArr, isNumberString) {
    var matchResult, matchNumber, sourceNumber, sourceString, valueLength;
    var matchNumberIndex = isNumberString ? 1 : 2, matchStringIndex = isNumberString ? 2 : 1;
    return dataArr.every(function (value) {
        matchResult = value.match(self._reg);
        if (matchResult) {
            matchNumber = matchResult[matchNumberIndex];
            valueLength = matchNumber.length;
            if (valueLength > self._sourceNumberLength && isNeedPadding(matchNumber)) {
                self._sourceNumberLength = valueLength;
            }
            sourceNumber = parseInt(matchNumber, 10);
            sourceString = matchResult[matchStringIndex];
            if (isNullOrUndefined(self._sourceString)) {
                self._sourceString = sourceString;
            }
            if (sourceString !== self._sourceString) {
                self._diffPrefix = true;
                self._sourceString = keyword_null;
                self._sourceNumbers = [];
            }
            else {
                self._sourceNumbers.push(sourceNumber);
            }
            return true;
        }
        return false;
    });
}
var BaseRule = (function () {
    function BaseRule() {
    }
    BaseRule.prototype.match = function (value) { return false; };
    BaseRule.prototype.getTargetValue = function (trendData, target, indexes, index, multiplier) { };
    BaseRule.prototype.resetProp = function () { };
    BaseRule.prototype._getActualIndex = function (indexes, index) {
        return indexes.indexOf(index + 1);
    };
    BaseRule.prototype.dispose = function () { };
    return BaseRule;
}());
var BaseMonthRule = (function (_super) {
    __extends(BaseMonthRule, _super);
    function BaseMonthRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._deltaMonth = 0;
        _this._type = DATE_STRING;
        return _this;
    }
    return BaseMonthRule;
}(BaseRule));
var FirstDayOfMonthRule = (function (_super) {
    __extends(FirstDayOfMonthRule, _super);
    function FirstDayOfMonthRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstDayOfMonthRule.prototype.match = function (dateArr) {
        var deltaMonth = this._deltaMonth = getDeltaMonth(dateArr[0], dateArr[1]);
        var isFirstDayOfMonth = getIsFirstDayOfMonth(dateArr), dateArrCount = dateArr.length, isDeltaMonthEqual = true;

        if (isFirstDayOfMonth && dateArrCount > 2) {
            isDeltaMonthEqual = getIsDeltaMonthEqual(dateArr, deltaMonth);
        }
        return isFirstDayOfMonth && isDeltaMonthEqual;
    };
    FirstDayOfMonthRule.prototype.getTargetValue = function (trendData, target) {
        var sourceDateArr = trendData._originValues, sourceDate = sourceDateArr[0], year = sourceDate.getFullYear(), month = sourceDate.getMonth(), deltaIndex = target - 1, deltaMonth = this._deltaMonth, targetMonth = month + deltaMonth * deltaIndex;
        return new Date(year + parseInt((targetMonth / 12), 10), targetMonth % 12, 1);
    };
    return FirstDayOfMonthRule;
}(BaseMonthRule));
var LastDayOfMonthRule = (function (_super) {
    __extends(LastDayOfMonthRule, _super);
    function LastDayOfMonthRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LastDayOfMonthRule.prototype.match = function (dateArr) {
        var deltaMonth = this._deltaMonth = getDeltaMonth(dateArr[0], dateArr[1]);
        var isLastDayOfMonth = getIsLastDayOfMonth(dateArr), dateArrCount = dateArr.length, isDeltaMonthEqual = true;

        if (isLastDayOfMonth && dateArrCount > 2) {
            isDeltaMonthEqual = getIsDeltaMonthEqual(dateArr, deltaMonth);
        }
        return isLastDayOfMonth && isDeltaMonthEqual;
    };
    LastDayOfMonthRule.prototype.getTargetValue = function (trendData, target) {
        var sourceDateArr = trendData._originValues, sourceDate = sourceDateArr[0], year = sourceDate.getFullYear(), month = sourceDate.getMonth(), deltaIndex = target - 1, deltaMonth = this._deltaMonth, targetMonth = month + deltaMonth * deltaIndex, finalYear = year + parseInt((targetMonth / 12), 10), finalMonth = targetMonth % 12;
        return new Date(finalYear, finalMonth, getDayCountOfMonth(finalYear, finalMonth));
    };
    return LastDayOfMonthRule;
}(BaseMonthRule));
var SameDayOfMonthRule = (function (_super) {
    __extends(SameDayOfMonthRule, _super);
    function SameDayOfMonthRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SameDayOfMonthRule.prototype.match = function (dateArr) {
        var result = false;
        if (!getTableHasTime(dateArr)) {
            var deltaMonth = this._deltaMonth = getDeltaMonth(dateArr[0], dateArr[1]);
            var _day = getSameDayOfMonth(dateArr), isSameDayOfMonth = _day > 0, dateArrCount = dateArr.length, isDeltaMonthEqual = true;

            this._day = _day;
            if (isSameDayOfMonth && dateArrCount > 2) {
                isDeltaMonthEqual = getIsDeltaMonthEqual(dateArr, deltaMonth);
            }
            result = isSameDayOfMonth && isDeltaMonthEqual;
        }
        return result;
    };
    SameDayOfMonthRule.prototype.getTargetValue = function (trendData, target) {
        var sourceDateArr = trendData._originValues, sourceDate = sourceDateArr[0], year = sourceDate.getFullYear(), month = sourceDate.getMonth(), deltaIndex = target - 1, deltaMonth = this._deltaMonth, targetMonth = month + deltaMonth * deltaIndex, finalYear = year + parseInt((targetMonth / 12), 10), finalMonth = targetMonth % 12;
        return new Date(finalYear, finalMonth, this._day);
    };
    return SameDayOfMonthRule;
}(BaseMonthRule));
var BaseStringRule = (function (_super) {
    __extends(BaseStringRule, _super);
    function BaseStringRule() {
        var _this = _super.call(this) || this;
        _this._reg = keyword_null;
        _this._sourceNumbers = [];
        _this._sourceString = keyword_null;
        _this._diffPrefix = false;
        _this._sourceNumberLength = 0;
        _this._type = STR_STRING;
        _this._isArithmeticProgression = false;
        _this._isInternal = false;
        _this._baseStringTarget = new BaseStringTarget();
        return _this;
    }
    BaseStringRule.prototype.resetProp = function () {
        this._sourceNumbers = [];
        this._sourceNumberLength = 0;
        this._sourceString = keyword_null;
        this._diffPrefix = false;
        this._isArithmeticProgression = false;
        this._isInternal = false;
    };
    BaseStringRule.prototype.getInternal = function (indexes) {
        var isInternal = false, firstIndex = indexes[0], nextIndex;
        for (var i = 1; i < indexes.length; i++) {
            nextIndex = indexes[i];
            if (Math.abs(nextIndex - firstIndex) !== 1) {
                isInternal = true;
                break;
            }
        }
        return isInternal;
    };
    return BaseStringRule;
}(BaseRule));
var CustomRule = (function (_super) {
    __extends(CustomRule, _super);
    function CustomRule(sheet) {
        var _this = _super.call(this) || this;
        _this._customRule = new CustomRuleLists(sheet);
        return _this;
    }
    CustomRule.prototype.dispose = function () {
        var self = this;
        if (self._customRule) {
            self._customRule._dispose();
            self._customRule = keyword_null;
        }
    };
    CustomRule.prototype.match = function (dataArr) {
        return this._customRule._match(dataArr);
    };
    CustomRule.prototype.getTargetValue = function (trendData, target, indexes, index, multiplier) {
        var sourceValue = trendData._originValues, sourceLength = sourceValue.length, actualIndex = this._getActualIndex(indexes, index), result = keyword_null, actualTarget;
        if (actualIndex !== -1) {
            actualTarget = sourceLength * multiplier + actualIndex + 1;
            result = this._customRule._getValue(actualTarget);
        }
        return result;
    };
    return CustomRule;
}(BaseStringRule));
var NumberOnlyRule = (function (_super) {
    __extends(NumberOnlyRule, _super);
    function NumberOnlyRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._reg = /^\d+$/;
        return _this;
    }
    NumberOnlyRule.prototype.match = function (dataArr) {
        var self = this, matchResult, sourceNumber, valueLength;
        return dataArr.every(function (value) {
            matchResult = value.match(self._reg);
            if (matchResult) {
                valueLength = value.length;
                if (valueLength > self._sourceNumberLength && isNeedPadding(value)) {
                    self._sourceNumberLength = valueLength;
                }
                sourceNumber = parseInt(value, 10);
                self._sourceNumbers.push(sourceNumber);
                return true;
            }
            return false;
        });
    };
    NumberOnlyRule.prototype.getTargetValue = function (trendData, target, indexes, index, multiplier) {
        var sourceValue = trendData._originValues, baseStringTarget = this._baseStringTarget, step = getStep(this._sourceNumbers), sourceLength = sourceValue.length, isArithmeticProgression = step !== 0, numberIndex = isArithmeticProgression ? 0 : getNumberIndex(target, sourceLength), actualIndex = this._getActualIndex(indexes, index), result = keyword_null, actualTarget;
        this._isArithmeticProgression = isArithmeticProgression;
        this._isInternal = this.getInternal(trendData._indexes);
        if (actualIndex !== -1) {
            baseStringTarget._step = step;
            baseStringTarget._baseValue = this._sourceNumbers[numberIndex];
            baseStringTarget._padding = getPadding(this._sourceNumberLength);
            actualTarget = sourceLength * multiplier + actualIndex + 1;
            result = baseStringTarget._getValue(actualTarget);
        }
        return result;
    };
    return NumberOnlyRule;
}(BaseStringRule));
var StringNumberRule = (function (_super) {
    __extends(StringNumberRule, _super);
    function StringNumberRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._reg = /^(.*\D+)(\d+)$/;
        return _this;
    }
    StringNumberRule.prototype.match = function (dataArr) {
        return matchRule(this, dataArr, false);
    };
    StringNumberRule.prototype.getTargetValue = function (trendData, target, indexes, index, multiplier) {
        var sourceValue = trendData._originValues, baseStringTarget = this._baseStringTarget, step = getStep(this._sourceNumbers), sourceLength = sourceValue.length, isArithmeticProgression = step !== 0, numberIndex = isArithmeticProgression ? 0 : getNumberIndex(target, sourceLength), actualIndex = this._getActualIndex(indexes, index), result = keyword_null, actualTarget;
        this._isArithmeticProgression = isArithmeticProgression;
        this._isInternal = this.getInternal(trendData._indexes);
        if (actualIndex !== -1) {
            baseStringTarget._prefix = this._sourceString;
            baseStringTarget._step = step;
            baseStringTarget._baseValue = this._sourceNumbers[numberIndex];
            baseStringTarget._padding = getPadding(this._sourceNumberLength);
            actualTarget = sourceLength * multiplier + actualIndex + 1;
            result = baseStringTarget._getValue(actualTarget);
        }
        return result;
    };
    return StringNumberRule;
}(BaseStringRule));
var NumberStringRule = (function (_super) {
    __extends(NumberStringRule, _super);
    function NumberStringRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._reg = /^(\d+)(\D+.*)$/;
        return _this;
    }
    NumberStringRule.prototype.match = function (dataArr) {
        return matchRule(this, dataArr, true);
    };
    NumberStringRule.prototype.getTargetValue = function (trendData, target, indexes, index, multiplier) {
        var sourceValue = trendData._originValues, baseStringTarget = this._baseStringTarget, step = getStep(this._sourceNumbers), sourceLength = sourceValue.length, isArithmeticProgression = step !== 0, numberIndex = isArithmeticProgression ? 0 : getNumberIndex(target, sourceLength), actualIndex = this._getActualIndex(indexes, index), result = keyword_null, actualTarget;
        this._isArithmeticProgression = isArithmeticProgression;
        this._isInternal = this.getInternal(trendData._indexes);
        if (actualIndex !== -1) {
            baseStringTarget._suffix = this._sourceString;
            baseStringTarget._step = step;
            baseStringTarget._baseValue = this._sourceNumbers[numberIndex];
            baseStringTarget._padding = getPadding(this._sourceNumberLength);
            actualTarget = sourceLength * multiplier + actualIndex + 1;
            result = baseStringTarget._getValue(actualTarget);
        }
        return result;
    };
    return NumberStringRule;
}(BaseStringRule));
var StringNumberStringRule = (function (_super) {
    __extends(StringNumberStringRule, _super);
    function StringNumberStringRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._reg = /^(.*\D+)(\d+)(\D+.*)$/;
        return _this;
    }
    StringNumberStringRule.prototype.resetProp = function () {
        _super.prototype.resetProp.call(this);
        this._sourceSuffixString = keyword_null;
    };
    StringNumberStringRule.prototype.match = function (dataArr) {
        var matchResult, matchNumber, sourceNumber, sourcePrefixString, sourceSuffixString, valueLength;
        var self = this;
        return dataArr.every(function (value) {
            matchResult = value.match(self._reg);
            if (matchResult) {
                matchNumber = matchResult[2];
                valueLength = matchNumber.length;
                if (valueLength > self._sourceNumberLength && isNeedPadding(matchNumber)) {
                    self._sourceNumberLength = valueLength;
                }
                sourceNumber = parseInt(matchNumber, 10);
                sourcePrefixString = matchResult[1];
                if (isNullOrUndefined(self._sourceString)) {
                    self._sourceString = sourcePrefixString;
                }
                sourceSuffixString = matchResult[3];
                if (isNullOrUndefined(self._sourceSuffixString)) {
                    self._sourceSuffixString = sourceSuffixString;
                }
                if (sourcePrefixString !== self._sourceString || sourceSuffixString !== self._sourceSuffixString) {
                    self._diffPrefix = true;
                    self._sourceString = keyword_null;
                    self._sourceSuffixString = keyword_null;
                    self._sourceNumbers = [];
                }
                else {
                    self._sourceNumbers.push(sourceNumber);
                }
                return true;
            }
            return false;
        });
    };
    StringNumberStringRule.prototype.getTargetValue = function (trendData, target, indexes, index, multiplier) {
        var self = this, sourceValue = trendData._originValues, baseStringTarget = self._baseStringTarget, step = getStep(self._sourceNumbers), sourceLength = sourceValue.length, isArithmeticProgression = step !== 0, numberIndex = isArithmeticProgression ? 0 : getNumberIndex(target, sourceLength), actualIndex = self._getActualIndex(indexes, index), result = keyword_null, actualTarget;
        self._isArithmeticProgression = isArithmeticProgression;
        self._isInternal = self.getInternal(trendData._indexes);
        if (actualIndex !== -1) {
            baseStringTarget._prefix = self._sourceString;
            baseStringTarget._suffix = self._sourceSuffixString;
            baseStringTarget._step = step;
            baseStringTarget._baseValue = self._sourceNumbers[numberIndex];
            baseStringTarget._padding = getPadding(self._sourceNumberLength);
            actualTarget = sourceLength * multiplier + actualIndex + 1;
            result = baseStringTarget._getValue(actualTarget);
        }
        return result;
    };
    return StringNumberStringRule;
}(BaseStringRule));


var LINKERS = ['-', '_', ':', '.', ','];
var StringWithLinkerRule = (function (_super) {
    __extends(StringWithLinkerRule, _super);
    function StringWithLinkerRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringWithLinkerRule.prototype.resetProp = function () {
        _super.prototype.resetProp.call(this);
        this._sourceLinker = keyword_null;
    };
    StringWithLinkerRule.prototype.match = function (dataArr) {
        var matchResult, matchNumber, sourceNumber, sourcePrefixString, sourceSuffixString, valueLength;
        var self = this, isLinkerExist;
        return dataArr.every(function (value) {
            var sourceLinker = self._sourceLinker;
            if (!isNullOrUndefined(sourceLinker)) {
                isLinkerExist = isLinkerAtLast(value, sourceLinker);
            }
            else {
                isLinkerExist = LINKERS.some(function (linker) {
                    if (isLinkerAtLast(value, linker)) {
                        self._sourceLinker = linker;
                        return true;
                    }
                });
            }
            if (isLinkerExist) {
                sourceLinker = self._sourceLinker;
                var linkerIndex = value.lastIndexOf(sourceLinker);
                sourcePrefixString = value.substring(0, linkerIndex + 1);
                if (isNullOrUndefined(self._sourceString)) {
                    self._sourceString = sourcePrefixString;
                }
                else if (self._sourceString !== sourcePrefixString) {
                    return false;
                }
                var subValue = value.substr(linkerIndex + 1);
                var regNS = /^(\d+)(\D+.*)$/;
                matchResult = subValue.match(regNS);
                if (matchResult) {
                    matchNumber = matchResult[1];
                    valueLength = matchNumber.length;
                    if (valueLength > self._sourceNumberLength && isNeedPadding(matchNumber)) {
                        self._sourceNumberLength = valueLength;
                    }
                    sourceNumber = parseInt(matchNumber, 10);
                    sourceSuffixString = matchResult[2];
                    if (isNullOrUndefined(self._sourceSuffixString)) {
                        self._sourceSuffixString = sourceSuffixString;
                    }
                    if (sourceSuffixString !== self._sourceSuffixString) {
                        self._sourceString = keyword_null;
                        self._sourceSuffixString = keyword_null;
                        self._sourceNumbers = [];
                        return false;
                    }
                    else {
                        self._sourceNumbers.push(sourceNumber);
                    }
                    return true;
                }
            }
            return false;
        });
    };
    return StringWithLinkerRule;
}(StringNumberStringRule));
var NumberRule = (function (_super) {
    __extends(NumberRule, _super);
    function NumberRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberRule.prototype.getTargetValue = function (trendData, target, indexes) {
        return getTrendOrGrowthValue(true, trendData._values2(), indexes, target);
    };
    return NumberRule;
}(BaseRule));
var DefaultRule = (function (_super) {
    __extends(DefaultRule, _super);
    function DefaultRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isArithmeticProgression = true;
        return _this;
    }
    DefaultRule.prototype.getTargetValue = function (trendData, target, indexes, index) {
        var originValues = trendData._originValues, sourceLength = originValues.length, numberIndex = getNumberIndex(target, sourceLength);
        return originValues[numberIndex];
    };
    return DefaultRule;
}(BaseRule));
var _RuleFilter = (function () {
    function _RuleFilter(sheet) {
        var self = this;
        self._monthRules = [new FirstDayOfMonthRule(), new LastDayOfMonthRule(), new SameDayOfMonthRule()];
        self._numberRule = new NumberRule();
        self._defaultRule = new DefaultRule();

        var currentCulture = CultureManager.culture(), isJCKCulture = CultureManager._getCultureInfo(currentCulture).isJCKCulture;
        var customRule = new CustomRule(sheet), numberOnlyRule = new NumberOnlyRule(), stringNumberRule = new StringNumberRule(), numberStringRule = new NumberStringRule();
        if (isJCKCulture) {
            self._stringRules = [customRule, numberOnlyRule, new StringWithLinkerRule(), stringNumberRule, numberStringRule, new StringNumberStringRule()];
        }
        else {
            self._stringRules = [customRule, numberOnlyRule, stringNumberRule, numberStringRule];
        }
    }
    _RuleFilter.prototype.getRule = function (type, dataArr) {
        var rules = [], defaultRule = this._defaultRule;
        if (type === DATE_STRING) {
            rules = this._monthRules;
            defaultRule = this._numberRule;
        }
        else if (type === STR_STRING) {
            rules = this._stringRules;
        }
        else if (type === NUMBER_STRING) {
            defaultRule = this._numberRule;
        }
        for (var ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
            var rule = rules[ruleIndex], diffPrefix = void 0;
            rule.resetProp();
            if (rule.match(dataArr)) {
                diffPrefix = rule._diffPrefix;
                if (isNullOrUndefined(diffPrefix) || diffPrefix === false) {
                    return rule;
                }
                else if (diffPrefix === true) {
                    return defaultRule;
                }
            }
        }
        return defaultRule;
    };
    _RuleFilter.prototype._dispose = function () {
        var self = this;
        if (self._monthRules) {
            _disposeArrayItem(self._monthRules);
            self._monthRules = keyword_null;
        }
        if (self._stringRules) {
            _disposeArrayItem(self._stringRules);
            self._stringRules = keyword_null;
        }
        if (self._numberRule) {
            self._numberRule.dispose();
            self._numberRule = keyword_null;
        }
        if (self._defaultRule) {
            self._defaultRule.dispose();
            self._defaultRule = keyword_null;
        }
    };
    return _RuleFilter;
}());
exports._RuleFilter = _RuleFilter;
function _disposeArrayItem(array) {
    array.forEach(function (item) {
        if (item) {
            item.dispose();
        }
    });
}

var _FillImp = (function () {
    function _FillImp(sheet) {
        this._sheet = sheet;
        this._isFiltered = false;
        this._filterRows = [];
    }
    _FillImp.prototype._fillLinearOrGrowth = function (isLinear, fillRange, series, step, stop) {
        var self = this, fillType = isLinear ? 1 : 2 ;
        if (isNullOrUndefined(step) && isNullOrUndefined(stop)) {
            self._seriesFillRange(fillRange, series, fillType);
        }
        else {
            self._seriesFillRange(fillRange, series, fillType, step, stop, keyword_null);
        }
    };
    _FillImp.prototype._seriesFillRange = function (fillRange, fillSeries, fillType, stepValue, stopValue, dateUnit) {
        var self = this, sheet = self._sheet, newRange = sheet._getActualRange(fillRange);
        var row = newRange.row, column = newRange.col, rowCount = newRange.rowCount, columnCount = newRange.colCount;
        if (sheet._modelManager._hasSpans(row, column, rowCount, columnCount)) {
            throw new Error(getSR().Exp_RangeContainsMergedCell);
        }
        var index, targetData, i, initIndex, initValue, isLongArgsLength = arguments.length > 3, startPos = 0, isRowSeries = fillSeries === 1 , count = isRowSeries ? columnCount : rowCount, start = isRowSeries ? row : column, end = isRowSeries ? row + rowCount : column + columnCount, usedIndexCount = isLongArgsLength ? 1 : count;
        var startRange = this._sheet._eventHandler._dragFillStartRange;
        var isLeftOrUpDirection = (startRange.row === row && startRange.rowCount === rowCount && startRange.col > column ||
            startRange.col === column && startRange.colCount === columnCount && startRange.row > row);
        for (index = start; index < end; index++) {
            var dataColumn = isLeftOrUpDirection && isLongArgsLength ? column + columnCount - 1 : column;
            var dataRow = isLeftOrUpDirection && isLongArgsLength ? row + rowCount - 1 : row;
            var sourceData = isRowSeries ? self._getSeriesSource(index, dataColumn, 1, usedIndexCount, fillSeries) : self._getSeriesSource(dataRow, index, usedIndexCount, 1, fillSeries);
            if (sourceData && sourceData._dataCount()) {
                initIndex = sourceData._indexes[0];
                if (isLongArgsLength) {
                    initValue = isLeftOrUpDirection ? sourceData._innerValues[arrayHelper_getLength(sourceData._innerValues) - 1]
                        : sourceData._innerValues[0];
                    targetData = self._calcSeriesData(isLeftOrUpDirection, initValue, count, fillType, stepValue, stopValue, dateUnit);
                    if (isLeftOrUpDirection) {
                        startPos = count - arrayHelper_getLength(targetData);
                        initIndex = sourceData._indexes[arrayHelper_getLength(sourceData._indexes) - 1];
                    }
                }
                else {
                    targetData = self._calcSeriesTrendData(sourceData, count, fillType);
                }
                for (i = 0; i < arrayHelper_getLength(targetData); i++) {
                    var actualValue = sourceData._toActualValue(targetData[i]);
                    if (isRowSeries) {
                        self._copyCell(sheet, index, initIndex, index, column + startPos + i, actualValue, fillType);
                    }
                    else {
                        self._copyCell(sheet, initIndex, index, row + startPos + i, index, actualValue, fillType);
                    }
                }
            }
        }
    };
    _FillImp.prototype._getSeriesSource = function (row, column, rowCount, columnCount, fillSeries) {
        var numberSource = keyword_null, sheet = this._sheet, value, isRowSeries = fillSeries === 1 , index = isRowSeries ? column + columnCount - 1 : row + rowCount - 1, start = isRowSeries ? column : row;
        while (index >= start) {
            value = isRowSeries ? sheet.getValue(row, index) : sheet.getValue(index, column);
            if (isNumber(value)) {
                if (!numberSource) {
                    numberSource = new TrendDataSource(start);
                }
                numberSource._insert(0, index, value);
            }
            index--;
        }
        return numberSource;
    };
    _FillImp.prototype._calcSeriesData = function (isLeftOrUp, initValue, count, type, stepValue, stopValue, dateUnit) {
        var newValues = [], currentValue = initValue, i;
        var isPositiveStep = stepValue >= 0;
        var noStopValue = isNullOrUndefined(stopValue);
        for (i = 0; i < count; i++) {
            var isBiggerThanStopValue = currentValue >= stopValue, isSmallerThanStopValue = currentValue <= stopValue;
            if (isLeftOrUp && (noStopValue || isPositiveStep && isBiggerThanStopValue || !isPositiveStep && isSmallerThanStopValue)) {
                newValues.unshift(currentValue);
                if (type === 1 ) {
                    currentValue -= stepValue;
                }
                else if (type === 2 ) {
                    currentValue /= stepValue;
                }
                else if (type === 3 && !isNullOrUndefined(dateUnit)) {
                    currentValue = this._getNextDateValue(true, dateUnit, initValue, currentValue, stepValue, i + 1);
                }
            }
            else if (!isLeftOrUp && (noStopValue || isPositiveStep && isSmallerThanStopValue || !isPositiveStep && isBiggerThanStopValue)) {
                newValues.push(currentValue);
                if (type === 1 ) {
                    currentValue += stepValue;
                }
                else if (type === 2 ) {
                    currentValue *= stepValue;
                }
                else if (type === 3 && !isNullOrUndefined(dateUnit)) {
                    currentValue = this._getNextDateValue(false, dateUnit, initValue, currentValue, stepValue, i + 1);
                }
            }
        }
        return newValues;
    };
    _FillImp.prototype._calcSeriesTrendData = function (sourceData, count, type) {
        var newValues = [], i, isLinearType = type === 1 ;
        if (isLinearType || type === 2 ) {
            if (sourceData._dataCount() === 1) {
                sourceData._add(sourceData._indexes[0] + 1, isLinearType ? sourceData._toActualValue(sourceData._innerValues[0] + 1) : sourceData._values()[0]);
            }
            for (i = 0; i < count; i++) {
                newValues.push(getTrendOrGrowthValue(!!isLinearType, sourceData._values2(), sourceData._indexes2(), i + 1));
            }
            return newValues;
        }
        return keyword_null;
    };
    _FillImp.prototype._fillAuto = function (range, series, justGetToolTipContent, withTag, withoutStyle, originalTableRangesBeforeExpand) {
        var self = this, sheet = self._sheet, modelManager = sheet._modelManager, newRange = sheet._getActualRange(range), row = newRange.row, column = newRange.col, rowCount = newRange.rowCount, columnCount = newRange.colCount, sourceRange = sheet._getActualRange(sheet._eventHandler._dragFillStartRange), sourceRange_row = sourceRange.row, sourceRange_col = sourceRange.col;
        if (modelManager._hasPartSpans(sourceRange_row, sourceRange_col, sourceRange.rowCount, sourceRange.colCount) || modelManager._hasPartSpans(row, column, rowCount, columnCount)) {
            throw new Error(getSR().Exp_ChangeMergedCell);
        }
        var result = self._autoFillRange(sourceRange, rowCount, columnCount, series, justGetToolTipContent, !(row < sourceRange_row || column < sourceRange_col), withTag, withoutStyle, originalTableRangesBeforeExpand);
        if (self._needRefilterTable && self._needRefilterTable._rowFilter) {
            self._needRefilterTable._rowFilter.reFilter();
            delete self._needRefilterTable;
        }
        return result;
    };
    _FillImp.prototype._autoFillRange = function (sourceRange, rowCount, columnCount, fillSeries, justGetTooltipContent, isIncrease, withTag, withoutStyle, originalTableRangesBeforeExpand) {
        var self = this, directionNum = isIncrease ? 1 : -1, nWhole, nPartial, targetRange, i, sourceRange_row = sourceRange.row, sourceRange_col = sourceRange.col, sourceRange_rowCount = sourceRange.rowCount, sourceRange_colCount = sourceRange.colCount;
        if (fillSeries === 1 ) {
            nWhole = Math_floor(columnCount / sourceRange_colCount);
            nPartial = columnCount % sourceRange_colCount;
            if (!justGetTooltipContent) {
                for (i = 1; i < nWhole; i++) {
                    targetRange = createRange(sourceRange_row, sourceRange_col + i * directionNum * sourceRange_colCount, sourceRange_rowCount, sourceRange_colCount);
                    self._copyRange(sourceRange, targetRange, fillSeries, 4 , justGetTooltipContent, isIncrease, keyword_undefined, keyword_undefined, keyword_undefined, withTag, withoutStyle);
                }
            }
            if (justGetTooltipContent && nWhole > 1 && nPartial === 0) {
                nWhole = nWhole - 1;
                nPartial = sourceRange_colCount;
            }
            if (nWhole > 0 && nPartial > 0) {
                targetRange = isIncrease ? createRange(sourceRange_row, sourceRange_col + nWhole * sourceRange_colCount, sourceRange_rowCount, nPartial)
                    : createRange(sourceRange_row, sourceRange_col - nWhole * sourceRange_colCount + sourceRange_colCount - nPartial, sourceRange_rowCount, nPartial);
                return self._copyRange(sourceRange, targetRange, fillSeries, 4 , justGetTooltipContent, isIncrease, keyword_null, isIncrease ? 0 : sourceRange_colCount - nPartial, keyword_undefined, withTag, withoutStyle);
            }
        }
        else {
            nWhole = Math_floor(rowCount / sourceRange_rowCount);
            nPartial = rowCount % sourceRange_rowCount;
            if (!self._isFiltered) {
                targetRange = createRange(sourceRange_row + directionNum * sourceRange_rowCount, sourceRange_col, rowCount - sourceRange_rowCount, columnCount);
                self._checkSourceRangeFilterd(sourceRange, targetRange, directionNum, originalTableRangesBeforeExpand);
            }
            if (!justGetTooltipContent) {
                for (i = 1; i < nWhole; i++) {
                    targetRange = createRange(sourceRange_row + i * directionNum * sourceRange_rowCount, sourceRange_col, sourceRange_rowCount, sourceRange_colCount);
                    self._copyRange(sourceRange, targetRange, fillSeries, 4 , justGetTooltipContent, isIncrease, keyword_null, keyword_null, true, withTag, withoutStyle);
                }
            }
            if (justGetTooltipContent && nWhole > 1 && nPartial === 0) {
                nWhole = nWhole - 1;
                nPartial = sourceRange_rowCount;
            }
            if (nWhole > 0 && nPartial > 0) {
                targetRange = isIncrease ? createRange(sourceRange_row + nWhole * sourceRange_rowCount, sourceRange_col, nPartial, sourceRange_colCount)
                    : createRange(sourceRange_row - nWhole * sourceRange_rowCount + sourceRange_rowCount - nPartial, sourceRange_col, nPartial, sourceRange_colCount);
                return self._copyRange(sourceRange, targetRange, fillSeries, 4 , justGetTooltipContent, isIncrease, isIncrease ? 0 : sourceRange_rowCount - nPartial, keyword_null, true, withTag, withoutStyle);
            }
        }
    };
    _FillImp.prototype._copyRange = function (sourceRange, targetRange, fillSeries, fillType, justGetTooltipContent, isIncrease, rowOffset, colOffset, ignoreFilteredOutRow, withTag, withoutStyle) {
        var self = this, sheet = self._sheet, isRowSeries = fillSeries === 1 , formula, valueType, sourceSpan, outerIndex, result, outerSourceRangeIndex = isRowSeries ? sourceRange.row : sourceRange.col, innerSourceRangeIndex = isRowSeries ? sourceRange.col : sourceRange.row, outerTargetRangeIndex = isRowSeries ? targetRange.row : targetRange.col, innerTargetRangeIndex = isRowSeries ? targetRange.col : targetRange.row, outerSourceRangeCount = isRowSeries ? sourceRange.rowCount : sourceRange.colCount, innerSourceRangeCount = isRowSeries ? sourceRange.colCount : sourceRange.rowCount, targetRangeCount = isRowSeries ? targetRange.colCount : targetRange.rowCount;
        for (outerIndex = 0; outerIndex < outerSourceRangeCount; outerIndex++) {
            var trendData = keyword_null, trendDataType = keyword_null, innerIndex = 0, sourceRow = outerSourceRangeIndex + outerIndex, targetRow = outerTargetRangeIndex + outerIndex, outerSourceIndex = sourceRow, outerTargetIndex = targetRow, offset = (isRowSeries ? colOffset : rowOffset) || 0, argOffset = isRowSeries ? 0 : offset, argIgnoreFilteredOutRow = isRowSeries ? keyword_null : ignoreFilteredOutRow;
            var filterdSourceValue = keyword_null;
            while (innerIndex < innerSourceRangeCount) {
                var sourceColumn = innerSourceRangeIndex + innerIndex, targetColumn = innerTargetRangeIndex + innerIndex - offset, sourceValue = keyword_null, innerSourceIndex = sourceColumn, innerTargetIndex = targetColumn;
                if (!isRowSeries) {
                    sourceRow = sourceColumn;
                    sourceColumn = outerSourceIndex;
                    targetRow = targetColumn;
                    targetColumn = outerTargetIndex;
                }
                sourceSpan = sheet._modelManager.findSpan(sourceRow, sourceColumn);

                formula = sheet.getFormula && sheet.getFormula(sourceRow, sourceColumn);
                if (!formula || formula === '') {
                    sourceValue = sheet.getValue(sourceRow, sourceColumn);
                }
                var isFiltered = self._isFiltered;
                if (isFiltered && isNullOrUndefined(filterdSourceValue)) {
                    filterdSourceValue = isIncrease === false ? sheet.getValue(innerSourceRangeIndex + innerSourceRangeCount - 1, sourceColumn) : sheet.getValue(sourceRow, sourceColumn);
                }
                if (!isFiltered && fillType === 4 && (isNumber(sourceValue) || isString(sourceValue))) {
                    if (!trendData) {
                        trendData = new TrendDataSource();
                    }
                    if (isNumber(sourceValue)) {
                        valueType = sourceValue instanceof Date ? DATE_STRING : NUMBER_STRING;
                    }
                    else {
                        valueType = STR_STRING;
                    }
                    if (!trendDataType) {
                        trendDataType = valueType;
                    }
                    if (trendDataType === valueType) {
                        trendData._add(innerSourceIndex, sourceValue);
                        if (sourceSpan) {
                            innerIndex += isRowSeries ? sourceSpan.colCount : sourceSpan.rowCount;
                        }
                        else {
                            innerIndex++;
                        }
                        continue;
                    }
                }
                if (!isFiltered && sourceValue && trendData && trendData._dataCount()) {
                    result = self._autoFillTrendValues(isRowSeries, sourceRange, targetRange, outerSourceIndex, outerTargetIndex, trendData, justGetTooltipContent, isIncrease, argOffset, argIgnoreFilteredOutRow, withTag, withoutStyle);
                    if (justGetTooltipContent && result) {
                        return result;
                    }
                    trendData = keyword_null;
                    trendDataType = keyword_null;
                    continue;
                }
                if (isFiltered || !sourceSpan || sourceSpan && (isRowSeries ? sourceSpan.row : sourceSpan.col) === outerSourceIndex) {
                    var sameIndex = innerTargetIndex === innerTargetRangeIndex + targetRangeCount - 1;
                    var newValue = isFiltered ? filterdSourceValue : sourceValue;
                    if (justGetTooltipContent) {
                        if (isFiltered) {
                            return newValue;
                        }
                        if (sourceSpan && sameIndex || !sourceSpan && (sameIndex && isIncrease || !isIncrease && innerTargetIndex === innerTargetRangeIndex)) {
                            return sourceValue;
                        }
                    }
                    else if (innerTargetIndex < innerTargetRangeIndex + targetRangeCount && innerTargetIndex >= innerTargetRangeIndex &&
                        (isFiltered || isRowSeries || !isRowSeries && !(ignoreFilteredOutRow && sheet._isRowFilterOut && sheet._isRowFilterOut(innerTargetIndex)))) {
                        if (!isFiltered || self._filterRows.indexOf(targetRow) === -1) {
                            self._copyCell(sheet, sourceRow, sourceColumn, targetRow, targetColumn, newValue, fillType, withTag, withoutStyle);
                        }
                    }
                }
                if (sourceSpan) {
                    innerIndex += isRowSeries ? sourceSpan.colCount : sourceSpan.rowCount;
                }
                else {
                    innerIndex++;
                }
            }
            if (self._isFiltered) {
                var sourceRangeR = sourceRange.row, sourceRangeC = sourceRange.col, sourceRangeRC = sourceRange.rowCount, sourceRangeCC = sourceRange.colCount, targetRangeR = void 0, targetRangeC = void 0;
                var directionNum = isIncrease === false ? -1 : 1;
                for (var sIndex = 1; sIndex < sourceRangeRC; sIndex++) {
                    targetRangeR = sourceRangeR + directionNum * sIndex;
                    var tcIndex = 0;
                    while (tcIndex < sourceRangeCC) {
                        targetRangeC = sourceRangeC + tcIndex;
                        if (self._filterRows.indexOf(targetRangeR) === -1) {
                            self._copyCell(sheet, sourceRangeR, sourceRangeC, targetRangeR, targetRangeC, filterdSourceValue, fillType, withTag, withoutStyle);
                        }
                        tcIndex++;
                    }
                }
            }
            if (trendData && trendData._dataCount()) {
                result = self._autoFillTrendValues(isRowSeries, sourceRange, targetRange, outerSourceIndex, outerTargetIndex, trendData, justGetTooltipContent, isIncrease, argOffset, argIgnoreFilteredOutRow, withTag, withoutStyle);
                if (justGetTooltipContent && !isNullOrUndefined(result)) {
                    return result;
                }
            }
        }
        return keyword_null;
    };
    _FillImp.prototype._checkSourceRangeFilterd = function (sourceRange, targetRange, directionNum, originalTableRangesBeforeExpand) {
        var self = this, sheet = self._sheet, tables = sheet.tables;
        var resultRange = sourceRange.union(targetRange), tr = resultRange.row, trc = resultRange.rowCount;
        var sr = sourceRange.row, sc = sourceRange.col, src = sourceRange.rowCount, scc = sourceRange.colCount;
        if (tables) {
            var tableList = tables._findByRange(sr, sc, src, scc);
            for (var _i = 0, tableList_1 = tableList; _i < tableList_1.length; _i++) {
                var t = tableList_1[_i];
                var tableStartRow = t._row, tableStartCol = t._col, trcForTable = trc;
                if (originalTableRangesBeforeExpand) {
                    for (var _a = 0, originalTableRangesBeforeExpand_1 = originalTableRangesBeforeExpand; _a < originalTableRangesBeforeExpand_1.length; _a++) {
                        var range = originalTableRangesBeforeExpand_1[_a];
                        if (range.row === tableStartRow && range.col === tableStartCol) {
                            trcForTable = range.rowCount;
                            self._needRefilterTable = t;
                            break;
                        }
                    }
                }
                var rowFilter = t._rowFilter, filterRows = self._filterRows, rowIndex = void 0;
                if (rowFilter && rowFilter.isFiltered && rowFilter.isFiltered()) {
                    for (var j = 0; j < trcForTable; j++) {
                        rowIndex = tr + directionNum * j;
                        if (rowFilter.isRowFilteredOut(rowIndex)) {
                            self._filterRows.push(rowIndex);
                        }
                    }
                    if (filterRows.length > 0) {
                        self._isFiltered = true;
                        break;
                    }
                }
            }
        }
        var sheetRowFilter = sheet._rowFilter;
        if (self._isFiltered !== true && sheetRowFilter && sheetRowFilter.isFiltered && sheetRowFilter.isFiltered()) {
            var filterRows = self._filterRows, rowIndex = void 0;
            for (var j = 0; j < trc; j++) {
                rowIndex = tr + directionNum * j;
                if (sheetRowFilter.isRowFilteredOut(rowIndex)) {
                    self._filterRows.push(rowIndex);
                }
            }
            if (filterRows.length > 0) {
                self._isFiltered = true;
            }
        }
    };
    _FillImp.prototype._copyCell = function (sheet, fromRow, fromColumn, toRow, toColumn, newValue, type, withTag, withoutStyle) {
        var modelManager = sheet._modelManager, calcModel, span;
        if (_supportsCalc && (sheet.hasFormula(fromRow, fromColumn) || sheet.hasFormula(toRow, toColumn))) {
            sheet.setFormula(toRow, toColumn, keyword_null);
            if (type === 0 || type === 4 ) {
                calcModel = sheet._getCalcModel();
                if (sheet.getFormula(fromRow, fromColumn)) {
                    SheetsCalc_1.CalcOperatorAdjustor.copyFormula(calcModel, fromRow, fromColumn, calcModel, toRow, toColumn, 1, 1, keyword_undefined, true );
                }
            }
        }
        sheet.setValue(toRow, toColumn, newValue);
        var copyToOption = withoutStyle ? 0 : 64 ;
        if (withTag) {
            copyToOption |= 128 ;
        }
        copyToOption |= 1024 ;
        sheet._copyToCore(fromRow, fromColumn, toRow, toColumn, 1, 1, copyToOption, keyword_undefined, true );
        sheet.removeSpan(toRow, toColumn, 3 );
        span = modelManager.findSpan(fromRow, fromColumn);
        if (span && fromRow === span.row && fromColumn === span.col) {
            sheet._addSpanImp(toRow, toColumn, span.rowCount, span.colCount, 3 );
        }
    };
    _FillImp.prototype._autoFillTrendValues = function (isRowTrend, sourceRange, targetRange, sourceArg, targetArg, trendData, justGetTooltipContent, isIncrease, indexOffset, ignoreFilteredOutRow, withTag, withoutStyle) {
        var self = this, sheet = self._sheet, count, i, value, startIndex, targetRangeIndex = isRowTrend ? targetRange.col : targetRange.row, sourceRangeIndex = isRowTrend ? sourceRange.col : sourceRange.row, targetRangeCount = isRowTrend ? targetRange.colCount : targetRange.rowCount, sourceRangeCount = isRowTrend ? sourceRange.colCount : sourceRange.rowCount;
        indexOffset = indexOffset || 0;
        var trendDataCount = trendData._dataCount(), multiplier = (targetRangeIndex - sourceRangeIndex - indexOffset) / sourceRangeCount, isArithmeticProgression = self._isArithmeticProgression(trendData._indexes, trendData._innerValues), trendDataType = trendData._type;
        if (isArithmeticProgression) {
            value = [];
            for (i = 0; i < trendDataCount; i++) {
                value[i] = i + 1;
            }
            count = trendDataCount;
        }
        else {
            startIndex = trendData._indexes[0];
            count = trendData._indexes[trendDataCount - 1] - startIndex + 1;
            if (trendDataCount === 1 && trendDataType !== STR_STRING) {
                trendData._add(trendData._indexes[0] + 1, trendData._toActualValue(trendData._innerValues[0] + 1));
            }
            value = trendData._indexes2();
        }
        for (i = 0; i < count; i++) {
            var originValues = trendData._originValues, rule = void 0, newV = void 0, isTrendIndex = void 0;
            if (trendDataType === DATE_STRING || trendDataType === STR_STRING) {
                rule = sheet._ruleFilter && sheet._ruleFilter.getRule(trendDataType, originValues);
            }
            if (rule) {
                newV = rule.getTargetValue(trendData, count * multiplier + i + 1, value, i, multiplier);
                isArithmeticProgression = rule._isArithmeticProgression ? rule._isArithmeticProgression : isArithmeticProgression;
                var isInternal = rule._isInternal ? rule._isInternal : false;


                isTrendIndex = isArithmeticProgression && !isInternal;
            }
            else {
                newV = getTrendOrGrowthValue(true, trendData._values2(), value, count * multiplier + i + 1);
                isTrendIndex = isArithmeticProgression;
            }
            var targetRangeEndIndex = targetRangeIndex + targetRangeCount - 1, sourceIndex = isTrendIndex ? trendData._indexes[i] : startIndex + i, targetIndex = sourceIndex + multiplier * sourceRangeCount;
            if (justGetTooltipContent) {
                if (isArithmeticProgression && (isIncrease && targetIndex === targetRangeEndIndex || !isIncrease && targetIndex === targetRangeIndex) ||
                    !isArithmeticProgression && targetIndex + indexOffset === targetRangeEndIndex) {
                    return trendData._toActualValue(newV);
                }
            }
            else if (targetIndex < targetRangeIndex + targetRangeCount && targetIndex >= targetRangeIndex) {
                if (isRowTrend) {
                    self._copyCell(sheet, sourceArg, sourceIndex, targetArg, targetIndex, trendData._toActualValue(newV), 4 , withTag, withoutStyle);
                }
                else if (!(ignoreFilteredOutRow && sheet._isRowFilterOut && sheet._isRowFilterOut(targetIndex))) {
                    self._copyCell(sheet, sourceIndex, sourceArg, targetIndex, targetArg, trendData._toActualValue(newV), 4 , withTag, withoutStyle);
                }
            }
        }
        return keyword_null;
    };
    _FillImp.prototype._isArithmeticProgression = function (indexes, values) {
        var count = arrayHelper_getLength(values);
        if (count <= 1 || arrayHelper_getLength(indexes) !== count) {
            return false;
        }
        var indexDiff = indexes[1] - indexes[0], valueDiff = values[1] - values[0], i;
        for (i = 2; i < count; i++) {
            if (indexes[i] - indexes[i - 1] !== indexDiff || values[i] - values[i - 1] !== valueDiff) {
                return false;
            }
        }
        return true;
    };
    _FillImp.prototype._fillAutoByDirection = function (range, direction) {
        var self = this, sheet = this._sheet, spans = sheet._modelManager.getSpans(), newRange = sheet._getActualRange(range), row = newRange.row, column = newRange.col, rowCount = newRange.rowCount, columnCount = newRange.colCount, sourceRange;
        if (direction === 0 ) {
            sourceRange = createRange(row, column + columnCount - 1, rowCount, 1);
        }
        else if (direction === 1 ) {
            sourceRange = createRange(row, column, rowCount, 1);
        }
        else if (direction === 2 ) {
            sourceRange = createRange(row + rowCount - 1, column, 1, columnCount);
        }
        else {
            sourceRange = createRange(row, column, 1, columnCount);
        }
        sourceRange = sheet._cellRangeInflate(spans, sourceRange);
        if (sourceRange) {
            self._directionFillRange(sourceRange, row, column, rowCount, columnCount, direction);
        }
    };
    _FillImp.prototype._directionFillRange = function (sourceRange, row, column, rowCount, columnCount, direction) {
        var self = this, sourceRange_row = sourceRange.row, sourceRange_col = sourceRange.col, sourceRange_rowCount = sourceRange.rowCount, sourceRange_colCount = sourceRange.colCount, nWhole, i, argCount, indexCount, fillSeries, rowCountHelper, colCountHelper, modelManager = self._sheet._modelManager, hasSpan;
        if (direction === 0 ) {
            hasSpan = modelManager._hasSpans(row, column, rowCount, columnCount - sourceRange_colCount);
            rowCountHelper = 0;
            colCountHelper = -1 * sourceRange_colCount;
            argCount = columnCount;
            indexCount = sourceRange_colCount;
            fillSeries = 1 ;
        }
        else if (direction === 1 ) {
            hasSpan = modelManager._hasSpans(row, column + sourceRange_colCount, rowCount, columnCount - sourceRange_colCount);
            rowCountHelper = 0;
            colCountHelper = sourceRange_colCount;
            argCount = columnCount;
            indexCount = sourceRange_colCount;
            fillSeries = 1 ;
        }
        else if (direction === 2 ) {
            hasSpan = modelManager._hasSpans(row, column, rowCount - sourceRange_rowCount, columnCount);
            rowCountHelper = -1 * sourceRange_rowCount;
            colCountHelper = 0;
            argCount = rowCount;
            indexCount = sourceRange_rowCount;
            fillSeries = 0 ;
        }
        else {
            hasSpan = modelManager._hasSpans(row + sourceRange_rowCount, column, rowCount - sourceRange_rowCount, columnCount);
            rowCountHelper = sourceRange_rowCount;
            colCountHelper = 0;
            argCount = rowCount;
            indexCount = sourceRange_rowCount;
            fillSeries = 0 ;
        }
        if (hasSpan) {
            throw new Error(getSR().Exp_TargetContainsMergedCells);
        }
        if (argCount % indexCount !== 0) {
            throw new Error(getSR().Exp_MergedCellsIdentical);
        }
        nWhole = Math_floor(argCount / indexCount);
        for (i = 1; i < nWhole; i++) {
            self._copyRange(sourceRange, createRange(sourceRange_row + i * rowCountHelper, sourceRange_col + i * colCountHelper, sourceRange_rowCount, sourceRange_colCount), fillSeries, 0 );
        }
    };
    _FillImp.prototype._getNextDateValue = function (isLeftOrUp, dateUnit, initValue, currentValue, stepValue, nextIndex) {
        var temp = isLeftOrUp ? -1 : 1;
        var nextStepValue = Math_floor(nextIndex * stepValue), addValue = Math.abs(stepValue), retDate = dateTimeHelper_fromOADate(dateUnit > 1 ? initValue : currentValue);
        if (dateUnit === 0 ) {
            retDate.setDate(retDate.getDate() + temp * stepValue);
        }
        else if (dateUnit === 1 ) {
            while (addValue > 0) {
                retDate.setDate(retDate.getDate() + temp * (stepValue > 0 ? 1 : -1));
                if (retDate.getDay() !== 6 && retDate.getDay() !== 0) {
                    addValue--;
                }
            }
        }
        else if (dateUnit === 2 ) {
            retDate.setMonth(retDate.getMonth() + temp * nextStepValue);
        }
        else {
            retDate.setFullYear(retDate.getFullYear() + temp * nextStepValue);
        }
        return dateTimeHelper_toOADate(retDate);
    };
    return _FillImp;
}());
exports._FillImp = _FillImp;
/***/ }),

/***/ './dist/plugins/fill/fill.ns.js':
/*!**************************************!*\
  !*** ./dist/plugins/fill/fill.ns.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var en = __webpack_require__(/*! ./fill.res.en */ './dist/plugins/fill/fill.res.en.js');
exports.SR = {
    en: en
};
/***/ }),

/***/ './dist/plugins/fill/fill.res.en.js':
/*!******************************************!*\
  !*** ./dist/plugins/fill/fill.res.en.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.CopyCells = 'Copy Cells';
exports.FillSeries = 'Fill Series';
exports.FillFormattingOnly = 'Fill Formatting Only';
exports.FillWithoutFormatting = 'Fill Without Formatting';
exports.Exp_NumberOnly = 'Only works for Numbers';
exports.Exp_RangeContainsMergedCell = 'Range should not have merged cells.';
exports.Exp_TargetContainsMergedCells = 'Target range should not have merged cells.';
exports.Exp_MergedCellsIdentical = 'This operation requires the merged cells to be identically sized.';
exports.Exp_FillRangeContainsMergedCell = 'Cannot fill range that contains a merged cell.';
exports.Exp_FillCellsReadOnly = 'The cells you are trying to fill are protected and therefore read-only.';
exports.Exp_ChangeMergedCell = 'Cannot change part of merged cell.';
exports.Exp_ColumnReadOnly = 'The column you are trying to change is protected and therefore read-only.';
exports.Exp_RowReadOnly = 'The row you are trying to change is protected and therefore read-only.';
exports.Exp_CellReadOnly = 'The cell you are trying to change is protected and therefore read-only.';
exports.Exp_RangeIsNull = 'range is null';
exports.Exp_ChangePartOfArray = 'Cannot change part of an array.';
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
/***/ })

/******/ });
  return GC;
};
//# sourceMappingURL=gc.spread.sheets.fill.14.2.5.js.map