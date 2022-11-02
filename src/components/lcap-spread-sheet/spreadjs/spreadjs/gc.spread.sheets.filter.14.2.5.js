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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['Filter'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/filter/filter.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/filter/filter-actions.js':
/*!***********************************************!*\
  !*** ./dist/plugins/filter/filter-actions.js ***!
  \***********************************************/
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


var filter_ns_1 = __webpack_require__(/*! ./filter-ns */ './dist/plugins/filter/filter-ns.js');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var filter_1 = __webpack_require__(/*! ./filter */ './dist/plugins/filter/filter.js');
var ConditionalFormatting_1 = __webpack_require__(/*! ConditionalFormatting */ 'ConditionalFormatting');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined, getType = Common_1.Common._Types._getType;
var ActionBase = Core_1.Commands.ActionBase;
var SORT_FILTER = 'sortFilter', TEXT_SELECT_FLILTER = 'filterTextSelectAction', CONDITION_FILTER = 'filterByCondition', CLEAR_FILTER = 'clearFilter', CONTEXT_MENU_SHEET_FILTER = 'contextmenuFilterForSheet', CONTEXT_MENU_TABLE_FILTER = 'contextmenuFilterForTable';
var executeCommand = Core_1.Commands._executeCommand, arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength, keyword_undefined = void 0, keyword_null = null;
var rm = new Common_1.Common.ResourceManager(filter_ns_1.SR);
var getSR = rm.getResource.bind(rm);
function getFilter(tableName, sheet) {
    var rowFilter;
    if (tableName) {
        var table = sheet.tables.findByName(tableName);
        if (table) {
            rowFilter = table.rowFilter();
        }
    }
    else {
        rowFilter = sheet.rowFilter();
    }
    return rowFilter;
}
function getTableFilterData(sheet, table, tableColumn, list, condition) {
    return {
        sheet: sheet,
        sheetName: sheet.name(),
        table: table,
        tableCol: tableColumn,
        filterValues: list,
        conditionInfo: arrayHelper_getLength(list) === 0 && condition ? condition.toJSON() : keyword_undefined
    };
}
function getRangeFilterData(sheet, column, list, condition) {
    return {
        sheet: sheet,
        sheetName: sheet.name(),
        col: column,
        filterValues: list,
        conditionInfo: arrayHelper_getLength(list) === 0 && condition ? condition.toJSON() : keyword_undefined
    };
}
function sendFilteringEvent(colIndex, sheet, table, list, condition) {
    var tableColumn = table ? colIndex - table.range().col : -1;
    table ? sheet._trigger(Core_1.Events.TableFiltering, getTableFilterData(sheet, table, tableColumn, list, condition)) :
        sheet._trigger(Core_1.Events.RangeFiltering, getRangeFilterData(sheet, colIndex, list, condition));
}
function sendFilterClearingEvent(colIndex, sheet, table) {
    var eventData;
    if (table) {
        var tableColumn = colIndex - table.range().col;
        eventData = {
            sheet: sheet,
            sheetName: sheet.name(),
            table: table,
            tableCol: tableColumn
        };
        sheet._trigger(Core_1.Events.TableFilterClearing, eventData);
    }
    else {
        eventData = {
            sheet: sheet,
            sheetName: sheet.name(),
            col: colIndex
        };
        sheet._trigger(Core_1.Events.RangeFilterClearing, eventData);
    }
}
function sendFilterClearedEvent(colIndex, sheet, table) {
    var eventData;
    if (table) {
        var tableColumn = colIndex - table.range().col;
        eventData = {
            sheet: sheet,
            sheetName: sheet.name(),
            table: table,
            tableCol: tableColumn
        };
        sheet._trigger(Core_1.Events.TableFilterCleared, eventData);
    }
    else {
        eventData = {
            sheet: sheet,
            sheetName: sheet.name(),
            col: colIndex
        };
        sheet._trigger(Core_1.Events.RangeFilterCleared, eventData);
    }
}
function doFilter(rowFilter, colIndex, sheet, table, list, condition) {
    var tableColumn = table ? colIndex - table.range().col : -1;
    rowFilter.filter(colIndex);
    table ? sheet._trigger(Core_1.Events.TableFiltered, getTableFilterData(sheet, table, tableColumn, list, condition)) :
        sheet._trigger(Core_1.Events.RangeFiltered, getRangeFilterData(sheet, colIndex, list, condition));
}
function undoForFilter(sheet, command) {
    sheet.suspendPaint();
    var changesKey = Core_1.Commands._getChangesKey(sheet.name());
    sheet._modelManager.undo(command[changesKey]);
    sheet.resumePaint();
    return true;
}
var FilterSortAction = (function (_super) {
    __extends(FilterSortAction, _super);
    function FilterSortAction(sheet, command) {
        var _this = _super.call(this, sheet, command) || this;
        var self = _this;
        self._sortInfo = self._command.cmdOption;
        self._sortInfo.rowFilter = getFilter(self._sortInfo.tableName, self._sheet);
        return _this;
    }
    FilterSortAction.prototype.execute = function () {
        var self = this, rowFilter = self._sortInfo.rowFilter, colIndex = self._sortInfo.colIndex, func = self._sortInfo.compareFunction, isAsc = self._sortInfo.isAsc, isNeedInvalidEvent = !isNullOrUndefined(self._sortInfo.tableName), color = self._sortInfo.color, isBackColor = self._sortInfo.isBackColor;
        var sortInfo = { groupSort: self._sortInfo.groupSort, ignoreHidden: self._sortInfo.ignoreHidden };
        self._sheet.suspendPaint();
        self._sheet._modelManager.startTransaction();
        try {
            if (color !== keyword_undefined) {
                rowFilter.sortColumnByColor(colIndex, isAsc, color, isBackColor, sortInfo, isNeedInvalidEvent);
            }
            else {
                rowFilter._sortColumn(colIndex, isAsc, func, sortInfo, isNeedInvalidEvent);
            }
        }
        finally {
            var changesKey = Core_1.Commands._getChangesKey(self._sheet.name());
            self._command[changesKey] = self._sheet._modelManager.endTransaction();
            self._sheet.resumePaint();
        }
    };
    FilterSortAction.prototype.undo = function () {
        return undoForFilter(this._sheet, this._command);
    };
    return FilterSortAction;
}(ActionBase));
Core_1.Commands[SORT_FILTER] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return executeCommand(context, FilterSortAction, options, isUndo);
    }
};
var FilterClearAction = (function (_super) {
    __extends(FilterClearAction, _super);
    function FilterClearAction(sheet, command) {
        var _this = _super.call(this, sheet, command) || this;
        var self = _this;
        self._sortInfo = self._command.cmdOption;
        return _this;
    }
    FilterClearAction.prototype.execute = function () {
        var self = this, colIndex = self._sortInfo.colIndex;
        var rowFilter, tableName = self._command.cmdOption.tableName;
        rowFilter = getFilter(tableName, self._sheet);
        if (!rowFilter) {
            return;
        }
        var table;
        if (tableName) {
            table = self._sheet.tables.findByName(tableName);
        }
        self._sheet.suspendPaint();
        self._sheet._modelManager.startTransaction();
        sendFilterClearingEvent(colIndex, self._sheet, table);
        rowFilter.removeFilterItems(colIndex);
        sendFilterClearedEvent(colIndex, self._sheet, table);
        var changesKey = Core_1.Commands._getChangesKey(self._sheet.name());
        self._command[changesKey] = self._sheet._modelManager.endTransaction();
        self._sheet.resumePaint();
    };
    FilterClearAction.prototype.undo = function () {
        return undoForFilter(this._sheet, this._command);
    };
    return FilterClearAction;
}(ActionBase));
Core_1.Commands[CLEAR_FILTER] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return executeCommand(context, FilterClearAction, options, isUndo);
    }
};
var FilterTextSelectAction = (function (_super) {
    __extends(FilterTextSelectAction, _super);
    function FilterTextSelectAction(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    FilterTextSelectAction.prototype.execute = function () {
        var self = this, colIndex = self._command.cmdOption.colIndex, checkedValues = self._command.cmdOption.checkedValues, allValuesLength = self._command.cmdOption.allValuesLength;
        var checkedValuesLength = arrayHelper_getLength(checkedValues), BLANK = getSR().Blanks;
        var rowFilter, tableName = self._command.cmdOption.tableName, sheet = self._sheet;
        rowFilter = getFilter(tableName, sheet);
        if (!rowFilter) {
            return;
        }
        var table;
        if (tableName) {
            table = sheet.tables.findByName(tableName);
        }
        sheet.suspendPaint();
        sheet._modelManager.startTransaction();
        sendFilteringEvent(colIndex, sheet, table, checkedValues, keyword_null);
        rowFilter.removeFilterItems(colIndex);
        if (checkedValuesLength !== allValuesLength) {
            var conditions = [];
            for (var i = 0; i < checkedValuesLength; i++) {
                var item = checkedValues[i], condition = void 0;
                var text = item.text, value = item.value, type = item.type;
                if (text === BLANK) {
                    text = '';
                }
                condition = new ConditionalFormatting_1.Condition(2 );

                condition._ps.expected = text;
                condition._ps.compareType = 0 ;
                condition._ps.useWildCards = false;
                if (type === 'date') {
                    condition._isDateText = true;
                    condition._dateValue = value;
                }
                conditions.push(condition);
            }
            rowFilter.addFilterItem(colIndex, conditions);
        }
        doFilter(rowFilter, colIndex, sheet, table, checkedValues, keyword_null);
        var changesKey = Core_1.Commands._getChangesKey(sheet.name());
        self._command[changesKey] = sheet._modelManager.endTransaction();
        sheet.resumePaint();
    };
    FilterTextSelectAction.prototype.undo = function () {
        return undoForFilter(this._sheet, this._command);
    };
    return FilterTextSelectAction;
}(ActionBase));
Core_1.Commands[TEXT_SELECT_FLILTER] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return executeCommand(context, FilterTextSelectAction, options, isUndo);
    }
};
var FilterByConditionAction = (function (_super) {
    __extends(FilterByConditionAction, _super);
    function FilterByConditionAction(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    FilterByConditionAction.prototype.execute = function () {
        var self = this, colIndex = self._command.cmdOption.colIndex, condition = self._command.cmdOption.condition;
        var rowFilter, tableName = self._command.cmdOption.tableName, sheet = self._sheet;
        rowFilter = getFilter(tableName, self._sheet);
        if (isNullOrUndefined(condition)) {
            sheet._raiseInvalidOperation(7 , getSR().invalidCondition);
            return false;
        }
        if (!rowFilter) {
            return;
        }
        var table;
        if (tableName) {
            table = self._sheet.tables.findByName(tableName);
        }
        self._sheet.suspendPaint();
        self._sheet._modelManager.startTransaction();
        sendFilteringEvent(colIndex, self._sheet, table, [], condition);
        rowFilter.removeFilterItems(colIndex);
        rowFilter.addFilterItem(colIndex, condition);
        doFilter(rowFilter, colIndex, self._sheet, table, [], condition);
        var changesKey = Core_1.Commands._getChangesKey(self._sheet.name());
        self._command[changesKey] = self._sheet._modelManager.endTransaction();
        self._sheet.resumePaint();
    };
    FilterByConditionAction.prototype.undo = function () {
        return undoForFilter(this._sheet, this._command);
    };
    return FilterByConditionAction;
}(ActionBase));
Core_1.Commands[CONDITION_FILTER] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return executeCommand(context, FilterByConditionAction, options, isUndo);
    }
};
var ContextMenuFilterForSheet = (function (_super) {
    __extends(ContextMenuFilterForSheet, _super);
    function ContextMenuFilterForSheet(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    ContextMenuFilterForSheet.prototype.execute = function () {
        var self = this, sheet = self._sheet, cmdOption = self._command.cmdOption, selection = cmdOption.selection, activeRow = cmdOption.activeRow, activeColumn = cmdOption.activeCol, expectedText = cmdOption.expectedText;
        sheet._modelManager.startTransaction();
        if (!sheet.rowFilter()) {
            sheet.rowFilter(new filter_1.HideRowFilter(selection));
        }
        else {
            var condition = void 0, rowFilter = sheet.rowFilter(), range = rowFilter.range;
            if (range.contains(activeRow, activeColumn, 1, 1)) {
                sendFilteringEvent(activeColumn, sheet, keyword_undefined, [expectedText], keyword_null);
                condition = new ConditionalFormatting_1.Condition(ConditionalFormatting_1.ConditionType.textCondition, {
                    compareType: 0,
                    expected: expectedText
                });
                rowFilter.addFilterItem(activeColumn, condition);
                doFilter(rowFilter, activeColumn, sheet, keyword_undefined, [expectedText], keyword_null);
            }
            else if (range.row - 1 === activeRow && !isNullOrUndefined(rowFilter._filterButtonVisibleInfo[activeColumn])) {
                var text = sheet.getText(range.row, activeColumn);
                sendFilteringEvent(activeColumn, sheet, keyword_undefined, [expectedText], keyword_null);
                condition = new ConditionalFormatting_1.Condition(ConditionalFormatting_1.ConditionType.textCondition, {
                    compareType: 0,
                    expected: text
                });
                rowFilter.addFilterItem(activeColumn, condition);
                doFilter(rowFilter, activeColumn, sheet, keyword_undefined, [expectedText], keyword_null);
            }
            else {
                sheet.rowFilter().unfilter();
                sheet.rowFilter(new filter_1.HideRowFilter(selection));
            }
        }
        var changesKey = Core_1.Commands._getChangesKey(sheet.name());
        this._command[changesKey] = sheet._modelManager.endTransaction();
    };
    ContextMenuFilterForSheet.prototype.undo = function () {
        return undoForFilter(this._sheet, this._command);
    };
    return ContextMenuFilterForSheet;
}(ActionBase));
Core_1.Commands[CONTEXT_MENU_SHEET_FILTER] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return executeCommand(context, ContextMenuFilterForSheet, options, isUndo);
    }
};
var ContextMenuFilterForTable = (function (_super) {
    __extends(ContextMenuFilterForTable, _super);
    function ContextMenuFilterForTable(sheet, command) {
        return _super.call(this, sheet, command) || this;
    }
    ContextMenuFilterForTable.prototype.execute = function () {
        var self = this, sheet = self._sheet, cmdOption = self._command.cmdOption, tableName = cmdOption.tableName, expectedText = cmdOption.expectedText, activeColumn = cmdOption.activeCol, activeRow = cmdOption.activeRow;
        sheet._modelManager.startTransaction();
        var rowFilter = getFilter(tableName, sheet), table = sheet.tables.findByName(tableName);
        if (!rowFilter || !table) {
            return;
        }
        var tableRange = table.range();
        if (table.showHeader() && tableRange.row === activeRow && !isNullOrUndefined(rowFilter._filterButtonVisibleInfo[activeColumn - tableRange.col])) {
            expectedText = sheet.getText(activeRow + 1, activeColumn);
        }
        sendFilteringEvent(activeColumn, sheet, keyword_undefined, [expectedText], keyword_null);
        var condition = new ConditionalFormatting_1.Condition(ConditionalFormatting_1.ConditionType.textCondition, {
            compareType: 0,
            expected: expectedText
        });
        rowFilter.removeFilterItems(activeColumn);
        rowFilter.addFilterItem(activeColumn, condition);
        doFilter(rowFilter, activeColumn, sheet, keyword_undefined, [expectedText], keyword_null);
        var changesKey = Core_1.Commands._getChangesKey(sheet.name());
        this._command[changesKey] = sheet._modelManager.endTransaction();
    };
    ContextMenuFilterForTable.prototype.undo = function () {
        return undoForFilter(this._sheet, this._command);
    };
    return ContextMenuFilterForTable;
}(ActionBase));
Core_1.Commands[CONTEXT_MENU_TABLE_FILTER] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return executeCommand(context, ContextMenuFilterForTable, options, isUndo);
    }
};
Core_1.Commands._registerFilterDialogCommand = function (commands) {
    commands.register(SORT_FILTER, Core_1.Commands[SORT_FILTER]);
    commands.register(TEXT_SELECT_FLILTER, Core_1.Commands[TEXT_SELECT_FLILTER]);
    commands.register(CONDITION_FILTER, Core_1.Commands[CONDITION_FILTER]);
    commands.register(CLEAR_FILTER, Core_1.Commands[CLEAR_FILTER]);
    commands.register(CONTEXT_MENU_SHEET_FILTER, Core_1.Commands[CONTEXT_MENU_SHEET_FILTER]);
    commands.register(CONTEXT_MENU_TABLE_FILTER, Core_1.Commands[CONTEXT_MENU_TABLE_FILTER]);
};
/***/ }),

/***/ './dist/plugins/filter/filter-button-images.js':
/*!*****************************************************!*\
  !*** ./dist/plugins/filter/filter-button-images.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var BASE64_HEAD_PART = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWF' +
    'BURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEI' +
    'iAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50' +
    'cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBW' +
    'K8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhE' +
    'LTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBo' +
    'mxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMC' +
    'aIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgt' +
    'Uq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73Vwn' +
    'UCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7' +
    'ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun' +
    '3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQW' +
    'NBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5' +
    'JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFK' +
    'uUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk6' +
    '26s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXB' +
    'aKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509' +
    'E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8c';
function getFilterButtonImageSrc(state) {
    if (state === 0 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVX' +
            'DjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4' +
            'EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/' +
            'EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAES' +
            'ggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2At' +
            'qKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDr' +
            'FiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1' +
            'akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rf' +
            'q79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiF' +
            'I8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgK' +
            'fep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybu' +
            'IC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/P' +
            'bFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwD' +
            'a0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22' +
            'gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlw' +
            'G3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAA' +
            'Xb5JfxUYAAAMOSURBVHjaXJNdaJRHFIbfM7PfGremUTfkpxgpiheiBOmFtYUgRXNRqNnd75sEhBoIKhrwQpFUUSsihhIQ41+FNrUGqYhRY43STZqgARNRTIzRaFqz6xJTtals3K8xRQ3x7UV215+LB2bOxTNn3jMDs+mEIgmS+LwQiqSQ9JG03FHX54666pn7TLmJEZVIjCCRGMkYGxvNiI9FvaENZzLw/Pmqt' +
            'CDFV/4WkERw8TI03K6XqqrNWLBgPoafDmNwMCbd3TestpMDHpJAuIcWSZjSUrnS0SFOWamXJLpuDYAkAiYAkioYDCIej0+Lx12QrervFxOemjWfCvIyIcmTVeLVC1986OkUklhRtlgutLYrkpnOKlt1dl0BSfTHmnCnm5oTm0AS6I0xLaDLrK1PusTp/cb7/rUAyH8kSL+Vqt0ebpuGP699LCRROAdqf/suGfo' +
            'rCpLi4DMpAOQQLAEgfE2sRDZIv5cknGxi74HDFnZ/32olk9f//vOTPIj05ZnKZpp14QlnfZgpTOXvNGsvjrvuH9MnOwAOYlhQ/UPYmxRkJVvzPHw8JF8EdrKoZEeapSt2cHDo4Sxn7R0hiV8/hEQe3Ad21jZNJQnbDklSBBas0ddvRj2Fi4qZIhaL+Q3ni8N0ZohGe4Dv6sKZfFP0kvkSWLZdGvLpiUTuTS9cV' +
            'MxI5H5+fz+UfXyOto/Ns5bUL7dyjsBjTsKDbbVnM0iqYNHXYi9ZLiSlaRbFn089zlzvwN1IzkDlmDhfdiin5KgOBY5qO9iojX1K9+VRcOCXnlySsFkOkjj/WGschtR0Kt/Ga9D2aYj5DWKaIeYSxTlFMS2T66udBDbXHS94Z97ZUB8Ayt7+iVVddlkzl5LCvrklvQ9dr1fnF0IQbng5O/VQsmAJSfnxSLuqCG3' +
            'Rxxpfz3xbXv0IEkzm5YR7lXOCGs6+PVNJYjaQnoKwSgBIDSqkjjPUuv3QLP9ImW+hG1/lKJtzp5jaCmW2nrNAUpOUkqrWrJUb23T5rhZf0eoWhbeEKX7O4eTPHe8DSTjF59T/AwCfnhbaDaIICgAAAABJRU5ErkJggg==';
    }
    else if (state === 1 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVX' +
            'DjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4' +
            'EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/' +
            'EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAES' +
            'ggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2At' +
            'qKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDr' +
            'FiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1' +
            'akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt' +
            '1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8y' +
            'wWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3' +
            'U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8' +
            'hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk' +
            '1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM' +
            '99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3' +
            'lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw' +
            '83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m' +
            '978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H' +
            '5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAALLSURBVHjadJNtaNVlGMav+/kfjy3GTDfcsQW1CMrhWSZ6AsmXmflFDts5/0eYA52i02M6tdBIRQQJBLX8Yg4xYlMEJaHphzx' +
            'KzoiaZptN0MBtacyXoYIobUgT/fXhtOMS+vBw89wXXPfLdd0CLNxwyACF648YYH7tnuEYAeQbv3CA/EeHBcivazbAUo1fv6hwfYtJEjDy2XP//8vpGbA9ZiE7xQ6USs3S7sUx9YHNbMqYn1IerGmQ3pr8uYXsNUAqnZ+LvqHJAA2BeIoGT6DJbMqBbAwArR77vs4/u' +
            'hOje9BxlXEcww13pXDvtwaoes1MB6iz8xfxGkIIiLCUIEXaDTxiFJOmKp5YxDcciS6jVpRi8g1H87PVgLYslwO0GYzf+x377ubwXoLKafXEE/WUTfC9tBIhwNTJdAPkw4R1fdkkOmJW1/LAYNBV54iDJK8HH7NPd+/9MTqeWER//62YHxrrJvCDydd99Z/tpjLboz7' +
            'znQF2/vSfufwY9Ne1e9r9JtHKaUvxqWY3UgXX23dNbccOlhQUFxUN9GweVsaWIQNZRfkeByidrnDxRD19N29U5AnChkMO0BMYAwRA4GkPAKuZc/2F8JWTDlB716sCIm9PXcz1K9+/lCc4erstABQmP3U8LBvlV2VJr8yyIHMSv+LUk1QmCzADBjQnrB0dT9TT0/243' +
            'NfqXx8szwaAzq6Q1bDJnWnrmlKV3EZVchvvJbfQ2nqmDLDqD0/YXFqs8t0l/Haxu3j+vOPDO9ifu4P9jwPAeSk6RE/RpHc+4KefL8waYWEDrOPX9ol/cycA1KH7pvCTsxFAPxZGXQ1YmDhlgNIHsoWQd5wONw4JxgfhwmeKXSUjXbq0Oi/j80el28UjqpdqK1ivcCB' +
            '7KJwXTuHKcwWAPtPCoJkShy7kjKU3dIXLAvQyVdq1C3WVXNbE2RgUOphuqVXH3T8DAFTcPgRQEEuLAAAAAElFTkSuQmCC';
    }
    else if (state === 2 ) {
        return BASE64_HEAD_PART +
            'fvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJKSURBVHjanJJfSJNhFMaf9/02R9MFCVZLUOgfpLMCmwrd7KIIm6X4fXoTY1oXltaN86oEi' +
            '4xodtNNeNMHJZQ0gpDQmUKEyUAiyKCFW4PNtSFMoyKJSp4uputbJIUX5+K855zfe85zDkhiza4u2+HXn4M64dcBvw5BTotLtyDJ49KvI2fapK/Q/8qkwAjYiEHj4rrBG+ft4p+AB51f8pKazxxDY/djhLYj95bJLKG5fR+w5whUVxNUtR6qOiHUrmABNH3AkgcoqsB' +
            'M11O56gvVUy2GV6CQNA/WjFdkMpnyhYV0NjZOAf6ksQMZCGQL3e526fUWm0kKrlAJRT7CUXeac+Gp3bRTaJpHXsReoLl3yGQAKPUtlaJh8yHxKI0s+C3xLHHXwjIqlbXtTKc/lKTScaRSFItMAWReB4WtdfdMJCVJTI18xihLNzFCyWXC4WxjMpksjiOK5BytjXIGU' +
            'H0XCowjkFsESeF27BQLSy9F/2FK0ip6wa2VtV7OxxNF8XgciUQCKpMCZFoaRdQ6PXIHshvQDtACUJDARA/tVTVe6rHrSs97mMPh16j3vQECvpKc4iSLWzrGqXWMrahnx6h1jP5oPRf8Ho1FLA5nG/c7vayq8TIajdoikRi0nqCEdn9gDaCQLNVOXZOuk310nbhCV0M' +
            'vhx+OWlbhykGnh+Hou20sy2rUdLtbAJxUfs9PwW9PQM4qjuqjfDEd6ssX+VP56kdZ/+s80H9nZJcBYDxT6x8b+vspDw4Fbf+TuC7gpn7ZtoFCSdJE0vxrAN8Jcr/DWZzEAAAAAElFTkSuQmCC' ;
    }
    else if (state === 3 ) {
        return BASE64_HEAD_PART +
            'fvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMuSURBVHjaZJN/aNR1GMefz+f7/d6P3aZGDGVKERLDbXdMJAQhlr+ujWo62g5DpUBiEyJjp' +
            'xi0ZRtyDSQvV0cDd2uw213b1EHiFjbGZq5bIbc5dTuyybRyK+ZCDrG0evWHdwfWHx8+PDwPz/vzeb2fR451DGvpQB2ODJvnP24zDkewD7Zct6h9qD1j4TzPWNgsip80isbCxuS7vzinGm5aZwcwbwVPGoAhgAIEsAAN2NKxSscmYKRvE1iRPrY3Vt7Ski4WQKaJOmb' +
            'jyF3WS//3jfr4hVXGEA55J5aXc+ZMdF0yOZWbFtCAKtx5zCUQLQBk32svPFJ8eHN16u+fCn6fv+MErKWlRWdvPzr9QpUVnIroxravlYz0tTvWdi9XRFGA6ugKOMPh7qHu7u5Ue3s7ra2tBIMnaG4+Sl1dHTU1NZSXl7P42x39zRxKYl82mYD8Q0wA8bjFmv855Xqzd' +
            'u/swsICDx78xfz8r0xMXKa+/iBer5fx8W+PDi22PjH43pKSoi2bzIS+reVlUYCVn18q11hl9vb2GIFAgFQqxczMDKFQCK/Xy8WLF4ozkN2e00o8O07YA1KpxCUCyKYSUX1fxDQgc3NzRjAY/DMej+Pz+ejpiTkzAAEpqfpEJHeP2PZJXO32VBsbKryydY3IPZB1a3I' +
            'VIH6/n1AoREVFBWmQjzknK7aLHm4bWXs5cel48uq0ziQGolE9e/uG8vsPceDttygrK8s2cBfkZ9zQ8syGbeaVyQmp3v8VNXWDvFo3SPX+8/hqzxEPjqiD9X5eqqoiN8fFjzeu5wHidh9xZTjIgZr1BqAaWi6Zm3e8z/OVDZS90kBv74AdUH7/IbZu3oJps0h8N7N62' +
            'IXpLt2VnVbZWfKc+jTx+aM/3bti85RuZ3RsvBjQxFgWO9VnTSebzB+SMyvhtMMTFsv9+l4r26Czq0sxcV9F+3eprnOJwumr14ozpMMfnLV/duQjPdeDmiTiaGrutLs3Nhjujc86sxD/uHs/DxCPjFrbXly0N7ZEbR9GcPb0jz4NS/q/1P/nwlOFlYpOrZ4UkeUiOt8' +
            'nRk6xyGNzT3YXTGBZeqEcgP53ACxeTBjELwuFAAAAAElFTkSuQmCC' ;
    }
    else if (state === 4 ) {
        return BASE64_HEAD_PART +
            'fvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMNSURBVHjalJNfaFt1FMfP796bm9hublCwa93AVd3W5d67ddisFFw1lovUl7r0jx2rWWW6p' +
            'rpCkzfrUwjVFx0LwSrYPtiO0YJPDsuwIOJKq1PL0q43iZ3OuUp04p8owmbl40PXMgaCPnzhcPjCOef7PV8BxD6WETrKjXcviUbjTlW870/ta9mqfiqv1kuRQePjk68pkj4FSfX66HRA8ujfDPapvveWN4n1xKAC5H9CB3SRo767m9uhvRxQUGXAEXOt3uCodViWpT4' +
            'Yi+tC1Rrhj99/luV8QQ43unrkxWaNVSqvXSNgHSeQSqU2A4Zt2xUdHR3bp6amwp8uTNU91jRgij2PAWg1da+sTwmeGTv768TExN8jIyOk0xlOnTpNMpkiFovR3t6O67rcuPHDJkCtr6U7zVH/gffPKrwravLzC75EIkGxWOTWrVWKxR+Zn79EPB7HdV3m5uYaAK12/' +
            'xfmxm0P1uwW62D36p77nzdXVr4Txwn5h4aGVkqlEp6XJ5PJ4LouMzMzDYAGiPXkGwGJLGIAyqmPYod6sEM9vziRF0xALMvS0+n0zdnZWTo7O5mcnNwHaNevi27bqN0v+w1pWyj5AOUEjygn1I3VeLzaund/xfj4uAASi8WWM5kMLS0tAAYgV69+K5cvvyq/zZ7TpG1' +
            'hzZaqbZbsDR3DPnSi2n6ka0uhUJB8Pt+QSCTo7++nqamJ204YXV1PG5aF2nFxUgn7PlGAWIefVXYoihVufcBWorLZrOTz+YMDAwN/tba2UlZWRi6Xq7itmQbb9JnU25qMvvmRAKrmoafEqY/edOqf2bljV/iebDYrgPT29q6Ew2FM06RQKFQMDw+L4ziabaP3nXwpI' +
            'By9oACVnBblHOh52N4Vqaxr7jYAFQwGty4uLm72PE/3PK8yt+QZuawnjgSN0TOiDj36nCmP9364pjiY1hJ67RX8F5dMBUjtW7Xav+Xh3PRnIiK6CF/qd/66886YHvW3Sfh8lQHfy11Z2MCegBgioknbCZQTPr1l71di/IcUqjsgLfHzvn8GACNDKumTxWELAAAAAEl' +
            'FTkSuQmCC' ;
    }
    else if (state === 5 ) {
        return BASE64_HEAD_PART +
            'fvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANBSURBVHjaXJNfSGR1HMXP73fvdcYdo7Vy1KRlZ9DdnOvv5uTODK0s1mxDyKIYSRYoUwQik' +
            'kgzPUS0RuW6QRCEuIiM/XuxNdiH6m17WnZFCMSHtjuOszONf0ZnGgW1iLbw9DBl0sPhy3k5HDjfD0h6w/VvSJJC8a5sOPeUYQ1TIjAuPOc+kN6Kae2JthodGBCVrSEdpmXAd8pJUrb2julgiWgJ9MMXABIXYADApQA0ACLc8Jjg9bAkKbhbD5LimDTgNQn15sc6SZD' +
            '1onyPZIAUSyQOSS124oLzDxL7hwRJjaTIFbYcUJ5xB0lYp29oZ8+OypZnPhfvkXiHdGz8nHHs7++6e+vede6UiiiVio69vR2v1+2S5slqQRJ4XvdXkBS7O+uuUv43bO79UvPZp4nfr8/N/Tk7O8urVz9cu3x5zH6x76Xvuru7f+zq6joIhUKFYrHYSBJA4yVBUm5sb' +
            'WPm15nqH1bvOpRScnBwcL1QKPD+/b+4vV3k0tIy4/E4I5EIFxcXu0nKckDwWUlSV6peqGCUW/mvJUmoNr82MTHBg4MD2rbNqakpRiIR3r59a5ykzOc3QBJob5txkZSbuQ00h/q5ub7htZSJ9NYmlDLF5OQkFxYW2NfXx/n5+YskhWk2G0p9IV5BXgDBAZ1k5Z07tx6' +
            'wAlHmcjlHjrUim13D8vIaYrEYr12bZmdnJ0k6ygvVHi0GOD2SpHGPhApGmclkKjKZ15HJpHHzJrV4PM6RkRF2dHQwm83WeTweMTw8cCwA1YKkUwWjVMEofaFXeS99w1CksKwWIxaLsaenh1VVVUyn0yf8fmBoKCpIoqeBAr3n50DywdXVlWorEGUqufp0imnpM8eEa' +
            'ZpaPB5nOBymrutMpVKuM2dGdQvjGh+icfFxCCA0YJB0tKC9Mpn8qTKZhLSS0BOJUWmaprBtu8K2bW1lZeVR27alUq3SwpDBh2t1fAUN/eepkYfCOvW26/grWxNB6XukvYJJwgKE+c1zUs270TQdkmq4WeKtTwS+hETiCgUJafrb/89CWTU9/8JT9k2UnP7HN1Ag+OQ' +
            'V8Ps6Yb78vigj/a08ahGCaGzql/zIrbmhy/9IzAmSztMvzJz8ewAvdf7cUVI5hQAAAABJRU5ErkJggg==' ;
    }
    else if (state === 6 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAeBJREFUOBGtkj1oU1EUx8+5fSC00VZoCwpOtUOcBMHFdhA0g5ODg0HSDg0EuoibOrTRodBdhWIMlCAFFTMphCqVakgGcS2InSoiQQ22SUxe373H+' +
            '7+ax2uJkz3w7rnn6/fOvecSHaQsfqjNLLyvCXQvbrValUqlItGYihrNts50ds0b6Ki/uw+CgLTWXdPpEHC7/Pl0xzenuE8lfd/EYe/JtAaK/wlotnSm7QdPs2dHv/7yg2ew9wN6dcBIml2rxYLG9hdi3mShLWE6QSJjXuzI8QfnRxtdUKlUEmamRCLh6uD3sLTq9aSQqnl96jr+4nkeBYHO+9Zvww+RAzHGWO6eO/wL8E1GickvJ8fX/6QSXV3ZyBsmHCMEAP5fUiwWBV8U4o7QWb0Q175+7gK2RVE8SEaOseKJ/ktr5W7B/gnA7wCHLr7asPs4HPJycqTR0utM6snAlXdhMWIA9LwDBCHyeOLozvf2KrF6G7tWvkEUXraL9wKEGfLo3OGfuvnajvDjUPryFHPWuCq7FAqFeTuBLGyMEV0opbKpVOqOe4mydKa/3vjxQrc6W0OD49PRYhQhEQB0gElgD58DYvm2ePKWpS64h2Ro13WOu2a6N3zz033kQHK53Bx0Op2+C30g8htq3/HPc2QfaQAAAABJRU5ErkJggg==';
    }
    else if (state === 7 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAdVJREFUOBFjYKAQMIL0/9ztovn31991YLP+/2f4z8TIz/DvvyQjE6MNl9f+ozA7Tpw48R8IGCwtLcH6QOIsIILddc91IKUJYv/fZiv65dvfQ4wMTKu4Q47ANYPk/vz5A6JQANgAmMj/pTaCn9/+2M3AyHSYJ/poIQMD3CKwkr9//8KUwmm4Af/nWvN+/Ppl539GhisCKQEZjIyM/+GqoAyQC4DiKMJgA/7PNOZ6/+XdVqD3HgtJ6cQzMjb8Q1FFyIC3Hz7mAwPHFmj83bd3z19506ECDAygLkaGKSIVd6bCDPv37x8DKBCRAdgFIuV32oGCIIwXYAtEJmQdnedeJbedefUfRCOLw9ggA9ANQTHg64+/6T9//zsAomGakGlQLKDHBNyAqqNPDH7++qfFyMwU+evXP00QH1kziA3SjNMFX7/9Tf/x68/qBjOxF99//VkD4mMzAN0F4EjN2v+K58+XT89AsQCM/cfAtCALDG5lFh4+qWmOYl8WL15cD4yBBpCBoHQAigkmJqaG2NjYRrAXvr1/H/nz9/9Xf/8y5v/49bcHRAO98wokDtIEUggyAOYFEBskBpIDg7AV189ELL9eBeODaBAfJI4sNmfOnDoQRhajmA0AtPr0ppdKGGIAAAAASUVORK5CYII=';
    }
    else if (state === 8 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAO5JREFUOBFjYBgFRIfAjRs3eI8dO7bz+PHjRsiaWJA5uNhnzpxhffny5dr///+7MjExgfQ4w9QywRggev/+/Rx79+6NRBYDamJ8//79/J8/f7r+/v373q9fv6KQ5VEM+Pbt24rv378v27ZtWwFMEZDdCdQUDdT8+u/fv+4uLi4vYXIgmhGZs3HjRr9///6tBYoxA3EqEPMAXTCBkZHxKzMzs6Ofn99pZPUgNooBIIGVK1eCvLAEqJEB6F9GIP0XSPuFhoZuB8mjAwwDQAoWL16cAtQ4G6o4MS4ubgGUTTw1b968wrlz51YRr2PkqgQA82JlH8nI1QYAAAAASUVORK5CYII=';
    }
    else if (state === 9 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAPlJREFUOBHtULkNg0AQPJBBogVyKICE1CSkxIgCqMkFUAApiQlISCiAAlwABIjfM2dZOnwteKXTfjNzuyvE34zfE7Rt65/n+bBtOwuC4MV+13XuPM+FaZp5GIa9yrmpCeNpmh5wdxCeTdNErI3jWEPUgwB7ssY6TRNYliUzDOMJgk9PEMmIe/iMuWraCmxWVeWu6ypFmJNsWVYUx7FcibWvaROwgTXEvu8Sg18FRhfbtn05F69NUJalC4EaKA9PHgwiXKd3HCdKkuQyhTbBMAwFCJLMsfkd14HzcZ8C/nJEkwDVjuPIAaxBitI0ffExZg3CuYr9x58LvAEtbX2YkfGdBQAAAABJRU5ErkJggg==';
    }
    else if (state === 11 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAO5JREFUOBFjYBgFRIfAjRs3eI8dO7bz+PHjRsiaWJA5uNhnzpxhffny5dr///+7MjExgfQ4w9QywRggev/+/Rx79+6NRBYDamJ8//79/J8/f7r+/v373q9fv6KQ5VEM+Pbt24rv378v27ZtWwFMEZDdCdQUDdT8+u/fv+4uLi4vYXIgmhGZs3HjRr9///6tBYoxA3EqEPMAXTCBkZHxKzMzs6Ofn99pZPUgNooBIIGVK1eCvLAEqJEB6F9GIP0XSPuFhoZuB8mjAwwDQAoWL16cAtQ4G6o4MS4ubgGUTTw1b968wrlz51YRr2PkqgQA82JlH8nI1QYAAAAASUVORK5CYII=';
    }
    else if (state === 12 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAgRJREFUOBFjYKAQMIL0nzx5cs6/f/+SCZnFyMh4kpeX105bW/sXTC0TiCEmJpbz58+fc0DMgAe/YWJiCkXWDNILNkBRUfEHUGPw379/3/3+/RtsCIhGwv+A8pFmZmaPQZqQAdgAkICjo+MDoAExQPwPpBFIgzHIRUDv1QLl9yBrhLHBYQDjgOjt27fXAzU0AP0LFgbSmzw8PAKA9H9kdTA2hgH///9n2gIEQEO+mpzfvp2FmfWgeO3kuzAN6DTcCzAJoE0g/zZoXj+8h+Pti7lMLx5deJHpmwKTB9H/09JY74XamoHYGAaABIFh8PemhAb//3//1wBN4/r769fsRwmu0x8luUrdjXRov/v++sM/f/5a4DOA4RMrZ+dOq7C1QC8Z/P/7/8K/P38z/nz/+fjfn98+QDf4qq0/NgmvAaCYAHrlpziDzI0/f//e+AuMjb9//jH9+8dQrrL6yFmQZhDA6gWQBDAaG+Pu79/+8OudjX9//4kAeqcLKLbm7+9fHf8bGuD64AyQJhj4+fPnpaTHj5se3Xm08d/fv57AGJmgsupwubqIbtSP778enNm/IhymFqsB6enpvx/fO+IL9ILbn39/L6oIaJaBNDDOmvVb8Ldg2I9vv2yAYQNOAlgNACn+zfD/+r+//+4x/mMoAGkEiYGA4oEDP1iZmCp3a4mpQEQoJAFYGTPePuR04gAAAABJRU5ErkJggg==';
    }
    else if (state === 13 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjlBNDZFRkFFMDUxMTFFOTkyRTA4QkVCNjlCMDYwMEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjlBNDZFRkJFMDUxMTFFOTkyRTA4QkVCNjlCMDYwMEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OUE0NkVGOEUwNTExMUU5OTJFMDhCRUI2OUIwNjAwQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OUE0NkVGOUUwNTExMUU5OTJFMDhCRUI2OUIwNjAwQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poa+1GoAAAE5SURBVHjapJO/SgNBEIdzS6x9CR8gEIjNYSkISWNI1BCw0MLCQCqDhWC0SGIltpo3SIrY2NgI1ygoJo1WIZBW0gn+Qc9vYC8sS+5OyMB3c7v3m7mZnTvH9/3EPJaUi+d5V7idf+jvYcV13a9gQ2m/D08xwW9QMIOnCdj8wOVhEhL8C1voxvaDoAJJMsKVtdi2I57fzsqszAWiG9yJpbmGRuQhWnYKy/AOkvCOxKGjUvYGYmnhGKTkNjwzpV1Tw3oBMmEViP3AInRgHS4JSOvqKrANTXhQEWNrQRdSUgXsgUwhCzkqvZjZgmWf8KoJ9DWCH0PPwLC6PsQebMKZbqlJOyouwUCPU4LX4Jy31vAlkO9lIzIB4m/pE1ahDwfGflFuqcKJa+EFhlDVgQnjsz+EJVk78/7OfwIMAP6mWr/ROcXGAAAAAElFTkSuQmCC';
    }
    else if (state === 14 ) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAGBJREFUGBljYCAHzJo1a8L///+ZsOlFEQQqygcqXr1q1SpOdMUoCqGSQe/fv987c+ZMEWTF2BSC5C0ZGRkXEaPwONAZccgKWZA5UPY6QUHBmLCwsO9Y5CBC+HyNUxPZEgCPEyCkHm49GwAAAABJRU5ErkJggg==';
    }
    return '';
}
exports.getFilterButtonImageSrc = getFilterButtonImageSrc;
/***/ }),

/***/ './dist/plugins/filter/filter-dialog.js':
/*!**********************************************!*\
  !*** ./dist/plugins/filter/filter-dialog.js ***!
  \**********************************************/
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
var ConditionalFormatting_1 = __webpack_require__(/*! ConditionalFormatting */ 'ConditionalFormatting');
var filter_1 = __webpack_require__(/*! ./filter */ './dist/plugins/filter/filter.js');
var CellTypes = __webpack_require__(/*! CellTypes */ 'CellTypes');
var filter_button_images_1 = __webpack_require__(/*! ./filter-button-images */ './dist/plugins/filter/filter-button-images.js');
var filter_ns_1 = __webpack_require__(/*! ./filter-ns */ './dist/plugins/filter/filter-ns.js');
var GeneralFormatter = Common_1.Formatter.GeneralFormatter;
var CultureManager = Common_1.Common.CultureManager, _DateTimeHelper = Common_1.Common._DateTimeHelper;
var getType = Common_1.Common._Types._getType, escapeHtml = Common_1.Common._StringHelper._escapeHtml, unescapeHtml = Common_1.Common._StringHelper._unescapeHtml;
var keyword_null = null, keyword_undefined = void 0, createElement = Core_1._util._createElement, util = Core_1._util, arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength, util_cancelDefault = util._cancelDefault;
var LEFT = 'left', TOP = 'top', FLOAT = 'float', RELATIVE = 'relative', SUBITEMS_CONTAINER = 'gc-ui-filter-subitems-container', NO_USER_SELECT_CLASS = 'gc-no-user-select', FILTER_DIALOG_CLASS = 'gc-filter-dialog-style', POSITION = 'position', FILTER_SUB_ITEM = 'gc-ui-filter-subitem-item', ALL_DATE_ITEM = 'gc-ui-filter-allDate-item', FILTER_ARROW_CLASS = 'gc-filter-alldates-arrow', FILTER_ITEM_HOVER_CLASS = 'gc-filter-item-hover', EXTERNAL_HOVER_CLASS = 'ui-state-hover ', EXTERNAL_AND_FILTER_ITEM_HOVER_CLASS = EXTERNAL_HOVER_CLASS + FILTER_ITEM_HOVER_CLASS, FILTER_HOVER_CLASS = 'gc-filter-hover', FILTER_CLASS = FILTER_HOVER_CLASS + ' form-control well ' + EXTERNAL_AND_FILTER_ITEM_HOVER_CLASS, FILTER_BUTTON_HOVER_CLASS = 'gc-filter-button-hover ' + EXTERNAL_HOVER_CLASS, SUB_MENU_CHECK = 'gc-filter-submenu-check', SUB_MENU_CHECK_IMG = 'gc-filter-submenu-check-img', ALL_DATE_CHECK_IMG = 'gc-filter-allDate-check-img', ALL_DATE_LIST = 'gc-filter-alldates-list', ALL_DATE_CONTAINER = 'gc-filter-addDates-container', FILTER_WRAP_CLASS = 'gc-filter-subMenu-wrap', TOP10_DIALOG = 'top10_dialog', CUSTOM_DIALOG = 'custom_dialog', SUB_MENU_COLOR_SORT = 'gc-sub-color-sort', SUB_MENU_COLOR_FILTER = 'gc-sub-color-filter', AUTO_MATIC = 'automatic', MORE_COLOR = 'more_color', COLOR_DIALOG_TITLE = 'gc-filter-dialog-color-title', COLOR_ITEM_CONTENT = 'gc-color-item', COLOR_CHECKED_WRAP = 'color-checked-wrap', COLOR_ITEM_CLASS = 'gc-color-item-list', FILTER_SORT_CLASS = 'gc-filter-sort', COLOR_DIALOG_BACKGROUND_WRAP = 'gc-filter-color-dialog-background', COLOR_DIALOG_FONT_WRAP = 'gc-filter-color-dialog-font', COLOR_DIALOG_CLASS = 'gc-filter-color-dialog-style', TEXT_FILTER = 'TextFilter', NUMBER_FILTER = 'NumberFilter', DATE_FILTER = 'DateFilter', MENU_COLOR_HOVER = '#D3F0E0', MENU_COLOR_BORDER_COLOR = '#86BFA0', AUTOMATIC_COLOR = '#000000', NO_FILL_COLOR = '#FFFFFF', TRANSPARENT_COLOR = 'transparent', BORDER_BOX = 'border-box', DATA_ISCHECK = 'data-isCheck', INLINE_BLOCK = 'inline-block', CONTENT_BOX = 'content-box', TOP10_ITEM = '#top10-item', GC_COLOR_DIALOG_SELECTED = '#gc-color-dialog-selected', GC_COLOR_DIALOG_NOFILL = '#gc-color-dialog-noFill', THIN_SOLID_GRAY = 'thin solid rgb(160,160,160)', DATA_CHECKED = 'data-checked', GC_FILTER_DIALOG_CLOSE = 'gc-filter-dialog-close', ONE_PX_SOLID_C2 = '1px solid #c2c2c2', GC_FILTER_TOP10_RANK_ILLEGAL = 'gc-filter-top10-rank-illegal', ONE_PX_SOLID_E0 = '1px solid #e0e0e0', DATA_IS_NEED_DIALOG = 'data-isNeedDialog', DATA_IS_CUSTOM = 'data-isCustom', DATA_CONDITION_TYPE = 'data-conditionType', DATA_OPERATOR_TYPE = 'data-operatorType', DATA_COL_INDEX = 'data-colIndex', DATA_COLOR_TYPE = 'data-colorType', DATA_COLOR = 'data-color', START_DIV_CLASS_EQUAL = '<div class=', START_SPAN_CLASS_EQUAL = '<span class=', START_IMG_CLASS_EQUAL = '<img class=', START_LI_CLASS_EQUAL = '<li class=', KEYWORD_OBJECT = 'object', END_SPAN_START_SPAN = '</span><span>', END_DIV_END_DIV = '</div></div>';
var DISPLAY = 'display', BOX_SIZING = 'box-sizing', NONE = 'none', WIDTH = 'width', HEIGHT = 'height', PADDING = 'padding', BORDER = 'border', CLICK = 'click', MOUSE_OVER = 'mouseover', MOUSE_OUT = 'mouseout', RESIZE = 'resize', INHERIT = 'inherit', CLOSE_HOVER_BACKCOLOR = '#E81123', CLOSE_HOVER_FONTCOLOR = 'white', BACKCOLOR = 'backgroundColor', DIALOG_BACKCOLOR = '#f0f0f0', MARGIN = 'margin', MARGIN_LEFT = MARGIN + 'Left', MARGIN_TOP = MARGIN + 'Top', MARGIN_RIGHT = MARGIN + 'Right', FONT_SIZE = 'font-size';
var SELECTED_CANVAS_WIDTH = 188, SELECTED_CANVAS_HEIGHT = 16;

var NUMBER_FILTER_LIST = [[1, 'Equal', 'E', 1 , 0 ], [1, 'NotEqual', 'N', 1, 1], [1, 'GreaterThan', 'G', 1, 2], [1, 'GreaterOrEquals', 'O', 1, 3], [1, 'LessThan', 'L', 1, 4], [1, 'LessThanOrEquals', 'Q', 1, 5], [1, 'Between', 'W', 0, 1], [1, 'Top10', 'T', 8, 0], [0, 'AboveAverage', 'A', 10, 0], [0, 'BelowAverage', 'O', 10, 1], [1, 'Custom', 'F', 1, 0]];
var TEXT_FILTER_LIST = [[1, 'Equal', 'E', 2, 0], [1, 'NotEqual', 'N', 2, 1], [1, 'Begin', 'I', 2, 2], [1, 'End', 'T', 2, 4], [1, 'Contain', 'A', 2, 6], [1, 'NotContain', 'D', 2, 7], [1, 'Custom', 'F', 2, 0]];
var DATE_FILTER_LIST = [[1, 'Equal', 'E', 5, 0], [1, 'Before', 'B', 5, 2], [1, 'After', 'A', 5, 4], [1, 'Between', 'W', 0, 1], [0, 'Tomorrow', 'T', 6, 2], [0, 'Today', 'O', 6, 0], [0, 'Yesterday', 'D', 6, 1], [0, 'NextWeek', 'K', 6, 9], [0, 'ThisWeek', 'H', 6, 7], [0, 'LastWeek', 'L', 6, 8], [0, 'NextMonth', 'M', 6, 6], [0, 'ThisMonth', 'S', 6, 4], [0, 'LastMonth', 'N', 6, 5], [0, 'NextQuarter', 'N', 6, 10], [0, 'ThisQuarter', 'N', 6, 11], [0, 'LastQuarter', 'N', 6, 12], [0, 'NextYear', 'N', 6, 13], [0, 'ThisYear', 'N', 6, 14], [0, 'LastYear', 'N', 6, 15], [0, 'YearToDate', 'A', 6, 0, 6], [0, 'AllDates', 'P', 6, 1], [1, 'Custom', 'F', 6, 0]];

var IsBeginWith_2_2 = 'IsBeginWith-2-2', IsEndWith_4_2 = 'IsEndWith-4-2', NotEndWith_5_2 = 'NotEndWith-5-2', IsContain_6_2 = 'IsContain-6-2', NotContains_7_2 = 'NotContains-7-2';
var All_DATES_FILTER_LIST = [['Q1', '1', 6, 0, 2], ['Q2', 'B', 6, 1, 2], ['Q3', 'A', 6, 2, 2], ['Q4', '4', 6, 3, 2], ['Jan', 'J', 6, 0, 3], ['Feb', 'F', 6, 1, 3], ['Mar', 'M', 6, 2, 3], ['Apr', 'A', 6, 3, 3], ['May', 'Y', 6, 4, 3], ['Jun', 'U', 6, 5, 3], ['Jul', 'L', 6, 6, 3], ['Aug', 'T', 6, 7, 3], ['Sep', 'S', 6, 8, 3], ['Oct', 'O', 6, 9, 3], ['Nov', 'N', 6, 10, 3], ['Dec', 'D', 6, 11, 3]];
var NUMBER_CUSTOM_LIST = ['IsEquals-0-1', 'NotEquals-1-11', 'IsGreaterThan-2-1', 'IsGreaterOrEqual-3-1', 'IsLess-4-1', 'LessOrEqual-5-1', IsBeginWith_2_2, 'NotBeginWith-3-2', IsEndWith_4_2, NotEndWith_5_2, IsContain_6_2, NotContains_7_2];
var TEXT_CUSTOM_LIST = ['IsEquals-0-2', 'NotEquals-1-11', 'IsGreaterThan-2-1', 'IsGreaterOrEqual-3-1', 'IsLess-4-1', 'LessOrEqual-5-1', IsBeginWith_2_2, 'NotBeginWith-3-2', IsEndWith_4_2, NotEndWith_5_2, IsContain_6_2, NotContains_7_2];
var DATE_CUSTOM_LIST = ['IsEquals-0-5', 'NotEquals-1-5', 'IsAfter-4-5', 'AfterOrEqual-5-5', 'IsBefore-2-5', 'BeforeOrEqual-3-5', IsBeginWith_2_2, 'NotBeginWith-4-2', IsEndWith_4_2, NotEndWith_5_2, IsContain_6_2, NotContains_7_2];
var rm = new Common_1.Common.ResourceManager(filter_ns_1.SR);
var getSR = rm.getResource.bind(rm);
function formatColor(color) {
    if (typeof color === KEYWORD_OBJECT) {
        return JSON.stringify(color);
    }
    return Common_1.Common._ColorHelper._toString(Common_1.Common._ColorHelper._fromString(color));
}

function filterByCondition(colIndex, condition, sheet, rowFilter) {
    try {
        sheet.suspendPaint();
        if (!rowFilter) {
            return;
        }
        var tableName = rowFilter._table ? rowFilter._table.name() : keyword_undefined;
        var cmdOption = {
            tableName: tableName,
            colIndex: colIndex,
            condition: condition
        };
        filter_1._executeCommand('filterByCondition', cmdOption, sheet);
    }
    finally {
        sheet.resumePaint();
    }
}
var _FilterSubMenuBase = (function () {
    function _FilterSubMenuBase(wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) {
        var self = this;
        self._type = keyword_undefined;
        self._dialogType = dialogType;
        self._wrap = wrap;
        self._sheet = sheet;
        self._$wrap = Core_1.GC$(wrap);
        self._container = container;
        self._isNullMenu = false;
        self._filterButtonInfo = filterButtonInfo;
        self._rowFilter = filterButtonInfo.rowFilter;
        self._parentDialog = parentDialog;
        self._submenuWrap = keyword_null;
    }
    _FilterSubMenuBase.prototype._init = function () {
        this._render(this._createSubmenuWrap());
        this._bindEvent();
    };
    _FilterSubMenuBase.prototype._getImageSrc = function (state) {
        return filter_button_images_1.getFilterButtonImageSrc(state);
    };
    _FilterSubMenuBase.prototype._createSubmenuWrap = function () {
        var submenuWrap = Core_1.GC$(createElement('div')).attr('id', SUBITEMS_CONTAINER + '_' + this._dialogType);
        submenuWrap.addClass(FILTER_DIALOG_CLASS + ' ' + NO_USER_SELECT_CLASS + ' ' + FILTER_WRAP_CLASS);
        submenuWrap.css([POSITION, DISPLAY, BOX_SIZING], ['absolute', NONE, BORDER_BOX]);
        this._submenuWrap = submenuWrap;
        Core_1.GC$(this._wrap).append(this._submenuWrap);
        return submenuWrap;
    };
    _FilterSubMenuBase.prototype._isShow = function () {
        return this._submenuWrap[0].style.display !== 'none';
    };
    _FilterSubMenuBase.prototype._show = function () {
        Core_1.GC$('.' + FILTER_WRAP_CLASS).hide();
        this._submenuWrap.show();
        this._updatePosition();
    };
    _FilterSubMenuBase.prototype._hide = function () {
        this._submenuWrap.hide();
        this._submenuWrap.find('.' + FILTER_CLASS).removeClass(FILTER_CLASS);
    };
    _FilterSubMenuBase.prototype._setType = function (type) {
        this._type = type;
        return this;
    };
    _FilterSubMenuBase.prototype._updatePosition = function (callback) {
        var wrapOffset = this._$wrap.offset(), overlayOffset = this._parentDialog._overlay.offset(), docElement = document.documentElement, overlayOffsetLeft = overlayOffset.left, overlayOffsetTop = overlayOffset.top, clientWidth = docElement.clientWidth, clientHeight = docElement.clientHeight, submenuWidth = (this._submenuWrap.width()), submenuHeight = (this._submenuWrap.height());
        var left, top, isRight;
        var $table = this._$wrap.parent().parent(), tableOffset = $table.offset(), tableOffsetTop = tableOffset.top;
        var containerOffset = this._container.offset();
        if (containerOffset.left + (this._container.width()) + submenuWidth - overlayOffsetLeft > clientWidth) {
            left = -1 * (submenuWidth + 2) + 'px';
            isRight = false;
        }
        else {
            left = this._container.width() + 'px';
            isRight = true;
        }
        var topDelta = wrapOffset.top - containerOffset.top;
        if (tableOffsetTop + topDelta + submenuHeight - overlayOffsetTop > clientHeight) {
            top = overlayOffsetTop + clientHeight - submenuHeight - tableOffset.top - 6;
        }
        else {
            top = topDelta;
        }
        top = top + 'px';
        this._submenuWrap.css([LEFT, TOP], [left, top]);
        callback && callback.call(this, isRight);
    };
    _FilterSubMenuBase.prototype._doFilterByCondition = function (colIndex, condition) {
        var self = this, sheet = self._sheet, rowFilter = self._rowFilter;
        filterByCondition(colIndex, condition, sheet, rowFilter);
        this._parentDialog.close();
    };
    _FilterSubMenuBase.prototype._confirmHoverHandle = function () {
        var hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, this._submenuWrap[0]);
        hoverItem.trigger(CLICK);
    };
    _FilterSubMenuBase.prototype._clearFilter = function () {
        var self = this, filterButtonInfo = self._filterButtonInfo, sheet = this._sheet, colIndex = filterButtonInfo.col, rowFilter = filterButtonInfo.rowFilter;
        if (!rowFilter) {
            return;
        }
        var cmdOption = {
            rowFilter: rowFilter,
            colIndex: colIndex
        };
        sheet._commandManager().execute({ cmd: 'clearFilter', sheetName: sheet.name(), cmdOption: cmdOption });
    };
    _FilterSubMenuBase.prototype._hideMenuHandle = function () {
        this._hide();
        return keyword_null;
    };
    _FilterSubMenuBase.prototype._showMenuHandle = function () {
        if (!this._isShow()) {
            this._show();
            this._hoverFirstItem();
        }
    };

    _FilterSubMenuBase.prototype._render = function (wrap) {
    };
    _FilterSubMenuBase.prototype._bindEvent = function () {
    };
    _FilterSubMenuBase.prototype._hoverFirstItem = function () {
    };
    _FilterSubMenuBase.prototype._hoverNextItem = function () {
    };
    _FilterSubMenuBase.prototype._hoverPrevItem = function () {
    };
    return _FilterSubMenuBase;
}());

var _CellValueFilterMenu = (function (_super) {
    __extends(_CellValueFilterMenu, _super);
    function _CellValueFilterMenu(wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) {
        return _super.call(this, wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) || this;
    }
    _CellValueFilterMenu.prototype._render = function (wrap) {
        this._createContentHtml();
    };
    _CellValueFilterMenu.prototype._bindEvent = function () {
        var self = this;
        self._submenuWrap.bind(MOUSE_OVER, function (e) {
            util_cancelDefault(e);
        }).bind(MOUSE_OUT, function (e) {
            util_cancelDefault(e);
        });
        Core_1.GC$('.' + FILTER_SUB_ITEM, self._submenuWrap[0]).bind(MOUSE_OVER, function (e) {
            Core_1.GC$('.' + FILTER_SUB_ITEM).removeClass(FILTER_CLASS);
            Core_1.GC$(this).addClass(FILTER_CLASS);
            util_cancelDefault(e);
        }).bind(MOUSE_OUT, function (e) {
            Core_1.GC$(this).removeClass(FILTER_CLASS);
            util_cancelDefault(e);
        }).bind(CLICK, function (e) {
            if (Core_1.GC$(this).attr('id') !== ALL_DATE_CONTAINER) {
                self._doFilter(Core_1.GC$(this));
            }
            util_cancelDefault(e);
        });
        this._bindEventEx && this._bindEventEx();
    };
    _CellValueFilterMenu.prototype._isBooleanExpected = function (expected) {
        return (expected !== keyword_undefined && expected === 'TRUE' || expected === 'FALSE');
    };
    _CellValueFilterMenu.prototype._setCheckedContentItem = function () {
        var condition = this._rowFilter._filterItemMap[this._filterButtonInfo.col], list = this._renderListData, chooseIndex, isSameConType, isSameCompareType, isBetween = false, expectTypeId, conType, compareType, expected;
        if (condition && condition.length > 0) {
            condition = condition[0];
            compareType = condition.compareType();
            expected = condition.expected();
            expectTypeId = condition.expectTypeId();
            conType = condition.conType();
            if (conType === 10 ) {
                compareType = condition.type();
            }
            if (conType === 8 ) {
                compareType = 0 ;
            }

            if (this._isBooleanExpected(expected)) {
                conType = 11 ;
            }

            if (conType === 0) {
                var item1CompareType = condition.item1().compareType(), item2CompareType = condition.item2().compareType();

                if (Math.max(item1CompareType, item2CompareType) === 5 && Math.min(item1CompareType, item2CompareType) === 3) {
                    isBetween = true;
                }
            }
            for (var i = 0, len = arrayHelper_getLength(list); i < len; i++) {
                isSameConType = (conType === 0 && list[i][3] === conType && isBetween) || (list[i][3] === conType && conType !== 0) || (conType === 11 && (list[i][3] === 1 || list[i][3] === 2));
                if (isSameConType && conType === 8 ) {
                    chooseIndex = i;
                    break;
                }

                isSameCompareType = (list[i][4] === compareType && !isBetween) || (list[i][3] === 6 && expected === list[i][4]) || isBetween;

                if (isSameConType && isSameCompareType && (isNaN(expectTypeId) || expectTypeId === 0)) {
                    chooseIndex = i;
                    break;
                }
            }
        }
        if (!isNaN(expectTypeId) && expectTypeId === 6 ) {
            chooseIndex = 19;
        }
        if (!isNaN(expectTypeId) && (expectTypeId === 2 || expectTypeId === 3 )) {
            chooseIndex = 20;
            this._setAllDatesItemCheck && this._setAllDatesItemCheck(All_DATES_FILTER_LIST, expected, expectTypeId);
        }
        var checkItem;
        if (chooseIndex !== keyword_undefined && chooseIndex !== 0) {
            checkItem = Core_1.GC$('.' + FILTER_SUB_ITEM)[chooseIndex];
        }
        else if (condition && conType !== 3 && chooseIndex === keyword_undefined && !(conType === 2 && compareType === 0)) {
            checkItem = Core_1.GC$('.' + FILTER_SUB_ITEM)[arrayHelper_getLength(list) - 1];
        }
        else if (chooseIndex === 0 && conType === 5 ) {
            checkItem = Core_1.GC$('.' + FILTER_SUB_ITEM)[chooseIndex];
        }
        Core_1.GC$(checkItem).attr(DATA_ISCHECK, 1);
        Core_1.GC$(checkItem).find('.' + SUB_MENU_CHECK_IMG).css([DISPLAY], [INLINE_BLOCK]);
    };
    _CellValueFilterMenu.prototype._hoverFirstItem = function () {
        var firstItem = Core_1.GC$('.' + FILTER_SUB_ITEM).removeClass(FILTER_CLASS)[0];
        Core_1.GC$(firstItem).addClass(FILTER_CLASS);
    };
    _CellValueFilterMenu.prototype._getMajorConditionType = function (conditionType) {
        var type;

        if (conditionType !== 0 ) {
            type = conditionType;
        }
        else {
            switch (this._type) {
                case NUMBER_FILTER:
                    type = 1;

                    break;
                case TEXT_FILTER:
                    type = 2;

                    break;
                case DATE_FILTER:
                    type = 5;

                    break;
            }
        }
        return type;
    };
    _CellValueFilterMenu.prototype._createModalDialog = function (dialogType, conditionType, operatorType, isCustom) {
        var sheet = this._sheet, modalDialog;
        switch (dialogType) {
            case TOP10_DIALOG:

                modalDialog = new _Top10Dialog(sheet.parent._getContainerDiv(), sheet, this._filterButtonInfo, TOP10_DIALOG);

                break;
            case CUSTOM_DIALOG:

                modalDialog = new _CustModalDialog(sheet.parent._getContainerDiv(), sheet, this._filterButtonInfo, CUSTOM_DIALOG, this._parentDialog._allValues, isCustom, conditionType, operatorType, this._getMajorConditionType(conditionType));

                break;
        }
        if (modalDialog) {
            modalDialog._open();
        }
    };
    _CellValueFilterMenu.prototype._doFilter = function ($target) {
        var colIndex = this._filterButtonInfo.col, isNeedDialog = parseInt($target.attr(DATA_IS_NEED_DIALOG), 10), conditionType = parseInt($target.attr(DATA_CONDITION_TYPE), 10), operatorType = parseInt($target.attr(DATA_OPERATOR_TYPE), 10), dialogtype, expectTypeId = parseInt($target.attr('data-expectTypeId'), 10), isCustom = parseInt($target.attr(DATA_IS_CUSTOM), 10);
        var isChecked = parseInt($target.attr(DATA_ISCHECK), 10);
        if (!isNaN(expectTypeId)) {
            isNeedDialog = 0;
            isCustom = 0;
        }

        if (isNeedDialog === 0 && isChecked === 1) {
            this._clearFilter();
            this._parentDialog.close();
            return;
        }
        if (isNeedDialog === 1) {
            this._parentDialog.close();
            if (conditionType === 8 && operatorType === 0 ) {
                dialogtype = TOP10_DIALOG;
            }
            else {
                dialogtype = CUSTOM_DIALOG;
            }
            this._createModalDialog(dialogtype, conditionType, operatorType, isCustom);
            return;
        }
        var condition = new ConditionalFormatting_1.Condition(conditionType);
        if (conditionType === 10 ) {
            condition.type(operatorType);
        }
        else {
            condition.compareType(operatorType);
        }
        if (conditionType === 6 && !isNaN(expectTypeId)) {
            condition = new ConditionalFormatting_1.Condition(conditionType);
            condition.expectTypeId(expectTypeId);
            condition.expected(operatorType);
        }
        else if (conditionType === 6) {
            condition = new ConditionalFormatting_1.Condition(conditionType);
            condition.expected(operatorType);
        }
        this._doFilterByCondition(colIndex, condition);
    };
    _CellValueFilterMenu.prototype._createContentHtml = function () {
    };
    _CellValueFilterMenu.prototype._rendMenuContent = function (data) {
        var html = '';
        for (var i = 0, len = data.length; i < len; i++) {
            if (i === len - 1) {
                html += this._createMenuItemBy(data[i], 1);
            }
            else {
                html += this._createMenuItemBy(data[i], 0);
            }
        }
        this._submenuWrap.html(html);
        Core_1.GC$(this._wrap).append(this._submenuWrap);
        this._updateSubmenuStyle();
        this._setCheckedContentItem();
    };
    _CellValueFilterMenu.prototype._updateSubmenuStyle = function () {
        var lineHeight = this._wrap.offsetHeight - 2, top = this._wrap.offsetTop;
        Core_1.GC$('.' + FILTER_SUB_ITEM + ',.' + ALL_DATE_ITEM).css([PADDING, HEIGHT, 'line-height', 'white-space', 'clear', BORDER, WIDTH, HEIGHT, FONT_SIZE, MARGIN], ['0 10px 0 0', lineHeight, lineHeight, 'nowrap', 'both', NONE, 'auto', 'auto', '12px', 0]);
        this._submenuWrap.css([LEFT, TOP], ['100%', top]);
        Core_1.GC$('.gc-filter-hotkey').css(['text-decoration'], ['underline']);
        Core_1.GC$('.' + SUB_MENU_CHECK).css([DISPLAY, WIDTH, 'textAlign'], [INLINE_BLOCK, '24px', 'center']);
        Core_1.GC$('.' + SUB_MENU_CHECK + ' img').css([DISPLAY, 'verticalAlign'], [INLINE_BLOCK, 'text-bottom']);
        Core_1.GC$('.' + SUB_MENU_CHECK_IMG + ',.' + ALL_DATE_CHECK_IMG).hide();
        Core_1.GC$('#' + ALL_DATE_CONTAINER).css([POSITION], [RELATIVE]);
        Core_1.GC$('.' + FILTER_ARROW_CLASS).css([MARGIN_LEFT, WIDTH, HEIGHT, 'background-position'], ['5px', '16px', '16px', 'center bottom']);
        Core_1.GC$('#' + ALL_DATE_LIST).css([POSITION, DISPLAY, WIDTH], ['absolute', 'none', 'auto']);
    };
    _CellValueFilterMenu.prototype._createMenuItemBy = function (arr, isCustom) {
        var html = '', isNeedCustomDialog = arr[0], context = getSR()[arr[1]], conditionType = arr[3], operatorType = arr[4];
        html = '' + START_DIV_CLASS_EQUAL + '"' + FILTER_SUB_ITEM + '" ' + DATA_IS_CUSTOM + '="' + isCustom + '" ' + DATA_IS_NEED_DIALOG + ' ="' + isNeedCustomDialog + '" ' + DATA_CONDITION_TYPE + '="' + conditionType + '" ' + DATA_OPERATOR_TYPE + '="' + operatorType + '">' + START_DIV_CLASS_EQUAL + '"' + FILTER_SORT_CLASS + '">' + START_SPAN_CLASS_EQUAL + '"' + SUB_MENU_CHECK + '">' + START_IMG_CLASS_EQUAL + '"' + SUB_MENU_CHECK_IMG + '" src="' + this._getImageSrc(11) + '">' + END_SPAN_START_SPAN + '' + context + '</span>'
            + END_DIV_END_DIV;
        return html;
    };
    _CellValueFilterMenu.prototype._hoverPrevItem = function () {
        var hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, this._submenuWrap[0]).removeClass(FILTER_CLASS);
        var list = Core_1.GC$('.' + FILTER_SUB_ITEM);
        if (hoverItem.index() === 0) {
            Core_1.GC$(list[list.length - 1]).addClass(FILTER_CLASS);
        }
        else {
            Core_1.GC$(list[hoverItem.index() - 1]).addClass(FILTER_CLASS);
        }
    };
    _CellValueFilterMenu.prototype._hoverNextItem = function () {
        var hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, this._submenuWrap[0]);
        if (hoverItem.length > 0 && hoverItem[0].nextSibling) {
            hoverItem.removeClass(FILTER_CLASS);
            Core_1.GC$(hoverItem[0].nextSibling).addClass(FILTER_CLASS);
        }
        else {
            this._hoverFirstItem();
        }
    };
    return _CellValueFilterMenu;
}(_FilterSubMenuBase));
var _NumberFilterMenu = (function (_super) {
    __extends(_NumberFilterMenu, _super);
    function _NumberFilterMenu(wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) {
        var _this = _super.call(this, wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) || this;
        var list = NUMBER_FILTER_LIST;
        if (sheet._isExternalFilter) {
            list = list.slice(0, 7).concat(list.slice(list.length - 1));
        }
        _this._renderListData = list;
        return _this;
    }
    _NumberFilterMenu.prototype._createContentHtml = function () {
        this._rendMenuContent(this._renderListData);
    };
    return _NumberFilterMenu;
}(_CellValueFilterMenu));
exports._NumberFilterMenu = _NumberFilterMenu;
var _TextFilterMenu = (function (_super) {
    __extends(_TextFilterMenu, _super);
    function _TextFilterMenu(wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) {
        var _this = _super.call(this, wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) || this;
        _this._renderListData = TEXT_FILTER_LIST;
        return _this;
    }
    _TextFilterMenu.prototype._createContentHtml = function () {
        this._rendMenuContent(TEXT_FILTER_LIST);
    };
    return _TextFilterMenu;
}(_CellValueFilterMenu));
exports._TextFilterMenu = _TextFilterMenu;
var _DateFilterMenu = (function (_super) {
    __extends(_DateFilterMenu, _super);
    function _DateFilterMenu(wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) {
        var _this = _super.call(this, wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) || this;
        var list = DATE_FILTER_LIST;
        if (sheet._isExternalFilter) {
            list = list.slice(0, 4).concat(list.slice(list.length - 1));
        }
        _this._renderListData = list;
        return _this;
    }
    _DateFilterMenu.prototype._createContentHtml = function () {
        this._rendMenuContent(this._renderListData);
    };
    _DateFilterMenu.prototype._createMenuItemBy = function (arr, isCustom) {
        var html = '', isNeedCustomDialog = arr[0], context = getSR()[arr[1]], conditionType = arr[3], operatorType = arr[4];
        if (arr[1] === 'AllDates') {
            html = '<div id="' + ALL_DATE_CONTAINER + '" class="' + FILTER_SUB_ITEM + '" ' + DATA_IS_CUSTOM + '="' + isCustom + '" ' + DATA_IS_NEED_DIALOG + ' ="' + isNeedCustomDialog + '" ' + DATA_CONDITION_TYPE + '="' + conditionType + '" ' + DATA_OPERATOR_TYPE + '="' + operatorType + '">' + START_DIV_CLASS_EQUAL + '"' + FILTER_SORT_CLASS + '">' + START_SPAN_CLASS_EQUAL + '"' + SUB_MENU_CHECK + '">' + START_IMG_CLASS_EQUAL + '"' + SUB_MENU_CHECK_IMG + '" src="' + this._getImageSrc(11) + '">' + END_SPAN_START_SPAN + '' + context + '</span>'
                + '' + START_SPAN_CLASS_EQUAL + '"' + FILTER_ARROW_CLASS + ' gc-filterDialog-rightArrow' + '"></span></div>' + this._createAllDatesHtml() + '</div>';
        }
        else if (arr[1] === 'YearToDate') {
            html = '' + START_DIV_CLASS_EQUAL + '"' + FILTER_SUB_ITEM + '" data-expectTypeId="' + arr[5] + '" ' + DATA_IS_CUSTOM + '="' + isCustom + '" ' + DATA_IS_NEED_DIALOG + ' ="' + isNeedCustomDialog + '" ' + DATA_CONDITION_TYPE + '="' + conditionType + '" ' + DATA_OPERATOR_TYPE + '="' + operatorType + '">' + START_DIV_CLASS_EQUAL + '"' + FILTER_SORT_CLASS + '">' + START_SPAN_CLASS_EQUAL + '"' + SUB_MENU_CHECK + '">' + START_IMG_CLASS_EQUAL + '"' + SUB_MENU_CHECK_IMG + '" src="' + this._getImageSrc(11) + '">' + END_SPAN_START_SPAN + '' + context + '</span>'
                + END_DIV_END_DIV;
        }
        else {
            html = '' + START_DIV_CLASS_EQUAL + '"' + FILTER_SUB_ITEM + '" ' + DATA_IS_CUSTOM + '="' + isCustom + '" ' + DATA_IS_NEED_DIALOG + ' ="' + isNeedCustomDialog + '" ' + DATA_CONDITION_TYPE + '="' + conditionType + '" ' + DATA_OPERATOR_TYPE + '="' + operatorType + '">' + START_DIV_CLASS_EQUAL + '"' + FILTER_SORT_CLASS + '">' + START_SPAN_CLASS_EQUAL + '"' + SUB_MENU_CHECK + '">' + START_IMG_CLASS_EQUAL + '"' + SUB_MENU_CHECK_IMG + '" src="' + this._getImageSrc(11) + '">' + END_SPAN_START_SPAN + '' + context + '</span>'
                + END_DIV_END_DIV;
        }
        return html;
    };
    _DateFilterMenu.prototype._show = function () {
        Core_1.GC$('.' + FILTER_WRAP_CLASS).hide();
        this._submenuWrap.show();
        this._updatePosition(this._updateAllDatePosition);
    };
    _DateFilterMenu.prototype._updateAllDatePosition = function (isRight) {
        this._submenuWrap.show();
        var $el = Core_1.GC$('#' + ALL_DATE_LIST), wrap = Core_1.GC$('#' + ALL_DATE_CONTAINER), container = this._submenuWrap, left, top;
        if ($el.length <= 0) {
            return;
        }
        var docElement = document.documentElement, clientWidth = docElement.clientWidth, clientHeight = docElement.clientHeight;
        var overlayOffset = this._parentDialog._overlay.offset(), overlayOffsetTop = overlayOffset.top;
        if ((container.offset().left + container.width() + $el.width() > clientWidth)) {
            left = -1 * ($el.width()) + 'px';
        }
        else if (isRight) {
            left = container.width() + 'px';
        }
        else {
            left = -1 * ($el.width()) + 'px';
        }
        if (wrap.offset().top + $el.height() - overlayOffsetTop > clientHeight) {
            top = overlayOffsetTop + clientHeight - $el.height() - wrap.offset().top - 5;
        }
        else {
            top = 0;
        }
        top = top + 'px';
        $el.css([LEFT, TOP], [left, top]);
    };
    _DateFilterMenu.prototype._createAllDatesHtml = function () {
        var html = '<div id="' + ALL_DATE_LIST + '" class="' + FILTER_DIALOG_CLASS + '">';
        for (var i = 0; i < arrayHelper_getLength(All_DATES_FILTER_LIST); i++) {
            html += '' + START_DIV_CLASS_EQUAL + '"' + ALL_DATE_ITEM + '" data-expectTypeId="' + All_DATES_FILTER_LIST[i][4] + '" ' + DATA_CONDITION_TYPE + '="' + 6 + '"  ' + DATA_OPERATOR_TYPE + '="' + All_DATES_FILTER_LIST[i][3] + '">' + START_DIV_CLASS_EQUAL + '"' + FILTER_SORT_CLASS + '">' + START_SPAN_CLASS_EQUAL + '"' + SUB_MENU_CHECK + '">' + START_IMG_CLASS_EQUAL + '"' + ALL_DATE_CHECK_IMG + '" src="' + this._getImageSrc(11) + '">' + END_SPAN_START_SPAN + '' + getSR()[All_DATES_FILTER_LIST[i][0]] + '</span>'
                + END_DIV_END_DIV;
        }
        html += '</div>';
        return html;
    };
    _DateFilterMenu.prototype._hoverFirstItem = function () {
        if (this._isAllDatesMenuShow()) {
            var allDatesList = Core_1.GC$('.' + ALL_DATE_ITEM).removeClass(FILTER_CLASS);
            Core_1.GC$(allDatesList[0]).addClass(FILTER_CLASS);
        }
        else {
            var firstItem = Core_1.GC$('.' + FILTER_SUB_ITEM).removeClass(FILTER_CLASS)[0];
            Core_1.GC$(firstItem).addClass(FILTER_CLASS);
        }
    };
    _DateFilterMenu.prototype._isAllDatesMenuShow = function () {
        var flag = false, $el = Core_1.GC$('#' + ALL_DATE_LIST);
        if ($el.length === 0) {
            flag = false;
        }
        else {
            flag = ($el.css(DISPLAY) !== NONE);
        }
        return flag;
    };
    _DateFilterMenu.prototype._hideAllDatesList = function () {
        Core_1.GC$('#' + ALL_DATE_LIST).hide();
        Core_1.GC$('.' + ALL_DATE_ITEM).removeClass(FILTER_CLASS);
    };
    _DateFilterMenu.prototype._bindEventEx = function () {
        var self = this;
        Core_1.GC$('.' + ALL_DATE_ITEM, self._submenuWrap[0]).bind(MOUSE_OVER, function () {
            Core_1.GC$(this).addClass(FILTER_CLASS);
            Core_1.GC$('#' + ALL_DATE_CONTAINER).addClass(FILTER_CLASS);
        }).bind(MOUSE_OUT, function () {
            Core_1.GC$(this).removeClass(FILTER_CLASS);
        }).bind(CLICK, function (e) {
            self._doFilter(Core_1.GC$(this));
            util_cancelDefault(e);
        });
        Core_1.GC$('#' + ALL_DATE_CONTAINER, self._submenuWrap[0]).bind(MOUSE_OVER, function () {
            Core_1.GC$('#' + ALL_DATE_LIST).show();
        }).bind(MOUSE_OUT, function () {
            self._hideAllDatesList();
        }).bind(CLICK, function (e) {
            Core_1.GC$('#' + ALL_DATE_LIST).show();
            self._hoverFirstItem();
            util_cancelDefault(e);
        });
    };
    _DateFilterMenu.prototype._isAllDatesContainerHover = function () {
        var flag = false, $el = Core_1.GC$('#' + ALL_DATE_CONTAINER);
        if ($el.length === 0) {
            flag = false;
        }
        else {
            flag = ($el.hasClass(FILTER_CLASS));
        }
        return flag;
    };

    _DateFilterMenu.prototype._setAllDatesItemCheck = function (list, expected, expectTypeId) {
        var chooseIndex;
        for (var i = 0; i < arrayHelper_getLength(list); i++) {
            if (list[i][3] === expected && list[i][4] === expectTypeId) {
                chooseIndex = i;
                break;
            }
        }
        var chooseItem = Core_1.GC$('.' + ALL_DATE_ITEM)[chooseIndex];
        Core_1.GC$(chooseItem).attr(DATA_ISCHECK, 1);
        Core_1.GC$(chooseItem).find('.' + ALL_DATE_CHECK_IMG).css([DISPLAY], [INLINE_BLOCK]).attr(DATA_ISCHECK, 1);
    };
    _DateFilterMenu.prototype._confirmHoverHandle = function () {
        var hoverItem;
        if (this._isAllDatesMenuShow()) {
            hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, Core_1.GC$('#' + ALL_DATE_LIST)[0]);
        }
        else {
            hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, this._submenuWrap[0]);
        }
        hoverItem.trigger(CLICK);
    };
    _DateFilterMenu.prototype._hideMenuHandle = function () {
        var rs = keyword_null;
        if (this._isAllDatesMenuShow()) {
            this._hideAllDatesList();
            rs = this;
        }
        else {
            this._hide();
        }
        return rs;
    };
    _DateFilterMenu.prototype._showMenuHandle = function () {
        var isSubMenuShow = this._isShow(), isAllDatesShow = this._isAllDatesMenuShow();
        if (!isSubMenuShow) {
            this._show();
            this._hoverFirstItem();
        }
        else if (!isAllDatesShow && this._isAllDatesContainerHover()) {
            Core_1.GC$('#' + ALL_DATE_LIST).show();
            this._hoverFirstItem();
        }
    };
    _DateFilterMenu.prototype._hoverPrevItem = function () {
        if (this._isAllDatesMenuShow()) {
            var allDatesHoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, Core_1.GC$('#' + ALL_DATE_LIST)[0]).removeClass(FILTER_CLASS);
            var allDatesList = Core_1.GC$('.' + ALL_DATE_ITEM);
            if (allDatesHoverItem.index() === 0) {
                Core_1.GC$(allDatesList[allDatesList.length - 1]).addClass(FILTER_CLASS);
            }
            else {
                Core_1.GC$(allDatesList[allDatesHoverItem.index() - 1]).addClass(FILTER_CLASS);
            }
        }
        else {
            var hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, this._submenuWrap[0]).removeClass(FILTER_CLASS);
            var list = Core_1.GC$('.' + FILTER_SUB_ITEM);
            if (hoverItem.index() === 0) {
                Core_1.GC$(list[list.length - 1]).addClass(FILTER_CLASS);
            }
            else {
                Core_1.GC$(list[hoverItem.index() - 1]).addClass(FILTER_CLASS);
            }
        }
    };
    _DateFilterMenu.prototype._hoverNextItem = function () {
        if (this._isAllDatesMenuShow()) {
            var allDatesHoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, Core_1.GC$('#' + ALL_DATE_LIST)[0]).removeClass(FILTER_CLASS);
            var allDatesList = Core_1.GC$('.' + ALL_DATE_ITEM);
            if (allDatesHoverItem.index() === (allDatesList.length - 1)) {
                Core_1.GC$(allDatesList[0]).addClass(FILTER_CLASS);
            }
            else {
                Core_1.GC$(allDatesList[allDatesHoverItem.index() + 1]).addClass(FILTER_CLASS);
            }
        }
        else {
            var hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, this._submenuWrap[0]);
            if (hoverItem.length > 0 && hoverItem[0].nextSibling) {
                hoverItem.removeClass(FILTER_CLASS);
                Core_1.GC$(hoverItem[0].nextSibling).addClass(FILTER_CLASS);
            }
            else {
                this._hoverFirstItem();
            }
        }
    };
    return _DateFilterMenu;
}(_CellValueFilterMenu));
exports._DateFilterMenu = _DateFilterMenu;


var _ColorFilterMenu = (function (_super) {
    __extends(_ColorFilterMenu, _super);
    function _ColorFilterMenu(wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) {
        return _super.call(this, wrap, container, filterButtonInfo, sheet, parentDialog, dialogType) || this;
    }
    _ColorFilterMenu.prototype._render = function () {
        this._renderColorSubmenuByType(this._parentDialog._cellColorList, this._parentDialog._fontColorList);
    };
    _ColorFilterMenu.prototype._getSortInfo = function () {
        var sortInfo, filterSortInfo = this._rowFilter._sortInfo;
        if (filterSortInfo && filterSortInfo.color !== keyword_undefined) {
            var isBackColor = filterSortInfo.isBackColor ? 0 : 1, color = filterSortInfo.color;
            var cellColorList = this._parentDialog._cellColorList, fontColorList = this._parentDialog._fontColorList;
            if (color[0] === '{') {
                color = JSON.parse(color);
            }
            else if (color !== '') {
                color = formatColor(color);
            }

            if (color === '' && isBackColor === 0 && cellColorList[AUTO_MATIC] === keyword_undefined) {
                return keyword_undefined;
            }
            else if (color === '' && isBackColor !== 0 && fontColorList[AUTO_MATIC] === keyword_undefined) {
                return keyword_undefined;
            }
            sortInfo = {
                colorType: isBackColor,
                color: color
            };
        }
        return sortInfo;
    };
    _ColorFilterMenu.prototype._getFilterInfo = function () {
        var condition = this._rowFilter._filterItemMap[this._filterButtonInfo.col], filterInfo;
        if (condition && condition.length > 0 && condition[0].conType() === 3 ) {
            filterInfo = {
                colorType: condition[0].compareType(),
                color: condition[0].expected()
            };
        }
        return filterInfo;
    };
    _ColorFilterMenu.prototype._renderColorSubmenuByType = function (cellColorList, fontColorList) {
        this._rendColorMenu(cellColorList, fontColorList);
        this._updateColorSubmenuStyle();
    };
    _ColorFilterMenu.prototype._doColorSort = function (color, isCellColor) {
        this._parentDialog._sortByColor(color, isCellColor);
        this._parentDialog.close();
        return;
    };
    _ColorFilterMenu.prototype._showMoreColorDialog = function (isCellColor) {
        this._parentDialog.close();
        var self = this, sheet = self._sheet, selectColor;
        var allColors = isCellColor ? this._parentDialog._cellColorList : this._parentDialog._fontColorList;
        if (this._checkInfo) {
            selectColor = this._checkInfo.color;
        }

        var colorModalDialog = new _ColorModalDialog(sheet.parent._getContainerDiv(), sheet, this._filterButtonInfo, this._dialogType, allColors, isCellColor, selectColor);

        colorModalDialog._open();
    };
    _ColorFilterMenu.prototype._doColorFilter = function (color, isCellColor) {
        var condition = new ConditionalFormatting_1.Condition(3 ), colIndex = this._filterButtonInfo.col;
        var compareType = isCellColor ? 0 : 1 ;
        var checkedInfo = this._getFilterInfo();
        if (checkedInfo && checkedInfo.colorType === compareType && checkedInfo.color === color) {
            this._clearFilter();
            this._parentDialog.close();
            return;
        }
        condition.compareType(compareType);
        condition.expected(color);
        this._doFilterByCondition(colIndex, condition);
    };
    _ColorFilterMenu.prototype._updateColorSubmenuStyle = function () {
        Core_1.GC$('.' + COLOR_DIALOG_TITLE, this._submenuWrap[0]).css([HEIGHT, 'line-height', 'textIndent', 'whiteSpace'], ['32px', '32px', '8px', 'nowrap']);
        Core_1.GC$('.' + COLOR_ITEM_CLASS, this._submenuWrap[0]).css(['listStyle', 'padding', HEIGHT, 'lineHeight', BORDER, 'whiteSpace', WIDTH, MARGIN, FONT_SIZE, BOX_SIZING], [NONE, '2px 0', '23px', '23px', '1px solid transparent', 'nowrap', '140px', 0, '12px', 'content-box']);
        Core_1.GC$('.' + COLOR_ITEM_CONTENT, this._submenuWrap[0]).css([WIDTH, BORDER, MARGIN_RIGHT, HEIGHT, BOX_SIZING, 'whiteSpace', FLOAT], ['75px', '1px solid rgb(130,130,130)', '24px', '22px', BORDER_BOX, 'nowrap', LEFT]);
        Core_1.GC$('.' + COLOR_CHECKED_WRAP, this._submenuWrap[0]).css([DISPLAY, WIDTH, HEIGHT, 'verticalAlign', MARGIN, 'textAlign', FLOAT], [INLINE_BLOCK, '22px', '22px', 'middle', '0 3px 0 2px', 'center', LEFT]);
        Core_1.GC$('.' + COLOR_CHECKED_WRAP + ' img', this._submenuWrap[0]).css([MARGIN_TOP, DISPLAY], ['3px', NONE]);
        Core_1.GC$('.gc-color-dialog-more-color', this._submenuWrap[0]).css([PADDING], ['0 5px 0 0']);
        Core_1.GC$('.' + COLOR_CHECKED_WRAP + ' img.checked', this._submenuWrap[0]).css([MARGIN_TOP, DISPLAY], ['3px', 'block']);
    };
    _ColorFilterMenu.prototype._rendColorMenu = function (cellColorList, fontColorList) {
        var cellColorTitle, fontColorTitle, checkInfo;
        if (this._dialogType === SUB_MENU_COLOR_SORT) {
            cellColorTitle = getSR().SortCellTitle;
            fontColorTitle = getSR().SortFontTitle;
            checkInfo = this._getSortInfo();
        }
        else if (this._dialogType === SUB_MENU_COLOR_FILTER) {
            cellColorTitle = getSR().FilterCellTitle;
            fontColorTitle = getSR().FilterFontTitle;
            checkInfo = this._getFilterInfo();
        }
        this._checkInfo = checkInfo;
        var html = this._rendColorList(cellColorTitle, cellColorList[AUTO_MATIC], cellColorList.data, 0 , checkInfo);
        html += this._rendColorList(fontColorTitle, fontColorList[AUTO_MATIC], fontColorList.data, 1 , checkInfo);
        if (html !== '') {
            this._submenuWrap.html(html);
        }
        else {
            this._isNullMenu = true;
        }
        Core_1.GC$(this._wrap).append(this._submenuWrap);
        this._submenuWrap.find('canvas').forEach(function (element, index, array) {
            var canvas = element;
            var backColor;
            if (canvas.textContent[0] === '{') {
                backColor = JSON.parse(canvas.textContent);
            }
            else {
                backColor = canvas.textContent;
            }
            var CANVAS_WIDTH = 73;
            var CANVAS_HEIGHT = 20;
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            var ctx = canvas.getContext('2d');
            var fillFunc = function () { ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); };
            Core_1._StyleHelper.setFillStyle(ctx, backColor, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, fillFunc);
        });
    };
    _ColorFilterMenu.prototype._rendColorList = function (title, automatic, colorList, type, checkInfo) {
        var wrapClass, checkedColor, checkColorMatched = false, checkedClass = 'checked';
        if (checkInfo && type === checkInfo.colorType && checkInfo.color !== '') {
            checkedColor = formatColor(checkInfo.color);
        }
        else if (checkInfo && checkInfo.color === '' && type === checkInfo.colorType) {
            checkedColor = checkInfo.color;
        }
        wrapClass = (type === 0 ) ? COLOR_DIALOG_BACKGROUND_WRAP : COLOR_DIALOG_FONT_WRAP;
        var html = '' + START_DIV_CLASS_EQUAL + '\'' + COLOR_DIALOG_TITLE + '\'>' + title + '</div><ul class=\'' + wrapClass + '\' style=\'padding: 7px 0 0 0;margin:0\'>', index = 0;
        for (var item in colorList) {
            if (colorList.hasOwnProperty(item) && index < 5) {
                var itemCheckClass = '';
                if (checkedColor !== keyword_undefined && checkedColor === item) {
                    itemCheckClass = checkedClass;
                    checkColorMatched = true;
                }
                html += '' + START_LI_CLASS_EQUAL + '"' + COLOR_ITEM_CLASS + '" ' + DATA_COL_INDEX + '="' + colorList[item] + '" ' + DATA_COLOR_TYPE + '="' + type + '">' + START_SPAN_CLASS_EQUAL + '"' + COLOR_CHECKED_WRAP + '">' + START_IMG_CLASS_EQUAL + '"' + itemCheckClass + '" src="' + this._getImageSrc(11) + '"></span>' + START_DIV_CLASS_EQUAL + '"' + COLOR_ITEM_CONTENT + '"><canvas>' + item + '</canvas></div></li>';
                index++;
            }
        }
        if ((index === 0 && checkedColor === keyword_undefined) || (automatic === keyword_undefined && index === 1)) {
            html = '';
            return html;
        }
        if (automatic !== keyword_undefined) {
            var noFillText = (type === 0 ) ? getSR().NoFill : getSR().Automatic;
            var automaticCheckClass = '';
            if (checkedColor !== keyword_undefined && checkedColor === '') {
                automaticCheckClass = checkedClass;
                checkColorMatched = true;
            }
            html += '' + START_LI_CLASS_EQUAL + '"' + COLOR_ITEM_CLASS + '" ' + DATA_COL_INDEX + '="' + AUTO_MATIC + '" ' + DATA_COLOR_TYPE + '="' + type + '" ' + DATA_COLOR + ' = "">' + START_SPAN_CLASS_EQUAL + '"' + COLOR_CHECKED_WRAP + '"><img  class="' + automaticCheckClass + '" src="' + this._getImageSrc(11) + '"></span>' + START_DIV_CLASS_EQUAL + '"' + FILTER_SORT_CLASS + '">' + noFillText + '</div></li>';
        }
        if (index === 5) {
            var moreColorCheckClass = '';
            if (!checkColorMatched && checkedColor !== keyword_undefined) {
                moreColorCheckClass = checkedClass;
            }
            var moreColorText = (type === 0 ) ? getSR().CellColor : getSR().FontColor;
            html += '' + START_LI_CLASS_EQUAL + '"' + COLOR_ITEM_CLASS + '" ' + DATA_COL_INDEX + '="' + MORE_COLOR + '" ' + DATA_COLOR_TYPE + '="' + type + '" >' + START_SPAN_CLASS_EQUAL + '"' + COLOR_CHECKED_WRAP + '">' + START_IMG_CLASS_EQUAL + '"' + moreColorCheckClass + '" src="' + this._getImageSrc(11) + '"></span>' + START_DIV_CLASS_EQUAL + '"' + FILTER_SORT_CLASS + ' gc-color-dialog-more-color">' + moreColorText + '</div></li>';
        }
        html += '</ul>';
        return html;
    };
    _ColorFilterMenu.prototype._hoverFirstItem = function () {
        var firstColorItem = Core_1.GC$('.' + COLOR_ITEM_CLASS, this._submenuWrap[0]).removeClass(FILTER_CLASS)[0];
        Core_1.GC$(firstColorItem).addClass(FILTER_CLASS);
    };
    _ColorFilterMenu.prototype._bindEvent = function () {
        var self = this;
        self._submenuWrap.bind(MOUSE_OVER, function (e) {
            util_cancelDefault(e);
        }).bind(MOUSE_OUT, function (e) {
            util_cancelDefault(e);
        });
        Core_1.GC$('.' + COLOR_ITEM_CLASS, self._submenuWrap[0]).bind(CLICK, function () {
            var color, canvas = Core_1.GC$(this).find('canvas'), colIndex = Core_1.GC$(this).attr(DATA_COL_INDEX), colorType = Core_1.GC$(this).attr(DATA_COLOR_TYPE), isCellColor = false;
            if (canvas && canvas.length > 0) {
                color = canvas.text();
                if (color[0] === '{') {
                    color = JSON.parse(color);
                }
            }
            else {
                color = Core_1.GC$(this).attr(DATA_COLOR);
            }
            colorType = parseInt(colorType, 10);
            if (colorType === 0 ) {
                isCellColor = true;
            }

            if (colIndex === 'more_color') {
                self._showMoreColorDialog(isCellColor);
                return;
            }
            if (self._dialogType === SUB_MENU_COLOR_SORT) {
                self._doColorSort(color, isCellColor);
            }
            else if (self._dialogType === SUB_MENU_COLOR_FILTER) {
                self._doColorFilter(color, isCellColor);
            }
        }).bind(MOUSE_OVER, function (e) {
            Core_1.GC$('.' + COLOR_ITEM_CLASS, self._submenuWrap[0]).removeClass(FILTER_CLASS);
            Core_1.GC$(this).addClass(FILTER_CLASS);
            util_cancelDefault(e);
        }).bind(MOUSE_OUT, function (e) {
            Core_1.GC$(this).removeClass(FILTER_CLASS);
            util_cancelDefault(e);
        });
    };
    _ColorFilterMenu.prototype._getHoverIndex = function (allList) {
        var index = 0;
        allList.forEach(function (elem, item) {
            if (Core_1.GC$(elem).hasClass(FILTER_ITEM_HOVER_CLASS)) {
                index = item;
            }
        });
        return index;
    };
    _ColorFilterMenu.prototype._hoverPrevItem = function () {
        var allList = Core_1.GC$('.' + COLOR_ITEM_CLASS, this._submenuWrap[0]);
        var index = this._getHoverIndex(allList);
        if (index === 0) {
            Core_1.GC$(allList.removeClass(FILTER_CLASS)[allList.length - 1]).addClass(FILTER_CLASS);
        }
        else {
            var prev = allList.removeClass(FILTER_CLASS)[index - 1];
            Core_1.GC$(prev).addClass(FILTER_CLASS);
        }
    };
    _ColorFilterMenu.prototype._hoverNextItem = function () {
        var allList = Core_1.GC$('.' + COLOR_ITEM_CLASS, this._submenuWrap[0]);
        var index = this._getHoverIndex(allList);
        if (index === allList.length - 1) {
            this._hoverFirstItem();
        }
        else {
            var next = allList.removeClass(FILTER_CLASS)[index + 1];
            Core_1.GC$(next).addClass(FILTER_CLASS);
        }
    };
    return _ColorFilterMenu;
}(_FilterSubMenuBase));
exports._ColorFilterMenu = _ColorFilterMenu;


var _FilterModalDialogBase = (function (_super) {
    __extends(_FilterModalDialogBase, _super);
    function _FilterModalDialogBase(host, sheet, filterButtonInfo, dialogType) {
        var _this = this;
        var sheetParent = sheet.parent;
        _this = _super.call(this, host, util._getPreferredZIndex(sheetParent && sheetParent._host), true ) || this;
        var self = _this;
        self._sheet = sheet;
        self._okId = self._name + '_OK';
        self._cancelId = self._name + '_Cancel';
        self._closeId = self._name + '_Close';
        self._filterButtonInfo = filterButtonInfo;
        self._rowFilter = filterButtonInfo.rowFilter;
        self._dialogType = dialogType;
        self._container = self._getContainer();
        return _this;
    }
    _FilterModalDialogBase.prototype._open = function () {
    };
    _FilterModalDialogBase.prototype._initDom = function () {
        this._show();
        this._render();
        this._bindGeneralEvent();
        this._center();
    };
    _FilterModalDialogBase.prototype._render = function () {
    };
    _FilterModalDialogBase.prototype._center = function () {
        var self = this, width = self._container.width(), height = self._container.height(), wrapWidth = self._overlay.width(), wrapHeight = self._overlay.height();
        this._container.css([POSITION, LEFT, TOP], ['fixed', (wrapWidth - width) / 2 + 'px', (wrapHeight - height) / 2 + 'px']);
    };
    _FilterModalDialogBase.prototype._bindGeneralEvent = function () {
        var self = this;
        Core_1.GC$('#' + self._okId).bind(CLICK, function () {
            var rs = self._confirmTriggerHandle();
            if (rs) {
                self.close();
            }
        });
        Core_1.GC$('#' + self._cancelId).bind(CLICK, function () {
            self._cancelTriggerHandle();
            self.close();
        });
        Core_1.GC$('#' + self._closeId).bind(CLICK, function () {
            self._cancelTriggerHandle();
            self.close();
        }).bind(MOUSE_OVER, function () {
            this.style.backgroundColor = CLOSE_HOVER_BACKCOLOR;
            this.style.color = CLOSE_HOVER_FONTCOLOR;
        }).bind(MOUSE_OUT, function () {
            this.style.backgroundColor = INHERIT;
            this.style.color = INHERIT;
        });
        Core_1.GC$('#' + self._okId + ', #' + self._cancelId).bind(MOUSE_OVER, function () {
            Core_1.GC$(this).addClass(FILTER_BUTTON_HOVER_CLASS);
        }).bind(MOUSE_OUT, function () {
            Core_1.GC$(this).removeClass(FILTER_BUTTON_HOVER_CLASS);
        });
        Core_1.GC$(document).bind(RESIZE, function () {
            self._center();
        });
    };
    _FilterModalDialogBase.prototype._doFilter = function (condition) {
        var filterButtonInfo = this._filterButtonInfo, colIndex = filterButtonInfo.col, sheet = this._sheet, rowFilter = filterButtonInfo.rowFilter;
        filterByCondition(colIndex, condition, sheet, rowFilter);
    };
    _FilterModalDialogBase.prototype._confirmTriggerHandle = function () {
        return true;
    };
    _FilterModalDialogBase.prototype._cancelTriggerHandle = function () {
    };
    return _FilterModalDialogBase;
}(Core_1._BaseDialog));
exports._FilterModalDialogBase = _FilterModalDialogBase;
var _Top10Dialog = (function (_super) {
    __extends(_Top10Dialog, _super);
    function _Top10Dialog(host, sheet, filterButtonInfo, dialogType) {
        var _this = _super.call(this, host, sheet, filterButtonInfo, dialogType) || this;
        var self = _this;
        self._width = 230;
        self._height = 140;
        self._filterButtonInfo = filterButtonInfo;
        self._rowFilter = self._filterButtonInfo.rowFilter;
        self._dialogType = dialogType;
        self._defaultOption = self._getTop10DefaultValue();
        self._initDom();
        return _this;
    }
    _Top10Dialog.prototype._getTop10DefaultValue = function () {
        var defaultValue = { rank: 0, item: 10 };
        var self = this, condition = self._rowFilter._filterItemMap[self._filterButtonInfo.col];
        if (condition && condition.length > 0 && condition[0].conType() === 8 ) {
            var rank = condition[0].type(), item = condition[0].expected();
            defaultValue = { rank: rank, item: item };
        }
        return defaultValue;
    };
    _Top10Dialog.prototype._render = function () {
        var html = this._createDialogHtml();
        this._getContainer().html(html);
        this.setStyle();
        this._bindEvent();
    };
    _Top10Dialog.prototype._formatInput = function (ele) {
        if (ele.value.length === 1) {
            ele.value = ele.value.replace(/[^1-9]/g, '');
        }
        else {
            ele.value = ele.value.replace(/\D/g, '');
        }
    };
    _Top10Dialog.prototype._bindEvent = function () {
        var self = this;
        Core_1.GC$(TOP10_ITEM).bind('keyup', function () {
            Core_1.GC$(this).removeClass(GC_FILTER_TOP10_RANK_ILLEGAL);
            self._formatInput(this);
        }).bind('paste', function () {
            Core_1.GC$(this).removeClass(GC_FILTER_TOP10_RANK_ILLEGAL);
            self._formatInput(this);
        });
    };
    _Top10Dialog.prototype._confirmTriggerHandle = function () {
        var self = this, rank = parseInt(Core_1.GC$('#top10-rank').val(), 10), item = parseInt(Core_1.GC$(TOP10_ITEM).val(), 10);
        var condition = new ConditionalFormatting_1.Condition(8 );
        var rs = false;
        if (item) {
            rs = true;
            condition.type(rank);
            condition.expected(item);
            self._doFilter(condition);
        }
        else {
            Core_1.GC$(TOP10_ITEM).addClass(GC_FILTER_TOP10_RANK_ILLEGAL).focus();
        }
        return rs;
    };
    _Top10Dialog.prototype._createDialogHtml = function () {
        var html = '', selectHtml = '';
        if (this._defaultOption.rank === 1) {
            selectHtml = '<select id="top10-rank"><option value="0">' + getSR().top + '</option><option value="1" selected = "selected">' + getSR().bottom + '</option></select>';
        }
        else {
            selectHtml = '<select id="top10-rank"><option value="0" selected="selected">' + getSR().top + '</option><option value="1">' + getSR().bottom + '</option></select>';
        }
        html += '<div class="gc-popup ui-widget ' + FILTER_DIALOG_CLASS + '">' +
            '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="gc-filter-dialog-title">' + getSR().Top10Filter + '</span><span id="' + this._closeId + '" class="gc-filter-dialog-close">\xd7</span></div>' +
            '<div id="top10-desc"><div class="top10-show-text">' + getSR().Show + '</div><div class="ui-dialog-hr"></div></div>' +
            '<div class="top10-wrap">' + selectHtml +
            '<input id="top10-item" class="gc-filter-top10-rank" type="text"  value="' + this._defaultOption.item + '" />' +
            '</div>' +
            '<div class="top10-footer top10-wrap"><input type="button" id="' + this._okId + '" value="' + getSR().OK + '"><input id="' + this._cancelId + '" type="button" class="gc-filter-dialog-close" value="' + getSR().Cancel + '"/></div>' +
            '</div>';
        return html;
    };
    _Top10Dialog.prototype.setStyle = function () {
        Core_1.GC$('.gc-popup', this._container[0]).css([BACKCOLOR, WIDTH, HEIGHT], [DIALOG_BACKCOLOR, this._width, this._height]);
        Core_1.GC$('.ui-dialog-titlebar', this._container[0]).css({
            height: '34px',
            background: 'white',
            fontSize: '12px',
            fontWeight: 'normal',
            color: '#222',
            border: 'none',
            borderRadius: '0'
        });
        Core_1.GC$('.gc-filter-dialog-title', this._container[0]).css({
            float: 'left',
            height: '34px',
            lineHeight: '34px',
            display: INLINE_BLOCK,
            marginLeft: '15px'
        });
        Core_1.GC$('.top10-show-text', this._container[0]).css({ float: 'left' });
        Core_1.GC$('.ui-dialog-hr', this._container[0]).css({
            position: 'absolute',
            left: '24px',
            right: '0',
            margin: '0 5px',
            height: '12px',
            borderBottom: ONE_PX_SOLID_E0,
            borderWidth: 'thin'
        });
        Core_1.GC$('#top10-desc', this._container[0]).css({
            height: '24px',
            lineHeight: '24px',
            marginLeft: '15px',
            position: RELATIVE,
            fontSize: '10px'
        });
        Core_1.GC$('#' + this._closeId, this._container[0]).css({
            float: 'right',
            fontSize: '18px',
            width: '36px',
            height: '34px',
            lineHeight: '34px',
            textAlign: 'center'
        });
        Core_1.GC$('#top10-rank', this._container[0]).css({
            width: '120px',
            marginRight: '20px',
            height: '21px',
            textIndent: '5px',
            fontSize: 'inherit',
            padding: '0',
            marginBottom: 0
        });
        Core_1.GC$(TOP10_ITEM, this._container[0]).css({
            width: '60px',
            textIndent: '5px',
            padding: 0,
            height: '21px',
            margin: 0,
            fontSize: 'inherit',
            display: INLINE_BLOCK
        });
        Core_1.GC$('.top10-wrap', this._container[0]).css({
            padding: '0px 12px',
            textAlign: 'right',
            color: '#9B9C9C',
            fontSize: '13px'
        });
        Core_1.GC$('.top10-footer', this._container[0]).css({ padding: '20px 12px 12px' });
        Core_1.GC$('#' + this._okId + ', #' + this._cancelId).css({
            width: '75px',
            height: '23px',
            lineHeight: '21px',
            fontSize: '12px',
            backgroundColor: '#E1E1E1',
            border: ONE_PX_SOLID_C2,
            padding: 0,
            display: INLINE_BLOCK
        });
        Core_1.GC$('#' + this._okId, this._container[0]).css({ marginRight: '12px' });
    };
    return _Top10Dialog;
}(_FilterModalDialogBase));
var _ColorModalDialog = (function (_super) {
    __extends(_ColorModalDialog, _super);
    function _ColorModalDialog(host, sheet, filterButtonInfo, dialogType, allColors, isCellColor, selectedColor) {
        var _this = _super.call(this, host, sheet, filterButtonInfo, dialogType) || this;
        var self = _this;
        self._width = 416;
        self._height = 100;
        self._colorItemWidth = 36;
        self._colorItemHeight = 24;
        self._colorItemMaxRow = 8;
        self._colorItemCountInRow = 7;
        self._dialogType = dialogType;
        self._allColors = allColors;
        self._colorType = isCellColor ? 0 : 1 ;
        if (typeof selectedColor === KEYWORD_OBJECT || !selectedColor) {
            self._selectedColor = selectedColor;
        }
        else {
            self._selectedColor = formatColor(selectedColor);
        }
        self._colorDialogSpread = keyword_null;
        self._colorDialogSheet = keyword_null;
        self._initDom();
        return _this;
    }
    _ColorModalDialog.prototype._render = function () {
        var wrap = this._createColorDialog();
        this._container.append(wrap);
        var spreadWrap = Core_1.GC$('#color-spread-wrap', this._container[0])[0];
        this._hoverColor = this._getHoverColor();
        var isNeedScrollbar = this._setWrapSize(spreadWrap);
        this._initColorSpread(spreadWrap, isNeedScrollbar);
        this._bindEvent(this._colorDialogSpread, this._colorDialogSheet);
    };
    _ColorModalDialog.prototype._getHoverColor = function () {
        return MENU_COLOR_HOVER;
    };
    _ColorModalDialog.prototype._setWrapSize = function (wrap) {
        var count = this._allColors.colorNumber, height, width, isNeedScrollbar = false;
        width = this._colorItemWidth * this._colorItemCountInRow + 4;
        if (Math.ceil(count / this._colorItemCountInRow) > this._colorItemMaxRow) {
            height = this._colorItemHeight * this._colorItemCountInRow;
            isNeedScrollbar = true;
            width += 20;
        }
        else {
            height = this._colorItemHeight * Math.ceil(count / this._colorItemCountInRow);
        }
        Core_1.GC$(wrap).height(height);
        Core_1.GC$(wrap).width(width);
        return isNeedScrollbar;
    };
    _ColorModalDialog.prototype._setSelfSheetDefualt = function (spread, sheet, isNeedScrollbar) {
        spread.suspendPaint();
        var spreadOption = spread.options, sheetOptions = sheet.options;
        spreadOption.showHorizontalScrollbar = false;
        spreadOption.allowContextMenu = false;
        spreadOption.showVerticalScrollbar = isNeedScrollbar;
        spreadOption.scrollbarMaxAlign = true;
        spreadOption.tabStripVisible = false;
        spreadOption.allowUserResize = false;
        spreadOption.allowUserDragDrop = false;
        spreadOption.allowUserDragFill = false;
        spreadOption.allowUserZoom = false;
        spreadOption.grayAreaBackColor = '#fff';
        sheetOptions.colHeaderVisible = false;
        sheetOptions.rowHeaderVisible = false;
        sheetOptions.selectionBackColor = TRANSPARENT_COLOR;
        sheetOptions.selectionBorderColor = TRANSPARENT_COLOR;
        sheetOptions.gridline = { showVerticalGridline: false, showHorizontalGridline: false };

        sheetOptions.isProtected = true;

        sheet.setColumnCount(this._colorItemCountInRow + 2);
        var count = this._allColors.colorNumber;
        sheet.setRowCount(Math.ceil(count / this._colorItemCountInRow) + 1);
        sheet.defaults.rowHeight = 21;
        sheet.defaults.colWidth = 36;
        sheet.setColumnWidth(0, 2);
        sheet.setColumnWidth(this._colorItemCountInRow + 1, 2);
        sheet.setRowHeight(0, 2);
        spread.resumePaint();
    };
    _ColorModalDialog.prototype._comfortableFill = function (spread, sheet) {
        sheet.suspendPaint();
        var width = (this._colorItemCountInRow - this._allColors.colorNumber) * this._colorItemWidth / 2;
        sheet.setColumnWidth(0, width);
        var row, col, pos;
        for (var color in this._allColors.data) {
            if (!this._allColors.data.hasOwnProperty(color)) {
                continue;
            }
            pos = this._getNextCellPos(row, col);
            row = pos.row;
            col = pos.col;
            this._setCellStyle(row, col, color, sheet);
        }
        sheet.resumePaint();
    };
    _ColorModalDialog.prototype._setCellStyle = function (row, col, color, sheet) {
        var style_tem = new CellTypes.Button();
        style_tem.buttonBackColor(color[0] === '{' ? JSON.parse(color) : color);
        style_tem.marginLeft(3);
        style_tem.marginTop(3);
        style_tem.marginRight(3);
        style_tem.marginBottom(3);
        sheet.setCellType(row, col, style_tem, 3);
        if (color === this._selectedColor) {
            this._setCellBackColor(sheet, row, col, this._hoverColor);
        }
    };
    _ColorModalDialog.prototype._getNextCellPos = function (row, col) {
        if (row === keyword_undefined && col === keyword_undefined) {
            row = 1;
            col = 1;
        }
        else if (col < this._colorItemCountInRow) {
            col = col + 1;
        }
        else {
            row = row + 1;
            col = 1;
        }
        return { row: row, col: col };
    };
    _ColorModalDialog.prototype._fillAllColors = function (spread, sheet) {
        sheet.suspendPaint();
        var row = keyword_undefined, col = keyword_undefined, pos;
        for (var color in this._allColors.data) {
            if (!this._allColors.data.hasOwnProperty(color)) {
                continue;
            }
            pos = this._getNextCellPos(row, col);
            row = pos.row;
            col = pos.col;
            this._setCellStyle(row, col, color, sheet);
        }
        sheet.resumePaint();
    };
    _ColorModalDialog.prototype._setCellBackColor = function (sheet, row, col, hoverColor) {
        sheet.suspendPaint();
        if (this._chooseCellInfo) {
            var clearStyle = sheet.getStyle(this._chooseCellInfo.row, this._chooseCellInfo.col, 3 );
            clearStyle.backColor = '#ffffff';
            clearStyle.borderLeft = new Core_1.LineBorder(MENU_COLOR_BORDER_COLOR, Core_1.LineStyle.empty);
            clearStyle.borderTop = new Core_1.LineBorder(MENU_COLOR_BORDER_COLOR, Core_1.LineStyle.empty);
            clearStyle.borderRight = new Core_1.LineBorder(MENU_COLOR_BORDER_COLOR, Core_1.LineStyle.empty);
            clearStyle.borderBottom = new Core_1.LineBorder(MENU_COLOR_BORDER_COLOR, Core_1.LineStyle.empty);
            sheet.setStyle(this._chooseCellInfo.row, this._chooseCellInfo.col, clearStyle, 3 );
        }
        this._chooseCellInfo = {
            row: row,
            col: col
        };
        var style = sheet.getStyle(row, col, 3 );
        style.backColor = hoverColor;
        style.borderLeft = new Core_1.LineBorder(MENU_COLOR_BORDER_COLOR, Core_1.LineStyle.thin);
        style.borderTop = new Core_1.LineBorder(MENU_COLOR_BORDER_COLOR, Core_1.LineStyle.thin);
        style.borderRight = new Core_1.LineBorder(MENU_COLOR_BORDER_COLOR, Core_1.LineStyle.thin);
        style.borderBottom = new Core_1.LineBorder(MENU_COLOR_BORDER_COLOR, Core_1.LineStyle.thin);
        sheet.setStyle(row, col, style, 3 );
        sheet.resumePaint();
    };
    _ColorModalDialog.prototype._initColorSpread = function (wrap, isNeedScrollbar) {
        var colorDialogSpread = new Core_1.Workbook(wrap);
        colorDialogSpread._isNested = true;
        var colorDialogSheet = colorDialogSpread.getActiveSheet();
        this._colorDialogSpread = colorDialogSpread;
        this._colorDialogSheet = colorDialogSheet;
        this._setSelfSheetDefualt(colorDialogSpread, colorDialogSheet, isNeedScrollbar);
        if (this._allColors.colorNumber < this._colorItemCountInRow) {
            this._comfortableFill(colorDialogSpread, colorDialogSheet);
        }
        else {
            this._fillAllColors(colorDialogSpread, colorDialogSheet);
        }
    };
    _ColorModalDialog.prototype._getFirstColor = function () {
        var color = keyword_undefined;
        for (var item in this._allColors.data) {
            if (this._allColors.data.hasOwnProperty(item)) {
                color = item;
                break;
            }
        }
        return color[0] === '{' ? JSON.parse(color) : color;
    };
    _ColorModalDialog.prototype._createColorDialog = function () {
        var wrap = Core_1.GC$(createElement('div')).addClass('gc-popup ui-widget ' + COLOR_DIALOG_CLASS + ' ' + FILTER_DIALOG_CLASS + ' ' + NO_USER_SELECT_CLASS);
        wrap.css({ backgroundColor: '#f0f0f0' });


        var title = this._createColorDialogTitle();
        wrap.append(title);
        var head = this._createColorDialogHeader();
        wrap.append(head);
        var contentWrap = Core_1.GC$(createElement('div')).css([PADDING], ['0 12px']);
        var noFill = this._createNoFill();
        if (noFill !== keyword_undefined) {
            contentWrap.append(noFill);
        }
        var allColorWrap = this._createAllColors();
        contentWrap.append(allColorWrap);
        var selected = this._createSelected();
        contentWrap.append(selected);
        wrap.append(contentWrap);
        wrap.append(this._createColorCustomFooter());
        return wrap;
    };
    _ColorModalDialog.prototype._createColorDialogTitle = function () {
        var div = Core_1.GC$(createElement('div')), titleSpan = Core_1.GC$(createElement('span')), closeSpan = Core_1.GC$(createElement('span')).attr('id', this._closeId);
        div.css([WIDTH, HEIGHT, BACKCOLOR, PADDING, BOX_SIZING], ['100%', '34px', '#fff', '0 0 0 12px', BORDER_BOX]);
        titleSpan.css(['float', HEIGHT, 'lineHeight', DISPLAY], [LEFT, '34px', '34px', INLINE_BLOCK]).html(getSR().ColorTitle);
        closeSpan.css(['float', HEIGHT, 'lineHeight', DISPLAY, FONT_SIZE, WIDTH, 'textAlign'], ['right', '34px', '34px', INLINE_BLOCK, '18px', '36px', 'center']).html('\xd7').addClass(GC_FILTER_DIALOG_CLOSE);
        div.append(titleSpan);
        div.append(closeSpan);
        return div;
    };
    _ColorModalDialog.prototype._createColorDialogHeader = function () {
        var div = Core_1.GC$(createElement('div')), describe = Core_1.GC$(createElement('div')), text;
        if (this._colorType === 0 && this._dialogType === SUB_MENU_COLOR_SORT) {
            text = getSR().SortCell;
        }
        else if (this._colorType === 0 && this._dialogType === SUB_MENU_COLOR_FILTER) {
            text = getSR().FilterCell;
        }
        else if (this._colorType === 1 && this._dialogType === SUB_MENU_COLOR_SORT) {
            text = getSR().SortFont;
        }
        else if (this._colorType === 1 && this._dialogType === SUB_MENU_COLOR_FILTER) {
            text = getSR().FilterFont;
        }
        div.css(PADDING, '0 12px');
        describe.css([HEIGHT, 'lineHeight'], ['24px', '24px']).html(text);
        div.append(describe);
        return div;
    };
    _ColorModalDialog.prototype._createNoFill = function () {
        var rs = keyword_undefined;
        if (this._allColors[AUTO_MATIC] !== keyword_undefined) {
            var isNoFillSelected = (this._selectedColor === '');
            var noFillText = this._colorType === 1 ? getSR().Automatic : getSR().NoFill;
            var div = Core_1.GC$(createElement('div')).html(noFillText);
            div.attr('id', 'gc-color-dialog-noFill');
            if (isNoFillSelected) {
                div.attr(DATA_CHECKED, 'checked');
                div.css([BACKCOLOR, PADDING, BORDER, 'textAlign', 'margin'], ['rgb(134,191,160)', '0 12px', THIN_SOLID_GRAY, 'center', '5px 0']);
            }
            else {
                div.css([BACKCOLOR, PADDING, BORDER, 'textAlign', 'margin'], [TRANSPARENT_COLOR, '0 12px', THIN_SOLID_GRAY, 'center', '5px 0']);
            }
            rs = div;
        }
        return rs;
    };
    _ColorModalDialog.prototype._createAllColors = function () {
        var div = Core_1.GC$(createElement('div')).attr('id', 'color-spread-wrap');
        div.css([BACKCOLOR, PADDING, BORDER, WIDTH, 'box-sizing'], ['#fff', '6px', '1px solid rgb(160,160,160)', '288px', CONTENT_BOX]);
        return div;
    };
    _ColorModalDialog.prototype._createSelected = function () {
        var self = this, div = Core_1.GC$(createElement('div')), label = Core_1.GC$(createElement('div')).html(getSR().Selected), colorFillCanvas = createElement('canvas'), colorFill = Core_1.GC$(colorFillCanvas).attr('id', 'gc-color-dialog-selected');
        div.css([POSITION, PADDING, BOX_SIZING, MARGIN, HEIGHT], [RELATIVE, '0 12px', CONTENT_BOX, '12px 0', '16px']);
        label.css([FLOAT, WIDTH, 'text-align'], [LEFT, '60px', 'center']);
        var backgroundColor = (self._colorType === 1 ) ? AUTOMATIC_COLOR : NO_FILL_COLOR;

        if (self._selectedColor === keyword_undefined) {
            self._selectedColor = self._getFirstColor();
        }
        if (self._selectedColor !== '') {
            backgroundColor = self._selectedColor;
        }
        colorFill.css([POSITION, LEFT, BORDER], ['absolute', '70px', THIN_SOLID_GRAY]);
        colorFillCanvas.width = SELECTED_CANVAS_WIDTH;
        colorFillCanvas.height = SELECTED_CANVAS_HEIGHT;
        self._setSelectedColor(colorFill, backgroundColor);
        div.append(label);
        div.append(colorFill);
        return div;
    };
    _ColorModalDialog.prototype._setSelectedColor = function (colorFill, backgroundColor) {
        var color = typeof backgroundColor === KEYWORD_OBJECT ? JSON.stringify(backgroundColor) : backgroundColor;
        colorFill.text(color);
        var ctx = colorFill[0].getContext('2d');
        var fillFunc = function () { ctx.fillRect(0, 0, SELECTED_CANVAS_WIDTH, SELECTED_CANVAS_HEIGHT); };
        Core_1._StyleHelper.setFillStyle(ctx, color[0] === '{' ? JSON.parse(color) : color, 0, 0, SELECTED_CANVAS_WIDTH, SELECTED_CANVAS_HEIGHT, fillFunc);
    };
    _ColorModalDialog.prototype._confirmTriggerHandle = function () {
        var color, $noFill = Core_1.GC$(GC_COLOR_DIALOG_NOFILL);

        if ($noFill.length === 1 && $noFill.attr(DATA_CHECKED) === 'checked') {
            color = '';
        }
        else {
            color = this._selectedColor;
        }
        this._doConfirmAction(color);
        return true;
    };
    _ColorModalDialog.prototype._doConfirmAction = function (color) {
        var isBackColor = (this._colorType === 0);
        if (this._dialogType === SUB_MENU_COLOR_SORT) {
            this._sortFilterByColor(color, isBackColor);
        }
        else if (this._dialogType === SUB_MENU_COLOR_FILTER) {
            this._filterByColor(color, isBackColor);
        }
    };
    _ColorModalDialog.prototype._sortFilterByColor = function (color, isBackColor, isAsc) {
        var self = this, filterButtonInfo = self._filterButtonInfo, rowFilter = filterButtonInfo.rowFilter, sheet = self._sheet;
        if (!rowFilter || !sheet || !sheet._canDoSort()) {
            return;
        }


        isAsc = (isAsc === keyword_undefined) ? false : isAsc;
        var colIndex = filterButtonInfo.col, args = {
            sheet: sheet,
            sheetName: sheet._name,
            col: colIndex,
            ascending: isAsc,
            color: color,
            isBackColor: isBackColor,
            cancel: false
        };
        sheet._trigger(Core_1.Events.RangeSorting, args);
        if (args.cancel === false) {
            sheet.suspendPaint();
            rowFilter.sortColumnByColor(colIndex, isAsc, color, isBackColor);
            sheet.resumePaint();
            sheet._trigger(Core_1.Events.RangeSorted, args);
        }
    };
    _ColorModalDialog.prototype._filterByColor = function (color, isBackColor) {
        var condition = new ConditionalFormatting_1.Condition(3 );
        var compareType = isBackColor ? 0 : 1 ;
        condition.compareType(compareType);
        condition.expected(color);
        this._doFilter(condition);
    };
    _ColorModalDialog.prototype._bindEvent = function (spread, sheet) {
        var self = this;
        Core_1.GC$(GC_COLOR_DIALOG_NOFILL).bind(CLICK, function () {
            var backColor = (self._colorType === 1) ? AUTOMATIC_COLOR : NO_FILL_COLOR;
            self._setSelectedColor(Core_1.GC$(GC_COLOR_DIALOG_SELECTED), backColor);
            Core_1.GC$(this).css(BACKCOLOR, 'rgb(134,191,160)');
            Core_1.GC$(this).attr(DATA_CHECKED, 'checked');
        });
        spread.bind(Core_1.Events.ButtonClicked, function (e, args) {
            var row = args.row, col = args.col;
            var cellType = sheet.getCellType(row, col);
            self._setCellBackColor(sheet, row, col, self._hoverColor);
            var color = cellType.buttonBackColor();
            self._setSelectedColor(Core_1.GC$(GC_COLOR_DIALOG_SELECTED), color);
            Core_1.GC$(GC_COLOR_DIALOG_NOFILL).css(BACKCOLOR, TRANSPARENT_COLOR).attr(DATA_CHECKED, '');
            self._selectedColor = color;
        });

        spread.bind(Core_1.Events.TouchToolStripOpening, function (sender, args) {
            args.handled = true;
        });
    };
    _ColorModalDialog.prototype._createColorCustomFooter = function () {
        var div = Core_1.GC$(createElement('div')), okBtn = Core_1.GC$(createElement('input')).attr({ type: 'button', value: getSR().OK, id: this._okId }), cancelBtn = Core_1.GC$(createElement('input')).attr({
            type: 'button',
            value: getSR().Cancel,
            id: this._cancelId
        }).addClass(GC_FILTER_DIALOG_CLOSE);
        var btnStlye = {
            width: '75px',
            height: '23px',
            lineHeight: '21px',
            fontSize: '12px',
            backgroundColor: '#E1E1E1',
            border: ONE_PX_SOLID_C2,
            padding: '0',
            display: INLINE_BLOCK,
            margin: '0'
        };
        div.addClass('color-custom-footer').css({ textAlign: 'right', padding: '10px 12px 12px' });
        okBtn.css(btnStlye).css({ marginRight: '12px' });
        cancelBtn.css(btnStlye);
        div.append(okBtn[0]);
        div.append(cancelBtn[0]);
        return div;
    };
    return _ColorModalDialog;
}(_FilterModalDialogBase));
var _CustModalDialog = (function (_super) {
    __extends(_CustModalDialog, _super);
    function _CustModalDialog(host, sheet, filterButtonInfo, dialogType, allValues, isCustom, conditionType, operatorType, selectType) {
        var _this = _super.call(this, host, sheet, filterButtonInfo, dialogType) || this;
        var self = _this;
        self._width = 840;
        self._height = 260;
        self._filterButtonInfo = filterButtonInfo;
        self._rowFilter = self._filterButtonInfo.rowFilter;
        self._dialogType = dialogType;
        self._isCustom = isCustom;
        self._allValues = allValues;
        self._conditionType = conditionType;
        self._selectType = selectType;
        self._operatorType = operatorType;
        self._setDefaultOption(isCustom);
        self._initDom();
        return _this;
    }
    _CustModalDialog.prototype._render = function () {
        var self = this, html = self._createCustomDialog(this._defaultOption);
        self._container.append(html);
        Core_1.GC$('.gc-popup', this._container[0]).css([BACKCOLOR, WIDTH, HEIGHT, FONT_SIZE], [DIALOG_BACKCOLOR, this._width, this._height, '12px']);
        self._bindEvent();
    };
    _CustModalDialog.prototype._bindEvent = function () {
        var self = this;
        Core_1.GC$('.filter-custom-select-input').bind('change', function () {
            var option = Core_1.GC$(this).find('option')[this.selectedIndex];
            Core_1.GC$(this).parent().find('input').val(Core_1.GC$(option).text()).attr('gc-data', Core_1.GC$(this).val());
        });
        Core_1.GC$('.filter-custom-select-first-option').bind('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            Core_1.GC$(this).parent().trigger('change');
        });
        Core_1.GC$('#first-condition-expected input, #sec-condition-expected input').bind('change', function () {
            var val = Core_1.GC$(this).val();
            var index = -1;
            self._allValues.forEach(function (elem, item) {
                if (elem.text === val) {
                    index = item;
                }
            });

            if (val === '') {
                Core_1.GC$(this).parent().find('select')[0].value = '';
            }
            Core_1.GC$(this).attr('gc-data', index);
        });
    };
    _CustModalDialog.prototype._getExpected = function ($el, conType, compareType) {
        var text = $el.val(), value;
        if (compareType === 0 && conType === 2) {
            return text;
        }
        var index = $el.attr('gc-data');
        var data = this._allValues[index];
        if (data) {
            value = data.value;
        }
        else if (conType === 11 && (!isNaN(Number(text)))) {
            value = parseFloat(text);
        }
        else {
            var formatObj = {};
            var format = new GeneralFormatter();
            format.getPreferredDisplayFormatter(text, formatObj);
            value = formatObj.value;
        }
        return value;
    };
    _CustModalDialog.prototype._confirmTriggerHandle = function () {
        var self = this, logic = parseInt(Core_1.GC$('#filter-logical-wrap input:checked').val(), 10);
        var condition = self._createCustomCondition(logic);
        var isSuccess = false;
        self._doFilter(condition);
        if (condition) {
            isSuccess = true;
        }
        else {
            Core_1.GC$('#first-condition-type').focus();
        }
        return isSuccess;
    };
    _CustModalDialog.prototype._createCondition = function ($TypeEl, $valueEl) {
        var conType, compareType, expected, typeString = $TypeEl.val().trim();
        if (typeString) {
            compareType = parseInt(typeString.split('-')[0], 10);
            conType = parseInt(typeString.split('-')[1], 10);
        }
        else {
            return keyword_null;
        }
        expected = this._getExpected($valueEl, conType, compareType);
        var condition = new ConditionalFormatting_1.Condition(conType);
        if (this._isBooleanExpected(expected)) {
            condition.conType(2 );
        }
        condition.compareType(compareType);
        if (getType(expected) === 'string') {
            expected = unescapeHtml(expected);
        }
        condition.expected(expected);
        condition.treatNullValueAsZero(false);
        condition.ignoreCase(true);
        if (getType(expected) === 'string' && expected.indexOf('*') === -1 && expected.indexOf('?') === -1) {
            condition.useWildCards(false);
        }
        else if (getType(expected) === 'string' && (expected.indexOf('*') !== -1 || expected.indexOf('?') !== -1)) {
            condition.conType(2 );
            condition.useWildCards(true);
        }
        return condition;
    };

    _CustModalDialog.prototype._createCustomCondition = function (logic) {
        var condition1 = this._createCondition(Core_1.GC$('#first-condition-type'), Core_1.GC$('#first-condition-expected input'));
        var condition2 = this._createCondition(Core_1.GC$('#sec-condition-type'), Core_1.GC$('#sec-condition-expected input'));

        if (!condition1) {
            return null;
        }
        var condition;
        if (!condition2) {
            condition = condition1;
        }
        else {
            condition = new ConditionalFormatting_1.Condition(0 );
            condition.compareType(logic);
            condition.item1(condition1);
            condition.item2(condition2);
        }
        return condition;
    };
    _CustModalDialog.prototype._getFilterTitle = function () {
        var filterButtonInfo = this._filterButtonInfo, rowFilter = filterButtonInfo.rowFilter, filterTitle = this._sheet.getText(filterButtonInfo.row, filterButtonInfo.col);
        if (rowFilter && rowFilter.range.row <= 0) {
            filterTitle = this._sheet.getText(filterButtonInfo.row, filterButtonInfo.col, filterButtonInfo.sheetArea);
        }
        return filterTitle;
    };

    _CustModalDialog.prototype._createCustomDialog = function (defaultOption) {
        var filterTitle = this._getFilterTitle();
        var wrap = Core_1.GC$(createElement('div')).addClass('gc-popup ui-widget ' + FILTER_DIALOG_CLASS);
        wrap.css({ backgroundColor: '#f0f0f0' });
        wrap.append(this._createCustomTitle());
        wrap.append(this._createContentHead(filterTitle));

        var condition1 = this._createConditionListUI('first-condition-type', 'first-condition-expected', (defaultOption.compareType1 || 0), defaultOption.expected1, defaultOption.conType1, true );
        wrap.append(condition1);
        wrap.append(this._createCustomLogicEle(defaultOption.logic));
        var condition2 = this._createConditionListUI('sec-condition-type', 'sec-condition-expected', defaultOption.compareType2, defaultOption.expected2, defaultOption.conType2);
        wrap.append(condition2);
        condition2.css([POSITION, PADDING], [RELATIVE, '0 0 12px 35px']);
        var explain = Core_1.GC$(createElement('div')), explainText1 = Core_1.GC$(createElement('p')).html(getSR().Explain1).css({ margin: '0', lineHeight: 'initial', backgroundColor: TRANSPARENT_COLOR }), explainText2 = Core_1.GC$(createElement('p')).html(getSR().Explain2).css({ margin: '0', lineHeight: 'initial', backgroundColor: TRANSPARENT_COLOR });
        explain.append(explainText1);
        explain.append(explainText2);
        explain.css({ fontSize: '10px', textIndent: '12px' });
        wrap.append(explain);
        wrap.append(this._createCustomFooter());
        return wrap;
    };
    _CustModalDialog.prototype._createConditionListUI = function (selectId, valueId, selectedOperator, selectedValue, selectedType, needDefault) {
        var conditionUI = Core_1.GC$(createElement('div'));
        conditionUI.css([POSITION, PADDING], [RELATIVE, '0 0 12px 35px']);
        conditionUI.append(this._createCustomSelectElement(selectedOperator, selectedType, needDefault).attr('id', selectId));
        conditionUI.append(this._createCustomValueChooseElement(this._allValues, selectedValue).attr('id', valueId));
        return conditionUI;
    };
    _CustModalDialog.prototype._createCustomTitle = function () {
        var div = Core_1.GC$(createElement('div')), titleSpan = Core_1.GC$(createElement('span')), closeSpan = Core_1.GC$(createElement('span')).attr('id', this._closeId);
        div.css([WIDTH, HEIGHT, BACKCOLOR, PADDING, BOX_SIZING], ['100%', '34px', '#fff', '0 0 0 12px', BORDER_BOX]);
        titleSpan.css(['float', HEIGHT, 'lineHeight', DISPLAY], [LEFT, '34px', '34px', INLINE_BLOCK]).html(getSR().CustomTitle);
        closeSpan.css(['float', HEIGHT, 'lineHeight', DISPLAY, FONT_SIZE, WIDTH, 'textAlign'], ['right', '34px', '34px', INLINE_BLOCK, '18px', '36px', 'center']).html('\xd7').addClass(GC_FILTER_DIALOG_CLOSE);
        div.append(titleSpan);
        div.append(closeSpan);
        return div;
    };
    _CustModalDialog.prototype._createCustomLogicEle = function (logic) {
        var logicWrap = Core_1.GC$(createElement('div')), andRadio = Core_1.GC$(createElement('input')).attr({
            name: 'filter-logical',
            id: 'filter-dialog-and',
            type: 'radio'
        }).val(1).css([WIDTH, DISPLAY], ['unset', INLINE_BLOCK]), orRadio = Core_1.GC$(createElement('input')).attr({
            name: 'filter-logical',
            id: 'filter-dialog-or',
            type: 'radio'
        }).val(0).css([WIDTH, DISPLAY], ['unset', INLINE_BLOCK]), andLabel = Core_1.GC$(createElement('label')).attr({ for: 'filter-dialog-and' }).html(getSR().And).css([MARGIN_RIGHT, 'font-weight', FONT_SIZE, DISPLAY, 'margin-bottom', PADDING], ['10px', 'inherit', '13px', INLINE_BLOCK, '0', '0']), orLabel = Core_1.GC$(createElement('label')).attr({ for: 'filter-dialog-or' }).html(getSR().Or).css([MARGIN_RIGHT, 'font-weight', FONT_SIZE, DISPLAY, 'margin-bottom', PADDING], ['10px', 'inherit', '13px', INLINE_BLOCK, '0', '0']);
        logicWrap.attr('id', 'filter-logical-wrap');
        logicWrap.css({ padding: '0 0 0 40px', height: '30px' });
        if (logic === 0) {
            orRadio.prop('checked', true);
            andRadio.prop('checked', false);
        }
        else {
            orRadio.prop('checked', false);
            andRadio.prop('checked', true);
        }
        logicWrap.append(andRadio);
        logicWrap.append(andLabel);
        logicWrap.append(orRadio);
        logicWrap.append(orLabel);
        return logicWrap;
    };
    _CustModalDialog.prototype._createContentHead = function (filterTitle) {
        var div = Core_1.GC$(createElement('div')), describe = Core_1.GC$(createElement('div')).html(getSR().ShowRows);
        div.css(PADDING, '0 12px');
        describe.css([HEIGHT, 'lineHeight'], ['24px', '24px']);
        div.append(describe);

        var wrap = Core_1.GC$(createElement('div'));
        var line = Core_1.GC$(createElement('div'));
        var title;
        if (filterTitle) {
            title = Core_1.GC$(createElement('div')).html(escapeHtml(filterTitle));
            title.css([FLOAT, 'maxWidth', 'textOverflow', 'whiteSpace', 'overflow'], [LEFT, '300px', 'ellipsis', 'nowrap', 'hidden']);
            wrap.css({ height: '24px', lineHeight: '24px', marginLeft: '15px', fontSize: '10px' });
            line.css({
                overflow: 'hidden',
                margin: '0 5px',
                height: '12px',
                borderBottom: ONE_PX_SOLID_E0,
                borderWidth: 'thin'
            });
            wrap.append(title);
        }
        else {
            wrap.css({ height: '12px', lineHeight: '2px', marginLeft: '15px', fontSize: '10px' });
            line.css({ margin: '0 5px', height: '2px', borderBottom: ONE_PX_SOLID_E0, borderWidth: 'thin' });
        }
        wrap.append(line);
        div.append(wrap);
        return div;
    };
    _CustModalDialog.prototype._createCustomSelectElement = function (selectedOperator, selectedType, needDefault) {
        var list = [], isMacthed = false;
        if (this._conditionType === 6 || this._conditionType === 5 ) {
            list = DATE_CUSTOM_LIST;
        }
        else if (this._conditionType === 1 ) {
            list = NUMBER_CUSTOM_LIST;
        }
        else {
            list = TEXT_CUSTOM_LIST;
        }
        var select = Core_1.GC$(createElement('select'));
        var selectStyle = {
            height: '25px',
            width: '230px',
            marginBottom: 0,
            marginRight: '12px',
            fontSize: 'inherit',
            padding: 0,
            boxSizing: 'border-box'
        };
        select.css(selectStyle);
        var optionHtml = '<option>&nbsp;</option>', tem, isSelect, isSameConType = false;
        if (selectedOperator === keyword_undefined) {
            optionHtml = '<option selected="selected" >&nbsp;</option>';
        }
        for (var i = 0; i < list.length; i++) {
            tem = list[i].split('-');
            isSelect = false;
            if (tem[2]) {
                isSameConType = false;

                if (selectedType === parseInt(tem[2], 10) || (this._selectType === 6 && parseInt(tem[2], 10) === 5) || parseInt(tem[2], 10) === 11 ) {
                    isSameConType = true;
                }
                if (isSameConType && selectedOperator === parseInt(tem[1], 10)) {
                    isSelect = true;
                }
            }
            if (isSelect) {
                isMacthed = true;
                optionHtml += '<option selected="selected" value="' + tem[1] + '-' + tem[2] + '">' + getSR()[tem[0]] + '</option>';
            }
            else {
                optionHtml += '<option value="' + tem[1] + '-' + tem[2] + '">' + getSR()[tem[0]] + '</option>';
            }
        }
        select[0].innerHTML = optionHtml;
        Core_1.GC$('option', select[0]).css({ height: '20px' });
        if (!isMacthed && needDefault) {
            Core_1.GC$(Core_1.GC$('option', select[0])[1]).attr('selected', 'selected');
        }
        return select;
    };
    _CustModalDialog.prototype._getSelectOptionText = function (value) {
        var text = escapeHtml(value);

        if (text && text.length > 100) {
            text = text.substr(0, 100) + '...';
        }
        return text;
    };
    _CustModalDialog.prototype._createCustomValueChooseElement = function (list, value) {
        var chooseIndex = -1, chooseText = value, DateTimeFormat;
        var wrap = Core_1.GC$(createElement('div')), select = Core_1.GC$(createElement('select')).addClass('filter-custom-select-input'), input = Core_1.GC$(createElement('input')), blank = getSR().Blanks;
        var selectStyle = {
            height: '25px',
            width: '540px',
            margin: 0,
            padding: 0
        };
        wrap.css([POSITION, LEFT, 'top'], ['absolute', '278px', '0']);

        input.css([POSITION, LEFT, TOP, WIDTH, 'textIndent', BORDER, HEIGHT, BOX_SIZING, 'outline', PADDING, MARGIN], ['absolute', '2px', '2px', '518px', '5px', 0, '21px', BORDER_BOX, NONE, 0, 0]);
        select.css(selectStyle);
        var optionHtml = '', isFirst = true;
        for (var i = 0; i < list.length; i++) {
            if (list[i].text === blank && list[i].value === keyword_null) {
                continue;
            }
            var text = this._getSelectOptionText(list[i].text);
            if (getType(list[i].value) === 'date') {
                if (!DateTimeFormat) {
                    DateTimeFormat = CultureManager._getCultureInfo(CultureManager.culture()).DateTimeFormat;
                }
                text = _DateTimeHelper._localeFormat(list[i].value, DateTimeFormat.shortDatePattern);
            }

            if ((list[i].value + '') === (value + '')) {
                chooseIndex = i;
                chooseText = text;
            }


            text = text.replace(/\s/g, '&nbsp;');
            if (isFirst) {
                optionHtml += '<option class="filter-custom-select-first-option" value="' + i + '">' + text + '</option>';
                isFirst = !isFirst;
            }
            else {
                optionHtml += '<option value="' + i + '">' + text + '</option>';
            }
        }
        select[0].innerHTML = optionHtml;
        select[0].selectedIndex = -1;

        if (getType(chooseText) === 'date') {
            if (!DateTimeFormat) {
                DateTimeFormat = CultureManager._getCultureInfo(CultureManager.culture()).DateTimeFormat;
            }
            chooseText = _DateTimeHelper._localeFormat(chooseText, DateTimeFormat.shortDatePattern);
        }
        input.attr('gc-data', chooseIndex).val(chooseText);
        wrap.append(select);
        wrap.append(input);
        return wrap;
    };
    _CustModalDialog.prototype._createCustomFooter = function () {
        var div = Core_1.GC$(createElement('div')), okBtn = Core_1.GC$(createElement('input')).attr({ type: 'button', value: getSR().OK, id: this._okId }), cancelBtn = Core_1.GC$(createElement('input')).attr({
            type: 'button',
            value: getSR().Cancel,
            id: this._cancelId
        }).addClass(GC_FILTER_DIALOG_CLOSE);
        var btnStlye = {
            width: '75px',
            height: '23px',
            lineHeight: '21px',
            fontSize: '12px',
            backgroundColor: '#E1E1E1',
            border: ONE_PX_SOLID_C2,
            padding: 0,
            display: INLINE_BLOCK
        };
        div.addClass('custom-footer').css({ textAlign: 'right', padding: '10px 12px 12px' });
        okBtn.css(btnStlye).css({ marginRight: '12px' });
        cancelBtn.css(btnStlye);
        div.append(okBtn[0]);
        div.append(cancelBtn[0]);
        return div;
    };
    _CustModalDialog.prototype._setDefaultOption = function (isCustom) {
        var self = this, condition = self._rowFilter._filterItemMap[self._filterButtonInfo.col];
        var defaultOption = {
            conType1: 2,
            conType2: keyword_undefined,
            compareType1: 0,
            compareType2: keyword_undefined,
            expected1: keyword_undefined,
            expected2: keyword_undefined,
            logic: 1
        };
        if (condition && condition.length) {
            condition = condition[0];
        }
        else {
            condition = keyword_null;
        }
        self._defaultOption = self._setDefaultChooseData(defaultOption, isCustom, condition);
    };
    _CustModalDialog.prototype._getConditionScope = function (condition, defaultOption) {
        var DateTimeFormat = CultureManager._getCultureInfo(CultureManager.culture()).DateTimeFormat;
        var scope = {}, expectTypeId = condition.expectTypeId();
        if (expectTypeId === 0) {
            scope = condition.getExConditionDateScope(condition.expected());
        }
        else if (expectTypeId === 6 ) {
            var start = new Date(), end = new Date();
            start.setMonth(0, 1);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 59);
            scope = {
                from: start,
                to: end
            };
        }
        else if (expectTypeId === 3 ) {
            defaultOption.conType1 = this._selectType;
            defaultOption.compareType1 = this._operatorType;
            defaultOption.expected1 = keyword_undefined;
            return defaultOption;
        }
        defaultOption.conType1 = 5 ;
        defaultOption.conType2 = 5 ;
        defaultOption.compareType1 = 5 ;
        defaultOption.compareType2 = 2 ;
        defaultOption.expected1 = _DateTimeHelper._localeFormat(scope.from, DateTimeFormat.shortDatePattern);
        defaultOption.expected2 = _DateTimeHelper._localeFormat(scope.to, DateTimeFormat.shortDatePattern);
        return defaultOption;
    };

    _CustModalDialog.prototype._setDefaultChooseData = function (defaultOption, isCustom, condition) {
        var isSameConType = condition && ((condition.conType() === this._conditionType) || (condition.conType() === 11 && (this._conditionType === 1 || this._conditionType === 2)));

        var isSameCompareType = condition && (condition.compareType() === this._operatorType || condition.conType() === 0 );
        if (condition && isCustom === 1 && condition.conType() === 6 && (condition.expectTypeId() === 0 || condition.expectTypeId() === 6 || condition.expectTypeId() === 3 )) {
            return this._getConditionScope(condition, defaultOption);
        }
        var isSameItemType = true;
        if (this._selectType === 1 && condition && condition.conType() === 0) {
            var item1CompareType = condition.item1().compareType(), item2CompareType = condition.item2().compareType();

            if (!(Math.max(item1CompareType, item2CompareType) === 5 && Math.min(item1CompareType, item2CompareType) === 3)) {
                isSameItemType = false;
            }
        }

        if (isCustom === 1 || (isSameConType && isSameCompareType && isSameItemType)) {
            if (condition && condition.conType() === 0 ) {
                this._conditionType = this._selectType;
                defaultOption.conType1 = condition.item1().conType();
                defaultOption.conType2 = condition.item2().conType();
                defaultOption.compareType1 = condition.item1().compareType();
                defaultOption.compareType2 = condition.item2().compareType();
                defaultOption.expected1 = condition.item1().expected();
                defaultOption.expected2 = condition.item2().expected();

                defaultOption.logic = condition.compareType();
            }
            else if (condition && condition.conType() !== 0 && condition.conType() !== 3 ) {
                var compareType = condition.compareType(), conType = condition.conType();


                defaultOption.conType1 = conType;
                defaultOption.expected1 = condition.expected();
                defaultOption.compareType1 = compareType;
            }
        }
        else if (this._conditionType === 0 ) {
            this._conditionType = this._selectType;
            if (this._selectType === 1 ) {
                defaultOption.conType1 = 1;
                defaultOption.conType2 = 1;
                defaultOption.compareType1 = 3;
                defaultOption.compareType2 = 5;
            }
            else if (this._selectType === 5 ) {
                defaultOption.conType1 = 5;
                defaultOption.compareType1 = 5;
                defaultOption.conType2 = 5;
                defaultOption.compareType2 = 3;
            }
        }
        else if (this._conditionType === 1 && this._isBooleanExpectConditon(condition)) {
            defaultOption.conType1 = this._selectType;
            defaultOption.compareType1 = this._operatorType;
            defaultOption.expected1 = condition.expected();
        }
        else {
            defaultOption.conType1 = this._selectType;
            defaultOption.compareType1 = this._operatorType;
            defaultOption.expected1 = keyword_undefined;
        }
        return defaultOption;
    };
    _CustModalDialog.prototype._isBooleanExpected = function (expected) {
        return (expected !== keyword_undefined && expected === 'TRUE' || expected === 'FALSE');
    };
    _CustModalDialog.prototype._isBooleanExpectConditon = function (condition) {
        if (!condition) {
            return false;
        }
        var flag = false, expected = condition.expected();
        if (condition.conType() === 1 && this._isBooleanExpected(expected)) {
            flag = true;
        }
        return flag;
    };
    return _CustModalDialog;
}(_FilterModalDialogBase));
/***/ }),

/***/ './dist/plugins/filter/filter-ns.js':
/*!******************************************!*\
  !*** ./dist/plugins/filter/filter-ns.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var en = __webpack_require__(/*! ./filter.res.en */ './dist/plugins/filter/filter.res.en.js');
exports.SR = {
    en: en
};
/***/ }),

/***/ './dist/plugins/filter/filter-ui.js':
/*!******************************************!*\
  !*** ./dist/plugins/filter/filter-ui.js ***!
  \******************************************/
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
var filter_dialog_1 = __webpack_require__(/*! ./filter-dialog */ './dist/plugins/filter/filter-dialog.js');
var filter_1 = __webpack_require__(/*! ./filter */ './dist/plugins/filter/filter.js');
var filter_button_images_1 = __webpack_require__(/*! ./filter-button-images */ './dist/plugins/filter/filter-button-images.js');
var filter_ns_1 = __webpack_require__(/*! ./filter-ns */ './dist/plugins/filter/filter-ns.js');
var RegexHelper = Common_1.Common._RegexHelper;
var isformatString = Core_1._util._isFormatString;
var escapeHtml = Common_1.Common._StringHelper._escapeHtml;
var numberFormatDateTime = Common_1.Formatter._NumberFormatDateTime;
var createElement = Core_1._util._createElement, util = Core_1._util, util_cancelDefault = util._cancelDefault, arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength;
var keyword_null = null, isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined, parseFloatFunc = parseFloat, inArray = Core_1.GC$.inArray, SORT_ASC_ID = 'gc-sortASC', SORT_DES_ID = 'gc-sortDES', OK_ID = 'gc-filterOK', CANCEL_ID = 'gc-filterCancel', SEARCH_ID = 'gc-filterSearch', CHECK_ALL_ID = 'gc-filterCheckAll', UNCHECK_ALL_ID = 'gc-filterUnCheckAll', ITEM_CONTAINER_CLASS = 'gc-filter-item-container', FILTER_HOVER_CLASS = 'gc-filter-hover', FILTER_BUTTON_CLASS = 'gc-filter-button', FILTER_ITEM_LINK = 'gc-filter-item-link ', FILTER_SORT_CLASS = 'gc-filter-sort', EXTERNAL_HOVER_CLASS = 'ui-state-hover ', FILTER_BUTTON_HOVER_CLASS = 'gc-filter-button-hover ' + EXTERNAL_HOVER_CLASS, FILTER_ITEM_HOVER_CLASS = 'gc-filter-item-hover', EXTERNAL_AND_FILTER_ITEM_HOVER_CLASS = EXTERNAL_HOVER_CLASS + FILTER_ITEM_HOVER_CLASS, FILTER_CLASS = FILTER_HOVER_CLASS + ' form-control well ' + EXTERNAL_AND_FILTER_ITEM_HOVER_CLASS, UI_CORNER_CLASS = ' ui-corner-all ', UI_BUTTON_DISABLED_CLASS = 'ui-button-disabled', UI_STATE_DISABLED_CLASS = ' ui-state-disabled', FILTER_BUTTON_DISABLE_CLASS = 'gc-filter-button-disable', SUB_MENU_COLOR_FILTER = 'gc-sub-color-filter', SUB_MENU_CONTENT_FILTER = 'gc-sub-content-flter', SUB_MENU_COLOR_SORT = 'gc-sub-color-sort', NO_USER_SELECT_CLASS = 'gc-no-user-select', FILTER_CHECK_CLASS = ' gc-filter-check', FILTER_CHECK_OUTER_DIV_CLASS = 'gc-filter-check-outerDiv', FILTER_BUTTON_ACTIVE_CLASS = 'gc-filter-button-active', EVENT_NAME_SPACE = '.ui-filter-dialog', PX = 'px', FONT_SIZE = 'font-size', STRING = 'string', BLANK_LINK = 'javascript:void(0)', MOUSE_OUT = 'mouseout', CLICK = 'click', KEY_DOWN = 'keydown', KEY_UP = 'keyup', SEARCH = 'search', INPUT = 'input', SPAN = 'span', DIV = 'div', BUTTON = 'button', DOM_MOUSE_SCROLL = 'DOMMouseScroll', MOUSE_WHEEL = 'mousewheel', MOUSE_DOWN = 'mousedown', MOUSE_OVER = 'mouseover', MOUSE_UP = 'mouseup', MARGIN = 'margin', MARGIN_LEFT = MARGIN + 'Left', MARGIN_TOP = MARGIN + 'Top', PADDING = 'padding', PADDING_TOP = PADDING + 'Top', DISPLAY = 'display', NONE = 'none', WIDTH = 'width', HEIGHT = 'height', BORDER = 'border', LEFT = 'left', TOP = 'top', BOX_SIZING = 'box-sizing', CONTENT_BOX = 'content-box', BLOCK = 'block';
var getType = Common_1.Common._Types._getType, _fromOADate = Common_1.Common._DateTimeHelper._fromOADate, _isDate = Common_1.Common._DateTimeHelper._isDate;

var SORT_ASC_TR = 'gc-sortASC-tr', SORT_DEC_TR = 'gc-sortDEC-tr', SORT_COLOR_TR = 'gc-sort-color-tr', CLEAR_FILTER_TR = 'clear_filter', COLOR_FILTER_TR = 'gc-color-filter', MAJOR_FILTER_TR = 'gc-major_filter', SEARCH_FILTER_TR = 'gc-search-tr', FILTER_FUNCTION_TR = 'gc-filter-function-tr', keyword_undefined = void 0, AUTO_MATIC = 'automatic', TEXT_FILTER = 'TextFilter', NUMBER_FILTER = 'NumberFilter', DATE_FILTER = 'DateFilter', FILTER_CHOOSE_AREA = 'gc-filter-choose-area', FILTER_BUTTON_TR = 'filter-button-tr', FILTER_DIALOG_CLASS = 'gc-filter-dialog-style', SORT_COLOR_ID = 'gc-sortColor', FILTER_COLOR_ID = 'gc-filter-color', CLEAR_FILTER_ID = 'gc-clearFilter', MAJOR_FILTER_ID = 'gc-majorFilter', RIGHT_ARROW = 'gc-filterDialog-rightArrow', FILTER_DISABLE_ITEM_CLASS = 'gc-filter-disable-item';
var SHOW_DIALOG_DELAY_TIME = 500;


var filterDialogCheckedStatus;
(function (filterDialogCheckedStatus) {
    filterDialogCheckedStatus[filterDialogCheckedStatus['true'] = 1] = 'true';
    filterDialogCheckedStatus[filterDialogCheckedStatus['false'] = 2] = 'false';
    filterDialogCheckedStatus[filterDialogCheckedStatus['undefined'] = 2] = 'undefined';
    filterDialogCheckedStatus[filterDialogCheckedStatus['null'] = 3] = 'null';
})(filterDialogCheckedStatus || (filterDialogCheckedStatus = {}));
var rm = new Common_1.Common.ResourceManager(filter_ns_1.SR);
var getSR = rm.getResource.bind(rm);


var _FilterButtonInfo = (function () {
    function _FilterButtonInfo(rowFilter, row, col, sheetArea, x, y, width, height) {
        var self = this;
        self.rowFilter = rowFilter;
        self.row = row;
        self.col = col;
        self.sheetArea = sheetArea;
        self.x = x;
        self.y = y;
        self.width = width;
        self.height = height;
    }
    _FilterButtonInfo.prototype._getState = function () {
        var self = this, filter = self.rowFilter, col = self.col, state = filter.getSortState(col);
        if (!filter) {
            return 0 ;
        }
        return filter.isFiltered(col) ? [3, 4, 5][state]
            : state;
    };
    return _FilterButtonInfo;
}());
exports._FilterButtonInfo = _FilterButtonInfo;


function addCssClass(element, className) {
    Core_1.GC$(element).addClass(className);
}
function formatColor(color, currentTheme) {
    if (typeof color === 'object') {
        return JSON.stringify(color);
    }
    color = currentTheme.getColor(color);
    return Common_1.Common._ColorHelper._toString(Common_1.Common._ColorHelper._fromString(color));
}
function allCheckValueSort(a, b) {
    var dataTypePriority = { date: 0, number: 1, string: 2, boolean: 3, blank: 4 };
    var aValue = a.value, bValue = b.value, aValueType = a.type, bValueType = b.type;
    if (aValueType !== bValueType) {
        if (dataTypePriority[aValueType] < dataTypePriority[bValueType]) {
            return -1;
        }
        return 1;
    }

    if (aValueType === 'date' && bValueType === 'date') {
        var aYear = aValue.getFullYear(), bYear = bValue.getFullYear();
        if (aYear < bYear) {
            return 1;
        }
        else if (aYear > bYear) {
            return -1;
        }
    }
    if (aValue > bValue) {
        return 1;
    }
    return aValue < bValue ? -1 : 0;
}
function fillColorList(color, colorList, theme, row, colorCahce) {
    if (color) {
        var tempColor = void 0;
        if (typeof color === 'string') {
            tempColor = colorCahce[color];
            if (tempColor === keyword_undefined) {
                tempColor = colorCahce[color] = formatColor(color, theme);
            }
        }
        else {
            tempColor = JSON.stringify(color);
        }
        if (colorList.data[tempColor] === keyword_undefined) {
            colorList.colorNumber++;
        }
        colorList.data[tempColor] = row;
    }
    else {
        colorList[AUTO_MATIC] = AUTO_MATIC;
    }
}
function removeCssClass(element, className) {
    Core_1.GC$(element).removeClass(className);
}
function applyNewSize($selector, width, height) {
    $selector.css([WIDTH, HEIGHT], [width + PX, height + PX]);
}
function initElementProperty(element) {
    Core_1.GC$(element).css([BORDER, MARGIN, PADDING, 'outline'], [0, 0, 0, NONE]);
}
function concatWithEmptyArray(arr) {
    return arr.concat([]);
}
function getValueTypeForFilterDialog(value, formatter) {
    if (isNullOrUndefined(value) || value === '' || (typeof value === 'number' && isNaN(value))) {
        return 'blank';
    }


    var isDateValue = _isDate(value);
    var isNumberValue = typeof value === 'number';
    if (formatter === 'General' || isNullOrUndefined(formatter)) {
        if (isDateValue) {
            return 'date';
        }
    }
    else if (!isformatString(formatter) && (isDateValue || isNumberValue)) {
        var dateReg = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yyy|yy|y|zzz|zz|z|ggg|gg|g|ee|e/;
        var AMPM = /AM|PM/, isFormatObj = formatter instanceof Common_1.Formatter.FormatterBase;

        var generalFormatter = isFormatObj ? formatter : new Common_1.Formatter.GeneralFormatter(formatter);
        var formatStr = isFormatObj ? formatter.formatString() : formatter;
        var isOnlyDateFormat = dateReg.test(formatStr)
            && !(generalFormatter.hasFormatedColor && generalFormatter.hasFormatedColor())
            && !AMPM.test(formatter)
            && !(formatStr === 'General' || formatStr === '' || formatStr === void 0);
        return isOnlyDateFormat ? 'date' : 'number';
    }
    return getType(value);
}
function trimCommentedChar(format) {
    var result = '';
    var inComments = false;
    for (var i = 0, l = format.length; i < l; i++) {
        var c = format[i];
        if (c === '"') {
            inComments = !inComments;
        }
        if (c !== 'E' && !inComments) {
            result += c.toLowerCase();
        }
    }
    return result;
}
function buildDateData(formatter, text, value, status, valueType) {
    if (!text || !formatter) {
        return;
    }
    var result = formatter.format(value), year, month, day, children = [];
    if (result) {
        var YMD = result.split('/');
        year = YMD[0] || '';
        month = YMD[1] || '';
        day = YMD[2] || '';
    }
    children.push({
        value: year,
        level: 0,
        status: status
    });
    children.push({
        value: month,
        level: 1,
        status: status
    });
    children.push({
        value: day,
        level: 2,
        status: status
    });
    return {
        key: text,
        value: value,
        children: children,
        status: status,
        type: valueType
    };
}
function buildTextOrNumberData(sheet, text, value, row, col, status, type) {
    if (!text) {
        return;
    }
    var children = [];
    children.push({
        value: text,
        level: !(sheet.outlineColumn && sheet.outlineColumn._isOutlineColumn(col)) ? 0 : sheet.getCell(row, col).textIndent(),
        status: status
    });
    return {
        key: text,
        value: value,
        children: children,
        status: status,
        type: type
    };
}
function generateDateFormatter(formatStr) {
    if (isNullOrUndefined(formatStr)) {
        formatStr = '';
    }
    var formatter = new Common_1.Formatter.GeneralFormatter(formatStr);
    var formatters = formatter.formatters;
    if (!formatters || formatters.length <= 0) {
        return;
    }
    var customFormatter = formatters[0];
    if (!customFormatter) {
        return;
    }
    var cultureInfo = Common_1.Common.CultureManager.getCultureInfo(), cultureID = cultureInfo && cultureInfo.id;
    var localeIDFormatPart = customFormatter.localeIDFormatPart;
    var dbNumberFormatPart = customFormatter.dbNumberFormatPart;
    var localeID = localeIDFormatPart && localeIDFormatPart._locateID || cultureID;
    var newFormatterStr = Common_1.Common.CultureManager._getFilterDialogFormatterStr(localeID, trimCommentedChar(formatStr));
    var localeIDToken = (localeIDFormatPart && localeIDFormatPart._originalToken) || '';
    var dbNumberToken = (dbNumberFormatPart && dbNumberFormatPart._originalToken) || '';
    return new Common_1.Formatter.GeneralFormatter(dbNumberToken + localeIDToken + newFormatterStr);
}
var _FilterDialog = (function (_super) {
    __extends(_FilterDialog, _super);
    function _FilterDialog(host, sheet, filterButtonInfo, displayInfo) {
        var _this = this;
        var sheetParent = sheet.parent;
        _this = _super.call(this, host, util._getPreferredZIndex(sheetParent && sheetParent._host)) || this;
        var self = _this;
        self._dateformatCache = {};
        self._allValues = [];
        self._allCheckedValues = [];
        self._searchedValues = [];
        self._previewItemsData = [];
        self._dataSourceCache = [];
        self._oldCheckedValues = [];
        self._allCheckedValuesIncludeNull = [];
        self._addCurrent = false;
        self._addCurrentItem = false;
        self._originValueTypeCount = {
            Number: 0,
            Text: 0,
            Date: 0
        };
        self._menuType = '';
        self._currentSubMenu = keyword_null;
        self.sheet = sheet;
        self.filterButtonInfo = filterButtonInfo;
        self._containerWidth = 237;
        self._containerHeight = 410;
        self._listHeight = 26;
        self._itemContainerWidth = 191;
        self._itemContainerHeight = 150;
        self._touchLayoutFactor = 1.2;
        self.rEscape = /[\-\[\]{}()+.,\\\^$|#\s]/g;
        self.elementList = [];
        self.activeItemIndex = keyword_null;
        self._container = self._getContainer();
        self._filterTitle = self._setFilterName();
        self._clearFilterItemEnable = self._getClearFilterVisiable();
        self._displayInfo = displayInfo;
        self._displayList = self._createDisplayList();
        self._createTableLayout();
        self._initFilterPanel();
        return _this;
    }
    _FilterDialog.prototype._createDisplayList = function () {
        var self = this, list = [], displayInfo = this._displayInfo;
        var height = self._containerHeight, itemHeight = self._listHeight;

        if (displayInfo.sortByValue) {
            list = list.concat([1, 1]);
        }
        else {
            list = list.concat([0, 0]);
            height = height - itemHeight * 2;
        }

        if (displayInfo.sortByColor) {
            list = list.concat([1]);
        }
        else {
            list = list.concat([0]);
            height = height - itemHeight;
        }

        if (displayInfo.filterByValue === true || displayInfo.filterByColor === true) {
            list = list.concat([1]);
        }
        else {
            list = list.concat([0]);
            height = height - itemHeight;
        }

        if (displayInfo.filterByColor === true) {
            list = list.concat([1]);
        }
        else {
            list = list.concat([0]);
            height = height - itemHeight;
        }

        if (displayInfo.filterByValue === true) {
            list = list.concat([1]);
        }
        else {
            list = list.concat([0]);
            height = height - itemHeight;
        }

        if (displayInfo.listFilterArea === true) {
            list = list.concat([1, 1, 1]);
        }
        else {
            list = list.concat([0, 0, 0]);
            height = height - 254;
        }
        self._containerHeight = height;
        return list;
    };
    _FilterDialog.prototype._open = function () {
        var self = this, tempWorkbook = self.sheet.parent, filterButtonInfo = self.filterButtonInfo, container = self._container;
        self._useTouchLayout = tempWorkbook ? tempWorkbook.options.useTouchLayout : false;
        self._initData(filterButtonInfo.col);
        if (self.itemList && self.itemList.length > 0) {
            self._initFilterItemsLayout(self.dataSource);
        }
        else {
            self.sheet.endEdit();
        }

        self._setMenuLinkType();
        self._setDisableItem();
        if (Core_1.GC$('#' + MAJOR_FILTER_TR).length === 1) {
            self._cellValueSubMenu = self._createCellValueSubMenu(Core_1.GC$('#' + MAJOR_FILTER_TR)[0].children[2]);
            self._cellValueSubMenu._setType(self._menuType)._init();
        }
        if (Core_1.GC$('#' + COLOR_FILTER_TR).length === 1) {
            self._colorFilterSubMenu = self._createColorSubMenu(Core_1.GC$('#' + COLOR_FILTER_TR)[0].children[2], SUB_MENU_COLOR_FILTER);
            self._colorFilterSubMenu._init();
        }
        if (Core_1.GC$('#' + SORT_COLOR_TR).length === 1) {
            self._colorSortSubMenu = self._createColorSubMenu(Core_1.GC$('#' + SORT_COLOR_TR)[0].children[2], SUB_MENU_COLOR_SORT);
            self._colorSortSubMenu._init();
        }


        container.hide();
        self._show(function () {
            self.elementList.length > 0 && Core_1.GC$(self.elementList[0]).focus();
        });
        self._updateFilterPanel(self._useTouchLayout);
        var left = filterButtonInfo.x + filterButtonInfo.width - container.width() - 6;
        if (left < 5) {
            left = 5;
        }
        container.css([LEFT, TOP], [left, filterButtonInfo.y + filterButtonInfo.height]);
        self._resetDialogPosition();
        self._attachEvent();
        self._setButtonState();
        setTimeout(function () {
            self._container.focus();
        });


        self.sheet._eventHandler._unhandleDocumentMouseMove();
    };
    _FilterDialog.prototype._updateFilterPanel = function (isTouchLayout) {
        var self = this;
        if (isTouchLayout) {
            var width = self._containerWidth * self._touchLayoutFactor, height = self._containerHeight * self._touchLayoutFactor;
            var widthInc = width - self._containerWidth, heightInc = height - self._containerHeight;
            applyNewSize(self._container, width, height);
            var $filterSortElement = Core_1.GC$('.' + FILTER_SORT_CLASS), newSortPaddingV = parseFloatFunc($filterSortElement.css(PADDING_TOP)) + heightInc / 30, $filterButtons = Core_1.GC$('.' + FILTER_BUTTON_CLASS), newButtonWidth = parseFloatFunc($filterButtons.css(WIDTH)) + widthInc / 4, newButtonHeight = parseFloatFunc($filterButtons.css(HEIGHT)) + heightInc / 8, $okButton = Core_1.GC$('#' + OK_ID), newButtonMarginLeft = parseFloatFunc($okButton.css(MARGIN_LEFT)) + widthInc / 2, $searchBox = Core_1.GC$('#' + SEARCH_ID), newSearchWidth = parseFloatFunc($searchBox.css(WIDTH)) + widthInc, newSearchHeight = parseFloatFunc($searchBox.css(HEIGHT)) + heightInc / 8, $filterCheck = Core_1.GC$('.' + FILTER_CHECK_OUTER_DIV_CLASS), newCheckMarginTop = parseFloatFunc($filterCheck.css(MARGIN_TOP)) + heightInc / 10, $unCheckAll = Core_1.GC$('#' + UNCHECK_ALL_ID), newCheckMarginLeft = parseFloatFunc($unCheckAll.css(MARGIN_LEFT)) + widthInc;
            $filterSortElement.css(PADDING, newSortPaddingV + PX + ' 6px');
            applyNewSize($filterButtons, newButtonWidth, newButtonHeight);
            $okButton.css(MARGIN_LEFT, newButtonMarginLeft + PX);
            applyNewSize($searchBox, newSearchWidth, newSearchHeight);
            $filterCheck.css(MARGIN_TOP, newCheckMarginTop + PX);
            $unCheckAll.css(MARGIN_LEFT, newCheckMarginLeft + PX);
        }
    };
    _FilterDialog.prototype.close = function () {
        var self = this, sheet = self.sheet;
        self._container.hide();
        if (self._filterDialogSpread) {
            self._filterDialogSpread._dispose();
            self._filterDialogSpread = null;
        }
        _super.prototype.close.call(self);
        Core_1.GC$(self._itemSpanElement).remove();
        Core_1.GC$(self._itemInputElement).remove();
        sheet._filterDialog = null;
        sheet && sheet._setFocus();
    };
    _FilterDialog.prototype._initSortArea = function () {
        if (Core_1.GC$('#' + SORT_ASC_TR).length === 1) {
            this._createValueSortItem();
        }
        if (Core_1.GC$('#' + SORT_COLOR_TR).length === 1) {
            this._createColorSortItem();
        }
    };
    _FilterDialog.prototype._createValueSortItem = function () {
        var self = this, elementList = self.elementList, ascLink = self._getSortLink(SORT_ASC_ID, getSR().SortAscending), desLink = self._getSortLink(SORT_DES_ID, getSR().SortDescending);
        var sortAcendingChild = Core_1.GC$('#' + SORT_ASC_TR)[0], sortDecendingChild = Core_1.GC$('#' + SORT_DEC_TR)[0];
        Core_1.GC$(sortAcendingChild.children[0]).append(Core_1.GC$(createElement('img')).attr('src', filter_button_images_1.getFilterButtonImageSrc(6)));
        Core_1.GC$(sortDecendingChild.children[0]).append(Core_1.GC$(createElement('img')).attr('src', filter_button_images_1.getFilterButtonImageSrc(7)));
        Core_1.GC$(sortAcendingChild.children[1]).append(ascLink);
        Core_1.GC$(sortDecendingChild.children[1]).append(desLink);
        elementList.push(sortAcendingChild);
        elementList.push(sortDecendingChild);
    };
    _FilterDialog.prototype._createColorSortItem = function () {
        var self = this, elementList = self.elementList, colorLink = self._getSortLink(SORT_COLOR_ID, getSR().SortColor), sortColorChild = Core_1.GC$('#' + SORT_COLOR_TR)[0];
        var flag = self._getIsColorSortCheck(), isColorSortCheckWrap = this._createCheckedElement(flag);
        var colorSortArrowIcon = Core_1.GC$(createElement('span'));
        colorSortArrowIcon.addClass(RIGHT_ARROW);
        Core_1.GC$(sortColorChild.children[0]).append(isColorSortCheckWrap);
        Core_1.GC$(sortColorChild.children[1]).append(colorLink);
        Core_1.GC$(sortColorChild.children[2]).append(colorSortArrowIcon);
        elementList.push(sortColorChild);
    };
    _FilterDialog.prototype._createColorFilterItem = function (showCheckInfo) {
        var self = this, elementList = self.elementList, colorFilterLink = self._getSortLink(FILTER_COLOR_ID, getSR().FilterColor), colorFilterChild = Core_1.GC$('#' + COLOR_FILTER_TR)[0], colorFilterArrowIcon = Core_1.GC$(createElement('span'));
        colorFilterArrowIcon.addClass(RIGHT_ARROW);
        var isColorFilterCheckWrap = this._createCheckedElement(showCheckInfo.isShowColorFilterSelect);
        Core_1.GC$(colorFilterChild.children[0]).append(isColorFilterCheckWrap);
        Core_1.GC$(colorFilterChild.children[1]).append(colorFilterLink);
        Core_1.GC$(colorFilterChild.children[2]).append(colorFilterArrowIcon);
        elementList.push(colorFilterChild);
    };
    _FilterDialog.prototype._createConditionFilterItem = function (showCheckInfo) {
        var self = this, sheet = self.sheet, colIndex = self.filterButtonInfo.col, isMajorCheckWrap = self._createCheckedElement(showCheckInfo.isShowMajorCheck), majorFilterChild = Core_1.GC$('#' + MAJOR_FILTER_TR)[0];
        var isOutlineColumn = sheet.outlineColumn && sheet.outlineColumn._isOutlineColumn(colIndex);
        if (isOutlineColumn) {
            Core_1.GC$(majorFilterChild).addClass(FILTER_DISABLE_ITEM_CLASS + UI_STATE_DISABLED_CLASS);
        }
        Core_1.GC$(majorFilterChild.children[0]).append(isMajorCheckWrap);
        var majorLink = self._getSortLink(MAJOR_FILTER_ID, '');
        majorLink.appendTo(majorFilterChild.children[1]);
        var arrowIcon = Core_1.GC$(createElement('span'));
        arrowIcon.addClass(RIGHT_ARROW);
        Core_1.GC$(majorFilterChild.children[2]).append(arrowIcon);
        self.elementList.push(majorFilterChild);
    };
    _FilterDialog.prototype._initFilterArea = function () {
        var hasColorFilter = Core_1.GC$('#' + COLOR_FILTER_TR).length === 1, hasValueFilter = Core_1.GC$('#' + MAJOR_FILTER_TR).length === 1;
        if (hasColorFilter || hasValueFilter) {
            var self_1 = this, elementList = self_1.elementList, clearFilterChild = Core_1.GC$('#' + CLEAR_FILTER_TR)[0];
            self_1._createClearFilterChild(clearFilterChild);
            elementList.push(clearFilterChild);

            var showCheckInfo = self_1._getShowCheckInfo();
            if (hasColorFilter) {
                self_1._createColorFilterItem(showCheckInfo);
            }
            if (hasValueFilter) {
                self_1._createConditionFilterItem(showCheckInfo);
            }
        }
    };
    _FilterDialog.prototype._initListBoxArea = function () {
        var self = this;
        if (self._displayInfo.listFilterArea) {
            self._createSearchBox();
            self._createListBoxItem();
            self._createBottunItem();
        }
    };
    _FilterDialog.prototype._createBottunItem = function () {
        var buttonClass = FILTER_BUTTON_CLASS + ' gc-filter-button-default ui-button ui-state-default' + UI_CORNER_CLASS + 'btn btn-default', btnChild = Core_1.GC$('#' + FILTER_BUTTON_TR)[0], okButtonElement = createElement(BUTTON), cancelButtonElement = createElement(BUTTON), okButton = Core_1.GC$(okButtonElement).text(getSR().OK).css(FONT_SIZE, '1em').attr('id', OK_ID), cancelButton = Core_1.GC$(cancelButtonElement).text(getSR().Cancel).css(FONT_SIZE, '1em').attr('id', CANCEL_ID);
        addCssClass(okButtonElement, buttonClass);
        addCssClass(cancelButtonElement, buttonClass);
        Core_1.GC$(btnChild.children[1]).append(okButton).append(cancelButton);
        this.elementList.push(okButtonElement);
        this.elementList.push(cancelButtonElement);
    };
    _FilterDialog.prototype._createListBoxItem = function () {
        var self = this, showCheckInfo = self._getShowCheckInfo(), itemsChild = Core_1.GC$('#' + FILTER_CHOOSE_AREA)[0];
        var isSelectCheckedEl = Core_1.GC$(createElement('img')).attr('src', filter_button_images_1.getFilterButtonImageSrc(11)).addClass('gc-filter-checked');
        isSelectCheckedEl.css(['verticalAlign', 'margin-top'], ['top', '4px']);
        if (!showCheckInfo.isShowSelectCheck) {
            isSelectCheckedEl.css([DISPLAY], [NONE]);
        }

        var itemList = self.itemList = Core_1.GC$(createElement(DIV)).css([WIDTH, HEIGHT, BOX_SIZING], [self._itemContainerWidth, self._itemContainerHeight, CONTENT_BOX]);
        addCssClass(itemList[0], ITEM_CONTAINER_CLASS);
        Core_1.GC$(itemsChild.children[0]).append(isSelectCheckedEl).css([DISPLAY], ['inline-block']);
        Core_1.GC$(itemsChild.children[1]).append(itemList);
    };
    _FilterDialog.prototype._createSearchBox = function () {
        var self = this, $searchOuterDiv = Core_1.GC$(createElement(DIV)).css([MARGIN, PADDING], [0, 0]), $searchDiv = Core_1.GC$(createElement(DIV)).appendTo($searchOuterDiv), searchChild = Core_1.GC$('#' + SEARCH_FILTER_TR)[0], $searchInput = Core_1.GC$(createElement(INPUT)).attr({
            type: SEARCH,
            placeholder: getSR().Search,
            id: SEARCH_ID
        }).appendTo($searchDiv);
        addCssClass($searchOuterDiv[0], 'gc-search-outer-div ui-widget-header' + UI_CORNER_CLASS + 'ui-multiselect-header ui-helper-clearfix');
        self.elementList.push($searchInput[0]);
        var checkDiv = Core_1.GC$(createElement(DIV)).appendTo($searchOuterDiv), checkAllLink = self._getCheckLink(CHECK_ALL_ID, getSR().CheckAll, 'gc-check-image ui-icon ui-icon-check'), unCheckAllLink = self._getCheckLink(UNCHECK_ALL_ID, getSR().UncheckAll, 'gc-uncheck-image ui-icon ui-icon-closethick');
        addCssClass(checkDiv[0], FILTER_CHECK_OUTER_DIV_CLASS);
        checkDiv.append(checkAllLink).append(unCheckAllLink);
        Core_1.GC$(searchChild.children[1]).append($searchOuterDiv);
        self.elementList.push(checkAllLink[0]);
        self.elementList.push(unCheckAllLink[0]);
    };

    _FilterDialog.prototype._initFilterPanel = function () {
        var self = this;
        self._initSortArea();
        self._initFilterArea();
        self._initListBoxArea();
    };
    _FilterDialog.prototype._createCellValueSubMenu = function (wrap) {
        var self = this, subMenu = keyword_null;
        switch (this._menuType) {
            case NUMBER_FILTER:
                subMenu = new filter_dialog_1._NumberFilterMenu(wrap, self._container, self.filterButtonInfo, self.sheet, self, SUB_MENU_CONTENT_FILTER);

                break;
            case TEXT_FILTER:
                subMenu = new filter_dialog_1._TextFilterMenu(wrap, self._container, self.filterButtonInfo, self.sheet, self, SUB_MENU_CONTENT_FILTER);

                break;
            case DATE_FILTER:
                subMenu = new filter_dialog_1._DateFilterMenu(wrap, self._container, self.filterButtonInfo, self.sheet, self, SUB_MENU_CONTENT_FILTER);

                break;
        }
        return subMenu;
    };
    _FilterDialog.prototype._createColorSubMenu = function (wrap, dialogType) {
        var self = this, subMenu = keyword_null;
        if (dialogType === SUB_MENU_COLOR_FILTER) {
            subMenu = new filter_dialog_1._ColorFilterMenu(wrap, self._container, self.filterButtonInfo, self.sheet, self, SUB_MENU_COLOR_FILTER);
        }
        else if (dialogType === SUB_MENU_COLOR_SORT) {
            subMenu = new filter_dialog_1._ColorFilterMenu(wrap, self._container, self.filterButtonInfo, self.sheet, self, SUB_MENU_COLOR_SORT);
        }
        return subMenu;
    };
    _FilterDialog.prototype._getIsColorSortCheck = function () {
        var self = this, filterButtonInfo = self.filterButtonInfo, rowFilter = filterButtonInfo.rowFilter, flag = false, sortInfo = rowFilter._sortInfo;
        if (sortInfo !== keyword_null && sortInfo.color !== keyword_undefined && filterButtonInfo.col === sortInfo.index) {
            flag = true;
        }
        return flag;
    };
    _FilterDialog.prototype._createCheckedElement = function (isShow) {
        var isCheckWrap = Core_1.GC$(createElement('div'));
        var isCheckedEl = Core_1.GC$(createElement('img')).attr('src', filter_button_images_1.getFilterButtonImageSrc(11)).addClass('gc-filter-checked');
        if (!isShow) {
            isCheckedEl.css([DISPLAY], [NONE]);
        }
        isCheckWrap.append(isCheckedEl);
        return isCheckWrap;
    };

    _FilterDialog.prototype._setFilterName = function () {
        var self = this, filterButtonInfo = self.filterButtonInfo, rowFilter = filterButtonInfo.rowFilter, col = filterButtonInfo.col, name = self.sheet.getText(self.filterButtonInfo.row, col, filterButtonInfo.sheetArea);

        if (rowFilter && rowFilter.range.row <= 0) {
            name = self.sheet.getText(filterButtonInfo.row, col, filterButtonInfo.sheetArea);
        }
        else if (!name) {
            name = self.sheet.getText(0, col, 1 );
        }
        if (name === '' && self.sheet.options.colHeaderAutoText === 1 ) {
            name = '(Column ' + (col + 1) + ')';
        }
        else if (name === '') {
            name = '(Column ' + util._indexToLetters(col + 1) + ')';
        }
        name = '"' + name;
        return name;
    };
    _FilterDialog.prototype._createClearFilterChild = function (clearFilterChild) {
        var self = this, src;
        if (self._clearFilterItemEnable) {
            src = filter_button_images_1.getFilterButtonImageSrc(12);
            Core_1.GC$(clearFilterChild).addClass('gc-filter-item');
        }
        else {
            src = filter_button_images_1.getFilterButtonImageSrc(13);
            Core_1.GC$(clearFilterChild).addClass(FILTER_DISABLE_ITEM_CLASS + UI_STATE_DISABLED_CLASS);
        }
        Core_1.GC$(clearFilterChild.children[0]).append(Core_1.GC$(createElement('img')).attr('src', src).css([WIDTH], ['18px']));
        self._getSortLinkSpecial(CLEAR_FILTER_ID, self._filterTitle, Core_1.GC$(clearFilterChild.children[1]));
    };
    _FilterDialog.prototype._isTwoEqualDateRelationCondition = function (condition) {
        var conType = condition.conType();
        return (conType === 0
            && condition.item1().compareType() === 0
            && condition.item2().compareType() === 0
            && condition.item1().conType() === 5
            && condition.item2().conType() === 5);
    };
    _FilterDialog.prototype._getShowCheckInfo = function () {
        var self = this, isShowMajorCheck = false, isShowColorFilterSelect = false, isShowSelectCheck = false, filterButtonInfo = self.filterButtonInfo, col = filterButtonInfo.col, rowFilter = filterButtonInfo.rowFilter, condition = rowFilter._filterItemMap[col];
        if (condition && condition.length > 0) {
            condition = condition[0];
            var conType = condition.conType(), compareType = condition.compareType();
            if (compareType === 0 && conType !== 3 && self._displayInfo.listFilterArea) {
                isShowSelectCheck = true;
            }
            else if (compareType === 0 && conType !== 3 && !self._displayInfo.listFilterArea) {
                isShowMajorCheck = true;
            }
            else if (compareType !== 0 && conType !== 3 ) {
                isShowMajorCheck = true;
            }
            else if (conType === 3 ) {
                isShowColorFilterSelect = true;
            }
            var isTwoEqualDateRelationCondition = this._isTwoEqualDateRelationCondition(condition);

            if ((conType === 5 && compareType === 0 ) || isTwoEqualDateRelationCondition) {
                isShowSelectCheck = false;
                isShowMajorCheck = true;
            }
        }
        return {
            isShowColorFilterSelect: isShowColorFilterSelect,
            isShowMajorCheck: isShowMajorCheck,
            isShowSelectCheck: isShowSelectCheck
        };
    };

    _FilterDialog.prototype._getClearFilterVisiable = function () {
        var self = this, flag = false, filterButtonInfo = self.filterButtonInfo, col = filterButtonInfo.col, rowFilter = filterButtonInfo.rowFilter, condition = rowFilter._filterItemMap[col];
        if (condition && condition.length > 0) {
            flag = true;
        }
        return flag;
    };
    _FilterDialog.prototype._getMenuType = function () {
        var max = Math.max(this._originValueTypeCount.Date, this._originValueTypeCount.Number, this._originValueTypeCount.Text);

        if (max === this._originValueTypeCount.Text) {
            return TEXT_FILTER;
        }
        if (max === this._originValueTypeCount.Number) {
            return NUMBER_FILTER;
        }
        if (max === this._originValueTypeCount.Date) {
            return DATE_FILTER;
        }
    };
    _FilterDialog.prototype._setMenuLinkType = function () {
        var text = this._getMenuType();
        this._menuType = text;
        var sr = getSR()[text];
        var $link = Core_1.GC$('#' + MAJOR_FILTER_ID);
        $link.text(sr);
    };
    _FilterDialog.prototype._clearFilter = function () {
        var self = this, filterButtonInfo = self.filterButtonInfo, sheet = this.sheet, colIndex = filterButtonInfo.col, rowFilter = filterButtonInfo.rowFilter;
        if (!rowFilter) {
            return;
        }
        var tableName = rowFilter._table ? rowFilter._table.name() : keyword_undefined;
        var cmdOption = {
            tableName: tableName,
            colIndex: colIndex
        };
        sheet._commandManager().execute({ cmd: 'clearFilter', sheetName: sheet.name(), cmdOption: cmdOption });
        self.close();
    };
    _FilterDialog.prototype._setDisableItem = function () {
        var hasMoreColor = false, cellColorList = this._cellColorList, fontColorList = this._fontColorList, backgroundCount = cellColorList.colorNumber, foreCount = fontColorList.colorNumber;
        if (cellColorList.automatic) {
            backgroundCount++;
        }
        if (fontColorList.automatic) {
            foreCount++;
        }
        if ((backgroundCount !== keyword_undefined && backgroundCount > 1) || (foreCount !== keyword_undefined && foreCount > 1)) {
            hasMoreColor = true;
        }
        var showCheckInfo = this._getShowCheckInfo();
        if (!hasMoreColor) {
            !showCheckInfo.isShowColorFilterSelect && this._disableItem(COLOR_FILTER_TR);
            !this._getIsColorSortCheck() && this._disableItem(SORT_COLOR_TR);
        }
    };
    _FilterDialog.prototype._disableItem = function (id) {
        var trElement = Core_1.GC$('#' + id).addClass(FILTER_DISABLE_ITEM_CLASS + UI_STATE_DISABLED_CLASS);
        trElement.find('.' + RIGHT_ARROW);
    };

    _FilterDialog.prototype._createTableLayout = function () {
        var self = this, container = self._container, filterSortCalss = ' gc-sort-container ui-menu-item', row, col, $table = self.table = Core_1.GC$(createElement('table')).css([PADDING, DISPLAY], [0, 'table']).attr({
            cellspacing: 0,
            cellpadding: 0
        });
        addCssClass($table[0], 'gc-layout-table');
        var idList = [SORT_ASC_TR, SORT_DEC_TR, SORT_COLOR_TR, CLEAR_FILTER_TR, COLOR_FILTER_TR, MAJOR_FILTER_TR, SEARCH_FILTER_TR];
        var displayList = self._displayList;
        for (row = 0; row < 9 ; row++) {
            if (displayList[row] === 1) {
                var trElement = createElement('tr'), $tr = Core_1.GC$(trElement).appendTo($table);
                if (row < 6) {
                    Core_1.GC$(trElement).attr('id', idList[row]).css([DISPLAY, HEIGHT, FONT_SIZE], ['table-row', '26px', '9pt']);
                    Core_1.GC$(trElement).addClass(FILTER_FUNCTION_TR);
                }
                if (row === 6) {
                    Core_1.GC$(trElement).attr('id', idList[row]);
                }
                if (row === 7) {
                    Core_1.GC$(trElement).attr('tabindex', 0).attr('id', FILTER_CHOOSE_AREA);
                }
                if (row === 8) {
                    Core_1.GC$(trElement).attr('id', FILTER_BUTTON_TR);
                }
                initElementProperty(trElement);
                for (col = 0; col < 3 ; col++) {
                    var tdElement = createElement('td');
                    Core_1.GC$(tdElement).appendTo($tr);
                    initElementProperty(tdElement);
                    if (col === 0) {
                        addCssClass(tdElement, 'gc-layout-table-first-column');
                    }
                    else if (col === 2) {
                        addCssClass(tdElement, 'gc-layout-table-last-column');
                    }
                    else if (col === 1) {
                        if (row === 0) {
                            addCssClass(tdElement, 'gc-filter-sort-asc-container' + filterSortCalss + 'gc-layout-table-middle-column');
                        }
                        else if (row === 1) {
                            addCssClass(tdElement, 'gc-filter-sort-desc-container' + filterSortCalss + 'gc-layout-table-middle-column');
                        }
                    }
                }
            }
        }
        self.table.appendTo(container);
        container.css(['box-shadow', WIDTH, HEIGHT, BOX_SIZING], ['rgba(0, 0, 0, 0.15) 2px 4px 5px', self._containerWidth + PX, self._containerHeight + PX, CONTENT_BOX]);
        addCssClass(container[0], FILTER_DIALOG_CLASS + ' ' + NO_USER_SELECT_CLASS);
        container.appendTo(self._getHost());
    };
    _FilterDialog.prototype._attachEvent = function () {
        var self = this, mouseDownReceivedByAsc = false, mouseDownReceivedByDes = false, $filterButtonClass = Core_1.GC$('.' + FILTER_BUTTON_CLASS);
        Core_1.GC$('#' + SORT_ASC_TR).bind(MOUSE_UP, function (event) {
            if (mouseDownReceivedByAsc) {
                mouseDownReceivedByAsc = false;
                self._sortByUser(true);
                self.close();
                util_cancelDefault(event);
            }
        }).bind(MOUSE_DOWN, function (event) {
            util_cancelDefault(event);
            mouseDownReceivedByAsc = true;
        });
        Core_1.GC$('#' + SORT_DEC_TR).bind(MOUSE_UP, function (event) {
            if (mouseDownReceivedByDes) {
                mouseDownReceivedByDes = false;
                self._sortByUser(false);
                self.close();
                util_cancelDefault(event);
            }
        }).bind(MOUSE_DOWN, function (event) {
            util_cancelDefault(event);
            mouseDownReceivedByDes = true;
        });
        var cellValueHoverTimer, colorFilterHoverTimer, colorSortHoverTimer;
        Core_1.GC$('.' + FILTER_FUNCTION_TR).bind(MOUSE_OVER, function () {
            if (self._cellValueSubMenu && Core_1.GC$(this).attr('id') !== MAJOR_FILTER_TR && self._cellValueSubMenu._isShow()) {
                self._cellValueSubMenu._hide();
                self._currentSubMenu = keyword_null;
                removeCssClass(Core_1.GC$('#' + MAJOR_FILTER_TR)[0], FILTER_CLASS);
            }
            if (self._colorFilterSubMenu && Core_1.GC$(this).attr('id') !== COLOR_FILTER_TR && self._colorFilterSubMenu._isShow()) {
                self._colorFilterSubMenu._hide();
                self._currentSubMenu = keyword_null;
                removeCssClass(Core_1.GC$('#' + COLOR_FILTER_TR)[0], FILTER_CLASS);
            }
            if (self._colorSortSubMenu && Core_1.GC$(this).attr('id') !== SORT_COLOR_TR && self._colorSortSubMenu._isShow()) {
                self._colorSortSubMenu._hide();
                self._currentSubMenu = keyword_null;
                removeCssClass(Core_1.GC$('#' + SORT_COLOR_TR)[0], FILTER_CLASS);
            }
            if (!Core_1.GC$(this).hasClass(UI_STATE_DISABLED_CLASS.trim()) && Core_1.GC$(this).index() < 6) {
                addCssClass(this, FILTER_CLASS);
            }
        }).bind(MOUSE_OUT, function () {
            if (self._cellValueSubMenu && Core_1.GC$(this).attr('id') === MAJOR_FILTER_TR) {
                clearTimeout(cellValueHoverTimer);
                if (self._cellValueSubMenu._isShow()) {
                    return;
                }
            }
            if (self._colorFilterSubMenu && Core_1.GC$(this).attr('id') === COLOR_FILTER_TR) {
                clearTimeout(colorFilterHoverTimer);
                if (self._colorFilterSubMenu._isShow()) {
                    return;
                }
            }
            if (self._colorSortSubMenu && Core_1.GC$(this).attr('id') === SORT_COLOR_TR) {
                clearTimeout(colorSortHoverTimer);
                if (self._colorSortSubMenu._isShow()) {
                    return;
                }
            }
            removeCssClass(this, FILTER_CLASS);
        });
        Core_1.GC$('#' + CLEAR_FILTER_TR).bind(CLICK, function () {
            if (self._clearFilterItemEnable) {
                self._clearFilter();
            }
        });
        Core_1.GC$('#' + MAJOR_FILTER_TR).bind(MOUSE_OVER, function () {
            if (!Core_1.GC$(this).hasClass(FILTER_DISABLE_ITEM_CLASS)) {
                cellValueHoverTimer = setTimeout(function () {
                    self._currentSubMenu = self._cellValueSubMenu;
                    self._currentSubMenu._show();
                }, SHOW_DIALOG_DELAY_TIME);
            }
        });
        Core_1.GC$('#' + COLOR_FILTER_TR).bind(MOUSE_OVER, function () {
            if (!Core_1.GC$(this).hasClass(FILTER_DISABLE_ITEM_CLASS)) {
                colorFilterHoverTimer = setTimeout(function () {
                    self._currentSubMenu = self._colorFilterSubMenu;
                    self._currentSubMenu._show();
                }, SHOW_DIALOG_DELAY_TIME);
            }
        });
        Core_1.GC$('#' + SORT_COLOR_TR).bind(MOUSE_OVER, function () {
            if (!Core_1.GC$(this).hasClass(FILTER_DISABLE_ITEM_CLASS)) {
                colorSortHoverTimer = setTimeout(function () {
                    self._currentSubMenu = self._colorSortSubMenu;
                    self._currentSubMenu._show();
                }, SHOW_DIALOG_DELAY_TIME);
            }
        });
        Core_1.GC$('#' + CHECK_ALL_ID).bind(MOUSE_DOWN, function (event) {
            util_cancelDefault(event);
        }).bind(MOUSE_UP, function (event) {
            self._updateFilterItemState(event, true);
        });
        Core_1.GC$('#' + UNCHECK_ALL_ID).bind(MOUSE_DOWN, function (event) {
            util_cancelDefault(event);
        }).bind(MOUSE_UP, function (event) {
            self._updateFilterItemState(event, false);
        });
        Core_1.GC$('#' + SEARCH_ID).bind(KEY_DOWN, function (e) {
            if ((e.which || e.keyCode) === 13 ) {
                e.preventDefault();
            }
        }).bind(KEY_UP, function (e) {
            if (inArray(e.keyCode, [9 , 37 , 38 , 39 , 40 ]) < 0) {
                self._searchHandler();
                self._setButtonState();
            }
        }).bind(SEARCH, function (e) {
            self._searchHandler();
            self._setButtonState();
        });
        $filterButtonClass.bind(MOUSE_OVER, function () {
            addCssClass(this, FILTER_BUTTON_HOVER_CLASS);
        }).bind(MOUSE_OUT, function () {
            removeCssClass(this, FILTER_BUTTON_HOVER_CLASS);
        });
        $filterButtonClass.bind(MOUSE_DOWN, function () {
            removeCssClass(this, FILTER_BUTTON_HOVER_CLASS);
            addCssClass(this, FILTER_BUTTON_ACTIVE_CLASS);
        }).bind(MOUSE_OUT, function () {
            removeCssClass(this, FILTER_BUTTON_ACTIVE_CLASS);
        });
        Core_1.GC$('#' + OK_ID).bind(CLICK, function () {
            self._updateCheckedValues();
            var oldCheckedValues = self._oldCheckedValues, currentCheck = [], allCheckedValues = self._allCheckedValues, len1 = oldCheckedValues.length, len2 = allCheckedValues.length;

            self._addCurrent = self._filterDialogSheet.outlineColumn.getCheckStatus()[0] === 1;
            if (self._addCurrent) {
                for (var j = 0; j < (len1 > len2 ? len1 : len2); j++) {
                    if (allCheckedValues[j]) {
                        currentCheck.push(allCheckedValues[j]);
                    }
                    if (oldCheckedValues[j] && !oldCheckedValues[j].repeat && !oldCheckedValues[j].noCheck) {
                        currentCheck.push(oldCheckedValues[j]);
                    }
                }
                self._allCheckedValues = currentCheck;
            }
            var checkedValues = self._allCheckedValues;
            self.sheet.suspendPaint();
            self._filter(checkedValues);
            self.sheet.resumePaint();
            self.close();
        });
        Core_1.GC$('#' + CANCEL_ID).bind(CLICK, function () {
            self.close();
        });
        self._container.bind(MOUSE_WHEEL, function (event) {
            util_cancelDefault(event);
        }).bind(DOM_MOUSE_SCROLL, function (event) {
            util_cancelDefault(event);
        }).bind(KEY_DOWN + EVENT_NAME_SPACE, function (event) {
            self._filterKeyDown(event);
        }).bind(KEY_UP + EVENT_NAME_SPACE, function (event) {
            util_cancelDefault(event);
        });
        if (self.itemList && self.itemList.length > 0) {
            self._filterDialogSpread.bind(Core_1.Events.TopRowChanged, function (sender, args) {
                self._updateHorizontalScrollbar(args);
            });


            self._filterDialogSpread.bind(Core_1.Events.CellClick, function (sender, args) {
                self._updateFilterItemsStyle(args);
            });

            self._filterDialogSpread.bind(Core_1.Events.TouchToolStripOpening, function (sender, args) {
                args.handled = true;
            });
        }
    };
    _FilterDialog.prototype._updateHorizontalScrollbar = function (args) {
        if (args.oldTopRow > args.newTopRow) {
            return;
        }
        var self = this;
        var sheet = args.sheet, spread = sheet.parent, newTopRow = args.newTopRow, viewRowCount = sheet._getViewportRowLayout(1).length;
        var itemListWidth = self.itemList.width();
        var colIndex = self._filterDialogColIndex, columnWidth = sheet.getColumnWidth(colIndex);
        if (spread.options.showVerticalScrollbar) {
            itemListWidth -= 22;
        }
        var baseWidth = Math.max(sheet.getColumnCount() * columnWidth, itemListWidth);
        self._isShowHorizontalScrollbar(sheet, baseWidth, columnWidth, newTopRow, viewRowCount);
    };
    _FilterDialog.prototype._isShowHorizontalScrollbar = function (sheet, baseWidth, columnWidth, newTopCount, viewRowCount, data) {
        var width = 0, contentWidth = 0;
        var self = this, spread = sheet.parent;
        var colIndex = self._filterDialogColIndex;
        var rowCount = newTopCount + viewRowCount;
        var storage = sheet.outlineColumn._getStorage();
        var rc = Math.min(rowCount, sheet.getRowCount());
        for (var i = newTopCount; i < rc; i++) {
            var text = (data && data[i].name) || sheet.getText(i, colIndex);
            var outlineColumnPosition = storage[i].cellContent.left;
            var textWidth = Core_1._WordWrapHelper._measureText(text);
            contentWidth = textWidth + outlineColumnPosition - baseWidth;
            if (contentWidth > 0 && contentWidth > width) {
                width = contentWidth;
            }
        }
        if (width > 0) {
            sheet.addColumns(sheet.getColumnCount(), Math.ceil(width / columnWidth));
            spread.options.showHorizontalScrollbar = true;
        }
    };
    _FilterDialog.prototype._updateFilterItemsStyle = function (args) {
        var self = this, sheet = args.sheet, row = args.row, sheetArea = args.sheetArea, col = self._filterDialogColIndex;
        self.activeItemIndex = row;
        var outlineColumnCheckbocStatus = self._filterDialogSheet.outlineColumn.getCheckStatus();
        if (self.dataSource[0].key === 'add_current' && row === 0) {
            self._addCurrent = outlineColumnCheckbocStatus[0] === 1;
        }
        sheet.suspendPaint();
        if (!args.ignoreClick && sheet._currentTarget) {
            var cellTypeHitInfo = sheet._currentTarget.cellTypeHitInfo;
            var outlineColumnHitInfo = cellTypeHitInfo && cellTypeHitInfo.outlineColumnHitInfo;
            var indicator = outlineColumnHitInfo && outlineColumnHitInfo.indicator;
            if (!indicator) {
                if (sheet.outlineColumn.getCheckStatus(row, col) === self.dataSource[row].status) {
                    var outlineColumn = sheet.outlineColumn;
                    outlineColumn.setCheckStatus(row, self._updateItemCheckStatus(self.dataSource[row].status));
                }
                self._updateDataSourceStatus();
            }
        }
        if (sheet._isTouchMode) {
            sheet._selectionIndicatorColor('transparent');
        }
        var hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, this._container[0]);
        if (arrayHelper_getLength(hoverItem) > 0) {
            removeCssClass(hoverItem, EXTERNAL_AND_FILTER_ITEM_HOVER_CLASS);
        }
        else {
            self._clearFilterItemsStyle(sheet);
        }
        var style = sheet.getStyle(row, col, sheetArea);
        var newStyle = style && style.clone() || new Core_1.Style();

        var spanEle = Core_1.GC$(createElement(DIV));
        addCssClass(spanEle, FILTER_CLASS);
        this._container.append(spanEle);
        var backColor = spanEle.css('backgroundColor');
        var color = spanEle.css('color');
        spanEle.remove();
        newStyle.backColor = backColor;
        newStyle.foreColor = color;
        sheet.setStyle(row, -1, newStyle);
        sheet.resumePaint();
        self._updateCheckedValues();
        self._setButtonState();
    };
    _FilterDialog.prototype._updateDataSourceStatus = function () {
        var self = this, sheet = self._filterDialogSheet, outlineColumn = sheet.outlineColumn;
        var checkedStatus = outlineColumn.getCheckStatus(), index = 0;
        while (index < checkedStatus.length) {
            self.dataSource[index].status = checkedStatus[index];
            index++;
        }
    };
    _FilterDialog.prototype._updateItemCheckStatus = function (oldStatus) {
        if (oldStatus === 1 ) {
            return 2 ;
        }
        return 1 ;
    };
    _FilterDialog.prototype._clearFilterItemsStyle = function (sheet) {
        var rowCount = sheet.getRowCount(), col = this._filterDialogColIndex;
        for (var i = 0; i < rowCount; i++) {
            var defaultStyle = sheet.getActualStyle(i, col);
            if (defaultStyle.backColor || defaultStyle.foreColor) {
                defaultStyle.foreColor = defaultStyle.backColor = void 0;
                sheet.setStyle(i, -1, defaultStyle);
                break;
            }
        }
    };
    _FilterDialog.prototype._updateCheckedValues = function () {
        var self = this;
        var checkedStatus = self._filterDialogSheet.outlineColumn.getCheckStatus(), loop = 0, currentValues = self._searchedValues || self._allCheckedValues ;
        var previewItemsData = self._previewItemsData, data, index = 0;
        if (self.dataSource[0].key === 'add_current') {
            loop = 1;
        }
        self._allCheckedValues = [];
        for (var i = 0; i < previewItemsData.length; i++) {
            data = previewItemsData[i];
            if (index >= currentValues.length) {
                break;
            }
            if (data.key !== currentValues[index].text) {
                continue;
            }
            index++;
            var options = data.children, tempStatus = keyword_undefined;
            for (var j = 0; j < options.length; j++) {
                var option = options[j];
                var status_1 = checkedStatus[loop];
                if (option.show !== false) {
                    loop += 1;
                }
                tempStatus = status_1 || tempStatus;
                if (status_1 !== 3 ) {
                    option.status = status_1;
                }
            }
            if (tempStatus !== 2 ) {
                self._allCheckedValues.push({ text: data.key, value: data.value, type: data.type });
            }
            else {
                var allCheckedValuesIncludeNullArray = self._allCheckedValuesIncludeNull;
                if (allCheckedValuesIncludeNullArray[i]) {
                    if (allCheckedValuesIncludeNullArray[i].value === data.value) {
                        self._allCheckedValuesIncludeNull[i] = null;
                    }
                    else {
                        var flagIndex = i + 1;
                        while (flagIndex < allCheckedValuesIncludeNullArray.length) {
                            if (allCheckedValuesIncludeNullArray[flagIndex] && allCheckedValuesIncludeNullArray[flagIndex].value === data.value) {
                                self._allCheckedValuesIncludeNull[flagIndex] = null;
                                break;
                            }
                            flagIndex++;
                        }
                    }
                }
            }
        }
    };
    _FilterDialog.prototype._updateFilterItemState = function (event, isCheckAll) {
        var self = this, sheet = self._filterDialogSheet, status = filterDialogCheckedStatus[isCheckAll];
        sheet.suspendPaint();
        sheet.outlineColumn._setCheckStatusAll(status);
        sheet.resumePaint();
        self._updateDataSourceStatus();
        self._allCheckedValues = isCheckAll ? concatWithEmptyArray(self._searchedValues) : [];
        if (!isCheckAll && self._addCurrent) {
            self._addCurrent = false;
        }
        if (isCheckAll && self._addCurrentItem) {
            var firstStorage = sheet.outlineColumn._viewModel._storage[0];
            if (firstStorage && firstStorage.checkBox) {
                sheet.outlineColumn._viewModel._storage[0].checkBox.checkStatus = 0;
            }
            sheet.outlineColumn.refresh();
        }
        self._setButtonState();
        util_cancelDefault(event);
    };
    _FilterDialog.prototype._setCurrentItemByID = function (id) {
        switch (id) {
            case MAJOR_FILTER_TR:
                this._currentSubMenu = this._cellValueSubMenu;
                break;
            case COLOR_FILTER_TR:
                this._currentSubMenu = this._colorFilterSubMenu;
                break;
            case SORT_COLOR_TR:
                this._currentSubMenu = this._colorSortSubMenu;
                break;
        }
    };
    _FilterDialog.prototype._keyDownSubMenu = function (subMenu) {
        var self = this;
        self._currentSubMenu = subMenu;
        self._currentSubMenu._show();
        self._currentSubMenu._hoverFirstItem();
    };
    _FilterDialog.prototype._enterKeyHandle = function (hoverItem) {
        var len = arrayHelper_getLength(hoverItem);
        if (len === 0) {
            return;
        }
        var self = this, itemID = hoverItem.attr('id'), isSortAscID = itemID === SORT_ASC_TR;
        if (len === 1) {
            if (isSortAscID || itemID === SORT_DEC_TR) {
                self._sortByUser(isSortAscID);
                self.close();
            }
            else if (itemID === CANCEL_ID) {
                self.close();
            }
            else if (itemID === MAJOR_FILTER_TR) {
                if (self._currentSubMenu !== keyword_null) {
                    self._currentSubMenu._confirmHoverHandle();
                }
                else {
                    self._keyDownSubMenu(self._cellValueSubMenu);
                }
            }
            else if (itemID === COLOR_FILTER_TR) {
                self._keyDownSubMenu(self._colorFilterSubMenu);
            }
            else if (itemID === SORT_COLOR_TR) {
                self._keyDownSubMenu(self._colorSortSubMenu);
            }
            else if (itemID === CLEAR_FILTER_TR) {
                self._clearFilter();
            }
            else {
                Core_1.GC$('#' + OK_ID).trigger(CLICK);
            }
        }
        else if (arrayHelper_getLength(hoverItem) === 2 || arrayHelper_getLength(hoverItem) === 3) {
            self._currentSubMenu && self._currentSubMenu._confirmHoverHandle();
        }
        else {
            Core_1.GC$('#' + OK_ID).trigger(CLICK);
        }
    };

    _FilterDialog.prototype._spaceKeyHandler = function (hoverItem, hoverItemId) {
        var self = this;

        if (hoverItem[0] && hoverItem[0].nodeName === 'INPUT') {
            return false;
        }
        if (!arrayHelper_getLength(hoverItem)) {
            if (!isNullOrUndefined(this.activeItemIndex)) {
                var sheet = self._filterDialogSheet, row = this.activeItemIndex, col = 0;
                if (sheet.outlineColumn.getCheckStatus(row, col) === self.dataSource[row].status) {
                    var outlineColumn = sheet.outlineColumn;
                    outlineColumn.setCheckStatus(row, self._updateItemCheckStatus(self.dataSource[row].status));
                }
                self._updateDataSourceStatus();
            }
        }
        else {
            if (self._currentSubMenu === keyword_null) {
                self._setCurrentItemByID(hoverItemId);
            }
            if (self._currentSubMenu !== keyword_null && !self._currentSubMenu._isNullMenu) {
                self._currentSubMenu._showMenuHandle();
            }

            hoverItem.trigger(MOUSE_DOWN);
            hoverItem.trigger(MOUSE_UP);
            hoverItem.trigger(CLICK);
        }
        return true;
    };
    _FilterDialog.prototype._processFilterItemList = function () {
        var self = this, previewItemsData = self._previewItemsData, searchedValues = self._searchedValues, index = 0, filterItemList = [];
        for (var i = 0; i < previewItemsData.length; i++) {
            if (previewItemsData[i].key !== searchedValues[index].text) {
                continue;
            }
            index++;
            var options = previewItemsData[i].children;
            for (var j = 0; j < options.length; j++) {
                var option = options[j];
                if (option.show !== false) {
                    filterItemList.push(option.value || previewItemsData[i].key);
                }
            }
        }
        return filterItemList;
    };
    _FilterDialog.prototype._filterKeyDownUpDownTab = function (keyIndex, hoverItem, isShiftKey) {
        var self = this, elementList = self.elementList, result;
        if (!arrayHelper_getLength(hoverItem) && isNullOrUndefined(self.activeItemIndex)) {
            result = elementList[0];
        }
        else {
            arrayHelper_getLength(hoverItem) ? removeCssClass(hoverItem, EXTERNAL_AND_FILTER_ITEM_HOVER_CLASS) : self._clearFilterItemsStyle(self._filterDialogSheet);
            var filterItemList = self._processFilterItemList();
            if (keyIndex === 4) {
                result = self._filterKeyDownUpDown(filterItemList, hoverItem, isShiftKey);
            }
            else {
                result = self._filterKeyDownTab(filterItemList, hoverItem, keyIndex);
            }
        }
        return result;
    };
    _FilterDialog.prototype._filterKeyDownTab = function (filterItemList, hoverItem, keyIndex) {
        var self = this, elementList = self.elementList, hoverItemElement = hoverItem[0], targetItem, elementLength = elementList.length - 2 ;
        var navList = concatWithEmptyArray((elementList));
        var activeItemIndex = self.activeItemIndex || 0, index = 0;
        for (var i = 0; i < arrayHelper_getLength(filterItemList); i++) {
            navList.splice(-2, 0, filterItemList[i]);
        }
        var downItemIndex = hoverItemElement ? inArray(hoverItemElement, navList) : elementLength + activeItemIndex, isDownKey = keyIndex === 3 ;
        if (downItemIndex >= 0) {
            targetItem = isDownKey ? navList[downItemIndex + 1] : navList[downItemIndex - 1];
            activeItemIndex = activeItemIndex || 0;
            index = isDownKey ? downItemIndex + 1 : downItemIndex - 1;
            if (inArray(targetItem, filterItemList) >= 0 && arrayHelper_getLength(hoverItem) > 0) {
                downItemIndex = isDownKey ? downItemIndex + activeItemIndex : activeItemIndex + (elementList.length - 2);
                targetItem = isDownKey ? navList[downItemIndex + 1] : navList[downItemIndex];
                index = isDownKey ? downItemIndex + 1 : downItemIndex;
            }
            while (isDownKey && downItemIndex < arrayHelper_getLength(navList) && self._isElementDisabled(targetItem)) {
                index = downItemIndex + 1;
                downItemIndex += 1;
                targetItem = navList[downItemIndex + 1];
            }
            if (!isDownKey) {
                while (downItemIndex > 0 && self._isElementDisabled(targetItem)) {
                    index = downItemIndex - 1;
                    downItemIndex -= 1;
                    targetItem = navList[downItemIndex - 1];
                }
                if (!targetItem) {
                    targetItem = navList[arrayHelper_getLength(navList) - 1];
                }
            }
            if (!targetItem) {
                targetItem = navList[0];
            }
        }
        return (typeof targetItem === STRING) ? index - elementLength : targetItem;
    };
    _FilterDialog.prototype._filterKeyDownUpDown = function (filterItemList, hoverItem, isShiftKey) {
        var self = this, elementList = self.elementList, hoverItemElement = hoverItem[0], targetItem, tabItemIndex;
        var tabList = concatWithEmptyArray(elementList);
        var activeItemIndex = self.activeItemIndex || 0;
        tabList.splice(-2, 0, filterItemList[activeItemIndex]);
        if (!arrayHelper_getLength(hoverItem)) {
            if (isShiftKey) {
                targetItem = elementList[elementList.length - 3];
            }
            else {
                targetItem = self._isElementDisabled(elementList[elementList.length - 2]) ? elementList[elementList.length - 1] : elementList[elementList.length - 2];
            }
        }
        else {
            tabItemIndex = inArray(hoverItemElement, tabList);
            if (tabItemIndex >= 0) {
                targetItem = isShiftKey ? (tabList[tabItemIndex - 1] || tabList[arrayHelper_getLength(tabList) - 1]) : tabList[tabItemIndex + 1];
                while (isShiftKey && tabItemIndex > 0 && self._isElementDisabled(targetItem)) {
                    tabItemIndex -= 1;
                    targetItem = tabList[tabItemIndex - 1];
                }
                while (!isShiftKey && self._isElementDisabled(targetItem) && tabItemIndex < arrayHelper_getLength(tabList)) {
                    tabItemIndex += 1;
                    targetItem = tabList[tabItemIndex + 1];
                }
            }
        }
        if (!targetItem) {
            targetItem = tabList[0];
        }
        return (typeof targetItem === STRING) ? activeItemIndex : targetItem;
    };
    _FilterDialog.prototype._filterKeyDown = function (event) {
        var self = this, hoverItem = Core_1.GC$('.' + FILTER_ITEM_HOVER_CLASS, self._container[0]), hoverItemId, keyCode = event.which || event.keyCode , keyIndex = inArray(keyCode, [27 , 13 , 38 , 40 , 9 , 37 , 39 , 32 ]);
        if (hoverItem.length > 0) {
            hoverItemId = hoverItem.attr('id');
        }
        if (keyIndex === 0 ) {
            self.close();
            util_cancelDefault(event);
        }
        else if (keyIndex === 1 ) {
            this._enterKeyHandle(hoverItem);
        }
        else if (keyIndex > 4) {
            if (keyIndex === 5) {
                if (self._currentSubMenu === keyword_null) {
                    self._setCurrentItemByID(hoverItemId);
                }
                if (self._currentSubMenu !== keyword_null) {
                    self._currentSubMenu = self._currentSubMenu._hideMenuHandle();
                }
            }
            else if (keyIndex === 6) {
                if (self._currentSubMenu === keyword_null) {
                    self._setCurrentItemByID(hoverItemId);
                }
                if (self._currentSubMenu !== keyword_null && !self._currentSubMenu._isNullMenu) {
                    self._currentSubMenu._showMenuHandle();
                }
            }
            else if (keyIndex === 7) {
                if (!this._spaceKeyHandler(hoverItem, hoverItemId)) {
                    return;
                }
            }
            util_cancelDefault(event);
        }
        else if (keyIndex > 1 && self._currentSubMenu !== keyword_null && self._currentSubMenu._isShow()) {
            if (keyIndex === 2 || (keyIndex === 4 && event.shiftKey)) {
                self._currentSubMenu._hoverPrevItem();
            }
            else if (keyIndex === 3 || (keyIndex === 4 && !event.shiftKey)) {
                self._currentSubMenu._hoverNextItem();
            }
            util_cancelDefault(event);
        }
        else if (keyIndex > 1) {
            var targetItem = self._filterKeyDownUpDownTab(keyIndex, hoverItem, event.shiftKey);
            if (typeof targetItem === 'number') {
                hoverItem = targetItem;
                self._updateFilterItemsStyle({
                    sheet: self._filterDialogSheet,
                    row: hoverItem,
                    sheetArea: 3,
                    ignoreClick: true
                });
                self._filterDialogSheet._scrollByMoveCell(hoverItem, self._filterDialogColIndex);
                Core_1.GC$('#' + FILTER_CHOOSE_AREA).focus();
                util_cancelDefault(event);
            }
            else {
                hoverItem = Core_1.GC$(targetItem);
                var id = hoverItem.attr('id');
                if (id !== SEARCH_ID && id !== OK_ID && id !== CANCEL_ID && id !== CHECK_ALL_ID && id !== UNCHECK_ALL_ID) {
                    hoverItem.find('a').focus();
                }
                else {
                    hoverItem.focus();
                }
                addCssClass(hoverItem, FILTER_HOVER_CLASS + ' ' + EXTERNAL_AND_FILTER_ITEM_HOVER_CLASS);
                util_cancelDefault(event);
            }
        }
    };
    _FilterDialog.prototype._isElementDisabled = function (ele) {
        if (typeof ele === STRING) {
            return false;
        }
        ele = Core_1.GC$(ele);
        if (arrayHelper_getLength(ele) === 0) {
            return false;
        }
        return !!(ele.hasClass(UI_BUTTON_DISABLED_CLASS) || ele.hasClass(UI_STATE_DISABLED_CLASS) || ele.hasClass(FILTER_BUTTON_DISABLE_CLASS));
    };
    _FilterDialog.prototype._filter = function (filterValues) {
        var self = this, sheet = self.sheet;
        if (!sheet) {
            return;
        }
        try {
            sheet.suspendPaint();
            var filterButtonInfo = self.filterButtonInfo, rowFilter = filterButtonInfo.rowFilter;
            if (!rowFilter) {
                return;
            }
            var column = filterButtonInfo.col;
            var tableName = rowFilter._table ? rowFilter._table.name() : keyword_undefined;
            var cmdOption = {
                tableName: tableName,
                colIndex: column,
                checkedValues: filterValues,
                allValuesLength: arrayHelper_getLength(self._allValues)
            };
            sheet._commandManager().execute({
                cmd: 'filterTextSelectAction',
                sheetName: sheet.name(),
                cmdOption: cmdOption
            });
        }
        finally {
            sheet.resumePaint();
        }
    };
    _FilterDialog.prototype._searchHandler = function () {
        var self = this, value = Core_1.GC$.trim(Core_1.GC$('#' + SEARCH_ID).val().toLowerCase()), previewItemsData = self._previewItemsData, dataSourceCache = self._dataSourceCache;
        var i;
        var checkedItemsObj = {}, allCheckVallCache = self._allCheckedValuesIncludeNull;

        allCheckVallCache.forEach(function (item) {
            if (item && item.repeat) {
                delete item.repeat;
            }
        });
        if (value) {
            var wildcardCriteria = RegexHelper._getWildcardCriteria(value), searchedValues = [], regex = void 0;
            if (!wildcardCriteria) {
                regex = new RegExp(value.replace(self.rEscape, '\\$&'), 'gi');
            }
            for (i = 0; i < previewItemsData.length; i++) {
                var itemData = previewItemsData[i];
                var options = itemData.children;
                for (var j = 0; j < options.length; j++) {
                    var option = options[j];
                    var key = itemData.key;
                    var type = itemData.type;
                    var v = option.value || key;
                    var matchStr = wildcardCriteria && RegexHelper._getRegIgnoreCase(wildcardCriteria).exec(v);
                    if (matchStr && matchStr.index === 0 || !wildcardCriteria && (v.search(regex) !== -1)) {
                        searchedValues.push({ text: key, value: itemData.value, type: type });
                        var cacheValue = allCheckVallCache[i];
                        if (cacheValue && cacheValue.value === itemData.value) {
                            cacheValue.repeat = true;
                        }
                        else {
                            var index = i + 1;
                            while (index < allCheckVallCache.length) {
                                var valueItem = allCheckVallCache[index];
                                if (valueItem.value === itemData.value) {
                                    valueItem.repeat = true;
                                    break;
                                }
                                index++;
                            }
                        }
                        checkedItemsObj[key] = true;
                        break;
                    }
                    else {
                        if (allCheckVallCache[i] && allCheckVallCache[i].repeat) {
                            delete allCheckVallCache[i].repeat;
                        }
                    }
                }
            }
            self._searchEvent = true;
            self._searchedValues = concatWithEmptyArray(searchedValues);
            self._oldCheckedValues = allCheckVallCache;
            self._allCheckedValues = concatWithEmptyArray(searchedValues);
            self._updateItemsLayout(checkedItemsObj);
        }
        else if (arrayHelper_getLength(dataSourceCache)) {
            this._addCurrentItem = false;

            for (i = 0; i < dataSourceCache.length; i++) {
                if (dataSourceCache[i].status !== 1) {
                    dataSourceCache[i].status = 1 ;
                }
            }
            self._searchedValues = concatWithEmptyArray(self._allValues);
            self._allCheckedValues = concatWithEmptyArray(self._allValues);
            self._initFilterItemsSheet(dataSourceCache);
            self.dataSource = dataSourceCache;
        }
        else {
            this._addCurrentItem = false;
            self._dataSourceCache = concatWithEmptyArray(self.dataSource);
        }
    };
    _FilterDialog.prototype._getSortLink = function (id, text) {
        var $link = Core_1.GC$(createElement('a'));
        $link.attr({
            id: id,
            href: BLANK_LINK
        }).text(text).css([DISPLAY, PADDING, 'cursor', MARGIN, 'text-decoration', 'text-align', FONT_SIZE, 'outline', HEIGHT], [BLOCK, '0 6px', 'default', '0px 0 1px 2px', NONE, LEFT, '12px', NONE, 'inherit']);
        addCssClass($link[0], FILTER_ITEM_LINK + FILTER_SORT_CLASS + UI_CORNER_CLASS);
        return $link;
    };
    _FilterDialog.prototype._getSortLinkSpecial = function (id, text, wrap) {
        var clearText = getSR().Clear;
        var $link = Core_1.GC$(createElement('a')).html(clearText.replace('{0}', '"'));
        $link.attr({
            id: id,
            href: BLANK_LINK
        }).css([DISPLAY, PADDING, 'cursor', MARGIN, 'text-decoration', 'text-align', FONT_SIZE, 'outline', HEIGHT, 'white-space'], ['inline', '0 6px', 'default', '0px 0 1px 2px', NONE, LEFT, '12px', NONE, 'inherit', 'nowrap']);
        wrap.append($link);
        var maxWidth = wrap.width() - $link[0].offsetWidth;
        var html, spanText = '<span class="filterName">' + escapeHtml(text) + '</span><span style="vertical-align: top">"</span>';
        html = clearText.replace('{0}', spanText);
        $link.html(html);
        Core_1.GC$('.filterName', $link[0]).css(['max-width', 'overflow', 'text-overflow', DISPLAY, 'vertical-align'], [maxWidth + 'px', 'hidden', 'ellipsis', 'inline-block', 'text-bottom']);
        addCssClass($link[0], FILTER_ITEM_LINK + FILTER_SORT_CLASS + UI_CORNER_CLASS);
    };
    _FilterDialog.prototype._getCheckLink = function (id, text, imageClass) {
        var imgSpan = createElement(SPAN), textSpan = Core_1.GC$(createElement(SPAN)).text(text), linkElement = createElement('a'), $link = Core_1.GC$(linkElement);
        addCssClass(imgSpan, 'gc-check-uncheck-all ' + imageClass);
        $link.attr({
            href: BLANK_LINK,
            id: id
        }).css(['float', MARGIN_LEFT, PADDING, FONT_SIZE, HEIGHT], [LEFT, '7px', '0', '12px', '16px']).append(Core_1.GC$(imgSpan)).append(textSpan);
        addCssClass(linkElement, FILTER_CHECK_CLASS + FILTER_CHECK_CLASS + '-style');
        return $link;
    };
    _FilterDialog.prototype._updateOriginValueTypeNumber = function (type) {
        if (type === 'date') {
            this._originValueTypeCount.Date++;
            return;
        }
        if (type === 'number' || type === 'boolean') {
            this._originValueTypeCount.Number++;
            return;
        }
        if (type === 'string') {
            this._originValueTypeCount.Text++;
            return;
        }
    };
    _FilterDialog.prototype._getDataSourceType = function () {
        var date = this._originValueTypeCount.Date, number = this._originValueTypeCount.Number, text = this._originValueTypeCount.Text;
        var count = date + number + text;
        if (count > date && count > number && count > text) {
            return 'mix';
        }
        if (count === date) {
            return 'type';
        }
        if (count === number) {
            return 'number';
        }
        if (count === text) {
            return 'text';
        }
    };

    _FilterDialog.prototype._isNeedGetCheckValues = function (rowFilter) {
        var result = true;
        var condition = rowFilter._filterItemMap[this.filterButtonInfo.col];
        if (condition && condition.length > 0) {
            condition = condition[0];

            var isTwoEqualDateRelationCondition = this._isTwoEqualDateRelationCondition(condition);
            if (condition.compareType() !== 0 || isTwoEqualDateRelationCondition ||
                (condition.compareType() === 0 && condition.conType() === 5 )) {
                result = false;
            }
        }
        return result;
    };
    _FilterDialog.prototype._isDateFromat = function (formatterStr) {
        var self = this, cacheData = self._dateformatCache[formatterStr];
        if (isNullOrUndefined(cacheData)) {
            var formatterStrTemp = formatterStr.replace(/(\[[^h^m^s]+\])|(General)/ig, '');
            cacheData = numberFormatDateTime._evaluateFormat(formatterStrTemp);
            self._dateformatCache[formatterStr] = cacheData;
        }
        return cacheData;
    };
    _FilterDialog.prototype._parse = function (formatterStr, value) {
        if (getType(value) === 'number' && getType(formatterStr) === 'string' && this._isDateFromat(formatterStr)) {
            return _fromOADate(value);
        }
        return value;
    };
    _FilterDialog.prototype._setColorData = function (cellStyle, fontColorList, cellColorList, theme, row, colorCache) {
        fillColorList(cellStyle !== keyword_null && cellStyle.backColor, cellColorList, theme, row, colorCache);
        fillColorList(cellStyle !== keyword_null && cellStyle.foreColor, fontColorList, theme, row, colorCache);
    };
    _FilterDialog.prototype._initData = function (colIndex) {
        var self = this, rowFilter = self.filterButtonInfo.rowFilter;
        if (!rowFilter) {
            return;
        }
        var sheet = self.sheet, range = sheet._getActualRange(rowFilter.range), range_col = range.col, allUniqueItems = {} , allValues = [], allCheckedItems = {} , allValuesIncludeNull = [];
        var cellStyle, theme = sheet.currentTheme(), colorCache = {}, cellColorList = { data: {}, colorNumber: 0 }, fontColorList = { data: {}, colorNumber: 0 };
        var isOutlineColumn = sheet.outlineColumn && sheet.outlineColumn._isOutlineColumn(colIndex);
        var sortByColorOrFilterByColor = self._displayInfo.sortByColor || self._displayInfo.filterByColor;
        self.hasBlank = false;
        if (colIndex >= range_col && colIndex < range_col + range.colCount) {
            var length_1 = range.rowCount;
            if (sheet._isExternalFilter) {
                length_1 = Math.min(length_1, 100);
            }
            for (var i = 0; i < length_1; i++) {
                var row = range.row + i;
                var isPositiveRowHeight = sheet.getRowHeight(row) > 0;
                var isNeedCheckColorValue = isPositiveRowHeight || !rowFilter.isFiltered() || rowFilter._isRowNotFilteredOutByOtherColumn(row, colIndex) ;
                if (isNeedCheckColorValue && sortByColorOrFilterByColor) {
                    cellStyle = sheet.getActualStyle(row, colIndex, 3 , false , false , true);
                    this._setColorData(cellStyle, fontColorList, cellColorList, theme, row, colorCache);
                }
                self._getFilterData(allUniqueItems, allCheckedItems, allValues, row, colIndex, allValuesIncludeNull);
            }
        }
        self._cellColorList = cellColorList;
        self._fontColorList = fontColorList;
        if (!isOutlineColumn) {
            allValues.sort(allCheckValueSort);
            allValuesIncludeNull.sort(allCheckValueSort);
        }
        self._allValues = allValues;
        self._allCheckedValuesIncludeNull = allValuesIncludeNull;
        self._searchedValues = concatWithEmptyArray(allValues);
        self._previewItemsData = self._processPreviewItemsData(colIndex, allCheckedItems, allValues);
        self._dataSourceCache = self.dataSource;
    };
    _FilterDialog.prototype._getActuralFormatterString = function (row, col, originFormatter) {
        var self = this, sheet = self.sheet;
        if (originFormatter) {
            return originFormatter;
        }
        var style = sheet.getActualStyle(row, col);
        if (style && style._autoFormatter && style._autoFormatter.formatCached) {
            return style._autoFormatter.formatCached;
        }
    };
    _FilterDialog.prototype._getFilterData = function (itemsDic, allCheckedItems, allValues, row, col, allValuesIncludeNull) {
        var self = this, sheet = self.sheet, rowFilter = self.filterButtonInfo.rowFilter, textKey;
        var text = sheet.getText(row, col), value = sheet.getValue(row, col);
        text = text ? text.trim() : text;
        textKey = text;
        var blankString = getSR().Blanks, isPositiveRowHeight = sheet.getRowHeight(row) > 0;
        var isNeedGetCheckValues = self._isNeedGetCheckValues(rowFilter), isOutlineColumn = sheet.outlineColumn && sheet.outlineColumn._isOutlineColumn(col);
        var formatterStr = sheet.getFormatter(row, col);
        if (formatterStr && !isformatString(formatterStr)) {
            value = self._parse(formatterStr, value);
        }
        var actualFormatterString = self._getActuralFormatterString(row, col, formatterStr);
        var type = getValueTypeForFilterDialog(value, actualFormatterString);
        var isDate = type === 'date';
        self._updateOriginValueTypeNumber(type);
        if (self._originValueTypeCount.Date === 1) {
            self._dateFormatter = generateDateFormatter(formatterStr);
        }


        if (isDate) {
            textKey = rowFilter._forceDateFormatter.format(value);
        }
        var checkedCondition = isNeedGetCheckValues
            && ((isPositiveRowHeight || !rowFilter.isFiltered(col))
                || (isOutlineColumn && sheet.getRowVisible(row, 3 , true ) && !rowFilter._isRowfilteredOutByColumn(row, col)));
        if (text === '' &&
            (isPositiveRowHeight
                || !rowFilter.isFiltered()
                || rowFilter._isRowNotFilteredOutByOtherColumn(row, col) )) {
            if (!self.hasBlank) {
                self.hasBlank = true;
                allValues.push({ text: blankString, value: value, type: type });
                if (checkedCondition) {
                    allCheckedItems[blankString] = true;
                    self._allCheckedValues.push({ text: blankString, value: value, type: type });
                    allValuesIncludeNull.push({ text: blankString, value: value, type: type });
                }
                else {
                    allValuesIncludeNull.push({ text: blankString, value: value, noCheck: true, type: type });
                }
            }
        }
        else if (!itemsDic[textKey]) {
            if (sheet.getRowVisible(row, 3 , true) && sheet._getActualRowHeight(row)) {
                if (checkedCondition) {
                    allCheckedItems[text] = true;
                    self._allCheckedValues.push({ text: text, value: value, type: type });
                    allValuesIncludeNull.push({ text: text, value: value, type: type });
                }
                else {
                    allValuesIncludeNull.push({ text: text, value: value, noCheck: true, type: type });
                }
                if (isPositiveRowHeight || !rowFilter.isFiltered() ||
                    rowFilter._isRowNotFilteredOutByOtherColumn(row, col) ) {
                    allValues.push({ text: text, value: value, type: type });
                    itemsDic[textKey] = true;
                }
            }
        }
    };


    _FilterDialog.prototype._processPreviewItemsData = function (colIndex, checkedItemsObj, allValues) {
        var self = this, type, data = [], dataSource = [], year, month, preYear, preMonth, status, i, currentData, dateInfo, childrenInfo;
        var sheet = self.sheet, range = sheet._getActualRange(self.filterButtonInfo.rowFilter.range);
        var outlineColumn = sheet.outlineColumn;
        if (outlineColumn && outlineColumn._isOutlineColumn(colIndex)) {
            for (i = 0; i < allValues.length; i++) {
                var text = allValues[i].text;
                var value = allValues[i].value;
                var valueType = allValues[i].type;
                status = filterDialogCheckedStatus[!!checkedItemsObj[text]];
                currentData = buildTextOrNumberData(sheet, text, value, range.row + i, colIndex, status, valueType);
                data.push(currentData);
                childrenInfo = currentData.children[0];
                if (childrenInfo && childrenInfo.show !== false) {
                    dataSource.push({
                        name: childrenInfo.value || currentData.key,
                        level: childrenInfo.level,
                        status: childrenInfo.status
                    });
                }
            }
        }
        else {
            for (i = 0; i < allValues.length; i++) {
                var text = allValues[i].text;
                var value = allValues[i].value;
                var valueType = allValues[i].type;
                switch (valueType) {
                    case 'date':
                        status = filterDialogCheckedStatus[!!checkedItemsObj[text]];
                        currentData = buildDateData(self._dateFormatter, text, value, status, valueType);
                        dateInfo = currentData.children;
                        year = dateInfo[0].value;
                        month = dateInfo[1].value || dateInfo[0].value;
                        dateInfo[0].show = dateInfo[1].show = true;
                        if (year === preYear) {
                            dateInfo[0].show = false;
                            if (month === preMonth) {
                                dateInfo[1].show = false;
                            }
                        }
                        preYear = year;
                        preMonth = month;
                        data.push(currentData);
                        childrenInfo = currentData.children;
                        for (var j = 0; j < 3; j++) {
                            if (childrenInfo[j] && childrenInfo[j].show !== false) {
                                dataSource.push({
                                    name: childrenInfo[j].value || currentData.key,
                                    level: childrenInfo[j].level,
                                    status: childrenInfo[j].status
                                });
                            }
                        }
                        break;
                    case 'number':
                    case 'string':
                    case 'boolean':
                    case 'blank':
                    case 'array':
                    case 'object':
                        status = filterDialogCheckedStatus[!!checkedItemsObj[text]];
                        currentData = buildTextOrNumberData(sheet, text, value, range.row + i, colIndex, status, valueType);
                        data.push(currentData);
                        childrenInfo = currentData.children[0];
                        if (childrenInfo && childrenInfo.show !== false) {
                            dataSource.push({
                                name: childrenInfo.value || currentData.key,
                                level: childrenInfo.level,
                                status: childrenInfo.status
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        self.dataSource = dataSource;
        return data;
    };
    _FilterDialog.prototype._initFilterItemsLayout = function (data) {
        var self = this, colIndex = 0, itemList = self.itemList;


        var filterItemsLayoutPreviewSpread = new Core_1.Workbook(itemList[0]);
        filterItemsLayoutPreviewSpread._isNested = true;
        self._filterDialogSpread = filterItemsLayoutPreviewSpread;
        self._filterDialogSheet = filterItemsLayoutPreviewSpread.getActiveSheet();
        self._filterDialogColIndex = colIndex;
        self._initFilterItemsSheet(data);
        self._updateDataSourceStatus();
    };
    _FilterDialog.prototype._initFilterItemsSheet = function (data) {
        var self = this, spread = self._filterDialogSpread;
        var itemList = self.itemList, baseWidth = itemList.width(), baseHeight = itemList.height();
        var defaultRowHeight = 20, defaultColumnWidth = 10;
        if (self._filterDialogSpread.sheets.length > 0) {
            self._filterDialogSpread.removeSheet(0);
            self._filterDialogSheet = keyword_undefined;
        }
        spread.addSheet(0, new Core_1.Worksheet('sheet1'));
        var sheet = self._filterDialogSheet = spread.sheets[0];
        spread.suspendEvent();
        sheet.suspendPaint();
        var spreadOptions = spread.options, sheetOptions = sheet.options;
        spreadOptions.allowContextMenu = false;
        spreadOptions.showHorizontalScrollbar = false;
        spreadOptions.showVerticalScrollbar = false;
        spreadOptions.scrollbarMaxAlign = true;
        spreadOptions.tabStripVisible = false;
        spreadOptions.allowUserResize = false;
        spreadOptions.allowUserDragDrop = false;
        spreadOptions.allowUserDragFill = false;
        spreadOptions.allowUserZoom = false;
        spreadOptions.grayAreaBackColor = 'white';
        sheetOptions.colHeaderVisible = false;
        sheetOptions.rowHeaderVisible = false;
        sheetOptions.selectionBackColor = 'transparent';
        sheetOptions.selectionBorderColor = 'transparent';
        sheetOptions.gridline = { showVerticalGridline: false, showHorizontalGridline: false };
        sheetOptions.protectionOptions.allowOutlineRows = true;
        sheetOptions.isProtected = true;
        sheet.defaults.rowHeight = defaultRowHeight ;
        sheet.defaults.colWidth = defaultColumnWidth ;
        sheet.setRowCount(data.length === 0 ? 0 : data.length + 1);
        var defaultStyle = new Core_1.Style();
        defaultStyle.font = '12px "Segoe UI", Calibri, Thonburi, Arial, Verdana, sans-serif, "Mongolian Baiti", "Microsoft Yi Baiti", "Javanese Text"';
        sheet.setDefaultStyle(defaultStyle);
        sheet.outlineColumn.options({
            columnIndex: self._filterDialogColIndex,
            showIndicator: true,
            showCheckBox: true
        });
        sheet.showRowOutline(false);
        sheet.setColumnCount(1);
        if (data.length > 0 && self._searchEvent) {
            self._searchEvent = false;
            data.unshift({
                name: getSR().add_current_filter,
                level: 0,
                status: 0,
                key: 'add_current',
                value: 'add_current',
                children: []
            });
            self._addCurrentItem = true;
        }
        else if (data.length === 0) {
            self._searchEvent = false;
        }
        self._setValueItemsLayout(sheet, data);

        if ((defaultRowHeight * data.length) > baseHeight) {
            spread.options.showVerticalScrollbar = true;
            baseWidth -= 22;
        }

        var viewRowCount = sheet._getViewportRowLayout(1).length;
        self._isShowHorizontalScrollbar(sheet, baseWidth, defaultColumnWidth, 0, viewRowCount, data);

        if (!spread.options.showVerticalScrollbar && spread.options.showHorizontalScrollbar) {
            baseHeight -= 22;
            if ((defaultRowHeight * data.length) > baseHeight) {
                spread.options.showVerticalScrollbar = true;
                baseWidth -= 22;
            }
        }
        var columnCount = Math.ceil(baseWidth / defaultColumnWidth);
        sheet.addColumns(sheet.getColumnCount(), columnCount - 1);
        sheet.outlineColumn.refresh();
        sheet.resumePaint();
        spread.resumeEvent();
    };
    _FilterDialog.prototype._setValueItemsLayout = function (sheet, data) {
        if (data.length === 0) {
            return;
        }
        var self = this, level = 0, status, r = 0, outlineColumn = sheet.outlineColumn, colIndex = self._filterDialogColIndex;
        sheet.suspendPaint();
        sheet.autoGenerateColumns = false;
        sheet.bindColumn(0, 'name');
        sheet.setDataSource(data);
        var dataSourceType = self._getDataSourceType();
        if ((dataSourceType === 'text' || dataSourceType === 'number') && !(self.sheet.outlineColumn && self.sheet.outlineColumn._isOutlineColumn(self.filterButtonInfo.col))) {
            sheet.getCell(-1, colIndex).textIndent(level);
        }
        else {
            for (r = 0; r < data.length; r++) {
                level = data[r].level;
                sheet.getCell(r, colIndex).textIndent(level);
            }
        }
        outlineColumn.refresh();
        for (r = 0; r < data.length; r++) {
            status = data[r].status;
            outlineColumn._internalSetCheckStatus(r, status);
        }
        sheet.resumePaint();
    };
    _FilterDialog.prototype._updateItemsLayout = function (checkedItemsObj) {
        var self = this;
        self._processPreviewItemsData(self.filterButtonInfo.col, checkedItemsObj, self._searchedValues);
        self._initFilterItemsSheet(self.dataSource);
    };
    _FilterDialog.prototype._sortByUser = function (isAsc) {
        var self = this, filterButtonInfo = self.filterButtonInfo, rowFilter = filterButtonInfo.rowFilter, sheet = self.sheet;
        var range = sheet._getActualRange(self.filterButtonInfo.rowFilter.range);
        if (!rowFilter || !sheet || !sheet._canDoSort()) {
            return;
        }
        var sortOption = sheet._getSortOption(range, true, null);
        var colIndex = filterButtonInfo.col, args = {
            sheet: sheet,
            sheetName: sheet.name(),
            col: colIndex,
            ascending: isAsc,
            range: range,
            compareFunction: keyword_undefined,
            groupSort: sortOption.groupSort,
            ignoreHidden: sortOption.ignoreHidden,
            cancel: false
        };
        sheet._trigger(Core_1.Events.RangeSorting, args);
        if (args.cancel === false) {
            var tableName = rowFilter._table ? rowFilter._table.name() : keyword_undefined;
            var cmdOption = {
                tableName: tableName,
                colIndex: colIndex,
                compareFunction: args.compareFunction,
                groupSort: args.groupSort,
                ignoreHidden: args.ignoreHidden,
                isAsc: isAsc
            };
            filter_1._executeCommand('sortFilter', cmdOption, sheet);

            sheet._trigger(Core_1.Events.RangeSorted, args);
        }
    };
    _FilterDialog.prototype._sortByColor = function (color, isBackColor, isAsc) {
        var self = this, filterButtonInfo = self.filterButtonInfo, rowFilter = filterButtonInfo.rowFilter, sheet = self.sheet;
        if (!rowFilter || !sheet || !sheet._canDoSort()) {
            return;
        }


        isAsc = (isAsc === keyword_undefined) ? false : isAsc;
        var colIndex = filterButtonInfo.col, args = {
            sheet: sheet,
            sheetName: sheet._name,
            col: colIndex,
            ascending: isAsc,
            color: color,
            isBackColor: isBackColor,
            cancel: false
        };
        sheet._trigger(Core_1.Events.RangeSorting, args);
        if (args.cancel === false) {
            var tableName = rowFilter._table ? rowFilter._table.name() : keyword_undefined;
            var cmdOption = {
                tableName: tableName,
                colIndex: colIndex,
                isAsc: isAsc,
                color: color,
                isBackColor: isBackColor
            };
            filter_1._executeCommand('sortFilter', cmdOption, sheet);
            sheet._trigger(Core_1.Events.RangeSorted, args);
        }
    };
    _FilterDialog.prototype._setButtonState = function () {
        var $okButton = Core_1.GC$('#' + OK_ID), diabledClassName = UI_BUTTON_DISABLED_CLASS + UI_STATE_DISABLED_CLASS + ' ' + FILTER_BUTTON_DISABLE_CLASS;
        if (this._addCurrent || arrayHelper_getLength(this._allCheckedValues) > 0) {
            $okButton.prop('disabled', false);
            removeCssClass($okButton[0], diabledClassName);
        }
        else {
            $okButton.prop('disabled', true);
            addCssClass($okButton[0], diabledClassName);
        }
    };
    return _FilterDialog;
}(Core_1._BaseDialog));
exports._FilterDialog = _FilterDialog;
/***/ }),

/***/ './dist/plugins/filter/filter.entry.js':
/*!*********************************************!*\
  !*** ./dist/plugins/filter/filter.entry.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(__webpack_require__(/*! ./filter-ns */ './dist/plugins/filter/filter-ns.js'));
__webpack_require__(/*! ./filter-actions */ './dist/plugins/filter/filter-actions.js');
__export(__webpack_require__(/*! ./filter-ui */ './dist/plugins/filter/filter-ui.js'));
__export(__webpack_require__(/*! ./filter */ './dist/plugins/filter/filter.js'));
/***/ }),

/***/ './dist/plugins/filter/filter.js':
/*!***************************************!*\
  !*** ./dist/plugins/filter/filter.js ***!
  \***************************************/
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
var ConditionalFormatting_1 = __webpack_require__(/*! ConditionalFormatting */ 'ConditionalFormatting');
var filter_ui_1 = __webpack_require__(/*! ./filter-ui */ './dist/plugins/filter/filter-ui.js');
var filter_ns_1 = __webpack_require__(/*! ./filter-ns */ './dist/plugins/filter/filter-ns.js');
var filter_button_images_1 = __webpack_require__(/*! ./filter-button-images */ './dist/plugins/filter/filter-button-images.js');
var keyword_null = null, keyword_undefined = void 0, createConditional = ConditionalFormatting_1._createCondition, createRange = Core_1._createRange, isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined, isArray = Common_1.Common._Types._isArray, parseIntFunc = parseInt, arrayHelper = Common_1.Common._ArrayHelper, arrayHelper_indexOf = arrayHelper._indexOf, arrayHelper_contains = arrayHelper._contains, arrayHelper_remove = arrayHelper._remove, arrayHelper_getLength = arrayHelper._getLength, HIDE_ROW_FILTER = 'HideRowFilter';
var $ = Core_1.GC$, $_each = $.each;
var rm = new Common_1.Common.ResourceManager(filter_ns_1.SR, 'Filter');
var getSR = rm.getResource.bind(rm);
function _executeCommand(cmdKey, cmdOption, sheet) {
    var cmdMeta = {
        cmd: cmdKey,
        sheetName: sheet.name(),
        cmdOption: cmdOption
    };
    if (sheet._isExternalFilter) {
        var cmd = Core_1.Commands[cmdMeta.cmd];
        if (cmd) {
            cmd.execute(sheet.parent, cmdMeta, 0 );
        }
    }
    else {
        sheet._commandManager().execute(cmdMeta);
    }
}
exports._executeCommand = _executeCommand;


function findButtonInfo(buttonInfoModel, row, col, sheetArea) {
    var btnInfo, i;
    for (i = 0; i < arrayHelper_getLength(buttonInfoModel); i++) {
        btnInfo = buttonInfoModel[i];
        if (btnInfo && btnInfo.row === row && btnInfo.col === col && btnInfo.sheetArea === sheetArea) {
            return btnInfo;
        }
    }
    return keyword_null;
}
var sheetEx = {


    rowFilter: function (value) {
        var self = this, rowFilter = self._rowFilter;
        if (arrayHelper_getLength(arguments)) {
            self._modelManager._backupFilter(rowFilter, 0 );
            if (rowFilter) {
                rowFilter.reset();
            }
            rowFilter = self._rowFilter = value;
            if (rowFilter) {
                self._rowFilter._sheet = self;
            }
            self._invalidate();
            return self;
        }
        return rowFilter;
    },
    _createFilterButtonModel: function () {
        var self = this, filerBtnInfoModel = [], filter = self.rowFilter(), range = filter && filter.range, tableManager = self.tables, row, col, btnInfo;

        if (range) {
            var range_row = range.row, range_col = range.col, sheetArea = void 0, endCol = range_col < 0 ? getSheetColumnCount(self) : range_col + range.colCount;
            col = range_col < 0 ? 0 : range_col;
            if (range_row < 1) {
                row = getSheetRowCount(self, 1 ) - 1;
                sheetArea = 1 ;
            }
            else {
                row = range_row - 1;
                sheetArea = 3 ;
            }
            if (row >= 0) {
                while (col < endCol) {
                    if (filter.filterButtonVisible(col)) {
                        var spans = self._modelManager.getSpans(createRange(row, col, 1, 1), sheetArea), spanCell = void 0;
                        btnInfo = new filter_ui_1._FilterButtonInfo(filter);
                        btnInfo.sheetArea = sheetArea;
                        btnInfo.row = row;
                        if (arrayHelper_getLength(spans)) {
                            spanCell = spans[0];
                            btnInfo.row = spanCell.row;
                            btnInfo.col = spanCell.col;
                            col += spanCell.colCount;
                        }
                        else {
                            btnInfo.col = col;
                            col++;
                        }
                        filerBtnInfoModel.push(btnInfo);
                    }
                    else {
                        col++;
                    }
                }
            }
        }

        if (tableManager) {
            var tables = tableManager.all();
            $_each(tables, function (p, item) {
                row = item.headerIndex();
                if (item && item.showHeader() && row >= 0) {
                    var cr = item.range(), j = void 0;
                    for (j = 0; j < cr.colCount; j++) {
                        col = cr.col + j;
                        if (item.filterButtonVisible(j)) {
                            btnInfo = new filter_ui_1._FilterButtonInfo(item.rowFilter(), row, col, 3 );
                            filerBtnInfoModel.push(btnInfo);
                        }
                    }
                }
            });
        }
        return filerBtnInfoModel;
    },
    _getFilterButtonModel: function () {
        var self = this, filterButtonsModel = self._filterButtonsModel;
        if (!filterButtonsModel) {
            filterButtonsModel = self._filterButtonsModel = self._createFilterButtonModel();
        }
        return filterButtonsModel;
    },
    _isRowFilterOut: function (row, sheetArea) {
        var filterRowsVisibleInfo = this.filterRowsVisibleInfo;
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3 ;
        }
        return !!((sheetArea === 3 || sheetArea === 2 ) && filterRowsVisibleInfo && !filterRowsVisibleInfo._rowVisible(row));
    },
    _hasRowFilterOut: function () {
        return this.filterRowsVisibleInfo._hasFilterOut();
    },
    _getFilterButtonRect: function (cellRect, sheetArea) {
        var sheet = this, zoomFactor = sheet.zoom(), sheetParent = sheet.parent, filterButtonZoom = zoomFactor > 1 ? 1 : zoomFactor, sheetAreaRowHeight = (sheetArea === 3 || sheetArea === keyword_undefined) ? sheet.defaults.rowHeight : sheet.defaults.colHeaderRowHeight, width = parseIntFunc((Math.min(20, sheetAreaRowHeight) * filterButtonZoom).toString());
        if (sheetParent && sheetParent.options.useTouchLayout) {
            width = parseIntFunc((sheetAreaRowHeight * zoomFactor).toString());
        }
        return {
            x: cellRect.x + cellRect.width - width,
            y: cellRect.y + cellRect.height - width,
            width: width,
            height: width
        };
    }
};
$.extend(Core_1.Worksheet.prototype, sheetEx);


var FilterActionType;
(function (FilterActionType) {
    FilterActionType[FilterActionType['filter'] = 0] = 'filter';

    FilterActionType[FilterActionType['unfilter'] = 1] = 'unfilter';
})(FilterActionType = exports.FilterActionType || (exports.FilterActionType = {}));


function addItemType(item, itemTypeArray) {
    var conditionType = getConditionType(item), compareType = item.compareType();
    if (conditionType === 2 || conditionType === 7 ) {
        var isDateText = item._isDateText;
        if (arrayHelper_indexOf(itemTypeArray, 'T') === -1 && !isDateText) {
            itemTypeArray.push('T');
        }
        else if (arrayHelper_indexOf(itemTypeArray, 'DT') === -1 && isDateText) {
            itemTypeArray.push('DT');
        }
    }
    else if (conditionType === 3 ) {
        if (compareType === 0 && arrayHelper_indexOf(itemTypeArray, 'BC') === -1) {
            itemTypeArray.push('BC');
        }
        else if (compareType === 1 && arrayHelper_indexOf(itemTypeArray, 'FC') === -1) {
            itemTypeArray.push('FC');
        }
    }
    else if (arrayHelper_indexOf(itemTypeArray, 'V') === -1) {
        itemTypeArray.push('V');
    }
}
function getItemType(filterItems) {
    var itemTypeArray = [], i;
    for (i = 0; i < arrayHelper_getLength(filterItems); i++) {
        var filterItem = filterItems[i];
        if (getConditionType(filterItem) === 0 ) {
            var item1 = filterItem.item1(), item2 = filterItem.item2();
            item1 && addItemType(item1, itemTypeArray);
            item2 && addItemType(item2, itemTypeArray);
        }
        else {
            addItemType(filterItem, itemTypeArray);
        }
    }
    return itemTypeArray;
}
function getSheetColumnCount(sheet) {
    return sheet.getColumnCount();
}
function getSheetRowCount(sheet, sheetArea) {
    return sheet.getRowCount(sheetArea);
}
function getConditionType(item) {
    return item.conType();
}
var _defaultDialogVisibleInfo = {
    sortByValue: true,
    sortByColor: true,
    filterByColor: true,
    filterByValue: true,
    listFilterArea: true
};


var RowFilterBase = (function () {
    function RowFilterBase(range) {
        var self = this;


        self.range = range;
        self.reset();


        self.typeName = '';
        self.filterHandler = keyword_null;
    }
    RowFilterBase.prototype._dispose = function () {
        this._sheet = keyword_null;
        this._table = keyword_null;
    };


    RowFilterBase.prototype.filterButtonVisible = function (col, value) {
        var self = this, range = self.range;
        if (isNullOrUndefined(range)) {
            return;
        }
        var sheet = self._sheet, c = self._getStartCol(range), endC = self._getEndCol(range, sheet), args = arguments, filterButtonVisibleInfo = self._filterButtonVisibleInfo, isLegalCol = col >= c && col < endC, argLength = arrayHelper_getLength(args), arg0 = args[0], argType = typeof arg0, i;
        if (argLength === 0) {
            for (i = c; i < endC; i++) {
                if (filterButtonVisibleInfo[i] || filterButtonVisibleInfo[i] === keyword_undefined) {
                    return true;
                }
            }
            return false;
        }
        var colIndex = col;
        if (argLength === 1) {
            if (argType === 'number') {
                if (isLegalCol && filterButtonVisibleInfo[colIndex] === keyword_undefined) {
                    filterButtonVisibleInfo[colIndex] = true;
                }
                return filterButtonVisibleInfo[colIndex];
            }
            else if (argType === 'boolean') {
                sheet && sheet._modelManager._backupFilter(self, 3 );
                for (i = c; i < endC; i++) {
                    filterButtonVisibleInfo[i] = arg0;
                }
            }
        }
        else if (argLength === 2 && isLegalCol) {
            sheet && sheet._modelManager._backupFilter(self, 4 , col);
            filterButtonVisibleInfo[colIndex] = value;
        }
        if (sheet) {
            sheet._invalidate();
        }
        return self;
    };
    RowFilterBase.prototype._getStartCol = function (range) {
        return range.col < 0 ? 0 : range.col;
    };
    RowFilterBase.prototype._getEndCol = function (range, sheet) {
        return (sheet && range.col < 0) ? getSheetColumnCount(sheet) : range.col + range.colCount;
    };


    RowFilterBase.prototype.addFilterItem = function (col, condition) {
        var self = this, sheet = self._sheet, range = self.range, filterItemMap = self._filterItemMap, filterItems = filterItemMap[col];
        if (isNullOrUndefined(condition)) {
            throw new Error(getSR().Exp_FilterItemIsNull);
        }
        if (col < -1 || col >= getSheetColumnCount(sheet)) {
            throw new Error(getSR().Exp_InvalidColumnIndex);
        }
        if (range) {
            sheet._modelManager._backupFilter(self, 5 );
            range = sheet._getActualRange(range);
            if (col < range.col || col >= range.col + range.colCount) {
                return;
            }
            if (!filterItems) {
                filterItems = [];
            }
            if (condition instanceof ConditionalFormatting_1.Condition) {
                filterItems.push(condition);
            }
            else if (isArray(condition)) {
                for (var i = 0; i < condition.length; i++) {
                    filterItems.push(condition[i]);
                }
            }
            filterItemMap[col] = filterItems;
        }
    };


    RowFilterBase.prototype.removeFilterItems = function (col, ignoreUpdateLayout) {
        this._sheet._modelManager._backupFilter(this, 6 );
        this._removeFilterItemsInternal(col);
        this.unfilter(col, ignoreUpdateLayout);
    };
    RowFilterBase.prototype._removeFilterItemsInternal = function (col) {
        var self = this, filterItemMap = self._filterItemMap;
        self._removeFilteredItems(col);
        if (filterItemMap[col]) {
            filterItemMap.splice(col, 1, keyword_null);
        }
    };


    RowFilterBase.prototype.unfilter = function (col, ignoreUpdateLayout) {
        var self = this, sheet = self._sheet;
        if (sheet) {
            sheet._modelManager._backupFilter(self, 2 );
            var columns = [];
            var filteredColumns = self._filteredColumns, i = void 0;
            if (isNullOrUndefined(col)) {
                for (i = arrayHelper_getLength(filteredColumns) - 1; i >= 0; i--) {
                    columns.push(filteredColumns[i]);
                    self._unfilterColumn(filteredColumns[i]);
                }
            }
            else {
                columns.push(col);
                self._unfilterColumn(col);
                self.reFilter(ignoreUpdateLayout);
            }
            if (!ignoreUpdateLayout) {
                self._updateLayoutByFilter(sheet, 1 , columns);
            }
        }
    };
    RowFilterBase.prototype._filterColumn = function (col) {
        var self = this, range = self.range;
        self._unfilterColumn(col);
        if (self._filterItemMap[col] && range) {
            var range_col = range.col;
            if (range_col !== -1 && (col < range_col || col >= range_col + range.colCount)) {
                return;
            }
            range = self._sheet._getActualRange(range);
            var startRow = range.row, rowCount = range.rowCount, dataCache = self._getRowDataCache(col, startRow, rowCount), row = void 0, otherConditionals = self._filterRowsWithTextEquals(startRow, rowCount, col, dataCache);

            otherConditionals.forEach(function (conditional) {
                conditional._cacheConditionExpected();
            });
            for (row = startRow; row < startRow + rowCount; row++) {
                if (!self.isRowFilteredOut(row)) {
                    self._filterRowByCell(otherConditionals, row, col, dataCache);
                }
            }

            otherConditionals.forEach(function (conditional) {
                conditional._clearConditionExpectedCache();
            });

            self._setColumnFilteredState(col, true);
        }
    };
    RowFilterBase.prototype._getRowDataCache = function (col, rBegin, rCount) {
        var self = this, sheet = self._sheet, itemTypeArray = getItemType(self._filterItemMap[col]), dataCache = {}, itemTypeArrayLength = arrayHelper_getLength(itemTypeArray), r, index, item, style;
        for (r = rBegin; r < rBegin + rCount; r++) {
            var cellCache = {};
            for (index = 0; index < itemTypeArrayLength; index++) {
                item = itemTypeArray[index];
                if (item === 'T' ) {
                    var text = sheet.getText(r, col);
                    cellCache[item] = text ? text.trim() : text;
                }
                else if (item === 'DT' ) {
                    var value = sheet.getValue(r, col);
                    var forceDateFormatter = self._forceDateFormatter;
                    cellCache[item] = forceDateFormatter.format(value);
                }
                else if (item === 'BC' ) {
                    style = sheet.getActualStyle(r, col, 3 , false , false , true);
                    if (style) {
                        cellCache[item] = style.backColor;
                    }
                }
                else if (item === 'FC' ) {
                    style = sheet.getActualStyle(r, col, 3 , false , false , true);
                    if (style) {
                        cellCache[item] = style.foreColor;
                    }
                }
                else if (item === 'V' ) {
                    cellCache[item] = sheet.getValue(r, col);
                }
            }
            dataCache[r] = cellCache;
        }
        return dataCache;
    };


    RowFilterBase.prototype.filter = function (col, ignoreUpdateLayout) {
        var self = this, sheet = self._sheet, filterItemMap = self._filterItemMap, i;
        if (sheet) {
            sheet._modelManager._backupFilter(self, 7 );
            var columns = [];
            if (isNullOrUndefined(col)) {
                for (i = 0; i < arrayHelper_getLength(filterItemMap); i++) {
                    if (filterItemMap[i]) {
                        columns.push(i);
                        self._filterColumn(i);
                    }
                }
            }
            else {
                if (!filterItemMap[col]) {
                    return;
                }
                columns.push(col);
                self._filterColumn(col);
            }
            if (!ignoreUpdateLayout) {
                self._updateLayoutByFilter(sheet, 0 , columns);
            }
        }
    };
    RowFilterBase.prototype._updateLayoutByFilter = function (sheet, filterActionType, columns) {
        var self = this;
        sheet._refreshObjectsAboveSheet && sheet._refreshObjectsAboveSheet();
        var filterArgs = self._getFilterArgs(filterActionType, columns);
        self.filterHandler && self.filterHandler(filterArgs);
        self.onFilter(filterArgs);
        sheet._invalidate();
    };
    RowFilterBase.prototype._getFilterArgs = function (filterActionType, columns) {
        var self = this, sheet = self._sheet, range = self.range, filteredRows = [], filteredOutRows = [];
        if (range) {
            var actualRange = sheet._getActualRange(range), startRow = actualRange.row, r = void 0;
            for (r = startRow; r < startRow + actualRange.rowCount; r++) {
                self.isRowFilteredOut(r) ? filteredOutRows.push(r) : filteredRows.push(r);
            }
        }
        return {
            action: filterActionType,
            sheet: sheet,
            range: range,
            filteredRows: filteredRows,
            filteredOutRows: filteredOutRows,
            columns: columns
        };
    };


    RowFilterBase.prototype.onFilter = function (arg) {
    };


    RowFilterBase.prototype.isFiltered = function (col) {
        var filteredColumns = this._filteredColumns;
        return arguments.length ? arrayHelper_contains(filteredColumns, col) : filteredColumns.length > 0;
    };


    RowFilterBase.prototype.isRowFilteredOut = function (row) {
        var self = this, range = self.range;
        if (self.isFiltered() && range) {
            var startRow = range.row, filteredColumnIndexs = self._filteredInRowsWithColIndexs[row];
            return !(startRow !== -1 && (row < startRow || row >= startRow + range.rowCount) ||
                arrayHelper_getLength(filteredColumnIndexs) >= arrayHelper_getLength(self._filteredColumns));
        }
        return false;
    };


    RowFilterBase.prototype.reset = function () {
        var self = this, sheet = self._sheet;
        if (sheet) {
            sheet._modelManager._backupFilter(self, 8 );
        }

        self._sortInfo = keyword_null;
        self.unfilter();
        self._filterItemMap = [];
        self._filteredColumns = [];
        self._filteredItems = [];
        self._filteredInRowsWithColIndexs = {};
        self._filterButtonVisibleInfo = {};
    };
    RowFilterBase.prototype._isFilterHeader = function (row, col, sheetArea) {
        var self = this, result = false, sheet = self._sheet, range = self.range;
        if (range) {
            range = sheet._getActualRange(range, sheetArea);
            var range_row = range.row, range_col = range.col, isLegalCol = col >= range_col && col < range_col + range.colCount;
            if (sheetArea === 1 && row === getSheetRowCount(sheet, sheetArea) - 1 && range_row - 1 < 0 && isLegalCol) {
                result = true;
            }
            else if (sheetArea === 3 && row === range_row - 1 && isLegalCol) {
                result = true;
            }
        }
        return result;
    };


    RowFilterBase.prototype.getFilterItems = function (col) {
        var itemList = this._filterItemMap[col];
        return itemList || [];
    };


    RowFilterBase.prototype.getFilteredItems = function () {
        return this._filteredItems;
    };


    RowFilterBase.prototype.sortColumn = function (col, ascending) {
        this._sortColumn(col, ascending, null);
    };
    RowFilterBase.prototype._sortColumn = function (col, ascending, compareFunction, sortOption, isNeedInvalidEvent) {
        var self = this, sheet = self._sheet;
        if (sheet) {
            var range = sheet._getActualRange(self.range);
            sheet.suspendPaint();
            try {
                sheet._modelManager._backupFilter(self, 1 );
                var sortInfo = { index: col, ascending: ascending, compareFunction: compareFunction }, ret = sheet.sortRange(range.row, range.col, range.rowCount, range.colCount, true, [sortInfo], sortOption, keyword_null, isNeedInvalidEvent);
                if (ret) {
                    self._sortInfo = sortInfo;
                    if (self.isFiltered(col)) {
                        self.reFilter();
                    }
                }
            }
            finally {
                sheet.resumePaint();
            }
        }
    };
    RowFilterBase.prototype.sortColumnByColor = function (col, ascending, color, isBackColor, sortOption, isNeedInvalidEvent) {
        var self = this, sheet = self._sheet;
        if (sheet) {
            var range = sheet._getActualRange(self.range);
            sheet.suspendPaint();
            sheet._modelManager._backupFilter(self, 1 );
            var sortInfo = { index: col, ascending: ascending, color: color, isBackColor: isBackColor }, ret = sheet.sortRange(range.row, range.col, range.rowCount, range.colCount, true, [sortInfo], sortOption, keyword_null, isNeedInvalidEvent);
            if (ret) {
                self._sortInfo = sortInfo;
                if (self.isFiltered(col)) {
                    self.reFilter();
                }
            }
            sheet.resumePaint();
        }
    };


    RowFilterBase.prototype.getSortState = function (col) {
        var sortInfo = this._sortInfo, ret = 0 ;
        if (sortInfo && sortInfo.index === col) {
            ret = sortInfo.ascending ? 1 : 2 ;
        }
        return ret;
    };
    RowFilterBase.prototype.reFilter = function (ignoreUpdateLayout) {
        var i, self = this, filteredColumns = self._filteredColumns,
        filteredColumnsLength = arrayHelper_getLength(filteredColumns);
        self._sheet._modelManager._backupFilter(self, 13 );
        self._filteredInRowsWithColIndexs = {};
        self._filteredItems = [];
        self._filteredColumns = [];
        for (i = 0; i < filteredColumnsLength; i++) {
            self.filter(filteredColumns[i], ignoreUpdateLayout);
        }
    };


    RowFilterBase.prototype.openFilterDialog = function () {
    };
    RowFilterBase.prototype._addFilteredInRowsWithColumnIndex = function (row, col) {
        var filteredInRowsWithColIndexs = this._filteredInRowsWithColIndexs, colIndexs = filteredInRowsWithColIndexs[row];
        if (isNullOrUndefined(colIndexs)) {
            colIndexs = [col];
        }
        else {
            if (arrayHelper_contains(colIndexs, col)) {
                arrayHelper_remove(colIndexs, col);
            }
            colIndexs.push(col);
        }
        filteredInRowsWithColIndexs[row] = colIndexs;
    };
    RowFilterBase.prototype._addFilteredItem = function (filterItem) {
        var filteredItems = this._filteredItems;
        if (!arrayHelper_contains(filteredItems, filterItem)) {
            filteredItems.push(filterItem);
        }
    };
    RowFilterBase.prototype._unfilterColumn = function (col) {
        var self = this, filteredInRowsWithColIndexs = self._filteredInRowsWithColIndexs, colIndexs;
        if (self.range && self.isFiltered(col)) {
            self._setColumnFilteredState(col, false);
            for (var key in filteredInRowsWithColIndexs) {
                if (key) {
                    colIndexs = filteredInRowsWithColIndexs[key];
                    if (colIndexs && arrayHelper_contains(colIndexs, col)) {
                        arrayHelper_remove(colIndexs, col);
                        if (!arrayHelper_getLength(colIndexs)) {
                            filteredInRowsWithColIndexs[key] = keyword_undefined;
                        }
                    }
                }
            }
            self._removeFilteredItems(col);
        }
    };
    RowFilterBase.prototype._setColumnFilteredState = function (col, isFiltered) {
        var filteredColumns = this._filteredColumns;
        if (isFiltered) {
            if (arrayHelper_getLength(filteredColumns)) {
                if (filteredColumns[arrayHelper_getLength(filteredColumns) - 1] === col) {
                    return;
                }
                arrayHelper_remove(filteredColumns, col);
            }
            filteredColumns.push(col);
        }
        else {
            arrayHelper_remove(filteredColumns, col);
        }
    };
    RowFilterBase.prototype._removeFilteredItems = function (col) {
        var self = this, filterItemMap = self._filterItemMap, filterItemMapLength = filterItemMap.length;
        var removeItems = [], otherItems = [], i;
        for (i = 0; i < filterItemMapLength; i++) {
            if (i === col) {
                removeItems = removeItems.concat(filterItemMap[i]);
            }
            else {
                otherItems = otherItems.concat(filterItemMap[i]);
            }
        }
        var removeItemsLength = removeItems.length;
        for (i = 0; i < removeItemsLength; i++) {
            if (!arrayHelper_contains(otherItems, removeItems[i])) {
                arrayHelper_remove(self._filteredItems, removeItems[i]);
            }
        }
    };
    RowFilterBase.prototype._filterRowsWithTextEquals = function (startRow, rowCount, col, dataCache) {
        var self = this, filterItems = self._filterItemMap[col], dataMap = {}, otherConditions = [], i, filterItem;
        for (i = 0; i < arrayHelper_getLength(filterItems); i++) {
            filterItem = filterItems[i];
            if (getConditionType(filterItem) === 2 && filterItem.compareType() === 0 && !filterItem.forceValue2Text() && !filterItem.useWildCards() && !filterItem.ignoreCase() && !filterItem.ignoreBlank() ) {
                if (filterItem._isDateText) {
                    var forceDateFormatter = self._forceDateFormatter;
                    dataMap[forceDateFormatter.format(filterItem._dateValue)] = filterItem;
                }
                else {
                    dataMap[filterItem.expected()] = filterItem;
                }
            }
            else {
                otherConditions.push(filterItem);
            }
        }
        for (i = startRow; i < startRow + rowCount; i++) {
            var isRowFilteredOut = self.isRowFilteredOut(i);
            if (dataMap[dataCache[i].T] !== keyword_undefined || dataMap[dataCache[i].DT] !== keyword_undefined) {
                self._addFilteredInRowsWithColumnIndex(i, col);
                if (!isRowFilteredOut) {
                    self._addFilteredItem(filterItem);
                }
            }
        }
        return otherConditions;
    };
    RowFilterBase.prototype._filterRowByCell = function (filterItems, row, col, dataCache) {
        var self = this, range = self.range, i;
        for (i = 0; i < arrayHelper_getLength(filterItems); i++) {
            var filterItem = filterItems[i], item1 = filterItem.item1(), item2 = filterItem.item2(), value1 = void 0, value2 = void 0;
            if (getConditionType(filterItem) === 0 ) {
                if (item1) {
                    value1 = self._applyNewItemRange(item1, row, col, range, dataCache);
                }
                if (item2) {
                    value2 = self._applyNewItemRange(item2, row, col, range, dataCache);
                }
            }
            else {
                value1 = self._applyNewItemRange(filterItem, row, col, range, dataCache);
            }
            if (filterItem.evaluate(self._sheet, row, col, value1, value2)) {
                self._addFilteredInRowsWithColumnIndex(row, col);
                self._addFilteredItem(filterItem);
                break;
            }
        }
    };
    RowFilterBase.prototype._applyNewItemRange = function (item, row, col, range, dataCache) {
        var self = this, ret = keyword_null, conditionType = getConditionType(item), compareType = item.compareType(), dataCacheRow = dataCache[row];
        if (conditionType === 8 || conditionType === 10 ) {
            var reviseRange = [], actualRange = self._sheet._getActualRange(range), startCol = actualRange.col;
            if (startCol <= col && col < startCol + actualRange.colCount) {
                reviseRange.push(createRange(actualRange.row, col, actualRange.rowCount, 1));
            }
            item.ranges(reviseRange);
        }
        if (conditionType === 2 || conditionType === 7 ) {
            ret = dataCacheRow.T;
        }
        else if (conditionType === 3 ) {
            if (compareType === 0 ) {
                ret = dataCacheRow.BC;
            }
            else if (compareType === 1 ) {
                ret = dataCacheRow.FC;
            }
        }
        else {
            ret = dataCacheRow.V;
        }
        return ret;
    };
    RowFilterBase.prototype._isRowfilteredOutByColumnForSlicer = function (row, col) {
        var self = this, filteredColumns = self._filteredColumns;
        if (!arrayHelper_getLength(filteredColumns)) {
            return false;
        }
        var result, colIndexs = self._filteredInRowsWithColIndexs[row], colIndexs_length = arrayHelper_getLength(colIndexs);
        if (isNullOrUndefined(colIndexs) || colIndexs_length < 0) {
            result = true;
        }
        else {
            var index = arrayHelper_indexOf(colIndexs, col);
            result = index < 0;
        }
        return result;
    };
    RowFilterBase.prototype._isRowfilteredOutByColumn = function (row, col) {
        var self = this, filteredColumns = self._filteredColumns;
        if (!arrayHelper_getLength(filteredColumns)) {
            return false;
        }
        var previousColumn = -1, currentIndex = arrayHelper_indexOf(filteredColumns, col), colIndexs = self._filteredInRowsWithColIndexs[row], colIndexs_length = arrayHelper_getLength(colIndexs);
        if (currentIndex > 0) {
            previousColumn = filteredColumns[currentIndex - 1];
        }

        if (previousColumn > -1) {
            return colIndexs_length ? previousColumn === colIndexs[colIndexs_length - 1]

                : false;
        }
        return !colIndexs_length;
    };
    RowFilterBase.prototype._isRowNotFilteredOutByOtherColumn = function (row, col) {
        var self = this, filteredColumns = self._filteredColumns;
        if (!arrayHelper_getLength(filteredColumns)) {
            return true;
        }
        var currentIndex = arrayHelper_indexOf(filteredColumns, col), colIndexs = self._filteredInRowsWithColIndexs[row], colIndexs_length = arrayHelper_getLength(colIndexs) || 0;
        if (colIndexs_length >= arrayHelper_getLength(filteredColumns)) {
            return true;
        }
        if (currentIndex < 0
            || colIndexs_length < arrayHelper_getLength(filteredColumns) - 1) {
            return false;
        }
        return !colIndexs || arrayHelper_indexOf(colIndexs, col) < 0;
    };
    RowFilterBase.prototype._onRowsAdded = function (row, count, rowExpand) {
        var self = this, range = self.range;
        if (!range) {
            return;
        }
        var endRow = getSheetRowCount(self._sheet) - count - 1, range_row = range.row, range_col = range.col, range_rowCount = range.rowCount, range_colCount = range.colCount;
        if (range_row > -1) {
            endRow = range_row + range_rowCount - 1;


            if (row < range_row || (rowExpand && row === range_row && row === 0)) {
                self._setRangeInternal(createRange(range_row + count, range_col, range_rowCount, range_colCount));
            }
            else if (row < range_row + range_rowCount) {
                self._setRangeInternal(createRange(range_row, range_col, range_rowCount + count, range_colCount));
            }
        }
        var filteredInRowsWithColIndexs = self._filteredInRowsWithColIndexs;
        if (self.isFiltered() && filteredInRowsWithColIndexs) {
            var rowKeys = [], i = void 0;
            for (i = 0; i < arrayHelper_getLength(filteredInRowsWithColIndexs); i++) {
                rowKeys.push(i);
            }
            rowKeys.sort();
            for (i = 0; i < arrayHelper_getLength(rowKeys); i++) {
                var oldKey = rowKeys[i];
                if (oldKey >= row && oldKey <= endRow) {
                    filteredInRowsWithColIndexs[oldKey + count] = filteredInRowsWithColIndexs[oldKey];
                    filteredInRowsWithColIndexs[oldKey] = keyword_undefined;
                }
            }
        }
    };
    RowFilterBase.prototype._onColumnsAdded = function (column, count) {
        var self = this, range = self._table ? self._table.dataRange() : self.range;
        if (!range) {
            return;
        }
        var range_row = range.row, range_col = range.col, range_rowCount = range.rowCount, range_colCount = range.colCount, addCount = 0, startColumn = -1, columnCount = 0, col;
        if (column >= 0 && self._isSorted()) {
            for (col = 0; col < count; col++) {
                if (col + column <= self._sortedColumn()) {
                    addCount++;
                }
            }
            self._sortedColumn(self._sortedColumn() + addCount);
        }
        if (range_col > -1) {
            if (column <= range_col) {
                startColumn = range_col;
                columnCount = range_colCount;
                self._setRangeInternal(createRange(range_row, range_col + count, range_rowCount, range_colCount));
            }
            else if (column < range_col + range_colCount) {
                startColumn = column;
                columnCount = range_colCount - (column - range_col);
                self._setRangeInternal(createRange(range_row, range_col, range_rowCount, range_colCount + count));
            }
        }
        if (startColumn < 0) {
            startColumn = 0;
            columnCount = getSheetColumnCount(self._sheet) - count;
        }
        for (col = startColumn + columnCount - 1; col >= startColumn; col--) {
            if (col >= column) {
                var newColumn = col + count, index = arrayHelper_indexOf(self._filteredColumns, col);

                if (index >= 0) {
                    self._filteredColumns[index] = newColumn;
                }

                var conditions = self._filterItemMap[col];
                if (arrayHelper_getLength(conditions)) {
                    arrayHelper_remove(self._filterItemMap, col);
                    self._filterItemMap[newColumn] = conditions;
                }
            }
        }
        self.reFilter();
    };
    RowFilterBase.prototype._onRowsRemoved = function (row, count) {
        var self = this, range = self.range, sheet = self._sheet;
        if (!range) {
            return;
        }
        var startRow = 0, endRow = getSheetRowCount(sheet) + count - 1, range_row = range.row, range_col = range.col, range_rowCount = range.rowCount, range_colCount = range.colCount;
        if (range_row > -1) {
            startRow = range_row;
            endRow = range_row + range_rowCount - 1;
            if (row <= range_row) {
                if (sheet._frozenRowsAsColumnHeadersFlag) {
                    self._setRangeInternal(createRange(row, range_col, range_rowCount, range_colCount));
                    delete sheet._frozenRowsAsColumnHeadersFlag;
                }
                else if (range_row === row + 1 || range_row + range_rowCount <= row + count) {
                    self._setRangeInternal(keyword_null);
                }
                else if (range_row < row + count) {
                    self._setRangeInternal(createRange(row, range_col, range_row + range_rowCount - (row + count), range_colCount));
                }
                else {
                    self._setRangeInternal(createRange(range_row - count, range_col, range_rowCount, range_colCount));
                }
            }
            else if (row < range_row + range_rowCount) {
                self._setRangeInternal(createRange(range_row, range_col, range_rowCount - Math.min(range_row + range_rowCount - row, count), range_colCount));
            }
        }
        var filteredInRowsWithColIndexs = self._filteredInRowsWithColIndexs, i;
        if (self.isFiltered() && filteredInRowsWithColIndexs) {
            for (i = startRow; i <= endRow; i++) {
                if (i >= row && i < row + count) {
                    filteredInRowsWithColIndexs[i] = keyword_undefined;
                }
                else if (i >= row + count) {
                    var oldKey = i, oldValue = filteredInRowsWithColIndexs[oldKey];
                    if (oldValue) {
                        filteredInRowsWithColIndexs[oldKey - count] = oldValue;
                        filteredInRowsWithColIndexs[oldKey] = keyword_undefined;
                    }
                }
            }
        }
    };
    RowFilterBase.prototype._setRangeInternal = function (newRange) {
        this._sheet._modelManager._backupFilter(this, 14 );
        this.range = newRange;
    };
    RowFilterBase.prototype._updateRange = function (newRange) {
        var self = this, sheet = self._sheet, oldRange = self.range, i, index;
        if (oldRange) {
            if (!newRange) {
                self.reset();
            }
            else if (!newRange.equals(oldRange)) {
                var oldCol = oldRange.col, oldColCount = oldRange.colCount, newCol = newRange.col, newColCount = newRange.colCount, columnCount = getSheetColumnCount(sheet);
                if (self.isFiltered() && !(oldCol < 0 && newCol < 0)) {
                    if (oldCol < 0) {
                        oldCol = 0;
                        oldColCount = columnCount;
                    }
                    if (newCol < 0) {
                        newCol = 0;
                        newColCount = columnCount;
                    }
                    for (i = 0; i < oldColCount; i++) {
                        index = oldCol + i;
                        if (newCol > index || index >= newCol + newColCount) {
                            self.removeFilterItems(index);
                        }
                    }
                }

                var oldRow = oldRange.row, oldRowCount = oldRange.rowCount, newRow = newRange.row, newRowCount = newRange.rowCount, rowCount = getSheetRowCount(sheet);
                if (self.isFiltered() && self._filteredInRowsWithColIndexs && !(oldRow < 0 && newRow < 0)) {
                    if (oldRow < 0) {
                        oldRow = 0;
                        oldRowCount = rowCount;
                    }
                    if (newRow < 0) {
                        newRow = 0;
                        newRowCount = rowCount;
                    }
                    for (i = 0; i < oldRowCount; i++) {
                        index = oldRow + i;
                        if (newRow > index || index >= newRow + newRowCount) {
                            self._filteredInRowsWithColIndexs[index] = keyword_undefined;
                        }
                    }
                }
            }
        }
        if (self._isSorted() && !(newRange && newRange.contains(-1, self._sortedColumn()))) {
            self._sortInfo = keyword_null;
        }
        self._setRangeInternal(newRange);
    };
    RowFilterBase.prototype._onColumnsRemoved = function (column, count) {
        var self = this, range = self.range, sortInfoIndex = self._sortedColumn(), removeEnd = column + count;
        if (!range) {
            return;
        }
        if (column >= 0 && self._isSorted()) {
            if (sortInfoIndex >= column && sortInfoIndex < removeEnd) {
                self._sortedColumn(-1);
            }
            else if (sortInfoIndex >= removeEnd) {
                self._sortedColumn(sortInfoIndex - count);
            }
        }
        var range_row = range.row, range_col = range.col, range_rowCount = range.rowCount, range_colCount, c;
        if (range_col < 0) {
            range_col = 0;
            range_colCount = getSheetColumnCount(self._sheet) + count;
        }
        else {
            range_colCount = range.colCount;
        }
        for (c = range_col; c < range_col + range_colCount; c++) {
            if (c >= column) {
                if (c < removeEnd) {
                    self.removeFilterItems(c);
                }
                else {
                    var newColumn = c - count, index = arrayHelper_indexOf(self._filteredColumns, c), conditions = self._filterItemMap[c];

                    if (index >= 0) {
                        self._filteredColumns[index] = newColumn;
                    }

                    if (arrayHelper_getLength(conditions)) {
                        arrayHelper_remove(self._filterItemMap, c);
                        self._filterItemMap[newColumn] = conditions;
                    }
                }
            }
        }
        if (range_col >= 0) {
            if (column < range_col) {
                if (removeEnd <= range_col) {
                    self._setRangeInternal(createRange(range_row, range_col - count, range_rowCount, range_colCount));
                }
                else if (removeEnd <= range_col + range_colCount) {
                    self._setRangeInternal(createRange(range_row, column, range_rowCount, range_col + range_colCount - removeEnd));
                }
                else {
                    self._setRangeInternal(keyword_null);
                }
            }
            else if (column < range_col + range_colCount) {
                if (removeEnd <= range_col + range_colCount) {
                    self._setRangeInternal(createRange(range_row, range_col, range_rowCount, range_colCount - count));
                }
                else {
                    self._setRangeInternal(createRange(range_row, range_col, range_rowCount, column - range_col));
                }
            }
        }
        self.reFilter();
    };
    RowFilterBase.prototype._isSorted = function () {
        var self = this, sortInfo = self._sortInfo;
        return sortInfo ? sortInfo.index > -1 && self.getSortState(sortInfo.index) !== 0 : false;
    };
    RowFilterBase.prototype._sortedColumn = function (col) {
        var self = this, sortInfo = self._sortInfo, ret;
        if (arrayHelper_getLength(arguments)) {
            if (sortInfo) {
                sortInfo.index = col;
            }
            else {
                self._sortInfo = { index: col, ascending: false };
            }
            ret = self;
        }
        else {
            ret = sortInfo ? sortInfo.index : -1;
        }
        return ret;
    };
    RowFilterBase.prototype._clear = function (row, column, rowCount, columnCount) {
        var self = this, range = self.range;
        if (!range) {
            return;
        }
        var clearRange = createRange(row, column, rowCount, columnCount);
        if (self.filterButtonVisible()) {
            var newRow = range.row - 1, newRowCount = range.rowCount + 1;
            if (newRow < 0) {
                newRow = -1;
                newRowCount = -1;
            }
            if (clearRange.containsRange(createRange(newRow, range.col, newRowCount, range.colCount))) {
                self.unfilter();
            }
        }
        else if (clearRange.containsRange(range)) {
            self.unfilter();
        }
    };


    RowFilterBase.prototype.fromJSON = function (settings, noSchema) {
        if (!settings) {
            return;
        }
        var self = this, jsonRange = settings.range, jsonFilterItemMap = settings.filterItemMap, selfFilterItemMap = self._filterItemMap, jsonSortInfo = settings.sortInfo, showFilterButton = settings.showFilterButton, filterButtonVisibleInfo = settings.filterButtonVisibleInfo, i, k, filteredColumns;
        if (jsonRange) {
            self.range = createRange(jsonRange.row, jsonRange.col, jsonRange.rowCount, jsonRange.colCount);
        }
        if (settings.dialogVisibleInfo) {
            self._dialogVisibleInfo = $.extend({}, _defaultDialogVisibleInfo, settings.dialogVisibleInfo);
        }
        for (i = 0; i < arrayHelper_getLength(jsonFilterItemMap); i++) {
            var jsonFilterItem = jsonFilterItemMap[i], jsonConditions = jsonFilterItem.conditions;
            for (k = 0; k < arrayHelper_getLength(jsonConditions); k++) {
                var jsonCondition = jsonConditions[k];
                if (!jsonCondition) {
                    continue;
                }
                var condition = createConditional(), column = jsonFilterItem.index, filterItems = selfFilterItemMap[column];
                condition.fromJSON(jsonCondition, noSchema);
                if (!filterItems) {
                    filterItems = selfFilterItemMap[column] = [];
                }
                filterItems.push(condition);
            }
        }
        filteredColumns = settings.filteredColumns || settings.filteredColMap;
        for (i = 0; i < arrayHelper_getLength(filteredColumns); i++) {
            if (!isNullOrUndefined(filteredColumns[i])) {
                self._filteredColumns.push(filteredColumns[i]);
            }
        }
        if (jsonSortInfo && jsonSortInfo.color === keyword_undefined) {
            self._sortInfo = { index: jsonSortInfo.index, ascending: jsonSortInfo.ascending };
        }
        else if (jsonSortInfo && jsonSortInfo.color !== keyword_undefined) {
            self._sortInfo = {
                index: jsonSortInfo.index,
                ascending: jsonSortInfo.ascending,
                color: jsonSortInfo.color,
                isBackColor: jsonSortInfo.isBackColor
            };
        }
        if (showFilterButton !== keyword_undefined) {
            var range = self.range;
            if (filterButtonVisibleInfo) {
                self._filterButtonVisibleInfo = filterButtonVisibleInfo;
            }
            else if (range) {
                for (i = self._getStartCol(range); i < self._getEndCol(range, self._sheet); i++) {
                    self._filterButtonVisibleInfo[i] = showFilterButton;
                }
            }
        }
    };


    RowFilterBase.prototype.toJSON = function () {
        var self = this, jsonData = {}, range = self.range, filterButtonVisibleInfo = self._filterButtonVisibleInfo, filterItemMap = self._filterItemMap, filteredColumns = self._filteredColumns, sortInfo = self._sortInfo, filterItemMapData = [], i, k = 0, typeName = self.typeName, adjustRangeForFrozen = self._adjustRangeForFrozen;
        if (adjustRangeForFrozen) {
            jsonData.adjustRangeForFrozen = adjustRangeForFrozen;
        }
        if (range) {
            jsonData.range = range;
        }
        if (typeName) {
            jsonData.typeName = typeName;
        }
        if (self._dialogVisibleInfo) {
            var dialogVisibleInfo = {};
            for (var prop in self._dialogVisibleInfo) {
                if (self._dialogVisibleInfo.hasOwnProperty(prop) && self._dialogVisibleInfo[prop] === false) {
                    dialogVisibleInfo[prop] = false;
                }
            }
            jsonData.dialogVisibleInfo = dialogVisibleInfo;
        }
        for (i = 0; i < arrayHelper_getLength(filterItemMap); i++) {
            var filterItem = filterItemMap[i];
            if (filterItem) {
                var conditions = [], c = void 0;
                for (c = 0; c < arrayHelper_getLength(filterItem); c++) {
                    conditions.push(filterItem[c] ? filterItem[c].toJSON() : keyword_null);
                }
                filterItemMapData[k] = {
                    index: i,
                    conditions: conditions
                };
                k++;
            }
        }
        if (arrayHelper_getLength(filterItemMapData)) {
            jsonData.filterItemMap = filterItemMapData;
        }
        if (arrayHelper_getLength(filteredColumns)) {
            jsonData.filteredColumns = filteredColumns;
        }
        if (sortInfo) {
            jsonData.sortInfo = sortInfo;
        }
        if (filterButtonVisibleInfo) {
            if ($.isEmptyObject(filterButtonVisibleInfo)) {
                jsonData.showFilterButton = true;
            }
            else {
                jsonData.filterButtonVisibleInfo = $.extend({}, filterButtonVisibleInfo);
                var showFilterButton = false;
                for (i in filterButtonVisibleInfo) {
                    if (filterButtonVisibleInfo[i]) {
                        showFilterButton = true;
                        break;
                    }
                }
                jsonData.showFilterButton = showFilterButton;
            }
        }

        var filteredOutRowArray = [], row, count = self._sheet.getRowCount();
        for (row = 0; row < count; row++) {
            if (self.isRowFilteredOut(row)) {
                filteredOutRowArray.push(row);
            }
        }
        if (filteredOutRowArray.length > 0) {
            jsonData.filteredOutRows = filteredOutRowArray;
        }
        return jsonData;
    };
    RowFilterBase.prototype._canDoFilter = function (sheet) {
        var options = sheet.options;
        return !options.isProtected || options.protectionOptions.allowFilter;
    };
    RowFilterBase.prototype.hitTest = function (target, x, y) {
        var sheet = this._sheet;
        if (!sheet) {
            return;
        }
        var rowViewportIndex = target.rowViewportIndex, colViewportIndex = target.colViewportIndex, hitTestType = target.hitTestType, viewportColumnLayout = sheet._getViewportColumnLayout(colViewportIndex), rowLayout, colLayout, sheetArea;
        if (hitTestType === 1 ) {
            rowLayout = sheet._getColumnHeaderRowLayout().findY(y);
            colLayout = viewportColumnLayout.findX(x);
            sheetArea = 1 ;
        }
        else if (hitTestType === 3 ) {
            rowLayout = sheet._getViewportRowLayout(rowViewportIndex).findY(y);
            colLayout = viewportColumnLayout.findX(x);
            sheetArea = 3 ;
        }
        if (!rowLayout || !colLayout) {
            return keyword_null;
        }
        var row = rowLayout.row, col = colLayout.col, spanCell = sheet.getSpan(row, col, sheetArea), filterButtonModel = sheet._getFilterButtonModel();
        if (spanCell) {
            var spanCell_row = spanCell.row, spanCell_col = spanCell.col;
            if (row !== spanCell_row + spanCell.rowCount - 1 || col !== spanCell_col + spanCell.colCount - 1) {
                return keyword_null;
            }
            row = spanCell_row;
            col = spanCell_col;
        }
        if (filterButtonModel) {
            var btnInfo = findButtonInfo(filterButtonModel, row, col, sheetArea);
            if (btnInfo) {
                var cellRect = sheet.getCellRect(row, col, rowViewportIndex, colViewportIndex), btnRect = sheet._getFilterButtonRect(cellRect, sheetArea);
                if (btnRect.x <= x && x <= btnRect.x + btnRect.width && btnRect.y <= y && y <= btnRect.y + btnRect.height) {
                    return new filter_ui_1._FilterButtonInfo(btnInfo.rowFilter, btnInfo.row, btnInfo.col, btnInfo.sheetArea, btnRect.x, btnRect.y, btnRect.width, btnRect.height);
                }
            }
        }
        return keyword_null;
    };
    return RowFilterBase;
}());
exports.RowFilterBase = RowFilterBase;

var HideRowFilter = (function (_super) {
    __extends(HideRowFilter, _super);


    function HideRowFilter(range) {
        var _this = _super.call(this, range) || this;
        _this.typeName = HIDE_ROW_FILTER;

        _this._dialogVisibleInfo = $.extend({}, _defaultDialogVisibleInfo);
        _this._forceDateFormatter = new Common_1.Formatter.GeneralFormatter('yyyy/mm/dd');
        return _this;
    }
    HideRowFilter.prototype.onFilter = function (args) {
        var self = this, sheet = self._sheet;
        if (sheet) {
            self._updateRowVisibleInfo(sheet, args.filteredRows, args.filteredOutRows);
            sheet._invalidateVScrollbar();
        }
    };


    HideRowFilter.prototype.filterDialogVisibleInfo = function (visibleInfo) {
        if (arguments.length === 0) {
            if (!this._dialogVisibleInfo) {
                this._dialogVisibleInfo = $.extend({}, _defaultDialogVisibleInfo);
            }
            return this._dialogVisibleInfo;
        }
        if (visibleInfo) {
            var dialogVisibleInfo = {};
            if (visibleInfo.sortByValue !== keyword_undefined) {
                dialogVisibleInfo.sortByValue = !!visibleInfo.sortByValue;
            }
            if (visibleInfo.sortByColor !== keyword_undefined) {
                dialogVisibleInfo.sortByColor = !!visibleInfo.sortByColor;
            }
            if (visibleInfo.filterByColor !== keyword_undefined) {
                dialogVisibleInfo.filterByColor = !!visibleInfo.filterByColor;
            }
            if (visibleInfo.filterByValue !== keyword_undefined) {
                dialogVisibleInfo.filterByValue = !!visibleInfo.filterByValue;
            }
            if (visibleInfo.listFilterArea !== keyword_undefined) {
                dialogVisibleInfo.listFilterArea = !!visibleInfo.listFilterArea;
            }
            $.extend(this._dialogVisibleInfo, dialogVisibleInfo);
            return this;
        }
    };
    HideRowFilter.prototype._updateRowVisibleInfo = function (sheet, filteredRows, filteredOutRows) {
        var filterRowsVisibleInfo = sheet.filterRowsVisibleInfo;
        if (filterRowsVisibleInfo) {
            var changedRows = filterRowsVisibleInfo._updateVisible(filteredRows, filteredOutRows);
            sheet.recalcRows && sheet.recalcRows(changedRows);
        }
    };
    HideRowFilter.prototype.openFilterDialog = function (filterButtonHitInfo) {
        var self = this, sheet = self._sheet;
        if (self._canDoFilter(sheet)) {
            var filterDialog = new filter_ui_1._FilterDialog(sheet.parent._getContainerDiv(), sheet, filterButtonHitInfo, self.filterDialogVisibleInfo());
            sheet._filterDialog = filterDialog;
            filterDialog._open();
        }
    };
    return HideRowFilter;
}(RowFilterBase));
exports.HideRowFilter = HideRowFilter;


var _FilterRowsVisibleInfo = (function () {
    function _FilterRowsVisibleInfo() {
        this._reset();
    }
    _FilterRowsVisibleInfo.prototype._rowVisible = function (row) {
        if (this.empty) {
            return true;
        }
        var info = this.rowsVisibleInfo[row];
        return isNullOrUndefined(info) ? true : info;
    };
    _FilterRowsVisibleInfo.prototype._updateVisible = function (inRows, outRows) {
        var changedRows = [], oldVisibleInfos = this.rowsVisibleInfo;
        for (var i = 0, len = inRows.length; i < len; i++) {
            var inIndex = inRows[i], oldInInfo = oldVisibleInfos[inIndex];
            if (oldInInfo !== keyword_undefined && oldInInfo !== keyword_null) {
                changedRows.push(inIndex);
            }
            delete oldVisibleInfos[inIndex];
        }
        for (var j = 0, len1 = outRows.length; j < len1; j++) {
            var outIndex = outRows[j], oldOutInfo = oldVisibleInfos[outIndex];
            if (oldOutInfo === keyword_undefined || oldOutInfo === keyword_null) {
                changedRows.push(outIndex);
            }

            oldVisibleInfos[outIndex] = false;
        }
        this.empty = false;
        return changedRows;
    };
    _FilterRowsVisibleInfo.prototype._reset = function () {
        this.rowsVisibleInfo = {};
        this.empty = true;
    };

    _FilterRowsVisibleInfo.prototype._resetByRow = function (row, count) {
        var oldVisibleInfo = this.rowsVisibleInfo, oldInfo;
        for (var i = 0; i < count; i++) {
            oldInfo = oldVisibleInfo[i + row];
            if (!isNullOrUndefined(oldInfo)) {
                delete oldVisibleInfo[i + row];
            }
        }
    };
    _FilterRowsVisibleInfo.prototype._addRows = function (row, count) {
        var oldVisibleInfo = this.rowsVisibleInfo, newInfo = {};
        var keys = Object.keys(oldVisibleInfo), index;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            index = +key;
            if (index >= row) {
                newInfo[index + count] = oldVisibleInfo[index];
            }
            else {
                newInfo[index] = oldVisibleInfo[index];
            }
        }
        this.rowsVisibleInfo = newInfo;
    };
    _FilterRowsVisibleInfo.prototype._removeRows = function (row, count) {
        var oldVisibleInfo = this.rowsVisibleInfo, newInfo = {};
        var keys = Object.keys(oldVisibleInfo);
        var end = row + count, index;
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            index = +key;
            if (index >= row && index < end) {
                delete oldVisibleInfo[index];
                continue;
            }
            if (index >= end) {
                newInfo[index - count] = oldVisibleInfo[index];
            }
            else {
                newInfo[index] = oldVisibleInfo[index];
            }
        }
        this.rowsVisibleInfo = newInfo;
    };
    _FilterRowsVisibleInfo.prototype._hasFilterOut = function () {
        return !this.empty;
    };
    _FilterRowsVisibleInfo.prototype.clone = function () {
        var info = new _FilterRowsVisibleInfo();
        info.rowsVisibleInfo = $.extend({}, this.rowsVisibleInfo);
        info.empty = this.empty;
        return info;
    };
    return _FilterRowsVisibleInfo;
}());

function filterFromJSON(rowFilterData, sheet, noSchema) {
    var rowFilterTypeName = rowFilterData.typeName, rowFilterClass, drf;
    if (!rowFilterTypeName || rowFilterTypeName === HIDE_ROW_FILTER) {
        drf = new HideRowFilter();
    }
    else {
        rowFilterClass = Core_1.getTypeFromString(rowFilterTypeName);
        if (rowFilterClass) {
            drf = new rowFilterClass();
        }
    }
    if (drf) {
        sheet._rowFilter = drf;
        drf._sheet = sheet;
        drf.fromJSON(rowFilterData, noSchema);
        drf.reFilter();
    }
}
function _bindSpreadEvent(sheet) {
    if (sheet) {
        sheet.bind('shiftCellsDown', function (type, data) {
            var rowFilter = sheet.rowFilter();
            if (rowFilter) {
                var row = data.row, col = data.col, changedRowCount = data.changedRowCount, changedColCount = data.changedColCount;
                if (rowFilter.range.row + rowFilter.range.rowCount === row) {
                    row -= 1;
                }
                if (rowFilter.range.col + rowFilter.range.colCount === col) {
                    col -= 1;
                }
                if (rowFilter.range.contains(row, col, 1, 1)) {
                    if (changedRowCount > 0) {
                        rowFilter._onRowsAdded(row, changedRowCount);
                    }
                    else if (changedRowCount < 0) {
                        rowFilter._onRowsRemoved(row, changedRowCount);
                    }
                    if (changedColCount > 0) {
                        rowFilter._onColumnsAdded(col, changedColCount);
                    }
                    else if (changedColCount < 0) {
                        rowFilter._onColumnsRemoved(col, changedColCount);
                    }
                }
            }
        });
    }
}
function _unbindSpreadEvent(sheet) {
    if (sheet) {
        sheet.unbind('shiftCellsDown');
    }
}
var filterAdapter = {
    init: function () {
        var self = this;
        self._rowFilter = keyword_null;
        self.filterRowsVisibleInfo = new _FilterRowsVisibleInfo();


        self._rowStateProviders.push({
            _isVisible: function (row) {
                return self.filterRowsVisibleInfo._rowVisible(row);
            }
        });
        _bindSpreadEvent(self);
    },
    processMouseDown: function (args) {
        var filterButtonHitInfo = args.hitInfo.filterButtonHitInfo;
        if (filterButtonHitInfo) {
            filterButtonHitInfo.rowFilter.openFilterDialog(filterButtonHitInfo);
            args.r = true;
        }
    },
    onLayoutChanged: function (e) {
        var self = this, changeType = e.changeType, row = e.row, rowCount = e.rowCount, col = e.col, colCount = e.colCount, rowFilter = self._rowFilter;
        if (changeType === 'invalidateLayout') {
            self._filterButtonsModel = keyword_null;
            return;
        }
        if (rowFilter) {
            var modelManager = self._modelManager;
            if (changeType === 'addRows') {
                modelManager._onRowsAdded_Filter(row, rowCount, e.rowExpand);
            }
            else if (changeType === 'deleteRows') {
                modelManager._onRowsRemoved_Filter(row, rowCount);
            }
            else if (changeType === 'addColumns') {
                modelManager._onColumnsAdded_Filter(col, colCount);
            }
            else if (changeType === 'deleteColumns') {
                modelManager._onColumnsRemoved_Filter(col, colCount);
            }
            else if (changeType === 'clear' && rowFilter.range) {
                modelManager._clear_Filter(row, col, rowCount, colCount);
            }
        }
    },
    dispose: function () {
        var self = this, filterDialog = self._filterDialog;
        if (filterDialog) {
            filterDialog.close();
        }
        _unbindSpreadEvent(self);
    },
    toJson: function (data, serializationOption) {
        var rowFilter = this._rowFilter;
        var ignoreStyle = serializationOption && serializationOption.ignoreStyle;
        if (rowFilter && !ignoreStyle) {
            data.rowFilter = rowFilter.toJSON();
        }
    },
    fromJson: function (sheetSettings, noSchema, deserializationOptions) {
        var rowFilterData = sheetSettings.rowFilter;
        var ignoreStyle = deserializationOptions && deserializationOptions.ignoreStyle;
        if (rowFilterData && !ignoreStyle) {
            filterFromJSON(rowFilterData, this, noSchema);
        }
    },
    paintCell: function (e) {
        var sheet = this, cell = e.cell, width = cell.width, height = cell.height, cellLayout = cell.cellLayout, imageLoader = sheet._getImageLoader(), filterButtonModel = sheet._getFilterButtonModel(), tmpAddSpans = [], ctx = e.ctx;
        if ((!cellLayout || !arrayHelper_contains(tmpAddSpans, cellLayout)) && filterButtonModel && width > 0 && height > 0) {
            var btnInfo = findButtonInfo(filterButtonModel, cell.row, cell.col, e.sheetArea);
            if (btnInfo) {
                var filterBtnInfo = new filter_ui_1._FilterButtonInfo(btnInfo.rowFilter, btnInfo.row, btnInfo.col, btnInfo.sheetArea, cell.x, cell.y, width, height), filterButtonRect = sheet._getFilterButtonRect(new Core_1.Rect(filterBtnInfo.x, filterBtnInfo.y, filterBtnInfo.width, filterBtnInfo.height), filterBtnInfo.sheetArea), btnWidth = filterButtonRect.width, btnHeight = filterButtonRect.height, btnX = filterButtonRect.x, btnY = filterButtonRect.y, imgSrc = filter_button_images_1.getFilterButtonImageSrc(filterBtnInfo._getState());
                ctx.save();
                ctx.rect(filterBtnInfo.x, filterBtnInfo.y, filterBtnInfo.width, filterBtnInfo.height);
                ctx.clip();
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.fillStyle = '#FFFFFF';
                ctx.strokeStyle = '#CCCCCC';
                ctx.fillRect(btnX + 1, btnY + 1, btnWidth - 3, btnHeight - 3);
                ctx.strokeRect(btnX + 1 - 0.5, btnY + 2 - 0.5, btnWidth - 3, btnHeight - 4);
                try {
                    if (imageLoader._getState(imgSrc)) {
                        ctx.drawImage(imageLoader._getImage(imgSrc), btnX, btnY + 1, btnWidth - 3, btnHeight - 3);
                    }
                    else {
                        imageLoader._addImage(imgSrc);
                    }
                }
                catch (ex) {

                }
                ctx.beginPath();
                ctx.restore();
            }
        }
    }
};
Core_1.Worksheet._registerFeature('filter', filterAdapter);

var ssAdapter = {
    init: function () {
        Core_1.Commands._registerFilterDialogCommand(this.commandManager());
    },
    onCultureChanged: function () {
        getSR();
    }
};
Core_1.Workbook._registerFeature('filter', ssAdapter);
function createRowVisibleInfoArray(visibleInfo) {
    var arr = [];
    var indexes = Object.keys(visibleInfo);
    for (var i = 0; i < indexes.length; i++) {
        arr.push(+indexes[i]);
    }
    return arr;
}
$.extend(Core_1._SheetModelManager.prototype, {
    _backupFilter: function (rowFilter, type) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            if (!changes._originalFilter) {
                changes._originalFilter = [];
            }

            var originalInfo = {
                type: type,
                rowFilter: rowFilter
            };
            switch (type) {
                case 0 :

                    var rowFilterInfo = void 0;
                    if (rowFilter) {
                        rowFilterInfo = {
                            range: rowFilter.range,
                            typeName: rowFilter.typeName,
                            _filteredColumns: rowFilter._filteredColumns.concat([]),
                            _filteredItems: rowFilter._filteredItems.concat([]),
                            _filterItemMap: rowFilter._filterItemMap.concat([]),
                            _filteredInRowsWithColIndexs: $.extend({}, rowFilter._filteredInRowsWithColIndexs),
                            _filterButtonVisibleInfo: $.extend({}, rowFilter._filterButtonVisibleInfo),
                            _sortInfo: $.extend({}, rowFilter._sortInfo)
                        };
                    }
                    else {
                        rowFilterInfo = keyword_null;
                    }
                    var rowsVisibleInfo = self._sheet.filterRowsVisibleInfo.clone();
                    originalInfo._changeInfo = { rowFilter: rowFilterInfo, filterRowsVisibleInfo: rowsVisibleInfo };
                    break;
                case 2 :
                case 7 :
                    originalInfo._changeInfo = {
                        _filteredColumns: rowFilter._filteredColumns.concat([]),
                        filterRowsVisibleInfo: self._sheet.filterRowsVisibleInfo.clone()
                    };
                    break;
                case 1 :
                    originalInfo._changeInfo = rowFilter._sortInfo;
                    break;
                case 3 :
                    originalInfo._changeInfo = $.extend({}, rowFilter._filterButtonVisibleInfo);
                    break;
                case 4 :
                    var col = arguments[2];
                    originalInfo._changeInfo = { col: col, val: rowFilter._filterButtonVisibleInfo[col] };
                    break;
                case 5 :
                case 6 :
                    originalInfo._changeInfo = {
                        _filterItemMap: rowFilter._filterItemMap.concat([]),
                        filterRowsVisibleInfo: self._sheet.filterRowsVisibleInfo.clone(),
                        _filteredColumns: rowFilter._filteredColumns.concat([])
                    };
                    break;
                case 8 :
                    originalInfo._changeInfo = {
                        range: rowFilter.range,
                        _filteredColumns: rowFilter._filteredColumns.concat([]),
                        _filteredItems: rowFilter._filteredItems.concat([]),
                        _filteredInRowsWithColIndexs: $.extend({}, rowFilter._filteredInRowsWithColIndexs),
                        _filterButtonVisibleInfo: $.extend({}, rowFilter._filterButtonVisibleInfo),
                        _sortInfo: $.extend({}, rowFilter._sortInfo),
                        filterRowsVisibleInfo: self._sheet.filterRowsVisibleInfo.clone()
                    };
                    break;
                case 9 :
                case 10 :
                    originalInfo._changeInfo = {
                        range: rowFilter.range,
                        _filteredInRowsWithColIndexs: $.extend({}, rowFilter._filteredInRowsWithColIndexs),
                        _filteredColumns: rowFilter._filteredColumns.concat([]),
                        filterRowsVisibleInfo: self._sheet.filterRowsVisibleInfo.clone()
                    };
                    break;
                case 11 :
                case 12 :
                    originalInfo._changeInfo = {
                        range: rowFilter.range,
                        _sortInfo: $.extend({}, rowFilter._sortInfo),
                        _filterItemMap: rowFilter._filterItemMap.concat([]),
                        _filteredColumns: rowFilter._filteredColumns.concat([]),
                        filterRowsVisibleInfo: self._sheet.filterRowsVisibleInfo.clone()
                    };
                    break;
                case 13 :
                    originalInfo._changeInfo = {
                        filteredInRowsWithColIndexs: $.extend({}, rowFilter._filteredInRowsWithColIndexs),
                        filteredItems: rowFilter._filteredItems.concat([]),
                        filteredColumns: rowFilter._filteredColumns.concat([])
                    };
                    break;
                case 14 :
                    originalInfo._changeInfo = {
                        range: rowFilter.range
                    };
                    break;
            }
            changes._originalFilter.push(originalInfo);
        }
    },
    _restoreFilterByChange: function (originalFilter) {
        var self = this, sheet = self._sheet;
        var rowFilter = originalFilter.rowFilter, change = originalFilter._changeInfo;

        if (!rowFilter && originalFilter.type !== 0 ) {
            return;
        }
        switch (originalFilter.type) {
            case 0 :
                if (change.rowFilter) {
                    sheet._rowFilter = $.extend(rowFilter, change.rowFilter);
                }
                else {
                    sheet._rowFilter = change.rowFilter;
                }
                sheet.filterRowsVisibleInfo = change.filterRowsVisibleInfo;

                break;
            case 1 :
                rowFilter._sortInfo = change;

                break;
            case 3 :
                rowFilter._filterButtonVisibleInfo = change;
                break;
            case 4 :
                rowFilter._filterButtonVisibleInfo[change.col] = change.val;
                break;
            case 5 :
            case 6 :
                rowFilter._filterItemMap = change._filterItemMap;
                rowFilter._filteredColumns = change._filteredColumns;
                sheet.filterRowsVisibleInfo = change.filterRowsVisibleInfo;

                break;
            case 2 :
            case 7 :

                rowFilter._filteredColumns = change._filteredColumns;
                sheet.filterRowsVisibleInfo = change.filterRowsVisibleInfo;


                break;


            case 8 :
                $.extend(rowFilter, change);
                sheet.filterRowsVisibleInfo = change.filterRowsVisibleInfo;

                break;
            case 9 :
            case 10 :
                rowFilter.range = change.range;
                rowFilter._filteredInRowsWithColIndexs = change._filteredInRowsWithColIndexs;
                rowFilter._filteredColumns = change._filteredColumns;
                sheet.filterRowsVisibleInfo = change.filterRowsVisibleInfo;

                break;
            case 11 :
            case 12 :
                rowFilter.range = change.range;
                rowFilter._sortInfo = change._sortInfo;
                rowFilter._filterItemMap = change._filterItemMap;
                rowFilter._filteredColumns = change._filteredColumns;
                sheet.filterRowsVisibleInfo = change.filterRowsVisibleInfo;

                break;
            case 13 :
                rowFilter._filteredInRowsWithColIndexs = change.filteredInRowsWithColIndexs;
                rowFilter._filteredItems = change.filteredItems;
                rowFilter._filteredColumns = change.filteredColumns;
                break;
            case 14 :
                rowFilter.range = change.range;
                break;
            default:
                break;
        }
    },
    _restoreFilter: function (originalFilters) {
        var len = arrayHelper_getLength(originalFilters);
        for (var i = len - 1; i >= 0; i--) {
            this._restoreFilterByChange(originalFilters[i]);
        }
    },
    _onRowsAdded_Filter: function (row, rowCount, rowExpand) {
        var rowFilter = this._sheet._rowFilter;
        if (rowFilter) {
            this._backupFilter(rowFilter, 9 );
            rowFilter._onRowsAdded(row, rowCount, rowExpand);
        }
    },
    _onRowsRemoved_Filter: function (row, rowCount) {
        var rowFilter = this._sheet._rowFilter;
        if (rowFilter) {
            this._backupFilter(rowFilter, 10 );
            rowFilter._onRowsRemoved(row, rowCount);
        }
    },
    _onColumnsAdded_Filter: function (col, colCount) {
        var rowFilter = this._sheet._rowFilter;
        if (rowFilter) {
            this._backupFilter(rowFilter, 11 );
            rowFilter._onColumnsAdded(col, colCount);
        }
    },
    _onColumnsRemoved_Filter: function (col, colCount) {
        var rowFilter = this._sheet._rowFilter;
        if (rowFilter) {
            this._backupFilter(rowFilter, 12 );
            rowFilter._onColumnsRemoved(col, colCount);
        }
    },
    _clear_Filter: function (row, col, rowCount, colCount) {
        var rowFilter = this._sheet._rowFilter;
        if (rowFilter) {
            rowFilter._clear(row, col, rowCount, colCount);
        }
    }
});
Core_1._SheetModelManager._registerFeature('filter', {
    undo: function (changes) {
        var originalFilter = changes._originalFilter;
        if (arrayHelper_getLength(originalFilter)) {
            this._restoreFilter(originalFilter);
        }
    }
});
/***/ }),

/***/ './dist/plugins/filter/filter.res.en.js':
/*!**********************************************!*\
  !*** ./dist/plugins/filter/filter.res.en.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_InvalidColumnIndex = 'Invalid column index.';
exports.SortAscending = 'Sort Ascending';
exports.SortDescending = 'Sort Descending';
exports.OK = 'OK';
exports.Cancel = 'Cancel';
exports.Search = 'Search';
exports.CheckAll = 'Check all';
exports.UncheckAll = 'Uncheck all';
exports.Blanks = '(Blanks)';
exports.Exp_FilterItemIsNull = 'FilterItem is null.';
exports.Show = 'Show';
exports.ShowRows = 'Show rows where:';
exports.And = 'And';
exports.Or = 'Or';
exports.SortColor = 'Sort By Color';
exports.FilterColor = 'Filter By Color';
exports.FilterCellTitle = 'Filter By Cell Color';
exports.FilterFontTitle = 'Filter By Font Color';
exports.SortCellTitle = 'Sort By Cell Color';
exports.SortFontTitle = 'Sort By Font Color';
exports.FontColor = 'More Font Colors...';
exports.CellColor = 'More Cell Colors...';
exports.NoFill = 'No Fill';
exports.Automatic = 'Automatic';
exports.Clear = 'Clear Filter From {0}';
exports.TextFilter = 'Text Filters';
exports.DateFilter = 'Date Filters';
exports.NumberFilter = 'Number Filters';
exports.Custom = 'Custom Filter...';
exports.Equal = 'Equals...';
exports.NotEqual = 'Does Not Equal...';
exports.GreaterThan = 'Greater Than...';
exports.GreaterOrEquals = 'Greater Than Or Equal To...';
exports.LessThan = 'Less Than...';
exports.LessThanOrEquals = 'Less Than Or Equal To...';
exports.Between = 'Between...';
exports.Top10 = 'Top 10...';
exports.AboveAverage = 'Above Average';
exports.BelowAverage = 'Below Average';
exports.Begin = 'Begins With...';
exports.End = 'Ends With...';
exports.Contain = 'Contains...';
exports.NotContain = 'Does Not Contain...';
exports.Before = 'Before...';
exports.After = 'After...';
exports.Tomorrow = 'Tomorrow';
exports.Today = 'Today';
exports.Yesterday = 'Yesterday';
exports.NextWeek = 'Next Week';
exports.ThisWeek = 'This Week';
exports.LastWeek = 'Last Week';
exports.NextMonth = 'Next Month';
exports.ThisMonth = 'This Month';
exports.LastMonth = 'Last Month';
exports.NextQuarter = 'Next Quarter';
exports.ThisQuarter = 'This Quarter';
exports.LastQuarter = 'Last Quarter';
exports.NextYear = 'Next Year';
exports.ThisYear = 'This Year';
exports.LastYear = 'Last Year';
exports.YearToDate = 'Year To Date';
exports.AllDates = 'All Dates in Period';
exports.Top10Filter = 'Top 10 Auto Filter';
exports.CustomTitle = 'Custom AutoFilter';
exports.ColorTitle = 'Available Cell Colors';
exports.top = 'top';
exports.bottom = 'bottom';
exports.SortCell = 'Select a cell color to sort by:';
exports.SortFont = 'Select a font color to sort by:';
exports.FilterCell = 'Select a cell color to filter by:';
exports.FilterFont = 'Select a font color to filter by:';
exports.Selected = 'Selected:';
exports.IsEquals = 'equals';
exports.NotEquals = 'does not equal';
exports.IsGreaterThan = 'is greater than';
exports.IsGreaterOrEqual = 'is greater than or equal to';
exports.IsLess = 'is less than';
exports.LessOrEqual = 'is less than or equal to';
exports.IsBeginWith = 'begins with';
exports.NotBeginWith = 'does not begin with';
exports.IsEndWith = 'ends with';
exports.NotEndWith = 'does not end with';
exports.IsContain = 'contains';
exports.NotContains = 'does not contain';
exports.IsAfter = 'is after';
exports.AfterOrEqual = 'is after or equal to';
exports.IsBefore = 'is before';
exports.BeforeOrEqual = 'is before or equal to';
exports.Q1 = 'Quarter 1';
exports.Q2 = 'Quarter 2';
exports.Q3 = 'Quarter 3';
exports.Q4 = 'Quarter 4';
exports.Jan = 'January';
exports.Feb = 'February';
exports.Mar = 'March';
exports.Apr = 'April';
exports.May = 'May';
exports.Jun = 'June';
exports.Jul = 'July';
exports.Aug = 'August';
exports.Sep = 'September';
exports.Oct = 'October';
exports.Nov = 'November';
exports.Dec = 'December';
exports.Explain1 = 'Use ? to represent any single character';
exports.Explain2 = 'Use * to represent any series of characters';
exports.Year = '';
exports.Day = '';
exports.add_current_filter = 'Add current selection to filter';
exports.invalidCondition = 'Error in parse line';
/***/ }),

/***/ 'CellTypes':
/*!*********************************************!*\
  !*** external "GC.Spread.Sheets.CellTypes" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.Sheets.CellTypes;
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
/***/ })

/******/ });
    return GC;
};
//# sourceMappingURL=gc.spread.sheets.filter.14.2.5.js.map