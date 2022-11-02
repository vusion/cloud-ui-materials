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
    GC = typeof GC === 'object' ? GC : {}; GC['Spread'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './resource.zh.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/core/core.res.zh.js':
/*!**********************************!*\
  !*** ./dist/core/core.res.zh.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';


Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var elements = Core_1.GC$('meta[name=\'spreadjs culture\']');
if (elements.length > 0) {
    var culture = Core_1.GC$(elements[elements.length - 1]).attr('content');
    if (culture !== null && culture !== undefined && culture.toLowerCase() === 'zh-cn') {
        Common_1.Common.CultureManager.culture('zh-cn');
    }
}
exports.Exp_NotSupported = '\u4e0d\u652f\u6301\u5f02\u5e38';
exports.Exp_PasteExtentIsNull = 'pasteExtent\u4e3a\u7a7a';
exports.Exp_InvalidPastedArea = '\u7c98\u8d34\u7684\u533a\u57df\u5e94\u8be5\u4e0e\u62f7\u8d1d\u7684\u533a\u57df\u6216\u526a\u8d34\u7684\u533a\u57df\u5927\u5c0f\u76f8\u540c\u3002';
exports.Exp_MultipleSelections = '\u6b64\u64cd\u4f5c\u4e0d\u9002\u7528\u4e8e\u591a\u7247\u9009\u62e9\u533a\u57df\u3002';
exports.Exp_ChangePartOfArray = '\u65e0\u6cd5\u4ec5\u6539\u53d8\u90e8\u5206\u7684\u6570\u7ec4\u3002';
exports.Exp_InvalidAndSpace = '\u65e0\u6548\u7684 {0}: {1} (\u5fc5\u987b\u5728 {2} \u5230 {3} \u4e4b\u95f4)\u3002';
exports.Exp_SrcIsNull = '\u53c2\u6570 \'src\' \u4e3a\u7a7a';
exports.Exp_DestIsNull = '\u53c2\u6570 \'dest\' \u4e3a\u7a7a';
exports.Exp_InvalidCustomFunction = '\u65e0\u6548\u81ea\u5b9a\u4e49\u51fd\u6570';
exports.Exp_InvalidCustomName = '\u65e0\u6548\u81ea\u5b9a\u4e49\u540d\u79f0';
exports.Exp_IndexOutOfRange = '\u7d22\u5f15\u8d85\u51fa\u533a\u95f4!';
exports.Exp_InvalidRange = '\u65e0\u6548\u533a\u95f4';
exports.Exp_NotAFunction = '\u65e0\u6548\u51fd\u6570';
exports.Exp_ArgumentOutOfRange = '\u53c2\u6570\u8d85\u51fa\u8303\u56f4';
exports.Exp_PasteSourceCellsLocked = '\u6e90\u8868\u5355\u7684\u5355\u5143\u683c\u88ab\u9501\u5b9a\u3002';
exports.Exp_InvalidCopyPasteSize = '\u590d\u5236\u548c\u7c98\u8d34\u7684\u533a\u57df\u5927\u5c0f\u4e0d\u4e00\u81f4\u3002';
exports.Exp_PasteDestinationCellsLocked = '\u60a8\u5c1d\u8bd5\u6539\u53d8\u7684\u5355\u5143\u683c\u662f\u88ab\u4fdd\u62a4\u7684\uff0c\u56e0\u6b64\u662f\u53ea\u8bfb\u7684\u3002';
exports.Exp_PasteChangeMergeCell = '\u4e0d\u80fd\u4ec5\u6539\u53d8\u5408\u5e76\u5355\u5143\u683c\u7684\u4e00\u90e8\u5206\u3002';
exports.Tip_Row = '\u884c: ';
exports.Tip_Column = '\u5217: ';
exports.Tip_Height = '\u9ad8\u5ea6: {0} \u50cf\u7d20';
exports.Tip_Width = '\u5bbd\u5ea6: {0} \u50cf\u7d20';
exports.NewTab = '\u65b0\u5efa...';
exports.Exp_EmptyNamedStyle = '\u547d\u540d\u6837\u5f0f\u7684\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a';
exports.Exp_SheetNameInvalid = '\u8868\u5355\u540d\u4e0d\u80fd\u4e3a\u7a7a\u4e14\u4e0d\u80fd\u5305\u542b\u4ee5\u4e0b\u5b57\u7b26 : *, :, [, ], ?, \\, /';
exports.Exp_SheetNameConflict = '\u6b64\u540d\u79f0\u5df2\u88ab\u4f7f\u7528\u3002\u8bf7\u5c1d\u8bd5\u5176\u4ed6\u540d\u79f0\u3002';
exports.Exp_ArrayFormulaSpan = '\u5408\u5e76\u5355\u5143\u683c\u7684\u6570\u7ec4\u516c\u5f0f\u4e0d\u662f\u6709\u6548\u7684\u3002';
exports.Exp_DestSheetIsNull = 'destSheet\u4e3a\u7a7a\u3002';
exports.Exp_SheetIsNull = 'sheet\u4e3a\u7a7a\u3002';
exports.Exp_OverlappingSpans = '\u64cd\u4f5c\u5c06\u5e26\u6765\u91cd\u590d\u7684\u5408\u5e76\u6548\u679c\u3002';
exports.NeedCanvasSupport = '\u4f60\u9700\u8981\u4e00\u4e2a\u5b8c\u5168\u652f\u6301HTML5 Canvas\u7684\u6d4f\u89c8\u5668\u6765\u8fd0\u884cSpreadJS';
exports.ARIA_Resize = '\u8c03\u6574\u5927\u5c0f';
exports.ARIA_First = '\u7b2c\u4e00\u4e2a';
exports.ARIA_PreviousArrow = '\u4e0a\u4e00\u4e2a';
exports.ARIA_NextArrow = '\u4e0b\u4e00\u4e2a';
exports.ARIA_Last = '\u6700\u540e\u4e00\u4e2a';
exports.ARIA_PreviousButton = '\u5411\u524d\u4e00\u4e2a';
exports.ARIA_NextButton = '\u5411\u540e\u4e00\u4e2a';
exports.ARIA_SheetTab = '\u5de5\u4f5c\u8868\u6807\u7b7e';
exports.ARIA_NewSheet = '\u65b0\u5efa\u5de5\u4f5c\u8868';
exports.ARIA_Blank = '\u7a7a\u767d';
exports.ARIA_Scrollbar_Left_Button = '\u6eda\u52a8\u6761\u5de6\u6309\u94ae';
exports.ARIA_Scrollbar_Top_Button = '\u6eda\u52a8\u6761\u4e0a\u6309\u94ae';
exports.ARIA_Scrollbar_Thumb_Button = '\u6eda\u52a8\u6761\u6ed1\u5757\u6309\u94ae';
exports.ARIA_Scrollbar_Right_Button = '\u6eda\u52a8\u6761\u53f3\u6309\u94ae';
exports.ARIA_Scrollbar_Bottom_Button = '\u6eda\u52a8\u6761\u4e0b\u6309\u94ae';
exports.ARIA_Scrollbar_TRACK_Button = '\u6eda\u52a8\u6761\u8ddf\u8e2a\u6309\u94ae';
exports.ARIA_Cell = '\u5355\u5143\u683c';
exports.ARIA_HasValue = '\u7684\u503c\u662f {0}';
exports.ARIA_HasFormula = '\u7684\u516c\u5f0f\u662f {0}';
exports.ARIA_HasComment = '\u7684\u6ce8\u89e3\u662f {0}';
exports.ARIA_RowHeader = '\u884c\u5934';
exports.ARIA_ColumnHeader = '\u5217\u5934';
exports.SHEET_NAME = 'Sheet';
exports.lsru = ['907f',
    'e872'];
exports.lsde = ['8b8b56',
    'bea168'];

exports.ls1 = ['895b848457000000000000000000008868634e634f6267656330000000678b4f72674e966757000000304e6500000063674e966d8b7590300000008b60548b8b5390904e520000000000000000000000000000000000000000000030',
    '7f896104ce205370726561644a5320683ca7f6d09b802f2f01020d0a0a2cc430482cc5502c307b317d0234f67b317d8843c5504bd52814020d0a0ae6c5a8e2f7d101aef63073616c65732e7861406772617065636974792e636f6d02'];

exports.ls2 = ['895b848457000000000000000000008868634e634f62676563300000004e650000006367524f0000005930',
    '7f896104ce205370726561644a5320683ca7f6d09b802f2f01020d0a0a34f67b317d884369597b307d2902'];

exports.ls3 = ['67625263674f60300000008f88000000000000000000008868634eff6097899951535f546c63674f60300000004e6563674e968b4f759030000000595d8d4eff8b578d4e904e4e676263674f603000000059975e52ff8b5390904e520000000000000000000000000000000000000000000030',
    '2a7e308843e16f020d0a0ad04c205370726561644a5320683ca7f60ca800819648d69708d58843e16f020d0a0a34f68843c550c4302814020d0a0a82f22d700cf7282d70aef62de57e8843e16f020a0d0a82002ea90cf7d101aef63073616c65732e7861406772617065636974792e636f6d02'];

exports.ls4 = ['656563674f603000000059975e52ff8b5390904e520000000000000000000000000000000000000000000030',
    'e0488843e16f020d0a0a82002ea90cf7d101aef63073616c65732e7861406772617065636974792e636f6d02'];

exports.ls5 = ['895b848457000000000000000000008868634e634f62676563300000004e6500000063675d8f67ff8b5390904e520000000000000000000000000000000000000000000083535e5230',
    '7f896104ce205370726561644a5320683ca7f6d09b802f2f01020d0a0a34f67b317d8843f2c71f0cf7d101aef63073616c65732e7861406772617065636974792e636f6db7d62ea902'];
exports.ls6 = ['6772674e895b848457000000000000000000008868634e4e548b7572ff67535f5152536367300000005997835f6b5f6367ff8b817500000000000000000000000030',
    '2c482c3a7f896104ce205370726561644a5320683ca7f6a7c1d528480c2ad6978d06d18843020d0a0a8200b797630f88430cf7f4353430302d3635372d3630303802'];

exports.ls7 = ['67625263674f60300000008f88000000000000000000008868634eff6097899951535f546c63674f60300000004e6563674e968b4f759030000000595d8d4eff8b578d4e904e4e676263674f603000000059975e52ff8b5390904e520000000000000000000000000000000000000000000030',
    '2a7e308843e16f020d0a0ad04c205370726561644a5320683ca7f60ca800819648d69708d58843e16f020d0a0a34f68843c550c4302814020d0a0a82f22d700cf7282d70aef62de57e8843e16f020a0d0a82002ea90cf7d101aef63073616c65732e7861406772617065636974792e636f6d02'];

exports.ls8 = ['656563674f603000000059975e52ff8b5390904e520000000000000000000000000000000000000000000030',
    'e0488843e16f020d0a0a82002ea90cf7d101aef63073616c65732e7861406772617065636974792e636f6d02'];
exports.Exp_InsertCopiedCutCells = '\u786e\u4fdd\u590d\u5236\u548c\u7c98\u8d34\u533a\u57df\u4e0d\u91cd\u53e0.';
exports.Exp_InsertCopiedCutCellsOnSpanTable = '\u8fd9\u4e0d\u4f1a\u8d77\u4f5c\u7528\uff0c\u56e0\u4e3a\u5b83\u4f1a\u79fb\u52a8\u5de5\u4f5c\u8868\u4e0a\u8868\u683c\u4e2d\u7684\u5355\u5143\u683c\uff0c\u6216\u8005\u4f1a\u5bfc\u81f4\u67d0\u4e9b\u5408\u5e76\u7684\u5355\u5143\u683c\u53d6\u6d88\u5408\u5e76\u3002';
exports.Exp_InsertCopiedCutCellsNoRange = 'SpreadJS\u4e0d\u80fd\u63d2\u5165\u65b0\u7684\u5355\u5143\u683c\uff0c\u56e0\u4e3a\u5b83\u4f1a\u628a\u975e\u7a7a\u7684\u5355\u5143\u683c\u4ece\u5de5\u4f5c\u8868\u7684\u672b\u7aef\u63a8\u51fa\u53bb.';
exports.Exp_InvalidSortArrayFormulaInRange = '\u5f53\u524d\u533a\u57df\u65e0\u6cd5\u6392\u5e8f\uff0c\u56e0\u4e3a\u5b58\u5728\u6570\u7ec4\u516c\u5f0f\u3002';
exports.Exp_InvalidSortSpanInRange = '\u5f53\u524d\u533a\u57df\u65e0\u6cd5\u6392\u5e8f\uff0c\u56e0\u4e3a\u5b58\u5728\u5408\u5e76\u7684\u5355\u5143\u683c\u3002';
exports.Exp_InvalidSortPartTableOrMultiTableInRange = '\u5f53\u524d\u533a\u57df\u65e0\u6cd5\u6392\u5e8f\uff0c\u56e0\u4e3a\u5b58\u5728\u90e8\u5206\u8868\u683c\u6216\u8005\u5b58\u5728\u591a\u4e2a\u8868\u683c\u3002';
/***/ }),

/***/ './dist/plugins/autoMerge/autoMerge.res.zh.js':
/*!****************************************************!*\
  !*** ./dist/plugins/autoMerge/autoMerge.res.zh.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_RangeIsIntersected = '\u5f53\u524d\u533a\u57df\u4e0d\u80fd\u548c\u5df2\u5b58\u5728\u7684\u533a\u57df\u76f8\u4ea4\u3002';
/***/ }),

/***/ './dist/plugins/celltype/celltypes.res.zh.js':
/*!***************************************************!*\
  !*** ./dist/plugins/celltype/celltypes.res.zh.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.OK = '\u786e\u5b9a';
exports.Cancel = '\u53d6\u6d88';
exports.Calendar_ShortWeeks_1 = '\u5468\u4e00';
exports.Calendar_ShortWeeks_2 = '\u5468\u4e8c';
exports.Calendar_ShortWeeks_3 = '\u5468\u4e09';
exports.Calendar_ShortWeeks_4 = '\u5468\u56db';
exports.Calendar_ShortWeeks_5 = '\u5468\u4e94';
exports.Calendar_ShortWeeks_6 = '\u5468\u516d';
exports.Calendar_ShortWeeks_7 = '\u5468\u65e5';
exports.Calendar_Weeks_1 = '\u661f\u671f\u4e00';
exports.Calendar_Weeks_2 = '\u661f\u671f\u4e8c';
exports.Calendar_Weeks_3 = '\u661f\u671f\u4e09';
exports.Calendar_Weeks_4 = '\u661f\u671f\u56db';
exports.Calendar_Weeks_5 = '\u661f\u671f\u4e94';
exports.Calendar_Weeks_6 = '\u661f\u671f\u516d';
exports.Calendar_Weeks_7 = '\u661f\u671f\u65e5';
exports.Calendar_ShortMonths_1 = '\u4e00\u6708';
exports.Calendar_ShortMonths_2 = '\u4e8c\u6708';
exports.Calendar_ShortMonths_3 = '\u4e09\u6708';
exports.Calendar_ShortMonths_4 = '\u56db\u6708';
exports.Calendar_ShortMonths_5 = '\u4e94\u6708';
exports.Calendar_ShortMonths_6 = '\u516d\u6708';
exports.Calendar_ShortMonths_7 = '\u4e03\u6708';
exports.Calendar_ShortMonths_8 = '\u516b\u6708';
exports.Calendar_ShortMonths_9 = '\u4e5d\u6708';
exports.Calendar_ShortMonths_10 = '\u5341\u6708';
exports.Calendar_ShortMonths_11 = '\u5341\u4e00\u6708';
exports.Calendar_ShortMonths_12 = '\u5341\u4e8c\u6708';
exports.Calendar_Months_1 = '1\u6708';
exports.Calendar_Months_2 = '2\u6708';
exports.Calendar_Months_3 = '3\u6708';
exports.Calendar_Months_4 = '4\u6708';
exports.Calendar_Months_5 = '5\u6708';
exports.Calendar_Months_6 = '6\u6708';
exports.Calendar_Months_7 = '7\u6708';
exports.Calendar_Months_8 = '8\u6708';
exports.Calendar_Months_9 = '9\u6708';
exports.Calendar_Months_10 = '10\u6708';
exports.Calendar_Months_11 = '11\u6708';
exports.Calendar_Months_12 = '12\u6708';
exports.Calendar_Time_AM = '\u4e0a\u5348';
exports.Calendar_Time_PM = '\u4e0b\u5348';
exports.Calendar_EraName_1 = '\u660e\u6cbb';
exports.Calendar_EraName_2 = '\u5927\u6b63';
exports.Calendar_EraName_3 = '\u662d\u548c';
exports.Calendar_EraName_4 = '\u5e73\u6210';
exports.Calendar_FirstYear = '\u5143';
exports.Calendar_Today = '\u4eca\u5929';
exports.Calendar_LastMonth = '\u4e0a\u4e2a\u6708';
exports.Calendar_NextMonth = '\u4e0b\u4e2a\u6708';
exports.Calendar_LastYear = '\u4e0a\u4e00\u5e74';
exports.Calendar_NextYear = '\u4e0b\u4e00\u5e74';
exports.Calendar_LastTenYear = '\u4e0a\u5341\u5e74';
exports.Calendar_NextTenYear = '\u4e0b\u5341\u5e74';
exports.Quarter_Format_1 = '\u7b2c\u4e00\u5b63\u5ea6';
exports.Quarter_Format_2 = '\u7b2c\u4e8c\u5b63\u5ea6';
exports.Quarter_Format_3 = '\u7b2c\u4e09\u5b63\u5ea6';
exports.Quarter_Format_4 = '\u7b2c\u56db\u5b63\u5ea6';
exports.ThemeColor = '\u4e3b\u9898\u8272';
exports.StandardColor = '\u6807\u51c6\u8272';
exports.Calculator_DivideByZeroInfo = '\u65e0\u6cd5\u88ab0\u9664';
exports.Calculator_InvalidInputInfo = '\u65e0\u6548\u7684\u8f93\u5165';
exports.Calculator_SqrtParameterException = '\u51fd\u6570\u7684\u8f93\u5165\u65e0\u6548';
exports.Calculator_OverFlowInfo = '\u8fd0\u7b97\u7b26\u64cd\u4f5c\u5bfc\u81f4\u6ea2\u51fa';
exports.MultiColumn_InvalidDataSource = '\u65e0\u6548\u7684\u6570\u636e\u6e90\uff0c\u8be5\u516c\u5f0f\u5e94\u8fd4\u56de\u4e00\u4e2a\u6570\u7ec4\u3002';
/***/ }),

/***/ './dist/plugins/chart/chart.res.zh.js':
/*!********************************************!*\
  !*** ./dist/plugins/chart/chart.res.zh.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.period = '\u5468\u671f';
exports.movingAverage = '\u79fb\u52a8\u5e73\u5747';
exports.exponential = '\u6307\u6570';
exports.linear = '\u7ebf\u6027';
exports.logarithmic = '\u5bf9\u6570';
exports.polynomial = '\u591a\u9879\u5f0f';
exports.power = '\u4e58\u5e42';
/***/ }),

/***/ './dist/plugins/conditional/conditional.res.zh.js':
/*!********************************************************!*\
  !*** ./dist/plugins/conditional/conditional.res.zh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_RuleIsNull = '\u53c2\u6570 \'rule\' \u662f\u7a7a';
exports.Exp_NotSupported = '\u4e0d\u652f\u6301\u5f02\u5e38';
/***/ }),

/***/ './dist/plugins/contextMenu/context-menu.res.zh.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/contextMenu/context-menu.res.zh.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.copy = '\u590d\u5236';
exports.cut = '\u526a\u5207';
exports.pasteOptions = '\u7c98\u8d34\u9009\u9879:';
exports.pasteAll = '\u5168\u90e8\u7c98\u8d34';
exports.pasteFormula = '\u516c\u5f0f';
exports.pasteValues = '\u503c';
exports.pasteFormatting = '\u683c\u5f0f';
exports.clearContents = '\u6e05\u9664';
exports.pasteValuesFormatting = '\u503c&\u683c\u5f0f';
exports.pasteFormulaFormatting = '\u516c\u5f0f&\u683c\u5f0f';
exports.insertRows = '\u63d2\u5165';
exports.insertColumns = '\u63d2\u5165';
exports.deleteRows = '\u5220\u9664';
exports.deleteColumns = '\u5220\u9664';
exports.insertSheet = '\u63d2\u5165';
exports.deleteSheet = '\u5220\u9664';
exports.insertComment = '\u63d2\u5165\u6279\u6ce8';
exports.filter = '\u8fc7\u6ee4';
exports.sort = '\u6392\u5e8f';
exports.insertCopiedCells = '\u63d2\u5165\u590d\u5236\u7684\u5355\u5143\u683c...';
exports.insertCutCells = '\u63d2\u5165\u526a\u8d34\u7684\u5355\u5143\u683c...';
exports.shiftCellsRight = '\u6d3b\u52a8\u5355\u5143\u683c\u53f3\u79fb';
exports.shiftCellsDown = '\u6d3b\u52a8\u5355\u5143\u683c\u4e0b\u79fb';
exports.headerInsertCopiedCells = '\u63d2\u5165\u590d\u5236\u7684\u5355\u5143\u683c';
exports.headerInsertCutCells = '\u63d2\u5165\u526a\u8d34\u7684\u5355\u5143\u683c';
exports.sortAscend = '\u4eceA\u5230Z';
exports.sortDescend = '\u4eceZ\u5230A';
exports.slicerSortAscend = '\u4eceA\u5230Z';
exports.slicerSortDescend = '\u4eceZ\u5230A';
exports.hideRows = '\u9690\u85cf';
exports.hideColumns = '\u9690\u85cf';
exports.hideSheet = '\u9690\u85cf';
exports.unhideSheet = '\u663e\u793a';
exports.unhideColumns = '\u663e\u793a';
exports.unhideRows = '\u663e\u793a';
exports.editComment = '\u7f16\u8f91\u6279\u6ce8';
exports.deleteComment = '\u5220\u9664\u6279\u6ce8';
exports.toggleComment = '\u663e\u793a/\u9690\u85cf \u6279\u6ce8';
exports.removeSlicer = '\u79fb\u9664';
exports.removeFloatingObject = '\u79fb\u9664';
exports.tableInsert = '\u63d2\u5165';
exports.tableInsertRowsAbove = '\u5728\u4e0a\u65b9\u63d2\u5165\u8868\u884c(A)';
exports.tableInsertRowsBelow = '\u5728\u4e0b\u65b9\u63d2\u5165\u8868\u884c(B)';
exports.tableInsertColumnsLeft = '\u5728\u5de6\u4fa7\u63d2\u5165\u8868\u5217(L)';
exports.tableInsertColumnsRight = '\u5728\u53f3\u4fa7\u63d2\u5165\u8868\u5217(R)';
exports.tableDelete = '\u5220\u9664';
exports.tableDeleteRows = '\u8868\u884c(R)';
exports.tableDeleteColumns = '\u8868\u5217(C)';
exports.hideSheetFailureInfo = '\u5de5\u4f5c\u7c3f\u5185\u81f3\u5c11\u542b\u6709\u4e00\u5f20\u53ef\u89c6\u5de5\u4f5c\u8868\u3002\n\u5982\u8981\u9690\u85cf\u3001\u5220\u9664\u6216\u79fb\u52a8\u9009\u5b9a\u7684\u5de5\u4f5c\u8868\uff0c\u5fc5\u987b\u5148\u63d2\u5165\u4e00\u5f20\u65b0\u5de5\u4f5c\u8868\u6216\u91cd\u65b0\u663e\u793a\u4e00\u5f20\u5df2\u88ab\u9690\u85cf\u7684\u5de5\u4f5c\u8868\u3002';
exports.pivotTableRefresh = '\u5237\u65b0';
exports.pivotTableMove = '\u79fb\u52a8';
exports.pivotTableRemove_ = '\u5220\u9664 {0}';
exports.pivotTableRemoveGrandTotal = '\u5220\u9664\u603b\u8ba1';
exports.pivotTableValueFieldSettings = '\u503c\u5b57\u6bb5\u8bbe\u7f6e...';
exports.pivotTableOptions = '\u6570\u636e\u900f\u89c6\u8868\u9009\u9879...';
exports.pivotTableNumberFormat = '\u6570\u5b57\u683c\u5f0f...';
exports.pivotTableSort = '\u6392\u5e8f ';
exports.pivotTableSummarizeValuesBy = '\u503c\u6c47\u603b\u4f9d\u636e';
exports.pivotTableSum = '\u6c42\u548c';
exports.pivotTableCount = '\u8ba1\u6570';
exports.pivotTableAverage = '\u5e73\u5747\u503c';
exports.pivotTableMax = '\u6700\u5927\u503c';
exports.pivotTableMin = '\u6700\u5c0f\u503c';
exports.pivotTableProduct = '\u4e58\u79ef';
exports.pivotTableDistinctCount = '\u975e\u91cd\u590d\u8ba1\u6570';
exports.pivotTableMoreOptions = '\u5176\u4ed6\u9009\u9879';
exports.pivotTableShowValueAs = '\u503c\u663e\u793a\u65b9\u5f0f';
exports.pivotTableNoCalculation = '\u65e0\u8ba1\u7b97';
exports.pivotTableGrandTotal = '\u603b\u8ba1\u7684\u767e\u5206\u6bd4';
exports.pivotTableColumnTotal = '\u5217\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.pivotTableRowTotal = '\u884c\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.pivotTableOf = '\u767e\u5206\u6bd4...';
exports.pivotTableParentRowTotal = '\u7236\u884c\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.pivotTableParentColumnTotal = '\u7236\u5217\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.pivotTableOfParentTotal = '\u7236\u7ea7\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.pivotTableDifferenceFrom = '\u5dee\u5f02...';
exports.pivotTablePercentDifferenceFrom = '\u5dee\u5f02\u767e\u5206\u6bd4...';
exports.pivotTableRunningTotalIN = '\u6309\u67d0\u4e00\u5b57\u6bb5\u6c47\u603b...';
exports.pivotTablePercentRunningTotalIn = '\u6309\u67d0\u4e00\u5b57\u6bb5\u6c47\u603b\u7684\u767e\u5206\u6bd4...';
exports.pivotTableRankSmallestToLargest = '\u5347\u5e8f\u6392\u5217...';
exports.pivotTableRankLargestToSmallest = '\u964d\u5e8f\u6392\u5217...';
exports.pivotTableIndex = '\u6307\u6570';
exports.pivotTableShowDetails = '\u663e\u793a\u8be6\u7ec6\u4fe1\u606f';
exports.pivotTableGroup = '\u7ec4\u5408...';
exports.pivotTableUnGroup = '\u53d6\u6d88\u7ec4\u5408...';
exports.pivotTableExpandOrCollapse = '\u5c55\u5f00/\u6298\u53e0';
exports.pivotTableFilter = '\u7b5b\u9009';
exports.pivotTableSubtotal_ = '\u5206\u7c7b\u6c47\u603b {0}';
exports.pivotTableHideFieldList = '\u9690\u85cf\u5b57\u6bb5\u5217\u8868';
exports.pivotTableFieldSettings = '\u5b57\u6bb5\u8bbe\u7f6e...';
exports.pivotTableClearFilterFrom_ = '\u4ece {0} \u4e2d\u6e05\u9664\u7b5b\u9009';
exports.pivotTableKeepOnlySelectedItems = '\u4ec5\u4fdd\u7559\u6240\u9009\u9879\u76ee';
exports.pivotTableHideSelectedItems = '\u9690\u85cf\u6240\u9009\u9879\u76ee';
exports.pivotTableTop10 = '\u524d10\u4e2a...';
exports.pivotTableLabelFilters = '\u6807\u7b7e\u7b5b\u9009...';
exports.pivotTableLabelFilters_Date = '\u65e5\u671f\u7b5b\u9009...';
exports.pivotTableValueFilters = '\u503c\u7b5b\u9009...';
exports.pivotTableExpand = '\u5c55\u5f00';
exports.pivotTableCollapse = '\u6298\u53e0';
exports.pivotTableExpandEntireField = '\u5c55\u5f00\u6574\u4e2a\u5b57\u6bb5';
exports.pivotTableCollapseEntireField = '\u6298\u53e0\u6574\u4e2a\u5b57\u6bb5';
exports.pivotTableCollapseTo_ = '\u6298\u53e0\u81f3{0}';
exports.pivotTableExpandTo_ = '\u5c55\u5f00\u81f3{0}';
exports.pivotTableMove_ToBeginning = '\u79fb\u52a8{0}\u81f3\u5f00\u5934';
exports.pivotTableMove_Up = '\u5c06{0}\u4e0a\u79fb';
exports.pivotTableMove_Down = '\u5c06{0}\u4e0b\u79fb';
exports.pivotTableMove_ToEnd = '\u5c06{0}\u79fb\u81f3\u672b\u5c3e';
exports.pivotTableMove_ToLeft = '\u5c06{0}\u5de6\u79fb';
exports.pivotTableMove_ToRight = '\u5c06{0}\u53f3\u79fb';
exports.pivotTableMove_ToColumns = '\u5c06{0}\u79fb\u81f3\u5c3e\u5217';
exports.sigmaValue = '\u2211 \u6570\u503c';
exports.sigmaValueTemp = '\u6570\u503c';
exports.pivotTableSortAscend = '\u5347\u5e8f';
exports.pivotTableSortDescend = '\u964d\u5e8f';
exports.pinRows = '\u7f6e\u9876/\u53d6\u6d88\u7f6e\u9876 \u884c';
exports.pinColumns = '\u7f6e\u9876/\u53d6\u6d88\u7f6e\u9876 \u5217';
exports.paste = '\u7c98\u8d34';
/***/ }),

/***/ './dist/plugins/data/data.res.zh.js':
/*!******************************************!*\
  !*** ./dist/plugins/data/data.res.zh.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_NotSupportedDataSource = '\u6570\u636e\u6e90\u4e0d\u652f\u6301\uff01';
/***/ }),

/***/ './dist/plugins/exportPDF/printPdf.res.zh.js':
/*!***************************************************!*\
  !*** ./dist/plugins/exportPDF/printPdf.res.zh.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_FileIOError = '\u6587\u4ef6\u8bfb\u5199\u5f02\u5e38\u3002';
exports.Exp_FontError = '\u975e\u652f\u6301\u5b57\u4f53\u683c\u5f0f\u6216\u975e\u6807\u51c6PDF\u5b57\u4f53\u3002';
/***/ }),

