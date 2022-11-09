import GC from '@spread';

import { baseFont } from './common/style/config.less';

// 基础校验方法
export const baseValidate = (settings) => {
    settings = Object.keys(settings).reduce((result, key) => {
        result[key] = settings[key].value;
        return result;
    }, {});
    const { name } = settings;
    if (typeof name === 'undefined' || name === '') {
        return '标题不能为空';
    }
};

const consts = {
    defaultSize: 12,
    borderColor: '#f1f1f1',
    defaultForeColor: '#E2584D',
    defaultBackColor: '#FDF172',
    setBorderColor: '#000',
    defaultHAlign: 'left',
    defaultVAlign: 'center',
    frozenLineColor: '#999',
    mouseEnterDelay: 0.3,
    defaultFormat: 'General',
    defaultBorderStyle: 'all',
    defaultLineSize: GC.Spread.Sheets.LineStyle.thin,
    ignoreStyles: ['cellButtons', 'watermark', 'cellType', 'hAlign', 'showEllipsis'],
    widgetList: [
        {
            type: 'Checkbox',
            alias: '复选框',
            iconName: 'checkbox',
            validate: baseValidate,
            settings: {},

        },
        {
            type: 'Select',
            alias: '单选',
            iconName: 'Choice',
            validate: baseValidate,
            settings: {},
        },
        {
            type: 'MultipleSelect',
            alias: '多选',
            iconName: 'multiChoice',
            validate: baseValidate,
            settings: {},
        },
        {
            type: 'Date',
            alias: '日期',
            iconName: 'Date',
            validate: (settings) => {
                settings = Object.keys(settings).reduce((result, key) => {
                    result[key] = settings[key].value;
                    return result;
                }, {});
                const { minDate, maxDate, name } = settings;
                if (typeof name === 'undefined' || name === '') {
                    return '标题不能为空';
                }
                if ((minDate && maxDate) && (minDate > maxDate)) {
                    return `“${name}”中“最大日期”不能早于“最小日期”`;
                }
            },
            settings: {},
        },
        {
            type: 'Number',
            alias: '数字',
            iconName: 'Num',
            validate: baseValidate,
            settings: {},
        },
        {
            type: 'Text',
            alias: '文本',
            iconName: 'Str',
            validate: baseValidate,
            settings: {},
        },
        {
            type: 'Email',
            alias: '邮箱',
            iconName: 'Email',
            validate: baseValidate,
            settings: {},
        },
        {
            type: 'Cellphone',
            alias: '手机',
            iconName: 'Phone',
            validate: baseValidate,
            settings: {},
        },
        {
            type: 'SerialNumber',
            alias: '序号',
            iconName: 'serialNumber',
            validate: baseValidate,
            settings: {},
        },
    ],
    customDataValidatorTypesMap: {
        widget: 20,
    },
    filterKey: 'filterDataModel',
    formulaErrorPrefix: '不满足校验规则: ',
};

consts.defaultFont = `normal ${consts.defaultSize}px/normal ${baseFont}`;

export default consts;
