import _ from 'lodash';

/**
 * 设置单元格上有pill标识
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @param {*} isRemove
 */
export function setTablePillCellType(sheet, row, col, isRemove) {
    const cellType = _.cloneDeep(sheet.getCellType(row, col) || {});
    if (isRemove) {
        delete cellType.hasPillOnTable;
    } else {
        cellType.hasPillOnTable = true;
    }
    sheet.setCellType(row, col, cellType);
}
