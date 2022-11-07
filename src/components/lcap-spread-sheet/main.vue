<template>
<div>
    <u-button @click="onClick">点击</u-button>
    <div ref="tabbar"></div>
    <slot :spread="{spread}"></slot>
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
        onClick() {
            const sheet = this.spread.getActiveSheet();
            sheet.suspendPaint();
            // 一些选中区域
            const sels = sheet.getSelections();
            for (let n = 0; n < sels.length; n++) {
                const sel = sels[n];
                const cellRange = sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount);
                cellRange.setPerm();
            }
            sheet.resumePaint();
        },
        loadSpread() {
            if (this.$refs.main) {
                const options = {
                   tabStripHost: this.$refs.tabbar
                };
                if(this.option) {
                   Object.assign(options, this.option);
                }
                const spread = this.spread;
                if(!spread) {
                    this.spread = new GC.Spread.Sheets.Workbook(this.$refs.main, options);
                } else {
                    for(let key in options) {
                        spread.options[key] = options[key];
                    }
                    spread.invalidateLayout();
		            spread.repaint();
                }
                // const sheet = this.spread.sheets[0];
                // sheet.options.protectionOptions = {
                //     allowSelectLockedCells: false
                // };
                // sheet.options.isProtected = true;
            }
        },
    },
};
</script>
