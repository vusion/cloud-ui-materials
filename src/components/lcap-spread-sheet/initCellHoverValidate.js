import Vue from 'vue';

import GC from '@spread';

import Demo from './demo.vue';
import timerObj from './timer';
import { getTagKeys } from './utils';
import { getSelectedWidget } from './widget.util';
import { widgetValidator } from './customWidgetDataValidator';
import { getTableByRowCol } from './table';
import consts from './consts';

export const tooltipMap = {};

export function clearTooltipMap() {
    Object.keys(tooltipMap).forEach((key) => delete tooltipMap[key]);
}

export const tooltipWrapperClass = 'tooltipWrapper';

export function getTooltipWrapper() {
    let tooltipWrapper = document.querySelector('.' + tooltipWrapperClass);
    if (!tooltipWrapper) {
        tooltipWrapper = document.createElement('div');
        tooltipWrapper.className = tooltipWrapperClass;
        document.body.append(tooltipWrapper);
    }
    return tooltipWrapper;
}

export function getTooltip(tooltipClassName, visible, options = {}) {
    return new Promise((resolve, rej) => {
        const { onClick, onMouseEnter, onMouseLeave, trigger = 'hover', forceUpdate = false, extraClassName } = options;
        let tooltip;
        const tooltipSelector = '.' + tooltipClassName;
        if (options.multiple) {
            tooltip = document.querySelectorAll(tooltipSelector);
        } else {
            tooltip = tooltipMap[tooltipClassName];
        }
        if (!visible) {
            return resolve(tooltip);
        }
        if (!tooltip || forceUpdate) {
            let tooltipOuter;
            if (tooltip) {
                tooltipOuter = tooltip.parentNode;
            } else {
                const tooltipWrapper = getTooltipWrapper();
                tooltipOuter = document.createElement('div');
                tooltipWrapper.appendChild(tooltipOuter);
            }
            const app = new Vue({
                ...Demo,
            });
            app.$mount(tooltipOuter);
            app.$el.className = 'errTooltip';

            // ReactDOM.render(<CellTooltip trigger={trigger} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={tooltipClassName} extraClassName={extraClassName} />, tooltipOuter);
            setTimeout(() => {
                tooltipMap[tooltipClassName] = document.querySelector(tooltipSelector);
                resolve(tooltipMap[tooltipClassName]);
            }, 0);
        } else {
            resolve(tooltipMap[tooltipClassName]);
        }
    });
}

const defaultSettings = {
    placement: 'right',
    multiple: false,
    trigger: 'hover',
};

/**
 * @param {boolean} visible
 * @param {string} tooltipClassName
 * @param {string | Node} content
 * @param {Object} options {placement-cellRct | position, multiple, trigger: 'hover' | 'click'}
 */
export function toggleCellTooltip(visible, tooltipClassName, content, options = {}) {
    options = { ...defaultSettings, ...options };
    getTooltip(tooltipClassName, visible, options).then((tooltip) => {
        if (!tooltip || (options.multiple && !tooltip.length))
            return;
        let top = 0;
        let left = 0;
        if ((visible && !content) || !visible) {
            if (tooltip.length) {
                tooltip.forEach((item) => {
                    item.classList.remove('tooltip-active');
                    item.style.display = '';
                });
            } else {
                tooltip.classList.remove('tooltip-active');
                tooltip.style.display = '';
            }
            return;
        }
        if (!tooltip.innerHTML || options.forceUpdate) {
            if (typeof content === 'string') {
                tooltip.innerHTML = content;
            } else if (content instanceof Node) {
                tooltip.replaceChildren(content);
            }
        }
        tooltip.classList.add('tooltip-active');
        if (options.position) {
            top = options.position.y;
            left = options.position.x;
        } else {
            const elementRect = tooltip.getBoundingClientRect();
            // let clientSize = {
            //   width: window.innerWidth,
            //   height: window.innerHeight
            // };
            // let toolTipParentRect = tooltip.parentNode.getBoundingClientRect();
            const { cellRect } = options;
            switch (options.placement) {
                case 'top':
                    top = cellRect.y - elementRect.height;
                    left = cellRect.x;
                    break;
                case 'right':
                    top = cellRect.y;
                    left = cellRect.x + cellRect.width;
                    break;
                case 'bottom':
                    top = cellRect.y + cellRect.height;
                    left = cellRect.x;
                    break;
                case 'left':
                    top = cellRect.y;
                    left = cellRect.x - elementRect.width;
                    break;
                default:
                    break;
            }
            // if (left + elementRect.width + toolTipParentRect.x > clientSize.width) {
            //   left = cellRect.x - elementRect.width;
            // }
            // if (top + elementRect.height + toolTipParentRect.y > clientSize.height) {
            //   top = cellRect.y - elementRect.height;
            // }
        }
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
    });
}

export function validField(sheet, row, col) {
    let tag = sheet.getTag(row, col);
    if (!tag || !tag.tablesMap || !getTagKeys(tag.tablesMap).length) {
        let table;
        // table的tag存储在表头
        if (table = sheet.tables.find(row, col)) {
            tag = sheet.getTag(table._row, col);
        }
    }
    if (tag && tag.tablesMap && getTagKeys(tag.tablesMap).length) {
        if (!sheet.isValid(row, col, sheet.getValue(row, col))) {
            return {
                valid: false,
                message: sheet.getDataValidator(row, col).errorMessage(),
            };
        }
    }
    return {
        valid: true,
        message: '',
    };
}

