<template>
<div>
    填报控件
</div>
</template>

<script>
require('../iconfont/iconfont.js');

import consts from '../consts';
import { getWidgetList } from '../utils';

export default {
    name: 'lcap-excel-form-items',
    props: {
        spread: Object,
    },
    data() {
        return {
            widgetList: [],
            workbook: null,
            sheet: null,
            sels: null
        };
    },
    watch: {
        spread: {
            deep: true,
            handler(value) {
                if (this.spread) {
                    // this.workbook = this.spread?.workbook;
                    // this.sheet = this.workbook?.getActiveSheet();
                    // this.sels = this.sheet?.getSelections();
                    // const { widgetList, showWidgetList } = getWidgetList(this.sheet, this.sels);
                    // this.widgetList = widgetList;
                    // console.log(_widgetList, showWidgetList);
                }
            },
        },
    },
    mounted() {

    },
    methods: {
        onClick($event) {
            console.log(this.sels, $event)
        }
    },
};
</script>

<style module>

.icon {
  width: 20px;
  height: 20px;
  font-size: 20px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.bottomTxt {

}

</style>
