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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['CalcEngine'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './node_modules_local/@grapecity/js-calc/index.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './node_modules_local/@grapecity/js-calc/dist/gc.spread.calcengine.js':
/*!****************************************************************************!*\
  !*** ./node_modules_local/@grapecity/js-calc/dist/gc.spread.calcengine.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['CalcEngine'] =
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

 	return __webpack_require__(__webpack_require__.s = './src/calc.entry.ts');
 })
 ({

 './src/Parser.ts':
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
var calc_common_1 = __webpack_require__( './src/calc.common.ts');
var keyword_undefined = void 0, keyword_null = null, const_string = 'string', const_boolean = 'boolean', const_true = 'TRUE', const_false = 'FALSE', const_array = 'ARRAY';
var stringHelper = Common_1.Common._StringHelper;
var Types = Common_1.Common._Types, isNullOrUndefined = Types._isNullOrUndefined;
var Exp_FormulaInvalidChar = 'Exp_FormulaInvalidChar', Exp_FormulaInvalid = 'Exp_FormulaInvalid', Exp_NoSyntax = 'Exp_NoSyntax';
function throwParseError() {
    throw calc_common_1.sR()[Exp_FormulaInvalid];
}
function throwParseCharError(char, index, exp) {
    throw stringHelper._format(calc_common_1.sR()[exp || Exp_FormulaInvalidChar], [char, index]);
}
exports._OperatorTypeStringMap = [
    '+',
    '-',
    '%',
    '+',
    '-',
    '*',
    '/',
    '^',
    '&',
    '=',
    '<>',
    '<',
    '<=',
    '>',
    '>=',
    ':',
    ',',
    ' '
];
var binaryOperatorPriorities = {
    ':': 1,
    '^': 2,
    ' ': 3,
    '*': 4,
    '/': 4,
    ',': 5,
    '+': 6,
    '-': 6,
    '&': 7,
    '<': 8,
    '=': 8,
    '>': 8,
    '>=': 8,
    '<=': 8,
    '<>': 8
};
var numberDecimalSeparator = '.', listSeparator = ',', arrayGroupSeparator = ';', arrayListSeparator = ',';


var categoryForLatin1 = [
    0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe,
    0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe,
    0xb, 0x18, 0x18, 0x18, 0x1a, 0x18, 0x18, 0x18, 0x14, 0x15, 0x18, 0x19, 0x18, 0x13, 0x18, 0x18,
    0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x18, 0x18, 0x19, 0x19, 0x19, 0x18,
    0x18, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
    0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x14, 0x18, 0x15, 0x1b, 0x12,
    0x1b, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1,
    0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x14, 0x19, 0x15, 0x19, 0xe,
    0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe,
    0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe, 0xe,
    0xb, 0x18, 0x1a, 0x1a, 0x1a, 0x1a, 0x1c, 0x1c, 0x1b, 0x1c, 0x1, 0x16, 0x19, 0x13, 0x1c, 0x1b,
    0x1c, 0x19, 0xa, 0xa, 0x1b, 0x1, 0x1c, 0x18, 0x1b, 0xa, 0x1, 0x17, 0xa, 0xa, 0xa, 0x18,
    0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
    0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x19, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1,
    0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1,
    0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x19, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1, 0x1
];
function isLatin1(cc) {
    return cc <= 0x00ff;
}
function isAscii(cc) {
    return cc <= 0x007f;
}
function isActualTrue(value) {
    return value === calc_common_1.getBoolean().boolean_true || value === const_true;
}
function isActualFalse(value) {
    return value === calc_common_1.getBoolean().boolean_false || value === const_false;
}
function isDigit(c) {
    return c >= 48 && c <= 57;
}
exports.isDigit = isDigit;
function _isLetter(c) {
    var cc = c.charCodeAt(0);
    if (!isLatin1(cc)) {
        return true;
    }

    if (!isAscii(cc)) {
        return categoryForLatin1[cc] === 0 || categoryForLatin1[cc] === 1 ;
    }
    cc |= 0x20;

    return (cc >= 96 && cc <= 122);
}
exports._isLetter = _isLetter;
function _isLetterOrDigit(c) {
    var cc = c.charCodeAt(0);
    if (!isLatin1(cc)) {
        return true;
    }

    if (!isAscii(cc)) {
        return categoryForLatin1[cc] === 0 || categoryForLatin1[cc] === 1 ;
    }
    if (cc <= 57) {
        return cc >= 48;
    }
    cc |= 0x20;

    return (cc >= 96 && cc <= 122);
}
exports._isLetterOrDigit = _isLetterOrDigit;
function isNumber(c) {
    var cc = c.charCodeAt(0);


    if (!isAscii(cc)) {
        return categoryForLatin1[cc] === 8 || categoryForLatin1[cc] === 0x0a ;
    }

    return cc >= 48 && cc <= 57;
}
exports.isNumber = isNumber;
function readString(formula, startIndex, startSign, endSign, escapeSign, throwError) {
    var len = formula.length;
    var startSignCount = (startSign === endSign) ? 0 : 1;
    var text = [], skipCount = 0;
    for (var index = startIndex + 1; index < len; index++) {
        var currentChar = formula[index];
        if (currentChar === escapeSign) {
            text.push(currentChar);
            index++;
            skipCount++;
            currentChar = formula[index];
        }
        if (currentChar === startSign) {
            startSignCount++;
        }
        if (currentChar === endSign) {
            startSignCount--;

            if (startSign === endSign && index + 2 < len && formula[index + 1] === startSign) {
                text.push(startSign);
                index++;
                skipCount++;
            }
            else if (startSignCount !== 0) {
                text.push(currentChar);
            }
            else {
                return { result: text, endIndex: index, skipCount: skipCount };
            }
        }
        else {
            text.push(currentChar);
        }
    }
    if (throwError) {
        throwParseCharError(endSign, startSign, Exp_NoSyntax);
    }
}
function readError(formula, startIndex, throwError) {
    var len = formula.length;
    var surplusLen = len - startIndex;
    for (var i = 0; i < calc_common_1.ErrorList.length; i++) {
        var err = calc_common_1.ErrorList[i], errLength = err.length;
        if (startIndex + errLength <= len) {
            var errStr = formula.slice(startIndex, startIndex + errLength);
            if (errLength <= surplusLen && (err === errStr.join('').toUpperCase())) {
                return { result: errStr, endIndex: startIndex + errLength - 1 };
            }
        }
    }
    if (throwError) {
        throwParseCharError([formula[startIndex], startIndex]);
    }
}


function _readNumber(str, startIndex, decimalSeparator) {
    var len = str.length;
    var state = 0 , num = [];
    for (var i = startIndex; i < len; i++) {
        var currentChar = str[i];
        if (isDigit(currentChar.charCodeAt(0))) {
            if (state === 0 ) {
                state = 2 ;
            }
            else if (state === 3 ) {
                state = 4 ;
            }
            else if (state === 1 ) {
                state = 2 ;
            }
            else if (state === 5 || state === 6 ) {
                state = 7 ;
            }
            num.push(currentChar);
        }
        else if (currentChar === decimalSeparator) {
            if (state === 2 ) {
                state = 4 ;
            }
            else if (state === 0 || state === 1 ) {
                state = 3 ;
            }
            else {
                return {};
            }
            num.push('.');
        }
        else if (currentChar === '+' || currentChar === '-') {
            if (state === 0 ) {
                state = 1 ;
            }
            else if (state === 5 ) {
                state = 6 ;
            }
            else {
                return { num: num, endIndex: i - 1 };
            }
            num.push(currentChar);
        }
        else if (currentChar === 'E' || currentChar === 'e') {
            if (state === 2 || state === 4 ) {
                state = 5 ;
            }
            else {
                return {};
            }
            num.push(currentChar);
        }
        else if (state === 2 || state === 4 || state === 7 ) {
            return { num: num, endIndex: i - 1 };
        }
    }
    if (state === 2 || state === 4 || state === 7 ) {
        return { num: num, endIndex: len - 1 };
    }
    return {};
}
var arraypush = [].push;
function conatArray(arr1, arr2) {
    arraypush.apply(arr1, arr2);
    return arr1;
}
var FormulaToken = (function () {
    function FormulaToken(value, type, index, endIndex, subType) {
        this._children = [];
        subType = subType || 0 ;
        var self = this;
        self._value = value;
        var stringValue = Array.isArray(value) ? value.join('') : value;
        self._type = type;
        self._index = index;
        self._endIndex = endIndex || index + value.length - 1;
        if (type === 0 && subType === 0 && value) {
            var lowValue = stringValue.toUpperCase();
            if (isActualTrue(lowValue) || isActualFalse(lowValue)) {
                subType = 5;

                stringValue = lowValue;
            }
        }
        else if (type === 1 && stringValue !== const_array) {
            stringValue = stringValue.toUpperCase();
        }
        self._stringValue = stringValue;
        self._subType = subType;
    }

    FormulaToken.prototype.type = function () {
        return this._type;
    };
    FormulaToken.prototype.subType = function () {
        return this._subType;
    };
    FormulaToken.prototype.stringValue = function () {
        return this._stringValue;
    };
    return FormulaToken;
}());
exports.FormulaToken = FormulaToken;
var TokenResolver = (function () {
    function TokenResolver(priority) {
        if (priority === void 0) { priority = 5000; }
        this.priority = priority;
    }
    TokenResolver.prototype.resolveToken = function (context, parser, originalTokens, currentTokenIndex, throwError, isInLETFunctionScope) {
        return 0;
    };
    TokenResolver.prototype.unparse = function (context, parser, expression, formulaChars) {
        return true;
    };
    return TokenResolver;
}());
exports.TokenResolver = TokenResolver;
exports.preOperaterTypesMap = {
    '+': 0 ,
    '-': 1
};
exports.operaterTypesMap = {
    ':': 15 ,
    ',': 16 ,
    '+': 3 ,
    '-': 4 ,
    '*': 5 ,
    '/': 6 ,
    '^': 7 ,
    '%': 2 ,
    '&': 8 ,
    '=': 9 ,
    '<': 11 ,
    '<>': 10 ,
    '<=': 12 ,
    '>': 13 ,
    '>=': 14
};
function _changeString(rsString) {
    var rsTemp = [];
    if (rsString.indexOf(':') > -1) {
        var names = rsString.split(':');
        for (var i = 0; i < names.length; i++) {
            rsTemp.push('\'' + names[i].replace(/'/g, '\'\'') + '\'');
        }
    }
    return rsTemp;
}
var Parser = (function () {
    function Parser() {


    }
    Parser.prototype.setParserOption = function (culture) {
        var option, cultureOption;
        if (culture === keyword_undefined || !Common_1.Common.CultureManager._getCultureInfo()) {
            option = {};
            cultureOption = option;
        }
        else {
            cultureOption = (typeof culture === 'object') && culture.NumberFormat ? culture.NumberFormat : Common_1.Common.CultureManager._getCultureInfo().NumberFormat;
            option = culture ? cultureOption : {};
        }
        listSeparator = Parser.listSeparator = option.listSeparator || ',';
        numberDecimalSeparator = option.numberDecimalSeparator || '.';
        if (culture || !Parser.numberDecimalSeparator) {
            Parser.numberGroupSeparator = cultureOption.numberGroupSeparator || ',';
            Parser.numberDecimalSeparator = cultureOption.numberDecimalSeparator || '.';
        }
        arrayGroupSeparator = Parser.arrayGroupSeparator = option.arrayGroupSeparator || ';';
        arrayListSeparator = Parser.arrayListSeparator = option.arrayListSeparator || ',';
    };

    Parser.prototype.parse = function (context, formula) {
        this.setParserOption(context.culture);
        var charArray = formula.split('');
        this._charArray = charArray;


        var tokens = this.parseToTokens(context, charArray, !context.ignoreError);
        return this.buildExpressionTree(context, tokens, !context.ignoreError);
    };
    Parser.prototype.unparse = function (context, expression, formulaCharArray) {
        if (formulaCharArray === void 0) { formulaCharArray = []; }

        this._unparseCore(context, expression, formulaCharArray);
        if (formulaCharArray[0] === '@'
            && expression && expression.arguments && expression.arguments[0] && expression.arguments[0].type === 1
            && context && context.source && context.source._service && context.source._service.allowDynamicArray !== true) {
            formulaCharArray.splice(0, 1);
        }
        return formulaCharArray.join('');
    };
    Parser.prototype._unparseCore = function (context, expression, formulaCharArray) {
        if (expression) {
            this.setParserOption(context.culture);
            var resolvers = context.getResolvers();
            for (var i = 0; i < resolvers.length; i++) {
                if (resolvers[i].unparse(context, this, expression, formulaCharArray)) {
                    break;
                }
            }
        }
    };
    Parser.prototype.parseToTokens = function (parserContext, charArray, throwError) {
        if (throwError === void 0) { throwError = true; }


        var self = this;
        var addOperand = function (tokenList, valueArray, start) {
            if (valueArray.length > 0) {
                tokenList.push(new FormulaToken(valueArray, 0 , start));
            }
            return [];
        };
        var len = charArray.length;
        var tokens1 = [];
        var stack = [];
        var stackEnd = -1;
        var value = [];
        var currentToken;
        var tokenStartIndex;
        var startIndex = 0, endIndex;
        var stackToken;
        while (startIndex < len && charArray[startIndex] === ' ') {
            startIndex++;
        }
        if (charArray[startIndex] === '=') {
            startIndex++;
        }
        tokenStartIndex = startIndex;
        var _loop_1 = function (index) {
            var currentChar = charArray[index];
            var currentCharCode = currentChar.charCodeAt(0);
            var rs = void 0;
            if (currentCharCode === 64 && parserContext._sheet && parserContext._sheet._calcService
                && parserContext._sheet._calcService.allowDynamicArray === true) {
                currentToken = new FormulaToken(currentChar, 1 , index);
                tokens1.push(currentToken);
                tokenStartIndex = index + 1;
            }
            else if (currentCharCode >= 97 && currentCharCode <= 122
                || currentCharCode >= 65 && currentCharCode <= 90) {
                value.push(currentChar);
            }
            else if (currentCharCode === 34) {
                if (value.length > 0) {
                    value = addOperand(tokens1, value, tokenStartIndex);
                }

                rs = readString(charArray, index, '"', '"', '', throwError);
                if (rs) {
                    var token = new FormulaToken(rs.result, 0 , index, index + rs.result.length + 2, 3 );
                    if (rs.skipCount) {
                        token._fullString = charArray.slice(index, rs.endIndex + 1).join('');
                        token._endIndex += rs.skipCount;
                    }
                    tokens1.push(token);
                    index = rs.endIndex;
                    tokenStartIndex = index + 1;
                }
                else {
                    conatArray(value, charArray.slice(index, len));
                    index = len - 1;
                }
            }
            else if (currentCharCode === 39) {
                rs = readString(charArray, index, '\'', '\'', '', throwError);
                if (rs) {
                    var rsTemp = _changeString(rs.result.join(''));
                    var tokenTemp = [];
                    if (rsTemp.length > 1) {
                        var rsTempCharArray = rsTemp.join(':').split('');
                        tokenTemp = self.parseToTokens(parserContext, rsTempCharArray, throwError);
                    }
                    if (tokenTemp && tokenTemp.length > 0) {
                        tokenTemp.forEach(function (data) {
                            data._index += index;
                            data._endIndex += index;
                        });
                        conatArray(tokens1, tokenTemp);
                    }
                    else {
                        value.push('\'');
                        conatArray(value, rs.result);
                        value.push('\'');
                    }
                    index = rs.endIndex;
                }
                else {
                    value.push('\'');
                    index = len - 1;
                }
            }
            else if (currentCharCode === 91) {
                rs = readString(charArray, index, '[', ']', '\'', throwError);
                if (rs) {
                    value.push('[');
                    conatArray(value, rs.result);
                    value.push(']');
                    index = rs.endIndex;
                }
                else {
                    if (self._isR1C1 && value.length === 0 && (value[0] === 'R' || value[0] === 'r' || value[0] === 'C' || value[0] === 'c')) {
                        return out_index_1 = index, 'continue';
                    }
                    conatArray(value, charArray.slice(index, len));
                    index = len - 1;
                }
            }
            else if (currentCharCode === 13 || currentCharCode === 10) {
                return out_index_1 = index, 'continue';
            }
            else if (currentCharCode === 35) {
                var re = readError(charArray, index);
                if (re) {
                    tokens1.push(new FormulaToken(re.result, 0 , index, index + re.result.length - 1, 6 ));
                    tokenStartIndex = index + 1;

                    index = re.endIndex;
                }
                else {
                    value.push(currentChar);
                }
            }
            else if (currentCharCode === 33) {
                if (value.length === 0) {

                }
                var tokenLength = tokens1.length;
                if (tokenLength > 0 && tokens1[tokenLength - 1]._type === 0) {
                    var lastToken = tokens1[tokenLength - 1];
                    arraypush.apply(lastToken._value, value);
                    tokens1[tokenLength - 1] = new FormulaToken(lastToken._value, 0 , lastToken._index, index, 12 );
                }
                else {
                    tokens1.push(new FormulaToken(value, 0 , tokenStartIndex, index, 12 ));
                }
                value = [];
                tokenStartIndex = index + 1;
            }
            else if (currentCharCode === 43 || currentCharCode === 45) {
                var previous = tokens1.length === 0 ? null : tokens1[tokens1.length - 1];
                if (value.length !== 0) {
                    tokens1.push(new FormulaToken(value, 0 , tokenStartIndex));
                    tokens1.push(new FormulaToken(currentChar, 5 , index));
                    value = [];
                    tokenStartIndex = index + 1;
                }
                else {
                    if (previous && previous._type === 7 ) {
                        tokens1.pop();
                    }
                    if (previous && (previous._subType === 2 || previous._type === 6 || previous._type === 0 )) {
                        tokens1.push(new FormulaToken(currentChar, 5 , index));
                        tokenStartIndex = index + 1;
                    }
                    else {
                        tokens1.push(new FormulaToken(currentChar, 4 , index));
                        tokenStartIndex = index + 1;
                    }
                }
            }
            else if (currentChar === numberDecimalSeparator || isDigit(currentCharCode)) {
                if (value.length > 0) {
                    value.push(currentChar);
                }
                else {
                    var isNum = _readNumber(charArray, index, numberDecimalSeparator);
                    if (isNum.num) {
                        endIndex = isNum.endIndex;
                        var num = isNum.num;

                        if (endIndex <= len - 2 && charArray[endIndex + 1] === '!') {
                            conatArray(value, num);
                            tokenStartIndex = endIndex;
                        }
                        else {
                            tokens1.push(new FormulaToken(num, 0 , index, endIndex, 4 ));
                            tokenStartIndex = endIndex + 1;
                        }
                        index = endIndex;
                    }
                    else {
                        value.push(currentChar);
                    }
                }
            }
            else if (currentCharCode === 123) {
                if (value.length > 0) {
                    if (throwError) {
                        throwParseCharError(currentChar, index);
                    }
                    else {
                        value = addOperand(tokens1, value, tokenStartIndex);
                    }
                }
                currentToken = new FormulaToken(const_array, 1 , index, index, 1 );
                tokens1.push(currentToken);
                stack[++stackEnd] = currentToken;
                tokenStartIndex = index + 1;
            }
            else if (currentChar === arrayGroupSeparator && stackEnd >= 0 && stack[stackEnd].value === const_array) {
                value = addOperand(tokens1, value, tokenStartIndex);
                if (stackEnd < 0 && throwError) {
                    throwParseCharError(currentChar, index);
                }
                tokens1.push(new FormulaToken(arrayGroupSeparator, 3 , index, index));
                tokenStartIndex = index + 1;
            }
            else if (currentCharCode === 125) {
                value = addOperand(tokens1, value, tokenStartIndex);
                if (endIndex < 0 && throwError) {
                    throwParseCharError(currentChar, index);
                }
                stackToken = stack[stackEnd--];
                stackToken = new FormulaToken(currentChar, stackToken._type, index, index, 2 );
                tokens1.push(stackToken);
                tokenStartIndex = index + 1;
            }
            else if (currentCharCode === 32) {
                value = addOperand(tokens1, value, tokenStartIndex);
                tokenStartIndex = index + 1;
            }
            else if (currentChar === listSeparator || currentChar === arrayListSeparator || currentChar === arrayGroupSeparator) {
                value = addOperand(tokens1, value, tokenStartIndex);
                if (stackEnd < 0 || stack[stackEnd]._type !== 1 ) {
                    tokens1.push(new FormulaToken(listSeparator, 5 , index, index, 10 ));
                }
                else {
                    tokens1.push(new FormulaToken(currentChar, 3 , index, index));
                }
                tokenStartIndex = index + 1;
            }
            else if (currentCharCode === 37) {
                value = addOperand(tokens1, value, tokenStartIndex);
                tokens1.push(new FormulaToken(charArray[index], 6 , index, index));
                tokenStartIndex = index + 1;
            }
            else if ((index + 2) <= len && exports.operaterTypesMap[currentChar + charArray[index + 1]]) {
                value = addOperand(tokens1, value, tokenStartIndex);
                tokens1.push(new FormulaToken(charArray.slice(index, index + 2), 5 , index, index + 1, 5 ));
                index++;
                tokenStartIndex = index + 1;
            }
            else if (exports.operaterTypesMap[currentChar]) {
                value = addOperand(tokens1, value, tokenStartIndex);
                tokens1.push(new FormulaToken(currentChar, 5 , index, index));
                tokenStartIndex = index + 1;
            }
            else if (currentChar === '(') {
                if (value.length > 0) {
                    currentToken = new FormulaToken(value, 1 , tokenStartIndex, index, 1 );
                    value = [];
                }
                else {
                    currentToken = new FormulaToken(currentChar, 2 , index, index, 1 );
                }
                tokens1.push(currentToken);
                stack[++stackEnd] = currentToken;
                tokenStartIndex = index + 1;
            }
            else if (currentChar === ')') {
                value = addOperand(tokens1, value, tokenStartIndex);
                if (stackEnd < 0) {
                    if (throwError) {
                        throwParseCharError(currentChar, index);
                    }

                    addOperand(tokens1, currentChar, index);
                    tokenStartIndex = index + 1;
                    return out_index_1 = index, 'continue';
                }
                stackToken = stack[stackEnd--];
                stackToken = new FormulaToken(currentChar, stackToken._type, index, index, 2 );
                tokens1.push(stackToken);
                tokenStartIndex = index + 1;
            }
            else if (currentChar === ':') {
                value = addOperand(tokens1, value, tokenStartIndex);
                tokens1.push(new FormulaToken(currentChar, 5 , index, index, 11 ));
                tokenStartIndex = index + 1;
            }
            else if (currentChar === '\r' || currentChar === '\n') {

            }
            else {
                if (currentChar === '\\') {
                    index++;
                    if (index >= len) {
                        throwError && throwParseCharError(currentChar, index);
                        return out_index_1 = index, 'continue';
                    }
                    value.push(currentChar);
                    currentChar = charArray[index];
                }
                value.push(currentChar);
            }
            out_index_1 = index;
        };
        var out_index_1;
        for (var index = startIndex; index < len; index++) {
            _loop_1(index);
            index = out_index_1;
        }
        addOperand(tokens1, value, tokenStartIndex);

        return tokens1;
    };
    Parser.prototype.buildExpressionTree = function (parserContext, tokens, throwError) {
        var expressions = this._buildExpressionNodes(parserContext, tokens, throwError);
        var expr = this._buildExpressionsToTree(parserContext, expressions, throwError);
        if (throwError) {
            if (!expr) {
                throwParseError();
            }
            this._checkExpression(expr);
        }
        var source = parserContext.source;
        var isFromJSON = source && source._isFromJSON;
        if (!isFromJSON && expr) {
            expr._isNewForIterativeCalc = true;
        }
        return expr;
    };
    Parser.prototype._checkExpression = function (expr) {
        while (expr.type === 10 ) {
            expr = expr.value;
        }
        var self = this;
        if (expr.type === 9 ) {
            if (!expr.value) {
                throwParseError();
            }
            self._checkExpression(expr.value);
            if (expr.value2) {
                self._checkExpression(expr.value2);
            }
        }
        else if (expr.type === 7 ) {
            var args = expr.arguments, count = args.length;
            var fn = expr.function;
            fn && fn._argsValidator(fn.minArgs, fn.maxArgs, count);
            for (var i = 0; i < count; i++) {
                var subExpr = args[i];
                if (fn) {
                    fn._subExpressionValidator(subExpr, i);
                }
                else {
                    calc_common_1._basicSubExpressionValidator(subExpr, i);
                }
                self._checkExpression(subExpr);
            }
        }
    };
    Parser.prototype._buildExpressionsToTree = function (parserContext, expressions, throwError) {
        var binaryExprs = this._parseToBinaryOperatorList(parserContext, expressions, throwError);
        var currentExpression, lastExpression, nextExpression, index;

        for (index = 3; index < binaryExprs.length;) {
            var nextToken = binaryExprs[index];
            var currentToken = binaryExprs[index - 2];
            if (currentToken.type !== 9 ) {
                if (throwError) {
                    throwParseError();
                }
            }
            if (nextToken && nextToken.type === 9 ) {
                while (index >= 3 &&
                    binaryOperatorPriorities[nextToken.value] >= binaryOperatorPriorities[currentToken.value]) {
                    lastExpression = binaryExprs[index - 3];
                    nextExpression = binaryExprs[index - 1];
                    currentExpression = calc_common_1._createOperatorExpression(currentToken.operatorType, lastExpression, nextExpression);
                    binaryExprs.splice(index - 3, 3, currentExpression);
                    index -= 2;
                    if (index >= 3) {
                        currentToken = binaryExprs[index - 2];
                    }
                }
                index += 2;
            }
            else {
                index++;
            }
        }
        if (binaryExprs.length === 1) {
            return binaryExprs[0];
        }


        for (index = binaryExprs.length - 2; index > 0; index -= 2) {
            lastExpression = binaryExprs[index - 1];
            nextExpression = binaryExprs[index + 1];
            if (binaryExprs[index].type !== 9 ) {
                if (throwError) {
                    throwParseError();
                }
            }
            currentExpression = calc_common_1._createOperatorExpression(binaryExprs[index].operatorType, lastExpression, nextExpression);
            binaryExprs.splice(index - 1, 3, currentExpression);
        }
        return currentExpression;
    };
    Parser.prototype._parseToBinaryOperatorList = function (context, expressions, throwError) {
        expressions = Array.isArray(expressions) ? expressions : [expressions];
        var result = [], length = expressions.length;
        for (var i = 0; i < length; i++) {
            var expr = expressions[i], newExpr = expr;
            if (expr.type === 9 ) {
                if (expr.operatorType === 0 || expr.operatorType === 1 ) {
                    if (i === length - 1) {
                        if (throwError) {
                            throwParseError();
                        }
                    }
                    else {
                        var endIndex = i;
                        while (expressions[endIndex].type === 9 && expressions[endIndex].operatorType <= 1) {
                            endIndex++;
                        }
                        var operated = this._buildExpressionsToTree(context, expressions[endIndex]);
                        for (var index = endIndex - 1; index >= i; index--) {
                            newExpr = calc_common_1._createOperatorExpression(expressions[index].operatorType, operated);
                            operated = newExpr;
                        }
                        newExpr = operated;
                        i = endIndex;
                    }
                }
                else if (expr.operatorType === 2 ) {
                    if (i === 0) {
                        if (throwError) {
                            throwParseError();
                        }
                    }
                    else {
                        newExpr = calc_common_1._createOperatorExpression(expr.operatorType, result[result.length - 1]);
                        result[result.length - 1] = newExpr;
                        continue;
                    }
                }
            }
            else if (expr.type === 10 ) {
                expr.value = this._buildExpressionsToTree(context, expr.value);
                newExpr = expr;
            }
            else if (expr.type === 7 ) {
                var argIndex = 0, functionArgs = expr.arguments, newArgs = [], argExprs = [];
                var fn = expr.function;
                var isLETFunction = expr.functionName === 'LET';
                if (functionArgs.length > 0) {
                    var currentLetContext = [];
                    if (isLETFunction && !context._LETContextForCheck) {
                        context._LETContextForCheck = [];
                    }
                    if (context._LETContextForCheck) {
                        context._LETContextForCheck.push(currentLetContext);
                    }
                    for (var j = 0; j <= functionArgs.length; j++) {
                        var arg = functionArgs[j];
                        var newArg = void 0;
                        if (j === functionArgs.length || arg.type === 0 && arg.value === listSeparator) {
                            if (argIndex === j) {
                                newArg = new calc_common_1.Expression(11 );
                            }
                            else {
                                newArg = this._buildExpressionsToTree(context, argExprs, throwError);
                            }
                            newArgs.push(newArg);
                            var currentFnArgIndex = newArgs.length - 1;
                            var isOddArgIndex = currentFnArgIndex % 2 === 0;


                            if (isLETFunction && isOddArgIndex && newArg.type === 100 &&
                                (j < functionArgs.length || (j === functionArgs.length && isLETLocalVarible(newArg.value, context._LETContextForCheck)))) {
                                newArg._isLocalVarible = true;
                                currentLetContext.push(newArg.value);
                            }
                            argIndex = j + 1;
                            argExprs = [];
                        }
                        else {
                            newArg = arg;
                            argExprs.push(newArg);
                            if (newArg.type === 100 && isLETLocalVarible(newArg.value, context._LETContextForCheck)) {
                                newArg._isLocalVarible = true;
                            }
                        }
                        if (fn && newArg) {
                            if (fn._expressionHandler) {
                                fn._expressionHandler(newArg, context);
                            }
                            if (newArg._isLocalVarible) {
                                var LETFunction = context.getFunction('LET') || calc_common_1.Functions.findGlobalFunction('LET');
                                LETFunction._expressionHandler(newArg, context);
                            }
                        }
                    }
                    expr.arguments = newArgs;
                }
                newExpr = expr;
                if (isLETFunction && context._LETContextForCheck) {
                    context._LETContextForCheck.pop();
                }
            }
            result.push(newExpr);
        }
        return result;
    };
    Parser.prototype._buildExpressionNodes = function (parserContext, tokens1, throwError) {
        var expressions = [];
        for (var i = 0, length_1 = tokens1.length; i < length_1;) {
            i = this.resolveToken(parserContext, tokens1, expressions, i, throwError);
        }
        return expressions;
    };
    Parser.prototype.resolveToken = function (parserContext, tokens, expressions, currentTokenIndex, throwError, isInLETFunctionScope) {
        var currentToken = tokens[currentTokenIndex];
        var resolvers = parserContext.getResolvers();
        for (var resolveIndex = 0; resolveIndex < resolvers.length; resolveIndex++) {
            var result = resolvers[resolveIndex].resolveToken(parserContext, this, tokens, currentTokenIndex, throwError, isInLETFunctionScope);
            if (result) {
                var expr = result.expr;
                var priviousIndex = currentTokenIndex - 1;
                if (expr && result.index !== keyword_undefined) {
                    currentTokenIndex = result.index - 1;
                }
                else {
                    expr = result;
                }


                var priviousExpr = expressions.length > 0 ? expressions[expressions.length - 1] : keyword_null;
                if (priviousExpr && expr.type !== 0 && expr.type !== 7 && expr.type < 9
                    && priviousExpr.type !== 0 && priviousExpr.type !== 7 && priviousExpr.type < 9 ) {
                    var priviousEnd = tokens[priviousIndex]._endIndex;
                    if (priviousEnd < currentToken._index - 1) {
                        expressions.push(calc_common_1._createOperatorExpression(17 , ' '));
                    }
                }
                expressions.push(expr);
                break;
            }
        }
        return currentTokenIndex + 1;
    };
    Parser.prototype.resolveSubTokens = function (parserContext, tokens, currentTokenIndex, throwError, isInLETFunctionScope, isSingleSubTokens) {
        var subExpressions = [];
        while (currentTokenIndex < tokens.length && tokens[currentTokenIndex]._subType !== 2 ) {
            currentTokenIndex = this.resolveToken(parserContext, tokens, subExpressions, currentTokenIndex, throwError, isInLETFunctionScope);
            if (isSingleSubTokens) {
                currentTokenIndex--;
                break;
            }
        }
        return { exprs: subExpressions, index: currentTokenIndex + 1 };
    };
    return Parser;
}());
exports.Parser = Parser;
var ParserContext = (function () {
    function ParserContext(source, useR1C1, baseIdentity, option) {
        this._toStandard = false;
        this.ignoreError = false;
        var self = this;


        self.useR1C1 = useR1C1;
        self.baseIdentity = baseIdentity;
        self.option = option;
        self.source = source;
    }

    ParserContext.prototype.getExternalSource = function (bookName, sheetName) {
        var service = this.source.getCalcService();
        var models = service.getAllSourceModels();
        for (var i = 0; i < models.length; i++) {
            if (stringHelper._compareStringIgnoreCase(models[i].getSource().getName(), sheetName)) {
                return models[i].getSource();
            }
        }
        return keyword_null;
    };

    ParserContext.prototype.getExternalSourceToken = function (source) {
        return source.getName();
    };
    ParserContext.prototype.setSource = function (source) {
        this.source = source;
    };
    ParserContext.prototype.getResolvers = function () {
        var service = (this.source || this._sheet).getCalcService();
        return service && service.getResolvers();
    };
    ParserContext.prototype.addResolver = function (resolve) {
        var service = (this.source || this._sheet).getCalcService();
        service && service.addResolver(resolve);
    };
    ParserContext.prototype.getFunction = function (name) {
        var actucalCustomName = name;
        var builtInFunctionsMapping = calc_common_1.getMapping() && calc_common_1.getMapping().builtInFunctionsMapping;
        if (!isNullOrUndefined(builtInFunctionsMapping)) {
            for (var key in builtInFunctionsMapping) {
                if (builtInFunctionsMapping[key].alias === name) {
                    actucalCustomName = key;
                }
            }
        }
        return this.source && this.source.getCustomFunction(actucalCustomName) || calc_common_1.Functions.findGlobalFunction(name);
    };
    return ParserContext;
}());
exports.ParserContext = ParserContext;


calc_common_1.CalcSource.prototype.getParserContext = function (useR1C1, identity, option) {
    return new ParserContext(this, useR1C1, identity, option);
};


function getValidSources(context, charArray, charArray2) {
    if (!charArray || charArray.length === 0
        || needConvertToError(context, charArray) || needConvertToError(context, charArray2)) {
        return [];
    }
    var result = charArray;
    if (charArray2) {
        result.push(':');
        for (var i = 0; i < charArray2.length; i++) {
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
var DefaultTokenResolver = (function (_super) {
    __extends(DefaultTokenResolver, _super);
    function DefaultTokenResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }


    DefaultTokenResolver.prototype.resolveToken = function (context, parser, tokens, currentTokenIndex, throwError, isInLETFunctionScope) {
        var currentToken = tokens[currentTokenIndex], stringValue = currentToken._stringValue, valueArray = currentToken._value;
        var expr, arrayRowIndex, currentTokenType = currentToken._type;
        var source = null, value, subResult;
        var currentTokenSubType = currentToken._subType;
        if (currentTokenType === 0 && currentTokenSubType === 12 ) {
            var startSourceString = void 0;
            if (stringValue) {
                startSourceString = stringValue;
                if (startSourceString.charAt(0) === '\'') {
                    startSourceString = startSourceString.substring(1, startSourceString.length - 1);
                }
            }
            currentTokenIndex++;
            if (startSourceString) {
                source = context.getExternalSource('', startSourceString);
            }
            currentToken = tokens[currentTokenIndex];
            if (!currentToken) {
                expr = new calc_common_1.Expression(8 );
                expr.value = stringValue;
                return expr;
            }
            stringValue = currentToken._stringValue;
        }

        if (currentTokenType === 0 ) {
            if (currentToken._subType === 0 ) {
                value = stringValue.toUpperCase();
                if (isActualTrue(value) || isActualFalse(value)) {
                    currentToken._subType = 5 ;
                    currentToken._stringValue = value;
                    expr = new calc_common_1.Expression(4 );
                    expr.value = isActualTrue(value);
                }
                else {
                    var exprType = isInLETFunctionScope ? 100 : 8 ;
                    expr = new calc_common_1.Expression(exprType);
                    expr.value = stringValue;
                }
            }
            else if (currentToken._subType === 4 ) {
                expr = new calc_common_1.Expression(2 );
                expr.value = parseFloat(stringValue);
                expr.originalValue = stringValue;
            }
            else if (currentToken._subType === 3 ) {
                expr = new calc_common_1.Expression(3 );
                expr.value = stringValue;
            }
            else if (currentToken._subType === 5 ) {
                expr = new calc_common_1.Expression(4 );
                expr.value = isActualTrue(stringValue);
            }
            else if (currentToken._subType === 6 ) {
                expr = new calc_common_1.Expression(5 );
                expr.value = calc_common_1.CalcError.parse(stringValue);
            }
            else if (currentToken._subType === 7 ) {
                var exprType = isInLETFunctionScope ? 100 : 8 ;
                expr = new calc_common_1.Expression(exprType);
                expr.value = stringValue;
            }
        }
        else if (currentTokenType === 1 ) {
            if (stringValue === const_array) {
                expr = new calc_common_1.Expression(6 );
                currentTokenIndex++;
                value = [[]];
                arrayRowIndex = 0;
                var arrayColumnCount = 0, currentArrayColumnCount = 0;
                while (currentTokenIndex < tokens.length && tokens[currentTokenIndex]._subType !== 2 ) {
                    currentToken = tokens[currentTokenIndex];

                    if (currentTokenIndex < tokens.length - 1 && currentToken._type === 4 && currentToken._stringValue === '-' &&
                        tokens[currentTokenIndex + 1]._subType === 4) {
                        currentTokenIndex++;
                        currentToken = tokens[currentTokenIndex];
                        currentToken._value.unshift('-');
                        currentToken._stringValue = '-' + currentToken._stringValue;
                    }
                    if (currentToken._type === 3 ) {
                        if (currentToken._stringValue === arrayGroupSeparator) {
                            if (arrayColumnCount !== currentArrayColumnCount) {
                                throw stringHelper._format(calc_common_1.sR().Exp_InvalidArrayColumns, [currentToken._index]);
                            }
                            value.push([]);
                            arrayRowIndex++;
                            currentArrayColumnCount = 0;
                        }
                    }
                    else if (currentToken._type === 0 &&
                        (currentToken._subType === 4 || currentToken._subType === 3
                            || currentToken._subType === 5 || currentToken._subType === 6 )) {
                        var tokenValue = currentToken._stringValue;
                        var tmpValue = tokenValue;
                        if (currentToken._subType === 4 ) {
                            tmpValue = parseFloat(tokenValue);
                        }
                        else if (currentToken._subType === 5 ) {
                            tmpValue = tokenValue.toUpperCase() === 'TRUE';
                        }
                        else if (currentToken._subType === 6 ) {
                            tmpValue = calc_common_1.CalcError.parse(tokenValue);
                        }
                        value[arrayRowIndex].push(tmpValue);
                        arrayRowIndex === 0 && arrayColumnCount++;
                        currentArrayColumnCount++;
                    }
                    else {
                        throw calc_common_1.sR().Exp_InvalidArray;
                    }
                    currentTokenIndex++;
                }
                if (arrayColumnCount !== currentArrayColumnCount) {
                    throw stringHelper._format(calc_common_1.sR().Exp_InvalidArrayColumns, [currentToken._index]);
                }
                currentTokenIndex++;
                expr.value = new calc_common_1.CalcArray(value);
                return { expr: expr, index: currentTokenIndex };
            }
            else if (valueArray.length > 0) {
                var allowDynamicArray = context.source && context.source._service && context.source._service.allowDynamicArray;
                if (valueArray[0] === '@' && !allowDynamicArray) {
                    currentToken._stringValue = valueArray.slice(1).join('');
                    stringValue = currentToken._stringValue;
                }
                expr = new calc_common_1.Expression(7 );
                expr.functionName = stringValue;


                var fn = context.getFunction(expr.functionName) || calc_common_1.Functions.findGlobalFunction(expr.functionName);
                if (allowDynamicArray === false && fn && fn.isDynamicArrayFunction === true) {
                    fn = keyword_undefined;
                }
                expr.function = fn;
                subResult = parser.resolveSubTokens(context, tokens, currentTokenIndex + 1, undefined, isInLETFunctionScope || stringValue === 'LET', valueArray[0] === '@' && allowDynamicArray);
                if (subResult) {
                    expr.arguments = subResult.exprs;
                    return { expr: expr, index: subResult.index };
                }
                expr.arguments = [];
                return expr;
            }
        }
        else if (currentTokenType === 4
            || currentTokenType === 6
            || currentTokenType === 5 ) {
            expr = calc_common_1._createOperatorExpression(currentTokenType === 4 ? exports.preOperaterTypesMap[stringValue] : exports.operaterTypesMap[stringValue], stringValue);
        }
        else if (currentTokenType === 2 ) {
            expr = new calc_common_1.Expression(10 );
            subResult = parser.resolveSubTokens(context, tokens, currentTokenIndex + 1);
            if (subResult) {
                expr.value = subResult.exprs;
                return { expr: expr, index: subResult.index };
            }
            if (throwError) {
                throwParseError();
            }
        }
        else if (currentTokenType === 3 ) {
            expr = new calc_common_1.Expression(0 );
            expr.value = stringValue;
        }
        if (source && expr) {
            expr.source = source;


            expr = { expr: expr, index: currentTokenIndex + 1 };
        }
        return expr;
    };
    DefaultTokenResolver.prototype.unparse = function (context, parser, expr, formula) {
        var self = this;
        if (expr.type === 6
            || expr.type === 4
            || expr.type === 2
            || expr.type === 5
            || expr.type === 3 ) {
            self._unparseConstantExpression(context, expr, formula);
        }
        else if (expr.type === 9 ) {
            self._unparseOperatorExpressions(context, parser, expr, formula);
        }
        else if (expr.type === 10 ) {
            formula.push('(');
            parser._unparseCore(context, expr.value, formula);
            formula.push(')');
        }
        else if (expr.type === 7 ) {
            var functionName = expr.function && expr.function.name || expr.functionName;
            var functionMapping = calc_common_1.getMapping() && calc_common_1.getMapping().builtInFunctionsMapping;
            var functionAlias = functionMapping && functionMapping[functionName];
            conatArray(formula, (functionAlias && functionAlias.alias || functionName).split(''));
            var functionWrapper = functionName === '@' ? ['', ''] : ['(', ')'];
            formula.push(functionWrapper[0]);
            for (var i = 0; i < expr.arguments.length; i++) {
                if (i !== 0) {
                    formula.push(listSeparator);
                }
                parser._unparseCore(context, expr.arguments[i], formula);
            }
            formula.push(functionWrapper[1]);
        }
        else if (expr.type === 1 || expr.type === 8 ) {
            self.unparseRefenceExpressions(context, parser, expr, formula);
            return true;
        }
        else {
            return false;
        }
        return true;
    };
    DefaultTokenResolver.prototype.unparseSource = function (context, formula, source, endSource) {
        if (context.getExternalSourceToken) {
            if (source !== calc_common_1.BangSource) {
                var sourceName = getValidSources(context, context.getExternalSourceToken(source).split(''), endSource && context.getExternalSourceToken(endSource).split(''));
                if (sourceName.length > 0) {
                    arraypush.apply(formula, sourceName);
                }
                else {
                    return false;
                }
            }
            formula.push('!');
            return true;
        }
        return false;
    };
    DefaultTokenResolver.prototype.unparseRefenceExpressions = function (context, parser, expr, formula) {
        if (expr.source === calc_common_1.BangSource ) {
            formula.push('!');
        }
        else if (expr.source) {
            var isSourceValid = this.unparseSource(context, formula, expr.source, expr.endSource);
            if (!isSourceValid) {
                formula.push('#', 'R', 'E', 'F', '!');
                return;
            }
        }
        if (expr.type === 8 ) {
            formula.push(expr.value);
        }
    };
    DefaultTokenResolver.prototype._unparseOperatorExpressions = function (context, parser, expr, formula) {
        var operatorType = expr.operatorType;
        if (operatorType === 2 ) {
            parser._unparseCore(context, expr.value, formula);
            formula.push('%');
        }
        else if (operatorType === 0 || operatorType === 1 ) {
            formula.push(exports._OperatorTypeStringMap[operatorType]);
            parser._unparseCore(context, expr.value, formula);
        }
        else {
            parser._unparseCore(context, expr.value, formula);
            formula.push(exports._OperatorTypeStringMap[operatorType]);
            parser._unparseCore(context, expr.value2, formula);
        }
    };
    DefaultTokenResolver.prototype._unparseConstantExpression = function (context, expr, formula) {
        var errMsg = calc_common_1.sR().Exp_InvalidArray;
        if (expr.type === 3 ) {
            formula.push('"');

            formula.push(stringHelper._replace(expr.value, '\"', '\"\"'));
            formula.push('"');
        }
        else if (expr.type === 2 ) {
            var value = expr.originalValue || expr.value.toString();
            if (numberDecimalSeparator !== '.') {
                value = value.replace('.', numberDecimalSeparator);
            }
            formula.push(value);
        }
        else if (expr.type === 4 ) {
            formula.push(expr.value ? calc_common_1.getBoolean().boolean_true : calc_common_1.getBoolean().boolean_false);
        }
        else if (expr.type === 6 ) {
            formula.push('{');
            var array = expr.value;
            if (array.getRowCount() <= 0) {
                throw errMsg;
            }
            for (var rowIndex = 0, rowCount = array.getRowCount(); rowIndex < rowCount; rowIndex++) {
                if (rowIndex >= 1) {
                    formula.push(arrayGroupSeparator);
                }
                for (var columnIndex = 0, columnCount = array.getColumnCount(); columnIndex < columnCount; columnIndex++) {
                    if (columnIndex !== 0) {
                        formula.push(arrayListSeparator);
                    }
                    var v = array.getValue(rowIndex, columnIndex);
                    if (v === keyword_undefined || v === keyword_null) {
                        throw errMsg;
                    }
                    var valueType = typeof v;


                    if (valueType === const_string) {
                        formula.push('"');
                        formula.push(stringHelper._replace(v, '\"', '\"\"'));
                        formula.push('"');
                    }
                    else if (valueType === const_boolean) {
                        formula.push(v ? calc_common_1.getBoolean().boolean_true : calc_common_1.getBoolean().boolean_false);
                    }
                    else if (valueType === 'number' && numberDecimalSeparator !== '.') {
                        formula.push(v.toString().replace('.', numberDecimalSeparator));
                    }
                    else {
                        formula.push(v.toString());
                    }
                }
            }
            formula.push('}');
        }
        else if (expr.type === 5 ) {
            formula.push(expr.value.toString());
        }
        else if (expr.type === 11 ) {

        }
    };
    return DefaultTokenResolver;
}(TokenResolver));
exports.DefaultTokenResolver = DefaultTokenResolver;
calc_common_1.ParserWrapper._getNumberDecimalSeparator = function () {
    if (Parser.numberDecimalSeparator === keyword_undefined) {
        var parser = new Parser();
        parser.setParserOption(true);
    }
    return Parser.numberDecimalSeparator;
};
calc_common_1.ParserWrapper._getNumberGroupSeparator = function () {
    if (Parser.numberGroupSeparator === keyword_undefined) {
        var parser = new Parser();
        parser.setParserOption(true);
    }
    return Parser.numberGroupSeparator;
};
function isLETLocalVarible(varible, letContext) {
    for (var i = 0; i < letContext.length; i++) {
        var currentScope = letContext[i];
        for (var j = 0; j < currentScope.length; j++) {
            if (varible === currentScope[j]) {
                return true;
            }
        }
    }
    return false;
}
 }),

 './src/calc.common.ts':
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
var calcEngine_res_en_1 = __webpack_require__( './src/calcEngine.res.en.ts');


exports.ExcelCompatibleCalcMode = false;
exports.SR = { en: calcEngine_res_en_1.resource };
exports.ErrorCodeList = [0x00, 0x07, 0x0F, 0x17, 0x1D, 0x2A, 0x24, 99, 100];
var const_number = 'number', const_string = 'string', const_boolean = 'boolean', const_true = 'TRUE', const_false = 'FALSE';
var const_null = '#NULL!', const_div0 = '#DIV/0!', const_value = '#VALUE!', const_ref = '#REF!', const_name = '#NAME?', const_na = '#N/A', const_num = '#NUM!', const_spill = '#SPILL!', const_calc = '#CALC!';
var const_Feb = 1, const_Mar = 2;
var ErrorList = [const_null, const_div0, const_value, const_ref, const_name, const_na, const_num, const_spill, const_calc];
exports.ErrorList = ErrorList;
exports.BAND_INDEX_CONST = -2147483648, exports.MAX_ROW_COUNT = 1048576, exports.MAX_COLUMN_COUNT = 16384;
var Types = Common_1.Common._Types, isArray = Types._isArray, isNullOrUndefined = Types._isNullOrUndefined, inArray = Types._inArray;
var arrayHelper_getLength = Common_1.Common._ArrayHelper._getLength, RegexHelper = Common_1.Common._RegexHelper;
var parseIntFunc = parseInt, isNaNFunc = isNaN;
var dateTimeHelper = Common_1.Common._DateTimeHelper, dateTimeHelper_toOADate = dateTimeHelper._toOADate;
var stringHelper = Common_1.Common._StringHelper, numberHelper = Common_1.Common._NumberHelper;
function toUpperCase(str) {
    return str && str.toUpperCase();
}
function hasSubtotal(expr) {
    if (expr) {
        if (expr.type === 7 && (expr.functionName === 'SUBTOTAL' || expr.functionName === 'AGGREGATE')) {
            return true;
        }
        var length_1 = expr.arguments && expr.arguments.length;
        for (var i = 0; i < length_1; i++) {
            if (hasSubtotal(expr.arguments[i])) {
                return true;
            }
        }
        if (hasSubtotal(expr.value) || hasSubtotal(expr.value2)) {
            return true;
        }
    }
    return false;
}
var rm = new Common_1.Common.ResourceManager(exports.SR, 'CalcEngine');
exports.sR = rm.getResource.bind(rm);
exports.getMapping = function () {
    return Functions && Functions.resourceMapping;
};
exports.getBoolean = function () {
    var booleanMapping = exports.getMapping() && exports.getMapping().booleanMapping;
    return {
        boolean_true: booleanMapping && booleanMapping.boolean_true || const_true,
        boolean_false: booleanMapping && booleanMapping.boolean_false || const_false,
    };
};
var keyword_null = null, keyword_undefined = void 0;
var Math_abs = Math.abs, Math_exp = Math.exp, Math_log = Math.log, Math_pow = Math.pow, Math_floor = Math.floor, Math_ceil = Math.ceil;

var BangSource = {};
exports.BangSource = BangSource;
var RefErrorSource = {};
exports.RefErrorSource = RefErrorSource;
var missingArgument;
exports.missingArgument = missingArgument;
var CalcConvertedError = {};
var CalcError = (function () {
    function CalcError(error) {
        var err = CalcError._parseCore(error);
        if (err) {
            this._error = err.error;
            this._code = err.code;
        }
        else {
            throw exports.sR().Exp_NotSupported;
        }
    }


    CalcError.prototype.toString = function () {
        var calcErrorMapping = exports.getMapping() && exports.getMapping().clacErrorMapping;
        var alias = calcErrorMapping && calcErrorMapping[this._error];
        return alias || this._error;
    };
    CalcError.prototype.clone = function () {
        return new CalcError(this._error);
    };
    CalcError.prototype.toJSON = function () {
        return {
            _calcError: this._error,
            _code: this._code
        };
    };


    CalcError.parse = function (value) {
        try {
            return new CalcError(value);
        }
        catch (e) {
            return keyword_undefined;
        }
    };
    CalcError._parseCore = function (value) {
        if (value) {
            for (var i = 0; i < ErrorList.length; i++) {
                var errItem = ErrorList[i];
                if (errItem === value || errItem === toUpperCase(value)) {
                    return { error: errItem, code: exports.ErrorCodeList[i] };
                }
            }
        }
        return keyword_undefined;
    };
    return CalcError;
}());
exports.CalcError = CalcError;
var errors = {
    Name: new CalcError(const_name),
    Null: new CalcError(const_null),
    DivideByZero: new CalcError(const_div0),
    NotAvailable: new CalcError(const_na),
    Value: new CalcError(const_value),
    Reference: new CalcError(const_ref),
    Number: new CalcError(const_num),
    Spill: new CalcError(const_spill),
    Calc: new CalcError(const_calc)
};
exports.Errors = errors;
var CalcErrorsValue = errors.Value, CalcErrorsReference = errors.Reference, CalcErrorsNumber = errors.Number, CalcErrorsDivideByZero = errors.DivideByZero, CalcErrorsNotAvailable = errors.NotAvailable, CalcErrorsNull = errors.Null;
var monthStrings = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12
};
var ParserWrapper = (function () {
    function ParserWrapper() {
    }
    return ParserWrapper;
}());
exports.ParserWrapper = ParserWrapper;
function _isNaNOrInfinite(value) {
    return isNaN(value) || !isFinite(value);
}
function _tryToDouble(value, doubleValue) {
    var result;
    if (!value) {
        doubleValue.value = 0;
        return true;
    }
    var typestr = typeof value;
    try {
        if (typestr === const_number) {
            result = value;
        }
        else if (typestr === const_string) {
            if (/[\f\n\r\t\v]/.test(value)) {
                return false;
            }
            var oldValue = value;
            value = value.trim();
            if (value.length === 0) {
                doubleValue.value = 0;
                return true;
            }


            var decimalSeparator = ParserWrapper._getNumberDecimalSeparator();
            var groupSeparator = ParserWrapper._getNumberGroupSeparator();
            if ((decimalSeparator !== '.' && groupSeparator !== '.' && value.indexOf('.') >= 0)
                || (decimalSeparator !== ',' && groupSeparator !== ',' && value.indexOf(',') >= 0)) {
                return false;
            }


            var isPercent = false;
            var isNegative = false;
            var start = value[0], end = value[value.length - 1];
            if (value[0] === '(' && end === ')') {
                isNegative = true;
                value = value.substring(1, value.length - 1).trim();
                start = value[0];
                if (start === '+' || start === '-') {
                    return false;
                }
                end = value[value.length - 1];
            }
            if (start === '%') {
                isPercent = true;
                value = value.substring(1);
            }
            else if (end === '%') {
                isPercent = true;
                value = value.substring(0, value.length - 1);
            }
            else if (start === '$') {
                value = value.substring(1);
            }
            if (value === '') {
                return false;
            }
            if (value.indexOf(groupSeparator) >= 0) {
                var reg = RegexHelper._getReg('^\\ *[\\+|\\-]?\\ *\\d+(\\' + groupSeparator + '\\d{3,})+(\\' + decimalSeparator + '\\d*)?([E|e][\\+|\\-]?\\d+)?\\ *$');
                if (reg.test(value)) {
                    value = value.replace(RegexHelper._getReg('[ \\' + groupSeparator + ']'), '');
                }
            }
            value = value.trim();
            if (value[1] === ' ') {
                if (value[0] === '+') {
                    value = value.replace(/^\+ +/, '+');
                }
                else if (value[0] === '-') {
                    value = value.replace(/^\- +/, '-');
                }
            }
            if (decimalSeparator !== '.') {
                value = value.replace(decimalSeparator, '.');
            }
            if (value.indexOf(decimalSeparator) !== value.lastIndexOf(decimalSeparator)) {
                return false;
            }


            if (value.length >= 2 && value[0] === '0' && value[1] === 'x') {
                return false;
            }
            result = Number(value).valueOf();
            if (isPercent) {
                result /= 100;
            }
            if (isNegative) {
                result = -result;
            }

            if (_isNaNOrInfinite(result)) {
                value = oldValue.trim();


                var c = value.charCodeAt(0);


                c |= 0x20;
                if (value.length > 4 && c >= 97 && c <= 122) {
                    var s = value[0] + value[1] + value[2];
                    s = s.toUpperCase();
                    if (!monthStrings[s]) {
                        return false;
                    }
                }


                start = value[0];
                end = value[value.length - 1];
                if (start === '/' || start === '-' || start === ':'
                    || end === '/' || end === '-') {
                    return false;
                }

                var reg = RegexHelper._getReg('[\\\'\\$\\#\\*\\%\\!\\@\\&\\(\\)\\=\\;\\"\\<\\>\\?\\,\\z\\Z]');
                if (reg.test(value)) {
                    return false;
                }


                result = new Date(value);
                if (_isNaNOrInfinite(result.valueOf())) {
                    return false;
                }
                result = dateTimeHelper._toOADate(result);
            }
        }
        else if (typestr === const_boolean) {
            result = value ? 1 : 0;
        }
        else if (value instanceof Date) {
            result = dateTimeHelper._toOADate(value);
        }
        else {
            return false;
        }
    }
    catch (ex) {
        return false;
    }
    doubleValue.value = result;
    return true;
}
function _toDouble(value) {
    var doubleValue = { value: 0 };
    if (_tryToDouble(value, doubleValue)) {
        return doubleValue.value;
    }
    throw exports.sR().Exp_InvalidCast;
}


function _judgeBlankChar(value, ignoreBlank) {
    return ignoreBlank && (value === keyword_null || value === keyword_undefined || (typeof (value) === const_string && value.trim() === ''));
}
function _tryToBool(value, boolValue) {
    try {
        if (!value) {
            value = false;
        }
        else if (typeof value === const_boolean) {

        }
        else if (value instanceof Date) {
            value = dateTimeHelper._toOADate(value) !== 0;
        }
        else if (isNumber(value)) {
            value = value !== 0;
        }
        else {
            return false;
        }
    }
    catch (ex) {
        return false;
    }
    boolValue.value = value;
    return true;
}
function _convertValue(value, valueType, convert, ignoreBlank, ignoreBoolean) {
    if (_isError(value)) {
        return value;
    }
    var refValue = { value: keyword_null }, error = CalcConvertedError;
    if (valueType !== 0 && _judgeBlankChar(value, ignoreBlank)) {
        return error;
    }
    switch (valueType) {
        case 1 :
        case 5 :
            if (!convert || valueType === 5) {
                if ((typeof value) === const_number) {

                }
                else if (value instanceof Date) {
                    value = dateTimeHelper._toOADate(value);
                }
                else {
                    value = error;
                }
            }
            else {
                if ((typeof value) === const_boolean && ignoreBoolean) {
                    return error;
                }
                value = _tryToDouble(value, refValue) ? refValue.value : error;
            }
            break;
        case 11 :
            value = _tryToDouble(value, refValue) ? refValue.value : error;
            break;
        case 4 :
            if (typeof (value) === const_string) {
                var date = Common_1.Common._DateTimeHelper._parseLocale(value);
                if (date !== keyword_undefined && date !== keyword_null) {
                    value = dateTimeHelper._toOADate(date);
                }
                else {
                    value = error;
                }
            }
            else if (!convert) {
                if ((typeof value) !== const_number && !(value instanceof Date)) {
                    value = error;
                }
            }
            else {
                value = _tryToDouble(value, refValue) ? refValue.value : error;
            }
            break;
        case 3 :
            if (!convert) {
                if ((typeof value) !== const_boolean) {
                    value = error;
                }
            }
            else {
                value = _tryToDouble(value, refValue) ? refValue.value : error;
            }
            break;
        case 2 :
            value = value === keyword_null || value === keyword_undefined ? '' : value.toString();
            break;
    }
    return value;
}
var CalcArray = (function () {
    function CalcArray(array, referenceInTwoDimension) {
        this.array = array;
        this.referenceInTwoDimension = referenceInTwoDimension;
    }
    CalcArray.prototype.getRowCount = function () {
        return this.array.length;
    };
    CalcArray.prototype.getColumnCount = function () {
        var item = this.array[0];
        return item && item.length || 0;
    };


    CalcArray.prototype.getValue = function (row, column) {
        var array = this.array;
        var r = row;
        if (typeof column !== 'number') {
            var obj = row;
            r = obj.row;
            column = obj.column;
        }
        if (r < 0 || column < 0 || r >= array.length || column >= array[0].length) {
            return CalcErrorsValue;
        }
        return this.array[r][column];
    };
    CalcArray.prototype.getValueByIndex = function (index) {
        var cc = this.getColumnCount(), r = Math_floor(index / cc), c = index % cc;
        return this.getValue(r, c);
    };
    CalcArray.prototype.toArray = function (valueType, toOneDimension, breakOnError, breakOnConvertError, followFormatter, ignoreBlank, ignoreBoolean) {
        if (toOneDimension === void 0) { toOneDimension = true; }
        var self = this, rowCount = 0, colCount = 0, result = [], value, colValues, errorOjbect = CalcConvertedError;
        rowCount = self.getRowCount();

        if (rowCount) {
            colCount = self.getColumnCount();
            for (var i = 0; i < rowCount; i++) {
                if (!toOneDimension) {
                    colValues = [];
                    result.push(colValues);
                }
                for (var j = 0; j < colCount; j++) {
                    value = self.getValue(i, j);
                    if (self.referenceInTwoDimension && _isReference(value)) {
                        value = value.getValueByIndex(0);
                    }
                    if (breakOnError && _isError(value)) {
                        result = [value];
                        result.isError = true;
                        return result;
                    }
                    value = _convertValue(value, valueType, false, ignoreBlank);
                    if (breakOnConvertError && value === errorOjbect) {
                        result = [value];
                        result.isConvertError = true;
                        return result;
                    }
                    if (toOneDimension) {
                        result.push(value);
                    }
                    else {
                        colValues.push(value);
                    }
                }
            }
        }
        result.rowCount = rowCount;
        result.colCount = colCount;
        result.rangeCount = 1;
        return result;
    };
    CalcArray.prototype.slice = function (row, column, rowCount, columnCount) {
        var self = this, array = self.array, result = [], colArray;
        row = row < 0 ? 0 : row;
        column = column < 0 ? 0 : column;
        rowCount = row + rowCount > self.getRowCount() ? self.getRowCount() - row : rowCount;
        columnCount = column + columnCount > self.getColumnCount() ? self.getColumnCount() - column : columnCount;
        for (var i = 0; i < rowCount; i++) {
            colArray = [];
            result.push(colArray);
            for (var j = 0; j < columnCount; j++) {
                colArray.push(array[i + row][j + column]);
            }
        }
        return new CalcArray(result);
    };
    return CalcArray;
}());
exports.CalcArray = CalcArray;

function isNumber(value, strict) {
    return (typeof value === const_number) || (value instanceof Date) ||
        !strict && (typeof value === const_boolean || (!isNaN(value) && !isNaN(parseFloat(value))));
}
function _isError(value) {
    return value instanceof CalcError;
}
function _isCalcArray(value) {
    return value instanceof CalcArray;
}
function _isReference(value) {
    return value instanceof CalcReference;
}
var CalcValueTypeStrings = ['o', 'n', 's', 'b', 'd'];
var Convert = (function () {
    function Convert() {
    }
    Convert._isNotAvailableError = function (value) {
        return _isError(value) && value._code === exports.ErrorCodeList[5];
    };
    Convert._toResult = function (value) {
        if (isNaN(value) || !isFinite(value)) {
            return CalcErrorsNumber;
        }
        return value;
    };
    Convert._toArray = function (value, valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank, followFormatter, ignoreBoolean) {
        var result;
        if (value && value.length && value.rowCount && value.colCount) {
            return value;
        }
        else if (_isCalcArray(value)) {
            result = value.toArray(valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank);
            result.isArray = true;
        }
        else if (_isReference(value)) {
            result = value.toArray(valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank, followFormatter, ignoreBoolean);
            result.isReference = true;
        }
        else if (isArray(value)) {
            result = [];
            if (value.length === 0) {
                return result;
            }
            if (isArray(value[0])) {
                return Convert._convertArray(value, valueType, true);
            }
            for (var i = 0; i < value.length; i++) {
                var arg = _convertValue(value[i], valueType, false);
                if (arg === Convert.CalcConvertedError) {
                    result.isConvertError = true;
                }
                result.push(arg);
            }
            result.rowCount = 1;
            result.colCount = value.length;
            result.rangeCount = 1;
        }
        else {
            value = _convertValue(value, valueType, true, ignoreBlank);
            if (breakOnError && Convert._isError(value)) {
                result = [CalcErrorsValue];
                result.isError = true;
            }
            else if (value === Convert.CalcConvertedError) {
                result = [Convert.CalcConvertedError];
                result.isConvertError = true;
            }
            else if (toOneDimension) {
                result = [];
                result.push(value);
            }
            else {
                result = [[]];
                result[0].push(value);
            }
            result.rowCount = 1;
            result.colCount = 1;
            result.rangeCount = 1;
        }
        return result;
    };
    Convert._convertArray = function (array, valueType, convert) {
        var convertedArray;
        if (!array || !array.length || !array[0].length) {
            convertedArray = [];
            convertedArray.isError = true;
            return [[CalcErrorsValue]];
        }

        if (valueType === 0 ) {
            return array;
        }
        var typeString = CalcValueTypeStrings[valueType];
        var rowCount = array.length, colCount = array[0].length, rowValue, convertedRowValue, value, refValue = { value: keyword_null };
        var errorMarked = false, convertErrorMarked = false, errorObject = Convert.CalcConvertedError;
        convertedArray = array[typeString];
        if (!convertedArray) {
            convertedArray = [];
            array[typeString] = convertedArray;
            for (var i = 0; i < rowCount; i++) {
                rowValue = array[i];
                convertedRowValue = convertedArray[i] = [];
                for (var j = 0; j < colCount; j++) {
                    value = rowValue[j];
                    if (_isError(value)) {
                        if (!errorMarked) {
                            convertedArray.isError = true;
                            errorMarked = true;
                        }
                        convertedRowValue.push(value);
                        continue;
                    }
                    switch (valueType) {
                        case 1 :
                        case 5 :
                            if (!convert || valueType === 5) {
                                if ((typeof value) !== const_number && !(value instanceof Date)) {
                                    if (!convertErrorMarked) {
                                        convertErrorMarked = true;
                                        convertedArray.isConvertError = true;
                                    }
                                    value = errorObject;
                                }
                            }
                            else if (_tryToDouble(value, refValue)) {
                                value = refValue.value;
                            }
                            else {
                                if (!convertErrorMarked) {
                                    convertErrorMarked = true;
                                    convertedArray.isConvertError = true;
                                }
                                value = 0;
                            }
                            break;
                        case 3 :
                            if (!convert) {
                                if ((typeof value) !== const_boolean) {
                                    if (!convertErrorMarked) {
                                        convertErrorMarked = true;
                                        convertedArray.isConvertError = true;
                                    }
                                    value = errorObject;
                                }
                            }
                            else if (_tryToBool(value, refValue)) {
                                value = refValue.value;
                            }
                            else {
                                if (!convertErrorMarked) {
                                    convertErrorMarked = true;
                                    convertedArray.isConvertError = true;
                                }
                                value = false;
                            }
                            break;
                        case 2 :
                            value = value === keyword_null || value === keyword_undefined ? '' : value.toString();
                            break;
                    }
                    convertedRowValue.push(value);
                }
            }
        }
        return convertedArray;
    };
    Convert._toInt = function (value) {
        var dVal = _toDouble(value);
        if (Math_abs(dVal) < 1E+21) {
            return parseInt(dVal.toString(), 10);
        }
        throw exports.sR().Exp_InvalidCast;
    };
    Convert._tryToInt = function (value, intValue) {
        if (value === '') {
            return false;
        }
        var dVal = _tryToDouble(value, intValue);
        if (!dVal) {
            return false;
        }
        if (Math_abs(intValue.value) < 1E+21) {
            intValue.value = parseInt(intValue.value.toString(), 10);
            return true;
        }

        return false;
    };
    Convert._toBool = function (value) {
        if (!value) {
            return false;
        }
        else if (typeof value === const_boolean) {
            return value;
        }
        else if (value instanceof Date) {
            return dateTimeHelper._toOADate(value) !== 0;
        }
        else if (Convert._isNumber(value)) {
            return value !== 0;
        }
        else if (Convert._isError(value)) {
            return false;
        }
        throw exports.sR().Exp_InvalidCast;
    };
    Convert._toString = function (value) {
        try {
            if (value === keyword_undefined || value === keyword_null) {
                return '';
            }
            else if (typeof value === const_boolean) {
                return value ? const_true : const_false;
            }
            else if (typeof value === const_string) {
                return value;
            }
            else if (value instanceof Date) {
                return dateTimeHelper._toOADate(value).toString();
            }
            else if (_isCalcArray(value)) {
                throw exports.sR().Exp_InvalidCast;
            }
            else if (typeof value === const_number) {
                return numberHelper._fixNumber(value, Functions.CALC_PRECISION || 15).toString();
            }
            else {
                return value.toString();
            }
        }
        catch (err) {
            throw exports.sR().Exp_InvalidCast;
        }
    };
    Convert._toDateTime = function (value) {
        var dateValue = { value: keyword_null };
        if (Convert._tryToDateTime(value, dateValue)) {
            return dateValue.value;
        }
        throw exports.sR().Exp_InvalidCast;
    };
    Convert._tryToDateTime = function (value, dateValue) {
        if (!value) {
            dateValue.value = Common_1.Common._DateTimeHelper._fromOADate(0);
        }
        else if (value instanceof Date) {
            dateValue.value = new Date(value.valueOf());
        }
        else if (typeof value === const_string) {
            var dateTime = Common_1.Common._DateTimeHelper._parseLocale(value);
            if (!dateTime) {
                if (!isNaN(value)) {
                    dateTime = Common_1.Common._DateTimeHelper._fromOADate(parseFloat(value));
                    if (!dateTime) {
                        return false;
                    }
                }
                else {
                    dateTime = new Date(value);
                    if (isNaN(dateTime.valueOf())) {
                        return false;
                    }


                    try {
                        var reg = /^[-+=\s]*(\d+)\W+(\d+)\W+(\d+)$/;
                        var value2 = stringHelper._trimEnd(stringHelper._trimStart(value.replace(/ |\n/g, ''), ' '), ' ');
                        var results = reg.exec(value2);
                        if (results && results.length === 4) {
                            if (results.indexOf(dateTime.getFullYear().toString()) === -1 || results.indexOf(dateTime.getMonth().toString()) === -1 || results.indexOf(dateTime.getDate().toString()) === -1) {
                                return false;
                            }
                        }
                    }
                    catch (ex) {
                        return false;
                    }
                }
            }
            dateValue.value = dateTime;
        }
        else if (typeof value === const_number) {
            dateValue.value = Common_1.Common._DateTimeHelper._fromOADate(value);
        }
        else {
            return false;
        }
        return true;
    };
    Convert.CalcConvertedError = CalcConvertedError;
    Convert._isArray = _isCalcArray;
    Convert._isNumber = isNumber;
    Convert._isError = _isError;
    Convert._isReference = _isReference;
    Convert._convertValue = _convertValue;
    Convert._judgeBlankChar = _judgeBlankChar;
    Convert._isNaNOrInfinite = _isNaNOrInfinite;
    Convert._toDouble = _toDouble;
    Convert._tryToDouble = _tryToDouble;
    Convert._tryToBool = _tryToBool;
    return Convert;
}());
exports.Convert = Convert;


var ExpressionType;
(function (ExpressionType) {
    ExpressionType[ExpressionType['unknow'] = 0] = 'unknow';

    ExpressionType[ExpressionType['reference'] = 1] = 'reference';

    ExpressionType[ExpressionType['number'] = 2] = 'number';

    ExpressionType[ExpressionType['string'] = 3] = 'string';

    ExpressionType[ExpressionType['boolean'] = 4] = 'boolean';

    ExpressionType[ExpressionType['error'] = 5] = 'error';

    ExpressionType[ExpressionType['array'] = 6] = 'array';

    ExpressionType[ExpressionType['function'] = 7] = 'function';

    ExpressionType[ExpressionType['name'] = 8] = 'name';

    ExpressionType[ExpressionType['operator'] = 9] = 'operator';

    ExpressionType[ExpressionType['parentheses'] = 10] = 'parentheses';

    ExpressionType[ExpressionType['missingArgument'] = 11] = 'missingArgument';

    ExpressionType[ExpressionType['expand'] = 12] = 'expand';

    ExpressionType[ExpressionType['structReference'] = 13] = 'structReference';
    ExpressionType[ExpressionType['field'] = 14] = 'field';

    ExpressionType[ExpressionType['spillReference'] = 33] = 'spillReference';

    ExpressionType[ExpressionType['letLocalName'] = 100] = 'letLocalName';
})(ExpressionType = exports.ExpressionType || (exports.ExpressionType = {}));
var Expression = (function () {
    function Expression(type) {
        this.type = type;
    }
    Expression.prototype._isCell = function () {
        return keyword_null;
    };
    Expression.prototype.offset = function (row, offset, offsetAbsolute, baseRow, baseColumn) {
        return keyword_null;
    };


    Expression.prototype.offsetWhenCopy = function (fromSource, targetSource, targetRow, targetColumn, offsetRow, offsetColumn, targetStartRow, targetStartColumn, rowCount, columnCount) {
        return keyword_null;
    };
    Expression.prototype.getRange = function (baseRow, baseColumn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return keyword_null;
    };
    return Expression;
}());
exports.Expression = Expression;
var CalcReference = (function () {
    function CalcReference(calcSource, identities) {
        var self = this;
        self._source = calcSource;
        if (identities) {
            self._identities = identities;
            self._rangeCount = identities.length;
        }
        else {
            self._rangeCount = 1;
        }
    }
    CalcReference.prototype.getRangeCount = function () {
        return this._rangeCount;
    };
    CalcReference.prototype.getSource = function () {
        return this._source;
    };
    CalcReference.prototype.create = function (identities) {
        return new CalcReference(this._source, identities);
    };
    CalcReference.prototype.toArray = function (valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank, followFormatter, ignoreBoolean) {
        var source = this._source, referenceToArray = source.referenceToArray;
        return referenceToArray && referenceToArray.call(source, this, valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank, followFormatter, ignoreBoolean);
    };
    CalcReference.prototype.getRow = function (identityIndex) {
        return this._identities ? this._identities[identityIndex || 0].row : 0;
    };
    CalcReference.prototype.getColumn = function (identityIndex) {
        return this._identities ? this._identities[identityIndex || 0].col : 0;
    };
    CalcReference.prototype.getRowCount = function (identityIndex) {
        return this._identities ? this._identities[identityIndex || 0].rowCount : this._source.getRowCount();
    };
    CalcReference.prototype.getColumnCount = function (identityIndex) {
        return this._identities ? this._identities[identityIndex || 0].colCount : this._source.getColumnCount();
    };
    CalcReference.prototype.getValue = function (offsetIdentity, identityIndex, argus) {
        var rowOffset, columnOffset;
        if (typeof offsetIdentity === const_number) {
            rowOffset = arguments[1];
            columnOffset = arguments[2];
            identityIndex = arguments[0];
        }
        else {
            offsetIdentity = offsetIdentity;
            rowOffset = offsetIdentity.row;
            columnOffset = offsetIdentity.col;
        }
        identityIndex = identityIndex || 0;
        if (rowOffset >= 0 || columnOffset >= 0) {
            var ranges = this._identities;
            if (!ranges) {
                return this._source.getValue(rowOffset, columnOffset);
            }
            else if (identityIndex < ranges.length) {
                return this._source.getValue(rowOffset + ranges[identityIndex].row, columnOffset + ranges[identityIndex].col);
            }
        }
        return CalcErrorsReference;
    };
    CalcReference.prototype.getValueByIndex = function (index) {
        var cc = this.getColumnCount(), r = Math_floor(index / cc), c = index % cc;
        return this.getValue(0, r, c);
    };
    CalcReference.prototype.isHiddenRow = function (identityIndex, rowOffset, onlyFiltered) {
        return this._source.isHiddenRow(rowOffset + this.getRow(identityIndex), onlyFiltered);
    };
    CalcReference.prototype.isSubtotal = function (identityIndex, rowOffset, columnOffset) {
        var sheetSource = this._source;
        if (identityIndex === 0 && rowOffset < sheetSource.getRowCount() && columnOffset < sheetSource.getColumnCount()) {
            var expr = sheetSource.getCalcSourceModel()._getExpressionWithRowColumn(rowOffset, columnOffset);
            return hasSubtotal(expr);
        }
        return false;
    };
    return CalcReference;
}());
exports.CalcReference = CalcReference;
var CalcSource = (function () {
    function CalcSource(service) {
        this.id = CalcSource.sourceId++;
        this._service = service;

        this._calcSourceModel = null;
    }

    CalcSource.prototype.getCalcService = function () {
        return this._service;
    };
    CalcSource.prototype._getCalcServiceInternal = function () {
        return this._service;
    };
    CalcSource.prototype.setCalcService = function (service) {
        this._service = service;
    };

    CalcSource.prototype.getCalcSourceModel = function () {
        return this._calcSourceModel;
    };
    CalcSource.prototype.setCalcSourceModel = function (model) {
        this._calcSourceModel = model;
    };

    CalcSource.prototype.getValue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return keyword_null;
    };

    CalcSource.prototype.getName = function () {
        return '';
    };

    CalcSource.prototype.getField = function (fieldName) {
        return keyword_null;
    };

    CalcSource.prototype.setValue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };

    CalcSource.prototype.getReference = function (identity) {
        return new CalcReference(this, identity && [identity]);
    };


    CalcSource.prototype.getSources = function (endSource) {
        return [this];
    };
    CalcSource.prototype.referenceToArray = function (reference, valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank, followFormatter, ignoreBoolean) {
        return reference.toArray(valueType, toOneDimension, breakOnError, breakOnConvertError, ignoreBlank, followFormatter, ignoreBoolean);
    };

    CalcSource.prototype.setFormula = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };

    CalcSource.prototype.setArrayFormula = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };

    CalcSource.prototype.getRowCount = function () {
        return 1000;
    };

    CalcSource.prototype.getColumnCount = function () {
        return 100;
    };

    CalcSource.prototype.isHiddenRow = function (row, onlyFiltered) {
        return false;
    };
    CalcSource.prototype.startCalculation = function () {
    };
    CalcSource.prototype.endCalculation = function () {
    };

    CalcSource.prototype.getCustomFunction = function (name) {
        return keyword_null;
    };

    CalcSource.prototype.getCustomName = function (name) {
        return keyword_null;
    };
    CalcSource.prototype.refresh = function () {
    };
    CalcSource.prototype.toJSON = function (jsonData, calcData) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
    };
    CalcSource.sourceId = 1;
    return CalcSource;
}());
exports.CalcSource = CalcSource;
function _createErrorExpression(err, source, endSource) {
    var expr = new Expression(5 );
    if (source) {
        expr.source = source;
    }
    if (endSource) {
        expr.endSource = endSource;
    }
    expr.value = err;
    return expr;
}
exports._createErrorExpression = _createErrorExpression;
exports._referenceErrorExpr = _createErrorExpression(CalcErrorsReference);
function _createFunctionExpression(func, args) {
    var expr = new Expression(7 );
    expr.arguments = args;
    if (func instanceof Expression) {
        expr.function = func.function;
        expr.functionName = func.functionName;
    }
    else {
        expr.function = func.name && func;
        expr.functionName = func.name || func;
    }
    return expr;
}
exports._createFunctionExpression = _createFunctionExpression;
function createExpandExpression(oldExpr, needExpendIndexs) {
    var expr = new Expression(12 );
    expr.value = oldExpr;
    expr.needExpendIndexs = needExpendIndexs;
    return expr;
}
exports.createExpandExpression = createExpandExpression;
function _createOperatorExpression(operatorType, value, value2) {
    var expr = new Expression(9 );
    expr.operatorType = operatorType;
    expr.value = value;
    expr.value2 = value2;
    return expr;
}
exports._createOperatorExpression = _createOperatorExpression;
function _createParenthesesExpression(expr) {
    var pExpr = new Expression(10 );
    pExpr.value = expr;
    return pExpr;
}
exports._createParenthesesExpression = _createParenthesesExpression;
function createStringExpression(value) {
    var expr = new Expression(3 );
    expr.value = value;
    return expr;
}
exports.createStringExpression = createStringExpression;
function createNumberExpression(value) {
    var expr = new Expression(2 );
    expr.value = value;
    return expr;
}
exports.createNumberExpression = createNumberExpression;
function createBooleanExpression(value) {
    var expr = new Expression(4 );
    expr.value = value;
    return expr;
}
exports.createBooleanExpression = createBooleanExpression;
var _Helper = (function () {
    function _Helper() {
    }
    _Helper._approxEqual = function (x, y) {
        var num = 16777216;
        var ret = x === y ? true : Math_abs(x - y) < Math_abs(x) / (num * num);
        if (!ret) {
            x = numberHelper._fixNumber(x, 15);
            y = numberHelper._fixNumber(y, 15);
            return Math_abs(x - y) < Math_abs(x) / (num * num);
        }
        return true;
    };
    _Helper.getArrayValue = function (array, i, j) {
        if (!array) {
            return CalcErrorsValue;
        }
        if (i < array.getRowCount() && j < array.getColumnCount()) {
            return array.getValue(i, j);
        }
        if (j >= array.getColumnCount() && array.getColumnCount() === 1 && i < array.getRowCount()) {
            return array.getValue(i, 0);
        }
        if (i >= array.getRowCount() && array.getColumnCount() === 1 && j < array.getColumnCount()) {
            return array.getValue(0, j);
        }
        return CalcErrorsValue;
    };
    _Helper.tryExtractToSingleValue = function (arg) {
        var success = true;
        if ((_isReference(arg)) || _isCalcArray(arg)) {
            var array = Convert._toArray(arg, 0 , false, true);
            if (array.isError) {
                arg = array[0];
            }
            else if (array.rowCount === 1 && array.colCount === 1) {
                arg = array[0][0];
            }
            else {
                arg = array;
                success = false;
            }
        }
        return {
            value: arg,
            success: success
        };
    };
    return _Helper;
}());
exports._Helper = _Helper;
function charAtFunc(stringValue, ch) {
    return stringValue.charAt(ch);
}
exports.charAtFunc = charAtFunc;
function checkString(s, i) {
    var stringLength = s.length, digitFlag = false;
    while (i < stringLength && !isNaN(+charAtFunc(s, i))) {
        i++;
        digitFlag = true;
    }
    if (i < stringLength && charAtFunc(s, i) === '.') {
        i++;
    }
    while (i < stringLength && !isNaN(+charAtFunc(s, i))) {
        i++;
        digitFlag = true;
    }
    if (i < stringLength && (charAtFunc(s, i) === 'E' || charAtFunc(s, i) === 'e')) {
        i++;
        digitFlag = false;
        if (i < stringLength && (charAtFunc(s, i) === '+' || charAtFunc(s, i) === '-')) {
            i++;
        }
        while (i < stringLength && !isNaN(+charAtFunc(s, i))) {
            i++;
            digitFlag = true;
        }
    }
    return { _digitFlag: digitFlag, _index: i };
}
function isString(value) {
    return typeof value === 'string';
}

var AcceptsHelper = (function () {
    function AcceptsHelper(args) {
        this._args = args;
    }
    AcceptsHelper.prototype._acceptsArgs = function (index) {
        var args = this._args, i;
        if (!Types._isArray(args)) {
            args = [args];
        }
        if (args[0] === -1 ) {
            return true;
        }
        for (i = 0; i < args.length; i++) {
            var argAccepts = args[i], sign = void 0, num = void 0;
            if (isString(argAccepts)) {
                var arg = argAccepts.split(' && '), ret = true;
                for (var j = 0; j < arg.length; j++) {
                    var argAccept = arg[j].split(' ');
                    sign = argAccept[0];
                    num = parseIntFunc(argAccept[1]);
                    if (sign === '!=' && index !== num ||
                        sign === '>' && index > num ||
                        sign === '>=' && index >= num ||
                        sign === '%=' && index % 2 === num) {

                    }
                    else {
                        ret = false;
                    }
                }
                if (ret) {
                    return true;
                }
            }
            else if (index === argAccepts) {
                return true;
            }
        }
        return false;
    };
    AcceptsHelper.prototype._checkArgs = function () {
        return this._args;
    };
    return AcceptsHelper;
}());
function _basicSubExpressionValidator(subExpr, index) {
    if (!subExpr || (subExpr.type === 8 && subExpr.value.indexOf('\'') >= 0)) {
        throw exports.sR().Exp_FormulaInvalid;
    }
}
exports._basicSubExpressionValidator = _basicSubExpressionValidator;
var Functions;
(function (Functions) {
    var ArrayArgumentEvaluateMode;
    (function (ArrayArgumentEvaluateMode) {
        ArrayArgumentEvaluateMode[ArrayArgumentEvaluateMode['normal'] = 0] = 'normal';

        ArrayArgumentEvaluateMode[ArrayArgumentEvaluateMode['allwaysExpand'] = 1] = 'allwaysExpand';

        ArrayArgumentEvaluateMode[ArrayArgumentEvaluateMode['neverExpand'] = 2] = 'neverExpand';
    })(ArrayArgumentEvaluateMode = Functions.ArrayArgumentEvaluateMode || (Functions.ArrayArgumentEvaluateMode = {}));


    var Function = (function () {
        function Function(name, minArgs, maxArgs, functionDescription) {
            if (minArgs === void 0) { minArgs = 0; }
            if (maxArgs === void 0) { maxArgs = 0; }
            this.name = name;
            this.minArgs = minArgs;
            this.maxArgs = maxArgs;
            var self = this;


            self._description = functionDescription;


            self.typeName = '';
        }


        Function.prototype.description = function () {
            var self = this, builtInFunctionsResource = exports.sR()._builtInFunctionsResource;
            return self._description ? self._description : (builtInFunctionsResource && builtInFunctionsResource[self.name]);
        };


        Function.prototype.acceptsArray = function (argIndex) {
            return false;
        };


        Function.prototype.acceptsReference = function (argIndex) {
            return false;
        };


        Function.prototype.acceptsError = function (argIndex) {
            return false;
        };


        Function.prototype.acceptsMissingArgument = function (argIndex) {
            return false;
        };


        Function.prototype.isVolatile = function () {
            return false;
        };


        Function.prototype.isContextSensitive = function () {
            return false;
        };


        Function.prototype.isBranch = function () {
            return false;
        };


        Function.prototype.findTestArgument = function () {
            return -1;
        };


        Function.prototype.findBranchArgument = function (test) {
            return -1;
        };
        Function.prototype.expandRows = function () {
            return true;
        };
        Function.prototype.expandColumns = function () {
            return true;
        };
        Function.prototype.skipPrecedent = function (argIndex) {
            return false;
        };
        Function.prototype.returnReference = function () {
            return false;
        };


        Function.prototype.evaluate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        Function.prototype.evaluateWithContext = function (context, args) {
            var self = this, args1 = args;
            if (self.isContextSensitive()) {
                args1 = [context].concat(args1);
            }
            return self.evaluate.apply(self, args1);
        };

        Function.prototype.toJSON = function () {
            var settings = {};
            for (var p in this) {
                if (this.hasOwnProperty(p)) {
                    settings[p] = this[p];
                }
            }
            return settings;
        };

        Function.prototype.fromJSON = function (settings) {
            if (!settings) {
                return;
            }
            for (var p in settings) {
                if (settings[p] !== keyword_undefined) {
                    this[p] = settings[p];
                }
            }
        };
        Function.prototype._argsValidator = function (minArgs, maxArgs, argsCount) {
            if (argsCount < minArgs || argsCount > maxArgs) {
                throw exports.sR().Exp_FormulaInvalid;
            }
        };
        Function.prototype._subExpressionValidator = function (subExpr, index) {
            _basicSubExpressionValidator(subExpr, index);
        };
        Function._create = function (name, fnEvaluate, options) {
            var fn = new Function(name, 0, 255);
            if (fnEvaluate && typeof fnEvaluate === 'function') {
                fn.evaluate = fnEvaluate;
            }
            if (options) {
                for (var prop in options) {
                    if (options.hasOwnProperty(prop) && prop !== 'override') {
                        fn[prop] = options[prop];
                    }
                }
            }
            return fn;
        };
        return Function;
    }());
    Functions.Function = Function;
    var AsyncFunction = (function (_super) {
        __extends(AsyncFunction, _super);


        function AsyncFunction(name, minArgs, maxArgs, description) {
            return _super.call(this, name, minArgs, maxArgs, description) || this;
        }
        AsyncFunction.prototype.isContextSensitive = function () {
            return true;
        };
        AsyncFunction.prototype.evaluate = function (context, args) {
            return this.evaluateAsync.apply(this, arguments);
        };


        AsyncFunction.prototype.evaluateAsync = function (context, args) {
            this.evaluate.apply(this, arguments);
        };


        AsyncFunction.prototype.defaultValue = function () {
            return 0;
        };


        AsyncFunction.prototype.evaluateMode = function () {
            return 0;
        };
        AsyncFunction.prototype.evaluateWhenArgumentsIsSame = function () {
            return true;
        };


        AsyncFunction.prototype.interval = function () {
            return 10000;
        };
        return AsyncFunction;
    }(Function));
    Functions.AsyncFunction = AsyncFunction;


    Functions.AsyncFunctionEvaluateMode = {

        onRecalculation: 0,

        calculateOnce: 1,

        onInterval: 2
    };
    Functions._builtInFunctions = {};
    Functions._customFunctions = {};


    function defineGlobalCustomFunction(name, fn) {
        fn.name = toUpperCase(fn.name);
        Functions._customFunctions[toUpperCase(name)] = fn;
        return fn;
    }
    Functions.defineGlobalCustomFunction = defineGlobalCustomFunction;


    function findGlobalFunction(name) {
        if (!name) {
            return getAllGlobalFunctions();
        }
        name = toUpperCase(name);
        var buildInFuncs = Functions._builtInFunctions, customFuncs = Functions._customFunctions;
        var builtInFunctionsMapping = exports.getMapping() && exports.getMapping().builtInFunctionsMapping;
        return buildInFuncs && (getBuiltInFunctionFromAlias(builtInFunctionsMapping, name) || buildInFuncs[name]) || customFuncs && customFuncs[name];
    }
    Functions.findGlobalFunction = findGlobalFunction;

    function findGlobalFunctions() {
        return getAllGlobalFunctions();
    }
    Functions.findGlobalFunctions = findGlobalFunctions;


    function removeGlobalFunction(name) {
        if (!name) {
            Functions._builtInFunctions = {};
            Functions._customFunctions = {};
            return;
        }
        name = toUpperCase(name);
        var buildInFuncs = Functions._builtInFunctions, customFuncs = Functions._customFunctions;
        if (buildInFuncs[name]) {
            delete buildInFuncs[name];
        }
        else if (customFuncs[name]) {
            delete customFuncs[name];
        }
    }
    Functions.removeGlobalFunction = removeGlobalFunction;

    function getAllGlobalFunctions() {
        var buildInFuncs = Functions._builtInFunctions, customFuncs = Functions._customFunctions;
        var functions = [];
        for (var name_1 in buildInFuncs) {
            functions.push(buildInFuncs[name_1]);
        }
        for (var name_2 in customFuncs) {
            functions.push(customFuncs[name_2]);
        }
        return functions;
    }

    function getBuiltInFunctionFromAlias(builtInFunctionsMapping, name) {
        var builtInFunctions = Functions._builtInFunctions;
        if (!isNullOrUndefined(builtInFunctionsMapping)) {
            for (var key in builtInFunctionsMapping) {
                if (builtInFunctionsMapping[key].alias === name) {
                    return builtInFunctions[key];
                }
            }
        }
        return keyword_undefined;
    }

    var Exp_Format = exports.sR().Exp_Format;

    var _Complex = (function () {
        function _Complex(real, imag, suffix) {
            this._real = real;
            this._imag = imag;
            this._suffix = suffix || 'i';
        }
        _Complex.prototype._getReal = function () {
            return this._real;
        };
        _Complex.prototype._getImag = function () {
            return this._imag;
        };
        _Complex.prototype._getSuffix = function () {
            return this._suffix;
        };
        _Complex.prototype._toString = function (suffix) {
            suffix = suffix || 'i';
            var self = this, real = self._real, imag = self._imag, sb = '', calc_precision = Functions.CALC_PRECISION;
            if (calc_precision) {
                real = numberHelper._fixNumber(real, calc_precision);
                imag = numberHelper._fixNumber(imag, calc_precision);
            }
            if (real !== 0 || imag === 0) {
                sb += real.toString();
            }
            if (imag === -1) {
                sb += '-';
            }
            else if (real !== 0 && imag > 0) {
                sb += '+';
            }
            if (imag !== -1 && imag !== 0 && imag !== 1) {
                sb += imag.toString();
            }
            if (imag !== 0) {
                sb += suffix;
            }
            return sb;
        };
        return _Complex;
    }());
    Functions._Complex = _Complex;
    function _convertToComplex(value) {
        function parseComplex(s) {
            var real = 0, imag = 0, imagSuffix = false, realDigit, imagDigit, suffix;
            var realLen = 0, imagLen = 0, i = 0, stringLength = s.length;
            if (!s) {
                throw exports.sR().Exp_ArgumentNull;
            }
            if (stringLength === 0) {
                throw Exp_Format;
            }
            if (i < stringLength && (charAtFunc(s, i) === '+' || charAtFunc(s, i) === '-')) {
                i++;
            }
            var retValue = checkString(s, i);
            i = retValue._index;
            realDigit = retValue._digitFlag;
            if (i < stringLength && (charAtFunc(s, i) === '+' || charAtFunc(s, i) === '-')) {
                realLen = i;
                i++;
                retValue = checkString(s, i);
                i = retValue._index;
                imagDigit = retValue._digitFlag;
                if (i < stringLength && (charAtFunc(s, i) === 'i' || charAtFunc(s, i) === 'j')) {
                    suffix = charAtFunc(s, i);
                    i++;
                    imagSuffix = true;
                }
                imagLen = i - realLen;
            }
            else if (i < stringLength && (charAtFunc(s, i) === 'i' || charAtFunc(s, i) === 'j')) {
                suffix = charAtFunc(s, i);
                i++;
                imagLen = i;
                imagDigit = realDigit;
                imagSuffix = true;
                realDigit = false;
            }
            else {
                realLen = i;
            }
            if (i < stringLength) {
                throw Exp_Format;
            }
            if (realLen > 0) {
                if (realDigit) {
                    real = parseInt(s.substr(0, realLen), 10);
                }
                else {
                    throw Exp_Format;
                }
            }
            if (imagLen > 0) {
                if (!imagSuffix) {
                    throw Exp_Format;
                }
                if (imagLen === 1 || imagLen === 2 && charAtFunc(s, realLen) === '+') {
                    imag = 1;
                }
                else if (imagLen === 2 && charAtFunc(s, realLen) === '-') {
                    imag = -1;
                }
                else if (imagDigit) {
                    imag = parseInt(s.substr(realLen, imagLen - 1), 10);
                }
                else {
                    throw Exp_Format;
                }
            }
            return new _Complex(real, imag, suffix);
        }
        try {
            if (!value) {
                return new _Complex(0, 0);
            }
            if (typeof value === 'number') {
                return new _Complex(value, 0);
            }
            if (typeof value === 'string') {
                return parseComplex(value);
            }
            return null;
        }
        catch (err) {
            return null;
        }
    }
    Functions._convertToComplex = _convertToComplex;


    var CalcConvert_tryToDouble = Convert._tryToDouble, CalcConvert_toInt = Convert._toInt, CalcConvert_toDouble = Convert._toDouble, CalcConvert_isNumber = Convert._isNumber, CalcConvert_toArray = Convert._toArray, CalcConvert_toResult = Convert._toResult;
    var CalcConvert_isError = Convert._isError;
    var approxEqual = _Helper._approxEqual;


    function defineFunction(name, fnEvaluate, options) {
        if (isNullOrUndefined(name)) {
            throw exports.sR().Exp_InvalidFunctionName;
        }
        name = name.toUpperCase();
        if (Functions._builtInFunctions[name]) {
            throw exports.sR().Exp_InvalidOverrideFunction;
        }
        var fn = Functions._builtInFunctions[name];
        if (!fn) {
            Functions._builtInFunctions[name] = fn = new Function(name, 0, 255);
        }
        else if (!options || !options.override) {
            throw exports.sR().Exp_OverrideNotAllowed;
        }
        if (fnEvaluate && typeof fnEvaluate === 'function') {
            fn.evaluate = fnEvaluate;
        }
        if (typeof options.argsValidator === 'function') {
            var originValidator_1 = fn._argsValidator;
            fn._argsValidator = function (minArgs, maxArgs, count) {
                originValidator_1(minArgs, maxArgs, count);
                options.argsValidator(minArgs, maxArgs, count);
            };
        }
        if (typeof options.subExpressionValidator === 'function') {
            var originValidator_2 = fn._subExpressionValidator;
            fn._subExpressionValidator = function (subExpr, index) {
                originValidator_2(subExpr, index);
                options.subExpressionValidator(subExpr, index);
            };
        }
        Types._each(options, function (prop, value) {
            var acceptHelper;
            if (inArray(prop, ['acceptsReference', 'acceptsArray', 'acceptsError', 'acceptsMissingArgument',
                'skipPrecedent']) >= 0) {
                acceptHelper = new AcceptsHelper(value);
                fn[prop] = function (index) {
                    return acceptHelper._acceptsArgs(index);
                };
            }
            else if (inArray(prop, ['isVolatile', 'isBranch', 'findTestArgument', 'returnReference', 'isContextSensitive', 'expandColumns', 'expandRows']) >= 0) {
                acceptHelper = new AcceptsHelper(value);
                fn[prop] = function () {
                    return acceptHelper._checkArgs();
                };
            }
            else if (options.hasOwnProperty(prop)) {
                fn[prop] = value;
            }
        });
        return fn;
    }
    function _defineBuiltInFunction(name, fnEvaluate, minArgs, maxArgs, argsLimit, acceptsReference, acceptsArray, options, isDynamicArrayFunction) {
        if (!options) {
            options = {};
        }
        if (minArgs !== keyword_undefined) {
            options.minArgs = minArgs;
        }
        if (maxArgs !== keyword_undefined) {
            options.maxArgs = maxArgs;
        }
        if (acceptsReference !== keyword_undefined) {
            options.acceptsReference = acceptsReference;
        }
        if (acceptsArray !== keyword_undefined) {
            options.acceptsArray = acceptsArray;
        }
        if (argsLimit !== keyword_undefined) {
            options._argsLimit = argsLimit;
        }

        if (options._acceptsMissingArgument !== keyword_undefined) {
            options.acceptsMissingArgument = options._acceptsMissingArgument;
        }
        if (options._isVolatile !== keyword_undefined) {
            options.isVolatile = options._isVolatile;
        }
        if (options._isContextSensitive !== keyword_undefined) {
            options.isContextSensitive = options._isContextSensitive;
        }
        if (options._skipPrecedent !== keyword_undefined) {
            options.skipPrecedent = options._skipPrecedent;
        }
        if (options._arrayArgumentEvaluateMode !== keyword_undefined) {
            options.arrayArgumentEvaluateMode = options._arrayArgumentEvaluateMode;
        }
        if (options._acceptsError !== keyword_undefined) {
            options.acceptsError = options._acceptsError;
        }
        if (isDynamicArrayFunction !== keyword_undefined) {
            options.isDynamicArrayFunction = isDynamicArrayFunction;
        }
        return defineFunction(name, fnEvaluate, options);
    }
    Functions._defineBuiltInFunction = _defineBuiltInFunction;
    Functions._MAX_DOUBLE_VALUE = 1.79769e+308;
    function _isBoolean(value) {
        return typeof value === 'boolean';
    }
    Functions._isBoolean = _isBoolean;
    Functions._isString = isString;
    function _isNumber(value) {
        return typeof value === 'number';
    }
    Functions._isNumber = _isNumber;
    function _isLeapYear(year) {
        return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0 || year === 1900;
    }
    Functions._isLeapYear = _isLeapYear;
    var isLeapYear = _isLeapYear;
    function _annualYearBasis(date, basis) {
        switch (basis) {
            case 0:
            case 2:
            case 4:
                return 360;
            case 1:
                return isLeapYear(date.getFullYear()) ? 366 : 365;
            case 3:
                return 365;
            default:
                return -1;
        }
    }
    Functions._annualYearBasis = _annualYearBasis;
    function _compareDateTime(date1, date2) {
        return date1 - date2;
    }
    Functions._compareDateTime = _compareDateTime;
    function _getDaysInMonth(year, month) {
        if (inArray(month, [0, 2, 4, 6, 7, 9, 11]) >= 0) {
            return 31;
        }
        if (inArray(month, [3, 5, 8, 10]) >= 0) {
            return 30;
        }
        if (month === 1) {
            return isLeapYear(year) ? 29 : 28;
        }
    }
    Functions._getDaysInMonth = _getDaysInMonth;
    var getDaysInMonth = _getDaysInMonth;
    function getDaysBetweenBASIS(isMSRB, isSymOrEp, from, to) {
        var y1 = from.getFullYear(), m1 = from.getMonth(), d1 = from.getDate(), y2 = to.getFullYear(), m2 = to.getMonth(), d2 = to.getDate();
        if (isMSRB) {
            var isFromDate2Month = m1 === 2 && getDaysInMonth(y1, m1) === d1, isToDate2Month = m2 === 2 && getDaysInMonth(y2, m2) === d2;
            if (isSymOrEp) {
                if (isFromDate2Month) {
                    d1 = 30;
                }
                if (isToDate2Month) {
                    d2 = 30;
                }
            }
            else if (isFromDate2Month && isToDate2Month) {
                d1 = 30;
                d2 = 30;
            }
            if (d2 === 31 && d1 >= 30) {
                d2 = 30;
            }
        }
        else if (d2 === 31) {
            d2 = 1;
            isSymOrEp && m2++;
        }
        if (d1 === 31) {
            d1 = 30;
        }
        return (y2 - y1) * 360 + (m2 - m1) * 30 + d2 - d1;
    }
    function _daysBetweenBasis(from, to, basis) {
        var sign = 1, retValue;
        if (_compareDateTime(from, to) > 0) {
            var swap = from;
            from = to;
            to = swap;
            sign = -1;
        }
        if (inArray(basis, [1, 2, 3]) >= 0) {
            retValue = sign * CalcConvert_toInt(dateTimeHelper_toOADate(to) - dateTimeHelper_toOADate(from));
        }
        else if (inArray(basis, [4, 5]) >= 0) {
            retValue = sign * getDaysBetweenBASIS(false, basis === 5, from, to);
        }
        else {
            retValue = sign * getDaysBetweenBASIS(true, basis === 6, from, to);
        }
        return retValue;
    }
    Functions._daysBetweenBasis = _daysBetweenBasis;
    function _st_normsdist(z) {
        var w, x, y;
        if (z === 0.0) {
            x = 0.0;
        }
        else {
            y = 0.5 * Math_abs(z);
            if (y >= (6.0 * 0.5)) {
                x = 1.0;
            }
            else if (y < 1.0) {
                w = y * y;
                x = ((((((((0.000124818987 * w - 0.001075204047) * w + 0.005198775019) * w - 0.019198292004) * w + 0.059054035642) * w - 0.151968751364) * w + 0.319152932694) * w - 0.531923007300) * w + 0.797884560593) * y * 2.0;
            }
            else {
                y -= 2.0;
                x = (((((((((((((-0.000045255659 * y + 0.000152529290) * y - 0.000019538132) * y - 0.000676904986) * y + 0.001390604284) * y - 0.000794620820) * y - 0.002034254874) * y + 0.006549791214) * y - 0.010557625006) * y + 0.011630447319) * y - 0.009279453341) * y + 0.005353579108) * y - 0.002141268741) * y + 0.000535310849) * y + 0.999936657524;
            }
        }
        return z > 0.0 ? (x + 1.0) * 0.5 : (1.0 - x) * 0.5;
    }
    Functions._st_normsdist = _st_normsdist;

    function _st_includeSubtotals(args, subtotalType, number, isDevVarFormula, data) {
        var includeHiddenRow = number < 100;
        var isCountFormula = number === 2 || number === 102 ;
        var isCountOrCountaFormula = isCountFormula || number === 3 || number === 103 ;
        var isMinFormula = number === 5 || number === 105 ;
        var isMinOrMaxFormula = number === 4 || number === 104 || isMinFormula;
        var isSumformula = number === 9 || number === 109 ;
        var isDevVarOrAverageOrSumFormula = number === 1 || number === 101 || isSumformula || isDevVarFormula;
        var isProductFormula = number === 6 || number === 106 ;
        var retValue = isProductFormula ? 1 : 0, anyValue = false, n = 0, i, range, rangeRef, refRow, refCol, row, col, rowRef, val;
        for (i = 0; i < arrayHelper_getLength(args); i++) {
            var obj = args[i], array = void 0;

            if (isCountOrCountaFormula) {
                array = CalcConvert_toArray(obj, 0 , false, false, false, isCountFormula);
            }
            else {
                var valueType = 1 ;

                if (!exports.ExcelCompatibleCalcMode || (_isCalcArray(obj) || _isReference(obj))) {
                    valueType = 5;
                }
                array = CalcConvert_toArray(obj, valueType, false, false, false, true);
            }
            if (array.isError) {
                return array[0];
            }
            if (array.isConvertError) {
                return CalcErrorsValue;
            }
            var rangeCount = array.rangeCount, isReference = array.isReference;
            for (range = 0; range < rangeCount; range++) {
                rangeRef = rangeCount > 1 ? array[range] : array;
                if (isReference) {
                    refRow = obj.getRow(range);
                    refCol = obj.getColumn(range);
                }
                for (row = 0; row < arrayHelper_getLength(rangeRef); row++) {
                    if (subtotalType !== 2 && isReference && obj.isHiddenRow(range, row, includeHiddenRow)) {
                        continue;
                    }
                    rowRef = rangeRef[row];
                    for (col = 0; col < arrayHelper_getLength(rowRef); col++) {
                        if (subtotalType === 1 || subtotalType === 2 || !isReference || !obj.isSubtotal(range, row + refRow, col + refCol)) {
                            val = rowRef[col];
                            if (val !== null && val !== CalcConvertedError) {
                                if (val && val._error && !isCountOrCountaFormula) {
                                    if (data) {
                                        data.sumx = 0;
                                        data.sumx2 = 0;
                                        data.n = 0;
                                    }
                                    return val;
                                }
                                if (isCountOrCountaFormula && !isNullOrUndefined(val) && (!isCountFormula || val !== '' && Convert._isNumber(val, true))) {
                                    retValue++;
                                }
                                else if (isMinOrMaxFormula && (!anyValue || isMinFormula && val < retValue || !isMinFormula && val > retValue)) {
                                    retValue = val;
                                }
                                else if (isDevVarOrAverageOrSumFormula) {
                                    if (isDevVarFormula) {
                                        data.sumx += val;
                                        data.sumx2 += val * val;
                                        data.n++;
                                        data.values.push(val);
                                        if (data.values[0] !== val) {
                                            data.allSame = false;
                                        }
                                    }
                                    else {
                                        retValue += val;
                                        n++;
                                    }
                                }
                                else if (isProductFormula) {
                                    retValue *= val;
                                    n++;
                                }
                                anyValue = true;
                            }
                        }
                    }
                }
            }
        }
        if (isDevVarOrAverageOrSumFormula) {
            if (isSumformula) {
                return retValue;
            }
            if (!isDevVarFormula) {
                return n === 0 ? CalcErrorsDivideByZero : CalcConvert_toResult(retValue / n);
            }
        }
        else if (isProductFormula) {
            return CalcConvert_toResult(n > 0 ? retValue : 0.0);
        }
        else {
            return retValue;
        }
    }
    Functions._st_includeSubtotals = _st_includeSubtotals;

    function _st_devVarIncludeSubtotals(args, subtotalType, number) {
        var temp = number % 100;
        var isStdevFormula = temp === 7 || temp === 8 ;
        var num = temp === 7 || temp === 10 ? 1 : 0;
        var data = { sumx: 0.0, sumx2: 0.0, n: 0.0, values: [], allSame: false }, result;
        result = _st_includeSubtotals(args, subtotalType, number, true, data);
        if (result && result._error) {
            return result;
        }
        if (data.n <= num) {
            return CalcErrorsDivideByZero;
        }
        if (data.allSame) {
            result = 0;
        }
        else if (approxEqual(data.n * data.sumx2, data.sumx * data.sumx)) {
            result = 0;
            var average = data.sumx / data.n;
            for (var i = 0; i < data.n; i++) {
                result += Math_pow(data.values[i] - average, 2);
            }
        }
        else {
            result = data.sumx2 - data.sumx * data.sumx / data.n;
        }
        result = result / (data.n - num);
        return isStdevFormula ? CalcConvert_toResult(Math.sqrt(result)) : CalcConvert_toResult(result);
    }
    Functions._st_devVarIncludeSubtotals = _st_devVarIncludeSubtotals;
    function _st_includeAggregate(args, option, number, context) {
        if (number === null) {
            return CalcErrorsValue;
        }
        number = parseInt(number, 10);
        if (number <= 0 || number > 19) {
            return CalcErrorsValue;
        }
        if (!option) {
            option = 0;
        }
        var ignoreHiddenRow = option === 1 || option === 3 || option === 5 || option === 7;
        var ignoreNestSubtotalAggregate = option === 1 || option === 2 || option === 3 || option === 0;
        var ignoreError = option === 2 || option === 3 || option === 6 || option === 7;
        var isCountFormula = number === 2 ;
        var isCountOrCountaFormula = isCountFormula || number === 3 ;
        var isMedian = number === 12;
        var isModeSngl = number === 13;
        var isLarge = number === 14;
        var isSmall = number === 15;
        var isPercentileInc = number === 16;
        var isQuartileInc = number === 17;
        var isPercentileExc = number === 18;
        var isQuartileExc = number === 19;
        var isDoubleParam = isLarge || isSmall || isPercentileInc || isQuartileInc || isPercentileExc || isQuartileExc;
        var retValue = [];
        function _getArgsArray(obj) {
            var result = [];
            var array, range, rangeRef, refRow, refCol, row, col, rowRef, val;
            if (isCountOrCountaFormula) {
                array = CalcConvert_toArray(obj, 0, false, false, false, false);
            }
            else {
                array = CalcConvert_toArray(obj, 5, false, false, false, false);
            }
            if (array.isConvertError) {
                return CalcErrorsValue;
            }
            var rangeCount = array.rangeCount, isReference = array.isReference;
            for (range = 0; range < rangeCount; range++) {
                rangeRef = rangeCount > 1 ? array[range] : array;
                if (isReference) {
                    refRow = obj.getRow(range);
                    refCol = obj.getColumn(range);
                }
                for (row = 0; row < arrayHelper_getLength(rangeRef); row++) {
                    if (isReference && obj.isHiddenRow(range, row, false) && ignoreHiddenRow) {
                        continue;
                    }
                    rowRef = rangeRef[row];
                    for (col = 0; col < arrayHelper_getLength(rowRef); col++) {
                        if (isReference && ignoreNestSubtotalAggregate && obj.isSubtotal(range, row + refRow, col + refCol)) {
                            continue;
                        }
                        val = rowRef[col];
                        if (val === null || (ignoreError && CalcConvert_isError(val))) {
                            continue;
                        }
                        if (CalcConvert_isError(val) && isCountFormula) {
                            continue;
                        }
                        if (!ignoreError && CalcConvert_isError(val) && number !== 3 ) {
                            return val;
                        }
                        if (typeof val === 'object' && Object.keys(val).length === 0) {
                            continue;
                        }
                        result.push(val);
                    }
                }
            }
            return result;
        }
        function _getKFromReference(reference) {
            var row = reference.getRow(0), col = reference.getColumn(0);
            var rowCount = reference.getRowCount(0), colCount = reference.getColumnCount(0);
            var value;
            if (rowCount === 1 && colCount === 1) {
                value = reference.getValue(0, 0, 0);
            }
            else if (rowCount !== 1 && colCount === 1 && row <= context.row && context.row < row + rowCount) {
                value = reference.getValue(0, context.row - row, 0);
            }
            else if (rowCount === 1 && colCount !== 1 && col <= context.column && context.column < col + colCount) {
                value = reference.getValue(0, 0, context.column - col);
            }
            else {
                return CalcErrorsValue;
            }
            if (value === keyword_null || value === '') {
                return CalcErrorsNumber;
            }
            else if (!isNaN(parseInt(value, 10))) {
                return parseFloat(value);
            }
            return CalcErrorsValue;
        }
        var argsLength = arrayHelper_getLength(args);
        if (isDoubleParam) {
            if (argsLength !== 2) {
                return CalcErrorsValue;
            }
            retValue = _getArgsArray(args[0]);
            if (retValue._error) {
                return retValue;
            }
            var k = void 0;
            if (args[1] === keyword_null) {
                return CalcErrorsNumber;
            }
            else if (args[1] instanceof CalcReference) {
                k = _getKFromReference(args[1]);
            }
            else if (args[1] instanceof CalcArray) {
                k = args[1].array[0][0];
            }
            else if (!isNaN(parseInt(args[1], 10))) {
                k = CalcConvert_toDouble(args[1]);
            }
            else {
                return CalcErrorsValue;
            }
            if (k._error) {
                return k;
            }
            if (number === 17 || number === 19) {
                k = CalcConvert_toInt(k);
            }
            return _st_includeAggregateMulti([retValue, k], number);
        }
        else {
            for (var i = 0; i < argsLength; i++) {
                if (!(args[i] instanceof CalcReference)) {
                    return CalcErrorsValue;
                }
            }
            for (var i = 0; i < argsLength; i++) {
                var arr = _getArgsArray(args[i]);
                if (arr instanceof Array) {
                    retValue.push.apply(retValue, arr);
                }
                else {
                    return arr;
                }
            }
            if (isMedian || isModeSngl) {
                return _st_includeAggregateMulti([retValue], number);
            }
            if (number === 7 || number === 8 || number === 10 || number === 11) {
                var subtotalType = ignoreNestSubtotalAggregate ? 1 : 0 ;
                return _st_devVarIncludeSubtotals(retValue, subtotalType, number);
            }
            return _st_includeSubtotals(retValue, 1 , number );
        }
    }
    Functions._st_includeAggregate = _st_includeAggregate;
    function _determineType(character) {
        var charUniCode = character.charCodeAt(0);


        if ((charUniCode >= 0x0 && charUniCode < 0x81) || (charUniCode === 0xf8f0) || (charUniCode >= 0xff61 && charUniCode < 0xffa0) || (charUniCode >= 0xf8f1 && charUniCode < 0xf8f4)) {
            return 'singleByte';
        }
        else if (charUniCode >= 0xd800 && charUniCode <= 0xdfff) {
            return 'fourByte';
        }
        return 'doubleByte';
    }
    Functions._determineType = _determineType;
    function _reverseMultiByteArray(array) {
        var reverseArr = [];
        for (var i = 0; i < array.length; i++) {
            if (isNullOrUndefined(array[i])) {
                reverseArr[i] = array[i + 1];
                i++;
            }
            else {
                reverseArr[i] = array[i];
            }
        }
        if (reverseArr.length === array.length - 1) {
            reverseArr[reverseArr.length] = keyword_undefined;
        }
        return reverseArr;
    }
    Functions._reverseMultiByteArray = _reverseMultiByteArray;
    function _convertMultiByteTextToArray(text) {
        var offsetArr = [], t, flag = 0, i;
        var offset = 0;
        for (i = 0; i < text.length; i++) {
            t = text[i];
            var byte = _determineType(text[i]);
            if (byte === 'doubleByte' || byte === 'fourByte') {
                if (byte === 'fourByte') {
                    if (flag % 2 === 0) {
                        flag++;
                        continue;
                    }
                    else {
                        offset++;
                        flag++;
                        t = text[i - 1] + text[i];
                    }
                }
                else {
                    offset++;
                    t = text[i];
                }
            }
            var pos = flag > 0 ? (flag / 2) : 0;
            offsetArr[i - pos + offset] = t;
        }
        return _reverseMultiByteArray(offsetArr);
    }
    Functions._convertMultiByteTextToArray = _convertMultiByteTextToArray;
    function getListData(args, sort) {
        if (sort === void 0) { sort = true; }
        var list = [];
        for (var k = 0; k < arrayHelper_getLength(args); k++) {
            addArrayDataToList(args[k], list, sort);
        }
        return list;
    }
    function sortArray(list) {
        list.sort(function (x, y) {
            return x - y;
        });
    }
    function addArrayDataToList(array, list, sort) {
        if (sort === void 0) { sort = true; }
        for (var i = 0; i < arrayHelper_getLength(array); i++) {
            var x = array[i];
            if (x !== CalcConvertedError) {
                list.push(x);
            }
        }
        if (sort) {
            sortArray(list);
        }
    }
    function st_median() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var list = getListData(arguments[0]);
        var listLength = arrayHelper_getLength(list);
        if (listLength === 0) {
            return CalcErrorsNumber;
        }
        if (listLength % 2 === 0) {
            return (CalcConvert_toDouble(list[listLength / 2 - 1]) + CalcConvert_toDouble(list[listLength / 2])) / 2.0;
        }
        return list[parseIntFunc((listLength / 2).toString())];
    }
    function st_mode() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var mode = keyword_null;
        var modeCount = 0;
        var list = getListData(arguments[0], false), listLength = arrayHelper_getLength(list);
        var i, j, count;
        for (i = 0; i < listLength; i++) {
            count = 0;
            for (j = 0; j < listLength; j++) {
                if (j !== i && list[j] === list[i]) {
                    count++;
                }
            }
            if (count > modeCount) {
                modeCount = count;
                mode = list[i];
            }
        }
        return modeCount === 0 ? CalcErrorsNotAvailable : mode;
    }
    function st_large(array, k) {
        return st_large_small(true, array, k);
    }
    function st_small(array, k) {
        return st_large_small(false, array, k);
    }
    function st_large_small(isLarge, array, k) {
        var list = [];
        addArrayDataToList(array, list);
        var listLength = arrayHelper_getLength(list);
        if (k < 1 || listLength < k) {
            return CalcErrorsNumber;
        }
        if (isLarge) {
            k = Math_ceil(k);
        }
        else {
            k = Math_floor(k);
        }
        return isLarge ? list[listLength - k] : list[k - 1];
    }
    function st_percentile(array, k) {
        array = CalcConvert_toArray(array, 1 , true, true, false, true);
        k = CalcConvert_toDouble(k);
        if (array.isError) {
            return array[0];
        }
        if (array.isConvertError || isNaNFunc(k)) {
            return CalcErrorsValue;
        }
        var list = [];
        addArrayDataToList(array, list);
        if (!arrayHelper_getLength(list) || k < 0 || k > 1) {
            return CalcErrorsNumber;
        }
        var index = k * (arrayHelper_getLength(list) - 1), rem = index % 1.0;
        index = parseIntFunc(index.toString());
        return rem === 0.0 ? list[index] : CalcConvert_toDouble(list[index]) + rem * (CalcConvert_toDouble(list[index + 1]) - CalcConvert_toDouble(list[index]));
    }
    function st_quartile(array, quart) {
        var quartIndex = inArray(quart, [0, 1, 2, 3, 4]);
        return quartIndex < 0 ? CalcErrorsNumber : st_percentile(array, quartIndex * 0.25);
    }
    function st_percentileexc(list, k) {
        var listLength = arrayHelper_getLength(list);
        var calcList = [];
        for (var i = 0; i < listLength; i++) {
            if (CalcConvert_isNumber(list[i], true)) {
                calcList.push(list[i]);
            }
        }
        if (!calcList.length) {
            return CalcErrorsNumber;
        }
        var calcListLength = calcList.length;
        sortArray(calcList);
        var index = k * (calcListLength + 1) - 1;
        var rem = index % 1.0;
        if (index < 0.0 || (calcListLength - 1) < index) {
            return CalcErrorsNumber;
        }
        var tempIndex = Math_floor(index), temp = calcList[tempIndex];
        return rem === 0.0 ? temp : temp + rem * (calcList[tempIndex + 1] - temp);
    }
    function st_quartileexc(array, quart) {
        var quartIndex = inArray(quart, [1, 2, 3]);
        return quartIndex < 0 ? CalcErrorsNumber : st_percentileexc(array, (quartIndex + 1) * 0.25);
    }
    function _st_includeAggregateMulti(arg, number) {
        var isMedian = number === 12;
        var isModeSngl = number === 13;
        var isLarge = number === 14;
        var isSmall = number === 15;
        var isPercentileInc = number === 16;
        var isQuartileInc = number === 17;
        var isPercentileExc = number === 18;
        var isQuartileExc = number === 19;
        if (isMedian) {
            return st_median(arg);
        }
        else if (isModeSngl) {
            return st_mode(arg);
        }
        else if (isLarge) {
            return st_large(arg[0], arg[1]);
        }
        else if (isSmall) {
            return st_small(arg[0], arg[1]);
        }
        else if (isPercentileInc) {
            return st_percentile(arg[0], arg[1]);
        }
        else if (isQuartileInc) {
            return st_quartile(arg[0], arg[1]);
        }
        else if (isPercentileExc) {
            return st_percentileexc(arg[0], arg[1]);
        }
        else if (isQuartileExc) {
            return st_quartileexc(arg[0], arg[1]);
        }
        return CalcErrorsNull;
    }
    Functions._st_includeAggregateMulti = _st_includeAggregateMulti;
    function _fact(x) {
        var result = 1.0, i;
        for (i = x; i > 1; i--) {
            result *= i;
        }
        return result;
    }
    Functions._fact = _fact;
    function _days360(startDate, endDate, method) {
        var startDay = startDate.getDate(), endDay = endDate.getDate(), startMonth = startDate.getMonth(), endMonth = endDate.getMonth(), startYear = startDate.getFullYear(), endYear = endDate.getFullYear();
        startDay = startDay === 31 ? 30 : startDay;
        if (method) {
            endDay = endDay === 31 ? 30 : endDay;
        }
        else if (endDay === 31) {
            if (startDay < 30) {
                endDay = 1;
                endMonth++;
                if (endMonth > 12) {
                    endMonth = 1;
                    endYear++;
                }
            }
            else {
                endDay = 30;
            }
        }
        return ((endYear - startYear) * 12 + endMonth - startMonth) * 30 + endDay - startDay;
    }
    Functions._days360 = _days360;
    function yearfracImp(from, to, basis) {
        var days = _daysBetweenBasis(from, to, basis), peryear;
        if (days < 0) {
            days = -days;
            var swap = from;
            from = to;
            to = swap;
        }
        if (basis === 1) {
            var y1 = from.getFullYear(), y2 = to.getFullYear();
            var d1 = void 0, d2 = void 0, feb29s = void 0, years = void 0;
            d1 = new Date(from.valueOf());
            d1.setFullYear(d1.getFullYear() + 1);
            if (_compareDateTime(to, d1) > 0) {
                years = y2 + 1 - y1;
                d1 = new Date(y1, 0, 1);
                d2 = new Date(y2 + 1, 0, 1);
                feb29s = CalcConvert_toInt(dateTimeHelper_toOADate(d2) - dateTimeHelper_toOADate(d1)) - 365 * (y2 + 1 - y1);
            }
            else {
                years = 1;
                feb29s = ((isLeapYear(y1) && from.getMonth() < const_Mar) || (isLeapYear(y2) && (to.getMonth() * 0x100 + to.getDate() >= const_Feb * 0x100 + 29 ))) ? 1 : 0;
            }
            var d = CalcConvert_toDouble(feb29s) / CalcConvert_toDouble(years);
            peryear = 365.0 + d;
        }
        else {
            peryear = _annualYearBasis(new Date(), basis);
        }
        return days / peryear;
    }
    function _yearfrac(startDate, endDate, basis) {
        if (basis < 0 || basis > 4) {
            return CalcErrorsNumber;
        }
        return yearfracImp(startDate, endDate, basis);
    }
    Functions._yearfrac = _yearfrac;
    function compareFunc(crit, v1, v2) {
        var retValue;
        if (crit === 0) {
            retValue = v1 <= v2;
        }
        else if (crit === 1) {
            retValue = v1 >= v2;
        }
        else if (crit === 2) {
            retValue = v1 !== v2;
        }
        else if (crit === 3) {
            retValue = v1 < v2;
        }
        else if (crit === 4) {
            retValue = v1 === v2;
        }
        else if (crit === 5) {
            retValue = v1 > v2;
        }
        return retValue;
    }
    function buildCriteria(crit, criteria) {
        var critVal = -1, isCritNumber = true, doubleValue = { value: 0 }, wildcardCriteria = RegexHelper._getWildcardCriteriaFullMatch(criteria);
        var regMatchString;
        if ((crit === 4 || crit === 2 ) && wildcardCriteria) {
            var tmp = criteria.replace(/\*+/g, '*');
            if (tmp !== criteria) {
                wildcardCriteria = RegexHelper._getWildcardCriteriaFullMatch(tmp);
            }
            regMatchString = function (v1) {
                if (v1 === '') {
                    return crit === 2 ;
                }
                var reg = RegexHelper._getRegIgnoreCase(wildcardCriteria);
                reg.lastIndex = 0;
                return crit === 4 ? reg.test(v1) : !reg.test(v1);
            };
        }
        if (crit === 4 && Common_1.Common._isInstanceOf(criteria, Date)) {
            return function (value, ignoreError) {
                var doubleNum = { value: null };
                if (value && Convert._tryToDateTime(value, doubleNum)) {
                    return doubleNum.value.getTime() === criteria.getTime();
                }
                return false;
            };
        }
        function isEmptyString(str) {
            return str.toString().trim().length === 0;
        }
        if (isNullOrUndefined(criteria)) {
            critVal = 0;
        }
        else if (wildcardCriteria) {
            isCritNumber = false;
        }
        else if (!isEmptyString(criteria)
            && !isNaNFunc(parseFloat(criteria))
            && CalcConvert_tryToDouble(criteria , doubleValue)) {
            critVal = doubleValue.value;
        }
        else {
            isCritNumber = false;
        }
        return function (value, ignoreError) {
            if (criteria === '' && crit !== 4 && crit !== 2 ) {
                return false;
            }
            if (!ignoreError && value instanceof CalcError) {
                return false;
            }
            if (isNullOrUndefined(value)) {
                value = '';
            }
            var doubleNum = { value: 0 };
            if (exports.ExcelCompatibleCalcMode && isCritNumber && !CalcConvert_isNumber(value, true) && crit !== 4 && crit !== 2 ) {
                return false;
            }
            else if (isCritNumber && CalcConvert_tryToDouble(value, doubleNum)) {
                if (value === '') {
                    return crit === 2 ;
                }
                return compareFunc(crit, doubleNum.value, critVal);
            }
            else if (wildcardCriteria && CalcConvert_isNumber(value, true)) {
                return crit === 2 ;
            }
            var fixedCriteria = isNullOrUndefined(criteria) ? '' : criteria.toString().toUpperCase();
            return wildcardCriteria && regMatchString ? regMatchString(value.toString())
                : compareFunc(crit, value.toString().toUpperCase(), fixedCriteria);
        };
    }
    var criteriaCaches = {};
    var MathHelper = (function () {
        function MathHelper() {
        }
        MathHelper._approxFloor = function (x) {
            var r = Math_floor(x);
            return approxEqual(x, r + 1.0) ? r + 1.0 : r;
        };
        MathHelper._parseCriteria = function (criteria) {
            var key = criteria;
            var cache = criteriaCaches;
            if (!cache) {
                criteriaCaches = cache = {};
            }
            var result = cache[key];
            if (result) {
                return result;
            }
            if (CalcConvert_isNumber(criteria)) {
                result = cache[key] = buildCriteria(4, criteria);
                return result;
            }
            var OPERATORS_INFIX = '=><', critString = isNullOrUndefined(criteria) ? '' : criteria.toString().toUpperCase(), prevChar = '\0', i, tc;
            for (i = 0; i < 2 && i < arrayHelper_getLength(critString); i++) {
                tc = critString[i];
                if (OPERATORS_INFIX.indexOf(tc) !== -1) {
                    if (tc === '=') {
                        if (prevChar === '<') {
                            result = buildCriteria(0, critString.substring(2));
                        }
                        else if (prevChar === '>') {
                            result = buildCriteria(1, critString.substring(2));
                        }
                        else {
                            result = buildCriteria(4, prevChar === '\0' ? critString.substring(1) : criteria);
                        }
                        cache[key] = result;
                        return result;
                    }
                    else if (prevChar === '\0') {
                        prevChar = tc;
                    }
                    else if (prevChar === '<') {
                        if (tc === '>') {
                            result = buildCriteria(2, critString.substring(2));
                        }
                        else {
                            result = buildCriteria(3, critString.substring(1));
                        }
                        cache[key] = result;
                        return result;
                    }
                    else if (prevChar === '>') {
                        cache[key] = result = buildCriteria(5, critString.substring(1));
                        return result;
                    }
                }
                else if (prevChar === '<') {
                    cache[key] = result = buildCriteria(3, critString.substring(1));
                    return result;
                }
                else if (prevChar === '>') {
                    cache[key] = result = buildCriteria(5, critString.substring(1));
                    return result;
                }
                else {
                    break;
                }
            }
            cache[key] = result = buildCriteria(4, criteria);
            return result;
        };
        MathHelper._pow10 = function (n) {
            var value = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16][n];
            if (n > 308) {
                n = 308;
            }
            return isNullOrUndefined(value) ? Math_pow(10.0, parseFloat(n)) : value;
        };
        MathHelper._approxCeiling = function (x) {
            var r = Math_ceil(x);
            return approxEqual(x, r - 1.0) ? r - 1.0 : r;
        };
        MathHelper._round = function (number, digits) {
            var power = MathHelper._pow10(Math_abs(digits));


            var ceilFn = Math_ceil, floorFn = Math_floor;

            number = digits < 0 ? number / power : number * power;


            var str = number.toExponential();
            var integerCount = parseIntFunc(str.split('e')[1]) + 1;
            if (integerCount <= 15 && integerCount >= -85 ) {
                number = parseFloat(number.toFixed(15 - integerCount));
            }

            number = number < 0 ? ceilFn(number - 0.5) : floorFn(number + 0.5);
            number = digits < 0 ? number * power : number / power;
            return CalcConvert_toResult(number);
        };
        MathHelper._combin = function (n, k) {
            if (n < 0.0 || k < 0.0 || n < k) {
                return CalcErrorsNumber;
            }
            var result = 1.0;
            k = Math.min(n - k, k);
            for (var i = 1.0; i <= k; i++) {
                result *= n - i + 1.0;
                result /= i;
            }
            return CalcConvert_toResult(result);
        };
        MathHelper._powEx = function (x, y) {
            if (x < 0 && Math_abs(y) < 1) {
                var y2 = (1 / y).toPrecision(15);
                if (parseFloat(y2) === parseInt(y2, 10) && parseInt(y2, 10) % 2 !== 0) {
                    return -Math_pow(-x, y);
                }
            }
            return Math_pow(x, y);
        };
        MathHelper._pow1p = function (x, y) {
            var ret = Math_abs(x) > 0.5 ? Math_pow(1.0 + x, y) : Math_exp(y * Math_log(1.0 + x));
            if (!isFinite(ret)) {
                if (ret === Number.POSITIVE_INFINITY) {
                    ret = Functions._MAX_DOUBLE_VALUE;
                }
                else if (ret === Number.NEGATIVE_INFINITY) {
                    ret = -Functions._MAX_DOUBLE_VALUE;
                }
            }
            else if (isNaNFunc(ret)) {
                ret = 4.94066e-324;
            }
            return ret;
        };
        MathHelper._sinhCosh = function (d, isSinh) {
            return (Math_exp(d) + (isSinh ? -1 : 1) * Math_exp(-d)) / 2;
        };
        MathHelper._log = function (a, base) {
            if (isNaNFunc(a)) {
                return a;
            }
            if (isNaNFunc(base)) {
                return base;
            }
            if (base !== 1.0 && a === 1.0 || base !== 0.0 && (base !== Number.POSITIVE_INFINITY)) {
                return (Math_log(a) / Math_log(base));
            }
            return NaN;
        };
        return MathHelper;
    }());
    Functions.MathHelper = MathHelper;
})(Functions || (Functions = {}));
exports.Functions = Functions;


function _doCompare(left, right, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = true; }
    if (_isError(left)) {
        return left;
    }
    if (_isError(right)) {
        return right;
    }
    var compareResult;


    var leftBool = typeof left === const_boolean, rightBool = typeof right === const_boolean;
    if (leftBool || rightBool) {
        if (leftBool && rightBool) {
            if (left === right) {
                compareResult = 0;
            }
            else {
                compareResult = left > right ? 1 : -1;
            }
        }
        else {
            compareResult = leftBool ? 1 : -1;
        }
    }
    else {
        var leftIsString_1 = typeof left === const_string, rightIsString_1 = typeof right === const_string;
        var isString_1 = leftIsString_1 || rightIsString_1;
        var defaultValue = isString_1 ? '' : 0;
        left = (left === keyword_null || left === keyword_undefined) ? defaultValue : left;
        right = (right === keyword_null || right === keyword_undefined) ? defaultValue : right;
        var compare = function () {
            if (left === right) {
                return 0;
            }
            if (leftIsString_1 && rightIsString_1) {
                var result = void 0;
                try {
                    var culture = Common_1.Common.CultureManager.getCultureInfo();
                    if (culture.localeCompare) {
                        result = !caseSensitive ? culture.localeCompare(left.toUpperCase(), right.toUpperCase()) : culture.localeCompare(left, right);
                    }
                    else {
                        result = !caseSensitive ? left.toUpperCase().localeCompare(right.toUpperCase()) : left.localeCompare(right);
                    }
                }
                catch (_a) {
                    result = !caseSensitive ? left.toUpperCase().localeCompare(right.toUpperCase()) : left.localeCompare(right);
                }
                return result;
            }
            else if (leftIsString_1) {
                return 1;
            }
            else if (rightIsString_1) {
                return -1;
            }
            left = numberHelper._fixNumber(left, 15);
            right = numberHelper._fixNumber(right, 15);
            return left - right;
        };


        if (!isString_1) {
            var doubleLeft = { value: 0 };
            var doubleRight = { value: 0 };
            if (!_tryToDouble(left, doubleLeft) || !_tryToDouble(right, doubleRight)) {
                return CalcErrorsValue;
            }
            left = doubleLeft.value;
            right = doubleRight.value;
        }
        compareResult = compare();
    }
    return compareResult;
}
exports._doCompare = _doCompare;
var ErrorSource = (function (_super) {
    __extends(ErrorSource, _super);
    function ErrorSource(sheetName) {
        var _this = _super.call(this, keyword_null) || this;
        _this._sheetName = sheetName;
        return _this;
    }
    ErrorSource.prototype.startCalculation = function () {
    };
    ErrorSource.prototype.endCalculation = function () {
    };
    ErrorSource.prototype.getValue = function () {
        return errors.Reference;
    };
    ErrorSource.prototype.getReference = function () {
        var ref = new CalcReference(this, [_createCellIdentity(0, 0)]);
        ref.getValue = function () {
            return errors.Reference;
        };
        return ref;
    };
    ErrorSource.prototype.referenceToArray = function () {
        var result = [errors.Reference];
        result.isError = true;
        return result;
    };
    ErrorSource.prototype.getName = function () {
        return this._sheetName;
    };
    ErrorSource.prototype.setValue = function () {
    };
    return ErrorSource;
}(CalcSource));
exports.ErrorSource = ErrorSource;
function _createCellIdentity(row, col) {
    return { row: row, col: col };
}
 }),

 './src/calc.entry.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(__webpack_require__( './src/calc.common.ts'));
__export(__webpack_require__( './src/Parser.ts'));
__export(__webpack_require__( './src/evaluator.ts'));
__export(__webpack_require__( './src/calc.ts'));
__export(__webpack_require__( './src/referenceExpression.ts'));
var calc = __webpack_require__( './src/calc.ts');
Object.defineProperty(exports, 'supportRowColumnFormula', {
    set: function (value) {
        calc.supportRowColumnFormula = value;
    },
    get: function () {
        return calc.supportRowColumnFormula;
    }
});
Object.defineProperty(exports, 'approximatelyEqual', {
    set: function (value) {
        calc.approximatelyEqual = value;
    },
    get: function () {
        return calc.approximatelyEqual;
    }
});
var calcCommon = __webpack_require__( './src/calc.common.ts');
Object.defineProperty(exports, 'ExcelCompatibleCalcMode', {
    set: function (value) {
        calcCommon.ExcelCompatibleCalcMode = value;
    },
    get: function () {
        return calcCommon.ExcelCompatibleCalcMode;
    }
});
 }),

 './src/calc.ts':
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
var calc_common_1 = __webpack_require__( './src/calc.common.ts');
var referenceExpression_1 = __webpack_require__( './src/referenceExpression.ts');
var Parser_1 = __webpack_require__( './src/Parser.ts');
var evaluator_1 = __webpack_require__( './src/evaluator.ts');
var _isInstanceOf = Common_1.Common._isInstanceOf;
var addElements = Common_1.Common._addElements;
var deleteElements = Common_1.Common._deleteElements;
var stringHelper = Common_1.Common._StringHelper;
var _DateTimeHelper = Common_1.Common._DateTimeHelper;
var keyword_null = null, keyword_undefined = void 0, Math_abs = Math.abs;
var CalcErrorsName = calc_common_1.Errors.Name;
var CalcErrorsReference = calc_common_1.Errors.Reference;
var CalcErrorsValue = calc_common_1.Errors.Value;
var CalcErrorsNotAvailable = calc_common_1.Errors.NotAvailable;
var CalcErrorsCalc = calc_common_1.Errors.Calc;
var _isCalcArray = calc_common_1.Convert._isArray, _isReference = calc_common_1.Convert._isReference;
var toUpperCase = stringHelper._toUpperCase;
var Types = Common_1.Common._Types, isNullOrUndefined = Types._isNullOrUndefined;
var Math_min = Math.min;
var cellListeners = 'cellListeners', rowSliceListeners = 'rowSliceListeners', nameIDListeners = 'nameIDListeners';
var const_number = 'number';
var const_string = 'string';
var const_boolean = 'boolean';


exports.approximatelyEqual = function (oldValue, newValue, maximumChange) {
    if (oldValue === void 0) { oldValue = 0; }
    if (newValue === void 0) { newValue = 0; }
    if (oldValue === newValue || (_isInstanceOf(oldValue, calc_common_1.CalcError) && _isInstanceOf(newValue, calc_common_1.CalcError) && oldValue._code === newValue._code)) {
        return true;
    }
    var factor = 1;
    if (_isInstanceOf(oldValue, Date) && _isInstanceOf(newValue, Date)) {
        factor = 86400000;
    }
    else if (_isInstanceOf(oldValue, Date)) {
        oldValue = _DateTimeHelper._toOADate(oldValue);
    }
    else if (_isInstanceOf(newValue, Date)) {
        newValue = _DateTimeHelper._toOADate(newValue);
    }
    return Math_abs(newValue - oldValue) / factor < maximumChange;
};
function setNodeValueToZero(calc, initValue) {
    var source = calc._sourceModel && calc._sourceModel.getSource();
    if (source) {
        var r = calc.row;
        var c = calc.column;
        var oldValue = source.getValue(r, c);
        source.setValue(r, c, initValue, oldValue);
    }
}
exports.supportRowColumnFormula = false;
var BaseCalc = (function () {
    function BaseCalc(sourceModel) {
        this._listeners = [];
        this._sourceModel = sourceModel;
    }

    BaseCalc.prototype.getKey = function () {
        return '';
    };
    BaseCalc.prototype.hasListeners = function () {
        var self = this, listeners = self._listeners;
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var type = listeners_1[_i];
            var cls = this[type];
            if (cls) {
                for (var key in cls) {
                    if (cls[key]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    BaseCalc.prototype._processListener = function (type, listener, isAdd) {
        var listeners = this[type];
        var key = listener.getKey();
        if (listener._branchStackCache && listener._branchStackCache.length >= 1) {
            var stack = listener._branchStackCache;
            var top_1 = stack[stack.length - 1];
            top_1.push(this);
            key = '?' + key;
        }
        if (!listeners) {
            this._listeners.push(type);
            listeners = this[type] = {};
        }
        if (isAdd) {
            listeners[key] = listener;
        }
        else {
            delete listeners[key];
        }
    };


    BaseCalc.prototype._processDynamicListener = function (type, listener, isAdd) {
        var listeners = this[type];
        var key = listener.getKey();
        key = '!' + key;
        if (!listeners) {
            this._listeners.push(type);
            listeners = this[type] = {};
        }
        if (isAdd) {
            listeners[key] = listener;
        }
        else {
            delete listeners[key];
        }
    };
    BaseCalc.prototype._addListenersToAdjust = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var listeners = this._listeners, calc;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = this[listeners[lIndex]];
            if (cls) {
                for (var key in cls) {
                    calc = cls[key];
                    calc && calc._addToAdjust();
                }
            }
        }
    };
    BaseCalc.prototype._addListenersToDirty = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var listeners = this._listeners, calc;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = this[listeners[lIndex]];
            if (cls) {
                for (var key in cls) {
                    calc = cls[key];
                    if (calc && !calc._preDirty && !calc._nextDirty) {
                        calc._addToDirty();
                    }
                }
            }
        }
    };
    BaseCalc.prototype._adjustDelayOfListeners = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isIncrement = args[0];
        var listeners = this._listeners, increment = isIncrement ? 1 : -1;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = this[listeners[lIndex]];
            if (cls) {
                for (var key in cls) {
                    var calc = cls[key];
                    if (key[0] === '?') {
                        if (!isIncrement && this._branchListenersDelay) {
                            while (this._branchListenersDelay.indexOf(calc) >= 0) {
                                this._branchListenersDelay.splice(this._branchListenersDelay.indexOf(calc), 1);
                                calc.delay--;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                    else if (calc) {
                        calc.delay += increment;
                        if (isIncrement && calc._setAsyncFunctionNodeNeedRecalculate) {
                            calc._setAsyncFunctionNodeNeedRecalculate();
                        }
                    }
                }
            }
        }
        var arrayInfo = this.node && this.node._arrayInfo;
        if (arrayInfo && arrayInfo.isDynamicArray) {
            for (var i = 0; i < arrayInfo.rowCount; i++) {
                for (var j = 0; j < arrayInfo.colCount; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    var node = this._sourceModel.getNode(i + arrayInfo.row, j + arrayInfo.col);
                    node && node.calc && node.calc._adjustDelayOfListeners(isIncrement);
                }
            }
        }
    };
    BaseCalc.prototype._addToAdjust = function () {
    };
    BaseCalc.prototype._addToDirty = function () {
    };
    BaseCalc.prototype._stopListening = function () {
    };
    BaseCalc.prototype._startListening = function () {
    };
    BaseCalc.prototype._getCalcService = function () {
        return this._sourceModel._getCalcServiceInternal();
    };
    return BaseCalc;
}());
exports.BaseCalc = BaseCalc;

var NameIDCalc = (function (_super) {
    __extends(NameIDCalc, _super);
    function NameIDCalc(sourceModel, name) {
        var _this = _super.call(this, sourceModel) || this;
        _this.name = name;
        _this.delay = 0;
        return _this;
    }
    NameIDCalc.prototype.getKey = function () {
        var self = this;
        var sourceModel = self._sourceModel;
        var sourceName = sourceModel === null ? '' : sourceModel._source.id + ',';
        return sourceName + self.name;
    };
    NameIDCalc.prototype._startListening = function () {
        var self = this;
        self._sourceModel._dealWithNameIDExpression(self.name, true);
    };
    NameIDCalc.prototype._stopListening = function () {
        var self = this;
        self._sourceModel._dealWithNameIDExpression(self.name, false);
    };
    NameIDCalc.prototype._addToAdjust = function () {
        this._getCalcService().onAddAdjust(this, 3 );
    };
    NameIDCalc.prototype._addToDirty = function () {
        this._getCalcService()._addDirty(this, 3 );
    };
    return NameIDCalc;
}(BaseCalc));
exports.NameIDCalc = NameIDCalc;


var PathCalc = (function (_super) {
    __extends(PathCalc, _super);
    function PathCalc(sourceModel, id, name) {
        var _this = _super.call(this, sourceModel) || this;
        _this.id = id;
        _this.name = name;


        _this.delay = 0;
        return _this;
    }
    PathCalc.prototype.getKey = function () {
        var self = this;
        return self._sourceModel.getName() + ',' + self.id + '#' + self.name;
    };
    PathCalc.prototype._startListening = function () {
        var self = this;

        self._sourceModel._dealWithExpression(self.id, self.name, true);
    };
    PathCalc.prototype._stopListening = function () {
        var self = this;

        self._sourceModel._dealWithExpression(self.id, self.name, false);
    };
    PathCalc.prototype._getCalcService = function () {
        return this._sourceModel._service;
    };
    PathCalc.prototype._addToAdjust = function () {
        this._getCalcService().onAddAdjust(this, 6 );
    };
    PathCalc.prototype._addToDirty = function () {
        this._getCalcService()._addDirty(this, 6 );
    };
    return PathCalc;
}(BaseCalc));
exports.PathCalc = PathCalc;
var CalcService = (function () {
    function CalcService() {
        this.autoCalculation = true;
        this._sourceModels = {};
        this.useR1C1 = false;
        this.allowDynamicArray = false;
        this.iterativeCalculation = true;
        this.iterativeCalculationMaximumIterations = 1000;
        this.iterativeCalculationMaximumChange = 0.01;
        this._suspended = 0;
        this._adjustSuspended = 0;
        this._resolvers = [];
        var self = this;
        self._parser = new Parser_1.Parser();
        self._evaluator = new evaluator_1.Evaluator(self);
        self._operatorAdjustor = self._setOperatorAdjustor && self._setOperatorAdjustor();
        self.addResolver(new Parser_1.DefaultTokenResolver());
    }
    CalcService.prototype.getResolvers = function () {
        return this._resolvers;
    };
    CalcService.prototype.addResolver = function (resolve) {
        var resolves = this._resolvers;


        for (var i = 0;; i++) {
            if (!resolves[i] || resolve.priority > resolves[i].priority) {
                resolves.splice(i, 0, resolve);
                break;
            }
        }
    };
    CalcService.prototype.dispose = function () {
        var self = this;
        self._sourceModels = {};
        self._globalSourceModel = keyword_null;
    };
    CalcService.prototype.cloneFrom = function (oldService) {
        var self = this;
        self.useR1C1 = oldService.useR1C1;
        self._suspended = oldService._suspended;
        self._ignoreDirty = oldService._ignoreDirty;
        self.calcOnDemand = oldService.calcOnDemand;
    };
    CalcService.prototype._getOperatorAdjustor = function () {
        return this._operatorAdjustor;
    };
    CalcService.prototype.getExternalSource = function (bookName, sheetName) {
        var service = this;
        var models = service.getAllSourceModels();
        for (var i = 0, count = models.length; i < count; i++) {
            if (stringHelper._compareStringIgnoreCase(models[i].getSource().getName(), sheetName)) {
                return models[i].getSource();
            }
        }
        return keyword_null;
    };

    CalcService.prototype.getSourceModel = function (source) {
        var model = this._sourceModels[source.id];
        if (!model) {
            if (source.createSourceModel) {
                model = source.createSourceModel(this);
            }
            else {
                model = this.createSourceModel(this, source);
            }
            this._sourceModels[source.id] = model;
            source.setCalcSourceModel(model);
            source.setCalcService(this);
        }
        return model;
    };
    CalcService.prototype.getGlobalSourceModel = function (source) {
        if (!this._globalSourceModel) {
            source = source || new calc_common_1.CalcSource();
            if (source.createSourceModel) {
                this._globalSourceModel = source.createSourceModel(this);
            }
            else {
                this._globalSourceModel = this.createSourceModel(this, source);
            }
            source.setCalcSourceModel(this._globalSourceModel);
        }
        return this._globalSourceModel;
    };
    CalcService.prototype.setSourceModel = function (source, model) {
        this._sourceModels[source.id] = model;
        model.setCalcService(this);
    };
    CalcService.prototype.getAllSourceModels = function () {
        var result = [], models = this._sourceModels;
        for (var modelName in models) {
            result.push(models[modelName]);
        }
        return result;
    };

    CalcService.prototype.removeSource = function (source) {
        this.suspend();
        var model = this._sourceModels[source.id];
        if (model) {
            if (source.getName() !== '') {
                this.onRemoveSource(source);
            }
            delete this._sourceModels[source.id];
        }


        this.clearDirties();

        var sourceModels = this._sourceModels, sourceModel;
        for (var sourceName in sourceModels) {
            sourceModel = sourceModels[sourceName];
            sourceModel.addDirtyNodesForCalc(true);
        }
        var parseContextSheet = this._parserContext && this._parserContext._sheet;
        var sourceSheet = source && source._sheet;
        if (parseContextSheet && sourceSheet && sourceSheet === parseContextSheet) {
            this._parserContext = null;
        }
        this.resume(false);
    };
    CalcService.prototype.clearSource = function () {
        this._sourceModels = {};
        this._parserContext = null;
        this.clearDirties();
    };
    CalcService.prototype.ignoreDirty = function () {
        return this._ignoreDirty;
    };
    CalcService.prototype.suspend = function (ignoreDirty) {
        this._suspended++;
        this._ignoreDirty = !!ignoreDirty;
    };
    CalcService.prototype.resume = function (recalcAll) {
        var self = this;
        self._suspended--;
        if (self._suspended < 0) {
            self._suspended = 0;
        }
        if (!self.IsSuspended()) {
            self._parseCache = keyword_null;
            self._ignoreDirty = false;
            self.recalculateAll(recalcAll);
        }
    };
    CalcService.prototype.suspendAdjust = function () {
        this._adjustSuspended++;
    };
    CalcService.prototype.resumeAdjust = function () {
        var self = this;
        self._adjustSuspended--;
        if (self._adjustSuspended < 0) {
            self._adjustSuspended = 0;
        }
    };
    CalcService.prototype.isAdjustSuspended = function () {
        return this._adjustSuspended > 0;
    };
    CalcService.prototype.clearDirties = function () {
        var self = this;
        var heads = self._heads;
        if (heads) {
            for (var p in heads) {
                if (heads.hasOwnProperty(p)) {
                    var node = heads[p];
                    while (node) {
                        var nextNode = node._nextDirty;
                        if (nextNode) {
                            node._dirty = false;
                            node._nextDirty = nextNode._preDirty = keyword_undefined;
                            node = nextNode;
                        }
                        else {
                            node = keyword_null;
                        }
                    }
                }
            }
        }
        self._heads = self._tails = keyword_null;
    };
    CalcService.prototype.resumeWithoutCalc = function () {
        this._suspended--;
        if (this._suspended < 0) {
            this._suspended = 0;
        }
        this.clearDirties();
        this._ignoreDirty = false;
    };
    CalcService.prototype.IsSuspended = function () {
        return this._suspended > 0;
    };

    CalcService.prototype.recalculateAll = function (dirtyAll, isAsyncEvaluate) {
        var self = this;
        if (self.IsSuspended()) {
            return;
        }
        self._recalculateAllImp(dirtyAll, isAsyncEvaluate);
    };
    CalcService.prototype._recalculateAllImp = function (dirtyAll, isAsyncEvaluate) {
        var self = this, sourceModel;
        self._timestamp = Date.now();
        if (!isAsyncEvaluate) {
            self._evaluator.startCache();
        }
        var sourceModels = self._sourceModels;
        for (var sourceName in sourceModels) {
            sourceModel = sourceModels[sourceName];
            sourceModel.getSource().startCalculation();
            sourceModel.addDirtyNodesForCalc(dirtyAll, isAsyncEvaluate);
        }
        self._recalculateImp();


        for (var sourceName in sourceModels) {
            sourceModel = sourceModels[sourceName];
            sourceModel.getSource().endCalculation();
        }
        if (!isAsyncEvaluate) {
            self._evaluator.endCache();
        }
        delete self._timestamp;
    };

    CalcService.prototype._recalculateImp = function (dirtyDependency) {
        if (dirtyDependency === void 0) { dirtyDependency = true; }


        var self = this;
        var heads = self._heads;
        if (!heads) {
            return;
        }
        var p, current;
        if (dirtyDependency) {
            var withRowColumnCalc = heads[1] || heads[2];
            for (p in heads) {
                if (heads.hasOwnProperty(p)) {
                    var type = parseInt(p);

                    if (!withRowColumnCalc || type === 1 || type === 2) {
                        current = heads[p];
                        if (current) {
                            current._sourceModel.addListenersToDirty(self, type);
                            current.processed = true;
                        }
                    }
                }
            }

            for (p in heads) {
                if (heads.hasOwnProperty(p)) {
                    current = heads[p];
                    if (current) {
                        if (!current.processed) {
                            current._sourceModel.addListenersToDirty(self, parseInt(p));
                        }
                        else {
                            delete current.processed;
                        }
                    }
                }
            }
        }
        for (p in heads) {
            if (heads.hasOwnProperty(p)) {
                heads[p]._sourceModel.initDelay(self, parseInt(p));
            }
        }
        for (p in heads) {
            if (heads.hasOwnProperty(p)) {
                heads[p]._sourceModel.adjustDelayOfListeners(self, parseInt(p), true);
            }
        }

        var progress;
        do {
            progress = false;
            for (p in heads) {
                if (heads.hasOwnProperty(p)) {
                    var b = heads[p]._sourceModel.calculateDirtyNodes(self, parseInt(p));
                    if (b) {
                        progress = true;
                    }
                }
            }
        } while (progress);

        for (p in heads) {
            if (heads.hasOwnProperty(p)) {
                heads[p]._sourceModel.calculateIterations(self, parseInt(p));
            }
        }
        self._heads = self._tails = keyword_undefined;
    };
    CalcService.prototype.initParserContext = function (source) {
        var parseContext = this._parserContext;
        if (!parseContext) {
            this._parserContext = source.getParserContext(this.useR1C1);
        }
    };
    CalcService.prototype.getParserContext = function (source) {
        var self = this;
        var parseContext = self._parserContext;
        if (!parseContext) {
            if (!source) {
                parseContext = new Parser_1.ParserContext(keyword_null, self.useR1C1);
            }
            else {
                self._parserContext = parseContext = source.getParserContext(self.useR1C1);
            }
        }
        parseContext.setSource(source);
        return parseContext;
    };
    CalcService.prototype.parseWithContext = function (parseContext, formula) {
        return this._parser.parse(parseContext, formula);
    };
    CalcService.prototype.unparseWithContext = function (parseContext, expr) {
        return this._parser.unparse(parseContext, expr);
    };
    CalcService.prototype._addDirty = function (node, type) {
        var self = this, head, tail;
        if (isNaN(type)) {
            return;
        }
        var heads = self._heads, tails = self._tails;
        if (!heads) {
            heads = self._heads = {};
            tails = self._tails = {};
        }
        head = heads[type];
        tail = tails[type];
        node._dirty = true;
        if (node && !node._preDirty && node !== head) {
            if (head) {
                tail._nextDirty = node;
            }
            else {
                heads[type] = node;
            }
            node._preDirty = tail;
            node._nextDirty = keyword_null;
            tails[type] = node;
        }
    };
    CalcService.prototype._removeDirty = function (node, type) {
        var self = this, head;
        if (isNaN(type)) {
            return;
        }
        node._dirty = false;
        var heads = self._heads, tails = self._tails;
        if (heads) {
            head = self._heads[type];
        }
        if (node && (node._preDirty || node === head)) {
            var prevDirty = node._preDirty;
            var nextDirty = node._nextDirty;
            if (prevDirty) {
                prevDirty._nextDirty = nextDirty;
            }
            else if (heads) {
                if (nextDirty) {
                    heads[type] = nextDirty;
                }
                else {
                    delete heads[type];
                }
            }
            if (nextDirty) {
                nextDirty._preDirty = prevDirty;
            }
            else if (tails) {
                if (prevDirty) {
                    tails[type] = prevDirty;
                }
                else {
                    delete tails[type];
                }
            }
            node._preDirty = keyword_null;
            node._nextDirty = keyword_null;
        }
    };
    CalcService.prototype.evaluateExpression = function (source, expr, identity) {
        var self = this;
        return self._evaluator.evaluateExpression(expr, source.getEvaluatorContext(identity, false), false);
    };
    CalcService.prototype.onClearExpr = function (source, identity) {
        this._evaluator && this._evaluator.asyncManager.clearCell(source, identity);
    };
    CalcService.prototype.parse = function (source, formula, row, col, culture, ignoreError, forceA1) {
        var self = this, parseCache = self._parseCache, parseContext = self.getParserContext(source);
        parseContext.useR1C1 = forceA1 ? false : self.useR1C1;
        parseContext.ignoreError = ignoreError;
        parseContext.row = row;
        parseContext.column = col;
        parseContext.culture = culture;
        if (parseCache) {
            var cache = parseCache[formula];
            if (cache) {
                return cache;
            }
            var expr = self._parser.parse(parseContext, formula);
            parseCache[formula] = expr;
            return expr;
        }
        return self._parser.parse(parseContext, formula);
    };
    CalcService.prototype.unparse = function (source, expr, row, col, culture, toStandard, addSheetName) {
        var parseContext = this.getParserContext(source);
        parseContext.useR1C1 = this.useR1C1;
        parseContext.row = row;
        parseContext.column = col;
        parseContext.culture = culture;
        parseContext.addSheetName = addSheetName;
        if (toStandard) {
            parseContext._toStandard = true;
            parseContext.useR1C1 = false;
        }
        var formula = this._parser.unparse(parseContext, expr);
        parseContext._toStandard = false;
        return formula;
    };
    CalcService.prototype.recalculate = function (source, row, column, isAyncEvaluate) {
        var model = this.getSourceModel(source);
        if (column === -1) {
            model._addCellsToDirty(row, 0, 1, model.cC());
        }
        else if (row === -1) {
            model._addCellsToDirty(0, column, model.rC(), 1);
        }
        else {
            model._addCellsToDirty(row, column, 1, 1);
        }
        if (!this.IsSuspended()) {
            this.recalculateAll(false, isAyncEvaluate);
        }
    };

    CalcService.prototype.recalculateByName = function (source, name) {
        if (!name) {
            return;
        }
        var model = getCalcSourceModel(this, source);
        var cellCalc = model._getNameIDCalc(toUpperCase(name), true);
        this._addDirty(cellCalc, 3 );
        if (!this.IsSuspended()) {
            this.recalculateAll(false);
        }
    };
    CalcService.prototype.recalcRange = function (source, row, column, rowCount, columnCount) {
        var model = this.getSourceModel(source);
        if (column === -1) {
            model._addCellsToDirty(row, 0, rowCount, model.cC());
        }
        else if (row === -1) {
            model._addCellsToDirty(0, column, model.rC(), columnCount);
        }
        else {
            model._addCellsToDirty(row, column, rowCount, columnCount);
        }
        if (!this.IsSuspended()) {
            this.recalculateAll(false);
        }
    };
    CalcService.prototype.evaluate = function (source, formula, row, col, needReference) {
        var self = this;
        var expr = (formula instanceof calc_common_1.Expression) ? formula : self.parse(source, formula, row, col);
        return self._evaluator.evaluateExpression(expr, source.getEvaluatorContext(_createCellIdentity(row, col), false), false, needReference, needReference);
    };
    CalcService.prototype._evaluateParsedFormula = function (source, expr, identity, isArrayFormula, convertNullToZero, rangeIdentity, spillArray, returnWhenPause) {
        var row = identity.row || 0, col = identity.col || 0, baseRow = rangeIdentity ? rangeIdentity.row : row, baseCol = rangeIdentity ? rangeIdentity.col : col;
        var evalContext = source.getEvaluatorContext(identity, isArrayFormula, rangeIdentity, expr);
        evalContext._returnWhenPause = returnWhenPause;
        var val, acceptsArrayAndReference = arguments.length === 4 && isArrayFormula || spillArray;
        if (this.allowDynamicArray && !isArrayFormula) {
            evalContext._keepArrayValues = true;
        }
        val = this._evaluator.evaluateExpression(expr, evalContext, convertNullToZero, acceptsArrayAndReference, acceptsArrayAndReference);
        if (val && val.pause) {
            return val;
        }
        if (source._testExprsNeedReset) {
            for (var i = 0; i < source._testExprsNeedReset.length; i++) {
                delete source._testExprsNeedReset[i]._testBranchEvaluated;
            }
            delete source._testExprsNeedReset;
        }
        if (isArrayFormula && arguments.length <= 5) {
            return val;
        }
        if (!isArrayFormula && spillArray && (calc_common_1.Convert._isReference(val) || calc_common_1.Convert._isArray(val))) {
            return val;
        }
        if (calc_common_1.Convert._isReference(val)) {
            var rc = val.getRowCount(0), cc = val.getColumnCount(0);
            if (val.getRangeCount() !== 1) {
                return CalcErrorsValue;
            }
            try {
                var ro = isArrayFormula ? row - baseRow : row - val.getRow(0), co = isArrayFormula ? col - baseCol : col - val.getColumn(0), id1 = _createCellIdentity(0, 0);
                if (rc === 1 && cc === 1) {
                }
                else if (rc === 1 && cc > 1 && co >= 0 && co < cc) {
                    id1.col = co;
                }
                else if (rc > 1 && cc === 1 && ro >= 0 && ro < rc) {
                    id1.row = ro;
                }
                else if (isArrayFormula && ro < rc && co < cc) {
                    id1.row = ro;
                    id1.col = co;
                }
                else if (isArrayFormula) {
                    return CalcErrorsNotAvailable;
                }
                else {
                    return CalcErrorsValue;
                }
                val = val.getValue(id1, 0);
            }
            catch (iex) {
                return CalcErrorsValue;
            }
        }
        else if (calc_common_1.Convert._isArray(val)) {
            if (!isArrayFormula) {
                val = val.getValueByIndex(0);
            }
            else {
                var arrayValue = val;
                var rc1 = arrayValue.getRowCount();
                var cc1 = arrayValue.getColumnCount();
                if (rc1 !== 1 && row - baseRow >= rc1 || cc1 !== 1 && col - baseCol >= cc1) {
                    return CalcErrorsNotAvailable;
                }
                val = val.getValue(rc1 === 1 ? 0 : row - baseRow, cc1 === 1 ? 0 : col - baseCol);
            }
        }
        if (val === keyword_undefined || val === keyword_null) {
            return convertNullToZero === false ? val : 0;
        }
        return val;
    };
    CalcService.prototype.onAddAdjust = function (node, type) {
        this._operatorAdjustor._addAdjust(node, type);
    };
    CalcService.prototype.onRemoveSource = function (source) {
        this._operatorAdjustor._adjustFormulasOnRemoveSheet(source);
    };
    CalcService.prototype.createSourceModel = function (service, source) {
        return new CalcSourceModel(service, source);
    };

    CalcService.prototype._clearCalcOnDemandDirtyInfo = function () {
        var sourceModels = this._sourceModels;
        for (var key in sourceModels) {
            var current = sourceModels[key];
            if (current instanceof CalcSourceModel) {
                var nodes = current.getAllNodes();
                nodes.forEach(function (node) {
                    var calc = node.calc;
                    if (calc) {
                        calc._dirty = false;
                        if (calc._nextDirty || calc._preDirty) {
                            calc._preDirty = calc._nextDirty = keyword_null;
                        }
                    }
                });
            }
        }
    };
    return CalcService;
}());
exports.CalcService = CalcService;
function getCalcSourceModel(calcService, source) {
    return calcService.getSourceModel(source);
}
function setSpillValues(valueInfos, sheetSource) {
    if (valueInfos) {
        for (var rowKey in valueInfos) {
            var row = +rowKey, rowItem = valueInfos[rowKey];
            if (rowItem) {
                for (var colKey in rowItem) {
                    var col = +colKey, t = rowItem[colKey];
                    if (t) {
                        sheetSource.setValue(row, col, t.value, t.oldValue, t.isAnchorCell !== true);
                    }
                }
            }
        }
    }
}
exports.setSpillValues = setSpillValues;
function getKey(row, col) {
    return [row, col].join(',');
}
function getItemByKey(array, key) {
    var _a = key.split(',').map(function (s) { return +s; }), row = _a[0], col = _a[1];
    var item = array[row];
    return item && item[col];
}
function markAnchorCellDirty(dirtyAnchors, calcModel, dynamicArrayManager) {
    if (dirtyAnchors) {
        var anchors_1 = dynamicArrayManager.anchors, dirtyCells_1 = {};
        dirtyAnchors.forEach(function (anchor) {
            var row = anchor.row, col = anchor.col;
            var key = getKey(row, col);
            calcModel._addCellsToDirty(row, col, 1, 1);
            dirtyCells_1[key] = true;

            var rowCount = anchor.rowCount, colCount = anchor.colCount;
            var c = 1;
            for (var r = 0; r < rowCount; r++) {
                for (; c < colCount; c++) {
                    var cell = dynamicArrayManager.getAnchorItem(r + row, c + col);
                    if (cell) {
                        var anchorRefs = cell.anchorRefs;
                        for (var refKey in anchorRefs) {
                            if (key !== refKey && anchorRefs[refKey]) {
                                var refAnchor = getItemByKey(anchors_1, refKey);
                                if (refAnchor && !dirtyCells_1[refKey]) {
                                    calcModel._addCellsToDirty(refAnchor.row, refAnchor.col, 1, 1);
                                    dirtyCells_1[refKey] = true;
                                }
                            }
                        }
                    }
                }
                c = 0;
            }
        });
    }
}
exports.markAnchorCellDirty = markAnchorCellDirty;
var CalcArrayHelper = (function () {
    function CalcArrayHelper() {
    }
    CalcArrayHelper.getLength = function (obj, rangeId) {
        if (_isCalcArray(obj)) {
            return obj.getRowCount() * obj.getColumnCount();
        }
        else if (_isReference(obj)) {
            rangeId = rangeId ? rangeId : 0;
            return obj.getRowCount(rangeId) * obj.getColumnCount(rangeId);
        }
    };
    ;
    CalcArrayHelper.getRowCount = function (obj, rangeId) {
        if (_isCalcArray(obj)) {
            return obj.getRowCount();
        }
        else if (_isReference(obj)) {
            rangeId = rangeId ? rangeId : 0;
            return obj.getRowCount(rangeId);
        }
    };
    ;
    CalcArrayHelper.getColumnCount = function (obj, rangeId) {
        if (_isCalcArray(obj)) {
            return obj.getColumnCount();
        }
        else if (_isReference(obj)) {
            rangeId = rangeId ? rangeId : 0;
            return obj.getColumnCount(rangeId);
        }
    };
    ;
    CalcArrayHelper.getValueByIndex = function (obj, i, rangeId) {
        if (_isCalcArray(obj)) {
            return obj.getValueByIndex(i);
        }
        else if (_isReference(obj)) {
            rangeId = rangeId ? rangeId : 0;
            var cc = obj.getColumnCount(rangeId);
            return obj.getValue(rangeId, parseInt((i / cc).toString(), 10), i % cc);
        }
    };
    ;
    CalcArrayHelper.getValue = function (obj, row, column, rangeId) {
        if (_isCalcArray(obj)) {
            return obj.getValue(row, column);
        }
        else if (_isReference(obj)) {
            rangeId = rangeId ? rangeId : 0;
            return obj.getValue(rangeId, row, column);
        }
    };
    ;
    return CalcArrayHelper;
}());
exports.CalcArrayHelper = CalcArrayHelper;
function processDynamicListener(cellCalc, source, service, row, column, returnWhenPause) {
    if (needLink(cellCalc._currentUsedDynamicCreatedRanges, cellCalc._newDetectedDynamicCreatedRanges)) {
        if (cellCalc._currentUsedDynamicCreatedRanges) {
            linkCellRanges(service, cellCalc, cellCalc._currentUsedDynamicCreatedRanges, false );
            delete cellCalc._currentUsedDynamicCreatedRanges;
        }
        if (cellCalc._newDetectedDynamicCreatedRanges) {
            cellCalc.delay = linkCellRanges(service, cellCalc, cellCalc._newDetectedDynamicCreatedRanges, true , returnWhenPause);
            cellCalc._currentUsedDynamicCreatedRanges = cellCalc._newDetectedDynamicCreatedRanges;
            delete cellCalc._newDetectedDynamicCreatedRanges;
        }
    }
}
function needLink(refA, refB) {
    if (isNullOrUndefined(refA) && isNullOrUndefined(refB)) {
        return false;
    }
    else if (isNullOrUndefined(refA) || isNullOrUndefined(refB)) {
        return true;
    }
    else {
        return Object.keys(refA).join() !== Object.keys(refB).join();
    }
}
function processListenerAndCountDirty(cellCalc, model, row, col, endRow, endColumn, processListener, isAdd, addDelay) {
    var count = 0;
    for (var r = row; r <= endRow; r++) {
        for (var c = col; c <= endColumn; c++) {
            var refCellCalc = model._getCellCalc(r, c, true);
            processListener && refCellCalc && refCellCalc._processDynamicListener(0 , cellCalc, isAdd);
            if (addDelay && refCellCalc && refCellCalc._dirty) {
                count++;
            }
        }
    }
    return count;
}
function linkCellRanges(service, cellCalc, ranges, isAdd, addDelay) {
    var delay = 0;
    for (var p in ranges) {
        if (ranges.hasOwnProperty(p)) {
            var processListener = false;
            var refRange = ranges[p];
            var sourceModel = service._sourceModels[refRange.id];
            if (!sourceModel) {
                continue;
            }
            var refStartRow = refRange.row;
            var refStartColumn = refRange.col;
            var refRowCount = refRange.rowCount;
            var refColumnCount = refRange.colCount;
            var refEndRow = refStartRow + refRowCount - 1;
            var refEndColumn = refStartColumn + refColumnCount - 1;
            if (sourceModel && shouldUseRange(refStartRow, refStartColumn, refRowCount, refColumnCount)) {
                var rangeCalc = sourceModel._getRangeCalc(true);
                rangeCalc._processCellListener(refStartRow, refStartColumn, refRowCount, refColumnCount, cellCalc, isAdd, true);
                processListener = true;
            }
            if (sourceModel && (!processListener || addDelay)) {
                delay += processListenerAndCountDirty(cellCalc, sourceModel, refStartRow, refStartColumn, refEndRow, refEndColumn, !processListener, isAdd, addDelay);
            }
        }
    }
    return delay;
}
var CalcSourceModel = (function () {
    function CalcSourceModel(service, source) {
        this._lastNonNullRow = 0;
        this._lastNonNullColumn = 0;
        this._volatitleCells = [];
        this._pivotDataCells = [];
        this._iterativeCalcCells = [];
        this.dataTable = {};
        this.dataTableByName = {};
        this._rowDataArray = [];
        this._columnDataArray = [];
        this._removedVolatileCount = 0;
        var self = this;
        self._source = source;
        self._service = service;
    }
    CalcSourceModel.prototype.getNode = function (row, col, create) {
        var self = this;
        var node = keyword_null;
        if (row >= 0 && col >= 0) {
            var dr = self.dataTable[row];
            if (create && !dr) {
                dr = self.dataTable[row] = {};
                if (row > self._lastNonNullRow) {
                    self._lastNonNullRow = row;
                }
            }
            if (dr) {
                node = dr[col];
                if (create && !node) {
                    node = dr[col] = {};
                    if (col > self._lastNonNullColumn) {
                        self._lastNonNullColumn = col;
                    }
                }
            }
        }
        else if (row === -1 && col >= 0) {
            node = self._columnDataArray[col];
            if (create && !node) {
                node = self._columnDataArray[col] = {};
                if (col > self._lastNonNullColumn) {
                    self._lastNonNullColumn = col;
                }
            }
        }
        else if (row >= 0 && col === -1) {
            node = self._rowDataArray[row];
            if (create && !node) {
                node = self._rowDataArray[row] = {};
                if (col > self._lastNonNullColumn) {
                    self._lastNonNullColumn = col;
                }
            }
        }
        else if (row === -1 && col === -1) {
            node = self._defaultDataNode;
            if (create && !node) {
                node = self._defaultDataNode = {};
            }
        }
        return node;
    };
    CalcSourceModel.prototype.getNodeByName = function (name, create) {
        var self = this;
        var node = self.dataTableByName[name];
        if (create && !node) {
            node = self.dataTableByName[name] = {};
        }
        return node;
    };
    CalcSourceModel.prototype._getExpr = function (row, col) {
        var node = this.getNode(row, col);
        return (node && node._expr);
    };
    CalcSourceModel.prototype._getWorkingExpr = function (row, col) {
        var node = this.getNode(row, col);
        return (node && node._workingExpr);
    };
    CalcSourceModel.prototype._getArrayInfo = function (row, col) {
        return this.getWorkingNodeInfo(row, col, 2 );
    };
    CalcSourceModel.prototype._getWorkingExpressionWithRowColumn = function (row, col) {
        return this.getWorkingNodeInfo(row, col, 1 );
    };
    CalcSourceModel.prototype._getExpressionWithRowColumn = function (row, col) {
        return this.getWorkingNodeInfo(row, col, 0 );
    };
    CalcSourceModel.prototype._getWorkingExpressionWithRowColumnByName = function (name) {
        var node = this.getNodeByName(name);
        return node && node._workingExpr;
    };
    CalcSourceModel.prototype._getExpressionWithRowColumnByName = function (name) {
        var node = this.getNodeByName(name);
        return node && node._expr;
    };
    CalcSourceModel.prototype.clearAll = function () {
        var self = this;
        self.clear(-1, -1, -1, -1);
        self.dataTable = {};
        self.dataTableByName = {};
        self._rowDataArray = [];
        self._columnDataArray = [];
        self._defaultDataNode = keyword_null;
    };
    CalcSourceModel.prototype.clear = function (row, column, rowCount, columnCount, changeInfo) {
        this._clear(row, column, rowCount, columnCount, changeInfo);
    };
    CalcSourceModel.prototype._stopListeningAll = function () {
        var self = this;


        stopListeningOfCollection(self._rowDataArray);

        stopListeningOfCollection(self._columnDataArray);

        stopListeningOfCollection(self.dataTable, true);

        stopListeningOfCollection(self.dataTableByName);
        self._releaseResource();
    };
    CalcSourceModel.prototype._releaseResource = function () {
        var self = this;

        self.dataTable = {};
        self.dataTableByName = {};
        self._rowDataArray = [];
        self._columnDataArray = [];
        self._defaultDataNode = keyword_null;
        self._volatitleCells = [];
        self._pivotDataCells = [];
        self._rangeCalc = keyword_null;
        self._nameCalcs = keyword_null;
    };
    CalcSourceModel.prototype.addRows = function (row, count) {
        var self = this;
        var rowCount = self.rC();
        if (row < 0 || row > rowCount || count < 0) {
            return;
        }
        addElements(self.dataTable, rowCount, row, count);
        addElements(self._rowDataArray, rowCount, row, count);
        for (var i = 0; i < count; i++) {
            if (self.dataTable[row + i]) {
                self.dataTable[row + i] = { rs: 'n' };
            }
        }
    };
    CalcSourceModel.prototype.deleteRows = function (row, count) {
        var self = this;
        var n = self.rC();
        if (row < 0 || row >= n || count <= 0) {
            return;
        }
        if (row + count > n) {
            count = n - row;
        }
        deleteElements(self.dataTable, n, row, count);
        deleteElements(self._rowDataArray, n, row, count);
    };
    CalcSourceModel.prototype.addColumns = function (col, count) {
        var self = this;
        var rowCount = self.rC(), colCount = self.cC();
        if (col < 0 || col > colCount || count < 0) {
            return;
        }
        for (var i = 0; i < rowCount; i++) {
            var tr = self.dataTable[i];
            if (tr && col < colCount) {
                addElements(tr, colCount, col, count);
            }
        }
        addElements(this._columnDataArray, colCount, col, count);
    };
    CalcSourceModel.prototype.deleteColumns = function (col, count) {
        var self = this;
        var rowCount = self.rC(), colCount = self.cC();
        if (col < 0 || col >= colCount || count < 0) {
            return;
        }
        for (var i = 0; i < rowCount; i++) {
            var tr = this.dataTable[i];
            if (tr) {
                deleteElements(tr, colCount, col, count);
            }
        }
        deleteElements(this._columnDataArray, colCount, col, count);
    };
    CalcSourceModel.prototype._getNodeInfo = function (row, col) {
        var result = [row, col];
        var node = this.getNode(row, col);
        if (node) {
            result.push(node._expr, node._workingExpr, node._arrayInfo);
        }
        return result;
    };
    CalcSourceModel.prototype._backupNodeItem = function (changeInfo, row, col) {
        if (changeInfo) {
            changeInfo.push(this._getNodeInfo(row, col));
        }
    };
    CalcSourceModel.prototype._getChangesForCalcEngine = function () {
        var source = this.getSource(), sheet = source && source.getSheet(), model = sheet && sheet._modelManager;
        return model && model._getChangesForCalcEngine();
    };
    CalcSourceModel.prototype._restoreNodeItem = function (row, col, expr, workingExpr, arrayInfo) {
        var self = this;
        if (row === -1) {
            self._setColumnExpression(col, expr, workingExpr);
        }
        else if (col === -1) {
            self._setRowExpression(row, expr, workingExpr);
        }
        else {
            self._setCellExpression(row, col, expr, workingExpr, arrayInfo);
        }
    };
    CalcSourceModel.prototype._setExpr = function (row, col, expr, changeInfo) {
        var node = this.getNode(row, col, !!expr);
        if (node) {
            if (changeInfo) {
                changeInfo.push([row, col, node._expr]);
            }
            node._expr = expr;
        }
    };
    CalcSourceModel.prototype._setNodeInfo = function (row, col, expr, workingExpr, arrayInfo, isVolatile, changeInfo) {
        var node = this.getNode(row, col, !!expr);
        if (node) {
            this._backupNodeItem(changeInfo, row, col);
            node._expr = expr;
            if (node._workingExpr || workingExpr) {
                node._workingExpr = workingExpr;
            }
            if (node._arrayInfo || arrayInfo) {
                node._arrayInfo = arrayInfo;
            }
            if (node.isVolatile && !expr) {
                this._removeVolatile(node);
            }
            else if (isVolatile || node.isVolatile) {
                node.isVolatile = isVolatile;
            }
        }
    };
    CalcSourceModel.prototype._clearAllExpr = function (row, col, changeInfo) {
        this._setNodeInfo(row, col, keyword_undefined , keyword_undefined , keyword_undefined , false , changeInfo);
    };
    CalcSourceModel.prototype._copyExpr = function (dest, row, col, desRow, desCol, changeInfo) {
        var node = this.getNode(row, col);
        if (node && node._expr) {
            dest._setNodeInfo(desRow, desCol, node._expr, node._workingExpr, node._arrayInfo, node.isVolatile, changeInfo);
        }
    };
    CalcSourceModel.prototype._containsNode = function (row, col) {
        var dr = this.dataTable[row];
        return dr && dr[col];
    };
    CalcSourceModel.prototype._setWorkingExpr = function (row, col, expr) {
        var node = this.getNode(row, col, !!expr);
        if (node) {
            node._workingExpr = expr;
        }
    };
    CalcSourceModel.prototype._setArrayInfo = function (row, col, arrayInfo) {
        var node = this.getNode(row, col, !!arrayInfo);
        if (node) {
            node._arrayInfo = arrayInfo;
        }
    };
    CalcSourceModel.prototype._getCalc = function (row, col) {
        var node = this.getNode(row, col);
        return (node && node.calc);
    };
    CalcSourceModel.prototype._setCalc = function (row, col, calc) {
        var node = this.getNode(row, col, true);
        if (node) {
            if (node.calc && node.calc.isVolatile) {
                this._removeVolatile(node);
            }
            if (node.calc && node.calc.isPivotData) {
                this._removePivotDataCell(node);
            }
            node.calc = calc;
            if (calc) {
                calc.node = node;
            }
        }
    };
    CalcSourceModel.prototype._removeCalc = function (row, col, type) {
        var node = this.getNode(row, col, true);
        if (node && node.calc) {
            if (node.calc.isVolatile) {
                this._removeVolatile(node);
            }
            if (node.calc.isPivotData) {
                this._removePivotDataCell(node);
            }
            this._service._removeDirty(node.calc, type);
            node.calc = keyword_undefined;
        }
    };
    CalcSourceModel.prototype._setNode4Swap = function (fromRow, fromCol, row, col, node) {
        var self = this;
        if (row >= 0 && col >= 0) {
            var dr = self.dataTable[row];
            if (!dr) {
                dr = self.dataTable[row] = {};
            }
            dr[col] = node;
            if (node && node.calc) {
                delete node.calc;
            }
        }
        else if (row >= 0 && col === -1 && fromRow >= 0 && fromCol === -1) {
            self._rowDataArray[row] = node;
        }
        else if (col >= 0 && row === -1 && fromCol >= 0 && fromRow === -1) {
            self._columnDataArray[col] = node;
        }
    };
    CalcSourceModel.prototype._swapNode = function (row, col, row2, col2) {
        var self = this;
        var node = self.getNode(row, col);
        var node2 = self.getNode(row2, col2);
        if (node && node._expr) {
            self._setNode4Swap(row, col, row2, col2, node);
        }
        else if (node2 && node2._expr) {
            self._setNode4Swap(row, col, row2, col2, keyword_null);
        }
        if (node2 && node2._expr) {
            self._setNode4Swap(row2, col2, row, col, node2);
        }
        else if (node && node._expr) {
            self._setNode4Swap(row2, col2, row, col, keyword_null);
        }
    };
    CalcSourceModel.prototype._setIterativeCalc = function (calc, keepOldValue, initValue) {
        if (!calc.isIterativeCalc) {
            calc.isIterativeCalc = true;
            this._iterativeCalcCells.push(calc);
            if (!keepOldValue) {
                setNodeValueToZero(calc, initValue);
            }
        }
    };
    CalcSourceModel.prototype._removeIterativeCalc = function (calc) {
        delete calc.isIterativeCalc;
    };
    CalcSourceModel.prototype._getAllIterativeCalcs = function () {
        var self = this;
        var newArray = [];
        var caches = self._iterativeCalcCells, length = self._iterativeCalcCells.length;
        for (var i = 0; i < length; i++) {
            if (caches[i].isIterativeCalc) {
                newArray.push(caches[i]);
            }
        }
        self._iterativeCalcCells = newArray;
        return self._iterativeCalcCells;
    };
    CalcSourceModel.prototype._getAllVolatiles = function () {
        return this._volatitleCells;
    };
    CalcSourceModel.prototype._getAllPivotDataCells = function () {
        return this._pivotDataCells;
    };
    CalcSourceModel.prototype._setVolatile = function (calc) {
        if (!calc.isVolatile) {
            calc.isVolatile = true;
            this._volatitleCells.push(calc);
        }
    };
    CalcSourceModel.prototype._setPivotDataCell = function (calc) {
        if (!calc.isPivotData) {
            calc.isPivotData = true;
            this._pivotDataCells.push(calc);
        }
    };
    CalcSourceModel.prototype._removeVolatile = function (calc) {
        calc.isVolatile = keyword_undefined;
        var self = this;
        self._removedVolatileCount++;
        if (self._removedVolatileCount > 100) {
            self._removedVolatileCount = 0;
            var newArray = [];
            var caches_1 = self._volatitleCells, length_1 = self._volatitleCells.length;
            for (var i = 0; i < length_1; i++) {
                if (caches_1[i].isVolatile) {
                    newArray.push(caches_1[i]);
                }
            }
            self._volatitleCells = newArray;
        }
    };
    CalcSourceModel.prototype._removePivotDataCell = function (calc) {
        calc.isPivotData = undefined;
        var self = this;
        var newArray = [];
        var caches = self._pivotDataCells, length = self._pivotDataCells.length;
        for (var i = 0; i < length; i++) {
            if (caches[i].isPivotData) {
                newArray.push(caches[i]);
            }
        }
        self._pivotDataCells = newArray;
    };

    CalcSourceModel.prototype.getCalcService = function () {
        return this._service;
    };
    CalcSourceModel.prototype.setCalcService = function (service) {
        this._service = service;
    };
    CalcSourceModel.prototype._getCalcServiceInternal = function () {
        return this._service;
    };

    CalcSourceModel.prototype.getSource = function () {
        return this._source;
    };
    CalcSourceModel.prototype.hasFormula = function (row, col) {
        row = row !== keyword_undefined ? row : -1;
        col = col !== keyword_undefined ? col : -1;
        return !!this._getExpressionWithRowColumn(row, col);
    };

    CalcSourceModel.prototype.setFormula = function (row, col, formula, expression, ignoreError, force, changeInfo, incrementLoad) {
        var self = this;
        if (formula && formula.length === 0) {
            formula = keyword_null;
        }
        if (!ignoreError && self._intersectWithArrayFormula(row, col, 1, 1)) {
            self._throwArrayPartException();
        }
        var oldFormula = self.getFormula(row, col);
        if (force || (oldFormula !== formula) && !((oldFormula === '' && !formula) || (!oldFormula && formula === ''))
            || (oldFormula === formula && self._getArrayInfo(row, col))) {
            var svc = self._getCalcServiceInternal();
            var expr = keyword_null;
            if (svc) {
                try {
                    var fixedRow = row >= 0 ? row : 0;
                    var fixedCol = col >= 0 ? col : 0;
                    expr = expression || (formula ? svc.parse(self._source, formula, fixedRow, fixedCol, false , ignoreError ) : keyword_null);
                    self._setExpression(row, col, expr, keyword_undefined, false, changeInfo, incrementLoad);
                }
                catch (ex) {
                    if (!ignoreError) {
                        throw ex;
                    }
                }
            }

            if (row >= 0 && col >= 0) {
                self._source.setFormula(row, col, formula);
            }
        }
    };

    CalcSourceModel.prototype.getFormula = function (row, col, culture) {
        var svc = this._getCalcServiceInternal();
        if (svc) {
            var expr = this._getExpressionWithRowColumn(row, col);
            if (expr) {
                var arrayInfo = this._getArrayInfo(row, col);
                row = (arrayInfo && arrayInfo.isDynamicArray !== true) ? arrayInfo.row : row;
                col = (arrayInfo && arrayInfo.isDynamicArray !== true) ? arrayInfo.col : col;
                return svc.unparse(this._source, expr, row, col, culture);
            }
        }
        return keyword_null;
    };

    CalcSourceModel.prototype.setFormulaByName = function (name, formula, ignoreError, syncOnly, incrementLoad) {
        if (!name) {
            return;
        }
        name = toUpperCase(name);
        var self = this;
        if (formula && formula.length === 0) {
            formula = keyword_null;
        }
        var oldFormula = self.getFormulaByName(name);
        if ((oldFormula !== formula) && !((oldFormula === '' && !formula) || (!oldFormula && formula === ''))) {
            var svc = self._getCalcServiceInternal();
            var expr = keyword_null;
            if (svc) {
                try {
                    expr = formula ? svc.parse(self._source, formula, 0, 0, false , ignoreError) : keyword_null;
                    self._setExpressionByName(name, expr, keyword_undefined, false, syncOnly, incrementLoad);
                }
                catch (ex) {
                    if (!ignoreError) {
                        throw ex;
                    }
                }
            }


            self._source.setFormula({ name: name }, formula);
        }
    };

    CalcSourceModel.prototype.getFormulaByName = function (name) {
        var svc = this._getCalcServiceInternal();
        if (svc && name) {
            var expr = this._getExpressionWithRowColumnByName(toUpperCase(name));
            if (expr) {
                return svc.unparse(this._source, expr, 0, 0);
            }
        }
        return keyword_null;
    };
    CalcSourceModel.prototype._throwArrayPartException = function () {
        throw calc_common_1.sR().Exp_ArrayFromulaPart;
    };

    CalcSourceModel.prototype.rC = function () {
        return Math_min(this._source.getRowCount());
    };

    CalcSourceModel.prototype.cC = function () {
        return Math_min(this._source.getColumnCount());
    };

    CalcSourceModel.prototype.setArrayFormula = function (row, col, rowCount, colCount, formula, ignoreError, changeInfo, incrementLoad) {
        var self = this, expr;
        if (formula && formula.length === 0) {
            formula = keyword_null;
        }
        if (self._intersectWithArrayFormula(row, col, rowCount, colCount)) {
            self._throwArrayPartException();
        }
        row = row < 0 ? 0 : row;
        col = col < 0 ? 0 : col;
        var svc = self._getCalcServiceInternal();
        if (!svc) {
            return;
        }
        self._clear(row, col, rowCount, colCount, changeInfo);
        if (!formula) {
            return;
        }
        try {
            expr = formula ? svc.parse(self._source, formula, row, col, false , ignoreError, ignoreError ) : keyword_null;
        }
        catch (ex) {
            if (!ignoreError) {
                throw ex;
            }
            return;
        }
        for (var rowIndex = row; rowIndex < row + rowCount; rowIndex++) {
            for (var colIndex = col; colIndex < col + colCount; colIndex++) {
                self._setExpression(rowIndex, colIndex, expr, _createRangeIdentity(row, col, rowCount, colCount), false, changeInfo, incrementLoad);
            }
        }
        if (row >= 0 && col >= 0) {
            self._source.setArrayFormula(row, col, rowCount, colCount, svc.unparse(self._source, expr, row, col));
        }
    };
    CalcSourceModel.prototype.getWorkingNodeInfo = function (row, col, infoType) {
        var self = this;
        var node, source = self._source;
        if (row >= source.getRowCount() || col >= source.getColumnCount()) {
            return node;
        }
        if (row >= 0 && col >= 0) {
            node = self.getNode(row, col);
            if (!node || infoType === 0 && !node._expr
                || infoType === 1 && !node._workingExpr
                || infoType === 2 && !node._arrayInfo) {
                node = self.getNode(row, -1);
            }
            if (!node || infoType === 0 && !node._expr
                || infoType === 1 && !node._workingExpr
                || infoType === 2 && !node._arrayInfo) {
                node = self.getNode(-1, col);
            }
        }
        else if (row >= 0 && col === -1) {
            node = self.getNode(row, -1);
        }
        else if (row === -1 && col >= 0) {
            node = self.getNode(-1, col);
        }
        else {
            node = self.getNode(-1, -1);
        }
        return node && (infoType === 0 && node._expr
            || infoType === 1 && node._workingExpr
            || infoType === 2 && node._arrayInfo);
    };
    CalcSourceModel.prototype._setExpression = function (row, col, expr, baseRange, updateModel, changeInfo, incrementLoad) {
        var self = this;
        var svc = self._getCalcServiceInternal();
        if (svc._hasAsync) {
            svc._evaluator.asyncManager.endCalcCell();
        }
        var isArrayFormula = baseRange !== keyword_undefined && baseRange !== null;
        var baseRow = isArrayFormula ? baseRange.row : row, baseCol = isArrayFormula ? baseRange.col : col, source = self._source;
        var context = new evaluator_1.EvaluateContext(source, _createCellIdentity(baseRow, baseCol), isArrayFormula);
        var workingExpr;
        if (svc.allowDynamicArray) {
            workingExpr = _mappingArray(context, expr, isArrayFormula, isArrayFormula ? row - baseRange.row : 0, isArrayFormula ? col - baseRange.col : 0, true, true) ;
        }
        else {
            workingExpr = _mappingArrayOld(context, expr, isArrayFormula, isArrayFormula ? row - baseRange.row : 0, isArrayFormula ? col - baseRange.col : 0) ;
        }
        var adjustKind = context._adjustKind;
        if (adjustKind) {
            delete context._adjustKind;

            if (adjustKind === 2 ) {
                expr = workingExpr;
            }
            else if (adjustKind === 1 ) {
                var newFormula = svc.unparse(source, expr, baseRow, baseCol);
                expr = svc.parse(source, newFormula, baseRow, baseCol);
            }
        }
        workingExpr = workingExpr === expr ? keyword_undefined : workingExpr;
        var arrayInfo;
        if (baseRange !== keyword_undefined) {
            arrayInfo = baseRange;
        }
        if (row >= 0 && col >= 0) {
            if (updateModel === keyword_undefined || updateModel) {
                var fixedRow = row >= 0 ? row : 0;
                var fixedCol = col >= 0 ? col : 0;
                var formula = expr ? svc.unparse(source, expr, fixedRow, fixedCol) : keyword_undefined;
                self._source.setFormula(row, col, formula);
            }
            self._setCellExpression(row, col, expr, workingExpr, arrayInfo, changeInfo, incrementLoad);
        }
        else if (row >= 0 && col === -1) {
            self._setRowExpression(row, expr, workingExpr, changeInfo, incrementLoad);
        }
        else if (row === -1 && col >= 0) {
            self._setColumnExpression(col, expr, workingExpr, changeInfo, incrementLoad);
        }
        if (svc.autoCalculation && !svc.IsSuspended()) {
            svc.recalculateAll(false);
        }
    };
    CalcSourceModel.prototype._setExpressionByName = function (name, expr, baseRange, updateModel, syncOnly, incrementLoad) {
        var self = this;
        var svc = self._getCalcServiceInternal();
        var context = new evaluator_1.EvaluateContext(self._source, _createCellIdentity(0, 0), false);

        var workingExpr = _mappingArray(context, expr, false, 0, 0);
        workingExpr = workingExpr === expr ? keyword_undefined : workingExpr;
        if ((updateModel === keyword_undefined || updateModel) && !syncOnly) {
            var formula = expr ? svc.unparse(self._source, expr, 0, 0) : keyword_undefined;
            if (self._source.setFormulaByName) {
                self._source.setFormulaByName(name, formula);
            }
        }
        self._setNameExpression(name, expr, workingExpr, null, incrementLoad);
        if (svc.autoCalculation && !svc.IsSuspended()) {
            if (!syncOnly) {
                svc.recalculateAll(false);
            }
        }
    };
    CalcSourceModel.prototype.getRowExpression = function (row) {
        return this._getExpr(row, -1);
    };
    CalcSourceModel.prototype.getColumnExpression = function (column) {
        return this._getExpr(-1, column);
    };
    CalcSourceModel.prototype._setNameExpression = function (name, value, workingExpr, changeInfo, incrementLoad) {
        var self = this;
        var nameIdCalc = self._getNameIDCalc(name, true);
        if (nameIdCalc) {
            if (!incrementLoad) {
                nameIdCalc._stopListening();
            }
            var node = this.getNodeByName(name, true);
            node._expr = value;
            if (changeInfo) {
                changeInfo[0].push('dataTable', name);
                changeInfo[1] = node._expr;
            }
            workingExpr = value && workingExpr ? workingExpr : keyword_undefined;
            node._workingExpr = workingExpr;
            if (!incrementLoad) {
                nameIdCalc._startListening();
            }
            nameIdCalc._addToDirty();
        }
    };
    CalcSourceModel.prototype._setCellExpression = function (row, col, value, workingExpr, arrayInfo, changeInfo, incrementLoad) {
        var self = this;
        var cellCalc = self._getCellCalc(row, col, true);
        if (cellCalc) {
            self._backupNodeItem(changeInfo, row, col);
            var service = self._service;
            service.onClearExpr(self._source, _createCellIdentity(row, col));

            linkCellRanges(service, cellCalc, cellCalc._currentUsedDynamicCreatedRanges, false );
            delete cellCalc._currentUsedDynamicCreatedRanges;
            delete cellCalc._newDetectedDynamicCreatedRanges;

            cellCalc._stopListening();

            self._setExpr(row, col, value);
            if (value) {
                if (workingExpr || self._getWorkingExpr(row, col)) {
                    self._setWorkingExpr(row, col, workingExpr);
                }
                if (!(arrayInfo && arrayInfo.isDynamicArray === true)) {
                    self._setArrayInfo(row, col, arrayInfo);
                }
            }
            else {
                self._setWorkingExpr(row, col, keyword_undefined);
                self._setArrayInfo(row, col, keyword_undefined);
            }

            cellCalc._startListening();

            cellCalc._addToDirty();
        }
    };
    CalcSourceModel.prototype._setRowExpression = function (row, value, workingExpr, changeInfo, incrementLoad) {
        var self = this;
        var rowCalc = self._getRowCalc(row, true);
        if (rowCalc) {
            self._backupNodeItem(changeInfo, row, -1);
            if (!incrementLoad) {
                rowCalc._stopListening();
            }
            self._setExpr(row, -1, value);
            if (workingExpr || self._getWorkingExpr(row, -1)) {
                self._setWorkingExpr(row, -1, workingExpr);
            }
            if (!incrementLoad) {
                rowCalc._startListening();
            }
            rowCalc._addToDirty();
        }
    };
    CalcSourceModel.prototype._setColumnExpression = function (column, value, workingExpr, changeInfo, incrementLoad) {
        var self = this;
        var columnCalc = self._getColumnCalc(column, true);
        if (columnCalc) {
            self._backupNodeItem(changeInfo, -1, column);
            if (!incrementLoad) {
                columnCalc._stopListening();
            }
            self._setExpr(-1, column, value);
            if (workingExpr || self._getWorkingExpr(-1, column)) {
                self._setWorkingExpr(-1, column, workingExpr);
            }
            if (!incrementLoad) {
                columnCalc._startListening();
            }
            columnCalc._addToDirty();
        }
    };
    CalcSourceModel.prototype._clear = function (row, col, rowCount, colCount, changeInfo) {
        var self = this;
        var row1 = row < 0 ? 0 : row;
        var col1 = col < 0 ? 0 : col;
        var rowCount1 = row < 0 ? self.rC() : rowCount;
        var colCount1 = col < 0 ? self.cC() : colCount;
        var row2 = row1 + rowCount1 - 1;
        var col2 = col1 + colCount1 - 1;
        var workingExpr, expr, arrayInfo;
        var clearOne = function (rowIndex, colIndex) {
            workingExpr = self._getWorkingExpr(rowIndex, colIndex);
            expr = self._getExpr(rowIndex, colIndex);
            if (workingExpr || expr) {
                arrayInfo = self._getArrayInfo(rowIndex, colIndex);
                var baseRange = (arrayInfo && arrayInfo.isDynamicArray !== true) ? _createRangeIdentity(arrayInfo.row, arrayInfo.col, arrayInfo.rowCount, arrayInfo.colCount) : keyword_undefined;
                self._setExpression(rowIndex, colIndex, keyword_null, baseRange, true, changeInfo);
            }
        };
        for (var r = row1; r <= row2 && r >= 0; r++) {
            if (col < 0) {
                clearOne(r, -1);
            }
            for (var c = col1; c <= col2 && c >= 0; c++) {
                if (r === row1 && row < 0) {
                    clearOne(-1, c);
                }
                clearOne(r, c);
            }
        }
        if (row < 0 && col < 0) {
            clearOne(row, col);
        }
    };
    CalcSourceModel.prototype._intersectWithArrayFormula = function (row, col, rowCount, colCount) {
        return this._getFormulaExps(row, col, rowCount, colCount, true, true);
    };
    CalcSourceModel.prototype._getFormulaExps = function (row, col, rowCount, colCount, testIntersect, onlyArrayFormula) {
        var self = this;
        var row1 = row < 0 ? 0 : row;
        var col1 = col < 0 ? 0 : col;
        var rowCount1 = row < 0 ? self.rC() : rowCount;
        var colCount1 = col < 0 ? self.cC() : colCount;
        var row2 = row1 + (rowCount1 === 0 ? 1 : rowCount1) - 1;
        var col2 = col1 + (colCount1 === 0 ? 1 : colCount1) - 1;
        var hasPart = false;
        var ranges = [], formulas = [], node, dr, dataTable = self.dataTable;
        for (var r = row1; r <= row2 && r >= 0; r++) {
            if (r > self._lastNonNullRow) {
                break;
            }
            dr = dataTable[r];
            if (!dr) {
                continue;
            }
            for (var c = col1; c <= col2 && c >= 0; c++) {
                if (c > self._lastNonNullColumn) {
                    break;
                }
                node = dr[c];
                if (node) {
                    var array = node._arrayInfo, expr = void 0;
                    if (array && !array.isDynamicArray) {
                        if (array.row < row1 || array.row + array.rowCount - 1 > row2 || array.col < col1 || array.col + array.colCount - 1 > col2) {
                            if (testIntersect) {
                                var isAddRowToTheTopSide = array.row === row && rowCount === 0 ;
                                var isAddColToTheLeftSide = array.col === col && colCount === 0 ;
                                return !isAddRowToTheTopSide && !isAddColToTheLeftSide;
                            }
                            hasPart = true;
                        }

                        if (r !== array.row && r !== row1) {
                            continue;
                        }
                        ranges.push(_createRangeIdentity(array.row, array.col, array.rowCount, array.colCount));
                        expr = node._expr;
                        formulas.push(expr);

                        c = array.col + array.colCount - 1;
                    }
                    else if (!onlyArrayFormula) {
                        expr = node._expr;
                        if (expr) {
                            ranges.push({ row: r, col: c });
                            formulas.push(expr);
                        }
                    }
                }
            }
        }
        if (testIntersect) {
            return false;
        }
        return { hasPart: hasPart, ranges: ranges, formulas: formulas };
    };
    CalcSourceModel.prototype.getCalcObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var identity = args[0], create = args[1];
        var self = this;
        var row = identity.row, col = identity.column;
        var t = null;
        if (!isNaN(row) && !isNaN(col)) {
            if (row >= 0 && col >= 0) {
                if (identity._isCell()) {
                    t = self._getCellCalc(row, col, create);
                }
                else {
                    var endRow = identity.endRow, endColumn = identity.endColumn;
                    t = [];
                    for (var r = row; r <= endRow; r++) {
                        for (var c = col; c <= endColumn; c++) {
                            t.push(self._getCellCalc(r, c, create));
                        }
                    }
                }
            }
            else if (row >= 0) {
                t = self._getRowCalc(row, create);
            }
            else if (col >= 0) {
                t = self._getColumnCalc(col, create);
            }
        }
        else if (identity.name) {
            t = self._getNameIDCalc(identity.name, create);
        }
        return t;
    };
    CalcSourceModel.prototype._getNameIDCalc = function (name, create) {
        var self = this;
        var cell = keyword_null;
        var node = self.getNodeByName(name, create);
        if (node) {
            cell = node.calc;
            if (!cell && create) {
                cell = new NameIDCalc(self, name) ;
                node.calc = cell;
                cell.node = node;
            }
        }
        return cell;
    };
    CalcSourceModel.prototype._foreachCellCalc = function (callback) {
        var self = this;
        for (var row in self.dataTable) {
            for (var col in self.dataTable[row]) {
                callback(self.dataTable[row][col]);
            }
        }
    };
    CalcSourceModel.prototype._getCellCalc = function (row, col, create) {
        var self = this;
        var cell = keyword_null;
        if (row >= 0 && col >= 0) {
            var dataTable = self.dataTable;
            var dr = dataTable[row];
            if (!dr) {
                if (create) {
                    dr = dataTable[row] = {};
                    if (row > self._lastNonNullRow) {
                        self._lastNonNullRow = row;
                    }
                }
                else {
                    return cell;
                }
            }
            var dc = dr[col];
            if (!dc) {
                if (create) {
                    dc = dr[col] = {};

                    cell = new CellCalc(self, row, col) ;
                    dc.calc = cell;
                    cell.node = dc;
                    if (col > self._lastNonNullColumn) {
                        self._lastNonNullColumn = col;
                    }
                }
                return cell;
            }
            cell = dc.calc;
            if (!cell && create) {
                cell = new CellCalc(self, row, col);
                dc.calc = cell;
                cell.node = dc;
                if (row > self._lastNonNullRow) {
                    self._lastNonNullRow = row;
                }
                if (col > self._lastNonNullColumn) {
                    self._lastNonNullColumn = col;
                }
            }
        }
        return cell;
    };
    CalcSourceModel.prototype._getRowCalc = function (row, create) {
        var self = this;
        var calc = keyword_null;
        if (row >= 0) {
            calc = self._getCalc(row, -1);
            if (!calc && create) {
                calc = new RowCalc(self, row) ;
                self._setCalc(row, -1, calc);
                if (row > self._lastNonNullRow) {
                    self._lastNonNullRow = row;
                }
            }
        }
        return calc;
    };
    CalcSourceModel.prototype._getColumnCalc = function (column, create) {
        var self = this;
        var calc = keyword_null;
        if (column >= 0) {
            calc = self._getCalc(-1, column);
            if (!calc && create) {
                calc = new ColumnCalc(self, column) ;
                self._setCalc(-1, column, calc);
                if (column > self._lastNonNullColumn) {
                    self._lastNonNullColumn = column;
                }
            }
        }
        return calc;
    };
    CalcSourceModel.prototype._getRangeCalc = function (create) {
        var self = this;
        if (!self._rangeCalc && create) {
            self._rangeCalc = new RangeCalc(self) ;
        }
        return self._rangeCalc;
    };
    CalcSourceModel.prototype._getNameCalc = function (name, create) {
        var self = this;
        var nameCalc;
        name = toUpperCase(name);
        if (!self._nameCalcs) {
            self._nameCalcs = {};
        }
        nameCalc = self._nameCalcs[name];
        if (!nameCalc && create) {
            nameCalc = self._nameCalcs[name] = new NameCalc(self, name) ;
        }
        return nameCalc;
    };
    CalcSourceModel.prototype.updateNameCalc = function (name, start) {
        var nameCalc = this._getNameCalc(toUpperCase(name));
        if (nameCalc) {
            nameCalc.updateListening(true, start);
            nameCalc._addToDirty();
        }
    };
    CalcSourceModel.prototype._addColumnsToDirty = function (col, colCount) {
        var self = this, maxCol = Math_min(self._lastNonNullColumn, col + colCount - 1);
        for (var c = col; c !== -1 && c <= maxCol; c++) {
            if (!self.isDirty(-1, c)) {
                continue;
            }
            var columnCalc = self._getColumnCalc(c, true);
            self._service._addDirty(columnCalc, 2 );
        }
    };
    CalcSourceModel.prototype._addRowsToDirty = function (row, rowCount) {
        var self = this, maxRow = Math_min(self._lastNonNullRow, row + rowCount - 1);
        for (var r = row; r !== -1 && r <= maxRow; r++) {
            if (!self.isDirty(r, -1)) {
                continue;
            }
            var rowCalc = self._getRowCalc(r, true);
            self._service._addDirty(rowCalc, 1 );
        }
    };
    CalcSourceModel.prototype._addCellsToDirty = function (row, col, rowCount, colCount) {
        var self = this;
        var cellCalc = null;
        var maxRow = Math_min(self._lastNonNullRow, row + rowCount - 1), maxCol = Math_min(self._lastNonNullColumn, col + colCount - 1);
        for (var r = row; r <= maxRow; r++) {
            for (var c = col; c <= maxCol; c++) {
                if (!self._containsNode(r, c)) {
                    continue;
                }
                if (self._service.calcOnDemand) {
                    cellCalc = self._getCellCalc(r, c, false);
                    if (cellCalc) {
                        cellCalc._addListenersToDirty();
                        cellCalc._dirty = true;
                    }
                }
                else {
                    cellCalc = self._getCellCalc(r, c, true);
                    self._service._addDirty(cellCalc, 0 );
                }
            }
        }
        self._addRowsToDirty(row, rowCount);
        self._addColumnsToDirty(col, colCount);
        var rangesCalc = self._getRangeCalc(false);
        if (rangesCalc) {
            rangesCalc._addListenersToDirty(row, col, rowCount, colCount);
        }
    };
    CalcSourceModel.prototype._addVolatitleAndIterativeToDirty = function () {
        var self = this, volatiles = self._getAllVolatiles().concat(self._getAllIterativeCalcs()).concat(self._getAllPivotDataCells()), rowCalc, colCalc;
        for (var volatileIndex = 0; volatileIndex < volatiles.length; volatileIndex++) {
            var volatiCalc = volatiles[volatileIndex];
            if (self._service.calcOnDemand && volatiCalc && (volatiCalc.isVolatile || volatiCalc.isIterativeCalc)) {
                volatiCalc._dirty = true;
                volatiCalc._addListenersToDirty();
            }

            if (volatiCalc && (volatiCalc.isVolatile || volatiCalc.isIterativeCalc || volatiCalc.isPivotData) && (volatiCalc instanceof CellCalc) && !self._isDirtyCell(volatiCalc)) {
                var cellCalc = self._getCellCalc(volatiCalc.row, volatiCalc.column, true);
                self._service._addDirty(cellCalc, 0 );
                rowCalc = self._getRowCalc(volatiCalc.row, false);
                if (rowCalc && !self._isDirtyRow(rowCalc)) {
                    self._addRowsToDirty(volatiCalc.row, 1);
                }
                colCalc = self._getColumnCalc(volatiCalc.column, false);
                if (colCalc && !self._isDirtyRow(colCalc)) {
                    self._addColumnsToDirty(volatiCalc.column, 1);
                }
            }
        }
    };


    CalcSourceModel.prototype._isDirtyCell = function (cell) {
        var heads = this.getCalcService()._heads;
        return !!cell._preDirty || cell === (heads && heads[0]);
    };
    CalcSourceModel.prototype._isDirtyRow = function (row) {
        var heads = this.getCalcService()._heads;
        return row._preDirty || row === (heads && heads[1]);
    };
    CalcSourceModel.prototype.isDirtyColumn = function (column) {
        var heads = this.getCalcService()._heads;
        return column._preDirty || column === (heads && heads[2]);
    };
    CalcSourceModel.prototype.isDirty = function (row, col) {
        return !!(this._getCalc(row, col) || this._getExpr(row, col));
    };
    CalcSourceModel.prototype.recalculateForContext = function (source, context, isAyncEvaluate) {
        var service = this._service;
        var model = service.getSourceModel(source);
        var row = context.row, column = context.col;
        if (column === -1) {
            model._addCellsToDirty(row, 0, 1, model.cC());
        }
        else if (row === -1) {
            model._addCellsToDirty(0, column, model.rC(), 1);
        }
        else {
            model._addCellsToDirty(row, column, 1, 1);
        }
        if (!service.IsSuspended()) {
            service.recalculateAll(false, isAyncEvaluate);
        }
    };
    CalcSourceModel.prototype.recalculateCell = function (row, column, returnWhenPause) {
        var self = this, source = self._source;
        var expr = (self._getWorkingExpressionWithRowColumn(row, column) || self._getExpressionWithRowColumn(row, column));
        var dirtyAnchors;
        var sheetSource = source;
        var isFromJSON = sheetSource._isFromJSON;
        var sheetSourceModel = sheetSource && sheetSource._sheet && sheetSource._sheet._modelManager;
        if (sheetSourceModel) {
            sheetSourceModel._dynamicArrayProcessing = true;
        }
        var valueChanged = false;
        if (expr) {
            var identity = _createCellIdentity(row, column);
            var oldValue = source.getValue(row, column);
            var isArrayFormula = false, baseRow = void 0, baseCol = void 0, rowCount = void 0, colCount = void 0;
            var arrayInfo = self._getArrayInfo(row, column);
            if (arrayInfo && arrayInfo.isDynamicArray !== true) {
                isArrayFormula = true;
                baseRow = arrayInfo.row;
                baseCol = arrayInfo.col;
                rowCount = arrayInfo.rowCount;
                colCount = arrayInfo.colCount;
            }
            var service = self._service;
            if (service._hasAsync) {
                service._evaluator.asyncManager.startCalcCell(self._source, identity);
            }
            var value = service._evaluateParsedFormula(self._source, expr, identity, isArrayFormula, true, arrayInfo && arrayInfo.isDynamicArray !== true && _createRangeIdentity(baseRow, baseCol, rowCount, colCount), service.allowDynamicArray, returnWhenPause);
            if (returnWhenPause && value && value.pause) {
                return value;
            }
            var cellCalc = self._source.getCalcSourceModel()._getCellCalc(row, column);

            processDynamicListener(cellCalc, source, service, row, column, returnWhenPause);
            if (returnWhenPause && cellCalc.delay > 0) {
                return { pause: 'newDetectedRefs' };
            }
            var isArrayValue = calc_common_1.Convert._isReference(value) || calc_common_1.Convert._isArray(value);

            if (!isArrayFormula && (expr._resultDynamicArray || (!expr.ensureSingle && isArrayValue))) {
                rowCount = value.getRowCount ? value.getRowCount() : 1;
                colCount = value.getColumnCount ? value.getColumnCount() : 1;
                arrayInfo = {
                    row: row,
                    col: column,
                    rowCount: rowCount,
                    colCount: colCount,
                    isDynamicArray: true
                };
                self._setArrayInfo(row, column, arrayInfo);
            }
            valueChanged = true;
            var arrayValue = void 0;
            if (isArrayValue) {
                arrayValue = calc_common_1.Convert._toArray(value, 0 , false, false, false);
                if (arrayValue.isError || arrayValue.isConvertError) {
                    value = CalcErrorsValue;
                    isArrayValue = false;
                }
                else {
                    rowCount = arrayValue.rowCount;
                    colCount = arrayValue.colCount;

                    if (rowCount === 0 || colCount === 0) {
                        value = CalcErrorsCalc;
                        isArrayValue = false;
                    }
                    else if (rowCount === 1 && colCount === 1 && !(expr instanceof referenceExpression_1.SpillReferenceExpression)) {
                        value = arrayValue[0][0];
                        if (isNullOrUndefined(value)) {
                            value = 0;
                        }
                        isArrayValue = false;
                    }
                    if (expr.ensureSingle && isArrayValue && !expr._resultDynamicArray) {
                        var node = self.getNode(row, column);
                        delete expr.ensureSingle;
                        expr = node._expr = calc_common_1._createFunctionExpression(calc_common_1.Functions.findGlobalFunction('@'), [expr]);
                        node._workingExpr = keyword_undefined;

                        value = expr.function.evaluate({ row: row, column: column }, value);
                        isArrayValue = false;
                    }
                }
            }
            if (isArrayValue) {
                var result = sheetSource.setArray(row, column, rowCount, colCount, arrayValue);
                if (result) {
                    setSpillValues(result[1], sheetSource);
                }
            }
            else {
                var result = sheetSource.updateItem && sheetSource.updateItem(row, column, value);
                if (result) {
                    setSpillValues(result[0], sheetSource);
                    dirtyAnchors = result[1];
                }


                var hyperlink_flag = 'hyperlink';
                if (oldValue === value && !(typeof value === 'string' && value[hyperlink_flag])) {
                    valueChanged = false;
                }
                else {
                    if (oldValue instanceof Date) {
                        if ((value instanceof Date) && oldValue.valueOf() === value.valueOf()) {
                            return false;
                        }
                        else if (typeof value === const_number) {
                            var numberValue = _DateTimeHelper._toOADate(oldValue);
                            if (numberValue === value) {
                                return false;
                            }
                            value = _DateTimeHelper._fromOADate(value);
                        }
                    }
                    source.setValue(row, column, value, oldValue);
                }
            }
            if (service._hasAsync) {
                service._evaluator.asyncManager.endCalcCell();
            }
            if (sheetSource._removeDirtyCachedArrayItem) {
                sheetSource._removeDirtyCachedArrayItem(row, column);
            }
        }
        else {
            if (!isFromJSON) {
                var result = sheetSource.updateItem && sheetSource.updateItem(row, column, keyword_null);
                if (result) {
                    setSpillValues(result[0], sheetSource);
                    dirtyAnchors = result[1];
                }
            }
        }
        if (sheetSourceModel) {
            if (dirtyAnchors) {
                markAnchorCellDirty(dirtyAnchors, self, sheetSourceModel._dynamicArrayManager);
            }
            sheetSourceModel._dynamicArrayProcessing = false;
        }
        return valueChanged;
    };
    CalcSourceModel.prototype.recalculateNameID = function (name) {
        var self = this, source = self._source;
        var expr = (self._getWorkingExpressionWithRowColumnByName(name) || self._getExpressionWithRowColumnByName(name));
        if (expr) {
            var oldValue = source.getValueByName ? source.getValueByName(name) : source.getValue({ name: name });
            var value = self._service._evaluateParsedFormula(self._source, expr, { name: name }, false, true);
            if (oldValue === value) {
                return;
            }
            else if ((oldValue instanceof Date) && (value instanceof Date) && oldValue.valueOf() === value.valueOf()) {
                return;
            }
            source.setValueByName ? source.setValueByName(name, value) : source.setValue({ name: name }, value);
        }
    };

    CalcSourceModel.prototype.addDirtyNodesForCalc = function (dirtyAll, isAyncEvaluate) {
        var self = this;
        if (dirtyAll !== false) {
            var colCount = self.cC();
            var rowCount = self.rC();
            self._addColumnsToDirty(0, colCount);
            self._addRowsToDirty(0, rowCount);
            self._addCellsToDirty(0, 0, rowCount, colCount);
        }
        else if (!isAyncEvaluate) {
            self._addVolatitleAndIterativeToDirty();
        }
    };
    CalcSourceModel.prototype.addListenersToDirtyForRow = function (calcService) {
        while (calcService._heads[1]) {
            var head = calcService._heads[1];
            var sheetSource = head._sourceModel;
            var columnCount = sheetSource.cC();
            for (var c = 0; c < columnCount; c++) {
                calcService._addDirty(sheetSource._getCellCalc(head.row, c, true), 0 );
            }
            calcService._removeDirty(head, 1 );
        }
    };
    CalcSourceModel.prototype.addListenersToDirtyForCol = function (calcService) {
        while (calcService._heads[2]) {
            var head = calcService._heads[2];
            var sheetSource = head._sourceModel;
            var rowCount = sheetSource.rC();
            if (rowCount > 0) {
                for (var r = 0; r < rowCount; r++) {
                    calcService._addDirty(sheetSource._getCellCalc(r, head.column, true), 0 );
                }
            }
            else {
                head._addListenersToDirty();
            }
            calcService._removeDirty(head, 2 );
        }
    };
    CalcSourceModel.prototype._cacheHeadDirtyColumns = function (cachedDirtyColumns, currentHeadDirtyColumns) {
        var index = cachedDirtyColumns.length;
        var dirtyColumn = currentHeadDirtyColumns;
        while (dirtyColumn) {
            cachedDirtyColumns[index] = dirtyColumn;
            index++;
            dirtyColumn = dirtyColumn._nextDirty;
        }
    };
    CalcSourceModel.prototype.addListenersToDirty = function (calcService, type) {
        if (type === 1) {
            this.addListenersToDirtyForRow(calcService);
        }
        else if (type === 2) {
            this.addListenersToDirtyForCol(calcService);
        }
        else if (type === 0) {
            var cachedHeadDirtyColumns = [];
            if (calcService._heads[2]) {
                this._cacheHeadDirtyColumns(cachedHeadDirtyColumns, calcService._heads[2]);
            }
            for (var cell = calcService._heads[0]; cell; cell = cell._nextDirty) {
                var sheetSource = cell._sourceModel;
                var row = cell.row;
                var col = cell.column;
                var rowCalc = sheetSource._getRowCalc(row, false);
                var columnCalc = sheetSource._getColumnCalc(col, false);
                var rangesCalc = sheetSource._getRangeCalc(false);
                cell._addListenersToDirty();
                if (rowCalc) {
                    rowCalc._addListenersToDirty();
                }
                if (columnCalc) {
                    columnCalc._addListenersToDirty();
                }
                if (rangesCalc) {
                    rangesCalc._addListenersToDirty(row, col, 1, 1);
                }
                this.addListenersToDirtyForRow(calcService);
                while (calcService._heads[2]) {
                    var head = calcService._heads[2];

                    var reapted = false;
                    for (var i = 0; i < cachedHeadDirtyColumns.length; i++) {
                        if (cachedHeadDirtyColumns[i] === head) {
                            reapted = true;
                            break;
                        }
                    }
                    if (reapted) {
                        calcService._removeDirty(head, 2 );
                        continue;
                    }
                    else {
                        cachedHeadDirtyColumns[cachedHeadDirtyColumns.length] = head;
                    }

                    sheetSource = head._sourceModel;
                    var rowCount = sheetSource.rC();
                    for (var r = 0; r < rowCount; r++) {
                        calcService._addDirty(sheetSource._getCellCalc(r, head.column, true), 0 );
                    }
                    calcService._removeDirty(head, 2 );
                }
            }
        }
        else if (type === 3) {
            for (var nameID = calcService._heads[3]; nameID; nameID = nameID._nextDirty) {
                nameID._addListenersToDirty();
            }
        }
    };
    CalcSourceModel.prototype.initDelay = function (calcService, type) {
        if (type === 0) {
            var nextDirty = null;
            for (var cell = calcService._heads[0]; cell; cell = nextDirty) {
                if (cell._currentUsedDynamicCreatedRanges) {
                    linkCellRanges(calcService, cell, cell._currentUsedDynamicCreatedRanges, false );
                    delete cell._currentUsedDynamicCreatedRanges;
                }
                nextDirty = cell._nextDirty;
                var sheetSource = cell._sourceModel;
                var maxRowCount = sheetSource.rC();
                var maxColCount = sheetSource.cC();
                if (cell.row < maxRowCount && cell.column < maxColCount) {
                    if (exports.supportRowColumnFormula) {
                        var columnCalc = sheetSource._getColumnCalc(cell.column, false);
                        if (columnCalc) {
                            columnCalc.delay = 0;
                        }
                    }
                    cell.delay = 0;
                    delete cell._branchListenersDelay;
                }
                else {
                    calcService._removeDirty(cell, 0 );
                }
            }
        }
        else if (type === 3) {
            for (var nameID = calcService._heads[3]; nameID; nameID = nameID._nextDirty) {
                nameID.delay = 0;
            }
        }
    };
    CalcSourceModel.prototype.adjustDelayOfListeners = function (calcService, type, isIncrement) {
        if (type === 0) {
            for (var cell = calcService._heads[type]; cell; cell = cell._nextDirty) {
                var sheetSource = cell._sourceModel;
                var r = cell.row;
                var c = cell.column;
                var rowCalc = sheetSource._getRowCalc(r, false);
                var columnCalc = sheetSource._getColumnCalc(c, false);
                var rangesCalc = sheetSource._getRangeCalc(false);
                cell._adjustDelayOfListeners(isIncrement);
                if (rowCalc) {
                    rowCalc._adjustDelayOfListeners(isIncrement);
                }
                if (columnCalc) {
                    columnCalc._adjustDelayOfListeners(isIncrement);
                }
                if (rangesCalc) {
                    rangesCalc._adjustDelayOfListeners(r, c, isIncrement);
                }
            }
        }
        else if (type === 3) {
            for (var nameID = calcService._heads[3]; nameID; nameID = nameID._nextDirty) {
                nameID._adjustDelayOfListeners(isIncrement);
            }
        }
    };
    CalcSourceModel.prototype.calculateDirtyNodes = function (calcService, type) {
        if (calcService.calcOnDemand) {
            return false;
        }
        var progress = false;
        var sheetSource = null;
        var nextDirty;
        if (type === 0) {
            for (var cell = calcService._heads[type]; cell; cell = nextDirty) {
                nextDirty = cell._nextDirty;
                if (cell.delay <= 0) {
                    this._removeIterativeCalc(cell);
                    sheetSource = cell._sourceModel;
                    var r = cell.row;
                    var c = cell.column;
                    var rowCalc = sheetSource._getRowCalc(r, false);
                    var columnCalc = sheetSource._getColumnCalc(c, false);
                    if (columnCalc && columnCalc.delay) {
                        continue;
                    }
                    var rangesCalc = sheetSource._getRangeCalc(false);
                    var result = sheetSource.recalculateCell(r, c, !cell._pauseCount || cell._pauseCount < 9);
                    if (result && result.pause) {
                        cell._pauseCount = cell._pauseCount ? cell._pauseCount + 1 : 1;
                        if (result.branch) {
                            nextDirty = cell;
                            for (var j = 0; j < result.branch.length; j++) {
                                if (result.branch[j]._preDirty || result.branch[j]._nextDirty || result.branch[j] === cell) {
                                    cell.delay++;
                                    var branchCell = result.branch[j];
                                    branchCell._branchListenersDelay = branchCell._branchListenersDelay || [];
                                    branchCell._branchListenersDelay.push(cell);
                                }
                            }
                        }
                    }
                    else {
                        delete cell._pauseCount;
                        calcService._removeDirty(cell, 0 );
                        cell._adjustDelayOfListeners(false);
                        if (rowCalc) {
                            rowCalc._adjustDelayOfListeners(false);
                        }
                        if (columnCalc) {
                            columnCalc._adjustDelayOfListeners(false);
                        }
                        if (rangesCalc) {
                            rangesCalc._adjustDelayOfListeners(r, c, false);
                        }
                        var expr = cell.node && cell.node._expr;
                        if (expr && expr._isNewForIterativeCalc) {
                            delete expr._isNewForIterativeCalc;
                        }
                    }
                    progress = true;
                }
            }
        }
        else if (type === 3) {
            for (var nameID = calcService._heads[type]; nameID; nameID = nextDirty) {
                nextDirty = nameID._nextDirty;
                if (nameID.delay === 0) {
                    sheetSource = nameID._sourceModel;
                    sheetSource.recalculateNameID(nameID.name);
                    calcService._removeDirty(nameID, 3 );
                    nameID._adjustDelayOfListeners(false);
                    progress = true;
                }
            }
        }
        return progress;
    };
    CalcSourceModel.prototype.calculateIterations = function (calcService, type) {
        if (!calcService.calcOnDemand && type === 0) {
            var head = calcService._heads[type];
            if (head) {
                var cell = null;
                var moreIterations = true;
                if (!calcService.iterativeCalculation) {
                    for (cell = head; cell; cell = cell._nextDirty) {
                        var isNew = cell.node && cell.node._expr && cell.node._expr._isNewForIterativeCalc;
                        this._setIterativeCalc(cell, !isNew , 0);
                        if (isNew) {
                            cell.node._expr._isNewForIterativeCalc = keyword_undefined;
                        }
                    }
                }
                else {
                    for (var sourceName in calcService._sourceModels) {
                        if (calcService._sourceModels.hasOwnProperty(sourceName)) {
                            var src = calcService._sourceModels[sourceName].getSource();
                            src.clearValueCache && src.clearValueCache();
                        }
                    }
                    for (var i = 0; moreIterations && i < calcService.iterativeCalculationMaximumIterations; i++) {
                        moreIterations = false;

                        for (cell = head; cell; cell = cell._nextDirty) {
                            var isNew = cell.node && cell.node._expr && cell.node._expr._isNewForIterativeCalc;
                            this._setIterativeCalc(cell, !isNew , keyword_null);
                            if (isNew) {
                                cell.node._expr._isNewForIterativeCalc = keyword_undefined;
                            }
                            var formulaContext = cell._sourceModel;
                            var r = cell.row;
                            var c = cell.column;
                            var oldValue = formulaContext.getSource().getValue(r, c);
                            formulaContext.recalculateCell(r, c);
                            if (!moreIterations) {
                                var newValue = formulaContext.getSource().getValue(r, c);
                                if (!exports.approximatelyEqual(oldValue, newValue, calcService.iterativeCalculationMaximumChange)) {
                                    moreIterations = true;
                                }
                            }
                        }
                    }
                }
                var nextDirty = null;
                for (cell = head; cell; cell = nextDirty) {
                    nextDirty = cell._nextDirty;
                    cell._nextDirty = keyword_undefined;
                    if (nextDirty) {
                        nextDirty._preDirty = keyword_undefined;
                    }
                }
            }
        }
    };

    CalcSourceModel.prototype._dealWithExpression = function (exprCalc, row, column, expr, orgExpr, isAdd, contextSource) {
        var self = this, i, name, nameExpr, sheetNameCalc, refNameCalc;
        var rangeCalc;

        if (isAdd) {
            self._removeIterativeCalc(exprCalc);
        }
        while (expr.type === 12 ) {
            expr = expr.value;
        }
        while (expr.type === 10 ) {
            expr = expr.value;
        }
        while (expr.type === 12 ) {
            expr = expr.value;
        }
        if (orgExpr) {
            while (orgExpr.type === 12 ) {
                orgExpr = orgExpr.value;
            }
            while (orgExpr.type === 10 ) {
                orgExpr = orgExpr.value;
            }
            while (orgExpr.type === 12 ) {
                orgExpr = orgExpr.value;
            }
        }

        if (expr.type === 13 ) {
            var cellRange = expr.getRange(row, column, true);
            if (cellRange === keyword_null) {
                return;
            }
            if (cellRange.rowCount === 1 && cellRange.colCount === 1) {
                expr = referenceExpression_1._createCellExpression(keyword_null, keyword_null, cellRange.row, cellRange.col, false, false);
            }
            else {
                expr = referenceExpression_1._createRangeExpression(keyword_null, keyword_null, cellRange.row, cellRange.col, cellRange.row + cellRange.rowCount - 1, cellRange.col + cellRange.colCount - 1, false, false, false, false);
            }
        }
        var refRow, refColumn, refStartRow, refEndRow, refStartColumn, refEndColumn, refRowCount, refColumnCount, refCellCalc, refRowCalc, refColumnCalc, r, c;
        var sheetSource;
        var calcModel;
        if (orgExpr && orgExpr !== expr && (orgExpr.type === 8 )) {
            if (orgExpr.source instanceof calc_common_1.ErrorSource) {
                return;
            }


            name = orgExpr.value;

            sheetSource = (expr.source || orgExpr.source || contextSource || self._source);

            nameExpr = sheetSource.getCustomName(name);
            if (nameExpr) {
                calcModel = sheetSource.getCalcSourceModel();
            }
            else {
                calcModel = self._service.getGlobalSourceModel() || sheetSource.getCalcSourceModel();
                nameExpr = calcModel.getSource().getCustomName(name);
                if (!nameExpr) {
                    var nameCalc = sheetSource.getCalcSourceModel()._getNameCalc(name, true);

                    nameCalc._processListener(0 , exprCalc, isAdd);
                }
            }
            refNameCalc = calcModel._getNameCalc(name, true);

            refNameCalc._processListener(0 , exprCalc, isAdd);
            orgExpr = null;
            nameExpr && self._dealWithExpression(exprCalc, row, column, nameExpr, keyword_null, isAdd, calcModel.getSource());
        }
        if (expr.type === 1 && expr.endSource) {
            var sheetRangeExpr = expr;
            var sources = sheetRangeExpr.source.getSources(sheetRangeExpr.endSource);
            for (i = 0; i < sources.length; i++) {
                var subExpr = referenceExpression_1._createRangeExpression(sources[i], keyword_null, sheetRangeExpr.row, sheetRangeExpr.column, sheetRangeExpr.endRow, sheetRangeExpr.endColumn, sheetRangeExpr.rowRelative, sheetRangeExpr.columnRelative, sheetRangeExpr.endRowRelative, sheetRangeExpr.endColumnRelative, row, column);
                subExpr.isFullRow = sheetRangeExpr.isFullRow;
                subExpr.isFullColumn = sheetRangeExpr.isFullColumn;
                self._dealWithExpression(exprCalc, row, column, subExpr, keyword_null, isAdd);
            }
        }
        else if (expr.type === 1 ) {
            sheetSource = (expr.source !== calc_common_1.BangSource && expr.source || self._source);
            calcModel = sheetSource.getCalcSourceModel();
            if (!calcModel) {
                return;
            }
            var rangeExpr = expr;
            var isNotCellOrRange = exprCalc.row === keyword_undefined || exprCalc.column === keyword_undefined;
            var refRangeType = rangeExpr._getRangeType();
            var refRange = referenceExpression_1.getRangeForReference(rangeExpr, row, column);
            refStartRow = refRange.row;
            refStartColumn = refRange.col;
            refRowCount = refRange.rowCount;
            refColumnCount = refRange.colCount;
            refEndRow = refStartRow + refRowCount - 1;
            refEndColumn = refStartColumn + refColumnCount - 1;
            if (refRangeType === 0 ) {
                if (0 <= row && 0 <= column) {
                    if (shouldUseRange(refRow, refColumn, refRowCount, refColumnCount)) {
                        rangeCalc = calcModel._getRangeCalc(true);
                        if (isNotCellOrRange) {
                            rangeCalc._processIDListerner(refStartRow, refStartColumn, refRowCount, refColumnCount, exprCalc, isAdd);
                        }
                        else {
                            rangeCalc._processCellListener(refStartRow, refStartColumn, refRowCount, refColumnCount, exprCalc, isAdd);
                        }
                    }
                    else {
                        for (r = refStartRow; r <= refEndRow; r++) {
                            for (c = refStartColumn; c <= refEndColumn; c++) {
                                refCellCalc = calcModel._getCellCalc(r, c, true);
                                if (isNotCellOrRange) {
                                    refCellCalc && refCellCalc._processListener(3 , exprCalc, isAdd);
                                }
                                else {
                                    refCellCalc && refCellCalc._processListener(0 , exprCalc, isAdd);
                                }
                            }
                        }
                    }
                }
                else if (0 <= row && column === -1) {
                    for (r = refStartRow; r <= refEndRow; r++) {
                        for (c = refStartColumn; c <= refEndColumn; c++) {
                            if (rangeExpr.columnRelative || rangeExpr.endColumnRelative) {
                                refRowCalc = calcModel._getRowCalc(r, true);
                                if (refRowCalc) {
                                    refRowCalc._processRowListener2(exprCalc.row, -c, isAdd);
                                }
                            }
                            else {
                                refCellCalc = calcModel._getCellCalc(r, c, true);
                                if (refCellCalc) {
                                    refCellCalc._processListener(1 , exprCalc, isAdd);
                                }
                            }
                        }
                    }
                }
                else if (0 <= column && row === -1) {
                    for (r = refStartRow; r <= refEndRow; r++) {
                        for (c = refStartColumn; c <= refEndColumn; c++) {
                            if (rangeExpr.rowRelative || rangeExpr.endRowRelative) {
                                refColumnCalc = calcModel._getColumnCalc(c, true);
                                refColumnCalc && refColumnCalc._processColumnListener2(exprCalc, -r, isAdd);
                            }
                            else {
                                refCellCalc = calcModel._getCellCalc(r, c, true);

                                refCellCalc && refCellCalc._processListener(2 , exprCalc, isAdd);
                            }
                        }
                    }
                }
            }
            else if (refRangeType === 1 ) {
                if (0 <= row && 0 <= column) {
                    rangeCalc = calcModel._getRangeCalc(true);
                    if (isNotCellOrRange) {
                        rangeCalc._processIDListerner(refStartRow, refStartColumn, refRowCount, refColumnCount, exprCalc, isAdd);
                    }
                    else {
                        rangeCalc._processCellListener(refStartRow, refStartColumn, refRowCount, refColumnCount, exprCalc, isAdd);
                    }
                }
                else if (0 <= row && column === -1) {

                }
                else if (row === -1 && 0 <= column) {
                    if (rangeExpr.rowRelative || rangeExpr.endRowRelative) {

                    }
                    else {
                        refStartRow = rangeExpr.row;
                        refEndRow = rangeExpr.endRow;
                        for (r = refStartRow; r <= refEndRow; r++) {
                            refRowCalc = calcModel._getRowCalc(r, true);

                            refRowCalc && refRowCalc._processListener(2 , exprCalc, isAdd);
                        }
                    }
                }
            }
            else if (refRangeType === 2 ) {
                if (0 <= row && 0 <= column) {
                    rangeCalc = calcModel._getRangeCalc(true);
                    if (isNotCellOrRange) {
                        rangeCalc._processIDListerner(refStartRow, refStartColumn, refRowCount, refColumnCount, exprCalc, isAdd);
                    }
                    else {
                        rangeCalc._processCellListener(refStartRow, refStartColumn, refRowCount, refColumnCount, exprCalc, isAdd);
                    }
                }
                else if (0 <= row && column === -1) {

                }
                else if (row === -1 && 0 <= column) {
                    for (c = refStartColumn; c <= refEndColumn; c++) {
                        refColumnCalc = calcModel._getColumnCalc(c, true);

                        refColumnCalc && refColumnCalc._processListener(2 , exprCalc, isAdd);
                    }
                }
            }
        }
        else if (expr.type === 9 ) {
            self._dealWithExpression(exprCalc, row, column, expr.value, orgExpr && orgExpr.type === 9 && orgExpr.value, isAdd);
            if (expr.value2) {
                self._dealWithExpression(exprCalc, row, column, expr.value2, orgExpr && orgExpr.type === 9 && orgExpr.value2, isAdd);
            }
        }
        else if (expr.type === 8 ) {
            sheetSource = (expr.source || contextSource || self._source);
            name = toUpperCase(expr.value);
            nameExpr = sheetSource.getCustomName(name);
            if (nameExpr) {
                calcModel = sheetSource.getCalcSourceModel();
            }
            else {
                calcModel = self._service.getGlobalSourceModel() || sheetSource.getCalcSourceModel();
                nameExpr = calcModel.getSource().getCustomName(name);
                if (!nameExpr) {
                    sheetNameCalc = sheetSource.getCalcSourceModel()._getNameCalc(name, true);

                    sheetNameCalc._processListener(0 , exprCalc, isAdd);
                }
            }
            refNameCalc = calcModel._getNameCalc(name, true);
            if (!refNameCalc) {
                return;
            }

            refNameCalc._processListener(0 , exprCalc, isAdd);

            nameExpr && self._dealWithExpression(exprCalc, row, column, nameExpr, keyword_null, isAdd, calcModel.getSource());
        }
        else if (expr.type === 7 ) {
            var func = expr.function;
            if (func) {
                if (func.isVolatile()) {
                    if (isAdd) {
                        self._setVolatile(exprCalc);
                    }
                    else {
                        self._removeVolatile(exprCalc);
                    }
                }
                if (func.name === 'GETPIVOTDATA') {
                    if (isAdd) {
                        self._setPivotDataCell(exprCalc);
                    }
                    else {
                        self._removePivotDataCell(exprCalc);
                    }
                }
                if (func instanceof calc_common_1.Functions.AsyncFunction) {
                    self._service._hasAsync = true;
                }
            }
            var argCount = expr.arguments.length;
            for (i = 0; i < argCount; i++) {
                if (func && func.skipPrecedent(i)) {
                    continue;
                }
                var needPopBranchStack = false;
                if (func && func.isBranch() && func.findTestArgument() !== i && exprCalc instanceof CellCalc) {
                    expr._haveBranchFunction = true;
                    expr._branchArgumentListener = expr._branchArgumentListener || [];
                    expr._branchArgumentListener[i] = [];
                    needPopBranchStack = true;
                    exprCalc._branchStackCache = exprCalc._branchStackCache || [];
                    exprCalc._branchStackCache.push(expr._branchArgumentListener[i]);
                }
                self._dealWithExpression(exprCalc, row, column, expr.arguments[i], orgExpr && orgExpr.type === 7 && orgExpr.arguments[i], isAdd);
                if (needPopBranchStack) {
                    exprCalc._branchStackCache.pop();
                }
            }
        }
        else if (expr.type === 25 || expr.type === 26 ) {
            var nameIDExpr = expr;
            sheetSource = (expr.source || self._source);
            calcModel = sheetSource.getCalcSourceModel();
            var refNameIDCalc = calcModel._getNameIDCalc(nameIDExpr.value, true);
            if (!refNameIDCalc) {
                return;
            }
            refNameIDCalc._processListener(0 , exprCalc, isAdd);
        }
        else if (expr.type === 33 ) {
            var spillRefExpression = expr;
            if (!spillRefExpression.isReferenceError) {
                sheetSource = (spillRefExpression.source || spillRefExpression.contextSource || self._source);
                calcModel = sheetSource.getCalcSourceModel();

                var refRange = referenceExpression_1.getRangeForReference(spillRefExpression, row, column);
                refCellCalc = calcModel._getCellCalc(refRange.row, refRange.col, true);
                refCellCalc && refCellCalc._processListener(0 , exprCalc, isAdd);
            }
        }
    };
    CalcSourceModel.prototype._dealWithNameIDExpression = function (name, isAdd) {
        var node = this.getNodeByName(name);
        if (node && (node._workingExpr || node._expr)) {
            this._dealWithExpression(this._getNameIDCalc(name), 0, 0, node._workingExpr || node._expr, node._expr, isAdd);
        }
    };
    CalcSourceModel.prototype._dealWithCellExpression = function (row, column, rowCount, columnCount, isAdd) {
        var self = this;
        var endRow = row + rowCount, endCol = column + columnCount;
        var workingExpr, expr, arrayInfo;
        for (var r = row; r < endRow; r++) {
            for (var c = column; c < endCol; c++) {
                workingExpr = self._getWorkingExpr(r, c);
                expr = self._getExpr(r, c);
                if (workingExpr || expr) {
                    arrayInfo = self._getArrayInfo(r, c);
                    var cellCalc = self._getCellCalc(r, c);
                    if (arrayInfo && arrayInfo.isDynamicArray !== true) {
                        self._dealWithExpression(cellCalc, arrayInfo.row, arrayInfo.col, workingExpr || expr, expr, isAdd);
                    }
                    else {
                        self._dealWithExpression(cellCalc, r, c, workingExpr || expr, expr, isAdd);
                    }
                    if (!isAdd) {
                        if (cellCalc._currentUsedDynamicCreatedRanges) {
                            linkCellRanges(cellCalc._getCalcService(), cellCalc, cellCalc._currentUsedDynamicCreatedRanges, false, false);
                        }
                    }
                }
            }
        }
    };
    CalcSourceModel.prototype._dealWithColumnExpression = function (col, colCount, isAdd) {
        var endCol = col + colCount;
        for (var c = col; c !== -1 && c < endCol; c++) {
            var expr = this.getColumnExpression(c);
            if (expr) {
                this._dealWithExpression(this._getColumnCalc(c, false), -1, c, expr, expr, isAdd);
            }
        }
    };
    CalcSourceModel.prototype._linkCellExpression = function (row, column, rowCount, columnCount) {
        this._dealWithCellExpression(row, column, rowCount, columnCount, true);
    };
    CalcSourceModel.prototype._unlinkCellExpression = function (row, column, rowCount, columnCount) {
        this._dealWithCellExpression(row, column, rowCount, columnCount, false);
    };
    CalcSourceModel.prototype._linkRowExpression = function (row, rowCount) {
    };
    CalcSourceModel.prototype._unlinkRowExpression = function (row, rowCount) {
    };
    CalcSourceModel.prototype._linkColumnExpression = function (col, colCount) {
        this._dealWithColumnExpression(col, colCount, true);
    };
    CalcSourceModel.prototype._unlinkColumnExpression = function (col, colCount) {
        this._dealWithColumnExpression(col, colCount, false);
    };
    CalcSourceModel.prototype._iterateEachCell = function (row, column, rowCount, columnCount, setAdjust, setDirty, changeInfo) {
        var endRow = row + rowCount, endCol = column + columnCount;
        var self = this;
        for (var r = row; r < endRow; r++) {
            for (var c = column; c < endCol; c++) {
                var cellCalc = this._getCellCalc(r, c, false);
                if (cellCalc) {
                    self._backupNodeItem(changeInfo, r, c);
                    if (setAdjust) {
                        cellCalc._addListenersToAdjust();
                    }
                    if (setDirty) {
                        cellCalc._addListenersToDirty();
                    }
                }
            }
        }
    };
    CalcSourceModel.prototype._iterateEachRow = function (row, rowCount, setAdjust, setDirty, changeInfo) {
        var self = this;
        var rowData = self._rowDataArray;
        if (row !== -1 && rowData) {
            var maxRow = Math_min(row + rowCount, rowData.length);
            for (var r = row; r < maxRow; r++) {
                var node = rowData[r];
                if (!node || !node.calc) {
                    continue;
                }
                self._backupNodeItem(changeInfo, r, -1);
                var rowCalc = node.calc;
                if (setAdjust) {
                    rowCalc._addListenersToAdjust();
                }
                if (setDirty) {
                    rowCalc._addListenersToDirty();
                }
            }
        }
    };
    CalcSourceModel.prototype._iterateEachColumn = function (column, columnCount, setAdjust, setDirty, changeInfo) {
        var self = this;
        var columnData = self._columnDataArray;
        if (column !== -1 && columnData) {
            var maxCol = Math_min(column + columnCount, columnData.length);
            for (var c = column; c < maxCol; c++) {
                var node = columnData[c];
                if (!node || !node.calc) {
                    continue;
                }
                self._backupNodeItem(changeInfo, -1, c);
                var columnCalc = node.calc;
                if (setAdjust) {
                    columnCalc._addListenersToAdjust();
                }
                if (setDirty) {
                    columnCalc._addListenersToDirty();
                }
            }
        }
    };
    CalcSourceModel.prototype._addDependents = function (row, column, rowCount, columnCount, setAdjust, setDirty, needSaveChanges) {
        if (setAdjust || setDirty) {
            var self_1 = this;
            var calcChangInfo = void 0;
            if (needSaveChanges) {
                calcChangInfo = self_1._getChangesForCalcEngine();
            }
            if (0 <= row && 0 <= column) {
                self_1._iterateEachCell(row, column, rowCount, columnCount, setAdjust, setDirty, calcChangInfo);
                self_1._iterateEachRow(row, rowCount, setAdjust, setDirty, calcChangInfo);
                self_1._iterateEachColumn(column, columnCount, setAdjust, setDirty, calcChangInfo);
                if (self_1._rangeCalc) {
                    if (setAdjust) {
                        self_1._rangeCalc._addListenersToAdjust(row, column, rowCount, columnCount);
                    }
                    if (setDirty) {
                        self_1._rangeCalc._addListenersToDirty(row, column, rowCount, columnCount);
                    }
                }
            }
            else if (0 <= row && column === -1) {
                self_1._iterateEachCell(row, 0, rowCount, self_1.cC(), setAdjust, setDirty, calcChangInfo);
                self_1._iterateEachRow(row, rowCount, setAdjust, setDirty, calcChangInfo);
                if (self_1._rangeCalc) {
                    if (setAdjust) {
                        self_1._rangeCalc._addListenersToAdjust(row, column, rowCount, columnCount);
                    }
                    if (setDirty) {
                        self_1._rangeCalc._addListenersToDirty(row, column, rowCount, columnCount);
                    }
                }
            }
            else if (row === -1 && 0 <= column) {
                self_1._iterateEachCell(0, column, self_1.rC(), columnCount, setAdjust, setDirty, calcChangInfo);
                self_1._iterateEachColumn(column, columnCount, setAdjust, setDirty, calcChangInfo);

                if (self_1._rangeCalc) {
                    if (setAdjust) {
                        self_1._rangeCalc._addListenersToAdjust(row, column, rowCount, columnCount);
                    }
                    if (setDirty) {
                        self_1._rangeCalc._addListenersToDirty(row, column, rowCount, columnCount);
                    }
                }
            }
            else if (row === -1 && column === -1) {
                var rc = self_1.rC(), cc = self_1.cC();
                self_1._iterateEachCell(0, 0, rc, cc, setAdjust, setDirty, calcChangInfo);
                self_1._iterateEachRow(0, rc, setAdjust, setDirty, calcChangInfo);
                self_1._iterateEachColumn(0, cc, setAdjust, setDirty, calcChangInfo);

                if (self_1._rangeCalc) {
                    if (setAdjust) {
                        self_1._rangeCalc._addListenersToAdjust(row, column, rowCount, columnCount);
                    }
                    if (setDirty) {
                        self_1._rangeCalc._addListenersToDirty(row, column, rowCount, columnCount);
                    }
                }
            }
        }
    };
    CalcSourceModel.prototype.getAllNodes = function () {
        var nodes = [], cells = this.dataTable, rows = this._rowDataArray, cols = this._columnDataArray, sheet = this._defaultDataNode, node, key;
        if (sheet) {
            nodes.push(sheet);
        }
        for (key in rows) {
            if (rows.hasOwnProperty(key)) {
                node = rows[key];
                if (node) {
                    nodes.push(node);
                }
            }
        }
        for (key in cols) {
            if (cols.hasOwnProperty(key)) {
                node = cols[key];
                if (node) {
                    nodes.push(node);
                }
            }
        }
        for (var rowKey in cells) {
            if (cells.hasOwnProperty(rowKey)) {
                var rowNode = cells[rowKey];
                if (rowNode) {
                    for (key in rowNode) {
                        if (rowNode.hasOwnProperty(key)) {
                            node = rowNode[key];
                            if (node) {
                                nodes.push(node);
                            }
                        }
                    }
                }
            }
        }
        return nodes;
    };
    CalcSourceModel.prototype.toJSON = function (data) {
        if (!exports.supportRowColumnFormula) {
            this._source.toJSON(data, this.dataTable, this._lastNonNullRow, this._lastNonNullColumn);
        }
        else {
            this._source.toJSON(data, this.dataTable, this._lastNonNullRow, this._lastNonNullColumn, this._columnDataArray);
        }
    };
    return CalcSourceModel;
}());
exports.CalcSourceModel = CalcSourceModel;
var CellCalc = (function (_super) {
    __extends(CellCalc, _super);
    function CellCalc(sourceModel, row, column) {
        var _this = _super.call(this, sourceModel) || this;
        _this.row = row;
        _this.column = column;
        _this.delay = 0;
        return _this;
    }
    CellCalc.prototype.getKey = function () {
        var self = this;
        var sourceModel = self._sourceModel;
        var sourceName = sourceModel === null ? '' : sourceModel._source.id + ',';
        return sourceName + self.row + ',' + self.column;
    };
    CellCalc.prototype._startListening = function () {
        var self = this;
        self._sourceModel._linkCellExpression(self.row, self.column, 1, 1);
    };
    CellCalc.prototype._stopListening = function () {
        var self = this;
        self._sourceModel._unlinkCellExpression(self.row, self.column, 1, 1);
    };
    CellCalc.prototype._addToAdjust = function () {
        this._sourceModel._getCalcServiceInternal().onAddAdjust(this, 0 );
    };
    CellCalc.prototype._addToDirty = function () {
        this._sourceModel._getCalcServiceInternal()._addDirty(this, 0 );
    };
    CellCalc.prototype._addListenersToDirty = function () {
        var calcService = this._sourceModel._getCalcServiceInternal();
        var listeners = this._listeners, calc;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = this[listeners[lIndex]];
            if (cls) {
                for (var key in cls) {
                    if (cls.hasOwnProperty(key)) {
                        calc = cls[key];
                        if (calc && !calc._preDirty && !calc._nextDirty) {
                            calc._addToDirty();
                        }
                        if (calcService.calcOnDemand && calc && !calc._dirty) {
                            calc._dirty = true;
                            calc._addListenersToDirty();
                        }
                    }
                }
            }
        }
        var arrayInfo = this.node && this.node._arrayInfo;
        if (arrayInfo && arrayInfo.isDynamicArray) {
            for (var i = 0; i < arrayInfo.rowCount; i++) {
                for (var j = 0; j < arrayInfo.colCount; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    var node = this._sourceModel.getNode(i + arrayInfo.row, j + arrayInfo.col);
                    node && node.calc && node.calc._addListenersToDirty();
                }
            }
        }
    };
    CellCalc.prototype._setAsyncFunctionNodeNeedRecalculate = function () {
        var self = this;
        var sourceModel = self._sourceModel, calcService = sourceModel.getCalcService();
        if (calcService && calcService._hasAsync) {
            var hasAsync = self._hasAsync, asyncFunctionNode = hasAsync && self._asyncNode;
            if (!asyncFunctionNode && isNullOrUndefined(hasAsync)) {
                var sheetSource = sourceModel.getSource();
                if (sheetSource) {
                    var sheetName = sheetSource.getName();
                    var asyncManager = calcService._evaluator.asyncManager;
                    var nodes = asyncManager._nodes[sheetName];


                    if (nodes) {
                        var rowNode = nodes[self.row];
                        if (rowNode) {
                            var colItem = rowNode[self.column];
                            if (colItem) {
                                asyncFunctionNode = colItem[0];
                                if (asyncFunctionNode) {
                                    self._hasAsync = true;
                                    self._asyncNode = asyncFunctionNode;
                                    asyncFunctionNode._calc = self;
                                }
                                else {
                                    self._hasAsync = false;
                                }
                            }
                        }
                    }
                }
            }
            if (asyncFunctionNode && asyncFunctionNode.evaluateMode === 0 ) {
                asyncFunctionNode._hasResult = false;
            }
        }
    };
    return CellCalc;
}(BaseCalc));
exports.CellCalc = CellCalc;
function addListenerImp(obj, prop, item) {
    if (!obj[prop]) {
        obj[prop] = [];
    }
    obj[prop].push(item);
}
function removeListenerImp(obj, prop, item) {
    var collection = obj[prop];
    if (collection) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i] === item) {
                collection.splice(i, 1);
                return;
            }
        }
    }
}
var RowCalc = (function (_super) {
    __extends(RowCalc, _super);
    function RowCalc(sourceModel, row) {
        var _this = _super.call(this, sourceModel) || this;
        _this.row = row;
        return _this;
    }
    RowCalc.prototype.getKey = function () {
        var self = this;
        var sourceModel = self._sourceModel;
        var sourceName = sourceModel === null ? '' : sourceModel._source.id + ',';
        return sourceName + self.row + ',-1';
    };
    RowCalc.prototype._startListening = function () {
        this._sourceModel._linkRowExpression(this.row, 1);
    };
    RowCalc.prototype._stopListening = function () {
        this._sourceModel._unlinkRowExpression(this.row, 1);
    };
    RowCalc.prototype._processRowListener2 = function (row, columnOffset, isAdd) {
        if (isAdd) {
            addListenerImp(this, rowSliceListeners, { row: row, columnOffset: columnOffset, columnCount: 1 });
        }
        else {
            removeListenerImp(this, rowSliceListeners, { row: row, columnOffset: columnOffset, columnCount: 1 });
        }
    };
    RowCalc.prototype._addToAdjust = function () {
        this._sourceModel._getCalcServiceInternal().onAddAdjust(this, 1 );
    };
    RowCalc.prototype._addToDirty = function () {
        this._sourceModel._getCalcServiceInternal()._addDirty(this, 1 );
    };
    return RowCalc;
}(BaseCalc));
exports.RowCalc = RowCalc;
var ColumnCalc = (function (_super) {
    __extends(ColumnCalc, _super);
    function ColumnCalc(sourceModel, column) {
        var _this = _super.call(this, sourceModel) || this;
        _this.column = column;
        return _this;
    }
    ColumnCalc.prototype.getKey = function () {
        var self = this;
        var sourceModel = self._sourceModel;
        var sourceName = sourceModel === null ? '' : sourceModel._source.id + ',';
        return sourceName + '-1,' + self.column;
    };
    ColumnCalc.prototype._startListening = function () {
        this._sourceModel._linkColumnExpression(this.column, 1);
    };
    ColumnCalc.prototype._stopListening = function () {
        this._sourceModel._unlinkColumnExpression(this.column, 1);
    };
    ColumnCalc.prototype._processColumnListener2 = function (column, rowOffset, isAdd) {
        this._processListener(2 , column, isAdd);
    };
    ColumnCalc.prototype._addToAdjust = function () {
        this._sourceModel._getCalcServiceInternal().onAddAdjust(this, 2 );
    };
    ColumnCalc.prototype._addToDirty = function () {
        this._sourceModel._getCalcServiceInternal()._addDirty(this, 2 );
    };
    return ColumnCalc;
}(BaseCalc));
exports.ColumnCalc = ColumnCalc;

var NameCalc = (function (_super) {
    __extends(NameCalc, _super);
    function NameCalc(sourceModel, name) {
        var _this = _super.call(this, sourceModel) || this;
        _this.name = name;
        return _this;
    }
    NameCalc.prototype.getKey = function () {
        var self = this;
        var sourceModel = self._sourceModel;
        var sourceName = sourceModel === null ? '' : sourceModel._source.id + ',';
        return sourceName + self.name;
    };
    NameCalc.prototype.updateListening = function (stop, start) {
        var self = this;
        var listeners = self._listeners, calc, node;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = self[listeners[lIndex]];
            if (cls) {
                var clsArray = [];
                for (var key in cls) {
                    if (cls.hasOwnProperty(key)) {
                        calc = cls[key];
                        calc && (clsArray.push(calc));
                    }
                }
                var cLength = clsArray.length;
                for (var i = 0; i < cLength; i++) {
                    calc = clsArray[i];


                    node = calc.node;
                    calc._stopListening();
                    if (node && (!node._arrayInfo || node._arrayInfo.row === calc.row && node._arrayInfo.col === calc.column)) {
                        calc._sourceModel._setExpression(calc.row, calc.column, node._expr, node._arrayInfo, true);
                    }
                }
            }
        }
    };
    NameCalc.prototype.updateListeningOnRemoved = function () {
        var self = this;
        var listeners = self._listeners, calc, depModel, row, col, expr, baseModel = self._sourceModel, service = baseModel._getCalcServiceInternal();
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = self[listeners[lIndex]];
            if (cls) {
                for (var key in cls) {
                    if (cls.hasOwnProperty(key)) {
                        calc = cls[key];
                        if (calc) {
                            depModel = calc._sourceModel;
                            row = calc.row;
                            col = calc.col;
                            row = row === keyword_undefined ? -1 : row;
                            col = col === keyword_undefined ? -1 : col;
                            expr = depModel._getExpr(row, col);
                            var baseRange = depModel._getArrayInfo(row, col);
                            if (expr) {
                                var newExpr = service._getOperatorAdjustor().adjustFormulaOnRemoveName(baseModel, expr, self.name);
                                if (newExpr !== expr) {
                                    depModel._setExpression(row, col, newExpr, baseRange, true);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    NameCalc.prototype._addToDirty = function () {
        var listeners = this._listeners, calc;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = this[listeners[lIndex]];
            if (cls) {
                for (var key in cls) {
                    if (cls.hasOwnProperty(key)) {
                        calc = cls[key];
                        calc && calc._addToDirty();
                    }
                }
            }
        }
    };
    return NameCalc;
}(BaseCalc));
exports.NameCalc = NameCalc;
var RangeCalc = (function (_super) {
    __extends(RangeCalc, _super);
    function RangeCalc(sourceModel) {
        return _super.call(this, sourceModel) || this;
    }
    RangeCalc.prototype.processListener = function (listenerType, row, column, rowCount, columnCount, listener, isAdd, isDynamic) {
        var self = this, caches = self[listenerType], key = row + ',' + column + ',' + rowCount + ',' + columnCount, list, i;
        if (listenerType === 3 && !(listener instanceof NameIDCalc)) {
            return;
        }
        if (listener._branchStackCache && listener._branchStackCache.length >= 1) {
            var stack = listener._branchStackCache;
            var top_2 = stack[stack.length - 1];
            top_2.push(this);
            key = '?' + key;
        }
        if (isDynamic) {
            key = '!' + key;
        }
        if (!caches) {
            self._listeners.push(listenerType);
            self[listenerType] = caches = {};
        }
        list = caches[key];
        if (!list) {
            if (!isAdd) {
                return;
            }
            list = caches[key] = {};
            list.content = {};
            list.length = 0;
            list.row = row;
            list.col = column;
            list.rowCount = rowCount;
            list.colCount = columnCount;
        }
        var listenerID = listener.getKey();
        if (isAdd) {
            if (list.content[listenerID]) {
                return;
            }
            else {
                list.content[listenerID] = listener;
                list.length++;
            }
        }
        else {
            if (list.content[listenerID]) {
                delete list.content[listenerID];
                list.length--;
                if (list.length < 1) {
                    delete list.content;
                    delete caches[key];
                }
            }
        }


        self.clearListenersCache();
    };
    RangeCalc.prototype._processCellListener = function (row, column, rowCount, columnCount, listener, isAdd, isDynamic) {
        this.processListener(0 , row, column, rowCount, columnCount, listener, isAdd, isDynamic);
    };
    RangeCalc.prototype._processIDListerner = function (row, column, rowCount, columnCount, listener, isAdd) {
        this.processListener(3 , row, column, rowCount, columnCount, listener, isAdd);
    };
    RangeCalc.prototype._addListenersToAdjust = function (row, column, rowCount, columnCount) {
        this.visit(0 , row, column, rowCount, columnCount);
    };
    RangeCalc.prototype.clearListenersCache = function () {
        var listeners = this._listeners;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            delete this[listeners[lIndex] + 'cached'];
        }
    };
    RangeCalc.prototype.getListeners = function (listeners, lIndex) {
        var name = listeners[lIndex];
        var cls = this[name], cached;
        if (cls) {
            var cacheItemKey = name + 'cached';
            cached = this[cacheItemKey];
            if (!cached) {
                cached = this[cacheItemKey] = new Common_1.Common.rbush(16);
                for (var rangeKey in cls) {
                    if (cls.hasOwnProperty(rangeKey)) {
                        var list = cls[rangeKey];
                        if (list) {
                            cached.insert({
                                minX: list.col,
                                minY: list.row,
                                maxX: list.col + list.colCount - 1,
                                maxY: list.row + list.rowCount - 1,
                                item: list
                            });
                        }
                    }
                }
            }
        }
        return cached;
    };
    RangeCalc.prototype.visit = function (action , row, column, rowCount, columnCount) {
        var listeners = this._listeners;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = this[listeners[lIndex]];
            if (cls) {
                var cachedListeners = this.getListeners(listeners, lIndex);
                var nodes = cachedListeners.search({ minX: column, minY: row, maxX: column + columnCount - 1, maxY: row + rowCount - 1 });
                for (var i = 0; i < nodes.length; i++) {
                    var content = nodes[i].item.content;
                    for (var key in content) {
                        var calc = content[key];
                        if (action === 0 ) {
                            calc._addToAdjust();
                        }
                        else {
                            calc._addToDirty();
                        }
                    }
                }
            }
        }
    };
    RangeCalc.prototype._addListenersToDirty = function (row, column, rowCount, columnCount) {
        this.visit(1 , row, column, rowCount, columnCount);
    };
    RangeCalc.prototype._adjustDelayOfListeners = function (row, column, isIncrement) {
        var listeners = this._listeners, range, increment = isIncrement ? 1 : -1;
        for (var lIndex = 0; lIndex < listeners.length; lIndex++) {
            var cls = this[listeners[lIndex]];
            if (cls) {
                var cachedListeners = this.getListeners(listeners, lIndex);
                var nodes = cachedListeners.search({ minX: column, minY: row, maxX: column, maxY: row });
                for (var i = 0; i < nodes.length; i++) {
                    var content = nodes[i].item.content;
                    for (var key in content) {
                        var calc = content[key];
                        if (_isInstanceOf(calc, BaseCalc)) {
                            calc.delay += increment;
                        }
                    }
                }
            }
        }
    };
    RangeCalc.prototype._startListening = function () {
    };
    RangeCalc.prototype._stopListening = function () {
    };
    return RangeCalc;
}(BaseCalc));
exports.RangeCalc = RangeCalc;
function stopListeningOfCollection(collection, isTwoLevels) {
    for (var key in collection) {
        var node = collection[key];
        if (node) {
            if (isTwoLevels) {
                stopListeningOfCollection(node);
            }
            else {
                var calc = node.calc;
                if (calc) {
                    calc._stopListening();
                }
            }
        }
    }
}
function _isLetFunction(stack) {
    var result = false;
    for (var i = 0; i < stack.length; i++) {
        var e = stack[i].expr;
        if (e && e.type === 7 && e.functionName === 'LET') {
            return true;
        }
    }
    return result;
}
function _mappingArrayOld(context, expr, isArrayFormula, offsetRow, offsetCol, resultArray, resultReference) {
    var baseRow = context.row, baseColumn = context.column, stack = [], stackIndex = 0;
    var activeRow = context.arrayIdentity ? context.arrayIdentity.row : baseRow, activeCol = context.arrayIdentity ? context.arrayIdentity.col : baseColumn;
    stack[stackIndex] = {
        expr: expr,
        acceptsArray: resultArray || false,
        acceptsRef: resultReference || false,
        index: -1
    };
    var expendCount = 0;
    var nameCount = 0;
    var _currentIndexneedExpend = false;
    var _tmpArrayExpr;
    var _rowOffset = offsetRow;
    var _colOffset = offsetCol;
    var _arrayArgumentEvaluateMode = false;
    var currentNode, acceptsArray, acceptsReference, newExpr, argExpr, range, source, maxRowCount, maxColCount, row, col, neeedExpendindexs;
    while (stackIndex >= 0) {
        currentNode = stack[stackIndex];
        stackIndex--;
        acceptsArray = currentNode.acceptsArray;
        acceptsReference = currentNode.acceptsRef;
        expr = currentNode.expr;
        newExpr = keyword_null;
        if (!expr) {

        }
        else if (expr.type === 7 ) {
            var funcExpr = expr;
            var argCount = funcExpr.arguments.length;
            if (!funcExpr.function) {
                if (!context) {
                    newExpr = calc_common_1._createErrorExpression(CalcErrorsName);
                    continue;
                }
                else {
                    funcExpr.function = context.getFunction(funcExpr.functionName);
                }
            }
            var func = funcExpr.function;
            var argIndex = currentNode.index;
            neeedExpendindexs = currentNode.neeedExpendindexs;
            if (argIndex < 0) {
                currentNode.arrayArgumentEvaluateMode = _arrayArgumentEvaluateMode;
                currentNode.arrayFormulaCatchValue = isArrayFormula;
                if (func && func.arrayArgumentEvaluateMode) {
                    _arrayArgumentEvaluateMode = func.arrayArgumentEvaluateMode;
                }
                currentNode.args = [];
            }
            else {
                if (func && func.acceptsArray(argIndex)) {
                    expendCount--;
                }
                else if (_currentIndexneedExpend) {
                    if (!neeedExpendindexs) {
                        neeedExpendindexs = [];
                        currentNode.neeedExpendindexs = neeedExpendindexs;
                    }
                    if (funcExpr.arguments[argIndex] !== argExpr) {

                    }
                    neeedExpendindexs.push(argIndex);
                }
                currentNode.args.push(argExpr);
            }
            if (argIndex === argCount - 1) {
                _arrayArgumentEvaluateMode = currentNode.arrayArgumentEvaluateMode;
                isArrayFormula = currentNode.arrayFormulaCatchValue;
                var args = currentNode.args;
                var argsChanged = false;
                if (args && args.length > 0) {
                    for (var argI = 0; argI < args.length; argI++) {
                        if (args[argI] !== funcExpr.arguments[argI]) {
                            argsChanged = true;
                            break;
                        }
                    }
                }
                if (argsChanged) {
                    newExpr = calc_common_1._createFunctionExpression(funcExpr, args);
                }
                else {
                    newExpr = expr;
                }
                if (neeedExpendindexs && neeedExpendindexs.length > 0) {
                    newExpr = calc_common_1.createExpandExpression(newExpr, neeedExpendindexs);
                    _currentIndexneedExpend = true;
                }
            }
            else {
                if (argIndex === 0 && func && func.arrayArgumentEvaluateMode === 3 && _arrayArgumentEvaluateMode === 3 ) {
                    _arrayArgumentEvaluateMode = 0;
                }
                _currentIndexneedExpend = false;
                argIndex++;
                currentNode.index = argIndex;
                if (func && func.acceptsArray(argIndex)) {
                    expendCount++;
                }
                ++stackIndex;
                stack[stackIndex] = currentNode;
                ++stackIndex;
                stack[stackIndex] = {
                    expr: funcExpr.arguments[argIndex],
                    acceptsArray: !!func && func.acceptsArray(argIndex),
                    acceptsRef: !!func && func.acceptsReference(argIndex),
                    index: -1
                };
            }
        }
        else if (expr.type === 1 && expr._isCell()) {
            if (nameCount) {
                source = expr.source !== calc_common_1.BangSource && expr.source || context.source;
                maxRowCount = source.getRowCount();
                maxColCount = source.getColumnCount();
                row = expr.rowRelative ? (expr.row + activeRow) % calc_common_1.MAX_ROW_COUNT % maxRowCount : expr.row;
                col = expr.columnRelative ? (expr.column + activeCol) % calc_common_1.MAX_COLUMN_COUNT % maxColCount : expr.column;
                row = row < 0 ? row + maxRowCount : row;
                col = col < 0 ? col + maxColCount : col;
                expr = referenceExpression_1._createCellExpression(expr.source && source, keyword_null, row, col, false, false);
            }
        }
        else if (expr.type === 1 || expr.type === 13 ) {
            if (expr.type === 13 ) {
                var tableExpr = expr;
                range = tableExpr.getRange(baseRow, baseColumn);
                tableExpr._addTableReferenceInfo(baseRow, baseColumn, context.source.id);
                if (!range) {
                    if (tableExpr._error) {
                        delete tableExpr._error;
                        newExpr = argExpr = CalcErrorsReference;
                        context._adjustKind = 1 ;
                    }
                    else {
                        newExpr = expr;
                        argExpr = expr;
                    }
                    continue;
                }
                expr = referenceExpression_1._createRangeExpression(tableExpr.source === context.source ? keyword_null : tableExpr.source, keyword_null, range.row, range.col, range.row + range.rowCount - 1, range.col + range.colCount - 1);
            }
            var actualSource = expr.source !== calc_common_1.BangSource && expr.source;
            var rangeExpr = expr;
            if (nameCount) {
                source = actualSource || context.source;
                maxRowCount = calc_common_1.MAX_ROW_COUNT;
                maxColCount = calc_common_1.MAX_COLUMN_COUNT;
                var startRow = rangeExpr.rowRelative ? (rangeExpr.row + activeRow) % maxRowCount : rangeExpr.row;
                var startCol = rangeExpr.columnRelative ? (rangeExpr.column + activeCol) % maxColCount : rangeExpr.column;
                var endRow = rangeExpr.endRowRelative ? (rangeExpr.endRow + activeRow) % maxRowCount : rangeExpr.endRow;
                var endCol = rangeExpr.endColumnRelative ? (rangeExpr.endColumn + activeCol) % maxColCount : rangeExpr.endColumn;
                startRow = startRow < 0 ? startRow + maxRowCount : startRow;
                startCol = startCol < 0 ? startCol + maxColCount : startCol;
                endRow = endRow < 0 ? endRow + maxRowCount : endRow;
                endCol = endCol < 0 ? endCol + maxColCount : endCol;
                var tmp = void 0;
                if (startRow > endRow) {
                    tmp = startRow;
                    startRow = endRow;
                    endRow = tmp;
                }
                if (startCol > endCol) {
                    tmp = startCol;
                    startCol = endCol;
                    endCol = tmp;
                }
                maxRowCount = source.getRowCount();
                maxColCount = source.getColumnCount();
                if (startRow >= maxRowCount) {
                    startRow = startRow % maxRowCount;
                    endRow = endRow % maxRowCount;
                }
                else if (endRow >= maxRowCount) {
                    endRow = maxRowCount - 1;
                }
                if (startCol >= maxColCount) {
                    startCol = startCol % maxColCount;
                    endCol = endCol % maxColCount;
                }
                else if (endCol >= maxColCount) {
                    endCol = maxColCount - 1;
                }
                if (expr.row === calc_common_1.BAND_INDEX_CONST) {
                    startRow = endRow = calc_common_1.BAND_INDEX_CONST;
                }
                if (expr.column === calc_common_1.BAND_INDEX_CONST) {
                    startCol = endCol = calc_common_1.BAND_INDEX_CONST;
                }
                expr = referenceExpression_1._createRangeExpression(actualSource, expr.endSource, startRow, startCol, endRow, endCol, false, false, false, false);
            }


            if (acceptsReference && (acceptsArray || !isArrayFormula && _arrayArgumentEvaluateMode !== 1 && _arrayArgumentEvaluateMode !== 3)
                || baseRow < 0 || baseColumn < 0 || _arrayArgumentEvaluateMode === 4 ) {

            }
            else if (expendCount > 0 && !isArrayFormula && _arrayArgumentEvaluateMode !== 1 && _arrayArgumentEvaluateMode !== 3
                || expendCount === 0 || _arrayArgumentEvaluateMode === 2 ) {
                range = rangeExpr.getRange(baseRow, baseColumn);
                if (isArrayFormula || (acceptsReference || acceptsArray) && _arrayArgumentEvaluateMode === 1 ) {
                    if (!rangeExpr.isFullColumn && range.rowCount !== 1 && _rowOffset >= range.rowCount || !rangeExpr.isFullRow && range.colCount !== 1 && _colOffset >= range.colCount) {
                        newExpr = calc_common_1._createErrorExpression(CalcErrorsNotAvailable);
                    }
                    else {
                        row = (rangeExpr.isFullColumn ? 0 : range.row) + (range.rowCount === 1 ? 0 : _rowOffset);
                        col = (rangeExpr.isFullRow ? 0 : range.col) + (range.colCount === 1 ? 0 : _colOffset);
                        newExpr = referenceExpression_1._createCellExpression(actualSource, expr.endSource, row, col, false, false);
                    }
                }
                else if (range.rowCount > 1 && range.colCount > 1 || range.rowCount > 1 && !rangeExpr.isFullColumn && (baseRow < range.row || baseRow >= range.row + range.rowCount) || range.colCount > 1 && !rangeExpr.isFullRow && (baseColumn < range.col || baseColumn >= range.col + range.colCount)) {
                    newExpr = calc_common_1._createErrorExpression(CalcErrorsValue);
                }
                else {
                    row = (rangeExpr.isFullColumn || range.rowCount > 1) ? baseRow : range.row;
                    col = (rangeExpr.isFullRow || range.colCount > 1) ? baseColumn : range.col;
                    newExpr = referenceExpression_1._createCellExpression(actualSource, expr.endSource, row, col, false, false);
                }
            }
            else {
                _currentIndexneedExpend = true;
            }
        }
        else if (expr.type === 9 ) {
            var acceptsRef = expr.operatorType >= 15 ;
            if (isArrayFormula && isNullOrUndefined(expr.value2)) {
                acceptsRef = acceptsArray = false;
            }
            if (currentNode.index === -1) {
                currentNode.index = expr.value2 ? 0 : 1;
                ++stackIndex;
                stack[stackIndex] = currentNode;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(expr.value, acceptsRef, acceptsRef, -1);
            }
            else if (currentNode.index === 0) {
                if (argExpr !== expr.value) {
                    newExpr = calc_common_1._createOperatorExpression(expr.operatorType, argExpr, expr.value2);
                    currentNode.expr = newExpr;
                }
                if (_currentIndexneedExpend) {
                    neeedExpendindexs = [];
                    neeedExpendindexs.push(0);
                    currentNode.neeedExpendindexs = neeedExpendindexs;
                    _currentIndexneedExpend = false;
                }
                currentNode.index = 1;
                ++stackIndex;
                stack[stackIndex] = currentNode;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(expr.value2, acceptsRef, acceptsRef, -1);
            }
            else {
                if (expr.value2 && argExpr !== expr.value2) {
                    newExpr = calc_common_1._createOperatorExpression(expr.operatorType, expr.value, argExpr);
                }
                else if (isNullOrUndefined(expr.value2) && argExpr !== expr.value) {
                    newExpr = calc_common_1._createOperatorExpression(expr.operatorType, argExpr, keyword_undefined);
                }
                else {
                    newExpr = expr;
                }
                neeedExpendindexs = currentNode.neeedExpendindexs;
                if (_currentIndexneedExpend) {
                    if (!neeedExpendindexs) {
                        neeedExpendindexs = [expr.value2 && (expr.value2 === _tmpArrayExpr) ? 1 : 0];
                    }
                    else {
                        neeedExpendindexs.push(1);
                    }
                }
                if (neeedExpendindexs) {
                    newExpr = calc_common_1.createExpandExpression(newExpr, neeedExpendindexs);
                    _currentIndexneedExpend = true;
                }
            }
        }
        else if (expr.type === 10 ) {
            if (currentNode.index === -1) {
                currentNode.index = 0;
                ++stackIndex;
                stack[stackIndex] = currentNode;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(expr.value, acceptsArray, acceptsReference, -1);
            }
            else if (expr.value !== argExpr) {
                newExpr = calc_common_1._createParenthesesExpression(argExpr);
            }
        }
        else if (expr.type === 8 ) {
            if (currentNode.index === 1) {
                nameCount--;
                newExpr = argExpr;
                if (currentNode.context) {
                    context = currentNode.context;
                }
            }
            else {
                nameCount++;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(expr, acceptsArray, acceptsReference, 1, context);
                var rExpr = void 0, extContext = context, extSource = void 0;
                if (expr.source) {
                    extSource = expr.source === calc_common_1.BangSource ? context.source : expr.source;
                    extContext = new evaluator_1.EvaluateContext(extSource);
                    extContext.cloneFrom(context);
                    rExpr = extSource.getCustomName(expr.value);
                }
                else {
                    rExpr = context.getName(expr.value);
                    if (!context.source.getCustomName(expr.value)) {
                        extContext = new evaluator_1.GloableEvaluateContext(context.source);
                        extContext.cloneFrom(context);
                    }
                }
                if (!rExpr) {
                    rExpr = calc_common_1._createErrorExpression(CalcErrorsName);
                }
                context = extContext || context;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(rExpr, acceptsArray, acceptsReference, -1, context);
            }
        }
        else if (expr.type === 6 ) {
            var arrayExpression = expr;
            if (!acceptsArray && (expendCount > 0 || isArrayFormula || _arrayArgumentEvaluateMode === 1 || _arrayArgumentEvaluateMode === 3 )) {
                _currentIndexneedExpend = true;
                _tmpArrayExpr = expr;
            }
            else if (!acceptsArray && expendCount === 0) {
                if ((_rowOffset >= arrayExpression.value.RowCount && arrayExpression.value.RowCount > 1) || (_colOffset >= arrayExpression.value.colCount && arrayExpression.value.colCount > 1)) {
                    newExpr = calc_common_1._createErrorExpression(CalcErrorsNotAvailable);
                }
                else {
                    try {
                        if (arrayExpression.value.RowCount === 1) {
                            _rowOffset = 0;
                        }
                        if (arrayExpression.value.colCount === 1) {
                            _colOffset = 0;
                        }
                        var cValue = arrayExpression.value.getValue(_rowOffset, _colOffset);
                        if (typeof cValue === const_string) {
                            newExpr = calc_common_1.createStringExpression(cValue);
                        }
                        else if (typeof cValue === const_number) {
                            newExpr = calc_common_1.createNumberExpression(cValue);
                        }
                        else if (typeof cValue === const_boolean) {
                            newExpr = calc_common_1.createBooleanExpression(cValue);
                        }
                        else if (cValue._error) {
                            newExpr = calc_common_1._createErrorExpression(cValue);
                        }
                        else {
                            var parser = new Parser_1.Parser();
                            newExpr = parser.parse(context.source.getParserContext(context.useR1C1, _createCellIdentity(0, 0)), cValue.toString());
                        }
                    }
                    catch (ex) {
                        newExpr = calc_common_1._createErrorExpression(CalcErrorsNotAvailable);
                    }
                }
            }
        }
        if (newExpr === keyword_null) {
            newExpr = expr;
        }
        else if (newExpr !== expr) {

        }
        argExpr = newExpr;
    }
    return newExpr;
}
exports._mappingArrayOld = _mappingArrayOld;
function _mappingArray(context, expr, isArrayFormula, offsetRow, offsetCol, resultArray, resultReference) {
    var baseRow = context.row, baseColumn = context.column, stack = [], stackIndex = 0;
    var activeRow = context.arrayIdentity ? context.arrayIdentity.row : baseRow, activeCol = context.arrayIdentity ? context.arrayIdentity.col : baseColumn;
    stack[stackIndex] = {
        expr: expr,
        acceptsArray: resultArray || false,
        acceptsRef: resultReference || false,
        index: -1
    };
    var expendCount = 0;
    var nameCount = 0;
    var _currentIndexneedExpend = false;
    var _tmpArrayExpr;
    var _rowOffset = offsetRow;
    var _colOffset = offsetCol;
    var _arrayArgumentEvaluateMode = false;
    var currentNode, acceptsArray, acceptsReference, newExpr, argExpr, range, source, maxRowCount, maxColCount, row, col, neeedExpendindexs;
    while (stackIndex >= 0) {
        currentNode = stack[stackIndex];
        stackIndex--;
        acceptsArray = currentNode.acceptsArray;
        acceptsReference = currentNode.acceptsRef;
        expr = currentNode.expr;
        newExpr = keyword_null;
        if (!expr) {

        }
        else if (expr.type === 7 ) {
            var funcExpr = expr;
            var funcArguments = funcExpr.arguments, argCount = funcArguments.length;
            if (!funcExpr.function) {
                if (!context) {
                    newExpr = calc_common_1._createErrorExpression(CalcErrorsName);
                    continue;
                }
                else {
                    var functionName = funcExpr.functionName;


                    if (functionName === 'ANCHORARRAY') {
                        if (argCount === 1) {
                            var refExpr = funcArguments[0];
                            var refSource = refExpr.source;

                            var contextSource = context.source;
                            if (refExpr.type === 1 && refExpr._isCell()) {
                                newExpr = referenceExpression_1._createSpillRefExpression(contextSource, refSource, keyword_undefined, refExpr.row, refExpr.column, refExpr.rowRelative, refExpr.columnRelative);
                            }
                            else if (refExpr.type === 5 ) {
                                newExpr = referenceExpression_1._createSpillRefErrorExpression(contextSource, refSource);
                            }
                        }
                        if (!newExpr) {
                            newExpr = calc_common_1._createErrorExpression(CalcErrorsName);
                        }
                        else {
                            context._adjustKind = 2 ;
                        }
                        if (funcExpr.ensureSingle) {
                            newExpr.ensureSingle = true;
                        }
                        argExpr = newExpr;
                        continue;
                    }
                    funcExpr.function = context.getFunction(functionName);
                }
            }
            var func = funcExpr.function;
            var argIndex = currentNode.index;
            neeedExpendindexs = currentNode.neeedExpendindexs;
            if (argIndex < 0) {
                currentNode.arrayArgumentEvaluateMode = _arrayArgumentEvaluateMode;
                currentNode.arrayFormulaCatchValue = isArrayFormula;
                if (func && func.arrayArgumentEvaluateMode) {
                    _arrayArgumentEvaluateMode = func.arrayArgumentEvaluateMode;
                }
                currentNode.args = [];
            }
            else {
                if (func && func.acceptsArray && func.acceptsArray(argIndex)) {
                    expendCount--;
                }
                else if (_currentIndexneedExpend) {
                    if (!neeedExpendindexs) {
                        neeedExpendindexs = [];
                        currentNode.neeedExpendindexs = neeedExpendindexs;
                    }
                    if (funcExpr.arguments[argIndex] !== argExpr) {

                    }
                    neeedExpendindexs.push(argIndex);
                }
                currentNode.args.push(argExpr);
            }
            if (argIndex === argCount - 1) {
                _arrayArgumentEvaluateMode = currentNode.arrayArgumentEvaluateMode;
                isArrayFormula = currentNode.arrayFormulaCatchValue;
                var args = currentNode.args;
                var argsChanged = false;
                if (args && args.length > 0) {
                    for (var argI = 0; argI < args.length; argI++) {
                        if (args[argI] !== funcExpr.arguments[argI]) {
                            argsChanged = true;
                            break;
                        }
                    }
                }
                if (argsChanged) {
                    newExpr = calc_common_1._createFunctionExpression(funcExpr, args);
                }
                else {
                    newExpr = expr;
                }
                if (neeedExpendindexs && neeedExpendindexs.length > 0) {
                    newExpr = calc_common_1.createExpandExpression(newExpr, neeedExpendindexs);
                    _currentIndexneedExpend = true;
                }
            }
            else {
                if (argIndex === 0 && func && func.arrayArgumentEvaluateMode === 3 && _arrayArgumentEvaluateMode === 3 ) {
                    _arrayArgumentEvaluateMode = 0;
                }


                _currentIndexneedExpend = false;
                argIndex++;
                currentNode.index = argIndex;
                if (func && func.acceptsArray && func.acceptsArray(argIndex)) {
                    expendCount++;
                }
                ++stackIndex;
                stack[stackIndex] = currentNode;
                ++stackIndex;
                stack[stackIndex] = {
                    expr: funcExpr.arguments[argIndex],
                    acceptsArray: !!func && func.acceptsArray && func.acceptsArray(argIndex),
                    acceptsRef: !!func && func.acceptsReference && func.acceptsReference(argIndex),
                    index: -1
                };
            }
        }
        else if (expr.type === 1 && expr._isCell()) {
            if (nameCount) {
                source = expr.source !== calc_common_1.BangSource && expr.source || context.source;
                maxRowCount = source.getRowCount();
                maxColCount = source.getColumnCount();
                row = expr.rowRelative ? (expr.row + activeRow) % calc_common_1.MAX_ROW_COUNT % maxRowCount : expr.row;
                col = expr.columnRelative ? (expr.column + activeCol) % calc_common_1.MAX_COLUMN_COUNT % maxColCount : expr.column;
                row = row < 0 ? row + maxRowCount : row;
                col = col < 0 ? col + maxColCount : col;
                expr = referenceExpression_1._createCellExpression(expr.source && source, keyword_null, row, col, false, false);
            }
        }
        else if (expr.type === 1 || expr.type === 13 ) {
            if (expr.type === 13 ) {
                var tableExpr = expr;
                range = tableExpr.getRange(baseRow, baseColumn);
                tableExpr._addTableReferenceInfo(baseRow, baseColumn, context.source.id);
                if (!range) {
                    if (tableExpr._error) {
                        delete tableExpr._error;
                        newExpr = argExpr = CalcErrorsReference;
                        context._adjustKind = 1 ;
                    }
                    else {
                        newExpr = expr;
                        argExpr = expr;
                    }
                    continue;
                }
                expr = referenceExpression_1._createRangeExpression(tableExpr.source === context.source ? keyword_null : tableExpr.source, keyword_null, range.row, range.col, range.row + range.rowCount - 1, range.col + range.colCount - 1);
            }
            var actualSource = expr.source !== calc_common_1.BangSource && expr.source;
            var rangeExpr = expr, ensureSingle = rangeExpr.ensureSingle;
            if (nameCount) {
                source = actualSource || context.source;
                maxRowCount = calc_common_1.MAX_ROW_COUNT;
                maxColCount = calc_common_1.MAX_COLUMN_COUNT;
                var startRow = rangeExpr.rowRelative ? (rangeExpr.row + activeRow) % maxRowCount : rangeExpr.row;
                var startCol = rangeExpr.columnRelative ? (rangeExpr.column + activeCol) % maxColCount : rangeExpr.column;
                var endRow = rangeExpr.endRowRelative ? (rangeExpr.endRow + activeRow) % maxRowCount : rangeExpr.endRow;
                var endCol = rangeExpr.endColumnRelative ? (rangeExpr.endColumn + activeCol) % maxColCount : rangeExpr.endColumn;
                startRow = startRow < 0 ? startRow + maxRowCount : startRow;
                startCol = startCol < 0 ? startCol + maxColCount : startCol;
                endRow = endRow < 0 ? endRow + maxRowCount : endRow;
                endCol = endCol < 0 ? endCol + maxColCount : endCol;
                var tmp = void 0;
                if (startRow > endRow) {
                    tmp = startRow;
                    startRow = endRow;
                    endRow = tmp;
                }
                if (startCol > endCol) {
                    tmp = startCol;
                    startCol = endCol;
                    endCol = tmp;
                }
                maxRowCount = source.getRowCount();
                maxColCount = source.getColumnCount();
                if (startRow >= maxRowCount) {
                    startRow = startRow % maxRowCount;
                    endRow = endRow % maxRowCount;
                }
                else if (endRow >= maxRowCount) {
                    endRow = maxRowCount - 1;
                }
                if (startCol >= maxColCount) {
                    startCol = startCol % maxColCount;
                    endCol = endCol % maxColCount;
                }
                else if (endCol >= maxColCount) {
                    endCol = maxColCount - 1;
                }
                if (expr.row === calc_common_1.BAND_INDEX_CONST) {
                    startRow = endRow = calc_common_1.BAND_INDEX_CONST;
                }
                if (expr.column === calc_common_1.BAND_INDEX_CONST) {
                    startCol = endCol = calc_common_1.BAND_INDEX_CONST;
                }
                expr = referenceExpression_1._createRangeExpression(actualSource, expr.endSource, startRow, startCol, endRow, endCol, false, false, false, false);
                if (ensureSingle) {
                    expr.ensureSingle = true;
                }
            }

            if (resultReference || acceptsReference && (acceptsArray || !isArrayFormula && _arrayArgumentEvaluateMode !== 1 && _arrayArgumentEvaluateMode !== 3)
                || baseRow < 0 || baseColumn < 0) {
            }
            else if (expendCount > 0 && !isArrayFormula && _arrayArgumentEvaluateMode !== 1 && _arrayArgumentEvaluateMode !== 3
                || expendCount === 0 || _arrayArgumentEvaluateMode === 2 ) {
                range = rangeExpr.getRange(baseRow, baseColumn);

                if (isArrayFormula || (acceptsReference || acceptsArray) && _arrayArgumentEvaluateMode === 1 ) {
                    if (!rangeExpr.isFullColumn && range.rowCount !== 1 && _rowOffset >= range.rowCount || !rangeExpr.isFullRow && range.colCount !== 1 && _colOffset >= range.colCount) {
                        newExpr = calc_common_1._createErrorExpression(CalcErrorsNotAvailable);
                    }
                    else {
                        row = (rangeExpr.isFullColumn ? 0 : range.row) + (range.rowCount === 1 ? 0 : _rowOffset);
                        col = (rangeExpr.isFullRow ? 0 : range.col) + (range.colCount === 1 ? 0 : _colOffset);
                        newExpr = referenceExpression_1._createCellExpression(actualSource, expr.endSource, row, col, false, false);
                    }
                }
                else if (range.rowCount > 1 && range.colCount > 1 || range.rowCount > 1 && !rangeExpr.isFullColumn && (baseRow < range.row || baseRow >= range.row + range.rowCount) || range.colCount > 1 && !rangeExpr.isFullRow && (baseColumn < range.col || baseColumn >= range.col + range.colCount)) {
                    newExpr = calc_common_1._createErrorExpression(CalcErrorsValue);
                }
                else {
                    row = (rangeExpr.isFullColumn || range.rowCount > 1) ? baseRow : range.row;
                    col = (rangeExpr.isFullRow || range.colCount > 1) ? baseColumn : range.col;
                    newExpr = referenceExpression_1._createCellExpression(actualSource, expr.endSource, row, col, false, false);
                }
            }
            else {
                _currentIndexneedExpend = true;
            }
        }
        else if (expr.type === 9 ) {
            var acceptsRef = expr.operatorType >= 15 ;

            var actualAcceptsRef = acceptsReference && (context.source && context.source._service && context.source._service.allowDynamicArray);
            if (currentNode.index === -1) {
                if (isArrayFormula && isNullOrUndefined(expr.value2)) {
                    acceptsRef = acceptsArray = false;
                }
                currentNode.index = expr.value2 ? 0 : 1;
                ++stackIndex;
                stack[stackIndex] = currentNode;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(expr.value, acceptsRef || acceptsArray, acceptsRef || actualAcceptsRef, -1);
            }
            else if (currentNode.index === 0) {
                if (argExpr !== expr.value) {
                    newExpr = calc_common_1._createOperatorExpression(expr.operatorType, argExpr, expr.value2);
                    currentNode.expr = newExpr;
                }
                if (_currentIndexneedExpend) {
                    neeedExpendindexs = [];
                    neeedExpendindexs.push(0);
                    currentNode.neeedExpendindexs = neeedExpendindexs;
                    _currentIndexneedExpend = false;
                }
                currentNode.index = 1;
                ++stackIndex;
                stack[stackIndex] = currentNode;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(expr.value2, acceptsRef || acceptsArray, acceptsRef || actualAcceptsRef, -1);
            }
            else {
                if (expr.value2 && argExpr !== expr.value2) {
                    newExpr = calc_common_1._createOperatorExpression(expr.operatorType, expr.value, argExpr);
                }
                else if (isNullOrUndefined(expr.value2) && argExpr !== expr.value) {
                    newExpr = calc_common_1._createOperatorExpression(expr.operatorType, argExpr, keyword_undefined);
                }
                else {
                    newExpr = expr;
                }
                neeedExpendindexs = currentNode.neeedExpendindexs;
                if (_currentIndexneedExpend) {
                    if (!neeedExpendindexs) {
                        neeedExpendindexs = [expr.value2 && (expr.value2 === _tmpArrayExpr) ? 1 : 0];
                    }
                    else {
                        neeedExpendindexs.push(1);
                    }
                }
                if (neeedExpendindexs) {
                    newExpr = calc_common_1.createExpandExpression(newExpr, neeedExpendindexs);
                    _currentIndexneedExpend = true;
                }
            }
        }
        else if (expr.type === 10 ) {
            if (currentNode.index === -1) {
                currentNode.index = 0;
                ++stackIndex;
                stack[stackIndex] = currentNode;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(expr.value, acceptsArray, acceptsReference, -1);
            }
            else if (expr.value !== argExpr) {
                newExpr = calc_common_1._createParenthesesExpression(argExpr);
            }
        }
        else if (expr.type === 8 ) {
            if (currentNode.index === 1) {
                nameCount--;
                newExpr = argExpr;
                if (currentNode.context) {
                    context = currentNode.context;
                }
            }
            else {
                nameCount++;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(expr, acceptsArray, acceptsReference, 1, context);
                var rExpr = void 0, extContext = context, extSource = void 0;
                var inLetFunc = _isLetFunction(stack);


                if (inLetFunc) {
                    rExpr = new calc_common_1.Expression(100);
                    rExpr.value = expr.value;
                }
                else {
                    if (expr.source) {
                        extSource = expr.source === calc_common_1.BangSource ? context.source : expr.source;
                        extContext = new evaluator_1.EvaluateContext(extSource);
                        extContext.cloneFrom(context);
                        rExpr = extSource.getCustomName(expr.value);
                    }
                    else {
                        rExpr = context.getName(expr.value);
                        if (!context.source.getCustomName(expr.value)) {
                            extContext = new evaluator_1.GloableEvaluateContext(context.source);
                            extContext.cloneFrom(context);
                        }
                    }
                    if (!rExpr) {
                        rExpr = calc_common_1._createErrorExpression(CalcErrorsName);
                    }
                }
                context = extContext || context;
                ++stackIndex;
                stack[stackIndex] = createMappingNode(rExpr, acceptsArray, acceptsReference, -1, context);
            }
        }
        else if (expr.type === 6 ) {
            var arrayExpression = expr, arrayValue = expr.value;
            if (!acceptsArray && (expendCount > 0 || isArrayFormula || _arrayArgumentEvaluateMode === 1 || _arrayArgumentEvaluateMode === 3 )) {
                _currentIndexneedExpend = true;
                _tmpArrayExpr = expr;
            }
            else if (!acceptsArray && expendCount === 0) {
                var rowCount = arrayValue.getRowCount(), colCount = arrayValue.getColumnCount();
                if ((_rowOffset >= rowCount && rowCount > 1) || (_colOffset >= colCount && colCount > 1)) {
                    newExpr = calc_common_1._createErrorExpression(CalcErrorsNotAvailable);
                }
                else {
                    if (isArrayFormula || !(context.source && context.source._service && context.source._service.allowDynamicArray)) {
                        try {
                            if (rowCount === 1) {
                                _rowOffset = 0;
                            }
                            if (colCount === 1) {
                                _colOffset = 0;
                            }
                            var cValue = arrayExpression.value.getValue(_rowOffset, _colOffset);
                            if (typeof cValue === const_string) {
                                newExpr = calc_common_1.createStringExpression(cValue);
                            }
                            else if (typeof cValue === const_number) {
                                newExpr = calc_common_1.createNumberExpression(cValue);
                            }
                            else if (typeof cValue === const_boolean) {
                                newExpr = calc_common_1.createBooleanExpression(cValue);
                            }
                            else if (cValue._error) {
                                newExpr = calc_common_1._createErrorExpression(cValue);
                            }
                            else {
                                var parser = new Parser_1.Parser();
                                newExpr = parser.parse(context.source.getParserContext(context.useR1C1, _createCellIdentity(0, 0)), cValue.toString());
                            }
                        }
                        catch (ex) {
                            newExpr = calc_common_1._createErrorExpression(CalcErrorsNotAvailable);
                        }
                    }
                }
            }
        }
        if (newExpr === keyword_null) {
            newExpr = expr;
        }
        else if (newExpr !== expr) {

        }
        argExpr = newExpr;
    }
    return newExpr;
}
exports._mappingArray = _mappingArray;
function createMappingNode(expr, acceptsArray, acceptsRef, index, context) {
    return { expr: expr, acceptsArray: acceptsArray, acceptsRef: acceptsRef, index: index, context: context };
}
function _createCellIdentity(row, col) {
    return { row: row, col: col };
}
exports._createCellIdentity = _createCellIdentity;
function _createRangeIdentity(row, col, rowCount, colCount) {
    return { row: row, col: col, rowCount: rowCount, colCount: colCount };
}
exports._createRangeIdentity = _createRangeIdentity;
function shouldUseRange(row, col, rowCount, colCount) {
    return row === -1 || col === -1 || (rowCount * colCount > 1);
}
 }),

 './src/calcEngine.res.en.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
function functionDescription(description, parameters) {
    return {
        description: description,
        parameters: parameters
    };
}
function parameterDescription(name, repeatable) {
    return {
        name: name,
        repeatable: repeatable
    };
}
var START_NUMBER = '[start_num]';
var SIGNIFICANCE = '[significance]';
exports.resource = {
    Exp_InvalidCast: 'Invalid Cast Exception',
    Exp_FormulaInvalidChar: 'The formula contains an invalid character: \'{0}\' at index on {1}',
    Exp_FormulaInvalid: 'Invalid Formula',
    Exp_InvalidFunctionName: 'Invalid function name',
    Exp_InvalidOverrideFunction: 'Cannot override built-in function',
    Exp_InvalidArray: 'Invalid array',
    Exp_OverrideNotAllowed: 'Attempt to override function while override is not allowed',
    Exp_NoSyntax: 'No syntax \'{0}\' to match the syntax \'{1}\'.',
    Exp_IsValid: '\'{0}\' is invalid.',
    Exp_InvalidParameters: 'Invalid function parameter at {0}.',
    Exp_InvalidArrayColumns: 'The length of array columns are not equal at {0}.',
    Exp_ExprIsNull: 'The argument \'expr\' is null',
    Exp_InvalidOperation: 'Invalid Operation Exception',
    Exp_ArgumentNull: 'Argument Null Exception',
    Exp_CriteriaIsNull: 'Criteria is null',
    Exp_Format: 'Format',
    Exp_ArrayFromulaPart: 'Cannot change part of an array.',
    Exp_NotSupported: 'Not Supported Exception',
    _builtInFunctionsResource: {
        'ABS': functionDescription('This function calculates the absolute value of the specified value.', [
            parameterDescription('number')
        ]),
        'ACCRINT': functionDescription('This function calculates the accrued interest for a security that pays periodic interest.', [
            parameterDescription('issue'),
            parameterDescription('first_interest'),
            parameterDescription('settlement'),
            parameterDescription('rate'),
            parameterDescription('par'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'ACCRINTM': functionDescription('This function calculates the accrued interest at maturity for a security that pays periodic interest.', [
            parameterDescription('issue'),
            parameterDescription('settlement'),
            parameterDescription('rate'),
            parameterDescription('par'),
            parameterDescription('basis')
        ]),
        'ACOS': functionDescription('This function calculates the arccosine, that is, the angle whose cosine is the specified value.', [
            parameterDescription('number')
        ]),
        'ACOSH': functionDescription('This function calculates the inverse hyperbolic cosine of the specified value.', [
            parameterDescription('number')
        ]),
        'ADDRESS': functionDescription('This function uses the row and column numbers to create a cell address in text.', [
            parameterDescription('row_num'),
            parameterDescription('column_num'),
            parameterDescription('abs_num'),
            parameterDescription('a1style'),
            parameterDescription('sheet_text')
        ]),
        'AGGREGATE': functionDescription('This function aggregate a list of numbers using a specified built-in function.', [
            parameterDescription('function_num'),
            parameterDescription('options'),
            parameterDescription('ref1'),
            parameterDescription('ref2', true)
        ]),
        'AMORDEGRC': functionDescription('This function returns the depreciation for an accounting period, taking into consideration prorated depreciation, and applies a depreciation coefficient in the calculation based on the life of the assets.', [
            parameterDescription('cost'),
            parameterDescription('date_purchased'),
            parameterDescription('first_period'),
            parameterDescription('salvage'),
            parameterDescription('period'),
            parameterDescription('rate'),
            parameterDescription('basis')
        ]),
        'AMORLINC': functionDescription('This function calculates the depreciation for an accounting period, taking into account prorated depreciation.', [
            parameterDescription('cost'),
            parameterDescription('date_purchased'),
            parameterDescription('first_period'),
            parameterDescription('salvage'),
            parameterDescription('period'),
            parameterDescription('rate'),
            parameterDescription('basis')
        ]),
        'AND': functionDescription('Check whether all arguments are True, and returns True if all arguments are True.', [
            parameterDescription('logical1'),
            parameterDescription('logical2')
        ]),
        'ASIN': functionDescription('This function calculates the arcsine, that is, the angle whose sine is the specified value.', [
            parameterDescription('number')
        ]),
        'ASINH': functionDescription('This function calculates the inverse hyperbolic sine of a number.', [
            parameterDescription('number')
        ]),
        'ATAN': functionDescription('This function calculates the arctangent, that is, the angle whose tangent is the specified value.', [
            parameterDescription('number')
        ]),
        'ATAN2': functionDescription('This function calculates the arctangent of the specified x- and y-coordinates.', [
            parameterDescription('x_num'),
            parameterDescription('y_num')
        ]),
        'ATANH': functionDescription('This function calculates the inverse hyperbolic tangent of a number.', [
            parameterDescription('number')
        ]),
        'AVEDEV': functionDescription('This function calculates the average of the absolute deviations of the specified values from their mean.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'AVERAGE': functionDescription('This function calculates the average of the specified numeric values.', [
            parameterDescription('number1'),
            parameterDescription('number2', true),
        ]),
        'AVERAGEA': functionDescription('This function calculates the average of the specified values, including text or logical values as well as numeric values.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'AVERAGEIF': functionDescription('This function calculates the average of the specified numeric values provided that they meet the specified criteria.', [
            parameterDescription('range'),
            parameterDescription('criteria'),
            parameterDescription('[average_range]')
        ]),
        'AVERAGEIFS': functionDescription('This function calculates the average of all cells that meet multiple specified criteria.', [
            parameterDescription('average_range'),
            parameterDescription('criteria_range1', true),
            parameterDescription('criteria1', true),
        ]),
        'BESSELI': functionDescription('This function calculates the modified Bessel function of the first kind evaluated for purely imaginary arguments.', [
            parameterDescription('value'),
            parameterDescription('order')
        ]),
        'BESSELJ': functionDescription('This function calculates the Bessel function of the first kind.', [
            parameterDescription('value'),
            parameterDescription('order')
        ]),
        'BESSELK': functionDescription('This function calculates the modified Bessel function of the second kind evaluated for purely imaginary arguments.', [
            parameterDescription('value'),
            parameterDescription('order')
        ]),
        'BESSELY': functionDescription('This function calculates the Bessel function of the second kind.', [
            parameterDescription('value'),
            parameterDescription('order')
        ]),
        'BETADIST': functionDescription('This function calculates the cumulative beta distribution function.', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('lower'),
            parameterDescription('upper')
        ]),
        'BETAINV': functionDescription('This function calculates the inverse of the cumulative beta distribution function.', [
            parameterDescription('probability'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('lower'),
            parameterDescription('upper')
        ]),
        'BIN2DEC': functionDescription('This function converts a binary number to a decimal number', [
            parameterDescription('number')
        ]),
        'BIN2HEX': functionDescription('This function converts a binary number to a hexadecimal number.', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'BIN2OCT': functionDescription('This function converts a binary number to an octal number.', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'BINOMDIST': functionDescription('This function calculates the individual term binomial distribution probability.', [
            parameterDescription('number_s'),
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('cumulative')
        ]),
        'CEILING': functionDescription('This function rounds a number up to the nearest multiple of a specified value.', [
            parameterDescription('number'),
            parameterDescription('significance')
        ]),
        'CHAR': functionDescription('This function returns the character specified by a number.', [
            parameterDescription('number')
        ]),
        'CHIDIST': functionDescription('This function calculates the one-tailed probability of the chi-squared distribution.', [
            parameterDescription('value'),
            parameterDescription('deg_freedom')
        ]),
        'CHIINV': functionDescription('This function calculates the inverse of the one-tailed probability of the chi-squared distribution', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'CHITEST': functionDescription('This function calculates the test for independence from the chi-squared distribution.', [
            parameterDescription('actual_range'),
            parameterDescription('expected_range')
        ]),
        'CHOOSE': functionDescription('This function returns a value from a list of values.', [
            parameterDescription('index_num'),
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'CLEAN': functionDescription('This function removes all non-printable characters from text.', [
            parameterDescription('text')
        ]),
        'CODE': functionDescription('This function returns a numeric code to represent the first character in a text string. The returned code corresponds to the Windows character set (ANSI).', [
            parameterDescription('text')
        ]),
        'COLUMN': functionDescription('This function returns the column number of a reference.', [
            parameterDescription('reference')
        ]),
        'COLUMNS': functionDescription('This function returns the number of columns in an array.', [
            parameterDescription('array')
        ]),
        'COMBIN': functionDescription('This function calculates the number of possible combinations for a specified number of items.', [
            parameterDescription('number'),
            parameterDescription('number_chosen')
        ]),
        'COMPLEX': functionDescription('This function converts real and imaginary coefficients into a complex number.', [
            parameterDescription('real_num'),
            parameterDescription('image_num'),
            parameterDescription('suffix')
        ]),
        'CONCATENATE': functionDescription('This function combines multiple text strings or numbers into one text string.', [
            parameterDescription('text1'),
            parameterDescription('text2', true)
        ]),
        'CONFIDENCE': functionDescription('This function returns confidence interval for a population mean.', [
            parameterDescription('alpha'),
            parameterDescription('standard_dev'),
            parameterDescription('size')
        ]),
        'CONVERT': functionDescription('This function converts a number from one measurement system to its equivalent in another measurement system.', [
            parameterDescription('number'),
            parameterDescription('from_unit'),
            parameterDescription('to_unit')
        ]),
        'CORREL': functionDescription('This function returns the correlation coefficient of the two sets of data.', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'COS': functionDescription('This function returns the cosine of the specified angle.', [
            parameterDescription('number')
        ]),
        'COSH': functionDescription('This function returns the hyperbolic cosine of the specified value.', [
            parameterDescription('number')
        ]),
        'COUNT': functionDescription('This function returns the number of cells that contain numbers.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'COUNTA': functionDescription('This function returns the number of number of cells that contain numbers, text, or logical values.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'COUNTBLANK': functionDescription('This function returns the number of empty (or blank) cells in a range of cells on a sheet.', [
            parameterDescription('cellrange')
        ]),
        'COUNTIF': functionDescription('This function returns the number of cells that meet a certain condition', [
            parameterDescription('cellrange'),
            parameterDescription('criteria')
        ]),
        'COUNTIFS': functionDescription('This function returns the number of cells that meet multiple conditions.', [
            parameterDescription('criteria_range1', true),
            parameterDescription('criteria1', true)
        ]),
        'COUPDAYBS': functionDescription('This function calculates the number of days from the beginning of the coupon period to the settlement date.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPDAYS': functionDescription('This function returns the number of days in the coupon period that contains the settlement date.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPDAYSNC': functionDescription('This function calculates the number of days from the settlement date to the next coupon date.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPNCD': functionDescription('This function returns a date number of the next coupon date after the settlement date.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPNUM': functionDescription('This function returns the number of coupons due between the settlement date and maturity date.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPPCD': functionDescription('This function returns a date number of the previous coupon date before the settlement date.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COVAR': functionDescription('This function returns the covariance, which is the average of the products of deviations for each data point pair in two sets of numbers.', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'CRITBINOM': functionDescription('This function returns the criterion binomial, the smallest value for which the cumulative binomial distribution is greater than or equal to a criterion value.', [
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('alpha')
        ]),
        'CUMIPMT': functionDescription('This function returns the cumulative interest paid on a loan between the starting and ending periods.', [
            parameterDescription('rate'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('start_period'),
            parameterDescription('end_period'),
            parameterDescription('paytype')
        ]),
        'CUMPRINC': functionDescription('This function returns the cumulative principal paid on a loan between the start and end periods.', [
            parameterDescription('rate'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('start_period'),
            parameterDescription('end_period'),
            parameterDescription('paytype')
        ]),
        'DATE': functionDescription('This function returns the DateTime object for a particular date, specified by the year, month, and day.', [
            parameterDescription('year'),
            parameterDescription('month'),
            parameterDescription('day')
        ]),
        'DATEDIF': functionDescription('This function returns the number of days, months, or years between two dates.', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('unit')
        ]),
        'DATEVALUE': functionDescription('This function returns a DateTime object of the specified date.', [
            parameterDescription('date_text')
        ]),
        'DAVERAGE': functionDescription('This function calculates the average of values in a column of a list or database that match the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DAY': functionDescription('This function returns the day number of the month (integer 1 to 31) that corresponds to the specified date.', [
            parameterDescription('date')
        ]),
        'DAYS360': functionDescription('This function returns the number of days between two dates based on a 360-day year.', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('method')
        ]),
        'DB': functionDescription('This function calculates the depreciation of an asset for a specified period using the fixed\u2011declining balance method', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life'),
            parameterDescription('period'),
            parameterDescription('month')
        ]),
        'DCOUNT': functionDescription('This function counts the cells that contain numbers in a column of a list or database that match the specified conditions', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DCOUNTA': functionDescription('This function counts the non-blank cells in a column of a list or database that match the specified conditions', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DDB': functionDescription('This function calculates the depreciation of an asset for a specified period using the double-declining balance method or another method you specify.', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life'),
            parameterDescription('period'),
            parameterDescription('factor')
        ]),
        'DEC2BIN': functionDescription('This function converts a decimal number to a binary number.', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'DEC2HEX': functionDescription('This function converts a decimal number to a hexadecimal number', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'DEC2OCT': functionDescription('This function converts a decimal number to an octal number', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'DEGREES': functionDescription('This function converts the specified value from radians to degrees', [
            parameterDescription('angle')
        ]),
        'DELTA': functionDescription('This function identifies whether two values are equal. Returns 1 if they are equal; returns 0 otherwise.', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'DEVSQ': functionDescription('This function calculates the sum of the squares of deviations of data points (or of an array of data points) from their sample mean.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'DGET': functionDescription('This function extracts a single value from a column of a list or database that matches the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DISC': functionDescription('This function calculates the discount rate for a security.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('basis')
        ]),
        'DMAX': functionDescription('This function returns the largest number in a column of a list or database that matches the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DMIN': functionDescription('This function returns the smallest number in a column of a list or database that matches the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DOLLAR': functionDescription('This function converts a number to text using currency format, with the decimals rounded to the specified place.', [
            parameterDescription('number'),
            parameterDescription('decimals')
        ]),
        'DOLLARDE': functionDescription('This function converts a fraction dollar price to a decimal dollar price.', [
            parameterDescription('fractional_dollar'),
            parameterDescription('fraction')
        ]),
        'DOLLARFR': functionDescription('This function converts a decimal number dollar price to a fraction dollar price.', [
            parameterDescription('decimal_dollar'),
            parameterDescription('fraction')
        ]),
        'DPRODUCT': functionDescription('This function multiplies the values in a column of a list or database that match the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DSTDEV': functionDescription('This function estimates the standard deviation of a population based on a sample by using the numbers in a column of a list or database that match the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DSTDEVP': functionDescription('This function calculates the standard deviation of a population based on the entire population using the numbers in a column of a list or database that match the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DSUM': functionDescription('This function adds the numbers in a column of a list or database that match the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DURATION': functionDescription('This function returns the Macaulay duration for an assumed par value of $100.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('coupon'),
            parameterDescription('yield'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'DVAR': functionDescription('This function estimates the variance of a population based on a sample by using the numbers in a column of a list or database that match the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DVARP': functionDescription('This function calculates the variance of a population based on the entire population by using the numbers in a column of a list or database that match the specified conditions.', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'EDATE': functionDescription('This function calculates the date that is the indicated number of months before or after a specified date.', [
            parameterDescription('start_date'),
            parameterDescription('months')
        ]),
        'EFFECT': functionDescription('This function calculates the effective annual interest rate for a given nominal annual interest rate and the number of compounding periods per year.', [
            parameterDescription('nominal_rate'),
            parameterDescription('npery')
        ]),
        'EOMONTH': functionDescription('This function calculates the date for the last day of the month (end of month) that is the indicated number of months before or after the starting date.', [
            parameterDescription('start_date'),
            parameterDescription('months')
        ]),
        'ERF': functionDescription('This function calculates the error function integrated between a lower and an upper limit.', [
            parameterDescription('lower_limit'),
            parameterDescription('upper_limit')
        ]),
        'ERFC': functionDescription('This function calculates the complementary error function integrated between a lower limit and infinity.', [
            parameterDescription('lowerlimit')
        ]),
        'ERROR.TYPE': functionDescription('This function returns a number corresponding to one of the error values.', [
            parameterDescription('error_val')
        ]),
        'EURO': functionDescription('This function returns the equivalent of one Euro based on the ISO currency code.', [
            parameterDescription('code')
        ]),
        'EUROCONVERT': functionDescription('This function converts currency from a Euro member currency (including Euros) to another Euro member currency (including Euros).', [
            parameterDescription('number'),
            parameterDescription('source'),
            parameterDescription('target'),
            parameterDescription('full_precision'),
            parameterDescription('triangulation_precision')
        ]),
        'EVEN': functionDescription('This function rounds the specified value up to the nearest even integer.', [
            parameterDescription('number')
        ]),
        'EXACT': functionDescription('This function returns true if two strings are the same; otherwise, false.', [
            parameterDescription('text1'),
            parameterDescription('text2')
        ]),
        'EXP': functionDescription('This function returns e raised to the power of the specified value.', [
            parameterDescription('number')
        ]),
        'EXPONDIST': functionDescription('This function returns the exponential distribution or the probability density.', [
            parameterDescription('value'),
            parameterDescription('lambda'),
            parameterDescription('cumulative')
        ]),
        'FACT': functionDescription('This function calculates the factorial of the specified number.', [
            parameterDescription('number')
        ]),
        'FACTDOUBLE': functionDescription('This function calculates the double factorial of the specified number.', [
            parameterDescription('number')
        ]),
        'FALSE': functionDescription('This function returns the value for logical FALSE.', []),
        'FDIST': functionDescription('This function calculates the F probability distribution, to see degrees of diversity between two sets of data.', [
            parameterDescription('value'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'FIND': functionDescription('This function finds one text value within another and returns the text value\u2019s position in the text you searched.', [
            parameterDescription('find_text'),
            parameterDescription('within_text'),
            parameterDescription(START_NUMBER)
        ]),
        'FINV': functionDescription('This function returns the inverse of the F probability distribution.', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'FISHER': functionDescription('This function returns the Fisher transformation for a specified value.', [
            parameterDescription('value')
        ]),
        'FISHERINV': functionDescription('This function returns the inverse of the Fisher transformation for a specified value.', [
            parameterDescription('value')
        ]),
        'FIXED': functionDescription('This function rounds a number to the specified number of decimal places, formats the number in decimal format using a period and commas (if so specified), and returns the result as text.', [
            parameterDescription('number'),
            parameterDescription('decimals'),
            parameterDescription('no_commas')
        ]),
        'FLOOR': functionDescription('This function rounds a number down to the nearest multiple of a specified value.', [
            parameterDescription('number'),
            parameterDescription('significance')
        ]),
        'FORECAST': functionDescription('This function calculates a future value using existing values.', [
            parameterDescription('value'),
            parameterDescription('Yarray'),
            parameterDescription('Xarray')
        ]),
        'FREQUENCY': functionDescription('This function calculates how often values occur within a range of values. This function returns a vertical array of numbers.', [
            parameterDescription('data_array'),
            parameterDescription('bins_array')
        ]),
        'FTEST': functionDescription('This function returns the result of an F-test, which returns the one-tailed probability that the variances in two arrays are not significantly different.', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'FV': functionDescription('This function returns the future value of an investment based on a present value, periodic payments, and a specified interest rate.', [
            parameterDescription('rate'),
            parameterDescription('numper'),
            parameterDescription('paymt'),
            parameterDescription('pval'),
            parameterDescription('type')
        ]),
        'FVSCHEDULE': functionDescription('This function returns the future value of an initial principal after applying a series of compound interest rates. Calculate future value of an investment with a variable or adjustable rate.', [
            parameterDescription('principal'),
            parameterDescription('schedule')
        ]),
        'GAMMADIST': functionDescription('This function returns the gamma distribution.', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative')
        ]),
        'GAMMAINV': functionDescription('This function returns the inverse of the gamma cumulative distribution.', [
            parameterDescription('probability'),
            parameterDescription('alpha'),
            parameterDescription('beta')
        ]),
        'GAMMALN': functionDescription('This function returns the natural logarithm of the Gamma function, G(x).', [
            parameterDescription('value')
        ]),
        'GCD': functionDescription('This function returns the greatest common divisor of two numbers.', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'GEOMEAN': functionDescription('This function returns the geometric mean of a set of positive data.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'GESTEP': functionDescription('This function, greater than or equal to step, returns an indication of whether a number is equal to a threshold.', [
            parameterDescription('number'),
            parameterDescription('step')
        ]),
        'GROWTH': functionDescription('This function calculates predicted exponential growth. This function returns the y values for a series of new x values that are specified by using existing x and y values.', [
            parameterDescription('y'),
            parameterDescription('x'),
            parameterDescription('newx'),
            parameterDescription('constant')
        ]),
        'HARMEAN': functionDescription('This function returns the harmonic mean of a data set.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'HEX2BIN': functionDescription('This function converts a hexadecimal number to a binary number.', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'HEX2DEC': functionDescription('This function converts a hexadecimal number to a decimal number.', [
            parameterDescription('number')
        ]),
        'HEX2OCT': functionDescription('This function converts a hexadecimal number to an octal number.', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'HLOOKUP': functionDescription('This function searches for a value in the top row and then returns a value in the same column from a specified row.', [
            parameterDescription('lookup_value'),
            parameterDescription('table_array'),
            parameterDescription('row_index_num'),
            parameterDescription('range_lookup')
        ]),
        'HOUR': functionDescription('This function returns the hour that corresponds to a specified time.', [
            parameterDescription('time')
        ]),
        'HYPGEOMDIST': functionDescription('This function returns the hypergeometric distribution.', [
            parameterDescription('sample_s'),
            parameterDescription('number_sample'),
            parameterDescription('population_s'),
            parameterDescription('number_pop')
        ]),
        'IF': functionDescription('This function performs a comparison and returns one of two provided values based on that comparison.', [
            parameterDescription('logical_test'),
            parameterDescription('value_if_true'),
            parameterDescription('value_if_false')
        ]),
        'IFERROR': functionDescription('This function evaluates a formula and returns a value you provide if there is an error or the formula result.', [
            parameterDescription('value'),
            parameterDescription('value_if_error')
        ]),
        'IMABS': functionDescription('This function returns the absolute value or modulus of a complex number.', [
            parameterDescription('complexnum')
        ]),
        'IMAGINARY': functionDescription('This function returns the imaginary coefficient of a complex number.', [
            parameterDescription('complexnum')
        ]),
        'IMARGUMENT': functionDescription('This function returns the argument theta, which is an angle expressed in radians.', [
            parameterDescription('complexnum')
        ]),
        'IMCONJUGATE': functionDescription('This function returns the complex conjugate of a complex number.', [
            parameterDescription('complexnum')
        ]),
        'IMCOS': functionDescription('This function returns the cosine of a complex number.', [
            parameterDescription('complexnum')
        ]),
        'IMDIV': functionDescription('This function returns the quotient of two complex numbers.', [
            parameterDescription('complexnum'),
            parameterDescription('complexdenom')
        ]),
        'IMEXP': functionDescription('This function returns the exponential of a complex number.', [
            parameterDescription('complexnum')
        ]),
        'IMLN': functionDescription('This function returns the natural logarithm of a complex number.', [
            parameterDescription('complexnum')
        ]),
        'IMLOG2': functionDescription('This function returns the base-2 logarithm of a complex number.', [
            parameterDescription('complexnum')
        ]),
        'IMLOG10': functionDescription('This function returns the common logarithm of a complex number.', [
            parameterDescription('complexnum')
        ]),
        'IMPOWER': functionDescription('This function returns a complex number raised to a power.', [
            parameterDescription('complexnum'),
            parameterDescription('powernum')
        ]),
        'IMPRODUCT': functionDescription('This function returns the product of up to 29 complex numbers in the x+yi or x+yj text format.', [
            parameterDescription('complexnum1'),
            parameterDescription('complexnum2', true)
        ]),
        'IMREAL': functionDescription('This function returns the real coefficient of a complex number in the x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMSIN': functionDescription('This function returns the sine of a complex number in the x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMSQRT': functionDescription('This function returns the square root of a complex number in the x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMSUB': functionDescription('This function returns the difference of two complex numbers in the x+yi or x+yj text format.', [
            parameterDescription('complexnum1'),
            parameterDescription('complexnum2')
        ]),
        'IMSUM': functionDescription('This function returns the sum of two or more complex numbers in the x+yi or x+yj text format.', [
            parameterDescription('complexnum1'),
            parameterDescription('complexnum2', true)
        ]),
        'INDEX': functionDescription('This function returns a value or the reference to a value from within an array or range.', [
            parameterDescription('array'),
            parameterDescription('row_num'),
            parameterDescription('column_num'),
            parameterDescription('area_num')
        ]),
        'INDIRECT': functionDescription('This function returns the reference specified by a text string. References are immediately evaluated to display their contents.', [
            parameterDescription('ref_text'),
            parameterDescription('[a1_style]')
        ]),
        'INT': functionDescription('This function rounds a specified number down to the nearest integer.', [
            parameterDescription('number')
        ]),
        'INTERCEPT': functionDescription('This function returns the coordinates of a point at which a line intersects the y-axis, by using existing x values and y values.', [
            parameterDescription('dependent'),
            parameterDescription('independent')
        ]),
        'INTRATE': functionDescription('This function calculates the interest rate for a fully invested security.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('investment'),
            parameterDescription('redemption'),
            parameterDescription('basis')
        ]),
        'IPMT': functionDescription('This function calculates the payment of interest on a loan.', [
            parameterDescription('rate'),
            parameterDescription('per'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'IRR': functionDescription('This function returns the internal rate of return for a series of cash flows represented by the numbers in an array.', [
            parameterDescription('arrayvals'),
            parameterDescription('estimate')
        ]),
        'ISBLANK': functionDescription('This function tests whether a value, an expression, or contents of a referenced cell is empty.', [
            parameterDescription('cellreference')
        ]),
        'ISERR': functionDescription('This function, Is Error Other Than Not Available, tests whether a value, an expression, or contents of a referenced cell has an error other than not available (#N/A).', [
            parameterDescription('cellreference')
        ]),
        'ISERROR': functionDescription('This function, Is Error of Any Kind, tests whether a value, an expression, or contents of a referenced cell has an error of any kind.', [
            parameterDescription('cellreference')
        ]),
        'ISEVEN': functionDescription('This function, Is Number Even, tests whether a value, an expression, or contents of a referenced cell is even.', [
            parameterDescription('cellreference')
        ]),
        'ISLOGICAL': functionDescription('This function tests whether a value, an expression, or contents of a referenced cell is a logical (Boolean) value.', [
            parameterDescription('cellreference')
        ]),
        'ISNA': functionDescription('This function, Is Not Available, tests whether a value, an expression, or contents of a referenced cell has the not available (#N/A) error value.', [
            parameterDescription('cellreference')
        ]),
        'ISNONTEXT': functionDescription('This function tests whether a value, an expression, or contents of a referenced cell has any data type other than text.', [
            parameterDescription('cellreference')
        ]),
        'ISNUMBER': functionDescription('This function tests whether a value, an expression, or contents of a referenced cell has numeric data.', [
            parameterDescription('cellreference')
        ]),
        'ISODD': functionDescription('This function, Is Number Odd, tests whether a value, an expression, or contents of a referenced cell has numeric data.', [
            parameterDescription('cellreference')
        ]),
        'ISPMT': functionDescription('This function calculates the interest paid during a specific period of an investment.', [
            parameterDescription('rate'),
            parameterDescription('per'),
            parameterDescription('nper'),
            parameterDescription('pv')
        ]),
        'ISREF': functionDescription('This function, Is Reference, tests whether a value, an expression, or contents of a referenced cell is a reference to another cell.', [
            parameterDescription('cellreference')
        ]),
        'ISTEXT': functionDescription('This function tests whether a value, an expression, or contents of a referenced cell has text data.', [
            parameterDescription('cellreference')
        ]),
        'KURT': functionDescription('This function returns the kurtosis of a data set.', [
            parameterDescription('number1'),
            parameterDescription('number2'),
            parameterDescription('number3'),
            parameterDescription('number4', true)
        ]),
        'LARGE': functionDescription('This function returns the nth largest value in a data set, where n is specified.', [
            parameterDescription('array'),
            parameterDescription('n')
        ]),
        'LCM': functionDescription('This function returns the least common multiple of two numbers.', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'LEFT': functionDescription('This function returns the specified leftmost characters from a text value, and based on the number of characters you specify.', [
            parameterDescription('text'),
            parameterDescription('num_chars')
        ]),
        'LEN': functionDescription('This function returns the length of the number of characters in a text string.', [
            parameterDescription('text')
        ]),
        'LINEST': functionDescription('This function calculates the statistics for a line.', [
            parameterDescription('y'),
            parameterDescription('x'),
            parameterDescription('constant'),
            parameterDescription('stats')
        ]),
        'LN': functionDescription('This function returns the natural logarithm of the specified number.', [
            parameterDescription('value')
        ]),
        'LOG': functionDescription('This function returns the logarithm base Y of a number X.', [
            parameterDescription('number'),
            parameterDescription('base')
        ]),
        'LOG10': functionDescription('This function returns the logarithm base 10 of the number given.', [
            parameterDescription('number')
        ]),
        'LOGEST': functionDescription('This function calculates an exponential curve that fits the data and returns an array of values that describes the curve.', [
            parameterDescription('y'),
            parameterDescription('x'),
            parameterDescription('constant'),
            parameterDescription('stats')
        ]),
        'LOGINV': functionDescription('This function returns the inverse of the lognormal cumulative distribution function of x, where LN(x) is normally distributed with the specified mean and standard deviation.', [
            parameterDescription('probability'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'LOGNORMDIST': functionDescription('This function returns the cumulative natural log normal distribution of x, where LN(x) is normally distributed with the specified mean and standard deviation. Analyze data that has been logarithmically transformed with this function.', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('standard_dev'),
        ]),
        'LOOKUP': functionDescription('This function searches for a value and returns a value from the same location in a second area.', [
            parameterDescription('lookup_value'),
            parameterDescription('lookup_vector'),
            parameterDescription('result_vector')
        ]),
        'LOWER': functionDescription('This function converts text to lower case letters.', [
            parameterDescription('text')
        ]),
        'MATCH': functionDescription('This function returns the relative position of a specified item in a range.', [
            parameterDescription('lookup_value'),
            parameterDescription('lookup_array'),
            parameterDescription('match_type')
        ]),
        'XMATCH': functionDescription('This function returns the relative position of an item in an array. By default, an exact match is required.', [
            parameterDescription('lookup_value'),
            parameterDescription('lookup_array'),
            parameterDescription('[match_mode]'),
            parameterDescription('[search_mode]')
        ]),
        'XLOOKUP': functionDescription('This function searches a range or an array for a match and returns the corresponding item from a second range or array. By default, an exact match is used.', [
            parameterDescription('lookup_value'),
            parameterDescription('lookup_array'),
            parameterDescription('return_array'),
            parameterDescription('[if_not_found]'),
            parameterDescription('[match_mode]'),
            parameterDescription('[search_mode]')
        ]),
        'MAX': functionDescription('This function returns the maximum value, the greatest value, of all the values in the arguments.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MAXA': functionDescription('This function returns the largest value in a list of arguments, including text and logical values.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'MDETERM': functionDescription('This function returns the matrix determinant of an array.', [
            parameterDescription('array')
        ]),
        'MDURATION': functionDescription('This function calculates the modified Macaulay duration of a security with an assumed par value of $100.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('coupon'),
            parameterDescription('yield'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'MEDIAN': functionDescription('This function returns the median, the number in the middle of the provided set of numbers; that is, half the numbers have values that are greater than the median, and half have values that are less than the median.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MID': functionDescription('This function returns the requested number of characters from a text string starting at the position you specify, and based on the number of characters you specify.', [
            parameterDescription('text'),
            parameterDescription('start_num'),
            parameterDescription('num_chars')
        ]),
        'MIN': functionDescription('This function returns the minimum value, the least value, of all the values in the arguments.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MINA': functionDescription('This function returns the minimum value in a list of arguments, including text and logical values.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'MINUTE': functionDescription('This function returns the minute corresponding to a specified time.', [
            parameterDescription('time')
        ]),
        'MINVERSE': functionDescription('This function returns the inverse matrix for the matrix stored in an array.', [
            parameterDescription('array')
        ]),
        'MIRR': functionDescription('This function returns the modified internal rate of return for a series of periodic cash flows.', [
            parameterDescription('values'),
            parameterDescription('finance_rate'),
            parameterDescription('reinvest_rate')
        ]),
        'MMULT': functionDescription('This function returns the matrix product for two arrays.', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'MOD': functionDescription('This function returns the remainder of a division operation.', [
            parameterDescription('dividend'),
            parameterDescription('divisor')
        ]),
        'MODE': functionDescription('This function returns the most frequently occurring value in a set of data.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MONTH': functionDescription('This function returns the month corresponding to the specified date value.', [
            parameterDescription('date')
        ]),
        'MROUND': functionDescription('This function returns a number rounded to the desired multiple.', [
            parameterDescription('number'),
            parameterDescription('multiple')
        ]),
        'MULTINOMIAL': functionDescription('This function calculates the ratio of the factorial of a sum of values to the product of factorials.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MUNIT': functionDescription('The function returns the unit matrix for the specified dimension.', [
            parameterDescription('dimension'),
        ]),
        'N': functionDescription('This function returns a value converted to a number.', [
            parameterDescription('value')
        ]),
        'NA': functionDescription('This function returns the error value #N/A that means not available.', []),
        'SHEET': functionDescription('Returns the sheet number of reference sheet.', [
            parameterDescription('[value]'),
        ]),
        'SHEETS': functionDescription('Returns the number of sheets in a reference.', [
            parameterDescription('[reference]')
        ]),
        'NEGBINOMDIST': functionDescription('This function returns the negative binomial distribution.', [
            parameterDescription('number_f'),
            parameterDescription('number_s'),
            parameterDescription('probability_s')
        ]),
        'NETWORKDAYS': functionDescription('This function returns the total number of complete working days between the start and end dates.', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('holidays')
        ]),
        'NOMINAL': functionDescription('This function returns the nominal annual interest rate for a given effective rate and number of compounding periods per year.', [
            parameterDescription('effect_rate'),
            parameterDescription('npery')
        ]),
        'NORMDIST': functionDescription('This function returns the normal cumulative distribution for the specified mean and standard deviation.', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('standard_dev'),
            parameterDescription('cumulative')
        ]),
        'NORMINV': functionDescription('This function returns the inverse of the normal cumulative distribution for the given mean and standard deviation.', [
            parameterDescription('probability'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'NORMSDIST': functionDescription('This function returns the standard normal cumulative distribution function.', [
            parameterDescription('value')
        ]),
        'NORMSINV': functionDescription('This function returns the inverse of the standard normal cumulative distribution. The distribution has a mean of zero and a standard deviation of one.', [
            parameterDescription('probability')
        ]),
        'NOT': functionDescription('This function reverses the logical value of its argument.', [
            parameterDescription('logical')
        ]),
        'NOW': functionDescription('This function returns the current date and time.', []),
        'NPER': functionDescription('This function returns the number of periods for an investment based on a present value, future value, periodic payments, and a specified interest rate.', [
            parameterDescription('rate'),
            parameterDescription('paymt'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'NPV': functionDescription('This function calculates the net present value of an investment by using a discount rate and a series of future payments and income.', [
            parameterDescription('rate'),
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'OBJECT': functionDescription('This function converts the property/expression sequence to an object.', [
            parameterDescription('property1', true),
            parameterDescription('expression1', true)
        ]),
        'OCT2BIN': functionDescription('This function converts an octal number to a binary number.', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'OCT2DEC': functionDescription('This function converts an octal number to a decimal number.', [
            parameterDescription('number')
        ]),
        'OCT2HEX': functionDescription('This function converts an octal number to a hexadecimal number.', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'ODD': functionDescription('This function rounds the specified value up to the nearest odd integer.', [
            parameterDescription('number')
        ]),
        'ODDFPRICE': functionDescription('This function calculates the price per $100 face value of a security with an odd first period.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('issue'),
            parameterDescription('first_coupon'),
            parameterDescription('rate'),
            parameterDescription('yield'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'ODDFYIELD': functionDescription('This function calculates the yield of a security with an odd first period.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('issue'),
            parameterDescription('first_coupon'),
            parameterDescription('rate'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'ODDLPRICE': functionDescription('This function calculates the price per $100 face value of a security with an odd last coupon period.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('last_interest'),
            parameterDescription('rate'),
            parameterDescription('yield'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'ODDLYIELD': functionDescription('This function calculates the yield of a security with an odd last period.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('last_interest'),
            parameterDescription('rate'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'OFFSET': functionDescription('This function returns a reference to a range. The range is a specified number of rows and columns from a cell or range of cells. The function returns a single cell or a range of cells.', [
            parameterDescription('reference'),
            parameterDescription('rows'),
            parameterDescription('cols'),
            parameterDescription('height'),
            parameterDescription('width')
        ]),
        'OR': functionDescription('This function calculates logical OR. It returns TRUE if any of its arguments are true; otherwise, returns FALSE if all arguments are false.', [
            parameterDescription('logical1'),
            parameterDescription('logical2', true)
        ]),
        'PEARSON': functionDescription('This function returns the Pearson product moment correlation coefficient, a dimensionless index between -1.0 to 1.0 inclusive indicative of the linear relationship of two data sets.', [
            parameterDescription('array_ind'),
            parameterDescription('array_dep')
        ]),
        'PERCENTILE': functionDescription('This function returns the nth percentile of values in a range.', [
            parameterDescription('array'),
            parameterDescription('n')
        ]),
        'PERCENTRANK': functionDescription('This function returns the rank of a value in a data set as a percentage of the data set.', [
            parameterDescription('array'),
            parameterDescription('x'),
            parameterDescription('significance')
        ]),
        'PERMUT': functionDescription('This function returns the number of possible permutations for a specified number of items.', [
            parameterDescription('number'),
            parameterDescription('number_chosen')
        ]),
        'PI': functionDescription('This function returns PI as 3.1415926536.', []),
        'PMT': functionDescription('This function returns the payment amount for a loan given the present value, specified interest rate, and number of terms.', [
            parameterDescription('rate'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'POISSON': functionDescription('This function returns the Poisson distribution.', [
            parameterDescription('nevents'),
            parameterDescription('mean'),
            parameterDescription('cumulative')
        ]),
        'POWER': functionDescription('This function raises the specified number to the specified power.', [
            parameterDescription('number'),
            parameterDescription('power')
        ]),
        'PPMT': functionDescription('This function returns the amount of payment of principal for a loan given the present value, specified interest rate, and number of terms.', [
            parameterDescription('rate'),
            parameterDescription('per'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'PRICE': functionDescription('This function calculates the price per $100 face value of a periodic interest security', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('rate'),
            parameterDescription('yield'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'PRICEDISC': functionDescription('This function returns the price per $100 face value of a discounted security.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('discount'),
            parameterDescription('redemption'),
            parameterDescription('basis')
        ]),
        'PRICEMAT': functionDescription('This function returns the price at maturity per $100 face value of a security that pays interest.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('issue'),
            parameterDescription('rate'),
            parameterDescription('yield'),
            parameterDescription('basis')
        ]),
        'PROB': functionDescription('This function returns the probability that values in a range are between two limits.', [
            parameterDescription('x_range'),
            parameterDescription('prob_range'),
            parameterDescription('lower_limit'),
            parameterDescription('upper_limit')
        ]),
        'PRODUCT': functionDescription('This function multiplies all the arguments and returns the product.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'PROPER': functionDescription('This function capitalizes the first letter in each word of a text string.', [
            parameterDescription('text')
        ]),
        'PROPERTY': functionDescription('This function returns the value of property path in object.', [
            parameterDescription('data_expression'),
            parameterDescription('property_path')
        ]),
        'PV': functionDescription('This function returns the present value of an investment based on the interest rate, number and amount of periodic payments, and future value. The present value is the total amount that a series of future payments is worth now.', [
            parameterDescription('rate'),
            parameterDescription('numper'),
            parameterDescription('paymt'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'QUARTILE': functionDescription('This function returns which quartile (which quarter or 25 percent) of a data set a value is.', [
            parameterDescription('array'),
            parameterDescription('quart')
        ]),
        'QUOTIENT': functionDescription('This function returns the integer portion of a division. Use this to ignore the remainder of a division.', [
            parameterDescription('numerator'),
            parameterDescription('denominator')
        ]),
        'RADIANS': functionDescription('This function converts the specified number from degrees to radians.', [
            parameterDescription('angle')
        ]),
        'RAND': functionDescription('This function returns an evenly distributed random number between 0 and 1.', []),
        'RANDBETWEEN': functionDescription('This function returns a random number between the numbers you specify.', [
            parameterDescription('bottom'),
            parameterDescription('top')
        ]),
        'RANGEBLOCKSPARKLINE': functionDescription('This function returns a rangetemplate.', [
            parameterDescription('template_range'),
            parameterDescription('data_expression')
        ]),
        'RANK': functionDescription('This function returns the rank of a number in a set of numbers. If you were to sort the set, the rank of the number would be its position in the list.', [
            parameterDescription('number'),
            parameterDescription('ref'),
            parameterDescription('order')
        ]),
        'RATE': functionDescription('This function returns the interest rate per period of an annuity.', [
            parameterDescription('nper'),
            parameterDescription('pmt'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type'),
            parameterDescription('guess')
        ]),
        'RECEIVED': functionDescription('This function returns the amount received at maturity for a fully invested security.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('investment'),
            parameterDescription('discount'),
            parameterDescription('basis')
        ]),
        'REPLACE': functionDescription('This function replaces part of a text string with a different text string, based on the number of characters you specify.', [
            parameterDescription('old_text'),
            parameterDescription('start_num'),
            parameterDescription('num_chars'),
            parameterDescription('new_text')
        ]),
        'REPT': functionDescription('This function repeats text a specified number of times.', [
            parameterDescription('text'),
            parameterDescription('number_times')
        ]),
        'RIGHT': functionDescription('This function returns the specified rightmost characters from a text value, and based on the number of characters you specify.', [
            parameterDescription('text'),
            parameterDescription('num_chars')
        ]),
        'ROMAN': functionDescription('This function converts an Arabic numeral to a Roman numeral text equivalent.', [
            parameterDescription('number'),
            parameterDescription('form')
        ]),
        'ROUND': functionDescription('This function rounds the specified value to the nearest number, using the specified number of decimal places.', [
            parameterDescription('number'),
            parameterDescription('num_digits')
        ]),
        'ROUNDDOWN': functionDescription('This function rounds the specified number down to the nearest number, using the specified number of decimal places.', [
            parameterDescription('number'),
            parameterDescription('num_digits')
        ]),
        'ROUNDUP': functionDescription('This function rounds the specified number up to the nearest number, using the specified number of decimal places.', [
            parameterDescription('number'),
            parameterDescription('num_digits')
        ]),
        'ROW': functionDescription('This function returns the number of a row from a reference.', [
            parameterDescription('reference')
        ]),
        'ROWS': functionDescription('This function returns the number of rows in an array.', [
            parameterDescription('array')
        ]),
        'RSQ': functionDescription('This function returns the square of the Pearson product moment correlation coefficient (R-squared) through data points in known y\'s and known x\'s.', [
            parameterDescription('array_dep'),
            parameterDescription('array_ind')
        ]),
        'SEARCH': functionDescription('This function finds one text string in another text string and returns the index of the starting position of the found text.', [
            parameterDescription('find_text'),
            parameterDescription('within_text'),
            parameterDescription(START_NUMBER)
        ]),
        'SECOND': functionDescription('This function returns the seconds (0 to 59) value for a specified time.', [
            parameterDescription('time')
        ]),
        'SERIESSUM': functionDescription('This function returns the sum of a power series.', [
            parameterDescription('x'),
            parameterDescription('n'),
            parameterDescription('m'),
            parameterDescription('coefficients')
        ]),
        'SIGN': functionDescription('This function returns the sign of a number or expression.', [
            parameterDescription('cellreference')
        ]),
        'SIN': functionDescription('This function returns the sine of the specified angle.', [
            parameterDescription('angle')
        ]),
        'SINH': functionDescription('This function returns the hyperbolic sine of the specified number.', [
            parameterDescription('number')
        ]),
        'SKEW': functionDescription('This function returns the skewness of a distribution.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'SLN': functionDescription('This function returns the straight-line depreciation of an asset for one period.', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life')
        ]),
        'SLOPE': functionDescription('This function calculates the slope of a linear regression.', [
            parameterDescription('array_dep'),
            parameterDescription('array_ind')
        ]),
        'SMALL': functionDescription('This function returns the nth smallest value in a data set, where n is specified.', [
            parameterDescription('array'),
            parameterDescription('n')
        ]),
        'SQRT': functionDescription('This function returns the positive square root of the specified number.', [
            parameterDescription('value')
        ]),
        'SQRTPI': functionDescription('This function returns the positive square root of a multiple of pi (p).', [
            parameterDescription('multiple')
        ]),
        'STANDARDIZE': functionDescription('This function returns a normalized value from a distribution characterized by mean and standard deviation.', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'STDEVA': functionDescription('This function returns the standard deviation for a set of numbers, text, or logical values.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'STDEVP': functionDescription('This function returns the standard deviation for an entire specified population (of numeric values).', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'STDEVPA': functionDescription('This function returns the standard deviation for an entire specified population, including text or logical values as well as numeric values.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'STEYX': functionDescription('This function returns the standard error of the predicted y value for each x. The standard error is a measure of the amount of error in the prediction of y for a value of x.', [
            parameterDescription('array_dep'),
            parameterDescription('array_ind')
        ]),
        'SUBSTITUTE': functionDescription('This function substitutes a new string for specified characters in an existing string.', [
            parameterDescription('text'),
            parameterDescription('old_text'),
            parameterDescription('new_text'),
            parameterDescription('instance_num')
        ]),
        'SUBTOTAL': functionDescription('This function calculates a subtotal of a list of numbers using a specified built-in function.', [
            parameterDescription('function_num'),
            parameterDescription('ref1'),
            parameterDescription('ref2', true)
        ]),
        'SUM': functionDescription('This function returns the sum of cells or range of cells.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'SUMIF': functionDescription('This function adds the cells using a given criteria.', [
            parameterDescription('range'),
            parameterDescription('criteria'),
            parameterDescription('sum_range')
        ]),
        'SUMIFS': functionDescription('This function adds the cells in a range using multiple criteria.', [
            parameterDescription('sum_range'),
            parameterDescription('criteria_range1', true),
            parameterDescription('criteria1', true)
        ]),
        'SUMPRODUCT': functionDescription('This function returns the sum of products of cells. Multiplies corresponding components in the given arrays, and returns the sum of those products.', [
            parameterDescription('array1'),
            parameterDescription('array2', true)
        ]),
        'SUMSQ': functionDescription('This function returns the sum of the squares of the arguments.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'SUMX2MY2': functionDescription('This function returns the sum of the difference of the squares of corresponding values in two arrays.', [
            parameterDescription('array_x'),
            parameterDescription('array_y')
        ]),
        'SUMX2PY2': functionDescription('This function returns the sum of the sum of squares of corresponding values in two arrays.', [
            parameterDescription('array_x'),
            parameterDescription('array_y')
        ]),
        'SUMXMY2': functionDescription('This function returns the sum of the square of the differences of corresponding values in two arrays.', [
            parameterDescription('array_x'),
            parameterDescription('array_y')
        ]),
        'SYD': functionDescription('This function returns the sum-of-years\' digits depreciation of an asset for a specified period.', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life'),
            parameterDescription('period')
        ]),
        'T': functionDescription('This function returns the text in a specified cell.', [
            parameterDescription('value')
        ]),
        'TAN': functionDescription('This function returns the tangent of the specified angle.', [
            parameterDescription('angle')
        ]),
        'TANH': functionDescription('This function returns the hyperbolic tangent of the specified number.', [
            parameterDescription('number')
        ]),
        'TBILLEQ': functionDescription('This function returns the equivalent yield for a Treasury bill (or T-bill)', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('discount')
        ]),
        'TBILLPRICE': functionDescription('This function returns the price per $100 face value for a Treasury bill (or T-bill).', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('discount')
        ]),
        'TBILLYIELD': functionDescription('This function returns the yield for a Treasury bill (or T-bill).', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('priceper')
        ]),
        'TDIST': functionDescription('This function returns the probability for the t-distribution.', [
            parameterDescription('x'),
            parameterDescription('deg_freedom'),
            parameterDescription('tails')
        ]),
        'TEXT': functionDescription('This function formats a number and converts it to text.', [
            parameterDescription('value'),
            parameterDescription('format_text')
        ]),
        'TIME': functionDescription('This function returns the TimeSpan object for a specified time.', [
            parameterDescription('hour'),
            parameterDescription('minute'),
            parameterDescription('second')
        ]),
        'TIMEVALUE': functionDescription('This function returns the TimeSpan object of the time represented by a text string.', [
            parameterDescription('time_text')
        ]),
        'TINV': functionDescription('This function returns the t-value of the student\'s t-distribution as a function of the probability and the degrees of freedom.', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'TODAY': functionDescription('This function returns the date and time of the current date.', []),
        'TRANSPOSE': functionDescription('This function returns a vertical range of cells as a horizontal range or a horizontal range of cells as a vertical range.', [
            parameterDescription('array')
        ]),
        'TREND': functionDescription('This function returns values along a linear trend. This function fits a straight line to the arrays known x and y values. Trend returns the y values along that line for the array of specified new x values.', [
            parameterDescription('y'),
            parameterDescription('x'),
            parameterDescription('newx'),
            parameterDescription('constant')
        ]),
        'TRIM': functionDescription('This function removes extra spaces from a string and leaves single spaces between words.', [
            parameterDescription('text')
        ]),
        'TRIMMEAN': functionDescription('This function returns the mean of a subset of data excluding the top and bottom data.', [
            parameterDescription('array'),
            parameterDescription('percent')
        ]),
        'TRUE': functionDescription('This function returns the value for logical TRUE.', []),
        'TRUNC': functionDescription('This function removes the specified fractional part of the specified number.', [
            parameterDescription('number'),
            parameterDescription('num_digits')
        ]),
        'TTEST': functionDescription('This function returns the probability associated with a t-test.', [
            parameterDescription('array1'),
            parameterDescription('array2'),
            parameterDescription('tails'),
            parameterDescription('type')
        ]),
        'TYPE': functionDescription('This function returns the type of value.', [
            parameterDescription('value')
        ]),
        'UPPER': functionDescription('This function converts text to uppercase letters.', [
            parameterDescription('text')
        ]),
        'VALUE': functionDescription('This function converts a text string that is a number to a numeric value.', [
            parameterDescription('text')
        ]),
        'VAR': functionDescription('This function returns the variance based on a sample of a population, which uses only numeric values.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'VARA': functionDescription('This function returns the variance based on a sample of a population, which includes numeric, logical, or text values.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'VARP': functionDescription('This function returns variance based on the entire population, which uses only numeric values.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'VARPA': functionDescription('This function returns variance based on the entire population, which includes numeric, logical, or text values.', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'VDB': functionDescription('This function returns the depreciation of an asset for any period you specify using the variable declining balance method.', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life'),
            parameterDescription('start_period'),
            parameterDescription('end_period'),
            parameterDescription('factor'),
            parameterDescription('no_switch')
        ]),
        'VLOOKUP': functionDescription('This function searches for a value in the leftmost column and returns a value in the same row from a column you specify.', [
            parameterDescription('lookup_value'),
            parameterDescription('table_array'),
            parameterDescription('col_index_num'),
            parameterDescription('range_lookup')
        ]),
        'WEEKDAY': functionDescription('This function returns the number corresponding to the day of the week for a specified date.', [
            parameterDescription('date'),
            parameterDescription('type')
        ]),
        'WEEKNUM': functionDescription('This function returns a number that indicates the week of the year numerically.', [
            parameterDescription('date'),
            parameterDescription('weektype')
        ]),
        'WEIBULL': functionDescription('This function returns the two-parameter Weibull distribution, often used in reliability analysis.', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative')
        ]),
        'WORKDAY': functionDescription('This function returns the number of working days before or after the starting date.', [
            parameterDescription('start_date'),
            parameterDescription('days'),
            parameterDescription('holidays')
        ]),
        'XIRR': functionDescription('This function calculates the internal rate of return for a schedule of cash flows that may not be periodic.', [
            parameterDescription('values'),
            parameterDescription('dates'),
            parameterDescription('guess')
        ]),
        'XNPV': functionDescription('This function calculates the net present value for a schedule of cash flows that may not be periodic.', [
            parameterDescription('rate'),
            parameterDescription('values'),
            parameterDescription('dates')
        ]),
        'YEAR': functionDescription('This function returns the year as an integer for a specified date.', [
            parameterDescription('date')
        ]),
        'YEARFRAC': functionDescription('This function returns the fraction of the year represented by the number of whole days between the start and end dates.', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('basis')
        ]),
        'YIELD': functionDescription('This function calculates the yield on a security that pays periodic interest.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('rate'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'YIELDDISC': functionDescription('This function calculates the annual yield for a discounted security.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('basis')
        ]),
        'YIELDMAT': functionDescription('This function calculates the annual yield of a security that pays interest at maturity.', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('issue'),
            parameterDescription('rate'),
            parameterDescription('price'),
            parameterDescription('basis')
        ]),
        'ZTEST': functionDescription('This function returns the significance value of a z-test. The z-test generates a standard score for x with respect to the set of data and returns the two-tailed probability for the normal distribution.', [
            parameterDescription('array'),
            parameterDescription('x'),
            parameterDescription('sigma')
        ]),
        'HBARSPARKLINE': functionDescription('This function returns a data set used for representing a Hbar sparkline', [
            parameterDescription('value'),
            parameterDescription('colorScheme'),
            parameterDescription('axisVisible'),
            parameterDescription('barHeight')
        ]),
        'VBARSPARKLINE': functionDescription('This function returns a data set used for representing a Vbar sparkline', [
            parameterDescription('value'),
            parameterDescription('colorScheme'),
            parameterDescription('axisVisible'),
            parameterDescription('barWidth')
        ]),
        'VARISPARKLINE': functionDescription('This function returns a data set used for representing a variance sparkline', [
            parameterDescription('variance'),
            parameterDescription('reference'),
            parameterDescription('mini'),
            parameterDescription('maxi'),
            parameterDescription('mark'),
            parameterDescription('tickunit'),
            parameterDescription('legend'),
            parameterDescription('colorPositive'),
            parameterDescription('colorNegative'),
            parameterDescription('vertical')
        ]),
        'PIESPARKLINE': functionDescription('This function returns a data set used for representing a pie sparkline', [
            parameterDescription('range|percentage'),
            parameterDescription('color', true)
        ]),
        'AREASPARKLINE': functionDescription('This function returns a data set used for representing a area sparkline', [
            parameterDescription('points'),
            parameterDescription('mini'),
            parameterDescription('maxi'),
            parameterDescription('line1'),
            parameterDescription('line2'),
            parameterDescription('colorPositive'),
            parameterDescription('colorNegative')
        ]),
        'SCATTERSPARKLINE': functionDescription('This function returns a data set used for representing a scatter sparkline', [
            parameterDescription('points1'),
            parameterDescription('points2'),
            parameterDescription('minX'),
            parameterDescription('maxX'),
            parameterDescription('minY'),
            parameterDescription('maxY'),
            parameterDescription('hLine'),
            parameterDescription('vLine'),
            parameterDescription('xMinZone'),
            parameterDescription('xMaxZone'),
            parameterDescription('yMinZone'),
            parameterDescription('yMaxZone'),
            parameterDescription('tags'),
            parameterDescription('drawSymbol'),
            parameterDescription('drawLines'),
            parameterDescription('color1'),
            parameterDescription('color2'),
            parameterDescription('dash')
        ]),
        'LINESPARKLINE': functionDescription('This function returns a data set used for representing a line sparkline', [
            parameterDescription('data'),
            parameterDescription('dataOrientation'),
            parameterDescription('dateAxisData'),
            parameterDescription('dateAxisOrientation'),
            parameterDescription('setting')
        ]),
        'COLUMNSPARKLINE': functionDescription('This function returns a data set used for representing a column sparkline', [
            parameterDescription('data'),
            parameterDescription('dataOrientation'),
            parameterDescription('dateAxisData'),
            parameterDescription('dateAxisOrientation'),
            parameterDescription('setting')
        ]),
        'WINLOSSSPARKLINE': functionDescription('This function returns a data set used for representing a win/loss sparkline', [
            parameterDescription('data'),
            parameterDescription('dataOrientation'),
            parameterDescription('dateAxisData'),
            parameterDescription('dateAxisOrientation'),
            parameterDescription('setting')
        ]),
        'BULLETSPARKLINE': functionDescription('This function returns a data set used for representing a bullet sparkline', [
            parameterDescription('measure'),
            parameterDescription('target'),
            parameterDescription('maxi'),
            parameterDescription('good'),
            parameterDescription('bad'),
            parameterDescription('forecast'),
            parameterDescription('tickunit'),
            parameterDescription('colorScheme'),
            parameterDescription('vertical'),
            parameterDescription('measureColor'),
            parameterDescription('targetColor'),
            parameterDescription('maxiColor'),
            parameterDescription('goodColor'),
            parameterDescription('badColor'),
            parameterDescription('forecastColor'),
            parameterDescription('allowMeasureOverMaxi'),
            parameterDescription('barSize')
        ]),
        'SPREADSPARKLINE': functionDescription('This function returns a data set used for representing a spread sparkline', [
            parameterDescription('points'),
            parameterDescription('showAverage'),
            parameterDescription('scaleStart'),
            parameterDescription('scaleEnd'),
            parameterDescription('style'),
            parameterDescription('colorScheme'),
            parameterDescription('vertical')
        ]),
        'STACKEDSPARKLINE': functionDescription('This function returns a data set used for representing a stacked sparkline', [
            parameterDescription('points'),
            parameterDescription('colorRange'),
            parameterDescription('labelRange'),
            parameterDescription('maximum'),
            parameterDescription('targetRed'),
            parameterDescription('targetGreen'),
            parameterDescription('targetBlue'),
            parameterDescription('tragetYellow'),
            parameterDescription('color'),
            parameterDescription('highlightPosition'),
            parameterDescription('vertical'),
            parameterDescription('textOrientation'),
            parameterDescription('textSize')
        ]),
        'BOXPLOTSPARKLINE': functionDescription('This function returns a data set used for representing a boxplot sparkline', [
            parameterDescription('points'),
            parameterDescription('boxPlotClass'),
            parameterDescription('showAverage'),
            parameterDescription('scaleStart'),
            parameterDescription('scaleEnd'),
            parameterDescription('acceptableStart'),
            parameterDescription('acceptableEnd'),
            parameterDescription('colorScheme'),
            parameterDescription('style'),
            parameterDescription('vertical')
        ]),
        'CASCADESPARKLINE': functionDescription('This function returns a data set used for representing a cascade sparkline', [
            parameterDescription('pointsRange'),
            parameterDescription('pointIndex'),
            parameterDescription('labelsRange'),
            parameterDescription('minimum'),
            parameterDescription('maximum'),
            parameterDescription('colorPositive'),
            parameterDescription('colorNegative'),
            parameterDescription('vertical'),
            parameterDescription('itemTypeRange'),
            parameterDescription('colorTotal')
        ]),
        'PARETOSPARKLINE': functionDescription('This function returns a data set used for representing a pareto sparkline', [
            parameterDescription('points'),
            parameterDescription('pointIndex'),
            parameterDescription('colorRange'),
            parameterDescription('target'),
            parameterDescription('target2'),
            parameterDescription('highlightPosition'),
            parameterDescription('label'),
            parameterDescription('vertical'),
            parameterDescription('targetColor'),
            parameterDescription('target2Color'),
            parameterDescription('labelColor'),
            parameterDescription('barSize')
        ]),
        'MONTHSPARKLINE': functionDescription('This function returns a data set used for representing a month sparkline', [
            parameterDescription('year'),
            parameterDescription('month'),
            parameterDescription('dataRange'),
            parameterDescription('emptyColor'),
            parameterDescription('startColor'),
            parameterDescription('middleColor'),
            parameterDescription('endColor')
        ]),
        'YEARSPARKLINE': functionDescription('This function returns a data set used for representing a year sparkline', [
            parameterDescription('year'),
            parameterDescription('dataRange'),
            parameterDescription('emptyColor'),
            parameterDescription('startColor'),
            parameterDescription('middleColor'),
            parameterDescription('endColor')
        ]),
        'GAUGEKPISPARKLINE': functionDescription('This function returns a data set used for representing a gauge KPI sparkline', [
            parameterDescription('targetValue'),
            parameterDescription('currentValue'),
            parameterDescription('minValue'),
            parameterDescription('maxValue'),
            parameterDescription('showLabel'),
            parameterDescription('targetValueLabel'),
            parameterDescription('currentValueLabel'),
            parameterDescription('minValueLabel'),
            parameterDescription('maxValueLabel'),
            parameterDescription('fontArray'),
            parameterDescription('minAngle'),
            parameterDescription('maxAngle'),
            parameterDescription('radiusRatio'),
            parameterDescription('gaugeType'),
            parameterDescription('colorRange'),
            parameterDescription('...')
        ]),
        'HISTOGRAMSPARKLINE': functionDescription('This function returns a data set used for representing a histogram sparkline', [
            parameterDescription('dateRange'),
            parameterDescription('continuous'),
            parameterDescription('paintLabel'),
            parameterDescription('scale'),
            parameterDescription('barWidth'),
            parameterDescription('barColor'),
            parameterDescription('labelFontStyle'),
            parameterDescription('labelColor'),
            parameterDescription('edgeColor'),
        ]),
        'CEILING.PRECISE': functionDescription('This function rounds a number up to the nearest integer or to the nearest multiple of a specified value.', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'COVARIANCE.S': functionDescription('This function returns the sample covariance, which is the average of the products of deviations for each data point pair in two sets of numbers.', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'FLOOR.PRECISE': functionDescription('This function rounds a number down to the nearest integer or to the nearest multiple of a specified value.', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'PERCENTILE.EXC': functionDescription('This function returns the nth percentile of values in a range.', [
            parameterDescription('array'),
            parameterDescription('k')
        ]),
        'QUARTILE.EXC': functionDescription('This function returns which quartile (which quarter or 25 percent) of a data set a value is.', [
            parameterDescription('array'),
            parameterDescription('quart')
        ]),
        'RANK.AVG': functionDescription('This function returns the rank of a number in a set of numbers. If some values have the same rank, it will return the average rank.', [
            parameterDescription('number'),
            parameterDescription('ref'),
            parameterDescription('[order]')
        ]),
        'MODE.MULT': functionDescription('This function returns the most frequently occurring vertical array or the most frequently occurring value in a set of data.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'STDEV.P': functionDescription('This function returns the standard deviation for an entire specified population (of numeric values).', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'VAR.P': functionDescription('This function returns variance based on the entire population, which uses only numeric values.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'COVARIANCE.P': functionDescription('This function returns the covariance, which is the average of the products of deviations for each data point pair in two sets of numbers.', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'MODE.SNGL': functionDescription('This function returns the most frequently occurring value in a set of data.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'PERCENTILE.INC': functionDescription('This function returns the nth percentile of values in a range.', [
            parameterDescription('array'),
            parameterDescription('k')
        ]),
        'QUARTILE.INC': functionDescription('This function returns which quartile (which quarter or 25 percent) of a data set a value is.', [
            parameterDescription('array'),
            parameterDescription('quart')
        ]),
        'RANK.EQ': functionDescription('This function returns the rank of a number in a set of numbers. If you were to sort the set, the rank of the number would be its position in the list.', [
            parameterDescription('number'),
            parameterDescription('ref'),
            parameterDescription('[order]')
        ]),
        'STDEV': functionDescription('This function returns standard deviation is estimated based on a sample.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'STDEV.S': functionDescription('This function returns standard deviation is estimated based on a sample.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'VAR.S': functionDescription('This function returns the variance based on a sample of a population, which uses only numeric values.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'BETA.INV': functionDescription('This function calculates the inverse of the cumulative beta distribution function.', [
            parameterDescription('probability'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('[lower]'),
            parameterDescription('[upper]')
        ]),
        'BINOM.DIST': functionDescription('This function calculates the individual term binomial distribution probability.', [
            parameterDescription('number_s'),
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('cumulative')
        ]),
        'BINOM.INV': functionDescription('This function returns the criterion binomial, the smallest value for which the cumulative binomial distribution is greater than or equal to a criterion value.', [
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('alpha')
        ]),
        'CHISQ.DIST.RT': functionDescription('This function calculates the one-tailed probability of the chi-squared distribution.', [
            parameterDescription('value'),
            parameterDescription('deg_freedom')
        ]),
        'CHISQ.INV.RT': functionDescription('This function calculates the inverse of the one-tailed probability of the chi-squared distribution.', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'CHISQ.TEST': functionDescription('This function calculates the test for independence from the chi-squared distribution.', [
            parameterDescription('actual_range'),
            parameterDescription('expected_range')
        ]),
        'CONFIDENCE.NORM': functionDescription('This function returns confidence interval for a population mean.', [
            parameterDescription('alpha'),
            parameterDescription('standard_dev'),
            parameterDescription('size')
        ]),
        'EXPON.DIST': functionDescription('This function returns the exponential distribution or the probability density.', [
            parameterDescription('value'),
            parameterDescription('lambda'),
            parameterDescription('cumulative')
        ]),
        'F.DIST.RT': functionDescription('This function calculates the F probability distribution, to see degrees of diversity between two sets of data.', [
            parameterDescription('value'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'F.INV.RT': functionDescription('This function returns the inverse of the F probability distribution.', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'F.TEST': functionDescription('This function returns the result of an F-test, which returns the one-tailed probability that the variances in two arrays are not significantly different.', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'GAMMA.DIST': functionDescription('This function returns the gamma distribution.', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative')
        ]),
        'GAMMA.INV': functionDescription('This function returns the inverse of the gamma cumulative distribution.', [
            parameterDescription('probability'),
            parameterDescription('alpha'),
            parameterDescription('beta')
        ]),
        'LOGNORM.INV': functionDescription('This function returns the inverse of the lognormal cumulative distribution function of x, where LN(x) is normally distributed with the specified mean and standard deviation.', [
            parameterDescription('probability'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'NORM.DIST': functionDescription('This function returns the normal cumulative distribution for the specified mean and standard deviation.', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('standard_dev'),
            parameterDescription('cumulative')
        ]),
        'NORM.INV': functionDescription('This function returns the inverse of the normal cumulative distribution for the given mean and standard deviation.', [
            parameterDescription('probability'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'NORM.S.INV': functionDescription('This function returns the inverse of the standard normal cumulative distribution. The distribution has a mean of zero and a standard deviation of one.', [
            parameterDescription('probability')
        ]),
        'PERCENTRANK.INC': functionDescription('This function returns the rank of a value in a data set as a percentage of the data set.', [
            parameterDescription('array'),
            parameterDescription('n'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'POISSON.DIST': functionDescription('This function returns the Poisson distribution.', [
            parameterDescription('nevents'),
            parameterDescription('mean'),
            parameterDescription('cumulative')
        ]),
        'T.INV.2T': functionDescription('This function returns the t-value of the student\'s t-distribution as a function of the probability and the degrees of freedom.', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'T.TEST': functionDescription('This function returns the probability associated with a t-test.', [
            parameterDescription('array1'),
            parameterDescription('array2'),
            parameterDescription('tails'),
            parameterDescription('type')
        ]),
        'WEIBULL.DIST': functionDescription('This function returns the two-parameter Weibull distribution, often used in reliability analysis.', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative')
        ]),
        'Z.TEST': functionDescription('This function returns the significance value of a z-test. The z-test generates a standard score for x with respect to the set of data and returns the two-tailed probability for the normal distribution.', [
            parameterDescription('array'),
            parameterDescription('x'),
            parameterDescription('[sigma]')
        ]),
        'T.DIST.RT': functionDescription('This function returns the right-tailed t-distribution.', [
            parameterDescription('x'),
            parameterDescription('deg_freedom')
        ]),
        'T.DIST.2T': functionDescription('This function returns the two-tailed t-distribution.', [
            parameterDescription('x'),
            parameterDescription('deg_freedom')
        ]),
        'ISO.CEILING': functionDescription('This function returns a number up to the nearest integer or to the nearest multiple of significance, regardless of sign of significance.', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'BETA.DIST': functionDescription('This function returns the beta distribution.', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative'),
            parameterDescription('lower'),
            parameterDescription('upper')
        ]),
        'GAMMALN.PRECISE': functionDescription('This function returns the natural logarithm of the gamma function.', [
            parameterDescription('value')
        ]),
        'ERF.PRECISE': functionDescription('This function returns the error function.', [
            parameterDescription('lowerlimit')
        ]),
        'ERFC.PRECISE': functionDescription('This function returns the complementary ERF function.', [
            parameterDescription('lowerlimit')
        ]),
        'PERCENTRANK.EXC': functionDescription('This function returns the percentage rank(0..1, exclusive) of a value in a data set.', [
            parameterDescription('array'),
            parameterDescription('x'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'HYPGEOM.DIST': functionDescription('This function returns the hypergeometric distribution.', [
            parameterDescription('sample_s'),
            parameterDescription('number_sample'),
            parameterDescription('population_s'),
            parameterDescription('number_pop'),
            parameterDescription('cumulative')
        ]),
        'LOGNORM.DIST': functionDescription('This function returns the log normal distribution of x.', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('stdev'),
            parameterDescription('cumulative')
        ]),
        'NEGBINOM.DIST': functionDescription('This function returns the negative binomial distribution.', [
            parameterDescription('number_f'),
            parameterDescription('number_s'),
            parameterDescription('probability_s'),
            parameterDescription('cumulative')
        ]),
        'NORM.S.DIST': functionDescription('This function returns the standard normal distribution.', [
            parameterDescription('z'),
            parameterDescription('cumulative')
        ]),
        'T.DIST': functionDescription('This function returns the t-distribution.', [
            parameterDescription('x'),
            parameterDescription('deg_freedom'),
            parameterDescription('cumulative')
        ]),
        'F.DIST': functionDescription('This function returns the F probability distribution.', [
            parameterDescription('x'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2'),
            parameterDescription('cumulative')
        ]),
        'CHISQ.DIST': functionDescription('This function returns the chi-squared distribution.', [
            parameterDescription('x'),
            parameterDescription('deg_freedom'),
            parameterDescription('cumulative')
        ]),
        'F.INV': functionDescription('This function returns the inverse of the F probability distribution.', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'T.INV': functionDescription('This function returns the left-tailed inverse of the t-distribution.', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'CHISQ.INV': functionDescription('This function returns the inverse of left-tailed probability of the chi-squared distribution.', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'CONFIDENCE.T': functionDescription('This function returns the confidence interval for a Student\'s t distribution.', [
            parameterDescription('alpha'),
            parameterDescription('standard_dev'),
            parameterDescription('size')
        ]),
        'NETWORKDAYS.INTL': functionDescription('This function returns the number of workdays between two dates using arguments to indicate holidays and weekend days.', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('[weekend]'),
            parameterDescription('[holidays]')
        ]),
        'WORKDAY.INTL': functionDescription('This function returns the serial number of the date before or after a number of workdays with custom weekend parameters. These parameters indicate weekend days and holidays.', [
            parameterDescription('start_date'),
            parameterDescription('days'),
            parameterDescription('[weekend]'),
            parameterDescription('[holidays]')
        ]),
        'REFRESH': functionDescription('This function decides how to re-calculate the formula. Can use the evaluateMode argument to specific the formula re-calculate on the reference value changed, evaluate once , re-calculate or interval.', [
            parameterDescription('formula'),
            parameterDescription('evaluateMode'),
            parameterDescription('interval')
        ]),
        'DAYS': functionDescription('This function returns the number of days between two dates.', [
            parameterDescription('end_date'),
            parameterDescription('start_date'),
        ]),
        'ISOWEEKNUM': functionDescription('This function returns the number of the ISO week number of the year for a given date.', [
            parameterDescription('date')
        ]),
        'BITAND': functionDescription('This function returns a bitwise "AND" of two numbers.', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'BITLSHIFT': functionDescription('This function returns a bitwise "OR" of two numbers.', [
            parameterDescription('number'),
            parameterDescription('shift_amount')
        ]),
        'BITOR': functionDescription('This function returns a bitwise "OR" of two numbers.', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'BITRSHIFT': functionDescription('This function returns a bitwise "OR" of two numbers.', [
            parameterDescription('number'),
            parameterDescription('shift_amount')
        ]),
        'BITXOR': functionDescription('This function returns a bitwise "XOR" of two numbers.', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'IMCOSH': functionDescription('This function returns the hyperbolic cosine of a complex number in x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMCOT': functionDescription('This function returns the cotangent of a complex number in x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMCSC': functionDescription('This function returns the cosecant of a complex number in x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMCSCH': functionDescription('This function returns the hyperbolic cosecant of a complex number in x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMSEC': functionDescription('This function returns the secant of a complex number in x+yi of x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMSECH': functionDescription('This function returns the hyperbolic secant of a complex number in x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMSINH': functionDescription('This function returns the hyperbolic sine of a complex number in x+yi of x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'IMTAN': functionDescription('This function returns the tangent of a complex number in x+yi or x+yj text format.', [
            parameterDescription('complexnum')
        ]),
        'PDURATION': functionDescription('This function returns the number of periods required by an investment to reach a specified value.', [
            parameterDescription('rate'),
            parameterDescription('pval'),
            parameterDescription('fval')
        ]),
        'RRI': functionDescription('This function returns an equivalent interest rate for the growth of an investment.', [
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('fval')
        ]),
        'ISFORMULA': functionDescription('This function tests whether contains a formula of a referenced cell.', [
            parameterDescription('cellreference')
        ]),
        'IFNA': functionDescription('This function returns the value you specify if the formula returns the #N/A error value, otherwise returns the result of the formula.', [
            parameterDescription('value'),
            parameterDescription('value_if_na')
        ]),
        'IFS': functionDescription('This function checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.', [
            parameterDescription('logical_test1'),
            parameterDescription('value_if_true1', true)
        ]),
        'SWITCH': functionDescription('This function evaluates one value (called the expression) against a list of values, and returns the result corresponding to the first matching value. If there is no match, an optional default value may be returned.', [
            parameterDescription('expression'),
            parameterDescription('value1'),
            parameterDescription('result1'),
            parameterDescription('[default_or_value2]', true),
            parameterDescription('[result2]', true),
        ]),
        'XOR': functionDescription('This function returns a logical exclusive or of all arguments.', [
            parameterDescription('logical', true)
        ]),
        'AREAS': functionDescription('This function returns the number of areas in a reference.', [
            parameterDescription('reference')
        ]),
        'FORMULATEXT': functionDescription('This function returns a formula as a string.', [
            parameterDescription('reference')
        ]),
        'HYPERLINK': functionDescription('This function creates a shortcut or jump that opens a document stored on a network server, an intranet, or the Internet.', [
            parameterDescription('link_location'),
            parameterDescription('friendly_name')
        ]),
        'ACOT': functionDescription('This function calculates the inverse arccotangent of a number.', [
            parameterDescription('number')
        ]),
        'ACOTH': functionDescription('This function calculates the inverse hyperbolic arccotangent of a number.', [
            parameterDescription('number')
        ]),
        'ARABIC': functionDescription('This function converts a Roman numeral text to an Arabic numeral equivalent.', [
            parameterDescription('text')
        ]),
        'BASE': functionDescription('This function converts a number into a text representation with the given radix (base).', [
            parameterDescription('number'),
            parameterDescription('radix'),
            parameterDescription('[min_length]')
        ]),
        'CEILING.MATH': functionDescription('This function round  a number up to the nearest integer or to the nearest multiple of significance.', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE),
            parameterDescription('[mode]')
        ]),
        'COMBINA': functionDescription('This function calculates the number of possible combinations with repetitions for a specified number of items.', [
            parameterDescription('number'),
            parameterDescription('number_chosen')
        ]),
        'COT': functionDescription('This function returns the cotangent of the specified angle.', [
            parameterDescription('angle')
        ]),
        'COTH': functionDescription('This function returns the hyperbolic cotangent of the specified number.', [
            parameterDescription('value')
        ]),
        'CSC': functionDescription('This function returns the cosecant of the specified angle.', [
            parameterDescription('angle')
        ]),
        'CSCH': functionDescription('This function returns the hyperbolic cosecant of the specified number.', [
            parameterDescription('value')
        ]),
        'DECIMAL': functionDescription('This function converts a text representation of a number in a given base into a decimal number.', [
            parameterDescription('text'),
            parameterDescription('radix')
        ]),
        'FLOOR.MATH': functionDescription('This function round a number down to the nearest integer or to the nearest multiple of significance.', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE),
            parameterDescription('[mode]')
        ]),
        'SEC': functionDescription('This function returns the secant of the specified angle.', [
            parameterDescription('angle')
        ]),
        'SECH': functionDescription('This function returns the hyperbolic secant of the specified value.', [
            parameterDescription('value')
        ]),
        'BINOM.DIST.RANGE': functionDescription('This function calculates the probability of a trial result using a binomial distribution.', [
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('number_s'),
            parameterDescription('[number_s2]')
        ]),
        'GAMMA': functionDescription('This function returns the gamma function value.', [
            parameterDescription('number')
        ]),
        'MAXIFS': functionDescription('This function returns the maximum value among cells specified by a given set of conditions or criteria.', [
            parameterDescription('max_range'),
            parameterDescription('criteria_range', true),
            parameterDescription('criteria', true)
        ]),
        'GAUSS': functionDescription('This function calculates the probability that a member of a standard normal population will fall between the mean and z standard deviations from the mean.', [
            parameterDescription('number')
        ]),
        'MINIFS': functionDescription('This function returns the minimum value among cells specified by a given set of conditions or criteria.', [
            parameterDescription('min_range'),
            parameterDescription('criteria_range', true),
            parameterDescription('criteria', true)
        ]),
        'PERMUTATIONA': functionDescription('This function returns the number of permutations for a given number of object that can be selected from the total objects.', [
            parameterDescription('number'),
            parameterDescription('number_chosen')
        ]),
        'PHI': functionDescription('This function returns the value of the density function for a standard normal distribution.', [
            parameterDescription('value')
        ]),
        'SKEW.P': functionDescription('This function returns the skewness of a distribution base on a poopulation: a characterization of the degree of asymmetry of a distribution around its mean.', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'BAHTTEXT': functionDescription('This function converts a number to Thai text and adds a suffix of "Baht"', [
            parameterDescription('number')
        ]),
        'CONCAT': functionDescription('This function combines multiple text strings or numbers into one text string, the function will stay available for compatibility with "CONCATENATE" function.', [
            parameterDescription('text1'),
            parameterDescription('text2', true)
        ]),
        'FINDB': functionDescription('This function finds one text value within another and returns the text value\'s position in the text you searched, and counts each double-byte characte as 2 when set DBCS as the default language.', [
            parameterDescription('find_text'),
            parameterDescription('within_text'),
            parameterDescription(START_NUMBER)
        ]),
        'LEFTB': functionDescription('This function returns the specified leftmost characters from a text value, and based on the number of bytes you specify.', [
            parameterDescription('text'),
            parameterDescription('num_bytes')
        ]),
        'LENB': functionDescription('This function returns the length of the number of bytes in a text string.', [
            parameterDescription('text')
        ]),
        'MIDB': functionDescription('This function returns the requested number of characters from a text string starting at the position you specify, and based on the number of bytes you specify.', [
            parameterDescription('text'),
            parameterDescription('start_num'),
            parameterDescription('num_bytes')
        ]),
        'REPLACEB': functionDescription('This function replaces part of a text string with a different text string, based on the number of bytes you specify.', [
            parameterDescription('old_text'),
            parameterDescription('start_byte'),
            parameterDescription('num_bytes'),
            parameterDescription('new_text')
        ]),
        'RIGHTB': functionDescription('This function returns the specified rightmost characters from a text value, and based on the number of bytes you specify.', [
            parameterDescription('text'),
            parameterDescription('num_bytes')
        ]),
        'SEARCHB': functionDescription('This function finds one text string in another text string and returns the index of the starting position of the found text, and counts each double-byte characte as 2 when set DBCS as the default language.', [
            parameterDescription('find_text'),
            parameterDescription('within_text'),
            parameterDescription(START_NUMBER)
        ]),
        'TEXTJOIN': functionDescription('This function combines multiple ranges and/or strings into one text, and the text includes a delimiter you specify between each text value.', [
            parameterDescription('delimiter'),
            parameterDescription('ignore_empty'),
            parameterDescription('text1'),
            parameterDescription('text2', true)
        ]),
        'UNICHAR': functionDescription('This function returns the Unicode character of a given numeric reference.', [
            parameterDescription('number')
        ]),
        'UNICODE': functionDescription('This function returns the number corresponding to the first character of the text.', [
            parameterDescription('text')
        ]),
        'ENCODEURL': functionDescription('This function returns a URL-encoded string.', [
            parameterDescription('text')
        ]),
        'BC_QRCODE': functionDescription('This function returns a data set for representing a QRCode', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('errorCorrectionLevel'),
            parameterDescription('model'),
            parameterDescription('version'),
            parameterDescription('mask'),
            parameterDescription('connection'),
            parameterDescription('connectionNo'),
            parameterDescription('charCode'),
            parameterDescription('charset'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_EAN13': functionDescription('This function returns a data set for representing a EAN13.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('showLabel'),
            parameterDescription('labelPosition'),
            parameterDescription('addOn'),
            parameterDescription('addOnLabelPosition'),
            parameterDescription('fontFamily'),
            parameterDescription('fontStyle'),
            parameterDescription('fontWeight'),
            parameterDescription('textDecoration'),
            parameterDescription('textAlign'),
            parameterDescription('fontSize'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_EAN8': functionDescription('This function returns a data set for representing a EAN8.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('showLabel'),
            parameterDescription('labelPosition'),
            parameterDescription('fontFamily'),
            parameterDescription('fontStyle'),
            parameterDescription('fontWeight'),
            parameterDescription('textDecoration'),
            parameterDescription('textAlign'),
            parameterDescription('fontSize'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_CODABAR': functionDescription('This function returns a data set for representing a CODABAR.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('showLabel'),
            parameterDescription('labelPosition'),
            parameterDescription('checkDigit'),
            parameterDescription('nwRatio'),
            parameterDescription('fontFamily'),
            parameterDescription('fontStyle'),
            parameterDescription('fontWeight'),
            parameterDescription('textDecoration'),
            parameterDescription('textAlign'),
            parameterDescription('fontSize'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_CODE39': functionDescription('This function returns a data set for representing a CODE39.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('showLabel'),
            parameterDescription('labelPosition'),
            parameterDescription('labelWithStartAndStopCharacter'),
            parameterDescription('checkDigit'),
            parameterDescription('nwRatio'),
            parameterDescription('fullASCII'),
            parameterDescription('fontFamily'),
            parameterDescription('fontStyle'),
            parameterDescription('fontWeight'),
            parameterDescription('textDecoration'),
            parameterDescription('textAlign'),
            parameterDescription('fontSize'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_CODE93': functionDescription('This function returns a data set for representing a CODE93.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('showLabel'),
            parameterDescription('labelPosition'),
            parameterDescription('checkDigit'),
            parameterDescription('fullASCII'),
            parameterDescription('fontFamily'),
            parameterDescription('fontStyle'),
            parameterDescription('fontWeight'),
            parameterDescription('textDecoration'),
            parameterDescription('textAlign'),
            parameterDescription('fontSize'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_CODE128': functionDescription('This function returns a data set for representing a CODE128.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('showLabel'),
            parameterDescription('labelPosition'),
            parameterDescription('codeSet'),
            parameterDescription('fontFamily'),
            parameterDescription('fontStyle'),
            parameterDescription('fontWeight'),
            parameterDescription('textDecoration'),
            parameterDescription('textAlign'),
            parameterDescription('fontSize'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_GS1_128': functionDescription('This function returns a data set for representing a GS1_128.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('showLabel'),
            parameterDescription('labelPosition'),
            parameterDescription('fontFamily'),
            parameterDescription('fontStyle'),
            parameterDescription('fontWeight'),
            parameterDescription('textDecoration'),
            parameterDescription('textAlign'),
            parameterDescription('fontSize'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_CODE49': functionDescription('This function returns a data set for representing a CODE49.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('showLabel'),
            parameterDescription('labelPosition'),
            parameterDescription('grouping'),
            parameterDescription('groupNo'),
            parameterDescription('fontFamily'),
            parameterDescription('fontStyle'),
            parameterDescription('fontWeight'),
            parameterDescription('textDecoration'),
            parameterDescription('textAlign'),
            parameterDescription('fontSize'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_PDF417': functionDescription('This function returns a data set for representing a PDF417.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('errorCorrectionLevel'),
            parameterDescription('rows'),
            parameterDescription('columns'),
            parameterDescription('compact'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'BC_DATAMATRIX': functionDescription('This function returns a data set for representing a DATAMATRIX.', [
            parameterDescription('value'),
            parameterDescription('color'),
            parameterDescription('backgroundColor'),
            parameterDescription('eccMode'),
            parameterDescription('ecc200SymbolSize'),
            parameterDescription('ecc200EncodingMode'),
            parameterDescription('ecc00_140SymbolSize'),
            parameterDescription('structuredAppend'),
            parameterDescription('structureNumber'),
            parameterDescription('fileIdentifier'),
            parameterDescription('quietZoneLeft'),
            parameterDescription('quietZoneRight'),
            parameterDescription('quietZoneTop'),
            parameterDescription('quietZoneBottom')
        ]),
        'FILTER': functionDescription('This function filter a range or array.', [
            parameterDescription('array'),
            parameterDescription('include'),
            parameterDescription('if_empty')
        ]),
        'RANDARRAY': functionDescription('This function returns an array of random numbers.', [
            parameterDescription('rows'),
            parameterDescription('columns'),
            parameterDescription('min'),
            parameterDescription('max'),
            parameterDescription('whole_number')
        ]),
        'SEQUENCE': functionDescription('This function returns a sequence of numbers.', [
            parameterDescription('rows'),
            parameterDescription('columns'),
            parameterDescription('start'),
            parameterDescription('step')
        ]),
        'SINGLE': functionDescription('This function returns a single value when given a value, range or array.', [
            parameterDescription('value')
        ]),
        'SORT': functionDescription('This function sorts a range or array.', [
            parameterDescription('array'),
            parameterDescription('sort_index'),
            parameterDescription('sort_order'),
            parameterDescription('by_col')
        ]),
        'SORTBY': functionDescription('This function sorts a range or array based on the values in a corresponding range or array.', [
            parameterDescription('array'),
            parameterDescription('by_array1'),
            parameterDescription('sort_order1'),
            parameterDescription('by_array2', true),
            parameterDescription('sort_order2', true),
        ]),
        'UNIQUE': functionDescription('This function returns the unique values from a range or array.', [
            parameterDescription('array'),
            parameterDescription('by_col'),
            parameterDescription('exactly_once')
        ]),
        'LET': functionDescription('This function assigns calculation results to names. Useful for storing intermediate calculations and values by defining names inside a formula. These names only apply within the scope of the LET function.', [
            parameterDescription('name1'),
            parameterDescription('name_value1'),
            parameterDescription('calculation_or_name2'),
            parameterDescription('[name_value2, ...')
        ]),
        'IMAGE': functionDescription('This function input an URL or a base64 string to show an image in cell', [
            parameterDescription('URL'),
            parameterDescription('[mode]'),
            parameterDescription('[height]'),
            parameterDescription('[width]'),
            parameterDescription('[clipY]'),
            parameterDescription('[clipX]'),
            parameterDescription('[clipHeight]'),
            parameterDescription('[clipWidth]'),
            parameterDescription('[vAlign]'),
            parameterDescription('[hAlign]'),
        ]),
        'GETPIVOTDATA': functionDescription('This function extracts data stored in a PivotTable', [
            parameterDescription('data_field'),
            parameterDescription('pivot_table'),
            parameterDescription('[field1, item1]'),
            parameterDescription('...')
        ]),
        'WEBSERVICE': functionDescription('This function returns data from a web service', [
            parameterDescription('url')
        ]),
        'FILTERJSON': functionDescription('This function parses json string to a scalar value, an object or an array of objects.', [
            parameterDescription('json_string')
        ])
    },
    Fbx_Summary: 'Summary',
    Fbx_TableName_Description: 'Table name for ',
    Fbx_TableSheetName_Description: 'TableSheet name for ',
    Fbx_CustomName_Description: 'Custom name for ',
    _tableFunctionsResource: {
        All: {
            name: '#All',
            description: 'Returns the entire contents of the table, or specified table columns including column headers, data and total rows.'
        },
        Data: { name: '#Data', description: 'Returns the data cells of the table or specified table columns.' },
        Headers: {
            name: '#Headers',
            description: 'Returns the columns headers for the table, or specified table columns.'
        },
        Totals: { name: '#Totals', description: 'Returns the total rows for the table or specified table columns.' },
        thisRow: { name: '#This Row', description: 'This row.' },
    },
};
 }),

 './src/evaluator.ts':
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
var calc_common_1 = __webpack_require__( './src/calc.common.ts');
var calc_1 = __webpack_require__( './src/calc.ts');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var keyword_null = null, keyword_undefined = void 0, Math_pow = Math.pow, Math_min = Math.min, Math_max = Math.max, const_string = 'string', const_boolean = 'boolean';
var _tryToDouble = calc_common_1.Convert._tryToDouble, _isError = calc_common_1.Convert._isError, _toArray = calc_common_1.Convert._toArray;
var isCalcArray = calc_common_1.Convert._isArray, isCalcReference = calc_common_1.Convert._isReference;
var CalcErrorsReference = calc_common_1.Errors.Reference, CalcErrorsValue = calc_common_1.Errors.Value, CalcErrorsName = calc_common_1.Errors.Name, CalcErrorsNotAvailable = calc_common_1.Errors.NotAvailable, CalcErrorsDivideByZero = calc_common_1.Errors.DivideByZero, CalcErrorsNumber = calc_common_1.Errors.Number;
function createRange(row, col, rowCount, colCount) {
    return { row: row, col: col, rowCount: rowCount, colCount: colCount };
}
function _addDynamicCreatedRanges(value, context) {
    var rc = value.getRangeCount();
    var source = value._source;
    var exprCalc = context.source.getCalcSourceModel()._getCellCalc(context.identity.row, context.identity.col, true);
    for (var k = 0; k < rc; k++) {
        var refRange = value._identities[k];
        refRange.id = source.id;
        if (source.getRangeKey) {
            var key = source.getRangeKey(source, refRange);
            if (exprCalc) {
                if (!exprCalc._newDetectedDynamicCreatedRanges) {
                    exprCalc._newDetectedDynamicCreatedRanges = {};
                }
                exprCalc._newDetectedDynamicCreatedRanges[key] = refRange;
            }
        }
    }
}

var EvaluateContext = (function () {
    function EvaluateContext(source, identity, arrayFormula, arrayIdentity, expr) {
        var args = [];
        for (var _i = 5; _i < arguments.length; _i++) {
            args[_i - 5] = arguments[_i];
        }
        this._asyncId = 0;
        this._asyncCount = 0;
        this._expandArrayToMultiCallCount = 0;
        var self = this;


        self.source = source;
        self.arrayFormulaMode = !!arrayFormula;
        self.identity = identity || self._getCellIdentity(0, 0);
        self.arrayIdentity = arrayIdentity;
        self.row = arrayIdentity ? arrayIdentity.row : (self.identity.row || 0);
        self.column = arrayIdentity ? arrayIdentity.col : (self.identity.col || 0);
        self.rowOffset = arrayIdentity ? self.identity.row - arrayIdentity.row : self.row;
        self.columnOffset = arrayIdentity ? self.identity.col - arrayIdentity.col : self.column;
        self._expr = expr;
    }
    EvaluateContext.prototype._getCellIdentity = function (row, col) {
        return { row: row, col: col };
    };
    EvaluateContext.prototype._getActualSource = function (source) {
        return source === calc_common_1.BangSource ? this.source : source;
    };

    EvaluateContext.prototype.getValue = function (source, identity) {
        if (!source) {
            return CalcErrorsReference;
        }
        return this._getActualSource(source).getValue(identity);
    };

    EvaluateContext.prototype.getReference = function (source, identity) {
        if (!source) {
            return CalcErrorsReference;
        }
        return this._getActualSource(source).getReference(identity);
    };
    EvaluateContext.prototype.getSheetRangeReference = function (id) {
        if (!id || !id.source || !id.endSource || id.source instanceof calc_common_1.ErrorSource) {
            return CalcErrorsReference;
        }
        return this._getActualSource(id.source).getSheetRangeReference(id);
    };

    EvaluateContext.prototype.getFunction = function (name) {
        var self = this;
        return self.source ? self.source.getCustomFunction(name) : keyword_null;
    };

    EvaluateContext.prototype.getName = function (name) {
        var self = this;
        var nameInfo = self.source ? self.source.getCustomName(name) : keyword_null;
        if (!nameInfo && self.source) {
            var globalSource = self.source._getCalcServiceInternal().getGlobalSourceModel();
            nameInfo = globalSource && globalSource.getSource().getCustomName(name);
        }
        return nameInfo;
    };

    EvaluateContext.prototype.getField = function (fieldName) {
        var self = this;
        return self.source ? self.source.getField(fieldName) : keyword_null;
    };
    EvaluateContext.prototype._isExpandArrayToMultiCall = function () {
        return this._expandArrayToMultiCallCount > 0;
    };
    EvaluateContext.prototype._beginExpandArrayToMultiCall = function () {
        this._expandArrayToMultiCallCount++;
    };
    EvaluateContext.prototype._endExpandArrayToMultiCall = function () {
        this._expandArrayToMultiCallCount--;
    };
    EvaluateContext.prototype.SetAsyncResult = function (ctx, value) {
        this.source._getCalcServiceInternal()._evaluator.SetAsyncResult(ctx, value);
    };
    EvaluateContext.prototype.cloneFrom = function (context) {
        var self = this;
        self.acceptsReference = context.acceptsReference;


        self.arrayFormulaMode = context.arrayFormulaMode;
    };
    return EvaluateContext;
}());
exports.EvaluateContext = EvaluateContext;
calc_common_1.CalcSource.prototype.getEvaluatorContext = function (identity, arrayFormula, arrayIdentity, expr) {
    return new EvaluateContext(this, identity, arrayFormula, arrayIdentity, expr);
};
var AsyncEvaluateContext = (function () {
    function AsyncEvaluateContext(context, node) {
        this.id = context._asyncId++;
        this.ctx = context;
        this.row = context.row + (context.arrayFormulaMode && context.rowOffset || 0);
        this.col = context.column + (context.arrayFormulaMode && context.columnOffset || 0);
        this.node = node;
    }


    AsyncEvaluateContext.prototype.setAsyncResult = function (value) {
        this.node._result = value;
        this.node._hasResult = true;
        this.ctx.SetAsyncResult(this, value);
        this.ctx.source.refresh();
    };
    AsyncEvaluateContext.prototype.getFormula = function () {
        return this.ctx.source.getCalcService().unparse(this.ctx.source, this.expression, this.row, this.col);
    };
    AsyncEvaluateContext.prototype._allNodesHaveResult = function () {
        var children = this.node && this.node.parent && this.node.parent._children || [];
        for (var i = 0; i < children.length; i++) {
            if (!children[i]._hasResult) {
                return false;
            }
        }
        return true;
    };
    return AsyncEvaluateContext;
}());
exports.AsyncEvaluateContext = AsyncEvaluateContext;
var GloableEvaluateContext = (function (_super) {
    __extends(GloableEvaluateContext, _super);
    function GloableEvaluateContext(source, arrayFormula, baseRow, baseColumn, rowCount, columnCount, activeRow, activeColumn) {
        var _this = _super.call(this, source, isNaN(activeColumn) ? keyword_null : {
            row: activeRow,
            col: activeColumn
        }, arrayFormula, isNaN(columnCount) ? keyword_null : {
            row: baseRow,
            col: baseColumn,
            rowCount: rowCount,
            colCount: columnCount
        }) || this;
        var gm = source._getCalcServiceInternal().getGlobalSourceModel(source);
        _this._globalSource = gm && gm.getSource();
        return _this;
    }
    GloableEvaluateContext.prototype.getName = function (name) {
        var self = this;
        return self._globalSource ? self._globalSource.getCustomName(name) : keyword_null;
    };
    return GloableEvaluateContext;
}(EvaluateContext));
exports.GloableEvaluateContext = GloableEvaluateContext;
function isSameContextIdentity(identity1, identity2) {
    if (identity1 && identity2) {
        return identity1.row === identity2.row && identity1.col === identity2.col;
    }
    return identity1 === identity2;
}
var Evaluator = (function () {
    function Evaluator(service) {
        this.service = service;

        this.asyncManager = new AsyncFunctionManager(this) ;
    }

    Evaluator.prototype.evaluateExpression = function (expression, evaluatorContext, convertNullToZero, acceptsArray, acceptsReference) {
        var expr = (expression.type === undefined && expression._expr) ? expression._expr : expression;
        var result = this.evaluate(expr, evaluatorContext, !!acceptsArray, !!acceptsReference);
        if (result && result.pause) {
            return result;
        }
        if (result === keyword_undefined || result === keyword_null) {
            return convertNullToZero === false ? result : 0;
        }
        else if (isCalcArray(result) && !acceptsArray || isCalcReference(result) && !acceptsReference) {
            result = this.getOneValue(evaluatorContext, result);
        }


        var CALC_PRECISION = 15;
        if (typeof result === 'number' && result > -10 && result < 10) {
            var valStr = result.toString();
            if (valStr.indexOf('000000000000') > 1 || valStr.indexOf('999999999999') > 1) {
                CALC_PRECISION = 14;
            }
        }

        return Common_1.Common._NumberHelper._fixNumber(result, calc_common_1.Functions.CALC_PRECISION || CALC_PRECISION);
    };
    Evaluator.prototype.evaluate = function (expr, context, acceptsArray, acceptsReference) {
        if (!expr) {
            throw calc_common_1.sR().Exp_ExprIsNull;
        }
        if (expr.type === undefined) {
            if (expr._error) {
                return expr;
            }
            if (expr._expr) {
                expr = expr._expr;
            }
        }
        while (expr.type === 10 ) {
            expr = expr.value;
        }
        var self = this;
        var result;
        var needExpendIndexs = keyword_null;
        if (expr.type === 12 ) {
            needExpendIndexs = expr.needExpendIndexs;
            expr = expr.value;
        }
        else if (context._keepArrayValues) {
            acceptsArray = true;
            needExpendIndexs = [];
        }
        var exprType = expr.type;
        if (exprType >= 2 && exprType <= 6 ) {
            result = self.evaluateConst(expr, context, acceptsArray);
        }
        else if (exprType === 1 || exprType === 13 || exprType === 33 ) {
            result = self.evaluateReference(expr, context, acceptsReference, acceptsArray);
        }
        else if (exprType === 8 ) {
            result = self.evaluateName(expr, context, acceptsArray, acceptsReference);
        }
        else if (expr && expr.type === 100 ) {
            result = self.evaluateLocalName(expr, context, acceptsArray, acceptsReference);
        }
        else if (exprType === 9 && !expr.value2) {
            result = self.evaluateUnaryOperation(expr, context, acceptsArray, acceptsReference, needExpendIndexs);
        }
        else if (exprType === 9 ) {
            result = self.evaluateBinaryOperation(expr, context, acceptsArray, acceptsReference, needExpendIndexs);
        }
        else if (exprType === 7 ) {
            if (expr._haveBranchFunction && context._returnWhenPause) {
                result = self.evaluateBranchFunction(expr, context, acceptsArray, acceptsReference, needExpendIndexs);
                if (result && result.pause) {
                    return result;
                }
            }
            result = self.evaluateFunction(expr, context, acceptsArray, acceptsReference, needExpendIndexs);
        }
        else if (exprType === 11 ) {
            result = keyword_undefined;
        }
        else if (exprType === 14 ) {
            result = self.evaluateField(expr, context);
        }
        else if (context.evaluate) {
            return context.evaluate(expr, acceptsArray, acceptsReference);
        }
        return result;
    };
    Evaluator.prototype.evaluateLocalName = function (expr, context, acceptsArray, acceptsReference) {
        if (context.letContext) {
            var name_1 = expr.value;
            var length_1 = context.letContext.length;
            for (var i = length_1 - 1; i >= 0; i--) {
                var ctx = context.letContext[i];
                if (ctx[name_1] !== keyword_undefined) {
                    return ctx[name_1];
                }
            }
        }

        expr.type = 8;
        delete expr._isLocalVarible;
        return this.evaluate(expr, context, acceptsArray, acceptsReference);
    };
    Evaluator.prototype.evaluateConst = function (expr, context, acceptsArray) {
        var value = expr.value;
        if (isCalcArray(value)) {
            if (acceptsArray || (context && (context.arrayFormulaMode || context._isExpandArrayToMultiCall()))) {
                return value;
            }
            return value.getValue(0, 0);
        }
        return value;
    };
    Evaluator.prototype.evaluateReference = function (expr, context, acceptsReference, acceptsArray) {
        if (!context) {
            return CalcErrorsValue;
        }
        var source = ( expr.source) || context.source;
        var baseRow = isNaN(context.row) ? 0 : context.row, baseColumn = isNaN(context.column) ? 0 : context.column;
        var pos = expr.getRange && expr.getRange(baseRow, baseColumn);
        var exprType = expr.type;
        if (!pos) {
            return exprType === 13 ? CalcErrorsValue : CalcErrorsReference;
        }
        if (exprType === 33 && pos.isSpillError) {
            return calc_common_1.Errors.Spill;
        }
        var row = pos.row < 0 ? 0 : pos.row, col = pos.col < 0 ? 0 : pos.col, rowCount = pos.rowCount, colCount = pos.colCount;

        if (acceptsArray) {
            var srcRowCount = source.getRowCount(), srcColCount = source.getColumnCount();
            if (rowCount === -1 || rowCount > srcRowCount) {
                rowCount = srcRowCount;
            }
            if (colCount === -1 || colCount > srcColCount) {
                colCount = srcColCount;
            }
        }

        if (acceptsReference || context.arrayFormulaMode) {
            if (expr.endSource) {
                return context.getSheetRangeReference({
                    source: expr.source,
                    endSource: expr.endSource,
                    row: row,
                    col: col,
                    rowCount: rowCount,
                    colCount: colCount
                });
            }
            return context.getReference(source, pos);
        }
        else if (acceptsArray && (rowCount > 1 || colCount > 1)) {
            var array = [];
            for (var i = 0; i < rowCount; i++) {
                array[i] = [];
                for (var j = 0; j < colCount; j++) {
                    array[i][j] = source.getValue(i + row, j + col);
                }
            }
            return new calc_common_1.CalcArray(array);
        }
        if (rowCount > 1 || colCount > 1) {
            var rowInRange = baseRow >= pos.row && baseRow < pos.row + rowCount;
            var colInRange = baseColumn >= pos.col && baseColumn < pos.col + colCount;
            if (rowInRange && colInRange) {
                row = baseRow;
                col = baseColumn;
            }
            else if (!rowInRange && !colInRange) {
                return CalcErrorsValue;
            }
            else if (rowInRange && colCount === 1) {
                row = baseRow;
            }
            else if (colInRange && rowCount === 1) {
                col = baseColumn;
            }
            else {
                return CalcErrorsValue;
            }
        }
        else if (pos.row === -1 && rowCount === -1) {
            if (colCount !== 1) {
                return CalcErrorsValue;
            }
            row = baseRow;
        }
        else if (pos.col === -1 && colCount === -1) {
            if (rowCount !== 1) {
                return CalcErrorsValue;
            }
            col = baseColumn;
        }
        return source.getValue(row, col);
    };
    Evaluator.prototype.evaluateName = function (expr, context, acceptsArray, acceptsReference) {
        if (!context) {
            return CalcErrorsName;
        }
        var source;
        if (expr.source) {
            source = expr.source;
            context = source.getEvaluatorContext(context.identity, context.arrayFormulaMode, context.arrayIdentity);
        }
        var sub = context.getName(expr.value);
        if (!sub) {
            return CalcErrorsName;
        }
        var workingExpr = calc_1._mappingArray(context, sub, false, 0, 0, acceptsArray, acceptsReference);
        return this.evaluate(workingExpr, context, acceptsArray, acceptsReference);
    };
    Evaluator.prototype.evaluateUnaryOperation = function (expr, context, acceptsArray, acceptsReference, needExpendIndexs) {
        var acceptsReferences = false;
        if (needExpendIndexs && needExpendIndexs.length > 0) {
            acceptsArray = true;
            acceptsReferences = true;
        }

        var arg = this.evaluate(expr.value, context, acceptsArray, acceptsReferences);
        if (arg && arg.pause) {
            return arg;
        }
        if (calc_common_1.Convert._isError(arg)) {
            return arg;
        }
        if (arg === calc_common_1.missingArgument) {
            return CalcErrorsNotAvailable;
        }
        return this.evaluateWithArgs(expr, function (args1) {
            if ((args1[0] && args1[0].getRowCount) && context._keepArrayValues && context._expr) {
                context._expr._resultDynamicArray = true;
            }
            return evaluateOperator(expr.operatorType, args1[0], context._keepArrayValues) ;
        }, context, needExpendIndexs, [arg], acceptsArray, acceptsReference);
    };
    Evaluator.prototype.evaluateBinaryOperation = function (expr, context, acceptsArray, acceptsReference, needExpendIndexs) {
        var keepArrayValues = context._keepArrayValues;
        if (keepArrayValues) {
            acceptsArray = true;
        }
        var acceptsArrays = [acceptsArray, acceptsArray];
        var operatorAcceptsReference = expr.operatorType >= 15 ;
        var acceptsReferences = [operatorAcceptsReference, operatorAcceptsReference];
        if (needExpendIndexs && needExpendIndexs.length > 0) {
            for (var i = 0; i < needExpendIndexs.length; i++) {
                acceptsArrays[needExpendIndexs[i]] = true;
                acceptsReferences[needExpendIndexs[i]] = true;
            }
        }


        var zeroToNull = function (expression, value) {
            if (value === 0) {
                while (expression.type === 10 ) {
                    expression = expression.value;
                }
                if (expression.type === 7
                    && expression.function
                    && expression.function._zeroToNullInConcatOperator) {
                    return null;
                }
            }
            return value;
        };


        var sub = [expr.value, expr.value2];
        var args = [];
        for (var i = 0; i < 2; i++) {
            var result = this.evaluate(sub[i], context, acceptsArrays[i], acceptsReferences[i]);
            if (result && result.pause) {
                return result;
            }
            var arg = zeroToNull(sub[i], result);
            if (calc_common_1.Convert._isError(arg)) {
                return arg;
            }
            if (arg === calc_common_1.missingArgument) {
                return CalcErrorsNotAvailable;
            }
            args[i] = arg;
        }
        return this.evaluateWithArgs(expr, function (args1) {
            if (context._expr && ((args1[0] && args1[0].getRowCount) || (args1[1] && args1[1].getRowCount))) {
                context._expr._resultDynamicArray = true;
            }
            return evaluateOperator(expr.operatorType, args1[0], args1[1]);
        }, context, needExpendIndexs, args, acceptsArray, acceptsReference);
    };
    Evaluator.prototype.evaluateField = function (expr, context) {
        if (!context) {
            return CalcErrorsName;
        }
        var source;
        if (expr.source) {
            source = expr.source;
            context = source.getEvaluatorContext(context.identity, context.arrayFormulaMode, context.arrayIdentity);
        }
        var sub = context.getField(expr.value);
        if (isNullOrUndefined(sub)) {
            return CalcErrorsNotAvailable;
        }
        return sub;
    };
    Evaluator.prototype.startCache = function () {
        this._functionResultCaches = {};
        if (this.service._hasAsync) {
            this.asyncManager.startCalc();
        }
    };
    Evaluator.prototype.endCache = function () {
        this._functionResultCaches = keyword_null;
    };
    Evaluator.prototype.evaluateBranchFunction = function (expr, context, acceptsArray, acceptsReference, needExpendIndexs) {
        if (!isNullOrUndefined(expr._testBranchEvaluated)) {
            return;
        }
        var fn = expr.function;
        var argCount = expr.arguments.length;
        var testArg = fn.findTestArgument();
        var funcArgs = this.preprocessFunction(context, fn, argCount, needExpendIndexs, acceptsArray);
        var acceptsArrays = funcArgs.acceptsArrays;
        var keepArrayValuesFlagSet = funcArgs.keepArrayValuesFlagSet;


        var t = this.testArgGetBranch(context, fn, expr, acceptsArrays[testArg], false, testArg);
        if (t && t.pause) {
            return t;
        }
        if (keepArrayValuesFlagSet) {
            delete context._keepArrayValues;
        }
        if (t.branchArgument >= 0 && typeof t.branchArgument === 'number') {
            expr._testBranchEvaluated = true;
            context.source._testExprsNeedReset = context.source._testExprsNeedReset || [];
            context.source._testExprsNeedReset.push(expr);
            return { pause: 'Branch', branch: expr._branchArgumentListener[t.branchArgument] };
        }
        else if (t.testArgValue._error) {
            return;
        }
        else {
            delete expr._haveBranchFunction;
        }
    };
    Evaluator.prototype.evaluateLetFunction = function (expr, context, acceptsArray, acceptsReference) {
        var argCount = expr.arguments.length, self = this, arg;
        context.letContext = context.letContext || [];
        var localContext = {};

        for (var i = 1; i < argCount - 1; i = i + 2) {
            var nameArg = expr.arguments[i - 1], valueArg = expr.arguments[i];
            var vname = nameArg.value;
            var currentContext = context;
            context.letContext.push(localContext);
            arg = self.evaluate(valueArg, currentContext, acceptsArray, acceptsReference);
            if (arg && arg.pause) {
                return arg;
            }
            context.letContext.pop();
            localContext[vname] = arg;
        }

        context.letContext.push(localContext);
        var t = self.evaluate(expr.arguments[argCount - 1], context, acceptsArray, acceptsReference);
        if (t && t.pause) {
            return t;
        }
        context.letContext.pop();
        if (context.letContext.length === 0) {
            delete context.letContext;
        }
        return t;
    };
    Evaluator.prototype.evaluateGetPivotDataFunction = function (expr, context, acceptsArray, acceptsReference) {
        var args = expr.arguments, self = this;
        var valueFieldName = args[0].value;
        var pivotPositionReferenceExpression = args[1];
        var nameObjArgs = [];
        var source = pivotPositionReferenceExpression.source || context.source;
        var baseRow = isNaN(context.row) ? 0 : context.row;
        var baseColumn = isNaN(context.column) ? 0 : context.column;
        var pivotPositionReferencePosition = pivotPositionReferenceExpression.getRange(baseRow, baseColumn);
        var sheet = source._sheet;
        var pivotTable = sheet.pivotTables && pivotPositionReferencePosition && sheet.pivotTables.findPivotTable(pivotPositionReferencePosition.row, pivotPositionReferencePosition.col);
        if (isNullOrUndefined(pivotTable)) {
            return CalcErrorsReference;
        }
        for (var i = 2; i < args.length; i++) {
            var arg = args[i];
            arg = self.evaluate(arg, context, acceptsArray, acceptsReference);
            if (arg && arg.pause || arg instanceof calc_common_1.CalcError) {
                return arg;
            }
            nameObjArgs.push(arg);
        }
        return pivotTable.evaluateGetPivotDataFunction(valueFieldName, nameObjArgs);
    };
    Evaluator.prototype.preprocessFunction = function (context, fn, argCount, needExpendIndexs, parentAcceptsArray) {
        var acceptsArrays = [];
        var acceptsReferences = [];
        var keepArrayValues = context._keepArrayValues;
        var keepArrayValuesFlagSet = false;
        var getReferenceValues = keyword_null;

        if (!keepArrayValues && (fn.arrayArgumentEvaluateMode === 1 || (fn.arrayArgumentEvaluateMode === 4 && parentAcceptsArray))) {
            keepArrayValues = context._keepArrayValues = true;
            keepArrayValuesFlagSet = true;
        }
        for (var i = 0; i < argCount; i++) {
            acceptsArrays[i] = fn.acceptsArray(i);
            acceptsReferences[i] = fn.acceptsReference(i);
        }
        if (needExpendIndexs && needExpendIndexs.length > 0 || keepArrayValues) {
            getReferenceValues = [];
            for (var i = 0; i < argCount; i++) {
                getReferenceValues[i] = true;
            }
            var count = keepArrayValues ? argCount : needExpendIndexs.length;
            for (var i = 0; i < count; i++) {
                var argIndex = keepArrayValues ? i : needExpendIndexs[i];
                acceptsArrays[argIndex] = true;
                acceptsReferences[argIndex] = true;


                var tmp = !(fn.acceptsReference(argIndex) && !fn.acceptsArray(argIndex));
                if (tmp && keepArrayValues && fn.acceptsReference(argIndex)) {
                    tmp = false;
                }
                getReferenceValues[argIndex] = tmp;
            }
        }
        if (fn.isBranch() && (context.arrayFormulaMode || context._isExpandArrayToMultiCall())) {
            acceptsArrays[fn.findTestArgument()] = true;
            acceptsReferences[fn.findTestArgument()] = true;
        }
        return { acceptsArrays: acceptsArrays, acceptsReferences: acceptsReferences, getReferenceValues: getReferenceValues, keepArrayValuesFlagSet: keepArrayValuesFlagSet };
    };
    Evaluator.prototype.testArgGetBranch = function (context, fn, expr, acceptsArray, acceptsReference, testArg) {
        var testArgValue;
        var branchArgument = -1;
        var oldKeepArrayValues = context._keepArrayValues;
        if (context.arrayFormulaMode) {
            context._keepArrayValues = true;
        }
        if (fn.acceptsArray(testArg)) {
            context._beginExpandArrayToMultiCall();
        }
        testArgValue = this.evaluate(expr.arguments[testArg], context, acceptsArray, acceptsReference);
        if (testArgValue && testArgValue.pause) {
            return testArgValue;
        }
        if (fn.acceptsArray(testArg)) {
            context._endExpandArrayToMultiCall();
        }
        context._keepArrayValues = oldKeepArrayValues;
        if (!isCalcReference(testArgValue) && !isCalcArray(testArgValue)) {
            branchArgument = fn.findBranchArgument(testArgValue);
        }
        return { testArgValue: testArgValue, branchArgument: branchArgument };
    };
    Evaluator.prototype.evaluateFunction = function (expr, context, acceptsArray, acceptsReference, needExpendIndexs) {
        if (!expr || !expr.function || typeof expr.function === 'string') {
            return CalcErrorsName;
        }
        var argCount = expr.arguments.length, self = this, asyncCount = context._asyncCount;
        if (expr.functionName === 'LET') {
            return self.evaluateLetFunction(expr, context, acceptsArray, acceptsReference);
        }
        if (expr.functionName === 'GETPIVOTDATA') {
            return self.evaluateGetPivotDataFunction(expr, context, acceptsArray, acceptsReference);
        }
        var fn = expr.function;
        var args = [], arg;
        var getReferenceValues = keyword_null;
        var keepArrayValuesFlagSet;
        if (fn instanceof calc_common_1.Functions.AsyncFunction) {
            this.asyncManager.startCalcFunction(fn, expr, context);
        }
        if (argCount !== 0) {
            var funcArgs = self.preprocessFunction(context, fn, argCount, needExpendIndexs, acceptsArray);
            var acceptsArrays = funcArgs.acceptsArrays;
            var acceptsReferences = funcArgs.acceptsReferences;
            getReferenceValues = funcArgs.getReferenceValues;
            keepArrayValuesFlagSet = funcArgs.keepArrayValuesFlagSet;
            var testArgValue = void 0, testArg = void 0, branchArgument = void 0;
            if (fn.isBranch()) {
                testArg = fn.findTestArgument();
                var t = self.testArgGetBranch(context, fn, expr, acceptsArrays[testArg], acceptsReferences[testArg], testArg);
                if (t && t.pause) {
                    return t;
                }
                testArgValue = t.testArgValue;
                branchArgument = t.branchArgument;
            }
            for (var i = 0; i < argCount; i++) {
                if (testArg === i) {
                    arg = testArgValue;
                }
                else if (branchArgument >= 0 && i !== branchArgument) {
                    args[i] = null;
                    continue;
                }
                else {
                    if (fn.acceptsArray(i)) {
                        context._beginExpandArrayToMultiCall();
                    }
                    arg = self.evaluate(expr.arguments[i], context, acceptsArrays[i], acceptsReferences[i]);
                    if (arg && arg.pause) {
                        return arg;
                    }
                    if (fn.acceptsArray(i)) {
                        context._endExpandArrayToMultiCall();
                    }
                }
                if (!fn.acceptsArray(i) && (isCalcArray(arg)) || (!fn.acceptsReference(i)) && (isCalcReference(arg))) {
                    var array = (isCalcArray(arg)) ? arg : keyword_null;
                    var reference = (isCalcReference(arg)) ? arg : keyword_null;
                    if (array && array.getRowCount() === 1 && array.getColumnCount() === 1) {
                        arg = array.getValue(0, 0);
                    }
                    else if (reference && reference.getRowCount(0) === 1 && reference.getColumnCount(0) === 1) {
                        arg = reference.getValue(0, 0, 0);
                    }
                    else {
                        var list = [];
                        var contains = false;
                        if (needExpendIndexs) {
                            for (var j = 0; j < needExpendIndexs.length; j++) {
                                list.push(needExpendIndexs[j]);
                                if (needExpendIndexs[j] === i) {
                                    contains = true;
                                }
                            }
                        }
                        if (!contains) {
                            list.push(i);
                            needExpendIndexs = list;
                        }
                    }
                }
                if ((calc_common_1.Convert._isError(arg)) && !fn.acceptsError(i)) {
                    if (fn instanceof calc_common_1.Functions.AsyncFunction) {
                        this.asyncManager.endCalcFunction();
                    }
                    return arg;
                }
                if (arg === calc_common_1.missingArgument && !fn.acceptsMissingArgument(i)) {
                    arg = keyword_null;
                }
                args[i] = arg;


                if (arg && expr.functionName !== 'INDIRECT' && arg._isVolatile && arg._source) {
                    _addDynamicCreatedRanges(arg, context);
                }
            }
        }
        if (keepArrayValuesFlagSet) {
            delete context._keepArrayValues;
        }
        return self.evaluateWithArgs(expr, function (args1, expression, isItemInArray) {
            var value, retValue;
            retValue = processBuiltInFunctionArgs(args1, fn._argsLimit);
            args1 = retValue._args;
            if (!retValue._isExecuteFunc) {
                return retValue._result;
            }
            if (fn.isContextSensitive()) {
                context.acceptsReference = acceptsReference || context._isExpandArrayToMultiCall();
                if (fn instanceof calc_common_1.Functions.AsyncFunction) {
                    self._ayncFunctionResultCaches = self._ayncFunctionResultCaches || {};
                    return fn.evaluateWhenArgumentsIsSame() ?
                        self.evaluateAsyncFunction(context, expression, fn, asyncCount, args1, isItemInArray) :
                        self.evaluateWithCache(fn, args1, function () {
                            return self.evaluateAsyncFunction(context, expression, fn, asyncCount, args1, isItemInArray);
                        }, self._ayncFunctionResultCaches);
                }
                return fn.evaluateWithContext(context, args1);
            }
            var isArrayFormula = context.arrayFormulaMode;
            if (isArrayFormula) {
                fn._offsetIdentity = {
                    row: context.rowOffset,
                    col: context.columnOffset
                };
            }
            var functionMapping = calc_common_1.getMapping() && calc_common_1.getMapping().builtInFunctionsMapping;
            var specialFun = functionMapping && functionMapping[fn.name] && functionMapping[fn.name].specialFun;
            var evluateFunc = function () {
                return specialFun && specialFun.apply(fn, args1) || fn.evaluate.apply(fn, args1);
            };
            value = isArrayFormula ? self.evaluateWithCache(fn, args1, evluateFunc, self._functionResultCaches) : evluateFunc();
            delete fn._offsetIdentity;
            return value;
        }, context, needExpendIndexs, args, acceptsArray, acceptsReference, getReferenceValues);
    };


    Evaluator.prototype.evaluateAsyncFunction = function (context, expr, fn, asyncCount, args1, isItemInArray) {
        var node = this.asyncManager.getNode();
        var result;
        if (node._hasResult) {
            result = node._result;
        }
        else if (!node.canEvaluate()) {
            result = node._result !== keyword_undefined ? node._result : fn.defaultValue();
        }
        else {
            var aContext = new AsyncEvaluateContext(context, node);
            result = fn.evaluateWithContext(aContext, args1);
            if (aContext.notAsync) {
                return result;
            }
            if (result === keyword_undefined) {
                if (node._result !== keyword_undefined) {
                    result = node._result;
                }
                else {
                    result = fn.defaultValue();
                }
            }
            else if (node.evaluateMode === 1) {
                node._hasResult = true;
            }
        }
        node._result = result;
        if (!isItemInArray) {
            this.asyncManager.endCalcFunction();
        }
        return result;
    };
    Evaluator.prototype.evaluateWithCache = function (fn, args1, evaluateFunction, functionCaches) {
        var functionInfos;
        if (functionCaches) {
            var cached = false;
            functionInfos = functionCaches[fn.name + args1.length];
            if (functionInfos) {
                for (var i = 0; i < functionInfos.length; i++) {
                    var functionInfo = functionInfos[i];
                    cached = false;
                    if (functionInfo.args.length === args1.length) {
                        cached = true;
                        for (var argIndex = 0; argIndex < args1.length; argIndex++) {
                            var cacheArg = functionInfo.args[argIndex], newArg = args1[argIndex];
                            if (cacheArg === newArg) {
                                continue;
                            }
                            if ((cacheArg instanceof calc_common_1.CalcReference) && newArg instanceof calc_common_1.CalcReference) {
                                var rangeCount = cacheArg._rangeCount;
                                if (cacheArg._source !== newArg._source || rangeCount !== newArg._rangeCount) {
                                    cached = false;
                                    break;
                                }
                                for (var rangeIndex = 0; rangeIndex < rangeCount; rangeIndex++) {
                                    if (cacheArg.getRow(rangeIndex) !== newArg.getRow(rangeIndex) ||
                                        cacheArg.getColumn(rangeIndex) !== newArg.getColumn(rangeIndex) ||
                                        cacheArg.getRowCount(rangeIndex) !== newArg.getRowCount(rangeIndex) ||
                                        cacheArg.getColumnCount(rangeIndex) !== newArg.getColumnCount(rangeIndex)) {
                                        cached = false;
                                        break;
                                    }
                                }
                            }
                            else {
                                cached = false;
                                break;
                            }
                        }
                        if (cached && !isSameContextIdentity(functionInfo._offsetIdentity, fn._offsetIdentity)) {
                            cached = false;
                        }
                    }
                    if (cached) {
                        functionInfo.flag++;
                        return functionInfo.value;
                    }
                }
            }
            else {
                functionInfos = functionCaches[fn.name + args1.length] = [];
            }
        }
        var value = evaluateFunction();
        if (functionCaches && value !== keyword_undefined) {
            var length_2 = functionInfos.length;
            if (length_2 >= 100) {
                var tmp = [];
                for (var i = 0; i < length_2; i++) {
                    if (functionInfos[i].flag > 0) {
                        tmp.push(functionInfos[i]);
                    }
                }
                tmp.sort(function (a, b) {
                    return b.flag - a.flag;
                });
                length_2 = Math.min(50, tmp.length);
                functionInfos = tmp.slice(0, length_2);
                functionCaches[fn.name + args1.length] = functionInfos;
            }
            functionInfos.push({ args: args1, value: value, flag: 0, _offsetIdentity: fn._offsetIdentity });
        }
        return value;
    };
    Evaluator.prototype.SetAsyncResult = function (context) {
        if (!context._allNodesHaveResult()) {
            return;
        }
        var ctx = context.ctx;
        ctx.source._getCalcServiceInternal().recalculate(ctx.source, context.row, context.col, true);
    };
    Evaluator.prototype.evaluateWithArgs = function (expr, evaluateDelegate, context, needExpendIndexs, args, acceptsArray, acceptsReference, getReferenceValues) {
        var fn, value;
        var keepArrayValues = context._keepArrayValues;
        if (keepArrayValues && !(needExpendIndexs && needExpendIndexs.length > 0)) {
            needExpendIndexs = [];
            fn = (expr.type === 7) && expr.function;

            if (fn) {
                args.forEach(function (arg, index) {
                    if ((!fn.acceptsArray(index) && isCalcArray(arg)) || (!fn.acceptsReference(index) && isCalcReference(arg))) {
                        needExpendIndexs.push(index);
                    }
                });
            }
        }
        if (needExpendIndexs && needExpendIndexs.length > 0) {
            var expendedArgs = this._expandArgs(context, expr, args, needExpendIndexs, getReferenceValues);
            if (!expendedArgs) {
                return CalcErrorsNotAvailable;
            }
            var valueArray = [];
            var rowCount = expendedArgs[0].length;
            var colCount = expendedArgs[0][0].length;
            for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                valueArray[rowIndex] = [];
                for (var colIndex = 0; colIndex < colCount; colIndex++) {
                    try {
                        var expArgs = [];
                        for (var argIndex = 0; argIndex < args.length; argIndex++) {
                            expArgs[argIndex] = expendedArgs[argIndex][rowIndex][colIndex];
                        }
                        value = evaluateDelegate(expArgs, expr, (rowIndex + 1 !== rowCount) || (colIndex + 1 !== colCount) );

                        if (isCalcReference(value) && !keepArrayValues) {
                            if (expr.type === 7 ) {
                                fn = expr.function;
                                if (fn.returnReference && fn.returnReference()) {
                                    return value;
                                }
                            }
                            value = this.getOneValue(context, value);
                        }
                        valueArray[rowIndex][colIndex] = value;
                        context._expr._resultDynamicArray = true;
                    }
                    catch (InvalidCastException) {
                        valueArray[rowIndex][colIndex] = CalcErrorsValue;
                    }
                }
            }
            return new calc_common_1.CalcArray(valueArray, keepArrayValues );
        }
        try {
            value = evaluateDelegate(args, expr);
            if (expr.operatorType === 15 && value && value._isVolatile) {
                _addDynamicCreatedRanges(value, context);
            }
            if (context.arrayFormulaMode && context._isExpandArrayToMultiCall()) {
                return value;
            }
            if ((isCalcArray(value)) && !acceptsArray) {
                return this.getOneValue(context, value);
            }
            else if ((isCalcReference(value)) && !acceptsReference) {
                var refValue = value;
                if (acceptsArray && refValue.getRangeCount() === 1) {
                    var array = [];
                    for (var i = 0; i < refValue.getRowCount(0); i++) {
                        array[i] = [];
                        for (var j = 0; j < refValue.getColumnCount(0); j++) {
                            array[i][j] = refValue.getValue(0, i, j);
                        }
                    }
                    return new calc_common_1.CalcArray(array);
                }
                return this.getOneValue(context, value);
            }
            return value;
        }
        catch (InvalidCastException) {
            return CalcErrorsValue;
        }
    };
    Evaluator.prototype.getOneValue = function (context, value) {
        var r, c;
        if (isCalcReference(value)) {
            var reference = value, rouCount = reference.getRowCount(0), columnCount = reference.getColumnCount(0);
            if (reference.getRangeCount() > 1
                || !context.arrayFormulaMode && rouCount > 1 && columnCount > 1) {
                value = CalcErrorsValue;
            }
            else {
                if (context.rowOffset !== -1 || context.columnOffset !== -1) {
                    if (rouCount === 1) {
                        r = 0;
                    }
                    else if (context.arrayFormulaMode) {
                        r = context.rowOffset;
                    }
                    else {
                        r = context.rowOffset - reference.getRow(0);
                    }
                    if (columnCount === 1) {
                        c = 0;
                    }
                    else if (context.arrayFormulaMode) {
                        c = context.columnOffset;
                    }
                    else {
                        c = context.columnOffset - reference.getColumn(0);
                    }
                }
                else {
                    r = rouCount === 1 ? 0 : context.row - reference.getRow(0);
                    c = columnCount === 1 ? 0 : context.column - reference.getColumn(0);
                }
                if (r >= rouCount || c >= columnCount) {
                    value = CalcErrorsNotAvailable;
                }
                else {
                    value = reference.getValue(0, r, c);
                }
            }
        }
        else if (isCalcArray(value)) {
            var array = value;
            if (context.arrayFormulaMode && (context.rowOffset !== -1 || context.columnOffset !== -1)) {
                r = array.getRowCount() === 1 ? 0 : context.rowOffset;
                c = array.getColumnCount() === 1 ? 0 : context.columnOffset;
                if (r >= array.getRowCount() || c >= array.getColumnCount()) {
                    value = CalcErrorsNotAvailable;
                }
                else {
                    value = array.getValue(r, c);
                }
            }
            else {
                value = array.getValue(0, 0);
            }
        }
        return (isCalcReference(value) || isCalcArray(value)) ? this.getOneValue(context, value) : value;
    };
    Evaluator.prototype._expandArgs = function (context, expr, args, needExpendIndexs, getReferenceValues) {
        var rowCount = 1;
        var colCount = 1;
        var testArg = -1;
        var expandRow = true, expandColumn = true;
        var array;
        var reference;
        var rc = 1, cc = 1;
        var functionExpr = expr.type === 7 ? expr : keyword_null;
        var fn = functionExpr && functionExpr.function;


        var isArrayFormulaOrDynamicArray = context.arrayFormulaMode || (context.source && context.source._service && context.source._service.allowDynamicArray);
        if (fn && !fn.expandRows()) {
            expandRow = false;
        }
        if (fn && !fn.expandColumns()) {
            expandColumn = false;
        }
        if (fn && fn.isBranch() && (isArrayFormulaOrDynamicArray || context._isExpandArrayToMultiCall())) {
            testArg = fn.findTestArgument();
            var indexList = [];
            var contains = false;
            if (needExpendIndexs) {
                for (var i = 0; i < needExpendIndexs.length; i++) {
                    indexList.push(needExpendIndexs[i]);
                    if (needExpendIndexs[i] === testArg) {
                        contains = true;
                    }
                }
            }
            if (contains || (isCalcArray(args[testArg])) || (isCalcReference(args[testArg]))) {
                for (var j = 0; j < functionExpr.arguments.length; j++) {
                    if (j !== testArg && Common_1.Common._ArrayHelper._indexOf(indexList, j) < 0 && (isCalcArray(args[j]) || isCalcReference(args[j]))) {
                        indexList.push(j);
                    }
                }
                needExpendIndexs = indexList;
            }
        }
        var expArgs = [];
        var expendIndexIndex = 0;
        var expendIndex = needExpendIndexs[expendIndexIndex];
        var count = args.length, argIndex, value, cacheItems = [];
        for (argIndex = 0; argIndex < count; argIndex++) {
            value = args[argIndex];
            array = keyword_null;
            reference = keyword_null;
            rc = cc = 1;
            if (argIndex === expendIndex) {
                array = isCalcArray(value) ? value : keyword_null;
                reference = isCalcReference(value) ? value : keyword_null;
                if (array || reference) {
                    rc = array && array.getRowCount() || (expandRow ? (reference ? reference.getRowCount(0) : 1) : 1);
                    cc = array && array.getColumnCount() || (expandColumn ? (reference ? reference.getColumnCount(0) : 1) : 1);
                }
                expendIndexIndex++;
                if (expendIndexIndex < needExpendIndexs.length) {
                    expendIndex = needExpendIndexs[expendIndexIndex];
                }
                else {
                    expendIndex = -1;
                }
            }
            else if (getReferenceValues === keyword_undefined) {
                array = isCalcArray(value) ? value : keyword_null;
                reference = isCalcReference(value) ? value : keyword_null;
                if (array || reference) {
                    rc = array && array.getRowCount() || (expandRow ? (reference ? reference.getRowCount(0) : 1) : 1);
                    cc = array && array.getColumnCount() || (expandColumn ? (reference ? reference.getColumnCount(0) : 1) : 1);
                }
            }

            cacheItems[argIndex] = [array, reference, value, rc, cc];

            rowCount = rc > rowCount ? rc : rowCount;
            colCount = cc > colCount ? cc : colCount;
        }
        for (argIndex = 0; argIndex < count; argIndex++) {
            var arrayItem = expArgs[argIndex] = [];
            var item = cacheItems[argIndex];
            array = item[0];
            reference = item[1];
            value = item[2];
            rc = item[3];
            cc = item[4];
            if (array || reference) {
                if ((rc !== 1 && rc !== rowCount || cc !== 1 && cc !== colCount) && (testArg === -1 || argIndex === testArg) && !isArrayFormulaOrDynamicArray) {
                    return;
                }
            }
            for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                var currentRow = arrayItem[rowIndex] = [];
                for (var colIndex = 0; colIndex < colCount; colIndex++) {
                    if (rc !== 1 && rowIndex >= rc || cc !== 1 && colIndex >= cc) {
                        currentRow[colIndex] = CalcErrorsNotAvailable;
                    }
                    else if (array) {
                        var tempValue = array.getValue(rc === 1 ? 0 : rowIndex, cc === 1 ? 0 : colIndex);
                        if (isCalcArray(tempValue)) {
                            tempValue = tempValue.getValue(0, 0);
                        }
                        currentRow[colIndex] = tempValue;
                    }
                    else if (reference) {
                        if (!getReferenceValues || getReferenceValues[argIndex]) {
                            currentRow[colIndex] = reference.getValue(0, rc === 1 ? 0 : rowIndex, cc === 1 ? 0 : colIndex);
                        }
                        else {
                            currentRow[colIndex] = reference.create([createRange(reference.getRow(0) + (rc === 1 ? 0 : rowIndex), reference.getColumn(0) + (cc === 1 ? 0 : colIndex), 1, 1)]);
                        }
                    }
                    else {
                        currentRow[colIndex] = value;
                    }
                }
            }
        }
        return expArgs;
    };
    return Evaluator;
}());
exports.Evaluator = Evaluator;
var AsyncFunctionNode = (function () {
    function AsyncFunctionNode(id, evaluateMode) {
        this.id = id;
        this._result = keyword_undefined;
        this._hasResult = false;
        this._children = [];
        if (evaluateMode !== keyword_undefined) {
            this.evaluateMode = evaluateMode;
        }
    }
    AsyncFunctionNode.prototype.canEvaluate = function () {
        var children = this._children;
        for (var i = 0; i < children.length; i++) {
            if (!children[i]._hasResult) {
                return false;
            }
        }
        return true;
    };
    return AsyncFunctionNode;
}());
exports.AsyncFunctionNode = AsyncFunctionNode;
var AsyncFunctionManager = (function () {
    function AsyncFunctionManager(evaluator) {
        var self = this;
        self._stack = [];
        self._stackIndex = -1;
        self._nodes = {};
        self._evaluator = evaluator;
        self._nodeCount = 0;
    }

    AsyncFunctionManager.prototype.startCalc = function () {
        var length;
        if (!this._nodeCount) {
            return;
        }

        for (var key in this._nodes) {
            var sourceNodes = this._nodes[key];
            if (sourceNodes) {
                for (var rowIndex in sourceNodes) {
                    var rowNodes = sourceNodes[rowIndex];
                    if (rowNodes) {
                        for (var columnIndex in rowNodes) {
                            var cellNodes = rowNodes[columnIndex];
                            if (cellNodes) {
                                cellNodes.root._children = [];
                                length = cellNodes.length;
                                if (length > 0) {
                                    for (var i = 0; i < length; i++) {
                                        var node = cellNodes[i];
                                        if (node.evaluateMode === 0 ) {
                                            node._hasResult = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    AsyncFunctionManager.prototype.startCalcCell = function (source, identity) {
        var self = this, sourceName = source.getName(), row = identity.row, column = identity.col;
        self.source = source;
        var sourceNodes = self._nodes[sourceName];
        if (!sourceNodes) {
            sourceNodes = self._nodes[sourceName] = {};
        }
        var rowNodes = sourceNodes[row];
        if (!rowNodes) {
            rowNodes = sourceNodes[row] = {};
        }
        var cellNodes = rowNodes[column];
        if (!cellNodes) {
            var node = new AsyncFunctionNode(-1);
            cellNodes = rowNodes[column] = [];
            cellNodes.root = node;
        }
        self._nodeCount++;
        self._stackIndex = 0;
        self.cellNodes = cellNodes;
        self.row = row;
        self.col = column;
        self._stack[0] = cellNodes.root;
        self.evaluateMode = -1;
    };
    AsyncFunctionManager.prototype.startCalcFunction = function (fn, expr, context) {
        var self = this, args = expr.arguments, notStartCell = false;
        if (self._stack.length === 0 || !self.cellNodes) {
            notStartCell = true;
            self.startCalcCell(context.source, context.identity);
        }
        var selfEvaluateMode = self.evaluateMode;
        var evaluateMode = fn.evaluateMode();
        if (fn.name === 'REFRESH') {
            evaluateMode = args[1] ? self._evaluator.evaluate(args[1], context, false, false) : 0;
            self.evaluateMode = evaluateMode;
        }
        else if (selfEvaluateMode !== -1) {
            evaluateMode = selfEvaluateMode;
        }
        var node, key;


        if (context.identity) {
            key = context.identity.row + '|' + context.identity.col;
        }
        else {
            key = '0';
        }
        if (expr._asyncFunctionNode && expr._asyncFunctionNode[key]) {
            node = expr._asyncFunctionNode[key];
        }
        else {
            expr._asyncFunctionNode = expr._asyncFunctionNode || {};
            node = expr._asyncFunctionNode[key] = new AsyncFunctionNode(self.cellNodes.length, evaluateMode);
            self.cellNodes.push(node);
        }
        self.currentNode = node;
        if (self._stack[self._stackIndex]._children.indexOf(node) < 0) {
            self._stack[self._stackIndex]._children.push(node);
            node.parent = self._stack[self._stackIndex];
            node._children = [];
        }
        self._stack.push(node);
        self._stackIndex++;
        if (evaluateMode === 2 && selfEvaluateMode === -1) {
            var defaultInterval = 60000;
            var intervals = self.intervals, interval_1 = fn.interval() || defaultInterval;
            if (fn.name === 'REFRESH') {
                node.isRefresh = true;
                interval_1 = args[2] ? self._evaluator.evaluate(args[2], context, false, false) : defaultInterval;
            }
            if (!intervals) {
                self.intervals = intervals = {};
            }
            var fns = intervals[interval_1];
            var i_1;
            if (!fns && typeof window === 'object') {
                fns = intervals[interval_1] = [];
                fns.intervalObj = window.setInterval(function () {
                    var currentFunctionInfos = self.intervals[interval_1];
                    for (i_1 = 0; i_1 < currentFunctionInfos.length; i_1++) {
                        var fnObj = currentFunctionInfos[i_1];
                        var node1 = fnObj.node;
                        node1._hasResult = false;
                        if (node1.isRefresh) {
                            invalidChildren(node1);
                        }
                        self._evaluator.service.recalculate(fnObj.source, fnObj.row, fnObj.col, true);
                        self.source.refresh();
                    }
                }, interval_1);
            }
            var finded = false;
            for (i_1 = 0; i_1 < fns.length; i_1++) {
                var fnTmp = fns[i_1];
                if (fnTmp.source === self.source && fnTmp.node === node && fnTmp.row === self.row && fnTmp.col === self.col) {
                    finded = true;
                    break;
                }
            }
            if (!finded) {
                fns.push({ source: self.source, node: node, row: self.row, col: self.col });
            }
        }
        if (notStartCell) {
            self.endCalcCell();
        }
        return node;
    };
    AsyncFunctionManager.prototype.getNode = function () {
        return this.currentNode;
    };
    AsyncFunctionManager.prototype.endCalcFunction = function () {
        this._stack.pop();
        this._stackIndex--;
        this.currentNode = this.currentNode.parent;
    };
    AsyncFunctionManager.prototype.endCalcCell = function () {
        var self = this;
        self._stackIndex = -1;
        self._stack = [];
    };
    AsyncFunctionManager.prototype.clearCell = function (source, identity) {
        var self = this;
        if (!self._nodeCount) {
            return;
        }
        var sourceName = source.getName(), row = identity.row, column = identity.col;
        self.source = source;
        var sourceNodes = self._nodes[sourceName];
        if (sourceNodes) {
            var rowNodes = sourceNodes[row];
            if (rowNodes) {
                var cellNodes = rowNodes[column];
                if (cellNodes) {
                    var node = cellNodes[0], cellCalc = node && node._calc;
                    if (cellCalc) {
                        delete cellCalc._hasAsync;
                        delete cellCalc._asyncNode;
                    }
                    rowNodes[column] = keyword_undefined;
                    self._nodeCount--;
                }
            }
        }
        if (typeof window === 'object') {
            var intervals = self.intervals;

            for (var timeKey in intervals) {
                var fns = intervals[timeKey];
                if (fns) {
                    var keepFns = [];
                    for (var i = 0; i < fns.length; i++) {
                        var fnInfo = fns[i];
                        if (fnInfo.source !== source || fnInfo.row !== identity.row || fnInfo.col !== identity.col) {
                            keepFns.push(fnInfo);
                        }
                    }
                    if (!keepFns.length) {
                        intervals[timeKey] = keyword_undefined;
                        window.clearInterval(fns.intervalObj);
                    }
                    else if (keepFns.length !== fns.length) {
                        keepFns.intervalObj = fns.intervalObj;
                        intervals[timeKey] = keepFns;
                    }
                }
            }
        }
    };
    AsyncFunctionManager.prototype.setAsyncResult = function (node, value) {
        node._result = value;
    };
    AsyncFunctionManager.prototype.addRows = function (source, row, count) {
        this._addRemoveRows(source, row, count, true);
    };
    AsyncFunctionManager.prototype.deleteRows = function (source, row, count) {
        this._addRemoveRows(source, row, count, false);
    };
    AsyncFunctionManager.prototype._addRemoveRows = function (source, row, count, isAdd) {
        var self = this;
        if (!self._nodeCount) {
            return;
        }
        var sourceName = source.getName();
        var sourceNodes = self._nodes[sourceName];
        if (sourceNodes) {
            var newSourceNodes = {};

            for (var rowKey in sourceNodes) {
                var rowNodes = sourceNodes[rowKey];
                if (rowNodes) {
                    var rowIndex = parseInt(rowKey, 10);
                    if (isAdd) {
                        var newRowIndex = rowIndex >= row ? rowIndex + count : rowIndex;
                        newSourceNodes[newRowIndex] = rowNodes;
                    }
                    else if (rowIndex < row) {
                        newSourceNodes[rowIndex] = rowNodes;
                    }
                    else if (rowIndex >= row + count) {
                        newSourceNodes[rowIndex - count] = rowNodes;
                    }
                }
            }
            self._nodes[sourceName] = newSourceNodes;
        }
        var intervals = self.intervals;

        for (var timeKey in intervals) {
            var fns = intervals[timeKey];
            if (fns) {
                var keepFns = [];
                for (var i = 0; i < fns.length; i++) {
                    var fnInfo = fns[i];
                    if (fnInfo.source === source && isAdd && fnInfo.row >= row) {
                        fnInfo.row += count;
                    }
                    else if (fnInfo.source === source && !isAdd
                        && (fnInfo.row < row || fnInfo.row >= row + count)) {
                        fnInfo.row = fnInfo.row < row ? fnInfo.row : fnInfo.row - count;
                        keepFns.push(fnInfo);
                    }
                }
                if (!isAdd && keepFns.length !== fns.length) {
                    keepFns.intervalObj = fns.intervalObj;
                    intervals[timeKey] = keepFns;
                }
            }
        }
    };
    AsyncFunctionManager.prototype.addColumns = function (source, column, count) {
        this._addRemoveColumns(source, column, count, true);
    };
    AsyncFunctionManager.prototype.deleteColumns = function (source, column, count) {
        this._addRemoveColumns(source, column, count, false);
    };
    AsyncFunctionManager.prototype._addRemoveColumns = function (source, column, count, isAdd) {
        var self = this;
        if (!self._nodeCount) {
            return;
        }
        var sourceName = source.getName();
        var sourceNodes = self._nodes[sourceName];
        if (sourceNodes) {
            for (var rowKey in sourceNodes) {
                var rowNodes = sourceNodes[rowKey];
                if (rowNodes) {
                    var newRowNodes = {};

                    for (var columnKey in rowNodes) {
                        var cellNodes = rowNodes[columnKey];
                        if (cellNodes && cellNodes.length) {
                            var columnIndex = parseInt(columnKey, 10);
                            if (isAdd) {
                                var newColumnIndex = columnIndex >= column ? columnIndex + count : columnIndex;
                                newRowNodes[newColumnIndex] = cellNodes;
                            }
                            else if (columnIndex < column) {
                                newRowNodes[columnIndex] = cellNodes;
                            }
                            else if (columnIndex >= column + count) {
                                newRowNodes[columnIndex - count] = cellNodes;
                            }
                        }
                    }
                    sourceNodes[rowKey] = newRowNodes;
                }
            }
        }
        var intervals = self.intervals;

        for (var timeKey in intervals) {
            var fns = intervals[timeKey];
            if (fns) {
                var keepFns = [];
                for (var i = 0; i < fns.length; i++) {
                    var fnInfo = fns[i];
                    if (fnInfo.source === source && isAdd && fnInfo.col >= column) {
                        fnInfo.col += count;
                    }
                    else if (fnInfo.source === source && !isAdd && (fnInfo.col < column || fnInfo.col >= column + count)) {
                        fnInfo.col = fnInfo.col < column ? fnInfo.col : fnInfo.col - count;
                        keepFns.push(fnInfo);
                    }
                }
                if (!isAdd && keepFns.length !== fns.length) {
                    keepFns.intervalObj = fns.intervalObj;
                    intervals[timeKey] = keepFns;
                }
            }
        }
    };
    AsyncFunctionManager.prototype.changeSourceName = function (oldName, newName) {
        var self = this;
        if (!self._nodeCount) {
            return;
        }
        var sourceNodes = self._nodes[oldName];
        if (sourceNodes) {
            self._nodes[newName] = sourceNodes;
            delete self._nodes[oldName];
        }
    };
    return AsyncFunctionManager;
}());
function invalidChildren(node) {
    var child;
    for (var i = 0; i < node._children.length; i++) {
        child = node._children[i];
        child._hasResult = false;
        if (child._children.length > 0) {
            invalidChildren(child);
        }
    }
}
function tryExtractToSingleValue(arg) {
    var success = true, value = arg;
    if (arg && arg.getValue) {
        var array = _toArray(arg, 0 , false, false);
        if (array.isError) {
            value = array[0];
        }
        else if (array.rowCount === 1 && array.colCount === 1) {
            value = array[0][0];
        }
        else {
            value = array;
            success = false;
        }
    }
    return {
        value: value,
        success: success
    };
}
function evaluateOperator(operatorType, value1, value2) {
    if (_isError(value1)) {
        return value1;
    }
    if (_isError(value2)) {
        return value2;
    }
    if (operatorType <= 2 ) {
        return evaluateUnaryOperator(operatorType, value1, value2);
    }
    else if (operatorType <= 14 ) {
        return evaluateMathOperator(operatorType, value1, value2);
    }
    return evaluateReferenceOperator(operatorType, value1, value2);
}
exports.evaluateOperator = evaluateOperator;
function evaluateUnaryOperator(operatorType, value, expendArray) {
    if (operatorType === 0 ) {
        return value;
    }
    if (!value) {
        return 0;
    }
    var isArg0Simple = tryExtractToSingleValue(value);
    if (isArg0Simple.success) {
        return evaluateMathOperatorSingleValue(operatorType, isArg0Simple.value);
    }
    if (expendArray) {
        var result = [], data = isArg0Simple.value;
        var rowCount = data.rowCount, colCount = data.colCount;
        for (var r = 0; r < rowCount; r++) {
            var rowData = result[r] = [];
            for (var c = 0; c < colCount; c++) {
                rowData[c] = evaluateMathOperatorSingleValue(operatorType, data[r][c]);
            }
        }
        return new calc_common_1.CalcArray(result);
    }
}
function evaluateMathOperator(operatorType, left, right) {
    var evaluateSingleValue;
    if (operatorType <= 7 ) {
        evaluateSingleValue = evaluateMathOperatorSingleValue;
    }
    else if (operatorType === 8 ) {
        evaluateSingleValue = evaluateStringOperatorSingleValue;
    }
    else {
        evaluateSingleValue = evaluateCompareOperatorSingleValue;
    }
    var isArg0Simple = tryExtractToSingleValue(left);
    var isArg1Simple = tryExtractToSingleValue(right);
    if (isArg0Simple.success && isArg1Simple.success) {
        return evaluateSingleValue(operatorType, isArg0Simple.value, isArg1Simple.value);
    }
    left = isArg0Simple.value;
    right = isArg1Simple.value;
    var rowArg0 = isArg0Simple.success ? -1 : left.rowCount;
    var colArg0 = isArg0Simple.success ? -1 : left.colCount;
    var rowArg1 = isArg1Simple.success ? -1 : right.rowCount;
    var colArg1 = isArg1Simple.success ? -1 : right.colCount;
    var row = -1, col = -1;
    if (!isArg0Simple.success && !isArg1Simple.success) {
        if (rowArg0 !== 1 && rowArg1 !== 1 && rowArg0 !== rowArg1 || colArg0 !== 1 && colArg1 !== 1 && colArg0 !== colArg1) {
            return CalcErrorsNotAvailable;
        }
        row = rowArg0 === 1 ? rowArg1 : rowArg0;
        col = colArg0 === 1 ? colArg1 : colArg0;
    }
    else if (!isArg0Simple.success) {
        row = rowArg0;
        col = colArg0;
    }
    else {
        row = rowArg1;
        col = colArg1;
    }
    var result = [];
    for (var i = 0; i < row; i++) {
        result[i] = [];
        for (var j = 0; j < col; j++) {
            if (!isArg0Simple.success && (rowArg0 !== 1 && rowArg0 < row || colArg0 !== 1 && colArg0 < col) || !isArg1Simple.success && (rowArg1 !== 1 && rowArg1 < row || colArg1 !== 1 && colArg1 < col)) {
                result[i][j] = CalcErrorsNotAvailable;
            }
            else {
                var fixedRowArg0 = rowArg0 === 1 ? 0 : i;
                var fixedColArg0 = colArg0 === 1 ? 0 : j;
                var fixedRowArg1 = rowArg1 === 1 ? 0 : i;
                var fixedColArg1 = colArg1 === 1 ? 0 : j;
                result[i][j] = evaluateSingleValue(operatorType, isArg0Simple.success ? left : left[fixedRowArg0][fixedColArg0], isArg1Simple.success ? right : right[fixedRowArg1][fixedColArg1]);
            }
        }
    }
    return new calc_common_1.CalcArray(result);
}
function evaluateMathOperatorSingleValue(operatorType, value1, value2) {
    function isEmptyString(str) {
        return (typeof str === 'string') && str.trim().length === 0;
    }
    if (isEmptyString(value1) || isEmptyString(value2)) {
        return CalcErrorsValue;
    }
    var doubleValue = { value: 0 };
    if (!_tryToDouble(value1, doubleValue)) {
        if (value1 instanceof calc_common_1.CalcError) {
            return value1;
        }
        return CalcErrorsValue;
    }
    var doubleLeft = doubleValue.value, doubleRight;
    if (value2 !== keyword_undefined) {
        if (!_tryToDouble(value2, doubleValue)) {
            if (value2 instanceof calc_common_1.CalcError) {
                return value2;
            }
            return CalcErrorsValue;
        }
        doubleRight = doubleValue.value;
    }
    else {
        doubleRight = 0;
    }
    if (operatorType === 1 ) {
        return -doubleLeft;
    }
    else if (operatorType === 2 ) {
        return doubleLeft / 100;
    }
    else if (operatorType === 3 ) {
        if (calc_common_1._Helper._approxEqual(doubleLeft, -doubleRight)) {
            return 0;
        }
        return doubleLeft + doubleRight;
    }
    else if (operatorType === 4 ) {
        if (calc_common_1._Helper._approxEqual(doubleLeft, doubleRight)) {
            return 0;
        }
        return doubleLeft - doubleRight;
    }
    else if (operatorType === 5 ) {
        return Common_1.Common._NumberHelper._fixNumber(doubleLeft * doubleRight, calc_common_1.Functions.CALC_PRECISION || 15);
    }
    else if (operatorType === 6 ) {
        return doubleRight ? (doubleLeft / doubleRight) : CalcErrorsDivideByZero;
    }
    else if (operatorType === 7 ) {
        if (!doubleLeft && doubleRight < 0) {
            return CalcErrorsDivideByZero;
        }
        if (doubleLeft === 0 && doubleRight === 0) {
            return CalcErrorsNumber;
        }

        var value = calc_common_1.Functions.MathHelper._powEx(doubleLeft, doubleRight);
        if (value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY || isNaN(value)) {
            return CalcErrorsNumber;
        }
        return value;
    }
}
function evaluateStringOperatorSingleValue(operatorType, left, right) {
    if (operatorType === 8 ) {
        if (_isError(left)) {
            return left;
        }
        if (_isError(right)) {
            return right;
        }
        return calc_common_1.Convert._toString(left) + calc_common_1.Convert._toString(right);
    }
}
function evaluateCompareOperatorSingleValue(operatorType, left, right) {
    var compareResult = calc_common_1._doCompare(left, right, false);
    if (_isError(compareResult)) {
        return compareResult;
    }
    return operatorType === 9 && compareResult === 0
        || operatorType === 10 && compareResult !== 0
        || operatorType === 11 && compareResult < 0
        || operatorType === 12 && compareResult <= 0
        || operatorType === 13 && compareResult > 0
        || operatorType === 14 && compareResult >= 0;
}
function evaluateReferenceOperator(operatorType, left, right) {
    if (!left || !right
        || (left.getRangeCount() !== 1 || right.getRangeCount() !== 1) && operatorType !== 16
        || left.endSource || right.endSource) {
        return CalcErrorsValue;
    }
    var leftSource = left.getSource();
    if (!leftSource || leftSource !== right.getSource()) {
        return CalcErrorsValue;
    }
    var newIndenties;
    if (operatorType === 16 ) {
        newIndenties = left._identities.concat(right._identities);
    }
    else {
        var indexFunction = operatorType === 15 ? Math_min : Math_max, countFunction = operatorType === 15 ? Math_max : Math_min;
        var leftRow = left.getRow(0);
        var leftColumn = left.getColumn(0);
        var rightRow = right.getRow(0);
        var rightColumn = right.getColumn(0);
        var row = indexFunction(leftRow, rightRow);
        var column = indexFunction(leftColumn, rightColumn);
        var rowCount = countFunction(leftRow + left.getRowCount(0), rightRow + right.getRowCount(0)) - row;
        var columnCount = countFunction(leftColumn + left.getColumnCount(0), rightColumn + right.getColumnCount(0)) - column;
        if (rowCount < 1 || columnCount < 1) {
            return calc_common_1.Errors.Null;
        }
        newIndenties = [createRange(row, column, rowCount, columnCount)];
    }

    var t = new calc_common_1.CalcReference(leftSource, newIndenties);


    t._isVolatile = true;
    return t;
}
var _toDouble = calc_common_1.Convert._toDouble, _toInt = calc_common_1.Convert._toInt, _toString = calc_common_1.Convert._toString, _tryToDateTime = calc_common_1.Convert._tryToDateTime, _toBool = calc_common_1.Convert._toBool;
function processArgType(argValue, argLimitValue) {
    var isExecuteFunc = true, retValue, needNumber;
    switch (argLimitValue._argType) {
        case 0 :
            retValue = _toDouble(argValue);
            needNumber = true;
            break;
        case 1 :
            retValue = parseFloat(argValue);
            needNumber = true;
            break;
        case 2 :
            retValue = _toInt(argValue);
            needNumber = true;
            break;
        case 3 :
            retValue = parseInt(argValue, 10);
            needNumber = true;
            break;
        case 4 :
            retValue = _toArray(argValue, argLimitValue._valueType, argLimitValue._toOneDimension || false, argLimitValue._breakOnError || false, argLimitValue._breakOnConvertError || false, argLimitValue._ignoreBlank, argLimitValue._followFormatter, argLimitValue._ignoreBoolean);
            if (retValue.isError) {
                retValue = retValue[0];
                isExecuteFunc = false;
            }
            if (retValue.isConvertError) {
                retValue = CalcErrorsValue;
                isExecuteFunc = false;
            }
            break;
        case 5 :
            retValue = _toString(argValue);
            if (argLimitValue._acceptsEmptyString && retValue === '') {
                retValue = CalcErrorsValue;
                isExecuteFunc = false;
            }
            break;
        case 6 :
            var dateValue = { value: keyword_null };
            if (_tryToDateTime(argValue, dateValue)) {
                retValue = dateValue.value;
            }
            else {
                retValue = CalcErrorsValue;
                isExecuteFunc = false;
            }
            break;
        case 7 :
            retValue = _toBool(argValue);
            break;
        case 8 :
            retValue = calc_common_1.Functions._convertToComplex(argValue);
            if (!retValue || argLimitValue._complexCondition && retValue._getReal() === 0 && retValue._getImag() === 0) {
                retValue = calc_common_1.Errors.Number;
                isExecuteFunc = false;
            }
            else {
                retValue = { _real: retValue._getReal(), _imag: retValue._getImag() };
            }
            break;
        default:
            retValue = argValue;
            break;
    }
    if (needNumber && isNaN(retValue)) {
        retValue = CalcErrorsValue;
        isExecuteFunc = false;
    }
    return { _retValue: retValue, _isExecuteFunc: isExecuteFunc };
}
function processArgCondition(result, argCondition, conditionErrorValue) {
    if (!Array.isArray(argCondition)) {
        argCondition = [argCondition];
    }
    var argValue = result._retValue, i;
    for (i = 0; i < argCondition.length; i++) {
        var argConditionArray = argCondition[i].split(' '), sign = argConditionArray[0], num = parseInt(argConditionArray[1], 10);
        if (sign === '<' && argValue < num || sign === '>' && argValue > num ||
            sign === '<=' && argValue <= num || sign === '>=' && argValue >= num ||
            sign === '=' && argValue === num || sign === '!=' && argValue !== num ||
            sign === 'checkLength' && argValue.length > num) {
            result._retValue = conditionErrorValue === keyword_undefined ? calc_common_1.Errors.Number : conditionErrorValue;
            result._isExecuteFunc = false;
            return;
        }
    }
}
function processBuiltInFunctionArgs(args, fnArgsLimit) {
    var argsLimit = [], result, i;
    if (!fnArgsLimit) {
        return { _args: args, _isExecuteFunc: true };
    }
    if (fnArgsLimit._isAllArgsSameLimit) {
        for (var j = 0; j < args.length; j++) {
            argsLimit.push(fnArgsLimit);
        }
    }
    else if (!Array.isArray(fnArgsLimit)) {
        argsLimit = [fnArgsLimit];
    }
    else {
        argsLimit = fnArgsLimit;
    }
    for (i = 0; i < argsLimit.length; i++) {
        var argLimitValue = argsLimit[i];
        if (argLimitValue._acceptsRealValue && !args[i]) {
            throw calc_common_1.sR().Exp_ArgumentNull;
        }
        var isArgExists = args[i] !== keyword_undefined;
        if (!isArgExists) {
            args[i] = argLimitValue._needArgExistsValue ?
                { _isArgExists: isArgExists, _value: argLimitValue._defaultValue } : argLimitValue._defaultValue;
            continue;
        }
        result = processArgType(args[i], argLimitValue);
        if (argLimitValue._argCondition) {
            processArgCondition(result, argLimitValue._argCondition, argLimitValue._conditionErrorValue);
        }
        if (!result._isExecuteFunc) {
            break;
        }
        args[i] = argLimitValue._needArgExistsValue ?
            { _isArgExists: isArgExists, _value: result._retValue } : result._retValue;
    }
    if (result) {
        return { _args: args, _isExecuteFunc: result._isExecuteFunc, _result: result._retValue };
    }
}
 }),

 './src/referenceExpression.ts':
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
var calc_common_1 = __webpack_require__( './src/calc.common.ts');
var keyword_undefined = void 0;

var Math_abs = Math.abs;
var ReferenceExpression = (function (_super) {
    __extends(ReferenceExpression, _super);
    function ReferenceExpression(type) {
        return _super.call(this, type) || this;
    }
    ReferenceExpression.prototype._isCell = function () {
        var self = this;
        return self.endRow === keyword_undefined || self.endColumn === keyword_undefined;
    };
    ReferenceExpression.prototype._getRangeType = function () {
        var self = this;
        if (self.isFullRow && self.isFullColumn) {
            return 3 ;
        }
        else if (self.isFullRow) {
            return 1 ;
        }
        else if (self.isFullColumn) {
            return 2 ;
        }
        return 0 ;
    };
    ReferenceExpression.prototype.getRange = function (baseRow, baseColumn) {
        return getRangeForReference(this, baseRow, baseColumn) ;
    };


    ReferenceExpression.prototype.offset = function (row, col, offsetAbsolute, baseRow, baseColumn) {
        var self = this;
        var source = self.source;
        var endSource = self.endSource;
        if (self._isCell()) {
            return _createCellExpression(source, endSource, self.row + ((self.rowRelative || offsetAbsolute) ? row : 0), self.column + ((self.columnRelative || offsetAbsolute) ? col : 0), self.rowRelative, self.columnRelative);
        }
        var newExpr = _createRangeExpression(source, endSource, self.row + ((self.rowRelative || offsetAbsolute) ? row : 0), self.column + ((self.columnRelative || offsetAbsolute) ? col : 0), self.endRow + (!self.isFullColumn && (self.endRowRelative || offsetAbsolute) ? row : 0), self.endColumn + (!self.isFullRow && (self.endColumnRelative || offsetAbsolute) ? col : 0), self.rowRelative, self.columnRelative, self.endRowRelative, self.endColumnRelative, baseRow, baseColumn);
        newExpr.isFullRow = self.isFullRow;
        newExpr.isFullColumn = self.isFullColumn;
        return newExpr;
    };
    ReferenceExpression.prototype.offset2 = function (row, col, endRow, endCol, baseRow, baseColumn) {
        var self = this;
        var newExpr = _createRangeExpression(self.source, self.endSource, self.row + (!self.isFullColumn ? row : 0), self.column + (!self.isFullRow ? col : 0), self.endRow + (!self.isFullColumn ? endRow : 0), self.endColumn + (!self.isFullRow ? endCol : 0), self.rowRelative, self.columnRelative, self.endRowRelative, self.endColumnRelative, baseRow, baseColumn);
        newExpr.isFullRow = self.isFullRow;
        newExpr.isFullColumn = self.isFullColumn;
        return newExpr;
    };
    return ReferenceExpression;
}(calc_common_1.Expression));
exports.ReferenceExpression = ReferenceExpression;
function _createCellExpression(source, endSource, row, col, rowRelative, columnRelative) {
    var expr = new ReferenceExpression(1 ) ;
    expr.row = row;
    expr.column = col;
    expr.rowRelative = rowRelative;
    expr.columnRelative = columnRelative;
    if (source) {
        expr.source = source;
    }
    if (endSource) {
        expr.endSource = endSource;
    }
    return expr;
}
exports._createCellExpression = _createCellExpression;
function _createRangeExpression(source, endSource, row, col, endRow, endCol, rowRelative, columnRelative, endRowRelative, endColumnRelative, baseRow, baseCol, isArrayReference) {
    var expr = new ReferenceExpression(1 ), tmp;
    expr.isFullRow = col === calc_common_1.BAND_INDEX_CONST;


    baseRow = baseRow || 0;
    baseCol = baseCol || 0;
    var rowTemp = row - (!rowRelative ? baseRow : 0), colTemp = col - (!columnRelative ? baseCol : 0), endRowTemp = endRow - (!endRowRelative ? baseRow : 0), endColTemp = endCol - (!endColumnRelative ? baseCol : 0);
    if (expr.isFullRow && row === 0 && endRow === calc_common_1.MAX_ROW_COUNT - 1) {
        row = endRow = calc_common_1.BAND_INDEX_CONST;
    }
    expr.isFullColumn = row === calc_common_1.BAND_INDEX_CONST;
    if (rowTemp > endRowTemp) {
        tmp = row;
        row = endRow;
        endRow = tmp;
        tmp = rowRelative;
        rowRelative = endRowRelative;
        endRowRelative = tmp;
    }
    if (colTemp > endColTemp) {
        tmp = col;
        col = endCol;
        endCol = tmp;
        tmp = columnRelative;
        columnRelative = endColumnRelative;
        endColumnRelative = tmp;
    }
    expr.row = row;
    expr.column = col;
    expr.endRow = endRow;
    expr.endColumn = endCol;
    expr.rowRelative = rowRelative;
    expr.columnRelative = columnRelative;
    expr.endRowRelative = endRowRelative;
    expr.endColumnRelative = endColumnRelative;
    expr.isArrayReference = isArrayReference;
    if (source) {
        expr.source = source;
    }
    if (endSource) {
        expr.endSource = endSource;
    }
    return expr;
}
exports._createRangeExpression = _createRangeExpression;
function getRangeForReference(expr, baseRow, baseColumn) {
    var range = {
        row: -1,
        col: -1,
        rowCount: -1,
        colCount: -1
    }, startRow, endRow, startCol, endCol;
    if (expr.isFullRow) {
        range.col = -1;
        range.colCount = -1;
    }
    else {
        if (expr.columnRelative) {
            startCol = expr.column + baseColumn;
            startCol = startCol >= calc_common_1.MAX_COLUMN_COUNT ? startCol % calc_common_1.MAX_COLUMN_COUNT : startCol;
        }
        else {
            startCol = expr.column;
        }
        if (expr._isCell()) {
            range.col = startCol;
            range.colCount = 1;
        }
        else {
            if (expr.endColumnRelative) {
                endCol = expr.endColumn + baseColumn;
                endCol = endCol >= calc_common_1.MAX_COLUMN_COUNT ? endCol % calc_common_1.MAX_COLUMN_COUNT : endCol;
            }
            else {
                endCol = expr.endColumn;
            }
            range.col = startCol <= endCol ? startCol : endCol;
            range.colCount = Math_abs(endCol - startCol) + 1;
        }
    }
    if (expr.isFullColumn) {
        range.row = -1;
        range.rowCount = -1;
    }
    else {
        if (expr.rowRelative) {
            startRow = expr.row + baseRow;
            startRow = startRow >= calc_common_1.MAX_ROW_COUNT ? startRow % calc_common_1.MAX_ROW_COUNT : startRow;
        }
        else {
            startRow = expr.row;
        }
        if (expr._isCell()) {
            range.row = startRow;
            range.rowCount = 1;
        }
        else {
            if (expr.endRowRelative) {
                endRow = expr.endRow + baseRow;
                endRow = endRow >= calc_common_1.MAX_ROW_COUNT ? endRow % calc_common_1.MAX_ROW_COUNT : endRow;
            }
            else {
                endRow = expr.endRow;
            }
            range.row = startRow <= endRow ? startRow : endRow;
            range.rowCount = Math_abs(endRow - startRow) + 1;
        }
    }
    return range;
}
exports.getRangeForReference = getRangeForReference;
var SpillReferenceExpression = (function (_super) {
    __extends(SpillReferenceExpression, _super);
    function SpillReferenceExpression(row, column, rowRelative, columnRelative, isReferenceError) {
        var _this = _super.call(this, 33 ) || this;
        _this.row = row;
        _this.column = column;
        _this.rowRelative = rowRelative;
        _this.columnRelative = columnRelative;
        _this.isReferenceError = isReferenceError;
        _this._isCell = function () {
            return !this.isReferenceError;
        };
        _this.getRange = function (baseRow, baseColumn) {
            var expr = this;
            var source = expr.source || expr.contextSource;
            if (!expr.isReferenceError && source) {
                var range = getRangeForReference(expr, baseRow, baseColumn);
                var row = range.row, col = range.col;
                var ref = source.getReference({ row: row, col: col, spillRef: true });
                if (ref) {
                    var result = {
                        spillRef: true,
                        row: row,
                        col: col,
                        rowCount: ref.getRowCount(),
                        colCount: ref.getColumnCount()
                    };
                    if (ref.isSpillError) {
                        result.isSpillError = true;
                    }
                    return result;
                }
            }
        };
        _this.offset = function (rowOffset, colOffset, offsetAbsolute) {
            var self = this;
            var contextSource = self.contextSource;
            var source = self.source;
            var endSource = self.endSource;
            if (this.isReferenceError) {
                return _createSpillRefErrorExpression(contextSource, source);
            }
            else {
                return _createSpillRefExpression(contextSource, source, endSource, self.row + ((self.rowRelative || offsetAbsolute) ? rowOffset : 0), self.column + ((self.columnRelative || offsetAbsolute) ? colOffset : 0), self.rowRelative, self.columnRelative);
            }
        };
        return _this;
    }
    return SpillReferenceExpression;
}(calc_common_1.Expression));
exports.SpillReferenceExpression = SpillReferenceExpression;
function _createSpillRefExpression(contextSource, source, endSource, row, col, rowRelative, columnRelative, isReferenceError) {
    var expr = new SpillReferenceExpression(row, col, rowRelative, columnRelative, isReferenceError);

    expr.contextSource = contextSource;

    expr.source = source;
    expr.endSource = endSource;
    return expr;
}
exports._createSpillRefExpression = _createSpillRefExpression;
function _createSpillRefErrorExpression(contextSource, source) {
    return _createSpillRefExpression(contextSource, source, keyword_undefined, 0, 0, false, false, true);
}
exports._createSpillRefErrorExpression = _createSpillRefErrorExpression;
 }),

 'Common':
 (function(module, exports) {
module.exports = __webpack_require__(/*! @grapecity/js-sheets-common */ '@grapecity/js-sheets-common');
 })

 });

module.exports = GC.Spread.CalcEngine;
/***/ }),

/***/ './node_modules_local/@grapecity/js-calc/index.js':
/*!********************************************************!*\
  !*** ./node_modules_local/@grapecity/js-calc/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
module.exports = __webpack_require__(/*! ./dist/gc.spread.calcengine.js */ './node_modules_local/@grapecity/js-calc/dist/gc.spread.calcengine.js');
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
//# sourceMappingURL=gc.spread.calcengine.14.2.5.js.map