import consts from './consts';
import { getActualRange, traverseCellRange } from './utils';

/**
 * 字体和背景颜色
 * @param {*} sheet
 * @param {*} method
 * @param {*} value
 */
export function setColor(sheet, method, value, workbook) {
    const commandManager = workbook.commandManager();
    const sels = sheet.getSelections();
    commandManager.execute({
        cmd: 'setColor',
        sheetName: sheet.name(),
        sheet,
        method,
        value,
        sels,
    });
}

/**
* @param {GCTYPE.Spread.Sheets.Worksheet} [sheet]
*/
export function getStyle(key, style, sheet) {
    let styleEle = document.createElement('span');
    const defaultStyle = sheet.getDefaultStyle();
    if (!style.font) {
        style.font = defaultStyle.font || consts.defaultFont;
    }
    styleEle.style.font = style.font;
    const result = styleEle.style[key];
    styleEle = null;
    return result;
}

export function setBorderlines(sheet, borderType, borderStyle, borderColor, workbook) {
    const commandManager = workbook.commandManager();
    const sels = sheet.getSelections();
    commandManager.execute({
        cmd: 'setBorderlines',
        sheetName: sheet.name(),
        sheet,
        borderType,
        borderStyle,
        borderColor,
        sels,
    });
}
/**
 * 字体装饰，下划线等
 * @param {*} sheet
 * @param {*} flag
 */
export function setTextDecoration(sheet, flag, workbook) {
    const commandManager = workbook.commandManager();
    const sels = sheet.getSelections();
    commandManager.execute({
        cmd: 'setTextDecoration',
        sheetName: sheet.name(),
        sheet,
        flag,
        sels,
    });
}

/**
 * 字体样式（粗细 大小等）
 * @param {*} sheet
 * @param {*} prop
 * @param {*} isLabelStyle
 * @param {*} optionValue1
 * @param {*} optionValue2
 */
export function setStyleFont(sheet, prop, isLabelStyle, optionValue1, optionValue2, workbook) {
    const commandManager = workbook.commandManager();
    const selections = sheet.getSelections();
    commandManager.execute({
        cmd: 'setStyle',
        sheetName: sheet.name(),
        sheet,
        prop,
        isLabelStyle,
        optionValue1,
        optionValue2,
        selections,
    });
}
/**
 * 对齐
 * @param {*} sheet
 * @param {*} type
 * @param {*} value
 */
export function setAlignment(sheet, type, value, workbook) {
    const commandManager = workbook.commandManager();
    const sels = sheet.getSelections();
    commandManager.execute({
        cmd: 'setAlignment',
        sheetName: sheet.name(),
        sheet,
        type,
        value,
        sels,
    });
}

/**
 * 合并单元格
 * @param {GCTYPE.Spread.Sheets.Worksheet} sheet
 * @param {GCTYPE.Spread.Sheets.Workbook} workbook
 */
export function mergeCells(sheet, workbook, cb) {
    const range = getActualRange(sheet, sheet.getSelections()[0]);
    const sels = sheet.getSelections();
    let cellsWithValue = 0;
    try {
        traverseCellRange(range, (row, col) => {
            const cellRange = sheet.getCell(row, col);
            if (cellRange.value() != undefined) {
                cellsWithValue++;
            }
        });
        const commandManager = workbook.commandManager();
        if (cellsWithValue > 1) {
            // Modal.confirm({
            //     title: '提示',
            //     content: '合并后将只保留最左上角单元格的值，确定合并吗？',
            //     onOk() {
            //         commandManager.execute({
            //             cmd: 'mergeCells',
            //             sheetName: sheet.name(),
            //             sheet,
            //             sels,
            //         });
            //     },
            // });
        } else {
            commandManager.execute({
                cmd: 'mergeCells',
                sheetName: sheet.name(),
                sheet,
                sels,
            });
        }
    } catch (error) {
        if (error.message === '无效区间') {
            // message.error('该区间不能合并单元格，请检查');
        } else {
            // message.error(error.message);
        }
        cb && cb();
    }
}
/**
 * 取消合并单元格
 * @param {*} sheet
 */
export function unmergeCells(sheet, workbook) {
    const commandManager = workbook.commandManager();
    const sels = sheet.getSelections();
    commandManager.execute({
        cmd: 'unmergeCells',
        sheetName: sheet.name(),
        sheet,
        sels,
    });
}
/**
 * 文本换行
 * @param {*} sheet
 */
export function setWordWrap(sheet, workbook, isToggle = false) {
    const commandManager = workbook.commandManager();
    const sels = sheet.getSelections();
    commandManager.execute({
        cmd: 'setWordWrap',
        sheetName: sheet.name(),
        sheet,
        isToggle,
        sels,
    });
}
/**
 * 设置列宽或行高
 * @param {GCTYPE.Spread.Sheets.Worksheet} sheet
 * @param {GCTYPE.Spread.Sheets.Workbook} workbook
 * @param {'row' | 'col'} direction
 * @param {Array} list
 * @param {number} size
 */
export function setRowColSize(sheet, workbook, list, direction, size) {
    const commandManager = workbook.commandManager();
    commandManager.execute({
        cmd: 'setRowColSize',
        sheetName: sheet.name(),
        sheet,
        list,
        direction,
        size,
    });
}

/**
 * 清除单元格
 * @param {GCTYPE.Spread.Sheets.Worksheet} sheet
 * @param {GCTYPE.Spread.Sheets.Workbook} workbook
 * @param {Array.<GCTYPE.Spread.Sheets.Range>} ranges 范围列表
 * @param {number} clearType 清除类型
 */
export function clearRange(sheet, workbook, ranges, clearType) {
    const commandManager = workbook.commandManager();
    commandManager.execute({
        cmd: 'clearRange',
        sheetName: sheet.name(),
        sheet,
        ranges,
        clearType,
    });
}

export function brushStyle({
    originRange,
    col,
    row,
}, workbook) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    commandManager.execute({
        cmd: 'brushStyle',
        sheetName: sheet.name(),
        sheet,
        originRange,
        col,
        row,
    });
}
