<template>
<div>
    <lcap-excel-main :option="option">
        <template #default="data">
            <designer :spread="data.spread"></designer>
            <formula-bar></formula-bar>
        </template>
    </lcap-excel-main>
</div>
</template>

<script>
import GC from '@spread';

import './common/style/gc.spread.sheets.excel2013white.14.2.5.less';
import Designer from './designer';
import FormulaBar from './formula-bar';
import LcapExcelMain from './main';

export default {
    name: 'lcap-excel',
    components: {
        Designer,
        FormulaBar,
        LcapExcelMain,
    },
    data() {
        return {
            option: null,
        };
    },
    mounted() {
        this.option = {
            scrollByPixel: true,
            showResizeTip: 3,
            allowUserDragFill: false,
            allowUndo: true,
            scrollbarAppearance: 1,
            allowExtendPasteRange: true,
            copyPasteHeaderOptions: 0,
            scrollbarMaxAlign: true,
            showDragDropTip: false,
            cutCopyIndicatorBorderColor: '#103FFA',
            tabStripVisible: true,
            tabStripPosition: 1,
            tabNavigationVisible: false,
            tabEditable: true,
            newTabVisible: true,
        };
    },
};
</script>
