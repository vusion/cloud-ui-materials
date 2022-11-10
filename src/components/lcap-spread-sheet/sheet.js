import GC from '@spread';

import registerCmd from './util';
import { changeDynamicTableDataModelSetting } from './table';

export function deleteColumns(sheet, workbook, sels, dispatch, dynamicTable) {
    const { col, colCount } = sels[0];
    const commandManager = workbook.commandManager();
    commandManager.execute({
        cmd: 'gc.spread.contextMenu.deleteColumns',
        sheetName: sheet.name(),
        sheet,
        selections: sels,
    });
    changeDynamicTableDataModelSetting(col, colCount, sheet, dynamicTable, dispatch, false, true);
}

export function batchMoveCell(sheet, sels, direction = 'up') {
    sheet.suspendPaint();
    switch (direction) {
        case 'up':
            sels.forEach((sel) => {
                sheet.moveTo(
                    sel.row + sel.rowCount,
                    sel.col,
                    sel.row,
                    sel.col,
                    sheet.getRowCount() - (sel.row + sel.rowCount),
                    sel.colCount,
                    GC.Spread.Sheets.CopyToOptions.all
                );
            });
            break;
        case 'down':
            sels.forEach((sel) => {
                // 边界
                if (sheet.getRowCount() === sel.row + 1) {
                    sheet.addRows(sel.row + 1, 1);
                }
                sheet.moveTo(
                    sel.row,
                    sel.col,
                    sel.row + sel.rowCount,
                    sel.col,
                    sheet.getRowCount() - (sel.row + sel.rowCount),
                    sel.colCount,
                    GC.Spread.Sheets.CopyToOptions.all
                );
            });
            break;
        case 'right':
            sels.forEach((sel) => {
                // 边界
                if (sheet.getColumnCount() === sel.col + 1) {
                    sheet.addColumns(sel.col + 1, 1);
                }
                sheet.resumePaint();
                sheet.moveTo(
                    sel.row,
                    sel.col,
                    sel.row,
                    sel.col + sel.colCount,
                    sel.rowCount,
                    sheet.getColumnCount() - (sel.col + sel.colCount),
                    GC.Spread.Sheets.CopyToOptions.all
                );
            });
            break;
        case 'left':
            sels.forEach((sel) => {
                sheet.moveTo(
                    sel.row,
                    sel.col + sel.colCount,
                    sel.row,
                    sel.col,
                    sel.rowCount,
                    sheet.getColumnCount() - (sel.col + sel.colCount),
                    GC.Spread.Sheets.CopyToOptions.all
                );
            });
            break;
        default:
            break;
    }
    sheet.resumePaint();
}

export function addCellAndMoveRight(workbook) {
    registerCmd(workbook, 'addCellAndMoveRight', (options) => {
        batchMoveCell(options.sheet, options.sels, 'right');
    });
}

export function addCellAndMoveDown(workbook) {
    registerCmd(workbook, 'addCellAndMoveDown', (options) => {
        batchMoveCell(options.sheet, options.sels, 'down');
    });
}

export function deleteCellAndMoveLeft(workbook) {
    registerCmd(workbook, 'deleteCellAndMoveLeft', (options) => {
        batchMoveCell(options.sheet, options.sels, 'left');
    });
}

export function deleteCellAndMoveUp(workbook) {
    registerCmd(workbook, 'deleteCellAndMoveUp', (options) => {
        batchMoveCell(options.sheet, options.sels, 'up');
    });
}
