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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['ContextMenu'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/contextMenu/context-menu.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/contextMenu/context-menu-dialog.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/contextMenu/context-menu-dialog.js ***!
  \*********************************************************/
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
var getPreferredZIndex = Core_1._util._getPreferredZIndex, BaseDialog = Core_1._BaseDialog, $ = Core_1.GC$;
var COMMAND_EXECUTED = 'gc.command.executed';
var LEFT = 'left', TOP = 'top';
var ContextMenuViewDialog = (function (_super) {
    __extends(ContextMenuViewDialog, _super);
    function ContextMenuViewDialog(host, elem) {
        var _this = _super.call(this, host, getPreferredZIndex(host)) || this;
        var self = _this;
        self._elem = elem;
        return _this;
    }

    ContextMenuViewDialog.prototype._initContextMenuView = function (container, menuData, spread) {
        var self = this;
        var host = container[0];
        if (self._menuView && self._menuView._create) {
            self._menuView._create(host, menuData, spread, self._elem);
        }
    };
    ContextMenuViewDialog.prototype._open = function (menuView, menuData, x, y, spread) {
        var self = this;
        var container = self._prepareContainer(x, y);
        self._menuView = menuView;
        self._initContextMenuView(container, menuData, spread);
    };
    ContextMenuViewDialog.prototype._prepareContainer = function (x, y) {
        var self = this;
        var container = self._getContainer();
        container.css([LEFT, TOP], [x, y]);
        container.empty();
        _super.prototype._show.call(this);
        self._attachEvent();
        return container;
    };
    ContextMenuViewDialog.prototype._isHitOutside = function (hitInfo) {
        var self = this;
        var container = self._getContainer();
        if (container.css('display') !== 'block') {
            return true;
        }
        var containerOffset = container.offset();
        containerOffset.top += document.body.clientTop || 0;
        containerOffset.left += document.body.clientLeft || 0;
        var x = hitInfo.x;
        var y = hitInfo.y;
        if (x < containerOffset.left || x > (container.width() + containerOffset.left) || y < containerOffset.top || y > (container.height() + containerOffset.top)) {
            return true;
        }
        return false;
    };
    ContextMenuViewDialog.prototype._attachEvent = function () {
        var self = this;
        self._elem.bind(COMMAND_EXECUTED, function () {
            self.close();
        });
    };
    ContextMenuViewDialog.prototype._detachEvent = function () {
        var self = this;
        self._elem.unbind(COMMAND_EXECUTED);
    };
    ContextMenuViewDialog.prototype.close = function () {
        var self = this;
        if (self._menuView) {
            self._menuView._dispose();
        }
        self._detachEvent();
        if (self._hasTargetContainer(self._name)) {
            $('#' + self._name).remove();
        }
        _super.prototype.close.call(this);
        if (self._initHost) {
            self._host = self._initHost;
            delete self._initHost;
        }
    };
    return ContextMenuViewDialog;
}(BaseDialog));
exports.ContextMenuViewDialog = ContextMenuViewDialog;
/***/ }),

/***/ './dist/plugins/contextMenu/context-menu.entry.js':
/*!********************************************************!*\
  !*** ./dist/plugins/contextMenu/context-menu.entry.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(__webpack_require__(/*! ./context-menu */ './dist/plugins/contextMenu/context-menu.js'));
__export(__webpack_require__(/*! ./menu-view */ './dist/plugins/contextMenu/menu-view.js'));
__export(__webpack_require__(/*! ./context-menu.ns */ './dist/plugins/contextMenu/context-menu.ns.js'));
var _ContextMenuDialogModule = __webpack_require__(/*! ./context-menu-dialog */ './dist/plugins/contextMenu/context-menu-dialog.js');
exports._ContextMenuViewDialog = _ContextMenuDialogModule.ContextMenuViewDialog;
/***/ }),

/***/ './dist/plugins/contextMenu/context-menu.js':
/*!**************************************************!*\
  !*** ./dist/plugins/contextMenu/context-menu.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var context_menu_dialog_1 = __webpack_require__(/*! ./context-menu-dialog */ './dist/plugins/contextMenu/context-menu-dialog.js');
