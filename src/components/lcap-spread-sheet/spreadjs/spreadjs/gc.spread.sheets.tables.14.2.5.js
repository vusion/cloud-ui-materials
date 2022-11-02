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
  var GC = typeof GC === "object" ? GC : {}; GC["Spread"] = GC["Spread"] || {}; GC["Spread"]["Sheets"] = GC["Spread"]["Sheets"] || {}; GC["Spread"]["Sheets"]["Tables"] =
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/plugins/table/table.entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/plugins/table/table-action.js":
/*!********************************************!*\
  !*** ./dist/plugins/table/table-action.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __webpack_require__(/*! Core */ "Core");
var Common_1 = __webpack_require__(/*! Common */ "Common");
var table_util_1 = __webpack_require__(/*! ./table-util */ "./dist/plugins/table/table-util.js");
var _raiseTableResized = table_util_1.Util._raiseTableResized, _raiseTableRowsChanged = table_util_1.Util._raiseTableRowsChanged, _raiseTableColumnsChanged = table_util_1.Util._raiseTableColumnsChanged, _getTable = table_util_1.Util._getTable, _getRowsChangeKey = table_util_1.Util._getRowsChangeKey;
var ActionBase = Core_1.Commands.ActionBase;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var TABLE_RESIZE = 'tableResize', TABLE_INSERT_ROWS = 'tableInsertRows', TABLE_DELETE_ROWS = 'tableDeleteRows', TABLE_INSERT_COLUMNS = "tableInsertColumns", TABLE_DELETE_COLUMNS = "tableDeleteColumns", TABLE_TO_RANGE = "tableToRange", TABLE_TOTAL_ROW_FORMULA = "tableTotalRowFormula", DO_INSERT_ROW = "DoInsertRows", TABLE_SHOW_FOOTER = "tableShowFooter";
var TABLE_INSERT_ROWS_ABOVE_FOR_CONTEXT_MENU = 'tableInsertRowsAboveForContextMenu', TABLE_INSERT_ROWS_BELOW_FOR_CONTEXT_MENU = 'tableInsertRowsBelowForContextMenu', TABLE_DELETE_ROWS_FOR_CONTEXT_MENU = 'tableDeleteRowsForContextMenu', TABLE_INSERT_COLUMNS_LEFT_FOR_CONTEXT_MENU = 'tableInsertColumnsLeftForContextMenu', TABLE_INSERT_COLUMNS_RIGHT_FOR_CONTEXT_MENU = 'tableInsertColumnsRightForContextMenu', TABLE_DELETE_COLUMNS_FOR_CONTEXT_MENU = 'tableDeleteColumnsForContextMenu';
var keyword_undefined = void 0;
var TableResizeUndoAction =  (function (_super) {
    __extends(TableResizeUndoAction, _super);
    function TableResizeUndoAction(sheet, tableResizeExtent) {
        var _this = _super.call(this, sheet) || this;
        _this._tableResizeExtent = tableResizeExtent;
        _this._tableName = tableResizeExtent.tableName;
        _this._resizeToRange = tableResizeExtent.resizeToRange;
        return _this;
    }
    TableResizeUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager;
            var tableName = self._tableName, tableResizeExtent = self._tableResizeExtent;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var table = sheet.tables.findByName(tableName);
                if (table) {
                    var tableRange = table.range(), resizeToRange = self._resizeToRange;
                    sheet.tables.resize(table, resizeToRange);
                    _raiseTableResized(sheet, table, tableRange, resizeToRange);
                    succeed = true;
                }
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                tableResizeExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    TableResizeUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, tableName = self._tableName, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableResizeExtent = self._tableResizeExtent;
                var modelManager = sheet._modelManager;
                var table = sheet.tables.findByName(tableName);
               
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableResizeExtent[changesKey];
                if (changes) {
                    modelManager.undo(changes);
                    _raiseTableResized(sheet, table, tableResizeExtent.resizeToRange, table.range());
                    modelManager._restoreTables(changes._tableChanges);
                    ret = true;
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return TableResizeUndoAction;
}(ActionBase));


Core_1.Commands[TABLE_RESIZE] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, TableResizeUndoAction, options, isUndo);
    }
};
var TableInsertRowsUndoAction =  (function (_super) {
    __extends(TableInsertRowsUndoAction, _super);
    function TableInsertRowsUndoAction(sheet, tableAddRowExtent) {
        var _this = _super.call(this, sheet) || this;
        _this._tableAddRowExtent = tableAddRowExtent;
        _this._tableName = tableAddRowExtent.tableName;
        _this._row = tableAddRowExtent.row;
        _this._count = tableAddRowExtent.count;
        _this._isAfter = tableAddRowExtent.isAfter;
        return _this;
    }
    TableInsertRowsUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager;
            var tableName = self._tableName, row = self._row, count = self._count, isAfter = self._isAfter;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var table = sheet.tables.findByName(tableName);
                if (table) {
                    var oldRowCount = table._rowCount;
                    table._insertRows(row, count, isAfter);
                    succeed = true;
                    var newRowCount = table._rowCount;
                    if (newRowCount - oldRowCount === count) {
                        _raiseTableRowsChanged(sheet, table, TABLE_INSERT_ROWS, row, count, isAfter);
                    }
                }
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._tableAddRowExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    TableInsertRowsUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableAddRowExtent = self._tableAddRowExtent;
                var modelManager = sheet._modelManager;
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableAddRowExtent[changesKey];
                var row = tableAddRowExtent.row, count = tableAddRowExtent.count, isAfter = tableAddRowExtent.isAfter;
                if (changes) {
                    modelManager.undo(changes);
                    modelManager._restoreTables(changes._tableChanges);
                    var table = sheet.tables.findByName(self._tableName);
                    if (table) {
                        var rowIndex = isAfter ? row + 1 : row;
                        table._undoInsertDirtyRows(rowIndex, count);
                        table._updateReference();
                        table._setDeletedRows(rowIndex, count, _getRowsChangeKey(true));
                        _raiseTableRowsChanged(sheet, table, TABLE_DELETE_ROWS, row, count, keyword_undefined, table._getDeletedRows());
                    }
                    ret = true;
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return TableInsertRowsUndoAction;
}(ActionBase));


Core_1.Commands[TABLE_INSERT_ROWS] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, TableInsertRowsUndoAction, options, isUndo);
    }
};
var DoInsertRowsUndoAction =  (function (_super) {
    __extends(DoInsertRowsUndoAction, _super);
    function DoInsertRowsUndoAction(sheet, tableAddRowExtent) {
        var _this = _super.call(this, sheet) || this;
        _this._tableAddRowExtent = tableAddRowExtent;
        _this._tableName = tableAddRowExtent.tableName;
        _this._row = tableAddRowExtent.row;
        _this._count = tableAddRowExtent.count;
        _this._isAfter = tableAddRowExtent.isAfter;
        return _this;
    }
    DoInsertRowsUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager;
            var tableName = self._tableName, row = self._row, count = self._count, isAfter = self._isAfter;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var table = sheet.tables.findByName(tableName);
                if (table) {
                    table._doInsertRows(row, count, isAfter, false);
                   
                    _raiseTableRowsChanged(sheet, table, TABLE_INSERT_ROWS, row, count, isAfter);
                    self._tableAddRowExtent.row = row;
                    self._tableAddRowExtent.count = count;
                    succeed = true;
                }
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._tableAddRowExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    DoInsertRowsUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableAddRowExtent = self._tableAddRowExtent;
                var modelManager = sheet._modelManager;
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableAddRowExtent[changesKey];
                var row = tableAddRowExtent.row, count = tableAddRowExtent.count, isAfter = tableAddRowExtent.isAfter;
                if (changes) {
                   
                   
                    var table = sheet.tables.findByName(self._tableName);
                    var tableDataSource = table && table._getDataSource();
                    var deletedRows = void 0;
                    var rowIndex = isAfter ? row + 1 : row;
                    if (tableDataSource) {
                        var dataRange = table.dataRange();
                        deletedRows = tableDataSource.slice(rowIndex - dataRange.row, rowIndex - dataRange.row + count);
                    }
                    modelManager.undo(changes);
                    modelManager._restoreTables(changes._tableChanges);
                    if (table) {
                        table._undoInsertDirtyRows(rowIndex, count);
                        table._updateReference();
                        table._setDeletedRows(rowIndex, count, _getRowsChangeKey(true));
                        _raiseTableRowsChanged(sheet, table, TABLE_DELETE_ROWS, row, count, isAfter, deletedRows || table._getDeletedRows());
                    }
                    ret = true;
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return DoInsertRowsUndoAction;
}(ActionBase));
Core_1.Commands[DO_INSERT_ROW] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, DoInsertRowsUndoAction, options, isUndo);
    }
};
var TableDeleteRowsUndoAction =  (function (_super) {
    __extends(TableDeleteRowsUndoAction, _super);
    function TableDeleteRowsUndoAction(sheet, tableDeleteRowExtent) {
        var _this = _super.call(this, sheet) || this;
        _this._tableDeleteRowExtent = tableDeleteRowExtent;
        _this._tableName = tableDeleteRowExtent.tableName;
        _this._changeRows = tableDeleteRowExtent.changeRows;
        return _this;
    }
    TableDeleteRowsUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager;
            var tableName = self._tableName, changeRows = self._changeRows;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var table = sheet.tables.findByName(tableName);
                if (table) {
                    for (var i = changeRows.length - 1; i >= 0; i--) {
                        var row = changeRows[i].row, count = changeRows[i].count;
                        var oldRowCount = table._rowCount;
                        table._deleteRows(row, count);
                        succeed = true;
                        var newRowCount = table._rowCount;
                        if (oldRowCount - newRowCount === count) {
                            _raiseTableRowsChanged(sheet, table, TABLE_DELETE_ROWS, row, count, keyword_undefined, table._getDeletedRows());
                        }
                    }
                }
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._tableDeleteRowExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    TableDeleteRowsUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableDeleteRowExtent = self._tableDeleteRowExtent;
                var modelManager = sheet._modelManager;
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableDeleteRowExtent[changesKey];
                var changeRows = self._changeRows;
                if (changes) {
                    modelManager.undo(changes);
                    modelManager._restoreTables(changes._tableChanges);
                    var table = sheet.tables.findByName(self._tableName);
                    table && table._updateReference();
                    ret = true;
                    for (var i = changeRows.length - 1; i >= 0; i--) {
                        var row = changeRows[i].row, count = changeRows[i].count;
                        _raiseTableRowsChanged(sheet, table, TABLE_INSERT_ROWS, row, count, false);
                    }
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return TableDeleteRowsUndoAction;
}(ActionBase));


Core_1.Commands[TABLE_DELETE_ROWS] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, TableDeleteRowsUndoAction, options, isUndo);
    }
};
var TableInsertColumnsUndoAction =  (function (_super) {
    __extends(TableInsertColumnsUndoAction, _super);
    function TableInsertColumnsUndoAction(sheet, tableAddColumnExtent) {
        var _this = _super.call(this, sheet) || this;
        _this._tableAddColumnExtent = tableAddColumnExtent;
        _this._tableName = tableAddColumnExtent.tableName;
        _this._col = tableAddColumnExtent.col;
        _this._count = tableAddColumnExtent.count;
        _this._isAfter = tableAddColumnExtent.isAfter;
        return _this;
    }
    TableInsertColumnsUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager;
            var tableName = self._tableName, col = self._col, count = self._count, isAfter = self._isAfter;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var table = sheet.tables.findByName(tableName);
                if (table) {
                    var oldColCount = table._colCount;
                    table._insertColumns(col, count, isAfter);
                    succeed = true;
                    var newColCount = table._colCount;
                    if (newColCount - oldColCount === count) {
                        _raiseTableColumnsChanged(sheet, table, TABLE_INSERT_COLUMNS, col, count, isAfter);
                    }
                }
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._tableAddColumnExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    TableInsertColumnsUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableAddColumnExtent = self._tableAddColumnExtent;
                var modelManager = sheet._modelManager;
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableAddColumnExtent[changesKey];
                var col = tableAddColumnExtent.col, count = tableAddColumnExtent.count;
                if (changes) {
                    modelManager.undo(changes);
                    modelManager._restoreTables(changes._tableChanges);
                    var table = sheet.tables.findByName(self._tableName);
                    table && table._updateReference();
                    ret = true;
                    _raiseTableColumnsChanged(sheet, table, TABLE_DELETE_COLUMNS, col, count);
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return TableInsertColumnsUndoAction;
}(ActionBase));


Core_1.Commands[TABLE_INSERT_COLUMNS] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, TableInsertColumnsUndoAction, options, isUndo);
    }
};
var TableDeleteColumnsUndoAction =  (function (_super) {
    __extends(TableDeleteColumnsUndoAction, _super);
    function TableDeleteColumnsUndoAction(sheet, tableDeleteColumnExtent) {
        var _this = _super.call(this, sheet) || this;
        _this._tableDeleteColumnExtent = tableDeleteColumnExtent;
        _this._tableName = tableDeleteColumnExtent.tableName;
        _this._col = tableDeleteColumnExtent.col;
        _this._count = tableDeleteColumnExtent.count;
        return _this;
    }
    TableDeleteColumnsUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager;
            var tableName = self._tableName, col = self._col, count = self._count;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var table = sheet.tables.findByName(tableName);
                if (table) {
                    var oldColCount = table._colCount;
                    table._deleteColumns(col, count);
                    succeed = true;
                    var newColCount = table._colCount;
                    if (oldColCount - newColCount === count) {
                        _raiseTableColumnsChanged(sheet, table, TABLE_DELETE_COLUMNS, col, count);
                    }
                }
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._tableDeleteColumnExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    TableDeleteColumnsUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableDeleteColumnExtent = self._tableDeleteColumnExtent;
                var modelManager = sheet._modelManager;
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableDeleteColumnExtent[changesKey];
                var col = tableDeleteColumnExtent.col, count = tableDeleteColumnExtent.count;
                if (changes) {
                    modelManager.undo(changes);
                    modelManager._restoreTables(changes._tableChanges);
                    var table = sheet.tables.findByName(self._tableName);
                    table && table._updateReference();
                    ret = true;
                    _raiseTableColumnsChanged(sheet, table, TABLE_INSERT_COLUMNS, col, count, false);
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return TableDeleteColumnsUndoAction;
}(ActionBase));


Core_1.Commands[TABLE_DELETE_COLUMNS] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, TableDeleteColumnsUndoAction, options, isUndo);
    }
};
var TableToRangeUndoAction =  (function (_super) {
    __extends(TableToRangeUndoAction, _super);
    function TableToRangeUndoAction(sheet, tableToRangeExtent) {
        var _this = _super.call(this, sheet) || this;
        _this._tableToRangeExtent = tableToRangeExtent;
        _this._tableName = tableToRangeExtent.tableName;
        return _this;
    }
    TableToRangeUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager, tableName = self._tableName;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var table = sheet.tables.findByName(tableName);
                if (table) {
                    sheet.tables.remove(table, 1  | 3 );
                    succeed = true;
                }
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._tableToRangeExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    TableToRangeUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableToRangeExtent = self._tableToRangeExtent;
                var modelManager = sheet._modelManager;
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableToRangeExtent[changesKey];
                if (changes) {
                    modelManager.undo(changes);
                    modelManager._restoreTables(changes._tableChanges);
                    var table = sheet.tables.findByName(self._tableName);
                    table && table._updateReference();
                    ret = true;
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return TableToRangeUndoAction;
}(ActionBase));
Core_1.Commands[TABLE_TO_RANGE] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, TableToRangeUndoAction, options, isUndo);
    }
};
var TableTotalRowFormulaUndoAction =  (function (_super) {
    __extends(TableTotalRowFormulaUndoAction, _super);
    function TableTotalRowFormulaUndoAction(sheet, tableTotalRowFormulaExtent) {
        var _this = _super.call(this, sheet) || this;
        var self = _this;
        self._tableTotalRowFormulaExtent = tableTotalRowFormulaExtent;
        self._row = tableTotalRowFormulaExtent.row;
        self._col = tableTotalRowFormulaExtent.col;
        self._formula = tableTotalRowFormulaExtent.newValue;
        return _this;
    }
    TableTotalRowFormulaUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var row = self._row, col = self._col, formula = self._formula;
                sheet.setFormula(row, col, formula);
                if (!formula) {
                    sheet.setValue(row, col, null);
                }
                succeed = true;
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._tableTotalRowFormulaExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    TableTotalRowFormulaUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableTotalRowFormulaExtent = self._tableTotalRowFormulaExtent;
                var modelManager = sheet._modelManager;
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableTotalRowFormulaExtent[changesKey];
                if (changes) {
                    modelManager.undo(changes);
                    modelManager._restoreTables(changes._tableChanges);
                    ret = true;
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return TableTotalRowFormulaUndoAction;
}(ActionBase));
Core_1.Commands[TABLE_TOTAL_ROW_FORMULA] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, TableTotalRowFormulaUndoAction, options, isUndo);
    }
};
var TableShowFooterUndoAction =  (function (_super) {
    __extends(TableShowFooterUndoAction, _super);
    function TableShowFooterUndoAction(sheet, tableShowFooterExtent) {
        var _this = _super.call(this, sheet) || this;
        var self = _this;
        self._tableShowFooterExtent = tableShowFooterExtent;
        _this._tableName = tableShowFooterExtent.tableName;
        return _this;
    }
    TableShowFooterUndoAction.prototype.execute = function () {
        var self = this, succeed = false;
        if (self.canExecute()) {
            var sheet = self._sheet, modelManager = sheet._modelManager, tableName = self._tableName;
            modelManager.startTransaction();
            self._beforeAction(sheet, true);
            try {
                var table = sheet.tables.findByName(tableName);
                if (table) {
                    table.showFooter(true);
                    succeed = true;
                }
            }
            finally {
                self._afterAction(sheet);
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                self._tableShowFooterExtent[changesKey] = modelManager.endTransaction();
            }
        }
        return succeed;
    };
    TableShowFooterUndoAction.prototype.undo = function () {
        var self = this, sheet = self._sheet, ret = false;
        if (self.canUndo()) {
            self._beforeAction(sheet, true);
            try {
                var tableShowFooterExtent = self._tableShowFooterExtent;
                var modelManager = sheet._modelManager;
                var changesKey = Core_1.Commands._getChangesKey(sheet.name());
                var changes = tableShowFooterExtent[changesKey];
                if (changes) {
                    modelManager.undo(changes);
                    modelManager._restoreTables(changes._tableChanges);
                    ret = true;
                }
            }
            finally {
                self._afterAction(sheet, true);
            }
        }
        return ret;
    };
    return TableShowFooterUndoAction;
}(ActionBase));
Core_1.Commands[TABLE_SHOW_FOOTER] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        return Core_1.Commands._executeCommand(context, TableShowFooterUndoAction, options, isUndo);
    }
};
Core_1.Commands[TABLE_INSERT_ROWS_ABOVE_FOR_CONTEXT_MENU] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        options.cmd = TABLE_INSERT_ROWS_ABOVE_FOR_CONTEXT_MENU;
        if (isNullOrUndefined(options.row) && isNullOrUndefined(options.count)) {
            var sheet = Core_1.Commands._getWorksheet(context, options), selections = options.selections, selection = void 0, table = void 0, row = void 0, count = void 0;
            if (selections.length === 1) {
                selection = selections[0];
                table = _getTable(sheet, selection);
                if (table) {
                    row = selection.row;
                    count = selection.rowCount;
                    var isAfter = table.footerIndex() === row;
                    options.row = isAfter ? row - 1 : row;
                    options.count = count;
                    options.tableName = table.name();
                    options.isAfter = isAfter;
                }
                return Core_1.Commands._executeCommand(context, TableInsertRowsUndoAction, options, isUndo);
            }
            else {
                return false;
            }
        }
        else {
            return Core_1.Commands._executeCommand(context, TableInsertRowsUndoAction, options, isUndo);
        }
    }
};
Core_1.Commands[TABLE_INSERT_ROWS_BELOW_FOR_CONTEXT_MENU] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        options.cmd = TABLE_INSERT_ROWS_BELOW_FOR_CONTEXT_MENU;
        if (isNullOrUndefined(options.row) && isNullOrUndefined(options.count)) {
            var sheet = Core_1.Commands._getWorksheet(context, options), selections = options.selections, selection = void 0, table = void 0, row = void 0, count = void 0;
            if (selections.length === 1) {
                selection = selections[0];
                table = _getTable(sheet, selection);
                if (table) {
                    row = selection.row;
                    count = selection.rowCount;
                    options.row = row;
                    options.count = count;
                    options.tableName = table.name();
                    options.isAfter = true;
                }
                return Core_1.Commands._executeCommand(context, TableInsertRowsUndoAction, options, isUndo);
            }
            else {
                return false;
            }
        }
        else {
            return Core_1.Commands._executeCommand(context, TableInsertRowsUndoAction, options, isUndo);
        }
    }
};
Core_1.Commands[TABLE_DELETE_ROWS_FOR_CONTEXT_MENU] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        options.cmd = TABLE_DELETE_ROWS_FOR_CONTEXT_MENU;
        if (isNullOrUndefined(options.changeRows) && isNullOrUndefined(options.changeRows)) {
            var sheet = Core_1.Commands._getWorksheet(context, options), selections = options.selections, table = void 0, row = void 0, count = void 0;
            options.changeRows = [];
            for (var i = 0; i < selections.length; i++) {
                var selection = selections[i];
                var tableInstance = _getTable(sheet, selection);
                if (!tableInstance) {
                    return false;
                }
                if (!table) {
                    table = tableInstance;
                }
                else if (table !== tableInstance) {
                    return false;
                }
            }
            for (var i = 0; i < selections.length; i++) {
                for (var j = i + 1; j < selections.length; j++) {
                    var selection = selections[i], selection1 = selections[j];
                    if (selection.row >= selection1.row && selection.row <= selection1.row + selection1.rowCount - 1) {
                        return false;
                    }
                    if (selection.row + selection.rowCount - 1 >= selection1.row && selection.row + selection.rowCount - 1 <= selection1.row + selection1.rowCount - 1) {
                        return false;
                    }
                    if (selection.row <= table._row || selection.row + selection.rowCount > table._row + table._rowCount) {
                        return false;
                    }
                    if (selection1.row <= table._row || selection1.row + selection1.rowCount > table._row + table._rowCount) {
                        return false;
                    }
                }
            }
            selections.sort(function (a, b) {
                return a.row - b.row;
            });
            for (var i = 0; i < selections.length; i++) {
                var selection = selections[i];
                row = selection.row;
                count = selection.rowCount;
                options.changeRows.push({
                    row: row,
                    count: count
                });
            }
            options.tableName = table.name();
            return Core_1.Commands._executeCommand(context, TableDeleteRowsUndoAction, options, isUndo);
        }
        else {
            return Core_1.Commands._executeCommand(context, TableDeleteRowsUndoAction, options, isUndo);
        }
    }
};
Core_1.Commands[TABLE_INSERT_COLUMNS_LEFT_FOR_CONTEXT_MENU] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        options.cmd = TABLE_INSERT_COLUMNS_LEFT_FOR_CONTEXT_MENU;
        if (isNullOrUndefined(options.col) && isNullOrUndefined(options.count)) {
            var sheet = Core_1.Commands._getWorksheet(context, options), selections = options.selections, selection = void 0, table = void 0, col = void 0, count = void 0;
            if (selections.length === 1) {
                selection = selections[0];
                table = _getTable(sheet, selection);
                if (table) {
                    col = selection.col;
                    count = selection.colCount;
                    options.col = col;
                    options.count = count;
                    options.tableName = table.name();
                    options.isAfter = false;
                }
                return Core_1.Commands._executeCommand(context, TableInsertColumnsUndoAction, options, isUndo);
            }
            else {
                return false;
            }
        }
        else {
            return Core_1.Commands._executeCommand(context, TableInsertColumnsUndoAction, options, isUndo);
        }
    }
};
Core_1.Commands[TABLE_INSERT_COLUMNS_RIGHT_FOR_CONTEXT_MENU] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        options.cmd = TABLE_INSERT_COLUMNS_RIGHT_FOR_CONTEXT_MENU;
        if (isNullOrUndefined(options.col) && isNullOrUndefined(options.count)) {
            var sheet = Core_1.Commands._getWorksheet(context, options), selections = options.selections, selection = void 0, table = void 0, col = void 0, count = void 0;
            if (selections.length === 1) {
                selection = selections[0];
                table = _getTable(sheet, selection);
                if (table) {
                    col = selection.col;
                    count = selection.colCount;
                    options.col = col;
                    options.count = count;
                    options.tableName = table.name();
                    options.isAfter = true;
                }
                return Core_1.Commands._executeCommand(context, TableInsertColumnsUndoAction, options, isUndo);
            }
            else {
                return false;
            }
        }
        else {
            return Core_1.Commands._executeCommand(context, TableInsertColumnsUndoAction, options, isUndo);
        }
    }
};
Core_1.Commands[TABLE_DELETE_COLUMNS_FOR_CONTEXT_MENU] = {
    canUndo: true,
    execute: function (context, options, isUndo) {
        options.cmd = TABLE_DELETE_COLUMNS_FOR_CONTEXT_MENU;
        if (isNullOrUndefined(options.col) && isNullOrUndefined(options.count)) {
            var sheet = Core_1.Commands._getWorksheet(context, options), selections = options.selections, selection = void 0, table = void 0, col = void 0, count = void 0;
            if (selections.length === 1) {
                selection = selections[0];
                table = _getTable(sheet, selection);
                if (table) {
                    col = selection.col;
                    count = selection.colCount;
                    options.col = col;
                    options.count = count;
                    options.tableName = table.name();
                }
                return Core_1.Commands._executeCommand(context, TableDeleteColumnsUndoAction, options, isUndo);
            }
            else {
                return false;
            }
        }
        else {
            return Core_1.Commands._executeCommand(context, TableDeleteColumnsUndoAction, options, isUndo);
        }
    }
};
Core_1.Commands._registerContexeMenuCommand = function (commands) {
    commands.register(TABLE_RESIZE, Core_1.Commands[TABLE_RESIZE]);
    commands.register(TABLE_INSERT_ROWS, Core_1.Commands[TABLE_INSERT_ROWS]);
    commands.register(DO_INSERT_ROW, Core_1.Commands[DO_INSERT_ROW]);
    commands.register(TABLE_DELETE_ROWS, Core_1.Commands[TABLE_DELETE_ROWS]);
    commands.register(TABLE_INSERT_COLUMNS, Core_1.Commands[TABLE_INSERT_COLUMNS]);
    commands.register(TABLE_DELETE_COLUMNS, Core_1.Commands[TABLE_DELETE_COLUMNS]);
    commands.register(TABLE_TO_RANGE, Core_1.Commands[TABLE_TO_RANGE]);
    commands.register(TABLE_TOTAL_ROW_FORMULA, Core_1.Commands[TABLE_TOTAL_ROW_FORMULA]);
    commands.register(TABLE_SHOW_FOOTER, Core_1.Commands[TABLE_SHOW_FOOTER]);
    commands.register(TABLE_INSERT_ROWS_ABOVE_FOR_CONTEXT_MENU, Core_1.Commands[TABLE_INSERT_ROWS_ABOVE_FOR_CONTEXT_MENU]);
    commands.register(TABLE_INSERT_ROWS_BELOW_FOR_CONTEXT_MENU, Core_1.Commands[TABLE_INSERT_ROWS_BELOW_FOR_CONTEXT_MENU]);
    commands.register(TABLE_DELETE_ROWS_FOR_CONTEXT_MENU, Core_1.Commands[TABLE_DELETE_ROWS_FOR_CONTEXT_MENU]);
    commands.register(TABLE_INSERT_COLUMNS_LEFT_FOR_CONTEXT_MENU, Core_1.Commands[TABLE_INSERT_COLUMNS_LEFT_FOR_CONTEXT_MENU]);
    commands.register(TABLE_INSERT_COLUMNS_RIGHT_FOR_CONTEXT_MENU, Core_1.Commands[TABLE_INSERT_COLUMNS_RIGHT_FOR_CONTEXT_MENU]);
    commands.register(TABLE_DELETE_COLUMNS_FOR_CONTEXT_MENU, Core_1.Commands[TABLE_DELETE_COLUMNS_FOR_CONTEXT_MENU]);
};


/***/ }),

/***/ "./dist/plugins/table/table-event.js":
/*!*******************************************!*\
  !*** ./dist/plugins/table/table-event.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __webpack_require__(/*! Core */ "Core");
var Common_1 = __webpack_require__(/*! Common */ "Common");
var table_1 = __webpack_require__(/*! ./table */ "./dist/plugins/table/table.js");
var table_ns_1 = __webpack_require__(/*! ./table.ns */ "./dist/plugins/table/table.ns.js");
var table_util_1 = __webpack_require__(/*! ./table-util */ "./dist/plugins/table/table-util.js");
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var keyword_null = null, Math_abs = Math.abs;
var RESIZE_INDICATOR_SIZE = 10;
var TABLE_RESIZE = 'tableResize';
var rm = new Common_1.Common.ResourceManager(table_ns_1.SR);
var getSR = rm.getResource.bind(rm);
var _getLastVisibleRow = table_util_1.Util._getLastVisibleRow, _getLastVisibleCol = table_util_1.Util._getLastVisibleCol, _raiseTableResizing = table_util_1.Util._raiseTableResizing;
Core_1.GC$.extend(Core_1._SheetEventHandler.prototype, {
    _startTableSelection: function (target, sheet) {
        var tableSelection = this._getCurrentSelection(target, sheet);
        if (tableSelection) {
            sheet.setSelection(tableSelection.row, tableSelection.col, tableSelection.rowCount, tableSelection.colCount);
        }
    },
    _getCurrentSelection: function (target, sheet) {
        var oldSelection = sheet.getSelections(), tableSelectInfo = target.tableSelectInfo;
        if (sheet.isEditing() && (sheet.getActiveRowIndex() !== target.row || sheet.getActiveColumnIndex() !== target.col)) {
            sheet.endEdit();
        }
        var table = tableSelectInfo.table;
        var footer = 0, hedaer = 0;
        if (table._showFooter) {
            footer = 1;
        }
        if (table._showHeader) {
            hedaer = 1;
        }
        var tableSelection = keyword_null;
        var action = tableSelectInfo.action;
        var fbxActiveRanges = sheet._formulaTextBox && sheet._formulaTextBox._getTableSelections();
        if (!isNullOrUndefined(fbxActiveRanges) && fbxActiveRanges.length > 0) {
            oldSelection = fbxActiveRanges;
        }
       
        if (action === table_1.TableSelectionType.TABLE_ROW_SELECT) {
            tableSelection = Core_1._createRange(target.row, table._col, 1, table._colCount);
        }
        else if (action === table_1.TableSelectionType.TABLE_COL_SELECT) {
            for (var i = 0; i < oldSelection.length; i++) {
                var selectItem = oldSelection[i];
                if (selectItem.col === target.col && selectItem.row === table._row + hedaer
                    && selectItem.colCount === 1 && selectItem.rowCount === (table._rowCount - hedaer - footer)) {
                    tableSelection = Core_1._createRange(table._row, target.col, table._rowCount, 1);
                    break;
                }
            }
            if (isNullOrUndefined(tableSelection)) {
                tableSelection = Core_1._createRange(table._row + hedaer, target.col, table._rowCount - hedaer - footer, 1);
            }
        }
        else if (action === table_1.TableSelectionType.TABLE_CORNER_SELECT) {
            for (var i = 0; i < oldSelection.length; i++) {
                var selectItem = oldSelection[i];
                if (selectItem.col === table._col && selectItem.row === table._row + hedaer &&
                    selectItem.colCount === table._colCount && selectItem.rowCount === table._rowCount - hedaer - footer) {
                    tableSelection = Core_1._createRange(table._row, table._col, table._rowCount, table._colCount);
                    break;
                }
            }
            if (isNullOrUndefined(tableSelection)) {
                tableSelection = Core_1._createRange(table._row + hedaer, table._col, table._rowCount - hedaer - footer, table._colCount);
            }
        }
        else if (action === table_1.TableSelectionType.TABLE_SELECT) {
            tableSelection = Core_1._createRange(table._row, table._col, table._rowCount, table._colCount);
        }
        return tableSelection;
    },
    _getResizeIndicatorHitInfo: function (target, table) {
        var sheet = this._sheet, resultInfo = keyword_null;
        if (!sheet || sheet.options.isProtected || sheet.isEditing() || !table || !table.showResizeHandle()) {
            return resultInfo;
        }
        var row = target.row, col = target.col, hitX = target.x, hitY = target.y, rowViewportIndex = target.rowViewportIndex, colViewportIndex = target.colViewportIndex;
        var endRowOfTable = _getLastVisibleRow(sheet, table), endColOfTable = _getLastVisibleCol(sheet, table);
        if (row === endRowOfTable && col === endColOfTable) {
            var hitCellRect = sheet.getCellRect(row, col, rowViewportIndex, colViewportIndex);
            var hitCellRectX = hitCellRect.x, hitCellRectY = hitCellRect.y, hitCellRectWidth = hitCellRect.width, hitCellRectHeight = hitCellRect.height;
            var rightCornerOfHitCellX = hitCellRectX + hitCellRectWidth, rightCornerOfHitCellY = hitCellRectY + hitCellRectHeight;
           
            if (hitX >= rightCornerOfHitCellX - RESIZE_INDICATOR_SIZE && hitX <= rightCornerOfHitCellX
                && hitY >= rightCornerOfHitCellY - RESIZE_INDICATOR_SIZE && hitY <= rightCornerOfHitCellY) {
                resultInfo = {
                    x: hitX,
                    y: hitY,
                    table: table
                };
            }
        }
        return resultInfo;
    },
    _startTableResizing: function (target) {
        var self = this;
        if (self._isTableResizing === true || self._isWorking === true) {
            return;
        }
        var sheet = self._sheet, resizeTableHitInfo = target.resizeTableHitInfo, resizingTable = resizeTableHitInfo && resizeTableHitInfo.table;
        if (!resizingTable || resizingTable._inBinding()) {
            return;
        }
        self._isTableResizing = true;
        self._isWorking = true;
        self._resizingTable = resizingTable;
        self._resizeStartRow = resizingTable._row;
        self._resizeStartCol = resizingTable._col;
        self._resizeStartRowCount = resizingTable._rowCount;
        self._resizeStartColCount = resizingTable._colCount;
        var endRow = self._resizeStartRow + self._resizeStartRowCount - 1, endCol = self._resizeStartCol + self._resizeStartColCount - 1;
        self._resizeFirstEndRect = sheet.getCellRect(endRow, endCol);
        self._oldTableResizingRange = resizingTable.range();
        self._startHitInfo = {
            _scrollRowViewportIndex: target.rowViewportIndex,
            _scrollColViewportIndex: target.colViewportIndex,
            _hitTestType: target.hitTestType
        };
        self._startScroll();
    },
    _continueTableResizing: function () {
        var self = this, sheet = self._sheet;
        if (!self._startHitInfo || !self._isTableResizing || !self._isWorking || !self._resizingTable) {
            return;
        }
        self._updateResizeToInfo();
        if (self._isResizingValidRange()) {
            self._currentResizingDirection = self._getResizingDirection();
            self._updateResizingRange();
            self._refreshTableResizing();
            var oldSelectRange = self._oldSelectRange;
            if (!oldSelectRange) {
                oldSelectRange = self._getCurrentTableRange();
            }
            if (!oldSelectRange.equals(self._resizingRange)) {
                self._oldSelectRange = Core_1._createRange(self._resizingRange.row, self._resizingRange.col, self._resizingRange.rowCount, self._resizingRange.colCount);
                _raiseTableResizing(sheet, self._resizingTable, self._getCurrentTableRange(), self._resizingRange);
            }
        }
        self._continueScroll();
    },
    _endTableResizing: function () {
        var self = this, sheet = self._sheet;
        self._stopScroll();
        if (!self._isTableResizing || !self._isWorking || !self._resizingRange || !self._resizingTable) {
            self._resetTableResizingInfo();
            return;
        }
        self._isTableResizing = false;
        self._isWorking = false;
        if (self._canResize()) {
            var oldRange = self._getCurrentTableRange();
            self._correctResizeToRange();
            if (!oldRange.equals(self._resizingRange)) {
               
                sheet._commandManager().execute({
                    cmd: TABLE_RESIZE,
                    sheetName: sheet.name(),
                    tableName: self._resizingTable.name(),
                    resizeToRange: self._resizingRange
                });
            }
            else {
                sheet._render._paintTableResizing();
            }
            self._resetTableResizingInfo();
        }
        else {
            self._resetTableResizingInfo();
            sheet._render._paintTableResizing();
        }
    },
    _getCurrentTableRange: function () {
        var table = this._resizingTable;
        return Core_1._createRange(table._row, table._col, table._rowCount, table._colCount);
    },
    _updateResizeToInfo: function () {
        var self = this, toRow = self._getHitRowIndex(), toCol = self._getHitColumnIndex();
        self._resizeToRow = toRow;
        self._resizeToCol = toCol;
    },
    _isResizingValidRange: function () {
        var self = this;
        var startRow = self._resizeStartRow, startCol = self._resizeStartCol, toRow = self._resizeToRow, toCol = self._resizeToCol, table = self._resizingTable, showHeader = table._showHeader;
        var minResizedRow = showHeader ? startRow + 1 : startRow, minResizedCol = startCol;
        return toRow >= minResizedRow && toCol >= minResizedCol;
    },
    _getResizingDirection: function () {
       
        var self = this, direction;
        var mousePosition = self._mousePosition;
        var startCellRect = self._resizeFirstEndRect;
        var startPositionX = startCellRect.x + startCellRect.width, startPosotionY = startCellRect.y + startCellRect.height, endPositionX = mousePosition.x, endPositionY = mousePosition.y;
        var deltaRowDis = Math_abs(startPosotionY - endPositionY), deltaColDis = Math_abs(startPositionX - endPositionX);
        if (deltaRowDis >= deltaColDis) {
            if (endPositionY < startPosotionY) {
                direction = 2 ;
            }
            else {
                direction = 3 ;
            }
        }
        else {
            if (endPositionX < startPositionX) {
                direction = 0 ;
            }
            else {
                direction = 1 ;
            }
        }
        return direction;
    },
    _updateResizingRange: function () {
        var self = this;
        var startRow = self._resizeStartRow, startCol = self._resizeStartCol, toRow = self._resizeToRow, toCol = self._resizeToCol, direction = self._currentResizingDirection;
        var resizeToRowCount = self._resizeStartRowCount, resizeToColCount = self._resizeStartColCount;
        switch (direction) {
            case 0 :
            case 1 :
                resizeToColCount = Math_abs(toCol - startCol) + 1;
                break;
            case 2 :
            case 3 :
                resizeToRowCount = Math_abs(toRow - startRow) + 1;
                break;
        }
       
        if (self._resizingRange) {
            self._resizingRange.rowCount = resizeToRowCount;
            self._resizingRange.colCount = resizeToColCount;
        }
        else {
            self._resizingRange = Core_1._createRange(startRow, startCol, resizeToRowCount, resizeToColCount);
        }
    },
    _refreshTableResizing: function () {
        var self = this, sheet = self._sheet;
        sheet._render._paintTableResizing();
        self._oldTableResizingRange = self._getResizingRange();
    },
    _getResizingRange: function () {
        var self = this, resizingRange = self._resizingRange;
        var row = resizingRange.row, col = resizingRange.col, rowCount = resizingRange.rowCount, colCount = resizingRange.colCount;
        return Core_1._createRange(row, col, rowCount, colCount);
    },
    _correctResizeToRange: function () {
        var self = this, resizingTable = self._resizingTable, direction = self._currentResizingDirection;
        if (direction === 2  && resizingTable._showFooter) {
            self._resizingRange.rowCount += 1;
        }
    },
    _canResize: function () {
        var self = this, sheet = self._sheet, result = false;
        var modelManager = sheet._modelManager, tableManager = sheet.tables;
        var resizingTable = self._resizingTable, resizingRange = self._resizingRange;
        var startRow = resizingRange.row, startCol = resizingRange.col, rowCount = resizingRange.rowCount, colCount = resizingRange.colCount, toRow = self._resizeToRow, toCol = self._resizeToCol, tableEndRow = _getLastVisibleRow(sheet, resizingTable), tableEndCol = _getLastVisibleCol(sheet, resizingTable), direction = self._currentResizingDirection;
        var tableFilter = resizingTable._rowFilter;
        if (!tableEndRow || !tableEndCol) {
            return result;
        }
        if (modelManager._hasSpans(startRow, startCol, rowCount, colCount) || modelManager._hasPartSpans(startRow, startCol, rowCount, colCount)) {
            sheet._raiseInvalidOperation(6 , getSR().Exp_TableResizeToSpan);
        }
        else if (tableFilter && tableFilter.isFiltered()) {
           
           
            if (direction === 2 ) {
                sheet._raiseInvalidOperation(6 , getSR().Exp_TableResizeWithHidden);
            }
            else if (direction === 3  && resizingTable._showFooter) {
                sheet._raiseInvalidOperation(6 , getSR().Exp_TableResizeWithFilter);
            }
            else {
                result = true;
            }
        }
        else if ((direction === 2  && self._hasHiddenRow(tableEndRow, toRow)) ||
            (direction === 0  && self._hasHiddenColumn(tableEndCol, toCol))) {
           
            sheet._raiseInvalidOperation(6 , getSR().Exp_TableResizeWithHidden);
        }
        else if ((direction === 1 
            && (tableManager._has(startRow, tableEndCol + 1, rowCount, toCol - tableEndCol)
                || tableManager._hasPartTable(startRow, tableEndCol + 1, rowCount, toCol - tableEndCol)))
            || (direction === 3 
                && (tableManager._has(tableEndRow + 1, startCol, toRow - tableEndRow, colCount)
                    || tableManager._hasPartTable(tableEndRow + 1, startCol, toRow - tableEndRow, colCount)))) {
            sheet._raiseInvalidOperation(6 , getSR().Exp_TableResizeToTable);
        }
        else {
            result = true;
        }
        return result;
    },
    _hasHiddenRow: function (startRow, toRow) {
        var self = this, sheet = self._sheet, index, result = false;
        for (index = startRow; index > toRow; index--) {
            if (sheet.getRowHeight(index) <= 0) {
                result = true;
                break;
            }
        }
        return result;
    },
    _hasHiddenColumn: function (startCol, toCol) {
        var self = this, sheet = self._sheet, index, result = false;
        if (!result) {
            for (index = startCol; index > toCol; index--) {
                if (sheet.getColumnWidth(index) <= 0) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    },
    _resetTableResizingInfo: function () {
        var self = this;
        self._isTableResizing = false;
        self._isWorking = false;
        self._startHitInfo = keyword_null;
        self._resizingRange = keyword_null;
        self._oldSelectRange = keyword_null;
    }
});


/***/ }),