/***/ './dist/plugins/fill/fill.res.zh.js':
/*!******************************************!*\
  !*** ./dist/plugins/fill/fill.res.zh.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.CopyCells = '\u590d\u5236\u5355\u5143\u683c';
exports.FillSeries = '\u4ee5\u5e8f\u5217\u65b9\u5f0f\u586b\u5145';
exports.FillFormattingOnly = '\u4ec5\u586b\u5145\u683c\u5f0f';
exports.FillWithoutFormatting = '\u4e0d\u5e26\u683c\u5f0f\u586b\u5145';
exports.Exp_NumberOnly = '\u4ec5\u5bf9\u6570\u5b57\u6709\u6548';
exports.Exp_RangeContainsMergedCell = '\u533a\u57df\u5185\u4e0d\u5e94\u5305\u542b\u5408\u5e76\u5355\u5143\u683c\u3002';
exports.Exp_TargetContainsMergedCells = '\u76ee\u6807\u533a\u57df\u4e0d\u5e94\u5305\u542b\u5408\u5e76\u5355\u5143\u683c\u3002';
exports.Exp_MergedCellsIdentical = '\u6b64\u884c\u4e3a\u9700\u8981\u5408\u5e76\u5355\u5143\u683c\u7684\u5927\u5c0f\u4e00\u81f4\u3002';
exports.Exp_FillRangeContainsMergedCell = '\u65e0\u6cd5\u586b\u5145\u4e00\u7247\u5305\u542b\u5408\u5e76\u5355\u5143\u683c\u7684\u533a\u57df\u3002';
exports.Exp_FillCellsReadOnly = '\u60a8\u5c1d\u8bd5\u586b\u5145\u7684\u5355\u5143\u683c\u662f\u88ab\u4fdd\u62a4\u7684\uff0c\u56e0\u6b64\u5b83\u662f\u53ea\u8bfb\u7684\u3002';
exports.Exp_ChangeMergedCell = '\u65e0\u6cd5\u4ec5\u6539\u53d8\u5408\u5e76\u5355\u5143\u683c\u7684\u4e00\u90e8\u5206';
exports.Exp_ColumnReadOnly = '\u60a8\u5c1d\u8bd5\u4fee\u6539\u7684\u5217\u662f\u88ab\u4fdd\u62a4\u7684\uff0c\u56e0\u6b64\u5b83\u662f\u53ea\u8bfb\u7684\u3002';
exports.Exp_RowReadOnly = '\u60a8\u5c1d\u8bd5\u4fee\u6539\u7684\u884c\u662f\u88ab\u4fdd\u62a4\u7684\uff0c\u56e0\u6b64\u5b83\u662f\u53ea\u8bfb\u7684\u3002';
exports.Exp_CellReadOnly = '\u60a8\u5c1d\u8bd5\u4fee\u6539\u7684\u5355\u5143\u683c\u662f\u88ab\u4fdd\u62a4\u7684\uff0c\u56e0\u6b64\u5b83\u662f\u53ea\u8bfb\u7684\u3002';
exports.Exp_RangeIsNull = '\u533a\u95f4\u4e3a\u7a7a';
exports.Exp_ChangePartOfArray = '\u65e0\u6cd5\u4ec5\u6539\u53d8\u90e8\u5206\u7684\u6570\u7ec4\u3002';
/***/ }),

/***/ './dist/plugins/filter/filter.res.zh.js':
/*!**********************************************!*\
  !*** ./dist/plugins/filter/filter.res.zh.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_InvalidColumnIndex = '\u65e0\u6548\u5217\u7d22\u5f15\u3002';
exports.SortAscending = '\u5347\u5e8f';
exports.SortDescending = '\u964d\u5e8f';
exports.OK = '\u786e\u5b9a';
exports.Cancel = '\u53d6\u6d88';
exports.Search = '\u641c\u7d22';
exports.CheckAll = '\u5168\u9009';
exports.UncheckAll = '\u53d6\u6d88\u5168\u9009';
exports.Blanks = '(\u7a7a)';
exports.Exp_FilterItemIsNull = '\u7b5b\u9009\u9879\u4e3a\u7a7a\u3002';
exports.Show = '\u663e\u793a';
exports.ShowRows = '\u663e\u793a\u884c:';
exports.And = '\u4e0e';
exports.Or = '\u6216';
exports.SortColor = '\u6309\u989c\u8272\u6392\u5e8f';
exports.FilterColor = '\u6309\u989c\u8272\u7b5b\u9009';
exports.FilterCellTitle = '\u6309\u5355\u5143\u683c\u989c\u8272\u7b5b\u9009';
exports.FilterFontTitle = '\u6309\u5b57\u4f53\u989c\u8272\u7b5b\u9009';
exports.SortCellTitle = '\u6309\u5355\u5143\u683c\u989c\u8272\u6392\u5e8f';
exports.SortFontTitle = '\u6309\u5b57\u4f53\u989c\u8272\u6392\u5e8f';
exports.FontColor = '\u5176\u4ed6\u5b57\u4f53\u989c\u8272...';
exports.CellColor = '\u5176\u4ed6\u5355\u5143\u683c\u989c\u8272...';
exports.NoFill = '\u65e0\u586b\u5145';
exports.Automatic = '\u81ea\u52a8';
exports.Clear = '\u4ece{0}\u4e2d\u6e05\u9664\u7b5b\u9009';
exports.TextFilter = '\u6587\u672c\u7b5b\u9009';
exports.DateFilter = '\u65e5\u671f\u7b5b\u9009';
exports.NumberFilter = '\u6570\u5b57\u7b5b\u9009';
exports.Custom = '\u81ea\u5b9a\u4e49\u7b5b\u9009...';
exports.Equal = '\u7b49\u4e8e...';
exports.NotEqual = '\u4e0d\u7b49\u4e8e...';
exports.GreaterThan = '\u5927\u4e8e...';
exports.GreaterOrEquals = '\u5927\u4e8e\u6216\u7b49\u4e8e...';
exports.LessThan = '\u5c0f\u4e8e...';
exports.LessThanOrEquals = '\u5c0f\u4e8e\u6216\u7b49\u4e8e...';
exports.Between = '\u4ecb\u4e8e...';
exports.Top10 = '\u524d10\u9879...';
exports.AboveAverage = '\u9ad8\u4e8e\u5e73\u5747\u503c';
exports.BelowAverage = '\u4f4e\u4e8e\u5e73\u5747\u503c';
exports.Begin = '\u5f00\u5934\u662f...';
exports.End = '\u7ed3\u5c3e\u662f...';
exports.Contain = '\u5305\u542b...';
exports.NotContain = '\u4e0d\u5305\u542b...';
exports.Before = '\u4e4b\u524d...';
exports.After = '\u4e4b\u540e...';
exports.Tomorrow = '\u660e\u5929';
exports.Today = '\u4eca\u5929';
exports.Yesterday = '\u6628\u5929';
exports.NextWeek = '\u4e0b\u5468';
exports.ThisWeek = '\u672c\u5468';
exports.LastWeek = '\u4e0a\u5468';
exports.NextMonth = '\u4e0b\u6708';
exports.ThisMonth = '\u672c\u6708';
exports.LastMonth = '\u4e0a\u6708';
exports.NextQuarter = '\u4e0b\u5b63\u5ea6';
exports.ThisQuarter = '\u672c\u5b63\u5ea6';
exports.LastQuarter = '\u4e0a\u5b63\u5ea6';
exports.NextYear = '\u660e\u5e74';
exports.ThisYear = '\u4eca\u5e74';
exports.LastYear = '\u53bb\u5e74';
exports.YearToDate = '\u672c\u5e74\u5ea6\u622a\u6b62\u5230\u73b0\u5728';
exports.AllDates = '\u671f\u95f4\u6240\u6709\u65e5\u671f';
exports.Top10Filter = '\u81ea\u52a8\u7b5b\u9009\u524d10\u4e2a';
exports.CustomTitle = '\u81ea\u5b9a\u4e49\u81ea\u52a8\u7b5b\u9009\u65b9\u5f0f';
exports.ColorTitle = '\u53ef\u7528\u5355\u5143\u683c\u989c\u8272';
exports.top = '\u6700\u5927';
exports.bottom = '\u6700\u5c0f';
exports.SortCell = '\u8bf7\u9009\u62e9\u4f5c\u4e3a\u6392\u5e8f\u4f9d\u636e\u7684\u5355\u5143\u683c\u989c\u8272:';
exports.SortFont = '\u9009\u62e9\u7528\u4f5c\u6392\u5e8f\u4f9d\u636e\u7684\u5b57\u4f53\u989c\u8272:';
exports.FilterCell = '\u8bf7\u9009\u62e9\u4f5c\u4e3a\u7b5b\u9009\u4f9d\u636e\u7684\u5355\u5143\u683c\u989c\u8272:';
exports.FilterFont = '\u8bf7\u9009\u62e9\u4f5c\u4e3a\u7b5b\u9009\u4f9d\u636e\u7684\u5b57\u4f53\u989c\u8272:';
exports.Selected = '\u5df2\u9009\u5b9a:';
exports.IsEquals = '\u7b49\u4e8e';
exports.NotEquals = '\u4e0d\u7b49\u4e8e';
exports.IsGreaterThan = '\u5927\u4e8e';
exports.IsGreaterOrEqual = '\u5927\u4e8e\u6216\u7b49\u4e8e';
exports.IsLess = '\u5c0f\u4e8e';
exports.LessOrEqual = '\u5c0f\u4e8e\u6216\u7b49\u4e8e';
exports.IsBeginWith = '\u5f00\u5934\u662f';
exports.NotBeginWith = '\u5f00\u5934\u4e0d\u662f';
exports.IsEndWith = '\u7ed3\u5c3e\u662f';
exports.NotEndWith = '\u7ed3\u5c3e\u4e0d\u662f';
exports.IsContain = '\u5305\u542b';
exports.NotContains = '\u4e0d\u5305\u542b';
exports.IsAfter = '\u5728\u4ee5\u4e0b\u65e5\u671f\u4e4b\u540e';
exports.AfterOrEqual = '\u5728\u4ee5\u4e0b\u65e5\u671f\u4e4b\u540e\u6216\u4e0e\u4e4b\u76f8\u540c';
exports.IsBefore = '\u5728\u4ee5\u4e0b\u65e5\u671f\u4e4b\u524d';
exports.BeforeOrEqual = '\u5728\u4ee5\u4e0b\u65e5\u671f\u4e4b\u524d\u6216\u4e0e\u4e4b\u76f8\u540c';
exports.Q1 = '\u7b2c 1 \u5b63\u5ea6';
exports.Q2 = '\u7b2c 2 \u5b63\u5ea6';
exports.Q3 = '\u7b2c 3 \u5b63\u5ea6';
exports.Q4 = '\u7b2c 4 \u5b63\u5ea6';
exports.Jan = '\u4e00\u6708';
exports.Feb = '\u4e8c\u6708';
exports.Mar = '\u4e09\u6708';
exports.Apr = '\u56db\u6708';
exports.May = '\u4e94\u6708';
exports.Jun = '\u516d\u6708';
exports.Jul = '\u4e03\u6708';
exports.Aug = '\u516b\u6708';
exports.Sep = '\u4e5d\u6708';
exports.Oct = '\u5341\u6708';
exports.Nov = '\u5341\u4e00\u6708';
exports.Dec = '\u5341\u4e8c\u6708';
exports.Explain1 = '\u53ef\u7528 ? \u4ee3\u8868\u5355\u4e2a\u5b57\u7b26';
exports.Explain2 = '\u7528 * \u4ee3\u8868\u4efb\u610f\u591a\u4e2a\u5b57\u7b26';
exports.Year = '';
exports.Day = '';
exports.add_current_filter = '\u5c06\u5f53\u524d\u9009\u62e9\u6dfb\u52a0\u5230\u7b5b\u9009\u5668';
exports.invalidCondition = '\u5206\u5217\u7ebf\u9519\u8bef';
/***/ }),

/***/ './dist/plugins/floatingObject/floatingobject.res.zh.js':
/*!**************************************************************!*\
  !*** ./dist/plugins/floatingObject/floatingobject.res.zh.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_FloatingObjectHasSameNameError = '\u5f53\u524d\u8868\u5355\u5df2\u7ecf\u5305\u542b\u4e00\u4e2a\u5177\u6709\u76f8\u540c\u540d\u79f0\u7684\u6d6e\u52a8\u5bf9\u8c61\u3002';
exports.Exp_FloatingObjectNameEmptyError = '\u6d6e\u52a8\u5bf9\u8c61\u5fc5\u987b\u5177\u6709\u540d\u79f0\u3002';
/***/ }),

/***/ './dist/plugins/group/group.res.zh.js':
/*!********************************************!*\
  !*** ./dist/plugins/group/group.res.zh.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_InvalidIndex = '\u65e0\u6548\u7d22\u5f15';
exports.Exp_InvalidCount = '\u65e0\u6548\u6570\u91cf';
exports.Exp_InvalidLevel = '\u65e0\u6548\u5c42\u7ea7';
exports.Exp_GroupInfoIsNull = 'groupInfo\u4e3a\u7a7a';
exports.Exp_GROUP_PROTECTED = '\u4e0d\u80fd\u5bf9\u53d7\u4fdd\u62a4\u7684\u5de5\u4f5c\u8868\u4f7f\u7528\u8be5\u547d\u4ee4\u3002\u82e5\u4f7f\u7528\u8be5\u547d\u4ee4\uff0c\u5fc5\u987b\u5148\u64a4\u9500\u5de5\u4f5c\u8868\u4fdd\u62a4\u3002';
/***/ }),

/***/ './dist/plugins/outlineColumn/outlineColumn.res.zh.js':
/*!************************************************************!*\
  !*** ./dist/plugins/outlineColumn/outlineColumn.res.zh.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_GROUP_PROTECTED = '\u4e0d\u80fd\u5bf9\u53d7\u4fdd\u62a4\u7684\u5de5\u4f5c\u8868\u4f7f\u7528\u8be5\u547d\u4ee4\u3002\u82e5\u4f7f\u7528\u8be5\u547d\u4ee4\uff0c\u5fc5\u987b\u5148\u64a4\u9500\u5de5\u4f5c\u8868\u4fdd\u62a4\u3002';
/***/ }),

/***/ './dist/plugins/pivot/pivot.res.zh.js':
/*!********************************************!*\
  !*** ./dist/plugins/pivot/pivot.res.zh.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.RepeatName = '\u91cd\u590d\u540d\u79f0';
exports.NotExist = '\u4e0d\u5b58\u5728';
exports.SubtotalType_Prefix_0 = '\u5e73\u5747\u503c\u9879\uff1a';
exports.SubtotalType_Prefix_1 = '\u8ba1\u6570\u9879\uff1a';
exports.SubtotalType_Prefix_2 = '\u6570\u503c\u8ba1\u6570\u9879\uff1a';
exports.SubtotalType_Prefix_3 = '\u6700\u5927\u503c\u9879\uff1a';
exports.SubtotalType_Prefix_4 = '\u6700\u5c0f\u503c\u9879\uff1a';
exports.SubtotalType_Prefix_5 = '\u4e58\u79ef\u9879\uff1a';
exports.SubtotalType_Prefix_6 = '\u6807\u51c6\u504f\u5dee\u9879\uff1a';
exports.SubtotalType_Prefix_7 = '\u603b\u4f53\u6807\u51c6\u504f\u5dee\u9879\uff1a';
exports.SubtotalType_Prefix_8 = '\u6c42\u548c\u9879\uff1a';
exports.SubtotalType_Prefix_9 = '\u65b9\u5dee\u9879\uff1a';
exports.SubtotalType_Prefix_10 = '\u603b\u4f53\u65b9\u5dee\u9879\uff1a';
exports.ColumnLabels = '\u5217\u6807\u7b7e';
exports.Total = ' \u6c47\u603b';
exports.All = '(\u5168\u90e8)';
exports.MultipleItems = '\uff08\u591a\u9879\uff09';
exports.RowLabels = '\u884c\u6807\u7b7e';
exports.GrandTotal = '\u603b\u8ba1';
exports.Values = '\u503c';
exports.PivotPanel_Title = '\u6570\u636e\u900f\u89c6\u8868\u5b57\u6bb5';
exports.PivotPanel_ReportText = '\u9009\u62e9\u8981\u6dfb\u52a0\u5230\u62a5\u8868\u7684\u5b57\u6bb5';
exports.PivotPanel_SearchPlaceholder = '\u641c\u7d22';
exports.PivotPanel_FieldAreaText = '\u5728\u4ee5\u4e0b\u533a\u95f4\u62d6\u52a8\u5b57\u6bb5:';
exports.PivotPanel_FiltersItemsTitle = '\u7b5b\u9009';
exports.PivotPanel_RowsItemsTitle = '\u884c';
exports.PivotPanel_ColumnsItemsTitle = '\u5217';
exports.PivotPanel_ValuesItemsTitle = '\u503c';
exports.PivotPanel_DeferUpdateText = '\u5ef6\u8fdf\u5e03\u5c40\u66f4\u65b0';
exports.EmptyPivotTable_PromptMessage1 = '\u5728\u533a\u57df\u5185\u5355\u51fb\u53ef\u4ee5\u4f7f\u7528\u6570\u636e\u900f\u89c6\u8868';
exports.EmptyPivotTable_PromptMessage2 = '\u82e5\u8981\u751f\u6210\u62a5\u8868\uff0c\u8bf7\u4ece\u6570\u636e\u900f\u89c6\u8868\u5b57\u6bb5\u5217\u8868\u4e2d\u9009\u62e9\u5b57\u6bb5';
exports.PivotPanel_Update = '\u66f4\u65b0';
exports.PivotPanel_DropDownList_Up = '\u4e0a\u79fb';
exports.PivotPanel_DropDownList_Down = '\u4e0b\u79fb';
exports.PivotPanel_DropDownList_Beginning = '\u79fb\u52a8\u81f3\u5f00\u5934';
exports.PivotPanel_DropDownList_End = '\u79fb\u52a8\u81f3\u672b\u5c3e';
exports.PivotPanel_DropDownList_ReportFilter = '\u79fb\u52a8\u5230\u62a5\u8868\u7b5b\u9009';
exports.PivotPanel_DropDownList_Row = '\u79fb\u52a8\u5230\u884c\u6807\u7b7e';
exports.PivotPanel_DropDownList_Col = '\u79fb\u52a8\u5230\u5217\u6807\u7b7e';
exports.PivotPanel_DropDownList_Values = '\u79fb\u52a8\u5230\u6570\u503c';
exports.PivotPanel_DropDownList_Remove = '\u5220\u9664\u5b57\u6bb5';
exports.PivotPanel_DropDownList_Set = '\u5b57\u6bb5\u8bbe\u7f6e...';
exports.PivotPanel_DropDownList_ValueSet = '\u503c\u5b57\u6bb5\u8bbe\u7f6e...';
exports.PivotPanel_Fields_MoveTo_ReportField = '\u6dfb\u52a0\u5230\u62a5\u8868\u7b5b\u9009';
exports.PivotPanel_Fields_MoveTo_RowLabel = '\u6dfb\u52a0\u5230\u884c\u6807\u7b7e';
exports.PivotPanel_Fields_MoveTo_ColLabel = '\u6dfb\u52a0\u5230\u5217\u6807\u7b7e';
exports.PivotPanel_Fields_MoveTo_Value = '\u6dfb\u52a0\u5230\u6570\u503c';
exports.PivotPanel_LabelOrValue_ClearFilter = '\u6e05\u9664\u7b5b\u9009';
exports.PivotPanel_ValueFilterOrLabel_Equals = '\u7b49\u4e8e...';
exports.PivotPanel_ValueFilterOrLabel_NotEqual = '\u4e0d\u7b49\u4e8e...';
exports.PivotPanel_ValueFilterOrLabel_GreaterThan = '\u5927\u4e8e...';
exports.PivotPanel_ValueFilterOrLabel_GreaterOrTo = '\u5927\u4e8e\u6216\u7b49\u4e8e...';
exports.PivotPanel_ValueFilterOrLabel_LessThan = '\u5c0f\u4e8e...';
exports.PivotPanel_ValueFilterOrLabel_LessOrTo = '\u5c0f\u4e8e\u6216\u7b49\u4e8e...';
exports.PivotPanel_ValueFilterOrLabel_Between = '\u4ecb\u4e8e...';
exports.PivotPanel_ValueFilterOrLabel_NotBetween = '\u4e0d\u4ecb\u4e8e...';
exports.PivotPanel_ValueFilter_Top10 = '\u524d10\u9879...';
exports.PivotPanel_ValueFilterOrLabel_IsBeginWith = '\u5f00\u5934\u662f...';
exports.PivotPanel_ValueFilterOrLabel_NotBegin = '\u5f00\u5934\u4e0d\u662f...';
exports.PivotPanel_ValueFilterOrLabel_End = '\u7ed3\u5c3e\u662f...';
exports.PivotPanel_ValueFilterOrLabel_NotEndWith = '\u7ed3\u5c3e\u4e0d\u662f...';
exports.PivotPanel_ValueFilterOrLabel_Contain = '\u5305\u542b...';
exports.PivotPanel_ValueFilterOrLabel_NotContain = '\u4e0d\u5305\u542b...';
exports.ValueFilterOrLabel_Equals = '\u7b49\u4e8e';
exports.ValueFilterOrLabel_NotEqual = '\u4e0d\u7b49\u4e8e';
exports.ValueFilterOrLabel_GreaterThan = '\u5927\u4e8e';
exports.ValueFilterOrLabel_GreaterOrTo = '\u5927\u4e8e\u6216\u7b49\u4e8e';
exports.ValueFilterOrLabel_LessThan = '\u5c0f\u4e8e';
exports.ValueFilterOrLabel_LessOrTo = '\u5c0f\u4e8e\u6216\u7b49\u4e8e';
exports.ValueFilterOrLabel_Between = '\u4ecb\u4e8e';
exports.ValueFilterOrLabel_NotBetween = '\u4e0d\u4ecb\u4e8e';
exports.ValueFilterOrLabelSelect_GreaterThan = '\u5927\u4e8e';
exports.ValueFilterOrLabelSelect_GreaterOrTo = '\u5927\u4e8e\u6216\u7b49\u4e8e';
exports.ValueFilterOrLabelSelect_LessThan = '\u5c0f\u4e8e';
exports.ValueFilterOrLabelSelect_LessOrTo = '\u5c0f\u4e8e\u6216\u7b49\u4e8e';
exports.ValueFilterOrLabelSelect_Between = '\u4ecb\u4e8e';
exports.ValueFilterOrLabelSelect_NotBetween = '\u4e0d\u4ecb\u4e8e';
exports.ValueFilterOrLabel_IsBeginWith = '\u5f00\u5934\u662f';
exports.ValueFilterOrLabel_NotBegin = '\u5f00\u5934\u4e0d\u662f';
exports.ValueFilterOrLabel_End = '\u7ed3\u5c3e\u662f';
exports.ValueFilterOrLabel_NotEndWith = '\u7ed3\u5c3e\u4e0d\u662f';
exports.ValueFilterOrLabel_Contain = '\u5305\u542b';
exports.ValueFilterOrLabel_NotContain = '\u4e0d\u5305\u542b';
exports.PivotPanel_ValueFilterOrLabel_Before = '\u4e4b\u524d...';
exports.PivotPanel_ValueFilterOrLabel_After = '\u4e4b\u540e...';
exports.PivotPanel_ValueFilterOrLabel_Tomorrow = '\u660e\u5929';
exports.PivotPanel_ValueFilterOrLabel_Today = '\u4eca\u5929';
exports.PivotPanel_ValueFilterOrLabel_Yesterday = '\u6628\u5929';
exports.PivotPanel_ValueFilterOrLabel_NextWeek = '\u4e0b\u5468';
exports.PivotPanel_ValueFilterOrLabel_ThisWeek = '\u672c\u5468';
exports.PivotPanel_ValueFilterOrLabel_LastWeek = '\u4e0a\u5468';
exports.PivotPanel_ValueFilterOrLabel_NextMonth = '\u4e0b\u6708';
exports.PivotPanel_ValueFilterOrLabel_ThisMonth = '\u672c\u6708';
exports.PivotPanel_ValueFilterOrLabel_LastMonth = '\u4e0a\u6708';
exports.PivotPanel_ValueFilterOrLabel_NextQuarter = '\u4e0b\u5b63\u5ea6';
exports.PivotPanel_ValueFilterOrLabel_ThisQuarter = '\u672c\u5b63\u5ea6';
exports.PivotPanel_ValueFilterOrLabel_LastQuarter = '\u4e0a\u5b63\u5ea6';
exports.PivotPanel_ValueFilterOrLabel_NextYear = '\u660e\u5e74';
exports.PivotPanel_ValueFilterOrLabel_ThisYear = '\u4eca\u5e74';
exports.PivotPanel_ValueFilterOrLabel_LastYear = '\u53bb\u5e74';
exports.PivotPanel_ValueFilterOrLabel_YearToDate = '\u672c\u5e74\u5ea6\u622a\u6b62\u73b0\u5728';
exports.PivotPanel_ValueFilterOrLabel_AllDates = '\u671f\u95f4\u6240\u6709\u65e5\u671f';
exports.PivotPanel_ValueFilterOrLabel_Custom = '\u81ea\u5b9a\u4e49\u7b5b\u9009...';
exports.PivotPanel_Sort_A_Z = '\u5347\u5e8f';
exports.PivotPanel_Sort_Z_A = '\u964d\u5e8f';
exports.PivotPanel_Sort_Smallest_Largest = '\u5347\u5e8f';
exports.PivotPanel_Sort_Largest_Smallest = '\u964d\u5e8f';
exports.PivotPanel_Sort_More = '\u5176\u4ed6\u6392\u5e8f\u9009\u9879...';
exports.PivotPanel_Filter_Clear = '\u4ece{0}\u4e2d\u6e05\u9664\u7b5b\u9009';
exports.PivotPanel_Filter_Label = '\u6807\u7b7e\u7b5b\u9009';
exports.PivotPanel_Filter_Value = '\u503c\u7b5b\u9009';
exports.PivotPanel_Date_Filter = '\u65e5\u671f\u7b5b\u9009';
exports.Ok = '\u786e\u8ba4';
exports.Cancel = '\u53d6\u6d88';
exports.NumberFormat = '\u6570\u5b57\u683c\u5f0f';
exports.Number = '\u6570\u5b57';
exports.FormatCells = '\u8bbe\u7f6e\u5355\u5143\u683c\u683c\u5f0f';
exports.Sample = '\u793a\u4f8b';
exports.Type = '\u5206\u7c7b';
exports.CustomFormats = [
    'General',
    '0',
    '0.00',
    '#,##0',
    '#,##0.00',
    '#,##0;(#,##0)',
    '#,##0;[Red](#,##0)',
    '#,##0.00;(#,##0.00)',
    '#,##0.00;[Red](#,##0.00)',
    '$#,##0;($#,##0)',
    '$#,##0;[Red]($#,##0)',
    '$#,##0.00;($#,##0.00)',
    '$#,##0.00;[Red]($#,##0.00)',
    '0%',
    '0.00%',
    '0.00E+00',
    '##0.0E+0',
    '# ?/?',
    '# ??/??',
    'm/d/yyyy',
    'd-mmm-yy',
    'd-mmm',
    'mmm-yy',
    'h:mm AM/PM',
    'h:mm:ss AM/PM',
    'hh:mm',
    'hh:mm:ss',
    'm/d/yyyy hh:mm',
    'mm:ss',
    'mm:ss.0',
    '@',
    '[h]:mm:ss',
    '$ #,##0;$ (#,##0);$ "-";@',
    ' #,##0; (#,##0); "-";@',
    '$ #,##0.00;$ (#,##0.00);$ "-"??;@',
    ' #,##0.00; (#,##0.00); "-"??;@',
    'hh:mm:ss',
    '00000',
    '# ???/???',
    '000-00-0000',
    'dddd, mmmm dd, yyyy',
    'm/d;@',
    '[<=9999999]###-####;(###) ###-####',
    '# ?/8'
];
exports.Select_Field = '\u9009\u62e9\u5b57\u6bb5:';
exports.PivotPanel_Filter_SelectAll = '\u5168\u9009';
exports.PivotPanel_Filter_NoSelectAll = '\u53cd\u9009';
exports.PivotPanel_Filter_Search = '\u641c\u7d22';
exports.Label_Title = '\u6807\u7b7e\u7b5b\u9009';
exports.Label_Show = '\u663e\u793a\u7684\u9879\u76ee\u7684\u6807\u7b7e';
exports.Use_Single_Character = '\u7528?\u4ee3\u8868\u5355\u4e2a\u5b57\u7b26';
exports.Use_Series_Characters = '\u7528*\u4ee3\u8868\u4efb\u610f\u591a\u4e2a\u5b57\u7b26';
exports.Value_Show = '\u663e\u793a\u7b26\u5408\u4ee5\u4e0b\u6761\u4ef6\u7684\u9879\u76ee';
exports.Value_Title = '\u503c\u7b5b\u9009';
exports.Top_Ten_Filter = '\u524d10\u9879 ';
exports.TopTenShow = '\u663e\u793a';
exports.Top = '\u6700\u5927';
exports.Bottom = '\u6700\u5c0f';
exports.Top_Item = '\u9879';
exports.Top_Percent = '\u767e\u5206\u6bd4';
exports.Top_Sum = '\u6c42\u548c';
exports.ByJoiner = '\u4f9d\u636e';
exports.AndJoiner = '\u4e0e';
exports.Q1 = '\u7b2c\u4e00\u5b63\u5ea6';
exports.Q2 = '\u7b2c\u4e8c\u5b63\u5ea6';
exports.Q3 = '\u7b2c\u4e09\u5b63\u5ea6';
exports.Q4 = '\u7b2c\u56db\u5b63\u5ea6';
exports.Jan = '\u4e00\u6708';
exports.Feb = '\u4e8c\u6708';
exports.Mar = '\u4e09\u6708';
exports.Apr = '\u56db\u6708';
exports.May = '\u4e94\u6708';
exports.Jun = '\u516d\u6708';
exports.Jul = '\u4e03\u6708';
exports.Aug = '\u516b\u6708';
exports.Sep = '\u4e5d\u6708';
exports.Oct = '\u5341\u6708';
exports.Nov = '\u5341\u4e00\u6708';
exports.Dec = '\u5341\u4e8c\u6708';
exports.IsBefore = '\u5728\u4ee5\u4e0b\u65e5\u671f\u4e4b\u524d';
exports.IsBeforeOrEqual = '\u5728\u4ee5\u4e0b\u65e5\u671f\u4e4b\u524d\u6216\u4e0e\u4e4b\u76f8\u540c';
exports.IsAfter = '\u5728\u4ee5\u4e0b\u65e5\u671f\u4e4b\u540e';
exports.IsAfterOrEqual = '\u5728\u4ee5\u4e0b\u65e5\u671f\u4e4b\u540e\u6216\u4e0e\u4e4b\u76f8\u540c';
exports.IsBetween = '\u4ecb\u4e8e';
exports.IsNotBetween = '\u4e0d\u4ecb\u4e8e';
exports.DateFilterTitle = '\u65e5\u671f\u7b5b\u9009';
exports.DateShow = '\u663e\u793a\u65e5\u671f\u7b26\u5408\u4ee5\u4e0b\u6761\u4ef6\u7684\u9879\u76ee';
exports.WholeDays = '\u5168\u5929';
exports.FieldSetting = '\u5b57\u6bb5\u8bbe\u7f6e';
exports.ValueSetting = '\u503c\u5b57\u6bb5\u8bbe\u7f6e';
exports.SourceName = '\u6e90\u540d\u79f0:';
exports.CustomName = '\u81ea\u5b9a\u4e49\u540d\u79f0:';
exports.SummarizeValue = '\u503c\u6c47\u603b\u65b9\u5f0f';
exports.ShowValueAs = '\u503c\u663e\u793a\u65b9\u5f0f';
exports.CalculationForDialog = '\u8ba1\u7b97: ';
exports.BaseFieldForDialog = '\u57fa\u672c\u5b57\u6bb5: ';
exports.BaseItemForDialog = '\u57fa\u672c\u9879: ';
exports.BaseItemNext = '(\u4e0b\u4e00\u4e2a)';
exports.BaseItemPrevious = '(\u4e0a\u4e00\u4e2a)';
exports.ShowValueAsField = '\u503c\u663e\u793a\u65b9\u5f0f';
exports.SummarizeValueField = '\u503c\u5b57\u6bb5\u6c47\u603b\u65b9\u5f0f';
exports.ChooseType = '\u9009\u62e9\u7528\u4e8e\u6c47\u603b\u6240\u9009\u5b57\u6bb5\u6570\u636e\u7684\u8ba1\u7b97\u7c7b\u578b';
exports.Sum = '\u6c42\u548c';
exports.Count = '\u8ba1\u6570';
exports.Average = '\u5e73\u5747\u503c';
exports.Max = '\u6700\u5927\u503c';
exports.Min = '\u6700\u5c0f\u503c';
exports.Product = '\u4e58\u79ef';
exports.CountNumbers = '\u6570\u503c\u8ba1\u6570';
exports.StdDev = '\u6807\u51c6\u504f\u5dee';
exports.StdDevp = '\u603b\u4f53\u6807\u51c6\u504f\u5dee';
exports.Var = '\u65b9\u5dee';
exports.Varp = '\u603b\u4f53\u65b9\u5dee';
exports.sigmaValue = '\u2211 \u6570\u503c';
exports.sigmaValueTemp = '\u6570\u503c';
exports.DateFormatError = '\u8fd9\u4e0d\u662f\u4e00\u4e2a\u6709\u6548\u7684\u65e5\u671f';
exports.noCalculation = '\u65e0\u8ba1\u7b97';
exports.percentGrandTotal = '\u603b\u8ba1\u7684\u767e\u5206\u6bd4';
exports.percentColumnTotal = '\u5217\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.percentRowTotal = '\u884c\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.percentEllipsis = '\u767e\u5206\u6bd4...';
exports.percentParentRowTotal = '\u7236\u884c\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.percentParentColumnTotal = '\u7236\u5217\u6c47\u603b\u7684\u767e\u5206\u6bd4';
exports.percentParentTotal = '\u7236\u7ea7\u6c47\u603b\u7684\u767e\u5206\u6bd4...';
exports.difference = '\u5dee\u5f02...';
exports.percentDifference = '\u5dee\u5f02\u767e\u5206\u6bd4...';
exports.runningTotal = '\u6309\u67d0\u4e00\u5b57\u6bb5\u6c47\u603b...';
exports.percentRunningTotal = '\u6309\u67d0\u4e00\u5b57\u6bb5\u6c47\u603b\u7684\u767e\u5206\u6bd4...';
exports.rankSmallestLargest = '\u5347\u5e8f\u6392\u5217...';
exports.rankLargestSmallest = '\u964d\u5e8f\u6392\u5217...';
exports.index = '\u6307\u6570';

exports.showValueAsDialog = [
    '', '', '', '',
    '\u767e\u5206\u6bd4',
    '', '',
    '\u7236\u7ea7\u6c47\u603b\u7684\u767e\u5206\u6bd4',
    '\u5dee\u5f02',
    '\u5dee\u5f02\u767e\u5206\u6bd4',
    '\u6309\u67d0\u4e00\u5b57\u6bb5\u6c47\u603b',
    '\u6309\u67d0\u4e00\u5b57\u6bb5\u6c47\u603b\u767e\u5206\u6bd4',
    '\u5347\u5e8f\u6392\u5217',
    '\u964d\u5e8f\u6392\u5217',
    '',
];
exports.baseField = '\u57fa\u672c\u5b57\u6bb5:';
exports.baseItem = '\u57fa\u672c\u9879:';
exports.grouping = '\u7ec4\u5408';
exports.auto = '\u81ea\u52a8';
exports.startingAt = '\u8d77\u59cb\u4e8e:';
exports.endingAt = '\u7ec8\u6b62\u4e8e:';
exports.groupBy = '\u6b65\u957f:';
exports.seconds = '\u79d2';
exports.minutes = '\u5206';
exports.hours = '\u5c0f\u65f6';
exports.days = '\u65e5';
exports.months = '\u6708';
exports.quarters = '\u5b63\u5ea6';
exports.years = '\u5e74';
exports.numberOfDays = '\u5929\u6570';
exports.wmk1 = ['6563908988634e00000065636730', '706e0fc668d2f6202d20e0884302'];
exports.wmk2 = ['6563908988634e0000006765636730', '706e0fc668d2f6202d200948884302'];
exports.NoHaveSpread = '\u5de5\u4f5c\u7c3f\u5f02\u5e38';
exports.SourceError = '\u6570\u636e\u6e90\u5f02\u5e38\uff0c\u4e0d\u80fd\u521b\u5efa\u6570\u636e\u8868';
exports.SourceNotIsTableNameOrFormula = '\u6570\u636e\u6e90\u4e0d\u662f\u4e00\u4e2a\u8868\u683c\u540d\u6216\u516c\u5f0f';
exports.SourceDataOnlyOne = '\u6b64\u547d\u4ee4\u8981\u6c42\u6570\u636e\u81f3\u5c11\u6709\u4e24\u884c\u3002\u5982\u679c\u9009\u5b9a\u533a\u57df\u53ea\u6709\u4e00\u884c\uff0c\u5219\u4e0d\u80fd\u4f7f\u7528\u6b64\u547d\u4ee4';
exports.FieldAreaLimited = '\u6b63\u5728\u79fb\u52a8\u7684\u5b57\u6bb5\u4e0d\u80fd\u653e\u5728\u8be5\u62a5\u8868\u533a\u57df\u4e2d\u3002';
exports.Views = '\u89c6\u56fe';
exports.Group = '\u7ec4\u5408';
exports.param_error = '\u53c2\u6570\u4e3a\u7a7a\u6216\u4e0d\u5b58\u5728';
exports.EmptyValueFieldError = '\u82e5\u8981\u5e94\u7528\u503c\u7b5b\u9009\uff0c\u201c\u503c\u201d\u533a\u57df\u5185\u5fc5\u987b\u81f3\u5c11\u5305\u542b\u4e00\u4e2a\u5b57\u6bb5';
exports.DefaultPivotTableViewName = '\u900f\u89c6\u8868\u89c6\u56fe';
exports.toolTipContent_Row = '\u884c: ';
exports.toolTipContent_Column = '\u5217: ';
exports.toolTipContent_Value = '\u503c: ';
exports.toolTipContent_NoValue = '\u65e0\u6570\u503c';
exports.deferLayoutUpdate = '\u5ef6\u8fdf\u5e03\u5c40\u66f4\u65b0';
function getStringLabelFilterItemText() {
    return [
        exports.ValueFilterOrLabel_Equals, exports.ValueFilterOrLabel_NotEqual,
        exports.ValueFilterOrLabel_IsBeginWith, exports.ValueFilterOrLabel_NotBegin, exports.ValueFilterOrLabel_End,
        exports.ValueFilterOrLabel_NotEndWith, exports.ValueFilterOrLabel_Contain, exports.ValueFilterOrLabel_NotContain,
        exports.ValueFilterOrLabelSelect_GreaterThan, exports.ValueFilterOrLabelSelect_GreaterOrTo, exports.ValueFilterOrLabelSelect_LessThan,
        exports.ValueFilterOrLabelSelect_LessOrTo, exports.ValueFilterOrLabelSelect_Between, exports.ValueFilterOrLabelSelect_NotBetween
    ];
}
exports.getStringLabelFilterItemText = getStringLabelFilterItemText;
function getDateLabelFilterItemText() {
    return [
        exports.ValueFilterOrLabel_Equals, exports.ValueFilterOrLabel_NotEqual, exports.IsBefore, exports.IsBeforeOrEqual, exports.IsAfter, exports.IsAfterOrEqual, exports.IsBetween, exports.IsNotBetween
    ];
}
exports.getDateLabelFilterItemText = getDateLabelFilterItemText;
function getNumberLabelFilterItemText() {
    return [
        exports.ValueFilterOrLabel_Equals, exports.ValueFilterOrLabel_NotEqual,
        exports.ValueFilterOrLabelSelect_GreaterThan, exports.ValueFilterOrLabelSelect_GreaterOrTo, exports.ValueFilterOrLabelSelect_LessThan,
        exports.ValueFilterOrLabelSelect_LessOrTo
    ];
}
exports.getNumberLabelFilterItemText = getNumberLabelFilterItemText;
function getValueFilterItemText() {
    return [exports.ValueFilterOrLabel_Equals, exports.ValueFilterOrLabel_NotEqual, exports.ValueFilterOrLabelSelect_GreaterThan, exports.ValueFilterOrLabelSelect_GreaterOrTo,
        exports.ValueFilterOrLabelSelect_LessThan, exports.ValueFilterOrLabelSelect_LessOrTo, exports.ValueFilterOrLabelSelect_Between, exports.ValueFilterOrLabelSelect_NotBetween];
}
exports.getValueFilterItemText = getValueFilterItemText;
exports.PivotTableErrorMessage_ShowDetail = '\u4e0d\u80fd\u663e\u793a\u6216\u9690\u85cf\u9009\u5b9a\u533a\u57df\u7684\u660e\u7ec6\u6570\u636e\u3002';
exports.PivotTableErrorMessage_MakeChange = '\u65e0\u6cd5\u5bf9\u6240\u9009\u5355\u5143\u683c\u8fdb\u884c\u6b64\u66f4\u6539\uff0c\u56e0\u4e3a\u5b83\u4f1a\u5f71\u54cd\u6570\u636e\u900f\u89c6\u8868\u3002\u8bf7\u4f7f\u7528\u5b57\u6bb5\u5217\u8868\u66f4\u6539\u62a5\u8868\u3002\u5982\u679c\u60a8\u8bd5\u56fe\u63d2\u5165\u6216\u5220\u9664\u5355\u5143\u683c\uff0c\u8bf7\u79fb\u52a8\u6570\u636e\u900f\u89c6\u8868\uff0c\u7136\u540e\u518d\u8bd5\u3002';
exports.PivotTableErrorMessage_ExistData = '\u6b64\u5904\u5df2\u6709\u6570\u636e\uff0c\u662f\u5426\u66ff\u6362\u5b83\uff1f';
exports.PivotTableErrorMessage_EditWhenDefer = '\u9009\u4e2d\u201c\u63a8\u8fdf\u5e03\u5c40\u66f4\u65b0\u201d\u590d\u9009\u6846\u65f6\u65e0\u6cd5\u7f16\u8f91 \u6570\u636e\u900f\u89c6\u8868 \u62a5\u8868\u3002\u82e5\u8981\u7f16\u8f91\u8be5\u62a5\u8868\uff0c\u8bf7\u6e05\u9664\u6570\u636e\u900f\u89c6\u8868\u5b57\u6bb5\u5217\u8868\u5e95\u7aef\u7684\u201c\u63a8\u8fdf\u5e03\u5c40\u66f4\u65b0\u201d\u590d\u9009\u6846\u3002';
exports.PivotTableErrorMessage_DuplicatedFieldName = '\u5df2\u6709\u76f8\u540c\u6570\u636e\u900f\u89c6\u8868\u5b57\u6bb5\u540d\u5b58\u5728\u3002';
exports.PivotTableErrorMessage_EmptyFieldName = '\u4e0d\u80fd\u5c06\u7a7a\u503c\u7528\u4f5c\u6570\u636e\u900f\u89c6\u8868\u4e2d\u7684\u6570\u636e\u9879\u6216\u5b57\u6bb5\u540d\u3002';
exports.PivotTableErrorMessage_Protect = '\u53d7\u4fdd\u62a4\u7684\u5de5\u4f5c\u8868\u5305\u542b\u57fa\u4e8e\u76f8\u540c\u6570\u636e\u6e90\u7684\u5176\u4ed6\u6570\u636e\u900f\u89c6\u8868\u65f6\uff0c\u6b64\u547d\u4ee4\u65e0\u6cd5\u6267\u884c\u3002\u82e5\u8981\u64a4\u9500\u5bf9\u5305\u542b\u6709\u5176\u4ed6\u6570\u636e\u900f\u89c6\u8868\u7684\u5de5\u4f5c\u8868\u7684\u4fdd\u62a4\uff0c\u8bf7\u5355\u51fb\u8be5\u5de5\u4f5c\u8868\u7684\u6807\u7b7e\uff0c\u518d\u5728\u201c\u5ba1\u9605\u201d\u9009\u9879\u5361\u4e0a\u7684\u201c\u66f4\u6539\u201d\u7ec4\u4e2d\u5355\u51fb\u201c\u64a4\u9500\u5de5\u4f5c\u8868\u4fdd\u62a4\u201d\u3002\u7136\u540e\u91cd\u8bd5\u8be5\u547d\u4ee4\u3002';
exports.PivotTableErrorMessage_EmptySourceFieldName = '\u6570\u636e\u900f\u89c6\u8868\u5b57\u6bb5\u540d\u65e0\u6548\u3002\u5728\u521b\u5efa\u900f\u89c6\u8868\u65f6\uff0c\u5fc5\u987b\u4f7f\u7528\u7ec4\u5408\u4e3a\u5e26\u6709\u6807\u5fd7\u5217\u5217\u8868\u7684\u6570\u636e\u3002\u5982\u679c\u8981\u66f4\u6539\u6570\u636e\u900f\u89c6\u8868\u5b57\u6bb5\u7684\u540d\u79f0\uff0c\u5fc5\u987b\u952e\u5165\u5b57\u6bb5\u7684\u65b0\u540d\u79f0\u3002';
exports.PivotTableErrorMessage_Overlap = '\u6570\u636e\u900f\u89c6\u8868\u4e0d\u80fd\u8986\u76d6\u53e6\u4e00\u4e2a\u6570\u636e\u900f\u89c6\u8868\u3002';
exports.PivotTableErrorMessage_InvalidChange = '\u65e0\u6cd5\u66f4\u6539\u6570\u636e\u900f\u89c6\u8868\u7684\u8fd9\u4e00\u90e8\u5206\u3002';
exports.PivotTableErrorMessage_InvalidGroup = '\u9009\u5b9a\u533a\u57df\u4e0d\u80fd\u5206\u7ec4\u3002';
exports.PivotTableErrorMessage_InvalidReference = '\u6570\u636e\u6e90\u5f15\u7528\u65e0\u6548\u3002';
exports.PivotTableForAccessibility = '\u900f\u89c6\u8868: \r\n\u900f\u89c6\u8868\u540d\u79f0: ';
/***/ }),