var menu_view_1 = __webpack_require__(/*! ./menu-view */ './dist/plugins/contextMenu/menu-view.js');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var context_menu_ns_1 = __webpack_require__(/*! ./context-menu.ns */ './dist/plugins/contextMenu/context-menu.ns.js');
var $ = Core_1.GC$, isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined, isEmptyObject = Common_1.Common._Types._isEmptyObject, cancelDefault = Core_1._util._cancelDefault;
var COMMAND_PREFIX = 'gc.spread.contextMenu.', MENUITEM_NAME_PREFIX = 'gc.spread.', ICON_CLASS_PREFIX = 'gc-spread-', MENUITEM_NAME_PIVOT_TABLE = 'gc.spread.pivot', SELECTED_CLASS_NAME = 'gc-spread-pivot-selected';
var VIEWPORT = 'viewport', COL_HEADER = 'colHeader', ROW_HEADER = 'rowHeader', SLICER = 'slicer', SHEET_TAB = 'sheetTab', CORNER = 'corner';
var PIVOT_PAGE_FILTER = 'pivotPageFilter', PIVOT_CORNER = 'pivotTopLeft', PIVOT_HEADER = 'pivotHeader', PIVOT_EMPTY_LABEL = 'pivotEmptyLabel', PIVOT_CONTENT = 'pivotContent', PIVOT_GRAND_TOTAL = 'pivotGrandTotal', FIELD_NAME = 'FieldName', SORT_TYPE = 'SortType';
var PIVOT_TABLE_SUMMARIZE_VALUES_BY = 'pivotSummarizeValuesBy', PIVOT_TABLE_EXPAND_OR_COLLAPSE = 'pivotExpandOrCollapse', PIVOT_TABLE_GROUP = 'pivotTableGroup', OPEN_PIVOT_GROUP_DIALOG = 'OpenPivotGroupDialog', PIVOT_TABLE_UNGROUP = 'pivotTableUnGroup', PIVOT_TABLE_SHOW_VALUE_AS = 'pivotShowValueAs', PIVOT_TABLE_SHOW_DETAILS = 'pivotShowDetails', PIVOT_TABLE_REFRESH = 'pivotRefresh', REMOVE_FIELD = 'removeField', PIVOT_TABLE = 'pivotTable', REMOVE_PIVOT_GRAND_TOTAL = 'removePivotGrandTotal', OPEN_VALUE_FIELD_SETTING_DIALOG = 'openValueFieldSettingDialogCmd', PIVOT_TABLE_SUM = 'pivotSum', UPDATE_PIVOT_VALUE_FIELD_CMD = 'UpdatePivotValueFieldCmd', PIVOT_TABLE_COUNT = 'pivotCount', PIVOT_TABLE_AVERAGE = 'pivotAverage', PIVOT_TABLE_MAX = 'pivotMax', PIVOT_TABLE_MIN = 'pivotMin', PIVOT_TABLE_PRODUCT = 'pivotProduct', PIVOT_TABLE_NO_CALCULATION = 'pivotNoCalculation', PIVOT_TABLE_GRAND_TOTAL = 'pivotGrandtotal', PIVOT_TABLE_COLUMN_TOTAL = 'pivotColumnTotal', PIVOT_TABLE_ROW_TOTAL = 'pivotRowTotal', PIVOT_TABLE_OF = 'pivotOf', PIVOT_TABLE_PARENT_ROW_TOTAL = 'pivotParentRowTotal', PIVOT_TABLE_DIFFERENCE_FROM = 'pivotDifferenceFrom', PIVOT_TABLE_PERCENT_DIFFERENCE_FROM = 'pivotPercentDifferenceFro', PIVOT_TABLE_RUNNING_TOTAL_IN = 'pivotRunningTotalIn', PIVOT_TABLE_PERCENT_RUNNING_TOTAL_IN = 'pivotPercentRunningTotalIn', PIVOT_TABLE_RANK_SMALLEST_TO_LARGEST = 'pivotRankSmallestToLargest', PIVOT_TABLE_OF_PARENT_TOTAL = 'pivotOfParentTotal', PIVOT_TABLE_PARENT_COLUMN_TOTAL = 'pivotParentColumnTotal', PIVOT_TABLE_RANK_LARGEST_TO_SMALLEST = 'pivotRankLargestToSmallest', PIVOT_TABLE_INDEX = 'pivotIndex', PIVOT_TABLE_MORE_OPTIONS = 'pivotMoreOptions', PIVOT_TABLE_FILTER = 'pivotFilter', PIVOT_TABLE_CLEAR_FILTER_FROM = 'pivotClearFilterFrom', PIVOT_TABLE_KEEP_ONLY_SELECTED_ITEMS = 'pivotKeepOnlySelectedItems', PIVOT_TABLE_HIDE_SELECTED_ITEMS = 'pivotHideSelectedItems', PIVOT_TABLE_TOP10 = 'pivotTop10', PIVOT_TABLE_LABEL_FILTERS = 'pivotLabelFilters', PIVOT_TABLE_VALUE_FILTERS = 'pivotValueFilters', PIVOT_TABLE_EXPAND = 'pivotExpand', PIVOT_TABLE_COLLAPSE = 'pivotCollapse', PIVOT_TABLE_EXPAND_ENTIRE_FIELD = 'pivotExpandEntireField', PIVOT_TABLE_COLLAPSE_ENTIRE_FIELD = 'pivotCollapseEntireField', CREATE_DIALOG_FOR_VALUE_FILTER = 'createDialogForValueFilter', CREATE_DIALOG_FOR_LABEL_FILTER = 'createDialogForLabelFilter', OPEN_PIVOT_SHOW_VALUE_AS_DIALOG = 'OpenPivotShowValueAsDialog', FILTER_FIELD_VALUE = 'filterFieldLabelValue', ClearCommand = 'ClearCommand', PivotSort = 'pivotSort';
var REMOVE_SLICER = 'removeSlicer', TOGGLE_COMMENT = 'toggleComment', DELETE_COMMENT = 'deleteComment', EDIT_COMMENT = 'editComment', UNHIDE_SHEET = 'unhideSheet', HIDE_SHEET = 'hideSheet', UNHIDE_ROWS = 'unhideRows', UNHIDE_COLUMNS = 'unhideColumns', HIDE_ROWS = 'hideRows', PIN_ROWS = 'pinRows', PIN_COLUMNS = 'pinColumns', HIDE_COLUMNS = 'hideColumns', SORT_ASCEND = 'sortAscend', SORT_DESCEND = 'sortDescend', SORT = 'sort', FILTER = 'filter', INSERT_COMMENT = 'insertComment', DELETE_SHEET = 'deleteSheet', INSERT_NOTE = 'insertNote', REPLY_COMMENT = 'replyComment', INSERT_SHEET = 'insertSheet', INSERT_ROWS = 'insertRows', INSERT_COLUMNS = 'insertColumns', DELETE_ROWS = 'deleteRows', DELETE_COLUMNS = 'deleteColumns', CLEAR_CONTENT = 'clearContents', PASTE = 'paste', PASTE_OPTIONS = 'pasteOptions', PASTE_FORMATTING = 'pasteFormatting', PASTE_VALUES = 'pasteValues', PASTE_FORMULA = 'pasteFormula', PASTE_ALL = 'pasteAll', CUT = 'cut', COPY = 'copy', PASTE_VALUES_FORMATTING = 'pasteValuesFormatting', PASTE_FORMULA_FORMATTING = 'pasteFormulaFormatting', SEPARATOR = 'separator', GROUP_HEADER = 'groupHeader', SLICER_SORT_ASCEND = 'slicerSortAscend', SLICER_SORT_DESCEND = 'slicerSortDescend', TABLE = 'table', TABLE_INSERT = 'tableInsert', TABLE_DELETE = 'tableDelete', TABLE_INSERT_ROWS_ABOVE = 'tableInsertRowsAbove', TABLE_INSERT_ROWS_BELOW = 'tableInsertRowsBelow', TABLE_INSERT_COLUMNS_LEFT = 'tableInsertColumnsLeft', TABLE_INSERT_COLUMNS_RIGHT = 'tableInsertColumnsRight', TABLE_INSERT_ROWS = 'tableInsertRows', TABLE_INSERT_COLUMNS = 'tableInsertColumns', TABLE_DELETE_ROWS = 'tableDeleteRows', TABLE_DELETE_COLUMNS = 'tableDeleteColumns', INSERT_COPY_CELLS = 'insertCopiedCells', INSERT_CUT_CELLS = 'insertCutCells', SHIFT_CELLS_DOWN = 'shiftCellsDown', SHIFT_CELLS_RIGHT = 'shiftCellsRight';
var TABLE_INSERT_ROWS_ABOVE_FOR_CONTEXT_MENU = 'tableInsertRowsAboveForContextMenu', TABLE_INSERT_ROWS_BELOW_FOR_CONTEXT_MENU = 'tableInsertRowsBelowForContextMenu', TABLE_DELETE_ROWS_FOR_CONTEXT_MENU = 'tableDeleteRowsForContextMenu', TABLE_INSERT_COLUMNS_LEFT_FOR_CONTEXT_MENU = 'tableInsertColumnsLeftForContextMenu', TABLE_INSERT_COLUMNS_RIGHT_FOR_CONTEXT_MENU = 'tableInsertColumnsRightForContextMenu', TABLE_DELETE_COLUMNS_FOR_CONTEXT_MENU = 'tableDeleteColumnsForContextMenu';
var ROW = 'row', COL = 'col', keyword_undefined = void 0;
var rm = new Common_1.Common.ResourceManager(context_menu_ns_1.SR, 'ContextMenu');
var sR = rm.getResource.bind(rm);
var filterMap = {
    sheetTab: function (hitInfo, spread, menuItem) {
        return new RegExp('sheetTab', 'i').test(menuItem.workArea) && hitInfo.tabStripHitInfo && hitInfo.tabStripHitInfo.sheetTab && hitInfo.tabStripHitInfo.sheetTab.sheetName !== 'newSheet';
    },
    outline: function (hitInfo, spread, menuItem) {
        return !!(new RegExp('outline', 'i').test(menuItem.workArea) && hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.outlineHitInfo);
    },
    viewport: function (hitInfo, spread, menuItem) {
        if (new RegExp('viewport', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && !hitInfo.worksheetHitInfo.floatingObjectHitInfo
            && !hitInfo.worksheetHitInfo.shapeHitInfo
            && !hitInfo.worksheetHitInfo.pivotTableInfo
            && !hitInfo.worksheetHitInfo.commentHitInfo) {
            return filterClipboardMenuItem(spread, menuItem)
                && filterClearContentsMenuItem(spread, menuItem)
                && filterCommentMenuItem(spread, menuItem)
                && filterSortFilterMenuItem(spread, menuItem) && insertCopyCellsFilterMenuItem(spread, menuItem)
                && insertCutCellsFilterMenuItem(spread, menuItem);
        }
    },
    rowHeader: function (hitInfo, spread, menuItem) {
        if (new RegExp('rowHeader', 'i').test(menuItem.workArea) && hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.hitTestType === 2) {
            return filterClipboardMenuItem(spread, menuItem)
                && filterClearContentsMenuItem(spread, menuItem)
                && filterInsertDeleteMenuItem(spread, menuItem)
                && filterHideUnhideMenuItem(spread, menuItem)
                && rowHeaderInsertCutCellsFilterMenuItem(spread, menuItem);
        }
    },
    colHeader: function (hitInfo, spread, menuItem) {
        if (new RegExp('colHeader', 'i').test(menuItem.workArea) && hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.hitTestType === 1) {
            return filterClipboardMenuItem(spread, menuItem)
                && filterClearContentsMenuItem(spread, menuItem)
                && filterInsertDeleteMenuItem(spread, menuItem)
                && filterHideUnhideMenuItem(spread, menuItem)
                && colHeaderInsertCellsFilterMenuItem(spread, menuItem);
        }
    },
    corner: function (hitInfo, spread, menuItem) {
        if (new RegExp('corner', 'i').test(menuItem.workArea) && hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.hitTestType === 0) {
            return filterClipboardMenuItem(spread, menuItem)
                && filterClearContentsMenuItem(spread, menuItem)
                && filterCommentMenuItem(spread, menuItem)
                && filterSortFilterMenuItem(spread, menuItem);
        }
    },
    slicer: function (hitInfo, spread, menuItem) {
        return new RegExp('slicer', 'i').test(menuItem.workArea) && hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.floatingObjectHitInfo && hitInfo.worksheetHitInfo.floatingObjectHitInfo.floatingObject && hitInfo.worksheetHitInfo.floatingObjectHitInfo.floatingObject.typeName === 'Slicer';
    },
    chart: function (hitInfo, spread, menuItem) {
        return new RegExp('chart', 'i').test(menuItem.workArea) && hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.floatingObjectHitInfo && hitInfo.worksheetHitInfo.floatingObjectHitInfo.floatingObject && hitInfo.worksheetHitInfo.floatingObjectHitInfo.floatingObject.typeName === '2';
    },
    shape: function (hitInfo, spread, menuItem) {
        return new RegExp('shape', 'i').test(menuItem.workArea) && hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.shapeHitInfo;
    },
    table: function (hitInfo, spread, menuItem) {
        var sheet = Core_1._getActiveSheet(spread), tables = sheet.tables;
        return new RegExp('table', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && !hitInfo.worksheetHitInfo.floatingObjectHitInfo
            && !hitInfo.worksheetHitInfo.shapeHitInfo
            && !hitInfo.worksheetHitInfo.pivotTableInfo
            && !hitInfo.worksheetHitInfo.commentHitInfo
            && tables && tables._selectTablePart();
    },
    vpWithoutTb: function (hitInfo, spread, menuItem) {
        if (new RegExp('vpWithoutTb', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && !hitInfo.worksheetHitInfo.floatingObjectHitInfo
            && !hitInfo.worksheetHitInfo.shapeHitInfo
            && !hitInfo.worksheetHitInfo.pivotTableInfo
            && !hitInfo.worksheetHitInfo.commentHitInfo) {
            var sheet = Core_1._getActiveSheet(spread), tables = sheet.tables, result = tables && tables._selectTablePart();
            return !result && filterClipboardMenuItem(spread, menuItem)
                && filterClearContentsMenuItem(spread, menuItem)
                && filterCommentMenuItem(spread, menuItem) && filterSortFilterMenuItem(spread, menuItem);
        }
    },
    pivotTablePageFilterArea: function (hitInfo, spread, menuItem) {
        var sheet = Core_1._getActiveSheet(spread), pivotTables = sheet.pivotTables;
        return new RegExp('pivotPageFilter', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && pivotTables && hitInfo.worksheetHitInfo.pivotTableCellInfo
            && hitInfo.worksheetHitInfo.pivotTableCellInfo.menuArea === 0 ;
    },
    pivotTableCornerArea: function (hitInfo, spread, menuItem) {
        var sheet = Core_1._getActiveSheet(spread), pivotTables = sheet.pivotTables;
        return new RegExp('pivotTopLeft', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && pivotTables && hitInfo.worksheetHitInfo.pivotTableCellInfo
            && hitInfo.worksheetHitInfo.pivotTableCellInfo.menuArea === 1 ;
    },
    pivotTableEmptyLabelArea: function (hitInfo, spread, menuItem) {
        var sheet = Core_1._getActiveSheet(spread), pivotTables = sheet.pivotTables;
        return new RegExp('pivotEmptyLabel', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && pivotTables && hitInfo.worksheetHitInfo.pivotTableCellInfo
            && hitInfo.worksheetHitInfo.pivotTableCellInfo.menuArea === 3 ;
    },
    pivotTableHeaderArea: function (hitInfo, spread, menuItem) {
        var sheet = Core_1._getActiveSheet(spread), pivotTables = sheet.pivotTables;
        return new RegExp('pivotHeader', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && pivotTables && hitInfo.worksheetHitInfo.pivotTableCellInfo
            && hitInfo.worksheetHitInfo.pivotTableCellInfo.menuArea === 2 ;
    },
    pivotTableGrandTotalArea: function (hitInfo, spread, menuItem) {
        var sheet = Core_1._getActiveSheet(spread), pivotTables = sheet.pivotTables;
        return new RegExp('pivotGrandTotal', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && pivotTables && hitInfo.worksheetHitInfo.pivotTableCellInfo
            && hitInfo.worksheetHitInfo.pivotTableCellInfo.menuArea === 5 ;
    },
    pivotTableContentArea: function (hitInfo, spread, menuItem) {
        var sheet = Core_1._getActiveSheet(spread), pivotTables = sheet.pivotTables;
        return new RegExp('pivotContent', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && pivotTables && hitInfo.worksheetHitInfo.pivotTableCellInfo
            && hitInfo.worksheetHitInfo.pivotTableCellInfo.menuArea === 4 ;
    },
    pivotTable: function (hitInfo, spread, menuItem) {
        var sheet = Core_1._getActiveSheet(spread), pivotTables = sheet.pivotTables;
        return new RegExp('pivotTable', 'i').test(menuItem.workArea)
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.hitTestType === 3
            && pivotTables && hitInfo.worksheetHitInfo.pivotTableCellInfo;
    },
};
var hideSheetsStack = [];
function isSelectSlicer(sheet) {
    if (sheet.slicers) {
        var slicers = sheet.slicers.all();
        if (!slicers || isEmptyObject(slicers)) {
            return null;
        }
        for (var item in slicers) {
            if (slicers[item].isSelected()) {
                return true;
            }
        }
        return false;
    }
}
function execInSelectionsForRowOrCol(selections, orientation, callback) {
    var count = orientation === ROW ? 'rowCount' : 'colCount';
    for (var i = 0; i < selections.length; i++) {
        var selection = selections[i];
        var rowOrCol = selection[orientation] === -1 ? 0 : selection[orientation];
        for (var j = 0; j < selection[count]; j++) {
            callback(rowOrCol + j);
        }
    }
}
function getUnFilteredRows(range, filterInfo) {
    var zone = [], start = -1, index;
    for (index = range.row; index < range.row + range.rowCount; index++) {
        if (filterInfo[index] !== false && start === -1) {
            start = index;
        }
        if (filterInfo[index] === false && start !== -1) {
            zone.push([start, index - start]);
            start = -1;
        }
    }
    if (start !== -1) {
        zone.push([start, index - start]);
    }
    return zone;
}


function isAnyHiddenRowOrColBeforeFirstVisibleRowOrCol(sheet, range) {
    if (range.colCount === 1 && range.row === -1) {
        var selectedColumnIndex = range.col;
        if (selectedColumnIndex === sheet._getFirstVisualColumn()) {
            var columnIndexBeforeSelectedColumn = selectedColumnIndex - 1;
            if (columnIndexBeforeSelectedColumn >= 0 && !sheet.getColumnVisible(columnIndexBeforeSelectedColumn)) {
                return true;
            }
        }
    }
    else if (range.rowCount === 1 && range.col === -1) {
        var selectedRowIndex = range.row;
        if (selectedRowIndex === sheet._getFirstVisualRow()) {
            var rowIndexBeforeSelectedRow = selectedRowIndex - 1;
            if (rowIndexBeforeSelectedRow >= 0 && !sheet.getRowVisible(rowIndexBeforeSelectedRow)) {
                return true;
            }
        }
    }
}
function getSelectedSlicers(sheet) {
    if (sheet.slicers) {
        var slicers = sheet.slicers.all();
        if (!slicers || isEmptyObject(slicers)) {
            return null;
        }
        var selectedSlicers = [];
        for (var item in slicers) {
            if (slicers[item].isSelected()) {
                selectedSlicers.push(slicers[item]);
            }
        }
        return selectedSlicers;
    }
}
function filterClipboardMenuItem(spread, menuItem) {
    var menuItemName = menuItem.name, menuItemGroup = menuItem.group;
    if ([MENUITEM_NAME_PREFIX + COPY, MENUITEM_NAME_PREFIX + CUT, MENUITEM_NAME_PREFIX + PASTE_OPTIONS].indexOf(menuItemName) < 0 &&
        MENUITEM_NAME_PREFIX + PASTE_OPTIONS !== menuItemGroup) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    if (sheet._parentSheet && (MENUITEM_NAME_PREFIX + PASTE_OPTIONS === menuItemName || MENUITEM_NAME_PREFIX + PASTE_OPTIONS === menuItemGroup)) {
        return false;
    }
    return true;
}
function filterClearContentsMenuItem(spread, menuItem) {
    if ([MENUITEM_NAME_PREFIX + CLEAR_CONTENT].indexOf(menuItem.name) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    if (sheet._parentSheet) {
        return false;
    }
    return true;
}
function filterInsertDeleteMenuItem(spread, menuItem) {
    if ([MENUITEM_NAME_PREFIX + INSERT_COLUMNS, MENUITEM_NAME_PREFIX + DELETE_COLUMNS, MENUITEM_NAME_PREFIX + INSERT_ROWS, MENUITEM_NAME_PREFIX + DELETE_ROWS].indexOf(menuItem.name) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    if (sheet._parentSheet) {
        return false;
    }
    return true;
}
function filterHideUnhideMenuItem(spread, menuItem) {
    var menuItemName = menuItem.name;
    if ([MENUITEM_NAME_PREFIX + HIDE_COLUMNS, MENUITEM_NAME_PREFIX + UNHIDE_COLUMNS, MENUITEM_NAME_PREFIX + HIDE_ROWS, MENUITEM_NAME_PREFIX + UNHIDE_ROWS].indexOf(menuItemName) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    if (sheet._parentSheet && (menuItemName === MENUITEM_NAME_PREFIX + HIDE_ROWS || menuItemName === MENUITEM_NAME_PREFIX + UNHIDE_ROWS)) {
        return false;
    }
    return true;
}
function filterCommentMenuItem(spread, menuItem) {
    var commentItems = [MENUITEM_NAME_PREFIX + INSERT_COMMENT, MENUITEM_NAME_PREFIX + EDIT_COMMENT, MENUITEM_NAME_PREFIX + TOGGLE_COMMENT, MENUITEM_NAME_PREFIX + DELETE_COMMENT];
    var itemName = menuItem.name;
    if (commentItems.indexOf(itemName) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    var row = sheet.getActiveRowIndex();
    var col = sheet.getActiveColumnIndex();
    if (sheet.comments) {
        var comment = sheet.comments.get(row, col);
        if (comment) {
            return itemName !== MENUITEM_NAME_PREFIX + INSERT_COMMENT;
        }
        if (itemName === MENUITEM_NAME_PREFIX + EDIT_COMMENT || itemName === MENUITEM_NAME_PREFIX + TOGGLE_COMMENT) {
            return false;
        }
        else if (itemName === MENUITEM_NAME_PREFIX + INSERT_COMMENT) {
            return true;
        }
        var selections = sheet.getSelections();
        for (var i = 0; i < selections.length; i++) {
            var selection = selections[i];
            if (hasCommentsInSelection(selection, sheet)) {
                return true;
            }
        }
        return false;
    }
}
function hasUnlockedCommentsInSelection(selections, sheet) {
    if (sheet.comments) {
        var comments = sheet.comments.all();
        var colIndex = void 0, rowIndex = void 0;
        for (var j = 0; j < selections.length; j++) {
            var selection = selections[j];
            for (var i = 0; i < comments.length; i++) {
                if (!comments[i].locked()) {
                    rowIndex = comments[i]._rowIndex;
                    colIndex = comments[i]._colIndex;
                    if (rowIndex >= selection.row && rowIndex < (selection.row + selection.rowCount) && colIndex >= selection.col && colIndex < (selection.col + selection.colCount)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function hasCommentsInSelection(selection, sheet) {
    if (sheet.comments) {
        var comments = sheet.comments.all();
        var colIndex = void 0, rowIndex = void 0;
        for (var i = 0; i < comments.length; i++) {
            rowIndex = comments[i]._rowIndex;
            colIndex = comments[i]._colIndex;
            if (rowIndex >= selection.row && rowIndex < (selection.row + selection.rowCount) && colIndex >= selection.col && colIndex < (selection.col + selection.colCount)) {
                return true;
            }
        }
    }
    return false;
}
function filterSortFilterMenuItem(spread, menuItem) {
    if ([MENUITEM_NAME_PREFIX + SORT, MENUITEM_NAME_PREFIX + FILTER].indexOf(menuItem.name) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    if (sheet._parentSheet) {
        return false;
    }
    var selections = sheet.getSelections();
    if (!selections || selections.length !== 1) {
        return false;
    }
    var selection = selections[0];
    var table = getTable(sheet, selection);
    if (table) {
        var tableRange = table.range();
        if (selection.row < tableRange.row || selection.col < tableRange.col
            || selection.row + selection.rowCount > tableRange.row + tableRange.rowCount
            || selection.col + selection.colCount > tableRange.col + tableRange.colCount) {
            return false;
        }
    }
    return true;
}
function insertCopyCellsFilterMenuItem(spread, menuItem) {
    if ([MENUITEM_NAME_PREFIX + INSERT_COPY_CELLS].indexOf(menuItem.name) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    var clipboardHelper = sheet._getClipboardHelper();
    return clipboardHelper && !clipboardHelper._isCutting && clipboardHelper._ranges && clipboardHelper._ranges.length === 1 && sheet.getSelections().length === 1 && showInsertCellCopyCut(sheet);
}
function insertCutCellsFilterMenuItem(spread, menuItem) {
    if ([MENUITEM_NAME_PREFIX + INSERT_CUT_CELLS].indexOf(menuItem.name) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    var clipboardHelper = sheet._getClipboardHelper();
    return clipboardHelper && clipboardHelper._isCutting && clipboardHelper._ranges && clipboardHelper._ranges.length === 1 && sheet.getSelections().length === 1 && showInsertCellCopyCut(sheet);
}
function showInsertCellCopyCut(sheet) {
    if (sheet._parentSheet) {
        return false;
    }
    var acRow = sheet.getActiveRowIndex(), acCol = sheet.getActiveColumnIndex();
    var clipboardHelper = sheet._getClipboardHelper();
    if (!clipboardHelper._showInsertCopyPasteCells) {
        return false;
    }
    if (sheet.tables) {
        if (sheet.tables.find(acRow, acCol)) {
            return false;
        }
    }
    var spans = sheet._modelManager.getSpans();
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i];
        if (acRow >= span.row && acRow < (span.row + span.rowCount) && acCol >= span.col && acCol < (span.col + span.colCount)) {
            return false;
        }
    }
    return true;
}
function rowHeaderInsertCutCellsFilterMenuItem(spread, menuItem) {
    if ([MENUITEM_NAME_PREFIX + ROW_HEADER + INSERT_COPY_CELLS, MENUITEM_NAME_PREFIX + ROW_HEADER + INSERT_CUT_CELLS].indexOf(menuItem.name) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    if (sheet._parentSheet) {
        return false;
    }
    var clipboardHelper = sheet._getClipboardHelper();
    var acRow = sheet.getActiveRowIndex();
    if (sheet.tables) {
        var allTables = sheet.tables.all();
        for (var i = 0; i < allTables.length; i++) {
            var table = allTables[i];
            if (acRow > table._row && acRow < table._row + table._rowCount) {
                return false;
            }
        }
    }
    var spans = sheet._modelManager.getSpans();
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i];
        if (acRow > span.row && acRow < (span.row + span.rowCount)) {
            return false;
        }
    }
    if (!clipboardHelper._showInsertCopyPasteCells || clipboardHelper._ranges && clipboardHelper._ranges.length !== 1 || (sheet.getSelections().length !== 1)) {
        return false;
    }
    if (menuItem.name === MENUITEM_NAME_PREFIX + ROW_HEADER + INSERT_CUT_CELLS) {
        if (clipboardHelper._isCutting && clipboardHelper._ranges && sheet.getColumnCount() % clipboardHelper._ranges[0].colCount === 0) {
            return true;
        }
    }
    else if (menuItem.name === MENUITEM_NAME_PREFIX + ROW_HEADER + INSERT_COPY_CELLS) {
        if (!clipboardHelper._isCutting && clipboardHelper._ranges && sheet.getColumnCount() % clipboardHelper._ranges[0].colCount === 0) {
            return true;
        }
    }
    return false;
}
function colHeaderInsertCellsFilterMenuItem(spread, menuItem) {
    if ([MENUITEM_NAME_PREFIX + COL_HEADER + INSERT_COPY_CELLS, MENUITEM_NAME_PREFIX + COL_HEADER + INSERT_CUT_CELLS].indexOf(menuItem.name) < 0) {
        return true;
    }
    var sheet = Core_1._getActiveSheet(spread);
    if (sheet._parentSheet) {
        return false;
    }
    var clipboardHelper = sheet._getClipboardHelper();
    var acCol = sheet.getActiveColumnIndex();
    if (sheet.tables) {
        var allTables = sheet.tables.all();
        for (var i = 0; i < allTables.length; i++) {
            var table = allTables[i];
            if (acCol > table._col && acCol < table._col + table._colCount) {
                return false;
            }
        }
    }
    var spans = sheet._modelManager.getSpans();
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i];
        if (acCol > span.col && acCol < (span.col + span.colCount)) {
            return false;
        }
    }
    if (!clipboardHelper._showInsertCopyPasteCells || clipboardHelper._ranges && clipboardHelper._ranges.length !== 1 || (sheet.getSelections().length !== 1)) {
        return false;
    }
    if (menuItem.name === MENUITEM_NAME_PREFIX + COL_HEADER + INSERT_COPY_CELLS) {
        if (!clipboardHelper._isCutting && clipboardHelper._ranges && sheet.getRowCount() % clipboardHelper._ranges[0].rowCount === 0) {
            return true;
        }
    }
    else if (menuItem.name === MENUITEM_NAME_PREFIX + COL_HEADER + INSERT_CUT_CELLS) {
        if (clipboardHelper._isCutting && clipboardHelper._ranges && sheet.getRowCount() % clipboardHelper._ranges[0].rowCount === 0) {
            return true;
        }
    }
    return false;
}
function getTable(sheet, selection) {
    if (!selection) {
        return null;
    }
    Core_1._util._adjustSheetSelectionRowColumnCount(selection, sheet.getRowCount(), sheet.getColumnCount());
    for (var row = selection.row; row < selection.row + selection.rowCount; row++) {
        for (var col = selection.col; col < selection.col + selection.colCount; col++) {
            if (sheet.tables) {
                var table = sheet.tables.find(row, col);
                if (table) {
                    return table;
                }
            }
        }
    }
    return null;
}
function _triggerTableListRowsChanged(sheet, tableList, row, rowCount) {
    for (var tableIndex = 0; tableIndex < tableList.length; tableIndex++) {
        var table = tableList[tableIndex];
        table._raiseTableRowsChanged(row, rowCount, true , keyword_undefined, table._getDeletedRows());
    }
}
function getSortedRowSelections(selections) {
    var sortedRanges = selections;
    for (var i = 0; i < sortedRanges.length - 1; i++) {
        for (var j = i + 1; j < sortedRanges.length; j++) {
            if (sortedRanges[i].row < sortedRanges[j].row) {
                var temp = sortedRanges[i];
                sortedRanges[i] = sortedRanges[j];
                sortedRanges[j] = temp;
            }
        }
    }
    return sortedRanges;
}
function getSortedColumnsSelections(selections) {
    var sortedRanges = selections;
    for (var i = 0; i < sortedRanges.length - 1; i++) {
        for (var j = i + 1; j < sortedRanges.length; j++) {
            if (sortedRanges[i].col < sortedRanges[j].col) {
                var temp = sortedRanges[i];
                sortedRanges[i] = sortedRanges[j];
                sortedRanges[j] = temp;
            }
        }
    }
    return sortedRanges;
}
function setSpanStyleWhenInsertRowsColumns(sheet, insertRow, insertColumn, count) {
    var viewportSpans = sheet._modelManager.getSpans(keyword_undefined, 3 );
    if (insertRow >= 0) {
        setStyleToInsertRowsInSpan(sheet, viewportSpans, insertRow, count, 3 );
        setStyleToInsertRowsInSpan(sheet, sheet._modelManager.getSpans(keyword_undefined, 2 ), insertRow, count, 2 );
    }
    else if (insertColumn >= 0) {
        setStyleToInsertColumnsInSpan(sheet, viewportSpans, insertColumn, count, 3 );
        setStyleToInsertColumnsInSpan(sheet, sheet._modelManager.getSpans(keyword_undefined, 1 ), insertColumn, count, 1 );
    }
}
function setStyleToInsertColumnsInSpan(sheet, spans, insertCol, count, sheetArea) {
    for (var i = 0, len = spans.length; i < len; i++) {
        var span = spans[i];
        if (insertCol > span.col && insertCol < span.col + span.colCount) {
            var firstCellStyle = sheet.getStyle(span.row, span.col, sheetArea);
            for (var col = insertCol; col < insertCol + count; col++) {
                for (var row = span.row; row < span.row + span.rowCount; row++) {
                    sheet.setStyle(row, col, firstCellStyle, sheetArea);
                    if (row === span.row + span.rowCount - 1) {
                        var lastCell = sheet.getCell(span.row + span.rowCount - 1, span.col);
                        var borderBottom = lastCell.borderBottom();
                        if (borderBottom) {
                            sheet.getCell(row, col).borderBottom(borderBottom);
                        }
                    }
                }
            }
        }
    }
}
function setStyleToInsertRowsInSpan(sheet, spans, insertRow, count, sheetArea) {
    for (var i = 0, len = spans.length; i < len; i++) {
        var span = spans[i];
        if (insertRow >= span.row && insertRow <= (span.row + span.rowCount)) {
            var firstCellStyle = sheet.getStyle(span.row, span.col, sheetArea);
            for (var row = insertRow; row < insertRow + count; row++) {
                for (var col = span.col; col < span.col + span.colCount; col++) {
                    sheet.setStyle(row, col, firstCellStyle, sheetArea);
                    if (col === span.col + span.colCount - 1) {
                        var lastCell = sheet.getCell(span.row, span.col + span.colCount - 1);
                        var borderRight = lastCell.borderRight();
                        if (borderRight) {
                            sheet.getCell(row, col).borderRight(borderRight);
                        }
                    }
                }
            }
        }
    }
}
function doAction(spread, options, isUndo, fnExecute, fnUndo) {
    var sheet = Core_1._getSheetFromName(spread, options.sheetName);
    if (!sheet) {
        return false;
    }
    var considerAllSheets = options.considerAllSheets, sheets = spread._getSheetsAndSheetTabs();
    sheet.suspendPaint();
    var changesKey = Core_1.Commands._getChangesKey(sheet.name());
    var ret;
    if (isUndo) {
        if (fnUndo) {
            fnUndo(sheet, options);
        }
        if (considerAllSheets) {
            Core_1.Commands._undoTransactionAll(sheets, options);
        }
        else {
            sheet._modelManager.undo(options[changesKey]);
        }
    }
    else {
        if (considerAllSheets) {
            Core_1.Commands._startTransactionAll(sheets);
        }
        else {
            sheet._modelManager.startTransaction();
        }
        ret = fnExecute(sheet, options);
        if (considerAllSheets) {
            Core_1.Commands._endTransactionAll(sheets, options);
        }
        else {
            options[changesKey] = sheet._modelManager.endTransaction();
        }
    }
    sheet.resumePaint();
    if (considerAllSheets) {
        var activeSheet = Core_1._getActiveSheet(spread);
        if (activeSheet && sheet !== activeSheet) {
            activeSheet.repaint();
        }
    }
    return ret;
}
function getRowOffset(sheet, row, offset) {
    var i;
    if (offset > 0) {
        for (i = row + 1; i < sheet.getRowCount(); i++) {
            offset = offset - sheet.getRowHeight(i);
            if (offset <= 0) {
                return i - row;
            }
        }
    }
    else if (offset < 0) {
        for (i = row - 1; i >= 0; i--) {
            offset = offset + sheet.getRowHeight(i);
            if (offset >= 0) {
                return i - row;
            }
        }
    }
    return 0;
}
function getColumnOffset(sheet, col, offset) {
    var i;
    if (offset > 0) {
        for (i = col + 1; i < sheet.getColumnCount(); i++) {
            offset = offset - sheet.getColumnWidth(i);
            if (offset <= 0) {
                return i - col;
            }
        }
    }
    else if (offset < 0) {
        for (i = col - 1; i >= 0; i--) {
            offset = offset + sheet.getColumnWidth(i);
            if (offset >= 0) {
                return i - col;
            }
        }
    }
    return 0;
}
function doPaste(spread, options, commandManager, clipBoardOptions) {
    var sheet = Core_1._getSheetFromName(spread, options.sheetName);
    if (!sheet) {
        return;
    }
    commandManager.execute({ cmd: PASTE, sheetName: sheet.name(), pasteOption: clipBoardOptions });
}
function doSlicerSort(spread, options, isUndo, sortType) {
    return doAction(spread, options, isUndo, function (sheet) {
        var selectedSlicers = getSelectedSlicers(sheet);
        if (!selectedSlicers || selectedSlicers.length === 0) {
            return;
        }
        for (var item in selectedSlicers) {
            if (selectedSlicers.hasOwnProperty(item)) {
                selectedSlicers[item].sortState(sortType);
            }
        }
        spread.changeSelectionInCommandExecuting(options, null, null, [], selectedSlicers);
    });
}
function _raiseHiddenSheetInvalidEvent(sheet) {
    sheet._raiseInvalidOperation(8 , sR().hideSheetFailureInfo);
}


var ContextMenu = (function () {
    function ContextMenu() {
        var self = this;


        self.menuView = new menu_view_1.MenuView();


        self.menuData = self._getBuiltInMenuData();
    }
    ContextMenu.prototype._getBuiltInMenuData = function () {
        var isMac = Core_1._util._isMacOS();
        return [
            {
                text: sR().copy,
                name: MENUITEM_NAME_PREFIX + COPY,
                command: COMMAND_PREFIX + COPY,
                iconClass: ICON_CLASS_PREFIX + COPY,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + SLICER + CORNER + PIVOT_TABLE,
                shortcut: isMac ? '⌘+C' : 'Ctrl+C'
            },
            {
                text: sR().cut,
                name: MENUITEM_NAME_PREFIX + CUT,
                command: COMMAND_PREFIX + CUT,
                iconClass: ICON_CLASS_PREFIX + CUT,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + SLICER + CORNER,
                shortcut: isMac ? '⌘+X' : 'Ctrl+X'
            },
            {
                text: sR().pasteOptions,
                name: MENUITEM_NAME_PREFIX + PASTE_OPTIONS,
                iconClass: ICON_CLASS_PREFIX + PASTE_OPTIONS,
                type: GROUP_HEADER,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + SLICER + CORNER,
            },
            {
                command: COMMAND_PREFIX + PASTE_ALL,
                name: MENUITEM_NAME_PREFIX + PASTE_ALL,
                iconClass: ICON_CLASS_PREFIX + PASTE_ALL,
                group: MENUITEM_NAME_PREFIX + PASTE_OPTIONS,
                text: sR().pasteAll,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + SLICER + CORNER,
                shortcut: isMac ? '⌘+V' : 'Ctrl+V'
            },
            {
                command: COMMAND_PREFIX + PASTE_FORMULA,
                name: MENUITEM_NAME_PREFIX + PASTE_FORMULA,
                iconClass: ICON_CLASS_PREFIX + PASTE_FORMULA,
                group: MENUITEM_NAME_PREFIX + PASTE_OPTIONS,
                text: sR().pasteFormula,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + CORNER
            },
            {
                command: COMMAND_PREFIX + PASTE_VALUES,
                name: MENUITEM_NAME_PREFIX + PASTE_VALUES,
                iconClass: ICON_CLASS_PREFIX + PASTE_VALUES,
                group: MENUITEM_NAME_PREFIX + PASTE_OPTIONS,
                text: sR().pasteValues,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + CORNER
            },
            {
                command: COMMAND_PREFIX + PASTE_FORMATTING,
                name: MENUITEM_NAME_PREFIX + PASTE_FORMATTING,
                iconClass: ICON_CLASS_PREFIX + PASTE_FORMATTING,
                group: MENUITEM_NAME_PREFIX + PASTE_OPTIONS,
                text: sR().pasteFormatting,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + CORNER
            },
            {
                command: COMMAND_PREFIX + PASTE_VALUES_FORMATTING,
                name: MENUITEM_NAME_PREFIX + PASTE_VALUES_FORMATTING,
                iconClass: ICON_CLASS_PREFIX + PASTE_VALUES_FORMATTING,
                group: MENUITEM_NAME_PREFIX + PASTE_OPTIONS,
                text: sR().pasteValuesFormatting,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + CORNER
            },
            {
                command: COMMAND_PREFIX + PASTE_FORMULA_FORMATTING,
                name: MENUITEM_NAME_PREFIX + PASTE_FORMULA_FORMATTING,
                iconClass: ICON_CLASS_PREFIX + PASTE_FORMULA_FORMATTING,
                group: MENUITEM_NAME_PREFIX + PASTE_OPTIONS,
                text: sR().pasteFormulaFormatting,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + CORNER
            },
            {
                text: sR().paste,
                name: MENUITEM_NAME_PREFIX + PASTE,
                command: COMMAND_PREFIX + PASTE_VALUES,
                iconClass: ICON_CLASS_PREFIX + PASTE_OPTIONS,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + CORNER
            },
            { type: SEPARATOR },
            {
                text: sR().pinRows,
                name: MENUITEM_NAME_PREFIX + PIN_ROWS,
                command: COMMAND_PREFIX + PIN_ROWS,
                workArea: ROW_HEADER
            },
            {
                text: sR().pinColumns,
                name: MENUITEM_NAME_PREFIX + PIN_COLUMNS,
                command: COMMAND_PREFIX + PIN_COLUMNS,
                workArea: COL_HEADER
            },
            { type: SEPARATOR },
            {
                text: sR().clearContents,
                command: COMMAND_PREFIX + CLEAR_CONTENT,
                name: MENUITEM_NAME_PREFIX + CLEAR_CONTENT,
                workArea: VIEWPORT + COL_HEADER + ROW_HEADER + CORNER
            },
            { type: SEPARATOR },
            {
                text: sR().headerInsertCopiedCells,
                name: MENUITEM_NAME_PREFIX + ROW_HEADER + INSERT_COPY_CELLS,
                command: COMMAND_PREFIX + ROW_HEADER + INSERT_COPY_CELLS,
                workArea: ROW_HEADER
            },
            {
                text: sR().headerInsertCutCells,
                name: MENUITEM_NAME_PREFIX + ROW_HEADER + INSERT_CUT_CELLS,
                command: COMMAND_PREFIX + ROW_HEADER + INSERT_CUT_CELLS,
                workArea: ROW_HEADER
            },
            {
                text: sR().headerInsertCopiedCells,
                name: MENUITEM_NAME_PREFIX + COL_HEADER + INSERT_COPY_CELLS,
                command: COMMAND_PREFIX + COL_HEADER + INSERT_COPY_CELLS,
                workArea: COL_HEADER
            },
            {
                text: sR().headerInsertCutCells,
                name: MENUITEM_NAME_PREFIX + COL_HEADER + INSERT_CUT_CELLS,
                command: COMMAND_PREFIX + COL_HEADER + INSERT_CUT_CELLS,
                workArea: COL_HEADER
            },
            {
                text: sR().insertCopiedCells,
                name: MENUITEM_NAME_PREFIX + INSERT_COPY_CELLS,
                subMenu: [
                    {
                        text: sR().shiftCellsRight,
                        name: MENUITEM_NAME_PREFIX + INSERT_COPY_CELLS + SHIFT_CELLS_RIGHT,
                        command: COMMAND_PREFIX + INSERT_COPY_CELLS + SHIFT_CELLS_RIGHT,
                        iconClass: ICON_CLASS_PREFIX + SHIFT_CELLS_RIGHT
                    },
                    {
                        text: sR().shiftCellsDown,
                        name: MENUITEM_NAME_PREFIX + INSERT_COPY_CELLS + SHIFT_CELLS_DOWN,
                        command: COMMAND_PREFIX + INSERT_COPY_CELLS + SHIFT_CELLS_DOWN,
                        iconClass: ICON_CLASS_PREFIX + SHIFT_CELLS_DOWN
                    }
                ],
                workArea: VIEWPORT
            },
            {
                text: sR().insertCutCells,
                name: MENUITEM_NAME_PREFIX + INSERT_CUT_CELLS,
                subMenu: [
                    {
                        text: sR().shiftCellsRight,
                        name: MENUITEM_NAME_PREFIX + INSERT_CUT_CELLS + SHIFT_CELLS_RIGHT,
                        command: COMMAND_PREFIX + INSERT_CUT_CELLS + SHIFT_CELLS_RIGHT,
                        iconClass: ICON_CLASS_PREFIX + SHIFT_CELLS_RIGHT
                    },
                    {
                        text: sR().shiftCellsDown,
                        name: MENUITEM_NAME_PREFIX + INSERT_CUT_CELLS + SHIFT_CELLS_DOWN,
                        command: COMMAND_PREFIX + INSERT_CUT_CELLS + SHIFT_CELLS_DOWN,
                        iconClass: ICON_CLASS_PREFIX + SHIFT_CELLS_DOWN
                    }
                ],
                workArea: VIEWPORT
            },
            {
                text: sR().insertRows,
                name: MENUITEM_NAME_PREFIX + INSERT_ROWS,
                command: COMMAND_PREFIX + INSERT_ROWS,
                workArea: ROW_HEADER
            },
            {
                text: sR().insertColumns,
                name: MENUITEM_NAME_PREFIX + INSERT_COLUMNS,
                command: COMMAND_PREFIX + INSERT_COLUMNS,
                workArea: COL_HEADER
            },
            {
                text: sR().deleteRows,
                name: MENUITEM_NAME_PREFIX + DELETE_ROWS,
                command: COMMAND_PREFIX + DELETE_ROWS,
                workArea: ROW_HEADER
            },
            {
                text: sR().deleteColumns,
                name: MENUITEM_NAME_PREFIX + DELETE_COLUMNS,
                command: COMMAND_PREFIX + DELETE_COLUMNS,
                workArea: COL_HEADER
            },
            { type: SEPARATOR },
            {
                text: sR().tableInsert,
                name: MENUITEM_NAME_PREFIX + TABLE_INSERT,
                subMenu: [
                    {
                        text: sR().tableInsertColumnsLeft,
                        name: MENUITEM_NAME_PREFIX + TABLE_INSERT_COLUMNS_LEFT,
                        command: TABLE_INSERT_COLUMNS_LEFT_FOR_CONTEXT_MENU,
                        iconClass: ICON_CLASS_PREFIX + TABLE_INSERT_COLUMNS_LEFT
                    },
                    {
                        text: sR().tableInsertColumnsRight,
                        name: MENUITEM_NAME_PREFIX + TABLE_INSERT_COLUMNS_RIGHT,
                        command: TABLE_INSERT_COLUMNS_RIGHT_FOR_CONTEXT_MENU,
                        iconClass: ICON_CLASS_PREFIX + TABLE_INSERT_COLUMNS_RIGHT
                    },
                    {
                        text: sR().tableInsertRowsAbove,
                        name: MENUITEM_NAME_PREFIX + TABLE_INSERT_ROWS_ABOVE,
                        command: TABLE_INSERT_ROWS_ABOVE_FOR_CONTEXT_MENU,
                        iconClass: ICON_CLASS_PREFIX + TABLE_INSERT_ROWS_ABOVE
                    },
                    {
                        text: sR().tableInsertRowsBelow,
                        name: MENUITEM_NAME_PREFIX + TABLE_INSERT_ROWS_BELOW,
                        command: TABLE_INSERT_ROWS_BELOW_FOR_CONTEXT_MENU,
                        iconClass: ICON_CLASS_PREFIX + TABLE_INSERT_ROWS_BELOW
                    }
                ],
                workArea: TABLE
            },
            {
                text: sR().tableDelete,
                name: MENUITEM_NAME_PREFIX + TABLE_DELETE,
                subMenu: [
                    {
                        text: sR().tableDeleteColumns,
                        name: MENUITEM_NAME_PREFIX + TABLE_DELETE_COLUMNS,
                        command: TABLE_DELETE_COLUMNS_FOR_CONTEXT_MENU,
                        iconClass: ICON_CLASS_PREFIX + TABLE_DELETE_COLUMNS
                    },
                    {
                        text: sR().tableDeleteRows,
                        name: MENUITEM_NAME_PREFIX + TABLE_DELETE_ROWS,
                        command: TABLE_DELETE_ROWS_FOR_CONTEXT_MENU,
                        iconClass: ICON_CLASS_PREFIX + TABLE_DELETE_ROWS
                    }
                ],
                workArea: TABLE
            },
            { type: SEPARATOR },
            {
                text: sR().insertSheet,
                name: MENUITEM_NAME_PREFIX + INSERT_SHEET,
                command: COMMAND_PREFIX + INSERT_SHEET,
                workArea: SHEET_TAB
            },
            {
                text: sR().deleteSheet,
                name: MENUITEM_NAME_PREFIX + DELETE_SHEET,
                command: COMMAND_PREFIX + DELETE_SHEET,
                workArea: SHEET_TAB
            },
            { type: SEPARATOR },
            {
                text: sR().filter,
                name: MENUITEM_NAME_PREFIX + FILTER,
                command: COMMAND_PREFIX + FILTER,
                workArea: VIEWPORT + CORNER
            },
            {
                text: sR().sort,
                name: MENUITEM_NAME_PREFIX + SORT,
                subMenu: [
                    {
                        text: sR().sortAscend,
                        name: MENUITEM_NAME_PREFIX + SORT_ASCEND,
                        command: COMMAND_PREFIX + SORT_ASCEND,
                        iconClass: ICON_CLASS_PREFIX + SORT_ASCEND
                    },
                    {
                        text: sR().sortDescend,
                        name: MENUITEM_NAME_PREFIX + SORT_DESCEND,
                        command: COMMAND_PREFIX + SORT_DESCEND,
                        iconClass: ICON_CLASS_PREFIX + SORT_DESCEND
                    }
                ],
                workArea: VIEWPORT + CORNER
            },
            {
                text: sR().slicerSortAscend,
                name: MENUITEM_NAME_PREFIX + SLICER_SORT_ASCEND,
                command: COMMAND_PREFIX + SLICER_SORT_ASCEND,
                iconClass: ICON_CLASS_PREFIX + SORT_ASCEND,
                workArea: SLICER
            },
            {
                text: sR().slicerSortDescend,
                name: MENUITEM_NAME_PREFIX + SLICER_SORT_DESCEND,
                command: COMMAND_PREFIX + SLICER_SORT_DESCEND,
                iconClass: ICON_CLASS_PREFIX + SORT_DESCEND,
                workArea: SLICER
            },
            { type: SEPARATOR },
            {
                text: sR().insertComment,
                name: MENUITEM_NAME_PREFIX + INSERT_COMMENT,
                command: COMMAND_PREFIX + INSERT_COMMENT,
                iconClass: ICON_CLASS_PREFIX + INSERT_COMMENT,
                workArea: VIEWPORT + CORNER
            },
            {
                text: sR().editComment,
                name: MENUITEM_NAME_PREFIX + EDIT_COMMENT,
                command: COMMAND_PREFIX + EDIT_COMMENT,
                iconClass: ICON_CLASS_PREFIX + EDIT_COMMENT,
                workArea: VIEWPORT + CORNER
            },
            {
                text: sR().deleteComment,
                name: MENUITEM_NAME_PREFIX + DELETE_COMMENT,
                command: COMMAND_PREFIX + DELETE_COMMENT,
                iconClass: ICON_CLASS_PREFIX + DELETE_COMMENT,
                workArea: VIEWPORT + CORNER
            },
            {
                text: sR().toggleComment,
                name: MENUITEM_NAME_PREFIX + TOGGLE_COMMENT,
                command: COMMAND_PREFIX + TOGGLE_COMMENT,
                workArea: VIEWPORT + CORNER
            },
            { type: SEPARATOR },
            {
                text: sR().hideRows,
                name: MENUITEM_NAME_PREFIX + HIDE_ROWS,
                command: COMMAND_PREFIX + HIDE_ROWS,
                workArea: ROW_HEADER
            },
            {
                text: sR().unhideRows,
                name: MENUITEM_NAME_PREFIX + UNHIDE_ROWS,
                command: COMMAND_PREFIX + UNHIDE_ROWS,
                workArea: ROW_HEADER
            },
            {
                text: sR().hideColumns,
                name: MENUITEM_NAME_PREFIX + HIDE_COLUMNS,
                command: COMMAND_PREFIX + HIDE_COLUMNS,
                workArea: COL_HEADER
            },
            {
                text: sR().unhideColumns,
                name: MENUITEM_NAME_PREFIX + UNHIDE_COLUMNS,
                command: COMMAND_PREFIX + UNHIDE_COLUMNS,
                workArea: COL_HEADER
            },
            { type: SEPARATOR },
            {
                text: sR().hideSheet,
                name: MENUITEM_NAME_PREFIX + HIDE_SHEET,
                command: COMMAND_PREFIX + HIDE_SHEET,
                workArea: SHEET_TAB
            },
            {
                text: sR().unhideSheet,
                name: MENUITEM_NAME_PREFIX + UNHIDE_SHEET,
                command: COMMAND_PREFIX + UNHIDE_SHEET,
                workArea: SHEET_TAB
            },
            { type: SEPARATOR },
            {
                text: sR().removeSlicer,
                name: MENUITEM_NAME_PREFIX + REMOVE_SLICER,
                command: COMMAND_PREFIX + REMOVE_SLICER,
                workArea: SLICER
            },
            { type: SEPARATOR },
            {
                text: sR().sort,
                name: MENUITEM_NAME_PREFIX + SORT,
                subMenu: [
                    {
                        text: sR().sortAscend,
                        name: MENUITEM_NAME_PREFIX + SORT_ASCEND,
                        command: PivotSort,
                        iconClass: ICON_CLASS_PREFIX + SORT_ASCEND,
                        commandOptions: {
                            subType: 0
                        },
                        placeholder: SORT_TYPE
                    },
                    {
                        text: sR().sortDescend,
                        name: MENUITEM_NAME_PREFIX + SORT_DESCEND,
                        command: PivotSort,
                        iconClass: ICON_CLASS_PREFIX + SORT_DESCEND,
                        commandOptions: {
                            subType: 1
                        },
                        placeholder: SORT_TYPE
                    }
                ],
                workArea: PIVOT_HEADER
            },
            {
                text: sR().pivotTableRefresh,
                name: MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_REFRESH,
                command: PIVOT_TABLE_REFRESH,
                iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_REFRESH,
                workArea: PIVOT_PAGE_FILTER + PIVOT_CORNER + PIVOT_CONTENT + PIVOT_HEADER + PIVOT_GRAND_TOTAL + PIVOT_EMPTY_LABEL
            },
            {
                text: sR().pivotTableRemove_,
                name: MENUITEM_NAME_PIVOT_TABLE + REMOVE_FIELD,
                command: REMOVE_FIELD,
                iconClass: ICON_CLASS_PREFIX + REMOVE_FIELD,
                workArea: PIVOT_PAGE_FILTER + PIVOT_CORNER + PIVOT_CONTENT + PIVOT_HEADER,
                placeholder: FIELD_NAME
            },
            {
                text: sR().pivotTableRemoveGrandTotal,
                name: MENUITEM_NAME_PIVOT_TABLE + REMOVE_PIVOT_GRAND_TOTAL,
                command: REMOVE_PIVOT_GRAND_TOTAL,
                workArea: PIVOT_GRAND_TOTAL
            },
            {
                text: sR().pivotTableSummarizeValuesBy,
                name: MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_SUMMARIZE_VALUES_BY,
                subMenu: [
                    {
                        text: sR().pivotTableSum,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_SUM,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            subTotalType: 8
                        }
                    },
                    {
                        text: sR().pivotTableCount,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_COUNT,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            subTotalType: 1
                        }
                    },
                    {
                        text: sR().pivotTableAverage,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_AVERAGE,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            subTotalType: 0
                        }
                    },
                    {
                        text: sR().pivotTableMax,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_MAX,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            subTotalType: 3
                        }
                    },
                    {
                        text: sR().pivotTableMin,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_MIN,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            subTotalType: 4
                        }
                    },
                    {
                        text: sR().pivotTableProduct,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_PRODUCT,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            subTotalType: 5
                        }
                    },
                ],
                workArea: PIVOT_CORNER + PIVOT_CONTENT + PIVOT_GRAND_TOTAL
            },
            {
                text: sR().pivotTableShowValueAs,
                name: MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_SHOW_VALUE_AS,
                subMenu: [
                    {
                        text: sR().pivotTableNoCalculation,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_NO_CALCULATION,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            showValueAsType: 0
                        }
                    },
                    {
                        text: sR().pivotTableGrandTotal,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_GRAND_TOTAL,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            showValueAsType: 1
                        }
                    },
                    {
                        text: sR().pivotTableColumnTotal,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_COLUMN_TOTAL,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            showValueAsType: 3
                        }
                    },
                    {
                        text: sR().pivotTableRowTotal,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_ROW_TOTAL,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            showValueAsType: 2
                        }
                    },
                    {
                        text: sR().pivotTableOf,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_OF,
                        command: OPEN_PIVOT_SHOW_VALUE_AS_DIALOG,
                        commandOptions: {
                            showValueAsType: 4
                        }
                    },
                    {
                        text: sR().pivotTableParentRowTotal,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_PARENT_ROW_TOTAL,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            showValueAsType: 5
                        }
                    },
                    {
                        text: sR().pivotTableParentColumnTotal,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_PARENT_COLUMN_TOTAL,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            showValueAsType: 6
                        }
                    },
                    {
                        text: sR().pivotTableOfParentTotal,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_OF_PARENT_TOTAL,
                        command: OPEN_PIVOT_SHOW_VALUE_AS_DIALOG,
                        commandOptions: {
                            showValueAsType: 7
                        }
                    },
                    {
                        text: sR().pivotTableDifferenceFrom,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_DIFFERENCE_FROM,
                        command: OPEN_PIVOT_SHOW_VALUE_AS_DIALOG,
                        commandOptions: {
                            showValueAsType: 8
                        }
                    },
                    {
                        text: sR().pivotTablePercentDifferenceFrom,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_PERCENT_DIFFERENCE_FROM,
                        command: OPEN_PIVOT_SHOW_VALUE_AS_DIALOG,
                        commandOptions: {
                            showValueAsType: 9
                        }
                    },
                    {
                        text: sR().pivotTableRunningTotalIN,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_RUNNING_TOTAL_IN,
                        command: OPEN_PIVOT_SHOW_VALUE_AS_DIALOG,
                        commandOptions: {
                            showValueAsType: 10
                        }
                    },
                    {
                        text: sR().pivotTablePercentRunningTotalIn,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_PERCENT_RUNNING_TOTAL_IN,
                        command: OPEN_PIVOT_SHOW_VALUE_AS_DIALOG,
                        commandOptions: {
                            showValueAsType: 11
                        }
                    },
                    {
                        text: sR().pivotTableRankSmallestToLargest,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_RANK_SMALLEST_TO_LARGEST,
                        command: OPEN_PIVOT_SHOW_VALUE_AS_DIALOG,
                        commandOptions: {
                            showValueAsType: 12
                        }
                    },
                    {
                        text: sR().pivotTableRankLargestToSmallest,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_RANK_LARGEST_TO_SMALLEST,
                        command: OPEN_PIVOT_SHOW_VALUE_AS_DIALOG,
                        commandOptions: {
                            showValueAsType: 13
                        }
                    },
                    {
                        text: sR().pivotTableIndex,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_INDEX,
                        command: UPDATE_PIVOT_VALUE_FIELD_CMD,
                        commandOptions: {
                            showValueAsType: 14
                        }
                    }
                ],
                workArea: PIVOT_CORNER + PIVOT_CONTENT
            },
            {
                text: sR().pivotTableFilter,
                name: MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_FILTER,
                iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_FILTER,
                subMenu: [
                    {
                        text: sR().pivotTableClearFilterFrom_,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_CLEAR_FILTER_FROM,
                        command: ClearCommand,
                        iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_CLEAR_FILTER_FROM,
                        placeholder: FIELD_NAME,
                        commandOptions: {
                            clearType: 0
                        }
                    },
                    {
                        text: sR().pivotTableKeepOnlySelectedItems,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_KEEP_ONLY_SELECTED_ITEMS,
                        command: FILTER_FIELD_VALUE,
                        commandOptions: {
                            subType: 1
                        }
                    },
                    {
                        text: sR().pivotTableHideSelectedItems,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_HIDE_SELECTED_ITEMS,
                        command: FILTER_FIELD_VALUE,
                        commandOptions: {
                            subType: 2
                        }
                    },
                    {
                        text: sR().pivotTableTop10,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_TOP10,
                        command: CREATE_DIALOG_FOR_VALUE_FILTER,
                        commandOptions: {
                            isTop10: true
                        }
                    },
                    {
                        text: sR().pivotTableLabelFilters,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_LABEL_FILTERS,
                        command: CREATE_DIALOG_FOR_LABEL_FILTER
                    },
                    {
                        text: sR().pivotTableValueFilters,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_VALUE_FILTERS,
                        command: CREATE_DIALOG_FOR_VALUE_FILTER
                    },
                ],
                workArea: PIVOT_HEADER
            },
            {
                text: sR().pivotTableExpandOrCollapse,
                name: MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_EXPAND_OR_COLLAPSE,
                subMenu: [
                    {
                        text: sR().pivotTableExpand,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_EXPAND,
                        command: PIVOT_TABLE_EXPAND,
                        iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_EXPAND,
                    },
                    {
                        text: sR().pivotTableCollapse,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_COLLAPSE,
                        command: PIVOT_TABLE_COLLAPSE,
                        iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_COLLAPSE,
                    },
                    {
                        text: sR().pivotTableExpandEntireField,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_EXPAND_ENTIRE_FIELD,
                        command: PIVOT_TABLE_EXPAND_ENTIRE_FIELD,
                        iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_EXPAND_ENTIRE_FIELD,
                    },
                    {
                        text: sR().pivotTableCollapseEntireField,
                        name: MENUITEM_NAME_PREFIX + PIVOT_TABLE_COLLAPSE_ENTIRE_FIELD,
                        command: PIVOT_TABLE_COLLAPSE_ENTIRE_FIELD,
                        iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_COLLAPSE_ENTIRE_FIELD,
                    }
                ],
                workArea: PIVOT_HEADER
            },
            {
                text: sR().pivotTableGroup,
                name: MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_GROUP,
                command: OPEN_PIVOT_GROUP_DIALOG,
                iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_GROUP,
                workArea: PIVOT_HEADER
            },
            {
                text: sR().pivotTableUnGroup,
                name: MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_UNGROUP,
                command: PIVOT_TABLE_UNGROUP,
                iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_UNGROUP,
                workArea: PIVOT_HEADER
            },
            {
                text: sR().pivotTableShowDetails,
                name: MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_SHOW_DETAILS,
                command: PIVOT_TABLE_SHOW_DETAILS,
                iconClass: ICON_CLASS_PREFIX + PIVOT_TABLE_SHOW_DETAILS,
                workArea: PIVOT_CONTENT
            },
            {
                text: sR().pivotTableValueFieldSettings,
                name: MENUITEM_NAME_PIVOT_TABLE + OPEN_VALUE_FIELD_SETTING_DIALOG,
                command: OPEN_VALUE_FIELD_SETTING_DIALOG,
                iconClass: ICON_CLASS_PREFIX + OPEN_VALUE_FIELD_SETTING_DIALOG,
                workArea: PIVOT_CORNER + PIVOT_CONTENT + PIVOT_GRAND_TOTAL,
            },
        ];
    };
    ContextMenu.prototype._init = function (spread) {
        var self = this;
        if (!self._initialized) {
            self._commandManager = spread.commandManager();
            if (isNullOrUndefined(self._contextMenuDialog)) {
                self._contextMenuDialog = new context_menu_dialog_1.ContextMenuViewDialog(spread._getContainerDiv(), $(spread._userEventsElem));
            }
            self._registerCommand(spread);
            self._featureRelatedMenuData = {
                filter: {
                    menuDataDict: [
                        MENUITEM_NAME_PREFIX + FILTER
                    ],
                    checkFunction: function (sheet) {
                        if (sheet.rowFilter) {
                            return true;
                        }
                    }
                },
                comments: {
                    menuDataDict: [
                        MENUITEM_NAME_PREFIX + INSERT_COMMENT,
                        MENUITEM_NAME_PREFIX + EDIT_COMMENT,
                        MENUITEM_NAME_PREFIX + DELETE_COMMENT,
                        MENUITEM_NAME_PREFIX + TOGGLE_COMMENT
                    ],
                    checkFunction: function (sheet) {
                        if (sheet.comments) {
                            return true;
                        }
                    }
                },
                slicer: {
                    menuDataDict: [
                        MENUITEM_NAME_PREFIX + SLICER_SORT_ASCEND,
                        MENUITEM_NAME_PREFIX + SLICER_SORT_DESCEND,
                        MENUITEM_NAME_PREFIX + REMOVE_SLICER
                    ],
                    checkFunction: function (sheet) {
                        if (sheet.slicers) {
                            return true;
                        }
                    }
                },
                floatingObject: {
                    menuDataDict: [
                        MENUITEM_NAME_PREFIX + PASTE_VALUES,
                        MENUITEM_NAME_PREFIX + PASTE_FORMATTING,
                        MENUITEM_NAME_PREFIX + PASTE_FORMULA
                    ],
                    checkFunction: function (sheet) {
                        if (!sheet._getFloatingObjectClipboardHelper) {
                            return true;
                        }
                        var ch = sheet._getFloatingObjectClipboardHelper();
                        var fromSheet = ch.fromSheet;
                        var clipboardData = fromSheet && fromSheet._clipboardFloatingObjectData;
                        if (!clipboardData) {
                            return true;
                        }
                    }
                },
                table: {
                    menuDataDict: [
                        MENUITEM_NAME_PREFIX + TABLE_INSERT,
                        MENUITEM_NAME_PREFIX + TABLE_DELETE
                    ],
                    checkFunction: function (sheet) {
                        if (sheet.tables) {
                            return true;
                        }
                    }
                },
                tableSheet: {
                    menuDataDict: [
                        MENUITEM_NAME_PREFIX + PASTE,
                        MENUITEM_NAME_PREFIX + PIN_ROWS,
                        MENUITEM_NAME_PREFIX + PIN_COLUMNS
                    ],
                    checkFunction: function (sheet) {
                        if (sheet._parentSheet) {
                            return true;
                        }
                    }
                }
            };
            self._initialized = true;
        }
    };
    ContextMenu.prototype._doContextMenu = function (event, spread) {
        var self = this;
        spread.focus();
        var hitInfo = self._getHitInfo(event, spread);
        var sheet = Core_1._getActiveSheet(spread);
        if (isNullOrUndefined(hitInfo) || isNullOrUndefined(sheet)) {
            cancelDefault(event);
            return;
        }
        var activeCellPosition = {
            row: sheet.getActiveRowIndex(),
            col: sheet.getActiveColumnIndex()
        };

        if ((sheet.isEditing()
            && hitInfo.worksheetHitInfo
            && hitInfo.worksheetHitInfo.col === activeCellPosition.col
            && hitInfo.worksheetHitInfo.row === activeCellPosition.row)
            || (spread.getTab()
                && spread.getTab()._tabNameEditor)) {
            return;
        }
        self._init(spread);
        self._preOpenContextMenuView(hitInfo, spread);
        var selection = sheet.getSelections()[0];
        if (!isNullOrUndefined(selection) && !isNullOrUndefined(sheet.pivotTables)) {
            var pivotTable = sheet.pivotTables.findPivotTable(selection.row, selection.col);
            if (!isNullOrUndefined(pivotTable) && hitInfo.worksheetHitInfo) {
                hitInfo.worksheetHitInfo.pivotTableInfo = pivotTable;
                var _pivotCellInfo = pivotTable.getPivotInfoImp(selection.row, selection.col, false, false, true);
                if (!isNullOrUndefined(_pivotCellInfo)) {
                    hitInfo.worksheetHitInfo.pivotTableCellInfo = _pivotCellInfo;
                }
            }
        }
        var itemsDataForShown = self._filterDataWithHitInfo(self.menuData, hitInfo, spread);
        var result = self.onOpenMenu(self.menuData, itemsDataForShown, hitInfo, spread, event);
        if (!result) {
            cancelDefault(event);
            if (itemsDataForShown.length) {
                self._openContextMenuImp(itemsDataForShown, hitInfo, spread);
            }
        }
    };
    ContextMenu.prototype._preOpenContextMenuView = function (hitInfo, spread) {
        var self = this;
        if (self._contextMenuDialog._isHitOutside(hitInfo)) {
            self._switchContextByHitInfo(hitInfo, spread);
        }
    };
    ContextMenu.prototype._switchContextByHitInfo = function (hitInfo, spread) {
        var self = this;
        var sheet = Core_1._getActiveSheet(spread);
        if (sheet.isEditing()) {
            sheet.endEdit();
        }
        if (self._isHitOnSheetTab(hitInfo)) {
            self._switchTabStripContextHandler(hitInfo, spread);
        }
        else if (self._isHitOnWorkSheet(hitInfo)) {
            self._switchWorkSheetContextHandler(hitInfo, spread);
        }
    };
    ContextMenu.prototype._isHitOnWorkSheet = function (hitInfo) {
        return !!hitInfo.worksheetHitInfo;
    };
    ContextMenu.prototype._isHitOutsideSelection = function (selections, rowIndex, colIndex, sheetArea) {
        var isHitOutsideSelection = true, i, selection;
        if (sheetArea === 1 ) {
            for (i = 0; i < selections.length; i++) {
                selection = selections[i];
                if (selection.row === -1
                    && colIndex >= selection.col
                    && colIndex < selection.col + selection.colCount) {
                    isHitOutsideSelection = false;
                }
            }
            return isHitOutsideSelection;
        }
        if (sheetArea === 2 ) {
            for (i = 0; i < selections.length; i++) {
                selection = selections[i];
                if (selection.col === -1
                    && rowIndex >= selection.row
                    && rowIndex < selection.row + selection.rowCount) {
                    isHitOutsideSelection = false;
                }
            }
            return isHitOutsideSelection;
        }
        for (i = 0; i < selections.length; i++) {
            selection = selections[i];
            if (selection.contains(rowIndex, colIndex)) {
                return false;
            }
        }
        return true;
    };
    ContextMenu.prototype._isHitOnSheetTab = function (hitInfo) {
        return !!(hitInfo.tabStripHitInfo && hitInfo.tabStripHitInfo.sheetTab);
    };
    ContextMenu.prototype._getHitSheetName = function (hitInfo) {
        return hitInfo.tabStripHitInfo.sheetTab.sheetName;
    };
    ContextMenu.prototype._getHitSheetIndex = function (hitInfo) {
        return hitInfo.tabStripHitInfo.sheetTab.sheetIndex;
    };
    ContextMenu.prototype._switchWorkSheetContextHandler = function (hitInfo, spread) {
        var self = this;
        var sheet = Core_1._getActiveSheet(spread);
        var worksheetHitInfo = hitInfo.worksheetHitInfo;
        if (worksheetHitInfo.floatingObjectHitInfo
            || worksheetHitInfo.commentHitInfo
            || worksheetHitInfo.shapeHitInfo) {
            return;
        }
        self._changeSelection(sheet, worksheetHitInfo);
        self._handleCommentEvent(sheet);
    };
    ContextMenu.prototype._handleCommentEvent = function (sheet) {
        var row = sheet.getActiveRowIndex();
        var col = sheet.getActiveColumnIndex();
        var commentManager = sheet.comments;
        if (commentManager) {
            var comment = commentManager.get(row, col);
            if (comment && commentManager._hoverShowComment === comment) {
                commentManager._hide(comment);
            }
        }
    };
    ContextMenu.prototype._isHitOnViewPort = function (worksheetHitInfo) {
        return worksheetHitInfo.hitTestType === 3 ;
    };
    ContextMenu.prototype._updateValidationUI = function (sheet, r, c) {
        sheet._updateValidationUI && sheet._updateValidationUI(r, c);
    };
    ContextMenu.prototype._changeSelection = function (sheet, worksheetHitInfo) {
        var self = this;
        var oldSelections = sheet._modelManager.getSelections(), r = worksheetHitInfo.row, c = worksheetHitInfo.col;
        if (!sheet._canSelect(worksheetHitInfo.rowViewportIndex < 0 ? -1 : worksheetHitInfo.row, worksheetHitInfo.colViewportIndex < 0 ? -1 : worksheetHitInfo.col)) {
            return;
        }
        var changeFlag = false;
        if (self._isHitOutsideSelection(oldSelections, r, c, worksheetHitInfo.hitTestType)) {
            changeFlag = true;
        }
        else {
            var shapes = (sheet.shapes && sheet.shapes.all()) || [];
            var selectedShapes = shapes.filter(function (sp) { return sp.isSelected(); });
            if (selectedShapes.length > 0) {
                selectedShapes.forEach(function (sp) { return sp.isSelected(false); });
                changeFlag = true;
            }
        }
        if (changeFlag) {
            sheet._eventHandler._changeSelection(sheet, worksheetHitInfo, r, c);
            sheet._eventHandler._stopSelecting();
        }
    };
    ContextMenu.prototype._switchTabStripContextHandler = function (hitInfo, spread) {
        var index = this._getHitSheetIndex(hitInfo);
        var switchSheet = spread._getSheetOrSheetTab(index);
        if (!switchSheet) {
            return;
        }
        if (!switchSheet._isSelectedImp()) {
            var sheets = spread._getSheetsAndSheetTabs();
            sheets.forEach(function (sheetItem) {
                if (sheetItem._isSelectedImp()) {
                    sheetItem._isSelectedImp(false, true);
                }
            });
            switchSheet._isSelectedImp(true, true);
        }
        spread._setActiveSheetOrSheetTabIndexImp(index, 2 , false, true);
        this._specialSwitchContextForTabUnhide(this.menuData, hitInfo, spread);
    };
    ContextMenu.prototype._getHitInfo = function (event, spread) {
        var offset = spread._getSpreadOffset();
        var x = event.pageX - offset.left;
        var y = event.pageY - offset.top;
        return spread.hitTest(x, y, true);
    };
    ContextMenu.prototype.setDialogContainerName = function (name) {
        self._contextMenuDialog.name = name;
    };
    ContextMenu.prototype.onOpenMenu = function (menuData, itemsDataForShown, hitInfo, spread, event) {
    };
    ContextMenu.prototype._openContextMenuImp = function (itemsDataForShown, hitInfo, spread) {
        var self = this;
        if (self._contextMenuDialog._isHitOutside(hitInfo)) {
            self._clearOldContextMenu();
            spread._removeTooltip();
            self._showNewContextMenu(itemsDataForShown, hitInfo, spread);
        }
    };
    ContextMenu.prototype._clearOldContextMenu = function () {
        this._contextMenuDialog.close();
    };
    ContextMenu.prototype._showNewContextMenu = function (itemsDataForShown, hitInfo, spread) {
        var self = this;
        let posX = hitInfo.x;
        var posY = hitInfo.y;
        if (hitInfo.tabStripHitInfo && hitInfo.tabStripHitInfo.sheetTab
            && hitInfo.tabStripHitInfo.sheetTab.sheetName !== 'newSheet' && spread.options.tabStripHost) {
            self._contextMenuDialog._initHost = self._contextMenuDialog._getHost();
            self._contextMenuDialog._host = spread._tabStripContainer;
            posX = hitInfo.tabBasedX;
            posY = hitInfo.tabBasedY;
        }
        self._contextMenuDialog._open(self.menuView, itemsDataForShown, posX, posY, spread);
    };
    ContextMenu.prototype._filterDataWithHitInfo = function (allMenuData, hitInfo, spread) {
        var self = this;
        var menuData = {};
        $.extend(true, menuData, allMenuData);
        var itemsDataForShown = self._perpareItemsDataForShow(menuData, hitInfo, spread);
        self._filterMenuDataByHitArea(itemsDataForShown, hitInfo);
        self._filterMenuDataByFeatures(itemsDataForShown, spread);
        self._filterTableMenuDataBySelections(itemsDataForShown, spread);
        self._checkMenuItemAvailable(itemsDataForShown, spread);
        self._trimNullObject(itemsDataForShown);
        itemsDataForShown = self._trimSeparatorLine(itemsDataForShown);
        self._filterInsertCellsAndInsert(itemsDataForShown);
        return itemsDataForShown;
    };
    ContextMenu.prototype._perpareItemsDataForShow = function (menuDatas, hitInfo, spread) {
        var self = this;
        var itemsDataForShown = [];
        $.each(menuDatas, function (menuItemIndex, menuItemData) {
            if (isNullOrUndefined(menuItemData)) {
                return;
            }
            if (menuItemData.type === SEPARATOR) {
                itemsDataForShown.push(menuItemData);
            }
            $.each(filterMap, function (workAreaType, checkFunction) {
                if (checkFunction(hitInfo, spread, menuItemData)) {
                    var result = self._filterPivotTableMenuDataBySelections(menuItemData, hitInfo);
                    if (result) {
                        itemsDataForShown.push(menuItemData);
                    }
                }
            });
        });
        return itemsDataForShown;
    };
    ContextMenu.prototype._changePivotItemSubText = function (pivotTableInfo, pivotTableCellInfo, menuItemData) {
        var placeholder = menuItemData.placeholder, name = menuItemData.name;
        var area = pivotTableCellInfo.area, value = pivotTableCellInfo.value, menuArea = pivotTableCellInfo.menuArea, colHeadFieldInfo = pivotTableCellInfo.colHeadFieldInfo, rowInfos = pivotTableCellInfo.rowInfos, colInfos = pivotTableCellInfo.colInfos, cornerFieldInfo = pivotTableCellInfo.cornerFieldInfo, activeRowFieldInfo = pivotTableCellInfo.activeRowFieldInfo, activeColFieldInfo = pivotTableCellInfo.activeColFieldInfo;
        if (!isNullOrUndefined(placeholder)) {
            if (placeholder === FIELD_NAME) {
                var stringTemp = void 0;
                if (menuArea === 0 ) {
                    stringTemp = pivotTableCellInfo.pageFieldInfo.fieldName;
                }
                else if (area === 2 && menuArea === 2 ) {
                    if (colHeadFieldInfo) {
                        stringTemp = colHeadFieldInfo.fieldName;
                    }
                    else {
                        stringTemp = activeColFieldInfo && activeColFieldInfo.name;
                        if (isNullOrUndefined(stringTemp)) {
                            var index = activeColFieldInfo.index;
                            while (index >= 0 && colInfos[index] && isNullOrUndefined(colInfos[index].itemName)) {
                                index = index - 1;
                            }
                            stringTemp = colInfos[index].fieldName;
                        }
                    }
                }
                else if (area === 3 && menuArea === 2 ) {
                    stringTemp = activeRowFieldInfo && activeRowFieldInfo.name;
                    if (isNullOrUndefined(stringTemp)) {
                        var index = activeRowFieldInfo.index;
                        while (index >= 0 && rowInfos[index] && isNullOrUndefined(rowInfos[index].itemName)) {
                            index = index - 1;
                        }
                        stringTemp = rowInfos[index].fieldName;
                    }
                }
                else if (area === 1) {
                    if (menuArea === 1 ) {
                        stringTemp = pivotTableCellInfo.value;
                    }
                    else if (menuArea === 2 && cornerFieldInfo) {
                        stringTemp = cornerFieldInfo.fieldName;
                    }
                }
                else if (menuArea === 4 ) {
                    stringTemp = pivotTableCellInfo.valueFieldName;
                    if (area === 2 ) {
                        stringTemp = activeColFieldInfo && activeColFieldInfo.name || value;
                    }
                    else if (area === 3 ) {
                        stringTemp = activeRowFieldInfo && activeRowFieldInfo.name || value;
                    }
                }
                menuItemData.text = menuItemData.text.replace('{0}', '"' + stringTemp + '"');
            }
            else if (placeholder === SORT_TYPE && menuArea === 4 ) {
                var stringTemp = void 0;
                var subType = menuItemData.commandOptions.subType;
                if (subType === 0) {
                    stringTemp = sR().pivotTableSortAscend;
                }
                else if (subType === 1) {
                    stringTemp = sR().pivotTableSortDescend;
                }
                menuItemData.text = stringTemp;
            }
        }
        else if (name === MENUITEM_NAME_PREFIX + PIVOT_TABLE_LABEL_FILTERS) {
            var fieldName = activeRowFieldInfo && activeRowFieldInfo.name || activeColFieldInfo && activeColFieldInfo.name || colHeadFieldInfo && colHeadFieldInfo.fieldName || cornerFieldInfo && cornerFieldInfo.fieldName;
            var fieldsModel = pivotTableInfo._fieldsModel;
            var isDateType = fieldName && fieldsModel.getFieldInfoByName(fieldName) && fieldsModel.getFieldInfoByName(fieldName)._dataType === 2;
            if (isDateType) {
                menuItemData.text = sR().pivotTableLabelFilters_Date;
            }
        }
        if (isNullOrUndefined(menuItemData.commandOptions)) {
            menuItemData.commandOptions = {};
        }
        menuItemData.commandOptions.pivotTableName = pivotTableInfo.name();
        menuItemData.commandOptions.pivotTableCellInfo = pivotTableCellInfo;
    };
    ContextMenu.prototype._filterInsertCellsAndInsert = function (itemsDataForShown) {
        var insertIndex = 0, haveInsertCellsItem = false;
        for (var i = 0; i < itemsDataForShown.length; i++) {
            var itemName = itemsDataForShown[i].name;
            if (itemName === MENUITEM_NAME_PREFIX + ROW_HEADER + INSERT_COPY_CELLS
                || itemName === MENUITEM_NAME_PREFIX + ROW_HEADER + INSERT_CUT_CELLS ||
                itemName === MENUITEM_NAME_PREFIX + COL_HEADER + INSERT_COPY_CELLS
                || itemName === MENUITEM_NAME_PREFIX + COL_HEADER + INSERT_CUT_CELLS) {
                haveInsertCellsItem = true;
            }
            if (itemName === MENUITEM_NAME_PREFIX + INSERT_ROWS || itemName === MENUITEM_NAME_PREFIX + INSERT_COLUMNS) {
                insertIndex = i;
                if (haveInsertCellsItem) {
                    break;
                }
            }
        }
        haveInsertCellsItem && itemsDataForShown.splice(insertIndex, 1);
    };
    ContextMenu.prototype._filterMenuDataByHitArea = function (itemsDataForShown, hitInfo) {
        var worksheetHitInfo = hitInfo.worksheetHitInfo;
        var isGrayArea = worksheetHitInfo && (worksheetHitInfo.row === keyword_undefined || worksheetHitInfo.col === keyword_undefined);
        if (isGrayArea) {
            itemsDataForShown.splice(0, itemsDataForShown.length);
        }
    };
    ContextMenu.prototype._filterMenuDataByFeatures = function (itemsDataForShown, spread) {
        var self = this;
        var sheet = Core_1._getActiveSheet(spread);
        var featureRelatedMenuData = self._featureRelatedMenuData;
        $.each(featureRelatedMenuData, function (category, detail) {
            if (!detail.checkFunction(sheet)) {
                var menuItemsName = detail.menuDataDict;
                var i = 0, menuItemsCount = menuItemsName.length;
                for (; i < menuItemsCount; i++) {
                    self._iteratorMenuDataByName(itemsDataForShown, menuItemsName[i], function (menuData, menuItemDataIndex) {
                        menuData[menuItemDataIndex] = null;
                    });
                }
            }
        });
        return itemsDataForShown;
    };
    ContextMenu.prototype._filterPivotTableMenuDataBySelections = function (menuItemData, hitInfo) {
        var self = this;
        var pivotTableInfo = hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.pivotTableInfo;
        if (pivotTableInfo) {
            var pivotTableCellInfo_1 = hitInfo.worksheetHitInfo && hitInfo.worksheetHitInfo.pivotTableCellInfo;
            if (pivotTableCellInfo_1) {
                var subtotalsPosition = pivotTableInfo.options.subtotalsPosition;
                var value = pivotTableCellInfo_1.value, area = pivotTableCellInfo_1.area, menuArea = pivotTableCellInfo_1.menuArea, cornerFieldInfo = pivotTableCellInfo_1.cornerFieldInfo, colHeadFieldInfo = pivotTableCellInfo_1.colHeadFieldInfo, activeRowFieldInfo = pivotTableCellInfo_1.activeRowFieldInfo, activeColFieldInfo = pivotTableCellInfo_1.activeColFieldInfo, rowInfos = pivotTableCellInfo_1.rowInfos, colInfos = pivotTableCellInfo_1.colInfos, valueFieldName = pivotTableCellInfo_1.valueFieldName;
                var filterArray1 = [MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_EXPAND_OR_COLLAPSE, MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_FILTER, MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_SHOW_DETAILS];
                if (filterArray1.indexOf(menuItemData.name) > -1) {
                    if (((area === 2 || area === 3) && menuArea === 4 )
                        || ((!isNullOrUndefined(cornerFieldInfo) || !isNullOrUndefined(colHeadFieldInfo)) && value === sR().sigmaValueTemp)
                        || ((area === 3 && activeRowFieldInfo && rowInfos[activeRowFieldInfo.index].isSubtotal && rowInfos[activeRowFieldInfo.index].collapseIndex === undefined && subtotalsPosition !== 1 )
                            || (area === 2 && activeColFieldInfo && colInfos[activeColFieldInfo.index].isSubtotal && colInfos[activeColFieldInfo.index].collapseIndex === undefined && subtotalsPosition !== 1 ))) {
                        return false;
                    }
                }
                var filterArray2 = [MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_GROUP, MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_UNGROUP];
                if (filterArray2.indexOf(menuItemData.name) > -1) {
                    if ((!isNullOrUndefined(cornerFieldInfo) || !isNullOrUndefined(colHeadFieldInfo))) {
                        return false;
                    }
                }
                var filterArray3 = [MENUITEM_NAME_PIVOT_TABLE + OPEN_VALUE_FIELD_SETTING_DIALOG, MENUITEM_NAME_PIVOT_TABLE + REMOVE_FIELD, MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_SUMMARIZE_VALUES_BY, MENUITEM_NAME_PIVOT_TABLE + PIVOT_TABLE_SHOW_VALUE_AS];
                if (filterArray3.indexOf(menuItemData.name) > -1) {
                    if ((isNullOrUndefined(valueFieldName) && menuArea === 4 && area === 4)) {
                        return false;
                    }
                }
                if (menuItemData && menuItemData.subMenu) {
                    menuItemData.subMenu.forEach(function (menuItem) {
                        self._changePivotItemSubText(pivotTableInfo, pivotTableCellInfo_1, menuItem);
                        self._checkPivotTableMenuItemAvliable(pivotTableInfo, pivotTableCellInfo_1, menuItem);
                    });
                }
                else {
                    self._changePivotItemSubText(pivotTableInfo, pivotTableCellInfo_1, menuItemData);
                }
            }
        }
        return true;
    };
    ContextMenu.prototype._checkPivotTableMenuItemAvliable = function (pivotTableInfo, pivotTableCellInfo, menuItemData) {
        var activeRowFieldInfo = pivotTableCellInfo.activeRowFieldInfo, activeColFieldInfo = pivotTableCellInfo.activeColFieldInfo, cornerFieldInfo = pivotTableCellInfo.cornerFieldInfo, colHeadFieldInfo = pivotTableCellInfo.colHeadFieldInfo, valueFieldName = pivotTableCellInfo.valueFieldName;
        var fieldName = activeRowFieldInfo && activeRowFieldInfo.name || activeColFieldInfo && activeColFieldInfo.name || colHeadFieldInfo && colHeadFieldInfo.fieldName || cornerFieldInfo && cornerFieldInfo.fieldName || valueFieldName;
        var fieldsModel = pivotTableInfo._fieldsModel;
        var field = fieldName && fieldsModel.getFieldInfoByName(fieldName);
        if (menuItemData.commandOptions && field) {
            var showValueAsType = menuItemData.commandOptions.showValueAsType;
            var subTotalType = menuItemData.commandOptions.subTotalType;
            if (!isNullOrUndefined(showValueAsType)) {
                var fieldShowValueAsType = field._showDataAsInfo && field._showDataAsInfo.showDataAs || 0 ;
                if (fieldShowValueAsType === showValueAsType) {
                    menuItemData.iconClass = SELECTED_CLASS_NAME;
                }
            }
            if (!isNullOrUndefined(subTotalType)) {
                var fieldSubTotalType = field.getSubTotalType();
                if (fieldSubTotalType === subTotalType) {
                    menuItemData.iconClass = SELECTED_CLASS_NAME;
                }
            }
        }
        switch (menuItemData.name) {
            case MENUITEM_NAME_PREFIX + PIVOT_TABLE_CLEAR_FILTER_FROM:
                var fieldFilterInfo = field && field._filterInfo;
                var hasLabelCondition = false;
                if (fieldFilterInfo && fieldFilterInfo.labelFilter && fieldFilterInfo._hasLabelFilter()) {
                    hasLabelCondition = true;
                }
                var hasValueCondition = fieldFilterInfo ? fieldFilterInfo._hasValueFilter() : false;
                if (!hasLabelCondition && !hasValueCondition) {
                    menuItemData.disable = true;
                }
                break;
            case MENUITEM_NAME_PREFIX + PIVOT_TABLE_KEEP_ONLY_SELECTED_ITEMS:
            case MENUITEM_NAME_PREFIX + PIVOT_TABLE_HIDE_SELECTED_ITEMS:
                if (!isNullOrUndefined(cornerFieldInfo) || !isNullOrUndefined(colHeadFieldInfo)) {
                    menuItemData.disable = true;
                }
                break;
            default:
                break;
        }
    };
    ContextMenu.prototype._filterTableMenuDataBySelections = function (itemsDataForShown, spread) {
        var sheet = Core_1._getActiveSheet(spread), selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            var table_1 = getTable(sheet, selections[0]), row_1 = sheet.getActiveRowIndex(), col_1 = sheet.getActiveColumnIndex();
            if (table_1) {
                $.each(itemsDataForShown, function (menuItemIndex, menuItemData) {
                    if (isNullOrUndefined(menuItemData)) {
                        return;
                    }
                    if (menuItemData.name === MENUITEM_NAME_PREFIX + TABLE_INSERT) {
                        var subMenuItem = menuItemData.subMenu;
                        if (table_1.checkTableLastRow(row_1)) {
                            subMenuItem.splice(3, 1);
                        }
                        if (table_1.checkTableLastCol(col_1)) {
                            subMenuItem.splice(1, 1);
                        }
                    }
                });
            }
        }
    };
    ContextMenu.prototype._trimNullObject = function (itemsData) {
        var self = this;
        var i, itemsCount = itemsData.length;
        for (i = itemsCount - 1; i >= 0; i--) {
            if (!itemsData[i]) {
                itemsData.splice(i, 1);
            }
            else if (itemsData[i].subMenu) {
                self._trimNullObject(itemsData[i].subMenu);
            }
        }
        return itemsData;
    };
    ContextMenu.prototype._trimSeparatorLine = function (itemsData) {
        var itemsDataForShown = [];
        var i, itemsCount = itemsData.length;
        for (i = 0; i < itemsCount; i++) {
            if (itemsData[i] && itemsData[i].type === SEPARATOR && itemsData[i + 1] && itemsData[i + 1].type === SEPARATOR) {
                continue;
            }
            itemsDataForShown.push(itemsData[i]);
        }
        itemsCount = itemsDataForShown.length;
        var start = 0, end = 0, calcStart = true, calcEnd = true;
        for (i = 0; i < itemsCount; i++) {
            if (calcStart && itemsDataForShown[i].type === SEPARATOR) {
                start++;
            }
            else {
                calcStart = false;
            }
            if (calcEnd && itemsDataForShown[itemsCount - 1 - i].type === SEPARATOR) {
                end++;
            }
            else {
                calcEnd = false;
            }
            if (!calcStart && !calcEnd) {
                break;
            }
        }
        itemsDataForShown.splice(itemsCount - end, end);
        itemsDataForShown.splice(0, start);
        return itemsDataForShown;
    };
    ContextMenu.prototype._checkMenuItemAvailable = function (itemsDataForShown, spread) {
        var self = this;
        self._checkAvailableByCurrentSelections(itemsDataForShown, spread);
        self._checkAvailableByProtectionSettings(itemsDataForShown, spread);
    };
    ContextMenu.prototype._checkAvailableByCurrentSelections = function (itemsDataForShown, spread) {
        var self = this;
        var sheet = Core_1._getActiveSheet(spread), tables = sheet.tables;
        for (var i = 0; i < itemsDataForShown.length; i++) {
            if (!itemsDataForShown[i]) {
                continue;
            }
            switch (itemsDataForShown[i].name) {
                case MENUITEM_NAME_PREFIX + INSERT_ROWS:
                    if (!sheet._isFullRows()) {
                        itemsDataForShown[i].disable = true;
                    }
                    break;
                case MENUITEM_NAME_PREFIX + DELETE_ROWS:
                    if (!sheet._isFullRows() || tables && tables.containTableHeaderTotalRowForSheet()) {
                        itemsDataForShown[i].disable = true;
                    }
                    break;
                case MENUITEM_NAME_PREFIX + INSERT_COLUMNS:
                case MENUITEM_NAME_PREFIX + DELETE_COLUMNS:
                    if (!sheet._isFullCols()) {
                        itemsDataForShown[i].disable = true;
                    }
                    break;
                case MENUITEM_NAME_PREFIX + TABLE_INSERT_ROWS_ABOVE:
                    if (tables && (tables.isAcrossTables() || tables.containTableHeader() || tables.noRoomToInsertRow())) {
                        itemsDataForShown[i].disable = true;
                    }
                    break;
                case MENUITEM_NAME_PREFIX + TABLE_INSERT_ROWS_BELOW:
                    if (tables && (tables.isAcrossTables() || tables.noRoomToInsertRow())) {
                        itemsDataForShown[i].disable = true;
                    }
                    break;
                case MENUITEM_NAME_PREFIX + TABLE_DELETE_ROWS:
                    if (tables && (tables.checkTableRow() || tables.isAcrossTables() || tables.containTableHeaderTotalRow())) {
                        itemsDataForShown[i].disable = true;
                    }
                    break;
                case MENUITEM_NAME_PREFIX + TABLE_INSERT_COLUMNS_LEFT:
                case MENUITEM_NAME_PREFIX + TABLE_INSERT_COLUMNS_RIGHT:
                    if (tables && (tables.isAcrossTables() || tables.noRoomToInsertColumn())) {
                        itemsDataForShown[i].disable = true;
                    }
                    break;
                case MENUITEM_NAME_PREFIX + TABLE_DELETE_COLUMNS:
                    if (tables && (tables.checkTableCol() || tables.isAcrossTables() || tables.isWholeTableCol())) {
                        itemsDataForShown[i].disable = true;
                    }
                    break;
                default:
                    break;
            }
            if (itemsDataForShown[i] && itemsDataForShown[i].subMenu) {
                self._checkAvailableByCurrentSelections(itemsDataForShown[i].subMenu, spread);
            }
        }
    };
    ContextMenu.prototype._checkAvailableByProtectionSettings = function (itemsDataForShown, spread) {
        var self = this;
        var sheet = Core_1._getActiveSheet(spread), isProtected = sheet.options.isProtected, protectionOptions = sheet.options.protectionOptions;
        if (!isProtected) {
            return;
        }
        if (protectionOptions) {
            var comment = void 0;
            for (var i = 0; i < itemsDataForShown.length; i++) {
                if (!itemsDataForShown[i]) {
                    continue;
                }
                switch (itemsDataForShown[i].name) {
                    case MENUITEM_NAME_PREFIX + INSERT_ROWS:
                        if (!protectionOptions.allowInsertRows) {
                            itemsDataForShown[i].disable = true;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + INSERT_COLUMNS:
                        if (!protectionOptions.allowInsertColumns) {
                            itemsDataForShown[i].disable = true;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + DELETE_ROWS:
                        if (!protectionOptions.allowDeleteRows) {
                            itemsDataForShown[i].disable = true;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + DELETE_COLUMNS:
                        if (!protectionOptions.allowDeleteColumns) {
                            itemsDataForShown[i].disable = true;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + FILTER:
                        if (!protectionOptions.allowFilter) {
                            itemsDataForShown[i].disable = true;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + SORT_ASCEND:
                    case MENUITEM_NAME_PREFIX + SORT_DESCEND:


                        if (!protectionOptions.allowSort) {
                            itemsDataForShown[i].disable = true;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + HIDE_ROWS:
                    case MENUITEM_NAME_PREFIX + UNHIDE_ROWS:
                    case MENUITEM_NAME_PREFIX + HIDE_COLUMNS:
                    case MENUITEM_NAME_PREFIX + UNHIDE_COLUMNS:
                        if (!sheet._parentSheet) {
                            itemsDataForShown[i].disable = true;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + SLICER_SORT_ASCEND:
                    case MENUITEM_NAME_PREFIX + SLICER_SORT_DESCEND:

                        if (!protectionOptions.allowEditObjects) {
                            itemsDataForShown.splice(0, itemsDataForShown.length);
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + INSERT_COMMENT:
                        if (!protectionOptions.allowEditObjects) {
                            itemsDataForShown[i] = null;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + EDIT_COMMENT:
                        var isLockText = void 0;
                        if (sheet.comments) {
                            comment = sheet.comments.get(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex());
                            isLockText = comment && comment.lockText();
                        }
                        if (!protectionOptions.allowEditObjects && isLockText) {
                            itemsDataForShown[i] = null;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + DELETE_COMMENT:
                        var isAllLockedCommentInSelections = void 0;
                        if (sheet.comments) {
                            isAllLockedCommentInSelections = !hasUnlockedCommentsInSelection(sheet.getSelections(), sheet);
                        }
                        if (!protectionOptions.allowEditObjects && isAllLockedCommentInSelections) {
                            itemsDataForShown[i] = null;
                        }
                        break;
                    case MENUITEM_NAME_PREFIX + TABLE_INSERT_ROWS_ABOVE:
                    case MENUITEM_NAME_PREFIX + TABLE_INSERT_ROWS_BELOW:
                    case MENUITEM_NAME_PREFIX + TABLE_INSERT_COLUMNS_LEFT:
                    case MENUITEM_NAME_PREFIX + TABLE_INSERT_COLUMNS_RIGHT:
                    case MENUITEM_NAME_PREFIX + TABLE_DELETE_ROWS:
                    case MENUITEM_NAME_PREFIX + TABLE_DELETE_COLUMNS:
                        itemsDataForShown[i].disable = true;
                        break;
                    default:
                        break;
                }
                if (itemsDataForShown[i] && itemsDataForShown[i].subMenu) {
                    self._checkAvailableByProtectionSettings(itemsDataForShown[i].subMenu, spread);
                }
            }
        }
    };
    ContextMenu.prototype._specialSwitchContextForTabUnhide = function (menuData, hitInfo, spread) {
        if (!hitInfo.tabStripHitInfo) {
            return;
        }
        var self = this;
        var sheets = spread._getSheetsAndSheetTabs();
        var unhideMenuItemData = self._find(MENUITEM_NAME_PREFIX + UNHIDE_SHEET);
        if (unhideMenuItemData) {
            for (var i = 0; i < sheets.length; i++) {
                if (!sheets[i].visible()) {
                    unhideMenuItemData.disable = false;
                    return;
                }
            }
            unhideMenuItemData.disable = true;
        }
    };
    ContextMenu.prototype._find = function (name) {
        var self = this;
        return self._findImp(self.menuData, name);
    };
    ContextMenu.prototype._findImp = function (menuData, name) {
        var self = this;
        var menuItemData;
        self._iteratorMenuDataByName(menuData, name, function (data, index) {
            menuItemData = data[index];
        });
        return menuItemData;
    };
    ContextMenu.prototype._iteratorMenuDataByName = function (menuData, name, callback) {
        var self = this;
        var menuDataCount = menuData.length, menuItemDataIndex = 0;
        for (; menuItemDataIndex < menuDataCount; menuItemDataIndex++) {
            if (isNullOrUndefined(menuData[menuItemDataIndex])) {
                continue;
            }
            if (name === menuData[menuItemDataIndex].name) {
                callback(menuData, menuItemDataIndex);
                return;
            }
            if (menuData[menuItemDataIndex].subMenu) {
                self._iteratorMenuDataByName(menuData[menuItemDataIndex].subMenu, name, callback);
            }
        }
    };
    ContextMenu.prototype._iteratorMenuData = function (menuData, callback) {
        var self = this;
        var menuDataCount = menuData.length, menuItemDataIndex = 0;
        for (; menuItemDataIndex < menuDataCount; menuItemDataIndex++) {
            var menuItem = menuData[menuItemDataIndex];
            if (isNullOrUndefined(menuItem)) {
                continue;
            }
            callback(menuItem);
            if (menuItem.subMenu) {
                self._iteratorMenuData(menuItem.subMenu, callback);
            }
        }
    };
    ContextMenu.prototype._registerCommand = function (workbook) {
        var commandManager = workbook.commandManager();
        var copy = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                if (isSelectSlicer(sheet)) {
                    commandManager.execute({ cmd: 'copyFloatingObjects', sheetName: sheet.name() });
                }
                else {
                    commandManager.execute({ cmd: COPY, sheetName: sheet.name(), ignoreClipboard: true });
                }
            }
        };
        commandManager.register(COMMAND_PREFIX + COPY, copy, null, false, false, false, false);
        var cut = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                if (isSelectSlicer(sheet)) {
                    commandManager.execute({ cmd: 'cutFloatingObjects', sheetName: sheet.name() });
                }
                else {
                    commandManager.execute({ cmd: CUT, sheetName: sheet.name(), ignoreClipboard: true });
                }
            }
        };
        commandManager.register(COMMAND_PREFIX + CUT, cut, null, false, false, false, false);
        var pasteAll = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                if (sheet.isPasteFloatingObject && sheet.isPasteFloatingObject()) {
                    commandManager.execute({
                        cmd: 'pasteFloatingObjects',
                        sheetName: sheet.name()
                    });
                }
                else if (sheet.isPasteShapes && sheet.isPasteShapes()) {
                    commandManager.execute({
                        cmd: 'pasteShapes',
                        sheetName: sheet.name()
                    });
                }
                else {
                    commandManager.execute({ cmd: PASTE, sheetName: sheet.name(), pasteOption: 0 });
                }
            }
        };
        commandManager.register(COMMAND_PREFIX + PASTE_ALL, pasteAll, null, false, false, false, false);
        var copyCellsShiftRight = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                commandManager.execute({ cmd: PASTE, sheetName: sheet.name(), pasteOption: 0 , shiftCells: Core_1.InsertShiftCell.right });
            }
        };
        commandManager.register(COMMAND_PREFIX + INSERT_COPY_CELLS + SHIFT_CELLS_RIGHT, copyCellsShiftRight, null, false, false, false, false);
        commandManager.register(COMMAND_PREFIX + INSERT_CUT_CELLS + SHIFT_CELLS_RIGHT, copyCellsShiftRight, null, false, false, false, false);
        commandManager.register(COMMAND_PREFIX + COL_HEADER + INSERT_COPY_CELLS, copyCellsShiftRight, null, false, false, false, false);
        commandManager.register(COMMAND_PREFIX + COL_HEADER + INSERT_CUT_CELLS, copyCellsShiftRight, null, false, false, false, false);
        var copyCellsShiftDown = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                commandManager.execute({ cmd: PASTE, sheetName: sheet.name(), pasteOption: 0 , shiftCells: Core_1.InsertShiftCell.down });
            }
        };
        commandManager.register(COMMAND_PREFIX + INSERT_COPY_CELLS + SHIFT_CELLS_DOWN, copyCellsShiftDown, null, false, false, false, false);
        commandManager.register(COMMAND_PREFIX + INSERT_CUT_CELLS + SHIFT_CELLS_DOWN, copyCellsShiftDown, null, false, false, false, false);
        commandManager.register(COMMAND_PREFIX + ROW_HEADER + INSERT_COPY_CELLS, copyCellsShiftDown, null, false, false, false, false);
        commandManager.register(COMMAND_PREFIX + ROW_HEADER + INSERT_CUT_CELLS, copyCellsShiftDown, null, false, false, false, false);
        var pasteFormula = {
            canUndo: false,
            execute: function (spread, options) {
                var clipBoardOptions = 3 ;
                doPaste(spread, options, commandManager, clipBoardOptions);
            }
        };
        commandManager.register(COMMAND_PREFIX + PASTE_FORMULA, pasteFormula, null, false, false, false, false);
        var pasteValues = {
            canUndo: false,
            execute: function (spread, options) {
                var clipBoardOptions = 1 ;
                doPaste(spread, options, commandManager, clipBoardOptions);
            }
        };
        commandManager.register(COMMAND_PREFIX + PASTE_VALUES, pasteValues, null, false, false, false, false);
        var pasteFormatting = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                commandManager.execute({ cmd: PASTE, sheetName: sheet.name(), pasteOption: 2 });
            }
        };
        commandManager.register(COMMAND_PREFIX + PASTE_FORMATTING, pasteFormatting, null, false, false, false, false);
        var pasteValuesFormatting = {
            canUndo: false,
            execute: function (spread, options) {
                var clipBoardOptions = 4 ;
                doPaste(spread, options, commandManager, clipBoardOptions);
            }
        };
        commandManager.register(COMMAND_PREFIX + PASTE_VALUES_FORMATTING, pasteValuesFormatting, null, false, false, false, false);
        var pasteFormulaFormatting = {
            canUndo: false,
            execute: function (spread, options) {
                var clipBoardOptions = 5 ;
                doPaste(spread, options, commandManager, clipBoardOptions);
            }
        };
        commandManager.register(COMMAND_PREFIX + PASTE_FORMULA_FORMATTING, pasteFormulaFormatting, null, false, false, false, false);
        var clear = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                commandManager.execute({ cmd: 'clear', sheetName: sheet.name() });
            }
        };
        commandManager.register(COMMAND_PREFIX + CLEAR_CONTENT, clear, null, false, false, false, false);
        var insertComment = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet, cmdOptions) {
                    var state = cmdOptions.commentState || 2 ;
                    var displayMode = cmdOptions.displayMode;
                    var row = cmdOptions.activeRow;
                    var col = cmdOptions.activeCol;
                    var comment = sheet.comments.add(row, col, '');
                    if (comment) {
                        comment.commentState(state);
                        if (displayMode) {
                            comment.displayMode(displayMode);
                        }
                        var rowViewportIndex = sheet._getRowViewportIndex(row);
                        var columnViewportIndex = sheet._getColumnViewportIndex(col);
                        var cellRect = sheet.getCellRect(row, col, rowViewportIndex, columnViewportIndex);
                        var layout = sheet._getSheetLayout();
                        var rect = layout._viewportRect(rowViewportIndex, columnViewportIndex);
                        var commentLocation = comment.location();
                        var commentWidth = comment.width();
                        var commentHeight = comment.height();
                        var newTopRow = void 0, newLeftCol = void 0, rowOffset = void 0, colOffset = void 0;
                        var scrollService = spread._scrollService;
                        if (cellRect.y + commentLocation.y < rect.y) {
                            rowOffset = getRowOffset(sheet, row, cellRect.y + commentLocation.y - rect.y);
                            newTopRow = scrollService._getNewTopRow(sheet, rowOffset);
                            scrollService._vScrollTo(sheet, newTopRow._row, 0);
                            sheet._syncVScrollbarPosition();
                        }
                        else if (cellRect.y + commentLocation.y + commentHeight > rect.y + rect.height) {
                            rowOffset = getRowOffset(sheet, row, cellRect.y + commentLocation.y + commentHeight - (rect.y + rect.height));
                            newTopRow = scrollService._getNewTopRow(sheet, rowOffset);
                            scrollService._vScrollTo(sheet, newTopRow._row, 0);
                            sheet._syncVScrollbarPosition();
                        }
                        if (cellRect.x + commentLocation.x + commentWidth > rect.x + rect.width) {
                            colOffset = getColumnOffset(sheet, col, cellRect.x + commentLocation.x + commentWidth - (rect.x + rect.width));
                            newLeftCol = scrollService._getNewLeftCol(sheet, colOffset);
                            scrollService._hScrollTo(sheet, newLeftCol._col, 0);
                            sheet._syncHScrollbarPosition();
                        }
                    }
                }, function (sheet, cmdOptions) {
                    var row = cmdOptions.activeRow;
                    var col = cmdOptions.activeCol;
                    var comment = sheet.comments.get(row, col);
                    if (comment) {
                        cmdOptions.displayMode = comment.displayMode();
                        cmdOptions.commentState = comment.commentState();
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + INSERT_COMMENT, insertComment, null, false, false, false, false);
        var editComment = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                var row = options.activeRow;
                var col = options.activeCol;
                var comment = sheet.comments.get(row, col);
                if (comment) {
                    comment.commentState(2 );
                }
            }
        };
        commandManager.register(COMMAND_PREFIX + EDIT_COMMENT, editComment, null, false, false, false, false);
        var deleteComment = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    var selections = options.selections;
                    var length = selections.length;
                    if (length <= 0) {
                        return;
                    }
                    for (var i = 0; i < length; i++) {
                        var sel = selections[i];
                        for (var r = sel.row; r < sel.row + sel.rowCount; r++) {
                            for (var c = sel.col; c < sel.col + sel.colCount; c++) {
                                var comment = sheet.comments.get(r, c);
                                if (comment && !(sheet.options.isProtected && !sheet.options.protectionOptions.allowEditObjects && comment.locked())) {
                                    commandManager.execute({
                                        cmd: DELETE_COMMENT,
                                        sheetName: sheet.name(),
                                        row: comment._rowIndex,
                                        col: comment._colIndex
                                    });
                                }
                            }
                        }
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + DELETE_COMMENT, deleteComment, null, false, false, false, false);
        var toggleComment = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                var row = options.activeRow;
                var col = options.activeCol;
                var comment = sheet.comments.get(row, col);
                if (comment) {
                    if (comment.displayMode() === 2 ) {
                        comment.displayMode(1 );
                    }
                    else {
                        comment.displayMode(2 );
                    }
                }
            }
        };
        commandManager.register(COMMAND_PREFIX + TOGGLE_COMMENT, toggleComment, null, false, false, false, false);
        var insertRows = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                options.considerAllSheets = true;
                return doAction(spread, options, isUndo, function (sheet) {
                    var sortedRanges = getSortedRowSelections(options.selections), sortedRange;
                    for (var i = 0; i < sortedRanges.length; i++) {
                        sortedRange = sortedRanges[i];
                        var preRow = sheet.getRange(sortedRange.row - 1, 0, 1, sortedRange.colCount);
                        var isPreRowLocked = [];
                        for (var s = 0; s < preRow.colCount; s++) {
                            if (!sheet.getCell(preRow.row, s).locked()) {
                                isPreRowLocked.push(s);
                            }
                        }
                        var row = sortedRange.row, rowCount = sortedRange.rowCount;
                        sheet.addRows(row, rowCount);
                        for (var f = 0; f < isPreRowLocked.length; f++) {
                            for (var k = sortedRanges[i].row; k < sortedRanges[i].row + sortedRanges[i].rowCount; k++) {
                                sheet.getCell(k, isPreRowLocked[f]).locked(false);
                            }
                        }
                        if (sheet.tables && rowCount > 0) {
                            var tableList = sheet.tables._findByRange(row, -1, rowCount, -1);
                            for (var tableIndex = 0; tableIndex < tableList.length; tableIndex++) {
                                var table = tableList[tableIndex];
                                table._raiseTableRowsChanged(row, rowCount, false , false );
                            }
                        }
                        setSpanStyleWhenInsertRowsColumns(sheet, row, -1, rowCount);
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + INSERT_ROWS, insertRows, null, false, false, false, false);
        var insertColumns = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                options.considerAllSheets = true;
                return doAction(spread, options, isUndo, function (sheet) {
                    var sortedRanges = getSortedColumnsSelections(options.selections), sortedRange;
                    for (var i = 0; i < sortedRanges.length; i++) {
                        sortedRange = sortedRanges[i];
                        var preRow = sheet.getRange(0, sortedRange.col - 1, sortedRange.rowCount, 1);
                        var isPreColLocked = [];
                        for (var s = 0; s < preRow.rowCount; s++) {
                            if (!sheet.getCell(s, preRow.col).locked()) {
                                isPreColLocked.push(s);
                            }
                        }
                        var col = sortedRange.col, colCount = sortedRange.colCount;
                        sheet.addColumns(col, colCount);
                        for (var f = 0; f < isPreColLocked.length; f++) {
                            for (var k = col; k < col + colCount; k++) {
                                sheet.getCell(isPreColLocked[f], k).locked(false);
                            }
                        }
                        if (sheet.tables && colCount > 0) {
                            var tableList = sheet.tables._findByRange(-1, col, -1, colCount);
                            for (var tableIndex = 0; tableIndex < tableList.length; tableIndex++) {
                                var table = tableList[tableIndex];
                                table._raiseTableColumnsChanged(col, colCount, false , false );
                            }
                        }
                        setSpanStyleWhenInsertRowsColumns(sheet, -1, col, colCount);
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + INSERT_COLUMNS, insertColumns, null, false, false, false, false);
        var deleteRows = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                options.considerAllSheets = true;
                return doAction(spread, options, isUndo, function (sheet) {
                    var sortedRanges = getSortedRowSelections(options.selections);
                    var filterInfo = sheet.filterRowsVisibleInfo && sheet.filterRowsVisibleInfo.rowsVisibleInfo;
                    var haveFilter = filterInfo && Object.keys(filterInfo).length > 0;
                    for (var i = 0; i < sortedRanges.length; i++) {
                        var range = sortedRanges[i];
                        var row = range.row, rowCount = range.rowCount;
                        var oldRowCount = sheet.getRowCount();
                        if (haveFilter) {
                            var zone = getUnFilteredRows(range, filterInfo);
                            for (var index = zone.length - 1; index >= 0; index--) {
                                row = zone[index][0];
                                rowCount = zone[index][1];
                                var tableList = sheet.tables && sheet.tables._findByRange(row, -1, rowCount, -1);
                                sheet.deleteRows(row, rowCount);
                                if (tableList.length > 0 && oldRowCount - sheet.getRowCount() > 0) {
                                    oldRowCount = sheet.getRowCount();
                                    _triggerTableListRowsChanged(sheet, tableList, row, rowCount);
                                }
                            }
                        }
                        else {
                            var tableList = sheet.tables && sheet.tables._findByRange(row, -1, rowCount, -1);
                            sheet.deleteRows(row, rowCount);
                            if (tableList && tableList.length > 0 && oldRowCount - sheet.getRowCount() > 0) {
                                _triggerTableListRowsChanged(sheet, tableList, row, rowCount);
                            }
                        }
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + DELETE_ROWS, deleteRows, null, false, false, false, false);
        var deleteColumns = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                options.considerAllSheets = true;
                return doAction(spread, options, isUndo, function (sheet) {
                    var sortedRanges = getSortedColumnsSelections(options.selections);
                    for (var i = 0; i < sortedRanges.length; i++) {
                        var oldColumnCount = sheet.getColumnCount();
                        var col = sortedRanges[i].col, colCount = sortedRanges[i].colCount;
                        var tableList = void 0;
                        if (sheet.tables) {
                            tableList = sheet.tables._findByRange(-1, col, -1, colCount);
                        }
                        sheet.deleteColumns(col, colCount);
                        if (sheet.tables && oldColumnCount - sheet.getColumnCount() > 0) {
                            for (var tableIndex = 0; tableIndex < tableList.length; tableIndex++) {
                                var table = tableList[tableIndex];
                                table._raiseTableColumnsChanged(col, colCount, true );
                            }
                        }
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + DELETE_COLUMNS, deleteColumns, null, false, false, false, false);
        var insertSheet = {
            canUndo: false,
            execute: function (spread) {
                var activeSheetIndex = spread.getActiveSheetIndex(), needUnSelectSheetsName = [];
                var oldSheet = Core_1._getActiveSheet(spread);
                var newSheet = spread._createSheet(spread._getDefaultSheetName(activeSheetIndex));

                var sheetsAndSheetTabs = spread._getSheetsAndSheetTabs();
                sheetsAndSheetTabs.forEach(function (sheetItem) {
                    if (sheetItem._isSelectedImp()) {
                        needUnSelectSheetsName.push(sheetItem);
                    }
                });
                needUnSelectSheetsName.forEach(function (sheetItem) {
                    sheetItem._isSelectedImp(false, true);
                });
                var args = {
                    sheetName: newSheet.name(),
                    propertyName: 'insertSheet',
                    cancel: false,
                    sheetIndex: activeSheetIndex
                };
                spread._trigger(Core_1.Events.SheetChanging, args);

                if (args.cancel) {
                    return;
                }
                else {
                    var activeArgs = {
                        oldSheet: oldSheet,
                        newSheet: newSheet
                    };
                    spread._trigger(Core_1.Events.ActiveSheetChanging, activeArgs);
                    spread._addSheetImp(Math.max(0, activeSheetIndex), 2 , newSheet);
                    newSheet._isSelectedImp(true, true);
                }
                spread._trigger(Core_1.Events.SheetChanged, {
                    sheetName: newSheet.name(),
                    propertyName: 'insertSheet',
                    sheetIndex: activeSheetIndex
                });
                spread._trigger(Core_1.Events.ActiveSheetChanged, {
                    oldSheet: oldSheet,
                    newSheet: newSheet
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + INSERT_SHEET, insertSheet, null, false, false, false, false);
        var deleteSheet = {
            canUndo: false,
            execute: function (spread) {
                var oldActiveSheet = Core_1._getActiveSheet(spread);
                var sheetsAndSheetTabs = spread._getSheetsAndSheetTabs();
                if (sheetsAndSheetTabs.length > 1) {
                    var needDeleteSheetsName_1 = [], needDeleteSheetsIndex_1 = [];
                    sheetsAndSheetTabs.forEach(function (sheetItem, index) {
                        if (sheetItem._isSelectedImp()) {
                            var name_1 = sheetItem.name();
                            needDeleteSheetsName_1.push(name_1);
                            needDeleteSheetsIndex_1.push(index);
                        }
                    });

                    if (needDeleteSheetsName_1.length !== sheetsAndSheetTabs.length) {
                        if (needDeleteSheetsName_1.length >= 1) {
                            var activeArgs_1 = {
                                oldSheet: oldActiveSheet,
                                cancel: false,
                            };
                            needDeleteSheetsName_1.forEach(function (sheetName, index) {
                                var sheetIndex = needDeleteSheetsIndex_1[index], delAcSheet = Core_1._getSheetFromName(spread, sheetName);
                                var args = {
                                    sheetName: sheetName,
                                    propertyName: 'deleteSheet',
                                    cancel: false,
                                    sheetIndex: sheetIndex
                                };
                                if (delAcSheet === oldActiveSheet) {
                                    spread._trigger(Core_1.Events.ActiveSheetChanging, activeArgs_1);
                                }
                                spread._trigger(Core_1.Events.SheetChanging, args);
                                if (!activeArgs_1.cancel && !args.cancel) {
                                    var tempIndex = spread.getSheetIndex(sheetName);
                                    if (!isNullOrUndefined(tempIndex) && tempIndex >= 0) {
                                        spread.removeSheet(tempIndex);
                                        if (spread.getActiveSheetIndex() === -1) {
                                            spread.setActiveSheetTab(0);
                                        }
                                    }
                                    else {
                                        tempIndex = spread.getSheetTabIndex(sheetName);
                                        if (!isNullOrUndefined(tempIndex) && tempIndex >= 0) {
                                            spread.removeSheetTab(tempIndex);
                                            if (spread.getActiveSheetTabIndex() === -1) {
                                                spread.setActiveSheetIndex(0);
                                            }
                                        }
                                    }
                                    spread._trigger(Core_1.Events.SheetChanged, {
                                        sheetName: sheetName,
                                        propertyName: 'deleteSheet',
                                        sheetIndex: sheetIndex
                                    });
                                    var newSheet = Core_1._getActiveSheet(spread);
                                    if (delAcSheet === oldActiveSheet) {
                                        spread._trigger(Core_1.Events.ActiveSheetChanged, {
                                            oldSheet: delAcSheet,
                                            newSheet: newSheet
                                        });
                                    }
                                }
                            });

                            var acSheet = Core_1._getActiveSheet(spread);
                            if (!acSheet.isSelected()) {
                                acSheet._isSelectedImp(true, true);
                            }
                        }
                    }
                    else {
                        _raiseHiddenSheetInvalidEvent(oldActiveSheet);
                    }
                }
                else {
                    _raiseHiddenSheetInvalidEvent(oldActiveSheet);
                }
                spread.undoManager().clear();
            }
        };
        commandManager.register(COMMAND_PREFIX + DELETE_SHEET, deleteSheet, null, false, false, false, false);
        var filter = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    var selections = options.selections;
                    var selection = selections[0];
                    var table = getTable(sheet, selection);
                    var activeRow = options.activeRow;
                    var activeCol = options.activeCol;
                    if (table) {
                        var tableRange = table.range();
                        if (tableRange.contains(activeRow, activeCol, 1, 1)) {
                            var tableName = table.name();
                            commandManager.execute({
                                cmd: 'contextmenuFilterForTable',
                                sheetName: sheet.name(),
                                cmdOption: {
                                    tableName: tableName,
                                    activeRow: activeRow,
                                    activeCol: activeCol,
                                    expectedText: sheet.getText(activeRow, activeCol)
                                }
                            });
                        }
                    }
                    else if (sheet.rowFilter) {
                        commandManager.execute({
                            cmd: 'contextmenuFilterForSheet',
                            sheetName: sheet.name(),
                            cmdOption: {
                                activeRow: activeRow,
                                activeCol: activeCol,
                                selection: selection,
                                expectedText: sheet.getText(activeRow, activeCol)
                            }
                        });
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + FILTER, filter, null, false, false, false, false);
        var sortAscend = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    var col = options.activeCol;
                    var selections = options.selections;
                    var table = getTable(sheet, selections[0]);
                    var range = table ? table.dataRange() : selections[0];
                    var sortOption = sheet._getSortOption(range, true, null);
                    var args = {
                        sheet: sheet,
                        sheetName: sheet.name(),
                        col: col,
                        ascending: true,
                        range: range,
                        compareFunction: keyword_undefined,
                        groupSort: sortOption.groupSort,
                        ignoreHidden: sortOption.ignoreHidden,
                        cancel: false
                    };
                    sheet._trigger(Core_1.Events.RangeSorting, args);
                    if (args.cancel === false) {
                        sheet.sortRange(range.row, range.col, range.rowCount, range.colCount, true, [{
                                index: col,
                                ascending: true,
                                compareFunction: args.compareFunction,
                            }], { groupSort: args.groupSort, ignoreHidden: args.ignoreHidden }, keyword_undefined, !!table );
                        sheet._trigger(Core_1.Events.RangeSorted, args);
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + SORT_ASCEND, sortAscend, null, false, false, false, false);
        var sortDescend = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    var col = options.activeCol;
                    var selections = options.selections;
                    var table = getTable(sheet, selections[0]);
                    var range = table ? table.dataRange() : selections[0];
                    var sortOption = sheet._getSortOption(range, true, null);
                    var args = {
                        sheet: sheet,
                        sheetName: sheet.name(),
                        col: col,
                        ascending: false,
                        range: range,
                        compareFunction: keyword_undefined,
                        groupSort: sortOption.groupSort,
                        ignoreHidden: sortOption.ignoreHidden,
                        cancel: false
                    };
                    sheet._trigger(Core_1.Events.RangeSorting, args);
                    if (args.cancel === false) {
                        sheet.sortRange(range.row, range.col, range.rowCount, range.colCount, true, [{
                                index: col,
                                ascending: false,
                                compareFunction: args.compareFunction,
                            }], { groupSort: args.groupSort, ignoreHidden: args.ignoreHidden }, keyword_undefined, !!table );
                        sheet._trigger(Core_1.Events.RangeSorted, args);
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + SORT_DESCEND, sortDescend, null, false, false, false, false);
        var slicerSortAscend = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doSlicerSort(spread, options, isUndo, 1 );
            }
        };
        commandManager.register(COMMAND_PREFIX + SLICER_SORT_ASCEND, slicerSortAscend, null, false, false, false, false);
        var slicerSortDescend = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doSlicerSort(spread, options, isUndo, 2 );
            }
        };
        commandManager.register(COMMAND_PREFIX + SLICER_SORT_DESCEND, slicerSortDescend, null, false, false, false, false);
        function getSelectedIndexes(indexes, startIndex, count) {
            for (var i = 0; i < count; i++) {
                var currentIndex = startIndex + i;
                if (indexes.indexOf(currentIndex) === -1) {
                    indexes.push(currentIndex);
                }
            }
            return indexes;
        }
        var pinRows = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    var selections = options.selections;
                    if (selections.length > 0) {
                        var rowIndexes = [];
                        for (var _i = 0, selections_1 = selections; _i < selections_1.length; _i++) {
                            var sel = selections_1[_i];
                            getSelectedIndexes(rowIndexes, sel.row, sel.rowCount);
                        }
                        try {
                            sheet._parentSheet.togglePinnedRows(rowIndexes);
                        }
                        catch (ex) {
                            return false;
                        }
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + PIN_ROWS, pinRows, null, false, false, false, false);
        var pinColumns = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    var selections = options.selections;
                    if (selections.length > 0) {
                        var colIndexes = [];
                        for (var _i = 0, selections_2 = selections; _i < selections_2.length; _i++) {
                            var sel = selections_2[_i];
                            getSelectedIndexes(colIndexes, sel.col, sel.colCount);
                        }
                        try {
                            sheet._parentSheet.togglePinnedColumns(colIndexes);
                        }
                        catch (ex) {
                            return false;
                        }
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + PIN_COLUMNS, pinColumns, null, false, false, false, false);
        var hideRows = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    spread.suspendCalcService();
                    execInSelectionsForRowOrCol(options.selections, ROW, function (row) {
                        sheet.setRowVisible(row, false);
                    });
                    spread.resumeCalcService();
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + HIDE_ROWS, hideRows, null, false, false, false, false);
        var hideColumns = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    spread.suspendCalcService();
                    execInSelectionsForRowOrCol(options.selections, COL, function (column) {
                        sheet.setColumnVisible(column, false);
                    });
                    spread.resumeCalcService();
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + HIDE_COLUMNS, hideColumns, null, false, false, false, false);
        var hideSheet = {
            canUndo: false,
            execute: function (spread) {
                var visibleSheetsAndSheetTabsCount = 0;
                var sheetsAndSheetTabs = spread._getSheetsAndSheetTabs();
                sheetsAndSheetTabs.forEach(function (sheetItem) {
                    if (sheetItem.visible()) {
                        visibleSheetsAndSheetTabsCount += 1;
                    }
                });
                var oldActiveSheet = Core_1._getActiveSheet(spread), changingArgs;
                if (visibleSheetsAndSheetTabsCount <= 1) {
                    _raiseHiddenSheetInvalidEvent(oldActiveSheet);
                    return;
                }
                var needHideSheets = [];
                sheetsAndSheetTabs.forEach(function (sheetItem) {
                    if (sheetItem._isSelectedImp()) {
                        needHideSheets.push(sheetItem);
                    }
                });
                if (visibleSheetsAndSheetTabsCount !== needHideSheets.length) {
                    for (var i = 0; i < needHideSheets.length; i++) {
                        var sheetItem = needHideSheets[i];
                        var sheetItemName = sheetItem.name();
                        var sheetItemIndex = spread.getSheetIndex(sheetItemName);
                        var visibleArgs = {
                            sheetName: sheetItemName,
                            propertyName: 'isVisible',
                            cancel: false,
                            sheetIndex: sheetItemIndex,
                            oldValue: true,
                            newValue: false
                        };
                        spread._trigger(Core_1.Events.SheetChanging, visibleArgs);

                        var activeSheetChangingArgs = {
                            cancel: false,
                            oldSheet: sheetItem
                        };
                        if (sheetItemName === oldActiveSheet.name()) {
                            spread._trigger(Core_1.Events.ActiveSheetChanging, activeSheetChangingArgs);
                        }
                        if (!visibleArgs.cancel && !activeSheetChangingArgs.cancel) {
                            sheetItem._isSelectedImp(false, true);
                            hideSheetsStack.push(sheetItem);
                            sheetItem.visible(false);
                            var newHideActiveSheet = Core_1._getActiveSheet(spread);
                            if (i === needHideSheets.length - 1 && !newHideActiveSheet.isSelected()) {
                                var hideSheetName = newHideActiveSheet.name();
                                changingArgs = {
                                    oldValue: false,
                                    newValue: true,
                                    sheetName: hideSheetName,
                                    propertyName: 'isSelected',
                                    cancel: false,
                                    sheetIndex: spread.getSheetIndex(hideSheetName)
                                };
                                spread._trigger(Core_1.Events.SheetChanging, changingArgs);
                            }
                            spread._trigger(Core_1.Events.SheetChanged, {
                                sheetName: sheetItemName,
                                propertyName: 'isVisible',
                                sheetIndex: sheetItemIndex,
                                oldValue: true,
                                newValue: false
                            });
                        }
                    }
                    var newActiveSheet = Core_1._getActiveSheet(spread);
                    var sheetName = newActiveSheet.name();
                    if (changingArgs) {
                        if (!changingArgs.cancel) {
                            newActiveSheet._modelManager._setSelectedState(true);
                            spread && spread._tabStrip && spread._tabStrip.repaint();
                            var args = {
                                oldValue: false,
                                newValue: true,
                                sheetName: sheetName,
                                propertyName: 'isSelected',
                                sheetIndex: spread.getSheetIndex(sheetName)
                            };
                            spread._trigger(Core_1.Events.SheetChanged, args);
                        }
                        else {
                            newActiveSheet._modelManager._setSelectedState(false);
                        }
                    }


                    if (oldActiveSheet !== newActiveSheet) {
                        spread._trigger(Core_1.Events.ActiveSheetChanged, {
                            oldSheet: oldActiveSheet,
                            newSheet: newActiveSheet
                        });
                    }
                }
                else {
                    _raiseHiddenSheetInvalidEvent(oldActiveSheet);
                }
                spread.undoManager().clear();
            }
        };
        commandManager.register(COMMAND_PREFIX + HIDE_SHEET, hideSheet, null, false, false, false, false);
        var unhideRows = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    var selections = options.selections;
                    var flag = options.isAnyHiddenRowOrColBeforeFirstVisibleRowOrCol;
                    if (isNullOrUndefined(flag)) {
                        flag = options.isAnyHiddenRowOrColBeforeFirstVisibleRowOrCol = isAnyHiddenRowOrColBeforeFirstVisibleRowOrCol(sheet, selections[0]);
                    }
                    if (selections.length === 1 && flag) {
                        sheet.setRowVisible(selections[0].row - 1, true);
                        sheet._setTopRow(selections[0].row - 1);
                    }
                    else {
                        spread.suspendCalcService();
                        execInSelectionsForRowOrCol(selections, ROW, function (row) {
                            sheet.setRowVisible(row, true);
                            if (row === sheet._getFirstPageTopRow()) {
                                sheet._scrollTopRow = 0;
                                sheet._syncVScrollbarPosition();
                            }
                        });
                        spread.resumeCalcService();
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + UNHIDE_ROWS, unhideRows, null, false, false, false, false);
        var unhideColumns = {
            canUndo: true,
            execute: function (spread, options, isUndo) {
                return doAction(spread, options, isUndo, function (sheet) {
                    var selections = options.selections;
                    var flag = options.isAnyHiddenRowOrColBeforeFirstVisibleRowOrCol;
                    if (isNullOrUndefined(flag)) {
                        flag = options.isAnyHiddenRowOrColBeforeFirstVisibleRowOrCol = isAnyHiddenRowOrColBeforeFirstVisibleRowOrCol(sheet, selections[0]);
                    }
                    if (selections.length === 1 && flag) {
                        sheet.setColumnVisible(selections[0].col - 1, true);
                        sheet._setLeftColumn(selections[0].col - 1);
                    }
                    else {
                        spread.suspendCalcService();
                        execInSelectionsForRowOrCol(selections, COL, function (column) {
                            sheet.setColumnVisible(column, true);
                            if (column === sheet._getFirstPageLeftColumn()) {
                                sheet._scrollLeftCol = 0;
                                sheet._syncHScrollbarPosition();
                            }
                        });
                        spread.resumeCalcService();
                    }
                });
            }
        };
        commandManager.register(COMMAND_PREFIX + UNHIDE_COLUMNS, unhideColumns, null, false, false, false, false);
        var unhideSheet = {
            canUndo: false,
            execute: function (spread) {
                var sheetsAndSheetTabs = spread._getSheetsAndSheetTabs();
                if (hideSheetsStack.length === 0) {
                    for (var i = 0; i < sheetsAndSheetTabs.length; i++) {
                        if (!sheetsAndSheetTabs[i].visible()) {
                            hideSheetsStack.push(sheetsAndSheetTabs[i]);

                            sheetsAndSheetTabs[i]._isSelectedImp(false);
                        }
                    }
                }
                var oldSheet = Core_1._getActiveSheet(spread);
                if (hideSheetsStack.length > 0) {
                    sheetsAndSheetTabs.forEach(function (sheetItem) {
                        if (sheetItem !== oldSheet) {
                            sheetItem._isSelectedImp(false, true);
                        }
                    });
                    var tempSheet = hideSheetsStack.pop(), sheetName = tempSheet.name();
                    var args = {
                        sheetName: sheetName,
                        propertyName: 'isVisible',
                        cancel: false,
                        sheetIndex: spread.getSheetIndex(sheetName),
                        oldValue: false,
                        newValue: true
                    };
                    spread._trigger(Core_1.Events.SheetChanging, args);
                    if (args.cancel) {
                        return;
                    }
                    tempSheet.visible(true);
                    spread._trigger(Core_1.Events.SheetChanged, {
                        sheetName: sheetName,
                        propertyName: 'isVisible',
                        sheetIndex: spread.getSheetIndex(sheetName),
                        oldValue: false,
                        newValue: true
                    });
                    var activeArgs = {
                        oldSheet: oldSheet,
                        newSheet: tempSheet,
                        cancel: false
                    };
                    spread._trigger(Core_1.Events.ActiveSheetChanging, activeArgs);
                    if (activeArgs.cancel) {
                        return;
                    }
                    spread.setActiveSheet(tempSheet.name());
                }
                if (Core_1._getActiveSheet(spread) !== oldSheet) {
                    spread.focus(true);
                    spread._trigger(Core_1.Events.ActiveSheetChanged, {
                        oldSheet: oldSheet,
                        newSheet: Core_1._getActiveSheet(spread)
                    });
                }
            }
        };
        commandManager.register(COMMAND_PREFIX + UNHIDE_SHEET, unhideSheet, null, false, false, false, false);
        var removeSlicer = {
            canUndo: false,
            execute: function (spread, options) {
                var sheet = Core_1._getSheetFromName(spread, options.sheetName);
                if (!sheet) {
                    return;
                }
                spread.suspendPaint();
                var slicerNameArray = [];
                var slicers = sheet.slicers.all();
                if (!slicers || isEmptyObject(slicers)) {
                    return;
                }
                for (var item in slicers) {
                    if (slicers[item].isSelected()) {
                        slicerNameArray.push(slicers[item].name());
                    }
                }
                if (slicerNameArray.length > 0) {
                    commandManager.execute({
                        cmd: 'deleteFloatingObjects',
                        sheetName: sheet.name(),
                        floatingObjects: slicerNameArray
                    });
                }
                spread.resumePaint();
            }
        };
        commandManager.register(COMMAND_PREFIX + REMOVE_SLICER, removeSlicer, null, false, false, false, false);
    };
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
Core_1.Workbook._registerFeature('contextmenu', {
    setHost: function () {
        var self = this;
        var host = [self._host];

        if (!self.contextMenu) {
            self.contextMenu = new ContextMenu();
        }
        if (this.options.tabStripHost) {
            host.push(document.querySelector(this.options.tabStripHost));
        }
        $(host).bind('contextmenu.gcSheet', function (event) {
            if (self.options.allowContextMenu) {
                return self.contextMenu._doContextMenu(event, self);
            }
        });
    },
    dispose: function () {
        $(this._host).unbind('contextmenu.gcSheet');
    },
    onCultureChanged: function () {
        var contextMenu = this.contextMenu;
        if (contextMenu) {
            var allMenuData = contextMenu.menuData, builtInMenuData = contextMenu._getBuiltInMenuData(), nameMaps_1 = {};
            contextMenu._iteratorMenuData(builtInMenuData, function (menuItem) {
                if (!isNullOrUndefined(menuItem.name)) {
                    nameMaps_1[menuItem.name] = menuItem.text;
                }
            });
            contextMenu._iteratorMenuData(allMenuData, function (menuItem) {
                if (!isNullOrUndefined(menuItem.name) && !isNullOrUndefined(nameMaps_1[menuItem.name])) {
                    menuItem.text = nameMaps_1[menuItem.name];
                }
            });
        }
    }
});
/***/ }),

/***/ './dist/plugins/contextMenu/context-menu.ns.js':
/*!*****************************************************!*\
  !*** ./dist/plugins/contextMenu/context-menu.ns.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var en = __webpack_require__(/*! ./context-menu.res.en */ './dist/plugins/contextMenu/context-menu.res.en.js');
exports.SR = {
    en: en
};
/***/ }),