/***/ "./dist/plugins/table/table-render.js":
/*!********************************************!*\
  !*** ./dist/plugins/table/table-render.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __webpack_require__(/*! Core */ "Core");
var $_extend = Core_1.GC$.extend;
var TABLERENDER = 'tableRender';
$_extend(Core_1._SheetRender.prototype, {
    _paintTableResizing: function () {
        var self = this;
        var sheet = self._sheet;
        if (sheet._layoutSuspended > 0) {
            return;
        }
        self._repaintSelection();
    }
});
Core_1.Worksheet._registerFeature(TABLERENDER, {
    paintAdornment: function (e) {
        var sheet = this;
        var ctx = e.ctx;
        var eventHandler = sheet._eventHandler;
        if (eventHandler && eventHandler._startHitInfo && eventHandler._isTableResizing) {
            _paintTableResizingBorder(sheet, ctx, eventHandler._getHitRowViewportIndex(), eventHandler._getHitColumnViewportIndex());
        }
    }
});
function _paintTableResizingBorder(sheet, ctx, rowViewportIndex, colViewportIndex) {
    var eventHandler = sheet._eventHandler;
    var resizingTableRange = eventHandler._resizingRange;
    var resizingTableRect = sheet.getRangeRect(rowViewportIndex, colViewportIndex, resizingTableRange);
    ctx.strokeStyle = sheet.getSelectionBorderColor();
    ctx.strokeRect(resizingTableRect.x, resizingTableRect.y, resizingTableRect.width, resizingTableRect.height);
}


/***/ }),

/***/ "./dist/plugins/table/table-theme.js":
/*!*******************************************!*\
  !*** ./dist/plugins/table/table-theme.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __webpack_require__(/*! Core */ "Core");
var $_each = Core_1.GC$.each, $_isEmptyObject = Core_1.GC$.isEmptyObject, isDefined = Core_1._util._isDefined, JSON_STRINGIFY = JSON.stringify, JSON_PARSE = JSON.parse, defProperty = Core_1._util._defProperty;
var Math_floor = Math.floor, keyword_undefined = void 0, keyword_null = null;
var HEADER_ROW_STYLE = 'headerRowStyle', FOOTER_ROW_STYLE = 'footerRowStyle', WHOLE_TABLE_STYLE = 'wholeTableStyle', HIGHLIGHT_LAST_COLUMN_STYLE = 'highlightLastColumnStyle', HIGHLIGHT_FIRST_COLUMN_STYLE = 'highlightFirstColumnStyle', FIRST_ROW_STRIP_STYLE = 'firstRowStripStyle', SECOND_ROW_STRIP_STYLE = 'secondRowStripStyle', FIRST_COLUMN_STRIP_STYLE = 'firstColumnStripStyle', SECOND_COLUMN_STRIP_STYLE = 'secondColumnStripStyle', FIRST_HEADER_CELL_STYLE = 'firstHeaderCellStyle', LAST_HEADER_CELL_STYLE = 'lastHeaderCellStyle', FIRST_FOOTER_CELL_STYLE = 'firstFooterCellStyle', LAST_FOOTER_CELL_STYLE = 'lastFooterCellStyle';
var styleProperties = [HEADER_ROW_STYLE, FOOTER_ROW_STYLE, WHOLE_TABLE_STYLE, HIGHLIGHT_LAST_COLUMN_STYLE, HIGHLIGHT_FIRST_COLUMN_STYLE, FIRST_ROW_STRIP_STYLE,
    SECOND_ROW_STRIP_STYLE, FIRST_COLUMN_STRIP_STYLE, SECOND_COLUMN_STRIP_STYLE, FIRST_HEADER_CELL_STYLE, LAST_HEADER_CELL_STYLE, FIRST_FOOTER_CELL_STYLE, LAST_FOOTER_CELL_STYLE];
var FIRST_ROW_STRIP_SIZE = 'firstRowStripSize', SECOND_ROW_STRIP_SIZE = 'secondRowStripSize', FIRST_COLUMN_STRIP_SIZE = 'firstColumnStripSize', SECOND_COLUMN_STRIP_SIZE = 'secondColumnStripSize';
var sizeProperties = [FIRST_ROW_STRIP_SIZE, SECOND_ROW_STRIP_SIZE, FIRST_COLUMN_STRIP_SIZE, SECOND_COLUMN_STRIP_SIZE];
var CONST_NAME = 'name', TABLE_STYLE_DEFAULT_FONT = 'bold 11pt calibri';

var CONST_BORDER_LEFT = 'borderLeft', CONST_BORDER_TOP = 'borderTop', CONST_BORDER_RIGHT = 'borderRight', CONST_BORDER_BOTTOM = 'borderBottom', CONST_BORDER_HORIZONTAL = 'borderHorizontal', CONST_BORDER_VERTICAL = 'borderVertical';
var tableStyleProperties = ['backColor', 'foreColor', 'font', CONST_BORDER_LEFT, CONST_BORDER_TOP, CONST_BORDER_RIGHT,
    CONST_BORDER_BOTTOM, CONST_BORDER_HORIZONTAL, CONST_BORDER_VERTICAL, 'textDecoration'];






















var TableStyle =  (function () {
    function TableStyle(backColor, foreColor, font, borderLeft, borderTop, borderRight, borderBottom, borderHorizontal, borderVertical, textDecoration) {
        var self = this, args = arguments;
        $_each(tableStyleProperties, function (i, p) {
            self[p] = args[i];
        });
    }
    TableStyle.prototype._compose = function (dest, firstRow, firstCol, lastRow, lastCol) {
        var self = this;
        if (firstCol && isDefined(self[CONST_BORDER_LEFT]) && !isDefined(dest[CONST_BORDER_LEFT])) {
            dest[CONST_BORDER_LEFT] = self[CONST_BORDER_LEFT];
            dest[CONST_BORDER_LEFT].level = 20 ;
        }
        if (firstRow && isDefined(self[CONST_BORDER_TOP]) && !isDefined(dest[CONST_BORDER_TOP])) {
            dest[CONST_BORDER_TOP] = self[CONST_BORDER_TOP];
            dest[CONST_BORDER_TOP].level = 20 ;
        }
        if (lastCol && isDefined(self[CONST_BORDER_RIGHT]) && !isDefined(dest[CONST_BORDER_RIGHT])) {
            dest[CONST_BORDER_RIGHT] = self[CONST_BORDER_RIGHT];
            dest[CONST_BORDER_RIGHT].level = 20 ;
        }
        if (lastRow && isDefined(self[CONST_BORDER_BOTTOM]) && !isDefined(dest[CONST_BORDER_BOTTOM])) {
            dest[CONST_BORDER_BOTTOM] = self[CONST_BORDER_BOTTOM];
            dest[CONST_BORDER_BOTTOM].level = 20 ;
        }
        if (!firstRow && isDefined(self[CONST_BORDER_HORIZONTAL]) && !isDefined(dest[CONST_BORDER_TOP])) {
            dest[CONST_BORDER_TOP] = self[CONST_BORDER_HORIZONTAL];
            dest[CONST_BORDER_TOP].level = 20 ;
        }
        if (!lastRow && isDefined(self[CONST_BORDER_HORIZONTAL]) && !isDefined(dest[CONST_BORDER_BOTTOM])) {
            dest[CONST_BORDER_BOTTOM] = self[CONST_BORDER_HORIZONTAL];
            dest[CONST_BORDER_BOTTOM].level = 20 ;
        }
        if (!firstCol && isDefined(self[CONST_BORDER_VERTICAL]) && !isDefined(dest[CONST_BORDER_LEFT])) {
            dest[CONST_BORDER_LEFT] = self[CONST_BORDER_VERTICAL];
            dest[CONST_BORDER_LEFT].level = 20 ;
        }
        if (!lastCol && isDefined(self[CONST_BORDER_VERTICAL]) && !isDefined(dest[CONST_BORDER_RIGHT])) {
            dest[CONST_BORDER_RIGHT] = self[CONST_BORDER_VERTICAL];
            dest[CONST_BORDER_RIGHT].level = 20 ;
        }
        $_each(tableStyleProperties, function (i, p) {
            if (p.indexOf('border') >= 0) {
                return;
            }
            else if (isDefined(self[p]) && !isDefined(dest[p])) {
                dest[p] = self[p];
            }
        });
    };
    TableStyle.prototype._clone = function () {
        var newStyle = new TableStyle();
        var jsonStr = JSON_STRINGIFY(this.toJSON());
        newStyle.fromJSON(JSON_PARSE(jsonStr));
        return newStyle;
    };
    TableStyle.prototype.toJSON = function () {
        var self = this;
        var ret = {};
        $_each(tableStyleProperties, function (i, p) {
            var tmpData = self[p];
            var tmpJSONData = tmpData && tmpData.toJSON ? tmpData.toJSON() : tmpData;
            ret[p] = $_isEmptyObject(tmpJSONData) ? keyword_undefined : tmpJSONData;
        });
        return ret;
    };
    TableStyle.prototype.fromJSON = function (jsData, noSchema) {
        if (jsData) {
            var self_1 = this;
            $_each(tableStyleProperties, function (i, p) {
                var tmpData = jsData[p];
                if (isDefined(tmpData)) {
                    if (p.indexOf('border') >= 0) {
                        var border = new Core_1.LineBorder();
                        border.fromJSON(tmpData, noSchema);
                        self_1[p] = border;
                    }
                    else {
                        self_1[p] = tmpData;
                    }
                }
            });
        }
    };
    return TableStyle;
}());
exports.TableStyle = TableStyle;




var TableTheme =  (function () {
    function TableTheme() {
    }
    TableTheme.prototype.toJSON = function () {
        var self = this, builtInName = self.builtInName();
        if (builtInName) {
            return {
               
                buildInName: builtInName
            };
        }
        var json = {
            name: self.name()
        }, tmp;
        $_each(styleProperties, function (i, p) {
            tmp = self[p]();
            if (tmp) {
                json[p] = tmp.toJSON();
            }
        });
        $_each(sizeProperties, function (i, p) {
            tmp = self[p]();
            if (tmp !== 1) {
                json[p] = tmp;
            }
        });
        return $_isEmptyObject(json) ? keyword_undefined : json;
    };
    TableTheme.prototype.fromJSON = function (jsData, noSchema) {
        function _copyFrom(tableTheme, style) {
            tableTheme.name(style.name());
            $_each(sizeProperties, function (i, p) {
                tableTheme[p](style[p]());
            });
            $_each(styleProperties, function (i, p) {
                var tableStyle = style[p]();
                tableTheme[p](tableStyle ? tableStyle._clone() : keyword_null);
            });
            tableTheme.builtInName(style.builtInName(), false);
        }
        if (!jsData) {
            return;
        }
        var self = this, buildInName = jsData.buildInName;
        if (buildInName) {
            _copyFrom(self, TableThemes[buildInName.toLowerCase()]);
            
            return;
        }
        var jsData_name = jsData.name, name = isDefined(jsData_name) ? jsData_name : jsData._name;
        if (isDefined(name)) {
            self.name(name, false);
        }
        $_each(sizeProperties, function (i, p) {
            var jsPropValue = jsData[p] !== keyword_undefined ? jsData[p] : jsData['_' + p];
            if (jsPropValue) {
                self[p](jsPropValue, false);
            }
        });
        $_each(styleProperties, function (i, p) {
            var jsPropValue = jsData[p] !== keyword_undefined ? jsData[p] : jsData['_' + p];
            if (jsPropValue) {
                var style = new TableStyle();
                style.fromJSON(jsPropValue, noSchema);
                self[p](style, false);
            }
        });
    };
    return TableTheme;
}());
exports.TableTheme = TableTheme;


TableTheme.prototype.name = defProperty(CONST_NAME);
TableTheme.prototype.builtInName = defProperty('builtInName');


































$_each(styleProperties, function (i, p) {
    TableTheme.prototype[p] = defProperty(p);
});
$_each(sizeProperties, function (i, p) {
    TableTheme.prototype[p] = defProperty(p, 1);
});


var COLOR_WHITE = 'white', COLOR_BLACK = 'black';
function getBorder(borderColor, styleOrBorder) {
    if (isNaN(styleOrBorder)) {
        return styleOrBorder;
    }
    return new Core_1.LineBorder(borderColor, styleOrBorder);
}
function _createStyle(borderColor, backColor, foreColor, font, borderLeft, borderTop, borderRight, borderBottom, borderHorizontal, borderVertical) {
    var ts = new TableStyle();
    if (backColor) {
        ts.backColor = backColor;
    }
    if (foreColor) {
        ts.foreColor = foreColor;
    }
    if (font) {
        ts.font = TABLE_STYLE_DEFAULT_FONT;
    }
    if (borderLeft) {
        ts.borderLeft = getBorder(borderColor, borderLeft);
    }
    if (borderTop) {
        ts.borderTop = getBorder(borderColor, borderTop);
    }
    if (borderRight) {
        ts.borderRight = getBorder(borderColor, borderRight);
    }
    if (borderBottom) {
        ts.borderBottom = getBorder(borderColor, borderBottom);
    }
    if (borderHorizontal) {
        ts.borderHorizontal = getBorder(borderColor, borderHorizontal);
    }
    if (borderVertical) {
        ts.borderVertical = getBorder(borderColor, borderVertical);
    }
    return ts;
}
function _getTheme(factor) {
   
   
   
   
   
   
   
    if (factor === 0) {
        return 'Text 1';
    }
    return 'Accent ' + factor;
}
function _getLightStyle(id) {
    var index = id - 1;
    var result = keyword_null;
    var num = Math_floor(index / 7);
    if (num >= 0 && num < 3) {
        result = [_createLightA, _createLightB, _createLightC][num](index % 7);
        var name_1 = 'Light' + id;
        result.name && result.name(name_1);
        result.builtInName && result.builtInName(name_1);
    }
    return result;
}
function _createLightA(factor) {
    var themeColor = _getTheme(factor);
    var bkStrip1 = themeColor + ' 80';
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(themeColor, 0, themeColor, 1, 0, 0, 0, 1));
   
    style[WHOLE_TABLE_STYLE](_createStyle(themeColor, 0, themeColor, 0, 0, 1, 0, 1));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(themeColor, bkStrip1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(themeColor, 0, themeColor, 1));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(themeColor, 0, themeColor, 1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(themeColor, bkStrip1));
   
    style[FOOTER_ROW_STYLE](_createStyle(themeColor, 0, themeColor, 1, 0, 1));
    return style;
}
function _createLightB(factor) {
    var themeColor = _getTheme(factor);
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(themeColor, themeColor, COLOR_WHITE, 1));
   
    style[WHOLE_TABLE_STYLE](_createStyle(themeColor, 0, 0, 0, 1, 1, 1, 1));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(themeColor, 0, 0, 0, 0, 1));
   
    style[SECOND_ROW_STRIP_STYLE](_createStyle(themeColor, 0, 0, 0, 0, 1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(themeColor, 0, 0, 0, 1));
   
    style[SECOND_COLUMN_STRIP_STYLE](_createStyle(themeColor, 0, 0, 0, 1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(themeColor, 0, 0, 1));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(themeColor, 0, 0, 1));
   
    style[FOOTER_ROW_STYLE](_createStyle(themeColor, 0, 0, 1, 0, 6));
    return style;
}
function _createLightC(factor) {
    var themeColor = _getTheme(factor);
    var bkStrip1 = themeColor + ' 80';
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(themeColor, 0, 0, 1, 0, 0, 0, 2));
   
    style[WHOLE_TABLE_STYLE](_createStyle(themeColor, 0, 0, 0, 1, 1, 1, 1, 1, 1));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(themeColor, bkStrip1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(themeColor, bkStrip1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(themeColor, 0, 0, 1));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(themeColor, 0, 0, 1));
   
    style[FOOTER_ROW_STYLE](_createStyle(themeColor, 0, 0, 1, 0, 6));
    return style;
}
function _getMediumStyle(id) {
    var index = id - 1;
    var result = keyword_null;
    var num = Math_floor(index / 7);
    if (num >= 0 && num < 4) {
        result = [_createMediumA, _createMediumB, _createMediumC, _createMediumD][num](index % 7);
        var name_2 = 'Medium' + id;
        result.name(name_2);
        result.builtInName(name_2);
    }
    return result;
}
function _createMediumA(factor) {
    var color = _getTheme(factor);
    var border = color + ' 20';
    var bkHeader = color;
    var bkStrip1 = color + ' 80';
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(border, bkHeader, COLOR_WHITE, 1));
   
    style[WHOLE_TABLE_STYLE](_createStyle(border, 0, 0, 0, 1, 1, 1, 1, 1));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(border, bkStrip1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(border, bkStrip1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(border, 0, 0, 1));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(border, 0, 0, 1));
   
    style[FOOTER_ROW_STYLE](_createStyle(border, 0, COLOR_BLACK, 1, 0, 6));
    return style;
}
function _createMediumB(factor) {
    var color = _getTheme(factor);
    var borderColor = COLOR_WHITE;
    var bkHeader = color;
    var bkStrip1 = color + ' 60';
    var bkStrip2 = color + ' 80';
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(borderColor, bkHeader, COLOR_WHITE, 1, 0, 0, 0, 2, 0, 1));
   
    style[WHOLE_TABLE_STYLE](_createStyle(borderColor, bkStrip2, 0, 0, 0, 0, 0, 0, 1, 1));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(borderColor, bkStrip1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(borderColor, bkStrip1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(borderColor, bkHeader, COLOR_WHITE, 1));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(borderColor, bkHeader, COLOR_WHITE, 1));
   
    style[FOOTER_ROW_STYLE](_createStyle(borderColor, bkHeader, COLOR_WHITE, 1, 0, 2, 0, 0, 0, 1));
    return style;
}
function _createMediumC(factor) {
    var color = _getTheme(factor), COLOR_D3D3D3 = '#D3D3D3';
    var bkHeader = color;
    var bkStrip1 = COLOR_D3D3D3;
    var border = (factor === 0 ? COLOR_BLACK : COLOR_D3D3D3);
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(COLOR_BLACK, bkHeader, COLOR_WHITE, 1, 0, 2, 0, 2));
   
    style[WHOLE_TABLE_STYLE](_createStyle(border, 0, 0, 0, 1, new Core_1.LineBorder(COLOR_BLACK, 2 ), 1, new Core_1.LineBorder(COLOR_BLACK, 2 ), (factor === 0) ? 1 : 0, 1));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(border, bkStrip1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(border, bkStrip1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(border, bkHeader, COLOR_WHITE));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(border, bkHeader, COLOR_WHITE));
   
    style[FIRST_FOOTER_CELL_STYLE](_createStyle(border, bkHeader, COLOR_WHITE, 1));
   
    style[LAST_FOOTER_CELL_STYLE](_createStyle(border, bkHeader, COLOR_WHITE, 1));
   
    style[FOOTER_ROW_STYLE](_createStyle(COLOR_BLACK, 0, COLOR_BLACK, 0, 0, 6));
    return style;
}
function _createMediumD(factor) {
    var color = _getTheme(factor);
    var footerBorder = color;
    var border = color + ' 40';
    var bkHeader = color + ' 80';
    var bkStrip1 = color + ' 60';
    var bkStrip2 = color + ' 80';
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(border, bkHeader, COLOR_BLACK, 1, 1, 1, 1, 1, 0, 1));
   
    style[WHOLE_TABLE_STYLE](_createStyle(border, bkHeader, 0, 0, 1, 1, 1, 1, 1, 1));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(border, bkStrip1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(border, bkStrip1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(border, 0, 0, 1));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(border, 0, 0, 1));
   
    style[FOOTER_ROW_STYLE](_createStyle(border, bkStrip2, COLOR_BLACK, 1, 1, new Core_1.LineBorder(footerBorder, 2 ), 1, 1, 0, 1));
    return style;
}
function _getDarkStyle(id) {
    var index = id - 1;
    var result = keyword_null;
    var num = Math_floor(index / 7);
    if (num >= 0 && num < 2) {
        result = [_createDarkA, _createDarkB][num](index % 7);
        var name_3 = 'Dark' + id;
        result.name(name_3);
        result.builtInName(name_3);
    }
    return result;
}
function _createDarkA(factor) {
    var color = _getTheme(factor);
    var headerColor = COLOR_BLACK;
    var bkStrip1 = (factor === 0 ? color + ' 25' : color + ' -25');
    var tableBk = (factor === 0 ? color + ' 50' : color);
    var footColor = (factor === 0 ? color : color + ' -50');
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(COLOR_WHITE, headerColor, COLOR_WHITE, 1, 0, 0, 0, 2));
   
    style[WHOLE_TABLE_STYLE](_createStyle(color, tableBk, COLOR_WHITE));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(color, bkStrip1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(color, bkStrip1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(COLOR_WHITE, bkStrip1, COLOR_WHITE, 1, 0, 0, 2));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(COLOR_WHITE, bkStrip1, COLOR_WHITE, 1, 2));
   
    style[FOOTER_ROW_STYLE](_createStyle(COLOR_WHITE, footColor, COLOR_WHITE, 1, 0, 2));
    return style;
}
function _createDarkB(factor) {
    function _getColor(index, category) {
        if (index < 0 || index > 3) {
            return '';
        }
        var map = {
            tableBackground: ['Background 1 -15', 'Accent 1 80', 'Accent 3 80', 'Accent 5 80'],
            stripColor: ['Background 1 -35', 'Accent 1 60', 'Accent 3 60', 'Accent 5 60'],
            headerColor: ['Text 1', 'Accent 2', 'Accent 4', 'Accent 6']
        };
        return map[category][index];
    }
    var color = _getTheme(factor);
    var headerColor = _getColor(factor, "headerColor");
    var bkStrip1 = _getColor(factor, "stripColor");
    var tableBk = _getColor(factor, "tableBackground");
    var footColor = tableBk;
    var style = new TableTheme();
   
    style[HEADER_ROW_STYLE](_createStyle(color, headerColor, COLOR_WHITE));
   
    style[WHOLE_TABLE_STYLE](_createStyle(color, tableBk));
   
    style[FIRST_ROW_STRIP_STYLE](_createStyle(color, bkStrip1));
   
    style[FIRST_COLUMN_STRIP_STYLE](_createStyle(color, bkStrip1));
   
    style[HIGHLIGHT_FIRST_COLUMN_STYLE](_createStyle(color, 0, 0, 1));
   
    style[HIGHLIGHT_LAST_COLUMN_STYLE](_createStyle(color, 0, 0, 1));
   
    style[FOOTER_ROW_STYLE](_createStyle(COLOR_BLACK, footColor, 0, 1, 0, 6));
    return style;
}


var TableThemes =  (function () {
    function TableThemes() {
    }
    return TableThemes;
}());
exports.TableThemes = TableThemes;

























































































































for (var j = 1; j <= 28; j++) {
    if (j <= 21) {
        TableThemes['light' + j] = _getLightStyle(j);
    }
    if (j <= 11) {
        TableThemes['dark' + j] = _getDarkStyle(j);
    }
    TableThemes['medium' + j] = _getMediumStyle(j);
}



/***/ }),

/***/ "./dist/plugins/table/table-util.js":
/*!******************************************!*\
  !*** ./dist/plugins/table/table-util.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __webpack_require__(/*! Core */ "Core");
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ "SheetsCalc");
var CalcEngine = __webpack_require__(/*! CalcEngine */ "CalcEngine");
var Common_1 = __webpack_require__(/*! Common */ "Common");
var table_ns_1 = __webpack_require__(/*! ./table.ns */ "./dist/plugins/table/table.ns.js");
var isDefined = Core_1._util._isDefined;
var keyword_null = null, keyword_undefined = void 0, Math_max = Math.max;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var KEY = 0;
var rm = new Common_1.Common.ResourceManager(table_ns_1.SR);
var getSR = rm.getResource.bind(rm);
function throwError(message) {
    throw new Error(message);
}
function setFormulaToSheet(sheet, row, col, formula, expr) {
    if (!formula && expr) {
        formula = expressionToFormula(sheet, expr, row, col);
    }
    CalcEngine && sheet._setFormulaCore(row, col, formula, expr);
}
function setValue(sheet, row, col, value) {
    sheet.setValue(row, col, value);
}
function suspendPaint(sheet) {
    sheet.suspendPaint();
}
function resumePaint(sheet) {
    sheet.resumePaint();
}
function _getOperatorAdjustor(sheet) {
    return sheet._getCalcServiceInternal()._getOperatorAdjustor();
}
function suspendCalcService(sheet) {
    CalcEngine && sheet.suspendCalcService();
}
function resumeCalcService(sheet, recalcAll) {
    CalcEngine && sheet.resumeCalcService(recalcAll);
}
function _suspendAll(sheet) {
    if (sheet) {
        suspendPaint(sheet);
        sheet.suspendEvent();
        suspendCalcService(sheet);
    }
}
function _resumeAll(sheet) {
    if (sheet) {
        resumeCalcService(sheet);
        sheet.resumeEvent();
        resumePaint(sheet);
    }
}
function getRowCount(obj) {
    return obj.rowCount;
}
function getColCount(obj) {
    return obj.colCount;
}
function isValidTableName(name) {
    
    return name && (!(/\d/.test(name[0]) ||
        /[\s\+\-\*\\:%!\[\]]/.test(name) ||
        ["C", "c", "R", "r"].indexOf(name) !== -1 ||
        /^[A-Za-z]{1,3}(\$)?\d+$/.test(name) ||
        /^[Rr]\d*[Cc]\d*$/.test(name) ||
        name.length >= 255));
}
function formulaToExpression(sheet, formula, sheetRow, sheetColumn, limitThisRow) {
    var calcSource = sheet._getSheetSource();
    calcSource._limitThisRow = limitThisRow;
    var expr = sheet._calcService.parse(calcSource, formula, sheetRow, sheetColumn, false, false, false);
    delete calcSource._limitThisRow;
    return expr;
}
function expressionToFormula(sheet, expr, sheetRow, sheetColumn, toStandard) {
    toStandard = toStandard === keyword_undefined ? true : toStandard;
    return sheet._calcService.unparse(sheet._getSheetSource(), expr, sheetRow, sheetColumn, false, toStandard);
}
function checkTableName(value) {
    if (!value) {
        return false;
    }
    if (!isValidTableName(value)) {
        throwError(getSR().Exp_TableNameInvalid);
    }
    var self = this, oldName = self.name(), owner = self._owner;
    if (value === oldName) {
        return false;
    }
    if (owner) {
        var table = owner.findByName(value);
        return !table || self === table;
    }
    return true;
}
function _getLastNonEmptyRow(sheet, firstDirtyRow, lastDirtyRow, firstDirtyColumn, lastDirtyColumn) {
    var r, rowStyle, c, span;
    for (r = lastDirtyRow; r >= firstDirtyRow; r--) {
        for (c = firstDirtyColumn; c <= lastDirtyColumn; c++) {
            rowStyle = sheet._getStyleImp(r, c);
            if (_isValidStyle(rowStyle)) {
                return r;
            }
            if (_isCellNonEmpty(sheet, r, c)) {
                return r;
            }
            if (sheet.isNoneNullCell && sheet.isNoneNullCell(r, c)) {
                return r;
            }
            span = sheet._modelManager.findSpan(r, c);
            if (span) {
                return span.row + span.rowCount - 1;
            }
        }
    }
    return -1;
}
function _getLastNonEmptyColumn(sheet, firstDirtyRow, lastDirtyRow, firstDirtyColumn, lastDirtyColumn) {
    var r, c, columnStyle, span;
    for (c = lastDirtyColumn; c >= firstDirtyColumn; c--) {
        for (r = firstDirtyRow; r <= lastDirtyRow; r++) {
            columnStyle = sheet._getStyleImp(r, c);
            if (_isValidStyle(columnStyle)) {
                return c;
            }
            if (_isCellNonEmpty(sheet, r, c)) {
                return c;
            }
            span = sheet._modelManager.findSpan(r, c);
            if (span) {
                return span.col + span.colCount - 1;
            }
        }
    }
    return -1;
}
function _isCellNonEmpty(sheet, r, c) {
    var value = sheet.getValue(r, c), sparkline, style;
    if (value !== keyword_null && isDefined(value)) {
        return true;
    }
    sparkline = sheet.getSparkline && sheet.getSparkline(r, c);
    if (sparkline) {
        return true;
    }
    style = sheet._getStyleImp(r, c);
    return _isValidStyle(style);
}
function _isValidStyle(style) {
    return !!(style && (style.backColor || style.backgroundImage || style.borderBottom || style.borderLeft || style.borderRight || style.borderTop || style.diagonalDown || style.diagonalUp));
}
function _checkIntersetRangeBelowTable(r, c, rc, cc, checkRangeStartRow, checkRangeEndRow, checkRangeStartCol, checkRangeEndCol) {
    // 合并单元格s 表格和s同行或者表格在上 && (!(s在表格内) && 左外右内 || 左内右外)
    return r >= checkRangeStartRow && (!(c === checkRangeStartCol && c + cc - 1 === checkRangeEndCol)
        && ((c < checkRangeStartCol && c + cc > checkRangeStartCol)
            || (c >= checkRangeStartCol && c <= checkRangeEndCol && c + cc - 1 > checkRangeEndCol)));
}
function _checkIntersetRangeRightTable(r, c, rc, cc, checkRangeStartRow, checkRangeEndRow, checkRangeStartCol, checkRangeEndCol) {
    return c >= checkRangeStartCol && (!(r === checkRangeStartRow && r + rc - 1 === checkRangeEndRow)
        && ((r < checkRangeStartRow && r + rc > checkRangeStartRow)
            || (r >= checkRangeStartRow && r <= checkRangeEndRow && r + rc - 1 > checkRangeEndRow)));
}
function _createLeftRightCell(row, col, leadingCellRow) {
    return {
        col: col,
        leadingCellRow: leadingCellRow,
        row: row
    };
}
function _getLastVisibleRow(sheet, table, ignoreFooter) {
    var result = keyword_null;
    var startRow = table._row, endRow = table.endRow();
    if (ignoreFooter) {
        endRow -= table._showFooter ? 1 : 0;
    }
    while (endRow >= startRow && sheet.getRowHeight(endRow) <= 0) {
        endRow--;
    }
    if (endRow >= startRow) {
        result = endRow;
    }
    return result;
}
function _getLastVisibleCol(sheet, table) {
    var result = keyword_null;
    var startCol = table._col, endCol = table.endColumn();
    while (endCol >= startCol && sheet.getColumnWidth(endCol) <= 0) {
        endCol--;
    }
    if (endCol >= startCol) {
        result = endCol;
    }
    return result;
}
function _getLastNonNullRowOfSheet(sheet) {
    var modelManager = sheet._modelManager, dataTable = modelManager._getSheetModel(3).dataTable, lastNonNullRow = modelManager.getLastNonNullRow(3, true), sheetRowCount = sheet.getRowCount(), sheetColumnCount = sheet.getColumnCount();
    var result = -1, dr, drc;
    for (var row = sheetRowCount - 1; row > -1; row--) {
        dr = dataTable[row];
        if (dr) {
            for (var col = 0; col < sheetColumnCount; col++) {
                drc = dr[col];
                if (drc && !isNullOrUndefined(drc.value)) {
                    return Math_max(row, lastNonNullRow);
                }
            }
        }
    }
    return Math_max(result, lastNonNullRow);
}
function _getLastNonNullRowBelowTable(sheet, table) {
    var tableManager = table._owner, tableStartRow = table._row, tableRowCount = table._rowCount, tableEndRow = tableStartRow + tableRowCount - 1, tableStartCol = table._col, tableEndCol = tableStartCol + table._colCount - 1;
    var lastNonNullRow = _getLastNonNullRowOfSheet(sheet), lastTableDirtyRow = tableManager ? tableManager._getLastTableDirtyRow() : -1;
    lastNonNullRow = Math_max(lastNonNullRow, lastTableDirtyRow);
    var result = tableEndRow;
    if (lastNonNullRow > tableEndRow) {
        var firstDirtyRow = tableEndRow + 1;
        var range = new Core_1.Range(firstDirtyRow, tableStartCol, lastNonNullRow - tableEndRow, tableEndCol - tableStartCol + 1);
        result = Math_max(_getLastNonEmptyRow(sheet, firstDirtyRow, lastNonNullRow, tableStartCol, tableEndCol), tableManager._getLastTableDirtyRow(range));
    }
    return result;
}
function _getLastNonNullColOfSheet(sheet) {
    var modelManager = sheet._modelManager, dataTable = modelManager._getSheetModel(3).dataTable, lastNonNullCol = modelManager.getLastNonNullCol(3, true), sheetRowCount = sheet.getRowCount(), sheetColumnCount = sheet.getColumnCount();
    var result = -1, dr, drc;
    for (var col = sheetColumnCount - 1; col > -1; col--) {
        for (var row = 0; row < sheetRowCount; row++) {
            dr = dataTable[row];
            drc = dr && dr[col];
            if (drc && !isNullOrUndefined(drc.value)) {
                return Math_max(col, lastNonNullCol);
            }
        }
    }
    return Math_max(result, lastNonNullCol);
}
function _getLastNonNulColRightTable(sheet, table) {
    var tableManager = table._owner, tableStartRow = table._row, tableEndRow = tableStartRow + table._rowCount - 1, tableStartCol = table._col, tableColCount = table._colCount, tableEndCol = tableStartCol + tableColCount - 1;
    var lastNonNullCol = _getLastNonNullColOfSheet(sheet), lastTableDirtyCol = tableManager ? tableManager._getLastTableDirtyCol() : -1;
    lastNonNullCol = Math_max(lastNonNullCol, lastTableDirtyCol);
    var result = tableEndCol;
    if (lastNonNullCol > tableEndCol) {
        var firstDirtyCol = tableEndCol + 1;
        var range = new Core_1.Range(tableStartRow, firstDirtyCol, tableEndRow - tableStartRow + 1, lastNonNullCol - tableEndCol);
        result = Math_max(_getLastNonEmptyColumn(sheet, tableStartRow, tableEndRow, firstDirtyCol, lastNonNullCol), tableManager._getLastTableDirtyCol(range));
    }
    return result;
}
function _checkInvalidOperation(sheet, table, startRow, endRow, startCol, endCol, insertCount, isDelete, isRight, ignoreError) {
    var sheetEndRow = sheet.getRowCount() - 1, sheetEndCol = sheet.getColumnCount() - 1, spans = sheet._modelManager.getSpans(), tableList = table._owner && table._owner._tableList;
    if (!isDelete && ((!isRight && sheetEndRow - endRow < insertCount) || (isRight && sheetEndCol - endCol < insertCount))) {
        if (!ignoreError) {
            throwError(getSR().Exp_TableAddRowNoEnoughRoom);
        }
        return true;
    }
    var checkIntersetRangeFunc = isRight ? _checkIntersetRangeRightTable : _checkIntersetRangeBelowTable;
    var result = spans.some(function (span) {
        var r = span.row, c = span.col, rc = span.rowCount, cc = span.colCount;
        return checkIntersetRangeFunc(r, c, rc, cc, startRow, endRow, startCol, endCol);
    });
    if (result) {
        if (!ignoreError) {
            throwError(getSR().Exp_TableAddRowIntersectSpan);
        }
    }
    else if (tableList) {
        result = tableList.some(function (t) {
            var r = t._row, c = t._col, rc = t._rowCount, cc = t._colCount;
            return checkIntersetRangeFunc(r, c, rc, cc, startRow, endRow, startCol, endCol);
        });
        if (result && !ignoreError) {
            throwError(getSR().Exp_TableAddRowIntersectTable);
        }
    }
    return result;
}
function _getFirstNonNullCellInRange(sheet, range, editRange) {
    var row = range.row, col = range.col, endRow = row + range.rowCount, endCol = col + range.colCount;
    for (var r = row; r < endRow; r++) {
        for (var c = col; c < endCol; c++) {
            var cell = sheet.getCell(r, c);
            if (cell.value() || sheet._modelManager.findSpan(r, c)) {
                if (editRange && editRange.equals(new Core_1.Range(cell.row, cell.col, 1, 1))) {
                    continue;
                }
                return new Core_1.Range(r, c, 1, 1);
            }
        }
    }
    return keyword_undefined;
}
function _createTableSelectInfo(table, action) {
    return {
        action: action,
        table: table
    };
}
function _getRelativeRowIndex(table, row) {
    var firstRow = table._row;
    return row - (table._showHeader ? firstRow + 1 : firstRow);
}
function _getRelativeColIndex(table, col) {
    var firstCol = table._col;
    return col - firstCol;
}
function _getRowsChangeKey(isNew) {
    var result = KEY;
    if (isNew) {
        KEY++;
    }
    return result;
}
function _isStringType(value) {
    return typeof value === 'string';
}
function _raiseTableResizing(sheet, resizingTable, oldRange, newRange) {
    var args = {
        sheet: sheet,
        table: resizingTable,
        oldRange: oldRange,
        newRange: newRange
    };
    sheet._trigger(Core_1.Events.TableResizing, args);
}
function _raiseTableResized(sheet, resizedTable, oldRange, newRange) {
    var args = {
        sheet: sheet,
        table: resizedTable,
        oldRange: oldRange,
        newRange: newRange
    };
    sheet._trigger(Core_1.Events.TableResized, args);
}
function _raiseTableRowsChanged(sheet, table, name, row, count, isAfter, deletedItem) {
    var args = {
        sheet: sheet,
        table: table,
        propertyName: name,
        row: _getRelativeRowIndex(table, row),
        count: count
    };
    if (!isNullOrUndefined(isAfter)) {
        args.isAfter = isAfter;
    }
    if (deletedItem) {
        args.deletedItem = deletedItem;
    }
    sheet._trigger(Core_1.Events.TableRowsChanged, args);
}
function _raiseTableColumnsChanged(sheet, table, name, col, count, isAfter) {
    var args = {
        sheet: sheet,
        table: table,
        propertyName: name,
        col: col - table._col,
        count: count
    };
    if (!isNullOrUndefined(isAfter)) {
        args.isAfter = isAfter;
    }
    sheet._trigger(Core_1.Events.TableColumnsChanged, args);
}
function _getUniqueColumnName(table, name, excludeIndex) {
    var index = 0;
    if (table._hasColumnName(name, excludeIndex)) {
        index = 2;
        while (table._hasColumnName(name + index, index)) {
            index++;
        }
    }
    if (index > 0) {
        name = name + index;
    }
    return name;
}
function _isFormula(value) {
    return value && value[0] === '=';
}
function _getTableExpression(expr) {
    var result = -1;
    if (expr) {
        var args = expr.arguments, argItem = void 0;
        for (var i = 0; i < args.length; i++) {
            argItem = args[i];
            if (argItem instanceof SheetsCalc_1._TableExpression) {
                result = i;
                break;
            }
        }
    }
    return result;
}
function _switchIndexFromTableToSheet(table, tableIndex, isRow) {
    var dataRange = table.dataRange(), dataRangeRow = dataRange.row, dataRangeCol = dataRange.col;
    var baseIndex = isRow ? dataRangeRow : dataRangeCol;
    return baseIndex + tableIndex;
}
function _getActualFormulaStr(formulaStr) {
    var result = formulaStr;
    if (formulaStr && formulaStr[0] === '=') {
        result = formulaStr.slice(1);
    }
    return result;
}
function _getRowIndexes(indexes, colIndex) {
    var currentIndex;
    for (var i = 0; i < indexes.length; i++) {
        currentIndex = indexes[i];
       
        if (currentIndex && colIndex === currentIndex.col) {
            return currentIndex;
        }
    }
    return keyword_null;
}
function _getTable(sheet, selection) {
    if (!selection) {
        return null;
    }
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
function _getTables(sheet, selection) {
    if (!selection) {
        return null;
    }
    return sheet.tables._findByRange(selection.row, selection.col, selection.rowCount, selection.colCount);
}
function _dealColumnName(value) {
    if (!isNullOrUndefined(value)) {
        if (typeof value !== 'string') {
            value += '';
        }
        value = value.replace(/\r\n?/g, '\n');
    }
    return value;
}
function _isUndefined(value) {
    return value === keyword_undefined;
}
exports.Util = {
    throwError: throwError,
    setFormulaToSheet: setFormulaToSheet,
    setValue: setValue,
    suspendPaint: suspendPaint,
    resumePaint: resumePaint,
    _getOperatorAdjustor: _getOperatorAdjustor,
    suspendCalcService: suspendCalcService,
    resumeCalcService: resumeCalcService,
    _suspendAll: _suspendAll,
    _resumeAll: _resumeAll,
    getRowCount: getRowCount,
    getColCount: getColCount,
    isValidTableName: isValidTableName,
    formulaToExpression: formulaToExpression,
    expressionToFormula: expressionToFormula,
    checkTableName: checkTableName,
    _createLeftRightCell: _createLeftRightCell,
    _getLastVisibleRow: _getLastVisibleRow,
    _getLastVisibleCol: _getLastVisibleCol,
    _getLastNonNullRowBelowTable: _getLastNonNullRowBelowTable,
    _getLastNonNulColRightTable: _getLastNonNulColRightTable,
    _checkInvalidOperation: _checkInvalidOperation,
    _getFirstNonNullCellInRange: _getFirstNonNullCellInRange,
    _createTableSelectInfo: _createTableSelectInfo,
    _getRelativeRowIndex: _getRelativeRowIndex,
    _getRelativeColIndex: _getRelativeColIndex,
    _getRowsChangeKey: _getRowsChangeKey,
    _isStringType: _isStringType,
    _raiseTableResizing: _raiseTableResizing,
    _raiseTableResized: _raiseTableResized,
    _raiseTableRowsChanged: _raiseTableRowsChanged,
    _raiseTableColumnsChanged: _raiseTableColumnsChanged,
    _getUniqueColumnName: _getUniqueColumnName,
    _isFormula: _isFormula,
    _getTableExpression: _getTableExpression,
    _switchIndexFromTableToSheet: _switchIndexFromTableToSheet,
    _getActualFormulaStr: _getActualFormulaStr,
    _getRowIndexes: _getRowIndexes,
    _getTable: _getTable,
    _getTables: _getTables,
    _dealColumnName: _dealColumnName,
    _isUndefined: _isUndefined
};


/***/ }),