/***/ './dist/plugins/print/print.res.zh.js':
/*!********************************************!*\
  !*** ./dist/plugins/print/print.res.zh.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_InvalidSheetIndex = '\u65e0\u6548\u7684\u8868\u5355\u7d22\u5f15\u3002';
/***/ }),

/***/ './dist/plugins/shape/shape.res.zh.js':
/*!********************************************!*\
  !*** ./dist/plugins/shape/shape.res.zh.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_InvalidConnectionSite = '\u65e0\u6548\u7684\u8fde\u63a5\u70b9\u3002';
exports.Exp_DuplicatedName = '\u540d\u5b57\u91cd\u590d\u3002';
exports.Exp_EmptyName = '\u540d\u5b57\u4e3a\u7a7a\u3002';
exports.Exp_InvalidRange = '\u65e0\u6548\u533a\u95f4';
/***/ }),

/***/ './dist/plugins/slicer/slicer.res.zh.js':
/*!**********************************************!*\
  !*** ./dist/plugins/slicer/slicer.res.zh.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Blank = '(\u7a7a)';
exports.Exp_SlicerNameInvalid = '\u5207\u7247\u5668\u7684\u540d\u79f0\u65e0\u6548\u3002';
exports.Exp_SlicerNameExist = '\u5207\u7247\u5668\u7684\u540d\u79f0\u5df2\u7ecf\u5b58\u5728\uff0c\u8bf7\u8d4b\u4e88\u5176\u552f\u4e00\u540d\u3002';
/***/ }),

/***/ './dist/plugins/statusBar/statusBar.res.zh.js':
/*!****************************************************!*\
  !*** ./dist/plugins/statusBar/statusBar.res.zh.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.cellMode = '\u5355\u5143\u683c\u6a21\u5f0f';
exports.cellModeReady = '\u5c31\u7eea';
exports.cellModeEnter = '\u8f93\u5165';
exports.cellModeEdit = '\u7f16\u8f91';
exports.formulaAverage = '\u5e73\u5747\u503c';
exports.formulaCount = '\u8ba1\u6570';
exports.formulaNumericalCount = '\u6570\u503c\u8ba1\u6570';
exports.formulaMin = '\u6700\u5c0f\u503c';
exports.formulaMax = '\u6700\u5927\u503c';
exports.formulaSum = '\u6c42\u548c';
exports.zoomSlider = '\u7f29\u653e\u6ed1\u5757';
exports.zoom = '\u7f29\u653e';
exports.toolTipCellMode = '{0}\u6a21\u5f0f';
exports.toolTipFormulaAverage = '\u9009\u5b9a\u5355\u5143\u683c\u7684\u5e73\u5747\u503c';
exports.toolTipFormulaCount = '\u6240\u9009\u5355\u5143\u683c\u4e2d\u5305\u542b\u6570\u636e\u7684\u5355\u5143\u683c\u6570';
exports.toolTipFormulaNumericalCount = '\u6240\u9009\u5355\u5143\u683c\u4e2d\u5305\u542b\u6570\u503c\u6570\u636e\u7684\u5355\u5143\u683c\u6570';
exports.toolTipFormulaMin = '\u9009\u5b9a\u533a\u57df\u4e2d\u7684\u6700\u5c0f\u503c';
exports.toolTipFormulaMax = '\u9009\u5b9a\u533a\u57df\u4e2d\u7684\u6700\u5927\u503c';
exports.toolTipFormulaSum = '\u9009\u5b9a\u5355\u5143\u683c\u7684\u603b\u548c';
exports.toolTipZoomOut = '\u7f29\u5c0f';
exports.toolTipZoomIn = '\u653e\u5927';
exports.toolTipSlider = '\u663e\u793a\u6bd4\u4f8b';
exports.toolTipZoomPanel = '\u7f29\u653e\u7ea7\u522b';
/***/ }),

/***/ './dist/plugins/table/table.res.zh.js':
/*!********************************************!*\
  !*** ./dist/plugins/table/table.res.zh.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_DragDropShiftTableCell = '\u6b64\u64cd\u4f5c\u662f\u4e0d\u5141\u8bb8\u7684\u3002\u6b64\u64cd\u4f5c\u8bd5\u56fe\u5728\u4f60\u8868\u5355\u7684\u8868\u683c\u4e2d\u6539\u53d8\u5355\u5143\u683c\u3002';
exports.Exp_DragDropChangePartOfTable = '\u65e0\u6cd5\u5b8c\u6210\u6b64\u64cd\u4f5c: \u60a8\u6b63\u5728\u5c1d\u8bd5\u5c06\u90e8\u5206\u7684\u8868\u683c\u884c\u6216\u5217\u4ee5\u6b64\u65b9\u5f0f\u66f4\u6539\uff0c\u8fd9\u662f\u4e0d\u5141\u8bb8\u7684\u3002';
exports.Exp_TableEmptyNameError = '\u8868\u683c\u7684\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a\u3002';
exports.Exp_TableNameInvalid = '\u8868\u683c\u7684\u540d\u79f0\u65e0\u6548\u3002';
exports.Exp_TableInvalidRow = '\u65e0\u6548\u7684\u884c\u7d22\u5f15\u6216\u884c\u6570\u3002';
exports.Exp_TableInvalidColumn = '\u65e0\u6548\u7684\u5217\u7d22\u5f15\u6216\u5217\u6570\u3002';
exports.Exp_TableIntersectError = '\u8868\u683c\u4e0d\u80fd\u76f8\u4ea4\u3002';
exports.Exp_TableHasSameNameError = '\u5f53\u524d\u8868\u5355\u5df2\u5305\u542b\u5177\u6709\u76f8\u540c\u540d\u79f0\u7684\u8868\u683c\u3002';
exports.Exp_TableDataSourceNullError = '\u8868\u683c\u6570\u636e\u6e90\u4e0d\u80fd\u4e3a\u7a7a\u3002';
exports.Exp_TableMoveOutOfRange = '\u8868\u683c\u4e0d\u80fd\u88ab\u79fb\u51fa\u8868\u5355\u3002';
exports.Exp_TableResizeOutOfRange = '\u65e0\u6548\u7684\u884c\u6570\uff0c\u5217\u6570\u548c\u8868\u683c\u5927\u5c0f\u4e0d\u80fd\u8d85\u51fa\u8868\u5355\u3002';
exports.Exp_ArrayFormulaTable = '\u591a\u4e2a\u5355\u5143\u683c\u6570\u7ec4\u516c\u5f0f\u5728\u8868\u683c\u4e2d\u662f\u4e0d\u5141\u8bb8\u7684\u3002';
exports.Exp_TableResizeInvalidRange = '\u6807\u9898\u5fc5\u987b\u4fdd\u7559\u5728\u540c\u4e00\u884c\u4e0a\uff0c\u5e76\u4e14\u6700\u7ec8\u8868\u683c\u533a\u57df\u5fc5\u987b\u8986\u76d6\u539f\u6709\u8868\u683c\u533a\u57df\u3002';
exports.Exp_TableResizeToSpan = '\u65e0\u6cd5\u5b8c\u6210\u64cd\u4f5c\uff1a\u8868\u4e0d\u80fd\u4e0e\u8868\u6216\u5408\u5e76\u7684\u5355\u5143\u683c\u3002';
exports.Exp_TableResizeWithFilter = '\u65e0\u6cd5\u79fb\u52a8\u7b5b\u9009\u533a\u57df\u6216\u8868\u4e2d\u7684\u5355\u5143\u683c\u3002';
exports.Exp_TableResizeWithHidden = '\u65e0\u6cd5\u8c03\u6574\u4e0e\u9690\u85cf\u7684\u884c\u6216\u5217\u76f8\u90bb\u7684\u8868\u7684\u5927\u5c0f\u3002';
exports.Exp_TableResizeToTable = '\u65e0\u6cd5\u5b8c\u6210\u64cd\u4f5c\uff1a\u56e0\u4e3a\u5b83\u4f1a\u5f71\u54cd\u8868\u6216\u591a\u4e2a\u8868\u4e0a\u7684\u5355\u5143\u683c\u3002\u8bf7\u9009\u62e9\u5355\u4e2a\u8868\uff0c\u7136\u540e\u518d\u8bd5\u3002';
exports.Exp_RowParamOutOfRange = '\u53c2\u6570\u884c\u7d22\u5f15\u5df2\u8d85\u51fa\u8868\u683c\u6570\u636e\u533a\u57df\u3002';
exports.Exp_ColParamOutOfRange = '\u53c2\u6570\u5217\u7d22\u5f15\u5df2\u8d85\u51fa\u8868\u683c\u6570\u636e\u533a\u57df\u3002';
exports.Exp_TableDeleteCountInvalid = '\u8981\u5220\u9664\u7684\u8868\u884c(\u8868\u5217)\u4e2a\u6570\u4f1a\u5bfc\u81f4\u8868\u683c\u4e3a\u7a7a\u3002';
exports.Exp_TableAddRowIntersectSpan = '\u65e0\u6cd5\u5b8c\u6210\u6b64\u64cd\u4f5c\uff1a\u6b64\u64cd\u4f5c\u4f1a\u5bfc\u81f4\u4e00\u4e9b\u5408\u5e76\u5355\u5143\u683c\u88ab\u62c6\u6563\u3002';
exports.Exp_TableAddRowIntersectTable = '\u4e0d\u5141\u8bb8\u6b64\u64cd\u4f5c\uff0c\u56e0\u4e3a\u5b83\u4f1a\u79fb\u52a8\u5de5\u4f5c\u8868\u4e0a\u8868\u683c\u4e2d\u7684\u5355\u5143\u683c\u3002';
exports.Exp_TableAddRowNoEnoughRoom = '\u65e0\u6cd5\u63d2\u5165\u65b0\u7684\u5355\u5143\u683c\uff0c\u56e0\u4e3a\u5b83\u4f1a\u5bfc\u81f4\u67d0\u4e9b\u975e\u7a7a\u5355\u5143\u683c\u79fb\u51fa\u5de5\u4f5c\u8868\u3002\u60a8\u53ef\u4ee5\u5c1d\u8bd5\u5220\u9664\u884c\u6216\u5217\u6765\u4fdd\u8bc1\u6709\u8db3\u591f\u7684\u533a\u57df\u53ef\u4ee5\u63d2\u5165\u3002';
exports.Table_Total = '\u6c47\u603b';
exports.Table_None = '\u65e0';
exports.Table_Average = '\u5e73\u5747\u503c';
exports.Table_Count = '\u8ba1\u6570';
exports.Table_Count_Numbers = '\u6570\u503c\u8ba1\u6570';
exports.Table_Max = '\u6700\u5927\u503c';
exports.Table_Min = '\u6700\u5c0f\u503c';
exports.Table_Sum = '\u6c42\u548c';
exports.Table_StdDev = '\u6807\u51c6\u504f\u5dee';
exports.Table_Var = '\u65b9\u5dee';
/***/ }),

/***/ './dist/plugins/tableSheet/tableSheet.res.zh.js':
/*!******************************************************!*\
  !*** ./dist/plugins/tableSheet/tableSheet.res.zh.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.EXP_SortWithRowChanges = '\u68c0\u6d4b\u5230\u884c\u6570\u636e\u53d8\u66f4\uff0c\u6240\u4ee5\u4e0d\u80fd\u6392\u5e8f\u3002\u8bf7\u5148\u4fdd\u5b58\u6216\u8005\u4e22\u5f03\u8fd9\u4e9b\u53d8\u66f4\u3002';
exports.EXP_FilterWithRowChanges = '\u68c0\u6d4b\u5230\u884c\u6570\u636e\u53d8\u66f4\uff0c\u6240\u4ee5\u4e0d\u80fd\u7b5b\u9009\u3002\u8bf7\u5148\u4fdd\u5b58\u6216\u8005\u4e22\u5f03\u8fd9\u4e9b\u53d8\u66f4\u3002';
exports.EXP_TooManyPinRecords = '\u7f6e\u9876\u7684\u8bb0\u5f55\u4e0d\u80fd\u8d85\u8fc710\u884c\u3002';
exports.EXP_PinUnpinWithDirty = '\u4e0d\u80fd\u5728\u6709\u810f\u503c\u5e76\u4e14\u4e3a\u4fdd\u5b58\u7684\u60c5\u51b5\u4e0b\u8fdb\u884c\u7f6e\u9876\u6216\u53d6\u6d88\u7f6e\u9876\u3002';
/***/ }),

/***/ './dist/plugins/touch/touch.res.zh.js':
/*!********************************************!*\
  !*** ./dist/plugins/touch/touch.res.zh.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.ToolStrip_PasteText = '\u7c98\u8d34';
exports.ToolStrip_CutText = '\u526a\u8d34';
exports.ToolStrip_CopyText = '\u590d\u5236';
exports.ToolStrip_AutoFillText = '\u81ea\u52a8\u586b\u5145';
/***/ }),