/***/ './dist/plugins/contextMenu/context-menu.res.en.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/contextMenu/context-menu.res.en.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.copy = 'Copy';
exports.cut = 'Cut';
exports.pasteOptions = 'Paste Options:';
exports.pasteAll = 'All';
exports.pasteFormula = 'Formulas';
exports.pasteValues = 'Values';
exports.pasteFormatting = 'Formatting';
exports.pasteValuesFormatting = 'Values&Formatting';
exports.pasteFormulaFormatting = 'Formula&Formatting';
exports.clearContents = 'Clear Contents';
exports.insertRows = 'Insert';
exports.insertColumns = 'Insert';
exports.deleteRows = 'Delete';
exports.deleteColumns = 'Delete';
exports.insertSheet = 'Insert';
exports.deleteSheet = 'Delete';
exports.insertComment = 'Insert Comment';
exports.filter = 'Filter';
exports.sort = 'Sort';
exports.insertCopiedCells = 'Insert Copied Cells...';
exports.insertCutCells = 'Insert Cut Cells...';
exports.shiftCellsRight = 'Shift Cells Right';
exports.shiftCellsDown = 'Shift Cells Down';
exports.headerInsertCopiedCells = 'Insert Copied Cells';
exports.headerInsertCutCells = 'Insert Cut Cells';
exports.slicerSortAscend = 'Sort A to Z';
exports.slicerSortDescend = 'Sort Z to A';
exports.sortAscend = 'Sort A to Z';
exports.sortDescend = 'Sort Z to A';
exports.hideRows = 'Hide';
exports.hideColumns = 'Hide';
exports.hideSheet = 'Hide';
exports.unhideSheet = 'Unhide';
exports.unhideColumns = 'Unhide';
exports.unhideRows = 'Unhide';
exports.editComment = 'Edit Comment';
exports.deleteComment = 'Delete Comment';
exports.toggleComment = 'Show/Hide Comment';
exports.removeSlicer = 'Remove';
exports.removeFloatingObject = 'Remove';
exports.tableInsert = 'Insert';
exports.tableInsertRowsAbove = 'Table Rows Above';
exports.tableInsertRowsBelow = 'Table Row Below';
exports.tableInsertColumnsLeft = 'Table Columns to the Left';
exports.tableInsertColumnsRight = 'Table Columns to the Right';
exports.tableDelete = 'Delete';
exports.tableDeleteRows = 'Table Rows';
exports.tableDeleteColumns = 'Table Columns';
exports.hideSheetFailureInfo = 'A workbook must contain at least one visible worksheet.\nTo hide, delete or move the selected sheet(s), you must first insert a new sheet or unhide a sheet that is already hidden.';
exports.pivotTableRefresh = 'Refresh';
exports.pivotTableMove = 'Move';
exports.pivotTableRemove_ = 'Remove {0}';
exports.pivotTableRemoveGrandTotal = 'Remove GrandTotal';
exports.pivotTableValueFieldSettings = 'Value Field Settings...';
exports.pivotTableOptions = 'PivotTable Options...';
exports.pivotTableNumberFormat = 'Number Format...';
exports.pivotTableSort = 'Sort';
exports.pivotTableSummarizeValuesBy = 'Summarize Values By';
exports.pivotTableSum = 'Sum';
exports.pivotTableCount = 'Count';
exports.pivotTableAverage = 'Average';
exports.pivotTableMax = 'Max';
exports.pivotTableMin = 'Min';
exports.pivotTableProduct = 'Product';
exports.pivotTableDistinctCount = 'Distinct Count';
exports.pivotTableMoreOptions = 'More Options';
exports.pivotTableShowValueAs = 'Show Value As';
exports.pivotTableNoCalculation = 'No Calculation';
exports.pivotTableGrandTotal = '% of Grand Total';
exports.pivotTableColumnTotal = '% of Column Total';
exports.pivotTableRowTotal = '% of Row Total';
exports.pivotTableOf = '% Of...';
exports.pivotTableParentRowTotal = '% of Parent Row Total';
exports.pivotTableParentColumnTotal = '% of Parent Column Total';
exports.pivotTableOfParentTotal = '% of Parent Total...';
exports.pivotTableDifferenceFrom = 'Difference From...';
exports.pivotTablePercentDifferenceFrom = '% Difference From...';
exports.pivotTableRunningTotalIN = 'Running Total In...';
exports.pivotTablePercentRunningTotalIn = '% Running Total In...';
exports.pivotTableRankSmallestToLargest = 'Rank Smallest to Largest...';
exports.pivotTableRankLargestToSmallest = 'Rank Largest to Smallest...';
exports.pivotTableIndex = 'Index';
exports.pivotTableShowDetails = 'Show Details';
exports.pivotTableGroup = 'Group...';
exports.pivotTableUnGroup = 'Ungroup...';
exports.pivotTableExpandOrCollapse = 'Expand/Collapse';
exports.pivotTableFilter = 'Filter';
exports.pivotTableSubtotal_ = 'Subtotal {0}';
exports.pivotTableHideFieldList = 'Hide Field List';
exports.pivotTableFieldSettings = 'Field Settings...';
exports.pivotTableClearFilterFrom_ = 'Clear Filter From {0}';
exports.pivotTableKeepOnlySelectedItems = 'Keep Only Selected Items';
exports.pivotTableHideSelectedItems = 'Hide Selected Items';
exports.pivotTableTop10 = 'Top 10...';
exports.pivotTableLabelFilters = 'Label Filters...';
exports.pivotTableLabelFilters_Date = 'Date Filters...';
exports.pivotTableValueFilters = 'Value Filters...';
exports.pivotTableExpand = 'Expand';
exports.pivotTableCollapse = 'Collapse';
exports.pivotTableExpandEntireField = 'Expand Entire Field';
exports.pivotTableCollapseEntireField = 'Collapse Entire Field';
exports.pivotTableCollapseTo_ = 'Collapse to {0}';
exports.pivotTableExpandTo_ = 'Expand to {0}';
exports.pivotTableMove_ToBeginning = 'Move {0} to Beginning';
exports.pivotTableMove_Up = 'Move {0} Up';
exports.pivotTableMove_Down = 'Move {0} Down';
exports.pivotTableMove_ToEnd = 'Move {0} to end';
exports.pivotTableMove_ToLeft = 'Move {0} to left';
exports.pivotTableMove_ToRight = 'Move {0} to Right';
exports.pivotTableMove_ToColumns = 'Move {0} to columns';
exports.sigmaValue = '\u2211 Values';
exports.sigmaValueTemp = 'Values';
exports.pivotTableSortAscend = 'Sort Smallest to Largest';
exports.pivotTableSortDescend = 'Sort Largest to Smallest';
exports.pinRows = 'Pin/Unpin Rows';
exports.pinColumns = 'Pin/Unpin Columns';
exports.paste = 'Paste';
/***/ }),

