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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['Bindings'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/data/data.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/data/binding.js':
/*!**************************************!*\
  !*** ./dist/plugins/data/binding.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Core_1 = __webpack_require__(/*! Core */ 'Core');
var CoreModule = __webpack_require__(/*! Core */ 'Core');
var $ = CoreModule.GC$;
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var data_ns_1 = __webpack_require__(/*! ./data.ns */ './dist/plugins/data/data.ns.js');
var $_isNumeric = $.isNumeric;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var keyword_null = null, keyword_undefined = void 0, const_string = 'string';
var _dataProviders;
exports._dataProviders = _dataProviders;
var dataProviders = exports._dataProviders = _dataProviders = {};
var CELL_BINDING_TYPE = 'cellBinding';
var rm = new Common_1.Common.ResourceManager(data_ns_1.SR, 'Bindings');
var getSR = rm.getResource.bind(rm);


Core_1.Workbook._registerFeature('binding', {
    onCultureChanged: function () {
        getSR();
    }
});
var CellBindingSource = (function () {
    function CellBindingSource(source) {
        this._source = source;
    }


    CellBindingSource.prototype.setValue = function (path, value) {
        setValueByPath(this._source, path, value);
    };


    CellBindingSource.prototype.getValue = function (path) {
        return _getValueByPath(this._source, path);
    };


    CellBindingSource.prototype.getSource = function () {
        return this._source;
    };
    return CellBindingSource;
}());
exports.CellBindingSource = CellBindingSource;


