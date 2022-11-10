<template>
    <u-button text="underline" @click=" _onClick">
        <!--  <span class="" @click="!disabled && _onClick">-->
        <!--    <svg class="icon" aria-hidden="true">-->
        <!--      <use xlinkHref="#icon-underline" />-->
        <!--    </svg>-->
        <!--  </span>-->
    </u-button>
</template>

<script>
import GC from '@spread';
// import withDesignerBase from '../withDesignerBase';
// import {setTextDecoration} from '../../modules/cellStyle';
// import Style from './index.less';
export default {
    name: "underline",
    data() {
        return {
            active: false,
            workbook: null,
            sheet: null,
            sels: null
        };
    },
    watch: {
        "commandChangeFlag": {
            deep: true,
            handler(value) {
                this.handleEffect();
            },
        },
        spread: {
            deep: true,
            handler(value) {
                if (this.spread) {
                    // this.workbook = this.spread?.workbook;
                    // this.sheet = this.spread?.getActiveSheet();
                    // console.log('11111',this.sheet);
                    // this.sels = this.sheet?.getSelections();
                    // const { widgetList, showWidgetList } = getWidgetList(this.sheet, this.sels);
                    // this.widgetList = widgetList;
                    // console.log(_widgetList, showWidgetList);
                }
            },
        },

    },
    mounted() {
        this.handleEffect();

    },
    computed: {
        calculated() {
            return this.spread && this.spread.isEditing();
        },
    },
    props: {
        spread: Object,
        disabled: false,
        clickItem: undefined,
        leftTopCell: undefined,
        setIsSelected: undefined,
        commandChangeFlag: undefined,
    },
    methods: {
        _onClick() {
            console.log("underline", this.spread);
            this.sheet = this.spread.getActiveSheet();
            console.log('sheet22222', this.sheet)
            const active = !this.active;
            this.active = active;
            this.setTextDecoration(this.spread, this.sels, active ? GC.Spread.Sheets.TextDecorationType.Underline : GC.Spread.Sheets.TextDecorationType.None);
        },
        handleEffect() {
            if (this.spread) {
                this.sheet = this.spread.getActiveSheet();
                this.sels = this.sheet.getSelections();
                const {row, col} = this.sels[0];

                /** @type {GCTYPE.Spread.Sheets.Worksheet} */
                let {textDecoration} = this.sheet.getStyle(row, col, GC.Spread.Sheets.SheetArea.viewport) || {};
                // 按位与
                const isSelected = (textDecoration & GC.Spread.Sheets.TextDecorationType.underline) === GC.Spread.Sheets.TextDecorationType.underline;
                this.setIsSelected(isSelected);
            }
        },
        setTextDecoration(sheet, flag, workbook) {
            console.log('textdecoration', sheet, flag, workbook);
            const commandManager = this.spread.commandManager();
            commandManager.execute({
                cmd: 'setTextDecoration',
                sheetName: sheet.name,
                sheet,
                flag,
                sels: this.sels,
            });
        }
    },
}
</script>

<style scoped>

</style>
