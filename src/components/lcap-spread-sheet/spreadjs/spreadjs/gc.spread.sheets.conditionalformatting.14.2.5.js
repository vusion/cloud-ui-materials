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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['ConditionalFormatting'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/conditional/conditional.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/conditional/conditional.entry.js':
/*!*******************************************************!*\
  !*** ./dist/plugins/conditional/conditional.entry.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(__webpack_require__(/*! ./conditional */ './dist/plugins/conditional/conditional.js'));
__export(__webpack_require__(/*! ./conditional.ns */ './dist/plugins/conditional/conditional.ns.js'));
/***/ }),

/***/ './dist/plugins/conditional/conditional.js':
/*!*************************************************!*\
  !*** ./dist/plugins/conditional/conditional.js ***!
  \*************************************************/
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
var Sheets = __webpack_require__(/*! Core */ 'Core');
var CalcEngine = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var conditional_ns_1 = __webpack_require__(/*! ./conditional.ns */ './dist/plugins/conditional/conditional.ns.js');
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var SheetsCalc = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var DrawIconSet = __webpack_require__(/*! ./conditionalFormatIcon */ './dist/plugins/conditional/conditionalFormatIcon.js');
var $ = Sheets.GC$, stringHelper = Common_1.Common._StringHelper;
var keyword_null = null, keyword_undefined = void 0, const_undefined = 'undefined', const_string = 'string', math_min = Math.min, math_max = Math.max, math_abs = Math.abs, math_floor = Math.floor, math_ceil = Math.ceil, calcConvert = CalcEngine.Convert, calcConvert_isNumber = calcConvert._isNumber, calcConvert_toDouble = calcConvert._toDouble, calcConvert_tryToDouble = calcConvert._tryToDouble;
var StringHelper = Common_1.Common._StringHelper;
var StringHelper_TrimStart = StringHelper._trimStart;
var StringHelper_StartWith = StringHelper._startsWith;
var StringHelper_EndsWith = StringHelper._endsWith;
var StringHelper_Contains = StringHelper._contains;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var RegexHelper = Common_1.Common._RegexHelper;
var isInstanceOf = Common_1.Common._isInstanceOf;
var util = Sheets._util;
var _defineFeature = Sheets._defineFeature;
var adjustConditionFormulaWhenFromJSON = util._adjustConditionFormulaWhenFromJSON;
var getBaseRowBaseCol = util._getBaseRowBaseCol;
var hasCalc = !!CalcEngine;
var Style = Sheets.Style;
var ArrayHelper = Common_1.Common._ArrayHelper;
var ColorHelper = Common_1.Common._ColorHelper;
var ColorToString = ColorHelper._toString;
var createRange = Sheets._createRange;
var Range = Sheets.Range;
var dateTimeHelper = Common_1.Common._DateTimeHelper;
var arrayHelper = Common_1.Common._ArrayHelper;
var arrayHelper_remove = arrayHelper._remove, arrayHelper_indexOf = arrayHelper._indexOf, arrayHelper_getLength = arrayHelper._getLength;
var Functions = CalcEngine.Functions, evaluateOperator = CalcEngine.evaluateOperator;
var _ThemeContext = Sheets._ThemeContext;
var rm = new Common_1.Common.ResourceManager(conditional_ns_1.SR, 'ConditionalFormatting');
var getSR = rm.getResource.bind(rm);
var isIncludeSpecialChar = function (str) {
    return /[\f\n\r\t\v]/.test(str);
};
var createExpressionByRange = function (range) {
    var row = range.row < 0 ? SheetsCalc.BAND_INDEX_CONST : range.row;
    var col = range.col < 0 ? SheetsCalc.BAND_INDEX_CONST : range.col;

    return CalcEngine_1._createRangeExpression(keyword_null, keyword_null, row, col, row + range.rowCount - 1, col + range.colCount - 1);
};
var createExpression = function (obj) {
    var expr;
    if (obj instanceof CalcEngine.Expression) {
        expr = obj;
    }
    else if (obj instanceof Range) {
        expr = createExpressionByRange(obj);
    }
    else if (calcConvert_isNumber(obj)) {
        obj = calcConvert_toDouble(obj);
        if (!isNaN(obj)) {
            expr = new CalcEngine.Expression(2 );
            expr.value = obj;
        }
    }
    else {
        throw getSR().Exp_NotSupport;
    }
    return expr;
};
function getRange(ranges, row, column) {
    for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (range.contains(row, column)) {
            return range;
        }
    }
}
function getRowCount(obj) {
    return obj.rowCount;
}
function getColCount(obj) {
    return obj.colCount;
}

var defProperty = function (propertyName, initValue, setCallback, getCallBack) {
    var pname = propertyName;
    var defValue = initValue;
    var t = function (value, shouldCallback) {
        var self = this;
        if (!self.hasOwnProperty('_ps')) {
            self._ps = {};
        }
        var properties = self._ps;
        if (arguments.length === 0) {
            if (properties[pname] !== keyword_undefined) {
                if (getCallBack) {
                    return getCallBack.call(self, properties[pname]);
                }
                return properties[pname];
            }
            return defValue;
        }
        if (properties[pname] !== value) {
            var old = properties[pname] !== keyword_undefined ? properties[pname] : defValue;
            properties[pname] = value;
            if (shouldCallback !== false && setCallback) {
                setCallback.call(self, value, old);
            }
        }
        return self;
    };
    t.isDefault = function (value) {
        return value === defValue;
    };
    return t;
};
var toJsonFn = function (context, properties, jsData) {
    var self = this;
    if (!jsData) {
        jsData = {};
    }
    if (!properties) {
        properties = self;
    }
    if (!isNullOrUndefined(self.pivotTableName)) {
        jsData.pivot = true;
    }
    $.each(properties, function (i, p) {
        var pt = self[p];
        if (!isNullOrUndefined(pt)) {
            var value = pt.call(self);

            if (p === 'formula') {
                if (self.getFormulaString) {
                    value = self.getFormulaString(context, keyword_undefined , keyword_undefined , true );
                }
                else if (self.condition() && self.condition().getFormulaString) {
                    value = self.condition().getFormulaString(context, keyword_undefined , keyword_undefined , true );
                }
                if (value) {
                    jsData[p] = value;
                }
            }
            else if (p === 'iconCriteria' || p === 'icons') {
                jsData[p] = value;
            }
            else if (dateTimeHelper._isDate(value)) {
                jsData[p] = dateTimeHelper._toOADateString(value);
            }
            else if (value && value.toJSON) {
                jsData[p] = value.toJSON(context);
            }
            else if (!isNullOrUndefined(value) && !pt.isDefault(value)) {
                jsData[p] = value;
            }
        }
    });
    return jsData;
};
var fromJsonFn = function (context, properties, jsData, noSchema) {
    if (!jsData) {
        return;
    }
    var self = this, data;
    if (!properties) {
        properties = self;
    }
    $.each(properties, function (i, p) {
        data = jsData[p];
        if (!isNullOrUndefined(data)) {
            if (p === 'ranges') {
                var ranges = [];
                for (var j = 0; j < data.length; j++) {
                    var r = data[j];
                    ranges.push(createRange(r.row, r.col, getRowCount(r), getColCount(r)));
                }
                self.ranges(ranges, false);
            }
            else if (p === 'style') {
                self.style(new Style(), false);
                self.style().fromJSON(data, noSchema);
            }
            else if (p === 'iconCriteria') {
                var length_1 = data.length;
                for (var k = 0; k < length_1; k++) {
                    var iconCriterion = data[k];

                    self._iconCriteria[k] = new IconCriterion(iconCriterion.isGreaterThanOrEqualTo, iconCriterion.iconValueType, iconCriterion.iconValue) ;
                }
            }
            else if (p === 'icons') {
                var iconsCount = data.length;
                for (var l = 0; l < iconsCount; l++) {
                    var iconInfo = data[l];
                    self._icons[l] = { iconSetType: iconInfo.iconSetType, iconIndex: iconInfo.iconIndex };
                }
            }
            else if (p === 'iconSetType') {
                self[p](data, true);
            }
            else if (p === 'item1' || p === 'item2') {
                self[p](exports._createCondition(), false) ;
                self[p]().fromJSON(data, context);
            }
            else if (p === 'expected') {
                if ($.getType(data) === const_string && (jsData.conType === 5 || jsData.conType === 13 )) {
                    if (data.substr(0, 8) === '/OADate(') {
                        self[p](dateTimeHelper._fromOADateString(data), false);
                    }
                    else {
                        self[p](new Date(data));
                    }
                }
                else {
                    self[p](data, false);
                }
            }
            else if (p === 'condition') {
                var condition = new Condition() ;
                condition.fromJSON(data, context);
                self.condition(condition, false);
            }
            else if ($.getType(data) === const_string && data.substr(0, 8) === '/OADate(') {
                self[p](dateTimeHelper._fromOADateString(data), false);
            }
            else {
                self[p](data, false);
            }
        }
    });
};
function compareByType(compareType, value, expectedValue, ignoreCaseSensitive) {
    if (ignoreCaseSensitive && typeof value === 'string' && typeof expectedValue === 'string') {
        value = value.toLowerCase();
        expectedValue = expectedValue.toLowerCase();
    }
    switch (compareType) {
        case GeneralComparisonOperators.equalsTo :
            return value === expectedValue;

        case GeneralComparisonOperators.notEqualsTo :
            return value !== expectedValue;

        case GeneralComparisonOperators.greaterThan :
            return value > expectedValue;

        case GeneralComparisonOperators.greaterThanOrEqualsTo :
            return value >= expectedValue;

        case GeneralComparisonOperators.lessThan :
            return value < expectedValue;

        case GeneralComparisonOperators.lessThanOrEqualsTo :
            return value <= expectedValue;
        default:
            return false;
    }
}
var _SheetModelManager = Sheets._SheetModelManager;
$.extend(_SheetModelManager.prototype, {
    _backupConditionalRules: function () {
        var self = this;
        var changes = self._changes;
        if (changes && !changes._originalConditionalRules) {
            changes._originalConditionalRules = self._conditionalFormats._rules.map(function (item) {
                return {
                    rule: item,
                    ranges: item.ranges().slice()
                };
            });
        }
    },
    _restoreConditionalRules: function (originalConditionalRules) {
        var conditionalFormats = this._conditionalFormats, sheet = this._sheet;
        sheet.suspendPaint();
        if (originalConditionalRules) {
            if (originalConditionalRules.length === 0 && conditionalFormats._rules && conditionalFormats._rules.length === 1) {
                conditionalFormats.constructor._callFeatureHandler(sheet, 'onRuleUpdated', {
                    ranges: conditionalFormats._rules[0].ranges()
                });
            }
            conditionalFormats._rules = originalConditionalRules.map(function (item) {
                var rule = item.rule;
                rule.ranges(item.ranges);
                conditionalFormats.constructor._callFeatureHandler(sheet, 'onRuleUpdated', {
                    ranges: rule.ranges()
                });
                return rule;
            });
            conditionalFormats._resetCache();
        }
        sheet.resumePaint();
    },
    _onRowsAdded_ConditionalRule: function (row, rowCount, affectRanges, isFromTable) {
        this._backupConditionalRules();
        this._conditionalFormats._onRowsAdded(row, rowCount, affectRanges, isFromTable);
    },
    _onRowsRemoved_ConditionalRule: function (row, rowCount, affectRanges, isFromTable) {
        this._backupConditionalRules();
        this._conditionalFormats._onRowsRemoved(row, rowCount, affectRanges, isFromTable);
    },
    _onColumnsAdded_ConditionalRule: function (col, colCount, affectRanges, isFromTable) {
        this._backupConditionalRules();
        this._conditionalFormats._onColumnsAdded(col, colCount, affectRanges, isFromTable);
    },
    _onColumnsRemoved_ConditionalRule: function (col, colCount, affectRanges, isFromTable) {
        this._backupConditionalRules();
        this._conditionalFormats._onColumnsRemoved(col, colCount, affectRanges, isFromTable);
    },
    _onClear_ConditionalRule: function () {
        this._backupConditionalRules();
        this._conditionalFormats._clearCache();
    },
    _onSetRowColumnCount_ConditionalRule: function () {
        this._backupConditionalRules();
        this._conditionalFormats._resetCache();
    }
});
_SheetModelManager._registerFeature('conditionalFormat', {
    init: function () {
        this._conditionalFormats = new ConditionalFormats(this._sheet) ;
    },
    undo: function (changes) {
        var originalConditionalRules = changes._originalConditionalRules;
        if (originalConditionalRules) {
            this._restoreConditionalRules(originalConditionalRules);
        }
    },
    dispose: function (args) {
        var self = this, clearCache = args && args.clearCache;
        if (clearCache !== false) {
            if (self._conditionalFormats) {
                self._conditionalFormats._dispose();
                self._conditionalFormats = keyword_null;
            }
        }
    }
});
var adapter = {
    init: function () {
        this.conditionalFormats = this._modelManager._conditionalFormats;
    },
    dispose: function (args) {
        if (args.clearCache !== false) {
            var cfs = this.conditionalFormats;
            if (cfs) {
                cfs._clearCellRuleCache();
            }
        }
    },
    onLayoutChanged: function (e) {
        var changeType = e.changeType;
        var row = e.row;
        var rowCount = getRowCount(e);
        var col = e.col;
        var colCount = getColCount(e);
        var sheetArea = e.sheetArea;
        var modelManager = this._modelManager;
        var tableManager = this.tables;
        if (changeType === 'addRows') {
            modelManager._onRowsAdded_ConditionalRule(row, rowCount, tableManager && tableManager._getTableListRanges(row, -1, rowCount, -1, true ), false);
        }
        else if (changeType === 'deleteRows') {
            modelManager._onRowsRemoved_ConditionalRule(row, rowCount);
        }
        else if (changeType === 'addColumns') {
            modelManager._onColumnsAdded_ConditionalRule(col, colCount);
        }
        else if (changeType === 'deleteColumns') {
            modelManager._onColumnsRemoved_ConditionalRule(col, colCount);
        }
        else if (changeType === 'clear') {
            modelManager._onClear_ConditionalRule();
        }
        else if (changeType === 'setColumnCount' || changeType === 'setRowCount') {
            if (sheetArea === 3 || sheetArea === 1 ) {
                modelManager._onSetRowColumnCount_ConditionalRule();
            }
        }
    },
    toJson: function (data, serializationOption) {
        var cfs = this.conditionalFormats;
        var ignoreStyle = serializationOption && serializationOption.ignoreStyle;
        if (cfs && !ignoreStyle) {
            data.conditionalFormats = cfs.toJSON(this);
        }
    },
    fromJson: function (data, noSchema, deserializationOptions) {
        var ignoreStyle = deserializationOptions && deserializationOptions.ignoreStyle;
        if (data && data.conditionalFormats && !ignoreStyle) {
            this.conditionalFormats.fromJSON(data.conditionalFormats, this, noSchema, true);
        }
    }
};

Sheets.Worksheet._registerFeature('conditionalFormat', adapter);
Sheets.Workbook._registerFeature('conditionalFormat', {
    fromJson: function (data, noSchema, deserializationOptions) {
        this.sheets.forEach(function (sheet) {
            sheet.conditionalFormats && sheet.conditionalFormats.getRules().forEach(function (rule) {
                rule._adjustConditionFormula();
            });
        });
    },
    onCultureChanged: function () {
        getSR();
    }
});


var GeneralComparisonOperators;
(function (GeneralComparisonOperators) {
    GeneralComparisonOperators[GeneralComparisonOperators['equalsTo'] = 0] = 'equalsTo';

    GeneralComparisonOperators[GeneralComparisonOperators['notEqualsTo'] = 1] = 'notEqualsTo';

    GeneralComparisonOperators[GeneralComparisonOperators['greaterThan'] = 2] = 'greaterThan';

    GeneralComparisonOperators[GeneralComparisonOperators['greaterThanOrEqualsTo'] = 3] = 'greaterThanOrEqualsTo';

    GeneralComparisonOperators[GeneralComparisonOperators['lessThan'] = 4] = 'lessThan';

    GeneralComparisonOperators[GeneralComparisonOperators['lessThanOrEqualsTo'] = 5] = 'lessThanOrEqualsTo';
})(GeneralComparisonOperators = exports.GeneralComparisonOperators || (exports.GeneralComparisonOperators = {}));
var OperatorMap = [
    9 ,
    10 ,
    13 ,
    14 ,
    11 ,
    12
];


var LogicalOperators;
(function (LogicalOperators) {
    LogicalOperators[LogicalOperators['or'] = 0] = 'or';

    LogicalOperators[LogicalOperators['and'] = 1] = 'and';
})(LogicalOperators = exports.LogicalOperators || (exports.LogicalOperators = {}));


var ComparisonOperators;
(function (ComparisonOperators) {
    ComparisonOperators[ComparisonOperators['equalsTo'] = 0] = 'equalsTo';

    ComparisonOperators[ComparisonOperators['notEqualsTo'] = 1] = 'notEqualsTo';

    ComparisonOperators[ComparisonOperators['greaterThan'] = 2] = 'greaterThan';

    ComparisonOperators[ComparisonOperators['greaterThanOrEqualsTo'] = 3] = 'greaterThanOrEqualsTo';

    ComparisonOperators[ComparisonOperators['lessThan'] = 4] = 'lessThan';

    ComparisonOperators[ComparisonOperators['lessThanOrEqualsTo'] = 5] = 'lessThanOrEqualsTo';

    ComparisonOperators[ComparisonOperators['between'] = 6] = 'between';

    ComparisonOperators[ComparisonOperators['notBetween'] = 7] = 'notBetween';
})(ComparisonOperators = exports.ComparisonOperators || (exports.ComparisonOperators = {}));


var TextComparisonOperators;
(function (TextComparisonOperators) {
    TextComparisonOperators[TextComparisonOperators['contains'] = 0] = 'contains';

    TextComparisonOperators[TextComparisonOperators['doesNotContain'] = 1] = 'doesNotContain';

    TextComparisonOperators[TextComparisonOperators['beginsWith'] = 2] = 'beginsWith';

    TextComparisonOperators[TextComparisonOperators['endsWith'] = 3] = 'endsWith';
})(TextComparisonOperators = exports.TextComparisonOperators || (exports.TextComparisonOperators = {}));


var TextCompareType;
(function (TextCompareType) {
    TextCompareType[TextCompareType['equalsTo'] = 0] = 'equalsTo';

    TextCompareType[TextCompareType['notEqualsTo'] = 1] = 'notEqualsTo';

    TextCompareType[TextCompareType['beginsWith'] = 2] = 'beginsWith';

    TextCompareType[TextCompareType['doesNotBeginWith'] = 3] = 'doesNotBeginWith';

    TextCompareType[TextCompareType['endsWith'] = 4] = 'endsWith';

    TextCompareType[TextCompareType['doesNotEndWith'] = 5] = 'doesNotEndWith';

    TextCompareType[TextCompareType['contains'] = 6] = 'contains';

    TextCompareType[TextCompareType['doesNotContain'] = 7] = 'doesNotContain';
})(TextCompareType = exports.TextCompareType || (exports.TextCompareType = {}));


var ColorCompareType;
(function (ColorCompareType) {
    ColorCompareType[ColorCompareType['backgroundColor'] = 0] = 'backgroundColor';

    ColorCompareType[ColorCompareType['foregroundColor'] = 1] = 'foregroundColor';
})(ColorCompareType = exports.ColorCompareType || (exports.ColorCompareType = {}));


var CustomValueType;
(function (CustomValueType) {
    CustomValueType[CustomValueType['empty'] = 0] = 'empty';

    CustomValueType[CustomValueType['nonEmpty'] = 1] = 'nonEmpty';

    CustomValueType[CustomValueType['error'] = 2] = 'error';

    CustomValueType[CustomValueType['nonError'] = 3] = 'nonError';

    CustomValueType[CustomValueType['formula'] = 4] = 'formula';
})(CustomValueType = exports.CustomValueType || (exports.CustomValueType = {}));


var DateCompareType;
(function (DateCompareType) {
    DateCompareType[DateCompareType['equalsTo'] = 0] = 'equalsTo';

    DateCompareType[DateCompareType['notEqualsTo'] = 1] = 'notEqualsTo';

    DateCompareType[DateCompareType['before'] = 2] = 'before';

    DateCompareType[DateCompareType['beforeEqualsTo'] = 3] = 'beforeEqualsTo';

    DateCompareType[DateCompareType['after'] = 4] = 'after';

    DateCompareType[DateCompareType['afterEqualsTo'] = 5] = 'afterEqualsTo';
})(DateCompareType = exports.DateCompareType || (exports.DateCompareType = {}));

var DateExConditionExpectType;
(function (DateExConditionExpectType) {
    DateExConditionExpectType[DateExConditionExpectType['dateOccurring'] = 0] = 'dateOccurring';

    DateExConditionExpectType[DateExConditionExpectType['yearOccurring'] = 1] = 'yearOccurring';

    DateExConditionExpectType[DateExConditionExpectType['quarterOccurring'] = 2] = 'quarterOccurring';

    DateExConditionExpectType[DateExConditionExpectType['monthOccurring'] = 3] = 'monthOccurring';

    DateExConditionExpectType[DateExConditionExpectType['weekOccurring'] = 4] = 'weekOccurring';

    DateExConditionExpectType[DateExConditionExpectType['dayOccurring'] = 5] = 'dayOccurring';

    DateExConditionExpectType[DateExConditionExpectType['yearTodate'] = 6] = 'yearTodate';
})(DateExConditionExpectType = exports.DateExConditionExpectType || (exports.DateExConditionExpectType = {}));


var Top10ConditionType;
(function (Top10ConditionType) {
    Top10ConditionType[Top10ConditionType['top'] = 0] = 'top';

    Top10ConditionType[Top10ConditionType['bottom'] = 1] = 'bottom';
})(Top10ConditionType = exports.Top10ConditionType || (exports.Top10ConditionType = {}));


var DateOccurringType;
(function (DateOccurringType) {
    DateOccurringType[DateOccurringType['today'] = 0] = 'today';

    DateOccurringType[DateOccurringType['yesterday'] = 1] = 'yesterday';

    DateOccurringType[DateOccurringType['tomorrow'] = 2] = 'tomorrow';

    DateOccurringType[DateOccurringType['last7Days'] = 3] = 'last7Days';

    DateOccurringType[DateOccurringType['thisMonth'] = 4] = 'thisMonth';

    DateOccurringType[DateOccurringType['lastMonth'] = 5] = 'lastMonth';

    DateOccurringType[DateOccurringType['nextMonth'] = 6] = 'nextMonth';

    DateOccurringType[DateOccurringType['thisWeek'] = 7] = 'thisWeek';

    DateOccurringType[DateOccurringType['lastWeek'] = 8] = 'lastWeek';

    DateOccurringType[DateOccurringType['nextWeek'] = 9] = 'nextWeek';

    DateOccurringType[DateOccurringType['nextQuarter'] = 10] = 'nextQuarter';

    DateOccurringType[DateOccurringType['thisQuarter'] = 11] = 'thisQuarter';

    DateOccurringType[DateOccurringType['lastQuarter'] = 12] = 'lastQuarter';

    DateOccurringType[DateOccurringType['nextYear'] = 13] = 'nextYear';

    DateOccurringType[DateOccurringType['thisYear'] = 14] = 'thisYear';

    DateOccurringType[DateOccurringType['lastYear'] = 15] = 'lastYear';
})(DateOccurringType = exports.DateOccurringType || (exports.DateOccurringType = {}));


var QuarterType;
(function (QuarterType) {
    QuarterType[QuarterType['quarter1'] = 0] = 'quarter1';

    QuarterType[QuarterType['quarter2'] = 1] = 'quarter2';

    QuarterType[QuarterType['quarter3'] = 2] = 'quarter3';

    QuarterType[QuarterType['quarter4'] = 3] = 'quarter4';
})(QuarterType = exports.QuarterType || (exports.QuarterType = {}));


var AverageConditionType;
(function (AverageConditionType) {
    AverageConditionType[AverageConditionType['above'] = 0] = 'above';

    AverageConditionType[AverageConditionType['below'] = 1] = 'below';

    AverageConditionType[AverageConditionType['equalOrAbove'] = 2] = 'equalOrAbove';

    AverageConditionType[AverageConditionType['equalOrBelow'] = 3] = 'equalOrBelow';

    AverageConditionType[AverageConditionType['above1StdDev'] = 4] = 'above1StdDev';

    AverageConditionType[AverageConditionType['below1StdDev'] = 5] = 'below1StdDev';

    AverageConditionType[AverageConditionType['above2StdDev'] = 6] = 'above2StdDev';

    AverageConditionType[AverageConditionType['below2StdDev'] = 7] = 'below2StdDev';

    AverageConditionType[AverageConditionType['above3StdDev'] = 8] = 'above3StdDev';

    AverageConditionType[AverageConditionType['below3StdDev'] = 9] = 'below3StdDev';
})(AverageConditionType = exports.AverageConditionType || (exports.AverageConditionType = {}));


var ScaleValueType;
(function (ScaleValueType) {
    ScaleValueType[ScaleValueType['number'] = 0] = 'number';

    ScaleValueType[ScaleValueType['lowestValue'] = 1] = 'lowestValue';

    ScaleValueType[ScaleValueType['highestValue'] = 2] = 'highestValue';

    ScaleValueType[ScaleValueType['percent'] = 3] = 'percent';

    ScaleValueType[ScaleValueType['percentile'] = 4] = 'percentile';

    ScaleValueType[ScaleValueType['automin'] = 5] = 'automin';

    ScaleValueType[ScaleValueType['formula'] = 6] = 'formula';

    ScaleValueType[ScaleValueType['automax'] = 7] = 'automax';
})(ScaleValueType = exports.ScaleValueType || (exports.ScaleValueType = {}));


var BarDirection;
(function (BarDirection) {
    BarDirection[BarDirection['leftToRight'] = 0] = 'leftToRight';

    BarDirection[BarDirection['rightToLeft'] = 1] = 'rightToLeft';
})(BarDirection = exports.BarDirection || (exports.BarDirection = {}));


var DataBarAxisPosition;
(function (DataBarAxisPosition) {
    DataBarAxisPosition[DataBarAxisPosition['automatic'] = 0] = 'automatic';

    DataBarAxisPosition[DataBarAxisPosition['cellMidPoint'] = 1] = 'cellMidPoint';

    DataBarAxisPosition[DataBarAxisPosition['none'] = 2] = 'none';
})(DataBarAxisPosition = exports.DataBarAxisPosition || (exports.DataBarAxisPosition = {}));


var IconSetType;
(function (IconSetType) {
    IconSetType[IconSetType['threeArrowsColored'] = 0] = 'threeArrowsColored';

    IconSetType[IconSetType['threeArrowsGray'] = 1] = 'threeArrowsGray';

    IconSetType[IconSetType['threeTriangles'] = 2] = 'threeTriangles';

    IconSetType[IconSetType['threeStars'] = 3] = 'threeStars';

    IconSetType[IconSetType['threeFlags'] = 4] = 'threeFlags';

    IconSetType[IconSetType['threeTrafficLightsUnrimmed'] = 5] = 'threeTrafficLightsUnrimmed';

    IconSetType[IconSetType['threeTrafficLightsRimmed'] = 6] = 'threeTrafficLightsRimmed';

    IconSetType[IconSetType['threeSigns'] = 7] = 'threeSigns';

    IconSetType[IconSetType['threeSymbolsCircled'] = 8] = 'threeSymbolsCircled';

    IconSetType[IconSetType['threeSymbolsUncircled'] = 9] = 'threeSymbolsUncircled';

    IconSetType[IconSetType['fourArrowsColored'] = 10] = 'fourArrowsColored';

    IconSetType[IconSetType['fourArrowsGray'] = 11] = 'fourArrowsGray';

    IconSetType[IconSetType['fourRedToBlack'] = 12] = 'fourRedToBlack';

    IconSetType[IconSetType['fourRatings'] = 13] = 'fourRatings';

    IconSetType[IconSetType['fourTrafficLights'] = 14] = 'fourTrafficLights';

    IconSetType[IconSetType['fiveArrowsColored'] = 15] = 'fiveArrowsColored';

    IconSetType[IconSetType['fiveArrowsGray'] = 16] = 'fiveArrowsGray';

    IconSetType[IconSetType['fiveRatings'] = 17] = 'fiveRatings';

    IconSetType[IconSetType['fiveQuarters'] = 18] = 'fiveQuarters';

    IconSetType[IconSetType['fiveBoxes'] = 19] = 'fiveBoxes';

    IconSetType[IconSetType['noIcons'] = 20] = 'noIcons';
})(IconSetType = exports.IconSetType || (exports.IconSetType = {}));


var IconValueType;
(function (IconValueType) {
    IconValueType[IconValueType['number'] = 1] = 'number';

    IconValueType[IconValueType['percent'] = 4] = 'percent';

    IconValueType[IconValueType['formula'] = 7] = 'formula';

    IconValueType[IconValueType['percentile'] = 5] = 'percentile';
})(IconValueType = exports.IconValueType || (exports.IconValueType = {}));
var StateComparisonOperators;
(function (StateComparisonOperators) {
    StateComparisonOperators[StateComparisonOperators['contains'] = 0] = 'contains';
})(StateComparisonOperators || (StateComparisonOperators = {}));