export function validateWidgetAndField(sheet, row, col, options = { ignoreBlank: true }) {
    const value = sheet.getValue(row, col);
    const widget = getSelectedWidget(sheet.getCellType(row, col));
    // 优先校验控件
    if (widget) {
        const result = widgetValidator(widget.settings, value, widget.type, {
            ignoreBlank: options.ignoreBlank,
        });
        if (!result.valid) {
            return {
                visible: true,
                message: result.message,
            };
        }
    } else {
        // 校验字段类型
        const fieldValidInfo = validField(sheet, row, col);
        if (!fieldValidInfo.valid) {
            return {
                visible: true,
                message: fieldValidInfo.message,
            };
        }
    }
    return {
        visible: false,
        message: '',
    };
}

/**
 * 处理动态表的校验规则hover错误提示（动态错误提示）
 * 比如设置了Sheet1!C3>10，hover动态表的第二行时需要显示Sheet1!C4>10
 */
function dynamicErrorContent(sheet, dynamicTable, dv, exp, errorRow) {
    const conditionRanges = dv.condition().ranges();
    const sheetName = sheet.name();
    let hasBeenReplaced = false;
    let message;
    // 如果动态表的校验器范围行数小于等于1行，不需要做动态message处理
    if (conditionRanges && conditionRanges.length && conditionRanges[0].rowCount > 1) {
        const formulaRanges = GC.Spread.Sheets.CalcEngine.formulaToRanges(sheet, exp, 0, 0);
        formulaRanges.forEach((item) => {
            if (item.sheetName === sheetName) {
                // 公式的值范围在动态表表头一行范围内，则进行替换message
                item.ranges.forEach((range) => {
                    if (range.row === dynamicTable.startRow()
                        && (range.col + range.colCount - 1) >= dynamicTable.startColumn()
                        && (range.col + range.colCount - 1) <= dynamicTable.endColumn()
                    ) {
                        const prevFormula = GC.Spread.Sheets.CalcEngine.rangeToFormula(range, 0, 0, 15);
                        range.row = errorRow;
                        const currentFormula = GC.Spread.Sheets.CalcEngine.rangeToFormula(range, 0, 0, 15);
                        exp = exp.replace(`${sheetName}!${prevFormula}`, `${sheetName}!${currentFormula}`);
                        hasBeenReplaced = true;
                    }
                });
            }
        });
    }
    if (hasBeenReplaced) {
        message = consts.formulaErrorPrefix + exp;
    }
    return {
        hasBeenReplaced,
        message,
    };
}

export function validateRule(sheet, row, col) {
    let submitValid = {
        visible: false,
        message: '',
    };
    const validator = sheet.getDataValidator(row, col, GC.Spread.Sheets.SheetArea.viewport);
    if (validator && validator.type() === GC.Spread.Sheets.DataValidation.CriteriaType.custom) {
        const formula = validator.condition()._formula;
        let dynamicTable;
        if (formula) {
            if (formula === 'isTypeError') {
                const message = validator.errorMessage();
                if (message) {
                    submitValid = {
                        visible: true,
                        message,
                    };
                }
                // eslint-disable-next-line no-cond-assign
            } else if (dynamicTable = getTableByRowCol(sheet, row, col)) {
                const dv = sheet.getDataValidator(row, col);
                // 动态表是通过校验器
                if (!sheet.isValid(row, col, sheet.getValue(row, col)) && dv) {
                    let message = dv.errorMessage();
                    const exp = message.replace(consts.formulaErrorPrefix, '');
                    if (exp) {
                        const result = dynamicErrorContent(sheet, dynamicTable, dv, exp, row);
                        if (result.hasBeenReplaced) {
                            message = result.message;
                        }
                    }
                    submitValid = {
                        visible: true,
                        message,
                    };
                }
            } else {
                const validate = GC.Spread.Sheets.CalcEngine.evaluateFormula(sheet, formula, 0, 0);
                if (validate !== true) {
                    const message = validator.errorMessage();
                    if (message) {
                        submitValid = {
                            visible: true,
                            message,
                        };
                    }
                }
            }
        }
    }
    return submitValid;
}

// hover单元格进行校验 报错提示
export const processCellHoverErrorTip = function ({ row, col, sheet, sheetArea }, container, options = { ignoreBlank: true }) {
    timerObj.clearAll();
    if (options.forceHide) {
        toggleCellTooltip(false, container);
    }
    timerObj.start('cellTooltip', () => {
        if (sheetArea === 3) {
            const widgetAndFieldValid = validateWidgetAndField(sheet, row, col, { ignoreBlank: options.ignoreBlank });
            const ruleValid = validateRule(sheet, row, col);
            if (widgetAndFieldValid.visible || ruleValid.visible) {
                let errMessages = [widgetAndFieldValid.message, ruleValid.message].filter((item) => item);
                errMessages = Array.from(new Set(errMessages));
                const innerHTML = errMessages.map((v, i) => `<div key=${i}>${i + 1}:${v}</div>`).join('');
                const cellRect = sheet.getCellRect(row, col);
                toggleCellTooltip(true, container, innerHTML, { placement: 'right', cellRect, forceUpdate: true });
            } else {
                toggleCellTooltip(false, container);
            }
        } else {
            toggleCellTooltip(true, container);
        }
        timerObj.clear('cellTooltip');
    }, 150);
};

export default function initCellHoverValidate(workbook, options = {
    ignoreBlank: true,
}) {
    if (workbook && (options.isImport || options.readonly)) {
        const errTooltipClassName = 'errTooltip';
        workbook.unbind('CellHover');
        workbook.bind('CellHover', (_sender, args) => {
            const { row, col, sheet, sheetArea } = args;
            processCellHoverErrorTip({ row, col, sheet, sheetArea }, errTooltipClassName, { ignoreBlank: options.ignoreBlank });
        });
        workbook.unbind('EditStarting');
        workbook.bind('EditStarting', (_sender, args) => {
            processCellHoverErrorTip({}, errTooltipClassName, { forceHide: true });
        });
    }
}
