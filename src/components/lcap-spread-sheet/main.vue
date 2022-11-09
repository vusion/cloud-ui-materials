<template>
<div>
    <u-button @click="fromJSON">导入json</u-button>
    <u-button @click="toJSON">转为json</u-button>
    <u-button @click="editable">选定区域可编辑</u-button>
    <u-button @click="setBackColor">设置背景</u-button>
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
        fromJSON() {
            this.spread.fromJSON({
                "version": "14.2.5",
                "scrollbarMaxAlign": true,
                "tabStripPosition": 1,
                "cutCopyIndicatorBorderColor": "#103FFA",
                "tabNavigationVisible": false,
                "showResizeTip": 3,
                "showDragDropTip": false,
                "allowExtendPasteRange": true,
                "copyPasteHeaderOptions": 0,
                "scrollByPixel": true,
                "scrollbarAppearance": 1,
                "customList": [],
                "sheets": {
                    "Sheet1": {
                        "name": "Sheet1",
                        "isSelected": true,
                        "activeRow": 2,
                        "activeCol": 7,
                        "zoomFactor": 0.25,
                        "frozenTrailingRowStickToEdge": true,
                        "frozenTrailingColumnStickToEdge": true,
                        "theme": "Office",
                        "data": {
                            "dataTable": {
                                "1": {
                                    "1": {
                                        "value": "s",
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "2": {
                                        "value": "s",
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "3": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    }
                                },
                                "2": {
                                    "1": {
                                        "value": "s",
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "2": {
                                        "value": "s",
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "3": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "7": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            }
                                        }
                                    }
                                },
                                "3": {
                                    "1": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "2": {
                                        "value": "ss",
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "3": {
                                        "value": "s",
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "5": {
                                        "value": "ssss",
                                        "style": {
                                            "locked": false
                                        }
                                    }
                                },
                                "4": {
                                    "1": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "2": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "3": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    }
                                },
                                "5": {
                                    "1": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "2": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    },
                                    "3": {
                                        "style": {
                                            "backColor": {
                                                "type": 16,
                                                "patternColor": "#D9D9D9"
                                            },
                                            "locked": false
                                        }
                                    }
                                }
                            },
                            "defaultDataNode": {
                                "style": {
                                    "themeFont": "Body"
                                }
                            }
                        },
                        "rowHeaderData": {
                            "defaultDataNode": {
                                "style": {
                                    "themeFont": "Body"
                                }
                            }
                        },
                        "colHeaderData": {
                            "defaultDataNode": {
                                "style": {
                                    "themeFont": "Body"
                                }
                            }
                        },
                        "leftCellIndex": 0,
                        "topCellIndex": 1,
                        "selections": {
                            "0": {
                                "row": 2,
                                "rowCount": 1,
                                "col": 7,
                                "colCount": 1
                            },
                            "length": 1
                        },
                        "cellStates": {},
                        "states": {},
                        "isProtected": true,
                        "index": 0
                    }
                }
            });
        },
        toJSON() {
            const json = this.spread.toJSON({
                includeBindingSource: true,
            });
            console.log(json);
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
            }
        },
    },
};
</script>