var ConditionType;
(function (ConditionType) {
    ConditionType[ConditionType['relationCondition'] = 0] = 'relationCondition';

    ConditionType[ConditionType['numberCondition'] = 1] = 'numberCondition';

    ConditionType[ConditionType['textCondition'] = 2] = 'textCondition';

    ConditionType[ConditionType['colorCondition'] = 3] = 'colorCondition';

    ConditionType[ConditionType['formulaCondition'] = 4] = 'formulaCondition';

    ConditionType[ConditionType['dateCondition'] = 5] = 'dateCondition';

    ConditionType[ConditionType['dateExCondition'] = 6] = 'dateExCondition';

    ConditionType[ConditionType['textLengthCondition'] = 7] = 'textLengthCondition';

    ConditionType[ConditionType['top10Condition'] = 8] = 'top10Condition';

    ConditionType[ConditionType['uniqueCondition'] = 9] = 'uniqueCondition';

    ConditionType[ConditionType['averageCondition'] = 10] = 'averageCondition';

    ConditionType[ConditionType['cellValueCondition'] = 11] = 'cellValueCondition';

    ConditionType[ConditionType['areaCondition'] = 12] = 'areaCondition';
    ConditionType[ConditionType['timeCondition'] = 13] = 'timeCondition';
    ConditionType[ConditionType['stateCondition'] = 14] = 'stateCondition';
})(ConditionType = exports.ConditionType || (exports.ConditionType = {}));


var RuleType;
(function (RuleType) {
    RuleType[RuleType['conditionRuleBase'] = 0] = 'conditionRuleBase';

    RuleType[RuleType['cellValueRule'] = 1] = 'cellValueRule';

    RuleType[RuleType['specificTextRule'] = 2] = 'specificTextRule';

    RuleType[RuleType['formulaRule'] = 3] = 'formulaRule';

    RuleType[RuleType['dateOccurringRule'] = 4] = 'dateOccurringRule';

    RuleType[RuleType['top10Rule'] = 5] = 'top10Rule';

    RuleType[RuleType['uniqueRule'] = 6] = 'uniqueRule';

    RuleType[RuleType['duplicateRule'] = 7] = 'duplicateRule';

    RuleType[RuleType['averageRule'] = 8] = 'averageRule';


    RuleType[RuleType['twoScaleRule'] = 10] = 'twoScaleRule';

    RuleType[RuleType['threeScaleRule'] = 11] = 'threeScaleRule';

    RuleType[RuleType['dataBarRule'] = 12] = 'dataBarRule';

    RuleType[RuleType['iconSetRule'] = 13] = 'iconSetRule';
    RuleType[RuleType['rowStateRule'] = 14] = 'rowStateRule';
    RuleType[RuleType['columnStateRule'] = 15] = 'columnStateRule';
})(RuleType = exports.RuleType || (exports.RuleType = {}));


var createDayBeginning = function (datetime) {
    return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), 0, 0, 0, 0);
};
var createDayEnding = function (datetime) {
    return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), 23, 59, 59, 999);
};
var setDate = function (datatime, value) {
    datatime.setDate(value);
};
var getDate = function (datatime) {
    return datatime.getDate();
};
var isEquals = function (expectedValue, value) {
    return expectedValue.getFullYear() === value.getFullYear() && expectedValue.getMonth() === value.getMonth() && expectedValue.getDate() === value.getDate();
};
var isAfter = function (expectedValue, value) {
    var date = createDayEnding(expectedValue);
    return value > date;
};
var isPreciseAfter = function (expectedValue, value) {
    return value > expectedValue;
};
var isBefore = function (expectedValue, value) {
    var date = createDayBeginning(expectedValue);
    return value < date;
};
var isPreciseBefore = function (expectedValue, value) {
    return value < expectedValue;
};
var isTimeEquals = function (d1, d2) {
    return d1.getHours() === d2.getHours() &&
        d1.getMinutes() === d2.getMinutes() &&
        d1.getSeconds() === d2.getSeconds() &&
        d1.getMilliseconds() === d2.getMilliseconds();
};
var isTimeAfter = function (d1, d2) {
    var t1 = new Date(1899, 11, 30, d1.getHours(), d1.getMinutes(), d1.getSeconds(), d1.getMilliseconds());
    var t2 = new Date(1899, 11, 30, d2.getHours(), d2.getMinutes(), d2.getSeconds(), d2.getMilliseconds());
    return t2 > t1;
};
var isTimeBefore = function (d1, d2) {
    return !isTimeAfter(d1, d2) && !isTimeEquals(d1, d2);
};
exports._createCondition = function (conditionType, compareType, expected, formula, customValueType, type, ranges, item1, item2) {
    return new Condition(conditionType, {
        compareType: compareType,
        expected: expected,
        formula: formula,
        customValueType: customValueType,
        type: type,
        ranges: ranges,
        item1: item1,
        item2: item2
    });
};
exports._DEFAULT_UNSET_STYLE = new Style();
var ps = ['conType', 'compareType', 'item1', 'item2', 'ignoreBlank', 'preciseCompareDate', 'expected', 'formula',
    'treatNullValueAsZero', 'integerValue', 'forceValue2Text', 'useWildCards', 'ignoreCase',
    'customValueType', 'expectTypeId', 'type', 'ranges', 'isPercent', 'regex'];


