<template>
<div>
    <lcap-excel-main></lcap-excel-main>
</div>
</template>

<script>
import LcapExcelMain from './main';
import './common/style/gc.spread.sheets.excel2013white.14.2.5.less';

export default {
    name: 'lcap-excel',
    components: {
        LcapExcelMain,
    },
};
</script>
