<template>
<div>
    <u-button @click="fromJSON">导入json</u-button>
    <u-button @click="toJSON">转为json</u-button>
    <u-button @click="editable">选定区域可编辑</u-button>
    <u-button @click="setBackColor">设置背景</u-button>
    <u-button @click="setWidget">设置控件</u-button>
    <u-button @click="save">导出excel</u-button>
    <div ref="tabbar"></div>
    <slot :spread="{spread}"></slot>
    <div ref="main"></div>
</div>
</template>

<script>
import GC from '@spread';

import './dataValidator';
import consts from './consts';
import { traverseCellRange, transformWidgetSettingToCell, setWidgetValidator, getActualRange, isSingleCell } from './utils';
import { setWidgetDefaultValue, setWidgetStyle, getSelectedWidget } from './widget.util';
import { getTable } from './dynamicTable.util';
import { data } from './demoData';

export default {
    name: 'lcap-excel-main',
    props: {
        option: {
            type: Object,
            default() {
                return {
                    scrollByPixel: true,
                    showResizeTip: 3,
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
            index: 0,
            type: 16,
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
        save() {
            const excelIo = new GC.Spread.Excel.IO();
            const json = this.toJSON();
            excelIo.save(json, function (blob) {
                console.log(blob)

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                // link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);




                //do whatever you want with blob
                //such as you can save it
            }, function (e) {
                //process error
                console.log(e);
            });
        },
        setWidget() {
            const { widgetList } = consts;
            const widget = widgetList[this.index];
            this.index++;
             if(this.index > widgetList.length - 1) {
                this.index = 0;
            }
            const sheet = this.spread.getActiveSheet();
             // 一些选中区域
            const sels = sheet.getSelections();
            this.applySetting(widget, {}, this.spread, 'edit', sels);
        },
        applySetting(target, option = {}, workbook, mode, ranges) {
            const sheet = workbook.getActiveSheet();
            sheet.suspendPaint();
            setWidgetValidator(target, workbook, ranges);
            // 设置校验、样式、defaultValue
            ranges && ranges.forEach((range) => {
                range = getActualRange(sheet, range);
                traverseCellRange(range, (row, col) => {
                    let cellProps = transformWidgetSettingToCell(target, option) || {};
                    const dataModel = cellProps.cellType && cellProps.cellType.widgetSetting && cellProps.cellType.widgetSetting.dataModel;
                    // 清空默认值, 有模型的控件不删除
                    if (mode !== 'edit' && sheet.getValue(row, col) && !dataModel) {
                        sheet.setValue(row, col);
                    }
                    if (target.type === 'SerialNumber') {
                        sheet.setValue(row, col, 1);
                    }
                    setWidgetDefaultValue(sheet, target, row, col);
                    setWidgetStyle(sheet, cellProps, row, col);
                });
            });
            sheet.resumePaint();
        },
        fromJSON() {
            this.spread.fromJSON(data);
        },
        toJSON() {
            const json = this.spread.toJSON({
                includeBindingSource: true,
            });
            console.log(json);
            return json;
        },
        editable() {
            const sheet = this.spread.getActiveSheet();
            sheet.suspendPaint();
            // 一些选中区域
            const sels = sheet.getSelections();
            for (let n = 0; n < sels.length; n++) {
                const sel = sels[n];
                const cellRange = sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount);
                cellRange.locked(false);
            }
            sheet.resumePaint();
        },
        setBackColor() {
            const sheet = this.spread.getActiveSheet();
            sheet.suspendPaint();
            // 一些选中区域
            const sels = sheet.getSelections();
            for (let n = 0; n < sels.length; n++) {
                const sel = sels[n];
                const cellRange = sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount);
                cellRange.backColor({
                    type: this.type, 
                    patternColor: '#D9D9D9'
                });
            }
            sheet.resumePaint();
            this.type++;
            if(this.type > 18) {
                this.type = 1;
            }
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
                const sheet = this.spread.getActiveSheet();
                sheet.options.isProtected = true;
                this.fromJSON();

                const widgetSwitchEvent = GC.Spread.Sheets.Events.SelectionChanged + '.widgetSwitch';
                sheet.unbind(widgetSwitchEvent);
                sheet.bind(widgetSwitchEvent, (e, info) => {
                    let sels = info.newSelections;
                    if (isSingleCell(sheet, sels)) {
                        let widget = getSelectedWidget(sheet.getCellType(sels[0].row, sels[0].col));
                        if (widget && widget.type === 'Select') {
                        if (_.get(widget, 'settings.selectionMethod.value') === 'multiple') {
                            widget.type = 'MultipleSelect';
                        }
                        }
                        let table = getTable(sheet, sels);
                        let dynamicTable = table && table.name();
                        console.log(widget, table, dynamicTable)
                        if (widget && widget.type !== 'SerialNumber' || dynamicTable) {
                        
                        } else {
                       
                        }
                    }
                });
            }
        },
    },
};
</script>