var Condition = (function () {
    function Condition(conditionType, args) {
        if (!args) {
            args = {};
        }
        var formula2 = args.formula;
        var self = this;
        self.offsetRow = 0;
        self.offsetCol = 0;
        self.conType((typeof conditionType === 'string') ? ConditionType[conditionType] : conditionType);
        if (!isNullOrUndefined(args.compareType)) {
            self._compareType(args.compareType);
        }
        if (!isNullOrUndefined(args.expected)) {
            self.expected(args.expected);
        }
        if (!isNullOrUndefined(formula2)) {
            self.formula((typeof formula2 === 'string') ? StringHelper_TrimStart($.trim(formula2), '=') : formula2);
        }
        if (!isNullOrUndefined(args.item1)) {
            self.item1(args.item1);
        }
        if (!isNullOrUndefined(args.item2)) {
            self.item2(args.item2);
        }
        if (!isNullOrUndefined(args.customValueType)) {
            self.customValueType(args.customValueType);
        }
        if (!isNullOrUndefined(args.type)) {
            self.type(args.type);
        }
        self.ranges(args.ranges);
        self._expr = keyword_null;
        self._stdevExpr = keyword_null;
    }
    Condition.prototype.context = function (context) {
        if (arguments.length === 1) {
            this._context = context;
            var item1 = this.item1(), item2 = this.item2();
            if (item1 && item1.context) {
                item1.context(context);
            }
            if (item2 && item2.context) {
                item2.context(context);
            }
        }
        return this._context;
    };
    Condition.prototype._setFlagForInitExpression = function (isFromJSON) {
        var self = this, item1 = self.item1(), item2 = self.item2();
        if (isFromJSON) {
            self._isFromJSON = true;
        }
        else {
            self._useReferenceStyle = true;
        }
        item1 && item1._setFlagForInitExpression(isFromJSON);
        item2 && item2._setFlagForInitExpression(isFromJSON);
    };
    Condition.prototype._removeFlagForInitExpression = function () {
        var self = this, item1 = self.item1(), item2 = self.item2();
        delete self._isFromJSON;
        delete self._useReferenceStyle;
        item1 && item1._removeFlagForInitExpression();
        item2 && item2._removeFlagForInitExpression();
    };
    Condition.prototype.initExpression = function (context, baseRow, baseColumn) {
        var item1 = this.item1(), item2 = this.item2();
        if (item1 && item1.initExpression) {
            item1.initExpression();
        }
        if (item2 && item2.initExpression) {
            item2.initExpression();
        }
        context = context || this._context;
        var formula = this._formula;
        if (!context || !formula || this._expr) {
            return;
        }
        if (this.ranges()) {
            var baseRowCol = getBaseRowBaseCol(this.ranges());
            baseRow = baseRowCol.r;
            baseColumn = baseRowCol.c;
        }
        else {
            baseRow = baseRow || 0;
            baseColumn = baseColumn || 0;
        }
        var calcService = context.getCalcService(), calcSource = context._getSheetSource();
        if (calcService && calcSource) {
            var forceA1 = false;

            if (this._isFromJSON) {
                forceA1 = !this._useReferenceStyle;
            }

            this._expr = calcService.parse(calcSource, formula, baseRow, baseColumn, false , true , forceA1);
        }
    };
    Condition.prototype.expression = function (expr, context, baseRow, baseColumn) {
        if (arguments.length === 1) {
            this._expr = expr;
            context = context || this._context;
            if (!expr) {
                this._formula = expr;
            }
            else if (context) {
                if (this.ranges()) {
                    var baseRowCol = getBaseRowBaseCol(this.ranges());
                    baseRow = baseRowCol.r;
                    baseColumn = baseRowCol.c;
                }
                else {
                    baseRow = baseRow || 0;
                    baseColumn = baseColumn || 0;
                }
                var calcService = context.getCalcService(), calcSource = context._getSheetSource();
                if (calcService && calcSource) {
                    this._formula = calcService.unparse(calcSource, expr, baseRow, baseColumn);
                }
            }
            return this._expr;
        }
        if (!this._expr) {
            this.initExpression(context, baseRow, baseColumn);
        }
        return this._expr;
    };
    Condition.prototype.getFormulaString = function (context, baseRow, baseColumn, forceA1) {
        context = context || this._context;
        var expr = this._expr, formula = this._formula;
        if (!context || !formula) {
            return formula;
        }
        if (!expr) {
            this.initExpression(context, baseRow, baseColumn);
            expr = this._expr;
        }
        if (formula && (expr.value && expr.value.type === 14 || expr.value2 && expr.value2.type === 14 )) {
            return formula;
        }
        var baseRowCol = getBaseRowBaseCol(this.ranges());
        baseRow = isNullOrUndefined(baseRow) ? baseRowCol.r : baseRow;
        baseColumn = isNullOrUndefined(baseColumn) ? baseRowCol.c : baseColumn;
        return context.getCalcService().unparse(context._getSheetSource(), expr, baseRow, baseColumn, keyword_undefined , !!forceA1 );
    };


    Condition.prototype.formula = function (formulaOrBaseRow, baseColumn, index) {
        if (typeof formulaOrBaseRow === 'string') {
            this._formula = formulaOrBaseRow;
            this._expr = keyword_null;
        }
        else {
            var item1 = this.item1(), item2 = this.item2();
            if (index === 0 && item1 && item1.formula) {
                return item1.formula(formulaOrBaseRow, baseColumn, index);
            }
            if (index === 1 && item2 && item2.formula) {
                return item2.formula(formulaOrBaseRow, baseColumn, index);
            }
            return this.getFormulaString(keyword_undefined, formulaOrBaseRow, baseColumn);
        }
    };


    Condition.prototype.adjustOffset = function (row, col) {
        var self = this;
        var item = self.item1();
        if (item && item.adjustOffset) {
            item.adjustOffset(row, col);
        }
        item = self.item2();
        if (item && item.adjustOffset) {
            item.adjustOffset(row, col);
        }
        self.offsetRow = row;
        self.offsetCol = col;
    };
    Condition.prototype.relationConditionEvaluate = function (evaluator, baseRow, baseColumn, actualValue1, actualValue2) {
        var self = this;
        function getConditionalFormatActualValue(item, actualValue) {
            if (evaluator && item && item.conType() === 3 ) {
                var style = evaluator.getActualStyle(baseRow, baseColumn, 3 , true );
                if (style) {
                    if (item._compareType() === 0 ) {
                        actualValue = style.backColor;
                    }
                    else if (item._compareType() === 1 ) {
                        actualValue = style.foreColor;
                    }
                }
            }
            return actualValue;
        }
        function getActualValue(item, actualValue) {
            if (item) {
                item.ignoreBlank(self.ignoreBlank());
                if (arguments.length < 5) {
                    return getConditionalFormatActualValue(item, actualValue1);
                }

                return actualValue;
            }
        }
        function getEvaluateResult(item, value) {
            return isNullOrUndefined(item) ? false : item.evaluate(evaluator, baseRow, baseColumn, value);
        }
        var value1 = getActualValue(self.item1(), actualValue1), value2 = getActualValue(self.item2(), actualValue2);


        var rs1 = getEvaluateResult(self.item1(), value1) ? 1 : 0, rs2 = getEvaluateResult(self.item2(), value2) ? 1 : 0;
        return (rs1 + rs2) > self._compareType();
    };


    Condition.prototype.cellValueConditionEvaluate = function (evaluator, baseRow, baseColumn, actualValue) {
        var expected = this.getExpected(evaluator, baseRow, baseColumn);
        if (expected === keyword_null && evaluator && evaluator._isDataValidator) {
            return true;
        }
        return this.cellValueConditionCheckCondition(expected, actualValue);
    };
    Condition.prototype.cellValueConditionCheckCondition = function (expectedValue, actualValue) {
        var self = this;
        var dActualValue = 0;
        var isNumber = false;
        var compareType = self._compareType();
        if (isNullOrUndefined(actualValue) && isNullOrUndefined(expectedValue)) {
            switch (compareType) {
                case GeneralComparisonOperators.equalsTo :
                case GeneralComparisonOperators.greaterThanOrEqualsTo :
                case GeneralComparisonOperators.lessThanOrEqualsTo :
                    return true;
                case GeneralComparisonOperators.notEqualsTo :
                case GeneralComparisonOperators.greaterThan :
                case GeneralComparisonOperators.lessThan :
                    return false;
                default:
                    return false;
            }
        }
        if (typeof expectedValue === 'boolean' || typeof actualValue === 'boolean') {
            return compareByType(compareType, actualValue, expectedValue);
        }
        var dValue = {};
        if (isNullOrUndefined(actualValue)) {
            if (self.treatNullValueAsZero()) {
                isNumber = true;
            }
            else {
                dActualValue = actualValue;
            }
        }
        else if (typeof actualValue === const_string && typeof expectedValue === 'number') {
            return compareByType(compareType, 1, 0);
        }
        else if (typeof actualValue !== 'boolean' && calcConvert_tryToDouble(actualValue, dValue)) {
            dActualValue = dValue.value;
            isNumber = !isNaN(dActualValue);
        }
        var doubleExpectedValue = 0.0, expIsNumber = false;
        if ((typeof expectedValue === 'number' || expectedValue) && calcConvert_tryToDouble(expectedValue, dValue)) {
            doubleExpectedValue = dValue.value;
            expIsNumber = true;
        }
        var mappedOperatorType = OperatorMap[compareType];
        if (isNumber) {
            if (!expIsNumber) {
                return evaluateOperator(mappedOperatorType, actualValue, expectedValue);
            }
            return compareByType(compareType, dActualValue, doubleExpectedValue);
        }
        else if (typeof actualValue === 'string') {
            if (expIsNumber) {
                return evaluateOperator(mappedOperatorType, actualValue, doubleExpectedValue);
            }
            if (typeof expectedValue === 'string') {
                return evaluateOperator(mappedOperatorType, actualValue, expectedValue);
            }

            return compareType === 1 ;
        }
        else if (isNullOrUndefined(actualValue)) {
            return compareType === GeneralComparisonOperators.notEqualsTo ;
        }
        return false;
    };


    Condition.prototype.numberConditionEvaluate = function (evaluator, baseRow, baseColumn, actualValue) {
        var expected = this.numberConditionGetExpected(evaluator, baseRow, baseColumn);
        if (expected === keyword_null && evaluator && evaluator._isDataValidator) {
            return true;
        }
        if (this.integerValue()) {
            if (isNaN(expected)) {
                expected = keyword_null;
            }
            else {
                expected = expected > 0 ? math_floor(expected) : math_ceil(expected);
            }
        }
        return this.numberConditionCheckCondition(expected, actualValue);
    };
    Condition.prototype.numberConditionCheckCondition = function (expectedValue, actualValue) {
        var self = this;


        if ((isNullOrUndefined(actualValue) || actualValue === '')) {
            if (self.ignoreBlank()) {
                return true;
            }
        }
        if (isNaN(actualValue)) {
            return false;
        }
        if (isNullOrUndefined(expectedValue)) {
            if (self.ignoreBlank()) {
                return true;
            }
            expectedValue = 0;
        }
        var doubleCellValue;
        try {
            doubleCellValue = isNullOrUndefined(actualValue) ? 0 : parseFloat(actualValue);
        }
        catch (e) {
            return false;
        }
        if (self.integerValue()) {
            var isValueInteger = ((doubleCellValue - math_floor(doubleCellValue)) === 0);
            if (!isValueInteger) {
                return false;
            }
        }
        return compareByType(self._compareType(), doubleCellValue, expectedValue);
    };
    Condition.prototype.numberConditionGetExpected = function (evaluator, baseRow, baseColumn) {
        var self = this;
        if (self._formula && self._formula.length > 0) {
            var calcService = evaluator._getCalcServiceInternal();
            if (!calcService) {
                return self.expected();
            }
            return calcService.evaluate(evaluator._getSheetSource(), self.expression(keyword_null, evaluator), baseRow, baseColumn);
        }
        return self.expected();
    };


    Condition.prototype.textConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        var self = this;
        var compareType = self.compareType();
        var ignoreCase = self.ignoreCase();
        function isEqualsValue(expectedValue, value) {
            return self.testTextByCondition(value, expectedValue, '^', '$', function () {
                if (ignoreCase) {
                    return expectedValue.toLowerCase() === value.toLowerCase();
                }
                return expectedValue === value;
            });
        }
        function isStartWith(expectedValue, value) {
            return self.testTextByCondition(value, expectedValue, '^', '', function () {
                return StringHelper_StartWith(value, expectedValue, ignoreCase);
            });
        }
        function isEndWith(expectedValue, value) {
            return self.testTextByCondition(value, expectedValue, '', '$', function () {
                return StringHelper_EndsWith(value, expectedValue, ignoreCase);
            });
        }
        function isContains(expectedValue, value) {
            return self.testTextByCondition(value, expectedValue, '', '', function () {
                return StringHelper_Contains(value, (expectedValue === keyword_undefined || expectedValue === keyword_null) ? '' : expectedValue, ignoreCase);
            });
        }
        if (!self.forceValue2Text() && isInstanceOf(actualObj, Date)) {
            if (compareType === TextCompareType.beginsWith
                || compareType === TextCompareType.endsWith
                || compareType === TextCompareType.contains ) {
                return false;
            }
            return compareType === TextCompareType.doesNotBeginWith
                || compareType === TextCompareType.doesNotEndWith
                || compareType === TextCompareType.doesNotContain ;
        }
        var actual = isNullOrUndefined(actualObj) ? '' : actualObj.toString();
        if (self.ignoreBlank() && (actual === '')) {
            return true;
        }
        var obj = this.getExpected(evaluator, baseRow, baseColumn);
        var expected = isNullOrUndefined(obj) ? '' : obj.toString();
        if (self.hasWildcard(expected)) {
            if (typeof actualObj === 'number') {
                return compareType === TextCompareType.doesNotBeginWith
                    || compareType === TextCompareType.doesNotContain
                    || compareType === TextCompareType.doesNotEndWith
                    || compareType === TextCompareType.notEqualsTo ;
            }
        }
        switch (compareType) {
            case TextCompareType.equalsTo :
                return isEqualsValue(expected, actual);
            case TextCompareType.notEqualsTo :
                return !isEqualsValue(expected, actual);
            case TextCompareType.beginsWith :
                return isStartWith(expected, actual);
            case TextCompareType.doesNotBeginWith :
                return !isStartWith(expected, actual);
            case TextCompareType.endsWith :
                return isEndWith(expected, actual);
            case TextCompareType.doesNotEndWith :
                return !isEndWith(expected, actual);
            case TextCompareType.contains :
                return isContains(expected, actual);
            case TextCompareType.doesNotContain :
                return !isContains(expected, actual);
            default:
                return false;
        }
    };
    Condition.prototype.hasWildcard = function (text) {
        return text.indexOf('*') > -1 || text.indexOf('?') > -1;
    };
    Condition.prototype.testTextByCondition = function (value, expected, prefix, suffix, fnNormalTest) {
        var useWildCards = this.useWildCards();
        if (!useWildCards) {
            return fnNormalTest();
        }
        if (this.regex()) {
            return RegexHelper._getReg(this.regex()).test(value);
        }
        var criteria = RegexHelper._getWildcardCriteria(expected);
        if (!criteria) {
            return fnNormalTest();
        }
        criteria = prefix + criteria + suffix;
        if (this.ignoreCase()) {
            return RegexHelper._getRegIgnoreCase(criteria).test(value);
        }
        return RegexHelper._getReg(criteria).test(value);
    };


    Condition.prototype.colorConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        function getColorFromString(colorStr) {
            return (isNullOrUndefined(colorStr) || colorStr === '') ? keyword_null : ColorHelper._fromString(colorStr);
        }
        var self = this;
        var expectedColor = getColorFromString(self.expected());
        if (!isNullOrUndefined(expectedColor) && expectedColor !== '') {
            var actualColor = getColorFromString(actualObj);
            if ((isNullOrUndefined(actualColor) || actualColor === '') && evaluator && evaluator.getDefaultStyle) {
                var defaultStyle = evaluator.getDefaultStyle();
                if (self._compareType() === ColorCompareType.backgroundColor ) {
                    actualColor = defaultStyle.backColor;
                }
                else if (self._compareType() === ColorCompareType.foregroundColor ) {
                    actualColor = defaultStyle.foreColor;
                }
            }
            if (!isNullOrUndefined(actualColor) && actualColor !== '') {
                return Common_1.Common._ColorHelper._equal(actualColor, expectedColor);
            }
        }
        else if (self.ignoreBlank() || (isNullOrUndefined(expectedColor) && isNullOrUndefined(actualObj))) {
            return true;
        }
        return false;
    };


    Condition.prototype.formulaConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        if (!hasCalc) {
            return false;
        }
        var self = this;
        if (self.customValueType() === CustomValueType.formula ) {
            evaluator._getSheetSource()._context = baseRow;
            var expected = self.getExpected(evaluator, baseRow, baseColumn);
            if (self.ignoreBlank() && (isNullOrUndefined(expected) || expected === '')) {
                return true;
            }
            var result = {};
            return calcConvert._tryToBool(expected, result) ? result.value : false;
        }
        var isError = calcConvert._isError;
        switch (self.customValueType()) {
            case CustomValueType.empty :
                return isNullOrUndefined(actualObj) || actualObj === '';
            case CustomValueType.nonEmpty :
                return !isNullOrUndefined(actualObj) && actualObj !== '';
            case CustomValueType.error :
                return isError(actualObj);
            case CustomValueType.nonError :
                return !isError(actualObj);
            default:
                return false;
        }
    };
    Condition.prototype.formulaConditionGetExpected = function (evaluator, baseRow, baseCol) {
        var self = this;
        if (self._formula && self._formula.length > 0) {
            var calcService = evaluator._getCalcServiceInternal();
            if (!calcService) {
                return self.expected();
            }
            var v = calcService._evaluateParsedFormula(evaluator._getSheetSource(), self.expression(keyword_undefined, evaluator), CalcEngine_1._createCellIdentity(baseRow, baseCol), true);
            var rowCount = void 0, colCount = void 0, resultArray = void 0, r = void 0, c = void 0;
            if (calcConvert._isReference(v)) {
                rowCount = v.getRowCount(0);
                colCount = v.getColumnCount(0);
                resultArray = [];
                for (r = 0; r < rowCount; r++) {
                    resultArray[r] = [];
                    for (c = 0; c < colCount; c++) {
                        resultArray[r][c] = v.getValue(0, r, c);
                    }
                }
                v = resultArray;
            }
            else if (calcConvert._isArray(v)) {
                rowCount = v.getRowCount();
                colCount = v.getColumnCount();
                resultArray = [];
                for (r = 0; r < rowCount; r++) {
                    resultArray[r] = [];
                    for (c = 0; c < colCount; c++) {
                        resultArray[r][c] = v.getValue(r, c);
                    }
                }
                v = resultArray;
            }
            if (isInstanceOf(v, Array)) {
                return v[0][0];
            }
            return v;
        }
        return self.expected();
    };


    Condition.prototype.dateOrTimeEvaluate = function (evaluator, baseRow, baseColumn, actualObj, isEqualsFn, isBeforeFn, isAfterFn) {
        var self = this;
        if ((isNullOrUndefined(actualObj) || actualObj === '') && self.ignoreBlank()) {
            return true;
        }
        var tempObj = actualObj;
        if (!(isInstanceOf(actualObj, Date))) {
            if (self._compareType() === DateCompareType.notEqualsTo ) {
                return true;
            }
            if (isNullOrUndefined(actualObj)) {
                tempObj = dateTimeHelper._fromOADate(0);
            }
            else {
                return false;
            }
        }
        var expected = keyword_null;
        var obj = this.getExpected(evaluator, baseRow, baseColumn);
        if (isInstanceOf(obj, Date)) {
            expected = obj;
        }
        else if (typeof obj === 'string') {
            expected = dateTimeHelper._parseLocale(obj);
        }
        else if (typeof (obj) === 'number') {
            expected = dateTimeHelper._fromOADate(obj);
        }
        if (isNullOrUndefined(expected)) {
            return !!self.ignoreBlank();
        }
        switch (self._compareType()) {
            case DateCompareType.equalsTo :
                return isEqualsFn(expected, tempObj);
            case DateCompareType.notEqualsTo :
                return !isEqualsFn(expected, tempObj);
            case DateCompareType.after :
                return isAfterFn(expected, tempObj);
            case DateCompareType.afterEqualsTo :
                return isAfterFn(expected, tempObj) || isEqualsFn(expected, tempObj);
            case DateCompareType.before :
                return isBeforeFn(expected, tempObj);
            case DateCompareType.beforeEqualsTo :
                return isBeforeFn(expected, tempObj) || isEqualsFn(expected, tempObj);
            default:
                return false;
        }
    };
    Condition.prototype.dateConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        var precise = this.preciseCompareDate();
        return this.dateOrTimeEvaluate(evaluator, baseRow, baseColumn, actualObj, isEquals, precise ? isPreciseBefore : isBefore, precise ? isPreciseAfter : isAfter);
    };
    Condition.prototype.timeConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        return this.dateOrTimeEvaluate(evaluator, baseRow, baseColumn, actualObj, isTimeEquals, isTimeBefore, isTimeAfter);
    };

    Condition.prototype.dateExConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        var expected = this._getExpectedInt(evaluator, baseRow, baseColumn);
        if (!isNullOrUndefined(expected)) {
            return this.dateExConditionCheckCondition(expected, actualObj);
        }
        return false;
    };
    Condition.prototype.getExConditionDateScope = function (expected) {
        var from = keyword_null;
        var to = keyword_null;
        var now = new Date();
        var now2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        switch (expected) {
            case DateOccurringType.last7Days :
                setDate(now2, getDate(now2) - 6);
                from = createDayBeginning(now2);
                to = createDayEnding(now);
                break;
            case DateOccurringType.yesterday :
                setDate(now2, getDate(now2) - 1);
                from = createDayBeginning(now2);
                to = createDayEnding(now2);
                break;
            case DateOccurringType.today :
                from = createDayBeginning(now);
                to = createDayEnding(now);
                break;
            case DateOccurringType.tomorrow :
                setDate(now2, getDate(now2) + 1);
                from = createDayBeginning(now2);
                to = createDayEnding(now2);
                break;
            case DateOccurringType.lastWeek :
                var firstDayOfLastWeek = now;
                setDate(firstDayOfLastWeek, getDate(now) - now.getDay() - 7);
                var lastDayOfLastWeek = now2;
                lastDayOfLastWeek.setDate(getDate(now2) - now2.getDay() - 1);
                from = createDayBeginning(firstDayOfLastWeek);
                to = createDayEnding(lastDayOfLastWeek);
                break;
            case DateOccurringType.thisWeek :
                var firstDayOfThisWeek = now;
                setDate(firstDayOfThisWeek, getDate(now) - now.getDay());
                var lastDayOfThisWeek = now2;
                setDate(lastDayOfThisWeek, getDate(now2) - now2.getDay() + 6);
                from = createDayBeginning(firstDayOfThisWeek);
                to = createDayEnding(lastDayOfThisWeek);
                break;
            case DateOccurringType.nextWeek :
                var firstDayOfNextWeek = now;
                setDate(firstDayOfNextWeek, getDate(now) - now.getDay() + 7);
                var lastDayOfNextWeek = now2;
                setDate(lastDayOfNextWeek, getDate(now2) - now2.getDay() + 13);
                from = createDayBeginning(firstDayOfNextWeek);
                to = createDayEnding(lastDayOfNextWeek);
                break;
            case DateOccurringType.lastMonth :
                var firstDayOfLastMonth = now;
                setDate(firstDayOfLastMonth, 1);
                firstDayOfLastMonth.setMonth(now.getMonth() - 1);
                var lastDayOfLastMonth = now2;
                setDate(lastDayOfLastMonth, 0);
                from = createDayBeginning(firstDayOfLastMonth);
                to = createDayEnding(lastDayOfLastMonth);
                break;
            case DateOccurringType.thisMonth :
                var firstDayOfThisMonth = now;
                setDate(firstDayOfThisMonth, 1);
                var lastDayOfThisMonth = now2;
                setDate(lastDayOfThisMonth, 1);
                lastDayOfThisMonth.setMonth(now2.getMonth() + 1);
                setDate(lastDayOfThisMonth, 0);
                from = createDayBeginning(firstDayOfThisMonth);
                to = createDayEnding(lastDayOfThisMonth);
                break;
            case DateOccurringType.nextMonth :
                var firstDayOfNextMonth = now;
                setDate(firstDayOfNextMonth, 1);
                firstDayOfNextMonth.setMonth(now.getMonth() + 1);
                var lastDayOfNextMonth = now2;
                setDate(lastDayOfNextMonth, 1);
                lastDayOfNextMonth.setMonth(now2.getMonth() + 2);
                setDate(lastDayOfNextMonth, 0);
                from = createDayBeginning(firstDayOfNextMonth);
                to = createDayEnding(lastDayOfNextMonth);
                break;
            case DateOccurringType.nextQuarter :
                var firstDayOfNextQuarter = now;
                var nowMonth = firstDayOfNextQuarter.getMonth(), delta = nowMonth % 3;
                firstDayOfNextQuarter.setDate(1);
                firstDayOfNextQuarter.setMonth(nowMonth - delta + 3);
                var lastDayOfNextQuarter = now2, lastMonthDaysNextQuarter = void 0;
                lastDayOfNextQuarter.setDate(1);
                lastDayOfNextQuarter.setMonth(nowMonth - delta + 3 + 2);

                if (lastDayOfNextQuarter.getMonth() === 2 || lastDayOfNextQuarter.getMonth() === 11 ) {
                    lastMonthDaysNextQuarter = 31;
                }
                else {
                    lastMonthDaysNextQuarter = 30;
                }
                lastDayOfNextQuarter.setDate(lastMonthDaysNextQuarter);
                from = createDayBeginning(firstDayOfNextQuarter);
                to = createDayEnding(lastDayOfNextQuarter);
                break;
            case DateOccurringType.thisQuarter :
                var firstDayOfThisQuarter = now;
                var nowMonthThisQuarter = firstDayOfThisQuarter.getMonth(), deltaThisQuarter = nowMonthThisQuarter % 3;
                firstDayOfThisQuarter.setDate(1);
                firstDayOfThisQuarter.setMonth(nowMonthThisQuarter - deltaThisQuarter);
                var lastDayOfThisQuarter = now2, lastMonthDaysOfThisQuarter = void 0;
                lastDayOfThisQuarter.setDate(1);
                lastDayOfThisQuarter.setMonth(nowMonthThisQuarter - deltaThisQuarter + 2);
                if (lastDayOfThisQuarter.getMonth() === 2 || lastDayOfThisQuarter.getMonth() === 11 ) {
                    lastMonthDaysOfThisQuarter = 31;
                }
                else {
                    lastMonthDaysOfThisQuarter = 30;
                }
                lastDayOfThisQuarter.setDate(lastMonthDaysOfThisQuarter);
                from = createDayBeginning(firstDayOfThisQuarter);
                to = createDayEnding(lastDayOfThisQuarter);
                break;
            case DateOccurringType.lastQuarter :
                var firstDayOfLastQuarter = now;
                var nowMonthLastQuarter = firstDayOfLastQuarter.getMonth(), deltaLastQuarter = nowMonthLastQuarter % 3;
                firstDayOfLastQuarter.setDate(1);
                firstDayOfLastQuarter.setMonth(nowMonthLastQuarter - deltaLastQuarter - 3);
                var lastDayOfLastQuarter = now2, daysLastQuarter = void 0;
                lastDayOfLastQuarter.setDate(1);
                lastDayOfLastQuarter.setMonth(nowMonthLastQuarter - deltaLastQuarter - 3 + 2);
                if (lastDayOfLastQuarter.getMonth() === 2 || lastDayOfLastQuarter.getMonth() === 11 ) {
                    daysLastQuarter = 31;
                }
                else {
                    daysLastQuarter = 30;
                }
                lastDayOfLastQuarter.setDate(daysLastQuarter);
                from = createDayBeginning(firstDayOfLastQuarter);
                to = createDayEnding(lastDayOfLastQuarter);
                break;
            case DateOccurringType.nextYear :
                var firstDayOfNextYear = now;

                firstDayOfNextYear.setDate(1);
                firstDayOfNextYear.setFullYear(firstDayOfNextYear.getFullYear() + 1);
                firstDayOfNextYear.setMonth(0);
                var lastDayOfNextYear = now2;
                lastDayOfNextYear.setFullYear(lastDayOfNextYear.getFullYear() + 1);
                lastDayOfNextYear.setMonth(11);
                lastDayOfNextYear.setDate(31);
                from = createDayBeginning(firstDayOfNextYear);
                to = createDayEnding(lastDayOfNextYear);
                break;
            case DateOccurringType.thisYear :
                var firstDayOfThisYear = now;
                firstDayOfThisYear.setDate(1);
                firstDayOfThisYear.setMonth(0);
                var lastDayOfThisYear = now2;
                lastDayOfThisYear.setMonth(11);
                lastDayOfThisYear.setDate(31);
                from = createDayBeginning(firstDayOfThisYear);
                to = createDayEnding(lastDayOfThisYear);
                break;
            case DateOccurringType.lastYear :
                var firstDayOfLastYear = now;
                firstDayOfLastYear.setFullYear(firstDayOfLastYear.getFullYear() - 1);
                firstDayOfLastYear.setDate(1);
                firstDayOfLastYear.setMonth(0);
                var lastDayOfLastYear = now2;
                lastDayOfLastYear.setFullYear(lastDayOfLastYear.getFullYear() - 1);
                lastDayOfLastYear.setMonth(11);
                lastDayOfLastYear.setDate(31);
                from = createDayBeginning(firstDayOfLastYear);
                to = createDayEnding(lastDayOfLastYear);
                break;
            default:
                break;
        }
        return {
            from: from,
            to: to
        };
    };
    Condition.prototype.dateExConditionCheckCondition = function (expected, actualValue) {
        function isEqualsQuarter(expectedValue, actualDateTime) {
            switch (expectedValue) {
                case QuarterType.quarter1 :
                    return actualDateTime.getMonth() >= 0 && actualDateTime.getMonth() <= 2;
                case QuarterType.quarter2 :
                    return actualDateTime.getMonth() >= 3 && actualDateTime.getMonth() <= 5;
                case QuarterType.quarter3 :
                    return actualDateTime.getMonth() >= 6 && actualDateTime.getMonth() <= 8;
                case QuarterType.quarter4 :
                    return actualDateTime.getMonth() >= 9 && actualDateTime.getMonth() <= 11;
                default:
                    return false;
            }
        }
        var self = this;
        var actual = actualValue;
        if (self.ignoreBlank() && (isNullOrUndefined(actual) || actual === '')) {
            return true;
        }
        try {
            actual = calcConvert._toDateTime(actual);
        }
        catch (err) {
            return false;
        }
        var expectedNumber;
        var expectTypeId = self.expectTypeId();
        if (expectTypeId === DateExConditionExpectType.dateOccurring) {
            var dateScope = this.getExConditionDateScope(expected), from = dateScope.from, to = dateScope.to;
            if (!isNullOrUndefined(from) && !isNullOrUndefined(to)) {
                var condition1 = exports._createCondition(ConditionType.dateCondition , DateCompareType.afterEqualsTo , from, keyword_null);
                var condition2 = exports._createCondition(ConditionType.dateCondition , DateCompareType.beforeEqualsTo , to, keyword_null);
                var condition = exports._createCondition(ConditionType.relationCondition , LogicalOperators.and , keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, condition1, condition2);
                return condition.evaluate(keyword_null, 0, 0, actual);
            }
        }
        else {
            expectedNumber = self._getExpectedInt(keyword_null, 0, 0);
            if (!isNullOrUndefined(expectedNumber)) {
                if (expectTypeId === DateExConditionExpectType.yearOccurring) {
                    return expectedNumber === actual.getFullYear();
                }
                else if (expectTypeId === DateExConditionExpectType.quarterOccurring) {
                    return isEqualsQuarter(expectedNumber, actual);
                }
                else if (expectTypeId === DateExConditionExpectType.monthOccurring) {
                    return expectedNumber === actual.getMonth();
                }
                else if (expectTypeId === DateExConditionExpectType.weekOccurring) {
                    return expectedNumber === actual.getDay();
                }
                else if (expectTypeId === DateExConditionExpectType.dayOccurring) {
                    return expectedNumber === getDate(actual);
                }
                else if (expectTypeId === DateExConditionExpectType.yearTodate ) {
                    var start = new Date(), end = new Date();
                    start.setMonth(0, 1);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(23, 59, 59, 59);
                    return start <= actual && actual <= end;
                }
            }
        }
        return false;
    };


    Condition.prototype.textLengthConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        if (isNullOrUndefined(actualObj) || actualObj === '') {
            if (this.ignoreBlank()) {
                return true;
            }
        }
        var actualLen = isNullOrUndefined(actualObj) ? 0 : (actualObj.toString()).length;
        var expectedLen = this._getExpectedInt(evaluator, baseRow, baseColumn);
        if (typeof expectedLen === 'number') {
            return compareByType(this._compareType(), actualLen, expectedLen);
        }
        return false;
    };


    Condition.prototype.top10ConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        var self = this;
        if (isNullOrUndefined(actualObj) || actualObj === '') {
            return self.ignoreBlank();
        }
        var expectedRank = self._getExpectedInt(evaluator, baseRow, baseColumn);
        if (!isNullOrUndefined(expectedRank)) {
            var values = void 0;
            if (self._needCache) {
                if (isNullOrUndefined(self._cacheValue)) {
                    self._cacheValue = self.getTopValues(evaluator, expectedRank, self.ranges());
                }
                values = self._cacheValue;
            }
            else {
                values = self.getTopValues(evaluator, expectedRank, self.ranges());
            }
            if (values) {
                var dactual = 0;
                try {
                    dactual = self._toDouble(actualObj);
                }
                catch (ex) {
                    return false;
                }
                if (arrayHelper._contains(values, dactual)) {
                    return true;
                }
            }
        }
        return false;
    };
    Condition.prototype._getExpectedInt = function (evaluator, baseRow, baseColumn) {
        var obj = this.getExpected(evaluator, baseRow, baseColumn);
        obj = parseInt(obj, 10);
        return (isNaN(obj) || !isFinite(obj)) ? keyword_null : obj;
    };
    Condition.prototype.adjustRange = function (range, sheet) {
        return createRange(range.row, range.col, Math.min(getRowCount(range), sheet.getRowCount()), Math.min(getColCount(range), sheet.getColumnCount()));
    };
    Condition.prototype.getTopValues = function (evaluator, rank, ranges) {
        var factor = this.type() === 0 ? 1 : -1;
        var values = [];
        if (!ranges) {
            return values;
        }
        var actualRanges = this._cloneToActualRanges(evaluator, ranges);
        var rangeCount = arrayHelper_getLength(actualRanges), range, row, column, doubleValue;
        for (var i = 0; i < rangeCount; i++) {
            range = this.adjustRange(actualRanges[i], evaluator);
            for (var r = 0; r < getRowCount(range); r++) {
                row = r + range.row;
                for (var c = 0; c < getColCount(range); c++) {
                    column = c + range.col;
                    doubleValue = this._toDouble(evaluator.getValue(row, column));
                    if (!isNullOrUndefined(doubleValue)) {
                        values.push(doubleValue);
                    }
                }
            }
        }
        values.sort(function (a, b) {
            return (b - a) * factor;
        });
        if (arrayHelper_getLength(values) > rank) {
            values = values.slice(0, rank);
        }
        return values;
    };
    Condition.prototype._toDouble = function (value) {
        if (((typeof value === 'number') || (isInstanceOf(value, Date))) && hasCalc) {
            return calcConvert_toDouble(value);
        }
        return keyword_null;
    };


    Condition.prototype.uniqueConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        var self = this;
        var value = actualObj;
        if (isNullOrUndefined(value) || value === '') {
            return self.ignoreBlank();
        }
        if (hasCalc && calcConvert_isNumber(value) && !isIncludeSpecialChar(value)) {
            value = calcConvert_toDouble(value);
        }
        var obj = this.getExpected(evaluator, baseRow, baseColumn);
        var result = {};
        calcConvert._tryToBool(obj, result);
        var expectDuplicated = result.value;
        if (!isNullOrUndefined(expectDuplicated)) {
            var cached = self.duplicatedArrayCached || self.getDuplicated(evaluator, self.ranges());
            if (!isNullOrUndefined(cached) && arrayHelper._contains(cached, value)) {
                return expectDuplicated === true;
            }
            return expectDuplicated !== true;
        }
        return false;
    };
    Condition.prototype.getDuplicated = function (evaluator, ranges) {
        var duplicated = [];
        var obj = {};
        var actualRanges = this._cloneToActualRanges(evaluator, ranges);
        if (actualRanges) {
            var length_2 = arrayHelper_getLength(actualRanges);
            for (var i = 0; i < length_2; i++) {
                var cellrange = actualRanges[i];
                cellrange = this.adjustRange(cellrange, evaluator);
                var rowCount = getRowCount(cellrange), colCount = getColCount(cellrange);
                for (var r = 0; r < rowCount; r++) {
                    var row = r + cellrange.row;
                    for (var c = 0; c < colCount; c++) {
                        var column = c + cellrange.col;
                        var o = evaluator.getValue(row, column, 3);
                        if (!isNullOrUndefined(o) && hasCalc && calcConvert_isNumber(o) && !isIncludeSpecialChar(o)) {
                            o = calcConvert_toDouble(o);
                        }
                        var temp = obj[o];
                        if (!temp) {
                            obj[o] = 1;
                        }
                        else if (temp === 1) {
                            duplicated.push(o);
                        }
                    }
                }
            }
        }
        return duplicated;
    };
    Condition.prototype._containsKey = function (map, key) {
        var length = map.length;
        for (var i = 0; i < length; i++) {
            if (map[i].key === key) {
                return true;
            }
        }
        return false;
    };


    Condition.prototype.averageConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        if (!hasCalc) {
            return false;
        }
        var self = this;
        if (self.ignoreBlank() && (isNullOrUndefined(actualObj) || actualObj === '')) {
            return true;
        }
        self._rebuildFormula();

        var obj;
        if (self._needCache) {
            if (isNullOrUndefined(self._cacheValue)) {
                self._cacheValue = self.getExpected(evaluator, baseRow, baseColumn);
            }
            obj = self._cacheValue;
        }
        else {
            obj = self.getExpected(evaluator, baseRow, baseColumn);
        }
        var result = {};
        var averageValue = calcConvert_tryToDouble(obj, result) ? result.value : NaN;
        var stddevValue = keyword_null;
        var stddevObjValue = self._stdevExpr ? self._getExpectedByExpression(evaluator, self._stdevExpr, baseRow, baseColumn) : keyword_null;
        if (!isNullOrUndefined(stddevObjValue)) {
            result = {};
            stddevValue = calcConvert_tryToDouble(stddevObjValue, result) ? result.value : NaN;
        }
        if (calcConvert_isNumber(actualObj)) {
            var cellValue = calcConvert_toDouble(actualObj);
            if (!isNaN(averageValue)) {
                var isDevNaN = isNaN(stddevValue);
                switch (self.type()) {
                    case AverageConditionType.above :
                        return cellValue > averageValue;
                    case AverageConditionType.below :
                        return cellValue < averageValue;
                    case AverageConditionType.equalOrAbove :
                        return cellValue >= averageValue;
                    case AverageConditionType.equalOrBelow :
                        return cellValue <= averageValue;
                    case AverageConditionType.above1StdDev :
                        return isDevNaN ? false : cellValue > (averageValue + stddevValue);
                    case AverageConditionType.below1StdDev :
                        return isDevNaN ? false : cellValue < (averageValue - stddevValue);
                    case AverageConditionType.above2StdDev :
                        return isDevNaN ? false : cellValue > (averageValue + 2 * stddevValue);
                    case AverageConditionType.below2StdDev :
                        return isDevNaN ? false : cellValue < (averageValue - 2 * stddevValue);
                    case AverageConditionType.above3StdDev :
                        return isDevNaN ? false : cellValue > (averageValue + 3 * stddevValue);
                    case AverageConditionType.below3StdDev :
                        return isDevNaN ? false : cellValue < (averageValue - 3 * stddevValue);
                    default:
                        return false;
                }
            }
        }
        return false;
    };
    Condition.prototype._rebuildFormula = function () {
        var self = this;
        if (self.ranges()) {
            self._expr = self._createExpression('AVERAGE', self.ranges());

            if (self.type() >= 4 && self.type() <= 9) {
                self._stdevExpr = self._createExpression('STDEV', self.ranges());
            }
        }
    };
    Condition.prototype._createExpression = function (name, parameters) {
        if (!hasCalc) {
            return keyword_null;
        }
        var averageFunc = Functions.findGlobalFunction(name);
        if (averageFunc) {
            var args = [];
            var length_3 = arrayHelper_getLength(parameters);
            for (var i = 0; i < length_3; i++) {
                args[i] = createExpression(parameters[i]);
            }
            return CalcEngine._createFunctionExpression(averageFunc, args);
        }
        return keyword_null;
    };
    Condition.prototype.averageConditionGetExpected = function (evaluator, baseRow, baseColumn) {
        var calcService = evaluator._getCalcServiceInternal();
        if (!calcService) {
            return keyword_null;
        }
        return calcService._evaluateParsedFormula(evaluator._getSheetSource(), this.expression(keyword_undefined, evaluator), CalcEngine_1._createCellIdentity(baseRow, baseColumn), false);
    };
    Condition.prototype._cacheConditionExpected = function () {
        var conType = this.conType();
        if (conType === ConditionType.averageCondition || conType === ConditionType.top10Condition ) {
            this._needCache = true;
        }
    };
    Condition.prototype._clearConditionExpectedCache = function () {
        var self = this;
        self._needCache = false;
        self._cacheValue = keyword_undefined;
    };
    Condition.prototype._getExpectedByExpression = function (evaluator, expression, baseRow, baseColumn) {
        var calcService = evaluator._getCalcServiceInternal();
        if (!calcService) {
            return keyword_null;
        }
        return calcService._evaluateParsedFormula(evaluator._getSheetSource(), expression, CalcEngine_1._createCellIdentity(baseRow, baseColumn), false);
    };


    Condition.prototype._concatArray = function (destArray, array) {
        var temp, i;
        for (i = 0; i < arrayHelper_getLength(array); i++) {
            temp = array[i];
            if (isInstanceOf(temp, Array) && arrayHelper_getLength(temp) > 0) {
                if (arrayHelper_getLength(array) > 1) {
                    destArray.push(temp[0]);
                }
                else {
                    destArray.push.apply(destArray, temp);
                }
            }
            else {
                destArray.push(temp);
            }
        }
    };


    Condition.prototype.getValidList = function (evaluator, baseRow, baseColumn) {
        var valueList = [];
        var list = this.getValidListImp(evaluator, baseRow, baseColumn);
        for (var i = 0, length_4 = arrayHelper_getLength(list); i < length_4; i++) {
            valueList.push(list[i].value);
        }
        return valueList;
    };
    Condition.prototype._listFromFormula = function () {
        return this._formula && this._formula.length > 0;
    };
    Condition.prototype.getValidListImp = function (evaluator, baseRow, baseColumn) {
        var self = this;
        var validValuesTemp = [];
        if (self._formula && self._formula.length > 0) {
            var obj = self.getExpected(evaluator, baseRow, baseColumn);
            if (isInstanceOf(obj, Array)) {
                self._concatArray(validValuesTemp, obj);
            }
            else {
                validValuesTemp.push(obj);
            }
        }
        else if (self.expected() && self.expected().length > 0) {
            var source = self.expected();
            var changeSource = source.replace(/\\,/g, String.fromCharCode(206));
            var dataArray = changeSource.split(',');
            if (dataArray) {
                for (var i = 0; i < arrayHelper_getLength(dataArray); i++) {
                    var data = dataArray[i];
                    if (isNullOrUndefined(data)) {
                        continue;
                    }
                    var s = new RegExp(String.fromCharCode(206), 'g');
                    var dataTemp = $.trim(data).replace(s, ',');
                    if (dataTemp !== '') {
                        validValuesTemp.push({ text: dataTemp, value: dataTemp });
                    }
                }
            }
        }
        return validValuesTemp;
    };
    Condition.prototype.areaConditionEvaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        function _equals(v1, v2, caseSensitive) {
            if (isInstanceOf(v1, Date) && isInstanceOf(v2, Date)) {
                return v1.valueOf() === v2.valueOf();
            }
            if (!caseSensitive && typeof v1 === 'string' && typeof v2 === 'string') {
                return v1.toLowerCase() === v2.toLowerCase();
            }
            return v1 === v2;
        }
        var self = this;
        if (isNullOrUndefined(actualObj) || actualObj === '') {
            return self.ignoreBlank() === true;
        }
        var valids = self.getValidList(evaluator, baseRow, baseColumn);


        for (var i = 0; i < arrayHelper_getLength(valids); i++) {
            var obj = valids[i];
            if (isNullOrUndefined(obj) && isNullOrUndefined(actualObj)) {
                return true;
            }
            if (self._formula) {
                if (_equals(obj, actualObj, false)) {
                    return true;
                }
            }
            else {
                var style = evaluator.getActualStyle(baseRow, baseColumn, 3 , true );
                var parsedValue = util._parseText2Value(style, obj, true);
                if (_equals(parsedValue, actualObj, true)) {
                    return true;
                }
            }
        }
        return false;
    };
    Condition.prototype.areaConditionGetExpected = function (evaluator, baseRow, baseColumn) {
        var self = this;
        var arrayValue = [];
        if (self._formula) {
            var rowCount = void 0, colCount = void 0, r = void 0, c = void 0, value = void 0, text = void 0;
            var calcService = evaluator._getCalcServiceInternal();
            if (!calcService) {
                return arrayValue;
            }


            var v = calcService._evaluateParsedFormula(evaluator._getSheetSource(), self.expression(keyword_undefined, evaluator), CalcEngine_1._createCellIdentity(baseRow, baseColumn), true);
            if (calcConvert._isReference(v)) {
                rowCount = v.getRowCount(0);
                colCount = v.getColumnCount(0);

                var row = v.getRow(0), col = v.getColumn(0), sheet = v._source && v._source._sheet;
                if (sheet) {
                    var sRowCount = sheet.getRowCount(), sColCount = sheet.getColumnCount();
                    rowCount = rowCount > sRowCount ? math_max(sRowCount - row, 0) : rowCount;
                    colCount = colCount > sColCount ? math_max(sColCount - col, 0) : colCount;
                }
                for (r = 0; r < rowCount; r++) {
                    arrayValue[r] = [];
                    for (c = 0; c < colCount; c++) {
                        value = v.getValue(0, r, c);
                        text = sheet ? sheet.getText(row + r, col + c) : value;
                        arrayValue[r][c] = { value: value, text: text };
                    }
                }
            }
            else if (calcConvert._isArray(v)) {
                rowCount = v.getRowCount();
                colCount = v.getColumnCount();
                for (r = 0; r < rowCount; r++) {
                    arrayValue[r] = [];
                    for (c = 0; c < colCount; c++) {
                        value = v.getValue(r, c);
                        arrayValue[r][c] = { value: value, text: value };
                    }
                }
            }
        }
        else {
            arrayValue.push({ value: self.expected(), text: self.expected() });
        }
        return arrayValue;
    };
    Condition.prototype.stateConditionEvaluate = function (evaluator, baseRow, baseColumn, actualValue) {
        var expected = this.expected();
        if (isNullOrUndefined(actualValue) || isNullOrUndefined(expected) || isNaN(actualValue) || isNaN(actualValue)) {
            return false;
        }
        return (actualValue & expected) > 0;
    };


    Condition.prototype.reset = function () {
        var self = this;
        self.ignoreBlank(false);
        self.preciseCompareDate(false);
        self._compareType(1) ;
        self.item1(keyword_null);
        self.item2(keyword_null);
        self.value1 = keyword_null;
        self.value2 = keyword_null;
        self.expected(keyword_null);
        self._compareType(0) ;
        self.integerValue(false);
        self.operator = 0 ;
        self.text = '';
        self._compareType(0) ;
        self.useWildCards(true);
        self.ignoreCase(false);
        self.forceValue2Text(false);
        self.customValueType(0) ;
        self._expr = keyword_null;
        self.type(0) ;
        this.expectTypeId(0);
        self.ranges(keyword_null);
        self.isPercent(false);
        self.regex(keyword_null);
        switch (self.conType()) {
            case ConditionType.relationCondition :
                self.ignoreBlank(false);
                self._compareType(1) ;
                break;
            case ConditionType.numberCondition :
                self._compareType(0) ;
                self.integerValue(false);
                break;
            case ConditionType.textCondition :
                self._compareType(0) ;
                self.useWildCards(true);
                self.forceValue2Text(false);
                break;
            case ConditionType.colorCondition :
                self._compareType(0) ;
                break;
            case ConditionType.formulaCondition :
                self.customValueType(0) ;
                self._stdevExpr = keyword_null;
                break;
            case ConditionType.dateCondition:
            case ConditionType.timeCondition:
                self._compareType(0) ;
                break;
            case ConditionType.dateExCondition :
                self.expectTypeId(0);
                break;
            case ConditionType.textLengthCondition :
                self._compareType(0) ;
                break;
            case ConditionType.top10Condition :
                self.type(0) ;
                break;
            case ConditionType.averageCondition :
                self.type(0) ;
                break;
            case ConditionType.cellValueCondition :
                self.operator = 6 ;
                break;
            case ConditionType.areaCondition :
                break;
            default:
                break;
        }
    };


    Condition.prototype.evaluate = function (evaluator, baseRow, baseColumn, actualObj) {
        var conditionType = this.conType();
        if (isNullOrUndefined(conditionType)) {
            return false;
        }
        return this[ConditionType[conditionType] + 'Evaluate'](evaluator, baseRow, baseColumn, actualObj);
    };
    Condition.prototype.getExpectedNormal = function (evaluator, baseRow, baseColumn, parseRow, parseColumn, convertNullToZero) {
        var self = this, formula = self._formula, expected = self.expected();
        if (formula) {
            var calcService = evaluator._getCalcServiceInternal();
            if (!calcService) {
                return expected;
            }

            return calcService._evaluateParsedFormula(evaluator._getSheetSource(), self.expression(keyword_undefined, evaluator), CalcEngine_1._createCellIdentity(baseRow, baseColumn), false, convertNullToZero);
        }
        return expected;
    };


    Condition.prototype.getExpected = function (evaluator, baseRow, baseColumn) {
        var self = this;
        switch (self.conType()) {
            case 2 :
                return self.getExpectedNormal(evaluator, baseRow, baseColumn, baseRow - self.offsetRow, baseColumn - self.offsetCol, false);
            case 5 :
            case 6 :
            case 7 :
            case 9 :
            case 11 :
            case 13 :
                return self.getExpectedNormal(evaluator, baseRow, baseColumn, baseRow - self.offsetRow, baseColumn - self.offsetCol, false);
            case 8 :
                return self.getExpectedNormal(evaluator, baseRow, baseColumn, baseRow, baseColumn);
            case 0 :
                return keyword_null;
            case 1 :
                return self.numberConditionGetExpected(evaluator, baseRow, baseColumn);
            case 3 :
                return keyword_null;
            case 4 :
                return self.formulaConditionGetExpected(evaluator, baseRow, baseColumn);
            case 10 :
                return self.averageConditionGetExpected(evaluator, baseRow, baseColumn);
            case 12 :
                return self.areaConditionGetExpected(evaluator, baseRow, baseColumn);
            default:
                return keyword_null;
        }
    };
    Condition.prototype._cloneToActualRanges = function (evaluator, ranges) {
        var newRanges = [];
        for (var i = 0, length_5 = arrayHelper_getLength(ranges); i < length_5; i++) {
            var actualRange = evaluator._getActualRange(ranges[i]);
            newRanges.push(actualRange);
        }
        return newRanges;
    };
    Condition.prototype.getExpressions = function () {
        var result = [], self = this;
        if (self.conType() === 0 ) {
            if (self.item1() && self.item1().getExpressions) {
                result = self.item1().getExpressions();
            }
            if (self.item2() && self.item2().getExpressions) {
                result = result.concat(self.item2().getExpressions());
            }
            return result;
        }
        if (!self._expr) {
            self.initExpression();
        }
        return self._expr ? [self._expr] : [];
    };
    Condition.prototype.setExpressions = function (expressions, changeInfo) {
        var self = this, length1;
        if (changeInfo) {
            changeInfo.push({ type: 'condition', condition: this, expressions: self.getExpressions() });
        }
        if (self.conType() === 0 ) {
            if (self.item1() && self.item1().setExpressions) {
                length1 = self.item1().getExpressions().length;
                self.item1().setExpressions(expressions.slice(0, length1));
            }
            if (self.item2() && self.item2().setExpressions) {
                self.item2().setExpressions(expressions.slice(length1));
            }
            return;
        }
        self.expression(expressions[0]);
    };
    Condition.prototype.toJSON = function (context) {
        return toJsonFn.call(this, context, ps);
    };
    Condition.prototype.fromJSON = function (settings, context, noSchema) {
        if (!settings) {
            return;
        }
        var self = this;
        fromJsonFn.call(self, context, ps, settings, noSchema);
        var isR1C1 = context && context._calcService && context._calcService.useR1C1;
        if (isR1C1 && context instanceof Core_1.Worksheet) {
            self.context(context);
            adjustConditionFormulaWhenFromJSON(self);
        }


        self._setFlagForInitExpression(true);
        self.initExpression();

        self._removeFlagForInitExpression();
    };


    Condition.fromSource = function (expected) {
        return exports._createCondition(12 , keyword_null, expected, keyword_null);
    };


    Condition.fromFormula = function (formula) {
        return exports._createCondition(12 , keyword_null, '', formula);
    };


    Condition.fromDay = function (day) {
        var con = exports._createCondition(6 , keyword_null, day);
        con.expectTypeId(5);
        return con;
    };


    Condition.fromMonth = function (month) {
        var con = exports._createCondition(6 , keyword_null, month);
        con.expectTypeId(3);
        return con;
    };


    Condition.fromQuarter = function (quarter) {
        var con = exports._createCondition(6 , keyword_null, quarter);
        con.expectTypeId(2);
        return con;
    };


    Condition.fromWeek = function (week) {
        var con = exports._createCondition(6 , keyword_null, week);
        con.expectTypeId(4);
        return con;
    };


    Condition.fromYear = function (year) {
        var con = exports._createCondition(6 , keyword_null, year);
        con.expectTypeId(1);
        return con;
    };
    return Condition;
}());
exports.Condition = Condition;
Condition.prototype.conType = defProperty('conType', keyword_null);

