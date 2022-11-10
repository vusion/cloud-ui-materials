import { isSelectWidget, transformWidgetSettingToCell, traverseCellRange, getSheetBySheetId, setWidgetValidator, getActualRange } from './utils';
import { hasDataSourceSelect, applySerialNumber, setWidgetDefaultValue, setWidgetStyle } from './widget.util';
import registerCmd from './util';

// eslint-disable-next-line import/prefer-default-export
export function applyPanel(workbook) {
    registerCmd(workbook, 'applyPanel', (options) => {
        /** @type {{sheet: GCTYPE.Spread.Sheets.Worksheet}} */
        const {
            dispatch, target, mode, ranges,
        } = options;
        apply(dispatch, target, workbook, mode, ranges);
    });
}

function apply(dispatch, target, workbook, mode, ranges) {
    // apply之后取消newFlag
    delete target.isNewFlag;
    if (isSelectWidget(target.type) && hasDataSourceSelect(target.settings)) {
        // 应用带有绑定数据库的下拉选项
        dispatch({
            type: 'form/fetchSingleDataItems',
            payload: {
                target,
                inEdit: true,
            },
        }).then((res) => {
            applySetting(target, { dataSourceOptions: res }, workbook, mode, ranges);
        });
    } else {
        applySetting(target, {}, workbook, mode, ranges);
    }
}

function applySetting(target, option = {}, workbook, mode, ranges) {
    /** @type {GCTYPE.Spread.Sheets.Worksheet} */
    const sheet = getSheetBySheetId(workbook, target.sheetId);
    sheet.suspendPaint();
    setWidgetValidator(target, workbook, ranges);
    // 设置校验、样式、defaultValue
    ranges && ranges.forEach((range) => {
        range = getActualRange(sheet, range);
        traverseCellRange(range, (row, col) => {
            const cellProps = transformWidgetSettingToCell(target, option) || {};
            const dataModel = cellProps.cellType && cellProps.cellType.widgetSetting && cellProps.cellType.widgetSetting.dataModel;
            // 清空默认值, 有模型的控件不删除
            if (mode !== 'edit' && sheet.getValue(row, col) && !dataModel) {
                sheet.setValue(row, col);
            }
            if (target.type === 'SerialNumber') {
                sheet.setValue(row, col, 1);
            }
            setWidgetDefaultValue(sheet, target, row, col);
            setWidgetStyle(sheet, cellProps, row, col);
        });
    });
    sheet.resumePaint();
}

export function registerApplySerialNumber(workbook) {
    registerCmd(workbook, 'applySerialNumber', (options) => {
        /** @type {{sheet: GCTYPE.Spread.Sheets.Worksheet}} */
        const {
            sheet, sels,
        } = options;
        applySerialNumber(sheet, sels);
    });
}
