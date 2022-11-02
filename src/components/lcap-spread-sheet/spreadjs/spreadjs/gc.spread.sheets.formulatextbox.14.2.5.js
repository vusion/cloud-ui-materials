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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['FormulaTextBox'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/formulaTextbox/formulaTextBox.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/formulaTextbox/formulaTextBox.entry.js':
/*!*************************************************************!*\
  !*** ./dist/plugins/formulaTextbox/formulaTextBox.entry.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
__export(__webpack_require__(/*! ./formulatextbox */ './dist/plugins/formulaTextbox/formulatextbox.js'));
__export(__webpack_require__(/*! ./formulatextbox-acrosssheet */ './dist/plugins/formulaTextbox/formulatextbox-acrosssheet.js'));
__webpack_require__(/*! ./formulatextbox-event */ './dist/plugins/formulaTextbox/formulatextbox-event.js');
__webpack_require__(/*! ./formulatextbox-actions */ './dist/plugins/formulaTextbox/formulatextbox-actions.js');
__webpack_require__(/*! ./formulatextbox-render */ './dist/plugins/formulaTextbox/formulatextbox-render.js');
var formulatextbox_1 = __webpack_require__(/*! ./formulatextbox */ './dist/plugins/formulaTextbox/formulatextbox.js');


exports.findControl = function (host) {
    if (typeof host === 'string') {
        host = document.getElementById(host);
    }
    return Core_1.GC$(host).data(formulatextbox_1.CONST_FORMULATEXTBOX);
};
/***/ }),

/***/ './dist/plugins/formulaTextbox/formulatextbox-acrosssheet.js':
/*!*******************************************************************!*\
  !*** ./dist/plugins/formulaTextbox/formulatextbox-acrosssheet.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var formulatextbox_1 = __webpack_require__(/*! ./formulatextbox */ './dist/plugins/formulaTextbox/formulatextbox.js');
var keyword_null = null;
function _createEditorElement(host) {
    var textareaElement = Core_1._util._createElement('textarea');
    var $textarea = Core_1.GC$(textareaElement);
    $textarea.css({ display: 'none' });
    Core_1.GC$(host).append(textareaElement);
    return textareaElement;
}
exports._createEditorElement = _createEditorElement;
var FormulatextboxAcrossSheet = (function () {
    function FormulatextboxAcrossSheet() {
        var self = this;
        self._rowIndex = -1;
        self._columnIndex = -1;
        self._text = '';
        self._caret = -1;
        self._sheet = null;
        self._isAppending = false;
        self._appendingIndex = -1;
        self._dom = null;
        self._workbook = null;
        self._canvasOffset = null;
    }
    FormulatextboxAcrossSheet.prototype._clear = function () {
        var self = this;
        self._removeDom();
        self._rowIndex = -1;
        self._columnIndex = -1;
        self._text = '';
        self._caret = -1;
        self._isAppending = false;
        self._appendingIndex = -1;
        self._sheet = null;
        self._workbook = null;
        self._canvasOffset = null;
    };
    FormulatextboxAcrossSheet.prototype._removeDom = function () {
        var self = this;
        if (!self._sheet._disposed) {
            var cellType = self._sheet.getCellType(self._rowIndex, self._columnIndex);
            var context = {
                sheet: self._sheet,
                row: self._rowIndex,
                col: self._columnIndex,
                sheetArea: 3
            };
            if (self._dom && self._dom.firstChild) {
                cellType.deactivateEditor(self._dom.firstChild.firstChild, context);
            }
        }
        Core_1.GC$(self._dom).remove();
        self._dom = null;
    };
    FormulatextboxAcrossSheet.prototype._save = function (sheet) {
        var self = this;
        var sheetFormulaTextBox = sheet._formulaTextBox;
        if (sheetFormulaTextBox) {
            self._text = sheetFormulaTextBox.text();
            self._rowIndex = sheet.getActiveRowIndex();
            self._columnIndex = sheet.getActiveColumnIndex();
            self._caret = sheetFormulaTextBox.caret();
            self._isAppending = sheetFormulaTextBox._isAppending;
            self._appendingIndex = sheetFormulaTextBox._appendingStartIndex();
            self._isSelectMode = sheetFormulaTextBox._isSelectMode;
            self._selectModeId = sheetFormulaTextBox._selectModeId;
            self._isAbsoluteReference = sheetFormulaTextBox._isAbsoluteReference;
            self._sheet = sheet;
            self._workbook = sheet.parent;
            self._canvasOffset = sheet._eventHandler._getCanvasPosition();
        }
    };
    FormulatextboxAcrossSheet.prototype._update = function (sheet) {
        var self = this;
        if (sheet._formulaTextBox) {
            self._text = sheet._formulaTextBox.text();
            self._caret = sheet._formulaTextBox.caret();
            self._isAppending = sheet._formulaTextBox._isAppending;
            self._appendingIndex = sheet._formulaTextBox._appendingStartIndex();
        }
    };
    FormulatextboxAcrossSheet.prototype._exportInfo = function (sheet) {
        var self = this;
        var sheetFormulaTextBox = sheet._formulaTextBox;
        if (sheetFormulaTextBox) {
            sheetFormulaTextBox._isSelectMode = self._isSelectMode;
            sheetFormulaTextBox._selectModeId = self._selectModeId;
            sheetFormulaTextBox._isAbsoluteReference = self._isAbsoluteReference;
            sheetFormulaTextBox.text(self._text);
            sheetFormulaTextBox.caret(self._caret);
            if (self._isAppending) {
                sheetFormulaTextBox._startAppending();
                sheetFormulaTextBox._appendingStartIndex(self._appendingIndex);
            }
        }
    };
    FormulatextboxAcrossSheet.prototype._handleFormulatextboxBeforeChange = function (eData) {
        var oldSheet = eData.oldSheet;
        var self = this;


        var oldSheetFormulaTextBox = oldSheet && oldSheet._formulaTextBox;
        if (!oldSheetFormulaTextBox) {
            return;
        }
        oldSheetFormulaTextBox.close();

        if ((!self._sheet || self._sheet._disposed) && oldSheetFormulaTextBox._canAppendRange() ||
            self._selectModeId !== oldSheetFormulaTextBox._selectModeId) {
            self._save(oldSheet);
            var cacheValue = oldSheet.getValue(oldSheet._activeRowIndex, oldSheet._activeColIndex, 3 );
            oldSheet.suspendEvent();
            try {
                if (!oldSheet.endEdit(true)) {
                    return;
                }
            }
            finally {
                oldSheet.resumeEvent();
            }
            oldSheet.setValue(oldSheet._activeRowIndex, oldSheet._activeColIndex, cacheValue, 3 , true);
            oldSheet._editorStatus = 1 ;
            eData.needTriggerSheetChange = false;
        }
        else if (self._text) {
            self._update(oldSheet);

            oldSheetFormulaTextBox.destroy();
            oldSheet._formulaTextBox = keyword_null;
            eData.needTriggerSheetChange = false;
        }
    };
    FormulatextboxAcrossSheet.prototype._handleFormulatextboxAfterChange = function (eData) {
        var oldSheet = eData.oldSheet, newSheet = eData.newSheet;
        var self = this;
        if (newSheet._disposed) {
            return;
        }
        if (self._dom && self._text === '') {
            oldSheet._loadAndSetSheetSelections();
            self._clear();
        }

        if (self._text && self._sheet === newSheet) {
            newSheet._editorStatus = 0 ;
            newSheet._setFocus();
            newSheet.suspendEvent();
            if (self._isSelectMode) {
                var editingElement = _createEditorElement(newSheet.parent._host);
                formulatextbox_1._attachFormulaTextBox(newSheet, editingElement);
                newSheet._editorStatus = 2 ;
                newSheet._render._paintFormulaTextBox();
            }
            else {
                newSheet.startEdit(false);
            }
            newSheet.resumeEvent();
            self._exportInfo(newSheet);
            self._updateEditor(newSheet, self._rowIndex, self._columnIndex);
            oldSheet._loadAndSetSheetSelections();
            self._clear();
        }
        else if (self._text && !self._dom) {
            newSheet._editorStatus = 1 ;
            oldSheet._editorStatus = 1 ;
            self._createHiddenDomForFormulaAcrossSheet(newSheet);
            newSheet._saveAndClearSheetSelections();
        }
        else if (self._text && self._sheet !== newSheet) {
            newSheet._editorStatus = 1 ;
            oldSheet._editorStatus = 1 ;
            self._createHiddenDomForFormulaAcrossSheet(newSheet);
            oldSheet._loadAndSetSheetSelections();
            newSheet._saveAndClearSheetSelections();
        }
    };
    FormulatextboxAcrossSheet.prototype._createHiddenDomForFormulaAcrossSheet = function (newSheet) {
        var self = this;
        var sheet = self._sheet;
        if (sheet._disposed) {
            return;
        }
        var row = self._rowIndex;
        var col = self._columnIndex;
        var cellType = sheet.getCellType(row, col);
        var context = {
            sheet: sheet,
            row: row,
            col: col,
            sheetArea: 3 ,
            canvasOffset: this._canvasOffset
        };
        var isImeAware = cellType.isImeAware(context);
        var focusHolder;

        if (isImeAware) {
            newSheet._editorStatus = 1 ;
            focusHolder = cellType._createCellTypeElement(context);
            if (!focusHolder) {
              return;
            }

            if (self._dom) {
                self._removeDom();
            }
            self._dom = focusHolder;
            Core_1.GC$(focusHolder).css('position', 'absolute');
            var rect = sheet.getCellRect(row, col);
            Core_1.GC$(focusHolder).attr('id', 'across');
            var style = sheet.getActualStyle(row, col);
            cellType._activateEditorWrapper(focusHolder, style, rect, context);
            var parentElement = self._workbook && self._workbook.getHost() || document.body;
            parentElement.insertBefore(focusHolder, keyword_null);
            if (self._isSelectMode) {
                Core_1.GC$(focusHolder).css({ display: 'none' });
            }
            formulatextbox_1._attachFormulaTextBox(newSheet, cellType.getEditingElement(), true);
            if (focusHolder.firstChild && !self._isSelectMode) {
                cellType.focus(focusHolder.firstChild.firstChild);
            }
            self._exportInfo(newSheet);
            cellType._updateEditorWrapper(focusHolder, style, rect, context);
        }
    };
    FormulatextboxAcrossSheet.prototype._updateEditor = function (sheet, activeRow, activeCol) {
        var ct = sheet.getCellType(activeRow, activeCol), editor = sheet._editor, sheetLayout = sheet._getSheetLayout(), cellStyle = sheet.getActualStyle(activeRow, activeCol), cellRect = sheet.getCellRect(activeRow, activeCol);
        if (cellRect && cellRect.width > 0 && cellRect.height > 0 &&
            cellRect.x >= sheetLayout._frozenX && cellRect.y >= sheetLayout._frozenY &&
            cellRect.x + cellRect.width <= sheetLayout._frozenTrailingX + sheetLayout._frozenTrailingWidth &&
            cellRect.y + cellRect.height <= sheetLayout._frozenTrailingY + sheetLayout._frozenTrailingHeight) {
            var context = {
                sheet: sheet,
                row: activeRow,
                col: activeCol,
                sheetArea: 3
            };
            if (editor && editor.parentNode) {
                ct._updateEditorWrapper(editor.parentNode.parentNode, cellStyle, cellRect, context);
            }
        }
    };
    return FormulatextboxAcrossSheet;
}());
var _formulatextboxAcrossSheetSingleton = (function () {
    function _formulatextboxAcrossSheetSingleton() {
    }
    _formulatextboxAcrossSheetSingleton._handleFormulatextboxAcrossSheetBeforeTabChange = function (e, eData) {
        if (!_formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance) {
            _formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance = new FormulatextboxAcrossSheet();
        }
        _formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance._handleFormulatextboxBeforeChange(eData);
    };
    _formulatextboxAcrossSheetSingleton._handleFormulatextboxAcrossSheetAfterTabChange = function (e, eData) {
        if (!_formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance) {
            _formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance = new FormulatextboxAcrossSheet();
        }
        _formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance._handleFormulatextboxAfterChange(eData);
    };
    return _formulatextboxAcrossSheetSingleton;
}());
exports._formulatextboxAcrossSheetSingleton = _formulatextboxAcrossSheetSingleton;
/***/ }),

/***/ './dist/plugins/formulaTextbox/formulatextbox-actions.js':
/*!***************************************************************!*\
  !*** ./dist/plugins/formulaTextbox/formulatextbox-actions.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var formulatextbox_1 = __webpack_require__(/*! ./formulatextbox */ './dist/plugins/formulaTextbox/formulatextbox.js');
var formulatextbox_acrosssheet_1 = __webpack_require__(/*! ./formulatextbox-acrosssheet */ './dist/plugins/formulaTextbox/formulatextbox-acrosssheet.js');
var keyword_undefined = void 0;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
function getKeyboardAppendingInfo(sheet) {
    var appendingInfo;
    var fbx = sheet._formulaTextBox, eventHandler = sheet._eventHandler;
    if (fbx._isAppending) {
        appendingInfo = eventHandler._formulaRangeAppendingInfo;
    }
    else {
        appendingInfo = eventHandler._formulaRangeAppendingInfo = {
            anchorRow: sheet._activeRowIndex,
            anchorCol: sheet._activeColIndex,
            leadingRow: sheet._leadingCellRow,
            leadingCol: sheet._leadingCellCol
        };
    }
    return appendingInfo;
}
function moveFormulaTextBoxCell(sheet, direction, wrap, beginRow, beginCol) {
    var fbx = sheet._formulaTextBox, parent = sheet.parent, options = parent && parent.options;
    if (!fbx || !fbx._canAppendRange() || !options || !options.allowUserEditFormula || !options.enableFormulaTextbox) {
        return;
    }
    var appendingInfo = getKeyboardAppendingInfo(sheet);
    var anchorRow = appendingInfo.anchorRow, anchorCol = appendingInfo.anchorCol, leadingRow = appendingInfo.leadingRow, leadingCol = appendingInfo.leadingCol;
    if (isNullOrUndefined(beginRow)) {
        beginRow = anchorRow;
    }
    if (isNullOrUndefined(beginCol)) {
        beginCol = anchorCol;
    }
    var eventHandler = sheet._eventHandler;
    var newAnchorRow, newAnchorCol, newLeadingRow, newLeadingCol;
    var nextCell;
    switch (direction) {
        case 3 :
            nextCell = sheet._getMoveLeftCell(beginRow, beginCol, wrap, leadingRow);
            break;
        case 4 :
            nextCell = sheet._getMoveRightCell(beginRow, beginCol, wrap, leadingRow);
            break;
        case 1 :
            nextCell = sheet._getMoveUpCell(beginRow, beginCol, wrap, leadingCol);
            break;
        case 2 :
            nextCell = sheet._getMoveDownCell(beginRow, beginCol, wrap, leadingCol);
            break;
        case 5 :
            nextCell = sheet._getMoveFirstCell();
            break;
        case 6 :
            nextCell = sheet._getMoveLastCell();
            break;
        default:
            break;
    }
    if (!nextCell) {
        return;
    }
    newAnchorRow = nextCell.row;
    newAnchorCol = nextCell.col;
    newLeadingRow = nextCell.leadingCellRow ? nextCell.leadingCellRow : newAnchorRow;
    newLeadingCol = nextCell.leadingCellCol ? nextCell.leadingCellCol : newAnchorCol;
    if (!sheet._canMoveCurrentTo(newAnchorRow, newAnchorCol)) {
        return;
    }
    appendingInfo.anchorRow = newAnchorRow;
    appendingInfo.anchorCol = newAnchorCol;
    appendingInfo.leadingRow = newLeadingRow;
    appendingInfo.leadingCol = newLeadingCol;
    var pivotTable = sheet.pivotTables && sheet.pivotTables.findPivotTable(newLeadingRow, newLeadingCol);
    var shiftKey = fbx.shift, ctrlKey = fbx.ctrl;
    var pivotCellInfo = pivotTable && pivotTable.getPivotInfoImp(newLeadingRow, newLeadingCol, false, true );
    var area = pivotCellInfo && pivotCellInfo.area;
    if (!fbx._isAbsoluteReference && pivotTable && pivotCellInfo && area === 4 ) {
        fbx._pivotActiveRange = new Core_1.Range(newLeadingRow, newLeadingCol, 1, 1);
        var valueFieldName = pivotCellInfo.valueFieldName, rowInfos = pivotCellInfo.rowInfos, colInfos = pivotCellInfo.colInfos;
        if (rowInfos || colInfos) {
            var pivotDataFormula = sheet._eventHandler._getPivotDataFormula(area, valueFieldName, rowInfos, colInfos, pivotTable.position());
            if (pivotDataFormula) {
                fbx._appendRange(pivotDataFormula, shiftKey, !ctrlKey, true);
                fbx._isWorking = false;
            }
        }
    }
    else {
        delete fbx._pivotActiveRange;
        var rangeString = formulatextbox_1._rangeToString(eventHandler._sheet, Core_1._createRange(newAnchorRow, newAnchorCol, 1, 1));
        if (rangeString) {
            fbx._appendRange(rangeString, false, true);
        }
    }
    if (newAnchorRow >= 0 && newAnchorCol >= 0) {
        sheet._scrollByMoveCell(newAnchorRow, newAnchorCol);
    }
}
function navigateNoWrap(sheet, direction) {
    if (sheet) {
        if (sheet._editorStatus === 2 ) {
            return false;
        }
        var fbx = sheet._formulaTextBox;
        if (fbx && fbx._canAppendRange()) {
            moveFormulaTextBoxCell(sheet, direction, false);
            return true;
        }
        else if (fbx) {
            sheet = FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
        }
        sheet._moveActiveCell(direction, false);
        return true;
    }
    return false;
}
function navigateNoWrapFrom(sheet, direction, row, col) {
    if (sheet) {
        if (sheet._editorStatus === 2 ) {
            return false;
        }
        var fbx = sheet._formulaTextBox;
        if (fbx && fbx._canAppendRange()) {
            moveFormulaTextBoxCell(sheet, direction, false, row, col);
            return true;
        }
        else if (fbx) {
            sheet = FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
        }
        sheet._moveActiveCell(direction, false, row, col);
        return true;
    }
    return false;
}
function changeFormulaTextBoxActiveRange(sheet, key, isCtrl) {
    var fbx = sheet._formulaTextBox, parent = sheet.parent, options = parent && parent.options;
    if (!fbx || !fbx._canAppendRange() || !options || !options.allowUserEditFormula || !options.enableFormulaTextbox) {
        return;
    }
    var eventHandler = sheet._eventHandler, appendingInfo = getKeyboardAppendingInfo(sheet), anchorRow = appendingInfo.anchorRow, anchorCol = appendingInfo.anchorCol;
    var range;
    if (fbx._isAppending) {
        var activeParamRange = fbx._getActiveRange();
        range = formulatextbox_1._stringToRange(sheet, activeParamRange.text);
    }
    else {
        range = Core_1._createRange(anchorRow, anchorCol, 1, 1);
    }
    if (range) {
        var newRange = sheet._getKeyboardSelectedRange(range, key, isCtrl, anchorRow, anchorCol);
        var rangeString = formulatextbox_1._rangeToString(eventHandler._sheet, newRange);
        if (rangeString) {
            fbx._appendRange(rangeString, true, false);
        }
    }
}
function alterSelection(sheet, key, isCtrl) {
    if (sheet) {
        if (sheet._editorStatus === 2 ) {
            return false;
        }
        var fbx = sheet._formulaTextBox;
        if (fbx && fbx._canAppendRange()) {
            changeFormulaTextBoxActiveRange(sheet, key, isCtrl);
            return true;
        }
        else if (fbx) {
            sheet = FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
        }
        if (!sheet.endEdit()) {
            return false;
        }
        sheet._changeActiveSelectedRange(key, isCtrl);
        return true;
    }
    return false;
}
Core_1.Commands._navigateNoWrap = navigateNoWrap;
Core_1.Commands._navigateNoWrapFrom = navigateNoWrapFrom;
Core_1.Commands._alterSelection = alterSelection;
var FormulatextboxActions = (function () {
    function FormulatextboxActions() {
    }


    FormulatextboxActions._commitArrayFormula = function (sheet) {
        return FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
    };


    FormulatextboxActions._commitInputNavigationDown = function (sheet) {
        return FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
    };


    FormulatextboxActions._commitInputNavigationUp = function (sheet) {
        return FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
    };
    FormulatextboxActions._handleFormulaTextboxAcrossSheet = function (sheet) {
        var actualSheet = sheet;
        var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if (ftbAcrossSheet && ftbAcrossSheet._text) {
            actualSheet = ftbAcrossSheet._sheet;
            FormulatextboxActions._changeSheetForFormulaTextboxAcrossSheet(actualSheet);
        }
        return actualSheet;
    };
    FormulatextboxActions._changeSheetForFormulaTextboxAcrossSheet = function (sheet, saveValue) {
        if (saveValue === void 0) {
            saveValue = true;
        }
        var workbookTmp = sheet.parent;
        var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if (ftbAcrossSheet && ftbAcrossSheet._text) {
            workbookTmp._changeSheetForFormulaAcrossSheet(sheet, saveValue);
        }
    };


    FormulatextboxActions._navigationPageUp = function (sheet, newActiveRow, prevPageTopRow) {
        var returnValue = false;
        var fbx = sheet._formulaTextBox;
        if (fbx && fbx._canAppendRange()) {
            var appendingInfo = getKeyboardAppendingInfo(sheet);
            appendingInfo.anchorRow = newActiveRow;
            appendingInfo.leadingRow = newActiveRow;
            var rangeString = formulatextbox_1._rangeToString(sheet, Core_1._createRange(appendingInfo.anchorRow, appendingInfo.anchorCol, 1, 1));
            if (rangeString) {
                fbx._appendRange(rangeString, false, true);
            }

            sheet._setTopRow(prevPageTopRow);
            returnValue = true;
        }
        else if (fbx) {
            sheet = FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
        }
        return { sheet: sheet, r: returnValue };
    };


    FormulatextboxActions._navigationPageDown = function (sheet, newActiveRow, nextPageTopRow) {
        var returnValue = false;
        var fbx = sheet._formulaTextBox;
        if (fbx && fbx._canAppendRange()) {
            var appendingInfo = getKeyboardAppendingInfo(sheet);
            appendingInfo.anchorRow = newActiveRow;
            appendingInfo.leadingRow = newActiveRow;
            var rangeString = formulatextbox_1._rangeToString(sheet, Core_1._createRange(appendingInfo.anchorRow, appendingInfo.anchorCol, 1, 1));
            if (rangeString) {
                fbx._appendRange(rangeString, false, true);
            }

            sheet._setTopRow(nextPageTopRow);
            returnValue = true;
        }
        else if (fbx) {
            sheet = FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
        }
        return { sheet: sheet, r: returnValue };
    };
    FormulatextboxActions._navigationFirstOrLast = function (sheet, isFirst) {
        var returnValue = false, type = isFirst ? 5 : 6 ;
        var fbx = sheet._formulaTextBox, activeRow = sheet._activeRowIndex, activeCol = sheet._activeColIndex;
        if (fbx && fbx._canAppendRange()) {
            if (!fbx._isAppending) {
                sheet._eventHandler._formulaRangeAppendingInfo = {
                    anchorRow: activeRow,
                    anchorCol: activeCol,
                    leadingRow: sheet._leadingCellRow,
                    leadingCol: sheet._leadingCellCol
                };
            }
            moveFormulaTextBoxCell(sheet, type, false, activeRow, activeCol);
            returnValue = true;
        }
        else if (fbx) {
            sheet = FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
        }
        return { sheet: sheet, r: returnValue };
    };


    FormulatextboxActions._navigationFirst = function (sheet) {
        return FormulatextboxActions._navigationFirstOrLast(sheet, true);
    };


    FormulatextboxActions._navigationLast = function (sheet) {
        return FormulatextboxActions._navigationFirstOrLast(sheet, false);
    };


    FormulatextboxActions._moveToNextCell = function (sheet) {
        return FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
    };


    FormulatextboxActions._moveToPreviousCell = function (sheet) {
        return FormulatextboxActions._handleFormulaTextboxAcrossSheet(sheet);
    };


    FormulatextboxActions._cancelInput = function (sheet) {
        var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if (ftbAcrossSheet && ftbAcrossSheet._text) {
            sheet = ftbAcrossSheet._sheet;
            var rowIndex = ftbAcrossSheet._rowIndex;
            var columnIndex = ftbAcrossSheet._columnIndex;
            FormulatextboxActions._changeSheetForFormulaTextboxAcrossSheet(sheet, false);
            formulatextbox_1._detachFormulaTextBox(sheet);

            if (!ftbAcrossSheet._isSelectMode) {
                sheet._setActiveCellAndSelection(rowIndex, columnIndex, keyword_undefined, keyword_undefined, 1 );
            }

            if (sheet.isEditing()) {
                var cacheValue = sheet.getValue(rowIndex, columnIndex, 3 );
                if (!sheet._endEditImp(true, undefined, undefined, true)) {
                    return false;
                }
                sheet.setValue(rowIndex, columnIndex, cacheValue, 3 , true);
                return true;
            }
        }
    };
    return FormulatextboxActions;
}());
Core_1.Commands._FormulatextboxCommands = FormulatextboxActions;
/***/ }),