/***/ './node_modules_local/@grapecity/js-calc/dist/gc.spread.calcengine.resources.zh.js':
/*!*****************************************************************************************!*\
  !*** ./node_modules_local/@grapecity/js-calc/dist/gc.spread.calcengine.resources.zh.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {
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

 	return __webpack_require__(__webpack_require__.s = './src/resource.zh.entry.ts');
 })
 ({

 './src/calcEngine.res.zh.ts':
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
    Exp_InvalidCast: '\u65e0\u6548\u8f6c\u6362\u5f02\u5e38',
    Exp_FormulaInvalidChar: '\u516c\u5f0f\u5305\u542b\u65e0\u6548\u5b57\u7b26: \'{0}\' \u5728 {1} \u7d22\u5f15\u5904\u3002',
    Exp_FormulaInvalid: '\u65e0\u6548\u7684\u516c\u5f0f',
    Exp_InvalidFunctionName: '\u65e0\u6548\u51fd\u6570\u540d',
    Exp_InvalidOverrideFunction: '\u4e0d\u80fd\u91cd\u5199\u5185\u7f6e\u51fd\u6570',
    Exp_InvalidArray: '\u65e0\u6548\u6570\u7ec4',
    Exp_OverrideNotAllowed: '\u5c1d\u8bd5\u91cd\u5199\u51fd\u6570\uff0c\u4f46\u91cd\u5199\u884c\u4e3a\u662f\u4e0d\u88ab\u5141\u8bb8\u7684\u3002',
    Exp_NoSyntax: '\u6ca1\u6709\u8bed\u6cd5\u5728 \'{0}\' \u5904\u5339\u914d\u5230\u8bed\u6cd5 \'{1}\'\u3002',
    Exp_IsValid: '\'{0}\' \u662f\u65e0\u6548\u7684\u3002',
    Exp_InvalidParameters: '\u5728 {0} \u5904\u5b58\u5728\u65e0\u6548\u51fd\u6570\u53c2\u6570\u3002',
    Exp_InvalidArrayColumns: '\u5217\u6570\u7ec4\u957f\u5ea6\u5728 {0} \u5904\u4e0d\u76f8\u7b49\u3002',
    Exp_ExprIsNull: '\u53c2\u6570 \'expr\' \u662f\u7a7a',
    Exp_InvalidOperation: '\u65e0\u6548\u64cd\u4f5c\u5f02\u5e38',
    Exp_ArgumentNull: '\u7a7a\u53c2\u6570\u5f02\u5e38',
    Exp_CriteriaIsNull: '\u6761\u4ef6\u4e3a\u7a7a',
    Exp_Format: '\u683c\u5f0f',
    Exp_ArrayFromulaPart: '\u65e0\u6cd5\u4ec5\u6539\u53d8\u6570\u7ec4\u516c\u5f0f\u7684\u4e00\u90e8\u5206\u3002',
    Exp_NotSupported: '\u4e0d\u652f\u6301\u5f02\u5e38',
    Fbx_Summary: '\u6982\u8981',
    Fbx_TableName_Description: '\u8868\u683c\u540d\u4e3a ',
    Fbx_TableSheetName_Description: 'TableSheet\u540d\u4e3a ',
    Fbx_CustomName_Description: '\u81ea\u5b9a\u4e49\u540d\u79f0\u4e3a ',
    _builtInFunctionsResource: {
        'ABS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u6570\u5b57\u7684\u7edd\u5bf9\u503c\u3002', [
            parameterDescription('number')
        ]),
        'ACCRINT': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5b9a\u671f\u4ed8\u606f\u8bc1\u5238\u7684\u5e94\u8ba1\u5229\u606f\u3002', [
            parameterDescription('issue'),
            parameterDescription('first_interest'),
            parameterDescription('settlement'),
            parameterDescription('rate'),
            parameterDescription('par'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'ACCRINTM': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5728\u5230\u671f\u65e5\u652f\u4ed8\u5229\u606f\u7684\u6709\u4ef7\u8bc1\u5238\u7684\u5e94\u8ba1\u5229\u606f\u3002', [
            parameterDescription('issue'),
            parameterDescription('settlement'),
            parameterDescription('rate'),
            parameterDescription('par'),
            parameterDescription('basis')
        ]),
        'ACOS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6570\u5b57\u7684\u53cd\u4f59\u5f26\u503c\u3002\u53cd\u4f59\u5f26\u503c\u662f\u89d2\u5ea6\uff0c\u5b83\u7684\u4f59\u5f26\u503c\u4e3a\u6570\u5b57\u3002\u8fd4\u56de\u7684\u89d2\u5ea6\u503c\u4ee5\u5f27\u5ea6\u8868\u793a\uff0c\u8303\u56f4\u662f0\u5230pi\u3002', [
            parameterDescription('number')
        ]),
        'ACOSH': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56denumber\u53c2\u6570\u7684\u53cd\u53cc\u66f2\u4f59\u5f26\u503c\u3002\u53c2\u6570\u5fc5\u987b\u5927\u4e8e\u6216\u7b49\u4e8e1\u3002\u53cd\u53cc\u66f2\u4f59\u5f26\u503c\u7684\u53cc\u66f2\u4f59\u5f26\u5373\u4e3anumber\uff0c\u56e0\u6b64ACOSH(COSH(number))\u7b49\u4e8enumber\u3002', [
            parameterDescription('number')
        ]),
        'ADDRESS': functionDescription('\u8be5\u51fd\u6570\u5728\u7ed9\u51fa\u6307\u5b9a\u884c\u6570\u548c\u5217\u6570\u7684\u60c5\u51b5\u4e0b\uff0c\u53ef\u4ee5\u4f7f\u7528ADDRESS\u51fd\u6570\u83b7\u53d6\u5de5\u4f5c\u8868\u5355\u5143\u683c\u7684\u5730\u5740\u3002', [
            parameterDescription('row_num'),
            parameterDescription('column_num'),
            parameterDescription('abs_num'),
            parameterDescription('a1style'),
            parameterDescription('sheet_text')
        ]),
        'AGGREGATE': functionDescription('\u6b64\u51fd\u6570\u4f7f\u7528\u6307\u5b9a\u7684\u5185\u7f6e\u51fd\u6570\u6c47\u603b\u6570\u5b57\u5217\u8868\u3002', [
            parameterDescription('function_num'),
            parameterDescription('options'),
            parameterDescription('ref1'),
            parameterDescription('ref2', true)
        ]),
        'AMORDEGRC': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6bcf\u4e2a\u7ed3\u7b97\u671f\u95f4\u7684\u6298\u65e7\u503c\u3002\u8be5\u51fd\u6570\u4e3b\u8981\u4e3a\u6cd5\u56fd\u4f1a\u8ba1\u7cfb\u7edf\u63d0\u4f9b\u3002\u5982\u679c\u67d0\u9879\u8d44\u4ea7\u662f\u5728\u8be5\u7ed3\u7b97\u671f\u7684\u4e2d\u671f\u8d2d\u5165\u7684\uff0c\u5219\u6309\u76f4\u7ebf\u6298\u65e7\u6cd5\u8ba1\u7b97\u3002\u8be5\u51fd\u6570\u4e0e\u51fd\u6570AMORLINC\u76f8\u4f3c\uff0c\u4e0d\u540c\u4e4b\u5904\u5728\u4e8e\u8be5\u51fd\u6570\u4e2d\u7528\u4e8e\u8ba1\u7b97\u7684\u6298\u65e7\u7cfb\u6570\u53d6\u51b3\u4e8e\u8d44\u4ea7\u7684\u5bff\u547d\u3002', [
            parameterDescription('cost'),
            parameterDescription('date_purchased'),
            parameterDescription('first_period'),
            parameterDescription('salvage'),
            parameterDescription('period'),
            parameterDescription('rate'),
            parameterDescription('basis')
        ]),
        'AMORLINC': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6bcf\u4e2a\u7ed3\u7b97\u671f\u95f4\u7684\u6298\u65e7\u503c\uff0c\u8be5\u51fd\u6570\u4e3a\u6cd5\u56fd\u4f1a\u8ba1\u7cfb\u7edf\u63d0\u4f9b\u3002\u5982\u679c\u67d0\u9879\u8d44\u4ea7\u662f\u5728\u7ed3\u7b97\u671f\u95f4\u7684\u4e2d\u671f\u8d2d\u5165\u7684\uff0c\u5219\u6309\u7ebf\u6027\u6298\u65e7\u6cd5\u8ba1\u7b97\u3002', [
            parameterDescription('cost'),
            parameterDescription('date_purchased'),
            parameterDescription('first_period'),
            parameterDescription('salvage'),
            parameterDescription('period'),
            parameterDescription('rate'),
            parameterDescription('basis')
        ]),
        'AND': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u903b\u8f91\u4e0e\u3002\u5982\u679c\u6bcf\u4e00\u4e2a\u53c2\u6570\u90fd\u662fTRUE\u65f6\u8fd4\u56deTRUE\u3002', [
            parameterDescription('logical1'),
            parameterDescription('logical2')
        ]),
        'ASIN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u7684\u53cd\u6b63\u5f26\u503c\u3002\u53cd\u6b63\u5f26\u503c\u4e3a\u4e00\u4e2a\u89d2\u5ea6\uff0c\u8be5\u89d2\u5ea6\u7684\u6b63\u5f26\u503c\u5373\u7b49\u4e8e\u6b64\u51fd\u6570\u7684number\u53c2\u6570\u3002\u8fd4\u56de\u7684\u89d2\u5ea6\u503c\u5c06\u4ee5\u5f27\u5ea6\u8868\u793a\uff0c\u8303\u56f4\u4e3a-pi/2\u5230pi/2\u3002', [
            parameterDescription('number')
        ]),
        'ASINH': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u7684\u53cd\u53cc\u66f2\u6b63\u5f26\u503c\u3002\u53cd\u53cc\u66f2\u6b63\u5f26\u503c\u7684\u53cc\u66f2\u6b63\u5f26\u5373\u7b49\u4e8e\u6b64\u51fd\u6570\u7684number\u53c2\u6570\u503c\uff0c\u56e0\u6b64ASINH(SINH(number))\u7b49\u4e8enumber\u53c2\u6570\u503c\u3002', [
            parameterDescription('number')
        ]),
        'ATAN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u53cd\u6b63\u5207\u503c\u3002\u53cd\u6b63\u5207\u503c\u4e3a\u89d2\u5ea6\uff0c\u8d77\u6b63\u5207\u503c\u5373\u7b49\u4e8enumber\u53c2\u6570\u503c\u3002\u8fd4\u56de\u7684\u89d2\u5ea6\u503c\u5c06\u4ee5\u5f27\u5ea6\u8868\u793a\uff0c\u8303\u56f4\u4e3a-pi/2\u5230pi/2\u3002', [
            parameterDescription('number')
        ]),
        'ATAN2': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u7ed9\u5b9aX\u53caY\u5750\u6807\u503c\u7684\u53cd\u6b63\u5207\u503c\u3002', [
            parameterDescription('x_num'),
            parameterDescription('y_num')
        ]),
        'ATANH': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u7684\u53cd\u53cc\u66f2\u6b63\u5207\u503c\u3002', [
            parameterDescription('number')
        ]),
        'AVEDEV': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u6570\u636e\u4e0e\u5176\u5747\u503c\u7684\u7edd\u5bf9\u504f\u5dee\u7684\u5e73\u5747\u503c\uff0cAVEDEV\u7528\u4e8e\u8bc4\u6d4b\u8fd9\u7ec4\u6570\u636e\u7684\u79bb\u6563\u5ea6\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'AVERAGE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u7684\u5e73\u5747\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true),
        ]),
        'AVERAGEA': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u53c2\u6570\u5217\u8868\u4e2d\u6570\u503c\u7684\u5e73\u5747\u503c\uff0c\u5305\u62ec\u6587\u672c\u548c\u903b\u8f91\u503c\u3002', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'AVERAGEIF': functionDescription('\u8fd4\u56de\u67d0\u4e2a\u533a\u57df\u5185\u6ee1\u8db3\u7ed9\u5b9a\u6761\u4ef6\u7684\u6240\u6709\u5355\u5143\u683c\u7684\u5e73\u5747\u503c\u3002', [
            parameterDescription('range'),
            parameterDescription('criteria'),
            parameterDescription('[average_range]')
        ]),
        'AVERAGEIFS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6ee1\u8db3\u591a\u91cd\u6761\u4ef6\u7684\u6240\u6709\u5355\u5143\u683c\u7684\u5e73\u5747\u503c\u3002', [
            parameterDescription('average_range'),
            parameterDescription('criteria_range1', true),
            parameterDescription('criteria1', true),
        ]),
        'BESSELI': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4fee\u6b63Bessel\u51fd\u6570\u503c\uff0c\u5b83\u4e0e\u7528\u7eaf\u865a\u6570\u53c2\u6570\u8fd0\u7b97\u65f6\u7684Bessel\u51fd\u6570\u503c\u76f8\u7b49\u3002', [
            parameterDescription('value'),
            parameterDescription('order')
        ]),
        'BESSELJ': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56deBessel\u51fd\u6570\u503c\u3002', [
            parameterDescription('value'),
            parameterDescription('order')
        ]),
        'BESSELK': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4fee\u6b63Bessel\u51fd\u6570\u503c\uff0c\u5b83\u4e0e\u7528\u7eaf\u865a\u6570\u53c2\u6570\u8fd0\u7b97\u65f6\u7684Bessel\u51fd\u6570\u503c\u76f8\u7b49\u3002', [
            parameterDescription('value'),
            parameterDescription('order')
        ]),
        'BESSELY': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56deBessel\u51fd\u6570\u503c\uff0c\u8be5\u51fd\u6570\u4e5f\u79f0\u4f5c\u8bfa\u4f0a\u66fc\u51fd\u6570\u3002', [
            parameterDescription('value'),
            parameterDescription('order')
        ]),
        'BETADIST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u7d2f\u79efbeta\u5206\u5e03\u7684\u6982\u7387\u5bc6\u5ea6\u51fd\u6570\u3002', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('lower'),
            parameterDescription('upper')
        ]),
        'BETAINV': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6307\u5b9abeta\u5206\u5e03\u7d2f\u79efbeta\u5206\u5e03\u7684\u6982\u7387\u5bc6\u5ea6\u51fd\u6570\u7684\u53cd\u51fd\u6570\u503c\u3002', [
            parameterDescription('probability'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('lower'),
            parameterDescription('upper')
        ]),
        'BIN2DEC': functionDescription('\u8be5\u51fd\u6570\u5c06\u4e8c\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u5341\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number')
        ]),
        'BIN2HEX': functionDescription('\u8be5\u51fd\u6570\u5c06\u4e8c\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u5341\u516d\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'BIN2OCT': functionDescription('\u8be5\u51fd\u6570\u5c06\u4e8c\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u516b\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'BINOMDIST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e00\u5143\u4e8c\u9879\u5f0f\u5206\u5e03\u7684\u6982\u7387\u503c\u3002', [
            parameterDescription('number_s'),
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('cumulative')
        ]),
        'CEILING': functionDescription('\u8be5\u51fd\u6570\u5c06\u53c2\u6570\u5411\u4e0a\u820d\u5165\u3002', [
            parameterDescription('number'),
            parameterDescription('significance')
        ]),
        'CHAR': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5bf9\u5e94\u6570\u5b57\u4ee3\u7801\u7684\u5b57\u7b26\u3002', [
            parameterDescription('number')
        ]),
        'CHIDIST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de \u03c72 \u5206\u5e03\u7684\u5355\u5c3e\u6982\u7387\u3002', [
            parameterDescription('value'),
            parameterDescription('deg_freedom')
        ]),
        'CHIINV': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de \u03c72 \u5206\u5e03\u5355\u5c3e\u6982\u7387\u7684\u53cd\u51fd\u6570\u503c\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'CHITEST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u72ec\u7acb\u6027\u68c0\u6d4b\u503c\u3002', [
            parameterDescription('actual_range'),
            parameterDescription('expected_range')
        ]),
        'CHOOSE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ece\u503c\u5f97\u5217\u8868\u4e2d\u9009\u62e9\u503c\u3002', [
            parameterDescription('index_num'),
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'CLEAN': functionDescription('\u8be5\u51fd\u6570\u5220\u9664\u6587\u672c\u4e2d\u6240\u6709\u975e\u6253\u5370\u5b57\u7b26\u3002', [
            parameterDescription('text')
        ]),
        'CODE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7b2c\u4e00\u4e2a\u5b57\u7b26\u7684\u6570\u5b57\u4ee3\u7801\u3002\u8fd4\u56de\u7684\u4ee3\u7801\u5bf9\u5e94\u4e8e\u8ba1\u7b97\u673a\u5f53\u524d\u4f7f\u7528\u7684\u5b57\u7b26\u4e32\u3002', [
            parameterDescription('text')
        ]),
        'COLUMN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5f15\u7528\u7684\u5217\u53f7\u3002', [
            parameterDescription('reference')
        ]),
        'COLUMNS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5f15\u7528\u4e2d\u5305\u542b\u7684\u5217\u6570\u3002', [
            parameterDescription('array')
        ]),
        'COMBIN': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u4ece\u7ed9\u5b9a\u6570\u76ee\u7684\u5bf9\u8c61\u96c6\u5408\u4e2d\u63d0\u53d6\u82e5\u5e72\u5bf9\u8c61\u7684\u7ec4\u5408\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('number_chosen')
        ]),
        'COMPLEX': functionDescription('\u8be5\u51fd\u6570\u5c06\u5b9e\u7cfb\u6570\u548c\u865a\u7cfb\u6570\u8f6c\u6362\u4e3a\u590d\u6570\u3002', [
            parameterDescription('real_num'),
            parameterDescription('image_num'),
            parameterDescription('suffix')
        ]),
        'CONCATENATE': functionDescription('\u8be5\u51fd\u6570\u5c06\u4e24\u4e2a\u6216\u591a\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\u5408\u5e76\u4e3a\u4e00\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\u3002', [
            parameterDescription('text1'),
            parameterDescription('text2', true)
        ]),
        'CONFIDENCE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u603b\u4f53\u5e73\u5747\u503c\u7684\u7f6e\u4fe1\u533a\u95f4\u3002', [
            parameterDescription('alpha'),
            parameterDescription('standard_dev'),
            parameterDescription('size')
        ]),
        'CONVERT': functionDescription('\u8be5\u51fd\u6570\u5c06\u6570\u5b57\u4ece\u4e00\u79cd\u5ea6\u91cf\u7cfb\u7edf\u8f6c\u6362\u4e3a\u53e6\u4e00\u79cd\u5ea6\u91cf\u7cfb\u7edf\u3002', [
            parameterDescription('number'),
            parameterDescription('from_unit'),
            parameterDescription('to_unit')
        ]),
        'CORREL': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u6570\u636e\u96c6\u4e4b\u95f4\u7684\u76f8\u5173\u7cfb\u6570\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'COS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6570\u5b57\u7684\u4f59\u5f26\u503c\u3002', [
            parameterDescription('number')
        ]),
        'COSH': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6570\u5b57\u7684\u53cc\u66f2\u4f59\u5f26\u503c\u3002', [
            parameterDescription('number')
        ]),
        'COUNT': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u53c2\u6570\u5217\u8868\u4e2d\u6570\u5b57\u7684\u4e2a\u6570\u3002', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'COUNTA': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u533a\u57df\u4e2d\u4e0d\u4e3a\u7a7a\u7684\u5355\u5143\u683c\u7684\u4e2a\u6570\u3002', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'COUNTBLANK': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u6307\u5b9a\u5355\u5143\u683c\u533a\u57df\u4e2d\u7a7a\u767d\u5355\u5143\u683c\u7684\u4e2a\u6570\u3002', [
            parameterDescription('cellrange')
        ]),
        'COUNTIF': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u533a\u57df\u5185\u7b26\u5408\u7ed9\u5b9a\u6761\u4ef6\u7684\u5355\u5143\u683c\u7684\u6570\u91cf\u3002', [
            parameterDescription('cellrange'),
            parameterDescription('criteria')
        ]),
        'COUNTIFS': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u533a\u57df\u5185\u7b26\u5408\u591a\u4e2a\u6761\u4ef6\u7684\u5355\u5143\u683c\u7684\u6570\u91cf\u3002', [
            parameterDescription('criteria_range1', true),
            parameterDescription('criteria1', true)
        ]),
        'COUPDAYBS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ece\u4ed8\u606f\u671f\u5f00\u59cb\u5230\u6210\u4ea4\u65e5\u4e4b\u95f4\u7684\u5929\u6570\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPDAYS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5305\u542b\u6210\u4ea4\u65e5\u7684\u4ed8\u606f\u5929\u6570\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPDAYSNC': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ece\u7ed3\u7b97\u65e5\u5230\u4e0b\u4e00\u4ed8\u606f\u65e5\u4e4b\u95f4\u7684\u5929\u6570\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPNCD': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u8868\u793a\u5728\u7ed3\u7b97\u65e5\u4e4b\u540e\u4e0b\u4e00\u4e2a\u4ed8\u606f\u65e5\u7684\u6570\u5b57\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPNUM': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5728\u7ed3\u7b97\u65e5\u548c\u5230\u671f\u65e5\u4e4b\u95f4\u4ed8\u606f\u6b21\u6570\uff0c\u5411\u4e0a\u820d\u5165\u5230\u6700\u8fd1\u7684\u6574\u6570\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COUPPCD': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u8868\u793a\u7ed3\u7b97\u65e5\u4e4b\u524d\u7684\u4ed8\u606f\u65e5\u7684\u6570\u5b57\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'COVAR': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u534f\u65b9\u5dee\uff0c\u5373\u4e24\u4e2a\u6570\u636e\u96c6\u4e2d\u6bcf\u5bf9\u6570\u636e\u70b9\u7684\u504f\u5dee\u4e58\u79ef\u7684\u5e73\u5747\u503c\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'CRITBINOM': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u7d2f\u79ef\u4e8c\u9879\u5f0f\u5206\u5e03\u5927\u4e8e\u7b49\u4e8e\u4e34\u754c\u503c\u7684\u6700\u5c0f\u503c\u3002', [
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('alpha')
        ]),
        'CUMIPMT': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u4ed8\u6b3e\u671f\u4e4b\u95f4\u7d2f\u79ef\u652f\u4ed8\u7684\u5229\u606f\u3002', [
            parameterDescription('rate'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('start_period'),
            parameterDescription('end_period'),
            parameterDescription('paytype')
        ]),
        'CUMPRINC': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u4ed8\u6b3e\u671f\u4e4b\u95f4\u4e3a\u8d37\u6b3e\u7d2f\u79ef\u652f\u4ed8\u7684\u672c\u91d1\u3002', [
            parameterDescription('rate'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('start_period'),
            parameterDescription('end_period'),
            parameterDescription('paytype')
        ]),
        'DATE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56deDateTime\u5bf9\u8c61\uff0c\u4ee3\u8868\u4e86\u4e00\u4e2a\u72ec\u6709\u7684\u65e5\u671f\uff0c\u901a\u8fc7\u5b9a\u5236\u5e74\uff0c\u6708\u548c\u65e5\u3002', [
            parameterDescription('year'),
            parameterDescription('month'),
            parameterDescription('day')
        ]),
        'DATEDIF': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u65e5\u671f\u95f4\u7684\u5929\uff0c\u6708\u548c\u5e74\u7684\u6570\u76ee\u3002', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('unit')
        ]),
        'DATEVALUE': functionDescription('\u8be5\u51fd\u6570\u5c06\u6587\u672c\u683c\u5f0f\u7684\u65e5\u671f\u8f6c\u6362\u4e3a\u65e5\u671f\u5bf9\u8c61\u3002', [
            parameterDescription('date_text')
        ]),
        'DAVERAGE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u6ee1\u8db3\u6307\u5b9a\u6761\u4ef6\u7684\u8bb0\u5f55\u5b57\u6bb5\uff08\u5217\uff09\u4e2d\u7684\u6570\u503c\u7684\u5e73\u5747\u503c\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DAY': functionDescription('\u8be5\u51fd\u6570\u5c06\u5e8f\u5217\u53f7\u8f6c\u6362\u4e3a\u6708\u4efd\u65e5\u671f\u3002', [
            parameterDescription('date')
        ]),
        'DAYS360': functionDescription('\u8be5\u51fd\u6570\u4ee5\u4e00\u5e74360\u5929\u4e3a\u57fa\u51c6\u8ba1\u7b97\u4e24\u4e2a\u65e5\u671f\u95f4\u7684\u5929\u6570\u3002', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('method')
        ]),
        'DB': functionDescription('\u8be5\u51fd\u6570\u4f7f\u7528\u56fa\u5b9a\u4f59\u989d\u9012\u51cf\u6cd5\uff0c\u8fd4\u56de\u4e00\u7b14\u8d44\u4ea7\u5728\u7ed9\u5b9a\u671f\u95f4\u5185\u7684\u6298\u65e7\u503c\u3002', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life'),
            parameterDescription('period'),
            parameterDescription('month')
        ]),
        'DCOUNT': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u6570\u636e\u5e93\u4e2d\u5305\u542b\u6570\u5b57\u7684\u5355\u5143\u683c\u7684\u6570\u91cf\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DCOUNTA': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u6570\u636e\u5e93\u4e2d\u975e\u7a7a\u5355\u5143\u683c\u7684\u6570\u91cf\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DDB': functionDescription('\u8be5\u51fd\u6570\u4f7f\u7528\u53cc\u500d\u4f59\u989d\u9012\u51cf\u6cd5\u6216\u5176\u4ed6\u6307\u5b9a\u65b9\u6cd5\uff0c\u8fd4\u56de\u4e00\u7b14\u8d44\u4ea7\u5728\u7ed9\u5b9a\u671f\u95f4\u5185\u7684\u6298\u65e7\u503c\u3002', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life'),
            parameterDescription('period'),
            parameterDescription('factor')
        ]),
        'DEC2BIN': functionDescription('\u8be5\u51fd\u6570\u5c06\u5341\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u4e8c\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'DEC2HEX': functionDescription('\u8be5\u51fd\u6570\u5c06\u5341\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u5341\u516d\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'DEC2OCT': functionDescription('\u8be5\u51fd\u6570\u5c06\u5341\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u516b\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'DEGREES': functionDescription('\u8be5\u51fd\u6570\u5c06\u5f27\u5ea6\u8f6c\u6362\u4e3a\u5ea6\u3002', [
            parameterDescription('angle')
        ]),
        'DELTA': functionDescription('\u8be5\u51fd\u6570\u6d4b\u8bd5\u4e24\u4e2a\u6570\u503c\u662f\u5426\u76f8\u7b49\u3002\u5982\u679cnumber1= number2\uff0c\u5219\u8fd4\u56de1\uff0c\u5426\u5219\u8fd4\u56de0\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'DEVSQ': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6570\u636e\u70b9\u4e0e\u5404\u81ea\u6837\u672c\u5e73\u5747\u503c\u504f\u5dee\u7684\u5e73\u65b9\u548c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'DGET': functionDescription('\u8be5\u51fd\u6570\u4ece\u5217\u8868\u6216\u6570\u636e\u5e93\u7684\u5217\u4e2d\u63d0\u53d6\u7b26\u5408\u6307\u5b9a\u6761\u4ef6\u7684\u5355\u4e2a\u503c\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DISC': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6709\u4ef7\u8bc1\u5238\u7684\u8d34\u73b0\u7387\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('basis')
        ]),
        'DMAX': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u6ee1\u8db3\u6307\u5b9a\u6761\u4ef6\u7684\u8bb0\u5f55\u5b57\u6bb5\uff08\u5217\uff09\u4e2d\u7684\u6700\u5927\u6570\u5b57\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DMIN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u6ee1\u8db3\u6307\u5b9a\u6761\u4ef6\u7684\u8bb0\u5f55\u5b57\u6bb5\uff08\u5217\uff09\u4e2d\u7684\u6700\u5c0f\u6570\u5b57\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DOLLAR': functionDescription('\u8be5\u51fd\u6570\u4f9d\u7167\u8d27\u5e01\u683c\u5f0f\u5c06\u5c0f\u6570\u56db\u820d\u4e94\u5165\u5230\u6307\u5b9a\u7684\u4f4d\u6570\u5e76\u8f6c\u6362\u6210\u6587\u672c\u3002', [
            parameterDescription('number'),
            parameterDescription('decimals')
        ]),
        'DOLLARDE': functionDescription('\u8be5\u51fd\u6570\u5c06\u6309\u5206\u6570\u8868\u793a\u7684\u4ef7\u683c\u8f6c\u6362\u4e3a\u6309\u5c0f\u6570\u8868\u793a\u7684\u4ef7\u683c\u3002', [
            parameterDescription('fractional_dollar'),
            parameterDescription('fraction')
        ]),
        'DOLLARFR': functionDescription('\u8be5\u51fd\u6570\u5c06\u4ee5\u5c0f\u6570\u8868\u793a\u7684\u4ef7\u683c\u8f6c\u6362\u4e3a\u4ee5\u5206\u6570\u8868\u793a\u7684\u4ef7\u683c\u3002', [
            parameterDescription('decimal_dollar'),
            parameterDescription('fraction')
        ]),
        'DPRODUCT': functionDescription('\u8be5\u51fd\u6570\u5c06\u6570\u636e\u5e93\u4e2d\u7b26\u5408\u6761\u4ef6\u7684\u8bb0\u5f55\u7684\u7279\u5b9a\u5b57\u6bb5\u4e2d\u7684\u503c\u76f8\u4e58\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DSTDEV': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5229\u7528\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u6ee1\u8db3\u6307\u5b9a\u6761\u4ef6\u7684\u8bb0\u5f55\u5b57\u6bb5\uff08\u5217\uff09\u4e2d\u7684\u6570\u5b57\u4f5c\u4e3a\u4e00\u4e2a\u6837\u672c\u4f30\u7b97\u51fa\u7684\u6837\u672c\u603b\u4f53\u6807\u51c6\u504f\u5dee\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DSTDEVP': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5229\u7528\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u6ee1\u8db3\u6307\u5b9a\u6761\u4ef6\u7684\u8bb0\u5f55\u5b57\u6bb5\uff08\u5217\uff09\u4e2d\u7684\u6570\u5b57\u4f5c\u4e3a\u6837\u672c\u603b\u4f53\u8ba1\u7b97\u51fa\u7684\u603b\u4f53\u6807\u51c6\u504f\u5dee\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DSUM': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u6ee1\u8db3\u6307\u5b9a\u6761\u4ef6\u7684\u8bb0\u5f55\u5b57\u6bb5\uff08\u5217\uff09\u4e2d\u7684\u6570\u5b57\u4e4b\u548c\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DURATION': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5047\u8bbe\u9762\u503c \uffe5100 \u7684\u5b9a\u671f\u4ed8\u606f\u6709\u4ef7\u8bc1\u5238\u7684\u4fee\u6b63\u671f\u9650\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('coupon'),
            parameterDescription('yield'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'DVAR': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5229\u7528\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u6ee1\u8db3\u6307\u5b9a\u6761\u4ef6\u7684\u8bb0\u5f55\u5b57\u6bb5\uff08\u5217\uff09\u4e2d\u7684\u6570\u5b57\u4f5c\u4e3a\u4e00\u4e2a\u6837\u672c\u4f30\u7b97\u51fa\u7684\u6837\u672c\u603b\u4f53\u65b9\u5dee\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'DVARP': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5229\u7528\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u6ee1\u8db3\u6307\u5b9a\u6761\u4ef6\u7684\u8bb0\u5f55\u5b57\u6bb5\uff08\u5217\uff09\u4e2d\u7684\u6570\u5b57\u4f5c\u4e3a\u6837\u672c\u603b\u4f53\u8ba1\u7b97\u51fa\u7684\u6837\u672c\u603b\u4f53\u65b9\u5dee\u3002', [
            parameterDescription('database'),
            parameterDescription('field'),
            parameterDescription('criteria')
        ]),
        'EDATE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u7528\u4e8e\u8868\u793a\u5f00\u59cb\u65e5\u671f\u4e4b\u524d\u6216\u4e4b\u540e\u6708\u6570\u7684\u65e5\u671f\u7684\u5e8f\u5217\u53f7\u3002', [
            parameterDescription('start_date'),
            parameterDescription('months')
        ]),
        'EFFECT': functionDescription('\u8be5\u51fd\u6570\u5229\u7528\u7ed9\u5b9a\u7684\u540d\u4e49\u5e74\u5229\u7387\u548c\u6bcf\u5e74\u7684\u590d\u5229\u671f\u6570\uff0c\u8ba1\u7b97\u6709\u6548\u7684\u5e74\u5229\u7387\u3002', [
            parameterDescription('nominal_rate'),
            parameterDescription('npery')
        ]),
        'EOMONTH': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u6708\u6570\u4e4b\u524d\u6216\u4e4b\u540e\u7684\u6708\u4efd\u7684\u6700\u540e\u4e00\u5929\u7684\u5e8f\u5217\u53f7\u3002', [
            parameterDescription('start_date'),
            parameterDescription('months')
        ]),
        'ERF': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u8bef\u5dee\u51fd\u6570\u5728\u4e0a\u4e0b\u9650\u4e4b\u95f4\u7684\u79ef\u5206\u3002', [
            parameterDescription('lower_limit'),
            parameterDescription('upper_limit')
        ]),
        'ERFC': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ece x \u5230 \u221e\uff08\u65e0\u7a77\uff09\u79ef\u5206\u7684 ERF \u51fd\u6570\u7684\u8865\u4f59\u8bef\u5dee\u51fd\u6570\u3002', [
            parameterDescription('lowerlimit')
        ]),
        'ERROR.TYPE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u5bf9\u5e94\u4e8e\u9519\u8bef\u7c7b\u578b\u7684\u6570\u5b57\u3002', [
            parameterDescription('error_val')
        ]),
        'EURO': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e00\u6b27\u5143\u7b49\u4ef7\u8d27\u5e01\u91d1\u989d\uff0c\u57fa\u4e8eISO\u8d27\u5e01\u4ee3\u7801\u3002', [
            parameterDescription('code')
        ]),
        'EUROCONVERT': functionDescription('\u8be5\u51fd\u6570\u5c06\u6570\u5b57\u8f6c\u6362\u4e3a\u6b27\u5143\u5f62\u5f0f\uff0c\u5c06\u6570\u5b57\u7531\u6b27\u5143\u5f62\u5f0f\u8f6c\u6362\u4e3a\u6b27\u76df\u6210\u5458\u56fd\u8d27\u5e01\u5f62\u5f0f\uff0c\u6216\u5229\u7528\u6b27\u5143\u4f5c\u4e3a\u4e2d\u95f4\u8d27\u5e01\u5c06\u6570\u5b57\u7531\u67d0\u4e00\u6b27\u76df\u6210\u5458\u56fd\u8d27\u5e01\u8f6c\u5316\u4e3a\u53e6\u4e00\u6b27\u76df\u6210\u5458\u56fd\u8d27\u5e01\u7684\u5f62\u5f0f\uff08\u4e09\u89d2\u8f6c\u6362\u5173\u7cfb\uff09\u3002\u53ea\u6709\u91c7\u7528\u4e86\u6b27\u5143\u7684\u6b27\u76df (EU) \u6210\u5458\u56fd\u8d27\u5e01\u624d\u80fd\u8fdb\u884c\u8fd9\u4e9b\u8f6c\u6362\u3002\u6b64\u51fd\u6570\u6240\u4f7f\u7528\u7684\u662f\u7531\u6b27\u76df (EU) \u5efa\u7acb\u7684\u56fa\u5b9a\u8f6c\u6362\u6c47\u7387\u3002', [
            parameterDescription('number'),
            parameterDescription('source'),
            parameterDescription('target'),
            parameterDescription('full_precision'),
            parameterDescription('triangulation_precision')
        ]),
        'EVEN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6cbf\u7edd\u5bf9\u503c\u589e\u5927\u65b9\u5411\u53d6\u6574\u540e\u6700\u63a5\u8fd1\u7684\u5076\u6570\u3002', [
            parameterDescription('number')
        ]),
        'EXACT': functionDescription('\u8be5\u51fd\u6570\u7528\u4e8e\u6bd4\u8f83\u4e24\u4e2a\u5b57\u7b26\u4e32\uff1a\u5982\u679c\u5b83\u4eec\u5b8c\u5168\u76f8\u540c\uff0c\u5219\u8fd4\u56de TRUE\uff1b\u5426\u5219\uff0c\u8fd4\u56de FALSE\u3002', [
            parameterDescription('text1'),
            parameterDescription('text2')
        ]),
        'EXP': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de e \u7684 n \u6b21\u65b9\u3002', [
            parameterDescription('number')
        ]),
        'EXPONDIST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6307\u6570\u5206\u5e03\u3002', [
            parameterDescription('value'),
            parameterDescription('lambda'),
            parameterDescription('cumulative')
        ]),
        'FACT': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6570\u5b57\u7684\u9636\u4e58\u3002', [
            parameterDescription('number')
        ]),
        'FACTDOUBLE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6570\u5b57\u7684\u53cc\u500d\u9636\u4e58\u3002', [
            parameterDescription('number')
        ]),
        'FALSE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u903b\u8f91\u503c FALSE\u3002', []),
        'FDIST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de F \u6982\u7387\u5206\u5e03\u3002\u4f7f\u7528\u6b64\u51fd\u6570\u53ef\u4ee5\u786e\u5b9a\u4e24\u4e2a\u6570\u636e\u96c6\u662f\u5426\u5b58\u5728\u53d8\u5316\u7a0b\u5ea6\u4e0a\u7684\u4e0d\u540c\u3002', [
            parameterDescription('value'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'FIND': functionDescription('\u8be5\u51fd\u6570\u5728\u4e00\u4e2a\u6587\u672c\u503c\u4e2d\u67e5\u627e\u53e6\u4e00\u4e2a\u6587\u672c\u503c\uff08\u533a\u5206\u5927\u5c0f\u5199\uff09\u3002', [
            parameterDescription('find_text'),
            parameterDescription('within_text'),
            parameterDescription(START_NUMBER)
        ]),
        'FINV': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de F \u6982\u7387\u5206\u5e03\u7684\u53cd\u51fd\u6570\u503c\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'FISHER': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de Fisher \u53d8\u6362\u503c\u3002', [
            parameterDescription('value')
        ]),
        'FISHERINV': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de Fisher \u53d8\u6362\u7684\u53cd\u51fd\u6570\u503c\u3002', [
            parameterDescription('value')
        ]),
        'FIXED': functionDescription('\u8be5\u51fd\u6570\u5c06\u6570\u5b57\u6309\u6307\u5b9a\u7684\u5c0f\u6570\u4f4d\u6570\u8fdb\u884c\u53d6\u6574\uff0c\u5229\u7528\u53e5\u53f7\u548c\u9017\u53f7\uff0c\u4ee5\u5c0f\u6570\u683c\u5f0f\u5bf9\u8be5\u6570\u8fdb\u884c\u683c\u5f0f\u8bbe\u7f6e\uff0c\u5e76\u4ee5\u6587\u672c\u5f62\u5f0f\u8fd4\u56de\u7ed3\u679c\u3002', [
            parameterDescription('number'),
            parameterDescription('decimals'),
            parameterDescription('no_commas')
        ]),
        'FLOOR': functionDescription('\u8be5\u51fd\u6570\u5411\u7edd\u5bf9\u503c\u51cf\u5c0f\u7684\u65b9\u5411\u820d\u5165\u6570\u5b57\u3002', [
            parameterDescription('number'),
            parameterDescription('significance')
        ]),
        'FORECAST': functionDescription('\u8be5\u51fd\u6570\u6839\u636e\u5df2\u6709\u7684\u6570\u503c\u8ba1\u7b97\u6216\u9884\u6d4b\u672a\u6765\u503c\u3002', [
            parameterDescription('value'),
            parameterDescription('Yarray'),
            parameterDescription('Xarray')
        ]),
        'FREQUENCY': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u6570\u503c\u5728\u67d0\u4e2a\u533a\u57df\u5185\u7684\u51fa\u73b0\u9891\u7387\uff0c\u7136\u540e\u8fd4\u56de\u4e00\u4e2a\u5782\u76f4\u6570\u7ec4\u3002', [
            parameterDescription('data_array'),
            parameterDescription('bins_array')
        ]),
        'FTEST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de F \u68c0\u9a8c\u7684\u7ed3\u679c\u3002F \u68c0\u9a8c\u8fd4\u56de\u7684\u662f\u5f53\u6570\u7ec4 1 \u548c\u6570\u7ec4 2 \u7684\u65b9\u5dee\u65e0\u660e\u663e\u5dee\u5f02\u65f6\u7684\u5355\u5c3e\u6982\u7387\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'FV': functionDescription('\u8be5\u51fd\u6570\u57fa\u4e8e\u56fa\u5b9a\u5229\u7387\u53ca\u7b49\u989d\u5206\u671f\u4ed8\u6b3e\u65b9\u5f0f\uff0c\u8fd4\u56de\u67d0\u9879\u6295\u8d44\u7684\u672a\u6765\u503c\u3002', [
            parameterDescription('rate'),
            parameterDescription('numper'),
            parameterDescription('paymt'),
            parameterDescription('pval'),
            parameterDescription('type')
        ]),
        'FVSCHEDULE': functionDescription('\u8be5\u51fd\u6570\u57fa\u4e8e\u4e00\u7cfb\u5217\u590d\u5229\u8fd4\u56de\u672c\u91d1\u7684\u672a\u6765\u503c\u3002\u51fd\u6570 FVSCHEDULE \u7528\u4e8e\u8ba1\u7b97\u67d0\u9879\u6295\u8d44\u5728\u53d8\u52a8\u6216\u53ef\u8c03\u5229\u7387\u4e0b\u7684\u672a\u6765\u503c\u3002', [
            parameterDescription('principal'),
            parameterDescription('schedule')
        ]),
        'GAMMADIST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de \u03b3 \u5206\u5e03\u3002', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative')
        ]),
        'GAMMAINV': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de \u03b3 \u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('alpha'),
            parameterDescription('beta')
        ]),
        'GAMMALN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de \u03b3 \u51fd\u6570\u7684\u81ea\u7136\u5bf9\u6570\uff0c\u0393(x)\u3002', [
            parameterDescription('value')
        ]),
        'GCD': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6700\u5927\u516c\u7ea6\u6570\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'GEOMEAN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u6b63\u6570\u6570\u7ec4\u6216\u533a\u57df\u7684\u51e0\u4f55\u5e73\u5747\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'GESTEP': functionDescription('\u8be5\u51fd\u6570\u68c0\u9a8c\u6570\u5b57\u662f\u5426\u5927\u4e8e\u9608\u503c\u3002', [
            parameterDescription('number'),
            parameterDescription('step')
        ]),
        'GROWTH': functionDescription('\u8be5\u51fd\u6570\u6839\u636e\u73b0\u6709\u7684\u6570\u636e\u9884\u6d4b\u6307\u6570\u589e\u957f\u503c\u3002\u6839\u636e\u73b0\u6709\u7684 x \u503c\u548c y \u503c\uff0cGROWTH \u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u65b0\u7684 x \u503c\u5bf9\u5e94\u7684 y \u503c\u3002', [
            parameterDescription('y'),
            parameterDescription('x'),
            parameterDescription('newx'),
            parameterDescription('constant')
        ]),
        'HARMEAN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u8c03\u548c\u5e73\u5747\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'HEX2BIN': functionDescription('\u8be5\u51fd\u6570\u5c06\u5341\u516d\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u4e8c\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'HEX2DEC': functionDescription('\u8be5\u51fd\u6570\u5c06\u5341\u516d\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u5341\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number')
        ]),
        'HEX2OCT': functionDescription('\u8be5\u51fd\u6570\u5c06\u5341\u516d\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u516b\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'HLOOKUP': functionDescription('\u8be5\u51fd\u6570\u67e5\u627e\u6570\u7ec4\u7684\u9996\u884c\uff0c\u5e76\u8fd4\u56de\u6307\u5b9a\u5355\u5143\u683c\u7684\u503c\u3002', [
            parameterDescription('lookup_value'),
            parameterDescription('table_array'),
            parameterDescription('row_index_num'),
            parameterDescription('range_lookup')
        ]),
        'HOUR': functionDescription('\u8fd4\u56de\u65f6\u95f4\u503c\u7684\u5c0f\u65f6\u6570\u3002', [
            parameterDescription('time')
        ]),
        'HYPGEOMDIST': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u8d85\u51e0\u4f55\u5206\u5e03\u3002 ', [
            parameterDescription('sample_s'),
            parameterDescription('number_sample'),
            parameterDescription('population_s'),
            parameterDescription('number_pop')
        ]),
        'IF': functionDescription('\u4f7f\u7528\u903b\u8f91\u51fd\u6570 IF \u51fd\u6570\u65f6\uff0c\u5982\u679c\u6761\u4ef6\u4e3a\u771f\uff0c\u8be5\u51fd\u6570\u5c06\u8fd4\u56de\u4e00\u4e2a\u503c\uff1b\u5982\u679c\u6761\u4ef6\u4e3a\u5047\uff0c\u51fd\u6570\u5c06\u8fd4\u56de\u53e6\u4e00\u4e2a\u503c\u3002', [
            parameterDescription('logical_test'),
            parameterDescription('value_if_true'),
            parameterDescription('value_if_false')
        ]),
        'IFERROR': functionDescription('\u8be5\u51fd\u6570\u5982\u679c\u516c\u5f0f\u7684\u8ba1\u7b97\u7ed3\u679c\u9519\u8bef\uff0c\u5219\u8fd4\u56de\u60a8\u6307\u5b9a\u7684\u503c\uff1b\u5426\u5219\u8fd4\u56de\u516c\u5f0f\u7684\u7ed3\u679c\u3002', [
            parameterDescription('value'),
            parameterDescription('value_if_error')
        ]),
        'IMABS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u590d\u6570\u7684\u7edd\u5bf9\u503c\uff08\u6a21\u6570\uff09\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMAGINARY': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u590d\u6570\u7684\u865a\u7cfb\u6570\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMARGUMENT': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u53c2\u6570 theta\uff0c\u5373\u4ee5\u5f27\u5ea6\u8868\u793a\u7684\u89d2\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMCONJUGATE': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u5171\u8f6d\u590d\u6570\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMCOS': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u4f59\u5f26\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMDIV': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u4e24\u4e2a\u590d\u6570\u7684\u5546\u3002', [
            parameterDescription('complexnum'),
            parameterDescription('complexdenom')
        ]),
        'IMEXP': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u6307\u6570\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMLN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u81ea\u7136\u5bf9\u6570\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMLOG2': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u4ee5 2 \u4e3a\u5e95\u6570\u7684\u5bf9\u6570\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMLOG10': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x + yi \u6216 x + yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u5e38\u7528\u5bf9\u6570\uff08\u4ee5 10 \u4e3a\u5e95\u6570\uff09\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMPOWER': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684 n \u6b21\u5e42\u3002', [
            parameterDescription('complexnum'),
            parameterDescription('powernum')
        ]),
        'IMPRODUCT': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684 1 \u81f3 29 \u4e2a\u590d\u6570\u7684\u4e58\u79ef\u3002', [
            parameterDescription('complexnum1'),
            parameterDescription('complexnum2', true)
        ]),
        'IMREAL': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u5b9e\u7cfb\u6570\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMSIN': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u6b63\u5f26\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMSQRT': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u5e73\u65b9\u6839\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMSUB': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u4e24\u4e2a\u590d\u6570\u7684\u5dee\u3002', [
            parameterDescription('complexnum1'),
            parameterDescription('complexnum2')
        ]),
        'IMSUM': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u4e24\u4e2a\u6216\u591a\u4e2a\u590d\u6570\u7684\u548c\u3002', [
            parameterDescription('complexnum1'),
            parameterDescription('complexnum2', true)
        ]),
        'INDEX': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u8868\u683c\u6216\u533a\u57df\u4e2d\u7684\u503c\u6216\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('row_num'),
            parameterDescription('column_num'),
            parameterDescription('area_num')
        ]),
        'INDIRECT': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u7531\u6587\u672c\u5b57\u7b26\u4e32\u6307\u5b9a\u7684\u5f15\u7528\u3002', [
            parameterDescription('ref_text'),
            parameterDescription('[a1_style]')
        ]),
        'INT': functionDescription('\u8be5\u51fd\u6570\u5c06\u6570\u5b57\u5411\u4e0b\u820d\u5165\u5230\u6700\u63a5\u8fd1\u7684\u6574\u6570\u3002', [
            parameterDescription('number')
        ]),
        'INTERCEPT': functionDescription('\u8be5\u51fd\u6570\u5229\u7528\u73b0\u6709\u7684 x \u503c\u4e0e y \u503c\u8ba1\u7b97\u5e76\u8fd4\u56de\u76f4\u7ebf\u4e0e y \u8f74\u7684\u622a\u8ddd\u3002', [
            parameterDescription('dependent'),
            parameterDescription('independent')
        ]),
        'INTRATE': functionDescription('\u8be5\u51fd\u6570\u8ba1\u7b97\u5e76\u8fd4\u56de\u4e00\u6b21\u6027\u4ed8\u606f\u8bc1\u5238\u7684\u5229\u7387\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('investment'),
            parameterDescription('redemption'),
            parameterDescription('basis')
        ]),
        'IPMT': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u56fa\u5b9a\u5229\u7387\u53ca\u7b49\u989d\u5206\u671f\u4ed8\u6b3e\u65b9\u5f0f\uff0c\u8fd4\u56de\u7ed9\u5b9a\u671f\u6570\u5185\u5bf9\u6295\u8d44\u7684\u5229\u606f\u507f\u8fd8\u989d\u3002', [
            parameterDescription('rate'),
            parameterDescription('per'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'IRR': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u7531\u6570\u503c\u4ee3\u8868\u7684\u4e00\u7ec4\u73b0\u91d1\u6d41\u7684\u5185\u90e8\u6536\u76ca\u7387\u3002', [
            parameterDescription('arrayvals'),
            parameterDescription('estimate')
        ]),
        'ISBLANK': functionDescription('\u8be5\u51fd\u6570\u68c0\u9a8c\u6307\u5b9a\u7684\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u4e3a\u7a7a\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISERR': functionDescription('\u8be5\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u4e3a\u9664\u53bb #N/A \u7684\u4efb\u610f\u9519\u8bef\u503c\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISERROR': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u4e3a\u4efb\u610f\u9519\u8bef\u503c\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISEVEN': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u4e3a\u5076\u6570\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISLOGICAL': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u662f\u4e00\u4e2a\u903b\u8f91\u503c\uff08\u5e03\u5c14\u578b\u503c\uff09\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISNA': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u5305\u542b\u503c\u4e0d\u5b58\u5728\uff08#N/A\uff09\u9519\u8bef\u503c\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISNONTEXT': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u4e3a\u4e0d\u662f\u6587\u672c\u7684\u4efb\u610f\u6570\u636e\u7c7b\u578b\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISNUMBER': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u662f\u6570\u503c\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISODD': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u4e3a\u5947\u6570\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISPMT': functionDescription('\u6b64\u51fd\u6570\u8ba1\u7b97\u7279\u5b9a\u6295\u8d44\u671f\u5185\u8981\u652f\u4ed8\u7684\u5229\u606f\u3002', [
            parameterDescription('rate'),
            parameterDescription('per'),
            parameterDescription('nper'),
            parameterDescription('pv')
        ]),
        'ISREF': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5230\u53e6\u5916\u5355\u5143\u683c\u7684\u5f15\u7528\u3002', [
            parameterDescription('cellreference')
        ]),
        'ISTEXT': functionDescription('\u6b64\u51fd\u6570\u68c0\u9a8c\u4e00\u4e2a\u503c\uff0c\u8868\u8fbe\u5f0f\u6216\u8005\u5f15\u7528\u5355\u5143\u683c\u7684\u5185\u5bb9\u662f\u5426\u662f\u6587\u672c\u578b\u6570\u636e\u3002', [
            parameterDescription('cellreference')
        ]),
        'KURT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u636e\u96c6\u7684\u5cf0\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2'),
            parameterDescription('number3'),
            parameterDescription('number4', true)
        ]),
        'LARGE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u636e\u96c6\u4e2d\u7b2c n \u4e2a\u6700\u5927\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('n')
        ]),
        'LCM': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6574\u6570\u7684\u6700\u5c0f\u516c\u500d\u6570\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'LEFT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7b2c\u4e00\u4e2a\u5b57\u7b26\u6216\u524d\u51e0\u4e2a\u5b57\u7b26\u3002', [
            parameterDescription('text'),
            parameterDescription('num_chars')
        ]),
        'LEN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7684\u5b57\u7b26\u6570\u3002', [
            parameterDescription('text')
        ]),
        'LINEST': functionDescription('\u6b64\u51fd\u6570\u8ba1\u7b97\u4e0e\u73b0\u6709\u6570\u636e\u6700\u4f73\u62df\u5408\u7684\u76f4\u7ebf\uff0c\u6765\u8ba1\u7b97\u67d0\u76f4\u7ebf\u7684\u7edf\u8ba1\u503c\uff0c\u7136\u540e\u8fd4\u56de\u63cf\u8ff0\u6b64\u76f4\u7ebf\u7684\u6570\u7ec4\u3002', [
            parameterDescription('y'),
            parameterDescription('x'),
            parameterDescription('constant'),
            parameterDescription('stats')
        ]),
        'LN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u6570\u5b57\u7684\u81ea\u7136\u5bf9\u6570\u3002', [
            parameterDescription('value')
        ]),
        'LOG': functionDescription('\u6b64\u51fd\u6570\u6309\u6240\u6307\u5b9a\u7684\u5e95\u6570\uff0c\u8fd4\u56de\u4e00\u4e2a\u6570\u7684\u5bf9\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('base')
        ]),
        'LOG10': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 10 \u4e3a\u5e95\u7684\u5bf9\u6570\u3002', [
            parameterDescription('number')
        ]),
        'LOGEST': functionDescription('\u6b64\u51fd\u6570\u5728\u56de\u5f52\u5206\u6790\u4e2d\uff0c\u8ba1\u7b97\u6700\u7b26\u5408\u6570\u636e\u7684\u6307\u6570\u56de\u5f52\u62df\u5408\u66f2\u7ebf\uff0c\u5e76\u8fd4\u56de\u63cf\u8ff0\u8be5\u66f2\u7ebf\u7684\u6570\u503c\u6570\u7ec4\u3002', [
            parameterDescription('y'),
            parameterDescription('x'),
            parameterDescription('constant'),
            parameterDescription('stats')
        ]),
        'LOGINV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de x \u7684\u5bf9\u6570\u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u7684\u53cd\u51fd\u6570\uff0c\u6b64\u5904\u7684 LN(x) \u662f\u542b\u6709 mean \u4e0e stdev \u53c2\u6570\u7684\u6b63\u6001\u5206\u5e03\u3002', [
            parameterDescription('probability'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'LOGNORMDIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de x \u7684\u5bf9\u6570\u7d2f\u79ef\u5206\u5e03\u51fd\u6570\uff0c\u5176\u4e2d ln(x) \u662f\u670d\u4ece\u53c2\u6570 mean \u548c stdev \u7684\u6b63\u6001\u5206\u5e03\u3002\u4f7f\u7528\u6b64\u51fd\u6570\u53ef\u4ee5\u5206\u6790\u7ecf\u8fc7\u5bf9\u6570\u53d8\u6362\u7684\u6570\u636e\u3002', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('standard_dev'),
        ]),
        'LOOKUP': functionDescription('\u6b64\u51fd\u6570\u53ef\u4ece\u5355\u884c\u6216\u5355\u5217\u533a\u57df\u6216\u8005\u4ece\u4e00\u4e2a\u6570\u7ec4\u8fd4\u56de\u503c\u3002LOOKUP \u51fd\u6570\u5177\u6709\u4e24\u79cd\u8bed\u6cd5\u5f62\u5f0f\uff1a\u5411\u91cf\u5f62\u5f0f\u548c\u6570\u7ec4\u5f62\u5f0f\u3002', [
            parameterDescription('lookup_value'),
            parameterDescription('lookup_vector'),
            parameterDescription('result_vector')
        ]),
        'LOWER': functionDescription('\u6b64\u51fd\u6570\u5c06\u4e00\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7684\u6240\u6709\u5927\u5199\u5b57\u6bcd\u8f6c\u6362\u4e3a\u5c0f\u5199\u5b57\u6bcd\u3002', [
            parameterDescription('text')
        ]),
        'MATCH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u503c\u5728\u5355\u5143\u683c\u533a\u57df\u4e2d\u7684\u76f8\u5bf9\u4f4d\u7f6e\u3002', [
            parameterDescription('lookup_value'),
            parameterDescription('lookup_array'),
            parameterDescription('match_type')
        ]),
        'XMATCH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u9879\u76ee\u5728\u6570\u7ec4\u4e2d\u7684\u76f8\u5bf9\u4f4d\u7f6e\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u9700\u8981\u7cbe\u786e\u5339\u914d\u3002', [
            parameterDescription('lookup_value'),
            parameterDescription('lookup_array'),
            parameterDescription('[match_mode]'),
            parameterDescription('[search_mode]')
        ]),
        'XLOOKUP': functionDescription('\u5728\u67d0\u4e2a\u8303\u56f4\u6216\u6570\u7ec4\u4e2d\u641c\u7d22\u5339\u914d\u9879\uff0c\u5e76\u901a\u8fc7\u7b2c\u4e8c\u4e2a\u8303\u56f4\u6216\u6570\u7ec4\u8fd4\u56de\u76f8\u5e94\u7684\u9879\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u4f7f\u7528\u7cbe\u786e\u5339\u914d\u3002', [
            parameterDescription('lookup_value'),
            parameterDescription('lookup_array'),
            parameterDescription('return_array'),
            parameterDescription('[if_not_found]'),
            parameterDescription('[match_mode]'),
            parameterDescription('[search_mode]')
        ]),
        'MAX': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u503c\u4e2d\u7684\u6700\u5927\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MAXA': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u5217\u8868\u4e2d\u7684\u6700\u5927\u503c\u3002', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'MDETERM': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u6570\u7ec4\u7684\u77e9\u9635\u884c\u5217\u5f0f\u7684\u503c\u3002', [
            parameterDescription('array')
        ]),
        'MDURATION': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5047\u8bbe\u9762\u503c \uffe5100 \u7684\u6709\u4ef7\u8bc1\u5238\u7684 Macauley \u4fee\u6b63\u671f\u9650\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('coupon'),
            parameterDescription('yield'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'MEDIAN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7ed9\u5b9a\u6570\u503c\u7684\u4e2d\u503c\u3002\u4e2d\u503c\u662f\u5728\u4e00\u7ec4\u6570\u503c\u4e2d\u5c45\u4e8e\u4e2d\u95f4\u7684\u6570\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MID': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u4ece\u6307\u5b9a\u4f4d\u7f6e\u5f00\u59cb\u7684\u7279\u5b9a\u6570\u76ee\u7684\u5b57\u7b26\uff0c\u8be5\u6570\u76ee\u7531\u7528\u6237\u6307\u5b9a\u3002', [
            parameterDescription('text'),
            parameterDescription('start_num'),
            parameterDescription('num_chars')
        ]),
        'MIN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u503c\u4e2d\u7684\u6700\u5c0f\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MINA': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u5305\u542b\u6587\u672c\u548c\u903b\u8f91\u503c\u7684\u503c\u4e2d\u7684\u6700\u5c0f\u503c\u3002', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'MINUTE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u65f6\u95f4\u503c\u4e2d\u7684\u5206\u949f\u3002\u4e3a\u4e00\u4e2a\u4ecb\u4e8e 0 \u5230 59 \u4e4b\u95f4\u7684\u6574\u6570\u3002', [
            parameterDescription('time')
        ]),
        'MINVERSE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u7ec4\u4e2d\u5b58\u50a8\u7684\u77e9\u9635\u7684\u9006\u8ddd\u9635\u3002', [
            parameterDescription('array')
        ]),
        'MIRR': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u4e00\u8fde\u7eed\u671f\u95f4\u5185\u73b0\u91d1\u6d41\u7684\u4fee\u6b63\u5185\u90e8\u6536\u76ca\u7387\u3002 \u51fd\u6570 MIRR \u540c\u65f6\u8003\u8651\u4e86\u6295\u8d44\u7684\u6210\u672c\u548c\u73b0\u91d1\u518d\u6295\u8d44\u7684\u6536\u76ca\u7387\u3002', [
            parameterDescription('values'),
            parameterDescription('finance_rate'),
            parameterDescription('reinvest_rate')
        ]),
        'MMULT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u6570\u7ec4\u7684\u77e9\u9635\u4e58\u79ef\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'MOD': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u6570\u76f8\u9664\u7684\u4f59\u6570\u3002', [
            parameterDescription('dividend'),
            parameterDescription('divisor')
        ]),
        'MODE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5728\u67d0\u4e00\u6570\u7ec4\u6216\u6570\u636e\u533a\u57df\u4e2d\u51fa\u73b0\u9891\u7387\u6700\u591a\u7684\u6570\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MONTH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5\u5e8f\u5217\u53f7\u8868\u793a\u7684\u65e5\u671f\u4e2d\u7684\u6708\u4efd\u3002', [
            parameterDescription('date')
        ]),
        'MROUND': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u6309\u6307\u5b9a\u57fa\u6570\u820d\u5165\u540e\u7684\u6570\u503c\u3002', [
            parameterDescription('number'),
            parameterDescription('multiple')
        ]),
        'MULTINOMIAL': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u548c\u7684\u9636\u4e58\u4e0e\u5404\u53c2\u6570\u9636\u4e58\u4e58\u79ef\u7684\u6bd4\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'MUNIT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u7ef4\u5ea6\u7684\u5355\u4f4d\u77e9\u9635\u3002', [
            parameterDescription('dimension'),
        ]),
        'N': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u8f6c\u5316\u4e3a\u6570\u503c\u540e\u7684\u503c\u3002', [
            parameterDescription('value')
        ]),
        'NA': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u9519\u8bef\u503c #N/A\u3002\u9519\u8bef\u503c #N/A \u8868\u793a\u201c\u65e0\u6cd5\u5f97\u5230\u6709\u6548\u503c\u201d\u3002', []),
        'SHEET': functionDescription('\u8fd4\u56de\u5f15\u7528\u5de5\u4f5c\u8868\u7684\u5de5\u4f5c\u8868\u7f16\u53f7\u3002', [
            parameterDescription('[value]'),
        ]),
        'SHEETS': functionDescription('\u8fd4\u56de\u5f15\u7528\u4e2d\u7684\u5de5\u4f5c\u8868\u6570\u3002', [
            parameterDescription('[reference]')
        ]),
        'NEGBINOMDIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u8d1f\u4e8c\u9879\u5f0f\u5206\u5e03\u3002', [
            parameterDescription('number_f'),
            parameterDescription('number_s'),
            parameterDescription('probability_s')
        ]),
        'NETWORKDAYS': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u5f00\u59cb\u65e5\u671f\u548c\u7ed3\u675f\u65e5\u671f\u4e4b\u95f4\u5b8c\u6574\u7684\u5de5\u4f5c\u65e5\u6570\u503c\u3002 \u5de5\u4f5c\u65e5\u4e0d\u5305\u62ec\u5468\u672b\u548c\u4e13\u95e8\u6307\u5b9a\u7684\u5047\u671f\u3002', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('holidays')
        ]),
        'NOMINAL': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u7ed9\u5b9a\u7684\u5b9e\u9645\u5229\u7387\u548c\u5e74\u590d\u5229\u671f\u6570\uff0c\u8fd4\u56de\u540d\u4e49\u5e74\u5229\u7387\u3002', [
            parameterDescription('effect_rate'),
            parameterDescription('npery')
        ]),
        'NORMDIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u5e73\u5747\u503c\u548c\u6807\u51c6\u504f\u5dee\u7684\u6b63\u6001\u5206\u5e03\u51fd\u6570\u3002 \u6b64\u51fd\u6570\u5728\u7edf\u8ba1\u65b9\u9762\u5e94\u7528\u8303\u56f4\u5e7f\u6cdb\uff08\u5305\u62ec\u5047\u8bbe\u68c0\u9a8c\uff09\u3002', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('standard_dev'),
            parameterDescription('cumulative')
        ]),
        'NORMINV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u5e73\u5747\u503c\u548c\u6807\u51c6\u504f\u5dee\u7684\u6b63\u6001\u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'NORMSDIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6807\u51c6\u6b63\u6001\u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u3002', [
            parameterDescription('value')
        ]),
        'NORMSINV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6807\u51c6\u6b63\u6001\u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u7684\u53cd\u51fd\u6570\u3002\u8be5\u5206\u5e03\u7684\u5e73\u5747\u503c\u4e3a 0\uff0c\u6807\u51c6\u504f\u5dee\u4e3a 1\u3002', [
            parameterDescription('probability')
        ]),
        'NOT': functionDescription('\u6b64\u51fd\u6570\u5bf9\u53c2\u6570\u503c\u6c42\u53cd\u3002\u5f53\u8981\u786e\u4fdd\u4e00\u4e2a\u503c\u4e0d\u7b49\u4e8e\u67d0\u4e00\u7279\u5b9a\u503c\u65f6\uff0c\u53ef\u4ee5\u4f7f\u7528 NOT \u51fd\u6570\u3002', [
            parameterDescription('logical')
        ]),
        'NOW': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5f53\u524d\u7684\u65e5\u671f\u548c\u65f6\u95f4\u3002', []),
        'NPER': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u56fa\u5b9a\u5229\u7387\u53ca\u7b49\u989d\u5206\u671f\u4ed8\u6b3e\u65b9\u5f0f\uff0c\u8fd4\u56de\u67d0\u9879\u6295\u8d44\u7684\u603b\u671f\u6570\u3002', [
            parameterDescription('rate'),
            parameterDescription('paymt'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'NPV': functionDescription('\u6b64\u51fd\u6570\u901a\u8fc7\u4f7f\u7528\u8d34\u73b0\u7387\u4ee5\u53ca\u4e00\u7cfb\u5217\u672a\u6765\u652f\u51fa\uff08\u8d1f\u503c\uff09\u548c\u6536\u5165\uff08\u6b63\u503c\uff09\uff0c\u8fd4\u56de\u4e00\u9879\u6295\u8d44\u7684\u51c0\u73b0\u503c\u3002', [
            parameterDescription('rate'),
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'OBJECT': functionDescription('\u6b64\u51fd\u6570\u5c06\u5c5e\u6027\u4ee5\u53ca\u8868\u8fbe\u5f0f\u7684\u7ec4\u5408\u5e8f\u5217\u8f6c\u6362\u4e3a\u5bf9\u8c61\u3002', [
            parameterDescription('property1', true),
            parameterDescription('expression1', true)
        ]),
        'OCT2BIN': functionDescription('\u6b64\u51fd\u6570\u5c06\u516b\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u4e8c\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'OCT2DEC': functionDescription('\u6b64\u51fd\u6570\u5c06\u516b\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u5341\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number')
        ]),
        'OCT2HEX': functionDescription('\u6b64\u51fd\u6570\u5c06\u516b\u8fdb\u5236\u6570\u8f6c\u6362\u4e3a\u5341\u516d\u8fdb\u5236\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('places')
        ]),
        'ODD': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5bf9\u6307\u5b9a\u6570\u503c\u8fdb\u884c\u5411\u4e0a\u820d\u5165\u540e\u7684\u5947\u6570\u3002', [
            parameterDescription('number')
        ]),
        'ODDFPRICE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u9996\u671f\u4ed8\u606f\u65e5\u4e0d\u56fa\u5b9a\uff08\u957f\u671f\u6216\u77ed\u671f\uff09\u7684\u9762\u503c \uffe5100 \u7684\u6709\u4ef7\u8bc1\u5238\u4ef7\u683c\u3002', [
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
        'ODDFYIELD': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u9996\u671f\u4ed8\u606f\u65e5\u4e0d\u56fa\u5b9a\u7684\u6709\u4ef7\u8bc1\u5238\uff08\u957f\u671f\u6216\u77ed\u671f\uff09\u7684\u6536\u76ca\u7387\u3002', [
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
        'ODDLPRICE': functionDescription('T\u6b64\u51fd\u6570\u8fd4\u56de\u672b\u671f\u4ed8\u606f\u65e5\u4e0d\u56fa\u5b9a\u7684\u9762\u503c \uffe5100 \u7684\u6709\u4ef7\u8bc1\u5238\uff08\u957f\u671f\u6216\u77ed\u671f\uff09\u7684\u4ef7\u683c\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('last_interest'),
            parameterDescription('rate'),
            parameterDescription('yield'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'ODDLYIELD': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u672b\u671f\u4ed8\u606f\u65e5\u4e0d\u56fa\u5b9a\u7684\u6709\u4ef7\u8bc1\u5238\uff08\u957f\u671f\u6216\u77ed\u671f\uff09\u7684\u6536\u76ca\u7387\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('last_interest'),
            parameterDescription('rate'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'OFFSET': functionDescription('\u6b64\u51fd\u6570\u4ee5\u6307\u5b9a\u7684\u5f15\u7528\u4e3a\u53c2\u7167\u7cfb\uff0c\u901a\u8fc7\u7ed9\u5b9a\u504f\u79fb\u91cf\u5f97\u5230\u65b0\u7684\u5f15\u7528\u3002 \u8fd4\u56de\u7684\u5f15\u7528\u53ef\u4ee5\u4e3a\u4e00\u4e2a\u5355\u5143\u683c\u6216\u5355\u5143\u683c\u533a\u57df\u3002\u5e76\u53ef\u4ee5\u6307\u5b9a\u8fd4\u56de\u7684\u884c\u6570\u6216\u5217\u6570\u3002', [
            parameterDescription('reference'),
            parameterDescription('rows'),
            parameterDescription('cols'),
            parameterDescription('height'),
            parameterDescription('width')
        ]),
        'OR': functionDescription('\u6b64\u51fd\u6570\u5728\u5176\u53c2\u6570\u7ec4\u4e2d\uff0c\u4efb\u4f55\u4e00\u4e2a\u53c2\u6570\u903b\u8f91\u503c\u4e3a TRUE\uff0c\u5373\u8fd4\u56de TRUE\uff1b \u4efb\u4f55\u4e00\u4e2a\u53c2\u6570\u7684\u903b\u8f91\u503c\u4e3a FALSE\uff0c\u5373\u8fd4\u56de FALSE\u3002', [
            parameterDescription('logical1'),
            parameterDescription('logical2', true)
        ]),
        'PEARSON': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de Pearson\uff08\u76ae\u5c14\u751f\uff09\u4e58\u79ef\u77e9\u76f8\u5173\u7cfb\u6570 r\uff0c\u8fd9\u662f\u4e00\u4e2a\u8303\u56f4\u5728 -1.0 \u5230 1.0 \u4e4b\u95f4\uff08\u5305\u62ec -1.0 \u548c 1.0 \u5728\u5185\uff09\u7684\u65e0\u91cf\u7eb2\u6307\u6570\uff0c\u53cd\u6620\u4e86\u4e24\u4e2a\u6570\u636e\u96c6\u5408\u4e4b\u95f4\u7684\u7ebf\u6027\u76f8\u5173\u7a0b\u5ea6\u3002 ', [
            parameterDescription('array_ind'),
            parameterDescription('array_dep')
        ]),
        'PERCENTILE': functionDescription('\u6b64\u51fd\u6570 \u8fd4\u56de\u533a\u57df\u4e2d\u6570\u503c\u7684\u7b2c n \u4e2a\u767e\u5206\u70b9\u7684\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('n')
        ]),
        'PERCENTRANK': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7279\u5b9a\u6570\u503c\u5728\u4e00\u4e2a\u6570\u636e\u96c6\u4e2d\u7684\u767e\u5206\u6bd4\u6392\u4f4d\u3002', [
            parameterDescription('array'),
            parameterDescription('x'),
            parameterDescription('significance')
        ]),
        'PERMUT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ece\u7ed9\u5b9a\u6570\u76ee\u7684\u5bf9\u8c61\u96c6\u5408\u4e2d\u9009\u53d6\u7684\u82e5\u5e72\u5bf9\u8c61\u7684\u6392\u5217\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('number_chosen')
        ]),
        'PI': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de PI \u503c 3.1415926536\u3002', []),
        'PMT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5728\u56fa\u5b9a\u5229\u7387\u4e0b,\u8d37\u6b3e\u7684\u7b49\u989d\u5206\u671f\u507f\u8fd8\u989d', [
            parameterDescription('rate'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'POISSON': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6cca\u677e\u5206\u5e03\u3002', [
            parameterDescription('nevents'),
            parameterDescription('mean'),
            parameterDescription('cumulative')
        ]),
        'POWER': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7ed9\u5b9a\u6570\u5b57\u7684\u4e58\u5e42\u3002', [
            parameterDescription('number'),
            parameterDescription('power')
        ]),
        'PPMT': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u56fa\u5b9a\u5229\u7387\u53ca\u7b49\u989d\u5206\u671f\u4ed8\u6b3e\u65b9\u5f0f\uff0c\u8fd4\u56de\u6295\u8d44\u5728\u67d0\u4e00\u7ed9\u5b9a\u671f\u95f4\u5185\u7684\u672c\u91d1\u507f\u8fd8\u989d\u3002', [
            parameterDescription('rate'),
            parameterDescription('per'),
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'PRICE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5b9a\u671f\u4ed8\u606f\u7684\u9762\u503c \uffe5100 \u7684\u6709\u4ef7\u8bc1\u5238\u7684\u4ef7\u683c\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('rate'),
            parameterDescription('yield'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'PRICEDISC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6298\u4ef7\u53d1\u884c\u7684\u9762\u503c \uffe5100 \u7684\u6709\u4ef7\u8bc1\u5238\u7684\u4ef7\u683c\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('discount'),
            parameterDescription('redemption'),
            parameterDescription('basis')
        ]),
        'PRICEMAT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5230\u671f\u4ed8\u606f\u7684\u9762\u503c \uffe5100 \u7684\u6709\u4ef7\u8bc1\u5238\u7684\u4ef7\u683c\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('issue'),
            parameterDescription('rate'),
            parameterDescription('yield'),
            parameterDescription('basis')
        ]),
        'PROB': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u533a\u57df\u4e2d\u7684\u6570\u503c\u843d\u5728\u6307\u5b9a\u533a\u95f4\u5185\u7684\u6982\u7387\u3002', [
            parameterDescription('x_range'),
            parameterDescription('prob_range'),
            parameterDescription('lower_limit'),
            parameterDescription('upper_limit')
        ]),
        'PRODUCT': functionDescription('\u6b64\u51fd\u6570\u53ef\u8ba1\u7b97\u7528\u4f5c\u53c2\u6570\u7684\u6240\u6709\u6570\u5b57\u7684\u4e58\u79ef\uff0c\u7136\u540e\u8fd4\u56de\u4e58\u79ef\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'PROPER': functionDescription('\u6b64\u51fd\u6570\u5c06\u6587\u672c\u5b57\u7b26\u4e32\u7684\u9996\u5b57\u6bcd\u53ca\u4efb\u4f55\u975e\u5b57\u6bcd\u5b57\u7b26\u4e4b\u540e\u7684\u9996\u5b57\u6bcd\u8f6c\u6362\u6210\u5927\u5199\u3002', [
            parameterDescription('text')
        ]),
        'PROPERTY': functionDescription('\u6b64\u51fd\u6570\u6839\u636e\u5bf9\u8c61\u4e2d\u5c5e\u6027\u7684\u8def\u5f84\u8fd4\u56de\u8be5\u5c5e\u6027\u5bf9\u5e94\u7684\u503c\u3002', [
            parameterDescription('data_expression'),
            parameterDescription('property_path')
        ]),
        'PV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6295\u8d44\u7684\u73b0\u503c\u3002\u73b0\u503c\u4e3a\u4e00\u7cfb\u5217\u672a\u6765\u4ed8\u6b3e\u7684\u5f53\u524d\u503c\u7684\u7d2f\u79ef\u548c\u3002\u4f8b\u5982\uff0c\u501f\u5165\u65b9\u7684\u501f\u5165\u6b3e\u5373\u4e3a\u8d37\u51fa\u65b9\u8d37\u6b3e\u7684\u73b0\u503c\u3002', [
            parameterDescription('rate'),
            parameterDescription('numper'),
            parameterDescription('paymt'),
            parameterDescription('fval'),
            parameterDescription('type')
        ]),
        'QUARTILE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u636e\u96c6\u7684\u56db\u5206\u4f4d\u6570\u3002', [
            parameterDescription('array'),
            parameterDescription('quart')
        ]),
        'QUOTIENT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5546\u7684\u6574\u6570\u90e8\u5206\uff0c\u8be5\u51fd\u6570\u53ef\u7528\u4e8e\u820d\u6389\u5546\u7684\u5c0f\u6570\u90e8\u5206\u3002', [
            parameterDescription('numerator'),
            parameterDescription('denominator')
        ]),
        'RADIANS': functionDescription('\u6b64\u51fd\u6570\u5c06\u89d2\u5ea6\u8f6c\u6362\u4e3a\u5f27\u5ea6\u3002', [
            parameterDescription('angle')
        ]),
        'RAND': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5927\u4e8e\u7b49\u4e8e 0 \u53ca\u5c0f\u4e8e 1 \u7684\u5747\u5300\u5206\u5e03\u968f\u673a\u5b9e\u6570\u3002', []),
        'RANDBETWEEN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4f4d\u4e8e\u6307\u5b9a\u7684\u4e24\u4e2a\u6570\u4e4b\u95f4\u7684\u4e00\u4e2a\u968f\u673a\u6574\u6570\u3002', [
            parameterDescription('bottom'),
            parameterDescription('top')
        ]),
        'RANGEBLOCKSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u533a\u57df\u6a21\u677f\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('template_range'),
            parameterDescription('data_expression')
        ]),
        'RANK': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u6570\u5b57\u5728\u6570\u5b57\u5217\u8868\u4e2d\u7684\u6392\u4f4d\u3002\u6570\u5b57\u7684\u6392\u4f4d\u662f\u5176\u5927\u5c0f\u4e0e\u5217\u8868\u4e2d\u5176\u4ed6\u503c\u7684\u6bd4\u503c\uff08\u5982\u679c\u5217\u8868\u5df2\u6392\u8fc7\u5e8f\uff0c\u5219\u6570\u5b57\u7684\u6392\u4f4d\u5c31\u662f\u5b83\u5f53\u524d\u7684\u4f4d\u7f6e\uff09\u3002', [
            parameterDescription('number'),
            parameterDescription('ref'),
            parameterDescription('order')
        ]),
        'RATE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5e74\u91d1\u7684\u5404\u671f\u5229\u7387\u3002', [
            parameterDescription('nper'),
            parameterDescription('pmt'),
            parameterDescription('pval'),
            parameterDescription('fval'),
            parameterDescription('type'),
            parameterDescription('guess')
        ]),
        'RECEIVED': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u6b21\u6027\u4ed8\u606f\u7684\u6709\u4ef7\u8bc1\u5238\u5230\u671f\u6536\u56de\u7684\u91d1\u989d\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('investment'),
            parameterDescription('discount'),
            parameterDescription('basis')
        ]),
        'REPLACE': functionDescription('\u6b64\u51fd\u6570\u4f7f\u7528\u5176\u4ed6\u6587\u672c\u5b57\u7b26\u4e32\u5e76\u6839\u636e\u6240\u6307\u5b9a\u7684\u5b57\u7b26\u6570\u66ff\u6362\u67d0\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7684\u90e8\u5206\u6587\u672c\u3002', [
            parameterDescription('old_text'),
            parameterDescription('start_num'),
            parameterDescription('num_chars'),
            parameterDescription('new_text')
        ]),
        'REPT': functionDescription('\u6b64\u51fd\u6570\u6309\u7167\u7ed9\u5b9a\u7684\u6b21\u6570\u91cd\u590d\u663e\u793a\u6587\u672c\u3002', [
            parameterDescription('text'),
            parameterDescription('number_times')
        ]),
        'RIGHT': functionDescription('\u6b64\u51fd\u6570\u6839\u636e\u6240\u6307\u5b9a\u7684\u5b57\u7b26\u6570\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u6700\u540e\u4e00\u4e2a\u6216\u591a\u4e2a\u5b57\u7b26\u3002', [
            parameterDescription('text'),
            parameterDescription('num_chars')
        ]),
        'ROMAN': functionDescription('\u6b64\u51fd\u6570\u5c06\u963f\u62c9\u4f2f\u6570\u5b57\u8f6c\u6362\u4e3a\u5176\u7b49\u4ef7\u7684\u6587\u672c\u5f62\u5f0f\u7684\u7f57\u9a6c\u6570\u5b57\u3002', [
            parameterDescription('number'),
            parameterDescription('form')
        ]),
        'ROUND': functionDescription('\u6b64\u51fd\u6570\u53ef\u5c06\u67d0\u4e2a\u6570\u5b57\u56db\u820d\u4e94\u5165\u4e3a\u6307\u5b9a\u7684\u4f4d\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('num_digits')
        ]),
        'ROUNDDOWN': functionDescription('\u6b64\u51fd\u6570\u9760\u8fd1\u96f6\u503c\uff0c\u5411\u4e0b\uff08\u7edd\u5bf9\u503c\u51cf\u5c0f\u7684\u65b9\u5411\uff09\u820d\u5165\u6570\u5b57\u3002', [
            parameterDescription('number'),
            parameterDescription('num_digits')
        ]),
        'ROUNDUP': functionDescription('\u6b64\u51fd\u6570\u8fdc\u79bb\u96f6\u503c\uff0c\u5411\u4e0a\u820d\u5165\u6570\u5b57\u3002', [
            parameterDescription('number'),
            parameterDescription('num_digits')
        ]),
        'ROW': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5f15\u7528\u7684\u884c\u53f7\u3002', [
            parameterDescription('reference')
        ]),
        'ROWS': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5f15\u7528\u6216\u6570\u7ec4\u7684\u884c\u6570\u3002', [
            parameterDescription('array')
        ]),
        'RSQ': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6839\u636e y s \u548c x s \u4e2d\u6570\u636e\u70b9\u8ba1\u7b97\u5f97\u51fa\u7684 Pearson \u4e58\u79ef\u77e9\u76f8\u5173\u7cfb\u6570\u7684\u5e73\u65b9\u3002', [
            parameterDescription('array_dep'),
            parameterDescription('array_ind')
        ]),
        'SEARCH': functionDescription('\u6b64\u51fd\u6570\u5728\u4e00\u4e2a\u6587\u672c\u503c\u4e2d\u67e5\u627e\u53e6\u4e00\u4e2a\u6587\u672c\u503c\u5e76\u8fd4\u56de\u7b2c\u4e00\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\u7684\u8d77\u59cb\u4f4d\u7f6e\u7684\u7f16\u53f7\uff0c\u8be5\u7f16\u53f7\u4ece\u7b2c\u4e8c\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\u7684\u7b2c\u4e00\u4e2a\u5b57\u7b26\u7b97\u8d77\u3002', [
            parameterDescription('find_text'),
            parameterDescription('within_text'),
            parameterDescription(START_NUMBER)
        ]),
        'SECOND': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u65f6\u95f4\u503c\u7684\u79d2\u6570\u3002\u8fd4\u56de\u7684\u79d2\u6570\u4e3a 0 \u5230 59 \u4e4b\u95f4\u7684\u6574\u6570\u3002', [
            parameterDescription('time')
        ]),
        'SERIESSUM': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5e42\u7ea7\u6570\u4e4b\u548c\u3002', [
            parameterDescription('x'),
            parameterDescription('n'),
            parameterDescription('m'),
            parameterDescription('coefficients')
        ]),
        'SIGN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u5b57\u7684\u7b26\u53f7\u3002', [
            parameterDescription('cellreference')
        ]),
        'SIN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7ed9\u5b9a\u89d2\u5ea6\u7684\u6b63\u5f26\u503c\u3002', [
            parameterDescription('angle')
        ]),
        'SINH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u4e00\u6570\u5b57\u7684\u53cc\u66f2\u6b63\u5f26\u503c\u3002', [
            parameterDescription('number')
        ]),
        'SKEW': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5206\u5e03\u7684\u4e0d\u5bf9\u79f0\u5ea6\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'SLN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u9879\u8d44\u4ea7\u5728\u4e00\u4e2a\u671f\u95f4\u4e2d\u7684\u7ebf\u6027\u6298\u65e7\u503c\u3002', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life')
        ]),
        'SLOPE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6839\u636e array_dep \u548c array_ind \u4e2d\u7684\u6570\u636e\u70b9\u62df\u5408\u7684\u7ebf\u6027\u56de\u5f52\u76f4\u7ebf\u7684\u659c\u7387\u3002', [
            parameterDescription('array_dep'),
            parameterDescription('array_ind')
        ]),
        'SMALL': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u636e\u96c6\u4e2d\u7b2c n \u4e2a\u6700\u5c0f\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('n')
        ]),
        'SQRT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6b63\u5e73\u65b9\u6839\u3002', [
            parameterDescription('value')
        ]),
        'SQRTPI': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u6570\u4e0e pi \u7684\u4e58\u79ef\u7684\u5e73\u65b9\u6839\u3002', [
            parameterDescription('multiple')
        ]),
        'STANDARDIZE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 mean \u4e3a\u5e73\u5747\u503c\uff0c\u4ee5 stdev \u4e3a\u6807\u51c6\u504f\u5dee\u7684\u5206\u5e03\u7684\u6b63\u6001\u5316\u6570\u503c\u3002', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'STDEVA': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u6837\u672c\uff08\u5305\u62ec\u6570\u5b57\u3001\u6587\u672c\u548c\u903b\u8f91\u503c\uff09\u4f30\u7b97\u6807\u51c6\u504f\u5dee\u3002', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'STDEVP': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u6574\u4e2a\u6837\u672c\u603b\u4f53\u8ba1\u7b97\u6807\u51c6\u504f\u5dee\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'STDEVPA': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u603b\u4f53\uff08\u5305\u62ec\u6570\u5b57\u3001\u6587\u672c\u548c\u903b\u8f91\u503c\uff09\u8ba1\u7b97\u6807\u51c6\u504f\u5dee\u3002', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'STEYX': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u901a\u8fc7\u7ebf\u6027\u56de\u5f52\u6cd5\u8ba1\u7b97\u6bcf\u4e2a x \u7684 y \u9884\u6d4b\u503c\u65f6\u6240\u4ea7\u751f\u7684\u6807\u51c6\u8bef\u5dee\u3002 \u6807\u51c6\u8bef\u5dee\u7528\u6765\u5ea6\u91cf\u6839\u636e\u5355\u4e2a x \u53d8\u91cf\u8ba1\u7b97\u51fa\u7684 y \u9884\u6d4b\u503c\u7684\u8bef\u5dee\u91cf\u3002', [
            parameterDescription('array_dep'),
            parameterDescription('array_ind')
        ]),
        'SUBSTITUTE': functionDescription('\u6b64\u51fd\u6570\u5728\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7528\u65b0\u6587\u672c\u66ff\u6362\u65e7\u6587\u672c\u3002', [
            parameterDescription('text'),
            parameterDescription('old_text'),
            parameterDescription('new_text'),
            parameterDescription('instance_num')
        ]),
        'SUBTOTAL': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5217\u8868\u6216\u6570\u636e\u5e93\u4e2d\u7684\u5206\u7c7b\u6c47\u603b\u3002', [
            parameterDescription('function_num'),
            parameterDescription('ref1'),
            parameterDescription('ref2', true)
        ]),
        'SUM': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u4e00\u5355\u5143\u683c\u533a\u57df\u4e2d\u6240\u6709\u6570\u5b57\u4e4b\u548c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'SUMIF': functionDescription('\u6b64\u51fd\u6570\u6309\u7ed9\u5b9a\u6761\u4ef6\u5bf9\u6307\u5b9a\u5355\u5143\u683c\u6c42\u548c\u3002', [
            parameterDescription('range'),
            parameterDescription('criteria'),
            parameterDescription('sum_range')
        ]),
        'SUMIFS': functionDescription('\u6b64\u51fd\u6570\u5bf9\u533a\u57df\u4e2d\u6ee1\u8db3\u591a\u4e2a\u6761\u4ef6\u7684\u5355\u5143\u683c\u6c42\u548c\u3002', [
            parameterDescription('sum_range'),
            parameterDescription('criteria_range1', true),
            parameterDescription('criteria1', true)
        ]),
        'SUMPRODUCT': functionDescription('\u6b64\u51fd\u6570\u5728\u7ed9\u5b9a\u7684\u51e0\u7ec4\u6570\u7ec4\u4e2d\uff0c\u5c06\u6570\u7ec4\u95f4\u5bf9\u5e94\u7684\u5143\u7d20\u76f8\u4e58\uff0c\u5e76\u8fd4\u56de\u4e58\u79ef\u4e4b\u548c\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2', true)
        ]),
        'SUMSQ': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u53c2\u6570\u7684\u5e73\u65b9\u548c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'SUMX2MY2': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u6570\u7ec4\u4e2d\u5bf9\u5e94\u6570\u503c\u7684\u5e73\u65b9\u5dee\u4e4b\u548c\u3002', [
            parameterDescription('array_x'),
            parameterDescription('array_y')
        ]),
        'SUMX2PY2': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u6570\u7ec4\u4e2d\u5bf9\u5e94\u6570\u503c\u7684\u5e73\u65b9\u548c\u4e4b\u548c\u3002', [
            parameterDescription('array_x'),
            parameterDescription('array_y')
        ]),
        'SUMXMY2': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u6570\u7ec4\u4e2d\u5bf9\u5e94\u6570\u503c\u4e4b\u5dee\u7684\u5e73\u65b9\u548c\u3002', [
            parameterDescription('array_x'),
            parameterDescription('array_y')
        ]),
        'SYD': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u9879\u8d44\u4ea7\u6309\u5e74\u9650\u603b\u548c\u6298\u65e7\u6cd5\u8ba1\u7b97\u7684\u6307\u5b9a\u671f\u95f4\u7684\u6298\u65e7\u503c\u3002', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life'),
            parameterDescription('period')
        ]),
        'T': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u5355\u5143\u683c\u7684\u6587\u672c\u3002', [
            parameterDescription('value')
        ]),
        'TAN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7ed9\u5b9a\u89d2\u5ea6\u7684\u6b63\u5207\u503c\u3002', [
            parameterDescription('angle')
        ]),
        'TANH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u4e00\u6570\u5b57\u7684\u53cc\u66f2\u6b63\u5207\u3002', [
            parameterDescription('number')
        ]),
        'TBILLEQ': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u56fd\u5e93\u5238\u7684\u7b49\u6548\u6536\u76ca\u7387\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('discount')
        ]),
        'TBILLPRICE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u9762\u503c \uffe5100 \u7684\u56fd\u5e93\u5238\u7684\u4ef7\u683c\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('discount')
        ]),
        'TBILLYIELD': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u56fd\u5e93\u5238\u7684\u6536\u76ca\u7387\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('priceper')
        ]),
        'TDIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de t \u5206\u5e03\u7684\u767e\u5206\u70b9\uff08\u6982\u7387\uff09\u3002', [
            parameterDescription('x'),
            parameterDescription('deg_freedom'),
            parameterDescription('tails')
        ]),
        'TEXT': functionDescription('\u6b64\u51fd\u6570\u683c\u5f0f\u5316\u4e00\u4e2a\u6570\u503c\u5e76\u5c06\u5176\u8f6c\u6362\u6210\u6587\u672c\u3002', [
            parameterDescription('value'),
            parameterDescription('format_text')
        ]),
        'TIME': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u65f6\u95f4\u7684\u65f6\u95f4\u95f4\u9694\u5bf9\u8c61\u3002', [
            parameterDescription('hour'),
            parameterDescription('minute'),
            parameterDescription('second')
        ]),
        'TIMEVALUE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7531\u6587\u672c\u5b57\u7b26\u4e32\u6240\u4ee3\u8868\u7684\u65f6\u95f4\u7684\u65f6\u95f4\u95f4\u9694\u5bf9\u8c61\u503c\u3002', [
            parameterDescription('time_text')
        ]),
        'TINV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4f5c\u4e3a\u6982\u7387\u548c\u81ea\u7531\u5ea6\u51fd\u6570\u7684\u5b66\u751f t \u5206\u5e03\u7684 t \u503c\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'TODAY': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5f53\u524d\u7684\u65e5\u671f\u548c\u65f6\u95f4\u3002', []),
        'TRANSPOSE': functionDescription('\u6b64\u51fd\u6570 TRANSPOSE \u51fd\u6570\u53ef\u8fd4\u56de\u8f6c\u7f6e\u5355\u5143\u683c\u533a\u57df\uff0c\u5373\u5c06\u884c\u5355\u5143\u683c\u533a\u57df\u8f6c\u7f6e\u6210\u5217\u5355\u5143\u683c\u533a\u57df\uff0c\u53cd\u4e4b\u4ea6\u7136\u3002', [
            parameterDescription('array')
        ]),
        'TREND': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u6761\u7ebf\u6027\u56de\u5f52\u62df\u5408\u7ebf\u7684\u503c\u3002 \u5373\u627e\u5230\u9002\u5408\u5df2\u77e5\u6570\u7ec4 y s \u548c x s \u7684\u76f4\u7ebf\uff08\u7528\u6700\u5c0f\u4e8c\u4e58\u6cd5\uff09\uff0c \u5e76\u8fd4\u56de\u6307\u5b9a\u6570\u7ec4 newx s \u5728\u76f4\u7ebf\u4e0a\u5bf9\u5e94\u7684 y \u503c\u3002', [
            parameterDescription('y'),
            parameterDescription('x'),
            parameterDescription('newx'),
            parameterDescription('constant')
        ]),
        'TRIM': functionDescription('\u6b64\u51fd\u6570\u9664\u4e86\u5355\u8bcd\u4e4b\u95f4\u7684\u5355\u4e2a\u7a7a\u683c\u5916\uff0c\u6e05\u9664\u6587\u672c\u4e2d\u6240\u6709\u7684\u7a7a\u683c\u3002', [
            parameterDescription('text')
        ]),
        'TRIMMEAN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u636e\u96c6\u7684\u5185\u90e8\u5e73\u5747\u503c\u3002\u51fd\u6570 TRIMMEAN \u5148\u4ece\u6570\u636e\u96c6\u7684\u5934\u90e8\u548c\u5c3e\u90e8\u9664\u53bb\u4e00\u5b9a\u767e\u5206\u6bd4\u7684\u6570\u636e\u70b9\uff0c\u7136\u540e\u518d\u6c42\u5e73\u5747\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('percent')
        ]),
        'TRUE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u903b\u8f91\u503c TRUE\u3002', []),
        'TRUNC': functionDescription('\u6b64\u51fd\u6570\u5c06\u6307\u5b9a\u6570\u5b57\u7684\u5c0f\u6570\u90e8\u5206\u622a\u53bb\uff0c\u8fd4\u56de\u6574\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('num_digits')
        ]),
        'TTEST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e0e\u5b66\u751f t \u68c0\u9a8c\u76f8\u5173\u7684\u6982\u7387\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2'),
            parameterDescription('tails'),
            parameterDescription('type')
        ]),
        'TYPE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u503c\u7684\u7c7b\u578b\u3002', [
            parameterDescription('value')
        ]),
        'UPPER': functionDescription('\u6b64\u51fd\u6570\u5c06\u6587\u672c\u8f6c\u6362\u4e3a\u5927\u5199\u5f62\u5f0f\u3002', [
            parameterDescription('text')
        ]),
        'VALUE': functionDescription('\u6b64\u51fd\u6570\u5c06\u4ee3\u8868\u6570\u5b57\u7684\u6587\u672c\u5b57\u7b26\u4e32\u8f6c\u6362\u6210\u6570\u5b57\u3002', [
            parameterDescription('text')
        ]),
        'VAR': functionDescription('\u6b64\u51fd\u6570\u8ba1\u7b97\u57fa\u4e8e\u7ed9\u5b9a\u6837\u672c\u7684\u65b9\u5dee\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'VARA': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u6837\u672c\uff08\u5305\u62ec\u6570\u5b57\u3001\u6587\u672c\u548c\u903b\u8f91\u503c\uff09\u4f30\u7b97\u65b9\u5dee\u3002', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'VARP': functionDescription('\u6b64\u51fd\u6570\u8ba1\u7b97\u57fa\u4e8e\u6574\u4e2a\u6837\u672c\u603b\u4f53\u7684\u65b9\u5dee\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'VARPA': functionDescription('\u6b64\u51fd\u6570\u8ba1\u7b97\u57fa\u4e8e\u603b\u4f53\uff08\u5305\u62ec\u6570\u5b57\u3001\u6587\u672c\u548c\u903b\u8f91\u503c\uff09\u4f30\u7b97\u65b9\u5dee', [
            parameterDescription('value1'),
            parameterDescription('value2', true)
        ]),
        'VDB': functionDescription('\u6b64\u51fd\u6570\u4f7f\u7528\u53cc\u500d\u4f59\u989d\u9012\u51cf\u6cd5\u6216\u5176\u4ed6\u6307\u5b9a\u7684\u65b9\u6cd5\uff0c\u8fd4\u56de\u6307\u5b9a\u7684\u4efb\u4f55\u671f\u95f4\u5185\uff08\u5305\u62ec\u90e8\u5206\u671f\u95f4\uff09\u7684\u8d44\u4ea7\u6298\u65e7\u503c\u3002\u51fd\u6570 VDB \u4ee3\u8868\u53ef\u53d8\u4f59\u989d\u9012\u51cf\u6cd5\u3002', [
            parameterDescription('cost'),
            parameterDescription('salvage'),
            parameterDescription('life'),
            parameterDescription('start_period'),
            parameterDescription('end_period'),
            parameterDescription('factor'),
            parameterDescription('no_switch')
        ]),
        'VLOOKUP': functionDescription('\u6b64\u51fd\u6570\u5728\u8868\u683c\u6570\u7ec4\u7684\u9996\u5217\u67e5\u627e\u6307\u5b9a\u7684\u503c\uff0c\u5e76\u7531\u6b64\u8fd4\u56de\u8868\u683c\u6570\u7ec4\u5f53\u524d\u884c\u4e2d\u5176\u4ed6\u5217\u7684\u503c\u3002', [
            parameterDescription('lookup_value'),
            parameterDescription('table_array'),
            parameterDescription('col_index_num'),
            parameterDescription('range_lookup')
        ]),
        'WEEKDAY': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u65e5\u671f\u4e3a\u661f\u671f\u51e0\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u5176\u503c\u4e3a 1\uff08\u661f\u671f\u5929\uff09\u5230 7\uff08\u661f\u671f\u516d\uff09\u4e4b\u95f4\u7684\u6574\u6570\u3002', [
            parameterDescription('date'),
            parameterDescription('type')
        ]),
        'WEEKNUM': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u6570\u5b57\uff0c\u8be5\u6570\u5b57\u4ee3\u8868\u4e00\u5e74\u4e2d\u7684\u7b2c\u51e0\u5468\u3002', [
            parameterDescription('date'),
            parameterDescription('weektype')
        ]),
        'WEIBULL': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u97e6\u4f2f\u5206\u5e03\u3002\u4f7f\u7528\u6b64\u51fd\u6570\u53ef\u4ee5\u8fdb\u884c\u53ef\u9760\u6027\u5206\u6790\uff0c\u6bd4\u5982\u8ba1\u7b97\u8bbe\u5907\u7684\u5e73\u5747\u6545\u969c\u65f6\u95f4\u3002', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative')
        ]),
        'WORKDAY': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u65e5\u671f\uff08\u8d77\u59cb\u65e5\u671f\uff09\u4e4b\u524d\u6216\u4e4b\u540e\u76f8\u9694\u6307\u5b9a\u5de5\u4f5c\u65e5\u7684\u67d0\u4e00\u65e5\u671f\u7684\u65e5\u671f\u503c\u3002', [
            parameterDescription('start_date'),
            parameterDescription('days'),
            parameterDescription('holidays')
        ]),
        'XIRR': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u73b0\u91d1\u6d41\u7684\u5185\u90e8\u6536\u76ca\u7387\uff0c\u8fd9\u4e9b\u73b0\u91d1\u6d41\u4e0d\u4e00\u5b9a\u5b9a\u671f\u53d1\u751f\u3002', [
            parameterDescription('values'),
            parameterDescription('dates'),
            parameterDescription('guess')
        ]),
        'XNPV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u73b0\u91d1\u6d41\u7684\u51c0\u73b0\u503c\uff0c\u8fd9\u4e9b\u73b0\u91d1\u6d41\u4e0d\u4e00\u5b9a\u5b9a\u671f\u53d1\u751f\u3002', [
            parameterDescription('rate'),
            parameterDescription('values'),
            parameterDescription('dates')
        ]),
        'YEAR': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u65e5\u671f\u5bf9\u5e94\u7684\u5e74\u4efd\u3002', [
            parameterDescription('date')
        ]),
        'YEARFRAC': functionDescription('\u6b64\u51fd\u6570 \u8fd4\u56de start \u548c end \u4e4b\u95f4\u7684\u5929\u6570\u5360\u5168\u5e74\u5929\u6570\u7684\u767e\u5206\u6bd4\u3002', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('basis')
        ]),
        'YIELD': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5b9a\u671f\u4ed8\u606f\u6709\u4ef7\u8bc1\u5238\u7684\u6536\u76ca\u7387\uff0c\u51fd\u6570 YIELD \u7528\u4e8e\u8ba1\u7b97\u503a\u5238\u6536\u76ca\u7387\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('rate'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('frequency'),
            parameterDescription('basis')
        ]),
        'YIELDDISC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6298\u4ef7\u53d1\u884c\u7684\u6709\u4ef7\u8bc1\u5238\u7684\u5e74\u6536\u76ca\u7387\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('price'),
            parameterDescription('redemption'),
            parameterDescription('basis')
        ]),
        'YIELDMAT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5230\u671f\u4ed8\u606f\u7684\u6709\u4ef7\u8bc1\u5238\u7684\u5e74\u6536\u76ca\u7387\u3002', [
            parameterDescription('settlement'),
            parameterDescription('maturity'),
            parameterDescription('issue'),
            parameterDescription('rate'),
            parameterDescription('price'),
            parameterDescription('basis')
        ]),
        'ZTEST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de z \u68c0\u9a8c\u7684\u5355\u5c3e\u6982\u7387\u503c\u3002\u5bf9\u4e8e\u7ed9\u5b9a\u7684\u5047\u8bbe\u603b\u4f53\u5e73\u5747\u503c \u03bc0\uff0cZTEST \u8fd4\u56de\u6837\u672c\u5e73\u5747\u503c\u5927\u4e8e\u6570\u636e\u96c6\uff08\u6570\u7ec4\uff09\u4e2d\u89c2\u5bdf\u5e73\u5747\u503c\u7684\u6982\u7387\uff0c\u5373\u89c2\u5bdf\u6837\u672c\u5e73\u5747\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('x'),
            parameterDescription('sigma')
        ]),
        'HBARSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u6a2a\u5411\u6761\u72b6\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('value'),
            parameterDescription('colorScheme'),
            parameterDescription('axisVisible'),
            parameterDescription('barHeight')
        ]),
        'VBARSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u7ad6\u5411\u67f1\u72b6\u578b\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('value'),
            parameterDescription('colorScheme'),
            parameterDescription('axisVisible'),
            parameterDescription('barWidth')
        ]),
        'VARISPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u65b9\u5dee\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'PIESPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u997c\u5f62\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('range|percentage'),
            parameterDescription('color', true)
        ]),
        'AREASPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u9762\u79ef\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('points'),
            parameterDescription('mini'),
            parameterDescription('maxi'),
            parameterDescription('line1'),
            parameterDescription('line2'),
            parameterDescription('colorPositive'),
            parameterDescription('colorNegative')
        ]),
        'SCATTERSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u6563\u70b9\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'LINESPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u6298\u7ebf\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('data'),
            parameterDescription('dataOrientation'),
            parameterDescription('dateAxisData'),
            parameterDescription('dateAxisOrientation'),
            parameterDescription('setting')
        ]),
        'COLUMNSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u67f1\u5f62\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('data'),
            parameterDescription('dataOrientation'),
            parameterDescription('dateAxisData'),
            parameterDescription('dateAxisOrientation'),
            parameterDescription('setting')
        ]),
        'WINLOSSSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u76c8\u4e8f\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('data'),
            parameterDescription('dataOrientation'),
            parameterDescription('dateAxisData'),
            parameterDescription('dateAxisOrientation'),
            parameterDescription('setting')
        ]),
        'BULLETSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u5b50\u5f39\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'SPREADSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u6563\u5e03\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('points'),
            parameterDescription('showAverage'),
            parameterDescription('scaleStart'),
            parameterDescription('scaleEnd'),
            parameterDescription('style'),
            parameterDescription('colorScheme'),
            parameterDescription('vertical')
        ]),
        'STACKEDSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u5806\u79ef\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'BOXPLOTSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u7bb1\u7ebf\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'CASCADESPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u7011\u5e03\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'PARETOSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u9636\u68af\u7011\u5e03\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'MONTHSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u6708\u4efd\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('year'),
            parameterDescription('month'),
            parameterDescription('dataRange'),
            parameterDescription('emptyColor'),
            parameterDescription('startColor'),
            parameterDescription('middleColor'),
            parameterDescription('endColor')
        ]),
        'YEARSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u5e74\u4efd\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
            parameterDescription('year'),
            parameterDescription('dataRange'),
            parameterDescription('emptyColor'),
            parameterDescription('startColor'),
            parameterDescription('middleColor'),
            parameterDescription('endColor')
        ]),
        'GAUGEKPISPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8KPI\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'HISTOGRAMSPARKLINE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8\u76f4\u65b9\u8ff7\u4f60\u56fe\u7684\u6570\u636e\u96c6\u3002', [
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
        'CEILING.PRECISE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u6570\u5b57\uff0c\u8be5\u6570\u5b57\u5411\u4e0a\u820d\u5165\u4e3a\u6700\u63a5\u8fd1\u7684\u6574\u6570\u6216\u6700\u63a5\u8fd1\u7684\u6709\u6548\u4f4d\u7684\u500d\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'COVARIANCE.S': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6837\u672c\u534f\u65b9\u5dee\uff0c\u5373\u4e24\u4e2a\u6570\u636e\u96c6\u4e2d\u6bcf\u5bf9\u6570\u636e\u70b9\u7684\u504f\u5dee\u4e58\u79ef\u7684\u5e73\u5747\u503c\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'FLOOR.PRECISE': functionDescription('\u6b64\u51fd\u6570\u5411\u7edd\u5bf9\u503c\u51cf\u5c0f\u7684\u65b9\u5411\u820d\u5165\u6570\u5b57\u3002', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'PERCENTILE.EXC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u533a\u57df\u4e2d\u6570\u503c\u7684\u7b2c n \u4e2a\u767e\u5206\u70b9\u7684\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('k')
        ]),
        'QUARTILE.EXC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u636e\u96c6\u7684\u56db\u5206\u4f4d\u6570\u3002', [
            parameterDescription('array'),
            parameterDescription('quart')
        ]),
        'RANK.AVG': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u6570\u5b57\u5728\u6570\u5b57\u5217\u8868\u4e2d\u7684\u6392\u4f4d\u3002\u6570\u5b57\u7684\u6392\u4f4d\u662f\u5176\u5927\u5c0f\u4e0e\u5217\u8868\u4e2d\u5176\u4ed6\u503c\u7684\u6bd4\u503c\uff08\u5982\u679c\u5217\u8868\u5df2\u6392\u8fc7\u5e8f\uff0c\u5219\u6570\u5b57\u7684\u6392\u4f4d\u5c31\u662f\u5b83\u5f53\u524d\u7684\u4f4d\u7f6e\uff09\u3002', [
            parameterDescription('number'),
            parameterDescription('ref'),
            parameterDescription('[order]')
        ]),
        'MODE.MULT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u6570\u636e\u6216\u6570\u636e\u533a\u57df\u4e2d\u51fa\u73b0\u9891\u7387\u6700\u9ad8\u6216\u91cd\u590d\u51fa\u73b0\u7684\u6570\u503c\u7684\u5782\u76f4\u6570\u7ec4\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'STDEV.P': functionDescription('\u6b64\u51fd\u6570\u4f30\u7b97\u57fa\u4e8e\u6837\u672c\u7684\u6807\u51c6\u504f\u5dee\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'VAR.P': functionDescription('\u6b64\u51fd\u6570\u8ba1\u7b97\u57fa\u4e8e\u7ed9\u5b9a\u6837\u672c\u7684\u65b9\u5dee\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'COVARIANCE.P': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u534f\u65b9\u5dee\uff08\u6210\u5bf9\u504f\u5dee\u4e58\u79ef\u7684\u5e73\u5747\u503c\uff09\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'MODE.SNGL': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5728\u67d0\u4e00\u6570\u7ec4\u6216\u6570\u636e\u533a\u57df\u4e2d\u51fa\u73b0\u9891\u7387\u6700\u591a\u7684\u6570\u503c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'PERCENTILE.INC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u533a\u57df\u4e2d\u6570\u503c\u7684\u7b2c n \u4e2a\u767e\u5206\u70b9\u7684\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('k')
        ]),
        'QUARTILE.INC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u636e\u96c6\u7684\u56db\u5206\u4f4d\u6570\u3002', [
            parameterDescription('array'),
            parameterDescription('quart')
        ]),
        'RANK.EQ': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u6570\u5b57\u5728\u6570\u5b57\u5217\u8868\u4e2d\u7684\u6392\u4f4d\u3002\u6570\u5b57\u7684\u6392\u4f4d\u662f\u5176\u5927\u5c0f\u4e0e\u5217\u8868\u4e2d\u5176\u4ed6\u503c\u7684\u6bd4\u503c\uff08\u5982\u679c\u5217\u8868\u5df2\u6392\u8fc7\u5e8f\uff0c\u5219\u6570\u5b57\u7684\u6392\u4f4d\u5c31\u662f\u5b83\u5f53\u524d\u7684\u4f4d\u7f6e\uff09\u3002', [
            parameterDescription('number'),
            parameterDescription('ref'),
            parameterDescription('[order]')
        ]),
        'STDEV': functionDescription('\u6b64\u51fd\u6570\u4f30\u7b97\u57fa\u4e8e\u6837\u672c\u7684\u6807\u51c6\u504f\u5dee\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'STDEV.S': functionDescription('\u6b64\u51fd\u6570\u4f30\u7b97\u57fa\u4e8e\u6837\u672c\u7684\u6807\u51c6\u504f\u5dee\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'VAR.S': functionDescription('\u6b64\u51fd\u6570\u8ba1\u7b97\u57fa\u4e8e\u7ed9\u5b9a\u6837\u672c\u7684\u65b9\u5dee\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'BETA.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a Beta \u5206\u5e03\u7684\u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('[lower]'),
            parameterDescription('[upper]')
        ]),
        'BINOM.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e8c\u9879\u5f0f\u5206\u5e03\u7684\u6982\u7387\u503c\u3002', [
            parameterDescription('number_s'),
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('cumulative')
        ]),
        'BINOM.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4f7f\u7d2f\u79ef\u4e8c\u9879\u5f0f\u5206\u5e03\u5c0f\u4e8e\u6216\u7b49\u4e8e\u4e34\u754c\u503c\u7684\u6700\u5c0f\u503c\u3002', [
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('alpha')
        ]),
        'CHISQ.DIST.RT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de \u03c72 \u5206\u5e03\u7684\u5355\u5c3e\u6982\u7387\u3002', [
            parameterDescription('value'),
            parameterDescription('deg_freedom')
        ]),
        'CHISQ.INV.RT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de \u03c72 \u5206\u5e03\u7684\u5355\u5c3e\u6982\u7387\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'CHISQ.TEST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u72ec\u7acb\u6027\u68c0\u9a8c\u503c\u3002', [
            parameterDescription('actual_range'),
            parameterDescription('expected_range')
        ]),
        'CONFIDENCE.NORM': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u603b\u4f53\u5e73\u5747\u503c\u7684\u7f6e\u4fe1\u533a\u95f4\u3002', [
            parameterDescription('alpha'),
            parameterDescription('standard_dev'),
            parameterDescription('size')
        ]),
        'EXPON.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u6570\u5206\u5e03\u3002', [
            parameterDescription('value'),
            parameterDescription('lambda'),
            parameterDescription('cumulative')
        ]),
        'F.DIST.RT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de F \u6982\u7387\u5206\u5e03\u3002', [
            parameterDescription('value'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'F.INV.RT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de F \u6982\u7387\u5206\u5e03\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'F.TEST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de F \u68c0\u9a8c\u7684\u7ed3\u679c\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2')
        ]),
        'GAMMA.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de \u03b3 \u5206\u5e03\u3002', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative')
        ]),
        'GAMMA.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de \u03b3 \u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('alpha'),
            parameterDescription('beta')
        ]),
        'LOGNORM.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5bf9\u6570\u7d2f\u79ef\u5206\u5e03\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'NORM.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6b63\u6001\u7d2f\u79ef\u5206\u5e03\u3002', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('standard_dev'),
            parameterDescription('cumulative')
        ]),
        'NORM.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6807\u51c6\u6b63\u6001\u7d2f\u79ef\u5206\u5e03\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('mean'),
            parameterDescription('standard_dev')
        ]),
        'NORM.S.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6807\u51c6\u6b63\u6001\u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability')
        ]),
        'PERCENTRANK.INC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u636e\u96c6\u4e2d\u503c\u7684\u767e\u5206\u6bd4\u6392\u4f4d\u3002', [
            parameterDescription('array'),
            parameterDescription('n'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'POISSON.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6cca\u677e\u5206\u5e03\u3002', [
            parameterDescription('nevents'),
            parameterDescription('mean'),
            parameterDescription('cumulative')
        ]),
        'T.INV.2T': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5b66\u751f\u7684 t \u5206\u5e03\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'T.TEST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e0e\u5b66\u751f\u7684 t \u68c0\u9a8c\u76f8\u5173\u7684\u6982\u7387\u3002', [
            parameterDescription('array1'),
            parameterDescription('array2'),
            parameterDescription('tails'),
            parameterDescription('type')
        ]),
        'WEIBULL.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de Weibull \u5206\u5e03\u3002', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative')
        ]),
        'Z.TEST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de z \u68c0\u9a8c\u7684\u5355\u5c3e\u6982\u7387\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('x'),
            parameterDescription('[sigma]')
        ]),
        'T.DIST.RT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5b66\u751f\u7684 t \u5206\u5e03\u3002', [
            parameterDescription('x'),
            parameterDescription('deg_freedom')
        ]),
        'T.DIST.2T': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5b66\u751f\u7684 t \u5206\u5e03\u7684\u767e\u5206\u70b9\uff08\u6982\u7387\uff09\u3002', [
            parameterDescription('x'),
            parameterDescription('deg_freedom')
        ]),
        'ISO.CEILING': functionDescription('\u6b64\u51fd\u6570\u5c06\u6570\u5b57\u5411\u4e0a\u820d\u5165\u5230\u6700\u63a5\u8fd1\u7684\u6574\u6570\u6216\u57fa\u6570\u7684\u6700\u63a5\u8fd1\u500d\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'BETA.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de Beta \u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u3002', [
            parameterDescription('x'),
            parameterDescription('alpha'),
            parameterDescription('beta'),
            parameterDescription('cumulative'),
            parameterDescription('lower'),
            parameterDescription('upper')
        ]),
        'GAMMALN.PRECISE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4f3d\u739b\u51fd\u6570\u7684\u81ea\u7136\u5bf9\u6570\uff0c\u0393(x)\u3002', [
            parameterDescription('value')
        ]),
        'ERF.PRECISE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u8bef\u5dee\u51fd\u6570\u3002', [
            parameterDescription('lowerlimit')
        ]),
        'ERFC.PRECISE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ece x \u5230\u65e0\u7a77\u5927\u79ef\u5206\u7684\u4e92\u8865 ERF \u51fd\u6570\u3002', [
            parameterDescription('lowerlimit')
        ]),
        'PERCENTRANK.EXC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u67d0\u4e2a\u6570\u503c\u5728\u4e00\u4e2a\u6570\u636e\u96c6\u4e2d\u7684\u767e\u5206\u6bd4\uff080 \u5230 1\uff0c\u4e0d\u5305\u62ec 0 \u548c 1\uff09\u6392\u4f4d\u3002', [
            parameterDescription('array'),
            parameterDescription('x'),
            parameterDescription(SIGNIFICANCE)
        ]),
        'HYPGEOM.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u8d85\u51e0\u4f55\u5206\u5e03\u3002', [
            parameterDescription('sample_s'),
            parameterDescription('number_sample'),
            parameterDescription('population_s'),
            parameterDescription('number_pop'),
            parameterDescription('cumulative')
        ]),
        'LOGNORM.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5bf9\u6570\u7d2f\u79ef\u5206\u5e03\u51fd\u6570\u3002', [
            parameterDescription('x'),
            parameterDescription('mean'),
            parameterDescription('stdev'),
            parameterDescription('cumulative')
        ]),
        'NEGBINOM.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u8d1f\u4e8c\u9879\u5f0f\u5206\u5e03\u3002', [
            parameterDescription('number_f'),
            parameterDescription('number_s'),
            parameterDescription('probability_s'),
            parameterDescription('cumulative')
        ]),
        'NORM.S.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6807\u51c6\u6b63\u6001\u7d2f\u79ef\u5206\u5e03\u3002', [
            parameterDescription('z'),
            parameterDescription('cumulative')
        ]),
        'T.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5b66\u751f\u7684 t \u5206\u5e03\u7684\u767e\u5206\u70b9\uff08\u6982\u7387\uff09\u3002', [
            parameterDescription('x'),
            parameterDescription('deg_freedom'),
            parameterDescription('cumulative')
        ]),
        'F.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de F \u6982\u7387\u5206\u5e03\u3002', [
            parameterDescription('x'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2'),
            parameterDescription('cumulative')
        ]),
        'CHISQ.DIST': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7d2f\u79ef Beta \u6982\u7387\u5bc6\u5ea6\u51fd\u6570\u3002', [
            parameterDescription('x'),
            parameterDescription('deg_freedom'),
            parameterDescription('cumulative')
        ]),
        'F.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de F \u6982\u7387\u5206\u5e03\u7684\u53cd\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom1'),
            parameterDescription('deg_freedom2')
        ]),
        'T.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4f5c\u4e3a\u6982\u7387\u548c\u81ea\u7531\u5ea6\u51fd\u6570\u7684\u5b66\u751f t \u5206\u5e03\u7684 t \u503c\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'CHISQ.INV': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7d2f\u79ef Beta \u6982\u7387\u5bc6\u5ea6\u51fd\u6570\u3002', [
            parameterDescription('probability'),
            parameterDescription('deg_freedom')
        ]),
        'CONFIDENCE.T': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u603b\u4f53\u5e73\u5747\u503c\u7684\u7f6e\u4fe1\u533a\u95f4\uff08\u4f7f\u7528\u5b66\u751f\u7684 t \u5206\u5e03\uff09\u3002', [
            parameterDescription('alpha'),
            parameterDescription('standard_dev'),
            parameterDescription('size')
        ]),
        'NETWORKDAYS.INTL': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u65e5\u671f\u4e4b\u95f4\u7684\u6240\u6709\u5de5\u4f5c\u65e5\u6570\u3002', [
            parameterDescription('start_date'),
            parameterDescription('end_date'),
            parameterDescription('[weekend]'),
            parameterDescription('[holidays]')
        ]),
        'WORKDAY.INTL': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6307\u5b9a\u7684\u82e5\u5e72\u4e2a\u5de5\u4f5c\u65e5\u4e4b\u524d\u6216\u4e4b\u540e\u7684\u65e5\u671f\u7684\u5e8f\u5217\u53f7\uff08\u4f7f\u7528\u81ea\u5b9a\u4e49\u5468\u672b\u53c2\u6570\uff09\u3002\u5468\u672b\u53c2\u6570\u6307\u660e\u5468\u672b\u6709\u51e0\u5929\u4ee5\u53ca\u662f\u54ea\u51e0\u5929\u3002', [
            parameterDescription('start_date'),
            parameterDescription('days'),
            parameterDescription('[weekend]'),
            parameterDescription('[holidays]')
        ]),
        'REFRESH': functionDescription('\u6b64\u51fd\u6570\u51b3\u5b9a\u4e86\u5728\u4ec0\u4e48\u65f6\u673a\u91cd\u65b0\u8ba1\u7b97\u516c\u5f0f\uff0c\u53ef\u4ee5\u901a\u8fc7 evaluateMode \u53c2\u6570\u6765\u6307\u5b9a\u662f\u5728\u5355\u5143\u683c\u5f15\u7528\u7684\u503c\u53d1\u751f\u53d8\u5316\u7684\u65f6\u5019\u3001\u53ea\u8ba1\u7b97\u4e00\u6b21\u8fd8\u662f\u4ee5\u4e00\u5b9a\u7684\u65f6\u95f4\u95f4\u9694\u91cd\u590d\u8ba1\u7b97\u3002', [
            parameterDescription('formula'),
            parameterDescription('evaluateMode'),
            parameterDescription('interval')
        ]),
        'DAYS': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u65e5\u671f\u4e4b\u95f4\u7684\u5929\u6570\u3002', [
            parameterDescription('end_date'),
            parameterDescription('start_date'),
        ]),
        'ISOWEEKNUM': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7ed9\u5b9a\u65e5\u671f\u5728\u5168\u5e74\u4e2d\u7684 ISO \u5468\u6570\u3002', [
            parameterDescription('date')
        ]),
        'BITAND': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u6570\u7684\u6309\u4f4d\u201c\u4e0e\u201d\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'BITLSHIFT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5411\u5de6\u79fb\u52a8\u6307\u5b9a\u4f4d\u6570\u540e\u7684\u6570\u503c\u3002', [
            parameterDescription('number'),
            parameterDescription('shift_amount')
        ]),
        'BITOR': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u6570\u7684\u6309\u4f4d\u201c\u6216\u201d\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'BITRSHIFT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5411\u53f3\u79fb\u52a8\u6307\u5b9a\u4f4d\u6570\u540e\u7684\u6570\u503c\u3002', [
            parameterDescription('number'),
            parameterDescription('shift_amount')
        ]),
        'BITXOR': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e24\u4e2a\u6570\u503c\u7684\u6309\u4f4d\u201c\u5f02\u6216\u201d\u7ed3\u679c\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2')
        ]),
        'IMCOSH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u53cc\u66f2\u4f59\u5f26\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMCOT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u4f59\u5207\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMCSC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u4f59\u5272\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMCSCH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u53cc\u66f2\u4f59\u5272\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMSEC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u6b63\u5272\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMSECH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u53cc\u66f2\u6b63\u5272\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMSINH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u53cc\u66f2\u6b63\u5f26\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'IMTAN': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5 x+yi \u6216 x+yj \u6587\u672c\u683c\u5f0f\u8868\u793a\u7684\u590d\u6570\u7684\u6b63\u5207\u503c\u3002', [
            parameterDescription('complexnum')
        ]),
        'PDURATION': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6295\u8d44\u5230\u8fbe\u6307\u5b9a\u503c\u6240\u9700\u7684\u671f\u6570\u3002', [
            parameterDescription('rate'),
            parameterDescription('pval'),
            parameterDescription('fval')
        ]),
        'RRI': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6295\u8d44\u589e\u957f\u7684\u7b49\u6548\u5229\u7387\u3002', [
            parameterDescription('nper'),
            parameterDescription('pval'),
            parameterDescription('fval')
        ]),
        'ISFORMULA': functionDescription('\u6b64\u51fd\u6570\u68c0\u67e5\u662f\u5426\u5b58\u5728\u5305\u542b\u516c\u5f0f\u7684\u5355\u5143\u683c\u5f15\u7528\uff0c\u7136\u540e\u8fd4\u56de TRUE \u6216 FALSE\u3002', [
            parameterDescription('cellreference')
        ]),
        'IFNA': functionDescription('\u5982\u679c\u516c\u5f0f\u8fd4\u56de\u9519\u8bef\u503c #N/A\uff0c\u5219\u7ed3\u679c\u8fd4\u56de\u60a8\u6307\u5b9a\u7684\u503c\uff1b\u5426\u5219\u8fd4\u56de\u516c\u5f0f\u7684\u7ed3\u679c\u3002', [
            parameterDescription('value'),
            parameterDescription('value_if_na')
        ]),
        'IFS': functionDescription('\u6b64\u51fd\u6570\u68c0\u67e5\u662f\u5426\u6ee1\u8db3\u4e00\u4e2a\u6216\u591a\u4e2a\u6761\u4ef6\uff0c\u5e76\u8fd4\u56de\u7b2c\u4e00\u4e2a TRUE \u6761\u4ef6\u5bf9\u5e94\u7684\u503c\u3002', [
            parameterDescription('logical_test1'),
            parameterDescription('value_if_true1', true)
        ]),
        'SWITCH': functionDescription('\u6b64\u51fd\u6570\u6839\u636e\u503c\u5217\u8868\u8ba1\u7b97\u4e00\u4e2a\u503c\uff08\u79f0\u4e3a\u8868\u8fbe\u5f0f\uff09\uff0c\u5e76\u8fd4\u56de\u4e0e\u7b2c\u4e00\u4e2a\u5339\u914d\u503c\u5bf9\u5e94\u7684\u7ed3\u679c', [
            parameterDescription('expression'),
            parameterDescription('value1'),
            parameterDescription('result1'),
            parameterDescription('[default_or_value2]', true),
            parameterDescription('[result2]', true),
        ]),
        'XOR': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6240\u6709\u53c2\u6570\u7684\u903b\u8f91\u5f02\u6216\u3002', [
            parameterDescription('logical', true)
        ]),
        'AREAS': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5f15\u7528\u4e2d\u7684\u533a\u57df\u4e2a\u6570\u3002 \u533a\u57df\u662f\u6307\u8fde\u7eed\u7684\u5355\u5143\u683c\u533a\u57df\u6216\u5355\u4e2a\u5355\u5143\u683c\u3002', [
            parameterDescription('reference')
        ]),
        'FORMULATEXT': functionDescription('\u6b64\u51fd\u6570\u4ee5\u5b57\u7b26\u4e32\u7684\u5f62\u5f0f\u8fd4\u56de\u516c\u5f0f\u3002', [
            parameterDescription('reference')
        ]),
        'HYPERLINK': functionDescription('\u6b64\u51fd\u6570\u521b\u5efa\u5feb\u6377\u65b9\u5f0f\u6216\u8df3\u8f6c\uff0c\u4ee5\u6253\u5f00\u5b58\u50a8\u5728\u7f51\u7edc\u670d\u52a1\u5668\u3001intranet \u6216 Internet \u4e0a\u7684\u6587\u6863\u3002', [
            parameterDescription('link_location'),
            parameterDescription('friendly_name')
        ]),
        'ACOT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u5b57\u7684\u53cd\u4f59\u5207\u503c\u7684\u4e3b\u503c\u3002', [
            parameterDescription('number')
        ]),
        'ACOTH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6570\u5b57\u7684\u53cd\u53cc\u66f2\u4f59\u5207\u503c\u3002', [
            parameterDescription('number')
        ]),
        'ARABIC': functionDescription('\u6b64\u51fd\u6570\u5c06\u7f57\u9a6c\u6570\u5b57\u8f6c\u6362\u4e3a\u963f\u62c9\u4f2f\u6570\u5b57\u3002', [
            parameterDescription('text')
        ]),
        'BASE': functionDescription('\u6b64\u51fd\u6570\u5c06\u6570\u5b57\u8f6c\u6362\u4e3a\u5177\u5907\u7ed9\u5b9a\u57fa\u6570\u7684\u6587\u672c\u8868\u793a\u3002', [
            parameterDescription('number'),
            parameterDescription('radix'),
            parameterDescription('min_length')
        ]),
        'CEILING.MATH': functionDescription('\u6b64\u51fd\u6570\u5c06\u6570\u5b57\u5411\u4e0a\u820d\u5165\u4e3a\u6700\u63a5\u8fd1\u7684\u6574\u6570\u6216\u6700\u63a5\u8fd1\u7684\u6307\u5b9a\u57fa\u6570\u7684\u500d\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE),
            parameterDescription('[mode]')
        ]),
        'COMBINA': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7ed9\u5b9a\u6570\u76ee\u7684\u9879\u7684\u7ec4\u5408\u6570\uff08\u5305\u542b\u91cd\u590d\uff09\u3002', [
            parameterDescription('number'),
            parameterDescription('number_chosen')
        ]),
        'COT': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4ee5\u5f27\u5ea6\u8868\u793a\u7684\u89d2\u5ea6\u7684\u4f59\u5207\u503c\u3002', [
            parameterDescription('angle')
        ]),
        'COTH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u53cc\u66f2\u89d2\u5ea6\u7684\u53cc\u66f2\u4f59\u5207\u503c\u3002', [
            parameterDescription('value')
        ]),
        'CSC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u89d2\u5ea6\u7684\u4f59\u5272\u503c\uff0c\u4ee5\u5f27\u5ea6\u8868\u793a\u3002', [
            parameterDescription('angle')
        ]),
        'CSCH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u89d2\u5ea6\u7684\u53cc\u66f2\u4f59\u5272\u503c\uff0c\u4ee5\u5f27\u5ea6\u8868\u793a\u3002', [
            parameterDescription('value')
        ]),
        'DECIMAL': functionDescription('\u6b64\u51fd\u6570\u6309\u7ed9\u5b9a\u57fa\u6570\u5c06\u6570\u5b57\u7684\u6587\u672c\u8868\u793a\u5f62\u5f0f\u8f6c\u6362\u6210\u5341\u8fdb\u5236\u6570\u3002', [
            parameterDescription('text'),
            parameterDescription('radix')
        ]),
        'FLOOR.MATH': functionDescription('\u6b64\u51fd\u6570\u5c06\u6570\u5b57\u5411\u4e0b\u820d\u5165\u4e3a\u6700\u63a5\u8fd1\u7684\u6574\u6570\u6216\u6700\u63a5\u8fd1\u7684\u6307\u5b9a\u57fa\u6570\u7684\u500d\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription(SIGNIFICANCE),
            parameterDescription('[mode]')
        ]),
        'SEC': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u89d2\u5ea6\u7684\u6b63\u5272\u503c\u3002', [
            parameterDescription('angle')
        ]),
        'SECH': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u89d2\u5ea6\u7684\u53cc\u66f2\u6b63\u5272\u503c\u3002', [
            parameterDescription('value')
        ]),
        'BINOM.DIST.RANGE': functionDescription('\u6b64\u51fd\u6570\u4f7f\u7528\u4e8c\u9879\u5f0f\u5206\u5e03\u8fd4\u56de\u8bd5\u9a8c\u7ed3\u679c\u7684\u6982\u7387\u3002', [
            parameterDescription('trials'),
            parameterDescription('probability_s'),
            parameterDescription('number_s'),
            parameterDescription('[number_s2]')
        ]),
        'GAMMA': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de gamma \u51fd\u6570\u503c\u3002', [
            parameterDescription('number')
        ]),
        'MAXIFS': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u7ed9\u5b9a\u6761\u4ef6\u6216\u6807\u51c6\u6307\u5b9a\u7684\u5355\u5143\u683c\u4e2d\u7684\u6700\u5927\u503c\u3002', [
            parameterDescription('max_range'),
            parameterDescription('criteria_range', true),
            parameterDescription('criteria', true)
        ]),
        'GAUSS': functionDescription('\u6b64\u51fd\u6570\u8ba1\u7b97\u6807\u51c6\u6b63\u6001\u603b\u4f53\u7684\u6210\u5458\u5904\u4e8e\u5e73\u5747\u503c\u4e0e\u5e73\u5747\u503c\u7684 z \u500d\u6807\u51c6\u504f\u5dee\u4e4b\u95f4\u7684\u6982\u7387\u3002', [
            parameterDescription('number')
        ]),
        'MINIFS': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u7ec4\u7ed9\u5b9a\u6761\u4ef6\u6216\u6807\u51c6\u6307\u5b9a\u7684\u5355\u5143\u683c\u4e4b\u95f4\u7684\u6700\u5c0f\u503c\u3002', [
            parameterDescription('min_range'),
            parameterDescription('criteria_range', true),
            parameterDescription('criteria', true)
        ]),
        'PERMUTATIONA': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u53ef\u4ece\u5bf9\u8c61\u603b\u6570\u4e2d\u9009\u62e9\u7684\u7ed9\u5b9a\u6570\u76ee\u5bf9\u8c61\uff08\u542b\u91cd\u590d\uff09\u7684\u6392\u5217\u6570\u3002', [
            parameterDescription('number'),
            parameterDescription('number_chosen')
        ]),
        'PHI': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6807\u51c6\u6b63\u6001\u5206\u5e03\u7684\u5bc6\u5ea6\u51fd\u6570\u503c\u3002', [
            parameterDescription('value')
        ]),
        'SKEW.P': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u57fa\u4e8e\u6837\u672c\u603b\u4f53\u7684\u5206\u5e03\u4e0d\u5bf9\u79f0\u5ea6\uff1a\u8868\u660e\u5206\u5e03\u76f8\u5bf9\u4e8e\u5e73\u5747\u503c\u7684\u4e0d\u5bf9\u79f0\u7a0b\u5ea6\u3002', [
            parameterDescription('number1'),
            parameterDescription('number2', true)
        ]),
        'BAHTTEXT': functionDescription('\u6b64\u51fd\u6570\u5c06\u6570\u5b57\u8f6c\u6362\u4e3a\u6cf0\u8bed\u6587\u672c\u5e76\u6dfb\u52a0\u540e\u7f00\u201c\u6cf0\u94e2\u201d\u3002', [
            parameterDescription('number')
        ]),
        'CONCAT': functionDescription('\u6b64\u51fd\u6570\u5c06\u591a\u4e2a\u533a\u57df\u548c/\u6216\u5b57\u7b26\u4e32\u7684\u6587\u672c\u7ec4\u5408\u8d77\u6765\uff0c\u4f46\u4e0d\u63d0\u4f9b\u5206\u9694\u7b26\u6216 IgnoreEmpty \u53c2\u6570\u3002', [
            parameterDescription('text1'),
            parameterDescription('text2', true)
        ]),
        'FINDB': functionDescription('\u6b64\u51fd\u6570\u7528\u4e8e\u5728\u7b2c\u4e8c\u4e2a\u6587\u672c\u4e32\u4e2d\u5b9a\u4f4d\u7b2c\u4e00\u4e2a\u6587\u672c\u4e32\uff0c\u5e76\u8fd4\u56de\u7b2c\u4e00\u4e2a\u6587\u672c\u4e32\u7684\u8d77\u59cb\u4f4d\u7f6e\u7684\u503c\uff0c\u8be5\u503c\u4ece\u7b2c\u4e8c\u4e2a\u6587\u672c\u4e32\u7684\u7b2c\u4e00\u4e2a\u5b57\u7b26\u7b97\u8d77\u3002', [
            parameterDescription('find_text'),
            parameterDescription('within_text'),
            parameterDescription(START_NUMBER)
        ]),
        'LEFTB': functionDescription('\u6b64\u51fd\u6570\u57fa\u4e8e\u6240\u6307\u5b9a\u7684\u5b57\u8282\u6570\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7684\u7b2c\u4e00\u4e2a\u6216\u524d\u51e0\u4e2a\u5b57\u7b26\u3002', [
            parameterDescription('text'),
            parameterDescription('num_bytes')
        ]),
        'LENB': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7528\u4e8e\u4ee3\u8868\u5b57\u7b26\u7684\u5b57\u8282\u6570\u3002', [
            parameterDescription('text')
        ]),
        'MIDB': functionDescription('\u6b64\u51fd\u6570\u6839\u636e\u6307\u5b9a\u7684\u5b57\u8282\u6570\uff0c\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u4ece\u6307\u5b9a\u4f4d\u7f6e\u5f00\u59cb\u7684\u7279\u5b9a\u6570\u76ee\u7684\u5b57\u7b26\u3002', [
            parameterDescription('text'),
            parameterDescription('start_num'),
            parameterDescription('num_bytes')
        ]),
        'REPLACEB': functionDescription('\u6b64\u51fd\u6570\u4f7f\u7528\u5176\u4ed6\u6587\u672c\u5b57\u7b26\u4e32\u5e76\u6839\u636e\u6240\u6307\u5b9a\u7684\u5b57\u8282\u6570\u66ff\u6362\u67d0\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u7684\u90e8\u5206\u6587\u672c\u3002', [
            parameterDescription('old_text'),
            parameterDescription('start_byte'),
            parameterDescription('num_bytes'),
            parameterDescription('new_text')
        ]),
        'RIGHTB': functionDescription('\u6b64\u51fd\u6570\u6839\u636e\u6240\u6307\u5b9a\u7684\u5b57\u8282\u6570\u8fd4\u56de\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u6700\u540e\u4e00\u4e2a\u6216\u591a\u4e2a\u5b57\u7b26\u3002', [
            parameterDescription('text'),
            parameterDescription('num_bytes')
        ]),
        'SEARCHB': functionDescription('\u6b64\u51fd\u6570\u53ef\u5728\u7b2c\u4e8c\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\u4e2d\u67e5\u627e\u7b2c\u4e00\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\uff0c\u5e76\u8fd4\u56de\u7b2c\u4e00\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\u7684\u8d77\u59cb\u4f4d\u7f6e\u7684\u7f16\u53f7\uff0c\u8be5\u7f16\u53f7\u4ece\u7b2c\u4e8c\u4e2a\u6587\u672c\u5b57\u7b26\u4e32\u7684\u7b2c\u4e00\u4e2a\u5b57\u7b26\u7b97\u8d77\u3002', [
            parameterDescription('find_text'),
            parameterDescription('within_text'),
            parameterDescription(START_NUMBER)
        ]),
        'TEXTJOIN': functionDescription('\u6b64\u51fd\u6570\u5c06\u591a\u4e2a\u533a\u57df\u548c/\u6216\u5b57\u7b26\u4e32\u7684\u6587\u672c\u7ec4\u5408\u8d77\u6765\uff0c\u5e76\u5305\u62ec\u4f60\u5728\u8981\u7ec4\u5408\u7684\u5404\u6587\u672c\u503c\u4e4b\u95f4\u6307\u5b9a\u7684\u5206\u9694\u7b26\u3002', [
            parameterDescription('delimiter'),
            parameterDescription('ignore_empty'),
            parameterDescription('text1'),
            parameterDescription('text2', true)
        ]),
        'UNICHAR': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u7ed9\u5b9a\u6570\u503c\u5f15\u7528\u7684 Unicode \u5b57\u7b26\u3002', [
            parameterDescription('number')
        ]),
        'UNICODE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u5bf9\u5e94\u4e8e\u6587\u672c\u7684\u7b2c\u4e00\u4e2a\u5b57\u7b26\u7684\u6570\u5b57\uff08\u4ee3\u7801\u70b9\uff09\u3002', [
            parameterDescription('text')
        ]),
        'ENCODEURL': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de URL \u7f16\u7801\u7684\u5b57\u7b26\u4e32\u3002', [
            parameterDescription('text')
        ]),
        'BC_QRCODE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8QRCode\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_EAN13': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8EAN13\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_EAN8': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8EAN8\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_CODABAR': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8CODABAR\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_CODE39': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8CODE39\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_CODE93': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8CODE93\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_CODE128': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8CODE128\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_GS1_128': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8GS1_128\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_CODE49': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8CODE49\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_PDF417': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8PDF417\u7684\u6570\u636e\u96c6\u3002', [
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
        'BC_DATAMATRIX': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u7528\u4e8e\u63cf\u7ed8DATAMATRIX\u7684\u6570\u636e\u96c6\u3002', [
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
        'FILTER': functionDescription('\u6b64\u51fd\u6570\u8fc7\u6ee4\u4e00\u7247\u533a\u57df\u6216\u4e00\u4e2a\u6570\u7ec4\u3002', [
            parameterDescription('array'),
            parameterDescription('include'),
            parameterDescription('if_empty')
        ]),
        'RANDARRAY': functionDescription('\u8be5\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u968f\u673a\u6570\u7ec4\u3002', [
            parameterDescription('rows'),
            parameterDescription('columns'),
            parameterDescription('min'),
            parameterDescription('max'),
            parameterDescription('whole_number')
        ]),
        'SEQUENCE': functionDescription('\u6b64\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u6570\u5b57\u5e8f\u5217\u3002', [
            parameterDescription('rows'),
            parameterDescription('columns'),
            parameterDescription('start'),
            parameterDescription('step')
        ]),
        'SINGLE': functionDescription('\u5f53\u7ed9\u5b9a\u4e00\u4e2a\u503c\uff0c\u4e00\u7247\u533a\u57df\u6216\u4e00\u4e2a\u6570\u7ec4\u65f6\uff0c\u6b64\u51fd\u6570\u8fd4\u56de\u5355\u4e2a\u503c\u3002', [
            parameterDescription('value')
        ]),
        'SORT': functionDescription('\u6b64\u51fd\u6570\u5bf9\u4e00\u7247\u6216\u4e00\u4e2a\u6570\u7ec4\u8fdb\u884c\u6392\u5e8f\u3002', [
            parameterDescription('array'),
            parameterDescription('sort_index'),
            parameterDescription('sort_order'),
            parameterDescription('by_col')
        ]),
        'SORTBY': functionDescription('\u6b64\u51fd\u6570\u6839\u636e\u76f8\u5e94\u4e00\u7247\u533a\u57df\u6216\u4e00\u4e2a\u6570\u7ec4\u4e2d\u7684\u503c\u5bf9\u4e00\u7247\u533a\u57df\u6216\u4e00\u4e2a\u6570\u7ec4\u8fdb\u884c\u6392\u5e8f\u3002', [
            parameterDescription('array'),
            parameterDescription('by_array1'),
            parameterDescription('sort_order1'),
            parameterDescription('by_array2', true),
            parameterDescription('sort_order2', true),
        ]),
        'UNIQUE': functionDescription('\u6b64\u51fd\u6570\u4ece\u4e00\u7247\u533a\u57df\u6216\u4e00\u4e2a\u6570\u7ec4\u8fd4\u56de\u552f\u4e00\u503c\u3002', [
            parameterDescription('array'),
            parameterDescription('by_col'),
            parameterDescription('exactly_once')
        ]),
        'LET': functionDescription('\u6b64\u51fd\u6570\u5c06\u7ed3\u679c\u5206\u914d\u7ed9\u540d\u79f0\u3002\u53ef\u7528\u4e8e\u901a\u8fc7\u5b9a\u4e49\u516c\u5f0f\u5185\u7684\u540d\u79f0\u50a8\u5b58\u4e2d\u95f4\u8ba1\u7b97\u7ed3\u679c\u548c\u503c\u3002\u8fd9\u4e9b\u540d\u79f0\u4ec5\u5728 LET \u51fd\u6570\u8303\u56f4\u5185\u9002\u7528\u3002', [
            parameterDescription('name1'),
            parameterDescription('name_value1'),
            parameterDescription('calculation_or_name2'),
            parameterDescription('[name_value2, ...')
        ]),
        'IMAGE': functionDescription('\u6b64\u51fd\u6570\u4f1a\u5728\u5355\u5143\u683c\u5185\u6839\u636eurl\u6216\u8005base64\u5b57\u7b26\u4e32\u63d2\u5165\u4e00\u5f20\u56fe\u7247\u3002', [
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
        'GETPIVOTDATA': functionDescription('\u6b64\u51fd\u6570\u4f1a\u63d0\u53d6\u5b58\u50a8\u5728\u6570\u636e\u900f\u89c6\u8868\u4e2d\u7684\u6570\u636e\u3002', [
            parameterDescription('data_field'),
            parameterDescription('pivot_table'),
            parameterDescription('[field1, item1]'),
            parameterDescription('...')
        ]),
        'WEBSERVICE': functionDescription('\u6b64\u51fd\u6570\u4f1a\u4eceWeb\u670d\u52a1\u8fd4\u56de\u6570\u636e\u3002', [
            parameterDescription('url')
        ]),
        'FILTERJSON': functionDescription('\u6b64\u51fd\u6570\u4f1a\u5c06json\u5b57\u7b26\u4e32\u8f6c\u6362\u4e3a\u4e00\u7ec4\u503c\uff0c\u4e00\u4e2a\u5bf9\u8c61\u6216\u8005\u4e00\u4e2a\u5bf9\u8c61\u6570\u7ec4', [
            parameterDescription('json_string')
        ])
    },
    _tableFunctionsResource: {
        All: { name: '#All', description: '\u8fd4\u56de\u8868\u6216\u6307\u5b9a\u8868\u5217\u7684\u5b8c\u6574\u5185\u5bb9\uff0c\u5305\u62ec\u5217\u6807\u9898\u3001\u6570\u636e\u548c\u6c47\u603b\u884c' },
        Data: { name: '#Data', description: '\u8fd4\u56de\u8868\u6216\u6307\u5b9a\u8868\u5217\u7684\u6570\u636e\u5355\u5143\u683c' },
        Headers: { name: '#Headers', description: '\u8fd4\u56de\u8868\u6216\u6307\u5b9a\u8868\u5217\u7684\u5217\u6807\u9898' },
        Totals: { name: '#Totals', description: '\u8fd4\u56de\u8868\u6216\u6307\u5b9a\u8868\u5217\u7684\u6c47\u603b\u884c' },
        thisRow: { name: '#This Row', description: '\u6b64\u884c' },
    }
};
 }),

 './src/resource.zh.entry.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var calcEngine_res_zh_1 = __webpack_require__( './src/calcEngine.res.zh.ts');
exports.SR = { zh: calcEngine_res_zh_1.resource };
 })

 });

module.exports = GC.Spread.CalcEngine;
/***/ }),

