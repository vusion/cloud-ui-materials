import GC from '@spread';
import { getTable, traverseDynamicTableHeader } from './dynamicTable.util';
import { addRowCols } from './other';
import { commandErrorCatcher, getActualRange, traverseCellRange, traverseTableActualCell } from './utils';

export function setCellHidden(sheet, row, col, originalValue) {
    const style = sheet.getStyle(row, col) || new GC.Spread.Sheets.Style();
    // 用来填报提交或者审批提交时遍历dataTable，还原隐藏值
    style.permissionType = permissionTypes.hidden;
    style.originalValue = originalValue;
    // 如果需要隐藏的单元格绑定了公式，必须要将公式设置为null才能隐藏单元格的值
    const originalFormula = sheet.getFormula(row, col);
    const originalWatermark = style.watermark;
    if (originalFormula) {
        style.originalFormula = originalFormula;
        sheet.setFormula(row, col, null);
    }
    if (originalWatermark) {
        style.originalWatermark = originalWatermark;
        delete style.watermark;
    }
    sheet.setValue(row, col, null);
    sheet.setStyle(style);
}

export const permissionTypes = {
    readonly: 'readonly',
    editable: 'editable',
    hidden: 'hidden',
};

// 插入删除列后，增加动态表中的数据字段列
export function changeDynamicTableDataModelSetting(idx, size, sheet, dynamicTable, dispatch, isDynamicTableInsert, isDelete) {
    const tables = sheet.tables.all();
    tables.forEach((table) => {
        if (table && table.tableSetting && table.tableSetting.dataModel) {
            const { col, colCount, row } = table.range();
            // 插入的列在动态表的范围中, 如果是插入单元格，可以插到第一个和最后一个，如果是插入列，则不行
            if ((isDynamicTableInsert || isDelete) && idx >= col && idx <= col + colCount
                || !isDynamicTableInsert && idx > col && idx < col + colCount) {
                const insertPillIndex = idx - col;
                const column = table.tableSetting.dataModel.data.column;
                if (column && column.length) {
                    if (isDelete) {
                        column.splice(insertPillIndex, size);
                        // 被删除后面的pill col前移
                        column.forEach((pill, index) => {
                            if (index >= insertPillIndex) {
                                pill.col -= size;
                            }
                        });
                        // 删除列之后需要把最后{size}列的禁止双击进入单元格状态删除
                        for (let i = col + colCount; i > (col + colCount - size); i -= 1) {
                            setTablePillCellType(sheet, row, i, true);
                        }
                    } else {
                        for (let i = 0; i < size; i++) {
                            column.splice(insertPillIndex + i, 0, {});
                        }
                    }
                }
                if (dynamicTable && table.name() === dynamicTable.name()) {
                    dispatch({
                        type: 'datamodel/setCurrentSettingData',
                        payload: {
                            currentSettingData: _.cloneDeep(table.tableSetting.dataModel),
                        },
                    });
                }
            }
        }
    });
}

export function tableInsertRows(workbook, sheet, table, count = 1) {
    workbook.commandManager().execute({
        cmd: 'tableInsertRows',
        sheetName: sheet.name(),
        tableName: table.name(),
        row: table._row + table._rowCount - 1,
        count,
        isAfter: true,
    });
}

export function tableDeleteRows(workbook, sheet, table, row) {
    workbook.commandManager().execute({
        cmd: 'tableDeleteRows',
        sheetName: sheet.name(),
        tableName: table.name(),
        changeRows: [
            {
                row, count: 1,
            },
        ],
    });
}

// 添加行设置行高与第一行相同
function setRowHeight(workbook, sheet, fromRow, toRow, rowCount = 1) {
    const originRowHeight = sheet.getRowHeight(fromRow, 3);
    workbook.commandManager().execute({
        cmd: 'resizeRow',
        sheetName: sheet.name(),
        rows: [{ firstRow: toRow, lastRow: toRow + rowCount - 1 }],
        size: originRowHeight,
    });
}

// 垂直合并的单元格且为起始单元格且该合并单元格的最后一行=动态表添加一行前的行
// 这种合并单元格在新增时不会自动expand,但是实际应用中需要
function isNeedExpandMergeCell(sheet, row, col) {
    const span = sheet.getSpan(row, col, 3);
    return span && span.rowCount > 1 && col === span.col && span.row + span.rowCount - 1 === row;
}

function getNeedMergeCells(sheet, prevRow) {
    const sels = [];
    traverseCellRange(getActualRange(sheet, new GC.Spread.Sheets.Range(prevRow, -1, 1, 1)), (row, col) => {
        if (isNeedExpandMergeCell(sheet, row, col)) {
            const span = sheet.getSpan(row, col, 3);
            span.rowCount += 1;
            sels.push(span);
        }
    });
    return sels;
}