/***/ "./dist/plugins/table/table.entry.js":
/*!*******************************************!*\
  !*** ./dist/plugins/table/table.entry.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./table.interface */ "./dist/plugins/table/table.interface.js");
__webpack_require__(/*! ./table-event */ "./dist/plugins/table/table-event.js");
__webpack_require__(/*! ./table-render */ "./dist/plugins/table/table-render.js");
__webpack_require__(/*! ./table-action */ "./dist/plugins/table/table-action.js");
__webpack_require__(/*! ./table-util */ "./dist/plugins/table/table-util.js");
__export(__webpack_require__(/*! ./table-theme */ "./dist/plugins/table/table-theme.js"));
__export(__webpack_require__(/*! ./table */ "./dist/plugins/table/table.js"));
__export(__webpack_require__(/*! ./table.ns */ "./dist/plugins/table/table.ns.js"));


/***/ }),

/***/ "./dist/plugins/table/table.interface.js":
/*!***********************************************!*\
  !*** ./dist/plugins/table/table.interface.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./dist/plugins/table/table.js":
/*!*************************************!*\
  !*** ./dist/plugins/table/table.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";









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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __webpack_require__(/*! Core */ "Core");
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ "SheetsCalc");
var Common_1 = __webpack_require__(/*! Common */ "Common");
var CalcEngine = __webpack_require__(/*! CalcEngine */ "CalcEngine");
var Filters = __webpack_require__(/*! Filters */ "Filters");
var Bindings_1 = __webpack_require__(/*! Bindings */ "Bindings");
var table_ns_1 = __webpack_require__(/*! ./table.ns */ "./dist/plugins/table/table.ns.js");
var table_theme_1 = __webpack_require__(/*! ./table-theme */ "./dist/plugins/table/table-theme.js");
var table_util_1 = __webpack_require__(/*! ./table-util */ "./dist/plugins/table/table-util.js");
var defProperty = Core_1._util._defProperty, isDefined = Core_1._util._isDefined, util_toString = Core_1._util._toString, $_inArray = Core_1.GC$.inArray, $_each = Core_1.GC$.each, $_isEmptyObject = Core_1.GC$.isEmptyObject, isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined, _DateTimeHelper = Common_1.Common._DateTimeHelper, _ArrayHelper_contains = Common_1.Common._ArrayHelper._contains, arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength, hasOwnProperty = Common_1.Common._hasOwnProperty;
var throwError = table_util_1.Util.throwError, setFormulaToSheet = table_util_1.Util.setFormulaToSheet, setValue = table_util_1.Util.setValue, suspendPaint = table_util_1.Util.suspendPaint, resumePaint = table_util_1.Util.resumePaint, _getOperatorAdjustor = table_util_1.Util._getOperatorAdjustor, suspendCalcService = table_util_1.Util.suspendCalcService, resumeCalcService = table_util_1.Util.resumeCalcService, getRowCount = table_util_1.Util.getRowCount, getColCount = table_util_1.Util.getColCount, checkTableName = table_util_1.Util.checkTableName, isValidTableName = table_util_1.Util.isValidTableName, formulaToExpression = table_util_1.Util.formulaToExpression, expressionToFormula = table_util_1.Util.expressionToFormula, _createLeftRightCell = table_util_1.Util._createLeftRightCell, _getLastVisibleRow = table_util_1.Util._getLastVisibleRow, _getLastVisibleCol = table_util_1.Util._getLastVisibleCol, _getLastNonNullRowBelowTable = table_util_1.Util._getLastNonNullRowBelowTable, _getLastNonNulColRightTable = table_util_1.Util._getLastNonNulColRightTable, _checkInvalidOperation = table_util_1.Util._checkInvalidOperation, _getFirstNonNullCellInRange = table_util_1.Util._getFirstNonNullCellInRange, _createTableSelectInfo = table_util_1.Util._createTableSelectInfo, _getRelativeRowIndex = table_util_1.Util._getRelativeRowIndex, _getRelativeColIndex = table_util_1.Util._getRelativeColIndex, _getRowsChangeKey = table_util_1.Util._getRowsChangeKey, _isStringType = table_util_1.Util._isStringType, _suspendAll = table_util_1.Util._suspendAll, _resumeAll = table_util_1.Util._resumeAll, _raiseTableRowsChanged = table_util_1.Util._raiseTableRowsChanged, _raiseTableColumnsChanged = table_util_1.Util._raiseTableColumnsChanged, _getUniqueColumnName = table_util_1.Util._getUniqueColumnName, _isFormula = table_util_1.Util._isFormula, _getTableExpression = table_util_1.Util._getTableExpression, _switchIndexFromTableToSheet = table_util_1.Util._switchIndexFromTableToSheet, _getActualFormulaStr = table_util_1.Util._getActualFormulaStr, _getRowIndexes = table_util_1.Util._getRowIndexes, _getTables = table_util_1.Util._getTables, _dealColumnName = table_util_1.Util._dealColumnName, _isUndefined = table_util_1.Util._isUndefined;
var keyword_null = null, keyword_undefined = void 0, Math_min = Math.min, Math_ceil = Math.ceil, Math_max = Math.max, JSON_STRINGIFY = JSON.stringify, JSON_PARSE = JSON.parse, CONST_NAME = 'name', CONST_CELLTYPE = 'cellType', CONST_VALUE = 'value', CONST_FORMATTER = 'formatter', CONST_HIGHLIGHT_FIRST_COLUMN = 'highlightFirstColumn', CONST_HIGHLIGHT_LAST_COLUMN = 'highlightLastColumn', CONST_BAND_ROWS = 'bandRows', CONST_BAND_COLUMNS = 'bandColumns', CONST_AUTO_GENERATE_COLUMNS = 'autoGenerateColumns';
var HEADER_ROW_STYLE = 'headerRowStyle', FOOTER_ROW_STYLE = 'footerRowStyle', WHOLE_TABLE_STYLE = 'wholeTableStyle', HIGHLIGHT_LAST_COLUMN_STYLE = 'highlightLastColumnStyle', HIGHLIGHT_FIRST_COLUMN_STYLE = 'highlightFirstColumnStyle', FIRST_ROW_STRIP_STYLE = 'firstRowStripStyle', SECOND_ROW_STRIP_STYLE = 'secondRowStripStyle', FIRST_COLUMN_STRIP_STYLE = 'firstColumnStripStyle', SECOND_COLUMN_STRIP_STYLE = 'secondColumnStripStyle', FIRST_HEADER_CELL_STYLE = 'firstHeaderCellStyle', LAST_HEADER_CELL_STYLE = 'lastHeaderCellStyle', FIRST_FOOTER_CELL_STYLE = 'firstFooterCellStyle', LAST_FOOTER_CELL_STYLE = 'lastFooterCellStyle';
var FIRST_ROW_STRIP_SIZE = 'firstRowStripSize', SECOND_ROW_STRIP_SIZE = 'secondRowStripSize', FIRST_COLUMN_STRIP_SIZE = 'firstColumnStripSize', SECOND_COLUMN_STRIP_SIZE = 'secondColumnStripSize', TABLE_NS = '.table';
var CONST_COLUMN = 'Column', CONST_ID = 'id', CONST_DATAFIELD = 'dataField', CONST_FOOTER_FORMULA = 'footerFormula', CONST_DATA_AREA_FORMULA_STR = 'dataAreaFormulaStr', CONST_ARRAY_INFO = 'isArrayFormula', CONST_DATA_AREA_FORMULA = 'dataAreaFormula', CONST_FOOTER_VALUE = 'footerValue', FOOTER_ROW_STYLES = "footerRowStyles";
var tcProperties = [CONST_ID, CONST_NAME, CONST_CELLTYPE, CONST_VALUE, CONST_FORMATTER, CONST_DATAFIELD, CONST_FOOTER_FORMULA, CONST_DATA_AREA_FORMULA, CONST_FOOTER_VALUE];
var RESIZE_INDICATOR_SIZE = 4, RESIZE_HALF_INDICATOR_SIZE = 2;
var TABLE = 'table', TABLE_RESIZE = 'tableResize', TABLE_RESIZE_INDICATOR_COLOR = '#485DB1';
var TABLE_INSERT_ROWS = 'tableInsertRows', DO_INSERT_ROW = "DoInsertRows", TABLE_SHOW_FOOTER = "tableShowFooter", TABLE_DELETE_ROWS = 'tableDeleteRows', TABLE_INSERT_COLUMNS = "tableInsertColumns", TABLE_DELETE_COLUMNS = "tableDeleteColumns";
var COLLECTION = "collection", TABLE_COLUMN = "tableColumn", PROPERTY = "property", DATA_SOURCE = "dataSource", ROWS_CHANGE = "rowsChange", PROPERTY_RANGE = "range", PROPERTY_COLUMN = "columns", TABLE_EXPRESSION = "tableExpression", SHEET_EXPRESSION = "sheetExpression";
var TYPE_NUMBER = 'number', TYPE_STRING = "string";
var rm = new Common_1.Common.ResourceManager(table_ns_1.SR, "Tables");
var getSR = rm.getResource.bind(rm);
var TableSelectionType;
(function (TableSelectionType) {
    TableSelectionType["TABLE_ROW_SELECT"] = "tableRowSelect";
    TableSelectionType["TABLE_COL_SELECT"] = "tableColSelect";
    TableSelectionType["TABLE_CORNER_SELECT"] = "tableCornerSelect";
    TableSelectionType["TABLE_SELECT"] = "tableSelect";
})(TableSelectionType = exports.TableSelectionType || (exports.TableSelectionType = {}));
var RowStateType;
(function (RowStateType) {
    RowStateType[RowStateType["deleted"] = 0] = "deleted";
    RowStateType[RowStateType["dirty"] = 1] = "dirty";
})(RowStateType || (RowStateType = {}));
function resetAlterCache(alterCache, startIndex) {
    var needClearAll = false;
    if (!isNullOrUndefined(alterCache[startIndex])) {
        for (var i = alterCache.length - 1; i > startIndex; i--) {
            var index = i - 1;
            if (isNullOrUndefined(alterCache[index])) {
                needClearAll = true;
                break;
            }
            alterCache[i] = alterCache[index];
        }
    }
    else {
        needClearAll = true;
    }
    return needClearAll;
}

function adjustFormulaOnRemoveTables(sheet, tables, convertToError) {
    var workbook = sheet.parent, adjustor = _getOperatorAdjustor(sheet);
    function adjustNames(names, removedTables) {
        $_each(names, function (index, ne) {
            var oldExpr = ne.getExpression();
            var newExpr = SheetsCalc_1.CalcOperatorAdjustor.adjustExpressionOnRemoveTable(oldExpr, removedTables, -1, -1, convertToError);
            if (newExpr !== oldExpr) {
                ne._setExpression(newExpr);
                adjustor.invalidName(sheet._getSheetSource(), ne.getName());
            }
        });
    }
    if (workbook) {
        adjustNames(workbook.getCustomNames(), tables);
        $_each(workbook.sheets, function (index, worksheet) {
            adjustNames(worksheet.getCustomNames(), tables);
        });
    }
    else {
        adjustNames(sheet.getCustomNames(), tables);
    }
    adjustor.onAfterRemoveTable(tables, convertToError);
}
function createButtonDropdownListStyle(tableName, columnName) {
    var button = {
        position: Core_1.ButtonPosition.right,
        imageType: Core_1.ButtonImageType.dropdown,
        visibility: Core_1.ButtonVisibility.onSelected,
        useButtonStyle: false,
        command: 'openList'
    };
    var itemList = [
        {
            text: getSR().Table_None,
            value: null
        },
        {
            text: getSR().Table_Average,
            value: "=SUBTOTAL(101,[" + columnName + "])"
        },
        {
            text: getSR().Table_Count,
            value: "=SUBTOTAL(103,[" + columnName + "])"
        },
        {
            text: getSR().Table_Count_Numbers,
            value: "=SUBTOTAL(102,[" + columnName + "])"
        },
        {
            text: getSR().Table_Max,
            value: "=SUBTOTAL(104,[" + columnName + "])"
        },
        {
            text: getSR().Table_Min,
            value: "=SUBTOTAL(105,[" + columnName + "])"
        },
        {
            text: getSR().Table_Sum,
            value: "=SUBTOTAL(109,[" + columnName + "])"
        },
        {
            text: getSR().Table_StdDev,
            value: "=SUBTOTAL(107,[" + columnName + "])"
        },
        {
            text: getSR().Table_Var,
            value: "=SUBTOTAL(110,[" + columnName + "])"
        }
    ];
    var listOption = {
        items: itemList
    };
    var tableStyle = new Core_1.Style();
    tableStyle.cellButtons = [button];
    tableStyle.dropDowns = [{
            type: Core_1.DropDownType.list,
            option: listOption,
            submitCommand: "tableTotalRowFormula"
        }];
    return tableStyle;
}
Core_1.Worksheet._registerFeature(TABLE, {
    priority: 2000,
    init: function () {
        var self = this;
       
       
       
       
       
       
       
       
       
       
        
        self.tables = self._modelManager._tables;
        self.unbind(TABLE_NS);
        self.bind(Core_1.Events.BeforeDragDrop + TABLE_NS, function (sender, args) {
            var sheet = self, tableManager = self.tables;
            var Exp_DragDropChangePartOfTable = getSR().Exp_DragDropChangePartOfTable;
            var fromRow = args.fromRow;
            var fromColumn = args.fromColumn;
            var rowCount = getRowCount(args);
            var columnCount = args.columnCount;
            var dragRect = sheet._eventHandler._dragRect;
            var toRow = dragRect.row;
            var toColumn = dragRect.col;
            var isDragInsert = args.isDragInsert;
            var isDragCopy = args.isDragCopy;
            var invalidMessage = keyword_null;
            if (isDragInsert && (fromRow === -1 || fromColumn === -1)) {
                if (fromColumn >= 0) {
                   
                    if ((self.isDragCopy && (toColumn <= fromColumn || toColumn >= fromColumn + columnCount)) ||
                        (!isDragCopy && (toColumn < fromColumn || toColumn > fromColumn + columnCount))) {
                        var isInvalid = false;
                        if (tableManager._hasPartTable(-1, toColumn, -1, 1)) {
                            isInvalid = true;
                            invalidMessage = getSR().Exp_DragDropShiftTableCell;
                        }
                        if (!isInvalid && !isDragCopy && tableManager._hasPartTable(-1, fromColumn, -1, columnCount)) {
                            invalidMessage = Exp_DragDropChangePartOfTable;
                        }
                    }
                }
                else if (fromRow >= 0 && fromColumn < 0) { 
                   
                    if ((isDragCopy && (toRow <= fromRow || toRow >= fromRow + rowCount)) || (!isDragCopy && (toRow < fromRow || toRow > fromRow + rowCount))) { 
                        if (!isDragCopy && tableManager._hasPartTable(fromRow, -1, rowCount, -1)) {
                            invalidMessage = Exp_DragDropChangePartOfTable;
                        }
                    }
                }
            }
            args.invalidMessage = invalidMessage;
        });
        self.bind(Core_1.Events.RowChanged + TABLE_NS, function (sender, args) {
            var manager = self.tables;
            var rowHeightCache = manager._rowHeightCache;
            var propertyName = args.propertyName;
            if (propertyName === "isVisible") {
                if (args.newValue === false) {
                    rowHeightCache[args.row] = 0;
                }
                else {
                    rowHeightCache[args.row] = keyword_undefined;
                }
                manager._removeAlterRowCache(args.row);
            }
            else if (propertyName === "height") {
                rowHeightCache[args.row] = keyword_undefined;
                manager._removeAlterRowCache(args.row);
            }
        });
        self.bind(Core_1.Events.RowHeightChanged + TABLE_NS, function (sender, args) {
            var manager = self.tables;
            var rowHeightCache = manager._rowHeightCache;
            for (var _i = 0, _a = args.rowList; _i < _a.length; _i++) {
                var row = _a[_i];
                rowHeightCache[row] = keyword_undefined;
                var sheet = args.sheet, rowHeight = sheet.getRowHeight(row);
                manager._removeAlterRowCache(row, rowHeight > 0);
            }
        });
        self.bind(Core_1.Events.ColumnChanged + TABLE_NS, function (sender, args) {
            var manager = self.tables;
            var colWidthCache = manager._colWidthCache;
            if (args.propertyName === "isVisible") {
                if (args.newValue === false) {
                    colWidthCache[args.col] = 0;
                }
                else {
                    colWidthCache[args.col] = keyword_undefined;
                }
                manager._removeAlterColCache(args.col);
            }
            else if (args.propertyName === "width") {
                colWidthCache[args.col] = keyword_undefined;
                manager._removeAlterColCache(args.col);
            }
        });
        self.bind(Core_1.Events.ColumnWidthChanged + TABLE_NS, function (sender, args) {
            var manager = self.tables;
            var colWidthCache = manager._colWidthCache;
            for (var _i = 0, _a = args.colList; _i < _a.length; _i++) {
                var col = _a[_i];
                colWidthCache[col] = keyword_undefined;
                manager._removeAlterColCache(col);
            }
        });
        self.bind(Core_1.Events.RangeFiltered + TABLE_NS, function (sender, args) {
            var manager = self.tables;
            var rowHeightCache = manager._rowHeightCache;
            var range = args.sheet._rowFilter.range;
            for (var i = 0; i < range.rowCount; i++) {
                rowHeightCache[range.row + i] = keyword_undefined;
                manager._removeAlterRowCache(range.row + i);
            }
        });
        self.bind(Core_1.Events.TableFiltered + TABLE_NS, function (sender, args) {
            var manager = self.tables;
            var rowHeightCache = manager._rowHeightCache;
            var range = args.table.range();
            for (var i = 0; i < range.rowCount; i++) {
                rowHeightCache[range.row + i] = keyword_undefined;
                manager._removeAlterRowCache(range.row + i);
            }
        });
        self.bind(Core_1.Events.TableFilterCleared + TABLE_NS, function (e, info) {
            var manager = self.tables;
            manager._clearCache();
        });
    },
    resetBinding: function (args) {
        this.tables._resetTablesBindingManager();
    },
    initBinding: function (args) {
        var self = this;
        var tm = self.tables;
        tm._resetTablesBindingManager();
        suspendCalcService(self);
        var tables = tm.all();
        for (var i = 0, count = tables.length; i < count; i++) {
            var table = tables[i];
            if (table) {
                table._applyBindingPath();
            }
        }
        resumeCalcService(self);
    },
    dispose: function (argus) {
        if (argus.clearCache !== false) {
            this.unbind(TABLE_NS);
            if (this.tables) {
                this.tables._dispose();
                this.tables = null;
            }
        }
    },
    clearPendingChanges: function () {
        var tables = this.tables;
        tables && tables._clearPendingChanges();
    },
    onGroupChanged: function (args) {
        var self = this;
        var manager = self.tables;
        if (args.fromSetCollapsed) {
            var cache = args.isRow ? manager._rowHeightCache : manager._colWidthCache;
            for (var index = args.start; index <= args.end; index++) {
                cache[index] = keyword_undefined;
                if (args.isRow) {
                    manager._removeAlterRowCache(index);
                }
                else {
                    manager._removeAlterColCache(index);
                }
            }
        }
    },
    onLayoutChanged: function (e) {
        var self = this;
        var changeType = e.changeType;
        var row = e.row;
        var rowCount = e.rowCount;
        var col = e.col;
        var colCount = e.colCount;
        var tableManager = self.tables;
        if (changeType === 'addRows') {
            tableManager._onRowsAdded(row, rowCount);
            tableManager._clearCache();
        }
        else if (changeType === 'addRows2') {
            tableManager._onRowsAdded2(row, rowCount);
        }
        else if (changeType === 'deleteRows') {
            tableManager._onRowsRemoved(row, rowCount);
            tableManager._clearCache();
        }
        else if (changeType === 'addColumns') {
            tableManager._onColumnsAdded(col, colCount);
            tableManager._clearCache();
        }
        else if (changeType === 'deleteColumns') {
            tableManager._onColumnsRemoved(col, colCount);
            tableManager._clearCache();
        }
        else if (changeType === 'addColumns2' || changeType === 'deleteColumns2') {
           
            tableManager._onColumnsChanged(col);
        }
        else if (changeType === 'clear') {
            var sheetArea = e.sheetArea;
            if (!e.ignoreTable && (sheetArea === 3 || isNullOrUndefined(sheetArea))) {
                tableManager._clear(row, col, rowCount, colCount, e.type);
            }
        }
        else if (changeType === 'setRowCount') {
            tableManager._clearCache();
        }
        else if (changeType === 'setColumnCount') {
            tableManager._clearCache();
        }
    },
    toJson: function (dataDic, serializationOption) {
        function _serializeTablesDataSource(sheet, dataTable) {
            var allTables = sheet.tables.all();
            for (var i = 0, length_1 = allTables.length; i < length_1; i++) {
                var table = allTables[i], tableDataSource = table._getDataSource(), tableDataRange = table.dataRange(), tableDataRangeStartRow = tableDataRange.row, tableDataRangeStartCol = tableDataRange.col, tableDataRangeEndRow = tableDataRangeStartRow + getRowCount(tableDataRange) - 1, tableDataRangeEndCol = tableDataRangeStartCol + getColCount(tableDataRange) - 1;
                if (tableDataSource) {
                    for (var r = tableDataRangeStartRow; r <= tableDataRangeEndRow; r++) {
                        for (var c = tableDataRangeStartCol; c <= tableDataRangeEndCol; c++) {
                            var boundValue = table._getValue(r, c);
                            if (boundValue._hasValue) {
                                var convertedValue = boundValue._value;
                                if (_DateTimeHelper._isDate(convertedValue)) {
                                    convertedValue = _DateTimeHelper._toOADateString(convertedValue);
                                }
                                sheet._setValueToDataTable(dataTable, r, c, convertedValue);
                            }
                        }
                    }
                }
            }
        }
        var self = this, tables = self.tables;
        var ignoreStyle = serializationOption && serializationOption.ignoreStyle;
        var newName = serializationOption && serializationOption.newWorkSheetName;
        if (!ignoreStyle) {
            if (tables) {
                dataDic.tables = tables.toJSON(newName);
            }
            if (serializationOption && serializationOption.includeBindingSource) {
                var data = dataDic.data;
                data.dataTable = data.dataTable || {};
                _serializeTablesDataSource(self, data.dataTable);
            }
        }
    },
    fromJson: function (sheetSettings, noSchema, deserializationOptions) {
        var sheet = this, sheet_tables = sheet.tables, sheetSettings_tableManager = sheetSettings.tableManager;
        var tables = noSchema ? (sheetSettings_tableManager && sheetSettings_tableManager.tables) : sheetSettings.tables;
        var ignoreStyle = deserializationOptions && deserializationOptions.ignoreStyle;
        if (isDefined(tables) && !ignoreStyle && sheet_tables) {
            sheet_tables.fromJSON(tables, noSchema);
        }
    },
    fromJsonAfterFormula: function (data, noSchema, deserializationOptions) {
        var sheet = this, sheet_tables = sheet.tables;
        sheet_tables.all().forEach(function (table) {
            table.formulaFromJSON();
        });
    },
    lastNonNullRowAndCol: function () {
        var self = this;
        var tableManager = self.tables;
        var lastRow = 0;
        var lastColumn = 0;
        var tableList = tableManager.all();
        if (tableList) {
            for (var i = 0, len = tableList.length; i < len; i++) {
                var table = tableList[i];
                if (table) {
                    var range = table.range();
                    var bottom = range.row + getRowCount(range) - 1;
                    var right = range.col + getColCount(range) - 1;
                    if (bottom > lastRow) {
                        lastRow = bottom;
                    }
                    if (right > lastColumn) {
                        lastColumn = right;
                    }
                }
            }
        }
        return {
            lastNonNullRow: lastRow,
            lastNonNullCol: lastColumn
        };
    },
    paintCell: function (e) {
        var self = this;
        if (!e.isPrinting && e.sheetArea === Core_1.SheetArea.viewport  && !self.options.isProtected) {
            var tableManager = self.tables;
            var ctx = e.ctx, cell = e.cell, row = cell.row, col = cell.col;
            var table = tableManager.find(row, col);
           
            if (table && table.showResizeHandle() && !table._inBinding()) {
                var lastRow = _getLastVisibleRow(self, table), lastCol = _getLastVisibleCol(self, table);
                if (row === lastRow && col === lastCol) {
                    var x = cell.x, y = cell.y, width = cell.width, height = cell.height;
                    var zoomFactor = self.zoom();
                    var indicatorSize = Math_ceil(RESIZE_INDICATOR_SIZE * zoomFactor),
                    halfIndicatorSize = Math_ceil(RESIZE_HALF_INDICATOR_SIZE * zoomFactor);
                    var hPosition = x + width, vPosition = y + height;
                    if (ctx && width > 0 && height > 0) {
                        ctx.save();
                        ctx.rect(x, y, width, height);
                        ctx.clip();
                        ctx.fillStyle = TABLE_RESIZE_INDICATOR_COLOR;
                        ctx.beginPath();
                        ctx.moveTo(hPosition - indicatorSize, vPosition);
                        ctx.lineTo(hPosition, vPosition);
                        ctx.lineTo(hPosition, vPosition - halfIndicatorSize);
                        ctx.lineTo(hPosition - indicatorSize, vPosition - halfIndicatorSize);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(hPosition, vPosition - halfIndicatorSize);
                        ctx.lineTo(hPosition - halfIndicatorSize, vPosition - halfIndicatorSize);
                        ctx.lineTo(hPosition - halfIndicatorSize, vPosition - indicatorSize);
                        ctx.lineTo(hPosition, vPosition - indicatorSize);
                        ctx.fill();
                        ctx.restore();
                    }
                }
            }
        }
    },
    composeTableFooterList: function (args) {
        var table = args.table, row = args.row, col = args.col, style = args.style;
        table._composeFooterStyle(row, col, style);
    }
});
Core_1.Worksheet.prototype._raiseTableRowsChanged = function (table, propertyName, row, rowCount, isAfter, isDelete) {
    var deletedItem = isDelete ? keyword_undefined : table._getDeletedRows();
    _raiseTableRowsChanged(this, table, propertyName, row, rowCount, isAfter, deletedItem);
};
Core_1.Worksheet.prototype._raiseTableColumnsChanged = function (table, propertyName, col, colCount, isAfter) {
    _raiseTableColumnsChanged(this, table, propertyName, col, colCount, isAfter);
};
Core_1.Workbook.prototype._findTable = function (tableName) {
    var sheets = this.sheets, table, tableManager;
    if (sheets) {
        for (var i = 0; i < sheets.length; i++) {
            tableManager = sheets[i].tables;
            if (tableManager) {
                table = tableManager.findByName(tableName);
                if (table) {
                    return table;
                }
            }
        }
    }
    return keyword_null;
};