/***/ './node_modules_local/@grapecity/js-pivot/dist/gc.pivot.resources.zh.js':
/*!******************************************************************************!*\
  !*** ./node_modules_local/@grapecity/js-pivot/dist/gc.pivot.resources.zh.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var GC = typeof GC === 'object' ? GC : {}; GC['Pivot'] =
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

 	__webpack_require__.p = '';

 	return __webpack_require__(__webpack_require__.s = './src/resource.zh.entry.ts');
 })
 ({

 './src/pivotEngine.res.zh.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.resource = {
    dateResource: {
        Jan: '1\u6708',
        Feb: '2\u6708',
        Mar: '3\u6708',
        Apr: '4\u6708',
        May: '5\u6708',
        Jun: '6\u6708',
        Jul: '7\u6708',
        Aug: '8\u6708',
        Sep: '9\u6708',
        Oct: '10\u6708',
        Nov: '11\u6708',
        Dec: '12\u6708',
        Qtr1: '\u5b63\u5ea61',
        Qtr2: '\u5b63\u5ea62',
        Qtr3: '\u5b63\u5ea63',
        Qtr4: '\u5b63\u5ea64',
        Seconds: '\u79d2',
        Minutes: '\u5206',
        Hours: '\u5c0f\u65f6',
        Days: '\u65e5',
        Months: '\u6708',
        Quarters: '\u5b63\u5ea6',
        Years: '\u5e74'
    },
    Exp_NoItemParseError: '\u67d0\u4e2a\u6570\u636e\u9879\u540d\u79f0\u65e0\u6cd5\u627e\u5230\uff0c\u8bf7\u68c0\u67e5\u786e\u8ba4\u540d\u79f0\u952e\u5165\u662f\u5426\u6b63\u786e\uff0c\u4e14\u900f\u89c6\u8868\u4e2d\u6709\u8be5\u6570\u636e\u9879\u3002',
    Exp_UnsupportedCalcItemType: '\u5728\u6570\u636e\u900f\u89c6\u8868\u516c\u5f0f\u4e2d\u4e0d\u652f\u6301\u5de5\u4f5c\u8868\u5f15\u7528\uff0c\u540d\u79f0\u548c\u6570\u7ec4\u3002',
    blank: '(\u7a7a\u767d)'
};
 }),

 './src/resource.zh.entry.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var pivotEngine_res_zh_1 = __webpack_require__( './src/pivotEngine.res.zh.ts');
exports.SR = { zh: pivotEngine_res_zh_1.resource };
 })

 });

(function(GC) {
    if( true && typeof module.exports === 'object') {
        module.exports = GC.Pivot;
    } else if(true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {return GC.Pivot;}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
 })(GC || {});
/***/ }),