var _BindingManager = (function () {
    function _BindingManager(sheet) {
        this._init(sheet);
    }
    _BindingManager.prototype.bind = function (ds, changes) {
        var self = this, sheet = self._sheet;
        var oldDataSource = self._dataSource;
        if (changes) {
            self._backupChanges(changes, { type: 'bind', oldDataSource: oldDataSource });
        }
        if (oldDataSource) {
            if (oldDataSource._originalSubscribe_) {
                oldDataSource.subscribe = oldDataSource._originalSubscribe_;
                delete oldDataSource._notTriggerChanges_;
                delete oldDataSource._originalSubscribe_;
            }
            if (isFunction(oldDataSource.dispose)) {
                oldDataSource.dispose();
            }
        }
        self._unSubscribeHandlers(self._dataSourceSubscriptions);
        self._unSubscribeHandlers(self._dataItemSubscriptions);
        self._init(sheet);
        self._dataSource = ds;
        if (ds) {
            var dataSourceType = self._dataSourceType = getDataSourceType(ds);
            if (!dataSourceType) {
                throw new Error(getSR().Exp_NotSupportedDataSource);
            }
            self._dataItemType = self._getDataItemType();

            if (sheet) {
                var dataSourceSubscriptions = self._dataSourceSubscriptions;
                var currentPosition = ds.currentPosition;
                if (ds.subscribe) {
                    dataSourceSubscriptions.push(ds.subscribe(self._dataChangedhandler, self));
                }
                if (currentPosition && currentPosition.subscribe) {
                    dataSourceSubscriptions.push(currentPosition.subscribe(self._currentPositionChangedhandler, self));
                }

                if (isFunction(ds.subscribe) && !ds._originalSubscribe_) {
                    var subscribe_1 = ds._originalSubscribe_ = ds.subscribe;
                    ds._notTriggerChanges_ = false;
                    ds.subscribe = function (handler, context) {
                        var args = [].concat.apply([], arguments);
                        var callback = function () {
                            if (!ds._notTriggerChanges_ && isFunction(handler)) {
                                return handler.apply(context, arguments);
                            }
                        };
                        args[0] = callback;
                        return subscribe_1.apply(ds, args);
                    };
                }
                self._doDataItemChanged();
            }
            self._fields = getFieldsInfo(ds, dataSourceType);
        }
        return initBinding(sheet, ds);
    };
    _BindingManager.prototype._doDataItemChanged = function () {
        var self = this, sheet = self._sheet, ds = self._dataSource;
        if (!sheet || !ds) {
            return;
        }
        var dsType = self._dataSourceType;
        self._unSubscribeHandlers(self._dataItemSubscriptions);
        var item = keyword_null;
        if (dsType !== CELL_BINDING_TYPE) {
            var activeRowIndex = sheet.getActiveRowIndex();
            if (ds.currentPosition) {
                if (-1 <= activeRowIndex && activeRowIndex < ds.count()) {
                    ds.currentPosition(activeRowIndex);
                }
                item = ds.currentItem();
            }
            else {
                item = self._getDataItem(activeRowIndex);
            }
        }
        if (item) {
            var activeDataItemChangedhandler = function () {
                if (sheet) {
                    sheet.repaint();
                }
            };
            for (var x in item) {
                if (item[x] && isFunction(item[x].subscribe)) {
                    self._dataItemSubscriptions.push(item[x].subscribe(activeDataItemChangedhandler, keyword_null, keyword_null));
                }
            }
        }
    };
    _BindingManager.prototype._unSubscribeHandlers = function (subscriptions) {
        if (subscriptions) {
            for (var i = 0; i < subscriptions.length; i++) {
                var s = subscriptions[i];
                if (s && isFunction(s.dispose)) {
                    s.dispose();
                }
            }
        }
    };
    _BindingManager.prototype.getRowCount = function () {
        var self = this, ds = self._dataSource, dsType = self._dataSourceType;
        var rc = 0;
        if (ds && dsType && dsType !== CELL_BINDING_TYPE) {
            rc = dataProviders[dsType].getDataLength(ds);
        }
        return rc;
    };
    _BindingManager.prototype.getColumnCount = function () {
        var fields = this._fields;
        if (fields) {
            return fields.length;
        }
        var ds = this._dataSource;
        if (ds) {
            var drow = ds[0], drowType = $.getType(drow);
            if (drowType === 'null' || drowType === const_string || drowType === 'number') {
                return 1;
            }
        }
        return 0;
    };
    _BindingManager.prototype.getSource = function () {
        return this._dataSource;
    };
    _BindingManager.prototype._getFields = function () {
        return this._fields;
    };
    _BindingManager.prototype._setFields = function (value) {
        this._fields = value;
    };
    _BindingManager.prototype._getDataItem = function (row) {
        var ds = this._dataSource, dsType = this._dataSourceType, item = keyword_null;
        if (ds && dsType && dsType !== CELL_BINDING_TYPE) {
            item = dataProviders[dsType].getDataItem(ds, row);
        }
        return item;
    };
    _BindingManager.prototype._getDataItemType = function () {
        var self = this;
        if (!self._dataItemType) {
            var rowCount = self.getRowCount();
            for (var i = 0; i < rowCount; i++) {
                var dataItem = self._getDataItem(i);
                if (dataItem) {
                    self._dataItemType = dataItem.entityAspect && dataItem.entityType || dataItem.constructor;
                    break;
                }
            }
        }
        return self._dataItemType;
    };
    _BindingManager.prototype.getValue = function (row, col) {
        return getBindingValue(this, row, col);
    };
    _BindingManager.prototype.setValue = function (row, col, value, changes) {
        var _this = this;
        if (changes) {
            var oldValue = getBindingValue(_this, row, col).value;
            _this._backupChanges(changes, { type: 'setValue', row: row, col: col, oldValue: oldValue });
        }
        return setBindingValue(_this, row, col, value);
    };
    _BindingManager.prototype._canAdd = function () {
        var ds = dataProviders[this._dataSourceType];
        return ds && ds.canAdd && ds.canAdd();
    };
    _BindingManager.prototype._canInsert = function () {
        var ds = dataProviders[this._dataSourceType];
        return ds && ds.canInsert && ds.canInsert();
    };
    _BindingManager.prototype._canRemove = function () {
        var ds = dataProviders[this._dataSourceType];
        return ds && ds.canRemove && ds.canRemove();
    };
    _BindingManager.prototype.allowSetCount = function () {
        var dsType = this._dataSourceType;
        if (dsType === CELL_BINDING_TYPE) {
            return true;
        }
        var ds = dataProviders[dsType];
        return ds && ds.allowSetCount && ds.allowSetCount();
    };
    _BindingManager.prototype._addItems = function (row, count, changes) {
        var self = this, ds = self._dataSource;
        if (!ds || row > self.getRowCount()) {
            return;
        }
        var dsType = self._dataSourceType, itemType = self._getDataItemType();
        if (dsType && dsType !== CELL_BINDING_TYPE && !self._dataViewUpdating) {
            self._updatingDataView = true;
            if (changes) {
                self._backupChanges(changes, { type: 'addItems', row: row, rowCount: count });
            }
            var sheet = self._sheet;
            var onItemAdded = sheet && sheet.onItemAdded ? sheet.onItemAdded.bind(sheet) : keyword_undefined;
            dataProviders[dsType].addItems(ds, row, count, itemType, onItemAdded);
            self._updatingDataView = false;
        }
    };
    _BindingManager.prototype._removeItems = function (row, count, changes) {
        var self = this, dsType = self._dataSourceType, rowCount = self.getRowCount();
        var ds = self._dataSource;
        if (!ds || row >= rowCount) {
            return;
        }
        if (dsType && dsType !== CELL_BINDING_TYPE && !self._dataViewUpdating) {
            self._updatingDataView = true;
            var sheet = self._sheet;
            var onItemRemoved = sheet && sheet.onItemRemoved ? sheet.onItemRemoved.bind(sheet) : keyword_undefined;
            var removedItems = dataProviders[dsType].removeItems(ds, row, count, onItemRemoved);
            if (changes && removedItems && removedItems.length > 0) {
                self._backupChanges(changes, { type: 'removeItems', row: row, removedItems: removedItems });
            }
            self._updatingDataView = false;
        }
    };
    _BindingManager.prototype._undoRemoveItems = function (row, removedItems) {
        var self = this, ds = self._dataSource;
        var dsType = self._dataSourceType;
        dataProviders[dsType].undoRemoveItems(ds, row, removedItems);
    };
    _BindingManager.prototype._isCellBindingSource = function (ds) {
        return isCellBindingSource(ds || this._dataSource);
    };
    _BindingManager.prototype._init = function (sheet) {
        var self = this;
        self._dataSource = keyword_null;
        self._dataSourceType = '';
        self._dataItemType = keyword_null;
        self._fields = keyword_null;
        self._dataSourceSubscriptions = [];
        self._dataItemSubscriptions = [];
        self._columnBindingInfo = keyword_null;
        self._sheet = sheet;

        resetBinding(sheet);
    };
    _BindingManager.prototype._dataChangedhandler = function (context) {
        var self = this;
        var sheet = self._sheet;
        if (sheet && !self._updatingDataView) {
            if (context) {
                self._dataViewUpdating = true;
                if (!isNaN(context.length)) {
                    sheet.setRowCountCore(context.length);


                    var modelManager = sheet._modelManager;
                    if (isNullOrUndefined(self._fields) && modelManager._getItemCount(false, 3 ) === 0) {
                        self._fields = getFieldsInfo(self._dataSource);
                        sheet.setColumnCount(self.getColumnCount());
                        var fields = self._getFields();
                        if (fields) {
                            for (var i = 0, fieldCount = fields.length; i < fieldCount; i++) {
                                modelManager.do('setItem', false, 3 , i, { name: fields[i] });
                            }
                        }
                    }
                }
                self._dataViewUpdating = false;
            }
            sheet._invalidate();
        }
    };
    _BindingManager.prototype._currentPositionChangedhandler = function () {
        var self = this, sheet = self._sheet, ds = self._dataSource;
        if (sheet && ds && ds.currentPosition) {
            var pos = ds.currentPosition();
            if (sheet._activeRowIndex !== pos) {
                sheet._setActiveCellAndSelection(pos, sheet._activeColIndex, keyword_undefined, keyword_undefined, 2 );
                sheet._invalidate();
            }
        }
    };
    _BindingManager.prototype._backupChanges = function (changes, value) {
        if (this._sheet && this._sheet._modelManager && !isNullOrUndefined(this._sheet._modelManager._inTransaction) && this._sheet._modelManager._inTransaction <= 0) {
            return;
        }
        var bindingChanges = changes._bindingChanges;
        if (!bindingChanges) {
            bindingChanges = changes._bindingChanges = [];
        }
        value.bindingManager = this;
        bindingChanges.push(value);
    };
    _BindingManager.prototype._undo = function (bindingChange) {
        var _this = this;
        var type = bindingChange.type, row = bindingChange.row;
        if (type === 'bind') {
            _this.bind(bindingChange.oldDataSource);
        }
        else if (type === 'setValue') {
            _this.setValue(row, bindingChange.col, bindingChange.oldValue);
        }
        else if (type === 'addItems') {
            _this._removeItems(row, bindingChange.rowCount);
        }
        else if (type === 'removeItems') {
            _this._undoRemoveItems(row, bindingChange.removedItems);
        }
    };
    _BindingManager.prototype.toJSON = function () {
        var ds = this._dataSource;
        if (!ds) {
            return keyword_null;
        }
        var dsType = this._dataSourceType;
        if (dsType === CELL_BINDING_TYPE) {
            ds = ds.getSource();
        }
        else {
            ds = dataProviders[dsType].toJSON(ds);
        }
        return {
            type: dsType,
            source: ds
        };
    };
    _BindingManager.prototype.fromJSON = function (jsData) {
        var ds = jsData && jsData.source;
        if (ds) {
            var dsType = jsData.type, actualDataSource = void 0;
            if (dsType === CELL_BINDING_TYPE) {
                actualDataSource = new CellBindingSource(ds);
            }
            else {
                actualDataSource = dataProviders[dsType].fromJSON(ds);
            }
            if (actualDataSource) {
                this.bind(actualDataSource);
            }
        }
    };
    return _BindingManager;
}());
exports._BindingManager = _BindingManager;
function resetBinding(sheet) {
    var bindingManager = sheet && sheet._bindingManager;
    if (bindingManager && bindingManager._isCellBindingSource()) {
        Core_1.Worksheet._callFeatureHandler(sheet, 'resetBinding', {
            sheet: sheet
        });
    }
}
function initBinding(sheet, data) {
    var bindingManager = sheet && sheet._bindingManager;
    if (bindingManager && bindingManager._isCellBindingSource(data)) {
        sheet.clearPendingChanges();
        Core_1.Worksheet._callFeatureHandler(sheet, 'initBinding', {
            sheet: sheet,
            data: data
        });
        return true;
    }
    return false;
}

