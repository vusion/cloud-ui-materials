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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['CellState'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/cellState/cellstate.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/cellState/cellStateManager.js':
/*!****************************************************!*\
  !*** ./dist/plugins/cellState/cellStateManager.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var extend = Core_1.GC$.extend, keywords_undefined = undefined;
var FeatureName = 'cellState';
var Cell_States_Order_List = [Core_1.CellStatesType.readonly, Core_1.CellStatesType.invalid, Core_1.CellStatesType.dirty, Core_1.CellStatesType.selected, Core_1.CellStatesType.active, Core_1.CellStatesType.hover, Core_1.CellStatesType.edit];
function _cloneRange(range) {
    var row = range.row, col = range.col, rowCount = range.rowCount, colCount = range.colCount;
    return new Core_1.Range(row, col, rowCount, colCount);
}
var CellStateCollection = (function () {
    function CellStateCollection(sheet, state) {
        this._sheet = sheet;
        this._state = state;
        this._cache = [];
        for (var i = 1; i <= 3; i++) {
            this._createCache(i);
        }
    }
    CellStateCollection.prototype._createCache = function (sheetArea) {
        this._cache[sheetArea] = [];
    };
    CellStateCollection.prototype._getCache = function (sheetArea) {
        return this._cache[sheetArea];
    };
    CellStateCollection.prototype._setCache = function (list, sheetArea) {
        this._cache[sheetArea] = list;
    };
    CellStateCollection.prototype._getDuplicateIndex = function (cache, range) {
        for (var index = 0, len = cache.length; index < len; index++) {
            var item = cache[index];
            if (item.range.equals(range)) {
                return index;
            }
        }
        return -1;
    };
    CellStateCollection.prototype._remove = function (range, sheetArea) {
        var self = this, cache = self._getCache(sheetArea);
        var index = this._getDuplicateIndex(cache, range);
        if (index > -1) {
            var old = cache[index];
            self._backupRemove(index, old.range, old.style, cache);
            cache.splice(index, 1);
        }
    };
    CellStateCollection.prototype._add = function (range, style, sheetArea) {
        var self = this, cache = self._getCache(sheetArea);
        var index = self._getDuplicateIndex(cache, range), item = {
            range: range,
            style: style
        };
        self._backupAdd({
            index: index,
            cache: cache,
            range: range,
            style: style
        });

        if (index === -1) {
            cache.push(item);
        }
        else {
            cache[index] = item;
        }
    };
    CellStateCollection.prototype._all = function (sheetArea) {
        var cache = this._getCache(sheetArea), state = this._state;
        return cache.map(function (_a) {
            var range = _a.range, style = _a.style;
            return {
                range: _cloneRange(range),
                style: style.clone(),
                state: state
            };
        });
    };
    CellStateCollection.prototype._getStyle = function (row, col, sheetArea) {
        var cache = this._getCache(sheetArea), item, rsItem = [];
        for (var len = cache.length, i = 0; i < len; i++) {
            item = cache[i];
            if (_isCellInRange(row, col, item.range)) {
                rsItem.push(item);
            }
        }
        if (rsItem.length > 0) {
            return rsItem;
        }
        return null;
    };
    CellStateCollection.prototype._isCellSetStyle = function (row, col, sheetArea) {
        var self = this, cache = self._getCache(sheetArea);
        if (cache && cache.length > 0) {
            for (var _i = 0, cache_1 = cache; _i < cache_1.length; _i++) {
                var range = cache_1[_i].range;
                if (_isCellInRange(row, col, range)) {
                    return true;
                }
            }
        }
        return false;
    };
    CellStateCollection.prototype._isMatch = function (state, row, col, stateScope, sheetArea, isLocked) {
        var self = this, sheet = self._sheet, cache = self._getCache(sheetArea);

        if (cache && cache.length === 0) {
            return false;
        }
        if (self._state === Core_1.CellStatesType.dirty && (isNullOrUndefined(stateScope) || (stateScope & self._state) > 0)) {
            return sheet._getCellIsDirty(row, col, sheetArea);
        }
        if (self._state === Core_1.CellStatesType.selected && (isNullOrUndefined(stateScope) || (stateScope & self._state) > 0)) {
            var selections = self._sheet.getSelections();
            for (var _i = 0, selections_1 = selections; _i < selections_1.length; _i++) {
                var selection = selections_1[_i];
                if (_isCellInRange(row, col, selection)) {
                    return true;
                }
            }
            return false;
        }
        if (self._state === Core_1.CellStatesType.invalid) {
            if (sheet.isValid && (isNullOrUndefined(stateScope) || (stateScope & self._state) > 0)) {
                return !sheet.isValid(row, col, sheet.getValue(row, col, sheetArea));
            }
            return false;
        }
        if (self._state === Core_1.CellStatesType.readonly) {
            return isLocked && self._sheet.options.isProtected;
        }
        return (self._state & state) > 0;
    };
    CellStateCollection.prototype._clearStyleByRange = function (range, sheetArea) {
        var self = this, cache = this._getCache(sheetArea);
        this._backupClear({ cache: cache, sheetArea: sheetArea, collection: self });
        this._setCache(_addRangeStyle(this._sheet, cache, range), sheetArea);
    };
    CellStateCollection.prototype.toJSON = function () {
        var self = this;
        var json = {}, tempCache;
        for (var i = 0; i <= 3; i++) {
            tempCache = self._getCache(i);
            if (tempCache && tempCache.length > 0) {
                json[i] = getCacheJSONData(tempCache);
            }
        }
        return json;
    };
    CellStateCollection.prototype.fromJSON = function (data, noSchema, deserializationOptions) {
        var self = this, tempCache;
        self._cache = [];
        for (var i = 1; i <= 3; i++) {
            self._createCache(i);
        }
        for (var sheetArea in data) {
            if (data.hasOwnProperty(sheetArea)) {
                tempCache = self._getCache(sheetArea);
                setCacheDataFromJSON(tempCache, data[sheetArea], noSchema, deserializationOptions);
            }
        }
    };
    CellStateCollection.prototype._backupRangeInfo = function (_a) {
        var args = __rest(_a, []);
        var self = this, _sheetmodel = (self._sheet._modelManager);
        _sheetmodel._backupCellStates(__assign({ type: 'rangeChange' }, args));
    };
    CellStateCollection.prototype._backupAdd = function (_a) {
        var index = _a.index, cache = _a.cache, range = _a.range, style = _a.style;
        var self = this, _sheetmodel = (self._sheet._modelManager);
        if (index !== -1) {
            style = cache[index].style;
        }
        _sheetmodel._backupCellStates({ type: 'add', index: index, cache: cache, range: range, style: style });
    };
    CellStateCollection.prototype._backupRemove = function (index, range, style, cache) {
        var self = this, _sheetmodel = (self._sheet._modelManager);
        _sheetmodel._backupCellStates({ type: 'remove', index: index, range: range, style: style, cache: cache });
    };
    CellStateCollection.prototype._backupClear = function (_a) {
        var args = __rest(_a, []);
        var self = this, _sheetmodel = (self._sheet._modelManager);
        _sheetmodel._backupCellStates(__assign({ type: 'clear' }, args));
    };
    CellStateCollection.prototype._onRowsAdded = function (index, count) {
        var self = this;
        var tempCache;
        for (var i = 0; i <= 3; i++) {
            tempCache = self._getCache(i);
            if (tempCache && tempCache.length > 0) {
                tempCache.forEach(function (_a) {
                    var range = _a.range;
                    var row = range.row, rowCount = range.rowCount;
                    if (index <= row) {
                        range.row = row + count;
                        self._backupRangeInfo({ range: range, row: row });
                    }
                    else if (row < index && index < row + rowCount) {
                        range.rowCount = range.rowCount + count;
                        self._backupRangeInfo({ range: range, rowCount: rowCount });
                    }
                });
            }
        }
    };
    CellStateCollection.prototype._onRowsRemoved = function (index, count) {
        var self = this, tempCache;
        for (var i = 0; i <= 3; i++) {
            tempCache = self._getCache(i);
            if (tempCache && tempCache.length > 0) {
                tempCache.forEach(function (_a) {
                    var range = _a.range;
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
                            range.rowCount = rowCount + row;
                            row = 0;
                        }
                        range.row = row;
                        self._backupRangeInfo({ range: range, row: row, rowCount: rowCount });
                    }
                    else if (row <= index && index < row + rowCount) {
                        range.rowCount = range.rowCount - Math.min(count, row + rowCount - index);
                        self._backupRangeInfo({ range: range, rowCount: rowCount });
                    }
                });
            }
        }
    };
    CellStateCollection.prototype._onColumnsAdded = function (index, count) {
        var self = this, tempCache;
        for (var i = 0; i <= 3; i++) {
            tempCache = self._getCache(i);
            if (tempCache && tempCache.length > 0) {
                tempCache.forEach(function (_a) {
                    var range = _a.range;
                    var col = range.col, colCount = range.colCount;
                    if (index <= col) {
                        range.col = col + count;
                        self._backupRangeInfo({ range: range, col: col });
                    }
                    else if (col < index && index < col + range.colCount) {
                        range.colCount = colCount + count;
                        self._backupRangeInfo({ range: range, colCount: colCount });
                    }
                });
            }
        }
    };
    CellStateCollection.prototype._onColumnsRemoved = function (index, count) {
        var self = this, tempCache;
        for (var i = 0; i <= 3; i++) {
            tempCache = self._getCache(i);
            if (tempCache && tempCache.length > 0) {
                tempCache.forEach(function (_a) {
                    var range = _a.range;
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
                        self._backupRangeInfo({ range: range, col: col, colCount: colCount });
                    }
                    else if (col <= index && index < col + colCount) {
                        range.colCount -= Math.min(count, col + colCount - index);
                        self._backupRangeInfo({ range: range, colCount: colCount });
                    }
                });
            }
        }
    };
    CellStateCollection.prototype._distory = function () {
        this._cache = [];
        this._sheet = null;
    };
    return CellStateCollection;
}());


var CellStateManager = (function () {
    function CellStateManager(sheet) {
        this._sheet = sheet;
        this._cellStateCollectionMap = {};
    }
    CellStateManager.prototype.getCollection = function (state, createIfNotExist) {
        var self = this;
        if (!self._cellStateCollectionMap[state] && createIfNotExist) {
            self._cellStateCollectionMap[state] = new CellStateCollection(self._sheet, state);
        }
        return self._cellStateCollectionMap[state];
    };
    CellStateManager.prototype.hasIntersectInSeletionState = function (row, col, rowCount, colCount) {
        var self = this, collection = self._cellStateCollectionMap[Core_1.CellStatesType.selected];
        if (collection) {
            var cache = collection._getCache(Core_1.SheetArea.viewport);
            if (cache && cache.length > 0) {
                for (var _i = 0, cache_2 = cache; _i < cache_2.length; _i++) {
                    var range = cache_2[_i].range;
                    if (range.intersect(row, col, rowCount, colCount)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    CellStateManager.prototype.getState = function (row, col, sheetArea) {
        var model = this._sheet._modelManager._getSheetModel(sheetArea);
        return model.getCellState(row, col) || 0;
    };
    CellStateManager.prototype.remove = function (range, state, sheetArea) {
        if (sheetArea === void 0) { sheetArea = Core_1.SheetArea.viewport; }
        var collection = this._cellStateCollectionMap[state];
        collection._remove(range, sheetArea);
    };
    CellStateManager.prototype.all = function (state, sheetArea) {
        if (sheetArea === void 0) { sheetArea = Core_1.SheetArea.viewport; }
        var list = [];
        if (isNullOrUndefined(state)) {
            for (var collection in this._cellStateCollectionMap) {
                if (this._cellStateCollectionMap.hasOwnProperty(collection)) {
                    list = list.concat(this._cellStateCollectionMap[collection]._all(sheetArea));
                }
            }
        }
        else {
            list = this._cellStateCollectionMap[state]._all(sheetArea);
        }
        return list;
    };


    CellStateManager.prototype.add = function (range, state, style, sheetArea) {
        if (Core_1.CellStatesType[state] === keywords_undefined) {
            throw new Error('Unmatched Cell State Type');
        }
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3;
        }
        var collection = this.getCollection(state, true);
        collection._add(_cloneRange(range), style, sheetArea);
        var sheet = this._sheet;


        if (sheetArea === Core_1.SheetArea.viewport) {
            sheet.repaint(sheet._getRangeWholeRect(range));
        }
        else {
            var layout = sheet._getSheetLayout();
            if (sheetArea === Core_1.SheetArea.colHeader) {
                sheet.repaint(new Core_1.Rect(layout._viewportX, layout._headerY, sheet._getActualViewportWidth(layout), layout._colHeaderHeight));
            }
            if (sheetArea === Core_1.SheetArea.rowHeader) {
                sheet.repaint(new Core_1.Rect(layout._headerX, layout._viewportY, layout._rowHeaderWidth, sheet._getActualViewportHeight(layout)));
            }
        }
    };


    CellStateManager.prototype.clear = function (range, sheetArea) {
        this._clearStyle(range, sheetArea);
    };
    CellStateManager.prototype._clearStyle = function (range, sheetArea) {
        for (var state in this._cellStateCollectionMap) {
            if (this._cellStateCollectionMap.hasOwnProperty(state)) {
                this._cellStateCollectionMap[state]._clearStyleByRange(range, sheetArea);
            }
        }
    };
    CellStateManager.prototype._repaintChangeCell = function (state, row, col, sheetArea, rowViewportIndex, colViewportIndex) {
        var self = this, sheet = self._sheet, cellStateCollection = self._cellStateCollectionMap[state];
        if (cellStateCollection && cellStateCollection._isCellSetStyle(row, col, sheetArea)) {
            if (rowViewportIndex !== -1 && colViewportIndex !== -1) {
                sheet.repaint(sheet._getRepaintRectForCellState(sheet, row, col, rowViewportIndex, colViewportIndex));
            }
        }
    };
    CellStateManager.prototype.getStyle = function (row, col, sheetArea, stateScope, isLocked) {
        if (isNullOrUndefined(sheetArea)) {
            sheetArea = 3 ;
        }
        var style = new Core_1.Style(), tempStyleList = [], tempStyle, tempStateCollection;
        var self = this, sheet = self._sheet, modelManager = sheet._modelManager, span = modelManager.getSpan(row, col, sheetArea);
        if (!isNullOrUndefined(span)) {
            row = span.row;
            col = span.col;
        }

        var matchState;
        if (isNullOrUndefined(stateScope)) {
            matchState = self.getState(row, col, sheetArea);
        }
        else {
            matchState = self.getState(row, col, sheetArea) & stateScope;
        }
        if (matchState !== keywords_undefined && matchState !== null) {
            for (var _i = 0, Cell_States_Order_List_1 = Cell_States_Order_List; _i < Cell_States_Order_List_1.length; _i++) {
                var stateCollectionKey = Cell_States_Order_List_1[_i];
                tempStateCollection = self._cellStateCollectionMap[stateCollectionKey];
                if (tempStateCollection && tempStateCollection._isMatch(matchState, row, col, stateScope, sheetArea, isLocked)) {
                    tempStyle = tempStateCollection._getStyle(row, col, sheetArea);
                    if (tempStyle && tempStyle.length > 0) {
                        tempStyleList = tempStyleList.concat(tempStyle);
                    }
                }
            }
            if (tempStyleList.length > 0) {
                for (var len = tempStyleList.length, i = len - 1; i >= 0; i--) {
                    style._compose(tempStyleList[i].style);
                }
                return style;
            }
        }
        return null;
    };
    CellStateManager.prototype.destory = function () {
        for (var state in this._cellStateCollectionMap) {
            if (this._cellStateCollectionMap.hasOwnProperty(state)) {
                this._cellStateCollectionMap[state]._distory();
            }
        }
        delete this._cellStateCollectionMap;
        delete this._sheet;
    };
    CellStateManager.prototype.toJSON = function () {
        var result = {}, tempStateCollection;
        for (var state in this._cellStateCollectionMap) {
            if (this._cellStateCollectionMap.hasOwnProperty(state)) {
                tempStateCollection = this._cellStateCollectionMap[state];
                result[state] = tempStateCollection.toJSON();
            }
        }
        return result;
    };
    CellStateManager.prototype.fromJSON = function (data, noSchema, deserializationOptions) {
        var self = this, tempStateCollection;
        for (var stateKey in data) {
            if (data.hasOwnProperty(stateKey)) {
                var state = parseInt(stateKey, 10);
                tempStateCollection = self.getCollection(state, true);
                tempStateCollection.fromJSON(data[state], noSchema, deserializationOptions);
            }
        }
    };
    CellStateManager.prototype._onRowsAdded = function (row, rowCount) {
        for (var state in this._cellStateCollectionMap) {
            if (this._cellStateCollectionMap.hasOwnProperty(state)) {
                this._cellStateCollectionMap[state]._onRowsAdded(row, rowCount);
            }
        }
    };
    CellStateManager.prototype._onRowsRemoved = function (row, rowCount) {
        for (var state in this._cellStateCollectionMap) {
            if (this._cellStateCollectionMap.hasOwnProperty(state)) {
                this._cellStateCollectionMap[state]._onRowsRemoved(row, rowCount);
            }
        }
    };
    CellStateManager.prototype._onColumnsAdded = function (col, colCount) {
        for (var state in this._cellStateCollectionMap) {
            if (this._cellStateCollectionMap.hasOwnProperty(state)) {
                this._cellStateCollectionMap[state]._onColumnsAdded(col, colCount);
            }
        }
    };
    CellStateManager.prototype._onColumnsRemoved = function (col, colCount) {
        for (var state in this._cellStateCollectionMap) {
            if (this._cellStateCollectionMap.hasOwnProperty(state)) {
                this._cellStateCollectionMap[state]._onColumnsRemoved(col, colCount);
            }
        }
    };
    return CellStateManager;
}());
exports.CellStateManager = CellStateManager;

function _addRangeStyle(sheet, list, range) {
    var result = [], maxRowCount = sheet.getRowCount(3 ), maxColCount = sheet.getColumnCount(3 );
    list.forEach(function (item) {
        result = result.concat(_spliceRangeStyle(sheet, item.style, item.range, range, maxRowCount, maxColCount));
    });
    return result;
}
function getCacheJSONData(cache) {
    var result = [], tempCache;
    for (var i = 0, len = cache.length; i < len; i++) {
        tempCache = cache[i];
        var style = tempCache.style, _a = tempCache.range, row = _a.row, col = _a.col, colCount = _a.colCount, rowCount = _a.rowCount;
        var tempJSON = {
            range: {
                row: row, col: col, colCount: colCount, rowCount: rowCount
            },
            style: style.toJSON()
        };
        result.push(tempJSON);
    }
    return result;
}
function setCacheDataFromJSON(tempCache, data, noSchema, deserializationOptions) {
    var tempInfo, tempJSON;
    for (var i = 0, len = data.length; i < len; i++) {
        tempJSON = data[i];
        var _a = tempJSON.range, row = _a.row, col = _a.col, rowCount = _a.rowCount, colCount = _a.colCount, style = tempJSON.style;
        var tempStyle = new Core_1.Style();
        tempStyle.fromJSON(style, noSchema, deserializationOptions);
        tempInfo = {
            style: tempStyle,
            range: new Core_1.Range(row, col, rowCount, colCount)
        };
        tempCache.push(tempInfo);
    }
}
function _spliceRangeStyle(sheet, style, originalRange, deselectRange, maxRowCount, maxColCount) {
    var list = sheet._deselectSelection(originalRange, deselectRange, maxRowCount, maxColCount);
    return list.map(function (item) {
        return {
            range: item,
            style: style,
        };
    });
}
function _isCellInRange(targetRow, targetCol, range) {
    return range.contains(targetRow, targetCol);
}
var adapter = {
    init: function () {
        this.cellStates = new CellStateManager(this);
    },
    dispose: function (argus) {
        var self = this;
        if (self.cellStates && argus.clearCache !== false) {
            self.cellStates.destory();
            self.cellStates = null;
        }
    },
    onLayoutChanged: function (e) {
        var changeType = e.changeType, row = e.row, rowCount = e.rowCount, col = e.col, colCount = e.colCount, sheetArea = e.sheetArea;
        var manager = this.cellStates;
        if (changeType === 'addRows') {
            manager._onRowsAdded(row, rowCount);
        }
        else if (changeType === 'deleteRows') {
            manager._onRowsRemoved(row, rowCount);
        }
        else if (changeType === 'addColumns') {
            manager._onColumnsAdded(col, colCount);
        }
        else if (changeType === 'deleteColumns') {
            manager._onColumnsRemoved(col, colCount);
        }
        else if (changeType === 'clear') {
            if (sheetArea === 3 && (e.type & 2 ) === 2) {
                manager._clearStyle(new Core_1.Range(row, col, rowCount, colCount), sheetArea);
            }
            if (sheetArea === 3 && (e.type & 1 ) === 1) {
                for (var r = row; r < row + rowCount; r++) {
                    for (var c = col; c < col + colCount; c++) {
                        this._modelManager._getSheetModel(sheetArea).setCellState(r, c, Core_1.CellStatesType.invalid, false);
                    }
                }
            }
        }
    },
    toJson: function (data, serializationOption) {
        if (!serializationOption || (serializationOption && !serializationOption.ignoreStyle)) {
            data.cellStates = this.cellStates.toJSON();
        }
    },
    fromJson: function (sheetSettings, noSchema, deserializationOptions) {
        var self = this;
        var canCellstateStyleFromjson = (deserializationOptions && !deserializationOptions.ignoreStyle) || !deserializationOptions;
        if (sheetSettings && sheetSettings.cellStates && canCellstateStyleFromjson) {
            self.cellStates = new CellStateManager(self);
            self.cellStates.fromJSON(sheetSettings.cellStates, noSchema, deserializationOptions);
        }
    }
};
var sheetEx = {
    _repaintChangeCellForCellState: function (state, row, col, sheetArea, rowViewportIndex, colViewportIndex) {
        if (sheetArea && sheetArea <= 3 && sheetArea > 0) {
            this.cellStates._repaintChangeCell(state, row, col, sheetArea, rowViewportIndex, colViewportIndex);
        }
    },
    _getCellIsDirty: function (row, col, sheetArea) {
        var self = this, dirtyNodes = self._modelManager._getDirtyNodes(sheetArea);
        return dirtyNodes && dirtyNodes[row] && dirtyNodes[row][col];
    }
};
extend(Core_1.Worksheet.prototype, sheetEx);
Core_1.Worksheet._registerFeature(FeatureName, adapter);
extend(Core_1._SheetModelManager.prototype, {
    _backupCellStates: function (rangeChangeInfo) {
        var self = this;
        var changes = self._changes;
        if (changes) {
            var originalCellStateChanges = void 0;
            if (!changes._originalCellStates) {
                originalCellStateChanges = [];
            }
            else {
                originalCellStateChanges = changes._originalCellStates;
            }
            originalCellStateChanges.push(rangeChangeInfo);
            changes._originalCellStates = originalCellStateChanges;
        }
    },
    _restoreCellStates: function (originalCellStates) {
        var _this = this;
        if (originalCellStates && originalCellStates.length > 0) {
            originalCellStates.forEach(function (_a) {
                var type = _a.type, args = __rest(_a, ['type']);
                switch (type) {
                    case 'rangeChange':
                        _this._restoreRangeChange(__assign({}, args));
                        break;
                    case 'add':
                        _this._restoreAddChange(__assign({}, args));
                        break;
                    case 'clear':
                        _this._restoreClearChange(__assign({}, args));
                        break;
                    case 'remove':
                        _this._restoreRemoveChange(__assign({}, args));
                        break;
                }
            });
        }
    },
    _restoreClearChange: function (_a) {
        var cache = _a.cache, sheetArea = _a.sheetArea, collection = _a.collection;
        collection._setCache(cache, sheetArea);
    },
    _restoreRemoveChange: function (_a) {
        var cache = _a.cache, range = _a.range, style = _a.style, index = _a.index;
        cache.splice(index, 0, { range: range, style: style });
    },
    _restoreAddChange: function (_a) {
        var cache = _a.cache, range = _a.range, style = _a.style, index = _a.index;
        if (index === -1) {
            var deleteIndex_1;
            cache.forEach(function (_a, infoIndex) {
                var itemRange = _a.range, itemStyle = _a.style;
                if (itemRange === range && itemStyle === style) {
                    deleteIndex_1 = infoIndex;
                }
            });
            cache.splice(deleteIndex_1, 1);
        }
        else {
            cache[index].style = style;
        }
    },
    _restoreRangeChange: function (_a) {
        var range = _a.range, row = _a.row, col = _a.col, rowCount = _a.rowCount, colCount = _a.colCount;
        if (row !== keywords_undefined) {
            range.row = row;
        }
        if (col !== keywords_undefined) {
            range.col = col;
        }
        if (rowCount !== keywords_undefined) {
            range.rowCount = rowCount;
        }
        if (colCount !== keywords_undefined) {
            range.colCount = colCount;
        }
    }
});
Core_1._SheetModelManager._registerFeature(FeatureName, {
    undo: function (changes) {
        var _originalCellStates = changes._originalCellStates;
        if (_originalCellStates) {
            this._restoreCellStates(_originalCellStates);
        }
    }
});
/***/ }),