/***/ './node_modules_local/@grapecity/js-sheets-common/dist/gc.spread.common.resources.zh.js':
/*!**********************************************************************************************!*\
  !*** ./node_modules_local/@grapecity/js-sheets-common/dist/gc.spread.common.resources.zh.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {
var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Common'] =
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

 	return __webpack_require__(__webpack_require__.s = './src/resource.zh.entry.ts');
 })
 ({

 './src/common/util/util.res.zh.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_InvalidDateFormat = '\u65e0\u6548\u65e5\u671f\u683c\u5f0f';
exports.Exp_InvalidExponentFormat = '\u65e0\u6548\u6307\u6570\u683c\u5f0f';
exports.Exp_InvalidSemicolons = '\u65e0\u6548\u683c\u5f0f : \u8fc7\u591a\u5206\u53f7';
exports.Exp_InvalidNumberGroupSize = '\u6570\u503c\u7ec4\u5927\u5c0f\u8303\u56f4\u5fc5\u987b\u5728 1 \u5230 9 \u4e4b\u95f4\uff0c\u9664\u4e86\u6700\u540e\u4e00\u4e2a\u503c\u53ef\u4ee5\u4e3a 0 \u3002';
exports.Exp_BadFormatSpecifier = '\u9519\u8bef\u7684\u683c\u5f0f\u6307\u793a\u7b26';
exports.Exp_InvalidNumberFormat = '\u65e0\u6548\u6570\u503c\u683c\u5f0f';
exports.Exp_InvalidCast = '\u65e0\u6548\u8f6c\u6362\u5f02\u5e38';
exports.Exp_Separator = '\u5728\u6587\u5316\u4fe1\u606f\u4e2d\uff0c\u5c0f\u6570\u70b9\u5206\u9694\u7b26; \u6570\u7ec4\u5206\u9694\u7b26\u548c\u5217\u5206\u9694\u7b26\u5fc5\u987b\u4e0d\u76f8\u540c\u3002';
 }),

 './src/plugins/formatter/formatter.res.zh.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.Exp_TokenIsNull = '\u6807\u5fd7\u4e3a\u7a7a\u3002';
exports.Exp_InvalidBackslash = '\u5b57\u7b26 \'\\\' \u65e0\u6cd5\u88ab\u8ba1\u7b97\u3002';
exports.Exp_FormatIllegal = '\u65e0\u6548\u683c\u5f0f\u3002';
exports.Exp_ValueIsNull = '\u6570\u503c\u4e3a\u7a7a';
exports.Exp_DuplicatedDescriptor = '\u91cd\u590d\u7684\u63cf\u8ff0\u88ab\u6dfb\u52a0\u3002';
exports.Exp_TokenIllegal = '\u65e0\u6548\u6807\u5fd7\u3002';
exports.Exp_ValueIllegal = '\u65e0\u6548\u6570\u503c\u3002';
exports.Exp_InvalidCast = '\u65e0\u6548\u8f6c\u6362\u5f02\u5e38';
 }),

 './src/resource.zh.entry.ts':
 (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var commonResource = __webpack_require__( './src/common/util/util.res.zh.ts');
var formatterResource = __webpack_require__( './src/plugins/formatter/formatter.res.zh.ts');
var resource = commonResource;
for (var prop in formatterResource) {
    if (formatterResource.hasOwnProperty(prop)) {
        resource[prop] = formatterResource[prop];
    }
}
exports.SR = { zh: resource };
 })

 });

module.exports = GC.Spread.Common;
/***/ }),