function getBindingValue(bindingManager, row, col) {
    var self = bindingManager, ds = self._dataSource, noBindingValue = { value: keyword_null, hasBinding: false };
    if (!ds) {
        return noBindingValue;
    }
    var sheet = self._sheet;
    var dsType = self._dataSourceType;
    var colInfo, field;
    if (dsType === CELL_BINDING_TYPE) {
        var path = sheet ? sheet.getBindingPath(row, col) : keyword_null;
        if (path) {
            return { value: ds.getValue(path), hasBinding: true };
        }
    }
    else {
        if (row < 0 || bindingManager.getRowCount() <= row) {
            return noBindingValue;
        }
        var colCount = sheet ? sheet.getColumnCount() : bindingManager.getColumnCount();
        if (col < 0 || colCount <= col) {
            return noBindingValue;
        }

        if (sheet) {
            if (!self._columnBindingInfo) {
                self._columnBindingInfo = sheet._modelManager._getItems(false, 3 );
            }
            colInfo = self._columnBindingInfo[col];
            if (colInfo) {
                field = colInfo.name;
            }
        }
        else if (bindingManager._fields) {
            if (self._columnBindingInfo) {
                colInfo = self._columnBindingInfo[col];
                if (colInfo) {
                    field = colInfo.dataField;
                }
            }
            else {
                field = bindingManager._fields[col];
            }
        }
        if (dsType) {
            var provider = dataProviders[dsType], colInfo_value = colInfo && colInfo.value, valueFunction = isFunction(colInfo_value) ? colInfo_value : keyword_null;
            return provider.getValue(ds, valueFunction, field, row, col);
        }
    }
    return noBindingValue;
}
function setBindingValue(bindingManager, row, col, value) {
    var self = bindingManager, ds = self._dataSource, valueSet = false;
    if (!ds) {
        return valueSet;
    }
    var sheet = self._sheet;
    var dsType = self._dataSourceType;
    var colInfo, field;
    if (dsType === CELL_BINDING_TYPE) {
        var path = sheet ? sheet.getBindingPath(row, col) : keyword_null;
        if (path) {
            ds.setValue(path, value);
            valueSet = true;
        }
    }
    else {
        if (row < 0 || bindingManager.getRowCount() <= row) {
            return valueSet;
        }
        var colCount = sheet ? sheet.getColumnCount() : bindingManager.getColumnCount();
        if (col < 0 || colCount <= col) {
            return valueSet;
        }
        if (sheet) {
            if (!self._columnBindingInfo) {
                self._columnBindingInfo = sheet._modelManager._getItems(false, 3 );
            }
            colInfo = self._columnBindingInfo[col];
            if (colInfo) {
                field = colInfo.name;
            }
        }
        else if (bindingManager._fields) {
            if (self._columnBindingInfo) {
                colInfo = self._columnBindingInfo[col];
                if (colInfo) {
                    field = colInfo.dataField;
                }
            }
            else {
                field = bindingManager._fields[col];
            }
        }
        if (dsType) {
            var provider = dataProviders[dsType], colInfo_value = colInfo && colInfo.value, valueFunction = isFunction(colInfo_value) ? colInfo_value : keyword_null;
            var onItemUpdated = sheet && sheet.onItemUpdated ? sheet.onItemUpdated.bind(sheet) : keyword_undefined;
            valueSet = provider.setValue(ds, valueFunction, field, row, col, value, onItemUpdated);
        }
    }
    return valueSet;
}
function getDataSourceType(ds) {
    var key = keyword_null;
    if (ds) {
        if (isCellBindingSource(ds)) {
            key = CELL_BINDING_TYPE;
        }
        else {
            $.each(dataProviders, function (k, p) {
                if (p.isDataSource(ds)) {
                    key = k;
                    return false;
                }
            });
        }
    }
    return key;
}
function getFieldsInfo(ds, dsType) {
    if (ds && dsType && dsType !== CELL_BINDING_TYPE) {
        return dataProviders[dsType].getProperties(ds);
    }
    return keyword_null;
}
function isCellBindingSource(ds) {
    return CellBindingSource && ds instanceof CellBindingSource;
}


