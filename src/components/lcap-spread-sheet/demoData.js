const data = {
    version: '14.2.5',
    scrollbarMaxAlign: true,
    tabStripPosition: 1,
    cutCopyIndicatorBorderColor: '#103FFA',
    tabNavigationVisible: false,
    showResizeTip: 3,
    showDragDropTip: false,
    allowExtendPasteRange: true,
    copyPasteHeaderOptions: 0,
    scrollByPixel: true,
    scrollbarAppearance: 1,
    customList: [],
    sheets: {
        Sheet1: {
            name: 'Sheet1',
            isSelected: true,
            frozenTrailingRowStickToEdge: true,
            frozenTrailingColumnStickToEdge: true,
            theme: 'Office',
            data: {
                dataTable: {
                    0: {
                        0: {
                            style: {
                                backColor: {
                                    type: 16,
                                    patternColor: '#D9D9D9',
                                },
                                locked: false,
                                cellType: {
                                    allowOverflow: true,
                                    typeName: '201',
                                    editorType: 1,
                                    widgetType: 'Select',
                                    widgetSetting: {},
                                },
                                watermark: '请选择',
                                cellButtons: [
                                    {
                                        imageType: 5,
                                        command: 'openList',
                                    },
                                ],
                            },
                        },
                    },
                },
                defaultDataNode: {
                    style: {
                        themeFont: 'Body',
                    },
                },
            },
            rowHeaderData: {
                defaultDataNode: {
                    style: {
                        themeFont: 'Body',
                    },
                },
            },
            colHeaderData: {
                defaultDataNode: {
                    style: {
                        themeFont: 'Body',
                    },
                },
            },
            leftCellIndex: 0,
            topCellIndex: 0,
            selections: {
                0: {
                    row: 0,
                    rowCount: 1,
                    col: 0,
                    colCount: 1,
                },
                length: 1,
            },
            validations: [
                {
                    type: 20,
                    condition: {
                        ignoreBlank: true,
                        ranges: [
                            {
                                row: 0,
                                rowCount: 1,
                                col: 0,
                                colCount: 1,
                            },
                        ],
                    },
                    ranges: 'A1',
                    highlightStyle: '{"type":1,"color":"red","position":1}',
                    widgetType: 'Select',
                    widgetSetting: {},
                },
            ],
            cellStates: {},
            states: {},
            isProtected: true,
            protectionOptions: {
                allowInsertRows: true,
                allowInsertColumns: true,
                allowDeleteRows: true,
                allowDeleteColumns: true,
            },
            index: 0,
        },
    },
};

export {
    data,
};
