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
    props: {
        option: Object,
    },
};
</script>