function isFunction(value) {
    return value instanceof Function;
}
function setValueByPath(obj, path, value) {
    if (!obj || !path) {
        return;
    }

    var valueOrFunction = obj[path];
    if (!isNullOrUndefined(valueOrFunction)) {
        if (isFunction(valueOrFunction)) {
            obj[path](value);
        }
        else {
            obj[path] = value;
        }
        return;
    }
    var subpaths = path.split('.'), subpathCount = subpaths.length;
    for (var i = 0; i < subpathCount; i++) {
        var p = subpaths[i];
        if (!obj) {
            break;
        }
        if (i === subpathCount - 1) {
            if (isFunction(obj[p])) {
                obj[p](value);
            }
            else {
                obj[p] = value;
            }
        }
        else if (isFunction(obj[p])) {
            if (isNullOrUndefined(obj[p]())) {
                obj[p]({});
            }
            obj = obj[p]();
        }
        else {
            if (isNullOrUndefined(obj[p])) {
                obj[p] = {};
            }
            obj = obj[p];
        }
    }
}
exports.setValueByPath = setValueByPath;
function _getValueByPath(obj, path, pathCache) {
    if (!obj || !path) {
        return keyword_null;
    }

    var valueOrFunction = obj[path];
    if (!isNullOrUndefined(valueOrFunction)) {
        if (isFunction(valueOrFunction)) {
            return valueOrFunction();
        }
        else {
            return valueOrFunction;
        }
    }
    var subpaths = null;
    if (pathCache) {
        subpaths = pathCache[path];
        if (!subpaths) {
            subpaths = path.split('.');
            pathCache[path] = subpaths;
        }
    }
    else {
        subpaths = path.split('.');
    }
    var subpathCount = subpaths.length;
    var i = 0;
    do {
        var p = subpaths[i];
        if (isFunction(obj[p])) {
            obj = obj[p]();
        }
        else {
            obj = obj[p];
        }
        if (isNullOrUndefined(obj)) {
            return keyword_null;
        }
        ++i;
    } while (i < subpathCount);
    return obj;
}
exports._getValueByPath = _getValueByPath;


var DefaultBindingSource = (function () {
    function DefaultBindingSource() {
        this.pathCache = {};
    }
    DefaultBindingSource.prototype.isDataSource = function (dataSource) {
        return $.isArray(dataSource);
    };
    DefaultBindingSource.prototype.getDataLength = function (dataSource) {
        return dataSource.length;
    };
    DefaultBindingSource.prototype.getDataItem = function (dataSource, row) {
        return dataSource[row];
    };
    DefaultBindingSource.prototype.addItems = function (dataSource, index, count, itemType) {
        for (var i = 0; i < count; i++) {
            var item = {};
            if (itemType) {
                item = itemType.createEntity ? itemType.createEntity() : new itemType();
            }
            dataSource.splice(index, 0, item);
        }
    };
    DefaultBindingSource.prototype.removeItems = function (dataSource, index, count) {
        var length = this.getDataLength(dataSource);
        if (index < length) {
            return dataSource.splice(index, Math.min(count, length - index));
        }
    };
    DefaultBindingSource.prototype.undoRemoveItems = function (dataSource, index, removedItems) {
        for (var i = 0, count = removedItems.length; i < count; i++) {
            dataSource.splice(index + i, 0, removedItems[i]);
        }
    };
    DefaultBindingSource.prototype.getProperties = function (dataSource) {
        var rc = dataSource.length, fields = keyword_null;
        if (rc > 0) {
            fields = [];
            var t = dataSource[0];
            for (var n in t) {
                if (!isFunction(t[n])) {
                    fields.push(n);
                }
            }
        }
        return fields;
    };
    DefaultBindingSource.prototype.getValue = function (dataSource, valueFunction, field, row, col) {
        var value = keyword_null, hasBinding = false, drow = this.getDataItem(dataSource, row);
        if (!isNullOrUndefined(drow)) {
            if (valueFunction) {
                value = valueFunction(drow);
                hasBinding = true;
            }
            else if (field) {
                value = _getValueByPath(drow, field, this.pathCache);
                hasBinding = true;
            }
            else if (typeof drow === const_string || $_isNumeric(drow)) {
                if (col === 0) {
                    value = drow;
                    hasBinding = true;
                }
            }
        }
        return { value: value, hasBinding: hasBinding };
    };
    DefaultBindingSource.prototype.setValue = function (dataSource, valueFunction, field, row, col, value) {
        var valueSet = false, drow = this.getDataItem(dataSource, row);
        if (!isNullOrUndefined(drow)) {
            if (valueFunction) {
                valueFunction(drow, value);
                valueSet = true;
            }
            else if (field) {
                setValueByPath(drow, field, value);
                valueSet = true;
            }
            else if (typeof drow === const_string || $_isNumeric(drow)) {
                if (col === 0) {
                    dataSource[row] = value;
                    valueSet = true;
                }
            }
        }
        return valueSet;
    };
    DefaultBindingSource.prototype.fromJSON = function (jsData) {
        return jsData;
    };
    DefaultBindingSource.prototype.toJSON = function (dataSource) {
        return dataSource;
    };
    return DefaultBindingSource;
}());
dataProviders.defaultBindingSource = new DefaultBindingSource();
/***/ }),