function processMergeCells(sheet, workbook, targetRow) {
    // 假如表格行左右两侧存在合并的单元格,插入行时主动扩展合并单元格
    const needMergeCells = getNeedMergeCells(sheet, targetRow);
    if (needMergeCells.length) {
        workbook.commandManager().execute({
            cmd: 'mergeCells',
            sheetName: sheet.name(),
            sheet,
            sels: needMergeCells,
        });
    }
    // 设置边框样式
    needMergeCells.forEach((range) => {
        const style = sheet.getStyle(range.row, range.col, 3);
        if (style && style.borderTop) {
            sheet.getRange(range.row, range.col, range.rowCount, range.colCount).setBorder(style.borderTop, { all: true, outline: true });
        }
    });
}

// 动态表插入行
export function insertDynamicTableRow(sheet, workbook, table, isWholeRowInsert, hideSuspend) {
    const copyOption = GC.Spread.Sheets.CopyToOptions.all ^ GC.Spread.Sheets.CopyToOptions.value;
    if (!hideSuspend) {
        sheet.suspendPaint();
    }
    if (isWholeRowInsert) {
        // 先1.插入整行 2.copy 3.tableResize
        const tableRange = table.range();
        const prevRow = table._row + table._rowCount - 1;
        addRowCols(sheet, workbook, [tableRange.row + tableRange.rowCount], 'row', 1);
        const toRow = table._row + table._rowCount;
        const fromRow = toRow - 1;
        sheet.copyTo(fromRow, table._col, toRow, table._col, 1, table._colCount, copyOption);
        setRowHeight(workbook, sheet, fromRow, toRow);
        workbook.commandManager().execute({
            cmd: 'tableResize',
            sheetName: sheet.name(),
            tableName: table.name(),
            resizeToRange: new GC.Spread.Sheets.Range(table._row, table._col, table._rowCount + 1, table._colCount),
        });
        processMergeCells(sheet, workbook, prevRow);
    } else {
        const toRow = table._row + table._rowCount;
        const fromRow = toRow - 1;
        const totalRowCount = sheet.getRowCount(GC.Spread.Sheets.SheetArea.viewport);
        addRowCols(sheet, workbook, [totalRowCount - 1], 'row', 1);
        tableInsertRows(workbook, sheet, table);
        sheet.copyTo(fromRow, table._col, toRow, table._col, 1, table._colCount, copyOption);
        setRowHeight(workbook, sheet, fromRow, toRow);
    }
    if (!hideSuspend) {
        sheet.resumePaint();
    }
}

export function insertDynamicTableRowsWithDataSource(sheet, workbook, table, isWholeRowInsert, columns, data, {
    onlyAddRows,
} = {}) {
    const copyOption = GC.Spread.Sheets.CopyToOptions.all ^ GC.Spread.Sheets.CopyToOptions.value;
    //  只增加行 不填充内容时，data为行数
    if (onlyAddRows) {
        data = new Array(data || 0);
    }
    // 第一行已存在
    const addRowCount = data.length - 1;
    const prevRow = table._row + table._rowCount - 1;

    if (!data.length) {
        columns.forEach(({ _, row }, i) => {
            sheet.setValue(row, table._col + i, '');
        });
        return;
    }

    sheet.suspendPaint();
    if (isWholeRowInsert) {
        // 先1.插入整行 2.copy 3.tableResize
        const tableRange = table.range();
        addRowCols(sheet, workbook, [tableRange.row + tableRange.rowCount], 'row', addRowCount);
    } else {
        const totalRowCount = sheet.getRowCount(GC.Spread.Sheets.SheetArea.viewport);
        addRowCols(sheet, workbook, [totalRowCount - 1], 'row', addRowCount);
        tableInsertRows(workbook, sheet, table, addRowCount);
    }
    const fromRow = table._row;
    // sheet.copyTo(fromRow, table._col, table._row + 1, table._col, 10, colCount, copyOption);
    const tableRealCells = traverseTableActualCell(sheet, table);
    data.forEach((dataItem, index) => {
        if (index !== data.length - 1) {
            const toRow = table._row + 1 + index;
            const lastCellCol = table._col + table._colCount;
            const span = sheet.getSpan(fromRow, lastCellCol);
            let colCount = table._colCount;
            if (span) {
                colCount += (span.colCount - 1);
            }
            sheet.copyTo(fromRow, table._col, toRow, table._col, 1, colCount, copyOption);
            setRowHeight(workbook, sheet, fromRow, toRow);
        }
        if (onlyAddRows) {
            return;
        }
        const tableHeaderStyleMap = {};
        const _dataItem = [...dataItem];
        columns.forEach(({ fieldId }, i) => {
            const col = (tableRealCells[i] || {}).col || 0;
            let tableHeaderStyle = tableHeaderStyleMap[col];
            if (tableHeaderStyle === undefined) {
                tableHeaderStyle = sheet.getStyle(prevRow, col);
            }
            tableHeaderStyleMap[col] = tableHeaderStyle;
            if (tableHeaderStyle && tableHeaderStyle.permissionType === permissionTypes.hidden) {
                const d = fieldId ? _dataItem.splice(0, 1)[0] || '' : '';
                setCellHidden(sheet, prevRow + index, col, d);
            } else if (fieldId) {
                const d = _dataItem.splice(0, 1);
                if (d[0] !== undefined) {
                    sheet.setValue(prevRow + index, col, d[0]);
                }
            }
        });
    });
    if (isWholeRowInsert) {
        workbook.commandManager().execute({
            cmd: 'tableResize',
            sheetName: sheet.name(),
            tableName: table.name(),
            resizeToRange: new GC.Spread.Sheets.Range(table._row, table._col, table._rowCount + addRowCount, table._colCount),
        });
        // processMergeCells(sheet, workbook, prevRow);
    }
    sheet.resumePaint();
}

