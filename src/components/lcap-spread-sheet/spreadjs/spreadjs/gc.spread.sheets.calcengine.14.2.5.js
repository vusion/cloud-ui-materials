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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['CalcEngine'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/sheetsCalc/sheetsCalc.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/sheetsCalc/calc-spreadjs.js':
/*!**************************************************!*\
  !*** ./dist/plugins/sheetsCalc/calc-spreadjs.js ***!
  \**************************************************/
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
var Core = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Calc3 = __webpack_require__(/*! ./parser-sheets */ './dist/plugins/sheetsCalc/parser-sheets.js');
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var calc_ns_1 = __webpack_require__(/*! ./calc.ns */ './dist/plugins/sheetsCalc/calc.ns.js');
var Types = Common_1.Common._Types, stringHelper = Common_1.Common._StringHelper;
var extend = Types._extend;
var isEmptyObject = Types._isEmptyObject;
var keyword_null = null, keyword_undefined = void 0;
var CalcValueTypeStrings = ['v', 'n', 's', 'b', 'd', 'sn'];
var CalcErrorsValue = CalcEngine_1.Errors.Value, CalcErrorsCalc = CalcEngine_1.Errors.Calc;
var GeneralFormatter = Common_1.Formatter && Common_1.Formatter.GeneralFormatter;
var isError = CalcEngine_1.Convert._isError, isReference = CalcEngine_1.Convert._isReference, isArray = CalcEngine_1.Convert._isArray;
var CalcErrorsReference = CalcEngine_1.Errors.Reference;
var CalcErrorsNotAvailable = CalcEngine_1.Errors.NotAvailable;
var CalcErrorsName = CalcEngine_1.Errors.Name;
var addElements = Common_1.Common._addElements;
var deleteElements = Common_1.Common._deleteElements;
var isNullOrUndefined = Types._isNullOrUndefined;
var isNumeric = function (value) {
    return CalcEngine_1.Convert._isNumber(value, true);
};
var range_contains = Core_1.Range.prototype.contains;
var toUpperCase = stringHelper._toUpperCase;
var const_number = 'number';

var calcSourcePrototype = CalcEngine_1.CalcSource.prototype;

calcSourcePrototype.referenceToArray = function (reference, valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank, followFormatter, ignoreBoolean) {
    var self = this, row, col, rowCount = 1, colCount = 1, startRow, startCol, rangeCount, result = [], value, rowValues;
    rangeCount = reference.getRangeCount();
    if (rangeCount === 0) {
        result.isError = true;
        return result;
    }
    var maxRowCount = self.getRowCount(), maxColCount = self.getColumnCount();
    toOneDimension = toOneDimension === keyword_undefined ? true : toOneDimension;
    for (var rangeIndex = 0; rangeIndex < rangeCount; rangeIndex++) {
        if (!toOneDimension) {
            rowValues = [];
            result.push(rowValues);
        }
        rowCount = reference.getRowCount(rangeIndex);
        if (rowCount === 0) {
            result.isError = true;
            return result;
        }
        colCount = reference.getColumnCount(rangeIndex);
        if (colCount === 0) {
            result.isError = true;
            return result;
        }
        startRow = reference.getRow(rangeIndex);
        startCol = reference.getColumn(rangeIndex);
        if (startRow >= maxRowCount || startCol >= maxColCount) {
            result = [keyword_null];
            result.rowCount = 1;
            result.colCount = 1;
            result.rangeCount = 1;
            return result;
        }
        if (startRow + rowCount > maxRowCount) {
            rowCount = maxRowCount - startRow;
        }
        if (startCol + colCount > maxColCount) {
            colCount = maxColCount - startCol;
        }


        var colValues = void 0;
        for (var i = 0; i < rowCount; i++) {
            row = startRow + i;
            if (!toOneDimension) {
                colValues = [];
                rowValues.push(colValues);
            }
            for (var j = 0; j < colCount; j++) {
                col = startCol + j;
                value = self.getValue(row, col);
                if (breakOnError && CalcEngine_1.Convert._isError(value)) {
                    result = [value];
                    result.isError = true;
                    return result;
                }
                value = CalcEngine_1.Convert._convertValue(value, valueType, !CalcEngine_1.ExcelCompatibleCalcMode, ignoreBlank, ignoreBoolean);
                if (breakOnConvertError && value === CalcEngine_1.Convert.CalcConvertedError) {
                    result = [CalcErrorsValue];
                    result.isConvertError = true;
                    return result;
                }
                if (value === keyword_null && ignoreBlank) {

                }
                else if (toOneDimension) {
                    result.push(value);
                }
                else {
                    colValues.push(value);
                }
            }
        }
    }
    if (!toOneDimension && rangeCount === 1) {
        result = result[0];
    }
    result.rowCount = rowCount;
    result.colCount = colCount;
    result.rangeCount = rangeCount;
    return result;
};
calcSourcePrototype.getSheetReference = function () {
    var self = this;
    self._reference = self._reference || (new CalcEngine_1.CalcReference(self));
    return self._reference;
};


var ReferenceStyle;
(function (ReferenceStyle) {
    ReferenceStyle[ReferenceStyle['a1'] = 0] = 'a1';

    ReferenceStyle[ReferenceStyle['r1c1'] = 1] = 'r1c1';
})(ReferenceStyle = exports.ReferenceStyle || (exports.ReferenceStyle = {}));
Core.ReferenceStyle = ReferenceStyle;

var NameInfo = (function () {
    function NameInfo(name, expr, row, column, comment) {
        var self = this;
        self._name = name;
        self._baseRow = row;
        self._baseColumn = column;
        self._expr = expr;
        if (!isNullOrUndefined(comment)) {
            self._comment = comment;
        }
    }


    NameInfo.prototype.getName = function () {
        return this._name;
    };


    NameInfo.prototype.getRow = function () {
        return this._baseRow;
    };


    NameInfo.prototype.getColumn = function () {
        return this._baseColumn;
    };


    NameInfo.prototype.getExpression = function () {
        return this._expr;
    };


    NameInfo.prototype.getComment = function () {
        return this._comment;
    };

    NameInfo.prototype._setExpression = function (expr, changeInfo) {
        if (changeInfo) {
            changeInfo.push({ type: 'customName', nameInfo: this, expr: this._expr });
        }
        this._expr = expr;
    };
    return NameInfo;
}());
exports.NameInfo = NameInfo;
Core.NameInfo = NameInfo;

CalcEngine_1.CalcSource.prototype.createSourceModel = function (service) {
    return new CalcEngine_1.CalcSourceModel(service, this);
};

var SheetRangeReference = (function (_super) {
    __extends(SheetRangeReference, _super);
    function SheetRangeReference(references) {
        var _this = _super.call(this, keyword_null) || this;
        _this.references = references;
        return _this;
    }
    SheetRangeReference.prototype.toArray = function (valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank) {
        var references = this.references;
        var result = [];
        for (var i = 0; i < references.length; i++) {
            var arr = references[i]._source.referenceToArray(references[i], valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank);
            if (arr.isError && breakOnError) {
                return arr;
            }
            if (toOneDimension) {
                Array.prototype.push.apply(result, arr);
            }
            else {
                result.push(arr[0]);
            }
            if (!i) {
                result.rowCount = arr.rowCount;
                result.colCount = arr.colCount;
            }
        }
        result.rangeCount = references.length;
        return result;
    };
    return SheetRangeReference;
}(CalcEngine_1.CalcReference));
exports.SheetRangeReference = SheetRangeReference;
var SheetParserContext = (function (_super) {
    __extends(SheetParserContext, _super);
    function SheetParserContext(sheet, useR1C1, identity, option) {
        var _this = _super.call(this, sheet && sheet._getSheetSource(), useR1C1, identity, option) || this;


        if (!sheet) {
            sheet = SheetParserContext._CacheSheet = SheetParserContext._CacheSheet || new Core_1.Worksheet();
        }
        _this._sheet = sheet;
        _this.row = identity && identity.row || 0;
        _this.column = identity && identity.col || 0;

        var service = sheet.getCalcService();
        var resolves = service.getResolvers();
        for (var i = 0; i < resolves.length; i++) {
            if (resolves[i] instanceof Calc3.SheetReferenceResolver) {
                return _this;
            }
        }
        service.addResolver(new Calc3.SheetReferenceResolver(sheet));
        service.addResolver(new Calc3.StructureReferenceResolver(sheet));
        return _this;
    }
    SheetParserContext.prototype.getExternalSource = function (bookName, sheetName) {
        var self = this;
        var workbook = self._sheet.parent;
        if (bookName && (!workbook || workbook.name !== bookName)) {
            return keyword_null;
        }
        else if (!workbook) {
            return stringHelper._compareStringIgnoreCase(self._sheet.name(), sheetName) ? self._sheet._getSheetSource() : keyword_null;
        }
        var sc = workbook.sheets;
        if (sc && sc.length > 0) {
            for (var i = 0; i < sc.length; i++) {
                var sheet = sc[i];
                if (stringHelper._compareStringIgnoreCase(sheet.name(), sheetName)) {
                    return sheet._getSheetSource();
                }
            }
        }
        return CalcEngine_1.ParserContext.prototype.getExternalSource.call(this, bookName, sheetName);
    };

    SheetParserContext.prototype.getExternalSourceToken = function (source) {
        return source.getName();
    };
    SheetParserContext.prototype.getTableByName = function (name) {
        var tm = this._sheet.tables, table;
        table = tm ? tm.findByName(name) : keyword_null;
        if (!table) {
            var sheets = this._sheet.parent && this._sheet.parent.sheets;
            if (sheets) {
                for (var i = 0; i < sheets.length; i++) {
                    tm = sheets[i].tables;
                    if (tm) {
                        table = tm.findByName(name);
                        if (table) {
                            break;
                        }
                    }
                }
            }
        }
        if (!table) {
            return this._sheet.parent && this._sheet.parent.getSheetTab(name);
        }
        return table;
    };
    SheetParserContext.prototype.getTableByIndex = function (rowIndex, columnIndex) {
        var tm = this._sheet.tables;
        return tm ? tm.find(rowIndex, columnIndex) : keyword_null;
    };
    SheetParserContext.prototype.setSource = function (source) {
        this.source = source;
        var sheetSource = source;
        if (sheetSource && sheetSource.getSheet) {
            this._sheet = sheetSource.getSheet();
        }
    };
    SheetParserContext.prototype._dispose = function () {
        if (this._sheet && this._sheet !== SheetParserContext._CacheSheet) {
            this._sheet._dispose();
        }
        this._sheet = keyword_null;
    };
    return SheetParserContext;
}(CalcEngine_1.ParserContext));
exports.SheetParserContext = SheetParserContext;
var rm = new Common_1.Common.ResourceManager(Core_1.SR);
function getPrefixFormula(formula) {
    if (formula.indexOf('LET(') > -1) {
        return 'LET';
    }
    return false;
}
var SheetSource = (function (_super) {
    __extends(SheetSource, _super);
    function SheetSource(sheet, sheetArea) {
        var _this = _super.call(this, keyword_null) || this;
        _this.getCalcSourceModel = function () {
            return this._calcSourceModel;
        };
        _this.createSourceModel = function (calcService) {
            return new CalcEngine_1.CalcSourceModel(calcService, this);
        };
        _this.getRangeKey = function (source, range) {
            return source.id + ',' + range.row + ',' + range.col + ',' + range.rowCount + ',' + range.colCount;
        };
        _this.getSheetRangeReference = function (identity) {
            var sheet = this._sheet, parent = sheet && sheet.parent;
            if (identity.endSource && parent && parent.sheets && (identity.endSource instanceof SheetSource)) {
                var sheets = parent.sheets, searched = false, source = void 0, references = [];
                for (var i = 0; i < sheets.length; i++) {
                    source = sheets[i]._getSheetSource();
                    if (source === this) {
                        searched = true;
                    }
                    else if (source === identity.endSource) {
                        references.push(source.getReference(identity));
                        break;
                    }
                    if (searched) {
                        references.push(source.getReference(identity));
                    }
                }
                return new SheetRangeReference(references);
            }
        };
        _this._sheet = sheet;
        _this._sheetArea = sheetArea ? sheetArea : 3;
        return _this;
    }
    SheetSource.prototype.startCalculation = function () {
        if (this._valueCaches) {
            return;
        }
        this._resetValueCache();
    };
    SheetSource.prototype.endCalculation = function () {
        this._valueCaches = keyword_null;
        this._triggerEvent();
        this._changedCells = keyword_null;
        var rangeCalc = this._calcSourceModel._getRangeCalc(false);
        if (rangeCalc) {
            rangeCalc.clearListenersCache();
        }
        if (this._service.calcOnDemand) {
            this._sheet.repaint();
        }
    };
    SheetSource.prototype._triggerRangChangedEventAsync = function () {
        var self = this;
        if (self._rangeChangedEventTask) {
            if (self._changedCells) {
                self._changedCellsAsyncCache = self._changedCellsAsyncCache.concat(self._changedCells);
                self._changedCells = [];
            }
        }
        else {
            self._changedCellsAsyncCache = self._changedCells || [];
            self._rangeChangedEventTask = setTimeout(function () {
                self._triggerEvent(self._changedCellsAsyncCache);
                delete self._changedCellsAsyncCache;
                delete self._rangeChangedEventTask;
            }, 0);
        }
    };
    SheetSource.prototype._triggerEvent = function (changedCellsCache) {
        var changedCells = changedCellsCache || this._changedCells;
        if (changedCells && changedCells.length > 0) {
            var sheet = this._sheet;
            sheet._trigger(Core_1.Events.RangeChanged, {
                isUndo: false,
                sheet: sheet,
                sheetName: sheet.name(),
                row: 0,
                col: 0,
                rowCount: sheet.getRowCount(),
                colCount: sheet.getColumnCount(),
                changedCells: changedCells,
                action: 6
            }, sheet._needCalcEvent);
        }
    };
    SheetSource.prototype.clearValueCache = function () {
        this._resetValueCache();
    };
    SheetSource.prototype._resetValueCache = function () {
        var rowCount = this.getRowCount(), colCount = this.getColumnCount();
        this._valueCaches = { rowCount: rowCount, colCount: colCount, arrayInfo: [] };
        this._changedCells = [];
    };
    SheetSource.prototype._setCacheItemsToNull = function () {
        this._valueCaches = keyword_null;
        this._changedCells = keyword_null;
    };
    SheetSource.prototype.getValue = function (identity, valueType) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var self = this, sheet = self._sheet, row, column;
        if (typeof identity === const_number) {
            row = arguments[0];
            column = arguments[1];
            valueType = arguments[2];
        }
        else {
            identity = identity;
            if (identity.row !== keyword_undefined) {
                row = identity.row;
                column = identity.col;
            }
            else if (identity.name) {
                return null;
            }
        }
        var sheetArea = self._sheetArea;
        valueType = valueType || 0 ;

        if (row < 0 || column < 0) {
            return CalcErrorsValue;
        }
        if (sheet._isValidatingCell && sheet._validatingRow === row && sheet._validatingColumn === column) {
            return sheet._validatingValue;
        }
        var cache = self._valueCaches, typeString = CalcValueTypeStrings[valueType];
        if (cache) {
            var rowCount = cache.rowCount, colCount = cache.colCount, rowCache = void 0, cellCache = void 0, value = void 0;
            if (row >= rowCount) {
                return keyword_null;
            }
            if (column >= colCount) {
                return keyword_null;
            }
            rowCache = cache[row];
            if (!rowCache) {
                rowCache = cache[row] = {};
            }
            cellCache = rowCache[column];
            if (!cellCache) {
                cellCache = rowCache[column] = { v: sheet.getValue(row, column, sheetArea) };
            }
            value = cellCache[typeString];
            if (value === keyword_undefined) {
                value = CalcEngine_1.Convert._convertValue(cellCache.v, valueType, !CalcEngine_1.ExcelCompatibleCalcMode);
                cellCache[typeString] = value;
            }
            value = Core_1._util._tryConvertOADateToDate(value);
            return value;
        }
        else if (row >= self.getRowCount()) {
            return keyword_null;
        }
        if (column >= self.getColumnCount()) {
            return keyword_null;
        }
        return self._sheet.getValue(row, column, sheetArea);
    };
    SheetSource.prototype.getIdentity = function (context, ref) {
        var self = this;
        var row = ref.row, rowCount = ref.rowCount || 1, col = ref.column, colCount = ref.columnCount || 1;
        if (row === -1) {
            row = 0;
            rowCount = self.getRowCount();
        }
        if (col === -1) {
            col = 0;
            colCount = self.getColumnCount();
        }
        return self.getName() + '.' + row + '.' + rowCount + '.' + col + '.' + colCount;
    };
    SheetSource.prototype.getReference = function (identity) {
        var self = this, row = identity.row, col = identity.col;
        if (row === -1) {
            identity.row = 0;
            identity.rowCount = self.getRowCount();
        }
        if (col === -1) {
            identity.col = 0;
            identity.colCount = self.getColumnCount();
        }
        var isSpillError = false;
        if (identity.spillRef) {
            var anchor = self._getDynamicArrayManager().getAnchorCell(row, col);
            if (!anchor) {
                var calcSourceModel = self.getCalcSourceModel();

                var arrayInfo = calcSourceModel._getArrayInfo(row, col);
                if (arrayInfo) {
                    if (arrayInfo.row === row && arrayInfo.col === col) {
                        identity.rowCount = arrayInfo.rowCount;
                        identity.colCount = arrayInfo.colCount;
                        return new CalcEngine_1.CalcReference(self, [identity]);
                    }
                    else {
                        return;
                    }
                }

                var expr = calcSourceModel._getExpr(row, col);


                if (expr && expr.type === 33 ) {
                    isSpillError = true;
                    identity.rowCount = 1;
                    identity.colCount = 1;
                }
                else if (expr && (expr.functionName === '@' || expr instanceof CalcEngine_1.ReferenceExpression)) {
                    identity.rowCount = 1;
                    identity.colCount = 1;
                    return new CalcEngine_1.CalcReference(self, [identity]);
                }
                else {
                    return;
                }
            }
            else {
                identity.rowCount = anchor.rowCount;
                identity.colCount = anchor.colCount;
                isSpillError = !anchor.isValid;
            }
        }
        var calcReference = new CalcEngine_1.CalcReference(self, [identity]);
        if (isSpillError) {
            calcReference.isSpillError = true;
        }
        return calcReference;
    };
    SheetSource.prototype.getSources = function (endSource) {
        if (this._sheet && this._sheet.parent && this._sheet.parent.sheets && (endSource instanceof SheetSource)) {
            var sheets = this._sheet.parent.sheets, searched = false, source = void 0, sources = [];
            for (var i = 0; i < sheets.length; i++) {
                source = sheets[i]._getSheetSource();
                if (source === this) {
                    searched = true;
                }
                if (source === endSource) {
                    sources.push(source);
                    break;
                }
                if (searched) {
                    sources.push(source);
                }
            }
            return sources;
        }
    };
    SheetSource.prototype._removeDirtyCachedArrayItem = function (row, column) {
        var self = this;
        var valueCaches = self._valueCaches, keys = valueCaches && valueCaches.arrayInfo;
        if (keys) {
            var hasChanges_1 = false;
            keys.forEach(function (item, index) {
                if (item) {
                    var reference = item.reference, key = item.key;
                    if (range_contains.call(reference._identities[0], row, column)) {
                        delete valueCaches[key];
                        keys[index] = keyword_undefined;
                        hasChanges_1 = true;
                    }
                }
            });
            if (hasChanges_1) {
                valueCaches.arrayInfo = [];
                keys.forEach(function (item) {
                    if (item) {
                        valueCaches.arrayInfo.push(item);
                    }
                });
            }
        }
    };
    SheetSource.prototype.referenceToArray = function (reference, valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank, followFormatter, ignoreBoolean) {
        var self = this, row, col, rowCount = 1, colCount = 1, startRow, startCol, rangeCount, result = [], value, rowValues, sheet = self._sheet, valueCaches = self._valueCaches, rowCaches, cacheKey, typeString = CalcValueTypeStrings[valueType];
        rangeCount = reference.getRangeCount();
        if (rangeCount === 0) {
            result.isError = true;
            return result;
        }
        if (valueCaches) {
            cacheKey = reference.getRangeCount() + '_' + reference.getRow(0) + '_' + reference.getColumn(0) + '_' + reference.getRowCount(0) + '_' + reference.getColumnCount(0) + '_' + valueType + '_' + toOneDimension;
            value = valueCaches[cacheKey];
            if (value) {
                return value;
            }
        }
        var maxRowCount = this.getRowCount(), maxColCount = this.getColumnCount();
        toOneDimension = toOneDimension === keyword_undefined ? true : toOneDimension;
        for (var rangeIndex = 0; rangeIndex < rangeCount; rangeIndex++) {
            if (!toOneDimension) {
                rowValues = [];
                result.push(rowValues);
            }
            rowCount = reference.getRowCount(rangeIndex);
            if (rowCount === 0) {
                result.isError = true;
                return result;
            }
            colCount = reference.getColumnCount(rangeIndex);
            if (colCount === 0) {
                result.isError = true;
                return result;
            }
            startRow = reference.getRow(rangeIndex);
            startCol = reference.getColumn(rangeIndex);
            if (startRow >= maxRowCount || startCol >= maxColCount) {
                result = (toOneDimension ? [keyword_null] : [[keyword_null]]);
                result.rowCount = 1;
                result.colCount = 1;
                result.rangeCount = 1;
                return result;
            }
            if (startRow + rowCount > maxRowCount) {
                rowCount = maxRowCount - startRow;
            }
            if (startCol + colCount > maxColCount) {
                colCount = maxColCount - startCol;
            }
            var colValues = void 0, t = void 0, needConsideValidating = sheet._isValidatingCell;
            for (var i = 0; i < rowCount; i++) {
                row = startRow + i;
                if (!toOneDimension) {
                    colValues = [];
                    rowValues.push(colValues);
                }
                if (valueCaches) {
                    if (!valueCaches[row]) {
                        valueCaches[row] = {};
                    }
                    rowCaches = valueCaches[row];
                }
                for (var j = 0; j < colCount; j++) {
                    col = startCol + j;
                    if (needConsideValidating && sheet._validatingRow === row && sheet._validatingColumn === col) {
                        value = sheet._validatingValue;
                        needConsideValidating = false;
                    }
                    else {
                        if (valueCaches) {
                            t = rowCaches[col];
                            if (t) {
                                value = t.v;
                            }
                            else {
                                value = sheet.getValue(row, col, self._sheetArea);
                                t = rowCaches[col] = { v: value };
                            }
                        }
                        else {
                            value = sheet.getValue(row, col, self._sheetArea);
                        }
                        if (followFormatter) {
                            var formatter = sheet.getFormatter(), formatterString = void 0;
                            if (formatter instanceof GeneralFormatter) {
                                formatterString = formatter.formatString();
                            }
                            else {
                                formatterString = formatter;
                            }
                            if (formatterString === '@') {
                                value = sheet.getText(row, col);
                            }
                            else if (value instanceof Date) {
                                value = Types._toDouble(value);
                            }
                            if (!isEmptyObject(t)) {
                                t = rowCaches[col] = { v: value };
                            }
                        }
                        if (breakOnError && CalcEngine_1.Convert._isError(value)) {
                            result = [value];
                            result.isError = true;
                            return result;
                        }
                        if (t && t[typeString] !== keyword_undefined) {
                            value = t[typeString];
                        }
                        else {
                            value = CalcEngine_1.Convert._convertValue(value, valueType, !CalcEngine_1.ExcelCompatibleCalcMode, ignoreBlank, ignoreBoolean);
                            if (t) {
                                t[typeString] = value;
                            }
                            if (breakOnConvertError && t === value) {
                                result = [CalcErrorsValue];
                                result.isConvertError = true;
                                return result;
                            }
                        }
                    }
                    if (CalcEngine_1.Convert._judgeBlankChar(value, ignoreBlank)) {
                    }
                    else if (toOneDimension) {
                        result.push(value);
                    }
                    else {
                        colValues.push(value);
                    }
                }
            }
        }
        if (!toOneDimension && rangeCount === 1) {
            result = result[0];
        }
        result.rowCount = rowCount;
        result.colCount = colCount;
        result.rangeCount = rangeCount;

        if (valueCaches && !isNaN(rangeCount) && !isNaN(rowCount) && !isNaN(colCount)
            && (rangeCount * rowCount * colCount) > 100
            && (rangeCount * rowCount * colCount) < 1000000
            && valueCaches.arrayInfo.length < 50) {
            valueCaches[cacheKey] = result;
            valueCaches[cacheKey].rowCount = rowCount;
            valueCaches[cacheKey].colCount = colCount;
            valueCaches[cacheKey].rangeCount = rangeCount;
            valueCaches.arrayInfo.push({ reference: reference, key: cacheKey });
        }
        return result;
    };
    SheetSource.prototype.getColumnCount = function () {
        var sheet = this._sheet;
        return sheet._disposed ? 0 : sheet.getColumnCount(this._sheetArea);
    };
    SheetSource.prototype.getRowCount = function () {
        var sheet = this._sheet;
        return sheet._disposed ? 0 : sheet.getRowCount(this._sheetArea);
    };
    SheetSource.prototype.isHiddenRow = function (row, onlyFiltered) {
        var sheet = this._sheet, hasFilter = sheet._hasRowFilterOut && sheet._hasRowFilterOut();
        if (hasFilter || !onlyFiltered) {
            return sheet.getRowHeight(row) === 0;
        }
        return false;
    };
    SheetSource.prototype.getName = function () {
        var sheetArea = this._sheetArea;
        var name = isNullOrUndefined(this._newWorksheetName) ? this._sheet.name() : this._newWorksheetName;
        if (sheetArea === Core_1.SheetArea.colHeader) {
            return name + 'CH';
        }
        else if (sheetArea === Core_1.SheetArea.rowHeader) {
            return name + 'RH';
        }
        return name;
    };
    SheetSource.prototype._getDynamicArrayManager = function () {
        var self = this, dynamicArrayManager = self._dynamicArrayManager;
        if (!dynamicArrayManager) {
            dynamicArrayManager = self._dynamicArrayManager = self._sheet._modelManager._dynamicArrayManager;
        }
        return dynamicArrayManager;
    };
    SheetSource.prototype.setArray = function (row, col, rowCount, colCount, values) {
        return this._getDynamicArrayManager().setArray(this, row, col, rowCount, colCount, values);
    };
    SheetSource.prototype.updateItem = function (row, col, value) {
        return this._getDynamicArrayManager().updateItem(this, row, col, value);
    };
    SheetSource.prototype._setInvalidState = function (row, col) {
        this._getDynamicArrayManager()._setInvalidState(row, col);
    };
    SheetSource.prototype._clearDynamicArrayState = function () {
        this._getDynamicArrayManager()._clearDynamicArrayState();
    };
    SheetSource.prototype.setValue = function (identity) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var self = this, sheet = self._sheet, row, column, sheetArea = self._sheetArea;
        var startIndex;
        identity = identity;
        if (identity.row !== keyword_undefined) {
            row = identity.row;
            column = identity.col;
            startIndex = 1;
        }
        else if (identity.name) {
            return;
        }
        else {
            row = arguments[0];
            column = arguments[1];
            startIndex = 2;
        }
        var value = arguments[startIndex], oldValue = arguments[startIndex + 1];
        var caches = self._valueCaches;
        if (caches) {
            var rowCaches = caches[row];
            if (rowCaches) {
                var cellCache = rowCaches[column];
                if (cellCache) {
                    cellCache.v = value;
                    if (cellCache.b !== keyword_undefined) {
                        cellCache.b = keyword_undefined;
                    }
                    if (cellCache.d !== keyword_undefined) {
                        cellCache.d = keyword_undefined;
                    }
                    if (cellCache.n !== keyword_undefined) {
                        cellCache.n = keyword_undefined;
                    }
                    if (cellCache.s !== keyword_undefined) {
                        cellCache.s = keyword_undefined;
                    }
                    cellCache.sn = keyword_undefined;
                }
            }
        }

        var OAValue = Core_1._util._tryConvertDateToOADate(value);
        var modelManager = sheet._modelManager;
        var valueSet = false;
        var tm = sheet.tables;
        var table = tm && tm.find(row, column);
        if (sheetArea === 3 && table) {
            var isHeaderRow = table.showHeader() && row === table.headerIndex(), isFooterRow = table.showFooter() && row === table.footerIndex();
            if (!isHeaderRow && !isFooterRow) {
                valueSet = table._setValue(row, column, OAValue);
            }
        }
        var bm = sheet._bindingManager;
        if (sheetArea === 3 && !valueSet && bm && bm._dataSource) {
            var bdValue = bm.getValue(row, column), isBindingValueSet = false;
            if (bdValue.hasBinding) {
                var oldItem = void 0;
                if (caches) {
                    var bindingRows = caches.bindingRows = caches.bindingRows || {};
                    oldItem = bindingRows[row];
                    if (!oldItem) {
                        oldItem = bindingRows[row] = extend({}, sheet.getDataItem(row));
                    }
                }
                else {
                    oldItem = extend({}, sheet.getDataItem(row));
                }
                modelManager._updateDirty(row, column, { _originalItem: oldItem, _oldValue: bdValue.value });
                isBindingValueSet = bm.setValue(row, column, OAValue, modelManager._changes);
            }
            if (bm._dataSourceType === 'dataManagerBindingSource') {
                valueSet = isBindingValueSet;
            }
            else {
                valueSet = bdValue.hasBinding;
            }
        }
        if (!valueSet) {
            var hyperlink_string = 'hyperlink', proto = '__proto__';
            if (typeof OAValue === 'string' && OAValue[hyperlink_string]) {
                var url = OAValue[hyperlink_string], hyperlinkInfo = { url: url };
                modelManager.setHyperlink && modelManager.do('setHyperlink', row, column, hyperlinkInfo);
                delete OAValue[proto].hyperlink;
            }
            modelManager.do('setValue', row, column, OAValue, sheetArea, true, true, arguments[startIndex + 2] );
        }
        sheet._isRecalculated = true;
        if (this._changedCells) {
            this._changedCells.push({ row: row, col: column });
        }
        else {
            sheet._trigger(Core_1.Events.CellChanged, {
                sheet: sheet,
                sheetName: sheet.name(),
                row: row,
                col: column,
                sheetArea: sheetArea,
                propertyName: 'value',
                oldValue: oldValue,
                newValue: value
            });
        }
    };
    SheetSource.prototype.getCustomFunction = function (name) {
        return this._sheet ? this._sheet._findCustomFunction(name) : keyword_null;
    };
    SheetSource.prototype.getCustomName = function (name) {
        name = toUpperCase(name);
        var nameInfo = this._sheet ? this._sheet.getCustomName(name) : keyword_null;
        if (nameInfo) {
            return nameInfo.getExpression();
        }
        return keyword_null;
    };
    SheetSource.prototype.getSheet = function () {
        return this._sheet;
    };
    SheetSource.prototype.setFormula = function (row, column, formula) {
    };
    SheetSource.prototype.setArrayFormula = function (row, column, rowCount, columnCount, formula) {
    };
    SheetSource.prototype.setFormulaByName = function (name, formula) {
    };
    SheetSource.prototype.refresh = function () {
        this._sheet.repaint();
    };
    SheetSource.prototype.toJSON = function (jsonData, calcData, lastRow, lastColumn, calcColumnDataArray) {
        var sheetNodes, sheetCalcNodes = calcData, rowCalcNodes, cellCalcNode, rowNode, cellNode;
        var data = jsonData.data || {}, rowIsEmpty = true, calcService = this._getCalcServiceInternal();
        calcService._isToJSON = true;
        for (var row = 0; row <= lastRow; row++) {
            sheetNodes = data.dataTable || {};
            rowCalcNodes = sheetCalcNodes[row];
            if (!rowCalcNodes) {
                continue;
            }
            rowNode = sheetNodes[row];
            rowIsEmpty = !rowNode;
            rowNode = rowNode || {};
            for (var col = 0; col <= lastColumn; col++) {
                cellCalcNode = rowCalcNodes[col];
                if (cellCalcNode && cellCalcNode._expr) {
                    cellNode = rowNode[col] || {};
                    try {
                        var formula = calcService.unparse(this, cellCalcNode._expr, row, col, false, true);
                        var prefixFormulaName = getPrefixFormula(formula), prefixFormula = void 0;
                        if (prefixFormulaName) {
                            if (isNullOrUndefined(cellNode.prefix)) {
                                cellNode.prefix = {};
                            }
                            prefixFormula = formula;
                            formula = prefixFormula.replace(/_xlpm\./g, '');
                        }
                        if (!cellCalcNode._arrayInfo && formula && formula.indexOf('@') === 0 && formulaToRange(this._sheet, formula.slice(1, formula.length), 0, 0)) {
                            formula = formula.slice(1, formula.length);
                            if (prefixFormulaName) {
                                prefixFormula = prefixFormula.slice(1, prefixFormula.length);
                            }
                        }
                        if (cellCalcNode._arrayInfo) {
                            if (cellCalcNode._arrayInfo.row === row && cellCalcNode._arrayInfo.col === col) {
                                cellNode.arrayInfo = cellCalcNode._arrayInfo;
                                cellNode.formula = formula;
                                if (prefixFormulaName) {
                                    cellNode.prefix[prefixFormulaName] = prefixFormula;
                                }
                            }
                        }
                        else {
                            cellNode.formula = formula;
                            if (prefixFormulaName) {
                                cellNode.prefix[prefixFormulaName] = prefixFormula;
                            }
                        }
                        rowIsEmpty = false;
                        rowNode[col] = cellNode;
                    }
                    catch (ex) {

                    }
                }
            }
            if (!rowIsEmpty) {
                sheetNodes[row] = rowNode;
            }
            else if (sheetNodes !== data.dataTable) {
                continue;
            }
            data.dataTable = sheetNodes;
        }
        if (calcColumnDataArray) {
            var columnDataArray = data.columnDataArray || [];
            for (var columnIndex = 0; columnIndex < calcColumnDataArray.length; columnIndex++) {
                var calcColumnData = calcColumnDataArray[columnIndex];
                if (!calcColumnData || !calcColumnData._expr) {
                    continue;
                }
                var columnFormula = this._getCalcServiceInternal().unparse(this, calcColumnData._expr, 0, columnIndex, false, true);
                var columnData = columnDataArray[columnIndex] || {};
                columnData.formula = columnFormula;
                columnDataArray[columnIndex] = columnData;
            }
            if (columnDataArray.length > 0) {
                data.columnDataArray = columnDataArray;
            }
        }
        if (!isEmptyObject(data)) {
            jsonData.data = data;
        }
        delete calcService._isToJSON;
    };
    return SheetSource;
}(CalcEngine_1.CalcSource));
exports.SheetSource = SheetSource;
SheetSource.prototype.getParserContext = function (useR1C1, identity, option) {
    identity = identity || CalcEngine_1._createCellIdentity(0, 0);
    return new SheetParserContext(this._sheet, useR1C1, identity, option);
};
var SpreadSource = (function (_super) {
    __extends(SpreadSource, _super);
    function SpreadSource(spread) {
        var _this = _super.call(this, keyword_null) || this;
        _this.createSourceModel = function (calcService) {
            return new CalcEngine_1.CalcSourceModel(calcService, this);
        };
        _this._spread = spread;
        return _this;
    }
    SpreadSource.prototype.getCustomFunction = function (name) {
        return this._spread ? this._spread.getCustomFunction(name) : keyword_null;
    };
    SpreadSource.prototype.getCustomName = function (name) {
        var nameInfo = this._spread ? this._spread.getCustomName(name) || this._spread._getFormatStringCustomName(name) : keyword_null;
        if (nameInfo) {
            return nameInfo.getExpression();
        }
        return keyword_null;
    };
    return SpreadSource;
}(CalcEngine_1.CalcSource));
exports.SpreadSource = SpreadSource;


function formulaToExpression(context, formula, baseRow, baseColumn, useR1C1, considerCurrentCulture) {
    var sheet = context && (context instanceof Core_1.Worksheet) && context;
    var parser = new CalcEngine_1.Parser();
    baseRow = baseRow === keyword_undefined ? 0 : baseRow;
    baseColumn = baseColumn === keyword_undefined ? 0 : baseColumn;
    var parserContext = new SheetParserContext(sheet, !!useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseColumn));
    if (considerCurrentCulture) {
        parserContext.culture = true;
    }
    return parser.parse(parserContext, formula);
}
exports.formulaToExpression = formulaToExpression;


function expressionToFormula(context, expression, baseRow, baseColumn, useR1C1, structureToRange) {
    var sheet = context && (context instanceof Core_1.Worksheet) && context;
    var parser = new CalcEngine_1.Parser();
    baseRow = baseRow === keyword_undefined ? 0 : baseRow;
    baseColumn = baseColumn === keyword_undefined ? 0 : baseColumn;
    var parserContext = new SheetParserContext(sheet, !!useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseColumn));
    parserContext._structureToRange = structureToRange;
    return parser.unparse(parserContext, expression);
}
exports.expressionToFormula = expressionToFormula;


function evaluateFormula(context, formula, baseRow, baseColumn, useR1C1) {
    if (baseRow === keyword_undefined) {
        baseRow = 0;
    }
    if (baseColumn === keyword_undefined) {
        baseColumn = 0;
    }

    var expression = formulaToExpression(context, formula, baseRow, baseColumn, useR1C1, true);
    return evaluateExpression(context, expression, baseRow, baseColumn);
}
exports.evaluateFormula = evaluateFormula;
function evaluateExpression(context, expression, baseRow, baseColumn, options) {
    var calcService = context._getCalcServiceInternal();
    if (baseRow === keyword_undefined) {
        baseRow = context.getActiveRowIndex();
    }
    if (baseColumn === keyword_undefined) {
        baseColumn = context.getActiveColumnIndex();
    }
    var convertNullToZero = true;
    if (options && options.convertNullToZero !== keyword_undefined) {
        convertNullToZero = options.convertNullToZero;
    }
    var sheetSource = context._getSheetSource();
    return calcService._evaluateParsedFormula(sheetSource, expression, CalcEngine_1._createCellIdentity(baseRow, baseColumn), false, convertNullToZero);
}
exports.evaluateExpression = evaluateExpression;
function rangeToExpression(range , baseRow, baseCol, rangeReferenceRelative, table) {
    var row = range.row, col = range.col, endRow = range.row + range.rowCount - 1, endCol = range.col + range.colCount - 1;
    var startRowRelative = false, endRowRelative = false, startColRelative = false, endColRelative = false;
    if (arguments.length >= 4) {
        startRowRelative = (rangeReferenceRelative & 1 ) !== 0;
        endRowRelative = (rangeReferenceRelative & 4 ) !== 0;
        startColRelative = (rangeReferenceRelative & 2 ) !== 0;
        endColRelative = (rangeReferenceRelative & 8 ) !== 0;
        row -= startRowRelative ? baseRow : 0;
        endRow -= endRowRelative ? baseRow : 0;
        col -= startColRelative ? baseCol : 0;
        endCol -= endColRelative ? baseCol : 0;
    }
    var expression;
    if (table) {
        var structReferencePortions = getReferencePortions(range, table, baseRow);
        var structReferenceColumnSpecifier = getReferenceColumnSpecifier(range, table, baseRow);
        if (structReferencePortions && structReferenceColumnSpecifier) {
            expression = Calc3.StructureReferenceResolver.create(table, structReferencePortions, structReferenceColumnSpecifier, range.col - table.dataRange().col, range.col + range.colCount - table.dataRange().col - 1);
            return expression;
        }
    }
    if (range.rowCount === 1 && range.colCount === 1) {
        expression = CalcEngine_1._createCellExpression(keyword_null, keyword_null, row, col, startRowRelative, startColRelative);
    }
    else {
        if (range.row < 0) {
            row = endRow = calc_ns_1.BAND_INDEX_CONST;
        }
        if (range.col < 0) {
            col = endCol = calc_ns_1.BAND_INDEX_CONST;
        }
        expression = CalcEngine_1._createRangeExpression(keyword_null, keyword_null, row, col, endRow, endCol, startRowRelative, startColRelative, endRowRelative, endColRelative, baseRow, baseCol);
    }
    return expression;
}
exports.rangeToExpression = rangeToExpression;
function getReferencePortions(range , table , baseRow) {
    if (range.rowCount === 1) {
        if (table.hasHeadersRow() && range.row === table.startRow()) {
            return 2 ;
        }

        if (table.hasTotalsRow() && range.row === table.endRow()) {
            return 8 ;
        }

        if (baseRow === range.row) {
            return 1 ;
        }
    }
    else {
        if (table.hasHeadersRow() && range.row === table.startRow()) {
            if (range.rowCount === table.dataRange().rowCount + 1) {
                return 6 ;
            }

            if (table.hasTotalsRow() && range.rowCount === table.dataRange().rowCount + 1 + 1) {
                return 14 ;
            }
        }

        if (range.row === table.dataRange().row) {
            if (range.rowCount === table.dataRange().rowCount) {
                return 3 ;
            }

            if (table.hasTotalsRow() && range.rowCount === table.dataRange().rowCount + 1) {
                return 12 ;
            }
        }
    }
    return keyword_undefined;
}
function getReferenceColumnSpecifier(range , table , baseRow) {
    if (range.col === table.startColumn() && range.colCount === table.dataRange().colCount) {
        return 1 ;
    }
    if (range.colCount === 1) {
        return 2 ;
    }
    if (range.col >= table.startColumn() && (range.col + range.colCount - 1) <= table.endColumn()) {
        return 4 ;
    }
    return keyword_undefined;
}


function rangeToFormula(range , baseRow, baseCol, rangeReferenceRelative, useR1C1) {
    var expression = rangeToExpression(range, baseRow, baseCol, rangeReferenceRelative);
    var context = new SheetParserContext(keyword_null, !!useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseCol));
    var parser = new CalcEngine_1.Parser();
    var result = parser.unparse(context, expression);
    context._dispose();
    return result;
}
exports.rangeToFormula = rangeToFormula;
function rangeToFormulaWithStructReference(source, range , baseRow, baseCol, rangeReferenceRelative, useR1C1, table) {
    var expression = rangeToExpression(range, baseRow, baseCol, rangeReferenceRelative, table);
    var context = new SheetParserContext(source, !!useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseCol));
    var parser = new CalcEngine_1.Parser();
    return parser.unparse(context, expression);
}
exports.rangeToFormulaWithStructReference = rangeToFormulaWithStructReference;
function formulaToRange(sheet, formula, baseRow, baseCol) {
    if (!formula) {
        return null;
    }
    baseRow = !baseRow ? 0 : baseRow;
    baseCol = !baseCol ? 0 : baseCol;
    var service = sheet._getCalcServiceInternal();
    var expr = service.parse(sheet._getSheetSource(), formula, baseRow, baseCol, true , true ), source;
    if (expr) {
        source = expr.source;
        if (source && expr.type === 13 ) {

        }
        else if (expr.type === 1 && expr.endSource ) {
            var startSource = expr.source, endSource = expr.endSource;
            var sources = startSource.getSources(endSource), isInSheetRange = false;
            for (var i = 0; i < sources.length; i++) {
                if (sources[i] === sheet._getSheetSource()) {
                    isInSheetRange = true;
                    break;
                }
            }
            expr = isInSheetRange && expr;
        }
    }
    if (expr && expr.getRange && (!source || source === sheet._getSheetSource())) {
        var cellRange = expr.getRange(baseRow, baseCol);
        if (!cellRange) {
            return null;
        }
        return new Core_1.Range(cellRange.row, cellRange.col, cellRange.rowCount, cellRange.colCount);
    }
    return null;
}
exports.formulaToRange = formulaToRange;


function formulaToRanges(sheet, formula, baseRow, baseCol, forceA1) {
    var result = [];
    var ranges = [];
    if (!formula) {
        return result;
    }
    var names = {};
    baseRow = baseRow || 0;
    baseCol = baseCol || 0;
    var parser = new CalcEngine_1.Parser();
    var infos = Calc3._parseReferenceExpressionInfos(parser, formula, sheet, baseRow, baseCol, keyword_undefined , forceA1);
    for (var i = 0; i < infos.length; i++) {
        var sheetRanges = infos[i].sheetRanges;
        if (sheetRanges && !isEmptyObject(sheetRanges)) {
            for (var sheetIndex = 0; sheetIndex < sheetRanges.sheets.length; sheetIndex++) {
                var sheetName = sheetRanges.sheets[sheetIndex];
                ranges = names[sheetName];
                if (!ranges) {
                    names[sheetName] = ranges = [];
                    result.push({ sheetName: sheetName, ranges: ranges });
                }
                var infoSheetRanges = sheetRanges[sheetName];
                for (var rangeIndex = 0; rangeIndex < infoSheetRanges.length; rangeIndex++) {
                    var range = infoSheetRanges[rangeIndex];
                    if (!isNullOrUndefined(range)) {
                        ranges.push(new Core_1.Range(range.row, range.col, range.rowCount, range.colCount));
                    }
                }
            }
        }
    }
    return result;
}
exports.formulaToRanges = formulaToRanges;


function rangesToFormula(ranges, baseRow, baseCol, rangeReferenceRelative, useR1C1) {
    var parser = new CalcEngine_1.Parser();
    var context = new SheetParserContext(keyword_null, !!useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseCol));
    var formula = _rangesToFormulaInternal(parser, context, ranges, baseRow, baseCol, rangeReferenceRelative);
    context._dispose();
    return formula;
}
exports.rangesToFormula = rangesToFormula;
function _rangesToFormulaInternal(parser, context, ranges, baseRow, baseCol, rangeReferenceRelative) {
    var formula = '';
    for (var i = 0; i < ranges.length; i++) {
        var expression = rangeToExpression(ranges[i], baseRow, baseCol, rangeReferenceRelative);
        var rangeFormula = parser.unparse(context, expression);
        if (i > 0) {
            formula += ', ' + rangeFormula;
        }
        else {
            formula += rangeFormula;
        }
    }
    return formula;
}
exports._rangesToFormulaInternal = _rangesToFormulaInternal;


exports.RangeReferenceRelative = {

    allAbsolute: 0,

    startRowRelative: 1,

    startColRelative: 2,

    endRowRelative: 4,

    endColRelative: 8,

    rowRelative: 5,

    colRelative: 10,

    allRelative: 15
};


function goalSeek(changingSheet, changingRow, changingColumn, formulaSheet, formulaRow, formulaColumn, desiredResult) {
    var initialValue = formulaSheet.getValue(changingRow, changingColumn);
    var obj;
    var x0, x1;
    var f0, f1;
    var found = false;
    var maxIterations = 100;
    var maxChange = 0.001;
    var epsilon = 0.01;
    x0 = (isNumeric(initialValue) ? +initialValue : 0.0) - desiredResult;
    obj = formulaSheet.getValue(formulaRow, formulaColumn);
    f0 = (isNumeric(obj) ? +obj : 0.0) - desiredResult;
    if (isNumeric(obj) && (Math.abs(f0) < maxChange)) {
        found = true;
    }
    else if (isError(obj)) {
        found = false;
    }
    else {
        x1 = x0 + ((x0 === 0.0) ? epsilon : epsilon * x0);
        for (var i = 0; !found && i < maxIterations; i++) {
            x1 = Common_1.Common._NumberHelper._fixNumber(x1, 13);
            changingSheet.setValue(changingRow, changingColumn, x1);
            obj = formulaSheet.getValue(formulaRow, formulaColumn);
            f1 = (isNumeric(obj) ? +obj : 0.0) - desiredResult;
            if (isNumeric(obj) && Math.abs(f1) < maxChange) {
                found = true;
            }
            else if (isError(obj)) {
                x1 = (x0 + x1) / 2.0;
            }
            else if ((x0 - x1) === 0.0) {
                x1 = x0 + ((x0 === 0.0) ? epsilon : epsilon * x0);
            }
            else if ((f0 - f1) === 0.0) {
                x1 = x0 + (x1 - x0) * 2.0;
            }
            else {
                var x2 = x1 - f1 * (x0 - x1) / (f0 - f1);
                x0 = x1;
                f0 = f1;
                x1 = x2;
            }
        }
    }
    if (!found) {
        changingSheet.setValue(changingRow, changingColumn, initialValue);
    }
    return found;
}
exports.goalSeek = goalSeek;
/***/ }),

/***/ './dist/plugins/sheetsCalc/calc.ns.js':
/*!********************************************!*\
  !*** ./dist/plugins/sheetsCalc/calc.ns.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.BAND_INDEX_CONST = -2147483648;
exports.MAX_ROW_COUNT = 1048576;
exports.MAX_COLUMN_COUNT = 16384;
/***/ }),

/***/ './dist/plugins/sheetsCalc/formulaOperatorAdjustor.js':
/*!************************************************************!*\
  !*** ./dist/plugins/sheetsCalc/formulaOperatorAdjustor.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var calc_ns_1 = __webpack_require__(/*! ./calc.ns */ './dist/plugins/sheetsCalc/calc.ns.js');
var Calc3 = __webpack_require__(/*! ./parser-sheets */ './dist/plugins/sheetsCalc/parser-sheets.js');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var _isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var StringHelper = Common_1.Common._StringHelper;
var toUpperCase = StringHelper._toUpperCase;
var Math_min = Math.min, Math_max = Math.max, keyword_undefined = void 0, keyword_null = null;
var _isError = CalcEngine_1.Convert._isError;
var CalcErrorsReference = CalcEngine_1.Errors.Reference;
var getBaseRowBaseCol = Core_1.util._getBaseRowBaseCol;
function fnIntersectWith(current, range) {
    if (!range) {
        range = this;
    }
    var top = Math_max(current.row, range.row);
    var left = Math_max(current.column, range.column);
    var bottom = Math_min(current.row + current.rowCount, range.row + range.rowCount);
    var right = Math_min(current.column + current.columnCount, range.column + range.columnCount);
    if (top >= bottom || left >= right) {
        return keyword_null;
    }
    return {
        row: top,
        column: left,
        rowCount: bottom - top,
        columnCount: right - left,
        intersectWith: fnIntersectWith
    };
}
var MoveSwapInfo = (function () {
    function MoveSwapInfo(fromModel, fromRow, fromColumn, toModel, toRow, toColumn, rowCount, columnCount) {
        var self = this;
        self._fromModel = fromModel;
        self._fromRow = fromRow;
        self._fromColumn = fromColumn;
        self._toModel = toModel;
        self._toRow = toRow;
        self._toColumn = toColumn;
        self._rowCount = rowCount;
        self._columnCount = columnCount;
    }
    MoveSwapInfo.prototype._rowOffset = function (baseRowIndex) {
        var self = this;
        var destSheet = self._toModel._sheet;
        self._skipInvisibleRange = destSheet && destSheet._getPasteSkipInvisibleRange();
        if (self._skipInvisibleRange && baseRowIndex >= 0) {
            var rowOffsetCount = baseRowIndex - self._toRow + 1;
            var invisibleRowCount = destSheet._getActualInvisibleCount(self._toRow, rowOffsetCount, true);
            return self._toRow - self._fromRow + invisibleRowCount;
        }
        return self._toRow - self._fromRow;
    };
    MoveSwapInfo.prototype._colOffset = function (baseColumnIndex) {
        var self = this;
        var destSheet = self._toModel._sheet;
        self._skipInvisibleRange = destSheet && destSheet._getPasteSkipInvisibleRange();
        if (self._skipInvisibleRange && baseColumnIndex >= 0) {
            var colOffsetCount = baseColumnIndex - self._toColumn + 1;
            var invisibleColCount = destSheet._getActualInvisibleCount(self._toColumn, colOffsetCount);
            return self._toColumn - self._fromColumn + invisibleColCount;
        }
        return self._toColumn - self._fromColumn;
    };
    MoveSwapInfo.prototype._sourceContains = function (model, row, column, rowCount, columnCount) {
        var self = this;
        return (self._fromModel === model) && ((self._fromRow === -1) || (self._fromRow <= row && row + rowCount <= self._fromRow + self._rowCount)) && ((self._fromColumn === -1) || (self._fromColumn <= column && column + columnCount <= self._fromColumn + self._columnCount));
    };
    MoveSwapInfo.prototype._destinationContains = function (model, row, column, rowCount, columnCount) {
        var self = this;
        var toSheet = self._toModel._sheet;
        var pasteSkipInvisibleRange = toSheet && toSheet._getPasteSkipInvisibleRange();
        var toRow = self._toRow, toColumn = self._toColumn, toRowCount = self._rowCount, toColumnCount = self._columnCount;
        if (pasteSkipInvisibleRange) {
            toRowCount += toSheet._getNextInvisibleCount(toRow, toRowCount, true);
            toColumnCount += toSheet._getNextInvisibleCount(toColumn, toColumnCount);
        }
        return (self._toModel === model) &&
            ((toRow === -1) || (toRow <= row && row + rowCount <= toRow + toRowCount)) &&
            ((toColumn === -1) || (toColumn <= column && column + columnCount <= toColumn + toColumnCount));
    };
    MoveSwapInfo.prototype.intersectWith = function (model, row, column, rowCount, columnCount) {
        var self = this;
        if (self._toModel !== model) {
            return keyword_null;
        }
        var range = self._createValidCellRange(model, row, column, rowCount, columnCount);
        var sourceRange = self._createValidCellRange(model, self._fromRow, self._fromColumn, rowCount, columnCount);
        return sourceRange.intersectWith(range);
    };
    MoveSwapInfo.prototype._createValidCellRange = function (model, row, column, rowCount, columnCount) {
        var validFromRow = (row === -1 ? 0 : row);
        var validFromRowCount = ((row === -1 || rowCount === -1) ? model.rowCount : rowCount);
        var validFromColumn = (column === -1 ? 0 : column);
        var validFromColumnCount = ((column === -1 || columnCount === -1) ? model.colCount : columnCount);
        return {
            row: validFromRow,
            column: validFromColumn,
            rowCount: validFromRowCount,
            columnCount: validFromColumnCount,
            intersectWith: fnIntersectWith
        };
    };
    return MoveSwapInfo;
}());
exports.MoveSwapInfo = MoveSwapInfo;

function getCalcChangeInfoForAddRemove(current, start, calcChangeInfo, isSameSheet) {
    return (!isSameSheet || (current < start)) && calcChangeInfo;
}
function getKeyOfRange(range) {
    return [range.row, range.col, range.rowCount, range.colCount].join(',');
}
function setMapValue(map, row, col, value) {
    var rowItem = map[row];
    if (!rowItem) {
        rowItem = map[row] = {};
    }
    rowItem[col] = value;
}
function hasMapValue(map, row, col) {
    var rowItem = map[row];
    return rowItem ? rowItem[col] : false;
}
var CalcOperatorAdjustor = (function () {
    function CalcOperatorAdjustor() {
    }
    CalcOperatorAdjustor._copyExpression = function (fromSource, destSource, expr, row, column, offsetRow, offsetColumn, destRow, destColumn, rowCount, columnCount) {
        var newExpr = expr, self = CalcOperatorAdjustor, selfFunction = this._copyExpression;
        if (!expr) {
            return newExpr;
        }
        var maxRowCount, maxColCount;
        var exprType = expr.type;
        if (exprType === 10 ) {
            newExpr = CalcEngine_1._createParenthesesExpression(selfFunction.call(self, fromSource, destSource, expr.value, row, column, offsetRow, offsetColumn, destRow, destColumn, rowCount, columnCount));
        }
        else if (exprType === 1 && expr._isCell() || exprType === 33 ) {
            maxRowCount = Math_min((expr.source || destSource).getRowCount(), calc_ns_1.MAX_ROW_COUNT);
            maxColCount = Math_min((expr.source || destSource).getColumnCount(), calc_ns_1.MAX_COLUMN_COUNT);
            if (expr.rowRelative && ((expr.row + row < 0) || (expr.row + row >= maxRowCount)) || expr.columnRelative && ((expr.column + column < 0) || (expr.column + column >= maxColCount))) {
                return CalcEngine_1._createErrorExpression(CalcErrorsReference, expr.source);
            }
            newExpr = expr.offset(0, 0, false);
        }
        else if (exprType === 1 ) {
            maxRowCount = Math_min((expr.source || destSource).getRowCount(), calc_ns_1.MAX_ROW_COUNT);
            maxColCount = Math_min((expr.source || destSource).getColumnCount(), calc_ns_1.MAX_COLUMN_COUNT);
            var rangeExpr = expr;
            if (rangeExpr.rowRelative && !expr.isFullColumn && ((rangeExpr.row + row < 0) || (rangeExpr.row + row > maxRowCount))
                || rangeExpr.columnRelative && !expr.isFullRow && ((rangeExpr.column + column < 0) || (rangeExpr.column + column > maxColCount))
                || rangeExpr.endRowRelative && !expr.isFullColumn && ((rangeExpr.endRow + row < 0) || (rangeExpr.endRow + row > maxRowCount))
                || rangeExpr.endColumnRelative && !expr.isFullRow && ((rangeExpr.endColumn + column < 0) || (rangeExpr.endColumn + column > maxColCount))) {
                return CalcEngine_1._createErrorExpression(CalcErrorsReference, expr.source, expr.endSource);
            }
            newExpr = expr.offset(0, 0, false, row, column);
        }
        else if (expr.type === 9 ) {
            newExpr = CalcEngine_1._createOperatorExpression(expr.operatorType, selfFunction.call(self, fromSource, destSource, expr.value, row, column, offsetRow, offsetColumn, destRow, destColumn, rowCount, columnCount), expr.value2 && selfFunction.call(self, fromSource, destSource, expr.value2, row, column, offsetRow, offsetColumn, destRow, destColumn, rowCount, columnCount));
        }
        else if (exprType === 7 ) {
            var newArgs = [];
            if (expr.arguments && expr.arguments.length > 0) {
                for (var i = 0; i < expr.arguments.length; i++) {
                    newArgs[i] = selfFunction.call(self, fromSource, destSource, expr.arguments[i], row, column, offsetRow, offsetColumn, destRow, destColumn, rowCount, columnCount);
                }
            }
            newExpr = CalcEngine_1._createFunctionExpression(expr, newArgs);
        }
        else if (exprType === 13 ) {
            newExpr = expr.offsetWhenCopy(fromSource, destSource, row, column, offsetRow, offsetColumn, destRow, destColumn, rowCount, columnCount);
        }
        return newExpr;
    };
    CalcOperatorAdjustor.copyFormula = function (src, srcRow, srcColumn, dest, destRow, destColumn, copyRowCount, copyColumnCount, ignoreFilteredOutRow, ignorePasteSkipInvisibleRange) {
        var srcCalcModel = src, destCalcModel = dest, srcSheetSource = src.getSource(), destSheetSource = dest.getSource(), self = CalcOperatorAdjustor;
        if (!srcCalcModel || !destCalcModel) {
            return;
        }
        var destChangeInfo = destSheetSource && destSheetSource.getSheet()._modelManager._getChangesForCalcEngine();
        var fromRow = srcRow;
        var fromColumn = srcColumn;
        var toRow = destRow;
        var toColumn = destColumn;
        var rowCount = copyRowCount;
        var columnCount = copyColumnCount;
        if (srcRow < 0) {
            fromRow = 0;
            rowCount = Math_min(src.rC(), dest.rC());
        }
        if (srcColumn < 0) {
            fromColumn = 0;
            columnCount = Math_min(src.cC(), dest.cC());
        }
        if (destRow < 0) {
            toRow = 0;
        }
        if (destColumn < 0) {
            toColumn = 0;
        }
        var mc = new CalcEngine_1.CalcSourceModel(src._getCalcServiceInternal(), srcSheetSource);
        var r, c, fromRowIndex, fromColumnIndex, destSheet = destSheetSource.getSheet();
        var pasteSkipInvisibleRange = !ignorePasteSkipInvisibleRange && destSheet._getPasteSkipInvisibleRange();
        var oldRowCount = rowCount, oldColumnCount = columnCount;
        var totalRowCount = destSheet.getRowCount(), totalColCount = destSheet.getColumnCount();
        for (r = 0; r < rowCount; r++) {
            for (c = 0; c < columnCount; c++) {
                srcCalcModel._copyExpr(mc, r + fromRow, c + fromColumn, r, c);
            }
        }
        var exprSettedObj = {};
        var calcSvc = dest._getCalcServiceInternal();
        for (r = 0, fromRowIndex = 0; r < rowCount && (r + toRow < totalRowCount); r++) {
            var toR = r + toRow;
            if (pasteSkipInvisibleRange && (destSheet.getRowHeight(toR) === 0)) {
                rowCount++;
                continue;
            }


            if (ignoreFilteredOutRow && destSheetSource.isHiddenRow(toR, true )) {
                fromRowIndex++;
                continue;
            }
            for (c = 0, fromColumnIndex = 0, columnCount = oldColumnCount; c < columnCount && (c + toColumn < totalColCount); c++) {
                var toC = c + toColumn;
                if (pasteSkipInvisibleRange && (destSheet.getColumnWidth(toC) === 0)) {
                    columnCount++;
                    continue;
                }
                var expr = mc._getExpr(fromRowIndex, fromColumnIndex);
                if (expr) {
                    if (expr === exprSettedObj) {
                        continue;
                    }
                    var rowOffset = destRow + r - srcRow - fromRowIndex, colOffset = destColumn + c - srcColumn - fromColumnIndex;

                    expr = self._copyExpression(srcSheetSource, destSheetSource, expr, toR, toC, rowOffset, colOffset, destRow, destColumn, oldRowCount, oldColumnCount);
                    var arrayInfo = mc._getArrayInfo(fromRowIndex, fromColumnIndex);
                    if (destSheetSource) {
                        if (pasteSkipInvisibleRange && arrayInfo) {
                            continue;
                        }
                        if (arrayInfo && !arrayInfo.isDynamicArray) {
                            var arrayRowCount = arrayInfo.rowCount, arrayColCount = arrayInfo.colCount;

                            var startRowOffset = fromRow - arrayInfo.row;
                            if (startRowOffset > 0) {
                                arrayRowCount -= startRowOffset;
                            }

                            var leftRowCount = rowCount - r;
                            if (leftRowCount < arrayRowCount) {
                                arrayRowCount = leftRowCount;
                            }

                            var startColOffset = fromColumn - arrayInfo.col;
                            if (startColOffset > 0) {
                                arrayColCount -= startColOffset;
                            }

                            var leftColCount = columnCount - c;
                            if (leftColCount < arrayColCount) {
                                arrayColCount = leftColCount;
                            }
                            for (var i = 0; i < arrayRowCount; i++) {
                                for (var j = 0; j < arrayColCount; j++) {
                                    mc._setExpr(r + i, c + j, exprSettedObj);
                                }
                            }


                            dest.setArrayFormula(toR, toC, arrayRowCount, arrayColCount, calcSvc.unparse(destSheetSource, expr, toR, toC), keyword_undefined , destChangeInfo);
                        }
                        else {
                            var formula = expr ? calcSvc.unparse(destSheetSource, expr, toR, toC) : keyword_undefined;
                            destSheetSource.setFormula(toR, toC, formula);
                            var workingExpr = mc._getWorkingExpr(fromRowIndex, fromColumnIndex);
                            if (workingExpr) {
                                var context = new CalcEngine_1.EvaluateContext(destSheetSource, CalcEngine_1._createCellIdentity(toR, toC), false);

                                workingExpr = CalcEngine_1._mappingArray(context, expr, false, 0, 0);
                                workingExpr = workingExpr === expr ? keyword_undefined : workingExpr;
                            }
                            destCalcModel._setCellExpression(toR, toC, expr, workingExpr, arrayInfo, destChangeInfo);
                        }
                    }
                    else {
                        destCalcModel._setExpr(toR, toC, expr);
                        destCalcModel._setArrayInfo(toR, toC, arrayInfo);
                    }
                }
                else if (destCalcModel && destCalcModel._getExpr(toR, toC)) {
                    destCalcModel._setCellExpression(toR, toC, keyword_undefined, keyword_undefined, keyword_undefined, destChangeInfo);
                }
                fromColumnIndex++;
            }
            fromRowIndex++;
        }
    };
    CalcOperatorAdjustor.moveFormula = function (src, fromRow, fromColumn, dest, toRow, toColumn, rowCount, columnCount) {
        var srcCalcModel = src._getCalcModel(), destCalcModel = dest._getCalcModel();
        var calcSvc = srcCalcModel._getCalcServiceInternal();
        if (!srcCalcModel || !destCalcModel) {
            return;
        }
        var destRowCount = dest.getRowCount(), destColumnCount = dest.getColumnCount();
        var srcChangeInfo = srcCalcModel._getChangesForCalcEngine();
        var destChangeInfo = destCalcModel._getChangesForCalcEngine();
        var operatorAdjustor = calcSvc._getOperatorAdjustor();
        if (fromRow < 0) {
            fromRow = 0;
            rowCount = Math_min(src.getRowCount(), destRowCount);
        }
        if (toRow < 0) {
            toRow = 0;
        }
        if (fromColumn < 0) {
            fromColumn = 0;
            columnCount = Math_min(src.getColumnCount(), destColumnCount);
        }
        if (toColumn < 0) {
            toColumn = 0;
        }
        var crossSheet = !(src === dest && src.name() === dest.name());
        var toRowCount = rowCount, toColumnCount = columnCount, fromRowCount = rowCount, fromColumnCount, pasteSkipInvisibleRange = dest._getPasteSkipInvisibleRange();
        if (pasteSkipInvisibleRange) {
            toRowCount += dest._getNextInvisibleCount(toRow, rowCount, true);
            toColumnCount += dest._getNextInvisibleCount(toColumn, columnCount);
        }
        srcCalcModel._unlinkCellExpression(fromRow, fromColumn, rowCount, columnCount);
        addDependentsToAdjust(srcCalcModel, fromRow, fromColumn, rowCount, columnCount);
        destCalcModel._unlinkCellExpression(toRow, toColumn, toRowCount, toColumnCount);
        addDependentsToAdjust(destCalcModel, toRow, toColumn, toRowCount, toColumnCount);
        var nodes = [], r, c, expr, arrayInfo, workingExpr, fromRowIndex, fromColumnIndex;
        for (r = 0; r < rowCount; r++) {
            for (c = 0; c < columnCount; c++) {
                expr = srcCalcModel._getExpr(r + fromRow, c + fromColumn);
                arrayInfo = srcCalcModel._getArrayInfo(r + fromRow, c + fromColumn);
                workingExpr = srcCalcModel._getWorkingExpr(r + fromRow, c + fromColumn);
                if (expr) {
                    nodes.push({ _expr: expr, _arrayInfo: arrayInfo, _workingExpr: workingExpr });
                    srcCalcModel._clearAllExpr(r + fromRow, c + fromColumn, srcChangeInfo);
                }
                else {
                    nodes.push(keyword_null);
                }
            }
        }
        var toArrayInfo, sourceChangedExprInfos = crossSheet ? {} : null;
        for (r = 0, fromRowIndex = 0; r < fromRowCount && (r + toRow < destRowCount); r++) {
            var destRow = r + toRow;
            if (pasteSkipInvisibleRange && dest.getRowHeight(destRow) === 0) {
                fromRowCount++;
                continue;
            }
            for (c = 0, fromColumnIndex = 0, fromColumnCount = columnCount; c < fromColumnCount && (toColumn + c < destColumnCount); c++) {
                var destColumn = c + toColumn;
                if (pasteSkipInvisibleRange && dest.getColumnWidth(destColumn) === 0) {
                    fromColumnCount++;
                    continue;
                }
                var exprInfo = nodes[fromRowIndex * columnCount + fromColumnIndex];
                if (exprInfo) {
                    expr = exprInfo._expr;
                    arrayInfo = exprInfo._arrayInfo;
                    if (pasteSkipInvisibleRange && arrayInfo) {
                        fromColumnIndex++;
                        continue;
                    }
                    if (calcSvc && arrayInfo && !arrayInfo.isDynamicArray && arrayInfo.row === fromRow + r && arrayInfo.col === fromColumn + c) {
                        toArrayInfo = Core_1._createRange(destRow, destColumn, arrayInfo.rowCount, arrayInfo.colCount);
                    }
                    var _arrayInfo = (arrayInfo && !arrayInfo.isDynamicArray) ? toArrayInfo : keyword_undefined;
                    workingExpr = exprInfo._workingExpr;
                    destCalcModel._backupNodeItem(destChangeInfo, destRow, destColumn);
                    destCalcModel._setExpr(destRow, destColumn, expr);
                    destCalcModel._setArrayInfo(destRow, destColumn, _arrayInfo);
                    destCalcModel._setWorkingExpr(destRow, destColumn, workingExpr);
                    if (crossSheet) {
                        sourceChangedExprInfos[destRow + ', ' + destColumn] = expr;
                    }
                }
                else {
                    destCalcModel._backupNodeItem(destChangeInfo, destRow, destColumn);
                    destCalcModel._setExpr(destRow, destColumn, keyword_undefined);
                    destCalcModel._setArrayInfo(destRow, destColumn, keyword_undefined);
                }
                fromColumnIndex++;
            }
            fromRowIndex++;
        }
        operatorAdjustor._addCellsToAdjust(srcCalcModel, fromRow, fromColumn, rowCount, columnCount);
        operatorAdjustor._addCellsToAdjust(destCalcModel, toRow, toColumn, toRowCount, toColumnCount);
        var sheet = srcCalcModel.getSource().getSheet(), validators = sheet._validations && (sheet.parent || sheet)._getValidatorsWithFormula();
        operatorAdjustor._adjustFormulasOnMoveSwap(validators, srcCalcModel.getSource(), fromRow, fromColumn, destCalcModel.getSource(), toRow, toColumn, rowCount, columnCount, true, sourceChangedExprInfos);
        if (crossSheet === true) {
            operatorAdjustor._adjustFormulasOnMoveSwap(validators, srcCalcModel.getSource(), fromRow, fromColumn, destCalcModel.getSource(), toRow, toColumn, rowCount, columnCount, true, sourceChangedExprInfos);
        }
    };
    CalcOperatorAdjustor.prototype.isAdjustCell = function (cell) {
        return cell.preAdj || (this._heads && cell === this._heads[0]);
    };
    CalcOperatorAdjustor.prototype.isAdjust = function (cell) {
        return cell.preAdj || (this._heads && cell === this._heads[0]);
    };
    CalcOperatorAdjustor.prototype._addAdjust = function (node, type) {
        var self = this, head, tail;
        if (isNaN(type)) {
            return;
        }
        if (!self._heads) {
            self._heads = {};
            self._tails = {};
        }
        head = self._heads[type];
        tail = self._tails[type];
        if (node && !node.preAdj && node !== head) {
            if (head) {
                tail.nextAdj = node;
            }
            else {
                self._heads[type] = node;
            }
            node.preAdj = tail;
            node.nextAdj = keyword_null;
            self._tails[type] = node;
        }
    };
    CalcOperatorAdjustor.prototype._removeAdjust = function (node, type) {
        var self = this, head;
        if (isNaN(type)) {
            return;
        }
        head = self._heads && self._heads[type];
        if (node && (node.preAdj || node === head)) {
            var prevAdjust = node.preAdj;
            var nextAdj = node.nextAdj;
            if (prevAdjust) {
                prevAdjust.nextAdj = nextAdj;
            }
            else {
                self._heads[type] = nextAdj;
            }
            if (nextAdj) {
                nextAdj.preAdj = prevAdjust;
            }
            else {
                self._tails[type] = prevAdjust;
            }
            node.preAdj = keyword_null;
            node.nextAdj = keyword_null;
        }
    };
    CalcOperatorAdjustor.prototype._adjustFormulasOnAddRemove = function (addModel, index, count, isRow, isAdd, isInTable, isUndo) {
        this._adjustFormulasOnOperator(addModel, adjustFormulaOnAddRemove, index, count, isRow, isAdd, isInTable, isUndo);
        var row1 = 0, col1 = 0, row2 = 0, col2 = 0;
        if (index === 0) {
            if (isRow && isAdd) {
                row2 = count;
            }
            else if (isRow) {
                row1 = count;
            }
            else if (isAdd) {
                col2 = count;
            }
            else {
                col1 = count;
            }
        }
        adjustValidatorFormulasOnOperator(addModel, adjustFormulaOnAddRemove, index, count, row1, col1, row2, col2, isRow, isAdd);
        adjustConditionalFormatsFormulasOnOperator(addModel, adjustFormulaOnAddRemove, index, count, isRow, isAdd);
    };
    CalcOperatorAdjustor.prototype._adjustFormulasOnOperator = function (model, expressionAdjustor, index, count, isRow, isAdd, isInTable, isUndo) {
        var self = this;
        var heads = self._heads;
        if (!heads) {
            return;
        }
        var calcModel;
        var row, column;
        var expr;
        var head;
        var source;
        var calcChangeInfo;
        var settedMap = {};
        while (heads[0]) {
            head = heads[0];
            calcModel = head._sourceModel;
            calcChangeInfo = calcModel._getChangesForCalcEngine();
            source = calcModel.getSource();
            row = head.row;
            column = head.column;
            if (hasMapValue(settedMap, row, column)) {
                self._removeAdjust(head, 0 );
                continue;
            }
            expr = calcModel._getExpr(row, column);
            if (expr) {
                expr = expressionAdjustor.call(self, source, row, column, expr, model, index, count, isRow, isAdd, keyword_undefined, isInTable, isUndo);
                var arrayInfo = calcModel._getArrayInfo(row, column);
                if (arrayInfo) {
                    if (source === model) {
                        var offset = isAdd ? count : -count;
                        if (isRow) {
                            if (index <= arrayInfo.row) {
                                arrayInfo.row += offset;
                            }
                        }
                        else if (index <= arrayInfo.col) {
                            arrayInfo.col += offset;
                        }
                    }


                    if (row === arrayInfo.row && column === arrayInfo.col) {
                        if (arrayInfo.isDynamicArray) {
                            calcModel._setExpression(row, column, expr, arrayInfo, true, getCalcChangeInfoForAddRemove(isRow ? row : column, index, calcChangeInfo, model.id === source.id));
                        }
                        else {
                            for (var r = row; r < row + arrayInfo.rowCount; r++) {
                                if (!settedMap[r]) {
                                    settedMap[r] = {};
                                }
                                for (var c = column; c < column + arrayInfo.colCount; c++) {
                                    calcModel._setExpression(r, c, expr, arrayInfo, r === row && c === column, getCalcChangeInfoForAddRemove(isRow ? r : c, index, calcChangeInfo, model.id === source.id));
                                    setMapValue(settedMap, r, c, true);
                                }
                            }
                        }
                    }
                }
                else {
                    calcModel._setExpression(row, column, expr, arrayInfo, true, getCalcChangeInfoForAddRemove(isRow ? row : column, index, calcChangeInfo, model.id === source.id));
                }
            }
            else if ((calcModel.getRowExpression && calcModel.getRowExpression(row)) || (calcModel.getColumnExpression && calcModel.getColumnExpression(column))) {
                calcModel._addCellsToDirty(row, column, 1, 1);
            }
            self._removeAdjust(head, 0 );
        }
        while (heads[1]) {
            head = heads[1];
            calcModel = head._sourceModel;
            calcChangeInfo = calcModel._getChangesForCalcEngine();
            row = head.row;
            if (calcModel.getRowExpression) {
                expr = calcModel.getRowExpression(row);
                if (expr && calcModel._setExpression) {
                    source = calcModel.getSource();
                    calcModel._setExpression(row, -1, expressionAdjustor.call(self, source, row, -1, expr, model, index, count, isRow, isAdd), keyword_undefined, true, getCalcChangeInfoForAddRemove(row, index, calcChangeInfo, model.id === source.id));
                }
            }
            self._removeAdjust(head, 1 );
        }
        while (heads[2]) {
            head = heads[2];
            calcModel = head._sourceModel;
            calcChangeInfo = calcModel._getChangesForCalcEngine();
            column = head.column;
            if (calcModel.getColumnExpression) {
                expr = calcModel.getColumnExpression(column);
                if (expr && calcModel._setExpression) {
                    source = calcModel.getSource();
                    calcModel._setExpression(-1, column, expressionAdjustor.call(self, source, -1, column, expr, model, index, count, isRow, isAdd), keyword_undefined, true, getCalcChangeInfoForAddRemove(column, index, calcChangeInfo, model.id === source.id));
                }
            }
            self._removeAdjust(head, 2 );
        }
        while (heads[3]) {
            var nameIDs = heads[3], nameID = nameIDs.name;
            calcModel = nameIDs._sourceModel;
            expr = calcModel._getExpressionWithRowColumnByName(nameID);
            var newExpr = expressionAdjustor.call(self, calcModel.getSource(), 0, 0, expr, model, index, count, isRow, isAdd, { isNameID: true });
            calcModel._setExpressionByName(nameID, newExpr);
            self._removeAdjust(nameIDs, 3 );
        }
        for (var p in heads) {
            var num = +p;
            if (num > 3 && heads.hasOwnProperty(p)) {
                while (heads[p]) {
                    var node = heads[p];
                    var calcModel2 = node._sourceModel;
                    expr = expressionAdjustor.call(self, calcModel2, 0, 0, node.expression, model, index, count, isRow, isAdd);
                    calcModel2.setExpression(node.id, node.name, expr);
                    self._removeAdjust(node, num );
                }
            }
        }
    };
    CalcOperatorAdjustor.prototype._adjustFormulasOnRemoveSheet = function (removeSource) {
        var self = this, model = removeSource.getCalcSourceModel(), rowCount = removeSource.getRowCount(), colCount = removeSource.getColumnCount();
        addDependentsToAdjust(model, 0, 0, rowCount, colCount);
        self._adjustFormulasOnOperator(removeSource, adjustFormulaOnRemoveSheet2);
        adjustValidatorFormulasOnOperator(removeSource, adjustFormulaOnRemoveSheet2, 0, 0, 0, 0, 0, 0, true, false);
        adjustConditionalFormatsFormulasOnOperator(removeSource, adjustFormulaOnRemoveSheet2, 0, 0, true, false);
    };
    CalcOperatorAdjustor.prototype._adjustFormulasOnMoveSwap = function (validators, fromModel, fromRow, fromColumn, toModel, toRow, toColumn, rowCount, columnCount, isMove, sourceChangedExprInfos) {
        var self = this, adjustor = adjustFormulaOnMoveSwap;
        var info = new MoveSwapInfo(fromModel, fromRow, fromColumn, toModel, toRow, toColumn, rowCount, columnCount);
        var calcModel, head, row, column, expr, settedMap = {}, calcChangInfo;
        validators && adjustDataValidatorFormulasOnMoveSwap(validators, info, isMove);
        adjustConditionalFormatsFormulasOnMoveSwap(fromModel, info, isMove);
        var heads = self._heads;
        var exprSource, arrayFormulaCache = {};
        if (!heads) {
            return;
        }
        while (heads[0]) {
            head = heads[0];
            calcModel = head._sourceModel;
            row = head.row;
            column = head.column;
            calcChangInfo = calcModel._getChangesForCalcEngine();
            if (hasMapValue(settedMap, row, column)) {
                self._removeAdjust(head, 0 );
                continue;
            }
            expr = calcModel._getExpr(row, column);
            exprSource = calcModel.getSource();
            if (expr) {
                var options = keyword_undefined;
                if (sourceChangedExprInfos && sourceChangedExprInfos[row + ', ' + column]) {
                    exprSource = fromModel;
                    options = { crossSheetMoved: true };
                }
                expr = adjustor.call(self, exprSource, row, column, expr, info, isMove, options);
                var arrayInfo = calcModel._getArrayInfo(row, column), key = void 0;
                if (arrayInfo && !arrayInfo.isDynamicArray) {
                    key = getKeyOfRange(arrayInfo);


                    if (row === arrayInfo.row && column === arrayInfo.col) {
                        arrayFormulaCache[key] = true;
                        for (var r = row; r < row + arrayInfo.rowCount; r++) {
                            if (!settedMap[r]) {
                                settedMap[r] = {};
                            }
                            for (var c = column; c < column + arrayInfo.colCount; c++) {
                                calcModel._setExpression(r, c, expr, arrayInfo, r === row && c === column, calcChangInfo);
                                setMapValue(settedMap, r, c, true);
                            }
                        }
                    }
                    else if (!arrayFormulaCache[key]) {
                        calcModel._setExpression(row, column, expr, arrayInfo, false, calcChangInfo);
                        setMapValue(settedMap, row, column, true);
                    }
                }
                else {
                    calcModel._setExpression(row, column, expr, arrayInfo, true, calcChangInfo);
                }
            }
            else if ((calcModel.getRowExpression && calcModel.getRowExpression(row)) || (calcModel.getColumnExpression && calcModel.getColumnExpression(column))) {
                calcModel._addCellsToDirty(row, column, 1, 1);
            }
            self._removeAdjust(head, 0 );
        }
        while (heads[1]) {
            head = heads[1];
            calcModel = head._sourceModel;
            row = head.row;
            calcChangInfo = calcModel._getChangesForCalcEngine();
            if (calcModel.getRowExpression) {
                expr = calcModel.getRowExpression(row);
                if (expr && calcModel._setRowExpression) {
                    calcModel._setRowExpression(row, adjustor.call(self, exprSource, row, -1, expr, info, isMove), keyword_undefined, calcChangInfo);
                }
            }
            self._removeAdjust(head, 1 );
        }
        while (heads[2]) {
            head = heads[2];
            calcModel = head._sourceModel;
            column = head.column;
            calcChangInfo = calcModel._getChangesForCalcEngine();
            if (calcModel.getColumnExpression) {
                expr = calcModel.getColumnExpression(column);
                if (expr && calcModel._setColumnExpression) {
                    calcModel._setColumnExpression(column, adjustor.call(self, exprSource, -1, column, expr, info, isMove), keyword_undefined, calcChangInfo);
                }
            }
            self._removeAdjust(head, 2 );
        }
        while (heads[3]) {
            var nameIDs = heads[3], nameID = nameIDs.name;
            calcModel = nameIDs._sourceModel;
            expr = calcModel._getExpressionWithRowColumnByName(nameID);
            var newExpr = adjustor.call(self, exprSource, 0, 0, expr, info, isMove);
            calcModel._setExpressionByName(nameID, newExpr);
            self._removeAdjust(nameIDs, 3 );
        }
        for (var p in heads) {
            var num = +p;
            if (num > 3 && heads.hasOwnProperty(p)) {
                while (heads[p]) {
                    var node = heads[p];
                    var calcModel2 = node._sourceModel;
                    var source = calcModel2.getSource();
                    expr = adjustor.call(self, source, 0, 0, node.expression, info, isMove);
                    calcModel2.setExpression(node.id, node.name, expr);
                    self._removeAdjust(node, num );
                }
            }
        }
    };
    CalcOperatorAdjustor.prototype._addCellsToAdjust = function (sourceModel, row, column, rowCount, columnCount) {
        var self = this;
        var endRow = row + rowCount, endCol = column + columnCount;
        var calc, expr;
        for (var r = row; r < endRow; r++) {
            for (var c = column; c < endCol; c++) {
                calc = sourceModel._getCalc(r, c);
                expr = sourceModel._getExpr(r, c);
                if (!calc && !expr) {
                    continue;
                }
                self._removeAdjust(calc, 0 );
                sourceModel._removeCalc(r, c, 0);
                var cellCalc = sourceModel._getCellCalc(r, c, true);
                self._addAdjust(cellCalc, 0 );
            }
        }
    };
    CalcOperatorAdjustor.prototype._addColumnsToAdjust = function (sourceModel, col, colCount) {
        var self = this;
        for (var c = col; c !== -1 && c < col + colCount; c++) {
            if (!sourceModel._getCalc(-1, c) && !sourceModel._getExpr(-1, c)) {
                continue;
            }
            sourceModel._removeCalc(-1, c, 2);
            var columnCalc = sourceModel._getColumnCalc(c, true);
            self._addAdjust(columnCalc, 2 );
        }
    };
    CalcOperatorAdjustor.prototype._addRowsToAdjust = function (sourceModel, row, rowCount) {
        var self = this;
        for (var r = row; r !== -1 && r < row + rowCount; r++) {
            if (!sourceModel._getCalc(r, -1) && !sourceModel._getExpr(r, -1)) {
                continue;
            }
            sourceModel._removeCalc(r, -1, 1);
            var rowCalc = sourceModel._getRowCalc(r, true);
            self._addAdjust(rowCalc, 1 );
        }
    };
    CalcOperatorAdjustor.prototype._addVolatitleToAdjust = function (sourceModel) {
        var self = this;
        var sheetModels = sourceModel._getCalcServiceInternal().getAllSourceModels(), volatiles, volatiCalc;
        for (var sheetIndex = 0; sheetIndex < sheetModels.length; sheetIndex++) {
            var calcModel = sheetModels[sheetIndex];
            if (calcModel._getAllVolatiles) {
                volatiles = calcModel._getAllVolatiles();
                for (var volatileIndex = 0; volatileIndex < volatiles.length; volatileIndex++) {
                    volatiCalc = volatiles[volatileIndex];
                    if (volatiCalc && volatiCalc.isVolatile && (volatiCalc instanceof CalcEngine_1.CellCalc) && !self.isAdjustCell(volatiCalc)) {
                        self._addAdjust(volatiCalc, 0 );
                    }
                }
            }
        }
    };
    CalcOperatorAdjustor.prototype.onBeforeAddRemoveRows = function (sourceModel, row, rhModel) {
        [sourceModel, rhModel].forEach(function (model) {
            if (model) {
                var rc = model.rC(), cc = model.cC();
                model._unlinkCellExpression(row, 0, rc - row, cc);
                model._unlinkRowExpression(row, rc - row);
                addDependentsToAdjust(model, row, -1, rc - row, -1, true );
            }
        });
    };
    CalcOperatorAdjustor.prototype.onAfterAddRemoveRows = function (sourceModel, row, count, isAdd, isUndo, rhModel) {
        var self = this;
        [sourceModel, rhModel].forEach(function (model) {
            if (model) {
                var rc = model.rC(), cc = model.cC();
                if (isAdd) {
                    model._addCellsToDirty(row, 0, count, cc);
                }
                else {
                    rc += count;
                }
                self._addCellsToAdjust(model, row, 0, rc - row, cc);
                self._addRowsToAdjust(model, row, rc - row);
                self._addVolatitleToAdjust(model);
            }
        });
        self._adjustFormulasOnAddRemove(sourceModel.getSource(), row, count, true, isAdd, keyword_undefined, isUndo);
        if (sourceModel._getCalcServiceInternal().autoCalculation) {
            sourceModel._getCalcServiceInternal().recalculateAll(false);
        }
    };
    CalcOperatorAdjustor.prototype.onAfterAddRemoveColumns = function (sourceModel, column, count, isAdd, isUndo, chModel) {
        var self = this;
        [sourceModel, chModel].forEach(function (model) {
            if (model) {
                var rc = model.rC(), cc = model.cC();
                if (isAdd) {
                    model._addCellsToDirty(0, column, rc, count);
                }
                else {
                    cc += count;
                }
                self._addCellsToAdjust(model, 0, column, rc, cc - column);
                self._addColumnsToAdjust(model, column, cc - column);
                self._addVolatitleToAdjust(model);
            }
        });
        self._adjustFormulasOnAddRemove(sourceModel.getSource(), column, count, false, isAdd, keyword_undefined, isUndo);
        if (sourceModel._getCalcServiceInternal().autoCalculation) {
            sourceModel._getCalcServiceInternal().recalculateAll(false);
        }
    };
    CalcOperatorAdjustor.prototype.onBeforeAddRemoveColumns = function (sourceModel, column, chModel) {
        [sourceModel, chModel].forEach(function (model) {
            if (model) {
                var rc = model.rC(), cc = model.cC();
                model._unlinkCellExpression(0, column, rc, cc - column);
                model._unlinkColumnExpression(column, cc - column);
                addDependentsToAdjust(model, -1, column, -1, cc - column, true );
            }
        });
    };
    CalcOperatorAdjustor.prototype.onAfterRemoveName = function (calcModel, name) {
        var nameCalc = calcModel._getNameCalc(name, false);
        if (nameCalc) {
            nameCalc.updateListening(true, false);
            nameCalc._addToDirty();
            nameCalc.updateListeningOnRemoved();
        }
    };
    CalcOperatorAdjustor.prototype.adjustFormulaOnRemoveName = function (baseModel, oldExpr, name) {
        return adjustFormulaOnRemoveNameImp(baseModel, oldExpr, name);
    };
    CalcOperatorAdjustor.prototype.invalidName = function (source, name) {
        if (!name) {
            return;
        }
        var model = source.getCalcSourceModel();
        var nameCalc = model._getNameCalc(name.toUpperCase(), true);
        if (nameCalc) {
            nameCalc._addListenersToAdjust();
        }
    };
    CalcOperatorAdjustor.prototype.onAfterRemoveTable = function (tables, convertToError) {
        var self = this, calcModel, row, column, expr;
        for (var i = 0; i < tables.length; i++) {
            var table = tables[i];
            addDependentsToAdjust(table.source().getCalcSourceModel(), table.startRow(), table.startColumn(),
            table.endRow() - table.startRow() + 1, table.endColumn() - table.startColumn() + 1);
        }
        var heads = self._heads;
        if (!heads) {
            return;
        }
        var settedMap = {};
        while (heads[0]) {
            var head = heads[0];
            calcModel = head._sourceModel;
            row = head.row;
            column = head.column;
            if (hasMapValue(settedMap, row, column)) {
                self._removeAdjust(head, 0 );
                continue;
            }
            expr = calcModel._getExpr(row, column);
            if (expr) {
                expr = CalcOperatorAdjustor.adjustExpressionOnRemoveTable(expr, tables, row, column, convertToError);
                var arrayInfo = calcModel._getArrayInfo(row, column);
                if (arrayInfo && !arrayInfo.isDynamicArray) {
                    arrayInfo = Core_1._createRange(row, column, arrayInfo.rowCount, arrayInfo.colCount);
                    for (var r = row; r < row + arrayInfo.rowCount; r++) {
                        if (!settedMap[r]) {
                            settedMap[r] = {};
                        }
                        for (var c = column; c < column + arrayInfo.colCount; c++) {
                            calcModel._setExpression(r, c, expr, arrayInfo, r === row && c === column);
                            setMapValue(settedMap, r, c, true);
                        }
                    }
                }
                else {
                    calcModel._setExpression(row, column, expr, arrayInfo, true);
                }
            }
            else if ((calcModel.getRowExpression && calcModel.getRowExpression(row)) || (calcModel.getColumnExpression && calcModel.getColumnExpression(column))) {
                calcModel._addCellsToDirty(row, column, 1, 1);
            }
            self._removeAdjust(head, 0 );
        }
    };
    CalcOperatorAdjustor.adjustExpressionOnRemoveTable = function (expr, tables, baseRow, baseCol, convertToError) {
        var selfFunc = CalcOperatorAdjustor.adjustExpressionOnRemoveTable;
        if (expr.type === 9 ) {
            var left = expr.value, right = expr.value2;
            var newLeft = selfFunc(left, tables, baseRow, baseCol, convertToError);
            var newRight = right && selfFunc(right, tables, baseRow, baseCol, convertToError);
            if (left !== newLeft || right !== newRight) {
                return CalcEngine_1._createOperatorExpression(expr.operatorType, newLeft, newRight);
            }
        }
        else if (expr.type === 7 ) {
            var hasChange = false, newArgs = [];
            for (var i = 0; i < expr.arguments.length; i++) {
                var arg = expr.arguments[i];
                var newArg = selfFunc(arg, tables, baseRow, baseCol, convertToError);
                hasChange = hasChange || arg !== newArg;
                newArgs.push(newArg);
            }
            if (hasChange) {
                return CalcEngine_1._createFunctionExpression(expr, newArgs);
            }
        }
        else if (expr.type === 10 ) {
            var partExp = expr, argExp = partExp.value, newExp = selfFunc(argExp, tables, baseRow, baseCol, convertToError);
            if (argExp !== newExp) {
                return CalcEngine_1._createParenthesesExpression(newExp);
            }
        }
        else if (expr.type === 13 ) {
            var tableExpr = expr;
            for (var i = 0; i < tables.length; i++) {
                if (tableExpr.baseTable === tables[i]) {
                    if (convertToError) {
                        return CalcEngine_1._referenceErrorExpr;
                    }
                    var range = tableExpr.getRange(baseRow === -1 ? 0 : baseRow, baseCol === -1 ? 0 : baseCol, true);
                    var isRowRelative = baseRow === -1 || tableExpr.referencePortions() === 1 ;
                    var isCell = range.rowCount === 1 && range.columnCount === 1;
                    var extSource = tableExpr.source;
                    if (isCell) {
                        return CalcEngine_1._createCellExpression(extSource, keyword_null, range.row, range.col, isRowRelative, false);
                    }
                    return CalcEngine_1._createRangeExpression(extSource, keyword_null, range.row, range.col, range.row + range.rowCount - 1, range.col + range.colCount - 1, isRowRelative, false, isRowRelative, false);
                }
            }
        }
        return expr;
    };
    return CalcOperatorAdjustor;
}());
exports.CalcOperatorAdjustor = CalcOperatorAdjustor;

var calcServicePrototype = CalcEngine_1.CalcService.prototype;
calcServicePrototype._setOperatorAdjustor = function () {
    return new CalcOperatorAdjustor();
};

function adjustIndexesOnAdd(baseModel, refModel, baseIndex, index, relative, endIndex, endRelative, addModel, addIndex, addCount, isRow, isInTable) {
    if (baseIndex >= 0 || !relative) {
        var refIndex = index + (relative ? baseIndex : 0);
        var refEndIndex = endIndex + (endRelative ? baseIndex : 0);
        var adjustForAddRows = isRow && adjustForAddRemove(addModel, baseModel, isRow);
        var adjustForAddCols = !isRow && adjustForAddRemove(addModel, baseModel, isRow);
        if ((adjustForAddRows || adjustForAddCols) && ((!isInTable && addIndex + addCount <= baseIndex) || (isInTable && addIndex <= baseIndex))) {
            refIndex -= (relative ? addCount : 0);
            refEndIndex -= (endRelative ? addCount : 0);
        }
        adjustForAddRows = isRow && adjustForAddRemove(addModel, refModel, isRow);
        adjustForAddCols = !isRow && adjustForAddRemove(addModel, refModel, isRow);
        if (adjustForAddRows || adjustForAddCols) {
            if ((!isInTable && addIndex <= refIndex) || (isInTable && ((relative && baseIndex + index >= addIndex) || (!relative && index >= addIndex)))) {
                refIndex += addCount;
                refEndIndex += addCount;
            }
            else if ((!isInTable && addIndex <= refEndIndex) || (isInTable && ((endRelative && baseIndex + endIndex >= addIndex) || (!endRelative && endIndex >= addIndex)))) {
                refEndIndex += addCount;
            }
        }
        refIndex -= (relative ? baseIndex : 0);
        refEndIndex -= (endRelative ? baseIndex : 0);
        if (isInTable && addIndex + addCount <= baseIndex) {
            refIndex += (relative ? addCount : 0);
            refEndIndex += (endRelative ? addCount : 0);
        }
        return { index: refIndex, endIndex: refEndIndex };
    }
    return { index: index, endIndex: endIndex };
}
function adjustCellExpressionOnAddRemove(baseModel, refModel, baseRow, baseColumn, refExpr, opModel, opIndex, opCount, isRow, isAdd, isInTable, isUndo) {
    if (refModel && !isUndo) {
        var index = isRow ? refExpr.row : refExpr.column, isRelative = isRow ? refExpr.rowRelative : refExpr.columnRelative, newIndex = void 0;
        if (isRow && baseRow >= 0 || !isRow && baseColumn >= 0 || !isRelative) {
            if (isAdd) {
                newIndex = adjustIndexesOnAdd(baseModel, refModel, isRow ? baseRow : baseColumn, index, isRelative, -1, false, opModel, opIndex, opCount, isRow, isInTable).index;
            }
            else {
                newIndex = adjustCellOnRemove(baseModel, refModel, isRow ? baseRow : baseColumn, index, isRelative, opModel, opIndex, opCount, isRow, isInTable);
                if (_isError(newIndex)) {
                    return CalcEngine_1._createErrorExpression(newIndex);
                }
            }
            if (newIndex !== index) {
                refExpr = refExpr.offset(isRow ? newIndex - index : 0, isRow ? 0 : newIndex - index, true);
            }
        }
    }
    return refExpr;
}
function adjustRangeExpressionOnAddRemove(baseModel, refModel, baseRow, baseColumn, refExpr, opModel, opIndex, opCount, isRow, isAdd, isInTable, isUndo) {
    if (refModel && !isUndo) {
        var rangeType = refExpr._getRangeType();
        if (rangeType === 3 || isRow && rangeType === 2 || !isRow && rangeType === 1 ) {
            return refExpr;
        }
        var isStartRelative = isRow ? refExpr.rowRelative : refExpr.columnRelative, isEndRelative = isRow ? refExpr.endRowRelative : refExpr.endColumnRelative, startIndex = isRow ? refExpr.row : refExpr.column, endIndex = isRow ? refExpr.endRow : refExpr.endColumn, result = void 0;
        if (isRow && baseRow >= 0 || !isRow && baseColumn >= 0 || !isStartRelative || !isEndRelative) {
            if (isAdd) {
                result = adjustIndexesOnAdd(baseModel, refModel, isRow ? baseRow : baseColumn, startIndex, isStartRelative, endIndex, isEndRelative, opModel, opIndex, opCount, isRow, isInTable);
            }
            else {
                result = adjustRangeOnRemove(baseModel, refModel, isRow ? baseRow : baseColumn, startIndex, isStartRelative, endIndex, isEndRelative, opModel, opIndex, opCount, isRow, isInTable);
                if (_isError(result)) {
                    return CalcEngine_1._createErrorExpression(result);
                }
            }
            var newStartIndex = result.index;
            var newEndIndex = result.endIndex;
            if (newStartIndex !== startIndex || newEndIndex !== endIndex) {
                refExpr = refExpr.offset2(isRow ? newStartIndex - startIndex : 0, isRow ? 0 : newStartIndex - startIndex, isRow ? newEndIndex - endIndex : 0, isRow ? 0 : newEndIndex - endIndex, baseRow, baseColumn);
            }
        }
    }
    return refExpr;
}
function adjustStructReferenceExpressionOnAddRemoveColumn(baseModel, refModel, baseRow, baseColumn, refExpr, opModel, opColumn, opColumnCount, isAdd) {
    if (refModel) {
        var table = refExpr;
        if (table ) {
            return table.offsetWhenInsertRemoveColumn(opColumn, opColumnCount, isAdd);
        }
    }
    return refExpr;
}
function adjustFormulaOnAddRemove(baseModel, baseRow, baseColumn, oldExpr, opModel, opIndex, opCount, isRow, isAdd, options, isInTable, isUndo) {
    var selfFunction = adjustFormulaOnAddRemove;
    var newExpr = oldExpr, arg;
    if (!oldExpr) {
        return;
    }
    if (oldExpr.type === 1 && oldExpr._isCell() || oldExpr.type === 33 ) {
        newExpr = adjustCellExpressionOnAddRemove(baseModel, oldExpr.source || baseModel, baseRow, baseColumn, oldExpr, opModel, opIndex, opCount, isRow, isAdd, isInTable, isUndo);
    }
    else if (oldExpr.type === 1 ) {
        newExpr = adjustRangeExpressionOnAddRemove(baseModel, oldExpr.source || baseModel, baseRow, baseColumn, oldExpr, opModel, opIndex, opCount, isRow, isAdd, isInTable, isUndo);
    }
    else if (oldExpr.type === 10 ) {
        arg = selfFunction(baseModel, baseRow, baseColumn, oldExpr.value, opModel, opIndex, opCount, isRow, isAdd, keyword_undefined, isInTable, isUndo);
        if (arg !== oldExpr.value) {
            newExpr = CalcEngine_1._createParenthesesExpression(arg);
        }
    }
    else if (oldExpr.type === 9 ) {
        var arg0 = selfFunction(baseModel, baseRow, baseColumn, oldExpr.value, opModel, opIndex, opCount, isRow, isAdd, keyword_undefined, isInTable, isUndo);
        var arg1 = oldExpr.value2 && selfFunction(baseModel, baseRow, baseColumn, oldExpr.value2, opModel, opIndex, opCount, isRow, isAdd, keyword_undefined, isInTable, isUndo);
        if (arg0 !== oldExpr.value || arg1 !== oldExpr.value2) {
            newExpr = CalcEngine_1._createOperatorExpression(oldExpr.operatorType, arg0, arg1);
        }
    }
    else if (oldExpr.type === 7 ) {
        var args = keyword_null, fnArg = void 0, i = void 0, funcExpr = oldExpr;
        var argCount = funcExpr.arguments.length;
        for (i = 0; i < argCount; i++) {
            fnArg = funcExpr.arguments[i];
            arg = selfFunction(baseModel, baseRow, baseColumn, fnArg, opModel, opIndex, opCount, isRow, isAdd, keyword_undefined, isInTable, isUndo);
            if (arg !== fnArg) {
                args = [];
                args[i] = arg;
                break;
            }
        }
        if (args) {
            for (i = 0; i < argCount; i++) {
                fnArg = funcExpr.arguments[i];
                if (args[i] === keyword_undefined || args[i] === keyword_null) {
                    args[i] = selfFunction(baseModel, baseRow, baseColumn, fnArg, opModel, opIndex, opCount, isRow, isAdd, keyword_undefined, isInTable, isUndo);
                }
            }
            newExpr = CalcEngine_1._createFunctionExpression(funcExpr, args);
        }
    }
    else if (!isInTable && !isRow && oldExpr.type === 13 ) {
        newExpr = adjustStructReferenceExpressionOnAddRemoveColumn(baseModel, baseModel, baseRow, baseColumn, oldExpr, opModel, opIndex, opCount, isAdd);
    }
    return newExpr;
}
function adjustValidatorFormulasOnOperator(model, expressionAdjustor, index, count, beginRow, beginCol, endRow, endCol, isRow, isAdd) {
    var adjustExpression = function (sheetSource, expr, baseRow, baseCol) {
        return expressionAdjustor.call(this, sheetSource, baseRow, baseCol, expr, model, index, count, isRow, isAdd);
    };
    var sheet = model.getSheet(), validators = sheet._validations && (sheet.parent || sheet)._getValidatorsWithFormula(), changes = sheet._modelManager && sheet._modelManager._getChangesForCalcEngine();
    adjustValidatorFormulas(validators, adjustExpression, isRow, changes);
}
function adjustValidatorFormulas(validators, adjustExpression, isRow, changeInfo) {
    if (!validators) {
        return;
    }
    var dataValidator, condition, sheet, r, c;
    for (var i = 0; i < validators.length; i++) {
        var isFullRow = true, isFullCol = true;
        var baseRow = Calc3.maxRowCount - 1, baseCol = Calc3.maxColumnCount - 1;
        dataValidator = validators[i].validator;
        var ranges = dataValidator._ranges;
        for (var n = 0, count = ranges.length; n < count; n++) {
            var range = ranges[n];
            var rc = range.rowCount, cc = range.colCount;
            r = range.row;
            c = range.col;
            if (rc !== -1) {
                isFullCol = false;
                baseRow = baseRow > r ? r : baseRow;
            }
            if (cc !== -1) {
                isFullRow = false;
                baseCol = baseCol > c ? c : baseCol;
            }
            if (!isFullRow && !isFullCol) {
                break;
            }
        }
        if (isRow && isFullCol || !isRow && isFullRow) {
            continue;
        }
        sheet = validators[i].sheet;
        var sheetSource = sheet._getSheetSource();
        condition = dataValidator.condition();
        var expressions = condition.getExpressions();
        if (expressions && expressions.length > 0) {
            for (var j = 0; j < expressions.length; j++) {
                var expr = expressions[j];
                expressions[j] = adjustExpression(sheetSource, expr, baseRow, baseCol);
            }
            condition.setExpressions(expressions, changeInfo);
        }
    }
}

function getConditionalRules(fromSheet) {
    var result = [];
    var parent = fromSheet.parent, sheets = parent && parent.sheets || [fromSheet];
    sheets.forEach(function (sheet) {
        var conditionalFormats = sheet.conditionalFormats, rules = conditionalFormats && conditionalFormats.getRules();
        if (rules && rules.length) {
            rules.forEach(function (rule) {
                if (rule._withCondition) {
                    result.push({ rule: rule, sheet: sheet });
                }
            });
        }
    });
    return result;
}

function adjustConditionalFormatsFormulasOnOperator(model, expressionAdjustor, index, count, isRow, isAdd) {
    var adjustExpression = function (sheetSource, expr, baseRow, baseCol) {
        return expressionAdjustor.call(this, sheetSource, baseRow, baseCol, expr, model, index, count, isRow, isAdd);
    };
    var sheet = model.getSheet(), rules = getConditionalRules(sheet), changes = sheet._modelManager && sheet._modelManager._getChangesForCalcEngine();
    adjustRuleFormulas(rules, adjustExpression, changes, isRow, isAdd);
}
function adjustRuleFormulas(rules, adjustExpression, changeInfo, isRow, isAdd) {
    if (!rules) {
        return;
    }
    for (var i = 0, count = rules.length; i < count; i++) {
        var rule = rules[i].rule;
        var ranges = rule.ranges();
        var baseRowCol = getBaseRowBaseCol(ranges);
        var baseRow = baseRowCol.r;
        var baseCol = baseRowCol.c;
        var sheet = rules[i].sheet;
        var sheetSource = sheet._getSheetSource();
        var condition = rule.condition();


        var tableManager = sheet.tables;
        if (tableManager && ranges && ranges.length === 1) {
            var range = ranges[0], rangeRow = range.row, rangeCol = range.col, rangeRowCount = range.rowCount, rangeColCount = range.colCount;
            var tableRangeList = void 0;
            if (isAdd && isRow) {
                tableRangeList = tableManager._getTableListRanges(rangeRow, rangeCol, rangeRowCount, rangeColCount);
            }
            else if (sheet._fromTable && sheet._movingTableDataRange) {
                tableRangeList = [sheet._movingTableDataRange];
            }
            if (tableRangeList && tableRangeList.length) {
                var isContinue = false;
                for (var index = 0, len = tableRangeList.length; index < len; index++) {
                    var tableRange = tableRangeList[index], tableRow = tableRange.row, tableCol = tableRange.col, tableRangeRowCount = tableRange.rowCount, tableColCount = tableRange.colCount;

                    if (rangeRow === tableRow && rangeRowCount === tableRangeRowCount && rangeCol >= tableCol && rangeCol + rangeColCount <= tableCol + tableColCount) {
                        isContinue = true;
                        break;
                    }
                }
                if (isContinue) {
                    continue;
                }
            }
        }

        if (!condition) {
            rule.initCondition();
            condition = rule.condition();
        }
        var expressions = condition && condition.getExpressions();
        if (expressions && expressions.length > 0) {
            for (var j = 0; j < expressions.length; j++) {
                var expr = expressions[j];
                expressions[j] = adjustExpression(sheetSource, expr, baseRow, baseCol);
            }
            condition.setExpressions(expressions, changeInfo);
        }
    }
}

function adjustConditionalFormatsFormulasOnMoveSwap(model, info, isMove) {
    var adjustExpression = function (sheetSource, expr, baseRow, baseCol) {
        return adjustFormulaOnMoveSwap.call(this, sheetSource, baseRow, baseCol, expr, info, isMove);
    };
    var sheet = model.getSheet(), rules = getConditionalRules(sheet);
    adjustRuleFormulas(rules, adjustExpression, sheet._modelManager._getChangesForCalcEngine());
}

function adjustCellOnRemove(baseModel, refModel, baseIndex, index, relative, removeModel, removeIndex, removeCount, isRow, isInTable) {
    if (baseIndex >= 0 || !relative) {
        var refIndex = index + (relative ? baseIndex : 0);
        var adjustForRemoveRows = isRow && adjustForAddRemove(removeModel, baseModel, isRow);
        var adjustForRemoveCols = !isRow && adjustForAddRemove(removeModel, baseModel, isRow);
        if ((adjustForRemoveRows || adjustForRemoveCols) && removeIndex <= baseIndex) {
            refIndex += (relative ? removeCount : 0);
        }
        adjustForRemoveRows = isRow && adjustForAddRemove(removeModel, refModel, isRow);
        adjustForRemoveCols = !isRow && adjustForAddRemove(removeModel, refModel, isRow);
        if (adjustForRemoveRows || adjustForRemoveCols) {
            var tableStartRefIndex = baseIndex + index, tableEndRefIndex = baseIndex + removeCount + index;
            if ((!isInTable && removeIndex + removeCount <= refIndex) || (isInTable && tableStartRefIndex >= removeIndex + removeCount)) {
                refIndex -= removeCount;
            }
            else if ((!isInTable && removeIndex <= refIndex) || (isInTable && tableStartRefIndex >= removeIndex && removeIndex <= tableEndRefIndex && tableEndRefIndex <= removeIndex + removeCount)) {
                return CalcErrorsReference;
            }
        }
        refIndex -= (relative ? baseIndex : 0);
        if (isInTable && removeIndex <= baseIndex) {
            refIndex -= relative ? removeCount : 0;
        }
        return refIndex;
    }
    return index;
}
function adjustForAddRemove(opModel, otherModel, isRow) {
    var sheetAreasForAdjust = isRow ? { 2 : true } : { 1 : true };
    return opModel === otherModel || (opModel._sheet === otherModel._sheet && (opModel._sheetArea === 3 && sheetAreasForAdjust[otherModel._sheetArea] || sheetAreasForAdjust[opModel._sheetArea] && otherModel._sheetArea === 3));
}
function adjustRangeOnRemove(baseModel, refModel, baseIndex, index, relative, endIndex, endRelative, removeModel, removeIndex, removeCount, isRow, isInTable) {
    if (baseIndex >= 0 || !relative) {
        var refIndex = index + (relative ? baseIndex : 0);
        var refEndIndex = endIndex + (endRelative ? baseIndex : 0);
        var removeEndIndex = removeIndex + removeCount - 1;

        var adjustForRemoveRows = isRow && adjustForAddRemove(removeModel, baseModel, isRow);
        var adjustForRemoveCols = !isRow && adjustForAddRemove(removeModel, baseModel, isRow);
        if ((adjustForRemoveRows || adjustForRemoveCols) && removeIndex <= baseIndex) {
            refIndex += (relative ? removeCount : 0);
            refEndIndex += (endRelative ? removeCount : 0);
        }

        adjustForRemoveRows = isRow && adjustForAddRemove(removeModel, refModel, isRow);
        adjustForRemoveCols = !isRow && adjustForAddRemove(removeModel, refModel, isRow);
        if (adjustForRemoveRows || adjustForRemoveCols) {
            var tableStartRefIndex = baseIndex + index, tableEndRefIndex = baseIndex + endIndex;
            if ((!isInTable && removeEndIndex < refIndex) || (isInTable && removeEndIndex < tableStartRefIndex)) {
                refIndex -= removeCount;
                refEndIndex -= removeCount;
            }
            else if ((!isInTable && removeIndex <= refIndex && removeEndIndex >= refEndIndex)
                || (isInTable && removeIndex <= tableStartRefIndex && removeEndIndex >= tableEndRefIndex)) {
                return CalcErrorsReference;
            }
            else if ((!isInTable && removeIndex > refEndIndex) || (isInTable && removeIndex > tableEndRefIndex)) {

            }
            else if ((!isInTable && removeEndIndex <= refEndIndex) || (isInTable && removeEndIndex <= tableEndRefIndex)) {
                refIndex = (!isInTable && removeIndex >= refIndex || isInTable && removeIndex >= tableStartRefIndex) ? refIndex : removeIndex;
                refEndIndex -= removeCount;
            }
            else {
                refEndIndex = removeIndex - 1;
            }
        }
        refIndex -= (relative ? baseIndex : 0);
        refEndIndex -= (endRelative ? baseIndex : 0);
        if (isInTable && removeIndex <= baseIndex) {
            refIndex -= relative ? removeCount : 0;
            refEndIndex -= relative ? removeCount : 0;
        }
        return { index: refIndex, endIndex: refEndIndex };
    }
    return { index: index, endIndex: endIndex };
}
function adjustFormulaOnRemoveSheet(baseModel, oldExpr, removeModel) {
    var selfFunction = adjustFormulaOnRemoveSheet;
    var newExpr = oldExpr, arg, fnArg, i, refModel;
    if (oldExpr) {
        if (oldExpr.source) {
            refModel = oldExpr.source;
            var endSource = oldExpr.endSource;
            if (!endSource || refModel === endSource) {
                if ((baseModel !== removeModel && refModel === removeModel) || (baseModel === removeModel && refModel !== removeModel)) {
                    newExpr = CalcEngine_1._referenceErrorExpr;
                }
            }
            else {
                var spread = refModel._sheet && refModel._sheet.parent;
                if (!spread) {
                    return CalcEngine_1._referenceErrorExpr;
                }
                if (endSource === removeModel) {
                    var end = removeModel._indexBeforeRemove;
                    newExpr.endSource = spread.getSheet(end - 1)._getSheetSource();
                }
                else if (refModel === removeModel) {
                    var start = removeModel._indexBeforeRemove;
                    newExpr.source = spread.getSheet(start)._getSheetSource();
                }
                delete removeModel._indexBeforeRemove;
                if (newExpr.source === newExpr.endSource) {
                    delete newExpr.endSource;
                }
            }
        }
        else if (oldExpr.type === 10 ) {
            arg = selfFunction(baseModel, oldExpr.value, removeModel);
            if (arg !== oldExpr.value) {
                newExpr = CalcEngine_1._createParenthesesExpression(arg);
            }
        }
        else if (oldExpr.type === 9 ) {
            var arg0 = selfFunction(baseModel, oldExpr.value, removeModel);
            var arg1 = oldExpr.value2 && selfFunction(baseModel, oldExpr.value2, removeModel);
            if (arg0 !== oldExpr.value || arg1 !== oldExpr.value2) {
                newExpr = CalcEngine_1._createOperatorExpression(oldExpr.operatorType, arg0, arg1);
            }
        }
        else if (oldExpr.type === 7 ) {
            var args = keyword_null;
            var argCount = oldExpr.arguments.length;
            for (i = 0; i < argCount; i++) {
                fnArg = oldExpr.arguments[i];
                arg = selfFunction(baseModel, fnArg, removeModel);
                if (arg !== fnArg) {
                    args = [];
                    args[i] = arg;
                    break;
                }
            }
            if (args) {
                for (i = 0; i < argCount; i++) {
                    fnArg = oldExpr.arguments[i];
                    if (args[i] === keyword_undefined || args[i] === keyword_null) {
                        args[i] = selfFunction(baseModel, fnArg, removeModel);
                    }
                }
                newExpr = CalcEngine_1._createFunctionExpression(oldExpr, args);
            }
        }
        else if (oldExpr.type === 8 ) {
            var sheetSource = baseModel || removeModel;
            var name_1 = toUpperCase(oldExpr.value);
            var nameExpr = sheetSource.getCustomName(name_1);
            if (nameExpr && nameExpr.source) {
                refModel = nameExpr.source;
            }
            else {
                var calcModel = sheetSource._service.getGlobalSourceModel() || sheetSource.getCalcSourceModel();
                nameExpr = calcModel.getSource().getCustomName(name_1);
                if (nameExpr && nameExpr.source) {
                    refModel = nameExpr.source;
                }
            }
            if (refModel && ((baseModel !== removeModel && refModel === removeModel) || (baseModel === removeModel && refModel !== removeModel))) {
                newExpr = CalcEngine_1._referenceErrorExpr;
            }
        }
    }
    return newExpr;
}
function adjustFormulaOnRemoveSheet2(baseModel, baseRow, baseCol, oldExpr, removeModel) {
    return adjustFormulaOnRemoveSheet(baseModel, oldExpr, removeModel);
}
function getIsCrossSheetReferenceUpdated(info, baseModel) {
    return (info._toModel === info._fromModel) && (baseModel !== info._toModel);
}
function createAdjustedCellLikeExpression(source, endSource, row, column, refRowRelative, columnRelative, isSpillReference, contextSource) {
    if (isSpillReference) {
        return CalcEngine_1._createSpillRefExpression(contextSource, source, endSource, row, column, refRowRelative, columnRelative);
    }
    else {
        return CalcEngine_1._createCellExpression(source, endSource, row, column, refRowRelative, columnRelative);
    }
}
function adjustCellExpressionOnMove(baseModel, baseRow, baseColumn, refExpr, info, options) {
    var isExternal = !!(refExpr.source);
    var refModel = refExpr.source || baseModel;
    var refRowRelative = refExpr.rowRelative;
    var refColumnRelative = refExpr.columnRelative;
    var refRow, refColumn, moveRef, moveSource;
    var tempBaseRow = baseRow, tempBaseColumn = baseColumn;
    var destSheet = info._toModel._sheet;
    if (options && options.isCustomName) {
        var oldExprRow = refExpr.row, oldExprCol = refExpr.column;
        tempBaseRow = info._toRow + (oldExprRow - info._fromRow) + destSheet._getNextInvisibleCount(info._toRow, oldExprRow - info._fromRow + 1, true);
        tempBaseColumn = info._toColumn + (oldExprCol - info._fromColumn) + destSheet._getNextInvisibleCount(info._toColumn, oldExprCol - info._fromColumn + 1);
    }
    var rowOffset = info._rowOffset(tempBaseRow), colOffset = info._colOffset(tempBaseColumn);
    var isSpillReference = refExpr.type === 33 , contextSource = isSpillReference && refExpr.contextSource;
    if ((baseRow >= 0 || !refRowRelative) && (baseColumn >= 0 || !refColumnRelative)) {
        refRow = refExpr.row + (refRowRelative ? baseRow : 0);
        refColumn = refExpr.column + (refColumnRelative ? baseColumn : 0);
        if (!options || !options.isNameID) {
            if (baseModel === info._fromModel) {
                if (baseModel === info._toModel) {
                    moveSource = info._destinationContains(info._toModel, baseRow, baseColumn, 1, 1);
                }
                else {
                    var r = baseRow, c = baseColumn;
                    if (options && options.crossSheetMoved) {
                        r -= rowOffset;
                        c -= colOffset;
                    }
                    moveSource = info._sourceContains(info._fromModel, r, c, 1, 1);
                }
            }
        }

        if (refModel === info._toModel && info._destinationContains(refModel, refRow, refColumn, 1, 1) && !info._sourceContains(refModel, refRow, refColumn, 1, 1)
            && (!refRowRelative && !refColumnRelative || !moveSource)) {
            return CalcEngine_1._referenceErrorExpr;
        }
        moveRef = (isExternal && refModel === info._fromModel || !isExternal && baseModel === info._fromModel)
            && (!moveSource && info._sourceContains(info._fromModel, refRow, refColumn, 1, 1)
                || moveSource && info._destinationContains(info._toModel, refRowRelative ? refRow : refRow + rowOffset, refColumnRelative ? refColumn : refColumn + colOffset, 1, 1));
        if (moveSource) {
            refRow -= refRowRelative ? rowOffset : 0;
            refColumn -= refColumnRelative ? colOffset : 0;
        }
        if (moveRef) {
            refRow += rowOffset;
            refColumn += colOffset;
        }
        refRow -= (refRowRelative ? baseRow : 0);
        refColumn -= (refColumnRelative ? baseColumn : 0);
        refModel = refExpr.source;

        if (info._fromModel !== info._toModel) {
            if (moveRef && moveSource) {
                if (isExternal) {
                    refModel = info._toModel;
                }
            }
            else if (moveRef) {
                refModel = info._toModel;
            }
            else if (moveSource && !isExternal) {
                refModel = info._fromModel;
            }
        }
        if (refRow !== refExpr.row || refColumn !== refExpr.column || refModel !== refExpr.source) {
            return createAdjustedCellLikeExpression(refModel, keyword_null, refRow, refColumn, refRowRelative, refColumnRelative, isSpillReference, contextSource);
        }
    }
    else if ((baseRow >= 0 || !refRowRelative) && baseColumn === -1) {
        refRow = refExpr.row + (refRowRelative ? baseRow : 0);
        if (info._destinationContains(baseModel, baseRow, baseColumn, 1, 1)) {
            refRow -= (refRowRelative ? rowOffset : 0);
        }
        if (info._sourceContains(refModel, refRow, -1, 1, -1)) {
            refRow += rowOffset;
        }
        else if (info._destinationContains(refModel, refRow, -1, 1, -1)) {
            return CalcEngine_1._referenceErrorExpr;
        }
        refRow -= (refRowRelative ? baseRow : 0);
        if (refRow !== refExpr.row) {
            return createAdjustedCellLikeExpression(refExpr.source, keyword_null, refRow, refExpr.column, refRowRelative, refExpr.columnRelative, isSpillReference, contextSource);
        }
    }
    else if (baseRow === -1 && (baseColumn >= 0 && !refColumnRelative)) {
        refColumn = refExpr.column + (refColumnRelative ? baseColumn : 0);
        if (info._destinationContains(baseModel, baseRow, baseColumn, 1, 1)) {
            refColumn -= (refColumnRelative ? colOffset : 0);
        }
        if (info._sourceContains(refModel, refRow, refColumn, 1, 1)) {
            refColumn += colOffset;
        }
        else if (info._destinationContains(refModel, refRow, refColumn, 1, 1)) {
            return CalcEngine_1._referenceErrorExpr;
        }
        refColumn -= (refColumnRelative ? baseColumn : 0);
        if (refRow !== refExpr.row || refColumn !== refExpr.column) {
            return createAdjustedCellLikeExpression(refExpr.source, refExpr.endSource, refExpr.row, refColumn, refExpr.rowRelative, refColumnRelative, isSpillReference, contextSource);
        }
    }
    return refExpr;
}
function getResidueRange(range1, range2) {
    range2 = range1.getIntersect(range2, 0, 0);
    if (!range2) {
        return keyword_null;
    }
    var row = range1.row, col = range1.col, rowCount = range1.rowCount, colCount = range1.colCount;
    if (range1.rowCount === range2.rowCount && range1.colCount === range2.colCount) {

    }
    else if (range1.rowCount === range2.rowCount) {
        if (range1.col === range2.col) {
            col = range1.col + range2.colCount;
        }
        colCount = range1.colCount - range2.colCount;
    }
    else if (range1.colCount === range2.colCount) {
        if (range1.row === range2.row) {
            row = range1.row + range2.rowCount;
        }
        rowCount = range1.rowCount - range2.rowCount;
    }
    return Core_1._createRange(row, col, rowCount, colCount);
}
function allowMove(fromRange, refRange, toRange, rowOffset, colOffset) {
    if (!refRange || !fromRange) {
        return false;
    }
    var containRange = refRange.getIntersect(fromRange, 0, 0);
    if (!containRange) {
        var containToRange = refRange.getIntersect(toRange, 0, 0);
        if (containToRange) {
            return true;
        }
    }
    if (containRange && containRange.rowCount === refRange.rowCount && colOffset !== 0) {
        return true;
    }
    else if (containRange && containRange.colCount === refRange.colCount && rowOffset !== 0) {
        return true;
    }
    return false;
}
function getRangeByRefExpr(refExpr, baseRow, baseCol) {
    var refRangeTemp = refExpr.getRange(baseRow, baseCol);
    return Core_1._createRange(refRangeTemp.row, refRangeTemp.col, refRangeTemp.rowCount, refRangeTemp.colCount);
}
function moveRangeImp(refRange, fromRange, toRange, isRow) {
    var residueRange = getResidueRange(refRange, fromRange);
    var resultRange;
    if (!residueRange) {
        resultRange = toRange;
    }
    else {
        resultRange = residueRange.union(toRange);

        if (isRow) {
            resultRange.col = refRange.col;
            resultRange.colCount = refRange.colCount;
        }
        else {
            resultRange.row = refRange.row;
            resultRange.rowCount = refRange.rowCount;
        }
    }
    return {
        startRow: resultRange.row,
        endRow: resultRange.row + resultRange.rowCount - 1,
        startColumn: resultRange.col,
        endColumn: resultRange.col + resultRange.colCount - 1
    };
}
function moveRangeImp2(refRange, fromRange, toRange, rowOffset, colOffset) {
    var residueRange = getResidueRange(refRange, fromRange);
    var toRangeTemp = refRange.getIntersect(fromRange, 0, 0);
    if (!toRangeTemp) {
        return keyword_null;
    }
    toRangeTemp.row += rowOffset;
    toRangeTemp.col += colOffset;
    var resultRange;
    if (!residueRange) {
        resultRange = toRange;
    }
    else {
        resultRange = residueRange.union(toRangeTemp);
    }
    return {
        startRow: resultRange.row,
        endRow: resultRange.row + resultRange.rowCount - 1,
        startColumn: resultRange.col,
        endColumn: resultRange.col + resultRange.colCount - 1
    };
}
function needAdjustRefRange(refRange, toRange) {
    var row = refRange.row, col = refRange.col, rowCount = refRange.rowCount, colCount = refRange.colCount;
    var toRange_row = toRange.row, toRange_col = toRange.col, toRange_rowCount = toRange.rowCount, toRange_colCount = toRange.colCount;
    if (rowCount === 1 && colCount !== 1) {
        return (toRange_col < col && col <= toRange_col + toRange_colCount - 1) || (toRange_col <= col + colCount - 1 && col + colCount - 1 < toRange_col + toRange_colCount - 1);
    }
    else if (colCount === 1 && rowCount !== 1) {
        return (toRange_row < row && row <= toRange_row + toRange_rowCount - 1) || (toRange_row <= row + rowCount - 1 && row + rowCount - 1 < toRange_row + toRange_rowCount - 1);
    }
    return true;
}
function getMoveRange(moveSwapInfo, rowOffset, colOffset, refExpr, baseRow, baseCol) {
    var refRange = getRangeByRefExpr(refExpr, baseRow, baseCol);
    var refStartRow = refRange.row, refEndRow = refRange.row + refRange.rowCount - 1, refStartColumn = refRange.col, refEndColumn = refRange.col + refRange.colCount - 1, fromRangeStartRow = moveSwapInfo._fromRow, fromRangeEndRow = fromRangeStartRow + moveSwapInfo._rowCount - 1, fromRangeStartCol = moveSwapInfo._fromColumn, fromRangeEndCol = fromRangeStartCol + moveSwapInfo._columnCount - 1, toRangeStartRow = moveSwapInfo._toRow, toRangeStartCol = moveSwapInfo._toColumn;
    var fromRange = Core_1._createRange(fromRangeStartRow, fromRangeStartCol, moveSwapInfo._rowCount, moveSwapInfo._columnCount), toRange = Core_1._createRange(toRangeStartRow, toRangeStartCol, moveSwapInfo._rowCount, moveSwapInfo._columnCount);
    var containToRange = refRange.getIntersect(toRange, 0, 0), resultRange;
    if (allowMove(fromRange, refRange, toRange, rowOffset, colOffset)) {
        var isRow = rowOffset !== 0, isHeadMove = void 0, isTailMove = void 0;
        if (isRow) {
            isHeadMove = refStartRow >= fromRangeStartRow && refStartRow <= fromRangeEndRow;
            isTailMove = refEndRow >= fromRangeStartRow && refEndRow <= fromRangeEndRow;

            if (isHeadMove && isTailMove) {
                refStartRow += rowOffset;
                refEndRow += rowOffset;
            }
            else if (isHeadMove && !isTailMove) {
                if (rowOffset <= 0) {
                    refStartRow += rowOffset;
                }
                else if (fromRangeStartRow + rowOffset > refEndRow ) {

                }
                else {
                    if (fromRangeEndRow + rowOffset < refEndRow ) {
                        if (fromRangeStartRow !== refStartRow ) {
                            refStartRow += rowOffset;
                        }
                        else {
                            return moveRangeImp(refRange, fromRange, toRange, isRow);
                        }
                    }
                    else {
                        return moveRangeImp2(refRange, fromRange, toRange, rowOffset, colOffset);
                    }
                }
            }
            else if (!isHeadMove && isTailMove) {
                if (rowOffset >= 0) {
                    refEndRow += rowOffset;
                }
                else if (fromRangeEndRow + rowOffset < refStartRow) {

                }
                else {
                    if (toRangeStartRow > refStartRow) {
                        if (fromRangeEndRow !== refEndRow) {
                            refEndRow += rowOffset;
                        }
                        else {
                            return moveRangeImp(refRange, fromRange, toRange, isRow);
                        }
                    }
                    else {
                        return moveRangeImp2(refRange, fromRange, toRange, rowOffset, colOffset);
                    }
                }
            }
            else {
                if (containToRange && !containToRange.equals(toRange) && needAdjustRefRange(refRange, toRange)) {
                    resultRange = getResidueRange(refRange, containToRange);
                    refStartRow = resultRange.row;
                    refEndRow = resultRange.row + resultRange.rowCount - 1;
                    refStartColumn = resultRange.col;
                    refEndColumn = resultRange.col + resultRange.colCount - 1;
                }
            }
        }
        else {
            isHeadMove = refStartColumn >= fromRangeStartCol && refStartColumn <= fromRangeEndCol;
            isTailMove = refEndColumn >= fromRangeStartCol && refEndColumn <= fromRangeEndCol;
            if (isHeadMove && isTailMove) {
                refStartColumn += colOffset;
                refEndColumn += colOffset;
            }
            else if (isHeadMove && !isTailMove) {
                if (colOffset < 0) {
                    refStartColumn += colOffset;
                }
                else if (fromRangeStartCol + colOffset > refEndColumn) {

                }
                else {
                    if (fromRangeEndCol + colOffset < refEndColumn) {
                        if (fromRangeStartCol !== refStartColumn) {
                            refStartColumn += colOffset;
                        }
                        else {
                            return moveRangeImp(refRange, fromRange, toRange, isRow);
                        }
                    }
                    else {
                        return moveRangeImp2(refRange, fromRange, toRange, rowOffset, colOffset);
                    }
                }
            }
            else if (!isHeadMove && isTailMove) {
                if (colOffset > 0) {
                    refEndColumn += colOffset;
                }
                else if (fromRangeEndCol + colOffset < refStartColumn) {

                }
                else {
                    if (toRangeStartCol > refStartColumn) {
                        if (fromRangeEndCol !== refEndColumn) {
                            refEndColumn += colOffset;
                        }
                        else {
                            return moveRangeImp(refRange, fromRange, toRange, isRow);
                        }
                    }
                    else {
                        return moveRangeImp2(refRange, fromRange, toRange, rowOffset, colOffset);
                    }
                }
            }
            else {
                if (containToRange && !containToRange.equals(toRange) && needAdjustRefRange(refRange, toRange)) {
                    resultRange = getResidueRange(refRange, containToRange);
                    refStartRow = resultRange.row;
                    refEndRow = resultRange.row + resultRange.rowCount - 1;
                    refStartColumn = resultRange.col;
                    refEndColumn = resultRange.col + resultRange.colCount - 1;
                }
            }
        }
    }
    return {
        startRow: refStartRow,
        endRow: refEndRow,
        startColumn: refStartColumn,
        endColumn: refEndColumn
    };
}


function out(refStart, refEnd, start, count) {
    return start > refEnd || start + count - 1 < refStart;
}
function cover(refStart, refEnd, start, count) {
    return start <= refStart && start + count - 1 >= refEnd;
}
function inside(refStart, refEnd, start, count) {
    return start > refStart && start + count - 1 < refEnd;
}
function part(refStart, refEnd, start, count) {
    return (start === refStart && start + count - 1 < refEnd) || (start > refStart && start + count - 1 === refEnd);
}
function cross(refStart, refEnd, start, count) {
    return (start < refStart && start + count - 1 >= refStart && start + count - 1 < refEnd) || (start > refStart && start <= refEnd && start + count - 1 > refEnd);
}
function isSameSide(refStart, refEnd, start, count, to) {
    return (start <= refStart && to <= refStart) || (start + count - 1 >= refEnd && to + count - 1 >= refEnd);
}
function getMoveType(refStart, refEnd, start, count, to) {
    var arr = [out,
        cover,
        inside,
        part,
        cross];
    var result;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i](refStart, refEnd, start, count)) {
            result = i + '_';
            break;
        }
    }
    if (start === to) {
        result += '9' ;
    }
    else {
        for (var i = 0; i < arr.length; i++) {
            if (start !== to && arr[i](refStart, refEnd, to, count)) {
                result += i;
                break;
            }
        }
    }
    return result;
}

function _getIntersectRange(range, row, col, rowEnd, colEnd) {
    return {
        row: Math_max(range.startRow, row),
        col: Math_max(range.startColumn, col),
        endRow: Math_min(range.endRow, rowEnd),
        endCol: Math_min(range.endColumn, colEnd)
    };
}

var moveType;
(function (moveType) {
    moveType['outToOut'] = '0_0';
    moveType['outToCover'] = '0_1';
    moveType['outToInside'] = '0_2';
    moveType['outToPart'] = '0_3';
    moveType['outToCross'] = '0_4';
    moveType['outNoMove'] = '0_9';
    moveType['coverToOut'] = '1_0';
    moveType['coverToCover'] = '1_1';
    moveType['coverToCross'] = '1_4';
    moveType['coverNoMove'] = '1_9';
    moveType['insideToOut'] = '2_0';
    moveType['insideToInside'] = '2_2';
    moveType['insideToPart'] = '2_3';
    moveType['insideToCross'] = '2_4';
    moveType['insideNoMove'] = '2_9';
    moveType['partToOut'] = '3_0';
    moveType['partToInside'] = '3_2';
    moveType['partToPart'] = '3_3';
    moveType['partToCross'] = '3_4';
    moveType['partNoMove'] = '3_9';
    moveType['crossToOut'] = '4_0';
    moveType['crossToCover'] = '4_1';
    moveType['crossToInside'] = '4_2';
    moveType['crossToPart'] = '4_3';
    moveType['crossToCross'] = '4_4';
    moveType['crossNoMove'] = '4_9';
})(moveType || (moveType = {}));
function _getOriginRange(baseModel, baseRow, baseColumn, refExpr, info) {
    if (baseModel === info._toModel && info._toRow <= baseRow && baseRow <= info._rowCount + info._toRow - 1
        && info._toColumn <= baseColumn && baseColumn <= info._columnCount + info._toColumn - 1) {
        baseRow = baseRow + info._fromRow - info._toRow;
        baseColumn = baseColumn + info._fromColumn - info._toColumn;
    }
    return {
        startRow: refExpr.row + (refExpr.rowRelative ? baseRow : 0),
        endRow: refExpr.endRow + (refExpr.endRowRelative ? baseRow : 0),
        startColumn: refExpr.column + (refExpr.columnRelative ? baseColumn : 0),
        endColumn: refExpr.endColumn + (refExpr.endColumnRelative ? baseColumn : 0)
    };
}
function _getExpr(refExpr, originRange, baseRow, baseColumn, source, row, column, endRow, endColumn) {
    if (_isNullOrUndefined(row)) {
        row = originRange.startRow;
    }
    if (_isNullOrUndefined(column)) {
        column = originRange.startColumn;
    }
    if (_isNullOrUndefined(endRow)) {
        endRow = originRange.endRow;
    }
    if (_isNullOrUndefined(endColumn)) {
        endColumn = originRange.endColumn;
    }
    return CalcEngine_1._createRangeExpression(source || refExpr.source, keyword_null, refExpr.rowRelative ? row - baseRow : row, refExpr.columnRelative ? column - baseColumn : column, refExpr.endRowRelative ? endRow - baseRow : endRow, refExpr.endColumnRelative ? endColumn - baseColumn : endColumn, refExpr.rowRelative, refExpr.columnRelative, refExpr.endRowRelative, refExpr.endColumnRelative, baseRow, baseColumn);
}
function _adjustRangeExprOnMove(baseModel, baseRow, baseColumn, refExpr, info) {
    var originRange = _getOriginRange(baseModel, baseRow, baseColumn, refExpr, info);
    var refSource = refExpr.source || baseModel;


    if (info._fromModel === refSource && info._toModel === refSource) {
        var rowType = getMoveType(originRange.startRow, originRange.endRow, info._fromRow, info._rowCount, info._toRow);
        var colType = getMoveType(originRange.startColumn, originRange.endColumn, info._fromColumn, info._columnCount, info._toColumn);
        var key = rowType + '-' + colType;
        var rowMove = info._toRow - info._fromRow, colMove = info._toColumn - info._fromColumn;
        var intersect = _getIntersectRange(originRange, info._fromRow, info._fromColumn, info._fromRow + info._rowCount - 1, info._fromColumn + info._columnCount - 1);
        var row1 = void 0, row2 = void 0, col1 = void 0, col2 = void 0;
        switch (key) {
            case moveType.outToCover + '-' + moveType.outToCover:
            case moveType.crossToCover + '-' + moveType.outToCover:
            case moveType.outToCover + '-' + moveType.crossToCover:
            case moveType.crossToCover + '-' + moveType.crossToCover:
            case moveType.coverToCover + '-' + moveType.outToCover:
            case moveType.outToCover + '-' + moveType.coverToCover:
            case moveType.coverNoMove + '-' + moveType.outToCover:
            case moveType.outToCover + '-' + moveType.coverNoMove:
                return CalcEngine_1._referenceErrorExpr;


            case moveType.outToCross + '-' + moveType.outToCover:
            case moveType.coverToCross + '-' + moveType.outToCover:
            case moveType.insideToCross + '-' + moveType.outToCover:
            case moveType.partToCross + '-' + moveType.outToCover:
            case moveType.crossToCross + '-' + moveType.outToCover:
            case moveType.crossNoMove + '-' + moveType.outToCover:
            case moveType.outToCross + '-' + moveType.coverNoMove:
            case moveType.outToCross + '-' + moveType.coverToCover:
            case moveType.outToCross + '-' + moveType.crossToCover:
            case moveType.insideToCross + '-' + moveType.coverNoMove:
            case moveType.insideToCross + '-' + moveType.coverToCover:
            case moveType.insideToCross + '-' + moveType.crossToCover:
                if (info._toRow <= originRange.startRow) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, info._toRow + info._rowCount);
                }
                else {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, keyword_null, info._toRow - 1);
                }

            case moveType.outToCover + '-' + moveType.outToCross:
            case moveType.outToCover + '-' + moveType.coverToCross:
            case moveType.outToCover + '-' + moveType.insideToCross:
            case moveType.outToCover + '-' + moveType.partToCross:
            case moveType.outToCover + '-' + moveType.crossToCross:
            case moveType.outToCover + '-' + moveType.crossNoMove:
            case moveType.coverNoMove + '-' + moveType.outToCross:
            case moveType.coverToCover + '-' + moveType.outToCross:
            case moveType.crossToCover + '-' + moveType.outToCross:
            case moveType.coverNoMove + '-' + moveType.insideToCross:
            case moveType.coverToCover + '-' + moveType.insideToCross:
            case moveType.crossToCover + '-' + moveType.insideToCross:
                if (info._toColumn < originRange.startColumn) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, info._toColumn + info._columnCount);
                }
                else {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, keyword_null, keyword_null, info._toColumn - 1);
                }


            case moveType.partToOut + '-' + moveType.coverNoMove:
            case moveType.crossToOut + '-' + moveType.coverNoMove:
                if (!isSameSide(originRange.startRow, originRange.endRow, info._fromRow, info._rowCount, info._toRow)) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn);
                }

            case moveType.coverNoMove + '-' + moveType.partToOut:
            case moveType.coverNoMove + '-' + moveType.crossToOut:
                if (rowType === moveType.coverNoMove && !isSameSide(originRange.startColumn, originRange.endColumn, info._fromColumn, info._columnCount, info._toColumn)) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn);
                }

            case moveType.crossToInside + '-' + moveType.coverNoMove:
            case moveType.coverNoMove + '-' + moveType.crossToInside:
                if ((originRange.startRow >= info._fromRow && colType === moveType.coverNoMove) || (originRange.startColumn >= info._fromColumn && rowType === moveType.coverNoMove)) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, intersect.row + rowMove, intersect.col + colMove);
                }
                else {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, keyword_null, intersect.endRow + rowMove, intersect.endCol + colMove);
                }

            case moveType.partToInside + '-' + moveType.coverNoMove:
                if (originRange.startRow >= info._fromRow) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, Math_min(intersect.row + rowMove, intersect.endRow + 1));
                }
                else {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, keyword_null, Math_max(intersect.endRow + rowMove, intersect.row - 1));
                }

            case moveType.coverNoMove + '-' + moveType.partToInside:
                if (originRange.startColumn >= info._fromColumn && rowType === moveType.coverNoMove) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, Math_min(intersect.col + colMove, intersect.endCol + 1));
                }
                else {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, keyword_null, keyword_null, Math_max(intersect.endCol + colMove, intersect.col - 1));
                }


            case moveType.partToCross + '-' + moveType.coverNoMove:
            case moveType.crossToPart + '-' + moveType.coverNoMove:
            case moveType.crossToCross + '-' + moveType.coverNoMove:
                if (isSameSide(originRange.startRow, originRange.endRow, info._fromRow, info._rowCount, info._toRow)) {
                    if (originRange.startRow >= info._fromRow) {
                        return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, intersect.row + rowMove);
                    }
                    else {
                        return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, keyword_null, intersect.endRow + rowMove);
                    }
                }

            case moveType.crossToCover + '-' + moveType.coverNoMove:
            case moveType.partToPart + '-' + moveType.coverNoMove:
                if (info._fromRow < info._toRow) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, Math_min(intersect.row + rowMove, intersect.endRow + 1), keyword_null, intersect.endRow + rowMove);
                }
                else {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, intersect.row + rowMove, keyword_null, Math_max(intersect.endRow + rowMove, intersect.row - 1));
                }

            case moveType.coverNoMove + '-' + moveType.partToCross:
            case moveType.coverNoMove + '-' + moveType.crossToPart:
            case moveType.coverNoMove + '-' + moveType.crossToCross:
                if (isSameSide(originRange.startColumn, originRange.endColumn, info._fromColumn, info._columnCount, info._toColumn)) {
                    if (originRange.startColumn >= info._fromColumn) {
                        return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, intersect.col + colMove);
                    }
                    else {
                        return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, keyword_null, keyword_null, intersect.endCol + colMove);
                    }
                }

            case moveType.coverNoMove + '-' + moveType.crossToCover:
            case moveType.coverNoMove + '-' + moveType.partToPart:
                if (info._fromColumn < info._toColumn) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, Math_min(intersect.col + colMove, intersect.endCol + 1), keyword_null, intersect.endCol + colMove);
                }
                else {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, keyword_null, intersect.col + colMove, keyword_null, Math_max(intersect.endCol + colMove, intersect.col - 1));
                }


            case moveType.crossToCross + '-' + moveType.coverToCover:
            case moveType.crossToPart + '-' + moveType.coverToCover:
            case moveType.partToCross + '-' + moveType.coverToCover:
                if (isSameSide(originRange.startRow, originRange.endRow, info._fromRow, info._rowCount, info._toRow)) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn);
                }

            case moveType.coverToCover + '-' + moveType.crossToCross:
            case moveType.coverToCover + '-' + moveType.crossToPart:
            case moveType.coverToCover + '-' + moveType.partToCross:
                if (rowType === moveType.coverToCover && isSameSide(originRange.startColumn, originRange.endColumn, info._fromColumn, info._columnCount, info._toColumn)) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn);
                }

            case moveType.coverToCover + '-' + moveType.partToPart:
            case moveType.partToPart + '-' + moveType.coverToCover:
            case moveType.coverToCover + '-' + moveType.crossToCover:
            case moveType.crossToCover + '-' + moveType.coverToCover:
                return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, intersect.row + rowMove, intersect.col + colMove, intersect.endRow + rowMove, intersect.endCol + colMove);


            case moveType.partToPart + '-' + moveType.crossToCover:
            case moveType.partToCross + '-' + moveType.crossToCover:
            case moveType.crossToPart + '-' + moveType.crossToCover:
            case moveType.crossToCross + '-' + moveType.crossToCover:
                if (isSameSide(originRange.startRow, originRange.endRow, info._fromRow, info._rowCount, info._toRow)) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn);
                }
                if (intersect.row === originRange.startRow) {
                    if (intersect.col === originRange.startColumn) {
                        col1 = originRange.endColumn;
                        col2 = intersect.col + colMove;
                        row1 = intersect.endRow + rowMove;
                        row2 = intersect.row + rowMove;
                    }
                    else {
                        col1 = originRange.startColumn;
                        col2 = intersect.endCol + colMove;
                        row1 = rowType === moveType.partToCross || rowType === moveType.crossToCross ? info._fromRow + rowMove - 1 : originRange.endRow;
                        row2 = originRange.startRow;
                    }
                }
                else {
                    if (intersect.col === originRange.startColumn) {
                        col1 = originRange.endColumn;
                        col2 = intersect.col + colMove;
                        row1 = originRange.endRow;
                        row2 = rowType === moveType.partToCross || rowType === moveType.crossToCross ? (info._fromRow + info._rowCount - 1) + rowMove + 1 : originRange.startRow;
                    }
                    else {
                        col1 = originRange.startColumn;
                        col2 = intersect.endCol + colMove;
                        row1 = rowType === moveType.partToCross || rowType === moveType.crossToCross ? intersect.row + rowMove : originRange.startRow;
                        row2 = intersect.endRow + rowMove;
                    }
                }
                return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, Math_min(row1, row2), Math_min(col1, col2), Math_max(row1, row2), Math_max(col1, col2));

            case moveType.crossToCover + '-' + moveType.partToPart:
            case moveType.crossToCover + '-' + moveType.partToCross:
            case moveType.crossToCover + '-' + moveType.crossToPart:
            case moveType.crossToCover + '-' + moveType.crossToCross:
                if (isSameSide(originRange.startColumn, originRange.endColumn, info._fromColumn, info._columnCount, info._toColumn)) {
                    return _getExpr(refExpr, originRange, baseRow, baseColumn);
                }
                if (intersect.row === originRange.startRow) {
                    if (intersect.col === originRange.startColumn) {
                        col1 = intersect.endCol + colMove;
                        col2 = intersect.col + colMove;
                        row1 = originRange.endRow;
                        row2 = intersect.row + rowMove;
                    }
                    else {
                        col1 = originRange.endColumn;
                        col2 = colType === moveType.partToCross || colType === moveType.crossToCross ? (info._fromColumn + info._columnCount - 1) + colMove + 1 : originRange.startColumn;
                        row1 = originRange.endRow;
                        row2 = intersect.row + rowMove;
                    }
                }
                else {
                    if (intersect.col === originRange.startColumn) {
                        col1 = originRange.startColumn;
                        col2 = colType === moveType.partToCross || colType === moveType.crossToCross ? info._fromColumn + colMove - 1 : originRange.endColumn;
                        row1 = intersect.endRow + rowMove;
                        row2 = originRange.startRow;
                    }
                    else {
                        col1 = colType === moveType.partToCross || colType === moveType.crossToCross ? intersect.col + colMove : originRange.startColumn;
                        col2 = intersect.endCol + colMove;
                        row1 = originRange.startRow;
                        row2 = intersect.endRow + rowMove;
                    }
                }
                return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, Math_min(row1, row2), Math_min(col1, col2), Math_max(row1, row2), Math_max(col1, col2));


            case moveType.coverToOut + '-' + moveType.coverToOut:
            case moveType.coverToOut + '-' + moveType.coverToCross:
            case moveType.coverToOut + '-' + moveType.coverToCover:
            case moveType.coverToOut + '-' + moveType.coverNoMove:
            case moveType.coverToCross + '-' + moveType.coverToOut:
            case moveType.coverToCross + '-' + moveType.coverToCross:
            case moveType.coverToCross + '-' + moveType.coverToCover:
            case moveType.coverToCross + '-' + moveType.coverNoMove:
            case moveType.coverToCover + '-' + moveType.coverToOut:
            case moveType.coverToCover + '-' + moveType.coverToCross:
            case moveType.coverToCover + '-' + moveType.coverToCover:
            case moveType.coverToCover + '-' + moveType.coverNoMove:
            case moveType.coverNoMove + '-' + moveType.coverToOut:
            case moveType.coverNoMove + '-' + moveType.coverToCross:
            case moveType.coverNoMove + '-' + moveType.coverToCover:
                return _getExpr(refExpr, originRange, baseRow, baseColumn, keyword_null, originRange.startRow + rowMove, originRange.startColumn + colMove, originRange.endRow + rowMove, originRange.endColumn + colMove);

            default:
                return _getExpr(refExpr, originRange, baseRow, baseColumn);
        }
    }
}
function adjustRangeExpressionOnMoveCells(baseModel, baseRow, baseColumn, refExpr, info, options, rowOffset, colOffset) {
    var isExternal = !!refExpr.source;
    var refModel = isExternal ? refExpr.source : baseModel;
    var refStartRowRelative, refStartColumnRelative, refEndRowRelative, refEndColumnRelative;
    var refStartRow, refEndRow, refStartColumn, refEndColumn, refRowCount, refColumnCount;
    var ignoreCrossSheetReference = options && options.isDataValidator;
    var isCrossSheetReferenceUpdated = getIsCrossSheetReferenceUpdated(info, baseModel);
    var treatAsShiftCells = false;
    var ro, co, ro1, ro2, co1, co2, moveRef, moveSource;
    refStartRowRelative = refExpr.rowRelative;
    refStartColumnRelative = refExpr.columnRelative;
    refEndRowRelative = refExpr.endRowRelative;
    refEndColumnRelative = refExpr.endColumnRelative;
    if ((baseRow >= 0 || !refStartRowRelative || !refEndRowRelative) || (baseColumn >= 0 || !refStartColumnRelative || !refEndColumnRelative)) {
        refStartRow = refExpr.row + (refStartRowRelative ? baseRow : 0);
        refEndRow = refExpr.endRow + (refEndRowRelative ? baseRow : 0);
        refStartColumn = refExpr.column + (refStartColumnRelative ? baseColumn : 0);
        refEndColumn = refExpr.endColumn + (refEndColumnRelative ? baseColumn : 0);
        refRowCount = refEndRow - refStartRow + 1;
        refColumnCount = refEndColumn - refStartColumn + 1;


        if (!ignoreCrossSheetReference && isCrossSheetReferenceUpdated) {
            var isWholeRangeMoved = info._sourceContains(info._fromModel, refStartRow, refStartColumn, refRowCount, refColumnCount);
            if (isWholeRangeMoved) {
                return refExpr.offset(rowOffset, colOffset, true );
            }


            if (info._destinationContains(refModel, refStartRow, refStartColumn, refRowCount, refColumnCount)) {
                return CalcEngine_1._referenceErrorExpr;
            }

            if (refModel === info._fromModel && refModel === info._toModel && (rowOffset === 0 || colOffset === 0)) {
                treatAsShiftCells = true;
            }
            else {
                return refExpr;
            }
        }

        if (!options || !options.isNameID) {
            if (baseModel === info._fromModel) {
                if (baseModel === info._toModel) {
                    moveSource = info._destinationContains(info._toModel, baseRow, baseColumn, 1, 1);
                }
                else {
                    var r = baseRow, c = baseColumn;
                    if (options && options.crossSheetMoved) {
                        r -= rowOffset;
                        c -= colOffset;
                    }
                    moveSource = info._sourceContains(info._fromModel, r, c, 1, 1);
                }
            }
        }


        if (treatAsShiftCells || baseModel === refModel && baseModel === info._fromModel && baseModel === info._toModel) {
            var baseRowTemp = baseRow, baseColumnTemp = baseColumn;
            if (moveSource) {
                baseRowTemp -= rowOffset;
                baseColumnTemp -= colOffset;
            }
            if (rowOffset === 0 || colOffset === 0) {
                var moveRange = getMoveRange(info, rowOffset, colOffset, refExpr, baseRowTemp, baseColumnTemp);
                if (!moveRange) {
                    return CalcEngine_1._referenceErrorExpr;
                }
                if ((colOffset === 0 && rowOffset && moveRange.endColumn >= refEndColumn && moveRange.startColumn <= refStartColumn) ||
                    (rowOffset === 0 && colOffset && moveRange.endRow >= refEndRow && moveRange.startRow <= refStartRow)) {
                    var startRow = moveRange.startRow, startColumn = moveRange.startColumn, endRow = moveRange.endRow, endColumn = moveRange.endColumn;

                    if (startRow === refStartRow && endRow === refEndRow && startColumn === refStartColumn && endColumn === refEndColumn) {
                        return refExpr;
                    }

                    if (refStartRowRelative) {
                        startRow -= baseRow;
                    }
                    if (refEndRowRelative) {
                        endRow -= baseRow;
                    }
                    if (refStartColumnRelative) {
                        startColumn -= baseColumn;
                    }
                    if (refEndColumnRelative) {
                        endColumn -= baseColumn;
                    }
                    return CalcEngine_1._createRangeExpression(refExpr.source, keyword_null, startRow, startColumn, endRow, endColumn, refStartRowRelative, refStartColumnRelative, refEndRowRelative, refEndColumnRelative, baseRow, baseColumn);
                }
            }
        }

        if (moveSource) {
            var offsetRow = info._toRow - info._fromRow, offsetCol = info._toColumn - info._fromColumn;
            refRowCount += (refStartRowRelative ? -offsetRow : 0) + (refEndRowRelative ? offsetRow : 0);
            refColumnCount += (refStartColumnRelative ? -offsetCol : 0) + (refEndColumnRelative ? offsetCol : 0);
        }

        if (refModel === info._toModel
            && info._destinationContains(refModel, refStartRow, refStartColumn, refRowCount, refColumnCount)
            && !(refColumnCount)
            && (!refStartRowRelative && !refStartColumnRelative && !refEndRowRelative && !refEndColumnRelative || !moveSource)) {
            return CalcEngine_1._referenceErrorExpr;
        }

        moveRef = (isExternal && refModel === info._fromModel || !isExternal && baseModel === info._fromModel) && (!moveSource && info._sourceContains(info._fromModel, refStartRow, refStartColumn, refRowCount, refColumnCount) || moveSource && info._destinationContains(info._toModel, refStartRowRelative ? refStartRow : refStartRow + rowOffset, refStartColumnRelative ? refStartColumn : refStartColumn + colOffset, refRowCount, refColumnCount));
        if (moveSource) {
            ro1 = (refStartRowRelative ? rowOffset : 0);
            ro2 = (refEndRowRelative ? rowOffset : 0);
            co1 = (refStartColumnRelative ? colOffset : 0);
            co2 = (refEndColumnRelative ? colOffset : 0);
            refStartRow -= ro1;
            refEndRow -= ro2;
            refStartColumn -= co1;
            refEndColumn -= co2;
        }
        var refRangeChanged = false;
        if (moveRef) {
            ro = rowOffset;
            co = colOffset;
            refStartRow += ro;
            refEndRow += ro;
            refStartColumn += co;
            refEndColumn += co;
        }
        else if (info._destinationContains(refModel, refStartRow, refStartColumn, refRowCount, refColumnCount)) {
            var intersectedRange = info.intersectWith(refModel, refStartRow, refStartColumn, refRowCount, refColumnCount);
            if (intersectedRange && (intersectedRange.rowCount === refRowCount || intersectedRange.colCount === refColumnCount)) {
                refStartRow = intersectedRange.row + rowOffset;
                refStartColumn = intersectedRange.col + colOffset;
                refEndRow = refStartRow + intersectedRange.rowCount;
                refEndColumn = refStartColumn + intersectedRange.colCount;
                refRangeChanged = true;
            }
            else {
                return CalcEngine_1._referenceErrorExpr;
            }
        }
        refStartRow -= (refStartRowRelative ? baseRow : 0);
        refEndRow -= (refEndRowRelative ? baseRow : 0);
        refStartColumn -= (refStartColumnRelative ? baseColumn : 0);
        refEndColumn -= (refEndColumnRelative ? baseColumn : 0);
        if (info._fromModel === info._toModel) {
            refModel = isExternal ? refExpr.source : keyword_undefined;
        }
        else {
            refModel = refExpr.source;
            if (moveRef && moveSource && isExternal) {
                refModel = info._toModel;
            }
            else if (moveRef && moveSource) {

            }
            else if (moveRef) {
                refModel = info._toModel;
            }
            else if (moveSource && !isExternal) {
                refModel = info._fromModel;
            }
        }
        if (refStartRow !== refExpr.row || refStartColumn !== refExpr.column || refEndRow !== refExpr.endRow || refEndColumn !== refExpr.endColumn || refRangeChanged || refModel !== refExpr.source) {
            return CalcEngine_1._createRangeExpression(refModel, keyword_null, refStartRow, refStartColumn, refEndRow, refEndColumn, refStartRowRelative, refStartColumnRelative, refEndRowRelative, refEndColumnRelative, baseRow, baseColumn);
        }
    }
    else if ((baseRow >= 0 || !refStartRowRelative || !refEndRowRelative) && baseColumn === -1) {
        refStartRow = refExpr.row + (refStartRowRelative ? baseRow : 0);
        refEndRow = refExpr.endRow + (refEndRowRelative ? baseRow : 0);
        if (refStartRow > refEndRow) {
            return CalcEngine_1._referenceErrorExpr;
        }
        if (info._destinationContains(baseModel, baseRow, baseColumn, 1, 1)) {
            ro1 = (refStartRowRelative ? rowOffset : 0);
            ro2 = (refEndRowRelative ? rowOffset : 0);
            refStartRow -= ro1;
            refEndRow -= ro2;
        }
        refRowCount = refEndRow - refStartRow + 1;
        if (info._sourceContains(refModel, refStartRow, -1, refRowCount, -1)) {
            ro = rowOffset;
            refStartRow += ro;
            refEndRow += ro;
        }
        else if (info._destinationContains(refModel, refStartRow, -1, refRowCount, -1)) {
            return CalcEngine_1._referenceErrorExpr;
        }
        refStartRow -= (refStartRowRelative ? baseRow : 0);
        refEndRow -= (refEndRowRelative ? baseRow : 0);
        if (refStartRow !== refExpr.row || refEndRow !== refExpr.endRow) {
            return CalcEngine_1._createRangeExpression(refExpr.source, keyword_null, refStartRow, refExpr.column, refEndRow, refExpr.endColumn, refStartRowRelative, refExpr.columnRelative, refEndRowRelative, refExpr.endColumnRelative, baseRow, baseColumn);
        }
    }
    else if (baseRow === -1 && (baseColumn >= 0 || !refStartColumnRelative || !refEndColumnRelative)) {
        refStartColumn = refExpr.column + (refStartColumnRelative ? baseColumn : 0);
        refEndColumn = refExpr.endColumn + (refEndColumnRelative ? baseColumn : 0);
        if (refStartColumn > refEndColumn) {
            return CalcEngine_1._referenceErrorExpr;
        }
        if (info._destinationContains(baseModel, baseRow, baseColumn, 1, 1)) {
            co1 = (refStartColumnRelative ? colOffset : 0);
            co2 = (refEndColumnRelative ? colOffset : 0);
            refStartColumn -= co1;
            refEndColumn -= co2;
        }
        refColumnCount = refEndColumn - refStartColumn + 1;
        if (info._sourceContains(refModel, -1, refStartColumn, -1, refColumnCount)) {
            co = colOffset;
            refStartColumn += co;
            refEndColumn += co;
        }
        else if (info._destinationContains(refModel, -1, refStartColumn, -1, refColumnCount)) {
            return CalcEngine_1._referenceErrorExpr;
        }
        refStartColumn -= (refStartColumnRelative ? baseColumn : 0);
        refEndColumn -= (refEndColumnRelative ? baseColumn : 0);
        if (refStartColumn !== refExpr.column || refEndColumn !== refExpr.endColumn) {
            return CalcEngine_1._createRangeExpression(refExpr.source, keyword_null, refExpr.row, refStartColumn, refExpr.endRow, refEndColumn, refExpr.rowRelative, refStartColumnRelative, refExpr.endRowRelative, refEndColumnRelative, baseRow, baseColumn);
        }
    }
}
function adjustRangeExpressionOnMove(baseModel, baseRow, baseColumn, refExpr, info, options) {
    var isExternal = !!refExpr.source;
    var refModel = isExternal ? refExpr.source : baseModel;
    var rangeType = refExpr._getRangeType();
    var refStartRowRelative, refStartColumnRelative, refEndRowRelative, refEndColumnRelative;
    var refStartRow, refEndRow, refStartColumn, refEndColumn;
    var moveSource;
    var tempBaseRow = baseRow, tempBaseColumn = baseColumn;
    var destSheet = info._toModel._sheet;
    if (options && options.isCustomName) {
        var oldExprRow = refExpr.row, oldExprCol = refExpr.column;
        tempBaseRow = info._toRow + (oldExprRow - info._fromRow) + destSheet._getNextInvisibleCount(info._toRow, oldExprRow - info._fromRow + 1, true);
        tempBaseColumn = info._toColumn + (oldExprCol - info._fromColumn) + destSheet._getNextInvisibleCount(info._toColumn, oldExprCol - info._fromColumn + 1);
    }
    var rowOffset = info._rowOffset(tempBaseRow), colOffset = info._colOffset(tempBaseColumn);
    if (rangeType === 0 ) {
        var result = !info._skipInvisibleRange && _adjustRangeExprOnMove(baseModel, baseRow, baseColumn, refExpr, info);
        if (result) {
            return result;
        }


        result = adjustRangeExpressionOnMoveCells(baseModel, baseRow, baseColumn, refExpr, info, options, rowOffset, colOffset);
        if (result) {
            return result;
        }
    }
    else if (rangeType === 1 ) {
        refStartRowRelative = refExpr.rowRelative;
        refEndRowRelative = refExpr.endRowRelative;
        if (baseRow >= 0 || !refStartRowRelative || !refEndRowRelative) {
            refStartRow = refExpr.row + (refStartRowRelative ? baseRow : 0);
            refEndRow = refExpr.endRow + (refEndRowRelative ? baseRow : 0);
            if (refStartRow > refEndRow) {
                return CalcEngine_1._referenceErrorExpr;
            }

            moveSource = (baseModel === info._fromModel && baseModel === info._toModel) &&
                info._destinationContains(info._toModel, baseRow, baseColumn, 1, 1);
            if (refModel === info._fromModel && refModel === info._toModel) {
                if (info._fromColumn === 0 && info._toColumn === 0 && info._columnCount === refModel.getColumnCount()) {
                    var fromRow = info._fromRow, toRow = info._toRow, rowCount = info._rowCount;
                    if (moveSource) {
                        refStartRow -= rowOffset;
                        refEndRow -= rowOffset;
                    }
                    var fromRangeNextRow = fromRow + rowCount;
                    var refStartRowInFromRange = refStartRow >= fromRow && fromRangeNextRow > refStartRow;
                    var refEndRowInFromRange = refEndRow >= fromRow && fromRangeNextRow > refEndRow;
                    if (refStartRowInFromRange && refEndRowInFromRange) {
                        if (moveSource) {
                            return refExpr;
                        }

                        return refExpr.offset(rowOffset, colOffset, true );
                    }
                    var toRangeNextRow = toRow + rowCount;
                    if (refStartRowInFromRange && toRow <= refEndRow) {
                        refStartRow += rowOffset;
                        if (toRangeNextRow > refEndRow && refEndRow >= toRow) {
                            refEndRow = toRangeNextRow - 1;
                            refStartRow = fromRangeNextRow;
                        }
                    }
                    else if (refEndRowInFromRange && toRangeNextRow >= refStartRow) {
                        refEndRow += rowOffset;
                        if (toRow <= refStartRow && refStartColumn < toRangeNextRow) {
                            refStartRow = toRow;
                            refEndRow = fromRow - 1;
                        }
                    }
                    refStartRow -= (refStartRowRelative ? baseRow : 0);
                    refEndRow -= (refEndRowRelative ? baseRow : 0);
                    if (refStartRow !== refExpr.row || refEndRow !== refExpr.endRow) {
                        return CalcEngine_1._createRangeExpression(refExpr.source, refExpr.endSource, refStartRow, calc_ns_1.BAND_INDEX_CONST, refEndRow, calc_ns_1.BAND_INDEX_CONST, refStartRowRelative, refStartColumnRelative, refEndRowRelative, refEndColumnRelative, baseRow, baseColumn);
                    }
                }
            }
            if (moveSource) {
                return refExpr.offset(-rowOffset, colOffset, true );
            }
        }
    }
    else if (rangeType === 2 ) {
        refStartColumnRelative = refExpr.columnRelative;
        refEndColumnRelative = refExpr.endColumnRelative;
        refStartColumn = refExpr.column + (refStartColumnRelative ? baseColumn : 0);
        refEndColumn = refExpr.endColumn + (refEndColumnRelative ? baseColumn : 0);
        if (refStartColumn > refEndColumn) {
            return CalcEngine_1._referenceErrorExpr;
        }

        moveSource = (baseModel === info._fromModel && baseModel === info._toModel) &&
            info._destinationContains(info._toModel, baseRow, baseColumn, 1, 1);
        if (refModel === info._fromModel && refModel === info._toModel) {
            if (info._fromRow === 0 && info._toRow === 0 && info._rowCount === refModel.getRowCount()) {
                var fromColumn = info._fromColumn, toColumn = info._toColumn, columnCount = info._columnCount;
                if (moveSource) {
                    refStartColumn -= colOffset;
                    refEndColumn -= colOffset;
                }
                var fromRangeNextColumn = fromColumn + columnCount;
                var refStartColumnInFromRange = refStartColumn >= fromColumn && fromRangeNextColumn > refStartColumn;
                var refEndColumnInFromRange = refEndColumn >= fromColumn && fromRangeNextColumn > refEndColumn;
                if (refStartColumnInFromRange && refEndColumnInFromRange) {
                    if (moveSource) {
                        return refExpr;
                    }

                    return refExpr.offset(rowOffset, colOffset, true );
                }
                var toRangeNextColumn = toColumn + columnCount;
                if (refStartColumnInFromRange && toColumn <= refEndColumn) {
                    refStartColumn += colOffset;
                    if (toRangeNextColumn > refEndColumn && refEndColumn >= toColumn) {
                        refEndColumn = toRangeNextColumn - 1;
                        refStartColumn = fromRangeNextColumn;
                    }
                }
                else if (refEndColumnInFromRange && toRangeNextColumn >= refStartColumn) {
                    refEndColumn += colOffset;
                    if (toColumn <= refStartColumn && refStartColumn < toRangeNextColumn) {
                        refStartColumn = toColumn;
                        refEndColumn = fromColumn - 1;
                    }
                }
                refStartColumn -= (refStartColumnRelative ? baseColumn : 0);
                refEndColumn -= (refEndColumnRelative ? baseColumn : 0);
                if (refStartColumn !== refExpr.column || refEndColumn !== refExpr.endColumn) {
                    return CalcEngine_1._createRangeExpression(refExpr.source, refExpr.endSource, calc_ns_1.BAND_INDEX_CONST, refStartColumn, calc_ns_1.BAND_INDEX_CONST, refEndColumn, refStartRowRelative, refStartColumnRelative, refEndRowRelative, refEndColumnRelative, baseRow, baseColumn);
                }
            }
        }
        if (moveSource) {
            return refExpr.offset(rowOffset, -colOffset, true );
        }
    }
    return refExpr;
}
function adjustFormulaOnMoveSwap(baseModel, baseRow, baseColumn, oldExpr, info, isMove, options) {
    var selfFunction = adjustFormulaOnMoveSwap;
    var newExpr = oldExpr, arg;
    if (oldExpr.type === 1 && oldExpr._isCell() || oldExpr.type === 33 ) {
        newExpr = isMove ? adjustCellExpressionOnMove(baseModel, baseRow, baseColumn, oldExpr, info, options) : adjustCellExpressionOnSwap(baseModel, baseRow, baseColumn, oldExpr, info);
    }
    else if (oldExpr.type === 1 ) {
        newExpr = isMove ? adjustRangeExpressionOnMove(baseModel, baseRow, baseColumn, oldExpr, info, options) : adjustRangeExpressionOnSwap(baseModel, baseRow, baseColumn, oldExpr, info);
    }
    else if (oldExpr.type === 10 ) {
        arg = selfFunction(baseModel, baseRow, baseColumn, oldExpr.value, info, isMove, options);
        if (arg !== oldExpr.value) {
            newExpr = CalcEngine_1._createParenthesesExpression(arg);
        }
    }
    else if (oldExpr.type === 9 ) {
        var arg0 = selfFunction(baseModel, baseRow, baseColumn, oldExpr.value, info, isMove, options);
        var arg1 = oldExpr.value2 && selfFunction(baseModel, baseRow, baseColumn, oldExpr.value2, info, isMove, options);
        if (arg0 !== oldExpr.value || arg1 !== oldExpr.value2) {
            newExpr = CalcEngine_1._createOperatorExpression(oldExpr.operatorType, arg0, arg1);
        }
    }
    else if (oldExpr.type === 7 ) {
        var args = keyword_null, fnArg = void 0, i = void 0;
        var argCount = oldExpr.arguments.length;
        for (i = 0; i < argCount; i++) {
            fnArg = oldExpr.arguments[i];
            arg = selfFunction(baseModel, baseRow, baseColumn, fnArg, info, isMove, options);
            if (arg !== fnArg) {
                args = [];
                args[i] = arg;
                break;
            }
        }
        if (args) {
            for (i = 0; i < argCount; i++) {
                fnArg = oldExpr.arguments[i];
                if (args[i] === keyword_undefined || args[i] === keyword_null) {
                    args[i] = selfFunction(baseModel, baseRow, baseColumn, fnArg, info, isMove, options);
                }
            }
            newExpr = CalcEngine_1._createFunctionExpression(oldExpr, args);
        }
    }
    return newExpr;
}
exports.adjustFormulaOnMoveSwap = adjustFormulaOnMoveSwap;
function adjustDataValidatorFormulasOnMoveSwap(validators, info, isMove) {
    var changeInfo = info._fromModel.getSheet()._modelManager._getChangesForCalcEngine();
    for (var i = 0; i < validators.length; i++) {
        var dataValidator = validators[i].validator;
        var ranges = dataValidator._ranges;
        var baseRowCol = getBaseRowBaseCol(ranges);
        var baseRow = baseRowCol.r;
        var baseCol = baseRowCol.c;
        var sheet = validators[i].sheet;
        var sheetSource = sheet._getSheetSource();
        var condition = dataValidator.condition();
        var expressions = condition.getExpressions();
        if (expressions && expressions.length > 0) {
            for (var j = 0; j < expressions.length; j++) {
                var expression = expressions[j];
                expressions[j] = adjustFormulaOnMoveSwap(sheetSource, baseRow, baseCol, expression, info, isMove, { isDataValidator: true });
            }
            condition.setExpressions(expressions, changeInfo);
        }
    }
}
function adjustCellExpressionOnSwap(baseModel, baseRow, baseColumn, refExpr, info) {
    var refModel = refExpr.source || baseModel;
    var refRowRelative = refExpr.rowRelative, refColumnRelative = refExpr.columnRelative, refRow, refColumn;
    var rowOffset = info._rowOffset(baseRow), colOffset = info._colOffset(baseColumn);
    var isSpillReference = refExpr.type === 33 , contextSource = isSpillReference && refExpr.contextSource;
    if ((baseRow >= 0 || !refRowRelative) && (baseColumn >= 0 || !refColumnRelative)) {
        refRow = refExpr.row + (refRowRelative ? baseRow : 0);
        refColumn = refExpr.column + (refColumnRelative ? baseColumn : 0);
        if (info._destinationContains(baseModel, baseRow, baseColumn, 1, 1)) {
            refRow -= (refRowRelative ? rowOffset : 0);
            refColumn -= (refColumnRelative ? colOffset : 0);
        }
        else if (info._sourceContains(baseModel, refRow, refColumn, 1, 1)) {
            refRow += (refRowRelative ? rowOffset : 0);
            refColumn += (refColumnRelative ? colOffset : 0);
        }
        if (info._sourceContains(refModel, refRow, refColumn, 1, 1)) {
            refRow += rowOffset;
            refColumn += colOffset;
        }
        else if (info._destinationContains(refModel, refRow, refColumn, 1, 1)) {
            refRow -= rowOffset;
            refColumn -= colOffset;
        }
        refRow -= (refRowRelative ? baseRow : 0);
        refColumn -= (refColumnRelative ? baseColumn : 0);
        if (refRow !== refExpr.row || refColumn !== refExpr.column) {
            return createAdjustedCellLikeExpression(refExpr.source, keyword_null, refRow, refColumn, refRowRelative, refColumnRelative, isSpillReference, contextSource);
        }
    }
    else if ((baseRow >= 0 || !refRowRelative) && baseColumn === -1) {
        refRow = refExpr.row + (refRowRelative ? baseRow : 0);
        if (info._destinationContains(baseModel, baseRow, -1, 1, -1)) {
            refRow -= (refRowRelative ? rowOffset : 0);
        }
        else if (info._sourceContains(baseModel, refRow, -1, 1, -1)) {
            refRow += (refRowRelative ? rowOffset : 0);
        }
        if (info._sourceContains(refModel, refRow, -1, 1, -1)) {
            refRow += rowOffset;
        }
        else if (info._destinationContains(refModel, refRow, -1, 1, -1)) {
            refRow -= rowOffset;
        }
        refRow -= (refRowRelative ? baseRow : 0);
        if (refRow !== refExpr.row || refColumn !== refExpr.column) {
            return createAdjustedCellLikeExpression(refExpr.source, keyword_null, refRow, refExpr.column, refRowRelative, refExpr.columnRelative, isSpillReference, contextSource);
        }
    }
    else if (baseRow === -1 && (baseColumn >= 0 && !refColumnRelative)) {
        refColumn = refExpr.column + 0;
        if (info._destinationContains(baseModel, -1, baseColumn, -1, 1)) {
            refColumn -= 0;
        }
        else if (info._sourceContains(baseModel, -1, refColumn, -1, 1)) {
            refColumn += 0;
        }
        if (info._sourceContains(refModel, -1, refColumn, -1, 1)) {
            refColumn += colOffset;
        }
        else if (info._destinationContains(refModel, -1, refColumn, -1, 1)) {
            refColumn -= colOffset;
        }
        refColumn -= 0;
        if (refRow !== refExpr.row || refColumn !== refExpr.column) {
            return createAdjustedCellLikeExpression(refExpr.source, keyword_null, refExpr.row, refColumn, refExpr.rowRelative, refColumnRelative, isSpillReference, contextSource);
        }
    }
    return refExpr;
}
function adjustRangeExpressionOnSwap(baseModel, baseRow, baseColumn, refExpr, info) {
    var refModel = refExpr.source || baseModel;
    var rangeType = refExpr._getRangeType();
    var refStartRow, refEndRow, refStartColumn, refEndColumn, refRowCount, refColumnCount;
    var refStartRowRelative, refStartColumnRelative, refEndRowRelative, refEndColumnRelative;
    var ro, co, ro1, co1, ro2, co2;
    var rowOffset = info._rowOffset(baseRow), colOffset = info._colOffset(baseColumn);
    if (rangeType === 0 ) {
        refStartRowRelative = refExpr.rowRelative;
        refStartColumnRelative = refExpr.columnRelative;
        refEndRowRelative = refExpr.endRowRelative;
        refEndColumnRelative = refExpr.endColumnRelative;
        if ((baseRow >= 0 || !refStartRowRelative || !refEndRowRelative) && (baseColumn >= 0 || !refStartColumnRelative || !refEndColumnRelative)) {
            refStartRow = refExpr.row + (refStartRowRelative ? baseRow : 0);
            refEndRow = refExpr.endRow + (refEndRowRelative ? baseRow : 0);
            refStartColumn = refExpr.column + (refStartColumnRelative ? baseColumn : 0);
            refEndColumn = refExpr.endColumn + (refEndColumnRelative ? baseColumn : 0);
            refRowCount = refEndRow - refStartRow;
            refColumnCount = refEndColumn - refStartColumn;
            if (info._destinationContains(baseModel, baseRow, baseColumn, 1, 1)) {
                ro1 = (refStartRowRelative ? rowOffset : 0);
                co1 = (refStartColumnRelative ? colOffset : 0);
                ro2 = (refEndRowRelative ? rowOffset : 0);
                co2 = (refEndColumnRelative ? colOffset : 0);
                refStartRow -= ro1;
                refEndRow -= ro2;
                refStartColumn -= co1;
                refEndColumn -= co2;
            }
            else if (info._sourceContains(baseModel, refStartRow, refStartColumn, refRowCount, refColumnCount)) {
                ro1 = (refStartRowRelative ? rowOffset : 0);
                co1 = (refStartColumnRelative ? colOffset : 0);
                ro2 = (refEndRowRelative ? rowOffset : 0);
                co2 = (refEndColumnRelative ? colOffset : 0);
                refStartRow += ro1;
                refEndRow += ro2;
                refStartColumn += co1;
                refEndColumn += co2;
            }
            if (info._sourceContains(refModel, refStartRow, refStartColumn, refRowCount, refColumnCount)) {
                ro = rowOffset;
                co = colOffset;
                refStartRow += ro;
                refEndRow += ro;
                refStartColumn += co;
                refEndColumn += co;
            }
            else if (info._destinationContains(refModel, refStartRow, refStartColumn, refRowCount, refColumnCount)) {
                ro = rowOffset;
                co = colOffset;
                refStartRow -= ro;
                refEndRow -= ro;
                refStartColumn -= co;
                refEndColumn -= co;
            }
            refStartRow -= (refStartRowRelative ? baseRow : 0);
            refEndRow -= (refEndRowRelative ? baseRow : 0);
            refStartColumn -= (refStartColumnRelative ? baseColumn : 0);
            refEndColumn -= (refEndColumnRelative ? baseColumn : 0);
            if (refStartRow !== refExpr.row || refStartColumn !== refExpr.column || refEndRow !== refExpr.endRow || refEndColumn !== refExpr.endColumn) {
                return CalcEngine_1._createRangeExpression(refExpr.source, keyword_null, refStartRow, refStartColumn, refEndRow, refEndColumn, refStartRowRelative, refStartColumnRelative, refEndRowRelative, refEndColumnRelative, baseRow, baseColumn);
            }
        }
        else if ((baseRow >= 0 || !refStartRowRelative || !refEndRowRelative) && baseColumn === -1) {
            refStartRow = refExpr.row + (refStartRowRelative ? baseRow : 0);
            refEndRow = refExpr.endRow + (refEndRowRelative ? baseRow : 0);
            if (refStartRow < refEndRow) {
                return CalcEngine_1._referenceErrorExpr;
            }
            if (info._destinationContains(baseModel, baseRow, -1, 1, -1)) {
                ro1 = (refStartRowRelative ? rowOffset : 0);
                ro2 = (refStartRowRelative ? rowOffset : 0);
                refStartRow -= ro1;
                refEndRow -= ro2;
            }
            else if (info._sourceContains(baseModel, baseRow, -1, 1, -1)) {
                ro1 = (refStartRowRelative ? rowOffset : 0);
                ro2 = (refStartRowRelative ? rowOffset : 0);
                refStartRow += ro1;
                refEndRow += ro2;
            }
            refRowCount = refEndRow - refStartRow;
            if (info._sourceContains(refModel, refStartRow, -1, refRowCount, -1)) {
                ro = rowOffset;
                refStartRow += ro;
                refEndRow += ro;
            }
            else if (info._destinationContains(refModel, refStartRow, -1, refRowCount, -1)) {
                ro = rowOffset;
                refStartRow -= ro;
                refEndRow -= ro;
            }
            refStartRow -= (refStartRowRelative ? baseRow : 0);
            refEndRow -= (refEndRowRelative ? baseRow : 0);
            if (refStartRow !== refExpr.row || refEndRow !== refExpr.endRow) {
                return CalcEngine_1._createRangeExpression(refExpr.source, keyword_null, refStartRow, refExpr.column, refEndRow, refExpr.endColumn, refStartRowRelative, refExpr.columnRelative, refEndRowRelative, refExpr.endColumnRelative, baseRow, baseColumn);
            }
        }
        else if (baseRow === -1 && (baseColumn >= 0 || !refStartColumnRelative || !refEndColumnRelative)) {
            refStartColumn = refExpr.column + (refStartColumnRelative ? baseColumn : 0);
            refEndColumn = refExpr.endColumn + (refEndColumnRelative ? baseColumn : 0);
            if (refStartColumn < refEndColumn) {
                return CalcEngine_1._referenceErrorExpr;
            }
            if (info._destinationContains(baseModel, -1, baseColumn, -1, 1)) {
                co1 = (refStartColumnRelative ? colOffset : 0);
                co2 = (refEndColumnRelative ? colOffset : 0);
                refStartColumn -= co1;
                refEndColumn -= co2;
            }
            else if (info._sourceContains(baseModel, -1, baseColumn, -1, 1)) {
                co1 = (refStartColumnRelative ? colOffset : 0);
                co2 = (refEndColumnRelative ? colOffset : 0);
                refStartColumn += co1;
                refEndColumn += co2;
            }
            refColumnCount = refEndColumn - refStartColumn;
            if (info._sourceContains(refModel, -1, refStartColumn, -1, refColumnCount)) {
                co = colOffset;
                refStartColumn += co;
                refEndColumn += co;
            }
            else if (info._destinationContains(refModel, -1, refStartColumn, -1, refColumnCount)) {
                co = colOffset;
                refStartColumn -= co;
                refEndColumn -= co;
            }
            refStartColumn -= (refStartColumnRelative ? baseColumn : 0);
            refEndColumn -= (refEndColumnRelative ? baseColumn : 0);
            if (refStartColumn !== refExpr.column || refEndColumn !== refExpr.endColumn) {
                return CalcEngine_1._createRangeExpression(refExpr.source, keyword_null, refStartColumn, refExpr.endRow, refEndColumn, refExpr.rowRelative, refStartColumnRelative, refExpr.endRowRelative, refEndColumnRelative, baseRow, baseColumn);
            }
        }
    }
    else if (rangeType === 1 ) {
        refStartRowRelative = refExpr.rowRelative;
        refEndRowRelative = refExpr.endRowRelative;
        if (baseRow >= 0 || !refStartRowRelative || !refEndRowRelative) {
            refStartRow = refExpr.row + (refStartRowRelative ? baseRow : 0);
            refEndRow = refExpr.endRow + (refEndRowRelative ? baseRow : 0);
            if (refStartRow < refEndRow) {
                return CalcEngine_1._referenceErrorExpr;
            }
            if (info._destinationContains(baseModel, baseRow, -1, 1, -1)) {
                ro1 = (refStartRowRelative ? rowOffset : 0);
                ro2 = (refEndRowRelative ? rowOffset : 0);
                refStartRow -= ro1;
                refEndRow -= ro2;
            }
            else if (info._sourceContains(baseModel, baseRow, -1, 1, -1)) {
                ro1 = (refStartRowRelative ? rowOffset : 0);
                ro2 = (refEndRowRelative ? rowOffset : 0);
                refStartRow += ro1;
                refEndRow += ro2;
            }
            refRowCount = refEndRow - refStartRow;
            if (info._sourceContains(refModel, refStartRow, -1, refRowCount, -1)) {
                ro = rowOffset;
                refStartRow += ro;
                refEndRow += ro;
            }
            else if (info._destinationContains(refModel, refStartRow, -1, refRowCount, -1)) {
                ro = rowOffset;
                refStartRow -= ro;
                refEndRow -= ro;
            }
            refStartRow -= (refStartRowRelative ? baseRow : 0);
            refEndRow -= (refEndRowRelative ? baseRow : 0);
            if (refStartRow !== refExpr.row || refEndRow !== refExpr.endRow) {
                return CalcEngine_1._createRangeExpression(refExpr.source, keyword_null, refStartRow, calc_ns_1.BAND_INDEX_CONST, refEndRow, calc_ns_1.BAND_INDEX_CONST, refStartRowRelative, false, refEndRowRelative, false, baseRow, baseColumn);
            }
        }
    }
    else if (rangeType === 2 ) {
        refStartColumnRelative = refExpr.columnRelative;
        refEndColumnRelative = refExpr.endColumnRelative;
        refStartColumn = refExpr.column + (refStartColumnRelative ? baseColumn : 0);
        refEndColumn = refExpr.endColumn + (refEndColumnRelative ? baseColumn : 0);
        if (refStartColumn > refEndColumn) {
            return CalcEngine_1._referenceErrorExpr;
        }
        if (info._destinationContains(baseModel, -1, baseColumn, -1, 1)) {
            co1 = (refStartColumnRelative ? colOffset : 0);
            co2 = (refEndColumnRelative ? colOffset : 0);
            refStartColumn -= co1;
            refEndColumn -= co2;
        }
        else if (info._sourceContains(baseModel, -1, baseColumn, -1, 1)) {
            co1 = (refStartColumnRelative ? colOffset : 0);
            co2 = (refEndColumnRelative ? colOffset : 0);
            refStartColumn += co1;
            refEndColumn += co2;
        }
        refColumnCount = refEndColumn - refStartColumn;
        if (info._sourceContains(refModel, -1, refStartColumn, -1, refColumnCount)) {
            co = colOffset;
            refStartColumn += co;
            refEndColumn += co;
        }
        else if (info._destinationContains(refModel, -1, refStartColumn, -1, refColumnCount)) {
            co = colOffset;
            refStartColumn -= co;
            refEndColumn -= co;
        }
        refStartColumn -= (refStartColumnRelative ? baseColumn : 0);
        refEndColumn -= (refEndColumnRelative ? baseColumn : 0);
        if (refStartColumn !== refExpr.column || refEndColumn !== refExpr.endColumn) {
            return CalcEngine_1._createRangeExpression(refExpr.source, keyword_null, calc_ns_1.BAND_INDEX_CONST, refStartColumn, calc_ns_1.BAND_INDEX_CONST, refEndColumn, false, refStartColumnRelative, false, refEndColumnRelative, baseRow, baseColumn);
        }
    }
    return refExpr;
}
function addDependentsToAdjust(sourceModel, row, col, rowCount, colCount, needSaveChanges) {
    sourceModel._addDependents(row, col, rowCount, colCount, true, false, needSaveChanges);
}
function adjustFormulaOnRemoveNameImp(baseModel, oldExpr, name) {
    var selfFunction = adjustFormulaOnRemoveNameImp;
    var newExpr = oldExpr, arg, fnArg, i;
    if (oldExpr.type === 8 ) {
        if (oldExpr.value === name && (!oldExpr.source || oldExpr.source === baseModel.getSource())) {
            return CalcEngine_1._createErrorExpression(CalcErrorsReference, oldExpr.source);
        }
    }
    else if (oldExpr.type === 10 ) {
        arg = selfFunction(baseModel, oldExpr.value, name);
        if (arg !== oldExpr.value) {
            newExpr = CalcEngine_1._createParenthesesExpression(arg);
        }
    }
    else if (oldExpr.type === 9 ) {
        var arg0 = selfFunction(baseModel, oldExpr.value, name);
        var arg1 = oldExpr.value2 && selfFunction(baseModel, oldExpr.value2, name);
        if (arg0 !== oldExpr.value || arg1 !== oldExpr.value2) {
            newExpr = CalcEngine_1._createOperatorExpression(oldExpr.operatorType, arg0, arg1);
        }
    }
    else if (oldExpr.type === 7 ) {
        var args = keyword_null;
        var argCount = oldExpr.arguments.length;
        for (i = 0; i < argCount; i++) {
            fnArg = oldExpr.arguments[i];
            arg = selfFunction(baseModel, fnArg, name);
            if (arg !== fnArg) {
                args = [];
                args[i] = arg;
                break;
            }
        }
        if (args) {
            for (i = 0; i < argCount; i++) {
                fnArg = oldExpr.arguments[i];
                if (args[i] === keyword_undefined || args[i] === keyword_null) {
                    args[i] = selfFunction(baseModel, fnArg, name);
                }
            }
            newExpr = CalcEngine_1._createFunctionExpression(oldExpr, args);
        }
    }
    return newExpr;
}
/***/ }),

/***/ './dist/plugins/sheetsCalc/parser-sheets.js':
/*!**************************************************!*\
  !*** ./dist/plugins/sheetsCalc/parser-sheets.js ***!
  \**************************************************/
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
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var calc_spreadjs_1 = __webpack_require__(/*! ./calc-spreadjs */ './dist/plugins/sheetsCalc/calc-spreadjs.js');
var calc_ns_1 = __webpack_require__(/*! ./calc.ns */ './dist/plugins/sheetsCalc/calc.ns.js');
var util_1 = __webpack_require__(/*! util */ './node_modules/util/util.js');
var indexToLetters = Core_1.util._indexToLetters;
var rm = new Common_1.Common.ResourceManager(Core_1.SR);
var getSR = rm.getResource.bind(rm);
var CalcErrorsRef = CalcEngine_1.Errors.Reference;
exports.maxRowCount = 1048576;
exports.maxColumnCount = 16384;
var LetterPows = [1, 26, 676];
var keyword_undefined = void 0, keyword_null = null, structReferenceKeywordsLlowercase = ['#all', '#data', '#headers', '#totals', '#this row'];
var specialSheetNameCharDict = {
    ' ': true,
    '\'': true,
    '[': true,
    ']': true,
    '?': true,
    '\\': true,
    '%': true,
    '"': true,
    '(': true,
    ')': true,
    '|': true,
    '{': true,
    '}': true,
    '#': true,
    '@': true,
    '!': true,
    '$': true,
    '^': true,
    '\uff08': true,
    '\uff09': true,
    '.': true,
    ';': true
};
var StartWithR1C1REG = /^(R|C|RC)?(0*[1-9]\d*)/;
var IsA1REG = /^[A-z]{1,3}0*[1-9]\d{0,6}$/;


var AddQuoteSymbolsReg = /[\u00A2\u00A3\u00A5\u00A6\u00A9\u00AB\u00AC\u00AE\u09E6-\u09EF\u09F2-\u0A03\u0AE2-\u0AF1\u0BE6-\u0BFA\u0E3F\u17B4-\u17D6\u17D8-\u17DB\u17DD-\u181F\u1878-\u187F\u18A9\u18AB-\u18FF\u191D-\u194F\u196E\u196F\u1975-\u197F\u19AA-\u19C0\u19C8-\u19FF\u2000-\u200F\u2011\u2012\u2017\u201A\u201B\u201E\u201F\u2022-\u2024\u2028-\u202F\u2031\u2034\u2036-\u203A\u203C-\u2070\u2072\u2073\u2075-\u207E\u2080\u2085-\u208F\u2095-\u20CF\u2100\u2101\u2104\u2106\u2108\u2114\u2117\u2118\u211E-\u2120\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u2152\u2155-\u215A\u215F\u2189-\u218F\u219A-\u21D1\u21D3\u21D5-\u21FF\u2201\u2204-\u2206\u2209\u220A\u220C-\u220E\u2210\u2212-\u2214\u2216-\u2219\u221B\u221C\u2221\u2222\u2224\u2226\u222D\u222F-\u2233\u2238-\u223B\u223E-\u2247\u2249-\u224B\u224D-\u2251\u2253-\u225F\u2262\u2263\u2268\u2269\u226C\u226D\u2270-\u2281\u2284\u2285\u2288-\u2294\u2296-\u2298\u229A-\u22A4\u22A6-\u22BE\u22C0-\u2311\u2313-\u245F\u24B6-\u24CF\u24EA-\u24FF\u254C-\u254F\u2575-\u2580\u2590\u2591\u2596-\u259F\u25A2\u25AA-\u25B1\u25B4\u25B5\u25B8-\u25BB\u25BE\u25BF\u25C2-\u25C5\u25C9\u25CA\u25CC\u25CD\u25D2-\u25E1\u25E6-\u25EE\u25F0-\u2604\u2607\u2608\u260A-\u260D\u2610-\u261B\u261D\u261F-\u263F\u2641\u2643-\u265F\u2662\u2666\u266B\u266E\u2670-\u2BFF\u3004\u3018-\u301C\u3020\u302A-\u3030\u3036\u3037\u303F\u321D-\u321F\u322A-\u3230\u3233-\u3238\u323A-\u325F\u327C-\u327E\u3280-\u32A2\u32A9-\u3302\u3304-\u330C\u330E-\u3313\u3315-\u3317\u3319-\u3321\u3324\u3325\u3328-\u332A\u332C-\u3335\u3337-\u333A\u333C-\u3348\u334B\u334C\u334E-\u3350\u3352-\u3356\u3358-\u337A\u337F\u3385-\u3387\u33CB\u33CC\u33D4\u33D7\u33D9\u33DA\u33DE-\u33FF\uD80B-\uD83F\uFDFC-\uFE2F\uFE32\uFE45-\uFE48]/;
function getColumnLettersInArray(column) {
    return indexToLetters(column + 1).split('');
}
function normalizeIndex(index, maxIndex) {
    var firstInvalidIndex = maxIndex + 1;
    if (index < 0) {
        return index % firstInvalidIndex + firstInvalidIndex;
    }
    if (index > maxIndex) {
        return index % firstInvalidIndex;
    }
    return index;
}
function createErrorSource(name) {
    return new CalcEngine_1.ErrorSource(name);
}
function isCellIndexsValidate(baseRow, baseColumn, row, column, rowRelative, columnRelative, rangeType) {
    return rangeType === 3 || row >= 0 && column >= 0 || rangeType === 1 && row >= 0 || rangeType === 2 && column >= 0;
}
function parseCellReference(charArray, isR1C1, baseRow, baseColumn, allowDynamicArray) {
    var bandIndex = calc_ns_1.BAND_INDEX_CONST;
    var result = {
        _row: bandIndex,
        _col: bandIndex,
        _rowRelative: true,
        _columnRelative: true,
        _success: false,
        _endIndex: 0,
        _isFullMatch: true
    };
    var read = isR1C1 ? readOneR1C1Element(charArray, baseRow, baseColumn, 0) : readOneA1Element(charArray, 0, allowDynamicArray);
    if (read._isRow) {
        result._row = read._elementIndex;
        result._rowRelative = read._isRelative;
    }
    else {
        result._col = read._elementIndex;
        result._columnRelative = read._isRelative;
    }
    result._endIndex = read._endIndex;
    result._success = read._success;
    if (!read._success
        || read._endIndex >= charArray.length) {
        return result;
    }
    else if (!isR1C1 && read._isRow
        || isR1C1 && !read._isRow) {
        return { _success: false };
    }
    var nextChar = charArray[result._endIndex];

    if (!isR1C1 && (CalcEngine_1.isNumber(nextChar) || nextChar === '$')
        || isR1C1 && (nextChar === 'C' || nextChar === 'c')) {
        var read2 = isR1C1 ? readOneR1C1Element(charArray, baseRow, baseColumn, result._endIndex) : readOneA1Element(charArray, result._endIndex, allowDynamicArray);
        result._endIndex = read2._endIndex;
        if (!read2._success
            || !isR1C1 && !read2._isRow
            || isR1C1 && read2._isRow) {
            result._success = false;
            return result;
        }
        if (read2._isSpillRef) {
            result._isSpillRef = true;
        }
        if (result._endIndex < charArray.length) {
            result._isFullMatch = false;
        }
        if (isR1C1) {
            result._col = read2._elementIndex;
            result._columnRelative = read2._isRelative;
        }
        else {
            result._row = read2._elementIndex;
            result._rowRelative = read2._isRelative;
        }
        result._success = true;
    }
    else {
        return { _success: false };
    }
    return result;
}
var powsTen = [1, 10, 100, 1000, 10000, 100000, 1000000, 1000000];
function isStructureRefStr(char) {
    return CalcEngine_1._isLetter(char) || char.charCodeAt(0) === 95 ;
}
function checkStructureRef(index, charArray, length) {
    var recheckIndex = index, currentChar = charArray[index], result = false;
    while (recheckIndex < length && !isStructureRefStr(currentChar)) {
        recheckIndex++;
        if (recheckIndex < length) {
            currentChar = charArray[recheckIndex];
        }
    }
    if (recheckIndex < length) {
        while (recheckIndex < length && isStructureRefStr(currentChar)) {
            recheckIndex++;
            if (recheckIndex < length) {
                currentChar = charArray[recheckIndex];
            }
        }
        if (recheckIndex < length) {
            result = true;
        }
    }
    return result;
}
function readOneA1Element(charArray, startIndex, allowDynamicArray) {
    var result = {
        _isRelative: true,
        _success: false
    };
    var length = charArray.length;
    if (startIndex >= length) {
        return result;
    }
    if (charArray[startIndex] === '$') {
        result._isRelative = false;
        startIndex++;
    }
    if (startIndex >= length) {
        return result;
    }
    var index = startIndex, intValue = 0;
    var currentChar = charArray[index];
    var isSpillRef = false;
    if (CalcEngine_1.isNumber(currentChar) && currentChar !== '0') {
        result._isRow = true;
        while (index < length && CalcEngine_1.isNumber(currentChar)) {
            index++;
            if (index < length) {
                currentChar = charArray[index];
            }
        }
        if (index + 1 === length && currentChar === '#' && allowDynamicArray) {
            isSpillRef = true;
        }
        if (index - startIndex > 7) {
            return result;
        }
        for (var intIndex = index - 1, place = 0; intIndex >= startIndex; intIndex--, place++) {
            intValue += (charArray[intIndex].charCodeAt(0) - 48) * powsTen[place];
        }
        if (intValue <= exports.maxRowCount) {
            result._elementIndex = intValue - 1;
            result._endIndex = isSpillRef ? length : index;
            result._isSpillRef = isSpillRef;
            result._success = true;
            return result;
        }
    }
    else if (CalcEngine_1._isLetter(currentChar)) {
        result._isRow = false;
        while (index < length && CalcEngine_1._isLetter(currentChar)) {
            index++;
            if (index < length) {
                currentChar = charArray[index];
            }
        }
        var letterLength = index - startIndex;
        if (letterLength > 3) {
            return result;
        }
        else if (checkStructureRef(index, charArray, length)) {
            return result;
        }
        intValue = 0;
        var last = index - 1;
        for (var i = last; i >= startIndex; i--) {
            var charCode = charArray[i].charCodeAt(0);

            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
                return result;
            }
            intValue += ((charCode | 0x20) - 96) * LetterPows[last - i];
        }
        if (intValue <= exports.maxColumnCount) {
            result._elementIndex = intValue - 1;
            result._endIndex = index;
            result._success = true;
            return result;
        }
    }
    return result;
}
function readOneR1C1Element(charArray, baseRow, baseColumn, startIndex) {
    var bandIndex = calc_ns_1.BAND_INDEX_CONST;
    var result = {
        _endIndex: startIndex,
        _elementIndex: bandIndex,
        _isRow: true,
        _isRelative: false,
        _success: false
    };
    var length = charArray.length;
    if (startIndex >= length) {
        return result;
    }
    var index = startIndex;
    var currentChar = charArray[index];
    var baseIndex;
    if (currentChar === 'R' || currentChar === 'r') {
        result._isRow = true;
        baseIndex = baseRow;
    }
    else if (currentChar === 'C' || currentChar === 'c') {
        result._isRow = false;
        baseIndex = baseColumn;
    }
    else {
        return result;
    }
    startIndex++;
    index++;
    if (startIndex >= length) {
        result._endIndex = startIndex;
        result._elementIndex = baseIndex;
        result._isRelative = true;
        result._success = true;
        return result;
    }
    currentChar = charArray[index];
    if (currentChar === '[') {
        startIndex++;
        index++;
        result._isRelative = true;
    }
    if (startIndex >= length) {
        return result;
    }
    var isNegative = false;
    currentChar = charArray[index];
    if (result._isRelative && currentChar === '-') {
        startIndex++;
        index++;
        isNegative = true;
    }
    if (startIndex >= length) {
        return result;
    }
    currentChar = charArray[index];

    if (CalcEngine_1.isNumber(currentChar)) {
        while (index < length && CalcEngine_1.isNumber(currentChar)) {
            index++;
            if (index < length) {
                currentChar = charArray[index];
            }
        }
        var intValue = parseInt(charArray.slice(startIndex, index).join(''), 10);
        if (result._isRelative) {
            if (index >= length || charArray[index] !== ']') {
                return result;
            }
            index++;
        }
        if (intValue < (result._isRow ? exports.maxRowCount : exports.maxColumnCount)) {
            if (result._isRelative) {
                intValue = isNegative ? -intValue : intValue;
                result._elementIndex = intValue + baseIndex;
            }
            else {
                result._elementIndex = intValue - 1;
            }
            result._endIndex = index;
            result._success = true;
            return result;
        }
    }
    else if (result._isRelative) {
        return result;
    }
    else {
        result._endIndex = startIndex;
        result._elementIndex = baseIndex;
        result._isRelative = true;
        result._success = true;
        return result;
    }
}
var SpillReferenceSetting = [{ prefix: 'ANCHORARRAY(', surfix: ')' }, { prefix: '', surfix: '#' }];
function unparseRefenceExpressions(context, parser, expr, formula) {
    var service = context.source && context.source._service;
    var baseRow = context.row || 0, baseColumn = context.column || 0;
    var toExcel = context._toStandard;
    if (expr.source === CalcEngine_1.BangSource ) {
        formula.push('!');
    }
    else if (expr.source) {
        var isSourceValid = unparseSource(context, formula, expr.source, expr.endSource);
        if (!isSourceValid) {
            formula.push('#', 'R', 'E', 'F', '!');
            return;
        }
    }
    var exprType = expr.type, isSpillRef = exprType === 33 ;
    if (exprType === 8 || exprType === 5 ) {
        formula.push(expr.value.toString());
    }
    else if (exprType === 100 ) {
        var prefix = '_xlpm.';
        var isLocalVarible = expr._isLocalVarible;
        if (isLocalVarible && service._isToJSON) {
            formula.push(prefix + expr.value.toString());
        }
        else {
            formula.push(expr.value.toString());
        }
    }
    else if (expr.value && expr._error) {
        formula.push(expr.value.toString());
    }
    else if (isSpillRef || expr._isCell()) {
        var settingItem = void 0, prefix = void 0, surfix = void 0;
        if (isSpillRef) {
            settingItem = SpillReferenceSetting[toExcel ? 0 : 1];
            prefix = settingItem.prefix;
            surfix = settingItem.surfix;
            formula.push(prefix);
            if (expr.isReferenceError) {
                formula.push('#REF!');
                formula.push(surfix);
                return;
            }
        }

        if (!(expr.source) && context.addSheetName && context.source) {
            unparseSource(context, formula, context.source, keyword_undefined);
        }
        unparseCell(context.useR1C1, baseRow, baseColumn, expr.row, expr.column, expr.rowRelative, expr.columnRelative, formula);
        if (isSpillRef) {
            formula.push(surfix);
        }
    }
    else {
        if (!(expr.source) && context.addSheetName && context.source) {
            unparseSource(context, formula, context.source, keyword_undefined);
        }
        unparseRange(context.source, context.useR1C1, baseRow, baseColumn, expr.row, expr.column, expr.endRow, expr.endColumn, expr.rowRelative, expr.columnRelative, expr.endRowRelative, expr.endColumnRelative, formula, expr._getRangeType());
    }
}
function unparseCell(useR1C1, baseRow, baseColumn, row, column, rowRelative, columnRelative, formula, rangeType) {
    rangeType = rangeType || 0 ;
    var maxRowIndex = exports.maxRowCount - 1;
    if ((rangeType === 0 || rangeType === 1 ) && row > (-maxRowIndex) && row <= 2 * maxRowIndex) {
        row += (rowRelative ? baseRow : 0);
        row = normalizeIndex(row, maxRowIndex);
    }
    var maxColumnIndex = exports.maxColumnCount - 1;
    if ((rangeType === 0 || rangeType === 2 ) && column > -maxColumnIndex && column <= 2 * maxColumnIndex) {
        column += (columnRelative ? baseColumn : 0);
        column = normalizeIndex(column, maxColumnIndex);
    }
    if (!isCellIndexsValidate(baseRow, baseColumn, row, column, rowRelative, columnRelative, rangeType)) {
        formula.push(CalcEngine_1.Errors.Reference.toString());
        return;
    }
    if (useR1C1) {
        if (rangeType !== 2 ) {
            formula.push('R');
            if (row >= 0 && (baseRow !== row || !rowRelative)) {
                if (rowRelative) {
                    formula.push('[' + (row - baseRow) + ']');
                }
                else {
                    row++;
                    formula.push(row + '');
                }
            }
            if (column < 0) {
                return;
            }
        }
        if (rangeType !== 1 ) {
            formula.push('C');
            if (baseColumn !== column || !columnRelative) {
                if (columnRelative) {
                    formula.push('[' + (column - baseColumn) + ']');
                }
                else {
                    column++;
                    formula.push(column + '');
                }
            }
        }
    }
    else {
        if (column >= 0) {
            if (!columnRelative) {
                formula.push('$');
            }
            formula.push.apply(formula, getColumnLettersInArray(column));
        }
        if (row < 0) {
            return;
        }
        row++;
        if (!rowRelative) {
            formula.push('$');
        }
        formula.push(row + '');
    }
}
function unparseRange(source, useR1C1, baseRow, baseColumn, startRow, startColumn, endRow, endColumn, rowRelative, startColumnRelative, endRowRelative, endColumnRelative, formula, rangeType) {
    rangeType = rangeType || 0 ;
    if (rangeType === 3 ) {
        startRow = 0;
        endRow = source ? source.getRowCount() : exports.maxRowCount - 1;
        rangeType = 1 ;
    }
    unparseCell(useR1C1, baseRow, baseColumn, startRow, startColumn, rowRelative, startColumnRelative, formula, rangeType);

    var bandIndex = calc_ns_1.BAND_INDEX_CONST;
    if (useR1C1 && startRow === endRow && startColumn === endColumn && (endRow === bandIndex || endColumn === bandIndex)) {
        return;
    }
    if (endRow !== bandIndex || endColumn !== bandIndex) {
        formula.push(':');
        unparseCell(useR1C1, baseRow, baseColumn, endRow, endColumn, endRowRelative, endColumnRelative, formula, rangeType);
    }
}
function unparseSource(context, formula, source, endSource) {
    if (context.getExternalSourceToken) {
        if (source !== CalcEngine_1.BangSource) {
            var sourceName = getValidSources(context, context.getExternalSourceToken(source).split(''), endSource && context.getExternalSourceToken(endSource).split(''));
            if (sourceName.length > 0) {
                formula.push.apply(formula, sourceName);
            }
            else {
                return false;
            }
        }
        formula.push('!');
        return true;
    }
    return false;
}
function getValidSources(context, charArray, charArray2) {
    if (!charArray || charArray.length === 0
        || needConvertToError(context, charArray) || needConvertToError(context, charArray2)) {
        return [];
    }
    var result = charArray, i;
    if (needAppendSingleQuote(charArray, false) || charArray2 && needAppendSingleQuote(charArray2, false)) {
        result = ['\''];
        for (i = 0; i < charArray.length; i++) {
            if (charArray[i] === '\'') {
                result.push('\'');
            }
            result.push(charArray[i]);
        }
        if (charArray2) {
            result.push(':');
            for (i = 0; i < charArray2.length; i++) {
                if (charArray2[i] === '\'') {
                    result.push('\'');
                }
                result.push(charArray2[i]);
            }
        }
        result.push('\'');
    }
    else if (charArray2) {
        result.push(':');
        for (i = 0; i < charArray2.length; i++) {
            result.push(charArray2[i]);
        }
    }
    return result;
}
function needConvertToError(context, nameArray) {
    if (!nameArray || nameArray.length === 0 || !context._toStandard) {
        return false;
    }
    var startIndex = nameArray[0] === '\'' ? 1 : 0;
    return nameArray[startIndex] === '[' && nameArray.indexOf(']') > startIndex;
}
function _validateSheetName(charArray, containsSpecial) {
    if (!charArray || charArray.length === 0) {
        return true;
    }
    if (!containsSpecial) {
        if (CalcEngine_1.isNumber(charArray[0])) {
            return false;
        }
        if (isStartWithCellReference(charArray)) {
            return false;
        }
        if (AddQuoteSymbolsReg.test(charArray[0])) {
            return false;
        }
    }
    var currentChar;
    for (var i = 0; i < charArray.length; i++) {
        currentChar = charArray[i];
        if (containsSpecial) {
            if (currentChar === '*' || currentChar === ':' || currentChar === '[' || currentChar === ']'
                || currentChar === '?' || currentChar === '\\' || currentChar === '/') {
                return false;
            }
        }
        else if (specialSheetNameCharDict[currentChar] || CalcEngine_1.operaterTypesMap[currentChar]) {
            return false;
        }
    }
    return true;
}
exports._validateSheetName = _validateSheetName;

exports.validateSheetName = _validateSheetName;
function validateWorkbook(charArray, containsSpecial) {
    if (!charArray || charArray.length === 0) {
        return true;
    }
    var currentChar;
    for (var i = 0; i < charArray.length; i++) {
        currentChar = charArray[i];
        if (containsSpecial) {
            if (currentChar === '*' || currentChar === ':' || currentChar === '[' || currentChar === ']' ||
                currentChar === '?') {
                return false;
            }
            if (currentChar === '\'' && (i === 0 || i >= charArray.length - 1 || charArray[i + 1] !== '\'')) {
                return false;
            }
        }
        else if (currentChar === '\'' || currentChar === '[' || currentChar === ']' || currentChar === '?' ||
            currentChar === '%' || CalcEngine_1.operaterTypesMap[currentChar]) {
            return false;
        }
    }
    return true;
}
function needAppendSingleQuote(charArray, isR1C1) {
    if (CalcEngine_1.isDigit(+charArray[0])) {
        return true;
    }
    var workBookArray = [], workSheetArray = charArray;
    if (charArray[0] === '[') {
        var lastIndex = charArray.lastIndexOf(']');
        if (lastIndex > 0) {
            workBookArray = charArray.slice(1, lastIndex);
            workSheetArray = charArray.slice(lastIndex + 1);
        }
    }
    return !validateWorkbook(workBookArray) || !_validateSheetName(workSheetArray, isR1C1);
}
function checkA1Region(str) {
    var n = str.search(/[0-9]/);
    var ABCPart = str.substr(0, n), numberPart = parseInt(str.substr(n), 10);
    return (n <= 2 || (n === 3 && ABCPart <= 'XFD')) && numberPart <= 1048576;
}
function isStartWithCellReference(charArray) {
    var str = charArray.join('').toUpperCase();
    if (str === 'RC' || str === 'C' || str === 'R' || StartWithR1C1REG.test(str) || (IsA1REG.test(str) && checkA1Region(str))) {
        return true;
    }
    return false;
}
function createNameExpr(stringValue) {
    var expr1 = new CalcEngine_1.Expression(8 );
    expr1.value = stringValue;
    return expr1;
}
function removeCurrentWorkbookReference(source) {
    var result = source;
    if (source && source.length >= 3 && source[0] === '[' && source[1] === '0' && source[2] === ']') {
        result = source.length === 3 ? '' : source.substring(3);
    }
    return result;
}
function _adjustViewportSource(parserContext, baseRow, baseColumn) {
    var source;
    var contextSource = parserContext.source;
    if (contextSource) {
        var isFromJSON = contextSource._isFromJSON, rowShift = contextSource._rowShift, columnShift = contextSource._columnShift;
        if (isFromJSON) {
            var isInHeaderArea = (baseRow >= 0 && baseRow < rowShift && baseColumn >= columnShift)
                || (baseRow >= rowShift && baseColumn >= 0 && baseColumn < columnShift);
            if (isInHeaderArea) {
                source = contextSource;
            }
        }
    }
    return source;
}
var SheetReferenceResolver = (function (_super) {
    __extends(SheetReferenceResolver, _super);
    function SheetReferenceResolver(sheet) {
        var _this = _super.call(this, 8000) || this;
        _this._sheet = sheet;
        return _this;
    }
    SheetReferenceResolver.prototype.resolveToken = function (parserContext, builder, originalTokens, currentTokenIndex) {
        var isR1C1 = parserContext.useR1C1, baseRow = parserContext.row || 0, baseColumn = parserContext.column || 0, expr;
        var length = originalTokens.length;
        var currentToken = originalTokens[currentTokenIndex], stringValue = currentToken._stringValue, currentTokenType = currentToken._type, currentTokenSubType = currentToken._subType, source, endSource, hasSource;
        if (currentTokenType !== 0 && currentTokenSubType !== 6 ) {
            return false;
        }
        if (currentTokenType === 0 && currentTokenSubType === 0
            && currentTokenIndex < length - 2
            && originalTokens[currentTokenIndex + 1]._stringValue === ':'
            && originalTokens[currentTokenIndex + 2]._subType === 12
            && originalTokens[currentTokenIndex + 2]._stringValue.indexOf(':') < 0
            || currentTokenType === 0 && currentTokenSubType === 12 ) {
            var startSourceString = void 0, endSourceString = void 0;
            if (!stringValue) {

            }
            else if (stringValue.indexOf(':') > 0) {
                var rangeIndex = stringValue.indexOf(':');
                startSourceString = stringValue.substring(1, rangeIndex - 1);
                endSourceString = stringValue.substring(rangeIndex + 1, stringValue.length - 2);
            }
            else {
                startSourceString = stringValue;
                if (startSourceString.charAt(0) === '\'') {
                    startSourceString = startSourceString.substring(1, startSourceString.length - 1);
                }
                if (currentTokenSubType === 0 ) {
                    endSourceString = originalTokens[currentTokenIndex + 2]._stringValue;
                    if (endSourceString.charAt(0) === '\'') {
                        endSourceString = endSourceString.substring(1, endSourceString.length - 1);
                    }
                }
            }
            currentTokenIndex++;
            hasSource = !!startSourceString;
            startSourceString = removeCurrentWorkbookReference(startSourceString);
            if (startSourceString) {
                source = stringValue ? parserContext.getExternalSource('', startSourceString) : CalcEngine_1.BangSource;
                source = source || createErrorSource(startSourceString);
                endSourceString = removeCurrentWorkbookReference(endSourceString);
                if (endSourceString) {
                    endSource = parserContext.getExternalSource('', endSourceString);
                    endSource = endSource || createErrorSource(endSourceString);
                    currentTokenIndex += 2;
                }
            }
            currentToken = originalTokens[currentTokenIndex];
            if (currentToken && currentToken._value[0] === '[') {
                return false;
            }
            if (!currentToken) {
                return createNameExpr(stringValue);
            }
            stringValue = currentToken._stringValue;
        }
        var next = currentTokenIndex === length - 1 ? keyword_null : originalTokens[currentTokenIndex + 1];
        if (isCellReferenceToken(originalTokens, currentToken, currentTokenIndex, isR1C1, true)) {
            var allowDynamicArray = parserContext && parserContext.source && parserContext.source._service && parserContext.source._service.allowDynamicArray;
            var cellRef = parseCellReference(currentToken._value, isR1C1, baseRow, baseColumn, allowDynamicArray);
            if (!cellRef._success && !hasSource) {
                return false;
            }
            currentToken._subType = 7 ;
            if (!cellRef._success || !cellRef._isFullMatch) {
                expr = createNameExpr(stringValue);
            }
            else {
                var row = cellRef._row, col = cellRef._col, rowRelative = cellRef._rowRelative, colRelative = cellRef._columnRelative;
                var isSpillRef = cellRef._isSpillRef;

                if (currentTokenIndex < length - 2 && next._type === 5 && next._stringValue === ':') {
                    next = originalTokens[currentTokenIndex + 2];
                    if (isCellReferenceToken(originalTokens, next, currentTokenIndex + 2, isR1C1, false)) {
                        var nextCellRef = parseCellReference(next._value, isR1C1, baseRow, baseColumn);
                        if (nextCellRef._success) {
                            if ((row === calc_ns_1.BAND_INDEX_CONST) === (nextCellRef._row === calc_ns_1.BAND_INDEX_CONST)
                                && (col === calc_ns_1.BAND_INDEX_CONST) === (nextCellRef._col === calc_ns_1.BAND_INDEX_CONST)) {
                                baseRow = row === calc_ns_1.BAND_INDEX_CONST ? 0 : baseRow;
                                baseColumn = col === calc_ns_1.BAND_INDEX_CONST ? 0 : baseColumn;
                                return {
                                    index: currentTokenIndex + 3,
                                    expr: CalcEngine_1._createRangeExpression(source, endSource, row - (rowRelative ? baseRow : 0), col - (colRelative ? baseColumn : 0), nextCellRef._row - (nextCellRef._rowRelative ? baseRow : 0), nextCellRef._col - (nextCellRef._columnRelative ? baseColumn : 0), rowRelative, colRelative, nextCellRef._rowRelative, nextCellRef._columnRelative, baseRow, baseColumn)
                                };
                            }
                        }
                    }
                }
                if (row === calc_ns_1.BAND_INDEX_CONST || col === calc_ns_1.BAND_INDEX_CONST) {
                    if (isR1C1) {
                        row = row - (row !== calc_ns_1.BAND_INDEX_CONST && rowRelative ? baseRow : 0);
                        col = col - (col !== calc_ns_1.BAND_INDEX_CONST && colRelative ? baseColumn : 0);
                        return {
                            index: currentTokenIndex + 1,
                            expr: CalcEngine_1._createRangeExpression(source, endSource, row, col, row, col, rowRelative, colRelative, rowRelative, colRelative, baseRow, baseColumn)
                        };
                    }
                    if (source) {
                        expr = createNameExpr(stringValue);
                    }
                    else {
                        return false;
                    }
                }
                if (!expr) {
                    if (util_1.isNullOrUndefined(source)) {
                        source = _adjustViewportSource(parserContext, baseRow, baseColumn);
                    }
                    var r = row - (rowRelative ? baseRow : 0), c = col - (colRelative ? baseColumn : 0);
                    expr = isSpillRef ?
                        CalcEngine_1._createSpillRefExpression(parserContext.source, source, endSource, r, c, rowRelative, colRelative) :
                        CalcEngine_1._createCellExpression(source, endSource, r, c, rowRelative, colRelative);
                    return {
                        index: currentTokenIndex + 1,
                        expr: expr
                    };
                }
            }
        }
        else if (currentToken._subType === 6 ) {
            expr = new CalcEngine_1.Expression(5 );
            expr.value = CalcEngine_1.CalcError.parse(currentToken._stringValue);
        }
        else if (source) {
            expr = createNameExpr(stringValue);
        }
        else {
            return false;
        }
        if (source) {
            expr.source = source;
        }
        if (endSource) {
            expr.endSource = endSource;
        }
        return {
            index: currentTokenIndex + 1,
            expr: expr
        };
    };
    SheetReferenceResolver.prototype.unparse = function (context, parser, expression, formulaChars) {
        var exprType = expression && expression.type;
        if (exprType === 1 || exprType === 8 || exprType === 5 || exprType === 33 || exprType === 100 ) {
            unparseRefenceExpressions(context, parser, expression, formulaChars);
            return true;
        }
        return false;
    };
    return SheetReferenceResolver;
}(CalcEngine_1.TokenResolver));
exports.SheetReferenceResolver = SheetReferenceResolver;
function isCellReferenceToken(tokens, current, index, isR1C1, considerNext) {
    return current._type === 0 && current._subType === 0
        || !isR1C1 && current._type === 0 && current._subType === 4
            && (!considerNext
                || index < tokens.length - 2 && tokens[index + 1]._stringValue === ':'
                    && tokens[index + 2]._type === 0 && tokens[index + 2]._subType === 4 );
}
var StructReferencePortions;
(function (StructReferencePortions) {
    StructReferencePortions[StructReferencePortions['ThisRow'] = 1] = 'ThisRow';
    StructReferencePortions[StructReferencePortions['Headers'] = 2] = 'Headers';
    StructReferencePortions[StructReferencePortions['Data'] = 3] = 'Data';
    StructReferencePortions[StructReferencePortions['Totals'] = 8] = 'Totals';
    StructReferencePortions[StructReferencePortions['HeadersAndData'] = 6] = 'HeadersAndData';
    StructReferencePortions[StructReferencePortions['DataAndTotals'] = 12] = 'DataAndTotals';
    StructReferencePortions[StructReferencePortions['All'] = 14] = 'All';
    StructReferencePortions[StructReferencePortions['NotSpecific'] = 16] = 'NotSpecific';
})(StructReferencePortions = exports.StructReferencePortions || (exports.StructReferencePortions = {}));
var StructReferenceColumnSpecifier;
(function (StructReferenceColumnSpecifier) {
    StructReferenceColumnSpecifier[StructReferenceColumnSpecifier['All'] = 1] = 'All';
    StructReferenceColumnSpecifier[StructReferenceColumnSpecifier['NotSpecific'] = 1] = 'NotSpecific';
    StructReferenceColumnSpecifier[StructReferenceColumnSpecifier['SingleColumn'] = 2] = 'SingleColumn';
    StructReferenceColumnSpecifier[StructReferenceColumnSpecifier['ColumnRange'] = 4] = 'ColumnRange';
})(StructReferenceColumnSpecifier = exports.StructReferenceColumnSpecifier || (exports.StructReferenceColumnSpecifier = {}));
function containsTable(table, row, col, rowCount, colCount) {
    return row <= table.startRow() && col <= table.startColumn()
        && row + rowCount > table.endRow() && col + colCount > table.endColumn();
}
var _TableExpression = (function (_super) {
    __extends(_TableExpression, _super);
    function _TableExpression() {
        return _super.call(this, 13 ) || this;
    }


    _TableExpression.prototype.tableName = function () {
        return this._baseTable.tableName();
    };
    Object.defineProperty(_TableExpression.prototype, 'baseTable', {
        get: function () {
            return this._baseTable;
        },
        set: function (srcTable) {
            this._baseTable = srcTable;
            this.source = srcTable.source();
        },
        enumerable: true,
        configurable: true
    });
    _TableExpression.prototype._updateCache = function () {
        this._cachedTableStartColumn = this._baseTable.startColumn();
    };
    _TableExpression.prototype.columnReferenceStart = function () {
        return this._columnReferenceStartInTable + this._baseTable.startColumn();
    };
    _TableExpression.prototype.columnReferenceEnd = function () {
        return this._columnReferenceEndInTable + this._baseTable.startColumn();
    };
    _TableExpression.prototype.referencePortions = function () {
        return this._referencePortions;
    };
    _TableExpression.prototype.referenceColumnSpecifier = function () {
        return this._referenceColumnSpecifier;
    };
    _TableExpression.prototype.getRange = function (baseRow, baseColumn, getReference) {
        var self = this, baseTable = self._baseTable;
        self._updateCache();
        var startRow, startColumn, endRow, endColumn, rowCount, columnCount;
        var tableStartRow = baseTable.startRow();
        var tableEndRow = baseTable.endRow();
        var tableHasTotalRow = baseTable.hasTotalsRow();
        var tableHasHeadersRow = baseTable.hasHeadersRow();
        switch (self._referencePortions) {
            case 3 :
            case 16 :
                startRow = tableHasHeadersRow ? tableStartRow + 1 : tableStartRow;
                endRow = tableHasTotalRow ? tableEndRow - 1 : tableEndRow;
                break;
            case 2 :
                if (!tableHasHeadersRow) {
                    if (getReference) {
                        startRow = tableStartRow - 1;
                        endRow = tableStartRow - 1;
                    }
                    else {
                        return keyword_null;
                    }
                }
                else {
                    startRow = tableStartRow;
                    endRow = tableStartRow;
                }
                break;
            case 8 :
                if (!tableHasTotalRow) {
                    if (getReference) {
                        startRow = tableEndRow + 1;
                        endRow = tableEndRow + 1;
                    }
                    else {
                        return keyword_null;
                    }
                }
                else {
                    startRow = tableEndRow;
                    endRow = tableEndRow;
                }
                break;
            case 1 :
                startRow = baseRow;
                endRow = baseRow;
                break;
            case 6 :
                startRow = tableStartRow + (getReference && !tableHasHeadersRow ? -1 : 0);
                endRow = tableHasTotalRow ? tableEndRow - 1 : tableEndRow;
                break;
            case 12 :
                startRow = tableHasHeadersRow ? tableStartRow + 1 : tableStartRow;
                endRow = tableEndRow + (getReference && !tableHasTotalRow ? 1 : 0);
                break;
            case 14 :
            default:
                startRow = tableStartRow + (getReference && !tableHasHeadersRow ? -1 : 0);
                endRow = tableEndRow + (getReference && !tableHasTotalRow ? 1 : 0);
                break;
        }
        startColumn = self.columnReferenceStart();
        endColumn = self.columnReferenceEnd();

        var tableEndColumn = baseTable.endColumn();
        if (self._referenceColumnSpecifier === 1 ) {
            endColumn = tableEndColumn;
        }
        if (startColumn > tableEndColumn || endColumn > tableEndColumn) {
            self._error = true;
            return keyword_null;
        }
        if (endRow < startRow
            || !getReference && startRow < tableStartRow
            || !getReference && endRow > tableEndRow) {
            return keyword_null;
        }
        rowCount = endRow - startRow + 1;
        columnCount = endColumn - startColumn + 1;
        return CalcEngine_1._createRangeIdentity(startRow, startColumn, rowCount, columnCount);
    };
    _TableExpression.prototype.offsetWhenInsertRemoveColumn = function (index, count, isInsert, isTable) {
        var self = this;
        var startColumn = self._cachedTableStartColumn;
        if (index < startColumn
            || index === startColumn && isInsert && !isTable
            || index > self._columnReferenceEndInTable + startColumn) {
            return self;
        }
        count = isInsert ? count : -count;
        var minStartColumn = index - startColumn;
        var newExpr = new _TableExpression();
        newExpr.baseTable = self._baseTable;
        newExpr._columnReferenceEndInTable = self._columnReferenceEndInTable + count;
        newExpr._columnReferenceStartInTable = self._columnReferenceStartInTable;
        if (index <= startColumn + self._columnReferenceStartInTable) {
            newExpr._columnReferenceStartInTable += count;
            if (newExpr._columnReferenceStartInTable < minStartColumn) {
                newExpr._columnReferenceStartInTable = minStartColumn;
            }
        }
        newExpr._referenceColumnSpecifier = self._referenceColumnSpecifier;
        newExpr._referencePortions = self._referencePortions;
        if (newExpr._columnReferenceEndInTable < newExpr._columnReferenceStartInTable) {
            return CalcEngine_1._referenceErrorExpr;
        }
        return newExpr;
    };
    _TableExpression.prototype.offsetWhenCopy = function (fromSource , targetSource , targetRow, targetColumn, offsetRow, offsetColumn, targetStartRow, targetStartColumn, rowCount, columnCount) {
        var self = this;
        var context = new calc_spreadjs_1.SheetParserContext(targetSource._sheet, targetSource._service.useR1C1, CalcEngine_1._createCellIdentity(targetRow, targetColumn));
        var destTable = context.getTableByIndex(targetRow, targetColumn);
        var newExpr = self.offset();
        if (destTable) {
            var fromRow = targetRow - offsetRow, fromColumn = targetColumn - offsetColumn, fromStartRow = targetStartRow - offsetRow, fromStartColumn = targetStartColumn - offsetColumn;
            var sourceTable = void 0;
            if (fromSource === targetSource) {
                sourceTable = context.getTableByIndex(fromRow, fromColumn);
            }
            else {
                var sourceContext = new calc_spreadjs_1.SheetParserContext(fromSource._sheet, fromSource._service.useR1C1, CalcEngine_1._createCellIdentity(fromRow, fromColumn));
                sourceTable = sourceContext.getTableByIndex(fromRow, fromColumn);
            }

            if (sourceTable !== destTable &&
                (sourceTable === self._baseTable
                    && containsTable(sourceTable, fromStartRow, fromStartColumn, rowCount, columnCount)
                    && containsTable(destTable, targetStartRow, targetStartColumn, rowCount, columnCount))) {
                newExpr.baseTable = destTable;
            }
        }
        return newExpr;
    };
    _TableExpression.prototype._offsetColumn = function (offsetColumn) {
        var self = this;
        var newExpr = new _TableExpression();
        newExpr.baseTable = self._baseTable;
        newExpr._columnReferenceEndInTable = self._columnReferenceEndInTable;
        newExpr._columnReferenceStartInTable = self._columnReferenceStartInTable;
        if (self._referenceColumnSpecifier === 2 && offsetColumn) {
            var columnCount = self._baseTable.endColumn() - self._baseTable.startColumn() + 1;
            offsetColumn %= columnCount;
            newExpr._columnReferenceStartInTable += offsetColumn;
            if (newExpr._columnReferenceStartInTable < 0) {
                newExpr._columnReferenceStartInTable += columnCount;
            }
            newExpr._columnReferenceEndInTable = newExpr._columnReferenceStartInTable;
        }
        newExpr._referenceColumnSpecifier = self._referenceColumnSpecifier;
        newExpr._referencePortions = self._referencePortions;
        return newExpr;
    };
    _TableExpression.prototype.offset = function (row, offset, offsetAbsolute) {
        var self = this;
        var newExpr = new _TableExpression();
        newExpr.baseTable = self.baseTable;
        newExpr._referencePortions = self._referencePortions;
        newExpr._columnReferenceStartInTable = self._columnReferenceStartInTable;
        newExpr._columnReferenceEndInTable = self._columnReferenceEndInTable;
        newExpr._referenceColumnSpecifier = self._referenceColumnSpecifier;
        return newExpr;
    };
    _TableExpression.prototype._inTable = function (row, col) {
        var table = this._baseTable;
        return row >= table.startRow() && col >= table.startColumn()
            && row <= table.endRow() && col <= table.endColumn();
    };
    _TableExpression.prototype._addTableReferenceInfo = function (row, col, sourceID) {
        this._baseTable._addReferenceInfo(row, col, sourceID);
    };
    return _TableExpression;
}(CalcEngine_1.Expression));
exports._TableExpression = _TableExpression;
var StructureReferenceResolver = (function (_super) {
    __extends(StructureReferenceResolver, _super);
    function StructureReferenceResolver(sheet) {
        var _this = _super.call(this, 7900) || this;
        _this._sheet = sheet;
        return _this;
    }
    StructureReferenceResolver.prototype.resolveToken = function (parserContext, builder, originalTokens, currentTokenIndex) {
        var token = originalTokens[currentTokenIndex];
        var nextToken = originalTokens[currentTokenIndex + 1];
        if (token._type === 0 ) {
            var value = void 0, isTableSheetReference = void 0;
            if ((token._subType === 0 || token._subType === 7 )) {
                value = token._stringValue;
            }
            else if (token._subType === 12 && nextToken && nextToken._type === 0 && nextToken._subType === 0 && nextToken._value[0] === '[') {
                var sheetName = token._stringValue;
                if (sheetName[0] === '\'') {
                    sheetName = sheetName.substr(1, sheetName.length - 2);
                }
                value = sheetName + nextToken._stringValue;
                isTableSheetReference = true;
            }
            else {
                return keyword_null;
            }
            if (value.charAt(value.length - 1) === ']') {
                try {
                    var expr = new _TableExpression();
                    parseStructReferenceString(parserContext, value.split(''), expr);
                    return isTableSheetReference ? { index: currentTokenIndex + 2, expr: expr } : expr;
                }
                catch (ex) {

                }
            }
            else {
                var table = parserContext.getTableByName && parserContext.getTableByName(value);
                if (table) {
                    return StructureReferenceResolver.create(table);
                }
            }
        }
        return keyword_null;
    };
    StructureReferenceResolver.prototype.unparse = function (context, parser, expr, formula) {
        if (expr.type !== 13 ) {
            return false;
        }
        var tableExpression = expr;
        var newTableName = tableExpression._baseTable._newTableName;
        var tableName = util_1.isNullOrUndefined(newTableName) ? tableExpression._baseTable.tableName() : newTableName;
        if (context._structureToRange) {
            var range = tableExpression.getRange(context.row, context.column, true);
            var rangeExpr = CalcEngine_1._createRangeExpression(tableExpression.source, keyword_null, range.row, range.col, range.row + range.rowCount - 1, range.col + range.colCount - 1, false, false, false, false);
            unparseRefenceExpressions(context, parser, rangeExpr, formula);
            return true;
        }
        if (tableExpression._referencePortions === 16
            && tableExpression._referenceColumnSpecifier === 1 ) {
            formula.push(tableName);
            if (context._toStandard) {
                formula.push('[]');
            }
            return;
        }
        var hasRefError, originalLength = formula.length;
        var inTable = context.source === tableExpression._baseTable.source() && tableExpression._inTable(context.row, context.column);
        if (!inTable || context._toStandard) {
            var name_1 = util_1.isNullOrUndefined(newTableName) ? tableExpression._baseTable.tableName() : newTableName;
            if (tableExpression._baseTable._sheet._parentSheet && !exports.validateSheetName(name_1.split(''))) {
                name_1 = getValidSources(context, name_1.split(''), null).join('') + '!';
            }
            formula.push(name_1);
        }
        formula.push('[');
        if (tableExpression._referencePortions !== 16 ) {
            var portionsString = getPortionsString(tableExpression._referencePortions, tableExpression._referenceColumnSpecifier !== 1 , context._toStandard);
            formula.push(portionsString);
        }
        if (tableExpression._referenceColumnSpecifier !== 1 ) {
            if (tableExpression._referencePortions === 1 && !context._toStandard
                || tableExpression._referencePortions === 16 ) {

            }
            else {
                formula.push(', ');
            }
            var startColumnName = tableExpression._baseTable.getColumnName(tableExpression._columnReferenceStartInTable);
            if (!startColumnName) {
                hasRefError = true;
            }
            else {
                startColumnName = getValidaColumnString(startColumnName.split('')).join('');
            }
            if (!hasRefError) {
                if (tableExpression._referenceColumnSpecifier === 4 ) {
                    var endColumnName = tableExpression._baseTable.getColumnName(tableExpression._columnReferenceEndInTable);
                    if (!endColumnName) {
                        hasRefError = true;
                    }
                    else {
                        endColumnName = getValidaColumnString(endColumnName.split('')).join('');
                        formula.push('[', startColumnName, ']:[', endColumnName, ']');
                    }
                }
                else if (tableExpression._referencePortions === 1 && !context._toStandard && !containsInvalidateColumnString(startColumnName)
                    || tableExpression._referencePortions === 16 ) {
                    formula.push(startColumnName);
                }
                else {
                    formula.push('[', startColumnName, ']');
                }
            }
        }
        if (hasRefError) {
            formula.length = originalLength;
            formula.push('#REF!');
        }
        else {
            formula.push(']');
        }
        return true;
    };
    StructureReferenceResolver.create = function (table, referencePortions, referenceColumnSpecifier,
    columnReferenceStartInTable, columnReferenceEndInTable) {
        if (referencePortions === void 0) { referencePortions = StructReferencePortions.NotSpecific; }
        if (referenceColumnSpecifier === void 0) { referenceColumnSpecifier = StructReferenceColumnSpecifier.NotSpecific; }
        if (columnReferenceStartInTable === void 0) { columnReferenceStartInTable = 0; }


        if (typeof columnReferenceEndInTable === 'undefined') {
            columnReferenceEndInTable = table.endColumn() - table.startColumn();
        }
        var expr = new _TableExpression();
        expr.baseTable = table;
        expr._referencePortions = referencePortions;
        expr._columnReferenceStartInTable = columnReferenceStartInTable;
        expr._columnReferenceEndInTable = columnReferenceEndInTable;
        expr._referenceColumnSpecifier = referenceColumnSpecifier;
        return expr;
    };
    return StructureReferenceResolver;
}(CalcEngine_1.TokenResolver));
exports.StructureReferenceResolver = StructureReferenceResolver;
function parseStructReferenceString(context, charArray, expr) {
    var tableExpression = expr;
    var charIndex = 0;
    var currentChar = charArray[charIndex];
    var rs = parseTableObject(context, charArray, charIndex, currentChar);
    var table = rs._table;
    if (!table) {
        throwError();
    }
    tableExpression.baseTable = table;
    charIndex = rs._charIndex;
    charIndex++;
    currentChar = charArray[charIndex];
    var orgIndex = charIndex;
    while (currentChar === ' ') {
        charIndex++;
        currentChar = charArray[charIndex];
    }


    if (currentChar !== '@' && currentChar !== '[') {
        charIndex = orgIndex;
        currentChar = charArray[charIndex];
    }
    var lbracketLever = 1;
    var hasPortion = false;
    var hasColumn = false;
    var structLen = charArray.length;
    while (lbracketLever !== 0 && charIndex < structLen) {
        if (currentChar === '[') {
            lbracketLever++;
            charIndex++;
            currentChar = charArray[charIndex];
        }
        if (currentChar === '#') {
            if (hasPortion && lbracketLever <= 1) {
                throwError();
            }
            var rs2 = parsePortion(charArray, charIndex, currentChar, lbracketLever);
            var portion = rs2._portion;
            charIndex = rs2._charIndex;
            currentChar = rs2._currentChar;
            lbracketLever = rs2._lbracketLever;
            if (hasPortion) {
                if (tableExpression._referencePortions === 2 && portion === 3
                    || portion === 2 && tableExpression._referencePortions === 3 ) {
                    tableExpression._referencePortions = 6 ;
                }
                else if (tableExpression._referencePortions === 3 && portion === 8
                    || portion === 3 && tableExpression._referencePortions === 8 ) {
                    tableExpression._referencePortions = 12 ;
                }
                else {
                    throwError();
                }
            }
            else {
                tableExpression._referencePortions = portion;
            }
            hasPortion = true;
        }
        else if (currentChar === '@') {
            if (lbracketLever > 1 || hasPortion) {
                throwError();
            }
            hasPortion = true;
            tableExpression._referencePortions = 1 ;
            charIndex++;
            currentChar = charArray[charIndex];
            while (currentChar === ' ') {
                charIndex++;
                currentChar = charArray[charIndex];
            }
            if (currentChar === ',') {
                throwError();
            }
        }
        else {
            var columnsStartIndex = charIndex;
            while (!util_1.isNullOrUndefined(currentChar) && currentChar !== ']' && currentChar !== '[') {
                if (currentChar === '\'') {
                    charIndex++;
                }
                if (currentChar === ',') {
                    charIndex++;
                    currentChar = charArray[charIndex];
                    var commaIndex = charIndex;
                    while (currentChar === ' ') {
                        charIndex++;
                        currentChar = charArray[charIndex];
                    }
                    if (currentChar === '[') {
                        charIndex = commaIndex;
                        currentChar = ',';
                        break;
                    }
                }
                else {
                    charIndex++;
                    currentChar = charArray[charIndex];
                }
            }
            if (charIndex > columnsStartIndex) {
                if (hasColumn
                    || currentChar === '[' && lbracketLever > 1) {
                    throwError();
                }
                var rs2 = parseColumnRange(tableExpression, charArray, charIndex, currentChar, lbracketLever, columnsStartIndex);
                charIndex = rs2._charIndex;
                currentChar = rs2._currentChar;
                lbracketLever = rs2._lbracketLever;
                hasColumn = true;
            }
            if (currentChar === ']') {
                lbracketLever--;
                if (lbracketLever === 0) {
                    break;
                }
                else if (charIndex >= charArray.length) {
                    throwError();
                }
                charIndex++;
                currentChar = charArray[charIndex];
            }
            if (currentChar === ',') {
                charIndex++;
                currentChar = charArray[charIndex];
            }
        }
    }
    if (!hasPortion) {
        tableExpression._referencePortions = context._limitThisRow ? 1 : 16 ;
    }
    if (!hasColumn) {
        tableExpression._columnReferenceStartInTable = 0;
        tableExpression._columnReferenceEndInTable = tableExpression._baseTable.endColumn() - tableExpression._baseTable.startColumn();
        tableExpression._referenceColumnSpecifier = 1 ;
    }
}
function subString(charArray, start, end) {
    return charArray.slice(start, end).join('');
}
function parseColumnRange(expr, charArray, charIndex, currentChar, lbracketLever, columnsStartIndex) {
    var tableExpression = expr;
    var columnStartString = [];
    var columnEndString = '';
    var istartStringWithBracket = false;
    var isEndStringWithBracket = false;
    var colonIndex;
    if (lbracketLever > 1) {
        istartStringWithBracket = true;
        lbracketLever--;
        columnStartString = charArray.slice(columnsStartIndex, charIndex);
        charIndex++;
        currentChar = charArray[charIndex];
        if (currentChar === ':') {
            charIndex++;
            currentChar = charArray[charIndex];
            isEndStringWithBracket = currentChar === '[';
            var rs = getColumnEndString(charArray, charIndex, currentChar, lbracketLever);
            columnEndString = rs._columnEndString;
            charIndex = rs._charIndex;
            currentChar = rs._currentChar;
            lbracketLever = rs._lbracketLever;
        }
    }
    else if (currentChar === '[') {
        isEndStringWithBracket = true;
        colonIndex = charIndex - 1;
        currentChar = charArray[colonIndex];
        while (currentChar === ' ') {
            colonIndex--;
            currentChar = charArray[colonIndex];
        }
        if (currentChar !== ':') {
            throwError();
        }
        columnStartString = charArray.slice(columnsStartIndex, colonIndex);
        columnStartString = trimStart(columnStartString);
        currentChar = charArray[charIndex];
        var rs = getColumnEndString(charArray, charIndex, currentChar, lbracketLever);
        columnEndString = rs._columnEndString;
        charIndex = rs._charIndex;
        currentChar = rs._currentChar;
        lbracketLever = rs._lbracketLever;
    }
    else {
        if (tableExpression._referencePortions === keyword_undefined || tableExpression._referencePortions === 16 ) {
            istartStringWithBracket = true;
        }
        var columnStrings = charArray.slice(columnsStartIndex, charIndex);
        colonIndex = columnStrings.indexOf(':');
        if (colonIndex > 0) {
            columnStartString = columnStrings.slice(0, colonIndex);
            columnEndString = columnStrings.slice(colonIndex + 1);
            if (columnEndString[0] !== '[') {
                throwError();
            }
        }
        else {
            columnStartString = columnStrings;
        }
    }

    var startIndex = getColumnIndex(tableExpression, columnStartString, istartStringWithBracket);
    var endIndex;
    if (columnEndString) {
        endIndex = getColumnIndex(tableExpression, columnEndString, isEndStringWithBracket);
        tableExpression._referenceColumnSpecifier = 4 ;
    }
    else {
        endIndex = startIndex;
        tableExpression._referenceColumnSpecifier = 2 ;
    }
    if (startIndex > endIndex) {
        var tmp = startIndex;
        startIndex = endIndex;
        endIndex = tmp;
    }
    tableExpression._columnReferenceStartInTable = startIndex;
    tableExpression._columnReferenceEndInTable = endIndex;
    charIndex++;
    if (charIndex < charArray.length) {
        currentChar = charArray[charIndex];
        while (currentChar === ' ') {
            charIndex++;
            currentChar = charArray[charIndex];
        }
    }
    return {
        _charIndex: charIndex,
        _currentChar: currentChar,
        _lbracketLever: lbracketLever
    };
}
function trimStart(s) {
    var i = s.length - 1;
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    while (i >= 0 && s[i] !== ' ') {
        i--;
    }
    if (i >= 0) {
        return s.slice(i + 1, s.length - i - 1);
    }
    return s;
}
function trimEnd(s) {
    var i = 0, length = s.length, start = 0;
    while (i < length && s[i] === ' ') {
        i++;
    }
    start = i;
    i = length - 1;
    while (i > start && s[i] === ' ') {
        i++;
    }
    if (i >= start) {
        return s.slice(start, i + 1);
    }
    return s;
}
function getColumnIndex(expr, charArray, containsSpecial) {
    if (charArray && validateColumnString(charArray, containsSpecial)) {
        var sb = [];
        for (var i = 0, columnStringLength = charArray.length; i < columnStringLength; i++) {
            if (charArray[i] === '\'' && i < columnStringLength - 1) {
                i++;
            }
            sb.push(charArray[i]);
        }
        charArray = sb;
        var index = expr._baseTable.getColumnIndexInTable(charArray.join(''));
        if (index < 0) {
            throwError();
        }
        return index;
    }
    return -1;
}
function validateColumnString(columnCharArray, containsSpecial) {
    if (containsSpecial) {
        return true;
    }
    var currentChar = '';
    currentChar = columnCharArray[0];
    var previousChar = currentChar;
    if (currentChar === '#' || currentChar === '@'
        || currentChar === ' ' || currentChar === ','
        || currentChar === ':' || currentChar === '[' || currentChar === ']') {
        return false;
    }
    for (var index = 1; index < columnCharArray.length; index++) {
        currentChar = columnCharArray[index];
        if (currentChar === ',' || currentChar === ':'
            || currentChar === '[' && previousChar !== '\''
            || currentChar === ']' && previousChar !== '\''
            || currentChar === '@' && previousChar !== '\''
            || currentChar === '#' && previousChar !== '\'') {
            return false;
        }
        previousChar = currentChar;
    }
    return true;
}
function getValidaColumnString(columnCharArray) {
    var validaString = [];
    var currentChar;
    for (var index = 0; index < columnCharArray.length; index++) {
        currentChar = columnCharArray[index];
        if (currentChar === '['
            || currentChar === ']'
            || currentChar === '@'
            || currentChar === '#'
            || currentChar === '\'') {
            validaString.push('\'');
        }
        validaString.push(currentChar);
    }
    return validaString;
}
function containsInvalidateColumnString(columnCharArray) {
    var currentChar = '';
    currentChar = columnCharArray[0];
    if (currentChar === '#' || currentChar === ' ' || currentChar === '@'
        || currentChar === ' ' || currentChar === ','
        || currentChar === ':' || currentChar === '[' || currentChar === ']') {
        return true;
    }
    for (var index = 1; index < columnCharArray.length; index++) {
        currentChar = columnCharArray[index];
        if (currentChar === ' ' || currentChar === ',' || currentChar === ':'
            || currentChar === '['
            || currentChar === ']'
            || currentChar === '@'
            || currentChar === '#') {
            return true;
        }
    }
    return false;
}
function getColumnEndString(charArray, charIndex, currentChar, lbracketLever) {
    var inBracket = false;
    if (currentChar === '[') {
        inBracket = true;
        lbracketLever++;
        charIndex++;
        currentChar = charArray[charIndex];
        while (currentChar === ' ') {
            charIndex++;
            currentChar = charArray[charIndex];
        }
    }
    var columnEndIndex = charIndex;
    while (currentChar !== ']' && (currentChar !== ',' || lbracketLever > 1)) {
        if (currentChar === '\'') {
            charIndex++;
        }
        charIndex++;
        currentChar = charArray[charIndex];
    }
    if (charIndex <= columnEndIndex) {
        throwError();
    }
    var endString = charArray.slice(columnEndIndex, charIndex);
    if (lbracketLever > 1) {
        lbracketLever--;
    }
    if (!inBracket) {
        endString = trimEnd(endString);
    }
    return {
        _columnEndString: endString,
        _charIndex: charIndex,
        _currentChar: currentChar,
        _lbracketLever: lbracketLever
    };
}
var poritionMap = {
    '#all': 14 ,
    '#data': 3 ,
    '#headers': 2 ,
    '#totals': 8 ,
    '#this row': 1
};
function getActualPortionString(portionString) {
    var tableFunctionsMapping = CalcEngine_1.getMapping() && CalcEngine_1.getMapping().tableFunctionsMapping;
    if (!util_1.isNullOrUndefined(tableFunctionsMapping)) {
        for (var key in tableFunctionsMapping) {
            if (tableFunctionsMapping[key].toLowerCase() === portionString) {
                return key.toLowerCase();
            }
        }
    }
    return portionString;
}
function parsePortion(charArray, charIndex, currentChar, lbracketLever) {
    var portion = 14 ;
    var portionStartIndex = charIndex;
    while (currentChar !== ']') {
        if (currentChar === '\'') {
            charIndex++;
        }
        charIndex++;
        currentChar = charArray[charIndex];
    }
    var portionString = subString(charArray, portionStartIndex, charIndex).toLowerCase().trim();
    portionString = getActualPortionString(portionString);
    var isPortionCorrect = false;
    for (var i = 0; i < structReferenceKeywordsLlowercase.length; i++) {
        var keyword = structReferenceKeywordsLlowercase[i];
        if (portionString === keyword) {
            portion = poritionMap[portionString];
            isPortionCorrect = true;
            break;
        }
    }
    if (!isPortionCorrect) {
        throwError();
    }
    charIndex++;
    if (charIndex >= charArray.length) {
        lbracketLever--;
    }
    else {
        currentChar = charArray[charIndex];
        while (currentChar === ' ') {
            charIndex++;
            currentChar = charArray[charIndex];
        }
        if (currentChar === ',') {
            if (lbracketLever <= 1) {
                throwError();
            }
            charIndex++;
            currentChar = charArray[charIndex];
            while (currentChar === ' ') {
                charIndex++;
                currentChar = charArray[charIndex];
            }
            if (currentChar === '[') {
                lbracketLever++;
                charIndex++;
                currentChar = charArray[charIndex];
            }
        }
        if (lbracketLever > 1) {
            lbracketLever--;
        }
    }
    return { _portion: portion, _charIndex: charIndex, _currentChar: currentChar, _lbracketLever: lbracketLever };
}
function parseTableObject(context, charArray, charIndex, currentChar) {
    var table;
    var lbracketIndex = 0;
    var len = charArray.length;
    while (currentChar !== '[' && charIndex < len) {
        charIndex++;
        currentChar = charArray[charIndex];
    }
    lbracketIndex = charIndex;
    if (lbracketIndex > 0) {
        var tableName = subString(charArray, 0, lbracketIndex);
        table = context.getTableByName(tableName);
    }
    else {
        table = context.getTableByIndex(context.row, context.column);
    }
    return { _table: table, _charIndex: charIndex, _currentChar: currentChar };
}
function throwError() {
    throw getSR().Exp_FormulaInvalid;
}
function getPortionsString(portion, hasColumnSpecifier, toStandard) {
    var tableFunctionsMapping = CalcEngine_1.getMapping() && CalcEngine_1.getMapping().tableFunctionsMapping;
    var _tableFunctionsResource = CalcEngine_1.sR()._tableFunctionsResource;
    var all = tableFunctionsMapping ? tableFunctionsMapping['#All'] : _tableFunctionsResource.All.name;
    var thisRow = tableFunctionsMapping ? tableFunctionsMapping['#This row'] : _tableFunctionsResource.thisRow.name;
    var headers = tableFunctionsMapping ? tableFunctionsMapping['#Headers'] : _tableFunctionsResource.Headers.name;
    var data = tableFunctionsMapping ? tableFunctionsMapping['#Data'] : _tableFunctionsResource.Data.name;
    var totals = tableFunctionsMapping ? tableFunctionsMapping['#Totals'] : _tableFunctionsResource.Totals.name;
    switch (portion) {
        case 1 :
            return toStandard ? '[' + thisRow + ']' : '@';
        case 2 :
            return hasColumnSpecifier ? '[' + headers + ']' : headers;
        case 3 :
            return hasColumnSpecifier ? '[' + data + ']' : data;
        case 8 :
            return hasColumnSpecifier ? '[' + totals + ']' : totals;
        case 6 :
            return '[' + headers + '], ' + '[' + data + ']';
        case 12 :
            return '[' + data + '], ' + '[' + totals + ']';
        case 14 :
        case 16 :
            break;
        default:
            break;
    }
    return hasColumnSpecifier ? '[' + all + ']' : all;
}
function fillBlankToTokens(tokens, charArray) {
    var offset = 0;
    var blank;
    tokens.unshift(new CalcEngine_1.FormulaToken('=', 1 , 0, 0, 0 ));
    var tokenLen, k;
    var refTokens1 = [], index1 = 0;
    for (k = tokens.length - 1; k > 0; k--) {
        if (!(tokens[k]._index === tokens[k - 1]._index && tokens[k]._stringValue === tokens[k - 1]._stringValue)) {
            refTokens1[index1] = tokens[k];
            index1++;
        }
    }
    refTokens1[index1] = tokens[k];

    refTokens1.reverse();
    var refTokens = [], index = 0, i;
    for (i = 0; i < refTokens1.length - 1; i++, index++) {
        tokenLen = getTokenLength(refTokens1[i]);
        refTokens[index] = refTokens1[i];
        offset = refTokens1[i + 1]._index - refTokens1[i]._index - tokenLen;
        if (offset > 0) {
            blank = new CalcEngine_1.FormulaToken(charArray.slice(refTokens1[i]._index + tokenLen, refTokens1[i + 1]._index), 7 , refTokens1[i]._index + tokenLen);
            ++index;
            refTokens[index] = blank;
        }
    }
    refTokens[index] = refTokens1[i];
    tokenLen = getTokenLength(refTokens[index]);
    if (refTokens.length > 0 && charArray.length > refTokens[index]._index + tokenLen) {
        blank = new CalcEngine_1.FormulaToken(charArray.slice(refTokens[index]._index + tokenLen, charArray.length), 7 , refTokens[index]._index + tokenLen);
        refTokens[index + 1] = blank;
    }
    for (var j = 0; j < refTokens.length; j++) {
        var tokenVAlue = refTokens[j]._stringValue.trim();
        if (refTokens[j]._subType === 3 ) {
            refTokens[j]._stringValue = '"' + refTokens[j]._stringValue + '"';
        }
        else if (tokenVAlue === '(' || tokenVAlue === '{') {
            refTokens[j]._type = 1 ;
            refTokens[j]._subType = 1 ;
        }
        else if (tokenVAlue === ')' || tokenVAlue === '}') {
            refTokens[j]._type = 1 ;
            refTokens[j]._subType = 2 ;
        }
    }
    return refTokens;
}
function getTokenLength(token) {
    if (token._type === 1 && token._stringValue === 'ARRAY') {
        return 1;
    }
    if (token._type === 0 && token._subType === 3 ) {
        return (token._fullString || token._stringValue).length + 2;
    }
    if (token._type === 0 && token._subType === 12 ) {
        return token._stringValue.length + 3;
    }
    return token._stringValue.length;
}
function addSheetRange(sheetRanges, source, range) {
    if (!sheetRanges || !source) {
        return;
    }
    var name = source.getName && source.getName() || '!';
    var ranges = sheetRanges[name];
    if (!ranges) {
        ranges = sheetRanges[name] = [];
        if (!sheetRanges.sheets) {
            sheetRanges.sheets = [];
        }
        sheetRanges.sheets.push(name);
    }
    ranges.push(range);
}
function getRanges(expr, ranges, sheetRanges, evaluateContext, baseRow, baseCol) {
    if (!expr) {
        return;
    }
    while (expr.type === 10 ) {
        expr = expr.value;
    }
    var cellRange;
    if (expr.type === 12 ) {
        var expendExpr = expr;
        expr = expendExpr.value;
    }
    if (expr.type >= 2 && expr.type <= 6) {

    }
    else if (expr.type === 1 ) {
        cellRange = expr.getRange(baseRow, baseCol);
        if (evaluateContext.source && (!expr.source || expr.source === evaluateContext.source)) {
            ranges.push(cellRange);
        }
        addSheetRange(sheetRanges, expr.source || evaluateContext.source, cellRange);
    }
    else if (expr.type === 13 ) {
        cellRange = expr.getRange(baseRow, baseCol);
        if (expr.source === evaluateContext.source && cellRange) {
            ranges.push(cellRange);
        }
        addSheetRange(sheetRanges, expr.source || evaluateContext.source, cellRange);
    }
    else if (expr.type === 8 ) {
        var nameContext = keyword_null;
        if (!expr.source) {
            nameContext = evaluateContext;
        }
        else if ((expr.source._getCalcServiceInternal())) {
            nameContext = new CalcEngine_1.EvaluateContext(expr.source, CalcEngine_1._createCellIdentity(baseRow, baseCol));
        }
        getRanges(nameContext.getName(expr.value), ranges, sheetRanges, nameContext, baseRow, baseCol);
    }
    else if (expr.type === 9 ) {
        getRanges(expr.value, ranges, sheetRanges, evaluateContext, baseRow, baseCol);
        if (expr.value2) {
            getRanges(expr.value2, ranges, sheetRanges, evaluateContext, baseRow, baseCol);
        }
    }
    else if (expr.type === 7 ) {
        for (var i = 0; i < expr.arguments.length; i++) {
            getRanges(expr.arguments[i], ranges, sheetRanges, evaluateContext, baseRow, baseCol);
        }
    }
}
function _parseReferenceExpressionInfos(parser, formula, source, baseRow, baseCol, culture, forceA1) {
    parser.setParserOption(culture);
    var tokens = [], charArray = formula.split('');
    try {
        var context = source._getSheetSource().getParserContext(forceA1 ? false : source._getCalcServiceInternal().useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseCol), keyword_null);

        tokens = parser.parseToTokens(context, charArray, false);
    }
    catch (ex) {

    }

    tokens = fillBlankToTokens(tokens, charArray);
    return getExpressToken(parser, tokens, charArray, source, baseRow, baseCol, forceA1);
}
exports._parseReferenceExpressionInfos = _parseReferenceExpressionInfos;
function getExpressToken(parser, refTokens, formula, source, baseRow, baseCol, forceA1) {
    var context;
    var evaluateContext = keyword_undefined;
    var sheetSource = source._getSheetSource();
    var service = source._getCalcServiceInternal();
    if (service) {
        context = new calc_spreadjs_1.SheetParserContext(source, forceA1 ? false : service.useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseCol));
        evaluateContext = new CalcEngine_1.EvaluateContext(sheetSource, CalcEngine_1._createCellIdentity(baseRow, baseCol), false);
    }
    else {
        context = new CalcEngine_1.ParserContext(keyword_null, false, CalcEngine_1._createCellIdentity(0, 0));
    }
    context.ignoreError = true;
    var newTokens = [], token;

    for (var refIndex = 0; refIndex < refTokens.length; refIndex++) {
        try {
            token = refTokens[refIndex];
            if (token._stringValue === '[' || token._value[0] === '#' || token._subType === 3 ) {
                newTokens.push({
                    text: token._fullString || token._stringValue,
                    type: token._type,
                    subType: token._subType,
                    canDrag: false,
                    ranges: token.ranges,
                    value: token._stringValue
                });
                continue;
            }
            var exprInfos = [];
            refIndex = buildExpressionInfo(parser, context, refTokens, refIndex, exprInfos);
            var canDrage = void 0;
            if (exprInfos.length > 0) {
                for (var i = 0; i < exprInfos.length; i++) {
                    var info = exprInfos[i];
                    if (info instanceof CalcEngine_1.FormulaToken) {
                        newTokens.push({
                            text: formula.slice(info._index, info._endIndex + 1).join(''),
                            type: info._type,
                            subType: info._subType,
                            canDrag: canDrage,
                            ranges: [],
                            value: info._stringValue
                        });
                    }
                    else if (info._expr) {
                        var expr = info._expr, exprType = expr.type, exprSource = expr.source;
                        var exprString = formula.slice(info._index, info._endIndex + 1).join('');
                        var ranges = [], sheetRanges = {};
                        canDrage = true;
                        var cellRange = expr.getRange && expr.getRange(baseRow, baseCol);
                        if (exprType === 8 ) {
                            canDrage = false;
                            if (evaluateContext) {
                                var nameContext = evaluateContext;
                                if (expr.source) {
                                    nameContext = new CalcEngine_1.EvaluateContext(expr.source, CalcEngine_1._createCellIdentity(baseRow, baseCol), false);
                                }
                                var nameRef = nameContext.getName(expr.value);
                                getRanges(nameRef, ranges, sheetRanges, evaluateContext, baseRow, baseCol);
                            }
                        }
                        else if (exprType === 13 ) {
                            canDrage = false;
                            if (exprSource === sheetSource && cellRange) {
                                ranges.push(cellRange);
                            }
                            else {
                                ranges = null;
                            }
                            addSheetRange(sheetRanges, exprSource, cellRange);
                        }
                        else if (exprType === 33 ) {
                            if ((exprSource || expr.contextSource) === sheetSource) {
                                if (!cellRange) {
                                    cellRange = CalcEngine_1.getRangeForReference(expr, baseRow, baseCol);
                                }
                                ranges.push(cellRange);
                                if (!exprSource) {
                                    exprSource = sheetSource;
                                }
                            }
                            addSheetRange(sheetRanges, exprSource, cellRange);
                        }
                        else if (exprType === 1 ) {
                            if (expr.endSource) {
                                var startSource = exprSource, endSource = expr.endSource;
                                var sources = startSource.getSources(endSource);
                                for (i = 0; i < sources.length; i++) {
                                    if (sources[i] === sheetSource) {
                                        ranges.push(cellRange);
                                        break;
                                    }
                                    addSheetRange(sheetRanges, sources[i], cellRange);
                                }
                            }
                            else {
                                addSheetRange(sheetRanges, exprSource || sheetSource, cellRange);
                                if (!exprSource || exprSource === sheetSource) {
                                    ranges.push(cellRange);
                                }
                            }
                        }
                        else {
                            ranges = null;
                        }
                        if (ranges && ranges.length > 0) {
                            newTokens.push({
                                text: exprString,
                                type: 0 ,
                                subType: 7 ,
                                canDrag: canDrage,
                                ranges: ranges,
                                value: exprString,
                                sheetRanges: sheetRanges
                            });
                        }
                        else {
                            newTokens.push({
                                text: exprString,
                                type: token._type,
                                subType: token._subType,
                                canDrag: canDrage,
                                ranges: ranges,
                                value: exprString,
                                sheetRanges: sheetRanges
                            });
                        }
                    }
                }
            }
            else {
                newTokens.push({
                    text: token._stringValue,
                    type: token._type,
                    subType: token._subType,
                    canDrag: false,
                    ranges: token.ranges,
                    value: token._stringValue
                });
            }
        }
        catch (e) {
            newTokens.push({
                text: token._stringValue,
                type: token._type,
                subType: token._subType,
                canDrag: false,
                ranges: token.ranges,
                value: token._stringValue
            });
        }
    }
    return newTokens;
}
function buildExpressionInfo(parser, context, tokens, tokenIndex, list) {
    var token = tokens[tokenIndex];
    if (!token || typeof token === 'function' || token._type !== 0 ) {
        return tokenIndex;
    }
    var exprs = [];
    var endTokenIndex = parser.resolveToken(context, tokens, exprs, tokenIndex) - 1;
    var expression = exprs[0], exprType = expression.type;
    if (exprType === 1 || exprType === 13 || exprType === 33
        || exprType === 8 || exprType === 5 && expression.source) {
        var endToken = tokens[endTokenIndex];
        var info = { _index: token._index, _endIndex: endToken._endIndex, _expr: expression };
        list.push(info);
        return endTokenIndex;
    }
    return tokenIndex;
}
/***/ }),

/***/ './dist/plugins/sheetsCalc/sheetsCalc.entry.js':
/*!*****************************************************!*\
  !*** ./dist/plugins/sheetsCalc/sheetsCalc.entry.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(__webpack_require__(/*! ./calc.ns */ './dist/plugins/sheetsCalc/calc.ns.js'));
__export(__webpack_require__(/*! ./parser-sheets */ './dist/plugins/sheetsCalc/parser-sheets.js'));
__export(__webpack_require__(/*! ./calc-spreadjs */ './dist/plugins/sheetsCalc/calc-spreadjs.js'));
__export(__webpack_require__(/*! ./formulaOperatorAdjustor */ './dist/plugins/sheetsCalc/formulaOperatorAdjustor.js'));
__export(__webpack_require__(/*! ./worksheet-formula */ './dist/plugins/sheetsCalc/worksheet-formula.js'));
__webpack_require__(/*! ./workbook-formula */ './dist/plugins/sheetsCalc/workbook-formula.js');
/***/ }),

/***/ './dist/plugins/sheetsCalc/workbook-formula.js':
/*!*****************************************************!*\
  !*** ./dist/plugins/sheetsCalc/workbook-formula.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Core = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var SheetsCalc = __webpack_require__(/*! ./calc-spreadjs */ './dist/plugins/sheetsCalc/calc-spreadjs.js');
var calc_spreadjs_1 = __webpack_require__(/*! ./calc-spreadjs */ './dist/plugins/sheetsCalc/calc-spreadjs.js');
var SpreadSource = SheetsCalc.SpreadSource;
var toUpperCase = Common_1.Common._StringHelper._toUpperCase;
var rm = new Common_1.Common.ResourceManager(Core_1.SR);
var getSR = rm.getResource.bind(rm);
var keyword_undefined = void 0, keyword_null = null;
var _Types = Common_1.Common._Types;

var workbookPrototype = Core_1.Workbook.prototype;
workbookPrototype._initCalcService = function (cloneOldState) {
    var self = this;
    var oldService = self._calcService;
    self._calcService = new CalcEngine_1.CalcService();


    self._calcService.useR1C1 = self.options.referenceStyle === 1;
    self._calcService.allowDynamicArray = self.options.allowDynamicArray;
    self._calcService.iterativeCalculation = self.options.iterativeCalculation;
    self._calcService.iterativeCalculationMaximumIterations = self.options.iterativeCalculationMaximumIterations;
    self._calcService.iterativeCalculationMaximumChange = self.options.iterativeCalculationMaximumChange;
    if (cloneOldState && oldService) {
        self._calcService.cloneFrom(oldService);
    }
    self._spreadSource = new SpreadSource(self);
    self._spreadSourceModel = self._calcService.getGlobalSourceModel(self._spreadSource);
};


workbookPrototype.addCustomFunction = function (fn) {
    this._addCustomFunctionCore(fn);
};
workbookPrototype._addCustomFunctionCore = function (fn) {
    if (!fn || !(fn instanceof CalcEngine_1.Functions.Function)) {
        throw new Error(getSR().Exp_InvalidCustomFunction);
    }
    fn.name = toUpperCase(fn.name);
    this._functions[fn.name] = fn;
};


workbookPrototype.getCustomFunction = function (name) {
    return name ? this._functions[toUpperCase(name)] : keyword_undefined;
};


workbookPrototype.removeCustomFunction = function (name) {
    if (name) {
        delete this._functions[toUpperCase(name)];
        this._recalcAll();
    }
};


workbookPrototype.clearCustomFunctions = function () {
    this._functions = {};
};


workbookPrototype.addCustomName = function (name, formula, baseRow, baseCol, comment, ignoreError = false) {
    this._addCustomNameCore(this._nameInfos, name, formula, baseRow, baseCol, ignoreError, comment);
};
workbookPrototype._isUniqueCustomName = function (name) {
    return !this._nameInfos[toUpperCase(name)];
};
workbookPrototype.isValidCustomName = function (name) {
    return name && Core_1._util._isValidCustomName(name) && this._isUniqueCustomName(name);
};
workbookPrototype._addCustomNameCore = function (nameInfos, name, formula, baseRow, baseCol, ignoreError, comment) {
    var self = this;
    if (!name || !formula || (!ignoreError && !self.isValidCustomName(name))) {
        throw new Error(getSR().Exp_InvalidCustomName);
    }
    if (self._calcService) {
        var sheet = Core_1._getActiveSheet(this);
        var source = sheet ? sheet._getSheetSource() : keyword_null;
        var expr = void 0;
        if (ignoreError) {
            try {
                expr = self._calcService.parse(source, formula, baseRow, baseCol, false , false , true );
            }
            catch (ex) {

            }
        }
        else {
            expr = self._calcService.parse(source, formula, baseRow, baseCol);
        }
        nameInfos[toUpperCase(name)] = new calc_spreadjs_1.NameInfo(name, expr, baseRow, baseCol, comment);
        if (!ignoreError) {
            var names = {};
            names[name] = name;
            this._updateCalc(names, true);
        }
    }
};


workbookPrototype.getCustomName = function (name) {
    return name ? this._nameInfos[toUpperCase(name)] : keyword_undefined;
};
workbookPrototype._getFormatStringCustomName = function (name) {
    return name ? this._formatStringCustomNameInfos[toUpperCase(name)] : keyword_undefined;
};


workbookPrototype.getCustomNames = function () {
    var result = [];
    Core_1.GC$.each(this._nameInfos, function (p, v) {
        result.push(v);
    });
    return result;
};
workbookPrototype._getFormatStringCustomNames = function () {
    var result = [];
    Core_1.GC$.each(this._formatStringCustomNameInfos, function (p, v) {
        result.push(v);
    });
    return result;
};


workbookPrototype.removeCustomName = function (name) {
    if (name) {
        delete this._nameInfos[toUpperCase(name)];
        var names = {};
        names[name] = name;
        this._updateCalc(names, false);
    }
};
workbookPrototype._removeFormatStringCustomName = function (name) {
    if (name) {
        delete this._formatStringCustomNameInfos[toUpperCase(name)];
        var names = {};
        names[name] = name;
        this._updateCalc(names, false);
    }
};


workbookPrototype.clearCustomNames = function () {
    var names = this._nameInfos;
    this._nameInfos = {};
    this._updateCalc(names, false);
};
workbookPrototype._clearFormatStringCustomNames = function () {
    var names = this._formatStringCustomNameInfos;
    this._formatStringCustomNameInfos = {};
    this._updateCalc(names, false);
};
workbookPrototype._updateCalc = function (names, start) {
    if (!names) {
        return;
    }
    var calcModel = this._spreadSourceModel;
    for (var name_1 in names) {
        if (calcModel) {
            calcModel.updateNameCalc(name_1, start);
        }
    }
    this._recalcAll();
};
workbookPrototype._recalcAll = function () {
    if (this._calcService && !this._calcService.IsSuspended()) {
        var sheet = this.getActiveSheet();
        if (sheet) {
            sheet.suspendPaint();
            this._calcService.recalculateAll();
            sheet.resumePaint();
        }
    }
};

workbookPrototype.getCalcService = function () {
    return this._calcService;
};
workbookPrototype._getCalcServiceInternal = function () {
    return this._calcService;
};


workbookPrototype.suspendCalcService = function (ignoreDirty) {
    if (this._calcService) {
        this._calcService.suspend(ignoreDirty);
    }
};


workbookPrototype.resumeCalcService = function (recalcAll) {
    if (this._calcService) {
        this._calcService.resume(recalcAll);
    }
};


workbookPrototype.getCircularReference = function () {
    var map = this._buildDependentsToMap();


    map = this._deleteNoneCircularCell(map);
    var result = [];
    for (var key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key)) {
            var k = key.split('\\');
            result.push({
                row: +k[1],
                col: +k[2],
                rowCount: 1,
                colCount: 1,
                sheetName: k[0]
            });
        }
    }
    return result;
};
workbookPrototype._buildDependentsToMap = function () {
    var map = {};
    this.sheets.forEach(function (sheet) {
        var calcModel = sheet._getCalcModel();
        var rowCount = sheet.getRowCount(), columnCount = sheet.getColumnCount(), sheetName = sheet.name();
        if (calcModel) {
            for (var i = 0; i < rowCount; i++) {
                for (var j = 0; j < columnCount; j++) {
                    var key = sheetName + '\\' + i + '\\' + j;
                    var dependents = sheet._getCalcListeners(i, j);
                    if (!map[key] && dependents.length > 0) {
                        map[key] = { from: [], to: [] };
                    }
                    for (var t = 0; t < dependents.length; t++) {
                        var dependent = dependents[t];
                        var k = dependent.sheetName + '\\' + dependent.row + '\\' + dependent.col;
                        if (!map[k]) {
                            map[k] = { from: [], to: [] };
                        }
                        map[k].from.push(key);
                        map[key].to.push(k);
                    }
                }
            }
        }
    });
    return map;
};
workbookPrototype._deleteNoneCircularCell = function (map) {
    function removeElement(arr, val) {
        arr.splice(arr.indexOf(val), 1);
    }
    var haveDeleted = true;
    while (Object.keys(map).length > 0 && haveDeleted) {
        haveDeleted = false;
        var _loop_1 = function (key) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var element = map[key];
                if (element.from.length === 0) {
                    element.to.forEach(function (k) {
                        removeElement(map[k].from, key);
                    });
                    delete map[key];
                    haveDeleted = true;
                }
                else if (element.to.length === 0) {
                    element.from.forEach(function (k) {
                        removeElement(map[k].to, key);
                    });
                    delete map[key];
                    haveDeleted = true;
                }
            }
        };
        for (var key in map) {
            _loop_1(key);
        }
    }
    return map;
};


Core_1.Workbook._registerFeature('calc', {
    priority: 1000,
    init: function () {
        this._functions = {};
        this._nameInfos = {};
        this._formatStringCustomNameInfos = {};
    },
    toJson: function (data) {
        var self = this;

        var functions = self._functions;
        if (!Core_1.GC$.isEmptyObject(functions)) {
            data.customFunctions = functions;
        }

        var names = [], formatStringNames = [], sheetNames = self.getCustomNames(), formatStringCustomNames = self._getFormatStringCustomNames(), calcService = self._calcService;
        var sheet = this.getActiveSheet();

        var source = sheet ? sheet._getSheetSource() : keyword_null;
        if (sheetNames && calcService) {
            Core_1.GC$.each(sheetNames, function (i, ni) {
                var name = ni.getName(), row = ni.getRow(), col = ni.getColumn(), expr = ni.getExpression(), comment = ni.getComment();
                if (expr) {
                    var f = calcService.unparse(source, expr, row, col, false, true);
                    var nameProperty = { name: name, formula: f, row: row, col: col };
                    if (comment) {
                        nameProperty.comment = comment;
                    }
                    names.push(nameProperty);
                }
            });
            Core_1.GC$.each(formatStringCustomNames, function (i, ni) {
                var name = ni.getName(), row = ni.getRow(), col = ni.getColumn(), expr = ni.getExpression(), comment = ni.getComment();
                if (expr) {
                    var f = calcService.unparse(source, expr, row, col, false, true);
                    var nameProperty = { name: name, formula: f, row: row, col: col };
                    if (comment) {
                        nameProperty.comment = comment;
                    }
                    formatStringNames.push(nameProperty);
                }
            });
            if (names.length > 0) {
                data.names = names;
            }
            if (formatStringNames.length > 0) {
                data.formatStringNames = formatStringNames;
            }
        }
    },
    fromJson: function (workbookData, noSchema, deserializationOptions) {
        var self = this;
        var calcService = self._calcService;
        if (calcService) {
            calcService.suspend();
        }

        self.clearCustomNames();
        var names = workbookData.names;
        if (names) {
            for (var n = 0; n < names.length; n++) {
                var ni = names[n];
                self._addCustomNameCore(this._nameInfos, ni.name, ni.formula, ni.row, ni.col, true, ni.comment);
            }
        }

        self._clearFormatStringCustomNames();
        var formatStringNames = workbookData.formatStringNames;
        if (formatStringNames) {
            for (var n = 0; n < formatStringNames.length; n++) {
                var ni = formatStringNames[n];
                self._addCustomNameCore(this._formatStringCustomNameInfos, ni.name, ni.formula, ni.row, ni.col, true, ni.comment);
            }
        }

        self.clearCustomFunctions();
        var customFunctions = workbookData.customFunctions;
        if (customFunctions) {
            for (var func in customFunctions) {
                if (customFunctions.hasOwnProperty(func)) {
                    var funcJsonData = customFunctions[func];
                    var customFunctionClass = Core.getTypeFromString(funcJsonData.typeName);
                    if (customFunctionClass) {
                        var customFunc = new customFunctionClass();
                        customFunc.fromJSON(funcJsonData, noSchema);
                        self._addCustomFunctionCore(customFunc);
                    }
                }
            }
        }

        var i, sheet, sheetsData = workbookData.sheets, sheets = [], count;
        if (sheetsData) {
            i = 0;
            for (var sh in sheetsData) {
                if (typeof (sh) === 'string') {
                    var sheetObj = sheetsData[sh];
                    sheet = self.getSheetFromName(sheetObj.name || sh);
                    sheets.push(sheet);
                    sheet.nameFunctionsFromJSON(sheetObj, noSchema, deserializationOptions);
                    i++;
                }
            }
            count = sheets.length;
            for (i = 0; i < count; i++) {
                sheet = sheets[i];
                sheet._getSheetSource()._isFromJSON = true;
                sheet.formulaFromJSON(sheetsData[sheet.name()], noSchema, deserializationOptions);
            }
        }
        var noRecalcFlag = workbookData.noRecalc || (deserializationOptions && deserializationOptions.doNotRecalculateAfterLoad);
        if (calcService) {
            if (noRecalcFlag) {
                calcService.resumeWithoutCalc();
            }
            else {
                calcService.resume(true);
            }
        }
        for (var _i = 0, sheets_1 = sheets; _i < sheets_1.length; _i++) {
            sheet = sheets_1[_i];
            var sheetSource = sheet._getSheetSource();

            sheetSource._clearDynamicArrayState();
            delete sheetSource._isFromJSON;
        }
    },
    _fromJSONAsync: function (workbookData, noSchema, deserializationOptions) {
        var self = this;
        var calcService = self._calcService;
        if (calcService) {
            calcService.suspend();
        }

        self.clearCustomNames();
        var names = workbookData.names;
        if (names) {
            for (var n = 0; n < names.length; n++) {
                var ni = names[n];
                self._addCustomNameCore(this._nameInfos, ni.name, ni.formula, ni.row, ni.col, true, ni.comment);
            }
        }

        self.clearCustomFunctions();
        var customFunctions = workbookData.customFunctions;
        if (customFunctions) {
            for (var func in customFunctions) {
                if (customFunctions.hasOwnProperty(func)) {
                    var funcJsonData = customFunctions[func];
                    var customFunctionClass = Core.getTypeFromString(funcJsonData.typeName);
                    if (customFunctionClass) {
                        var customFunc = new customFunctionClass();
                        customFunc.fromJSON(funcJsonData, noSchema);
                        self._addCustomFunctionCore(customFunc);
                    }
                }
            }
        }

        var i, sheet, sheetsData = workbookData.sheets, sheets = [], count;
        if (sheetsData) {
            i = 0;
            for (var sh in sheetsData) {
                if (typeof (sh) === 'string') {
                    var sheetObj = sheetsData[sh];
                    sheet = self.getSheetFromName(sheetObj.name || sh);
                    sheets.push(sheet);
                    sheet.nameFunctionsFromJSON(sheetObj, noSchema, deserializationOptions);
                    i++;
                }
            }
            count = sheets.length;
            for (i = 0; i < count; i++) {
                sheet = sheets[i];
                sheet._getSheetSource()._isFromJSON = true;
                sheet.formulaFromJSON(sheetsData[sheet.name()], noSchema, deserializationOptions);
            }
        }

        deserializationOptions.incrementLoadTask.addTask(function (_calcService, _workbookData, _deserializationOptions) {
            if (calcService) {
                if (workbookData.noRecalc || (deserializationOptions && deserializationOptions.doNotRecalculateAfterLoad)) {
                    calcService.resumeWithoutCalc();
                }
                else {
                    calcService.resume(true);
                    self.getActiveSheet()._invalidate();
                }
            }
            for (var _i = 0, sheets_2 = sheets; _i < sheets_2.length; _i++) {
                sheet = sheets_2[_i];
                var sheetSource = sheet._getSheetSource();

                sheetSource._clearDynamicArrayState();
                delete sheetSource._isFromJSON;
            }
        }, [calcService, workbookData, deserializationOptions]);
    }
});
/***/ }),

/***/ './dist/plugins/sheetsCalc/worksheet-formula.js':
/*!******************************************************!*\
  !*** ./dist/plugins/sheetsCalc/worksheet-formula.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Core = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var calc_spreadjs_1 = __webpack_require__(/*! ./calc-spreadjs */ './dist/plugins/sheetsCalc/calc-spreadjs.js');
var formulaOperatorAdjustor_1 = __webpack_require__(/*! ./formulaOperatorAdjustor */ './dist/plugins/sheetsCalc/formulaOperatorAdjustor.js');

var keyword_null = null, keyword_undefined = void 0;
var $_each = Core_1.GC$.each;
var toUpperCase = Common_1.Common._StringHelper._toUpperCase;
var rm = new Common_1.Common.ResourceManager(Core_1.SR);
var getSR = rm.getResource.bind(rm);
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var convertToInt = parseInt;
function getStartColumnRelative(obj) {
    return obj.columnRelative;
}
function getEndColumnRelative(obj) {
    return obj.endColumnRelative;
}
function getStartRowRelative(obj) {
    return obj.rowRelative;
}
function getEndRowRelative(obj) {
    return obj.endRowRelative;
}
function getCalcService(obj) {
    return obj._getCalcServiceInternal();
}
function getStartColumn(obj) {
    return obj.column;
}
function init() {
    var self = this;
    if (self._calcReseted) {
        self._calcReseted = false;
        return;
    }
    self._functions = {};
    self._nameInfos = {};
    if (self._chCalcSheetModel) {
        self._chCalcSheetModel.clearAll();
    }
    else {
        self._chSheetSource = new calc_spreadjs_1.SheetSource(self, Core_1.SheetArea.colHeader);
    }
    if (self._rhCalcSheetModel) {
        self._rhCalcSheetModel.clearAll();
    }
    else {
        self._rhSheetSource = new calc_spreadjs_1.SheetSource(self, Core_1.SheetArea.rowHeader);
    }
    if (self._vpCalcSheetModel) {
        self._vpCalcSheetModel.clearAll();
    }
    else {
        self._vpSheetSource = new calc_spreadjs_1.SheetSource(self, Core_1.SheetArea.viewport);
    }
}
function _hasArrayFormulaImp(sheet , row, column, rowCount, columnCount, sheetArea) {
    var result = sheet._getsArrayFormulas(row, column, rowCount, columnCount, sheetArea), formulas = result && result.formulas;
    return formulas && formulas.length > 0;
}
function _hasArrayFormula(sheet , row, column, rowCount, columnCount, checkRowHeader, checkColumnHeader) {
    var f = _hasArrayFormulaImp(sheet, row, column, rowCount, columnCount, 3);
    if (!f && checkRowHeader) {
        columnCount = sheet.getColumnCount(2);
        f = _hasArrayFormulaImp(sheet, row, 0, rowCount, columnCount, 2);
    }
    if (!f && checkColumnHeader) {
        rowCount = sheet.getRowCount(1);
        f = _hasArrayFormulaImp(sheet, 0, column, rowCount, columnCount, 1);
    }
    return f;
}
function removeDuplicatesItem(cellsInfos) {
    var strArray = [], resultArray = [];
    for (var i = 0; i < cellsInfos.length; i++) {
        var cellInfo = cellsInfos[i];
        var cellInfoStr = '' + cellInfo.row + cellInfo.col + cellInfo.rowCount + cellInfo.colCount + cellInfo.sheetName;
        if (strArray.indexOf(cellInfoStr) < 0) {
            strArray.push(cellInfoStr);
            resultArray.push(cellInfo);
        }
    }
    return resultArray;
}
function getLoadingProgress(status, noCalcAfterLoad) {
    var formulaLoad = status.formulaLoad / status.total;


    return noCalcAfterLoad ? (formulaLoad * 0.4 + 0.5) : (formulaLoad * 0.3 + 0.4);
}
function _setFormula(node, r, c, sheet, isIncrementalLoading, sheetArea) {
    var sheetSource = sheet._getSheetSource();
    var formula = node && node.formula;
    if (formula) {
        formula = formula.replace(/ANCHORARRAY\(([A-Z]+[0-9]+)\)/gi, '$1#')
            .replace(/SINGLE\((.*)\)/gi, '@$1')
            .replace(/ANCHORARRAY\((#[A-Z]+[\?!])\)/gi, '$1#');
        var arrayInfo = node.arrayInfo;
        if (arrayInfo && !arrayInfo.isDynamicArray) {
            sheet._setArrayFormulaCore(r, c, convertToInt(arrayInfo.rowCount, 10), convertToInt(arrayInfo.colCount, 10), formula, true, sheetArea);
        }
        else {
            if (arrayInfo) {
                if (arrayInfo.isInvalid) {
                    sheetSource._setInvalidState(r, c);
                }

                sheetSource._getDynamicArrayManager().setArray(sheetSource, arrayInfo.row, arrayInfo.col, arrayInfo.rowCount, arrayInfo.colCount, [], true);
            }
            sheet._setFormulaCore(r, c, formula, keyword_null, true, sheetArea, true, !arrayInfo );
        }
    }
}
function loadCellFormulasAsync(sheet, data, rowCount, colCount, options, rowIndex, sheetArea) {
    var task = options && options.incrementLoadTask;
    if (!task || task.isTerminated) {
        return;
    }
    var isBusy = task.isBusyFunc;
    rowIndex = rowIndex || 0;
    var r = rowIndex;
    sheet.suspendPaint();
    var maxTimeSpan = 30;
    var startLoading = new Date();
    while (r < rowCount) {
        var dr = data[r];
        if (dr) {
            for (var c = 0; c < colCount; c++) {
                _setFormula(dr[c], r, c, sheet, true, sheetArea);
            }
        }
        r++;

        if (isBusy && isBusy()) {
            break;
        }
        var endLoading = new Date();
        if (endLoading - startLoading > maxTimeSpan) {
            break;
        }
    }
    sheet.resumePaint();
    if (!options) {
        options = {};
    }
    var incrementalLoading = options && options.incrementalLoading;
    if (incrementalLoading && incrementalLoading.loading) {
        incrementalLoading.loadStatus.formulaLoad += r - rowIndex;
        var progress = getLoadingProgress(incrementalLoading.loadStatus, options.doNotRecalculateAfterLoad);
        incrementalLoading.loading(progress, { sheet: sheet });
    }
    if (r < rowCount) {
        options.incrementLoadTask.pushTask(loadCellFormulasAsync, [sheet, data, rowCount, colCount, options, r]);
    }
}
function loadCellFormulas(sheet, data, rowCount, colCount, sheetArea) {
    for (var r = 0; r < rowCount; r++) {
        var dr = data[r];
        if (!dr) {
            continue;
        }
        for (var c = 0; c < colCount; c++) {
            _setFormula(dr[c], r, c, sheet, true, sheetArea);
        }
    }
}
function afterLoadingFormulas(sheet, sheetSettings, noSchema, deserializationOptions) {
    var Worksheet_features = Core_1.Worksheet._features;

    if (Worksheet_features) {
        $_each(Worksheet_features, function (n, f) {
            var temp = f.fromJsonAfterFormula;
            if (temp) {
                temp.call(sheet, sheetSettings, noSchema, deserializationOptions);
            }
        });
    }
}
var worksheetPrototype = Core_1.Worksheet.prototype;

worksheetPrototype.resetCalc = function () {
    init.call(this);
    this._calcReseted = true;
};


worksheetPrototype.recalcAll = function (refreshAll) {
    var calcService = getCalcService(this);
    if (calcService) {
        this.suspendPaint();
        calcService.suspend(true);
        if (refreshAll) {
            var parent_1 = this.parent, sheets = void 0;
            sheets = parent_1 && parent_1.sheets || [this];
            for (var sheetIndex = 0; sheetIndex < sheets.length; sheetIndex++) {
                var sheet = sheets[sheetIndex];
                var names = sheet._nameInfos, calcSource = sheet._getSheetSource();
                if (names) {
                    for (var n in names) {
                        var ni = names[n];
                        var expr = ni._expr;
                        var formula = calcService.unparse(calcSource, expr, 0, 0);
                        ni._expr = calcService.parse(calcSource, formula, 0, 0);
                    }
                }
                var calcSourceModel = calcSource.getCalcSourceModel();
                var nodes = calcSourceModel.getAllNodes();
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    var calc = node.calc;
                    if (calc && node._expr) {
                        adjustOneFormula(calcService, calc);
                    }
                }
            }
        }
        calcService.resume(true);
        this.resumePaint();
    }
};
worksheetPrototype.recalcRange = function (row, col, rowCount, colCount) {
    var calcService = getCalcService(this);
    if (calcService) {
        calcService.recalcRange(this._getSheetSource(), row, col, rowCount, colCount);
    }
};
worksheetPrototype.recalcRows = function (rows) {
    var calcService = getCalcService(this);
    if (calcService && !calcService.ignoreDirty()) {
        calcService.suspend();
        for (var i = 0; i < rows.length; i++) {
            calcService.recalculate(this._vpSheetSource, rows[i], -1);
        }
        calcService.resume(false);
    }
};
worksheetPrototype.recalcCols = function (cols) {
    var calcService = getCalcService(this);
    if (calcService && !calcService.ignoreDirty()) {
        calcService.suspend();
        for (var i = 0; i < cols.length; i++) {
            calcService.recalculate(this._vpSheetSource, -1, cols[i]);
        }
        calcService.resume(false);
    }
};
worksheetPrototype._recalcCell = function (row, col, sheetArea) {
    var calcService = getCalcService(this);
    if (calcService && !calcService.ignoreDirty()) {
        var sheetSource = this._vpSheetSource;
        if (sheetArea === 1) {
            sheetSource = this._chSheetSource;
        }
        else if (sheetArea === 2) {
            sheetSource = this._rhSheetSource;
        }
        calcService.recalculate(sheetSource, row, col);
    }
};

worksheetPrototype.getCalcService = function () {
    if (!this._calcService) {
        this._calcService = new CalcEngine_1.CalcService();
        this._getSheetSource(Core_1.SheetArea.colHeader).setCalcService(this._calcService);
        this._getSheetSource(Core_1.SheetArea.rowHeader).setCalcService(this._calcService);
        this._getSheetSource().setCalcService(this._calcService);
        this._calcService.initParserContext(this._getSheetSource());
    }
    return this._calcService;
};
worksheetPrototype._getCalcServiceInternal = function () {
    return this.getCalcService();
};


worksheetPrototype.suspendCalcService = function (ignoreDirty) {
    var service = getCalcService(this);
    if (service) {
        service.suspend(ignoreDirty);
    }
};


worksheetPrototype.resumeCalcService = function (recalcAll) {
    var service = getCalcService(this);
    if (service) {
        service.resume(recalcAll);
    }
};
worksheetPrototype._getSheetSource = function (sheetArea) {
    if (isNullOrUndefined(sheetArea) || sheetArea === 3 ) {
        return this._vpSheetSource;
    }
    else if (sheetArea === 1) {
        return this._chSheetSource;
    }
    else if (sheetArea === 2) {
        return this._rhSheetSource;
    }

    return keyword_null;
};
worksheetPrototype._getCalcModel = function (sheetArea) {
    var self = this;
    if (sheetArea === 1) {
        if (!self._chCalcSheetModel && self._chSheetSource) {
            self._chCalcSheetModel = self._getCalcServiceInternal().getSourceModel(self._chSheetSource);
        }
        return self._chCalcSheetModel;
    }
    else if (sheetArea === 2) {
        if (!self._rhCalcSheetModel && self._rhSheetSource) {
            self._rhCalcSheetModel = self._getCalcServiceInternal().getSourceModel(self._rhSheetSource);
        }
        return self._rhCalcSheetModel;
    }
    if (!self._vpCalcSheetModel && self._vpSheetSource) {
        self._vpCalcSheetModel = self._getCalcServiceInternal().getSourceModel(self._vpSheetSource);
    }
    return self._vpCalcSheetModel;
};
worksheetPrototype._hasPartArrayFormulasImp = function (row, column, rowCount, columnCount, sheetArea) {
    var calcModel = this._getCalcModel(sheetArea);
    return calcModel && calcModel._getFormulaExps(row, column, rowCount, columnCount, true, true);
};
worksheetPrototype._hasPartArrayFormulas = function (row, column, rowCount, columnCount, checkRowHeader, checkColumnHeader) {
    var f = this._hasPartArrayFormulasImp(row, column, rowCount, columnCount, 3);
    if (!f && checkRowHeader) {
        columnCount = this.getColumnCount(2);
        f = this._hasPartArrayFormulasImp(row, 0, rowCount, columnCount, 2);
    }
    if (!f && checkColumnHeader) {
        rowCount = this.getRowCount(1);
        f = this._hasPartArrayFormulasImp(0, column, rowCount, columnCount, 1);
    }
    return f;
};
worksheetPrototype._getsArrayFormulas = function (row, column, rowCount, columnCount, sheetArea) {
    var calcModel = this._getCalcModel(sheetArea);
    return calcModel && calcModel._getFormulaExps(row, column, rowCount, columnCount, false, true);
};
worksheetPrototype._checkArrayFormula = function (row, column, rowCount, columnCount, onlyCheckIntersected, checkRowHeader, checkColumnHeader) {
    if (onlyCheckIntersected === void 0) { onlyCheckIntersected = true; }
    var isIntersected = onlyCheckIntersected && this._hasPartArrayFormulas(row, column, rowCount, columnCount, checkRowHeader, checkColumnHeader);
    var hasArrayFormula = !onlyCheckIntersected && _hasArrayFormula(this, row, column, rowCount, columnCount, checkRowHeader, checkColumnHeader);
    if (isIntersected || hasArrayFormula) {
        this._raiseInvalidOperation(4 , getSR().Exp_ChangePartOfArray);
        return false;
    }
    return true;
};


worksheetPrototype.addCustomFunction = function (fn) {
    this._addCustomFunctionCore(fn);
    this.recalcAll();
};
worksheetPrototype._addCustomFunctionCore = function (fn) {
    if (!fn || !(fn instanceof CalcEngine_1.Functions.Function)) {
        throw new Error(getSR().Exp_InvalidCustomFunction);
    }
    fn.name = toUpperCase(fn.name);
    this._functions[fn.name] = fn;
};


worksheetPrototype.getCustomFunction = function (fnName) {
    return fnName ? this._functions[toUpperCase(fnName)] : keyword_null;
};


worksheetPrototype.removeCustomFunction = function (fnName) {
    if (fnName) {
        delete this._functions[toUpperCase(fnName)];
        this.recalcAll();
    }
};


worksheetPrototype.clearCustomFunctions = function () {
    this._functions = {};
    this.recalcAll();
};
worksheetPrototype._findCustomFunction = function (name) {
    if (!name) {
        return keyword_null;
    }
    var self = this, parent = self.parent;
    var fn = self.getCustomFunction(name);
    if (!fn && parent && parent.getCustomFunction) {
        fn = parent.getCustomFunction(name);
    }
    return fn;
};


worksheetPrototype.addCustomName = function (name, formula, baseRow, baseCol, comment, ignoreError = false) {
    this._addCustomNameCore(name, formula, baseRow, baseCol, ignoreError, comment);
};


worksheetPrototype.getCustomName = function (fnName) {
    return fnName ? this._nameInfos[toUpperCase(fnName)] : keyword_undefined;
};


worksheetPrototype.getCustomNames = function () {
    var result = [];
    $_each(this._nameInfos, function (p, v) {
        result.push(v);
    });
    return result;
};


worksheetPrototype.removeCustomName = function (fnName) {
    if (fnName) {
        var upperCaseName = toUpperCase(fnName);
        delete this._nameInfos[upperCaseName];
        var names = {};
        names[upperCaseName] = upperCaseName;
        this._updateCalc(names, false);
    }
};


worksheetPrototype.clearCustomNames = function () {
    var self = this;
    var names = self._nameInfos;
    self._nameInfos = {};
    this._updateCalc(names, false);
};
worksheetPrototype.createNameInfo = function (name, formula, comment, baseRow, baseCol) {
    var self = this;
    var calcService = getCalcService(self);
    var sheetSource = self._getSheetSource();
    if (calcService && sheetSource) {
        var expr = calcService.parse(sheetSource, formula, baseRow, baseCol);
        return new calc_spreadjs_1.NameInfo(name, expr, baseRow, baseCol, comment);
    }
    return keyword_null;
};
worksheetPrototype._isUniqueCustomName = function (name) {
    var self = this;
    var isValid = !self._nameInfos[toUpperCase(name)];
    if (isValid) {
        var tableManager = self.tables;
        if (tableManager) {
            isValid = !tableManager.findByName(name);
        }
    }
    return isValid;
};
worksheetPrototype.isValidCustomName = function (name) {
    return name && Core_1._util._isValidCustomName(name) && this._isUniqueCustomName(name);
};
worksheetPrototype._addCustomNameCore = function (name, formula, baseRow, baseCol, ignoreError, comment) {
    var self = this;
    if (!name || !formula || (!ignoreError && !self.isValidCustomName(name))) {
        throw new Error(getSR().Exp_InvalidCustomName);
    }
    var calcService = getCalcService(self);
    var sheetSource = self._getSheetSource();
    if (calcService && sheetSource) {
        var expr = void 0;
        if (ignoreError) {
            try {
                expr = calcService.parse(sheetSource, formula, baseRow, baseCol, false , false , true );
            }
            catch (ex) {

            }
        }
        else {
            expr = calcService.parse(sheetSource, formula, baseRow, baseCol);
        }
        self._nameInfos[toUpperCase(name)] = new calc_spreadjs_1.NameInfo(name, expr, baseRow, baseCol, comment);
        if (!ignoreError) {
            var names = {};
            names[name] = name;
            this._updateCalc(names, true);
        }
    }
};
worksheetPrototype._updateCalc = function (names, start) {
    var calcModel = this._getCalcModel();
    if (calcModel) {
        for (var name_1 in names) {
            calcModel.updateNameCalc(name_1, start);
        }
        this.recalcAll();
    }
};
worksheetPrototype._findCustomName = function (name) {
    if (!name) {
        return keyword_null;
    }
    var self = this, parent = self.parent;
    var cn = self.getCustomName(name);
    if (!cn && parent && parent.getCustomName) {
        cn = parent.getCustomName(name);
    }
    return cn;
};


worksheetPrototype.setFormula = function (row, col, value, sheetArea) {
    this._setFormulaCore(row, col, value, keyword_null, false, sheetArea);
};
worksheetPrototype._setFormulaCore = function (row, col, formula, expr, ignoreError, sheetArea, ignoreEvent, ensureSingle, incrementLoad) {
    var self = this;
    if (isNullOrUndefined(sheetArea)) {
        sheetArea = 3 ;
    }

    if (row < 0 || row >= self.getRowCount(sheetArea) || col < 0 || col >= self.getColumnCount(sheetArea)) {
        self._raiseInvalidOperation(0 , getSR().Exp_IndexOutOfRange);
        return;
    }
    var fixedRow = row >= 0 ? row : 0;
    var fixedCol = col >= 0 ? col : 0;
    var sheetSource = self._getSheetSource(sheetArea);

    expr = expr || (formula && self._calcService ? self._calcService.parse(sheetSource, formula, fixedRow, fixedCol, false, ignoreError, ignoreError ) : keyword_null);
    if (expr && ensureSingle) {
        expr.ensureSingle = true;
    }

    var tableManager = self.tables;
    if (sheetArea === 3 && row >= 0 && col >= 0 && tableManager) {
        var valid = tableManager._updataFooterFormulaWhenSetSheetFormula(row, col, 1, 1, formula, expr);
        if (!valid) {
            return;
        }
    }
    var calcModel = self._getCalcModel(sheetArea), conditionalFormats = self.conditionalFormats;
    if (calcModel) {
        var oldValue = calcModel.getFormula(row, col);
        var modelManager = self._modelManager;
        calcModel.setFormula(row, col, formula, expr, ignoreError, keyword_undefined, modelManager._getChangesForCalcEngine(), incrementLoad);
        if (conditionalFormats) {
            conditionalFormats._clearCache();
        }
        if (!ignoreEvent) {
            self._raiseCellChanged('formula', row, col, sheetArea, oldValue, formula);
        }
        else {
            self._clearCameraShapeCache(self, [{ row: row, col: col }], 0 );
        }
    }
    self._updateTableSlicer && self._updateTableSlicer(row, col, 1, 1, sheetArea);
    self._invalidate();
};


worksheetPrototype.setArrayFormula = function (row, col, rowCount, colCount, value, sheetArea) {
    this._setArrayFormulaCore(row, col, rowCount, colCount, value, false, sheetArea);
};
worksheetPrototype._setArrayFormulaCore = function (row, col, rowCount, colCount, value, ignoreError, sheetArea, incrementLoad) {
    if (sheetArea === void 0) { sheetArea = 3; }
    var self = this;

    if (row < 0 || row + rowCount > self.getRowCount() || col < 0 || col + colCount > self.getColumnCount()) {
        self._raiseInvalidOperation(0 , getSR().Exp_IndexOutOfRange);
        return;
    }
    if (self._modelManager._hasSpans(row, col, rowCount, colCount)) {
        self._raiseInvalidOperation(0 , getSR().Exp_ArrayFormulaSpan);
        return;
    }

    var tableManager = self.tables;
    if (sheetArea === 3 && row >= 0 && col >= 0 && tableManager) {
        var valid = tableManager._updataFooterFormulaWhenSetSheetFormula(row, col, rowCount, colCount, value);
        if (!valid) {
            return;
        }
    }
    var calcModel = self._getCalcModel(sheetArea), conditionalFormats = self.conditionalFormats;
    if (calcModel) {
        self.suspendEvent();
        calcModel.setArrayFormula(row, col, rowCount, colCount, value, ignoreError, self._modelManager._getChangesForCalcEngine(), incrementLoad);
        self.resumeEvent();
        if (conditionalFormats) {
            conditionalFormats._clearCache();
        }
        if (self._eventSuspended < 1) {
            var changedCells = [];
            for (var r = row; r < row + rowCount; r++) {
                for (var c = col; c < col + colCount; c++) {
                    changedCells.push({ row: r, col: c });
                }
            }
            self._raiseRangeDataChanged(row, col, rowCount, colCount, changedCells, 5 , sheetArea, value);
        }
    }
    self._invalidate();
};


worksheetPrototype.getFormula = function (row, col, sheetArea, culture) {
    var calcModel = this._getCalcModel(sheetArea);
    if (calcModel) {
        return calcModel.getFormula(row, col, culture);
    }
    return keyword_null;
};
worksheetPrototype._getExpression = function (row, col, sheetArea) {
    var calcModel = this._getCalcModel(sheetArea);
    if (calcModel) {
        return calcModel._getExpr(row, col);
    }
    return keyword_null;
};


worksheetPrototype.getFormulaInformation = function (row, col) {
    var info = {};
    var calcModule = this._getCalcModel();
    if (calcModule) {
        var expr = calcModule._getExpr(row, col);
        if (expr) {
            var arrayInfo = calcModule._getArrayInfo(row, col);
            info.hasFormula = true;
            if (arrayInfo && !arrayInfo.isDynamicArray) {
                info.baseRange = new Core_1.Range(arrayInfo.row, arrayInfo.col, arrayInfo.rowCount, arrayInfo.colCount);
            }
            info.isArrayFormula = arrayInfo && !arrayInfo.isDynamicArray;
            row = arrayInfo ? arrayInfo.row : row;
            col = arrayInfo ? arrayInfo.col : col;
            info.formula = this._calcService.unparse(this._vpSheetSource, expr, row, col);
            info.formulaWithCulture = this._calcService.unparse(this._vpSheetSource, expr, row, col, true);
            info.hasFormula = !!info.formula;
        }
        else {
            var anchor = this._modelManager.getDynamicArrayInfo(row, col);
            if (anchor && anchor.isValid) {
                var baseRow = anchor.row, baseCol = anchor.col;
                if (row !== baseRow || col !== baseCol) {
                    expr = calcModule._getExpr(baseRow, baseCol);
                    info.formulaWithCulture = this._calcService.unparse(this._vpSheetSource, expr, baseRow, baseCol, true);
                    info.hasFormula = true;
                    info.isDynamicArray = true;
                }
            }
        }
    }
    return info;
};
worksheetPrototype._isCircularReference = function (targetRow, targetCol, currentSheet, currentRow, currentCol, searchedList) {
    if (!currentSheet) {
        currentSheet = this;
        currentRow = targetRow;
        currentCol = targetCol;
        searchedList = [];
    }


    var precedents = currentSheet._getCalcListeners(currentRow, currentCol), sheetName = this.name();
    for (var t = 0; t < precedents.length; t++) {
        var precedent = precedents[t];
        var key = precedent.sheetName + '_' + precedent.row + '_' + precedent.col + '_' + precedent.rowCount + '_' + precedent.colCount;
        if (searchedList[key]) {
            return false;
        }
        else {
            searchedList[key] = true;
        }
        if ((precedent.row <= targetRow && targetRow < precedent.row + precedent.rowCount || precedent.rowCount === -1)
            && (precedent.col <= targetCol && targetCol < precedent.col + precedent.colCount || precedent.colCount === -1) && sheetName === precedent.sheetName) {
            return true;
        }
        var sheet = precedent.sheetName === sheetName ? currentSheet : currentSheet.parent.getSheetFromName(precedent.sheetName);
        var rowCount = precedent.rowCount, row = precedent.row, colCount = precedent.colCount, col = precedent.col;
        if (rowCount === -1) {
            rowCount = sheet.getRowCount();
            row = 0;
        }
        if (colCount === -1) {
            colCount = sheet.getColumnCount();
            col = 0;
        }
        for (var i = row; i < rowCount + row; i++) {
            for (var j = col; j < colCount + col; j++) {
                if (this._isCircularReference(targetRow, targetCol, sheet, row, col, searchedList)) {
                    return true;
                }
            }
        }
    }
    return false;
};


worksheetPrototype.getPrecedents = function (row, col) {
    var precedentsArray = [];
    var calcModel = this._getCalcModel();
    if (calcModel) {
        var expression = calcModel._getWorkingExpr(row, col) || calcModel._getExpr(row, col);
        var formulaInformation = this.getFormulaInformation(row, col);
        var baseRange = formulaInformation.baseRange;
        var baseRow = baseRange ? baseRange.row : row;
        var baseCol = baseRange ? baseRange.col : col;
        this._getExpressionInfo(expression, baseRow, baseCol, precedentsArray);
        precedentsArray = removeDuplicatesItem(precedentsArray);
    }
    return precedentsArray;
};


worksheetPrototype.getDependents = function (row, col) {
    var dependentsMap = [];
    var sheets = (this.parent && this.parent.sheets) || [this], currentSheetName = this.name();
    sheets.forEach(function (sheet) {
        var rowCount = sheet.getRowCount(), colCount = sheet.getColumnCount(), sheetName = sheet.name();
        for (var i = 0; i < rowCount; i++) {
            for (var j = 0; j < colCount; j++) {
                var precedents = sheet.getPrecedents(i, j);
                for (var t = 0; t < precedents.length; t++) {
                    var value = precedents[t];
                    if (value.sheetName === currentSheetName && (value.row === -1 || value.row <= row && row + 1 <= value.row + value.rowCount) &&
                        (value.col === -1 || value.col <= col && col + 1 <= value.col + value.colCount)) {
                        dependentsMap.push({
                            row: i,
                            col: j,
                            rowCount: 1,
                            colCount: 1,
                            sheetName: sheetName
                        });
                        break;
                    }
                }
            }
        }
    });
    return dependentsMap;
};

worksheetPrototype._getCalcListeners = function (row, col) {
    var dependentsMap = {};
    var _cellCalc = this._getCalcModel()._getCellCalc(row, col);
    var _rangeCalc = this._getCalcModel()._getRangeCalc();
    if (_cellCalc) {
        var _cellListeners = _cellCalc['0'];
        for (var item in _cellListeners) {
            if (_cellListeners.hasOwnProperty(item)) {
                var dependentCell = _cellListeners[item];
                var source = dependentCell._sourceModel._source;
                var sheetName = source ? source._sheet.name() : this.name();
                var sheetId = source ? source._sheet._id : this._id;
                dependentsMap[sheetId + ' ' + dependentCell.row + ' ' + dependentCell.column] = {
                    row: dependentCell.row,
                    col: dependentCell.column,
                    rowCount: 1,
                    colCount: 1,
                    sheetName: sheetName
                };
            }
        }
    }
    if (_rangeCalc) {
        var _rangeListeners = _rangeCalc['0'];
        for (var item in _rangeListeners) {
            if (_rangeListeners.hasOwnProperty(item)) {
                var dependentRange = _rangeListeners[item];
                if ((dependentRange.row === -1 || dependentRange.row <= row && row + 1 <= dependentRange.row + dependentRange.rowCount) &&
                    (dependentRange.col === -1 || dependentRange.col <= col && col + 1 <= dependentRange.col + dependentRange.colCount)) {
                    var content = dependentRange.content;

                    for (var key in content) {
                        var dependentCell = content[key];
                        var source = dependentCell._sourceModel._source;
                        var sheetName = source ? source._sheet.name() : this.name();
                        var sheetId = source ? source._sheet._id : this._id;
                        dependentsMap[sheetId + ' ' + dependentCell.row + ' ' + dependentCell.column] = {
                            row: dependentCell.row,
                            col: dependentCell.column,
                            rowCount: 1,
                            colCount: 1,
                            sheetName: sheetName
                        };
                    }
                }
            }
        }
    }
    return objectValues(dependentsMap);
};
function objectValues(obj) {
    var val = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            val.push(obj[key]);
        }
    }
    return val;
}
worksheetPrototype._getExpressionInfo = function (expression, baseRow, baseCol, precedentsArray) {
    if (expression) {
        var type = expression.type;
        switch (type) {
            case CalcEngine_1.ExpressionType.reference:
            case CalcEngine_1.ExpressionType.structReference:
            case CalcEngine_1.ExpressionType.spillReference:
                var range = expression.getRange(baseRow, baseCol);
                precedentsArray.push({
                    row: range.row,
                    col: range.col,
                    rowCount: range.rowCount,
                    colCount: range.colCount,
                    sheetName: expression.source && expression.source._sheet ? expression.source._sheet.name() : this.name()
                });
                break;
            case CalcEngine_1.ExpressionType.operator:
                this._getExpressionInfo(expression.value, baseRow, baseCol, precedentsArray);
                this._getExpressionInfo(expression.value2, baseRow, baseCol, precedentsArray);
                break;
            case CalcEngine_1.ExpressionType.expand:
            case CalcEngine_1.ExpressionType.parentheses:
                this._getExpressionInfo(expression.value, baseRow, baseCol, precedentsArray);
                break;
            case CalcEngine_1.ExpressionType.name:
                var actualFormula = this._findCustomName(expression.value);
                this._getExpressionInfo(actualFormula.getExpression(), baseRow, baseCol, precedentsArray);
                break;
            case CalcEngine_1.ExpressionType.function:
                var argumentsArray = expression.arguments;
                for (var index = 0; index < argumentsArray.length; index++) {
                    var refExpression = argumentsArray[index];
                    this._getExpressionInfo(refExpression, baseRow, baseCol, precedentsArray);
                }
                break;
        }
    }
};
worksheetPrototype.hasFormula = function (row, col) {
    var calcModel = this._getCalcModel();
    if (calcModel) {
        return calcModel.hasFormula(row, col);
    }
    return false;
};


worksheetPrototype._rebuildCalcNodes = function () {
    var calcModel = this._getCalcModel();
    calcModel && calcModel._foreachCellCalc(function (cellCalc) {
        cellCalc._stopListening();
        cellCalc._startListening();
    });
};
worksheetPrototype.clearFormula = function (row, column, rowCount, columnCount, conditionFn) {
    var self = this;
    if (row < 0) {
        row = 0;
        rowCount = self.getRowCount();
    }
    if (column < 0) {
        column = 0;
        columnCount = self.getColumnCount();
    }
    for (var r = 0; r < rowCount; r++) {
        if (conditionFn(self, r + row)) {
            for (var c = 0; c < columnCount; c++) {
                self.setFormula(r + row, c + column, keyword_null);
            }
        }
    }
};
worksheetPrototype.nameFunctionsFromJSON = function (sheetSettings, noSchema, deserializationOptions, callback) {
    if (!sheetSettings) {
        return;
    }
    var sheet = this;
    var customFunctions = sheetSettings.customFunctions;
    if (customFunctions) {
        for (var func in customFunctions) {
            if (customFunctions.hasOwnProperty(func)) {
                var funcJsonData = customFunctions[func];
                var customFunctionClass = Core.getTypeFromString(funcJsonData.typeName);
                if (customFunctionClass) {
                    var customFunc = new customFunctionClass();
                    customFunc.fromJSON(funcJsonData, noSchema);
                    sheet._addCustomFunctionCore(customFunc);
                }
            }
        }
    }

    var sheetSettingsNames = sheetSettings.names;
    if (sheetSettingsNames && sheetSettingsNames.length > 0) {
        for (var n = 0; n < sheetSettingsNames.length; n++) {
            var ni = sheetSettingsNames[n];
            sheet._addCustomNameCore(ni.name, ni.formula, ni.row, ni.col, true, ni.comment);
        }
        sheet._rebuildCalcNodes();
    }
    callback && callback();
};
worksheetPrototype.formulaFromJSON = function (sheetSettings, noSchema, deserializationOptions) {
    if (!sheetSettings) {
        return;
    }
    var sheet = this;
    var ignoreFormula = deserializationOptions && deserializationOptions.ignoreFormula;
    var incrementalLoading = deserializationOptions && deserializationOptions.incrementalLoading;
    [sheetSettings.colHeaderData, sheetSettings.rowHeaderData, sheetSettings.data].forEach(function (sheetSettingsData, i) {
        if (sheetSettingsData && !ignoreFormula && sheetSettingsData.dataTable) {
            var sheetArea = i + 1;

            var data = sheetSettingsData.dataTable;
            var rowCount = sheet.getRowCount(sheetArea);
            var colCount = sheet.getColumnCount(sheetArea);
            if (incrementalLoading) {
                loadCellFormulasAsync(sheet, data, rowCount, colCount, deserializationOptions, 0, sheetArea);
            }
            else {
                loadCellFormulas(sheet, data, rowCount, colCount, sheetArea);
            }
        }
    });
    if (incrementalLoading) {
        deserializationOptions.incrementLoadTask.pushTask(afterLoadingFormulas, [sheet, sheetSettings, noSchema, deserializationOptions]);
    }
    else {
        afterLoadingFormulas(sheet, sheetSettings, noSchema, deserializationOptions);
    }
};
worksheetPrototype._initCalc = function (service) {
    var self = this, oldService = self._calcService;
    if (oldService && !service) {
        return;
    }
    self._calcService = service ? service : new CalcEngine_1.CalcService();
    self._getSheetSource(Core_1.SheetArea.colHeader).setCalcService(self._calcService);
    self._getSheetSource(Core_1.SheetArea.rowHeader).setCalcService(self._calcService);
    self._getSheetSource(Core_1.SheetArea.viewport).setCalcService(self._calcService);
    self._calcService.initParserContext(self._getSheetSource());
    if (oldService) {
        service.setSourceModel(self._chSheetSource, oldService.getSourceModel(self._chSheetSource));
        service.setSourceModel(self._rhSheetSource, oldService.getSourceModel(self._rhSheetSource));
        service.setSourceModel(self._vpSheetSource, oldService.getSourceModel(self._vpSheetSource));
    }
    else {
        self._chCalcSheetModel = self._calcService.getSourceModel(self._chSheetSource);
        self._rhCalcSheetModel = self._calcService.getSourceModel(self._rhSheetSource);
        self._vpCalcSheetModel = self._calcService.getSourceModel(self._vpSheetSource);
    }
};
worksheetPrototype.setCalc = function (service, source) {
    this._calcService = service;
    this._vpSheetSource = source || this._vpSheetSource;
    this._vpCalcSheetModel = service.getSourceModel(this._vpSheetSource);
    if (this.parent) {
        this.parent._calcService = service;
    }
};
worksheetPrototype._commitArrayFormula = function () {
    this._endEditImp(false, 1 );
};
worksheetPrototype._doCalcLayoutChange = function (args, isUndo) {
    var self = this, changeType = args.changeType, row = args.row, rowCount = args.rowCount, col = args.col, colCount = args.colCount;
    var calcModel = self._getCalcModel();
    if (calcModel) {
        var modelManager = self._modelManager, calcChanges = modelManager._getChangesForCalcEngine();
        var service = getCalcService(calcModel), source = calcModel._source, operatorAdjustor = service._getOperatorAdjustor(), asyncManager = service._evaluator.asyncManager;
        if (changeType === 'addingRows') {
            if (!self._checkArrayFormula(row, 0, 0, self.getColumnCount(), undefined, true, false)) {
                args.canAdd = false;
            }
            else {
                var rhCalcModel = self._getCalcModel(2);
                operatorAdjustor.onBeforeAddRemoveRows(calcModel, row, rhCalcModel);
                if (!isUndo) {
                    Core_1.clearSpillValuesOnAddRemove(modelManager, row, rowCount, true, true);
                }
                adjustCustomNameOnInsertRemove(self, row, rowCount, true, true);
                [calcModel, rhCalcModel].forEach(function (model) {
                    model.addRows(row, rowCount);
                });
                asyncManager.addRows(source, row, rowCount);
            }
        }
        else if (changeType === 'addRows') {
            service.suspend();
            var rhCalcModel = self._getCalcModel(2);
            operatorAdjustor.onAfterAddRemoveRows(calcModel, row, rowCount, true, isUndo, rhCalcModel);
            service.resume(false);

            if (calcChanges) {
                calcChanges.push({ type: 'addRows', row: row, rowCount: rowCount });
            }
        }
        else if (changeType === 'deletingRows') {
            if (!self._checkArrayFormula(row, 0, rowCount, self.getColumnCount(), undefined, true, false)) {
                args.canDelete = false;
            }
            else {
                var rhCalcModel = self._getCalcModel(2);
                operatorAdjustor.onBeforeAddRemoveRows(calcModel, row, rhCalcModel);
                if (!isUndo) {
                    Core_1.clearSpillValuesOnAddRemove(modelManager, row, rowCount, false, true);
                }
                adjustCustomNameOnInsertRemove(self, row, rowCount, false, true);
                [calcModel, rhCalcModel].forEach(function (model) {
                    model.deleteRows(row, rowCount);
                });
                asyncManager.deleteRows(source, row, rowCount);
            }
        }
        else if (changeType === 'deleteRows') {
            service.suspend();
            var rhCalcModel = self._getCalcModel(2);
            operatorAdjustor.onAfterAddRemoveRows(calcModel, row, rowCount, false, isUndo, rhCalcModel);
            service.resume(false);
            if (calcChanges) {
                calcChanges.push({ type: 'deleteRows', row: row, rowCount: rowCount });
            }
        }
        else if (changeType === 'addingColumns') {
            if (!self._checkArrayFormula(0, col, self.getRowCount(), 0, undefined, false, true)) {
                args.canAdd = false;
            }
            else {
                var chCalcModel = self._getCalcModel(1);
                operatorAdjustor.onBeforeAddRemoveColumns(calcModel, col, chCalcModel);
                if (!isUndo) {
                    Core_1.clearSpillValuesOnAddRemove(modelManager, col, colCount, true, false);
                }
                adjustCustomNameOnInsertRemove(self, col, colCount, true, false);
                [calcModel, chCalcModel].forEach(function (model) {
                    model.addColumns(col, colCount);
                });
                asyncManager.addColumns(source, row, rowCount);
            }
        }
        else if (changeType === 'addColumns') {
            service.suspend();
            var chCalcModel = self._getCalcModel(1);
            operatorAdjustor.onAfterAddRemoveColumns(calcModel, col, colCount, true, isUndo, chCalcModel);
            service.resume(false);
            if (calcChanges) {
                calcChanges.push({ type: 'addColumns', col: col, colCount: colCount });
            }
        }
        else if (changeType === 'deletingColumns') {
            if (!self._checkArrayFormula(0, col, self.getRowCount(), colCount, undefined, false, true)) {
                args.canDelete = false;
            }
            else {
                var chCalcModel = self._getCalcModel(1);
                operatorAdjustor.onBeforeAddRemoveColumns(calcModel, col, chCalcModel);
                if (!isUndo) {
                    Core_1.clearSpillValuesOnAddRemove(modelManager, col, colCount, false, false);
                }
                adjustCustomNameOnInsertRemove(self, col, colCount, false, false);
                [calcModel, chCalcModel].forEach(function (model) {
                    model.deleteColumns(col, colCount);
                });
                asyncManager.deleteColumns(source, row, rowCount);
            }
        }
        else if (changeType === 'deleteColumns') {
            service.suspend();
            var chCalcModel = self._getCalcModel(1);
            operatorAdjustor.onAfterAddRemoveColumns(calcModel, col, colCount, false, isUndo, chCalcModel);
            service.resume(false);
            if (calcChanges) {
                calcChanges.push({ type: 'deleteColumns', col: col, colCount: colCount });
            }
        }
    }
};
worksheetPrototype._undoCalcAction = function (calcService, calcModel, change) {
    var type = change.type, _this = this;

    if (type === 'addRows') {
        change.changeType = 'deletingRows';
        _this._doCalcLayoutChange(change, true);
        change.changeType = 'deleteRows';
        _this._doCalcLayoutChange(change, true);
    }
    else if (type === 'deleteRows') {
        change.changeType = 'addingRows';
        _this._doCalcLayoutChange(change, true);
        change.changeType = 'addRows';
        _this._doCalcLayoutChange(change, true);
    }
    else if (type === 'addColumns') {
        change.changeType = 'deletingColumns';
        _this._doCalcLayoutChange(change, true);
        change.changeType = 'deleteColumns';
        _this._doCalcLayoutChange(change, true);
    }
    else if (type === 'deleteColumns') {
        change.changeType = 'addingColumns';
        _this._doCalcLayoutChange(change, true);
        change.changeType = 'addColumns';
        _this._doCalcLayoutChange(change, true);
    }
    else if (type === 'customName') {
        change.nameInfo._setExpression(change.expr);
    }
    else if (type === 'condition') {
        change.condition.setExpressions(change.expressions);
    }
};
worksheetPrototype._undoCalcChange = function (calcChanges) {
    var calcService = getCalcService(this), calcModel = this._getCalcModel();
    calcService.suspend();
    while (calcChanges.length) {
        var item = calcChanges.pop();
        if (item.type) {
            this._undoCalcAction(calcService, calcModel, item);
        }
        else {
            calcModel._restoreNodeItem.apply(calcModel, item);
        }
    }
    calcService.resume(false);
};
worksheetPrototype.getReferenceRange = function (formula) {
    var sheetSource = this._getSheetSource();
    var calcService = this.getCalcService();
    var result = calcService.evaluate(sheetSource, formula, 0, 0, true);
    if (result instanceof CalcEngine_1.CalcReference) {
        var sheetName = result.getSource().getName();
        if (result.getRangeCount() > 0) {
            var rangeIndex = 0;
            var range = Core_1._createRange(result.getRow(rangeIndex), result.getColumn(rangeIndex), result.getRowCount(rangeIndex), result.getColumnCount(rangeIndex));
            return {
                sheetName: sheetName,
                range: range
            };
        }
    }
};


function adjustCustomNameOnInsertRemove(src, index, count, isInsert, isRow) {
    var sheetNames;
    var oldExpr, newExpr;
    var calcChanges = !isInsert && src._modelManager._getChangesForCalcEngine();
    if (!src.parent || !src.parent.sheets) {
        sheetNames = src.getCustomNames();
        if (sheetNames) {
            $_each(sheetNames, function (i, ne) {
                oldExpr = ne.getExpression();
                newExpr = adjustCustomNameExpOnInsertRemove(src, src, index, count, isInsert, isRow, oldExpr);
                if (newExpr !== oldExpr) {
                    ne._setExpression(newExpr, calcChanges);
                }
            });
        }
        return;
    }
    var sheets = src.parent.sheets, workbookCustomNames = src.parent.getCustomNames(), formatStringCustomNames = src.parent._getFormatStringCustomNames();
    var pivotCustomNames = !isNullOrUndefined(src.parent._pivot) && src.parent._getPivotCustomNames();
    if (workbookCustomNames) {
        $_each(workbookCustomNames, function (i, ne) {
            oldExpr = ne.getExpression();
            newExpr = adjustCustomNameExpOnInsertRemove(null, src, index, count, isInsert, isRow, oldExpr);
            if (newExpr !== oldExpr) {
                ne._setExpression(newExpr, calcChanges);
            }
        });
    }
    if (formatStringCustomNames) {
        $_each(formatStringCustomNames, function (i, ne) {
            oldExpr = ne.getExpression();
            newExpr = adjustCustomNameExpOnInsertRemove(null, src, index, count, isInsert, isRow, oldExpr);
            if (newExpr !== oldExpr) {
                ne._setExpression(newExpr, calcChanges);
            }
        });
    }
    if (pivotCustomNames) {
        $_each(pivotCustomNames, function (i, ne) {
            oldExpr = ne.getExpression();
            newExpr = adjustCustomNameExpOnInsertRemove(null, src, index, count, isInsert, isRow, oldExpr);
            if (newExpr !== oldExpr) {
                ne._setExpression(newExpr, calcChanges);
            }
        });
    }
    var _loop_1 = function (sheetIndex) {
        sheetNames = sheets[sheetIndex].getCustomNames();
        if (sheetNames) {
            $_each(sheetNames, function (i, ne) {
                oldExpr = ne.getExpression();
                newExpr = adjustCustomNameExpOnInsertRemove(sheets[sheetIndex], src, index, count, isInsert, isRow, oldExpr);
                if (newExpr !== oldExpr) {
                    ne._setExpression(newExpr, calcChanges);
                }
            });
        }
    };
    for (var sheetIndex = 0; sheetIndex < sheets.length; sheetIndex++) {
        _loop_1(sheetIndex);
    }
}
exports._adjustCustomNameOnInsertRemove = adjustCustomNameOnInsertRemove;
function adjustCustomNameExpOnInsertRemove(owner, src, index, count, isInsert, isRow, expr) {
    var srcSource = src._getSheetSource(), refError = CalcEngine_1._createErrorExpression(CalcEngine_1.Errors.Reference, srcSource);
    var source;
    if (expr.type === 9 ) {
        var left = expr.value, right = expr.value2;
        var newLeft = adjustCustomNameExpOnInsertRemove(owner, src, index, count, isInsert, isRow, left);
        var newRight = right && adjustCustomNameExpOnInsertRemove(owner, src, index, count, isInsert, isRow, right);
        if (left !== newLeft || right !== newRight) {
            return CalcEngine_1._createOperatorExpression(expr.operatorType, newLeft, newRight);
        }
    }
    else if (expr.type === 7 ) {
        var hasChange = false, newArgs = [], arg = void 0;
        for (var argIndex = 0; argIndex < expr.arguments.length; argIndex++) {
            arg = expr.arguments[argIndex];
            var newArg = adjustCustomNameExpOnInsertRemove(owner, src, index, count, isInsert, isRow, arg);
            hasChange = hasChange || arg !== newArg;
            newArgs.push(newArg);
        }
        if (hasChange) {
            return CalcEngine_1._createFunctionExpression(expr, newArgs);
        }
    }
    else if (expr.type === 1 && expr._isCell()) {
        source = expr.source || owner && owner._getSheetSource();
        var row = expr.row, col = expr.column, oldRow = row, oldCol = col;
        if (source && source === srcSource && (isRow && !expr.rowRelative || !isRow && !expr.columnRelative)) {
            if (isRow && isInsert) {
                row += row >= index ? count : 0;
            }
            else if (!isRow && isInsert) {
                col += col >= index ? count : 0;
            }
            else if (isRow) {
                if (row >= index + count) {
                    row -= count;
                }
                else if (row >= index) {
                    return refError;
                }
            }
            else if (col >= index + count) {
                col -= count;
            }
            else if (col >= index) {
                return refError;
            }
            if (row !== oldRow || col !== oldCol) {
                return CalcEngine_1._createCellExpression(srcSource, keyword_null, row, col, expr.rowRelative, expr.columnRelative);
            }
        }
    }
    else if (expr.type === 1 ) {
        source = expr.source || owner && owner._getSheetSource();
        var startRow = expr.row, startColumn = expr.column, endRow = expr.endRow, endColumn = expr.endColumn, startRowRelative = expr.rowRelative, startColumnRelative = expr.columnRelative, endRowRelative = expr.endRowRelative, endColumnRelative = expr.endColumnRelative, oldStartRow = startRow, oldColumn = startColumn, oldEndRow = endRow, oldEndColumn = endColumn;
        if (source && source === srcSource) {
            if (isRow && isInsert) {
                startRow += !startRowRelative && startRow >= index ? count : 0;
                endRow += !endRowRelative && endRow >= index ? count : 0;
            }
            else if (!isRow && isInsert) {
                startColumn += !startColumnRelative && startColumn >= index ? count : 0;
                endColumn += !endColumnRelative && endColumn >= index ? count : 0;
            }
            else if (isRow && !isInsert) {
                if (!startRowRelative && startRow >= index && !endRowRelative && endRow < index + count) {
                    return refError;
                }
                if (startRowRelative && endRowRelative || endRow < index) {
                    return expr;
                }
                if (!startRowRelative) {
                    if (startRow >= index + count) {
                        startRow -= count;
                    }
                    else if (startRow < index) {

                    }
                    else if (endRowRelative) {
                        return refError;
                    }
                    else if (startRow > index) {
                        startRow = index;
                    }
                }
                if (!endRowRelative) {
                    if (endRow >= index + count) {
                        endRow -= count;
                    }
                    else if (startRowRelative) {
                        return refError;
                    }
                    else if (endRow < index + count) {
                        endRow = index - 1;
                    }
                }
            }
            else {
                if (!startColumnRelative && startColumn >= index && !endColumnRelative && endColumn < index + count) {
                    return refError;
                }
                if (startColumnRelative && endColumnRelative || endColumn < index) {
                    return expr;
                }
                if (!startColumnRelative) {
                    if (startColumn >= index + count) {
                        startColumn -= count;
                    }
                    else if (startColumn < index) {

                    }
                    else if (endColumnRelative) {
                        return refError;
                    }
                    else if (startColumn > index) {
                        startColumn = index;
                    }
                }
                if (!endColumnRelative) {
                    if (endColumn >= index + count) {
                        endColumn -= count;
                    }
                    else if (startColumnRelative) {
                        return refError;
                    }
                    else if (endColumn < index + count) {
                        endColumn = index - 1;
                    }
                }
            }
            if (startColumn !== oldColumn || endColumn !== oldEndColumn || startRow !== oldStartRow || endRow !== oldEndRow) {
                return CalcEngine_1._createRangeExpression(srcSource, keyword_null, startRow, startColumn, endRow, endColumn, startRowRelative, startColumnRelative, endRowRelative, endColumnRelative);
            }
        }
    }
    else if (expr.type === 10 ) {
        var argExp = expr.value, newExp = adjustCustomNameExpOnInsertRemove(owner, src, index, count, isInsert, isRow, argExp);
        if (argExp !== newExp) {
            return CalcEngine_1._createParenthesesExpression(newExp);
        }
    }
    else if (expr.type === 13 ) {
        source = expr.source || owner && owner._getSheetSource();
        if (source && source === srcSource && !isRow) {
            var tableExpr = expr;
            expr = tableExpr.offsetWhenInsertRemoveColumn(index, count, isInsert);
        }
    }
    return expr;
}
function adjustOneFormula(service, calcInfo) {
    var calcModel = calcInfo._sourceModel;
    var source = calcModel.getSource();
    var depNode, name;
    var row = -1, col = -1;
    var hasID, id;
    if (calcInfo.name) {
        name = calcInfo.name;
        id = calcInfo.id;
        if (isNullOrUndefined(id)) {
            depNode = calcModel.getNodeByName(name);
        }
        else {
            depNode = { _expr: calcInfo.expression };
            hasID = true;
        }
    }
    else {
        row = calcInfo.row;
        col = calcInfo.column;
        row = row === undefined ? -1 : row;
        col = col === undefined ? -1 : col;
        depNode = calcModel.getNode(row, col);
    }
    var expr = depNode._expr;
    var arrayInfo = depNode._arrayInfo;
    var formula = service.unparse(source, expr, row < 0 ? 0 : row, col < 0 ? 0 : col);
    if (arrayInfo && ((service.allowDynamicArray !== true)
        || (service.allowDynamicArray === true && !arrayInfo.isDynamicArray))) {
        if (row === arrayInfo.row && col === arrayInfo.col) {
            calcModel.setArrayFormula(arrayInfo.row, arrayInfo.col, arrayInfo.rowCount, arrayInfo.colCount, formula);
        }
    }
    else if (name) {
        if (hasID) {
            calcModel.setFormula(id, name, formula);
        }
        else {
            calcModel.setFormulaByName(name, formula);
        }
    }
    else {
        calcModel.setFormula(row, col, formula, null, true, true);
    }
    depNode._expr._isNewForIterativeCalc = expr._isNewForIterativeCalc;
}


function adjustModelFormulasAfterSetSheetName(sheet) {
    var service = getCalcService(sheet), chSourceModel = service.getSourceModel(sheet._getSheetSource(Core_1.SheetArea.colHeader)), rhSourceModel = service.getSourceModel(sheet._getSheetSource(Core_1.SheetArea.rowHeader)), vpSourceModel = service.getSourceModel(sheet._getSheetSource());
    var modelGroup = [chSourceModel, rhSourceModel, vpSourceModel];
    for (var modelIndex = 0; modelIndex < modelGroup.length; modelIndex++) {
        var sourceModel = modelGroup[modelIndex];
        if (!sourceModel) {
            return;
        }
        var nodes = sourceModel.getAllNodes();
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var calc = node.calc;
            if (calc) {
                var listeners = calc._listeners, dep = void 0;
                for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
                    var cls = calc[listeners[lIndex]];
                    if (cls) {
                        for (var key in cls) {
                            dep = cls[key];
                            if (dep && dep instanceof CalcEngine_1.PathCalc) {
                                adjustOneFormula(service, dep);
                            }
                        }
                    }
                }
            }
        }
    }
}
function _copyFormula(src, srcRow, srcColumn, dest, destRow, destColumn, rowCount, columnCount, ignoreFilteredOutRow, ignorePasteSkipInvisibleRange) {
    formulaOperatorAdjustor_1.CalcOperatorAdjustor.copyFormula(src._getCalcModel(), srcRow, srcColumn, dest._getCalcModel(), destRow, destColumn, rowCount, columnCount, ignoreFilteredOutRow, ignorePasteSkipInvisibleRange);
}
exports._copyFormula = _copyFormula;
function convertReferenceExpression(expr, useRelative) {
    var newExpr = expr.offset(0, 0, false, 0, 0);
    newExpr.rowRelative = newExpr.endRowRelative = newExpr.columnRelative = newExpr.endColumnRelative = useRelative;
    return newExpr;
}
function _adjustCustomNameExpOnMove(owner, src, srcRow, srcColumn, dest, destRow, destColumn, moveRowCount, moveColumnCount, expr) {
    if (expr.type === 9 ) {
        var left = expr.value, right = expr.value2;
        var newLeft = _adjustCustomNameExpOnMove(owner, src, srcRow, srcColumn, dest, destRow, destColumn, moveRowCount, moveColumnCount, left);
        var newRight = right && _adjustCustomNameExpOnMove(owner, src, srcRow, srcColumn, dest, destRow, destColumn, moveRowCount, moveColumnCount, right);
        if (left !== newLeft || right !== newRight) {
            return CalcEngine_1._createOperatorExpression(expr.operatorType, newLeft, newRight);
        }
    }
    else if (expr.type === 7 ) {
        var hasChange = false, newArgs = [], arg = void 0;
        for (var argIndex = 0; argIndex < expr.arguments.length; argIndex++) {
            arg = expr.arguments[argIndex];
            var newArg = _adjustCustomNameExpOnMove(owner, src, srcRow, srcColumn, dest, destRow, destColumn, moveRowCount, moveColumnCount, arg);
            hasChange = hasChange || arg !== newArg;
            newArgs.push(newArg);
        }
        if (hasChange) {
            return CalcEngine_1._createFunctionExpression(expr, newArgs);
        }
    }
    else if (expr.type === 1 ) {
        var startCellAbsolute = !getStartRowRelative(expr) && !getStartColumnRelative(expr), endCellAbsolute = !getEndRowRelative(expr) && !getEndColumnRelative(expr);
        var srcSource = src._getSheetSource();
        if ((!expr.source || expr.source === srcSource) && startCellAbsolute && endCellAbsolute) {
            var destSource = dest._getSheetSource();
            var info = new formulaOperatorAdjustor_1.MoveSwapInfo(srcSource, srcRow, srcColumn, destSource, destRow, destColumn, moveRowCount, moveColumnCount);

            var oldExpr = convertReferenceExpression(expr, true);

            var options = {
                isCustomName: true
            };
            var newExpr = formulaOperatorAdjustor_1.adjustFormulaOnMoveSwap(srcSource, 0, 0, oldExpr, info, true, options);
            return newExpr === oldExpr ? expr : newExpr.type === 1 && convertReferenceExpression(newExpr, false) || newExpr;
        }
    }
    else if (expr.type === 10 ) {
        var argExp = expr.value, newExp = _adjustCustomNameExpOnMove(owner, src, srcRow, srcColumn, dest, destRow, destColumn, moveRowCount, moveColumnCount, argExp);
        if (argExp !== newExp) {
            return CalcEngine_1._createParenthesesExpression(newExp);
        }
    }
    return expr;
}
exports._adjustCustomNameExpOnMove = _adjustCustomNameExpOnMove;

Core_1.Worksheet._registerFeature('calc', {
    priority: 1000,
    init: init,
    dispose: function (argus) {
        var self = this;
        if (argus.clearCache !== false) {
            self._vpSheetSource = keyword_null;
            self._rhSheetSource = keyword_null;
            self._chSheetSource = keyword_null;
            self._calcService = keyword_null;
            var vpCalcSourceModel = self._vpCalcSheetModel;
            if (vpCalcSourceModel) {
                if (argus.isSheetDestroy === true) {
                    vpCalcSourceModel._releaseResource();
                }
                else {
                    vpCalcSourceModel._stopListeningAll();
                }
                self._vpCalcSheetModel = keyword_null;
            }
            var rhCalcSourceModel = self._rhCalcSheetModel;
            if (rhCalcSourceModel) {
                if (argus.isSheetDestroy === true) {
                    rhCalcSourceModel._releaseResource();
                }
                else {
                    rhCalcSourceModel._stopListeningAll();
                }
                self._rhCalcSheetModel = keyword_null;
            }
            var chCalcSourceModel = self._chCalcSheetModel;
            if (chCalcSourceModel) {
                if (argus.isSheetDestroy === true) {
                    chCalcSourceModel._releaseResource();
                }
                else {
                    chCalcSourceModel._stopListeningAll();
                }
                self._chCalcSheetModel = keyword_null;
            }
        }
    },
    attach: function (parent) {
        var self = this;
        if (parent instanceof Core_1.Workbook) {
            self._initCalc(parent._calcService);
        }
        else {
            self._initCalc();
        }
    },
    onLayoutChanged: function (args) {
        if (!this._getCalcServiceInternal().isAdjustSuspended()) {
            this._doCalcLayoutChange(args);
        }
    },
    toJson: function (data, serializationOption) {
        var sheet = this;

        var functions = sheet._functions;
        if (!Core_1.GC$.isEmptyObject(functions)) {
            data.customFunctions = functions;
        }
        var newWorkSheetName = serializationOption && serializationOption.newWorkSheetName;

        var names = [], sheetNames = sheet.getCustomNames(), calcService = getCalcService(sheet), calcModel = sheet._getCalcModel(), sheetSource = calcModel._source;
        if (sheetNames && calcService) {
            if (!isNullOrUndefined(newWorkSheetName) && calcModel && sheetSource) {
                sheetSource._newWorksheetName = newWorkSheetName;
            }
            $_each(sheetNames, function (i, ni) {
                var name = ni.getName(), row = ni.getRow(), col = ni.getColumn(), expr = ni.getExpression(), comment = ni.getComment();
                if (expr) {
                    var f = calcService.unparse(sheet._getSheetSource(), expr, row, col, false, true, true );
                    var nameProperty = { name: name, formula: f, row: row, col: col };
                    if (comment) {
                        nameProperty.comment = comment;
                    }
                    names.push(nameProperty);
                }
            });
            if (names.length > 0) {
                data.names = names;
            }
            delete sheetSource._newWorksheetName;
        }

        var ignoreFormula = serializationOption && serializationOption.ignoreFormula;
        if (!ignoreFormula) {
            var models_1 = [sheet._vpCalcSheetModel, sheet._chCalcSheetModel, sheet._rhCalcSheetModel];
            [data.data, data.colHeaderData, data.rowHeaderData].forEach(function (d, i) {
                var clacModel = models_1[i];
                if (clacModel) {
                    sheetSource = clacModel._source;
                    if (!isNullOrUndefined(newWorkSheetName)) {
                        sheetSource._newWorksheetName = newWorkSheetName;
                    }
                    clacModel.toJSON({ data: d });
                    delete sheetSource._newWorksheetName;
                }
            });
        }
    },
    fromJson: function (sheetSettings, noSchema, deserializationOptions, setFormulaDirectly) {
        var sheet = this;
        var incrementalLoading = deserializationOptions && deserializationOptions.incrementalLoading;
        if (!incrementalLoading) {
            sheet.clearCustomFunctions();
            sheet.clearCustomNames();
        }
        if (setFormulaDirectly) {
            sheet.nameFunctionsFromJSON(sheetSettings, noSchema, deserializationOptions);
            sheet.formulaFromJSON(sheetSettings, noSchema, deserializationOptions);
        }
    },
    setName: function (options) {
        adjustModelFormulasAfterSetSheetName(this);
        var calcModel = this._getCalcModel();
        var service = getCalcService(calcModel), asyncManager = service._evaluator.asyncManager;
        asyncManager.changeSourceName(options.oldName, options.newName);
    },
    beforeSetName: function () {
        this._validations && (this.parent || this)._getValidatorsWithFormula();
    }
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
/***/ })

/******/ });
    return GC;
};
//# sourceMappingURL=gc.spread.sheets.calcengine.14.2.5.js.map