/***/ './dist/plugins/data/data.dataview.js':
/*!********************************************!*\
  !*** ./dist/plugins/data/data.dataview.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__(/*! Common */ 'Common');
var binding_1 = __webpack_require__(/*! ./binding */ './dist/plugins/data/binding.js');
exports._dataProviders = binding_1._dataProviders;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var keyword_null = null;
var DataViewBinding = (function () {
    function DataViewBinding() {
    }
    DataViewBinding.prototype.isDataSource = function (dataSource) {
        var wijmoTmp = window.wijmo;
        return wijmoTmp && wijmoTmp.data && wijmoTmp.data.isDataView && wijmoTmp.data.isDataView(dataSource);
    };
    DataViewBinding.prototype.getDataLength = function (dataSource) {
        return dataSource.count();
    };
    DataViewBinding.prototype.getDataItem = function (dataSource, row) {
        return dataSource.item(row);
    };
    DataViewBinding.prototype.addItems = function (dataSource, index, count, itemType) {
        if (itemType) {
            for (var i = 0; i < count; i++) {
                dataSource._notTriggerChanges_ = true;
                dataSource.add(itemType.createEntity ? itemType.createEntity() : new itemType());
                dataSource._notTriggerChanges_ = false;
                dataSource.commitEdit();
            }
        }
    };
    DataViewBinding.prototype.removeItems = function (dataSource, index, count) {
        var length = this.getDataLength(dataSource);
        if (index < length) {
            var removedItems = [];
            var removeCount = Math.min(count, length - index);
            for (var r = 0; r < removeCount; r++) {
                var tempItem = dataSource.item(index);
                dataSource.remove(tempItem);
                removedItems.push(tempItem);
            }
            return removedItems;
        }
    };
    DataViewBinding.prototype.undoRemoveItems = function (dataSource, index, removedItems) {
        var sourceData = dataSource.getSource();
        for (var i = 0, count = removedItems.length; i < count; i++) {
            sourceData.splice(index + i, 0, removedItems[i]);
        }

        dataSource.refresh();
    };
    DataViewBinding.prototype.getProperties = function (dataSource) {
        var cc = 0, fields = keyword_null;
        var ps = dataSource.getProperties();
        if (ps && ps.length > 0) {
            cc = ps.length;
            fields = [];
            for (var i = 0; i < cc; i++) {
                fields.push(ps[i].name);
            }
        }
        return fields;
    };
    DataViewBinding.prototype.canInsert = function () {
        return false;
    };
    DataViewBinding.prototype.getValue = function (dataSource, valueFunction, field, row, col) {
        var value = keyword_null, hasBinding = false, drow = this.getDataItem(dataSource, row);
        if (!isNullOrUndefined(drow)) {
            if (valueFunction) {
                value = valueFunction(drow);
                hasBinding = true;
            }
            else if (field) {
                value = dataSource.getProperty(drow, field);
                hasBinding = true;
            }
        }
        return { value: value, hasBinding: hasBinding };
    };
    DataViewBinding.prototype.setValue = function (dataSource, valueFunction, field, row, col, value) {
        var valueSet = false, drow = this.getDataItem(dataSource, row);
        if (!isNullOrUndefined(drow)) {
            if (valueFunction) {
                valueFunction(drow, value);
                valueSet = true;
            }
            else if (field) {
                dataSource.setProperty(drow, field, value);
                valueSet = true;
            }
        }
        return valueSet;
    };
    DataViewBinding.prototype.fromJSON = function (jsData) {
        return jsData;
    };
    DataViewBinding.prototype.toJSON = function (dataSource) {
        return dataSource.local;
    };
    return DataViewBinding;
}());
binding_1._dataProviders.dataViewBinding = new DataViewBinding();
/***/ }),

/***/ './dist/plugins/data/data.entry.js':
/*!*****************************************!*\
  !*** ./dist/plugins/data/data.entry.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__webpack_require__(/*! ./worksheet-databind */ './dist/plugins/data/worksheet-databind.js');
var binding_1 = __webpack_require__(/*! ./binding */ './dist/plugins/data/binding.js');
exports.CellBindingSource = binding_1.CellBindingSource;
exports._BindingManager = binding_1._BindingManager;
exports.setValueByPath = binding_1.setValueByPath;
exports._getValueByPath = binding_1._getValueByPath;
__export(__webpack_require__(/*! ./data.ko */ './dist/plugins/data/data.ko.js'));
__export(__webpack_require__(/*! ./data.dataview */ './dist/plugins/data/data.dataview.js'));
__export(__webpack_require__(/*! ./data.ns */ './dist/plugins/data/data.ns.js'));
/***/ }),

/***/ './dist/plugins/data/data.ko.js':
/*!**************************************!*\
  !*** ./dist/plugins/data/data.ko.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Core = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var binding_1 = __webpack_require__(/*! ./binding */ './dist/plugins/data/binding.js');