/***/ './dist/plugins/formulaTextbox/formulatextbox-event.js':
/*!*************************************************************!*\
  !*** ./dist/plugins/formulaTextbox/formulatextbox-event.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var formulatextbox_1 = __webpack_require__(/*! ./formulatextbox */ './dist/plugins/formulaTextbox/formulatextbox.js');
var formulatextbox_acrosssheet_1 = __webpack_require__(/*! ./formulatextbox-acrosssheet */ './dist/plugins/formulaTextbox/formulatextbox-acrosssheet.js');
var $_extend = Core_1.GC$.extend;
var keyword_null = null, keyword_undefined = void 0, Math_max = Math.max, Math_min = Math.min;
$_extend(Core_1._SheetEventHandler.prototype, {


    _startFormulaRangeAppending: function (target) {
        var self = this;
        var sheet = self._sheet, fbx = sheet._formulaTextBox;
        if (!fbx) {
            return;
        }
        self._updateFormulaTextboxUndoStack();
        var frozenRowCount = sheet.frozenRowCount();
        var frozenColCount = sheet.frozenColumnCount();
        var fbxHasStarted = fbx._isAppending;
        if (!fbxHasStarted || !self._formulaRangeAppendingInfo) {
            self._formulaRangeAppendingInfo = {
                anchorRow: -1,
                anchorCol: -1,
                leadingRow: -1,
                leadingCol: -1
            };
        }
        var rowCount = sheet.getRowCount(), colCount = sheet.getColumnCount();
        var hitTestType = target.hitTestType, hitRow = target.row, hitCol = target.col, shiftKey = self.shift, ctrlKey = self.ctrl;
        var rangeAppendingInfo = self._formulaRangeAppendingInfo, oldAnchorRow = rangeAppendingInfo.anchorRow, oldAnchorCol = rangeAppendingInfo.anchorCol, anchorRow = -1, anchorCol = -1, range;
        if (hitTestType === 0 ) {
            anchorRow = frozenRowCount ? sheet._getFirstVisualRow() : sheet._scrollTopRow;
            anchorCol = frozenColCount ? sheet._getFirstVisualColumn() : sheet._scrollLeftCol;
            range = Core_1._createRange(-1, -1, -1, -1);
            fbx._appendRange(formulatextbox_1._rangeToString(sheet, range), shiftKey, !ctrlKey);
            self._isWorking = true;
        }
        else if (hitTestType === 1 ) {
            anchorRow = frozenRowCount ? sheet._getFirstVisualRow() : sheet._scrollTopRow;
            anchorCol = hitCol;
            range = sheet._getExtendedRange(0, hitCol, rowCount - 1, hitCol, true);
            if (shiftKey && oldAnchorCol >= 0) {
                range = sheet._getExtendedRange(0, hitCol, rowCount - 1, oldAnchorCol, true);
            }
            range = Core_1._createRange(-1, range.col, -1, range.colCount);
            fbx._appendRange(formulatextbox_1._rangeToString(sheet, range), shiftKey, !ctrlKey);
            self._isWorking = true;
        }
        else if (hitTestType === 2 ) {
            anchorRow = hitRow;
            anchorCol = frozenColCount ? sheet._getFirstVisualColumn() : sheet._scrollLeftCol;
            range = sheet._getExtendedRange(hitRow, 0, hitRow, colCount - 1, true);
            if (shiftKey && oldAnchorRow >= 0) {
                range = sheet._getExtendedRange(hitRow, 0, oldAnchorRow, colCount - 1, true);
            }
            range = Core_1._createRange(range.row, -1, range.rowCount, -1);
            fbx._appendRange(formulatextbox_1._rangeToString(sheet, range), shiftKey, !ctrlKey);
            self._isWorking = true;
        }
        else if (hitTestType === 3 ) {
            anchorRow = hitRow;
            anchorCol = hitCol;

            if (hitRow !== keyword_undefined && hitCol !== keyword_undefined) {
                var row = target.row, col = target.col, pivotTable = target.pivotTableInfo;
                var pivotCellInfo = pivotTable && pivotTable.getPivotInfoImp(row, col, false, true );
                var area = pivotCellInfo && pivotCellInfo.area;
                var tableSelection = target.tableSelectInfo && target.tableSelectInfo.tableSelection;
                if (!fbx._isAbsoluteReference && pivotTable && pivotCellInfo && area === 4 ) {
                    fbx._pivotActiveRange = new Core_1.Range(row, col, 1, 1);
                    var valueFieldName = pivotCellInfo.valueFieldName, rowInfos = pivotCellInfo.rowInfos, colInfos = pivotCellInfo.colInfos;
                    if (rowInfos || colInfos) {
                        var pivotDataFormula = self._getPivotDataFormula(area, valueFieldName, rowInfos, colInfos, pivotTable.position());
                        if (pivotDataFormula) {
                            fbx._appendRange(pivotDataFormula, shiftKey, !ctrlKey, true);
                            self._isWorking = true;
                            self._isPivotWorking = true;
                        }
                    }
                }
                else {
                    delete fbx._pivotActiveRange;
                    if (tableSelection) {
                        range = tableSelection;
                    }
                    else {
                        range = sheet._getExtendedRange(hitRow, hitCol, hitRow, hitCol, true);
                        range = Core_1._createRange(range.row, range.col, 1, 1);
                        if (shiftKey && oldAnchorRow >= 0 && oldAnchorCol >= 0) {
                            range = sheet._getExtendedRange(hitRow, hitCol, oldAnchorRow, oldAnchorCol, true);
                        }
                    }
                    fbx._appendRange(formulatextbox_1._rangeToString(sheet, range), shiftKey, !ctrlKey);
                    self._isWorking = true;
                }
            }
        }
        self._isFormulaRangeAppending = self._isWorking;
        if (!shiftKey || !fbxHasStarted) {
            rangeAppendingInfo.anchorRow = anchorRow;
            rangeAppendingInfo.anchorCol = anchorCol;
            rangeAppendingInfo.leadingRow = anchorRow;
            rangeAppendingInfo.leadingCol = anchorCol;
        }
        self._startHitInfo = {
            _scrollRowViewportIndex: target.rowViewportIndex,
            _scrollColViewportIndex: target.colViewportIndex,
            _hitTestType: target.hitTestType
        };
        self._startScroll();
    },
    _getPivotDataFormula: function (area, valueFieldName, rowInfos, colInfos, position) {
        var self = this;
        var sheet = self._sheet;
        if (area === 4 ) {
            var pivotPositionReference = void 0, pivotValueFieldName = void 0, fieldItemObjStr = '';
            var pivotPositionRow = position.row, pivotPositionCol = position.col;
            var pivotPositionRange = Core_1._createRange(pivotPositionRow, pivotPositionCol, 1, 1);
            pivotPositionReference = formulatextbox_1._rangeToString(sheet, pivotPositionRange, true);
            var fieldItemArray_1 = [];
            var array = [];
            if (Array.isArray(rowInfos) && Array.isArray(colInfos)) {
                array = rowInfos.concat(colInfos);
            }
            else {
                array = Array.isArray(rowInfos) && rowInfos || Array.isArray(colInfos) && colInfos;
            }
            array && array.forEach(function (rowInfo) {
                if (typeof rowInfo.fieldName === 'number') {
                    fieldItemArray_1.push(rowInfo.fieldName);
                }
                else {
                    fieldItemArray_1.push('"' + rowInfo.fieldName + '"');
                }
                if (typeof rowInfo.itemName === 'number') {
                    fieldItemArray_1.push(rowInfo.itemName);
                }
                else {
                    fieldItemArray_1.push('"' + rowInfo.itemName + '"');
                }
            });
            fieldItemObjStr = fieldItemArray_1.join(',');
            pivotValueFieldName = valueFieldName;
            var result = 'GETPIVOTDATA(' + '"' + pivotValueFieldName + '"' + ',' + pivotPositionReference;
            if (fieldItemObjStr !== '') {
                result += ',' + fieldItemObjStr;
            }
            return result + ')';
        }
    },
    _clearFormulaTextbox: function (sheet) {
        var crossSheet = false;
        var ftbInfo = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if (ftbInfo && ftbInfo._dom) {
            var orginalSheet = ftbInfo._sheet;
            var formulaTextBox = sheet._formulaTextBox;
            if (formulaTextBox) {
                orginalSheet.setFormula(ftbInfo._rowIndex, ftbInfo._columnIndex, formulaTextBox.text());
            }
            if (orginalSheet !== sheet) {
                Core_1.Commands._FormulatextboxCommands._changeSheetForFormulaTextboxAcrossSheet(orginalSheet);
                if (!orginalSheet.endEdit()) {
                    return;
                }
                crossSheet = true;
            }
            else {
                if (formulaTextBox) {
                    formulaTextBox.destroy();
                    sheet._formulaTextBox = keyword_null;
                }
                ftbInfo._clear();
            }
        }
        return crossSheet;
    },
    _continueFormulaRangeAppending: function () {
        var self = this;
        var hi = self._startHitInfo;
        if (!hi || !self._isWorking) {
            return;
        }
        var hitTestType = hi._hitTestType;
        if (hitTestType === 3 ) {
            self._continueFormulaRangeCellAppending();
        }
        else if (hitTestType === 2 ) {
            self._continueFormulaRangeRowAppending();
        }
        else if (hitTestType === 1 ) {
            self._continueFormulaRangeColumnAppending();
        }
    },
    _continueFormulaRangeCellAppending: function () {
        var self = this;
        var rangeAppendingInfo = self._formulaRangeAppendingInfo, anchorRow = rangeAppendingInfo.anchorRow, anchorCol = rangeAppendingInfo.anchorCol, hitRow = self._getHitRowIndex(), hitCol = self._getHitColumnIndex();
        if (anchorRow >= 0 && anchorCol >= 0 && hitRow >= 0 && hitCol >= 0) {
            var sheet = self._sheet;
            var range = sheet._getExtendedRange(hitRow, hitCol, anchorRow, anchorCol, true);
            var rangeString = formulatextbox_1._rangeToString(sheet, range);
            if (rangeString) {
                var fbx = sheet._formulaTextBox;
                if (self._isPivotWorking) {
                    if (!range.equals(fbx._pivotActiveRange)) {
                        delete fbx._pivotActiveRange;
                        fbx._appendRange(rangeString, true, true);
                    }
                }
                else {
                    fbx._appendRange(rangeString, true, false);
                }
            }
        }
        self._continueScroll();
    },
    _continueFormulaRangeRowAppending: function () {
        var self = this;
        var anchorRow = self._formulaRangeAppendingInfo.anchorRow, hitRow = self._getHitRowIndex();
        if (anchorRow >= 0 && hitRow >= 0) {
            var sheet = self._sheet;
            var range = sheet._getExtendedRange(hitRow, 0, anchorRow, sheet.getColumnCount() - 1, true);
            range = Core_1._createRange(range.row, -1, range.rowCount, -1);
            var rangeString = formulatextbox_1._rangeToString(sheet, range);
            if (rangeString) {
                var fbx = sheet._formulaTextBox;
                fbx._appendRange(rangeString, true, false);
            }
        }
        self._continueScroll();
    },
    _continueFormulaRangeColumnAppending: function () {
        var self = this;
        var anchorCol = self._formulaRangeAppendingInfo.anchorCol, hitCol = self._getHitColumnIndex();
        if (anchorCol >= 0 && hitCol >= 0) {
            var sheet = self._sheet;
            var range = sheet._getExtendedRange(0, hitCol, sheet.getRowCount() - 1, anchorCol, true);
            range = Core_1._createRange(-1, range.col, -1, range.colCount);
            var rangeString = formulatextbox_1._rangeToString(sheet, range);
            if (rangeString) {
                var fbx = sheet._formulaTextBox;
                fbx._appendRange(rangeString, true, false);
            }
        }
        self._continueScroll();
    },
    _stopFormulaRangeAppending: function () {
        var self = this;
        self._stopScroll();
        self._startHitInfo = keyword_null;
        self._isWorking = false;
        self._isFormulaRangeAppending = false;
    },


    _startFormulaRangeMoving: function (target) {
        var self = this;
        var sheet = self._sheet, fbx = self._getActualFormulaTextBox(), hi = target.formulaRangeHitInfo;
        if (!hi || !hi.inBorder || !fbx) {
            return;
        }
        if (fbx._isAppending) {
            fbx._stopAppending();
        }
        fbx.close();
        var paramRange = hi.paramRange, rangeString = (paramRange && paramRange.text);
        if (!rangeString) {
            return;
        }
        var range = formulatextbox_1._stringToRange(sheet, rangeString);
        if (!range) {
            return;
        }
        self._updateFormulaTextboxUndoStack();
        var rg = sheet._getActualRange(range), hitRow = target.row, hitCol = target.col;
        if (hitRow < rg.row) {
            hitRow = rg.row;
        }
        if (hitRow >= rg.row + rg.rowCount) {
            hitRow = rg.row + rg.rowCount - 1;
        }
        if (hitCol < rg.col) {
            hitCol = rg.col;
        }
        if (hitCol >= rg.col + rg.colCount) {
            hitCol = rg.col + rg.colCount - 1;
        }
        var rowOffset = hitRow - rg.row;
        var colOffset = hitCol - rg.col;
        self._isWorking = true;
        self._isFormulaRangeMoving = true;
        self._formulaRangeMovingInfo = {
            paramRange: paramRange,
            fromRange: range,
            rowOffset: rowOffset,
            colOffset: colOffset
        };
        self._startHitInfo = {
            _scrollRowViewportIndex: target.rowViewportIndex,
            _scrollColViewportIndex: target.colViewportIndex,
            _hitTestType: target.hitTestType
        };
        self._startScroll();
    },
    _continueFormulaRangeMoving: function () {
        var self = this;
        if (!self._isWorking || !self._isFormulaRangeMoving) {
            return;
        }
        var hitRow = self._getHitRowIndex();
        var hitCol = self._getHitColumnIndex();
        if (hitRow >= 0 && hitCol >= 0) {
            var movingInfo = self._formulaRangeMovingInfo, range = movingInfo.fromRange, rowOffset = movingInfo.rowOffset, colOffset = movingInfo.colOffset, oldToRow = movingInfo.toRow, oldToCol = movingInfo.toCol;
            var toRow = hitRow, toCol = hitCol;
            if (toRow !== oldToRow || toCol !== oldToCol) {
                movingInfo.toRow = toRow;
                movingInfo.toCol = toCol;
                var sheet = self._sheet, sheetRowCount = sheet.getRowCount(), sheetColCount = sheet.getColumnCount(), fromRow = range.row, fromCol = range.col, fromRowCount = range.rowCount, fromColCount = range.colCount;
                var newRow = fromRow < 0 ? -1 : Math_max(0, Math_min(sheetRowCount - fromRowCount, hitRow - rowOffset));
                var newCol = fromCol < 0 ? -1 : Math_max(0, Math_min(sheetColCount - fromColCount, hitCol - colOffset));
                var rangeString = formulatextbox_1._rangeToString(sheet, Core_1._createRange(newRow, newCol, fromRowCount, fromColCount));
                if (rangeString) {
                    var fbx = self._getActualFormulaTextBox();
                    fbx._repalceRange(movingInfo.paramRange.index, rangeString, true);
                }
            }
        }
        self._continueScroll();
    },
    _stopFormulaRangeMoving: function () {
        var self = this;
        self._stopScroll();
        self._isWorking = false;
        self._isFormulaRangeMoving = false;
        self._formulaRangeMovingInfo = keyword_null;
        var formulaTextBox = self._getActualFormulaTextBox();
        if (formulaTextBox.onRangeMoved) {
            formulaTextBox.onRangeMoved();
        }
    },


    _startFormulaRangeResizing: function (target) {
        var self = this;
        var sheet = self._sheet, fbx = self._getActualFormulaTextBox(), hi = target.formulaRangeHitInfo;
        if (!hi || !fbx) {
            return;
        }
        if (fbx._isAppending) {
            fbx._stopAppending();
        }
        var paramRange = hi.paramRange, rangeString = (paramRange && paramRange.text);
        if (!paramRange || !rangeString) {
            return;
        }
        var range = formulatextbox_1._stringToRange(sheet, rangeString);
        if (!range) {
            return;
        }
        self._updateFormulaTextboxUndoStack();
        var row = range.row, endRow = range.row < 0 ? -1 : range.row + range.rowCount - 1, col = range.col, endCol = range.col < 0 ? -1 : range.col + range.colCount - 1;
        var anchorRow, anchorCol, toRow, toCol;
        if (hi.inTopLeft) {
            anchorRow = endRow;
            anchorCol = endCol;
            toRow = row;
            toCol = col;
        }
        else if (hi.inTopRight) {
            anchorRow = endRow;
            anchorCol = col;
            toRow = row;
            toCol = endCol;
        }
        else if (hi.inBottomLeft) {
            anchorRow = row;
            anchorCol = endCol;
            toRow = endRow;
            toCol = col;
        }
        else if (hi.inBottomRight) {
            anchorRow = row;
            anchorCol = col;
            toRow = endRow;
            toCol = endCol;
        }
        else {
            return;
        }
        self._isWorking = true;
        self._isFormulaRangeResizing = true;
        self._formulaRangeResizingInfo = {
            paramRange: paramRange,
            anchorRow: anchorRow,
            anchorCol: anchorCol,
            toRow: toRow,
            toCol: toCol
        };
        self._startHitInfo = {
            _scrollRowViewportIndex: target.rowViewportIndex,
            _scrollColViewportIndex: target.colViewportIndex,
            _hitTestType: target.hitTestType
        };
        self._startScroll();
    },
    _dealMouseDownInFormulatextbox: function (sheet, target) {
        var fbx = sheet._formulaTextBox;
        if (fbx && fbx._canAppendRange()) {
            this._startFormulaRangeAppending(target);
            return true;
        }
        else if (this._clearFormulaTextbox(sheet)) {
            return true;
        }
        return false;
    },
    _continueFormulaRangeResizing: function () {
        var self = this;
        if (!self._isWorking || !self._isFormulaRangeResizing) {
            return;
        }
        var hitRow = self._getHitRowIndex();
        var hitCol = self._getHitColumnIndex();
        if (hitRow >= 0 && hitCol >= 0) {
            var resizingInfo = self._formulaRangeResizingInfo, anchorRow = resizingInfo.anchorRow, anchorCol = resizingInfo.anchorCol, oldToRow = resizingInfo.toRow, oldToCol = resizingInfo.toCol;
            var toRow = hitRow, toCol = hitCol;
            if (toRow !== oldToRow || toCol !== oldToCol) {
                resizingInfo.toRow = toRow;
                resizingInfo.toCol = toCol;
                var sheet = self._sheet, sheetRowCount = sheet.getRowCount(), sheetColCount = sheet.getColumnCount();
                var fromRow = anchorRow < 0 ? sheetRowCount - 1 : anchorRow, fromCol = anchorCol < 0 ? sheetColCount - 1 : anchorCol;
                var row = Math_min(fromRow, toRow), col = Math_min(fromCol, toCol), rowCount = Math_max(fromRow, toRow) - row + 1, colCount = Math_max(fromCol, toCol) - col + 1;
                if (row === 0 && rowCount === sheetRowCount) {
                    row = -1;
                    rowCount = -1;
                }
                if (col === 0 && colCount === sheetColCount) {
                    col = -1;
                    colCount = -1;
                }
                var rangeString = formulatextbox_1._rangeToString(sheet, Core_1._createRange(row, col, rowCount, colCount));
                if (rangeString) {
                    var fbx = self._getActualFormulaTextBox();
                    fbx._repalceRange(resizingInfo.paramRange.index, rangeString, true);
                }
            }
        }
        self._continueScroll();
    },
    _stopFormulaRangeResizing: function () {
        var self = this;
        self._stopScroll();
        self._isWorking = false;
        self._isFormulaRangeResizing = false;
        self._formulaRangeResizingInfo = keyword_null;
        var formulaTextBox = self._getActualFormulaTextBox();
        if (formulaTextBox._isSelectMode) {
            formulaTextBox._appendingStart = 1;
            var lastRangeTextIndex = formulaTextBox.text().lastIndexOf(',', formulaTextBox.caret());
            if (lastRangeTextIndex !== -1) {
                formulaTextBox._appendingStart = lastRangeTextIndex + 1;
            }
        }
        if (formulaTextBox.onRangeResized) {
            formulaTextBox.onRangeResized();
        }
    },

    _getFormulaRangeHitInfo: function (target, x, y) {
        var sheet = this._sheet, fbx = this._getActualFormulaTextBox(), paramRanges = (fbx && fbx._getRanges());
        if (!paramRanges || paramRanges.length === 0 || !fbx._allowMoveResize) {
            return keyword_null;
        }
        var rowViewportIndex = target.rowViewportIndex, colViewportIndex = target.colViewportIndex;
        if (this._inGrayArea(rowViewportIndex, colViewportIndex, x, y)) {
            return keyword_null;
        }
        var paramRange, cr, rect;
        for (var i = paramRanges.length - 1; i >= 0; i--) {
            paramRange = paramRanges[i];
            if (paramRange.allowDrag === false) {
                continue;
            }
            var ftbInfo = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
            if (ftbInfo && ftbInfo._text) {
                continue;
            }
            cr = formulatextbox_1._stringToRange(sheet, paramRange.text);
            if (!cr) {
                continue;
            }
            rect = sheet.getRangeRect(rowViewportIndex, colViewportIndex, cr);
            var size = 5;
            var x1 = rect.x - 2, x2 = rect.x + rect.width + 1 - size, y1 = rect.y - 2, y2 = rect.y + rect.height + 1 - size;

            if (x1 + size <= x && x < x2) {
                if ((y1 + 1 <= y && y <= y1 + 3) || (y2 + 1 <= y && y <= y2 + 3)) {
                    return { paramRange: paramRange, inBorder: true };
                }
            }
            if (y1 + size <= y && y < y2) {
                if ((x1 + 1 <= x && x <= x1 + 3) || (x2 + 1 <= x && x <= x2 + 3)) {
                    return { paramRange: paramRange, inBorder: true };
                }
            }

            if (x2 <= x && x < x2 + size && y2 <= y && y < y2 + size) {
                return { paramRange: paramRange, inBottomRight: true };
            }
            if (x1 <= x && x < x1 + size && y2 <= y && y < y2 + size) {
                return { paramRange: paramRange, inBottomLeft: true };
            }
            if (x2 <= x && x < x2 + size && y1 <= y && y < y1 + size) {
                return { paramRange: paramRange, inTopRight: true };
            }
            if (x1 <= x && x < x1 + size && y1 <= y && y < y1 + size) {
                return { paramRange: paramRange, inTopLeft: true };
            }
        }
        return keyword_null;
    },
    _getActualFormulaTextBox: function () {
        var sheet = this._sheet;
        return sheet._formulaTextBox || sheet._formulaTextBoxForChart;
    },
    _changeFormulaReference: function () {
        var self = this, sheet = self._sheet, fbx = sheet._formulaTextBox;
        if (!fbx) {
            return;
        }
        var baseRow = sheet._activeRowIndex, baseCol = sheet._activeColIndex, parent = sheet.parent, useR1C1 = (parent && parent.options.referenceStyle === 1 );
        var context = new SheetsCalc_1.SheetParserContext(sheet, useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseCol));
        var parser = new CalcEngine_1.Parser();
        var range, expression;
        if (fbx._isAppending) {
            var ranges = fbx._getAppendingRanges();
            for (var i = 0; i < ranges.length; i++) {
                range = ranges[i];
                try {
                    expression = parser.parse(context, range.text);
                }
                catch (ex) {
                    expression = keyword_null;
                }
                if (!expression) {
                    continue;
                }
                if (expression.type === 1 ) {
                    self._changeRangeExpressionReference(expression, baseRow, baseCol, true, true);
                    fbx._repalceRange(range.index, parser.unparse(context, expression));
                }
            }
        }
        else {
            range = fbx._getActiveRange();
            if (!range) {
                return;
            }
            try {
                expression = parser.parse(context, range.text);
            }
            catch (ex) {
                expression = keyword_null;
            }
            if (!expression) {
                return;
            }
            if (expression.type === 1 && !expression._isCell()) {
                var separatorPosition = range.textOffset + range.text.lastIndexOf(':');
                var leftActive = (fbx.caret() <= separatorPosition);
                if (leftActive) {
                    self._changeRangeExpressionReference(expression, baseRow, baseCol, true, false);
                    var newRangeText = parser.unparse(context, expression);
                    fbx._repalceRange(range.index, newRangeText);
                    fbx.caret(range.textOffset + newRangeText.lastIndexOf(':'));
                }
                else {
                    self._changeRangeExpressionReference(expression, baseRow, baseCol, false, true);
                    fbx._repalceRange(range.index, parser.unparse(context, expression));
                }
            }
            else if (expression.type === 1 ) {
                self._changeCellExpressionReference(expression, baseRow, baseCol);
                fbx._repalceRange(range.index, parser.unparse(context, expression));
            }
        }
    },
    _changeRangeExpressionReference: function (expression, baseRow, baseCol, changeLeft, changeRight) {
        var startRowRelative = expression.rowRelative, startColumnRelative = expression.columnRelative;
        if (changeLeft) {
            if (startRowRelative && startColumnRelative) {
                expression.rowRelative = false;
                expression.columnRelative = false;
                expression.row += baseRow;
                expression.column += baseCol;
            }
            else if (startRowRelative) {
                expression.columnRelative = true;
                expression.column -= baseCol;
            }
            else if (startColumnRelative) {
                expression.rowRelative = true;
                expression.columnRelative = false;
                expression.row -= baseRow;
                expression.column += baseCol;
            }
            else {
                expression.columnRelative = true;
                expression.column -= baseCol;
            }
        }
        var endRowRelative = expression.endRowRelative, endColumnRelative = expression.endColumnRelative;
        if (changeRight) {
            if (endRowRelative && endColumnRelative) {
                expression.endRowRelative = false;
                expression.endColumnRelative = false;
                expression.endRow += baseRow;
                expression.endColumn += baseCol;
            }
            else if (endRowRelative) {
                expression.endColumnRelative = true;
                expression.endColumn -= baseCol;
            }
            else if (endColumnRelative) {
                expression.endRowRelative = true;
                expression.endColumnRelative = false;
                expression.endRow -= baseRow;
                expression.endColumn += baseCol;
            }
            else {
                expression.endColumnRelative = true;
                expression.endColumn -= baseCol;
            }
        }
    },
    _changeCellExpressionReference: function (expression, baseRow, baseCol) {
        var rowRelative = expression.rowRelative, columnRelative = expression.columnRelative;
        if (rowRelative && columnRelative) {
            expression.rowRelative = false;
            expression.columnRelative = false;
            expression.row += baseRow;
            expression.column += baseCol;
        }
        else if (rowRelative) {
            expression.columnRelative = true;
            expression.column -= baseCol;
        }
        else if (columnRelative) {
            expression.rowRelative = true;
            expression.columnRelative = false;
            expression.row -= baseRow;
            expression.column += baseCol;
        }
        else {
            expression.columnRelative = true;
            expression.column -= baseCol;
        }
    },
    _updateFormulaTextboxUndoStack: function () {
        var sheet = this._sheet, fbx = sheet._formulaTextBox;
        if (fbx) {
            var host = fbx._host;
            if (host && fbx._isEditableDIVElement(host)) {
                fbx._updateUndoStack();
            }
        }
    }

});
/***/ }),

