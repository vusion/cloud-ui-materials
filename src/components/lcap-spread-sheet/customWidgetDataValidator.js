import moment from 'moment';
import { isSelectWidget } from '/utils';
import { isNullOrUndefined } from './utils';

export const DEFAULT_FORMAT_YMD = 'YYYY-MM-DD';

export const checkDate = (current, minDate, maxDate, defaultValue, mode = 'default', format = DEFAULT_FORMAT_YMD) => {
    if (minDate && maxDate) {
        return current.isAfter(maxDate) || current.isBefore(minDate);
    }
    if (minDate && defaultValue) {
        return current.isBefore(minDate) || current.isBefore(defaultValue);
    }
    if (maxDate && defaultValue) {
        return current.isAfter(minDate) || current.isAfter(defaultValue);
    }
    if (maxDate) {
        return current.isAfter(maxDate);
    }
    if (minDate) {
        return current.isBefore(minDate);
    }
    if (defaultValue) {
        if (mode === 'min') {
            return current.isAfter(defaultValue);
        }
        if (mode === 'max') {
            return current.isBefore(defaultValue);
        }
    }
    return false;
};

// mode: min | max | default
export const checkDateDisabled = (current, settings, mode = 'default') => {
    let minDate = settings.hasMinDate && settings.hasMinDate.value && settings.minDate && settings.minDate.value;
    let maxDate = settings.hasMaxDate && settings.hasMaxDate.value && settings.maxDate && settings.maxDate.value;
    let defaultValue = settings.defaultValue && settings.defaultValue.value;
    const showTime = settings.second && settings.second.value;
    // let format = showTime ? DEFAULT_FORMAT : DEFAULT_FORMAT_YMD;
    if (!showTime && minDate)
        minDate = minDate.startOf('day');
    if (!showTime && maxDate)
        maxDate = maxDate.endOf('day');
    if (!showTime && defaultValue) {
        if (mode === 'min') {
            defaultValue = defaultValue.startOf('day');
        } else if (mode === 'max') {
            defaultValue = defaultValue.endOf('day');
        }
    }

    if (mode === 'default') {
        return checkDate(current, minDate, maxDate, null);
    }
    if (mode === 'min') {
        return checkDate(current, null, maxDate, defaultValue);
    }
    if (mode === 'max') {
        return checkDate(current, minDate, null, defaultValue);
    }
    return false;
};

const errorMessageMap = {
    Number: '请输入数字',
    Text: '请输入文本',
    Date: '请选择日期',
    Select: '请选择选项',
    Email: '请输入邮箱',
    Cellphone: '请输入手机号',
};

function validateIsRequired(setting, value, type) {
    let message = '';
    let valid = true;
    if (setting.required && setting.required.value) {
        if (value === null || value === undefined || value === '') {
            valid = false;
            message = errorMessageMap[type];
        }
    }
    return {
        valid,
        message,
    };
}

export function widgetValidatorEvaulate(evaluator, baseRow, baseColumn, value, bindValidator) {
    const widgetSetting = bindValidator.widgetSetting();
    const type = bindValidator.widgetType();
    return widgetValidator(widgetSetting, value, type, { ignoreBlank: bindValidator.ignoreBlank() }).valid;
}
/**
 * @returns {{message: string, valid: boolean}}
 */
export function widgetValidator(widgetSetting, value, type, options = {
    ignoreBlank: true,
}) {
    let valid = true;
    let message = '';
    if (!widgetSetting) {
        return { valid, message };
    }
    if (options.ignoreBlank && isNullOrUndefined(value)) {
        return {
            valid: true,
            message: '',
        };
    }
    // 校验是否是空值
    const isRequiredRes = validateIsRequired(widgetSetting, value, type);

    if (!isRequiredRes.valid) {
        return { valid: false, message: isRequiredRes.message };
    }

    if (isSelectWidget(type)) {
        // let resultArr = [];
        // if (typeof value === 'number') {
        //   resultArr = [value];
        // } else if (value) {
        //   resultArr = value.split(',');
        // }
        // let i = 0;
        // let options = widgetSetting.manualItems.value.map(item => item.text);
        // while (i < resultArr.length) {
        //   if (!options.includes(resultArr[i])) {
        //     return {valid: false, message: '请选择列表中的选项'};
        //   }
        //   i++;
        // }
    } else if (type === 'Date') {
        if (value !== null && value !== undefined && (!moment(value).isValid() || /^\d+$/.test(value))) {
            return { valid: false, message: '请输入有效日期（例：2022-11-28）' };
        }
        valid = !checkDateDisabled(moment(value), widgetSetting);
    } else if (type === 'Text') {
        let length;
        if (isNullOrUndefined(value)) {
            length = 0;
        } else {
            length = value.toString().length;
        }
        if (widgetSetting.rangeEnabled && widgetSetting.rangeEnabled.value) {
            const minNumber = widgetSetting.min && widgetSetting.min.value;
            const maxNumber = widgetSetting.max && widgetSetting.max.value;
            let minValid = true;
            let maxValid = true;
            if (!isNullOrUndefined(minNumber) && length < minNumber) {
                minValid = false;
                message = `字符个数需大于${minNumber}`;
            }
            if (!isNullOrUndefined(maxNumber) && length > maxNumber) {
                maxValid = false;
                message = `字符个数需小于${maxNumber}`;
            }
            if (!isNullOrUndefined(maxNumber) && !isNullOrUndefined(minNumber)) {
                message = `字符个数需在${minNumber}-${maxNumber}之间`;
            }
            if (!minValid || !maxValid) {
                return { valid: false, message };
            }
        }
        if (widgetSetting.noSpace && widgetSetting.noSpace.value && typeof value !== 'undefined' && value !== '') {
            if (String(value).trim().length < String(value).length) {
                return { valid: false, message: '开头、结尾不允许有空格' };
            }
        }
    } else if (type === 'Email') {
        if (!/^[\w-.]+@(?:[\w-]+\.)+[a-z]{2,6}$/.test(value)) {
            return { valid: false, message: '邮箱格式不正确' };
        }
    } else if (type === 'Cellphone') {
        if (!/^1[3-9]\d{9}$/.test(value)) {
            return { valid: false, message: '手机号码格式不正确' };
        }
    } else if (type === 'Number') {
        if (isNaN(+value)) {
            return { valid: false, message: '请输入数字' };
        }
        if (widgetSetting.rangeEnabled && widgetSetting.rangeEnabled.value) {
            // let {formatType: {value: formatType}, decimalPlace: {value: decimalPlace} } = widgetSetting;
            // value = formatNumber(value, { decimalPlace, formatType }).value;
            const minNumber = widgetSetting.min && widgetSetting.min.value;
            const maxNumber = widgetSetting.max && widgetSetting.max.value;
            let minValid = true;
            let maxValid = true;
            if (!isNullOrUndefined(minNumber) && value < minNumber) {
                minValid = false;
                message = `数值需大于${minNumber}`;
            }
            if (!isNullOrUndefined(maxNumber) && value > maxNumber) {
                maxValid = false;
                message = `数值需小于${maxNumber}`;
            }
            if (!isNullOrUndefined(maxNumber) && !isNullOrUndefined(minNumber)) {
                message = `数值范围为${minNumber}-${maxNumber}`;
            }
            if (!(minValid & maxValid)) {
                return { valid: false, message };
            }
        }
    }
    return { valid, message };
}