exports._dataProviders = binding_1._dataProviders;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined, $ = Core.GC$, $_isFunction = $.isFunction, $_getType = $.getType, $_isNumeric = $.isNumeric;
var keyword_null = null, const_string = 'string';
var window_ko = window.ko;
var KoBinding = (function () {
    function KoBinding() {
    }
    KoBinding.prototype.isDataSource = function (dataSource) {
        return window_ko && window_ko.isObservable(dataSource);
    };
    KoBinding.prototype.getDataLength = function (dataSource) {
        return dataSource().length;
    };
    KoBinding.prototype.getDataItem = function (dataSource, row) {
        return dataSource()[row];
    };
    KoBinding.prototype.addItems = function (dataSource, index, count, itemType) {
        for (var i = 0; i < count; i++) {
            var item = {};
            if (itemType) {
                item = itemType.createEntity ? itemType.createEntity() : new itemType();
            }
            dataSource.splice(index, 0, item);
        }
    };
    KoBinding.prototype.removeItems = function (dataSource, index, count) {
        var length = this.getDataLength(dataSource);
        if (index < length) {
            return dataSource.splice(index, Math.min(count, length - index));
        }
    };
    KoBinding.prototype.undoRemoveItems = function (dataSource, index, removedItems) {
        for (var i = 0, count = removedItems.length; i < count; i++) {
            dataSource.splice(index + i, 0, removedItems[i]);
        }
    };
    KoBinding.prototype.getProperties = function (dataSource) {
        var ds = dataSource();
        var rc = ds.length, fields = [];
        if (rc > 0) {
            var t = ds[0];
            for (var n in t) {
                if (!$_isFunction(t[n])) {
                    fields.push(n);
                }
                else if (window_ko && window_ko.isObservable(t[n])) {
                    fields.push(n);
                }
            }
        }
        return fields;
    };
    KoBinding.prototype.getValue = function (dataSource, valueFunction, field, row, col) {
        var value = keyword_null, hasBinding = false, drow = this.getDataItem(dataSource, row);
        if (!isNullOrUndefined(drow)) {
            if (valueFunction) {
                value = valueFunction(drow);
                hasBinding = true;
            }
            else if (field) {
                value = binding_1._getValueByPath(drow, field);
                hasBinding = true;
            }
            else if ($_getType(drow) === const_string || $_isNumeric(drow)) {
                if (col === 0) {
                    value = drow;
                    hasBinding = true;
                }
            }
        }
        return { value: value, hasBinding: hasBinding };
    };
    KoBinding.prototype.setValue = function (dataSource, valueFunction, field, row, col, value) {
        var valueSet = false, drow = this.getDataItem(dataSource, row);
        if (!isNullOrUndefined(drow)) {
            if (valueFunction) {
                valueFunction(drow, value);
                valueSet = true;
            }
            else if (field) {
                binding_1.setValueByPath(drow, field, value);
                valueSet = true;
            }
            else if ($_getType(drow) === const_string || $_isNumeric(drow)) {
                if (col === 0) {
                    dataSource()[row] = value;
                    valueSet = true;
                }
            }
        }
        return valueSet;
    };
    KoBinding.prototype.fromJSON = function (jsData) {
        return window_ko ? window_ko.observableArray(jsData) : keyword_null;
    };
    KoBinding.prototype.toJSON = function (dataSource) {
        return dataSource();
    };
    return KoBinding;
}());
binding_1._dataProviders.koBinding = new KoBinding();
if (window_ko) {
    var bindingHandlers = window_ko.bindingHandlers;
    bindingHandlers['gc-spread-sheets'] = bindingHandlers['gcspread-sheets'] = bindingHandlers.wijspread = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            if ($(element).data('workbook')) {
                return;
            }
            var options = valueAccessor(), sheets = options && options.sheets;

            var workbook = new Core.Workbook($('#' + element.id)[0], options);
            if (sheets) {
                var sheetTemp = void 0, sheetOptions = void 0, sheets_length = sheets.length, sheetCount = workbook.getSheetCount();
                while (sheetCount < sheets_length) {
                    sheetTemp = workbook._createSheet(workbook._getDefaultSheetName(sheetCount));
                    workbook._addSheetImp(sheetCount, 0 , sheetTemp);
                    sheetCount = workbook.getSheetCount();
                }
                for (var i = 0; i < sheets_length; i++) {
                    sheetTemp = workbook.getSheet(i);
                    sheetOptions = sheets[i];
                    var sheetName = sheetOptions.name, sheetAutoGenerateColumns = sheetOptions.autoGenerateColumns, sheetDataSource = sheetOptions.data, sheetColumns = sheetOptions.columns;

                    if (typeof (sheetName) === const_string && sheetName.length > 0) {
                        sheetTemp._setNameCore(sheetName);
                    }

                    if (typeof (sheetAutoGenerateColumns) === 'boolean') {
                        sheetTemp.autoGenerateColumns = sheetAutoGenerateColumns;
                    }
                    if (sheetDataSource) {
                        sheetTemp.setDataSource(sheetDataSource);
                    }
                    if (sheetColumns && sheetColumns.length > 0) {
                        sheetTemp.autoGenerateColumns = false;
                        sheetTemp.bindColumns(sheetColumns);
                    }
                }
            }
        }, update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        }
    };
}
/***/ }),

/***/ './dist/plugins/data/data.ns.js':
/*!**************************************!*\
  !*** ./dist/plugins/data/data.ns.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var en = __webpack_require__(/*! ./data.res.en */ './dist/plugins/data/data.res.en.js');
exports.SR = {
    en: en
};
/***/ }),

/***/ './dist/plugins/data/data.res.en.js':
/*!******************************************!*\
  !*** ./dist/plugins/data/data.res.en.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_NotSupportedDataSource = 'The data source is not supported!';
/***/ }),

/***/ './dist/plugins/data/worksheet-databind.js':
/*!*************************************************!*\
  !*** ./dist/plugins/data/worksheet-databind.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var binding_1 = __webpack_require__(/*! ./binding */ './dist/plugins/data/binding.js');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