/***/ './dist/plugins/cellState/cellstate.entry.js':
/*!***************************************************!*\
  !*** ./dist/plugins/cellState/cellstate.entry.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(__webpack_require__(/*! ./cellStateManager */ './dist/plugins/cellState/cellStateManager.js'));
__export(__webpack_require__(/*! ./stateManager */ './dist/plugins/cellState/stateManager.js'));
/***/ }),

/***/ './dist/plugins/cellState/stateManager.js':
/*!************************************************!*\
  !*** ./dist/plugins/cellState/stateManager.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';


Object.defineProperty(exports, '__esModule', { value: true });
var _a;
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var extend = Core_1.GC$.extend;
var FeatureName = 'states';
var stateMethods = (_a = {},
    _a[Core_1.StatesType.hover] = function (row, column, isRow) {
        var self = this;
        return isRow ? row === self._hoverRow : column === self._hoverCol;
    },
    _a[Core_1.StatesType.active] = function (row, column, isRow) {
        var self = this;
        return isRow ? row === self._activeRowIndex : column === self._activeColIndex;
    },
    _a[Core_1.StatesType.selected] = function (row, column, isRow) {
        var self = this;
        var selections = self.getSelections();
        var result = false;
        for (var _i = 0, selections_1 = selections; _i < selections_1.length; _i++) {
            var selection = selections_1[_i];
            var actualRow = selection.row === -1 ? 0 : selection.row;
            var actualRowCount = selection.rowCount === -1 ? self.getRowCount() : selection.rowCount;
            var actualColumn = selection.col === -1 ? 0 : selection.col;
            var actualColumnCount = selection.colCount === -1 ? self.getColumnCount() : selection.colCount;
            if (isRow && row >= actualRow && row < actualRow + actualRowCount) {
                result = true;
            }
            else if (!isRow && column >= actualColumn && column < actualColumn + actualColumnCount) {
                result = true;
            }
        }
        return result;
    },
    _a[Core_1.StatesType.readonly] = function (row, column, isRow) {
        if ((isRow && isNullOrUndefined(row)) || (!isRow && isNullOrUndefined(column))) {
            return false;
        }
        var self = this;
        var isProtected = self.options.isProtected;
        if (isProtected) {
            if (isRow) {
                column = -1;
            }
            else {
                row = -1;
            }
            var modelManager = self._modelManager;
            var style = modelManager.getStyle(row, column);
            if (style === undefined) {
                return true;
            }
            else {
                return style.locked;
            }
        }
        return false;
    },
    _a[Core_1.StatesType.edit] = function (row, column, isRow) {
        var self = this;
        if (self.isEditing()) {
            return isRow ? row === self._activeRowIndex : column === self._activeColIndex;
        }
        return false;
    },
    _a[Core_1.StatesType.invalid] = function (row, column, isRow) {
        var self = this;
        var originalRow = row, originalColumn = column;
        if (isRow) {
            column = -1;
        }
        else {
            row = -1;
        }
        var validators = self._getDataValidators(row, column);
        for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
            var _validator = validators_1[_i];
            var range = _validator._getRanges()[0];
            originalRow = range.row === -1 ? originalRow : range.row;
            originalColumn = range.col === -1 ? originalColumn : range.col;
            var value = self.getValue(originalRow, originalColumn, Core_1.SheetArea.viewport);
            var result = !_validator.isValid(self, row, column, value);
            if (result) {
                return true;
            }
        }
        return false;
    },
    _a[Core_1.StatesType.dirty] = function (row, column, isRow) {
        var self = this;
        var dirtyNodes = self._modelManager._getDirtyNodes();
        if (dirtyNodes) {
            if (isRow) {
                return dirtyNodes[row];
            }
            else {
                var rows = Object.keys(dirtyNodes);
                for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                    var r = rows_1[_i];
                    var dirtyRow = dirtyNodes[r];
                    if (dirtyRow[column]) {
                        return true;
                    }
                }
                return false;
            }
        }
        else {
            return false;
        }
    },
    _a[Core_1.StatesType.inserted] = function (row) {
        var insertedRows = this.getInsertRows();
        for (var _i = 0, insertedRows_1 = insertedRows; _i < insertedRows_1.length; _i++) {
            var rowObj = insertedRows_1[_i];
            if (rowObj.row === row) {
                return true;
            }
        }
    },
    _a[Core_1.StatesType.updated] = function (row) {
        var updatedRows = this.getDirtyRows();
        for (var _i = 0, updatedRows_1 = updatedRows; _i < updatedRows_1.length; _i++) {
            var rowObj = updatedRows_1[_i];
            if (rowObj.row === row) {
                return true;
            }
        }
    },
    _a);
var _StatesManager = (function () {
    function _StatesManager(context) {
        this._enableStatesForConditionalFormats = {};
        this.getStateMethods = {};
        this.context = context;
        extend(this.getStateMethods, stateMethods);
    }
    _StatesManager.prototype.enableState = function (state, isRow) {
        var enableState = this._enableStatesForConditionalFormats;
        if (isNullOrUndefined(enableState[state])) {
            enableState[state] = { row: false, column: false };
        }
        if (isRow) {
            enableState[state].row = true;
        }
        else {
            enableState[state].column = true;
        }
    };
    _StatesManager.prototype.disableState = function (state, isRow) {
        var enableState = this._enableStatesForConditionalFormats;
        if (isNullOrUndefined(enableState[state])) {
            return;
        }
        if (isRow) {
            enableState[state].row = false;
        }
        else {
            enableState[state].column = false;
        }
    };
    _StatesManager.prototype.isEnable = function (state, isRow) {
        var enableState = this._enableStatesForConditionalFormats;
        if (isNullOrUndefined(enableState[state])) {
            return false;
        }
        if (isRow) {
            return enableState[state].row;
        }
        else {
            return enableState[state].column;
        }
    };
    _StatesManager.prototype.getState = function (row, column, type, isRow) {
        var context = this.context;
        var method = this.getStateMethods[type];
        if (typeof method === 'function') {
            return method.call(context, row, column, isRow) ? type : 0;
        }
    };
    _StatesManager.prototype.destory = function () {
        delete this.context;
        delete this._enableStatesForConditionalFormats;
    };
    _StatesManager.prototype.fromJSON = function (data) {
        this._enableStatesForConditionalFormats = extend({}, data);
    };
    _StatesManager.prototype.toJSON = function () {
        return extend({}, this._enableStatesForConditionalFormats);
    };
    return _StatesManager;
}());
exports._StatesManager = _StatesManager;
var adapter = {
    init: function () {
        this._statesManager = new _StatesManager(this);
    },
    dispose: function (argus) {
        var self = this;
        if (self._statesManager && argus.clearCache !== false) {
            self._statesManager.destory();
            self._statesManager = null;
        }
    },
    toJson: function (data) {
        data.states = this._statesManager.toJSON();
    },
    fromJson: function (sheetSettings) {
        var self = this;
        if (sheetSettings && sheetSettings.states) {
            self._statesManager = new _StatesManager(self);
            self._statesManager.fromJSON(sheetSettings.states);
        }
    }
};
Core_1.Worksheet._registerFeature(FeatureName, adapter);
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
//# sourceMappingURL=gc.spread.sheets.cellstate.14.2.5.js.map