/***/ './dist/plugins/contextMenu/menu-view.js':
/*!***********************************************!*\
  !*** ./dist/plugins/contextMenu/menu-view.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var $ = Core_1.GC$, createElement = Core_1._util._createElement;
var Types = Common_1.Common._Types, isNullOrUndefined = Types._isNullOrUndefined, isFunction = Types._isFunction, cloneObject = Types._cloneObject, keyword_undefined = void 0;
var DOCUMENT = document;
var UI_RES = {
    _MOUSE_ENTER: 'mouseenter',
    _MOUSE_LEAVE: 'mouseleave',
    _CLICK: 'click',
    _COMMAND_EXECUTED: 'gc.command.executed',
    _CLASS_SELECTOR_PREFIX: '.',
    _NAMESPACE: 'gc-ui-contextmenu',
    _CLASS_SEPARATOR: '-',
    _MENU_CONTAINER_CLASS_SUFFIX: 'container',
    _MENUITEM_HOVER_CLASS_SUFFIX: 'hover',
    _DISABLE_MENUITEM_HOVER_CLASS_SUFFIX: 'disable-hover',
    _TEXT_CLASS_SUFFIX: 'text',
    _ICON_CLASS_SUFFIX: 'icon',
    _MENUITEM_CLASS_SUFFIX: 'menuitem',
    _NONSELECTIVE_MENUITEM_CLASS_SUFFIX: 'nonselective-menuitem',
    _MENUITEM_CONTENT_CLASS_SUFFIX: 'menuitem-content',
    _SUP_MENUITEM_CLASS_SUFFIX: 'sup-container',
    _SEPARATOR_CLASS_SUFFIX: 'separator',
    _SUP_MENUITEM_ICON_CLASS_SUFFIX: 'sup-indicator',
    _SUB_MENUITEM_CLASS_SUFFIX: 'subitems-container',
    _GROUP_CONTAINER_CLASS_SUFFIX: 'group-container',
    _TITLE: 'title',
    _GROUP_MENUITEM_CLASS_SUFFIX: 'group-header',
    _GROUPITEMS_MENUITEM_CONTAINER_CLASS_SUFFIX: 'groupitems-container',
    _GROUPITEMS_MENUITEM_CLASS_SUFFIX: 'groupitem',
    _NONEXECUTABLE_CLASS_SUFFIX: 'nonexecutable',
    _EXECUTABLE_CLASS_SUFFIX: 'executable',
    _DISABLE_CLASS_SUFFIX: 'disable',
    _GC_UI_ELEMENT: 'gcUIElement',
    _SELF_RESOLVE_KEYDOWN: 'gcContextMenu',
    _MENUITEM_STATUSBAR: 'gc-statusbar-contextmenu',
    _JQ_DEFAULT: ' ui-widget',
    _JQ_HOVER: ' ui-state-hover',
    _JQ_INDICATOR: ' ui-icon ui-icon-triangle-1-e',
    _DIV: 'DIV',
    _SPAN: 'SPAN',
    _KEY_DOWN: 'keydown.ctx.gcSheet',
    _ITEM_STYLE_DISPLAY_NONE: 'none',
    _ITEM_STYLE_DISPLAY_INLINE_BLOCK: 'inline-block',
    _ITEM_STYLE_VISIBILITY_VISIBLE: 'visible',
    _ITEM_STYLE_VISIBILITY_HIDDEN: 'hidden'
};
var MENUITEM_HOVER_CLASS = UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._MENUITEM_HOVER_CLASS_SUFFIX, MENUITEM_CLASS = UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._MENUITEM_CLASS_SUFFIX, NONSELECTIVE_MENUITEM_CLASS = UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._NONSELECTIVE_MENUITEM_CLASS_SUFFIX, MENUITEM_CONTENT_CLASS = UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._MENUITEM_CONTENT_CLASS_SUFFIX, EXECUTABLE_MENUITEM_CLASS = UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._EXECUTABLE_CLASS_SUFFIX, SUP_MENUITEM_CLASS = UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._SUP_MENUITEM_CLASS_SUFFIX, SUBMENU_CLASS = UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._SUB_MENUITEM_CLASS_SUFFIX;
var MENUITEM_STATUSBAR_CHECK_CLASS = UI_RES._MENUITEM_STATUSBAR + UI_RES._CLASS_SEPARATOR + 'check', MENUITEM_STATUSBAR_CHECK_CONTAINER_CLASS = UI_RES._MENUITEM_STATUSBAR + UI_RES._CLASS_SEPARATOR + 'check-container', MENUITEM_STATUSBAR_CONTENT_CLASS = UI_RES._MENUITEM_STATUSBAR + UI_RES._CLASS_SEPARATOR + 'content', MENUITEM_STATUSBAR_STATUS_CLASS = UI_RES._MENUITEM_STATUSBAR + UI_RES._CLASS_SEPARATOR + 'status';
function isObject(value) {
    if (value instanceof Object) {
        return true;
    }
}


var MenuView = (function () {
    function MenuView() {
    }
    MenuView.prototype._create = function (host, menuData, spread, elem) {
        var self = this;
        self._host = $(host);
        self._menuData = cloneObject(menuData);
        self._commandManager = spread.commandManager();
        self._context = spread;
        self._elem = elem;
        self._menuItems = [];
        self._menus = {};
        self._menuStack = [];
        self._activeMenuItem = null;
        self._initMenuView();
    };
    MenuView.prototype._repositionMenuView = function () {
        var self = this;
        var leftOffset = parseInt(self._host.css('left'), 10);
        var topOffset = parseInt(self._host.css('top'), 10);
        var menuViewWidth = self._host.width();
        var menuViewHeight = self._host.height();
        var spreadHost = $(self._context.getHost());
        var spreadWidth = spreadHost.width();
        var hostInfo = self.hostInfo;
        if (!isNullOrUndefined(hostInfo)) {
            var hostTop = hostInfo.top, hostWidth = hostInfo.width, hostHeight = hostInfo.height;
            if (leftOffset + menuViewWidth > hostWidth) {
                leftOffset = (leftOffset - menuViewWidth) > 0 ? (leftOffset - menuViewWidth) : leftOffset;
                self._host.css('left', leftOffset);
            }
            if (window.innerHeight - hostTop - hostHeight < hostTop) {
                topOffset = topOffset - menuViewHeight;
                self._host.css('top', topOffset);
            }
        }
        else {
            var spreadHeight = spreadHost.height();
            if (leftOffset + menuViewWidth > spreadWidth) {
                leftOffset = (leftOffset - menuViewWidth) > 0 ? (leftOffset - menuViewWidth) : leftOffset;
                self._host.css('left', leftOffset);
            }
            if (topOffset + menuViewHeight > spreadHeight) {
                if (topOffset > menuViewHeight) {
                    topOffset = topOffset - menuViewHeight;
                }
                else if (spreadHeight >= menuViewHeight) {
                    topOffset = spreadHeight - menuViewHeight;
                }
                else {
                    var display = self._host.css('display');
                    self._host.css('display', UI_RES._ITEM_STYLE_DISPLAY_NONE);
                    var docElement = DOCUMENT.documentElement;
                    var documentHeight = docElement.scrollHeight;
                    var spreadOffsetTop = spreadHost.offset().top;
                    var footerHeight = documentHeight - spreadOffsetTop - spreadHeight;
                    if (documentHeight - spreadOffsetTop > topOffset + menuViewHeight) {

                    }
                    else if (documentHeight > menuViewHeight) {
                        topOffset = spreadHeight + footerHeight - menuViewHeight;
                    }
                    self._host.css('display', display);
                }
                self._host.css('top', topOffset);
            }
        }
    };
    MenuView.prototype._initMenuView = function () {
        var self = this;
        var menuData = self._menuData;
        if (isNullOrUndefined(menuData) || !isObject(menuData) || menuData.length < 1) {
            return;
        }
        if (!(menuData instanceof Array)) {
            menuData = [menuData];
        }
        var menuName = 'menuView';
        var menuItems = self._createMenuItems(menuName, menuData);
        self._menus.menuView = menuItems;
        var menuView = self._getMenuView(self._menuData);
        menuView.appendTo(self._host);
        self._repositionMenuView();
        self._attachEvent();
        self._menuStack.push({
            name: menuName,
            menuView: menuView
        });
    };
    MenuView.prototype._createMenuItems = function (menuName, menuData) {
        var self = this;
        var menuItemsCount = menuData.length, menuItemIndex = 0;
        var menuItems = [];
        for (; menuItemIndex < menuItemsCount; menuItemIndex++) {
            var itemData = menuData[menuItemIndex];
            if (isNullOrUndefined(itemData) || itemData.type === 'separator') {
                continue;
            }
            else if (itemData.subMenu) {
                self._menus[itemData.name] = self._createMenuItems(itemData.name, itemData.subMenu);
            }
            else if (itemData.type === 'groupHeader') {
                self._collectGroupItemsByGroupHeader(itemData, menuData);
                self._menus[itemData.name] = self._createMenuItems(menuName, itemData.groups);
            }
            menuItems.push(self._createMenuItem(menuName, itemData));
        }
        return menuItems;
    };
    MenuView.prototype._createMenuItem = function (menuName, menuItemData) {
        var self = this;
        var menuItemHost;

        if (menuItemData.type === 'groupHeader') {
            menuItemHost = self._createNonSelectiveMenuItemHost();
        }
        else {
            menuItemHost = self._createMenuItemHost();
        }
        var menuItemView = self.createMenuItemElement(menuItemData);
        if (isNullOrUndefined(menuItemView)) {
            return;
        }
        if (menuItemView instanceof HTMLElement) {
            menuItemView = $(menuItemView);
        }
        menuItemView.appendTo(menuItemHost);
        var menuItem = {
            name: menuItemData.name,
            host: menuItemHost,
            menuItemData: menuItemData,
            menuName: menuName
        };
        self._menuItems.push(menuItem);
        return menuItem;
    };
    MenuView.prototype._createMenuItemHost = function () {
        var menuItemContainer = $(createElement(UI_RES._DIV));
        menuItemContainer.addClass(MENUITEM_CLASS);
        return menuItemContainer;
    };
    MenuView.prototype._createNonSelectiveMenuItemHost = function () {
        var menuItemContainer = $(createElement(UI_RES._DIV));
        menuItemContainer.addClass(NONSELECTIVE_MENUITEM_CLASS);
        return menuItemContainer;
    };


    MenuView.prototype.createMenuItemElement = function (menuItemData) {
        var self = this;
        var menuItemView;
        var type = menuItemData.type;
        if (type === 'groupHeader') {
            menuItemView = self._createGroupMenuView(menuItemData);
        }
        else if (type === 'groupItem') {
            menuItemView = self._createGroupMenuItemView(menuItemData);
        }
        else if (type === 'statusBar') {
            menuItemView = self._createStatusbarItemView(menuItemData);
        }
        else if (menuItemData.subMenu) {
            menuItemView = self._createSubMenuView(menuItemData);
        }
        else {
            menuItemView = self._createBaseMenuItemView(menuItemData);
        }
        return menuItemView;
    };
    MenuView.prototype._createBaseMenuItemView = function (menuItemData) {
        var menuItemContent = $(createElement(UI_RES._DIV)).addClass(MENUITEM_CONTENT_CLASS);
        if (menuItemData.command) {
            if (menuItemData.disable) {
                menuItemContent.addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._DISABLE_CLASS_SUFFIX);
            }
            else {
                menuItemContent.addClass(EXECUTABLE_MENUITEM_CLASS);
            }
        }
        else {
            menuItemContent.addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._NONEXECUTABLE_CLASS_SUFFIX);
        }
        var icon = $(createElement(UI_RES._SPAN)).addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._ICON_CLASS_SUFFIX);
        if (menuItemData.iconClass) {
            icon.addClass(menuItemData.iconClass);
        }
        icon.appendTo(menuItemContent);
        if (menuItemData.text) {
            var text = $(createElement(UI_RES._SPAN)).addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._TEXT_CLASS_SUFFIX);
            text[0].innerHTML = menuItemData.text;
            text.appendTo(menuItemContent);
        }
        if (menuItemData.shortcut) {
            var text = $(createElement(UI_RES._SPAN)).addClass('gc-ui-contextmenu-shortcut');
            text[0].innerHTML = menuItemData.shortcut;
            text.appendTo(menuItemContent);
        }
        return menuItemContent;
    };
    MenuView.prototype._createSeparatorLine = function (menuItemData) {
        return $(createElement(UI_RES._DIV)).addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._SEPARATOR_CLASS_SUFFIX);
    };
    MenuView.prototype._createGroupMenuView = function (menuItemData) {
        var self = this;
        var groupContainer = $(createElement(UI_RES._DIV)).addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._GROUP_CONTAINER_CLASS_SUFFIX);
        if (menuItemData.groups.length <= 0) {
            return groupContainer;
        }
        var groupHeaderView = self._createBaseMenuItemView(menuItemData);
        groupHeaderView.addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._GROUP_MENUITEM_CLASS_SUFFIX);
        groupHeaderView.appendTo(groupContainer);
        var groupItemsContainer = $(createElement(UI_RES._DIV)).addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._GROUPITEMS_MENUITEM_CONTAINER_CLASS_SUFFIX);
        var groupItemsData = menuItemData.groups, groupItemsCount = groupItemsData.length, groupItemIndex = 0;
        for (; groupItemIndex < groupItemsCount; groupItemIndex++) {
            var groupMenuItem = self._findMenuItem('name', groupItemsData[groupItemIndex].name);
            var groupItemView = groupMenuItem.host;
            groupItemView.addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._GROUPITEMS_MENUITEM_CLASS_SUFFIX);
            groupItemView.appendTo(groupItemsContainer);
        }
        groupItemsContainer.appendTo(groupContainer);
        return groupContainer;
    };
    MenuView.prototype._createGroupMenuItemView = function (menuItemData) {
        var self = this;
        var menuItemView = self._createBaseMenuItemView(menuItemData);
        var textSpan = menuItemView.find(UI_RES._CLASS_SELECTOR_PREFIX + UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._TEXT_CLASS_SUFFIX);
        textSpan.remove();
        menuItemView.attr(UI_RES._TITLE, menuItemData.text);
        return menuItemView;
    };
    MenuView.prototype._createStatusbarItemView = function (menuItemData) {
        var itemContainer = createElement('div');
        var menuItemContent = $(itemContainer).addClass(MENUITEM_CONTENT_CLASS);
        var visible = menuItemData.visible, menuContent = menuItemData.menuContent, status = menuItemData.status;
        var itemCheck = createElement('div');
        $(itemCheck).addClass(MENUITEM_STATUSBAR_CHECK_CLASS);
        var itemCheckContainer = createElement('div');
        $(itemCheckContainer).addClass(MENUITEM_STATUSBAR_CHECK_CONTAINER_CLASS);
        itemCheckContainer.appendChild(itemCheck);
        itemCheckContainer.style.visibility = visible ? UI_RES._ITEM_STYLE_VISIBILITY_VISIBLE : UI_RES._ITEM_STYLE_VISIBILITY_HIDDEN;
        var itemName = createElement('div');
        itemName.innerText = menuContent;
        $(itemName).addClass(MENUITEM_STATUSBAR_CONTENT_CLASS);
        var itemStatus = createElement('div');
        $(itemStatus).addClass(MENUITEM_STATUSBAR_STATUS_CLASS);
        if (status) {
            itemStatus.innerText = status;
            itemStatus.style.display = UI_RES._ITEM_STYLE_DISPLAY_INLINE_BLOCK;
        }
        else {
            itemStatus.style.display = UI_RES._ITEM_STYLE_DISPLAY_NONE;
        }
        itemContainer.appendChild(itemCheckContainer);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemStatus);
        return menuItemContent;
    };
    MenuView.prototype._createSubMenuView = function (menuItemData) {
        var self = this;
        var supMenuItemContainer = $(createElement(UI_RES._DIV)).addClass(SUP_MENUITEM_CLASS);
        var supMenuItemView = self._createBaseMenuItemView(menuItemData);
        if (menuItemData.subMenu.length > 0) {
            var subMenuIndicatorIcon = $(createElement(UI_RES._SPAN)).addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._SUP_MENUITEM_ICON_CLASS_SUFFIX + UI_RES._JQ_INDICATOR);
            subMenuIndicatorIcon.appendTo(supMenuItemView);
            var subMenuView = self._getMenuView(menuItemData.subMenu);
            subMenuView.addClass(SUBMENU_CLASS);
            subMenuView.appendTo(supMenuItemContainer);
        }
        supMenuItemView.appendTo(supMenuItemContainer);
        return supMenuItemContainer;
    };
    MenuView.prototype._getMenuView = function (menuData) {
        var self = this;
        var menuContainer = $(createElement(UI_RES._DIV)).addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._MENU_CONTAINER_CLASS_SUFFIX + UI_RES._JQ_DEFAULT);
        var menuDataCount = menuData.length, menuDataIndex = 0;
        for (; menuDataIndex < menuDataCount; menuDataIndex++) {
            if (isNullOrUndefined(menuData[menuDataIndex])) {
                continue;
            }
            var menuItemName = menuData[menuDataIndex].name;
            if (!isNullOrUndefined(menuItemName)) {
                var menuItem = self._findMenuItem('name', menuItemName);
                if (!isNullOrUndefined(menuItem)) {
                    menuItem.host.appendTo(menuContainer);
                }
            }
            else if (menuData[menuDataIndex].type === 'separator') {
                var menuItemContainer = self._createNonSelectiveMenuItemHost();
                var menuItemView = self._createSeparatorLine(menuData[menuDataIndex]);
                menuItemView.appendTo(menuItemContainer);
                menuItemContainer.appendTo(menuContainer);
            }
        }
        return menuContainer;
    };
    MenuView.prototype._findMenuItem = function (propertyName, value) {
        var self = this;
        var menuItems = self._menuItems;
        var menuItemsCount = menuItems.length, menuItemIndex = 0;
        for (; menuItemIndex < menuItemsCount; menuItemIndex++) {
            if ((value instanceof $) ? value[0] === menuItems[menuItemIndex][propertyName][0] : menuItems[menuItemIndex][propertyName] === value) {
                return menuItems[menuItemIndex];
            }
        }
    };
    MenuView.prototype._collectGroupItemsByGroupHeader = function (groupHeaderData, menuData) {
        groupHeaderData.groups = [];
        var menuItemsCount = menuData.length, menuItemIndex = 0;
        for (; menuItemIndex < menuItemsCount; menuItemIndex++) {
            var itemData = menuData[menuItemIndex];
            if (!itemData) {
                continue;
            }
            if (itemData.group && itemData.group === groupHeaderData.name) {
                itemData.type = 'groupItem';
                groupHeaderData.groups.push(itemData);
                menuData.splice(menuItemIndex, 1);
                menuItemIndex--;
            }
        }
    };
    MenuView.prototype._attachEvent = function () {
        var self = this;
        $(UI_RES._CLASS_SELECTOR_PREFIX + MENUITEM_CLASS).bind(UI_RES._MOUSE_ENTER, function () {
            var target = $(this);
            var menuItem = self._findMenuItem('host', target);
            self._activeMenuItem = menuItem;

            var menuStack = self._menuStack;
            var i = 0, count = menuStack.length;
            for (; i < count; i++) {
                if (menuItem.menuName !== self._menuStack[count - i - 1].name) {
                    self._closeSubMenu();
                }
                else {
                    break;
                }
            }
            self._updateUIState();
            self._showSubMenu(false);
        }).bind(UI_RES._MOUSE_LEAVE, function () {
            self._activeMenuItem = null;
            self._updateUIState();
        }).bind(UI_RES._CLICK, function (event) {
            var target = $(this);
            var menuItem = self._findMenuItem('host', target);
            self._activeMenuItem = menuItem;
            var result = self._selectMenuItem(false, event);
            if (result) {
                self._close();
            }
        });
        // $(DOCUMENT).bind(UI_RES._KEY_DOWN, function (event) {
        //     if (event.target && $(event.target).attr(UI_RES._GC_UI_ELEMENT) === UI_RES._SELF_RESOLVE_KEYDOWN) {
        //         return;
        //     }
        //     var result;

        //     switch (event.keyCode) {
        //         case 27:

        //             result = self._closeSubMenu();
        //             if (!result) {
        //                 self._close();
        //             }
        //             break;
        //         case 32:
        //         case 13:
        //             result = self._selectMenuItem(true, event);
        //             if (result) {
        //                 self._close();
        //             }
        //             break;
        //         case 9:
        //             if (event.shiftKey) {
        //                 self._moveToNextMenuItem(false, true);
        //             }
        //             else {
        //                 self._moveToNextMenuItem(true, true);
        //             }
        //             break;
        //         case 37:
        //             var subMenuItemName = self._closeSubMenu();
        //             var subMenuItem = self._findMenuItem('name', subMenuItemName);
        //             if (subMenuItem) {
        //                 self._activeMenuItem = subMenuItem;
        //             }
        //             if (self._activeMenuItem && self._activeMenuItem.menuItemData.group) {
        //                 self._moveToNextMenuItem(false, true);
        //             }
        //             break;
        //         case 38:
        //             self._moveToNextMenuItem(false, false);
        //             break;
        //         case 39:
        //             if (self._activeMenuItem && self._activeMenuItem.menuItemData.group) {
        //                 self._moveToNextMenuItem(true, true);
        //             }
        //             self._showSubMenu(true);
        //             break;
        //         case 40:
        //             self._moveToNextMenuItem(true, false);
        //             break;
        //         default:
        //             break;
        //     }
        //     if (event.preventDefault) {
        //         event.preventDefault();
        //     }
        //     else {
        //         event.returnValue = false;
        //     }
        // });
    };
    MenuView.prototype._repositionSubMenu = function (subMenu) {
        var parent = subMenu.parent();
        var parentRect = parent[0].getBoundingClientRect();
        var subMenuWidth = subMenu.width();
        var subMenuHeight = subMenu.height();
        var leftPos = parentRect.left + parentRect.width - 2;
        var topPos = parentRect.top;
        if (parentRect.left + parentRect.width - 2 + subMenuWidth > window.innerWidth) {
            leftPos = parentRect.left - subMenuWidth + 2;
        }
        if (parentRect.top + subMenuHeight > window.innerHeight) {
            topPos = parentRect.top + parentRect.height - subMenuHeight;
        }
        subMenu.css({
            left: leftPos,
            top: topPos
        });
    };
    MenuView.prototype._getCommand = function (menuItemData) {
        return menuItemData.command;
    };
    MenuView.prototype.getCommandOptions = function (menuItemData, host, event) {
    };
    MenuView.prototype._selectMenuItem = function (isKeyboardEvent, event) {
        var self = this;
        var selectedMenuItem = self._activeMenuItem;
        if (!selectedMenuItem || selectedMenuItem.menuItemData.disable) {
            return;
        }
        var menuItemData = selectedMenuItem.menuItemData;
        if (menuItemData.subMenu) {
            if (menuItemData.subMenu.length > 0) {
                self._showSubMenu(isKeyboardEvent);
            }
            return;
        }
        self._executeCommand(event);
        return true;
    };
    MenuView.prototype._executeCommand = function (event) {
        var self = this;
        var menuItem = self._activeMenuItem;
        var command = self._getCommand(menuItem.menuItemData);
        if (!isNullOrUndefined(command)) {
            var commandOptions = self.getCommandOptions(menuItem.menuItemData, menuItem.host[0], event);
            var commandManager = self._commandManager;
            if (isFunction(command)) {
                command(self._context, commandOptions);
            }
            else {
                var sheet = Core_1._getActiveSheet(self._context);
                var acCol = sheet.getActiveColumnIndex();
                var acRow = sheet.getActiveRowIndex();
                var table = sheet.tables && sheet.tables.find(acRow, acCol);
                var pivotTable = sheet.pivotTables && sheet.pivotTables.findPivotTable(acRow, acCol);
                if (!isNullOrUndefined(pivotTable)) {
                    var options = menuItem.menuItemData.commandOptions;
                    if (isNullOrUndefined(options)) {
                        options = {};
                    }
                    if (isNullOrUndefined(options.pivotTableName)) {
                        options.pivotTableName = pivotTable.name();
                    }
                    if (isNullOrUndefined(options.pivotTableCellInfo)) {
                        options.pivotTableCellInfo = pivotTable.getPivotInfoImp(acRow, acCol, false, false, true);
                    }
                    commandManager.execute({
                        cmd: command,
                        sheetName: sheet.name(),
                        selections: sheet.getSelections(),
                        activeRow: acRow,
                        activeCol: acCol,
                        commandOptions: options
                    });
                }
                else {
                    commandManager.execute({
                        cmd: command,
                        sheetName: sheet.name(),
                        selections: sheet.getSelections(),
                        activeRow: acRow,
                        activeCol: acCol,
                        commandOptions: commandOptions,
                        tableName: table ? table.name() : '',
                    });
                }
            }
        }
    };
    MenuView.prototype._detachEvent = function () {
        $(UI_RES._CLASS_SELECTOR_PREFIX + MENUITEM_CLASS).unbind(UI_RES._MOUSE_ENTER).unbind(UI_RES._MOUSE_LEAVE).unbind(UI_RES._CLICK);
        // $(DOCUMENT).unbind(UI_RES._KEY_DOWN);
    };
    MenuView.prototype._dispose = function () {
        var self = this;
        self._host = null;
        self._menuData = null;
        self._commandManager = null;
        self._context = null;
        self._elem = null;
        self._menuItems = null;
        self._menus = null;
        self._activeMenuItem = null;
        self._detachEvent();
    };
    MenuView.prototype._closeSubMenu = function () {
        var self = this;
        if (self._menuStack.length > 1) {
            var subMenu = self._menuStack.pop();
            var $subMenu = subMenu.menuView;
            var $menuItemsInSubMenu = $subMenu.find(UI_RES._CLASS_SELECTOR_PREFIX + MENUITEM_CLASS);
            $menuItemsInSubMenu.removeClass(MENUITEM_HOVER_CLASS + UI_RES._JQ_HOVER);
            subMenu.menuView.hide();
            return subMenu.name;
        }
    };
    MenuView.prototype._updateUIState = function () {
        var self = this;
        var currentMenuItems = self._getMenuItemsInCurrentMenu(true);
        if (currentMenuItems) {
            var i = 0, count = currentMenuItems.length;
            for (; i < count; i++) {
                currentMenuItems[i].host.removeClass(MENUITEM_HOVER_CLASS + UI_RES._JQ_HOVER);
            }
            if (self._activeMenuItem) {
                var menuItemData = self._activeMenuItem.menuItemData;
                if (menuItemData.disable) {
                    self._activeMenuItem.host.addClass(UI_RES._NAMESPACE + UI_RES._CLASS_SEPARATOR + UI_RES._DISABLE_MENUITEM_HOVER_CLASS_SUFFIX + UI_RES._JQ_HOVER);
                }
                else {
                    self._activeMenuItem.host.addClass(MENUITEM_HOVER_CLASS + UI_RES._JQ_HOVER);
                }
            }
        }
    };
    MenuView.prototype._close = function () {
        var self = this;
        self._elem.trigger(UI_RES._COMMAND_EXECUTED);
        self._dispose();
    };
    MenuView.prototype._moveToNextMenuItem = function (isDescend, isTabKey) {
        var self = this;
        var currentMenuItems = self._getMenuItemsInCurrentMenu(isTabKey);
        var activeMenuItemIndex;
        if (self._activeMenuItem) {
            activeMenuItemIndex = self._getMenuItemIndexInCurrentMenu(self._activeMenuItem, currentMenuItems);

            if (!activeMenuItemIndex) {
                var activeGroupMenuItems = self._menus[self._activeMenuItem.menuItemData.group];
                if (activeGroupMenuItems) {
                    var activeMenuItem = activeGroupMenuItems[0];
                    activeMenuItemIndex = self._getMenuItemIndexInCurrentMenu(activeMenuItem, currentMenuItems);
                }
            }
        }
        if (isDescend) {
            if (activeMenuItemIndex === keyword_undefined || activeMenuItemIndex === currentMenuItems.length - 1) {
                activeMenuItemIndex = -1;
            }
            activeMenuItemIndex = (typeof activeMenuItemIndex === 'number') ? activeMenuItemIndex + 1 : 0;
        }
        else {
            if (activeMenuItemIndex === keyword_undefined || activeMenuItemIndex === 0) {
                activeMenuItemIndex = currentMenuItems.length;
            }
            activeMenuItemIndex = (typeof activeMenuItemIndex === 'number') ? activeMenuItemIndex - 1 : 0;
        }
        self._activeMenuItem = currentMenuItems[activeMenuItemIndex];
        self._updateUIState();
    };
    MenuView.prototype._getMenuItemsInCurrentMenu = function (isTabKey) {
        var self = this;
        var currentMenuName, currentMenuItems;


        currentMenuName = self._menuStack[self._menuStack.length - 1].name;
        currentMenuItems = self._menus[currentMenuName];

        var i = 0, count = currentMenuItems.length;
        var menuItemsInCurrentMenu = [];
        for (; i < count; i++) {
            if (currentMenuItems[i].menuItemData.type === 'groupHeader') {
                var groupMenuItems = self._menus[currentMenuItems[i].menuItemData.name];
                if (isTabKey) {
                    var j = 0, groupMenuItemsCount = groupMenuItems.length;
                    for (; j < groupMenuItemsCount; j++) {
                        menuItemsInCurrentMenu.push(groupMenuItems[j]);
                    }
                }
                else {
                    menuItemsInCurrentMenu.push(groupMenuItems[0]);
                }
                continue;
            }
            menuItemsInCurrentMenu.push(currentMenuItems[i]);
        }
        return menuItemsInCurrentMenu;
    };
    MenuView.prototype._getMenuItemIndexInCurrentMenu = function (menuItem, currentMenuItems) {
        var count = currentMenuItems.length;
        for (var i = 0; i < count; i++) {
            if (menuItem.name === currentMenuItems[i].name) {
                return i;
            }
        }
    };
    MenuView.prototype._showSubMenu = function (isKeyboardEvent) {
        var self = this;
        var activeMenuItem = self._activeMenuItem;
        if (activeMenuItem) {
            var activeMenuItemData = activeMenuItem.menuItemData;
            if (activeMenuItemData.subMenu && activeMenuItemData.subMenu.length > 0) {
                if (activeMenuItemData.name !== self._menuStack[self._menuStack.length - 1].name) {
                    var $subMenu = $(activeMenuItem.host.find(UI_RES._CLASS_SELECTOR_PREFIX + SUBMENU_CLASS)[0]);
                    $subMenu.show();
                    self._repositionSubMenu($subMenu);
                    self._menuStack.push({
                        name: activeMenuItemData.name,
                        menuView: $subMenu
                    });
                }
                self._activeMenuItem = null;
                if (isKeyboardEvent) {
                    self._moveToNextMenuItem(true, false);
                }
            }
        }
    };
    return MenuView;
}());
exports.MenuView = MenuView;
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
/***/ })

/******/ });
    return GC;
};
//# sourceMappingURL=gc.spread.sheets.contextmenu.14.2.5.js.map