Condition.prototype.ranges = defProperty('ranges', keyword_null, function (value) {
    var item1 = this.item1(), item2 = this.item2();
    if (item1 && item1.ranges) {
        item1.ranges(value);
    }
    if (item2 && item2.ranges) {
        item2.ranges(value);
    }
});


Condition.prototype.ignoreBlank = defProperty('ignoreBlank', false);


Condition.prototype.preciseCompareDate = defProperty('preciseCompareDate', false);


Condition.prototype.compareType = defProperty('compareType', keyword_undefined);

Condition.prototype._compareType = Condition.prototype.compareType;


Condition.prototype.expected = defProperty('expected', keyword_undefined);


Condition.prototype.item1 = defProperty('item1', keyword_null);


Condition.prototype.item2 = defProperty('item2', keyword_null);


Condition.prototype.treatNullValueAsZero = defProperty('treatNullValueAsZero', false);

Condition.prototype.integerValue = defProperty('integerValue', false);

Condition.prototype.forceValue2Text = defProperty('forceValue2Text', false);


Condition.prototype.useWildCards = defProperty('useWildCards', true);
Condition.prototype.regex = defProperty('regex', keyword_null);


Condition.prototype.ignoreCase = defProperty('ignoreCase', false);


Condition.prototype.customValueType = defProperty('customValueType', keyword_undefined);


Condition.prototype.expectTypeId = defProperty('expectTypeId', 0);


Condition.prototype.type = defProperty('type', keyword_null);
Condition.prototype.isPercent = defProperty('isPercent', false);