/***/ './dist/plugins/formulaTextbox/formulatextbox-render.js':
/*!**************************************************************!*\
  !*** ./dist/plugins/formulaTextbox/formulatextbox-render.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var formulatextbox_1 = __webpack_require__(/*! ./formulatextbox */ './dist/plugins/formulaTextbox/formulatextbox.js');
var formulatextbox_acrosssheet_1 = __webpack_require__(/*! ./formulatextbox-acrosssheet */ './dist/plugins/formulaTextbox/formulatextbox-acrosssheet.js');
var $_extend = Core_1.GC$.extend;
var StringHelper = Common_1.Common._StringHelper;
$_extend(Core_1._SheetRender.prototype, {
    _paintFormulaTextBox: function () {
        var self = this;
        var sheet = self._sheet;
        if (sheet._layoutSuspended > 0) {
            return;
        }
        var layout = sheet._getSheetLayout(), ctx = self._getCtx();
        self._copyDoubleBuffer(layout.x, layout.y, layout.width, layout.height);
        self._paintAdornment(ctx);
    }
});
Core_1.Worksheet._registerFeature('formulatextboxrender', {
    paintAdornment: function (e) {
        var sheet = this;
        var ctx = e.ctx, clipRect = e.clipRect, isCustom = e.isCustom, paramRanges = e.customParamRanges || [];
        var crossSheetHideHighLight = e.crossSheetHideHighLight;
        var render = sheet._render;
        var layout = sheet._getSheetLayout(), rect, r, c;
        var fbx = sheet._eventHandler._getActualFormulaTextBox();
        if (fbx || isCustom) {
            for (r = 0; r <= 2; r++) {
                for (c = 0; c <= 2; c++) {
                    rect = layout._viewportRect(r, c);
                    if (!rect || rect.width === 0 || rect.height === 0) {
                        continue;
                    }
                    paintFormulaTextBoxRange(render, ctx, r, c, clipRect, fbx, {isCustom, customParamRanges: paramRanges, crossSheetHideHighLight});
                }
            }
        }
    }
});
function getColorByCustom(index, ranges) {
    var DEFAULT_RANGE_COLORS = ['#0000ff', '#008000', '#9900cc', '#800000', '#00cc33', '#cc6600', '#cc0099'];
    var count = ranges.length;
    if (index < 0 || count <= index) {
        return '';
    }
    var tmpRanges = [], range, colorIndex = 0;
    for (var i = 0; i < count; i++) {
        range = ranges[i];
        var duplicated = false, j = 0;
        for (; j < tmpRanges.length; j++) {
            if (range.text) {
                if (tmpRanges[j].text.replace(/\s+/g, '').toUpperCase() === range.text.replace(/\s+/g, '').toUpperCase()) {
                    duplicated = true;
                    break;
                }
            }
        }
        if (duplicated) {
            if (index === i) {
                colorIndex = j;
                break;
            }
        }
        else {
            tmpRanges.push(range);
            if (index === i) {
                colorIndex = tmpRanges.length - 1;
                break;
            }
        }
    }
    var colors = DEFAULT_RANGE_COLORS;
    return colors[colorIndex % colors.length];
}
function paintFormulaTextBoxRange(render, ctx, rowViewportIndex, colViewportIndex, viewRect, fbx, options = {isCustom: false, customParamRanges: [], crossSheetHideHighLight: false}) {
    var sheet = render._sheet, eventHandler = sheet._eventHandler;
    let {isCustom, crossSheetHideHighLight, customParamRanges} = options;
    let paramRanges = fbx && fbx._getRanges() || customParamRanges;
    let rangeCount = (paramRanges && paramRanges.length);
    if (rangeCount <= 0) {
        return;
    }
    var clipRect = render._getClipRect(rowViewportIndex, colViewportIndex, viewRect);
    if (!clipRect) {
        return;
    }
    ctx.save();
    ctx.rect(clipRect.x, clipRect.y, clipRect.width, clipRect.height);
    ctx.clip();
    ctx.beginPath();
    var paintRects = [];
    var isHovering = eventHandler.isFormulaRangeHoving, hoveringInfo = eventHandler._formulRangeHovingInfo, isMoving = eventHandler._isFormulaRangeMoving, movingInfo = eventHandler._formulaRangeMovingInfo, isResizing = eventHandler._isFormulaRangeResizing, resizingInfo = eventHandler._formulaRangeResizingInfo;
    var paramRange, rangeString, ranges, rects, color;
    for (var i = 0; i < rangeCount; i++) {
        paramRange = paramRanges[i];
        rangeString = paramRange.text;

        if (paramRange.ranges && paramRange.ranges.length > 0) {
            ranges = paramRange.ranges;
        }
        else {
            ranges = [formulatextbox_1._stringToRange(sheet, rangeString)];
        }
        if (!ranges) {
            continue;
        }

        var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if ((isCustom && crossSheetHideHighLight) || (ftbAcrossSheet && ftbAcrossSheet._sheet && rangeString !== undefined)) {
            if (StringHelper._contains(rangeString, '!')) {
                var sheetNameInFormula = StringHelper._leftBefore(rangeString, '!');
                if (sheet.name() !== sheetNameInFormula && '\'' + sheet.name() + '\'' !== sheetNameInFormula) {
                    continue;
                }
            }
            else {
                var leftBefore = StringHelper._leftBefore(rangeString, '[');
                var tableManager = sheet.tables;
                if (!sheet.getCustomNames()[leftBefore] && !(tableManager && tableManager.findByName(leftBefore))) {
                    continue;
                }
            }
        }
        rects = render._getPaintingRects(rowViewportIndex, colViewportIndex, ranges, clipRect);
        for (var j = 0; j < rects.length; j++) {
            var rect = rects[j];
            if (rect && rect.width > 0 && rect.height > 0) {
                if (isCustom) {
                    color = getColorByCustom(i, paramRanges);
                } else {
                    color = fbx._getRangeColor(i);
                }

                if (fbx && fbx._isAppendingRange(paramRange) || paramRange.isPivotClickCell) {
                    if (isHovering && hoveringInfo.paramRange.index === i) {
                        ctx.beginPath();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = color;
                        ctx.rect(rect.x + 1, rect.y + 1, rect.width - 3, rect.height - 3);
                        ctx.stroke();
                    }
                    render._paintDashRect(ctx, rect, color);
                }
                else if ((isHovering && hoveringInfo.paramRange.index === i)
                    || (isMoving && movingInfo.paramRange.index === i)
                    || (isResizing && resizingInfo.paramRange.index === i)) {
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = color;
                    ctx.rect(rect.x + 1, rect.y + 1, rect.width - 3, rect.height - 3);
                    ctx.stroke();
                }
                else {
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = color;
                    ctx.rect(rect.x, rect.y, rect.width - 1, rect.height - 1);
                    ctx.stroke();
                }

                if (fbx && fbx._isActiveRange(paramRange) || isCustom) {
                    var val = Common_1.Common._ColorHelper._fromString(color);
                    val.a = 0.1;
                    ctx.beginPath();
                    ctx.fillStyle = Common_1.Common._ColorHelper._toString(val);
                    ctx.fillRect(rect.x + 1, rect.y + 1, rect.width - 3, rect.height - 3);
                }
                paintRects.push({ rect: rect, color: color, allowDrag: paramRange.allowDrag });
            }
        }
    }

    if (fbx && fbx._allowMoveResize && paintRects.length > 0) {
        var paintRectCount = paintRects.length ;
        for (var i = 0; i < paintRectCount; i++) {
            var rect = paintRects[i].rect;
            color = paintRects[i].color;
            var size = 5;
            var x1 = rect.x - 2, x2 = rect.x + rect.width + 1 - size, y1 = rect.y - 2, y2 = rect.y + rect.height + 1 - size;
            if (paintRects[i].allowDrag === false) {
                continue;
            }

            var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
            if (ftbAcrossSheet && ftbAcrossSheet._text) {
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.fillRect(x1, y1, size, size);
            ctx.fillRect(x2, y1, size, size);
            ctx.fillRect(x1, y2, size, size);
            ctx.fillRect(x2, y2, size, size);
        }
    }
    ctx.beginPath();
    ctx.restore();
}
/***/ }),

