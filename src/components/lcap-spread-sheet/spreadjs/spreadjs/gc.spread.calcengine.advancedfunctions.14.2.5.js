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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['CalcEngine'] = GC['Spread']['CalcEngine'] || {}; GC['Spread']['CalcEngine']['AdvancedFunctions'] =
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
/******/ 	__webpack_require__.p = '';
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = './node_modules_local/@grapecity/js-calc-advancedfunctions/index.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './node_modules_local/@grapecity/js-calc-advancedfunctions/dist/gc.spread.calcengine.advancedfunctions.js':
/*!****************************************************************************************************************!*\
  !*** ./node_modules_local/@grapecity/js-calc-advancedfunctions/dist/gc.spread.calcengine.advancedfunctions.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['CalcEngine'] = GC['Spread']['CalcEngine'] || {}; GC['Spread']['CalcEngine']['AdvancedFunctions'] =
 (function(modules) {
 	var installedModules = {};

 	function __webpack_require__(moduleId) {
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}

 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		module.l = true;

 		return module.exports;
 	}

 	__webpack_require__.m = modules;

 	__webpack_require__.c = installedModules;

 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};


 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	__webpack_require__.p = '/assets/';

 	return __webpack_require__(__webpack_require__.s = './src/advancedFunctions.entry.ts');
 })
 ({

 './src/advancedFunctions.entry.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var CalcEngine_1 = __webpack_require__( 'CalcEngine');
exports.Functions = CalcEngine_1.Functions;
__webpack_require__( './src/functions-db.ts');
__webpack_require__( './src/functions-eng.ts');
__webpack_require__( './src/functions-fin.ts');
__webpack_require__( './src/functions-lookup.ts');
__webpack_require__( './src/functions-stat.ts');
 }),

 './src/functions-db.ts':
 (function(module, exports, __webpack_require__) {
'use strict';


Object.defineProperty(exports, '__esModule', { value: true });
var Common_1 = __webpack_require__( 'Common');
var CalcEngine_1 = __webpack_require__( 'CalcEngine');
var RegexHelper = Common_1.Common._RegexHelper, keyword_null = null;
var CalcConvert_toDouble = CalcEngine_1.Convert._toDouble;
var CalcConvert_isNumber = CalcEngine_1.Convert._isNumber, CalcConvert_isError = CalcEngine_1.Convert._isError, CalcConvert_toResult = CalcEngine_1.Convert._toResult;
var CalcErrorsDivideByZero = CalcEngine_1.Errors.DivideByZero, CalcErrorsValue = CalcEngine_1.Errors.Value;
var defineBuiltInFunction = CalcEngine_1.Functions._defineBuiltInFunction, isString = CalcEngine_1.Functions._isString, isNanFunc = isNaN;
var StringHelper = Common_1.Common._StringHelper;
var StringHelper_StartWith = StringHelper._startsWith;
var Exp_InvalidCast = CalcEngine_1.sR().Exp_InvalidCast;

var CriteriaEvaluator = (function () {
    function CriteriaEvaluator(criteriaOperator, criteriaValue, matchLength) {
        this._criteriaOperator = criteriaOperator;
        this._criteriaValue = criteriaValue;
        this._matchLength = matchLength;
    }
    CriteriaEvaluator.prototype._evaluate = function (databaseValue) {
        var map = {
            '=': 9,
            '<>': 10,
            '<': 11,
            '<=': 12,
            '>': 13,
            '>=': 14
        };
        var result = CalcEngine_1.evaluateOperator(map[this._criteriaOperator], databaseValue, this._criteriaValue);
        return CalcEngine_1.Functions._isBoolean(result) ? CalcEngine_1.Convert._toBool(result) : false;
    };
    return CriteriaEvaluator;
}());
function makeKey(i, j) {
    return [i, j].join(',');
}
var DatabaseEnumerator = (function () {
    function DatabaseEnumerator(database, field, criteria) {
        var self = this;
        self._row = 0;
        self._database = database;
        self._criteria = criteria;
        self._evaluators = {};
        if (arguments.length === 3) {
            self._column = self._columnIndex(database, field);
            if (database.rowCount < 2 || database.colCount < 1 || criteria.rowCount < 2 || criteria.colCount < 1 ||
                self._column < 0 || self._database.colCount <= self._column) {
                throw Exp_InvalidCast;
            }
        }
        else if (arguments.length === 2) {
            self._column = -1;
            if (database.rowCount < 2 || database.colCount < 1 || criteria.rowCount < 2 || criteria.colCount < 1) {
                throw Exp_InvalidCast;
            }
        }
    }
    DatabaseEnumerator.prototype._columnIndex = function (database, field) {
        if (isString(field)) {
            for (var i = 0; i < database.colCount; i++) {
                var columnLabel = CalcEngine_1.Convert._toString(database[0][i]);
                if (columnLabel && this._ignoreCaseEqual(columnLabel, field)) {
                    return i;
                }
            }
            return -1;
        }
        return CalcEngine_1.Convert._toInt(field) - 1;
    };
    DatabaseEnumerator.prototype._current = function () {
        var self = this;
        if (self._row <= 0 || self._database.rowCount <= self._row) {
            throw CalcEngine_1.sR().Exp_InvalidOperation;
        }
        return self._database[self._row][self._column];
    };
    DatabaseEnumerator.prototype._moveNext = function () {
        var self = this, found = false, rowCount = self._database.rowCount;
        while (!found && self._row < rowCount) {
            self._row++;
            if (self._row < rowCount) {
                found = self._rowMeetsCriteria();
            }
        }
        return found;
    };
    DatabaseEnumerator.prototype._createEvaluator = function (criteria) {
        if (isString(criteria)) {
            var databaseEnumeratorOperators = [
                '=',
                '<>',
                '<=',
                '>=',
                '<',
                '>'
            ];
            var criteriaText = CalcEngine_1.Convert._toString(criteria), i = void 0;
            var matchLength = void 0;
            for (i = 0; i < databaseEnumeratorOperators.length; i++) {
                if (Common_1.Common._StringHelper._startsWith(criteriaText, databaseEnumeratorOperators[i])) {
                    criteriaText = criteriaText.substring(databaseEnumeratorOperators[i].length);
                    var criteriaDouble = Common_1.Common._NumberHelper._parseInvariant(criteriaText);
                    if (!isNanFunc(criteriaDouble)) {
                        criteria = criteriaDouble;
                    }
                    else if (this._ignoreCaseEqual('true', criteriaText)) {
                        criteria = true;
                    }
                    else if (this._ignoreCaseEqual('false', criteriaText)) {
                        criteria = false;
                    }
                    else {
                        criteria = criteriaText;


                        matchLength = i === 0;
                    }
                    return new CriteriaEvaluator(databaseEnumeratorOperators[i], criteria, matchLength);
                }
            }
            return new CriteriaEvaluator('=', criteria);
        }
        else if (criteria) {
            return new CriteriaEvaluator('=', criteria);
        }
        return keyword_null;
    };
    DatabaseEnumerator.prototype._getEvaluator = function (i, j) {
        var self = this, evaluators = self._evaluators;
        var key = makeKey(i, j), result = evaluators[key];
        if (!result) {
            var key2 = '_' + key;
            if (!evaluators[key2]) {
                result = evaluators[key] = self._createEvaluator(self._criteria[i][j]);
                evaluators[key2] = true;
            }
        }
        return result;
    };
    DatabaseEnumerator.prototype._rowMeetsCriteria = function () {
        var self = this, pass = false, criteria = self._criteria, row = self._row, i, j, k;
        var rowCount = criteria.rowCount, colCount = criteria.colCount;
        var database = self._database, indexMap = self._indexMapCache;
        if (!indexMap) {
            var fieldInfo = criteria[0];
            indexMap = [];
            for (j = 0; j < colCount; j++) {
                k = self._columnIndex(database, fieldInfo[j]);
                if (k < 0) {
                    return false;
                }
                indexMap[j] = k;
            }
            self._indexMapCache = indexMap;
        }
        for (i = 1; !pass && i < rowCount; i++) {
            pass = true;
            for (j = 0; pass && j < colCount; j++) {
                var criteriaEva = self._getEvaluator(i, j);
                if (criteriaEva) {
                    var databaseValue = database[row][indexMap[j]];
                    if (criteriaEva._criteriaOperator === '=') {
                        var value = criteriaEva._criteriaValue;
                        if (isString(value) && isString(databaseValue)) {
                            var wildcardCriteria = RegexHelper._getWildcardCriteria(value, true );
                            var matchLength = criteriaEva._matchLength;
                            if (wildcardCriteria) {
                                pass = RegexHelper._getRegIgnoreCase('^' + wildcardCriteria + (matchLength ? '$' : '')).test(databaseValue);
                            }
                            else {
                                if (matchLength) {
                                    pass = databaseValue.toLowerCase() === value.toLowerCase();
                                }
                                else {
                                    pass = StringHelper_StartWith(databaseValue, value, true);
                                }
                            }
                            continue;
                        }
                    }
                    pass = criteriaEva._evaluate(databaseValue);
                }
            }
        }
        return pass;
    };
    DatabaseEnumerator.prototype._ignoreCaseEqual = function (stringOne, stringTwo) {
        return stringOne.toLowerCase() === stringTwo.toLowerCase();
    };
    return DatabaseEnumerator;
}());
function db_dcountCounta(database, field, criteria, isCountFormula) {
    var n = 0, enumerator = new DatabaseEnumerator(database, field, criteria);
    while (enumerator._moveNext()) {
        var value = enumerator._current();
        value = isCountFormula ? CalcConvert_isNumber(value) : value;
        value && n++;
    }
    return CalcConvert_toResult(n);
}
function db_stdevVarSum(database, field, criteria, isStdevFormula, value, isSumFormula, isProductFormula) {
    var num = isProductFormula ? 1 : 0, num2 = 0, n = 0;
    var enumerator = new DatabaseEnumerator(database, field, criteria);
    while (enumerator._moveNext()) {
        var obj = enumerator._current();
        if (CalcConvert_isNumber(obj)) {
            var x = CalcConvert_toDouble(obj);
            if (isNanFunc(x)) {
                return CalcErrorsValue;
            }
            num = isProductFormula ? num * x : num + x;
            num2 += x * x;
            n++;
        }
        else if (CalcConvert_isError(obj)) {
            return obj;
        }
    }
    if (isSumFormula || isProductFormula) {
        return CalcConvert_toResult(num);
    }
    var temp = Math.max(0, (n * num2 - num * num) / (n * (n - value))), result = isStdevFormula ? Math.sqrt(temp) : temp;
    return n <= 1 ? CalcErrorsDivideByZero : CalcConvert_toResult(result);
}
function db_daverage(database, field, criteria) {
    var sum = 0, n = 0, enumerator = new DatabaseEnumerator(database, field, criteria);
    while (enumerator._moveNext()) {
        var obj = enumerator._current();
        if (CalcConvert_isError(obj)) {
            return obj;
        }
        if (CalcConvert_isNumber(obj)) {
            var d = { value: 0 };
            if (!CalcEngine_1.Convert._tryToDouble(obj, d)) {
                return CalcErrorsValue;
            }
            sum += d.value;
            n++;
        }
    }
    return n === 0 ? CalcErrorsDivideByZero : CalcConvert_toResult(sum / n);
}
function db_dcount(database, field, criteria) {
    return db_dcountCounta(database, field, criteria, true);
}
function db_dcounta(database, field, criteria) {
    return db_dcountCounta(database, field, criteria, false);
}
function db_dget(database, field, criteria) {
    var val, enumerator = new DatabaseEnumerator(database, field, criteria);
    if (enumerator._moveNext()) {
        val = enumerator._current();
        if (enumerator._moveNext()) {
            return CalcEngine_1.Errors.Number;
        }
    }
    else {
        return CalcErrorsValue;
    }
    return val;
}
function db_dmax(database, field, criteria) {
    var isAny = false, max = -CalcEngine_1.Functions._MAX_DOUBLE_VALUE;
    var enumerator = new DatabaseEnumerator(database, field, criteria);
    while (enumerator._moveNext()) {
        var obj = enumerator._current();
        if (CalcConvert_isError(obj)) {
            return obj;
        }
        if (CalcConvert_isNumber(obj)) {
            var x = CalcConvert_toDouble(obj);
            if (isNanFunc(x)) {
                return CalcErrorsValue;
            }
            if (!isAny || x > max) {
                max = x;
            }
            isAny = true;
        }
    }
    return isAny ? CalcConvert_toResult(max) : 0;
}
function db_dmin(database, field, criteria) {
    var any = false, min = CalcEngine_1.Functions._MAX_DOUBLE_VALUE;
    var enumerator = new DatabaseEnumerator(database, field, criteria);
    while (enumerator._moveNext()) {
        var obj = enumerator._current();
        if (CalcConvert_isError(obj)) {
            return obj;
        }
        if (CalcConvert_isNumber(obj)) {
            var x = CalcConvert_toDouble(obj);
            if (isNanFunc(x)) {
                return CalcErrorsValue;
            }
            if (!any || obj < min) {
                min = obj;
            }
            any = true;
        }
    }
    return any ? CalcConvert_toResult(min) : 0;
}
function db_dproduct(database, field, criteria) {
    return db_stdevVarSum(database, field, criteria, false, 0, false, true);
}
function db_dstdev(database, field, criteria) {
    return db_stdevVarSum(database, field, criteria, true, 1);
}
function db_dstdevp(database, field, criteria) {
    return db_stdevVarSum(database, field, criteria, true, 0);
}
function db_dsum(database, field, criteria) {
    return db_stdevVarSum(database, field, criteria, false, 0, true);
}
function db_dvar(database, field, criteria) {
    return db_stdevVarSum(database, field, criteria, false, 1);
}
function db_dvarp(database, field, criteria) {
    return db_stdevVarSum(database, field, criteria, false, 0);
}


var acceptsNotOne = '!= 1';
var arrayArgDefaultValue = { _acceptsRealValue: true, _argType: 4 , _valueType: 0 }, acceptsRealValueDefaultValue = { _acceptsRealValue: true };
var dbArgsLimitDefaultValue = [arrayArgDefaultValue, acceptsRealValueDefaultValue, arrayArgDefaultValue];

defineBuiltInFunction('DAVERAGE', db_daverage, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DCOUNT', db_dcount, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DCOUNTA', db_dcounta, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DGET', db_dget, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DMAX', db_dmax, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DMIN', db_dmin, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DPRODUCT', db_dproduct, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DSTDEV', db_dstdev, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DSTDEVP', db_dstdevp, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DSUM', db_dsum, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DVAR', db_dvar, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
defineBuiltInFunction('DVARP', db_dvarp, 3, 3, dbArgsLimitDefaultValue, acceptsNotOne, acceptsNotOne);
 }),

 './src/functions-eng.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__( 'Common');
var CalcEngine_1 = __webpack_require__( 'CalcEngine');
var arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength;
var keyword_undefined = void 0, Math_abs = Math.abs, Math_sin = Math.sin, Math_cos = Math.cos, Math_sqrt = Math.sqrt, Math_log = Math.log, Math_pow = Math.pow, Math_exp = Math.exp, Math_E = Math.E, Math_atan2 = Math.atan2;
var parseFloatFunc = parseFloat, isNaNFunc = isNaN;
var CalcErrorsNotAvailable = CalcEngine_1.Errors.NotAvailable, CalcErrorsNumber = CalcEngine_1.Errors.Number, CalcErrorsValue = CalcEngine_1.Errors.Value;
var defineBuiltInFunction = CalcEngine_1.Functions._defineBuiltInFunction, st_normsdist = CalcEngine_1.Functions._st_normsdist;
var CalcConvert_toResult = CalcEngine_1.Convert._toResult;
var CalcConvert_isError = CalcEngine_1.Convert._isError;
var MathHelper = CalcEngine_1.Functions.MathHelper, sinhCosh = MathHelper._sinhCosh;
var convertToComplex = CalcEngine_1.Functions._convertToComplex;
var BIT_LIMIT_NUMBER = 281474976710655;
var _tryToDouble = CalcEngine_1.Convert._tryToDouble;
function createComplex(real, imag) {
    return new CalcEngine_1.Functions._Complex(real, imag);
}
var COMPLEX_ONE = createComplex(1.0, 0.0);
function Eng_convert_unit_t(str, c) {
    return { _str: str, _c: c };
}
function getEngUnitsArray(unitArray, valueArray) {
    var retValue = [], i;
    for (i = 0; i < arrayHelper_getLength(unitArray); i++) {
        retValue.push(Eng_convert_unit_t(unitArray[i], valueArray[i]));
    }
    retValue.push(Eng_convert_unit_t(null, 0));
    return retValue;
}


var one_g_to_lbm = 2.204622621848780e-03;


var one_g_to_grain = one_g_to_lbm * 7000, one_g_to_cwt = one_g_to_lbm / 100, one_g_to_ukCwt = one_g_to_lbm / 112, one_g_to_stone = one_g_to_lbm / 14, one_g_to_ukTon = one_g_to_lbm / 2240;
var weightUnits = getEngUnitsArray(['g', 'sg', 'lbm', 'u', 'ozm', 'grain', 'cwt', 'shweight', 'uk_cwt', 'lcwt', 'hweight', 'stone', 'ton', 'uk_ton', 'LTON', 'brton'], [1, 6.852176585679180E-05, one_g_to_lbm, 6.02214179421676E+23, 3.527396194958040E-02, one_g_to_grain, one_g_to_cwt, one_g_to_cwt, one_g_to_ukCwt, one_g_to_ukCwt, one_g_to_ukCwt, one_g_to_stone, 1.102311310924390E-06, one_g_to_ukTon, one_g_to_ukTon, one_g_to_ukTon]);


var one_m_to_in = 10000 / 254, one_m_to_ft = one_m_to_in / 12, one_m_to_yd = one_m_to_ft / 3, one_m_to_mi = one_m_to_yd / 1760;
var one_m_to_ell = one_m_to_in / 45, one_m_to_pica = one_m_to_in * 6, one_m_to_survey_mi = 6.213699494949500E-04;
var one_m_to_ly = 1.057000834024620E-16, one_m_to_pc = 3.240779289664730E-17;
var distanceUnits = getEngUnitsArray(['m', 'mi', 'Nmi', 'in', 'ft', 'yd', 'ang', 'Pica', 'ell', 'ly', 'pc', 'pica', 'survey_mi', 'parsec', 'Picapt'], [1, one_m_to_mi, 1 / 1852.0, one_m_to_in, one_m_to_ft, one_m_to_yd, 1e10, 2.83464566929134E+03, one_m_to_ell, one_m_to_ly, one_m_to_pc, one_m_to_pica, one_m_to_survey_mi, one_m_to_pc, 2.83464566929134E+03]);


var one_yr_to_day = 365.25;
var one_yr_to_hr = 24 * one_yr_to_day;
var one_yr_to_mn = 60 * one_yr_to_hr;
var one_yr_to_sec = 60 * one_yr_to_mn;
var timeUnits = getEngUnitsArray(['yr', 'day', 'hr', 'mn', 'sec', 'd', 'min', 's'], [1, one_yr_to_day, one_yr_to_hr, one_yr_to_mn, one_yr_to_sec, one_yr_to_day, one_yr_to_mn, one_yr_to_sec]);


var one_Pa_to_mmHg = 0.007500637554192;
var pressureUnits = getEngUnitsArray(['Pa', 'atm', 'mmHg', 'p', 'at', 'psi', 'Torr'], [1, 9.869232667160130e-06, one_Pa_to_mmHg, 1, 9.869232667160130e-06, 1.450377377302090E-04, 7.500616827041700E-03]);


var one_N_to_dyn = 100000;
var forceUnits = getEngUnitsArray(['N', 'dyn', 'lbf', 'dy', 'pond'], [1, one_N_to_dyn, 0.224808943099710, one_N_to_dyn, 1.01971621297793E+02]);


var one_HP_to_W = 7.45699871582270E+02;
var powerUnits = getEngUnitsArray(['HP', 'W', 'h', 'w', 'PS'], [1, one_HP_to_W, 1, one_HP_to_W, 1.013869665424000]);


var one_J_to_eV = 6.241509647120420E+18;
var one_J_to_HPh = 1.0 / (3600 * one_HP_to_W);
var one_J_to_Wh = 1.0 / 3600;
var one_J_to_BTU = 9.478171203133170E-04;
var one_J_to_c = 2.390057361376670E-01;


var energyUnits = getEngUnitsArray(['J', 'e', 'c', 'cal', 'eV', 'HPh', 'Wh', 'flb', 'BTU', 'ev', 'hh', 'wh', 'btu'], [1, 1e-07, one_J_to_c, one_J_to_c, one_J_to_eV, one_J_to_HPh, one_J_to_Wh, 7.375621492772650E-01, one_J_to_BTU, one_J_to_eV, one_J_to_HPh, one_J_to_Wh, one_J_to_BTU]);


var magnetismUnits = getEngUnitsArray(['T', 'ga'], [1, 10000]);


var one_tsp_to_l = 4.928921593750000E-03, one_tsp_to_ang3 = one_tsp_to_l * 1e+27;
var one_tsp_to_bushel = 1.398709321899910E-04;
var one_tsp_to_ft3 = 0.000174063223380, one_tsp_to_in3 = 0.30078125, one_tsp_to_ly3 = 82073596535e-54, one_tsp_to_m3 = 4.92892159375e-6;
var one_tsp_to_mi3 = 1.18251117638e-15, one_tsp_to_yd3 = 6.44678605110e-06, one_tsp_to_Nmi3 = 7.75941468987e-16, one_tsp_to_Pica3 = 112266;
var one_tsp_to_GRT = 1.740632233796e-6, one_tsp_to_MTON = 4.351580584491e-6;


var volumeUnits = getEngUnitsArray(['tsp', 'tspm', 'tbs', 'oz', 'cup', 'pt', 'qt', 'uk_qt', 'gal', 'uk_gal', 'l', 'uk_pt', 'us_pt', 'lt', 'ang3', 'ang^3', 'barrel', 'bushel', 'ft3', 'ft^3', 'in3', 'in^3', 'ly3', 'ly^3', 'm3', 'm^3', 'mi3', 'mi^3', 'yd3', 'yd^3', 'Nmi3', 'Nmi^3', 'Pica3', 'Pica^3', 'Picapt3', 'Picapt^3', 'GRT', 'regton', 'MTON', 'L'], [1, 0.985784318750000, 1 / 3, 1 / 6, 1 / 48, 1 / 96, 1 / 192, 4.336844711609320E-03, 1 / 768, 1.084211177902330E-03, one_tsp_to_l, 8.673689423218630E-03, 1 / 96, one_tsp_to_l, one_tsp_to_ang3, one_tsp_to_ang3, 1 / 32256, one_tsp_to_bushel, one_tsp_to_ft3, one_tsp_to_ft3, one_tsp_to_in3, one_tsp_to_in3, one_tsp_to_ly3, one_tsp_to_ly3, one_tsp_to_m3, one_tsp_to_m3, one_tsp_to_mi3, one_tsp_to_mi3, one_tsp_to_yd3, one_tsp_to_yd3, one_tsp_to_Nmi3, one_tsp_to_Nmi3, one_tsp_to_Pica3, one_tsp_to_Pica3, one_tsp_to_Pica3, one_tsp_to_Pica3, one_tsp_to_GRT, one_tsp_to_GRT, one_tsp_to_MTON, one_tsp_to_l]);


var speedsUnit = getEngUnitsArray(['admkn', 'kn', 'm/h', 'm/hr', 'm/s', 'm/sec', 'mph'], [1, 1.00063930885529, 1853.184, 1853.184, 0.514773333333333, 0.514773333333333, 1.15151515151515]);

var one_m2_to_ft2 = 1.07639104167097E+01, one_m2_to_in2 = one_m2_to_ft2 * 144, one_m2_to_yd2 = one_m2_to_ft2 / 9, one_m2_to_ukAcre = 2.471053814671650E-04;
var one_m2_to_usAcre = 2.471043930466280E-04, one_m2_to_mi2 = one_m2_to_yd2 / 3097600, one_m2_to_Nmi2 = 2.91553349598123e-07;
var one_m2_to_Pica2 = 8.035216070432140E+06, one_m2_to_ly2 = 1.11725076312873e-32;


var areasUnit = getEngUnitsArray(['m2', 'm^2', 'ft2', 'ft^2', 'in2', 'in^2', 'yd2', 'yd^2', 'uk_acre', 'us_acre', 'ang2', 'ang^2', 'ar', 'ha', 'Morgen', 'mi2', 'mi2', 'Nmi2', 'Nmi^2', 'Pica2', 'Picapt2', 'Pica^2', 'Picapt^2', 'ly2', 'ly^2'], [1, 1, one_m2_to_ft2, one_m2_to_ft2, one_m2_to_in2, one_m2_to_in2, one_m2_to_yd2, one_m2_to_yd2, one_m2_to_ukAcre, one_m2_to_usAcre, 1e+20, 1e+20, 0.01, 0.0001, 0.0004, one_m2_to_mi2, one_m2_to_mi2, one_m2_to_Nmi2, one_m2_to_Nmi2, one_m2_to_Pica2, one_m2_to_Pica2, one_m2_to_Pica2, one_m2_to_Pica2, one_m2_to_ly2, one_m2_to_ly2]);

var informationUnits = getEngUnitsArray(['bit', 'byte'], [1, 0.125]);
var INFORMATIONUNITS = {
    bit: 'bit',
    byte: 'byte',
};
var TEMPERATUREUNITS = {
    K: 'K',
    kel: 'kel',
    cel: 'cel',
    C: 'C',
    F: 'F',
    fah: 'fah',
    Rank: 'Rank',
    Reau: 'Reau',
};
var TIMEUNITS = {
    day: 'day',
    d: 'd',
    yr: 'yr',
    hr: 'hr',
    mn: 'mn',
    min: 'min',
    sec: 'sec',
    s: 's',
};

var C_K_OFFSET = 273.15;
var F_RANK_OFFSET = 459.67;


var PREDIXESUNITS = ['Y', 'Z', 'E', 'P', 'T', 'G', 'M', 'k', 'h', 'e', 'd', 'c', 'm', 'u', 'n', 'p', 'f', 'a', 'z', 'y'];
var PREFIXES = getEngUnitsArray(PREDIXESUNITS, [1e+24, 1e+21, 1e+18, 1e+15, 1e+12, 1e+09, 1e+06, 1e+03, 1e+02, 1e+01, 1e-01, 1e-02, 1e-03, 1e-06, 1e-09, 1e-12, 1e-15, 1e-18, 1e-21, 1e-24]);


var binaryPrefixes = getEngUnitsArray(['Y', 'Z', 'E', 'P', 'T', 'G', 'M', 'k', 'h', 'e', 'd', 'c', 'm', 'u', 'n', 'p', 'f', 'a', 'z', 'y', 'Yi', 'Zi', 'Ei', 'Pi', 'Ti', 'Gi', 'Mi', 'ki'], [1e+24, 1e+21, 1e+18, 1e+15, 1e+12, 1e+09, 1e+06, 1e+03, 1e+02, 1e+01, 1e-01, 1e-02, 1e-03, 1e-06, 1e-09, 1e-12, 1e-15, 1e-18, 1e-21, 1e-24, Math.pow(2, 80), Math.pow(2, 70), Math.pow(2, 60), Math.pow(2, 50), Math.pow(2, 40), Math.pow(2, 30), Math.pow(2, 20), Math.pow(2, 10)]);
var ENGLISHUNITS = [
    'sg', 'lbm', 'ozm', 'grain', 'cwt', 'shweight', 'uk_cwt', 'lcwt', 'hweight', 'stone', 'uk_ton', 'lcwt', 'hweight', 'stone', 'uk_ton', 'LTON', 'brton', 'ton',
    'mi', 'Nmi', 'in', 'ft', 'yd', 'ell', 'Pica', 'survey_mi', 'Picapt',
    'psi', 'Torr',
    'lbf',
    'HP', 'h', 'PS',
    'HPh', 'flb', 'BTU', 'hh', 'btu',
    'tsp', 'tspm', 'tbs', 'oz', 'cup', 'pt', 'us_pt', 'uk_pt', 'qt', 'UK_qt', 'gal', 'uk_gal', 'barrel', 'bushel', 'ft3', 'ft^3', 'in3', 'in^3', 'mi3', 'mi^3', 'yd3', 'yd^3', 'Nmi3', 'Nmi^3', 'Picapt3', 'Picapt^3', 'Pica3', 'Pica^3', 'GRT', 'regton', 'MTON',
    'kn', 'admkn',
    'uk_acre', 'us_acre', 'ft2', 'ft^2', 'in2', 'in^2', 'ly2', 'ly^2', 'Morgen', 'mi2', 'mi^2', 'Nmi2', 'Nmi^2', 'Pica2', 'Picapt^2', 'Pica^2', 'Picapt^2', 'yd2', 'yd^2'
];

function bessel(num, order, modfied) {
    var iterMax = 100, Z = num * 0.5, Zm = Z * Z;
    Z = Math_pow(Z, parseFloatFunc(order));
    var N1 = CalcEngine_1.Functions._fact(order), N2 = 1.0, n1 = 0.0, n2 = parseFloatFunc(order), act = Z / N1, old = act * 0.9;
    var addFlag = false;
    while (act !== old && iterMax !== 0) {
        Z *= Zm;
        N1 *= ++n1;
        N2 *= ++n2;
        old = act;
        act = (modfied || addFlag) ? (act + Z / N1 / N2) : (act - Z / N1 / N2);
        iterMax--;
        addFlag = !addFlag;
    }
    return act;
}

function stringToLong(s, radix) {
    var limit = Math_pow(radix, 10), number = parseInt(s, radix);

    if (isNaNFunc(number)) {
        return CalcErrorsNumber;
    }
    return (limit / 2 <= number) ? number - limit : number;
}

function longToString(number, radix, places) {
    if (number < 0) {
        number += Math_pow(radix, 10);
    }
    var buffer = number.toString(radix), pos = places - arrayHelper_getLength(buffer), i;
    for (i = 0; i < pos; i++) {
        buffer = '0' + buffer;
    }
    return buffer.toUpperCase();
}

function eg_binHexOct2dec(number, radix) {
    if (number < 0) {
        return CalcErrorsNumber;
    }
    var result = stringToLong(number, radix);
    return CalcConvert_isError(result) ? CalcErrorsNumber : result;
}

function eg_dec2BinHexOct(number, places, radix) {
    var result = longToString(number, radix, places._value);
    if (0 <= result && places._value < arrayHelper_getLength(result) && places._isArgExists) {
        return CalcErrorsNumber;
    }
    return result;
}

function eg_transformNumber(number, places, radix1, radix2, maxValue) {
    if (number < 0) {
        return CalcErrorsNumber;
    }
    var temp = stringToLong(number, radix1);
    if (CalcConvert_isError(temp)) {
        return CalcErrorsNumber;
    }
    if (maxValue && (temp < -maxValue || maxValue - 1 < temp)) {
        return CalcErrorsNumber;
    }
    var result = longToString(temp, radix2, places._value);
    if (0 <= temp && places._value < arrayHelper_getLength(result) && places._isArgExists) {
        return CalcErrorsNumber;
    }
    return result;
}

function convertResultToComplex(value, suffix) {
    var POSITIVE_INFINITY = Number.POSITIVE_INFINITY, realValue = value._getReal(), imagValue = value._getImag();
    if (isNaNFunc(realValue) || realValue === POSITIVE_INFINITY ||
        isNaNFunc(imagValue) || imagValue === POSITIVE_INFINITY) {
        return CalcErrorsNumber;
    }
    return value._toString(suffix);
}

function getResult(real, imag, num, isProduct) {
    var a = real, b = imag, c = num._getReal(), d = num._getImag();
    real = isProduct ? a * c - b * d : a + c;
    imag = isProduct ? a * d + b * c : b + d;
    return { _real: real, _imag: imag };
}
function eg_imProductSum(args, isProduct) {
    var real = isProduct ? 1 : 0, imag = 0;
    var num, i, j, k, area, retValue;
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        if (CalcEngine_1.Convert._isArray(args[i])) {
            var array = args[i];
            for (j = 0; j < array.rowCount; j++) {
                for (k = 0; k < array.columnCount; k++) {
                    num = convertToComplex(array.getValue(j, k));
                    if (!num) {
                        return CalcErrorsNumber;
                    }
                    retValue = getResult(real, imag, num, isProduct);
                    real = retValue._real;
                    imag = retValue._imag;
                }
            }
        }
        else if (CalcEngine_1.Convert._isReference(args[i])) {
            var ref = args[i];
            for (area = 0; area < ref.getRangeCount(); area++) {
                for (j = 0; j < ref.getRowCount(area); j++) {
                    for (k = 0; k < ref.getColumnCount(area); k++) {
                        num = convertToComplex(ref.getValue(area, j, k));
                        if (!num) {
                            return CalcErrorsNumber;
                        }
                        retValue = getResult(real, imag, num, isProduct);
                        real = retValue._real;
                        imag = retValue._imag;
                    }
                }
            }
        }
        else {
            num = convertToComplex(args[i]);
            if (!num) {
                return CalcErrorsNumber;
            }
            retValue = getResult(real, imag, num, isProduct);
            real = retValue._real;
            imag = retValue._imag;
        }
    }
    return convertResultToComplex(createComplex(real, imag));
}
function eg_besseli(x, n) {
    return CalcConvert_toResult(bessel(x, n, true));
}
function eg_besselj(x, n) {
    return CalcConvert_toResult(bessel(x, n, false));
}
function eg_besselk(x, n) {
    var MAXNUM = 1.79769313486231570815E308;
    var EUL = 0.5772156649015328606065;
    var ans = 0, z0 = 0.25 * x * x, fn = 1, pn = 0, zmn = 1, tox = 2 / x;
    var s, t, k, i;
    if (n > 0) {
        pn = -EUL;
        for (i = 1; i < n; i++) {
            pn += 1 / i;
            fn *= i + 1;
        }
        zmn = tox;
        if (n === 1) {
            ans = 1 / x;
        }
        else {
            var nk1f = fn / n, kf = 1, zn = 1;
            s = nk1f;
            for (i = 1; i < n; i++) {
                nk1f /= n - i;
                kf *= i;
                zn *= -z0;
                t = nk1f * zn / kf;
                s += t;
                if (MAXNUM - Math_abs(t) < Math_abs(s) || tox > 1 && MAXNUM / tox < zmn) {
                    return MAXNUM;
                }
                zmn *= tox;
            }
            s *= 0.5;
            t = Math_abs(s);
            if (zmn > 1 && MAXNUM / zmn < t || t > 1 && MAXNUM / t < zmn) {
                return MAXNUM;
            }
            ans = s * zmn;
        }
    }
    var tlg = 2 * Math_log(x / 2), pk = -EUL;
    if (n === 0) {
        pn = pk;
        t = 1;
    }
    else {
        pn += 1 / n;
        t = 1 / fn;
    }
    s = (pk + pn - tlg) * t;
    k = 1;
    do {
        t *= z0 / (k * (k + n));
        pk += 1 / k;
        pn += 1 / (k + n);
        s += (pk + pn - tlg) * t;
        k++;
    } while (Math_abs(t / s) > 1.11022302462515654042E-16 );
    s = 0.5 * s / zmn;
    if ((n & 1) !== 0) {
        s = -s;
    }
    ans += s;
    return CalcConvert_toResult(ans);
}
function eg_bessely(xValue, nValue) {
    var ENG_PP_DATA_ARRAY = [7.96936729297347051624E-4, 8.28352392107440799803E-2, 1.23953371646414299388, 5.44725003058768775090,
        8.74716500199817011941, 5.30324038235394892183, 9.99999999999999997821E-1];
    var ENG_PP2_DATA_ARRAY = [7.62125616208173112003E-4, 7.31397056940917570436E-2, 1.12719608129684925192, 5.11207951146807644818,
        8.42404590141772420927, 5.21451598682361504063, 1.00000000000000000254];
    var ENG_PQ_DATA_ARRAY = [9.24408810558863637013E-4, 8.56288474354474431428E-2, 1.25352743901058953537, 5.47097740330417105182,
        8.76190883237069594232, 5.30605288235394617618, 1.00000000000000000218];
    var ENG_PQ2_DATA_ARRAY = [5.71323128072548699714E-4, 6.88455908754495404082E-2, 1.10514232634061696926, 5.07386386128601488557,
        8.39985554327604159757, 5.20982848682361821619, 9.99999999999999997461E-1];
    var ENG_QP_DATA_ARRAY = [-1.13663838898469149931E-2, -1.28252718670509318512, -1.95539544257735972385E1, -9.32060152123768231369E1,
        -1.77681167980488050595E2, -1.47077505154951170175E2, -5.14105326766599330220E1, -6.05014350600728481186];
    var ENG_QP2_DATA_ARRAY = [5.10862594750176621635E-2, 4.98213872951233449420, 7.58238284132545283818E1, 3.66779609360150777800E2,
        7.10856304998926107277E2, 5.97489612400613639965E2, 2.11688757100572135698E2, 2.52070205858023719784E1];
    var ENG_QQ_DATA_ARRAY = [6.43178256118178023184E1, 8.56430025976980587198E2, 3.88240183605401609683E3, 7.24046774195652478189E3,
        5.93072701187316984827E3, 2.06209331660327847417E3, 2.42005740240291393179E2];
    var ENG_QQ2_DATA_ARRAY = [7.42373277035675149943E1, 1.05644886038262816351E3, 4.98641058337653607651E3, 9.56231892404756170795E3,
        7.99704160447350683650E3, 2.82619278517639096600E3, 3.36093607810698293419E2];
    var ENG_YP_DATA_ARRAY = [1.55924367855235737965E4, -1.46639295903971606143E7, 5.43526477051876500413E9, -9.82136065717911466409E11,
        8.75906394395366999549E13, -3.46628303384729719441E15, 4.42733268572569800351E16, -1.84950800436986690637E16];
    var ENG_YP2_DATA_ARRAY = [1.26320474790178026440E9, -6.47355876379160291031E11, 1.14509511541823727583E14, -8.12770255501325109621E15,
        2.02439475713594898196E17, -7.78877196265950026825E17];
    var ENG_YQ_DATA_ARRAY = [1.04128353664259848412E3, 6.26107330137134956842E5, 2.68919633393814121987E8, 8.64002487103935000337E10,
        2.02979612750105546709E13, 3.17157752842975028269E15, 2.50596256172653059228E17];
    var ENG_YQ2_DATA_ARRAY = [5.94301592346128195359E2, 2.35564092943068577943E5, 7.34811944459721705660E7, 1.87601316108706159478E10,
        3.88231277496238566008E12, 6.20557727146953693363E14, 6.87141087355300489866E16, 3.97270608116560655612E18];
    var ENG_RP_DATA_ARRAY = [-4.79443220978201773821E9, 1.95617491946556577543E12, -2.49248344360967716204E14, 9.70862251047306323952E15];
    var ENG_RP2_DATA_ARRAY = [-8.99971225705559398224E8, 4.52228297998194034323E11, -7.27494245221818276015E13, 3.68295732863852883286E15];
    var ENG_RQ_DATA_ARRAY = [4.99563147152651017219E2, 1.73785401676374683123E5, 4.84409658339962045305E7, 1.11855537045356834862E10,
        2.11277520115489217587E12, 3.10518229857422583814E14, 3.18121955943204943306E16, 1.71086294081043136091E18];
    var ENG_RQ2_DATA_ARRAY = [6.20836478118054335476E2, 2.56987256757748830383E5, 8.35146791431949253037E7, 2.21511595479792499675E10,
        4.74914122079991414898E12, 7.84369607876235854894E14, 8.95222336184627338078E16, 5.32278620332680085395E18];
    var SQ2OPI = 7.9788456080286535587989E-1 , THPIO4 = 2.35619449019234492885 , PIO4 = 7.85398163397448309616E-1 ;
    function polevl_p1evl(x, coef, N, isP1evl) {
        var k = 0, ans = parseFloatFunc(coef[k++]), i = N;
        if (isP1evl) {
            ans += x;
            i--;
        }
        do {
            ans = ans * x + parseFloatFunc(coef[k++]);
        } while (--i !== 0);
        return ans;
    }
    function j0_j1(x, isJ0) {
        var PP = isJ0 ? ENG_PP_DATA_ARRAY : ENG_PP2_DATA_ARRAY;
        var PQ = isJ0 ? ENG_PQ_DATA_ARRAY : ENG_PQ2_DATA_ARRAY;
        var QP = isJ0 ? ENG_QP_DATA_ARRAY : ENG_QP2_DATA_ARRAY;
        var QQ = isJ0 ? ENG_QQ_DATA_ARRAY : ENG_QQ2_DATA_ARRAY;
        var RP = isJ0 ? ENG_RP_DATA_ARRAY : ENG_RP2_DATA_ARRAY;
        var RQ = isJ0 ? ENG_RQ_DATA_ARRAY : ENG_RQ2_DATA_ARRAY;
        var DR1 = isJ0 ? 5.78318596294678452118 : 14.6819706421238932572;
        var DR2 = isJ0 ? 30.4712623436620863991 : 49.2184563216946036703;
        var w, z, p, q, xn;
        if (x <= 5) {
            z = x * x;
            if (isJ0 && x < 1e-5) {
                return 1 - z / 4;
            }
            w = polevl_p1evl(z, RP, 3) / polevl_p1evl(z, RQ, 8, true);
            p = (z - DR1) * (z - DR2);
            p *= w;
            return isJ0 ? p : p * x;
        }
        w = 5 / x;
        z = isJ0 ? 25 / (x * x) : w * w;
        p = polevl_p1evl(z, PP, 6) / polevl_p1evl(z, PQ, 6);
        q = polevl_p1evl(z, QP, 7) / polevl_p1evl(z, QQ, 7, true);
        xn = x - (isJ0 ? PIO4 : THPIO4);
        p = p * Math_cos(xn) - w * q * Math_sin(xn);
        return p * SQ2OPI / Math_sqrt(x);
    }
    function y0_y1(x, isY0) {
        var w, z;
        var PP = isY0 ? ENG_PP_DATA_ARRAY : ENG_PP2_DATA_ARRAY;
        var PQ = isY0 ? ENG_PQ_DATA_ARRAY : ENG_PQ2_DATA_ARRAY;
        var QP = isY0 ? ENG_QP_DATA_ARRAY : ENG_QP2_DATA_ARRAY;
        var QQ = isY0 ? ENG_QQ_DATA_ARRAY : ENG_QQ2_DATA_ARRAY;
        var YP = isY0 ? ENG_YP_DATA_ARRAY : ENG_YP2_DATA_ARRAY;
        var YQ = isY0 ? ENG_YQ_DATA_ARRAY : ENG_YQ2_DATA_ARRAY;
        var multiplyNum = isY0 ? 1 : x, YP_Num = isY0 ? 7 : 5, YQ_Num = isY0 ? 7 : 8;
        if (x <= 5) {
            z = x * x;
            w = multiplyNum * polevl_p1evl(z, YP, YP_Num) / polevl_p1evl(z, YQ, YQ_Num, true);
            w += 0.636619772367581343075535 * (isY0 ? Math_log(x) * j0_j1(x, true) : (j0_j1(x, false) * Math_log(x) - 1 / x));
            return w;
        }
        w = 5 / x;
        z = isY0 ? 25 / (x * x) : w * w;
        var p = polevl_p1evl(z, PP, 6) / polevl_p1evl(z, PQ, 6), q = polevl_p1evl(z, QP, 7) / polevl_p1evl(z, QQ, 7, true), xn = x - (isY0 ? PIO4 : THPIO4);
        p = p * Math_sin(xn) + w * q * Math_cos(xn);
        return p * SQ2OPI / Math_sqrt(x);
    }
    function yn(x, n) {
        var anm2 = y0_y1(x, true), anm1 = y0_y1(x, false), k = 1, r = 2 * k, an;
        if (n === 0) {
            return anm2;
        }
        if (n === 1) {
            return anm1;
        }
        do {
            an = r * anm1 / x - anm2;
            anm2 = anm1;
            anm1 = an;
            r += 2;
            ++k;
        } while (k < n);
        return an;
    }
    return CalcConvert_toResult(yn(xValue, nValue));
}
function eg_bin2dec(number) {
    return eg_binHexOct2dec(number, 2);
}
function eg_hex2dec(number) {
    return eg_binHexOct2dec(number, 16);
}
function eg_oct2dec(number) {
    return eg_binHexOct2dec(number, 8);
}
function eg_bin2hex(number, places) {
    return eg_transformNumber(number, places, 2, 16);
}
function eg_bin2oct(number, places) {
    return eg_transformNumber(number, places, 2, 8);
}
function eg_dec2bin(number, places) {
    return eg_dec2BinHexOct(number, places, 2);
}
function eg_dec2hex(number, places) {
    return eg_dec2BinHexOct(number, places, 16);
}
function eg_dex2oct(number, places) {
    return eg_dec2BinHexOct(number, places, 8);
}
function eg_hex2bin(number, places) {
    return eg_transformNumber(number, places, 16, 2, 512);
}
function eg_oct2bin(number, places) {
    return eg_transformNumber(number, places, 8, 2, 512);
}
function eg_hex2oct(number, places) {
    return eg_transformNumber(number, places, 16, 8, 536870912);
}
function eg_oct2hex(number, places) {
    return eg_transformNumber(number, places, 8, 16, 549755813888);
}
function eg_erf(lower, upper) {
    var val = st_normsdist(lower * Math_sqrt(2));
    var ans = val * 2 - 1;
    if (upper._isArgExists) {
        val = st_normsdist(upper._value * Math_sqrt(2));
        var x = val * 2 - 1;
        ans = x - ans;
    }
    return ans;
}
function eg_erf_precise(lower) {
    return eg_erf(lower, { _isArgExists: false });
}
function eg_erfc(x) {
    return 1 - eg_erf(x, { _isArgExists: false });
}
function eg_delta(num1, num2) {
    return CalcEngine_1._Helper._approxEqual(num1, num2) ? 1 : 0;
}
function eg_gestep(num, step) {
    return num >= step ? 1 : 0;
}
function eg_complex(real, imag, suffix) {
    if (suffix !== 'i' && suffix !== 'j') {
        return CalcEngine_1.Errors.Value;
    }
    return convertResultToComplex(createComplex(real, imag), suffix);
}
function eg_imabs(num) {
    return CalcConvert_toResult(Math_sqrt(num._real * num._real + num._imag * num._imag));
}
function eg_imaginary(num) {
    return CalcConvert_toResult(num._imag);
}
function eg_imargument(num) {
    if (num._real === 0 && num._imag === 0) {
        return CalcEngine_1.Errors.DivideByZero;
    }
    return CalcConvert_toResult(Math_atan2(num._imag, num._real));
}
function eg_imconjugate(num) {
    return convertResultToComplex(createComplex(num._real, -num._imag));
}
function eg_imcos(num) {
    return convertResultToComplex(createComplex(Math_cos(num._real) * sinhCosh(num._imag, false), -Math_sin(num._real) * sinhCosh(num._imag, true)));
}
function eg_imdiv(num0, num1) {
    var a = num0._real;
    var b = num0._imag;
    var c = num1._real;
    var d = num1._imag;
    return convertResultToComplex(createComplex((a * c + b * d) / (c * c + d * d), (b * c - a * d) / (c * c + d * d)));
}
function eg_imexp(num) {
    return convertResultToComplex(createComplex(Math_exp(num._real) * Math_cos(num._imag), Math_exp(num._real) * Math_sin(num._imag)));
}
function eg_imln(num) {
    var x = num._real;
    var y = num._imag;
    return convertResultToComplex(createComplex(Math_log(Math_sqrt(x * x + y * y)), Math_atan2(y, x)));
}
function eg_imlog10(num) {
    var x = num._real;
    var y = num._imag;
    var log10e = MathHelper._log(Math_E, 10);
    return convertResultToComplex(createComplex(log10e * Math_log(Math_sqrt(x * x + y * y)), log10e * Math_atan2(y, x)));
}
function eg_imlog2(num) {
    var x = num._real;
    var y = num._imag;
    var log2e = MathHelper._log(Math_E, 2);
    return convertResultToComplex(createComplex(log2e * Math_log(Math_sqrt(x * x + y * y)), log2e * Math_atan2(y, x)));
}
function eg_impower(num, pow) {
    var x = num._real;
    var y = num._imag;
    if (x === 0 && y === 0) {
        if (pow > 0) {
            return '0';
        }
        return CalcErrorsNumber;
    }
    var abs = Math_sqrt(x * x + y * y);
    var phi = Math_atan2(y, x);
    return convertResultToComplex(createComplex(Math_pow(abs, pow) * Math_cos(pow * phi), Math_pow(abs, pow) * Math_sin(pow * phi)));
}
function eg_imreal(num) {
    return CalcConvert_toResult(num._real);
}
function eg_imsin(num) {
    return convertResultToComplex(createComplex(Math_sin(num._real) * sinhCosh(num._imag, false), Math_cos(num._real) * sinhCosh(num._imag, true)));
}
function eg_imsqrt(num) {
    var x = num._real;
    var y = num._imag;
    if (x === 0 && y === 0) {
        return '0';
    }
    var abs = Math_sqrt(x * x + y * y);
    var phi = Math_atan2(y, x);
    return convertResultToComplex(createComplex(Math_sqrt(abs) * Math_cos(phi / 2), Math_sqrt(abs) * Math_sin(phi / 2)));
}
function eg_imsub(num0, num1) {
    return convertResultToComplex(createComplex(num0._real - num1._real, num0._imag - num1._imag));
}
function eg_improduct() {
    return eg_imProductSum(arguments, true);
}
function eg_imsum() {
    return eg_imProductSum(arguments, false);
}
function fixPrefixes(unitName) {
    var FIX_PREFIXED_LIST = ['cup', 'mmHg', 'J', 'sec', 'cel', 'kel', 'hh', 'Wh', 'wh', 'flb', 'BTU'];
    for (var i = 0; FIX_PREFIXED_LIST[i]; i++) {
        if (unitName.localeCompare(FIX_PREFIXED_LIST[i]) === 0) {
            return false;
        }
    }
    return true;
}
function getConstantOfUnit(units, prefixesArray, unitName) {
    var i, _c = 0, _prefix = 1;
    for (i = 0; units[i]._str; i++) {
        if ((unitName.localeCompare(units[i]._str)) === 0) {
            _c = units[i]._c;
            return {
                _hasUnit: true,
                _prefix: _prefix,
                _constant: _c
            };
        }
    }
    if (prefixesArray) {
        for (i = 0; prefixesArray[i]._str; i++) {
            var u = unitName.substr(0, 1);
            var p = prefixesArray[i]._str.substr(0, 1);
            if ((u === p) && fixPrefixes(unitName)) {
                _prefix = prefixesArray[i]._c;
            }
        }
    }
    for (i = 0; units[i]._str; i++) {
        var length_1 = arrayHelper_getLength(units[i]._str);
        var u1 = unitName.substr(1, length_1);
        var u2 = units[i]._str.substr(0, length_1);
        if ((u1 === u2) && fixPrefixes(unitName)) {
            _c = units[i]._c;
            return {
                _hasUnit: true,
                _prefix: _prefix,
                _constant: _c
            };
        }
    }
    return {
        _hasUnit: false,
        _prefix: _prefix,
        _constant: _c
    };
}
function eg_convert(n, from_unit, to_unit) {
    if (_adjustTemperatureUnit(from_unit).unit && _adjustTemperatureUnit(to_unit).unit) {
        return _convertTemperature(n, from_unit, to_unit);
    }

    var infoUnitNumber = _informationUnitNumber(from_unit, to_unit);
    if (infoUnitNumber === 1) {
        return CalcErrorsNotAvailable;
    }
    else if (infoUnitNumber === 2) {
        return _convertInformation(n, from_unit, to_unit);
    }

    if (_adjustTimeUnit(from_unit) && _adjustTimeUnit(to_unit)) {
        return _convertTimeUnit(n, from_unit, to_unit);
    }

    if (_isIncludeEnglishUnitAndPrefix(from_unit) || _isIncludeEnglishUnitAndPrefix(to_unit)) {
        return CalcErrorsNotAvailable;
    }
    var unitsArray = [weightUnits, distanceUnits, pressureUnits, forceUnits, energyUnits, powerUnits, magnetismUnits, volumeUnits, magnetismUnits, speedsUnit, areasUnit];
    for (var i = 0; i < arrayHelper_getLength(unitsArray); i++) {
        var units = unitsArray[i];
        var result = getConstantOfUnit(units, PREFIXES, from_unit);
        var from_result = result._hasUnit, from_c = result._constant, from_prefix = result._prefix;
        result = getConstantOfUnit(units, PREFIXES, to_unit);
        var to_result = result._hasUnit, to_prefix = result._prefix, to_c = result._constant;
        if (from_result && to_result && from_c !== 0 && to_prefix !== 0) {
            return ((n * from_prefix) / from_c) * to_c / to_prefix;
        }
    }
    return CalcErrorsNotAvailable;
}
function _isIncludeEnglishUnitAndPrefix(unit) {
    if (ENGLISHUNITS.indexOf(unit) >= 0) {
        return false;
    }
    var _a = [unit.slice(0, 1), unit.slice(1)], prefix = _a[0], newUnit = _a[1];
    if (PREDIXESUNITS.indexOf(prefix) >= 0 && ENGLISHUNITS.indexOf(newUnit) >= 0) {
        return true;
    }
    return false;
}
function _adjustTimeUnit(unit) {
    for (var i = 0; i < timeUnits.length; i++) {
        if (unit === timeUnits[i]._str) {
            return true;
        }
    }
    if (unit.slice(1) === 'sec' || unit.slice(1) === 's') {
        return true;
    }
    else {
        return false;
    }
}
function _convertTimeUnit(n, from_unit, to_unit) {
    var from_result = getConstantOfUnit(timeUnits, PREFIXES, from_unit);
    var to_result = getConstantOfUnit(timeUnits, PREFIXES, to_unit);
    return (n * from_result._prefix / from_result._constant) * to_result._constant / to_result._prefix;
}
function _informationUnitNumber(from_unit, to_unit) {
    var adjustFromUnit = from_unit.indexOf('bit') > -1 || from_unit.indexOf('byte') > -1;
    var adjustToUnit = to_unit.indexOf('bit') > -1 || to_unit.indexOf('byte') > -1;
    if (adjustFromUnit && adjustToUnit) {
        return 2;
    }
    else {
        if (!(adjustToUnit || adjustFromUnit)) {
            return 0;
        }
        else {
            return 1;
        }
    }
}
function _convertInformation(n, from_unit, to_unit) {
    var from_result = _splitBinaryUnit(from_unit);
    var to_result = _splitBinaryUnit(to_unit);
    return ((n * from_result._prefix) / from_result._constant) * to_result._constant / to_result._prefix;
}
function _splitBinaryUnit(unitName) {
    var _a, _b;
    var _prefix, _prefixNumber;
    var _constant, _constantNumber;
    if (unitName.indexOf(INFORMATIONUNITS.bit) > -1) {
        _a = [unitName.slice(0, -3), unitName.slice(-3)], _prefix = _a[0], _constant = _a[1];
    }
    else if (unitName.indexOf(INFORMATIONUNITS.byte) > -1) {
        _b = [unitName.slice(0, -4), unitName.slice(-4)], _prefix = _b[0], _constant = _b[1];
    }
    if (_prefix) {
        for (var i = 0; binaryPrefixes[i]._str; i++) {
            if (_prefix === binaryPrefixes[i]._str) {
                _prefixNumber = binaryPrefixes[i]._c;
            }
        }
    }
    else {
        _prefixNumber = 1;
    }
    if (_constant === INFORMATIONUNITS.bit) {
        _constantNumber = informationUnits[0]._c;
    }
    else if (_constant === INFORMATIONUNITS.byte) {
        _constantNumber = informationUnits[1]._c;
    }
    return {
        _prefix: _prefixNumber,
        _constant: _constantNumber,
    };
}
function _convertTemperature(n, from_unit, to_unit) {
    var result;
    var afterConvertUnit = _adjustTemperatureUnit(from_unit);
    switch (afterConvertUnit.unit) {
        case TEMPERATUREUNITS.Rank:
            result = _convertfromRank(n, to_unit);
            break;
        case TEMPERATUREUNITS.Reau:
            result = _convertfromReau(n, to_unit);
            break;
        case TEMPERATUREUNITS.C:
        case TEMPERATUREUNITS.cel:
            result = _convertfromCel(n, to_unit);
            break;
        case TEMPERATUREUNITS.F:
        case TEMPERATUREUNITS.fah:
            result = _convertfromFah(n, to_unit);
            break;
        case TEMPERATUREUNITS.K:
        case TEMPERATUREUNITS.kel:
            result = _convertfromKel(n * afterConvertUnit.prefixNumber, to_unit);
            break;
    }
    return result;
}
function _convertfromCel(n, to_unit) {
    var prefixNumber;
    var afterConvertUnit = _adjustTemperatureUnit(to_unit);
    switch (afterConvertUnit.unit) {
        case TEMPERATUREUNITS.Rank:
            return (n * 9) / 5 + 32 + F_RANK_OFFSET;
        case TEMPERATUREUNITS.Reau:
            return n * 0.8;
        case TEMPERATUREUNITS.cel:
        case TEMPERATUREUNITS.C:
            return n;
        case TEMPERATUREUNITS.F:
        case TEMPERATUREUNITS.fah:
            return (n * 9) / 5 + 32;
        case TEMPERATUREUNITS.K:
        case TEMPERATUREUNITS.kel:
            prefixNumber = afterConvertUnit.prefixNumber;
            return (n + C_K_OFFSET) / prefixNumber;
    }
}
function _convertfromFah(n, to_unit) {
    var prefixNumber;
    var afterConvertUnit = _adjustTemperatureUnit(to_unit);
    switch (afterConvertUnit.unit) {
        case TEMPERATUREUNITS.Rank:
            return n + F_RANK_OFFSET;
        case TEMPERATUREUNITS.Reau:
            return 0.8 * 5 * (n - 32) / 9;
        case TEMPERATUREUNITS.F:
        case TEMPERATUREUNITS.fah:
            return n;
        case TEMPERATUREUNITS.C:
        case TEMPERATUREUNITS.cel:
            return 5 * (n - 32) / 9;
        case TEMPERATUREUNITS.K:
        case TEMPERATUREUNITS.kel:
            prefixNumber = afterConvertUnit.prefixNumber;
            return (5 * (n - 32) / 9 + C_K_OFFSET) / prefixNumber;
    }
}
function _convertfromKel(n, to_unit) {
    var prefixNumber;
    var afterConvertUnit = _adjustTemperatureUnit(to_unit);
    switch (afterConvertUnit.unit) {
        case TEMPERATUREUNITS.Rank:
            return (n) * 9 / 5;
        case TEMPERATUREUNITS.Reau:
            return (n - C_K_OFFSET) * 0.8;
        case TEMPERATUREUNITS.C:
        case TEMPERATUREUNITS.cel:
            return n - C_K_OFFSET;
        case TEMPERATUREUNITS.F:
        case TEMPERATUREUNITS.fah:
            return (n - C_K_OFFSET) * 9 / 5 + 32;
        case TEMPERATUREUNITS.K:
        case TEMPERATUREUNITS.kel:
            prefixNumber = afterConvertUnit.prefixNumber;
            return n / prefixNumber;
    }
}
function _convertfromRank(n, to_unit) {
    var prefixNumber;
    var afterConvertUnit = _adjustTemperatureUnit(to_unit);
    switch (afterConvertUnit.unit) {
        case TEMPERATUREUNITS.Rank:
            return n;
        case TEMPERATUREUNITS.Reau:
            return 0.8 * ((n - F_RANK_OFFSET) - 32) * 5 / 9;
        case TEMPERATUREUNITS.C:
        case TEMPERATUREUNITS.cel:
            return ((n - F_RANK_OFFSET) - 32) * 5 / 9;
        case TEMPERATUREUNITS.F:
        case TEMPERATUREUNITS.fah:
            return n - F_RANK_OFFSET;
        case TEMPERATUREUNITS.K:
        case TEMPERATUREUNITS.kel:
            prefixNumber = afterConvertUnit.prefixNumber;
            return (C_K_OFFSET + ((n - F_RANK_OFFSET) - 32) * 5 / 9) / prefixNumber;
    }
}
function _convertfromReau(n, to_unit) {
    var prefixNumber;
    var afterConvertUnit = _adjustTemperatureUnit(to_unit);
    switch (afterConvertUnit.unit) {
        case TEMPERATUREUNITS.Rank:
            return n * 1.25 * 9 / 5 + 32 + F_RANK_OFFSET;
        case TEMPERATUREUNITS.Reau:
            return n;
        case TEMPERATUREUNITS.C:
        case TEMPERATUREUNITS.cel:
            return n * 1.25;
        case TEMPERATUREUNITS.F:
        case TEMPERATUREUNITS.fah:
            return n * 1.25 * 9 / 5 + 32;
        case TEMPERATUREUNITS.K:
        case TEMPERATUREUNITS.kel:
            prefixNumber = afterConvertUnit.prefixNumber;
            return (n * 1.25 + C_K_OFFSET) / prefixNumber;
    }
}
function _adjustTemperatureUnit(_unit) {
    var _prefixNumber = 1;
    if (TEMPERATUREUNITS[_unit]) {
        return {
            unit: _unit,
            prefixNumber: _prefixNumber,
        };
    }
    else if (TEMPERATUREUNITS[_unit.slice(1)] === 'K' || TEMPERATUREUNITS[_unit.slice(1)] === 'kel') {
        var _prefix = _unit.slice(0, 1);
        _unit = _unit.slice(1);
        for (var i = 0; PREFIXES[i]._str; i++) {
            if (_prefix === PREFIXES[i]._str) {
                _prefixNumber = PREFIXES[i]._c;
            }
        }
        return {
            unit: _unit,
            prefixNumber: _prefixNumber,
        };
    }
    else {
        return {
            unit: undefined,
            prefixNumber: _prefixNumber,
        };
    }
}
function getNumber(number1, number2, type, func) {
    if (number1 === '' && number2 === '') {
        return CalcErrorsValue;
    }
    var double1Value = { value: 0 };
    var double2Value = { value: 0 };
    if (_tryToDouble(number1, double1Value) === true && _tryToDouble(number2, double2Value) === true) {
        number1 = double1Value.value;
        number2 = double2Value.value;
        if (number1 < 0 || number1 > BIT_LIMIT_NUMBER || number1 % 1 !== 0) {
            return CalcErrorsNumber;
        }
        if (type === 'bitOperator') {
            if (number2 < 0 || number2 > BIT_LIMIT_NUMBER || number2 % 1 !== 0) {
                return CalcErrorsNumber;
            }
        }
        else if (type === 'shiftOperator' && number1 === 0) {
            return 0;
        }
        return func(number1, number2);
    }
    return CalcErrorsValue;
}
function eg_bitand(number1, number2) {
    return getNumber(number1, number2, 'bitOperator', function (num1, num2) {
        return num1 & num2;
    });
}
function eg_bitor(number1, number2) {
    return getNumber(number1, number2, 'bitOperator', function (num1, num2) {
        return num1 | num2;
    });
}
function eg_bitxor(number1, number2) {
    return getNumber(number1, number2, 'bitOperator', function (num1, num2) {
        return num1 ^ num2;
    });
}
function eg_bitlshift(number, shiftAmount) {
    return getNumber(number, shiftAmount, 'shiftOperator', function (number1, number2) {
        if (number2 >= 48) {
            return CalcErrorsNumber;
        }
        if (number2 < 0 && number1 < (1 << -number2)) {
            return 0;
        }
        var tmp = number1 << number2;
        if (tmp > BIT_LIMIT_NUMBER) {
            return CalcErrorsNumber;
        }
        return tmp;
    });
}
function eg_bitrshift(number, shiftAmount) {
    return getNumber(number, shiftAmount, 'shiftOperator', function (number1, number2) {
        if (number2 > 53) {
            return CalcErrorsNumber;
        }
        if (shiftAmount >= 0) {
            return number >> shiftAmount;
        }
        return number << -shiftAmount;
    });
}
function getComplexText(text, func) {
    if (text === '') {
        return CalcErrorsNumber;
    }
    if (text === true || text === false) {
        return CalcErrorsValue;
    }
    var complex = convertToComplex(text);
    if (complex) {
        return func(complex);
    }
    return CalcErrorsNumber;
}
function eg_imcosh(text) {
    return getComplexText(text, function (complex) {
        return convertResultToComplex(complexCosh(complex), complex._getSuffix());
    });
}
function eg_imcot(text) {
    return getComplexText(text, function (complex) {
        if (complexEquals(complexSin(complex), createComplex(0, 0))) {
            return CalcErrorsNumber;
        }
        return convertResultToComplex(complexDivision(complexCos(complex), complexSin(complex)), complex._getSuffix());
    });
}
function eg_imcsc(text) {
    return getComplexText(text, function (complex) {
        if (complexEquals(complex, createComplex(0, 0))) {
            return CalcErrorsNumber;
        }
        return convertResultToComplex(complexCsc(complex), complex._getSuffix());
    });
}
function eg_imcsch(text) {
    return getComplexText(text, function (complex) {
        if (complexEquals(complexSinh(complex), createComplex(0, 0))) {
            return CalcErrorsNumber;
        }
        return convertResultToComplex(complexCsch(complex), complex._getSuffix());
    });
}
function eg_imsec(text) {
    return getComplexText(text, function (complex) {
        if (complexEquals(complexCos(complex), createComplex(0, 0))) {
            return CalcErrorsNumber;
        }
        return convertResultToComplex(complexSec(complex), complex._getSuffix());
    });
}
function eg_imsech(text) {
    return getComplexText(text, function (complex) {
        if (complexEquals(complexCosh(complex), createComplex(0, 0))) {
            return CalcErrorsNumber;
        }
        return convertResultToComplex(complexSech(complex), complex._getSuffix());
    });
}
function eg_imsinh(text) {
    return getComplexText(text, function (complex) {
        return convertResultToComplex(complexSinh(complex), complex._getSuffix());
    });
}
function eg_imtan(text) {
    return getComplexText(text, function (complex) {
        return convertResultToComplex(complexTan(complex), complex._getSuffix());
    });
}
function complexSin(value) {
    var real = value._getReal();
    var imaginary = value._getImag();
    return createComplex(Math_sin(real) * sinhCosh(imaginary, false), Math_cos(real) * sinhCosh(imaginary, true));
}
function complexCos(value) {
    var real = value._getReal();
    var imaginary = value._getImag();
    return createComplex(Math_cos(real) * sinhCosh(imaginary, false), -(Math_sin(real) * sinhCosh(imaginary, true)));
}
function complexSinh(value) {
    var real = value._getReal();
    var imaginary = value._getImag();
    return createComplex(sinhCosh(real, true) * Math_cos(imaginary), sinhCosh(real, false) * Math_sin(imaginary));
}
function complexCosh(value) {
    var real = value._getReal();
    var imaginary = value._getImag();
    return createComplex(sinhCosh(real, false) * Math_cos(imaginary), sinhCosh(real, true) * Math_sin(imaginary));
}
function complexTan(value) {
    return complexDivision(complexSin(value), complexCos(value));
}
function complexCsc(value) {
    return complexDivision(COMPLEX_ONE, complexSin(value));
}
function complexCsch(value) {
    return complexDivision(COMPLEX_ONE, complexSinh(value));
}
function complexSec(value) {
    return complexDivision(COMPLEX_ONE, complexCos(value));
}
function complexSech(value) {
    return complexDivision(COMPLEX_ONE, complexCosh(value));
}
function complexDivision(c1, c2) {
    var real = c1._getReal();
    var imaginary = c1._getImag();
    var num3 = c2._getReal();
    var num4 = c2._getImag();
    if (Math.abs(num4) < Math.abs(num3)) {
        var num5 = num4 / num3;
        return createComplex((real + (imaginary * num5)) / (num3 + (num4 * num5)), (imaginary - (real * num5)) / (num3 + (num4 * num5)));
    }
    var num6 = num3 / num4;
    return createComplex((imaginary + (real * num6)) / (num4 + (num3 * num6)), (-real + (imaginary * num6)) / (num4 + (num3 * num6)));
}
function complexEquals(c1, c2) {
    return (c1._getReal() === c2._getReal() && c1._getImag() === c2._getImag());
}


var doubleArgDefaultValue = { _argType: 0 }, stringArgDefaultValue = { _argType: 5 }, stringArgDefaultValue1 = { _argType: 5 , _argCondition: ['checkLength 10'] }, stringArgDefaultValue2 = {
    _needArgExistsValue: true,
    _argType: 2 ,
    _defaultValue: 1,
    _argCondition: ['< 1', '> 10']
}, stringArgDefaultValue3 = { _argType: 2 , _argCondition: '< 0' }, complexArgDefaultValue = { _argType: 8 }, complexArgDefaultValue1 = { _argType: 8 , _complexCondition: true };
var engArgsLimitDefaultValue = [doubleArgDefaultValue, stringArgDefaultValue3], engArgsLimitDefaultValue1 = [{ _argType: 0 , _argCondition: '<= 0' }, stringArgDefaultValue3], engArgsLimitDefaultValue2 = [doubleArgDefaultValue, { _argType: 0 , _defaultValue: 0 }], engArgsLimitDefaultValue3 = [stringArgDefaultValue1, stringArgDefaultValue2];

defineBuiltInFunction('BESSELI', eg_besseli, 2, 2, engArgsLimitDefaultValue);
defineBuiltInFunction('BESSELJ', eg_besselj, 2, 2, engArgsLimitDefaultValue);
defineBuiltInFunction('BESSELK', eg_besselk, 2, 2, engArgsLimitDefaultValue1);
defineBuiltInFunction('BESSELY', eg_bessely, 2, 2, engArgsLimitDefaultValue1);
defineBuiltInFunction('BIN2DEC', eg_bin2dec, 1, 1, stringArgDefaultValue1);
defineBuiltInFunction('BIN2HEX', eg_bin2hex, 1, 2, engArgsLimitDefaultValue3, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('BIN2OCT', eg_bin2oct, 1, 2, engArgsLimitDefaultValue3, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('DEC2BIN', eg_dec2bin, 1, 2, [{ _argType: 0 , _argCondition: ['< -512', '> 511'] },
    stringArgDefaultValue2], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('DEC2HEX', eg_dec2hex, 1, 2, [{ _argType: 0 , _argCondition: ['< -549755813888', '> 549755813887'] }, stringArgDefaultValue2], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('DEC2OCT', eg_dex2oct, 1, 2, [{ _argType: 0 , _argCondition: ['< -536870912', '> 536870911'] }, stringArgDefaultValue2], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('HEX2BIN', eg_hex2bin, 1, 2, engArgsLimitDefaultValue3, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('HEX2DEC', eg_hex2dec, 1, 1, stringArgDefaultValue1);
defineBuiltInFunction('HEX2OCT', eg_hex2oct, 1, 2, engArgsLimitDefaultValue3, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('OCT2BIN', eg_oct2bin, 1, 2, engArgsLimitDefaultValue3, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('OCT2DEC', eg_oct2dec, 1, 1, stringArgDefaultValue1);
defineBuiltInFunction('OCT2HEX', eg_oct2hex, 1, 2, engArgsLimitDefaultValue3, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('ERF', eg_erf, 1, 2, [doubleArgDefaultValue, {
        _needArgExistsValue: true,
        _argType: 0
    }], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('ERF.PRECISE', eg_erf_precise, 1, 1, doubleArgDefaultValue);
defineBuiltInFunction('ERFC', eg_erfc, 1, 1, doubleArgDefaultValue);
defineBuiltInFunction('ERFC.PRECISE', eg_erfc, 1, 1, doubleArgDefaultValue);
defineBuiltInFunction('DELTA', eg_delta, 1, 2, engArgsLimitDefaultValue2, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('GESTEP', eg_gestep, 1, 2, engArgsLimitDefaultValue2, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('COMPLEX', eg_complex, 2, 3, [doubleArgDefaultValue, doubleArgDefaultValue, { _argType: 5 , _defaultValue: 'i' }], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 2 });
defineBuiltInFunction('IMABS', eg_imabs, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMAGINARY', eg_imaginary, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMARGUMENT', eg_imargument, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMCONJUGATE', eg_imconjugate, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMCOS', eg_imcos, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMDIV', eg_imdiv, 2, 2, [complexArgDefaultValue, complexArgDefaultValue1]);
defineBuiltInFunction('IMEXP', eg_imexp, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMLN', eg_imln, 1, 1, complexArgDefaultValue1);
defineBuiltInFunction('IMLOG10', eg_imlog10, 1, 1, complexArgDefaultValue1);
defineBuiltInFunction('IMLOG2', eg_imlog2, 1, 1, complexArgDefaultValue1);
defineBuiltInFunction('IMREAL', eg_imreal, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMSIN', eg_imsin, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMSQRT', eg_imsqrt, 1, 1, complexArgDefaultValue);
defineBuiltInFunction('IMSUB', eg_imsub, 2, 2, [complexArgDefaultValue, complexArgDefaultValue]);
defineBuiltInFunction('IMPOWER', eg_impower, 2, 2, [complexArgDefaultValue, { _argType: 2 }]);
defineBuiltInFunction('IMPRODUCT', eg_improduct, 1, 255, keyword_undefined, -1 , -1 );
defineBuiltInFunction('IMSUM', eg_imsum, 1, 255, keyword_undefined, -1 , -1 );
defineBuiltInFunction('CONVERT', eg_convert, 3, 3, [{ _argType: 1 }, stringArgDefaultValue, stringArgDefaultValue]);
defineBuiltInFunction('BITAND', eg_bitand, 0, 2);
defineBuiltInFunction('BITLSHIFT', eg_bitlshift, 0, 2);
defineBuiltInFunction('BITOR', eg_bitor, 0, 2);
defineBuiltInFunction('BITRSHIFT', eg_bitrshift, 0, 2);
defineBuiltInFunction('BITXOR', eg_bitxor, 0, 2);
defineBuiltInFunction('IMCOSH', eg_imcosh, 1, 1);
defineBuiltInFunction('IMCOT', eg_imcot, 1, 1);
defineBuiltInFunction('IMCSC', eg_imcsc, 1, 1);
defineBuiltInFunction('IMCSCH', eg_imcsch, 1, 1);
defineBuiltInFunction('IMSEC', eg_imsec, 1, 1);
defineBuiltInFunction('IMSECH', eg_imsech, 1, 1);
defineBuiltInFunction('IMSINH', eg_imsinh, 1, 1);
defineBuiltInFunction('IMTAN', eg_imtan, 1, 1);
 }),

 './src/functions-fin.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__( 'Common');
var CalcEngine_1 = __webpack_require__( 'CalcEngine');
var cloneObj = Common_1.Common._Types._cloneObject;
var isFiniteFunc = isFinite, parseIntFunc = parseInt;
var Types = Common_1.Common._Types, inArray = Types._inArray, isArray = Types._isArray, isNullOrUndefined = Types._isNullOrUndefined, arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength;
var CalcConvert_toInt = CalcEngine_1.Convert._toInt, CalcConvert_isError = CalcEngine_1.Convert._isError, CalcConvert_toResult = CalcEngine_1.Convert._toResult, CalcConvert_toArray = CalcEngine_1.Convert._toArray, CalcConvert_toDouble = CalcEngine_1.Convert._toDouble, CalcConvertedError = CalcEngine_1.Convert.CalcConvertedError;
var keyword_null = null, keyword_undefined = void 0, Math_pow = Math.pow, Math_abs = Math.abs, Math_ceil = Math.ceil, Math_log = Math.log, Math_sqrt = Math.sqrt, Math_floor = Math.floor, Math_max = Math.max, Math_min = Math.min;
var CalcErrorsDivideByZero = CalcEngine_1.Errors.DivideByZero, CalcErrorsValue = CalcEngine_1.Errors.Value, CalcErrorsNumber = CalcEngine_1.Errors.Number;
var defineBuiltInFunction = CalcEngine_1.Functions._defineBuiltInFunction;
var MathHelper = CalcEngine_1.Functions.MathHelper, MathHelper_round = MathHelper._round;
var MAX_DOUBLE_VALUE = CalcEngine_1.Functions._MAX_DOUBLE_VALUE, annualYearBasis = CalcEngine_1.Functions._annualYearBasis, getDaysInMonth = CalcEngine_1.Functions._getDaysInMonth, compareDateTime = CalcEngine_1.Functions._compareDateTime, daysBetweenBasis = CalcEngine_1.Functions._daysBetweenBasis, yearfrac = CalcEngine_1.Functions._yearfrac;
var _tryToDouble = CalcEngine_1.Convert._tryToDouble;

function getMonthOfDate(date) {
    return date.getMonth();
}
function getDateOfDate(date) {
    return date.getDate();
}
function getFullYearOfDate(date) {
    return date.getFullYear();
}
function convertToOADate(date) {
    return date instanceof Date ? Common_1.Common._DateTimeHelper._toOADate(date) : date;
}
function daysMonthlyBasis(date_i, date_m, basis) {
    var years = getFullYearOfDate(date_m) - getFullYearOfDate(date_i);
    var months = getMonthOfDate(date_m) - getMonthOfDate(date_i) + years * 12;
    var days = getDateOfDate(date_m) - getDateOfDate(date_i);
    var retValue = -1;
    if (basis === 0) {
        retValue = CalcEngine_1.Functions._days360(date_i, date_m);
    }
    else if (inArray(basis, [1, 2, 3]) >= 0) {
        retValue = convertToOADate(date_m) - convertToOADate(date_i);
    }
    else if (basis === 4) {
        retValue = months * 30 + days;
    }
    return retValue;
}
function calculatePmt(rate, nper, pv, fv, type) {
    var ret = Math_pow(1.0 + rate, nper);
    var pvif = isFiniteFunc(ret) ? ret : CalcErrorsNumber;
    if (rate === 0.0) {
        return nper;
    }
    if (!CalcConvert_isError(pvif)) {
        ret = (ret - 1) / rate;
        var fvifa = isFiniteFunc(ret) ? ret : CalcErrorsNumber;
        if (!CalcConvert_isError(fvifa)) {
            ret = (-pv * pvif - fv) / ((1.0 + rate * type) * fvifa);
            return isFiniteFunc(ret) ? ret : CalcErrorsNumber;
        }
    }
    return CalcErrorsNumber;
}
function coupCd(settlement, maturity, freq, next) {
    var maturityYear = getFullYearOfDate(maturity), maturityMonth = getMonthOfDate(maturity), maturityDate = getDateOfDate(maturity);
    var result = new Date(1, 0, 1), ndays = 0;
    var is_eom_special = (maturityDate === getDaysInMonth(maturityYear, maturityMonth));
    var months = 12 / freq;
    var periods = (maturityYear - getFullYearOfDate(settlement));
    result.setFullYear(1);
    if (periods > 0) {
        periods = (periods - 1) * freq;
    }
    do {
        result = new Date(maturityYear, maturityMonth, maturityDate);
        periods++;
        result.setMonth(maturityMonth - periods * months);
        if (is_eom_special) {
            ndays = getDaysInMonth(getFullYearOfDate(result), getMonthOfDate(result));
            result = new Date(getFullYearOfDate(result), getMonthOfDate(result), ndays);
        }
    } while (compareDateTime(settlement, result) < 0);
    if (next) {
        result = new Date(maturityYear, maturityMonth, maturityDate);
        periods--;
        result.setMonth(maturityMonth - periods * months);
        if (is_eom_special) {
            ndays = getDaysInMonth(getFullYearOfDate(result), getMonthOfDate(result));
            result = new Date(getFullYearOfDate(result), getMonthOfDate(result), ndays);
        }
    }
    return result;
}
function coupdaybs(settlement, maturity, freq, basis) {
    return daysBetweenBasis(coupCd(settlement, maturity, freq, false), settlement, basis);
}
function coupdays(settlement, maturity, freq, basis) {
    var retValue;
    if (inArray(basis, [0, 2, 4, 5]) >= 0) {
        retValue = 360 / freq;
    }
    else if (basis === 3) {
        retValue = 365 / freq;
    }
    else {
        retValue = daysBetweenBasis(coupCd(settlement, maturity, freq, false), coupCd(settlement, maturity, freq, true), 1);
    }
    return retValue;
}
function coupdaysnc(settlement, maturity, freq, basis) {
    return daysBetweenBasis(settlement, coupCd(settlement, maturity, freq, true), basis);
}
function coupnum(settlement, maturity, freq) {
    var maturityYear = getFullYearOfDate(maturity), maturityMonth = getMonthOfDate(maturity), maturityDate = getDateOfDate(maturity);
    var coupondate = new Date(maturityYear, maturityMonth, maturityDate);
    var months = maturityMonth - getMonthOfDate(settlement) + 12 * (maturityYear - getFullYearOfDate(settlement));
    coupondate.setMonth(getMonthOfDate(coupondate) - months);
    if (maturityDate === getDaysInMonth(maturityYear, maturityMonth)) {
        while (getDateOfDate(coupondate) !== getDaysInMonth(getFullYearOfDate(coupondate), getMonthOfDate(coupondate))) {
            coupondate.setDate(getDateOfDate(coupondate) + 1.0);
        }
    }
    if (getDateOfDate(settlement) >= getDateOfDate(coupondate)) {
        months--;
    }
    return parseIntFunc((1 + months / (12 / freq)).toString());
}
function updateData(x, y, data) {
    if (y > 0) {
        if (data._havexpos) {
            if (data._havexneg) {
                if (Math_abs(x - data._xneg) < Math_abs(data._xpos - data._xneg)) {
                    data._xpos = x;
                    data._ypos = y;
                }
            }
            else if (y < data._ypos) {
                data._xpos = x;
                data._ypos = y;
            }
        }
        else {
            data._xpos = x;
            data._ypos = y;
            data._havexpos = true;
        }
        return [false, data];
    }
    else if (y < 0) {
        if (data._havexneg) {
            if (data._havexpos) {
                if (Math_abs(x - data._xpos) < Math_abs(data._xpos - data._xneg)) {
                    data._xneg = x;
                    data._yneg = y;
                }
            }
            else if (-y < -data._yneg) {
                data._xneg = x;
                data._yneg = y;
            }
        }
        else {
            data._xneg = x;
            data._yneg = y;
            data._havexneg = true;
        }
        return [false, data];
    }
    else if (isNaN(y)) {
        return [false, data];
    }
    data._root = x;
    return [true, data];
}
function dateRatio(d1, d2, d3, freq, basis) {
    var next_coupon = coupCd(d1, d3, freq, true), prev_coupon = coupCd(d1, d3, freq, false);
    if (compareDateTime(next_coupon, d2) >= 0) {
        return daysBetweenBasis(d1, d2, basis) / coupdays(prev_coupon, next_coupon, freq, basis);
    }
    var res = daysBetweenBasis(d1, next_coupon, basis) / coupdays(prev_coupon, next_coupon, freq, basis);
    for (;;) {
        prev_coupon = new Date(getFullYearOfDate(next_coupon), getMonthOfDate(next_coupon), getDateOfDate(next_coupon));
        next_coupon.setMonth(getMonthOfDate(next_coupon) + 12 / freq);
        if (compareDateTime(next_coupon, d2) >= 0) {
            res += daysBetweenBasis(prev_coupon, d2, basis) / coupdays(prev_coupon, next_coupon, freq, basis);
            return res;
        }
        res += 1.0;
    }
}
function calcPrice(settlement, maturity, rate, yieldParam, redemption, freq, basis) {
    var a = coupdaybs(settlement, maturity, freq, basis), d = coupdaysnc(settlement, maturity, freq, basis), e = coupdays(settlement, maturity, freq, basis), n = parseIntFunc((coupnum(settlement, maturity, freq)).toString()), sum = 0.0, den = 100.0 * rate / freq, based = 1.0 + yieldParam / freq, exponent = d / e, k;
    for (k = 0; k < n; k++) {
        sum += den / Math_pow(based, exponent + k);
    }
    var first_term = redemption / Math_pow(based, (n - 1.0 + d / e)), last_term = a / e * den;
    return first_term + sum - last_term;
}
function calcOddfprice(settlement, maturity, rate, yieldParam, redemption, freq, basis, issue, first_coupon) {
    var a = daysBetweenBasis(issue, settlement, basis);
    var ds = daysBetweenBasis(settlement, first_coupon, basis);
    var df = daysBetweenBasis(issue, first_coupon, basis);
    var e = coupdays(settlement, maturity, freq, basis);
    var n = parseIntFunc((coupnum(settlement, maturity, freq)).toString());
    var scale = 100.0 * rate / freq;
    var f = 1.0 + yieldParam / freq;
    if (ds > e) {
        switch (basis) {
            case 0:
            case 4:
                var cdays = daysBetweenBasis(first_coupon, maturity, basis);
                n = 1 + parseIntFunc((Math_ceil(cdays / e)).toString());
                break;
            default:
                var d = new Date(getFullYearOfDate(first_coupon), getMonthOfDate(first_coupon), getDateOfDate(first_coupon));
                for (n = 0; n < 32767 ; n++) {
                    var prev_date = new Date(getFullYearOfDate(d), getMonthOfDate(d), getDateOfDate(d));
                    d.setMonth(getMonthOfDate(d) + 12 / freq);
                    if (compareDateTime(d, maturity) >= 0) {
                        n += parseIntFunc((Math_ceil(daysBetweenBasis(prev_date, maturity, basis)) / coupdays(prev_date, d, freq, basis)).toString()) + 1;
                        break;
                    }
                }
                a = e * dateRatio(issue, settlement, first_coupon, freq, basis);
                ds = e * dateRatio(settlement, first_coupon, first_coupon, freq, basis);
                df = e * dateRatio(issue, first_coupon, first_coupon, freq, basis);
                break;
        }
    }
    var term1 = redemption / Math_pow(f, n - 1.0 + ds / e), term2 = (df / e) / Math_pow(f, ds / e), sum = Math_pow(f, -ds / e) * (Math_pow(f, -n) - 1 / f) / (1 / f - 1);
    return term1 + scale * (term2 + sum - a / e);
}
function oneEuro(str, prec) {
    var subStr = str.substr(0, 3);

    var EXCHANGE_RATE_ARRAY = {
        ATS: 13.7603, BEF: 40.3399, DEM: 1.95583, ESP: 166.386, EUR: 1, FIM: 5.94573, FRF: 6.55957, GRD: 340.75,
        IEP: 0.787564, ITL: 1936.27, LUX: 40.3399, LUF: 40.3399, NLG: 2.20371, PTE: 200.482, SIT: 245.18
    };
    return EXCHANGE_RATE_ARRAY[subStr] ? MathHelper_round(EXCHANGE_RATE_ARRAY[subStr], prec) : -1;
}
function getRmz(fZins, fZzr, fBw, fZw, nF) {
    var fRmz, fTerm = Math_pow(1.0 + fZins, fZzr);
    if (fZins === 0.0) {
        fRmz = (fBw + fZw) / fZzr;
    }
    else {
        fRmz = fZw * fZins / (fTerm - 1.0) + fBw * fZins / (1.0 - 1.0 / fTerm);
        if (nF > 0) {
            fRmz /= 1.0 + fZins;
        }
    }
    return -fRmz;
}
function getZw(fZins, fZzr, fRmz, fBw, nF) {
    var fTerm = Math_pow(1.0 + fZins, fZzr), temp = nF > 0 ? 1 + fZins : 1;
    return -(fZins === 0.0 ? (fBw + fRmz * fZzr) : (fBw * fTerm + fRmz * temp * (fTerm - 1.0) / fZins));
}
function getCumprincCumipmt(isCumprinc, fRate, nNumPeriods, fVal, nStart, nEnd, nPayType) {
    if (nEnd < nStart || nEnd > nNumPeriods || (nPayType !== 0 && nPayType !== 1)) {
        return CalcErrorsNumber;
    }
    var fRmz = getRmz(fRate, nNumPeriods, fVal, 0.0, nPayType), resultValue = 0.0, i, temp;
    if (nStart === 1) {
        if (isCumprinc) {
            resultValue = fRmz;
        }
        if (nPayType <= 0) {
            resultValue += isCumprinc ? fVal * fRate : -fVal;
        }
        nStart++;
    }
    for (i = nStart; i <= nEnd; i++) {
        temp = nPayType > 0 ? (getZw(fRate, i - 2, fRmz, fVal, 1) - fRmz) : getZw(fRate, i - 1, fRmz, fVal, 0);
        resultValue += isCumprinc ? fRmz - temp * fRate : temp;
    }
    return isCumprinc ? resultValue : resultValue * fRate;
}
function calculateInterestPart(pv, pmt, rate, per) {
    var x = Math_pow(1.0 + rate, per);
    var ret = -(pv * x * rate + pmt * (x - 1));
    return isFiniteFunc(ret) ? ret : CalcErrorsNumber;
}
function fi_coupFunc(func, settlement, maturity, frequency, basis) {
    if (inArray(frequency, [1, 2, 4]) < 0 || compareDateTime(settlement, maturity) >= 0) {
        return CalcErrorsNumber;
    }
    return func(settlement, maturity, frequency, basis);
}
function fi_getDurationResult(isMduration, settlement, maturity, coup, yld, frequency) {
    function duration(fCoup, fYield, nFreq, fNumOfCoups) {
        var fDur = 0, t, p = 0, f100 = 100;
        fCoup *= f100 / CalcConvert_toDouble(nFreq);
        fYield /= nFreq;
        fYield++;
        for (t = 1; t < fNumOfCoups; t++) {
            fDur += t * fCoup / Math_pow(fYield, t);
        }
        fDur += fNumOfCoups * (fCoup + f100) / Math_pow(fYield, fNumOfCoups);
        for (t = 1; t < fNumOfCoups; t++) {
            p += fCoup / Math_pow(fYield, t);
        }
        p += (fCoup + f100) / Math_pow(fYield, fNumOfCoups);
        fDur /= p;
        fDur /= CalcConvert_toDouble(nFreq);
        return fDur;
    }
    if (inArray(frequency, [1, 2, 4]) < 0 || compareDateTime(settlement, maturity) > 0) {
        return CalcErrorsNumber;
    }
    var fRet = duration(coup, yld, frequency, coupnum(settlement, maturity, frequency));
    return isMduration ? fRet / (1.0 + yld / frequency) : fRet;
}
function calcOddlyield(isPrice, settlement, maturity, last_interest, rate, redemption, freq, basis, priceOrYield) {
    if (inArray(freq, [1, 2, 4]) < 0 || compareDateTime(settlement, maturity) > 0 || compareDateTime(last_interest, settlement) > 0) {
        return CalcErrorsNumber;
    }
    var d = new Date(getFullYearOfDate(last_interest), getMonthOfDate(last_interest), getDateOfDate(last_interest));
    do {
        d.setMonth(getMonthOfDate(d) + 12 / freq);
    } while (compareDateTime(d, maturity) < 0);
    var x1 = dateRatio(last_interest, settlement, d, freq, basis), x2 = dateRatio(last_interest, maturity, d, freq, basis), x3 = dateRatio(settlement, maturity, d, freq, basis);
    return isPrice ? (redemption * freq + 100 * rate * (x2 - x1 * (1 + priceOrYield * x3 / freq))) / (priceOrYield * x3 + freq)
        : (freq * (redemption - priceOrYield) + 100 * rate * (x2 - x1)) / (x3 * priceOrYield + 100 * rate * x1 * x3 / freq);
}
function fi_dollarde_dollarfr(isDollardeFormula, dollarNumber, fraction) {
    if (fraction === 0.0) {
        return CalcErrorsDivideByZero;
    }
    var integerPart = (dollarNumber < 0.0) ? Math_ceil(dollarNumber) : Math_floor(dollarNumber);
    var power10 = Math_pow(10.0, Math_ceil(MathHelper._log(fraction, 10)));
    var decimalPart = dollarNumber - integerPart;
    var temp = isDollardeFormula ? decimalPart * power10 / fraction : decimalPart * fraction / power10;
    return CalcConvert_toResult(integerPart + temp);
}
function _irr_npv(rate, values, isDF, isIRR) {
    var n = arrayHelper_getLength(values);
    var sum = 0.0, i, x = 1 + rate;
    var offset = 0;
    if (x >= 0.75 && x <= 1.25 && n > 12 && isIRR) {
        offset = 2.5;
    }
    if (isDF) {
        for (i = 0; i < n; i++) {
            var value = -(i - offset) * values[i] * Math.pow(x, -(i - offset) - 1);
            if (isNaN(value)) {
                return sum;
            }
            sum += value;
        }
    }
    else {
        for (i = 0; i < n; i++) {
            var value = values[i] * Math.pow(x, -(i - offset));
            if (isNaN(value)) {
                return sum;
            }
            sum += value;
        }
    }
    return sum;
}
function _xirr_f(rate, values, y, dates) {
    var sum = 0.0;
    var n = arrayHelper_getLength(values);

    if (rate <= -1) {
        rate = -1 + 1e-10;
    }
    for (var i = 0; i < n; i++) {
        var d = convertToOADate(dates[i]) - convertToOADate(dates[0]);
        if (d < 0.0) {
            return [false, y];
        }
        sum += values[i] / MathHelper._pow1p(rate, d / 365.0);
    }
    if (!isFiniteFunc(sum)) {
        if (sum === Number.POSITIVE_INFINITY) {
            y = MAX_DOUBLE_VALUE;
        }
        else if (sum === Number.NEGATIVE_INFINITY) {
            y = -MAX_DOUBLE_VALUE;
        }
    }
    else if (isNaN(sum)) {
        y = 4.94066e-324;
    }
    else {
        y = sum;
    }
    return [true, y];
}
function _rate_f(rate, y, user_data, isDF) {
    if (rate > -1.0 && rate !== 0) {
        var data = user_data;
        var x = Math_pow(1.0 + rate, data._nper - (isDF ? 1 : 0));
        var z = (Math_pow(1.0 + rate, data._nper) - 1.0) / rate;
        y = isDF ? (-data._pmt * z / rate + x * data._nper * (data._pv + data._pmt * (data._type + 1.0 / rate)))
            : (data._pv * x + data._pmt * (1.0 + rate * data._type) * z + data._fv);
        return [true, y, user_data];
    }
    return [false, y, user_data];
}
function _fake_df(fakeDfFlag, func, x, dfx, xstep, data, settleOrValues, maturityOrDates, rate, price, redemption, freq, basis, issue, first_coupon) {
    var yl = 0.0, yr = 0.0;
    var xl = x - xstep, xr = x + xstep;
    var isRateFlag = fakeDfFlag === 2, result1, result2, status, user_data;
    if (xl < data._xmin) {
        xl = x;
    }
    if (xr > data._xmax) {
        xr = x;
    }
    if (xl === xr) {
        return isRateFlag ? [false, dfx, data, settleOrValues] : [false, dfx, data];
    }
    if (fakeDfFlag === 0 ) {
        result1 = func(settleOrValues, maturityOrDates, rate, xl, redemption, freq, basis, issue, first_coupon) - price;
        result2 = func(settleOrValues, maturityOrDates, rate, xr, redemption, freq, basis, issue, first_coupon) - price;
    }
    else if (fakeDfFlag === 1 ) {
        result1 = func(xl, settleOrValues, yl, maturityOrDates);
        result2 = func(xr, settleOrValues, yr, maturityOrDates);
    }
    else {
        result1 = _rate_f(xl, yl, settleOrValues);
        result2 = _rate_f(xr, yr, settleOrValues);
    }
    if (isArray(result1)) {
        user_data = result1[2];
        yl = result1[1];
        status = result1[0];
        if (!status) {
            return isRateFlag ? [status, dfx, data, user_data] : [status, dfx, data];
        }
    }
    else {
        yl = result1;
    }
    if (isArray(result2)) {
        user_data = result2[2];
        yr = result2[1];
        status = result2[0];
        if (!status) {
            return isRateFlag ? [status, dfx, data, user_data] : [status, dfx, data];
        }
    }
    else {
        yr = result2;
    }
    dfx = (yr - yl) / (xr - xl);
    return isRateFlag ? [true, dfx, data, user_data] : [true, dfx, data];
}
function _goal_seek_point(isIrr, calcFunc, data, x0, settleOrValues, maturity, rate, price, redem, freq, basis, issue, first_coupon) {
    if (x0 < data._xmin || x0 > data._xmax) {
        return [false, data];
    }
    var y0 = isIrr ? _irr_npv(x0, settleOrValues)
        : calcFunc(settleOrValues, maturity, rate, x0, redem, freq, basis, issue, first_coupon) - price;
    var resultArray = updateData(x0, y0, data);
    data = resultArray[1];
    return [!!resultArray[0], data];
}
function _xirr_goal_seek_point(data, x0, y, values, dates) {
    if ( x0 > data._xmax) {
        return [false, data, y];
    }
    var resultArray = _xirr_f(x0, values, y, dates);
    y = resultArray[1];
    if (!resultArray[0]) {
        return [resultArray[0], data, y];
    }
    resultArray = updateData(x0, y, data);
    data = resultArray[1];
    return [!!resultArray[0], data, y];
}
function _rate_goal_seek_point(data, x0, user_data) {
    var y0 = 0.0;
    if (x0 < data._xmin || x0 > data._xmax) {
        return [false, data, user_data];
    }
    var resultArray = _rate_f(x0, y0, user_data);
    user_data = resultArray[2];
    y0 = resultArray[1];
    if (!resultArray[0]) {
        return [resultArray[0], data, user_data];
    }
    var resultArray2 = updateData(x0, y0, data);
    data = resultArray2[1];
    return [!!resultArray2[0], data, user_data];
}
function _goal_seek_bisection(isRate, isIrr, data, settleOrValues, maturityOrDates, rate, price, redem, freq, basis) {
    var iterations, newton_submethod = 0, num = isRate ? 15 : 2;
    if (!data._havexpos || !data._havexneg) {
        return isRate ? [false, data, settleOrValues] : [false, data];
    }
    var stepsize = Math_abs(data._xpos - data._xneg) / (Math_abs(data._xpos) + Math_abs(data._xneg));
    for (iterations = 0; iterations < 100 + num * 4; iterations++) {
        var xmid = 0, ymid = 0, method = void 0;
        if (iterations % 4 === 0) {
            method = 1;
        }
        else {
            method = iterations % 4 === 2 ? 2 : 3;
        }
        var resultOfGoto = void 0;
        if (isRate) {
            resultOfGoto = _rate_replaceGoto(data, settleOrValues, stepsize, newton_submethod, ymid, method);
        }
        else if (isIrr) {
            resultOfGoto = _replaceGoto(true, data, newton_submethod, xmid, ymid, method, _xirr_f, stepsize, maturityOrDates, settleOrValues, _fake_df);
        }
        else {
            resultOfGoto = _replaceGoto(false, data, newton_submethod, xmid, ymid, method, calcPrice, stepsize, rate, price, redem, settleOrValues, maturityOrDates, freq, basis);
        }
        data = resultOfGoto[1];
        if (isRate) {
            settleOrValues = resultOfGoto[2];
        }
        newton_submethod = isRate ? resultOfGoto[3] : resultOfGoto[2];
        if (!resultOfGoto[0]) {
            continue;
        }
        return isRate ? [true, data, settleOrValues] : [true, data];
    }
    return isRate ? [false, data, settleOrValues] : [false, data];
}
function _odd_goal_seek_bisection(isIrr, data, settleOrValues, maturity, issue, first_coupon, rate, price, redem, freq, basis) {
    var iterations;
    var stepsize;
    var newton_submethod = 0;
    var num = isIrr ? 15 : 2;
    if (!data._havexpos || !data._havexneg) {
        return [false, data];
    }
    stepsize = Math_abs(data._xpos - data._xneg) / (Math_abs(data._xpos) + Math_abs(data._xneg));
    for (iterations = 0; iterations < 100 + num * 4; iterations++) {
        var xmid = 0.0, ymid = 0.0, method = void 0;
        if (iterations % 4 === 0) {
            method = 1;
        }
        else {
            method = iterations % 4 === 2 ? 2 : 3;
        }
        var resultOfGoto = isIrr ? _replaceGoto(true, data, newton_submethod, xmid, ymid, method, _irr_npv, stepsize, keyword_undefined, settleOrValues, _fake_df)
            : _replaceGoto(false, data, newton_submethod, xmid, ymid, method, calcOddfprice, stepsize, rate, price, redem, settleOrValues, maturity, freq, basis, issue, first_coupon);
        data = resultOfGoto[1];
        newton_submethod = resultOfGoto[2];
        xmid = resultOfGoto[3];
        if (isIrr && resultOfGoto[0] === keyword_null || !isIrr && isNullOrUndefined(resultOfGoto[0])) {
            continue;
        }
        else if (resultOfGoto[0]) {
            return [true, data];
        }
        ymid = isIrr ? _irr_npv(xmid, settleOrValues) : calcOddfprice(settleOrValues, maturity, rate, xmid, redem, freq, basis, issue, first_coupon) - price;
        var resultArray5 = updateData(xmid, ymid, data);
        data = resultArray5[1];
        if (resultArray5[0]) {
            return [true, data];
        }
        stepsize = Math_abs(data._xpos - data._xneg) / (Math_abs(data._xpos) + Math_abs(data._xneg));
        if (stepsize < data._precision) {
            if (data._yneg < ymid) {
                ymid = data._yneg;
                xmid = data._xneg;
            }
            if (data._ypos < ymid) {
                xmid = data._xpos;
            }
            data._root = xmid;
            return [true, data];
        }
    }
    return [false, data];
}
function _goal_seek_newton(isXirr, calcFunc, data, x0, settleOrValues, maturityOrDates, rate, price, redem, freq, basis, issue, first_coupon) {
    var _a;
    var iterations, status, precision = data._precision / 2.0, y0;
    var adjustedGuessValue = false;
    for (iterations = 0; iterations < 20; iterations++) {
        if (x0 < data._xmin || x0 > data._xmax) {
            if (isXirr && !(data._havexneg && data._havexpos) && x0 <= -1) {
                x0 = -1;
                adjustedGuessValue = true;
            }
            else {
                return [false, data];
            }
        }
        var result = isXirr ? _xirr_f(x0, settleOrValues, 0, maturityOrDates)
            : calcFunc(settleOrValues, maturityOrDates, rate, x0, redem, freq, basis, issue, first_coupon) - price;
        if (isArray(result)) {
            y0 = result[1];
            status = result[0];
            if (!status) {
                return [status, data];
            }
        }
        else {
            y0 = result;
        }
        var resultArray = updateData(x0, y0, data);
        data = resultArray[1];
        if (resultArray[0]) {
            return [true, data];
        }
        if (adjustedGuessValue) {
            return [false, data];
        }
        var temp = data._havexneg && data._havexpos ? Math_abs(data._xpos - data._xneg) : (data._xmax - data._xmin), xstep = (Math_abs(x0) < 1.0e-10 ? temp : Math_abs(x0)) / 1.0e6, df0 = 0.0;
        resultArray = isXirr ? _fake_df(1, _xirr_f, x0, df0, xstep, data, settleOrValues, maturityOrDates)
            : _fake_df(0, calcFunc, x0, df0, xstep, data, settleOrValues, maturityOrDates, rate, price, redem, freq, basis, issue, first_coupon);
        data = resultArray[2];
        df0 = resultArray[1] < 0 ? resultArray[1] : -resultArray[1];
        status = resultArray[0];
        if (!status) {
            return [status, data];
        }
        if (df0 === 0) {
            return [false, data];
        }
        var x1 = x0 - 1.000001 * y0 / df0;
        if (x1 === x0) {
            data._root = x0;
            return [true, data];
        }

        if (isXirr && data._havexneg && data._havexpos) {
            var _b = [data._xpos, data._xneg], xValue1 = _b[0], xValue2 = _b[1];
            if (x1 < xValue1 === x1 < xValue2) {
                var referPositive = true;
                if (xValue1 > xValue2) {
                    _a = [xValue2, xValue1], xValue1 = _a[0], xValue2 = _a[1];
                    referPositive = false;
                }
                var _c = [data._ypos, data._yneg], y1 = _c[0], y2 = _c[1];

                x1 = xValue1 + Math_abs((referPositive ? y1 : y2) / (y2 - y1)) * (xValue2 - xValue1);
            }
        }

        var stepsize = Math_abs(x1 - x0) / (Math_abs(x0) + Math_abs(x1));
        x0 = x1;
        if (stepsize < precision) {
            data._root = x0;
            return [true, data];
        }
    }
    return [false, data];
}
function _irr_goal_seek_newton(data, values, x0) {
    var precision = data._precision / 2.0;

    var index = 0;
    while (values[index] === 0) {
        index++;
    }
    var vals = values.slice(index);
    var guess, result = [false, null];
    var guessList = [x0];


    if (x0 !== 0.1) {
        guessList.push(0.1);
    }
    guessList.push(-0.1, data._xmax * 0.99, data._xmin + 0.01);
    for (var i = 0; !result[0] && i < guessList.length; i++) {
        result = _irr_goal_seek_newton_imp(cloneObj(data), vals, guessList[i], precision);
        checkIRRResult(result, vals);
    }

    if (!result[0]) {
        var sum = 0;
        for (var i = 1, n = vals.length; i < n; i++) {
            sum += vals[i];
        }
        guess = -sum / vals[0] - 1;


        result = _irr_goal_seek_newton_imp(cloneObj(data), vals, guess, precision);
    }
    return result;
}
function checkIRRResult(result, values) {
    if (result[0]) {
        var root = result[1]._root;

        var CALC_PRECISION = 15;
        if (typeof root === 'number' && root > -10 && root < 10) {
            var valStr = root.toString();
            if (valStr.indexOf('000000000000') > 1 || valStr.indexOf('999999999999') > 1) {
                CALC_PRECISION = 14;
            }
        }

        root = Common_1.Common._NumberHelper._fixNumber(root, CALC_PRECISION);
        var n = fi_npv(root, values);
        if (n > 0.001 || n < -0.001) {
            result[0] = false;
        }
    }
}
function _irr_goal_seek_newton_imp(data, vals, x0, precision) {
    for (var iterations = 0; iterations < 32; iterations++) {
        if (x0 < data._xmin || x0 > data._xmax) {
            return [false, data];
        }
        var y0 = _irr_npv(x0, vals, false, true);
        var resultArray = updateData(x0, y0, data);
        data = resultArray[1];
        if (resultArray[0]) {
            return [true, data];
        }
        var df0 = _irr_npv(x0, vals, true, true);
        if (df0 === 0) {
            return [false, data];
        }
        var x1 = x0 - 1.0000001 * y0 / df0;
        if (x1 === x0) {
            data._root = x0;
            return [true, data];
        }
        var stepsize = Math_abs(x1 - x0) / (Math_abs(x0) + Math_abs(x1));
        x0 = x1;
        if (stepsize < precision) {
            data._root = x0;
            return [true, data];
        }
    }
    return [false, data];
}
function _rate_goal_seek_newton(data, user_data, x0) {
    var iterations;
    var precision = data._precision / 2.0;
    for (iterations = 0; iterations < 100; iterations++) {
        var x1 = void 0, stepsize = void 0;
        var status_1 = void 0;
        var y0 = 0.0;
        var df0 = 0.0;
        if (x0 < data._xmin || x0 > data._xmax) {
            return [false, data, user_data];
        }
        var resultArray = _rate_f(x0, y0, user_data);
        user_data = resultArray[2];
        y0 = resultArray[1];
        status_1 = resultArray[0];
        if (!status_1) {
            return [status_1, data, user_data];
        }
        var resultArray2 = updateData(x0, y0, data);
        data = resultArray2[1];
        if (resultArray2[0]) {
            return [true, data, user_data];
        }
        resultArray = _rate_f(x0, df0, user_data, true);
        user_data = resultArray[2];
        df0 = resultArray[1];
        status_1 = resultArray[0];
        if (!status_1) {
            return [status_1, data, user_data];
        }
        if (df0 === 0) {
            return [false, data, user_data];
        }
        x1 = x0 - 1.000001 * y0 / df0;
        if (x1 === x0) {
            data._root = x0;
            return [true, data, user_data];
        }
        stepsize = Math_abs(x1 - x0) / (Math_abs(x0) + Math_abs(x1));
        x0 = x1;
        if (stepsize < precision) {
            data._root = x0;
            return [true, data, user_data];
        }
    }
    return [false, data, user_data];
}
function _rate_replaceGoto(data, user_data, stepsize, newton_submethod, ymid, method) {
    var xmid, status;
    if (method === 1) {
        var det = void 0;
        xmid = (data._xpos + data._xneg) / 2.0;
        var resultArray = _rate_f(xmid, ymid, user_data);
        user_data = resultArray[2];
        ymid = resultArray[1];
        status = resultArray[0];
        if (!status) {
            return [keyword_null, data, user_data, newton_submethod];
        }
        if (ymid === 0) {
            data = updateData(xmid, ymid, data)[1];
            return [true, data, user_data, newton_submethod];
        }
        det = Math_sqrt(ymid * ymid - data._ypos * data._yneg);
        if (det === 0) {
            return [keyword_null, data, user_data, newton_submethod];
        }
    }
    else if (method === 2) {
        var x0 = void 0, xstep = void 0;
        var y0 = 0.0, df0 = 0.0;
        if (stepsize > 0.1) {
            method = 3;
            return _rate_replaceGoto(data, user_data, stepsize, newton_submethod, ymid, method);
        }
        var temp = newton_submethod++ % 4;
        if (temp === 0) {
            x0 = data._xpos;
            y0 = data._ypos;
        }
        else if (temp === 2) {
            x0 = data._xneg;
            y0 = data._yneg;
        }
        else {
            x0 = (data._xpos + data._xneg) / 2.0;
            var resultArray = _rate_f(x0, y0, user_data);
            user_data = resultArray[2];
            y0 = resultArray[1];
            status = resultArray[0];
            if (!status) {
                return [keyword_null, data, user_data, newton_submethod];
            }
        }
        xstep = Math_abs(data._xpos - data._xneg) / 1.0e6;
        var resultArray4 = _fake_df(2, undefined, x0, df0, xstep, data, user_data);
        user_data = resultArray4[3];
        data = resultArray4[2];
        df0 = resultArray4[1];
        status = resultArray4[0];
        if (!status || df0 === 0) {
            return [keyword_null, data, user_data, newton_submethod];
        }
        xmid = x0 - 1.01 * y0 / df0;
        if ((xmid < data._xpos && xmid < data._xneg) || (xmid > data._xpos && xmid > data._xneg)) {
            return [keyword_null, data, user_data, newton_submethod];
        }
    }
    return [false, data, user_data, newton_submethod];
}
function _replaceGoto(isIrr, data, newton_submethod, xmid, ymid, method, calcOrIrrFunc, stepsize, rateOrDates,

priceOrValues, redemOrIrrFakeDfFunc, settle, maturity, freq, basis, issue, first_coupon) {
    var result;
    switch (method) {
        case 0:
            xmid = data._xpos - data._ypos * ((data._xneg - data._xpos) / (data._yneg - data._ypos));
            break;
        case 1:
            xmid = (data._xpos + data._xneg) / 2.0;
            result = isIrr ? calcOrIrrFunc(xmid, priceOrValues, ymid, rateOrDates)
                : calcOrIrrFunc(settle, maturity, rateOrDates, xmid, redemOrIrrFakeDfFunc, freq, basis, issue, first_coupon) - priceOrValues;
            if (isArray(result)) {
                ymid = result[1];
                if (!result[0]) {
                    return [keyword_null, data, newton_submethod, xmid, ymid, method];
                }
            }
            else {
                ymid = result;
            }
            if (ymid === 0.0) {
                data = updateData(xmid, ymid, data)[1];
                return [true, data, newton_submethod, xmid, ymid, method];
            }
            var det = Math_sqrt(ymid * ymid - data._ypos * data._yneg);
            if (det === 0) {
                return [keyword_null, data, newton_submethod, xmid, ymid, method];
            }
            xmid += (xmid - data._xpos) * ymid / det;
            break;
        case 3:
            xmid = (data._xpos + data._xneg) / 2.0;
            break;
        case 2:
            var x0 = void 0, y0 = 0.0, xstep = void 0, df0 = 0.0;

            if (stepsize > 0.1) {
                method = 3;
                return _replaceGoto(isIrr, data, newton_submethod, xmid, ymid, method, calcOrIrrFunc, stepsize, rateOrDates, priceOrValues, redemOrIrrFakeDfFunc, settle, maturity, freq, basis);
            }
            var temp = newton_submethod++ % 4;
            if (temp === 0) {
                x0 = data._xpos;
                y0 = data._ypos;
            }
            else if (temp === 2) {
                x0 = data._xneg;
                y0 = data._yneg;
            }
            else {
                x0 = (data._xpos + data._xneg) / 2.0;
                result = isIrr ? calcOrIrrFunc(x0, priceOrValues, y0, rateOrDates)
                    : calcOrIrrFunc(settle, maturity, rateOrDates, x0, redemOrIrrFakeDfFunc, freq, basis, issue, first_coupon) - priceOrValues;
                if (isArray(result)) {
                    y0 = result[1];
                    if (!result[0]) {
                        return [keyword_null, data, newton_submethod, xmid, ymid, method];
                    }
                }
                else {
                    y0 = result;
                }
            }
            xstep = Math_abs(data._xpos - data._xneg) / 1e6;
            var resultArray = isIrr ? redemOrIrrFakeDfFunc(1, calcOrIrrFunc, x0, df0, xstep, data, priceOrValues, rateOrDates)
                : _fake_df(0, calcOrIrrFunc, x0, df0, xstep, data, settle, maturity, rateOrDates, priceOrValues, redemOrIrrFakeDfFunc, freq, basis, issue, first_coupon);
            data = resultArray[2];
            df0 = resultArray[1];
            if (!resultArray[0] || df0 === 0) {
                return [keyword_null, data, newton_submethod, xmid, ymid, method];
            }


            xmid = x0 - 1.01 * y0 / df0;
            if ((xmid < data._xpos && xmid < data._xneg) || (xmid > data._xpos && xmid > data._xneg)) {
                return [keyword_null, data, newton_submethod, xmid, ymid, method];
            }
            break;
    }
    result = isIrr ? calcOrIrrFunc(xmid, priceOrValues, ymid, rateOrDates)
        : calcOrIrrFunc(settle, maturity, rateOrDates, xmid, redemOrIrrFakeDfFunc, freq, basis, issue, first_coupon) - priceOrValues;
    if (isArray(result)) {
        ymid = result[1];
        if (!result[0]) {
            return [keyword_null, data, newton_submethod, xmid, ymid, method];
        }
    }
    var updateResult = updateData(xmid, ymid, data);
    if (updateResult[0]) {
        return [true, data, newton_submethod, xmid, ymid, method];
    }
    stepsize = Math_abs(data._xpos - data._xneg)
        / (Math_abs(data._xpos) + Math_abs(data._xneg));
    if (stepsize < data._precision) {
        if (data._yneg < ymid) {
            ymid = data._yneg;
            xmid = data._xneg;
        }
        if (data._ypos < ymid) {
            ymid = data._ypos;
            xmid = data._xpos;
        }
        data._root = xmid;
        return [true, data, newton_submethod, xmid, ymid, method];
    }
    return [false, data, newton_submethod, xmid, ymid, method];
}
function fi_fv(rate, nper, pmt, pv, type) {
    type = type ? 1 : 0;
    var temp = Math_pow(1.0 + rate, nper);
    temp = rate === 0 ? (pmt * nper + pv) : (pv * temp + pmt * (1.0 + rate * type) * (temp - 1.0) / rate);
    return CalcConvert_toResult(-temp);
}
function fi_fvschedule(fv, schedule) {
    for (var i = 0; i < arrayHelper_getLength(schedule); i++) {
        if (schedule[i] !== CalcConvertedError) {
            fv *= 1.0 + schedule[i];
        }
    }
    return fv;
}
function fi_npv(rate, vals) {
    var args = arguments;
    var npvResult = 0.0, i = 1, j, k;
    for (k = 1; k < arrayHelper_getLength(args); k++) {
        var valueArray = CalcConvert_toArray(args[k], 1 , true, true, false, true);
        if (valueArray.isError) {
            return valueArray[0];
        }
        for (j = 0; j < arrayHelper_getLength(valueArray); j++) {
            if (valueArray[j] !== CalcConvertedError) {
                npvResult += valueArray[j] / Math_pow(1.0 + rate, i++);
            }
        }
    }
    return npvResult;
}
function fi_pv(rate, nper, pmt, fv, type) {
    type = type ? 1 : 0;
    if (rate === 0.0) {
        return CalcConvert_toResult(-(pmt * nper + fv));
    }
    var temp = Math_pow(1.0 + rate, nper);
    return rate === -1.0 ? CalcErrorsDivideByZero : CalcConvert_toResult(-(fv + pmt * (1.0 + rate * type) * (temp - 1.0) / rate) / temp);
}
function fi_received(settlement, maturity, investment, discount, basis) {
    if (compareDateTime(settlement, maturity) >= 0) {
        return CalcErrorsNumber;
    }
    var a = daysMonthlyBasis(settlement, maturity, basis), d = annualYearBasis(settlement, basis);
    if (a <= 0 || d <= 0) {
        return CalcErrorsNumber;
    }
    var n = 1.0 - discount * a / d;
    return (n <= 0) ? CalcErrorsNumber : investment / n;
}
function fi_xnpv(rate, values, dates) {
    var len1 = arrayHelper_getLength(values), len2 = arrayHelper_getLength(dates), sum = 0, i;
    if (len1 !== len2) {
        return CalcErrorsNumber;
    }
    if (values.some(function (v) { return v === CalcConvertedError; })) {
        return CalcErrorsValue;
    }
    for (i = 0; i < len1; i++) {
        sum += values[i] / Math_pow(1.0 + rate, (dates[i] - dates[0]) / 365.0);
    }
    return sum;
}
function fi_cumipmt(fRate, nNumPeriods, fVal, nStartPer, nEndPer, nPayType) {
    return getCumprincCumipmt(false, fRate, nNumPeriods, fVal, nStartPer, nEndPer, nPayType);
}
function fi_cumprinc(fRate, nNumPeriods, fVal, nStartPer, nEndPer, nPayType) {
    return getCumprincCumipmt(true, fRate, nNumPeriods, fVal, nStartPer, nEndPer, nPayType);
}
function fi_ipmt(rate, per, nper, pv, fv, type) {
    if (per >= nper + 1.0 || (type !== 0 && type !== 1)) {
        return CalcErrorsNumber;
    }
    var pmt = calculatePmt(rate, nper, pv, fv, type);
    return calculateInterestPart(pv, pmt, rate, per - 1.0);
}
function fi_ispmt(rate, per, nper, pv) {
    return CalcConvert_toResult(pv * rate * (per / nper - 1.0));
}
function fi_pmt(rate, nper, pv, fv, type) {
    type = type ? 1 : 0;
    var temp = Math_pow(1.0 + rate, nper);
    temp = rate === 0 ? (pv + fv) / nper : (pv * temp + fv) / ((1.0 + rate * type) * (temp - 1.0) / rate);
    return CalcConvert_toResult(-temp);
}
function fi_ppmt(rate, per, nper, pv, fv, type) {
    type = type ? 1 : 0;
    if (per >= nper + 1.0) {
        return CalcErrorsNumber;
    }
    var pmt = calculatePmt(rate, nper, pv, fv, type);
    if (!CalcConvert_isError(pmt)) {
        var t = calculateInterestPart(pv, pmt, rate, per - 1.0);
        if (!CalcConvert_isError(t)) {
            return pmt - t;
        }
    }
    return CalcErrorsNumber;
}
function fi_coupdaybsFunc(settlement, maturity, frequency, basis) {
    return fi_coupFunc(coupdaybs, settlement, maturity, frequency, basis);
}
function fi_coupdaysFunc(settlement, maturity, frequency, basis) {
    return fi_coupFunc(coupdays, settlement, maturity, frequency, basis);
}
function fi_coupdaysncFunc(settlement, maturity, frequency, basis) {
    return fi_coupFunc(coupdaysnc, settlement, maturity, frequency, basis);
}
function coupncd(settlement, maturity, freq) {
    return convertToOADate(coupCd(settlement, maturity, freq, true));
}
function fi_coupncdFunc(settlement, maturity, frequency) {
    return fi_coupFunc(coupncd, settlement, maturity, frequency);
}
function fi_coupnumFunc(settlement, maturity, frequency) {
    return fi_coupFunc(coupnum, settlement, maturity, frequency);
}
function couppcd(settlement, maturity, freq) {
    return convertToOADate(coupCd(settlement, maturity, freq, false));
}
function fi_couppcdFunc(settlement, maturity, frequency) {
    return fi_coupFunc(couppcd, settlement, maturity, frequency);
}
function fi_durationFunc(settlement, maturity, coup, yld, frequency) {
    return fi_getDurationResult(false, settlement, maturity, coup, yld, frequency);
}
function fi_mduration(settlement, maturity, coup, yld, frequency) {
    if (yld < 0 || coup < 0) {
        return CalcErrorsNumber;
    }
    return fi_getDurationResult(true, settlement, maturity, coup, yld, frequency);
}
function fi_nper(rate, pmt, pv, fv, type) {
    type = type ? 1 : 0;
    if (rate === 0.0) {
        return pmt === 0.0 ? CalcErrorsDivideByZero : CalcConvert_toResult(-(pv + fv) / pmt);
    }
    return CalcConvert_toResult(Math_log((pmt * (1.0 + rate * type) - fv * rate) / (pv * rate + pmt * (1.0 + rate * type))) / Math_log(1.0 + rate));
}
function fi_yieldFunc(settlement, maturity, rate, par, redemption, freq, basis) {
    if (inArray(freq, [1, 2, 4]) < 0 || compareDateTime(settlement, maturity) > 0) {
        return CalcErrorsNumber;
    }
    var n = coupnum(settlement, maturity, freq);
    if (n <= 1.0) {
        var a = coupdaybs(settlement, maturity, freq, basis);
        var d = coupdaysnc(settlement, maturity, freq, basis);
        var e = coupdays(settlement, maturity, freq, basis);
        var coeff = freq * e / d;
        var num = (redemption / 100.0 + rate / freq) - (par / 100.0 + (a / e * rate / freq));
        var den = par / 100.0 + (a / e * rate / freq);
        return num / den * coeff;
    }
    var status, yield0 = 0.1, data = {
        _xmin: 0, _xmax: 1000, _precision: 1e-10, _havexpos: false, _xpos: 0, _ypos: 0,
        _havexneg: false, _xneg: 0, _yneg: 0, _root: 0
    };

    var resultArray = _goal_seek_newton(false, calcPrice, data, yield0, settlement, maturity, rate, par, redemption, freq, basis);
    data = resultArray[1];
    status = resultArray[0];
    if (!status) {
        for (yield0 = 1e-10; yield0 < data._xmax; yield0 *= 2) {
            data = _goal_seek_point(false, calcPrice, data, yield0, settlement, maturity, rate, par, redemption, freq, basis)[1];
        }

        resultArray = _goal_seek_bisection(false, false, data, settlement, maturity, rate, par, redemption, freq, basis);
        data = resultArray[1];
        status = resultArray[0];
    }
    if (!status) {
        return CalcErrorsNumber;
    }
    return data._root;
}
function fi_yielddisc(settlement, maturity, fPrice, fRedemp, nBase) {
    return compareDateTime(settlement, maturity) >= 0 ? CalcErrorsNumber : (fRedemp / fPrice - 1) / yearfrac(settlement, maturity, nBase);
}
function fi_yieldmat(nSettle, nMat, nIssue, fRate, fPrice, nBase) {
    if (compareDateTime(nSettle, nMat) >= 0) {
        return CalcErrorsNumber;
    }
    var fIssMat = yearfrac(nIssue, nMat, nBase);
    var fIssSet = yearfrac(nIssue, nSettle, nBase);
    var fSetMat = yearfrac(nSettle, nMat, nBase);
    var y = 1.0 + fIssMat * fRate;
    y /= fPrice / 100.0 + fIssSet * fRate;
    y--;
    y /= fSetMat;
    return y;
}
function fi_amordegrc(cost, purchased, firstPer, salvage, per, rate, basis) {
    function getAmordegrc(fCost, nDate, nFirstPer, fRestVal, nPer, fRate, nBase) {
        var n, fAmorCoeff, fNRate, fRest, fUsePer;
        fUsePer = 1.0 / fRate;
        if (fUsePer < 3.0) {
            fAmorCoeff = 1.0;
        }
        else if (fUsePer < 5.0) {
            fAmorCoeff = 1.5;
        }
        else if (fUsePer <= 6.0) {
            fAmorCoeff = 2.0;
        }
        else {
            fAmorCoeff = 2.5;
        }
        fRate *= fAmorCoeff;
        var o = yearfrac(nDate, nFirstPer, nBase);
        if (CalcConvert_isError(o)) {
            return 0.0;
        }
        fNRate = Math_floor(o * fRate * fCost + 0.5);
        fCost -= fNRate;
        fRest = fCost - fRestVal;
        for (n = 0; n < nPer; n++) {
            fNRate = Math_floor((fRate * fCost) + 0.5);
            fRest -= fNRate;
            if (fRest < 0.0) {
                var temp = nPer - n;
                return (temp === 0 || temp === 1) ? Math_floor(fCost * 0.5 + 0.5) : 0;
            }
            fCost -= fNRate;
        }
        return fNRate;
    }
    var errCheck = 1.0 / rate;
    if ((errCheck > 0 && errCheck < 1) || (errCheck > 1 && errCheck < 2) ||
        (errCheck > 2 && errCheck < 3) || (errCheck > 4 && errCheck < 5) ||
        compareDateTime(purchased, firstPer) > 0) {
        return CalcErrorsNumber;
    }
    return getAmordegrc(cost, purchased, firstPer, salvage, per, rate, basis);
}
function fi_amorlinc(cost, purchased, firstPer, salvage, per, rate, basis) {
    function getAmorlinc(fCost, nDate, nFirstPer, fRestVal, nPer, fRate, nBase) {
        var fOneRate = fCost * fRate;
        var fCostDelta = fCost - fRestVal;
        var o = yearfrac(nDate, nFirstPer, nBase);
        if (CalcConvert_isError(o)) {
            return 0.0;
        }
        var f0Rate = o * fRate * fCost;
        var multiplier = (fCost - fRestVal - f0Rate) / fOneRate;
        var nNumOfFullPeriods = CalcConvert_toInt((fCost - fRestVal - f0Rate) / fOneRate);
        var result;
        if (nPer === 0) {
            result = f0Rate;
        }
        else if (nPer <= nNumOfFullPeriods) {
            result = fOneRate * (multiplier < 1.0 ? multiplier : 1.0);
        }
        else if (nPer === nNumOfFullPeriods + 1) {
            result = fCostDelta - fOneRate * nNumOfFullPeriods - f0Rate;
        }
        else {
            result = 0.0;
        }
        return result;
    }
    return compareDateTime(purchased, firstPer) > 0 ? CalcErrorsNumber : getAmorlinc(cost, purchased, firstPer, salvage, per, rate, basis);
}
function fi_oddfyield(settlement, maturity, issue, first_coupon, rate, price, redemption, freq, basis) {
    var yield0 = 0.1;
    if (inArray(freq, [1, 2, 4]) < 0 || compareDateTime(issue, settlement) > 0 ||
        compareDateTime(settlement, first_coupon) > 0 || compareDateTime(first_coupon, maturity) > 0) {
        return CalcErrorsNumber;
    }
    var data = {
        _xmin: 0, _xmax: 1000, _precision: 1e-10, _havexpos: false, _xpos: 0, _ypos: 0,
        _havexneg: false, _xneg: 0, _yneg: 0, _root: 0
    };

    var resultArray = _goal_seek_newton(false, calcOddfprice, data, yield0, settlement, maturity, rate, price, redemption, freq, basis, issue, first_coupon);
    data = resultArray[1];
    var status = resultArray[0];
    if (status) {
        for (yield0 = 1e-10; yield0 < data._xmax; yield0 *= 2) {
            data = _goal_seek_point(false, calcOddfprice, data, yield0, settlement, maturity, rate, price, redemption, freq, basis, issue, first_coupon)[1];
        }

        resultArray = _odd_goal_seek_bisection(false, data, settlement, maturity, issue, first_coupon, rate, price, redemption, freq, basis);
        data = resultArray[1];
        status = resultArray[0];
    }
    return status ? data._root : CalcErrorsNumber;
}
function fi_oddlyield(settlement, maturity, last_interest, rate, price, redemption, freq, basis) {
    return calcOddlyield(false, settlement, maturity, last_interest, rate, redemption, freq, basis, price);
}
function fi_oddlprice(settlement, maturity, last_interest, rate, yieldVar, redemption, freq, basis) {
    return calcOddlyield(true, settlement, maturity, last_interest, rate, redemption, freq, basis, yieldVar);
}
function fi_tbilleq(settlement, maturity, discount) {
    var dsm = convertToOADate(maturity) - convertToOADate(settlement);
    if (compareDateTime(settlement, maturity) >= 0 || dsm > 365.0) {
        return CalcErrorsNumber;
    }
    var p1 = 365.0 * discount;
    var p2 = 360.0 - discount * dsm;
    if (p2 === 0.0) {
        return CalcErrorsDivideByZero;
    }
    else if (p2 < 0.0) {
        return CalcErrorsNumber;
    }
    return CalcConvert_toResult(p1 / p2);
}
function fi_tbillyield(settlement, maturity, pr) {
    var dsm = convertToOADate(maturity) - convertToOADate(settlement);
    if (compareDateTime(settlement, maturity) >= 0 || dsm > 365.0) {
        return CalcErrorsNumber;
    }
    return ((100.0 - pr) / pr) * (360.0 / dsm);
}
function fi_irr(a1, guess) {
    var len = arrayHelper_getLength(a1);
    var vals = [];
    var posVal = false;
    var negVal = false;
    var data = {
        _xmin: -1, _xmax: 9999999, _precision: 1e-10, _havexpos: false, _xpos: 0, _ypos: 0,
        _havexneg: false, _xneg: 0, _yneg: 0, _root: 0
    };
    if (Math_abs(guess) > 1) {
        guess = 0.10;
    }

    var firstNoZero = -1;
    var lastNoZero = 0;
    for (var j = 0; j < len; j++) {
        var obj = a1[j];
        if (obj !== CalcConvertedError) {
            if (obj !== 0) {
                lastNoZero = vals.length + 1;
                if (firstNoZero === -1) {
                    firstNoZero = vals.length;
                }
            }
            vals.push(obj);
            if (obj > 0) {
                posVal = true;
            }
            if (obj < 0) {
                negVal = true;
            }
        }
    }
    vals = vals.slice(firstNoZero, lastNoZero + 1);
    if (!posVal || !negVal || arrayHelper_getLength(vals) < 2) {
        return CalcErrorsNumber;
    }

    var resultArray = _irr_goal_seek_newton(data, vals, guess);
    data = resultArray[1];


    return resultArray[0] ? data._root : CalcErrorsNumber;
}
function fi_mirr(array, frate, rrate) {
    var pos = 0;
    var neg = 0;
    var n = 0;
    var posnpv = 0.0;
    var negnpv = 0.0;
    var vals = [];
    var length = arrayHelper_getLength(array);
    if (length < 2) {
        return CalcErrorsDivideByZero;
    }
    for (var k = 0; k < length; k++) {
        var o = array[k];
        if (o !== CalcConvertedError) {
            vals.push(o);
            n++;
            if (o !== 0) {
                if (o > 0.0) {
                    pos++;
                }
                else {
                    neg++;
                }
            }
        }
    }

    if (neg < 1 || pos < 1) {
        return CalcErrorsDivideByZero;
    }
    for (var i = 0; i < n; i++) {
        var v = vals[i];
        if (v !== 0) {
            if (v > 0.0) {
                posnpv += v / Math_pow(1.0 + rrate, i);
            }
            else {
                negnpv += v / Math_pow(1.0 + frate, i);
            }
        }
    }
    if (negnpv === 0.0 || posnpv === 0.0 || rrate <= -1.0) {
        return CalcErrorsDivideByZero;
    }
    return Math_pow((-posnpv * Math_pow(1.0 + rrate, n)) / (negnpv * (1.0 + rrate)), (1.0 / (n - 1.0))) - 1.0;
}
function _xirr_findBounds(values, dates, guess, maxIterations) {
    var step = 0.5;
    var lower = guess - step;
    var upper = guess + step;
    var i = 0;
    var y = 0;
    while (_xirr_f(lower, values, y, dates)[1] * _xirr_f(upper, values, y, dates)[1] > 0 && i++ < maxIterations) {
        lower -= step;
        upper += step;
    }
    return i >= maxIterations ? [0, 0] : [lower, upper];
}
function _xirr_bisection(values, dates, guess, data) {
    var maxIterations = 100;
    var precision = data._precision;
    var _a = data._havexneg && data._havexpos ? [data._xpos, data._xneg] : _xirr_findBounds(values, dates, guess, maxIterations), x1 = _a[0], x2 = _a[1];
    var f1 = _xirr_f(x1, values, 0, dates)[1];
    var f2 = _xirr_f(x2, values, 0, dates)[1];
    var middle = 0;
    for (var i = 0; i < maxIterations; i++) {
        if (f1 * f2 > 0) {
            break;
        }
        middle = (x1 + x2) / 2;
        var f3 = _xirr_f(middle, values, 0, dates)[1];
        if (f3 * f1 < 0) {
            x2 = middle;
            f2 = f3;
        }
        else {
            x1 = middle;
            f1 = f3;
        }
        if (Math_abs(x1 - x2) < precision) {
            return [true, middle];
        }
    }
    return [false, middle];
}

var XIRR_ERROR_VALUE = 2.98023E-09;
var XIRR_ERROR_VALUE2 = 4.88281E-09;
function fi_xirr(values, dates, guess) {
    var length1 = arrayHelper_getLength(values);
    var length2 = arrayHelper_getLength(dates);
    if (length1 !== length2) {
        return CalcErrorsNumber;
    }
    var containsPositive, containsNegative;
    for (var i = length1 - 1; i >= 0; i--) {
        containsPositive = values[i] > 0 || containsPositive;
        containsNegative = values[i] < 0 || containsNegative;
        if (dates[i] === CalcConvertedError) {
            if (values[i] !== 0) {
                dates[i] = 0;
            }
            else {
                values.splice(i, 1);
                dates.splice(i, 1);
            }
        }
    }
    if (!containsPositive || !containsNegative) {
        return CalcErrorsNumber;
    }


    var firstValue = values[0];
    if (firstValue === 0) {
        return guess === 0 ? XIRR_ERROR_VALUE2 : XIRR_ERROR_VALUE;
    }
    var data = {
        _xmin: -1, _xmax: 1e10, _precision: 1e-10, _havexpos: false, _xpos: 0, _ypos: 0,
        _havexneg: false, _xneg: 0, _yneg: 0, _root: 0
    };
    var resultArray = _goal_seek_newton(true, _fake_df, data, guess, values, dates);
    data = resultArray[1];
    if (resultArray[0]) {
        var rate = data._root;


        return Math.abs(rate) < data._precision ? XIRR_ERROR_VALUE : rate;
    }


    var resultArray2 = _xirr_bisection(values, dates, guess, data);
    if (resultArray2[0]) {
        return resultArray2[1];
    }
    return CalcErrorsNumber;
}
function fi_rate(nper, pmt, pv, fv, type, guess) {
    type = type ? 1 : 0;
    var temp = Math_pow(1.7976931348623158e+298, 1.0 / nper);
    var data = {
        _precision: 1e-10,
        _havexpos: false,
        _xpos: 0,
        _ypos: 0,
        _havexneg: false,
        _xneg: 0,
        _yneg: 0,
        _root: 0,
        _xmin: Math_max(-1e10, -temp + 1.0),
        _xmax: Math_min(1e10, temp - 1.0)
    };
    var udata = { _nper: nper, _pmt: pmt, _pv: pv, _fv: fv, _type: type };
    var resultArray = _rate_goal_seek_newton(data, udata, guess);
    udata = resultArray[2];
    data = resultArray[1];
    var status = resultArray[0], factor;
    if (!status) {
        for (factor = 2; !(data._havexneg && data._havexpos) && factor < 100; factor *= 2) {
            resultArray = _rate_goal_seek_point(data, guess * factor, udata);
            udata = resultArray[2];
            data = resultArray[1];
            resultArray = _rate_goal_seek_point(data, guess / factor, udata);
            udata = resultArray[2];
            data = resultArray[1];
        }
        resultArray = _goal_seek_bisection(true, false, data, udata);
        data = resultArray[1];
        status = resultArray[0];
    }
    return status ? data._root : CalcErrorsNumber;
}
function _ScGetGDA(fWert, fRest, fDauer, fPeriode, fFaktor) {
    var fGda, fAlterWert, fNeuerWert, fZins = fFaktor / fDauer;
    if (fZins >= 1) {
        fZins = 1;
        fAlterWert = fPeriode === 1 ? fWert : 0;
    }
    else {
        fAlterWert = fWert * Math_pow(1 - fZins, fPeriode - 1);
    }
    fNeuerWert = fWert * Math_pow(1 - fZins, fPeriode);
    fGda = fAlterWert - (fNeuerWert < fRest ? fRest : fNeuerWert);
    return fGda < 0 ? 0 : fGda;
}
function _ScInterVDB(cost, salvage, life, life1, period, factor) {
    var fVdb = 0, fLia = 0;
    var fIntEnd = Math_ceil(period), nLoopEnd = fIntEnd;
    var fRestwert = cost - salvage;
    var bNowLia = false;
    var fGda, fTerm, i;
    for (i = 1; i <= nLoopEnd; i++) {
        if (!bNowLia) {
            fGda = _ScGetGDA(cost, salvage, life, i, factor);
            fLia = fRestwert / (life1 - (i - 1));
            if (fLia > fGda) {
                fTerm = fLia;
                bNowLia = true;
            }
            else {
                fTerm = fGda;
                fRestwert -= fGda;
            }
        }
        else {
            fTerm = fLia;
        }
        if (i === nLoopEnd) {
            fTerm *= period + 1.0 - fIntEnd;
        }
        fVdb += fTerm;
    }
    return fVdb;
}
function getVdb(cost, salvage, life, start_period, end_period, factor, flag) {
    var fIntStart = Math_floor(start_period), nLoopStart = fIntStart;
    var fIntEnd = Math_ceil(end_period), nLoopEnd = fIntEnd;
    var fVdb = 0.0, i;
    if (flag) {
        for (i = nLoopStart + 1; i <= nLoopEnd; i++) {
            var fTerm = _ScGetGDA(cost, salvage, life, i, factor);
            if (i === nLoopStart + 1) {
                fTerm *= (Math_min(end_period, fIntStart + 1.0) - start_period);
            }
            else if (i === nLoopEnd) {
                fTerm *= (end_period + 1.0 - fIntEnd);
            }
            fVdb += fTerm;
        }
    }
    else {
        var life1 = life, fPart = void 0;
        if (start_period !== Math_floor(start_period) && factor > 1.0 && start_period >= life / 2.0) {
            fPart = start_period - life / 2.0;
            start_period = life / 2.0;
            end_period -= fPart;
            life1 += 1.0;
        }
        cost -= _ScInterVDB(cost, salvage, life, life1, start_period, factor);
        fVdb = _ScInterVDB(cost, salvage, life, life - start_period, end_period - start_period, factor);
    }
    return fVdb;
}
function fi_vdb(cost, salvage, life, start, end, factor, noswitch) {
    if (end < start) {
        return CalcErrorsNumber;
    }
    if (cost < salvage && start === 0.0 && end === 1.0) {
        return cost - salvage;
    }
    return getVdb(cost, salvage, life, start, end, factor, noswitch);
}

function fi_accrint(maturity, first_interest, settlement, rate, par, freq, basis) {
    if (inArray(freq, [1, 2, 4]) < 0 || compareDateTime(maturity, settlement) >= 0) {
        return CalcErrorsNumber;
    }
    if (freq === 1 || basis === 0 || basis === 4) {
        return fi_accrint1(maturity, first_interest, settlement, rate, par, freq, basis);
    }
    var issue_year = maturity.getFullYear();
    var issue_month = maturity.getMonth();
    var issue_day = maturity.getDate();
    var settlement_year = settlement.getFullYear();
    var settlement_month = settlement.getMonth();
    var settlement_day = settlement.getDate();
    var interest_month = first_interest.getMonth();
    var interest_day = first_interest.getDate();
    var months = [];
    var days = [];
    var interestDays = [];
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var i, next, nextYear;
    for (i = 0; i < freq; i++) {
        months[i] = (interest_month + i * 12 / freq) % 12;
        days[i] = interest_day <= monthDays[months[i]] ? interest_day : monthDays[months[i]];
        if (basis === 2) {
            interestDays[i] = 360 / freq;
        }
        else if (basis === 3) {
            interestDays[i] = 365 / freq;
        }
    }
    for (i = 0; i < freq; i++) {
        next = i === freq - 1 ? 0 : i + 1;
        nextYear = months[next] > months[i] ? 2001 : 2002;
        interestDays[i] = convertToOADate(new Date(nextYear, months[next], days[next])) - convertToOADate(new Date(2001, months[i], days[i]));
    }
    var result = 0, settlementDate = convertToOADate(settlement);
    while (issue_year < settlement_year
        || issue_year === settlement_year && issue_month < settlement_month
        || issue_year === settlement_year && issue_month === settlement_month && issue_day < settlement_day) {
        i = 0;
        while (i < freq
            && (issue_month < months[i] || issue_month === months[i] && issue_day < days[i])
            && (i === 0 || months[i] > months[i - 1])) {
            i++;
        }
        while (i < freq && (issue_month > months[i] || issue_month === months[i] && issue_day >= days[i])) {
            i++;
            if (issue_month === months[i - 1] && issue_day === days[i - 1]) {
                break;
            }
        }
        i--;
        next = i === freq - 1 ? 0 : i + 1;
        nextYear = ((issue_month + 12 / freq) >= 12) ? issue_year + 1 : issue_year;
        var currentDate = convertToOADate(new Date(issue_year, issue_month, issue_day));
        var nextDate = Math.min(convertToOADate(new Date(nextYear, months[next], days[next])), settlementDate);
        result += par * rate / freq * (nextDate - currentDate) / interestDays[i];
        issue_year = nextYear;
        issue_month = months[next];
        issue_day = days[next];
    }
    return result;
}
function fi_accrint1(maturity, first_interest, settlement, rate, par, freq, basis) {
    var a = daysMonthlyBasis(maturity, settlement, basis), d = annualYearBasis(maturity, basis);
    return (a < 0 || d <= 0) ? CalcErrorsNumber : par * rate * (a / d);
}
function fi_accrintm(issue, maturity, rate, par, basis) {
    if (compareDateTime(issue, maturity) > 0) {
        return CalcErrorsNumber;
    }
    var a = daysMonthlyBasis(issue, maturity, basis), d = annualYearBasis(issue, basis);
    return (a < 0 || d <= 0) ? CalcErrorsNumber : par * rate * a / d;
}
function fi_disc(settlement, maturity, par, redemption, basis) {
    if (compareDateTime(settlement, maturity) >= 0) {
        return CalcErrorsNumber;
    }
    var b = annualYearBasis(settlement, basis), dsm = daysMonthlyBasis(settlement, maturity, basis);
    return (dsm <= 0 || b <= 0) ? CalcErrorsNumber : (redemption - par) / redemption * (b / dsm);
}
function fi_effect(rate, nper) {
    return Math_pow((1.0 + rate / nper), nper) - 1.0;
}
function fi_intrate(settlement, maturity, investment, redemption, basis) {
    if (compareDateTime(settlement, maturity) >= 0) {
        return CalcErrorsNumber;
    }
    var a = daysMonthlyBasis(settlement, maturity, basis), d = annualYearBasis(settlement, basis);
    return (a <= 0 || d <= 0) ? CalcErrorsNumber : (redemption - investment) / investment * (d / a);
}
function fi_nominal(rate, nper) {
    return nper * (Math_pow(1.0 + rate, 1.0 / nper) - 1.0);
}
function fi_db(cost, salvage, life, period, month) {
    var lastPeriod = life + (month < 12 ? 1 : 0);
    if (lastPeriod < period) {
        return CalcErrorsNumber;
    }
    if (cost === 0.0) {
        return 0.0;
    }
    var rate = MathHelper_round(1.0 - Math_pow(salvage / cost, 1.0 / life), 3), total = 0.0, result = 0.0;
    for (var i = 1; i <= period; i++) {
        if (i === 1) {
            result = cost * rate * month / 12.0;
        }
        else if (i === life + 1) {
            result = (cost - total) * rate * (12.0 - month) / 12.0;
        }
        else {
            result = (cost - total) * rate;
        }
        total += result;
    }
    return result;
}
function fi_ddb(cost, salvage, life, period, factor) {
    var total = 0.0;
    var result = 0.0;
    if (life < period) {
        return CalcErrorsNumber;
    }
    if (cost <= salvage) {
        return 0.0;
    }
    for (var i = 1; i <= period; i++) {
        result = (cost - total) * (factor / life);
        result = Math_min(result, cost - total - salvage);
        total += result;
    }
    return result;
}
function fi_sln(cost, salvage, life) {
    return (cost - salvage) / life;
}
function fi_syd(cost, salvage, life, per) {
    return per > life ? CalcErrorsNumber : ((cost - salvage) * (life - per + 1) * 2) / (life * (life + 1));
}
function fi_dollarde(fractionalDollar, fraction) {
    if (fraction < 1) {
        return CalcErrorsDivideByZero;
    }
    return fi_dollarde_dollarfr(true, fractionalDollar, fraction);
}
function fi_dollarfr(decimalDollar, fraction) {
    if (fraction === 0) {
        return CalcErrorsDivideByZero;
    }
    return fi_dollarde_dollarfr(false, decimalDollar, fraction);
}
function fi_price(settlement, maturity, rate, yieldVar, redem, frequency, basis) {
    if (inArray(frequency, [1, 2, 4]) < 0 || compareDateTime(settlement, maturity) > 0) {
        return CalcErrorsNumber;
    }
    return calcPrice(settlement, maturity, rate, yieldVar, redem, frequency, basis);
}
function fi_pricedisc(settlement, maturity, discount, redemption, basis) {
    if (compareDateTime(settlement, maturity) >= 0) {
        return CalcErrorsNumber;
    }
    var a = daysMonthlyBasis(settlement, maturity, basis), d = annualYearBasis(settlement, basis);
    if (a <= 0 || d <= 0) {
        return CalcErrorsNumber;
    }
    return redemption - discount * redemption * a / d;
}
function fi_pricemat(settlement, maturity, issue, rate, yld, basis) {
    if (compareDateTime(settlement, maturity) >= 0) {
        return CalcErrorsNumber;
    }
    var dsm = daysMonthlyBasis(settlement, maturity, basis), dim = daysMonthlyBasis(issue, maturity, basis), a = daysMonthlyBasis(issue, settlement, basis), b = annualYearBasis(settlement, basis);
    if (a <= 0.0 || b <= 0.0 || dsm <= 0.0 || dim <= 0.0) {
        return CalcErrorsNumber;
    }
    var n = 1.0 + ((dsm / b) * yld);
    if (n === 0.0) {
        return CalcErrorsNumber;
    }
    return ((100.0 + ((dim / b) * rate * 100.0)) / (n)) - ((a / b) * rate * 100.0);
}
function fi_oddfprice(settlement, maturity, issue, first_coupon, rate, yieldVar, redemption, freq, basis) {
    if (inArray(freq, [1, 2, 4]) < 0 || compareDateTime(issue, settlement) > 0 ||
        compareDateTime(settlement, first_coupon) > 0 || compareDateTime(first_coupon, maturity) > 0) {
        return CalcErrorsNumber;
    }
    return calcOddfprice(settlement, maturity, rate, yieldVar, redemption, freq, basis, issue, first_coupon);
}
function fi_tbillprice(settlement, maturity, discount) {
    var dsm = convertToOADate(maturity) - convertToOADate(settlement);
    if (compareDateTime(settlement, maturity) >= 0 || dsm > 365.0) {
        return CalcErrorsNumber;
    }
    return 100.0 * (1.0 - (discount * dsm) / 360.0);
}
function fi_euro(val) {
    var v = oneEuro(val, 2);
    return v >= 0 ? v : CalcErrorsNumber;
}
function fi_euroconvert(n, str1, str2, fullprec, calcPrec) {
    function calcPrecision(str) {
        var subStr = str.substr(0, 3);

        var ISO_CODE_ARRAY2 = ['BEF', 'LUF', 'ESP', 'ITL', 'PTE', 'GRD', 'LUX'];
        return inArray(subStr, ISO_CODE_ARRAY2) >= 0 ? 0 : 2;
    }
    function displayPrecision(str) {
        var subStr = str.substr(0, 3);

        var ISO_CODE_ARRAY2 = ['BEF', 'LUF', 'ESP', 'ITL', 'LUX'];
        return inArray(subStr, ISO_CODE_ARRAY2) >= 0 ? 0 : 2;
    }
    var dispPrec = 0;
    if (!fullprec) {
        dispPrec = displayPrecision(str2);
    }
    if (!calcPrec._isArgExists) {
        calcPrec._value = calcPrecision(str1);
    }
    var ret;
    var c1 = oneEuro(str1, calcPrec._value);
    var c2 = oneEuro(str2, calcPrec._value);
    if (c1 >= 0.0 && c2 >= 0.0) {
        ret = n * c2 / c1;
    }
    else {
        return CalcErrorsValue;
    }
    if (!fullprec) {
        ret = MathHelper_round(ret, dispPrec);
    }
    return ret;
}
function calcInvest(figure, pv, fv, func) {
    if (figure === '' && pv === '' && fv === '') {
        return CalcErrorsValue;
    }
    var figureDouble = { value: 0 };
    figure = _tryToDouble(figure, figureDouble);
    var pvDouble = { value: 0 };
    pv = _tryToDouble(pv, pvDouble);
    var fvDouble = { value: 0 };
    fv = _tryToDouble(fv, fvDouble);
    if (figure === true && pv === true && fv === true) {
        return func(figureDouble, pvDouble, fvDouble);
    }
    return CalcErrorsValue;
}
function fi_pduration(rate, pv, fv) {
    return calcInvest(rate, pv, fv, function (rateDouble, pvDouble, fvDouble) {
        if (pvDouble.value > 0.0 && rateDouble.value > 0.0 && fvDouble.value > 0.0) {
            var number = (Math.log(fvDouble.value) - Math.log(pvDouble.value)) / Math.log(1.0 + rateDouble.value);
            var numberAbs = Math.abs(number);
            if (numberAbs <= 1.79769e+308) {
                return numberAbs >= 2.2250738585072014E-308 ? number : 0.0;
            }
            return CalcErrorsDivideByZero;
        }
        return CalcErrorsNumber;
    });
}
function fi_rri(nper, pv, fv) {
    return calcInvest(nper, pv, fv, function (nperDouble, pvDouble, fvDouble) {
        if (pvDouble.value > 0.0 && nperDouble.value > 0.0 && fvDouble.value >= 0.0) {
            nper = Math.pow(fvDouble.value / pvDouble.value, 1.0 / nperDouble.value) - 1.0;
            var numberAbs = Math.abs(nper);
            if (numberAbs <= 1.79769e+308) {
                return numberAbs >= 2.2250738585072014E-308 ? nper : 0.0;
            }
        }
        return CalcErrorsNumber;
    });
}


var doubleArgDefaultValue = { _argType: 0 }, doubleArgDefaultValue1 = { _defaultValue: 0, _argType: 0 }, doubleArgDefaultValue2 = { _argType: 0 , _argCondition: '<= 0' }, doubleArgDefaultValue3 = { _argType: 0 , _argCondition: '< 1' }, doubleArgDefaultValue4 = { _argType: 0 , _argCondition: '< 0' }, doubleArgDefaultValue5 = { _defaultValue: 0.1, _argType: 0 }, doubleArgDefaultValue6 = { _defaultValue: 2, _argType: 0 }, doubleArgDefaultValue8 = { _defaultValue: 1000, _argType: 0 , _argCondition: '<= 0' };
var dateTimeArgDefaultValue = { _argType: 6 };
var stringArgDefaultValue = { _argType: 5 };
var boolArgDefaultValue = { _defaultValue: false, _argType: 7 };
var stringIntArgDefaultValue = { _argType: 2 }, stringIntArgDefaultValue1 = { _argType: 2 , _argCondition: '<= 0' }, stringIntArgDefaultValue2 = { _argType: 2 , _argCondition: '< 1' }, stringIntArgDefaultValue3 = { _defaultValue: 0, _argType: 2 }, stringIntArgDefaultValue4 = { _defaultValue: 0, _argType: 2 , _argCondition: ['< 0', '> 4'] }, stringIntArgDefaultValue5 = { _defaultValue: 0, _argType: 2 , _argCondition: ['< 0', '> 4', '= 2'] }, stringIntArgDefaultValue6 = {
    _argType: 2 ,
    _argCondition: '= 0',
    _conditionErrorValue: CalcErrorsDivideByZero
}, stringIntArgDefaultValue7 = { _argType: 2 , _argCondition: '< 0' };
var arrayArgDefaultValue = {
    _argType: 4 ,
    _valueType: 1 ,
    _toOneDimension: true,
    _breakOnError: true
}, arrayArgNumberValueIgnoreBlank = {
    _argType: 4 ,
    _valueType: 1 ,
    _toOneDimension: true,
    _ignoreBlank: true,
    _breakOnError: true
}, arrayArgDateValueIgnoreBlank = {
    _argType: 4 ,
    _valueType: 4 ,
    _toOneDimension: true,
    _breakOnError: true,
    _ignoreBlank: true,
    breakOnConvertError: true
}, arrayArgDefaultValue1 = {
    _argType: 4 ,
    _valueType: 1 ,
    _toOneDimension: true,
    _breakOnError: true,
    breakOnConvertError: true
}, arrayArgDefaultAutoNumberValue = {
    _argType: 4 ,
    _valueType: 11 ,
    _toOneDimension: true,
    _breakOnError: true,
    breakOnConvertError: true
};
var finArgsLimitDefaultValue = [dateTimeArgDefaultValue, dateTimeArgDefaultValue, stringIntArgDefaultValue,
    stringIntArgDefaultValue4], finArgsLimitDefaultValue1 = [dateTimeArgDefaultValue, dateTimeArgDefaultValue, doubleArgDefaultValue,
    doubleArgDefaultValue, stringIntArgDefaultValue, stringIntArgDefaultValue4], finArgsLimitDefaultValue2 = [dateTimeArgDefaultValue, dateTimeArgDefaultValue, doubleArgDefaultValue2], finArgsLimitDefaultValue3 = [doubleArgDefaultValue, dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    doubleArgDefaultValue, stringIntArgDefaultValue, doubleArgDefaultValue2, stringIntArgDefaultValue5], finArgsLimitDefaultValue4 = [doubleArgDefaultValue, doubleArgDefaultValue, doubleArgDefaultValue,
    doubleArgDefaultValue1, doubleArgDefaultValue1], finArgsLimitDefaultValue5 = [dateTimeArgDefaultValue, dateTimeArgDefaultValue, doubleArgDefaultValue2,
    doubleArgDefaultValue2, stringIntArgDefaultValue4], finArgsLimitDefaultValue6 = [doubleArgDefaultValue2, stringIntArgDefaultValue1,
    doubleArgDefaultValue2, stringIntArgDefaultValue2, stringIntArgDefaultValue, stringIntArgDefaultValue], finArgsLimitDefaultValue7 = [doubleArgDefaultValue2, stringIntArgDefaultValue2], finArgsLimitDefaultValue8 = [doubleArgDefaultValue, stringIntArgDefaultValue7];

defineBuiltInFunction('FV', fi_fv, 3, 5, finArgsLimitDefaultValue4, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('FVSCHEDULE', fi_fvschedule, 2, 2, [doubleArgDefaultValue, arrayArgDefaultValue], 1, 1);
defineBuiltInFunction('NPV', fi_npv, 2, keyword_undefined, doubleArgDefaultValue, '> 0', '> 0');
defineBuiltInFunction('PV', fi_pv, 3, 5, finArgsLimitDefaultValue4, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('RECEIVED', fi_received, 4, 5, finArgsLimitDefaultValue5, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('XNPV', fi_xnpv, 3, 3, [doubleArgDefaultValue, arrayArgDefaultValue1, arrayArgDefaultValue1], '!= 0', '!= 0');
defineBuiltInFunction('CUMIPMT', fi_cumipmt, 6, 6, finArgsLimitDefaultValue6);
defineBuiltInFunction('CUMPRINC', fi_cumprinc, 6, 6, finArgsLimitDefaultValue6);
defineBuiltInFunction('IPMT', fi_ipmt, 4, 6, [doubleArgDefaultValue, doubleArgDefaultValue3, doubleArgDefaultValue3,
    doubleArgDefaultValue, doubleArgDefaultValue1, stringIntArgDefaultValue3], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [4, 5] });
defineBuiltInFunction('ISPMT', fi_ispmt, 4, 4, [doubleArgDefaultValue, stringIntArgDefaultValue,
    stringIntArgDefaultValue6, doubleArgDefaultValue]);
defineBuiltInFunction('PMT', fi_pmt, 3, 5, [doubleArgDefaultValue,
    { _argType: 0 , _argCondition: '= 0', _conditionErrorValue: CalcErrorsDivideByZero },
    doubleArgDefaultValue, doubleArgDefaultValue1, doubleArgDefaultValue1], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('PPMT', fi_ppmt, 4, 6, [doubleArgDefaultValue, doubleArgDefaultValue3, doubleArgDefaultValue,
    doubleArgDefaultValue, doubleArgDefaultValue1, doubleArgDefaultValue1], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [4, 5] });
defineBuiltInFunction('COUPDAYBS', fi_coupdaybsFunc, 3, 4, finArgsLimitDefaultValue, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('COUPDAYS', fi_coupdaysFunc, 3, 4, finArgsLimitDefaultValue, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('COUPDAYSNC', fi_coupdaysncFunc, 3, 4, finArgsLimitDefaultValue, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('COUPNCD', fi_coupncdFunc, 3, 4, finArgsLimitDefaultValue, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('COUPNUM', fi_coupnumFunc, 3, 4, finArgsLimitDefaultValue, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('COUPPCD', fi_couppcdFunc, 3, 4, finArgsLimitDefaultValue, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('DURATION', fi_durationFunc, 5, 6, finArgsLimitDefaultValue1, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 5 });
defineBuiltInFunction('MDURATION', fi_mduration, 5, 6, finArgsLimitDefaultValue1, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 5 });
defineBuiltInFunction('NPER', fi_nper, 3, 5, [{ _argType: 0 , _argCondition: '<= -1' },
    doubleArgDefaultValue, doubleArgDefaultValue, doubleArgDefaultValue1, doubleArgDefaultValue1], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('YIELD', fi_yieldFunc, 6, 7, [dateTimeArgDefaultValue, dateTimeArgDefaultValue, doubleArgDefaultValue4, doubleArgDefaultValue2,
    doubleArgDefaultValue2, stringIntArgDefaultValue, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 6 });
defineBuiltInFunction('YIELDDISC', fi_yielddisc, 4, 5, [dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    doubleArgDefaultValue2, doubleArgDefaultValue2, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('YIELDMAT', fi_yieldmat, 5, 6, [dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    dateTimeArgDefaultValue, doubleArgDefaultValue4, doubleArgDefaultValue2, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 5 });
defineBuiltInFunction('AMORDEGRC', fi_amordegrc, 6, 7, finArgsLimitDefaultValue3, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 6 });
defineBuiltInFunction('AMORLINC', fi_amorlinc, 6, 7, finArgsLimitDefaultValue3, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 6 });
defineBuiltInFunction('ODDFYIELD', fi_oddfyield, 8, 9, [dateTimeArgDefaultValue, dateTimeArgDefaultValue, dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    doubleArgDefaultValue4, doubleArgDefaultValue2, doubleArgDefaultValue2, stringIntArgDefaultValue, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 8 });
defineBuiltInFunction('ODDLYIELD', fi_oddlyield, 7, 8, [dateTimeArgDefaultValue, dateTimeArgDefaultValue, dateTimeArgDefaultValue, doubleArgDefaultValue4,
    doubleArgDefaultValue2, doubleArgDefaultValue2, doubleArgDefaultValue, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 7 });
defineBuiltInFunction('ODDLPRICE', fi_oddlprice, 7, 8, [dateTimeArgDefaultValue, dateTimeArgDefaultValue, dateTimeArgDefaultValue, doubleArgDefaultValue4,
    doubleArgDefaultValue4, doubleArgDefaultValue2, stringIntArgDefaultValue, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 7 });
defineBuiltInFunction('TBILLEQ', fi_tbilleq, 3, 3, finArgsLimitDefaultValue2);
defineBuiltInFunction('TBILLYIELD', fi_tbillyield, 3, 3, finArgsLimitDefaultValue2);
defineBuiltInFunction('IRR', fi_irr, 1, 2, [arrayArgNumberValueIgnoreBlank, doubleArgDefaultValue5], 0, 0, { _acceptsMissingArgument: 1 });
defineBuiltInFunction('MIRR', fi_mirr, 3, 3, [arrayArgNumberValueIgnoreBlank, doubleArgDefaultValue, doubleArgDefaultValue], 0, 0);
defineBuiltInFunction('XIRR', fi_xirr, 2, 3, [arrayArgDefaultAutoNumberValue, arrayArgDateValueIgnoreBlank, doubleArgDefaultValue5], '!= 2', '!= 2', { _acceptsMissingArgument: 2 });
defineBuiltInFunction('RATE', fi_rate, 3, 6, [doubleArgDefaultValue2, doubleArgDefaultValue, doubleArgDefaultValue, doubleArgDefaultValue1, {
        _defaultValue: 0,
        _argType: 2 ,
        _argCondition: '< 0',
        _conditionErrorValue: CalcErrorsValue
    }, doubleArgDefaultValue5], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4, 5] });
defineBuiltInFunction('VDB', fi_vdb, 5, 7, [doubleArgDefaultValue4, doubleArgDefaultValue4, stringIntArgDefaultValue7,
    doubleArgDefaultValue4, doubleArgDefaultValue4, doubleArgDefaultValue6, boolArgDefaultValue], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [5, 6] });
defineBuiltInFunction('ACCRINT', fi_accrint, 6, 8, [dateTimeArgDefaultValue, dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    doubleArgDefaultValue2, doubleArgDefaultValue8, stringIntArgDefaultValue, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [4, 6, 7] });
defineBuiltInFunction('ACCRINTM', fi_accrintm, 3, 5, [dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    doubleArgDefaultValue2, doubleArgDefaultValue8, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('DISC', fi_disc, 4, 5, [dateTimeArgDefaultValue, dateTimeArgDefaultValue, doubleArgDefaultValue2,
    doubleArgDefaultValue2, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('EFFECT', fi_effect, 2, 2, finArgsLimitDefaultValue7);
defineBuiltInFunction('INTRATE', fi_intrate, 4, 5, finArgsLimitDefaultValue5, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('NOMINAL', fi_nominal, 2, 2, finArgsLimitDefaultValue7);
defineBuiltInFunction('DB', fi_db, 4, 5, [doubleArgDefaultValue4, doubleArgDefaultValue, stringIntArgDefaultValue2,
    stringIntArgDefaultValue2, { _defaultValue: 12, _argType: 2 , _argCondition: ['< 1', '> 12'] }], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('DDB', fi_ddb, 4, 5, [doubleArgDefaultValue4, doubleArgDefaultValue, stringIntArgDefaultValue1,
    stringIntArgDefaultValue1, { _defaultValue: 2, _argType: 0 , _argCondition: '<= 0' }], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('SLN', fi_sln, 3, 3, [doubleArgDefaultValue, doubleArgDefaultValue, stringIntArgDefaultValue6]);
defineBuiltInFunction('SYD', fi_syd, 4, 4, [doubleArgDefaultValue, doubleArgDefaultValue4, stringIntArgDefaultValue2, stringIntArgDefaultValue1]);
defineBuiltInFunction('DOLLARDE', fi_dollarde, 2, 2, finArgsLimitDefaultValue8);
defineBuiltInFunction('DOLLARFR', fi_dollarfr, 2, 2, finArgsLimitDefaultValue8);
defineBuiltInFunction('PRICE', fi_price, 6, 7, [dateTimeArgDefaultValue, dateTimeArgDefaultValue, doubleArgDefaultValue4, doubleArgDefaultValue4,
    doubleArgDefaultValue2, stringIntArgDefaultValue, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 6 });
defineBuiltInFunction('PRICEDISC', fi_pricedisc, 4, 5, finArgsLimitDefaultValue5, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 3 });
defineBuiltInFunction('PRICEMAT', fi_pricemat, 5, 6, [dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    dateTimeArgDefaultValue, doubleArgDefaultValue4, doubleArgDefaultValue4, stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 5 });
defineBuiltInFunction('ODDFPRICE', fi_oddfprice, 8, 9, [dateTimeArgDefaultValue, dateTimeArgDefaultValue, dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    doubleArgDefaultValue4, doubleArgDefaultValue4, doubleArgDefaultValue2, stringIntArgDefaultValue,
    stringIntArgDefaultValue4], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: 8 });
defineBuiltInFunction('TBILLPRICE', fi_tbillprice, 3, 3, [dateTimeArgDefaultValue, dateTimeArgDefaultValue,
    doubleArgDefaultValue2]);
defineBuiltInFunction('EURO', fi_euro, 1, 1, stringArgDefaultValue);
defineBuiltInFunction('EUROCONVERT', fi_euroconvert, 3, 5, [doubleArgDefaultValue, stringArgDefaultValue, stringArgDefaultValue, boolArgDefaultValue,
    {
        _needArgExistsValue: true,
        _argType: 2 ,
        _defaultValue: 3,
        _argCondition: '< 3',
        _conditionErrorValue: CalcErrorsValue
    }], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('PDURATION', fi_pduration, 3, 3);
defineBuiltInFunction('RRI', fi_rri, 3, 3);
 }),

 './src/functions-lookup.ts':
 (function(module, exports, __webpack_require__) {
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


var Common_1 = __webpack_require__( 'Common');
var CalcEngine_1 = __webpack_require__( 'CalcEngine');
var keyword_null = null, keyword_undefined = void 0;
var RegexHelper = Common_1.Common._RegexHelper, Types = Common_1.Common._Types, _DateTimeHelper = Common_1.Common._DateTimeHelper, parseInvariant = _DateTimeHelper._parseInvariant, isNullOrUndefined = Types._isNullOrUndefined, inherit = Types._inherit, arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength, isDate = _DateTimeHelper._isDate, toOADate = _DateTimeHelper._toOADate;
var CalcConvert_isError = CalcEngine_1.Convert._isError, CalcConvert_toInt = CalcEngine_1.Convert._toInt, CalcConvert_tryToInt = CalcEngine_1.Convert._tryToInt, CalcConvert_isNumber = CalcEngine_1.Convert._isNumber, CalcConvert_toDouble = CalcEngine_1.Convert._toDouble, CalcConvert_isReference = CalcEngine_1.Convert._isReference, CalcConvert_isArray = CalcEngine_1.Convert._isArray, CalcConvert_toString = CalcEngine_1.Convert._toString;
var CalcErrorsValue = CalcEngine_1.Errors.Value, CalcErrorsReference = CalcEngine_1.Errors.Reference, CalcErrorsNotAvailable = CalcEngine_1.Errors.NotAvailable, CalcErrorsNull = CalcEngine_1.Errors.Null, CalcErrorsCalc = CalcEngine_1.Errors.Calc;
var defineBuiltInFunction = CalcEngine_1.Functions._defineBuiltInFunction, isBoolean = CalcEngine_1.Functions._isBoolean, isString = CalcEngine_1.Functions._isString;

var maxRowCount = 1048576;
var maxColumnCount = 16384;


function createRange(r, c, rc, cc) {
    return {
        row: r,
        col: c,
        rowCount: rc,
        colCount: cc
    };
}
function getValueAreaXY(v, x, y) {
    if (isNullOrUndefined(v)) {
        return keyword_null;
    }
    if (v.isArray || v.isReference) {
        var colCount = v.colCount;
        if (x > colCount) {
            var swap = x;
            x = y;
            y = swap;
        }
        return v[(y * colCount) + x];
    }
    return v[0];
}
function findCompareTypeValid(find, val, supportNullValue) {
    if (supportNullValue && (find === null || val === null)) {
        return true;
    }
    if (isNullOrUndefined(val)) {
        return false;
    }
    if ((isNullOrUndefined(find) || CalcConvert_isNumber(find, true)) && CalcConvert_isNumber(val, true)
        || isBoolean(find) && isBoolean(val)) {
        return true;
    }
    return !!(isString(find) && isString(val));
}
var mlow, mhigh, mcurrent, morig, bsup, bstarted;
function findBoundWalk(l, h, start, up, reset) {
    if (l < 0 || h < 0 || h < l || start < l || start > h) {
        return -1;
    }
    if (reset) {
        mlow = l;
        mhigh = h;
        mcurrent = start;
        morig = start;
        bsup = up;
        bstarted = up;
        return mcurrent;
    }
    if (bsup) {
        mcurrent++;
        if (mcurrent > mhigh) {
            if (bsup === bstarted) {
                mcurrent = morig - 1;
                bsup = false;
            }
            else {
                return -1;
            }
        }
    }
    else {
        mcurrent--;
        if (mcurrent < mlow) {
            if (bsup === bstarted) {
                mcurrent = morig + 1;
                bsup = true;
            }
            else {
                return -1;
            }
        }
    }
    return mcurrent;
}


function getDateCompareResult(a, b, num) {
    var date = parseInvariant(a), ret = num;
    if (date === b) {
        ret = 0;
    }
    else if (date > b) {
        ret = 1;
    }
    else if (date < b) {
        ret = 2;
    }
    return ret;
}


function compareValue(a, b, case_sensitive) {
    if (a === b) {
        return 0;
    }

    if (isString(a)) {
        if (!b && arrayHelper_getLength(a.toString()) === 0) {
            return 0;
        }
        else if (CalcConvert_isNumber(b) && !CalcConvert_isNumber(a)) {
            return 1;
        }
        else if (isBoolean(b)) {
            return 2;
        }
        else if (isString(b)) {
            var t = void 0;
            try {
                var culture = Common_1.Common.CultureManager.getCultureInfo();
                if (culture.localeCompare) {
                    t = case_sensitive ? culture.localeCompare(a.toString(), b.toString()) : culture.localeCompare(a.toLowerCase(), b.toLowerCase());
                }
                else {
                    t = case_sensitive ? a.toString().localeCompare(b.toString()) : a.toLowerCase().localeCompare(b.toLowerCase());
                }
            }
            catch (_a) {
                t = case_sensitive ? a.toString().localeCompare(b.toString()) : a.toLowerCase().localeCompare(b.toLowerCase());
            }
            if (t < 0) {
                t = 2;
            }
            else if (t > 0) {
                t = 1;
            }
            return t;
        }
        else if (b instanceof Date) {
            return getDateCompareResult(a, b, 1);
        }
        return -1;
    }
    else if (isString(b)) {
        if (!a && arrayHelper_getLength(b.toString()) === 0) {
            return 0;
        }
        else if (CalcConvert_isNumber(a)) {
            return 2;
        }
        else if (isBoolean(a)) {
            return 1;
        }
        else if (a instanceof Date) {
            return getDateCompareResult(a, b, 2);
        }
        return -1;
    }

    if (isBoolean(a) && CalcConvert_isNumber(b)) {
        return 1;
    }
    if (isBoolean(b) && CalcConvert_isNumber(a)) {
        return 2;
    }


    var ax = CalcConvert_toDouble(a);
    var bx = CalcConvert_toDouble(b);
    if (ax === bx) {
        return 0;
    }
    else if (ax < bx) {
        return 2;
    }
    return 1;
}
function fetchValueAreaXY(v, x, y) {
    var res = getValueAreaXY(v, x, y);
    return isNullOrUndefined(res) ? 0 : res;
}
function findIndexBisection(find, data, type, height) {
    var comp = -1, high, low = 0, prev = -1, mid = -1;
    high = height ? data.rowCount : data.colCount;
    high--;
    if (high < low) {
        return -1;
    }
    while (low <= high) {
        var v = keyword_null, start = void 0, realVal = find[0];
        if ((type >= 1) !== (comp === 2)) {
            prev = mid;
        }
        mid = CalcConvert_toInt((low + high) / 2);
        mid = findBoundWalk(low, high, mid, type >= 0, true);
        start = mid;
        while (!findCompareTypeValid(realVal, v) && mid !== -1) {
            v = height ? getValueAreaXY(data, 0, mid) : getValueAreaXY(data, mid, 0);
            if (findCompareTypeValid(realVal, v)) {
                break;
            }
            mid = findBoundWalk(0, 0, 0, false, false);
            if (type >= 0 && mid < start) {
                high = mid;
            }
            else if (type < 0 && mid > start) {
                low = mid;
            }
        }


        if (mid === -1 && ((type >= 1) !== (comp === 2))) {
            return prev;
        }
        else if (mid === -1) {
            return -1;
        }
        comp = compareValue(realVal, v, false);
        if (type >= 1 && comp === 1) {
            low = mid + 1;
        }
        else if (type >= 1 && comp === 2) {
            high = mid - 1;
        }
        else if (type <= -1 && comp === 1) {
            high = mid - 1;
        }
        else if (type <= -1 && comp === 2) {
            low = mid + 1;
        }
        else if (comp === 0) {
            while ((type <= -1 && mid > low) || (type >= 0 && mid < high)) {
                var adj = 0;
                adj = type >= 0 ? mid + 1 : mid - 1;
                v = height ? fetchValueAreaXY(data, 0, adj) : fetchValueAreaXY(data, adj, 0);
                if (v === null) {
                    return -1;
                }
                if (!findCompareTypeValid(realVal, v)) {
                    break;
                }
                comp = compareValue(realVal, v, false);
                if (comp !== 0) {
                    break;
                }
                mid = adj;
            }
            return mid;
        }
    }
    return (type >= 1) !== (comp === 2) ? mid : prev;
}
function findIndexLinear(find, data, type, height, reverse, supportNullValue) {
    var index_val = keyword_null, comp, length, lp, index = -1, regExp, v;
    var realVal = find[0], isFindIsString = isString(realVal);
    var wildcardCriteria = RegexHelper._getWildcardCriteriaFullMatch(realVal);
    length = height ? data.rowCount : data.colCount;
    if (isFindIsString && wildcardCriteria) {
        regExp = RegexHelper._getRegIgnoreCase(wildcardCriteria);
    }
    for (lp = 0; lp < length; lp++) {
        var realLp = reverse ? length - 1 - lp : lp;
        v = height ? getValueAreaXY(data, 0, realLp) : getValueAreaXY(data, realLp, 0);
        if (!findCompareTypeValid(realVal, v, supportNullValue)) {
            continue;
        }

        var isValueIsString = isString(v);
        if (isFindIsString && isValueIsString && wildcardCriteria) {
            regExp.lastIndex = 0;
            comp = regExp.test(v) ? 0 : 1;
        }
        else {
            comp = compareValue(realVal, v, false);
        }
        if (type >= 1 && comp === 1) {
            comp = -1;
            if (index >= 0) {
                comp = compareValue(v, index_val, false);
            }
            if (index < 0 || (index >= 0 && comp === 1)) {
                index = realLp;
                index_val = v;
            }
        }
        else if (type <= -1 && comp === 2) {
            comp = -1;
            if (index >= 0) {
                comp = compareValue(v, index_val, false);
            }
            if (index < 0 || (index >= 0 && comp === 2)) {
                index = realLp;
                index_val = v;
            }
        }
        else if (comp === 0) {
            return realLp;
        }
    }
    return index;
}
function _assertOrder(v, ascending) {
    if (!ascending) {
        var length_1 = arrayHelper_getLength(v), i = void 0;
        for (i = 1; i < length_1; i++) {
            var a = v[i - 1], b = v[i], ret = compareValue(a, b, false);
            if (ret === 2) {
                return false;
            }
        }
    }
    return true;
}
var CalcReferencePrototype = CalcEngine_1.CalcReference.prototype;
var CellInfoReference = (function (_super) {
    __extends(CellInfoReference, _super);
    function CellInfoReference(source, row, column, rowCount, columnCount, type) {
        var _this = _super.call(this, source, [createRange(row, column, rowCount, columnCount)]) || this;
        _this.getValue = function (area, rowOffset, columnOffset) {
            var self = this, type = self._type, ret;
            if (type === 0 ) {
                ret = self.getRow(0) + 1 + rowOffset;
            }
            else if (type === 1 ) {
                ret = self.getColumn(0) + 1 + columnOffset;
            }
            else {
                ret = CalcReferencePrototype.getValue.call(self, area, rowOffset, columnOffset);
            }
            return ret;
        };
        var self = _this;
        self._row = row;
        self._column = column;
        self._rowCount = rowCount;
        self._columnCount = columnCount;
        self._type = type;
        return _this;
    }
    CellInfoReference.prototype.type = function () {
        return this._type;
    };
    CellInfoReference.prototype.toArray = function (valueType, toOneDimension) {
        var self = this, result = [], baseRow = self._row, baseCol = self._column, type = self._type, rangeCount = self.getRangeCount(), rowCount = self._rowCount, colCount = self._columnCount, range, value, rangeArr, rowArr, r, c;
        for (range = 0; range < rangeCount; range++) {
            if (!toOneDimension) {
                rangeArr = [];
                result.push(rangeArr);
            }
            for (r = 0; r < rowCount; r++) {
                if (!toOneDimension) {
                    rowArr = [];
                    rangeArr.push(rowArr);
                }
                for (c = 0; c < colCount; c++) {
                    if (type === 0 ) {
                        value = baseRow + 1 + r;
                    }
                    else if (type === 1 ) {
                        value = baseCol + 1 + c;
                    }
                    else {
                        value = CalcReferencePrototype.getValue.call(self, range, baseRow + r, baseCol + c);
                    }
                    toOneDimension ? result.push(value) : rowArr.push(value);
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
    return CellInfoReference;
}(CalcEngine_1.CalcReference));
var TransposedArray = (function (_super) {
    __extends(TransposedArray, _super);
    function TransposedArray(array) {
        var _this = _super.call(this, keyword_undefined) || this;
        _this._array = array;
        return _this;
    }
    TransposedArray.prototype.getRowCount = function () {
        return CalcEngine_1.CalcArrayHelper.getColumnCount(this._array);
    };
    TransposedArray.prototype.getColumnCount = function () {
        return CalcEngine_1.CalcArrayHelper.getRowCount(this._array);
    };
    TransposedArray.prototype.getValue = function (row, column) {
        return CalcEngine_1.CalcArrayHelper.getValue(this._array, column, row);
    };
    return TransposedArray;
}(CalcEngine_1.CalcArray));
function eg_rowColumn(context, reference, isRow) {
    if (!context) {
        return CalcErrorsValue;
    }
    var isArrayFormula = context.arrayFormulaMode, hasReference = reference !== keyword_undefined, type = isRow ? 0 : 1 ;
    reference = hasReference ? reference : context.getReference(context.source, createRange(context.row, context.column, context.rowCount, context.columnCount));
    if (!reference || reference.getRangeCount() !== 1) {
        return CalcErrorsValue;
    }


    var i, count, resultArray = [];
    if (isRow) {
        var startRow = reference.getRow(0) + 1;
        count = reference.getRowCount(0);
        if (count > 1) {
            for (i = 0; i < count; i++) {
                resultArray.push([startRow + i]);
            }
            return new CalcEngine_1.CalcArray(resultArray);
        }
        return startRow;
    }

    var startColumn = reference.getColumn(0) + 1;
    count = reference.getColumnCount(0);
    if (count > 1) {
        for (i = 0; i < count; i++) {
            resultArray.push(startColumn + i);
        }
        return new CalcEngine_1.CalcArray([resultArray]);
    }
    return startColumn;
}
function eg_hlookupVlookup(context, lookVal, table, rowColIndex, approx, isVlookup) {
    var searchArray, header, rowCount, colCount;
    if (context && table instanceof CalcEngine_1.CalcReference) {
        rowCount = table.getRowCount(0);
        colCount = table.getColumnCount(0);
        header = table.create([{ row: table.getRow(0), col: table.getColumn(0), rowCount: isVlookup ? rowCount : 1, colCount: isVlookup ? 1 : colCount }]);
        addDynamicRef(context, table, header.getRow(0), header.getColumn(0), header.getRowCount(0), header.getColumnCount(0));
    }
    else {
        if (table instanceof CalcEngine_1.CalcArray) {
            rowCount = table.getRowCount();
            colCount = table.getColumnCount();
        }
        else if (Array.isArray(table)) {
            rowCount = table.rowCount;
            colCount = table.colCount;
        }
        header = table;
    }
    if (isVlookup && rowColIndex > colCount || !isVlookup && rowColIndex > rowCount) {
        return CalcErrorsReference;
    }
    searchArray = CalcEngine_1.Convert._toArray(header, 0 , true, false, false);
    if (searchArray.isError || searchArray.isConvertError) {
        return CalcErrorsReference;
    }
    var index = approx || approx === keyword_undefined ? findIndexBisection(lookVal, searchArray, 1, isVlookup) : findIndexLinear(lookVal, searchArray, 0, isVlookup);
    if (index >= 0) {
        if (context && table instanceof CalcEngine_1.CalcReference) {
            var rowOffset = isVlookup ? index : rowColIndex - 1, colOffset = isVlookup ? rowColIndex - 1 : index;
            addDynamicRef(context, table, table.getRow(0) + rowOffset, table.getColumn(0) + colOffset, 1, 1);
            return table.getValue(0, rowOffset, colOffset);
        }
        else {
            return isVlookup ? fetchValueAreaXY(searchArray, rowColIndex - 1, index) : fetchValueAreaXY(searchArray, index, rowColIndex - 1);
        }
    }
    return CalcErrorsNotAvailable;
}
function eg_row(context, reference) {
    return eg_rowColumn(context, reference, true);
}
function eg_column(context, reference) {
    return eg_rowColumn(context, reference, false);
}
function eg_rows(array) {
    return CalcEngine_1.CalcArrayHelper.getRowCount(array);
}
function eg_columns(array) {
    return CalcEngine_1.CalcArrayHelper.getColumnCount(array);
}
function eg_transpose(array) {
    return new TransposedArray(array);
}
function eg_hlookup(context, lookupValue, array, rowColIndex, approx) {
    return eg_hlookupVlookup(context, lookupValue, array, rowColIndex, approx, false);
}
function eg_vlookup(context, lookupValue, array, rowColIndex, approx) {
    return eg_hlookupVlookup(context, lookupValue, array, rowColIndex, approx, true);
}
function eg_xlookup(lookupValue, lookupArray, returnRange, ifNotFound, matchType, searchType) {
    var lookupArrayRowCount = lookupArray.getRowCount(), lookupArrayColCount = lookupArray.getColumnCount();
    var oneCellLookupArray = lookupArrayRowCount === 1 && lookupArrayColCount === 1;
    var returnRangeRowCount = returnRange.getRowCount(), returnRangeColCount = returnRange.getColumnCount();
    var isRowSearchDirection = lookupArrayRowCount === 1 && lookupArrayColCount >= 1;
    var isRowReturnDirection = returnRangeRowCount === 1 && returnRangeColCount >= 1;

    if (!oneCellLookupArray) {
        if ((isRowSearchDirection && lookupArrayColCount !== returnRangeColCount) ||
            (!isRowSearchDirection && lookupArrayRowCount !== returnRangeRowCount)) {
            return CalcErrorsValue;
        }
    }
    else {
        if (returnRangeRowCount > 1 && returnRangeColCount > 1) {
            return CalcErrorsValue;
        }
    }


    var index = eg_xmatch(lookupValue, CalcEngine_1.Convert._toArray(lookupArray, 0, true), matchType, searchType);
    if (index === CalcErrorsNotAvailable) {
        var notFoundResult = typeof ifNotFound === 'string' ? ifNotFound : CalcErrorsNotAvailable;
        if (!oneCellLookupArray) {
            return new CalcEngine_1.CalcArray([[notFoundResult]]);
        }
        return notFoundResult;
    }
    else if (index === CalcErrorsValue) {
        return CalcErrorsValue;
    }
    else if (index > 0) {
        if (oneCellLookupArray) {
            return returnRange;
        }

        index = index - 1;
        var results = [];
        if (CalcEngine_1.Convert._isArray(returnRange)) {
            if (isRowSearchDirection) {
                for (var i = 0; i < returnRangeRowCount; i++) {
                    var colItem = returnRange.getValue(0, index);
                    results.push([colItem]);
                }
            }
            else {
                var rowItem = isRowReturnDirection ? [returnRange.getValue(0, index)] : [returnRange.getValue(index, 0)];
                results.push(rowItem);
            }
            return new CalcEngine_1.CalcArray(results);
        }
        else if (returnRange instanceof CalcEngine_1.CalcReference) {
            var reference = returnRange;
            var row = reference.getRow(), col = reference.getColumn(), rowCount = returnRangeRowCount, colCount = returnRangeColCount;
            if (isRowSearchDirection) {
                col = reference.getColumn() + index;
                colCount = 1;
            }
            else {
                row = reference.getRow() + index;
                rowCount = 1;
            }
            return reference.create([{ row: row, col: col, rowCount: rowCount, colCount: colCount }]);
        }
    }
}
function eg_lookup(lookupValue, lookupVector, resultVector) {
    var array = [];
    if (lookupVector) {
        for (var i = 0; i < lookupVector.length; i++) {
            array.push(lookupVector[i]);
        }
    }
    if (lookupVector.colCount <= lookupVector.rowCount) {
        array.colCount = lookupVector.colCount;
        array.rowCount = Math.ceil(array.length / array.colCount);
    }
    else {
        array.rowCount = lookupVector.rowCount;
        array.colCount = Math.ceil(array.length / array.rowCount);
    }
    if (!isNullOrUndefined(lookupVector.isReference)) {
        array.isReference = lookupVector.isReference;
    }
    if (!isNullOrUndefined(lookupVector.isArray)) {
        array.isArray = lookupVector.isArray;
    }
    array.rangeCount = lookupVector.rangeCount;
    var index = -1, result, width = array.colCount, height = array.rowCount, lookVal = lookupValue;
    if (resultVector !== keyword_undefined) {
        result = CalcEngine_1.Convert._toArray(resultVector, 0 , true, false, false);
    }
    else {
        var val = width > height ? eg_hlookup(keyword_undefined, lookVal, array, height, true) : eg_vlookup(keyword_undefined, lookVal, array, width, true);
        return CalcConvert_isError(val) ? CalcErrorsNotAvailable : val;
    }
    if (result) {
        if (result.colCount > 1 && result.rowCount > 1) {
            return CalcErrorsNotAvailable;
        }
    }
    else {
        result = array;
    }
    index = findIndexBisection(lookVal, array, 1, !(width > height));
    if (index >= 0) {
        width = result.colCount;
        height = result.rowCount;
        return width > height ? fetchValueAreaXY(result, index, height - 1) : fetchValueAreaXY(result, width - 1, index);
    }
    return CalcErrorsNotAvailable;
}
function eg_choose(index) {
    var args = arguments;
    if (index < 1 || arrayHelper_getLength(args) <= index) {
        return CalcErrorsValue;
    }
    return isNullOrUndefined(args[index]) ? 0 : args[index];
}
function eg_match(lookupValue, lookupArray, matchType) {
    var lookVal = lookupValue, array = lookupArray;
    if (!array.isArray && !array.isReference) {
        return CalcErrorsNotAvailable;
    }
    var width = array.colCount, height = array.rowCount;
    var result = -1;
    if (width > 1 && height > 1) {
        return CalcErrorsNotAvailable;
    }
    if (matchType === 1 && !_assertOrder(array, true) || matchType === -1 && !_assertOrder(array, false)) {
        return CalcErrorsNotAvailable;
    }


    if (matchType === keyword_undefined) {
        matchType = 1;
    }
    else if (matchType === keyword_null) {
        matchType = 0;
    }


    if (matchType === 1) {
        result = findIndexBisection(lookVal, array, 1, height > 1);
    }
    else if (matchType === 0) {
        result = findIndexLinear(lookVal, array, 0, height > 1);
    }
    else if (matchType === -1) {
        result = findIndexBisection(lookVal, array, -1, height > 1);
    }
    return result === -1 ? CalcErrorsNotAvailable : result + 1;
}
function eg_xmatch(lookupValue, matchArray, matchType, searchType) {
    var array = matchArray;

    if (!array.isArray && !array.isReference) {
        return CalcErrorsNotAvailable;
    }
    var width = array.colCount, height = array.rowCount;

    if (width > 1 && height > 1) {
        return CalcErrorsValue;
    }

    if (matchType === 2 && (searchType === 2 || searchType === -2 )) {
        return CalcErrorsValue;
    }

    var isNotLegalAscendingSearch = searchType === 2 && !_assertOrder(array, true), isNotLegalDesendingSearch = searchType === -2 && !_assertOrder(array, false);
    if (isNotLegalAscendingSearch || isNotLegalDesendingSearch) {
        return CalcErrorsNotAvailable;
    }
    var lookVal = lookupValue, realVal = lookupValue && lookupValue[0], result = -1;


    if (isNullOrUndefined(matchType)) {
        matchType = 0 ;
    }

    if (isNullOrUndefined(searchType) || searchType === 0 ) {
        searchType = 1 ;
    }
    var isReverse;
    if (searchType === -1 ) {
        isReverse = true;
    }
    var findType;
    if (matchType === 0 || matchType === 2 ) {
        findType = 0;
    }
    if (searchType === 1 || searchType === -1 ) {
        if (matchType === 1 ) {
            findType = -1;
        }
        else if (matchType === -1 ) {
            if (RegexHelper._getWildcardCriteria(realVal)) {
                return CalcErrorsNotAvailable;
            }
            else {
                findType = 1;
            }
        }
        result = findIndexLinear(lookVal, array, findType, height > 1, isReverse, true);
    }
    else if (searchType === 2 || searchType === -2 ) {
        if (width === 1 && height === 1) {
            var actualIndex = 0;
            var searchVal = array[actualIndex];
            if (findCompareTypeValid(realVal, searchVal)) {
                var comp = compareValue(realVal, searchVal, false);
                if (comp === 0) {
                    return actualIndex + 1;
                }
                else if (matchType === 0 ) {
                    return comp === 0 ? actualIndex + 1 : CalcErrorsNotAvailable;
                }
                else if (matchType === 1 ) {
                    return comp === 2 ? actualIndex + 1 : CalcErrorsNotAvailable;
                }
                else if (matchType === -1 ) {
                    return comp === 1 ? actualIndex + 1 : CalcErrorsNotAvailable;
                }
            }
            else {
                return CalcErrorsNotAvailable;
            }
        }


        findType = searchType === 2 ? 1 : -1;
        result = findIndexBisection(lookVal, array, findType, height > 1);
    }
    if (result === -1) {
        return CalcErrorsNotAvailable;
    }
    else if (matchType === 0 && !isEqual(realVal, array[result])) {
        return CalcErrorsNotAvailable;
    }
    else {
        if (!isEqual(realVal, array[result])) {
            if (searchType === 2 && matchType === 1 ) {
                return result + 2;
            }
            else if (searchType === -2 && matchType === -1 ) {
                return result + 2;
            }
            else {
                return result + 1;
            }
        }
        else {
            return result + 1;
        }
    }
}
function appendR1C1Number(addr, prefix, coord, relative) {
    addr += prefix;
    if (relative) {
        if (coord !== 0) {
            addr += '[';
            addr += coord.toString();
            addr += ']';
        }
    }
    else {
        addr += coord;
    }
    return addr;
}
function appendA1Number(addr, coord, relative) {
    if (!relative) {
        addr += '$';
    }
    addr += coord;
    return addr;
}
function appendA1Letter(addr, coord, relative) {
    if (!relative) {
        addr += '$';
    }
    var position = addr.length;
    for (; coord > 0.1; coord = parseInt(((coord - 1) / 26).toString(), 10)) {
        addr = Common_1.Common._StringHelper._insert(addr, position, String.fromCharCode('A'.charCodeAt(0) + (coord - 1) % 26));
    }
    return addr;
}
function appendExternalName(addr, name) {
    if (name && 0 < arrayHelper_getLength(name)) {
        var i = void 0, needQuotes = !CalcEngine_1._isLetter(name[0]) && name[0] !== '_';
        for (i = 1; !needQuotes && i < arrayHelper_getLength(name); i++) {
            needQuotes = !CalcEngine_1._isLetterOrDigit(name[i]) && name[i] !== '_';
        }
        if (needQuotes) {
            addr += '\'';
            addr += name.replace('\'', '\'\'');
            addr += '\'';
        }
        else {
            addr += name;
        }
        addr += '!';
    }
    return addr;
}
function eg_address(row, col, absNum, a1, sheetText) {
    var rowRelative = (absNum === 3 || absNum === 4 || absNum === 7 || absNum === 8);
    var colRelative = (absNum === 2 || absNum === 4 || absNum === 6 || absNum === 8);
    var addr = '';
    if (row < 1 && (a1 || !rowRelative) || row > maxRowCount ||
        col < 1 && (a1 || !colRelative) || col > maxColumnCount || absNum < 1 || 8 < absNum) {
        return CalcErrorsValue;
    }
    addr = appendExternalName(addr, sheetText);
    if (a1) {
        addr = appendA1Letter(addr, col, colRelative);
        addr = appendA1Number(addr, row, rowRelative);
    }
    else {
        addr = appendR1C1Number(addr, 'R', row, rowRelative);
        addr = appendR1C1Number(addr, 'C', col, colRelative);
    }
    return addr;
}
function addDynamicRef(context, reference, row, col, rowCount, columnCount) {
    if (!context || !context.identity) {
        return;
    }
    var baseRow = context.identity.row, baseCol = context.identity.col;
    var cellCalc = context.source.getCalcSourceModel()._getCellCalc(baseRow, baseCol);
    var source = reference.getSource();
    if (cellCalc && source.getRangeKey) {
        var r = { id: source.id, row: row, col: col, rowCount: rowCount, colCount: columnCount };
        var key = source.getRangeKey(source, r);
        if (!cellCalc._newDetectedDynamicCreatedRanges) {
            cellCalc._newDetectedDynamicCreatedRanges = {};
        }
        cellCalc._newDetectedDynamicCreatedRanges[key] = r;
    }
}
function eg_index(context, range, row, column, area) {
    function argumentValid(arg) {
        return !isNullOrUndefined(arg) && !arg._error;
    }
    var INVALID_PARA = keyword_null;
    var evaluateContext = context;
    var acceptsReference = evaluateContext !== keyword_null ? (evaluateContext.acceptsReference) : false;
    var arrayFormulaMode = evaluateContext !== keyword_null ? (evaluateContext.arrayFormulaMode) : false;
    if (range instanceof CalcEngine_1.CalcReference) {
        var intValue = { value: -1 }, reference = range;
        if (area === keyword_undefined) {
            area = 1;
        }
        area = argumentValid(area) && CalcConvert_tryToInt(area, intValue) ? intValue.value - 1 : INVALID_PARA;
        if (area >= reference.getRangeCount()) {
            return CalcErrorsReference;
        }
        if (area === INVALID_PARA || area < 0) {
            return CalcErrorsValue;
        }
        var arrayRowCount = reference.getRowCount(area), arrayColumnCount = reference.getColumnCount(area);
        var arrayRow = reference.getRow(area), arrayCol = reference.getColumn(area);
        var offsetRow = void 0, offsetCol = void 0;
        if (arrayHelper_getLength(arguments) === 3) {
            if (arrayRowCount !== 1 && arrayColumnCount !== 1) {
                return CalcErrorsReference;
            }
            if (arrayColumnCount !== 1) {
                column = row;
                row = 1;
            }
            else if (arrayRowCount !== 1) {
                column = 1;
            }
        }
        if (row === keyword_undefined) {
            row = 0;
        }
        row = argumentValid(row) && CalcConvert_tryToInt(row, intValue) ? intValue.value - 1 : INVALID_PARA;
        if (row === -1) {
            if (arrayRowCount !== 1 && !acceptsReference && !arrayFormulaMode && (arrayRow > evaluateContext.row || evaluateContext.row >= arrayRow + arrayRowCount)) {
                return CalcErrorsValue;
            }
        }
        else if (row < -1 || row === INVALID_PARA) {
            return CalcErrorsValue;
        }
        else if (arrayRowCount <= row) {
            return CalcErrorsReference;
        }
        else {
            offsetRow = row + arrayRow;
        }
        if (column === keyword_undefined) {
            column = 0;
        }
        column = argumentValid(column) && CalcConvert_tryToInt(column, intValue) ? intValue.value - 1 : INVALID_PARA;
        if (column === -1) {
            if (arrayColumnCount !== 1 && !acceptsReference && !arrayFormulaMode && (arrayCol > evaluateContext.column || evaluateContext.column >= arrayCol + arrayColumnCount)) {
                return CalcErrorsValue;
            }
        }
        else if (column < -1 || column === INVALID_PARA) {
            return CalcErrorsValue;
        }
        else if (arrayColumnCount <= column) {
            return CalcErrorsReference;
        }
        else {
            offsetCol = column + arrayCol;
        }

        if (row === -1 && column === -1) {
            offsetRow = arrayRow;
            offsetCol = arrayCol;
        }
        else if (row === -1) {
            offsetRow = arrayRow;
            arrayColumnCount = 1;
        }
        else if (column === -1) {
            offsetCol = arrayCol;
            arrayRowCount = 1;
        }
        else {
            arrayColumnCount = 1;
            arrayRowCount = 1;
        }
        addDynamicRef(context, reference, offsetRow, offsetCol, arrayRowCount, arrayColumnCount);
        return reference.create([createRange(offsetRow, offsetCol, arrayRowCount, arrayColumnCount)]);
    }
    else if (CalcEngine_1.Convert._isArray(range)) {
        var array = range;
        var arrayRowCount = array.getRowCount();
        row = row !== keyword_undefined ? CalcConvert_toInt(row) : -1;
        column = column !== keyword_undefined ? CalcConvert_toInt(column) : -1;
        area = area !== keyword_undefined ? (CalcConvert_toInt(area) - 1) : 1;
        if (area !== 1) {
            return CalcErrorsReference;
        }
        if (row === -1 && column === -1) {
            row = column = 0;
        }
        else if (column === -1 && arrayRowCount === 1) {
            column = row;
            row = 1;
        }
        row = row === -1 ? 0 : row;
        column = column === -1 ? 0 : column;
        arrayRowCount = array.getRowCount();
        var arrayColumnCount = array.getColumnCount();
        if (row < 0 || column < 0 || area < 0) {
            return CalcErrorsValue;
        }
        if (row > arrayRowCount && arrayRowCount === 1 && column === keyword_undefined) {
            column = row;
            row = 0;
        }
        if (arrayRowCount < row || arrayColumnCount < column) {
            return CalcErrorsReference;
        }
        if (row === 0 && column === 0) {
            return array.slice(0, 0, arrayRowCount, arrayColumnCount);
        }
        else if (row === 0) {
            return array.slice(0, column - 1, arrayRowCount, 1);
        }
        else if (column === 0) {
            return array.slice(row - 1, 0, 1, arrayColumnCount);
        }
        return array.getValue(row - 1, column - 1);
    }
}
function eg_offset(context, reference, rows, columns, height, width) {
    if (!context) {
        return CalcErrorsNotAvailable;
    }
    if (!reference || !(reference instanceof CalcEngine_1.CalcReference) || reference.getRangeCount() !== 1) {
        return CalcErrorsValue;
    }
    height = height !== keyword_undefined ? CalcConvert_toInt(height) : reference.getRowCount(0);
    width = width !== keyword_undefined ? CalcConvert_toInt(width) : reference.getColumnCount(0);
    var offsetRow = reference.getRow(0) + rows;
    var offsetColumn = reference.getColumn(0) + columns;
    if (height <= 0 || width <= 0 || offsetRow < 0 ||
        offsetColumn < 0) {
        return CalcErrorsReference;
    }
    var result = reference.create([{ row: offsetRow, col: offsetColumn, rowCount: height, colCount: width }]);
    addDynamicRef(context, reference, offsetRow, offsetColumn, height, width);
    return result;
}
function eg_indirect(context, reference, useA1) {
    if (!context) {
        return CalcErrorsNotAvailable;
    }
    if (!reference) {
        return CalcErrorsReference;
    }
    var baseRow = context.row, baseCol = context.column,
    baseIdentity = { row: baseRow, col: baseCol };


    var parser = context.parser;
    if (!parser) {
        parser = context.parser = new CalcEngine_1.Parser();
    }
    var src = context.source;
    var parserContext = src.parserContext;
    if (!parserContext) {
        src.parserContext = parserContext = context.source ? context.source.getParserContext(!useA1, baseIdentity) : new CalcEngine_1.ParserContext(context.source, !useA1, baseIdentity);
        parserContext.onlyValidateSourceNameWithSpecial = true;
    }
    else {
        parserContext.useR1C1 = !useA1;
        parserContext.row = baseIdentity && baseIdentity.row || 0;
        parserContext.column = baseIdentity && baseIdentity.col || 0;
        parserContext.baseIdentity = baseIdentity;
        parserContext.source = context.source;
    }
    var expression, source;
    if (useA1) {
        expression = parser.parse(parserContext, reference);
    }
    else {
        var expressions = src.expressions;
        if (!expressions) {
            expressions = src.expressions = {};
        }
        expression = expressions[reference];
        if (!expression) {
            expression = parser.parse(parserContext, reference);
            expressions[reference] = expression;
        }
    }
    if (expression) {
        if (expression.type === 8 ) {
            if (expression.source) {
                source = expression.source;
                expression = source.getCustomName(expression.value);
            }
            else {
                expression = context.getName(expression.value);
            }
        }
        if (!expression || Types._inArray(expression.type, [1 , 13 ]) < 0) {
            return CalcErrorsReference;
        }
        source = expression.source || context.source;
        if (expression.type === 25 || expression.type === 26 ) {
            return source.getValueByName(expression.nameIdentity);
        }
        var range = expression.getRange(baseRow, baseCol);
        if (expression.type === 13 ) {
            source = expression.source;
        }


        var cellCalc = context.source.getCalcSourceModel()._getCellCalc(context.identity.row, context.identity.col);
        var t = null;
        t = source.getReference(range);


        range.id = source.id;
        if (cellCalc && source.getRangeKey) {
            var key = source.getRangeKey(source, range);
            if (!cellCalc._newDetectedDynamicCreatedRanges) {
                cellCalc._newDetectedDynamicCreatedRanges = {};
            }
            cellCalc._newDetectedDynamicCreatedRanges[key] = range;
        }
        return t;
    }
    return CalcErrorsReference;
}
function eg_hyperlink(link_location, friendly_name) {
    var hyperlinkText, proto = '__proto__';
    if (arguments.length === 2) {
        hyperlinkText = CalcConvert_toString(friendly_name);
    }
    else {
        hyperlinkText = CalcConvert_toString(link_location);
    }

    hyperlinkText[proto].hyperlink = CalcConvert_toString(link_location);
    return hyperlinkText;
}
function eg_areas() {
    var i, count = 0;
    for (i = 0; i < arrayHelper_getLength(arguments); i++) {
        if (arguments[i].length === 0) {
            return CalcErrorsNull;
        }
        if (arguments[i].isReference) {
            count += arguments[i].rangeCount;
        }
    }
    return count;
}
function eg_formulatext(context, reference) {
    var row = reference.getRow(0);
    var col = reference.getColumn(0);
    var formula = reference.getSource().getCalcSourceModel().getFormula(row, col);
    if (formula) {
        return '=' + formula;
    }
    return CalcErrorsNotAvailable;
}
function eg_isformula(context, reference) {
    var row = reference.getRow(0);
    var col = reference.getColumn(0);
    var formula = reference.getSource().getCalcSourceModel().getFormula(row, col);
    if (formula) {
        return true;
    }
    return false;
}
function convertArray(src, by_col) {
    if (by_col === void 0) { by_col = false; }
    var data;
    if (CalcConvert_isReference(src) || CalcConvert_isArray(src)) {
        data = src.toArray(0 , false );
    }
    else if (src.length && src[0].length) {
        data = src;
    }
    if (data) {
        return transformArray(data, by_col);
    }
    return CalcConvert_isError(src) ? src : CalcErrorsValue;
}

function transformArray(array, switchRowColumn) {
    if (switchRowColumn === void 0) { switchRowColumn = false; }
    var _a;
    var rows = array.rowCount, cols = array.colCount;
    if (!rows && !cols) {
        rows = array.length;
        cols = array[0].length;
    }
    var result = array;
    if (switchRowColumn) {
        result = [];
        for (var c = 0; c < cols; c++) {
            var items = [];
            result.push(items);
            for (var r = 0; r < rows; r++) {
                items.push(array[r][c]);
            }
        }
        _a = [cols, rows], rows = _a[0], cols = _a[1];
    }
    result.rowCount = rows;
    result.colCount = cols;
    return result;
}
function isValidSort(value) {
    return value === 1 || value === -1;
}
function doSort(array, sortInfos) {
    var sortCount = sortInfos.length;
    array.sort(function (a, b) {
        for (var i = 0; i < sortCount; i++) {
            var sortInfo = sortInfos[i], index = sortInfo[0];
            var result = CalcEngine_1._doCompare(a[index], b[index]);
            if (result !== 0) {
                return sortInfo[1] ? result : -result;
            }
        }
        return 0;
    });
}
function mergeArray(array1, array2, dataInRow) {
    if (dataInRow) {
        array1.forEach(function (item, index) {
            item.push(array2[index][0]);
        });
    }
    else {
        var data1_1 = array2[0];
        array1.forEach(function (item, index) {
            item.push(data1_1[index]);
        });
    }
}
function isNumberArray(value) {
    if (value && value.length && value.length >= 0) {
        for (var i = 0; i < value.length; i++) {
            if (typeof value[i] !== 'number') {
                return false;
            }
        }
        return true;
    }
    return false;
}
function eg_sort(arrayOrReference, sort_index, sort_order, by_col) {
    if (sort_index === void 0) { sort_index = 1; }
    if (sort_order === void 0) { sort_order = 1; }
    if (by_col === void 0) { by_col = false; }
    var array = [].concat(convertArray(arrayOrReference, by_col));
    if (CalcConvert_isError(array)) {
        return array;
    }
    var data = array;

    var sortSettings = [], i;
    var orders, defaultOrder;

    if (CalcConvert_isReference(sort_index) || CalcConvert_isArray(sort_index)) {
        var indexes = sort_index.toArray(0 , false );
        var rowCount = indexes.rowCount, colCount = indexes.colCount;
        var orderCount = 0;
        if (CalcConvert_isReference(sort_order) || CalcConvert_isArray(sort_order)) {
            orders = sort_order.toArray(0 , false );
            orderCount = orders.rowCount;
            if (colCount !== 1) {
                if (colCount < 1 || !(orders.colCount === 1 || orders.colCount === colCount) || (rowCount !== 1 || !isNumberArray(indexes[0]))) {
                    return CalcErrorsValue;
                }
                var args = [];
                args.push(arrayOrReference);
                if (by_col) {
                    data = transformArray(data, by_col);
                    for (var j = 0; j < colCount; j++) {
                        var calcDataArray = [];
                        for (var k = 0; k < data[0].length; k++) {
                            calcDataArray.push(data[indexes[0][j] - 1][k]);
                        }
                        args.push(new CalcEngine_1.CalcArray([calcDataArray]));
                        if (orderCount === 1) {
                            args.push(orders[0][0]);
                        }
                        else {
                            args.push(orders[j][0]);
                        }
                    }
                }
                else {
                    for (var j = 0; j < colCount; j++) {
                        var calcDataArray = [];
                        for (var k = 0; k < data.length; k++) {
                            calcDataArray.push([data[k][indexes[0][j] - 1]]);
                        }
                        args.push(new CalcEngine_1.CalcArray(calcDataArray));
                        if (orderCount === 1) {
                            args.push(orders[0][0]);
                        }
                        else {
                            args.push(orders[j][0]);
                        }
                    }
                }
                return eg_sortby.apply(eg_sortby, args);
            }
            if (orders.colCount !== 1 || (orderCount !== 1 && orderCount !== rowCount)) {
                return CalcErrorsValue;
            }
            if (orderCount === 1) {
                orderCount = 0;
                defaultOrder = orders[0][0];
            }
        }
        else {
            defaultOrder = sort_order;
        }
        for (i = 0; i < rowCount; i++) {
            sortSettings.push([indexes[i][0], i < orderCount ? orders[i][0] : defaultOrder]);
        }
    }
    else {
        if (CalcConvert_isReference(sort_order) || CalcConvert_isArray(sort_order)) {
            orders = sort_order.toArray(0 , false );
            if (orders.colCount !== 1 || orders.rowCount !== 1) {
                return CalcErrorsValue;
            }
            sortSettings.push([sort_index, orders[0][0]]);
        }
        else {
            sortSettings.push([sort_index, sort_order]);
        }
    }

    var maxBound = data.colCount, sortInfos = [];
    for (var _i = 0, sortSettings_1 = sortSettings; _i < sortSettings_1.length; _i++) {
        var settingItem = sortSettings_1[_i];
        var index = settingItem[0], order = settingItem[1];
        if (index < 1 || index > maxBound || !isValidSort(order)) {
            return CalcErrorsValue;
        }
        sortInfos.push([index - 1, order === 1]);
    }
    doSort(data, sortInfos);
    return new CalcEngine_1.CalcArray(by_col ? transformArray(data, by_col) : data);
}
function eg_sortby(arrayOrReference, by_array1, sort_order1) {
    if (sort_order1 === void 0) { sort_order1 = 1; }
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }


    var array, reference, row = 0, col = 0;
    var errorValueResult = CalcErrorsValue;
    if (CalcConvert_isArray(arrayOrReference)) {
        array = arrayOrReference;
    }
    else if (CalcConvert_isReference(arrayOrReference)) {
        reference = arrayOrReference;
        row = reference.getRow();
        col = reference.getColumn();
    }
    var src = array || reference;
    if (src) {
        var colCount = src.getColumnCount(), rowCount = src.getRowCount();
        if (CalcConvert_isError(arrayOrReference)) {
            return errorValueResult;
        }
        var sortInfos = [], dataInRow = void 0, dataKind = 0, additionalCount_1 = 0;
        var sort_index = void 0;
        var data = void 0;
        for (var i = 1, count = arguments.length; i < count; i += 2) {
            var sortByItem = arguments[i];
            var array2 = [].concat(convertArray(sortByItem));
            if (CalcConvert_isError(array2)) {
                return errorValueResult;
            }
            var rc2 = sortByItem.getRowCount(), cc2 = sortByItem.getColumnCount();
            if (!dataKind) {
                dataInRow = cc2 === 1;
                dataKind = dataInRow ? 2 : 1;
                data = [].concat(convertArray(arrayOrReference, !dataInRow));
            }
            if (!(!dataInRow && rc2 === 1 && cc2 === colCount || (dataInRow && cc2 === 1 && rc2 === rowCount))) {
                return errorValueResult;
            }
            var needAddtionalData = CalcConvert_isArray(sortByItem);
            if (CalcConvert_isReference(sortByItem)) {
                var diff = void 0;
                if (dataInRow) {
                    var c = sortByItem.getColumn();
                    diff = col - c;
                    if (diff >= 0 && diff < colCount) {
                        sort_index = diff;
                    }
                    else {
                        needAddtionalData = true;
                    }
                }
                else {
                    var r = sortByItem.getRow();
                    diff = row - r;
                    if (diff >= 0 && diff < rowCount) {
                        sort_index = diff;
                    }
                    else {
                        needAddtionalData = true;
                    }
                }
            }

            if (needAddtionalData) {
                additionalCount_1 += 1;
                sort_index = dataInRow ? colCount++ : rowCount++;
                mergeArray(data, array2, dataInRow);
            }
            var sortOrder = arguments[i + 1] || 1;
            if (!isValidSort(sortOrder)) {
                return errorValueResult;
            }
            sortInfos.push([sort_index, sortOrder === 1]);
        }
        doSort(data, sortInfos);
        if (additionalCount_1) {
            data.forEach(function (item) {
                item.length -= additionalCount_1;
            });
        }
        return new CalcEngine_1.CalcArray(dataInRow ? data : transformArray(data, true));
    }
    return errorValueResult;
}
function isEqual(item1, item2) {
    if (item1 === item2 ||
        isDate(item1) && isDate(item2) && (toOADate(item1) === toOADate(item2)) ||
        CalcConvert_isError(item1) && CalcConvert_isError(item2) && item1._code === item2._code) {
        return true;
    }
    return false;
}
function isDuplicated(array1, array2) {
    for (var index = 0, len = array1.length; index < len; index++) {
        var val1 = array1[index], val2 = array2[index];
        if (!isEqual(val1, val2)) {
            return false;
        }
    }
    return true;
}
function eg_unique(arrayOrReference, by_col, occurs_once) {
    if (by_col === void 0) { by_col = false; }
    if (occurs_once === void 0) { occurs_once = false; }
    var array = convertArray(arrayOrReference, by_col);
    if (CalcConvert_isError(array)) {
        return array;
    }
    var data = array;
    var result = [], count = data.rowCount;
    data.forEach(function (current, index) {
        if (!current.duplicated) {
            var c = 0;
            for (var i = index + 1; i < count; i++) {
                var item = data[i];
                if (isDuplicated(current, item)) {
                    item.duplicated = true;
                    c++;
                }
            }
            if (!occurs_once || (c === 0)) {
                result.push(current);
            }
        }
    });
    return new CalcEngine_1.CalcArray(by_col ? transformArray(result, by_col) : result);
}
function eg_filter(arrayOrReference, include, if_empty) {
    var array = convertArray(arrayOrReference);
    if (CalcConvert_isError(array)) {
        return array;
    }
    var data = array;
    var matches = [].concat(convertArray(include));
    var result = [];
    if (matches.length === 1 && matches[0].length === data[0].length) {
        data.forEach(function (value, index) {
            var arr = [];
            value.forEach(function (v, i) {
                if (matches[0][i]) {
                    arr.push(v);
                }
            });
            result.push(arr);
        });
    }
    else {
        data.forEach(function (value, index) {
            if (matches[index][0]) {
                result.push(value);
            }
        });
    }
    if (result.length === 0) {
        if (!isNullOrUndefined(if_empty)) {
            return if_empty;
        }

        return CalcErrorsCalc;
    }
    return new CalcEngine_1.CalcArray(result);
}
function eg_single(context, value) {
    if (CalcConvert_isArray(value)) {
        return value.getValue(0, 0);
    }
    else if (CalcConvert_isReference(value)) {
        var reference = value;
        var col = reference.getColumn(), row = reference.getRow(), colCount = reference.getColumnCount(), rowCount = reference.getRowCount();
        var r = context.row, c = context.column, rowOffset = r - row, columnOffset = c - col;
        var isSameSource = context.source === reference.getSource();
        if (rowCount === 1 && (!isSameSource || row !== r) && (columnOffset >= 0 && columnOffset < colCount)) {
            return reference.getValue(0, 0, columnOffset);
        }
        else if (colCount === 1 && (!isSameSource || col !== c) && (rowOffset >= 0 && rowOffset < rowCount)) {
            return reference.getValue(0, rowOffset, 0);
        }
        else if (rowCount === 1 && colCount === 1) {
            return reference.getValue(0, 0, 0);
        }
        return CalcErrorsValue;
    }
    return value;
}


var boolArgDefaultValue = { _defaultValue: true, _argType: 7 }, boolArgDefaultValue2 = { _argType: 7 }, stringIntArgDefaultValue = { _argType: 2 }, stringIntArgDefaultValueNone = { _argType: 2 },
stringIntArgDefaultValue1 = { _defaultValue: 1, _argType: 2 }, stringIntArgDefaultValue2 = {
    _argType: 2 ,
    _argCondition: '<= 0',
    _conditionErrorValue: CalcErrorsValue
}, arrayArgDefaultValue = { _argType: 4 , _valueType: 0 , _toOneDimension: true };

defineBuiltInFunction('ADDRESS', eg_address, 2, 5, [stringIntArgDefaultValue, stringIntArgDefaultValue,
    stringIntArgDefaultValue1, boolArgDefaultValue, { _defaultValue: '', _argType: 5 }], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [2, 3, 4] });
defineBuiltInFunction('INDEX', eg_index, 2, 4, keyword_undefined, 0, 0, {
    _acceptsMissingArgument: [1, 2, 3],
    _skipPrecedent: [0],
    _isContextSensitive: true,
    _arrayArgumentEvaluateMode: 3
});
defineBuiltInFunction('OFFSET', eg_offset, 3, 5, [{}, stringIntArgDefaultValue, stringIntArgDefaultValue], 0, 0, {
    _acceptsMissingArgument: [3, 4],
    _skipPrecedent: [0],
    _isContextSensitive: true,

    _arrayArgumentEvaluateMode: 2 ,
    returnReference: true
});
defineBuiltInFunction('ROW', eg_row, 0, 1, keyword_undefined, -1, keyword_undefined, { _isContextSensitive: true, _skipPrecedent: -1, expandColumns: false });
defineBuiltInFunction('COLUMN', eg_column, 0, 1, keyword_undefined, -1, keyword_undefined, { _acceptsMissingArgument: 0, _isContextSensitive: true, _skipPrecedent: -1, expandRows: false });
defineBuiltInFunction('ROWS', eg_rows, 1, 1, keyword_undefined, -1, -1, { _skipPrecedent: -1, expandColumns: false, _isVolatile: true });
defineBuiltInFunction('COLUMNS', eg_columns, 1, 1, keyword_undefined, -1, -1, { _skipPrecedent: -1, expandRows: false, _isVolatile: true });
defineBuiltInFunction('TRANSPOSE', eg_transpose, 1, 1, keyword_undefined, -1, -1);
defineBuiltInFunction('LOOKUP', eg_lookup, 2, 3, [arrayArgDefaultValue, { _argType: 4 , _valueType: 0 , _toOneDimension: true, _followFormatter: true }], '!= 0', '!= 0', { _arrayArgumentEvaluateMode: 1 });
defineBuiltInFunction('HLOOKUP', eg_hlookup, 3, 4, [arrayArgDefaultValue, {}, stringIntArgDefaultValue2, boolArgDefaultValue2], 1, 1, {
    _isContextSensitive: true,
    _skipPrecedent: [1],
});
defineBuiltInFunction('VLOOKUP', eg_vlookup, 3, 4, [arrayArgDefaultValue, {}, stringIntArgDefaultValue2, boolArgDefaultValue2], 1, 1, {
    _isContextSensitive: true,
    _skipPrecedent: [1],
    _zeroToNullInConcatOperator: true
});
defineBuiltInFunction('XLOOKUP', eg_xlookup, 3, 6, [
    arrayArgDefaultValue,
    {},
    {},
    { _argType: 5 },
    { _argType: 2 , _defaultValue: 0 },
    { _argType: 2 , _defaultValue: 1 },
], [1, 2], [1, 2], {
    _acceptsMissingArgument: [3, 4, 5]
});
defineBuiltInFunction('CHOOSE', eg_choose, 2, 255, stringIntArgDefaultValue, '>= 1', '>= 1', {
    _acceptsError: '>= 1',
    isBranch: true,
    findTestArgument: 0,
    findBranchArgument: function (test) {
        var retValue = { value: -1 };
        if (CalcConvert_isError(test)) {
            return -1;
        }
        CalcConvert_tryToInt(test, retValue);
        return retValue.value;
    }
});
defineBuiltInFunction('MATCH', eg_match, 2, 3, [arrayArgDefaultValue, arrayArgDefaultValue, stringIntArgDefaultValueNone], 1, 1, {});
defineBuiltInFunction('XMATCH', eg_xmatch, 2, 4, [arrayArgDefaultValue, arrayArgDefaultValue, stringIntArgDefaultValueNone, stringIntArgDefaultValueNone], 1, 1, {});
defineBuiltInFunction('INDIRECT', eg_indirect, 1, 2, [{ _argType: 5 }, boolArgDefaultValue], keyword_undefined, keyword_undefined, {
    _acceptsMissingArgument: 2,

    _isContextSensitive: true
});
defineBuiltInFunction('HYPERLINK', eg_hyperlink, 1, 2);
defineBuiltInFunction('AREAS', eg_areas, 1, keyword_undefined, {
    _argType: 4 ,
    _toOneDimension: true,
    _breakOnError: true,
    _isAllArgsSameLimit: true
}, -1 , -1 );
defineBuiltInFunction('FORMULATEXT', eg_formulatext, 1, 1, keyword_undefined, -1, keyword_undefined, {
    _isContextSensitive: true
});
defineBuiltInFunction('ISFORMULA', eg_isformula, 1, 1, keyword_undefined, -1, keyword_undefined, {
    _isContextSensitive: true
});

defineBuiltInFunction('SORT', eg_sort, 1, 4, keyword_undefined, [0, 1, 2], [0, 1, 2], { _acceptsMissingArgument: [1, 2, 3] }, true);

defineBuiltInFunction('SORTBY', eg_sortby, 2, keyword_undefined, keyword_undefined, [0, '%= 1'], [0, '%= 1'], keyword_undefined, true);

defineBuiltInFunction('UNIQUE', eg_unique, 1, 3, keyword_undefined, [0], [0], { _acceptsMissingArgument: [1, 2] }, true);

defineBuiltInFunction('FILTER', eg_filter, 2, 3, keyword_undefined, [0, 1, 2], [0, 1, 2], keyword_undefined, true);

defineBuiltInFunction('@', eg_single, 1, 1, keyword_undefined, [0], [0], { _isContextSensitive: true }, true);
 }),

 './src/functions-stat.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Common_1 = __webpack_require__( 'Common');
var CalcEngine_1 = __webpack_require__( 'CalcEngine');
var arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength;
var keyword_null = null, keyword_undefined = void 0, isNaNFunc = isNaN, isFiniteFunc = isFinite, parseIntFunc = parseInt;
var Math_pow = Math.pow, Math_max = Math.max, Math_min = Math.min, Math_floor = Math.floor, Math_sin = Math.sin, Math_tan = Math.tan, Math_PI = Math.PI, Math_atan = Math.atan, Math_exp = Math.exp, Math_abs = Math.abs, Math_sqrt = Math.sqrt, Math_log = Math.log, Math_round = Math.round;
var CalcErrorsDivideByZero = CalcEngine_1.Errors.DivideByZero, CalcErrorsValue = CalcEngine_1.Errors.Value, CalcErrorsNotAvailable = CalcEngine_1.Errors.NotAvailable, CalcErrorsNumber = CalcEngine_1.Errors.Number, CalcErrorsNull = CalcEngine_1.Errors.Null;
var CalcConvert_toResult = CalcEngine_1.Convert._toResult, CalcConvert_toArray = CalcEngine_1.Convert._toArray, CalcConvert_toInt = CalcEngine_1.Convert._toInt, CalcConvert_toDouble = CalcEngine_1.Convert._toDouble, CalcConvert_isReference = CalcEngine_1.Convert._isReference;
var MathHelper = CalcEngine_1.Functions.MathHelper, combin = MathHelper._combin, parseCriteria = MathHelper._parseCriteria;
var CalcConvert_isNumber = CalcEngine_1.Convert._isNumber, CalcConvert_isError = CalcEngine_1.Convert._isError;
var st_includeSubtotals = CalcEngine_1.Functions._st_includeSubtotals, st_devVarIncludeSubtotals = CalcEngine_1.Functions._st_devVarIncludeSubtotals, st_includeAggregateMulti = CalcEngine_1.Functions._st_includeAggregateMulti, st_normsdist = CalcEngine_1.Functions._st_normsdist, isBoolean = CalcEngine_1.Functions._isBoolean, isString = CalcEngine_1.Functions._isString, Functions_isNumber = CalcEngine_1.Functions._isNumber, MAX_DOUBLE_VALUE = CalcEngine_1.Functions._MAX_DOUBLE_VALUE;
var CalcConvertedError = CalcEngine_1.Convert.CalcConvertedError;
var defineBuiltInFunction = CalcEngine_1.Functions._defineBuiltInFunction;
var _tryToDouble = CalcEngine_1.Convert._tryToDouble, _tryToInt = CalcEngine_1.Convert._tryToInt;

function arrayHelper_getLengthWithoutEmpty(array) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== CalcConvertedError) {
            count++;
        }
    }
    return count;
}
function normDistCumulative(z) {
    var Z_MAX = 6.0;
    var x;
    if (z === 0.0) {
        x = 0.0;
    }
    else {
        var y = 0.5 * Math.abs(z);
        if (y >= (Z_MAX * 0.5)) {
            x = 1.0;
        }
        else if (y < 1.0) {
            var w = y * y;
            x = ((((((((0.000124818987 * w
                - 0.001075204047) * w + 0.005198775019) * w
                - 0.019198292004) * w + 0.059054035642) * w
                - 0.151968751364) * w + 0.319152932694) * w
                - 0.531923007300) * w + 0.797884560593) * y * 2.0;
        }
        else {
            y -= 2.0;
            x = (((((((((((((-0.000045255659 * y
                + 0.000152529290) * y - 0.000019538132) * y
                - 0.000676904986) * y + 0.001390604284) * y
                - 0.000794620820) * y - 0.002034254874) * y
                + 0.006549791214) * y - 0.010557625006) * y
                + 0.011630447319) * y - 0.009279453341) * y
                + 0.005353579108) * y - 0.002141268741) * y
                + 0.000535310849) * y + 0.999936657524;
        }
    }
    return z > 0.0 ? ((x + 1.0) * 0.5) : ((1.0 - x) * 0.5);
}
function _getPercentrank(list, fVal, bInclusive) {
    var nSize = arrayHelper_getLength(list);
    var fRes, i;
    if (fVal !== list[0]) {
        var nOldCount = 0;
        var fOldVal = list[0];
        for (i = 1; i < nSize && list[i] < fVal; i++) {
            if (list[i] !== fOldVal) {
                nOldCount = i;
                fOldVal = list[i];
            }
        }
        if (list[i] !== fOldVal) {
            nOldCount = i;
        }
        if (fVal === list[i]) {
            fRes = bInclusive ? nOldCount / (nSize - 1) : (i + 1) / (nSize + 1);
        }
        else if (nOldCount === 0) {
            fRes = 0.0;
        }
        else {
            var fFract = (fVal - list[nOldCount - 1]) / (list[nOldCount] - list[nOldCount - 1]);
            fRes = bInclusive ? ((nOldCount - 1) + fFract) / (nSize - 1) : (nOldCount + fFract) / (nSize + 1);
        }
    }
    else {
        fRes = bInclusive ? 0.0 : 1.0 / (nSize + 1);
    }
    return fRes;
}
function _percentrank(array, xval, significance, bInclusive) {
    var list = [];
    addArrayDataToList(array, list);
    var len = arrayHelper_getLength(list);
    if (len === 0 || xval < list[0] || xval > list[len - 1]) {
        return CalcErrorsNotAvailable;
    }
    var fRes = len === 1 ? 1 : _getPercentrank(list, xval, bInclusive);
    return fRes !== 0.0 ? Math_round(fRes * Math_pow(10, significance)) / Math_pow(10, significance) : fRes;
}
function _betacf(a, b, x) {
    var ITMAX = 300;
    var FPMIN = 1.0E-50;
    var EPSILON = 1.0E-20;
    var qab = a + b;
    var qap = a + 1.0;
    var qam = a - 1.0;
    var c = 1.0;
    var d = 1.0 - qab * x / qap;
    if (Math_abs(d) < FPMIN) {
        d = FPMIN;
    }
    d = 1.0 / d;
    var retval = d;
    for (var m = 1; m <= ITMAX; m++) {
        var m2 = m + m;
        var aa = (b - m) * m * x / ((qam + m2) * (a + m2));
        d = 1.0 + aa * d;
        if (Math_abs(d) < FPMIN) {
            d = FPMIN;
        }
        c = 1.0 + aa / c;
        if (Math_abs(c) < FPMIN) {
            c = FPMIN;
        }
        d = 1.0 / d;
        retval *= d * c;
        aa = 0.0 - (a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
        d = 1.0 + aa * d;
        if (Math_abs(d) < FPMIN) {
            d = FPMIN;
        }
        c = 1.0 + aa / c;
        if (Math_abs(c) < FPMIN) {
            c = FPMIN;
        }
        d = 1.0 / d;
        var del = d * c;
        retval *= del;
        if (Math_abs(del - 1.0) < EPSILON) {
            break;
        }
    }
    return (retval);
}
function _d1mach(i) {
    var dataArray = [2.2250738585072014e-308, 1.7976931348623158e+308, Math_pow(2.0, -53.0),
        Math_pow(2.0, 1.0 - 53.0), MathHelper._log(2, 10)];
    return dataArray[i - 1] || 0;
}
function _chebyshev_init(dos, nos, eta) {
    var i = 0, err = 0;
    if (nos < 1) {
        return 0;
    }
    for (var ii = 1; ii <= nos; ii++) {
        i = nos - ii;
        err += Math_abs(CalcConvert_toDouble(dos[i]));
        if (err > eta) {
            return i;
        }
    }
    return i;
}
function _chebyshev_eval(x, a, n) {
    if (n < 1 || n > 1000 || x < -1.1 || x > 1.1) {
        return NaN;
    }
    var twox = x * 2;
    var b1, b2;
    b2 = b1 = 0;
    var b0 = 0;
    for (var i = 1; i <= n; i++) {
        b2 = b1;
        b1 = b0;
        b0 = twox * b1 - b2 + CalcConvert_toDouble(a[n - i]);
    }
    return (b0 - b2) * 0.5;
}
function _lgammacor(x) {
    var algmcs = [0.1666389480451863247205729650822, -0.1384948176067563840732986059135e-4,
        0.9810825646924729426157171547487e-8, -0.1809129475572494194263306266719e-10,
        0.6221098041892605227126015543416e-13, -0.3399615005417721944303330599666e-15,
        0.2683181998482698748957538846666e-17, -0.2868042435334643284144622399999e-19,
        0.3962837061046434803679306666666e-21, -0.6831888753985766870111999999999e-23,
        0.1429227355942498147573333333333e-24, -0.3547598158101070547199999999999e-26,
        0.1025680058010470912000000000000e-27, -0.3401102254316748799999999999999e-29,
        0.1276642195630062933333333333333e-30];
    var nalgm = _chebyshev_init(algmcs, 15, _d1mach(3)), xbig = 1.0 / Math_sqrt(_d1mach(3)), xmax = Math_exp(Math_min(Math_log(_d1mach(2) / 12.0), -Math_log(12.0 * _d1mach(1))));
    if (x < 10.0) {
        return NaN;
    }
    else if (x >= xmax) {
        return 4.930380657631324e-32 ;
    }
    else if (x < xbig) {
        var tmp = 10.0 / x;
        return _chebyshev_eval(tmp * tmp * 2.0 - 1.0, algmcs, nalgm) / x;
    }
    return 1.0 / (x * 12.0);
}
function _logrelerr(x) {
    var alnrcs = [0.10378693562743769800686267719098e+1, -0.13364301504908918098766041553133,
        0.19408249135520563357926199374750e-1, -0.30107551127535777690376537776592e-2,
        0.48694614797154850090456366509137e-3, -0.81054881893175356066809943008622e-4,
        0.13778847799559524782938251496059e-4, -0.23802210894358970251369992914935e-5,
        0.41640416213865183476391859901989e-6, -0.73595828378075994984266837031998e-7,
        0.13117611876241674949152294345011e-7, -0.23546709317742425136696092330175e-8,
        0.42522773276034997775638052962567e-9, -0.77190894134840796826108107493300e-10,
        0.14075746481359069909215356472191e-10, -0.25769072058024680627537078627584e-11,
        0.47342406666294421849154395005938e-12, -0.87249012674742641745301263292675e-13,
        0.16124614902740551465739833119115e-13, -0.29875652015665773006710792416815e-14,
        0.55480701209082887983041321697279e-15, -0.10324619158271569595141333961932e-15,
        0.19250239203049851177878503244868e-16, -0.35955073465265150011189707844266e-17,
        0.67264542537876857892194574226773e-18, -0.12602624168735219252082425637546e-18,
        0.23644884408606210044916158955519e-19, -0.44419377050807936898878389179733e-20,
        0.83546594464034259016241293994666e-21, -0.15731559416479562574899253521066e-21,
        0.29653128740247422686154369706666e-22, -0.55949583481815947292156013226666e-23,
        0.10566354268835681048187284138666e-23, -0.19972483680670204548314999466666e-24,
        0.37782977818839361421049855999999e-25, -0.71531586889081740345038165333333e-26,
        0.13552488463674213646502024533333e-26, -0.25694673048487567430079829333333e-27,
        0.48747756066216949076459519999999e-28, -0.92542112530849715321132373333333e-29,
        0.17578597841760239233269760000000e-29, -0.33410026677731010351377066666666e-30,
        0.63533936180236187354180266666666e-31];
    var nlnrel = _chebyshev_init(alnrcs, 43, 0.1 * _d1mach(3));
    if (x <= -1) {
        return NaN;
    }
    if (Math_abs(x) <= 0.375) {
        return x * (1.0 - x * _chebyshev_eval(x / 0.375, alnrcs, nlnrel));
    }
    return Math_log(x + 1.0);
}
function _gamma(x) {
    var ga, k, z, r = 1.0;
    var g = [
        1.0,
        0.5772156649015329,
        -0.6558780715202538,
        -0.420026350340952e-1,
        0.1665386113822915,
        -0.421977345555443e-1,
        -0.9621971527877e-2,
        0.7218943246663e-2,
        -0.11651675918591e-2,
        -0.2152416741149e-3,
        0.1280502823882e-3,
        -0.201348547807e-4,
        -0.12504934821e-5,
        0.1133027232e-5,
        -0.2056338417e-6,
        0.6116095e-8,
        0.50020075e-8,
        -0.11812746e-8,
        0.1043427e-9,
        0.77823e-11,
        -0.36968e-11,
        0.51e-12,
        -0.206e-13,
        -0.54e-14,
        0.14e-14
    ];
    if (x > 171.0) {
        return 1e308;
    }
    if (x === CalcConvert_toInt(x)) {
        if (x > 0.0) {
            ga = 1.0;
            for (var i = 2; i < x; i++) {
                ga *= i;
            }
        }
        else {
            ga = 1e308;
        }
    }
    else {
        if (Math_abs(x) > 1.0) {
            z = Math_abs(x);
            var m = CalcConvert_toInt(z);
            r = 1.0;
            for (k = 1; k <= m; k++) {
                r *= (z - k);
            }
            z -= m;
        }
        else {
            z = x;
        }
        var gr = g[24];
        for (k = 23; k >= 0; k--) {
            gr = gr * z + g[k];
        }
        ga = 1.0 / (gr * z);
        if (Math_abs(x) > 1.0) {
            ga *= r;
            if (x < 0.0) {
                ga = -Math_PI / (x * ga * Math_sin(Math_PI * x));
            }
        }
    }
    return ga;
}
function _lgamma(x) {
    var k, n = 0;
    var a = [
        8.333333333333333e-02,
        -2.777777777777778e-03,
        7.936507936507937e-04,
        -5.952380952380952e-04,
        8.417508417508418e-04,
        -1.917526917526918e-03,
        6.410256410256410e-03,
        -2.955065359477124e-02,
        1.796443723688307e-01,
        -1.39243221690590
    ];
    var x0 = x;
    if (x <= 0.0) {
        return 1e308;
    }
    else if ((x === 1.0) || (x === 2.0)) {
        return 0.0;
    }
    else if (x <= 7.0) {
        n = CalcConvert_toInt(7 - x);
        x0 = x + n;
    }
    var x2 = 1.0 / (x0 * x0);
    var xp = 2.0 * Math_PI;
    var gl0 = a[9];
    for (k = 8; k >= 0; k--) {
        gl0 = gl0 * x2 + a[k];
    }
    var gl = gl0 / x0 + 0.5 * Math_log(xp) + (x0 - 0.5) * Math_log(x0) - x0;
    if (x <= 7.0) {
        for (k = 1; k <= n; k++) {
            gl -= Math_log(x0 - 1.0);
            x0 -= 1.0;
        }
    }
    return gl;
}
function _lbeta(a, b) {
    var corr, p, q;
    p = q = a;
    if (b < p) {
        p = b;
    }
    if (b > q) {
        q = b;
    }
    if (p < 0) {
        return NaN;
    }
    if (p === 0) {
        return MAX_DOUBLE_VALUE;
    }
    if (p >= 10.0) {
        corr = _lgammacor(p) + _lgammacor(q) - _lgammacor(p + q);
        return Math_log(q) * -0.5 + 0.918938533204672741780329736406 + corr + (p - 0.5) * Math_log(p / (p + q)) + q * _logrelerr(-p / (p + q));
    }
    if (q >= 10) {
        corr = _lgammacor(q) - _lgammacor(p + q);
        var val = st_gammaln(p);
        if (CalcConvert_isError(val)) {
            return NaN;
        }
        return CalcConvert_toDouble(val) + corr + p - p * Math_log(p + q) + (q - 0.5) * _logrelerr(-p / (p + q));
    }
    return Math_log(_gamma(p) * (_gamma(q) / _gamma(p + q)));
}
function _pbeta_raw(x, pin, qin) {
    var ans, term, xb, xi;
    var n;
    var eps = _d1mach(3);
    var alneps = Math_log(eps);
    var sml = _d1mach(1);
    var alnsml = Math_log(sml);
    var y = x, p = pin, q = qin;
    if (p / (p + q) < x) {
        y = 1.0 - y;
        p = qin;
        q = pin;
    }
    if ((p + q) * y / (p + 1.0) < eps) {
        ans = 0.0;
        xb = p * Math_log(Math_max(y, sml)) - Math_log(p) - _lbeta(p, q);
        if (xb > alnsml && y !== 0.0) {
            ans = Math_exp(xb);
        }
        if (y !== x || p !== pin) {
            ans = 1.0 - ans;
        }
    }
    else {
        var ps = q - Math_floor(q);
        if (ps === 0.0) {
            ps = 1.0;
        }
        xb = p * Math_log(y) - _lbeta(ps, p) - Math_log(p);
        ans = 0.0;
        if (xb >= alnsml) {
            ans = Math_exp(xb);
            term = ans * p;
            if (ps !== 1.0) {
                n = CalcConvert_toInt(Math_max(alneps / Math_log(y), 4.0));
                for (var i = 1; i <= n; i++) {
                    xi = i;
                    term = term * (xi - ps) * y / xi;
                    ans = ans + term / (p + xi);
                }
            }
        }
        if (q > 1.0) {
            xb = p * Math_log(y) + q * Math_log(1.0 - y) - _lbeta(p, q) - Math_log(q);
            var ib = CalcConvert_toInt(Math_max(xb / alnsml, 0.0));
            term = Math_exp(xb - ib * alnsml);
            var c = 1.0 / (1.0 - y);
            var p1 = q * c / (p + q - 1.0);
            var finsum = 0;
            n = CalcConvert_toInt(q);
            if (q === n) {
                n = n - 1;
            }
            for (var i = 1; i <= n; i++) {
                if (p1 <= 1 && term / eps <= finsum) {
                    break;
                }
                xi = i;
                term = (q - xi + 1.0) * c * term / (p + q - xi);
                if (term > 1.0) {
                    ib = ib - 1;
                    term = term * sml;
                }
                if (ib === 0) {
                    finsum = finsum + term;
                }
            }
            ans = ans + finsum;
        }
        if (y !== x || p !== pin) {
            ans = 1.0 - ans;
        }
        ans = Math_max(Math_min(ans, 1.0), 0.0);
    }
    return ans;
}
function _integralPhi(x) {
    x = -x * 0.7071067811865475;
    var lower = CalcConvert_toDouble(x);
    if (isNaNFunc(lower)) {
        return CalcErrorsValue;
    }
    var val = st_normsdist(lower * Math_sqrt(2));
    if (CalcConvert_isError(val)) {
        return NaN;
    }
    return 0.5 * (2 - val * 2);
}
function _iterateInverse(rFunction, fAx, fBx, option) {
    function _hasChangeOfSign(u, w) {
        return (u < 0.0 && w > 0.0) || (u > 0.0 && w < 0.0);
    }
    var fYEps = 1.0E-307;


    var fXEps = 2.22045e-16;

    var fAy = rFunction._getValue(fAx);
    var fBy = rFunction._getValue(fBx);
    var fTemp, nCount;
    for (nCount = 0; nCount < 1000 && !_hasChangeOfSign(fAy, fBy); nCount++) {
        if (Math_abs(fAy) <= Math_abs(fBy)) {
            fTemp = fAx;
            fAx += 2.0 * (fAx - fBx);
            if (fAx < 0.0) {
                fAx = 0.0;
            }
            fBx = fTemp;
            fBy = fAy;
            fAy = rFunction._getValue(fAx);
        }
        else {
            fTemp = fBx;
            fBx += 2.0 * (fBx - fAx);
            fAx = fTemp;
            fAy = fBy;
            fBy = rFunction._getValue(fBx);
        }
    }
    if (fAy === 0.0) {
        return fAx;
    }
    if (fBy === 0.0) {
        return fBx;
    }
    if (!_hasChangeOfSign(fAy, fBy)) {
        option._bConvError = true;
        return 0.0;
    }


    var fPx = fAx;
    var fPy = fAy;
    var fQx = fBx;
    var fQy = fBy;
    var fRx = fAx;
    var fRy = fAy;
    var fSx = 0.5 * (fAx + fBx);
    var bHasToInterpolate = true;
    nCount = 0;
    while (nCount < 500 && Math_abs(fRy) > fYEps && (fBx - fAx) > Math_max(Math_abs(fAx), Math_abs(fBx)) * fXEps) {
        if (bHasToInterpolate) {
            if (fPy !== fQy && fQy !== fRy && fRy !== fPy) {
                fSx = fPx * fRy * fQy / (fRy - fPy) / (fQy - fPy) + fRx * fQy * fPy / (fQy - fRy) / (fPy - fRy) + fQx * fPy * fRy / (fPy - fQy) / (fRy - fQy);
                bHasToInterpolate = (fAx < fSx) && (fSx < fBx);
            }
            else {
                bHasToInterpolate = false;
            }
        }
        if (!bHasToInterpolate) {
            fSx = 0.5 * (fAx + fBx);

            fQx = fBx;
            fQy = fBy;
            bHasToInterpolate = true;
        }

        fPx = fQx;
        fQx = fRx;
        fRx = fSx;
        fPy = fQy;
        fQy = fRy;
        fRy = rFunction._getValue(fSx);

        if (_hasChangeOfSign(fAy, fRy)) {
            fBx = fRx;
            fBy = fRy;
        }
        else {
            fAx = fRx;
            fAy = fRy;
        }


        bHasToInterpolate = bHasToInterpolate && (Math_abs(fRy) * 2.0 <= Math_abs(fQy));
        ++nCount;
    }
    return fRx;
}
function _stat1(closure, array) {
    var length = arrayHelper_getLength(array);
    for (var i = 0; i < length; i++) {
        var x = CalcConvert_toDouble(array[i]), dx = x - closure.M, dm = dx / (closure.N + 1);
        closure.M += dm;
        closure.Q += closure.N * dx * dm;
        closure.N++;
        closure._sum += x;
    }
}
function _gammaln(value) {
    var coefficient = [
        76.180091729471457,
        -86.505320329416776,
        24.014098240830911,
        -1.231739572450155,
        1.208650973866179e-03,
        -5.395239384953E-06
    ];
    var ser = 1.0000000001900149, i;
    var y = value;
    var d = value + 5.5;
    d -= (value + 0.5) * Math_log(d);
    for (i = 0; i <= 5; i++) {
        ser += coefficient[i] / ++y;
    }
    return (-d + Math_log((2.5066282746310006 * ser) / value));
}
function _betaregularized(a, b, x) {
    var bt = ((x === 0.0) || (x === 1.0)) ? 0.0 : Math_exp(_gammaln(a + b) - _gammaln(a) - _gammaln(b) + a * Math_log(x) + b * Math_log(1.0 - x));
    var swap = x >= ((a + 1.0) / ((a + b) + 2.0));
    if (swap) {
        var temp = a;
        a = b;
        b = temp;
        x = 1.0 - x;
    }
    var FP_MIN = 4.4501477170144028E-308;
    var MAX_ITERATIONS = 100;
    var qab = a + b;
    var qaq = a + 1.0;
    var qam = a - 1.0;
    var c = 1.0;
    var d = 1.0 - ((qab * x) / qaq);
    if (Math_abs(d) < FP_MIN) {
        d = FP_MIN;
    }
    d = 1.0 / d;
    var h = d;
    for (var i = 1, i2 = 2; i <= MAX_ITERATIONS; i++, i2 += 2) {
        var aa = (i * (b - i) * x) / ((qam + i2) * (a + i2));
        d = 1.0 + (aa * d);
        if (Math_abs(d) < FP_MIN) {
            d = FP_MIN;
        }
        c = 1.0 + (aa / c);
        if (Math_abs(c) < FP_MIN) {
            c = FP_MIN;
        }
        d = 1.0 / d;
        h *= d * c;
        aa = ((-(a + i) * (qab + i)) * x) / ((a + i2) * (qaq + i2));
        d = 1.0 + (aa * d);
        if (Math_abs(d) < FP_MIN) {
            d = FP_MIN;
        }
        c = 1.0 + (aa / c);
        if (Math_abs(c) < FP_MIN) {
            c = FP_MIN;
        }
        d = 1.0 / d;
        var del = d * c;
        h *= del;
        if (Math_abs(CalcConvert_toDouble(del - 1.0)) < 4.94066e-324) {
            var result = bt * h / a;
            return swap ? 1.0 - result : result;
        }
    }
    return CalcErrorsNumber;
}
function _stat(closure, array) {
    var length = arrayHelper_getLength(array);
    for (var i = 0; i < length; i++) {
        var x = array[i];
        if (x !== CalcConvertedError) {
            var dx = x - closure.M;
            var dm = dx / (closure.N + 1);
            closure.M += dm;
            closure.Q += closure.N * dx * dm;
            closure.N++;
            closure._sum += x;
        }
    }
}
function sortArray(list) {
    list.sort(function (x, y) {
        return x - y;
    });
}
function addArrayDataToList(array, list) {
    for (var i = 0; i < arrayHelper_getLength(array); i++) {
        var x = array[i];
        if (x !== CalcConvertedError) {
            list.push(x);
        }
    }
    sortArray(list);
}
function getListData(args) {
    var list = [];
    for (var k = 0; k < arrayHelper_getLength(args); k++) {
        addArrayDataToList(args[k], list);
    }
    return list;
}
function getBetaDist(fXin, fAlpha, fBeta) {
    var Math_expm1 = Math.expm1 || function (x) {
        return Math_exp(x) - 1;
    };
    var Math_log1p = Math.log1p || function (x) {
        return Math_log(1 + x);
    };

    if (fXin <= 0.0) {
        return 0.0;
    }
    if (fXin >= 1.0) {
        return 1.0;
    }
    if (fBeta === 1.0) {
        return Math_pow(fXin, fAlpha);
    }
    if (fAlpha === 1.0) {
        return -Math_expm1(fBeta * Math_log1p(-fXin));
    }

    var fResult;


    var fY = (0.5 - fXin) + 0.5;
    var flnY = Math_log1p(-fXin);
    var fX = fXin;
    var flnX = Math_log(fXin);
    var fA = fAlpha;
    var fB = fBeta;
    var bReflect = fXin > fAlpha / (fAlpha + fBeta);
    if (bReflect) {
        fA = fBeta;
        fB = fAlpha;
        fX = fY;
        fY = fXin;
        flnX = flnY;
        flnY = Math_log(fXin);
    }
    fResult = getBetaHelperContFrac(fX, fA, fB);
    fResult = fResult / fA;
    var fP = fA / (fA + fB);
    var fQ = fB / (fA + fB);
    var fTemp;
    if (fA > 1.0 && fB > 1.0 && fP < 0.97 && fQ < 0.97) {
        fTemp = getBetaDistPDF(fX, fA, fB) * fX * fY;
    }
    else {
        fTemp = Math_exp(fA * flnX + fB * flnY - getBetaOrLogbeta(false, fA, fB));
    }
    fResult *= fTemp;
    if (bReflect) {
        fResult = 0.5 - fResult + 0.5;
    }
    if (fResult > 1.0) {
        fResult = 1.0;
    }
    if (fResult < 0.0) {
        fResult = 0.0;
    }
    return fResult;
}
function getBetaHelperContFrac(fX, fA, fB) {
    var a2, fnorm, cfnew, cf;
    var eps = 2.22045e-016;
    var a1 = 1.0;
    var b1 = 1.0;
    var b2 = 1.0 - (fA + fB) / (fA + 1.0) * fX;
    if (b2 === 0.0) {
        a2 = 0.0;
        fnorm = 1.0;
        cf = 1.0;
    }
    else {
        a2 = 1.0;
        fnorm = 1.0 / b2;
        cf = a2 * fnorm;
    }
    cfnew = 1.0;
    var rm = 1.0;
    var fMaxIter = 50000.0;


    var bfinished = false;
    do {
        var apl2m = fA + 2.0 * rm;
        var d2m = rm * (fB - rm) * fX / ((apl2m - 1.0) * apl2m);
        var d2m1 = -(fA + rm) * (fA + fB + rm) * fX / (apl2m * (apl2m + 1.0));
        a1 = (a2 + d2m * a1) * fnorm;
        b1 = (b2 + d2m * b1) * fnorm;
        a2 = a1 + d2m1 * a2 * fnorm;
        b2 = b1 + d2m1 * b2 * fnorm;
        if (b2 !== 0.0) {
            fnorm = 1.0 / b2;
            cfnew = a2 * fnorm;
            bfinished = (Math_abs(cf - cfnew) < Math_abs(cf) * eps);
        }
        cf = cfnew;
        rm += 1.0;
    } while (rm < fMaxIter && !bfinished);
    return cf;
}

function getBetaDistPDF(fX, fA, fB) {
    if (fA === 1.0) {
        if (fB === 1.0) {
            return 1.0;
        }
        if (fB === 2.0) {
            return -2.0 * fX + 2.0;
        }
        if (fX <= 0.01) {
            return fB + fB * Math_exp((fB - 1.0) * Math_log(1 - fX)) - 1;
        }
        return fB * Math_pow(0.5 - fX + 0.5, fB - 1.0);
    }
    if (fB === 1.0) {
        if (fA === 2.0) {
            return fA * fX;
        }
        return fA * Math_pow(fX, fA - 1);
    }
    if (fX <= 0.0 && !(fA < 1.0 && fX === 0.0) || fX >= 1.0 && !(fB < 1.0 && fX === 1.0)) {
        return 0;
    }

    var fLogDblMax = Math_log(_d1mach(2));
    var fLogDblMin = Math_log(_d1mach(1));
    var fLogY = (fX < 0.1) ? Math_log(1 + fX) : Math_log(1 - fX);
    var fLogX = Math_log(fX);
    var fAm1LogX = (fA - 1.0) * fLogX;
    var fBm1LogY = (fB - 1.0) * fLogY;
    var fLogBeta = getBetaOrLogbeta(false, fA, fB);

    if (fAm1LogX < fLogDblMax && fAm1LogX > fLogDblMin && fBm1LogY < fLogDblMax &&
        fBm1LogY > fLogDblMin && fLogBeta < fLogDblMax && fLogBeta > fLogDblMin &&
        fAm1LogX + fBm1LogY < fLogDblMax && fAm1LogX + fBm1LogY > fLogDblMin) {
        return Math_pow(fX, fA - 1.0) * Math_pow(0.5 - fX + 0.5, fB - 1.0) / getBetaOrLogbeta(true, fA, fB);
    }
    return Math_exp(fAm1LogX + fBm1LogY - fLogBeta);
}

function getBetaOrLogbeta(isBeta, fAlpha, fBeta) {
    var fA = fBeta, fB = fAlpha;
    var fMaxGammaArgument = 171.624376956302;
    if (fAlpha > fBeta) {
        var swap = fA;
        fA = fB;
        fB = swap;
    }
    if (isBeta && ((fA + fB) < fMaxGammaArgument)) {
        return getGamma(fA) / getGamma(fA + fB) * getGamma(fB);
    }
    var fg = 6.024680040776729583740234375;
    var fgm = fg - 0.5;
    var fLanczos = getLanczosSum(fA);
    fLanczos /= getLanczosSum(fA + fB);
    fLanczos *= getLanczosSum(fB);
    var fABgm = fA + fB + fgm;
    var result = isBeta ? fLanczos * Math_sqrt((fABgm / (fA + fgm)) / (fB + fgm))
        : Math_log(fLanczos) + 0.5 * (Math_log(fABgm) - Math_log(fA + fgm) - Math_log(fB + fgm));
    var fTempA = fB / (fA + fgm);
    var fTempB = fA / (fB + fgm);
    var temp = -fA * Math_log(1 + fTempA) - fB * Math_log(1 + fTempB) - fgm;
    return isBeta ? Math_exp(temp) * result : temp + result;
}
function getGammaHelper(fZ) {
    var fGamma = getLanczosSum(fZ);
    var fg = 6.024680040776729583740234375;
    var fZgHelp = fZ + fg - 0.5;

    var fHalfpower = Math_pow(fZgHelp, fZ / 2 - 0.25);
    fGamma *= fHalfpower;
    fGamma /= Math_exp(fZgHelp);
    fGamma *= fHalfpower;
    if (fZ <= 20.0 && fZ === MathHelper._approxFloor(fZ)) {
        fGamma = Math_round(fGamma);
    }
    return fGamma;
}
function getGamma(fZ) {
    var fLogPi = Math_log(Math_PI);
    var fLogDblMax = Math_log(_d1mach(2));
    var fMaxGammaArgument = 171.624376956302;
    if (fZ > fMaxGammaArgument) {
        return CalcErrorsNumber;
    }
    if (fZ >= 1.0) {
        return getGammaHelper(fZ);
    }
    if (fZ >= 0.5) {
        return getGammaHelper(fZ + 1) / fZ;
    }
    if (fZ >= -0.5) {
        var fLogTest = getGammaHelper(fZ + 2) - Math_log(fZ + 1) - Math_log(Math_abs(fZ));
        if (fLogTest >= fLogDblMax) {
            return CalcErrorsNumber;
        }
        return getGammaHelper(fZ + 2) / (fZ + 1) / fZ;
    }


    var fLogDivisor = getGammaHelper(1 - fZ) + Math_log(Math_abs(Math_sin(Math_PI * fZ)));
    if (fLogDivisor - fLogPi >= fLogDblMax) {
        return 0.0;
    }
    if (fLogDivisor < 0.0 && fLogPi - fLogDivisor > fLogDblMax) {
        return CalcErrorsNumber;
    }
    return Math_exp(fLogPi - fLogDivisor) * ((Math_sin(Math_PI * fZ) < 0.0) ? -1.0 : 1.0);
}
function getLogGamma(fZ) {
    var fMaxGammaArgument = 171.624376956302;
    if (fZ >= fMaxGammaArgument) {
        return getGammaHelper(fZ);
    }
    if (fZ >= 1.0) {
        return Math_log(getGammaHelper(fZ));
    }
    if (fZ >= 0.5) {
        return Math_log(getGammaHelper(fZ + 1) / fZ);
    }
    return getGammaHelper(fZ + 2) - Math_log(fZ + 1) - Math_log(fZ);
}
function getLanczosSum(fZ) {
    var fNum = [
        23531376880.41075968857200767445163675473,
        42919803642.64909876895789904700198885093,
        35711959237.35566804944018545154716670596,
        17921034426.03720969991975575445893111267,
        6039542586.35202800506429164430729792107,
        1439720407.311721673663223072794912393972,
        248874557.8620541565114603864132294232163,
        31426415.58540019438061423162831820536287,
        2876370.628935372441225409051620849613599,
        186056.2653952234950402949897160456992822,
        8071.672002365816210638002902272250613822,
        210.8242777515793458725097339207133627117,
        2.506628274631000270164908177133837338626
    ];
    var fDenom = [
        0,
        39916800,
        120543840,
        150917976,
        105258076,
        45995730,
        13339535,
        2637558,
        357423,
        32670,
        1925,
        66,
        1
    ];
    var fSumNum;
    var fSumDenom;
    var nI;
    if (fZ <= 1.0) {
        fSumNum = fNum[12];
        fSumDenom = fDenom[12];
        for (nI = 11; nI >= 0; --nI) {
            fSumNum *= fZ;
            fSumNum += fNum[nI];
            fSumDenom *= fZ;
            fSumDenom += fDenom[nI];
        }
    }
    else {
        var fZInv = 1 / fZ;
        fSumNum = fNum[0];
        fSumDenom = fDenom[0];
        for (nI = 1; nI <= 12; ++nI) {
            fSumNum *= fZInv;
            fSumNum += fNum[nI];
            fSumDenom *= fZInv;
            fSumDenom += fDenom[nI];
        }
    }
    return fSumNum / fSumDenom;
}
function getChisqDistCDF(x, df) {
    return x <= 0.0 ? 0 : getLowRegIGamma(df / 2.0, x / 2.0);
}
function getLowRegIGamma(fA, fX) {
    var fLnFactor = fA * Math_log(fX) - fX - getLogGamma(fA);
    var fFactor = Math_exp(fLnFactor);
    if (fX > fA + 1.0) {
        return 1.0 - fFactor * getGammaContFraction(fA, fX);
    }
    return fFactor * getGammaSeries(fA, fX);
}
function getGammaSeries(fA, fX) {
    var fHalfMachEps = 0.5 * _d1mach(3);
    var fDenomfactor = fA;
    var fSummand = 1.0 / fA;
    var fSum = fSummand;
    var nCount = 1;
    do {
        fDenomfactor = fDenomfactor + 1.0;
        fSummand = fSummand * fX / fDenomfactor;
        fSum = fSum + fSummand;
        nCount = nCount + 1;
    } while (fSummand / fSum > fHalfMachEps && nCount <= 10000);


    if (nCount > 10000) {
        return CalcErrorsValue;
    }
    return fSum;
}
function getGammaContFraction(fA, fX) {
    var fBigInv = _d1mach(3);
    var fHalfMachEps = 0.5 * fBigInv;
    var fBig = 1.0 / fBigInv;
    var fCount = 0.0;
    var fNum = 0.0;
    var fY = 1.0 - fA;
    var fDenom = fX + 2.0 - fA;
    var fPk = 0.0;
    var fPkm1 = fX + 1.0;
    var fPkm2 = 1.0;
    var fQk = 1.0;
    var fQkm1 = fDenom * fX;
    var fQkm2 = fX;
    var fApprox = fPkm1 / fQkm1;
    var bFinished = false;
    var fR = 0.0;
    do {
        fCount = fCount + 1.0;
        fY = fY + 1.0;
        fNum = fY * fCount;
        fDenom = fDenom + 2.0;
        fPk = fPkm1 * fDenom - fPkm2 * fNum;
        fQk = fQkm1 * fDenom - fQkm2 * fNum;
        if (fQk !== 0.0) {
            fR = fPk / fQk;
            bFinished = (Math_abs((fApprox - fR) / fR) <= fHalfMachEps);
            fApprox = fR;
        }
        fPkm2 = fPkm1;
        fPkm1 = fPk;
        fQkm2 = fQkm1;
        fQkm1 = fQk;
        if (Math_abs(fPk) > fBig) {
            fPkm2 = fPkm2 * fBigInv;
            fPkm1 = fPkm1 * fBigInv;
            fQkm2 = fQkm2 * fBigInv;
            fQkm1 = fQkm1 * fBigInv;
        }
    } while (!bFinished && fCount < 10000);
    if (!bFinished) {
        return CalcErrorsValue;
    }
    return fApprox;
}
function getChisqDistPDF(x, df) {
    var fValue, fCount;
    if (x <= 0.0) {
        return 0.0;
    }
    if (df * x > 1391000.0) {
        fValue = Math_exp((0.5 * df - 1) * Math_log(x * 0.5) - 0.5 * x - Math_log(2.0) - getLogGamma(0.5 * df));
    }
    else {
        if ((df % 2.0) < 0.5) {
            fValue = 0.5;
            fCount = 2.0;
        }
        else {
            fValue = 1 / Math_sqrt(x * 2 * Math_PI);
            fCount = 1.0;
        }
        while (fCount < df) {
            fValue *= (x / fCount);
            fCount += 2.0;
        }
        fValue = x >= 1425.0 ? Math_exp(Math_log(fValue) - x / 2) : fValue * Math_exp(-x / 2);
    }
    return fValue;
}
function getHypGeomDist(x, n, M, N) {
    var o = combin(M, x);
    if (CalcConvert_isError(o)) {
        return o;
    }
    var pt1 = CalcConvert_toDouble(o);
    o = combin(N - M, n - x);
    if (CalcConvert_isError(o)) {
        return o;
    }
    var pt2 = CalcConvert_toDouble(o);
    o = combin(N, n);
    if (CalcConvert_isError(o)) {
        return o;
    }
    var pt3 = CalcConvert_toDouble(o);
    return CalcConvert_toResult((pt1 * pt2) / pt3);
}
function getTDist(t, fDF, nType) {
    var temp = getBetaDist(fDF / (fDF + t * t), fDF / 2.0, 0.5);
    switch (nType) {
        case 1:
            return 0.5 * temp;
        case 2:
            return temp;
        case 3:
            return Math_pow(1 + (t * t / fDF), -(fDF + 1) / 2) / (Math_sqrt(fDF) * getBetaOrLogbeta(true, 0.5, fDF / 2.0));
        case 4:
            var x = fDF / (t * t + fDF);
            var r = 0.5 * getBetaDist(x, 0.5 * fDF, 0.5);
            return (t < 0 ? r : 1 - r);
    }
    return CalcErrorsValue;
}
function getAFunc(fp, fDF, nType) {
    return {
        _getValue: function (x) {
            return fp - getTDist(x, fDF, nType);
        }
    };
}
function getTInv(fAlpha, fSize, nType) {
    var opt = { _bConvError: false };
    var aFunc = getAFunc(fAlpha, fSize, nType);
    var fVal = _iterateInverse(aFunc, fSize * 0.5, fSize, opt);
    return opt._bConvError ? CalcErrorsNotAvailable : fVal;
}
function st_maxa_mina(isMaxa, args) {
    var isAny = false, retValue = 0.0, val, i, j, obj, array;
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        array = args[i];
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            obj = array[j];
            if (CalcConvert_isNumber(obj) || isBoolean(obj) || isString(obj)) {
                val = isString(obj) ? 0 : CalcConvert_toDouble(obj);
                if (!isAny || isMaxa && val > retValue || !isMaxa && val < retValue) {
                    retValue = val;
                }
                isAny = true;
            }
            else if (CalcConvert_isError(obj)) {
                return obj;
            }
        }
    }
    return retValue;
}
function st_rank_rankavq(isRank, array, num, order) {
    var lessThanCount = 0.0;
    var equalToCount = 0.0;
    var greaterThanCount = 0.0;
    var i, obj;
    for (i = 0; i < arrayHelper_getLength(array); i++) {
        obj = array[i];
        if (obj !== CalcConvertedError) {
            if (obj < num) {
                lessThanCount++;
            }
            else if (num < obj) {
                greaterThanCount++;
            }
            else {
                equalToCount++;
            }
        }
    }
    if (equalToCount === 0.0) {
        return CalcErrorsNotAvailable;
    }
    var temp = (order === 0.0 ? greaterThanCount : lessThanCount) + 1;
    return isRank ? temp : temp + (equalToCount - 1.0) / 2.0;
}
function _dev2(args, stc, ignoreBooleanInCalcArray) {
    var x, obj, i, j;
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        var array = args[i];
        var isArray = !!array.isArray;
        var isReference = !!array.isReference;
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            obj = array[j];
            if (obj === keyword_null) {
                continue;
            }
            else if (isString(obj)) {
                if (CalcEngine_1.ExcelCompatibleCalcMode) {
                    if (isArray) {
                        continue;
                    }
                    if (isReference) {
                        stc.n++;
                        continue;
                    }
                }
                var nValue = { value: 0 };
                if (CalcEngine_1.Convert._tryToDouble(obj, nValue)) {
                    x = nValue.value;
                    stc._sumx += x;
                    stc._sumx2 += x * x;
                }
                else if (!array.isArray && !array.isReference) {
                    return CalcErrorsValue;
                }
                stc.n++;
            }
            else if (CalcConvert_isError(obj)) {
                return obj;
            }
            else if (CalcConvert_isNumber(obj) && !(ignoreBooleanInCalcArray && typeof obj === 'boolean' && array.isArray)) {
                x = CalcConvert_toDouble(obj);
                stc._sumx += x;
                stc._sumx2 += x * x;
                stc.n++;
            }
        }
    }
}
function st_stdev_var(args, compareNum, needSqrt, ignoreBooleanInCalcArray) {
    var data = { _sumx: 0.0, _sumx2: 0.0, n: 0.0 };
    var flag = _dev2(args, data, ignoreBooleanInCalcArray);
    if (CalcConvert_isError(flag)) {
        return flag;
    }
    if (data.n <= compareNum) {
        return CalcErrorsDivideByZero;
    }
    var temp = Math_max(0.0, (data.n * data._sumx2 - data._sumx * data._sumx) / (data.n * (data.n - compareNum)));
    temp = needSqrt ? Math_sqrt(temp) : temp;
    return CalcConvert_toResult(temp);
}
function st_covar_convariances(isCovar, arrayX, arrayY) {
    var x, y;
    var sumx = 0.0;
    var sumy = 0.0;
    var sumprod = 0.0;
    var count = 0, i;
    var length = arrayHelper_getLength(arrayX);
    if (length !== arrayHelper_getLength(arrayY)) {
        return CalcErrorsNotAvailable;
    }
    for (i = 0; i < length; i++) {
        x = arrayX[i];
        y = arrayY[i];
        if (x !== CalcConvertedError && y !== CalcConvertedError) {
            sumx += x;
            sumy += y;
            count++;
        }
    }
    if (count <= 1) {
        return CalcErrorsDivideByZero;
    }
    var meanx = sumx / count, meany = sumy / count;
    for (i = 0; i < length; i++) {
        x = arrayX[i];
        y = arrayY[i];
        if (x !== CalcConvertedError && y !== CalcConvertedError) {
            sumprod += (x - meanx) * (y - meany);
        }
    }
    return isCovar ? CalcConvert_toResult(sumprod / count) : CalcConvert_toResult(sumprod / (count - 1));
}
function st_geomean_harmean(isGeomean, args) {
    var result = isGeomean ? 1 : 0, n = 0;
    var array, y, i, j;
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        array = args[i];
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            y = array[j];
            if (y !== CalcConvertedError) {
                if (y <= 0.0) {
                    return CalcErrorsNumber;
                }
                result = isGeomean ? result * y : result + 1 / y;
                n++;
            }
        }
    }
    if (isGeomean) {
        return n <= 0 ? CalcErrorsDivideByZero : CalcConvert_toResult(Math_pow(result, 1.0 / n));
    }
    return result === 0 ? CalcErrorsDivideByZero : CalcConvert_toResult(n / result);
}
function st_linest_logest(isLogest, knownY, knownX, constant, stats) {
    var knownY_rowCount = knownY.rowCount, knownY_colCount = knownY.colCount;
    var knownXArray, i, j;
    if (isLogest) {
        knownX = knownX !== keyword_undefined ? CalcConvert_toArray(knownX, 1 , false, true, true) : knownY;
    }
    else {
        knownXArray = knownX !== keyword_undefined ? knownX : (function (rowCount, colCount) {
            var arr = [];
            for (i = 0; i < rowCount; i++) {
                arr[i] = [];
                for (j = 0; j < colCount; j++) {
                    arr[i][j] = i * colCount + j + 1;
                }
            }
            return new CalcEngine_1.CalcArray(arr);
        })(knownY_rowCount, knownY_colCount);
        knownX = CalcConvert_toArray(knownXArray, 1 , false, true, true);
    }
    var knownX_rowCount = knownX.rowCount, knownX_colCount = knownX.colCount;
    var k, m, n, x, y, mm, nn, result, found, temp, val, se2;
    if (knownY_rowCount === knownX_rowCount && knownY_colCount === knownX_colCount && (constant || !stats)) {
        n = isLogest ? knownX_rowCount * knownX_colCount : CalcConvert_toDouble(knownX_rowCount * knownX_colCount);
        var sumx = 0.0, sumx2 = 0.0, sumy = 0.0, sumy2 = 0.0, sumxy = 0.0, b = void 0;
        for (i = 0; i < knownX_rowCount; i++) {
            for (j = 0; j < knownX_colCount; j++) {
                x = knownX[i][j];
                y = knownY[i][j];
                if (isLogest) {
                    y = Math_log(y);
                }
                sumx += x;
                sumx2 += x * x;
                sumy += y;
                sumy2 += y * y;
                sumxy += x * y;
            }
        }
        temp = n * sumx2 - sumx * sumx;
        m = constant ? (n * sumxy - sumx * sumy) / temp : sumxy / sumx2;
        b = constant ? (sumy * sumx2 - sumx * sumxy) / temp : 0;
        if (isLogest) {
            m = Math_exp(m);
            b = Math_exp(b);
        }
        result = [[m, b]];
        if (stats) {
            result[1] = [];
            result[2] = [];
            result[3] = [];
            result[4] = [];
            var nSumx2MinusSumxSumx = n * sumx2 - sumx * sumx;
            var nSumy2MinusSumySumy = n * sumy2 - sumy * sumy;
            var nSumxyMinusSumxSumy = n * sumxy - sumx * sumy;
            var ssresid = sumy2 - b * sumy - m * sumxy;
            var r2 = (nSumxyMinusSumxSumy * nSumxyMinusSumxSumy) / (nSumx2MinusSumxSumx * nSumy2MinusSumySumy);
            if (n < 3) {
                result[1][0] = CalcErrorsNumber;
                result[1][1] = CalcErrorsNumber;
                result[2][1] = CalcErrorsNumber;
                result[3][0] = CalcErrorsNumber;
            }
            else {
                result[1][0] = Math_sqrt((ssresid * n) / (nSumx2MinusSumxSumx * (n - 2.0)));
                result[1][1] = Math_sqrt((ssresid * sumx2) / (nSumx2MinusSumxSumx * (n - 2.0)));
                result[2][1] = Math_sqrt((nSumy2MinusSumySumy - nSumxyMinusSumxSumy * nSumxyMinusSumxSumy / nSumx2MinusSumxSumx) / (n * (n - 2.0)));
                result[3][0] = r2 === 1.0 ? CalcErrorsNumber : (r2 * (n - 2.0)) / (1.0 - r2);
            }
            result[2][0] = r2;
            result[3][1] = n - 2.0;
            result[4][0] = nSumy2MinusSumySumy / n - ssresid;
            result[4][1] = ssresid;
        }
        return new CalcEngine_1.CalcArray(result);
    }
    else if ((knownY_colCount === 1 && knownY_rowCount === knownX_rowCount) || (knownY_rowCount === 1 && knownY_colCount === knownX_colCount)) {
        y = [];
        x = [];
        temp = knownY_colCount === 1;
        n = knownX_rowCount;
        m = knownX_colCount;
        for (i = 0; i < n; i++) {
            y[i] = constant ? knownY[i][0] : knownY[0][i];
            if (isLogest) {
                y[i] = Math_log(y[i]);
            }
        }
        for (i = 0; i < n; i++) {
            x[i] = [];
            for (j = 0; j < m; j++) {
                x[i][j] = temp ? knownX[i][j] : knownX[j][i];
            }
        }
        var q = [];
        for (k = 0; k < m + 1; k++) {
            q[k] = [];
        }
        for (mm = 0; mm < m + 1; mm++) {
            for (nn = 0; nn < m + 2; nn++) {
                q[mm][nn] = 0;
            }
        }
        var e = [];
        for (mm = 0; mm < m + 2; mm++) {
            e[mm] = 0;
        }
        var v = (stats ? [] : keyword_null);
        for (k = 0; k < n; k++) {
            e[m + 1] += y[k] * y[k];
            q[0][m + 1] += y[k];
            e[0] = q[0][m + 1];
            for (i = 0; i < m; i++) {
                q[0][i + 1] += x[k][i];
                q[i + 1][0] = q[0][i + 1];
                q[i + 1][m + 1] += x[k][i] * y[k];
                e[i + 1] = q[i + 1][m + 1];
                for (j = i; j < m; j++) {
                    q[j + 1][i + 1] += x[k][i] * x[k][j];
                    q[i + 1][j + 1] = q[j + 1][i + 1];
                }
            }
        }
        q[0][0] = n;
        if (stats) {
            for (mm = 0; mm < m + 1; mm++) {
                v[mm] = [];
                for (nn = 0; nn < m + 1; nn++) {
                    v[mm][nn] = 0;
                }
            }
            for (i = 0; i < m + 1; i++) {
                v[i][i] = 1.0;
            }
        }
        var start = constant ? 0 : 1;
        for (i = 0; i < m + 1; i++) {
            if (q[i][i] === 0.0) {
                found = false;
                for (j = i + 1; !found && j < m + 1; j++) {
                    if (q[j][i] !== 0.0) {
                        for (k = 0; k < m + 2; k++) {
                            temp = q[i][k];
                            q[i][k] = q[j][k];
                            q[j][k] = temp;
                        }
                        if (stats) {
                            for (k = 0; k < m + 1; k++) {
                                temp = v[i][k];
                                v[i][k] = v[j][k];
                                v[j][k] = temp;
                            }
                        }
                        found = true;
                    }
                }
                if (!found) {
                    return CalcErrorsNumber;
                }
            }
            val = 1.0 / q[i][i];
            for (k = start; k < m + 2; k++) {
                q[i][k] *= val;
            }
            if (stats) {
                for (k = start; k < m + 1; k++) {
                    v[i][k] *= val;
                }
            }
            for (j = start; j < m + 1; j++) {
                if (j !== i) {
                    val = -q[j][i];
                    for (k = start; k < m + 2; k++) {
                        q[j][k] += val * q[i][k];
                    }
                    if (stats) {
                        for (k = start; k < m + 1; k++) {
                            v[j][k] += val * v[i][k];
                        }
                    }
                }
            }
            if (!constant) {
                q[0][m + 1] = 0;
            }
        }
        result = isLogest ? [[], m + 1] : [[]];
        for (i = 0; i < m + 1; i++) {
            result[0][i] = isLogest ? Math_exp(q[m - i][m + 1]) : q[m - i][m + 1];
        }
        if (stats) {
            if (isLogest) {
                result[1] = [];
                result[2] = [];
                result[3] = [];
                result[4] = [];
            }
            else {
                for (mm = 1; mm < 5; mm++) {
                    result[mm] = [];
                    for (nn = 0; nn < m + 1; nn++) {
                        result[mm][nn] = 0;
                    }
                }
            }
            var sqr = void 0, sqt = void 0, sqe = void 0;
            sqt = e[m + 1] - e[0] * e[0] / n;
            sqr = e[m + 1];
            for (i = 0; i < m + 1; i++) {
                sqr -= q[i][m + 1] * e[i];
            }
            sqe = sqt - sqr;
            result[2][0] = sqt === 0.0 ? CalcErrorsNumber : sqe / sqt;
            result[4][0] = sqe;
            result[4][1] = sqr;
            temp = constant ? n - m - 1 : n - m;
            if (temp === 0) {
                for (i = 0; i < m + 1; i++) {
                    result[1][i] = CalcErrorsNumber;
                }
                result[2][1] = CalcErrorsNumber;
            }
            else {
                se2 = sqr / CalcConvert_toDouble(temp);
                if (!constant) {
                    result[1][m] = CalcErrorsNotAvailable;
                }
                for (i = start; i < m + 1; i++) {
                    result[1][m - i] = Math_sqrt(se2 * v[i][i]);
                }
                result[2][1] = Math_sqrt(se2);
            }
            result[3][0] = sqr === 0 ? CalcErrorsNumber : (CalcConvert_toDouble(temp) * sqe) / (sqr * CalcConvert_toDouble(m));
            result[3][1] = CalcConvert_toDouble(temp);
            for (i = 2; i < 5; i++) {
                for (j = 2; j < m + 1; j++) {
                    result[i][j] = CalcErrorsNotAvailable;
                }
            }
        }


        return new CalcEngine_1.CalcArray(result);
    }
    return CalcErrorsNumber;
}
function st_devsp_avedev(isDevsp, args) {
    var x, mean;
    var sumx = 0.0;
    var result = 0.0;
    var n = 0, i, j;
    var array, argsArray = [];
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        array = args[i];
        argsArray.push(array);
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            x = array[j];
            if (x !== CalcConvertedError) {
                sumx += x;
                n++;
            }
        }
    }
    mean = sumx / n;
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        array = argsArray[i];
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            x = array[j];
            if (x !== CalcConvertedError) {
                result += isDevsp ? (x - mean) * (x - mean) : Math_abs(x - mean);
            }
        }
    }
    if (isDevsp) {
        return CalcConvert_toResult(result);
    }
    return n === 0 ? CalcErrorsDivideByZero : CalcConvert_toResult(result / n);
}
function st_trend(knownY, knownX, newX, constant) {
    knownX = knownX !== keyword_undefined ? CalcConvert_toArray(knownX, 0 , false, true, false) : knownY;
    newX = newX !== keyword_undefined ? CalcConvert_toArray(newX, 0 , false, true, false) : knownX;
    var i, j;
    for (i = 0; i < knownY.rowCount; i++) {
        for (j = 0; j < knownY.colCount; j++) {
            if (!CalcConvert_isNumber(knownY[i][j])) {
                return CalcErrorsValue;
            }
        }
    }
    for (i = 0; i < knownX.rowCount; i++) {
        for (j = 0; j < knownX.colCount; j++) {
            if (!CalcConvert_isNumber(knownX[i][j])) {
                return CalcErrorsValue;
            }
        }
    }
    for (i = 0; i < newX.rowCount; i++) {
        for (j = 0; j < newX.colCount; j++) {
            if (!CalcConvert_isNumber(newX[i][j])) {
                return CalcErrorsValue;
            }
        }
    }
    return Common_1.Common._trend(knownY, knownX, newX, constant, CalcConvert_toDouble, CalcEngine_1.CalcArray, CalcErrorsValue, CalcErrorsNotAvailable);
}
function st_growth(knownY, knownX, newX, constant) {
    knownX = knownX !== keyword_undefined ? CalcConvert_toArray(knownX, 1 , false, true, true) : knownY;
    newX = newX !== keyword_undefined ? CalcConvert_toArray(newX, 1 , false, true, true) : knownX;
    return Common_1.Common._growth(knownY, knownX, newX, constant, CalcEngine_1.CalcArray, CalcErrorsNumber, CalcErrorsNotAvailable);
}
function st_forecast(num, array1, array2) {
    var sumy = 0.0, sumx = 0.0, sumx2 = 0.0, sumxy = 0.0;
    var n = arrayHelper_getLength(array1);
    var count = 0, i;
    if (n !== arrayHelper_getLength(array2)) {
        return CalcErrorsNotAvailable;
    }
    for (i = 0; i < n; i++) {
        var y = array1[i], x = array2[i];
        if (y !== CalcConvertedError && x !== CalcConvertedError) {
            sumy += y;
            sumx += x;
            sumx2 += x * x;
            sumxy += x * y;
            count++;
        }
    }
    if (count === 0) {
        return CalcErrorsDivideByZero;
    }
    if (count * sumx2 - sumx * sumx === 0.0) {
        return CalcErrorsDivideByZero;
    }
    var b = (count * sumxy - sumx * sumy) / (count * sumx2 - sumx * sumx), a = sumy / count - b * (sumx / count);
    return CalcConvert_toResult(a + b * num);
}
function st_average() {
    return st_includeSubtotals(arguments, 2 , 1 );
}
function st_stdev() {
    return st_devVarIncludeSubtotals(arguments, 2 , 7 );
}

function st_percentile(array, k) {
    return st_includeAggregateMulti([array, k], 16);
}
function st_max() {
    return st_includeSubtotals(arguments, 2 , 4 );
}
function st_maxa() {
    return st_maxa_mina(true, arguments);
}
function st_min() {
    return st_includeSubtotals(arguments, 2 , 5 );
}
function st_mina() {
    return st_maxa_mina(false, arguments);
}
function st_large(array, k) {
    return st_includeAggregateMulti([array, k], 14);
}
function st_small(array, k) {
    return st_includeAggregateMulti([array, k], 15);
}
function st_averagea() {
    var args = arguments;
    var sum = 0.0, n = 0.0;
    var i, j, obj, array;
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        array = args[i];
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            obj = array[j];


            if (CalcConvert_isNumber(obj, true) || isBoolean(obj)) {
                sum += CalcConvert_toDouble(obj);
                n++;
            }
            else if (obj === keyword_null || isString(obj)) {
                n++;
            }
        }
    }
    return n === 0 ? CalcErrorsDivideByZero : CalcConvert_toResult(sum / n);
}
function _averageifImp(range, criteria, sumRange, context) {
    var sumCalcRange = sumRange;
    var needsLinkRef = sumRange !== keyword_undefined && CalcConvert_isReference(sumRange);
    if (sumRange !== keyword_undefined) {
        range = CalcConvert_toArray(range, 0 , true, false, false);

        sumRange = CalcConvert_toArray(sumRange, 1 , true, false, false, true, keyword_undefined, true);
        if (sumRange.isError) {
            return sumRange[0];
        }
    }
    else {
        range = CalcConvert_toArray(range, 1 , true, false, false, true, keyword_undefined, true);
        if (range.isError) {
            return range[0];
        }
        sumRange = range;
    }
    var sum = 0.0, n = 0.0;
    var crit = parseCriteria(criteria);


    if (range.rowCount !== sumRange.rowCount || range.colCount !== sumRange.colCount) {
        return CalcErrorsValue;
    }

    var baseRow, baseCol, startRow, startCol, cellCalc, source, rowCount = range.rowCount;
    if (needsLinkRef) {
        baseRow = context.row;
        baseCol = context.column;
        startRow = sumCalcRange.getRow(0);
        startCol = sumCalcRange.getColumn(0);
        cellCalc = context.source.getCalcSourceModel()._getCellCalc(baseRow, baseCol);
        source = sumCalcRange.getSource();
        needsLinkRef = cellCalc && source.getRangeKey;
    }

    for (var j = 0; j < arrayHelper_getLength(range); j++) {
        var val = range[j];
        if (crit && crit(val, true)) {
            var obj = sumRange[j];

            if (needsLinkRef) {
                var refRange = { id: source.id, row: startRow + j % rowCount, col: startCol + Math_floor(j / rowCount), rowCount: 1, colCount: 1 };
                var key = source.getRangeKey(source, refRange);
                if (!cellCalc._newDetectedDynamicCreatedRanges) {
                    cellCalc._newDetectedDynamicCreatedRanges = {};
                }
                cellCalc._newDetectedDynamicCreatedRanges[key] = refRange;
            }
            if (obj !== CalcConvertedError) {
                if (!CalcConvert_isError(obj)) {
                    sum += obj;
                    n++;
                }
                else {
                    return obj;
                }
            }
        }
    }
    return n === 0 ? CalcErrorsDivideByZero : CalcConvert_toResult(sum / n);
}
function getAverageResult(isArray, critieriaData, range, sumRange, context) {
    var arrayData = critieriaData, refData = critieriaData;
    var rowCount = isArray ? arrayData.getRowCount() : refData.getRowCount(0);
    var colCount = isArray ? arrayData.getColumnCount() : refData.getColumnCount(0);
    var result = [], r, c;
    for (r = 0; r < rowCount; r++) {
        result[r] = [];
        for (c = 0; c < colCount; c++) {
            var temp = isArray ? arrayData.getValue(r, c) : refData.getValue(0, r, c);
            result[r][c] = _averageifImp(range, temp, sumRange, context);
        }
    }
    return new CalcEngine_1.CalcArray(result);
}
function st_averageif(context, range, critieriaData, sumRange) {
    if (CalcEngine_1.Convert._isReference(critieriaData)) {
        return getAverageResult(false, critieriaData, range, sumRange, context);
    }
    if (CalcEngine_1.Convert._isArray(critieriaData)) {
        return getAverageResult(true, critieriaData, range, sumRange, context);
    }
    return _averageifImp(range, critieriaData, sumRange, context);
}
function st_median() {
    return st_includeAggregateMulti(arguments, 12);
}
function st_mode() {
    return st_includeAggregateMulti(arguments, 13);
}
function st_geomean() {
    return st_geomean_harmean(true, arguments);
}
function st_harmean() {
    return st_geomean_harmean(false, arguments);
}
function st_trimmean(array, percent) {
    var sum = 0.0;
    var list = [];
    addArrayDataToList(array, list);
    var listLength = arrayHelper_getLengthWithoutEmpty(list);
    var n = parseIntFunc((listLength * percent / 2).toString());
    for (var i = n; i < listLength - n; i++) {
        sum += CalcConvert_toDouble(list[i]);
    }
    return sum / (listLength - 2 * n);
}
function st_frequency(dataArray, binsArray) {
    var binsCount = 0, i, j, element;
    var rowCount1 = binsArray.rowCount;
    var columnCount1 = binsArray.colCount;
    for (i = 0; i < rowCount1; i++) {
        for (j = 0; j < columnCount1; j++) {
            if (binsArray[i][j] !== CalcConvertedError) {
                binsCount++;
            }
        }
    }
    var rowCount2 = dataArray.rowCount;
    var columnCount2 = dataArray.colCount;
    var bins = [], results = [];
    var resultsLength = binsCount + 1;
    binsCount = 0;
    for (i = 0; i < rowCount1; i++) {
        for (j = 0; j < columnCount1; j++) {
            element = binsArray[i][j];
            if (element !== CalcConvertedError) {
                bins[binsCount++] = CalcConvert_toDouble(element);
            }
        }
    }
    var binList = bins.slice(0);
    sortArray(bins);
    for (i = 0; i < resultsLength; i++) {
        results[i] = [0];
    }
    for (i = 0; i < rowCount2; i++) {
        for (j = 0; j < columnCount2; j++) {
            element = dataArray[i][j];
            if (CalcConvert_isNumber(element)) {
                var number = CalcConvert_toDouble(element);
                var found = false;
                for (var k = 0; !found && k < binsCount; k++) {
                    if (number <= bins[k]) {
                        results[binList.indexOf(bins[k])][0]++;
                        found = true;
                    }
                }
                if (!found) {
                    results[binsCount][0]++;
                }
            }
        }
    }
    return new CalcEngine_1.CalcArray(results);
}
function st_rank(num, array, order) {
    var arrayHelper = CalcEngine_1.CalcArrayHelper;
    if (CalcEngine_1.Convert._isReference(num)) {
        if (arrayHelper.getLength(num) === 1) {
            num = arrayHelper.getValueByIndex(num, 0);
        }
        else {
            return CalcErrorsValue;
        }
    }
    num = CalcConvert_toDouble(num);
    if (isNaNFunc(num)) {
        return CalcErrorsValue;
    }
    return st_rank_rankavq(true, array, num, order);
}
function st_kurt() {
    var args = arguments;
    var x;
    var sumx = 0.0;
    var sumx2 = 0.0;
    var sum4 = 0.0;
    var n = 0;
    var argsLength = arrayHelper_getLength(args);
    var mean, stdev, j, k;
    var array, argsArray = [];
    if (argsLength > 0) {
        array = args[0];
        argsArray.push(array);
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            x = array[j];
            if (x !== CalcConvertedError) {
                sumx += x;
                sumx2 += x * x;
                n++;
            }
        }
        if (n <= 3) {
            return CalcErrorsDivideByZero;
        }
        mean = sumx / n;
        stdev = Math_sqrt((n * sumx2 - sumx * sumx) / (n * (n - 1)));
        if (stdev === 0.0) {
            return CalcErrorsDivideByZero;
        }
        for (k = 0; k < argsLength; k++) {
            array = argsArray[k];
            for (j = 0; j < arrayHelper_getLength(array); j++) {
                x = array[j];
                if (x !== CalcConvertedError) {
                    sum4 += Math_pow((x - mean) / stdev, 4.0);
                }
            }
        }
        return CalcConvert_toResult((n * (n + 1) * sum4) / ((n - 1) * (n - 2) * (n - 3)) - (3 * (n - 1) * (n - 1)) / ((n - 2) * (n - 3)));
    }
}
function st_percentrank(array, xval, significance) {
    return _percentrank(array, xval, significance, true);
}
function st_percentrankexc(array, xval, significance) {
    return _percentrank(array, xval, significance, false);
}
function st_quartile(array, quart) {
    return st_includeAggregateMulti([array, quart], 17);
}
function st_count() {
    return st_includeSubtotals(arguments, 2 , 2 );
}
function st_counta() {
    return st_includeSubtotals(arguments, 2 , 3 );
}


function st_countblank(array) {
    var count = 0;
    for (var i = 0; i < arrayHelper_getLength(array); i++) {
        if (array[i] === keyword_null || array[i] === '') {
            count++;
        }
    }
    return count;
}
function _countifImp(range, criteria) {
    var count = 0.0;
    var isCriteriaZero = criteria === 0 || criteria === '*';
    var crit = parseCriteria(criteria);
    for (var i = 0; i < arrayHelper_getLength(range); i++) {
        var obj = range[i];
        if (!(isCriteriaZero && obj === keyword_null) && crit && crit(obj)) {
            count++;
        }
    }
    return CalcConvert_toResult(count);
}
function st_countif(range, criteria) {
    if (criteria.isArray || criteria.isReference) {
        var d = void 0, val = void 0, i = 0;
        var resultArray = [];
        var rowCount = criteria.rowCount;
        var colCount = criteria.colCount;
        for (var r = 0; r < rowCount; r++) {
            var colValues = [];
            for (var c = 0; c < colCount; c++, i++) {
                val = _countifImp(range, criteria[i]);
                if (CalcConvert_isError(val)) {
                    colValues.push(val);
                    continue;
                }
                d = CalcConvert_toDouble(val);
                if (isNaNFunc(d)) {
                    colValues.push(CalcErrorsValue);
                }
                else {
                    colValues.push(d);
                }
            }
            resultArray.push(colValues);
        }
        return new CalcEngine_1.CalcArray(resultArray);
    }
    return _countifImp(range, criteria[0]);
}


function st_avedev() {
    return st_devsp_avedev(false, arguments);
}
function st_stdeva() {
    return st_stdev_var(arguments, 1, true, true);
}
function st_stdevp() {
    return st_devVarIncludeSubtotals(arguments, 2 , 8 );
}
function st_stdevpa() {
    return st_stdev_var(arguments, 0, true, false);
}
function st_varr() {
    return st_devVarIncludeSubtotals(arguments, 2 , 10 );
}
function st_vara() {
    return st_stdev_var(arguments, 1, false, false);
}
function st_varp() {
    return st_devVarIncludeSubtotals(arguments, 2 , 11 );
}
function st_varpa() {
    return st_stdev_var(arguments, 0, false, false);
}
function st_covar(arrayX, arrayY) {
    return st_covar_convariances(true, arrayX, arrayY);
}
function st_devsp() {
    return st_devsp_avedev(true, arguments);
}
function st_confidence(x, stdev, size) {
    var o = st_normsinv(x / 2.0);
    return CalcConvert_isError(o) ? o : -CalcConvert_toDouble(o) * (stdev / Math_sqrt(size));
}
function st_confidence_t(x, stdev, size) {
    return size === 1 ? CalcErrorsDivideByZero : (stdev * getTInv(x, size - 1, 2) / Math_sqrt(size));
}
function st_intercept(array1, array2) {
    var y, x, sumy = 0.0, sumx = 0.0, sumx2 = 0.0, sumxy = 0.0, b, i;
    var count = 0;
    var n = arrayHelper_getLength(array1);
    if (n !== arrayHelper_getLength(array2)) {
        return CalcErrorsNotAvailable;
    }
    for (i = 0; i < n; i++) {
        y = array1[i];
        x = array2[i];
        if (x !== CalcConvertedError && y !== CalcConvertedError) {
            sumy += y;
            sumx += x;
            sumx2 += x * x;
            sumxy += x * y;
            count++;
        }
    }
    if (count === 0) {
        return CalcErrorsDivideByZero;
    }
    if (count * sumx2 - sumx * sumx === 0.0) {
        return CalcErrorsDivideByZero;
    }
    b = (count * sumxy - sumx * sumy) / (count * sumx2 - sumx * sumx);
    return CalcConvert_toResult((sumy / count) - b * (sumx / count));
}
function st_linest(knownY, knownX, constant, stats) {
    return st_linest_logest(false, knownY, knownX, constant, stats);
}
function st_slope(arrayY, arrayX) {
    var sumy = 0.0, sumx = 0.0, sumx2 = 0.0, sumxy = 0.0, n = 0;
    var length = arrayHelper_getLength(arrayX);
    if (length !== arrayHelper_getLength(arrayY)) {
        return CalcErrorsNotAvailable;
    }
    for (var i = 0; i < length; i++) {
        var valueY = arrayY[i];
        var valueX = arrayX[i];
        if (valueX !== CalcConvertedError && valueY !== CalcConvertedError && !(CalcConvert_isError(valueX)) && !(CalcConvert_isError(valueY))) {
            var y = CalcConvert_toDouble(valueY);
            var x = CalcConvert_toDouble(valueX);
            sumy += y;
            sumx += x;
            sumx2 += x * x;
            sumxy += x * y;
            n++;
        }
    }
    if (n * sumx2 - sumx * sumx === 0.0) {
        return CalcErrorsDivideByZero;
    }
    return CalcConvert_toResult((n * sumxy - sumx * sumy) / (n * sumx2 - sumx * sumx));
}
function st_logest(knownY, knownX, constant, stats) {
    return st_linest_logest(true, knownY, knownX, constant, stats);
}
function st_steyx(array1, array2) {
    var x, y, sumy = 0.0, sumy2 = 0.0, sumx = 0.0, sumx2 = 0.0, sumxy = 0.0, n = 0;
    var length = arrayHelper_getLength(array1);
    if (length !== arrayHelper_getLength(array2)) {
        return CalcErrorsNotAvailable;
    }
    for (var i = 0; i < length; i++) {
        var valueY = array1[i];
        var valueX = array2[i];
        if (valueY !== CalcConvertedError && valueX !== CalcConvertedError) {
            y = valueY;
            x = valueX;
            sumy += y;
            sumy2 += y * y;
            sumx += x;
            sumx2 += x * x;
            sumxy += x * y;
            n++;
        }
    }
    if (n * (n - 2) === 0 || n * sumx2 - sumx * sumx === 0.0) {
        return CalcErrorsDivideByZero;
    }
    return Math_sqrt((n * sumy2 - sumy * sumy - (n * sumxy - sumx * sumy) * (n * sumxy - sumx * sumy) / (n * sumx2 - sumx * sumx)) / (n * (n - 2)));
}
function _lanczos(p) {
    var ser;
    var x = p, tmp = x + 5.5;
    tmp = tmp - (x + 0.5) * Math_log(tmp);
    ser = 1.000000000190015 + 76.18009172947146 / (p + 1.0);
    ser -= 86.50532032941678 / (p + 2.0);
    ser += 24.01409824083091 / (p + 3.0);
    ser -= 1.231739572450155 / (p + 4.0);
    ser += 0.001208650973866179 / (p + 5.0);
    ser -= 5.395239384953E-06 / (p + 6.0);
    return Math_log(2.506628274631001 * ser / x) - tmp;
}
function st_betadist(prob, alpha, beta, a, b) {
    if (prob < a || b < prob || a === b) {
        return CalcErrorsNumber;
    }
    var x = (prob - a) / (b - a);
    var pt1 = _lanczos(alpha + beta);
    var pt2 = _lanczos(alpha);
    var pt3 = _lanczos(beta);
    var pt4 = Math_log(x);
    var pt5 = Math_log(1.0 - x);
    var bt = Math_exp(pt1 - pt2 - pt3 + alpha * pt4 + beta * pt5);
    var temp = bt * _betacf(beta, alpha, 1.0 - x) / beta;
    var retval = (x < (alpha + 1.0) / (alpha + beta + 2.0)) ? temp : 1 - temp;
    return CalcConvert_toResult(retval);
}
function st_deta_dist(prob, alpha, beta, cumulative, a, b) {
    if (prob < a || b < prob || a === b) {
        return CalcErrorsNumber;
    }
    var x = (prob - a) / (b - a);
    return cumulative ? getBetaDist(x, alpha, beta) : getBetaDistPDF(x, alpha, beta) / (b - a);
}
function st_betainv(prob, alpha, beta, aa, bb) {
    var const1 = 2.30753, const2 = 0.27061, const3 = 0.99229, const4 = 0.04481, fpu = 3.0e-308, acu_min = 1.0e-300, lower = fpu;
    var upper = 1.0 - 2.22e-16, five = 5.0, six = 6.0, two = 2.0;

    var swap_tail, i_pb, i_inn, a, adj, logbeta, g, h, pp, prev, qq, r, s, t, tx, w, y, yprev, acu, xinbta;
    logbeta = _lbeta(alpha, beta);
    if (prob <= 0.5) {
        a = prob;
        pp = alpha;
        qq = beta;
        swap_tail = 0;
    }
    else {
        a = 1.0 - prob;
        pp = beta;
        qq = alpha;
        swap_tail = 1;
    }
    r = Math_sqrt(-Math_log(a * a));
    y = r - (const1 + const2 * r) / (1.0 + (const3 + const4 * r) * r);
    if (pp > 1.0 && qq > 1.0) {
        r = (y * y - 3.0) / 6.0;
        s = 1.0 / (pp + pp - 1.0);
        t = 1.0 / (qq + qq - 1.0);
        h = 2.0 / (s + t);
        w = y * Math_sqrt(h + r) / h - (t - s) * (r + five / six - two / (3.0 * h));
        xinbta = pp / (pp + qq * Math_exp(w + w));
    }
    else {
        r = qq + qq;
        t = 1.0 / (9.0 * qq);
        t = r * Math_pow(1.0 - t + y * Math_sqrt(t), 3.0);
        if (t <= 0) {
            xinbta = 1.0 - Math_exp((Math_log((1.0 - a) * qq) + logbeta) / qq);
        }
        else {
            t = (4.0 * pp + r - two) / t;
            xinbta = t <= 1.0 ? Math_exp((Math_log(a * pp) + logbeta) / pp) : 1.0 - two / (t + 1.0);
        }
    }
    r = 1.0 - pp;
    t = 1.0 - qq;
    yprev = 0;
    adj = 1.0;
    if (xinbta < lower) {
        xinbta = lower;
    }
    else if (xinbta > upper) {
        xinbta = upper;
    }
    acu = Math_max(acu_min, Math_pow(10.0, -13.0 - 2.5 / (pp * pp) - 0.5 / (a * a)));
    tx = prev = 0;
    for (i_pb = 0; i_pb < 1000; i_pb++) {
        y = _pbeta_raw(xinbta, pp, qq);
        y = (y - a) * Math_exp(logbeta + r * Math_log(xinbta) + t * Math_log(1.0 - xinbta));
        if (y * yprev <= 0) {
            prev = Math_max(Math_abs(adj), fpu);
        }
        g = 1.0;
        for (i_inn = 0; i_inn < 1000; i_inn++) {
            adj = g * y;
            if (Math_abs(adj) < prev) {
                tx = xinbta - adj;
                if (tx >= 0 && tx <= 1.0) {
                    if (prev <= acu) {
                        if (swap_tail !== 0) {
                            xinbta = 1.0 - xinbta;
                        }
                        return CalcConvert_toResult((bb - aa) * xinbta + aa);
                    }
                    if (Math_abs(y) <= acu) {
                        if (swap_tail !== 0) {
                            xinbta = 1.0 - xinbta;
                        }
                        return CalcConvert_toResult((bb - aa) * xinbta + aa);
                    }
                    if (tx !== 0 && tx !== 1.0) {
                        break;
                    }
                }
            }
            g /= 3.0;
        }
        if (tx === xinbta) {
            if (swap_tail !== 0) {
                xinbta = 1.0 - xinbta;
            }
            return CalcConvert_toResult((bb - aa) * xinbta + aa);
        }
        xinbta = tx;
        yprev = y;
    }
    if (swap_tail !== 0) {
        xinbta = 1.0 - xinbta;
    }
    return CalcConvert_toResult((bb - aa) * xinbta + aa);
}
function st_binomdist(x, n, p, cum) {
    if (n < x) {
        return CalcErrorsNumber;
    }
    var q, factor, i;
    if (!cum) {
        q = 1.0 - p;
        factor = Math_pow(q, n);
        if (factor === 0.0) {
            factor = Math_pow(p, n);
            if (factor === 0.0) {
                return CalcErrorsNumber;
            }
            for (i = 0; i < n - x && factor > 0.0; i++) {
                factor *= CalcConvert_toDouble(n - i) / CalcConvert_toDouble(i + 1) * q / p;
            }
            return factor;
        }
        for (i = 0; i < x && factor > 0.0; i++) {
            factor *= CalcConvert_toDouble(n - i) / CalcConvert_toDouble(i + 1) * p / q;
        }
        return factor;
    }
    else if (n === x) {
        return 1.0;
    }
    q = 1.0 - p;
    factor = Math_pow(q, n);
    var sum;
    if (factor === 0.0) {
        factor = Math_pow(p, n);
        if (factor === 0.0) {
            return CalcErrorsNumber;
        }
        sum = 1.0 - factor;
        for (i = 0; i < n - x && factor > 0.0; i++) {
            factor *= CalcConvert_toDouble(n - i) / CalcConvert_toDouble(i + 1) * q / p;
            sum -= factor;
        }
        if (sum < 0.0) {
            return 0.0;
        }
        return sum;
    }
    sum = factor;
    for (i = 0; i < x && factor > 0.0; i++) {
        factor *= CalcConvert_toDouble(n - i) / CalcConvert_toDouble(i + 1) * p / q;
        sum += factor;
    }
    return sum;
}
function st_negbinomdist(x, r, p) {
    if (x + r - 1 <= 0) {
        return CalcErrorsNumber;
    }
    var o = combin(x + r - 1, r - 1);
    if (CalcConvert_isError(o)) {
        return o;
    }
    return CalcConvert_toResult(CalcConvert_toDouble(o) * Math_pow(p, r) * Math_pow(1.0 - p, x));
}
function st_negbinom_dist(x, r, p, bCumulative) {
    if (x + r - 1 <= 0) {
        return CalcErrorsNumber;
    }
    if (bCumulative) {
        return 1 - getBetaDist(1 - p, x + 1, r);
    }
    var fFactor = Math_pow(p, r), i;
    for (i = 0; i < x; i++) {
        fFactor *= (i + r) / (i + 1.0) * (1 - p);
    }
    return fFactor;
}
function st_critbinom(n, p, alpha) {
    var q = 1.0 - p;
    var factor = Math_pow(q, n);
    var sum, i;
    if (factor === 0.0) {
        factor = Math_pow(p, n);
        if (factor === 0.0) {
            return CalcErrorsNumber;
        }
        sum = 1.0 - factor;
        for (i = 0; i < n && sum >= alpha; i++) {
            factor *= CalcConvert_toDouble(n - i) / CalcConvert_toDouble((i + 1) * q / p);
            sum -= factor;
        }
        return CalcConvert_toDouble(n - i);
    }
    sum = factor;
    for (i = 0; i < n && sum < alpha; i++) {
        factor *= CalcConvert_toDouble(n - i) / CalcConvert_toDouble((i + 1) * p / q);
        sum += factor;
    }
    return CalcConvert_toDouble(i);
}
function st_chidist(x, df) {
    var LOG_SQRT_PI = Math_log(Math_sqrt(Math_PI));
    var I_SQRT_PI = 1.0 / Math_sqrt(Math_PI);
    var e, s, z, c, y = 0.0, x1 = x, a = 0.5 * x1;
    var even = (df % 2 === 0);
    if (df > 1.0) {
        y = Math_exp(-a);
    }
    var o = st_normsdist(-Math_sqrt(x1));
    if (CalcConvert_isError(o)) {
        return o;
    }
    var zz = CalcConvert_toDouble(o);
    s = (even ? y : (2.0 * zz));
    if (df > 2) {
        x1 = 0.5 * (df - 1.0);
        z = (even ? 1.0 : 0.5);
        if (a > 20.0) {
            e = (even ? 0.0 : LOG_SQRT_PI);
            c = Math_log(a);
            while (z <= x1) {
                e = Math_log(z) + e;
                s += Math_exp(c * z - a - e);
                z += 1.0;
            }
            return s;
        }
        e = (even ? 1.0 : (I_SQRT_PI / Math_sqrt(a)));
        c = 0.0;
        while (z <= x1) {
            e = e * (a / z);
            c = c + e;
            z += 1.0;
        }
        return c * y + s;
    }
    return s;
}
function st_chisq_dist(x, df, bCumulative) {
    return bCumulative ? getChisqDistCDF(x, df) : getChisqDistPDF(x, df);
}
function st_chiinv(x, df) {
    var o = st_gammainv(1 - x, 0.5 * df, 2.0);
    return CalcConvert_toDouble(o);
}
function getChisqDistFunction(fp, fDF) {
    return {
        _getValue: function (x) {
            return fp - getChisqDistCDF(x, fDF);
        }
    };
}
function st_chisq_inv(x, df) {
    var chisqDistFunction = getChisqDistFunction(x, df);
    var option = { _bConvError: false };
    var fVal = _iterateInverse(chisqDistFunction, df * 0.5, df, option);
    return option._bConvError ? CalcErrorsNotAvailable : fVal;
}
function st_chitest(arrayA, arrayE) {
    var sum = 0.0;
    var df;
    var r = arrayA.rowCount;
    var c = arrayA.colCount;
    if (r !== arrayE.rowCount || c !== arrayE.colCount) {
        return CalcErrorsNotAvailable;
    }
    if (r > 1 && c > 1) {
        df = (r - 1) * (c - 1);
    }
    else if (r > 1 && c === 1) {
        df = r - 1;
    }
    else if (r === 1 && c > 1) {
        df = c - 1;
    }
    else {
        return CalcErrorsNotAvailable;
    }
    for (var i = 0; i < arrayHelper_getLength(arrayA); i++) {
        var a = arrayA[i], e = arrayE[i];
        if (a !== CalcConvertedError && e !== CalcConvertedError) {
            if (e === 0) {
                return CalcErrorsDivideByZero;
            }
            sum += ((a - e) * (a - e)) / e;
        }
    }
    if (sum < 0) {
        return CalcErrorsNumber;
    }
    return st_chidist(sum, df);
}
function st_correl(array1, array2) {
    var valueType = CalcEngine_1.ExcelCompatibleCalcMode ? 5 : 1 ;

    var arrayX = CalcConvert_toArray(array1, valueType, true, false , false, true);
    var arrayY = CalcConvert_toArray(array2, valueType, true, false , false, true);
    var sumx = 0.0, sumy = 0.0, sumx2 = 0.0, sumy2 = 0.0, sumprod = 0.0, meanx, meany, stdevx, stdevy;
    var n = arrayHelper_getLength(arrayY);
    if (n !== arrayHelper_getLength(arrayX)) {
        return CalcErrorsNotAvailable;
    }
    var count = 0, i, x, y;
    for (i = 0; i < n; i++) {
        x = arrayX[i];
        y = arrayY[i];
        if (CalcConvert_isError(x)) {
            return x;
        }
        if (CalcConvert_isError(y)) {
            return y;
        }
        if (x !== CalcConvertedError && y !== CalcConvertedError) {
            sumx += x;
            sumy += y;
            sumx2 += x * x;
            sumy2 += y * y;
            count++;
        }
    }
    if (count <= 1) {
        return CalcErrorsDivideByZero;
    }
    meanx = sumx / count;
    meany = sumy / count;
    stdevx = Math_sqrt((count * sumx2 - sumx * sumx) / (count * (count - 1)));
    stdevy = Math_sqrt((count * sumy2 - sumy * sumy) / (count * (count - 1)));
    if (stdevx === 0.0 || stdevy === 0.0) {
        return CalcErrorsDivideByZero;
    }
    for (i = 0; i < n; i++) {
        x = arrayX[i];
        y = arrayY[i];
        if (x !== CalcConvertedError && y !== CalcConvertedError) {
            sumprod += (x - meanx) * (y - meany);
        }
    }
    return CalcConvert_toResult(sumprod / CalcConvert_toDouble((count - 1) * stdevx * stdevy));
}
function st_expondist(x, lambda, cum) {
    var exp = Math_exp(-lambda * x);
    return CalcConvert_toResult(cum ? 1.0 - exp : lambda * exp);
}
function st_fdist(x, df1, df2) {
    var a1 = df1 * x / (df1 * x + df2);
    var a2 = 0.5 * df1;
    var a3 = 0.5 * df2;
    var o = st_betadist(a1, a2, a3, 0, 1);
    if (CalcConvert_isError(o)) {
        return o;
    }
    return 1.0 - CalcConvert_toDouble(o);
}
function st_f_dist(x, df1, df2, bCum) {
    if (bCum) {
        var temp = getBetaDist(df2 / (df2 + df1 * x), df2 / 2, df1 / 2);
        return (1.0 - temp);
    }

    return (Math_pow(df1 / df2, df1 / 2) * Math_pow(x, (df1 / 2) - 1) / (Math_pow((1 + (x * df1 / df2)), (df1 + df2) / 2) * getBetaOrLogbeta(true, df1 / 2, df2 / 2)));
}
function st_finv(f, df1, df2) {
    var x = 1.0 - f;
    var o = st_betainv(1.0 - x, df2 / 2.0, df1 / 2.0, 0, 1);
    if (CalcConvert_isError(o)) {
        return o;
    }
    return (1.0 / CalcConvert_toDouble(o) - 1.0) * (df2 / df1);
}
function st_f_inv(f, df1, df2) {
    var x = 1.0 - f;
    var o = st_betainv(x, df2 / 2.0, df1 / 2.0, 0, 1);
    if (CalcConvert_isError(o)) {
        return o;
    }
    return (1.0 / CalcConvert_toDouble(o) - 1.0) * (df2 / df1);
}
function st_fisher(x) {
    return Math_log((1.0 + x) / (1.0 - x)) / 2.0;
}
function st_fisherinv(y) {
    var pt1 = Math_exp(2.0 * y) - 1.0;
    var pt2 = Math_exp(2.0 * y) + 1.0;
    if (!isFiniteFunc(pt1) && pt1 > 0 && !isFiniteFunc(pt2) && pt2 > 0) {
        return 1.0;
    }
    return pt1 / pt2;
}
function st_ftest(array1, array2) {
    var cl = { N: 0, M: 0.0, Q: 0.0, _sum: 0.0 };
    var var1, var2, p, dof1, dof2;
    _stat(cl, array1);
    dof1 = cl.N - 1;
    if (cl.N === 1.0) {
        return CalcErrorsDivideByZero;
    }
    var1 = cl.Q / (cl.N - 1.0);
    if (var1 === 0.0) {
        return CalcErrorsDivideByZero;
    }
    cl.N = 0;
    cl.M = 0.0;
    cl.Q = 0.0;
    cl._sum = 0.0;
    _stat(cl, array2);
    dof2 = cl.N - 1;
    if (cl.N === 1.0) {
        return CalcErrorsDivideByZero;
    }
    var2 = cl.Q / (cl.N - 1.0);
    if (var2 === 0.0) {
        return CalcErrorsDivideByZero;
    }
    var o = st_fdist(var1 / var2, dof1, dof2);
    if (CalcConvert_isError(o)) {
        return o;
    }
    p = (1.0 - CalcConvert_toDouble(o)) * 2;
    if (p > 1.0) {
        p = 2.0 - p;
    }
    return p;
}
function st_gammadist(x, alpha, beta, cum) {
    if (cum === false) {
        var pt1 = Math_pow(beta, alpha);
        if (isNaNFunc(pt1) || !isFiniteFunc(pt1)) {
            return CalcErrorsDivideByZero;
        }
        var pt2 = 1.0 / (pt1 * _gamma(alpha));
        var pt3 = Math_pow(x, alpha - 1.0);
        var pt4 = Math_exp(-(x / beta));
        var pt5 = pt3 * pt4;
        return pt2 * pt5;
    }
    var pn1, pn2, pn3, pn4, pn5, pn6, arg, c, rn, a, b, an;
    var sum, o;
    var third = 1.0 / 3.0;
    var xbig = 1.0e+8;
    var oflo = 1.0e+37;
    var plimit = 1000.0e0;
    var elimit = -88.0e0;
    x = x / beta;
    if (x <= 0.0) {
        return CalcErrorsNumber;
    }
    if (alpha > plimit) {
        pn1 = Math_sqrt(alpha) * 3.0 * (Math_pow((x / alpha), third) + 1.0 / (alpha * 9.0) - 1.0);
        o = st_normdist(pn1, 0.0, 1.0, true);
        if (CalcConvert_isError(o)) {
            return o;
        }
        return CalcConvert_toDouble(o);
    }
    if (x > xbig) {
        return 1.0;
    }
    if (x <= 1.0 || x < alpha) {
        o = st_gammaln(alpha + 1.0);
        if (CalcConvert_isError(o)) {
            return o;
        }
        arg = alpha * Math_log(x) - x - CalcConvert_toDouble(o);
        c = 1.0;
        sum = 1.0;
        a = alpha;
        do {
            a = a + 1.0;
            c = c * x / a;
            sum = sum + c;
        } while (c > 2.2204460492503131e-016);
        arg = arg + Math_log(sum);
        sum = 0.0;
        if (arg >= elimit) {
            sum = Math_exp(arg);
        }
    }
    else {
        o = st_gammaln(alpha);
        if (CalcConvert_isError(o)) {
            return o;
        }
        arg = alpha * Math_log(x) - x - CalcConvert_toDouble(o);
        a = 1.0 - alpha;
        b = a + x + 1.0;
        c = 0.0;
        pn1 = 1.0;
        pn2 = x;
        pn3 = x + 1.0;
        pn4 = x * b;
        sum = pn3 / pn4;
        for (;;) {
            a = a + 1.0;
            b = b + 2.0;
            c = c + 1.0;
            an = a * c;
            pn5 = b * pn3 - an * pn1;
            pn6 = b * pn4 - an * pn2;
            if (Math_abs(pn6) > 0.0) {
                rn = pn5 / pn6;
                if (Math_abs(sum - rn) <= Math_min(2.2204460492503131e-016, 2.2204460492503131e-016 * rn)) {
                    break;
                }
                sum = rn;
            }
            pn1 = pn3;
            pn2 = pn4;
            pn3 = pn5;
            pn4 = pn6;
            if (Math_abs(pn5) >= oflo) {
                pn1 = pn1 / oflo;
                pn2 = pn2 / oflo;
                pn3 = pn3 / oflo;
                pn4 = pn4 / oflo;
            }
        }
        arg = arg + Math_log(sum);
        sum = 1.0;
        if (arg >= elimit) {
            sum = 1.0 - Math_exp(arg);
        }
    }
    return sum;
}
function st_gammainv(prob, alpha, beta) {
    var C7 = 4.67, C8 = 6.66, C9 = 6.73, C10 = 13.32, C11 = 60.0, C12 = 70.0, C13 = 84.0, C14 = 105.0;
    var C15 = 120.0, C16 = 127.0, C17 = 140.0, C18 = 1175.0, C19 = 210.0, C20 = 252.0, C21 = 2264.0;
    var C22 = 294.0, C23 = 346.0, C24 = 420.0, C25 = 462.0, C26 = 606.0, C27 = 672.0, C28 = 707.0;
    var C29 = 735.0, C30 = 889.0, C31 = 932.0, C32 = 966.0, C33 = 1141.0, C34 = 1182.0, C35 = 1278.0;
    var C36 = 1740.0, C37 = 2520.0, C38 = 5040.0, EPS0 = 5.0e-7, EPS1 = 1.0e-2, EPS2 = 5.0e-7;
    var MAXIT = 20.0, pMIN = 0.000002, pMAX = 0.999998;

    var a, b, c, ch, g, p1, v;
    var p2, q, s1, s2, s3, s4, s5, s6, t, x;
    var i;
    if (prob < pMIN) {
        return 0.0;
    }
    if (prob > pMAX) {
        return MAX_DOUBLE_VALUE;
    }
    v = 2.0 * alpha;
    c = alpha - 1.0;
    var o = st_gammaln(alpha);
    if (CalcConvert_isError(o)) {
        return o;
    }
    g = CalcConvert_toDouble(o);
    if (v < (-1.24) * Math_log(prob)) {
        ch = Math_pow(prob * alpha * Math_exp(g + alpha * 0.69314718055994530942), 1.0 / alpha);
        if (ch < EPS0) {
            return NaN;
        }
    }
    else if (v > 0.32) {
        o = st_norminv(prob, 0.0, 1.0);
        if (CalcConvert_isError(o)) {
            return o;
        }
        x = CalcConvert_toDouble(o);
        p1 = 0.222222 / v;
        ch = v * Math_pow(x * Math_sqrt(p1) + 1.0 - p1, 3.0);
        if (ch > 2.2 * v + 6) {
            ch = -2.0 * (Math_log(1.0 - prob) - c * Math_log(0.5 * ch) + g);
        }
    }
    else {
        ch = 0.4;
        a = Math_log(1.0 - prob) + g + c * 0.69314718055994530942;
        do {
            q = ch;
            p1 = 1.0 + ch * (C7 + ch);
            p2 = ch * (C9 + ch * (C8 + ch));
            t = -0.5 + (C7 + 2 * ch) / p1 - (C9 + ch * (C10 + 3.0 * ch)) / p2;
            ch -= (1.0 - Math_exp(a + 0.5 * ch) * p2 / p1) / t;
        } while (Math_abs(q / ch - 1.0) > EPS1);
    }
    for (i = 1; i <= MAXIT; i++) {
        q = ch;
        p1 = 0.5 * ch;
        o = st_gammadist(p1, alpha, 1.0, true);
        if (CalcConvert_isError(o)) {
            return o;
        }
        p2 = prob - CalcConvert_toDouble(o);
        t = p2 * Math_exp(alpha * 0.69314718055994530942 + g + p1 - c * Math_log(ch));
        b = t / ch;
        a = 0.5 * t - b * c;
        s1 = (C19 + a * (C17 + a * (C14 + a * (C13 + a * (C12 + C11 * a))))) / C24;
        s2 = (C24 + a * (C29 + a * (C32 + a * (C33 + C35 * a)))) / C37;
        s3 = (C19 + a * (C25 + a * (C28 + C31 * a))) / C37;
        s4 = (C20 + a * (C27 + C34 * a) + c * (C22 + a * (C30 + C36 * a))) / C38;
        s5 = (C13 + C21 * a + c * (C18 + C26 * a)) / C37;
        s6 = (C15 + c * (C23 + C16 * c)) / C38;
        ch = ch + t * (1 + 0.5 * t * s1 - b * c * (s1 - b * (s2 - b * (s3 - b * (s4 - b * (s5 - b * s6))))));
        if (Math_abs(q / ch - 1) > EPS2) {
            return 0.5 * beta * ch;
        }
    }
    return 0.5 * beta * ch;
}
function st_gammaln(x) {
    return _lgamma(x);
}
function st_hypgeomdist(a1, a2, a3, a4) {
    if (a1 > Math_min(a2, a3) || a1 < Math_max(0.0, a2 - a4 + a3) || a2 > a4 || a3 > a4) {
        return CalcErrorsNumber;
    }
    return getHypGeomDist(a1, a2, a3, a4);
}
function st_hypgeom_dist(a1, a2, a3, a4, bCumulative) {
    if (a1 > Math_min(a2, a3) || a1 < Math_max(0.0, a2 - a4 + a3) || a2 > a4 || a3 > a4) {
        return CalcErrorsNumber;
    }
    if (bCumulative) {
        var fVal = 0.0;
        for (var i = 0; i <= a1; i++) {
            fVal += getHypGeomDist(i, a2, a3, a4);
        }
        return fVal;
    }
    return getHypGeomDist(a1, a2, a3, a4);
}
function st_lognormdist(x, mean, stdev) {
    return st_normsdist((Math_log(x) - mean) / stdev);
}
function st_lognorm_dist(x, mean, stdev, bCumulative) {
    if (bCumulative) {
        return st_normsdist((Math_log(x) - mean) / stdev);
    }
    var temp = (Math_log(x) - mean) / stdev;
    return 0.39894228040143268 * Math_exp(-(temp * temp) / 2.0) / stdev / x;
}
function st_loginv(prob, mean, stdev) {
    var o = st_normsinv(prob);
    if (CalcConvert_isError(o)) {
        return o;
    }
    var p = CalcConvert_toDouble(o);
    return CalcConvert_toResult(Math_exp(mean + stdev * p));
}
function st_normdist(x, mean, stdev, cumulative) {
    if (cumulative) {
        return st_normsdist((x - mean) / stdev);
    }
    return CalcConvert_toResult(Math_exp(-((x - mean) * (x - mean)) / (2.0 * stdev * stdev)) / (Math_sqrt(2 * Math_PI) * stdev));
}
function st_norminv(prob, mean, stdev) {
    var r, val, q = prob - 0.5;
    if (Math_abs(q) <= 0.42) {
        r = q * q;
        val = q * (((-25.44106049637 * r + 41.39119773534) * r - 18.61500062529) * r + 2.50662823884) / ((((3.13082909833 * r - 21.06224101826) * r + 23.08336743743) * r + -8.47351093090) * r + 1.0);
    }
    else {
        r = prob;
        if (q > 0.0) {
            r = 1.0 - prob;
        }
        if (r > 2.2204460492503131e-016) {
            r = Math_sqrt(-Math_log(r));
            val = (((2.32121276858 * r + 4.85014127135) * r - 2.29796479134) * r - 2.78718931138) / ((1.63706781897 * r + 3.54388924762) * r + 1.0);
            if (q < 0.0) {
                val = -val;
            }
        }
        else if (r > 1e-300) {
            val = -2.0 * Math_log(prob);
            r = Math_log(6.283185307179586476925286766552 * val);
            r = r / val + (2.0 - r) / (val * val) + (-14.0 + 6.0 * r - r * r) / (2.0 * val * val * val);
            val = Math_sqrt(val * (1 - r));
            return q < 0.0 ? -val : val;
        }
        else {
            if (q < 0.0) {
                return -MAX_DOUBLE_VALUE;
            }
            return MAX_DOUBLE_VALUE;
        }
    }
    var x = (val - 0.0) / 1.0;
    var denom = 0.398942280401432677939946059934 * Math_exp(-0.5 * x * x) / 1.0;
    var o = st_normdist(val, 0.0, 1.0, true);
    if (CalcConvert_isError(o)) {
        return o;
    }
    val = val - (o - prob) / denom;
    return mean + stdev * val;
}
function st_normsinv(prob) {
    return st_norminv(prob, 0.0, 1.0);
}
function st_norm_s_dist(z, bCumulative) {
    return bCumulative ? _integralPhi(z) : Math_exp(-Math_pow(z, 2) / 2) / Math_sqrt(2 * Math_PI);
}
function st_pearson(array1, array2) {
    var sumx = 0.0, sumy = 0.0, sumx2 = 0.0, sumy2 = 0.0, sumxy = 0.0;
    var n = arrayHelper_getLength(array1);
    if (n !== arrayHelper_getLength(array2)) {
        return CalcErrorsNotAvailable;
    }
    var count = 0;
    for (var i = 0; i < n; i++) {
        var x = array1[i];
        var y = array2[i];
        if (Functions_isNumber(x) && Functions_isNumber(y)) {
            sumx += x;
            sumy += y;
            sumx2 += x * x;
            sumy2 += y * y;
            sumxy += x * y;
            count++;
        }
    }
    if ((count * sumx2 - sumx * sumx) === 0 || (count * sumy2 - sumy * sumy) === 0) {
        return CalcErrorsDivideByZero;
    }
    return (count * sumxy - sumx * sumy) / Math_sqrt((count * sumx2 - sumx * sumx) * (count * sumy2 - sumy * sumy));
}
function st_rsq(arrayY, arrayX) {
    var sumx = 0.0, sumy = 0.0, sumx2 = 0.0, sumy2 = 0.0, sumxy = 0.0, n = 0;
    var length = arrayHelper_getLength(arrayX);
    if (length !== arrayHelper_getLength(arrayY)) {
        return CalcErrorsNotAvailable;
    }
    for (var i = 0; i < length; i++) {
        var x = arrayX[i];
        var y = arrayY[i];
        if (Functions_isNumber(x) && Functions_isNumber(y)) {
            sumx += x;
            sumy += y;
            sumx2 += x * x;
            sumy2 += y * y;
            sumxy += x * y;
            n++;
        }
    }
    var divisor = Math_sqrt((n * sumx2 - sumx * sumx) * (n * sumy2 - sumy * sumy));
    if (divisor === 0.0) {
        return CalcErrorsDivideByZero;
    }
    var r = (n * sumxy - sumx * sumy) / divisor;
    return CalcConvert_toResult(r * r);
}
function st_poisson(x, mean, cumulative) {
    var result = 0.0;
    if (cumulative) {
        for (var i = 0; i <= x; i++) {
            result += (Math_exp(-mean) * Math_pow(mean, i)) / CalcEngine_1.Functions._fact(i);
        }
    }
    else {
        result = (Math_exp(-mean) * Math_pow(mean, x)) / CalcEngine_1.Functions._fact(x);
    }
    return CalcConvert_toResult(result);
}
function st_prob(array1, array2, lower, upperArg) {
    var upper = lower;
    if (upperArg !== keyword_undefined) {
        upper = CalcConvert_toDouble(upperArg);
        if (isNaNFunc(upper)) {
            return CalcErrorsValue;
        }
    }
    var sum = 0.0;
    var total_sum = 0.0;
    var n = arrayHelper_getLength(array1);
    if (n !== arrayHelper_getLength(array2)) {
        return CalcErrorsNotAvailable;
    }
    for (var i = 0; i < n; i++) {
        var x = array1[i], prob = array2[i];
        if (x !== CalcConvertedError && prob !== CalcConvertedError) {
            if (prob <= 0.0 || 1.0 < prob) {
                return CalcErrorsNumber;
            }
            if (lower <= x && x <= upper) {
                sum += prob;
            }
            total_sum += prob;
        }
    }
    if (total_sum !== 1.0) {
        return CalcErrorsNumber;
    }
    return sum;
}
function st_skew() {
    var args = arguments;
    var sumx = 0.0, sumx2 = 0.0, sumskew = 0.0, meanx, stdev, n = 0;
    var i, j, x;
    var argArrays = [], array;
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        array = args[i];
        argArrays.push(array);
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            x = array[j];
            if (x !== CalcConvertedError) {
                sumx += x;
                sumx2 += x * x;
                n++;
            }
        }
    }
    if (n <= 2) {
        return CalcErrorsDivideByZero;
    }
    meanx = sumx / n;
    stdev = Math_sqrt((n * sumx2 - sumx * sumx) / (n * (n - 1)));
    if (stdev === 0.0) {
        return CalcErrorsDivideByZero;
    }
    for (i = 0; i < arrayHelper_getLength(argArrays); i++) {
        array = argArrays[i];
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            x = array[j];
            if (x !== CalcConvertedError) {
                sumskew += Math_pow((x - meanx) / stdev, 3.0);
            }
        }
    }
    return CalcConvert_toResult((n * sumskew) / ((n - 1) * (n - 2)));
}
function st_skew_p() {
    var args = arguments;
    var sumx = 0.0, average, stdev, n = 0;
    var i, j, x;
    var array, effectDatas = [];
    for (i = 0; i < arrayHelper_getLength(args); i++) {
        array = args[i];
        if (arrayHelper_getLength(args) === 1 && arrayHelper_getLength(array) === 0) {
            return CalcErrorsNull;
        }
        for (j = 0; j < arrayHelper_getLength(array); j++) {
            x = array[j];
            var doubleX = { value: 0 };
            if (x !== CalcConvertedError && typeof x !== 'boolean' && _tryToDouble(x, doubleX)) {
                sumx += doubleX.value;
                n++;
                effectDatas.push(doubleX.value);
            }
        }
    }
    if (n <= 2) {
        return CalcErrorsDivideByZero;
    }
    average = sumx / n;
    var variance3 = 0, variance = 0, num = 0;
    for (i = 0; i < effectDatas.length; i++) {
        num = effectDatas[i] - average;
        variance += Math_pow(num, 2.0);
        variance3 += Math_pow(num, 3.0);
    }
    stdev = Math_sqrt(variance / n);
    if (stdev === 0.0) {
        return CalcErrorsDivideByZero;
    }
    return CalcConvert_toResult((variance3 / n / stdev / stdev / stdev));
}
function st_standardize(x, mean, stdev) {
    return (x - mean) / stdev;
}
function st_tdist(x, df, tails) {
    if (tails !== 1 && tails !== 2) {
        return CalcErrorsNumber;
    }
    var f = df;
    var a = x / Math_sqrt(f);
    var b = f / (f + (x * x));
    var im2 = f - 2.0;
    var ioe = f % 2.0;
    var s = 1.0, c = 1.0;
    f = 1.0;
    var ks = 2.0 + ioe;
    var fk = ks;
    if (im2 >= 2.0) {
        for (var i = CalcConvert_toInt(ks); i <= im2; i = i + 2) {
            c = c * b * (fk - 1.0) / fk;

            s += c;
            if (s === f) {
                break;
            }
            f = s;

            fk += 2;
        }
    }
    if (ioe !== 1.0) {
        return tails * (1.0 - (0.5 + 0.5 * a * Math_sqrt(b) * s));
    }
    if (df === 1.0) {
        s = 0.0;
    }
    return tails * (1.0 - (0.5 + (a * b * s + Math_atan(a)) * 0.3183098862));
}
function st_t_dist(x, df, bCumulative) {
    return getTDist(x, df, (bCumulative ? 4 : 3));
}
function st_tdistrt(x, df) {
    return st_tdist(x, df, 1);
}
function st_tdist2t(x, df) {
    return st_tdist(x, df, 2);
}
function st_tinv(val, ndf) {
    var eps = 1.0e-12;
    var a, b, c, d, prob, P, q, x, y, neg;
    var p1 = val / 2;
    var p2 = p1;
    if (ndf > 1.0e20) {
        return st_normsinv(p1);
    }
    if (p2 < 0.5) {
        neg = 0;
        P = 2.0 * p2;
    }
    else {
        neg = 1;
        P = 2.0 * (1.0 - p2);
    }
    if (Math_abs(ndf - 2.0) < eps) {
        if (P > 0.0) {
            q = Math_sqrt(2.0 / (P * (2.0 - P)) - 2.0);
        }
        else {
            q = MAX_DOUBLE_VALUE;
        }
    }
    else if (CalcConvert_toDouble(ndf) < 1.0 + eps) {
        if (P > 0.0) {
            prob = (P + 1.0) * 1.57079632679489661923;
            q = -Math_tan(prob);
        }
        else {
            q = MAX_DOUBLE_VALUE;
        }
    }
    else {
        a = 1.0 / (ndf - 0.5);
        b = 48.0 / (a * a);
        c = ((20700.0 * a / b - 98.0) * a - 16.0) * a + 96.36;
        d = ((94.5 / (b + c) - 3.0) / b + 1.0) * Math_sqrt(a * 1.57079632679489661923) * ndf;
        y = Math_pow(d * P, 2.0 / ndf);
        if (y > 0.05 + a) {
            var o = st_normsinv(0.5 * P);
            if (CalcConvert_isError(o)) {
                return o;
            }
            x = CalcConvert_toDouble(o);
            y = x * x;
            if (ndf < 5.0) {
                c = c + 0.3 * (ndf - 4.5) * (x + 0.6);
            }
            c = (((0.05 * d * x - 5.0) * x - 7.0) * x - 2.0) * x + b + c;
            y = (((((0.4 * y + 6.3) * y + 36) * y + 94.5) / c - y - 3.0) / b + 1.0) * x;
            y = a * y * y;
            if (y > 0.002) {
                y = Math_exp(y) - 1.0;
            }
            else {
                y = 0.5 * y * y + y;
            }
        }
        else {
            y = ((1.0 / (((ndf + 6.0) / (ndf * y) - 0.089 * d - 0.822) * (ndf + 2.0) * 3.0) + 0.5 / (ndf + 4.0)) * y - 1.0) * (ndf + 1.0) / (ndf + 2.0) + 1.0 / y;
        }
        q = Math_sqrt(ndf * y);
    }
    if (neg !== 0.0) {
        q = -q;
    }
    return CalcConvert_toResult(q);
}
function st_t_inv(val, ndf) {
    return val < 0.5 ? -(getTInv(1 - val, ndf, 4)) : getTInv(val, ndf, 4);
}
function st_ttest(array1, array2, tails, type) {
    var mean1, mean2, x;
    var s, var1, var2, dof;
    var cl = { N: 0, M: 0, Q: 0, _sum: 0 };
    var n1, n2;
    if (tails !== 1 && tails !== 2) {
        return CalcErrorsNumber;
    }
    if (type === 1) {
        var sum = void 0, dx = void 0, dm = void 0, M = void 0, Q = void 0, N = void 0, i = void 0;
        if (arrayHelper_getLength(array1) !== arrayHelper_getLength(array2)) {
            return CalcErrorsNotAvailable;
        }
        var length1 = arrayHelper_getLength(array1);
        for (i = 0; i < length1; i++) {
            array1[i] = array1[i] - array2[i];
        }
        M = Q = N = sum = 0;
        for (i = 0; i < length1; i++) {
            var array1i = array1[i];
            dx = array1i - M;
            dm = dx / (N + 1.0);
            M += dm;
            Q += N * dx * dm;
            N++;
            sum += array1i;
        }
        if (N - 1.0 === 0 || N === 0.0) {
            return CalcErrorsDivideByZero;
        }
        s = Math_sqrt(Q / (N - 1.0));
        if (isNaNFunc(s) || !isFiniteFunc(s)) {
            return CalcErrorsNumber;
        }
        mean1 = sum / N;
        x = mean1 / (s / Math_sqrt(N));
        dof = N - 1.0;
    }
    else {
        cl.N = 0;
        cl.M = 0.0;
        cl.Q = 0.0;
        cl._sum = 0.0;
        _stat1(cl, array1);
        var1 = cl.Q / (cl.N - 1.0);
        mean1 = cl._sum / cl.N;
        n1 = cl.N;
        cl.N = 0;
        cl.M = 0.0;
        cl.Q = 0.0;
        cl._sum = 0.0;
        _stat1(cl, array2);
        var2 = cl.Q / (cl.N - 1.0);
        mean2 = cl._sum / cl.N;
        n2 = cl.N;
        if (type !== 2) {
            var c = (var1 / n1) / (var1 / n1 + var2 / n2);
            dof = 1.0 / ((c * c) / CalcConvert_toDouble(n1 - 1) + ((1.0 - c) * (1.0 - c)) / CalcConvert_toDouble(n2 - 1));
        }
        else {
            dof = CalcConvert_toDouble(n1 + n2 - 2);
        }
        x = (mean1 - mean2) / Math_sqrt(var1 / CalcConvert_toDouble(n1) + var2 / CalcConvert_toDouble(n2));
    }
    x = Math_abs(x);
    var value = _betaregularized(0.5 * dof, 0.5, dof / (dof + x * x));
    if (CalcConvert_isError(value)) {
        return value;
    }
    return 0.5 * tails * CalcConvert_toDouble(value);
}
function st_weibull(x, alpha, beta, cum) {
    var temp = Math_exp(-Math_pow((x / beta), alpha));
    return cum ? CalcConvert_toResult(1.0 - temp)
        : CalcConvert_toResult((alpha / Math_pow(beta, alpha)) * Math_pow(x, alpha - 1.0) * temp);
}
function st_ztest(array, val, sigmaArg) {
    var sigma = 0;
    var sumx = 0.0, sumx2 = 0.0, meanx, stdev, n = 0, x;
    if (sigmaArg !== keyword_undefined) {
        sigma = CalcConvert_toDouble(sigmaArg);
        if (isNaNFunc(sigma)) {
            return CalcErrorsValue;
        }
    }
    for (var i = 0; i < arrayHelper_getLength(array); i++) {
        var obj = array[i];
        if (obj !== CalcConvertedError) {
            x = CalcConvert_toDouble(obj);
            sumx += x;
            sumx2 += x * x;
            n++;
        }
    }
    if (n === 0) {
        return CalcErrorsNotAvailable;
    }
    if (n === 1) {
        return CalcErrorsDivideByZero;
    }
    meanx = sumx / n;
    stdev = sigmaArg !== keyword_undefined ? sigma : Math_sqrt((n * sumx2 - sumx * sumx) / (n * (n - 1)));
    if (stdev === 0.0) {
        return CalcErrorsDivideByZero;
    }
    var o = st_normsdist((meanx - val) / (stdev / Math_sqrt(n)));
    return CalcConvert_isError(o) ? o : CalcConvert_toResult(1.0 - CalcConvert_toDouble(o));
}
function st_permut(n, k) {
    n = CalcConvert_toDouble(CalcConvert_toInt(n));
    k = CalcConvert_toDouble(CalcConvert_toInt(k));
    var result = 1.0, i;
    if (n < 0.0 || k < 0.0 || n < k) {
        return CalcErrorsNumber;
    }
    for (i = n - k + 1.0; i <= n; i++) {
        result *= i;
    }
    return CalcConvert_toResult(result);
}
function st_convariances(arrayX, arrayY) {
    return st_covar_convariances(false, arrayX, arrayY);
}
function st_modemult() {
    var modeCount = 0;
    var modes = [];
    var list = getListData(arguments);
    var listLength = arrayHelper_getLength(list);
    for (var i = 0; i < listLength; i++) {
        var count = 0;
        for (var j = i + 1; j < listLength; j++) {
            if (list[i] === list[j]) {
                count++;
            }
        }
        if (count > modeCount) {
            modeCount = count;
            modes = [];
            modes.push([list[i]]);
        }
        else if (count === modeCount) {
            modes.push([list[i]]);
        }
    }
    return modeCount === 0 ? CalcErrorsNotAvailable : new CalcEngine_1.CalcArray(modes);
}
function st_percentileexc(list, k) {
    return st_includeAggregateMulti([list, k], 18);
}
function st_quartileexc(array, quart) {
    return st_includeAggregateMulti([array, quart], 19);
}
function st_rankavg(nums, array, order) {
    if (nums.rowCount > 1 || nums.colCount > 1) {
        return CalcErrorsValue;
    }
    return st_rank_rankavq(false, array, nums[0], order);
}
function st_permutationa(number, number_chosen) {
    var chosen = number_chosen;
    if (number >= 0 && number < 2147483647 && chosen >= 0 && chosen < 2147483647) {
        number = Math.pow(parseIntFunc(number), parseIntFunc(chosen));
        var numberAbs = Math.abs(number);
        if (numberAbs <= 1.79769e+308) {
            return numberAbs >= 2.2250738585072014E-308 ? number : 0.0;
        }
    }
    return CalcErrorsNumber;
}
function st_phi(number) {
    if (number === '') {
        return CalcErrorsValue;
    }
    var numberDouble = { value: 0 };
    if (_tryToDouble(number, numberDouble) === true) {
        number = Math.exp(-(numberDouble.value * numberDouble.value) * 0.5) * 0.3989422804014327;
        var numberAbs = Math.abs(number);
        if (numberAbs <= 1.79769e+308) {
            return numberAbs >= 2.2250738585072014E-308 ? number : 0.0;
        }
        return CalcErrorsNumber;
    }
    return CalcErrorsValue;
}
function st_binom_dist_range(trials, probability, lowerBound, upperBound) {
    var factorialPrecalculatedValues = [1.0, 1.0, 2.0, 6.0, 24.0, 120.0, 720.0, 5040.0, 40320.0, 362880.0, 3628800.0, 39916800.0, 479001600.0, 6227020800, 87178291200, 1307674368000,
        20922789888000, 355687428096000, 6.402373705728E+15, 1.21645100408832E+17, 2.43290200817664E+18, 5.109094217170944E+19, 1.1240007277776077E+21, 2.5852016738884978E+22, 6.2044840173323941E+23, 1.5511210043330986E+25, 4.0329146112660565E+26, 1.0888869450418352E+28, 3.0488834461171387E+29, 8.8417619937397019E+30, 2.6525285981219107E+32, 8.2228386541779224E+33,
        2.6313083693369352E+35, 8.6833176188118859E+36, 2.9523279903960416E+38, 1.0333147966386145E+40, 3.7199332678990125E+41, 1.3763753091226346E+43, 5.2302261746660112E+44, 2.0397882081197444E+46, 8.1591528324789768E+47, 3.3452526613163808E+49, 1.40500611775288E+51, 6.0415263063373834E+52, 2.6582715747884489E+54, 1.1962222086548019E+56, 5.5026221598120892E+57, 2.5862324151116818E+59,
        1.2413915592536073E+61, 6.0828186403426752E+62, 3.0414093201713376E+64, 1.5511187532873822E+66, 8.0658175170943877E+67, 4.2748832840600255E+69, 2.3084369733924138E+71, 1.2696403353658276E+73, 7.1099858780486348E+74, 4.0526919504877214E+76, 2.3505613312828785E+78, 1.3868311854568984E+80, 8.32098711274139E+81, 5.0758021387722484E+83, 3.1469973260387939E+85, 1.98260831540444E+87,
        1.2688693218588417E+89, 8.2476505920824715E+90, 5.4434493907744307E+92, 3.6471110918188683E+94, 2.4800355424368305E+96, 1.711224524281413E+98, 1.1978571669969892E+100, 8.504785885678623E+101, 6.1234458376886085E+103, 4.4701154615126844E+105, 3.3078854415193862E+107, 2.48091408113954E+109, 1.8854947016660504E+111, 1.4518309202828587E+113, 1.1324281178206297E+115, 8.9461821307829757E+116,
        7.1569457046263806E+118, 5.7971260207473678E+120, 4.753643337012842E+122, 3.9455239697206588E+124, 3.3142401345653532E+126, 2.81710411438055E+128, 2.4227095383672734E+130, 2.1077572983795279E+132, 1.8548264225739844E+134, 1.650795516090846E+136, 1.4857159644817615E+138, 1.3520015276784029E+140, 1.2438414054641308E+142, 1.1567725070816416E+144, 1.0873661566567431E+146, 1.0329978488239059E+148,
        9.9167793487094965E+149, 9.619275968248212E+151, 9.426890448883248E+153, 9.3326215443944153E+155, 9.3326215443944151E+157, 9.42594775983836E+159, 9.6144667150351271E+161, 9.90290071648618E+163, 1.0299016745145628E+166, 1.081396758240291E+168, 1.1462805637347084E+170, 1.226520203196138E+172, 1.324641819451829E+174, 1.4438595832024937E+176, 1.588245541522743E+178, 1.7629525510902446E+180,
        1.974506857221074E+182, 2.2311927486598138E+184, 2.5435597334721877E+186, 2.925093693493016E+188, 3.3931086844518981E+190, 3.9699371608087211E+192, 4.6845258497542909E+194, 5.5745857612076058E+196, 6.6895029134491271E+198, 8.0942985252734441E+200, 9.8750442008336011E+202, 1.2146304367025329E+205, 1.5061417415111409E+207, 1.8826771768889261E+209, 2.3721732428800469E+211, 3.0126600184576594E+213,
        3.8562048236258041E+215, 4.9745042224772875E+217, 6.4668554892204741E+219, 8.47158069087882E+221, 1.1182486511960043E+224, 1.4872707060906857E+226, 1.9929427461615188E+228, 2.6904727073180504E+230, 3.6590428819525489E+232, 5.012888748274992E+234, 6.9177864726194886E+236, 9.6157231969410894E+238, 1.3462012475717526E+241, 1.8981437590761709E+243, 2.6953641378881629E+245, 3.8543707171800731E+247,
        5.5502938327393044E+249, 8.0479260574719917E+251, 1.1749972043909107E+254, 1.7272458904546389E+256, 2.5563239178728654E+258, 3.80892263763057E+260, 5.7133839564458547E+262, 8.62720977423324E+264, 1.3113358856834524E+267, 2.0063439050956823E+269, 3.0897696138473508E+271, 4.7891429014633941E+273, 7.4710629262828942E+275, 1.1729568794264145E+278, 1.853271869493735E+280, 2.9467022724950384E+282,
        4.7147236359920616E+284, 7.590705053947219E+286, 1.2296942187394494E+289, 2.0044015765453026E+291, 3.2872185855342959E+293, 5.4239106661315887E+295, 9.0036917057784375E+297, 1.5036165148649991E+300, 2.5260757449731984E+302, 4.2690680090047051E+304, 7.257415615307999E+306
    ];
    function factorial(number) {
        if (number < 171) {
            if (number < 0) {
                return NaN;
            }
            return factorialPrecalculatedValues[number];
        }
        return Infinity;
    }
    function combination(number, numberChosen) {
        if (number <= numberChosen) {
            if (number === numberChosen && numberChosen >= 0) {
                return 1.0;
            }
            return CalcErrorsValue;
        }
        if (number < (numberChosen * 2)) {
            numberChosen = number - numberChosen;
        }
        if (numberChosen < 2) {
            if (numberChosen >= 0) {
                return numberChosen !== 0 ? number : 1.0;
            }
            return CalcErrorsValue;
        }
        if (number < 171) {
            return (factorial(number) / (factorial(numberChosen) * factorial(number - numberChosen)));
        }
        if (numberChosen > 514) {
            return CalcErrorsValue;
        }
        if (number > 8192) {
            var combinationResult = number;
            for (var j = 2; j <= numberChosen; j++) {
                combinationResult *= (--number) / j;
            }
            return combinationResult;
        }
        var num = number;
        number--;
        var num2 = 2;
        for (;;) {
            switch (numberChosen - num2) {
                case -1:
                    return num;
                case 0:
                    return ((number) / (num2)) * num;
                case 1:
                    return ((number * (number - 1)) / (num2 * (num2 + 1))) * num;
                case 2:
                    return ((number * (number - 1) * (number - 2)) / (num2 * (num2 + 1) * (num2 + 2))) * num;
                default:
                    num = ((number * (number - 1) * (number - 2) * (number - 3)) / (num2 * (num2 + 1) * (num2 + 2) * (num2 + 3))) * num;
                    num2 += 4;
                    number -= 4;
                    break;
            }
        }
    }
    var trials_int = { value: 0 };
    trials = _tryToInt(trials, trials_int);
    var probability_double = { value: 0 };
    probability = _tryToDouble(probability, probability_double);
    var lowerBound_int = { value: 0 }, upperBound_int;
    lowerBound = _tryToInt(lowerBound, lowerBound_int);
    if (arguments.length === 4 && upperBound) {
        upperBound_int = { value: 0 };
        upperBound = _tryToInt(upperBound, upperBound_int);
    }
    else {
        upperBound = lowerBound;
        upperBound_int = lowerBound_int;
    }
    if (trials === true && probability === true && lowerBound === true && upperBound === true) {
        trials = trials_int.value;
        probability = probability_double.value;
        lowerBound = lowerBound_int.value;
        upperBound = upperBound_int.value;
        if (trials >= 0 && trials <= 0x7ffffffe && probability >= 0.0 && probability <= 1.0 && lowerBound >= 0 && lowerBound <= trials && upperBound >= lowerBound && upperBound <= trials) {
            var d = (trials * probability) * (1.0 - probability);
            if (d > 100.0) {
                d = Math.sqrt(d);
                probability *= trials;
                return normDistCumulative((upperBound - probability + 0.5) / d) - normDistCumulative((lowerBound - 1 - probability + 0.5) / d);
            }
            var x = combination(trials, lowerBound) * Math.pow(probability, lowerBound) * Math.pow(1.0 - probability, trials - lowerBound);
            if (x === 0.0) {
                return 0.0;
            }
            var sum = x;
            d = x;
            probability /= (1.0 - probability);
            for (var i = lowerBound; i < upperBound; i++) {
                d *= ((trials - i) / (i + 1.0)) * probability;
                sum += d;
            }
            return sum <= 1.0 ? sum : 1.0;
        }
        return CalcErrorsNumber;
    }
    return CalcErrorsValue;
}
function st_gamma(number) {
    if (number > 0.0) {
        number = Math.exp(_lgamma(number));
    }
    else {
        var integralNumber = Math.abs(parseIntFunc(number));
        var dt = number + integralNumber;
        if (dt === 0.0) {
            return CalcErrorsNumber;
        }
        number = ((Math.pow(-1.0, (integralNumber - 1)) * Math.exp(_lgamma(-dt))) * Math.exp(_lgamma(1.0 + dt))) / Math.exp(_lgamma((integralNumber + 1) - dt));
    }
    var numberAbs = Math.abs(number);
    if (numberAbs <= 1.79769e+308) {
        return numberAbs >= 2.2250738585072014E-308 ? number : 0.0;
    }
    return CalcErrorsNumber;
}
function st_gauss(number) {
    number = normDistCumulative(number) - 0.5;
    var numberAbs = Math.abs(number);
    if (numberAbs <= 1.79769e+308) {
        return numberAbs >= 2.2250738585072014E-308 ? number : 0.0;
    }
    return CalcErrorsNumber;
}


var boolArgDefaultValue = { _argType: 7 }, boolArgDefaultValue1 = { _defaultValue: true, _argType: 7 };
var stringIntArgDefaultValue = { _argType: 2 }, stringIntArgDefaultValue1 = { _argType: 2 , _argCondition: '< 1' }, stringIntArgDefaultValue2 = { _argType: 2 , _argCondition: '< 0' }, stringIntArgDefaultValue4 = { _argType: 2 , _argCondition: ['< 1', '> 10000000000'] };
var doubleArgDefaultValue = { _argType: 0 }, doubleArgDefaultValue1 = { _argType: 0 , _argCondition: ['< 0', '>= 1'] }, doubleArgDefaultValue2 = { _argType: 0 , _argCondition: ['<= 0', '>= 1'] }, doubleArgDefaultValue3 = { _argType: 0 , _argCondition: '<= 0' }, doubleArgDefaultValue4 = { _defaultValue: 0, _argType: 0 }, doubleArgDefaultValue5 = { _defaultValue: 1, _argType: 0 }, doubleArgDefaultValue6 = { _argType: 0 , _argCondition: ['< 0', '> 1'] }, doubleArgDefaultValue7 = { _argType: 0 , _argCondition: '< 0' }, doubleArgDefaultValue8 = { _argType: 0 , _argCondition: ['< 1', '> 10000000000'] }, doubleArgDefaultValue9 = { _argType: 0 , _argCondition: ['< 1', '>= 10000000000'] };
var arrayArgDefaultValue = {
    _argType: 4,
    _valueType: 1 ,
    _toOneDimension: true,
    _breakOnError: true,
    _ignoreBlank: true
}, arrayArgDefaultValue1 = {
    _argType: 4,
    _valueType: 1 ,
    _toOneDimension: true,
    _breakOnError: true
}, arrayArgDefaultValue2 = {
    _argType: 4,
    _valueType: 1 ,
    _toOneDimension: true,
    _breakOnError: true,
    _ignoreBlank: true,
    _isAllArgsSameLimit: true
}, arrayArgDefaultValue3 = {
    _argType: 4,
    _valueType: 1 ,
    _toOneDimension: true,
    _breakOnError: true,
    _isAllArgsSameLimit: true
}, arrayArgDefaultValue4 = { _argType: 4, _valueType: 1 , _breakOnError: true, _ignoreBlank: true }, arrayArgDefaultValue5 = { _argType: 4, _valueType: 0 , _toOneDimension: true }, arrayArgDefaultValue6 = { _argType: 4, _valueType: 1 , _toOneDimension: true }, arrayArgDefaultValue7 = {
    _argType: 4,
    _valueType: 1 ,
    _toOneDimension: true,
    _breakOnError: true,
    _breakOnConvertError: true
}, arrayArgDefaultValue8 = {
    _argType: 4,
    _valueType: 0 ,
    _toOneDimension: true,
    _breakOnError: true,
    _isAllArgsSameLimit: true
}, arrayArgDefaultValue9 = {
    _argType: 4,
    _valueType: 0 ,
    _toOneDimension: true,
    _breakOnError: true,
    _ignoreBlank: true,
    _isAllArgsSameLimit: true
},

arrayArgDefaultValue11 = {
    _argType: 4,
    _valueType: 1 ,
    _breakOnError: true,
    _breakOnConvertError: true
}, arrayArgDefaultValue12 = {
    _argType: 4,
    _valueType: 1 ,
    _toOneDimension: true,
    _breakOnError: true,
    _ignoreBoolean: true,
    _ignoreBlank: true
};
var statArgsLimitDefaultValue = [arrayArgDefaultValue, { _argType: 2 }],

statArgsLimitDefaultValue2 = [arrayArgDefaultValue, doubleArgDefaultValue,
    { _defaultValue: 3, _argType: 2 , _argCondition: '< 1' }], statArgsLimitDefaultValue3 = [doubleArgDefaultValue2, doubleArgDefaultValue3, stringIntArgDefaultValue1], statArgsLimitDefaultValue4 = [doubleArgDefaultValue2, doubleArgDefaultValue3, doubleArgDefaultValue3,
    doubleArgDefaultValue4, doubleArgDefaultValue5], statArgsLimitDefaultValue5 = [stringIntArgDefaultValue2, stringIntArgDefaultValue2, doubleArgDefaultValue6, boolArgDefaultValue], statArgsLimitDefaultValue6 = [stringIntArgDefaultValue2, doubleArgDefaultValue6, doubleArgDefaultValue2], statArgsLimitDefaultValue7 = [doubleArgDefaultValue7, doubleArgDefaultValue8], statArgsLimitDefaultValue8 = [doubleArgDefaultValue6, stringIntArgDefaultValue4], statArgsLimitDefaultValue9 = [arrayArgDefaultValue1, arrayArgDefaultValue1], statArgsLimitDefaultValue10 = [doubleArgDefaultValue7, doubleArgDefaultValue3, boolArgDefaultValue], statArgsLimitDefaultValue11 = [doubleArgDefaultValue7, doubleArgDefaultValue9, doubleArgDefaultValue9], statArgsLimitDefaultValue12 = [doubleArgDefaultValue6, doubleArgDefaultValue9, doubleArgDefaultValue9], statArgsLimitDefaultValue13 = [arrayArgDefaultValue, arrayArgDefaultValue], statArgsLimitDefaultValue14 = [doubleArgDefaultValue7, doubleArgDefaultValue3, doubleArgDefaultValue3, boolArgDefaultValue], statArgsLimitDefaultValue15 = [doubleArgDefaultValue6, doubleArgDefaultValue3, doubleArgDefaultValue3], statArgsLimitDefaultValue16 = [doubleArgDefaultValue6, doubleArgDefaultValue, doubleArgDefaultValue3], statArgsLimitDefaultValue17 = [doubleArgDefaultValue, doubleArgDefaultValue, doubleArgDefaultValue3, boolArgDefaultValue], statArgsLimitDefaultValue18 = [arrayArgDefaultValue6, arrayArgDefaultValue6], statArgsLimitDefaultValue19 = [stringIntArgDefaultValue2, doubleArgDefaultValue7, boolArgDefaultValue], statArgsLimitDefaultValue20 = [doubleArgDefaultValue7, stringIntArgDefaultValue1], statArgsLimitDefaultValue21 = [arrayArgDefaultValue7, arrayArgDefaultValue7, stringIntArgDefaultValue,
    { _argType: 2 , _argCondition: ['< 1', '> 3'] }], statArgsLimitDefaultValue22 = [doubleArgDefaultValue7, doubleArgDefaultValue3, doubleArgDefaultValue3, boolArgDefaultValue], statArgsLimitDefaultValue23 = [arrayArgDefaultValue, doubleArgDefaultValue], statArgsLimitDefaultValue24 = [arrayArgDefaultValue11, {},
    boolArgDefaultValue1, { _defaultValue: false, _argType: 7 }], statArgsLimitDefaultValue25 = [{}, arrayArgDefaultValue, doubleArgDefaultValue4], statArgsLimitDefaultValue26 = [arrayArgDefaultValue12, doubleArgDefaultValue];


defineBuiltInFunction('TREND', st_trend, 1, 4, [{ _argType: 4 , _valueType: 0 , _breakOnError: true }, {}, {},
    boolArgDefaultValue1], [0, 1, 2], [0, 1, 2], { _acceptsMissingArgument: [1, 2, 3] });
defineBuiltInFunction('GROWTH', st_growth, 1, 4, [arrayArgDefaultValue11, {}, {},
    boolArgDefaultValue1], '!= 3', '!= 3', { _acceptsMissingArgument: [1, 2, 3] });
defineBuiltInFunction('FORECAST', st_forecast, 3, 3, [doubleArgDefaultValue, arrayArgDefaultValue, arrayArgDefaultValue], '> 0', '> 0');
defineBuiltInFunction('AVERAGE', st_average, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('STDEV', st_stdev, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('STDEV.S', st_stdev, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('PERCENTILE', st_percentile, 2, 2, keyword_undefined, 0, 0);
defineBuiltInFunction('PERCENTILE.INC', st_percentile, 2, 2, keyword_undefined, 0, 0);
defineBuiltInFunction('MAX', st_max, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('MAXA', st_maxa, 1, keyword_undefined, arrayArgDefaultValue8, -1 , -1 );
defineBuiltInFunction('MIN', st_min, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('MINA', st_mina, 1, keyword_undefined, arrayArgDefaultValue8, -1 , -1 );
defineBuiltInFunction('LARGE', st_large, 2, 2, statArgsLimitDefaultValue26, 0, 0);
defineBuiltInFunction('SMALL', st_small, 2, 2, statArgsLimitDefaultValue26, 0, 0);
defineBuiltInFunction('AVERAGEA', st_averagea, 1, keyword_undefined, arrayArgDefaultValue9, -1 , -1 );
defineBuiltInFunction('AVERAGEIF', st_averageif, 2, 3, keyword_undefined, [0, 1, 2], [0, 1, 2], {
    _acceptsMissingArgument: 2,
    _skipPrecedent: [2],
    _isContextSensitive: true
});
defineBuiltInFunction('MEDIAN', st_median, 1, keyword_undefined, arrayArgDefaultValue2, -1 , -1 );
defineBuiltInFunction('MODE', st_mode, 1, keyword_undefined, arrayArgDefaultValue2, -1 , -1 );
defineBuiltInFunction('MODE.SNGL', st_mode, 1, keyword_undefined, arrayArgDefaultValue2, -1 , -1 );
defineBuiltInFunction('GEOMEAN', st_geomean, 1, keyword_undefined, arrayArgDefaultValue3, -1 , -1 );
defineBuiltInFunction('HARMEAN', st_harmean, 1, keyword_undefined, arrayArgDefaultValue2, -1 , -1 );
defineBuiltInFunction('TRIMMEAN', st_trimmean, 2, 2, [arrayArgDefaultValue, doubleArgDefaultValue1], 0, 0);
defineBuiltInFunction('FREQUENCY', st_frequency, 2, 2, [arrayArgDefaultValue4, arrayArgDefaultValue4], -1, -1);
defineBuiltInFunction('RANK', st_rank, 2, 3, statArgsLimitDefaultValue25, [0, 1], [0, 1], { _acceptsMissingArgument: 2 });
defineBuiltInFunction('RANK.EQ', st_rank, 2, 3, statArgsLimitDefaultValue25, [0, 1], 1, { _acceptsMissingArgument: 2 });
defineBuiltInFunction('KURT', st_kurt, 1, keyword_undefined, arrayArgDefaultValue2, -1 , -1 );
defineBuiltInFunction('PERCENTRANK', st_percentrank, 2, 3, statArgsLimitDefaultValue2, 0, 0, { _acceptsMissingArgument: 2 });
defineBuiltInFunction('PERCENTRANK.INC', st_percentrank, 2, 3, statArgsLimitDefaultValue2, 0, 0, { _acceptsMissingArgument: 2 });
defineBuiltInFunction('PERCENTRANK.EXC', st_percentrankexc, 2, 3, statArgsLimitDefaultValue2, 0, 0, { _acceptsMissingArgument: 2 });
defineBuiltInFunction('QUARTILE', st_quartile, 2, 2, statArgsLimitDefaultValue, 0, 0);
defineBuiltInFunction('QUARTILE.INC', st_quartile, 2, 2, statArgsLimitDefaultValue, 0, 0);
defineBuiltInFunction('COUNT', st_count, 1, keyword_undefined, keyword_undefined, -1 , -1 , { _acceptsError: -1 });
defineBuiltInFunction('COUNTA', st_counta, 1, keyword_undefined, keyword_undefined, -1 , -1 , { _acceptsError: -1 });
defineBuiltInFunction('COUNTBLANK', st_countblank, 1, 1, arrayArgDefaultValue5, -1 , -1 );
defineBuiltInFunction('COUNTIF', st_countif, 2, 2, [arrayArgDefaultValue5, arrayArgDefaultValue5], [0, 1], [0, 1]);

defineBuiltInFunction('AVEDEV', st_avedev, 1, keyword_undefined, arrayArgDefaultValue2, -1 , -1 );
defineBuiltInFunction('STDEVA', st_stdeva, 1, keyword_undefined, arrayArgDefaultValue9, -1 , -1 );
defineBuiltInFunction('STDEVP', st_stdevp, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('STDEV.P', st_stdevp, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('STDEVPA', st_stdevpa, 1, keyword_undefined, arrayArgDefaultValue9, -1 , -1 );
defineBuiltInFunction('VAR', st_varr, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('VAR.S', st_varr, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('VARA', st_vara, 1, keyword_undefined, arrayArgDefaultValue9, -1 , -1 );
defineBuiltInFunction('VARP', st_varp, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('VAR.P', st_varp, 1, keyword_undefined, keyword_undefined, -1 , -1 );
defineBuiltInFunction('VARPA', st_varpa, 1, keyword_undefined, arrayArgDefaultValue9, -1 , -1 );
defineBuiltInFunction('COVAR', st_covar, 2, 2, statArgsLimitDefaultValue9, -1 , -1 );
defineBuiltInFunction('COVARIANCE.P', st_covar, 2, 2, statArgsLimitDefaultValue9, -1 , -1 );
defineBuiltInFunction('DEVSQ', st_devsp, 1, keyword_undefined, arrayArgDefaultValue2, -1 , -1 );
defineBuiltInFunction('CONFIDENCE', st_confidence, 3, 3, statArgsLimitDefaultValue3);
defineBuiltInFunction('CONFIDENCE.NORM', st_confidence, 3, 3, statArgsLimitDefaultValue3);
defineBuiltInFunction('CONFIDENCE.T', st_confidence_t, 3, 3, statArgsLimitDefaultValue3);
defineBuiltInFunction('INTERCEPT', st_intercept, 2, 2, [arrayArgDefaultValue2, arrayArgDefaultValue2], -1 , -1 );
defineBuiltInFunction('LINEST', st_linest, 1, 4, statArgsLimitDefaultValue24, [0, 1], [0, 1], { _acceptsMissingArgument: [1, 2, 3], _arrayArgumentEvaluateMode: 1 });
defineBuiltInFunction('SLOPE', st_slope, 2, 2, [arrayArgDefaultValue2, arrayArgDefaultValue2], -1 , -1 , { _arrayArgumentEvaluateMode: 1 });
defineBuiltInFunction('LOGEST', st_logest, 1, 4, statArgsLimitDefaultValue24, [0, 1], [0, 1], { _acceptsMissingArgument: [1, 2, 3] });
defineBuiltInFunction('STEYX', st_steyx, 2, 2, statArgsLimitDefaultValue9, -1 , -1 );
defineBuiltInFunction('BETADIST', st_betadist, 3, 5, [doubleArgDefaultValue, doubleArgDefaultValue3, doubleArgDefaultValue3, doubleArgDefaultValue4, doubleArgDefaultValue5], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('BETA.DIST', st_deta_dist, 4, 6, [doubleArgDefaultValue, doubleArgDefaultValue3,
    doubleArgDefaultValue3, boolArgDefaultValue, doubleArgDefaultValue4, doubleArgDefaultValue5], keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [5, 6] });
defineBuiltInFunction('BETAINV', st_betainv, 3, 5, statArgsLimitDefaultValue4, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('BETA.INV', st_betainv, 3, 5, statArgsLimitDefaultValue4, keyword_undefined, keyword_undefined, { _acceptsMissingArgument: [3, 4] });
defineBuiltInFunction('BINOMDIST', st_binomdist, 4, 4, statArgsLimitDefaultValue5);
defineBuiltInFunction('BINOM.DIST', st_binomdist, 4, 4, statArgsLimitDefaultValue5);
defineBuiltInFunction('NEGBINOMDIST', st_negbinomdist, 3, 3, [stringIntArgDefaultValue, stringIntArgDefaultValue, doubleArgDefaultValue1]);
defineBuiltInFunction('NEGBINOM.DIST', st_negbinom_dist, 4, 4, [stringIntArgDefaultValue2, stringIntArgDefaultValue1, doubleArgDefaultValue1, boolArgDefaultValue]);
defineBuiltInFunction('CRITBINOM', st_critbinom, 3, 3, statArgsLimitDefaultValue6);
defineBuiltInFunction('BINOM.INV', st_critbinom, 3, 3, statArgsLimitDefaultValue6);
defineBuiltInFunction('CHIDIST', st_chidist, 2, 2, statArgsLimitDefaultValue7);
defineBuiltInFunction('CHISQ.DIST.RT', st_chidist, 2, 2, statArgsLimitDefaultValue7);
defineBuiltInFunction('CHISQ.DIST', st_chisq_dist, 3, 3, [doubleArgDefaultValue7, stringIntArgDefaultValue4, boolArgDefaultValue]);
defineBuiltInFunction('CHIINV', st_chiinv, 2, 2, statArgsLimitDefaultValue8);
defineBuiltInFunction('CHISQ.INV.RT', st_chiinv, 2, 2, [doubleArgDefaultValue6, stringIntArgDefaultValue1]);
defineBuiltInFunction('CHISQ.INV', st_chisq_inv, 2, 2, statArgsLimitDefaultValue8);
defineBuiltInFunction('CHITEST', st_chitest, 2, 2, statArgsLimitDefaultValue9, -1 , -1 );
defineBuiltInFunction('CHISQ.TEST', st_chitest, 2, 2, statArgsLimitDefaultValue9, -1 , -1 );
defineBuiltInFunction('CORREL', st_correl, 2, 2, keyword_undefined, -1 , -1 );
defineBuiltInFunction('EXPONDIST', st_expondist, 3, 3, statArgsLimitDefaultValue10);
defineBuiltInFunction('EXPON.DIST', st_expondist, 3, 3, statArgsLimitDefaultValue10);
defineBuiltInFunction('FDIST', st_fdist, 3, 3, statArgsLimitDefaultValue11);
defineBuiltInFunction('F.DIST', st_f_dist, 4, 4, [doubleArgDefaultValue7, doubleArgDefaultValue8, doubleArgDefaultValue8, boolArgDefaultValue]);
defineBuiltInFunction('F.DIST.RT', st_fdist, 3, 3, statArgsLimitDefaultValue11);
defineBuiltInFunction('FINV', st_finv, 3, 3, statArgsLimitDefaultValue12);
defineBuiltInFunction('F.INV.RT', st_finv, 3, 3, statArgsLimitDefaultValue12);
defineBuiltInFunction('F.INV', st_f_inv, 3, 3, [doubleArgDefaultValue6, stringIntArgDefaultValue4, stringIntArgDefaultValue4]);
defineBuiltInFunction('FISHER', st_fisher, 1, 1, { _argType: 0 , _argCondition: ['<= -1', '>= 1'] });
defineBuiltInFunction('FISHERINV', st_fisherinv, 1, 1, doubleArgDefaultValue);
defineBuiltInFunction('FTEST', st_ftest, 2, 2, statArgsLimitDefaultValue13, -1 , -1 );
defineBuiltInFunction('F.TEST', st_ftest, 2, 2, statArgsLimitDefaultValue13, -1 , -1 );
defineBuiltInFunction('GAMMADIST', st_gammadist, 4, 4, statArgsLimitDefaultValue14);
defineBuiltInFunction('GAMMA.DIST', st_gammadist, 4, 4, statArgsLimitDefaultValue14);
defineBuiltInFunction('GAMMAINV', st_gammainv, 3, 3, statArgsLimitDefaultValue15);
defineBuiltInFunction('GAMMA.INV', st_gammainv, 3, 3, statArgsLimitDefaultValue15);
defineBuiltInFunction('GAMMALN', st_gammaln, 1, 1, doubleArgDefaultValue3);
defineBuiltInFunction('GAMMALN.PRECISE', st_gammaln, 1, 1, doubleArgDefaultValue3);
defineBuiltInFunction('HYPGEOMDIST', st_hypgeomdist, 4, 4, [stringIntArgDefaultValue2, stringIntArgDefaultValue2, stringIntArgDefaultValue2, stringIntArgDefaultValue2]);
defineBuiltInFunction('HYPGEOM.DIST', st_hypgeom_dist, 5, 5, [stringIntArgDefaultValue2, stringIntArgDefaultValue2, stringIntArgDefaultValue2, stringIntArgDefaultValue2, boolArgDefaultValue]);
defineBuiltInFunction('LOGNORMDIST', st_lognormdist, 3, 3, [doubleArgDefaultValue3, doubleArgDefaultValue, doubleArgDefaultValue3]);
defineBuiltInFunction('LOGNORM.DIST', st_lognorm_dist, 4, 4, [doubleArgDefaultValue3, doubleArgDefaultValue, doubleArgDefaultValue3, boolArgDefaultValue]);
defineBuiltInFunction('LOGINV', st_loginv, 3, 3, statArgsLimitDefaultValue16);
defineBuiltInFunction('LOGNORM.INV', st_loginv, 3, 3, statArgsLimitDefaultValue16);
defineBuiltInFunction('NORMDIST', st_normdist, 4, 4, statArgsLimitDefaultValue17);
defineBuiltInFunction('NORM.DIST', st_normdist, 4, 4, statArgsLimitDefaultValue17);
defineBuiltInFunction('NORMINV', st_norminv, 3, 3, statArgsLimitDefaultValue16);
defineBuiltInFunction('NORM.INV', st_norminv, 3, 3, statArgsLimitDefaultValue16);
defineBuiltInFunction('NORMSDIST', st_normsdist, 1, 1, doubleArgDefaultValue, keyword_undefined, keyword_undefined);
defineBuiltInFunction('NORMSINV', st_normsinv, 1, 1, doubleArgDefaultValue6);
defineBuiltInFunction('NORM.S.INV', st_normsinv, 1, 1, doubleArgDefaultValue6);
defineBuiltInFunction('NORM.S.DIST', st_norm_s_dist, 2, 2, [doubleArgDefaultValue, boolArgDefaultValue]);
defineBuiltInFunction('PEARSON', st_pearson, 2, 2, statArgsLimitDefaultValue18, -1 , -1 );
defineBuiltInFunction('RSQ', st_rsq, 2, 2, statArgsLimitDefaultValue18, [0, 1], [0, 1]);
defineBuiltInFunction('POISSON', st_poisson, 3, 3, statArgsLimitDefaultValue19);
defineBuiltInFunction('POISSON.DIST', st_poisson, 3, 3, statArgsLimitDefaultValue19);
defineBuiltInFunction('PROB', st_prob, 3, 4, [arrayArgDefaultValue7, arrayArgDefaultValue1, doubleArgDefaultValue], [0, 1], [0, 1], { _acceptsMissingArgument: 3 });
defineBuiltInFunction('SKEW', st_skew, 1, keyword_undefined, arrayArgDefaultValue2, -1 , -1 );
defineBuiltInFunction('STANDARDIZE', st_standardize, 3, 3, [doubleArgDefaultValue, doubleArgDefaultValue, doubleArgDefaultValue3]);
defineBuiltInFunction('TDIST', st_tdist, 3, 3, [doubleArgDefaultValue7, stringIntArgDefaultValue1, stringIntArgDefaultValue]);
defineBuiltInFunction('T.DIST', st_t_dist, 3, 3, [doubleArgDefaultValue7, stringIntArgDefaultValue1, boolArgDefaultValue]);
defineBuiltInFunction('T.DIST.RT', st_tdistrt, 2, 2, statArgsLimitDefaultValue20);
defineBuiltInFunction('T.DIST.2T', st_tdist2t, 2, 2, statArgsLimitDefaultValue20);
defineBuiltInFunction('TINV', st_tinv, 2, 2, statArgsLimitDefaultValue8);
defineBuiltInFunction('T.INV.2T', st_tinv, 2, 2, statArgsLimitDefaultValue8);
defineBuiltInFunction('T.INV', st_t_inv, 2, 2, [{ _argType: 0 , _argCondition: ['<= 0', '> 1'] },
    stringIntArgDefaultValue4]);
defineBuiltInFunction('TTEST', st_ttest, 4, 4, statArgsLimitDefaultValue21, [0, 1], [0, 1]);
defineBuiltInFunction('T.TEST', st_ttest, 4, 4, statArgsLimitDefaultValue21, [0, 1], [0, 1]);
defineBuiltInFunction('WEIBULL', st_weibull, 4, 4, statArgsLimitDefaultValue22);
defineBuiltInFunction('WEIBULL.DIST', st_weibull, 4, 4, statArgsLimitDefaultValue22);
defineBuiltInFunction('ZTEST', st_ztest, 2, 3, statArgsLimitDefaultValue23, 0, 0, { _acceptsMissingArgument: 2 });
defineBuiltInFunction('Z.TEST', st_ztest, 2, 3, statArgsLimitDefaultValue23, 0, 0, { _acceptsMissingArgument: 2 });
defineBuiltInFunction('PERMUT', st_permut, 2, 2);
defineBuiltInFunction('COVARIANCE.S', st_convariances, 2, 2, statArgsLimitDefaultValue9, -1 , -1 );
defineBuiltInFunction('MODE.MULT', st_modemult, 1, keyword_undefined, arrayArgDefaultValue3, -1 , -1 );
defineBuiltInFunction('PERCENTILE.EXC', st_percentileexc, 2, 2, [arrayArgDefaultValue, doubleArgDefaultValue2], 0, 0);
defineBuiltInFunction('QUARTILE.EXC', st_quartileexc, 2, 2, [arrayArgDefaultValue8, stringIntArgDefaultValue], 0, 0);
defineBuiltInFunction('RANK.AVG', st_rankavg, 2, 3, [arrayArgDefaultValue7, arrayArgDefaultValue6, doubleArgDefaultValue4], [0, 1], 1, { _acceptsMissingArgument: 2 });
defineBuiltInFunction('PERMUTATIONA', st_permutationa, 2, 2, [doubleArgDefaultValue, doubleArgDefaultValue]);
defineBuiltInFunction('PHI', st_phi, 1, 1);
defineBuiltInFunction('BINOM.DIST.RANGE', st_binom_dist_range, 3, 4, [{ _defaultValue: 0 }, { _defaultValue: 0 }, { _defaultValue: 0 }]);
defineBuiltInFunction('GAMMA', st_gamma, 1, 1, doubleArgDefaultValue3);
defineBuiltInFunction('GAUSS', st_gauss, 1, 1, doubleArgDefaultValue);
defineBuiltInFunction('SKEW.P', st_skew_p, 1, keyword_undefined, arrayArgDefaultValue9, -1 , -1 );
 }),

 'CalcEngine':
 (function(module, exports) {
module.exports = __webpack_require__(/*! @grapecity/js-calc */ '@grapecity/js-calc');
 }),

 'Common':
 (function(module, exports) {
module.exports = __webpack_require__(/*! @grapecity/js-sheets-common */ '@grapecity/js-sheets-common');
 })

 });

module.exports = GC.Spread.CalcEngine.AdvancedFunctions;
/***/ }),

/***/ './node_modules_local/@grapecity/js-calc-advancedfunctions/index.js':
/*!**************************************************************************!*\
  !*** ./node_modules_local/@grapecity/js-calc-advancedfunctions/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
module.exports = __webpack_require__(/*! ./dist/gc.spread.calcengine.advancedfunctions.js */ './node_modules_local/@grapecity/js-calc-advancedfunctions/dist/gc.spread.calcengine.advancedfunctions.js');
/***/ }),

/***/ '@grapecity/js-calc':
/*!***************************************!*\
  !*** external "GC.Spread.CalcEngine" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.CalcEngine;
/***/ }),

/***/ '@grapecity/js-sheets-common':
/*!****************************!*\
  !*** external "GC.Spread" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread;
/***/ })

/******/ });
    return GC;
};
//# sourceMappingURL=gc.spread.calcengine.advancedfunctions.14.2.5.js.map