var Table =  (function () {
    function Table(name, row, col, rowCount, colCount, style, options) {
        var self = this;
        self._showHeader = (options && options.showHeader !== keyword_undefined) ? options.showHeader : true;
        self._showFooter = (options && options.showFooter !== keyword_undefined) ? options.showFooter : false;
        self._useFooterDropDownList = (options && options.useFooterDropDownList !== keyword_undefined) ? options.useFooterDropDownList : false;
        self._showResizeHandle = (options && options.showResizeHandle !== keyword_undefined) ? options.showResizeHandle : false;
        self._footerRowStyles = [];
        self._bindingManager = keyword_null;
        self._rowFilter = keyword_null;
        self._owner = keyword_null;
        self._expandBoundRows = false;
        if (isDefined(name)) {
            self.name(name);
        }
        self._row = isDefined(row) ? row : -1;
        self._col = isDefined(col) ? col : -1;
        self._rowCount = isDefined(rowCount) ? rowCount : -1;
        self._colCount = isDefined(colCount) ? colCount : -1;
        if (isDefined(style)) {
            self.style(style);
        }
       
        self._columns = [];
        for (var i = 0; i < self._colCount; i++) {
            self._columns.push(new TableColumn(i + 1));
        }
       
        self._slicerData = keyword_null;
       
        self._referenceInfos = {};
        self._chartReferenceInfos = [];
        self._deletedRows = [];
        self._dirtyRows = [];
        self._backupDeletedDirtyRows = [];
        self._alterRowCache = [];
        self._alterColCache = [];
        self._allowAutoExpand = true;
    }
    Table.prototype._dispose = function () {
        var self = this;
        self._columns = [];
        self._footerRowStyles = [];
        self._deletedRows = [];
        self._dirtyRows = [];
        self._backupDeletedDirtyRows = [];
        self._referenceInfos = {};
        self._chartReferenceInfos = [];
        self._sheet = keyword_null;
        self._owner = keyword_null;
        if (self._rowFilter) {
            self._rowFilter._dispose();
            self._rowFilter = keyword_null;
        }
        self._clearCache();
    };
    Table.prototype._clearCache = function () {
        this._alterRowCache = [];
        this._alterColCache = [];
    };
   
    
    Table.prototype.range = function () {
        var self = this;
        return Core_1._createRange(self._row, self._col, self._rowCount, self._colCount);
    };
   
    
    Table.prototype.dataRange = function () {
        var self = this;
        var r = (self._showHeader ? self._row + 1 : self._row);
        var rc = (self._showHeader ? self._rowCount - 1 : self._rowCount);
        if (self._showFooter) {
            rc--;
        }
        return Core_1._createRange(r, self._col, rc, self._colCount);
    };
   
    
    Table.prototype.headerIndex = function () {
        return (this._showHeader ? this._row : -1);
    };
   
    
    Table.prototype.footerIndex = function () {
        return (this._showFooter ? this._row + this._rowCount - 1 : -1);
    };
   
    
    Table.prototype.showHeader = function (value) {
        var self = this;
        if (arguments.length === 0) {
            return self._showHeader;
        }
       
        if (self._showHeader !== value) {
            var sheet = self._sheet;
            if (sheet) {
                sheet.suspendPaint();
            }
            self._showHeaderInternal(value);
            if (sheet) {
                sheet.resumePaint();
            }
        }
        return self;
    };
    Table.prototype._showHeaderInternal = function (value) {
        var self = this;
        var sheet = self._sheet;
        if (sheet) {
            sheet._modelManager._backupTableProperty(self, "showHeader", self._showHeader);
        }
        var show = self._showHeader = value;
        if (show) {
            if (self._row > 0) {
                self._row = self._row - 1;
                self._rowCount += 1;
            }
           
            self._syncHeader();
        }
        else {
            var oldRow = self._row;
            self._row = self._row + 1;
            self._rowCount -= 1;
           
            self._clearSheetRow(oldRow);
            self._resetFilter();
        }
        if (sheet) {
            CalcEngine && sheet.recalcRange(self._row + (value ? 0 : -1), self._col, 1, self._colCount);
        }
    };
   
    
    Table.prototype.showFooter = function (value, isFooterInserted) {
        var self = this;
        if (arguments.length === 0) {
            return self._showFooter;
        }
       
        if (self._showFooter !== value) {
            var sheet = self._sheet;
            if (sheet) {
                sheet.suspendPaint();
            }
            try {
                self._showFooterInternal(value, isFooterInserted ? isFooterInserted : false);
            }
            finally {
                if (sheet) {
                    sheet.resumePaint();
                }
            }
        }
        return self;
    };
   
    
    Table.prototype.expandBoundRows = function (value) {
        var self = this;
        if (arguments.length === 0) {
            return self._expandBoundRows;
        }
        if (self._expandBoundRows !== value) {
            self._expandBoundRows = value;
        }
        return self;
    };
    Table.prototype._showFooterInternal = function (value, isFooterInserted) {
        var self = this;
        var sheet = self._sheet;
        if (sheet) {
            sheet._modelManager._backupTableProperty(self, "showFooter", self._showFooter);
        }
        var oldRowCount = self._rowCount;
        if (value) {
            if ((!sheet || self._row + oldRowCount < sheet.getRowCount()) && (!isFooterInserted || self._moveRowBelowTable(true , oldRowCount))) {
                self._showFooter = value;
                self._rowCount += 1;
               
               
               
               
                var tcs = self._columns, tcsLength = tcs.length, row = self.footerIndex();
                var baseCol = self._col;
                for (var i = 0; i < tcsLength; i++) {
                    var tc = tcs[i], expr = tc && tc.footerFormula(), col = baseCol + i;
                    if (expr) {
                        var formula = expressionToFormula(sheet, expr, row, col);
                        if (formula) {
                           
                            expr = formulaToExpression(sheet, formula, row, col);
                            tc.footerFormula(expr);
                        }
                    }
                }
            }
           
            self._syncFooter();
        }
        else {
            self._showFooter = value;
            var oldRow = self._row + oldRowCount - 1;
            self._rowCount -= 1;
           
            self._clearSheetRow(oldRow);
            self._updateReference();
            self._noticeChartUpdateTableRange(0 );
            if (isFooterInserted) {
                self._moveRowBelowTable(false , oldRowCount);
            }
        }
        if (sheet) {
            CalcEngine && sheet.recalcRange(self._row + self._rowCount + (value ? -1 : 0), self._col, 1, self._colCount);
        }
    };
    Table.prototype._moveRowBelowTable = function (isMoveDown, rowCount) {
        var self = this, sheet = self._sheet, startRow = self._row + rowCount, startCol = self._col, colCount = self._colCount, endCol = startCol + colCount - 1;
        var lastNonNullRow = _getLastNonNullRowBelowTable(sheet, self), hasNonNullRowBelowTable = lastNonNullRow >= startRow;
        var firstNonNulRange = _getFirstNonNullCellInRange(sheet, new Core_1.Range(startRow, startCol, lastNonNullRow - startRow + 1, endCol - startCol + 1)), fistNonNulRow = firstNonNulRange && firstNonNulRange.row;
        var needMove = fistNonNulRow === startRow;
        if (needMove && _checkInvalidOperation(sheet, self, startRow, lastNonNullRow, startCol, endCol, 1)) {
            return false;
        }
        if (needMove && hasNonNullRowBelowTable) {
            var moveToRowIndex = isMoveDown ? startRow + 1 : startRow - 1;
            sheet.moveTo(startRow, startCol, moveToRowIndex, startCol, lastNonNullRow - startRow + 1, colCount, 1023 );
        }
        return true;
    };
    Table.prototype._createFooterButton = function (isFromJSON) {
        var self = this;
        var tcs = self._columns, tcsLength = tcs.length;
        var baseCol = self._col;
        var footerRowStyles = [];
        var tableName = self.name();
        for (var tableColumnIndex = 0; tableColumnIndex < tcsLength; tableColumnIndex++) {
            var col = baseCol + tableColumnIndex;
            var columnName = self.getColumnName(tableColumnIndex);
            footerRowStyles.push(createButtonDropdownListStyle(tableName, columnName));
            if (!isFromJSON) {
                if (tableColumnIndex === 0) {
                    self._setFooterValue(col, getSR().Table_Total, true );
                }
                else if (tableColumnIndex === tcsLength - 1) {
                   
                    var hasFooterFormula = tcs[tableColumnIndex].footerFormula();
                    if (!hasFooterFormula) {
                        if (self._isColumnValueAllNumber(col)) {
                            self._setFooterFormula(tableColumnIndex, "=SUBTOTAL(109," + tableName + "[" + columnName + "])");
                        }
                        else {
                            self._setFooterFormula(tableColumnIndex, "=SUBTOTAL(103," + tableName + "[" + columnName + "])");
                        }
                    }
                }
            }
        }
        self._footerRowStyles = footerRowStyles;
    };
    Table.prototype._isColumnValueAllNumber = function (col) {
        var self = this, sheet = self._sheet, dataRange = self.dataRange();
        var isColumnValueAllNumber = true;
        var dataRowCount = dataRange.rowCount;
        var dataStartRow = dataRange.row;
        for (var j = 0; j < dataRowCount; j++) {
            var cellValue = sheet.getValue(dataStartRow + j, col);
            if (!isNullOrUndefined(cellValue) && typeof cellValue !== TYPE_NUMBER) {
                isColumnValueAllNumber = false;
                break;
            }
        }
        return isColumnValueAllNumber;
    };
    Table.prototype._isFooterButtonSet = function () {
        return this._footerRowStyles && this._footerRowStyles.length > 0;
    };
    Table.prototype._modifyFooterRowStyles = function (columnIndex, deleteCount, InsertStyle) {
        var self = this, sheet = this._sheet;
        if (self._isFooterButtonSet()) {
            if (sheet) {
                sheet._modelManager._backupTableProperty(self, FOOTER_ROW_STYLES, self._cloneFooterRowStyles());
            }
            if (deleteCount >= 0) {
                if (InsertStyle) {
                    self._footerRowStyles.splice(columnIndex, deleteCount, InsertStyle);
                }
                else {
                    self._footerRowStyles.splice(columnIndex, deleteCount);
                }
            }
        }
    };
    Table.prototype._cloneFooterRowStyles = function () {
        var self = this, footerRowStyles = self._footerRowStyles, newFooterRowStyles = [];
        footerRowStyles.forEach(function (item) {
            item && newFooterRowStyles.push(item.clone());
        });
        return newFooterRowStyles;
    };
    Table.prototype._updateFooterRowStyles = function (columnIndex, deleteCount, columnName) {
        var self = this, insertStyle = isDefined(columnName) ? createButtonDropdownListStyle(self.name(), columnName) : keyword_null;
        if (self._isFooterButtonSet()) {
            self._modifyFooterRowStyles(columnIndex, deleteCount, insertStyle);
        }
    };
   
    
    Table.prototype.useFooterDropDownList = function (value) {
        var self = this, sheet = self._sheet;
        if (arguments.length === 0) {
            return self._useFooterDropDownList;
        }
        if (sheet) {
            sheet.suspendPaint();
           
            if (self._useFooterDropDownList !== value) {
                sheet._modelManager._backupTableProperty(self, "useFooterDropDownList", self._useFooterDropDownList);
                self._useFooterDropDownList = value;
                if (self._useFooterDropDownList && !self._isFooterButtonSet()) {
                    self._createFooterButton();
                    self._syncSheetByFooter();
                }
            }
            sheet.resumePaint();
        }
        return self;
    };
   
    
    Table.prototype.showResizeHandle = function (value) {
        var self = this, sheet = self._sheet;
        if (arguments.length === 0) {
            return self._showResizeHandle;
        }
        if (sheet) {
            sheet.suspendPaint();
            if (self._showResizeHandle !== value) {
                sheet._modelManager._backupTableProperty(self, "showResizeHandle", self._showResizeHandle);
                self._showResizeHandle = value;
            }
            sheet.resumePaint();
        }
        return self;
    };
   
    
    Table.prototype.rowFilter = function () {
        var self = this;
        if (!self._rowFilter && exports._TableFilter) { 
            self._rowFilter = new exports._TableFilter(self);
            self._rowFilter._updateRange(self.dataRange());
        }
        return self._rowFilter;
    };
   
    
    Table.prototype.bindColumns = function (columns) {
        var self = this;
        var tableColumnsValueModel = [];
        if (columns) {
            var length_2 = columns.length;
            if (!self.autoGenerateColumns) {
                length_2 = Math_min(self._colCount, columns.length);
            }
            for (var i = 0; i < length_2; i++) {
                var column = self._columns[i];
                if (!column) {
                    column = new TableColumn(self._newAutoId());
                    self._columns[i] = column;
                }
                var bindColumn = columns[i], id = bindColumn.id(), name_1 = bindColumn.name(), dataField = bindColumn.dataField(), value = bindColumn.value(), uniqueColumnName = _getUniqueColumnName(self, name_1, i);
                column.id(id);
                column.name(uniqueColumnName);
                column.dataField(dataField);
                column.value(value);
                column.cellType(bindColumn.cellType());
                column.formatter(bindColumn.formatter());
               
                var columnValueModel = {
                    name: uniqueColumnName,
                    value: value,
                    dataField: dataField
                };
                if (dataField) {
                    tableColumnsValueModel.push(columnValueModel);
                }
                self._updateFooterRowStyles(i, 1, uniqueColumnName);
            }
        }
        self._tableColumnsValueModel = tableColumnsValueModel;
        if (self._bindingManager) {
            self._bindingManager._columnBindingInfo = tableColumnsValueModel;
        }
    };
   
    
    Table.prototype.bindingPath = function (value) {
        var self = this;
        if (arguments.length === 0) {
            return self._bindingPath;
        }
        self._bindingPath = value;
        self._applyBindingPath();
        return self;
    };
   
    
    Table.prototype.bind = function (columns, path, dataSource) {
        var self = this;
        var tableDataSource = dataSource;
        if (!isNullOrUndefined(columns)) {
            self.bindColumns(columns);
        }
        if (isNullOrUndefined(dataSource)) {
            tableDataSource = self._getDataSource();
        }
        if (path) {
            self._bindingPath = path;
            tableDataSource = Bindings_1._getValueByPath(tableDataSource, path);
        }
        if (Bindings_1._BindingManager && tableDataSource) {
            self._setBindingPathImp(tableDataSource);
        }
        return self;
    };
   
    
    Table.prototype.getColumnName = function (tableColumnIndex) {
        var tcs = this._columns;
        if (tcs && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (tc) {
                var name_2 = tc.name();
                if (name_2 !== keyword_null) {
                    name_2 = util_toString(name_2);
                }
                return name_2;
            }
        }
        return keyword_null;
    };
   
    
    Table.prototype.setColumnName = function (tableColumnIndex, name) {
        var self = this;
        if (self._hasColumnName(name)) {
            return self;
        }
        var tcs = self._columns;
        if (tcs && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (!tc) {
                tc = self._columns[tableColumnIndex] = new TableColumn(self._newAutoId());
            }
            var oldName = tc.name();
            var sheet = self._sheet;
            if (oldName !== name && sheet) {
                sheet._modelManager._backupTableColumn(tc, 'name', oldName);
                tc.name(name);
            }
            if (self._showHeader && sheet) {
                sheet.setText(self.headerIndex(), self._col + tableColumnIndex, name);
            }
            self._onColumnNameChanged(oldName, tc.name(), tableColumnIndex);
        }
        return self;
    };
    Table.prototype._onColumnNameChanged = function (oldName, newName, tableColumnIndex) {
        var self = this, tcs = self._columns, tc = tcs[tableColumnIndex];
        self._updateFooterRowStyles(tableColumnIndex, 1, tc.name());
        var slicerData = this._slicerData;
        slicerData && slicerData.onColumnNameChanged(oldName, newName);
    };
   
    Table.prototype.setColumnDataField = function (tableColumnIndex, dataField) {
        var self = this;
        var tcs = self._columns;
        if (tcs && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (!tc) {
                tc = self._columns[tableColumnIndex] = new TableColumn(self._newAutoId());
            }
            var sheet = self._sheet;
            var oldValue = tc.dataField();
            if (sheet && dataField !== oldValue) {
                sheet._modelManager._backupTableColumn(tc, 'dataField', oldValue);
            }
            tc.dataField(dataField);
        }
        return self;
    };
   
    Table.prototype.getColumnDataField = function (tableColumnIndex) {
        var tcs = this._columns;
        if (tcs && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (tc) {
                var dataField = tc.dataField();
                if (dataField !== keyword_null) {
                    dataField = util_toString(dataField);
                }
                return dataField;
            }
        }
        return keyword_null;
    };
   
    
    Table.prototype.getColumnFormula = function (tableColumnIndex) {
        var tcs = this._columns, sheet = this._sheet;
        if (tcs && sheet && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (tc) {
                var sheetRow = this.footerIndex(), sheetColumn = this._col + tableColumnIndex;
                var expr = tc.footerFormula();
                return expr && expressionToFormula(sheet, expr, sheetRow, sheetColumn, false);
            }
        }
        return keyword_null;
    };
   
    
    Table.prototype.setColumnFormula = function (tableColumnIndex, formula) {
        this._setFooterFormula(tableColumnIndex, formula);
        return this;
    };
   
    
    Table.prototype.setColumnDataFormula = function (tableColumnIndex, formula) {
        if (!CalcEngine) {
            return;
        }
        var self = this;
        var tcs = self._columns;
        if (tcs && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (tc) {
                var sheet = self._sheet;
                suspendCalcService(sheet);
                var columnIndexInSheet = tableColumnIndex + self._col;
                var row = self._row;
                var rowCount = self._rowCount;
               
               
                if (self.showHeader()) {
                    row++;
                    rowCount--;
                }
                if (self.showFooter()) {
                    rowCount--;
                }
                var expr = formulaToExpression(sheet, formula, row, columnIndexInSheet, true );
                var oldValue = tc.dataAreaFormula();
                if (sheet && expr !== oldValue) {
                    sheet._modelManager._backupTableColumn(tc, 'dataAreaFormula', oldValue);
                }
                tc._dataAreaFormulaStr(formula);
                tc.dataAreaFormula(expr);
                for (var rowIndex = row; rowIndex < row + rowCount; rowIndex++) {
                    setFormulaToSheet(sheet, rowIndex, columnIndexInSheet, formula, expr);
                }
                resumeCalcService(sheet, false);
            }
        }
        return self;
    };
   
    
    Table.prototype.getColumnValue = function (tableColumnIndex) {
        var self = this;
        var tcs = self._columns;
        if (tcs && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (tc) {
               
                if (self._showFooter && tc.footerFormula()) {
                    var sheet = self._sheet;
                    if (sheet) {
                        return sheet.getValue(self.footerIndex(), self._col + tableColumnIndex);
                    }
                }
                return tc.footerValue();
            }
        }
        return keyword_null;
    };
   
    
    Table.prototype.setColumnValue = function (tableColumnIndex, value) {
        var self = this;
        var tcs = self._columns;
        var sheet = self._sheet;
        if (tcs && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (tc) {
                var oldValue = tc.footerValue();
                if (sheet && value !== oldValue) {
                    sheet._modelManager._backupTableColumn(tc, 'footerValue', oldValue);
                }
                tc.footerValue(value);
            }
            if (self._showFooter && sheet) {
                setValue(sheet, self.footerIndex(), self._col + tableColumnIndex, value);
            }
        }
        return self;
    };
   
    
    Table.prototype.filterButtonVisible = function (tableColumnIndex, value) {
        var self = this, sheet = self._sheet, rowFilter = self.rowFilter();
        if (tableColumnIndex < 0 || tableColumnIndex >= self._colCount) {
            return;
        }
        var args = arguments;
        switch (args.length) {
            case 0:
                return rowFilter && rowFilter.filterButtonVisible();
            case 1:
                var arg0 = args[0], arg0Type = typeof arg0;
                if (arg0Type === 'number') {
                    return rowFilter && rowFilter.filterButtonVisible(arg0);
                }
                else if (arg0Type === 'boolean' && rowFilter) {
                    suspendPaint(sheet);
                    for (var i = 0; i < self._colCount; i++) {
                        rowFilter.filterButtonVisible(i, arg0);
                    }
                    resumePaint(sheet);
                }
                return self;
            case 2:
                rowFilter && rowFilter.filterButtonVisible(tableColumnIndex, value);
                return self;
        }
    };
   
    
    Table.prototype.allowAutoExpand = function (allowAutoExpandState) {
        var self = this, sheet = self._sheet;
        if (arguments.length === 0) {
            return self._allowAutoExpand;
        }
        if (self._allowAutoExpand !== allowAutoExpandState) {
            sheet._modelManager._backupTableProperty(self, "allowAutoExpand", self._allowAutoExpand);
            self._allowAutoExpand = allowAutoExpandState;
        }
        return self;
    };
    Table.prototype._hasSlicerData = function () {
        return !!this._slicerData;
    };
    Table.prototype._setOwner = function (value) {
        var self = this, oldOwner = self._owner;
        self._setOwnerImp(value);
        if (self._sheet && self._sheet._modelManager) {
            self._sheet._modelManager._backupTableManager(self, oldOwner);
        }
    };
    Table.prototype._setOwnerImp = function (value) {
        var self = this;
        self._owner = value;
        self._sheet = value && value._sheet;
       
        var rowFilter = self._rowFilter;
        if (value && rowFilter && rowFilter._sheet !== value._sheet) {
            rowFilter.table(self);
        }
    };
   
    Table.prototype._bind = function (bindingSource) {
        var self = this, autoGenerateColumns = self.autoGenerateColumns();
        var oldFilterButtonVisibleInfo = self._rowFilter && self._rowFilter._filterButtonVisibleInfo;
        self._resetFilter();
        var sheet = self._sheet;
        if (sheet) {
            var drg_1 = self.dataRange();
            if (autoGenerateColumns) {
                sheet._clearCore(drg_1.row, drg_1.col, getRowCount(drg_1), getColCount(drg_1), 3 , 1  | 16 , false, true);
            }
            else {
                $_each(self._columns, function (index, v) {
                    var dataField = v.dataField();
                    if (dataField) {
                        sheet._clearCore(drg_1.row, drg_1.col + index, getRowCount(drg_1), 1, 3 , 1  | 16 , false, true);
                    }
                });
            }
        }
        if (autoGenerateColumns) {
            var cr = self.range();
            self._clear(cr.row, cr.col, getRowCount(cr), getColCount(cr));
            self._syncFooter(cr.col, getColCount(cr), true );
        }
        bindingSource._columnBindingInfo = self._tableColumnsValueModel;
        self._bindingManager = bindingSource;
        if (bindingSource) {
            if (sheet) {
                sheet._modelManager._backupTableProperty(self, PROPERTY_RANGE, {
                    row: self._row,
                    col: self._col,
                    rowCount: self._rowCount,
                    colCount: self._colCount
                });
            }
            var rc = bindingSource.getRowCount(), cc = bindingSource.getColumnCount();
            if (self._showHeader) {
                rc++;
            }
            if (self._showFooter) {
                rc++;
            }
            self._rowCount = rc;
           
            if (autoGenerateColumns) {
                self._colCount = cc;
                self._columns = [];
                var names = bindingSource._getFields();
                for (var i = 0; i < self._colCount; i++) {
                    var tc = new TableColumn(i + 1);
                    self._columns[i] = tc;
                    if (names) {
                        tc.name(names[i]);
                        tc.dataField(names[i]);
                    }
                }
                if (self._useFooterDropDownList) {
                    self._footerRowStyles = [];
                    self._syncFooterDropDownList(self._col);
                }
            }
            else {
                var tableBindingFields_1 = [];
                self._columns.forEach(function (tableBindingColumn) {
                    var dataField = tableBindingColumn.dataField();
                    dataField && tableBindingFields_1.push(dataField);
                });
                bindingSource._setFields(tableBindingFields_1);
            }
        }
        if (self._rowFilter) {
            self._rowFilter._updateRange(self.dataRange());
            self._rowFilter._filterButtonVisibleInfo = oldFilterButtonVisibleInfo;
        }
    };
    Table.prototype._getDataSourceCol = function (col) {
        var self = this, bindingManager = self._bindingManager;
        if (bindingManager) {
            var fields = bindingManager._getFields();
            if (fields) {
                var column = self._columns[col - self.startColumn()];
                var dataField = column && column.dataField();
                for (var i = 0, count = fields.length; i < count; i++) {
                    if (fields[i] === dataField) {
                        return i;
                    }
                }
            }
        }
        return -1;
    };
    Table.prototype._getValue = function (row, col) {
        var hasValue = false, value = keyword_undefined;
        var self = this, bindingManager = self._bindingManager, newRow = row - self.dataRange().row, newCol;
        if (bindingManager && newRow < bindingManager.getRowCount()) {
            newCol = self._getDataSourceCol(col);
            if (newCol >= 0) {
                hasValue = true;
                value = bindingManager.getValue(newRow, newCol).value;
            }
        }
        return { _hasValue: hasValue, _value: value };
    };
    Table.prototype._setValue = function (row, col, value, ignoreFilteredOutRow) {
        var self = this, bindingManager = self._bindingManager, newRow = _getRelativeRowIndex(self, row), rowFilter = self._rowFilter, newCol, isValueSet = false, oldValue;
        if (bindingManager) {
            newCol = self._getDataSourceCol(col);
            if (newCol >= 0) {
                if (!ignoreFilteredOutRow || !(rowFilter && rowFilter.isRowFilteredOut(row))) {
                    var bdValue = bindingManager.getValue(newRow, newCol);
                    oldValue = bdValue.value;
                    var sheet = self._sheet, modelManager = (sheet && sheet._modelManager);
                    if (modelManager && bdValue.hasBinding && oldValue !== value) {
                        var key = _getRowsChangeKey(true);
                        self._setDirtyRows(row, newRow, key);
                        modelManager._backupRowsChange(self, row, keyword_null, key, RowStateType.dirty);
                        modelManager._updateDirty(row, col, { _oldValue: oldValue });
                    }
                    bindingManager.setValue(newRow, newCol, value, modelManager && modelManager._changes);
                }
                isValueSet = true;
            }
        }
        return isValueSet;
    };
    Table.prototype._getStyle = function (row, col, property) {
        var s = new Core_1.Style();
        this._compose(row, col, s, property);
        return s;
    };
    Table.prototype._getRowHeight = function (row) {
        var rowHeightCache = this._owner._rowHeightCache;
        var height = rowHeightCache[row];
        if (height !== keyword_undefined) {
            return height;
        }
        var sheet = this._sheet;
        height = rowHeightCache[row] = sheet.getRowHeight(row);
        return height;
    };
    Table.prototype._getColumnWidth = function (col) {
        var sheet = this._sheet;
        return sheet.getColumnWidth(col);
    };
    Table.prototype._compose = function (row, col, dest, property) {
        var self = this, style = self.style();
        if (!style) {
            return;
        }
        var sheet = self._sheet;
       
       
       
        var showHeader = self._showHeader, showFooter = self._showFooter, cloumns = self._columns, highlightLastColumn = self.highlightLastColumn(), highlightFirstColumn = self.highlightFirstColumn();
        var headerRowIndex = self.headerIndex(), footerRowIndex = self.footerIndex(), isFirstRow = (showHeader ? (row === self._row + 1) : (row === self._row)), isLastRow = (showFooter ? (row === self._row + self._rowCount - 2) : (row === self._row + self._rowCount - 1)), isFirstCol = (col === self._col), isLastCol = (col === self._col + self._colCount - 1), firstTableRow = (showHeader ? (row === headerRowIndex) : (row === self._row)), lastTableRow = (showFooter ? (row === footerRowIndex) : (row === self._row + self._rowCount - 1)), highlightLastColumnStyle = style[HIGHLIGHT_LAST_COLUMN_STYLE](), highlightFirstColumnStyle = style[HIGHLIGHT_FIRST_COLUMN_STYLE]();
       
       
       
       
       
        var tempStyle = new Core_1.Style();
        if (headerRowIndex === row) {
           
            var lastHeaderCellStyle = style[LAST_HEADER_CELL_STYLE]();
            if (isLastCol && highlightLastColumn && lastHeaderCellStyle) {
                lastHeaderCellStyle._compose(tempStyle, true, true, true, true);
            }
            var firstHeaderCellStyle = style[FIRST_HEADER_CELL_STYLE]();
            if (isFirstCol && highlightFirstColumn && firstHeaderCellStyle) {
                firstHeaderCellStyle._compose(tempStyle, true, true, true, true);
            }
            var headerRowStyle = style[HEADER_ROW_STYLE]();
            if (headerRowStyle) {
                headerRowStyle._compose(tempStyle, true, isFirstCol, true, isLastCol);
            }
            if (isLastCol && highlightLastColumn && highlightLastColumnStyle) {
                highlightLastColumnStyle._compose(tempStyle, true, true, false, true);
            }
            if (isFirstCol && highlightFirstColumn && highlightFirstColumnStyle) {
                highlightFirstColumnStyle._compose(tempStyle, true, true, false, true);
            }
        }
        else if (footerRowIndex === row) {
           
            var lastFooterCellStyle = style[LAST_FOOTER_CELL_STYLE]();
            if (isLastCol && highlightLastColumn && lastFooterCellStyle) {
                lastFooterCellStyle._compose(tempStyle, true, true, true, true);
            }
            var firstFooterCellStyle = style[FIRST_FOOTER_CELL_STYLE]();
            if (isFirstCol && highlightFirstColumn && firstFooterCellStyle) {
                firstFooterCellStyle._compose(tempStyle, true, true, true, true);
            }
            var footerRowStyle = style[FOOTER_ROW_STYLE]();
            if (footerRowStyle) {
                footerRowStyle._compose(tempStyle, true, isFirstCol, true, isLastCol);
            }
            if (isLastCol && highlightLastColumn && highlightLastColumnStyle) {
                highlightLastColumnStyle._compose(tempStyle, false, true, true, true);
            }
            if (isFirstCol && highlightFirstColumn && highlightFirstColumnStyle) {
                highlightFirstColumnStyle._compose(tempStyle, false, true, true, true);
            }
        }
        else {
           
            if (isLastCol && highlightLastColumn && highlightLastColumnStyle) {
                highlightLastColumnStyle._compose(tempStyle, firstTableRow, true, lastTableRow, true);
            }
            if (isFirstCol && highlightFirstColumn && highlightFirstColumnStyle) {
                highlightFirstColumnStyle._compose(tempStyle, firstTableRow, true, lastTableRow, true);
            }
            var relativeRow = (showHeader ? row - self._row - 1 : row - self._row), relativeCol = col - self._col;
            var firstStripSize = void 0, stripSize = void 0;
            var alter = void 0, firstStripStyle = void 0, secondStripStyle = void 0;
            var bandFirst = void 0, bandLast = void 0;
            var considerBand = !property || (property !== "cellType" && property !== "formatter");
            if (self.bandRows() && considerBand) {
                firstStripSize = style[FIRST_ROW_STRIP_SIZE]();
                stripSize = firstStripSize + style[SECOND_ROW_STRIP_SIZE]();
                if (stripSize > 0) {
                    alter = self._alterRowCache[row];
                    if (alter === undefined) {
                        if (Core_1._CacheMgr._cached && Core_1._CacheMgr._visibleRowIndexCache) {
                            var relativeRowCatch = Core_1._CacheMgr._visibleRowIndexCache;
                            var r = self.dataRange().row;
                            while (relativeRowCatch[r] === -1) {
                                r++;
                            }
                            if (r > row) {
                                return;
                            }
                            relativeRow = relativeRowCatch[row] - relativeRowCatch[r];
                        }
                        else if (sheet) {
                            var rCount = 0;
                            for (var r = self.dataRange().row; r < row; r++) {
                                if (self._getRowHeight(r) > 0) {
                                    rCount++;
                                }
                            }
                            relativeRow = rCount;
                        }
                        alter = self._alterRowCache[row] = relativeRow % stripSize;
                    }
                    firstStripStyle = style[FIRST_ROW_STRIP_STYLE]();
                    secondStripStyle = style[SECOND_ROW_STRIP_STYLE]();
                    if (alter < firstStripSize && firstStripStyle) {
                        bandFirst = (alter === 0);
                        bandLast = (isLastRow || alter === firstStripSize - 1);
                        firstStripStyle._compose(tempStyle, bandFirst, isFirstCol, bandLast, isLastCol);
                    }
                    else if (alter >= firstStripSize && secondStripStyle) {
                        bandFirst = (alter === firstStripSize);
                        bandLast = (isLastRow || alter === stripSize - 1);
                        secondStripStyle._compose(tempStyle, bandFirst, isFirstCol, bandLast, isLastCol);
                    }
                }
            }
            if (self.bandColumns() && considerBand) {
                firstStripSize = style[FIRST_COLUMN_STRIP_SIZE]();
                stripSize = firstStripSize + style[SECOND_COLUMN_STRIP_SIZE]();
                if (stripSize > 0) {
                    alter = self._alterColCache[col];
                    if (alter === undefined) {
                        var cCount = 0;
                        if (sheet) {
                            for (var c = self._col; c < col; c++) {
                                if (self._getColumnWidth(c) > 0) {
                                    cCount++;
                                }
                            }
                        }
                        alter = self._alterColCache[col] = cCount % stripSize;
                    }
                    firstStripStyle = style[FIRST_COLUMN_STRIP_STYLE]();
                    secondStripStyle = style[SECOND_COLUMN_STRIP_STYLE]();
                    if (alter < firstStripSize && firstStripStyle) {
                        bandFirst = (alter === 0);
                        bandLast = (isLastCol || alter === firstStripSize - 1);
                        firstStripStyle._compose(tempStyle, isFirstRow, bandFirst, isLastRow, bandLast);
                    }
                    else if (alter >= firstStripSize && secondStripStyle) {
                        bandFirst = (alter === firstStripSize);
                        bandLast = (isLastCol || alter === stripSize - 1);
                        secondStripStyle._compose(tempStyle, isFirstRow, bandFirst, isLastRow, bandLast);
                    }
                }
            }
            if (cloumns && cloumns.length > 0) {
                var bindingProperty = cloumns[relativeCol];
                if (bindingProperty) {
                    var cellTypeStyle = bindingProperty.cellType();
                    var formatterStyle = bindingProperty.formatter();
                    if (cellTypeStyle) {
                        tempStyle.cellType = cellTypeStyle;
                    }
                    if (formatterStyle) {
                        tempStyle.formatter = formatterStyle;
                    }
                }
            }
        }
        var wholeTableStyle = style[WHOLE_TABLE_STYLE]();
        if (wholeTableStyle) {
            wholeTableStyle._compose(tempStyle, firstTableRow, isFirstCol, lastTableRow, isLastCol);
        }
        self._composeCellStyle(dest, tempStyle);
    };
    Table.prototype._composeFooterStyle = function (row, col, dest) {
        var self = this, showFooter = self._showFooter, useFooterDropDownList = self._useFooterDropDownList;
        var footerRowIndex = self.footerIndex(), isFooter = footerRowIndex === row;
       
        if (isFooter && showFooter && self._isFooterButtonSet()) {
            var footerTotalRowStyle = self._footerRowStyles[col - self._col];
            if (footerTotalRowStyle && useFooterDropDownList) {
                var destCellButtons = dest.cellButtons, destDropDowns = dest.dropDowns;
                if (isNullOrUndefined(destCellButtons)) {
                    destCellButtons = [];
                }
                dest.cellButtons = destCellButtons.concat(footerTotalRowStyle.cellButtons);
                if (isNullOrUndefined(destDropDowns)) {
                    destDropDowns = [];
                }
                dest.dropDowns = destDropDowns.concat(footerTotalRowStyle.dropDowns);
            }
        }
    };
    Table.prototype._composeCellStyle = function (dest, src) {
        var self = dest, composeLevel = 20,  borderLeft, borderTop, borderRight, borderBottom;
       
        if (isNullOrUndefined(self.backColor)) {
            self.backColor = src.backColor;
        }
       
        if (_isUndefined(self.foreColor)) {
            self.foreColor = src.foreColor;
        }
        if (isNullOrUndefined(self.themeFont) && isNullOrUndefined(self.font)) {
            self.themeFont = src.themeFont;
            self.font = src.font;
        }
        else if (!isNullOrUndefined(self.themeFont) && isNullOrUndefined(self.font)) {
            self.font = src.font;
        }
        if (isNullOrUndefined(self.borderLeft)) {
            borderLeft = src.borderLeft;
            self.borderLeft = ((borderLeft && borderLeft._clone()) || borderLeft);
            if (self.borderLeft) {
                self.borderLeft.level = composeLevel;
            }
        }
        if (isNullOrUndefined(self.borderTop)) {
            borderTop = src.borderTop;
            self.borderTop = ((borderTop && borderTop._clone()) || borderTop);
            if (self.borderTop) {
                self.borderTop.level = composeLevel;
            }
        }
        if (isNullOrUndefined(self.borderRight)) {
            borderRight = src.borderRight;
            self.borderRight = ((borderRight && borderRight._clone()) || borderRight);
            if (self.borderRight) {
                self.borderRight.level = composeLevel;
            }
        }
        if (isNullOrUndefined(self.borderBottom)) {
            borderBottom = src.borderBottom;
            self.borderBottom = ((borderBottom && borderBottom._clone()) || borderBottom);
            if (self.borderBottom) {
                self.borderBottom.level = composeLevel;
            }
        }
        if (isNullOrUndefined(self.textDecoration)) {
            self.textDecoration = src.textDecoration;
        }
        if (isNullOrUndefined(self.cellType)) {
            self.cellType = src.cellType;
        }
        if (isNullOrUndefined(self.formatter)) {
            self.formatter = src.formatter;
        }
    };
    Table.prototype._moveTo = function (row, col) {
        var self = this;
        if (row === self._row && col === self._col) {
            return;
        }
        var sheet = self._sheet;
        if (sheet) {
            if (row < 0 || sheet.getRowCount() < row + self._rowCount || col < 0 || sheet.getColumnCount() < col + self._colCount) {
                throwError(getSR().Exp_TableMoveOutOfRange);
            }
           
            var tableManager = self._owner, tables = void 0, i = void 0, length_3;
            if (tableManager) {
                tables = tableManager._tableList;
                i = 0;
                length_3 = tables.length;
                for (; i < length_3; i++) {
                    if (tables[i] === self) {
                        tables.splice(i, 1);
                        self._clearSheetModelFormula();
                        break;
                    }
                }
            }
            sheet.moveTo(self._row, self._col, row, col, self._rowCount, self._colCount, 1  | 2 );
           
            if (tables && i <= length_3) {
                self._moveToCore(row, col);
                tables.splice(i, 0, self);
                self._syncSheetModelFormula();
            }
            this._noticeChartUpdateTableRange(1 );
        }
    };
    Table.prototype._moveToCore = function (row, col) {
        var self = this;
        var sheet = self._sheet;
        if (sheet) {
            sheet._modelManager._backupTableProperty(self, PROPERTY_RANGE, {
                row: self._row,
                col: self._col,
                rowCount: self._rowCount,
                colCount: self._colCount
            });
        }
        self._row = row;
        self._col = col;
        self._updateFilter();
        self._clearCache();
    };
    Table.prototype._clearSheetModelFormula = function (colIndex, endColIndex, isMove) {
        var self = this, sheet = self._sheet;
        if (!sheet || !CalcEngine) {
            return;
        }
        var columnInfos = self._columns, footerIndex = self.footerIndex(), tableRange = self.range(), tableDataRange = self.dataRange(), tableDataRangeRow = tableDataRange.row, rowCount = getRowCount(tableDataRange);
        if (isNullOrUndefined(colIndex)) {
            colIndex = 0;
            endColIndex = columnInfos.length;
        }
        for (; colIndex < endColIndex; colIndex++) {
            var info = columnInfos[colIndex], col = tableRange.col + colIndex;
            if (info) {
                if (info.footerFormula() && footerIndex >= 0) {
                    setFormulaToSheet(sheet, footerIndex, col, keyword_null);
                    setValue(sheet, footerIndex, col, keyword_null);
                }
                var colDataAreaFormulaStr = info._dataAreaFormulaStr(), colDataFormula = _getActualFormulaStr(colDataAreaFormulaStr), cellFormula = void 0, currentRowIndex = void 0;
                for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                    currentRowIndex = tableDataRangeRow + rowIndex;
                    cellFormula = sheet.getFormula(currentRowIndex, col);
                    if (!isNullOrUndefined(cellFormula) ) {
                       
                        if (isNullOrUndefined(self._removedFormulaInfos)) {
                            self._removedFormulaInfos = [];
                        }
                        self._removedFormulaInfos.push({ row: currentRowIndex, col: col, formula: cellFormula });
                    }
                    if (!isNullOrUndefined(cellFormula)
                        && (isNullOrUndefined(colDataFormula)
                            || expressionToFormula(sheet, formulaToExpression(sheet, colDataFormula, self._row, col), currentRowIndex, col) !== cellFormula)) {
                        if (isNullOrUndefined(self._columnFormulaRowIndexes)) {
                            self._columnFormulaRowIndexes = [];
                        }
                        var rowIndexeItem = _getRowIndexes(self._columnFormulaRowIndexes, col);
                        if (isNullOrUndefined(rowIndexeItem)) {
                            rowIndexeItem = {};
                            rowIndexeItem.col = col;
                            rowIndexeItem.rowIndexes = [];
                            rowIndexeItem.rowIndexes.push(currentRowIndex);
                            self._columnFormulaRowIndexes.push(rowIndexeItem);
                        }
                        else {
                            rowIndexeItem.rowIndexes.push(currentRowIndex);
                        }
                    }
                }
                info._dataAreaFormulaStr(keyword_undefined);
                if (info.dataAreaFormula()) {
                    for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                        currentRowIndex = tableDataRangeRow + rowIndex;
                        setFormulaToSheet(sheet, currentRowIndex, col, keyword_null);
                        setValue(sheet, currentRowIndex, col, keyword_null);
                    }
                }
            }
        }
        if (isMove === true) {
            self._removedFormulaInfos = [];
        }
    };
    Table.prototype._updateSheetModelFormulaOnRowsChanged = function (row, count, isInsert) {
        var self = this, sheet = self._sheet, removedFormulaInfos = self._removedFormulaInfos, needSet, info;
        if (removedFormulaInfos) {
            for (var i = 0; i < removedFormulaInfos.length; i++) {
                info = removedFormulaInfos[i];
                needSet = true;
                if (info) {
                    var formulaRowIndex = info.row, formulaColIndex = info.col, formula = info.formula;
                    if (formulaRowIndex >= row) {
                        if (isInsert === true) {
                            formulaRowIndex += count;
                        }
                        if (isInsert === false) {
                            if (formulaRowIndex < row + count) {
                                needSet = false;
                            }
                            else {
                                formulaRowIndex -= count;
                            }
                        }
                    }
                    if (needSet) {
                        setFormulaToSheet(sheet, formulaRowIndex, formulaColIndex, formula);
                    }
                }
            }
            self._removedFormulaInfos = [];
        }
        self._adjustFormulasOnAddRemove(row, count, true , isInsert);
    };
    Table.prototype._updateSheetModelFormulaOnColumnsChanged = function (col, count, isInsert) {
        var self = this, sheet = self._sheet, removedFormulaInfos = self._removedFormulaInfos, needSet, info;
        if (removedFormulaInfos) {
            for (var i = 0; i < removedFormulaInfos.length; i++) {
                info = removedFormulaInfos[i];
                needSet = true;
                if (info) {
                    var formulaRowIndex = info.row, formulaColIndex = info.col, formula = info.formula;
                    if (formulaColIndex >= col) {
                        if (isInsert === true) {
                            formulaColIndex += count;
                        }
                        if (isInsert === false) {
                            if (formulaColIndex < col + count) {
                                needSet = false;
                            }
                            else {
                                formulaColIndex -= count;
                            }
                        }
                    }
                    if (needSet) {
                       
                        setFormulaToSheet(sheet, formulaRowIndex, formulaColIndex, formula);
                    }
                }
            }
            var formulaRowIndexes = self._columnFormulaRowIndexes || [], rowIndex = void 0;
            for (var i = 0; i < formulaRowIndexes.length; i++) {
                rowIndex = formulaRowIndexes[i];
                if (rowIndex) {
                    var rowIndexCol = rowIndex.col;
                    if (rowIndexCol >= col) {
                        if (isInsert === true) {
                            rowIndex.col += count;
                        }
                        if (isInsert === false) {
                            if (rowIndexCol >= col + count) {
                                rowIndex.col -= count;
                            }
                        }
                    }
                }
            }
           
            self._adjustFormulasOnAddRemove(col, count, false , isInsert);
           
            var columns = self._columns, length_4 = columns.length, dataRange = self.dataRange(), dataRangeRowIndex = dataRange.row, dataRangeColIndex = dataRange.col, dataRangeRowCount = dataRange.rowCount, actualRowIndex = void 0, columnInfo = void 0, dataAreaFormula = void 0, newFormula = void 0, colIndex = void 0;
            for (var i = 0; i < length_4; i++) {
                columnInfo = columns[i];
                colIndex = dataRangeColIndex + i;
                if (columnInfo) {
                    dataAreaFormula = columnInfo.dataAreaFormula();
                    if (dataAreaFormula) {
                        actualRowIndex = dataRangeRowIndex;
                       
                        for (var j = 0; j < formulaRowIndexes.length; j++) {
                            rowIndex = formulaRowIndexes[j];
                            if (rowIndex && rowIndex.col === colIndex) {
                                while (rowIndex.rowIndexes.indexOf(actualRowIndex) > -1 && actualRowIndex < dataRangeRowIndex + dataRangeRowCount) {
                                    actualRowIndex++;
                                }
                                break;
                            }
                        }
                        if (actualRowIndex < dataRangeRowIndex + dataRangeRowCount) {
                            newFormula = sheet.getFormula(actualRowIndex, colIndex);
                            if (newFormula) {
                                columnInfo.dataAreaFormula(formulaToExpression(sheet, newFormula, dataRangeRowIndex, colIndex));
                            }
                        }
                    }
                }
            }
            self._removedFormulaInfos = [];
            self._columnFormulaRowIndexes = [];
        }
    };
    Table.prototype._adjustFormulasOnAddRemove = function (index, count, isRow, isInsert, ignoreAdjust) {
        var self = this, sheet = self._sheet, columns = self._columns, footerIndex = self.footerIndex(), tableDataRange = self.dataRange(), tableDataRangeRow = tableDataRange.row, tableDataRangeCol = tableDataRange.col, tableDataRangeRC = tableDataRange.rowCount, tableDataRangeCC = tableDataRange.colCount;
        var sourceModel = sheet._getCalcModel(), calcService = sheet._calcService, adjustor, colInfo, footerFormula, newFooterFormula, footerColIndex;
        if (calcService && sourceModel) {
            adjustor = calcService._getOperatorAdjustor();
            if (adjustor) {
                if (!ignoreAdjust) {
                    adjustor._addCellsToAdjust(sourceModel, tableDataRangeRow, tableDataRangeCol, tableDataRangeRC, tableDataRangeCC);
                    adjustor._adjustFormulasOnAddRemove(sourceModel._source, index, count, isRow, isInsert, true );
                }
                if (self._showFooter) {
                    if (!ignoreAdjust) {
                       
                        adjustor._addCellsToAdjust(sourceModel, footerIndex, tableDataRangeCol, 1, tableDataRangeCC);
                        adjustor._adjustFormulasOnAddRemove(sourceModel._source, index, count, isRow, isInsert, false );
                    }
                   
                    for (var i = 0; i < tableDataRangeCC; i++) {
                        colInfo = columns[i];
                        if (colInfo) {
                            footerFormula = colInfo.footerFormula();
                            footerColIndex = tableDataRangeCol + i;
                            if (footerFormula) {
                                newFooterFormula = sheet.getFormula(footerIndex, footerColIndex);
                                if (newFooterFormula) {
                                    if (sheet) {
                                        sheet._modelManager._backupTableColumn(colInfo, 'footerFormula', footerFormula);
                                    }
                                    colInfo.footerFormula(formulaToExpression(sheet, newFooterFormula, footerIndex, footerColIndex));
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Table.prototype._syncSheetModelFormula = function () {
        var self = this, sheet = self._sheet;
        if (!sheet || !CalcEngine) {
            return;
        }
        var footerIndex = self.footerIndex(), tableRange = self.range(), tableDataRange = self.dataRange();
        $_each(self._columns, function (i, info) {
            var sheetColumn = tableRange.col + i;
            var footerFormulaExpr = info.footerFormula(), dataAreaFormulaExpr = info.dataAreaFormula();
            if (footerFormulaExpr && footerIndex >= 0) {
                setFormulaToSheet(sheet, footerIndex, sheetColumn, keyword_null, footerFormulaExpr);
            }
            if (dataAreaFormulaExpr) {
                for (var rowIndex = 0, rowCount = getRowCount(tableDataRange); rowIndex < rowCount; rowIndex++) {
                    var sheetRow = tableDataRange.row + rowIndex;
                    setFormulaToSheet(sheet, sheetRow, sheetColumn, keyword_null, dataAreaFormulaExpr);
                }
            }
        });
    };
    Table.prototype._resize = function (newRange) {
        var self = this, oldDataRange = self.dataRange();
        if (newRange.equals(self.range())) {
            return;
        }
        var row = newRange.row, col = newRange.col, rowCount = getRowCount(newRange), colCount = getColCount(newRange);
        var showHeader = self._showHeader, showFooter = self._showFooter, useFooterDropDownList = self._useFooterDropDownList;
        var minRowCount = 0, minColCount = 1;
        if (showHeader) {
            minRowCount += 1;
        }
        if (showFooter) {
            minRowCount += 1;
        }
        var sheet = self._sheet;
        if (sheet) {
            if (rowCount < minRowCount || colCount < minColCount ||
                row + rowCount > sheet.getRowCount() || col + colCount > sheet.getColumnCount()) {
                throwError(getSR().Exp_TableResizeOutOfRange);
            }
            if (row !== self._row || !newRange.intersect(self._row, self._col, self._rowCount, self._colCount)) {
                throwError(getSR().Exp_TableResizeInvalidRange);
            }
            sheet._modelManager._backupTableProperty(self, PROPERTY_RANGE, {
                row: self._row,
                col: self._col,
                rowCount: self._rowCount,
                colCount: self._colCount
            });
            sheet._modelManager._backupTableProperty(self, PROPERTY_COLUMN, self._columns.slice());
        }
        var tcs = self._columns;
       
        var newStartCol = col, newEndCol = col + colCount - 1;
        var oldStartCol = self._col, oldEndCol = self._col + self._colCount - 1;
        var oldColCount = self._colCount;
        self._col = col;
        self._colCount = colCount;
        if (newStartCol < oldStartCol) {
           
            var insertIndex = 0;
            for (var i = newStartCol; i < oldStartCol; i++) {
                var tc = new TableColumn(self._newAutoId());
                tcs.splice(insertIndex, 0, tc);
                insertIndex++;
            }
            if (showHeader) {
                self._syncHeader(0, oldStartCol - newStartCol);
            }
            if (showFooter) {
                self._syncFooter(0, oldStartCol - newStartCol);
            }
        }
        else if (newStartCol <= oldEndCol) {
           
            self._clearSheetModelFormula(oldStartCol, newStartCol);
            tcs.splice(0, newStartCol - oldStartCol);
        }
        if (newEndCol > oldEndCol) {
            for (var i = oldEndCol + 1; i <= newEndCol; i++) {
                var tc = new TableColumn(self._newAutoId());
                tcs.push(tc);
            }
            if (showHeader) {
                self._syncHeader(oldColCount, newEndCol - oldEndCol);
            }
            if (showFooter) {
                self._syncFooter(oldColCount, newEndCol - oldEndCol);
            }
            if (useFooterDropDownList) {
                self._syncFooterDropDownList(oldColCount);
            }
        }
        else if (newEndCol >= oldStartCol) {
           
            self._clearSheetModelFormula(newEndCol, oldEndCol);
            tcs.splice(tcs.length - (oldEndCol - newEndCol), oldEndCol - newEndCol);
        }
       
        if (rowCount !== self._rowCount) {
            var bm = self._bindingManager, dataRange = self.dataRange(), dataRangeRow = dataRange.row, dataRangeRowCount = getRowCount(dataRange);
            if (bm) {
                if (rowCount > self._rowCount) {
                    var addRowIndex = dataRangeRow + dataRangeRowCount - 1, addRowCount = rowCount - self._rowCount;
                    if (sheet) {
                        var endAddRow = addRowIndex + addRowCount + 1;
                        var firstNonNulRange = _getFirstNonNullCellInRange(sheet, new Core_1.Range(endAddRow, newStartCol, sheet.getRowCount() - endAddRow, newEndCol));
                        if (!(firstNonNulRange && firstNonNulRange.row < endAddRow)) {
                            self._doInsertRows(addRowIndex, addRowCount, true, false);
                        }
                    }
                   
                   
                   
                   
                   
                   
                   
                   
                }
                else if (sheet) {
                    var deleteRowCount = self._rowCount - rowCount;
                    self._deleteRows(dataRangeRow + dataRangeRowCount - deleteRowCount, deleteRowCount);
                }
            }
            else {
               
                var oldFooterIndex = void 0;
                if (showFooter) {
                    self._syncFooter();
                    oldFooterIndex = self.footerIndex();
                }
                self._rowCount = rowCount;
                self._updateDataAreaFormula();
               
                if (showFooter) {
                    self._syncSheetByFooter();
                    self._clearSheetRow(oldFooterIndex);
                }
            }
        }
        self._updateFilter();
        self._onTableResized(oldDataRange, self.dataRange());
        self._updateReference();
        self._noticeChartUpdateTableRange(0 );
    };
    Table.prototype._onTableResized = function (oldRange, newRange) {
        var self = this, slicerData = self._slicerData;
        if (!slicerData) {
            return;
        }
        var oldRangeCol = oldRange.col, oldRangeRowCount = getRowCount(oldRange), oldRangeColCount = getColCount(oldRange);
        var newRangeCol = newRange.col, newRangeRowCount = getRowCount(newRange), newRangeColCount = getColCount(newRange);
        var oldEndRow = oldRange.row + oldRangeRowCount, oldEndCol = oldRangeCol + oldRangeColCount, newEndRow = newRange.row + newRangeRowCount, newEndCol = newRangeCol + newRangeColCount;
       
       
        if (newEndRow < oldEndRow) {
            slicerData.onRowsRemoved(newRangeRowCount, oldEndRow - newEndRow);
        }
       
        if (newEndRow > oldEndRow) {
            slicerData.onRowsAdded(oldRangeRowCount, newEndRow - oldEndRow);
        }
       
        if (newRangeCol > oldRangeCol) {
            slicerData.onColumnsRemoved(0, newRangeCol - oldRangeCol);
        }
        if (newEndCol < oldEndCol) {
            slicerData.onColumnsRemoved(newRangeColCount, oldEndCol - newEndCol);
        }
       
        if (newRangeCol < oldRangeCol) {
            slicerData.onColumnsAdded(0, oldRangeCol - newRangeCol);
        }
        if (newEndCol > oldEndCol) {
            slicerData.onColumnsAdded(oldRangeCol + oldRangeColCount - newRangeCol, newEndCol - oldEndCol);
        }
    };
    Table.prototype._updateFilter = function () {
        var self = this, rowFilter = self._rowFilter;
        if (rowFilter) {
            rowFilter._updateRange(self.dataRange());
            rowFilter.reFilter();
        }
    };
    Table.prototype._resetFilter = function () {
        var rowFilter = this._rowFilter;
        if (rowFilter) {
            rowFilter.unfilter();
            rowFilter.reset();
        }
    };
    Table.prototype._hasColumnName = function (name, excludeIndex) {
        if (name !== keyword_null) {
            name = util_toString(name);
        }
        for (var i = 0; i < this._colCount; i++) {
            if (i === excludeIndex) {
                continue;
            }
            var cn = this.getColumnName(i);
            if (name === cn) {
                return true;
            }
        }
        return false;
    };
    Table.prototype._getHeaderName = function (col) {
        var self = this, tcs = self._columns;
        if (!self._showHeader || !tcs) {
            return keyword_null;
        }
        var c = (col - self._col);
        if (0 <= c && c < tcs.length) {
            var tc = tcs[c];
            if (tc) {
                var name_3 = tc.name();
                if (!isNullOrUndefined(name_3)) {
                    name_3 = util_toString(name_3);
                }
                return name_3;
            }
        }
        return keyword_null;
    };
    Table.prototype._setHeaderName = function (col, name) {
        var self = this, tcs = self._columns;
        if (!self._showHeader || !tcs) {
            return;
        }
        var length = tcs.length;
        var c = (col - self._col);
        if (0 <= c && c < length) {
            var tc = tcs[c];
            if (tc) {
                var oldName = tc.name();
                var sheet = self._sheet;
                if (sheet && name !== oldName) {
                    sheet._modelManager._backupTableColumn(tc, 'name', oldName);
                }
                tc.name(name);
               
               
               
               
               
               
                self._onColumnNameChanged(oldName, tc.name(), c);
            }
        }
    };
    Table.prototype._setFooterFormula = function (tableColumnIndex, formula, expr) {
        var self = this, tcs = self._columns;
        var sheetRow = self.footerIndex(), sheetColumn = self._col + tableColumnIndex;
        var sheet = self._sheet;
        if (CalcEngine && 0 <= tableColumnIndex && tableColumnIndex < tcs.length) {
            var tc = tcs[tableColumnIndex];
            if (formula && !expr && sheet) {
                expr = formulaToExpression(sheet, formula, sheetRow, sheetColumn);
                if (self._showFooter) {
                    setFormulaToSheet(sheet, sheetRow, sheetColumn, formula, expr);
                }
            }
            if (tc) {
                var oldValue = tc.footerFormula();
                if (sheet && expr !== oldValue) {
                    sheet._modelManager._backupTableColumn(tc, 'footerFormula', oldValue);
                }
                tc.footerFormula(expr);
            }
        }
    };
    Table.prototype._setFooterValue = function (col, value, ignoreShowFooter) {
        var self = this, tcs = self._columns;
        if ((!ignoreShowFooter && !self._showFooter) || !tcs) {
            return;
        }
        var c = (col - self._col);
        if (0 <= c && c < tcs.length) {
            var tc = tcs[c];
            if (tc) {
                var oldValue = tc.footerValue();
                if (value !== oldValue) {
                    var sheet = self._sheet;
                    if (sheet) {
                        sheet._modelManager._backupTableColumn(tc, 'footerValue', oldValue);
                        sheet._modelManager._updateDirty(self._row + self._rowCount - 1, col, { _oldValue: tc.footerValue() });
                    }
                }
                tc.footerValue(value);
            }
        }
    };
    Table.prototype._newAutoId = function () {
        var tcs = this._columns, count = tcs && tcs.length;
       
       
       
        var ids = [], tc;
        for (var i = 0; i < count; i++) {
            tc = tcs[i];
            if (tc && tc._isAutoId()) {
                ids.push(tc.id());
            }
        }
        ids.sort(function (a, b) {
            return (a - b);
        });
        count = ids.length;
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                if (ids[i] !== i + 1) {
                    return (i + 1);
                }
            }
            return count + 1;
        }
        return 1;
    };
    Table.prototype._getNoConflictTableColumnName = function (newColumnName, columnIndex) {
        if (newColumnName && !this._hasColumnName(newColumnName, columnIndex)) {
            return newColumnName;
        }
        var columnName;
        var namePrefix = CONST_COLUMN;
        var nameSuffixNum = 0;
        if (newColumnName) {
            namePrefix = newColumnName;
            nameSuffixNum = 1;
        }
        else if (columnIndex > 0) {
            newColumnName = this._columns[columnIndex - 1].name();
            var result = /[0-9]+$/.exec(newColumnName);
            if (result) {
                namePrefix = newColumnName.substr(0, result.index);
                nameSuffixNum = parseInt(newColumnName.substr(result.index), 10);
                columnName = namePrefix + (nameSuffixNum + 1);
                if (!this._hasColumnName(columnName)) {
                    return columnName;
                }
                namePrefix = newColumnName;
                nameSuffixNum = 1;
            }
        }
        while (true) {
            nameSuffixNum++;
            columnName = namePrefix + nameSuffixNum;
            if (!this._hasColumnName(columnName)) {
                return columnName;
            }
        }
    };
   
    Table.prototype._syncHeader = function (start, count, syncFromHeaderToSheet) {
        var self = this, tcs = self._columns;
        var sheet = self._sheet;
        if (!self._showHeader || !tcs || !sheet) {
            return;
        }
        var tcsLength = tcs.length;
        var row = self.headerIndex();
        var baseCol = self._col, tc;
        if (isNullOrUndefined(start)) {
            start = 0;
        }
        if (isNullOrUndefined(count)) {
            count = tcsLength;
        }
        var end = Math_min(tcsLength, start + count);
        var txt;
        for (var i = start; i < end; i++) {
            tc = tcs[i];
            if (tc) {
               
               
                var tableList = self._owner._tableList;
                var index = $_inArray(self, tableList);
                if (index > -1) {
                    tableList.splice(index, 1);
                }
                txt = _dealColumnName(sheet.getValue(row, baseCol + i));
                if (index > -1) {
                    tableList.splice(index, 0, self);
                }
                setFormulaToSheet(sheet, row, baseCol + i, keyword_null);
               
                if (txt) {
                    if (!syncFromHeaderToSheet) {
                       
                        CalcEngine && sheet._recalcCell(row, baseCol + i);
                        var newName = self._getNoConflictTableColumnName(txt, i);
                        if (newName === txt) {
                            sheet._modelManager._backupTableColumn(tc, 'name', tc.name());
                            tc.name(txt);
                        }
                        else {
                            sheet.setText(row, baseCol + i, newName);
                        }
                    }
                    else {
                        self._syncTableToSheet = syncFromHeaderToSheet;
                        sheet.setText(row, baseCol + i, tc.name());
                        delete self._syncTableToSheet;
                    }
                }
            }
        }
    };
    Table.prototype._syncFooterDropDownList = function (start) {
        var columns = this._columns;
        for (var i = start; i < columns.length; i++) {
            var footerStyle = createButtonDropdownListStyle(this.name(), columns[i].name());
            this._footerRowStyles.push(footerStyle);
        }
    };
   
    Table.prototype._syncFooter = function (start, count, syncFromFooterToSheet) {
        var self = this, tcs = self._columns;
        var sheet = self._sheet;
        if (!self._showFooter || !tcs || !sheet) {
            return;
        }
        if (self.useFooterDropDownList() && !self._isFooterButtonSet()) {
           
            self._createFooterButton();
        }
        var tcsLength = tcs.length;
        var row = self.footerIndex();
        var baseCol = self._col, tc;
        if (isNullOrUndefined(start)) {
            start = 0;
        }
        if (isNullOrUndefined(count)) {
            count = tcsLength;
        }
        if (isNullOrUndefined(syncFromFooterToSheet)) {
            syncFromFooterToSheet = self._syncFromFooterToSheet;
        }
        var end = Math_min(tcsLength, start + count);
        var expr, value;
        for (var i = start; i < end; i++) {
            tc = tcs[i];
            if (tc) {
                value = sheet.getValue(row, baseCol + i);
                if (!isNullOrUndefined(value) && !syncFromFooterToSheet) {
                    var oldValue = tc.footerValue();
                    if (value !== oldValue) {
                        sheet._modelManager._backupTableColumn(tc, 'footerValue', oldValue);
                    }
                    tc.footerValue(value);
                }
                else {
                    self._syncTableToSheet = syncFromFooterToSheet;
                    setValue(sheet, row, baseCol + i, tc.footerValue());
                    delete self._syncTableToSheet;
                }
                expr = sheet._getExpression && sheet._getExpression(row, baseCol + i);
                if (expr && !syncFromFooterToSheet) {
                    var oldFormula = tc.dataAreaFormula();
                    if (expr !== oldFormula) {
                        sheet._modelManager._backupTableColumn(tc, 'dataAreaFormula', oldFormula);
                    }
                    tc.footerFormula(expr);
                }
                else if (!self._ignoreFormula) {
                    self._syncTableToSheet = syncFromFooterToSheet;
                    setFormulaToSheet(sheet, row, baseCol + i, keyword_null, tc.footerFormula());
                    delete self._syncTableToSheet;
                }
            }
        }
    };
    Table.prototype._clearHeader = function (start, count) {
        var self = this, tcs = self._columns;
        if (!self._showHeader || !tcs) {
            return;
        }
        var tcsLength = tcs.length;
        var tc;
        if (isNullOrUndefined(start)) {
            start = 0;
        }
        if (isNullOrUndefined(count)) {
            count = tcsLength;
        }
        var end = Math_min(tcsLength, start + count);
        for (var i = start; i < end; i++) {
            tc = tcs[i];
            if (tc) {
                var oldName = tc.name();
                var sheet = self._sheet;
                if (sheet && oldName !== keyword_null) {
                    sheet._modelManager._backupTableColumn(tc, 'name', oldName);
                }
                tc.name(keyword_null);
                self._onColumnNameChanged(oldName, tc.name(), i);
            }
        }
    };
    Table.prototype._clearDataRange = function (clearRange) {
        var self = this;
        var dataRange = self.dataRange();
        if (dataRange.containsRange(clearRange)) {
            var row = clearRange.row, col = clearRange.col, rowCount = getRowCount(clearRange), colCount = getColCount(clearRange);
            var changedDataItems = [];
            for (var r = 0; r < rowCount; r++) {
                for (var c = 0; c < colCount; c++) {
                    self._setValue(row + r, col + c, keyword_null, true );
                    changedDataItems.push({
                        columnName: self.getColumnName(col + c - dataRange.col),
                        row: row + r - dataRange.row,
                        data: ''
                    });
                }
            }
            var slicerData = self._slicerData;
            slicerData && slicerData.onDataChanged(changedDataItems);
        }
    };
    Table.prototype._clearFooter = function (start, count) {
        var self = this, tcs = self._columns;
        if (!self._showFooter || !tcs) {
            return;
        }
        var tc;
        if (isNullOrUndefined(start)) {
            start = 0;
        }
        if (isNullOrUndefined(count)) {
            count = tcs.length;
        }
        var end = Math_min(tcs.length, start + count);
        for (var i = start; i < end; i++) {
            tc = tcs[i];
            if (tc) {
                var sheet = self._sheet;
                var oldFormula = tc.footerFormula();
                if (sheet && keyword_null !== oldFormula) {
                    sheet._modelManager._backupTableColumn(tc, 'footerFormula', oldFormula);
                }
                tc.footerFormula(keyword_null);
                var oldValue = tc.footerValue();
                if (sheet && keyword_null !== oldValue) {
                    sheet._modelManager._backupTableColumn(tc, 'footerValue', oldValue);
                }
                tc.footerValue(keyword_null);
            }
        }
    };
   
    Table.prototype._syncSheetByFooter = function () {
        var self = this, tcs = self._columns;
        if (!self._showFooter || !tcs) {
            return;
        }
        var sheet = self._sheet;
        if (!sheet) {
            return;
        }
        var count = tcs.length, tc;
        var baseCol = self._col, col;
        var footerIndex = self.footerIndex();
        for (var i = 0; i < count; i++) {
            tc = tcs[i];
            if (tc) {
                col = baseCol + i;
                setValue(sheet, footerIndex, col, tc.footerValue());
                setFormulaToSheet(sheet, footerIndex, col, keyword_null, tc.footerFormula());
            }
        }
    };
    Table.prototype._clearSheetRow = function (row) {
        var self = this, sheet = self._sheet;
        if (!sheet) {
            return;
        }
        if (row < 0 || sheet.getRowCount() <= row) {
            return;
        }
        var baseCol = self._col, count = self._colCount, col;
        for (var i = 0; i < count; i++) {
            col = baseCol + i;
            setFormulaToSheet(sheet, row, col, keyword_null);
            setValue(sheet, row, col, keyword_null);
        }
    };
    Table.prototype._onRowsAdded = function (row, count, isInsertAfter, ignoreUpdateDataSource, isInsertMode) {
        var self = this, dataSourceChanged = false, deltaRow = isInsertAfter ? 1 : 0;
        if (row >= self._row + self._rowCount + deltaRow) {
            return dataSourceChanged;
        }
        var sheet = self._sheet, sheetModelManager;
        if (sheet) {
            sheetModelManager = sheet._modelManager;
            sheetModelManager._backupTableProperty(self, PROPERTY_RANGE, {
                row: self._row,
                col: self._col,
                rowCount: self._rowCount,
                colCount: self._colCount
            });
        }
        self._updateDirtyRows(row, count, false );
        var firstRow = self._row, lastRow = self._row + self._rowCount - 1 + deltaRow;
        if (row <= firstRow && !isInsertMode) {
            self._row += count;
        }
        else if (row <= lastRow) {
            if (!ignoreUpdateDataSource) {
                dataSourceChanged = self._updateDataSourceOnAddRows(row, count);
            }
            self._rowCount += count;
        }
        return dataSourceChanged;
    };
    Table.prototype._onRowsAdded2 = function (row, count, ignoreDataAreaFormula) {
        var self = this, lastRow = self._row + self._rowCount - 1;
        if (!ignoreDataAreaFormula && row >= self._row && row <= lastRow) {
            self._updateDataAreaFormula(row, count);
        }
        if (!ignoreDataAreaFormula) {
            self._adjustFormulasOnAddRemove(row, count, true , true , true );
            self._updateArrayInfo();
        }
        var slicerData = self._slicerData;
        var dataRange = self.dataRange(), oldDataRangeRow = dataRange.row, oldEndRow = self.endRow();
        if (row >= oldDataRangeRow && row <= oldEndRow && slicerData) {
            slicerData.onRowsAdded(row - oldDataRangeRow, count);
        }
        if (self._rowFilter) {
            self._rowFilter._onRowsAdded(row, count);
        }
    };
    Table.prototype._updateDataSourceOnAddRows = function (row, count) {
        var self = this, bm = self._bindingManager;
        if (bm) {
            var sheet = this._sheet, changes = (sheet && sheet._modelManager._changes);
            var tableChanges = void 0;
            if (changes) {
                tableChanges = changes._tableChanges;
                if (!tableChanges) {
                    tableChanges = [];
                }
            }
            bm._addItems(_getRelativeRowIndex(self, row), count, tableChanges);
            return true;
        }
        return false;
    };
    Table.prototype._updateDataAreaFormula = function (row, count) {
        if (!CalcEngine) {
            return;
        }
        var self = this, sheet = self._sheet, dataRange = self.dataRange();
        if (isNullOrUndefined(row)) {
            row = dataRange.row;
        }
        if (isNullOrUndefined(count)) {
            count = dataRange.rowCount;
        }
        suspendCalcService(sheet);
        $_each(self._columns, function (i, column) {
            var dataAreaFormula = column.dataAreaFormula();
            if (dataAreaFormula) {
                var columnIndexInSheet = i + self._col;
                for (var rowIndex = row; rowIndex < row + count; rowIndex++) {
                    setFormulaToSheet(sheet, rowIndex, columnIndexInSheet, keyword_null, dataAreaFormula);
                }
            }
        });
        resumeCalcService(sheet, false);
    };
    Table.prototype._updateArrayInfo = function () {
        if (!CalcEngine) {
            return;
        }
        var self = this, sheet = self._sheet, calModel = sheet._getCalcModel(), dataRange = self.dataRange(), row, count;
        if (isNullOrUndefined(row)) {
            row = dataRange.row;
        }
        if (isNullOrUndefined(count)) {
            count = dataRange.rowCount;
        }
        suspendCalcService(sheet);
        $_each(self._columns, function (i, column) {
            var arrayFormulaObj = column._isArrayFormula();
            if (arrayFormulaObj && arrayFormulaObj.isArrayFormula) {
                var isDynamicArray = arrayFormulaObj.isDynamicArray;
                var columnIndexInSheet = i + self._col;
                for (var rowIndex = row; rowIndex < row + count; rowIndex++) {
                    if (isNullOrUndefined(calModel._getArrayInfo(rowIndex, columnIndexInSheet))) {
                        var arrayInfo = { row: rowIndex, col: columnIndexInSheet, rowCount: 1, colCount: 1, isDynamicArray: isDynamicArray };
                        calModel._setArrayInfo(rowIndex, columnIndexInSheet, arrayInfo);
                    }
                }
            }
        });
        resumeCalcService(sheet, false);
    };
    Table.prototype._onColumnsAdded = function (col, count, isInsertAfter, ignoreUpdateDataSource, isInsertMode) {
        var self = this, deltaCol = isInsertAfter ? 1 : 0;
        if (col >= self._col + self._colCount + deltaCol) {
            return;
        }
        var oldColumn = self._col;
        var sheet = self._sheet;
        if (sheet) {
            sheet._modelManager._backupTableProperty(self, PROPERTY_RANGE, {
                row: self._row,
                col: self._col,
                rowCount: self._rowCount,
                colCount: self._colCount
            });
            sheet._modelManager._backupTableProperty(self, PROPERTY_COLUMN, self._columns.slice());
        }
        if (col <= self._col && !isInsertMode) {
            self._col += count;
        }
        else if (col < self._col + self._colCount + deltaCol) {
            self._colCount += count;
           
            var tcs = self._columns;
            if (tcs) {
                var startColIndex = col - self._col;
                for (var i = 0; i < count; i++) {
                    var id = self._newAutoId(), columnIndex = startColIndex + i;
                    var tc = new TableColumn(id);
                    tc.name(self._getNoConflictTableColumnName(keyword_null, columnIndex));
                    tcs.splice(columnIndex, 0, tc);
                   
                    var columnName = self.getColumnName(columnIndex);
                    self._updateFooterRowStyles(columnIndex, 0, columnName);
                }
                if (ignoreUpdateDataSource) {
                    self._syncHeader(startColIndex, keyword_undefined, true );
                }
            }
        }
        if (self._rowFilter) {
            self._rowFilter._onColumnsAdded(col, count);
        }
        if (col >= oldColumn) {
            var slicerData = self._slicerData;
            slicerData && slicerData.onColumnsAdded(col - oldColumn, count);
        }
    };
    Table.prototype._onColumnsChanged = function () {
       
        var self = this, sheet = self._sheet, calcModel = sheet._getCalcModel();
        if (calcModel && self._showFooter) {
            var columns = self._columns, footerRow_1 = self.footerIndex(), startCol_1 = self._col, calcModelExpr_1;
            columns.forEach(function (column, index) {
                calcModelExpr_1 = calcModel._getExpr(footerRow_1, startCol_1 + index);
                if (!isNullOrUndefined(calcModelExpr_1)) {
                    column.footerFormula(calcModelExpr_1);
                }
            });
        }
    };
    Table.prototype._onRowsRemoved = function (row, count, ignoreUpdateDataSource, key) {
        var self = this, dataSourceChanged = false;
        if (row >= self._row + self._rowCount) {
            return dataSourceChanged;
        }
        var dataRange = self.dataRange(), oldDataRangeRow = dataRange.row, oldDataRangeRowCount = getRowCount(dataRange);
        var firstRow = self._row, lastRow = self._row + self._rowCount - 1;
        var sheet = self._sheet, bm = self._bindingManager, changes, sheetModelManager, tableChanges;
        if (sheet) {
            sheetModelManager = sheet._modelManager;
            sheetModelManager._backupTableProperty(self, PROPERTY_RANGE, {
                row: self._row,
                col: self._col,
                rowCount: self._rowCount,
                colCount: self._colCount
            });
            changes = sheetModelManager._changes;
            if (changes) {
                tableChanges = changes._tableChanges;
                if (!tableChanges) {
                    tableChanges = [];
                }
            }
        }
        self._updateDirtyRows(row, count, true );
        if (row < firstRow) {
            if (row + count <= firstRow) {
                self._row -= count;
            }
        }
        else if (row === firstRow) {
            if (!self._showHeader) {
                self._rowCount -= Math_min(lastRow - row + 1, count);
                if (!ignoreUpdateDataSource && bm) {
                    sheetModelManager && sheetModelManager._backupRowsChange(self, row, count, key, RowStateType.deleted);
                    bm._removeItems(_getRelativeRowIndex(self, row), Math_min(lastRow - row + 1, count), tableChanges);
                    dataSourceChanged = true;
                }
            }
        }
        else if (row <= lastRow) {
            self._rowCount -= Math_min(lastRow - row + 1, count);
            if (!ignoreUpdateDataSource && bm) {
                sheetModelManager && sheetModelManager._backupRowsChange(self, row, count, key, RowStateType.deleted);
                bm._removeItems(_getRelativeRowIndex(self, row), Math_min(lastRow - row + 1, count), tableChanges);
                dataSourceChanged = true;
            }
           
            if (row === lastRow && self._showFooter) {
                sheet && sheet._modelManager._backupTableProperty(self, "showFooter", self._showFooter);
                self._showFooter = false;
            }
        }
        if (self._rowFilter) {
            self._rowFilter._onRowsRemoved(row, count);
        }
        if (row >= oldDataRangeRow && row < oldDataRangeRow + oldDataRangeRowCount) {
            var slicerData = self._slicerData;
            slicerData && slicerData.onRowsRemoved(row - oldDataRangeRow, count);
        }
        return dataSourceChanged;
    };
    Table.prototype._onColumnsRemoved = function (col, count) {
        var self = this;
        var tcs = self._columns;
        if (col >= self._col + self._colCount) {
            return;
        }
        var sheet = self._sheet;
        if (sheet) {
            sheet._modelManager._backupTableProperty(self, PROPERTY_RANGE, {
                row: self._row,
                col: self._col,
                rowCount: self._rowCount,
                colCount: self._colCount
            });
            sheet._modelManager._backupTableProperty(self, PROPERTY_COLUMN, self._columns.slice());
        }
        var oldColumn = self._col;
        var firstCol = self._col, lastCol = self._col + self._colCount - 1;
        if (col < firstCol) {
            if (col + count <= firstCol) {
                self._col -= count;
            }
            else {
                self._col = col;
                self._colCount -= (col + count - firstCol);
               
                if (tcs) {
                    tcs.splice(0, col + count - firstCol);
                    self._updateFooterRowStyles(0, col + count - firstCol);
                }
            }
        }
        else {
            self._colCount -= Math_min(lastCol - col + 1, count);
           
            if (tcs) {
                tcs.splice(col - firstCol, Math_min(lastCol - col + 1, count));
                self._updateFooterRowStyles(col - firstCol, Math_min(lastCol - col + 1, count));
            }
        }
        if (self._rowFilter) {
            self._rowFilter._onColumnsRemoved(col, count);
        }
        if (col >= oldColumn) {
            var slicerData = self._slicerData;
            slicerData && slicerData.onColumnsRemoved(col - oldColumn, count);
        }
    };
    Table.prototype._clear = function (row, col, rowCount, colCount) {
        var self = this;
        var maxRowCount = rowCount, maxColCount = colCount;
        var sheet = self._sheet;
        if (sheet) {
            maxRowCount = sheet.getRowCount();
            maxColCount = sheet.getColumnCount();
        }
        var r = row < 0 ? 0 : row;
        var c = col < 0 ? 0 : col;
        var rc = row < 0 ? maxRowCount : rowCount;
        var cc = col < 0 ? maxColCount : colCount;
        var clearRange = Core_1._createRange(r, c, rc, cc);
       
        var headerIndex = self.headerIndex();
        if (self._showHeader && r <= headerIndex && headerIndex < r + rc) {
            var headerRange = Core_1._createRange(headerIndex, self._col, 1, self._colCount);
            var cr = clearRange.getIntersect(headerRange, maxRowCount, maxColCount);
            if (cr) {
                self._clearHeader(cr.col - self._col, getColCount(cr));
            }
        }
       
        var dataRange = self.dataRange();
        var intersectRange = clearRange.getIntersect(dataRange, maxRowCount, maxColCount);
        if (intersectRange) {
            self._clearDataRange(intersectRange);
        }
       
        var footerIndex = self.footerIndex();
        if (self._showFooter && r <= footerIndex && footerIndex < r + rc) {
            var footerRange = Core_1._createRange(footerIndex, self._col, 1, self._colCount);
            var cr = clearRange.getIntersect(footerRange, maxRowCount, maxColCount);
            if (cr) {
                self._clearFooter(cr.col - self._col, getColCount(cr));
            }
        }
       
        if (self._rowFilter) {
            self._rowFilter._clear(row, col, rowCount, colCount);
        }
    };
    Table.prototype.toJSON = function (newName) {
       
        var self = this, style = self.style(), rowFilter = self.rowFilter(), COLUMNS = 'columns', name;
        if (isNullOrUndefined(newName)) {
            name = self.name();
        }
        else {
            name = newName;
            self._newTableName = name;
        }
        var dictData = {
            name: [name, keyword_null],
            row: [self._row, -1],
            col: [self._col, -1],
            rowCount: [self._rowCount, -1],
            colCount: [self._colCount, -1],
            showHeader: [self._showHeader, true],
            showFooter: [self._showFooter, false],
            useFooterDropDownList: [self._useFooterDropDownList, false],
            showResizeHandle: [self._showResizeHandle, false],
            highlightFirstColumn: [self.highlightFirstColumn(), false],
            highlightLastColumn: [self.highlightLastColumn(), false],
            bandRows: [self.bandRows(), true],
            expandBoundRows: [self.expandBoundRows(), false],
            bandColumns: [self.bandColumns(), false],
            style: [style ? style.toJSON() : keyword_null, keyword_null],
            autoGenerateColumns: [self.autoGenerateColumns(), true],
            bindingPath: [self.bindingPath(), keyword_undefined],
            rowFilter: [rowFilter ? rowFilter.toJSON() : keyword_null, keyword_null],
            reservedElement: [self._loselessData, keyword_null],
            allowAutoExpand: [self._allowAutoExpand, true],
        };
        dictData[COLUMNS] = [[]];
        for (var i = 0; i < self._columns.length; i++) {
            var columnJSON = self._columns[i].toJSON(), footerFormula = columnJSON[CONST_FOOTER_FORMULA], dataAreaFormula = columnJSON[CONST_DATA_AREA_FORMULA];
            if (footerFormula) {
                columnJSON[CONST_FOOTER_FORMULA] = expressionToFormula(self._sheet, footerFormula, self.footerIndex(), i + self._col);
            }
            if (dataAreaFormula) {
                columnJSON[CONST_DATA_AREA_FORMULA] = expressionToFormula(self._sheet, dataAreaFormula, self.dataRange().row, i + self._col);
            }
            dictData[COLUMNS][0][i] = columnJSON;
        }
        dictData[COLUMNS][1] = keyword_null;
        var jsData = {};
       
        for (var item in dictData) { 
            var value = dictData[item];
            if (value[0] !== value[1]) {
                jsData[item] = value[0];
            }
        }
        return $_isEmptyObject(jsData) ? keyword_undefined : jsData;
    };
    Table.prototype.fromJSON = function (jsData, noSchema) {
        if (!jsData) {
            return;
        }
        var self = this;
        $_each([CONST_NAME, CONST_HIGHLIGHT_FIRST_COLUMN, CONST_HIGHLIGHT_LAST_COLUMN, CONST_BAND_ROWS, CONST_BAND_COLUMNS, CONST_AUTO_GENERATE_COLUMNS], function (index, v) {
            if (isDefined(jsData[v])) {
                self[v](jsData[v], false);
            }
        });
        var row = jsData.row;
        if (isDefined(row)) {
            self._row = row;
        }
        var col = jsData.col;
        if (isDefined(col)) {
            self._col = col;
        }
        var rowCount = jsData.rowCount;
        if (isDefined(rowCount)) {
            self._rowCount = rowCount;
        }
        var colCount = jsData.colCount;
        if (isDefined(colCount)) {
            self._colCount = colCount;
        }
        var showHeader = jsData.showHeader;
        if (isDefined(showHeader)) {
            self._showHeader = showHeader;
        }
        var showFooter = jsData.showFooter;
        if (isDefined(showFooter)) {
            self._showFooter = showFooter;
        }
        var expandBoundRows = jsData.expandBoundRows;
        if (isDefined(expandBoundRows)) {
            self._expandBoundRows = expandBoundRows;
        }
        var useFooterDropDownList = jsData.useFooterDropDownList;
        if (isDefined(useFooterDropDownList)) {
            self._useFooterDropDownList = useFooterDropDownList;
        }
        var showResizeHandle = jsData.showResizeHandle;
        if (isDefined(showResizeHandle)) {
            self._showResizeHandle = showResizeHandle;
        }
        var style = jsData.style;
        if (style) {
            var tableStyle = new table_theme_1.TableTheme();
            tableStyle.fromJSON(style, noSchema);
            self.style(tableStyle);
        }
        var dataSource = jsData.dataSource, dataBinding = jsData.dataBinding, bindingPath = jsData.bindingPath;
        if (noSchema) {
            if (dataSource && Bindings_1._BindingManager) {
                self._bindingManager = new Bindings_1._BindingManager();
                self._bindingManager.bind(dataSource);
            }
            if (dataBinding && Bindings_1._BindingManager) {
                self._bindingManager = new Bindings_1._BindingManager();
                self._bindingManager.fromJSON(dataBinding);
            }
        }
        else if (bindingPath) {
            self._bindingPath = bindingPath;
            var sheet = self._sheet, sheetDataSource = sheet && sheet.getDataSource && sheet.getDataSource();
            if (Bindings_1.CellBindingSource && sheetDataSource instanceof Bindings_1.CellBindingSource) {
                var actualDataSource = Bindings_1._getValueByPath(sheetDataSource.getSource(), bindingPath);
                if (actualDataSource) {
                    self._bindingManager = new Bindings_1._BindingManager();
                    self._bindingManager.bind(actualDataSource);
                }
            }
        }
        var columns = jsData.columns;
        if (columns) {
            var columnsData = columns, count = columnsData.length;
            var tcs = self._columns = [], tc = void 0, data = void 0;
            for (var i = 0; i < count; i++) {
                data = columnsData[i];
                tc = new TableColumn(self._newAutoId());
                tc.fromJSON(data);
                var oldColumnName = tc.name(), newColumnName = self._getNoConflictTableColumnName(oldColumnName, i);
                tcs.push(tc);
                if (newColumnName !== oldColumnName) {
                    self.setColumnName(i, newColumnName);
                }
            }
            self._checkTableColumnId();
        }
        if (self._useFooterDropDownList) {
            self._createFooterButton(true);
        }
        var rowFilter = jsData.rowFilter;
        if (rowFilter) {
            var filter = exports._TableFilter && new exports._TableFilter();
            if (filter) {
                filter.table(self);
                filter.fromJSON(rowFilter, noSchema);
                self._rowFilter = filter;
                self._rowFilter.reFilter();
            }
        }
        var loselessData = jsData.reservedElement;
        if (loselessData) {
            self._loselessData = loselessData;
        }
        var allowAutoExpand = jsData.allowAutoExpand;
        if (isDefined(allowAutoExpand)) {
            self._allowAutoExpand = allowAutoExpand;
        }
    };
    Table.prototype.formulaFromJSON = function () {
        var self = this, sheet = self._sheet, calModel = sheet._getCalcModel(), tcs = self._columns, tc;
        var footerIndex = self.footerIndex(), tableRow = self.dataRange().row, tableCol = self._col, currentCol;
        for (var i = 0; i < tcs.length; i++) {
            tc = tcs[i];
            currentCol = i + tableCol;
            var footerFormula = tc.footerFormula();
            if (footerFormula && (typeof footerFormula === TYPE_STRING)) {
                tc.footerFormula(formulaToExpression(sheet, footerFormula, footerIndex, currentCol));
            }
            var dataAreaFormula = tc.dataAreaFormula();
            if (dataAreaFormula && calModel) {
                var arrayInfo = calModel._getArrayInfo(tableRow, currentCol);
                if (!isNullOrUndefined(arrayInfo)) {
                    tc._isArrayFormula({ isArrayFormula: true, isDynamicArray: arrayInfo.isDynamicArray });
                }
            }
            if (dataAreaFormula && (typeof dataAreaFormula === TYPE_STRING)) {
                tc.dataAreaFormula(formulaToExpression(sheet, dataAreaFormula, tableRow, currentCol));
            }
        }
    };
    Table.prototype._checkTableColumnId = function () {
       
        var self = this, tcs = self._columns, columnCount = tcs.length, tc, tcId;
        for (var i = 0; i < columnCount; i++) {
            tc = tcs[i];
            tcId = tc.id();
            if (tcId < 1) {
                tc.id(self._newAutoId());
            }
        }
    };
   
    Table.prototype.startRow = function () {
        return this._row;
    };
    Table.prototype.startColumn = function () {
        return this._col;
    };
    Table.prototype.endRow = function () {
        return this._row + this._rowCount - 1;
    };
    Table.prototype.endColumn = function () {
        return this._col + this._colCount - 1;
    };
    Table.prototype.hasHeadersRow = function () {
        return this._showHeader;
    };
    Table.prototype.hasTotalsRow = function () {
        return this._showFooter;
    };
    Table.prototype.tableName = function () {
        return this.name();
    };
    Table.prototype.getColumnIndexInTable = function (columnName) {
        columnName = columnName.toLowerCase().replace(/\u00A0/g, " ");
        var index = -1, columnName2 = Common_1.Common._StringHelper._replace(columnName, '\r\n', '\n');
        if (!isNullOrUndefined(columnName)) {
            $_each(this._columns, function (i, column) {
                var cName = column.name().toString().toLowerCase().replace(/\u00A0/g, " ");
                if (cName === columnName || cName === columnName2) {
                    index = i;
                    return false;
                }
            });
        }
        return index;
    };
    Table.prototype.source = function () {
        var sheet = this._sheet;
        return sheet && sheet._getSheetSource && sheet._getSheetSource();
    };
   
    Table.prototype._applyBindingPath = function () {
        var self = this, sheet = self._sheet;
        if (!sheet) {
            return;
        }
        var path = self.bindingPath();
        if (path) {
            var dataSource = sheet.getDataSource && sheet.getDataSource();
            if (Bindings_1.CellBindingSource && dataSource instanceof Bindings_1.CellBindingSource) {
                var actualDataSource = Bindings_1._getValueByPath(dataSource.getSource(), path);
                self._setBindingPathImp(actualDataSource);
            }
        }
    };
    Table.prototype._setBindingPathImp = function (actualDataSource) {
        var self = this, sheet = self._sheet;
        if (actualDataSource) {
            var dataRange = self.dataRange(), dataRangeRow = dataRange.row, dataRangeRowCount = getRowCount(dataRange);
            var bindingManager = new Bindings_1._BindingManager();
            bindingManager.bind(actualDataSource, sheet._modelManager._changes);
            var rowCount = bindingManager.getRowCount();
            try {
                suspendPaint(sheet);
                self._bindingManager = keyword_null;
                if (rowCount > dataRangeRowCount) {
                    if (self._expandBoundRows) {
                        sheet.addRows(dataRangeRow + dataRangeRowCount, rowCount - dataRangeRowCount);
                    }
                    else {
                        var sheetBindingManager = sheet._bindingManager;
                        if (sheetBindingManager && sheetBindingManager._isForSheetSetDataSource) {
                            sheetBindingManager._isNewRowsAdded = true;
                        }
                        self._ignoreBindingPath = true;
                        if (dataRangeRowCount === 0) {
                            self._insertRows(dataRangeRow, rowCount);
                        }
                        else {
                            self._insertRows(dataRangeRow + dataRangeRowCount - 1, rowCount - dataRangeRowCount, true );
                        }
                        delete self._ignoreBindingPath;
                    }
                }
                else if (rowCount < dataRangeRowCount) {
                    if (self._expandBoundRows) {
                        sheet.deleteRows(dataRangeRow + rowCount, dataRangeRowCount - rowCount);
                    }
                    else {
                        self._ignoreBindingPath = true;
                        self._deleteRows(dataRangeRow + rowCount, dataRangeRowCount - rowCount);
                        delete self._ignoreBindingPath;
                    }
                }
               
               
               
               
               
                self._bind(bindingManager);
                var calcService = CalcEngine && sheet._getCalcServiceInternal();
                if (calcService && !calcService.IsSuspended()) {
                    sheet.recalcAll();
                }
            }
            finally {
                resumePaint(sheet);
            }
        }
    };
    Table.prototype.clone = function () {
        var self = this, table = new Table();
        var jsonStr = JSON_STRINGIFY(self.toJSON());
        table._setOwner(self._owner);
        table.fromJSON(JSON_PARSE(jsonStr));
        return table;
    };
    Table.prototype._copyDataSourceImp = function (dataSource) {
        var newBindingManager = new Bindings_1._BindingManager();
        newBindingManager.bind(dataSource);
        this._bindingManager = newBindingManager;
    };
    Table.prototype._copyDataSource = function (srcTable) {
        if (srcTable && !srcTable.bindingPath()) {
            var bindingManager = srcTable._bindingManager;
            if (bindingManager) {
                this._copyDataSourceImp(bindingManager.getSource());
            }
        }
    };
    Table.prototype._getDataSource = function () {
        var bindingManager = this._bindingManager;
        if (bindingManager) {
            return bindingManager.getSource();
        }
        return keyword_null;
    };
    Table.prototype._getDataSourceRowCount = function () {
        var bindingManager = this._bindingManager;
        if (bindingManager) {
            return bindingManager.getRowCount();
        }
        return 0;
    };
    Table.prototype._updateChartReferenceInfo = function (chart, isAdd) {
        var items = this._chartReferenceInfos;
        if (isAdd) {
            items.push(chart);
        }
        else {
            var index = items.indexOf(chart);
            if (index !== -1) {
                items.splice(index, 1);
            }
        }
    };
    Table.prototype._noticeChartUpdateTableRange = function (type) {
        var table = this;
        table._chartReferenceInfos.forEach(function (chart) {
            chart._onTableChanged(table, type);
        });
        if (type === 2 ) {
            table._chartReferenceInfos = [];
        }
    };
    Table.prototype._addReferenceInfo = function (row, col, sourceID) {
        var table = this;
        if (!table._isUpdateReference) {
            var referenceInfos = table._referenceInfos, items = referenceInfos[sourceID];
            if (!items) {
                items = referenceInfos[sourceID] = {};
            }
            var key = [row, col].join(',');
            items[key] = true;
        }
    };
    Table.prototype._updateReference = function (colIndex, count, isInsert) {
        var table = this, sheet = table._sheet, calcService = sheet && sheet.getCalcService && sheet.getCalcService();
       
        table._isUpdateReference = true;
        if (calcService) {
            var referenceInfos = table._referenceInfos, sourceKey = void 0;
           
           
            for (sourceKey in referenceInfos) { 
                var calcSourceModel = calcService._sourceModels[sourceKey];
                if (!calcSourceModel) {
                   
                    delete referenceInfos[sourceKey];
                   
                    continue;
                }
                var changeInfo = calcSourceModel._getChangesForCalcEngine();
                var items = referenceInfos[sourceKey];
               
                for (var key in items) { 
                    var values = key.split(','), row = +values[0], col = +values[1];
                   
                    var expression = calcSourceModel._getExpr(row, col);
                    if (expression) {
                        if (!table._isInTotalRow(row, col)) {
                            table._updateTableExpression(expression, colIndex, count, isInsert, false , row, col);
                        }
                        calcSourceModel._setExpression(row, col, expression, undefined , false , changeInfo);
                    }
                    else {
                       
                        delete items[key];
                    }
                }
            }
           
           
           
           
        }
        delete table._isUpdateReference;
    };
    Table.prototype._updateReferenceExpression = function (sheetRow, sheetCol, newExpression) {
        var table = this, sheet = table._sheet, calcService = sheet && sheet.getCalcService();
        table._isUpdateReference = true;
        if (calcService) {
            var referenceInfos = table._referenceInfos, sourceKey = void 0;
           
            for (sourceKey in referenceInfos) { 
                var calcSourceModel = calcService._sourceModels[sourceKey];
                var items = referenceInfos[sourceKey];
               
                for (var key in items) { 
                    var values = key.split(','), row = +values[0], col = +values[1];
                    var expression = calcSourceModel._getExpr(row, col);
                    if (expression && sheetRow === row && sheetCol === col) {
                        var index = _getTableExpression(expression);
                        if (index > -1) {
                            expression.arguments[index] = newExpression;
                        }
                    }
                }
            }
        }
        delete table._isUpdateReference;
    };
    Table.prototype._isInTotalRow = function (row, col) {
        var self = this, footerIndex = self.footerIndex(), result = false;
        if (footerIndex > -1 && row === footerIndex) {
            var startCol = self._col, endCol = startCol + self._colCount;
            result = col >= startCol && col < endCol;
        }
        return result;
    };
   
    Table.prototype.sort = function (tableColumnIndex, ascending) {
        var self = this, sheet = self._sheet, dataRange = self.dataRange(), rowFilter = self.rowFilter();
        if (sheet && 0 <= tableColumnIndex && tableColumnIndex < dataRange.colCount) {
            sheet.suspendPaint();
            sheet.sortRange(dataRange.row, dataRange.col, dataRange.rowCount, dataRange.colCount, true, [{
                    index: tableColumnIndex + dataRange.col,
                    ascending: ascending
                }]);
            if (rowFilter) {
                rowFilter._sortInfo = {
                    index: tableColumnIndex + dataRange.col,
                    ascending: ascending
                };
            }
            sheet.resumePaint();
        }
    };
   
    Table.prototype._inBinding = function () {
        return !!this._bindingManager;
    };
    Table.prototype._doInsertRows = function (row, count, isInsertAfter, hasNonNullRowBelowTable, lastNonNullRow) {
        var self = this, sheet = self._sheet;
        var tableStartRow = self._row, tableStartCol = self._col, tableRowCount = self._rowCount, tableColCount = self._colCount, tableEndRow = tableStartRow + tableRowCount - 1;
        var insertRowIndex = isInsertAfter ? row + 1 : row, moveToRow = insertRowIndex + count;
        var oldDataRange = self.dataRange();
        _suspendAll(sheet);
        try {
            self._updateActiveCellState(false);
            self._removeTableFromList();
            self._onRowsAdded(insertRowIndex, count, isInsertAfter, false , true );
            self._updateReference();
            var options = Core_1.CopyToOptions.value | Core_1.CopyToOptions.formula | Core_1.CopyToOptions.comment | Core_1.CopyToOptions.outline | Core_1.CopyToOptions.sparkline | Core_1.CopyToOptions.span | Core_1.CopyToOptions.style | Core_1.CopyToOptions.tag | Core_1.CopyToOptions.bindingPath | Core_1.CopyToOptions.hyperlink;
            if (hasNonNullRowBelowTable && !self._noNeedMoveToWhenBind) {
                var fromRow = tableEndRow + 1, toRow = fromRow + count, deltaCount = lastNonNullRow - fromRow + 1;
                sheet.moveTo(fromRow, tableStartCol, toRow, tableStartCol, deltaCount, tableColCount, options);
            }
            var moveRowCount = tableEndRow - insertRowIndex + 1;
            if ((!isInsertAfter || row !== tableEndRow) && moveRowCount > 0) {
                sheet._fromTable = true;
                sheet._movingTableDataRange = oldDataRange;
                sheet.moveTo(insertRowIndex, tableStartCol, moveToRow, tableStartCol, moveRowCount, tableColCount, options);
                delete sheet._movingTableDataRange;
                delete sheet._fromTable;
            }
            var modelManager = sheet._modelManager, dataRange = self.dataRange();
            modelManager._onRowsAdded_ConditionalRule && modelManager._onRowsAdded_ConditionalRule(insertRowIndex, count, [dataRange], true);
            modelManager._onRowsAdded_Validator && modelManager._onRowsAdded_Validator(insertRowIndex, count, [dataRange], true);
            self._addTableToList();
            self._onRowsAdded2(insertRowIndex, count, true );
            self._updateDataAreaFormula();
            self._updateSheetModelFormulaOnRowsChanged(insertRowIndex, count, true);
            self._updateArrayInfo();
            self._owner._clearCache();
        }
        finally {
            self._updateActiveCellState(true);
            _resumeAll(sheet);
            self._noticeChartUpdateTableRange(0 );
            sheet.recalcAll(true);
        }
    };
    Table.prototype._updateActiveCellState = function (isAdd) {
        this._sheet._updateActiveCellState(isAdd);
    };
   
    
    Table.prototype.insertRows = function (row, count, isInsertAfter) {
        if (isNullOrUndefined(row) || isNullOrUndefined(count) || count <= 0) {
            return;
        }
        var self = this;
        row = _switchIndexFromTableToSheet(self, row, true );
        self._insertRows(row, count, isInsertAfter);
    };
    Table.prototype._insertRows = function (row, count, isInsertAfter) {
        if (isNullOrUndefined(row) || isNullOrUndefined(count) || count <= 0) {
            return;
        }
       
        var self = this, sheet = self._sheet;
        var dataRange = self.dataRange(), dataRangeRow = dataRange.row, dataRangeRowCount = dataRange.rowCount, rowBelowTable = dataRangeRow + dataRangeRowCount;
        if (!(dataRangeRowCount === 0 && row === dataRangeRow) && (row < dataRangeRow || row >= rowBelowTable)) {
            throwError(getSR().Exp_RowParamOutOfRange);
        }
        var tableStartRow = self._row, tableStartCol = self._col, tableRowCount = self._rowCount, tableColCount = self._colCount, tableEndRow = tableStartRow + tableRowCount - 1, tableEndCol = tableStartCol + tableColCount - 1;
       
        var lastNonNullRow = _getLastNonNullRowBelowTable(sheet, self), hasNonNullRowBelowTable = lastNonNullRow > tableEndRow;
        if (_checkInvalidOperation(sheet, self, tableEndRow + 1, lastNonNullRow, tableStartCol, tableEndCol, count)) {
            return;
        }
        self._doInsertRows(row, count, isInsertAfter, hasNonNullRowBelowTable, lastNonNullRow);
    };
   
    
    Table.prototype.deleteRows = function (row, count) {
        if (isNullOrUndefined(row) || isNullOrUndefined(count) || count <= 0) {
            return;
        }
        var self = this;
        row = _switchIndexFromTableToSheet(self, row, true );
        self._deleteRows(row, count);
    };
    Table.prototype._deleteRows = function (row, count) {
        if (isNullOrUndefined(row) || isNullOrUndefined(count) || count <= 0) {
            return;
        }
        var self = this, sheet = self._sheet;
        var dataRange = self.dataRange(), dataRangeRow = dataRange.row, dataRangeRowCount = dataRange.rowCount;
        if (row < dataRangeRow || row >= dataRangeRow + dataRangeRowCount) {
            throwError(getSR().Exp_RowParamOutOfRange);
        }
        var tableStartRow = self._row, tableStartCol = self._col, tableRowCount = self._rowCount, tableColCount = self._colCount, tableEndRow = tableStartRow + tableRowCount - 1, tableEndCol = tableStartCol + tableColCount - 1;
        if (tableRowCount <= 1 || (row === dataRangeRow && !self._showHeader && !self._showFooter && count >= dataRangeRowCount)) {
            throwError(getSR().Exp_TableDeleteCountInvalid);
        }
        var lastNonNullRow = _getLastNonNullRowBelowTable(sheet, self), hasNonNullRowBelowTable = lastNonNullRow > tableEndRow;
        if (_checkInvalidOperation(sheet, self, tableEndRow + 1, lastNonNullRow, tableStartCol, tableEndCol, count, true )) {
            return;
        }
        _suspendAll(sheet);
        try {
            self._updateActiveCellState(false);
            var inBinding = self._inBinding(), key = void 0;
            if (inBinding) {
                key = _getRowsChangeKey(true );
                self._setDeletedRows(row, count, key);
            }
            self._removeTableFromList();
            self._onRowsRemoved(row, count, keyword_undefined, key);
            self._updateReference();
            var clearRowCount = Math_min(count, tableEndRow - row + 1);
            sheet.clear(row, tableStartCol, clearRowCount, tableColCount, 3 , 383 );
            var options = Core_1.CopyToOptions.value | Core_1.CopyToOptions.formula | Core_1.CopyToOptions.comment | Core_1.CopyToOptions.outline | Core_1.CopyToOptions.sparkline | Core_1.CopyToOptions.span | Core_1.CopyToOptions.style | Core_1.CopyToOptions.tag | Core_1.CopyToOptions.bindingPath | Core_1.CopyToOptions.hyperlink;
            if (row + count <= tableEndRow && !inBinding) {
                sheet.moveTo(row + count, tableStartCol, row, tableStartCol, tableEndRow - count - row + 1, tableColCount, options);
            }
            if (hasNonNullRowBelowTable) {
                var fromRow = tableEndRow + 1, toRow = fromRow - clearRowCount, deltaCount = lastNonNullRow - fromRow + 1;
                sheet.moveTo(fromRow, tableStartCol, toRow, tableStartCol, deltaCount, tableColCount, options);
            }
            var modelManager = sheet._modelManager, newDataRange = self.dataRange();
            modelManager._onRowsRemoved_ConditionalRule && modelManager._onRowsRemoved_ConditionalRule(row, count, [newDataRange], true);
            self._addTableToList();
            self._updateDataAreaFormula();
            self._updateSheetModelFormulaOnRowsChanged(row, count, false);
            self._owner._clearCache();
        }
        finally {
            self._updateActiveCellState(true);
            _resumeAll(sheet);
            self._noticeChartUpdateTableRange(0 );
            sheet.recalcAll(true);
        }
    };
   
    
    Table.prototype.insertColumns = function (col, count, isInsertAfter) {
        if (isNullOrUndefined(col) || isNullOrUndefined(count) || count <= 0) {
            return;
        }
        var self = this;
        col = _switchIndexFromTableToSheet(self, col, false );
        self._insertColumns(col, count, isInsertAfter);
    };
    Table.prototype._insertColumns = function (col, count, isInsertAfter) {
        if (isNullOrUndefined(col) || isNullOrUndefined(count) || count <= 0) {
            return;
        }
        var self = this, sheet = self._sheet;
        var dataRange = self.dataRange(), dataRangeRow = dataRange.row, dataRangeCol = dataRange.col, dataRangeRowCount = dataRange.rowCount, dataRangeColCount = dataRange.colCount;
        if (col < dataRangeCol || col >= dataRangeCol + dataRangeColCount) {
            throwError(getSR().Exp_ColParamOutOfRange);
        }
        var tableStartRow = self._row, tableStartCol = self._col, tableRowCount = self._rowCount, tableColCount = self._colCount, tableEndRow = tableStartRow + tableRowCount - 1, tableEndCol = tableStartCol + tableColCount - 1;
        var lastNonNullCol = _getLastNonNulColRightTable(sheet, self), hasNonNulColRightTable = lastNonNullCol > tableEndCol;
        if (_checkInvalidOperation(sheet, self, tableStartRow, tableEndRow, tableEndCol + 1, lastNonNullCol, count, false , true )) {
            return;
        }
        var insertColIndex = isInsertAfter ? col + 1 : col, moveToCol = insertColIndex + count;
        _suspendAll(sheet);
        try {
            self._updateActiveCellState(false);
            self._removeTableFromList();
            var ignoreUpdateDataSource = !self._inBinding();
            var fromCol = tableEndCol + 1, toCol = fromCol + count, deltaCount = lastNonNullCol - fromCol + 1;
            var options = Core_1.CopyToOptions.value | Core_1.CopyToOptions.formula | Core_1.CopyToOptions.comment | Core_1.CopyToOptions.outline | Core_1.CopyToOptions.sparkline | Core_1.CopyToOptions.span | Core_1.CopyToOptions.style | Core_1.CopyToOptions.tag | Core_1.CopyToOptions.bindingPath | Core_1.CopyToOptions.hyperlink;
            var doMoveAction = false;
            if (hasNonNulColRightTable) {
                sheet.moveTo(tableStartRow, fromCol, tableStartRow, toCol, tableRowCount, deltaCount, options);
                doMoveAction = true;
            }
            self._onColumnsAdded(insertColIndex, count, isInsertAfter, ignoreUpdateDataSource, true );
            self._updateTableColumnExpression(insertColIndex, count, true );
            self._updateReference(insertColIndex, count, true );
            if ((!isInsertAfter || col !== tableEndCol) && ignoreUpdateDataSource) {
                sheet._fromTable = true;
                var footer = self._showFooter ? 1 : 0;
                sheet.moveTo(dataRangeRow, insertColIndex, dataRangeRow, moveToCol, dataRangeRowCount + footer, tableEndCol - insertColIndex + 1, options);
                doMoveAction = true;
                delete sheet._fromTable;
            }
            var modelManager = sheet._modelManager;
            var newDataRange = self.dataRange();
            modelManager._onColumnsAdded_ConditionalRule && modelManager._onColumnsAdded_ConditionalRule(insertColIndex, count, [newDataRange], true);
            modelManager._onColumnsAdded_Validator && modelManager._onColumnsAdded_Validator(insertColIndex, count, [newDataRange]);
            self._addTableToList();
            self._updateDataAreaFormula();
            self._updateSheetModelFormulaOnColumnsChanged(insertColIndex, count, true);
            // moveTo已经更新过了,这里不需要再更新customNames了
            if (!(doMoveAction && self._dynamicTable)) {
                SheetsCalc_1._adjustCustomNameOnInsertRemove(sheet, insertColIndex, count, true , false );
            }
            self._owner._clearCache();
        }
        finally {
            self._updateActiveCellState(true);
            _resumeAll(sheet);
            self._noticeChartUpdateTableRange(0 );
            sheet.recalcAll(true);
        }
    };
   
    
    Table.prototype.deleteColumns = function (col, count) {
        if (isNullOrUndefined(col) || isNullOrUndefined(count) || count <= 0) {
            return;
        }
        var self = this;
        col = _switchIndexFromTableToSheet(self, col, false );
        self._deleteColumns(col, count);
    };
    Table.prototype._deleteColumns = function (col, count) {
        if (isNullOrUndefined(col) || isNullOrUndefined(count) || count <= 0) {
            return;
        }
        var self = this, sheet = self._sheet;
        var dataRange = self.dataRange(), dataRangeCol = dataRange.col, dataRangeColCount = dataRange.colCount;
        if (col < dataRangeCol || col >= dataRangeCol + dataRangeColCount) {
            throwError(getSR().Exp_ColParamOutOfRange);
        }
        var tableStartRow = self._row, tableStartCol = self._col, tableRowCount = self._rowCount, tableColCount = self._colCount, tableEndRow = tableStartRow + tableRowCount - 1, tableEndCol = tableStartCol + tableColCount - 1, footer = self._showFooter ? 1 : 0;
        if (tableColCount <= 1 || (col === tableStartCol && count >= tableColCount)) {
            throwError(getSR().Exp_TableDeleteCountInvalid);
        }
        var lastNonNullCol = _getLastNonNulColRightTable(sheet, self), hasNonNulColRightTable = lastNonNullCol > tableEndCol;
        if (_checkInvalidOperation(sheet, self, tableStartRow, tableEndRow, tableEndCol + 1, lastNonNullCol, count, true , true )) {
            return;
        }
        _suspendAll(sheet);
        try {
            self._updateActiveCellState(false);
            self._removeTableFromList();
            self._onColumnsRemoved(col, count);
            self._updateTableColumnExpression(col, count, false );
            self._updateReference(col, count, false );
            var clearColCount = Math_min(count, tableEndCol - col + 1);
            sheet.clear(tableStartRow, col, tableRowCount, clearColCount, 3 , 383 );
            var options = Core_1.CopyToOptions.value | Core_1.CopyToOptions.formula | Core_1.CopyToOptions.comment | Core_1.CopyToOptions.outline | Core_1.CopyToOptions.sparkline | Core_1.CopyToOptions.span | Core_1.CopyToOptions.style | Core_1.CopyToOptions.tag | Core_1.CopyToOptions.bindingPath | Core_1.CopyToOptions.hyperlink;
            if (col + count <= tableEndCol) {
                sheet.moveTo(tableStartRow, col + count, tableStartRow, col, tableRowCount - footer, tableEndCol - count - col + 1, options);
            }
            if (hasNonNulColRightTable) {
                var fromCol = tableEndCol + 1, toCol = fromCol - clearColCount, deltaCount = lastNonNullCol - fromCol + 1;
                sheet.moveTo(tableStartRow, fromCol, tableStartRow, toCol, tableRowCount, deltaCount, options);
            }
            var modelManager = sheet._modelManager, newDataRange = self.dataRange();
            modelManager._onColumnsRemoved_ConditionalRule && modelManager._onColumnsRemoved_ConditionalRule(col, count, [newDataRange], true);
            self._addTableToList(true );
            self._updateDataAreaFormula();
            self._updateSheetModelFormulaOnColumnsChanged(col, count, false);
            SheetsCalc_1._adjustCustomNameOnInsertRemove(sheet, col, count, false , false );
            self._owner._clearCache();
        }
        finally {
            self._updateActiveCellState(true);
            _resumeAll(sheet);
            self._noticeChartUpdateTableRange(0 );
            sheet.recalcAll(true);
        }
    };
    Table.prototype._removeTableFromList = function () {
        var self = this, sheet = self._sheet, tableManager = self._owner, tableList = tableManager._tableList;
        if (sheet) {
            sheet._modelManager._backupTableList([self]);
        }
        tableList.splice(tableList.indexOf(self), 1);
        self._clearSheetModelFormula();
    };
    Table.prototype._addTableToList = function (syncFromFooterToSheet) {
        var self = this;
        self._ignoreBindingPath = true;
        self._syncFromFooterToSheet = syncFromFooterToSheet;
        self._owner._addInternal(self);
        delete self._syncFromFooterToSheet;
        delete self._ignoreBindingPath;
    };
    Table.prototype._updateTableColumnExpression = function (tableCol, count, isInsert) {
        var self = this, columns = self._columns, length = columns.length, startCol = _getRelativeColIndex(self, tableCol), column, expression;
        for (var i = startCol; i < length; i++) {
            var columnIndex = void 0;
            if (isInsert) {
                if (i > startCol + count - 1) {
                    columnIndex = i - count;
                }
            }
            else if (i >= startCol) {
                columnIndex = i + count;
            }
            column = columns[i];
            expression = column.footerFormula();
            if (expression) {
                self._updateTableExpression(expression, tableCol, count, isInsert, true , columnIndex);
            }
        }
    };
    Table.prototype._updateTableExpression = function (expression, tableCol, count, isInsert, isTable, index1, index2) {
        var self = this, sheet = self._sheet;
        if (count > 0 && expression && expression.arguments) {
            var expressionList = expression.arguments, expressionItem = void 0, newExpr = void 0;
            for (var j = 0; j < expressionList.length; j++) {
                expressionItem = expressionList[j];
                if (expressionItem instanceof SheetsCalc_1._TableExpression) {
                    if (sheet) {
                        if (isTable) {
                            var columnIndex = index1;
                            sheet._modelManager._backupColumnReference(this, expressionItem, columnIndex);
                        }
                        else {
                            var sheetRow = index1, sheetCol = index2;
                            sheet._modelManager._backupSheetReference(self, expressionItem, sheetRow, sheetCol);
                        }
                    }
                    expressionItem._updateCache();
                    newExpr = expressionItem.offsetWhenInsertRemoveColumn(tableCol, count, isInsert, isTable);
                    expressionList[j] = newExpr;
                }
            }
        }
    };
   
    Table.prototype._getDataItem = function (row) {
        var self = this, bm = self._bindingManager, sheet = self._sheet, header = self._showHeader ? 1 : 0, sheetRow = self._row + header + row, col = self._col;
        if (!bm || bm.getRowCount() === 0) {
            return keyword_null;
        }
        var cc = self._colCount;
        var t = {};
        var rowItem = bm._getDataItem(row);
        if (rowItem) {
            for (var x in rowItem) {
                if (hasOwnProperty(rowItem, x) && typeof x !== 'function') {
                    t[x] = rowItem[x];
                }
            }
        }
        for (var i = 0; i < cc; i++) {
            var ci = self._columns[i], dataField = ci && ci.dataField();
            if (ci && dataField && dataField.length > 0 && isNullOrUndefined(t[dataField])) {
                t[dataField] = sheet.getValue(sheetRow, col + i);
            }
        }
        return t;
    };
    Table.prototype._setDeletedRows = function (row, count, key) {
        var self = this, deletedRows = [], bm = self._bindingManager, rowIndex, relativeRowIndex;
        if (bm) {
            var dataLength = bm.getRowCount();
            for (var i = 0; i < count; i++) {
                rowIndex = row + i;
                var d = keyword_null;
                relativeRowIndex = _getRelativeRowIndex(self, rowIndex);
                if (relativeRowIndex < dataLength) {
                    d = self._getDataItem(relativeRowIndex);
                }
                deletedRows.push({ key: key, data: d });
            }
        }
        self._deletedRows = deletedRows;
    };
    Table.prototype._getDeletedRows = function () {
        var rows = [], deletedRows = this._deletedRows;
        if (deletedRows) {
            $_each(deletedRows, function (i, v) {
                if (v && !Core_1.GC$.isFunction(v)) {
                    rows.push(v.data);
                }
            });
        }
        return rows;
    };
    Table.prototype._setDirtyRows = function (row, relativeRowIndex, key) {
        var self = this;
        if (self._sheet._dirtySuspended > 0) {
            return;
        }
        var dirtyRows = self._dirtyRows, bm = self._bindingManager;
        if (bm) {
            var d = keyword_null, dataLength = bm.getRowCount();
            if (relativeRowIndex < dataLength) {
                d = self._getDataItem(relativeRowIndex);
            }
            var currentDirtyRow = { key: key, data: d };
            dirtyRows[row] = currentDirtyRow;
        }
    };
    Table.prototype._updateDirtyRows = function (rowIndex, count, isDelete) {
        var self = this;
        if (self._sheet._dirtySuspended > 0) {
            return;
        }
        var dirtyRows = self._dirtyRows;
        if (isDelete) {
            var deletedDirtyItems = dirtyRows.splice(rowIndex, count);
            self._backupDeletedDirtyRows.push({ rowIndex: rowIndex, count: count, deletedDirtyItems: deletedDirtyItems });
        }
        else {
            for (var i = 0; i < count; i++) {
                dirtyRows.splice(rowIndex, 0, keyword_null);
            }
        }
    };
    Table.prototype._undoInsertDirtyRows = function (row, count) {
       
        this._dirtyRows.splice(row, count);
    };
    Table.prototype._undoDeleteDirtyRows = function () {
       
        var self = this, backupDeletedDirtyRows = self._backupDeletedDirtyRows;
        var lastDeletedDirtyRows = backupDeletedDirtyRows.pop();
        var startRow = lastDeletedDirtyRows.rowIndex, count = lastDeletedDirtyRows.count, deletedDirtyItems = lastDeletedDirtyRows.deletedDirtyItems;
        for (var i = 0; i < count; i++) {
            var rowItem = deletedDirtyItems[i];
            self._dirtyRows[startRow + i] = __assign({}, rowItem);
        }
    };
   
    
    Table.prototype.getDirtyRows = function () {
        var self = this, dirtyRows = self._dirtyRows, rows = [], dirtyRow, tableRowIndex;
        for (var i = 0; i < dirtyRows.length; i++) {
            dirtyRow = dirtyRows[i];
            if (!isNullOrUndefined(dirtyRow)) {
                tableRowIndex = _getRelativeRowIndex(self, i);
                rows.push({
                    row: tableRowIndex,
                    originalItem: dirtyRow.data,
                    item: self._getDataItem(tableRowIndex)
                });
            }
        }
        return rows;
    };
   
    
    Table.prototype.clearPendingChanges = function () {
        this._dirtyRows = [];
    };
   
    Table.prototype.footerRowDropDowns = function (colIndex, dropDowns) {
        var self = this, colRowStyle = self._footerRowStyles[colIndex];
        if (colRowStyle) {
            if (arguments.length === 1) {
                return colRowStyle.dropDowns && colRowStyle.dropDowns.slice();
            }
            var currentDropDown = colRowStyle.dropDowns[0];
            if (dropDowns) {
                var listOption = dropDowns.listOption, submitCommand = dropDowns.submitCommand, type = dropDowns.type;
                if (listOption) {
                    currentDropDown.option = listOption;
                }
                if (submitCommand) {
                    currentDropDown.submitCommand = submitCommand;
                }
                if (isDefined(type)) {
                    currentDropDown.type = type;
                }
                return self;
            }
        }
    };
   
    Table.prototype.checkTableLastRow = function (row) {
        var self = this, tableDataRange = self.dataRange();
        return self.headerIndex() === row || tableDataRange.row + tableDataRange.rowCount - 1 !== row;
    };
   
    Table.prototype.checkTableLastCol = function (col) {
        var self = this, tableDataRange = self.dataRange();
        return tableDataRange.col + tableDataRange.colCount - 1 !== col;
    };
    Table.prototype._raiseTableRowsChanged = function (row, rowCount, isDelete, isAfter, deletedItem) {
        var self = this, sheet = self._sheet;
        _raiseTableRowsChanged(sheet, self, isDelete ? TABLE_DELETE_ROWS : TABLE_INSERT_ROWS, row, rowCount, isAfter, deletedItem);
        var modelManager = sheet._modelManager, propertyName = isDelete ? TABLE_INSERT_ROWS : TABLE_DELETE_ROWS, argsIsAfter = isDelete ? false : keyword_undefined;
        modelManager && modelManager._addEventItem(['tableRowsChanged', self, propertyName, row, rowCount, argsIsAfter, isDelete]);
    };
    Table.prototype._raiseTableColumnsChanged = function (col, colCount, isDelete, isAfter) {
        var self = this, sheet = self._sheet;
        _raiseTableColumnsChanged(sheet, self, isDelete ? TABLE_DELETE_COLUMNS : TABLE_INSERT_COLUMNS, col, colCount, isAfter);
        var modelManager = sheet._modelManager, propertyName = isDelete ? TABLE_INSERT_COLUMNS : TABLE_DELETE_COLUMNS, argsIsAfter = isDelete ? false : keyword_undefined;
        modelManager && modelManager._addEventItem(['tableColumnsChanged', self, propertyName, col, colCount, argsIsAfter]);
    };
    return Table;
}());
exports.Table = Table;
function propertyChangeCallback(propertyName) {
    return function (value, old) {
        var self = this, sheet = self._sheet;
        if (sheet && value !== old) {
            Table._callFeatureHandler(sheet, "tableNameChanged", { oldName: old, newName: value });
            sheet._modelManager._backupTableProperty(self, propertyName, old);
        }
    };
}
Core_1._defineFeature(Table);
function _executeTableAddRow(sheet, table, row, count, isAfter) {
    sheet._commandManager().execute({
        cmd: TABLE_INSERT_ROWS,
        sheetName: sheet.name(),
        tableName: table.name(),
        row: row,
        count: count,
        isAfter: isAfter
    });
}
function _executeDoInsertRow(sheet, table, row, count, isAfter) {
    sheet._commandManager().execute({
        cmd: DO_INSERT_ROW,
        sheetName: sheet.name(),
        tableName: table.name(),
        row: row,
        count: count,
        isAfter: isAfter
    });
}
function _executeTableShowFooter(sheet, table) {
    sheet._commandManager().execute({
        cmd: TABLE_SHOW_FOOTER,
        sheetName: sheet.name(),
        tableName: table.name()
    });
}


Table.prototype.name = defProperty(CONST_NAME, '', propertyChangeCallback(CONST_NAME), checkTableName);


Table.prototype.bandRows = defProperty(CONST_BAND_ROWS, true, propertyChangeCallback(CONST_BAND_ROWS));


Table.prototype.bandColumns = defProperty(CONST_BAND_COLUMNS, false, propertyChangeCallback(CONST_BAND_COLUMNS));


Table.prototype.highlightFirstColumn = defProperty(CONST_HIGHLIGHT_FIRST_COLUMN, false, propertyChangeCallback(CONST_HIGHLIGHT_FIRST_COLUMN));


Table.prototype.highlightLastColumn = defProperty(CONST_HIGHLIGHT_LAST_COLUMN, false, propertyChangeCallback(CONST_HIGHLIGHT_LAST_COLUMN));


Table.prototype.style = defProperty('style', keyword_undefined, propertyChangeCallback('style'));


Table.prototype.autoGenerateColumns = defProperty(CONST_AUTO_GENERATE_COLUMNS, true, propertyChangeCallback(CONST_AUTO_GENERATE_COLUMNS));
if (Filters && Filters.HideRowFilter) {
    var HideRowFilter = Filters.HideRowFilter;
    var TableFilter =  (function (_super) {
        __extends(TableFilter, _super);
        function TableFilter(table) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.table(table);
            return _this;
        }
        TableFilter.prototype._getStartCol = function () {
            return 0;
        };
        TableFilter.prototype._getEndCol = function () {
            return this.range.colCount;
        };
        TableFilter.prototype.table = function (table) {
            var self = this;
            if (arguments.length === 0) {
                return self._table;
            }
            self._table = table;
            if (table) {
                self._sheet = table._sheet;
            }
        };
       
       
       
       
        TableFilter.prototype.unfilter = function (col, ignoreUpdateLayout) {
            var self = this;
            var sheet = self._sheet;
            sheet && sheet.suspendPaint();
            _super.prototype.unfilter.call(this, col, ignoreUpdateLayout);
            var table = self._table;
            if (table && table._owner) {
                table._owner._clearCache();
            }
            sheet && sheet.resumePaint();
        };
        TableFilter.prototype._onRowsAdded = function (row, count) {
            var self = this, table = self._table;
            _super.prototype._onRowsAdded.call(this, row, count);
            table && self._setRangeInternal(table.dataRange());
        };
        TableFilter.prototype._onRowsRemoved = function (row, count) {
            var self = this, table = self._table;
            _super.prototype._onRowsRemoved.call(this, row, count);
            table && self._setRangeInternal(table.dataRange());
        };
        TableFilter.prototype._dispose = function () {
            this._table = keyword_null;
            this._sheet = keyword_null;
        };
        return TableFilter;
    }(HideRowFilter));
    exports._TableFilter = TableFilter;
}




var TableColumn =  (function () {
    function TableColumn(id, dataField, name, formatter, cellType, value) {
        var self = this;
        self.id(id);
        self.dataField(dataField);
        self.name(name || dataField || CONST_COLUMN + self.id());
        self.formatter(formatter);
        self.cellType(cellType);
        self.value(value);
    }
    TableColumn.prototype._isAutoId = function () {
        return this.id() > 0;
    };
    TableColumn.prototype.toJSON = function () {
        var self = this;
        var jsonData = {};
        $_each(tcProperties, function (i, p) {
            var value = self[p]();
            if (!isNullOrUndefined(value)) {
                if (p === CONST_CELLTYPE && value.toJSON && typeof value.toJSON === 'function') {
                    jsonData[p] = value.toJSON();
                }
                else {
                    jsonData[p] = value;
                }
            }
        });
        return $_isEmptyObject(jsonData) ? keyword_undefined : jsonData;
    };
    TableColumn.prototype.fromJSON = function (jsonData) {
        if (!jsonData) {
            return;
        }
       
       
       
       
       
       
       
        var self = this;
        $_each(tcProperties, function (i, p) {
            var value = jsonData[p] !== keyword_undefined ? jsonData[p] : jsonData['_' + p];
            if (!isNullOrUndefined(value)) {
                if (p === CONST_CELLTYPE) {
                    var typeName = value.typeName;
                    var dict = Core_1.CellTypes && Core_1.CellTypes._typeDict;
                    var celltypeClass = dict && dict[typeName] || dict[value.type] || Core_1.getTypeFromString(typeName);
                    if (celltypeClass) {
                        var resultCellType = new celltypeClass();
                        resultCellType.fromJSON(value, false);
                        value = resultCellType;
                    }
                }
            }
            if (!isNullOrUndefined(value)) {
                self[p](value, false);
            }
        });
    };
    return TableColumn;
}());
exports.TableColumn = TableColumn;


TableColumn.prototype.id = function (value) {
    var func = defProperty(CONST_ID, keyword_undefined, function (v) {
        var self = this;
        if (!self.name()) {
            self.name(CONST_COLUMN + v);
        }
    });
    if (arguments.length === 0) {
        return func.call(this);
    }
    if (!isNullOrUndefined(value)) {
        return func.call(this, value);
    }
    return this;
};


TableColumn.prototype.name = defProperty(CONST_NAME, keyword_undefined, function (value) {
    if (!value) {
        var self_1 = this;
        self_1.name(CONST_COLUMN + self_1.id());
    }
});


TableColumn.prototype.formatter = defProperty(CONST_FORMATTER);


TableColumn.prototype.cellType = defProperty(CONST_CELLTYPE);


TableColumn.prototype.value = defProperty(CONST_VALUE);


TableColumn.prototype.dataField = defProperty(CONST_DATAFIELD);
TableColumn.prototype.footerValue = defProperty(CONST_FOOTER_VALUE);
TableColumn.prototype.dataAreaFormula = defProperty(CONST_DATA_AREA_FORMULA);
TableColumn.prototype.footerFormula = defProperty(CONST_FOOTER_FORMULA);
TableColumn.prototype._dataAreaFormulaStr = defProperty(CONST_DATA_AREA_FORMULA_STR);
TableColumn.prototype._isArrayFormula = defProperty(CONST_ARRAY_INFO);




var TableManager =  (function () {
    function TableManager(sheet) {
        this._sheet = sheet;
        this._tableList = [];
        this._rowHeightCache = [];
        this._colWidthCache = [];
    }
    TableManager.prototype._dispose = function () {
        var self = this, tableList = self._tableList, length = tableList.length, table;
        for (var i = 0; i < length; i++) {
            table = tableList[i];
            table && table._dispose();
        }
        self._tableList = [];
        self._clearCache();
        self._sheet = keyword_null;
    };
    TableManager.prototype._clearCache = function () {
        var self = this;
        self._rowHeightCache = [];
        self._colWidthCache = [];
        var tableList = self._tableList, length = tableList.length, table;
        for (var i = 0; i < length; i++) {
            table = tableList[i];
            table._clearCache();
        }
    };
    TableManager.prototype._removeAlterRowCache = function (row, needResetAlter) {
        var self = this, tableList = self._tableList, length = tableList.length, table;
        for (var i = 0; i < length; i++) {
            table = tableList[i];
            if (!needResetAlter && resetAlterCache(table._alterRowCache, row)) {
                table._alterRowCache = [];
            }
            else if (!isNullOrUndefined(table._alterRowCache[row])) {
                table._alterRowCache[row] = keyword_undefined;
            }
        }
    };
    TableManager.prototype._removeAlterColCache = function (col) {
        var self = this, tableList = self._tableList, length = tableList.length, table;
        for (var i = 0; i < length; i++) {
            table = tableList[i];
            if (resetAlterCache(table._alterColCache, col)) {
                table._alterColCache = [];
            }
            else if (!isNullOrUndefined(table._alterColCache[col])) {
                table._alterColCache[col] = keyword_undefined;
            }
        }
    };
   
    
    TableManager.prototype.add = function (name, row, column, rowCount, columnCount, style, options) {
        var self = this;
        self._checkCanAddTable(self._sheet, name, row, column, rowCount, columnCount, true);
        return self._addInternal(new Table(name, row, column, rowCount, columnCount, style || table_theme_1.TableThemes.medium2, options));
    };
   
    
    TableManager.prototype.addFromDataSource = function (name, row, column, dataSource, style, options) {
        if (!dataSource) {
            throwError(getSR().Exp_TableDataSourceNullError);
        }
        if (Bindings_1._BindingManager) {
            var self_2 = this, sheet = self_2._sheet;
            sheet.suspendPaint();
            var bm = new Bindings_1._BindingManager();
            bm.bind(dataSource);
            var rowCount = bm.getRowCount() + 1;
            var columnCount = bm.getColumnCount();
            var table = self_2.add(name, row, column, rowCount, columnCount, style, options);
            table._bind(bm);
            sheet.clearPendingChanges();
            sheet.resumePaint();
            return table;
        }
    };
   
    
    TableManager.prototype.find = function (row, column) {
        var tableList = this._tableList, count = tableList.length, t;
        for (var i = 0; i < count; i++) {
            t = tableList[i];
            var cr = t.range();
            if ((cr.row <= row && row < cr.row + getRowCount(cr)) && (cr.col <= column && column < cr.col + getColCount(cr))) {
                return t;
            }
        }
        return keyword_null;
    };
   
    
    TableManager.prototype.findByName = function (name) {
        var tableList = this._tableList, count = tableList.length, table;
        for (var i = 0; i < count; i++) {
            table = tableList[i];
            if (table.name().toLowerCase() === name.toLowerCase()) {
                return table;
            }
        }
        return keyword_null;
    };
    TableManager.prototype._findCompletelyContainsByRange = function (row, rowCount, col, colCount) {
        var tableList = this._tableList, count = tableList.length, range = Core_1._createRange(row, col, rowCount, colCount);
        var ret = [], t;
        for (var i = 0; i < count; i++) {
            t = tableList[i];
            if (range.containsRange(t.range())) {
                ret.push(t);
            }
        }
        return ret;
    };
    TableManager.prototype._findByRange = function (row, col, rowCount, colCount) {
        var tableList = this._tableList, count = tableList.length;
        var ret = [], t;
        for (var i = 0; i < count; i++) {
            t = tableList[i];
            if (t.range().intersect(row, col, rowCount, colCount)) {
                ret.push(t);
            }
        }
        return ret;
    };
    TableManager.prototype._getActiveTableRect = function () {
        var self = this, sheet = self._sheet;
        var table = self.find(sheet._activeRowIndex, sheet._activeColIndex);
        if (table) {
            return sheet._getRangeWholeRect(new Core_1.Range(-1, table._col, -1, table._colCount));
        }
    };
    TableManager.prototype._addInternal = function (table, isMove) {
        if (!table) {
            return;
        }
        var self = this;
        if (self.findByName(table.name())) {
            throwError(getSR().Exp_TableHasSameNameError);
        }
        var sheet = self._sheet;
        sheet.suspendPaint();
        table._setOwner(self);
        sheet._modelManager._backupTableList([]);
        self._tableList.push(table);
        if (!table._ignoreBindingPath) {
            table._applyBindingPath();
        }
       
        if (table.showHeader()) {
            table._syncHeader();
        }
        if (!isMove && table.showFooter()) {
            table._syncFooter();
        }
        self._onTableAdded(table);
        sheet.resumePaint();
        return table;
    };
    TableManager.prototype._removeInternal = function (table) {
        var self = this;
        var index = $_inArray(table, self._tableList);
        if (index > -1) {
            var sheet = self._sheet;
            if (sheet) {
                sheet._modelManager._backupTableList([table]);
            }
            self._tableList.splice(index, 1);
            self._onTableRemoved([table], false);
            return table;
        }
        return keyword_null;
    };
   
    
    TableManager.prototype.remove = function (table, options) {
        var self = this;
        if (_isStringType(table)) {
            table = self.findByName(table);
        }
        if (table) {
            options = options || 0 ;
            table._resetFilter();
            table = self._removeInternal(table);
            if (table) {
                var cr = table.range(), sheet = self._sheet;
                try {
                    suspendPaint(sheet);
                    var row1 = cr.row, row2 = cr.row + getRowCount(cr), col1 = cr.col, col2 = cr.col + getColCount(cr), r = void 0, c = void 0;
                    var showHeader = table.showHeader(), headerIndex = table.headerIndex();
                   
                    if ((options & 1 ) !== 1 ) {
                        for (r = row1; r < row2; r++) {
                            for (c = col1; c < col2; c++) {
                                setFormulaToSheet(sheet, r, c, keyword_null);
                                setValue(sheet, r, c, keyword_null);
                            }
                        }
                    }
                    else if (table._inBinding()) {
                       
                        if (showHeader) {
                            r = headerIndex;
                            for (c = col1; c < col2; c++) {
                                sheet.setValue(r, c, table.getColumnName(c - cr.col));
                            }
                        }
                       
                        var tableDataRange = table.dataRange(), startRow = tableDataRange.row, endRow = startRow + getRowCount(tableDataRange), dataItem = void 0, column = void 0, value = void 0;
                        for (r = startRow; r < endRow; r++) {
                            for (c = col1; c < col2; c++) {
                                column = table._columns[_getRelativeColIndex(table, c)];
                                if (column) {
                                    dataItem = table._getDataItem(_getRelativeRowIndex(table, r));
                                    value = dataItem[column.dataField()];
                                    if (!isNullOrUndefined(value)) {
                                        sheet.setValue(r, c, value);
                                    }
                                }
                            }
                        }
                    }
                    else if (showHeader) {
                        r = headerIndex;
                        for (c = col1; c < col2; c++) {
                            sheet.setValue(r, c, table.getColumnName(c - cr.col));
                        }
                    }
                   
                    if ((options & 2 ) === 2 ) {
                        for (r = row1; r < row2; r++) {
                            for (c = col1; c < col2; c++) {
                                var style = sheet.getStyle(r, c) || new Core_1.Style();
                                table._compose(r, c, style);
                                sheet.setStyle(r, c, style);
                            }
                        }
                    }
                }
                finally {
                    resumePaint(sheet);
                }
                table._noticeChartUpdateTableRange(2 );
            }
        }
        return table;
    };
   
    
    TableManager.prototype.move = function (table, row, column) {
        var self = this, sheet = self._sheet;
        if (_isStringType(table)) {
            table = self.findByName(table);
        }
        if (table && row >= 0 && column >= 0) {
            var cr = table.range();
            var tables = self._findByRange(row, column, getRowCount(cr), getColCount(cr)), tablesLength = tables.length;
           
            if (tablesLength === 0 || (tablesLength === 1 && tables[0] === table)) {
                suspendPaint(sheet);
                try {
                    table._moveTo(row, column);
                }
                finally {
                    resumePaint(sheet);
                }
            }
        }
    };
   
    
    TableManager.prototype.resize = function (table, range) {
        var self = this, sheet = self._sheet;
        if (_isStringType(table)) {
            table = self.findByName(table);
        }
        if (table) {
            var cr = table.range(), dataRange = table.dataRange(), args = arguments;
            var newRange = range;
            if (args.length === 3) {
                newRange = Core_1._createRange(cr.row, cr.col, args[1], args[2]);
            }
            if (newRange) {
                var rowCount = getRowCount(newRange), colCount = getColCount(newRange);
                if (rowCount >= 0 && colCount >= 0) {
                    var tables = self._findByRange(newRange.row, newRange.col, rowCount, colCount);
                   
                    if (tables.length <= 1) {
                        _suspendAll(sheet);
                        try {
                            table._resize(newRange);
                           
                            if (!table._inBinding()) {
                                var conditionalFormats = sheet.conditionalFormats, validations = sheet._validations, deltaRowCount = newRange.rowCount - cr.rowCount;
                                conditionalFormats && conditionalFormats._updateRangesByTable(cr, dataRange, deltaRowCount);
                                validations && validations._updateRangesByTable(cr, dataRange, deltaRowCount);
                            }
                        }
                        finally {
                            _resumeAll(sheet);
                        }
                    }
                }
            }
        }
    };
   
    
    TableManager.prototype.all = function () {
        var result = [];
        $_each(this._tableList, function (i, v) {
            result.push(v);
        });
        return result;
    };
    TableManager.prototype._clearPendingChanges = function (tables) {
        var tableList = tables || this._tableList, count = tableList.length;
        for (var i = 0; i < count; i++) {
            tableList[i].clearPendingChanges();
        }
    };
    TableManager.prototype._getWholeTablesInRange = function (row, col, rowCount, colCount) {
        var resultTableList = [], tables = this._tableList, count = tables.length;
        for (var i = 0; i < count; i++) {
            var table = tables[i];
            if (table._row >= row && table._col >= col
                && (table._row + table._rowCount) <= (row + rowCount)
                && (table._col + table._colCount) <= (col + colCount)) {
                resultTableList.push(table);
            }
        }
        return resultTableList;
    };
    TableManager.prototype._getIntersectTablesInRange = function (row, col, rowCount, colCount) {
        var self = this;
        var allContainedTableList = self._findByRange(row, col, rowCount, colCount);
        var wholeTableList = self._getWholeTablesInRange(row, col, rowCount, colCount);
        var intersectTableList = [];
        if (wholeTableList.length > 0) {
            allContainedTableList.forEach(function (table) {
                if (wholeTableList.indexOf(table) === -1) {
                    intersectTableList.push(table);
                }
            });
        }
        else {
            intersectTableList = allContainedTableList;
        }
        return intersectTableList;
    };
    TableManager.prototype._isCellInTableList = function (tableList, row, column) {
        var count = tableList.length, t;
        for (var i = 0; i < count; i++) {
            t = tableList[i];
            var cr = t.range();
            if ((cr.row <= row && row < cr.row + getRowCount(cr)) && (column < 0 || (cr.col <= column && column < cr.col + getColCount(cr)))) {
                return true;
            }
        }
        return false;
    };
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    TableManager.prototype._checkCanAddTable = function (sheet, name, row, col, rowCount, colCount, throwException) {
       
        if (!name) {
            if (throwException) {
                throwError(getSR().Exp_TableEmptyNameError);
            }
            return false;
        }
        if (!isValidTableName(name)) {
            if (throwException) {
                throwError(getSR().Exp_TableNameInvalid);
            }
            return false;
        }
       
        if (row < 0 || rowCount < 1 || row + rowCount > sheet.getRowCount()) {
            if (throwException) {
                throwError(getSR().Exp_TableInvalidRow);
            }
            return false;
        }
        if (col < 0 || colCount < 1 || col + colCount > sheet.getColumnCount()) {
            if (throwException) {
                throwError(getSR().Exp_TableInvalidColumn);
            }
            return false;
        }
       
        var tableManager = sheet.tables;
        if (tableManager._has(row, col, rowCount, colCount)) {
            if (throwException) {
                throwError(getSR().Exp_TableIntersectError);
            }
            return false;
        }
        if (tableManager.findByName(name)) {
            if (throwException) {
                throwError(getSR().Exp_TableHasSameNameError);
            }
            return false;
        }
        var arrarFormulas = CalcEngine && sheet._getsArrayFormulas(row, col, rowCount, colCount);
        var arrarFormulasRanges = arrarFormulas && arrarFormulas.ranges, returnValue = true;
        if (arrarFormulasRanges) {
            $_each(arrarFormulas, function (i, baseRange) {
                if (getRowCount(baseRange) > 1 || getColCount(baseRange) > 1) {
                    if (throwException) {
                        throwError(getSR().Exp_ArrayFormulaTable);
                    }
                    returnValue = false;
                    return false;
                }
            });
        }
        return returnValue;
    };
    TableManager.prototype._completelyContainstables = function (row, col, rowCount, colCount) {
        var tableNames = [], tables = this._tableList;
        for (var i = 0; i < tables.length; i++) {
            var table = tables[i];
            if (table._row >= row &&
                table._col >= col &&
                (table._row + table._rowCount) <= (row + rowCount) &&
                (table._col + table._colCount) <= (col + colCount)) {
                tableNames.push(table.name());
            }
        }
        return tableNames;
    };
    TableManager.prototype._hasPartTable = function (row, column, rowCount, columnCount) {
        var tables = this.all();
        if (tables) {
            var range = Core_1._createRange(row, column, rowCount, columnCount);
            var count = tables.length, cr = void 0;
            for (var i = 0; i < count; i++) {
                cr = tables[i].range();
                if (range.intersect(cr.row, cr.col, getRowCount(cr), getColCount(cr)) && !range.containsRange(cr)) {
                    return true;
                }
            }
        }
        return false;
    };
    TableManager.prototype._has = function (row, col, rowCount, colCount) {
        var tableList = this._tableList, count = tableList.length, t;
        for (var i = 0; i < count; i++) {
            t = tableList[i];
            if (t.range().intersect(row, col, rowCount, colCount)) {
                return true;
            }
        }
        return false;
    };
   
    TableManager.prototype._getTable = function (sheet, row, col, rowCount, colCount) {
        var tableList = sheet.tables.all(), count = tableList.length, t;
        var resultTables = [];
        for (var i = 0; i < count; i++) {
            t = tableList[i];
            var range = t.range();
            if (range.row >= row && range.col >= col && range.row + range.rowCount <= row + rowCount && range.colCount + range.col <= col + colCount) {
                resultTables.push({
                    table: t,
                    index: i
                });
            }
        }
        return resultTables;
    };
    TableManager.prototype._isTableIntersect = function (fromSheet, fromRange, toSheet, toRange, isCuttingOrIsDragMove) {
        var tableList = toSheet.tables.all(), count = tableList.length, t;
        if (!isNullOrUndefined(fromRange)) {
            var rowValue = toRange.row - fromRange.row;
            var colValue = toRange.col - fromRange.col;
            var resultTables = this._getTable(fromSheet, fromRange.row, fromRange.col, fromRange.rowCount, fromRange.colCount);
            if (resultTables.length !== 0) {
                for (var i = 0; i < count; i++) {
                    t = tableList[i];
                    for (var n = 0; n < resultTables.length; n++) {
                        var resultTable = resultTables[n];
                        
                        if (!isCuttingOrIsDragMove || i !== resultTable.index) {
                            var resultTableRange = resultTable.table.range();
                            if (t.range().intersect(resultTableRange.row + rowValue, resultTableRange.col + colValue, resultTableRange.rowCount, resultTableRange.colCount)) {
                                toSheet._raiseInvalidOperation(6 , getSR().Exp_TableIntersectError);
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    TableManager.prototype._onRowsAdded2 = function (row, count) {
        var self = this, tables = self._tableList;
        for (var i = 0, tablesCount = tables.length; i < tablesCount; i++) {
            tables[i]._onRowsAdded2(row, count);
        }
        self._sheet.filterRowsVisibleInfo._addRows(row, count);
    };
    TableManager.prototype._onRowsAdded = function (row, count) {
        var self = this, tables = self._tableList;
        var handledDataSources = [];
        for (var i = 0, tablesCount = tables.length; i < tablesCount; i++) {
            var t = tables[i], dataSource = t._getDataSource();
            if (_ArrayHelper_contains(handledDataSources, dataSource)) {
                t._onRowsAdded(row, count, true);
            }
            else {
                var dataSourceChanged = t._onRowsAdded(row, count);
                if (dataSourceChanged) {
                    handledDataSources.push(dataSource);
                }
            }
        }
        var sheet = self._sheet;
        try {
            suspendPaint(sheet);
            var sourceRowCount = void 0, dataRange = void 0;
            for (var i = 0, tablesCount = tables.length; i < tablesCount; i++) {
                var t = tables[i];
                sourceRowCount = t._getDataSourceRowCount();
                dataRange = t.dataRange();
                if (sourceRowCount > 0 && sourceRowCount !== getRowCount(dataRange)) {
                    var newRowCount = sourceRowCount;
                    if (t.showHeader()) {
                        newRowCount += 1;
                    }
                    if (t.showFooter()) {
                        newRowCount += 1;
                    }
                    var oldRange = t.range();
                    var newRange = Core_1._createRange(oldRange.row, oldRange.col, newRowCount, getColCount(dataRange));
                    t._resize(newRange);
                }
            }
        }
        finally {
            resumePaint(sheet);
        }
    };
    TableManager.prototype._onColumnsAdded = function (col, count) {
        var tableList = this._tableList, length = tableList.length, t;
        for (var i = 0; i < length; i++) {
            t = tableList[i];
            t._onColumnsAdded(col, count);
        }
    };
    TableManager.prototype._onColumnsChanged = function (col) {
        var tableList = this._tableList, length = tableList.length, t, startCol, endCol;
        for (var i = 0; i < length; i++) {
            t = tableList[i];
            startCol = t._col;
            endCol = t.endColumn();
            if (startCol <= col && endCol >= col) {
                t._onColumnsChanged();
            }
        }
    };
    TableManager.prototype._onRowsRemoved = function (row, count) {
        var self = this, tables = self._tableList;
        var handledDataSources = [];
        var remainedList = [], removedList = [];
        for (var i = 0, tablesCount = tables.length; i < tablesCount; i++) {
            var t = tables[i], dataSource = t._getDataSource();
            var cr = t.range(), contains = (row <= cr.row && cr.row + getRowCount(cr) <= row + count);
            if (!contains) {
                if (_ArrayHelper_contains(handledDataSources, dataSource)) {
                    t._onRowsRemoved(row, count, true);
                }
                else {
                    if (t._inBinding()) {
                        t._setDeletedRows(row, count, _getRowsChangeKey(true ));
                    }
                    var dataSourceChanged = t._onRowsRemoved(row, count);
                    if (dataSourceChanged) {
                        handledDataSources.push(dataSource);
                    }
                }
                remainedList.push(t);
            }
            else {
                removedList.push(t);
            }
        }
        self._sheet.filterRowsVisibleInfo._removeRows(row, count);
        self._sheet._modelManager._backupTableList(removedList);
        self._tableList = remainedList;
       
        self._onTableRemoved(removedList, true);
       
        var sheet = self._sheet;
        try {
            suspendPaint(sheet);
            tables = self._tableList;
            var sourceRowCount = void 0, dataRange = void 0;
            for (var i = 0, tablesCount = tables.length; i < tablesCount; i++) {
                var t = tables[i];
                sourceRowCount = t._getDataSourceRowCount();
                dataRange = t.dataRange();
                if (sourceRowCount > 0 && sourceRowCount !== getRowCount(dataRange)) {
                    var newRowCount = sourceRowCount;
                    if (t.showHeader()) {
                        newRowCount += 1;
                    }
                    if (t.showFooter()) {
                        newRowCount += 1;
                    }
                    var oldRange = t.range();
                    var newRange = Core_1._createRange(oldRange.row, oldRange.col, newRowCount, getColCount(dataRange));
                    t._resize(newRange);
                }
            }
        }
        finally {
            resumePaint(sheet);
        }
       
    };
    TableManager.prototype._onColumnsRemoved = function (col, count) {
        var self = this, tableList = self._tableList, remainedList = [], removedList = [];
        var length = tableList.length, t;
        for (var i = 0; i < length; i++) {
            t = tableList[i];
            var cr = t.range(), contains = (col <= cr.col && cr.col + getColCount(cr) <= col + count);
            if (!contains) {
                t._onColumnsRemoved(col, count);
                remainedList.push(t);
            }
            else {
                removedList.push(t);
            }
        }
        self._sheet._modelManager._backupTableList(removedList);
        self._tableList = remainedList;
       
        self._onTableRemoved(removedList, true);
    };
    TableManager.prototype._clear = function (row, col, rowCount, colCount, type) {
        var self = this;
        var clearRange = Core_1._createRange(row, col, rowCount, colCount);
        var tableList, count, t;
        var removedList = [];
        var sheet = self._sheet;
       
        if ((type & 1 ) === 1 ) {
            var remainedList = [];
            tableList = self._tableList;
            count = tableList.length;
            for (var i = 0; i < count; i++) {
                t = tableList[i];
                // 动态表只能pannel里清除,清除内容不清除动态表
                if (t._dynamicTable || !clearRange.containsRange(t.range())) {
                    remainedList.push(t);
                }
                else {
                    removedList.push(t);
                }
            }
            count = remainedList.length;
            for (var i = 0; i < count; i++) {
                t = remainedList[i];
                t._clear(row, col, rowCount, colCount);
            }
            if (sheet) {
                sheet._modelManager._backupTableList(removedList);
            }
            self._tableList = remainedList;
        }
       
        if ((type & 2 ) === 2 ) {
            tableList = self._tableList;
            count = tableList.length;
            for (var i = 0; i < count; i++) {
                t = tableList[i];
                if (clearRange.containsRange(t.range())) {
                    if (sheet) {
                        sheet._modelManager._backupTableProperty(t, "style", t.style());
                    }
                    t.style(keyword_null);
                }
            }
        }
        self._onTableRemoved(removedList, true);
        return removedList;
    };
    TableManager.prototype._onTableRemoved = function (tables, convertToError) {
        if (!tables || tables.length === 0) {
            return;
        }
        var sheet = this._sheet;
        Core_1.GC$.each(tables, function (index, table) {
            if (table._hasSlicerData()) {
                table.getSlicerData().onTableRemoved(table);
            }
            if (table._isFooterButtonSet()) {
                if (sheet) {
                    sheet._modelManager._backupTableProperty(table, FOOTER_ROW_STYLES, table._cloneFooterRowStyles());
                }
                table._footerRowStyles = [];
            }
        });
        CalcEngine && adjustFormulaOnRemoveTables(this._sheet, tables, convertToError);
    };
    TableManager.prototype._onTableAdded = function (table) {
        if (table && table._hasSlicerData()) {
            table.getSlicerData().onTableAdded(table);
        }
    };
    TableManager.prototype._getNoConflictTableName = function (name) {
        var i = 1;
        var self = this;
        var newName = name;
        var tables = self._getAllWorkbookTables();
        while (!this._findTableNameAllWorkbook(newName, tables)) {
            newName = name + i;
            i++;
        }
        return newName;
    };
    TableManager.prototype._getAllWorkbookTables = function () {
        var tables = [];
        var workbook = this._sheet.parent;
        var sheets = workbook.sheets;
        var sheetTables;
        for (var _i = 0, sheets_1 = sheets; _i < sheets_1.length; _i++) {
            var sheet = sheets_1[_i];
            sheetTables = sheet.tables.all();
            for (var _a = 0, sheetTables_1 = sheetTables; _a < sheetTables_1.length; _a++) {
                var table = sheetTables_1[_a];
                tables.push(table);
            }
        }
        return tables;
    };
    TableManager.prototype._findTableNameAllWorkbook = function (name, tables) {
        for (var _i = 0, tables_1 = tables; _i < tables_1.length; _i++) {
            var table = tables_1[_i];
            if (table.name().toLowerCase() === name.toLowerCase()) {
                return false;
            }
        }
        return true;
    };
    TableManager.prototype._getValue = function (row, col) {
        var tm = this;
        var hasValue = false, value = keyword_null;
        var table = tm.find(row, col);
        if (table) {
            if (table.showHeader() && row === table.headerIndex()) {
                value = table._getHeaderName(col);
               
                if (!isNullOrUndefined(value)) {
                    value = util_toString(value);
                }
                hasValue = true;
            }
            else {
                value = table._getValue(row, col);
                hasValue = value._hasValue;
                value = value._value;
            }
        }
        return {
            _hasValue: hasValue,
            _value: value
        };
    };
    TableManager.prototype._setValue = function (row, col, value) {
        var tm = this, isValueSet = false, isValid = true;
        var table = tm.find(row, col);
        if (table && table._syncTableToSheet !== true) {
            if (table.showHeader() && row === table.headerIndex()) {
                if (table._hasColumnName(value)) {
                    isValid = false;
                }
                else {
                    value = isNullOrUndefined(value) ? value : util_toString(value);
                    table._setHeaderName(col, value);
                }
            }
            else if (table.showFooter() && row === table.footerIndex()) {
                table._setFooterValue(col, value);
            }
            else {
                isValueSet = table._setValue(row, col, value);
            }
        }
        return isValueSet || !isValid;
    };
    TableManager.prototype._updataFooterFormulaWhenSetSheetFormula = function (row, col, rowCount, colCount, value, expr) {
        var table = this.find(row, col);
        if (CalcEngine && table) {
            if (rowCount > 1 || colCount > 1) {
                this._sheet._raiseInvalidOperation(0 , getSR().Exp_ArrayFormulaTable);
                return false;
            }
            if (table.showHeader() && row === table.headerIndex() && value) {
                return false;
            }
            if (!table._syncTableToSheet && table.showFooter() && row === table.footerIndex()) {
                if (!isNullOrUndefined(value)) {
                    table._setFooterValue(col, keyword_null);
                }
                table._setFooterFormula(col - table._col, value, expr);
            }
        }
        return true;
    };
    TableManager.prototype._resetTablesBindingManager = function () {
        var tables = this.all();
        for (var i = 0, count = tables.length; i < count; i++) {
            var table = tables[i];
            if (table.bindingPath()) {
                table._bindingManager = keyword_null;
            }
        }
    };
    TableManager.prototype._onCopyOrMoving = function (range, isMove) {
        var savedTables = [];
        var srcTableManager = this, tables, table, i;
        if (srcTableManager) {
            tables = srcTableManager.all();
            if (tables) {
                for (i = tables.length - 1; i >= 0; i--) {
                    table = tables[i];
                    if (range.containsRange(table.range())) {
                        if (isMove) {
                            if (this._sheet) {
                                this._sheet._modelManager._backupTableList([table]);
                            }
                            srcTableManager._tableList.splice(i, 1);
                            table._clearSheetModelFormula(keyword_undefined, keyword_undefined, isMove);
                        }
                        savedTables.push(table);
                    }
                }
            }
        }
        return savedTables;
    };
    TableManager.prototype._onCopyOrMoved = function (savedTables, srcRow, srcColumn, destRow, destColumn, isMove) {
        var tableManager = this, pastedTables = [];
        for (var i = 0, length_5 = savedTables.length; i < length_5; i++) {
            var srcTable = savedTables[i], dataSource = void 0;
            var table = void 0;
            if (!isMove) {
                dataSource = srcTable.bindingPath() ? keyword_undefined : srcTable._getDataSource();
                table = new Table();
                table._setOwner(tableManager);
                table.fromJSON(JSON_PARSE(JSON_STRINGIFY(srcTable.toJSON())));
                table.name(tableManager._getNoConflictTableName(table.name()));
                pastedTables.push(table);
            }
            else {
                table = srcTable;
            }
            var destTableRange = table.range();
            table._ignoreFormula = true;
            table._moveToCore(destRow + destTableRange.row - srcRow, destColumn + destTableRange.col - srcColumn);
            tableManager._addInternal(table, isMove);
            if (isMove) {
               
                var slicerData = table._slicerData;
                if (slicerData) {
                    slicerData._sheet = tableManager._sheet;
                    slicerData.refresh();
                }
            }
            else if (dataSource) {
                table._copyDataSourceImp(dataSource);
            }
            table._ignoreFormula = false;
        }
        for (var i = 0; i < pastedTables.length; i++) {
            pastedTables[i].formulaFromJSON();
        }
    };
    TableManager.prototype._syncFormulaInTables = function (savedTables) {
        for (var i = 0, length_6 = savedTables.length; i < length_6; i++) {
            savedTables[i]._syncSheetModelFormula();
        }
    };
    TableManager.prototype.toJSON = function (newName) {
        var tables = this._tableList;
        var jsonData = [];
        if (tables) {
            for (var i = 0; i < tables.length; i++) {
                if (newName) {
                    jsonData.push(tables[i].toJSON(this._getNoConflictTableName(tables[i].name())));
                }
                else {
                    jsonData.push(tables[i].toJSON());
                }
            }
        }
        return jsonData.length === 0 ? keyword_undefined : jsonData;
    };
    TableManager.prototype.fromJSON = function (jsData, noSchema) {
        if (jsData) {
            this._tableList = [];
            this._clearCache();
            for (var i = 0, length_7 = jsData.length; i < length_7; i++) {
                var item = jsData[i];
                var table = new Table();
                table._setOwner(this);
                this._tableList.push(table);
                table.fromJSON(item, noSchema);
            }
        }
    };
   
    TableManager.prototype.containTableHeaderTotalRowForSheet = function () {
        var sheet = this._sheet;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables, selection = void 0, selectionStartRow = void 0, selectionEndRow = void 0;
            if (tables && selections) {
                var tableList = tables._tableList, table = void 0, tableRange = void 0, tableHeaderIndex = void 0, tableTotalIndex = void 0;
                for (var i = 0; i < selections.length; i++) {
                    selection = selections[i];
                    selectionStartRow = selection.row;
                    selectionEndRow = selectionStartRow + selection.rowCount - 1;
                    for (var j = 0; j < tableList.length; j++) {
                        table = tableList[j];
                        tableRange = table.range();
                        tableHeaderIndex = table.headerIndex();
                        tableTotalIndex = table.footerIndex();
                        if (!selection.containsRange(tableRange) && ((tableHeaderIndex >= selectionStartRow && tableHeaderIndex <= selectionEndRow)
                            || (tableTotalIndex >= selectionStartRow && tableTotalIndex <= selectionEndRow))) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
   
    TableManager.prototype.containTableHeaderTotalRow = function () {
        var sheet = this._sheet, result = false;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables, selectionStartRow = void 0, selectionEndRow = void 0;
            if (tables && selections) {
                if (selections.length > 1) {
                    return result;
                }
                var selection = selections[0], selectTables = _getTables(sheet, selection);
                var table = void 0, tableHeaderIndex = void 0, tableTotalIndex = void 0;
                if (selectTables && selectTables.length === 1) {
                    selectionStartRow = selection.row;
                    selectionEndRow = selectionStartRow + selection.rowCount - 1;
                    table = selectTables[0];
                    tableHeaderIndex = table.headerIndex();
                    tableTotalIndex = table.footerIndex();
                    if (((tableHeaderIndex >= selectionStartRow && tableHeaderIndex <= selectionEndRow)
                        || (tableTotalIndex >= selectionStartRow && tableTotalIndex <= selectionEndRow))) {
                        result = true;
                    }
                }
            }
        }
        return result;
    };
   
    TableManager.prototype.noRoomToInsertColumn = function () {
        var sheet = this._sheet;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables;
            if (tables && selections && selections.length === 1) {
                var selection = selections[0], selectRow = selection.row, selectCol = selection.col, selectColCount = selection.colCount;
                var table = tables.find(selectRow, selectCol);
                var sheetColCount = sheet.getColumnCount(3 );
                if (table && table.endColumn() + selectColCount >= sheetColCount) {
                    return true;
                }
            }
        }
        return false;
    };
   
    TableManager.prototype.noRoomToInsertRow = function () {
        var sheet = this._sheet;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables;
            if (tables && selections && selections.length === 1) {
                var selection = selections[0], selectRow = selection.row, selectCol = selection.col, selectRowCount = selection.rowCount;
                var table = tables.find(selectRow, selectCol);
                var sheetRowCount = sheet.getRowCount(3 );
                if (table && table.endRow() + selectRowCount >= sheetRowCount) {
                    return true;
                }
            }
        }
        return false;
    };
   
    TableManager.prototype.checkTableRow = function () {
        var sheet = this._sheet;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables;
            if (tables && selections && selections.length === 1) {
                var selection = selections[0], selectRow = selection.row, selectCol = selection.col;
                var table = tables.find(selectRow, selectCol), tableRange = table && table.range();
                if (table && tableRange && !table._showHeader && !table._showFooter && tableRange.rowCount === 1) {
                    return true;
                }
            }
        }
        return false;
    };
   
    TableManager.prototype.checkTableCol = function () {
        var sheet = this._sheet;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables;
            if (tables && selections && selections.length === 1) {
                var selection = selections[0], selectRow = selection.row, selectCol = selection.col;
                var table = tables.find(selectRow, selectCol), tableRange = table && table.range();
                if (tableRange && tableRange.colCount === 1) {
                    return true;
                }
            }
        }
        return false;
    };
   
    TableManager.prototype.isAcrossTables = function () {
        var sheet = this._sheet, result = false;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables;
            if (tables && selections) {
                if (selections.length > 1) {
                    return result;
                }
                var selection = selections[0], selectTables = _getTables(sheet, selection);
                if (selectTables) {
                    result = selectTables.length > 1;
                }
            }
        }
        return result;
    };
   
    TableManager.prototype.isWholeTableCol = function () {
        var sheet = this._sheet, result = false;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables;
            if (tables && selections) {
                if (selections.length > 1) {
                    result = true;
                }
                else {
                    var selection = selections[0], selectTables = _getTables(sheet, selection);
                    if (selectTables.length === 1) {
                        var currentTable = selectTables[0], tableCol = currentTable._col, tableColCount = currentTable._colCount;
                        var col = selection.col, colCount = selection.colCount;
                        result = (tableCol === col && tableColCount === colCount);
                    }
                }
            }
        }
        return result;
    };
   
    TableManager.prototype.containTableHeader = function () {
        var sheet = this._sheet, result = false;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables, selectionStartRow = void 0, selectionEndRow = void 0;
            if (tables && selections) {
                if (selections.length > 1) {
                    return result;
                }
                var selection = selections[0], selectTables = _getTables(sheet, selection);
                if (selectTables && selectTables.length === 1) {
                    var table = selectTables[0], tableHeaderIndex = table.headerIndex();
                    selectionStartRow = selection.row;
                    selectionEndRow = selectionStartRow + selection.rowCount - 1;
                    if (selectionStartRow <= tableHeaderIndex && selectionEndRow >= tableHeaderIndex) {
                        result = true;
                    }
                }
            }
        }
        return result;
    };
    TableManager.prototype._selectTablePart = function () {
        var sheet = this._sheet, result = false;
        if (sheet) {
            var selections = sheet.getSelections(), tables = sheet.tables;
            if (tables && selections) {
                var activeRow = sheet.getActiveRowIndex(), activeCol = sheet.getActiveColumnIndex();
                if (selections.length > 1 || !tables.find(activeRow, activeCol)) {
                    return result;
                }
                var tableList = tables._tableList, selection = selections[0], table = void 0;
                for (var j = 0; j < tableList.length; j++) {
                    table = tableList[j];
                    if (selection && selection.intersect(table._row, table._col, table._rowCount, table._colCount)) {
                        result = true;
                    }
                }
            }
        }
        return result;
    };
    TableManager.prototype._getLastTableDirtyRow = function (range) {
        var result = -1;
        var self = this, tables = self._tableList;
        if (tables) {
            var length_8 = tables.length, tableRange = void 0, row = void 0, rowCount = void 0, endRow = void 0;
            for (var i = 0; i < length_8; i++) {
                tableRange = tables[i].range();
                if (!range || tableRange.intersect(range.row, range.col, range.rowCount, range.colCount)) {
                    row = tableRange.row;
                    rowCount = tableRange.rowCount;
                    endRow = row + rowCount - 1;
                    if (result < endRow) {
                        result = endRow;
                    }
                }
            }
        }
        return result;
    };
    TableManager.prototype._getLastTableDirtyCol = function (range) {
        var result = -1;
        var self = this, tables = self._tableList;
        if (tables) {
            var length_9 = tables.length, tableRange = void 0, col = void 0, colCount = void 0, endCol = void 0;
            for (var i = 0; i < length_9; i++) {
                tableRange = tables[i].range();
                if (!range || tableRange.intersect(range.row, range.col, range.rowCount, range.colCount)) {
                    col = tableRange.col;
                    colCount = tableRange.colCount;
                    endCol = col + colCount - 1;
                    if (result < endCol) {
                        result = endCol;
                    }
                }
            }
        }
        return result;
    };
    TableManager.prototype._changeValueBesideTable = function (editedRange, fromRange, value, noNeedMoveToWhenBind, originalTableRangesBeforeExpand) {
        var self = this;
        if (self._sheet.options.isProtected) {
            return;
        }
        var tables = self.all();
        if (tables.length === 0) {
            return;
        }
        var table, tableRange;
        for (var _i = 0, tables_2 = tables; _i < tables_2.length; _i++) {
            table = tables_2[_i];
            if (table._allowAutoExpand) {
                tableRange = table.range();
               
               
                var isEqualTableRange = fromRange && fromRange.equals(tableRange);
                var isHaveSpan = fromRange && self._sheet._modelManager.getSpans(fromRange, 3).length !== 0;
               
                if (!fromRange || (!isEqualTableRange && !isHaveSpan)) {
                    table._noNeedMoveToWhenBind = noNeedMoveToWhenBind;
                    self._expandTableByCondition(table, tableRange, editedRange, value, originalTableRangesBeforeExpand);
                    delete table._noNeedMoveToWhenBind;
                }
            }
        }
    };
    TableManager.prototype._expandTableByCondition = function (table, tableRange, editedRange, value, originalTableRangesBeforeExpand) {
        var self = this, sheet = self._sheet;
        var addRange = null;
        var isShowFooter = false;
        var tableRangeRow = tableRange.row, tableRangeCol = tableRange.col, tableRangeRowCount = tableRange.rowCount, tableRangeColCount = tableRange.colCount;
        var oldTableRangeEndRow = tableRangeRow + tableRangeRowCount - 1;
        var tempTableRange = new Core_1.Range(tableRangeRow, tableRangeCol, tableRangeRowCount, tableRangeColCount);
        if (table.showFooter()) {
            var footerRange = new Core_1.Range(tableRangeRow + tableRangeRowCount - 1, tableRangeCol, 1, tableRangeColCount);
            if (editedRange.row === footerRange.row && editedRange.col >= tableRangeCol && editedRange.col + editedRange.colCount <= tableRangeCol + tableRangeColCount) {
                return;
            }
            isShowFooter = true;
            tempTableRange.rowCount--;
        }
        if (originalTableRangesBeforeExpand) {
            var originalRowCount = table.showHeader() ? tableRangeRowCount - 1 : tableRangeRowCount;
            originalTableRangesBeforeExpand.push(new Core_1.Range(tableRangeRow, tableRangeCol, originalRowCount, tableRangeColCount));
        }
        var editedRangeStartRow = editedRange.row, editedRangeStartCol = editedRange.col, editedRangeEndRow = editedRange.row + editedRange.rowCount - 1, editedRangeEndCol = editedRange.col + editedRange.colCount - 1, tableRangeEndRow = tableRangeRow + tableRangeRowCount - 1, tableRangeEndCol = tableRangeCol + tableRangeColCount - 1;
        var belowTableHasValueRow = keyword_undefined;
        var sheetEndRow = sheet.getRowCount();
        var isBelowTable = tempTableRange.contains(editedRangeStartRow - 1, editedRangeStartCol) && !tempTableRange.contains(editedRangeStartRow, editedRangeStartCol);
        if (!isShowFooter) {
            isBelowTable = isBelowTable && editedRangeEndCol <= tableRangeEndCol && editedRangeStartCol >= tableRangeCol;
        }
        var isRightToTable = tempTableRange.contains(editedRangeStartRow, editedRangeStartCol - 1) && !tempTableRange.contains(editedRangeStartRow, editedRangeStartCol) && editedRangeEndRow <= oldTableRangeEndRow && editedRangeStartRow >= tableRange.row;
        var isInstractToTable = tempTableRange.contains(editedRangeStartRow, editedRangeStartCol) && !tempTableRange.contains(editedRangeEndRow, editedRangeEndCol);
        if (isInstractToTable) {
            var rowCount = Math_max(tableRangeEndRow, editedRangeEndRow) - tableRangeRow + 1;
            var colCount = Math_max(tableRangeEndCol, editedRangeEndCol) - tableRangeCol + 1;
            if (editedRangeEndCol > tableRangeEndCol) {
                var rightTableHasValueColumn = _getFirstNonNullCellInRange(sheet, new Core_1.Range(tableRangeRow, tableRangeEndCol + 1, tableRangeRowCount, editedRangeEndCol - tableRangeEndCol));
                if (rightTableHasValueColumn && editedRangeEndCol > rightTableHasValueColumn.col) {
                    colCount = tableRangeColCount;
                }
            }
            addRange = new Core_1.Range(tableRangeRow, tableRangeCol, rowCount, colCount);
            if (isShowFooter) {
                addRange.rowCount++;
                editedRangeEndRow++;
            }
           
            if (editedRangeEndRow > tableRangeEndRow) {
                belowTableHasValueRow = _getFirstNonNullCellInRange(sheet, new Core_1.Range(tableRangeEndRow + 1, tableRangeCol, addRange.row + addRange.rowCount - 1, tableRangeColCount));
            }
            if (belowTableHasValueRow) {
               
                var moveRowCount = editedRangeEndRow - belowTableHasValueRow.row + 1;
                if (moveRowCount > 0) {
                    if (_getFirstNonNullCellInRange(sheet, new Core_1.Range(sheetEndRow - Math.abs(moveRowCount), tableRangeCol, Math.abs(moveRowCount), tableRangeColCount))) {
                        sheet._raiseInvalidOperation(6 , getSR().Exp_TableAddRowNoEnoughRoom);
                        return;
                    }
                    sheet.moveTo(belowTableHasValueRow.row, tableRangeCol, addRange.row + addRange.rowCount, tableRangeCol, sheetEndRow - addRange.row - addRange.rowCount, tableRangeColCount, 2047 );
                }
            }
        }
        else if (isBelowTable && !isShowFooter) {
            addRange = new Core_1.Range(editedRangeStartRow, tableRangeCol, editedRange.rowCount, tableRangeColCount);
            var cellRange = _getFirstNonNullCellInRange(sheet, addRange, editedRange);
            if (cellRange && !editedRange.containsRange(cellRange)) {
                return;
            }
        }
        else if (isRightToTable) {
            addRange = new Core_1.Range(tableRangeRow, editedRangeStartCol, tableRange.rowCount, editedRange.colCount);
            var cellRange = _getFirstNonNullCellInRange(sheet, addRange, editedRange);
            if (cellRange && !editedRange.containsRange(cellRange)) {
                return;
            }
        }
        if (isBelowTable && !isShowFooter && _isFormula(value)) {
            table.useFooterDropDownList(true);
            _executeTableShowFooter(sheet, table);
        }
        if (addRange) {
            if (tableRange.containsRange(addRange)) {
                return;
            }
            var _resizeToRange = tableRange.union(addRange);
           
           
           
           
           
           
            self._executeTableRisize(table, tableRange, _resizeToRange);
        }
    };
    TableManager.prototype._executeTableRisize = function (_table, tableRange, _resizeToRange) {
        var sheet = this._sheet, parent = sheet.getParent();
        parent && parent.commandManager().execute({
            cmd: TABLE_RESIZE,
            sheetName: sheet.name(),
            tableName: _table.name(),
            resizeToRange: _resizeToRange
        });
    };
    TableManager.prototype._getTableSelectionInfo = function (x, y, target) {
        var self = this, sheet = this._sheet;
        var hoverCol = target.col;
        var hoverRow = target.row;
       
        var tableBorderSelectPx = 2;
       
        var tableRowSelectPx = 18;
       
        var filterButtonWidth = 18;
       
        var resizeHoverWidth = 5;
       
        var lastCellResizingRange = 10;
       
        var tableColumnSelectPx = 6;
       
       
        var tableSelect = TableSelectionType.TABLE_SELECT;
       
        var tableCornerSelect = TableSelectionType.TABLE_CORNER_SELECT;
       
        var tableColSelect = TableSelectionType.TABLE_COL_SELECT;
       
        var tableRowSelect = TableSelectionType.TABLE_ROW_SELECT;
       
        var activeRow = sheet.getActiveRowIndex();
        var activeCol = sheet.getActiveColumnIndex();
        if (target.rowViewportIndex === -1) {
            var cellPosit = sheet.getCellRect(hoverRow, hoverCol, target.rowViewportIndex, target.colViewportIndex);
            var table = self.find(activeRow, activeCol);
            if (table instanceof Table) {
                if (table.showHeader() && activeRow >= table._row && activeRow < table._row + table._rowCount
                    && activeCol >= table._col && activeCol < table._col + table._colCount
                    && table._row < sheet._scrollTopRow && table._row + table._rowCount > sheet._scrollTopRow
                    && target.col < table._col + table._colCount && target.col >= table._col) {
                    if (x > cellPosit.x + resizeHoverWidth && x < (cellPosit.x + cellPosit.width) - filterButtonWidth
                        && y < cellPosit.height - resizeHoverWidth) {
                        var activeranges = sheet.getSelections();
                        for (var i = 0; i < activeranges.length; i++) {
                            var activeRange = activeranges[i];
                            if (!(activeRange.col === target.col && activeRange.colCount === 1 && activeRange.row === table._row && activeRange.rowCount === table._rowCount ||
                                activeRange.col === target.col && activeRange.colCount === 1 && activeRange.row === -1 && activeRange.rowCount === sheet.getRowCount())) {
                                return _createTableSelectInfo(table, tableColSelect);
                            }
                        }
                    }
                    else if (x > (cellPosit.x + filterButtonWidth)) {
                        return _createTableSelectInfo(table, "default");
                    }
                }
            }
        }
        var cellPosition = sheet.getCellRect(hoverRow, hoverCol);
        if (self.find(hoverRow, hoverCol) instanceof Table && target.colViewportIndex !== -1 && target.rowViewportIndex !== -1) {
            var activeSelectinTable = false;
            var table = self.find(hoverRow, hoverCol);
            var activeTable = self.find(activeRow, activeCol);
            var activeranges = sheet.getSelections();
            var dragMoveNotSelect = true;
            if (activeranges.length === 1) {
                var range = activeranges[0];
                if (range.row <= hoverRow && (range.row + range.rowCount > hoverRow) && range.col <= hoverCol && (range.col + range.colCount > hoverCol)) {
                    dragMoveNotSelect = false;
                }
            }
           
            if (table === activeTable) {
                activeSelectinTable = true;
            }
           
            if (hoverCol === table._col && hoverRow === table._row) {
                if (dragMoveNotSelect && activeSelectinTable && ((x <= cellPosition.x + tableBorderSelectPx) || (y <= cellPosition.y + tableBorderSelectPx))) {
                    return _createTableSelectInfo(table, tableSelect);
                }
                if ((x > cellPosition.x + tableBorderSelectPx && x < cellPosition.x + tableRowSelectPx && y > cellPosition.y + tableBorderSelectPx && y < cellPosition.y + tableColumnSelectPx)) {
                    return _createTableSelectInfo(table, tableCornerSelect);
                }
                if ((x > cellPosition.x + tableRowSelectPx && y > cellPosition.y + tableBorderSelectPx && y < cellPosition.y + tableColumnSelectPx)) {
                    return _createTableSelectInfo(table, tableColSelect);
                }
                if ((x > cellPosition.x + tableBorderSelectPx && x < cellPosition.x + tableRowSelectPx && y > cellPosition.y + tableColumnSelectPx)) {
                    return _createTableSelectInfo(table, tableRowSelect);
                }
            }
           
            if (hoverCol === table._col + table._colCount - 1 && hoverRow === table._row) {
                if (dragMoveNotSelect && activeSelectinTable && ((x >= (cellPosition.x + sheet.getColumnWidth(hoverCol) - 2)) || (y <= cellPosition.y + tableBorderSelectPx))) {
                    return _createTableSelectInfo(table, tableSelect);
                }
                if (((x < (cellPosition.x + sheet.getColumnWidth(hoverCol) - 2)) && (y > cellPosition.y + tableBorderSelectPx && y < cellPosition.y + tableColumnSelectPx))) {
                    return _createTableSelectInfo(table, tableColSelect);
                }
            }
           
            if (hoverCol === table._col && hoverRow === table._row + table._rowCount - 1) {
                if (dragMoveNotSelect && activeSelectinTable && ((x <= cellPosition.x + tableBorderSelectPx) || (y >= cellPosition.y + sheet.getRowHeight(hoverRow) - tableBorderSelectPx))) {
                    return _createTableSelectInfo(table, tableSelect);
                }
                if ((x > cellPosition.x + tableBorderSelectPx && x < cellPosition.x + tableRowSelectPx && y < cellPosition.y + sheet.getRowHeight(hoverRow) - tableBorderSelectPx)) {
                    return _createTableSelectInfo(table, tableRowSelect);
                }
            }
           
            if (dragMoveNotSelect && activeSelectinTable && (hoverCol > table._col && hoverCol < table._col + table._colCount && hoverRow === table._row && y <= cellPosition.y + tableBorderSelectPx)) {
                return _createTableSelectInfo(table, tableSelect);
            }
            if ((hoverCol > table._col && hoverCol < table._col + table._colCount && hoverRow === table._row && y > cellPosition.y + tableBorderSelectPx && y < cellPosition.y + tableColumnSelectPx)) {
                return _createTableSelectInfo(table, tableColSelect);
            }
            if (dragMoveNotSelect && activeSelectinTable && (hoverRow > table._row && hoverRow < table._row + table._rowCount && hoverCol === table._col && x <= cellPosition.x + tableBorderSelectPx)) {
                return _createTableSelectInfo(table, tableSelect);
            }
            if ((hoverRow > table._row && hoverRow < table._row + table._rowCount && hoverCol === table._col && x > cellPosition.x + tableBorderSelectPx && x < cellPosition.x + tableRowSelectPx)) {
                return _createTableSelectInfo(table, tableRowSelect);
            }
            var lastDataCellWidth = sheet.getColumnWidth(table._col + table._colCount - 1);
            var lastDataCellHeight = sheet.getRowHeight(table._row + table._rowCount - 1);
            var lastDataCellRightDownPositionX = cellPosition.x + lastDataCellWidth;
            var lastDataCellRightDownPositionY = cellPosition.y + lastDataCellHeight;
            if (activeSelectinTable && ((hoverRow > table._row && hoverRow < table._row + table._rowCount && hoverCol === table._col + table._colCount - 1 && (x >= lastDataCellRightDownPositionX - tableBorderSelectPx) && (x <= lastDataCellRightDownPositionX)) ||
                (hoverCol > table._col && hoverCol < table._col + table._colCount && hoverRow === table._row + table._rowCount - 1 && (y >= lastDataCellRightDownPositionY - tableBorderSelectPx)) && (y <= lastDataCellRightDownPositionY))) {
               
                if (hoverCol === table._col + table._colCount - 1 && hoverRow === table._row + table._rowCount - 1 && (y >= lastDataCellRightDownPositionY - lastCellResizingRange) && (x >= lastDataCellRightDownPositionX - lastCellResizingRange)) {
                    return keyword_null;
                }
                else if (dragMoveNotSelect) {
                    return _createTableSelectInfo(table, tableSelect);
                }
            }
        }
        return keyword_null;
    };
    TableManager.prototype._getTableMoveLeftCell = function (row, col) {
        var self = this, sheet = self._sheet;
        if (self.find(row, col) instanceof Table) {
            var table = self.find(row, col);
            var footer = 0;
            if (table._showFooter) {
                footer = 1;
            }
            var header = 0;
            if (table._showHeader) {
                header = 1;
            }
            while (row > 0 && sheet.getRowHeight(row - 1) === 0) {
                row--;
            }
            if (header === 1 && col === table._col && row === table._row) {
                var lastTableDataRow = _getLastVisibleRow(sheet, table, true );
                return _createLeftRightCell(lastTableDataRow, table._col + table._colCount - 1, lastTableDataRow);
            }
           
            if (col === table._col && row === table._row) {
                var lastTableDataRow = _getLastVisibleRow(sheet, table, true );
                return _createLeftRightCell(lastTableDataRow, table._col + table._colCount - 1, lastTableDataRow);
            }
           
            if (row > table._row && row < table._row + table._rowCount - footer && col === table._col) {
                if (row === table._row + header) {
                    row = _getLastVisibleRow(sheet, table, true );
                    return _createLeftRightCell(row, table._col + table._colCount - 1, row);
                }
                else {
                    return _createLeftRightCell(row - 1, table._col + table._colCount - 1, row - 1);
                }
            }
        }
        return null;
    };
    TableManager.prototype._getTableMoveRightCell = function (row, col) {
        var self = this, sheet = self._sheet;
        if (self.find(row, col) instanceof Table) {
            var table = self.find(row, col);
            var footer = 0;
            if (table._showFooter) {
                footer = 1;
            }
            var header = 0;
            if (table._showHeader) {
                header = 1;
            }
            var sheetRowsCount = sheet.getRowCount() - 1;
           
            while (row + 1 < sheet.getRowCount() && sheet.getRowHeight(row + 1) === 0) {
                row++;
            }
            if ((sheetRowsCount !== row) && col === table._col + table._colCount - 1 && (row < table._row + table._rowCount - footer)) {
               
                var startRow = table._row + table._rowCount, startCol = table._col, colCount = table._colCount, endCol = startCol + colCount - 1;
                var nextCell = _createLeftRightCell(row + 1, table._col, row + 1);
                if (row === startRow - footer - 1) {
                    if (table._allowAutoExpand) {
                        var lastNonNullRow = _getLastNonNullRowBelowTable(sheet, table);
                        if (footer !== 1 || !_checkInvalidOperation(sheet, table, startRow, lastNonNullRow, startCol, endCol, 1, true, false, true )) {
                            var firstNonNulRange = _getFirstNonNullCellInRange(sheet, new Core_1.Range(startRow, startCol, lastNonNullRow - startRow + 1, endCol - startCol + 1)), fistNonNulRow = firstNonNulRange && firstNonNulRange.row;
                            var needMove = fistNonNulRow === startRow;
                            if (startRow !== sheet.getRowCount()) {
                                if (!needMove) {
                                    _executeDoInsertRow(sheet, table, row, 1, true );
                                   
                                }
                                else {
                                    _executeTableAddRow(sheet, table, row, 1, true );
                                }
                            }
                        }
                    }
                    else {
                        nextCell = _createLeftRightCell(row, endCol + 1, row);
                    }
                }
                return nextCell;
            }
           
            if ((sheet.getRowCount() - 1 === row) && col === table._col + table._colCount - 1 && (footer === 0)) {
                var firstDataCell = table._row + header;
                while (firstDataCell + 1 < sheet.getRowCount() && sheet.getRowHeight(firstDataCell) === 0) {
                    firstDataCell++;
                }
                if (firstDataCell + 1 === sheet.getRowCount() && sheet.getRowHeight(firstDataCell) === 0) {
                    return _createLeftRightCell(table._row, table._col, table._row);
                }
                else {
                    return _createLeftRightCell(firstDataCell, table._col, firstDataCell);
                }
            }
        }
        return null;
    };
    TableManager.prototype._setExpression = function () {
        var self = this, tableList = self._tableList, length = tableList.length, table;
        for (var i = 0; i < length; i++) {
            table = tableList[i];
            table._syncSheetByFooter();
        }
    };
    TableManager.prototype._noticeChartUpdateTableRange = function (isRowChanged, index) {
        var self = this;
        var tableList = self._tableList, length = tableList.length;
        for (var i = 0; i < length; i++) {
            var table = tableList[i];
            if (isRowChanged) {
                var startRow = table._row, endRow = table._row + table._rowCount - 1;
                if (startRow <= index && index <= endRow) {
                    table._noticeChartUpdateTableRange(0 );
                }
            }
            else {
                var startCol = table._col, endCol = table._col + table._colCount - 1;
                if (startCol <= index && index <= endCol) {
                    table._noticeChartUpdateTableRange(0 );
                }
            }
        }
    };
    TableManager.prototype._getTableListRanges = function (row, col, rowCount, colCount, isRow) {
        var tableList = this._findByRange(row, col, rowCount, colCount);
        var affectRanges = [];
        for (var i = 0, len = tableList.length; i < len; i++) {
            var dataRange = tableList[i].dataRange();
            if (isRow) {
                dataRange.rowCount += rowCount;
            }
            else {
                dataRange.colCount += colCount;
            }
            affectRanges.push(dataRange);
        }
        return affectRanges;
    };
    return TableManager;
}());
exports.TableManager = TableManager;




var TableRemoveOptions;
(function (TableRemoveOptions) {
    
    TableRemoveOptions[TableRemoveOptions["none"] = 0] = "none";
    
    TableRemoveOptions[TableRemoveOptions["keepData"] = 1] = "keepData";
    
    TableRemoveOptions[TableRemoveOptions["keepStyle"] = 2] = "keepStyle";
})(TableRemoveOptions = exports.TableRemoveOptions || (exports.TableRemoveOptions = {}));

Core_1.GC$.extend(Core_1._SheetModelManager.prototype, {
    _backupTableManager: function (table, tableManager) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            if (!changes._tableChanges) {
                changes._tableChanges = [];
            }
            var tableChanges = changes._tableChanges;
            tableChanges.push({ type: "changeTableManager", table: table, oldTableManager: tableManager });
        }
    },
    _backupTableProperty: function (table, name, value) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            if (!changes._tableChanges) {
                changes._tableChanges = [];
            }
            var tableChanges = changes._tableChanges;
            tableChanges.push({ type: PROPERTY, table: table, name: name, value: value });
        }
    },
    _backupTableList: function (changedTables) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            if (!changes._tableChanges) {
                changes._tableChanges = [];
            }
            var tableChanges = changes._tableChanges;
            var tableManager = self._tables;
            tableChanges.push({
                type: COLLECTION,
                tableList: tableManager._tableList.slice(),
                changedTables: changedTables
            });
        }
    },
    _backupTableColumn: function (tableColumn, name, value) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            if (!changes._tableChanges) {
                changes._tableChanges = [];
            }
            var tableChanges = changes._tableChanges;
            tableChanges.push({
                type: TABLE_COLUMN,
                tableColumn: tableColumn,
                name: name,
                value: value
            });
        }
    },
    _backupDataSource: function (bindingManager, row, col) {
        var self = this;
        var bdValue = bindingManager.getValue(row, col);
        var oldValue = bdValue.value;
        var changes = self._changes;
        if (changes) {
            if (!changes._tableChanges) {
                changes._tableChanges = [];
            }
            var tableChanges = changes._tableChanges;
            tableChanges.push({
                type: DATA_SOURCE,
                bindingManager: bindingManager,
                row: row,
                col: col,
                oldValue: oldValue
            });
        }
    },
    _backupRowsChange: function (table, row, count, key, stateType) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            if (!changes._tableChanges) {
                changes._tableChanges = [];
            }
            var tableChanges = changes._tableChanges;
            tableChanges.push({ type: ROWS_CHANGE, table: table, key: key, row: row, count: count, stateType: stateType });
        }
    },
    _backupColumnReference: function (table, expression, columnIndex) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            if (!changes._tableExpressionChanges) {
                changes._tableExpressionChanges = [];
            }
            var tableExpressionChanges = changes._tableExpressionChanges;
            tableExpressionChanges.push({ type: TABLE_EXPRESSION, table: table, expression: expression, col: columnIndex });
        }
    },
    _backupSheetReference: function (table, expression, row, col) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            if (!changes._sheetExpressionChanges) {
                changes._sheetExpressionChanges = [];
            }
            var tableExpressionChanges = changes._sheetExpressionChanges;
            tableExpressionChanges.push({ type: SHEET_EXPRESSION, table: table, expression: expression, row: row, col: col });
        }
    },
    _restoreTables: function (tableChanges) {
        if (tableChanges) {
            _restoreBinding(tableChanges._bindingChanges);
            for (var i = tableChanges.length - 1; i >= 0; i--) {
                var change = tableChanges[i], table = void 0;
                switch (change.type) {
                    case COLLECTION:
                        var tableManager = this._tables, changedTables = change.changedTables;
                        tableManager._tableList = change.tableList;
                        if (changedTables && changedTables.length > 0) {
                            changedTables.forEach(function (tableItem) {
                                if (tableItem) {
                                    tableItem._syncSheetByFooter();
                                    tableItem._applyBindingPath();
                                }
                            });
                        }
                        break;
                    case TABLE_COLUMN:
                        change.tableColumn[change.name](change.value);
                        break;
                    case PROPERTY:
                        table = change.table;
                        var propertyName = change.name, propertyValue = change.value;
                        if (propertyName === PROPERTY_RANGE) {
                            table._row = propertyValue.row;
                            table._col = propertyValue.col;
                            table._rowCount = propertyValue.rowCount;
                            table._colCount = propertyValue.colCount;
                        }
                        else if (propertyName === PROPERTY_COLUMN) {
                            table._columns = propertyValue;
                        }
                        else if (propertyName === FOOTER_ROW_STYLES) {
                            table._footerRowStyles = propertyValue;
                        }
                        else {
                            table[propertyName](propertyValue);
                        }
                        table._noticeChartUpdateTableRange(0 );
                        break;
                    case "changeTableManager":
                        table = change.table;
                        var oldManager = change.oldTableManager;
                        table._setOwnerImp(oldManager);
                        break;
                    case DATA_SOURCE:
                        change.bindingManager.setValue(change.row, change.col, change.oldValue);
                        break;
                    case ROWS_CHANGE:
                       
                        _updateRowsChange(change.table, change.row, change.count, change.key, change.stateType);
                        break;
                    default:
                        break;
                }
            }
        }
    },
    _restoreTableExpression: function (expressionChanges) {
        if (expressionChanges) {
            var table = void 0;
            for (var i = expressionChanges.length - 1; i >= 0; i--) {
                var change = expressionChanges[i];
                if (change.type === TABLE_EXPRESSION) {
                    table = change.table;
                    var expression = change.expression, col = change.col, expr = void 0;
                    expr = table._columns[col].footerFormula();
                    if (expr) {
                        var index = _getTableExpression(expr);
                        if (index > -1) {
                            expr.arguments[index] = expression;
                        }
                    }
                }
            }
            table && table._syncSheetByFooter();
        }
    },
    _restoreSheetExpression: function (expressionChanges) {
        if (expressionChanges) {
            for (var i = expressionChanges.length - 1; i >= 0; i--) {
                var change = expressionChanges[i];
                if (change.type === SHEET_EXPRESSION) {
                    var expression = change.expression, row = change.row, col = change.col;
                    change.table._updateReferenceExpression(row, col, expression);
                }
            }
        }
    }
});
function _updateRowsChange(table, row, count, key, stateType) {
    var isDeletedRows = stateType === 0, rows = isDeletedRows ? table._deletedRows : table._dirtyRows, index = -1, rowItem;
    for (var i = 0; i < rows.length; i++) {
        rowItem = rows[i];
        if (rowItem && rowItem.key === key) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        rows.splice(index, isNullOrUndefined(count) ? 1 : count);
    }
    if (isDeletedRows) {
        table._undoDeleteDirtyRows();
    }
}
function _restoreBinding(bindingChanges) {
    if (bindingChanges) {
        for (var i = bindingChanges.length - 1; i >= 0; i--) {
            var change = bindingChanges[i];
            change.bindingManager._undo(change);
        }
    }
}
Core_1._SheetModelManager._registerFeature(TABLE, {
    priority: 7000,
    init: function () {
        this._tables = new TableManager(this._sheet);
    },
    clearPendingChanges: function (argObj) {
        var tables = this.tables;
        tables && tables._clearPendingChanges(argObj.tableList);
    },
    undoAddRows: function (argObj) {
        var self = this, sheet = self._sheet, row = argObj.row, rowCount = argObj.rowCount;
        var tableList = sheet.tables._findByRange(row, -1, rowCount, -1);
        tableList.forEach(function (table) {
            table._setDeletedRows(row, rowCount, _getRowsChangeKey(true));
        });
    },
    getValue: function (argObj) {
        var row = argObj.row, col = argObj.col, sheetArea = argObj.sheetArea;
        var tm = this._sheet.tables, table, returnObj;
        if (sheetArea === 3  && tm) {
            table = tm.find(row, col);
            if (table) {
                returnObj = tm._getValue(row, col);
                argObj.isValueGet = returnObj._hasValue;
                argObj.value = returnObj._value;
            }
        }
    },
    setValue: function (argObj) {
        var row = argObj.row, col = argObj.col, value = argObj.value, sheetArea = argObj.sheetArea;
        var tm = this._sheet.tables, table;
        if (sheetArea === 3  && tm) {
            table = tm.find(row, col);
            if (table) {
                var changes = argObj.changes, tableChanges = void 0;
                if (changes) {
                    tableChanges = changes._tableChanges;
                    if (!tableChanges) {
                        changes._tableChanges = [];
                    }
                }
                argObj.isValueSet = tm._setValue(row, col, value);
            }
        }
    },
    undo: function (changes) {
        var tableChanges = changes._tableChanges, tableExpressionChanges = changes._tableExpressionChanges, sheetExpressionChanges = changes._sheetExpressionChanges;
        if (tableChanges) {
            this._restoreTables(tableChanges);
        }
        if (tableExpressionChanges) {
            this._restoreTableExpression(tableExpressionChanges);
        }
        if (sheetExpressionChanges) {
            this._restoreSheetExpression(sheetExpressionChanges);
        }
        this._tables._clearCache();
    }
});
Core_1.Workbook._registerFeature(TABLE, {
    init: function () {
        Core_1.Commands._registerContexeMenuCommand(this.commandManager());
    },
    onCultureChanged: function () {
        getSR();
    }
});