// 动态表删除行
export function deleteDynamicTableRowExecutor(sheet, workbook, table, row, isWholeRowInsert) {
    const tagMap = {};
    const isTableHead = row === table._row;
    if (isTableHead) {
        traverseDynamicTableHeader(sheet, table, (r, c) => {
            const tag = sheet.getTag(r, c);
            if (tag) {
                tagMap[c] = tag;
            }
        });
    }
    if (isWholeRowInsert) {
        workbook.commandManager().execute({
            cmd: 'deleteRowCols',
            sheetName: sheet.name(),
            sheet,
            row,
            direction: 'row',
            count: 1,
        });
    } else {
        tableDeleteRows(workbook, sheet, table, row);
    }
    sheet.suspendPaint();
    // 若删除第一行, 拷贝tag
    if (isTableHead) {
        Object.entries(tagMap).forEach(([key, value]) => {
            sheet.setTag(row, key, value);
        });
    }
    sheet.resumePaint();
}

// 动态表插入列
export function insertDynamicTableCol(sheet, workbook, sels, dispatch) {
    const { col, colCount } = sels[0];
    const table = getTable(sheet, sels);
    workbook.commandManager().execute({
        cmd: 'tableInsertColumns',
        sheetName: sheet.name(),
        tableName: table.name(),
        col,
        count: colCount,
    });
}

// 动态表删除列
export function deleteDynamicTableCol(sheet, workbook, sels, dispatch) {
    const { col, colCount } = sels[0];
    const table = getTable(sheet, sels);
    workbook.commandManager().execute({
        cmd: 'tableDeleteColumns',
        sheetName: sheet.name(),
        tableName: table.name(),
        col,
        count: colCount,
    });
}

export function dynamicTableInsertRowExecutor(workbook, sheet, table, isWholeRowInsert) {
    commandErrorCatcher(() => {
        workbook.commandManager().execute({
            cmd: 'dynamicTableInsertRow',
            sheetName: sheet.name(),
            sheet,
            table,
            isWholeRowInsert,
        });
    });
}

export function dynamicTableInsertColExecutor(workbook, sheet, sels, dispatch,) {
    const { col, colCount } = sels[0];
    const table = getTable(sheet, sels);
    commandErrorCatcher(() => {
        workbook.commandManager().execute({
            cmd: 'tableInsertColumns',
            sheetName: sheet.name(),
            tableName: table.name(),
            col,
            count: colCount,
        });
        changeDynamicTableDataModelSetting(col, colCount, sheet, table, dispatch, true);
    });
}

export function dynamicTableDeleteColExecutor(workbook, sheet, sels, dispatch) {
    const { col, row, rowCount, colCount } = sels[0];
    const table = getTable(sheet, sels);
    const range = table.range();
    if (col === range.col && row === range.row && rowCount === range.rowCount && colCount === range.colCount) {
        // message.error('操作失败：要删除的表行(表列)个数会导致表格为空');
        return false;
    }
    workbook.commandManager().execute({
        cmd: 'tableDeleteColumns',
        sheetName: sheet.name(),
        tableName: table.name(),
        col,
        count: colCount,
    });
    changeDynamicTableDataModelSetting(col, colCount, sheet, table, dispatch, true, true);
}
