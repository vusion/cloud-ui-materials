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
  var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['Search'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/search/search.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/search/search.entry.js':
/*!*********************************************!*\
  !*** ./dist/plugins/search/search.entry.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var search_1 = __webpack_require__(/*! ./search */ './dist/plugins/search/search.js');
exports.SearchResult = search_1.SearchResult;
exports.SearchCondition = search_1.SearchCondition;
exports.SearchFlags = search_1.SearchFlags;
exports.SearchOrder = search_1.SearchOrder;
exports.SearchFoundFlags = search_1.SearchFoundFlags;
/***/ }),

/***/ './dist/plugins/search/search.js':
/*!***************************************!*\
  !*** ./dist/plugins/search/search.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });


var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var CalcEngine = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var _supportsCalc = !!CalcEngine;
var RegexHelper = Common_1.Common._RegexHelper;
var keyword_null = null, Math_max = Math.max, const_string = 'string';
function trySearch(source, searchString, searchFlags) {
    if (!source) {
        return false;
    }
    source = source.toString();
    searchString = searchString.toString();
    if (searchFlags === 0) {
        return source.indexOf(searchString) > -1;
    }
    var isExactMatch = (searchFlags & 2 ) > 0, isIgnoreCase = (searchFlags & 1 ) > 0, isUseWildCards = (searchFlags & 4 ) > 0, rgExp;
    if (!isUseWildCards) {
        if (isIgnoreCase) {
            searchString = searchString.toLowerCase();
            source = source.toLowerCase();
        }
        return isExactMatch ? searchString === source : source.indexOf(searchString) >= 0;
    }
    rgExp = isExactMatch ? RegexHelper._getWildcardCriteriaFullMatch(searchString, false, true) : RegexHelper._getWildcardCriteria(searchString);
    searchString = rgExp ? rgExp : searchString;
    rgExp = isIgnoreCase ? RegexHelper._getRegIgnoreCase(searchString) : RegexHelper._getReg(searchString);
    return rgExp.test(source);
}
function nextCell(r, c, searchOrder, isBlockRange, rowStart, rowEnd, columnStart, columnEnd) {
    var result = keyword_null, nextRow = r + 1, nextCol = c + 1;
    if (searchOrder === 0 ) {
        if (nextCol >= 0 && nextCol <= columnEnd) {
            result = { r: r, c: nextCol };
        }
        else if (nextRow >= 0 && nextRow <= rowEnd) {
            result = { r: nextRow, c: isBlockRange ? columnStart : 0 };
        }
    }
    else if (nextRow <= rowEnd) {
        result = { r: nextRow, c: c };
    }
    else if (nextCol <= columnEnd) {
        result = { r: isBlockRange ? rowStart : 0, c: nextCol };
    }
    return result;
}


Core_1.Worksheet.prototype.search = function (searchCondition) {
    if (!searchCondition) {
        return keyword_null;
    }
    var self = this, sheetArea = searchCondition.sheetArea, searchString = searchCondition.searchString, searchTarget = searchCondition.searchTarget, searchFlags = searchCondition.searchFlags, rowCount = self.getRowCount(sheetArea), colCount = self.getColumnCount(sheetArea), searchResult = new SearchResult();
    if (!searchString || searchTarget === 0 || (rowCount <= 0 && colCount <= 0)) {
        return searchResult;
    }
    var rowStart = Math_max(0, searchCondition.rowStart), columnStart = Math_max(0, searchCondition.columnStart), rowEnd = searchCondition.rowEnd, columnEnd = searchCondition.columnEnd, isBlockRange = (searchFlags & 8 ) > 0;
    if (rowEnd < 0 || !isBlockRange) {
        rowEnd = rowCount - 1;
    }
    if (columnEnd < 0 || !isBlockRange) {
        columnEnd = colCount - 1;
    }
    var findBeginRow = searchCondition.findBeginRow, findBeginColumn = searchCondition.findBeginColumn, r = findBeginRow < 0 ? rowStart : findBeginRow, c = findBeginColumn < 0 ? columnStart : findBeginColumn;
    while (r >= 0 && c >= 0) {
        var cell = self.getCell(r, c, sheetArea), searchSource = void 0, cellType = self.getCellType(r, c, sheetArea);

        if ((searchTarget & 1 ) > 0) {
            if (searchCondition.callback) {
                searchSource = searchCondition.callback(cell, self);
            }
            else {
                searchSource = cell.text();
            }
            if (searchSource !== '' && trySearch(searchSource, searchString, searchFlags)) {
                searchResult.searchFoundFlag |= 1 ;
                searchResult.foundString = searchSource;
            }

            if (cellType && cellType._caption && trySearch(cellType._caption, searchString, searchFlags)) {
              searchResult.searchFoundFlag |= 1 ;
              searchResult.foundString = cellType._caption;
            }
        }

        if (_supportsCalc && (searchTarget & 8 ) > 0) {
            searchSource = Core_1.util._getFormulaTextBoxValue(self, r, c);
            if (typeof searchSource === const_string && searchSource !== '' && trySearch(searchSource, searchString, searchFlags)) {
                searchResult.searchFoundFlag |= 8 ;
                searchResult.foundString = searchSource;
            }
        }

        if ((searchTarget & 4 ) > 0) {
            searchSource = cell.tag();
            if (typeof searchSource === const_string && searchSource !== '' && trySearch(searchSource, searchString, searchFlags)) {
                searchResult.searchFoundFlag |= 4 ;
                searchResult.foundString = searchSource;
            }
        }
        if (searchResult.searchFoundFlag !== 0 ) {
            searchResult.foundRowIndex = r;
            searchResult.foundColumnIndex = c;
            return searchResult;
        }
        var rowcol = nextCell(r, c, searchCondition.searchOrder, isBlockRange, rowStart, rowEnd, columnStart, columnEnd);
        if (!rowcol) {
            break;
        }
        r = rowcol.r;
        c = rowcol.c;
    }

    return searchResult;
};


Core_1.Workbook.prototype.search = function (searchCondition) {
    if (!searchCondition) {
        return keyword_null;
    }
    var self = this, SearchFoundFlags_None = 0 , sheetCount = self.getSheetCount(), defaultSearchResult = new SearchResult();
    if (!searchCondition.searchString || searchCondition.searchTarget === SearchFoundFlags_None || sheetCount <= 0) {
        return defaultSearchResult;
    }
    if (searchCondition.startSheetIndex === -1) {
        searchCondition.startSheetIndex = 0;
    }
    if (searchCondition.endSheetIndex === -1) {
        searchCondition.endSheetIndex = sheetCount - 1;
    }
    var sheetIndex, sheet, searchResult, startSheetIndex = searchCondition.startSheetIndex, endSheetIndex = searchCondition.endSheetIndex;
    if (endSheetIndex >= startSheetIndex && 0 <= startSheetIndex && startSheetIndex < sheetCount && 0 <= endSheetIndex && endSheetIndex < sheetCount) {
        for (sheetIndex = startSheetIndex; sheetIndex <= endSheetIndex; sheetIndex++) {
            sheet = self.getSheet(sheetIndex);
            searchResult = sheet.search(searchCondition);
            if (searchResult && searchResult.searchFoundFlag !== SearchFoundFlags_None) {
                searchResult.foundSheetIndex = sheetIndex;
                return searchResult;
            }
        }
    }
    return defaultSearchResult;
};


var SearchCondition = (function () {
    function SearchCondition() {
        this.startSheetIndex = -1;


        this.endSheetIndex = -1;


        this.searchString = keyword_null;


        this.searchFlags = 0 ;


        this.searchOrder = 0 ;


        this.searchTarget = 1 ;


        this.sheetArea = 3 ;


        this.rowStart = -1;


        this.columnStart = -1;


        this.rowEnd = -1;


        this.columnEnd = -1;
        this.findBeginRow = -1;
        this.findBeginColumn = -1;
    }
    return SearchCondition;
}());
exports.SearchCondition = SearchCondition;


var SearchResult = (function () {
    function SearchResult() {
        this.foundColumnIndex = -1;


        this.foundRowIndex = -1;


        this.searchFoundFlag = 0 ;


        this.foundSheetIndex = -1;


        this.foundString = keyword_null;
    }
    return SearchResult;
}());
exports.SearchResult = SearchResult;


var SearchFlags;
(function (SearchFlags) {
    SearchFlags[SearchFlags['none'] = 0] = 'none';

    SearchFlags[SearchFlags['ignoreCase'] = 1] = 'ignoreCase';

    SearchFlags[SearchFlags['exactMatch'] = 2] = 'exactMatch';

    SearchFlags[SearchFlags['useWildCards'] = 4] = 'useWildCards';

    SearchFlags[SearchFlags['blockRange'] = 8] = 'blockRange';
})(SearchFlags = exports.SearchFlags || (exports.SearchFlags = {}));


var SearchOrder;
(function (SearchOrder) {
    SearchOrder[SearchOrder['zOrder'] = 0] = 'zOrder';

    SearchOrder[SearchOrder['nOrder'] = 1] = 'nOrder';
})(SearchOrder = exports.SearchOrder || (exports.SearchOrder = {}));


var SearchFoundFlags;
(function (SearchFoundFlags) {
    SearchFoundFlags[SearchFoundFlags['none'] = 0] = 'none';

    SearchFoundFlags[SearchFoundFlags['cellText'] = 1] = 'cellText';

    SearchFoundFlags[SearchFoundFlags['cellTag'] = 4] = 'cellTag';

    SearchFoundFlags[SearchFoundFlags['cellFormula'] = 8] = 'cellFormula';
})(SearchFoundFlags = exports.SearchFoundFlags || (exports.SearchFoundFlags = {}));
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
//# sourceMappingURL=gc.spread.sheets.search.14.2.5.js.map