function bindColImp(sheet, index, column) {
    if (typeof column === 'string') {
        column = { name: column };
    }
    sheet._modelManager.do('setItem', false, 3 , index, column);
    var formatter = column && column.formatter, cellType = column && column.cellType;
    if (formatter && sheet.setFormatter) {
        sheet.setFormatter(-1, index, formatter);
    }
    if (cellType) {
        sheet.setCellType(-1, index, cellType);
    }
    if (column && !isNullOrUndefined(column.width)) {
        sheet.setColumnWidth(index, column.width);
    }
}
var $_isEmptyObject = Core_1.GC$.isEmptyObject, $_extend = Core_1.GC$.extend;
var Worksheet_prototype = Core_1.Worksheet.prototype;
var keyword_null = null;
var bindingPathStorageKey = 'bindingPath';
var starSizeReg = new RegExp('^\\d*(\\.\\d+)?\\*$');
var _DateTimeHelper = Common_1.Common._DateTimeHelper;
var sheetEx = {


    getDataSource: function () {
        var bindingManager = this._bindingManager;
        if (bindingManager) {
            return bindingManager.getSource();
        }
        return keyword_null;
    },


    setDataSource: function (data, reset) {
        var self = this, bm = self._bindingManager;
        if (!bm || bm.getSource() === data) {
            return;
        }
        self.suspendPaint();
        if (reset) {
            self._resetImp();
        }
        if (!data) {
            self._bindingManager = new binding_1._BindingManager(self);
        }
        else {
            bm = self._bindingManager;
            bm._isForSheetSetDataSource = true;
            var result = bm.bind(data, self._modelManager._changes);
            if (!result) {
                self.setRowCountCore(bm.getRowCount());
                if (self.autoGenerateColumns) {
                    self.setColumnCount(bm.getColumnCount());
                    var fields = bm._getFields();
                    if (fields) {
                        for (var j = 0, fieldCount = fields.length; j < fieldCount; j++) {
                            self._modelManager.do('setItem', false, 3 , j, { name: fields[j] });
                        }
                    }
                }
            }
        }
        self.clearPendingChanges();
        var refreshAll = false;
        if (bm && bm._isForSheetSetDataSource) {
            refreshAll = bm._isNewRowsAdded;
            delete bm._isNewRowsAdded;
            delete bm._isForSheetSetDataSource;
        }

        self.recalcAll && self.recalcAll(refreshAll);


        var ch = self._getClipboardHelper();
        if (ch && ch._fromSheet === self) {
            ch._reset();
        }
        self.resumePaint();
    },


    bindColumn: function (index, column) {
        var self = this;
        self.suspendPaint();
        try {
            bindColImp(self, index, column);
        }
        finally {
            self.resumePaint();
        }
    },


    bindColumns: function (columns) {
        var self = this;
        self.suspendPaint();
        try {
            if (columns) {
                var length_1 = columns.length;
                if (!isNaN(length_1)) {
                    self.setColumnCount(length_1);
                }
                for (var i = 0; i < length_1; i++) {
                    var column = columns[i], size = column.size;
                    if (starSizeReg.test(size)) {
                        column.starSize = size;
                    }
                    bindColImp(self, i, column);
                }
            }
        }
        finally {
            self.resumePaint();
        }
    },


    getDataItem: function (row) {
        var self = this, bm = self._bindingManager;
        if (!bm || bm.getRowCount() === 0) {
            return keyword_null;
        }
        var cc = self.getColumnCount();
        var t = {};
        var rowItem = bm._getDataItem(row);
        if (rowItem) {
            for (var x in rowItem) {
                if (rowItem.hasOwnProperty(x) && typeof x !== 'function') {
                    t[x] = rowItem[x];
                }
            }
        }
        for (var i = 0; i < cc; i++) {
            var ci = self._modelManager._getItem(false, 3 , i);
            if (ci && ci.name && ci.name.length > 0 && isNullOrUndefined(t[ci.name])) {
                t[ci.name] = self.getValue(row, i);
            }
        }
        return t;
    },


    getDataColumnName: function (column) {
        var self = this;
        if (0 <= column && column < self.getColumnCount() && self.getDataSource()) {
            var ci = self._modelManager._getItem(false, 3 , column);
            return ci && (ci.displayName || ci.name);
        }
        return keyword_null;
    },


    getBindingPath: function (row, col) {
        return this._modelManager.getValueForKey(row, col, bindingPathStorageKey);
    },


    setBindingPath: function (row, col, path) {
        var self = this;
        self._modelManager.do('setValueForKey', row, col, bindingPathStorageKey, path);
        self._invalidate();
        return self;
    }
};
$_extend(Worksheet_prototype, sheetEx);


Core_1.CellRange.prototype.bindingPath = Core_1.CellRange._defProperty(Worksheet_prototype.getBindingPath, Worksheet_prototype.setBindingPath);

