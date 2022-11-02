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
    var GC = typeof GC === 'object' ? GC : {}; GC['Spread'] = GC['Spread'] || {}; GC['Spread']['Sheets'] = GC['Spread']['Sheets'] || {}; GC['Spread']['Sheets']['CellTypes'] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = './dist/plugins/celltype/celltypes.entry.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './dist/plugins/celltype/buttoncelltype.js':
/*!*************************************************!*\
  !*** ./dist/plugins/celltype/buttoncelltype.js ***!
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
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Events_SelectionChanged = Core_1.Events.SelectionChanged;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var cancelDefault = Core_1._util._cancelDefault;
var CellTypeContext = Core_1.CellTypes.Context, TextCellType = Core_1.CellTypes.Text, BaseCellType = Core_1.CellTypes.Base;
var $ = Core_1.GC$, $_each = $.each;
var keyword_null = null, keyword_undefined = void 0;
var IS_FIRST_MOUSE_UP = '_isFirstMouseUp', MOUSE_UP_TOKEN = '_mouseupToken';
function deleteTokenAndClearTimeout(sheet, row, col, sheetArea) {
    var modelManager = sheet._modelManager;
    if (modelManager) {
        modelManager.do('setValueForKey', row, col, IS_FIRST_MOUSE_UP, keyword_undefined, sheetArea);
        var mouseupToken = modelManager.getValueForKey(row, col, MOUSE_UP_TOKEN, sheetArea);
        if (mouseupToken) {
            clearTimeout(mouseupToken);
            modelManager.do('setValueForKey', row, col, MOUSE_UP_TOKEN, keyword_undefined, sheetArea);
        }
    }
}

var BUTTON_BORDER_COLOR = '#707070', BUTTON_PRESSED_COLOR = '#34B4E3', BUTTON_CELLTYPE_EVENT_NAMESPACE = '.buttonCellType';
var buttonCellTypePropertyDict = {
    marginTop: 2,
    marginRight: 2,
    marginBottom: 2,
    marginLeft: 2,
    text: '',
    buttonBackColor: keyword_null,
    buttonState: 0
};


var ButtonCellType = (function (_super) {
    __extends(ButtonCellType, _super);
    function ButtonCellType() {
        var _this = _super.call(this) || this;
        _this.typeName = 6 + '';
        var self = _this;
        $_each(buttonCellTypePropertyDict, function (p, v) {
            self['_' + p] = v;
        });
        return _this;
    }

    ButtonCellType.prototype.paintValue = function (ctx, value, x, y, w, h, style, options) {
        if (!ctx) {
            return;
        }
        var self = this, marginLeft = self._marginLeft, marginTop = self._marginTop;
        var startX = x + marginLeft, startY = y + marginTop, width = w - marginLeft - self._marginRight, height = h - marginTop - self._marginBottom, isIntersect = startX + width > x && startX < x + w && startY + height > y && startY < y + h;
        if (width - 2 > 0 && height - 2 > 0 && isIntersect) {
            ctx.save();
            if (startX < x || startX + width > x + w || startY < y || startY + height > y + h) {
                ctx.rect(x, y, w, h);
                ctx.clip();
            }
            ctx.beginPath();
            var strokeStyle = BUTTON_BORDER_COLOR;
            if (strokeStyle && ctx.strokeStyle !== strokeStyle) {
                ctx.strokeStyle = strokeStyle;
            }
            ctx.strokeRect(startX + 0.5, startY + 0.5, width - 1, height - 1);
            var fillStyle = void 0, buttonState = self._buttonState, text = self._text;
            if (buttonState === 2 ) {
                fillStyle = BUTTON_PRESSED_COLOR;
            }
            else {
                fillStyle = self._buttonBackColor;
                if (!fillStyle) {
                    fillStyle = { degree: 90, stops: [{ position: 0, color: '#F6FAFB' }, { position: 0.125, color: '#F6FAFB' }, { position: 1, color: '#D2DBEB' }] };
                }
            }
            if (ctx.fillStyle !== fillStyle) {
                ctx.fillStyle = fillStyle;
            }
            Core_1._StyleHelper.setFillStyle(ctx, fillStyle, x, y, w, h, function () { ctx.fillRect(startX + 1, startY + 1, width - 2, height - 2); });
            ctx.restore();
            if (text) {
                TextCellType.prototype.paintValue.call(self, ctx, text, startX, startY, width, height, style, options);
            }
        }
    };

    ButtonCellType.prototype.getText = function (value, context) {
        return value;
    };
    ButtonCellType.prototype._triggerButtonClicked = function (sheet, row, col, sheetArea) {
        var parent = sheet.parent;
        if (parent) {
            parent._triggerButtonClicked(sheet, row, col, sheetArea);
        }
    };
    ButtonCellType.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
        var self = this;
        if (context) {
            var sheetArea = context.sheetArea;
            if ((isNullOrUndefined(sheetArea) || sheetArea === 3 ) && cellRect) {
                var leftX = cellRect.x + self._marginLeft, rightX = cellRect.x + cellRect.width - self._marginRight, topY = cellRect.y + self._marginTop, bottomY = cellRect.y + cellRect.height - self._marginBottom;
                var info = {
                    x: x,
                    y: y,
                    row: context.row,
                    col: context.col,
                    cellRect: cellRect,
                    sheetArea: sheetArea,
                    sheet: context.sheet,
                    cellStyle: cellStyle
                };
                if (leftX <= x && x <= rightX && topY <= y && y <= bottomY) {
                    info.isReservedLocation = true;
                }
                return info;
            }
        }
        return keyword_null;
    };
    ButtonCellType.prototype.processMouseDown = function (hitInfo) {
        var self = this;
        var sheet = hitInfo && hitInfo.sheet;
        if (sheet && hitInfo.isReservedLocation && !self._isMouseDownReservedLocation) {
            self._isMouseDownReservedLocation = true;
            self._buttonState = 2 ;
            sheet.repaint(hitInfo.cellRect);
            return true;
        }
        return false;
    };
    ButtonCellType.prototype.processMouseUp = function (hitInfo) {
        var self = this;
        var sheet = hitInfo && hitInfo.sheet;
        if (self._isMouseDownReservedLocation && sheet && hitInfo.isReservedLocation) {
            self._buttonState = 0 ;
            sheet.repaint(hitInfo.cellRect);
            self._isMouseDownReservedLocation = false;
            var row_1 = hitInfo.row, col_1 = hitInfo.col, sheetArea_1 = hitInfo.sheetArea;
            var isFirstMouseUp = sheet._modelManager.getValueForKey(row_1, col_1, IS_FIRST_MOUSE_UP, sheetArea_1);
            if (!isFirstMouseUp) {
                self._triggerButtonClicked(sheet, row_1, col_1, sheetArea_1);
                sheet._modelManager.do('setValueForKey', row_1, col_1, IS_FIRST_MOUSE_UP, true, sheetArea_1);
                var mouseupToken = setTimeout(function () {
                    deleteTokenAndClearTimeout(sheet, row_1, col_1, sheetArea_1);
                }, 250);
                sheet._modelManager.do('setValueForKey', row_1, col_1, MOUSE_UP_TOKEN, mouseupToken, sheetArea_1);
                return true;
            }
            deleteTokenAndClearTimeout(sheet, row_1, col_1, sheetArea_1);
        }
        return false;
    };
    ButtonCellType.prototype.processMouseLeave = function (hitInfo) {
        var self = this;
        var sheet = hitInfo && hitInfo.sheet;
        if (sheet && self._isMouseDownReservedLocation) {
            self._buttonState = 0 ;
            sheet.repaint(hitInfo.cellRect);
            self._isMouseDownReservedLocation = false;
        }
        return;
    };
    ButtonCellType.prototype.processKeyDown = function (event, context) {
        var sheet = context.sheet;
        var self = this;
        if (sheet && !self._isKeyPressed) {
            var cellRect_1 = sheet.getCellRect(context.row, context.col);
            self._buttonState = 2 ;
            sheet.repaint(cellRect_1);

            sheet._bind(Events_SelectionChanged + BUTTON_CELLTYPE_EVENT_NAMESPACE, function () {
                sheet._unbind(Events_SelectionChanged + BUTTON_CELLTYPE_EVENT_NAMESPACE);
                self._isKeyPressed = false;
                self._buttonState = 0 ;
                sheet.repaint(cellRect_1);
            });
            self._isKeyPressed = true;
            return true;
        }
        return false;
    };
    ButtonCellType.prototype.processKeyUp = function (event, context) {
        var sheet = context.sheet;
        var self = this;
        if (sheet && self._isKeyPressed) {
            var row = context.row;
            var col = context.col;
            var cellRect = sheet.getCellRect(row, col);
            self._buttonState = 0 ;
            sheet.repaint(cellRect);
            sheet._unbind(Events_SelectionChanged + BUTTON_CELLTYPE_EVENT_NAMESPACE);
            self._triggerButtonClicked(sheet, row, col, context.sheetArea);
            self._isKeyPressed = false;
            return true;
        }
        return false;
    };
    ButtonCellType.prototype.isReservedKey = function (e, context) {
        return e.keyCode === 32 && !e.ctrlKey && !e.shiftKey && !e.altKey;
    };
    ButtonCellType.prototype.getAutoFitWidth = function (value, text, cellStyle, zoomFactor, context) {
        var self = this;
        var width = CellTypeContext._getAutoFitWidth(value, self._text, cellStyle, zoomFactor, context);
        return width + self._marginLeft + self._marginRight;
    };
    ButtonCellType.prototype.getAutoFitHeight = function (value, text, cellStyle, zoomFactor, context) {
        var self = this;
        var height = CellTypeContext._getAutoFitHeight(value, self._text, cellStyle, zoomFactor, context);
        return height + self._marginTop + self._marginBottom;
    };
    ButtonCellType.prototype._cancelDefaultKeydown = function (event) {
        if (this.isReservedKey(event)) {
            cancelDefault(event);
        }
    };
    ButtonCellType.prototype.isImeAware = function (context) {
        return false;
    };
    ButtonCellType.prototype.toJSON = function () {
        var self = this;
        var dataDic = { typeName: self.typeName }, currentValue;
        $_each(buttonCellTypePropertyDict, function (p, v) {
            if (p !== 'buttonState') {
                currentValue = self['_' + p];
                if (currentValue !== v) {
                    dataDic[p] = currentValue;
                }
            }
        });
        return dataDic;
    };
    ButtonCellType.prototype.fromJSON = function (settings) {
        var self = this;
        $_each(buttonCellTypePropertyDict, function (p) {
            var jsonValue = settings[p];
            if (!isNullOrUndefined(jsonValue)) {
                self['_' + p] = jsonValue;
            }
        });
    };
    ButtonCellType.prototype._createCellTypeElement = function (context) {
        return;
    };
    ButtonCellType.prototype._cloneCellType = function () {
    };
    return ButtonCellType;
}(BaseCellType));
exports.Button = ButtonCellType;
$_each(buttonCellTypePropertyDict, function (p) {
    ButtonCellType.prototype[p] = function (value) {
        if (arguments.length === 0) {
            return this['_' + p];
        }
        this['_' + p] = value;
        return this;
    };
});

Core_1.CellTypes._typeDict[6 ] = ButtonCellType;
/***/ }),

/***/ './dist/plugins/celltype/cellbuttons.js':
/*!**********************************************!*\
  !*** ./dist/plugins/celltype/cellbuttons.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';


Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var celltypes_ns_1 = __webpack_require__(/*! ./celltypes.ns */ './dist/plugins/celltype/celltypes.ns.js');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var getDevicePixel = Core_1._DPIHelper._getDevicePixel;
var keyword_undefined = void 0, keyword_null = null, Math_max = Math.max, parseIntFunc = parseInt;
var BUTTON_BORDER_COLOR = '#707070', BUTTON_PRESSED_COLOR = '#34B4E3', BUTTON_DISABLED_COLOR = '#e6e6e6', BUTTON_HOVER_COLOR = 'lightgray', CAPTION_DISABLE_COLOR = '#CACACA';
var IS_FIRST_MOUSE_UP = '_isFirstMouseUp', MOUSE_UP_TOKEN = '_mouseupToken', LEAVE_CELL = '_leaveCell';
var captionImagePadding = 0, TEXT_MARGIN = 2;
var CELL_BUTTON_NORMAL_STATE = 0, CELL_BUTTON_CLICK_STATE = 2, CELL_BUTTON_HOVER_STATE = 3;
var BaseCellType = Core_1.CellTypes.Base;
var CellTypeContext = Core_1.CellTypes.Context;
var commonButtonCanvasClassName = 'gc-cell-button-canvas', buttonCanvasClassNamePrefix = 'gc-editor-', leftButtonCanvasClassName = buttonCanvasClassNamePrefix + 'left-cellbuttons', rightButtonCanvasClassName = buttonCanvasClassNamePrefix + 'right-cellbuttons', leftOfTextButtonCanvasClassName = buttonCanvasClassNamePrefix + 'left-of-text-cellbuttons', rightOfTextButtonCanvasClassName = buttonCanvasClassNamePrefix + 'right-of-text-cellbuttons', leftButtonArea = 'leftButtonArea', rightButtonArea = 'rightButtonArea', leftOfTextButtonArea = 'leftOfTextButtonArea', rightOfTextButtonArea = 'rightOfTextButtonArea';
var cellButtonParam = '_cellButtonParam';
var imageSizeCache = {};
var $ = Core_1.GC$;

var allButtonPositions = [Core_1.ButtonPosition.left, Core_1.ButtonPosition.right, Core_1.ButtonPosition.leftOfText, Core_1.ButtonPosition.rightOfText];
var rm = new Common_1.Common.ResourceManager(celltypes_ns_1.SR, 'CellTypes');
var getSR = rm.getResource.bind(rm);
var AlignDirection;
(function (AlignDirection) {
    AlignDirection[AlignDirection['topLeft'] = 0] = 'topLeft';
    AlignDirection[AlignDirection['topCenter'] = 1] = 'topCenter';
    AlignDirection[AlignDirection['topRight'] = 2] = 'topRight';
    AlignDirection[AlignDirection['MiddleLeft'] = 3] = 'MiddleLeft';
    AlignDirection[AlignDirection['MiddleCenter'] = 4] = 'MiddleCenter';
    AlignDirection[AlignDirection['MiddleRight'] = 5] = 'MiddleRight';
    AlignDirection[AlignDirection['bottomLeft'] = 6] = 'bottomLeft';
    AlignDirection[AlignDirection['bottomCenter'] = 7] = 'bottomCenter';
    AlignDirection[AlignDirection['bottomRight'] = 8] = 'bottomRight';
})(AlignDirection || (AlignDirection = {}));
function buttonAreaToPosition(buttonArea) {
    switch (buttonArea) {
        case leftButtonArea:
            return Core_1.ButtonPosition.left;
        case rightButtonArea:
            return Core_1.ButtonPosition.right;
        case leftOfTextButtonArea:
            return Core_1.ButtonPosition.leftOfText;
        case rightOfTextButtonArea:
            return Core_1.ButtonPosition.rightOfText;
    }
}
function buttonPositionToArea(buttonPosition) {
    switch (buttonPosition) {
        case Core_1.ButtonPosition.left:
            return leftButtonArea;
        case Core_1.ButtonPosition.right:
            return rightButtonArea;
        case Core_1.ButtonPosition.leftOfText:
            return leftOfTextButtonArea;
        case Core_1.ButtonPosition.rightOfText:
            return rightOfTextButtonArea;
    }
}
function canvasClassNameToArea(canvasClassName) {
    var classNames = canvasClassName.split(' '), indicatorAreaClassName;
    for (var i = 0; i < classNames.length; i++) {
        if (classNames[i].indexOf(buttonCanvasClassNamePrefix) >= 0) {
            indicatorAreaClassName = classNames[i];
            break;
        }
    }
    switch (indicatorAreaClassName) {
        case leftButtonCanvasClassName:
            return leftButtonArea;
        case rightButtonCanvasClassName:
            return rightButtonArea;
        case leftOfTextButtonCanvasClassName:
            return leftOfTextButtonArea;
        case rightOfTextButtonCanvasClassName:
            return rightOfTextButtonArea;
    }
}
function buttonAreaToCanvasClassName(buttonArea) {
    switch (buttonArea) {
        case leftButtonArea:
            return leftButtonCanvasClassName;
        case rightButtonArea:
            return rightButtonCanvasClassName;
        case leftOfTextButtonArea:
            return leftOfTextButtonCanvasClassName;
        case rightOfTextButtonArea:
            return rightOfTextButtonCanvasClassName;
    }
}


function deleteTokenAndClearTimeout(sheet, row, col, sheetArea) {
    var modelManager = sheet._modelManager;
    if (modelManager) {
        modelManager.do('setValueForKey', row, col, IS_FIRST_MOUSE_UP, keyword_undefined, sheetArea);
        var mouseupToken = modelManager.getValueForKey(row, col, MOUSE_UP_TOKEN, sheetArea);
        if (mouseupToken) {
            clearTimeout(mouseupToken);
            modelManager.do('setValueForKey', row, col, MOUSE_UP_TOKEN, keyword_undefined, sheetArea);
        }
    }
}
function getAlignmentRect(container, content, alignment) {
    switch (alignment) {
        case AlignDirection.topLeft:
            return new Core_1.Rect(container.x, container.y, Math.min(content.width, container.width), Math.min(content.height, container.height));
        case AlignDirection.topCenter:
            var startLeft = (container.width - content.width) / 2;
            startLeft = Math.max(0, startLeft);
            return new Core_1.Rect(container.x + startLeft, container.y, Math.min(content.width, container.width), Math.min(content.height, container.height));
        case AlignDirection.topRight:
            startLeft = container.width - content.width;
            startLeft = Math.max(0, startLeft);
            return new Core_1.Rect(container.x + startLeft, container.y, Math.min(content.width, container.width), Math.min(content.height, container.height));
        case AlignDirection.MiddleLeft:
            var startTop = (container.height - content.height) / 2;
            startTop = Math.max(0, startTop);
            return new Core_1.Rect(container.x, container.y + startTop, Math.min(content.width, container.width), Math.min(content.height, container.height));
        case AlignDirection.MiddleCenter:
            startLeft = (container.width - content.width) / 2;
            startLeft = Math.max(0, startLeft);
            startTop = (container.height - content.height) / 2;
            startTop = Math.max(0, startTop);
            return new Core_1.Rect(container.x + startLeft, container.y + startTop, Math.min(content.width, container.width), Math.min(content.height, container.height));
        case AlignDirection.MiddleRight:
            startLeft = container.width - content.width;
            startLeft = Math.max(0, startLeft);
            startTop = (container.height - content.height) / 2;
            startTop = Math.max(0, startTop);
            return new Core_1.Rect(container.x + startLeft, container.y + startTop, Math.min(content.width, container.width), Math.min(content.height, container.height));
        case AlignDirection.bottomLeft:
            startTop = (container.height - content.height);
            startTop = Math.max(0, startTop);
            return new Core_1.Rect(container.x, container.y + startTop, Math.min(content.width, container.width), Math.min(content.height, container.height));
        case AlignDirection.bottomCenter:
            startLeft = (container.width - content.width) / 2;
            startLeft = Math.max(0, startLeft);
            startTop = (container.height - content.height);
            startTop = Math.max(0, startTop);
            return new Core_1.Rect(container.x + startLeft, container.y + startTop, Math.min(content.width, container.width), Math.min(content.height, container.height));
        case AlignDirection.bottomRight:
            startLeft = container.width - content.width;
            startLeft = Math.max(0, startLeft);
            startTop = (container.height - content.height);
            startTop = Math.max(0, startTop);
            return new Core_1.Rect(container.x + startLeft, container.y + startTop, Math.min(content.width, container.width), Math.min(content.height, container.height));
    }
}
function getButtonsSize(buttons, style, context) {
    var buttonsSize = [];
    for (var i = 0; i < buttons.length; i++) {
        buttonsSize.push({
            width: getActualButtonWidth(buttons[i].button, style, context),
            height: getActualButtonHeight(buttons[i].button, context)
        });
    }
    return buttonsSize;
}
function getButtonsRect(buttons, layout, style, context, includeButtonsThatNotAlwaysShow, availRect) {
    var buttonRects = [], notAlwaysVisibleButtons = [];
    for (var i = 0; i < buttons.length; i++) {
        var buttonLayout = layout[buttons[i].index];
        if (isNullOrUndefined(buttonLayout)) {
            notAlwaysVisibleButtons.push(buttons[i]);
        }
        else {
            buttonRects.push(buttonLayout);
        }
    }
    var buttonsRect = getUnionRect(buttonRects);
    for (var i = 0; i < notAlwaysVisibleButtons.length; i++) {
        var buttonWidth = getActualButtonWidth(notAlwaysVisibleButtons[i].button, style, context);
        var available = availRect ? (buttonsRect.width + buttonWidth) <= availRect.width : true;
        if (available) {
            buttonsRect.width += buttonWidth;
        }
    }
    buttonsRect.height = buttonsRect.height ? buttonsRect.height : (availRect ? availRect.height : 0);
    return buttonsRect;
}
function createCanvasForPaintButton(position, sheet, cellButtons, context, style, availRect, row, col, params, layout, cellWrapperElement, contentContainer) {
    var buttons = getNeedPaintButtons(sheet, cellButtons, row, col, true, [position]), className;
    if (buttons.length > 0) {
        loadImageResource(buttons, sheet, row);
        switch (position) {
            case Core_1.ButtonPosition.left:
                className = leftButtonCanvasClassName;
                break;
            case Core_1.ButtonPosition.right:
                className = rightButtonCanvasClassName;
                break;
            case Core_1.ButtonPosition.leftOfText:
                className = leftOfTextButtonCanvasClassName;
                break;
            case Core_1.ButtonPosition.rightOfText:
                className = rightOfTextButtonCanvasClassName;
                break;
            default:
                return;
        }
        var buttonsRect = getButtonsRect(buttons, layout, style, context, true, availRect);
        var bottom = '0';
        var ratio = getDevicePixel();
        var browser = Core_1._util._browser;
        if (browser.mozilla || ratio > 1) {
            bottom = '1px';
        }


        var canvasWidth = buttonsRect.width, canvasHeight = buttonsRect.height, buttonArea = buttonPositionToArea(position);
        if (isNullOrUndefined(params.canvasSizes)) {
            params.canvasSizes = {};
        }
        var canvasSizes = params.canvasSizes;
        canvasSizes[buttonArea] = {
            width: canvasWidth,
            height: canvasHeight
        };
        var baseButtonsCanvasStyle = {
            width: canvasWidth + 'px',
            height: canvasHeight + 'px',
            display: 'block',
            position: 'absolute',
            bottom: bottom,
            overflow: 'hidden',
            paddingTop: '0'
        };


        var buttonCanvas = createCanvasElement(className, canvasWidth, canvasHeight, baseButtonsCanvasStyle);
        switch (position) {
            case Core_1.ButtonPosition.left:
                buttonCanvas.style.left = '0';
                break;
            case Core_1.ButtonPosition.right:
                buttonCanvas.style.right = '0';
                break;
            case Core_1.ButtonPosition.leftOfText:
                buttonCanvas.style.left = canvasSizes[leftOfTextButtonArea].width + 'px';
                break;
            case Core_1.ButtonPosition.rightOfText:
                buttonCanvas.style.right = canvasSizes[rightOfTextButtonArea].width + 'px';
                break;
            default:
                return;
        }
        cellWrapperElement.appendChild(buttonCanvas);
    }
}
function createCanvasElement(className, canvasWidth, canvasHeight, style) {
    var canvas = document.createElement('canvas');
    canvas.className = className + ' ' + commonButtonCanvasClassName;
    for (var styleItem in style) {
        if (style.hasOwnProperty(styleItem)) {
            canvas.style[styleItem] = style[styleItem];
        }
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    return canvas;
}
function getUnionRect(rects) {
    if (rects.length <= 0) {
        return new Core_1.Rect(0, 0, 0, 0);
    }
    var startX = rects[0].x, startY = rects[0].y, endX = rects[0].x + rects[0].width, endY = rects[0].y + rects[0].height;
    for (var i = 1; i < rects.length; i++) {
        startX = Math.min(startX, rects[i].x);
        startY = Math.min(startY, rects[i].y);
        endX = Math.max(endX, rects[i].x + rects[i].width);
        endY = Math.max(endY, rects[i].y + rects[i].height);
    }
    return new Core_1.Rect(startX, startY, endX - startX, endY - startY);
}
function adjustDomSizeByDevicePixel(size) {
    var browser = Core_1._util._browser;
    var ratio = getDevicePixel();
    if (ratio !== 1) {
        if (browser.mozilla) {
            return Math.ceil(size * ratio);
        }
        else {
            return Math.round(size * ratio);
        }
    }
    return size;
}
function paintButtonsWhenEditing(buttonCanvas, buttons, buttonArea, context, style, params, layout, editorLayout) {
    if (isNullOrUndefined(buttonCanvas)) {
        return;
    }
    if (isNullOrUndefined(editorLayout[buttonArea])) {
        editorLayout[buttonArea] = {};
    }
    loadImageResource(buttons, context.sheet, context.row);
    var ctx = buttonCanvas.getContext('2d');
    var buttonsRect = getButtonsRect(buttons, layout, style, context, true);
    ctx.setTransform(parseFloat(buttonCanvas.style.width) / buttonsRect.width, 0, 0, parseFloat(buttonCanvas.style.height) / buttonsRect.height, 0, 0);
    var x = 0, y = 0, canvasRect = new Core_1.Rect(0, 0, parseFloat(buttonCanvas.style.width), parseFloat(buttonCanvas.style.height));
    for (var i = 0; i < buttons.length; i++) {
        var buttonLayoutInfo = paintButton(ctx, x, y, getActualButtonWidth(buttons[i].button, style, context), (context.sheet.getRowHeight(context.row)), buttons[i].button, style, context, params, editorLayout[buttonArea], buttons[i].index, canvasRect);
        if (isNullOrUndefined(buttonLayoutInfo)) {
            break;
        }
        x += buttonLayoutInfo.width;
    }
}
function addEventToEditorButtonCanvas(buttonCanvas, buttonArea, context, style, cellRect, params) {
    if (isNullOrUndefined(params.eventListeners)) {
        params.eventListeners = {};
    }
    if (isNullOrUndefined(params.eventListeners[buttonArea])) {
        params.eventListeners[buttonArea] = {};
    }
    var eventListeners = params.eventListeners[buttonArea];
    var mouseDownListener = eventListeners.mouseDownListener = function (evt) {
        var mousedownArgs = {
            x: evt.offsetX,
            y: evt.offsetY,
            context: context,
            cellRect: cellRect,
            cellStyle: style,
            buttonArea: buttonArea
        };
        processMouseDown(getHitInfoIndex(mousedownArgs, true), true, buttonCanvas);
    };
    buttonCanvas.addEventListener('mousedown', mouseDownListener);
    var mouseUpListener = eventListeners.mouseUpListener = function (evt) {
        var mouseupArgs = {
            x: evt.offsetX,
            y: evt.offsetY,
            context: context,
            cellRect: cellRect,
            cellStyle: style,
            buttonArea: buttonArea
        };
        processMouseUp(getHitInfoIndex(mouseupArgs, true), true, buttonCanvas);
    };
    buttonCanvas.addEventListener('mouseup', mouseUpListener);
    var mouseMoveListener = eventListeners.mouseMoveListener = function (evt) {
        var mousemoveArgs = {
            x: evt.offsetX,
            y: evt.offsetY,
            context: context,
            cellRect: cellRect,
            cellStyle: style,
            buttonArea: buttonArea
        };
        processMouseMove(getHitInfoIndex(mousemoveArgs, true), true, buttonCanvas);
    };
    buttonCanvas.addEventListener('mousemove', mouseMoveListener);
    var mouseLeaveListener = eventListeners.mouseLeaveListener = function (evt) {
        var mouseleaveArgs = {
            x: evt.offsetX,
            y: evt.offsetY,
            context: context,
            cellRect: cellRect,
            cellStyle: style,
            buttonArea: buttonArea
        };
        if (mouseleaveArgs.x < 0) {
            mouseleaveArgs.x = 0;
        }
        if (mouseleaveArgs.x >= parseFloat(buttonCanvas.style.width)) {
            mouseleaveArgs.x = parseFloat(buttonCanvas.style.width) - 1;
        }
        processMouseLeave(getHitInfoIndex(mouseleaveArgs, true), true, buttonCanvas);
    };
    buttonCanvas.addEventListener('mouseleave', mouseLeaveListener);
}
function activateButtonsCanvas(position, sheet, cellButtons, context, style, args, row, col, params, layout, editorLayout, cellWrapperElement) {
    var buttons = getNeedPaintButtons(sheet, cellButtons, row, col, true, [position]);
    if (buttons.length > 0) {
        var buttonCanvasClassName = void 0, buttonArea = void 0;
        switch (position) {
            case Core_1.ButtonPosition.left:
                buttonCanvasClassName = leftButtonCanvasClassName;
                buttonArea = leftButtonArea;
                break;
            case Core_1.ButtonPosition.right:
                buttonCanvasClassName = rightButtonCanvasClassName;
                buttonArea = rightButtonArea;
                break;
            case Core_1.ButtonPosition.leftOfText:
                buttonCanvasClassName = leftOfTextButtonCanvasClassName;
                buttonArea = leftOfTextButtonArea;
                break;
            case Core_1.ButtonPosition.rightOfText:
                buttonCanvasClassName = rightOfTextButtonCanvasClassName;
                buttonArea = rightOfTextButtonArea;
                break;
            default:
                return;
        }
        var buttonCanvas = cellWrapperElement.querySelector('.' + buttonCanvasClassName);
        if (isNullOrUndefined(buttonCanvas)) {
            return;
        }
        var canvasWidth = parseFloat(buttonCanvas.style.width);
        var containerRect = args.options.contentRect, leftExternalRect = args.options.leftExternalRect, rightExternalRect = args.options.rightExternalRect;
        switch (position) {
            case Core_1.ButtonPosition.left:
                containerRect.x += canvasWidth;
                containerRect.width -= canvasWidth;
                break;
            case Core_1.ButtonPosition.right:
                containerRect.width -= canvasWidth;
                break;
            case Core_1.ButtonPosition.leftOfText:
                leftExternalRect.width += canvasWidth;
                break;
            case Core_1.ButtonPosition.rightOfText:
                rightExternalRect.width += canvasWidth;
                break;
        }
        paintButtonsWhenEditing(buttonCanvas, buttons, buttonArea, context, style, params, layout, editorLayout);
        addEventToEditorButtonCanvas(buttonCanvas, buttonArea, context, style, args.options.cellRect, params);
    }
}
function updateEditorByButtonCanvas(position, sheet, cellButtons, row, col, canvasSize, args) {
    var buttons = getNeedPaintButtons(sheet, cellButtons, row, col, true, [position]);
    if (buttons && buttons.length > 0) {
        var buttonArea = buttonPositionToArea(position);
        var buttonCanvasWidth = (canvasSize[buttonArea] && canvasSize[buttonArea].width) || 0;
        var container = args.contentContainer;
        var containerRect = args.contentRect, leftExternalRect = args.leftExternalRect, rightExternalRect = args.rightExternalRect;
        switch (position) {
            case Core_1.ButtonPosition.left:
                adjustElementPosition(container, 'left', buttonCanvasWidth);
                containerRect.x += buttonCanvasWidth;
                containerRect.width -= buttonCanvasWidth;
                break;
            case Core_1.ButtonPosition.leftOfText:
                adjustElementPosition(container, 'left', buttonCanvasWidth);
                leftExternalRect.width += buttonCanvasWidth;
                break;
            case Core_1.ButtonPosition.right:
                containerRect.width -= buttonCanvasWidth;
                break;
            case Core_1.ButtonPosition.rightOfText:
                rightExternalRect.width += buttonCanvasWidth;
                break;
            default:
                return;
        }
    }
}
function cssValueToNumber(cssValue) {
    return +cssValue.replace('px', '') || 0;
}
function adjustElementPosition(needAdjustElement, cssProperty, buttonCanvasWidth) {
    var cssPosition = 0;
    if (needAdjustElement.style[cssProperty]) {
        cssPosition = cssValueToNumber(needAdjustElement.style[cssProperty]);
    }
    cssPosition += buttonCanvasWidth;
    needAdjustElement.style[cssProperty] = cssPosition - 1 + 'px';
}
function removeCanvasEventListener(canvas, listeners) {
    if (!isNullOrUndefined(listeners.mouseDownListener)) {
        canvas.removeEventListener('mousedown', listeners.mouseDownListener);
    }
    if (!isNullOrUndefined(listeners.mouseUpListener)) {
        canvas.removeEventListener('mouseup', listeners.mouseUpListener);
    }
    if (!isNullOrUndefined(listeners.mouseMoveListener)) {
        canvas.removeEventListener('mousemove', listeners.mouseMoveListener);
    }
    if (!isNullOrUndefined(listeners.mouseLeaveListener)) {
        canvas.removeEventListener('mouseleave', listeners.mouseLeaveListener);
    }
}
function loadImageResource(buttons, sheet, row) {
    var imageLoader = sheet._getImageLoader();
    for (var i = 0; i < buttons.length; i++) {
        var url = getImageUrl(buttons[i].button, row);
        if (url) {
            imageLoader._addImage(url);
        }
        url = getImageUrl(buttons[i].button, row, CELL_BUTTON_HOVER_STATE);
        if (url) {
            imageLoader._addImage(url);
        }
    }
}
function isPrintZoomFactorExist(option) {
    var isPrinting = option.isPrinting, printZoomFactor = option.printZoomFactor;
    return (isPrinting && typeof printZoomFactor === 'number' && printZoomFactor !== 1);
}
Core_1.CellTypes.Base._registerFeature('cellButton', {
    beforePaintLabel: function (args) {
        var context = args.options.context, style = args.options.style;
        if (!context.cellOverflowLayout && style.cellButtons && style.cellButtons.length > 0) {
            var sheet = args.options.context.sheet;
            var row = context.row;
            var col = context.col;
            var cellButtons = getNeedPaintButtons(sheet, style.cellButtons, row, col, false, [Core_1.ButtonPosition.left, Core_1.ButtonPosition.right]);
            if (cellButtons && cellButtons.length > 0) {
                var newStyle = resetCellButtonStyle(style);
                loadImageResource(cellButtons, sheet, args.options.context.row);
                var ctx = args.ctx;
                if (!ctx) {
                    return;
                }
                var cellRect = args.options.rect;
                ctx.save();
                ctx.rect(cellRect.x, cellRect.y, cellRect.width, cellRect.height);
                ctx.clip();
                ctx.beginPath();
                var x = cellRect.x, rightBound = cellRect.x + cellRect.width, params = getParams(sheet, context.row, context.col, context.sheetArea);
                if (isNullOrUndefined(params.layout)) {
                    params.layout = {};
                }
                var layout = params.layout;
                var leftButtons = getNeedPaintButtons(sheet, style.cellButtons, row, col, false, [Core_1.ButtonPosition.left]);
                for (var i = 0; i < leftButtons.length; i++) {
                    var buttonLayoutInfo = paintButton(ctx, x, cellRect.y, getActualButtonWidth(leftButtons[i].button, newStyle, context), cellRect.height, leftButtons[i].button, newStyle, context, params, layout, leftButtons[i].index, cellRect);
                    if (isNullOrUndefined(buttonLayoutInfo)) {
                        break;
                    }
                    x += buttonLayoutInfo.width;
                }
                var cellContentRectX = x;
                var rightButton = getNeedPaintButtons(sheet, style.cellButtons, row, col, false, [Core_1.ButtonPosition.right]);
                x = rightBound;
                for (var i = rightButton.length - 1; i >= 0; i--) {
                    var buttonWidth = getActualButtonWidth(rightButton[i].button, newStyle, context);
                    x -= buttonWidth;
                    var buttonLayoutInfo = paintButton(ctx, x, cellRect.y, buttonWidth, cellRect.height, rightButton[i].button, newStyle, context, params, layout, rightButton[i].index, cellRect);
                    if (isNullOrUndefined(buttonLayoutInfo)) {
                        break;
                    }
                }
                ctx.restore();
                cellRect.x = cellContentRectX;
                cellRect.width = x - cellContentRectX;
            }
        }
    },
    beforePaintText: function (args) {
        var context = args.context, style = args.style;
        if (!context.cellOverflowLayout && style.cellButtons && style.cellButtons.length > 0) {
            var sheet = args.context.sheet;
            var row = context.row;
            var col = context.col;
            var externals = args.externals;
            externals.left = externals.left.concat(getButtonsSize(getNeedPaintButtons(sheet, style.cellButtons, row, col, false, [Core_1.ButtonPosition.leftOfText]), style, context));
            externals.right = externals.right.concat(getButtonsSize(getNeedPaintButtons(sheet, style.cellButtons, row, col, false, [Core_1.ButtonPosition.rightOfText]), style, context));
        }
    },
    beforeFillTextArea: function (args) {
        var style = args.style, cellButtons = style.cellButtons;
        if (style.cellButtons && style.cellButtons.length > 0) {
            var ctx = args.ctx, availRect = args.availRect, textRect = args.textRect, context = args.context, sheet = context.sheet, row = context.row, col = context.col;
            var leftButtons = getNeedPaintButtons(sheet, cellButtons, row, col, false, [Core_1.ButtonPosition.leftOfText]);
            paintHorizontalTextExternalButtons(ctx, leftButtons, availRect, textRect, style, context, true);
        }
    },
    afterFillTextArea: function (args) {
        var style = args.style, cellButtons = style.cellButtons;
        if (style.cellButtons && style.cellButtons.length > 0) {
            var ctx = args.ctx, availRect = args.availRect, textRect = args.textRect, context = args.context, sheet = context.sheet, row = context.row, col = context.col;
            var rightButtons = getNeedPaintButtons(sheet, cellButtons, row, col, false, [Core_1.ButtonPosition.rightOfText]);

            paintHorizontalTextExternalButtons(ctx, rightButtons, availRect, textRect, style, context, false);
        }
    },
    onCreateCellEditor: function (args) {
        var cellWrapperElement = args.options.dom;
        if (!cellWrapperElement || !cellWrapperElement.children) {
            return;
        }
        var contentContainer = cellWrapperElement.children[0];
        if (!contentContainer || !contentContainer.children) {
            return;
        }
        var contentElement = contentContainer.children[0];
        if (contentElement) {
            var context = args.context;
            var sheet = context.sheet;
            var row = context.row;
            var col = context.col;
            var cellStyle = args.options.cellStyle;
            if (isNullOrUndefined(cellStyle)) {
                cellStyle = sheet.getActualStyle(row, col);
            }
            var cellButtons = cellStyle.cellButtons;
            if (isNullOrUndefined(cellButtons) || (cellButtons && cellButtons.length <= 0)) {
                return;
            }
            var cellRect = args.options.cellRect;
            var availRect = new Core_1.Rect(cellRect.x, cellRect.y, cellRect.width, cellRect.height);
            var params = getParams(sheet, row, col, context.sheetArea);
            if (isNullOrUndefined(params.layout)) {
                params.layout = {};
            }
            var layout = params.layout, containsCloseToTextCellButtons = false;
            for (var i = 0; i < cellButtons.length; i++) {
                if (cellButtons[i].position === Core_1.ButtonPosition.leftOfText || cellButtons[i].position === Core_1.ButtonPosition.rightOfText) {
                    containsCloseToTextCellButtons = true;
                }
            }
            if (containsCloseToTextCellButtons) {
                contentContainer.style.overflow = 'hidden';
            }
            for (var i = 0; i < allButtonPositions.length; i++) {
                createCanvasForPaintButton(allButtonPositions[i], sheet, cellButtons, context, cellStyle, availRect, row, col, params, layout, cellWrapperElement, contentContainer);
            }
        }
    },
    onActivateCellEditor: function (args) {
        var context = args.context, sheet = context.sheet, row = context.row, col = context.col, cellStyle = args.options.cellStyle, cellButtons = cellStyle.cellButtons;
        if (isNullOrUndefined(cellButtons) || cellButtons.length <= 0) {
            return;
        }
        var params = getParams(sheet, row, col, context.sheetArea);
        if (isNullOrUndefined(params.editorLayout)) {
            params.editorLayout = {};
        }
        var layout = params.layout;
        var editorLayout = params.editorLayout;
        var newStyle = resetCellButtonStyle(cellStyle);
        var cellWrapperElement = args.options.dom;
        for (var i = 0; i < allButtonPositions.length; i++) {
            activateButtonsCanvas(allButtonPositions[i], sheet, cellButtons, context, newStyle, args, row, col, params, layout, editorLayout, cellWrapperElement);
        }
    },


    onDeactivateCellEditor: function (args) {
        var context = args.context;
        var sheet = context.sheet;
        var row = context.row;
        var col = context.col;
        var style = sheet.getActualStyle(row, col, context.sheetArea);
        var cellButtons = style.cellButtons;
        if (cellButtons && cellButtons.length > 0) {
            var params = getParams(context.sheet, row, col, context.sheetArea), eventListeners = params.eventListeners, cellWrapperElement = args.options.dom, buttonCanvases = cellWrapperElement.querySelectorAll('.' + commonButtonCanvasClassName);
            for (var i = 0; i < buttonCanvases.length; i++) {
                var buttonCanvas = buttonCanvases[i], buttonArea = canvasClassNameToArea(buttonCanvas.className);
                if (!isNullOrUndefined(buttonArea) && !isNullOrUndefined(eventListeners) && !isNullOrUndefined(eventListeners[buttonArea])) {
                    removeCanvasEventListener(buttonCanvas, eventListeners[buttonArea]);
                    delete params.eventListeners[buttonArea];
                }
            }
        }
    },
    onUpdateContainer: function (args) {
        var context = args.context;
        var sheet = context.sheet;
        var row = context.row;
        var col = context.col;

        var params = getParams(context.sheet, row, col, context.sheetArea), canvasSizes = params.canvasSizes, cellButtons = args.cellStyle.cellButtons;
        if (isNullOrUndefined(cellButtons) || cellButtons.length <= 0) {
            return;
        }
        args.context.preventOverflow = true;
        for (var i = 0; i < allButtonPositions.length; i++) {
            updateEditorByButtonCanvas(allButtonPositions[i], sheet, cellButtons, row, col, canvasSizes, args);
        }
    },
    getCellButtonHitInfo: function (args) {
        args.paddingHitInfo = getHitInfoIndex(args);
    },
    processMouseDownOnCellPadding: function (hitInfo) {
        processMouseDown(hitInfo);
    },
    processMouseUpOnCellPadding: function (hitInfo) {
        processMouseUp(hitInfo);
    },
    processMouseMoveOnCellPadding: function (hitInfo) {
        processMouseMove(hitInfo);
    },
    processMouseLeaveOnCellPadding: function (hitInfo) {
        processMouseLeave(hitInfo);
    },
    getCellButtonAutoHeight: function (args) {
        var sheet = args.context.sheet;
        var row = args.context.row;
        var col = args.context.col;
        var style = args.cellStyle;
        if (!style.cellButtons || style.cellButtons.length === 0) {
            return;
        }
        var cellButtons = getNeedPaintButtons(sheet, style.cellButtons, row, col, false, [Core_1.ButtonPosition.left, Core_1.ButtonPosition.right]);
        var height = 0;
        cellButtons.forEach(function (config) {
            var textHeight = CellTypeContext._getAutoFitHeight(keyword_null, config.button.caption, style, sheet.zoom(), args.context) - 2;
            var imageUrl = getImageUrl(config.button, row);
            if (imageUrl) {
                textHeight = Math_max(textHeight, getCellButtonImageWidth(config.button));
            }
            height = Math_max(textHeight, height);
        });
        args.value = (height + TEXT_MARGIN * 1);
    },
    getCellButtonAutoWidth: function (args) {
        var sheet = args.context.sheet;
        var row = args.context.row;
        var col = args.context.col;
        var style = args.cellStyle;
        if (!style.cellButtons || style.cellButtons.length === 0) {
            return;
        }
        var cellButtons = getNeedPaintButtons(sheet, style.cellButtons, row, col, false, [Core_1.ButtonPosition.left, Core_1.ButtonPosition.right]);
        var width = 0;
        cellButtons.forEach(function (config) {
            width = width + getActualButtonWidth(config.button, style, args.context, false);
        });
        args.value = width;
    }
});

function getExternalButtonRect(cellRect, textRect, position) {
    switch (position) {
        case Core_1.ButtonPosition.leftOfText:
            return new Core_1.Rect(cellRect.x, cellRect.y, textRect.x - cellRect.x, cellRect.height);
        case Core_1.ButtonPosition.rightOfText:
            return new Core_1.Rect(textRect.x + textRect.width, cellRect.y, cellRect.x + cellRect.width - textRect.x - textRect.width, cellRect.height);
    }
}
function paintHorizontalTextExternalButtons(ctx, buttonConfigs, availRect, textRect, style, context, isLeft) {
    if (!ctx || buttonConfigs.length <= 0) {
        return;
    }
    style = resetCellButtonStyle(style);
    var sheet = context.sheet;
    loadImageResource(buttonConfigs, sheet, context.row);
    var buttonRect = getExternalButtonRect(availRect, textRect, isLeft ? Core_1.ButtonPosition.leftOfText : Core_1.ButtonPosition.rightOfText);
    ctx.save();
    ctx.rect(buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height);
    ctx.clip();
    ctx.beginPath();
    var params = getParams(sheet, context.row, context.col, context.sheetArea), newStyle = resetCellButtonStyle(style), x;
    if (isNullOrUndefined(params.layout)) {
        params.layout = {};
    }
    if (isLeft) {
        x = buttonRect.x + buttonRect.width;
        for (var i = buttonConfigs.length - 1; i >= 0; i--) {
            var buttonWidth = getActualButtonWidth(buttonConfigs[i].button, newStyle, context);
            x -= buttonWidth;
            var buttonLayoutInfo = paintButton(ctx, x, availRect.y, getActualButtonWidth(buttonConfigs[i].button, newStyle, context), buttonRect.height, buttonConfigs[i].button, newStyle, context, params, params.layout, buttonConfigs[i].index, availRect);
            if (isNullOrUndefined(buttonLayoutInfo)) {
                break;
            }
        }
    }
    else {
        x = buttonRect.x;
        for (var i = 0; i < buttonConfigs.length; i++) {
            var buttonLayoutInfo = paintButton(ctx, x, availRect.y, getActualButtonWidth(buttonConfigs[i].button, newStyle, context), buttonRect.height, buttonConfigs[i].button, newStyle, context, params, params.layout, buttonConfigs[i].index, availRect);
            if (isNullOrUndefined(buttonLayoutInfo)) {
                break;
            }
            x += buttonLayoutInfo.width;
        }
    }
    ctx.restore();
}
function adjustButtonRect(x, y, width, height, cellRect) {
    if (x + width < cellRect.x || x > cellRect.x + cellRect.width) {
        return;
    }
    if (y + height < cellRect.y || y > cellRect.y + cellRect.height) {
        return;
    }
    if (x + width > cellRect.x + cellRect.width) {
        width = cellRect.x + cellRect.width - x;
    }
    if (y + height > cellRect.y + cellRect.height) {
        height = cellRect.y + cellRect.height - y;
    }
    if (x < cellRect.x) {
        x = cellRect.x;
    }
    if (y < cellRect.y) {
        y = cellRect.y;
    }
    return new Core_1.Rect(x, y, width, height);
}
function paintButton(ctx, x, y, width, height, button, style, context, params, layout, index, cellRect) {
    var buttonState = CELL_BUTTON_NORMAL_STATE;
    if (params.buttonDownIndex === index) {
        buttonState = CELL_BUTTON_CLICK_STATE;
    }
    else if (params.buttonHoverIndex === index) {
        buttonState = CELL_BUTTON_HOVER_STATE;
    }
    var buttonRect = adjustButtonRect(x, y, width, height, cellRect);
    if (isNullOrUndefined(buttonRect)) {
        return;
    }
    paintButtonImp(ctx, buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height, button, style, context, buttonState, cellRect);
    layout[index] = new Core_1.Rect(buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height);


    layout[index].offsetX = buttonRect.x - cellRect.x;
    layout[index].offsetY = buttonRect.y - cellRect.y;
    return layout[index];
}
function paintButtonImp(ctx, x, y, width, height, config, style, options, buttonState, cellRect) {
    ctx.save();
    ctx.beginPath();
    var isButton = config.useButtonStyle;
    var printZoomFactorExist = isPrintZoomFactorExist(options), printZoomFactor = options.printZoomFactor;
    var zoomFactor = printZoomFactorExist ? printZoomFactor : options.sheet.zoom();
    var margin = isButton ? (TEXT_MARGIN * zoomFactor) : 0;
    x = x + margin;
    y = y + margin;
    width = width - 2 * margin;
    height = height - 2 * margin;
    var strokeStyle = BUTTON_BORDER_COLOR;
    var hoverFillStyle = config.hoverBackColor || BUTTON_HOVER_COLOR;
    if (strokeStyle && ctx.strokeStyle !== strokeStyle) {
        ctx.strokeStyle = strokeStyle;
    }
    if (isButton) {
        ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);
    }
    var enabled = isEnabled(config.enabled, options.row);
    var fillStyle;
    if (!isButton) {
        fillStyle = config.buttonBackColor || 'white';
        if (buttonState === CELL_BUTTON_HOVER_STATE && (config.enabled || isNullOrUndefined(config.enabled))) {
            fillStyle = hoverFillStyle;
        }
    }
    else if (config.enabled === false) {
        fillStyle = config.buttonBackColor || BUTTON_DISABLED_COLOR;
    }
    else if (buttonState === CELL_BUTTON_CLICK_STATE) {
        fillStyle = BUTTON_PRESSED_COLOR;
    }
    else if (buttonState === CELL_BUTTON_HOVER_STATE || options.visualState === Core_1.VisualState.hover) {
        fillStyle = hoverFillStyle;
    }
    else {
        var gradient = ctx.createLinearGradient(x + width / 2, y, x + width / 2, y + height);
        gradient.addColorStop(0.125, '#F6FAFB');
        gradient.addColorStop(1.0, '#D2DBEB');
        fillStyle = config.buttonBackColor || gradient;
    }
    var font = style.font;
    if (font && ctx.font !== font) {
        ctx.font = font;
    }
    if (ctx.fillStyle !== fillStyle) {
        ctx.fillStyle = fillStyle;
    }
    x = x + 1;
    y = y + 1;
    width = width - 2;
    height = height - 2;
    // ctx.rect(x, y, width, height);
    // ctx.clip();
    // ctx.beginPath();
    // ctx.fillRect(x, y, width, height);
    var imageContainer = new Core_1.Rect(x, y, width, height);
    var captionContainer = new Core_1.Rect(x, y, width, height);
    var cpationImagePadding = captionImagePadding * zoomFactor;
    var imageUrl = getImageUrl(config, options.row, buttonState);
    if (config.caption && imageUrl) {
        var captionWidth = (CellTypeContext._getAutoFitWidth(keyword_null, config.caption, style, zoomFactor, options) + TEXT_MARGIN * 2) * zoomFactor;
        var imageWidth = getCellButtonImageWidth(config) * zoomFactor;
        var captionImageRect = new Core_1.Rect(0, 0, captionWidth + imageWidth + cpationImagePadding, height);
        var containerRect = new Core_1.Rect(x, y, width, height);
        var captionImageFinalRect = getAlignmentRect(containerRect, captionImageRect, AlignDirection.MiddleCenter);
        if (config.captionAlign === Core_1.CaptionAlignment.left) {
            captionContainer = new Core_1.Rect(captionImageFinalRect.x, y, captionWidth, height);
            if (captionImageFinalRect.x + captionWidth + cpationImagePadding < x + width - 2) {
                imageContainer = new Core_1.Rect(captionImageFinalRect.x + captionWidth + cpationImagePadding, y, Math.max(0, imageWidth), height);
            }
            else {
                imageContainer = new Core_1.Rect(0, 0, 0, 0);
            }
        }
        else {
            imageContainer = new Core_1.Rect(captionImageFinalRect.x, y, Math.min(imageWidth, width), height);
            if (captionImageFinalRect.x + imageWidth + cpationImagePadding < x + width - 2) {
                captionContainer = new Core_1.Rect(captionImageFinalRect.x + imageWidth + cpationImagePadding, y, Math.min(width - 2 - imageWidth - cpationImagePadding, captionWidth), height);
            }
            else {
                captionContainer = new Core_1.Rect(0, 0, 0, 0);
            }
        }
    }
    if (config.caption) {
        var autoFitWidth = (CellTypeContext._getAutoFitWidth(keyword_null, config.caption, style, zoomFactor, options) + TEXT_MARGIN * 2) * zoomFactor;
        var autoFitHeight = (CellTypeContext._getAutoFitHeight(keyword_null, config.caption, style, zoomFactor, options) + TEXT_MARGIN * 2) * zoomFactor;
        var contentRect = new Core_1.Rect(0, 0, autoFitWidth, autoFitHeight);
        var rect = getAlignmentRect(captionContainer, contentRect, AlignDirection.MiddleCenter);
        var baseCellType = new BaseCellType();
        style = style.clone();
        if (enabled === false) {
            style.foreColor = CAPTION_DISABLE_COLOR;
        }
        style.cellButtons = keyword_undefined;
        var deltaY = printZoomFactorExist ? 0 : 2;
        baseCellType.paintValue(ctx, config.caption, rect.x, rect.y - deltaY, rect.width, rect.height, style, options);
    }
    if (imageUrl) {
        paintImage(ctx, config, imageContainer.x, imageContainer.y, imageContainer.width, imageContainer.height, imageUrl, options, cellRect);
    }
    ctx.restore();
}
function paintImage(ctx, config, x, y, width, height, imageUrl, options, cellRect) {
    ctx.save();
    ctx.rect(x + 2, y + 2, width - 4, height - 4);
    ctx.clip();
    ctx.beginPath();
    var sheet = options.sheet;
    var imageLoader = sheet._getImageLoader();
    if (imageLoader._getState(imageUrl)) {
        if (imageLoader._isLoadedSuccess(imageUrl)) {
            var zoomFactor = isPrintZoomFactorExist(options) ? options.printZoomFactor : sheet.zoom();
            var containerRect = new Core_1.Rect(x, y, width, height);
            var imageWidth = getCellButtonImageWidth(config) - 2;
            var imageHeight = getCellButtonImageHeight(config) - 2;
            var contentRect = new Core_1.Rect(0, 0, imageWidth * zoomFactor, imageHeight * zoomFactor);
            var rect = getAlignmentRect(containerRect, contentRect, AlignDirection.MiddleCenter);
            var image = imageLoader._getImage(imageUrl);
            var actualImageWidth = image.width, actualImageHeight = image.height;
            if (Core_1._util._browser.msie && config.imageType) {
                if (config.imageType === Core_1.ButtonImageType.custom) {
                    if (!imageSizeCache[imageUrl]) {
                        image.style.position = 'absolute';
                        image.style.left = '-10000px';
                        image.style.top = '-100000px';
                        document.body.appendChild(image);
                        imageSizeCache[imageUrl] = { width: image.width, height: image.height };
                        document.body.removeChild(image);
                    }
                    actualImageWidth = imageSizeCache[imageUrl].width;
                    actualImageHeight = imageSizeCache[imageUrl].height;
                }
                else {
                    actualImageWidth = 12;
                    actualImageHeight = 12;
                }
            }

            if (cellRect && Core_1._util._browser.msie && rect.x + rect.width > cellRect.x + cellRect.width) {
                var viewWidth = cellRect.x + cellRect.width - rect.x;
                if (viewWidth > 0) {
                    var factor = actualImageWidth / (imageWidth * zoomFactor);
                    ctx.drawImage(image, 0, 0, viewWidth * factor, actualImageHeight, rect.x, rect.y, viewWidth, imageHeight * zoomFactor);
                }
            }
            else {
                ctx.drawImage(image, 0, 0, actualImageWidth, actualImageHeight, rect.x, rect.y, imageWidth * zoomFactor, imageHeight * zoomFactor);
            }
        }
    }
    else {
        imageLoader._addImage(imageUrl);
    }
    ctx.restore();
}
function getActualButtonWidth(config, cellStyle, context, needZoom) {
    if (needZoom === void 0) { needZoom = true; }
    var zoomfactor = isPrintZoomFactorExist(context) ? context.printZoomFactor : context.sheet.zoom();
    var padding = TEXT_MARGIN * 2 + 3;
    if (isNullOrUndefined(config.width)) {
        var textWidth = CellTypeContext._getAutoFitWidth(keyword_null, config.caption, cellStyle, zoomfactor, context);
        var isButton = config.useButtonStyle;
        var imageUrl = getImageUrl(config, context.row);
        if (imageUrl) {
            textWidth = getCellButtonImageWidth(config) + textWidth;
            padding = (isButton ? padding : 0) + captionImagePadding;
        }
        if (needZoom) {
            return (textWidth + padding + 7) * zoomfactor;
        }
        else {
            return textWidth + padding + 7;
        }
    }
    else {
        var width = Math_max(1, config.width);
        if (isNaN(width)) {
            width = 1;
        }
        if (needZoom) {
            return width * zoomfactor;
        }
        else {
            return width;
        }
    }
}
function getActualButtonHeight(config, context, needZoom) {
    if (needZoom === void 0) { needZoom = true; }
    var sheet = context.sheet;
    var zoomfactor = isPrintZoomFactorExist(context) ? context.printZoomFactor : sheet.zoom();
    var rowHeight = sheet.getRowHeight(context.row);
    var imageHeight = config.imageSize ? config.imageSize.height : keyword_null;
    var height = Math_max(1, imageHeight ? imageHeight : rowHeight);
    if (isNaN(height)) {
        height = 1;
    }
    if (needZoom) {
        return height * zoomfactor;
    }
    else {
        return height;
    }
}


function getNeedPaintButtons(sheet, buttons, row, col, isEditing, positions) {
    var cellButtons = [];
    if (!buttons || buttons.length === 0) {
        return [];
    }
    var isSelect = false;
    var mouseupToken = sheet._modelManager.getValueForKey(row, col, LEAVE_CELL);
    if (sheet.getActiveRowIndex() === row && sheet.getActiveColumnIndex() === col && mouseupToken !== true) {
        isSelect = true;
    }
    for (var i = 0; i < buttons.length; i++) {
        var visible = buttons[i].visible;
        for (var j = 0; j < positions.length; j++) {
            if (buttons[i].position === positions[j] || (isNullOrUndefined(buttons[i].position) && positions[j] === Core_1.ButtonPosition.right)) {
                if (visible && typeof visible === 'function') {
                    if (visible(row)) {
                        cellButtons.push({ index: i, button: buttons[i] });
                    }
                }
                else {
                    if (buttons[i].visibility === Core_1.ButtonVisibility.onEditing && isEditing) {
                        cellButtons.push({ index: i, button: buttons[i] });
                    }
                    else if (buttons[i].visibility !== Core_1.ButtonVisibility.onEditing && isSelect) {
                        cellButtons.push({ index: i, button: buttons[i] });
                    }
                    else if (buttons[i].visibility === Core_1.ButtonVisibility.always || isNullOrUndefined(buttons[i].visibility)) {
                        cellButtons.push({ index: i, button: buttons[i] });
                    }
                }
            }
        }
    }
    return cellButtons;
}
function getCellButtonImageWidth(cellButton) {
    var imageWidth;
    if (cellButton.imageSize) {
        if (typeof cellButton.imageSize.width === 'string') {
            imageWidth = parseIntFunc(cellButton.imageSize.width);
        }
        if (typeof cellButton.imageSize.width === 'number') {
            imageWidth = cellButton.imageSize.width;
        }
    }
    if (imageWidth === keyword_null || isNaN(imageWidth) || imageWidth < 0) {
        imageWidth = 16;
    }
    return imageWidth;
}
function getCellButtonImageHeight(cellButton) {
    var imageHeight;
    if (cellButton.imageSize) {
        if (typeof cellButton.imageSize.height === 'string') {
            imageHeight = parseIntFunc(cellButton.imageSize.height);
        }
        if (typeof cellButton.imageSize.height === 'number') {
            imageHeight = cellButton.imageSize.height;
        }
    }
    if (imageHeight === keyword_null || isNaN(imageHeight) || imageHeight < 0) {
        imageHeight = 16;
    }
    return imageHeight;
}
function getParams(sheet, row, col, sheetArea, notCreate) {
    var defaultParam = {
        isMouseDownReservedLocation: false
    };
    if (sheetArea === Core_1.SheetArea.corner) {
        return defaultParam;
    }
    var param = sheet._modelManager.getValueForKey(row, col, cellButtonParam, sheetArea);
    if (!param && !notCreate) {
        param = defaultParam;
        setParams(sheet, row, col, sheetArea, param);
    }
    return param;
}
function setParams(sheet, row, col, sheetArea, value) {
    sheet._modelManager.setValueForKey(row, col, cellButtonParam, value, sheetArea);
}


function getHitInfoIndex(args, editorMode) {
    if (editorMode === void 0) { editorMode = false; }
    var row = args.context.row, col = args.context.col, cellRect = args.cellRect, cellStyle = args.cellStyle, context = args.context;
    var hitInfo = {
        x: args.x,
        y: args.y,
        row: row,
        col: col,
        cellRect: cellRect,
        cellStyle: cellStyle,
        sheetArea: args.context.sheetArea,
        sheet: args.context.sheet,
        context: context
    };
    var sheet = hitInfo.sheet;
    if (args.cellStyle.locked !== false && sheet.options.isProtected) {
        return null;
    }
    var params = getParams(sheet, hitInfo.row, hitInfo.col, hitInfo.sheetArea, true), cellButtons = args.cellStyle.cellButtons;
    if (!params || !cellButtons || cellButtons.length <= 0) {
        return null;
    }
    var layout = params.layout;
    if (editorMode) {
        layout = params.editorLayout[args.buttonArea];
    }
    if (!layout) {
        return null;
    }
    var hitButtonIndex = -1;
    var hitX = hitInfo.x, hitY = hitInfo.y;
    for (var index in layout) {
        if (layout.hasOwnProperty(index)) {
            var testRect = void 0, currentLayout = layout[index];
            if (editorMode) {
                testRect = new Core_1.Rect(currentLayout.x, currentLayout.y, currentLayout.width, currentLayout.height);
            }
            else {
                testRect = new Core_1.Rect(cellRect.x + currentLayout.offsetX, cellRect.y + currentLayout.offsetY, currentLayout.width, currentLayout.height);
            }
            if (testRect && testRect.contains(hitX, hitY)) {
                hitButtonIndex = +index;
                break;
            }
        }
    }
    if (hitButtonIndex !== -1) {
        hitInfo.cellButtonHitInfo = {
            hitButtonIndex: hitButtonIndex,
            buttonConfig: cellButtons[hitButtonIndex],
            buttonArea: args.buttonArea
        };
    }
    else {
        var celltype = sheet.getCellType(hitInfo.row, hitInfo.col);
        if (celltype) {
            var leftButtonsRect = getButtonsRect(getNeedPaintButtons(sheet, cellButtons, row, col, editorMode, [Core_1.ButtonPosition.left]), layout, cellStyle, context, false);
            var rightButtonsRect = getButtonsRect(getNeedPaintButtons(sheet, cellButtons, row, col, editorMode, [Core_1.ButtonPosition.right]), layout, cellStyle, context, false);
            var cellRectWithoutLeftRightButtons = new Core_1.Rect(cellRect.x + leftButtonsRect.width, cellRect.y, cellRect.width - leftButtonsRect.width - rightButtonsRect.width, cellRect.height);
            var info = celltype.getHitInfo(hitInfo.x, hitInfo.y, cellStyle, cellRectWithoutLeftRightButtons, context);
            if (info && info.isReservedLocation) {
                hitInfo.isReservedLocation = true;
            }
        }
    }
    return hitInfo;
}
function processMouseDown(hitInfo, editorMode, buttonCanvas) {
    if (editorMode === void 0) { editorMode = false; }
    if (!hitInfo || !hitInfo.cellButtonHitInfo) {
        return false;
    }
    var sheet = hitInfo.sheet, hasOverLay;

    var row = hitInfo.row, col = hitInfo.col, sheetArea = hitInfo.sheetArea;
    if ((row !== sheet._activeRowIndex || col !== sheet._activeColIndex) && sheetArea === Core_1.SheetArea.viewport && !sheet.endEdit()) {
        return;
    }
    if (hitInfo.cellButtonHitInfo.buttonConfig) {
        hasOverLay = hitInfo.cellButtonHitInfo.buttonConfig.hasOverLay;
    }
    var params = getParams(sheet, row, col, hitInfo.sheetArea);
    var buttonConfig, hitButtonIndex;
    if (hitInfo.cellButtonHitInfo) {
        hitButtonIndex = hitInfo.cellButtonHitInfo.hitButtonIndex;
        buttonConfig = hitInfo.cellButtonHitInfo.buttonConfig;
    }
    var enabled = isEnabled(buttonConfig.enabled, hitInfo.row);
    if (sheet && (!params.isMouseDownReservedLocation || hasOverLay) && buttonConfig
        && (enabled || isNullOrUndefined(enabled))
        && hitButtonIndex >= 0) {
        params.buttonDownIndex = hitButtonIndex;
        params.isMouseDownReservedLocation = true;
        if (editorMode && buttonCanvas) {
            var style = hitInfo.cellStyle, layout = params.layout, context = hitInfo.context, editorLayout = params.editorLayout, buttonArea = hitInfo.cellButtonHitInfo && hitInfo.cellButtonHitInfo.buttonArea, cellButtons = style.cellButtons;
            if (buttonArea) {
                var buttons = getNeedPaintButtons(sheet, cellButtons, row, col, true, [buttonAreaToPosition(buttonArea)]);
                paintButtonsWhenEditing(buttonCanvas, buttons, buttonArea, context, style, params, layout, editorLayout);
            }
        }
        else {
            sheet.repaint(hitInfo.cellRect);
        }
        return true;
    }
    return false;
}
function processMouseUp(hitInfo, editorMode, buttonCanvas) {
    if (editorMode === void 0) { editorMode = false; }
    if (!hitInfo) {
        return;
    }
    var sheet = hitInfo && hitInfo.sheet, row = hitInfo.row, col = hitInfo.col;
    var params = getParams(sheet, hitInfo.row, hitInfo.col, hitInfo.sheetArea);
    var cellButtonHitInfo = hitInfo.cellButtonHitInfo;
    if (params.isMouseDownReservedLocation && sheet) {
        if (cellButtonHitInfo && cellButtonHitInfo.hitButtonIndex >= 0 && cellButtonHitInfo.buttonConfig.command) {
            var command = cellButtonHitInfo.buttonConfig.command;
            if (!editorMode && (sheet.getActiveRowIndex() !== row || sheet.getActiveColumnIndex() !== col)) {
                sheet._setSelectionImp(row, col, 1, 1, 2);
            }
            if (typeof command === 'string') {
                sheet.getParent().commandManager().execute({
                    cmd: command,
                    row: row,
                    col: col,
                    sheetName: sheet.name(),
                    sheetArea: hitInfo.sheetArea
                });
            }
            else if (typeof command === 'function') {
                command.call(keyword_null, sheet, row, col, hitInfo.sheetArea);
            }
        }
        if (editorMode && params.buttonDownIndex >= 0 && buttonCanvas) {
            params.buttonDownIndex = -1;
            var style = hitInfo.cellStyle, layout = params.layout, context = hitInfo.context, editorLayout = params.editorLayout, buttonArea = cellButtonHitInfo && cellButtonHitInfo.buttonArea, cellButtons = style.cellButtons;
            if (buttonArea) {
                var buttons = getNeedPaintButtons(sheet, cellButtons, row, col, true, [buttonAreaToPosition(buttonArea)]);
                paintButtonsWhenEditing(buttonCanvas, buttons, buttonArea, context, style, params, layout, editorLayout);
            }
        }
        params.buttonDownIndex = -1;
        if (!editorMode) {
            sheet.repaint(hitInfo.cellRect);
        }
        params.isMouseDownReservedLocation = false;
        var sheetArea_1 = hitInfo.sheetArea;
        var isFirstMouseUp = sheet._modelManager.getValueForKey(row, col, IS_FIRST_MOUSE_UP, sheetArea_1);
        if (!isFirstMouseUp) {
            triggerButtonClicked(sheet, row, col, sheetArea_1);
            sheet._modelManager.do('setValueForKey', row, col, IS_FIRST_MOUSE_UP, true, sheetArea_1);
            var mouseupToken = setTimeout(function () {
                deleteTokenAndClearTimeout(sheet, row, col, sheetArea_1);
            }, 250);
            sheet._modelManager.do('setValueForKey', row, col, MOUSE_UP_TOKEN, mouseupToken, sheetArea_1);
            return true;
        }
        deleteTokenAndClearTimeout(sheet, row, col, sheetArea_1);
    }
    return false;
}
function processMouseMove(hitInfo, editorMode, buttonCanvas) {
    if (editorMode === void 0) { editorMode = false; }
    if (!hitInfo) {
        return;
    }
    var sheet = hitInfo && hitInfo.sheet;
    var params = getParams(sheet, hitInfo.row, hitInfo.col, hitInfo.sheetArea);
    var hitButtonIndex = -1;
    if (hitInfo.cellButtonHitInfo) {
        hitButtonIndex = hitInfo.cellButtonHitInfo.hitButtonIndex;
    }
    if (hitButtonIndex !== (isNullOrUndefined(params.buttonHoverIndex) ? -1 : params.buttonHoverIndex)) {
        params.buttonHoverIndex = hitButtonIndex;
        if (editorMode) {
            var style = hitInfo.cellStyle, layout = params.layout, context = hitInfo.context, editorLayout = params.editorLayout, cellButtons = style.cellButtons, row = hitInfo.row, col = hitInfo.col;
            if (buttonCanvas) {
                var wrapperElement = buttonCanvas.parentElement;
                repaintAllButtonsCanvases(cellButtons, sheet, row, col, wrapperElement, context, style, params, layout, editorLayout);
            }
        }
        else {
            sheet.repaint(hitInfo.cellRect);
        }
        return true;
    }
}
function processMouseLeave(hitInfo, editorMode, buttonCanvas) {
    if (editorMode === void 0) { editorMode = false; }
    if (!hitInfo || !hitInfo.cellButtonHitInfo) {
        return;
    }
    var sheet = hitInfo && hitInfo.sheet;
    var params = getParams(sheet, hitInfo.row, hitInfo.col, hitInfo.sheetArea);
    if (editorMode) {
        params.buttonHoverIndex = -1;
        if (hitInfo.cellButtonHitInfo.hitButtonIndex >= 0) {
            var style = hitInfo.cellStyle, layout = params.layout, context = hitInfo.context, editorLayout = params.editorLayout, cellButtons = style.cellButtons, row = hitInfo.row, col = hitInfo.col;
            if (buttonCanvas) {
                var wrapperElement = buttonCanvas.parentElement;
                repaintAllButtonsCanvases(cellButtons, sheet, row, col, wrapperElement, context, style, params, layout, editorLayout);
            }
        }
    }
    else {
        if (sheet) {
            params.buttonHoverIndex = -1;
            params.buttonDownIndex = -1;
            params.isMouseDownReservedLocation = false;
        }
        sheet.repaint(hitInfo.cellRect);
    }
}
function repaintAllButtonsCanvases(cellButtons, sheet, row, col, wrapperElement, context, style, params, layout, editorLayout) {
    for (var i = 0; i < allButtonPositions.length; i++) {
        var buttonArea = buttonPositionToArea(allButtonPositions[i]), buttonCanvas = wrapperElement.querySelector('.' + buttonAreaToCanvasClassName(buttonArea)), buttons = getNeedPaintButtons(sheet, cellButtons, row, col, true, [buttonAreaToPosition(buttonArea)]);
        paintButtonsWhenEditing(buttonCanvas, buttons, buttonArea, context, style, params, layout, editorLayout);
    }
}

function resetCellButtonStyle(style) {
    var newStyle = style.clone(true);
    newStyle.hAlign = Core_1.HorizontalAlign.left;
    newStyle.vAlign = Core_1.VerticalAlign.center;
    newStyle.wordWrap = false;
    newStyle.isVerticalText = false;
    newStyle.shrinkToFit = false;
    newStyle.formatter = 'General';
    newStyle.textIndent = 0;
    return newStyle;
}
function triggerButtonClicked(sheet, row, col, sheetArea) {
    var parent = sheet.parent;
    if (parent) {
        parent._triggerButtonClicked(sheet, row, col, sheetArea);
    }
}
var CELLBUTTON = 'cellButtons';
Core_1.Worksheet._registerFeature(CELLBUTTON, {
    setHost: function () {
        var self = this;
        self.bind(Core_1.Events.EnterCell + '.' + CELLBUTTON, function (evt, args) {
            triggrActiveCellChanged(self, args.row, args.col, false, args.sheetArea);
        });
        self.bind(Core_1.Events.LeaveCell + '.' + CELLBUTTON, function (evt, args) {
            triggrActiveCellChanged(self, args.row, args.col, true, args.sheetArea);
        });
        self.bind(Core_1.Events.TopRowChanged + '.' + CELLBUTTON, function (evt, args) {
            triggrActiveCellChanged(self, args.row, args.col, true, args.sheetArea);
        });
    },

    dispose: function (argus) {
        var self = this;
        self.unbind(Core_1.Events.EnterCell + '.' + CELLBUTTON);
        self.unbind(Core_1.Events.LeaveCell + '.' + CELLBUTTON);
        self.unbind(Core_1.Events.TopRowChanged + '.' + CELLBUTTON);
    },
    processMouseDown: function (args) {
        var cellTypeHitInfo = args.hitInfo.cellTypeHitInfo;
        if (cellTypeHitInfo && cellTypeHitInfo.cellButtonHitInfo) {
            if (processMouseDown(cellTypeHitInfo)) {
                args.r = true;
            }
        }
    },
});
Core_1.Workbook._registerFeature(CELLBUTTON, {
    onCultureChanged: function () {
        getSR();
    }
});
function triggrActiveCellChanged(sheet, row, col, isLeave, sheetArea) {
    var style = sheet._getActualStyleImp(row, col, sheetArea);
    if (style && style.cellButtons && style.cellButtons.length > 0) {
        var selectionStatue = style.cellButtons.filter(function (s) { return s.visibility === 1; });
        if (selectionStatue.length > 0) {
            if (isLeave) {
                sheet._modelManager.do('setValueForKey', row, col, LEAVE_CELL, true, sheetArea);
            }
            try {
                var rect = sheet.getCellRect(row, col, sheetArea === 1 ? -1 : undefined, sheetArea === 2 ? -1 : undefined);
                sheet.repaint(rect);
            }
            finally {
                if (isLeave) {
                    sheet._modelManager.do('setValueForKey', row, col, LEAVE_CELL, keyword_undefined, sheetArea);
                }
            }
        }
    }
}
function getImageUrl(config, row, state) {
    var url = null;
    var kind = config.imageType;
    if (isNullOrUndefined(config.imageType)) {
        return null;
    }
    var enabled = isEnabled(config.enabled, row);
    var enable = enabled || isNullOrUndefined(enabled);
    var normalUrl;
    switch (kind) {
        case Core_1.ButtonImageType.dropdown:
            normalUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuMDcxOTQgNy45MzQwM0M2LjAzNDQyIDcuOTgyOTMgNS45NjA3MiA3Ljk4MjkzIDUuOTIzMiA3LjkzNDAzTDMuMDE5NTcgNC4xNTA1NUMyLjk3MjI0IDQuMDg4ODggMy4wMTYyMSAzLjk5OTcyIDMuMDkzOTQgMy45OTk3Mkg4LjkwMTE5QzguOTc4OTMgMy45OTk3MiA5LjAyMjg5IDQuMDg4ODggOC45NzU1NyA0LjE1MDU1TDYuMDcxOTQgNy45MzQwM1oiIGZpbGw9IiM3OTgwOUEiLz4KPC9zdmc+';
            if (enable) {
                url = normalUrl;
                if (state === CELL_BUTTON_HOVER_STATE) {
                    url = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuMDcxOTQgNy45MzQwM0M2LjAzNDQyIDcuOTgyOTMgNS45NjA3MiA3Ljk4MjkzIDUuOTIzMiA3LjkzNDAzTDMuMDE5NTcgNC4xNTA1NUMyLjk3MjI0IDQuMDg4ODggMy4wMTYyMSAzLjk5OTcyIDMuMDkzOTQgMy45OTk3Mkg4LjkwMTE5QzguOTc4OTMgMy45OTk3MiA5LjAyMjg5IDQuMDg4ODggOC45NzU1NyA0LjE1MDU1TDYuMDcxOTQgNy45MzQwM1oiIGZpbGw9IiMxMDNmZmEiLz4KPC9zdmc+';
                }
            }
            else {
                url = normalUrl;
            }
            break;
        case Core_1.ButtonImageType.calendar:
                normalUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkuODE4MTggMi45OTI3OUgyLjI1QzIuMDg0MzEgMi45OTI3OSAxLjk1IDMuMTI3MSAxLjk1IDMuMjkyNzlWOS4yMjQ2MUMxLjk1IDkuMzkwMjkgMi4wODQzMSA5LjUyNDYxIDIuMjUgOS41MjQ2MUg5LjgxODE4QzkuOTgzODcgOS41MjQ2MSAxMC4xMTgyIDkuMzkwMjkgMTAuMTE4MiA5LjIyNDYxVjMuMjkyNzlDMTAuMTE4MiAzLjEyNzEgOS45ODM4NyAyLjk5Mjc5IDkuODE4MTggMi45OTI3OVpNMi4yNSAyLjE2Nzc5QzEuNjI4NjggMi4xNjc3OSAxLjEyNSAyLjY3MTQ3IDEuMTI1IDMuMjkyNzlWOS4yMjQ2MUMxLjEyNSA5Ljg0NTkzIDEuNjI4NjggMTAuMzQ5NiAyLjI1IDEwLjM0OTZIOS44MTgxOEMxMC40Mzk1IDEwLjM0OTYgMTAuOTQzMiA5Ljg0NTkzIDEwLjk0MzIgOS4yMjQ2MVYzLjI5Mjc5QzEwLjk0MzIgMi42NzE0NyAxMC40Mzk1IDIuMTY3NzkgOS44MTgxOCAyLjE2Nzc5SDIuMjVaIiBmaWxsPSIjQzBDMENBIi8+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC41IDUuOTk5NjJMMS41IDUuOTk5NjJMMS41IDUuMTc0NjJMMTAuNSA1LjE3NDYyVjUuOTk5NjJaIiBmaWxsPSIjQzBDMENBIi8+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjExMTQ5IDMuODA0MTVDMy44MTc3NyAzLjgwNDE1IDMuNTc5NjcgMy41NjYwNSAzLjU3OTY3IDMuMjcyMzRWMS44ODE0M0MzLjU3OTY3IDEuNTg3NzEgMy44MTc3NyAxLjM0OTYxIDQuMTExNDkgMS4zNDk2MUM0LjQwNTIgMS4zNDk2MSA0LjY0MzMxIDEuNTg3NzEgNC42NDMzMSAxLjg4MTQzVjMuMjcyMzRDNC42NDMzMSAzLjU2NjA1IDQuNDA1MiAzLjgwNDE1IDQuMTExNDkgMy44MDQxNVoiIGZpbGw9IiNDMEMwQ0EiLz4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuOTU2ODIgMy44MDQxNUM3LjY2MzEgMy44MDQxNSA3LjQyNSAzLjU2NjA1IDcuNDI1IDMuMjcyMzRWMS44ODE0M0M3LjQyNSAxLjU4NzcxIDcuNjYzMSAxLjM0OTYxIDcuOTU2ODIgMS4zNDk2MUM4LjI1MDUzIDEuMzQ5NjEgOC40ODg2NCAxLjU4NzcxIDguNDg4NjQgMS44ODE0M1YzLjI3MjM0QzguNDg4NjQgMy41NjYwNSA4LjI1MDUzIDMuODA0MTUgNy45NTY4MiAzLjgwNDE1WiIgZmlsbD0iI0MwQzBDQSIvPgo8L3N2Zz4K';
                if (enable) {
                    url = normalUrl;
                    if (state === CELL_BUTTON_HOVER_STATE) {
                        url = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkuODE4MTggMi45OTI3OUgyLjI1QzIuMDg0MzEgMi45OTI3OSAxLjk1IDMuMTI3MSAxLjk1IDMuMjkyNzlWOS4yMjQ2MUMxLjk1IDkuMzkwMjkgMi4wODQzMSA5LjUyNDYxIDIuMjUgOS41MjQ2MUg5LjgxODE4QzkuOTgzODcgOS41MjQ2MSAxMC4xMTgyIDkuMzkwMjkgMTAuMTE4MiA5LjIyNDYxVjMuMjkyNzlDMTAuMTE4MiAzLjEyNzEgOS45ODM4NyAyLjk5Mjc5IDkuODE4MTggMi45OTI3OVpNMi4yNSAyLjE2Nzc5QzEuNjI4NjggMi4xNjc3OSAxLjEyNSAyLjY3MTQ3IDEuMTI1IDMuMjkyNzlWOS4yMjQ2MUMxLjEyNSA5Ljg0NTkzIDEuNjI4NjggMTAuMzQ5NiAyLjI1IDEwLjM0OTZIOS44MTgxOEMxMC40Mzk1IDEwLjM0OTYgMTAuOTQzMiA5Ljg0NTkzIDEwLjk0MzIgOS4yMjQ2MVYzLjI5Mjc5QzEwLjk0MzIgMi42NzE0NyAxMC40Mzk1IDIuMTY3NzkgOS44MTgxOCAyLjE2Nzc5SDIuMjVaIiBmaWxsPSIjMTAzZmZhIi8+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC41IDUuOTk5NjJMMS41IDUuOTk5NjJMMS41IDUuMTc0NjJMMTAuNSA1LjE3NDYyVjUuOTk5NjJaIiBmaWxsPSIjMTAzZmZhIi8+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjExMTQ5IDMuODA0MTVDMy44MTc3NyAzLjgwNDE1IDMuNTc5NjcgMy41NjYwNSAzLjU3OTY3IDMuMjcyMzRWMS44ODE0M0MzLjU3OTY3IDEuNTg3NzEgMy44MTc3NyAxLjM0OTYxIDQuMTExNDkgMS4zNDk2MUM0LjQwNTIgMS4zNDk2MSA0LjY0MzMxIDEuNTg3NzEgNC42NDMzMSAxLjg4MTQzVjMuMjcyMzRDNC42NDMzMSAzLjU2NjA1IDQuNDA1MiAzLjgwNDE1IDQuMTExNDkgMy44MDQxNVoiIGZpbGw9IiMxMDNmZmEiLz4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuOTU2ODIgMy44MDQxNUM3LjY2MzEgMy44MDQxNSA3LjQyNSAzLjU2NjA1IDcuNDI1IDMuMjcyMzRWMS44ODE0M0M3LjQyNSAxLjU4NzcxIDcuNjYzMSAxLjM0OTYxIDcuOTU2ODIgMS4zNDk2MUM4LjI1MDUzIDEuMzQ5NjEgOC40ODg2NCAxLjU4NzcxIDguNDg4NjQgMS44ODE0M1YzLjI3MjM0QzguNDg4NjQgMy41NjYwNSA4LjI1MDUzIDMuODA0MTUgNy45NTY4MiAzLjgwNDE1WiIgZmlsbD0iIzEwM2ZmYSIvPgo8L3N2Zz4K';
                    }
                }
                else {
                    url = normalUrl;
                }
                break;
        case Core_1.ButtonImageType.left:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+bGVmdDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJsZWZ0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBmaWxsPSIjNkU2RTZFIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHBvaW50cz0iNS4zNTE1MjcxMiA2LjUgOCA5LjI4ODYzMDM2IDcuMzI0MzU0MDMgMTAgNCA2LjUgNy4zMjQzNTQwMyAzIDggMy43MTEzNjk2NCI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+bGVmdDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJsZWZ0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBmaWxsPSIjQ0FDQUNBIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHBvaW50cz0iNS4zNTE1MjcxMiA2LjUgOCA5LjI4ODYzMDM2IDcuMzI0MzU0MDMgMTAgNCA2LjUgNy4zMjQzNTQwMyAzIDggMy43MTEzNjk2NCI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=';
            }
            break;
        case Core_1.ButtonImageType.right:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+cmlnaHQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0icmlnaHQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGZpbGw9IiM2RTZFNkUiIGZpbGwtcnVsZT0ibm9uemVybyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDYuNTAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTYuNTAwMDAwKSAiIHBvaW50cz0iNS4zNTE1MjcxMiA2LjUgOCA5LjI4ODYzMDM2IDcuMzI0MzU0MDMgMTAgNCA2LjUgNy4zMjQzNTQwMyAzIDggMy43MTEzNjk2NCI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+cmlnaHQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0icmlnaHQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGZpbGw9IiNDQUNBQ0EiIGZpbGwtcnVsZT0ibm9uemVybyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDYuNTAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTYuNTAwMDAwKSAiIHBvaW50cz0iNS4zNTE1MjcxMiA2LjUgOCA5LjI4ODYzMDM2IDcuMzI0MzU0MDMgMTAgNCA2LjUgNy4zMjQzNTQwMyAzIDggMy43MTEzNjk2NCI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=';
            }
            break;
        case Core_1.ButtonImageType.clear:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+Y2xlYXI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iY2xlYXIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGZpbGw9IiM2RTZFNkUiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI4Ljg3NTQ2MzkgMyAxMCA0LjEyNDUzNjEgNy42MjQ1MzYxIDYuNSAxMCA4Ljg3NTQ2MzkgOC44NzU0NjM5IDEwIDYuNSA3LjYyNDUzNjEgNC4xMjQ1MzYxIDEwIDMgOC44NzU0NjM5IDUuMzc1NDYzOSA2LjUgMyA0LjEyNDUzNjEgNC4xMjQ1MzYxIDMgNi41IDUuMzc1NDYzOSI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+Y2xlYXI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iY2xlYXIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGZpbGw9IiNDQUNBQ0EiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI4Ljg3NTQ2MzkgMyAxMCA0LjEyNDUzNjEgNy42MjQ1MzYxIDYuNSAxMCA4Ljg3NTQ2MzkgOC44NzU0NjM5IDEwIDYuNSA3LjYyNDUzNjEgNC4xMjQ1MzYxIDEwIDMgOC44NzU0NjM5IDUuMzc1NDYzOSA2LjUgMyA0LjEyNDUzNjEgNC4xMjQ1MzYxIDMgNi41IDUuMzc1NDYzOSI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=';
            }
            break;
        case 3:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+Y2FuY2VsPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9ImNhbmNlbCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTYsMSBDOC43NjE0MzE3MSwxIDExLDMuMjM4NTgxMzIgMTEsNiBDMTEsOC43NjE0MzE3MSA4Ljc2MTQzMTcxLDExLjAwMDAxMyA2LjAwMDAwNjUyLDExLjAwMDAxMyBDMy4yMzg1ODEzMiwxMS4wMDAwMTMgMSw4Ljc2MTQ0NDc0IDEsNiBDMSwzLjIzODU2ODI5IDMuMjM4NTgxMzIsMSA2LDEgWiBNOC41MTgwNTU5NiwzLjQ4MTk0NDA0IEM4LjI1MTg4NTYxLDMuMjE1NzczNyA3LjgyMDMzODIyLDMuMjE1NzczNyA3LjU1NDE2Nzg4LDMuNDgxOTQ0MDQgTDYsNS4wMzYxMTE5MiBMNC40NDU4MzIxMiwzLjQ4MTk0NDA0IEM0LjE3OTY2MTc4LDMuMjE1NzczNyAzLjc0ODExNDM5LDMuMjE1NzczNyAzLjQ4MTk0NDA0LDMuNDgxOTQ0MDQgQzMuMjE1NzczNywzLjc0ODExNDM5IDMuMjE1NzczNyw0LjE3OTY2MTc4IDMuNDgxOTQ0MDQsNC40NDU4MzIxMiBMNS4wMzYxMTE5Miw2IEwzLjQ4MTk0NDA0LDcuNTU0MTY3ODggQzMuMjE1NzczNyw3LjgyMDMzODIyIDMuMjE1NzczNyw4LjI1MTg4NTYxIDMuNDgxOTQ0MDQsOC41MTgwNTU5NiBDMy43NDgxMTQzOSw4Ljc4NDIyNjMgNC4xNzk2NjE3OCw4Ljc4NDIyNjMgNC40NDU4MzIxMiw4LjUxODA1NTk2IEw2LDYuOTYzODg4MDggTDcuNTU0MTY3ODgsOC41MTgwNTU5NiBDNy44MjAzMzgyMiw4Ljc4NDIyNjMgOC4yNTE4ODU2MSw4Ljc4NDIyNjMgOC41MTgwNTU5Niw4LjUxODA1NTk2IEM4Ljc4NDIyNjMsOC4yNTE4ODU2MSA4Ljc4NDIyNjMsNy44MjAzMzgyMiA4LjUxODA1NTk2LDcuNTU0MTY3ODggTDYuOTYzODg4MDgsNiBMOC41MTgwNTU5Niw0LjQ0NTgzMjEyIEM4Ljc4NDIyNjMsNC4xNzk2NjE3OCA4Ljc4NDIyNjMsMy43NDgxMTQzOSA4LjUxODA1NTk2LDMuNDgxOTQ0MDQgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzZFNkU2RSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+Y2FuY2VsPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9ImNhbmNlbCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTYsMSBDOC43NjE0MzE3MSwxIDExLDMuMjM4NTgxMzIgMTEsNiBDMTEsOC43NjE0MzE3MSA4Ljc2MTQzMTcxLDExLjAwMDAxMyA2LjAwMDAwNjUyLDExLjAwMDAxMyBDMy4yMzg1ODEzMiwxMS4wMDAwMTMgMSw4Ljc2MTQ0NDc0IDEsNiBDMSwzLjIzODU2ODI5IDMuMjM4NTgxMzIsMSA2LDEgWiBNOC41MTgwNTU5NiwzLjQ4MTk0NDA0IEM4LjI1MTg4NTYxLDMuMjE1NzczNyA3LjgyMDMzODIyLDMuMjE1NzczNyA3LjU1NDE2Nzg4LDMuNDgxOTQ0MDQgTDYsNS4wMzYxMTE5MiBMNC40NDU4MzIxMiwzLjQ4MTk0NDA0IEM0LjE3OTY2MTc4LDMuMjE1NzczNyAzLjc0ODExNDM5LDMuMjE1NzczNyAzLjQ4MTk0NDA0LDMuNDgxOTQ0MDQgQzMuMjE1NzczNywzLjc0ODExNDM5IDMuMjE1NzczNyw0LjE3OTY2MTc4IDMuNDgxOTQ0MDQsNC40NDU4MzIxMiBMNS4wMzYxMTE5Miw2IEwzLjQ4MTk0NDA0LDcuNTU0MTY3ODggQzMuMjE1NzczNyw3LjgyMDMzODIyIDMuMjE1NzczNyw4LjI1MTg4NTYxIDMuNDgxOTQ0MDQsOC41MTgwNTU5NiBDMy43NDgxMTQzOSw4Ljc4NDIyNjMgNC4xNzk2NjE3OCw4Ljc4NDIyNjMgNC40NDU4MzIxMiw4LjUxODA1NTk2IEw2LDYuOTYzODg4MDggTDcuNTU0MTY3ODgsOC41MTgwNTU5NiBDNy44MjAzMzgyMiw4Ljc4NDIyNjMgOC4yNTE4ODU2MSw4Ljc4NDIyNjMgOC41MTgwNTU5Niw4LjUxODA1NTk2IEM4Ljc4NDIyNjMsOC4yNTE4ODU2MSA4Ljc4NDIyNjMsNy44MjAzMzgyMiA4LjUxODA1NTk2LDcuNTU0MTY3ODggTDYuOTYzODg4MDgsNiBMOC41MTgwNTU5Niw0LjQ0NTgzMjEyIEM4Ljc4NDIyNjMsNC4xNzk2NjE3OCA4Ljc4NDIyNjMsMy43NDgxMTQzOSA4LjUxODA1NTk2LDMuNDgxOTQ0MDQgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0NBQ0FDQSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            break;
        case Core_1.ButtonImageType.ok:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+b2s8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0ib2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik01LjY3NjUyMjQsMTAgQzUuNjc2NTIyNCwxMCA2LjkxNzAzMjUzLDcuMzM0ODI5MDcgOC40MTk2ODA3OSw1LjMyNjE2ODAyIEM5LjU4MDA5Mzk2LDMuNzc2MzU0NDYgMTEsMi43MTg3NTQxMSAxMSwyLjcxODc1NDExIEwxMC41MTYxMDg0LDIgQzEwLjUxNjEwODQsMiA4Ljk2NzEyNTYsMi43MDIwNjg3NSA3LjU3NzY3MjIzLDQuMDUwMzc0NDYgQzYuMTY4MzYwMTEsNS40MTcyOTA3NiA1LjM0NDg4MTIxLDYuOTQ2NTczNSA1LjM0NDg4MTIxLDYuOTQ2NTczNSBMMy4yOTc0Mzg1Niw1LjAxMTcxMzA5IEwyLDYuNDYwMTI1OTcgTDUuNjc2NTE5ODEsOS45OTk5ODc0NyBMNS42NzY1MTk4MSw5Ljk5OTk4NzQ3IEw1LjY3NjUyMjQsMTAgWiIgaWQ9Ik9LIiBmaWxsPSIjNkU2RTZFIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+b2s8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0ib2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik01LjY3NjUyMjQsMTAgQzUuNjc2NTIyNCwxMCA2LjkxNzAzMjUzLDcuMzM0ODI5MDcgOC40MTk2ODA3OSw1LjMyNjE2ODAyIEM5LjU4MDA5Mzk2LDMuNzc2MzU0NDYgMTEsMi43MTg3NTQxMSAxMSwyLjcxODc1NDExIEwxMC41MTYxMDg0LDIgQzEwLjUxNjEwODQsMiA4Ljk2NzEyNTYsMi43MDIwNjg3NSA3LjU3NzY3MjIzLDQuMDUwMzc0NDYgQzYuMTY4MzYwMTEsNS40MTcyOTA3NiA1LjM0NDg4MTIxLDYuOTQ2NTczNSA1LjM0NDg4MTIxLDYuOTQ2NTczNSBMMy4yOTc0Mzg1Niw1LjAxMTcxMzA5IEwyLDYuNDYwMTI1OTcgTDUuNjc2NTE5ODEsOS45OTk5ODc0NyBMNS42NzY1MTk4MSw5Ljk5OTk4NzQ3IEw1LjY3NjUyMjQsMTAgWiIgaWQ9Ik9LIiBmaWxsPSIjQ0FDQUNBIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+';
            }
            break;
        case Core_1.ButtonImageType.plus:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+cGx1czwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJwbHVzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNSw1IEw1LDMgTDcsMyBMNyw1IEw5LDUgTDksNyBMNyw3IEw3LDkgTDUsOSBMNSw3IEwzLDcgTDMsNSBMNSw1IFoiIGZpbGw9IiM2RTZFNkUiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+cGx1czwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJwbHVzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNSw1IEw1LDMgTDcsMyBMNyw1IEw5LDUgTDksNyBMNyw3IEw3LDkgTDUsOSBMNSw3IEwzLDcgTDMsNSBMNSw1IFoiIGZpbGw9IiNDQUNBQ0EiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+';
            }
            break;
        case Core_1.ButtonImageType.minus:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+bWludXM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0ibWludXMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGZpbGw9IiM2RTZFNkUiIHg9IjMiIHk9IjUiIHdpZHRoPSI2IiBoZWlnaHQ9IjIiPjwvcmVjdD4KICAgIDwvZz4KPC9zdmc+';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+bWludXM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0ibWludXMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGZpbGw9IiNDQUNBQ0EiIHg9IjMiIHk9IjUiIHdpZHRoPSI2IiBoZWlnaHQ9IjIiPjwvcmVjdD4KICAgIDwvZz4KPC9zdmc+';
            }
            break;
        case Core_1.ButtonImageType.redo:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+cmVkbzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJyZWRvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNi43NDY0OTIwNSwzLjc5NjM1NTEyIEM4LjUzNjk1MDQyLDMuNzk2MzU1MTIgMTAsNS4xNzQ5NDI4NyAxMCw2Ljg5NzczMTcxIEMxMCw4LjYyMDUyMDU0IDguNTM2OTUwNDIsMTAgNi43NDY0OTIwNSwxMCBMNS4zMzQ4OTI0MiwxMCBDNS4xOTczODA3MywxMCA1LjExMTMxODk5LDkuOTAxOTExNjEgNS4xMTEzMTg5OSw5Ljc2OTkzODE0IEw1LjExMTMxODk5LDkuMjQ0NzE5MzkgQzUuMTExMzE4OTksOS4xMTM2Mzc2MyA1LjIxNDIxODksOC45OTg2MDY3IDUuMzUyNjY2MDQsOC45OTg2MDY3IEw2Ljc0NzQyNzUsOC45OTg2MDY3IEM3Ljk3MDA2NTQ4LDguOTk4NjA2NyA4Ljk1MTM1NjQxLDguMDYzMjAwMTMgOC45NTEzNTY0MSw2Ljg5NzczMTcxIEM4Ljk1MTM1NjQxLDUuNzMyMjYzMjggNy45NjkxMzAwMyw0Ljc5Nzc0ODQzIDYuNzQ2NDkyMDUsNC43OTc3NDg0MyBMNC4zNTM2MDE1LDQuNzk3NzQ4NDMgQzQuMzUzNjAxNSw0Ljc5Nzc0ODQzIDQuMjE2MDg5OCw0Ljc5Nzc0ODQzIDQuMTY0NjM5ODUsNC44MTM3OTkyNSBDNC4wMjcxMjgxNiw0Ljg3OTc4NTk5IDQuMDYxNzM5OTQsNC45Nzc4NzQzOCA0LjE4MTQ3ODAyLDUuMDkyOTA1MzEgTDUuMDI1MjU3MjUsNS44OTcyMzAxMiBDNS4xMjgxNTcxNiw1Ljk5NTMxODUxIDUuMTExMzE4OTksNi4xNDMzNDI4MSA1LjAwODQxOTA4LDYuMjQxNDMxMiBMNC42Mjk1NjAzNCw2LjYwMjU3NDgyIEM0LjUyNjY2MDQzLDYuNzAwNjYzMjEgNC40MDU5ODY5LDYuNzAwNjYzMjEgNC4zMDIxNTE1NCw2LjYxODYyNTY1IEwyLjA2NDU0NjMsNC40ODU2NDkgQzEuOTc4NDg0NTcsNC40MDM2MTE0NCAxLjk3ODQ4NDU3LDQuMjcyNTI5NjggMi4wNjQ1NDYzLDQuMTkwNDkyMTEgTDQuMjg1MzEzMzgsMi4wNzM1NjYyOSBDNC4zODgyMTMyOCwxLjk3NTQ3NzkgNC41NjAzMzY3NiwxLjk3NTQ3NzkgNC42NDYzOTg1LDIuMDczNTY2MjkgTDUuMDA3NDgzNjMsMi40MTc3NjczNyBDNS4xMTAzODM1NCwyLjUxNTg1NTc3IDUuMTEwMzgzNTQsMi42Nzk5MzA4OSA1LjAwNzQ4MzYzLDIuNzYxOTY4NDYgTDQuMTYzNzA0NCwzLjU2NjI5MzI2IEM0LjA2MDgwNDQ5LDMuNjY0MzgxNjUgNC4wNjA4MDQ0OSwzLjc3OTQxMjU4IDQuMjMyOTI3OTcsMy43Nzk0MTI1OCBMNC4zNTM2MDE1LDMuNzc5NDEyNTggTDYuNzQ2NDkyMDUsMy43OTYzNTUxMiBaIiBmaWxsPSIjNkU2RTZFIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA2LjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC02LjAwMDAwMCkgIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+cmVkbzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJyZWRvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNi43NDY0OTIwNSwzLjc5NjM1NTEyIEM4LjUzNjk1MDQyLDMuNzk2MzU1MTIgMTAsNS4xNzQ5NDI4NyAxMCw2Ljg5NzczMTcxIEMxMCw4LjYyMDUyMDU0IDguNTM2OTUwNDIsMTAgNi43NDY0OTIwNSwxMCBMNS4zMzQ4OTI0MiwxMCBDNS4xOTczODA3MywxMCA1LjExMTMxODk5LDkuOTAxOTExNjEgNS4xMTEzMTg5OSw5Ljc2OTkzODE0IEw1LjExMTMxODk5LDkuMjQ0NzE5MzkgQzUuMTExMzE4OTksOS4xMTM2Mzc2MyA1LjIxNDIxODksOC45OTg2MDY3IDUuMzUyNjY2MDQsOC45OTg2MDY3IEw2Ljc0NzQyNzUsOC45OTg2MDY3IEM3Ljk3MDA2NTQ4LDguOTk4NjA2NyA4Ljk1MTM1NjQxLDguMDYzMjAwMTMgOC45NTEzNTY0MSw2Ljg5NzczMTcxIEM4Ljk1MTM1NjQxLDUuNzMyMjYzMjggNy45NjkxMzAwMyw0Ljc5Nzc0ODQzIDYuNzQ2NDkyMDUsNC43OTc3NDg0MyBMNC4zNTM2MDE1LDQuNzk3NzQ4NDMgQzQuMzUzNjAxNSw0Ljc5Nzc0ODQzIDQuMjE2MDg5OCw0Ljc5Nzc0ODQzIDQuMTY0NjM5ODUsNC44MTM3OTkyNSBDNC4wMjcxMjgxNiw0Ljg3OTc4NTk5IDQuMDYxNzM5OTQsNC45Nzc4NzQzOCA0LjE4MTQ3ODAyLDUuMDkyOTA1MzEgTDUuMDI1MjU3MjUsNS44OTcyMzAxMiBDNS4xMjgxNTcxNiw1Ljk5NTMxODUxIDUuMTExMzE4OTksNi4xNDMzNDI4MSA1LjAwODQxOTA4LDYuMjQxNDMxMiBMNC42Mjk1NjAzNCw2LjYwMjU3NDgyIEM0LjUyNjY2MDQzLDYuNzAwNjYzMjEgNC40MDU5ODY5LDYuNzAwNjYzMjEgNC4zMDIxNTE1NCw2LjYxODYyNTY1IEwyLjA2NDU0NjMsNC40ODU2NDkgQzEuOTc4NDg0NTcsNC40MDM2MTE0NCAxLjk3ODQ4NDU3LDQuMjcyNTI5NjggMi4wNjQ1NDYzLDQuMTkwNDkyMTEgTDQuMjg1MzEzMzgsMi4wNzM1NjYyOSBDNC4zODgyMTMyOCwxLjk3NTQ3NzkgNC41NjAzMzY3NiwxLjk3NTQ3NzkgNC42NDYzOTg1LDIuMDczNTY2MjkgTDUuMDA3NDgzNjMsMi40MTc3NjczNyBDNS4xMTAzODM1NCwyLjUxNTg1NTc3IDUuMTEwMzgzNTQsMi42Nzk5MzA4OSA1LjAwNzQ4MzYzLDIuNzYxOTY4NDYgTDQuMTYzNzA0NCwzLjU2NjI5MzI2IEM0LjA2MDgwNDQ5LDMuNjY0MzgxNjUgNC4wNjA4MDQ0OSwzLjc3OTQxMjU4IDQuMjMyOTI3OTcsMy43Nzk0MTI1OCBMNC4zNTM2MDE1LDMuNzc5NDEyNTggTDYuNzQ2NDkyMDUsMy43OTYzNTUxMiBaIiBmaWxsPSIjQ0FDQUNBIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA2LjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC02LjAwMDAwMCkgIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            break;
        case Core_1.ButtonImageType.undo:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+dW5kbzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJ1bmRvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNi43NDY0OTIwNSwzLjc5NjM1NTEyIEM4LjUzNjk1MDQyLDMuNzk2MzU1MTIgMTAsNS4xNzQ5NDI4NyAxMCw2Ljg5NzczMTcxIEMxMCw4LjYyMDUyMDU0IDguNTM2OTUwNDIsMTAgNi43NDY0OTIwNSwxMCBMNS4zMzQ4OTI0MiwxMCBDNS4xOTczODA3MywxMCA1LjExMTMxODk5LDkuOTAxOTExNjEgNS4xMTEzMTg5OSw5Ljc2OTkzODE0IEw1LjExMTMxODk5LDkuMjQ0NzE5MzkgQzUuMTExMzE4OTksOS4xMTM2Mzc2MyA1LjIxNDIxODksOC45OTg2MDY3IDUuMzUyNjY2MDQsOC45OTg2MDY3IEw2Ljc0NzQyNzUsOC45OTg2MDY3IEM3Ljk3MDA2NTQ4LDguOTk4NjA2NyA4Ljk1MTM1NjQxLDguMDYzMjAwMTMgOC45NTEzNTY0MSw2Ljg5NzczMTcxIEM4Ljk1MTM1NjQxLDUuNzMyMjYzMjggNy45NjkxMzAwMyw0Ljc5Nzc0ODQzIDYuNzQ2NDkyMDUsNC43OTc3NDg0MyBMNC4zNTM2MDE1LDQuNzk3NzQ4NDMgQzQuMzUzNjAxNSw0Ljc5Nzc0ODQzIDQuMjE2MDg5OCw0Ljc5Nzc0ODQzIDQuMTY0NjM5ODUsNC44MTM3OTkyNSBDNC4wMjcxMjgxNiw0Ljg3OTc4NTk5IDQuMDYxNzM5OTQsNC45Nzc4NzQzOCA0LjE4MTQ3ODAyLDUuMDkyOTA1MzEgTDUuMDI1MjU3MjUsNS44OTcyMzAxMiBDNS4xMjgxNTcxNiw1Ljk5NTMxODUxIDUuMTExMzE4OTksNi4xNDMzNDI4MSA1LjAwODQxOTA4LDYuMjQxNDMxMiBMNC42Mjk1NjAzNCw2LjYwMjU3NDgyIEM0LjUyNjY2MDQzLDYuNzAwNjYzMjEgNC40MDU5ODY5LDYuNzAwNjYzMjEgNC4zMDIxNTE1NCw2LjYxODYyNTY1IEwyLjA2NDU0NjMsNC40ODU2NDkgQzEuOTc4NDg0NTcsNC40MDM2MTE0NCAxLjk3ODQ4NDU3LDQuMjcyNTI5NjggMi4wNjQ1NDYzLDQuMTkwNDkyMTEgTDQuMjg1MzEzMzgsMi4wNzM1NjYyOSBDNC4zODgyMTMyOCwxLjk3NTQ3NzkgNC41NjAzMzY3NiwxLjk3NTQ3NzkgNC42NDYzOTg1LDIuMDczNTY2MjkgTDUuMDA3NDgzNjMsMi40MTc3NjczNyBDNS4xMTAzODM1NCwyLjUxNTg1NTc3IDUuMTEwMzgzNTQsMi42Nzk5MzA4OSA1LjAwNzQ4MzYzLDIuNzYxOTY4NDYgTDQuMTYzNzA0NCwzLjU2NjI5MzI2IEM0LjA2MDgwNDQ5LDMuNjY0MzgxNjUgNC4wNjA4MDQ0OSwzLjc3OTQxMjU4IDQuMjMyOTI3OTcsMy43Nzk0MTI1OCBMNC4zNTM2MDE1LDMuNzc5NDEyNTggTDYuNzQ2NDkyMDUsMy43OTYzNTUxMiBaIiBmaWxsPSIjNkU2RTZFIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+dW5kbzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJ1bmRvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNi43NDY0OTIwNSwzLjc5NjM1NTEyIEM4LjUzNjk1MDQyLDMuNzk2MzU1MTIgMTAsNS4xNzQ5NDI4NyAxMCw2Ljg5NzczMTcxIEMxMCw4LjYyMDUyMDU0IDguNTM2OTUwNDIsMTAgNi43NDY0OTIwNSwxMCBMNS4zMzQ4OTI0MiwxMCBDNS4xOTczODA3MywxMCA1LjExMTMxODk5LDkuOTAxOTExNjEgNS4xMTEzMTg5OSw5Ljc2OTkzODE0IEw1LjExMTMxODk5LDkuMjQ0NzE5MzkgQzUuMTExMzE4OTksOS4xMTM2Mzc2MyA1LjIxNDIxODksOC45OTg2MDY3IDUuMzUyNjY2MDQsOC45OTg2MDY3IEw2Ljc0NzQyNzUsOC45OTg2MDY3IEM3Ljk3MDA2NTQ4LDguOTk4NjA2NyA4Ljk1MTM1NjQxLDguMDYzMjAwMTMgOC45NTEzNTY0MSw2Ljg5NzczMTcxIEM4Ljk1MTM1NjQxLDUuNzMyMjYzMjggNy45NjkxMzAwMyw0Ljc5Nzc0ODQzIDYuNzQ2NDkyMDUsNC43OTc3NDg0MyBMNC4zNTM2MDE1LDQuNzk3NzQ4NDMgQzQuMzUzNjAxNSw0Ljc5Nzc0ODQzIDQuMjE2MDg5OCw0Ljc5Nzc0ODQzIDQuMTY0NjM5ODUsNC44MTM3OTkyNSBDNC4wMjcxMjgxNiw0Ljg3OTc4NTk5IDQuMDYxNzM5OTQsNC45Nzc4NzQzOCA0LjE4MTQ3ODAyLDUuMDkyOTA1MzEgTDUuMDI1MjU3MjUsNS44OTcyMzAxMiBDNS4xMjgxNTcxNiw1Ljk5NTMxODUxIDUuMTExMzE4OTksNi4xNDMzNDI4MSA1LjAwODQxOTA4LDYuMjQxNDMxMiBMNC42Mjk1NjAzNCw2LjYwMjU3NDgyIEM0LjUyNjY2MDQzLDYuNzAwNjYzMjEgNC40MDU5ODY5LDYuNzAwNjYzMjEgNC4zMDIxNTE1NCw2LjYxODYyNTY1IEwyLjA2NDU0NjMsNC40ODU2NDkgQzEuOTc4NDg0NTcsNC40MDM2MTE0NCAxLjk3ODQ4NDU3LDQuMjcyNTI5NjggMi4wNjQ1NDYzLDQuMTkwNDkyMTEgTDQuMjg1MzEzMzgsMi4wNzM1NjYyOSBDNC4zODgyMTMyOCwxLjk3NTQ3NzkgNC41NjAzMzY3NiwxLjk3NTQ3NzkgNC42NDYzOTg1LDIuMDczNTY2MjkgTDUuMDA3NDgzNjMsMi40MTc3NjczNyBDNS4xMTAzODM1NCwyLjUxNTg1NTc3IDUuMTEwMzgzNTQsMi42Nzk5MzA4OSA1LjAwNzQ4MzYzLDIuNzYxOTY4NDYgTDQuMTYzNzA0NCwzLjU2NjI5MzI2IEM0LjA2MDgwNDQ5LDMuNjY0MzgxNjUgNC4wNjA4MDQ0OSwzLjc3OTQxMjU4IDQuMjMyOTI3OTcsMy43Nzk0MTI1OCBMNC4zNTM2MDE1LDMuNzc5NDEyNTggTDYuNzQ2NDkyMDUsMy43OTYzNTUxMiBaIiBmaWxsPSIjQ0FDQUNBIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+';
            }
            break;
        case Core_1.ButtonImageType.search:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+c2VhcmNoPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9InNlYXJjaCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTcuNDQ1MzczOTYsNi43MzgyNjcxOCBMMTAuMDM1NTMzOSw5LjMyODQyNzEyIEw5LjMyODQyNzEyLDEwLjAzNTUzMzkgTDYuNzM4MjY3MTgsNy40NDUzNzM5NiBDNi4yNDc4NTc3NCw3Ljc5NDYwNDUyIDUuNjQ3OTE1MjIsOCA1LDggQzMuMzQzMTQ1NzUsOCAyLDYuNjU2ODU0MjUgMiw1IEMyLDMuMzQzMTQ1NzUgMy4zNDMxNDU3NSwyIDUsMiBDNi42NTY4NTQyNSwyIDgsMy4zNDMxNDU3NSA4LDUgQzgsNS42NDc5MTUyMiA3Ljc5NDYwNDUyLDYuMjQ3ODU3NzQgNy40NDUzNzM5Niw2LjczODI2NzE4IFogTTUuMDAwNTI2MTYsMyBDMy44OTYyNTEzMSwzIDMuMDAxMDUyNDgsMy44OTU0MzQ1NiAzLDUgQzMuMDAxMTYyODYsNi4xMDM2NzQ4NCAzLjg5NTAyNzk5LDYuOTk4MjUxNzQgNS4wMDA1MjYxNiw3IEM2LjEwNDgwMTAxLDcgNi45OTk5OTk4Myw2LjEwNDU2NTQ0IDcsNSBDNywzLjg5NTQzNDU2IDYuMTA0ODAxMDEsMy4wMDAwMDAxNyA1LjAwMDUyNjE2LDMgWiIgZmlsbD0iIzZFNkU2RSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+c2VhcmNoPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9InNlYXJjaCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTcuNDQ1MzczOTYsNi43MzgyNjcxOCBMMTAuMDM1NTMzOSw5LjMyODQyNzEyIEw5LjMyODQyNzEyLDEwLjAzNTUzMzkgTDYuNzM4MjY3MTgsNy40NDUzNzM5NiBDNi4yNDc4NTc3NCw3Ljc5NDYwNDUyIDUuNjQ3OTE1MjIsOCA1LDggQzMuMzQzMTQ1NzUsOCAyLDYuNjU2ODU0MjUgMiw1IEMyLDMuMzQzMTQ1NzUgMy4zNDMxNDU3NSwyIDUsMiBDNi42NTY4NTQyNSwyIDgsMy4zNDMxNDU3NSA4LDUgQzgsNS42NDc5MTUyMiA3Ljc5NDYwNDUyLDYuMjQ3ODU3NzQgNy40NDUzNzM5Niw2LjczODI2NzE4IFogTTUuMDAwNTI2MTYsMyBDMy44OTYyNTEzMSwzIDMuMDAxMDUyNDgsMy44OTU0MzQ1NiAzLDUgQzMuMDAxMTYyODYsNi4xMDM2NzQ4NCAzLjg5NTAyNzk5LDYuOTk4MjUxNzQgNS4wMDA1MjYxNiw3IEM2LjEwNDgwMTAxLDcgNi45OTk5OTk4Myw2LjEwNDU2NTQ0IDcsNSBDNywzLjg5NTQzNDU2IDYuMTA0ODAxMDEsMy4wMDAwMDAxNyA1LjAwMDUyNjE2LDMgWiIgZmlsbD0iI0NBQ0FDQSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            break;
        case Core_1.ButtonImageType.separator:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+c2VwYXJhdG9yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9InNlcGFyYXRvciIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTExLDQgTDEwLDQgTDEwLDggTDExLDggTDExLDkgTDksOSBMOSwzIEwxMSwzIEwxMSw0IFogTTIsNCBMMiwzIEw0LDMgTDQsOSBMMiw5IEwyLDggTDMsOCBMMyw0IEwyLDQgWiBNNiwxIEw3LDEgTDcsMTEgTDYsMTEgTDYsMSBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjNkU2RTZFIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+c2VwYXJhdG9yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9InNlcGFyYXRvciIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTExLDQgTDEwLDQgTDEwLDggTDExLDggTDExLDkgTDksOSBMOSwzIEwxMSwzIEwxMSw0IFogTTIsNCBMMiwzIEw0LDMgTDQsOSBMMiw5IEwyLDggTDMsOCBMMyw0IEwyLDQgWiBNNiwxIEw3LDEgTDcsMTEgTDYsMTEgTDYsMSBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjQ0FDQUNBIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            break;
        case Core_1.ButtonImageType.spinLeft:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+c3BpbmxlZnQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0ic3BpbmxlZnQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGZpbGw9IiM2RTZFNkUiIHBvaW50cz0iOCAzIDQgNi41IDggMTAiPjwvcG9seWdvbj4KICAgIDwvZz4KPC9zdmc+';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+c3BpbmxlZnQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0ic3BpbmxlZnQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGZpbGw9IiNDQUNBQ0EiIHBvaW50cz0iOCAzIDQgNi41IDggMTAiPjwvcG9seWdvbj4KICAgIDwvZz4KPC9zdmc+';
            }
            break;
        case Core_1.ButtonImageType.spinRight:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+c3BpbnJpZ2h0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9InNwaW5yaWdodCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBvbHlnb24gZmlsbD0iIzZFNkU2RSIgcG9pbnRzPSI0IDMgOCA2LjUgNCAxMCI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+c3BpbnJpZ2h0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9InNwaW5yaWdodCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBvbHlnb24gZmlsbD0iI0NBQ0FDQSIgcG9pbnRzPSI0IDMgOCA2LjUgNCAxMCI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=';
            }
            break;
        case Core_1.ButtonImageType.ellipsis:
            if (enable) {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+ZWxsaXBzaXM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iZWxsaXBzaXMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0yLDcgQzEuNDQ3NzE1MjUsNyAxLDYuNTUyMjg0NzUgMSw2IEMxLDUuNDQ3NzE1MjUgMS40NDc3MTUyNSw1IDIsNSBDMi41NTIyODQ3NSw1IDMsNS40NDc3MTUyNSAzLDYgQzMsNi41NTIyODQ3NSAyLjU1MjI4NDc1LDcgMiw3IFogTTYsNyBDNS40NDc3MTUyNSw3IDUsNi41NTIyODQ3NSA1LDYgQzUsNS40NDc3MTUyNSA1LjQ0NzcxNTI1LDUgNiw1IEM2LjU1MjI4NDc1LDUgNyw1LjQ0NzcxNTI1IDcsNiBDNyw2LjU1MjI4NDc1IDYuNTUyMjg0NzUsNyA2LDcgWiBNMTAsNyBDOS40NDc3MTUyNSw3IDksNi41NTIyODQ3NSA5LDYgQzksNS40NDc3MTUyNSA5LjQ0NzcxNTI1LDUgMTAsNSBDMTAuNTUyMjg0Nyw1IDExLDUuNDQ3NzE1MjUgMTEsNiBDMTEsNi41NTIyODQ3NSAxMC41NTIyODQ3LDcgMTAsNyBaIiBmaWxsPSIjNkU2RTZFIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            else {
                url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1ICg3ODA3NikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+ZWxsaXBzaXM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iZWxsaXBzaXMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0yLDcgQzEuNDQ3NzE1MjUsNyAxLDYuNTUyMjg0NzUgMSw2IEMxLDUuNDQ3NzE1MjUgMS40NDc3MTUyNSw1IDIsNSBDMi41NTIyODQ3NSw1IDMsNS40NDc3MTUyNSAzLDYgQzMsNi41NTIyODQ3NSAyLjU1MjI4NDc1LDcgMiw3IFogTTYsNyBDNS40NDc3MTUyNSw3IDUsNi41NTIyODQ3NSA1LDYgQzUsNS40NDc3MTUyNSA1LjQ0NzcxNTI1LDUgNiw1IEM2LjU1MjI4NDc1LDUgNyw1LjQ0NzcxNTI1IDcsNiBDNyw2LjU1MjI4NDc1IDYuNTUyMjg0NzUsNyA2LDcgWiBNMTAsNyBDOS40NDc3MTUyNSw3IDksNi41NTIyODQ3NSA5LDYgQzksNS40NDc3MTUyNSA5LjQ0NzcxNTI1LDUgMTAsNSBDMTAuNTUyMjg0Nyw1IDExLDUuNDQ3NzE1MjUgMTEsNiBDMTEsNi41NTIyODQ3NSAxMC41NTIyODQ3LDcgMTAsNyBaIiBmaWxsPSIjQ0FDQUNBIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';
            }
            break;
        case Core_1.ButtonImageType.expand:
            if (enable) {
                url = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJjb2xsYXBzZSIgd2lkdGg9IjEycHgiIGhlaWdodD0iMTJweCI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEycHgiIGhlaWdodD0iMTJweCIgcng9IjRweCIgcnk9IjRweCIgc3R5bGU9InN0cm9rZTogIzZlNmU2ZTsgc3Ryb2tlLXdpZHRoOjFweDsgZmlsbDogbm9uZTsiLz4KICAgICAgICA8bGluZSB4MT0iMnB4IiB5MT0iNnB4IiB4Mj0iMTBweCIgeTI9IjZweCIgc3R5bGU9InN0cm9rZTogIzZlNmU2ZTsgc3Ryb2tlLXdpZHRoOjFweDsiLz4KICAgIDwvc3ZnPg==';
            }
            else {
                url = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJjb2xsYXBzZSIgd2lkdGg9IjEycHgiIGhlaWdodD0iMTJweCI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEycHgiIGhlaWdodD0iMTJweCIgcng9IjRweCIgcnk9IjRweCIgc3R5bGU9InN0cm9rZTogI2NhY2FjYTsgc3Ryb2tlLXdpZHRoOjFweDsgZmlsbDogbm9uZTsiLz4KICAgICAgICA8bGluZSB4MT0iMnB4IiB5MT0iNnB4IiB4Mj0iMTBweCIgeTI9IjZweCIgc3R5bGU9InN0cm9rZTogI2NhY2FjYTsgc3Ryb2tlLXdpZHRoOjFweDsiLz4KICAgIDwvc3ZnPg==';
            }
            break;
        case Core_1.ButtonImageType.collapse:
            if (enable) {
                url = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJleHBhbmQiIHdpZHRoPSIxMnB4IiBoZWlnaHQ9IjEycHgiPgogICAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMnB4IiBoZWlnaHQ9IjEycHgiIHJ4PSI0cHgiIHJ5PSI0cHgiIHN0eWxlPSJzdHJva2U6ICM2ZTZlNmU7IHN0cm9rZS13aWR0aDoxcHg7IGZpbGw6IG5vbmU7Ii8+CiAgICAgICAgPGxpbmUgeDE9IjJweCIgeTE9IjZweCIgeDI9IjEwcHgiIHkyPSI2cHgiIHN0eWxlPSJzdHJva2U6ICM2ZTZlNmU7IHN0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICAgICAgPGxpbmUgeDE9IjZweCIgeTE9IjJweCIgeDI9IjZweCIgeTI9IjEwcHgiIHN0eWxlPSJzdHJva2U6ICM2ZTZlNmU7IHN0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICA8L3N2Zz4=';
            }
            else {
                url = 'data:image/svg+xml;PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJleHBhbmQiIHdpZHRoPSIxMnB4IiBoZWlnaHQ9IjEycHgiPgogICAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMnB4IiBoZWlnaHQ9IjEycHgiIHJ4PSI0cHgiIHJ5PSI0cHgiIHN0eWxlPSJzdHJva2U6ICNjYWNhY2E7IHN0cm9rZS13aWR0aDoxcHg7IGZpbGw6IG5vbmU7Ii8+CiAgICAgICAgPGxpbmUgeDE9IjJweCIgeTE9IjZweCIgeDI9IjEwcHgiIHkyPSI2cHgiIHN0eWxlPSJzdHJva2U6ICNjYWNhY2E7IHN0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICAgICAgPGxpbmUgeDE9IjZweCIgeTE9IjJweCIgeDI9IjZweCIgeTI9IjEwcHgiIHN0eWxlPSJzdHJva2U6ICNjYWNhY2E7IHN0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICA8L3N2Zz4=';
            }
            break;
        case Core_1.ButtonImageType.custom:
            url = config.imageSrc;
            if (state === CELL_BUTTON_HOVER_STATE) {
                url = config.imageSrc3 || url;
            };
            break;
        default:
            break;
    }
    return url;
}
function isEnabled(enabled, row) {
    if (typeof enabled === 'function') {
        return enabled(row);
    }
    return enabled;
}
/***/ }),

/***/ './dist/plugins/celltype/celltypes.entry.js':
/*!**************************************************!*\
  !*** ./dist/plugins/celltype/celltypes.entry.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });


var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Base = Core_1.CellTypes.Base, Context = Core_1.CellTypes.Context, EditorType = Core_1.CellTypes.EditorType, _typeDict = Core_1.CellTypes._typeDict;
exports.Base = Base;
exports.Context = Context;
exports.EditorType = EditorType;
exports._typeDict = _typeDict;

exports._HeaderCellTypes = Core_1.CellTypes._HeaderCellTypes;

exports._TextCellTypes = Core_1.CellTypes._TextCellTypes;
Object.defineProperty(exports, 'Corner', {
    set: function (value) {
        if (value === exports._HeaderCellTypes.Corner) {
            return;
        }

        exports._HeaderCellTypes.Corner = value;
    },
    get: function () {
        return exports._HeaderCellTypes.Corner;
    }
});
Object.defineProperty(exports, 'ColumnHeader', {
    set: function (value) {
        if (value === exports._HeaderCellTypes.ColumnHeader) {
            return;
        }

        exports._HeaderCellTypes.ColumnHeader = value;
    },
    get: function () {
        return exports._HeaderCellTypes.ColumnHeader;
    }
});
Object.defineProperty(exports, 'RowHeader', {
    set: function (value) {
        if (value === exports._HeaderCellTypes.RowHeader) {
            return;
        }

        exports._HeaderCellTypes.RowHeader = value;
    },
    get: function () {
        return exports._HeaderCellTypes.RowHeader;
    }
});
Object.defineProperty(exports, 'Text', {
    set: function (value) {
        if (value === exports._TextCellTypes.Text) {
            return;
        }

        exports._TextCellTypes.Text = value;
    },
    get: function () {
        return exports._TextCellTypes.Text;
    }
});
__export(__webpack_require__(/*! ./checkboxcelltype */ './dist/plugins/celltype/checkboxcelltype.js'));
__export(__webpack_require__(/*! ./buttoncelltype */ './dist/plugins/celltype/buttoncelltype.js'));
__export(__webpack_require__(/*! ./hyperlinkcelltype */ './dist/plugins/celltype/hyperlinkcelltype.js'));
__export(__webpack_require__(/*! ./comboboxcelltype */ './dist/plugins/celltype/comboboxcelltype.js'));
__webpack_require__(/*! ./cellbuttons */ './dist/plugins/celltype/cellbuttons.js');
__export(__webpack_require__(/*! ./editor/colorpicker */ './dist/plugins/celltype/editor/colorpicker.js'));
__export(__webpack_require__(/*! ./editor/timepicker */ './dist/plugins/celltype/editor/timepicker.js'));
__export(__webpack_require__(/*! ./editor/calendar */ './dist/plugins/celltype/editor/calendar.js'));
__export(__webpack_require__(/*! ./editor/calculator */ './dist/plugins/celltype/editor/calculator.js'));
__export(__webpack_require__(/*! ./editor/monthPicker */ './dist/plugins/celltype/editor/monthPicker.js'));
__export(__webpack_require__(/*! ./editor/listControl */ './dist/plugins/celltype/editor/listControl.js'));
__export(__webpack_require__(/*! ./dropdown-action */ './dist/plugins/celltype/dropdown-action.js'));
__export(__webpack_require__(/*! ./radiochecklistcelltype */ './dist/plugins/celltype/radiochecklistcelltype.js'));
__export(__webpack_require__(/*! ./celltypes.ns */ './dist/plugins/celltype/celltypes.ns.js'));
__export(__webpack_require__(/*! ./rangecelltype */ './dist/plugins/celltype/rangecelltype.js'));
/***/ }),

/***/ './dist/plugins/celltype/celltypes.ns.js':
/*!***********************************************!*\
  !*** ./dist/plugins/celltype/celltypes.ns.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var en = __webpack_require__(/*! ./celltypes.res.en */ './dist/plugins/celltype/celltypes.res.en.js');
exports.SR = {
    en: en
};
/***/ }),

/***/ './dist/plugins/celltype/celltypes.res.en.js':
/*!***************************************************!*\
  !*** ./dist/plugins/celltype/celltypes.res.en.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
exports.OK = 'OK';
exports.Cancel = 'Cancel';
exports.Calendar_ShortWeeks_1 = 'MON';
exports.Calendar_ShortWeeks_2 = 'TUE';
exports.Calendar_ShortWeeks_3 = 'WED';
exports.Calendar_ShortWeeks_4 = 'THU';
exports.Calendar_ShortWeeks_5 = 'FRI';
exports.Calendar_ShortWeeks_6 = 'SAT';
exports.Calendar_ShortWeeks_7 = 'SUN';
exports.Calendar_Weeks_1 = 'Monday';
exports.Calendar_Weeks_2 = 'Tuesday';
exports.Calendar_Weeks_3 = 'Wednesday';
exports.Calendar_Weeks_4 = 'Thursday';
exports.Calendar_Weeks_5 = 'Friday';
exports.Calendar_Weeks_6 = 'Saturday';
exports.Calendar_Weeks_7 = 'Sunday';
exports.Calendar_ShortMonths_1 = 'JAN';
exports.Calendar_ShortMonths_2 = 'FEB';
exports.Calendar_ShortMonths_3 = 'MAR';
exports.Calendar_ShortMonths_4 = 'APR';
exports.Calendar_ShortMonths_5 = 'MAY';
exports.Calendar_ShortMonths_6 = 'JUN';
exports.Calendar_ShortMonths_7 = 'JUL';
exports.Calendar_ShortMonths_8 = 'AUG';
exports.Calendar_ShortMonths_9 = 'SEP';
exports.Calendar_ShortMonths_10 = 'OCT';
exports.Calendar_ShortMonths_11 = 'NOV';
exports.Calendar_ShortMonths_12 = 'DEC';
exports.Calendar_Months_1 = 'JANUARY';
exports.Calendar_Months_2 = 'FEBRUARY';
exports.Calendar_Months_3 = 'MARCH';
exports.Calendar_Months_4 = 'APRIL';
exports.Calendar_Months_5 = 'MAY';
exports.Calendar_Months_6 = 'JUNE';
exports.Calendar_Months_7 = 'JULY';
exports.Calendar_Months_8 = 'AUGUST';
exports.Calendar_Months_9 = 'SEPTEMBER';
exports.Calendar_Months_10 = 'OCTOBER';
exports.Calendar_Months_11 = 'NOVEMBER';
exports.Calendar_Months_12 = 'DECEMBER';
exports.Calendar_Time_AM = 'AM';
exports.Calendar_Time_PM = 'PM';
exports.Calendar_EraName_1 = 'M';
exports.Calendar_EraName_2 = 'T';
exports.Calendar_EraName_3 = 'S';
exports.Calendar_EraName_4 = 'H';
exports.Calendar_FirstYear = '1';
exports.Calendar_Today = 'Today';
exports.Calendar_LastMonth = 'Go to previous month';
exports.Calendar_NextMonth = 'Go to next month';
exports.Calendar_LastYear = 'Go to previous year';
exports.Calendar_NextYear = 'Go to next year';
exports.Calendar_LastTenYear = 'Go to previous ten years';
exports.Calendar_NextTenYear = 'Go to next ten years';
exports.Quarter_Format_1 = 'Q1';
exports.Quarter_Format_2 = 'Q2';
exports.Quarter_Format_3 = 'Q3';
exports.Quarter_Format_4 = 'Q4';
exports.ThemeColor = 'Theme Colors';
exports.StandardColor = 'Standard Colors';
exports.Calculator_DivideByZeroInfo = 'Cannot divide by zero.';
exports.Calculator_InvalidInputInfo = 'Invalid Input.';
exports.Calculator_SqrtParameterException = 'Invalid input for function.';
exports.Calculator_OverFlowInfo = 'Arithmetic operation resulted in an overflow.';
exports.MultiColumn_InvalidDataSource = 'Invalid data source. The formula should return an array.';
/***/ }),

/***/ './dist/plugins/celltype/checkboxcelltype.js':
/*!***************************************************!*\
  !*** ./dist/plugins/celltype/checkboxcelltype.js ***!
  \***************************************************/
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
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var _createElement = Core_1._util._createElement;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var getFontHeight = Core_1._util._getFontHeight;
var cancelDefault = Core_1._util._cancelDefault;
var CellTypeContext = Core_1.CellTypes.Context, BaseCellType = Core_1.CellTypes.Base;
var $ = Core_1.GC$, $_each = $.each;
var adjustFontWithFallback = Core_1._util._adjustFontWithFallback;
var keyword_null = null, keyword_undefined = void 0, Math_max = Math.max, convertToInt = parseInt;
var cssPosition = 'position', cssAbsolute = 'absolute', cssFont = 'font', cssLeft = 'left', cssRight = 'right', cssTop = 'top', cssAlphabetic = 'alphabetic', _gcEditingInput = '.gcEditingInput', cssBackgroundColor = 'background-color', cssWhite = 'white', cssGreen = 'green', STR_DIV = 'div';
var defaultFont = 'normal 11pt calibri', cssWidth = 'width', cssHeight = 'height';
var IS_FIRST_MOUSE_UP = '_isFirstMouseUp', MOUSE_UP_TOKEN = '_mouseupToken';
function deleteTokenAndClearTimeout(sheet, row, col, sheetArea) {
    var modelManager = sheet._modelManager;
    if (modelManager) {
        modelManager.do('setValueForKey', row, col, IS_FIRST_MOUSE_UP, keyword_undefined, sheetArea);
        var mouseupToken = modelManager.getValueForKey(row, col, MOUSE_UP_TOKEN, sheetArea);
        if (mouseupToken) {
            clearTimeout(mouseupToken);
            modelManager.do('setValueForKey', row, col, MOUSE_UP_TOKEN, keyword_undefined, sheetArea);
        }
    }
}


var CheckBoxTextAlign;
(function (CheckBoxTextAlign) {
    CheckBoxTextAlign[CheckBoxTextAlign['top'] = 0] = 'top';

    CheckBoxTextAlign[CheckBoxTextAlign['bottom'] = 1] = 'bottom';

    CheckBoxTextAlign[CheckBoxTextAlign['left'] = 2] = 'left';

    CheckBoxTextAlign[CheckBoxTextAlign['right'] = 3] = 'right';
})(CheckBoxTextAlign = exports.CheckBoxTextAlign || (exports.CheckBoxTextAlign = {}));

var DEFAULT_CHECKBOX_SIZE = 12;
var checkBoxCellTypePropertyDict = {
    caption: '', textTrue: '', textIndeterminate: '', textFalse: '', textAlign: 3 , isThreeState: false, boxSize: DEFAULT_CHECKBOX_SIZE,
};


var CheckBoxCellType = (function (_super) {
    __extends(CheckBoxCellType, _super);
    function CheckBoxCellType() {
        var _this = _super.call(this) || this;
        _this.typeName = 5 + '';
        _this._boxSize = DEFAULT_CHECKBOX_SIZE;
        var self = _this;
        $_each(checkBoxCellTypePropertyDict, function (p, v) {
            self['_' + p] = v;
        });
        return _this;
    }
    CheckBoxCellType.prototype.paintValue = function (ctx, value, x, y, w, h, style, options) {
        if (!ctx) {
            return;
        }
        ctx.save();
        ctx.rect(x, y, w, h);
        ctx.clip();
        ctx.beginPath();
        var styleHAlign = style.hAlign, styleFont = style.font, styleForeColor = style.foreColor;
        var self = this, ownTextAlign = self._textAlign;
        var text = self.getText(value, options);
        var textWidth = 0, textHeight = 0, sheet = options.sheet;
        if (sheet) {
            textWidth = sheet._getStringWidthByCanvas(text, styleFont);
            textHeight = getFontHeight(styleFont);
            if (text) {
                var lines = text.split(/\r\n|\r|\n/);
                textHeight *= lines.length;
            }
        }
        var zoomFactor = sheet.zoom();
        var isPrinting = options.isPrinting, printZoomFactor = options.printZoomFactor;
        if (isPrinting && typeof printZoomFactor === 'number' && printZoomFactor !== 1) {
            zoomFactor = printZoomFactor;
        }
        ++x;
        ++y;
        --w;
        --h;
        var _a = this._getBoxRadius(textHeight, zoomFactor), radius = _a.radius, scaleFactor = _a.scaleFactor;
        var rect = new Core_1.Rect(x, y, w, h);
        var boxLeft = getCheckBoxLeft(ownTextAlign, style, rect, textWidth, zoomFactor * scaleFactor);
        var boxRight = getCheckBoxTop(ownTextAlign, style, rect, textHeight, zoomFactor * scaleFactor);
        var startX = convertToInt((x + boxLeft).toString()), startY = convertToInt((y + boxRight).toString());
        var textAlign = cssLeft;
        var textStartX = startX + 1;
        if (styleHAlign === 1 ) {
            textAlign = 'center';
            textStartX += radius;
        }
        else if (styleHAlign === 2 ) {
            textAlign = cssRight;
            textStartX += radius * 2;
        }
        if (styleFont && ctx.font !== styleFont) {
            Core_1._util._setContextFont(ctx, styleFont);
        }
        if (styleForeColor) {
            ctx.fillStyle = styleForeColor;
        }
        var textDecoration = style.textDecoration, fontSize = parseInt(options.fontInfo.fontSize, 10), baselineOffset = fontSize > 8 ? Math.floor((fontSize - 8) / 5 + 2) : 1, lineOffset = textHeight / 2 - fontSize / 2 + baselineOffset - 1;
        if (ctx.textBaseline !== cssAlphabetic) {
            ctx.textBaseline = cssAlphabetic;
        }
        if (ownTextAlign === 2 ) {
            ctx.textAlign = cssRight;
            ctx.fillText(text, startX + 1 - 2, startY + radius + textHeight / 2 - lineOffset);
            if (textDecoration) {
                self._renderTextDecoration(ctx, textDecoration, startX + 1 - 2, startY + radius + textHeight / 2 - lineOffset, textWidth, fontSize, baselineOffset);
            }
        }
        else if (ownTextAlign === 0 ) {
            ctx.textAlign = textAlign;
            ctx.fillText(text, textStartX, startY - 2 - lineOffset);
            if (textDecoration) {
                self._renderTextDecoration(ctx, textDecoration, textStartX, startY - 2 - lineOffset, textWidth, textHeight);
            }
        }
        ctx.save();
        ctx.strokeStyle = '#3370ff';
        ctx.strokeRect(startX + 0.5, startY + 0.5, radius * 2 + 0.05, radius * 2 + 0.05);
        this._checkboxBounding = {
            x: startX + 0.5,
            y: startY + 0.5,
            w: radius * 2 + 0.05,
            h: radius * 2 + 0.05
        };
        if (!!value === true) {
            ctx.fillStyle = '#3370ff';
        } else {
            ctx.fillStyle = cssWhite;
        }

        ctx.fillRect(startX + 1, startY + 1, radius * 2 - 1, radius * 2 - 1);
        if (self._isThreeState && isNullOrUndefined(value)) {
            ctx.beginPath();
            ctx.fillStyle = cssGreen;
            ctx.rect(startX + 3 * zoomFactor, startY + 3 * zoomFactor, (radius - 2.5 * zoomFactor) * 2, (radius - 2.5 * zoomFactor) * 2);
            ctx.fill();
        }
        else if (!!value === true) {
            ctx.beginPath();
            ctx.strokeStyle = cssWhite;
            ctx.lineWidth = 2.5 * zoomFactor;
            ctx.moveTo(startX + 3 * zoomFactor, startY + radius);
            ctx.lineTo(startX + radius, startY + radius * 2 - 3.5 * zoomFactor);
            ctx.lineTo(startX + radius * 2 - 1.5 * zoomFactor, startY + 3 * zoomFactor);
            ctx.stroke();
        }
        ctx.restore();
        if (styleForeColor) {
            ctx.fillStyle = styleForeColor;
        }
        if (ownTextAlign === 3 ) {
            ctx.textAlign = cssLeft;
            ctx.fillText(text, startX + 1 + radius * 2 + 2, startY + radius + textHeight / 2 - lineOffset);
            if (textDecoration) {
                self._renderTextDecoration(ctx, textDecoration, startX + 1 + radius * 2 + 2, startY + radius + textHeight / 2 - lineOffset, textWidth, fontSize, baselineOffset);
            }
        }
        else if (ownTextAlign === 1 ) {
            ctx.textAlign = textAlign;
            ctx.fillText(text, textStartX, startY + radius * 2 + 2 + textHeight - lineOffset);
            if (textDecoration) {
                self._renderTextDecoration(ctx, textDecoration, textStartX, startY + radius * 2 + 2 + textHeight - lineOffset, textWidth, fontSize, baselineOffset);
            }
        }
        ctx.restore();
    };
    CheckBoxCellType.prototype._getBoxRadius = function (textHeight, zoomFactor) {
        var self = this;
        var boxSize = self._boxSize;
        var radius = DEFAULT_CHECKBOX_SIZE / 2;
        var scaleFactor = 1;
        if (boxSize === 'auto') {
            radius = textHeight / 4;
            scaleFactor = textHeight / 2 / DEFAULT_CHECKBOX_SIZE;
        }
        if (typeof boxSize === 'number' && boxSize > 0) {
            radius = zoomFactor * boxSize / 2;
            scaleFactor = boxSize / DEFAULT_CHECKBOX_SIZE;
        }
        return {
            radius: radius,
            scaleFactor: scaleFactor
        };
    };
    CheckBoxCellType.prototype._getTextHeight = function (value, style, options) {
        var self = this;
        var styleFont = style.font;
        var text = self.getText(value, options);
        var textHeight = 0, sheet = options.sheet;
        if (sheet) {
            textHeight = getFontHeight(styleFont);
            if (text) {
                var lines = text.split(/\r\n|\r|\n/);
                textHeight *= lines.length;
            }
        }
        return textHeight;
    };

    CheckBoxCellType.prototype.getText = function (text, options) {
        return this._getDisplayText(text);
    };
    CheckBoxCellType.prototype.focus = function (editorContext, context) {
        if (editorContext) {
            editorContext.parentNode.focus();
        }
    };
    CheckBoxCellType.prototype.createEditorElement = function (context, cellWrapperElement) {
        var host = context && context.sheet && context.sheet.parent && context.sheet.parent._host;
        var zIndex = Core_1._util._getPreferredZIndex(host) + 1000;
        $(cellWrapperElement).css('z-index', zIndex).attr('tabindex', 1).attr('gcUIElement', 'gcEditingInput');
        var $contentContainer = $(cellWrapperElement.firstChild);
        $contentContainer.css('overflow', 'hidden');
        var $input = $(_createElement('input'));
        $input.attr('type', 'checkbox');

        $input.attr('class', 'gc-checkbox-cell-type-input');
        var boxSize = this._getCheckBoxDomSize(context);
        var scaleFactor = boxSize / DEFAULT_CHECKBOX_SIZE;
        $input.css('transform', 'scale(' + scaleFactor + ')');
        $contentContainer.append($input);
        var $span = $(_createElement('span'));
        $span.css(cssPosition, cssAbsolute).css(cssFont, adjustFontWithFallback(defaultFont)).css('cursor', 'default').css('white-space', 'nowrap');
        $contentContainer.append($span);
        var $childDiv = $(_createElement(STR_DIV));
        $childDiv.css(cssPosition, cssAbsolute).css(cssBackgroundColor, cssGreen)
            .css('width', (boxSize / 2 - 2.5) * 2).css('height', (boxSize / 2 - 2.5) * 2);
        $contentContainer.append($childDiv);
        return keyword_null;
    };
    CheckBoxCellType.prototype._getCheckBoxDomSize = function (context) {
        var sheet = context.sheet;
        var zoomFactor = sheet.zoom();
        if (typeof this._boxSize === 'number' && this._boxSize > 0) {
            return this._boxSize * zoomFactor;
        }
        if (this._boxSize === 'auto') {
            var style = sheet.getStyle(context.row, context.col);
            var font = '';
            if (style && style.font) {
                font = style.font;
            }
            else {
                font = defaultFont;
            }
            return zoomFactor * getFontHeight(font) / 2;
        }
        return DEFAULT_CHECKBOX_SIZE / 2;
    };
    CheckBoxCellType.prototype._getNextState = function (value) {
        var newValue;
        if (this._isThreeState) {
            if (isNullOrUndefined(value)) {
                newValue = false;
            }
            else if (!!value === true) {
                newValue = keyword_null;
            }
            else {
                newValue = true;
            }
        }
        else {
            newValue = !value;
        }
        return newValue;
    };
    CheckBoxCellType.prototype.setEditorValue = function (editorContext, value, context) {
        if (editorContext) {
            var children = editorContext.parentNode.children, checkbox = children[0], span = children[1], greenDiv = children[2];
            if (checkbox && span && greenDiv) {
                var self_1 = this, sheet = context && context.sheet, startEditNotBySpace = sheet && sheet._startEditByKeydown, checked = void 0, newValue = void 0;
                if (!startEditNotBySpace) {
                    newValue = self_1._getNextState(value);
                }
                if (self_1._isThreeState) {
                    if (isNullOrUndefined(newValue)) {
                        checked = false;
                        $(greenDiv).show();
                    }
                    else {
                        checked = !!newValue;
                        $(greenDiv).hide();
                    }
                }
                else {
                    checked = !!newValue;
                }
                checkbox.checked = checked;
                $(span).text(self_1._getDisplayText(newValue));
            }
        }
    };
    CheckBoxCellType.prototype.getEditorValue = function (editorContext, context) {
        if (editorContext) {
            var children = editorContext.parentNode.children, checkbox = children[0], span = children[1], greenDiv = children[2];
            if (checkbox && span && greenDiv) {
                if (!this._isThreeState || !$(greenDiv).isVisible()) {
                    return checkbox.checked;
                }
            }
        }
        return keyword_null;
    };
    CheckBoxCellType.prototype._triggerButtonClicked = function (sheet, row, col, sheetArea) {
        var parent = sheet.parent;
        if (parent) {
            parent._triggerButtonClicked(sheet, row, col, sheetArea);
        }
    };
    CheckBoxCellType.prototype.activateEditor = function (editorContext, cellStyle, cellRect, context) {
        var sheet = context && context.sheet;
        if (editorContext && sheet) {
            var $editor = $(editorContext.parentNode.parentNode);

            var self_2 = this;
            $editor.bind('mousedown' + _gcEditingInput, function (e) {
                cancelDefault(e);
            });
            $editor.bind('mouseup' + _gcEditingInput, function () {
                onValueChanging(self_2, editorContext, cellStyle, cellRect, context);
            });
            $editor.bind('keydown' + _gcEditingInput, function (e) {
                var keyCode = e.keyCode;
                if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
                    if (keyCode === 32 ) {
                        self_2._isKeyDown = true;
                        cancelDefault(e);
                        return false;
                    }
                    else if (keyCode === 8 ) {
                        cancelDefault(e);
                    }
                }
            });
            $editor.bind('keyup' + _gcEditingInput, function (e) {
                if (self_2._isKeyDown && e.keyCode === 32 && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    self_2._isKeyDown = false;
                    onValueChanging(self_2, editorContext, cellStyle, cellRect, context);
                }
            });
            $(editorContext).bind('click', function (e) {
                cancelDefault(e);
            });
        }
    };
    CheckBoxCellType.prototype.updateEditor = function (editorContext, cellStyle, cellRect, context) {
        var sheet = context && context.sheet;
        if (editorContext && sheet) {
            var render = sheet._render, contentContainer = editorContext.parentNode;
            var children = contentContainer.children, checkbox = children[0], span = children[1], greenDiv = children[2];
            if (checkbox && span && greenDiv) {
                $(contentContainer).width(cellRect.width).height(cellRect.height);
                var $span = $(span);
                var text = $span.text();
                var cellStyleForeColor = cellStyle.foreColor, cellStyleFont = cellStyle.font, cellStyleHAlign = cellStyle.hAlign, cellStyleTextDecoration = cellStyle.textDecoration;
                if (cellStyleForeColor) {
                    $span.css('color', cellStyleForeColor);
                }
                var font = void 0;
                if (cellStyleFont) {
                    font = cellStyleFont;
                }
                else {
                    font = render._getDefaultFont();
                }
                var zoomFactor = sheet.zoom();
                if (zoomFactor > 1) {
                    font = render._getZoomFont(font);
                }
                $span.css(cssFont, adjustFontWithFallback(font));
                var textWidth = sheet._getStringWidth(text, font);
                var textHeight = getFontHeight(font);
                if (text) {
                    var lines = text.split(/\r\n|\r|\n/);
                    textHeight *= lines.length;
                }
                var self_3 = this, ownTextAlign = self_3._textAlign, boxSize = this._getCheckBoxDomSize(context), scaleFactor = boxSize / DEFAULT_CHECKBOX_SIZE;
                var marginLeft = getCheckBoxLeft(ownTextAlign, cellStyle, cellRect, textWidth, zoomFactor * scaleFactor), marginTop = getCheckBoxTop(ownTextAlign, cellStyle, cellRect, textHeight, zoomFactor * scaleFactor);
                $(checkbox).css('margin-left', marginLeft).css('margin-top', marginTop);
                var checkboxOffsetLeft = checkbox.offsetLeft, checkboxOffsetTop = checkbox.offsetTop, checkboxOffsetWidth = checkbox.offsetWidth, checkboxOffsetHeight = checkbox.offsetHeight;
                var textLeft = 0, textTop = 0;
                if (ownTextAlign === 0 ) {
                    textLeft = checkboxOffsetLeft;
                    if (cellStyleHAlign === 1 ) {
                        textLeft = checkboxOffsetLeft + boxSize / 2 - textWidth / 2;
                    }
                    else if (cellStyleHAlign === 2 ) {
                        textLeft = checkboxOffsetLeft + boxSize - textWidth;
                    }
                    textTop = checkboxOffsetTop - textHeight;
                    textLeft -= (scaleFactor - 1) * DEFAULT_CHECKBOX_SIZE / 2;
                    textTop -= (scaleFactor - 1) * DEFAULT_CHECKBOX_SIZE / 2;
                }
                else if (ownTextAlign === 1 ) {
                    textLeft = checkboxOffsetLeft;
                    if (cellStyleHAlign === 1 ) {
                        textLeft = checkboxOffsetLeft + boxSize / 2 - textWidth / 2;
                    }
                    else if (cellStyleHAlign === 2 ) {
                        textLeft = checkboxOffsetLeft + boxSize - textWidth;
                    }
                    textTop = checkboxOffsetTop + checkboxOffsetHeight;
                    textLeft -= (scaleFactor - 1) * DEFAULT_CHECKBOX_SIZE / 2;
                    textTop += (scaleFactor - 1) * DEFAULT_CHECKBOX_SIZE / 2;
                }
                else if (ownTextAlign === 2 ) {
                    textLeft = checkboxOffsetLeft - textWidth - 2;
                    textTop = checkboxOffsetTop + boxSize / 2 - textHeight / 2;
                    textLeft -= (scaleFactor - 1) * DEFAULT_CHECKBOX_SIZE / 2;
                    textTop -= (scaleFactor - 1) * DEFAULT_CHECKBOX_SIZE / 2;
                }
                else {
                    textLeft = checkboxOffsetLeft + checkboxOffsetWidth + 2;
                    textTop = checkboxOffsetTop + boxSize / 2 - textHeight / 2;
                    textLeft += (scaleFactor - 1) * DEFAULT_CHECKBOX_SIZE / 2;
                    textTop -= (scaleFactor - 1) * DEFAULT_CHECKBOX_SIZE / 2;
                }
                $span.css(cssLeft, textLeft).css(cssTop, textTop);
                if (self_3._isThreeState) {
                    var left = checkboxOffsetLeft + (checkboxOffsetWidth - greenDiv.offsetWidth) / 2, top_1 = checkboxOffsetTop + (checkboxOffsetHeight - greenDiv.offsetHeight) / 2;
                    $(greenDiv).css(cssLeft, left).css(cssTop, top_1).toggle().toggle();
                }
                else {
                    $(greenDiv).hide();
                }
                if (cellStyleTextDecoration) {
                    self_3._setTextDecoration($span, cellStyleTextDecoration);
                }
            }
        }
    };
    CheckBoxCellType.prototype._getDisplayText = function (value) {
        var self = this, caption = self._caption;
        if (self._isThreeState && isNullOrUndefined(value)) {
            return self._textIndeterminate || caption;
        }
        else if (!!value === true) {
            return self._textTrue || caption;
        }
        return self._textFalse || caption;
    };
    CheckBoxCellType.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
        if (context) {
            var sheetArea = context.sheetArea;
            if (isNullOrUndefined(sheetArea) || sheetArea === 3 ) {
                var checkboxBounding = this._checkboxBounding;
                var checkboxRect = new Core_1.Rect(checkboxBounding.x, checkboxBounding.y, checkboxBounding.w, checkboxBounding.h);
                return {
                    x: x,
                    y: y,
                    row: context.row,
                    col: context.col,
                    cellRect: cellRect,
                    sheetArea: 3 ,
                    isReservedLocation: checkboxRect.contains(x, y),
                    sheet: context.sheet,
                    cellStyle: cellStyle,
                    disableEdit: true,
                };
            }
        }
        return keyword_null;
    };
    CheckBoxCellType.prototype.processMouseDown = function (hitInfo) {
        if (!hitInfo) {
            return false;
        }
        if (hitInfo.isReservedLocation) {
            this._isMouseDownReservedLocation = true;
        }
    };
    CheckBoxCellType.prototype.processMouseUp = function (hitInfo) {
        var self = this;
        var sheet = hitInfo && hitInfo.sheet;
        if (sheet && self._isMouseDownReservedLocation && hitInfo.isReservedLocation) {
            self._isMouseDownReservedLocation = false;
            var row_1 = hitInfo.row, col_1 = hitInfo.col, sheetArea_1 = hitInfo.sheetArea;
            var isFirstMouseUp = sheet._modelManager.getValueForKey(row_1, col_1, IS_FIRST_MOUSE_UP, sheetArea_1);
            if (!isFirstMouseUp) {
                executeEditCellCommand(self, sheet, row_1, col_1, sheetArea_1);
                sheet._modelManager.do('setValueForKey', row_1, col_1, IS_FIRST_MOUSE_UP, true, sheetArea_1);
                var mouseupToken = setTimeout(function () {
                    deleteTokenAndClearTimeout(sheet, row_1, col_1, sheetArea_1);
                }, 250);
                sheet._modelManager.do('setValueForKey', row_1, col_1, MOUSE_UP_TOKEN, mouseupToken, sheetArea_1);
                return true;
            }
            deleteTokenAndClearTimeout(sheet, row_1, col_1, sheetArea_1);
        }
        return false;
    };
    CheckBoxCellType.prototype.processMouseLeave = function (hitInfo) {
        if (!hitInfo) {
            return false;
        }
        this._isMouseDownReservedLocation = false;
    };
    CheckBoxCellType.prototype.isReservedKey = function (e, context) {
        return e.keyCode === 32 && !e.ctrlKey && !e.shiftKey && !e.altKey;
    };
    CheckBoxCellType.prototype.processKeyUp = function (event, context) {
        executeEditCellCommand(this, context.sheet, context.row, context.col, context.sheetArea);
        return true;
    };
    CheckBoxCellType.prototype.getAutoFitWidth = function (value, text, cellStyle, zoomFactor, context) {
        var self = this, ownTextAlign = self._textAlign;
        var width = CellTypeContext._getAutoFitWidth(value, self._getDisplayText(value), cellStyle, zoomFactor, context);
        var textHeight = self._getTextHeight(value, cellStyle, context);
        var realBoxSize = self._getBoxRadius(textHeight, zoomFactor).radius * 2;
        if (ownTextAlign === 0 || ownTextAlign === 1 ) {
            width = Math_max(width, realBoxSize);
        }
        else {
            width += realBoxSize;
        }
        return width + 5 + 2;
    };
    CheckBoxCellType.prototype.getAutoFitHeight = function (value, text, cellStyle, zoomFactor, context) {
        var self = this, ownTextAlign = self._textAlign;
        var height = CellTypeContext._getAutoFitHeight(value, self._getDisplayText(value), cellStyle, zoomFactor, context);
        var textHeight = self._getTextHeight(value, cellStyle, context);
        var realBoxSize = self._getBoxRadius(textHeight, zoomFactor).radius * 2;
        if (ownTextAlign === 0 || ownTextAlign === 1 ) {
            height += realBoxSize;
        }
        else {
            height = Math_max(height, realBoxSize);
        }
        return height + 5;
    };
    CheckBoxCellType.prototype._cancelDefaultKeydown = function (event) {
        if (this.isReservedKey(event)) {
            cancelDefault(event);
        }
    };
    CheckBoxCellType.prototype.isImeAware = function (context) {
        return false;
    };
    CheckBoxCellType.prototype._cloneCellType = function () {
    };
    CheckBoxCellType.prototype._fromOptions = function (options) {
        var json = {
            caption: options.caption,
            textTrue: options.textTrue,
            textIndeterminate: options.textIndeterminate,
            textFalse: options.textFalse,
            textAlign: options.textAlign && CheckBoxTextAlign[options.textAlign],
            isThreeState: options.isThreeState,
            boxSize: options.boxSize
        };
        this.fromJSON(json);
    };
    CheckBoxCellType.prototype.toJSON = function () {
        var self = this;
        var dataDic = { typeName: self.typeName }, currentValue;
        $_each(checkBoxCellTypePropertyDict, function (p, v) {
            currentValue = self['_' + p];
            if (currentValue !== v) {
                dataDic[p] = currentValue;
            }
        });
        return dataDic;
    };
    CheckBoxCellType.prototype.fromJSON = function (setting) {
        var self = this;
        $_each(checkBoxCellTypePropertyDict, function (p) {
            var jsonValue = setting[p];
            if (!isNullOrUndefined(jsonValue)) {
                self['_' + p] = jsonValue;
            }
        });
    };
    return CheckBoxCellType;
}(BaseCellType));
exports.CheckBox = CheckBoxCellType;
function getCheckBoxMargin(zoomFactor) {
    return 5 * zoomFactor;
}
function getCheckBoxLeft(textAlign, cellStyle, cellRect, textWidth, zoomFactor) {
    var margin = getCheckBoxMargin(zoomFactor);
    var cellStyleHAlign = cellStyle.hAlign;
    var x = cellRect.x - 1, w = cellRect.width + 1, totalWidth = 0, startX = 0;
    if (textAlign === 0 || textAlign === 1 ) {
        startX = x + margin;
        if (cellStyleHAlign === 1 ) {
            startX = x + w / 2 - DEFAULT_CHECKBOX_SIZE * zoomFactor / 2;
        }
        else if (cellStyleHAlign === 2 ) {
            startX = x + w - margin - DEFAULT_CHECKBOX_SIZE * zoomFactor;
        }
    }
    else if (textAlign === 2 ) {
        totalWidth = DEFAULT_CHECKBOX_SIZE * zoomFactor + textWidth;
        startX = x + margin + textWidth;
        if (cellStyleHAlign === 1 ) {
            startX = x + w / 2 - totalWidth / 2 + textWidth;
        }
        else if (cellStyleHAlign === 2 ) {
            startX = x + w - margin - totalWidth + textWidth;
        }
    }
    else {
        totalWidth = DEFAULT_CHECKBOX_SIZE * zoomFactor + textWidth;
        startX = x + margin;
        if (cellStyleHAlign === 1 ) {
            startX = x + w / 2 - totalWidth / 2;
        }
        else if (cellStyleHAlign === 2 ) {
            startX = x + w - margin - totalWidth;
        }
    }
    return startX - x;
}
function getCheckBoxTop(textAlign, cellStyle, cellRect, textHeight, zoomFactor) {
    var margin = getCheckBoxMargin(zoomFactor);
    var cellStyleVAlign = cellStyle.vAlign;
    var y = cellRect.y - 1, h = cellRect.height + 1, totalHeight = 0, startY = 0;
    if (textAlign === 0 ) {
        totalHeight = DEFAULT_CHECKBOX_SIZE * zoomFactor + textHeight;
        startY = y + margin + textHeight;
        if (cellStyleVAlign === 1 ) {
            startY = y + h / 2 - totalHeight / 2 + textHeight;
        }
        else if (cellStyleVAlign === 2 ) {
            startY = y + h - margin - totalHeight + textHeight;
        }
    }
    else if (textAlign === 1 ) {
        totalHeight = DEFAULT_CHECKBOX_SIZE * zoomFactor + textHeight;
        startY = y + margin;
        if (cellStyleVAlign === 1 ) {
            startY = y + h / 2 - totalHeight / 2;
        }
        else if (cellStyleVAlign === 2 ) {
            startY = y + h - margin - totalHeight;
        }
    }
    else {
        startY = y + margin;
        if (cellStyleVAlign === 1 ) {
            startY = y + h / 2 - DEFAULT_CHECKBOX_SIZE * zoomFactor / 2;
        }
        else if (cellStyleVAlign === 2 ) {
            startY = y + h - margin - DEFAULT_CHECKBOX_SIZE * zoomFactor;
        }
    }
    return startY - y;
}
function executeEditCellCommand(cellType, sheet, row, col, sheetArea) {
    var oldValue = sheet.getValue(row, col, sheetArea);
    var newValue = cellType._getNextState(oldValue);
    var cellEditCmd = { cmd: 'editCell', sheetName: sheet.name(), row: row, col: col, newValue: newValue, autoFormat: true };
    sheet._commandManager().execute(cellEditCmd);
    cellType._triggerButtonClicked(sheet, row, col, sheetArea);
}
function onValueChanging(cellType, editorContext, cellStyle, cellRect, context) {
    var sheet = context && context.sheet;
    var oldValue = cellType.getEditorValue(editorContext, context);
    cellType.setEditorValue(editorContext, oldValue, context);
    cellType.updateEditor(editorContext, cellStyle, cellRect, context);
    cellType._triggerButtonClicked(sheet, sheet._activeRowIndex, sheet._activeColIndex, context.sheetArea);
}
$_each(checkBoxCellTypePropertyDict, function (para) {
    CheckBoxCellType.prototype[para] = function (value) {
        if (arguments.length === 0) {
            return this['_' + para];
        }
        if (para === 'boxSize') {
            if (typeof value === 'number' && value > 0) {
                this['_' + para] = value;
            }
            if (value === 'auto') {
                this['_' + para] = value;
            }
        }
        else {
            this['_' + para] = value;
        }
        return this;
    };
});

Core_1.CellTypes._typeDict[5 ] = CheckBoxCellType;
/***/ }),

/***/ './dist/plugins/celltype/comboboxcelltype.js':
/*!***************************************************!*\
  !*** ./dist/plugins/celltype/comboboxcelltype.js ***!
  \***************************************************/
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
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var BaseCellType = Core_1.CellTypes.Base;
var _createElement = Core_1._util._createElement;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined, _ColorHelper = Common_1.Common._ColorHelper;
var Core_util = Core_1._util;
var cancelDefault = Core_util._cancelDefault;
var $ = Core_1.GC$, $_each = $.each;
var adjustFontWithFallback = Core_util._adjustFontWithFallback;
var isNeedUseSymbolFormDataType = Core_util._isNeedUseSymbolFormDataType;
var getVisibleDistance = Core_util._getVisibleDistance;
var DOCUMENT = document;
var keyword_null = null, keyword_undefined = void 0, Math_max = Math.max, convertToInt = parseInt;
var click_event = 'click', keydown_event = 'keydown', mouseover_event = 'mouseover', mouseout_event = 'mouseout', const_string = 'string', const_number = 'number';
var cssPosition = 'position', cssAbsolute = 'absolute', cssFont = 'font', cssLeft = 'left', cssTop = 'top', attrGcUIElement = 'gcUIElement', attrTabIndex = 'tabindex', cssNone = 'none', cssWidth = 'width', cssHeight = 'height', cssOutline = 'outline', cssBoxSizing = 'box-sizing', cssColor = 'color', cssBackgroundColor = 'background-color', cssZIndex = 'z-index', cssDisplay = 'display', cssContentBox = 'content-box', cssWhite = 'white', cssBlack = 'black', cssTitle = 'title', STR_DIV = 'div', STR_SPAN = 'span', STR_TEXT = 'text', STR_VALUE = 'value', cssBorder = 'border', cssMinWidth = 'min-width', convertRichTextValue = Core_util._convertRichTextValue;
function _appendChild(parent, child) {
    parent.appendChild(child);
}
function _removeChild(parent, child) {
    parent.removeChild(child);
}
function getComboBoxOnElement(editorContext) {
    return editorContext && editorContext.parentNode.parentNode.comboBox;
}


var EditorValueType;
(function (EditorValueType) {
    EditorValueType[EditorValueType['text'] = 0] = 'text';

    EditorValueType[EditorValueType['index'] = 1] = 'index';

    EditorValueType[EditorValueType['value'] = 2] = 'value';
})(EditorValueType = exports.EditorValueType || (exports.EditorValueType = {}));

var DefaultDropDownButtonWidth = 17, DefaultMaxVisibleItemCount = 20;
var COMBO_BOX_BORDER_WIDTH = 0, COMBO_BOX_EDITOR_LEFT_PADDING = 1, COMBO_BOX_EDITOR_TOP_PADDING = 1, DROP_DOWN_ITEM_LEFT_PADDING = COMBO_BOX_EDITOR_LEFT_PADDING, DROP_DOWN_ITEM_RIGHT_PADDING = 18;
var END_EDIT_EVENT = 'EndEdit.gcEditingInput';
var SCROLLBAR_SIZE = 18, HOVER_COLOR = 'lightgrey', SELECTED_COLOR = '#1E90FF';
var comboBoxCellTypePropertyDict = {
    editorValueType: 0 ,
    items: keyword_null,
    itemHeight: 22,
    editable: false,
    maxDropDownItems: DefaultMaxVisibleItemCount
};
var ComboBox = (function () {
    function ComboBox(host, left, top, width, height, zindex, minWidth) {
        var self = this;
        self._DOMObject = host;
        var containerDiv = host.firstChild;
        $(host).bind(keydown_event, function (event) {
            self._onKeydown(event);
        }).css([cssZIndex, cssLeft, cssTop, cssWidth, cssHeight, 'overflow'], [zindex || 0, left, top, width, height, 'visible']).attr([attrGcUIElement], ['gcComboBox']);

        var comboBoxEditorWidth = Math_max(0, width - DefaultDropDownButtonWidth);
        var divObject, textareaObject;
        self._editable = false;
        self._divObject = divObject = _createElement(STR_DIV);
        self._textareaObject = textareaObject = _createElement('textarea');
        self._EDITOR = divObject;
        _appendChild(containerDiv, divObject);
        comboBox_setEditorDefaultCSS(divObject);
        comboBox_setEditorDefaultCSS(textareaObject);
        $(textareaObject).bind('keyup', function () {
            var text = self._EDITOR.value;
            self._text = text;
            var value = self._textToValue(text);
            self.editorValue(value);
            self._selectByText(text);
            self._removeTip();
        }).bind(mouseover_event, function () {
            self._updateTip();
        }).bind(mouseout_event, function () {
            self._removeTip();
        });
        $(divObject).bind(click_event, function () {
            if (self._isDisplayMode) {
                self._trigger(END_EDIT_EVENT, { isMouse: true });
            }
            else {
                self._toggleDropDownList();
            }
        }).bind(mouseover_event, function () {
            self._updateTip();
        }).bind(mouseout_event, function () {
            self._removeTip();
        });
        self._updateEditor(0, 0, comboBoxEditorWidth, height);

        var dropDownButtonHost = self._BUTTON = _createElement(STR_DIV);
        _appendChild(containerDiv, dropDownButtonHost);
        $(dropDownButtonHost).css([cssBorder, cssPosition, cssBackgroundColor, cssBoxSizing], [cssNone, cssAbsolute, cssWhite, cssContentBox]).attr(attrGcUIElement, 'gcDropDownButton')
            .bind(click_event, function () {
            if (!isNullOrUndefined(self._showTime)) {
                var lastUpdateShowTime = self._showTime;
                self._showTime = keyword_undefined;
                var currentTime = new Date().valueOf();
                if (currentTime - lastUpdateShowTime < 100) {
                    return;
                }
            }
            if (self._isDisplayMode) {
                self._trigger(END_EDIT_EVENT, { isMouse: true });
            }
            else {
                self._toggleDropDownList();
            }
        });
        var canvas = _createElement('canvas');
        self._canvas = canvas;
        self._updateButton(comboBoxEditorWidth, 0, width - comboBoxEditorWidth, height);
        _appendChild(dropDownButtonHost, canvas);

        var dropDownListHost = self._LIST = _createElement(STR_DIV);
        _appendChild(containerDiv, dropDownListHost);
        self._isShown = false;
        self._hostMinWidth = minWidth || width;
        $(dropDownListHost).css([cssPosition, cssBorder, cssBackgroundColor, cssZIndex, cssOutline, cssDisplay, 'cursor', cssBoxSizing, cssHeight, cssMinWidth], [cssAbsolute, '1px solid', cssWhite, zindex || 0, cssNone, cssNone, 'default', cssContentBox, height, self._hostMinWidth + 'px']);
        $(dropDownListHost).attr(attrGcUIElement, 'gcDropDownWindow').attr(attrTabIndex, -1);
        self._updateList(0, height - 2 * COMBO_BOX_BORDER_WIDTH);
        self._itemCount = 0;
        var divList = self._divList = _createElement(STR_DIV);
        _appendChild(dropDownListHost, divList);
        self._scrollablePanel = new Core_1._ScrollablePanel(dropDownListHost, divList);
        self._itemHeight = 22;
        self._itemCountPerPage = DefaultMaxVisibleItemCount;
        self._selectedIndex = -1;
        self._editorValueType = 0 ;
        self._items = [];
        self._hoverColor = HOVER_COLOR;
    }
    ComboBox.prototype.getComboBox = function () {
        return this._DOMObject;
    };
    ComboBox.prototype.dispose = function () {
        var _this = this;
        $(_this._DOMObject).unbind(keydown_event);
        $(_this._textareaObject).unbind('keyup').unbind(mouseover_event).unbind(mouseout_event);
        $(_this._divObject).unbind(click_event).unbind(mouseover_event).unbind(mouseout_event);
        $(_this._BUTTON).unbind(click_event);
        $(_this._divList).find('div').forEach(function (item) {
            $(item).unbind(mouseover_event).unbind(mouseout_event).unbind(click_event);
        });
        _this._scrollablePanel.dispose();
    };
    ComboBox.prototype.updateLocationAndSize = function (left, top, width, height) {
        var self = this;
        var comboBoxEditorWidth = Math_max(0, width - DefaultDropDownButtonWidth);
        self._updateEditor(0, 0, comboBoxEditorWidth, height);
        self._updateButton(comboBoxEditorWidth, 0, width - comboBoxEditorWidth, height);
        self._updateList(0, height - 2 * COMBO_BOX_BORDER_WIDTH);
    };
    ComboBox.prototype.updateStyle = function (backColor, foreColor, font) {
        var self = this;
        font = adjustFontWithFallback(font);

        backColor = backColor ? backColor : keyword_undefined;
        $(self._EDITOR).css(cssBackgroundColor, backColor).css(cssColor, foreColor).css(cssFont, font);
        $(self._BUTTON).css(cssBackgroundColor, backColor).css(cssColor, foreColor).css(cssFont, font);
        $(self._LIST).css(cssBackgroundColor, backColor).css(cssColor, foreColor).css(cssFont, font);
        $(self._DOMObject).css(cssBackgroundColor, 'transparent');
        self._hoverColor = _ColorHelper._equal(_ColorHelper._fromString(backColor), _ColorHelper._fromString(HOVER_COLOR)) ? cssWhite : HOVER_COLOR;
    };
    ComboBox.prototype.updateImeMode = function (imeMode) {
        $(this._EDITOR).css('ime-mode', imeMode);
    };
    ComboBox.prototype.editorValueType = function (value) {
        if (arguments.length === 0) {
            return this._editorValueType;
        }
        this._editorValueType = value;
        return this;
    };
    ComboBox.prototype.editorValue = function (value) {
        var self = this;
        if (arguments.length === 0) {
            return self._editorValue;
        }
        if (value !== self._editorValue) {
            self._editorValue = value;
            var text = self._valueToText(value);
            self.text(text);
            self._selectByText(text, true);
        }
        return self;
    };
    ComboBox.prototype._valueToText = function (value) {
        var text, self = this, items = self._items, itemsLength = items.length, editorValueType = self._editorValueType, item, i, j;
        self._isEditorValueInItems = true;
        if (editorValueType === 1 ) {
            item = items[value];
            text = item && _hasOwnProperty(item, STR_TEXT) ? item.text : item;
            if (text === keyword_undefined) {
                text = value;
                self._isEditorValueInItems = false;
            }
        }
        else if (editorValueType === 0 ) {
            text = value;
            for (j = 0; j < itemsLength; j++) {
                item = items[j];
                if (item && _hasOwnProperty(item, STR_TEXT) && item.text === value || item === value) {
                    break;
                }
            }
            if (j >= itemsLength) {
                self._isEditorValueInItems = false;
            }
        }
        else if (editorValueType === 2 ) {
            for (i = 0; i < itemsLength; i++) {
                item = items[i];
                if (item && _hasOwnProperty(item, STR_VALUE) && item.value === value) {
                    text = item.text;
                    break;
                }
            }
            if (i >= itemsLength) {
                text = value;
                self._isEditorValueInItems = false;
            }
        }

        if (isNullOrUndefined(value)) {
            text = '';
        }
        return text;
    };
    ComboBox.prototype._textToValue = function (text) {
        var self = this, items = self._items, itemsLength = items.length, editorValueType = self._editorValueType, value = text, item;
        if (editorValueType === 1 ) {
            for (var i = 0; i < itemsLength; i++) {
                item = items[i];
                if (item && _hasOwnProperty(item, STR_TEXT) && item.text === text || item === text) {
                    value = i;
                }
            }
        }
        else if (editorValueType === 2 ) {
            for (var j = 0; j < itemsLength; j++) {
                item = items[j];
                if (item && _hasOwnProperty(item, STR_TEXT) && item.text === text) {
                    value = item.value;
                }
                else if (item === text) {
                    value = keyword_undefined;
                }
            }
        }
        return value;
    };
    ComboBox.prototype._selectByText = function (text, exactMatch) {
        var i;
        if (text) {
            var items = this._items, length_1 = items.length;
            for (i = 0; i < length_1; i++) {
                var tempItem = items[i], item = void 0;
                if (_hasOwnProperty(tempItem, STR_TEXT)) {
                    item = tempItem.text;
                }
                else {
                    item = tempItem;
                }
                if ((exactMatch ? item : item.toString().substr(0, text.length)) === text) {
                    break;
                }
            }
            if (i >= length_1) {
                i = -1;
            }
        }
        else {
            i = -1;
        }
        this._setSelectedIndexInternal(i);
    };
    ComboBox.prototype._removeTip = function () {
        $(this._EDITOR).removeAttr(cssTitle);
    };
    ComboBox.prototype._updateTip = function () {
        var self = this;
        var textWidth = self._measureText(self._text);
        var $DOMObject = $(self._EDITOR);
        var containerWidth = $DOMObject.width();
        if (textWidth > containerWidth + COMBO_BOX_EDITOR_LEFT_PADDING) {
            $DOMObject.attr(cssTitle, self._text);
        }
        else {
            $DOMObject.removeAttr(cssTitle);
        }
    };
    ComboBox.prototype._updateEditor = function (left, top, width, height) {
        width -= COMBO_BOX_BORDER_WIDTH;
        height -= 2 * COMBO_BOX_BORDER_WIDTH;
        $(this._EDITOR).css(cssLeft, left).css(cssTop, top).css(cssWidth, width - COMBO_BOX_EDITOR_LEFT_PADDING).css(cssHeight, height - COMBO_BOX_EDITOR_TOP_PADDING);
    };
    ComboBox.prototype.editable = function (isEditable) {
        var self = this;
        if (arguments.length === 0) {
            return self._editable;
        }
        if (self._editable !== isEditable) {
            self._editable = isEditable;
            var contentContainer = self._DOMObject.firstChild;
            var DOMObject = self._EDITOR, $DOMObject = $(DOMObject);
            var locationAndSize = {
                left: convertToInt($DOMObject.css(cssLeft)),
                top: convertToInt($DOMObject.css(cssTop)),
                width: convertToInt($DOMObject.css(cssWidth)),
                height: convertToInt($DOMObject.css(cssHeight))
            };
            var style = {
                backColor: $DOMObject.css(cssBackgroundColor),
                foreColor: $DOMObject.css(cssColor),
                font: DOMObject.style.font
            };
            _removeChild(contentContainer, DOMObject);
            self._EDITOR = isEditable ? self._textareaObject : self._divObject;
            _appendChild(contentContainer, self._EDITOR);
            $(self._EDITOR).css(cssBackgroundColor, style.backColor).css(cssColor, style.foreColor).css(cssFont, style.font);
            self._updateEditor(locationAndSize.left, locationAndSize.top, locationAndSize.width, locationAndSize.height);
            return self;
        }
    };
    ComboBox.prototype.text = function (newText) {
        var self = this, DOMObject = self._EDITOR;
        if (arguments.length === 0) {
            return self._text;
        }
        if (newText !== self._text) {
            self._text = newText;
            if (self._editable) {
                DOMObject.value = newText;
            }
            else {
                DOMObject.textContent = newText;
            }
        }
    };
    ComboBox.prototype.focus = function () {
        var self = this, element = self._EDITOR;
        element.focus();
        if (self._editable) {
            element.selectionStart = element.value.length;
        }
    };
    ComboBox.prototype.selectAll = function () {
        var self = this;
        if (self._editable) {
            self._EDITOR.select();
        }
    };
    ComboBox.prototype._updateButton = function (left, top, width, height) {
        width -= COMBO_BOX_BORDER_WIDTH;
        height -= 2 * COMBO_BOX_BORDER_WIDTH;
        var self = this, canvas = self._canvas;
        $(self._BUTTON).css(cssLeft, left).css(cssTop, top).css(cssWidth, width).css(cssHeight, height);
        $(canvas).attr(cssWidth, width).attr(cssHeight, height);

        var canvasWidth = canvas.width, canvasHeight = canvas.height;
        var context = canvas.getContext('2d');
        context.beginPath();
        context.lineWidth = 2;
        context.fillStyle = cssBlack;
        context.moveTo(canvasWidth - DefaultDropDownButtonWidth + 4, (canvasHeight - 2) / 2 - 2.5);
        context.lineTo(canvasWidth - DefaultDropDownButtonWidth + 7, (canvasHeight - 2) / 2 + 3.5);
        context.lineTo(canvasWidth - DefaultDropDownButtonWidth + 10, (canvasHeight - 2) / 2 - 2.5);
        context.fill();
    };
    ComboBox.prototype.showDropDownList = function () {
        var self = this, scrollablePanel = self._scrollablePanel;
        self._isShown = true;
        $(self._LIST).bind(keydown_event, function (event) {
            self._onKeydown(event);
        }).show();
        self._isNeedVScrollbar = false;
        self._updateItemHeight();
        this.adjustPosition();
        if (self._isNeedVScrollbar) {
            scrollablePanel._verticalSmallChange($(self._divList.children).height());
        }
        scrollablePanel._refreshLayout(false);
        self._setSelectedItemBackColor(SELECTED_COLOR);
        self._scrollToIndex(self._selectedIndex);
        self.focus();
    };
    ComboBox.prototype.adjustPosition = function () {
        var self = this, list = $(self._LIST);
        if (list) {
            var left = parseInt(list.css('left'), 10);
            var top_1 = parseInt(list.css('top'), 10);
            var dialogWidth = list.width();
            var dialogHeight = list.height();
            if (isNaN(left) || isNaN(top_1) || isNaN(dialogWidth) || isNaN(dialogHeight)) {
                return;
            }
            var bottomCross = 0, rightCross = 0;
            var docElement = DOCUMENT.documentElement;
            var clientWidth = docElement.clientWidth;
            var clientHeight = docElement.clientHeight;
            var pos = list[0].getBoundingClientRect();
            if (dialogHeight > clientHeight) {
                list.css('max-height', (Math.round(clientHeight * 0.8)) + 'px');
                dialogHeight = (Math.round(clientHeight * 0.8));
            }
            if (dialogWidth > clientWidth) {
                list.css('max-width', (Math.round(clientWidth * 0.8)) + 'px');
                dialogWidth = (Math.round(clientWidth * 0.8));
            }
            if (pos.left + dialogWidth > clientWidth) {
                rightCross = pos.left + dialogWidth - clientWidth;
            }
            if (pos.top + dialogHeight > clientHeight) {
                bottomCross = pos.top + dialogHeight - clientHeight;
            }
            if (left < 0 || top_1 < 0 || bottomCross > 0 || rightCross > 0) {
                left -= rightCross;
                top_1 -= bottomCross;
                if (left < 0) {
                    left -= 22;
                }
                list.css({ left: (left) + 'px', top: (top_1) + 'px' });
            }
        }
    };
    ComboBox.prototype.shiftPadding = function (position, offsetValue) {
        var container = this._DOMObject.firstChild;
        if (position === cssLeft) {
            $(container).css({
                left: (+($(container).css(cssLeft)).replace('px', '') || 0) - offsetValue
            });
        }
        else if (position === cssTop) {
            $(container).css({
                top: (+($(container).css(cssTop)).replace('px', '') || 0) - offsetValue
            });
        }
    };
    ComboBox.prototype.closeDropDownList = function () {
        var self = this;
        self._isShown = false;
        $(self._LIST).unbind(keydown_event).hide();
        self._setSelectedItemBackColor('');
        self.focus();
    };
    ComboBox.prototype._toggleDropDownList = function () {
        if (this._isShown) {
            this.closeDropDownList();
        }
        else {
            this.showDropDownList();
        }
    };
    ComboBox.prototype.listHeight = function (newHeight) {
        var self = this, $List = $(self._LIST);
        if (arguments.length === 0) {
            return $List.height();
        }
        if (newHeight > 0) {
            $List.height(newHeight);
            self._scrollablePanel._refreshLayout(false);
        }
    };
    ComboBox.prototype._updateList = function (left, top) {
        $(this._LIST).css(cssLeft, left).css(cssTop, top);
    };
    ComboBox.prototype.items = function (newItems) {
        var self = this;
        if (arguments.length === 0) {
            return self._items;
        }
        if (newItems) {
            self._items = newItems;

            var divList = self._divList, child = void 0;
            $(divList).find('div').forEach(function (oldItem) {
                $(oldItem).unbind(mouseover_event).unbind(mouseout_event).unbind(click_event);
            });
            child = divList.firstChild;
            while (child) {
                _removeChild(divList, child);
                child = divList.firstChild;
            }
            self._itemCount = 0;

            for (var i = 0, length_2 = newItems.length; i < length_2; i++) {
                var item = newItems[i];
                self._addItem(_hasOwnProperty(item, STR_TEXT) ? item.text : item);
            }
            return self;
        }
    };
    ComboBox.prototype._addItem = function (item) {
        var self = this;
        var newItem = _createElement(STR_DIV);
        var spanText = _createElement(STR_SPAN);
        spanText.textContent = item.toString();
        spanText.style.padding = '0 ' + DROP_DOWN_ITEM_RIGHT_PADDING + 'px 0 ' + DROP_DOWN_ITEM_LEFT_PADDING + 'px';
        spanText.style.textOverflow = 'ellipsis';
        spanText.style.whiteSpace = 'nowrap';
        _appendChild(newItem, spanText);
        _appendChild(self._divList, newItem);
        self._itemCount++;
        $(newItem).bind(click_event, function () {
            var index = $(newItem).index();
            self.selectedIndex(index);
            self.closeDropDownList();
            self._trigger(END_EDIT_EVENT, { isMouse: true });
        }).bind(mouseover_event, function () {
            var $item = $(newItem);
            newItem.oldBackColor = $item.css(cssBackgroundColor);
            $item.css(cssBackgroundColor, self._hoverColor);
        }).bind(mouseout_event, function () {
            $(newItem).css(cssBackgroundColor, newItem.oldBackColor || '');
        }).css(cssMinWidth, self._hostMinWidth + 'px');
    };
    ComboBox.prototype._addMeasureSpan = function () {
        var self = this;


        self._measureSpan = _createElement(STR_SPAN);
        $(self._measureSpan).css([cssDisplay, cssFont], [cssNone, self._LIST.style.font]).appendTo(DOCUMENT.body);
    };
    ComboBox.prototype._removeMeasureSpan = function () {
        _removeChild(DOCUMENT.body, this._measureSpan);
    };
    ComboBox.prototype._measureTextWidth = function (text) {
        this._measureSpan.textContent = text;
        return $(this._measureSpan).width() + 2 + DROP_DOWN_ITEM_LEFT_PADDING;
    };
    ComboBox.prototype._setSelectedItemBackColor = function (color) {
        var self = this, index = self._selectedIndex;
        if (0 <= index && index < self._itemCount) {
            $(self._divList.children[index]).css(cssBackgroundColor, color);
        }
    };
    ComboBox.prototype._onKeydown = function (event) {
        var self = this;
        var keyCode = event.keyCode, which = event.which;
        if ((event.ctrlKey || event.shiftKey || event.altKey || event.metaKey ||

            (which === 37 || which === 39 )) && which !== 9 && self.editable()) {
            return;
        }
        var itemCount = self._itemCount;
        var selectedIndex = self._selectedIndex;
        var newSelectedIndex = 0;
        if (which === 38 || which === 40 ) {
            if (selectedIndex >= 0 && selectedIndex < itemCount) {
                newSelectedIndex = selectedIndex + (which === 38 ? -1 : 1);
            }
            if (newSelectedIndex >= 0 && newSelectedIndex < itemCount) {
                self.selectedIndex(newSelectedIndex);
            }
            if (self._isShown) {
                self._scrollToIndex(newSelectedIndex);
            }
            cancelDefault(event);
        }
        else if (which === 13 || which === 37 || which === 39 || which === 9 ) {
            self.selectedIndex(self._selectedIndex);
            self.closeDropDownList();
            self._trigger(END_EDIT_EVENT, { keyCode: keyCode, shiftKey: event.shiftKey });
            cancelDefault(event);
        }
        else if (which === 27 ) {
            self.closeDropDownList();
            self._trigger(END_EDIT_EVENT, { keyCode: keyCode });
            cancelDefault(event);
        }
        else if (!self.editable() && which === 32 ) {
            cancelDefault(event);
        }
    };
    ComboBox.prototype.getSelectedValue = function (selectedIndex, items, editorValueType) {
        var item = items[selectedIndex];
        var value;
        if (!isNullOrUndefined(item)) {
            if (editorValueType === 1 ) {
                value = selectedIndex;
            }
            else if (editorValueType === 0 ) {
                value = _hasOwnProperty(item, STR_TEXT) ? item.text : item;
            }
            else if (editorValueType === 2 && _hasOwnProperty(item, STR_VALUE)) {
                value = item.value;
            }
        }
        return value;
    };
    ComboBox.prototype._setSelectedIndexInternal = function (value) {
        var self = this;
        self._setSelectedItemBackColor('');
        self._selectedIndex = value;
        self._setSelectedItemBackColor(SELECTED_COLOR);
        self._scrollToIndex(value);
    };
    ComboBox.prototype.selectedIndex = function (index) {
        var self = this;
        if (arguments.length === 0) {
            return self._selectedIndex;
        }
        if (0 <= index && index < self._itemCount) {
            self._setSelectedIndexInternal(index);
            var value = self.getSelectedValue(self._selectedIndex, self._items, self._editorValueType);
            if (!isNullOrUndefined(value)) {
                self.editorValue(value);
            }
        }
    };
    ComboBox.prototype.itemCountPerPage = function (value) {
        if (arguments.length === 0) {
            return this._itemCountPerPage;
        }
        if (value > 0) {
            this._itemCountPerPage = value;
        }
    };
    ComboBox.prototype._measureText = function (text) {
        this._addMeasureSpan();
        var width = this._measureTextWidth(text);
        this._removeMeasureSpan();
        return width;
    };
    ComboBox.prototype.itemHeight = function (itemHeight) {
        if (arguments.length === 0) {
            return this._itemHeight;
        }
        if (itemHeight > 0) {
            this._itemHeight = itemHeight;
        }
    };
    ComboBox.prototype._updateItemHeight = function () {
        var self = this;
        self._addMeasureSpan();
        var firstItem = self._items[0];
        var actualItemHeight = Math_max(self._itemHeight, $(self._measureSpan).text(isNullOrUndefined(firstItem) ? '' : firstItem).height());
        $(self._divList.children).css(cssHeight, actualItemHeight);
        var height, itemCount = self._itemCount, itemCountPerPage = self._itemCountPerPage;
        if (itemCount <= itemCountPerPage) {
            height = itemCount * actualItemHeight;
        }
        else {
            height = itemCountPerPage * actualItemHeight;
            self._isNeedVScrollbar = true;
        }
        self.listHeight(height);
        self._removeMeasureSpan();
    };
    ComboBox.prototype._scrollToIndex = function (index) {
        if (index >= 0 && index < this._itemCount) {
            var child = this._divList.children[index];
            this._scrollablePanel._scrollChildIntoView(child);
        }
    };
    ComboBox.prototype.bind = function (type, data, fn) {
        $(this._DOMObject).bind(type, data, fn);
    };
    ComboBox.prototype.unbind = function (type, fn) {
        $(this._DOMObject).unbind(type, fn);
    };
    ComboBox.prototype._trigger = function (type, data) {
        $(this._DOMObject).trigger(type, data);
    };
    return ComboBox;
}());
function comboBox_setEditorDefaultCSS(elem) {
    $(elem).css(['margin', 'overflow', 'resize', cssPosition, 'padding', cssOutline, cssBackgroundColor, 'white-space', cssBoxSizing, cssBorder], [0, 'hidden', cssNone, cssAbsolute, COMBO_BOX_EDITOR_TOP_PADDING + 'px 0px 0px ' + COMBO_BOX_EDITOR_LEFT_PADDING + 'px', cssNone, cssWhite, 'nowrap', cssContentBox, cssNone])
        .attr(attrGcUIElement, 'gcComboBoxEditor').attr(attrTabIndex, -1);
}


var ComboBoxCellType = (function (_super) {
    __extends(ComboBoxCellType, _super);
    function ComboBoxCellType() {
        var _this_1 = _super.call(this) || this;
        _this_1.typeName = 7 + '';
        _this_1._autoFormatValue = false;
        _this_1._hasInPlaceEditor = false;
        var self = _this_1;
        $_each(comboBoxCellTypePropertyDict, function (p, v) {
            if (p === 'items') {
                v = [];
            }
            self['_' + p] = v;
        });
        return _this_1;
    }
    ComboBoxCellType.prototype.isReservedKey = function (e, context) {
        return this._hasInPlaceEditor;
    };
    ComboBoxCellType.prototype.paintValue = function (ctx, value, x, y, w, h, style, options) {
        var self = this, sheet = options.sheet, zoom = sheet.zoom ? sheet.zoom() : 1, btnWidth = DefaultDropDownButtonWidth, txtWidth = Math_max(0, w - btnWidth - 1);

        if (style.hAlign === 3 ) {
            style.hAlign = 0 ;
        }

        if (style.wordWrap) {
            style.wordWrap = false;
        }
        var isPrinting = options.isPrinting, printZoomFactor = options.printZoomFactor;
        if (isPrinting && typeof printZoomFactor === 'number' && printZoomFactor !== 1) {
            zoom = printZoomFactor;
        }

        if (txtWidth > 0 && h > 0) {
            var formattedData = {}, text = void 0;
            options.quotePrefix = style.quotePrefix;
            var hasFormat = style.formatter && style.formatter !== 'General';
            var hasAutoFormat = style._autoFormatter && style._autoFormatter.formatCached && style._autoFormatter.formatCached !== 'General';
            var format = void 0;
            var itemValue = this.getItemValue(value);
            if (hasFormat) {
                format = style.formatter;
            }
            else if (hasAutoFormat) {
                format = style._autoFormatter;
            }
            else {
                format = Core_1.CellTypes.Context._getFormatForNumberValue(ctx, itemValue, txtWidth + 1, style, zoom);
            }
            text = this.format(convertRichTextValue(value), format, formattedData, options);
            if (text) {
                var rect = new Core_1.Rect(x, y, w, h);
                _super.prototype.adjustRectForIconSet.call(this, style.hAlign, options.sheet, options.row, options.col, options.sheetArea, rect, (formattedData.content && _super.prototype.hasInfilling.call(this, formattedData.content)));
                x = rect.x;
                w = rect.width;
                var isVerticalText = style.isVerticalText;
                if (isNeedUseSymbolFormDataType(itemValue) && !isVerticalText && style.shrinkToFit !== true) {
                    var tempText = Core_1.CellTypes.Context._changeTextToSymbol(ctx, text, txtWidth + 1, style, zoom);
                    if (text !== tempText) {
                        delete formattedData.content;
                        style.textIndent = 0;
                    }
                    text = tempText;
                }
                this.paintText(ctx, self.getText(value, options), x, y, txtWidth, h, style, options, text, formattedData);
            }
        }

        ctx.save();
        if (btnWidth > w || btnWidth > h) {
            ctx.rect(x, y, w, h);
            ctx.clip();
        }
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillStyle = cssBlack;
        ctx.moveTo(x + w - btnWidth + 3, y + (h - 2) / 2 - 2.5);
        ctx.lineTo(x + w - btnWidth + 6, y + (h - 2) / 2 + 3.5);
        ctx.lineTo(x + w - btnWidth + 9, y + (h - 2) / 2 - 2.5);
        ctx.fill();
        ctx.restore();
    };

    ComboBoxCellType.prototype.getText = function (value, options) {
        return value;
    };
    ComboBoxCellType.prototype.createEditorElement = function (context, cellWrapperElement) {
        var sheet = context && context.sheet;
        var parent = sheet && sheet.parent, host = parent && parent._host;
        var zindex = Core_util._getPreferredZIndex(host) + 1000;
        var defaults = sheet.defaults;
        var self = this;
        var padding = sheet.getActualStyle(context.row, context.col).cellPadding;
        var paddingLeft = 0;
        if (padding) {
            paddingLeft = parseFloat(padding.split(' ')[3] ) || 0;
        }
        var minWidth = 0;
        var spanRange = sheet.getSpan(context.row, context.col);
        if (spanRange) {
            minWidth = getVisibleDistance(sheet, spanRange.col, spanRange.col + spanRange.colCount, false);
        }
        else {
            minWidth = sheet._getZoomColumnWidth(context.col) - paddingLeft;
        }
        var comboBox = new ComboBox(cellWrapperElement, 0, 0, defaults.colWidth, defaults.rowHeight, zindex, minWidth);
        comboBox.editorValueType(self._editorValueType);
        comboBox.items(self._items);
        comboBox.itemHeight(self._itemHeight);
        comboBox.itemCountPerPage(self._maxDropDownItems);
        comboBox.editable(self._editable);
        var editor = comboBox.getComboBox();

        Object.defineProperty(editor, 'comboBox', {
            get: function () {
                return this._combo;
            },
            set: function (value) {
                if (this._combo !== value) {
                    if (this._combo) {
                        this._combo.dispose();
                    }

                    this._combo = value;
                }
            }
        });
        editor.comboBox = comboBox;
        return keyword_null;
    };
    ComboBoxCellType.prototype.getEditorValue = function (editorContext, context) {
        var comboBox = getComboBoxOnElement(editorContext);
        if (comboBox) {
            this._autoFormatValue = !comboBox._isEditorValueInItems;
        }
        return comboBox && comboBox.editorValue();
    };
    ComboBoxCellType.prototype.setEditorValue = function (editorContext, value, context) {
        var comboBox = getComboBoxOnElement(editorContext);
        if (comboBox) {
            comboBox.editorValue(value);
        }
    };
    ComboBoxCellType.prototype.focus = function (editorContext, context) {
        var comboBox = getComboBoxOnElement(editorContext);
        if (comboBox) {
            comboBox.focus();
        }
    };
    ComboBoxCellType.prototype.selectAll = function (editorContext, context) {
        var comboBox = getComboBoxOnElement(editorContext);
        if (comboBox) {
            comboBox.selectAll();
        }
    };
    ComboBoxCellType.prototype.activateEditor = function (editorContext, cellStyle, cellRect, context) {
        var self = this, sheet = context.sheet;
        var comboBox = getComboBoxOnElement(editorContext);
        if (comboBox) {
            comboBox.editorValueType(self._editorValueType);
            comboBox.items(self._items);
            comboBox.itemHeight(self._itemHeight);
            comboBox.itemCountPerPage(self._maxDropDownItems);
            comboBox.editable(self._editable);
            comboBox.bind(END_EDIT_EVENT, function (event, args) {
                var keyCode = args.keyCode, shiftKey = args.shiftKey;
                if (keyCode) {
                    var commands = sheet._commandManager();
                    var shortcutKey = commands.getShortcutKey(keyCode, false, shiftKey || false, false, false);
                    var cmds = commands.getCommands(shortcutKey);
                    if (cmds) {
                        for (var i = 0, l = cmds.length; i < l; i++) {
                            if (cmds[i]._name === 'navigationLeft' || cmds[i]._name === 'navigationRight') {
                                sheet._editorStatus = 1 ;
                            }
                            if (cmds[i].execute(sheet.parent, { sheetName: sheet.name() })) {
                                return true;
                            }
                        }
                    }
                }
                else if (args.isMouse && comboBox._isDisplayMode) {
                    sheet.endEdit();
                }
            });
        }
        self._hasInPlaceEditor = true;
    };
    ComboBoxCellType.prototype.deactivateEditor = function (editorContext, context) {
        if (editorContext) {
            var comboBox = getComboBoxOnElement(editorContext);
            if (comboBox) {
                var padding = context.sheet.getActualStyle(context.row, context.col, context.sheetArea).cellPadding;
                if (padding) {
                    var position = [cssLeft, cssTop];
                    var positionIndex = [3, 0];
                    for (var i = 0; i < position.length; i++) {
                        var offsetValue = parseInt(getCellOffsetArray(padding)[positionIndex[i]], 10);
                        offsetValue = (typeof offsetValue === const_number) && (offsetValue > 0) ? offsetValue : 0;
                        comboBox.shiftPadding(position[i], offsetValue);
                    }
                }
                comboBox.unbind(END_EDIT_EVENT);
                comboBox.closeDropDownList();
                comboBox._isDisplayMode = false;
            }
        }
        this._hasInPlaceEditor = false;
    };
    ComboBoxCellType.prototype.updateImeMode = function (editorContext, imeMode) {
        if (this.isImeAware()) {
            var comboBox = getComboBoxOnElement(editorContext);
            if (comboBox) {
                comboBox.updateImeMode(imeMode);
            }
        }
    };
    ComboBoxCellType.prototype.updateEditor = function (editorContext, cellStyle, cellRect, context) {
        var sheet = editorContext && context && context.sheet;
        if (!sheet) {
            return;
        }
        var comboBox = getComboBoxOnElement(editorContext);
        if (cellStyle && comboBox) {
            var render = sheet._render;
            comboBox.updateStyle(cellStyle.backColor, cellStyle.foreColor, render._getZoomFont(cellStyle.font || render._getDefaultFont()));
        }
        if (cellRect && comboBox) {
            comboBox.updateLocationAndSize(cellRect.x, cellRect.y, cellRect.width, cellRect.height);
        }
    };
    ComboBoxCellType.prototype.format = function (value, format, conditionalForeColor, context) {
        if (isNullOrUndefined(value)) {
            return '';
        }
        var self = this;
        var itemValue = self.getItemValue(value);
        return BaseCellType.prototype.format.call(self, itemValue, format, conditionalForeColor);
    };
    ComboBoxCellType.prototype.getItemValue = function (value) {
        var self = this, editorValueType = self._editorValueType, items = self._items, item, itemValue;
        if (items) {
            var count = items.length;
            if (editorValueType === 1 ) {
                var index = convertToInt(value);
                if (0 <= index && index < count) {
                    item = items[index];
                    if (item !== keyword_undefined && item !== keyword_null) {
                        itemValue = _hasOwnProperty(item, STR_TEXT) ? item.text : item;
                        return itemValue;
                    }
                }
            }
            else if (editorValueType === 2 ) {
                for (var i = 0; i < count; i++) {
                    item = items[i];
                    if (item && _hasOwnProperty(item, STR_VALUE) && item.value === value) {
                        itemValue = item.text;
                        return itemValue;
                    }
                }
            }
        }
        return value;
    };
    ComboBoxCellType.prototype.parse = function (text, formatStr, context) {
        var self = this, editorValueType = self._editorValueType, items = self._items, item, i;
        var parseText = BaseCellType.prototype.parse.call(self, text, formatStr);
        if (items) {
            var count = items.length;
            if (editorValueType === 0 ) {
                return parseText;
            }
            else if (editorValueType === 1 ) {
                for (i = 0; i < count; i++) {
                    item = items[i];
                    if (item && _hasOwnProperty(item, STR_TEXT) && item.text === parseText || item === parseText) {
                        return i;
                    }
                }
            }
            else if (editorValueType === 2 ) {
                for (i = 0; i < count; i++) {
                    item = items[i];
                    if (item && _hasOwnProperty(item, STR_TEXT) && item.text === parseText) {
                        return item.value;
                    }
                }
            }
        }
        return parseText;
    };
    ComboBoxCellType.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
        if (!context) {
            return keyword_null;
        }
        var sheetArea = context.sheetArea, sheet = context.sheet;
        if ((isNullOrUndefined(sheetArea) || sheetArea === 3 ) && cellRect) {
            var cellPaddings = getCellOffsetArray(cellStyle.cellPadding);
            var rightCellPadding = parseInt(cellPaddings[1], 10) || 0;
            var x2 = cellRect.x + cellRect.width - rightCellPadding;
            var info = {
                x: x,
                y: y,
                row: context.row,
                col: context.col,
                cellStyle: cellStyle,
                cellRect: cellRect,
                sheetArea: sheetArea,
                sheet: sheet
            };
            if (x2 - DefaultDropDownButtonWidth <= x && x < x2) {
                info.isReservedLocation = true;
                return info;
            }
        }
        return keyword_null;
    };
    ComboBoxCellType.prototype.processMouseDown = function (hitInfo) {
        var sheet = hitInfo.sheet, sheetArea = hitInfo.sheetArea;
        if ((isNullOrUndefined(sheetArea) || sheetArea === 3 ) && hitInfo.isReservedLocation && sheet) {
            if (hitInfo.row !== sheet._activeRowIndex || hitInfo.col !== sheet._activeColIndex) {
                sheet.setActiveCell(hitInfo.row, hitInfo.col);
            }
            sheet.startEdit();
            var comboBox = getComboBoxOnElement(sheet._editor);
            if (comboBox) {
                if (Core_util._browser.mozilla) {
                    comboBox._showTime = new Date().valueOf();
                }
                comboBox.showDropDownList();
                comboBox._isDisplayMode = true;
            }
        }
        return;
    };
    ComboBoxCellType.prototype.getAutoFitWidth = function (value, text, cellStyle, zoomFactor, context) {
        if (cellStyle && cellStyle.wordWrap) {
            cellStyle.wordWrap = false;
        }
        var width = Core_1.CellTypes.Context._getAutoFitWidth(value, text, cellStyle, zoomFactor, context);
        return width + DefaultDropDownButtonWidth;
    };
    ComboBoxCellType.prototype.getAutoFitHeight = function (value, text, cellStyle, zoomFactor, context) {
        if (cellStyle && cellStyle.wordWrap) {
            cellStyle.wordWrap = false;
        }
        return Core_1.CellTypes.Context._getAutoFitHeight(value, text, cellStyle, zoomFactor, context);
    };
    ComboBoxCellType.prototype.isImeAware = function (context) {
        return true;
    };
    ComboBoxCellType.prototype._cloneCellType = function () {
    };
    ComboBoxCellType.prototype._fromOptions = function (options) {
        var json = {
            editorValueType: options.editorValueType && EditorValueType[options.editorValueType],
            items: options.items,
            itemHeight: options.itemHeight,
            maxDropDownItems: options.maxDropDownItems,
            editable: options.editable
        };
        this.fromJSON(json);
    };
    ComboBoxCellType.prototype.toJSON = function () {
        var self = this;
        var dataDic = { typeName: self.typeName }, currentValue;
        $_each(comboBoxCellTypePropertyDict, function (p, v) {
            currentValue = self['_' + p];
            var isNotDefaultValue = p === 'items' ? currentValue && currentValue.length > 0 : currentValue !== v;
            if (isNotDefaultValue) {
                dataDic[p] = currentValue;
            }
        });
        return dataDic;
    };
    ComboBoxCellType.prototype.fromJSON = function (settings) {
        var self = this;
        $_each(comboBoxCellTypePropertyDict, function (p) {
            var jsonValue = settings[p];
            if (!isNullOrUndefined(jsonValue)) {
                self['_' + p] = jsonValue;
            }
        });
    };
    return ComboBoxCellType;
}(BaseCellType));
exports.ComboBox = ComboBoxCellType;
function getCellOffsetArray(cellPadding) {
    var retArray = ['0', '0', '0', '0'];
    if (typeof cellPadding === const_string) {
        var offsetArray = cellPadding.split(' ', 4), length_3 = offsetArray.length, topOffset = void 0, rightOffset = void 0;
        if (length_3 === 1) {
            topOffset = offsetArray[0];
            retArray = [topOffset, topOffset, topOffset, topOffset];
        }
        else if (length_3 === 2) {
            topOffset = offsetArray[0];
            rightOffset = offsetArray[1];
            retArray = [topOffset, rightOffset, topOffset, rightOffset];
        }
        else if (length_3 === 3) {
            rightOffset = offsetArray[1];
            retArray = [offsetArray[0], rightOffset, offsetArray[2], rightOffset];
        }
        else if (length_3 === 4) {
            retArray = [offsetArray[0], offsetArray[1], offsetArray[2], offsetArray[3]];
        }
    }
    return retArray;
}
function _hasOwnProperty(obj, p) {
    return obj.hasOwnProperty(p);
}
$_each(comboBoxCellTypePropertyDict, function (p) {
    ComboBoxCellType.prototype[p] = function (value) {
        if (arguments.length === 0) {
            return this['_' + p];
        }
        this['_' + p] = value;
        return this;
    };
});

Core_1.CellTypes._typeDict[7 ] = ComboBoxCellType;
/***/ }),

/***/ './dist/plugins/celltype/dropdown-action.js':
/*!**************************************************!*\
  !*** ./dist/plugins/celltype/dropdown-action.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';


Object.defineProperty(exports, '__esModule', { value: true });
var Core_1 = __webpack_require__(/*! Core */ 'Core');
exports.commands = Core_1.Commands;
var calculator_1 = __webpack_require__(/*! ./editor/calculator */ './dist/plugins/celltype/editor/calculator.js');
var listControl_1 = __webpack_require__(/*! ./editor/listControl */ './dist/plugins/celltype/editor/listControl.js');
var slider_1 = __webpack_require__(/*! ./editor/slider */ './dist/plugins/celltype/editor/slider.js');
var timepicker_1 = __webpack_require__(/*! ./editor/timepicker */ './dist/plugins/celltype/editor/timepicker.js');
var monthPicker_1 = __webpack_require__(/*! ./editor/monthPicker */ './dist/plugins/celltype/editor/monthPicker.js');
var colorpicker_1 = __webpack_require__(/*! ./editor/colorpicker */ './dist/plugins/celltype/editor/colorpicker.js');
var popupControl_1 = __webpack_require__(/*! ./editor/popupControl */ './dist/plugins/celltype/editor/popupControl.js');
var calendar_1 = __webpack_require__(/*! ./editor/calendar */ './dist/plugins/celltype/editor/calendar.js');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var baseControl_1 = __webpack_require__(/*! ./editor/baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var workflowPicker_1 = __webpack_require__(/*! ./editor/workflowPicker */ './dist/plugins/celltype/editor/workflowPicker.js');
var multiColumnPicker_1 = __webpack_require__(/*! ./editor/multiColumnPicker */ './dist/plugins/celltype/editor/multiColumnPicker.js');
var util_1 = __webpack_require__(/*! util */ './node_modules/util/util.js');
var _NumberHelper = Common_1.Common._NumberHelper;
var _DateTimeHelper = Common_1.Common._DateTimeHelper;
var keyword_null = null;
var WINDOW = window;
var gcGlobal = WINDOW._gcGlobal;
var OPENCOLORPICKER = 'openColorPicker';
var OPENCALENDAR = 'openDateTimePicker';
var OPENTIME = 'openTimePicker';
var OPENCALCULATOR = 'openCalculator';
var OPENMONTH = 'openMonthPicker';
var OPENLIST = 'openList';
var OPENSLIDER = 'openSlider';
var OPENWORKFLOW = 'openWorkflowList';
var OPENMULTICOLUMN = 'openMultiColumn';
var DOCUMENT = document;
var cellButtonParam = '_cellButtonParam';
function createElement(tagName, options) {
    return DOCUMENT.createElement(tagName, options);
}
function getSpecificCommand(commandName) {
    return {
        canUndo: false,
        execute: function (context, options, isUndo) {
            var sheet = Core_1._getSheetFromName(context, options.sheetName);
            if (!sheet || context._getActiveSheetOrSheetTab().name() !== options.sheetName) {
                return false;
            }
            var rowIndex = options.row;
            var colIndex = options.col;

            if (util_1.isNullOrUndefined(rowIndex) || util_1.isNullOrUndefined(colIndex)) {
                rowIndex = sheet.getActiveRowIndex();
                colIndex = sheet.getActiveColumnIndex();
            }
            var sheetArea = options.sheetArea;
            if (util_1.isNullOrUndefined(sheetArea)) {
                sheetArea = 3;
            }
            if (rowIndex < 0 || rowIndex >= sheet.getRowCount(sheetArea) || colIndex < 0 || colIndex >= sheet.getColumnCount(sheetArea)) {
                return false;
            }
            sheet.showCell(rowIndex, colIndex, Core_1.VerticalPosition.nearest, Core_1.HorizontalPosition.nearest);
            var rowViewportIndex = sheetArea === 1 ? -1 : undefined;
            var colCiewportIndex = sheetArea === 2 ? -1 : undefined;
            var cellRect = sheet.getCellRect(rowIndex, colIndex, rowViewportIndex, colCiewportIndex);
            var div = createElement('div');
            var value = queryCellValue(sheet, rowIndex, colIndex, sheetArea);
            var control;

            if (util_1.isNullOrUndefined(options.row) || util_1.isNullOrUndefined(options.col)) {
                options.row = sheet.getActiveRowIndex();
                options.col = sheet.getActiveColumnIndex();
            }
            switch (commandName) {
                case OPENCOLORPICKER:
                    control = new colorpicker_1.ColorPicker(div);
                    break;
                case OPENCALENDAR:
                    value = transferValue(value, 'date');
                    control = new calendar_1.Calendar(div);
                    break;
                case OPENTIME:
                    value = transferValue(value, 'date');
                    control = new timepicker_1.TimePicker(div);
                    break;
                case OPENCALCULATOR:
                    value = transferValue(value, 'number');
                    value = value.toString();
                    control = new calculator_1.Calculator(div);
                    break;
                case OPENMONTH:
                    value = transferValue(value, 'date');
                    control = new monthPicker_1.MonthPicker(div);
                    break;
                case OPENLIST:
                    control = new listControl_1.List(div);
                    control.formula = sheet.getFormula(options.row, options.col);
                    break;
                case OPENSLIDER:
                    value = transferValue(value, 'number');
                    control = new slider_1.Slider(div);
                    break;
                case OPENWORKFLOW:
                    control = new workflowPicker_1.WorkFlow(div);
                    if (typeof (value) !== 'string' && value !== keyword_null) {
                        value = value.toString();
                    }
                    break;
                case OPENMULTICOLUMN:
                    control = new multiColumnPicker_1.MultiColumn(div, keyword_null, sheet);
                    break;
            }
            popupDropdown(control, commandName, value, cellRect, sheet, options);
            return true;
        }
    };
}


Core_1.Commands[OPENCOLORPICKER] = getSpecificCommand(OPENCOLORPICKER);


Core_1.Commands[OPENCALENDAR] = getSpecificCommand(OPENCALENDAR);


Core_1.Commands[OPENTIME] = getSpecificCommand(OPENTIME);


Core_1.Commands[OPENCALCULATOR] = getSpecificCommand(OPENCALCULATOR);


Core_1.Commands[OPENMONTH] = getSpecificCommand(OPENMONTH);


Core_1.Commands[OPENLIST] = getSpecificCommand(OPENLIST);


Core_1.Commands[OPENSLIDER] = getSpecificCommand(OPENSLIDER);


Core_1.Commands[OPENWORKFLOW] = getSpecificCommand(OPENWORKFLOW);


Core_1.Commands[OPENMULTICOLUMN] = getSpecificCommand(OPENMULTICOLUMN);
function queryCellValue(sheet, rowIndex, colIndex, sheetArea) {
    if (sheet.isEditing()) {
        var ct = sheet.getCellType(rowIndex, colIndex);
        var context = {
            sheet: sheet,
            row: rowIndex,
            col: colIndex,
            sheetArea: sheetArea
        };
        return ct.getEditorValue(sheet._editor, context);
    }
    else {
        return sheet.getValue(rowIndex, colIndex, sheetArea);
    }
}
function transferValue(value, type) {
    if (type === 'date') {
        if (typeof (value) === 'string') {
            value = _DateTimeHelper._parseLocale(value);
            if (value === keyword_null) {
                value = new Date();
            }
        }
        else if (!(value instanceof Date)) {
            value = new Date();
        }
    }
    else if (type === 'number') {
        if (typeof (value) === 'string') {
            value = _NumberHelper._parseLocale(value);
        }
        else if (typeof (value) !== 'number') {
            value = 0;
        }
    }
    return value;
}
function submitDropDownEditorValue(sheet, dropdownConfig, options, value) {
    var row = options.row;
    var col = options.col;

    if (util_1.isNullOrUndefined(row) || util_1.isNullOrUndefined(col)) {
        row = sheet.getActiveRowIndex();
        col = sheet.getActiveColumnIndex();
    }
    var sheetArea = options.sheetArea;
    if (util_1.isNullOrUndefined(sheetArea)) {
        sheetArea = 3;
    }
    if (dropdownConfig && dropdownConfig.submitCommand) {
        if (typeof dropdownConfig.submitCommand === 'string') {
            sheet.getParent().commandManager().execute({
                cmd: dropdownConfig.submitCommand,
                sheetName: sheet.name(),
                row: row,
                col: col,
                newValue: value.value,
            });
        }
        else if (typeof dropdownConfig.submitCommand === 'function') {
            var option = {};
            option.row = options.row;
            option.col = options.col;
            option.sheetArea = sheetArea;
            dropdownConfig.submitCommand.call(null, sheet, value.value, option);
        }
    }
    else {
        sheet.getParent().commandManager().execute({
            cmd: 'editCell',
            sheetName: sheet.name(),
            row: row,
            col: col,
            newValue: value.text,
            autoFormat: !value.noAutoFormat,
            sheetArea: sheetArea,
            isUndo: false
        });
        if (sheet.isEditing() && sheet._activeColIndex === col && sheet._activeRowIndex === row) {
            var ct = sheet.getCellType(row, col);
            var context = {
                sheet: sheet,
                row: row,
                col: col,
                sheetArea: Core_1.SheetArea.viewport
            };
            var cellStyle = sheet._getActualStyleImp(row, col, sheetArea);
            var cellRect = sheet.getCellRect(row, col);
            sheet._editor._originalValue = value.value;
            ct.updateEditor(sheet._editor, cellStyle, cellRect, context);
            ct.setEditorValue(sheet._editor, value.text, context);
        }
    }
}
function getType(commandName) {
    var type = -1;
    switch (commandName) {
        case OPENCOLORPICKER:
            type = Core_1.DropDownType.colorPicker;
            break;
        case OPENCALENDAR:
            type = Core_1.DropDownType.dateTimePicker;
            break;
        case OPENTIME:
            type = Core_1.DropDownType.timePicker;
            break;
        case OPENCALCULATOR:
            type = Core_1.DropDownType.calculator;
            break;
        case OPENMONTH:
            type = Core_1.DropDownType.monthPicker;
            break;
        case OPENLIST:
            type = Core_1.DropDownType.list;
            break;
        case OPENSLIDER:
            type = Core_1.DropDownType.slider;
            break;
        case OPENWORKFLOW:
            type = Core_1.DropDownType.workflowList;
            break;
        case OPENMULTICOLUMN:
            type = Core_1.DropDownType.multiColumn;
            break;
    }
    return type;
}

function _resetCellButtonsStatus(sheet, style, row, col, sheetArea) {
    var cellButtons = style.cellButtons;
    if (sheet && cellButtons && cellButtons.length > 0) {
        var params = sheet._modelManager.getValueForKey(row, col, cellButtonParam, sheetArea);
        if (params && params.isMouseDownReservedLocation) {
            params.buttonDownIndex = -1;
            params.isMouseDownReservedLocation = false;
            sheet.repaint(sheet.getCellRect(row, col));
        }
    }
}
var existPopupControlCount = 0;
function popupDropdown(control, commandName, value, cellRect, sheet, options) {
    gcGlobal._suspendEvent();
    var hostElement = sheet._getHost();
    var ctrlOption = {};
    var row = options.row, col = options.col, sheetArea = options.sheetArea;
    var style = sheet._getActualStyleImp(row, col, sheetArea);
    var type = getType(commandName);
    var dropDowns = style.dropDowns;
    var dropdownConfig;
    var isDropDowns;
    var cellType = style.cellType;
    if (cellType && cellType.getWidgetOption) {
        dropdownConfig = cellType.getWidgetOption();
        ctrlOption = dropdownConfig.option;
        isDropDowns = dropdownConfig.isDropDowns;
    }
    else {
        isDropDowns = dropDowns && dropDowns.length > 0;
        if (isDropDowns) {
            var dropdown = dropDowns.filter(function (s) { return s.type === type; })[0];
            if (dropdown) {
                if (dropdown.option !== undefined && dropdown.option !== null) {
                    ctrlOption = Common_1.Common._Types._extend({}, dropdown.option);
                }
                dropdownConfig = dropdown;
            }
        }
    }
    control.setOptions(ctrlOption);
    control.setValue(value);
    var rect = hostElement.getBoundingClientRect();
    var clientRect = new popupControl_1.Rectangle(cellRect.x + rect.left, cellRect.y + rect.top, cellRect.width, cellRect.height);
    var option = {
        align: popupControl_1.DropDownAlignment.Far,
        hostElement: hostElement,
        commandName: commandName,
    };
    if (ctrlOption.align !== undefined) {
        option.align = ctrlOption.align;
    }
    if (ctrlOption.inheritWith !== undefined) {
        option.inheritWith = ctrlOption.inheritWith;
    }
    var currentPop = new popupControl_1.PopupControl(control.getContainer(), clientRect, option);
    existPopupControlCount += 1;
    if (isDropDowns) {
        control._recalcSize();
    }
    currentPop.open();
    control.scrollToSelect();
    if (isDropDowns) {
        control.refresh();
    }
    control.on(baseControl_1.BaseDropdown.Event_ValueChanged, function (v) {
        if (!v.notCloseDropDown) {
            currentPop.close();
        }
        if (shouldSubmitValue(options, v)) {
            submitDropDownEditorValue(sheet, dropdownConfig, options, v);
        }
    });
    var spread = sheet.parent;
    if (spread) {
        spread._currentDialogs = spread._currentDialogs || [];
        spread._currentDialogs.push(currentPop);
    }
    control.getContainer().addEventListener('contextmenu', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
    });
    currentPop.on('close', function () {
        _resetCellButtonsStatus(sheet, style, row, col, sheetArea);
        if (control) {
            control.dispose();
        }
        existPopupControlCount -= 1;
        currentPop = null;
        var index = spread._currentDialogs.indexOf(currentPop);
        spread._currentDialogs.splice(index, 1);
        gcGlobal._resumeEvent();
    });
}
function shouldSubmitValue(options, value) {
    if (value.notSubmit === true) {
        return false;
    }

    if (options.sheetArea !== 3 && options.cmd === OPENCALCULATOR) {
        return !isNaN(value.value);
    }
    return true;
}
var ssAdapter = {
    init: function () {
        this.commandManager().register(OPENCOLORPICKER, Core_1.Commands[OPENCOLORPICKER]);
        this.commandManager().register(OPENCALENDAR, Core_1.Commands[OPENCALENDAR]);
        this.commandManager().register(OPENTIME, Core_1.Commands[OPENTIME]);
        this.commandManager().register(OPENCALCULATOR, Core_1.Commands[OPENCALCULATOR]);
        this.commandManager().register(OPENMONTH, Core_1.Commands[OPENMONTH]);
        this.commandManager().register(OPENLIST, Core_1.Commands[OPENLIST]);
        this.commandManager().register(OPENSLIDER, Core_1.Commands[OPENSLIDER]);
        this.commandManager().register(OPENWORKFLOW, Core_1.Commands[OPENWORKFLOW]);
        this.commandManager().register(OPENMULTICOLUMN, Core_1.Commands[OPENMULTICOLUMN]);
    },
};
Core_1.Workbook._registerFeature('registerOpendropdownCommand', ssAdapter);
Core_1.Worksheet._registerFeature('registerOpendropdownCommand', {
    preProcessMouseWheel: function (argObj) {
        if (existPopupControlCount > 0 && !this._isDropdownSheet) {
            argObj.r = true;
        }
    },
});
/***/ }),

/***/ './dist/plugins/celltype/editor/baseControl.js':
/*!*****************************************************!*\
  !*** ./dist/plugins/celltype/editor/baseControl.js ***!
  \*****************************************************/
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
var eventbase_1 = __webpack_require__(/*! ./eventbase */ './dist/plugins/celltype/editor/eventbase.js');
var BaseControl = (function (_super) {
    __extends(BaseControl, _super);
    function BaseControl(_container ) {
        var _this = _super.call(this) || this;
        _this._container = _container;
        return _this;
    }
    BaseControl.prototype.init = function (tag, className, attributes) {
        this._host = this._container.querySelector('.' + className);
        if (this._host) {
            this.RemoveChilds(this._host);
        }
        else {
            this._host = this.CreateElement(tag, className, attributes);
            this._container.appendChild(this._host);
        }
    };
    BaseControl.prototype.GetContainer = function () {
        return this._container;
    };
    BaseControl.prototype.RemoveChilds = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    BaseControl.prototype.CreateElement = function (tag, className, attributes, parentElement) {
        var newEle = document.createElement(tag);
        if (className) {
            newEle.className = className;
        }
        if (attributes) {
            for (var key in attributes) {
                if (attributes[key]) {
                    newEle.setAttribute(key, attributes[key]);
                }
            }
        }
        if (parentElement) {
            parentElement.appendChild(newEle);
        }
        return newEle;
    };
    return BaseControl;
}(eventbase_1.EventBase));
exports.BaseControl = BaseControl;
var BaseDropdown = (function (_super) {
    __extends(BaseDropdown, _super);
    function BaseDropdown(_host) {
        var _this = _super.call(this) || this;
        _this._host = _host;
        return _this;
    }
    BaseDropdown.prototype.updateStyle = function (backColor, foreColor, font) { };
    BaseDropdown.prototype.scrollToSelect = function () { };
    BaseDropdown.prototype.getContainer = function () {
        return this._host;
    };
    BaseDropdown.prototype.refresh = function () { };
    BaseDropdown.prototype._recalcSize = function () { };
    BaseDropdown.prototype.dispose = function () { };
    BaseDropdown.Event_ValueChanged = 'ValueChangedEvent';
    return BaseDropdown;
}(eventbase_1.EventBase));
exports.BaseDropdown = BaseDropdown;
/***/ }),

/***/ './dist/plugins/celltype/editor/baseSpreadPicker.js':
/*!**********************************************************!*\
  !*** ./dist/plugins/celltype/editor/baseSpreadPicker.js ***!
  \**********************************************************/
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
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var util_1 = __webpack_require__(/*! util */ './node_modules/util/util.js');
var MATH_MIN = Math.min, MATH_MAX = Math.max;
var keyword_null = null;
var BASE_SPREAD_NS = '.baseSpreadNS';
var MAX_WIDTH = 800, MAX_HEIGHT = 400, MIN_HEIGHT = 100;
var BaseSpreadPicker = (function (_super) {
    __extends(BaseSpreadPicker, _super);
    function BaseSpreadPicker(container, option, contextSheet) {
        var _this = _super.call(this, container) || this;
        _this.setOptions(option);
        _this._contextSheet = contextSheet;
        return _this;
    }
    BaseSpreadPicker.prototype.setOptions = function (option) {
        var self = this;
        self._option = option;
        if (!option) {
            return;
        }
        var container = self._host;
        var spreadContainer = document.createElement('div');
        spreadContainer.setAttribute('class', 'gc-base-spread-div');
        container.appendChild(spreadContainer);
        this._spreadContainer = spreadContainer;
        this._dropdownSpread = this._initDropdownSpread(spreadContainer);
    };
    BaseSpreadPicker.prototype.setValue = function (data) {
        var self = this;
        if (!self._option) {
            return;
        }
        var dropdownSpread = self._dropdownSpread;
        setTimeout(function () {
            var gcGlobal = window._gcGlobal;
            gcGlobal._resumeEvent();
            dropdownSpread && dropdownSpread.focus(true);
        }, 1000);
    };
    BaseSpreadPicker.prototype._recalcSize = function () {
        var self = this;
        if (!self._spreadContainer) {
            return;
        }
        var host = self._host, option = self._option;
        var width, height;
        if (option) {
            width = option.width;
            height = option.height;
        }
        var hostSize = self._getHostSize(width, height);
        if (util_1.isNullOrUndefined(width)) {
            width = hostSize.width;
        }
        if (util_1.isNullOrUndefined(height)) {
            height = hostSize.height;
        }
        Core_1.GC$(host).width(width).height(height);
    };
    BaseSpreadPicker.prototype.refresh = function () {
        this._dropdownSpread && this._dropdownSpread.refresh();
    };
    BaseSpreadPicker.prototype.dispose = function () {
        var self = this;
        if (self._contextSheet) {
            self._contextSheet._setFocus();
            self._contextSheet = keyword_null;
        }
        if (self._spreadContainer) {
            self._spreadContainer = keyword_null;
        }
        if (self._dropdownSpread) {
            self._dropdownSpread.unbind(Core_1.Events.DropdownSpreadMouseClick + BASE_SPREAD_NS);
            self._dropdownSpread.unbind(Core_1.Events.DropdownSpreadKeyboardEnter + BASE_SPREAD_NS);
            self._dropdownSpread._dispose();
            self._dropdownSpread = keyword_null;
        }
    };
    BaseSpreadPicker.prototype._getHostSize = function (optionWidth, optionHeight) {
        var self = this, dropdownSpread = self._dropdownSpread, sheet = dropdownSpread.getActiveSheet(), colCount = sheet.getColumnCount();
        var resultWidth = 0;
        for (var i = 0; i < colCount; i++) {
            resultWidth += sheet.getColumnWidth(i, 3 );
        }
        var actualWidth = resultWidth;
        var rowCount = sheet.getRowCount(3 ) + sheet.getRowCount(1 );
        var actualHeight = sheet.getRowHeight(0, 3 ) * rowCount;
        if ((actualWidth < MAX_WIDTH && util_1.isNullOrUndefined(optionWidth)) || actualWidth <= optionWidth) {
            dropdownSpread.options.showHorizontalScrollbar = false;
        }
        else {
            var hScrollBarHeight = 0;
            if (dropdownSpread._hScrollbar) {
                hScrollBarHeight = dropdownSpread._hScrollbar._height();
            }
            actualHeight += hScrollBarHeight;
        }
        if ((actualHeight < MAX_HEIGHT && util_1.isNullOrUndefined(optionHeight)) || actualHeight < optionHeight) {
            dropdownSpread.options.showVerticalScrollbar = false;
        }
        else {
            var vScrollBarWidth = 0, scrollbarV = dropdownSpread._vScrollbar;
            if (scrollbarV) {
                var scrollBarSize = scrollbarV._getActualScrollbarSize(false );
                vScrollBarWidth = scrollBarSize ? scrollBarSize : scrollbarV._width();
            }
            actualWidth += vScrollBarWidth;
        }
        return { width: MATH_MIN(actualWidth, MAX_WIDTH), height: MATH_MIN(MATH_MAX(actualHeight, MIN_HEIGHT), MAX_HEIGHT) };
    };
    BaseSpreadPicker.prototype._initDropdownSpread = function (container) {
        var workbook = new Core_1.Workbook(container, { sheetCount: 1 });
        workbook._isNested = true;
        var options = workbook.options;
        options.allowUserDragDrop = false;
        options.allowUserDragFill = false;
        options.allowUserResize = false;
        options.allowUserZoom = false;
        options.tabStripVisible = false;
        options.allowContextMenu = false;
        options.allowUserDeselect = false;
        options.scrollbarMaxAlign = true;
        var sheet = workbook.getActiveSheet();
        sheet._isDropdownSheet = true;
        var self = this;
        workbook.bind(Core_1.Events.DropdownSpreadMouseClick + BASE_SPREAD_NS, function (e, info) {
            self.submitData(info);
        });
        workbook.bind(Core_1.Events.DropdownSpreadKeyboardEnter + BASE_SPREAD_NS, function (e, info) {
            self.submitData(info);
        });
        return workbook;
    };
    BaseSpreadPicker.prototype.submitData = function (info) {
    };
    return BaseSpreadPicker;
}(baseControl_1.BaseDropdown));
exports.BaseSpreadPicker = BaseSpreadPicker;
function _raiseEvent(sheet, eventType, isEsc) {
    var args = {
        sheet: sheet
    };
    if (!util_1.isNullOrUndefined(isEsc)) {
        args.isEsc = isEsc;
    }
    sheet._trigger(eventType, args);
}
Core_1.GC$.extend(Core_1.Worksheet.prototype, {
    _raiseDropdownSpreadMouseClick: function () {
        _raiseEvent(this, Core_1.Events.DropdownSpreadMouseClick);
    },
    _raiseDropdownSpreadKeyboardEvent: function (isEsc) {
        _raiseEvent(this, Core_1.Events.DropdownSpreadKeyboardEnter, isEsc);
    }
});
/***/ }),

/***/ './dist/plugins/celltype/editor/calculator.js':
/*!****************************************************!*\
  !*** ./dist/plugins/celltype/editor/calculator.js ***!
  \****************************************************/
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
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var celltypes_ns_1 = __webpack_require__(/*! ../celltypes.ns */ './dist/plugins/celltype/celltypes.ns.js');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var rm = new Common_1.Common.ResourceManager(celltypes_ns_1.SR);
var getSR = rm.getResource.bind(rm);
var calcualtor_Template = '\n<div class="gc-calculator">\n    <header class="gc-top-part">\n        <div class="gc-screen">\n            <div class="gc-main-screen">\n                <input class="gc-main" value="" type="text" disabled readonly="readonly"></div>\n        </div>\n    </header>\n    <section class="gc-bottom-part">\n        <div class="gc-features">\n            <div class="gc-sub-menu">\n                <div class="gc-row">\n                    <div class="percentage button image icon-group1" data-value="%" role="button">\n                        <img class="icon icons8-Percentage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABK0lEQVRYR+2WYQ3CMBCFvznAAgrAAeAAHOAACYADHCABJIACcAA4wAHkkpYM6K7XZs3+rAnZYNf169u7Nyo6HlXH69MD9ArEFJgDK2AKnICtO2re3bk5D2AMPLViDUAWPwQmzxQIWfDi5iyAY6zLNIArMHK73gDyWQNnp0jo3qLSJFLzNU8DeLnKek3oN3/DJbB3X4bAPbZ7ud4WwAC4AXIUn4haptEWQJLx6mRtACQbzwrgTShyellDJkw2nhXA0oZZxrMCSJ0EkCjgW0vOZccyso2XApCTeEnpGYviJoAm41kemzmItN03GS85PXMU0IyXmp7J/4hixisOEEu8ogCWxCsKYEk8a3p+DG41oTXxirRhzHi/7aql519rWxUwvdtzinqAXoHOFXgD+J9gIZOwvCMAAAAASUVORK5CYII="></div>\n                    <div class="sqrt button image icon-group1" data-value="sqrt" role="button">\n                        <img class="icon icons8-Square-Root" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABP0lEQVRYR+3V4S0FQRQF4O9VgApQATrQASpABXSAClABOqCCRwWoABWgAnKTnWSzeV5mdkf2z55fm83sPWfPuXfuzMiYjcxvEjA5UNuBd6z/0dgLuWoK2MV8yVT9u4BbHOIC57njXcuBVXw2pJuIKLJQS8ARbvCA/Szm5lAtAS/YwjEiimzUELCNZ3wjoihCDQFXOME1TovYqbILvrCCHUQURRjqQGq+V0QUxVgm4KdVLcYqxquLe+z1ab5UKFdAnO92+AbemkJriCiKkRNBsrnrQjTcJe4QZ3ohR0AUTkum7UJ6d4CIohdyBXRdSIvnAxFFb+QKaLsQfxzXbfHiWaSyREBy4bEZubj1ihbPUAFBGLnHpRN4QkQxCCUOBFHs+bOGsXjxDHUgvk8upOdBfx8flzowmLBbYBIwOTC6A7+1/zEhMa617wAAAABJRU5ErkJggg=="></div>\n                    <div class="sqr button icon-group1" data-value="pow" role="button">\n                        <span class="x-sign">\n                            <sub>x</sub></span>\n                        <span>\n                            <sup>2</sup></span>\n                    </div>\n                    <div class="fraction button icon-group1" data-value="1/x" role="button">\n                        <span>\n                            <sup>1</sup></span>\n                        <span>&frasl;</span>\n                        <span class="x-sign">\n                            <sub>\n                                <em>x</em></sub>\n                        </span>\n                    </div>\n                </div>\n            </div>\n            <div class="gc-main-menu">\n                <div class="gc-row">\n                    <div class="clear-entry button icon-group1" data-value="CE" role="button">CE</div>\n                    <div class="clear button icon-group1" data-value="C" role="button">C</div>\n                    <div class="clear-element button image icon-group1" data-value="BS" role="button">BS</div>\n                    <div class="divide button image operation icon-group1" data-value="/" role="button">\n                        <img class="icon icons8-Divide" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVRYR+2VSxGDMBRFTxTUAkioklrAQSVAHSChjmqhdYCDMm8mCz7DIp/yurisQ+6Zk5u8gPMXnPMRgAyUGBiBWyzxE3jkFDoXwMLvm0ADGFIhcgEm4AJcY+ALeAOtJ8AHaM4CMNW95xFYtkF0ixImn7/9m9uBVNOH6wVwZOBbzfF6o13e3wL8SMB+W5WwxICmoaahpmGVx6rkGgpABqoYmAH2Lh4hfK3KfwAAAABJRU5ErkJggg=="></div>\n                </div>\n                <div class="gc-row">\n                    <div class="button number icon-group2" role="button" data-value="7">7</div>\n                    <div class="button number icon-group2" role="button" data-value="8">8</div>\n                    <div class="button number icon-group2" role="button" data-value="9">9</div>\n                    <div class="multiply button image operation icon-group1" data-value="*" role="button">\n                        <img class="icon icons8-Multiply" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABBUlEQVRYR+2W6w3CMAyErxuwCYwAG7AJjAATMQKMUDZhBHQSQaFqYp8DqpDSn2nj+3J+NAMWfoaF9dEBugN/4cAewA3AQ+yYFYADgHNtn+UAxS8ARgA7AYLiVwCbF8CpBGEBMBBPvxYgcvE7gG0N3AIguAIhiTO4B8ALIYsrABZESFwFKEFwPRWcmfNpMXpTkO+b1gTfsdpl8YgDCSSH4FpIvBUg2c446px4OxpNQZ5zBlPmxEcZqABz1c6A6rAKOVBrNWVYhRzw9HkIwpMCj/hcd7gK0wJQxEMQFkD6Hat9nqeD94Hw75inarmQHGviLYNIvByVP7dS8DWh6I2oA3QHfu7AEzfHWCF+OOmJAAAAAElFTkSuQmCC"></div>\n                </div>\n                <div class="gc-row">\n                    <div class="button number icon-group2" role="button" data-value="4">4</div>\n                    <div class="button number icon-group2" role="button" data-value="5">5</div>\n                    <div class="button number icon-group2" role="button" data-value="6">6</div>\n                    <div class="minus button image operation icon-group1" data-value="-" role="button">\n                        <img class="icon icons8-Minus-Math-" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAARElEQVRYR+3V0Q0AMAQFQPYfuh1A+ql8nAF4LhIZw5XD80MAAgQIECCwVuA0fcmy8EtgPEATQG279gYIECBAgACBbwIXi38CITaYSB4AAAAASUVORK5CYII="></div>\n                </div>\n                <div class="gc-row">\n                    <div class="button number icon-group2" role="button" data-value="1">1</div>\n                    <div class="button number icon-group2" role="button" data-value="2">2</div>\n                    <div class="button number icon-group2" role="button" data-value="3">3</div>\n                    <div class="plus button image operation icon-group1" data-value="+" role="button">\n                        <img class="icon icons8-Plus-Math" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAWUlEQVRYR+2WMQoAIAgA9f+PrsWmEMQSEa7Z8rzEUmle2pxfABhvYFkPpQtJb7TEAGAAAxgoM3AO/v1YXoPPm4TtANHKy64AAAxgAANjDERB3bjXXzEA8w1s3k4WIU0YaEoAAAAASUVORK5CYII="></div>\n                </div>\n                <div class="gc-row">\n                    <div class="plus-minus button image icon-group1" data-value="+/-" role="button">\n                        <img class="icon icons8-Plus-Minus" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAYUlEQVRYR+2VMQ4AIAgD4f+P1gUdCakx1VB3pL0UcCM/J/c3CfiewIgMwUbgwmgsASLQg8ByiW7tdNIqY0gXkDnvkQEREIGnCaDLaddVFtFxk+wDCagQoN8CugCFUASuEpjXIBIhP3OSdgAAAABJRU5ErkJggg=="></div>\n                    <div class="button number icon-group2" role="button" data-value="0">0</div>\n                    <div class="dot button icon-group1" data-value="." role="button">.</div>\n                    <div class="equal button image operation icon-group1" data-value="=" role="button">\n                        <img class="icon icons8-Equal-Sign" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAQ0lEQVRYR+3U0Q0AMAQFQPYfuh1A+ikkPQMgF0/GcOXw/LAAAQIECLwETtOLLvPWLtAEUNs6wrUCUiAFBAgQIPCPwAX8vwQhcNJI5wAAAABJRU5ErkJggg==" width="32" height="32"></div>\n                </div>\n                <div class="gc-row">\n                    <div class="button okbtn icon-group1" role="button">OK</div>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n';
var Math_floor = Math.floor;
var Math_abs = Math.abs;
var Math_pow = Math.pow;
var Math_round = Math.round;
var Math_sqrt = Math.sqrt;
var Math_max = Math.max;
var DefaultButtonKeys = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+/-', '.', '+', '-', '*', '/', 'SQRT', '%', '1/x', '=', 'MC', 'MR', 'MS', 'M+', 'BS', 'CE', 'C', 'POW');
var Utility = (function () {
    function Utility() {
    }
    Utility.Init = function () {
        Utility.GetBrowserType();
        var isEdge = Utility.edge !== undefined;
        Utility.IsIE = (Utility.ie !== undefined) || isEdge;
    };
    Utility.GetBrowserType = function () {
        try {
            var ua = navigator.userAgent.toLowerCase();
            if (window.ActiveXObject) {
                Utility.ie = ua.match(/msie ([\d.]+)/)[1];
            }
            else if (ua.indexOf('edge') !== -1) {
                Utility.edge = ua.match(/edge\/([\d.]+)/)[1];
            }
            else if (ua.indexOf('firefox') !== -1) {
                Utility.firefox = ua.match(/firefox\/([\d.]+)/)[1];
            }
            if (ua.indexOf('rv:') !== -1 && ua.indexOf('firefox') === -1) {
                Utility.ie = ua.match(/rv:([\d.]+)/)[1];
            }
        }
        catch (e) {
        }
    };
    return Utility;
}());
Utility.Init();
var CalculatorErrorInfo = (function () {
    function CalculatorErrorInfo() {
    }
    CalculatorErrorInfo.IsErrorText = function (text) {
        return text === getSR().Calculator_DivideByZeroInfo ||
            text === getSR().Calculator_InvalidInputInfo ||
            text === getSR().Calculator_SqrtParameterException ||
            text === getSR().Calculator_OverFlowInfo;
    };
    return CalculatorErrorInfo;
}());
exports.CalculatorErrorInfo = CalculatorErrorInfo;
var MathOperation = (function () {
    function MathOperation() {
    }
    MathOperation.IsDotContained = function (str) {
        var text = str + '';
        return text.indexOf('.') !== -1;
    };
    MathOperation.GetDotPosition = function (str) {
        var text = str + '';
        var position = 0;
        var i = 0;
        for (i = text.length; i > 0; i--) {
            if (text.substring(i - 1, i) === '.') {
                return position;
            }
            position++;
        }
        return i === 0 ? 0 : position;
    };
    MathOperation.FormatOutput = function (str) {
        if (str === null || str === undefined) {
            return null;
        }
        var text = str + '';
        var start = 0;
        var end = text.length;
        if (MathOperation.IsDotContained(text)) {
            while (text.substring(end - 1, end) === '0' && text !== '' && text.indexOf('e') === -1) {
                text = text.substring(start, end - 1);
                end--;
            }
        }


        return text;
    };
    MathOperation.FormatResult = function (result) {
        if (isNaN(result)) {
            result = 0;
        }
        var value = result + '';
        var sign = '';
        if (result < 0) {
            sign = '-';
            value = value.substring(1, value.length);
        }

        var valuelength = value.length;
        var extrapart = '';
        var eindex = value.indexOf('e');
        if (eindex !== -1) {
            extrapart = value.substring(eindex, valuelength);
            value = value.substring(0, eindex);
            valuelength = value.length;
        }

        if (MathOperation.IsDotContained(value) && valuelength > 16) {
            var temp = 0;
            if (parseFloat(value) > 1) {
                temp = (MathOperation.GetDotPosition(value) - (valuelength - 16));
                value = value.toString().substring(0, 17);
            }
            else {
                temp = (MathOperation.GetDotPosition(value) - (valuelength - 17));
                value = value.toString().substring(0, 18);
            }
            if (temp > 0) {
                value = (Math_round(parseFloat(value) * Math_pow(10, temp)) / Math_pow(10, temp)).toString();
            }
            else {
                value = Math_round(parseFloat(value)).toString();
            }
        }

        valuelength = value.length;
        if (!MathOperation.IsDotContained(value) && valuelength > 15) {
            var temp = valuelength - 15;
            value = (Math_round(parseFloat(value) / Math_pow(10, temp)) * Math_pow(10, temp)).toString();
        }

        value = sign + value + extrapart;
        var value2 = parseFloat(value);
        if (MathOperation.IsOverFlow(value2.toString())) {
            return getSR().Calculator_OverFlowInfo;
        }
        else {
            return value2;
        }
    };
    MathOperation.SingleMathOperation = function (param, op) {
        var value = parseFloat(param);

        if (isNaN(value)) {
            value = 0;
        }

        if (op === 'SQRT') {
            if (value < 0) {
                return getSR().Calculator_InvalidInputInfo;
            }
            else {
                value = Math_sqrt(value);
            }
        }
        if (op === 'POW') {
            value = Math_pow(value, 2);
        }
        if (op === '1/x') {
            if (value === 0) {
                return getSR().Calculator_DivideByZeroInfo;
            }
            else {
                var position = MathOperation.GetDotPosition(value.toString());
                value = Math_pow(10, position) / (Math_pow(10, position) * value);
            }
        }
        return MathOperation.FormatResult(value);
    };
    MathOperation.DoubleMathOperation = function (param1, param2, op) {
        var value1 = parseFloat(param1);
        var value2 = parseFloat(param2);

        var result;
        if (!MathOperation.IsDotContained(value1.toString()) && !MathOperation.IsDotContained(value2.toString())) {
            if (op === '+') {
                result = value1 + value2;
            }

            if (op === '-') {
                result = value1 - value2;
            }

            if (op === '*') {
                result = value1 * value2;
            }

            if (op === '/') {
                if (value2 === 0) {
                    return getSR().Calculator_DivideByZeroInfo;
                }
                else {
                    result = value1 / value2;
                }
            }

            if (op === '%') {
                result = value1 * value2 / 100;
            }
        }
        else {
            var position1 = 0;
            var position2 = 0;
            if (MathOperation.IsDotContained(value1.toString())) {
                position1 = MathOperation.GetDotPosition(value1.toString());
            }
            if (MathOperation.IsDotContained(value2.toString())) {
                position2 = MathOperation.GetDotPosition(value2.toString());
            }
            var positionMax = Math_max(position1, position2);

            if (op === '+') {
                value1 = value1 * Math_pow(10, positionMax);
                value2 = value2 * Math_pow(10, positionMax);
                result = (value1 + value2) / Math_pow(10, positionMax);
            }

            if (op === '-') {
                value1 = value1 * Math_pow(10, positionMax);
                value2 = value2 * Math_pow(10, positionMax);
                result = (value1 - value2) / Math_pow(10, positionMax);
            }

            if (op === '*') {
                value1 = value1 * Math_pow(10, position1);
                value2 = value2 * Math_pow(10, position2);
                result = (value1 * value2) / Math_pow(10, position1 + position2);
            }

            if (op === '/') {
                value1 = value1 * Math_pow(10, positionMax);
                value2 = value2 * Math_pow(10, positionMax);
                if (value2 === 0) {
                    return getSR().Calculator_DivideByZeroInfo;
                }
                else {
                    result = value1 / value2;
                }
            }

            if (op === '%') {
                value1 = value1 * Math_pow(10, position1);
                value2 = value2 * Math_pow(10, position2);
                result = (value1 * value2) / Math_pow(10, position1 + position2 + 2);
            }
        }
        return MathOperation.FormatResult(result);
    };
    MathOperation.IsOverFlow = function (valStr) {
        var val = parseFloat(valStr);
        if (val !== 0) {
            if (val > 7.9e+28) {
                return true;
            }
            if (val < 1.0e-28 && val > -1.0e-28) {
                return true;
            }
            if (val < -7.9e+28) {
                return true;
            }
        }
        return false;
    };
    return MathOperation;
}());
var CalculatorUIProcess = (function () {
    function CalculatorUIProcess(result, x, y, operation, token, count, memoryNumber, isBSCanUse, isEqualClicked, isOperationInvalid, lastOperation) {
        var self = this;

        self._result = result;
        self._x = x;
        self._y = y;
        self._operation = operation;
        self._token = token;
        self._count = count;
        self._memoryNumber = memoryNumber;
        self._isBSCanUse = isBSCanUse;
        self._isEqualClicked = isEqualClicked;
        self._isOperationInvalid = isOperationInvalid;
        self._lastOperation = lastOperation;

        self._buttonKeys = DefaultButtonKeys;
    }
    CalculatorUIProcess.prototype._initial = function () {
        var self = this;
        self._result = '';
        self._x = null;
        self._y = null;
        self._operation = null;
        self._token = 0;
        self._isBSCanUse = false;
        self._isEqualClicked = false;
    };
    CalculatorUIProcess.prototype.Click = function (i) {
        var self = this;
        if (i >= 0 && i <= 11) {
            if (self._isOperationInvalid) {
                self._resetButton_OnClick(i);
                self._isOperationInvalid = false;
            }
            self._numericButton_OnClick(i);
            if (i !== 10) {
                self._lastOperation = 'ClickNumericButton';
            }
        }
        if ((i >= 12 && i <= 19) || i === 27) {
            if (self._isOperationInvalid) {
                self._resetButton_OnClick(i);
                self._isOperationInvalid = false;
            }
            else {
                self._mathButton_OnClick(i);
                self._lastOperation = 'ClickMathButton';
            }
        }
        if (i === 24) {
            if (self._isOperationInvalid) {
                self._resetButton_OnClick(i);
                self._isOperationInvalid = false;
            }
            self._editButton_OnClick();
        }
        if (i === 25 || i === 26) {
            self._resetButton_OnClick(i);
            self._isOperationInvalid = false;
        }
        if (!self._isOperationInvalid) {
            var retInfo = {};
            retInfo.outputText = self._getOutputText();
            if (CalculatorErrorInfo.IsErrorText(self._result)) {
                self._isOperationInvalid = true;
            }
            retInfo.result = ((self._result === undefined || self._result === null) ? '' : self._result);
            retInfo.x = self._x;
            retInfo.y = self._y;
            retInfo.operation = self._operation;
            retInfo.token = self._token;
            retInfo.count = self._count;
            retInfo.memoryNumber = self._memoryNumber;
            retInfo.isBSCanUse = self._isBSCanUse;
            retInfo.isEqualClicked = self._isEqualClicked;
            retInfo.isOperationInvalid = self._isOperationInvalid;
            retInfo.lastOperation = self._lastOperation;
            return retInfo;
        }
        else {
            return null;
        }
    };
    CalculatorUIProcess.prototype._numericButton_OnClick = function (i) {
        var self = this;
        if (self._result === null || self._result === undefined) {
            self._result = '';
        }

        if (self._count > 14 && i !== 10) {
            return;
        }

        if (i !== 11 && i !== 10) {
            if (i !== 0 || !(self._result + '' === '0' || self._result === '')) {
                self._count++;
            }
        }
        if (i !== 10) {
            self._isBSCanUse = true;
        }
        switch (self._token) {
            case 0:
                if (i >= 0 && i <= 9) {
                    if (self._lastOperation !== 'ClickNumericButton' && self._lastOperation !== undefined && self._lastOperation !== null) {
                        self._result = '0';
                    }
                    if (self._result === '0' && i !== 0) {
                        self._result = '' + i;
                    }
                    else if (self._result !== '0') {
                        self._result = self._result + '' + i;
                    }
                }

                if (i === 10) {
                    if (self._result.toString().indexOf('e') === -1) {
                        if (self._result !== '' && self._result !== '0') {
                            if (self._result.toString().indexOf('-') === -1) {
                                self._result = '-' + self._result;
                            }
                            else {
                                self._result = self._result.toString().substring(1, self._result.toString().length);
                            }
                        }
                    }
                    else {
                        if ((self._result - 0) > 0) {
                            self._result = '-' + self._result;
                        }
                        else {
                            self._result = self._result.substring(1, self._result.length);
                        }
                    }
                }

                if (i === 11) {
                    if (self._lastOperation !== 'ClickNumericButton' && self._lastOperation !== undefined && self._lastOperation !== null) {
                        self._result = '0.';
                    }
                    if (self._result !== '' && !MathOperation.IsDotContained(self._result)) {
                        self._result = self._result + '.';
                    }
                    else if (self._result !== '' && MathOperation.IsDotContained(self._result)) {

                    }
                    else {
                        self._result = '0.';
                    }
                }
                self._token = 1;
                break;
            case 1:
                if (i >= 0 && i <= 9) {
                    if (self._lastOperation !== 'ClickNumericButton' && self._lastOperation !== undefined && self._lastOperation !== null) {
                        self._result = '0';
                    }
                    if (self._result !== '0' || i !== 0) {
                        if (self._result === '0' && i !== 0) {
                            self._result = '' + i;
                        }
                        else {
                            self._result = self._result + '' + i;
                        }
                    }
                }

                if (i === 10) {
                    if (self._result.toString().indexOf('e') === -1) {
                        if (self._result !== '' && self._result !== '0') {
                            if (self._result.toString().indexOf('-') === -1) {
                                self._result = '-' + self._result;
                            }
                            else {
                                self._result = self._result.toString().substring(1, self._result.toString().length);
                            }
                        }
                    }
                    else {
                        if ((self._result - 0) > 0) {
                            self._result = '-' + self._result;
                        }
                        else {
                            self._result = self._result.substring(1, self._result.length);
                        }
                    }
                }

                if (i === 11) {
                    if (self._lastOperation !== 'ClickNumericButton' && self._lastOperation !== undefined && self._lastOperation !== null) {
                        self._result = '0.';
                    }
                    else if (!MathOperation.IsDotContained(self._result)) {
                        if (self._result === '') {
                            self._result = '0.';
                        }
                        else {
                            self._result = self._result + '.';
                        }
                    }
                }

                if (!self._isEqualClicked) {
                    self._y = self._result;
                }
                break;
            case 2:
                if (i >= 0 && i <= 9) {
                    self._result = '';
                    self._result = self._result + i;
                }

                if (i === 11) {
                    self._result = '0.';
                }

                if (i === 10) {
                    self._result = '0';
                }
                self._token = 3;
                self._y = self._result;
                break;
            case 3:
                if (i >= 0 && i <= 9) {
                    if (self._lastOperation !== 'ClickNumericButton' && self._lastOperation !== undefined && self._lastOperation !== null) {
                        self._result = '0';
                    }
                    if (self._result !== '0' || i !== 0) {
                        if (self._result === '0' && i !== 0) {
                            self._result = '' + i;
                        }
                        else {
                            self._result = self._result + '' + i;
                        }
                    }
                }

                if (i === 10) {
                    if (self._result.toString().indexOf('e') === -1) {
                        if (self._result !== '' && self._result !== '0') {
                            if (self._result.toString().indexOf('-') === -1) {
                                self._result = '-' + self._result;
                            }
                            else {
                                self._result = self._result.toString().substring(1, self._result.toString().length);
                            }
                        }
                    }
                    else {
                        if ((self._result - 0) > 0) {
                            self._result = '-' + self._result;
                        }
                        else {
                            self._result = self._result.substring(1, self._result.length);
                        }
                    }
                }

                if (i === 11) {
                    if (self._lastOperation !== 'ClickNumericButton' && self._lastOperation !== null) {
                        self._result = '0.';
                    }
                    else if (!MathOperation.IsDotContained(self._result)) {
                        if (self._result === '') {
                            self._result = '0.';
                        }
                        else {
                            self._result = self._result + '.';
                        }
                    }
                }
                self._y = self._result;
                break;
        }
    };
    CalculatorUIProcess.prototype._mathButton_OnClick = function (i) {
        var self = this;
        self._count = 0;
        self._isBSCanUse = false;
        if (self._isEqualClicked) {
            self._isEqualClicked = false;
        }

        self._result = MathOperation.FormatOutput(self._result);
        switch (self._token) {
            case 0:
                if (self._result === '') {
                    self._result = 0;
                }

                if ((i >= 16 && i <= 18 && i !== 17) || i === 27) {
                    self._result = MathOperation.SingleMathOperation(self._result, self._buttonKeys[i]).toString();
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        self._x = self._result;
                    }
                    self._token = 1;
                }

                if (i >= 12 && i <= 15) {
                    self._operation = i;
                    self._x = self._result;
                    self._token = 2;
                }

                if (i === 17) {
                    self._initial();
                }
                break;
            case 1:

                if ((i >= 16 && i <= 18 && i !== 17) || i === 27) {
                    self._result = MathOperation.SingleMathOperation(self._result, self._buttonKeys[i]).toString();
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        if (self._operation !== null &&
                            self._operation !== undefined &&
                            self._y !== null &&
                            self._y !== undefined) {
                            self._y = self._result;
                        }
                        else {
                            self._x = self._result;
                        }
                    }
                }

                if (i === 19) {
                    if (self._operation !== null &&
                        self._operation !== undefined &&
                        self._y !== null &&
                        self._y !== undefined) {
                        self._result = MathOperation.DoubleMathOperation(self._x.toString(), self._y.toString(), self._buttonKeys[self._operation]).toString();
                        if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                            self._x = self._result;
                        }
                    }
                    else {
                        if (self._result === '-0.') {
                            self._result = '0.';
                        }
                    }
                    self._isEqualClicked = true;
                    self._isBSCanUse = false;
                }

                if (i >= 12 && i <= 15) {
                    self._operation = i;
                    self._x = self._result;
                    self._token = 2;
                }

                if (i === 17) {
                    if (self._operation !== null && self._operation !== undefined) {
                        self._y = self._result;
                        self._result = MathOperation.DoubleMathOperation(self._x.toString(), self._y.toString(), self._buttonKeys[17]).toString();
                        self._y = self._result;
                    }
                    else {
                        self._initial();
                    }
                }
                break;
            case 2:

                if ((i >= 16 && i <= 18 && i !== 17) || i === 27) {
                    self._result = MathOperation.SingleMathOperation(self._result, self._buttonKeys[i]).toString();
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        self._token = 3;
                        self._y = self._result;
                    }
                }

                if (i === 19) {
                    self._y = self._x;
                    self._result = MathOperation.DoubleMathOperation(self._x.toString(), self._x.toString(), self._buttonKeys[self._operation]).toString();
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        self._x = self._result;
                        self._token = 1;
                        self._isBSCanUse = false;
                    }
                    self._isEqualClicked = true;
                }

                if ((i >= 12 && i <= 15)) {
                    self._operation = i;
                    self._y = self._result;
                }

                if (i === 17) {
                    self._result = MathOperation.DoubleMathOperation(self._x.toString(), self._x.toString(), self._buttonKeys[17]);
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        self._y = self._result;
                        self._token = 3;
                    }
                }
                break;
            case 3:
                if (i >= 16 && i <= 18 && i !== 17) {
                    self._result = MathOperation.SingleMathOperation(self._result, self._buttonKeys[i]).toString();
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        self._y = self._result;
                    }
                }
                if (i >= 12 && i <= 15) {
                    self._y = self._result;
                    self._result = MathOperation.DoubleMathOperation(self._x.toString(), self._y.toString(), self._buttonKeys[self._operation]).toString();
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        self._x = self._result;
                        self._y = null;
                        self._operation = i;
                        self._token = 2;
                    }
                }

                if (i === 17) {
                    self._result = MathOperation.DoubleMathOperation(self._x.toString(), self._y.toString(), self._buttonKeys[17]);
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        self._y = self._result;
                    }
                }

                if (i === 19) {
                    self._y = self._result;
                    self._result = MathOperation.DoubleMathOperation(self._x.toString(), self._y.toString(), self._buttonKeys[self._operation]).toString();
                    if (!CalculatorErrorInfo.IsErrorText(self._result)) {
                        self._x = self._result;
                        self._token = 1;
                        self._isBSCanUse = false;
                    }
                    self._isEqualClicked = true;
                }
                break;
        }
        self._result += '';
    };
    CalculatorUIProcess.prototype._editButton_OnClick = function () {
        var self = this;
        if (self._count > 0) {
            self._count--;
        }
        if ((self._token === 0 || self._token === 1 || self._token === 3) && (self._isBSCanUse === true)) {
            self._result += '';
            var start = 0;
            var end = self._result.length;
            if (end > 0) {
                self._result = self._result.substring(start, end - 1);
            }
            if (self._result === '-0') {
                self._result = '0';
            }
            if (self._result === '-') {
                self._result = '';
            }
            if (self._result === '') {
                self._isBSCanUse = false;
            }
            switch (self._token) {
                case 0:
                    self._x = self._result;
                    break;
                case 1:
                    self._x = self._result;
                    break;
                case 3:
                    self._y = self._result;
                    break;
            }
        }
        return;
    };
    CalculatorUIProcess.prototype._resetButton_OnClick = function (i) {
        var self = this;
        self._count = 0;
        self._isBSCanUse = false;
        self._result = '';

        if (i === 25) {
            if (self._token === 1) {
                if (self._operation !== null && self._operation !== undefined && !self._isEqualClicked) {
                    self._y = 0;
                }
            }
            if (self._token === 2) {
                self._token = 3;
            }
        }

        if (i === 26) {
            self._initial();
        }
        return;
    };
    CalculatorUIProcess.prototype._getOutputText = function () {
        var self = this;
        var outputText = '';
        if (self._result === '' || self._result === null || self._result === undefined) {
            outputText = '0';
        }
        else {
            outputText = self._result;
        }
        return outputText;
    };
    CalculatorUIProcess.prototype._keyDown = function (evt) {
        var keyCode = evt.keyCode;
        if (evt.shiftKey) {
            keyCode |= 65536;
        }
        if (evt.ctrlKey) {
            keyCode |= 131072;
        }
        if (evt.altKey) {
            keyCode |= 262144;
        }


        switch (keyCode) {
            case 131138:
            case 131140:
            case 131141:
            case 131144:
            case 131145:
            case 131148:
            case 131150:
            case 131154:
            case 131159:
            case 131188:
            case 262181:
            case 262183:
            case 117 :
            case 65657:
            case 131081:
            case 196617:
            case 9 :
            case 65545:
            case 121 :
            case 123 :
                return null;


            case 48 :
            case 96 :
                return 0;

            case 49 :
            case 97 :
                return 1;

            case 50 :
            case 98 :
                return 2;

            case 51 :
            case 99 :
                return 3;

            case 52 :
            case 100 :
                return 4;

            case 53 :
            case 101 :
                return 5;

            case 54 :
            case 102 :
                return 6;

            case 55 :
            case 103 :
                return 7;

            case 56 :
            case 104 :
                return 8;

            case 57 :
            case 105 :
                return 9;

            case 120:
                return 10;

            case 190:
            case 188:
            case 110 :
                return 11;

            case 65723:
            case 107 :
                return 12;
            case 65643:
                if (!Utility.IsIE) {
                    return 12;
                }
                break;
            case 189:
            case 109 :
                return 13;

            case 65592:
            case 106 :


            case 65722:

                return 14;

            case 191:
            case 111 :
                return 15;

            case 65586:


            case 192:

                return 16;

            case 65589:
                return 17;

            case 82:
                return 18;

            case 13 :


                return 19;

            case (262144 | 131072 | 76):
                return 20;

            case (262144 | 131072 | 82):
                return 21;

            case (262144 | 131072 | 77):
                return 22;

            case (262144 | 131072 | 80):
                return 23;

            case 8:
                return 24;

            case 46:
                return 25;

            case 27:
            case (46 | 131072):
                return 26;
            default:
                return ((keyCode === 61 && Utility.firefox) || (keyCode === 187 && !Utility.firefox)) ? 19 : -1;
        }
    };
    return CalculatorUIProcess;
}());
var Calculator = (function (_super) {
    __extends(Calculator, _super);
    function Calculator(container) {
        var _this = _super.call(this, container) || this;
        var self = _this;
        self._host = document.createElement('div');
        self._host.classList.add('gc-calculator-container');
        self._host.innerHTML = calcualtor_Template;
        var button = self._host.querySelector('.okbtn');
        button.textContent = getSR().OK;
        container.appendChild(_this._host);
        self._beginInit();
        self._createUIProcess();
        self._endInit();
        self._registEvent();
        self._setRenderText('0');
        return _this;
    }
    Calculator.prototype.setValue = function (text) {
        var self = this;
        text = self._checkString(text);
        try {
            if (!self._isNumber(text)) {
                throw new Error(getSR().Calculator_InvalidInputInfo);
            }
            text = text === '' ? '0' : text;
            self._result = self._getFormatedNumber(text);
            self._text = self._getFormatedText(text);
            self._x = parseFloat(self._result);
            self._y = null;
            self._operation = null;
            self._token = 0;
            self._count = self._getNumberLength(parseFloat(self._result));
            if (self._count > 0) {
                self._isBSCanUse = true;
            }
            else {
                self._isBSCanUse = false;
            }
            self._isEqualClicked = false;
            self._isOperationInvalid = false;
            self._lastOperation = null;
        }
        catch (e) {
            self._text = getSR().Calculator_InvalidInputInfo;
            self._result = '';
            self._x = null;
            self._y = null;
            self._isOperationInvalid = true;
        }
        self._setInvalidStatus(self._isOperationInvalid);
        self._setRenderText(self._text);
        var o = {};
        o.outputText = self._text;
        o.result = self._result;
        o.x = self._x;
        o.y = self._y;
        o.operation = self._operation;
        o.token = self._token;
        o.count = self._count;
        o.memoryNumber = self._memoryNumber;
        o.isBSCanUse = self._isBSCanUse;
        o.isEqualClicked = self._isEqualClicked;
        o.isOperationInvalid = self._isOperationInvalid;
        o.lastOperation = self._lastOperation;
        self._uIProcess = new CalculatorUIProcess(self._result, self._x, self._y, self._operation, self._token, self._count, self._memoryNumber, self._isBSCanUse, self._isEqualClicked, self._isOperationInvalid, self._lastOperation);
        return self;
    };
    Calculator.prototype.setOptions = function () { };
    Calculator.prototype.scrollToSelect = function () {
        var screen = this._host.querySelector('.gc-main-screen .gc-main');
        this._fixSize(screen);
    };
    Calculator.prototype._beginInit = function () {
        var self = this;
        self._outputText = '0';
        self._text = self._outputText;
        self._result = '';
        self._x = 0;
        self._y = 0;
        self._operation = null;
        self._token = 0;
        self._count = 0;
        self._memoryNumber = null;
        self._isBSCanUse = false;
        self._isEqualClicked = false;
        self._isOperationInvalid = false;
        self._lastOperation = null;
    };
    Calculator.prototype._createUIProcess = function () {
        var self = this;
        self._uIProcess = new CalculatorUIProcess(this._result, self._x, self._y, self._operation, self._token, self._count, self._memoryNumber, self._isBSCanUse, self._isEqualClicked, self._isOperationInvalid, self._lastOperation);
    };
    Calculator.prototype._endInit = function () {
        var self = this;
        self._setInvalidStatus(self._isOperationInvalid);
    };
    Calculator.prototype._registEvent = function () {
        var _this = this;
        var self = this;
        var controlContainer = self._host;
        var clickHandler = function (evt) {
            var srcElement = (evt.srcElement || evt.target);
            while (srcElement && !srcElement.classList.contains('button')) {
                srcElement = srcElement.parentElement;
            }
            if (!srcElement) {
                return;
            }
            if (srcElement.getAttribute('data-value')) {
                var btntext = srcElement.getAttribute('data-value');
                var i = Calculator._convertButtonTextToInt(btntext);


                controlContainer.focus();


                if (i !== -1) {
                    self._click(i);
                }
            }
            else if (srcElement.classList.contains('okbtn')) {
                if (self._lastOperation === 'ClickNumericButton') {
                    self._click(19);
                }
                _this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { value: self._text, text: self._text });
            }
        };
        var keyDownHandler = function (evt) {
            if (self._keyDown(evt) !== true) {
                evt.preventDefault();
                evt.stopPropagation();
            }
        };
        controlContainer.addEventListener('click', clickHandler);
        controlContainer.addEventListener('keydown', keyDownHandler);
        controlContainer.addEventListener('contextmenu', function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        });
    };
    Calculator.prototype._setRenderText = function (text) {
        var screen = this._host.querySelector('.gc-main-screen .gc-main');
        var oldText = screen.value;
        if (oldText === null || typeof oldText === 'undefined') {
            return;
        }
        if (oldText.toString().replace(/\r\n/g, '\n') === text.toString().replace(/\r\n/g, '\n')) {
            return;
        }
        screen.value = text;
        this._fixSize(screen);
    };
    Calculator.prototype._fixSize = function (element) {
        var self = this;
        if (self._maxFontSize === null || self._maxFontSize === undefined) {
            self._maxFontSize = parseInt(window.getComputedStyle(element)['font-size'].replace('px', ''), 0);
        }
        if (self._isOverflowed(element)) {
            while (self._isOverflowed(element)) {
                self._decreaseSize(element);
            }
        }
        else {
            self._maximizeSize(element);
        }
    };
    Calculator.prototype._isOverflowed = function (element) {
        if (element.scrollWidth > element.clientWidth) {
            return true;
        }
        if (!Core_1._util._browser.edge && !Core_1._util._browser.msie) {
            return false;
        }
        if (element.clientWidth <= 0) {
            return false;
        }
        var style = window.getComputedStyle(element);
        var fontWeight = style.fontWeight;
        var fontSize = style.fontSize;
        var fontFamily = style.fontFamily;
        var elementFont = (fontWeight + ' ' + fontSize + ' ' + fontFamily);
        var width = Core_1._WordWrapHelper._measureText(element.value, elementFont);
        if (width + 40 > element.clientWidth) {
            return true;
        }
        return false;
    };
    Calculator.prototype._decreaseSize = function (element) {
        var fontSize = parseInt(window.getComputedStyle(element)['font-size'].replace('px', ''), 0);
        element.style.fontSize = fontSize - 1 + 'px';
    };
    Calculator.prototype._maximizeSize = function (element) {
        var self = this;
        var fontSize = parseInt(window.getComputedStyle(element)['font-size'].replace('px', ''), 0);
        while (!self._isOverflowed(element) && fontSize < self._maxFontSize) {
            ++fontSize;
            element.style.fontSize = fontSize + 'px';
            if (self._isOverflowed(element)) {
                while (self._isOverflowed(element)) {
                    self._decreaseSize(element);
                }
                break;
            }
        }
    };
    Calculator.prototype._checkString = function (str) {
        if (typeof (str) === 'undefined' || (typeof (str) !== 'string' && !(str instanceof String))) {
            throw new Error(str + ' type is not a string.');
        }
        if (str === null || str === undefined) {
            str = '';
        }
        return str.toString();
    };
    Calculator.prototype._filterText = function (includeText, intext) {
        if (intext.length === 0) {
            return '';
        }
        var filterText = '';
        var j = 0;
        var i = 0;
        for (j = 0; j < intext.length; j++) {
            var valid = false;
            for (i = 0; i < includeText.length; i++) {
                if (intext.substring(j, j + 1) === includeText.substring(i, i + 1)) {
                    valid = true;
                }
            }
            if (valid === true) {
                filterText += intext.substring(j, j + 1);
            }
        }
        return filterText;
    };
    Calculator.prototype._isNumber = function (text) {
        if (this._filterText('-.0123456789', text) !== text) {
            return false;
        }
        var index = text.indexOf('-');
        if (index !== -1 && index !== 0) {
            return false;
        }
        if (text.indexOf('-') !== text.lastIndexOf('-')) {
            return false;
        }
        if (text.indexOf('.') !== text.lastIndexOf('.')) {
            return false;
        }
        return true;
    };
    Calculator.prototype._getFormatedNumber = function (value) {
        var val = parseFloat(value);
        var isNegative = false;
        if (val < 0) {
            isNegative = true;
        }
        var absval = Math_abs(val);
        var intpart = Math_floor(absval);
        var position = MathOperation.GetDotPosition(absval.toString());
        var decimalpart = (absval * Math_pow(10, position) - intpart * Math_pow(10, position)) / Math_pow(10, position);
        if (intpart > 999999999999999) {
            throw new Error(getSR().Calculator_InvalidInputInfo);
        }
        else {
            if (intpart === 999999999999999) {
                if (decimalpart === 0) {
                    return intpart;
                }
                else {
                    throw new Error(getSR().Calculator_InvalidInputInfo);
                }
            }
            var temp = intpart === 0 ? 15 : 15 - intpart.toString().length;
            decimalpart = Math_round(decimalpart * Math_pow(10, temp)) / Math_pow(10, temp);
            position = MathOperation.GetDotPosition(decimalpart.toString());
            absval = (intpart * Math_pow(10, position) + decimalpart * Math_pow(10, position)) / Math_pow(10, position);
            intpart = Math_floor(absval);
            position = MathOperation.GetDotPosition(absval.toString());
            decimalpart = (absval * Math_pow(10, position) - intpart * Math_pow(10, position)) / Math_pow(10, position);
            if (decimalpart === 0) {
                absval = intpart;
            }
            if (!isNegative) {
                return '' + absval;
            }
            else {
                return '-' + '' + absval;
            }
        }
    };
    Calculator.prototype._getFormatedText = function (text) {
        var outputText = text.toString();
        if (outputText === '') {
            outputText = '0';
        }
        return outputText;
    };
    Calculator.prototype._getNumberLength = function (val) {
        var absval = Math_abs(val);
        var intpart = Math_floor(absval);
        var position = MathOperation.GetDotPosition(absval.toString());
        var decimalpart = (absval * Math_pow(10, position) - intpart * Math_pow(10, position)) / Math_pow(10, position);
        var intpartLength = (intpart === 0 ? 0 : intpart.toString().length);
        var decimalpartLength = (decimalpart === 0 ? 0 : position);
        return intpartLength + decimalpartLength;
    };
    Calculator.prototype._setInvalidStatus = function (isInvalid) {
        for (var i = 10; i <= 18; i++) {
            this._setButtonEnableStatus(i, isInvalid);
        }
        this._setButtonEnableStatus(27, isInvalid);
    };
    Calculator.prototype._setButtonEnableStatus = function (index, isDisabled) {
        var dataValue = DefaultButtonKeys[index];
        var dom = this._host.querySelector('[data-value="' + dataValue.toLowerCase() + '"]');
        if (dom) {
            if (isDisabled) {
                dom.classList.add('disabled');
            }
            else {
                dom.classList.remove('disabled');
            }
        }
    };


    Calculator._convertButtonTextToInt = function (defaultValue) {
        var i = -1;

        switch (defaultValue) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                i = parseInt(defaultValue, 10);
                break;
            case '+/-':
                i = 10;
                break;
            case '.':
                i = 11;
                break;
            case '+':
                i = 12;
                break;
            case '-':
                i = 13;
                break;
            case '*':
                i = 14;
                break;
            case '/':
                i = 15;
                break;
            case 'sqrt':
                i = 16;
                break;
            case '%':
                i = 17;
                break;
            case '1/x':
                i = 18;
                break;
            case '=':
                i = 19;
                break;
            case 'MC':
                i = 20;
                break;
            case 'MR':
                i = 21;
                break;
            case 'MS':
                i = 22;
                break;
            case 'M+':
                i = 23;
                break;
            case 'BS':
                i = 24;
                break;
            case 'CE':
                i = 25;
                break;
            case 'C':
                i = 26;
                break;
            case 'pow':
                i = 27;
                break;
            default:
                i = -1;
        }
        return i;
    };
    Calculator.prototype._click = function (i) {
        var self = this;
        var retInfo = self._uIProcess.Click(i);
        if (retInfo === null || retInfo === undefined) {
            return;
        }
        if (retInfo.result !== null && retInfo.result !== undefined) {
            self._result = retInfo.result;
        }
        if (retInfo.outputText !== null && retInfo.outputText !== undefined) {
            self._outputText = retInfo.outputText;
            self._text = self._outputText;
            self._setRenderText(self._outputText);
        }
        if (retInfo.isOperationInvalid !== null &&
            retInfo.isOperationInvalid !== undefined &&
            retInfo.isOperationInvalid !== self._isOperationInvalid) {
            self._isOperationInvalid = retInfo.isOperationInvalid;
            self._setInvalidStatus(self._isOperationInvalid);
        }
        if (retInfo.memoryNumber !== self._memoryNumber) {
            self._memoryNumber = retInfo.memoryNumber;
        }
        if (retInfo.lastOperation !== self._lastOperation) {
            self._lastOperation = retInfo.lastOperation;
        }
    };
    Calculator.prototype._keyDown = function (evt) {
        var index = this._uIProcess._keyDown(evt);
        if (index === null || index === undefined) {
            return true;
        }
        else {
            if (index === -1) {
                return false;
            }
            else {
                this._click(index);
            }
        }
    };
    return Calculator;
}(baseControl_1.BaseDropdown));
exports.Calculator = Calculator;
/***/ }),

/***/ './dist/plugins/celltype/editor/calendar.js':
/*!**************************************************!*\
  !*** ./dist/plugins/celltype/editor/calendar.js ***!
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
var eventbase_1 = __webpack_require__(/*! ./eventbase */ './dist/plugins/celltype/editor/eventbase.js');
var timepicker_1 = __webpack_require__(/*! ./timepicker */ './dist/plugins/celltype/editor/timepicker.js');
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var celltypes_ns_1 = __webpack_require__(/*! ../celltypes.ns */ './dist/plugins/celltype/celltypes.ns.js');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var rm = new Common_1.Common.ResourceManager(celltypes_ns_1.SR);
var getSR = rm.getResource.bind(rm);

var DOCUMENT = document;
function createElement(tag) {
    return DOCUMENT.createElement(tag);
}


var cls_calendarcontainer = 'gc-calendar-container';
var cls_datetimecontainer = 'gc-date-time-container';
var cls_datepartcontainer = 'gc-date-part-container';
var cls_timepartcontainer = 'gc-time-part-container';
var cls_okbuttoncontainer = 'gc-ok-button-container';
var cls_datecontainer = 'gc-date-container';
var cls_weekcontainer = 'gc-week-container';
var cls_todaycontainer = 'gc-today-container';
var cls_contentcontainer = 'gc-content-container';
var cls_headercontainer = 'gc-header-container';
var cls_headertitle = 'gc-header-title';
var cls_contenttddate = 'gc-content-td-date';
var cls_contenttdtime = 'gc-content-td-time';
var cls_datetimeverticalpartline = 'gc-date-time-vertical-partline';
var cls_datetimehorizontalpartline = 'gc-date-time-horizontal-partline';
var cls_yearpage = 'gc-year-page';
var cls_yearselectdiv = 'gc-year-select-div';
var cls_monthpage = 'gc-month-page';
var cls_daypage = 'gc-day-page';
var cls_leftarrow = 'gc-left-arrow';
var cls_rightarrow = 'gc-right-arrow';
var cls_isfocused = 'gc-is-focused';
var cls_clselect = 'gc-cl-select';
var cls_clisselected = 'gc-cl-is-selected';
var cls_cldisabledtext = 'gc-cl-disabled-text';
var cls_clselectcontainer = 'gc-cl-select-container';
var cls_focuspartindicator = 'gc-focus-part-indicator';
var cls_cldatepicker = 'gc-cl-datepicker';
var cls_cldropdown = 'gc-cl-dropdown';
var cls_cldatepickerfilter = 'gc-cl-datepicker-filter';
var cls_cldatepickerfiltermonth = 'gc-cl-datepicker-filter-month';
var cls_clgridalignspread = 'gc-cl-grid-align-spread';
var cls_clalignmiddle = 'gc-cl-align-middle';
var cls_clbuttoniconcontainer = 'gc-cl-button-icon-container';
var cls_cldatepickermonth = 'gc-cl-datepicker-month';
var cls_clday = 'gc-cl-day';
var cls_week = 'gc-cl-week';
var cls_clshowinlineblock = 'gc-cl-show-inline-block';
var cls_clpbottomxsmall = 'gc-cl-p-bottom-x-small';
var cls_clshrinknone = 'gc-cl-shrink-none';
var cls_clgrow = 'gc-cl-grow';
var cls_clgrid = 'gc-cl-grid';
var cls_uiButton = 'gc-uiButton';
var cls_clbutton = 'gc-cl-button';
var cls_clbuttonbrand = 'gc-cl-button-brand';
var attr_yearindex = 'year-index';
var attr_monthindex = 'month-index';
var attr_weekindex = 'week-index';
var attr_dayindex = 'day-index';


var CalendarActivePart;
(function (CalendarActivePart) {
    CalendarActivePart[CalendarActivePart['Date'] = 1] = 'Date';
    CalendarActivePart[CalendarActivePart['Time'] = 2] = 'Time';
})(CalendarActivePart || (CalendarActivePart = {}));
var CalendarResource = (function () {
    function CalendarResource() {
    }
    CalendarResource.initResource = function () {
        CalendarResource.resource = {
            shortWeeks: [getSR().Calendar_ShortWeeks_1, getSR().Calendar_ShortWeeks_2, getSR().Calendar_ShortWeeks_3, getSR().Calendar_ShortWeeks_4, getSR().Calendar_ShortWeeks_5, getSR().Calendar_ShortWeeks_6, getSR().Calendar_ShortWeeks_7],
            shortMonths: [getSR().Calendar_ShortMonths_1, getSR().Calendar_ShortMonths_2, getSR().Calendar_ShortMonths_3, getSR().Calendar_ShortMonths_4, getSR().Calendar_ShortMonths_5, getSR().Calendar_ShortMonths_6, getSR().Calendar_ShortMonths_7, getSR().Calendar_ShortMonths_8, getSR().Calendar_ShortMonths_9, getSR().Calendar_ShortMonths_10, getSR().Calendar_ShortMonths_11, getSR().Calendar_ShortMonths_12],
            weeks: [getSR().Calendar_Weeks_7, getSR().Calendar_Weeks_1, getSR().Calendar_Weeks_2, getSR().Calendar_Weeks_3, getSR().Calendar_Weeks_4, getSR().Calendar_Weeks_5, getSR().Calendar_Weeks_6],
            months: [getSR().Calendar_Months_1, getSR().Calendar_Months_2, getSR().Calendar_Months_3, getSR().Calendar_Months_4, getSR().Calendar_Months_5, getSR().Calendar_Months_6, getSR().Calendar_Months_7, getSR().Calendar_Months_8, getSR().Calendar_Months_9, getSR().Calendar_Months_10, getSR().Calendar_Months_11, getSR().Calendar_Months_12],
            timePrefix: [getSR().Calendar_Time_AM, getSR().Calendar_Time_PM],
            eraNames: [getSR().Calendar_EraName_1, getSR().Calendar_EraName_2, getSR().Calendar_EraName_3, getSR().Calendar_EraName_4],
            earFirstYear: getSR().Calendar_FirstYear,
            today: getSR().Calendar_Today,
            lastMonth: getSR().Calendar_LastMonth,
            nextMonth: getSR().Calendar_NextMonth,
            lastYear: getSR().Calendar_LastYear,
            nextYear: getSR().Calendar_NextYear,
            lastTenYears: getSR().Calendar_LastTenYear,
            nextTenYears: getSR().Calendar_NextTenYear
        };
    };
    CalendarResource.resource = {
        shortWeeks: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        shortMonths: ['Jan', 'Feb', 'Mar', 'Api', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weeks: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        months: ['January', 'February', 'March', 'Apirl', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        timePrefix: ['AM', 'PM'],
        eraNames: ['M', 'T', 'S', 'H'],
        earFirstYear: '1',
        today: 'Today',
        lastMonth: 'Go to previous month',
        nextMonth: 'Go to next month',
        lastYear: 'Go to previous year',
        nextYear: 'Go to next year',
        lastTenYears: 'Go to previous ten years',
        nextTenYears: 'Go to next ten years'
    };
    return CalendarResource;
}());
var CalendarYearSection = (function () {
    function CalendarYearSection() {
        this.yearTds = [];
    }
    return CalendarYearSection;
}());
var CalendarMonthSection = (function () {
    function CalendarMonthSection() {
        this.monthTds = [];
    }
    return CalendarMonthSection;
}());
var CalendarDaySection = (function () {
    function CalendarDaySection() {
        this.weekThs = [];
        this.dayTds = [];
    }
    return CalendarDaySection;
}());
var CalendarSection = (function () {
    function CalendarSection() {
        this.calendarYearSection = new CalendarYearSection();
        this.calendarMonthSection = new CalendarMonthSection();
        this.calendarDaySection = new CalendarDaySection();
        this.timeItemLIs = [];
    }
    return CalendarSection;
}());
var DateUtility = (function () {
    function DateUtility() {
    }
    DateUtility.dateEqual = function (date1, date2, strict) {
        if (!date1 && !date2) {
            return true;
        }
        else if (!date1) {
            return false;
        }
        else if (!date2) {
            return false;
        }
        try {
            if (!strict) {
                if (date1.getFullYear() === date2.getFullYear()
                    && date1.getMonth() === date2.getMonth()
                    && date1.getDate() === date2.getDate()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (date1.getFullYear() === date2.getFullYear()
                && date1.getMonth() === date2.getMonth()
                && date1.getDate() === date2.getDate()
                && date1.getHours() === date2.getHours()
                && date1.getMinutes() === date2.getMinutes()
                && date1.getSeconds() === date2.getSeconds()) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    };
    DateUtility.getMonthMaxDay = function (year, month) {
        if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1) {
            return 31;
        }
        else if ([4, 6, 9, 11].indexOf(month) !== -1) {
            return 30;
        }
        else {
            return (year % 4 === 0 && year % 100 !== 0) ? 29 : 28;
        }
    };
    DateUtility.isValidEraDate = function (date) {
        if (date < this.eraMin || date > this.eraMax) {
            return false;
        }
        return true;
    };
    DateUtility.addMilliseconds = function (date, msec) {
        var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        newDate.setMilliseconds(newDate.getMilliseconds() + msec);
        return new Date(newDate.valueOf());
    };
    DateUtility.getEraDate = function (date) {
        var eraDate = {};
        eraDate.era = -1;
        eraDate.eraYear = -1;
        if (!DateUtility.isValidEraDate(date)) {
            return eraDate;
        }
        for (var i = 0; i < DateUtility.eraCount; i++) {
            var nextDate = i + 1 !== DateUtility.eraCount ? DateUtility.eraDates[i + 1] : DateUtility.addMilliseconds(DateUtility.eraMax, 1);
            if (date < nextDate) {
                eraDate.era = i;
                eraDate.eraYear = date.getFullYear() - DateUtility.eraDates[i].getFullYear() + 1;
                break;
            }
        }
        return eraDate;
    };
    DateUtility.getEraYearString = function (year) {
        var date = new Date(year, 6 - 1, 30);
        var eraDate = DateUtility.getEraDate(date);
        if (eraDate.era === -1 || eraDate.eraYear === -1) {
            return year.toString();
        }
        return year.toString() + '\u5e74';
    };
    DateUtility.getShortEraYearString = function (year) {
        var date = new Date(year, 11, 31);
        var eraDate = DateUtility.getEraDate(date);
        if (eraDate.era === -1 || eraDate.eraYear === -1) {
            return '';
        }
        var earYear = eraDate.eraYear === 1 ? CalendarResource.resource.earFirstYear : eraDate.eraYear;
        return CalendarResource.resource.eraNames[eraDate.era] + earYear + '\u5e74';
    };
    DateUtility.getDateLocaleLabel = function (date) {
        var hour = date.getHours();
        var minute = date.getMinutes();
        var timePrefix = hour < 12 ? CalendarResource.resource.timePrefix[0] : CalendarResource.resource.timePrefix[1];
        var realHour = (hour === 0 || hour === 12) ? '12' : (hour % 12).toString();
        var realMinute = minute < 10 ? '0' + minute.toString() : minute.toString();
        return timePrefix + ' ' + realHour + ':' + realMinute;
    };
    DateUtility.eraCount = 4;
    DateUtility.eraMax = new Date(2087, 12 - 1, 31, 23, 59, 59);
    DateUtility.eraMin = new Date(1868, 9 - 1, 8);
    DateUtility.eraDates = new Array(new Date(1868, 9 - 1, 8), new Date(1912, 7 - 1, 30), new Date(1926, 12 - 1, 25), new Date(1989, 0, 8));
    return DateUtility;
}());
var CalendarYearItem = (function () {
    function CalendarYearItem(year, selected, disabled, focused) {
        this.year = year;
        this.selected = !!selected;
        this.disabled = !!disabled;
        this.focused = !!focused;
    }
    CalendarYearItem.prototype.getLabel = function () {
        return this.year.toString();
    };
    return CalendarYearItem;
}());
var CalendarMonthItem = (function () {
    function CalendarMonthItem(month, selected, disabled, focused) {
        this.month = month;
        this.selected = !!selected;
        this.disabled = !!disabled;
        this.focused = !!focused;
    }
    CalendarMonthItem.prototype.getLabel = function () {
        return CalendarResource.resource.shortMonths[this.month];
    };
    return CalendarMonthItem;
}());
var CalendarDayItem = (function () {
    function CalendarDayItem(date, selected, disabled, focused) {
        this.date = date;
        this.selected = !!selected;
        this.disabled = !!disabled;
        this.focused = !!focused;
    }
    CalendarDayItem.prototype.getLabel = function () {
        return this.date.getDate().toString();
    };
    return CalendarDayItem;
}());


var CalendarData = (function () {
    function CalendarData(owner) {
        this.owner = owner;
        this.calendarPage = Core_1.CalendarPage.month;
        this.oldSelectedData = null;
        this.selectedDate = new Date();
        this.focusDate = new Date(this.selectedDate.valueOf());
        this.focusDateTimeIndex = -1;
        CalendarResource.initResource();
    }


    CalendarData.getMonthName = function (month) {
        return CalendarResource.resource.months[month];
    };
    CalendarData.getShortMonthName = function (month) {
        return CalendarResource.resource.shortMonths[month];
    };
    CalendarData.prototype.updateDayItems = function () {
        this.dayItems = [];
        var focusDateYear = this.focusDate.getFullYear();
        var focusDateMonth = this.focusDate.getMonth();
        var firstDay = new Date(focusDateYear, focusDateMonth, 1);
        var week = firstDay.getDay();
        var startDay = this.owner._startDay;
        var diff = week - startDay;
        var lastMonthCount = (diff < 0 ? (diff + 7) : diff) % 7;
        for (var day = lastMonthCount; day > 0; day--) {
            var date = new Date(focusDateYear, focusDateMonth, 1);
            date.setDate(date.getDate() - day);
            var item = new CalendarDayItem(date, false, true, false);
            this.dayItems.push(item);
        }
        for (var day = 1; day <= 42 - lastMonthCount; day++) {
            var date = new Date(focusDateYear, focusDateMonth, day);
            var item = new CalendarDayItem(date);
            if (date.getMonth() !== focusDateMonth) {
                item.disabled = true;
            }
            if (DateUtility.dateEqual(date, this.selectedDate)) {
                item.selected = true;
            }
            if (DateUtility.dateEqual(date, this.selectedDate)) {
                item.selected = true;
            }
            if (DateUtility.dateEqual(date, this.focusDate)) {
                item.focused = true;
            }
            this.dayItems.push(item);
        }
    };
    CalendarData.prototype.updateMonthItems = function () {
        var selectedDate = this.selectedDate;
        var focusDate = this.focusDate;
        this.monthItems = [];
        for (var month = 0; month < 12; month++) {
            var monthItem = new CalendarMonthItem(month);
            monthItem.selected = (selectedDate && selectedDate.getMonth() === month && selectedDate.getFullYear() === focusDate.getFullYear());
            monthItem.focused = (focusDate && focusDate.getMonth() === month);
            this.monthItems.push(monthItem);
        }
    };
    CalendarData.prototype.updateYearItems = function () {
        this.yearItems = [];
        for (var year = this.focusDateYearRangeStart - 1; year <= this.focusDateYearRangeEnd + 1; year++) {
            var yearItem = new CalendarYearItem(year);
            yearItem.selected = (this.selectedDate && this.selectedDate.getFullYear() === year);
            yearItem.focused = (this.focusDate && this.focusDate.getFullYear() === year);
            yearItem.disabled = (year < this.focusDateYearRangeStart || year > this.focusDateYearRangeEnd);
            this.yearItems.push(yearItem);
        }
    };
    CalendarData.prototype.updateYearRange = function () {
        this.focusDateYearRangeStart = Math.floor(this.focusDate.getFullYear() / 10) * 10;
        this.focusDateYearRangeEnd = this.focusDateYearRangeStart + 9;
    };
    CalendarData.prototype.getShortWeekName = function (weekIndex) {
        var shortWeeks = CalendarResource.resource.shortWeeks;
        var startDay = this.owner._startDay;
        weekIndex = (startDay + weekIndex - 1) % 7;
        return shortWeeks[weekIndex];
    };
    CalendarData.prototype.getCurrentMonthName = function () {
        var currentMonth = this.focusDate.getMonth();
        return CalendarData.getMonthName(currentMonth);
    };
    return CalendarData;
}());


var CalendarRender = (function (_super) {
    __extends(CalendarRender, _super);


    function CalendarRender(owner) {
        var _this = _super.call(this) || this;
        _this._maxYearRange = 40;
        _this._minYearRange = 40;
        _this._isOutOfRange = false;
        _this._owner = owner;
        return _this;
    }
    Object.defineProperty(CalendarRender.prototype, 'host', {
        get: function () {
            return this._owner.getContainer();
        },
        enumerable: true,
        configurable: true
    });


    CalendarRender.prototype.createCalendarDom = function () {
        var owner = this._owner;
        this._sectionDom = new CalendarSection();
        var outterContainerDiv = createElement('div');
        outterContainerDiv.tabIndex = 0;
        outterContainerDiv.classList.add(cls_calendarcontainer);
        if (owner._showTime) {
            outterContainerDiv.classList.add(cls_datetimecontainer);
        }
        else {
            outterContainerDiv.classList.add(cls_datecontainer);
        }
        var table = createElement('table');
        var contentRow = createElement('tr');
        var contentCell = createElement('td');
        contentCell.classList.add(cls_contenttddate);
        if (owner._showTime) {
            contentCell.classList.add(cls_contenttdtime);
        }
        contentCell.appendChild(this._createDatePartDom());
        contentRow.appendChild(contentCell);
        table.appendChild(contentRow);
        outterContainerDiv.appendChild(table);
        if (owner._showTime) {
            var okButtonRow = createElement('tr');
            var okButtonCell = createElement('td');
            contentCell.appendChild(this._createVerticalPartLine());
            contentCell.appendChild(this._createTimePartDom());
            okButtonCell.appendChild(this._createHorizontalPartLine());
            okButtonCell.appendChild(this._createOkButtonDom());
            okButtonRow.appendChild(okButtonCell);
            table.appendChild(okButtonRow);
        }
        this._sectionDom.outterContainerDiv = outterContainerDiv;
        var host = this.host;
        if (host) {
            host.innerHTML = '';
            host.appendChild(outterContainerDiv);
        }
    };
    CalendarRender.prototype._createOkButtonDom = function () {
        var okButtonDiv = createElement('div');
        okButtonDiv.classList.add(cls_okbuttoncontainer);
        var okButton = createElement('button');
        okButton.textContent = 'OK';
        okButton.className = cls_clbutton + ' ' + cls_clbuttonbrand + ' ' + cls_uiButton;
        okButtonDiv.appendChild(okButton);
        this._sectionDom.okButton = okButton;
        return okButtonDiv;
    };

    CalendarRender.prototype._createVerticalPartLine = function () {
        var partLine = createElement('div');
        partLine.classList.add(cls_datetimeverticalpartline);
        return partLine;
    };
    CalendarRender.prototype._createHorizontalPartLine = function () {
        var partLine = createElement('div');
        partLine.classList.add(cls_datetimehorizontalpartline);
        return partLine;
    };


    CalendarRender.prototype._createDatePartDom = function () {
        var dateContentDiv = createElement('div');
        dateContentDiv.className = cls_datepartcontainer + ' ' + cls_cldatepicker + ' ' + cls_cldropdown;
        dateContentDiv.tabIndex = 0;
        dateContentDiv.appendChild(this._createYearContainerDom());
        dateContentDiv.appendChild(this._createMonthContainerDom());
        dateContentDiv.appendChild(this._createDayContainerDom());
        this._sectionDom.dateContainerDiv = dateContentDiv;
        return dateContentDiv;
    };

    CalendarRender.prototype._createYearContainerDom = function () {
        var yearContainerDiv = createElement('div');
        yearContainerDiv.classList.add(cls_yearpage);
        yearContainerDiv.appendChild(this._createYearHeaderDom());
        yearContainerDiv.appendChild(this._createYearContentDom());
        return yearContainerDiv;
    };
    CalendarRender.prototype._createYearHeaderDom = function () {
        var headerDiv = createElement('div');
        headerDiv.className = cls_headercontainer + ' ' + cls_cldatepickerfilter + ' ' + cls_clgrid;
        var yearRangeDiv = createElement('div');
        yearRangeDiv.className = cls_cldatepickerfiltermonth + ' ' + cls_clgrid + ' ' + cls_clgridalignspread + ' ' + cls_clgrow;
        var yearRangeButtonDiv = createElement('div');
        yearRangeButtonDiv.classList.add(cls_clalignmiddle);
        var lastYearRangeButton = createElement('button');
        lastYearRangeButton.className = cls_clbutton + ' ' + cls_clbuttoniconcontainer;
        lastYearRangeButton.title = getSR().Calendar_LastTenYear;
        lastYearRangeButton.setAttribute('type', 'button');
        var divLastYear = createElement('div');
        divLastYear.classList.add(cls_leftarrow);
        lastYearRangeButton.appendChild(divLastYear);
        var yearRangeName = createElement('span');
        yearRangeName.classList.add(cls_clalignmiddle);
        var nextYearRangeButton = createElement('button');
        nextYearRangeButton.className = cls_clbutton + ' ' + cls_clbuttoniconcontainer;
        nextYearRangeButton.title = getSR().Calendar_NextTenYear;
        nextYearRangeButton.setAttribute('type', 'button');
        var divNextYear = createElement('div');
        divNextYear.classList.add(cls_rightarrow);
        nextYearRangeButton.appendChild(divNextYear);
        yearRangeDiv.appendChild(lastYearRangeButton);
        yearRangeDiv.appendChild(yearRangeName);
        yearRangeDiv.appendChild(nextYearRangeButton);
        var calendarYearSection = this._sectionDom.calendarYearSection;
        calendarYearSection.headerDiv = headerDiv;
        calendarYearSection.lastYearRangeButton = lastYearRangeButton;
        calendarYearSection.focusDateYearRangeName = yearRangeName;
        calendarYearSection.nextYearRangeButton = nextYearRangeButton;
        headerDiv.appendChild(yearRangeDiv);
        return headerDiv;
    };
    CalendarRender.prototype._createYearContentDom = function () {
        var contentTable = createElement('table');
        contentTable.className = cls_contentcontainer + ' ' + cls_cldatepickermonth;
        var animationDiv = createElement('div');
        animationDiv.appendChild(contentTable);
        this._sectionDom.calendarYearSection.currentYearRangeTable = contentTable;
        this._createYearsDom();
        return animationDiv;
    };
    CalendarRender.prototype._createYearsDom = function () {
        var calendarYearSection = this._sectionDom.calendarYearSection;
        var tbody = createElement('tbody');
        for (var row = 0; row < 3; row++) {
            var tr = createElement('tr');
            for (var col = 0; col < 4; col++) {
                var td = createElement('td');
                td.setAttribute(attr_yearindex, (row * 4 + col).toString());
                var span = createElement('span');
                span.classList.add(cls_clday);
                span.setAttribute(attr_yearindex, (row * 4 + col).toString());
                span.innerText = (row * 4 + col + 1).toString();
                td.appendChild(span);
                tr.appendChild(td);
                calendarYearSection.yearTds.push(td);
            }
            tbody.appendChild(tr);
        }
        calendarYearSection.currentYearRangeTable.appendChild(tbody);
    };


    CalendarRender.prototype._createMonthContainerDom = function () {
        var monthContainerDiv = createElement('div');
        monthContainerDiv.classList.add(cls_monthpage);
        monthContainerDiv.appendChild(this._createMonthHeaderDom());
        monthContainerDiv.appendChild(this._createMonthContentDom());
        return monthContainerDiv;
    };
    CalendarRender.prototype._createMonthHeaderDom = function () {
        var headerDiv = createElement('div');
        headerDiv.className = cls_headercontainer + ' ' + cls_cldatepickerfilter + ' ' + cls_clgrid;
        var yearDiv = createElement('div');
        yearDiv.className = cls_cldatepickerfiltermonth + ' ' + cls_clgrid + ' ' + cls_clgridalignspread + ' ' + cls_clgrow;
        var yearButtonDiv = createElement('div');
        yearButtonDiv.classList.add(cls_clalignmiddle);
        var lastYearButton = createElement('button');
        lastYearButton.className = cls_clbutton + ' ' + cls_clbuttoniconcontainer;
        lastYearButton.title = getSR().Calendar_LastYear;
        lastYearButton.setAttribute('type', 'button');
        var divLastYear = createElement('div');
        divLastYear.classList.add(cls_leftarrow);
        lastYearButton.appendChild(divLastYear);
        var yearName = createElement('span');
        yearName.className = cls_headertitle + ' ' + cls_clalignmiddle;
        var nextYearButton = createElement('button');
        nextYearButton.className = cls_clbutton + ' ' + cls_clbuttoniconcontainer;
        nextYearButton.title = getSR().Calendar_NextYear;
        nextYearButton.setAttribute('type', 'button');
        var divNextYear = createElement('div');
        divNextYear.classList.add(cls_rightarrow);
        nextYearButton.appendChild(divNextYear);
        yearDiv.appendChild(lastYearButton);
        yearDiv.appendChild(yearName);
        yearDiv.appendChild(nextYearButton);
        var calendarMonthSection = this._sectionDom.calendarMonthSection;
        calendarMonthSection.headerDiv = headerDiv;
        calendarMonthSection.lastYearButton = lastYearButton;
        calendarMonthSection.currentYearName = yearName;
        calendarMonthSection.nextYearButton = nextYearButton;
        headerDiv.appendChild(yearDiv);
        return headerDiv;
    };
    CalendarRender.prototype._createMonthContentDom = function () {
        var contentTable = createElement('table');
        contentTable.className = cls_contentcontainer + ' ' + cls_cldatepickermonth;
        var animationDiv = createElement('div');
        animationDiv.appendChild(contentTable);
        this._sectionDom.calendarMonthSection.currentYearTable = contentTable;
        this._createMonthsDom();
        return animationDiv;
    };
    CalendarRender.prototype._createMonthsDom = function () {
        var calendarMonthSection = this._sectionDom.calendarMonthSection;
        var tbody = createElement('tbody');
        for (var row = 0; row < 3; row++) {
            var tr = createElement('tr');
            for (var col = 0; col < 4; col++) {
                var td = createElement('td');
                td.setAttribute(attr_monthindex, (row * 4 + col + 1).toString());
                var span = createElement('span');
                span.classList.add(cls_clday);
                span.setAttribute(attr_monthindex, (row * 4 + col + 1).toString());
                span.innerText = (row * 4 + col + 1).toString();
                td.appendChild(span);
                tr.appendChild(td);
                calendarMonthSection.monthTds.push(td);
            }
            tbody.appendChild(tr);
        }
        calendarMonthSection.currentYearTable.appendChild(tbody);
    };


    CalendarRender.prototype._createDayContainerDom = function () {
        var dayContainerDiv = createElement('div');
        dayContainerDiv.classList.add(cls_daypage);
        dayContainerDiv.appendChild(this._createDayHeaderDom());
        dayContainerDiv.appendChild(this._createDayWeekDom());
        dayContainerDiv.appendChild(this._createDayContentDom());
        dayContainerDiv.appendChild(this._createDayTodayDom());
        return dayContainerDiv;
    };
    CalendarRender.prototype._createDayHeaderDom = function () {
        var headerDiv = createElement('div');
        headerDiv.className = cls_headercontainer + ' ' + cls_cldatepickerfilter + ' ' + cls_clgrid;
        var monthDiv = createElement('div');
        monthDiv.className = cls_cldatepickerfiltermonth + ' ' + cls_clgrid + ' ' + cls_clgridalignspread + ' ' + cls_clgrow;
        var monthButtonDiv = createElement('div');
        monthButtonDiv.classList.add(cls_clalignmiddle);
        var lastMonthButton = createElement('button');
        lastMonthButton.className = cls_clbutton + ' ' + cls_clbuttoniconcontainer;
        lastMonthButton.title = getSR().Calendar_LastMonth;
        lastMonthButton.setAttribute('type', 'button');
        var divLastMonth = createElement('div');
        divLastMonth.classList.add(cls_leftarrow);
        lastMonthButton.appendChild(divLastMonth);
        var monthName = createElement('span');
        monthName.className = cls_headertitle + ' ' + cls_clalignmiddle;
        var nextMonthButton = createElement('button');
        nextMonthButton.className = cls_clbutton + ' ' + cls_clbuttoniconcontainer;
        nextMonthButton.title = getSR().Calendar_NextMonth;
        nextMonthButton.setAttribute('type', 'button');
        var divNextMonth = createElement('div');
        divNextMonth.classList.add(cls_rightarrow);
        nextMonthButton.appendChild(divNextMonth);
        monthDiv.appendChild(lastMonthButton);
        monthDiv.appendChild(monthName);
        monthDiv.appendChild(nextMonthButton);
        var yearDiv = createElement('div');
        yearDiv.className = cls_yearselectdiv + ' ' + cls_clshrinknone;
        var yearSelectDiv = createElement('div');
        yearSelectDiv.classList.add(cls_clselectcontainer);
        var yearSelect = createElement('select');
        yearSelect.classList.add(cls_clselect);
        var now = new Date();
        var startYear = now.getFullYear() - this._minYearRange;
        var endYear = now.getFullYear() + this._maxYearRange;
        for (var year = startYear; year <= endYear; year++) {
            var option = createElement('option');
            option.text =

                year.toString();
            option.value = year.toString();
            yearSelect.options.add(option);
        }
        var timeSelectDiv = createElement('div');
        timeSelectDiv.classList.add(cls_clselectcontainer);
        yearSelectDiv.appendChild(yearSelect);
        yearDiv.appendChild(yearSelectDiv);


        {
            headerDiv.appendChild(yearDiv);
            headerDiv.appendChild(monthDiv);
        }
        var calendarDaySection = this._sectionDom.calendarDaySection;
        calendarDaySection.headerDiv = headerDiv;
        calendarDaySection.lastMonthButton = lastMonthButton;
        calendarDaySection.currentMonthName = monthName;
        calendarDaySection.nextMonthButton = nextMonthButton;
        calendarDaySection.yearSelect = yearSelect;
        return headerDiv;
    };
    CalendarRender.prototype._createDayWeekDom = function () {
        var weekDiv = createElement('div');
        weekDiv.className = cls_weekcontainer + ' ' + cls_cldatepickerfilter + ' ' + cls_clgrid;
        var weekTable = createElement('table');
        weekTable.className = cls_contentcontainer + ' ' + cls_cldatepickermonth;
        var thead = createElement('thead');
        var tr = createElement('tr');
        for (var i = 0; i < 7; i++) {
            var th = createElement('th');
            th.setAttribute(attr_weekindex, i.toString());
            var abbr = createElement('span');
            abbr.classList.add(cls_week);
            abbr.setAttribute(attr_weekindex, i.toString());
            abbr.innerText = this._owner._data.getShortWeekName(i);
            th.appendChild(abbr);
            tr.appendChild(th);
            this._sectionDom.calendarDaySection.weekThs.push(th);
        }
        thead.appendChild(tr);
        weekTable.appendChild(thead);
        weekDiv.appendChild(weekTable);
        return weekDiv;
    };
    CalendarRender.prototype._createDayContentDom = function () {
        var calendarDaySection = this._sectionDom.calendarDaySection;
        var animationContainerDiv = createElement('div');
        var animationDiv = createElement('div');
        var dayContentTable = createElement('table');
        dayContentTable.className = cls_contentcontainer + ' ' + cls_cldatepickermonth;
        var tbody = createElement('tbody');
        for (var row = 0; row < 6; row++) {
            var tr = createElement('tr');
            for (var col = 0; col < 7; col++) {
                var td = createElement('td');
                td.setAttribute(attr_dayindex, (row * 7 + col).toString());
                var span = createElement('span');
                span.classList.add(cls_clday);
                span.setAttribute(attr_dayindex, (row * 7 + col).toString());
                td.appendChild(span);
                tr.appendChild(td);
                calendarDaySection.dayTds.push(td);
            }
            tbody.appendChild(tr);
        }
        dayContentTable.appendChild(tbody);
        animationDiv.appendChild(dayContentTable);
        animationContainerDiv.appendChild(animationDiv);
        calendarDaySection.dayContentTable = dayContentTable;
        return animationContainerDiv;
    };
    CalendarRender.prototype._createDayTodayDom = function () {
        var todayDiv = createElement('div');
        todayDiv.classList.add(cls_todaycontainer);
        var todayTable = createElement('table');
        todayTable.classList.add(cls_contentcontainer);
        var tbody = createElement('tbody');
        var todayTr = createElement('tr');
        var todayTd = createElement('td');
        var todayA = createElement('a');
        todayA.href = 'javascript:void(0);';
        todayA.className = cls_clshowinlineblock + ' ' + cls_clpbottomxsmall;
        todayA.innerText = CalendarResource.resource.today;
        todayTd.appendChild(todayA);
        todayTr.appendChild(todayTd);
        tbody.appendChild(todayTr);
        todayTable.appendChild(tbody);
        todayDiv.appendChild(todayTable);
        this._sectionDom.calendarDaySection.todayTd = todayTd;
        this._sectionDom.calendarDaySection.todayTable = todayTable;
        return todayDiv;
    };


    CalendarRender.prototype._createTimePartDom = function () {
        var _this = this;
        var timeContainerDiv = createElement('div');
        timeContainerDiv.className = cls_timepartcontainer + ' ' + cls_cldatepicker + ' ' + cls_cldropdown;
        timeContainerDiv.tabIndex = 0;
        this._sectionDom.timeContainerDiv = timeContainerDiv;
        this._timePicker = new timepicker_1.TimePicker(timeContainerDiv);
        this._timePicker.setOptions({
            step: { minute: 30 },
            height: 260,
        });
        this._timePicker.on(baseControl_1.BaseDropdown.Event_ValueChanged, function (value) {
            _this._onTimePickerValueChanged(value);
        });
        return timeContainerDiv;
    };


    CalendarRender.prototype.updateCalendarDom = function () {
        this._updateDatePartDom();
        if (this._owner._showTime) {
            this._updateTimePartDom();
        }
    };

    CalendarRender.prototype._updateDatePartDom = function () {
        switch (this._owner._data.calendarPage) {
            case Core_1.CalendarPage.year:
                this._updateCalendarYearDom();
                break;
            case Core_1.CalendarPage.month:
                this._updateCalendarMonthDom();
                break;
            case Core_1.CalendarPage.day:
                this._updateCalendarDayDom();
                break;
        }
    };
    CalendarRender.prototype._updateCalendarDomHeader = function () {
        var data = this._owner._data;
        var calendarDaySection = this._sectionDom.calendarDaySection;
        var finded = false;
        calendarDaySection.currentMonthName.innerText = data.getCurrentMonthName();
        var year = data.focusDate.getFullYear();
        var yearSelect = calendarDaySection.yearSelect;
        for (var i = 0; i < yearSelect.options.length; i++) {
            if (year.toString() === yearSelect.options[i].value) {
                yearSelect.selectedIndex = i;
                finded = true;
                break;
            }
        }
        var count = this._maxYearRange + this._minYearRange + 1;
        if (!finded) {
            var option = createElement('option');
            option.text = year.toString();
            option.value = year.toString();
            yearSelect.options[count] = option;
            yearSelect.selectedIndex = count;
        }
        else {
            if (yearSelect.options[count] && yearSelect.selectedIndex <= count - 1) {
                yearSelect.options[count].remove();
            }
        }
    };
    CalendarRender.prototype._updateCalendarYearDom = function () {
        var data = this._owner._data;
        var calendarYearSection = this._sectionDom.calendarYearSection;
        data.updateYearItems();
        calendarYearSection.focusDateYearRangeName.innerText = data.focusDateYearRangeStart.toString() + ' - ' + data.focusDateYearRangeEnd.toString();
        var yearsTd = calendarYearSection.yearTds;
        var yearItems = data.yearItems;
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 4; col++) {
                var year = row * 4 + col;
                var yearItem = yearItems[year];
                var td = yearsTd[year];
                var span = td.querySelector('span');
                span.innerText = yearItem.getLabel();
                if (yearItem.disabled) {
                    td.classList.add(cls_cldisabledtext);
                }
                else {
                    td.classList.remove(cls_cldisabledtext);
                }
                if (yearItem.selected) {
                    td.classList.add(cls_clisselected);
                }
                else {
                    td.classList.remove(cls_clisselected);
                }
                if (yearItem.focused) {
                    span.classList.add(cls_isfocused);
                }
                else {
                    span.classList.remove(cls_isfocused);
                }
            }
        }
    };
    CalendarRender.prototype._updateCalendarMonthDom = function () {
        var data = this._owner._data;
        var calendarMonthSection = this._sectionDom.calendarMonthSection;
        data.updateMonthItems();
        var year = data.focusDate.getFullYear();
        var monthItems = data.monthItems;
        var monthTds = calendarMonthSection.monthTds;
        calendarMonthSection.currentYearName.innerText =

            year.toString();
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 4; col++) {
                var month = row * 4 + col;
                var monthItem = monthItems[month];
                var td = monthTds[month];
                var span = td.querySelector('span');
                span.innerText = monthItem.getLabel();
                if (monthItem.selected) {
                    td.classList.add(cls_clisselected);
                }
                else {
                    td.classList.remove(cls_clisselected);
                }
                if (monthItem.focused) {
                    span.classList.add(cls_isfocused);
                }
                else {
                    span.classList.remove(cls_isfocused);
                }
            }
        }
    };
    CalendarRender.prototype._updateCalendarDayDom = function () {
        this._updateCalendarDomHeader();
        this._updateCalendarDomDays();
    };
    CalendarRender.prototype._updateCalendarDomDays = function () {
        var data = this._owner._data;
        data.updateDayItems();
        var dayItems = data.dayItems;
        var daysTd = this._sectionDom.calendarDaySection.dayTds;
        for (var row = 0; row < 6; row++) {
            for (var col = 0; col < 7; col++) {
                var index = row * 7 + col;
                var dayItem = dayItems[index];
                var td = daysTd[index];
                var span = td.querySelector('span');
                span.innerText = dayItem.getLabel();
                if (dayItem.disabled) {
                    td.classList.add(cls_cldisabledtext);
                }
                else {
                    td.classList.remove(cls_cldisabledtext);
                }
                if (dayItem.focused) {
                    span.classList.add(cls_isfocused);
                }
                else {
                    span.classList.remove(cls_isfocused);
                }
                if (dayItem.selected) {
                    td.classList.add(cls_clisselected);
                }
                else {
                    td.classList.remove(cls_clisselected);
                }
            }
        }
    };


    CalendarRender.prototype._updateTimePartDom = function () {
        this._timePicker.setValue(this._owner._data.selectedDate);
    };


    CalendarRender.prototype.attachEvent = function () {
        this._attachKeyEvent();
        this.attachDateEvent();
        if (this._owner._showTime) {
            this.attachTimeEvent();
        }
    };

    CalendarRender.prototype._attachKeyEvent = function () {
        var _this = this;
        this._sectionDom.outterContainerDiv.addEventListener('keydown', function (e) {
            _this._onKeyDown(e);
        });
    };
    CalendarRender.prototype._onKeyDown = function (e) {
        if (e.keyCode === 9) {
            if (this._owner._showTime) {
                if (this._owner._data.calendarActivePart === CalendarActivePart.Date) {
                    this.setCalendarActivePart(CalendarActivePart.Time);
                }
                else {
                    this.setCalendarActivePart(CalendarActivePart.Date);
                }
            }
            e.preventDefault();
            return;
        }
        if (this._owner._data.calendarActivePart === CalendarActivePart.Date) {
            this._onDateKeyDown(e);
        }
        else {

        }
    };
    CalendarRender.prototype._onDateKeyDown = function (e) {
        switch (this._owner._data.calendarPage) {
            case Core_1.CalendarPage.year:
                this._processYearPageKeyDown(e);
                break;
            case Core_1.CalendarPage.month:
                this._processMonthPageKeyDown(e);
                break;
            case Core_1.CalendarPage.day:
                this._processDayPageKeyDown(e);
                break;
        }
    };
    CalendarRender.prototype._processYearPageKeyDown = function (e) {
        var data = this._owner._data;
        var focusDate = data.focusDate;
        switch (e.keyCode) {
            case 13:
                data.selectedDate = new Date(focusDate.valueOf());
                this.showCalendarPage(Core_1.CalendarPage.month);
                break;
            case 32:
                data.selectedDate = new Date(focusDate.valueOf());
                break;
            case 37:
                this._lastYear();
                break;
            case 39:
                this._nextYear();
                break;
            case 38:
                this._lastYear(4);
                break;
            case 40:
                if (e.ctrlKey || e.metaKey) {
                    this._yearToMonth();
                }
                else {
                    this._nextYear(4);
                }
                break;
            case 36:
                focusDate.setFullYear(data.focusDateYearRangeStart);
                break;
            case 35:
                focusDate.setFullYear(data.focusDateYearRangeEnd);
                break;
            case 33:
                this._lastYearRange();
                break;
            case 34:
                this._nextYearRange();
                break;
        }
        data.updateYearRange();
        this._updateDatePartDom();
    };
    CalendarRender.prototype._processMonthPageKeyDown = function (e) {
        var data = this._owner._data;
        var focusDate = data.focusDate;
        switch (e.keyCode) {
            case 13:
                data.selectedDate = new Date(focusDate.valueOf());
                this.showCalendarPage(Core_1.CalendarPage.day);
                break;
            case 32:
                data.selectedDate = new Date(focusDate.valueOf());
                break;
            case 37:
                this._lastMonth();
                break;
            case 39:
                this._nextMonth();
                break;
            case 38:
                if (e.ctrlKey || e.metaKey) {
                    this._monthToYear();
                }
                else {
                    this._lastMonth(4);
                }
                break;
            case 40:
                if (e.ctrlKey || e.metaKey) {
                    this._monthToDay();
                }
                else {
                    this._nextMonth(4);
                }
                break;
            case 36:
                focusDate.setMonth(0);
                break;
            case 35:
                focusDate.setMonth(11);
                break;
            case 33:
                this._lastYear();
                break;
            case 34:
                this._nextYear();
                break;
        }
        this._updateDatePartDom();
    };
    CalendarRender.prototype._processDayPageKeyDown = function (e) {
        var data = this._owner._data;
        var focusDate = data.focusDate;

        var year = focusDate.getFullYear();
        var month = focusDate.getMonth();
        var day = focusDate.getDate();
        var monthMaxDay = DateUtility.getMonthMaxDay(year, month + 1);
        switch (e.keyCode) {
            case 13:

                data.selectedDate = new Date(focusDate.valueOf());
                this._finish();
                return;
            case 32:
                data.selectedDate = new Date(focusDate.valueOf());
                break;
            case 37:
                focusDate.setDate(day - 1);
                break;
            case 39:
                focusDate.setDate(day + 1);
                break;
            case 38:
                focusDate.setDate(day - 7);
                break;
            case 40:
                focusDate.setDate(day + 7);
                break;
            case 36:
                focusDate.setDate(1);
                break;
            case 35:
                focusDate.setDate(monthMaxDay);
                break;
            case 33:
                if (e.shiftKey) {
                    this._lastMonth(12);
                }
                else {
                    this._lastMonth();
                }
                break;
            case 34:
                if (e.shiftKey) {
                    this._nextMonth(12);
                }
                else {
                    this._nextMonth();
                }
                break;
        }


        data.selectedDate = new Date(focusDate.valueOf());
        this._updateDatePartDom();
    };


    CalendarRender.prototype.attachDateEvent = function () {
        var self = this;
        this._sectionDom.dateContainerDiv.addEventListener('click', function (e) {
            var srcElement = e.target;
            if (srcElement && (srcElement === self._sectionDom.calendarDaySection.yearSelect
                || srcElement.parentElement === self._sectionDom.calendarDaySection.yearSelect )) {
                return;
            }
            self.setCalendarActivePart(CalendarActivePart.Date);
        });
        this.attachYearEvent();
        this.attachMonthEvent();
        this.attachDayEvent();
    };

    CalendarRender.prototype.attachYearEvent = function () {
        var _this = this;
        this._sectionDom.calendarYearSection.lastYearRangeButton.addEventListener('click', function (e) {
            _this._lastYearRange();
            _this._updateDatePartDom();
        });
        this._sectionDom.calendarYearSection.nextYearRangeButton.addEventListener('click', function (e) {
            _this._nextYearRange();
            _this._updateDatePartDom();
        });
        this._sectionDom.calendarYearSection.currentYearRangeTable.addEventListener('click', function (e) {
            _this._onYearsClick(e);
        });
    };
    CalendarRender.prototype._lastYearRange = function () {
        var data = this._owner._data;
        data.focusDateYearRangeStart -= 10;
        data.focusDateYearRangeEnd = data.focusDateYearRangeStart + 9;
        data.focusDate.setFullYear(data.focusDate.getFullYear() - 10);
    };
    CalendarRender.prototype._nextYearRange = function () {
        var data = this._owner._data;
        data.focusDateYearRangeStart += 10;
        data.focusDateYearRangeEnd = data.focusDateYearRangeStart + 9;
        data.focusDate.setFullYear(data.focusDate.getFullYear() + 10);
    };
    CalendarRender.prototype._yearToMonth = function () {
        this.showCalendarPage(Core_1.CalendarPage.month);
    };
    CalendarRender.prototype._onYearsClick = function (e) {
        var srcElement = (e.srcElement || e.target);
        if (srcElement) {
            var yearIndex = +srcElement.getAttribute(attr_yearindex);
            var yearItem = this._owner._data.yearItems[yearIndex];
            this._owner._data.focusDate.setFullYear(yearItem.year);
            this._yearToMonth();
        }
    };


    CalendarRender.prototype.attachMonthEvent = function () {
        var _this = this;
        this._sectionDom.calendarMonthSection.lastYearButton.addEventListener('click', function (e) {
            _this._lastYear();
            _this._updateDatePartDom();
        });
        this._sectionDom.calendarMonthSection.nextYearButton.addEventListener('click', function (e) {
            _this._nextYear();
            _this._updateDatePartDom();
        });
        this._sectionDom.calendarMonthSection.currentYearName.addEventListener('click', function (e) {
            _this._monthToYear();
        });
        this._sectionDom.calendarMonthSection.currentYearTable.addEventListener('click', function (e) {
            _this._onMonthsClick(e);
        });
    };
    CalendarRender.prototype._lastYear = function (offset) {
        var yearOffset = offset ? offset : 1;
        var year = Math.max(this._owner._data.focusDate.getFullYear() - yearOffset, 0);
        this._owner._data.focusDate.setFullYear(year);
    };
    CalendarRender.prototype._nextYear = function (offset) {
        var yearOffset = offset ? offset : 1;
        var year = Math.min(this._owner._data.focusDate.getFullYear() + yearOffset, 9999);
        this._owner._data.focusDate.setFullYear(year);
    };
    CalendarRender.prototype._monthToYear = function () {
        this._owner._data.updateYearRange();
        this.showCalendarPage(Core_1.CalendarPage.year);
    };
    CalendarRender.prototype._monthToDay = function () {
        this.showCalendarPage(Core_1.CalendarPage.day);
    };
    CalendarRender.prototype._onMonthsClick = function (e) {
        var srcElement = (e.srcElement || e.target);
        if (srcElement) {
            var month = +srcElement.getAttribute(attr_monthindex);
            this._owner._data.focusDate.setMonth(month - 1);
            this._monthToDay();
        }
    };


    CalendarRender.prototype.attachDayEvent = function () {
        var _this = this;
        var calendarDaySection = this._sectionDom.calendarDaySection;
        calendarDaySection.lastMonthButton.addEventListener('click', function (e) {
            _this._lastMonth();
            if (_this._isOutOfRange) {
                return;
            }
            _this._updateDatePartDom();
        });
        calendarDaySection.nextMonthButton.addEventListener('click', function (e) {
            _this._nextMonth();
            if (_this._isOutOfRange) {
                return;
            }
            _this._updateDatePartDom();
        });
        calendarDaySection.currentMonthName.addEventListener('click', function (e) {
            _this._dayToMonth();
        });
        calendarDaySection.todayTable.addEventListener('click', function (e) {
            _this._gotoToday();
        });
        calendarDaySection.dayContentTable.addEventListener('click', function (e) {
            _this._onDaysClick(e);
        });
        calendarDaySection.yearSelect.addEventListener('change', function (e) {
            _this._onYearChanged(e);
        });

        this._sectionDom.calendarDaySection.yearSelect.addEventListener('keydown', function (e) {
            e.stopPropagation();
        });
    };
    CalendarRender.prototype._lastMonth = function (offset) {
        var data = this._owner._data;
        var monthOffset = offset ? offset : 1;
        var year = data.focusDate.getFullYear();
        var month = data.focusDate.getMonth() - monthOffset;
        var day = data.focusDate.getDate();
        if (month < 0) {
            month += 12;
            year -= 1;
        }
        var maxDay = DateUtility.getMonthMaxDay(year, month + 1);
        var date = new Date(year, month, Math.min(day, maxDay));


        data.focusDate = date;
    };


    CalendarRender.prototype._nextMonth = function (offset) {
        var data = this._owner._data;
        var monthOffset = offset ? offset : 1;
        var year = data.focusDate.getFullYear();
        var month = data.focusDate.getMonth() + monthOffset;
        var day = data.focusDate.getDate();
        if (month > 11) {
            month -= 12;
            year += 1;
        }
        var maxDay = DateUtility.getMonthMaxDay(year, month + 1);
        var date = new Date(year, month, Math.min(day, maxDay), data.focusDate.getHours(), data.focusDate.getMinutes(), data.focusDate.getSeconds());


        data.focusDate = date;
    };
    CalendarRender.prototype._dayToMonth = function () {
        this.showCalendarPage(Core_1.CalendarPage.month);
    };
    CalendarRender.prototype._onDaysClick = function (e) {
        var data = this._owner._data;
        var srcElement = (e.srcElement || e.target);
        if (srcElement) {
            var index = srcElement.getAttribute(attr_dayindex);
            var daysItem = data.dayItems;
            var dayItem = daysItem[+index];
            var date = dayItem.date;
            var selectedDate = data.selectedDate;
            var newDate = selectedDate ? new Date(selectedDate.valueOf()) : new Date();
            data.selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds(), newDate.getMilliseconds());
            data.focusDate = new Date(data.selectedDate.valueOf());
            this._updateDatePartDom();
            if (!this._owner._showTime) {
                this._finish();
            }
        }
        this._sectionDom.dateContainerDiv.focus();
    };
    CalendarRender.prototype._gotoToday = function () {
        var owner = this._owner;
        var selectedDate = owner._data.selectedDate;
        var oldDate = selectedDate ? new Date(selectedDate.valueOf()) : null;

        var newDate = new Date();
        if (oldDate) {
            newDate.setHours(oldDate.getHours());
            newDate.setMinutes(oldDate.getMinutes());
            newDate.setSeconds(0);
        }
        owner._data.selectedDate = newDate;
        owner._data.focusDate = new Date(newDate.valueOf());
        this._updateDatePartDom();
        if (!owner._showTime) {
            this._finish();
        }
    };
    CalendarRender.prototype._onYearChanged = function (e) {
        var srcElement = (e.srcElement || e.target);
        if (srcElement) {
            this._owner._data.focusDate.setFullYear(+srcElement.value);
            this.updateCalendarDom();
        }
    };


    CalendarRender.prototype.attachTimeEvent = function () {
        var _this = this;
        this._sectionDom.timeContainerDiv.addEventListener('click', function (e) {
            _this.setCalendarActivePart(CalendarActivePart.Time);
        });
        this._sectionDom.okButton.addEventListener('click', function (e) {
            _this._finish();
        });
    };
    CalendarRender.prototype._onTimePickerValueChanged = function (value) {
        var data = this._owner._data;
        var date = data.selectedDate ? new Date(data.selectedDate.valueOf()) : new Date();
        var valueDate = value.value;
        date.setHours(valueDate.getHours());
        date.setMinutes(valueDate.getMinutes());
        date.setSeconds(valueDate.getSeconds());
        data.selectedDate = date;
        data.focusDate = new Date(date.valueOf());
    };


    CalendarRender.prototype._finish = function () {
        var data = this._owner._data;
        this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, {
            oldValue: data.oldSelectedData,
            newValue: data.selectedDate
        });
        data.oldSelectedData = data.selectedDate;
    };
    CalendarRender.prototype.showCalendarPage = function (page) {
        var yearContainerDiv = this.host.querySelector('.' + cls_yearpage);
        var monthContainerDiv = this.host.querySelector('.' + cls_monthpage);
        var dayContainerDiv = this.host.querySelector('.' + cls_daypage);
        yearContainerDiv.style.display = 'none';
        monthContainerDiv.style.display = 'none';
        dayContainerDiv.style.display = 'none';
        switch (page) {
            case Core_1.CalendarPage.year:
                yearContainerDiv.style.display = '';
                break;
            case Core_1.CalendarPage.month:
                monthContainerDiv.style.display = '';
                break;
            case Core_1.CalendarPage.day:
                dayContainerDiv.style.display = '';
                break;
        }
        this._owner._data.calendarPage = page;
        this.updateCalendarDom();
    };
    CalendarRender.prototype.setCalendarActivePart = function (calendarActivePart) {
        this._owner._data.calendarActivePart = calendarActivePart;
        this._sectionDom.dateContainerDiv.classList.remove(cls_focuspartindicator);
        if (this._owner._showTime) {
            this._sectionDom.timeContainerDiv.classList.remove(cls_focuspartindicator);
        }
        switch (calendarActivePart) {
            case CalendarActivePart.Date:
                if (this._owner._showTime) {
                    this._sectionDom.dateContainerDiv.classList.add(cls_focuspartindicator);
                }
                this._sectionDom.outterContainerDiv.focus();
                break;
            case CalendarActivePart.Time:
                if (this._owner._showTime) {
                    this._sectionDom.timeContainerDiv.classList.add(cls_focuspartindicator);
                }
                this._sectionDom.outterContainerDiv.focus();
                break;
        }
    };

    CalendarRender.Event_GetHost = 'GetHost';
    return CalendarRender;
}(eventbase_1.EventBase));


var Calendar = (function (_super) {
    __extends(Calendar, _super);
    function Calendar(host, option) {
        var _this = _super.call(this, host) || this;
        _this._startDay = 7;
        _this._showTime = true;
        _this._data = new CalendarData(_this);
        _this._render = new CalendarRender(_this);
        _this._render.on(baseControl_1.BaseDropdown.Event_ValueChanged, function (dateValue) {
            var df = Common_1.Common.CultureManager._getCultureInfo(Common_1.Common.CultureManager.culture()).DateTimeFormat;
            var pattern = _this._showTime ? df.defaultDatePattern : df.shortDatePattern;
            var result = new Common_1.Formatter.GeneralFormatter(pattern).format(dateValue.newValue);
            _this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { text: result, value: dateValue.newValue });
        });
        _this._render.on(CalendarRender.Event_GetHost, function (args) {
            args.host = _this._host;
        });
        _this._render.createCalendarDom();
        _this._render.attachEvent();
        _this.setValue(new Date());
        _this._render.showCalendarPage(Core_1.CalendarPage.day);
        _this._render.setCalendarActivePart(CalendarActivePart.Date);
        if (option) {
            _this.setOptions(option);
        }
        return _this;
    }
    Calendar.prototype.setOptions = function (option) {
        if (!option) {
            return;
        }
        if (!option.showTime) {
            this._showTime = option.showTime;
            this._render.createCalendarDom();
            this._render.attachEvent();
        }
        var calendarPage = (option && option.calendarPage) ? option.calendarPage : Core_1.CalendarPage.day;
        var startDay = (option && option.startDay) ? option.startDay : Core_1.CalendarStartDay.saturday;
        if (startDay !== this._startDay) {
            this._startDay = startDay;
            this._host.innerHTML = '';
            this._render.createCalendarDom();
            this._render.attachEvent();
        }
        this._render.showCalendarPage(calendarPage);
        this._render.setCalendarActivePart(CalendarActivePart.Date);
    };
    Calendar.prototype.setValue = function (value) {
        var data = this._data;
        data.selectedDate = value;
        data.oldSelectedData = new Date(value.valueOf());
        data.focusDate = new Date(value.valueOf());
        data.updateYearRange();
    };
    Calendar.prototype.scrollToSelect = function () {
        this._render.updateCalendarDom();
    };
    return Calendar;
}(baseControl_1.BaseDropdown));
exports.Calendar = Calendar;
/***/ }),

/***/ './dist/plugins/celltype/editor/colorpicker.js':
/*!*****************************************************!*\
  !*** ./dist/plugins/celltype/editor/colorpicker.js ***!
  \*****************************************************/
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
var listControl_1 = __webpack_require__(/*! ./listControl */ './dist/plugins/celltype/editor/listControl.js');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var celltypes_ns_1 = __webpack_require__(/*! ../celltypes.ns */ './dist/plugins/celltype/celltypes.ns.js');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var GROUP_NAME = 'group-name';
var rm = new Common_1.Common.ResourceManager(celltypes_ns_1.SR);
var getSR = rm.getResource.bind(rm);


var ColorPicker = (function (_super) {
    __extends(ColorPicker, _super);


    function ColorPicker(host, options) {
        var _this = _super.call(this, host) || this;
        _this._init();
        _this.setOptions(options);
        return _this;
    }


    ColorPicker.prototype.setOptions = function (option) {
        if (!option) {
            this._update();
            return;
        }
        this.options = this.options || {};
        if (!isNullOrUndefined(option.colorBlockSize)) {
            var colorWidth = parseInt(option.colorBlockSize, 10);
            if (!isNaN(colorWidth) && colorWidth >= 0) {
                this.options.colorBlockSize = option.colorBlockSize;
            }
        }
        if (!isNullOrUndefined(option.groups)) {
            this.options.groups = option.groups;
        }
        this._update();
    };
    ColorPicker.prototype.setValue = function (value) {
        if (!isNullOrUndefined(value)) {
            this._selectedColor = value;
            this._selectedGroup = null;
            this._update();
        }
    };


    ColorPicker.prototype._init = function () {
        var _this = this;
        var dcg = ColorPicker.DefaultColorGroup();
        var colorGroups = [];
        for (var i = 0; i < dcg.length; i++) {
            colorGroups.push({
                name: dcg[i].name,
                colors: dcg[i].colors,
                needScaleColor: dcg[i].needScaleColor
            });
        }
        this.options = {
            colorBlockSize: ColorPicker.DefaultCellWidth,
            groups: colorGroups
        };
        this._outerDiv = document.createElement('div');
        this._outerDiv.classList.add('gc-color-picker-outer-div');
        this._outerDiv.addEventListener('click', function (e) {
            _this._onMouseClick(e);
        });
        this._host.appendChild(this._outerDiv);
    };
    ColorPicker.prototype._update = function () {
        this._outerDiv.innerHTML = '';
        new listControl_1.List(this._outerDiv, this._getColorListData());
        this._updateSelection();
    };
    ColorPicker.prototype._updateSelection = function () {
        var cells = this._outerDiv.querySelectorAll('.gc-color-picker-color-cell');
        if (cells.length > 0) {
            for (var i = 0; i < cells.length; i++) {
                cells[i].classList.remove('selected');
                var color = cells[i].getAttribute('color');
                var groupName = cells[i].getAttribute(GROUP_NAME);
                if (this._selectedColor === color) {
                    if (!this._selectedGroup ||
                        (this._selectedGroup && this._selectedGroup === groupName)) {
                        cells[i].classList.add('selected');
                    }
                }
            }
        }
    };
    ColorPicker.prototype._getMaxColorCellLength = function () {
        var max = 0;
        var colorGroups = this.options.groups;
        for (var i = 0; i < colorGroups.length; i++) {
            var colorGroup = colorGroups[i];
            for (var row = 0; row < colorGroup.colors.length; row++) {
                var rowColors = colorGroup.colors[row];
                max = Math.max(max, rowColors.length);
            }
        }
        return max;
    };
    ColorPicker.prototype._getColorListData = function () {
        var items = [];
        var cellWidth = this.options.colorBlockSize || ColorPicker.DefaultCellWidth;
        var cellLength = this._getMaxColorCellLength();
        var colorGroups = this.options.groups;
        for (var i = 0; i < colorGroups.length; i++) {
            var item = this._generateGroupToListData(colorGroups[i], cellWidth, cellLength);
            items.push(item);
            if (colorGroups[i].needScaleColor) {
                var group = this._initThemeColors(colorGroups[i].colors[0]);
                items.push(this._generateGroupToListData(group, cellWidth, cellLength));
            }
        }
        return {
            items: items
        };
    };
    ColorPicker.prototype._initThemeColors = function (colors) {
        var group = {};
        var themeColors = [];
        themeColors.length = 5;
        var columnCount = 5;
        var WhiteBlackChanges = [-5, -15, -25, -35, -50];
        var LightDarkChanges = [-10, -25, -50, -75, -90];
        var LightDarkDegree = [80, 60, 40, -25, -50];
        var tempSpan = document.createElement('span');
        var colorLength = colors.length;
        tempSpan.style.display = 'none';
        document.body.appendChild(tempSpan);
        try {
            for (var i = 0; i < colorLength; i++) {
                var _a = this._transferColorToRGB(colors[i], tempSpan), r = _a[0], g = _a[1], b = _a[2];
                var cb = this._getColorBrightness(r, g, b);
                for (var j = 0; j < 5; j++) {
                    if (!themeColors[j]) {
                        var arr = [];
                        arr.length = colorLength;
                        themeColors[j] = arr;
                    }
                    if (cb === 1) {
                        themeColors[j][i] = this._updateTint(r, g, b, WhiteBlackChanges[j]);
                    }
                    else if (cb >= 0.8) {
                        themeColors[j][i] = this._updateTint(r, g, b, LightDarkChanges[j]);
                    }
                    else if (cb === 0) {
                        themeColors[j][i] = this._updateTint(r, g, b, Math.abs(WhiteBlackChanges[columnCount - j - 1]));
                    }
                    else if (cb <= 0.2) {
                        themeColors[j][i] = this._updateTint(r, g, b, Math.abs(LightDarkChanges[columnCount - j - 1]));
                    }
                    else {
                        themeColors[j][i] = this._updateTint(r, g, b, LightDarkDegree[j]);
                    }
                }
            }
            group.colors = themeColors;
        }
        finally {
            document.body.removeChild(tempSpan);
        }
        return group;
    };
    ColorPicker.prototype._transferColorToRGB = function (color, tempSpan) {
        var r, g, b;
        tempSpan.style.color = color;
        var rgb = window.getComputedStyle(tempSpan).color;
        var aColor = rgb.replace(/(?:\(|\)|rgba|RGBA|rgb|RGB)*/g, '').split(',');
        r = parseInt(aColor[0], 10);
        g = parseInt(aColor[1], 10);
        b = parseInt(aColor[2], 10);
        return [r, g, b];
    };
    ColorPicker.prototype._updateTint = function (r, g, b, tint) {
        tint = tint / 100.0;
        var hls = this._hLSColor(r, g, b);
        var lumDiff = parseInt((tint > 0 ? ((240 - hls.luminosity) * tint) : (hls.luminosity * tint)).toString(), 10);
        var newColor = this._colorFromHLS(hls.hue, hls.luminosity + lumDiff, hls.saturation);
        return this._rgbToHex(newColor.r, newColor.g, newColor.b);
    };
    ColorPicker.prototype._componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    ColorPicker.prototype._rgbToHex = function (r, g, b) {
        return '#' + this._componentToHex(r) + this._componentToHex(g) + this._componentToHex(b);
    };
    ColorPicker.prototype._colorFromHLS = function (hue, luminosity, saturation) {
        var r, g, b;
        if (saturation === 0) {
            r = g = b = parseInt(((luminosity * 0xff) / 240).toString(), 10);
        }
        else {
            var n1 = void 0, n2 = void 0;
            if (luminosity <= 120) {
                n2 = ((luminosity * (240 + saturation)) + 120) / 240;
            }
            else {
                n2 = (luminosity + saturation) - (((luminosity * saturation) + 120) / 240);
            }
            n1 = (2 * luminosity) - n2;
            r = parseInt((((this._hueToRGB(n1, n2, hue + 80) * 0xff) + 120) / 240).toString(), 10);
            g = parseInt((((this._hueToRGB(n1, n2, hue) * 0xff) + 120) / 240).toString(), 10);
            b = parseInt((((this._hueToRGB(n1, n2, hue - 80) * 0xff) + 120) / 240).toString(), 10);
        }
        return {
            a: 0xff,
            r: r,
            g: g,
            b: b
        };
    };
    ColorPicker.prototype._hueToRGB = function (n1, n2, hue) {
        if (hue < 0) {
            hue += 240;
        }
        if (hue > 240) {
            hue -= 240;
        }
        if (hue < 40) {
            return (n1 + ((((n2 - n1) * hue) + 20) / 40));
        }
        if (hue < 120) {
            return n2;
        }
        if (hue < 160) {
            return (n1 + ((((n2 - n1) * (160 - hue)) + 20) / 40));
        }
        return n1;
    };
    ColorPicker.prototype._getColorBrightness = function (r, g, b) {
        var hls = this._hLSColor(r, g, b);
        return hls.luminosity / 240;
    };
    ColorPicker.prototype._hLSColor = function (r, g, b) {
        var luminosity, saturation, hue;
        var maxUnit = Math.max(Math.max(r, g), b);
        var minUnit = Math.min(Math.min(r, g), b);
        var sum = maxUnit + minUnit;
        luminosity = parseInt((((sum * 240) + 0xff) / 510).toString(), 10);
        var diff = maxUnit - minUnit;
        if (diff === 0) {
            saturation = 0;
            hue = 160;
        }
        else {
            if (luminosity <= 120) {
                saturation = parseInt((((diff * 240) + (sum / 2)) / sum).toString(), 10);
            }
            else {
                saturation = parseInt((((diff * 240) + ((510 - sum) / 2)) / (510 - sum)).toString(), 10);
            }
            var partR = (((maxUnit - r) * 40) + (diff / 2)) / diff;
            var partG = (((maxUnit - g) * 40) + (diff / 2)) / diff;
            var partB = (((maxUnit - b) * 40) + (diff / 2)) / diff;
            if (r === maxUnit) {
                hue = parseInt((partB - partG).toString(), 10);
            }
            else if (g === maxUnit) {
                hue = parseInt(((80 + partR) - partB).toString(), 10);
            }
            else {
                hue = parseInt(((160 + partG) - partR).toString(), 10);
            }
            if (hue < 0) {
                hue += 240;
            }
            if (hue > 240) {
                hue -= 240;
            }
        }
        return {
            luminosity: luminosity,
            saturation: saturation,
            hue: hue
        };
    };
    ColorPicker.prototype._generateGroupToListData = function (colorGroup, cellWidth, cellLength) {
        var _this = this;
        var item = {
            items: function () {
                var groupDoms = document.createElement('div');
                groupDoms.classList.add('gc-color-picker-group-row');
                groupDoms.style.width = ((cellWidth + 7) * cellLength) + 'px';
                for (var row = 0; row < colorGroup.colors.length; row++) {
                    var rowDoms = document.createElement('div');
                    rowDoms.classList.add('gc-color-picker-color-row');
                    var rowColors = colorGroup.colors[row];
                    for (var col = 0; col < rowColors.length; col++) {
                        var rowDom = document.createElement('div');
                        rowDom.setAttribute(GROUP_NAME, colorGroup.name);
                        rowDom.setAttribute('color', rowColors[col]);
                        rowDom.style.backgroundColor = rowColors[col];
                        rowDom.style.width = cellWidth + 'px';
                        rowDom.style.height = cellWidth + 'px';
                        rowDom.classList.add('gc-color-picker-color-cell');
                        if (_this._selectedColor === rowColors[col] && _this._selectedGroup === colorGroup.name) {
                            rowDom.classList.add('selected');
                        }
                        rowDoms.appendChild(rowDom);
                    }
                    groupDoms.appendChild(rowDoms);
                }
                return groupDoms;
            },
            layout: { direction: Core_1.LayoutDirection.horizontal, displayAs: Core_1.LayoutDisplayAs.inline },
        };
        if (colorGroup.name) {
            item.text = colorGroup.name;
        }
        return item;
    };


    ColorPicker.prototype._onMouseClick = function (e) {
        var srcElement = (e.srcElement || e.target);
        if (srcElement) {
            var color = srcElement.getAttribute('color');
            var groupName = srcElement.getAttribute(GROUP_NAME);
            if (color && groupName) {
                this._selectedColor = color;
                this._selectedGroup = groupName;
                this._raiseColorChanged(color);
                this._updateSelection();
            }
        }
    };
    ColorPicker.prototype._raiseColorChanged = function (value) {
        this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { value: value, text: value });
    };

    ColorPicker.DefaultCellWidth = 10;
    ColorPicker.DefaultColorGroup = function () {
        return [
            {
                name: getSR().ThemeColor,
                colors: [
                    ['#ffffff', '#000000', '#e7e6e6', '#44546a', '#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000', '#4472c4', '#70ad47']
                ],
                needScaleColor: true
            },
            {
                name: getSR().StandardColor,
                colors: [
                    ['#C00000', '#FF0000', '#FFC000', '#FFFF00', '#92D050', '#00B050', '#00B0F0', '#0070C0', '#002060', '#7030A0']
                ]
            }
        ];
    };
    return ColorPicker;
}(baseControl_1.BaseDropdown));
exports.ColorPicker = ColorPicker;
/***/ }),

/***/ './dist/plugins/celltype/editor/eventbase.js':
/*!***************************************************!*\
  !*** ./dist/plugins/celltype/editor/eventbase.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
var EventBase = (function () {
    function EventBase() {
        this._eventData = {};
    }
    EventBase.prototype.on = function (eventName, fun) {
        var eventList = this._eventData[eventName];
        if (eventList === null || eventList === undefined) {
            eventList = this._eventData[eventName] = [];
        }
        eventList.push(fun);
    };
    EventBase.prototype.off = function (eventName, fun) {
        if (!eventName) {
            this._eventData = {};
        }
        else {
            var eventList = this._eventData[eventName];
            if (eventList === null || eventList === undefined) {
                return;
            }
            if (fun) {
                var index = eventList.indexOf(fun);
                eventList.splice(index, 1);
            }
            else {
                eventList = [];
            }
            this._eventData[eventName] = eventList;
        }
    };
    EventBase.prototype.fire = function (eventName, arg) {
        var _this = this;
        var eventList = this._eventData[eventName];
        if (eventList !== null && eventList !== undefined) {
            eventList.forEach(function (r) {
                try {
                    r.call(_this, arg);
                }
                catch (e) {
                }
            });
        }
    };
    return EventBase;
}());
exports.EventBase = EventBase;
/***/ }),

/***/ './dist/plugins/celltype/editor/listControl.js':
/*!*****************************************************!*\
  !*** ./dist/plugins/celltype/editor/listControl.js ***!
  \*****************************************************/
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
var popupControl_1 = __webpack_require__(/*! ./popupControl */ './dist/plugins/celltype/editor/popupControl.js');
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var arrayIndexOf = Common_1.Common._ArrayHelper._indexOf;
var DOCUMENT = document;
function createElement(tag) {
    return DOCUMENT.createElement(tag);
}
function removeCharByIndex(text, index) {
    return text.substring(0, index) + text.substring(index + 1, text.length);
}
function arrayContains(array, item) {
    if (Common_1.Common._ArrayHelper._contains(array, item)) {
        return true;
    }
    if (Common_1.Common._DateTimeHelper._isDate(item)) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] - item === 0) {
                return true;
            }
        }
    }
    return false;
}
function arrayRemove(array, item) {
    var isDate = Common_1.Common._DateTimeHelper._isDate(item);
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === item || (isDate && array[i] - item === 0 )) {
            array.splice(i, 1);
        }
    }
}


function stringValueToArray(text) {
    if (isNullOrUndefined(text) || text.length === 0) {
        return [];
    }
    var result = [];
    var index = 0;
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i);
        if (char === '\\') {
            var nextChar = text.charAt(i + 1);
            if (nextChar === ',' || nextChar === '\\') {
                text = removeCharByIndex(text, i);
            }
        }
        else if (char === ',') {
            result.push(text.substring(index, i));
            index = i + 1;
        }
    }
    result.push(text.substring(index, text.length));
    return result;
}
function arrayToStringValue(value) {
    var result = [];
    for (var i = 0; i < value.length; i++) {
        var v = value[i];
        if (v && typeof v === 'string') {
            v = v.replace(/\\/g, '\\\\').replace(/,/g, '\\,');
        }
        result[i] = v;
    }
    return result.join(',');
}
var Cache = (function () {
    function Cache() {
        this._attributes = new WeakMap();
    }
    Cache.prototype.set = function (el, attr, val) {
        var elAttrs = this._attributes.get(el);
        if (!elAttrs) {
            this._attributes.set(el, elAttrs = {});
        }
        elAttrs[attr] = val;
    };
    Cache.prototype.get = function (el, attr) {
        var elAttrs = this._attributes.get(el);
        return elAttrs && elAttrs[attr];
    };
    Cache.prototype.clear = function () {
        this._attributes = new WeakMap();
    };
    return Cache;
}());
var cls_listClassName = 'gc-list-control';
var cls_listContainerClassName = 'gc-list-control-container';
var cls_listGroupClassName = 'gc-list-control-group';
var cls_listGroupTextClassName = 'gc-list-control-group-text';
var cls_listItemClassName = 'gc-list-control-item';
var cls_listHasSubItemClassName = 'gc-list-control-hassubitem';
var cls_listSelectedItemClassName = 'gc-list-control-selected-item';
var cls_listItemTextClassName = 'gc-list-control-item-text';
var cls_listItemIconClassName = 'gc-list-control-item-icon';
var cls_listEmptyIconClassName = 'gc-list-control-emptyicon';
var cls_listSubItemsClassName = 'gc-list-control-subitem';
var cls_ListHAlignClass = 'gc-list-alignment-horizontal';
var cls_ListVAlignClass = 'gc-list-alignment-vertical';
var cls_ListItemsWrapClass = 'gc-list-control-item-wrap';
var cls_ListNoItemClassName = 'gc-list-control-noitem';
var cls_ListSeparatorClassName = 'gc-list-control-listseparator';
var cls_ListItemBigIconClassName = 'gc-list-control-item-bigicon';
var cls_ListItemBigTextClassName = 'gc-list-control-item-bigtext';
var cls_ListHideChildClassName = 'hide-children';
var cls_listTreeClassName = 'gc-list-control-tree';
var cls_listTreeTextClassName = 'gc-list-control-tree-text';
var cls_listTreeContentClassName = 'gc-list-control-tree-content';
var List = (function (_super) {
    __extends(List, _super);
    function List(container, option, rootList) {
        var _this = _super.call(this, container) || this;
        _this._host = createElement('div');
        _this._host.classList.add(cls_listClassName);
        container.appendChild(_this._host);
        _this._cache = new Cache();
        _this._selectInfo = (rootList && rootList._selectInfo) || { _value: undefined };
        _this._itemToDomCache = { items: [], doms: [] };
        _this.setOptions(option);
        return _this;
    }
    List.prototype.setOptions = function (option) {
        if (isNullOrUndefined(option)) {
            return;
        }
        this._option = initValueIfOnlyText(option);
        if (option.className) {
            this._host.classList.add(option.className);
        }
        this._host.innerHTML = '';
        this._render();
    };
    List.prototype.setValue = function (value) {
        if (this._option && this._option.multiSelect) {
            if (typeof (value) === 'string') {
                value = stringValueToArray(value);
            }
            else if (isNullOrUndefined(value)) {
                value = [];
            }
            else if (!Common_1.Common._Types._isArray(value)) {
                value = [value];
            }
            else if (this._option.valueType !== 1 ) {
                value = value.slice(0);
                for (var i = 0; i < value.length; i++) {
                    value[i] = '' + value[i];
                }
            }
        }
        this._selectInfo._value = value;
        this._selectValue();
    };
    List.prototype.scrollToSelect = function () {


    };
    List.prototype.updateStyle = function (backColor, foreColor, font) {
        this._host.style.font = font;
    };
    List.prototype._render = function () {
        var listContainer = createElement('div');
        listContainer.classList.add(cls_listContainerClassName);
        this._renderListData(listContainer, this._option);
        this._host.appendChild(listContainer);
        this._bindEvent();
    };
    List.prototype._renderListData = function (listContainer, item) {
        if (item) {
            this._renderItemLayout(listContainer, item.layout);
            if (item.items) {
                if (Array.isArray(item.items)) {
                    this._renderChildItems(listContainer, item.items);
                }
                else {
                    var result = item.items(this);
                    if (result instanceof HTMLElement) {
                        listContainer.appendChild(result);
                        listContainer.classList.add(cls_listItemClassName);
                        this._renderItemLayout(result, item.layout);
                    }
                }
            }
        }
    };
    List.prototype._renderItemLayout = function (listContainer, layout) {
        if (layout && layout.direction === Core_1.LayoutDirection.horizontal) {
            listContainer.classList.add(cls_ListHAlignClass);
        }
        else {
            listContainer.classList.add(cls_ListVAlignClass);
        }
    };
    List.prototype._renderChildItems = function (host, items) {
        var hasIcon = items.some(function (s) { return !!s.icon; });
        for (var i = 0; i < items.length; i++) {
            if (items[i].items) {
                var item = items[i];
                if (item.layout && item.layout.displayAs === Core_1.LayoutDisplayAs.inline) {
                    var groupContainer = createElement('div');
                    groupContainer.classList.add(cls_listGroupClassName);
                    var span = createElement('span');
                    span.innerText = item.text;
                    if (isNullOrUndefined(item.text) || item.text === '') {
                        span.classList.add(cls_ListHideChildClassName);
                    }
                    span.classList.add(cls_listGroupTextClassName);
                    groupContainer.appendChild(span);
                    if (Array.isArray(item.items)) {
                        this._renderListData(groupContainer, item);
                    }
                    else {
                        var result = item.items();
                        if (result instanceof HTMLElement) {
                            var itemContainer = createElement('div');
                            itemContainer.classList.add(cls_listItemClassName);
                            this._renderItemLayout(result, item.layout);
                            itemContainer.appendChild(result);
                            groupContainer.appendChild(itemContainer);
                        }
                    }
                    host.appendChild(groupContainer);
                }
                else if (item.layout && item.layout.displayAs === Core_1.LayoutDisplayAs.tree) {
                    var treeContainer = createElement('div');
                    treeContainer.classList.add(cls_listTreeClassName);
                    var parentContainer = createElement('div');
                    parentContainer.classList.add(cls_listItemClassName);
                    parentContainer.classList.add(cls_listHasSubItemClassName);
                    var span = createElement('span');
                    span.innerText = item.text;
                    span.classList.add(cls_listTreeTextClassName);
                    parentContainer.appendChild(span);
                    if (item.layout.collapsible) {
                        var subList = createElement('span');
                        subList.classList.add(cls_listSubItemsClassName);
                        parentContainer.appendChild(subList);
                        this._bindTreeEvent(parentContainer);
                    }
                    treeContainer.appendChild(parentContainer);
                    var container = createElement('div');
                    container.classList.add(cls_listTreeContentClassName);
                    if (Array.isArray(item.items)) {
                        this._renderListData(container, item);
                    }
                    else {
                        var result = item.items();
                        if (result instanceof HTMLElement) {
                            var itemContainer = createElement('div');
                            itemContainer.classList.add(cls_listItemClassName);
                            this._renderItemLayout(result, item.layout);
                            itemContainer.appendChild(result);
                            container.appendChild(itemContainer);
                        }
                    }
                    treeContainer.appendChild(container);
                    host.appendChild(treeContainer);
                }
                else {
                    this._renderListItem(host, items[i], false, true);
                }
            }
            else {
                this._renderListItem(host, items[i], hasIcon);
            }
        }
    };
    List.prototype._renderListItem = function (host, item, hasIcon, isCascade) {
        if (isCascade === void 0) { isCascade = false; }
        var itemContainer = createElement('div');
        itemContainer.classList.add(cls_listItemClassName);
        if (item.text === '-') {
            itemContainer.classList.add(cls_ListNoItemClassName);
            var div = createElement('div');
            div.classList.add(cls_ListSeparatorClassName);
            itemContainer.appendChild(div);
        }
        else {
            if (hasIcon) {
                var icon = createElement('div');
                icon.classList.add(cls_listItemIconClassName);
                if (item.icon) {
                    icon.style.backgroundImage = 'url(' + item.icon + ')';
                }
                else {
                    icon.classList.add(cls_listEmptyIconClassName);
                }
                itemContainer.appendChild(icon);
            }
            var textSpan = createElement('span');
            textSpan.classList.add(cls_listItemTextClassName);
            textSpan.innerText = item.text;
            if (isNullOrUndefined(item.text)) {
                textSpan.innerText = isNullOrUndefined(item.value) ? '' : item.value;
            }
            itemContainer.appendChild(textSpan);
            var value = isNullOrUndefined(item.value) ? null : item.value;
            var index = arrayIndexOf(this._itemToDomCache.items, value);
            if (index < 0) {
                index = this._itemToDomCache.items.length;
                this._itemToDomCache.doms.push([]);
                this._itemToDomCache.items.push(value);
            }
            this._itemToDomCache.doms[index].push(itemContainer);
            this._cache.set(itemContainer, 'items', item);
            if (isCascade) {
                var subList = createElement('span');
                subList.classList.add(cls_listSubItemsClassName);
                itemContainer.classList.add(cls_listHasSubItemClassName);
                this._cache.set(itemContainer, 'sub-items', item);
                itemContainer.appendChild(subList);
                this._bindSubEvent(itemContainer);
            }
        }
        host.appendChild(itemContainer);
    };
    List.prototype._setSelectedState = function (index, isSelected) {
        var elements = this._itemToDomCache.doms[index];
        if (isSelected) {
            for (var j = 0; j < elements.length; j++) {
                if (!elements[j].classList.contains(cls_listHasSubItemClassName)) {
                    elements[j].classList.add(cls_listSelectedItemClassName);
                }
            }
        }
        else {
            for (var j = 0; j < elements.length; j++) {
                if (elements[j].classList.contains(cls_listSelectedItemClassName)) {
                    elements[j].classList.remove(cls_listSelectedItemClassName);
                }
            }
        }
    };
    List.prototype._selectValue = function () {
        var keys, self = this, option = self._option;
        if (!isNullOrUndefined(self.formula)) {
            keys = ['=' + self.formula];
        }
        else if (option && option.multiSelect) {
            var value = self._selectInfo._value;
            keys = value;
        }
        else {
            keys = [self._selectInfo._value];
        }
        for (var i = 0; i < self._itemToDomCache.items.length; i++) {
            var key = self._itemToDomCache.items[i];
            if (option && option.multiSelect && option.valueType !== 1 ) {
                key = '' + key;
            }
            if (arrayContains(keys, key)) {
                self._setSelectedState(i, true);
            }
            else {
                self._setSelectedState(i, false);
            }
        }
    };
    List.prototype._bindEvent = function () {
        var _this = this;
        this._host.querySelector('.' + cls_listContainerClassName).addEventListener('click', function (evt) {
            var source = _this._findSelfOrParent(evt.target, '.' + cls_listItemClassName);
            if (!source) {
                return;
            }
            if (source.classList.contains(cls_listHasSubItemClassName)) {
                _this._openSubItems(evt);
                return;
            }
            var item = _this._cache.get(source, 'items'), option = _this._option;
            if (!item && Common_1.Common._Types._isFunction(option && option.onItemSelected)) {
                item = { value: option.onItemSelected(evt) };
            }
            if (!isNullOrUndefined(item)) {
                var value = item.value;
                if (option && option.multiSelect) {
                    var oldValueArray = _this._selectInfo._value;
                    oldValueArray = oldValueArray.slice(0);
                    if (option.multiSelect && option.valueType !== 1 ) {
                        value = '' + value;
                    }
                    if (arrayContains(oldValueArray, value)) {
                        arrayRemove(oldValueArray, value);
                    }
                    else {
                        Common_1.Common._ArrayHelper._add(oldValueArray, value);
                    }
                    _this._selectInfo._value = value = oldValueArray;
                    _this._selectValue();
                    if (option.valueType !== 1 ) {
                        value = arrayToStringValue(value);
                    }
                }
                _this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { value: value, text: value, notCloseDropDown: option && option.multiSelect, noAutoFormat: true });
            }
        });
    };
    List.prototype._findSelfOrParent = function (elem, selector) {
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.webkitMatchesSelector ||
                    function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                        while (i >= 0 && matches.item(i) !== this) {
                            --i;
                        }
                        return i > -1;
                    };
        }
        var node = elem;
        while (node && !node.matches(selector)) {
            node = node.parentElement;
        }
        return node;
    };
    List.prototype._openSubItems = function (evt) {
        var _this = this;
        var target = this._findSelfOrParent(evt.target, '.' + cls_listItemClassName);
        if (!target.classList.contains(cls_listHasSubItemClassName)) {
            return;
        }
        var items = this._cache.get(target, 'sub-items');
        if (!items || !items.items) {
            return;
        }
        var div = createElement('div'), option = this._option;
        items.multiSelect = option && option.multiSelect;
        items.valueType = option && option.valueType;
        items.onItemSelected = option && option.onItemSelected;
        var list = new List(div, items, this);
        list._selectValue();
        var pop = new popupControl_1.PopupControl(div, target, { align: popupControl_1.DropDownAlignment.Near, hostElement: target, direction: popupControl_1.DropDownDirection.Right });
        pop.open();
        div.parentElement.style.top = '0';
        list.on(baseControl_1.BaseDropdown.Event_ValueChanged, function (arg) {
            _this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, arg);
            if (_this._option && _this._option.multiSelect) {
                _this._selectValue();
            }
            else {
                pop.close();
            }
        });
        this._cache.set(target, 'sub-items-popup', pop);
        evt.stopPropagation();
        evt.preventDefault();
    };
    List.prototype._bindSubEvent = function (subItemCtl) {
        var _this = this;
        subItemCtl.addEventListener('mouseenter', function (evt) {
            _this._openSubItems(evt);
        });
        subItemCtl.addEventListener('mouseleave', function (evt) {
            var target = evt.target;
            if (!target.classList.contains(cls_listHasSubItemClassName)) {
                return;
            }
            var popup = _this._cache.get(target, 'sub-items-popup');
            if (!popup) {
                return;
            }
            popup.close();
            _this._cache.set(target, 'sub-items-pop', undefined);
        });
    };
    List.prototype._bindTreeEvent = function (treeHeader) {
        var _this = this;
        treeHeader.addEventListener('click', function (evt) {
            var target = evt.target;
            var source = _this._findSelfOrParent(target, '.' + cls_listHasSubItemClassName);
            if (!source) {
                return;
            }
            var content = source.parentElement.querySelector('.' + cls_listTreeContentClassName);
            if (!content) {
                return;
            }
            if (source.parentElement.classList.contains(cls_ListHideChildClassName)) {
                source.parentElement.classList.remove(cls_ListHideChildClassName);
            }
            else {
                source.parentElement.classList.add(cls_ListHideChildClassName);
            }
            evt.stopPropagation();
            evt.preventDefault();
        });
    };
    return List;
}(baseControl_1.BaseDropdown));
exports.List = List;


function initValueIfOnlyText(option) {
    if (option.hasOwnProperty('items')) {
        initValueIfOnlyText(option.items);
    }
    else if (Array.isArray(option)) {
        for (var i = 0; i < option.length; i++) {
            if (option[i].hasOwnProperty('items')) {
                initValueIfOnlyText(option[i]);
            }
            else {
                if (option[i].hasOwnProperty('text') && !option[i].hasOwnProperty('value')) {
                    option[i].value = option[i].text;
                }
            }
        }
    }

    return option;
}
/***/ }),

/***/ './dist/plugins/celltype/editor/monthPicker.js':
/*!*****************************************************!*\
  !*** ./dist/plugins/celltype/editor/monthPicker.js ***!
  \*****************************************************/
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
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var celltypes_ns_1 = __webpack_require__(/*! ../celltypes.ns */ './dist/plugins/celltype/celltypes.ns.js');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var rm = new Common_1.Common.ResourceManager(celltypes_ns_1.SR);
var getSR = rm.getResource.bind(rm);
var DOCUMENT = document;
function createElement(tag) {
    return DOCUMENT.createElement(tag);
}
var cls_Separator = 'gc-month-picker-separator';
var cls_YearItem = 'gc-month-picker-year-item';
var cls_MonthItem = 'gc-month-picker-month-item';
var cls_QtrItem = 'gc-month-picker-qtr-item';
var cls_Selected = 'selected';
var attr_dateMonth = 'data-month';
var attr_dataqtr = 'data-qtr';
var MonthPicker = (function (_super) {
    __extends(MonthPicker, _super);
    function MonthPicker(container, option) {
        var _this = _super.call(this, container) || this;
        _this.setOptions(option);
        _this._bindEvent();
        return _this;
    }
    MonthPicker.prototype.setOptions = function (option) {
        var self = this;
        var now = new Date();
        var newOption = {
            startYear: now.getFullYear() - 10,
            stopYear: now.getFullYear(),
            height: 300
        };
        if (option) {
            if (!isNullOrUndefined(option.startYear)) {
                var startYear = parseInt(option.startYear, 10);
                if (!isNaN(startYear)) {
                    newOption.startYear = startYear;
                }
            }
            if (!isNullOrUndefined(option.stopYear) && option.stopYear > 0) {
                var stopYear = parseInt(option.stopYear, 10);
                if (!isNaN(stopYear)) {
                    newOption.stopYear = stopYear;
                }
            }
            if (newOption.stopYear < newOption.startYear) {
                newOption.stopYear = option.startYear;
            }
            if (!isNullOrUndefined(option.height)) {
                var height = parseInt(option.height, 10);
                if (!isNaN(height)) {
                    newOption.height = height;
                }
            }
        }
        newOption.height = Math.max(1, newOption.height);
        self._option = newOption;
        self._host.innerHTML = '';
        self._renderMonthPicker();
    };
    MonthPicker.prototype.setValue = function (value) {
        var self = this, month, year, qtr;
        if (value) {
            month = value.getMonth() + 1;
            year = value.getFullYear();
        }
        if (typeof month === 'number') {
            var monthItem = self._host.querySelector('[' + attr_dateMonth + '=\'' + year + '-' + month + '\']');
            if (monthItem) {
                monthItem.classList.add(cls_Selected);
                if (self._selectedItem) {
                    self._selectedItem.classList.remove(cls_Selected);
                }
                self._selectedItem = monthItem;
            }
        }
        else if (typeof qtr === 'number') {
            var qtrItem = self._host.querySelector('[' + attr_dataqtr + '=\'' + year + '-' + qtr + '\']');
            if (qtrItem) {
                qtrItem.classList.add(cls_Selected);
                if (self._selectedItem) {
                    self._selectedItem.classList.remove(cls_Selected);
                }
                self._selectedItem = qtrItem;
            }
        }
    };
    MonthPicker.prototype.scrollToSelect = function () {
        var selectedItem = this._selectedItem;
        if (selectedItem) {
            var scrollIntoTop = selectedItem.offsetTop;
            this._host.scrollTop = scrollIntoTop;
        }
    };
    MonthPicker.prototype._findSelfOParent = function (elem, selector) {
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                        while (i >= 0 && matches.item(i) !== this) {
                            --i;
                        }
                        return i > -1;
                    };
        }
        var node = elem;
        while (node && !node.matches(selector)) {
            node = node.parentElement;
        }
        return node;
    };
    MonthPicker.prototype._bindEvent = function () {
        var _this = this;
        this._host.addEventListener('click', function (evt) {
            var self = _this;
            var target = self._findSelfOParent(evt.target, '.' + cls_MonthItem + ',.' + cls_QtrItem);
            if (!target) {
                return;
            }
            if (target.getAttribute(attr_dataqtr)) {
                return;
            }
            target.classList.add(cls_Selected);
            if (self._selectedItem) {
                self._selectedItem.classList.remove(cls_Selected);
            }
            self._selectedItem = target;
            var month = null;
            var qtr = null;
            var year = null;
            if (target.getAttribute(attr_dateMonth)) {
                var data = target.getAttribute(attr_dateMonth);
                var items = data.split('-');
                month = +items[1];
                year = +items[0];
            }
            var value = new Date(year, month - 1, 1, 0, 0, 0, 0);
            var df = Common_1.Common.CultureManager._getCultureInfo().DateTimeFormat;
            var formatter = new Common_1.Formatter.GeneralFormatter(df.shortDatePattern);
            var result = formatter.format(value);
            self.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { text: result, value: value });
        });
    };
    MonthPicker.prototype._renderMonthPicker = function () {
        var self = this;
        if (this._option.height >= 0) {
            self._host.style.maxHeight = this._option.height + 'px';
        }
        else {
            self._host.style.height = 'auto';
        }
        self._host.classList.add('gc-month-picker-container');
        for (var year = self._option.startYear; year <= self._option.stopYear; year++) {
            var container = document.createElement('div');

            self._rendeSeparator(container);
            var yearContainer = document.createElement('div');
            yearContainer.classList.add('gc-month-picker-year-container');
            self._renderYear(year, yearContainer);
            var monthContainer = document.createElement('div');
            monthContainer.classList.add('gc-month-picker-month-container');
            self._renderQtr(year, 1, monthContainer);
            self._renderQtr(year, 2, monthContainer);
            self._renderQtr(year, 3, monthContainer);
            self._renderQtr(year, 4, monthContainer);
            container.appendChild(yearContainer);
            container.appendChild(monthContainer);
            this._host.appendChild(container);
        }
    };
    MonthPicker.prototype._rendeSeparator = function (yearContainer) {
        var div = createElement('div');
        div.classList.add(cls_Separator);
        yearContainer.appendChild(div);
    };
    MonthPicker.prototype._renderYear = function (year, yearContainer) {
        var div = createElement('div');
        div.classList.add(cls_YearItem);
        div.innerText = '' + year;
        yearContainer.appendChild(div);
    };
    MonthPicker.prototype._renderQtr = function (year, qtr, yearContainer) {
        var container = document.createElement('div');
        var month1 = createElement('div');
        var month2 = createElement('div');
        var month3 = createElement('div');
        var qtrElem = createElement('div');
        month1.classList.add(cls_MonthItem);
        month2.classList.add(cls_MonthItem);
        month3.classList.add(cls_MonthItem);
        qtrElem.classList.add(cls_QtrItem);
        switch (qtr) {
            case 1:
                {
                    month1.innerText = getSR().Calendar_ShortMonths_1;
                    month1.setAttribute(attr_dateMonth, year + '-' + 1);
                    month2.innerText = getSR().Calendar_ShortMonths_2;
                    month2.setAttribute(attr_dateMonth, year + '-' + 2);
                    month3.innerText = getSR().Calendar_ShortMonths_3;
                    month3.setAttribute(attr_dateMonth, year + '-' + 3);
                    qtrElem.innerText = getSR().Quarter_Format_1;
                    qtrElem.setAttribute(attr_dataqtr, year + '-' + 1);
                }
                break;
            case 2:
                {
                    month1.innerText = getSR().Calendar_ShortMonths_4;
                    month1.setAttribute(attr_dateMonth, year + '-' + 4);
                    month2.innerText = getSR().Calendar_ShortMonths_5;
                    month2.setAttribute(attr_dateMonth, year + '-' + 5);
                    month3.innerText = getSR().Calendar_ShortMonths_6;
                    month3.setAttribute(attr_dateMonth, year + '-' + 6);
                    qtrElem.innerText = getSR().Quarter_Format_2;
                    qtrElem.setAttribute(attr_dataqtr, year + '-' + 2);
                }
                break;
            case 3:
                {
                    month1.innerText = getSR().Calendar_ShortMonths_7;
                    month1.setAttribute(attr_dateMonth, year + '-' + 7);
                    month2.innerText = getSR().Calendar_ShortMonths_8;
                    month2.setAttribute(attr_dateMonth, year + '-' + 8);
                    month3.innerText = getSR().Calendar_ShortMonths_9;
                    month3.setAttribute(attr_dateMonth, year + '-' + 9);
                    qtrElem.innerText = getSR().Quarter_Format_3;
                    qtrElem.setAttribute(attr_dataqtr, year + '-' + 3);
                }
                break;
            case 4:
                {
                    month1.innerText = getSR().Calendar_ShortMonths_10;
                    month1.setAttribute(attr_dateMonth, year + '-' + 10);
                    month2.innerText = getSR().Calendar_ShortMonths_11;
                    month2.setAttribute(attr_dateMonth, year + '-' + 11);
                    month3.innerText = getSR().Calendar_ShortMonths_12;
                    month3.setAttribute(attr_dateMonth, year + '-' + 12);
                    qtrElem.innerText = getSR().Quarter_Format_4;
                    qtrElem.setAttribute(attr_dataqtr, year + '-' + 4);
                }
                break;
        }
        container.appendChild(month1);
        container.appendChild(month2);
        container.appendChild(month3);
        container.appendChild(qtrElem);
        yearContainer.appendChild(container);
        if (qtr < 4) {
            this._rendeSeparator(yearContainer);
        }
    };
    return MonthPicker;
}(baseControl_1.BaseDropdown));
exports.MonthPicker = MonthPicker;
/***/ }),

/***/ './dist/plugins/celltype/editor/multiColumnPicker.js':
/*!***********************************************************!*\
  !*** ./dist/plugins/celltype/editor/multiColumnPicker.js ***!
  \***********************************************************/
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
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var CalcEngine = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var baseSpreadPicker_1 = __webpack_require__(/*! ./baseSpreadPicker */ './dist/plugins/celltype/editor/baseSpreadPicker.js');
var util_1 = __webpack_require__(/*! util */ './node_modules/util/util.js');
var celltypes_ns_1 = __webpack_require__(/*! ../celltypes.ns */ './dist/plugins/celltype/celltypes.ns.js');
var rm = new Common_1.Common.ResourceManager(celltypes_ns_1.SR);
var getSR = rm.getResource.bind(rm);
var hasCalc = !!CalcEngine;
function _sheetSuspend(sheet) {
    sheet.suspendPaint();
    sheet.suspendEvent();
    sheet.suspendCalcService();
}
function _sheetResume(sheet) {
    sheet.resumeCalcService();
    sheet.resumeEvent();
    sheet.resumePaint();
}
function _processDataSourceArr(dataSource, bindingInfos) {
    var firstRowData = dataSource[0], resultData = [];
    if (util_1.isArray(firstRowData)) {
        var tempDataSource = dataSource;
        var keys = _getBindInfoKeys(dataSource, bindingInfos);
        var _loop_1 = function (i, length_1) {
            var rowData = tempDataSource[i], tempRowData = {};
            keys.forEach(function (key, index) {
                tempRowData[key] = rowData[index];
            });
            resultData.push(tempRowData);
        };
        for (var i = 0, length_1 = tempDataSource.length; i < length_1; i++) {
            _loop_1(i, length_1);
        }
    }
    else {
        resultData = dataSource;
    }
    return resultData;
}
function _getBindInfoKeys(dataSource, bindingInfos) {
    var keys = [];
    if (bindingInfos && bindingInfos.length > 0) {
        bindingInfos.forEach(function (info) {
            keys.push(info.name);
        });
    }
    else {
        keys = dataSource.shift();
    }
    return keys;
}
var MultiColumn = (function (_super) {
    __extends(MultiColumn, _super);
    function MultiColumn(container, option, contextSheet) {
        return _super.call(this, container, option, contextSheet) || this;
    }
    MultiColumn.prototype.setOptions = function (option) {
        _super.prototype.setOptions.call(this, option);
        var self = this;
        self._option = option;
        if (!option) {
            return;
        }
        var dropdownSpread = self._dropdownSpread, dataSource = option.dataSource, bindingInfos = option.bindingInfos;
        var multiColumnSheet = dropdownSpread.getActiveSheet();
        if (dataSource) {
            var isSuccess = true;
            _sheetSuspend(multiColumnSheet);
            multiColumnSheet.options.isProtected = true;
            multiColumnSheet.options.rowHeaderVisible = false;
            multiColumnSheet.selectionPolicy(Core_1.SelectionPolicy.single);
            multiColumnSheet.selectionUnit(Core_1.SelectionUnit.row);
            try {
                self._setBind(multiColumnSheet, dataSource, bindingInfos);
            }
            catch (e) {
                isSuccess = false;
                self.dispose();
            }
            finally {
                if (isSuccess && multiColumnSheet) {
                    var style = new Core_1.Style();
                    style._showTip = false;
                    multiColumnSheet.setStyle(-1, -1, style, Core_1.SheetArea.viewport);
                    _sheetResume(multiColumnSheet);
                }
            }
        }
    };
    MultiColumn.prototype.setValue = function (data) {
        var self = this;
        if (!self._option) {
            return;
        }
        _super.prototype.setValue.call(this, data);
        var dropdownSpread = self._dropdownSpread, multiColumnSheet = dropdownSpread.getActiveSheet();
        var rowIndex = self._getDataRowIndex(data);
        multiColumnSheet.setSelection(rowIndex, -1, 1, -1);
    };
    MultiColumn.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    MultiColumn.prototype._setBind = function (sheet, dataSource, bindingInfos) {
        if (dataSource) {
            var self_1 = this, arrDataSource = self_1._calcDataSource(dataSource);
            if (arrDataSource) {
                sheet.setDataSource(_processDataSourceArr(arrDataSource, bindingInfos));
                if (bindingInfos) {
                    sheet.bindColumns(bindingInfos);
                }
            }
        }
    };
    MultiColumn.prototype._calcDataSource = function (dataSource) {
        var tempDataSource = dataSource, contextSheet = this._contextSheet, resultData;
        if (util_1.isString(tempDataSource)) {
            if (hasCalc) {
                var expr = SheetsCalc_1.formulaToExpression(contextSheet, tempDataSource);
                var value = contextSheet.getCalcService()._evaluateParsedFormula(contextSheet._getSheetSource(), expr, CalcEngine_1._createCellIdentity(0, 0), true);
                var isArrayValue = CalcEngine_1.Convert._isReference(value) || CalcEngine_1.Convert._isArray(value), isSucess = false, arrayValue = void 0;
                if (isArrayValue) {
                    arrayValue = CalcEngine_1.Convert._toArray(value, 0 , false, false, false);
                    if (!(arrayValue.isError || arrayValue.isConvertError)) {
                        isSucess = true;
                    }
                }
                if (isSucess) {
                    resultData = arrayValue;
                }
                else {
                    throw new Error(getSR().MultiColumn_InvalidDataSource);
                }
            }
        }
        else if (tempDataSource instanceof Core_1.Range) {
            resultData = contextSheet.getArray(tempDataSource.row, tempDataSource.col, tempDataSource.rowCount, tempDataSource.colCount);
        }
        else if (util_1.isArray(tempDataSource)) {
            resultData = tempDataSource;
        }
        else if (tempDataSource._dataRowsForMultiColumnPicker) {
            resultData = tempDataSource._dataRowsForMultiColumnPicker;
        }
        return resultData;
    };
    MultiColumn.prototype._getDataRowIndex = function (data) {
        var self = this, resultRowIndex = 0;
        if (data) {
            var dropdownSpread = self._dropdownSpread, multiColumnSheet = dropdownSpread.getActiveSheet();
            var keys = Object.keys(data), keysLength = keys.length, dataSource = multiColumnSheet.getDataSource(), dataSourceLength = dataSource.length;
            var isAllEqual = false;
            var key = self._option.key;
            if (util_1.isNullOrUndefined(key)) {
                for (var i = 0; i < dataSourceLength; i++) {
                    var rowDataItem = dataSource[i];
                    isAllEqual = true;
                    for (var j = 0; j < keysLength; j++) {
                        key = keys[j];
                        if (rowDataItem[key] !== data[key] && rowDataItem[key] !== undefined) {
                            isAllEqual = false;
                            break;
                        }
                    }
                    if (isAllEqual) {
                        resultRowIndex = i;
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < dataSourceLength; i++) {
                    var rowDataItem = dataSource[i];
                    if (rowDataItem[key] === data) {
                        resultRowIndex = i;
                        break;
                    }
                }
            }
        }
        return resultRowIndex;
    };
    MultiColumn.prototype.submitData = function (info) {
        var self = this, worksheet = info.sheet, isEsc = info.isEsc;
        var args;
        if (isEsc) {
            args = { notSubmit: true };
        }
        else {
            var selection = worksheet.getSelections()[0], row = selection.row;
            if (row > -1) {
                var value = worksheet.getDataItem(row);
                var key = self._option.key;
                if (!util_1.isNullOrUndefined(key)) {
                    value = value[key];
                }
                args = { value: value, text: value };
            }
        }
        if (!util_1.isNullOrUndefined(args)) {
            self.fire(baseControl_1.BaseDropdown.Event_ValueChanged, args);
        }
    };
    return MultiColumn;
}(baseSpreadPicker_1.BaseSpreadPicker));
exports.MultiColumn = MultiColumn;
/***/ }),

/***/ './dist/plugins/celltype/editor/popupControl.js':
/*!******************************************************!*\
  !*** ./dist/plugins/celltype/editor/popupControl.js ***!
  \******************************************************/
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
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var DropDownDirection;
(function (DropDownDirection) {
    DropDownDirection[DropDownDirection['Down'] = 0] = 'Down';
    DropDownDirection[DropDownDirection['Up'] = 1] = 'Up';
    DropDownDirection[DropDownDirection['Left'] = 2] = 'Left';
    DropDownDirection[DropDownDirection['Right'] = 3] = 'Right';
})(DropDownDirection = exports.DropDownDirection || (exports.DropDownDirection = {}));
var DropDownAlignment;
(function (DropDownAlignment) {
    DropDownAlignment[DropDownAlignment['Near'] = 0] = 'Near';
    DropDownAlignment[DropDownAlignment['Center'] = 1] = 'Center';
    DropDownAlignment[DropDownAlignment['Far'] = 2] = 'Far';
})(DropDownAlignment = exports.DropDownAlignment || (exports.DropDownAlignment = {}));
var DropDownAdjustment;
(function (DropDownAdjustment) {
    DropDownAdjustment[DropDownAdjustment['None'] = 0] = 'None';
    DropDownAdjustment[DropDownAdjustment['Flip'] = 1] = 'Flip';
    DropDownAdjustment[DropDownAdjustment['Slide'] = 2] = 'Slide';
})(DropDownAdjustment = exports.DropDownAdjustment || (exports.DropDownAdjustment = {}));
var Rectangle = (function () {
    function Rectangle(_x, _y, _width, _height) {
        this._x = _x;
        this._y = _y;
        this._width = _width;
        this._height = _height;
    }
    Rectangle.CreateFromDom = function (rect) {
        return new Rectangle(rect.left, rect.top, rect.width, rect.height);
    };
    Object.defineProperty(Rectangle.prototype, 'x', {
        get: function () {
            return this._x;
        },
        set: function (val) {
            this._x = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'y', {
        get: function () {
            return this._y;
        },
        set: function (val) {
            this._y = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'width', {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'height', {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'left', {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'right', {
        get: function () {
            return this._x + this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'top', {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'bottom', {
        get: function () {
            return this._y + this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'Location', {
        get: function () {
            return { X: this._x, Y: this._y };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, 'Size', {
        get: function () {
            return { width: this._width, height: this._height };
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.Offset = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1 && typeof args[0].X === 'number' && typeof args[0].X === 'number') {
            this._x += args[0].X;
            this._y += args[0].Y;
        }
        else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
            this._x += args[0];
            this._y += args[1];
        }
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var cls_PopupClassName = 'ribbon-dropdowngroup-popup';
var PopupControl = (function (_super) {
    __extends(PopupControl, _super);
    function PopupControl(sourceElement, target, option) {
        var _this = _super.call(this, null) || this;
        _this.sourceElement = sourceElement;
        _this.target = target;
        _this.defaultOption = {
            closeAfterResize: true,
            closeAfterClickOutside: true,
            direction: DropDownDirection.Down,
            align: DropDownAlignment.Near,
            horAdj: DropDownAdjustment.Flip | DropDownAdjustment.Slide,
            verAdj: DropDownAdjustment.Flip | DropDownAdjustment.Slide
        };
        _this.globalMousedownEventHandler = function (evt) {
            if (!_this._isShow) {
                return;
            }
            var target = evt.target;
            var node = target;
            while (node && node !== _this.sourceElement) {
                node = node.parentElement;
            }
            if (!node) {
                _this.close();
                evt.stopPropagation();
                evt.preventDefault();
            }
        };
        _this.windowResizeEventHandler = function () {
            if (!_this._isShow) {
                return;
            }
            _this.close();
        };
        _this._option = _this.defaultOption;
        _this._isShow = false;
        if (option) {
            _this.mergeOption(option);
        }
        _this._selfHost = (_this._option.hostElement === null || _this._option.hostElement === undefined) || !(_this._option.hostElement instanceof HTMLElement);
        return _this;
    }
    PopupControl.prototype.open = function () {
        if (this._isShow) {
            return;
        }
        this.beforeOpen();
        this.render();
        this.clearPosition();
        this.calcPosition();
        this._isShow = true;
        this.sourceElement.tabIndex = -1;
        this.sourceElement.style.cssText += 'outline:none';
        this.sourceElement.focus();
    };
    PopupControl.prototype.beforeOpen = function () {
        this.bindEvent();
    };
    PopupControl.prototype.dispose = function () {
        var _this = this;
        if (this._option.closeAfterResize) {
            document.removeEventListener('resize', this.windowResizeEventHandler);
        }
        if (this._option.closeAfterClickOutside) {
            document.removeEventListener('mousedown', this.globalMousedownEventHandler, true);
            'touchstart MSPointerDown pointerdown'.split(' ').forEach(function (value) {
                document.removeEventListener(value, _this.globalMousedownEventHandler, true);
            });
        }
        if (this._selfHost) {
            this.sourceElement.classList.remove(cls_PopupClassName);
            this.sourceElement.style.display = this._oldDisplay;
            this.sourceElement.style.position = this._oldPosition;
        }
        else if (this._popupHost && this._popupHost.parentNode) {
            this._option.hostElement.removeChild(this._popupHost);
            this._popupHost = null;
        }
    };
    PopupControl.prototype.close = function () {
        if (!this._isShow) {
            return;
        }
        this._isShow = false;
        this.dispose();
        this.fire('close');
    };
    PopupControl.prototype.mergeOption = function (newOption) {
        for (var key in newOption) {
            if (typeof newOption[key] !== 'undefined') {
                this._option[key] = newOption[key];
            }
        }
    };
    PopupControl.prototype.clearPosition = function () {
        this._operationElem.style.top = this._operationElem.style.bottom = this._operationElem.style.left = this._operationElem.style.right = '';
    };
    PopupControl.prototype.calcPosition = function () {
        var targetRect;
        if (this.target instanceof Rectangle) {
            targetRect = this.target;
        }
        else {
            targetRect = Rectangle.CreateFromDom(this.target.getBoundingClientRect());
        }
        var screenBounds = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
        var location = this.calculateDropDownLocation(screenBounds, targetRect, { width: this.sourceElement.offsetWidth, height: this.sourceElement.offsetHeight }, this._option.direction, this._option.align, this._option.horAdj, this._option.verAdj);
        var parent = this._operationElem.offsetParent;
        var parentRect = parent.getBoundingClientRect();
        var isBody = parent === document.body;

        var doc = document.documentElement;
        var scrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        this._operationElem.style.left = location.X - (isBody ? -scrollLeft : parentRect.left) + 'px';
        this._operationElem.style.top = location.Y - (isBody ? -scrollTop : parentRect.top) + 'px';
    };
    PopupControl.prototype.calculateDropDownLocation = function (screenBounds, holderBounds, dropDownSize, direction, align, horAdj, verAdj) {
        var screenOrigin = { X: screenBounds.x, Y: screenBounds.y };
        screenBounds.Offset(-screenOrigin.X, -screenOrigin.Y);
        holderBounds.Offset(-screenOrigin.X, -screenOrigin.Y);
        var left = holderBounds.left;
        var right = holderBounds.right;
        var top = holderBounds.top;
        var bottom = holderBounds.bottom;
        var upSpace = top;
        var downSpace = screenBounds.height - bottom;
        var leftSpace = left;
        var rightSpace = screenBounds.width - right;
        var canVerFlip = (verAdj & DropDownAdjustment.Flip) === DropDownAdjustment.Flip;
        var canHorFlip = (horAdj & DropDownAdjustment.Flip) === DropDownAdjustment.Flip;
        var canVerSlide = (verAdj & DropDownAdjustment.Slide) === DropDownAdjustment.Slide;
        var canHorSlide = (horAdj & DropDownAdjustment.Slide) === DropDownAdjustment.Slide;

        switch (direction) {
            case DropDownDirection.Up:
                if (dropDownSize.height > upSpace && canVerFlip) {
                    direction = DropDownDirection.Down;
                }
                break;
            case DropDownDirection.Down:
                if (dropDownSize.height > downSpace && canVerFlip) {
                    direction = DropDownDirection.Up;
                }
                break;
            case DropDownDirection.Left:
                if (dropDownSize.width > leftSpace && canHorFlip) {
                    direction = DropDownDirection.Right;
                }
                break;
            case DropDownDirection.Right:
                if (dropDownSize.width > rightSpace && canHorFlip) {
                    direction = DropDownDirection.Left;
                }
                break;
        }

        var x = 0, y = 0;
        switch (direction) {
            case DropDownDirection.Up:
                y = top - dropDownSize.height - 3;
                break;
            case DropDownDirection.Down:
                y = bottom + 1;
                break;
            case DropDownDirection.Left:
                x = left - dropDownSize.width;
                break;
            case DropDownDirection.Right:
                x = right;
                break;
        }
        if (direction === DropDownDirection.Up || direction === DropDownDirection.Down) {
            if (align === DropDownAlignment.Near) {
                x = left - 2;
            }
            else if (align === DropDownAlignment.Center) {
                x = left - (dropDownSize.width - holderBounds.width) / 2;
            }
            else if (align === DropDownAlignment.Far) {
                x = right - dropDownSize.width;
            }
        }
        else if (direction === DropDownDirection.Right || direction === DropDownDirection.Left) {
            if (align === DropDownAlignment.Near) {
                y = top;
            }
            else if (align === DropDownAlignment.Center) {
                y = top - (dropDownSize.height - holderBounds.height) / 2;
            }
            else if (align === DropDownAlignment.Far) {
                y = bottom - dropDownSize.height;
            }
        }
        var rect = new Rectangle(x, y, dropDownSize.width, dropDownSize.height);
        if (canHorSlide) {
            if (rect.width > screenBounds.width) {
                rect.x = 0;
            }
            else {
                rect.x = Math.max(rect.x, 0);
                rect.x = Math.min(rect.x, screenBounds.width - rect.width);
            }
        }
        if (canVerSlide) {
            if (rect.height > screenBounds.height) {
                rect.y = 0;
            }
            else {
                rect.y = Math.max(rect.y, 0);
                rect.y = Math.min(rect.y, screenBounds.height - rect.height);
            }
        }
        rect.Offset(screenOrigin);
        return rect.Location;
    };
    PopupControl.prototype.render = function () {
        if (this._selfHost) {
            this._oldPosition = this.sourceElement.style.position;
            this.sourceElement.style.position = 'absolute';
            this._oldDisplay = this.sourceElement.style.display;
            this.sourceElement.style.display = '';
            this.sourceElement.style.zIndex = '10000';
            this.sourceElement.classList.add(cls_PopupClassName);
            this._operationElem = this.sourceElement;
        }
        else {
            this._popupHost = document.createElement('div');
            let cssText = 'position:absolute; z-index:10000; outline:none;';
            if (this._option.inheritWith) {
                cssText += ('width: ' + (this.target.width + 2) + 'px');
            }
            this._popupHost.style.cssText = cssText;
            this._popupHost.classList.add(cls_PopupClassName);
            this._popupHost.appendChild(this.sourceElement);
            this._option.hostElement.appendChild(this._popupHost);
            this._operationElem = this._popupHost;
        }
    };
    PopupControl.prototype.bindEvent = function () {
        var _this = this;
        if (this._option.closeAfterClickOutside) {
            document.addEventListener('mousedown', this.globalMousedownEventHandler, true);
            'touchstart MSPointerDown pointerdown'.split(' ').forEach(function (value) {
                document.addEventListener(value, _this.globalMousedownEventHandler, true);
            });
        }
        if (this._option.closeAfterResize) {
            document.addEventListener('resize', this.windowResizeEventHandler);
        }
    };
    return PopupControl;
}(baseControl_1.BaseControl));
exports.PopupControl = PopupControl;
/***/ }),

/***/ './dist/plugins/celltype/editor/slider.js':
/*!************************************************!*\
  !*** ./dist/plugins/celltype/editor/slider.js ***!
  \************************************************/
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
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var escapeHtml = Common_1.Common._StringHelper._escapeHtml;
var keyword_null = null;
function _numberToString(num) {
    var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - parseInt(m[2], 10)));
}
function _getPrecision(num) {
    var str = _numberToString(num || 0);
    var precision = 0;
    if (str.indexOf('.') >= 0) {
        precision = str.length - str.indexOf('.') - 1;
    }
    return precision;
}
var Utils = (function () {
    function Utils() {
    }
    Utils.isEmpty = function (data) {
        return data === undefined || data === keyword_null || data === '' || (Array.isArray(data) && data.length === 0);
    };
    Utils.isEmptyObject = function (data) {
        var state = true;
        for (var key in data) {
            if (key) {
                state = false;
                break;
            }
        }
        return state;
    };
    Utils.pauseEvent = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    Utils.isObject = function (obj) {
        var type = typeof (obj);
        return type === 'function' || type === 'object' && !!obj;
    };
    Utils.allKeys = function (obj) {
        var keys = [];
        if (!Utils.isObject(obj)) {
            return [];
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };
    Utils.parseStyleObject = function (obj) {
        if (!Utils.isObject(obj)) {
            return '';
        }
        var className = '';
        var keys = Utils.allKeys(obj);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var value = obj[key];
            var keyCss = key.replace(/([A-Z])/g, '-$1');
            className += keyCss.toLowerCase() + ': ' + value + '; ';
        }
        return className.trim();
    };
    Utils.extend = function (defaultObj, interfaceObj, obj) {
        if (obj === void 0) { obj = {}; }
        var defaultKeys = Utils.allKeys(defaultObj);
        var interfaceKeys = Utils.allKeys(interfaceObj);
        for (var i = 0, len = interfaceKeys.length; i < len; i++) {
            var key = interfaceKeys[i];
            obj[key] = interfaceObj[key];
        }
        for (var i = 0, len = defaultKeys.length; i < len; i++) {
            var key = defaultKeys[i];
            if (obj[key] === void 0) {
                obj[key] = defaultObj[key];
            }
        }
        return obj;
    };
    Utils.noop = function () { };
    Utils.measureWidth = function (text, classname) {
        var width = 0;
        var measureSpan = document.createElement('span');
        measureSpan.classList.add(classname);
        try {
            measureSpan.innerText = text;
            measureSpan.style.display = 'none';
            document.body.appendChild(measureSpan);
            width = Core_1.GC$(measureSpan).width();
        }
        finally {
            document.body.removeChild(measureSpan);
        }
        return width;
    };
    return Utils;
}());
var Track = (function () {
    function Track(option, _container) {
        this._container = _container;
        this._trackOption = {};
        this._trackOption = Utils.extend(this._trackOption, option);
    }
    Track.prototype.render = function () {
        if (!this._trackOption.included) {
            return keyword_null;
        }
        var positionStyle = this._calcTrackPosition();
        var divTrack = this._container.querySelector('.' + this._trackOption.className);
        if (divTrack === keyword_null) {
            divTrack = document.createElement('div');
            divTrack.classList.add('' + this._trackOption.className);
            this._container.appendChild(divTrack);
        }
        divTrack.setAttribute('style', Utils.parseStyleObject(positionStyle));
    };
    Track.prototype.setLength = function (length) {
        this._trackOption.length = length;
        this.render();
    };
    Track.prototype._calcTrackPosition = function () {
        if (this._trackOption.direction === Core_1.LayoutDirection.vertical) {
            return {
                bottom: this._trackOption.offset + '%',
                height: this._trackOption.length + '%'
            };
        }
        else {
            return {
                left: this._trackOption.offset + '%',
                width: this._trackOption.length + '%'
            };
        }
    };
    return Track;
}());
var Step = (function () {
    function Step(option, _container) {
        this._container = _container;
        this._stepOption = {};
        this._stepOption = Utils.extend(this._stepOption, option);
    }
    Step.prototype.render = function () {
        var divStep = this._container.querySelector('.' + this._stepOption.className);
        if (divStep !== keyword_null) {
            return;
        }
        divStep = document.createElement('div');
        divStep.className = '' + this._stepOption.className;
        var points = this._calcPoints();
        for (var i = 0, len = points.length; i < len; i++) {
            var span = this._generateScaleSpan(points[i]);
            divStep.appendChild(span);
        }
        this._container.appendChild(divStep);
    };
    Step.prototype._generateScaleSpan = function (point) {
        var span = document.createElement('span');
        var range = this._stepOption.max - this._stepOption.min;
        var offset = Math.abs(point - this._stepOption.min) / range * 100 + '%';
        var style = this._stepOption.direction === Core_1.LayoutDirection.vertical ? { bottom: offset } : { left: offset };
        span.classList.add(this._stepOption.prefixCls + '-dot');
        span.setAttribute('style', Utils.parseStyleObject(style));
        span.setAttribute('key', point.toString());
        return span;
    };
    Step.prototype._calcPoints = function () {
        var markkeys = Object.keys(this._stepOption.marks).map(function (key) { return Number(key); });
        markkeys.sort(function (x, y) {
            return x - y;
        });
        var points = markkeys;
        if (this._stepOption.dots) {
            for (var i = this._stepOption.min; i <= this._stepOption.max; i += this._stepOption.step) {
                if (points.indexOf(i) === -1) {
                    points.push(i);
                }
            }
        }
        return points;
    };
    return Step;
}());
var Tooltip = (function () {
    function Tooltip(_container, option) {
        this._container = _container;
        this._toolTipOption = {};
        this._template = '';
        this._toolTipOption = Utils.extend(this._toolTipOption, option);
        this._template = '\n        <div class="' + this._toolTipOption.prefixCls + '-tooltip ' + this._toolTipOption.prefixCls + '-tooltip-placement-top">\n            <div class="' + this._toolTipOption.prefixCls + '-tooltip-content">\n                <div class="' + this._toolTipOption.prefixCls + '-tooltip-arrow"></div>\n                <div class="' + this._toolTipOption.prefixCls + '-tooltip-inner">{{value}}</div>\n            </div>\n        </div>\n        ';
    }
    Tooltip.prototype.render = function (offset, value) {
        this._toolTipOption.offset = offset;
        var tooltipDom = this._container.querySelector('.' + this._toolTipOption.prefixCls + '-tooltip');
        var text = new Common_1.Formatter.GeneralFormatter(this._toolTipOption.formatString).format(value);
        if (Utils.isEmpty(tooltipDom)) {
            var safeHtml = escapeHtml(text);
            this._template = this._template.replace(/{{value}}/, safeHtml);
            var div = document.createElement('div');
            div.innerHTML = this._template;
            this._container.appendChild(div.firstElementChild);
            tooltipDom = this._container.querySelector('.' + this._toolTipOption.prefixCls + '-tooltip');
        }
        var textDom = tooltipDom.querySelector('.' + this._toolTipOption.prefixCls + '-tooltip-inner');
        textDom.textContent = text;
        var style = this._getPositionStyle(text);
        tooltipDom.setAttribute('style', Utils.parseStyleObject(style));
        if (this._toolTipOption.tooltipVisible) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    Tooltip.prototype.show = function () {
        var tooltipDom = this._container.querySelector('.' + this._toolTipOption.prefixCls + '-tooltip');
        if (!Utils.isEmpty(tooltipDom)) {
            tooltipDom.style.display = 'inline-block';
        }
    };
    Tooltip.prototype.hide = function () {
        var tooltip = this._container.querySelector('.' + this._toolTipOption.prefixCls + '-tooltip');
        if (!Utils.isEmpty(tooltip)) {
            tooltip.style.display = 'none';
        }
    };
    Tooltip.prototype._getPositionStyle = function (text) {
        var width = Utils.measureWidth(text, this._toolTipOption.prefixCls + '-tooltip');
        if (width === 0) {
            width = 12;
        }
        else {
            width = width / 2 + 4;
        }
        if (this._toolTipOption.direction === Core_1.LayoutDirection.vertical) {
            return {
                left: '-' + width + 'px',
                bottom: 'calc(' + this._toolTipOption.offset + '% + 10px)'
            };
        }
        else {
            return {
                top: '-28px',
                left: 'calc(' + this._toolTipOption.offset + '% - ' + (width + 4) + 'px)'
            };
        }
    };
    return Tooltip;
}());
var Handle = (function () {
    function Handle(option, _container) {
        this._container = _container;
        this._handleOption = {};
        this._clickFocused = false;
        this._toolTip = keyword_null;
        this._handleOption = Utils.extend(this._handleOption, option);
        this._toolTip = new Tooltip(this._container, this._getToolTipOption());
    }
    Handle.prototype.render = function () {
        var _this = this;
        var className = this._getClassName();
        var handleStyle = this._getPositionStyle();
        var tabIndex = this._handleOption.tabIndex || 0;
        if (this._handleOption.disabled || tabIndex === keyword_null) {
            tabIndex = keyword_null;
        }
        var divHandle = this._container.querySelector('.' + this._handleOption.className);
        if (divHandle === keyword_null) {
            divHandle = document.createElement('div');
            divHandle.className = className;
            this._container.appendChild(divHandle);
            divHandle.setAttribute('role', 'slider');
            divHandle.setAttribute('aria-valuemin', this._handleOption.min.toString());
            divHandle.setAttribute('aria-valuemax', this._handleOption.max.toString());
            divHandle.setAttribute('aria-valuenow', this._handleOption.value.toString());
            divHandle.setAttribute('aria-disabled', String(this._handleOption.disabled));
            divHandle.addEventListener('blur', function () {
                _this._setClickFocus(false);
            });
            divHandle.addEventListener('mouseenter', function () {
                _this._toolTip.show();
            });
            divHandle.addEventListener('keydown', function () {
                _this._setClickFocus(false);
            });
            divHandle.addEventListener('mousedown', function () {
                divHandle.focus();
                _this._toolTip.show();
            });
            document.addEventListener('mouseup', function () {
                if (document.activeElement === divHandle) {
                    _this._setClickFocus(true);
                    _this._toolTip.hide();
                }
            });
        }
        divHandle.tabIndex = tabIndex;
        divHandle.setAttribute('style', Utils.parseStyleObject(handleStyle));
    };
    Handle.prototype.setOffset = function (offset, value) {
        this._handleOption.offset = offset;
        this.render();
        this._toolTip.render(offset, value);
    };
    Handle.prototype._setClickFocus = function (focused) {
        this._clickFocused = focused;
    };
    Handle.prototype._getClassName = function () {
        if (this._clickFocused) {
            return this._handleOption.className + ' ' + this._handleOption.prefixCls + '-handle-click-focused';
        }
        else {
            return '' + this._handleOption.className;
        }
    };
    Handle.prototype._getPositionStyle = function () {
        if (this._handleOption.direction === Core_1.LayoutDirection.vertical) {
            return {
                bottom: this._handleOption.offset + '%'
            };
        }
        else {
            return {
                left: this._handleOption.offset + '%'
            };
        }
    };
    Handle.prototype._getToolTipOption = function () {
        return {
            prefixCls: 'gc-slider',
            tooltipVisible: this._handleOption.tooltipVisible,
            direction: this._handleOption.direction,
            offset: this._handleOption.offset,
            formatString: this._handleOption.formatString,
        };
    };
    return Handle;
}());
var Mark = (function () {
    function Mark(option, _container) {
        this._container = _container;
        this._markOption = {};
        this._markOption = Utils.extend(this._markOption, option);
    }
    Mark.prototype.render = function () {
        var divMark = this._container.querySelector('.' + this._markOption.className);
        if (divMark !== keyword_null) {
            return;
        }
        divMark = document.createElement('div');
        divMark.className = '' + this._markOption.className;
        var marksKeys = this._getMarkKeys();
        this._getMaxSpanWidth(marksKeys);
        for (var i = 0, len = marksKeys.length; i < len; i++) {
            var point = marksKeys[i];
            var span = this._generateMarkLabelSpan(point);
            if (span !== keyword_null) {
                divMark.appendChild(span);
            }
        }
        this._container.appendChild(divMark);
    };
    Mark.prototype._getMaxSpanWidth = function (marksKeys) {
        this._maxWidth = 0;
        for (var i = 1, len = marksKeys.length; i < len; i++) {
            var markPoint = this._markOption.marks[marksKeys[0]];
            if (markPoint) {
                var width = Utils.measureWidth(markPoint.label, this._markOption.className + '-text');
                if (!this._maxWidth || this._maxWidth < width) {
                    this._maxWidth = width;
                }
            }
        }
    };
    Object.defineProperty(Mark.prototype, 'maxWidth', {
        get: function () {
            return this._maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Mark.prototype._getMarkKeys = function () {
        var marksKeys = Utils.allKeys(this._markOption.marks);
        return marksKeys.sort(function (a, b) {
            return a - b;
        });
    };
    Mark.prototype._generateMarkLabelSpan = function (point) {
        var _this = this;
        var markPoint = this._markOption.marks[point];
        var markLabel = Utils.isObject(markPoint) ? markPoint.label : markPoint;
        if (Utils.isEmptyObject(markLabel)) {
            return keyword_null;
        }
        var markClassName = this._markOption.className + '-text';
        var style = this._getStyleByVertical(point);
        var markStyle = Utils.extend(style, markPoint.style);
        var span = document.createElement('span');
        span.classList.add(markClassName);
        span.setAttribute('style', Utils.parseStyleObject(markStyle));
        span.setAttribute('key', point.toString());
        span.addEventListener('mousedown', function (e) {
            _this._markOption.onClickLabel(e, point);
        });
        span.innerHTML = escapeHtml(markLabel);
        return span;
    };
    Mark.prototype._getStyleByVertical = function (point) {
        var range = this._markOption.max - this._markOption.min;
        if (this._markOption.direction === Core_1.LayoutDirection.vertical) {
            return {
                'margin-bottom': '-50%',
                'bottom': (point - this._markOption.min) / range * 100 + '%'
            };
        }
        else {
            return {
                left: (point - this._markOption.min) / range * 100 + '%',
                transform: 'translateX(-50%)'
            };
        }
    };
    return Mark;
}());
var CreateSlider = (function () {
    function CreateSlider(_container, _track, _handle, _option) {
        this._container = _container;
        this._track = _track;
        this._handle = _handle;
        this._option = _option;
        this._step = keyword_null;
        this._marks = keyword_null;
        this._step = new Step(this._getStepOption(), this._container);
        this._marks = new Mark(this._getMarkOption(), this._container);
    }
    CreateSlider.prototype.render = function () {
        var rail = document.createElement('div');
        rail.className = this._option.prefixCls + '-rail';
        this._container.appendChild(rail);
        this._track.render();
        this._step.render();
        this._handle.render();
        this._marks.render();
        if (this._marks.maxWidth && this._option.direction === Core_1.LayoutDirection.vertical) {
            this._container.style.paddingRight = this._marks.maxWidth + 'px';
        }
    };
    CreateSlider.prototype.calcValueByPosition = function (startPosition) {
        var pixelOffset = startPosition - this._getSliderStart();
        return this.trimAlignValue(this._calcValue(pixelOffset));
    };
    CreateSlider.prototype.trimAlignValue = function (value) {
        if (Utils.isEmpty(value)) {
            return keyword_null;
        }
        return this._ensureValuePrecision(value);
    };
    CreateSlider.prototype.calcOffset = function () {
        var ratio = Math.max((this._option.value - this._option.min), 0) / (this._option.max - this._option.min);
        return ratio * 100;
    };
    CreateSlider.prototype.getKeyboardValueMutator = function (e) {
        var _this = this;
        switch (e.keyCode) {
            case 38 :
            case 39 :
                return function (value) {
                    return _this.calculateNextValue('increase', value);
                };
            case 40 :
            case 37 :
                return function (value) {
                    return _this.calculateNextValue('decrease', value);
                };
            case 35 :
                return function (value) {
                    return _this._option.max;
                };
            case 36 :
                return function (value) {
                    return _this._option.min;
                };
            default:
                break;
        }
    };
    CreateSlider.prototype.calculateNextValue = function (funcStr, value) {
        var operations = {
            increase: function increase(a, b) {
                return a + b;
            },
            decrease: function decrease(a, b) {
                return a - b;
            }
        };
        var markIndex = Object.keys(this._option.marks).indexOf(String(value));
        var nextmarkIndex = operations[funcStr](markIndex, 1);
        var markKey = Object.keys(this._option.marks)[nextmarkIndex];
        if (this._option.step) {
            return operations[funcStr](value, this._option.step);
        }
        else if (!Utils.isEmptyObject(this._option.marks) && !!this._option.marks[markKey]) {
            return this._option.marks[markKey];
        }
        return value;
    };
    CreateSlider.prototype._ensureValuePrecision = function (value) {
        var closestPoint = isFinite(this._getClosestPoint(value)) ? this._getClosestPoint(value) : 0;
        return this._option.step === keyword_null ? closestPoint : parseFloat(closestPoint.toFixed(this._getPrecision()));
    };
    CreateSlider.prototype._getPrecision = function () {
        if (isNullOrUndefined(this._option.precision)) {
            var precision = Math.max(_getPrecision(this._option.max), _getPrecision(this._option.min), _getPrecision(this._option.step));

            for (var key in this._option.marks) {
                precision = Math.max(_getPrecision(parseFloat(key)), precision);
            }
            this._option.precision = precision;
        }
        return this._option.precision;
    };
    CreateSlider.prototype._getClosestPoint = function (val) {
        var points = Object.keys(this._option.marks).map(parseFloat);
        if (this._option.step !== keyword_null) {
            var maxStep = Math.ceil((this._option.max - this._option.min) / this._option.step);
            var steps = Math.min((val - this._option.min) / this._option.step, maxStep);
            var closestStep = Math.round(steps) * this._option.step + this._option.min;
            points.push(Math.min(closestStep, this._option.max));
        }
        var diffs = points.map(function (point) {
            return Math.abs(val - point);
        });
        return points[diffs.indexOf(Math.min.apply(Math, diffs))];
    };
    CreateSlider.prototype._getStepOption = function () {
        return {
            prefixCls: this._option.prefixCls,
            className: this._option.prefixCls + '-step',
            direction: this._option.direction,
            marks: this._option.marks,
            dots: this._option.dots,
            step: this._option.step,
            included: this._option.included,
            max: this._option.max,
            min: this._option.min
        };
    };
    CreateSlider.prototype._getMarkOption = function () {
        var _this = this;
        return {
            className: this._option.prefixCls + '-mark',
            onClickLabel: this._option.disabled ? Utils.noop : function (e, value) { _this._onClickMarkLabel(e, value); },
            direction: this._option.direction,
            marks: this._option.marks,
            included: this._option.included,
            max: this._option.max,
            min: this._option.min
        };
    };
    CreateSlider.prototype._onClickMarkLabel = function (e, value) {
    };
    CreateSlider.prototype._getSliderStart = function () {
        var rect = this._container.getBoundingClientRect();
        if (this._option.direction === Core_1.LayoutDirection.vertical) {
            return rect.top;
        }
        else {
            return rect.left;
        }
    };
    CreateSlider.prototype._getSliderLength = function () {
        var coords = this._container.getBoundingClientRect();
        if (this._option.direction === Core_1.LayoutDirection.vertical) {
            return coords.height;
        }
        return coords.width;
    };
    CreateSlider.prototype._calcValue = function (offset) {
        var min = this._option.min;
        var max = this._option.max;
        var ratio = Math.abs(Math.max(offset, 0) / this._getSliderLength());
        if (this._option.direction === Core_1.LayoutDirection.vertical) {
            ratio = Math.max(1 - ratio, 0);
        }
        return ratio * (max - min) + min;
    };
    return CreateSlider;
}());
var Slider = (function (_super) {
    __extends(Slider, _super);

    function Slider(container, option) {
        var _this = _super.call(this, container) || this;

        _this._track = keyword_null;
        _this._handle = keyword_null;
        _this._createSlider = keyword_null;
        _this._onMoveStart = function (e) {
            Utils.pauseEvent(e);
            if (e.button !== 0) {
                return;
            }
            document.addEventListener('mouseup', _this._onMoveEnd, false);
            document.addEventListener('pointerup', _this._onMoveEnd, false);
            document.addEventListener('MSPointerUp', _this._onMoveEnd, false);
            document.addEventListener('mousemove', _this._onMoving, false);
            document.addEventListener('pointermove', _this._onMoving, false);
            document.addEventListener('MSPointerMove', _this._onMoving, false);
            _this._onMoving(e);
        };
        _this._onMoving = function (e) {
            Utils.pauseEvent(e);
            var nextValue = _this._getNextValue(e);
            if (_this._startValue !== nextValue) {
                _this.setValue(nextValue);
                _this._sliderProps.onChange(nextValue);
            }
        };
        _this._onMoveEnd = function (e) {
            _this._onMoving(e);
            document.removeEventListener('mousemove', _this._onMoving);
            document.removeEventListener('mouseup', _this._onMoveEnd);
            document.removeEventListener('pointermove', _this._onMoving);
            document.removeEventListener('pointerup', _this._onMoveEnd);
            document.removeEventListener('MSPointerMove', _this._onMoving);
            document.removeEventListener('MSPointerUp', _this._onMoveEnd);
            var nextValue = _this._getNextValue(e);
            _this._startValue = nextValue;
            _this._sliderProps.onAfterChange(_this._sliderProps.value);
            _this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { value: nextValue, text: nextValue.toString(), notCloseDropDown: true });
            Utils.pauseEvent(e);
        };
        _this._onTouchStart = function (e) {
            Utils.pauseEvent(e);
            var elem = (e.target || e.srcElement);
            document.addEventListener('touchend', _this._onTouchEnd, false);
            if (elem.classList.contains(_this._sliderProps.prefixCls + '-handle')) {
                document.addEventListener('touchmove', _this._onTouchMoving, false);
            }
            else {
                _this._onTouchMoving(e);
            }
        };
        _this._onTouchMoving = function (e) {
            Utils.pauseEvent(e);
            var touch = e.targetTouches[0];
            var nextValue = _this._getNextValue(touch);
            if (_this._startValue !== nextValue) {
                _this.setValue(nextValue);
                _this._sliderProps.onChange(nextValue);
            }
        };
        _this._onTouchEnd = function (e) {
            document.removeEventListener('touchmove', _this._onTouchMoving);
            document.removeEventListener('touchend', _this._onTouchEnd);
            var touch = e.changedTouches[0];
            var nextValue = _this._getNextValue(touch);
            _this._startValue = nextValue;
            _this._sliderProps.onAfterChange(_this._sliderProps.value);
            _this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { value: nextValue, text: nextValue.toString(), notCloseDropDown: true });
            Utils.pauseEvent(e);
        };
        _this.init(option);
        return _this;
    }

    Slider.prototype.setValue = function (v) {
        if (this._sliderProps.disabled) {
            return;
        }
        var num = parseFloat(v);
        if (isNaN(num)) {
            num = this._sliderProps.min;
        }
        else {
            num = Math.max(this._sliderProps.min, num);
            num = Math.min(this._sliderProps.max, num);
        }
        this._sliderProps.value = num;
        this._startValue = this._sliderProps.value;
        this._track.setLength(this.calcOffset());
        this._handle.setOffset(this.calcOffset(), num);
    };
    Slider.prototype.calcOffset = function () {
        var ratio = Math.max((this._sliderProps.value - this._sliderProps.min), 0) / (this._sliderProps.max - this._sliderProps.min);
        ratio = Math.min(ratio, 1);
        return ratio * 100;
    };
    Slider.prototype.setOptions = function (option) {
        this.init(option);
    };


    Slider.prototype.init = function (option) {
        this._transferOption(option);
        this._setInitOption();
        this._host.innerHTML = '';
        var container = document.createElement('div');
        container.className = 'gc-slider-container';
        this._host.appendChild(container);
        if (this._sliderProps.direction === Core_1.LayoutDirection.vertical) {
            container.classList.add(this._sliderProps.prefixCls + '-vertical');
            container.style.height = this._sliderProps.height + 'px';
        }
        else {
            container.style.width = this._sliderProps.width + 'px';
        }
        var sliderElem = document.createElement('div');
        sliderElem.className = this._getClassName();
        container.appendChild(sliderElem);
        this._track = new Track(this._getTrackOption(), sliderElem);
        this._handle = new Handle(this._getHandleOption(), sliderElem);
        this._createSlider = new CreateSlider(sliderElem, this._track, this._handle, this._getCreateSliderOption());
        this._createSlider.render();
        this._attachEvent(sliderElem);
    };
    Slider.prototype._attachEvent = function (sliderElem) {
        var _this = this;
        if (this._sliderProps.disabled) {
            return;
        }
        sliderElem.addEventListener('mousedown', this._onMoveStart);
        sliderElem.addEventListener('pointerdown', this._onMoveStart);
        sliderElem.addEventListener('MSPointerDown', this._onMoveStart);
        sliderElem.addEventListener('touchstart', this._onTouchStart);
        sliderElem.addEventListener('keyup', function (e) {
            Utils.pauseEvent(e);
            var valueMutator = _this._createSlider.getKeyboardValueMutator(e);
            if (!Utils.isEmpty(valueMutator)) {
                var mutatedValue = valueMutator(_this._sliderProps.value);
                var value = _this._createSlider.trimAlignValue(mutatedValue);
                if (value === _this._sliderProps.value) {
                    return;
                }
                _this.setValue(value);
                _this._sliderProps.onChange(value);
                _this._sliderProps.onAfterChange(value);
                _this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { value: value, text: value.toString(), notCloseDropDown: true });
            }
        });
    };
    Slider.prototype._getNextValue = function (e) {
        var nextValue = 0;
        if (this._sliderProps.direction === Core_1.LayoutDirection.vertical) {
            nextValue = this._createSlider.calcValueByPosition(e.clientY);
        }
        else {
            nextValue = this._createSlider.calcValueByPosition(e.clientX);
        }
        return nextValue;
    };
    Slider.prototype._defaultOption = function () {
        var noop = function (value) { };
        return {
            prefixCls: 'gc-slider',

            dots: false,
            range: false,
            disabled: false,
            max: 100,
            min: 0,

            step: 1,
            value: 0,
            direction: Core_1.LayoutDirection.horizontal,
            included: true,
            width: 350,
            height: 350,
            marks: {},
            tooltipVisible: false,
            onChange: noop,
            onAfterChange: noop,
            formatString: 'General'
        };
    };
    Slider.prototype._setInitOption = function () {
        if (Utils.isEmpty(this._sliderProps) || Utils.isEmptyObject(this._sliderProps)) {
            this._sliderProps = {};
        }
        this._sliderProps = Utils.extend(this._defaultOption(), this._sliderProps);
    };
    Slider.prototype._transferOption = function (option) {
        var _this = this;
        if (!option) {
            return;
        }
        if (!isNullOrUndefined(option.scaleVisible)) {
            this._sliderProps.dots = option.scaleVisible;
        }
        if (!isNullOrUndefined(option.direction)) {
            this._sliderProps.direction = option.direction;
        }
        if (!isNullOrUndefined(option.formatString)) {
            this._sliderProps.formatString = option.formatString;
        }
        this._transferNumber(option.min, 'min');
        this._transferNumber(option.max, 'max');
        this._transferNumber(option.step, 'step');
        this._transferNumber(option.width, 'width');
        this._transferNumber(option.height, 'height');
        if (this._sliderProps.step <= 0) {
            this._sliderProps.step = 1;
        }
        if (this._sliderProps.min > this._sliderProps.max) {
            this._sliderProps.max = this._sliderProps.min;
        }
        if (!isNullOrUndefined(option.tooltipVisible)) {
            this._sliderProps.tooltipVisible = option.tooltipVisible;
        }
        this._sliderProps.marks = {};
        if (option.marks) {
            option.marks.forEach(function (s) {
                var num = parseFloat(s);
                if (!isNaN(num)) {
                    if (num >= _this._sliderProps.min && num <= _this._sliderProps.max) {
                        var format = new Common_1.Formatter.GeneralFormatter(_this._sliderProps.formatString);
                        _this._sliderProps.marks[num] = { label: format.format(num) };
                    }
                }
            });
        }
    };
    Slider.prototype._transferNumber = function (value, attr) {
        if (!isNullOrUndefined(value)) {
            var max = parseFloat(value);
            if (!isNaN(max)) {
                this._sliderProps[attr] = max;
            }
        }
    };
    Slider.prototype._getTrackOption = function () {
        return {
            className: this._sliderProps.prefixCls + '-track',
            included: this._sliderProps.included,
            direction: this._sliderProps.direction,
            offset: 0,
            length: 0
        };
    };
    Slider.prototype._getHandleOption = function () {
        return {
            prefixCls: this._sliderProps.prefixCls,
            className: this._sliderProps.prefixCls + '-handle',
            direction: this._sliderProps.direction,
            disabled: this._sliderProps.disabled,
            min: this._sliderProps.min,
            max: this._sliderProps.max,
            value: this._sliderProps.value,
            offset: 0,
            tabIndex: 0,
            tooltipVisible: this._sliderProps.tooltipVisible,
            formatString: this._sliderProps.formatString
        };
    };
    Slider.prototype._getCreateSliderOption = function () {
        return {
            prefixCls: this._sliderProps.prefixCls,
            min: this._sliderProps.min,
            max: this._sliderProps.max,
            value: this._sliderProps.value,
            disabled: this._sliderProps.disabled,
            direction: this._sliderProps.direction,
            dots: this._sliderProps.dots,
            step: this._sliderProps.step,
            included: this._sliderProps.included,
            marks: this._sliderProps.marks
        };
    };
    Slider.prototype._getClassName = function () {
        var className = '' + this._sliderProps.prefixCls;
        if (this._sliderProps.direction === Core_1.LayoutDirection.vertical) {
            className += '  ' + this._sliderProps.prefixCls + '-vertical';
        }
        if (!Utils.isEmptyObject(this._sliderProps.marks)) {
            className += ' ' + this._sliderProps.prefixCls + '-with-marks';
        }
        if (this._sliderProps.disabled) {
            className += ' ' + this._sliderProps.prefixCls + '-disabled';
        }
        return className;
    };
    return Slider;
}(baseControl_1.BaseDropdown));
exports.Slider = Slider;
/***/ }),

/***/ './dist/plugins/celltype/editor/timepicker.js':
/*!****************************************************!*\
  !*** ./dist/plugins/celltype/editor/timepicker.js ***!
  \****************************************************/
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
var listControl_1 = __webpack_require__(/*! ./listControl */ './dist/plugins/celltype/editor/listControl.js');
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var const_undefined = 'undefined';
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;


var TimePicker = (function (_super) {
    __extends(TimePicker, _super);


    function TimePicker(host, option) {
        var _this = _super.call(this, host) || this;
        _this._init();
        _this.setOptions(option);
        return _this;
    }


    TimePicker.prototype.setOptions = function (option) {
        if (!option) {
            this._update();
            return;
        }
        var min = this._transferPickerValue(option.min);
        if (min !== null) {
            this._option.min = min;
        }
        var max = this._transferPickerValue(option.max);
        if (max !== null) {
            this._option.max = max;
        }
        var step = this._transferPickerValue(option.step);
        if (step !== null) {
            this._option.step = step;
        }
        if (!isNullOrUndefined(option.formatString)) {
            this._option.formatString = option.formatString;
        }
        if (!isNullOrUndefined(option.height)) {
            var height = parseInt(option.height, 10);
            if (!isNaN(height)) {
                this._option.height = height;
            }
        }
        this._option.height = Math.max(1, this._option.height);
        this._update();
    };
    TimePicker.prototype.setValue = function (value) {
        if (value !== undefined) {
            this._selectValue = {
                hour: value.getHours(),
                minute: value.getMinutes(),
                second: value.getSeconds(),
            };
            this._preValue = value;
            this._updateSelection();
            this.scrollToSelect();
        }
    };
    TimePicker.prototype.scrollToSelect = function () {
        var selected = this._outerDiv.querySelector('.selected');
        if (selected !== null) {
            var scrollIntoViewTop = selected.offsetTop;
            this._container.scrollTop = scrollIntoViewTop;
        }
    };


    TimePicker.prototype._init = function () {
        var _this = this;
        this._option = {
            min: {},
            max: { hour: 23, minute: 59, second: 59 },
            step: { hour: 1 },
            formatString: 'hh:mm',
            height: 200,
        };
        this._outerDiv = document.createElement('div');
        this._outerDiv.classList.add('gc-time-picker-outer-div');
        this._outerDiv.addEventListener('click', function (e) {
            _this._onMouseClick(e);
        });
        this._host.appendChild(this._outerDiv);
    };
    TimePicker.prototype._transferPickerValue = function (value) {
        var option = null;
        if (!isNullOrUndefined(value)) {
            option = {};
            if (!isNullOrUndefined(value.hour)) {
                var hour = parseInt(value.hour, 10);
                if (!isNaN(hour)) {
                    option.hour = hour;
                }
            }
            if (!isNullOrUndefined(value.minute)) {
                var minute = parseInt(value.minute, 10);
                if (!isNaN(minute)) {
                    option.minute = minute;
                }
            }
            if (!isNullOrUndefined(value.second)) {
                var second = parseInt(value.second, 10);
                if (!isNaN(second)) {
                    option.second = second;
                }
            }
        }
        return option;
    };
    TimePicker.prototype._update = function () {
        this._outerDiv.innerHTML = '';
        new listControl_1.List(this._outerDiv, this._getTimeListData());
        this._updateSelection();
    };
    TimePicker.prototype._updateSelection = function () {
        var timeItems = this._outerDiv.querySelectorAll('.gc-time-picker-li');
        if (timeItems.length > 0) {
            for (var i = 0; i < timeItems.length; i++) {
                timeItems[i].classList.remove('selected');
                var hour = +timeItems[i].getAttribute('hour');
                var minute = +timeItems[i].getAttribute('minute');
                var second = +timeItems[i].getAttribute('second');
                if (this._isTimeEqual(this._selectValue, {
                    hour: hour,
                    minute: minute,
                    second: second
                })) {
                    timeItems[i].classList.add('selected');
                }
            }
        }
    };
    TimePicker.prototype._getTimeListData = function () {
        var _this = this;
        return {
            items: function () {
                var itemData = _this._getTimeItemData();
                var timeContainerElement = document.createElement('div');
                timeContainerElement.classList.add('gc-time-picker-container');
                _this._container = timeContainerElement;
                if (_this._option.height < 0) {
                    timeContainerElement.style.height = 'auto';
                }
                else {
                    timeContainerElement.style.maxHeight = _this._option.height + 'px';
                }
                var timeULElement = document.createElement('ul');
                timeULElement.classList.add('gc-time-picker-ul');
                for (var i = 0; i < itemData.length; i++) {
                    timeULElement.appendChild(_this._createTimeItemElement(itemData[i]));
                }
                if (itemData.length * 24 > _this._option.height && _this._option.height >= 0) {
                    timeContainerElement.style.overflowY = 'scroll';
                }
                else {
                    timeContainerElement.style.overflowY = 'hidden';
                }
                timeContainerElement.appendChild(timeULElement);
                return timeContainerElement;
            }
        };
    };
    TimePicker.prototype._createTimeItemElement = function (timeValue) {
        var timeLIElement = document.createElement('li');
        timeLIElement.classList.add('gc-time-picker-li');
        timeLIElement.setAttribute('hour', timeValue.hour.toString());
        timeLIElement.setAttribute('minute', timeValue.minute.toString());
        timeLIElement.setAttribute('second', timeValue.second.toString());
        timeLIElement.innerText = this._getTimeItemText(timeValue);
        return timeLIElement;
    };
    TimePicker.prototype._getTimeItemData = function () {
        var currentDate = this._getDate(this._option.min);
        var maxDate = this._getDate(this._option.max);
        var data = [];
        while (currentDate <= maxDate) {
            data.push({
                hour: currentDate.getHours(),
                minute: currentDate.getMinutes(),
                second: currentDate.getSeconds()
            });
            currentDate = this._getNextTime(currentDate, this._option.step);
        }
        return data;
    };
    TimePicker.prototype._getNextTime = function (date, step) {
        if (typeof (step.hour) !== const_undefined) {
            date.setHours(date.getHours() + step.hour);
        }
        if (typeof (step.minute) !== const_undefined) {
            date.setMinutes(date.getMinutes() + step.minute);
        }
        if (typeof (step.second) !== const_undefined) {
            date.setSeconds(date.getSeconds() + step.second);
        }
        return date;
    };
    TimePicker.prototype._getTimeItemText = function (timeValue) {
        var date = new Date();
        date.setHours(timeValue.hour);
        date.setMinutes(timeValue.minute);
        date.setSeconds(timeValue.second);
        var formatter = new Common_1.Formatter.GeneralFormatter(this._option.formatString);
        var label = formatter.format(date);
        if (label && label !== '' && label !== null) {
            return label;
        }
        return this._getDateLocaleLabel(date);
    };
    TimePicker.prototype._getDateLocaleLabel = function (date) {
        var hour = date.getHours();
        var minute = date.getMinutes();
        var timePrefix = hour < 12 ? 'AM' : 'PM';
        var realHour = (hour === 0 || hour === 12) ? '12' : (hour % 12).toString();
        var realMinute = minute < 10 ? '0' + minute.toString() : minute.toString();
        return timePrefix + ' ' + realHour + ':' + realMinute;
    };
    TimePicker.prototype._getDate = function (timeValue) {
        var date = new Date();
        date.setHours(timeValue.hour || 0);
        date.setMinutes(timeValue.minute || 0);
        date.setSeconds(timeValue.second || 0);
        return date;
    };
    TimePicker.prototype._isTimeEqual = function (time1, time2) {
        if (time1 && time2) {
            time1 = this._fixTimeValue(time1);
            time2 = this._fixTimeValue(time2);
            return time1.hour === time2.hour &&
                time1.minute === time2.minute &&
                time1.second === time2.second;
        }
        return false;
    };
    TimePicker.prototype._fixTimeValue = function (srcTime) {
        return {
            hour: srcTime.hour || 0,
            minute: srcTime.minute || 0,
            second: srcTime.second || 0
        };
    };


    TimePicker.prototype._onMouseClick = function (e) {
        var srcElement = (e.target);
        if (srcElement) {
            var hour = +srcElement.getAttribute('hour');
            var minute = +srcElement.getAttribute('minute');
            var second = +srcElement.getAttribute('second');
            var value = this._preValue || new Date();
            value.setHours(hour);
            value.setMinutes(minute);
            value.setSeconds(second);
            value.setMilliseconds(0);
            var df = Common_1.Common.CultureManager._getCultureInfo(Common_1.Common.CultureManager.culture()).DateTimeFormat;
            var result = new Common_1.Formatter.GeneralFormatter(df.defaultDatePattern).format(value);
            this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, { value: value, text: result });
            this._selectValue = {
                hour: hour,
                minute: minute,
                second: second,
            };
            this._updateSelection();
        }
    };
    return TimePicker;
}(baseControl_1.BaseDropdown));
exports.TimePicker = TimePicker;
/***/ }),

/***/ './dist/plugins/celltype/editor/workflowPicker.js':
/*!********************************************************!*\
  !*** ./dist/plugins/celltype/editor/workflowPicker.js ***!
  \********************************************************/
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
var baseControl_1 = __webpack_require__(/*! ./baseControl */ './dist/plugins/celltype/editor/baseControl.js');
var listControl_1 = __webpack_require__(/*! ./listControl */ './dist/plugins/celltype/editor/listControl.js');
var Common_1 = __webpack_require__(/*! Common */ 'Common');
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var WorkFlow = (function (_super) {
    __extends(WorkFlow, _super);
    function WorkFlow(container, option) {
        var _this = _super.call(this, container) || this;
        _this._list = new listControl_1.List(container);
        _this._list.on(baseControl_1.BaseDropdown.Event_ValueChanged, function (args) {
            _this.fire(baseControl_1.BaseDropdown.Event_ValueChanged, args);
        });
        _this.setOptions(option);
        return _this;
    }
    WorkFlow.prototype.setOptions = function (option) {
        this._option = option;
    };
    WorkFlow.prototype.setValue = function (value) {
        if (!this._option) {
            return;
        }
        var data = getNextList(this._option, value);
        this._list.setOptions(data);
    };
    WorkFlow.prototype.updateStyle = function (backColor, foreColor, font) {
        this._list.updateStyle(backColor, foreColor, font);
    };
    return WorkFlow;
}(baseControl_1.BaseDropdown));
exports.WorkFlow = WorkFlow;
function getNextList(workFlowInfo, currentValue) {
    var result = { items: [] };
    var actions = workFlowInfo.items;
    var current = actions.filter(function (s) { return s.value === currentValue; })[0];
    if (isNullOrUndefined(current) && actions && actions.length > 0) {
        var item = result.items;
        item.push({
            text: actions[0].value,
            value: actions[0].value
        });
    }
    else {
        if (current && current.transitions && current.transitions.length > 0) {
            var _loop_1 = function (i) {
                var value = current.transitions[i];
                if (typeof value === 'number' && actions[value]) {
                    value = actions[value].value;
                }
                var action = actions.filter(function (s) { return s.value === value; })[0];
                if (action) {
                    var item = result.items;
                    item.push({
                        text: action.value,
                        value: action.value
                    });
                }
            };
            for (var i = 0; i < current.transitions.length; i++) {
                _loop_1(i);
            }
        }
    }
    return result;
}
/***/ }),

/***/ './dist/plugins/celltype/hyperlinkcelltype.js':
/*!****************************************************!*\
  !*** ./dist/plugins/celltype/hyperlinkcelltype.js ***!
  \****************************************************/
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
var Core_1 = __webpack_require__(/*! Core */ 'Core');
var Context = Core_1.CellTypes.Context;
var getPositionOffset = Context._getPositionOffset;
var BaseCellType = Core_1.CellTypes.Base;
var _createElement = Core_1._util._createElement;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var escapeJavascript = Common_1.Common._StringHelper._escapeJavascript;
var getFontHeight = Core_1._util._getFontHeight, browser = Core_1._util._browser, browser_mozilla = browser.mozilla;
var $ = Core_1.GC$, $_each = $.each;
var keyword_null = null, Math_max = Math.max, Math_min = Math.min, Math_floor = Math.floor, window_open = window.open;
var cssPosition = 'position', cssAbsolute = 'absolute', cssMargin = 'margin', cssFont = 'font', cssLeft = 'left', cssTop = 'top', cssPadding = 'padding', cssBorder = 'border', cssBoxSizing = 'box-sizing', cssBackgroundColor = 'background-color', cssContentBox = 'content-box', cssDefault = 'default', cssWhite = 'white', STR_DIV = 'div';
var HYPERLINK_INFO = 'hyperlinkInfo';
function _removeChild(parent, child) {
    parent.removeChild(child);
}


var HyperLinkTargetType;
(function (HyperLinkTargetType) {
    HyperLinkTargetType[HyperLinkTargetType['blank'] = 0] = 'blank';

    HyperLinkTargetType[HyperLinkTargetType['self'] = 1] = 'self';

    HyperLinkTargetType[HyperLinkTargetType['parent'] = 2] = 'parent';

    HyperLinkTargetType[HyperLinkTargetType['top'] = 3] = 'top';
})(HyperLinkTargetType = exports.HyperLinkTargetType || (exports.HyperLinkTargetType = {}));

var hyperLinkCellTypePropertyDict = {
    linkColor: '#0066cc',
    visitedLinkColor: '#3399ff',
    text: '',
    linkToolTip: '',
    target: 0 ,
    activeOnClick: true,
};


var HyperLinkCellType = (function (_super) {
    __extends(HyperLinkCellType, _super);
    function HyperLinkCellType() {
        var _this = _super.call(this) || this;
        _this.typeName = 8 + '';
        var self = _this;
        _this._id = _this._getUniqueId();
        $_each(hyperLinkCellTypePropertyDict, function (p, v) {
            self['_' + p] = v;
        });
        _this._onAction = function (context) {
            var sheet = context && context.sheet;
            var row = context.row, col = context.col, sheetArea = context.sheetArea;
            var link = sheet.getValue(row, col, sheetArea);
            var targetValue = getTargetValue(this._target);
            if (link) {
                window_open(escapeJavascript(link), targetValue);
            }
        };
        return _this;
    }
    HyperLinkCellType.prototype._getUniqueId = function () {
        if (isNullOrUndefined(this._id)) {
            this._id = '0';
        }
        var id = parseInt(this._id, 10);
        var resultId = 'id_' + id;
        id++;
        this._id = id + '';
        return resultId;
    };
    HyperLinkCellType.prototype._paintLinkText = function (ctx, indent, x, y, w, h, style, options, lines, textHeight) {
        var adjX = 1, textAlign = cssLeft, hAlign = style.hAlign, vAlign = style.vAlign, linkTextHeight = options.lineHeight;
        var lineCount = lines.length;
        adjX += indent;
        if (hAlign === 1) {
            adjX = w / 2;
            textAlign = 'center';
        }
        else if (hAlign === 2) {
            adjX = w - 1;
            adjX -= indent;
            textAlign = 'right';
        }
        if (ctx.textAlign !== textAlign) {
            ctx.textAlign = textAlign;
        }
        var adjY = 1, textBaseline = 'alphabetic', fontSize = parseInt(options.fontInfo.fontSize, 10), baselineOffset = fontSize > 8 ? Math_floor((fontSize - 8) / 5 + 2) : 1, lineOffset = linkTextHeight / 2 - fontSize / 2 + baselineOffset - 1;
        adjY += linkTextHeight - lineOffset;
        if (vAlign === 1 ) {
            if (linkTextHeight < h) {
                if (browser_mozilla) {
                    adjY = (h - textHeight) / 2 + 1;
                }
                else if (browser.msie) {
                    adjY = (h - textHeight) / 2 + 0.5;
                }
                else {
                    adjY = (h - textHeight) / 2;
                }
                if (Math_floor(adjY) !== adjY) {
                    adjY = adjY + 0.5;
                }
                adjY += linkTextHeight / 2 - lineOffset;
            }
        }
        else if (vAlign === 2 ) {
            adjY = h - textHeight - 2.5 - lineOffset;
        }
        if (ctx.textBaseline !== textBaseline) {
            ctx.textBaseline = textBaseline;
        }
        var verticalPosition = y + adjY;
        for (var i = 0; i < lineCount; i++) {
            ctx.fillText(lines[i], x + adjX, verticalPosition);
            var textLength = ctx.measureText(lines[i]).width;
            var textDecoration = style.textDecoration;
            if (textDecoration) {
                this._renderTextDecoration(ctx, textDecoration, x + adjX, verticalPosition, textLength, fontSize, baselineOffset);
            }
            verticalPosition += linkTextHeight;
        }
    };
    HyperLinkCellType.prototype._paintLinkUnderline = function (ctx, indent, x, y, w, h, style, options, lines) {
        var hAlign = style.hAlign, vAlign = style.vAlign, linkTextHeight = options.lineHeight, linkTextWidth;
        var lineCount = lines.length;
        var x1, x2, y1 = 0, y2 = 0, linkTextPosition, xSkew = 0, ySkew = 0;
        if (hAlign !== 2 ) {
            xSkew = 1;
        }
        if (style.vAlign === 2 ) {
            ySkew = -2.5;
        }
        ySkew -= Math_max(0, Math.round(linkTextHeight / 9) - 1);
        if (ctx.strokeStyle !== ctx.fillStyle) {
            ctx.strokeStyle = ctx.fillStyle;
        }
        var fontSize = options.fontInfo.fontSize, lineWidthTemp = Math_floor((fontSize - 12) / 21 + 1);
        ctx.lineWidth = lineWidthTemp;
        ctx.beginPath();
        for (var i = 0; i < lineCount; i++) {
            linkTextWidth = ctx.measureText(lines[i]).width;
            linkTextPosition = calcPosition(new Core_1.Rect(x, y, w, h), linkTextWidth, linkTextHeight * lineCount, hAlign, vAlign, indent);
            x1 = xSkew + x + linkTextPosition.x;
            x2 = x1 + linkTextWidth;
            y1 = ySkew + y + linkTextPosition.y + linkTextHeight;
            if (Math_floor(y1) === y1) {
                y1 = y1 + 0.5;
            }
            y2 = y1;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ySkew += linkTextHeight;
        }
    };
    HyperLinkCellType.prototype.paintValue = function (ctx, value, x, y, w, h, style, options) {
        var self = this;

        if (!ctx) {
            return;
        }

        var text = self.getText(value, options);
        if (isNullOrUndefined(text)) {
            return;
        }
        text = text + '';
        var textSegment = text.split(/\r\n|\r|\n/);
        var i = 0;
        while (i < textSegment.length) {
            textSegment[i] = textSegment[i].replace(/\s+/g, ' ');
            i++;
        }
        text = textSegment.join('\r\n');

        var visited = false;
        var modelManager = options.sheet._modelManager, row = options.row, col = options.col, sheetArea = options.sheetArea;
        var hyperlinkInfo = modelManager.getValueForKey(row, col, HYPERLINK_INFO, sheetArea);
        if (hyperlinkInfo) {
            if (self._id === hyperlinkInfo.id) {
                visited = hyperlinkInfo.visited;
            }
            else {
                modelManager.do('setValueForKey', row, col, HYPERLINK_INFO, undefined, sheetArea);
            }
        }
        ctx.save();
        ctx.beginPath();

        var fillStyle;
        if (visited) {
            fillStyle = self._visitedLinkColor;
        }
        else {
            fillStyle = self._linkColor;
        }
        if (fillStyle && ctx.fillStyle !== fillStyle) {
            ctx.fillStyle = fillStyle;
        }

        var font = style.font;
        if (font && ctx.font !== font) {
            Core_1._util._setContextFont(ctx, font);
        }
        var indent = getTextIndent(style);
        if (options.sheet.outlineColumn && options.sheet.outlineColumn._isOutlineColumn(options.col)) {
            indent = 0;
        }
        var wordWrap = style.wordWrap, lines = [], lineCount = 0, textHeight = 0;
        if (wordWrap) {
            var wordWrapWidth = w - 3 - indent;
            wordWrapWidth -= 1;
            lines = Core_1._WordWrapHelper._getWrapInfo(text, wordWrapWidth, font);
            lineCount = lines.length;
            if (lineCount > 1 && style.vAlign !== 0 ) {
                var linkTextHeight = options.lineHeight;
                textHeight = (lineCount - 1) * linkTextHeight;
            }
        }
        else {
            lines.push(text);
        }
        ctx.rect(x, y, w, h);
        ctx.clip();
        ctx.beginPath();

        self._paintLinkText(ctx, indent, x, y, w, h, style, options, lines, textHeight);


        self._paintLinkUnderline(ctx, indent, x, y, w, h, style, options, lines);

        ctx.restore();
    };

    HyperLinkCellType.prototype.getText = function (value, options) {
        return this._text || value;
    };
    HyperLinkCellType.prototype._triggerButtonClicked = function (sheet, row, col, sheetArea) {
        if (!sheet._startEditByKeydown) {
            var parent_1 = sheet.parent;
            if (parent_1) {
                parent_1._triggerButtonClicked(sheet, row, col, sheetArea);
            }
        }
    };
    HyperLinkCellType.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
        var self = this;
        if (context) {
            var sheetArea = context.sheetArea;
            if ((isNullOrUndefined(sheetArea) || sheetArea === 3 ) && cellStyle && cellRect) {
                return {
                    x: x,
                    y: y,
                    row: context.row,
                    col: context.col,
                    cellStyle: cellStyle,
                    cellRect: cellRect,
                    sheetArea: sheetArea,
                    isFocusAware: true,
                    sheet: context.sheet,
                    isReservedLocation: isHitHyperlink(x, y, cellStyle, cellRect, context, self._text)
                };
            }
        }
        return keyword_null;
    };
    HyperLinkCellType.prototype.processMouseDown = function (hitInfo) {
        var sheet = hitInfo && hitInfo.sheet, self = this;
        if (!sheet || sheet.isEditing()) {
            return;
        }
        if (hitInfo.isReservedLocation) {
            self._isMouseDownLink = true;
        }
    };
    HyperLinkCellType.prototype.processMouseUp = function (hitInfo) {
        var sheet = hitInfo && hitInfo.sheet;
        if (!sheet || sheet.isEditing()) {
            return;
        }
        var self = this;
        if (hitInfo.isReservedLocation && self._isMouseDownLink) {
            self._executeOnClickEvent(hitInfo);
        }
        self._isMouseDownLink = false;
    };
    HyperLinkCellType.prototype.processMouseMove = function (hitInfo) {
        var row = hitInfo.row, col = hitInfo.col, sheet = hitInfo.sheet, self = this;
        if (!sheet || sheet.isEditing() && sheet.getActiveRowIndex() === row && sheet.getActiveColumnIndex() === col) {
            return;
        }
        var canvas = sheet._getCanvas();
        if (hitInfo.isReservedLocation) {
            if (canvas) {
                self._showLinkToolTip(sheet, hitInfo);
                canvas.style.cursor = 'pointer';
            }
        }
        else {
            self._hideLinkToolTip(sheet);
            if (canvas) {
                canvas.style.cursor = cssDefault;
            }
        }
    };
    HyperLinkCellType.prototype.processMouseLeave = function (hitInfo) {
        var sheet = hitInfo.sheet, self = this;
        self._isMouseDownLink = false;
        self._hideLinkToolTip(sheet);
        if (sheet) {
            var canvas = sheet._getCanvas();
            if (canvas) {
                canvas.style.cursor = cssDefault;
            }
        }
        return;
    };
    HyperLinkCellType.prototype._showLinkToolTip = function (sheet, hitInfo) {
        var self = this;
        if (self._linkToolTip) {
            var tip = self._getLinkToolTipElement();
            var $tip = $(tip);
            $tip.text(self._linkToolTip);
            var offset = sheet._eventHandler._getCanvasPosition();
            var left = offset.left + hitInfo.x;
            var top_1 = offset.top + hitInfo.y + 20;
            if ($tip.parent().length === 0) {
                var host = sheet && sheet._getHost();
                if (host) {
                    host.insertBefore(tip, keyword_null);
                }
                $tip.css(cssTop, top_1).css(cssLeft, left);
            }
        }
    };
    HyperLinkCellType.prototype._hideLinkToolTip = function (sheet) {
        var self = this;
        if (self._linkToolTipElement) {
            var host = sheet && sheet._getHost();
            if (host && self._linkToolTipElement.parentElement === host) {
                _removeChild(host, self._linkToolTipElement);
            }
            self._linkToolTipElement = keyword_null;
        }
    };
    HyperLinkCellType.prototype._getLinkToolTipElement = function () {
        var self = this;
        if (!self._linkToolTipElement) {
            var div = _createElement(STR_DIV);
            $(div).css(cssPosition, cssAbsolute).css(cssMargin, 0).css(cssPadding, 2).css(cssBorder, '1px #c0c0c0 solid')
                .css('box-shadow', '1px 2px 5px rgba(0,0,0,0.4)').css(cssBoxSizing, cssContentBox)
                .css(cssBackgroundColor, cssWhite).css(cssFont, '9pt Arial');
            self._linkToolTipElement = div;
        }
        return self._linkToolTipElement;
    };
    HyperLinkCellType.prototype.isReservedKey = function (e, context) {
        return e.keyCode === 32 && !e.ctrlKey && !e.shiftKey && !e.altKey;
    };
    HyperLinkCellType.prototype.processKeyUp = function (event, context) {
        var sheet = context.sheet, self = this;
        if (!sheet) {
            return false;
        }
        self._executeOnClickEvent(context);
        return true;
    };
    HyperLinkCellType.prototype.getAutoFitWidth = function (value, text, cellStyle, zoomFactor, context) {
        return hyperlinkCellType_getAutoFitWidthOrHeight((this._text || value), cellStyle, zoomFactor, context, true);
    };
    HyperLinkCellType.prototype.getAutoFitHeight = function (value, text, cellStyle, zoomFactor, context) {
        return hyperlinkCellType_getAutoFitWidthOrHeight((this._text || value), cellStyle, zoomFactor, context);
    };
    HyperLinkCellType.prototype.isImeAware = function (context) {
        return false;
    };
    HyperLinkCellType.prototype._executeOnClickEvent = function (context) {
        var sheet = context && context.sheet;
        var self = this;
        var row = context.row, col = context.col, sheetArea = context.sheetArea;
        var action = self.onClickAction();
        action.call(this, context);
        sheet._modelManager.do('setValueForKey', row, col, HYPERLINK_INFO, { id: self._id, visited: true }, sheetArea);
        sheet.repaint(sheet.getCellRect(row, col));
        self._triggerButtonClicked(sheet, row, col, sheetArea);
    };


    HyperLinkCellType.prototype.onClickAction = function (fn) {
        if (arguments.length === 0) {
            return this._onAction;
        }
        if (fn) {
            this._onAction = fn;
        }
        return this;
    };
    HyperLinkCellType.prototype._fromOptions = function (options) {
        var json = {
            linkColor: options.linkColor,
            visitedLinkColor: options.visitedLinkColor,
            text: options.text,
            linkToolTip: options.linkToolTip,
            target: options.target && HyperLinkTargetType[options.target],
            activeOnClick: options.activeOnClick
        };
        this.fromJSON(json);
    };
    HyperLinkCellType.prototype.toJSON = function () {
        var self = this;
        var dataDic = { typeName: self.typeName }, currentValue;
        $_each(hyperLinkCellTypePropertyDict, function (p, v) {
            currentValue = self['_' + p];
            if (currentValue !== v) {
                dataDic[p] = currentValue;
            }
        });
        return dataDic;
    };
    HyperLinkCellType.prototype.fromJSON = function (settings) {
        var self = this;
        $_each(hyperLinkCellTypePropertyDict, function (p) {
            var jsonValue = settings[p];
            if (!isNullOrUndefined(jsonValue)) {
                self['_' + p] = jsonValue;
            }
        });
    };
    HyperLinkCellType.prototype._createCellTypeElement = function (context) {
        return;
    };
    HyperLinkCellType.prototype._cloneCellType = function () {
        var self = this, currentValue;
        var hCellType = new HyperLinkCellType();
        $_each(hyperLinkCellTypePropertyDict, function (p, v) {
            currentValue = self['_' + p];
            if (currentValue !== v) {
                hCellType['_' + p] = currentValue;
            }
        });
        hCellType._onAction = self._onAction;
        return hCellType;
    };
    return HyperLinkCellType;
}(BaseCellType));
exports.HyperLink = HyperLinkCellType;
function getTargetValue(targetType) {
    return ['_blank', '_self', '_parent', '_top'][targetType];
}
function calcPosition(cellRect, editorWidth, editorHeight, hAlign, vAlign, indent) {
    var x = 0;
    var y = 0;
    var width = cellRect.width;
    var height = cellRect.height;
    x = indent = indent || 0;
    if (hAlign === 1 ) {
        x = (width - editorWidth) / 2;
    }
    else if (hAlign === 2 ) {
        x = width - editorWidth - indent;
    }
    if (vAlign === 1 ) {
        y = (height - editorHeight) / 2;
    }
    else if (vAlign === 2 ) {
        y = height - editorHeight;
    }
    return { x: x, y: y };
}
function getLinkRectForAutoFit(text, hAlign, font, indent) {
    var ret = getLinkRect(text, font);
    var w = ret.width;
    w += (hAlign !== 1 && !isNullOrUndefined(indent)) === true ? indent : 0;
    ret.width = w;
    return ret;
}
function getLinkRectForIsHitTest(text, hAlign, vAlign, font, cellRect, indent) {
    var ret = getLinkRect(text, font);
    var p = calcPosition(cellRect, ret.width, ret.height, hAlign, vAlign, indent);
    ret.x = p.x;
    ret.y = p.y;
    return ret;
}
function getLinkRect(text, font) {
    var lineHeight = getFontHeight(font);
    var width = Math.max(0, Core_1._WordWrapHelper._measureText(text, font, true));
    var height = text.split(/\r\n|\r|\n/).length * lineHeight;
    return { x: 0, y: 0, width: width, height: height };
}
function isHitHyperlink(x, y, cellStyle, cellRect, context, text) {
    var sheet = context.sheet, render = sheet._render;
    if (isNullOrUndefined(cellStyle)) {
        return false;
    }
    if (!text) {
        var value = sheet.getValue(context.row, context.col, context.sheetArea);
        if (!isNullOrUndefined(value)) {
            text = value + '';
        }
    }
    if (!text) {
        return false;
    }
    cellRect = cellStyle.cellType._getContentRect(cellRect, cellStyle, sheet.zoom());
    text = text.replace(/\s+/g, ' ');
    var font = cellStyle && cellStyle.font ? cellStyle.font : render._getDefaultFont();

    font = render._getZoomFont(font);

    var lines = [text];
    var indent = getTextIndent(cellStyle);
    if (cellStyle.wordWrap) {
        lines = Core_1._WordWrapHelper._getWrapInfo(text, cellRect.width - 3 - indent, font);
        text = lines.join('\r\n');
    }
    var LinkRectDiv = getLinkRectForIsHitTest(text, cellStyle.hAlign, cellStyle.vAlign, font, cellRect, indent);
    var y2 = cellRect.y + LinkRectDiv.y;
    for (var i = 0; i < lines.length; i++) {
        var linkRect = getLinkRectForIsHitTest(lines[i], cellStyle.hAlign, cellStyle.vAlign, font, cellRect, indent);
        var x1 = cellRect.x + linkRect.x;
        var x2 = Math_min(x1 + linkRect.width, cellRect.x + cellRect.width);
        var y1 = y2;
        y2 = Math_min(y1 + linkRect.height, cellRect.y + cellRect.height);
        if (x1 <= x && x < x2 && y1 <= y && y < y2) {
            return true;
        }
    }
    return false;
}
function getTextIndent(style) {
    return (style.textIndent || 0) * 8;
}
function hyperlinkCellType_getAutoFitWidthOrHeight(actualText, cellStyle, zoomFactor, context, isWidth) {
    var sheet = context && context.sheet, rightOffset, leftOffset;
    if (sheet) {
        var render = sheet._render;
        var font = cellStyle.font || render._getDefaultFont();
        if (zoomFactor > 1) {
            font = render._getZoomFont(font);
        }
        var indent = getTextIndent(cellStyle);
        if (!cellStyle.wordWrap && !isWidth) {
            actualText = actualText.replace(/\s+/g, ' ');
        }
        else if (cellStyle.wordWrap) {
            var row = context.row, col = context.col, sheetArea = context.sheetArea;
            var columnWidth = 0;
            var span = sheet._modelManager.findSpan(row, col, sheetArea);
            if (span) {
                if (span.row >= row && span.rowCount <= 1 && span.col >= col && col === span.col) {
                    columnWidth = sheet._getZoomColumnWidth(col);
                    if (span.colCount > 1) {
                        for (var colIdx = (col + 1); colIdx < (col + span.colCount); colIdx++) {
                            columnWidth += sheet._getZoomColumnWidth(colIdx);
                        }
                    }
                }
            }
            else {
                columnWidth = sheet._getZoomColumnWidth(col);
            }
            rightOffset = getPositionOffset(cellStyle, 1);
            leftOffset = getPositionOffset(cellStyle, 3);
            if (leftOffset > 0) {
                columnWidth -= leftOffset;
            }
            if (rightOffset > 0) {
                columnWidth -= rightOffset;
            }
            var lines = Core_1._WordWrapHelper._getWrapInfo(actualText, columnWidth - 3 - indent, font);
            if (isWidth && actualText.split(/\r\n|\r|\n/).length > 1) {
                var width = 0;
                for (var i = 0; i < lines.length; i++) {
                    width = Math.max(width, getLinkRectForAutoFit(lines[i], cellStyle.hAlign, font, getTextIndent(cellStyle)).width);
                }
                return width;
            }
            else if (!isWidth) {
                actualText = lines.join('\r\n');
            }
        }
        var linkRect = getLinkRectForAutoFit(actualText, cellStyle.hAlign, font, getTextIndent(cellStyle));
        return isWidth ? linkRect.width : linkRect.height;
    }
    return 0;
}
$_each(hyperLinkCellTypePropertyDict, function (p) {
    HyperLinkCellType.prototype[p] = function (value) {
        if (arguments.length === 0) {
            return this['_' + p];
        }
        this['_' + p] = value;
        return this;
    };
});

Core_1.CellTypes._typeDict[8 ] = HyperLinkCellType;
/***/ }),

/***/ './dist/plugins/celltype/radiochecklistcelltype.js':
/*!*********************************************************!*\
  !*** ./dist/plugins/celltype/radiochecklistcelltype.js ***!
  \*********************************************************/
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
var cloneObj = Common_1.Common._Types._cloneObject;
var DateTimeHelper_toOADate = Common_1.Common._DateTimeHelper._toOADate;
var Math_floor = Math.floor, Math_max = Math.max, Math_ceil = Math.ceil, cssLeft = 'left', cssAlphabetic = 'alphabetic', keyword_null = null, keyword_undefined = undefined;
var isNullOrUndefined = Common_1.Common._Types._isNullOrUndefined;
var setContextFont = Core_1._util._setContextFont;
var BaseCellType = Core_1.CellTypes.Base;
var $ = Core_1.GC$, $_each = $.each;
var getFontHeight = Core_1._util._getFontHeight;
var STR_TEXT = 'text', STR_VALUE = 'value', const_string = 'string', const_number = 'number';
var DEFAULT_BOX_SIZE = 12;
function _hasOwnProperty(obj, p) {
    return obj.hasOwnProperty(p);
}
function isEquals(v1, v2) {
    if (v1 instanceof Date && v2 instanceof Date) {
        return DateTimeHelper_toOADate(v1) === DateTimeHelper_toOADate(v2);
    }
    else if (!isNullOrUndefined(v1) && !isNullOrUndefined(v2) && v1.toString && v2.toString) {
        return v1.toString() === v2.toString();
    }
    return v1 === v2;
}
function getCellOffsetArray(cellPadding) {
    var retArray = ['0', '0', '0', '0'];
    if (typeof cellPadding === const_string) {
        var offsetArray = cellPadding.split(' ', 4), length_1 = offsetArray.length, topOffset = void 0, rightOffset = void 0;
        if (length_1 === 1) {
            topOffset = offsetArray[0];
            retArray = [topOffset, topOffset, topOffset, topOffset];
        }
        else if (length_1 === 2) {
            topOffset = offsetArray[0];
            rightOffset = offsetArray[1];
            retArray = [topOffset, rightOffset, topOffset, rightOffset];
        }
        else if (length_1 === 3) {
            rightOffset = offsetArray[1];
            retArray = [offsetArray[0], rightOffset, offsetArray[2], rightOffset];
        }
        else if (length_1 === 4) {
            retArray = [offsetArray[0], offsetArray[1], offsetArray[2], offsetArray[3]];
        }
    }
    return retArray;
}


var Direction;
(function (Direction) {
    Direction[Direction['horizontal'] = 0] = 'horizontal';

    Direction[Direction['vertical'] = 1] = 'vertical';
})(Direction = exports.Direction || (exports.Direction = {}));


var TextAlign;
(function (TextAlign) {
    TextAlign[TextAlign['left'] = 2] = 'left';

    TextAlign[TextAlign['right'] = 3] = 'right';
})(TextAlign = exports.TextAlign || (exports.TextAlign = {}));

var radioCellTypePropertyDict = {
    items: keyword_null,
    direction: Direction.horizontal,
    maxColumnCount: 1,
    maxRowCount: 1,
    isFlowLayout: true,
    itemSpacing: {
        horizontal: 20,
        vertical: 5
    },
    textAlign: TextAlign.right,
    boxSize: DEFAULT_BOX_SIZE,
};
var _RadioCheckBaseCellType = (function (_super) {
    __extends(_RadioCheckBaseCellType, _super);
    function _RadioCheckBaseCellType() {
        var _this = _super.call(this) || this;
        _this.typeName = 11 + '';
        _this.defaultPadding = 5;
        var self = _this;
        $_each(radioCellTypePropertyDict, function (p, v) {
            if (p === 'items') {
                v = [];
            }
            self['_' + p] = v;
        });
        return _this;
    }
    _RadioCheckBaseCellType.prototype.paintValue = function (ctx, value, x, y, w, h, style, options) {
        var self = this;
        if (!ctx) {
            return;
        }
        ctx.save();
        ctx.rect(x + 1, y + 1, w - 2, h - 2);
        ctx.clip();
        ctx.beginPath();
        var textWidth = 0, textHeight = 0, sheet = options.sheet, zoomFactor = sheet.zoom(), styleFont = style.font;
        var isPrinting = options.isPrinting, printZoomFactor = options.printZoomFactor;
        if (isPrinting && typeof printZoomFactor === 'number' && printZoomFactor !== 1) {
            zoomFactor = printZoomFactor;
        }
        var currentBoxSize = getCurrentBoxSize(self._boxSize, styleFont, zoomFactor);
        var currentDefaultPadding = self.defaultPadding * zoomFactor;
        var radius = currentBoxSize / 2, rect = new Core_1.Rect(x + 1, y + 1, w - 2, h - 2);
        var _a = getCheckCount(self, sheet, style, w - 2, h - 2), rowCount = _a[0], colCount = _a[1];
        var checkBoxWidth = getCheckBoxWidth(self, sheet, style, rowCount, colCount);
        var checkBoxHeight = getCheckBoxHeight(self, sheet, style, rowCount, colCount);
        var itemsWidth = getItemWidth(self, sheet, style, rowCount, colCount);
        var itemHeight = getItemHeight(self, style);
        var startX = x + getCheckBoxLeft(style, rect, zoomFactor, checkBoxWidth), startY = y + getCheckBoxTop(style, rect, zoomFactor, checkBoxHeight);
        var font = style.font;
        if (font && ctx.font !== font) {
            setContextFont(ctx, options.fontInfo.font);
        }
        if (style.foreColor) {
            ctx.fillStyle = style.foreColor;
        }
        var textDecoration = style.textDecoration, fontSize = options.fontInfo.fontSize, baselineOffset = fontSize > 8 ? Math_floor((fontSize - 8) / 5 + 2) : 1,
        lineOffset = 0;
        textHeight = getFontHeight(style.font);
        lineOffset = textHeight / 2 - fontSize / 2 + baselineOffset - 1;
        var _startX = startX, _startY = startY;
        var textHorizontalOffset = 0;
        var iconHorizontalOffset = 0;
        if (fontSize > currentBoxSize) {
            textHorizontalOffset = self._getHorizontalOffset(currentBoxSize);
            iconHorizontalOffset = (itemHeight - lineOffset - DEFAULT_BOX_SIZE) / 2 + 1;
        }
        for (var i = 0; i < self._items.length; i++) {
            if (startX > x + w || startY > y + h) {
                continue;
            }
            var text = _hasOwnProperty(self._items[i], STR_TEXT) ? self._items[i].text : self._items[i];
            textWidth = sheet._getStringWidthByCanvas(text, style.font);
            ctx.textAlign = cssLeft;
            var textRataInWidth = (self._direction === Direction.vertical) ? itemsWidth[Math_floor(i / rowCount)] : itemsWidth[i % colCount];
            var offsetX = 0;
            if (self._textAlign === TextAlign.left) {
                self._drawText(ctx, self._items[i], value, textWidth, startX, startY + textHorizontalOffset, textRataInWidth, itemHeight, lineOffset);
                startX = startX + textRataInWidth + currentDefaultPadding;
                ctx.save();
                self._drawCheckIcon(ctx, value, self._items[i], startX, startY + iconHorizontalOffset, radius);
                ctx.restore();
                offsetX = currentBoxSize;
            }
            else {
                ctx.save();
                self._drawCheckIcon(ctx, value, self._items[i], startX, startY + iconHorizontalOffset, radius);
                startX = startX + currentBoxSize + currentDefaultPadding;
                ctx.restore();
                self._drawText(ctx, self._items[i], value, textWidth, startX, startY + textHorizontalOffset, textRataInWidth, itemHeight, lineOffset);
                offsetX = textRataInWidth;
            }
            if (textDecoration) {
                var padding = this._getPadding();
                self._renderTextDecoration(ctx, textDecoration, startX - ((self._textAlign === TextAlign.right) ? 0 : (textRataInWidth + currentDefaultPadding)) + padding.paddingLeft, startY + itemHeight - lineOffset - padding.paddingBottom, textWidth, fontSize, baselineOffset);
            }
            if (self._direction === Direction.vertical) {
                startY += Math_max(itemHeight, currentBoxSize) + self._itemSpacing.vertical * zoomFactor;
                if ((i + 1) % rowCount === 0) {
                    _startX = _startX + textRataInWidth + currentBoxSize + currentDefaultPadding + self._itemSpacing.horizontal * zoomFactor;
                    startY = y + getCheckBoxTop(style, rect, zoomFactor, checkBoxHeight);
                }
                startX = _startX;
            }
            else {
                startX = startX + offsetX + self._itemSpacing.horizontal * zoomFactor;
                if ((i + 1) % colCount === 0) {
                    startX = x + getCheckBoxLeft(style, rect, zoomFactor, checkBoxWidth);
                    _startY = _startY + Math_max(itemHeight, currentBoxSize) + self._itemSpacing.vertical * zoomFactor;
                }
                startY = _startY;
            }
        }
        ctx.restore();
    };
    _RadioCheckBaseCellType.prototype._getHorizontalOffset = function (currentBoxSize) {
        return (currentBoxSize - DEFAULT_BOX_SIZE) / 2;
    };
    _RadioCheckBaseCellType.prototype.getText = function (value, options) {
        return value;
    };
    _RadioCheckBaseCellType.prototype._drawText = function (ctx, item, value, textWidth, x, y, w, h, lineOffset) {
        var text = _hasOwnProperty(item, STR_TEXT) ? item.text : item;
        if (ctx.textBaseline !== cssAlphabetic) {
            ctx.textBaseline = cssAlphabetic;
        }
        ctx.fillText(text, x, y + h - lineOffset);
    };
    _RadioCheckBaseCellType.prototype.getItemsBound = function (sheet, row, col, sheetArea) {
        var self = this;
        var zoomFactor = sheet.zoom();
        var cellStyle = sheet.getActualStyle(row, col, sheetArea);
        var defaultFontInfo = Core_1._StyleHelper._scaleFont('11pt ' + sheet.currentTheme().bodyFont(), zoomFactor);
        var fontInfo = defaultFontInfo;
        if (cellStyle.font) {
            fontInfo = Core_1._StyleHelper._scaleFont(cellStyle.font, zoomFactor);
        }
        cellStyle.font = fontInfo.font;
        var rowViewportIndex = sheetArea === 1 ? -1 : undefined;
        var colViewportIndex = sheetArea === 2 ? -1 : undefined;
        var cellRect = sheet.getCellRect(row, col, rowViewportIndex, colViewportIndex);
        var w = cellRect.width, h = cellRect.height;
        var _a = getCheckCount(self, sheet, cellStyle, w - 1, h), rowCount = _a[0], colCount = _a[1];
        var itemWidth = getItemWidth(self, sheet, cellStyle, rowCount, colCount);
        var currentBoxSize = getCurrentBoxSize(self._boxSize, fontInfo.font, zoomFactor);
        var currentDefaultPadding = self.defaultPadding * zoomFactor;
        var textHeight = Math_max(getItemHeight(self, cellStyle), currentBoxSize);
        var checkBoxWidth = getCheckBoxWidth(self, sheet, cellStyle, rowCount, colCount);
        var checkBoxHeight = getCheckBoxHeight(self, sheet, cellStyle, rowCount, colCount);
        var left = getCheckBoxLeft(cellStyle, cellRect, zoomFactor, checkBoxWidth), top = getCheckBoxTop(cellStyle, cellRect, zoomFactor, checkBoxHeight);
        var result = [];
        var _loop_1 = function (i) {
            var text = _hasOwnProperty(self._items[i], STR_TEXT) ? self._items[i].text : self._items[i];
            var textWidth = sheet._getStringWidthByCanvas(text, cellStyle.font);
            var rowIndex = Math_floor(i / colCount);
            var colIndex = i % colCount;
            if (self._direction === Direction.vertical) {
                rowIndex = i % rowCount;
                colIndex = Math_floor(i / rowCount);
            }
            var rect = new Core_1.Rect();
            var rectX = 0;
            var widths = itemWidth.filter(function (s, index) { return index < colIndex; });
            widths.forEach(function (s) { rectX = rectX + s; });
            rect.x = left + rectX + colIndex * (currentBoxSize + currentDefaultPadding + self._itemSpacing.horizontal * zoomFactor) + cellRect.x;
            rect.y = top + rowIndex * textHeight + self._itemSpacing.vertical * zoomFactor * rowIndex + cellRect.y;
            var margin = self._getPadding();
            rect.width = ((self._textAlign === TextAlign.right && !margin.hasMagin) ? textWidth : itemWidth[colIndex]) + currentBoxSize + currentDefaultPadding;
            rect.height = textHeight;
            if (rect.x > cellRect.x + cellRect.width || rect.y > cellRect.y + cellRect.height) {
                result[i] = null;
            }
            else {
                result[i] = rect;
            }
        };
        for (var i = 0; i < self._items.length; i++) {
            _loop_1(i);
        }
        return result;
    };
    _RadioCheckBaseCellType.prototype._drawCheckIcon = function (ctx, value, item, x, y, iconSize) {
    };
    _RadioCheckBaseCellType.prototype._getPadding = function () {
        return {
            hasMagin: false,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0
        };
    };
    _RadioCheckBaseCellType.prototype.getAutoFitWidth = function (value, text, cellStyle, zoomFactor, context) {
        var sheet = context && context.sheet;
        var indent = getCellIndent(cellStyle);
        var _a = getCheckCount(this, sheet, cellStyle), rowCount = _a[0], colCount = _a[1];
        return (getCheckBoxWidth(this, sheet, cellStyle, rowCount, colCount) + indent) / sheet.zoom();
    };
    _RadioCheckBaseCellType.prototype.getAutoFitHeight = function (value, text, cellStyle, zoomFactor, context) {
        var sheet = context && context.sheet;
        var _a = getCheckCount(this, sheet, cellStyle), rowCount = _a[0], colCount = _a[1];
        return getCheckBoxHeight(this, sheet, cellStyle, rowCount, colCount) / sheet.zoom();
    };
    _RadioCheckBaseCellType.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
        var self = this;
        if (!context) {
            return keyword_null;
        }
        var sheetArea = context.sheetArea, sheet = context.sheet;
        cellRect = cellStyle.cellType._getContentRect(cellRect, cellStyle, sheet.zoom());
        if ((isNullOrUndefined(sheetArea) || sheetArea === 3 ) && cellRect) {
            var info = {
                x: x,
                y: y,
                row: context.row,
                col: context.col,
                cellStyle: cellStyle,
                cellRect: cellRect,
                sheetArea: sheetArea,
                sheet: sheet
            };

            var zoomFactor = sheet.zoom();
            if (cellStyle.font) {
                cellStyle.font = Core_1._StyleHelper._scaleFont(cellStyle.font, zoomFactor).font;
            }
            var _a = getCheckCount(self, sheet, cellStyle, cellRect.width - 1, cellRect.height - 2), rowCount = _a[0], colCount = _a[1];
            var checkBoxWidth = getCheckBoxWidth(self, sheet, cellStyle, rowCount, colCount);
            var checkBoxHeight = getCheckBoxHeight(self, sheet, cellStyle, rowCount, colCount);
            var left = cellRect.x + getCheckBoxLeft(cellStyle, cellRect, zoomFactor, checkBoxWidth);
            var top_1 = cellRect.y + getCheckBoxTop(cellStyle, cellRect, zoomFactor, checkBoxHeight);
            var rect = new Core_1.Rect(left, top_1, checkBoxWidth, checkBoxHeight);
            if (rect.contains(info.x, info.y)) {
                info.isReservedLocation = true;
            }
            return info;
        }
        return keyword_null;
    };
    _RadioCheckBaseCellType.prototype.processMouseDown = function (hitInfo) {
        if (!hitInfo) {
            return false;
        }
        if (hitInfo.isReservedLocation) {
            this._isMouseDownReservedLocation = true;
        }
    };
    _RadioCheckBaseCellType.prototype.processMouseLeave = function (hitInfo) {
        _super.prototype.processMouseLeave.call(this, hitInfo);
        if (!hitInfo) {
            return false;
        }
        this._isMouseDownReservedLocation = false;
    };
    _RadioCheckBaseCellType.prototype.processMouseUp = function (hitInfo) {
        if (!hitInfo) {
            return false;
        }
        var self = this;
        var sheet = hitInfo.sheet;
        if (self._isMouseDownReservedLocation && sheet && hitInfo.isReservedLocation) {
            self._isMouseDownReservedLocation = false;
            var row = hitInfo.row, col = hitInfo.col, sheetArea = hitInfo.sheetArea;
            var selectValue = getPositionItem(self, hitInfo);
            if (selectValue) {
                executeEditCellCommand(self, sheet, row, col, selectValue.value, sheetArea);
                return true;
            }
        }
        return false;
    };
    _RadioCheckBaseCellType.prototype._getNextState = function (oldValue, selectValue) {
        return getNextState(oldValue, selectValue, this._items, true);
    };
    _RadioCheckBaseCellType.prototype.triggerButtonClicked = function (sheet, row, col, sheetArea) {
        var parent = sheet.parent;
        if (parent) {
            parent._triggerButtonClicked(sheet, row, col, sheetArea);
        }
    };
    _RadioCheckBaseCellType.prototype._fromOptions = function (options) {
        var json = {
            items: options.items,
            direction: options.direction && Direction[options.direction],
            maxColumnCount: options.maxColumnCount,
            maxRowCount: options.maxRowCount,
            isFlowLayout: options.isFlowLayout,
            itemSpacing: options.itemSpacing,
            textAlign: options.textAlign && TextAlign[options.textAlign],
            boxSize: options.boxSize
        };
        this.fromJSON(json);
    };
    _RadioCheckBaseCellType.prototype.toJSON = function () {
        var self = this;
        var dataDic = { typeName: self.typeName }, currentValue;
        $_each(radioCellTypePropertyDict, function (p, v) {
            currentValue = self['_' + p];
            var isNotDefaultValue = p === 'items' ? currentValue && currentValue.length > 0 : currentValue !== v;
            if (isNotDefaultValue) {
                if (typeof currentValue === 'object') {
                    dataDic[p] = cloneObj(currentValue);
                }
                else {
                    dataDic[p] = currentValue;
                }
            }
        });
        return dataDic;
    };
    _RadioCheckBaseCellType.prototype.fromJSON = function (settings) {
        var self = this;
        $_each(radioCellTypePropertyDict, function (p) {
            var jsonValue = settings[p];
            if (!isNullOrUndefined(jsonValue)) {
                self['_' + p] = jsonValue;
            }
        });
    };
    return _RadioCheckBaseCellType;
}(BaseCellType));


var RadioButtonListCellType = (function (_super) {
    __extends(RadioButtonListCellType, _super);
    function RadioButtonListCellType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioButtonListCellType.prototype._drawCheckIcon = function (ctx, value, item, x, y, iconSize) {
        var itemValue = _hasOwnProperty(item, STR_VALUE) ? item.value : item;
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(x + iconSize, y + iconSize, iconSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc(x + iconSize, y + iconSize, iconSize, 0, 2 * Math.PI);
        ctx.stroke();
        if (value !== keyword_null && isEquals(value, itemValue)) {
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.arc(x + iconSize, y + iconSize, iconSize * 0.5, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.stroke();
        }
    };
    return RadioButtonListCellType;
}(_RadioCheckBaseCellType));
exports.RadioButtonList = RadioButtonListCellType;


var CheckBoxListCellType = (function (_super) {
    __extends(CheckBoxListCellType, _super);
    function CheckBoxListCellType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeName = 12 + '';
        return _this;
    }
    CheckBoxListCellType.prototype._drawCheckIcon = function (ctx, value, item, x, y, iconSize) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x + 0.5, y + 0.5, iconSize * 2 + 0.05, iconSize * 2 + 0.05);
        ctx.fillStyle = 'white';
        ctx.fillRect(x + 1, y + 1, iconSize * 2 - 1, iconSize * 2 - 1);
        var isMatch = matchValue(item, value);
        if (value !== keyword_null && isMatch) {
            ctx.beginPath();
            ctx.lineWidth = 2.5;
            ctx.moveTo(x + 3, y + iconSize);
            ctx.lineTo(x + iconSize, y + iconSize * 2 - 3.5);
            ctx.lineTo(x + iconSize * 2 - 1.5, y + 3);
            ctx.stroke();
        }
    };
    CheckBoxListCellType.prototype._getNextState = function (oldValue, selectValue) {
        return getNextState(oldValue, selectValue, this._items, false);
    };
    return CheckBoxListCellType;
}(_RadioCheckBaseCellType));
exports.CheckBoxList = CheckBoxListCellType;


var SelectionMode;
(function (SelectionMode) {
    SelectionMode[SelectionMode['single'] = 0] = 'single';

    SelectionMode[SelectionMode['multiple'] = 1] = 'multiple';
})(SelectionMode = exports.SelectionMode || (exports.SelectionMode = {}));

var buttonListCellTypePropertyDict = {
    selectedBackColor: 'rgb(227,119,0)',
    selectedForeColor: 'white',
    padding: '5',
    items: keyword_null,
    itemSpacing: {
        horizontal: 5,
        vertical: 5
    },
    selectionMode: SelectionMode.multiple,
};


var ButtonListCellType = (function (_super) {
    __extends(ButtonListCellType, _super);
    function ButtonListCellType() {
        var _this = _super.call(this) || this;
        _this.typeName = 13 + '';
        _this.defaultPadding = 0;
        var self = _this;
        $_each(buttonListCellTypePropertyDict, function (s, v) {
            if (s === 'items') {
                v = [];
            }
            self['_' + s] = v;
        });
        self._boxSize = 0;
        delete self.boxSize;
        return _this;
    }
    ButtonListCellType.prototype._drawText = function (ctx, item, value, textWidth, x, y, w, h, lineOffset) {
        ctx.save();
        ctx.beginPath();
        var isMatch = matchValue(item, value);
        var text = _hasOwnProperty(item, STR_TEXT) ? item.text : item;
        var backColor = this._selectedBackColor, foreColor = this._selectedForeColor;
        if (isMatch) {
            ctx.fillStyle = backColor;
            ctx.fillRect(x + 1, y + 1, w - 1, h - 1);
            ctx.fillStyle = foreColor;
        }
        ctx.textAlign = 'center';
        if (ctx.textBaseline !== cssAlphabetic) {
            ctx.textBaseline = cssAlphabetic;
        }
        var padding = this._getPadding();
        ctx.fillText(text, x + padding.paddingLeft + (w - padding.paddingLeft - padding.paddingRight) / 2, y + padding.paddingTop + h - padding.paddingTop - padding.paddingBottom - lineOffset);
        ctx.restore();
    };
    ButtonListCellType.prototype._getNextState = function (oldValue, selectValue) {
        return getNextState(oldValue, selectValue, this._items, this._selectionMode === SelectionMode.single);
    };
    ButtonListCellType.prototype._getPadding = function () {
        var top = 0, bottom = 0, left = 0, right = 0;
        if (this._padding) {
            var paddingArray = getCellOffsetArray(this._padding);
            top = parseInt(paddingArray[0], 10);
            top = (typeof top === const_number) && (top > 0) ? top : 0;
            right = parseInt(paddingArray[1], 10);
            right = (typeof right === const_number) && (right > 0) ? right : 0;
            bottom = parseInt(paddingArray[2], 10);
            bottom = (typeof bottom === const_number) && (bottom > 0) ? bottom : 0;
            left = parseInt(paddingArray[3], 10);
            left = (typeof left === const_number) && (left > 0) ? left : 0;
        }
        return {
            hasMagin: true,
            paddingTop: top,
            paddingBottom: bottom,
            paddingLeft: left,
            paddingRight: right
        };
    };
    ButtonListCellType.prototype._getHorizontalOffset = function (currentBoxSize) {
        return 0;
    };
    ButtonListCellType.prototype.toJSON = function () {
        var self = this, currentValue;
        var dataDic = _super.prototype.toJSON.call(this);
        $_each(buttonListCellTypePropertyDict, function (a, v) {
            currentValue = self['_' + a];
            var isNotDefaultValue = a === 'items' ? currentValue && currentValue.length > 0 : currentValue !== v;
            if (isNotDefaultValue) {
                if (typeof currentValue === 'object') {
                    dataDic[a] = cloneObj(currentValue);
                }
                else {
                    dataDic[a] = currentValue;
                }
            }
        });
        return dataDic;
    };
    ButtonListCellType.prototype.fromJSON = function (settings) {
        _super.prototype.fromJSON.call(this, settings);
        var self = this;
        $_each(buttonListCellTypePropertyDict, function (a) {
            var jsonValue = settings[a];
            if (!isNullOrUndefined(jsonValue)) {
                self['_' + a] = jsonValue;
            }
        });
    };
    return ButtonListCellType;
}(_RadioCheckBaseCellType));
exports.ButtonList = ButtonListCellType;
function executeEditCellCommand(cellType, sheet, row, col, selectValue, sheetArea) {
    var oldValue = sheet.getValue(row, col, sheetArea);
    var newValue = cellType._getNextState(oldValue, selectValue);
    var cellEditCmd = { cmd: 'editCell', sheetName: sheet.name(), row: row, col: col, newValue: newValue, autoFormat: true };
    sheet._commandManager().execute(cellEditCmd);
    cellType.triggerButtonClicked(sheet, row, col, sheetArea);
}
function getCheckBoxHeight(cellType, sheet, style, rowCount, colCount) {
    var zoomFactor = sheet.zoom();
    var currentBoxSize = getCurrentBoxSize(cellType._boxSize, style.font, zoomFactor);
    var textHeight = getItemHeight(cellType, style);
    var realHeight = Math_max(textHeight, currentBoxSize);
    var count = rowCount;
    if (cellType._items.length < rowCount) {
        count = cellType._items.length;
    }
    return realHeight * count + cellType._itemSpacing.vertical * zoomFactor * (count - 1);
}
function getCheckBoxWidth(cellType, sheet, style, rowCount, colCount) {
    var zoomFactor = sheet.zoom();
    var currentBoxSize = getCurrentBoxSize(cellType._boxSize, style.font, zoomFactor);
    var currentDefaultPadding = cellType.defaultPadding * zoomFactor;
    var result = getItemWidth(cellType, sheet, style, rowCount, colCount);
    var width = 0;
    result.forEach(function (s) { width += s; });
    width += colCount * (currentBoxSize + currentDefaultPadding) +
        (colCount - 1) * cellType._itemSpacing.horizontal * zoomFactor;
    return width;
}
function getItemWidth(cellType, sheet, style, rowCount, colCount) {
    var result = [];
    for (var i = 0; i < cellType._items.length; i++) {
        var text = _hasOwnProperty(cellType._items[i], STR_TEXT) ? cellType._items[i].text : cellType._items[i];
        var textWidth = sheet._getStringWidthByCanvas(text, style.font);
        var margin = cellType._getPadding();
        if (margin.hasMagin) {
            textWidth = textWidth + margin.paddingLeft + margin.paddingRight;
        }
        var index = Math_floor(i % colCount);
        if (cellType._direction === Direction.vertical) {
            index = Math_floor(i / rowCount);
        }
        if (result[index] === keyword_undefined) {
            result[index] = textWidth;
        }
        else {
            result[index] = Math.max(result[index], textWidth);
        }
    }
    return result;
}
function getCurrentBoxSize(boxSize, font, zoomFactor) {
    var result = DEFAULT_BOX_SIZE * zoomFactor;
    if (typeof boxSize === 'number' && boxSize >= 0) {
        result = boxSize * zoomFactor;
    }
    else if (boxSize === 'auto') {
        result = getFontHeight(font) / 2;
    }
    return result;
}
function getItemHeight(cellType, style) {
    var textHeight = getFontHeight(style.font);
    var margin = cellType._getPadding();
    if (margin.hasMagin) {
        textHeight = textHeight + margin.paddingTop + margin.paddingBottom;
    }
    return textHeight;
}
function getCheckBoxLeft(cellStyle, cellRect, zoomFactor, itemWidth) {
    var indent = getCellIndent(cellStyle) * zoomFactor;
    var startX = indent;
    if (cellStyle.hAlign === 1 ) {
        startX = (cellRect.width - itemWidth) / 2;
    }
    else if (cellStyle.hAlign === 2 ) {
        startX = cellRect.width - indent - itemWidth;
    }
    return startX;
}
function getCheckBoxTop(cellStyle, cellRect, zoomFactor, itemHeight) {
    var indent = 2 * zoomFactor;
    var startY = indent;
    if (cellStyle.vAlign === 1 ) {
        if ((cellRect.height - indent) > itemHeight) {
            startY = (cellRect.height - itemHeight - indent) / 2 + indent;
        }
    }
    else if (cellStyle.vAlign === 2 ) {
        startY = cellRect.height - itemHeight - indent;
    }
    return startY;
}
function getCheckCount(cellType, sheet, style, w, h) {
    if (cellType._direction === Direction.vertical) {
        if (cellType._isFlowLayout) {
            if (h !== keyword_undefined) {
                var rowCount = cellType._items.length;
                while (rowCount > 0) {
                    var height = getCheckBoxHeight(cellType, sheet, style, rowCount, Math_ceil(cellType._items.length / rowCount));
                    if (height > h) {
                        rowCount = rowCount - 1;
                    }
                    else {
                        rowCount = Math_max(rowCount, 1);
                        return [rowCount, Math_ceil(cellType._items.length / rowCount)];
                    }
                }
            }
            return [cellType._items.length, 1];
        }
        else {
            var rowCount = Math_max(1, cellType._maxRowCount);
            return [rowCount, Math_ceil(cellType._items.length / rowCount)];
        }
    }
    else {
        if (cellType._isFlowLayout) {
            if (w !== keyword_undefined) {
                var colCount = cellType._items.length;
                while (colCount > 0) {
                    var width = getCheckBoxWidth(cellType, sheet, style, Math_ceil(cellType._items.length / colCount), colCount);
                    if (width > w) {
                        colCount = colCount - 1;
                    }
                    else {
                        colCount = Math_max(colCount, 1);
                        return [Math_ceil(cellType._items.length / colCount), colCount];
                    }
                }
            }
            return [1, cellType._items.length];
        }
        else {
            var colCount = Math_max(1, cellType._maxColumnCount);
            return [Math_ceil(cellType._items.length / colCount), colCount];
        }
    }
}
function getCellIndent(cellStyle) {
    var textIndent = cellStyle.textIndent;
    if (cellStyle.hAlign === 1 || textIndent === 0 || textIndent === keyword_null || textIndent === keyword_undefined) {
        return 2;
    }
    return textIndent * 8;
}
function getPositionItem(cellType, hitInfo) {
    var w = hitInfo.cellRect.width, h = hitInfo.cellRect.height;
    var sheet = hitInfo.sheet;
    var zoomFactor = sheet.zoom();
    var style = sheet.getStyle(hitInfo.row, hitInfo.col), font = style && style.font;
    var _a = getCheckCount(cellType, hitInfo.sheet, hitInfo.cellStyle, w - 1, h), rowCount = _a[0], colCount = _a[1];
    var itemWidth = getItemWidth(cellType, hitInfo.sheet, hitInfo.cellStyle, rowCount, colCount);
    var currentBoxSize = getCurrentBoxSize(cellType._boxSize, font, zoomFactor);
    var currentDefaultPadding = cellType.defaultPadding * zoomFactor;
    var textHeight = Math_max(getItemHeight(cellType, hitInfo.cellStyle), currentBoxSize);
    var checkBoxWidth = getCheckBoxWidth(cellType, sheet, hitInfo.cellStyle, rowCount, colCount);
    var checkBoxHeight = getCheckBoxHeight(cellType, sheet, hitInfo.cellStyle, rowCount, colCount);
    var left = getCheckBoxLeft(hitInfo.cellStyle, hitInfo.cellRect, zoomFactor, checkBoxWidth), top = getCheckBoxTop(hitInfo.cellStyle, hitInfo.cellRect, zoomFactor, checkBoxHeight);
    var _loop_2 = function (i) {
        var text = _hasOwnProperty(cellType._items[i], STR_TEXT) ? cellType._items[i].text : cellType._items[i];
        var textWidth = sheet._getStringWidthByCanvas(text, hitInfo.cellStyle.font);
        var rowIndex = Math_floor(i / colCount);
        var colIndex = i % colCount;
        if (cellType._direction === Direction.vertical) {
            rowIndex = i % rowCount;
            colIndex = Math_floor(i / rowCount);
        }
        var rect = new Core_1.Rect();
        var rectX = 0;
        var widths = itemWidth.filter(function (s, index) { return index < colIndex; });
        widths.forEach(function (s) { rectX = rectX + s; });
        rect.x = left + rectX + colIndex * (currentBoxSize + currentDefaultPadding + cellType._itemSpacing.horizontal * zoomFactor);
        rect.y = top + rowIndex * textHeight + cellType._itemSpacing.vertical * zoomFactor * rowIndex;
        var margin = cellType._getPadding();
        rect.width = ((cellType._textAlign === TextAlign.right && !margin.hasMagin) ? textWidth : itemWidth[colIndex]) + currentBoxSize + currentDefaultPadding;
        rect.height = textHeight;
        var offX = hitInfo.x - hitInfo.cellRect.x;
        var offY = hitInfo.y - hitInfo.cellRect.y;
        if (rect && rect.contains(offX, offY)) {
            return { value: { value: _hasOwnProperty(cellType._items[i], STR_VALUE) ? cellType._items[i].value : cellType._items[i] } };
        }
    };
    for (var i = 0; i < cellType._items.length; i++) {
        var state_1 = _loop_2(i);
        if (typeof state_1 === 'object')
            return state_1.value;
    }
}
function matchValue(item, value) {
    var isMatch = false;
    var itemValue = _hasOwnProperty(item, STR_VALUE) ? item.value : item;
    if (value !== keyword_null) {
        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                if (isEquals(value[i], itemValue)) {
                    isMatch = true;
                    break;
                }
            }
        }
        else {
            isMatch = isEquals(value, itemValue);
        }
    }
    return isMatch;
}
function getNextState(oldValue, selectValue, items, isSingle) {
    if (isSingle) {
        return selectValue;
    }
    else {
        if (oldValue === keyword_null) {
            oldValue = [];
        }
        if (!Array.isArray(oldValue)) {
            oldValue = [oldValue];
        }
        var valueMap_1 = {};
        items.forEach(function (item) {
            valueMap_1[_hasOwnProperty(item, STR_VALUE) ? item.value : item] = true;
        });
        for (var i = oldValue.length - 1; i >= 0; i--) {
            if (!valueMap_1[oldValue[i]]) {
                oldValue.splice(i, 1);
            }
        }
        var newValue_1 = oldValue.slice();
        var index = newValue_1.indexOf(selectValue);
        if (index === -1) {
            newValue_1.push(selectValue);
        }
        else {
            for (var i = newValue_1.length - 1; i >= 0; i--) {
                if (isEquals(newValue_1[i], selectValue)) {
                    newValue_1.splice(i, 1);
                }
            }
        }
        var orderedNewValue_1 = [];
        items.forEach(function (item) {
            if (newValue_1.indexOf(item.value) !== -1) {
                orderedNewValue_1.push(item.value);
            }
        });
        return orderedNewValue_1;
    }
}
$_each(radioCellTypePropertyDict, function (p) {
    _RadioCheckBaseCellType.prototype[p] = function (value) {
        var para = '_' + p;
        var self = this;
        if (arguments.length === 0) {
            return self[para];
        }
        if (p === 'items') {
            var newValue = [];
            for (var i = 0; i < value.length; i++) {
                var v = value[i];
                if (!isNullOrUndefined(v.text) && !isNullOrUndefined(v.value)) {
                    newValue.push(v);
                }
                else if (!isNullOrUndefined(v.text)) {
                    v.value = v.text;
                    newValue.push(v);
                }
                else if (!isNullOrUndefined(v.value)) {
                    v.text = v.value;
                    newValue.push(v);
                }
                else if (!isNullOrUndefined(v) && typeof v !== 'object') {
                    newValue.push({ text: v, value: v });
                }
            }
            value = newValue;
        }
        if (p === 'itemSpacing') {
            var oldValue = self[para];
            self[para] = { horizontal: oldValue.horizontal, vertical: oldValue.vertical };
            if (!isNullOrUndefined(value.horizontal)) {
                var horizontal = parseInt(value.horizontal, 10);
                if (!isNaN(horizontal)) {
                    self[para].horizontal = horizontal;
                }
            }
            if (!isNullOrUndefined(value.vertical)) {
                var vertical = parseInt(value.vertical, 10);
                if (!isNaN(vertical)) {
                    self[para].vertical = vertical;
                }
            }
        }
        else if (p === 'boxSize') {
            if (isNullOrUndefined(value)) {
                return self[para];
            }
            if (typeof value === 'number' && value >= 0) {
                self[para] = value;
            }
            if (value === 'auto') {
                self[para] = value;
            }
        }
        else {
            self[para] = value;
        }
        return self;
    };
});
Core_1.CellTypes._typeDict[11 ] = RadioButtonListCellType;
Core_1.CellTypes._typeDict[12 ] = CheckBoxListCellType;
$_each(buttonListCellTypePropertyDict, function (p) {
    ButtonListCellType.prototype[p] = function (v) {
        var para = '_' + p;
        var self = this;
        if (arguments.length === 0) {
            return self[para];
        }
        if (p === 'items') {
            var newValue = [];
            for (var i = 0; i < v.length; i++) {
                var value = v[i];
                if (!isNullOrUndefined(value.text) && !isNullOrUndefined(value.value)) {
                    newValue.push(value);
                }
                else if (!isNullOrUndefined(value.text)) {
                    value.value = value.text;
                    newValue.push(value);
                }
                else if (!isNullOrUndefined(value.value)) {
                    value.text = value.value;
                    newValue.push(value);
                }
                else if (!isNullOrUndefined(value) && typeof value !== 'object') {
                    newValue.push({ text: value, value: value });
                }
            }
            v = newValue;
        }
        if (p === 'itemSpacing') {
            var oldValue = self[para];
            self[para] = { horizontal: oldValue.horizontal, vertical: oldValue.vertical };
            if (!isNullOrUndefined(v.horizontal)) {
                var horizontal = parseInt(v.horizontal, 10);
                if (!isNaN(horizontal)) {
                    self[para].horizontal = horizontal;
                }
            }
            if (!isNullOrUndefined(v.vertical)) {
                var vertical = parseInt(v.vertical, 10);
                if (!isNaN(vertical)) {
                    self[para].vertical = vertical;
                }
            }
        }
        else {
            self[para] = v;
        }
        return self;
    };
});
Core_1.CellTypes._typeDict[13 ] = ButtonListCellType;
/***/ }),

/***/ './dist/plugins/celltype/rangecelltype.js':
/*!************************************************!*\
  !*** ./dist/plugins/celltype/rangecelltype.js ***!
  \************************************************/
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


var Bindings_1 = __webpack_require__(/*! Bindings */ 'Bindings');
var Sparkline_1 = __webpack_require__(/*! Sparkline */ 'Sparkline');
var CalcEngine_1 = __webpack_require__(/*! CalcEngine */ 'CalcEngine');
var SheetsCalc_1 = __webpack_require__(/*! SheetsCalc */ 'SheetsCalc');
var BaseCellType = Core_1.CellTypes.Base;
var CellTypeContext = Core_1.CellTypes.Context;
var keyword_null = null, Math_floor = Math.floor;
function _cloneSizeInfo(arr) {
    return arr.map(function (item) {
        return {
            start: item.start,
            size: item.size
        };
    });
}
var TemplateLayoutBuilder = (function () {
    function TemplateLayoutBuilder() {
        this._baseRow = 0;
        this._baseCol = 0;
        this._rowCount = 0;
        this._colCount = 0;
    }
    TemplateLayoutBuilder.prototype._initialize = function (sheet, range) {
        var self = this, row = range.row, col = range.col, rowCount = range.rowCount, colCount = range.colCount;
        self._baseRow = row;
        self._baseCol = col;
        self._rowCount = rowCount;
        self._colCount = colCount;
        self._spans = self._getSpans(sheet, range);
        self._layoutModule = self._createLayoutModule(sheet, range);
        return self;
    };
    TemplateLayoutBuilder.prototype._getLayoutModule = function () {
        return this._layoutModule;
    };

    TemplateLayoutBuilder.prototype._createLayoutModule = function (sheet, range) {
        var self = this, row = range.row, col = range.col, rowCount = range.rowCount, colCount = range.colCount;

        var totalWidth = 0, widthList = [], totalHeight = 0, heightList = [], temp = 0;
        var lastRow = row + rowCount, latsCol = col + colCount;
        for (var i = row; i < lastRow; i++) {
            temp = sheet.getRowHeight(i);
            totalHeight += temp;
            heightList.push(temp);
        }
        for (var k = col; k < latsCol; k++) {
            temp = sheet.getColumnWidth(k);
            totalWidth += temp;
            widthList.push(temp);
        }
        temp = 0;
        var rowSize = heightList.map(function (item) {
            var start = temp / totalHeight, size = item / totalHeight;
            temp += item;
            return { start: start, size: size };
        });
        temp = 0;
        var colSize = widthList.map(function (item) {
            var start = temp / totalWidth, size = item / totalWidth;
            temp += item;
            return { start: start, size: size };
        });

        var spans = self._getSpans(sheet, range);
        var cellStyleList = self._getCellStyleList(sheet, range, spans, rowSize, colSize);
        var sparklines = self._getSparklines(sheet, range);
        return {
            rowCount: rowCount,
            colCount: colCount,
            rowSize: rowSize,
            colSize: colSize,
            cellStyleList: cellStyleList,
            sparklines: sparklines,
            totalHeight: totalHeight,
            totalWidth: totalWidth
        };
    };
    TemplateLayoutBuilder.prototype._getCellInsideSpan = function (row, col, baseRow, baseCol, spans) {
        var insideSpan = null;
        for (var _i = 0, spans_1 = spans; _i < spans_1.length; _i++) {
            var span = spans_1[_i];
            var rowOffset = span.rowOffset, colOffset = span.colOffset, rowCount = span.rowCount, colCount = span.colCount;
            var range = new Core_1.Range(rowOffset + baseRow, colOffset + baseCol, rowCount, colCount);
            if (range.contains(row, col)) {
                insideSpan = span;
                break;
            }
        }
        return insideSpan;
    };
    TemplateLayoutBuilder.prototype._getSpanRelativeSize = function (span, rowSize, colSize) {
        var _a = [0, 0], width = _a[0], height = _a[1];
        var rowOffset = span.rowOffset, colOffset = span.colOffset, rowCount = span.rowCount, colCount = span.colCount;
        var endRow = rowOffset + rowCount, endCol = colOffset + colCount;
        for (var i = rowOffset; i < endRow; i++) {
            height += rowSize[i] ? rowSize[i].size : 0;
        }
        for (var i = colOffset; i < endCol; i++) {
            width += colSize[i] ? colSize[i].size : 0;
        }
        return {
            width: width,
            height: height
        };
    };

    TemplateLayoutBuilder.prototype._getCellStyleList = function (sheet, range, spans, rowSize, colSize) {
        var row = range.row, col = range.col, rowCount = range.rowCount, colCount = range.colCount;
        var rs = [];
        for (var i = row; i < row + rowCount; i++) {
            var temp = [];
            for (var j = col; j < col + colCount; j++) {
                var isInsideInfo = this._getCellInsideSpan(i, j, row, col, spans);
                if (isInsideInfo && isInsideInfo.rowOffset + row === i && isInsideInfo.colOffset + col === j) {
                    var spanRelativeSize = this._getSpanRelativeSize(isInsideInfo, rowSize, colSize);
                    temp.push({
                        style: sheet.getActualStyle(i, j, 3, true ),
                        spanWidth: spanRelativeSize.width,
                        spanHeight: spanRelativeSize.height,
                        isSpan: true,
                        span: isInsideInfo
                    });
                }
                else if (!isInsideInfo) {
                    temp.push({
                        style: sheet.getActualStyle(i, j, 3, true )
                    });
                }
                else {
                    temp.push({
                        style: sheet.getActualStyle(i, j, 3, true ),
                        isSpan: true,
                    });
                }
            }
            rs.push(temp);
        }
        return rs;
    };
    TemplateLayoutBuilder.prototype._getSpans = function (sheet, range) {
        var spans = sheet._modelManager.getSpans(), templateSpan = [];
        var row = range.row, col = range.col, rowCount = range.rowCount, colCount = range.colCount;
        for (var _i = 0, spans_2 = spans; _i < spans_2.length; _i++) {
            var span = spans_2[_i];

            if (span.intersect(row, col, rowCount, colCount)) {
                templateSpan.push({
                    rowOffset: span.row - row,
                    colOffset: span.col - col,
                    rowCount: span.rowCount,
                    colCount: span.colCount
                });
            }
        }
        return templateSpan;
    };
    TemplateLayoutBuilder.prototype._getSparklines = function (sheet, range) {
        var baseRow = range.row, baseCol = range.col, colCount = range.colCount, rowCount = range.rowCount, dataInfo = [];
        for (var i = baseRow; i < baseRow + rowCount; i++) {
            var temp = [];
            for (var j = baseCol; j < baseCol + colCount; j++) {
                var sp = sheet.getSparkline(i, j);
                if (sp) {
                    temp.push(sp.clone());
                }
                else {
                    temp.push(null);
                }
            }
            dataInfo.push(temp);
        }

        return dataInfo;
    };
    TemplateLayoutBuilder.prototype.toJSON = function () {
        var _a = this._getLayoutModule(), rowCount = _a.rowCount, colCount = _a.colCount, rowSize = _a.rowSize, colSize = _a.colSize, cellStyleList = _a.cellStyleList, sparklines = _a.sparklines, totalWidth = _a.totalWidth, totalHeight = _a.totalHeight;
        var _rowSize = _cloneSizeInfo(rowSize);
        var _colSize = _cloneSizeInfo(colSize);
        var _cellStyleList = cellStyleList.map(function (item) {
            return item.map(function (data) {
                if (data) {
                    var style = data.style, spanWidth = data.spanWidth, spanHeight = data.spanHeight, isSpan = data.isSpan, span = data.span;
                    return {
                        style: style.toJSON(),
                        spanWidth: spanWidth,
                        spanHeight: spanHeight,
                        isSpan: isSpan,
                        span: span
                    };
                }
                else {
                    return null;
                }
            });
        });
        var _sparklines = sparklines.map(function (item) {
            return item.map(function (data) {
                if (data) {
                    return {
                        sparklineType: data.sparklineType(),
                        sp: data.toJSON(),
                        setting: data.setting().toJSON()
                    };
                }
            });
        });
        return {
            rowCount: rowCount,
            colCount: colCount,
            rowSize: _rowSize,
            colSize: _colSize,
            cellStyleList: _cellStyleList,
            sparklines: _sparklines,
            totalWidth: totalWidth,
            totalHeight: totalHeight
        };
    };
    TemplateLayoutBuilder.prototype.fromJSON = function (setting) {
        if (setting) {
            var rowCount = setting.rowCount, colCount = setting.colCount, rowSize = setting.rowSize, colSize = setting.colSize, cellStyleList = setting.cellStyleList, sparklines = setting.sparklines, totalWidth = setting.totalWidth, totalHeight = setting.totalHeight;
            var _rowSize = _cloneSizeInfo(rowSize);
            var _colSize = _cloneSizeInfo(colSize);
            var _cellStyleList = cellStyleList.map(function (item) {
                return item.map(function (data) {
                    if (data) {
                        var style = data.style, spanWidth = data.spanWidth, spanHeight = data.spanHeight, isSpan = data.isSpan, span = data.span;
                        var styleJson = null;
                        if (style) {
                            styleJson = new Core_1.Style();
                            styleJson.fromJSON(style);
                        }
                        return {
                            style: styleJson,
                            spanWidth: spanWidth,
                            spanHeight: spanHeight,
                            span: span,
                            isSpan: isSpan
                        };
                    }
                    else {
                        return null;
                    }
                });
            });
            var _sparklines = sparklines.map(function (item) {
                return item.map(function (data) {
                    if (data) {
                        var sp = new Sparkline_1.Sparkline(), spSetting = new Sparkline_1.SparklineSetting(data.setting);
                        sp.fromJSON(data.sp);
                        sp.setting(spSetting);
                        sp.sparklineType(data.sparklineType);
                        return sp;
                    }
                });
            });
            this._layoutModule = {
                rowCount: rowCount,
                colCount: colCount,
                rowSize: _rowSize,
                colSize: _colSize,
                cellStyleList: _cellStyleList,
                sparklines: _sparklines,
                totalWidth: totalWidth,
                totalHeight: totalHeight
            };
        }
    };
    TemplateLayoutBuilder.prototype._dispose = function () {
        this._layoutModule = null;
    };
    return TemplateLayoutBuilder;
}());
exports._TemplateLayoutBuilder = TemplateLayoutBuilder;
var TemplateDataResolve = (function () {
    function TemplateDataResolve() {
    }
    TemplateDataResolve.prototype._initialize = function (sheet, range, isFromCameraShape) {
        var self = this;

        self._range = range;
        self._souceSheet = new Core_1.Worksheet();


        self._allowDynamicArray = sheet.parent && sheet.parent.options.allowDynamicArray;

        if (self._souceSheet.getCalcService) {
            self._souceSheet.getCalcService().allowDynamicArray = self._allowDynamicArray;

            self._dynamicArraySpilleRanges = self._getDynamicArraySpilleRange(sheet);
        }
        self._initSourceSheet(sheet, isFromCameraShape);
        return self;
    };
    TemplateDataResolve.prototype._getDynamicArraySpilleRange = function (sheet) {
        var _a = this._range, baseRow = _a.row, baseCol = _a.col, baseColCount = _a.colCount, baseRowCount = _a.rowCount, dataInfo = [];
        var calcModel = sheet._getCalcModel && sheet._getCalcModel();
        for (var i = baseRow; i < baseRow + baseRowCount; i++) {
            for (var j = baseCol; j < baseCol + baseColCount; j++) {
                var formula = sheet.getFormula(i, j);
                if (formula) {
                    var arrayInfo = calcModel && calcModel._getArrayInfo(i, j);
                    if (arrayInfo && arrayInfo.isDynamicArray) {
                        var row = arrayInfo.row, col = arrayInfo.col, rowCount = arrayInfo.rowCount, colCount = arrayInfo.colCount;
                        if (rowCount > 1) {
                            dataInfo.push({ row: row + 1, col: col, rowCount: rowCount - 1, colCount: colCount });
                        }
                        if (colCount > 1) {
                            dataInfo.push({ row: row, col: col + 1, rowCount: 1, colCount: colCount - 1 });
                        }
                    }
                }
            }
        }
        return dataInfo;
    };

    TemplateDataResolve.prototype._clearDynamicArrayRanges = function () {
        var self = this, ranges = self._dynamicArraySpilleRanges, sheet = this._souceSheet;
        for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
            var _a = ranges_1[_i], row = _a.row, col = _a.col, rowCount = _a.rowCount, colCount = _a.colCount;
            sheet.clear(row, col, rowCount, colCount, 3 , 1 );
        }
    };
    TemplateDataResolve.prototype._setData = function (data) {
        var sheet = this._souceSheet;
        sheet.suspendEvent();
        var source = new Bindings_1.CellBindingSource(data);
        this._clearDynamicArrayRanges();
        sheet.setDataSource(source);
        sheet.resumeEvent();
    };
    TemplateDataResolve.prototype._initSourceSheet = function (sheet, isFromCameraShape) {
        var self = this, sourceSheet = self._souceSheet;

        var jsonData = sheet.toJSON({ includeBindingSource: true, ignoreFormula: !!isFromCameraShape });


        delete jsonData.charts;
        delete jsonData.shapes;

        sourceSheet.fromJSON(JSON.parse(JSON.stringify(jsonData)));


        this._initHighlightStyleList();
    };
    TemplateDataResolve.prototype._initHighlightStyleList = function () {
        var self = this;
        var _a = self._range, baserow = _a.row, baseCol = _a.col, colCount = _a.colCount, rowCount = _a.rowCount, dataInfo = [];
        var highlightStyleList = [], tempList = [];
        for (var i = baserow; i < baserow + rowCount; i++) {
            tempList = [];
            for (var j = baseCol; j < baseCol + colCount; j++) {
                tempList.push(self._getDataValidationHighlightStyle(i, j, 3));
            }
            highlightStyleList.push(tempList);
        }
        this._highlightStyleList = highlightStyleList;
    };
    TemplateDataResolve.prototype._getBase = function () {
        var _a = this._range, baseRow = _a.row, baseCol = _a.col;
        return {
            baseRow: baseRow,
            baseCol: baseCol
        };
    };
    TemplateDataResolve.prototype._getDataStruct = function (isNeedHighlightInvalid) {
        var sheet = this._souceSheet, _a = this._range, baserow = _a.row, baseCol = _a.col, colCount = _a.colCount, rowCount = _a.rowCount, dataInfo = [];
        for (var i = baserow; i < baserow + rowCount; i++) {
            var temp = [], formatStyle = void 0, validStyle = void 0;
            for (var j = baseCol; j < baseCol + colCount; j++) {
                var text = sheet.getText(i, j), value = sheet.getValue(i, j, 3 , 1 );
                var bindingPath = sheet.getBindingPath(i, j);
                formatStyle = this._getConditionFormatStyle(i, j, 3);
                validStyle = this._getDataValidationRenderingStyle(sheet, i, j, value, isNeedHighlightInvalid);
                temp.push({
                    value: value,
                    formatStyle: formatStyle,
                    text: text,
                    validStyle: validStyle,
                    bindingPath: bindingPath,
                });
            }
            dataInfo.push(temp);
        }

        return dataInfo;
    };
    TemplateDataResolve.prototype._getDataValidationHighlightStyle = function (row, column, sheetArea) {
        var validations = this._souceSheet._validations;
        if (validations) {
            var validator = this._souceSheet.getDataValidator(row, column, sheetArea);
            if (validator) {
                return validator.highlightStyle();
            }
        }
        return null;
    };
    TemplateDataResolve.prototype._getDataValidationRenderingStyle = function (sheet, row, column, value, isNeedHighlightInvalid) {
        if (isNeedHighlightInvalid && !(sheet.isValid ? sheet.isValid(row, column, value) : true)) {
            var _a = this._range, baseRow = _a.row, baseCol = _a.col;
            return this._highlightStyleList[row - baseRow][column - baseCol];
        }
        return null;
    };
    TemplateDataResolve.prototype._getConditionFormatStyle = function (row, column, sheetArea) {
        var conditionalFormats = this._souceSheet.conditionalFormats;
        if (conditionalFormats) {
            return conditionalFormats._applyFormats(new Core_1.Style(), row, column, sheetArea);
        }
        return null;
    };
    TemplateDataResolve.prototype.getCellValueInfo = function (sheet) {
        var _a = this._range, baserow = _a.row, baseCol = _a.col, colCount = _a.colCount, rowCount = _a.rowCount, dataInfo = [];
        var modelManager = sheet._modelManager;

        for (var i = baserow; i < baserow + rowCount; i++) {
            var temp = [];
            for (var j = baseCol; j < baseCol + colCount; j++) {
                temp.push({
                    bindPath: sheet.getBindingPath(i, j),
                    formula: sheet.getFormula(i, j),
                    value: modelManager.getValue(i, j, 3 , keyword_null, 1 )
                });
            }
            dataInfo.push(temp);
        }

        return dataInfo;
    };
    TemplateDataResolve.prototype.setValueToDataStruct = function (row, col, value, dataStruct) {
        if (!dataStruct[row]) {
            dataStruct[row] = {};
        }
        dataStruct[row][col] = value;
    };


    TemplateDataResolve.prototype.toJSON = function () {
        var sheet = this._souceSheet;


        var allowDynamicArray = this._allowDynamicArray;
        var spillRanges = this._dynamicArraySpilleRanges.map(function (_a) {
            var row = _a.row, col = _a.col, rowCount = _a.rowCount, colCount = _a.colCount;
            return { row: row, col: col, rowCount: rowCount, colCount: colCount };
        });
        var _a = this._range, baseRow = _a.row, baseCol = _a.col, baseRowCount = _a.rowCount, baseColCount = _a.colCount;
        return {
            spillRangs: spillRanges,
            allowDynamicArray: allowDynamicArray,
            range: { row: baseRow, col: baseCol, rowCount: baseRowCount, colCount: baseColCount },
            templatejson: JSON.stringify(sheet.toJSON({ includeBindingSource: true }))
        };
    };
    TemplateDataResolve.prototype.fromJSON = function (setting) {
        if (setting) {
            var self_1 = this;
            var sourceSheet = self_1._souceSheet = new Core_1.Worksheet();
            sourceSheet.suspendCalcService && sourceSheet.suspendCalcService();
            self_1._dynamicArraySpilleRanges = setting.spillRangs;
            self_1._allowDynamicArray = setting.allowDynamicArray;
            if (sourceSheet.getCalcService) {
                sourceSheet.getCalcService().allowDynamicArray = self_1._allowDynamicArray;
            }
            sourceSheet.fromJSON(JSON.parse(setting.templatejson));
            self_1._clearDynamicArrayRanges();
            var _a = setting.range, row = _a.row, col = _a.col, rowCount = _a.rowCount, colCount = _a.colCount;
            self_1._range = new Core_1.Range(row, col, rowCount, colCount);
            this._initHighlightStyleList();
            sourceSheet.resumeCalcService && sourceSheet.resumeCalcService();
        }
    };


    TemplateDataResolve.prototype._dispose = function () {
        this._souceSheet._dispose();
        this._souceSheet = null;
        this._range = null;
    };
    return TemplateDataResolve;
}());
exports._TemplateDataResolve = TemplateDataResolve;
var RangeTemplate = (function (_super) {
    __extends(RangeTemplate, _super);


    function RangeTemplate(sheet, row, col, rowCount, colCount) {
        var _this = _super.call(this) || this;
        _this.allowOverflow = false;
        _this.typeName = 16 + '';
        var range;
        if (arguments.length === 1) {
            range = new Core_1.Range(0, 0, sheet.getRowCount(), sheet.getColumnCount());
        }
        else {
            range = new Core_1.Range(row, col, rowCount, colCount);
        }
        if (sheet && range) {
            _this._layout = new TemplateLayoutBuilder()._initialize(sheet, range);
            _this._resolvor = new TemplateDataResolve()._initialize(sheet, range);
        }
        return _this;
    }
    RangeTemplate.prototype.getAutoFitWidth = function () {
        return this._layout._layoutModule.totalWidth;
    };
    RangeTemplate.prototype.getAutoFitHeight = function () {
        return this._layout._layoutModule.totalHeight;
    };
    RangeTemplate.prototype.updateTemplate = function (sheet, range) {
        if (sheet && range) {
            this._layout._initialize(sheet, range);
            this._resolvor._initialize(sheet, range);
        }
    };
    RangeTemplate.prototype.paintContent = function (ctx, data, x, y, width, height, style, options) {
        var resolvor = this._resolvor, layout = this._layout;
        if (resolvor && layout) {
            var layoutModule = this._layout._getLayoutModule();
            if (style.cellPadding) {
                options.needTopGridline = true;
                options.needLeftGridline = true;
            }
            paintRangeTemplate(ctx, { x: x, y: y, width: width, height: height }, data, options, resolvor, layoutModule);
        }
    };
    RangeTemplate.prototype.toJSON = function () {
        return {
            typeName: this.typeName,
            layout: this._layout.toJSON(),
            resolvor: this._resolvor.toJSON()
        };
    };
    RangeTemplate.prototype.fromJSON = function (setting) {
        if (setting.layout) {
            this._layout = new TemplateLayoutBuilder();
            this._layout.fromJSON(setting.layout);
        }
        if (setting.resolvor) {
            this._resolvor = new TemplateDataResolve();
            this._resolvor.fromJSON(setting.resolvor);
        }
    };
    return RangeTemplate;
}(BaseCellType));
exports.RangeTemplate = RangeTemplate;
Core_1.CellTypes._typeDict[16 ] = RangeTemplate;


function paintRangeTemplate(ctx, rect, data, options, resolvor, layoutModule, fontZoomFactor) {
    if (fontZoomFactor === void 0) { fontZoomFactor = 1; }
    var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
    var sheet = options.sheet, sheetArea = options.sheetArea, isPrinting = options.isPrinting, needTopGridline = options.needTopGridline, needLeftGridline = options.needLeftGridline, paintingCellsCollection = [], validationUIModel = [];
    var isNeedHighlightInvalid = true, sparklineExCollections = [];
    var imageLoader = sheet._getImageLoader();
    var rowCount = layoutModule.rowCount, colCount = layoutModule.colCount, rowSize = layoutModule.rowSize, colSize = layoutModule.colSize, cellStyleList = layoutModule.cellStyleList, sparklines = layoutModule.sparklines;
    resolvor._setData(data);
    var _a = resolvor._getBase(), baseRow = _a.baseRow, baseCol = _a.baseCol;
    var sourceSheet = resolvor._souceSheet, currentTheme = sourceSheet._currentTheme;
    sourceSheet._setBounds(new Core_1.Rect(0, 0, width, height));
    var border = new Core_1._Borders(sourceSheet, sourceSheet._getRowLayout(1, 3 ), sourceSheet._getColumnLayout(1, 3 ), 3 );
    var dataStruct = resolvor._getDataStruct(isNeedHighlightInvalid);
    y += 1;
    height -= 1;
    x += 1;
    width -= 1;
    var offsetX = 0, offsetY = 0;
    rowSize = rowSize.map(function (item) {
        var size = item.size * height, floorSize = Math_floor(size);
        offsetY += size - floorSize;
        if (offsetY >= 1) {
            floorSize++;
            offsetY--;
        }
        return {
            start: Math_floor(item.start * height),
            size: floorSize
        };
    });
    colSize = colSize.map(function (item) {
        var size = item.size * width, floorSize = Math_floor(size);
        offsetX += size - floorSize;
        if (offsetX >= 1) {
            floorSize++;
            offsetX--;
        }
        return {
            start: Math_floor(item.start * width),
            size: floorSize
        };
    });
    var conditionalFormats = sourceSheet.conditionalFormats;

    for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < colCount; j++) {
            if (cellStyleList[i][j]) {
                var _b = cellStyleList[i][j], style = _b.style, isSpan = _b.isSpan, span = _b.span;
                var isShowSparklineEx = false, tempData = dataStruct[i][j];
                if (isSpan && !span) {
                    continue;
                }
                style = style.clone(true);
                var _x = Math_floor(x + colSize[j].start), _y = Math_floor(y + rowSize[i].start);
                var endCol = void 0, endRow = void 0, spanColCount = isSpan ? span.colCount : 1, spanRowCount = isSpan ? span.rowCount : 1;
                if (colSize[j + spanColCount]) {
                    endCol = colSize[j + spanColCount].start;
                }
                else {
                    endCol = width;
                }
                var _width = Math_floor(endCol - colSize[j].start);
                if (rowSize[i + spanRowCount]) {
                    endRow = rowSize[i + spanRowCount].start;
                }
                else {
                    endRow = height;
                }
                var _height = Math_floor(endRow - rowSize[i].start);
                if (tempData.formatStyle) {
                    tempData.formatStyle._compose(style);
                    style = tempData.formatStyle;
                }
                style._normalize(currentTheme);
                var cellLayout = keyword_null;
                if (isSpan) {
                    cellLayout = {
                        row: i,
                        col: j,
                        x: Math_floor(_x),
                        y: Math_floor(_y),
                        width: Math_floor(_width),
                        height: Math_floor(_height),
                        rowCount: spanRowCount,
                        colCount: spanColCount
                    };
                    var rowSizes = {}, colSizes = {}, styleList = [];
                    var spanColIndex = void 0, spanRowIndex = void 0, sumColWidth = 0, sumRowHeight = 0;
                    for (spanColIndex = 0; spanColIndex < spanColCount - 1; spanColIndex++) {
                        var currentColSize = colSize[j + spanColIndex], size = currentColSize ? currentColSize.size : 0;
                        colSizes[spanColIndex] = size;
                        sumColWidth += size;
                    }
                    colSizes[spanColIndex] = Math_floor(_width) - sumColWidth;
                    for (spanRowIndex = 0; spanRowIndex < spanRowCount - 1; spanRowIndex++) {
                        var currentRowSize = rowSize[i + spanRowIndex], size = currentRowSize ? currentRowSize.size : 0;
                        rowSizes[spanRowIndex] = size;
                        sumRowHeight += size;
                    }
                    rowSizes[spanRowIndex] = Math_floor(_height) - sumRowHeight;
                    for (spanRowIndex = 0; spanRowIndex < spanRowCount; spanRowIndex++) {
                        var temp = [];
                        for (var k = 0; k < spanColCount; k++) {
                            if (cellStyleList[spanRowIndex + i] && cellStyleList[spanRowIndex + i][j + k]) {
                                temp.push(cellStyleList[spanRowIndex + i][j + k].style);
                            }
                        }
                        styleList.push(temp);
                    }
                    cellLayout.spanSizeInfo = {
                        styleList: styleList,
                        rowSizes: rowSizes,
                        colSizes: colSizes,
                    };
                }
                border._addCellLines(i, j, Math_floor(_x), Math_floor(_y), Math_floor(_width), Math_floor(_height), style, cellLayout, needTopGridline && i === 0, needLeftGridline && j === 0);


                var name_1 = style.formatter;
                if (name_1 && Core_1.util._isFormatString(name_1)) {
                    var formatStringExpression = sheet.parent && sheet.parent._getFormatStringCustomName(name_1);
                    if (formatStringExpression) {
                        var expression = formatStringExpression.getExpression();
                        if (expression) {
                            var formulaResult = SheetsCalc_1.evaluateFormula(sheet, name_1.replace('@', JSON.stringify(tempData.value)));
                            if (!(formulaResult instanceof CalcEngine_1.CalcError)) {
                                tempData.value = formulaResult;
                            }
                        }
                    }
                }
                var sparkline = null;
                if (sparklines[i][j]) {
                    sparkline = sparklines[i][j].clone();
                    if (sparkline) {
                        sparkline._dataSheetName = sourceSheet.name();
                        sparkline._paintValues = sparkline._getPaintValues(sourceSheet);
                        sparkline._paintDateValues = sparkline._getPaintDateValues(sourceSheet);
                        sparkline._rangeTmeplateRenderingSheet = sourceSheet;
                    }
                }

                if (tempData && tempData.value && tempData.value.typeName === 'SparklineExValue') {
                    sparklineExCollections.push({
                        value: tempData.value,
                        x: _x,
                        y: _y,
                        width: _width,
                        height: _height,
                        option: options
                    });
                    isShowSparklineEx = true;
                }
                if (tempData.validStyle) {
                    validationUIModel.push({
                        style: tempData.validStyle,
                        x: _x,
                        y: _y,
                        width: _width,
                        height: _height
                    });
                }
                paintingCellsCollection.push({
                    data: !isShowSparklineEx ? tempData.value : null,
                    row: i,
                    col: j,
                    x: _x,
                    y: _y,
                    width: _width,
                    height: _height,
                    style: style,
                    sparkline: sparkline,
                    baseRow: i + baseRow,
                    baseCol: j + baseCol,
                    conditionalFormats: conditionalFormats,
                    imageLoader: imageLoader,
                    cellLayout: {
                        row: i,
                        col: j,
                        x: _x,
                        y: _y,
                        width: _width,
                        height: _height
                    }
                });
            }
        }
    }
    ctx.save();
    if (needTopGridline) {
        y = y - 2;
        height = height + 4;
    }
    if (needLeftGridline) {
        x = x - 2;
        width = width + 4;
    }
    ctx.rect(x, y, width, height);
    ctx.clip();
    if (paintingCellsCollection.length > 0) {
        sourceSheet._render._paintCells(ctx, paintingCellsCollection, sheetArea, isPrinting, 1, sheet, baseRow, baseCol, fontZoomFactor);
    }
    border.paint(ctx);
    if (validationUIModel.length > 0) {
        sourceSheet._render._paintValidationUI(ctx, validationUIModel);
    }
    ctx.restore();
    for (var i = 0; i < sparklineExCollections.length; i++) {
        var _c = sparklineExCollections[i], value = _c.value, sparklineX = _c.x, sparklineY = _c.y, sparklineWidth = _c.width, sparklineHeight = _c.height, option = _c.option;
        CellTypeContext._paintSparklineEx(ctx, value, sparklineX, sparklineY, sparklineWidth, sparklineHeight, option);
    }
}
exports.paintRangeTemplate = paintRangeTemplate;
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

/***/ 'Bindings':
/*!********************************************!*\
  !*** external "GC.Spread.Sheets.Bindings" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.Sheets.Bindings;
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
/***/ }),

/***/ 'Sparkline':
/*!**********************************************!*\
  !*** external "GC.Spread.Sheets.Sparklines" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {
module.exports = GC.Spread.Sheets.Sparklines;
/***/ })

/******/ });
return GC;
};
//# sourceMappingURL=gc.spread.sheets.celltypes.14.2.5.js.map