/***/ './dist/plugins/formulaTextbox/formulatextbox.js':
/*!*******************************************************!*\
  !*** ./dist/plugins/formulaTextbox/formulatextbox.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';


Object.defineProperty(exports, '__esModule', { value: true });
var CalcNS = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var SheetsCalcNS = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var formulatextbox_acrosssheet_1 = __webpack_require__(/*! ./formulatextbox-acrosssheet */ './dist/plugins/formulaTextbox/formulatextbox-acrosssheet.js');
var keyword_null = null, keyword_undefined = void 0, Math_max = Math.max, Math_min = Math.min;
var $_extend = Core_1.GC$.extend;
var createElement = Core_1._util._createElement;
var WINDOW = window;
var DOCUMENT = document;
var StringHelper = Common_1.Common._StringHelper;
var cancelDefault = Core_1._util._cancelDefault;
var _isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var browser = Core_1._util._browser, lessThanIE10 = browser.msie && parseInt(browser.version, 10) < 10;
var toUpperCase = StringHelper._toUpperCase;
exports.CONST_FORMULATEXTBOX = 'formulatextbox';
var CONST_GCUIELEMENT = 'gcUIElement', CONST_INPUT = 'input', NBSP_SPACE_LETTER = '\u00a0';
var ns_formulatextbox_internal = '.gcFormulaTextBoxInternal', ns_formulatextbox = '.gcFormulaTextBox', EVENT_TEXTCHANGED = 'TextChanged', EVENT_CARETCHANGED = 'CaretChanged', EVENT_APPENDSTARTED = 'AppendStarted', EVENT_APPENDENDED = 'AppendEnded';
var Keys = { left: 37, right: 39, up: 38, down: 40, tab: 9, enter: 13, pup: 33, pdn: 34, end: 35, home: 36, esc: 27 };
var DEFAULT_RANGE_COLORS = ['#0000ff', '#008000', '#9900cc', '#800000', '#00cc33', '#cc6600', '#cc0099'];
var RangeSelectOffImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAIAAACw+gCQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJSSURBVDhPY3hILqBYZ/eqV81LXpbNfp7S/yS0+Z5p+olD5x5OWXGyYcaBmql7yifuLOnbBkRFPVuACKIFqjNzwv2Qhhue5ReByK/qYlDtxb///n35+efd1z/PP/wB6vn2+/f7b79ffgIhiBaoTlPP5I2bN2/asmX7jh3Hjh+ft3wLUOfX779ef/h+6+nHtXsuffrx+/bj16euvwQiiBaETiAy904NTasGantRkvA8wetpsO0NJ839htKb9l/Jal6T3rgytX4FEEG0QHXuOnbr55+/P379AyIg40m8x8uZ3U+aC49bKn64eHzX0es4Xds0Y9ejl++vPXx3+f77Nx9/3PU3e5YR/CTM4WGs53pVPqBrgX6+8+QNFtdmNq0q6NpU1LOpe/6+o+fvH3fR36XCc9dE/KG3EdDNQPaF7VunLTuY0bA0omg2RAtUZ1LNUohjgCEJDJVtdlpPty6dr8x3yUDsvoPqRm2hqcp8Jy+9WbH/7cQ1EB0wnXEVCyBBt+fc8+NXXy9Yf/znz5/31swFaliiKjBZme/yrSe7z36YsuZBy4KbEC1QnRFFcxKqFgP1A1Fq7ZKcpqU1EzYuWX/kxIa1/WBtizYcAwqG5E71SZsA0QLVGZI3A+Lax+/+ACMwvHDmsn1v1xx8e+jSp83HXgP1ALmztryYsv4ZEEG0QHUGZk+FuHbHqadABORO3fC8Z/mdvmU3Oxdd9cuY1LX0VsOci/WzQQiiBaET4lQgii1fEFU6F4iAXgC6JShnakDWZKBmoDshCKIFqpMMQK7Ohw8BTajNa73pg9oAAAAASUVORK5CYII=")';
var RangeSelectOnImage = 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+U1BKUyBBbm90aGVyLVNlbGVjdGluZzwvdGl0bGU+CiAgICA8ZyBpZD0iU1BKUy1Bbm90aGVyLVNlbGVjdGluZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlN3aXRjaC1yb3cvY29sdW1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMS4wMDAwMDApIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS04IiBmaWxsPSIjRDVENUQ1IiB4PSIwIiB5PSIwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTMiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgZmlsbD0iI0ZGRkZGRiIgeD0iMyIgeT0iNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTMsNSBMMTMsNSBMMTMsOSBMMyw5IEwzLDUgWiBNNCw2IEw0LDggTDEyLDggTDEyLDYgTDQsNiBaIiBpZD0i55+p5b2iIiBmaWxsPSIjNjY2NjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTAsMCBMMTYsMCBMMTYsMTMgTDAsMTMgTDAsMCBaIE0xLDEgTDEsMTIgTDE1LDEyIEwxNSwxIEwxLDEgWiIgaWQ9IuefqeW9oiIgZmlsbD0iIzY2NjY2NiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjODFCRUZDIiB4PSIxIiB5PSIxIiB3aWR0aD0iMTQiIGhlaWdodD0iMiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2LDAgTDE2LDQgTDAsNCBMMCwwIEwxNiwwIFogTTE1LDEgTDEsMSBMMSwzIEwxNSwzIEwxNSwxIFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiMzNjdGQzkiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi41ODc3NjcsIDYuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTaGFwZSIgZmlsbD0iI0ZBNzU0MSIgcG9pbnRzPSI1LjQxMjIzMjg1IDcgMi40MTIyMzI4NSAzLjk5NTM1Mjk1IDQuNDEyMjMyODUgMy45OTUzNTI5NSA0LjQxMjIzMjg1IDEgNi40MTIyMzI4NSAxIDYuNDEyMjMyODUgMy45OTUzNTI5NSA4LjQxNDAzOTk4IDMuOTk1MzUyOTUiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC44MjY2NDAyLDIuOTk1MzUyOTUgTDUuNDEyMDE5ODEsOC40MTUwOTU5NCBMMC4wMDA2NTkxMTExNjIsMi45OTUzNTI5NSBMMy40MTIyMzI4NSwyLjk5NTM1Mjk1IEwzLjQxMjIzMjg1LDAgTDcuNDEyMjMyODUsMCBMNy40MTIyMzI4NSwyLjk5NTM1Mjk1IEwxMC44MjY2NDAyLDIuOTk1MzUyOTUgWiBNNS40MTIyMzI4NSw3IEw4LjQxNDAzOTk4LDMuOTk1MzUyOTUgTDYuNDEyMjMyODUsMy45OTUzNTI5NSBMNi40MTIyMzI4NSwxIEw0LjQxMjIzMjg1LDEgTDQuNDEyMjMyODUsMy45OTUzNTI5NSBMMi40MTIyMzI4NSwzLjk5NTM1Mjk1IEw1LjQxMjIzMjg1LDcgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==")';
var BACKGROUND = 'background', BACKGROUND_REPEAT = 'background-repeat', TEXT_BEFORE = 'text-before', CARET_BEFORE = 'caret-before';
var ZERO_WIDTH_CHAR = '\u200b';
function getCharCount(text, singleChar) {
    var count = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] === singleChar) {
            count++;
        }
    }
    return count;
}
function getBuiltInFunctionsDescription() {
    var resourceArr = [];
    Core_1.GC$.each(CalcNS.sR()._builtInFunctionsResource, function (name, description) {
        if (CalcNS.Functions._builtInFunctions[name]) {
            description.name = name;
            resourceArr.push(description);
        }
    });
    return resourceArr;
}
function getFunctionDescription(functionObj) {
    var resourceArr = [], description;
    Core_1.GC$.each(functionObj, function (name, func) {
        description = func.description();
        if (description) {
            description.name = name;
            resourceArr.push(description);
        }
    });
    return resourceArr;
}
function isStructureReference(table, range) {
    if (!table) {
        return false;
    }
    var isRowSr = false, isColSr = false;
    if (range.rowCount === 1) {
        if (table.hasHeadersRow() && range.row === table.startRow()) {
            return true;
        }

        if (table.hasTotalsRow() && range.row === table.endRow()) {
            return true;
        }
    }
    else {
        if (table.hasHeadersRow() && range.row === table.startRow()) {
            if (range.rowCount === table.dataRange().rowCount + 1) {
                isRowSr = true;
            }

            if (table.hasTotalsRow() && range.rowCount === table.dataRange().rowCount + 1 + 1) {
                isRowSr = true;
            }
        }

        if (range.row === table.dataRange().row) {
            if (range.rowCount === table.dataRange().rowCount) {
                isRowSr = true;
            }

            if (table.hasTotalsRow() && range.rowCount === table.dataRange().rowCount + 1) {
                isRowSr = true;
            }
        }
    }
    if (range.col + range.colCount <= table.startColumn() + table.dataRange().colCount) {
        isColSr = true;
    }
    return isRowSr && isColSr;
}
function getSheetNameWithDoubleSingleQuotes(sheetName) {
    return sheetName.replace(/'/g, '\'\'');
}
function getSheetNameForFormula(sheet) {
    var sheetName = sheet.name();
    if (!SheetsCalcNS._validateSheetName(sheetName.split(''), false)) {
        return '\'' + getSheetNameWithDoubleSingleQuotes(sheetName) + '\'';
    }
    return sheetName;
}
function getFunctionName(name) {
    var builtInFunctionsMapping = CalcNS.getMapping() && CalcNS.getMapping().builtInFunctionsMapping;
    return builtInFunctionsMapping && builtInFunctionsMapping[name] && builtInFunctionsMapping[name].alias || name;
}
function _rangeToString(sheet, range, isAbsoluteReference) {
    if (!range) {
        return keyword_null;
    }
    var formulaTextBox = sheet._formulaTextBox;
    var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
    var sourceSheet = ftbAcrossSheet && ftbAcrossSheet._sheet || sheet;
    var baseRow = sourceSheet._activeRowIndex, baseCol = sourceSheet._activeColIndex, parent = sheet.parent, useR1C1 = (parent && parent.options.referenceStyle === 1 );
    var rangeReferenceRelative = 15 ;
    if (sheet._formulaTextBox && sheet._formulaTextBox._isAbsoluteReference || isAbsoluteReference) {
        rangeReferenceRelative = 0 ;
    }
    if (range.row < 0 && range.col < 0) {
        range = new Core_1.Range(0, -1, sheet.getRowCount(), -1);
    }
    var tableManager = sheet.tables, table = tableManager && tableManager.find(range.row, range.col);
    if (ftbAcrossSheet && ftbAcrossSheet._isAbsoluteReference || isAbsoluteReference) {
        rangeReferenceRelative = 0 ;
    }
    if (formulaTextBox && !formulaTextBox._isSelectMode && isStructureReference(table, range)) {
        if (ftbAcrossSheet && ftbAcrossSheet._text && ftbAcrossSheet._sheet !== sheet) {
            baseRow = baseCol = -1;
        }
        return SheetsCalcNS.rangeToFormulaWithStructReference(sheet, range, baseRow, baseCol, rangeReferenceRelative, useR1C1, table);
    }
    var rangeToFormula = SheetsCalcNS.rangeToFormula(range, baseRow, baseCol, rangeReferenceRelative, useR1C1);


    if ((ftbAcrossSheet && ftbAcrossSheet._text) || (sheet._formulaTextBox && sheet._formulaTextBox._isSelectMode && sheet._formulaTextBox._needSheetName)) {
        var sheetName = getSheetNameForFormula(sheet);
        rangeToFormula = sheetName + '!' + rangeToFormula;
    }
    return rangeToFormula;
}
exports._rangeToString = _rangeToString;

Core_1.Events.FormulaTextBoxTextChanged = 'FormulaTextBoxTextChanged';
Core_1.Events.FormulaTextBoxCaretChanged = 'FormulaTextBoxCaretChanged';

WINDOW._gcGlobal._clickOutsideSheetCallBack.push(function (activeElement, hitElement) {
    var FormulatextboxAcrossSheetSingleton = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton;
    if (!hitElement && activeElement.endEdit && FormulatextboxAcrossSheetSingleton) {
        var ftbAcrossSheet = FormulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if (ftbAcrossSheet && ftbAcrossSheet._dom && activeElement._formulaTextBox) {
            activeElement._formulaTextBox && activeElement._formulaTextBox.destroy();
            activeElement._formulaTextBox = keyword_null;
            ftbAcrossSheet._clear();
        }
    }
});
function _attachFormulaTextBox(sheet, editingElement, selectMode) {
    var workbook = sheet.parent, options = workbook && workbook.options;
    if (!editingElement || !options || !options.allowUserEditFormula || !options.enableFormulaTextbox) {
        if (!selectMode) {
            return;
        }
    }
    if (sheet._formulaTextBox) {
        sheet._formulaTextBox.destroy();
    }
    sheet._formulaTextBox = new FormulaTextBox(editingElement, null, workbook) ;
    var text = sheet._formulaTextBox.text();
    var formulaInfo = sheet.getFormulaInformation(sheet._activeRowIndex, sheet._activeColIndex);
    if (text[0] === '=' && (!formulaInfo || !formulaInfo.hasFormula)) {
        text = '\'' + text;
        sheet._formulaTextBox.text(text);
    }
    var fbx = sheet._formulaTextBox, eventHandler = sheet._eventHandler, render = sheet._render;
    fbx.bind('AppendStarted', function () {
        fbx.close();
        var oldStatus = sheet._editorStatus;
        if (oldStatus !== 1 ) {
            sheet._editorStatus = 1 ;
            sheet._raiseEditorStatusChanged(oldStatus, 1 );
        }
    });
    fbx.bind('AppendEnded', function () {
        render._paintFormulaTextBox();
    });
    fbx.bind(EVENT_TEXTCHANGED, function (e, eData) {
        if (sheet._disposed) {
            return;
        }

        if (eData && eData.type !== CONST_INPUT) {
            eventHandler._updateEditingEditor(eData);
            var activeRow = sheet._activeRowIndex, activeCol = sheet._activeColIndex, ct = sheet.getCellType(activeRow, activeCol);
            sheet._trigger(Core_1.Events.EditChange, {
                sheet: sheet,
                sheetName: sheet.name(),
                row: activeRow,
                col: activeCol,
                editingText: ct.getEditorValue(sheet._editor)
            });
        }

        render._paintFormulaTextBox();

        sheet._trigger(Core_1.Events.FormulaTextBoxTextChanged, {
            sheet: sheet,
            sheetName: sheet.name(),
            text: fbx.text()
        });
    });
    fbx.bind('CaretChanged', function () {
        render._paintFormulaTextBox();

        sheet._trigger(Core_1.Events.FormulaTextBoxCaretChanged, {
            sheet: sheet,
            sheetName: sheet.name(),
            caret: fbx.caret()
        });
    });

    fbx.add(getBuiltInFunctionsDescription());

    fbx.add(getFunctionDescription(CalcNS.Functions._customFunctions));

    fbx.add(getFunctionDescription(sheet._functions).concat(getFunctionDescription(workbook._functions)));
    render._paintFormulaTextBox();
}
exports._attachFormulaTextBox = _attachFormulaTextBox;
function _detachFormulaTextBox(sheet) {
    if (sheet._formulaTextBox) {
        sheet._formulaTextBox.destroy();
        sheet._formulaTextBox = keyword_null;
        sheet._render._paintFormulaTextBox();
    }
    var attachedFbx = sheet.parent && sheet.parent._attachedFormulaTextBox;
    if (DOCUMENT.activeElement === (attachedFbx && attachedFbx._host)) {
        sheet._eventHandler._changeFocusHolder();
    }
}
exports._detachFormulaTextBox = _detachFormulaTextBox;
function _stringToRange(sheet, rangeText) {
    if (!rangeText) {
        return keyword_null;
    }
    var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
    var sourceSheet = ftbAcrossSheet && ftbAcrossSheet._sheet || sheet;
    var baseRow = sourceSheet._activeRowIndex, baseCol = sourceSheet._activeColIndex;
    try {
        return SheetsCalcNS.formulaToRange(sheet, rangeText, baseRow, baseCol);
    }
    catch (ex) {

    }
    return keyword_null;
}
exports._stringToRange = _stringToRange;
$_extend(Core_1._SheetTabBase.prototype, {
    _canCreateNewTab: function (sheet) {
        return !(sheet && sheet._formulaTextBox && sheet._formulaTextBox._canAppendRange());
    }
});
Core_1.Worksheet._registerFeature(exports.CONST_FORMULATEXTBOX, {
    startEdit: function (args) {
        _attachFormulaTextBox(this, args.element);
    },
    endEdit: function () {
        _detachFormulaTextBox(this);
    }
});
var _SheetTabBase_prototype = Core_1._SheetTabBase.prototype, oldAllowSheetReorder = _SheetTabBase_prototype._allowSheetReorder;
Core_1._SheetTabBase._registerFeature(exports.CONST_FORMULATEXTBOX, {
    preProcessMouseDbClick: function (argObj) {
        var sheet = Core_1._getActiveSheet(this._workbook);
        var formulaTextBox = sheet ? sheet._formulaTextBox : undefined;
        var needIgnoreMouseEvent = formulaTextBox && formulaTextBox._canAppendRange();
        var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if (needIgnoreMouseEvent) {
            argObj.r = false;
        }
        else if (ftbAcrossSheet && ftbAcrossSheet._dom) {
            ftbAcrossSheet._clear();
        }
    }
});
_SheetTabBase_prototype._allowSheetReorder = function () {
    var sheet = Core_1._getActiveSheet(this._workbook), formulaTextBox = sheet && sheet._formulaTextBox, ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance, formulaAcrossSheetInputing = ftbAcrossSheet && ftbAcrossSheet._text;
    return oldAllowSheetReorder.call(this) && !formulaAcrossSheetInputing && !formulaTextBox;
};

var selectModeId = 1;
function createRangeSelectDom(host, fbx) {
    var $host = Core_1.GC$(host);

    $host.attr('contenteditable', 'false');
    var table = createElement('table');
    Core_1.GC$(table).css('border-spacing', '0');
    Core_1.GC$(table).css('width', '100%');
    $host.append(table);
    var tbdy = createElement('tbody');
    table.appendChild(tbdy);
    var tr = document.createElement('tr');
    tbdy.appendChild(tr);
    var lefttd = document.createElement('td');

    Core_1.GC$(lefttd).css('padding-right', '0px');
    tr.appendChild(lefttd);
    var righttd = document.createElement('td');
    Core_1.GC$(righttd).css('width', '23px');
    Core_1.GC$(righttd).css('padding-right', '0px');
    righttd.className = 'select-range-wrap';
    tr.appendChild(righttd);
    var leftWidth = $host.width() - Core_1.GC$(righttd).width();
    var left = createElement('div');
    var clipper = createElement('div');
    Core_1.GC$(clipper).width(leftWidth);
    Core_1.GC$(clipper).css({
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
        'height': '20px'
    });
    clipper.appendChild(left);
    lefttd.appendChild(clipper);
    Core_1.GC$(left).css({
        display: 'inline-block',
        float: 'left',
        height: 'auto',
        outline: 'none'
    });
    Core_1.GC$(left).width(leftWidth);
    Core_1.GC$(left).attr('contenteditable', 'true');
    Core_1.GC$(left).attr('spellcheck', 'false');

    var right = createElement('div');
    if (!fbx.noNeedSelectButton) {
        righttd.appendChild(right);
        var $right = Core_1.GC$(right);
        $right.css({
            'display': 'block',
            'float': 'right',
            'width': '23px',
            'height': '23px',
            'background': fbx.rangeSelectOffImage,
            'background-repeat': 'no-repeat'
        });
        $right.bind('click', function () {
            if (fbx._isSelectButtonPressed) {
                fbx._workbook._trigger('RangeSelectEnding', fbx);
                fbx.endSelectMode();
            }
            else {
                fbx.startSelectMode();
            }
        });
    }

    return { contentDiv: left, button: right };
}


function isDynamicArrayFunction(name) {
    var dynamicArrayFunctions = ['FILTER', 'RANDARRAY', 'SEQUENCE', 'SORT', 'SORTBY', 'UNIQUE'];
    for (var i = 0; i < dynamicArrayFunctions.length; i++) {
        if (name === dynamicArrayFunctions[i]) {
            return true;
        }
    }
}


