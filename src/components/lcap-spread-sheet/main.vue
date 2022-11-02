<template>
<div>
    <div ref="tabbar"></div>
    <div>111</div>
    <div ref="main"></div>
</div>
</template>

<script>
import GC from '@spread';

export default {
    name: 'lcap-excel-main',
    props: {
        tabbarOption: Object,
        containerId: String,
    },
    mounted() {
        this.loadSpread();
    },
    methods: {
        loadSpread() {
            const option = {
                ...this.tabbarOption,
                tabStripHost: this.$refs.tabbar,
            };
            return new GC.Spread.Sheets.Workbook(this.$refs.main, option);
        },
    },
};
</script>