function drawCanvasImage(ctx, obj, startX, startY, iconSize, xPosition, yPosition, width, height) {
    var Math_Round = Math.round;
    ctx.lineWidth = 1;
    ctx.rect(xPosition, yPosition, width, height);
    startX++;
    startX = Math_Round(startX);
    startY = Math_Round(startY);
    ctx.clip();
    switch (obj.iconSetType) {
        case 10:
        case 15:
        case 1:
        case 11:
        case 16:
        case 0: {
            DrawIconSet.drawArrows(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 2: {
            DrawIconSet.drawIconTypeIsTwo(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 3: {
            DrawIconSet.drawStar(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 14:
        case 12:
        case 5: {
            DrawIconSet.drawCircle(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 4: {
            DrawIconSet.drawFlag(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 6: {
            DrawIconSet.drawTrafficLight(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 7: {
            DrawIconSet.drawIconTypeIsSen(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 8: {
            DrawIconSet.drawIconTypeIsEight(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 9: {
            DrawIconSet.drawIconTypeIsNine(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 18: {
            DrawIconSet.drawSector(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 17:
        case 13: {
            DrawIconSet.drawSignal(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        case 19: {
            DrawIconSet.drawMagicCube(ctx, obj.iconSetType, obj.iconIndex, startX, startY, iconSize);
            break;
        }
        default:
            break;
    }
}
function separateRangeByColumn(originalRange, startColumn, endColumn) {
    var ranges = [];
    var originalRange_row = originalRange.row, originalRange_rowCount = originalRange.rowCount;
    var leftColumn = originalRange.col, rightColumn = originalRange.col + originalRange.colCount - 1;
    if (leftColumn < startColumn) {
        if (startColumn <= rightColumn && rightColumn <= endColumn) {
            ranges[0] = createRange(originalRange_row, leftColumn, originalRange_rowCount, startColumn - leftColumn);
            ranges[1] = createRange(originalRange_row, startColumn, originalRange_rowCount, rightColumn - startColumn + 1);
        }
        else if (rightColumn > endColumn) {
            ranges[0] = createRange(originalRange_row, leftColumn, originalRange_rowCount, startColumn - leftColumn);
            ranges[1] = createRange(originalRange_row, startColumn, originalRange_rowCount, endColumn - startColumn + 1);
            ranges[2] = createRange(originalRange_row, endColumn + 1, originalRange_rowCount, rightColumn - endColumn);
        }
    }
    else if (leftColumn <= endColumn) {
        if (startColumn <= rightColumn && rightColumn <= endColumn) {
            ranges[1] = originalRange;
        }
        else if (rightColumn > endColumn) {
            ranges[1] = createRange(originalRange_row, leftColumn, originalRange_rowCount, endColumn - leftColumn + 1);
            ranges[2] = createRange(originalRange_row, endColumn + 1, originalRange_rowCount, rightColumn - endColumn);
        }
    }
    return ranges;
}
function separateRangeByRow(originalRange, startRow, endRow) {
    var ranges = [];
    var originalRange_col = originalRange.col, originalRange_colCount = originalRange.colCount;
    var topRow = originalRange.row, bottomRow = originalRange.row + originalRange.rowCount - 1;
    if (topRow < startRow) {
        if (startRow <= bottomRow && bottomRow <= endRow) {
            ranges[0] = createRange(topRow, originalRange_col, startRow - topRow, originalRange_colCount);
            ranges[1] = createRange(startRow, originalRange_col, bottomRow - startRow + 1, originalRange_colCount);
        }
        else if (bottomRow > endRow) {
            ranges[0] = createRange(topRow, originalRange_col, startRow - topRow, originalRange_colCount);
            ranges[1] = createRange(startRow, originalRange_col, endRow - startRow + 1, originalRange_colCount);
            ranges[2] = createRange(endRow + 1, originalRange_col, bottomRow - endRow, originalRange_colCount);
        }
    }
    else if (topRow <= endRow) {
        if (startRow <= bottomRow && bottomRow <= endRow) {
            ranges[1] = originalRange;
        }
        else if (bottomRow > endRow) {
            ranges[1] = createRange(topRow, originalRange_col, endRow - topRow + 1, originalRange_colCount);
            ranges[2] = createRange(endRow + 1, originalRange_col, bottomRow - endRow, originalRange_colCount);
        }
    }
    return ranges;
}
var ConditionRuleBase = (function () {
    function ConditionRuleBase(ruleType, style, ranges) {
        var self = this;
        self._withCondition = true;
        self.ruleType(ruleType);
        self.style(style);
        self.ranges(ranges);
    }
    ConditionRuleBase.prototype.stopIfTrue = function (value) { };


    ConditionRuleBase.prototype.evaluate = function (evaluator, baseRow, baseColumn, actual) {
        var self = this;
        if (self.contains(baseRow, baseColumn)) {
            self.initCondition();
            var baseCoord = { baseRow: 0, baseCol: 0 };
            self.getBaseCoordinate(baseCoord);
            self.condition().adjustOffset(baseRow - baseCoord.baseRow, baseColumn - baseCoord.baseCol);
            var result = keyword_null, isError = calcConvert._isError;
            var evaluateResult = self.condition().evaluate(evaluator, baseRow, baseColumn, actual);
            if (evaluateResult && !isError(evaluateResult)) {
                result = self.getExpected() || exports._DEFAULT_UNSET_STYLE;
            }
            self.condition().adjustOffset(0, 0);
            return result;
        }
        return keyword_null;
    };


    ConditionRuleBase.prototype.contains = function (row, column) {
        var ranges = this.ranges();
        if (ranges) {
            var count = arrayHelper_getLength(ranges), range = void 0;
            for (var i = 0; i < count; i++) {
                range = ranges[i];
                if (range.contains(row, column)) {
                    return true;
                }
            }
        }
        return false;
    };


    ConditionRuleBase.prototype.createCondition = function () {
        this._withCondition = false;
        return null;
    };
    ConditionRuleBase.prototype.initCondition = function (context) {
        var condition = this.condition();
        if (!condition) {
            condition = this.createCondition();
            if (condition) {
                condition.ranges(this.ranges());
                this.condition(condition);
            }
            if (context) {
                this.context(context);
            }
            if (this.context() && condition) {
                condition.context(this.context());
            }
        }
    };

    ConditionRuleBase.prototype._ensureCondition = function () {
        var rule = this;
        if (rule._withCondition) {
            var condition = rule.condition();
            if (!condition) {
                rule.initCondition();
                condition = rule.condition();
            }
            if (condition && !condition._expr) {
                condition.initExpression();
            }
        }
    };
    ConditionRuleBase.prototype.context = function (context) {
        if (arguments.length === 1) {
            this._context = context;
            if (this.condition()) {
                this.condition().context(context);
            }
        }
        return this._context;
    };


    ConditionRuleBase.prototype.getExpected = function () {
        return this.style();
    };


    ConditionRuleBase.prototype.reset = function () {
        var self = this;
        self.ranges(keyword_null);
        self.condition(keyword_null);
        self.style(keyword_null);
        self.stopIfTrue(false);
        self.priority(1);
    };


    ConditionRuleBase.prototype.intersects = function (row, column, rowCount, columnCount) {
        var ranges = this.ranges();
        if (ranges) {
            var count = arrayHelper_getLength(ranges), cs = void 0;
            for (var n = 0; n < count; n++) {
                cs = ranges[n];
                if (cs.intersect(row, column, rowCount, columnCount)) {
                    return true;
                }
            }
        }
        return false;
    };


    ConditionRuleBase.prototype.isScaleRule = function () {
        return false;
    };
    ConditionRuleBase.prototype.isStateRule = function () {
        return false;
    };
    ConditionRuleBase.prototype.getBaseCoordinate = function (baseCoord) {
        baseCoord.baseRow = Number.MAX_VALUE;
        baseCoord.baseCol = Number.MAX_VALUE;
        var self = this;
        if (self.ranges() && arrayHelper_getLength(self.ranges()) > 0) {
            for (var i = 0; i < arrayHelper_getLength(self.ranges()); i++) {
                var range = self.ranges()[i], row = range.row, col = range.col;
                row = row === -1 ? 0 : row;
                col = col === -1 ? 0 : col;
                baseCoord.baseRow = math_min(row, baseCoord.baseRow);
                baseCoord.baseCol = math_min(col, baseCoord.baseCol);
            }
        }
        else {
            baseCoord.baseRow = 0;
            baseCoord.baseCol = 0;
        }
    };
    ConditionRuleBase.prototype._updateRangesByTable = function (tableRange, dataRange, deltaRowCount) {
        var self = this, isUpdated = false;
        self._ensureCondition();
        var ranges = self.ranges();
        if (ranges) {
            var rlength = arrayHelper_getLength(ranges);
            for (var rIndex = 0; rIndex < rlength; rIndex++) {
                var range = ranges[rIndex], row = range.row, rowCount = getRowCount(range), col = range.col, colCount = getColCount(range),

                isRowRangeEqualTableRowRange = row === tableRange.row && rowCount === tableRange.rowCount
                    && tableRange.col <= col && colCount <= tableRange.colCount,

                isRowRangeEqualTableDataRowRange = row === dataRange.row && rowCount === dataRange.rowCount
                    && dataRange.col <= col && colCount <= dataRange.colCount,

                isInTableRange = isRowRangeEqualTableRowRange || isRowRangeEqualTableDataRowRange;
                if (isInTableRange) {
                    ranges[rIndex] = createRange(row, col, rowCount + deltaRowCount, colCount);
                    isUpdated = true;
                }
            }
        }
        return isUpdated;
    };
    ConditionRuleBase.prototype._addData = function (index, count, isRow, affectRanges, isFromTable) {
        var self = this;
        var rowCount = isRow ? count : 0;
        var colCount = isRow ? 0 : count;
        self._ensureCondition();
        var ranges = self.ranges();
        if (ranges) {
            var newSplitRanges = [];
            var length_6 = arrayHelper_getLength(ranges);
            for (var i = 0; i < length_6; i++) {
                var range = ranges[i];
                var dataIndex = isRow ? range.row : range.col;
                var dataCount = isRow ? getRowCount(range) : getColCount(range);
                if (dataIndex !== -1) {
                    if (affectRanges && affectRanges.length > 0) {
                        var needBreak = false;
                        for (var j = 0, len = affectRanges.length; j < len; j++) {
                            var affectRange = affectRanges[j];
                            if (!affectRange) {
                                continue;
                            }


                            var insertColInTableFirstCol = !isRow && affectRange.col === index && affectRange.col === range.col && affectRange.colCount - count === range.colCount;
                            var insertColInTableFirstCol2 = !isRow && affectRange.col === index && affectRange.row === range.row && affectRange.rowCount === range.rowCount &&
                                range.col >= affectRange.col && range.col + range.colCount <= affectRange.col + affectRange.colCount;
                            var insertRowInTableFirstRow = isRow && affectRange.row === index && affectRange.row === range.row && affectRange.rowCount - count === range.rowCount;
                            if (insertColInTableFirstCol || insertColInTableFirstCol2 || insertRowInTableFirstRow) {
                                ranges[i] = createRange(range.row, range.col, getRowCount(range) + rowCount, getColCount(range) + colCount);
                                needBreak = true;
                                break;
                            }
                        }
                        if (needBreak) {
                            break;
                        }
                    }


                    var adjustRange = range;
                    var tableRange = isFromTable && affectRanges && affectRanges[0];
                    if (tableRange) {
                        var results = isRow ? separateRangeByColumn(range, tableRange.col, tableRange.col + tableRange.colCount - 1) : separateRangeByRow(range, tableRange.row, tableRange.row + tableRange.rowCount - 1);
                        if (results[0]) {
                            newSplitRanges.push(results[0]);
                        }
                        if (results[2]) {
                            newSplitRanges.push(results[2]);
                        }
                        if (results[1]) {
                            adjustRange = results[1];
                        }
                        else {
                            continue;
                        }
                    }
                    if (dataIndex >= index) {
                        ranges[i] = createRange(adjustRange.row + rowCount, adjustRange.col + colCount, getRowCount(adjustRange), getColCount(adjustRange));
                    }
                    else if (index <= dataIndex + dataCount) {
                        ranges[i] = createRange(adjustRange.row, adjustRange.col, getRowCount(adjustRange) + rowCount, getColCount(adjustRange) + colCount);
                    }
                }
            }
            for (var _i = 0, newSplitRanges_1 = newSplitRanges; _i < newSplitRanges_1.length; _i++) {
                var splitRange = newSplitRanges_1[_i];
                ranges.push(splitRange);
            }
        }
    };
    ConditionRuleBase.prototype._onRowsAdded = function (row, rowCount, affectRanges, isFromTable) {
        this._addData(row, rowCount, true, affectRanges, isFromTable);
    };
    ConditionRuleBase.prototype._onColumnsAdded = function (col, colCount, affectRanges, isFromTable) {
        this._addData(col, colCount, false, affectRanges, isFromTable);
    };
    ConditionRuleBase.prototype._removeData = function (index, count, isRow, affectRanges, isFromTable) {
        var self = this;
        var row = isRow ? index : 0;
        var col = isRow ? 0 : index;
        var rowCount = isRow ? count : 0;
        var colCount = isRow ? 0 : count;
        self._ensureCondition();
        var ranges = self.ranges();
        if (ranges) {
            var newSplitRanges = [];
            var delList = [];
            var length_7 = arrayHelper_getLength(ranges);
            for (var i = 0; i < length_7; i++) {
                var range = ranges[i];
                var dataIndex = isRow ? range.row : range.col;
                var dataCount = isRow ? getRowCount(range) : getColCount(range);
                if (dataIndex !== -1) {
                    var adjustRange = range;
                    var tableRange = isFromTable && affectRanges && affectRanges[0];
                    if (tableRange) {
                        var results = isRow ? separateRangeByColumn(range, tableRange.col, tableRange.col + tableRange.colCount - 1) : separateRangeByRow(range, tableRange.row, tableRange.row + tableRange.rowCount - 1);
                        if (results[0]) {
                            newSplitRanges.push(results[0]);
                        }
                        if (results[2]) {
                            newSplitRanges.push(results[2]);
                        }
                        if (results[1]) {
                            adjustRange = results[1];
                        }
                        else {
                            continue;
                        }
                    }
                    if (dataIndex > index) {
                        if (dataIndex + dataCount <= index + count) {
                            delList.push(adjustRange);
                        }
                        else {
                            ranges[i] = createRange(adjustRange.row - rowCount, adjustRange.col - colCount, getRowCount(adjustRange), getColCount(adjustRange));
                        }
                    }
                    else if (index < dataIndex + dataCount) {
                        var newRange = createRange(adjustRange.row, adjustRange.col, getRowCount(adjustRange) - math_min(adjustRange.row + getRowCount(adjustRange) - row, rowCount), getColCount(adjustRange) - math_min(adjustRange.col + getColCount(adjustRange) - col, colCount));
                        if (getColCount(newRange) === 0 || getRowCount(newRange) === 0) {
                            delList.push(adjustRange);
                        }
                        else {
                            ranges[i] = newRange;
                        }
                    }
                }
            }
            for (var _i = 0, newSplitRanges_2 = newSplitRanges; _i < newSplitRanges_2.length; _i++) {
                var splitRange = newSplitRanges_2[_i];
                ranges.push(splitRange);
            }
            var len = arrayHelper_getLength(delList);
            for (var j = 0; j < len; j++) {
                var delRange = delList[j];
                arrayHelper_remove(ranges, delRange);
            }
        }
    };
    ConditionRuleBase.prototype._onRowsRemoved = function (row, rowCount, affectRanges, isFromTable) {
        this._removeData(row, rowCount, true, affectRanges, isFromTable);
    };
    ConditionRuleBase.prototype._onColumnsRemoved = function (col, colCount, affectRanges, isFromTable) {
        this._removeData(col, colCount, false, affectRanges, isFromTable);
    };
    ConditionRuleBase.prototype.toJSON = function (context) {
        return toJsonFn.call(this, context);
    };
    ConditionRuleBase.prototype.fromJSON = function (settings, context, noSchema) {
        if (!settings) {
            return;
        }
        fromJsonFn.call(this, context, keyword_null, settings, noSchema);
        this.initCondition(context);
    };
    ConditionRuleBase.prototype._adjustConditionFormula = function () {
        var condition = this.condition();
        if (condition) {
            adjustConditionFormulaWhenFromJSON(condition);
        }
    };
    ConditionRuleBase.prototype._rangesChanged = function () {
        var oldRanges = this._oldRanges, newRanges = this.ranges();
        if (!oldRanges) {
            this._oldRanges = cloneRanges(newRanges);
            return false;
        }
        var oldCount = arrayHelper_getLength(oldRanges), newCount = arrayHelper_getLength(newRanges);
        if (oldCount !== newCount) {
            return true;
        }
        for (var i = 0; i < newCount; i++) {
            if (!oldRanges[i].equals(newRanges[i])) {
                return true;
            }
        }
        return false;
    };
    return ConditionRuleBase;
}());
exports.ConditionRuleBase = ConditionRuleBase;
var ConditionRuleBasePrototype = ConditionRuleBase.prototype;


ConditionRuleBasePrototype.ruleType = defProperty('ruleType', keyword_null);


ConditionRuleBasePrototype.ranges = defProperty('ranges', keyword_null, function (value) {
    var condition = this.condition();
    if (condition && condition.ranges()) {
        var sheet = condition._context;
        sheet && sheet._modelManager._backupConditionalRules();
        condition.ranges(value);
    }
});


ConditionRuleBasePrototype.condition = defProperty('condition', keyword_null);


ConditionRuleBasePrototype.style = defProperty('style', keyword_null);


ConditionRuleBasePrototype.priority = defProperty('priority', 1);


ConditionRuleBasePrototype.stopIfTrue = defProperty('stopIfTrue', false);
function needTwoItem(ruleType, operator) {
    if (ruleType === RuleType.cellValueRule &&
        (operator === ComparisonOperators.between
            || operator === ComparisonOperators.notBetween )) {
        return true;
    }
    return false;
}
var NormalConditionRulePS = ['ruleType', 'style', 'operator', 'text', 'formula', 'type', 'rank', 'priority', 'stopIfTrue', 'ranges'];
var NormalConditionRule = (function (_super) {
    __extends(NormalConditionRule, _super);


    function NormalConditionRule(ruleType, ranges, style, operator, value1, value2, text, formula, type, rank) {
        var _this = _super.call(this, ruleType, style) || this;
        var self = _this;
        self.ranges(ranges);
        self.operator(operator);
        self.value1((typeof value1 === 'string') ? $.trim(value1) : value1);
        self.value2((typeof value2 === 'string') ? $.trim(value2) : value2);
        self.text(text);
        self.formula(formula);
        self.type(type);
        self.rank(rank);
        self.cached = false;
        self._oldRanges = keyword_null;
        return _this;
    }


    NormalConditionRule.prototype.value1 = function (valueOrBaseRow, baseColumn) {
        if (arguments.length === 1) {
            this._value1 = valueOrBaseRow;
        }
        else {
            var condition = this.condition();
            if (condition) {
                var formula = condition.formula(valueOrBaseRow, baseColumn, 0);
                if (formula && formula.length > 0) {
                    return '=' + StringHelper_TrimStart($.trim(formula.toString()), '=');
                }
            }
            return this._value1;
        }
    };


    NormalConditionRule.prototype.value2 = function (valueOrBaseRow, baseColumn) {
        if (arguments.length === 1) {
            this._value2 = valueOrBaseRow;
        }
        else {
            var condition = this.condition();
            if (condition) {
                var formula = condition.formula(valueOrBaseRow, baseColumn, 1);
                if (formula && formula.length > 0) {
                    return '=' + StringHelper_TrimStart($.trim(formula.toString()), '=');
                }
            }
            return this._value2;
        }
    };


    NormalConditionRule.prototype.formula = function (formulaOrBaseRow, baseColumn) {
        var self = this, condition = self.condition();
        if (typeof formulaOrBaseRow === 'string') {
            self._formula = formulaOrBaseRow;
            if (condition) {
                condition.formula(formulaOrBaseRow);
            }
        }
        else {
            return condition && condition.formula(formulaOrBaseRow, baseColumn) || self._formula;
        }
    };
    NormalConditionRule.prototype.cellValueRuleCreateCondition = function () {
        var self = this;
        var value1 = self.value1(), value2 = self.value2(), ranges = self.ranges();
        var formula1 = self._isFormula(value1) ? StringHelper_TrimStart(value1, '=') : keyword_null;
        var formula2 = self._isFormula(value2) ? StringHelper_TrimStart(value2, '=') : keyword_null;
        var condition1, condition2, condition3, condition4;
        var relationCondition1, relationCondition2;
        var op = self.operator();
        if (op === ComparisonOperators.between ) {
            condition1 = exports._createCondition(ConditionType.cellValueCondition , 3 , value1, formula1, keyword_undefined, keyword_undefined, ranges);
            condition1.treatNullValueAsZero(true);
            condition2 = exports._createCondition(ConditionType.cellValueCondition , 5 , value2, formula2, keyword_undefined, keyword_undefined, ranges);
            condition2.treatNullValueAsZero(true);
            relationCondition1 = exports._createCondition(ConditionType.relationCondition , 1 , keyword_null, keyword_null, keyword_null, keyword_null, ranges, condition1, condition2);
            condition3 = exports._createCondition(ConditionType.cellValueCondition , 5 , value1, formula1, keyword_undefined, keyword_undefined, ranges);
            condition3.treatNullValueAsZero(true);
            condition4 = exports._createCondition(ConditionType.cellValueCondition , 3 , value2, formula2, keyword_undefined, keyword_undefined, ranges);
            condition4.treatNullValueAsZero(true);
            relationCondition2 = exports._createCondition(ConditionType.relationCondition , 1 , keyword_null, keyword_null, keyword_null, keyword_null, ranges, condition3, condition4);
            return exports._createCondition(ConditionType.relationCondition , 0 , keyword_null, keyword_null, keyword_null, keyword_null, ranges, relationCondition1, relationCondition2);
        }
        else if (op === ComparisonOperators.notBetween ) {
            condition1 = exports._createCondition(ConditionType.cellValueCondition , 4 , value1, formula1, keyword_undefined, keyword_undefined, ranges);
            condition1.treatNullValueAsZero(true);
            condition2 = exports._createCondition(ConditionType.cellValueCondition , 2 , value2, formula2, keyword_undefined, keyword_undefined, ranges);
            condition1.treatNullValueAsZero(true);
            relationCondition1 = exports._createCondition(ConditionType.relationCondition , 0 , keyword_null, keyword_null, keyword_null, keyword_null, ranges, condition1, condition2);
            condition3 = exports._createCondition(ConditionType.cellValueCondition , 2 , value1, formula1, keyword_undefined, keyword_undefined, ranges);
            condition3.treatNullValueAsZero(true);
            condition4 = exports._createCondition(ConditionType.cellValueCondition , 4 , value2, formula2, keyword_undefined, keyword_undefined, ranges);
            condition4.treatNullValueAsZero(true);
            relationCondition2 = exports._createCondition(ConditionType.relationCondition , 0 , keyword_null, keyword_null, keyword_null, keyword_null, ranges, condition3, condition4);
            return exports._createCondition(ConditionType.relationCondition , 1 , keyword_null, keyword_null, keyword_null, keyword_null, ranges, relationCondition1, relationCondition2);
        }

        var compareType = op;
        var t = exports._createCondition(11 , compareType, value1, formula1, keyword_undefined, keyword_undefined, ranges);
        t.treatNullValueAsZero(true);
        return t;
    };
    NormalConditionRule.prototype._isFormula = function (val) {
        return !isNullOrUndefined(val) && (val[0] === '=');
    };
    NormalConditionRule.prototype.specificTextRuleCreateCondition = function () {
        var type, operator = this.operator();
        switch (operator) {
            case 2 :
                type = 2 ;
                break;
            case 3 :
                type = 4 ;
                break;
            case 0 :
                type = 6 ;
                break;
            case 1 :
                type = 7 ;
                break;
            default:
                type = 0 ;
                break;
        }
        var text = this.text(), formula = keyword_null;
        if (text && (text[0] === '=')) {
            formula = text;
        }
        var condition = exports._createCondition(2 , type, text, formula, keyword_undefined, keyword_undefined, this.ranges());
        condition.ignoreCase(true);

        condition.useWildCards(operator !== 2 && operator !== 3 );
        return condition;
    };
    NormalConditionRule.prototype.formulaRuleCreateCondition = function () {
        var self = this, ranges = self.ranges();
        return exports._createCondition(4 , keyword_null, keyword_null, self._formula, 4 , keyword_null, ranges);
    };
    NormalConditionRule.prototype.dateOccurringRuleCreateCondition = function () {
        return exports._createCondition(6 , keyword_null, this.type(), keyword_null, keyword_null, keyword_undefined, this.ranges());
    };
    NormalConditionRule.prototype.top10RuleCreateCondition = function () {
        return exports._createCondition(8 , keyword_null, this.rank(), keyword_null, keyword_null, this.type(), this.ranges());
    };
    NormalConditionRule.prototype.uniqueRuleCreateCondition = function () {
        return exports._createCondition(9 , keyword_null, false, keyword_null, keyword_null, keyword_null, this.ranges());
    };
    NormalConditionRule.prototype.duplicateRuleCreateCondition = function () {
        return exports._createCondition(9 , keyword_null, true, keyword_null, keyword_null, keyword_null, this.ranges());
    };
    NormalConditionRule.prototype.averageRuleCreateCondition = function () {
        return exports._createCondition(10 , keyword_null, keyword_null, keyword_null, keyword_null, this.type(), this.ranges());
    };


    NormalConditionRule.prototype.createCondition = function () {
        return this[RuleType[this.ruleType()] + 'CreateCondition']();
    };


    NormalConditionRule.prototype.reset = function () {
        var self = this;
        self.ranges(keyword_null);
        self.condition(keyword_null);
        self.style(keyword_null);
        self.stopIfTrue(false);
        self.priority(1);
        self.operator(6 );
        self.value1(keyword_null);
        self.value2(keyword_null);
        self.text('');
        self.formula(keyword_null);
        self.type(0);
        self.rank(10);
        switch (self.ruleType()) {
            case 1 :
                self.operator(6 );
                break;
            case 2 :
                self.operator(0 );
                break;
            case 4 :
                self.style(keyword_null );
                break;
            case 5 :
                self.type(0 );
                self.rank(10);
                break;
            case 8 :
                self.type(0 );
                break;
            default:
        }
    };
    NormalConditionRule.prototype.evaluate = function (evaluator, baseRow, baseColumn, actual) {
        this._tryCache(evaluator);
        return _super.prototype.evaluate.call(this, evaluator, baseRow, baseColumn, actual);
    };
    NormalConditionRule.prototype._tryCache = function (evaluator) {
        var self = this;
        self.initCondition();
        var condition = self.condition();
        if (condition.conType() === 9 ) {
            if (self._rangesChanged()) {
                self._clearCache();
                self._oldRanges = cloneRanges(self.ranges());
            }
            if (self.cached === false) {
                condition.duplicatedArrayCached = condition.getDuplicated(evaluator, self.ranges());
                self.cached = true;
            }
        }
    };
    NormalConditionRule.prototype._clearCache = function () {
        this.cached = false;
    };
    NormalConditionRule.prototype._onRowsAdded = function (row, rowCount, affectRanges, isFromTable) {
        _super.prototype._onRowsAdded.call(this, row, rowCount, affectRanges, isFromTable);
        this._clearCache();
    };
    NormalConditionRule.prototype._onColumnsAdded = function (col, colCount, affectRanges, isFromTable) {
        _super.prototype._onColumnsAdded.call(this, col, colCount, affectRanges, isFromTable);
        this._clearCache();
    };
    NormalConditionRule.prototype._onRowsRemoved = function (row, rowCount, affectRanges, isFromTable) {
        _super.prototype._onRowsRemoved.call(this, row, rowCount, affectRanges, isFromTable);
        this._clearCache();
    };
    NormalConditionRule.prototype._onColumnsRemoved = function (col, colCount, affectRanges, isFromTable) {
        _super.prototype._onColumnsRemoved.call(this, col, colCount, affectRanges, isFromTable);
        this._clearCache();
    };
    NormalConditionRule.prototype.toJSON = function (context) {
        var self = this;
        if (isNullOrUndefined(self.condition())) {
            this.initCondition();
        }
        var obj = toJsonFn.call(self, context, NormalConditionRulePS);
        var value1 = self.value1();
        var value2;


        if (needTwoItem(obj.ruleType, obj.operator)) {
            value2 = self.value2();
        }
        var useR1C1 = context && context.parent && context.parent.options.referenceStyle === 1 ;
        if (!isNullOrUndefined(value1)) {
            if (self._isFormula(value1) && useR1C1) {
                value1 = transformR1C1ToA1(context, self, value1, useR1C1);
            }
            obj.value1 = value1;
        }
        if (!isNullOrUndefined(value2)) {
            if (self._isFormula(value2) && useR1C1) {
                value2 = transformR1C1ToA1(context, self, value2, useR1C1);
            }
            obj.value2 = value2;
        }
        var ruleType = self.ruleType();
        if (ruleType === RuleType.conditionRuleBase) {
            obj.condition = self.condition().toJSON();
        }
        return obj;
    };
    NormalConditionRule.prototype.fromJSON = function (settings, context, noSchema) {
        var newNormalConditionRulePS = NormalConditionRulePS;
        if (!isNullOrUndefined(settings.condition)) {
            newNormalConditionRulePS = NormalConditionRulePS.concat(['condition']);
        }
        fromJsonFn.call(this, context, newNormalConditionRulePS, settings, noSchema);
        if (!isNullOrUndefined(settings.value1)) {
            this.value1(settings.value1);
        }
        if (!isNullOrUndefined(settings.value2)) {
            this.value2(settings.value2);
        }
        this.initCondition(context);
    };
    return NormalConditionRule;
}(ConditionRuleBase));
exports.NormalConditionRule = NormalConditionRule;
function transformR1C1ToA1(sheet, rule, value, useR1C1) {
    var range = rule.ranges();
    var baseRowBaseCol = getBaseRowBaseCol(range);
    var expression = SheetsCalc.formulaToExpression(sheet, value, baseRowBaseCol.r, baseRowBaseCol.c, useR1C1);
    return SheetsCalc.expressionToFormula(sheet, expression, baseRowBaseCol.r, baseRowBaseCol.c, !useR1C1);
}
var normalPrototype = {


    operator: defProperty('operator', keyword_null),


    text: defProperty('text', keyword_null),


    type: defProperty('type', keyword_null),


    rank: defProperty('rank', keyword_null),
    priority: defProperty('priority', 1)
};
$.extend(NormalConditionRule.prototype, normalPrototype);


var ScaleValue = (function () {
    function ScaleValue(type, value) {
        this.type = type;


        this.value = value;
    }
    return ScaleValue;
}());
exports.ScaleValue = ScaleValue;
var ScaleRulePs = ['ruleType', 'ranges', 'minType', 'minValue', 'minColor', 'maxType', 'maxValue', 'maxColor', 'midType', 'midValue', 'midColor', 'priority'];


var ScaleRule = (function (_super) {
    __extends(ScaleRule, _super);
    function ScaleRule(ruleType, minType, minValue, minColor, midType, midValue, midColor, maxType, maxValue, maxColor, ranges) {
        var _this = _super.call(this, ruleType, keyword_null, ranges) || this;
        var self = _this;
        self._withCondition = false;
        self.lowestValueCached = keyword_null;
        self.highestValueCached = keyword_null;
        self._percentileCache = {};
        self.cached = false;
        self._oldRanges = keyword_null;
        var _minType = minType, _minValue = minValue, _minColor = minColor, _midType = midType, _midValue = midValue, _midColor = midColor, _maxType = maxType, _maxValue = maxValue, _maxColor = maxColor;
        if (arguments.length <= 1) {
            _minType = 1 ;
            _minValue = keyword_null;
            _minColor = ColorToString(255, 248, 105, 107);
            _midType = 4 ;
            _midValue = 50;
            _midColor = ColorToString(255, 255, 235, 132);
            _maxType = 2 ;
            _maxValue = keyword_null;
            _maxColor = ColorToString(255, 99, 190, 123);
        }
        self.minColor(_minColor);
        self.minValue(_minValue);
        self.minType(_minType);
        self.midColor(_midColor);
        self.midValue(_midValue);
        self.midType(_midType);
        self.maxColor(_maxColor);
        self.maxValue(_maxValue);
        self.maxType(_maxType);
        return _this;
    }


    ScaleRule.prototype.stopIfTrue = function (value) {
        return false;
    };
    ScaleRule.prototype.isScaleRule = function () {
        return true;
    };


    ScaleRule.prototype.createCondition = function () {
        return keyword_null;
    };
    ScaleRule.prototype._calculateLowestValueEx = function (evaluator) {
        var rets = exports._createCondition(8 , keyword_null, keyword_null, keyword_null, keyword_null, 1 ).getTopValues(evaluator, 1, this.ranges());
        return (arrayHelper_getLength(rets) > 0 ? rets[0] : keyword_null);
    };
    ScaleRule.prototype._calculateHighestValueEx = function (evaluator) {
        var rets = exports._createCondition(8 , keyword_null, keyword_null, keyword_null, keyword_null, 0 ).getTopValues(evaluator, 1, this.ranges());
        return (arrayHelper_getLength(rets) > 0 ? rets[0] : keyword_null);
    };
    ScaleRule.prototype._tryCache = function (evaluator) {
        var self = this;
        if (self._rangesChanged()) {
            self._clearCache();
            self._oldRanges = cloneRanges(self.ranges());
        }
        if (self.cached === false) {
            self.lowestValueCached = self._calculateLowestValueEx(evaluator);
            self.highestValueCached = self._calculateHighestValueEx(evaluator);
            self.cached = true;
        }
    };
    ScaleRule.prototype._clearCache = function () {
        this.lowestValueCached = keyword_null;
        this.highestValueCached = keyword_null;
        this._percentileCache = {};
        this.cached = false;
    };
    ScaleRule.prototype._calculateFormula = function (evaluator, baseRow, baseColumn, formula) {
        if (formula) {
            var calcService = evaluator._getCalcServiceInternal();
            if (!calcService) {
                return keyword_null;
            }
            var expr = calcService.parse(evaluator._getSheetSource(), formula, baseRow, baseColumn);
            return calcService._evaluateParsedFormula(evaluator._getSheetSource(), expr, CalcEngine_1._createCellIdentity(baseRow, baseColumn), false);
        }
        return keyword_null;
    };
    ScaleRule.prototype._isFormula = function (val) {
        return (val) && (val[0] === '=');
    };
    ScaleRule.prototype._trimFormula = function (val) {
        if (isNullOrUndefined(val) || val === '') {
            return keyword_null;
        }
        return (val[0] === '=') ? val.substr(1) : val;
    };
    ScaleRule.prototype._calculateValue = function (evaluator, baseRow, baseColumn, value) {
        if (this._isFormula(value)) {
            return this._calculateFormula(evaluator, baseRow, baseColumn, this._trimFormula(value.toString()));
        }
        var result = {};
        return calcConvert_tryToDouble(value, result) ? result.value : NaN;
    };
    ScaleRule.prototype._getHighestValue = function (evaluator) {
        this._tryCache(evaluator);
        return this.highestValueCached;
    };
    ScaleRule.prototype._getLowestValue = function (evaluator) {
        this._tryCache(evaluator);
        return this.lowestValueCached;
    };
    ScaleRule.prototype._calculatePercent = function (evaluator, baseRow, baseColumn, value) {
        var dValue = this._calculateValue(evaluator, baseRow, baseColumn, value);
        if (!isNaN(dValue) && 0 <= dValue && dValue <= 100) {
            var min = this._getLowestValue(evaluator);
            var max = this._getHighestValue(evaluator);
            if (typeof (min) !== const_undefined && min !== keyword_null && typeof (max) !== const_undefined && max !== keyword_null) {
                return min + (max - min) * dValue / 100.0;
            }
        }
        return keyword_null;
    };
    ScaleRule.prototype._calculatePercentile = function (evaluator, baseRow, baseColumn, value) {
        var cache = this._percentileCache;
        if (cache[value] !== undefined) {
            return cache[value];
        }
        var dValue = this._calculateValue(evaluator, baseRow, baseColumn, value);
        if (!isNaN(dValue) && 0 <= dValue && dValue <= 100) {
            var total = 0, ranges = this.ranges(), length_8 = arrayHelper_getLength(ranges);
            for (var i = 0; i < length_8; i++) {
                var exp = this._createExpression('PERCENTILE', [evaluator._getActualRange(ranges[i]), dValue / 100.0]), calcService = evaluator._getCalcServiceInternal(), sheetSource = evaluator._getSheetSource(), formula = calcService.unparse(sheetSource, exp, baseRow, baseColumn), exp2 = calcService.parse(sheetSource, formula, baseRow, baseColumn), val = calcService._evaluateParsedFormula(sheetSource, exp2, CalcEngine_1._createCellIdentity(baseRow, baseColumn), false);
                var result = {};
                total += calcConvert_tryToDouble(val, result) ? result.value : 0;
            }
            cache[value] = (total / length_8);
            return cache[value];
        }
        cache[value] = keyword_null;
        return cache[value];
    };
    ScaleRule.prototype._getActualValue = function (evaluator, baseRow, baseColumn, type, value) {
        var self = this;
        switch (type) {
            case ScaleValueType.formula :
                if (!self._isFormula(value)) {
                    value = '=' + value;
                }
                return self._calculateValue(evaluator, baseRow, baseColumn, value);
            case ScaleValueType.highestValue :
                return self._getHighestValue(evaluator);
            case ScaleValueType.lowestValue :
                return self._getLowestValue(evaluator);
            case ScaleValueType.number :
                return self._calculateValue(evaluator, baseRow, baseColumn, value);
            case ScaleValueType.percent :
                return self._calculatePercent(evaluator, baseRow, baseColumn, value);
            case ScaleValueType.percentile :
                return self._calculatePercentile(evaluator, baseRow, baseColumn, value);
            case ScaleValueType.automax :
                var max = self._getHighestValue(evaluator);
                return max < 0.0 ? 0.0 : max;
            case ScaleValueType.automin :
                var min = self._getLowestValue(evaluator);
                return min > 0.0 ? 0.0 : min;
            default:
                return keyword_null;
        }
    };
    ScaleRule.prototype._evaluate2Scale = function (value, min, max) {
        if (value === min && value === max) {
            return 1.0;
        }
        if (value <= min) {
            return 0.0;
        }
        if (value >= max) {
            return 1.0;
        }
        return (value - min) / (max - min);
    };
    ScaleRule.prototype._evaluateColor = function (value, color1, color2) {
        if (0 <= value && value <= 1) {
            var minColor = ColorHelper._fromString(color1);
            var maxColor = ColorHelper._fromString(color2);
            var a = (minColor.a) * (1 - value) + (maxColor.a) * (value);
            var r = (minColor.r) * (1 - value) + (maxColor.r) * (value);
            var g = (minColor.g) * (1 - value) + (maxColor.g) * (value);
            var b = (minColor.b) * (1 - value) + (maxColor.b) * (value);
            return ColorToString(parseFloat(a / 255 + ''), parseInt(r + '', 10), parseInt(g + '', 10), parseInt(b + '', 10));
        }
        return keyword_null;
    };
    ScaleRule.prototype._createExpression = function (name, parameters) {
        if (!hasCalc) {
            return keyword_null;
        }
        var averageFunc = Functions.findGlobalFunction(name);
        if (averageFunc) {
            var args = [];
            var length_9 = arrayHelper_getLength(parameters);
            for (var i = 0; i < length_9; i++) {
                args[i] = createExpression(parameters[i]);
            }

            return CalcEngine._createFunctionExpression(averageFunc, args);
        }
        return keyword_null;
    };
    ScaleRule.prototype._onRowsAdded = function (row, rowCount, affectRanges, isFromTable) {
        _super.prototype._onRowsAdded.call(this, row, rowCount, affectRanges, isFromTable);
        this._clearCache();
    };
    ScaleRule.prototype._onColumnsAdded = function (col, colCount, affectRanges, isFromTable) {
        _super.prototype._onColumnsAdded.call(this, col, colCount, affectRanges, isFromTable);
        this._clearCache();
    };
    ScaleRule.prototype._onRowsRemoved = function (row, rowCount, affectRanges, isFromTable) {
        _super.prototype._onRowsRemoved.call(this, row, rowCount, affectRanges, isFromTable);
        this._clearCache();
    };
    ScaleRule.prototype._onColumnsRemoved = function (col, colCount, affectRanges, isFromTable) {
        _super.prototype._onColumnsRemoved.call(this, col, colCount, affectRanges, isFromTable);
        this._clearCache();
    };
    ScaleRule.prototype.scaleEvaluate = function (evaluator, baseRow, baseColumn, actual) {
        var self = this;
        self._tryCache(evaluator);
        if (self.contains(baseRow, baseColumn)) {
            if (isNullOrUndefined(actual)) {
                return keyword_null;
            }
            try {
                var numberValue = calcConvert_toDouble(actual);
                var minValue = self._getActualValue(evaluator, baseRow, baseColumn, self.minType(), self.minValue());
                var midValue = self._getActualValue(evaluator, baseRow, baseColumn, self.midType(), self.midValue());
                var maxValue = self._getActualValue(evaluator, baseRow, baseColumn, self.maxType(), self.maxValue());
                if (minValue > maxValue) {
                    return keyword_null;
                }
                if (isNaN(midValue)) {
                    if (!isNaN(minValue) && !isNaN(maxValue)) {
                        return self._evaluate2Scale(numberValue, minValue, maxValue);
                    }
                }
                else if (!isNaN(minValue) && !isNaN(maxValue)) {
                    if (numberValue < minValue) {
                        return 0.0;
                    }
                    if (numberValue >= maxValue) {
                        return 2.0;
                    }
                    if (minValue <= numberValue && numberValue <= midValue) {
                        return self._evaluate2Scale(numberValue, minValue, midValue);
                    }
                    return 1 + self._evaluate2Scale(numberValue, minValue, maxValue);
                }
            }
            catch (err) {
                return keyword_null;
            }
        }
        return keyword_null;
    };
    ScaleRule.prototype.twoScaleRuleEvaluate = function (evaluator, baseRow, baseColumn, actual) {
        if (!isNullOrUndefined(actual)) {
            var result = {}, numberValue = (calcConvert_isNumber(actual) && calcConvert_tryToDouble(actual, result)) ? result.value : NaN;
            if (isNaN(numberValue)) {
                return keyword_null;
            }
            var self_1 = this;
            var minValue = self_1._getActualValue(evaluator, baseRow, baseColumn, self_1.minType(), self_1.minValue());
            var maxValue = self_1._getActualValue(evaluator, baseRow, baseColumn, self_1.maxType(), self_1.maxValue());
            if (!isNullOrUndefined(minValue) && !isNullOrUndefined(maxValue)) {
                var rs = self_1._evaluate2Scale(numberValue, minValue, maxValue);
                return self_1._evaluateColor(rs, self_1.minColor(), self_1.maxColor());
            }
        }
        return keyword_null;
    };
    ScaleRule.prototype.threeScaleRuleEvaluate = function (evaluator, baseRow, baseColumn, actual) {
        var self = this;
        self._evaluator = evaluator;
        if (!isNullOrUndefined(actual)) {
            var result = {}, numberValue = (calcConvert_isNumber(actual) && calcConvert_tryToDouble(actual, result)) ? result.value : NaN;
            if (isNaN(numberValue)) {
                return keyword_null;
            }
            var minValue = self._getActualValue(evaluator, baseRow, baseColumn, self.minType(), self.minValue());
            var midValue = self._getActualValue(evaluator, baseRow, baseColumn, self.midType(), self.midValue());
            var maxValue = self._getActualValue(evaluator, baseRow, baseColumn, self.maxType(), self.maxValue());
            if (!isNullOrUndefined(minValue) && !isNullOrUndefined(maxValue) && !isNullOrUndefined(midValue)) {
                var rs = void 0;
                if (minValue > maxValue) {
                    return keyword_null;
                }
                if (numberValue <= minValue || minValue === maxValue) {
                    return numberValue >= maxValue ? self.maxColor() : self.minColor();
                }
                if (numberValue >= maxValue) {
                    return self.maxColor();
                }
                if (numberValue <= midValue) {
                    rs = self._evaluate2Scale(numberValue, minValue, midValue);
                    return self._evaluateColor(rs, self.minColor(), self.midColor());
                }
                rs = self._evaluate2Scale(numberValue, midValue, maxValue);
                return self._evaluateColor(rs, self.midColor(), self.maxColor());
            }
        }
        return keyword_null;
    };


    ScaleRule.prototype.evaluate = function (evaluator, baseRow, baseColumn, actual) {
        return this[RuleType[this.ruleType()] + 'Evaluate'](evaluator, baseRow, baseColumn, actual);
    };
    ScaleRule.prototype._init = function () {
        var self = this;
        self.minValue(keyword_null);
        self.minType(1 );
        self.midValue(50);
        self.midType(4 );
        self.maxValue(keyword_null);
        self.maxType(2 );
        if (self.ruleType() === 10 ) {
            self.minColor(ColorToString(0, 255, 255, 255));
            self.maxColor(ColorToString(255, 99, 190, 123));
        }
        if (self.ruleType() === 11 ) {
            self.midValue(50);
            self.midType(4 );
            self.minColor(ColorToString(255, 248, 105, 107));
            self.midColor(ColorToString(255, 255, 235, 132));
            self.maxColor(ColorToString(255, 99, 190, 123));
        }
    };
    ScaleRule.prototype.reset = function () {
        var self = this;
        self.ranges(keyword_null);
        self.condition(keyword_null);
        self.style(keyword_null);
        self._init();
        self._evaluator = keyword_null;
        self.stopIfTrue(false);
        self.priority(1);
    };
    ScaleRule.prototype.toJSON = function (context) {
        return toJsonFn.call(this, context, ScaleRulePs);
    };
    ScaleRule.prototype.fromJSON = function (settings, context, noSchema) {
        fromJsonFn.call(this, context, ScaleRulePs, settings, noSchema);
        this.initCondition(context);
    };
    return ScaleRule;
}(ConditionRuleBase));
exports.ScaleRule = ScaleRule;
var scalePrototype = {


    minValue: defProperty('minValue', keyword_null),


    minType: defProperty('minType', 5 ),


    minColor: defProperty('minColor', keyword_null),


    midValue: defProperty('midValue', 50, keyword_null, function (value) {
        var self = this;
        if (self._evaluator) {
            if (self.midType() === 2 ) {
                return self._getHighestValue(self._evaluator);
            }
            else if (self.midType() === 1 ) {
                return self._getLowestValue(self._evaluator);
            }
        }
        return value;
    }),


    midType: defProperty('midType', keyword_null),


    midColor: defProperty('midColor', keyword_null),


    maxType: defProperty('maxType', 7 ),


    maxValue: defProperty('maxValue', keyword_null),


    maxColor: defProperty('maxColor', keyword_null),
};
$.extend(ScaleRule.prototype, scalePrototype);
var DataBarRulePs = ['ruleType', 'ranges', 'gradient', 'color', 'showBorder', 'borderColor', 'dataBarDirection',
    'negativeFillColor', 'useNegativeFillColor', 'negativeBorderColor', 'useNegativeBorderColor',
    'axisPosition', 'axisColor', 'showBarOnly', 'minType', 'minValue', 'maxType', 'maxValue', 'priority'];


var DataBarRule = (function (_super) {
    __extends(DataBarRule, _super);
    function DataBarRule(minType, minValue, maxType, maxValue, color, ranges) {
        var _this = this;
        var _minType = minType, _minValue = minValue, _maxType = maxType, _maxValue = maxValue, _color = color;
        if (arguments.length === 0) {
            _minType = 5 ;
            _minValue = keyword_null;
            _maxType = 7 ;
            _maxValue = keyword_null;
            _color = ColorToString(255, 99, 142, 198);
        }
        _this = _super.call(this, 12 , _minType, _minValue, keyword_null, keyword_null, keyword_null, keyword_null, _maxType, _maxValue, keyword_null, ranges) || this;
        _this._withCondition = false;
        _this._init(_color);
        return _this;
    }
    DataBarRule.prototype._init = function (color) {
        var self = this;
        self.gradient(true);
        self.color(color);
        self.showBorder(false);
        self.borderColor('black');
        self.dataBarDirection(0) ;
        self.negativeFillColor('red');
        self.useNegativeFillColor(true);
        self.negativeBorderColor('black');
        self.useNegativeBorderColor(false);
        self.axisPosition(0) ;
        self.axisColor('black');
        self.showBarOnly(false);
    };
    DataBarRule.prototype.reset = function () {
        var self = this;
        self.ranges(keyword_null);
        self.condition(keyword_null);
        self.style(keyword_null);
        self._init(ColorToString(255, 99, 142, 198));
        self.stopIfTrue(false);
        self.priority(1);
        self.minValue(keyword_null);
        self.minType(5 );
        self.midValue(keyword_null);
        self.midType(keyword_null);
        self.maxValue(keyword_null);
        self.maxType(7 );
        self.minColor(keyword_null);
        self.midColor(keyword_null);
        self.maxColor(keyword_null);
    };
    DataBarRule.prototype._calculateMaxMinValue = function (evaluator, baseRow, baseColumn, isMax) {
        var self = this;
        var tpRange;
        var type = isMax ? self.maxType() : self.minType();
        var value = isMax ? self.maxValue() : self.minValue();
        if (type === 6 || type === 4 ) {
            for (var i = 0; i < arrayHelper_getLength(self.ranges()); i++) {
                if (self.ranges()[i].intersect(baseRow, -1, 1, -1)) {
                    tpRange = self.ranges()[i];
                    if (tpRange) {
                        var tpRow = tpRange.row, tpCol = tpRange.col;
                        tpRow = tpRow === -1 ? 0 : tpRow;
                        tpCol = tpCol === -1 ? 0 : tpCol;
                        return self._getActualValue(evaluator, tpRow, tpCol, type, value);
                    }
                }
            }
        }
        else {
            return self._getActualValue(evaluator, baseRow, baseColumn, type, value);
        }
    };
    DataBarRule.prototype._evaluateNoneScale = function (currentValue, minValue, maxValue) {
        var axisScale = 0.0;
        if (currentValue >= maxValue && currentValue > minValue) {
            return [1.0, axisScale];
        }
        if (currentValue <= minValue && currentValue < maxValue) {
            return [0.0, axisScale];
        }
        if (maxValue === minValue) {
            return [0.5, axisScale];
        }
        return [(currentValue - minValue) / (maxValue - minValue), axisScale];
    };
    DataBarRule.prototype._evaluateMidScale = function (currentValue, minValue, maxValue) {
        var axisScale = 0.5;
        var totalValue = math_abs(maxValue - minValue);
        if (maxValue > 0 && minValue >= 0) {
            if (maxValue === minValue) {
                return [0.5, axisScale];
            }
            if (currentValue >= maxValue) {
                return [0.5, axisScale];
            }
            else if (currentValue <= minValue) {
                return [minValue / maxValue * 0.5, axisScale];
            }
            return [math_abs(currentValue / maxValue) * 0.5, axisScale];
        }
        else if (maxValue > 0 && minValue < 0) {
            var positiveMaxScale = maxValue > math_abs(minValue) ? 0.5 : maxValue / totalValue;
            var negativeMaxScale = maxValue > math_abs(minValue) ? minValue / totalValue : -0.5;
            if (currentValue > 0) {
                if (currentValue >= maxValue) {
                    return [positiveMaxScale, axisScale];
                }
                return [(currentValue / maxValue) * positiveMaxScale, axisScale];
            }
            else if (currentValue < 0) {
                if (currentValue <= minValue) {
                    return [negativeMaxScale, axisScale];
                }
                return [(currentValue / minValue) * negativeMaxScale, axisScale];
            }
            return [0.0, axisScale];
        }
        else if (maxValue <= 0 && minValue < 0) {
            if (maxValue === minValue) {
                return [-0.5, axisScale];
            }
            if (currentValue >= maxValue) {
                return [-maxValue / minValue * 0.5, axisScale];
            }
            else if (currentValue <= minValue) {
                return [-0.5, axisScale];
            }
            return [-currentValue / minValue * 0.5, axisScale];
        }
        else if (maxValue === 0 && minValue === 0) {
            return [0.0, axisScale];
        }
        axisScale = -1;
        return [-1, axisScale];
    };
    DataBarRule.prototype._evaluateAutoScale = function (currentValue, minValue, maxValue) {
        var axisScale = -1;
        var absMinValue = math_abs(minValue);
        var absMaxValue = math_abs(maxValue);
        var totalValue = math_abs(maxValue - minValue);
        var minus = minValue < 0 ? -1.0 : 1.0;
        if ((maxValue > 0 && minValue >= 0) || (maxValue <= 0 && minValue < 0)) {
            var maxValue2 = math_max(absMinValue, absMaxValue);
            var minValue2 = math_min(absMinValue, absMaxValue);
            var absCurrentValue = math_abs(currentValue);
            axisScale = minValue < 0 ? 1.0 : 0.0;
            if (absCurrentValue <= minValue2 && absCurrentValue < maxValue2) {
                return [0.0, axisScale];
            }
            if (absCurrentValue >= maxValue2 && absCurrentValue > minValue2) {
                return [minus, axisScale];
            }
            if (minValue2 === maxValue2) {
                return [minus * 0.5, axisScale];
            }
            return [minus * (math_abs(currentValue) - minValue2) / totalValue, axisScale];
        }
        if (maxValue > 0 && minValue < 0) {
            axisScale = math_abs(minValue) / totalValue;
            if (currentValue === 0) {
                return [0.0, axisScale];
            }
            if (currentValue >= maxValue) {
                return [1 - axisScale, axisScale];
            }
            return [math_max(currentValue, minValue) / totalValue, axisScale];
        }
        else if (maxValue === 0 && minValue === 0) {
            axisScale = 0.5;
            if (currentValue === 0) {
                return [0.0, axisScale];
            }
            return [minus * 0.5, axisScale];
        }
        return [-1, axisScale];
    };
    DataBarRule.prototype._evaluateScale = function (currentValue, minValue, maxValue) {
        var self = this;
        if (self.axisPosition() === 0 ) {
            return self._evaluateAutoScale(currentValue, minValue, maxValue);
        }
        else if (self.axisPosition() === 1 ) {
            return self._evaluateMidScale(currentValue, minValue, maxValue);
        }
        return self._evaluateNoneScale(currentValue, minValue, maxValue);
    };


    DataBarRule.prototype.evaluate = function (evaluator, baseRow, baseColumn, actual) {
        if (!isNullOrUndefined(actual)) {
            var result = {}, numberValue = (calcConvert_isNumber(actual, true) && calcConvert_tryToDouble(actual, result)) ? result.value : NaN;
            if (isNaN(numberValue)) {
                return keyword_null;
            }
            var self_2 = this;
            var minValue = self_2._calculateMaxMinValue(evaluator, baseRow, baseColumn, false);
            var maxValue = self_2._calculateMaxMinValue(evaluator, baseRow, baseColumn, true);
            if (isInstanceOf(minValue, Date)) {
                minValue = dateTimeHelper._toOADate(minValue);
            }
            if (isInstanceOf(maxValue, Date)) {
                maxValue = dateTimeHelper._toOADate(maxValue);
            }
            if (!isNullOrUndefined(minValue) && !isNullOrUndefined(maxValue)) {
                if (minValue > maxValue) {
                    var tpNum = maxValue;
                    maxValue = minValue;
                    minValue = tpNum;
                }
                var axisScale = void 0;
                var resultArray = self_2._evaluateScale(numberValue, minValue, maxValue);
                if (!resultArray || arrayHelper_getLength(resultArray) < 2) {
                    return keyword_null;
                }
                var barScale = resultArray[0];
                axisScale = resultArray[1];
                var fillColor = numberValue < 0 && self_2.useNegativeFillColor() ? self_2.negativeFillColor() : self_2.color();
                var borderFillColor = numberValue < 0 && self_2.useNegativeBorderColor() ? self_2.negativeBorderColor() : self_2.borderColor();
                var axisColor = self_2.axisColor();
                fillColor = _ThemeContext._getColor(evaluator, fillColor);
                borderFillColor = _ThemeContext._getColor(evaluator, borderFillColor);
                axisColor = _ThemeContext._getColor(evaluator, axisColor);
                return {
                    fillColor: fillColor,
                    borderColor: borderFillColor,
                    showBorder: self_2.showBorder(),
                    axisColor: axisColor,
                    isGradient: self_2.gradient(),
                    direction: self_2.dataBarDirection(),
                    axisLocation: axisScale,
                    scale: barScale,
                    showBarOnly: self_2.showBarOnly()
                };
            }
        }
        return keyword_null;
    };
    DataBarRule.prototype.toJSON = function (context) {
        return toJsonFn.call(this, context, DataBarRulePs);
    };
    DataBarRule.prototype.fromJSON = function (settings, context, noSchema) {
        fromJsonFn.call(this, context, DataBarRulePs, settings, noSchema);
        this.initCondition(context);
    };
    DataBarRule.paintDataBar = function (ctx, obj, x, y, w, h) {
        var rc = new Sheets.Rect(x + 2, y + 2, w - 4, h - 4), startX = rc.x, startY = rc.y, width = math_floor(math_abs(rc.width * obj.scale)), height = rc.height;
        if (obj.axisLocation === 0) {
            if (obj.scale <= 0) {
                width = 0;
            }
        }
        else if (obj.axisLocation === 1) {
            if (obj.scale < 0) {
                startX = startX + rc.width - width;
            }
            else {
                width = 0;
            }
        }
        else {
            var axisX = math_floor(rc.width * obj.axisLocation + startX) + 0.5, axisY = rc.y, axisWidth = 1.0, axisHeight = h - 2;
            ctx.lineWidth = axisWidth;
            ctx.strokeStyle = obj.axisColor;
            ctx.beginPath();
            for (var len = 0; len <= axisHeight; len += 2) {
                if (obj.direction === 1 ) {
                    ctx.moveTo(2 * x + w - axisX, axisY + len);
                    ctx.lineTo(2 * x + w - axisX, axisY + len + 1);
                }
                else {
                    ctx.moveTo(axisX, axisY + len);
                    ctx.lineTo(axisX, axisY + len + 1);
                }
            }
            ctx.stroke();
            if (obj.scale > 0.0) {
                startX = axisX + axisWidth;
            }
            else if (obj.scale < 0.0) {
                startX = axisX - width;
            }
            else {
                width = 0.0;
            }
        }
        if (obj.showBorder) {
            startX = math_floor(startX) + 0.5;
            width -= 1;
            startY += 0.5;
            height -= 1;
        }
        var linearGradientX0 = startX;
        var linearGradientX1 = startX + width;
        if (obj.direction === 1 ) {
            linearGradientX0 = 2 * x + w - startX - width;
            linearGradientX1 = 2 * x + w - startX;
        }
        if (width >= 0 && height >= 0) {
            var fillStyle = obj.fillColor;
            if (obj.isGradient) {
                var factor = 0.9;
                fillStyle = ctx.createLinearGradient(linearGradientX0, startY, linearGradientX1, startY);
                var tempColor = ColorHelper._fromString(obj.fillColor), color1 = ColorToString(tempColor.a, math_floor(255 * factor + tempColor.r * (1 - factor)), math_floor(255 * factor + tempColor.g * (1 - factor)), math_floor(255 * factor + tempColor.b * (1 - factor))), offset1 = obj.scale < 0 ? 1 - factor : factor, color2 = obj.fillColor, offset2 = obj.scale < 0 ? 1 : 0;
                if (obj.direction === 1 ) {
                    fillStyle.addColorStop(offset1, color2);
                    fillStyle.addColorStop(offset2, color1);
                }
                else {
                    fillStyle.addColorStop(offset1, color1);
                    fillStyle.addColorStop(offset2, color2);
                }
            }
            ctx.fillStyle = fillStyle;
            ctx.fillRect(linearGradientX0, startY, width, height);
            if (obj.showBorder && width > 0 && height > 0) {
                ctx.strokeStyle = obj.borderColor;
                ctx.strokeRect(linearGradientX0, startY, width, height);
            }
        }
    };
    return DataBarRule;
}(ScaleRule));
exports.DataBarRule = DataBarRule;
var proto = {


    gradient: defProperty('gradient', true),


    color: defProperty('color', keyword_null),


    showBorder: defProperty('showBorder', false),


    borderColor: defProperty('borderColor', 'black'),


    dataBarDirection: defProperty('dataBarDirection', 0),


    negativeFillColor: defProperty('negativeFillColor', 'red'),


    useNegativeFillColor: defProperty('useNegativeFillColor', true),


    negativeBorderColor: defProperty('negativeBorderColor', 'black'),


    useNegativeBorderColor: defProperty('useNegativeBorderColor', false),


    axisPosition: defProperty('axisPosition', 0),


    axisColor: defProperty('axisColor', 'black'),


    showBarOnly: defProperty('showBarOnly', false),
};
$.extend(DataBarRule.prototype, proto);


var IconCriterion = (function () {
    function IconCriterion(isGreaterThanOrEqualTo, iconValueType, iconValue) {
        this.isGreaterThanOrEqualTo = isGreaterThanOrEqualTo;
        this.iconValueType = iconValueType;
        this.iconValue = iconValue;
    }
    return IconCriterion;
}());
exports.IconCriterion = IconCriterion;
var IconSetRulePs = ['ruleType', 'ranges', 'iconSetType', 'iconCriteria', 'showIconOnly', 'reverseIconOrder', 'priority', 'icons'];


var IconSetRule = (function (_super) {
    __extends(IconSetRule, _super);
    function IconSetRule(iconSetType, ranges) {
        var _this = this;
        var _iconSetType = iconSetType;
        if (arguments.length === 0) {
            _iconSetType = 0 ;
        }
        _this = _super.call(this, 13 , keyword_null, keyword_null, keyword_null) || this;
        _this._withCondition = false;
        _this.ranges(ranges);
        _this._init(_iconSetType);
        return _this;
    }
    IconSetRule.prototype._initIconSetType = function (iconSetType) {
        var self = this;
        self.iconSetType(iconSetType, false);
        if (self.iconSetType() >= IconSetType.threeArrowsColored && self.iconSetType() <= IconSetType.threeSymbolsUncircled ) {
            self._iconCriteria = [] ;
            self._iconCriteria[0] = new IconCriterion(true, IconValueType.percent , 33);
            self._iconCriteria[1] = new IconCriterion(true, IconValueType.percent , 67);
            self._icons = [];
            self._icons[0] = { iconSetType: iconSetType, iconIndex: 0 };
            self._icons[1] = { iconSetType: iconSetType, iconIndex: 1 };
            self._icons[2] = { iconSetType: iconSetType, iconIndex: 2 };
        }
        else if (self.iconSetType() >= IconSetType.fourArrowsColored && self.iconSetType() <= IconSetType.fourTrafficLights ) {
            self._iconCriteria = [] ;
            self._iconCriteria[0] = new IconCriterion(true, IconValueType.percent , 25);
            self._iconCriteria[1] = new IconCriterion(true, IconValueType.percent , 50);
            self._iconCriteria[2] = new IconCriterion(true, IconValueType.percent , 75);
            self._icons = [];
            self._icons[0] = { iconSetType: iconSetType, iconIndex: 0 };
            self._icons[1] = { iconSetType: iconSetType, iconIndex: 1 };
            self._icons[2] = { iconSetType: iconSetType, iconIndex: 2 };
            self._icons[3] = { iconSetType: iconSetType, iconIndex: 3 };
        }
        else if (self.iconSetType() >= IconSetType.fiveArrowsColored && self.iconSetType() <= IconSetType.fiveBoxes ) {
            self._iconCriteria = [] ;
            self._iconCriteria[0] = new IconCriterion(true, IconValueType.percent , 20);
            self._iconCriteria[1] = new IconCriterion(true, IconValueType.percent , 40);
            self._iconCriteria[2] = new IconCriterion(true, IconValueType.percent , 60);
            self._iconCriteria[3] = new IconCriterion(true, IconValueType.percent , 80);
            self._icons = [];
            self._icons[0] = { iconSetType: iconSetType, iconIndex: 0 };
            self._icons[1] = { iconSetType: iconSetType, iconIndex: 1 };
            self._icons[2] = { iconSetType: iconSetType, iconIndex: 2 };
            self._icons[3] = { iconSetType: iconSetType, iconIndex: 3 };
            self._icons[4] = { iconSetType: iconSetType, iconIndex: 4 };
        }
        else if (self.iconSetType() > IconSetType.fiveBoxes ) {
            self._iconCriteria = [];
            self._icons = [];
        }
    };
    IconSetRule.prototype._init = function (iconSetType) {
        this.showIconOnly(false);
        this.reverseIconOrder(false);
        this._initIconSetType(iconSetType);
    };
    IconSetRule.prototype._modifyIconIndex = function (index) {
        var iconCount = arrayHelper_getLength(this._iconCriteria) + 1;
        if (this.reverseIconOrder() && iconCount > 2) {
            return iconCount - 1 - index;
        }
        return index;
    };
    IconSetRule.prototype._getActualValue = function (evaluator, baseRow, baseColumn, index) {
        var self = this;
        var value = self._iconCriteria[index];
        if (value) {
            switch (value.iconValueType) {
                case IconValueType.formula :
                    return self._calculateValue(evaluator, baseRow, baseColumn, value.iconValue);
                case IconValueType.number :
                    return self._calculateValue(evaluator, baseRow, baseColumn, value.iconValue);
                case IconValueType.percent :
                    return self._calculatePercent(evaluator, baseRow, baseColumn, value.iconValue);
                case IconValueType.percentile :
                    return self._calculatePercentile(evaluator, baseRow, baseColumn, value.iconValue);
                default:
                    return keyword_null;
            }
        }
    };


    IconSetRule.prototype.evaluate = function (evaluator, baseRow, baseColumn, actual) {
        var self = this;
        var value = actual;
        if (isNullOrUndefined(value)) {
            return keyword_null;
        }
        var result = {}, numberValue = (calcConvert_isNumber(actual, true) && typeof value !== 'boolean' && calcConvert_tryToDouble(actual, result)) ? result.value : NaN;
        if (isNaN(numberValue)) {
            return keyword_null;
        }
        var iconCount = 0, iconSetType = self.iconSetType(), iconCriteria = self._iconCriteria;
        if (iconSetType >= IconSetType.fiveArrowsColored ) {
            iconCount = 5;
        }
        else if (iconSetType >= IconSetType.fourArrowsColored ) {
            iconCount = 4;
        }
        else if (iconSetType >= IconSetType.threeArrowsColored ) {
            iconCount = 3;
        }
        if (!iconCriteria) {
            return 0;
        }
        var criterion;
        var modifyIndex = 0;
        for (var n = iconCount - 1; n > 0; n--) {
            if (n < arrayHelper_getLength(iconCriteria) + 1) {
                criterion = iconCriteria[n - 1];
                if (!isNullOrUndefined((criterion && criterion.iconValue))) {
                    var currentValue = self._getActualValue(evaluator, baseRow, baseColumn, n - 1);
                    if (!isNullOrUndefined(currentValue)) {
                        var isGreater = criterion.isGreaterThanOrEqualTo ?
                            numberValue >= currentValue : numberValue > currentValue;
                        if (numberValue < Number.MAX_VALUE && isGreater) {
                            modifyIndex = n;
                            break;
                        }
                    }
                }
            }
        }
        var iconIndex = self._modifyIconIndex(modifyIndex);
        var icons = self._icons;

        if (!icons) {
            return {
                iconSetType: IconSetType.noIcons,
                iconIndex: 0,
                showIconOnly: self.showIconOnly()
            };
        }
        return {
            iconSetType: icons[iconIndex] ? icons[iconIndex].iconSetType : IconSetType.noIcons,
            iconIndex: icons[iconIndex] ? icons[iconIndex].iconIndex : 0,
            showIconOnly: self.showIconOnly()
        };
    };


    IconSetRule.prototype.reset = function () {
        var self = this;
        self.ranges(keyword_null);
        self.condition(keyword_null);
        self.style(keyword_null);
        self.showIconOnly(false);
        self.reverseIconOrder(false);
        self.iconSetType(0 , keyword_null);
        self._iconCriteria = keyword_null;
        self.stopIfTrue(false);
        self.priority(1);
        self.minColor(keyword_null);
        self.minValue(keyword_null);
        self.minType(5 );
        self.midColor(keyword_null);
        self.midValue(keyword_null);
        self.midType(keyword_null);
        self.maxColor(keyword_null);
        self.maxValue(keyword_null);
        self.maxType(7 );
        self._icons = keyword_null;
    };


    IconSetRule.prototype.icons = function (value) {
        if (arguments.length === 1) {
            this._icons = value;
        }
        return this._icons;
    };


    IconSetRule.prototype.iconCriteria = function () {
        return this._iconCriteria;
    };
    IconSetRule.prototype.toJSON = function (context) {
        return toJsonFn.call(this, context, IconSetRulePs);
    };
    IconSetRule.prototype.fromJSON = function (settings, context, noSchema) {
        fromJsonFn.call(this, context, IconSetRulePs, settings, noSchema);
        this.initCondition(context);
    };


    IconSetRule.getIcon = function (iconSetType, iconIndex) {
        return keyword_null;
    };
    IconSetRule._drawImage = function (ctx, imgSrc, startX, startY, width, height, imageLoader) {
        if (imageLoader._getState(imgSrc)) {
            var imageObj = imageLoader._getImage(imgSrc);
            ctx.drawImage(imageObj, startX, startY, width, height);
        }
        else {
            imageLoader._addImage(imgSrc);
        }
    };
    IconSetRule.paintIconSet = function (ctx, obj, x, y, w, h, style, lineHeight, zoomFactor, imageLoader) {
        var startX, startY;
        var fontSize = Core_1._StyleHelper._scaleFont(style.font, 1).fontSize;
        var iconSize = fontSize;
        var adjX = 2, adjY = 2;
        startX = x + adjX;
        if (obj.showIconOnly) {
            if (style.hAlign === 1 ) {
                startX = x + w / 2 - iconSize / 2;
            }
            else if (style.hAlign === 2 ) {
                startX = x + w - adjX - iconSize - 2 ;
            }
        }
        if (style.vAlign === 1 ) {
            startY = y + h / 2 - iconSize / 2;
        }
        else if (style.vAlign === 2 ) {
            startY = y + h - adjY - lineHeight / 2 - iconSize / 2;
        }
        else {
            startY = y + adjY + lineHeight / 2 - iconSize / 2;
        }
        if (obj.iconSetType === IconSetType.noIcons) {
            return;
        }

        var icon = IconSetRule.getIcon(obj.iconSetType, obj.iconIndex);
        if (icon && $.getType(icon) === 'string' && imageLoader) {
            try {
                IconSetRule._drawImage(ctx, icon, startX, startY, iconSize, iconSize, imageLoader);
            }
            catch (ex) {

            }
        }
        else {
            drawCanvasImage(ctx, obj, startX, startY, iconSize, x, y, w, h);
        }
    };
    return IconSetRule;
}(ScaleRule));
exports.IconSetRule = IconSetRule;
var IconSetRuleProto = {


    iconSetType: defProperty('iconSetType', IconSetType.threeArrowsColored , function (value) {
        this._initIconSetType(value);
    }),


    reverseIconOrder: defProperty('reverseIconOrder', false),


    showIconOnly: defProperty('showIconOnly', false),
};
$.extend(IconSetRule.prototype, IconSetRuleProto);
function adjustCellValueRuleValue(value) {
    if (typeof value === 'string') {
        value = $.trim(value);
        if (value[0] !== '=') {
            value = '="' + stringHelper._replace(value, '"', '""') + '"';
        }
    }
    return value;
}
var StateConditionRulePS = ['ruleType', 'state', 'style', 'priority', 'stopIfTrue', 'ranges'];
var StateRule = (function (_super) {
    __extends(StateRule, _super);
    function StateRule(ruleType, state, style, ranges) {
        var _this = _super.call(this, ruleType, style, ranges) || this;
        var self = _this;
        self.state(state);
        return _this;
    }
    StateRule.prototype.isRow = function () {
        var self = this;
        var ruleType = self.ruleType();
        if (isNullOrUndefined(self._isRow)) {
            if (ruleType === RuleType.rowStateRule) {
                self._isRow = true;
            }
            else if (ruleType === RuleType.columnStateRule) {
                self._isRow = false;
            }
        }
        return this._isRow;
    };
    StateRule.prototype.isStateRule = function () {
        return true;
    };
    StateRule.prototype._createStateCondition = function () {
        var self = this;
        var state = self.state();
        var ranges = self.ranges();
        return exports._createCondition(ConditionType.stateCondition, StateComparisonOperators.contains, state, keyword_undefined, keyword_undefined, keyword_undefined, ranges);
    };
    StateRule.prototype.rowStateRuleCreateCondition = function () {
        return this._createStateCondition();
    };
    StateRule.prototype.columnStateRuleCreateCondition = function () {
        return this._createStateCondition();
    };
    StateRule.prototype.createCondition = function () {
        return this[RuleType[this.ruleType()] + 'CreateCondition']();
    };
    StateRule.prototype.evaluate = function (evaluator, baseRow, baseColumn, actual) {
        var self = this;
        var isRow = self.isRow();
        if (isRow) {
            baseColumn = -1;
        }
        else {
            baseRow = -1;
        }
        return _super.prototype.evaluate.call(this, evaluator, baseRow, baseColumn, actual);
    };
    StateRule.prototype._lowerPriorityThan = function (ruleB) {
        var ruleA = this;
        return StateRule.StatesPriority.indexOf(ruleA.state()) < StateRule.StatesPriority.indexOf(ruleB.state());
    };
    StateRule.prototype.fromJSON = function (settings, context, noSchema) {
        var newStateConditionRulePS = StateConditionRulePS;
        if (!isNullOrUndefined(settings.condition)) {
            newStateConditionRulePS = StateConditionRulePS.concat(['condition']);
        }
        fromJsonFn.call(this, context, newStateConditionRulePS, settings, noSchema);
        this.initCondition(context);
    };
    StateRule.prototype.toJSON = function (context) {
        var self = this;
        if (isNullOrUndefined(self.condition())) {
            this.initCondition();
        }
        var obj = toJsonFn.call(self, context, StateConditionRulePS);
        var ruleType = self.ruleType();
        if (ruleType === RuleType.conditionRuleBase) {
            obj.condition = self.condition().toJSON();
        }
        return obj;
    };

    StateRule.StatesPriority = [Core_1.StatesType.readonly, Core_1.StatesType.invalid, Core_1.StatesType.dirty, Core_1.StatesType.inserted, Core_1.StatesType.updated, Core_1.StatesType.selected, Core_1.StatesType.active, Core_1.StatesType.hover, Core_1.StatesType.edit];
    return StateRule;
}(ConditionRuleBase));
exports.StateRule = StateRule;
StateRule.prototype.state = defProperty('state', keyword_null);
var ConditionalFormats = (function () {
    function ConditionalFormats(worksheet) {
        this._rules = [];
        this._ruleTypes = keyword_null;
        this._cellRuleCache = {};
        this._enableCache = true;
        this._worksheet = worksheet;
    }
    ConditionalFormats.prototype._dispose = function () {
        this._worksheet = keyword_null;
    };


    ConditionalFormats.prototype.getRule = function (index) {
        return this._rules[index];
    };


    ConditionalFormats.prototype.count = function () {
        return arrayHelper_getLength(this._rules);
    };
    ConditionalFormats.prototype._getAllRules = function () {
        return this._rules;
    };
    ConditionalFormats.prototype._cloneToActualRanges = function (ranges) {
        var newRanges = [], sheet = this._worksheet;
        var length = arrayHelper_getLength(ranges);
        for (var i = 0; i < length; i++) {
            var actualRange = sheet._getActualRange(ranges[i]);
            newRanges.push(actualRange);
        }
        return newRanges;
    };
    ConditionalFormats.prototype._cloneToRanges = function (actualRanges) {
        var newRanges = [], sheet = this._worksheet;
        for (var i = 0, len = arrayHelper_getLength(actualRanges); i < len; i++) {
            var actualRange = actualRanges[i], range = new Range(actualRange.row, actualRange.col, getRowCount(actualRange), getColCount(actualRange));
            if (actualRange.row === 0 && getRowCount(actualRange) === sheet.getRowCount()) {
                range.row = -1;
            }
            if (actualRange.col === 0 && getColCount(actualRange) === sheet.getColumnCount()) {
                range.col = -1;
            }
            newRanges.push(range);
        }
        return newRanges;
    };
    ConditionalFormats.prototype._resetCache = function () {
        if (!this._enableCache) {
            return;
        }
        this._cellRuleCache = {};
        if (this._rules) {
            for (var i = 0; i < arrayHelper_getLength(this._rules); i++) {
                this._addCache(this._rules[i]);
            }
        }
    };
    ConditionalFormats.prototype._clearCellRuleCache = function () {
        if (!this._enableCache) {
            return;
        }
        this._cellRuleCache = {};
    };
    ConditionalFormats.prototype._addCache = function (rule) {
        if (!this._enableCache) {
            return;
        }
        var self = this, cellRuleCache = self._cellRuleCache, rowCache, cellCache, row, col, ranges = self._cloneToActualRanges(rule.ranges());
        var sheet = self._worksheet, sheetRowCount = sheet.getRowCount(), sheetColCount = sheet.getColumnCount();
        for (var i = 0; i < arrayHelper_getLength(ranges); i++) {
            var range = ranges[i];
            var rangeRow = range.row, rangeCol = range.col, rangeRowCount = getRowCount(range), rangeColCount = getColCount(range);
            if (rangeRow + rangeRowCount - 1 >= sheetRowCount) {
                rangeRowCount = sheetRowCount - rangeRow;
            }
            if (rangeCol + rangeColCount - 1 >= sheetColCount) {
                rangeColCount = sheetColCount - rangeCol;
            }
            for (var r = 0; r < rangeRowCount; r++) {
                row = r + rangeRow;
                rowCache = cellRuleCache[row];
                if (!rowCache) {
                    cellRuleCache[row] = rowCache = [];
                }
                for (var c = 0; c < rangeColCount; c++) {
                    col = c + rangeCol;
                    cellCache = rowCache[col];
                    if (!cellCache) {
                        rowCache[col] = cellCache = [];
                    }
                    cellCache.push(rule);
                }
            }
        }
    };
    ConditionalFormats.prototype._removeCache = function (rule) {
        if (!this._enableCache) {
            return;
        }
        var cellRuleCache = this._cellRuleCache, rowCache, cellCache, row, col, ranges = this._cloneToActualRanges(rule.ranges());
        for (var i = 0; i < arrayHelper_getLength(ranges); i++) {
            var range = ranges[i];
            for (var r = 0; r < getRowCount(range); r++) {
                row = r + range.row;
                rowCache = cellRuleCache[row];
                if (!rowCache) {
                    continue;
                }
                for (var c = 0; c < getColCount(range); c++) {
                    col = c + range.col;
                    cellCache = rowCache[col];
                    if (!cellCache) {
                        continue;
                    }
                    var newCellCache = [];
                    for (var k = 0; k < arrayHelper_getLength(cellCache); k++) {
                        if (cellCache[k] !== rule) {
                            newCellCache.push(cellCache[k]);
                        }
                    }
                    if (arrayHelper_getLength(newCellCache) === 0) {
                        newCellCache = keyword_undefined;
                    }
                    rowCache[col] = newCellCache;
                }
            }
        }
    };
    ConditionalFormats.prototype._removeCacheByRange = function (row, col, rowCount, colCount) {
        if (!this._enableCache) {
            return;
        }
        var r, c, caches = this._cellRuleCache, rowCache;
        for (var i = 0; i < rowCount; i++) {
            r = i + row;
            rowCache = caches[r];
            if (rowCache) {
                for (var j = 0; j < colCount; j++) {
                    c = j + col;
                    rowCache[c] = keyword_undefined;
                }
            }
        }
    };
    ConditionalFormats.prototype._getRulesWithoutCache = function (row, column) {
        var rules = [];
        for (var i = 0; i < arrayHelper_getLength(this._rules); i++) {
            var rule = this._rules[i];
            if (rule.contains(row, column)) {
                rules.push(rule);
            }
        }
        return rules;
    };


    ConditionalFormats.prototype.addSpecificTextRule = function (comparisonOperator, text, style, ranges) {
        var rule = new NormalConditionRule(2 , ranges, style, comparisonOperator, keyword_null, keyword_null, text);
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addCellValueRule = function (comparisonOperator, value1, value2, style, ranges) {
        var rule = new NormalConditionRule(1 , ranges, style, comparisonOperator, adjustCellValueRuleValue(value1), adjustCellValueRuleValue(value2));
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addDateOccurringRule = function (type, style, ranges) {
        var rule = new NormalConditionRule(4 , ranges, style, keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, type);
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addFormulaRule = function (formula, style, ranges) {
        var rule = new NormalConditionRule(3 , ranges, style, keyword_null, keyword_null, keyword_null, keyword_null, formula);
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addTop10Rule = function (type, rank, style, ranges) {
        var rule = new NormalConditionRule(5 , ranges, style, keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, type, rank);
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addUniqueRule = function (style, ranges) {
        var rule = new NormalConditionRule(6 , ranges, style);
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addDuplicateRule = function (style, ranges) {
        var rule = new NormalConditionRule(7 , ranges, style);
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addAverageRule = function (type, style, ranges) {
        var rule = new NormalConditionRule(8 , ranges, style, keyword_null, keyword_null, keyword_null, keyword_null, keyword_null, type);
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.add3ScaleRule = function (minType, minValue, minColor, midType, midValue, midColor, maxType, maxValue, maxColor, ranges) {
        var rule;
        if (arguments.length === 0) {
            rule = new ScaleRule(11 );
        }
        else {
            rule = new ScaleRule(11 , minType, minValue, minColor, midType, midValue, midColor, maxType, maxValue, maxColor, ranges);
        }
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.add2ScaleRule = function (minType, minValue, minColor, maxType, maxValue, maxColor, ranges) {
        var rule;
        if (arguments.length === 0) {
            rule = new ScaleRule(10 );
        }
        else {
            rule = new ScaleRule(10 , minType, minValue, minColor, keyword_null, keyword_null, keyword_null, maxType, maxValue, maxColor, ranges);
        }
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addDataBarRule = function (minType, minValue, maxType, maxValue, color, ranges) {
        var rule;
        if (arguments.length === 0) {
            rule = new DataBarRule();
        }
        else {
            rule = new DataBarRule(minType, minValue, maxType, maxValue, color, ranges);
        }
        return this.addRule(rule);
    };


    ConditionalFormats.prototype.addIconSetRule = function (iconSetType, ranges) {
        var rule = new IconSetRule(iconSetType, ranges);
        return this.addRule(rule);
    };
    ConditionalFormats.prototype.addRowStateRule = function (state, style, startRow, rowCount) {
        var self = this, sheet = self._worksheet;
        if (isNullOrUndefined(startRow)) {
            startRow = 0;
        }
        if (isNullOrUndefined(rowCount)) {
            rowCount = sheet.getRowCount() - startRow;
        }
        var ranges = [new Range(startRow, -1, rowCount, -1)];
        var rule = new StateRule(RuleType.rowStateRule, state, style, ranges);
        sheet._statesManager.enableState(state, true);
        return self.addRule(rule);
    };
    ConditionalFormats.prototype.addColumnStateRule = function (state, style, startColumn, columnCount) {
        var self = this, sheet = self._worksheet;
        if (isNullOrUndefined(startColumn)) {
            startColumn = 0;
        }
        if (isNullOrUndefined(columnCount)) {
            columnCount = sheet.getRowCount() - startColumn;
        }
        var ranges = [new Range(-1, startColumn, -1, columnCount)];
        var rule = new StateRule(RuleType.columnStateRule, state, style, ranges);
        sheet._statesManager.enableState(state, false);
        return self.addRule(rule);
    };


    ConditionalFormats.prototype.addRule = function (rule) {
        var self = this, sheet = self._worksheet;
        if (sheet) {
            if (!rule) {
                throw new Error(getSR().Exp_RuleIsNull);
            }
            var ranges = rule.ranges(), baseRow = void 0, baseColumn = void 0;
            if (ranges) {
                var baseRowCol = getBaseRowBaseCol(ranges);
                baseRow = baseRowCol.r;
                baseColumn = baseRowCol.c;

                rule.ranges(ranges.slice(0));
            }
            var style = rule.getExpected();
            var formatter = style && style.formatter;
            if (formatter && typeof formatter === 'string') {
                sheet._processFormatString(baseRow || 0, baseColumn || 0, formatter);
            }
            sheet._modelManager._backupConditionalRules();
            var priority = 1, index = void 0, length_10 = arrayHelper_getLength(self._rules);
            for (index = 0; index < length_10; index++) {
                var _rule = self._rules[index];
                var _ps = _rule._ps;
                var _priority = _ps.priority || 1;
                _ps.priority = _priority + 1;
                if (rule.isStateRule() && _rule.isStateRule() && rule._lowerPriorityThan(_rule)) {
                    priority = math_max(priority, _ps.priority);
                    _ps.priority -= 1;
                }
            }
            rule.priority(priority);
            self._rules.push(rule);
            ConditionalFormats._callFeatureHandler(sheet, 'onRuleAdded', {
                ranges: ranges
            });
            rule.context(sheet);
            self._addCache(rule);
            sheet._invalidate();
            return rule;
        }
    };


    ConditionalFormats.prototype.removeRule = function (rule) {
        var self = this, sheet = self._worksheet, spread = sheet.parent;
        if (sheet) {
            if (rule) {
                var style = rule.getExpected();
                var formatter = style && style.formatter;
                if (formatter && typeof (formatter) === 'string' && spread._formatStringCustomNameInfos[formatter]) {
                    spread._removeFormatStringCustomName(formatter);
                }
                sheet._modelManager._backupConditionalRules();
                self._removeCache(rule);
                arrayHelper_remove(self._rules, rule);
                ConditionalFormats._callFeatureHandler(sheet, 'onRuleRemoved', {
                    priority: rule.priority(),
                    ranges: rule.ranges()
                });
                if (rule.isStateRule()) {
                    var state = rule.state();
                    var isRow = rule.isRow();
                    var hasSameStateRule = false;
                    for (var _i = 0, _a = self._rules; _i < _a.length; _i++) {
                        var _rule = _a[_i];
                        if (_rule.isStateRule() && _rule.state() === state) {
                            hasSameStateRule = true;
                            break;
                        }
                    }
                    if (!hasSameStateRule) {
                        sheet._statesManager.disableState(state, isRow);
                    }
                }
            }
            sheet._invalidate();
        }
    };
    ConditionalFormats.prototype._removeRange = function (srcRange, row, column, rowCount, columnCount) {
        if (!srcRange.intersect(row, column, rowCount, columnCount)) {
            return [srcRange];
        }
        var sourceRowTop = srcRange.row;
        var sourceRowBottom = srcRange.row + getRowCount(srcRange) - 1;
        var sourceColumnLeft = srcRange.col;
        var sourceColumnRight = srcRange.col + getColCount(srcRange) - 1;
        var removeRowTop = row;
        var removeRowBottom = row + rowCount - 1;
        var removeColumnLeft = column;
        var removeColumnRight = column + columnCount - 1;
        var newRanges = [];

        if (sourceRowTop !== -1 && sourceColumnLeft !== -1 && removeRowTop !== -1 && removeColumnLeft !== -1) {
            if (removeColumnLeft - sourceColumnLeft > 0) {
                var left = createRange(sourceRowTop, sourceColumnLeft, getRowCount(srcRange), removeColumnLeft - sourceColumnLeft);
                newRanges.push(left);
            }
            if (sourceColumnRight - removeColumnRight > 0) {
                var right = createRange(sourceRowTop, removeColumnRight + 1, getRowCount(srcRange), sourceColumnRight - removeColumnRight);
                newRanges.push(right);
            }
            if (removeRowTop - sourceRowTop > 0) {
                var top_1 = createRange(sourceRowTop, math_max(removeColumnLeft, sourceColumnLeft), removeRowTop - sourceRowTop, math_min(removeColumnRight, sourceColumnRight) - math_max(removeColumnLeft, sourceColumnLeft) + 1);
                newRanges.push(top_1);
            }
            if (sourceRowBottom - removeRowBottom > 0) {
                var bottom = createRange(removeRowBottom + 1, math_max(removeColumnLeft, sourceColumnLeft), sourceRowBottom - removeRowBottom, math_min(removeColumnRight, sourceColumnRight) - math_max(removeColumnLeft, sourceColumnLeft) + 1);
                newRanges.push(bottom);
            }
        }
        if (arrayHelper_getLength(newRanges) > 0) {
            return newRanges;
        }
        return keyword_null;
    };


    ConditionalFormats.prototype.removeRuleByRange = function (row, column, rowCount, columnCount) {
        var self = this, sheet = self._worksheet;
        if (sheet) {
            var removeRules = [];
            if (self._rules) {
                sheet._modelManager._backupConditionalRules();
                self._removeCacheByRange(row, column, rowCount, columnCount);
                for (var i = 0, rulesLength = arrayHelper_getLength(self._rules); i < rulesLength; i++) {
                    var rule = self._rules[i];
                    ConditionalFormats._callFeatureHandler(sheet, 'onRuleRemoved', {
                        ranges: [new Range(row, column, rowCount, columnCount)]
                    });
                    if (rule && rule.ranges() && rule.intersects(row, column, rowCount, columnCount)) {
                        if (sheet.pivotTables && rule.pivotTableName) {
                            var pivotTable = sheet.pivotTables.get(rule.pivotTableName);
                            pivotTable._removeRuleByRange(rule, row, column, rowCount, columnCount);
                        }
                        else {
                            var newRanges = [], actualRanges = self._cloneToActualRanges(rule.ranges());
                            for (var j = 0, rangesLength = arrayHelper_getLength(actualRanges); j < rangesLength; j++) {
                                var ranges = self._removeRange(actualRanges[j], row, column, rowCount, columnCount);
                                if (ranges) {
                                    newRanges = newRanges.concat(ranges);
                                }
                            }
                            if (arrayHelper_getLength(newRanges) > 0) {
                                rule.ranges(self._cloneToRanges(newRanges));
                            }
                            else {
                                removeRules.push(rule);
                            }
                        }
                    }
                }
            }
            for (var k = 0, length_11 = arrayHelper_getLength(removeRules); k < length_11; k++) {
                arrayHelper_remove(self._rules, removeRules[k]);
            }
            sheet._invalidate();
        }
    };


    ConditionalFormats.prototype.clearRule = function () {
        var self = this, sheet = self._worksheet, spread = sheet.parent;
        if (sheet) {
            var rules = self._rules;
            sheet._modelManager._backupConditionalRules();
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                var style = rule.getExpected();
                var formatter = style && style.formatter;
                ConditionalFormats._callFeatureHandler(sheet, 'onRuleRemoved', {
                    ranges: rule.ranges()
                });
                if (formatter && typeof (formatter) === 'string' && spread._formatStringCustomNameInfos[formatter]) {
                    spread._removeFormatStringCustomName(formatter);
                }
            }
            if (sheet.pivotTables) {
                var pivotTables = sheet.pivotTables.all();
                for (var i = 0; i < pivotTables.length; i++) {
                    var pivotTable = pivotTables[i];
                    pivotTable._clearRules();
                }
            }
            self._rules.length = 0;
            self._resetCache();
            sheet._invalidate();
        }
    };


    ConditionalFormats.prototype.getRules = function (row, column) {
        var self = this;
        var rules = self._rules;
        if (arguments.length === 0 || arrayHelper_getLength(rules) === 0) {
            return rules;
        }
        row = row === keyword_undefined ? -1 : row;
        column = column === keyword_undefined ? -1 : column;
        var rulesTemp = [];
        if (self._enableCache) {
            var caches_1 = self._cellRuleCache, cellCache_1, rowCache = void 0;
            if (row !== -1 && column !== -1) {
                rowCache = caches_1[row];
                if (rowCache) {
                    cellCache_1 = rowCache[column];
                    addRuleToArray(rulesTemp, cellCache_1);
                }
            }
            else if (row === -1) {
                $.each(caches_1, function (p, rowCacheItem) {
                    cellCache_1 = rowCacheItem[column];
                    addRuleToArray(rulesTemp, cellCache_1);
                });
            }
            else {
                rowCache = caches_1[row];
                if (rowCache) {
                    $.each(rowCache, function (p, cellCacheItem) {
                        addRuleToArray(rulesTemp, cellCacheItem);
                    });
                }
            }
        }
        else {
            var sheet = self._worksheet, sheetRowCount = sheet.getRowCount(), sheetColCount = sheet.getColumnCount();
            var i = void 0;
            if (row !== -1 && column !== -1) {
                addRuleToArray(rulesTemp, self._getRulesWithoutCache(row, column));
            }
            else if (row === -1) {
                for (i = 0; i < sheetRowCount; i++) {
                    addRuleToArray(rulesTemp, self._getRulesWithoutCache(i, column));
                }
            }
            else {
                for (i = 0; i < sheetColCount; i++) {
                    addRuleToArray(rulesTemp, self._getRulesWithoutCache(row, i));
                }
            }
        }
        return rulesTemp;
    };


    ConditionalFormats.prototype.containsRule = function (rule, row, column) {
        if (rule && arrayHelper._contains(this._rules, rule)) {
            return rule.contains(row, column);
        }
        return false;
    };
    ConditionalFormats.prototype._setRuleToSpecifiedIndex = function (rule, index) {
        var self = this, sheet = self._worksheet;
        if (sheet) {
            if (!rule) {
                throw new Error(getSR().Exp_RuleIsNull);
            }
            var ranges = rule.ranges(), baseRow = void 0, baseColumn = void 0;
            if (ranges) {
                var baseRowCol = getBaseRowBaseCol(ranges);
                baseRow = baseRowCol.r;
                baseColumn = baseRowCol.c;
            }
            var style = rule.getExpected();
            var formatter = style && style.formatter;
            if (formatter && typeof formatter === 'string') {
                sheet._processFormatString(baseRow || 0, baseColumn || 0, formatter);
            }
            sheet._modelManager._backupConditionalRules();
            for (var ruleIndex = 0, length_12 = arrayHelper_getLength(self._rules); ruleIndex < length_12; ruleIndex++) {
                var _ps = self._rules[ruleIndex]._ps;
                var priority = _ps.priority || 1;
                if (index <= priority) {
                    _ps.priority = priority + 1;
                }
            }
            rule.priority(index);
            self._rules[index] = rule;
            rule.context(sheet);
            self._addCache(rule);
            sheet._invalidate();
            return rule;
        }
    };
    ConditionalFormats.prototype._updateRangesByTable = function (tableRange, dataRange, deltaRowCount) {
        var self = this, sheet = self._worksheet, modelManager = sheet._modelManager, rules = self._rules, length = arrayHelper_getLength(rules), isUpdated = false;
        modelManager._backupConditionalRules();
        for (var i = 0; i < length; i++) {
            var rule = rules[i];
            if (rule && rule._updateRangesByTable(tableRange, dataRange, deltaRowCount)) {
                isUpdated = true;
            }
        }
        if (isUpdated) {
            self._resetCache();
        }
    };
    ConditionalFormats.prototype._addData = function (index, count, isRow, affectRanges, isFromTable) {
        var self = this;
        if (self._rules && self._worksheet) {
            var length_13 = arrayHelper_getLength(self._rules);
            for (var i = 0; i < length_13; i++) {
                var rule = self._rules[i];
                if (rule) {
                    if (isRow) {
                        rule._onRowsAdded(index, count, affectRanges, isFromTable);
                    }
                    else {
                        rule._onColumnsAdded(index, count, affectRanges, isFromTable);
                    }
                }
            }
        }
        self._resetCache();
    };
    ConditionalFormats.prototype._onRowsAdded = function (row, rowCount, affectRanges, isFromTable) {
        this._addData(row, rowCount, true, affectRanges, isFromTable);
    };
    ConditionalFormats.prototype._onColumnsAdded = function (col, colCount, affectRanges, isFromTable) {
        this._addData(col, colCount, false, affectRanges, isFromTable);
    };
    ConditionalFormats.prototype._removeData = function (index, count, isRow, affectRanges, isFromTable) {
        var self = this;
        if (self._rules && self._worksheet) {
            var length_14 = arrayHelper_getLength(self._rules);
            for (var i = length_14 - 1; i >= 0; i--) {
                var rule = self._rules[i];
                if (rule) {
                    if (isRow) {
                        rule._onRowsRemoved(index, count, affectRanges, isFromTable);
                    }
                    else {
                        rule._onColumnsRemoved(index, count, affectRanges, isFromTable);
                    }
                    if (rule.ranges().length <= 0) {
                        self._removeCache(rule);
                        self._rules.splice(i, 1);
                    }
                }
            }
        }
        self._resetCache();
    };
    ConditionalFormats.prototype._onRowsRemoved = function (row, rowCount, affectRanges, isFromTable) {
        this._removeData(row, rowCount, true, affectRanges, isFromTable);
    };
    ConditionalFormats.prototype._onColumnsRemoved = function (col, colCount, affectRanges, isFromTable) {
        this._removeData(col, colCount, false, affectRanges, isFromTable);
    };
    ConditionalFormats.prototype._clearCache = function () {
        var rules = this._rules, rule;
        if (rules !== keyword_null && arrayHelper_getLength(rules) > 0) {
            for (var i = 0, count = arrayHelper_getLength(rules); i < count; i++) {
                rule = rules[i];
                if (rule._clearCache) {
                    rule._clearCache();
                }
            }
        }
    };
    ConditionalFormats.prototype._copyRules = function (srcRow, srcColumn, destConditionalFormats, destRow, destColumn, copyRowCount, copyColumnCount, isSameSheet, ignorePasteSkipInvisibleRange) {
        var cacheRules = [], cacheRanges = [];
        var dealedRanges = [];
        var dealedRules = [];
        var destRanges = [];
        var self = this, sheet = self._worksheet, pasteSkipInvisibleRange = !ignorePasteSkipInvisibleRange && sheet._getPasteSkipInvisibleRange();
        if (srcRow === -1) {
            srcRow = 0;
            destRow = 0;
            copyRowCount = sheet.getRowCount();
        }
        if (srcColumn === -1) {
            srcColumn = 0;
            destColumn = 0;
            copyColumnCount = sheet.getColumnCount();
        }
        for (var rowOffset = 0; rowOffset < copyRowCount; rowOffset++) {
            for (var colOffset = 0; colOffset < copyColumnCount; colOffset++) {
                var srcRules = self.getRules(srcRow + rowOffset, srcColumn + colOffset);
                for (var ruleIndex = 0; ruleIndex < arrayHelper_getLength(srcRules); ruleIndex++) {
                    var rule = srcRules[ruleIndex], ruleRanges = rule.ranges();
                    if (rule.isStateRule()) {
                        continue;
                    }
                    var tempRanges = [];
                    for (var rangeIndex = 0; rangeIndex < arrayHelper_getLength(ruleRanges); rangeIndex++) {
                        var range = ruleRanges[rangeIndex], actualRange = sheet._getActualRange(range), row = actualRange.row, col = actualRange.col, rowCount = getRowCount(actualRange), colCount = getColCount(actualRange);


                        var unsolved = arrayHelper_indexOf(dealedRanges, range) <= -1 || (arrayHelper_indexOf(dealedRanges, range) > -1 && arrayHelper_indexOf(dealedRules, rule) <= -1);
                        if (unsolved && range.contains(srcRow + rowOffset, srcColumn + colOffset)) {
                            dealedRanges.push(range);
                            dealedRules.push(rule);
                            var newRange = createRange(destRow + rowOffset, destColumn + colOffset, -1, -1);


                            if (row + rowCount >= copyRowCount + srcRow) {
                                newRange.rowCount = copyRowCount - rowOffset;
                            }
                            else if (srcRow < row) {
                                newRange.rowCount = rowCount;
                            }
                            else {
                                newRange.rowCount = row + rowCount - srcRow;
                            }

                            if (col + colCount >= copyColumnCount + srcColumn) {
                                newRange.colCount = copyColumnCount - colOffset;
                            }
                            else if (srcColumn < col) {
                                newRange.colCount = colCount;
                            }
                            else {
                                newRange.colCount = col + colCount - srcColumn;
                            }
                            if (self !== destConditionalFormats || !range.containsRange(newRange)) {
                                tempRanges.push(newRange);
                            }
                            if (isSameSheet && !containRange(destRanges, newRange)) {
                                destRanges.push(newRange);
                            }
                        }
                    }
                    if (tempRanges.length > 0) {
                        var indexOfRule = cacheRules.indexOf(rule);
                        if (indexOfRule < 0) {
                            if (pasteSkipInvisibleRange) {
                                tempRanges = self._transformRangeToMultipleVisibleRange(tempRanges);
                            }
                            cacheRules.push(rule);
                            cacheRanges.push(tempRanges);
                        }
                        else {
                            if (pasteSkipInvisibleRange) {
                                var offsetRowCount = void 0, offsetColCount = void 0, invisibleRowCount = void 0, invisibleColCount = void 0, firstRow = cacheRanges[indexOfRule][0].row, firstCol = cacheRanges[indexOfRule][0].col, currentRange = tempRanges[0];
                                offsetRowCount = currentRange.row - firstRow;
                                offsetColCount = currentRange.col - firstCol;
                                invisibleRowCount = sheet._getNextInvisibleCount(firstRow, offsetRowCount, true);
                                invisibleColCount = sheet._getNextInvisibleCount(firstCol, offsetColCount);
                                currentRange.row += invisibleRowCount;
                                currentRange.col += invisibleColCount;
                                tempRanges = self._transformRangeToMultipleVisibleRange(tempRanges);
                            }
                            cacheRanges[indexOfRule] = cacheRanges[indexOfRule].concat(tempRanges);
                        }
                    }
                }
            }
        }
        for (var i = 0, length_15 = cacheRules.length; i < length_15; i++) {
            var clonedRule = self._createRuleFromJson(cacheRules[i].toJSON(), cacheRules[i].context());
            var oldRanges = clonedRule.ranges();


            clonedRule.ranges(cacheRanges[i]);
            var oldFormula = clonedRule._formula;
            if (oldFormula) {
                var useR1C1 = sheet.parent.options.referenceStyle === 1 ;
                var oldBaseRowBaseCol = getBaseRowBaseCol(oldRanges);
                var expression = SheetsCalc.formulaToExpression(sheet, oldFormula, oldBaseRowBaseCol.r, oldBaseRowBaseCol.c, useR1C1);
                var newBaseRowBaseCol = getBaseRowBaseCol(cacheRanges[i]);
                var formula = SheetsCalc.expressionToFormula(sheet, expression, newBaseRowBaseCol.r, newBaseRowBaseCol.c, useR1C1);
                clonedRule.formula(formula);
            }
            destConditionalFormats.addRule(clonedRule);
        }
        self._resetCache();
        return destRanges;
    };
    ConditionalFormats.prototype._transformRangeToMultipleVisibleRange = function (ranges) {
        var self = this, sheet = self._worksheet, range;
        var retv = [];
        if (ranges.length > 0) {
            range = ranges[0];
            var row = range.row, col = range.col, rowCount = range.rowCount, colCount = range.colCount;
            rowCount += sheet._getNextInvisibleCount(row, rowCount, true);
            colCount += sheet._getNextInvisibleCount(col, colCount);
            var tempRanges = [];
            var tempRange = void 0;
            for (var c = 0; c < colCount; c++) {
                if (c === 0) {
                    tempRange = new Range(row, col, 1, 1);
                    continue;
                }
                if (sheet.getColumnWidth(col + c) !== 0) {
                    tempRange.colCount++;
                }
                else {
                    tempRanges.push(tempRange);
                    c = sheet._getNextVisualColumn(col + c - 1) - 1 - col;
                    tempRange = new Range(row, col + c + 1, 1, 0);
                }
            }
            tempRanges.push(tempRange);
            for (var r = 0; r < rowCount; r++) {
                if (r === 0) {
                    continue;
                }
                if (sheet.getRowHeight(row + r) !== 0) {
                    for (var i = 0; i < tempRanges.length; i++) {
                        tempRanges[i].rowCount++;
                    }
                }
                else {
                    retv = retv.concat(cloneRanges(tempRanges));
                    r = sheet._getNextVisualRow(row + r - 1) - 1 - row;
                    for (var i = 0; i < tempRanges.length; i++) {
                        tempRanges[i].rowCount = 0;
                        tempRanges[i].row = row + r + 1;
                    }
                }
            }
            retv = retv.concat(tempRanges);
        }
        return retv;
    };
    ConditionalFormats.prototype._onRulesMoved = function (srcRow, srcColumn, moveRowCount, moveColumnCount, destRanges, isSameSheet) {
        var dealedRanges = [];
        var self = this, sheet = self._worksheet;
        var maxRowCount = sheet.getRowCount(3 ), maxColCount = sheet.getColumnCount(3 );
        if (srcRow === -1) {
            srcRow = 0;
            moveRowCount = sheet.getRowCount();
        }
        if (srcColumn === -1) {
            srcColumn = 0;
            moveColumnCount = sheet.getColumnCount();
        }
        for (var rowOffset = 0; rowOffset < moveRowCount; rowOffset++) {
            for (var colOffset = 0; colOffset < moveColumnCount; colOffset++) {
                var srcRules = self.getRules(srcRow + rowOffset, srcColumn + colOffset);
                for (var ruleIndex = 0; ruleIndex < arrayHelper_getLength(srcRules); ruleIndex++) {
                    var rule = srcRules[ruleIndex], ruleRanges = rule.ranges();
                    if (rule.isStateRule()) {
                        continue;
                    }
                    var newRanges = [];
                    for (var rangeIndex = 0; rangeIndex < arrayHelper_getLength(ruleRanges); rangeIndex++) {
                        var range = ruleRanges[rangeIndex], actualRange = sheet._getActualRange(range), row = actualRange.row, col = actualRange.col, rowCount = getRowCount(actualRange), colCount = getColCount(actualRange);
                        if (containRange(destRanges, range)) {
                            continue;
                        }

                        if (arrayHelper_indexOf(dealedRanges, range) <= -1 && range.contains(srcRow + rowOffset, srcColumn + colOffset)) {
                            dealedRanges.push(range);
                            if (srcRow > row) {
                                newRanges.push(createRange(row, col, srcRow - row, colCount));
                            }
                            if (srcColumn > col) {
                                newRanges.push(createRange(math_max(srcRow, row), col, math_min(srcRow + moveRowCount, row + rowCount) - math_max(srcRow, row), srcColumn - col));
                            }
                            if (srcColumn + moveColumnCount < col + colCount) {
                                newRanges.push(createRange(math_max(srcRow, row), srcColumn + moveColumnCount, math_min(srcRow + moveRowCount, row + rowCount) - math_max(srcRow, row), col + colCount - (srcColumn + moveColumnCount)));
                            }
                            if (srcRow + moveRowCount < row + rowCount) {
                                newRanges.push(createRange(srcRow + moveRowCount, col, row + rowCount - (srcRow + moveRowCount), colCount));
                            }
                        }
                    }

                    sheet && sheet._modelManager._backupConditionalRules();
                    self._removeDeselectRanges(sheet, dealedRanges, destRanges, ruleRanges, maxRowCount, maxColCount, isSameSheet);
                    var tempRanges = ruleRanges.concat(newRanges);
                    if (tempRanges.length > 0) {
                        rule._ensureCondition();
                        rule.ranges(tempRanges);
                    }
                    else {
                        self.removeRule(rule);
                    }
                }
            }
        }
        self._resetCache();
    };
    ConditionalFormats.prototype._removeDeselectRanges = function (sheet, dealedRanges, destRanges, ruleRanges, maxRowCount, maxColCount, isSameSheet) {
        for (var delIndex = 0; delIndex < arrayHelper_getLength(dealedRanges); delIndex++) {
            var dealedRange = dealedRanges[delIndex], result = [dealedRange];
            if (isSameSheet) {
                for (var destIndex = 0; destIndex < arrayHelper_getLength(destRanges); destIndex++) {
                    var destRange = destRanges[destIndex];

                    if (dealedRange.intersect(destRange.row, destRange.col, destRange.rowCount, destRange.colCount)) {
                        result = result.concat(sheet._deselectSelection(dealedRange, destRange, maxRowCount, maxColCount));
                    }
                }
            }
            for (var i = 0; i < arrayHelper_getLength(result); i++) {
                arrayHelper_remove(ruleRanges, result[i]);
            }
        }
    };
    ConditionalFormats.prototype._paint = function (ctx, value, x, y, w, h, style, options) {
        var ICONSET_SIZE = 16;
        var showBarOnly = false, showIconOnly = false;
        var sheet = options.sheet, row = options.row, col = options.col, iconSet, dataBar, iconSetZoomFactor = sheet.zoom();
        var iconSetAndDataBar = this._getIconSetAndDataBar(sheet, row, col, value);
        iconSet = iconSetAndDataBar.iconSet;
        dataBar = iconSetAndDataBar.dataBar;
        if (dataBar || iconSet) {
            ctx.save();
            ctx.beginPath();
            if (dataBar) {
                DataBarRule.paintDataBar(ctx, dataBar, x, y, w, h);
                showBarOnly = dataBar.showBarOnly;
            }
            if (iconSet) {
                ICONSET_SIZE = parseInt(ICONSET_SIZE * iconSetZoomFactor + '', 10);
                if (w < ICONSET_SIZE || h < ICONSET_SIZE) {
                    ctx.rect(x, y, w, h);
                    ctx.clip();
                    ctx.beginPath();
                }
                IconSetRule.paintIconSet(ctx, iconSet, x, y, w, h, style, options.lineHeight, iconSetZoomFactor, options.imageLoader);
                showIconOnly = iconSet.showIconOnly;
            }
            ctx.restore();
        }
        return (showBarOnly || showIconOnly);
    };
    ConditionalFormats.prototype._getIconSetAndDataBar = function (sheet, row, col, value) {
        var self = this, cachePool = sheet._cachePool, iconSet, dataBar;
        var caches = cachePool._getConditionalFormat(row, col);
        if (caches) {
            iconSet = caches.i;
            dataBar = caches.d;
        }
        else {
            var rules = self.getRules(row, col), rulesLength = arrayHelper_getLength(rules);
            if (rulesLength > 0) {
                rules.sort(function (a, b) {
                    return a.priority() - b.priority();
                });
                var dataBarRule = keyword_null, iconSetRule = keyword_null, rule = void 0, obj = void 0, n = void 0;
                for (n = 0; n < rulesLength && !(dataBarRule && iconSetRule); n++) {
                    rule = rules[n];
                    if (rule) {
                        if (isInstanceOf(rule, DataBarRule)) {
                            dataBarRule = rule;
                        }
                        if (isInstanceOf(rule, IconSetRule)) {
                            iconSetRule = rule;
                        }
                    }
                }

                if (dataBarRule || iconSetRule) {
                    dataBarRule = iconSetRule = keyword_null;
                    for (n = 0; n < rulesLength && !(dataBarRule && iconSetRule); n++) {
                        rule = rules[n];
                        if (rule) {
                            if (!dataBarRule && isInstanceOf(rule, DataBarRule)) {
                                dataBarRule = rule;
                            }
                            if (!iconSetRule && isInstanceOf(rule, IconSetRule)) {
                                iconSetRule = rule;
                            }
                            if (rule.stopIfTrue()) {
                                obj = rule.evaluate(sheet, row, col, value);
                                if (obj) {
                                    break;
                                }
                            }
                        }
                    }
                }
                if (dataBarRule) {
                    dataBar = dataBarRule.evaluate(sheet, row, col, value);
                }
                if (iconSetRule) {
                    iconSet = iconSetRule.evaluate(sheet, row, col, value);
                }
            }
            cachePool._setConditionalFormat(row, col, dataBar, iconSet);
        }
        return { dataBar: dataBar, iconSet: iconSet };
    };
    ConditionalFormats.prototype._hasIconSet = function (row, col, sheetArea) {
        if (isNullOrUndefined(sheetArea) || sheetArea === 3 ) {
            var rules = this.getRules(row, col);
            for (var i = 0, length_16 = arrayHelper_getLength(rules); i < length_16; i++) {
                if (rules[i] instanceof IconSetRule) {
                    return true;
                }
            }
        }
        return false;
    };
    ConditionalFormats.prototype.toJSON = function (context) {
        var rules = [];
        for (var i = 0; i < arrayHelper_getLength(this._rules); i++) {
            var rule = this._rules[i];
            rules.push(rule ? rule.toJSON(context) : keyword_null);
        }
        if (arrayHelper_getLength(rules) === 0) {
            return keyword_undefined;
        }
        return {
            rules: rules
        };
    };
    ConditionalFormats.prototype.fromJSON = function (settings, context, noSchema, ignorePivotConditionalRule) {
        if (!settings) {
            return;
        }
        var rules = settings.rules;
        if (rules) {
            this._rules = [];
            var length_17 = arrayHelper_getLength(rules);
            for (var i = 0; i < length_17; i++) {
                var ruleSettings = rules[i];
                if (ruleSettings.pivot && ignorePivotConditionalRule) {
                    continue;
                }
                var rule = this._createRuleFromJson(ruleSettings, context, noSchema);
                if (rule) {
                    this._rules.push(rule);
                }
            }


            this._enableCache = !hasBigRange(rules);
            this._resetCache();
        }
    };
    ConditionalFormats.prototype._createRuleFromJson = function (ruleSettings, context, noSchema) {
        var rule = keyword_null;
        if (ruleSettings) {
            var dict = this._getRuleTypes();
            var ruleClass = dict[ruleSettings.ruleType];
            if (ruleClass) {
                rule = new ruleClass();
                rule.fromJSON(ruleSettings, context, noSchema);
            }
        }
        return rule;
    };
    ConditionalFormats.prototype._getRuleTypes = function () {
        if (!this._ruleTypes) {
            var dict = {};
            dict[0 ] = NormalConditionRule;
            dict[1 ] = NormalConditionRule;
            dict[2 ] = NormalConditionRule;
            dict[3 ] = NormalConditionRule;
            dict[4 ] = NormalConditionRule;
            dict[5 ] = NormalConditionRule;
            dict[6 ] = NormalConditionRule;
            dict[7 ] = NormalConditionRule;
            dict[8 ] = NormalConditionRule;
            dict[9 ] = ScaleRule;
            dict[10 ] = ScaleRule;
            dict[11 ] = ScaleRule;
            dict[12 ] = DataBarRule;
            dict[13 ] = IconSetRule;
            dict[14 ] = StateRule;
            dict[15 ] = StateRule;
            this._ruleTypes = dict;
        }
        return this._ruleTypes;
    };

    ConditionalFormats.prototype._applyFormats = function (info, row, column, sheetArea) {
        var self = this;
        if (self && self.count() > 0) {
            var rules = self.getRules(row, column), rulesLength = arrayHelper_getLength(rules), rule = void 0, expected = keyword_null;
            if (rulesLength > 0) {
                rules.sort(function (a, b) {
                    return a.priority() - b.priority();
                });
                for (var n = 0; n < rulesLength; n++) {
                    rule = rules[n];
                    if (!rule) {
                        continue;
                    }
                    var worksheet = self._worksheet;
                    if (rule.isScaleRule()) {
                        if (rule.ruleType() === 10 || rule.ruleType() === 11 ) {
                            expected = rule.evaluate(worksheet, row, column, worksheet.getValue(row, column, sheetArea));
                            if (expected) {
                                if (!info) {
                                    info = new Style();
                                }
                                if (info.backColor === keyword_undefined) {
                                    info.backColor = expected;
                                }
                            }
                        }
                    }
                    else if (rule.isStateRule()) {
                        var expectedState = rule.state();
                        var isRow = rule.isRow();
                        var actualState = worksheet._statesManager.getState(row, column, expectedState, isRow);
                        expected = rule.evaluate(worksheet, row, column, actualState);
                        if (expected) {
                            if (!info) {
                                info = new Style();
                            }
                            info._compose(expected, false, 1 );
                        }
                    }
                    else {
                        expected = rule.evaluate(worksheet, row, column, worksheet.getValue(row, column, sheetArea));
                        if (expected) {
                            if (!info) {
                                info = new Style();
                            }
                            info._compose(expected, false, 1 );
                        }
                    }
                    if (rule.stopIfTrue() && expected) {
                        break;
                    }
                }
            }
        }
        return info;
    };
    ConditionalFormats.prototype._getConditionalStyle = function (row, col, property, sheetArea) {
        var ret = { _hasResult: false };
        var self = this;
        if (self && self.count() > 0) {
            var rules = self.getRules(row, col), rulesLength = arrayHelper_getLength(rules), rule = void 0, expected = keyword_null;
            if (rulesLength > 0) {
                rules.sort(function (a, b) {
                    return a.priority() - b.priority();
                });
                for (var n = 0; n < rulesLength; n++) {
                    rule = rules[n];
                    if (!rule) {
                        continue;
                    }
                    var worksheet = self._worksheet;
                    if (rule.isScaleRule()) {
                        var ruleType = rule.ruleType();
                        if (property === 'backColor' && (ruleType === 10 || ruleType === 11 )) {
                            expected = rule.evaluate(worksheet, row, col, worksheet.getValue(row, col, sheetArea));
                            if (expected) {
                                ret._result = expected;
                                ret._hasResult = true;
                                break;
                            }
                        }
                    }
                    else if (rule.isStateRule()) {
                        var expectedState = rule.state();
                        var isRow = rule.isRow();
                        var actualState = worksheet._statesManager.getState(row, col, expectedState, isRow);
                        var style = rule.style();
                        if ((!style || style[property] === undefined) && !rule.stopIfTrue()) {
                            continue;
                        }
                        expected = rule.evaluate(worksheet, row, col, actualState);
                        if (expected && expected[property] !== keyword_undefined) {
                            ret._result = expected[property];
                            ret._hasResult = true;
                            break;
                        }
                    }
                    else {
                        var style = rule.style();
                        if ((!style || style[property] === undefined) && !rule.stopIfTrue()) {
                            continue;
                        }
                        expected = rule.evaluate(worksheet, row, col, worksheet.getValue(row, col, sheetArea));
                        if (expected && expected[property] !== keyword_undefined) {
                            ret._result = expected[property];
                            ret._hasResult = true;
                            break;
                        }
                    }
                    if (rule.stopIfTrue() && expected) {
                        break;
                    }
                }
            }
        }
        return ret;
    };
    return ConditionalFormats;
}());
exports.ConditionalFormats = ConditionalFormats;
_defineFeature(ConditionalFormats);
function addRuleToArray(rulesTemp, cellCache) {
    if (cellCache) {
        for (var i = 0; i < cellCache.length; i++) {
            rulesTemp.push(cellCache[i]);
        }
    }
}
function hasBigRange(rules) {
    var length = arrayHelper_getLength(rules);
    for (var i = 0; i < length; i++) {
        var ruleSettings = rules[i];
        var ranges = ruleSettings.ranges;
        if (ranges) {
            for (var index = 0; index < ranges.length; index++) {
                var range = ranges[index];
                if (range.rowCount > 1000) {
                    return true;
                }
            }
        }
    }
    return false;
}
function cloneRanges(ranges) {
    var newRanges = [], length = arrayHelper_getLength(ranges), r;
    for (var i = 0; i < length; i++) {
        r = ranges[i];
        newRanges.push(createRange(r.row, r.col, getRowCount(r), getColCount(r)));
    }
    return newRanges;
}
function containRange(ranges, range) {
    for (var i = 0; i < ranges.length; i++) {
        var tempRange = ranges[i];
        if (tempRange && tempRange.equals(range)) {
            return true;
        }
    }
    return false;
}
/***/ }),

/***/ './dist/plugins/conditional/conditional.ns.js':
/*!****************************************************!*\
  !*** ./dist/plugins/conditional/conditional.ns.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var en = __webpack_require__(/*! ./conditional.res.en */ './dist/plugins/conditional/conditional.res.en.js');
exports.SR = {
    en: en
};
/***/ }),

/***/ './dist/plugins/conditional/conditional.res.en.js':
/*!********************************************************!*\
  !*** ./dist/plugins/conditional/conditional.res.en.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_RuleIsNull = 'The argument \'rule\' is null';
exports.Exp_NotSupported = 'NotSupportException';
/***/ }),

/***/ './dist/plugins/conditional/conditionalFormatIcon.js':
/*!***********************************************************!*\
  !*** ./dist/plugins/conditional/conditionalFormatIcon.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var Math_PI = Math.PI, Math_Round = Math.round, Math_cos = Math.cos, Math_sin = Math.sin, icon_type13_fill_color = '#4d82b8 #4d82b8 #4d82b8 #4d82b8', color1 = '#326f5b', color2 = '#76a797', color3 = '#A4802b', color4 = '#EAC282', color5 = '#9E381C', color6 = '#D86344', color7 = '#646262', color8 = '#808080', color9 = '#353535', color10 = '#303030', color11 = '#505050', color12 = '#727272';
var canvasCustomSty = [
    [
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: Math_PI
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: Math_PI * -0.5
        },
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI * -0.5
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: Math_PI
        }
    ],
    [
        {
            strokeStyle: color3,
            fillColor: '#FFFFFF',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color10,
            fillColor: color11,
            fillColor2: '#d86344',
            rotate: 0
        },
        {
            strokeStyle: color10,
            fillColor: color11,
            fillColor2: '#eac282',
            rotate: 0
        },
        {
            strokeStyle: color10,
            fillColor: color11,
            fillColor2: color2,
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: 'white',
            rotate: Math_PI * 0.25
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: 'white',
            rotate: 0
        },
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: 'white',
            rotate: Math_PI * -0.25
        }
    ],
    [
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: Math_PI * 0.25
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: Math_PI * -0.25
        }
    ],
    [
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: Math_PI
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: Math_PI * -0.75
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: Math_PI * -0.25
        },
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI * -0.75
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI * -0.25
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color9,
            fillColor: color11,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color8,
            fillColor: '#b1b1b1',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: '#b28578',
            fillColor: '#edb9ab',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color12,
            fillColor: '#4d82b8 #b3b3b3 #b3b3b3 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: '#4d82b8 #4d82b8 #b3b3b3 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: '#4d82b8 #4d82b8 #4d82b8 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: icon_type13_fill_color,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color9,
            fillColor: color11,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color1,
            fillColor: color2,
            fillColor2: '',
            rotate: Math_PI
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: Math_PI * -0.75
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: Math_PI * -0.5
        },
        {
            strokeStyle: color3,
            fillColor: color4,
            fillColor2: '',
            rotate: Math_PI * -0.25
        },
        {
            strokeStyle: color5,
            fillColor: color6,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI * -0.75
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI * -0.5
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: Math_PI * -0.25
        },
        {
            strokeStyle: color7,
            fillColor: color8,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color12,
            fillColor: '#b3b3b3 #b3b3b3 #b3b3b3 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: '#4d82b8 #b3b3b3 #b3b3b3 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: '#4d82b8 #4d82b8 #b3b3b3 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: '#4d82b8 #4d82b8 #4d82b8 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: icon_type13_fill_color,
            fillColor2: '',
            rotate: 0
        }
    ],
    [
        {
            strokeStyle: color11,
            fillColor: color11,
            fillColor2: '',
            rotate: 2 * Math_PI
        },
        {
            strokeStyle: color11,
            fillColor: color11,
            fillColor2: '',
            rotate: 0.5 * Math_PI
        },
        {
            strokeStyle: color11,
            fillColor: color11,
            fillColor2: '',
            rotate: 0.5 * Math_PI
        },
        {
            strokeStyle: color11,
            fillColor: color11,
            fillColor2: '',
            rotate: 1 * Math_PI
        },
        {
            strokeStyle: color11,
            fillColor: color11,
            fillColor2: '',
            rotate: 2 * Math_PI
        }
    ],
    [
        {
            strokeStyle: color12,
            fillColor: '#b3b3b3 #b3b3b3 #b3b3b3 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: '#b3b3b3 #b3b3b3 #4d82b8 #b3b3b3',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: '#b3b3b3 #b3b3b3 #4d82b8 #4d82b8',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: '#4d82b8 #b3b3b3 #4d82b8 #4d82b8',
            fillColor2: '',
            rotate: 0
        },
        {
            strokeStyle: color12,
            fillColor: icon_type13_fill_color,
            fillColor2: '',
            rotate: 0
        }
    ],
];
function drawRect(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function drawSignal(ctx, iconType, iconIndex, startX, startY, iconSize) {
    ctx.translate(startX, startY);
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    var colorArr = canvasCustomSty[iconType][iconIndex].fillColor.split(' ');
    var len = Math_Round(iconSize * 0.2);
    ctx.fillStyle = colorArr[0];
    drawRect(ctx, len + 0.5, len * 3 + 0.5, len, len * 2);
    ctx.fillStyle = colorArr[1];
    drawRect(ctx, len * 2 + 0.5, len * 2 + 0.5, len, len * 3);
    ctx.fillStyle = colorArr[2];
    drawRect(ctx, len * 3 + 0.5, len + 0.5, len, len * 4);
    ctx.fillStyle = colorArr[3];
    drawRect(ctx, len * 4 + 0.5, 0.5, len, len * 5);
}
exports.drawSignal = drawSignal;
function drawMagicCube(ctx, iconType, iconIndex, startX, startY, iconSize) {
    ctx.translate(startX, startY);
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    var colorArr = canvasCustomSty[iconType][iconIndex].fillColor.split(' ');
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    var len = Math_Round(iconSize / 2);
    ctx.fillStyle = colorArr[0];
    drawRect(ctx, 0.5, 0.5, len, len);
    ctx.fillStyle = colorArr[1];
    drawRect(ctx, len + 0.5, 0.5, len, len);
    ctx.fillStyle = colorArr[2];
    drawRect(ctx, 0.5, len + 0.5, len, len);
    ctx.fillStyle = colorArr[3];
    drawRect(ctx, len + 0.5, len + 0.5, len, len);
}
exports.drawMagicCube = drawMagicCube;
function drawSector(ctx, iconType, iconIndex, startX, startY, iconSize) {
    ctx.translate(startX + iconSize / 2, startY + iconSize / 2);
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    if (iconIndex === 4) {
        ctx.beginPath();
        ctx.arc(0, 0, iconSize / 2, 0, canvasCustomSty[iconType][iconIndex].rotate);
        ctx.closePath();
        ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, iconSize / 2, 0, canvasCustomSty[iconType][iconIndex].rotate);
        ctx.closePath();
        ctx.stroke();
    }
    else if (iconIndex === 0) {
        ctx.beginPath();
        ctx.arc(0, 0, iconSize / 2, 0, 2 * Math_PI);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, iconSize / 2, 0, canvasCustomSty[iconType][iconIndex].rotate);
        ctx.stroke();
        ctx.closePath();
    }
    else if (iconIndex === 1) {
        ctx.beginPath();
        ctx.arc(0, 0, iconSize / 2, 0, 2 * Math_PI);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -iconSize / 2);
        ctx.arc(0, 0, iconSize / 2, -Math_PI * 0.5, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
        ctx.fill();
        ctx.arc(0, 0, iconSize / 2, 0, Math_PI * 2);
        ctx.stroke();
    }
    else if (iconIndex === 2) {
        ctx.beginPath();
        ctx.arc(0, 0, iconSize / 2, 0, 2 * Math_PI);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -iconSize / 2);
        ctx.arc(0, 0, iconSize / 2, -Math_PI * 0.5, Math_PI * 0.5);
        ctx.moveTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
        ctx.fill();
        ctx.arc(0, 0, iconSize / 2, 0, Math_PI * 2);
        ctx.stroke();
    }
    else if (iconIndex === 3) {
        ctx.beginPath();
        ctx.arc(0, 0, iconSize / 2, 0, 2 * Math_PI);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -iconSize / 2);
        ctx.arc(0, 0, iconSize / 2, -Math_PI * 0.5, Math_PI);
        ctx.lineTo(0, 0);
        ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
        ctx.fill();
        ctx.arc(0, 0, iconSize / 2, 0, Math_PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
}
exports.drawSector = drawSector;
function star(ctx, r1, r2) {
    ctx.moveTo(Math_cos((18 + 72 * 0) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 0) / 180 * Math_PI) * r1);
    ctx.lineTo(Math_cos((54 + 72 * 0) / 180 * Math_PI) * r2, -Math_sin((54 + 72 * 0) / 180 * Math_PI) * r2);
    ctx.lineTo(0 * r1, -Math_sin((18 + 72 * 1) / 180 * Math_PI) * r1);
    ctx.lineTo(Math_cos((54 + 72 * 1) / 180 * Math_PI) * r2, -Math_sin((54 + 72 * 1) / 180 * Math_PI) * r2);
    ctx.lineTo(Math_cos((18 + 72 * 2) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 2) / 180 * Math_PI) * r1);
    ctx.lineTo(Math_cos((54 + 72 * 2) / 180 * Math_PI) * r2, -Math_sin((54 + 72 * 2) / 180 * Math_PI) * r2);
    ctx.lineTo(Math_cos((18 + 72 * 3) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 3) / 180 * Math_PI) * r1);
    ctx.lineTo(0 * r2, -Math_sin((54 + 72 * 3) / 180 * Math_PI) * r2);
    ctx.lineTo(Math_cos((18 + 72 * 4) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 4) / 180 * Math_PI) * r1);
    ctx.lineTo(Math_cos((54 + 72 * 4) / 180 * Math_PI) * r2, -Math_sin((54 + 72 * 4) / 180 * Math_PI) * r2);
    ctx.lineTo(Math_cos((18 + 72 * 0) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 0) / 180 * Math_PI) * r1);
}
function drawStar(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var w = iconSize;
    var r1 = w / 1.8;
    var r2 = r1 / 2.5;
    ctx.translate(r1 + startX, r1 + startY);
    ctx.strokeStyle = '#727272';
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.beginPath();
    if (iconIndex === 2) {
        ctx.strokeStyle = '#727272';
        star(ctx, r1, r2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
        star(ctx, r1, r2);
        ctx.stroke();
        ctx.closePath();
    }
    if (iconIndex === 0) {
        ctx.fillStyle = 'white';
        star(ctx, r1, r2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = '#727272';
        star(ctx, r1, r2);
        ctx.stroke();
        ctx.closePath();
    }
    if (iconIndex === 1) {
        ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].fillColor;
        ctx.moveTo(0 * r1, -Math_sin((18 + 72 * 1) / 180 * Math_PI) * r1);
        ctx.lineTo(Math_cos((54 + 72 * 1) / 180 * Math_PI) * r2, -Math_sin((54 + 72 * 1) / 180 * Math_PI) * r2);
        ctx.lineTo(Math_cos((18 + 72 * 2) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 2) / 180 * Math_PI) * r1);
        ctx.lineTo(Math_cos((54 + 72 * 2) / 180 * Math_PI) * r2, -Math_sin((54 + 72 * 2) / 180 * Math_PI) * r2);
        ctx.lineTo(Math_cos((18 + 72 * 3) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 3) / 180 * Math_PI) * r1);
        ctx.lineTo(0 * r2, -Math_sin((54 + 72 * 3) / 180 * Math_PI) * r2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(0 * r1, -Math_sin((18 + 72 * 1) / 180 * Math_PI) * r1);
        ctx.lineTo(-Math_cos((54 + 72 * 1) / 180 * Math_PI) * r2, -Math_sin((54 + 72 * 1) / 180 * Math_PI) * r2);
        ctx.lineTo(-Math_cos((18 + 72 * 2) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 2) / 180 * Math_PI) * r1);
        ctx.lineTo(-Math_cos((54 + 72 * 2) / 180 * Math_PI) * r2, -Math_sin((54 + 72 * 2) / 180 * Math_PI) * r2);
        ctx.lineTo(-Math_cos((18 + 72 * 3) / 180 * Math_PI) * r1, -Math_sin((18 + 72 * 3) / 180 * Math_PI) * r1);
        ctx.lineTo(0 * r2, -Math_sin((54 + 72 * 3) / 180 * Math_PI) * r2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = '#727272';
        star(ctx, r1, r2);
        ctx.stroke();
        ctx.closePath();
    }
}
exports.drawStar = drawStar;
function drawIconTypeIsEight(ctx, iconType, iconIndex, startX, startY, iconSize) {
    if (iconIndex === 2) {
        drawTickCircle(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
    else if (iconIndex === 0) {
        drawWrongCircle(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
    else if (iconIndex === 1) {
        drawExclamationCircle(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
}
exports.drawIconTypeIsEight = drawIconTypeIsEight;
function drawWrongCircle(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    var len = Math_Round(baseLen / 2);
    ctx.translate(startX + len, startY + len);
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.rotate(canvasCustomSty[iconType][iconIndex].rotate);
    ctx.beginPath();
    ctx.arc(0, 0, len, 0, 2 * Math_PI);
    ctx.closePath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, len, 0, 2 * Math_PI);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor2;
    ctx.fillRect(-baseLen * 0.375, -baseLen * 0.1, baseLen * 0.75, baseLen * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor2;
    ctx.fillRect(-baseLen * 0.1, -baseLen * 0.375, baseLen * 0.2, baseLen * 0.75);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function drawExclamationCircle(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    ctx.translate(startX, startY);
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.beginPath();
    ctx.arc(baseLen * 0.5, baseLen * 0.5, baseLen * 0.5, 0, 2 * Math_PI);
    ctx.closePath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(baseLen * 0.5, baseLen * 0.5, baseLen * 0.5, 0, 2 * Math_PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(baseLen / 3, 0.1 * baseLen);
    ctx.lineTo(baseLen / 1.5, 0.1 * baseLen);
    ctx.lineTo(baseLen * 0.625, baseLen * 0.6);
    ctx.lineTo(baseLen * 0.375, baseLen * 0.6);
    ctx.lineTo(baseLen / 3, 0.1 * baseLen);
    ctx.moveTo(baseLen * 0.625, baseLen * 0.85);
    ctx.arc(baseLen * 0.5, baseLen * 0.8, baseLen * 0.15, 0, 2 * Math_PI);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor2;
    ctx.fill();
    ctx.closePath();
}
function drawTickCircle(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    ctx.translate(Math_Round(startX + baseLen / 2), Math_Round(baseLen / 2 + startY));
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.rotate(canvasCustomSty[iconType][iconIndex].rotate);
    ctx.beginPath();
    ctx.arc(0, 0, baseLen / 2, 0, 2 * Math_PI);
    ctx.closePath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, baseLen / 2, 0, 2 * Math_PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor2;
    ctx.fillRect(-baseLen * 0.325, -baseLen * 0.25, baseLen * 0.2, baseLen * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor2;
    ctx.fillRect(-baseLen * 0.325, baseLen * 0.05, baseLen * 0.65, baseLen * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function drawIconTypeIsNine(ctx, iconType, iconIndex, startX, startY, iconSize) {
    if (iconIndex === 2) {
        drawTick(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
    else if (iconIndex === 0) {
        drawWrong(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
    else if (iconIndex === 1) {
        drawExclamation(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
}
exports.drawIconTypeIsNine = drawIconTypeIsNine;
function drawExclamation(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    ctx.translate(startX, startY);
    ctx.beginPath();
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.moveTo(baseLen / 3, 0.5);
    ctx.lineTo(baseLen / 1.5, 0.5);
    ctx.lineTo(baseLen * 0.625, baseLen * 0.65);
    ctx.lineTo(baseLen * 0.375, baseLen * 0.65);
    ctx.lineTo(baseLen / 3, 0.5);
    ctx.moveTo(baseLen * 0.65, baseLen * 0.85);
    ctx.arc(baseLen * 0.5, baseLen * 0.85, baseLen * 0.15, 0, 2 * Math_PI);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.stroke();
}
function drawWrong(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    ctx.translate(Math_Round(startX + baseLen / 2), Math_Round(startY + baseLen / 2));
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.rotate(canvasCustomSty[iconType][iconIndex].rotate);
    ctx.beginPath();
    var halfLen = baseLen * 0.5;
    var tLen = baseLen * 0.075;
    moveTo(ctx, -halfLen, -tLen);
    lineTo(ctx, -halfLen, tLen);
    lineTo(ctx, -tLen, tLen);
    lineTo(ctx, -tLen, halfLen);
    lineTo(ctx, tLen, halfLen);
    lineTo(ctx, tLen, tLen);
    lineTo(ctx, halfLen, tLen);
    lineTo(ctx, halfLen, -tLen);
    lineTo(ctx, tLen, -tLen);
    lineTo(ctx, tLen, -halfLen);
    lineTo(ctx, -tLen, -halfLen);
    lineTo(ctx, -tLen, -tLen);
    lineTo(ctx, -halfLen, -tLen);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.stroke();
}
function drawTick(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    ctx.translate(Math_Round(startX + baseLen / 2), Math_Round(startY + baseLen / 2));
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.rotate(canvasCustomSty[iconType][iconIndex].rotate);
    ctx.beginPath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fillRect(-baseLen * 0.375, -baseLen * 0.25, baseLen * 0.2, baseLen * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fillRect(-baseLen * 0.375, baseLen * 0.05, baseLen * 0.75, baseLen * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function drawFlag(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize * 1.2;
    ctx.translate(startX, startY);
    ctx.strokeStyle = color8;
    ctx.fillStyle = color8;
    drawRect(ctx, Math_Round(baseLen * 0.2) + 0.5, 0.5, Math_Round(baseLen * 0.06), Math_Round(baseLen * 0.8));
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.beginPath();
    moveTo(ctx, baseLen * 0.4, 0.5);
    lineTo(ctx, baseLen * 0.4, baseLen * 0.5);
    lineTo(ctx, baseLen * 0.9, baseLen * 0.25);
    lineTo(ctx, baseLen * 0.4, 0.5);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.stroke();
}
exports.drawFlag = drawFlag;
function drawIconTypeIsSen(ctx, iconType, iconIndex, startX, startY, iconSize) {
    if (iconIndex === 2) {
        drawCircle(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
    else if (iconIndex === 1) {
        drawEquilateralTriangle(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
    else {
        drawRhombus(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
}
exports.drawIconTypeIsSen = drawIconTypeIsSen;
function drawTrafficLight(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = Math_Round(iconSize);
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    drawRect(ctx, startX + 0.5, startY + 0.5, baseLen, baseLen);
    ctx.beginPath();
    ctx.arc(baseLen / 2 + startX + 0.5, baseLen / 2 + startY + 0.5, baseLen * 0.375, 0, 2 * Math_PI);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor2;
    ctx.fill();
    ctx.stroke();
}
exports.drawTrafficLight = drawTrafficLight;
function drawCircle(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.beginPath();
    ctx.arc(baseLen / 2 + startX, baseLen / 2 + startY, baseLen / 2, 0, 2 * Math_PI);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
exports.drawCircle = drawCircle;
function drawIconTypeIsTwo(ctx, iconType, iconIndex, startX, startY, iconSize) {
    if (iconIndex === 1) {
        drawLine(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
    else if (iconIndex === 0) {
        drawTriangle(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
    else if (iconIndex === 2) {
        drawTriangle1(ctx, iconType, iconIndex, startX, startY, iconSize);
    }
}
exports.drawIconTypeIsTwo = drawIconTypeIsTwo;
function drawRhombus(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.beginPath();
    ctx.translate(startX + Math_Round(baseLen / 2), startY + Math_Round(baseLen / 2));
    ctx.beginPath();
    moveTo(ctx, 0, -baseLen / 2);
    lineTo(ctx, baseLen / 2, 0);
    lineTo(ctx, 0, baseLen / 2);
    lineTo(ctx, -baseLen / 2, 0);
    lineTo(ctx, 0, -baseLen / 2);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function drawEquilateralTriangle(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = Math_Round(iconSize);
    ctx.translate(startX, startY);
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.beginPath();
    moveTo(ctx, 0, baseLen);
    lineTo(ctx, baseLen / 2, baseLen - (baseLen / 2) * Math.sqrt(3));
    lineTo(ctx, baseLen, baseLen);
    lineTo(ctx, 0, baseLen);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function drawLine(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize;
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    ctx.translate(Math_Round(baseLen / 2 + startX), Math_Round(baseLen / 2 + startY));
    ctx.beginPath();
    ctx.rotate(canvasCustomSty[iconType][iconIndex].rotate);
    moveTo(ctx, -baseLen / 2, -baseLen / 5.4);
    lineTo(ctx, baseLen / 2, -baseLen / 5.4);
    lineTo(ctx, baseLen / 2, baseLen / 5.4);
    lineTo(ctx, -baseLen / 2, baseLen / 5.4);
    lineTo(ctx, -baseLen / 2, -baseLen / 5.4);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.stroke();
}
function drawTriangle(ctx, iconType, iconIndex, startX, startY, iconSize) {
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    var baseLen = iconSize;
    ctx.translate(Math_Round(baseLen / 2 + startX), Math_Round(baseLen / 2 + startY));
    ctx.beginPath();
    moveTo(ctx, -baseLen / 2, -baseLen / 3);
    lineTo(ctx, baseLen / 2, -baseLen / 3);
    lineTo(ctx, 0, baseLen / 3);
    lineTo(ctx, -baseLen / 2, -baseLen / 3);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.stroke();
}
function drawTriangle1(ctx, iconType, iconIndex, startX, startY, iconSize) {
    ctx.strokeStyle = canvasCustomSty[iconType][iconIndex].strokeStyle;
    var baseLen = iconSize;
    ctx.translate(Math_Round(baseLen / 2 + startX), Math_Round(baseLen / 2 + startY));
    ctx.beginPath();
    moveTo(ctx, -baseLen / 2, baseLen / 3);
    lineTo(ctx, baseLen / 2, baseLen / 3);
    lineTo(ctx, 0, -baseLen / 3);
    lineTo(ctx, -baseLen / 2, baseLen / 3);
    ctx.fillStyle = canvasCustomSty[iconType][iconIndex].fillColor;
    ctx.fill();
    ctx.stroke();
}
function drawArrows(ctx, iconType, iconIndex, startX, startY, iconSize) {
    var baseLen = iconSize / 3.5;
    var len = canvasCustomSty[iconType].length - 1;
    ctx.strokeStyle = canvasCustomSty[iconType][len - iconIndex].strokeStyle;
    ctx.translate(Math_Round(baseLen * 1.75 + startX), Math_Round(baseLen * 1.75 + startY));
    ctx.rotate(canvasCustomSty[iconType][len - iconIndex].rotate);
    ctx.beginPath();
    var fLEn = baseLen * 0.25;
    var oLEn = baseLen * 1.25;
    var sLen = baseLen * 0.75;
    var osLen = baseLen * 1.75;
    moveTo(ctx, -sLen, -osLen);
    lineTo(ctx, fLEn, -osLen);
    lineTo(ctx, fLEn, fLEn);
    lineTo(ctx, oLEn, -sLen);
    lineTo(ctx, oLEn, fLEn);
    lineTo(ctx, -fLEn, osLen);
    lineTo(ctx, -osLen, fLEn);
    lineTo(ctx, -osLen, -sLen);
    lineTo(ctx, -sLen, fLEn);
    lineTo(ctx, -sLen, -osLen);
    ctx.fillStyle = canvasCustomSty[iconType][len - iconIndex].fillColor;
    ctx.fill();
    ctx.stroke();
}
exports.drawArrows = drawArrows;
function lineTo(ctx, x, y) {
    ctx.lineTo(Math_Round(x) + 0.5, Math_Round(y) + 0.5);
}
function moveTo(ctx, x, y) {
    ctx.moveTo(Math_Round(x) + 0.5, Math_Round(y) + 0.5);
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
//# sourceMappingURL=gc.spread.sheets.conditionalformatting.14.2.5.js.map