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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['StatusBar'] =
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
    /******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/statusBar/statusBar.entry.js');
    /******/ })
    /************************************************************************/
    /******/ ({

    /***/ './dist/plugins/statusBar/baseStatusBar.js':
    /*!*************************************************!*\
    !*** ./dist/plugins/statusBar/baseStatusBar.js ***!
    \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    'use strict';

    Object.defineProperty(exports, '__esModule', { value: true });


    var Core_1 = __webpack_require__(/*! Core */ 'Core');
    var statusItem_1 = __webpack_require__(/*! ./statusItem */ './dist/plugins/statusBar/statusItem.js');
    var $$ = Core_1.GC$;
    var STATUS_ITEM = 'statusItem';
    var keyword_null = null, ITEM_ALIGN_LEFT = 'left', ITEM_ALIGN_RIGHT = 'right';
    var BaseStatusBar = (function () {
        function BaseStatusBar(hostContainer) {
            this._itemList = [];
            this._itemLeftList = [];
            this._itemRightList = [];
            this._index = 0;
            this._host = keyword_null;
            this._hostContainer = hostContainer;
            this._createHost();
        }
        BaseStatusBar.prototype._createHost = function () {
            var host = this._host, menuHost = this._menuHost;
            if (!host) {
                host = this._host = document.createElement('div');
                menuHost = this._menuHost = document.createElement('div');
            }
            this._hostContainer.appendChild(host);
            this._hostContainer.appendChild(menuHost);
        };
        BaseStatusBar.prototype._setDefaultName = function (item) {
            if (!item.name) {
                item.name = STATUS_ITEM + this._index;
                this._index++;
            }
        };
        BaseStatusBar.prototype._addItem = function (item, position) {
            if (item instanceof statusItem_1.StatusItem && !this._getItem(item.name)) {
                this._setDefaultName(item);
                if (position >= 0 && position < this._itemList.length) {
                    this._itemList.splice(position, 0, item);
                }
                else {
                    this._itemList.push(item);
                }
                item.align = item.align || ITEM_ALIGN_LEFT;
                item._createStatusItem(this._hostContainer);
                return true;
            }
            return false;
        };
        BaseStatusBar.prototype._insertItem = function (item, position) {
            var result = false, itemList = this._itemList, validPos = position >= 0 && position < itemList.length, currentItem = keyword_null, existItemDom = keyword_null;
            if (validPos) {
                currentItem = itemList[position];
                existItemDom = currentItem._getStatusItem();
            }
            if (this._addItem(item, position)) {
                var alignRight = item.align === ITEM_ALIGN_RIGHT;
                try {
                    if (alignRight) {
                        var rightList = this._itemRightList, rightIndex = rightList.indexOf(currentItem), rightLength = rightList.length, rightLastIndex = rightLength - 1;
                        if (existItemDom && rightIndex >= 0 && rightIndex < rightLastIndex) {
                            existItemDom = rightList[rightIndex + 1]._getStatusItem();
                        }
                        else if (existItemDom === keyword_null) {
                            existItemDom = rightList[0]._getStatusItem();
                        }
                        else if (existItemDom && rightIndex < 0 || rightIndex === rightLastIndex) {
                            existItemDom = keyword_null;
                        }
                        this._itemRightList.push(item);
                    }
                    else {
                        this._itemLeftList.push(item);
                    }
                    this._host.insertBefore(item._getStatusItem(), existItemDom);
                    if (this._context) {
                        item.onBind(this._context);
                    }
                    result = true;
                }
                catch (e) {
                    alignRight ? this._itemRightList.splice(this._itemRightList.indexOf(item), 1) : this._itemLeftList.splice(this._itemLeftList.indexOf(item), 1);
                    this._itemList.splice(this._itemList.indexOf(item), 1);
                }
            }
            return result;
        };
        BaseStatusBar.prototype._removeItem = function (itemName) {
            var itemList = this._itemList, result = false, index, currentItem;
            for (index = 0; index < itemList.length; index++) {
                currentItem = itemList[index];
                if (itemName === currentItem.name) {
                    result = true;
                    break;
                }
            }
            if (result) {
                currentItem.onUnbind();
                if (currentItem.align === ITEM_ALIGN_RIGHT) {
                    this._itemRightList.splice(this._itemRightList.indexOf(currentItem), 1);
                }
                else {
                    this._itemLeftList.splice(this._itemLeftList.indexOf(currentItem), 1);
                }
                this._itemList.splice(index, 1);

                this._host.removeChild(currentItem._getStatusItem());
                return true;
            }
            return false;
        };
        BaseStatusBar.prototype._getItem = function (itemName) {
            var itemList = this._itemList, index, currentItem;
            for (index = 0; index < itemList.length; index++) {
                currentItem = itemList[index];
                if (itemName === currentItem.name) {
                    return currentItem;
                }
            }
            return keyword_null;
        };
        BaseStatusBar.prototype._bindContext = function (context) {
            this._context = context;
            this._itemList.forEach(function (item) {
                item.onBind(context);
                item.onUpdate();
            });
        };
        BaseStatusBar.prototype._reset = function () {
            this._itemLeftList = [];
            this._itemRightList = [];
            $$(this._host).empty();
        };
        BaseStatusBar.prototype._onLayout = function () {
            var self = this, host = this._host, itemAlign = ITEM_ALIGN_LEFT, itemContainer;
            this._reset();
            this._itemList.forEach(function (item) {
                itemAlign = item.align;
                itemContainer = item._getStatusItem();
                itemContainer.style.float = itemAlign;
                if (itemAlign === ITEM_ALIGN_RIGHT) {
                    self._itemRightList.unshift(item);
                }
                else {
                    self._itemLeftList.unshift(item);
                    host.appendChild(itemContainer);
                }
            });
            this._itemRightList.forEach(function (item) {
                host.appendChild(item._getStatusItem());
            });
        };
        BaseStatusBar.prototype._onUpdate = function () {
            this._itemList.forEach(function (item) {
                item.onUpdate();
            });
            this._onLayout();
        };
        BaseStatusBar.prototype._getMenuDataList = function () {
            var menuDataList = [];
            this._itemList.forEach(function (item) {
                menuDataList.push(item._getMenuData());
            });
            return menuDataList;
        };
        BaseStatusBar.prototype._checkChanged = function (commandOptions) {
            var itemList = this._itemList, commandName = commandOptions.name, i, item;
            for (i = 0; i < itemList.length; i++) {
                item = itemList[i];
                if (item.name === commandName) {
                    item._checkChanged(commandOptions);
                    break;
                }
            }
        };
        BaseStatusBar.prototype._getItemList = function () {
            return this._itemList;
        };
        BaseStatusBar.prototype._unbindContext = function () {
            var self = this, itemList = self._itemList, index, item;
            this._context = keyword_null;
            for (index = 0; index < itemList.length; index++) {
                item = itemList[index];
                item.onUnbind();
            }
        };
        BaseStatusBar.prototype._dispose = function () {
            var self = this, itemList = self._itemList, index, item;
            if (this._host) {
                for (index = 0; index < itemList.length; index++) {
                    item = itemList[index];
                    self._host.removeChild(item._itemContainer);
                    item.onDispose();
                }
                this._host.parentElement && this._host.parentElement.removeChild(this._host);
                this._menuHost.parentElement && this._menuHost.parentElement.removeChild(this._menuHost);
                this._host = keyword_null;
                this._menuHost = keyword_null;
            }
            this._index = keyword_null;
            this._itemList = keyword_null;
            this._itemLeftList = keyword_null;
            this._itemRightList = keyword_null;
        };
        return BaseStatusBar;
    }());
    exports.BaseStatusBar = BaseStatusBar;
    /***/ }),

    /***/ './dist/plugins/statusBar/statusBar.entry.js':
    /*!***************************************************!*\
    !*** ./dist/plugins/statusBar/statusBar.entry.js ***!
    \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    'use strict';

    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, '__esModule', { value: true });
    var Core_1 = __webpack_require__(/*! Core */ 'Core');
    var statusBar_1 = __webpack_require__(/*! ./statusBar */ './dist/plugins/statusBar/statusBar.js');
    exports.StatusBar = statusBar_1.StatusBar;
    var statusItem_1 = __webpack_require__(/*! ./statusItem */ './dist/plugins/statusBar/statusItem.js');
    exports.StatusItem = statusItem_1.StatusItem;
    __export(__webpack_require__(/*! ./statusBar.ns */ './dist/plugins/statusBar/statusBar.ns.js'));


    exports.findControl = function (host) {
        if (typeof host === 'string') {
            host = document.getElementById(host);
        }
        return Core_1.GC$(host).data('statusbar');
    };
    /***/ }),

    /***/ './dist/plugins/statusBar/statusBar.js':
    /*!*********************************************!*\
    !*** ./dist/plugins/statusBar/statusBar.js ***!
    \*********************************************/
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
    var SheetsCalc = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
    var SheetsContextMenu = __webpack_require__(/*! ContextMenu */ 'ContextMenu');
    var statusBar_ns_1 = __webpack_require__(/*! ./statusBar.ns */ './dist/plugins/statusBar/statusBar.ns.js');
    var statusItem_1 = __webpack_require__(/*! ./statusItem */ './dist/plugins/statusBar/statusItem.js');
    var baseStatusBar_1 = __webpack_require__(/*! ./baseStatusBar */ './dist/plugins/statusBar/baseStatusBar.js');
    var $$ = Core_1.GC$, Core_util = Core_1._util, createElement = Core_util._createElement, cancelDefault = Core_util._cancelDefault;
    var Types = Common_1.Common._Types, stringFormat = Common_1.Common._StringHelper._format, isNullOrUndefined = Types._isNullOrUndefined;
    var ActionBase = Core_1.Commands.ActionBase, isError = CalcEngine_1.Convert._isError;
    var keyword_null = null, inherit = $$.inherit;
    var GC_STATUSBAR = 'gc-statusbar-', SLIDER = 'slider-', SLIDER_BTN_CLASS = GC_STATUSBAR + SLIDER + 'btn', SLIDER_ADD_BTN_CLASS = GC_STATUSBAR + SLIDER + 'add-btn', SLIDER_BACK_PROGRESS_CLASS = GC_STATUSBAR + SLIDER + 'back-progress', SLIDER_BACK_CLASS = GC_STATUSBAR + SLIDER + 'back', SLIDER_MIDDLE_LINE_CLASS = GC_STATUSBAR + SLIDER + 'middle-line', SLIDER_DRAG_BAR_CLASS = GC_STATUSBAR + SLIDER + 'drag-bar', ZOOM_PANEL_CLASS = GC_STATUSBAR + 'zoom-panel', SLIDER_BTN_CONTAINER_CALSS = GC_STATUSBAR + SLIDER + 'btn-container', SLIDER_ADD_BTN_CONTAINER_CLASS = GC_STATUSBAR + SLIDER + 'add-btn-container', STATUSBAR_CLASS = 'gc-statusbar', STATUSBAR_MENU_HOST = GC_STATUSBAR + 'menu-host';
    var COMMAND_PREFIX = 'gc.spread.', ZOOM_DEFAULT_VALUE = '100', ZOOM_PERCENT_SIGN = '%', PIXEL = 'px';
    var EDIT_MODE_ITEM_ID = 'cellMode', FORMULA_AVERAGE_ITEM_ID = 'average', FORMULA_COUNT_ITEM_ID = 'count', FORMULA_NUMERICAL_COUNT_ITEM_ID = 'numericalCount', FORMULA_MINIMUM_ITEM_ID = 'min', FORMULA_MAXIMUM_ITEM_ID = 'max', FORMULA_SUM_ITEM_ID = 'sum', ZOOM_SLIDER_ITEM_ID = 'zoomSlider', ZOOM_PANEL_ITEM_ID = 'zoomPanel';
    var DIV_ELEMENT = 'div', SPAN_ELEMENT = 'span';
    var ITEM_STYLE_DISPLAY_NONE = 'none', ITEM_STYLE_DISPLAY_INLINE = 'inline', ITEM_STYLE_DISPLAY_INLINE_BLOCK = 'inline-block';
    var STARTUS_BAR_MIN_HEIGHT = 15, ZOOM_SLIDER_MIN_VALUE = 25, ZOOM_SLIDER_MAX_VALUE = 400, ZOOM_SLIDER_MIDDLE_VALUE = 100, ZOOM_SLIDER_DEFAULT_VALUE = 100, ZOOM_SLIDER_STEP = 10, ZOOM_SLIDER_MIDDLE_LINE_WIDTH = 1, ZOOM_SLIDER_BAR_WIDTH = 4, ZOOM_SLIDER_BACK_WIDTH = 120, ZOOM_SLIDER_OPACITY = 0.7, ZOOM_SLIDER_MIDDLE_LINE_HEIGHT = 8, ZOOM_SLIDER_BAR_HEIGHT = 10;
    var ALIGN_RIGHT = 'right';
    var STATUSBAR_ZOOM_CMD = 'statusbarZoom', STATUSBAR = 'statusBar';
    var CLICK_EVENT = 'click', MOUSE_DOWN_EVENT = 'mousedown', MOUSE_UP_EVENT = 'mouseup', MOUSE_MOVE_EVENT = 'mousemove', CONTEXT_MENU_EVENT = 'contextmenu';
    var STATUSBAR_NS = '.statusbar', CHANGE_TYPE_INVALIDATE = 'invalidateLayout';
    var FORMULA_AVERAGE_FUNC = 101, FORMULA_COUNTA_FUNC = 103, FORMULA_COUNT_FUNC = 102, FORMULA_MIN_FUNC = 105, FORMULA_MAX_FUNC = 104, FORMULA_SUM_FUNC = 109, FORMULA_LEFT_BRACKET = '(', FORMULA_RIGHT_BRACKET = ')', FORMULA_FORMAT = 'formatter', FORMULA_AUTO_FORMAT = '_autoFormatter', FORMULA_SUBTOTAL = '_SUBTOTALFORSTATUSBAR';
    var formulaIdList = [FORMULA_AVERAGE_ITEM_ID, FORMULA_COUNT_ITEM_ID, FORMULA_NUMERICAL_COUNT_ITEM_ID, FORMULA_MINIMUM_ITEM_ID, FORMULA_MAXIMUM_ITEM_ID, FORMULA_SUM_ITEM_ID];
    var isSheetsContextMenuExist = !!SheetsContextMenu, MenuView, ContextMenuDialog;
    if (SheetsContextMenu) {
        MenuView = SheetsContextMenu.MenuView;
        ContextMenuDialog = SheetsContextMenu._ContextMenuViewDialog;
    }
    var rm = new Common_1.Common.ResourceManager(statusBar_ns_1.SR, 'StatusBar');
    var sR = rm.getResource.bind(rm);
    function _getSubtotalFunc(funcCode, range) {
        var listSeparator = Common_1.Common.CultureManager._getCultureInfo().NumberFormat.listSeparator;
        return FORMULA_SUBTOTAL + FORMULA_LEFT_BRACKET + funcCode + listSeparator + range + FORMULA_RIGHT_BRACKET;
    }
    function _deleteItem(arr, index) {
        arr.splice(index, 1);
    }

    function _getNonIntersectSelections(sheet, selections) {
        var result = selections, len = selections.length, resultSelections = [];

        if (len > 1) {
            resultSelections.push(selections[0]);
            for (var i = 1; i < len; i++) {
                resultSelections = _getSplitSelections(sheet, selections[i], resultSelections);
            }
            return resultSelections;
        }
        return result;
    }
    function _getSplitSelections(sheet, sel, resultSelections) {
        var maxRowCount = sheet.getRowCount(3 ), maxColCount = sheet.getColumnCount(3 ), currentArr = [], tempArr = [], baseSelc, currentSelc, intersect;
        currentArr.push(sel);
        var resultLen = resultSelections.length;
        for (var j = 0; j < resultLen; j++) {
            baseSelc = resultSelections[j];

            for (var k = 0; k < currentArr.length;) {
                currentSelc = currentArr[k];
                intersect = currentSelc.getIntersect(baseSelc, maxRowCount, maxColCount);
                if (intersect) {
                    tempArr = sheet._deselectSelection(currentSelc, intersect, maxRowCount, maxColCount);
                    _deleteItem(currentArr, k);
                    currentArr = tempArr.concat(currentArr);
                    k += tempArr.length;
                }
                else {
                    k++;
                }
            }
        }
        return currentArr.concat(resultSelections);
    }
    function _getFormat(sheet, row, col) {
        var fmt = sheet._getStyleProperty(row, col, FORMULA_FORMAT);
        if (!fmt) {
            fmt = sheet._getStyleProperty(row, col, FORMULA_AUTO_FORMAT);
        }
        return fmt;
    }
    function getValueFromZoomFactor(zoomFactor) {
        var value = zoomFactor;
        if (zoomFactor > 0 && zoomFactor <= 4) {
            value = Math.floor(+parseFloat((zoomFactor * 100).toPrecision(12)));
        }
        return value;
    }
    function _statusbarZoomExcute(sheet, newZoomFactor, oldZoomFactor) {
        if (sheet && sheet.parent && sheet.parent.options.allowUserZoom) {
            var args = {
                sheet: sheet,
                sheetName: sheet.name(),
                newZoomFactor: newZoomFactor,
                oldZoomFactor: oldZoomFactor,
                cancel: false
            };
            sheet._trigger(Core_1.Events.ViewZooming, args);
            if (args && args.cancel === true) {
                return;
            }
            newZoomFactor = args.newZoomFactor;
            if (newZoomFactor !== oldZoomFactor) {
                sheet._commandManager().execute({
                    cmd: STATUSBAR_ZOOM_CMD,
                    sheetName: sheet.name(),
                    newZoomFactor: newZoomFactor,
                    oldZoomFactor: oldZoomFactor
                });
                _raiseZoomChanged(sheet, newZoomFactor, oldZoomFactor);
            }
        }
    }
    function getDomOffset(dom) {
        var t = { top: dom.offsetTop, left: dom.offsetLeft };
        var p = dom.offsetParent;
        while (p) {
            t.top += p.offsetTop;
            t.left += p.offsetLeft;
            p = p.offsetParent;
        }
        var body = document.body, clientTop = body.clientTop, clientLeft = body.clientLeft;
        if (!isNaN(clientTop)) {
            t.top += clientTop;
        }
        if (!isNaN(clientLeft)) {
            t.left += clientLeft;
        }
        return t;
    }
    function isNonEmptyString(str) {
        return str !== '';
    }
    var EditModeItem = (function (_super) {
        __extends(EditModeItem, _super);
        function EditModeItem(name, options) {
            var _this = _super.call(this, name, options) || this;
            _this._eventNs = STATUSBAR_NS + _this.name;
            return _this;
        }
        EditModeItem.prototype.onBind = function (context) {
            var self = this, value;
            self._context = context;
            context.bind(Core_1.Events.EditorStatusChanged + self._eventNs, function (e, data) {
                value = self._getStatusValue(data.newStatus);
                self._onActionChangeValue(value);
            });
            context.bind(Core_1.Events.ActiveSheetChanged + self._eventNs, function () {
                self.onUpdate();
            });
        };
        EditModeItem.prototype.onUpdate = function () {
            _super.prototype.onUpdate.call(this);
            var sheet = Core_1._getActiveSheet(this._context);
            if (sheet) {
                var status_1 = sheet.editorStatus();
                var value = this._getStatusValue(status_1);
                this._onActionChangeValue(value);
            }
        };
        EditModeItem.prototype._getStatusValue = function (status) {
            var value;
            switch (status) {
                case 0: {
                    value = sR().cellModeReady;
                    break;
                }
                case 1: {
                    value = sR().cellModeEnter;
                    break;
                }
                case 2: {
                    value = sR().cellModeEdit;
                    break;
                }
            }
            return value;
        };
        EditModeItem.prototype._onActionChangeValue = function (status) {
            if (status !== this.value) {
                this.value = status;
                this.tipText = stringFormat(sR().toolTipCellMode, [status]);
                var editModeItem = this._item;
                if (editModeItem) {
                    editModeItem.parentElement.title = this.tipText;
                    if (!isNullOrUndefined(this.value)) {
                        editModeItem.innerText = this.value + '';
                    }
                }
            }
        };
        EditModeItem.prototype.onUnbind = function () {
            if (this._context) {
                this._context.unbind(Core_1.Events.EditorStatusChanged + this._eventNs);
                this._context.unbind(Core_1.Events.ActiveSheetChanged + this._eventNs);
                this._context = keyword_null;
            }
        };
        return EditModeItem;
    }(statusItem_1.StatusItem));
    var FormulaItem = (function (_super) {
        __extends(FormulaItem, _super);
        function FormulaItem(name, options) {
            var _this = _super.call(this, name, options) || this;
            _this._formulaMiddleStr = ': ';
            _this._needCacheForScroll = false;
            _this._prefix = options.prefix;
            _this._eventNs = STATUSBAR_NS + _this.name;
            _this._maxCalcCells = Number.MAX_VALUE;
            _this._valueListCache = {};
            return _this;
        }
        FormulaItem.prototype.onBind = function (context) {
            var self = this;
            self._context = context;
            context.bind(Core_1.Events.SelectionChanging + self._eventNs, function (e, info) {
                self._handleSelectionChange(info);
            });
            context.bind(Core_1.Events.SelectionChanged + self._eventNs, function (e, info) {
                self._handleSelectionChange(info);
            });
            context.bind(Core_1.Events.ValueChanged + self._eventNs, function (e, info) {
                var sheet = info.sheet, row = info.row, col = info.col;
                if (sheet._isSelected(row, col)) {
                    self.onUpdate();
                }
            });
            context.bind(Core_1.Events.RangeChanged + self._eventNs, function () {
                self.onUpdate();
            });
            context.bind(Core_1.Events.DragFillBlockCompleted + self._eventNs, function () {
                self.onUpdate();
            });
            context.bind(Core_1.Events.ActiveSheetChanged + self._eventNs, function () {
                self.onUpdate();
            });
            context.bind(Core_1.Events.TopRowChanged + self._eventNs, function () {
                self._setNeedCacheForScroll(true);
            });
            context.bind(Core_1.Events.RowChanged + self._eventNs, function () {
                self._setNeedCacheForScroll(false);
            });
            context.bind(Core_1.Events.ColumnChanged + self._eventNs, function () {
                self._setNeedCacheForScroll(false);
            });
            context.bind(Core_1.Events.RangeFiltered + self._eventNs, function () {
                self._setNeedCacheForScroll(false);
            });
            context.bind(Core_1.Events.TableFiltered + self._eventNs, function () {
                self._setNeedCacheForScroll(false);
            });
            context.bind(Core_1.Events.TableFilterCleared + self._eventNs, function () {
                self._setNeedCacheForScroll(false);
            });
            context.bind(Core_1.Events.RangeFilterCleared + self._eventNs, function () {
                self._setNeedCacheForScroll(false);
            });
        };
        FormulaItem.prototype._setNeedCacheForScroll = function (value) {
            this._needCacheForScroll = value;
        };
        FormulaItem.prototype._needCalc = function (selections) {
            var sheet = Core_1._getActiveSheet(this._context);
            var cellsCount = 0;
            selections.forEach(function (sel) {
                var actualRange = sheet._getActualRange(sel);
                cellsCount += actualRange.rowCount * actualRange.colCount;
            });
            return cellsCount < this._maxCalcCells;
        };
        FormulaItem.prototype._handleSelectionChange = function (info) {
            var self = this, sheet = info.sheet, selections = info.newSelections;
            if (self._needCalc(selections)) {
                if (selections.length === 1 && selections[0].rowCount === 1 && selections[0].colCount === 1) {
                    var valueList = self._getSelectionValueList(sheet, keyword_null);
                    self._onActionChangeValue(valueList[self.name]);
                }
                else {
                    var rangesToFormula = self._rangesToFormula(_getNonIntersectSelections(sheet, selections));
                    if (isNonEmptyString(rangesToFormula)) {
                        var valueList = self._getSelectionValueList(sheet, rangesToFormula);
                        self._onActionChangeValue(valueList[self.name]);
                    }
                    else if (isNullOrUndefined(self.value)) {
                        self._updateDisplay(false);
                    }
                }
            }
            else {
                self._onActionChangeValue(keyword_null);
            }
        };
        FormulaItem.prototype._getSelectionValueList = function (sheet, rangesToFormula) {
            var self = this, evaluate = SheetsCalc.evaluateFormula, count = 0, numericalCount = keyword_null, sum = keyword_null, average = keyword_null, minimum = keyword_null, maximum = keyword_null;
            if (rangesToFormula) {
                var valueListCache = self._valueListCache, currentValueListCache = valueListCache[rangesToFormula];
                if (!self._needCacheForScroll || isNullOrUndefined(currentValueListCache)) {
                    self._setNeedCacheForScroll(false);
                    count = evaluate(sheet, _getSubtotalFunc(FORMULA_COUNTA_FUNC, rangesToFormula));
                    if (count > 1) {
                        numericalCount = evaluate(sheet, _getSubtotalFunc(FORMULA_COUNT_FUNC, rangesToFormula));
                        if (numericalCount > 0) {
                            var tempAverage = evaluate(sheet, _getSubtotalFunc(FORMULA_AVERAGE_FUNC, rangesToFormula));
                            var tempMinimum = evaluate(sheet, _getSubtotalFunc(FORMULA_MIN_FUNC, rangesToFormula));
                            var tempMaximum = evaluate(sheet, _getSubtotalFunc(FORMULA_MAX_FUNC, rangesToFormula));
                            var tempSum = evaluate(sheet, _getSubtotalFunc(FORMULA_SUM_FUNC, rangesToFormula));
                            if (!isError(tempAverage) && !isError(tempMinimum) && !isError(tempMaximum) && !isError(tempSum)) {
                                var activeCellRow = sheet.getActiveRowIndex(), activeCellCol = sheet.getActiveColumnIndex(), ct = sheet.getCellType(activeCellRow, activeCellCol), fmt = _getFormat(sheet, activeCellRow, activeCellCol), formattedData = {};
                                if (tempAverage.toString().includes('.')) {
                                    tempAverage = Math.round(tempAverage * 100) / 100;
                                }
                                average = ct.format(tempAverage, fmt, formattedData);
                                minimum = ct.format(tempMinimum, fmt, formattedData);
                                maximum = ct.format(tempMaximum, fmt, formattedData);
                                sum = ct.format(tempSum, fmt, formattedData);
                            }
                        }
                    }
                    valueListCache[rangesToFormula] = { average: average, numericalCount: numericalCount, minimum: minimum, maximum: maximum, sum: sum, count: count };
                }
                else {
                    average = currentValueListCache.average;
                    numericalCount = currentValueListCache.numericalCount;
                    minimum = currentValueListCache.minimum;
                    maximum = currentValueListCache.maximum;
                    sum = currentValueListCache.sum;
                    count = currentValueListCache.count;
                }
            }
            var formulaValueList = {};
            formulaValueList.average = average;
            formulaValueList.numericalCount = numericalCount > 0 ? numericalCount : keyword_null;
            formulaValueList.min = minimum;
            formulaValueList.max = maximum;
            formulaValueList.sum = sum;
            formulaValueList.count = count > 1 ? count : keyword_null;
            return formulaValueList;
        };
        FormulaItem.prototype._updateDisplay = function (show) {
            if (this._itemContainer) {
                this._itemContainer.style.display = show ? ITEM_STYLE_DISPLAY_INLINE_BLOCK : ITEM_STYLE_DISPLAY_NONE;
            }
        };
        FormulaItem.prototype._onActionChangeValue = function (value) {
            var middleStr = this._formulaMiddleStr, item = this._item, prefix = this._prefix, visible = this.visible, show = false;
            this.value = value;
            item.innerText = prefix + middleStr + value;
            if (!isNullOrUndefined(value) && visible) {
                show = true;
            }
            this._updateDisplay(show);
        };
        FormulaItem.prototype._onCultureChanged = function (res) {
            if (res) {
                var content = res.menuContent, tipText = res.tipText;
                this.menuContent = content;
                this._prefix = content;
                this.tipText = tipText;
                this._itemContainer.title = tipText;
            }
        };
        FormulaItem.prototype.onUpdate = function () {
            _super.prototype.onUpdate.call(this);
            var self = this;
            var sheet = Core_1._getActiveSheet(self._context);
            if (sheet) {
                var selections = sheet.getSelections();
                if (self._needCalc(selections)) {
                    if (selections.length === 1 && selections[0].rowCount === 1 && selections[0].colCount === 1) {
                        var valueList = self._getSelectionValueList(sheet, keyword_null);
                        self._onActionChangeValue(valueList[self.name]);
                    }
                    else {
                        var rangesToFormula = self._rangesToFormula(_getNonIntersectSelections(sheet, selections));
                        if (isNonEmptyString(rangesToFormula)) {
                            var valueList = self._getSelectionValueList(sheet, rangesToFormula), value = valueList[self.name];
                            if (isNullOrUndefined(value) || value !== self.value) {
                                self.value = value;
                                self._onActionChangeValue(value);
                            }
                        }
                        else if (isNullOrUndefined(self.value)) {
                            self._updateDisplay(false);
                        }
                    }
                }
                else {
                    self._onActionChangeValue(keyword_null);
                }
            }
        };
        FormulaItem.prototype.onUnbind = function () {
            var context = this._context, eventNs = this._eventNs;
            if (context) {
                context.unbind(Core_1.Events.SelectionChanging + eventNs);
                context.unbind(Core_1.Events.SelectionChanged + eventNs);
                context.unbind(Core_1.Events.ValueChanged + eventNs);
                context.unbind(Core_1.Events.RangeChanged + eventNs);
                context.unbind(Core_1.Events.DragFillBlockCompleted + eventNs);
                context.unbind(Core_1.Events.ActiveSheetChanged + eventNs);
                context.unbind(Core_1.Events.TopRowChanged + eventNs);
                context.unbind(Core_1.Events.RowChanged + eventNs);
                context.unbind(Core_1.Events.ColumnChanged + eventNs);
                context.unbind(Core_1.Events.RangeFiltered + eventNs);
                context.unbind(Core_1.Events.TableFiltered + eventNs);
                context.unbind(Core_1.Events.TableFilterCleared + eventNs);
                context.unbind(Core_1.Events.RangeFilterCleared + eventNs);
                this._context = keyword_null;
            }
        };
        FormulaItem.prototype._rangesToFormula = function (ranges, baseRow, baseCol, rangeReferenceRelative, useR1C1) {
            var parser = this._parser;
            if (!parser) {
                parser = this._parser = new CalcEngine_1.Parser();
            }
            var context = this._parserContext;
            if (!context) {
                context = this._parserContext = new SheetsCalc.SheetParserContext(keyword_null, !!useR1C1, CalcEngine_1._createCellIdentity(baseRow, baseCol));
            }
            return SheetsCalc._rangesToFormulaInternal(parser, context, ranges, baseRow, baseCol, rangeReferenceRelative);
        };
        FormulaItem.prototype.onDispose = function () {
            _super.prototype.onDispose.call(this);
            this._parser = keyword_null;
            this._valueListCache = keyword_null;
            if (this._parserContext) {
                this._parserContext._dispose();
                this._parserContext = keyword_null;
            }
        };
        return FormulaItem;
    }(statusItem_1.StatusItem));
    // var ZoomSliderItem =  (function (_super) {
    //     __extends(ZoomSliderItem, _super);
    //     function ZoomSliderItem(statusBar, name, options) {
    //         var _this = _super.call(this, name, options) || this;
    //         _this.min = ZOOM_SLIDER_MIN_VALUE;
    //         _this.max = ZOOM_SLIDER_MAX_VALUE;
    //         _this.middle = ZOOM_SLIDER_MIDDLE_VALUE;
    //         _this.step = ZOOM_SLIDER_STEP;
    //         _this._sliderMiddleLineWidth = ZOOM_SLIDER_MIDDLE_LINE_WIDTH;
    //         _this._sliderBarWidth = ZOOM_SLIDER_BAR_WIDTH;
    //         _this._sliderProgressWidth = ZOOM_SLIDER_BACK_WIDTH;
    //         _this._sliderMiddleLineDefaultOffset = Math.round((_this._sliderProgressWidth + _this._sliderMiddleLineWidth) / 2);
    //         _this._sliderBarDefaultOffset = Math.round((_this._sliderProgressWidth + _this._sliderBarWidth) / 2);
    //         _this._canDrag = false;
    //         _this._statusBar = statusBar;
    //         _this._eventNs = STATUSBAR_NS + _this.name;
    //         return _this;
    //     }
    //     ZoomSliderItem.prototype.onCreateItemView = function (container) {
    //         var self = this, actualHeight = self._height, height = actualHeight + PIXEL;
    //         container.style.display = this.visible ? ITEM_STYLE_DISPLAY_INLINE : ITEM_STYLE_DISPLAY_NONE;
    //         var subtractBtnContainer = this._subtractBtnContainer;
    //         if (!subtractBtnContainer) {
    //             subtractBtnContainer = this._subtractBtnContainer = createElement(DIV_ELEMENT);
    //         }
    //         $$(subtractBtnContainer).addClass(SLIDER_BTN_CONTAINER_CALSS);
    //         subtractBtnContainer.style.height = height;
    //         subtractBtnContainer.style.lineHeight = height;
    //         var subtractBtn = this._subtractBtn;
    //         if (!subtractBtn) {
    //             subtractBtn = this._subtractBtn = createElement(DIV_ELEMENT);
    //         }
    //         subtractBtn.title = sR().toolTipZoomOut;
    //         $$(subtractBtn).addClass(SLIDER_BTN_CLASS);
    //         subtractBtn.style.height = height;
    //         subtractBtn.addEventListener(CLICK_EVENT, function () {
    //             self._handleZoomBtnClick(false);
    //         });
    //         var addBtnContainer = this._addBtnContainer;
    //         if (!addBtnContainer) {
    //             addBtnContainer = this._addBtnContainer = createElement(DIV_ELEMENT);
    //         }
    //         $$(addBtnContainer).addClass(SLIDER_ADD_BTN_CONTAINER_CLASS);
    //         addBtnContainer.style.height = height;
    //         addBtnContainer.style.lineHeight = height;
    //         var addBtn = this._addBtn;
    //         if (!addBtn) {
    //             addBtn = this._addBtn = createElement(DIV_ELEMENT);
    //         }
    //         addBtn.title = sR().toolTipZoomIn;
    //         $$(addBtn).addClass(SLIDER_ADD_BTN_CLASS);
    //         addBtn.style.height = height;
    //         addBtn.addEventListener(CLICK_EVENT, function () {
    //             self._handleZoomBtnClick(true);
    //         });
    //         var sliderBackProgress = this._sliderBackProgress;
    //         if (!sliderBackProgress) {
    //             sliderBackProgress = this._sliderBackProgress = createElement(DIV_ELEMENT);
    //         }
    //         $$(sliderBackProgress).addClass(SLIDER_BACK_PROGRESS_CLASS);
    //         sliderBackProgress.style.marginTop = Math.floor(actualHeight / 2 + 1) + PIXEL;
    //         sliderBackProgress.addEventListener(CLICK_EVENT, function () {
    //             return false;
    //         });
    //         var sliderMiddleLine = this._sliderMiddleLine;
    //         if (!sliderMiddleLine) {
    //             sliderMiddleLine = this._sliderMiddleLine = createElement(DIV_ELEMENT);
    //         }
    //         $$(sliderMiddleLine).addClass(SLIDER_MIDDLE_LINE_CLASS);
    //         sliderMiddleLine.style.top = Math.floor((actualHeight - ZOOM_SLIDER_MIDDLE_LINE_HEIGHT) / 2 + 1) + PIXEL;
    //         sliderMiddleLine.style.left = self._sliderMiddleLineDefaultOffset + PIXEL;
    //         var sliderDragBar = this._sliderDragBar;
    //         if (!sliderDragBar) {
    //             sliderDragBar = this._sliderDragBar = createElement(DIV_ELEMENT);
    //         }
    //         sliderDragBar.title = sR().toolTipSlider;
    //         $$(sliderDragBar).addClass(SLIDER_DRAG_BAR_CLASS);
    //         sliderDragBar.style.top = Math.floor((actualHeight - ZOOM_SLIDER_BAR_HEIGHT) / 2 + 1) + PIXEL;
    //         sliderDragBar.style.right = self._sliderBarDefaultOffset + PIXEL;
    //         sliderDragBar.addEventListener(MOUSE_DOWN_EVENT, function () {
    //             self._canDrag = true;
    //         });
    //         document.addEventListener(MOUSE_UP_EVENT, function () {
    //             self._canDrag = false;
    //         });
    //         document.addEventListener(MOUSE_MOVE_EVENT, function (e) {
    //             if (!self._canDrag) {
    //                 return;
    //             }
    //             var clientX = e.pageX, offsetLeft = getDomOffset(sliderBackProgress).left, offsetWidth = sliderBackProgress.offsetWidth, sliderBarWidth = self._sliderBarWidth, offset = offsetLeft + offsetWidth + sliderBarWidth - clientX;
    //             self._handleSliderValueChange(offset);
    //         });
    //         var sliderBack = this._sliderBack;
    //         if (!sliderBack) {
    //             sliderBack = this._sliderBack = createElement(DIV_ELEMENT);
    //         }
    //         sliderBack.title = sR().toolTipSlider;
    //         $$(sliderBack).addClass(SLIDER_BACK_CLASS);
    //         sliderBack.style.height = height;
    //         sliderBack.style.lineHeight = height;
    //         sliderBack.addEventListener(CLICK_EVENT, function (e) {
    //             var target = e.target, rightOffset;
    //             if (target === sliderDragBar) {
    //                 return;
    //             }
    //             if (target === sliderMiddleLine) {
    //                 rightOffset = self._sliderBarDefaultOffset;
    //             }
    //             else {
    //                 var offsetX = e.offsetX, backWidth = sliderBack.offsetWidth;
    //                 rightOffset = backWidth - offsetX;
    //             }
    //             self._handleSliderValueChange(rightOffset);
    //         });
    //         subtractBtnContainer.appendChild(subtractBtn);
    //         container.appendChild(subtractBtnContainer);
    //         sliderBack.appendChild(sliderMiddleLine);
    //         sliderBack.appendChild(sliderBackProgress);
    //         sliderBack.appendChild(sliderDragBar);
    //         container.appendChild(sliderBack);
    //         addBtnContainer.appendChild(addBtn);
    //         container.appendChild(addBtnContainer);
    //     };
    //     ZoomSliderItem.prototype._focus = function () {
    //         this._context && this._context.focus();
    //     };
    //     ZoomSliderItem.prototype.onBind = function (context) {
    //         _onBind(this, context);
    //     };
    //     ZoomSliderItem.prototype.onUpdate = function () {
    //         _onUpdate(this);
    //     };
    //     ZoomSliderItem.prototype._handleZoomBtnClick = function (isAdd) {
    //         var self = this, value = this.value;
    //         if (value % 10 === 0) {
    //             value = isAdd ? value + this.step : value - this.step;
    //         }
    //         else {
    //             var multiple = value / 10;
    //             value = isAdd ? Math.ceil(multiple) : Math.floor(multiple);
    //             value = value * 10;
    //         }
    //         value = value > this.max ? this.max : value;
    //         value = value < this.min ? this.min : value;
    //         self._handleValueChange(value);
    //     };
    //     ZoomSliderItem.prototype._handleSliderValueChange = function (offset) {
    //         var self = this, newZoomFactor, oldZoomFactor;
    //         if (offset < 0) {

    //             offset = 0;
    //         }
    //         if (offset > self._sliderProgressWidth) {

    //             offset = self._sliderProgressWidth + self._sliderBarWidth;
    //         }
    //         oldZoomFactor = self.value / 100;

    //         var defaultOffset = self._sliderBarDefaultOffset, sliderProgressWidth = self._sliderProgressWidth, percentSliderBarWidth = self._sliderBarWidth * 3 / 2, min = self.min, middle = self.middle, max = self.max, value;
    //         if (offset <= defaultOffset) {
    //             value = (defaultOffset - offset) / defaultOffset * (max - middle) + middle;
    //         }
    //         else {
    //             value = (sliderProgressWidth - offset + percentSliderBarWidth) / defaultOffset * (middle - min) + min;
    //         }
    //         if (value <= min + 5) {
    //             value = min;
    //         }
    //         else if (value >= max - 5) {
    //             value = max;
    //         }
    //         newZoomFactor = value / 100;
    //         var sheet = Core_1._getActiveSheet(this._context);
    //         _statusbarZoomExcute(sheet, newZoomFactor, oldZoomFactor);
    //         self._focus();
    //     };
    //     ZoomSliderItem.prototype._handleValueChange = function (value) {
    //         if (value) {
    //             value = getValueFromZoomFactor(value);
    //             var sheet = Core_1._getActiveSheet(this._context);
    //             _statusbarZoomExcute(sheet, value / 100, this.value / 100);
    //             this._focus();
    //         }
    //     };
    //     ZoomSliderItem.prototype._handleSliderBarValueToOffset = function (value) {

    //         var self = this, min = self.min, middle = self.middle, max = self.max, sliderBarWidth = self._sliderBarWidth, defaultOffset = self._sliderBarDefaultOffset, sliderProgressWidth = self._sliderProgressWidth, offset;
    //         if (value <= middle) {
    //             offset = (value - min) / (middle - min) * defaultOffset - sliderBarWidth / 2;
    //         }
    //         else {
    //             offset = (value - middle) / (max - middle) * defaultOffset + defaultOffset - sliderBarWidth / 2;
    //         }
    //         offset = sliderProgressWidth - offset;
    //         this._updateSliderBarRight(offset);
    //     };
    //     ZoomSliderItem.prototype._updateSliderBarRight = function (offset) {
    //         var self = this, halfSliderBarWidth = self._sliderBarWidth / 2, sliderBarWidth = self._sliderBarWidth;
    //         if (offset <= sliderBarWidth) {

    //             offset += sliderBarWidth;
    //         }
    //         else if (offset < self._sliderProgressWidth) {

    //             offset += halfSliderBarWidth;
    //         }
    //         var sliderDragBar = self._sliderDragBar;
    //         sliderDragBar.style.right = offset + PIXEL;
    //     };
    //     ZoomSliderItem.prototype._onValueChanged = function (value) {
    //         if (value) {
    //             value = getValueFromZoomFactor(value);
    //         }
    //         if (value !== this.value) {
    //             this.value = parseInt(value + '', 10);
    //             this._handleSliderBarValueToOffset(this.value);
    //         }
    //     };
    //     ZoomSliderItem.prototype._isSliderBackArea = function (target) {
    //         return target === this._sliderBackProgress || target === this._sliderMiddleLine
    //             || target === this._sliderDragBar || target === this._sliderBack;
    //     };
    //     ZoomSliderItem.prototype._onMouseMove = function (e) {
    //         var target = e.target;
    //         if (this._isSliderBackArea(target)) {
    //             this._changeHover(ZOOM_SLIDER_OPACITY);
    //         }
    //     };
    //     ZoomSliderItem.prototype._onMouseOut = function (e) {
    //         var target = e.target;
    //         if (this._isSliderBackArea(target)) {
    //             this._changeHover(1);
    //         }
    //     };
    //     ZoomSliderItem.prototype._changeHover = function (opacity) {
    //         this._sliderDragBar.style.opacity = opacity + '';
    //     };
    //     ZoomSliderItem.prototype._onCultureChanged = function (res) {
    //         if (res) {
    //             var tipArr = res.tipText;
    //             this.menuContent = res.menuContent;
    //             this.tipText = tipArr;
    //             this._subtractBtn.title = tipArr[0];
    //             this._addBtn.title = tipArr[1];
    //             this._sliderDragBar.title = tipArr[2];
    //             this._sliderBack.title = tipArr[2];
    //         }
    //     };
    //     ZoomSliderItem.prototype.onUnbind = function () {
    //         _onUnbind(this);
    //     };
    //     ZoomSliderItem.prototype.onDispose = function () {
    //         this._statusBar = keyword_null;
    //         statusItem_1.StatusItem.prototype.onDispose.call(this);
    //     };
    //     return ZoomSliderItem;
    // }(statusItem_1.StatusItem));
    var ZoomPanelItem = (function (_super) {
        __extends(ZoomPanelItem, _super);
        function ZoomPanelItem(name, options) {
            var _this = _super.call(this, name, options) || this;
            _this._eventNs = STATUSBAR_NS + _this.name;
            return _this;
        }
        ZoomPanelItem.prototype.onCreateItemView = function (container) {
            container.style.display = this.visible ? ITEM_STYLE_DISPLAY_INLINE : ITEM_STYLE_DISPLAY_NONE;
            var zoomValueControl = this._zoomValueControl;
            if (!zoomValueControl) {
                zoomValueControl = this._zoomValueControl = createElement(SPAN_ELEMENT);
            }
            $$(zoomValueControl).addClass(ZOOM_PANEL_CLASS);
            zoomValueControl.innerText = ZOOM_DEFAULT_VALUE + ZOOM_PERCENT_SIGN;
            container.appendChild(zoomValueControl);
        };
        ZoomPanelItem.prototype.onBind = function (context) {
            _onBind(this, context);
        };
        ZoomPanelItem.prototype.onUpdate = function () {
            _onUpdate(this);
        };
        ZoomPanelItem.prototype._onValueChanged = function (zoomFactor) {
            var value;
            if (zoomFactor) {
                value = getValueFromZoomFactor(zoomFactor);
            }
            if (value !== parseInt(this.value + '', 10)) {
                value = parseInt(value, 10);
                this.value = value + ZOOM_PERCENT_SIGN;
                this._updateZoomValueControl(value);
            }
        };
        ZoomPanelItem.prototype._updateZoomValueControl = function (value) {
            var zoomValueControl = this._zoomValueControl;
            if (zoomValueControl) {
                zoomValueControl.innerText = value + ZOOM_PERCENT_SIGN;
            }
        };
        ZoomPanelItem.prototype.onUnbind = function () {
            _onUnbind(this);
        };
        return ZoomPanelItem;
    }(statusItem_1.StatusItem));
    function _raiseZoomChanged(sheet, newZoomFactor, oldZoomFactor) {
        sheet._trigger(Core_1.Events.UserZooming, {
            sheet: sheet,
            sheetName: sheet.name(),
            oldZoomFactor: oldZoomFactor,
            newZoomFactor: newZoomFactor
        });
        sheet._trigger(Core_1.Events.ViewZoomed, {
            sheet: sheet,
            sheetName: sheet.name(),
            oldZoomFactor: oldZoomFactor,
            newZoomFactor: newZoomFactor
        });
    }
    function _onBind(self, context) {
        self._context = context;
        context.bind(Core_1.Events.ActiveSheetChanged + self._eventNs, function () {
            self.onUpdate();
        });
    }
    function _onUpdate(self) {
        statusItem_1.StatusItem.prototype.onUpdate.call(self);
        var sheet = Core_1._getActiveSheet(self._context);
        if (sheet) {
            var zoomFactor = sheet.zoom();
            self._onValueChanged(zoomFactor);
        }
    }
    function _onUnbind(self) {
        if (self._context) {
            self._context.unbind(Core_1.Events.ActiveSheetChanged + self._eventNs);
            self._context = keyword_null;
        }
    }


    var StatusBar = (function () {
        function StatusBar(hostContainer, options) {
            if (!hostContainer) {
                return;
            }
            var self = this;
            var baseStatusBar = self._baseStatusBar = new baseStatusBar_1.BaseStatusBar(hostContainer);
            self._initBuildinItems(baseStatusBar, options);
            self._host = baseStatusBar._host;
            self.options = options || {};
            this._menuHost = baseStatusBar._menuHost;
            self._contextMenu = {};
            self._initStatusBarStyle(hostContainer);
            self.maxCalcCells = 50000;
            $$(hostContainer).data('statusbar', self);
        }
        Object.defineProperty(StatusBar.prototype, 'maxCalcCells', {
            get: function () {
                return this._maxCalcCells;
            },
            set: function (value) {
                this._maxCalcCells = value;
                var items = this._baseStatusBar._getItemList();
                items.forEach(function (item) {
                    if (item instanceof FormulaItem) {
                        item._maxCalcCells = value;
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        StatusBar.prototype._initBuildinItems = function (baseStatusBar, options) {
            var formulaMenuContentIdList = ['formulaAverage', 'formulaCount', 'formulaNumericalCount', 'formulaMin', 'formulaMax', 'formulaSum'];
            var formulaTipTextIdList = ['toolTipFormulaAverage', 'toolTipFormulaCount', 'toolTipFormulaNumericalCount', 'toolTipFormulaMin', 'toolTipFormulaMax', 'toolTipFormulaSum'];
            var formulaPrefixList = [sR().formulaAverage, sR().formulaCount, sR().formulaNumericalCount, sR().formulaMin, sR().formulaMax, sR().formulaSum];
            var formulaTipTextList = [sR().toolTipFormulaAverage, sR().toolTipFormulaCount, sR().toolTipFormulaNumericalCount, sR().toolTipFormulaMin, sR().toolTipFormulaMax, sR().toolTipFormulaSum];
            var formulaVisible = [true, true, false, false, false, true];
            var formulaOptions = [];
            formulaPrefixList.forEach(function (prefix, index) {
                var option = {};
                option.menuContent = prefix;
                option.prefix = prefix;
                option.align = ALIGN_RIGHT;
                option.tipText = formulaTipTextList[index];
                option.visible = formulaVisible[index];
                option._menuContentId = formulaMenuContentIdList[index];
                option.className = option._menuContentId;
                option._tipTextId = formulaTipTextIdList[index];
                formulaOptions.push(option);
            });
            var editModeOption = {
                menuContent: sR().cellMode,
                value: sR().cellModeReady,
                tipText: stringFormat(sR().toolTipCellMode, [sR().cellModeReady]),
                _menuContentId: 'cellMode',
                _tipTextId: 'toolTipCellMode'
            };
            var zoomPanelOption = {
                value: ZOOM_SLIDER_DEFAULT_VALUE + ZOOM_PERCENT_SIGN,
                tipText: sR().toolTipZoomPanel,
                menuContent: sR().zoom,
                align: ALIGN_RIGHT,
                _menuContentId: 'zoom',
                _tipTextId: 'toolTipZoomPanel'
            };
            var itemInstanceList = [
                new EditModeItem(EDIT_MODE_ITEM_ID, editModeOption),
                new FormulaItem(formulaIdList[0], formulaOptions[0]),
                new FormulaItem(formulaIdList[1], formulaOptions[1]),
                new FormulaItem(formulaIdList[2], formulaOptions[2]),
                new FormulaItem(formulaIdList[3], formulaOptions[3]),
                new FormulaItem(formulaIdList[4], formulaOptions[4]),
                new FormulaItem(formulaIdList[5], formulaOptions[5]),
                // new ZoomSliderItem(this, ZOOM_SLIDER_ITEM_ID, zoomSliderOption),
                new ZoomPanelItem(ZOOM_PANEL_ITEM_ID, zoomPanelOption)
            ];
            if (options && options.items instanceof Array) {
                itemInstanceList = itemInstanceList.concat(options.items);
            }
            var itemInstance, itemInstanceIndex;
            for (itemInstanceIndex = 0; itemInstanceIndex < itemInstanceList.length; itemInstanceIndex++) {
                itemInstance = itemInstanceList[itemInstanceIndex];
                baseStatusBar._addItem(itemInstance);
            }
            baseStatusBar._onLayout();
        };
        StatusBar.prototype._initStatusBarStyle = function (hostContainer) {
            var host = this._host, menuHost = this._menuHost, height = hostContainer.clientHeight;
            if (host) {
                $$(host).addClass(STATUSBAR_CLASS);
                $$(menuHost).addClass(STATUSBAR_MENU_HOST);
                var newHeight = height;
                if (height < STARTUS_BAR_MIN_HEIGHT) {
                    hostContainer.style.minHeight = STARTUS_BAR_MIN_HEIGHT + PIXEL;
                    newHeight = STARTUS_BAR_MIN_HEIGHT;
                }
                menuHost.style.top = '-' + newHeight + PIXEL;
            }
        };
        StatusBar.prototype._attachContextMenuEvent = function () {
            var host = this._host;
            if (!host) {
                return;
            }
            this._contextMenuHandler = this._handleContextMenuEvent.bind(this);
            host.addEventListener(CONTEXT_MENU_EVENT, this._contextMenuHandler);
        };
        StatusBar.prototype._handleContextMenuEvent = function (e) {
            cancelDefault(e);
            var self = this, contextMenu = self._contextMenu, context = self._context;
            if (!isSheetsContextMenuExist || !context) {
                return;
            }
            if (!self._contextMenuDialog) {
                self._contextMenuDialog = new ContextMenuDialog(self._menuHost, $$(self._context._userEventsElem));
            }
            var menuView = contextMenu.menuView, host = self._host, offsetLeft = getDomOffset(host).left;
            menuView.hostInfo = {
                top: host.getBoundingClientRect().top,
                width: host.clientWidth,
                height: host.clientHeight
            };
            contextMenu.menuData = self._baseStatusBar._getMenuDataList();
            self._contextMenuDialog._open(menuView, contextMenu.menuData, e.clientX - offsetLeft, e.offsetY, context);
        };
        StatusBar.prototype._initContextMenuData = function (context) {
            if (!isSheetsContextMenuExist) {
                return;
            }
            var menuView = new StatusBarMenuView();
            this._contextMenu.menuView = menuView;
            this._registerCommand(context);
        };
        StatusBar.prototype._registerCommand = function (context) {
            var self = this, commandManager = context.commandManager();
            var checkChange = {
                canUndo: false,
                execute: function (ctx, options) {
                    var commandOptions = options.commandOptions;
                    self._baseStatusBar._checkChanged(commandOptions);
                }
            };
            commandManager.register(COMMAND_PREFIX + STATUSBAR, checkChange);
        };


        StatusBar.prototype.bind = function (context) {
            this.unbind();
            if (context) {
                this._context = context;
                context._statusBar = this;
                this._baseStatusBar._bindContext(context);
                if (this.options.contextMenuVisible) {
                    this._initContextMenuData(context);
                    this._attachContextMenuEvent();
                }
            }
        };


        StatusBar.prototype.unbind = function () {
            if (this._baseStatusBar) {
                this._baseStatusBar._unbindContext();
            }
            if (this._context) {
                this._context._statusBar = keyword_null;
                this._context = keyword_null;
            }
            if (this._host) {
                this._host.removeEventListener(CONTEXT_MENU_EVENT, this._contextMenuHandler);
                this._contextMenuHandler = keyword_null;
            }
            if (this._contextMenuDialog) {
                this._contextMenuDialog.close();
                this._contextMenuDialog = keyword_null;
            }
        };


        StatusBar.prototype.add = function (item, position) {
            return this._baseStatusBar._insertItem(item, position);
        };


        StatusBar.prototype.remove = function (itemName) {
            return this._baseStatusBar._removeItem(itemName);
        };


        StatusBar.prototype.get = function (itemName) {
            return this._baseStatusBar._getItem(itemName);
        };


        StatusBar.prototype.all = function () {
            return this._baseStatusBar._getItemList();
        };


        StatusBar.prototype.update = function () {
            this._baseStatusBar._onUpdate();
        };


        StatusBar.prototype.dispose = function () {
            this.unbind();
            this._contextMenu = keyword_null;
            this._contextMenuDialog = keyword_null;
            if (this._baseStatusBar) {
                this._baseStatusBar._dispose();
                this._baseStatusBar = keyword_null;
            }
            if (this._host) {
                this._host = keyword_null;
            }
        };
        return StatusBar;
    }());
    exports.StatusBar = StatusBar;
    if (isSheetsContextMenuExist) {
        inherit(StatusBarMenuView, MenuView);
    }
    function StatusBarMenuView() {
        if (isSheetsContextMenuExist) {
            MenuView.call(this);
        }
    }
    StatusBarMenuView.prototype.getCommandOptions = function (menuItemData) {
        return menuItemData;
    };
    // var StatusbarZoomUndoAction =  (function (_super) {
    //     __extends(StatusbarZoomUndoAction, _super);
    //     function StatusbarZoomUndoAction(sheet, zoomOptions) {
    //         var _this = _super.call(this) || this;
    //         _this._sheet = sheet;
    //         _this._zoomOptions = zoomOptions;
    //         return _this;
    //     }
    //     StatusbarZoomUndoAction.prototype.canExecute = function () {
    //         return true;
    //     };
    //     StatusbarZoomUndoAction.prototype.execute = function () {
    //         var self = this, sheet = self._sheet, zoomOptions = self._zoomOptions, newZoomFactor = zoomOptions.newZoomFactor;
    //         if (this.canExecute()) {
    //             sheet._modelManager.startTransaction();
    //             try {

    //                 sheet.zoom(newZoomFactor);
    //             }
    //             finally {
    //                 var changesKey = Core_1.Commands._getChangesKey(sheet.name());
    //                 zoomOptions[changesKey] = sheet._modelManager.endTransaction();
    //             }
    //             return true;
    //         }
    //         return false;
    //     };
    //     StatusbarZoomUndoAction.prototype.canUndo = function () {
    //         return true;
    //     };
    //     StatusbarZoomUndoAction.prototype.undo = function () {
    //         var self = this, sheet = self._sheet, zoomOptions = self._zoomOptions, changesKey = Core_1.Commands._getChangesKey(sheet.name()), newZoomFactor = zoomOptions[changesKey][0].value, oldZoomFactor = sheet.zoom();
    //         if (newZoomFactor !== oldZoomFactor) {
    //             sheet.zoom(newZoomFactor);
    //             _raiseZoomChanged(sheet, newZoomFactor, oldZoomFactor);
    //         }
    //         return true;
    //     };
    //     return StatusbarZoomUndoAction;
    // }(ActionBase));
    // Core_1.Commands[STATUSBAR_ZOOM_CMD] = {
    //     canUndo: true,
    //     execute: function (context, options, isUndo) {
    //         return Core_1.Commands._executeCommand(context, StatusbarZoomUndoAction, options, isUndo);
    //     }
    // };
    // Core_1.Worksheet._registerFeature(STATUSBAR_ZOOM_CMD, {
    //     setHost: function (host) {
    //         if (!host) {
    //             return;
    //         }
    //         var commands = this._commandManager();
    //         if (!commands[STATUSBAR_ZOOM_CMD]) {
    //             commands.register(STATUSBAR_ZOOM_CMD, Core_1.Commands[STATUSBAR_ZOOM_CMD]);
    //         }
    //     },
    //     onLayoutChanged: function (e) {
    //         var changeType = e.changeType, spread, statusBar;
    //         if (changeType === CHANGE_TYPE_INVALIDATE) {


    //             spread = this.parent;
    //             if (spread && !spread.isPaintSuspended()) {
    //                 statusBar = spread._statusBar;
    //                 statusBar && statusBar.update();
    //             }
    //         }
    //     }
    // });
    Core_1.Workbook._registerFeature(STATUSBAR, {
        onCultureChanged: function () {
            var statusBar = this._statusBar, resource = sR(), tipTextArr = [], tipTextId, tipText;
            if (statusBar) {
                statusBar._baseStatusBar && statusBar._baseStatusBar._getItemList().forEach(function (statusItem) {
                    tipTextId = statusItem._tipTextId;
                    tipText = resource[tipTextId];
                    if (tipTextId instanceof Array) {
                        tipTextId.forEach(function (id) {
                            tipTextArr.push(resource[id]);
                        });
                        tipText = tipTextArr;
                    }
                    statusItem._onCultureChanged({
                        menuContent: resource[statusItem._menuContentId],
                        tipText: tipText
                    });
                });
            }
        }
    });
    /***/ }),

    /***/ './dist/plugins/statusBar/statusBar.ns.js':
    /*!************************************************!*\
    !*** ./dist/plugins/statusBar/statusBar.ns.js ***!
    \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    'use strict';

    Object.defineProperty(exports, '__esModule', { value: true });
    var en = __webpack_require__(/*! ./statusBar.res.en */ './dist/plugins/statusBar/statusBar.res.en.js');
    exports.SR = {
        en: en
    };
    /***/ }),

    /***/ './dist/plugins/statusBar/statusBar.res.en.js':
    /*!****************************************************!*\
    !*** ./dist/plugins/statusBar/statusBar.res.en.js ***!
    \****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    'use strict';

    Object.defineProperty(exports, '__esModule', { value: true });
    exports.cellMode = 'Cell Mode';
    exports.cellModeReady = 'Ready';
    exports.cellModeEnter = 'Enter';
    exports.cellModeEdit = 'Edit';
    exports.formulaAverage = 'Average';
    exports.formulaCount = 'Count';
    exports.formulaNumericalCount = 'Numerical Count';
    exports.formulaMin = 'Min';
    exports.formulaMax = 'Max';
    exports.formulaSum = 'Sum';
    exports.zoomSlider = 'Zoom Slider';
    exports.zoom = 'Zoom';
    exports.toolTipCellMode = 'In {0} mode';
    exports.toolTipFormulaAverage = 'Average of selected cells';
    exports.toolTipFormulaCount = 'Number of selected cells that contain data';
    exports.toolTipFormulaNumericalCount = 'Number of selected cells that contain numerical data';
    exports.toolTipFormulaMin = 'Minimum value in selection';
    exports.toolTipFormulaMax = 'Maximum value in selection';
    exports.toolTipFormulaSum = 'Sum of selected cells';
    exports.toolTipZoomOut = 'Zoom Out';
    exports.toolTipZoomIn = 'Zoom In';
    exports.toolTipSlider = 'Zoom';
    exports.toolTipZoomPanel = 'Zoom level';
    /***/ }),

    /***/ './dist/plugins/statusBar/statusItem.js':
    /*!**********************************************!*\
    !*** ./dist/plugins/statusBar/statusItem.js ***!
    \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    'use strict';

    Object.defineProperty(exports, '__esModule', { value: true });


    var Core_1 = __webpack_require__(/*! Core */ 'Core');
    var Common_1 = __webpack_require__(/*! Common */ 'Common');
    var createElement = Core_1._util._createElement, $$ = Core_1.GC$, Types = Common_1.Common._Types, isNullOrUndefined = Types._isNullOrUndefined;
    var STATUS_ITEM_CONTAINER_CLASS = 'gc-statusbar-statusitem-container';
    var DIV_ELEMENT = 'div', SPAN_ELEMENT = 'span', ITEM_STYLE_DISPLAY_NONE = 'none', ITEM_STYLE_DISPLAY_INLINE_BLOCK = 'inline-block';
    var EVENT_MOUSE_MOVE = 'mousemove', EVENT_MOUSE_OUT = 'mouseout';
    var keyword_null = null, ITEM_ALIGN_LEFT = 'left', AUTO_WIDTH = 'auto';
    var COMMAND_PREFIX = 'gc.spread.', STATUSBAR = 'statusBar';
    var DEFAULT_MARGIN = '10px', PIXEL = 'px', STARTUS_BAR_MIN_HEIGHT = 15;
    function _getMenuDataObj(name, menuContent, visible, status) {
        return {
            name: name,
            menuContent: menuContent,
            visible: visible,
            status: status,
            command: COMMAND_PREFIX + STATUSBAR
        };
    }


    var StatusItem = (function () {
        function StatusItem(name, options) {
            this._marginLeft = 0;
            this._marginRight = 0;
            this._width = AUTO_WIDTH;
            this._itemContainer = keyword_null;
            this._item = keyword_null;
            this.name = name;
            this._options = options || {};
            if (options) {
                var align = options.align, menuContent = options.menuContent, tipText = options.tipText, visible = options.visible, showStatusInContexMenu = options.showStatusInContexMenu, value = options.value, _menuContentId = options._menuContentId, _tipTextId = options._tipTextId;
                this.align = isNullOrUndefined(align) ? ITEM_ALIGN_LEFT : align;
                this.menuContent = isNullOrUndefined(menuContent) ? keyword_null : menuContent;
                this.tipText = isNullOrUndefined(tipText) ? '' : tipText;
                this.visible = isNullOrUndefined(visible) ? true : visible;
                this.showStatusInContexMenu = isNullOrUndefined(showStatusInContexMenu) ? true : showStatusInContexMenu;
                this.value = isNullOrUndefined(value) ? keyword_null : value;
                this._menuContentId = isNullOrUndefined(_menuContentId) ? keyword_null : _menuContentId;
                this._tipTextId = isNullOrUndefined(_tipTextId) ? keyword_null : _tipTextId;
            }
        }
        StatusItem.prototype._createStatusItem = function (hostContainer) {
            var isLeftAlign = this.align === ITEM_ALIGN_LEFT;
            this._marginLeft = isLeftAlign ? DEFAULT_MARGIN : 0;
            this._marginRight = isLeftAlign ? 0 : DEFAULT_MARGIN;
            var hostHeight = hostContainer.clientHeight;
            this._height = hostHeight > STARTUS_BAR_MIN_HEIGHT ? hostHeight : STARTUS_BAR_MIN_HEIGHT;
            var itemContainer = this._createItemContainer();
            this._itemContainer = itemContainer;
            this.onCreateItemView(itemContainer);
            this._attachEvent(itemContainer);
        };
        StatusItem.prototype._createItemContainer = function () {
            var itemContainer = this._itemContainer, height = this._height && (this._height + PIXEL);
            if (!itemContainer) {
                itemContainer = this._itemContainer = createElement(DIV_ELEMENT);
                itemContainer.title = this.tipText;
                $$(itemContainer).addClass(STATUS_ITEM_CONTAINER_CLASS);
                if (this._options.className) {
                    $$(itemContainer).addClass(this._options.className);
                }
                $$(itemContainer).css({
                    height: height,
                    lineHeight: height,
                    float: this.align,
                    marginLeft: this._marginLeft + '',
                    marginRight: this._marginRight + ''
                });
                if (this.visible === false) {
                    itemContainer.style.display = ITEM_STYLE_DISPLAY_NONE;
                }
            }
            return itemContainer;
        };


        StatusItem.prototype.onCreateItemView = function (container) {
            var item = this._item;
            if (!item) {
                item = this._item = createElement(SPAN_ELEMENT);
                item.innerText = this.value + '';
            }
            container.appendChild(item);
        };


        StatusItem.prototype.onBind = function (context) { };
        StatusItem.prototype._attachEvent = function (itemContainer) {
            itemContainer.addEventListener(EVENT_MOUSE_MOVE, this._onMouseMove.bind(this));
            itemContainer.addEventListener(EVENT_MOUSE_OUT, this._onMouseOut.bind(this));
        };
        StatusItem.prototype._getStatusItem = function () {
            return this._itemContainer;
        };
        StatusItem.prototype._onMouseMove = function (e) { };
        StatusItem.prototype._onMouseOut = function (e) { };
        StatusItem.prototype._getMenuData = function () {
            var menuData = this._createMenuData();
            menuData.type = STATUSBAR;
            menuData.workArea = STATUSBAR;
            return menuData;
        };
        StatusItem.prototype._checkChanged = function (commandOptions) {
            this.visible = !commandOptions.visible;
            this.onUpdate();
        };
        StatusItem.prototype._createMenuData = function () {
            var status = this.showStatusInContexMenu ? this._getMenuStatus() : null;
            return _getMenuDataObj(this.name, this.menuContent, this.visible, status);
        };
        StatusItem.prototype._getMenuStatus = function () {
            return this.value;
        };
        StatusItem.prototype._updateVisible = function () {
            if (this._itemContainer) {
                this._itemContainer.style.display = this.visible ? ITEM_STYLE_DISPLAY_INLINE_BLOCK : ITEM_STYLE_DISPLAY_NONE;
            }
        };
        StatusItem.prototype._onCultureChanged = function (res) {
            if (res) {
                this.menuContent = res.menuContent;
                this.tipText = res.tipText;
                this._itemContainer.title = this.tipText;
            }
        };


        StatusItem.prototype.onUpdate = function () {
            this._updateVisible();
        };


        StatusItem.prototype.onUnbind = function () { };


        StatusItem.prototype.onDispose = function () {
            this.onUnbind();
            this._item = keyword_null;
            if (this._itemContainer) {
                this._itemContainer.removeEventListener(EVENT_MOUSE_MOVE, this._onMouseMove);
                this._itemContainer.removeEventListener(EVENT_MOUSE_OUT, this._onMouseOut);
                $$(this._itemContainer).empty();
                this._itemContainer = keyword_null;
                this._options = keyword_null;
            }
        };
        return StatusItem;
    }());
    exports.StatusItem = StatusItem;
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

    /***/ 'ContextMenu':
    /*!***********************************************!*\
    !*** external "GC.Spread.Sheets.ContextMenu" ***!
    \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {
    module.exports = GC.Spread.Sheets.ContextMenu;
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