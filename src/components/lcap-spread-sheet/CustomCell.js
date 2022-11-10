import Vue from 'vue';
import _ from 'lodash';

import GC from '@spread';

import Demo from './demo.vue';
import './index.css';

import { isSelectWidget } from './utils';

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
                const ctnElem = document.createElement('div');
                const app = new Vue({
                    ...Demo,
                });
                app.$mount(ctnElem);
                const originDispose = ctrl.dispose;
                ctrl.dispose = () => {
                    app.$destroy();
                    originDispose.call(ctrl);
                    delete ctrl.dispose;
                };
                return app.$el;
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
