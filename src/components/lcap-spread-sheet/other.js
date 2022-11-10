import consts from './consts';
import { getSelectionCellRect } from './utils';

export function frozenRowCount(value, workbook) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    sheet.options.frozenlineColor = consts.frozenLineColor;
    commandManager.execute({
        cmd: 'frozenRowCount',
        sheetName: sheet.name(),
        value,
    });
}

export function frozenColumnCount(value, workbook) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    sheet.options.frozenlineColor = consts.frozenLineColor;
    commandManager.execute({
        cmd: 'frozenColumnCount',
        sheetName: sheet.name(),
        value,
    });
}

export function cancelFrozen(workbook) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    commandManager.execute({
        cmd: 'cancelFrozen',
        sheetName: sheet.name(),
    });
}

export function addDynamicTable(workbook, range, dispatch) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    commandManager.execute({ cmd: 'addDynamicTable', range, sheetName: sheet.name(), dispatch });
}

export function addDataModel(workbook, range) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    commandManager.execute({ cmd: 'addDataModel', range, sheetName: sheet.name() });
}

export function setImg({
    value,
    key,
    width,
    height,
}, workbook) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    const cellRect = getSelectionCellRect(sheet);
    commandManager.execute({
        cmd: 'setImg',
        sheetName: sheet.name(),
        value,
        key,
        width,
        height,
        cellRect,
    });
}

export function setLink({
    text,
    link,
}, workbook) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    const cellRect = getSelectionCellRect(sheet);
    commandManager.execute({
        cmd: 'setLink',
        sheetName: sheet.name(),
        text,
        link,
        cellRect,
    });
}

export function clearLink({
    row,
    col,
}, workbook) {
    const commandManager = workbook.commandManager();
    const sheet = workbook.getActiveSheet();
    commandManager.execute({
        cmd: 'clearLink',
        sheetName: sheet.name(),
        row,
        col,
    });
}

/**
 * 插入行列
 * @param {GCTYPE.Spread.Sheets.Worksheet} sheet
 * @param {GCTYPE.Spread.Sheets.Workbook} workbook
 * @param {Array} list 行列索引位置
 * @param {'row' | 'col'} direction
 * @param {number} size
 */
export function addRowCols(sheet, workbook, list, direction, size, inDynamicTable, dispatch) {
    const commandManager = workbook.commandManager();
    commandManager.execute({
        cmd: 'addRowCols',
        sheetName: sheet.name(),
        sheet,
        list,
        direction,
        size,
        inDynamicTable,
        dispatch,
    });
}

export function changeTableSetting(sheet, workbook, table, area, value) {
    const commandManager = workbook.commandManager();
    commandManager.execute({
        cmd: 'changeTableSetting',
        sheetName: sheet.name(),
        sheet,
        table,
        area,
        value,
    });
}