var FormulaTextBox = (function () {
    function FormulaTextBox(host, options, workbook) {
        var self = this;
        var contentDiv = host;
        self._isSelectMode = false;
        self._isAbsoluteReference = false;
        self._needSheetName = true;
        self._undoStack = [];
        self._redoStack = [];
        self._tableSelections = [];
        if (options && options.rangeSelectMode) {
            if (options.absoluteReference === true) {
                self._isAbsoluteReference = true;
            }
            if (options.needSheetName === false) {
                self._needSheetName = false;
            }
            self.rangeSelectOnImage = options.rangeSelectOnImage || RangeSelectOnImage;
            self.rangeSelectOffImage = options.rangeSelectOffImage || RangeSelectOffImage;
            self.noNeedSelectButton = options.noNeedSelectButton || false;
            self._isSelectMode = true;
            self._isSelectButtonPressed = false;
            self._isSelectFocusIn = false;
            self._selectModeDom = host;
            var rangeSelectDom = createRangeSelectDom(host, self);
            contentDiv = rangeSelectDom.contentDiv;
            self._rangeSelectButton = rangeSelectDom.button;
            self._rangeSelectHost = host;
            self._selectModeId = selectModeId;
            selectModeId++;
        }
        self._allowMoveResize = true;
        self._init(workbook && workbook.getHost() || DOCUMENT.body);
        if (contentDiv) {
            self._attachHost(contentDiv);
        }
        if (workbook) {
            self._isInWorkbook = true;
            self._setWorkbook(workbook);
            self._workbook._unbind(Core_1.Events.FormulatextboxActiveSheetChanging, formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._handleFormulatextboxAcrossSheetBeforeTabChange);
            self._workbook._bind(Core_1.Events.FormulatextboxActiveSheetChanging, formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._handleFormulatextboxAcrossSheetBeforeTabChange);
            self._workbook._unbind(Core_1.Events.FormulatextboxActiveSheetChanged, formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._handleFormulatextboxAcrossSheetAfterTabChange);
            self._workbook._bind(Core_1.Events.FormulatextboxActiveSheetChanged, formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._handleFormulatextboxAcrossSheetAfterTabChange);
        }
        var text = self.text();
        self._tokens = self._parse(text);

        var editableHost = self._isEditableDIVElement(contentDiv);
        if (editableHost) {
            self._colorText(self._tokens);

            try {
                var selection = WINDOW.getSelection();
                selection.selectAllChildren(contentDiv);
                if (selection.rangeCount > 0) {
                    selection.collapseToEnd();
                }
            }
            catch (e) {

            }


            Core_1.GC$(self._host).data(TEXT_BEFORE, text);
        }
        Core_1.GC$(host).data(exports.CONST_FORMULATEXTBOX, self);
    }


    FormulaTextBox.prototype._beginRangeSelect = function (activeRangeText) {
        var self = this;
        self._startingEdit();
        self._startEdit();
        self._isSelectFocusIn = true;
        var editingElement = formulatextbox_acrosssheet_1._createEditorElement(self._workbook._host);
        var sheet = self._activeSheet();
        if (sheet) {
            sheet.suspendPaint();
            _attachFormulaTextBox(sheet, editingElement, true );
            var sheetFormulatextBox = sheet._formulaTextBox;
            sheetFormulatextBox._isSelectMode = true;
            sheetFormulatextBox._selectModeId = self._selectModeId;
            sheetFormulatextBox._isAbsoluteReference = self._isAbsoluteReference;
            sheetFormulatextBox._needSheetName = self._needSheetName;
            if (activeRangeText) {
                self.text(activeRangeText);
                self.caret(activeRangeText.length);
            }
            var text = self.text();
            var caret = self.caret();
            if (caret <= 0) {
                caret = text.length;
            }
            self.focus();
            self.caret(caret);
            self._appendingStart = 1;
            var lastRangeTextIndex = text.lastIndexOf(',', caret);
            if (lastRangeTextIndex !== -1) {
                self._appendingStart = lastRangeTextIndex + 1;
            }
            if (!text) {
                self.text('=');
                text = '=';
                self.caret(1);
                caret = 1;
            }
            if (text.indexOf('=') !== 0) {
                text = '=' + text;
                caret++;
            }
            sheetFormulatextBox.text(text);
            sheetFormulatextBox.caret(caret);
            sheetFormulatextBox._isAppending = self._isAppending;
            sheetFormulatextBox._appendingStart = self._appendingStart;
            sheet.resumePaint();
        }
    };

    FormulaTextBox.prototype.startSelectMode = function (formula) {
        var rangeText = formula;
        if (rangeText && rangeText.indexOf('=') !== 0) {
            rangeText = '=' + rangeText;
        }
        var self = this;
        self._isSelectMode = true;
        self._isSelectButtonPressed = true;

        Core_1.GC$(self._rangeSelectButton).css([BACKGROUND, BACKGROUND_REPEAT, 'background-color'], [self.rangeSelectOnImage, 'no-repeat', '#dee0e3']);
        self._beginRangeSelect(rangeText);
    };
    FormulaTextBox.prototype.endSelectMode = function () {
        this._isSelectButtonPressed = false;
        this._endRangeSelect();
        Core_1.GC$(this._rangeSelectButton).css([BACKGROUND, BACKGROUND_REPEAT, 'background-color'], [self.rangeSelectOffImage, 'no-repeat', 'unset']);
    };
    FormulaTextBox.prototype._endRangeSelect = function () {
        var sheet = this._activeSheet();
        if (sheet) {
            sheet._endEditImp(true, keyword_undefined, true);
            sheet.repaint();
        }
    };
    FormulaTextBox.prototype._setTableSelections = function (tableSelection) {
        this._tableSelections = [tableSelection];
    };
    FormulaTextBox.prototype._getTableSelections = function () {
        return this._tableSelections;
    };


    FormulaTextBox.prototype.destroy = function () {
        var self = this;
        if (self._isSelectButtonPressed) {
            self._endRangeSelect();
        }
        self._tableSelections = keyword_null;
        self._isAppending = false;
        self._appendingStart = -1;
        self._detachHost();
        self._detachWorkbook();
        Core_1.GC$(self._funcsPopup).remove();
        Core_1.GC$(self._funcHelpPopup).remove();
        Core_1.GC$(self._helpDiv).remove();
    };


    FormulaTextBox.prototype.bind = function (type, data, fn) {
        var host = this._host;
        if (host && type) {
            type = type.split(/\s+/).join(ns_formulatextbox + ' ');
            Core_1.GC$(host).bind(type + ns_formulatextbox, data, fn);
        }
    };


    FormulaTextBox.prototype.unbind = function (type, fn) {
        var host = this._host;
        if (host && type) {
            type = type.split(/\s+/).join(ns_formulatextbox + ' ');
            Core_1.GC$(host).unbind(type + ns_formulatextbox, fn);
        }
    };


    FormulaTextBox.prototype.unbindAll = function () {
        var host = this._host;
        if (host) {
            Core_1.GC$(host).unbind(ns_formulatextbox);
        }
    };


    FormulaTextBox.prototype.caret = function (value) {
        var self = this, host = self._host;
        if (!host) {
            return;
        }


        var hostFocused = (DOCUMENT.activeElement === host);
        var $host = Core_1.GC$(host);
        if (arguments.length === 0) {
            if (hostFocused) {
                return self._getCaret(host).end;
            }
            return $host.data(CARET_BEFORE);
        }
        if (value !== self.caret()) {
            if (hostFocused) {
                self._setCaret(host, value);
                $host.data(CARET_BEFORE, self._getCaret(host).end);
            }
            else {
                $host.data(CARET_BEFORE, value);
            }
            self._trigger(EVENT_CARETCHANGED, {});
        }
    };
    FormulaTextBox.prototype._getCaret = function (element) {
        var self = this;
        var start = -1, end = -1, selection, range;
        if (self._isInputElement(element)) {
            start = element.selectionStart;
            end = element.selectionEnd;
        }
        else if (self._isEditableDIVElement(element)) {
            selection = WINDOW.getSelection();
            if (selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
                var clonedRange = range.cloneRange();
                clonedRange.selectNodeContents(element);
                clonedRange.setEnd(range.endContainer, range.endOffset);
                end = clonedRange.toString().length;
                clonedRange = range.cloneRange();
                clonedRange.selectNodeContents(element);
                clonedRange.setEnd(range.startContainer, range.startOffset);
                start = clonedRange.toString().length;
                clonedRange.detach();
            }
        }
        return { start: start, end: end };
    };
    FormulaTextBox.prototype._setCaret = function (element, pos) {
        var self = this, selection, range;
        if (self._isInputElement(element)) {
            element.setSelectionRange(pos, pos);
        }
        else if (self._isEditableDIVElement(element)) {
            var caretNode = this._getColorNode(element, pos);
            if (caretNode) {
                selection = WINDOW.getSelection();
                range = DOCUMENT.createRange();


                var node = caretNode.node;
                if (node && node.childNodes.length === 1) {
                    range.setStart(node.firstChild, caretNode.offset);
                }
                else if (node.lastChild && node.lastChild.length) {
                    range.setStart(node.lastChild, node.lastChild.length);
                }
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                if (this._isSelectMode) {
                    element.parentElement.scrollTop = element.parentElement.scrollHeight;
                }
            }
        }
    };


    FormulaTextBox.prototype.text = function (value) {
        var self = this, host = self._host, activeSheet = self._activeSheet();
        if (!host || !activeSheet || activeSheet._disposed) {
            return '';
        }
        var input = self._isInputElement(host), editable = self._isEditableDIVElement(host);

        if (arguments.length === 0) {
            var txt = '';
            if (input) {
                txt = host.value;
            }
            else if (editable) {
                var grayFormulaElements = host.getElementsByClassName('gcsj-func-gray-formula');
                if (grayFormulaElements.length > 0) {
                    return '';
                }

                if (lessThanIE10) {
                    txt = Core_1._util._getEditableDivValue(host);
                }
                else {
                    txt = host.innerText.replace(/\u200b/mg, '');
                }
                txt = txt.replace(/\r\n?/g, '\n');

                if (txt.indexOf(NBSP_SPACE_LETTER) >= 0) {
                    txt = Core_1._util._replaceSpaceChar(txt, NBSP_SPACE_LETTER, ' ');
                }
            }
            return txt;
        }

        if (value === null || typeof (value) === 'undefined') {
            value = '';
        }
        if (value !== self.text()) {
            var filteredValue = self._processLineBreakerOfValue(value);
            if (filteredValue) {
                self._tokens = self._parse(filteredValue);
            }
            else {
                self._tokens = self._parse(value);
            }
            if (input) {
                host.value = value;
            }
            else if (editable) {
                var tokens = self._dealTokenTextWidthLineBreaker(self._tokens, value);
                self._colorText(tokens);
                self.caret(value.length);
            }
            var parameter = {};
            var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
            if (ftbAcrossSheet && ftbAcrossSheet._text) {
                parameter = {
                    sheet: ftbAcrossSheet._sheet,
                    editor: ftbAcrossSheet._dom && ftbAcrossSheet._dom.firstChild.firstChild,
                    canvasOffset: ftbAcrossSheet._canvasOffset
                };
            }
            self._trigger(EVENT_TEXTCHANGED, parameter);
        }
        if (self._formulaString) {
            self._showGrayFormula();
        }
    };
    FormulaTextBox.prototype._updateBeforeText = function () {
        var self = this;
        Core_1.GC$(self._host).data(TEXT_BEFORE, self.text());
    };


    FormulaTextBox.prototype.autoComplete = function (value) {
        if (arguments.length === 0) {
            return this._autoComplete;
        }

        this._autoComplete = value;
    };


    FormulaTextBox.prototype.showHelp = function (value) {
        if (arguments.length === 0) {
            return this._showHelp;
        }

        this._showHelp = value;
    };


    FormulaTextBox.prototype.add = function (functionDescription) {
        if (!functionDescription) {
            return;
        }
        if (Core_1.GC$.isArray(functionDescription)) {
            var count = functionDescription.length;
            for (var i = 0; i < count; i++) {
                this._add(functionDescription[i]);
            }
        }
        else {
            this._add(functionDescription);
        }
    };
    FormulaTextBox.prototype._add = function (func) {
        var addName = func && toUpperCase(getFunctionName(func.name));
        if (!addName) {
            return;
        }
        var funcs = this._funcs, count = funcs.length, index, fName;
        for (index = 0; index < count; index++) {
            fName = toUpperCase(funcs[index].name);
            if (fName === addName) {
                return;
            }
            else if (fName > addName) {
                break;
            }
        }
        funcs.splice(index, 0, func);
    };


    FormulaTextBox.prototype.remove = function (name) {
        if (!name) {
            return;
        }
        name = toUpperCase(name);
        var funcs = this._funcs, count = funcs.length;
        for (var i = 0; i < count; i++) {
            if (toUpperCase(funcs[i].name) === name) {
                funcs.splice(i, 1);
                break;
            }
        }
    };


    FormulaTextBox.prototype.workbook = function (value) {
        var self = this;

        if (arguments.length === 0) {
            return self._workbook;
        }
        if (value === keyword_null) {
            if (self._isSelectMode) {
                self._endRangeSelect();
            }
        }
        else {
            self._setWorkbook(value);

            self._attachSpread();
        }
    };
    FormulaTextBox.prototype._setWorkbook = function (workbook) {
        if (!workbook) {
            return;
        }
        var self = this;
        if (self._workbook) {
            self._detachWorkbook();
        }
        var host = self._host;
        if (host) {
            self._workbook = workbook;
        }
    };


    FormulaTextBox.prototype._getRanges = function (paramTokens) {
        var ranges = [];
        var tokens = paramTokens || this._tokens, tokenCount = (tokens && tokens.length), token, tokenText, tmpLength = 0, index = 0;
        if (tokenCount > 0) {
            for (var i = 0; i < tokenCount; i++) {
                token = tokens[i];
                tokenText = token.text;
                if (token.type === 11 ) {
                    ranges.push({
                        textOffset: tmpLength,
                        text: tokenText,
                        ranges: token.ranges,
                        index: index,
                        allowDrag: token.allowDrag
                    });
                    index++;
                }
                tmpLength += tokenText.length;
            }
        }
        var _pivotActiveRange = this._pivotActiveRange;
        if (!paramTokens && _pivotActiveRange) {
            ranges.push({
                ranges: [_pivotActiveRange],
                index: index,
                allowDrag: false,
                isPivotClickCell: true
            });
        }
        return ranges;
    };
    FormulaTextBox.prototype._getActiveRange = function () {
        var host = this._host, ranges = this._getRanges();
        if (host && ranges && ranges.length > 0) {
            var caretPosition = this.caret(), count = ranges.length, range = void 0, textOffset = void 0;
            for (var i = 0; i < count; i++) {
                range = ranges[i];
                textOffset = range.textOffset;
                if (textOffset < caretPosition && caretPosition <= textOffset + range.text.length) {
                    return range;
                }
                else if (textOffset >= caretPosition) {
                    break;
                }
            }
        }
        return keyword_null;
    };
    FormulaTextBox.prototype._isActiveRange = function (paramRange) {
        if (!paramRange) {
            return false;
        }
        var caretPosition = this.caret();
        var rangeString = paramRange.text, rangeStringOffset = paramRange.textOffset;
        return rangeStringOffset < caretPosition && caretPosition <= rangeStringOffset + rangeString.length;
    };
    FormulaTextBox.prototype._getRangeColor = function (index, customRanges) {
        var ranges = customRanges || this._getRanges(), count = ranges.length;
        if (index < 0 || count <= index) {
            return '';
        }
        var tmpRanges = [], range, colorIndex = 0;
        for (var i = 0; i < count; i++) {
            range = ranges[i];
            var duplicated = false, j = 0;
            for (; j < tmpRanges.length; j++) {
                if (range.text) {
                    if (tmpRanges[j].text.replace(/\s+/g, '').toUpperCase() === range.text.replace(/\s+/g, '').toUpperCase()) {
                        duplicated = true;
                        break;
                    }
                }
            }
            if (duplicated) {
                if (index === i) {
                    colorIndex = j;
                    break;
                }
            }
            else {
                tmpRanges.push(range);
                if (index === i) {
                    colorIndex = tmpRanges.length - 1;
                    break;
                }
            }
        }
        var colors = DEFAULT_RANGE_COLORS;
        return colors[colorIndex % colors.length];
    };
    FormulaTextBox.prototype._canAppendRange = function () {
        if (this._isAppending) {
            return true;
        }
        if (this._isSelectMode) {
            return true;
        }
        var activeToken = this._getToken(this.caret());
        if (activeToken) {
            var tokenType = activeToken.type, tokenText = activeToken.text;
            return (tokenType === 1 || tokenType === 8
                || (tokenType === 7 && tokenText !== '%') || tokenType === 5
                || tokenType === 9 || tokenType === 15 );
        }
        return false;
    };
    FormulaTextBox.prototype._isAppendingRange = function (paramRange) {
        if (!paramRange || !this._isAppending) {
            return false;
        }
        var appendingStart = this._appendingStart, appendingEnd = this.caret(), rangeStringOffset = paramRange.textOffset;
        return appendingStart <= rangeStringOffset && rangeStringOffset < appendingEnd;
    };
    FormulaTextBox.prototype._getAppendingRanges = function () {
        var ret = [];
        var ranges = this._getRanges(), count = ranges.length, range;
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                range = ranges[i];
                if (this._isAppendingRange(range)) {
                    ret.push(range);
                }
            }
        }
        return ret;
    };
    FormulaTextBox.prototype._appendRange = function (rangeString, replacing, clearPrevAppending, isText) {
        var self = this, host = self._host;
        if (!rangeString || !host) {
            return;
        }
        if (!self._isAppending) {
            if (!self._canAppendRange()) {
                return;
            }
            replacing = false;
            self._isAppending = true;
            self._appendingStart = self.caret();
            self._trigger(EVENT_APPENDSTARTED, {});
        }
        var appendingStart = self._appendingStart, text = self.text(), caretPosition = self.caret();
        if (!text) {
            text = '=';
            appendingStart = self._appendingStart = 1;
            caretPosition = 1;
        }
        var caretNewPosition = caretPosition;
        if (clearPrevAppending) {
            replacing = false;
            text = text.substr(0, appendingStart) + (caretPosition < 0 ? '' : text.substr(caretPosition));
            self._tokens = self._parse(text);
            caretPosition = appendingStart;
            caretNewPosition = caretPosition;
        }
        var activeToken = self._getToken(caretPosition);
        if (replacing) {
            var prevText = text.substr(0, caretPosition);
            prevText = prevText.substr(0, prevText.length - activeToken.text.length);
            if (prevText.length >= appendingStart) {
                activeToken.text = rangeString;
                caretNewPosition = prevText.length + rangeString.length;
            }
        }
        else {
            var tokens = self._tokens, activeTokenIndex = Common_1.Common._ArrayHelper._indexOf(tokens, activeToken);
            var isRangeSelectAppendRange = self._isSelectMode && tokens.length > 1 && (activeTokenIndex === tokens.length - 1) && activeToken.type === 11;
            if (isText) {
                if (caretPosition > appendingStart || isRangeSelectAppendRange) {
                    rangeString = text + this._listSeparator() + rangeString;
                }
                else {
                    rangeString = text.slice(0, caretPosition) + rangeString + text.slice(caretPosition);
                }
                self._tokens = self._parse(rangeString);
            }
            else {
                if (caretPosition > appendingStart || isRangeSelectAppendRange) {
                    tokens.splice(activeTokenIndex + 1, 0, {
                        text: this._listSeparator(),
                        type: 8
                    });
                    tokens.splice(activeTokenIndex + 2, 0, { text: rangeString, type: 11 });
                    rangeString = ',' + rangeString;
                }
                else {
                    tokens.splice(activeTokenIndex + 1, 0, { text: rangeString, type: 11 });
                }
            }
            caretNewPosition = caretPosition + rangeString.length;
        }
        self._updateHostValue();
        var parameter = {};
        var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if (ftbAcrossSheet && ftbAcrossSheet._text) {
            parameter = {
                sheet: ftbAcrossSheet._sheet,
                editor: ftbAcrossSheet._dom && ftbAcrossSheet._dom.firstChild.firstChild,
                canvasOffset: ftbAcrossSheet._canvasOffset
            };
        }
        self._trigger(EVENT_TEXTCHANGED, parameter);
        self.caret(caretNewPosition);
    };
    FormulaTextBox.prototype._stopAppending = function () {
        var self = this;
        if (self._isAppending) {
            self._isAppending = false;
            self._appendingStart = -1;
            self._trigger(EVENT_APPENDENDED, {});
        }
    };
    FormulaTextBox.prototype._startAppending = function () {
        this._isAppending = true;
        this._appendingStart = this.caret();
    };
    FormulaTextBox.prototype._appendingStartIndex = function (index) {
        if (index !== void 0) {
            this._appendingStart = index;
        }
        return this._appendingStart;
    };
    FormulaTextBox.prototype._repalceRange = function (rangeIndex, rangeString, moveCaretForAppending) {
        var self = this, host = self._host;
        if (!host || rangeIndex < 0 || !rangeString) {
            return;
        }
        var tmpText = '';
        var replaced = false;
        var tokens = self._tokens, tokenCount = (tokens && tokens.length), token, index = 0;
        for (var i = 0; i < tokenCount; i++) {
            token = tokens[i];
            if (token.type === 11 && index++ === rangeIndex) {
                tokens[i] = { text: rangeString, type: 11 };
                replaced = true;
                break;
            }
            tmpText += token.text;
        }
        if (replaced) {
            self._updateHostValue();
            self._trigger(EVENT_TEXTCHANGED, {});
            if (moveCaretForAppending) {
                self.caret(self.text().length);
            }
            else {
                self.caret(tmpText.length + rangeString.length);
            }
        }
    };

    FormulaTextBox.prototype._attachSpread = function () {
        var self = this;
        if (!self._workbook) {
            return;
        }
        var host = self._host;
        if (self._workbook && host) {
            host.setAttribute(CONST_GCUIELEMENT, 'gcAttachedFormulaTextBox');
            if (!self._isSelectMode) {
                self._workbook._attachedFormulaTextBox = self;
            }
            self._workbook._bind(Core_1.Events.FormulatextboxEditStarted, self, self._onSpreadEditStarted);
            self._workbook._bind(Core_1.Events.FormulatextboxEnterCell, self, self._onSpreadEnterCell);
            self._workbook._bind(Core_1.Events.FormulatextboxEditEnded, self, self._onSpreadEditEnded);
            self._workbook._bind(Core_1.Events.FormulatextboxActiveSheetChanged, self, self._onSpreadActiveSheetChanged);
            self._workbook._bind(Core_1.Events.FormulatextboxRangeChanged, self, self._onSpreadRangeChanged);
            self._workbook._bind(Core_1.Events.FormulaTextBoxTextChanged, self, self._onSpreadFormulaTextBoxTextChanged);
            self._workbook._bind(Core_1.Events.FormulaTextBoxCaretChanged, self, self._onSpreadFormulaTextBoxCaretChanged);
            self._workbook._bind(Core_1.Events.ValueChanged, self, self._onSpreadCellValueChanged);
            var sheet = Core_1._getActiveSheet(self._workbook);
            if (sheet && !self._isSelectMode) {
                self.text(self._getEditText(sheet, sheet._activeRowIndex, sheet._activeColIndex));
            }
            self._bind(EVENT_TEXTCHANGED, self, self._onFormulaTextBoxTextChanged);
            self._bind(EVENT_CARETCHANGED, self, self._onFormulaTextBoxCaretChanged);
        }
    };


    FormulaTextBox.prototype.refresh = function (ignoreEditing) {
        var workbook = this._workbook, self = this;
        if (workbook) {
            var sheet = Core_1._getActiveSheet(workbook);
            if (sheet && !self._isSelectMode) {
                self._isWorking = ignoreEditing ? true : self._isWorking;
                self.text(self._getEditText(sheet, sheet._activeRowIndex, sheet._activeColIndex));
                self._isWorking = false;
            }
        }
    };
    FormulaTextBox.prototype._detachWorkbook = function () {
        var self = this, workbook = self._workbook;
        if (!self._isInWorkbook && workbook) {
            if (!self._isSelectMode) {
                workbook._attachedFormulaTextBox = null;
                workbook._unbind(Core_1.Events.FormulatextboxEditStarted, self._onSpreadEditStarted);
                workbook._unbind(Core_1.Events.FormulatextboxEnterCell, self._onSpreadEnterCell);
                workbook._unbind(Core_1.Events.FormulatextboxEditEnded, self._onSpreadEditEnded);
                workbook._unbind(Core_1.Events.FormulatextboxActiveSheetChanged, self._onSpreadActiveSheetChanged);
                workbook._unbind(Core_1.Events.FormulatextboxRangeChanged, self._onSpreadRangeChanged);
                workbook._unbind(Core_1.Events.FormulaTextBoxTextChanged, self._onSpreadFormulaTextBoxTextChanged);
                workbook._unbind(Core_1.Events.FormulaTextBoxCaretChanged, self._onSpreadFormulaTextBoxCaretChanged);
                workbook._unbind(Core_1.Events.ValueChanged, self._onSpreadCellValueChanged);
                self._unbind(EVENT_TEXTCHANGED, self._onFormulaTextBoxTextChanged);
                self._unbind(EVENT_CARETCHANGED, self._onFormulaTextBoxCaretChanged);
            }
            self.text('');
        }
        self._workbook = null;
    };
    FormulaTextBox.prototype._startingEdit = function () {
        var self = this;
        if (self._isWorking) {
            return;
        }
        self._isWorking = true;
        var workbook = this._workbook;
        var sheet = (workbook && Core_1._getActiveSheet(workbook));
        if (sheet && !sheet.isEditing()) {
            if (!self._isSelectMode) {
                sheet._startEditImp(null, sheet._activeRowIndex, sheet._activeColIndex, null, null, false, null);
            }
            self._editStarting = true;
        }
        else {
            self._editStarting = false;
        }
        self._isWorking = false;

        if (!self._isFuncsShown) {
            self._openFuncHelp();
        }
    };
    FormulaTextBox.prototype._addGrayFormulaElement = function () {
        var self = this, host = self._host, grayFormulaElement = self._grayFormulaElement;
        host.insertBefore(grayFormulaElement, host.firstChild);


        grayFormulaElement.innerText = self._formulaString;
    };
    FormulaTextBox.prototype._setDisplayOfElement = function (element, shown) {
        if (element) {
            var isShown = this._needShowGrayFormula;
            if (isShown !== shown) {
                this._needShowGrayFormula = shown;
                element.style.display = !shown ? 'none' : '';
            }
        }
    };
    FormulaTextBox.prototype._showGrayFormula = function () {
        var self = this;
        var host = self._host, editable = self._isEditableDIVElement(host);
        if (editable) {
            var formulaElement = self._grayFormulaElement;
            if (!formulaElement) {
                formulaElement = self._grayFormulaElement = createElement('span');
                formulaElement.className = 'gcsj-func-gray-formula';
            }
            self._setDisplayOfElement(formulaElement, true);
            self._addGrayFormulaElement();
        }
        else {
            host.placeholder = self._formulaString;
        }
    };
    FormulaTextBox.prototype._hideGrayFormula = function () {
        var self = this;
        if (self._formulaString) {
            self._formulaString = '';
            var host = self._host, editable = self._isEditableDIVElement(host);
            if (editable) {
                self._setDisplayOfElement(self._grayFormulaElement, false);
            }
            else if (host) {
                host.placeholder = '';
            }
        }
    };
    FormulaTextBox.prototype._startEdit = function () {
        var self = this;
        var workbook = self._workbook;
        var sheet = (workbook && Core_1._getActiveSheet(workbook));
        if (!sheet) {
            return;
        }

        var fbx = sheet._formulaTextBox;
        if (self._editStarting && fbx) {
            var fbxText = fbx.text(), selfText = self.text();
            if (selfText !== fbxText) {
                var caret = self.caret();
                var formulaInfo = sheet.getFormulaInformation(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex());
                self.text(fbxText);
                if (formulaInfo.isArrayFormula) {
                    if (caret >= selfText.length) {
                        caret = caret - 1;
                    }
                    caret = Math_max(0, caret - 1);
                }
                self.caret(caret);
            }
        }
        if (self._editStarting && fbx || self._isSelectMode) {
            var oldStatus = sheet._editorStatus;
            if (oldStatus !== 2 ) {
                sheet._editorStatus = 2 ;
                sheet._raiseEditorStatusChanged(oldStatus, 2 );
            }
        }
    };
    FormulaTextBox.prototype._getEditText = function (sheet, row, col) {
        var text = '';
        if (sheet) {
            var parent_1 = sheet.parent, options = parent_1 && parent_1.options;
            var formulaInfo = sheet.getFormulaInformation(row, col);
            if (formulaInfo && formulaInfo.hasFormula) {
                text = '=' + formulaInfo.formulaWithCulture;
                if (formulaInfo.isDynamicArray) {
                    this._formulaString = text;
                    return '';
                }
                this._formulaString = '';
                if (formulaInfo.isArrayFormula) {
                    text = '{' + text + '}';
                }
            }
            else {
                var cellStyle = sheet.getActualStyle(row, col);
                var value = sheet.getValue(row, col);
                if ((typeof value === 'string' && cellStyle.quotePrefix) || (text.length > 0 && text[0] === '=' && options && options.allowUserEditFormula)) {
                    text = '\'' + value;
                }
                else {
                    text = Core_1._util._formatValue2Text(cellStyle, value, sheet) || '';
                }
            }
            this._hideGrayFormula();
        }
        return text;
    };
    FormulaTextBox.prototype._onSpreadActiveSheetChanged = function (e, eData) {
        var self = e.data;
        if (self._isWorking) {
            return;
        }
        var newSheet = eData.newSheet;
        if (self._isSelectMode) {
            return;
        }
        self._isWorking = true;
        self.close();
        if (eData) {
            var sheet = newSheet;
            self.text(self._getEditText(sheet, sheet._activeRowIndex, sheet._activeColIndex));
        }
        self._isWorking = false;
    };
    FormulaTextBox.prototype._onSpreadEditStarted = function (e) {
        var self = e.data;
        if (self._isWorking) {
            return;
        }
        var workbook = self._workbook;
        var sheet = (workbook && Core_1._getActiveSheet(workbook));
        var fbx = (sheet && sheet._formulaTextBox);
        if (!fbx) {
            return;
        }
        if (self._isSelectMode !== fbx._isSelectMode || self._selectModeId !== fbx._selectModeId) {
            return;
        }
        self._hideGrayFormula();
        self._isWorking = true;
        self.text(fbx.text());
        self._isWorking = false;
    };
    FormulaTextBox.prototype._onSpreadEnterCell = function (e, eData) {
        var self = e.data;
        if (self._isSelectMode) {
            return;
        }
        if (self._isWorking) {
            return;
        }
        self._isWorking = true;
        if (eData) {
            self.text(self._getEditText(eData.sheet, eData.row, eData.col));
        }
        self._isWorking = false;
    };
    FormulaTextBox.prototype._onSpreadRangeChanged = function (e, eData) {
        var self = e.data;
        if (self._isWorking || self._isSelectMode) {
            return;
        }
        self._isWorking = true;
        if (eData) {
            var sheet = eData.sheet, row = eData.row, col = eData.col, rowCount = eData.rowCount, colCount = eData.colCount;
            if (new Core_1.Range(row, col, rowCount, colCount).contains(sheet._activeRowIndex, sheet._activeColIndex)) {
                self.text(self._getEditText(sheet, sheet._activeRowIndex, sheet._activeColIndex));
            }
        }
        self._isWorking = false;
    };
    FormulaTextBox.prototype._onSpreadEditEnded = function (e, eData) {
        var self = e.data;
        if (self._isSelectMode && self._isSelectButtonPressed && self._isSelectFocusIn) {
            eData.ignore = true;
            return;
        }
        if (self._isWorking) {
            return;
        }
        self._isWorking = true;
        self.close();
        if (eData && eData.sheet._formulaTextBox && !eData.sheet._formulaTextBox._isSelectMode && !self._isSelectMode) {
            self.text(self._getEditText(eData.sheet, eData.row, eData.col));
        }
        self._isWorking = false;
    };
    FormulaTextBox.prototype._onSpreadCellValueChanged = function (e, eData) {
        var sheet = eData.sheet;

        var ftb = sheet && sheet.parent && sheet.parent._attachedFormulaTextBox;
        if (ftb && ftb._activeRow() === eData.row && ftb._activeCol() === eData.col && ftb._activeSheet() === sheet) {
            if (e.data instanceof FormulaTextBox) {
                eData.text = sheet.getText(eData.row, eData.col);
                e.data._onSpreadFormulaTextBoxTextChanged(e, eData);
            }
        }
    };
    FormulaTextBox.prototype._onSpreadFormulaTextBoxTextChanged = function (e, eData) {
        var self = e.data;
        if (self._isWorking) {
            return;
        }
        if (eData.sheet._formulaTextBox &&
            (self._isSelectMode !== eData.sheet._formulaTextBox._isSelectMode ||
                self._selectModeId !== eData.sheet._formulaTextBox._selectModeId)) {
            return;
        }
        self._isWorking = true;
        if (eData) {
            var caret = self.caret();
            self.text(eData.text);
            self.caret(caret);
        }
        self._isWorking = false;
    };
    FormulaTextBox.prototype._onSpreadFormulaTextBoxCaretChanged = function (e, eData) {
        var self = e.data;
        if (self._isWorking) {
            return;
        }
        if (eData.sheet._formulaTextBox &&
            (self._isSelectMode !== eData.sheet._formulaTextBox._isSelectMode ||
                self._selectModeId !== eData.sheet._formulaTextBox._selectModeId)) {
            return;
        }
        self._isWorking = true;
        if (eData) {
            self.caret(eData.caret);
        }
        self._isWorking = false;
    };
    FormulaTextBox.prototype._onFormulaTextBoxTextChanged = function (e) {
        var self = e.data;
        if (self._isWorking) {
            return;
        }
        var workbook = self._workbook, sheet = (workbook && Core_1._getActiveSheet(workbook));
        if (!sheet) {
            return;
        }
        if (!sheet.isEditing()) {
            self._startingEdit();
            self.focus();
        }
        self._isWorking = true;
        var rowIndex = sheet._activeRowIndex, columnIndex = sheet._activeColIndex;
        var fbx = sheet._formulaTextBox, cellType = sheet.getCellType(rowIndex, columnIndex);
        if (fbx) {
            if (self._isSelectMode !== fbx._isSelectMode || self._selectModeId !== fbx._selectModeId) {
                return;
            }
            var caret = fbx.caret();
            if (self._isSelectMode && !/^=/.test(self.text())) {
                // _isSelectMode模式下默认前面加等号,不然公式没法提示
                self.text('=');
            } else {
                fbx.text(self.text());
            }
            fbx.caret(caret);
        }
        else {
            var context = {
                sheet: sheet,
                row: rowIndex,
                col: columnIndex,
                sheetArea: 3
            };
            cellType.setEditorValue(sheet._editor, self.text(), context);
        }
        self._isWorking = false;
    };
    FormulaTextBox.prototype._onFormulaTextBoxCaretChanged = function (e) {
        var self = e.data;
        if (self._isWorking) {
            return;
        }
        var workbook = self._workbook, sheet = (workbook && Core_1._getActiveSheet(workbook));
        if (!sheet || !sheet.isEditing()) {
            return;
        }
        var fbx = sheet._formulaTextBox;
        if (fbx && (self._isSelectMode !== fbx._isSelectMode || self._selectModeId !== fbx._selectModeId)) {
            return;
        }
        self._isWorking = true;
        if (fbx) {
            fbx.caret(self.caret());
            self._openFuncHelp();
        }
        self._isWorking = false;
    };


    FormulaTextBox.prototype._init = function (parentElement) {
        var self = this;
        self._isImeInputting = false;
        self._isInputKey = false;
        self._isAppending = false;
        self._appendingStart = -1;
        self._funcs = [];
        self._autoComplete = true;
        self._showHelp = true;
        self._autoClose = true;
        var funcsPopup = createElement('div');
        funcsPopup.className = 'gcsj-func-ac-popup';
        funcsPopup.style.display = 'none';
        funcsPopup.setAttribute(CONST_GCUIELEMENT, 'gcFuncACPopup');
        parentElement.insertBefore(funcsPopup, keyword_null);
        self._funcsPopup = funcsPopup;
        self._isFuncsShown = false;
        var funcHelpPopup = createElement('div');
        funcHelpPopup.className = 'gcsj-func-help-popup';
        funcHelpPopup.style.display = 'none';
        funcHelpPopup.setAttribute(CONST_GCUIELEMENT, 'gcFuncHelpPopup');
        parentElement.insertBefore(funcHelpPopup, keyword_null);
        self._funcHelpPopup = funcHelpPopup;
        self._isFuncHelpShown = false;
        Core_1.GC$(funcsPopup).bind('mouseover', function () {
            self._autoClose = false;
        }).bind('mouseout', function () {
            self._autoClose = true;
        });
        Core_1.GC$(funcHelpPopup).bind('mouseover', function () {
            self._autoClose = false;
        }).bind('mouseout', function () {
            self._autoClose = true;
        });
        Core_1.GC$(funcsPopup).bind('scroll', function () {
            if (self._funcsScrollingTimer) {
                clearTimeout(self._funcsScrollingTimer);
            }
            self._funcsScrollingTimer = WINDOW.setTimeout(function () {
                if (self._host) {
                    self._host.focus();
                }
            }, 100);
        });
        var helpDiv = createElement('div');
        helpDiv.style.display = 'none';
        helpDiv.setAttribute(CONST_GCUIELEMENT, 'gcFuncHelpDiv');
        parentElement.insertBefore(helpDiv, keyword_null);
        self._helpDiv = helpDiv;
        self._workbook = null;
        self._isWorking = false;
        self._editStarting = false;
        self._isInWorkbook = false;
    };
    FormulaTextBox.prototype._attachHost = function (host) {
        if (!host) {
            return;
        }
        var self = this, editable = self._isEditableDIVElement(host);

        if (!self._isInputElement(host) && !editable) {
            return;
        }
        var $host = Core_1.GC$(host);
        if (self._host) {
            self._detachHost();
        }
        self._host = host;

        if (browser && (browser.msie || browser.chrome)) {
            if (editable || lessThanIE10 || browser.chrome) {
                self._bind('focus', function () {
                    $host.data(TEXT_BEFORE, self.text());
                });
                self._bind('click', function () {
                    $host.focus();
                });
                'input keydown keyup cut paste'.split(' ').forEach(function (eventName) {
                    self._bind(eventName, function (e) {
                        var keyCode = e.keyCode;
                        if ((keyCode === 8 || (keyCode >= 33 && keyCode <= 40)) && self.text() === ZERO_WIDTH_CHAR) {
                            cancelDefault(e);
                            return;
                        }
                        self._checkInput();
                    });
                });
            }
            else {
                self._bind(CONST_INPUT, function () {
                    self._onInput();
                });
            }
        }
        else {
            self._bind(CONST_INPUT, function () {
                if (editable) {
                    var lastChild = self._host.lastChild;
                    if (browser.chrome && lastChild && lastChild.tagName === 'BR') {
                        self._host.removeChild(lastChild);
                    }
                }
                self._onInput();
            });
        }

        self._bind('keydown', function (e) {
            var ctrlKey = e.ctrlKey, shiftKey = e.shiftKey, altKey = e.altKey, metaKey = e.metaKey, modifyKey = ctrlKey || shiftKey || altKey || metaKey, keyCode = e.keyCode;

            if (!modifyKey && self._isFuncsShown) {
                if (keyCode === Keys.down) {
                    self._selectFunc(1);
                    cancelDefault(e);
                }
                else if (keyCode === Keys.up) {
                    self._selectFunc(-1);
                    cancelDefault(e);
                }
                else if (keyCode === Keys.tab) {
                    self._completeFunc();
                    cancelDefault(e);
                }
            }
            if (keyCode === Keys.esc) {
                self.close();
            }
            self._checkCaret(e);
            var sheet = Core_1._getActiveSheet(self._workbook);
            var isValidInputing = sheet && sheet._eventHandler._allowEnterEditing(e);
            if (self._isSelectMode && isValidInputing) {
                var fbx = sheet._formulaTextBox;
                if (fbx && fbx._isAppending) {
                    fbx._stopAppending();
                }
            }
            if (editable) {
                if (isValidInputing) {
                    if (keyCode === 8 ) {
                        isFbxElement(e) && Core_1._EditorDomHelper.processBackspaceAndLeftArrowKeyEvent(e, true);
                    }
                    else if (keyCode === 46 ) {
                        isFbxElement(e) && Core_1._EditorDomHelper.processDeleteAndRightArrowKeyEvent(e, true);
                    }
                    self._updateUndoStack();
                }
                else if (keyCode === 13 && (ctrlKey || altKey)) {
                    isFbxElement(e) && processFbxBreakLine();
                    self._updateUndoStack(true);
                }
                else if (keyCode === 37 ) {
                    isFbxElement(e) && Core_1._EditorDomHelper.processBackspaceAndLeftArrowKeyEvent(e, false);
                }
                else if (keyCode === 39 ) {
                    isFbxElement(e) && Core_1._EditorDomHelper.processDeleteAndRightArrowKeyEvent(e, false);
                }
                if ((keyCode === 8 || (keyCode >= 33 && keyCode <= 40)) && self.text() === ZERO_WIDTH_CHAR) {
                    cancelDefault(e);
                }
                else if (ctrlKey && (keyCode === 90 || keyCode === 89 )) {
                    cancelDefault(e);
                }
            }

            var editorValue = self.text();
            if (Core_1._util._isMacOS() && editable && metaKey) {
                var newEditorValue = void 0;
                if (keyCode === 90 ) {
                    if (shiftKey) {
                        newEditorValue = self._redoStack.pop();
                        if (newEditorValue) {
                            self.text(newEditorValue);
                            self._undoStack.push(editorValue);
                        }
                    }
                    else {
                        newEditorValue = self._undoStack.pop() || '';
                        self.text(newEditorValue);
                        self._redoStack.push(editorValue);
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        });

        self._bind('keyup', function (e) {
            self._checkCaret(e);
            var editorValue = self.text();
            if (editable) {
                var newEditorValue = void 0;
                var keyCode = e.keyCode , ctrlKey = e.ctrlKey;
                if (ctrlKey && keyCode === 90 ) {
                    newEditorValue = self._undoStack.pop() || '';
                    self.text(newEditorValue);
                    self._redoStack.push(editorValue);
                }
                else if (ctrlKey && keyCode === 89 ) {
                    newEditorValue = self._redoStack.pop();
                    if (newEditorValue) {
                        self.text(newEditorValue);
                        self._undoStack.push(editorValue);
                    }
                }
            }
        });

        self._bind('focus', function (e) {
            var isFirefox = browser && browser.mozilla;
            if (isFirefox && !self._host.innerText) {
                self._host.innerText = '';
            }
            self._checkCaret(e);
            if (self._workbook && self._isSelectMode && (self._isSelectButtonPressed || self.noNeedSelectButton)) {
                self._isSelectFocusIn = true;
                self._beginRangeSelect();
            }
        });

        self._bind('blur', function () {
            if (self._autoClose) {
                self.close();
            }
            if (self._isSelectMode) {
                self._endRangeSelect();
                self._isSelectFocusIn = false;
            }
        });

        self._bind('mousedown', function () {
            self._isSelectFocusIn = true;
            if (self._needShowGrayFormula) {
                self._hideGrayFormula();
                self._needSelectionFocus = true;
            }
            self._startingEdit();
        });

        self._bind('mouseup', function () {
            if (self._needSelectionFocus) {
                self._needSelectionFocus = false;
                var formulaTextBoxHost = self._host, selection = WINDOW.getSelection();
                if (formulaTextBoxHost !== selection.anchorNode) {
                    selection.selectAllChildren(formulaTextBoxHost);
                }
            }
            self._startEdit();
        });

        self._bind('click', function (e) {
            if (self._isAppending) {
                self._stopAppending();
            }
            var workbook = self._workbook, sheet = (workbook && Core_1._getActiveSheet(workbook));
            var fbx = (sheet && sheet._formulaTextBox);
            if (fbx && fbx._isAppending && !fbx._isSelectMode) {
                fbx._stopAppending();
            }
            self._checkCaret(e);
        });

        self._bind('compositionstart', function () {
            self._isImeInputting = true;
        });
        self._bind('compositionend', function () {
            self._isImeInputting = false;
            if (browser.edge || browser.chrome || browser.msie) {
                self._checkInput();
            }
        });
    };
    FormulaTextBox.prototype._detachHost = function () {
        var self = this, host = self._host;
        if (host) {
            var $host = Core_1.GC$(host);
            $host.removeData(TEXT_BEFORE);
            $host.removeData(CARET_BEFORE);
            $host.removeAttr(CONST_GCUIELEMENT);
            if ($host.data(exports.CONST_FORMULATEXTBOX)) {
                $host.data(exports.CONST_FORMULATEXTBOX, keyword_null);
            }
            self._unbindAll();
            self.unbindAll();
            if (self._isSelectMode) {
                Core_1.GC$(self._selectModeDom).empty();
                self._selectModeDom = keyword_null;
            }
            self._host = keyword_null;
        }
    };
    FormulaTextBox.prototype._checkInput = function () {
        var self = this, $host = Core_1.GC$(self._host), text = self.text();
        if ($host.data(TEXT_BEFORE) !== text) {
            if (!self._isImeInputting) {
                $host.data(TEXT_BEFORE, text);
            }
            self._onInput();
        }
    };
    FormulaTextBox.prototype._checkCaret = function (e) {
        if (browser && browser.msie) {
            var checkCaretObj = function (self, event) {
                return function () {
                    self._checkCaretCore(self, event);
                };
            };
            setTimeout(checkCaretObj(this, e), 10);
        }
        else {
            this._checkCaretCore(this, e);
        }
    };
    FormulaTextBox.prototype._checkCaretCore = function (self, e) {
        var keyCode = e.keyCode;
        var navKey = (keyCode === Keys.left || keyCode === Keys.right || keyCode === Keys.home || keyCode === Keys.end || keyCode === Keys.pdn || keyCode === Keys.pup || keyCode === Keys.tab || keyCode === Keys.enter);
        if (!self._autoComplete) {
            navKey = (navKey || keyCode === Keys.up || keyCode === Keys.down);
        }
        var mouseClick = (typeof (e.button) !== 'undefined');
        if (navKey || mouseClick) {
            var host = self._host, $host = Core_1.GC$(host), caretPosition = self._getCaret(host);

            if (caretPosition.start !== caretPosition.end) {
                return;
            }
            var caret = caretPosition.end;
            if ($host.data(CARET_BEFORE) !== caret) {
                $host.data(CARET_BEFORE, caret);
                self._trigger(EVENT_CARETCHANGED, {});
                self._openFuncHelp();
            }
        }
    };
    FormulaTextBox.prototype._activeRow = function () {
        var worksheet = this._activeSheet();
        if (worksheet) {
            return worksheet._activeRowIndex;
        }
        return keyword_undefined;
    };
    FormulaTextBox.prototype._activeCol = function () {
        var worksheet = this._activeSheet();
        if (worksheet) {
            return worksheet._activeColIndex;
        }
        return keyword_undefined;
    };
    FormulaTextBox.prototype._activeSheet = function () {
        if (this._workbook) {
            return Core_1._getActiveSheet(this._workbook);
        }
    };

    FormulaTextBox.prototype.parseInternal = function (text, activeSheet, activeRow, activeCol) {
        var self = this;
        var newToken = [];
        if (!text || text[0] !== '=' || getCharCount(text, '"') % 2 === 1) {
            newToken.push({ text: text, type: 17 });
            return newToken;
        }
        var parser = new CalcNS.Parser();
        var tokens2 = SheetsCalcNS._parseReferenceExpressionInfos(parser, text, activeSheet, activeRow, activeCol, true);
        newToken = self._convertToTextboxToken(tokens2);
        return newToken;
    };

    FormulaTextBox.prototype._parse = function (text) {
        return this.parseInternal(text, this._activeSheet(), this._activeRow(), this._activeCol());
    };
    FormulaTextBox.prototype._onInput = function () {
        var self = this, editorText = self.text();

        if (editorText !== '\n' && editorText.indexOf('\n') >= 0) {
            self._trigger(EVENT_TEXTCHANGED, { type: CONST_INPUT });
            return;
        }
        var host = self._host, $host = Core_1.GC$(host), caretPosition;
        self._isInputKey = true;
        self._tokens = self._parse(editorText);
        if (self._isEditableDIVElement(host)) {
            if (!self._isImeInputting) {
                if (editorText === '\n' || editorText === ZERO_WIDTH_CHAR) {
                    if ($host.attr('data-editorSource') === 'TextCell') {
                        self._colorText(self._tokens);
                    }
                    else {
                        $host.empty();
                    }
                    self._trigger(EVENT_TEXTCHANGED, { type: CONST_INPUT });
                }
                else {
                    caretPosition = self.caret();
                    self._colorText(self._tokens);
                    self._trigger(EVENT_TEXTCHANGED, { type: CONST_INPUT });
                    self.caret(caretPosition);
                }
            }
        }
        else {
            self._trigger(EVENT_TEXTCHANGED, { type: CONST_INPUT });
        }
        caretPosition = self.caret();
        if ($host.data(CARET_BEFORE) !== caretPosition) {
            $host.data(CARET_BEFORE, caretPosition);
            self._trigger(EVENT_CARETCHANGED, {});
        }
        self._openFuncs();
        if (!self._isFuncsShown) {
            self._openFuncHelp();
        }
    };
    FormulaTextBox.prototype._CR = function () {
        return Common_1.Common.CultureManager._getCultureInfo().NumberFormat;
    };
    FormulaTextBox.prototype._arrayGroupSeperator = function () {
        var CR = this._CR();
        return CR && CR.arrayGroupSeperator || ';';
    };
    FormulaTextBox.prototype._arrayListSeparator = function () {
        var CR = this._CR();
        return CR && CR.arrayListSeparator || ',';
    };
    FormulaTextBox.prototype._listSeparator = function () {
        var CR = this._CR();
        return CR && CR.listSeparator || ',';
    };
    FormulaTextBox.prototype._numberDecimalSeparator = function () {
        var CR = this._CR();
        return CR && CR.numberDecimalSeparator || '.';
    };

    FormulaTextBox.prototype._convertToTextboxToken = function (tokenList) {
        var newTokens = [];
        var bracketStack = [];
        var arrayGroupSeperator = this._arrayGroupSeperator(),

        arrayListSeparator = this._arrayListSeparator();
        var isInArray = false;
        for (var i = 0; i < tokenList.length; i++) {
            if (i > 0 && i < tokenList.length - 1 && tokenList[i - 1].text === ';' && tokenList[i].text === ',' && tokenList[i + 1].text === 'ARRAYROW') {
                continue;
            }
            var calcToken = tokenList[i];
            var tokenType = this._getCalcType(calcToken, bracketStack);
            var text = calcToken.text;
            if (tokenType === 2 ) {
                newTokens.push({ text: text, type: tokenType });
            }
            else if (isInArray && tokenType === 8 && text === ',') {
                newTokens.push({ text: arrayListSeparator, type: 9 });
            }
            else if (isInArray && tokenType === 8 && text === ';') {
                newTokens.push({ text: arrayGroupSeperator, type: 10 });
            }
            else if (tokenType === 8 ) {
                newTokens.push({ text: text, type: tokenType });
            }
            else if (tokenType === 3 ) {
                if (text === 'ARRAY') {
                    isInArray = true;
                }
                newTokens.push({ text: '{', type: 3 });
            }
            else if (tokenType === 4 ) {
                if (text === 'ARRAY') {
                    isInArray = false;
                    newTokens.push({ text: '}', type: 4 });
                }
                else {
                    newTokens.push({ text: text, type: 4 });
                }
            }
            else if (tokenType === 6 ) {
                newTokens.push({ text: ')', type: tokenType });
            }
            else if (tokenType === 13 ) {
                newTokens.push({
                    text: Common_1.Common._NumberHelper._replaceNormalToCultureSymbol(text),
                    type: tokenType,
                    ranges: calcToken.ranges,
                    allowDrag: calcToken.canDrag
                });
            }
            else if (tokenType !== null) {
                newTokens.push({
                    text: text,
                    type: tokenType,
                    ranges: calcToken.ranges,
                    allowDrag: calcToken.canDrag
                });
            }
        }
        return newTokens;
    };
    FormulaTextBox.prototype._getCalcType = function (token, bracketStack) {
        var type = token.type;
        var subType = token.subType;
        var text = token.text;
        var value = token.value;
        if (type === 1 ) {
            if (subType === 1 ) {
                if (text === 'ARRAY' || text === 'ARRAYROW') {
                    bracketStack.push(3 );
                    return 3 ;
                }
                bracketStack.push(5 );
                if (value === '@' || value.trim() === '(') {
                    return 5 ;
                }
                return 2 ;
            }
            if (subType === 2 ) {
                if (value.trim() === ')') {
                    return 6 ;
                }
                if (bracketStack.length > 0) {
                    var lastBracket = bracketStack[bracketStack.length - 1];
                    if (lastBracket === 3 ) {
                        bracketStack.pop();
                        return 4 ;
                    }
                    else if (lastBracket === 5 ) {
                        bracketStack.pop();
                        return 6 ;
                    }
                }
            }
            if (value.trim() === '=') {
                return 1 ;
            }
        }
        else if (type === 3 ) {
            if (subType === 0 ) {
                return 8 ;
            }
        }
        else if ((type === 5 ) || (type === 6 ) || (type === 4 )) {
            return 7 ;
        }
        else if (type === 0 ) {
            if (subType === 7 || subType === 0 ) {
                return 11 ;
            }
            else if (subType === 5 ) {
                return 12 ;
            }
            else if (subType === 4 ) {
                return 13 ;
            }
            else if (subType === 3 ) {
                return 14 ;
            }
            else if (subType === 6 ) {
                return 16 ;
            }
            return 14 ;
        }
        else if (type === 7 ) {
            return 15 ;
        }
        else if (type === 8 ) {
            return 17 ;
        }
        return 17 ;
    };
    FormulaTextBox.prototype._updateHostValue = function () {
        var self = this, host = self._host, tokens = self._tokens;
        var text = '', tokenCount = (tokens && tokens.length);
        for (var i = 0; i < tokenCount; i++) {
            text += tokens[i].text;
        }
        if (self._isInputElement(host)) {
            host.value = text;
        }
        else if (self._isEditableDIVElement(host)) {
            self._colorText(tokens);
        }
    };
    FormulaTextBox.prototype._isInputElement = function (element) {
        var tagName = (element && element.tagName);
        return (tagName === 'TEXTAREA' || tagName === 'INPUT');
    };
    FormulaTextBox.prototype._isEditableDIVElement = function (element) {
        return (element && element.tagName === 'DIV' && element.contentEditable === 'true');
    };
    FormulaTextBox.prototype._isGCEditingInputElement = function (element) {
        return Core_1.GC$(element).attr(CONST_GCUIELEMENT) === 'gcEditingInput';
    };
    FormulaTextBox.prototype._isFormula = function (text) {
        return text && text[0] === '=';
    };
    FormulaTextBox.prototype._bind = function (type, data, fn) {
        var host = this._host;
        if (host && type) {
            type = type.split(/\s+/).join(ns_formulatextbox_internal + ' ');
            Core_1.GC$(host).bind(type + ns_formulatextbox_internal, data, fn);
        }
    };
    FormulaTextBox.prototype._unbind = function (type, fn) {
        var host = this._host;
        if (host && type) {
            type = type.split(/\s+/).join(ns_formulatextbox_internal + ' ');
            Core_1.GC$(host).unbind(type + ns_formulatextbox_internal, fn);
        }
    };
    FormulaTextBox.prototype._unbindAll = function () {
        var host = this._host;
        if (host) {
            Core_1.GC$(host).unbind(ns_formulatextbox_internal);
        }
    };
    FormulaTextBox.prototype._trigger = function (type, data) {
        var host = this._host;
        if (host) {
            Core_1.GC$(host).trigger(type, data);
        }
    };
    FormulaTextBox.prototype._getToken = function (caretPosition) {
        if (caretPosition <= 0) {
            return keyword_null;
        }
        var tokens = this._tokens, tokenCount = (tokens && tokens.length);
        if (tokenCount > 0) {
            var textIndex = 0, token = void 0;
            for (var i = 0; i < tokenCount; i++) {
                token = tokens[i];
                textIndex += token.text.length;
                if (textIndex >= caretPosition) {
                    return token;
                }
            }
        }
        return keyword_null;
    };
    FormulaTextBox.prototype._getFuncs = function () {
        var workbook = this._workbook;
        if (workbook) {
            var sheet = Core_1._getActiveSheet(workbook);
            if (sheet) {
                var allowDynamicArray = sheet.getCalcService().allowDynamicArray;
                var fbx = sheet._formulaTextBox;
                if (fbx) {
                    var all = [].concat(fbx._funcs);
                    for (var i = all.length - 1; i >= 0; i--) {
                        if (!allowDynamicArray && (all[i] && isDynamicArrayFunction(all[i].name))) {
                            all.splice(i, 1);
                            continue;
                        }
                        all[i].isFunc = true;
                    }
                    return all.concat(this._getCustomNames(workbook, sheet)).concat(this._getTableNames(workbook.sheets)).concat(this._getTableSheetNames(workbook));
                }
            }
        }
        return this._funcs;
    };
    FormulaTextBox.prototype._getCustomNames = function (workbook, sheet) {
        var names = [];
        var sheetNames = sheet.getCustomNames();
        if (sheetNames) {
            Core_1.GC$.each(sheetNames, function (i, sheetName) {
                names.push({
                    name: sheetName._name,
                    description: sheetName._comment
                });
            });
        }
        var workbookCustomNames = workbook.getCustomNames();
        if (workbookCustomNames) {
            Core_1.GC$.each(workbookCustomNames, function (i, bookName) {
                names.push({
                    name: bookName._name,
                    description: bookName._comment
                });
            });
        }
        return names;
    };
    FormulaTextBox.prototype._getTableNames = function (sheets) {
        var names = [];
        sheets.forEach(function (sheet) {
            var tableManager = sheet.tables;
            if (tableManager) {
                var tables = tableManager.all();
                if (tables) {
                    for (var i = 0; i < tables.length; i++) {
                        names.push({
                            name: tables[i].name(),
                            description: CalcNS.sR().Fbx_TableName_Description + tables[i].name()
                        });
                    }
                }
            }
        });
        return names;
    };
    FormulaTextBox.prototype._getTableSheetNames = function (spread) {
        var names = [];
        var tables = spread._sheetTabs;
        for (var i = 0; i < tables.length; i++) {
            names.push({
                name: tables[i].name(),
                description: CalcNS.sR().Fbx_TableSheetName_Description + tables[i].name()
            });
        }
        return names;
    };
    FormulaTextBox.prototype._getFuncsStartWith = function (startName, funcs) {
        startName = toUpperCase(startName);
        if (StringHelper._contains(startName, '[')) {
            startName = startName.substr(startName.lastIndexOf('[') + 1);
            startName = StringHelper._replace(startName, '@', '');
        }

        var results = [];
        var count = (funcs && funcs.length), f;
        for (var i = 0; i < count; i++) {
            f = funcs[i];
            if (toUpperCase(getFunctionName(f.name)).indexOf(startName) === 0) {
                results.push(f);
            }
        }
        return results;
    };
    FormulaTextBox.prototype._getTextInTokenBeforeCaret = function () {
        var caretPosition = this.caret();
        if (caretPosition <= 0) {
            return '';
        }
        var tokens = this._tokens, tokenCount = (tokens && tokens.length);
        if (tokenCount > 0) {
            var textIndex = 0, token = void 0;
            for (var i = 0; i < tokenCount; i++) {
                token = tokens[i];
                if (textIndex + token.text.length >= caretPosition) {
                    return token.text.substring(0, caretPosition - textIndex);
                }
                textIndex += token.text.length;
            }
        }
        return '';
    };
    FormulaTextBox.prototype._getActiveFuncInfo = function () {
        var caretPosition = this.caret(), tokens = this._tokens, tokenCount = (tokens && tokens.length);
        var tmpTokens = [], textIndex = 0, token;
        for (var i = 0; i < tokenCount; i++) {
            token = tokens[i];
            tmpTokens.push(token);
            if (token.type === 6 ) {
                var parenMatchCount = 0;
                while (tmpTokens.length > 0) {
                    var popToken = tmpTokens.pop();
                    if (popToken.type === 6 ) {
                        parenMatchCount++;
                    }
                    if (popToken.type === 5 ) {
                        parenMatchCount--;
                    }
                    if (parenMatchCount === 0) {
                        if (tmpTokens.length > 0) {
                            popToken = tmpTokens[tmpTokens.length - 1];
                            if (popToken && popToken.type === 2 ) {
                                tmpTokens.pop();
                            }
                        }
                        break;
                    }
                }
            }
            textIndex += token.text.length;
            if (textIndex >= caretPosition) {
                break;
            }
        }
        if (tmpTokens.length > 0) {
            var activeParamterIndex = 0;
            while (tmpTokens.length > 0) {
                token = tmpTokens.pop();
                if (token.type === 8 ) {
                    activeParamterIndex++;
                }
                else if (token.type === 2 ) {
                    var funcName = toUpperCase(token.text);
                    var funcs = this._getFuncs(), funcCount = (funcs && funcs.length), func = void 0;
                    for (var i = 0; i < funcCount; i++) {
                        func = funcs[i];
                        if (toUpperCase(getFunctionName(func.name)) === funcName) {
                            return { func: func, activeParamterIndex: activeParamterIndex, isFunc: func.isFunc };
                        }
                    }
                    break;
                }
            }
        }
        return keyword_null;
    };


    FormulaTextBox.prototype._openFuncs = function () {
        var self = this;
        var funcs = self._getFuncsForInput();
        var show = (self._autoComplete && self._isFormula(self.text()) && funcs && funcs.length > 0 && !self._isAppending && !self._isImeInputting);
        if (show) {
            self._closeFuncHelp();
            var funcsPopup = self._funcsPopup;
            if (funcs.length > 8) {
                funcsPopup.style.height = '204px';
                funcsPopup.style.overflowY = 'scroll';
            }
            else {
                funcsPopup.style.height = 'auto';
                funcsPopup.style.overflowY = '';
            }
            var popupContent = '';
            var count = funcs.length, func = void 0;
            for (var i = 0; i < count; i++) {
                func = funcs[i];
                popupContent += '<div class=\'gcsj-func-ac-row\'><div class=\'gcsj-func-ac-row-name\' isFunc=' + func.isFunc + '>' + getFunctionName(func.name) + '</div><div class=\'gcsj-func-ac-row-description\'>' + (func.description || '') + '</div></div>';
            }
            var $funcsPopup = Core_1.GC$(self._funcsPopup);
            $funcsPopup.html(popupContent).show();
            self._isFuncsShown = true;
            var $items_1 = $funcsPopup.find('.gcsj-func-ac-row');
            if ($items_1.length > 0) {
                var activeClassName_1 = 'gcsj-ac-row-active';
                Core_1.GC$($items_1[0]).addClass(activeClassName_1);
                $items_1.bind('mouseover', function () {
                    $items_1.removeClass(activeClassName_1);
                    Core_1.GC$(this).addClass(activeClassName_1);
                });
                $items_1.bind('click', function () {
                    self._completeFunc();
                });
            }
            self._position();
        }
        else {
            self._closeFuncs();
        }
    };

    FormulaTextBox.prototype._getFuncsForInput = function () {
        var self = this;
        var token = self._getToken(self.caret()), tokenText = (token && token.text), funcs = [];
        var tokenIndex = self._tokens.indexOf(token);
        if (token && token.type === 14 ) {
            return funcs;
        }
        var tableColumnNames = self._getTableColumnNames(tokenIndex);
        if (tableColumnNames.length > 0) {
            var _tableFunctionsResource = JSON.parse(JSON.stringify(CalcNS.sR()._tableFunctionsResource));
            var tableFunctionsMapping = CalcNS.getMapping() && CalcNS.getMapping().tableFunctionsMapping;
            var tableFunctionsArray = [];

            for (var item in _tableFunctionsResource) {
                var _tableFunctionsAlias = tableFunctionsMapping && tableFunctionsMapping[_tableFunctionsResource[item].name];
                if (_tableFunctionsAlias) {
                    _tableFunctionsResource[item].name = _tableFunctionsAlias;
                }
                tableFunctionsArray.push(_tableFunctionsResource[item]);
            }
            funcs = funcs.concat(tableColumnNames).concat(tableFunctionsArray);
            if (StringHelper._endsWith(tokenText, '[') || StringHelper._endsWith(tokenText, '[@')) {
                return funcs;
            }
        }
        else {
            funcs = this._getFuncs();
        }

        tokenText = self._getTextInTokenBeforeCaret();
        var result = [];
        if (tokenText) {
            result = self._getFuncsStartWith(tokenText, funcs);
        }
        return result;
    };
    FormulaTextBox.prototype._getTableColumnNames = function (tokenIndex) {
        var columnNames = [];
        var tokens = this._tokens, tokenCount = (tokens && tokens.length);
        if (tokenIndex < 0 || tokenIndex >= tokens.length) {
            return columnNames;
        }
        var workbook = this._workbook;
        var sheet = (workbook && Core_1._getActiveSheet(workbook));
        var dealedTable = {};
        if (typeof tokenIndex === 'undefined' || tokenIndex === keyword_null) {
            tokenIndex = tokenCount;
        }
        if (sheet) {
            var token = tokens[tokenIndex];
            var tableManager = sheet.tables, table = tableManager && tableManager.findByName(StringHelper._leftBefore(token.text, '['));
            if (_isNullOrUndefined(table)) {
                table = workbook.getSheetTab(StringHelper._leftBefore(token.text, '['));
            }
            if (typeof table !== 'undefined' && table !== keyword_null && !dealedTable[table]) {
                dealedTable[table] = true;
                var index = 0;
                var tableName = '';
                while (tableName !== keyword_null) {
                    tableName = table.getColumnName(index);
                    index++;
                    if (tableName !== keyword_null) {
                        columnNames.push({ name: tableName, description: '' });
                    }
                }
                if (columnNames.length > 0) {
                    return columnNames;
                }
            }
        }
        return columnNames;
    };
    FormulaTextBox.prototype._closeFuncs = function () {
        Core_1.GC$(this._funcsPopup).hide();
        this._isFuncsShown = false;
    };
    FormulaTextBox.prototype._selectFunc = function (step) {
        var $items = Core_1.GC$(this._funcsPopup).find('.gcsj-func-ac-row'), count = $items.length;
        if (count === 0) {
            return;
        }
        var activeClassName = 'gcsj-ac-row-active';
        var newIndex = 0;
        if (step) {
            for (var i = 0; i < count; i++) {
                if (Core_1.GC$($items[i]).hasClass(activeClassName)) {
                    newIndex = i + step;
                    break;
                }
            }
        }
        var scrollTopTmp = Core_1.GC$(this._funcsPopup).scrollTop();
        $items.removeClass(activeClassName);
        var offsetHeight = 0;
        if (count > 0) {
            offsetHeight = $items[0].offsetHeight;
        }
        newIndex = Math_max(newIndex, 0);
        newIndex = Math_min(newIndex, count - 1);
        var element = $items[newIndex];
        Core_1.GC$(element).addClass(activeClassName);

        if (element.offsetTop + element.offsetHeight > Core_1.GC$(this._funcsPopup).scrollTop() + Core_1.GC$(this._funcsPopup).height()) {
            Core_1.GC$(this._funcsPopup).scrollTop(Core_1.GC$(this._funcsPopup).scrollTop() + offsetHeight);
        }
        else if (element.offsetTop < Core_1.GC$(this._funcsPopup).scrollTop()) {
            Core_1.GC$(this._funcsPopup).scrollTop(element.offsetTop);
        }
        else {
            Core_1.GC$(this._funcsPopup).scrollTop(scrollTopTmp);
        }
    };
    FormulaTextBox.prototype._completeFunc = function () {
        var self = this;
        var active = Core_1.GC$(self._funcsPopup).find('.gcsj-ac-row-active .gcsj-func-ac-row-name');
        var funcName = active.text();
        var isFunc = active.attr('isFunc') === 'true';
        if (!funcName) {
            return;
        }
        var caretPosition = self.caret(), tokens = self._tokens, tokenCount = (tokens && tokens.length);
        var tokenTextIndex = 0, tokenTextLength = 0, tokenIndex = 0, token = keyword_null;
        while (tokenIndex < tokenCount) {
            token = tokens[tokenIndex];
            tokenTextLength = token.text.length;
            if (tokenTextIndex + tokenTextLength >= caretPosition) {
                break;
            }
            tokenIndex++;
            tokenTextIndex += tokenTextLength;
        }
        var offset = caretPosition - tokenTextIndex;
        var curTokenText = token.text;
        var begin = 0, end = 0;
        if (StringHelper._contains(curTokenText, '[')) {
            begin = curTokenText.lastIndexOf('[', offset - 1);
            if (begin === -1) {
                begin = curTokenText.indexOf('[');
                if (begin === -1) {
                    token.text = funcName;
                }
                else {
                    token.text = funcName + curTokenText.substr(begin);
                }
                begin = 0;
            }
            else {
                begin++;
                if (curTokenText.charAt(begin) === '@') {
                    begin = begin + 1;
                }
                end = curTokenText.indexOf(']', offset);
                if (end === -1) {
                    end = curTokenText.length;
                }
                token.text = curTokenText.substring(0, begin) + funcName + curTokenText.substr(end);
            }
        }
        else {
            token.text = funcName;
            var tempStr = curTokenText.substr(offset);
            if (tempStr) {
                var tempTokens = self._parse('=' + tempStr);
                if (tempTokens.length > 1) {
                    tokens.splice(tokenIndex + 1, 0, tempTokens[1]);
                }
            }
        }
        if (isFunc) {
            token.type = 2 ;
        }
        else {
            token.type = 11 ;
        }


        var nextTokenIndex = tokenIndex + 1, nextToken = tokens[nextTokenIndex];
        if (isFunc && (!nextToken || nextToken.type !== 5 )) {
            tokens.splice(nextTokenIndex, 0, { text: '(', type: 5 });
        }
        self._closeFuncs();
        self._host.focus();
        self._updateHostValue();
        self.caret(tokenTextIndex + funcName.length + begin + (isFunc ? 1 : 0));
        self._openFuncHelp();

        self._tokens = self._parse(self.text());
        self._trigger(EVENT_TEXTCHANGED, {});
    };


    FormulaTextBox.prototype._openFuncHelp = function () {
        var self = this;
        if (self._isFuncsShown) {
            self._closeFuncs();
        }
        var activeFuncInfo = self._getActiveFuncInfo();
        if (activeFuncInfo === keyword_null || activeFuncInfo.isFunc !== true) {
            self._closeFuncHelp();
            return;
        }
        var listSeparator = self._listSeparator();
        var show = (self._showHelp && self._isFormula(self.text()) && activeFuncInfo && !self._isAppending && !self._isImeInputting);
        if (show) {
            var func = activeFuncInfo.func;

            var paramters = func.parameters, paramterCount = (paramters && paramters.length), activeParamterIndex = Math_min(paramterCount - 1, activeFuncInfo.activeParamterIndex), paramter = void 0;
            var helpParamters = '';
            for (var i = 0; i < paramterCount; i++) {
                paramter = paramters[i];
                var p = paramter.name;
                if (paramter.repeatable) {
                    p += listSeparator + '...';
                }
                if (paramter.optional) {
                    p = '[' + p + ']';
                }
                var paramterSeparator = (i === paramterCount - 1 ? '' : listSeparator + ' ');
                if (i === activeParamterIndex) {
                    p = '<span class=\'gcsj-func-help-paramter gcsj-func-help-paramter-active\'>' + p + '</span>' + paramterSeparator;
                }
                else {
                    p = '<span class=\'gcsj-func-help-paramter\'>' + p + '</span>' + paramterSeparator;
                }
                helpParamters += p;
            }

            var helpTitle = '<div class=\'gcsj-func-help-title\'><div class=\'gcsj-func-help-formula\'><span class=\'gcsj-func-help-formula-name\'>' +
                getFunctionName(func.name) + '</span><span class=\'gcsj-func-help-paramter-paren\'>(</span>' + helpParamters +
                '<span class=\'gcsj-func-help-paramter-paren\'>)</span></div></div>';

            var helpSummary = '<div class=\'gcsj-func-help-section\'><div class=\'gcsj-func-help-section-title\'>' +
                CalcNS.sR().Fbx_Summary + '</div><div class=\'gcsj-func-help-section-content\'>' +
                (func.description || '') + '</div></div>';
            var helpContent = '<div class=\'gcsj-func-help-section-content\'>' + helpSummary + '</div>';
            var helpBody = '<div class=\'gcsj-func-help-body\'>' + helpContent + '</div>';

            var popupContent = helpTitle + helpBody;
            Core_1.GC$(self._funcHelpPopup).html(popupContent).show();
            self._isFuncHelpShown = true;
            self._position();
        }
        else {
            self._closeFuncHelp();
        }
    };
    FormulaTextBox.prototype._closeFuncHelp = function () {
        Core_1.GC$(this._funcHelpPopup).hide();
        this._isFuncHelpShown = false;
    };

    FormulaTextBox.prototype.close = function () {
        this._closeFuncs();
        this._closeFuncHelp();
    };
    FormulaTextBox.prototype._isReservedKey = function (event, context) {
        if (this._isAppending) {
            return false;
        }
        var modifyKey = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey, keyCode = event.keyCode;
        var ctrlKey = event.ctrlKey, altKey = event.altKey, metaKey = event.metaKey;
        var src = event.srcElement || event.target;
        if (src && context && context.isEditing && src.getAttribute('gcUIElement') === 'gcAttachedFormulaTextBox') {
            return (this._isFuncsShown && keyCode === Keys.tab) || (keyCode === 67 && (ctrlKey || metaKey) && !altKey) || (keyCode === 88 && (ctrlKey || metaKey) && !altKey);
        }

        return (this._isFuncsShown && !modifyKey && (keyCode === Keys.down || keyCode === Keys.up || keyCode === Keys.tab));
    };
    FormulaTextBox.prototype._position = function () {
        var self = this;
        var popup = keyword_null;
        if (self._isFuncsShown) {
            popup = self._funcsPopup;
        }
        else if (self._isFuncHelpShown) {
            popup = self._funcHelpPopup;
        }
        if (!popup) {
            return;
        }
        var $host = Core_1.GC$(self._host), $popup = Core_1.GC$(popup);
        var ftbAcrossSheet = formulatextbox_acrosssheet_1._formulatextboxAcrossSheetSingleton._formulatextboxAcrossSheetInstance;
        if (ftbAcrossSheet && ftbAcrossSheet._sheet) {
            var rect = ftbAcrossSheet._sheet.getCellRect(ftbAcrossSheet._rowIndex, ftbAcrossSheet._columnIndex);
            var canvasOffset = ftbAcrossSheet._canvasOffset;
            $popup.css('top', rect.y + rect.height + canvasOffset.top).css('left', rect.x + canvasOffset.left);
            return;
        }

        var $hostContainer = $host.parent(), hostOuterHeight = $host.outerHeight();
        if (self._isGCEditingInputElement(self._host)) {
            $hostContainer = $hostContainer.parent();
            hostOuterHeight = $hostContainer.outerHeight();
        }
        var top = $hostContainer.css('top');
        var topNumber = parseFloat(top);
        if (!isNaN(topNumber)) {
            top = topNumber;
        }
        var left = $hostContainer.css('left');

        if (top === 'auto') {
            top = $host.offset().top;
            left = $host.offset().left;
        }

        var inputBottom = top + hostOuterHeight;
        var totalHeight = Core_1.GC$(DOCUMENT.body).outerHeight();
        var popupHeight = $popup.outerHeight();
        var bottomIfDown = inputBottom + popupHeight;
        if (bottomIfDown > totalHeight) {
            var topIfUp = top - popupHeight;
            if (topIfUp >= 0) {
                inputBottom = topIfUp;
            }
        }
        $popup.css('top', inputBottom).css('left', left);
    };
    FormulaTextBox.prototype.focus = function () {
        Core_1.GC$(this._host).focus();
    };

    FormulaTextBox.prototype._colorText = function (tokens) {
        var self = this;
        var htmlContent = '', tokensText = '';
        var tokenCount = (tokens && tokens.length), rangeIndex = 0, token;
        for (var i = 0; i < tokenCount; i++) {
            token = tokens[i];
            var style = '';
            if (token.type === 11 ) {
                style = ' style=\'color: ' + self._getRangeColor(rangeIndex) + '\'';
                rangeIndex++;
            }

            self._helpDiv.innerText = token.text;
            htmlContent += '<span' + style + ' class=\'gcsj-func-color-text\'>' +
                self._helpDiv.innerHTML + '</span>';
            tokensText += token.text;
        }

        var host = self._host;
        if (!tokensText && !self.text()) {
            if (self._host.getAttribute('data-editorSource') === 'TextCell') {
                htmlContent = '&#8203';
            }
            else {
                return;
            }
        }
        if (!tokensText && (self._host.getAttribute('gcuielement') === 'gcAttachedFormulaTextBox' || self._host.getAttribute('data-editorSource') === 'TextCell')) {
            htmlContent = '&#8203';
        }
        if (htmlContent) {
            host.innerHTML = '<span class=\'gcsj-func-color-content\'>' + htmlContent + '</span>';
        }
        else {
            while (host.firstChild) {
                host.removeChild(host.firstChild);
            }
        }
    };
    FormulaTextBox.prototype._getColorNode = function (element, position) {
        var $nodes = Core_1.GC$(element).find('.gcsj-func-color-content .gcsj-func-color-text'), nodeCount = $nodes.length;
        position = Math_max(0, position);
        var node, text;
        for (var i = 0; i < nodeCount; i++) {
            node = $nodes[i];
            text = node.innerText;
            position -= text.length;
            if (position <= 0) {
                return { node: node, offset: text.length + position };
            }
        }
        if (text) {
            return { node: node, offset: text.length };
        }
        return keyword_null;
    };
    FormulaTextBox.prototype._selectAutoFunctionRange = function (start, end) {
        var selection = WINDOW.getSelection();
        var formulaSpan = this._host.children[0], range = document.createRange();
        range.setStart(formulaSpan, start);
        range.setEnd(formulaSpan, end);
        selection.removeAllRanges();
        selection.addRange(range);
    };
    FormulaTextBox.prototype._updateUndoStack = function (isEditingWrap) {
        var self = this, host = self._host;
        var editable = self._isEditableDIVElement(host);
        var editorValue = self.text();
        if (editable && editorValue) {
            editorValue = isEditingWrap ? editorValue.substr(0, editorValue.length - 2) : editorValue;
            self._undoStack.push(editorValue);
        }
    };
    FormulaTextBox.prototype._dealTokenTextWidthLineBreaker = function (tokens, originalValue) {
        if (originalValue) {
            var startIndex = 0, endIndex = 0, tokenCharIndex = 0;
            var length_1 = originalValue.length;
            for (var i = 0; i < tokens.length; i++) {
                var tokenText = tokens[i].text;
                for (endIndex; endIndex < length_1; endIndex++) {
                    var currentChar = originalValue[endIndex].toUpperCase();


                    var tokenChar = tokenText[tokenCharIndex] ? tokenText[tokenCharIndex].toUpperCase() : undefined;
                    if (currentChar === tokenChar) {
                        tokenCharIndex += 1;
                    }
                    else if (currentChar === '\n') {
                        if (endIndex + 1 < length_1 && originalValue[endIndex + 1] === ZERO_WIDTH_CHAR) {
                            endIndex += 1;
                        }
                    }
                    else {
                        break;
                    }
                }
                tokens[i].text = originalValue.substring(startIndex, endIndex);
                startIndex = endIndex;
                tokenCharIndex = 0;
            }
        }
        return tokens;
    };
    FormulaTextBox.prototype._processLineBreakerOfValue = function (value) {
        if (value[0] === '=' && value.indexOf('\n') !== -1) {
            var filteredValue = [];
            var length_2 = value.length;


            var inQuotes = false;
            for (var i = 0; i < length_2; i++) {
                var currentChar = value[i];
                if (currentChar === '"') {
                    inQuotes = !inQuotes;
                }
                if (inQuotes) {
                    filteredValue.push(currentChar);
                }
                else {
                    if (currentChar !== '\n') {
                        filteredValue.push(currentChar);
                    }
                    else if (i + 1 < length_2 && value[i + 1] === ZERO_WIDTH_CHAR) {
                        i += 1;
                    }
                }
            }
            return filteredValue.join('');
        }
    };
    return FormulaTextBox;
}());
exports.FormulaTextBox = FormulaTextBox;


function processFbxBreakLine() {
    var selection = WINDOW.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var textNode = DOCUMENT.createElement('span');
        textNode.innerHTML = '<br/>' + ZERO_WIDTH_CHAR;
        range.insertNode(textNode);
        var newRange = DOCUMENT.createRange();
        newRange.setStartAfter(textNode);
        newRange.setEndAfter(textNode);
        newRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
}
function isFbxElement(e) {
    return e.target.getAttribute('gcuielement') === 'gcAttachedFormulaTextBox';
}
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
//# sourceMappingURL=gc.spread.sheets.formulatextbox.14.2.5.js.map