import GC from '@spread';

import { baseFont } from './common/style/config.less';

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
        },
        {
            type: 'Select',
            alias: '单选',
            iconName: 'Choice',
        },
        {
            type: 'MultipleSelect',
            alias: '多选',
            iconName: 'multiChoice',
        },
        {
            type: 'Date',
            alias: '日期',
            iconName: 'Date',
        },
        {
            type: 'Number',
            alias: '数字',
            iconName: 'Num',
        },
        {
            type: 'Text',
            alias: '文本',
            iconName: 'Str',
        },
        {
            type: 'Email',
            alias: '邮箱',
            iconName: 'Email',
        },
        {
            type: 'Cellphone',
            alias: '手机',
            iconName: 'Phone',
        },
        {
            type: 'SerialNumber',
            alias: '序号',
            iconName: 'serialNumber',
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