/***/ }),

/***/ "./dist/plugins/table/table.ns.js":
/*!****************************************!*\
  !*** ./dist/plugins/table/table.ns.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en = __webpack_require__(/*! ./table.res.en */ "./dist/plugins/table/table.res.en.js");
exports.SR = {
    en: en
};


/***/ }),

/***/ "./dist/plugins/table/table.res.en.js":
/*!********************************************!*\
  !*** ./dist/plugins/table/table.res.en.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Exp_DragDropShiftTableCell = 'This operation is not allowed. The operation is attempting to shift cells in a table on your worksheet.';
exports.Exp_DragDropChangePartOfTable = 'Cannot complete operation: You are attempting to change a portion of a table row or column in a way that is not allowed.';
exports.Exp_TableEmptyNameError = 'The table name cannot be empty.';
exports.Exp_TableNameInvalid = 'The table name is not valid.';
exports.Exp_TableInvalidRow = 'Invalid row index or row count.';
exports.Exp_TableInvalidColumn = 'Invalid column index or column count.';
exports.Exp_TableIntersectError = 'The tables cannot be intersected.';
exports.Exp_TableHasSameNameError = 'The current worksheet already exists in a table with the same name.';
exports.Exp_TableDataSourceNullError = 'Table datasource cannot be null.';
exports.Exp_TableMoveOutOfRange = 'The table cannot be moved out of the sheet.';
exports.Exp_TableResizeOutOfRange = 'The invalid row count, column count, and table cannot be resized out of the sheet.';
exports.Exp_ArrayFormulaTable = 'multi-cell array formulas are not allowed in tables.';
exports.Exp_TableResizeInvalidRange = 'The headers must remain in the same row, and the resulting table range must overlap the original table range.';
exports.Exp_TableResizeToSpan = 'Cannot complete operation: A table cannot overlap with a table or merged cells.';
exports.Exp_TableResizeWithFilter = 'Cannot shift cells in a filtered range or table.';
exports.Exp_TableResizeWithHidden = "Cannot resize a table that's adjacent to a hidden row or column.";
exports.Exp_TableResizeToTable = 'Cannot complete operation: Operations that include cells both inside and outside a table range, and operation that affect cells that overlap multiple tables are not allowed.';
exports.Exp_RowParamOutOfRange = 'The param row out of data range of table.';
exports.Exp_ColParamOutOfRange = 'The param col out of data range of table.';
exports.Exp_TableDeleteCountInvalid = 'The param count to delete will cause empty table.';
exports.Exp_TableAddRowIntersectSpan = "This won't work because it would move cells in a span on your worksheet.";
exports.Exp_TableAddRowIntersectTable = "This won't work because it would move cells in a table on your worksheet.";
exports.Exp_TableAddRowNoEnoughRoom = 'Cannot insert new cells because it would push non-empty cells of the end of worksheet. These cells might appear empty but have blank values, some formatting, or a formula. Delete enough rows or columns to make room for what you want to insert and then try again.';
exports.Table_Total = 'Total';
exports.Table_None = 'None';
exports.Table_Average = 'Average';
exports.Table_Count = 'Count';
exports.Table_Count_Numbers = 'Count Numbers';
exports.Table_Max = 'Max';
exports.Table_Min = 'Min';
exports.Table_Sum = 'Sum';
exports.Table_StdDev = 'StdDev';
exports.Table_Var = 'Var';


/***/ }),

/***/ "Bindings":
/*!********************************************!*\
  !*** external "GC.Spread.Sheets.Bindings" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = GC.Spread.Sheets.Bindings;

/***/ }),

/***/ "CalcEngine":
/*!***************************************!*\
  !*** external "GC.Spread.CalcEngine" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = GC.Spread.CalcEngine;

/***/ }),

/***/ "Common":
/*!****************************!*\
  !*** external "GC.Spread" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = GC.Spread;

/***/ }),

/***/ "Core":
/*!***********************************!*\
  !*** external "GC.Spread.Sheets" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = GC.Spread.Sheets;

/***/ }),

/***/ "Filters":
/*!******************************************!*\
  !*** external "GC.Spread.Sheets.Filter" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = GC.Spread.Sheets.Filter;

/***/ }),

/***/ "SheetsCalc":
/*!**********************************************!*\
  !*** external "GC.Spread.Sheets.CalcEngine" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = GC.Spread.Sheets.CalcEngine;

/***/ })

/******/ });
  return GC;
}
//# sourceMappingURL=gc.spread.sheets.tables.14.2.5.js.map