import GC from '@spread';
import _ from 'lodash';
import './index.css';

export function isSelectWidget(type) {
    return ['Select', 'MultipleSelect'].includes(type);
}

export function isSingleSelect(schemaOrSchemaType) {
    return typeof schemaOrSchemaType === 'object' ? schemaOrSchemaType.type === 'Select' : schemaOrSchemaType === 'Select';
}

GC.Spread.Sheets.CellTypes.CheckBox.prototype._createCellTypeElement = function (context) {

};

/**
 * @extends {GCTYPE.Spread.Sheets.CellTypes.Text}
 */
export default class CustomCell extends GC.Spread.Sheets.CellTypes.Text {
    constructor(widgetType, widgetSetting) {
        super();
        this.widgetType = widgetType;
        this.widgetSetting = widgetSetting;
        this.typeName = '201';
    }

    getCellAndPaddingHitInfo(x, y, cellStyle, cellRect, context) {
        const hitInfo = super.getCellAndPaddingHitInfo(x, y, cellStyle, cellRect, context);
        if (this.widgetType === 'Date' && hitInfo) {
            hitInfo.disableEdit = true;
        }
        return hitInfo;
    }

    getWidgetOption() {
        const option = {
            align: 0,
            widgetType: this.widgetType,
            widgetSetting: this.widgetSetting,
            items: (ctrl) => {
                const div = document.createElement('div');
                const str = '<div><div class="ant-select-dropdown ant-select-dropdown--multiple"><input placeholder="查找选项" type="text" class="ant-input ant-input-sm" value=""><ul class="ant-select-dropdown-menu ant-select-dropdown-menu-light ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" role="menu"><li class="ant-select-dropdown-menu-item" role="menuitem">选项1<svg class="icon icon-check ant-select-selected-icon" aria-hidden="true"><use xlink:href="#icon-check"></use></svg></li><li class="ant-select-dropdown-menu-item" role="menuitem">选项2<svg class="icon icon-check ant-select-selected-icon" aria-hidden="true"><use xlink:href="#icon-check"></use></svg></li><li class="ant-select-dropdown-menu-item" role="menuitem">选项3<svg class="icon icon-check ant-select-selected-icon" aria-hidden="true"><use xlink:href="#icon-check"></use></svg></li></ul></div></div>';
                div.innerHTML = str;
                return div;
            },
        };
        if (isSelectWidget(this.widgetType)) {
            option.className = 'gc-list-control-list';
            option.inheritWith = true;
            option.multiSelect = _.get(this.widgetSetting, 'selectionMethod.value') === 'multiple' || !isSingleSelect(this.widgetType);
        } else if (this.widgetType === 'Date') {
            option.className = 'gc-list-control-calendar';
        }
        return {
            isDropDowns: true,
            option,
        };
    }

    _createCellTypeElement(context) {
        if (['Date', 'SerialNumber'].includes(this.widgetType)) {
            return;
        }
        return super._createCellTypeElement(context);
    }

    isImeAware() {
        if (['Date', 'SerialNumber'].includes(this.widgetType)) {
            return false;
        }
        return true;
    }
}
