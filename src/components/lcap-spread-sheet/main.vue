<template>
<div>
    <div ref="tabbar"></div>
    <slot></slot>
    <div ref="main"></div>
</div>
</template>

<script>
import GC from '@spread';

export default {
    name: 'lcap-excel-main',
    props: {
        option: {
            type: Object,
            default() {
                return {
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
            }
        },
    },
    data() {
        return {
            spread: null,
        };
    },
    watch: {
        option: {
            handler(value) {
                this.loadSpread();
            },
        },
    },
    mounted() {
        this.loadSpread();
    },
    methods: {
        loadSpread() {
            if (this.$refs.main) {
                if (this.spread) {
                    this.spread.destroy();
                }
                const options = {
                    ...this.option,
                    tabStripHost: this.$refs.tabbar,
                };
                this.spread = new GC.Spread.Sheets.Workbook(this.$refs.main, options);
            }
        },
    },
};
</script>