/***/ './resource.zh.entry.js':
/*!******************************!*\
  !*** ./resource.zh.entry.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
function extend (to, from1, from2) {
    extend2(to, from1);
    extend2(to, from2);
    return to;
}
function extend2 (to, from) {
    for (var prop in from) {
        if (from.hasOwnProperty(prop)) {
            to[prop] = from[prop];
        }
    }
    return to;
}

GC = GC || {};
GC.Spread = GC.Spread || {};
if ( GC.Spread.Common && GC.Spread.Common.SR) {
    var moduleResources = __webpack_require__(/*! ./node_modules_local/@grapecity/js-sheets-common/dist/gc.spread.common.resources.zh.js */ './node_modules_local/@grapecity/js-sheets-common/dist/gc.spread.common.resources.zh.js').SR['zh'];
    GC.Spread.Common.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Common = extend2({}, moduleResources);
}
if ( GC.Spread.CalcEngine && GC.Spread.CalcEngine.SR) {
    var moduleResources = __webpack_require__(/*! ./node_modules_local/@grapecity/js-calc/dist/gc.spread.calcengine.resources.zh.js */ './node_modules_local/@grapecity/js-calc/dist/gc.spread.calcengine.resources.zh.js').SR['zh'];
    GC.Spread.CalcEngine.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].CalcEngine = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets && GC.Spread.Sheets.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/core/core.res.zh.js */ './dist/core/core.res.zh.js');
    GC.Spread.Sheets.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Sheets = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Bindings && GC.Spread.Sheets.Bindings.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/data/data.res.zh.js */ './dist/plugins/data/data.res.zh.js');
    GC.Spread.Sheets.Bindings.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Bindings = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Outlines && GC.Spread.Sheets.Outlines.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/group/group.res.zh.js */ './dist/plugins/group/group.res.zh.js');
    GC.Spread.Sheets.Outlines.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Outlines = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.ConditionalFormatting && GC.Spread.Sheets.ConditionalFormatting.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/conditional/conditional.res.zh.js */ './dist/plugins/conditional/conditional.res.zh.js');
    GC.Spread.Sheets.ConditionalFormatting.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].ConditionalFormatting = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Touch && GC.Spread.Sheets.Touch.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/touch/touch.res.zh.js */ './dist/plugins/touch/touch.res.zh.js');
    GC.Spread.Sheets.Touch.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Touch = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.FloatingObjects && GC.Spread.Sheets.FloatingObjects.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/floatingObject/floatingobject.res.zh.js */ './dist/plugins/floatingObject/floatingobject.res.zh.js');
    GC.Spread.Sheets.FloatingObjects.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].FloatingObjects = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.CellTypes && GC.Spread.Sheets.CellTypes.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/celltype/celltypes.res.zh.js */ './dist/plugins/celltype/celltypes.res.zh.js');
    GC.Spread.Sheets.CellTypes.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].CellTypes = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Filter && GC.Spread.Sheets.Filter.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/filter/filter.res.zh.js */ './dist/plugins/filter/filter.res.zh.js');
    GC.Spread.Sheets.Filter.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Filter = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Tables && GC.Spread.Sheets.Tables.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/table/table.res.zh.js */ './dist/plugins/table/table.res.zh.js');
    GC.Spread.Sheets.Tables.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Tables = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Slicers && GC.Spread.Sheets.Slicers.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/slicer/slicer.res.zh.js */ './dist/plugins/slicer/slicer.res.zh.js');
    GC.Spread.Sheets.Slicers.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Slicers = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Fill && GC.Spread.Sheets.Fill.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/fill/fill.res.zh.js */ './dist/plugins/fill/fill.res.zh.js');
    GC.Spread.Sheets.Fill.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Fill = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.ContextMenu && GC.Spread.Sheets.ContextMenu.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/contextMenu/context-menu.res.zh.js */ './dist/plugins/contextMenu/context-menu.res.zh.js');
    GC.Spread.Sheets.ContextMenu.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].ContextMenu = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.OutlineColumn && GC.Spread.Sheets.OutlineColumn.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/outlineColumn/outlineColumn.res.zh.js */ './dist/plugins/outlineColumn/outlineColumn.res.zh.js');
    GC.Spread.Sheets.OutlineColumn.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].OutlineColumn = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.StatusBar && GC.Spread.Sheets.StatusBar.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/statusBar/statusBar.res.zh.js */ './dist/plugins/statusBar/statusBar.res.zh.js');
    GC.Spread.Sheets.StatusBar.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].StatusBar = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.AutoMerge && GC.Spread.Sheets.AutoMerge.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/autoMerge/autoMerge.res.zh.js */ './dist/plugins/autoMerge/autoMerge.res.zh.js');
    GC.Spread.Sheets.AutoMerge.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].AutoMerge = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Print && GC.Spread.Sheets.Print.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/print/print.res.zh.js */ './dist/plugins/print/print.res.zh.js');
    GC.Spread.Sheets.Print.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Print = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Charts && GC.Spread.Sheets.Charts.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/chart/chart.res.zh.js */ './dist/plugins/chart/chart.res.zh.js');
    GC.Spread.Sheets.Charts.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Charts = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.PDF && GC.Spread.Sheets.PDF.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/exportPDF/printPdf.res.zh.js */ './dist/plugins/exportPDF/printPdf.res.zh.js');
    GC.Spread.Sheets.PDF.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].PDF = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.Shapes && GC.Spread.Sheets.Shapes.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/shape/shape.res.zh.js */ './dist/plugins/shape/shape.res.zh.js');
    GC.Spread.Sheets.Shapes.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].Shapes = extend2({}, moduleResources);
}
if ( GC.Spread.Pivot && GC.Spread.Pivot.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/pivot/pivot.res.zh.js */ './dist/plugins/pivot/pivot.res.zh.js');
    GC.Spread.Pivot.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].PivotTables = extend2({}, moduleResources);
}
if ( GC.Spread.Sheets.TableSheet && GC.Spread.Sheets.TableSheet.SR) {
    var moduleResources = __webpack_require__(/*! ./dist/plugins/tableSheet/tableSheet.res.zh.js */ './dist/plugins/tableSheet/tableSheet.res.zh.js');
    GC.Spread.Sheets.TableSheet.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    if (!GC.Spread.Common.CultureManager._resourcesMap['zh-cn']) {
        GC.Spread.Common.CultureManager._resourcesMap['zh-cn'] = {};
    }
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].TableSheet = extend2({}, moduleResources);
}
if ( GC.Pivot && GC.Pivot.SR) {
    var moduleResources = __webpack_require__(/*! ./node_modules_local/@grapecity/js-pivot/dist/gc.pivot.resources.zh.js */ './node_modules_local/@grapecity/js-pivot/dist/gc.pivot.resources.zh.js').SR['zh'];
    GC.Pivot.SR['zh'] = extend({}, GC.Spread.Common.SR['zh'] || {}, moduleResources);
    GC.Spread.Common.CultureManager._resourcesMap['zh-cn'].PivotEngine = extend2({}, moduleResources);
}
module.exports = GC.Spread;
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