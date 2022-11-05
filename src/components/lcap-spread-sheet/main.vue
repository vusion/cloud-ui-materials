<template>
<div>
    <div ref="tabbar"></div>
    <slot :spread="{workbook}"></slot>
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
            workbook: null,
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
                // if (this.workbook) {
                //     this.workbook.destroy();
                // }
                const options = {
                    tabStripHost: this.$refs.tabbar,
                };
                if(this.option) {
                   Object.assign(options, this.option);
                }
                if(!this.workbook) {
                    this.workbook = new GC.Spread.Sheets.Workbook(this.$refs.main, options);
                } else {
                    this.workbook.refresh();
                }
                
            }
        },
    },
};
</script>
