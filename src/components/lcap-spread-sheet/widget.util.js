import GC from '@spread';
import moment from 'moment';
import { cloneDeep } from 'lodash';

import consts from './consts';
import { isWidgetCell, traverseCellRange, transformWidgetSettingToCell, getActualRange } from './utils';

export function rangeContainsWidget(sheet, range) {
    let hasWidget = false;
    range = getActualRange(sheet, range);
    traverseCellRange(range, (row, col) => {
        if (isWidgetCell(sheet, row, col)) {
            hasWidget = true;
        }
    }, () => hasWidget);
    if (hasWidget) {
        return true;
    }
    return false;
}

export function selectionsContainerWidget(sheet, sels) {
    for (let i = 0; i < sels.length; i++) {
        if (rangeContainsWidget(sheet, sels[i])) {
            return true;
        }
    }
    return false;
}

// 设置控件默认值
export function setWidgetDefaultValue(sheet, target, row, col) {
    if (target.settings && target.settings.defaultValue && target.settings.defaultValue.value != undefined) {
        const defaultValue = target.settings.defaultValue.value;
        if (target.type === 'Date') {
            const date = defaultValue.toDate();
            const df = GC.Spread.Common.CultureManager.getCultureInfo('zh-cn').DateTimeFormat;
            const pattern = (target.settings.second && target.settings.second.value) ? df.defaultDatePattern : df.shortDatePattern;
            const dateStr = new GC.Spread.Formatter.GeneralFormatter(pattern).format(date);
            sheet.setValue(row, col, date);
            sheet.setText(row, col, dateStr);
        } else {
            sheet.setValue(row, col, defaultValue);
        }
    }
}

export function getTableByRowCol(sheet, row, col) {
    return sheet.tables.find(row, col);
}

// 设置序号控件
export function applySerialNumber(sheet, sels) {
    const target = getGridSurveyWidgetSetting('SerialNumber');
    sheet.suspendPaint();
    sels && sels.forEach((range) => {
        range = getActualRange(sheet, range);
        traverseCellRange(range, (row, col) => {
            const cellProps = transformWidgetSettingToCell(target);
            const table = getTableByRowCol(sheet, row, col);
            sheet.setFormula(row, col, `=ROW()-ROW(${table.name()})+1`, 3);
            setWidgetStyle(sheet, cellProps, row, col);
        });
    });
    sheet.resumePaint();
}

export function transformDateSetting(setting) {
    const df = setting.defaultValue;
    const minDf = setting.minDate;
    const maxDf = setting.maxDate;
    if (df && df.value) {
        df.value = moment(df.value);
    }
    if (minDf && minDf.value) {
        minDf.value = moment(minDf.value).startOf('day');
    }
    if (maxDf && maxDf.value) {
        maxDf.value = moment(maxDf.value).endOf('day');
    }
    return setting;
}

const getGridSurveyWidgetSetting = function (type) {
    let findWidget = consts.widgetList.find((widget) => widget.type === type);
    if (findWidget) {
        findWidget = cloneDeep(findWidget);
        ['renderComponent'].forEach((ignoreSettingKey) => {
            delete findWidget[ignoreSettingKey];
        });
        return findWidget;
    }
    return null;
};

export function getSelectedWidget(cellType) {
    let widget;
    if (cellType instanceof GC.Spread.Sheets.CellTypes.CheckBox) {
        widget = getGridSurveyWidgetSetting('Checkbox');
        widget.settings.description = { value: cellType.caption() };
    } else if (cellType instanceof GC.Spread.Sheets.CellTypes.Text) {
        if (cellType.widgetType) {
            widget = getGridSurveyWidgetSetting(cellType.widgetType);
            widget.settings = cellType.widgetSetting;
            if (widget.type === 'Date') {
                transformDateSetting(widget.settings);
            }
        }
    }
    return widget;
}

// 设置控件
export function setWidgetStyle(sheet, cellProps, row, col) {
    const cell = sheet.getCell(row, col);
    consts.ignoreStyles.forEach((prop) => {
        cell[prop](cellProps[prop]);
    });
}