function _serializeSheetDataSource(sheet, dataTable, rowCount, colCount) {
    var bindingManager = sheet._bindingManager;
    for (var r = 0; r < rowCount; r++) {
        for (var c = 0; c < colCount; c++) {
            var boundValue = bindingManager.getValue(r, c).value;
            if (!isNullOrUndefined(boundValue)) {
                var convertedValue = boundValue;
                if (_DateTimeHelper._isDate(boundValue)) {
                    convertedValue = _DateTimeHelper._toOADateString(boundValue);
                }
                sheet._setValueToDataTable(dataTable, r, c, convertedValue);
            }
        }
    }
}
function _serializeColumnHeaderNames(sheet, colHeaderDataTable, colHeaderRowCount, colHeaderColCount) {
    var colHeaderAutoTextIndex = sheet.options.colHeaderAutoTextIndex;
    for (var r = 0; r < colHeaderRowCount; r++) {
        if ((colHeaderAutoTextIndex >= 0 && r === colHeaderAutoTextIndex) || (colHeaderAutoTextIndex === -1 && r === (colHeaderRowCount - 1))) {
            for (var c = 0; c < colHeaderColCount; c++) {
                var value = colHeaderDataTable[r] && colHeaderDataTable[r][c] && colHeaderDataTable[r][c].value;
                var colInfo = sheet._modelManager._getItem(false, 3 , c);
                if (isNullOrUndefined(value) && colInfo) {
                    var displayNameOrName = colInfo.displayName || colInfo.name;
                    if (displayNameOrName) {
                        sheet._setValueToDataTable(colHeaderDataTable, r, c, displayNameOrName);
                    }
                }
            }
        }
    }
}
Core_1.Worksheet._registerFeature('binding', {
    init: function () {
        var self = this;


        self.autoGenerateColumns = true;
        self._bindingManager = new binding_1._BindingManager(self);
    },
    dispose: function (argus) {
        var self = this;
        if (argus.clearCache !== false) {
            self._bindingManager = keyword_null;
        }
    },
    onLayoutChanged: function (args) {
        var self = this, changeType = args.changeType, row = args.row, rowCount = args.rowCount, sheetArea = args.sheetArea;
        var bm = self._bindingManager;
        if (changeType === 'addingRows') {
            if (bm && bm._canAdd() === false) {
                args.canAdd = false;
            }
            else if (bm && bm._canInsert() === false) {
                args.newRow = self.getRowCount();
            }
        }
        else if (changeType === 'addRows') {
            if (bm) {
                bm._addItems(row, rowCount, self._modelManager._changes);
            }
        }
        else if (changeType === 'deletingRows') {
            if (bm) {
                if (bm._canRemove() === false) {
                    args.canDelete = false;
                }
                else {
                    if (!self._deletedRows) {
                        self._deletedRows = [];
                    }
                    var deletedRows = self._deletedRows;
                    var modelManager = self._modelManager;
                    var dataLength = bm.getRowCount();
                    for (var i = 0; i < rowCount && row + i < modelManager.getRowCount(); i++) {
                        var d = keyword_null;
                        if (row + i < dataLength) {
                            d = bm._getDataItem(row + i);
                        }
                        deletedRows.push({ row: row + i, data: d });
                    }
                }
            }
        }
        else if (changeType === 'deleteRows') {
            if (bm) {
                bm._removeItems(row, rowCount, self._modelManager._changes);
            }
        }
        else if (changeType === 'settingRowCount') {
            if (bm.getSource() && !bm.allowSetCount() && (sheetArea === 3 || sheetArea === 2 )) {
                args.canSet = false;
            }
        }
    },
    toJson: function (dataDic, serializationOption) {
        var sheet = this, colCount = sheet.getColumnCount();
        var dataSource = sheet.getDataSource();
        if (serializationOption && serializationOption.includeBindingSource && dataSource) {
            var dataTable = dataDic.data.dataTable || {};
            _serializeSheetDataSource(sheet, dataTable, sheet.getRowCount(), colCount);
            if (!$_isEmptyObject(dataTable)) {
                dataDic.data.dataTable = dataTable;
            }

            var colHeaderDataTable = dataDic.colHeaderData.dataTable || {};
            _serializeColumnHeaderNames(sheet, colHeaderDataTable, sheet.getRowCount(1 ), colCount);
            if (!$_isEmptyObject(colHeaderDataTable)) {
                dataDic.colHeaderData.dataTable = colHeaderDataTable;
            }
        }
        var autoGenerateColumns = sheet.autoGenerateColumns;
        if (autoGenerateColumns !== true) {
            dataDic.autoGenerateColumns = sheet.autoGenerateColumns;
        }
    },
    fromJson: function (sheetSettings, noSchema) {
        var sheet = this;
        sheet._bindingManager = new binding_1._BindingManager(sheet);
        if (noSchema) {
            var bm = sheet._bindingManager, dataSource = sheetSettings.dataSource, dataBinding = sheetSettings.dataBinding;
            if (dataSource) {
                bm.bind(dataSource);
            }
            if (dataBinding) {
                bm.fromJSON(dataBinding, noSchema);
            }
        }
        var autoGenerateColumns = sheetSettings.autoGenerateColumns;
        if (!isNullOrUndefined(autoGenerateColumns)) {
            sheet.autoGenerateColumns = autoGenerateColumns;
        }
    },
    preFromJson: function () {
        this._bindingManager = new binding_1._BindingManager(this);
    }
});
Core_1._SheetModelManager._registerFeature('binding', {
    priority: 6000,
    getValue: function (argObj) {
        var row = argObj.row, col = argObj.col, sheetArea = argObj.sheetArea;
        var bm = this._sheet._bindingManager, returnObj;
        if (sheetArea === 3 && bm && bm._dataSource) {
            returnObj = bm.getValue(row, col);
            argObj.isValueGet = returnObj.hasBinding;
            argObj.value = returnObj.value;
        }
    },
    setValue: function (argObj) {
        var row = argObj.row, col = argObj.col, value = argObj.value, sheetArea = argObj.sheetArea;
        var sheet = this._sheet, bm = sheet._bindingManager;
        if (sheetArea === 3 && bm && bm._dataSource) {
            var bdValue = bm.getValue(row, col);
            if (bdValue.hasBinding) {
                var oldValue = bdValue.value;
                if (value !== oldValue) {
                    if (!sheet.isDirtySuspended()) {
                        var oldItem = sheet.getDataItem(row);
                        this._updateDirty(row, col, { _originalItem: oldItem, _oldValue: oldValue }, sheetArea);
                    }
                    argObj.isValueSet = bm.setValue(row, col, value, sheet._modelManager._changes);
                }
                else {
                    argObj.isValueSet = bm._dataSourceType !== 'dataManagerBindingSource';
                }
            }
        }
    },
    undo: function (changes) {
        var bindingChanges = changes._bindingChanges;
        if (bindingChanges) {
            for (var i = bindingChanges.length - 1; i >= 0; i--) {
                var change = bindingChanges[i];
                change.bindingManager._undo(change);
            }
        }
    }
});
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
//# sourceMappingURL=gc.spread.sheets.bindings.14.2.5.js.map