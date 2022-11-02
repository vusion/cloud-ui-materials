<template>
<div>
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
            return new GC.Spread.Sheets.Workbook(this.$refs.main, this.tabbarOption);
        },
    },
};
</script>
