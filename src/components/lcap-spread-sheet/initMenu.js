import Vue from 'vue';

import GC from '@spread';
import Demo from './demo.vue';
import _ from 'lodash';
import { traverseCellRange, getActualRange, getRangeRowOrColDesc, isFullRowOrCol, getRangeRowOrColList, getIndexByRangeStep, isSingleCell, isWidgetCell, getWidgetList, getTagContentByRange } from './utils';
import { mergeCells, unmergeCells, setWordWrap, setRowColSize, clearRange } from './cellStyle';
import { addRowCols } from './other';
import { getSelectedWidget, selectionsContainerWidget } from './widget.util';
import { dynamicTableDeleteColExecutor, dynamicTableInsertColExecutor } from './table';
import { getTable, inDynamicTableArea } from './dynamicTable.util';
import { addCellAndMoveDown, addCellAndMoveRight, deleteCellAndMoveLeft, deleteCellAndMoveUp, deleteColumns } from './sheet';
import { applySerialNumber } from './panel';

const SepItem = { type: 'separator' };

/**
 * 是否为单一合并态单元格
 * @param {GCTYPE.Spread.Sheets.Worksheet} sheet 表单
 * @param {Array.<GCTYPE.Spread.Sheets.Range>} ranges 范围列表
 * @returns {boolean}
 */
export function isSingleMergedCell(sheet, ranges) {
    if (ranges.length === 1) {
        const spans = sheet.getSpans(ranges[0]);
        if (spans.length === 1) {
            return spans[0].equals(getActualRange(sheet, ranges[0]));
        }
    }
    return false;
}

/**
 * 是否选中整个表单
 *
 * @param {Array.<GCTYPE.Spread.Sheets.Range>} ranges 范围列表
 */
export function isFullSheet(ranges) {
    if (!Array.isArray(ranges)) {
        ranges = [ranges];
    }
    return ranges.length === 1 && ranges[0].row === -1 && ranges[0].col === -1;
}

export function getRangeMergeState(sheet, ranges, canMerge) {
    if (!Array.isArray(ranges)) {
        ranges = [ranges];
    }
    if (canMerge === undefined) {
        canMerge = true;
    }
    if (canMerge) {
        const firstMerge = ranges.length === 1 && ((ranges[0].rowCount > 1 || ranges[0].rowCount === -1) || (ranges[0].colCount > 1 || ranges[0].colCount === -1))
            && !isSingleMergedCell(sheet, ranges);
        if (firstMerge) {
            const range = getActualRange(sheet, ranges[0]);
            return traverseCellRange(range, () => { }, (row, col) => {
                if (isWidgetCell(sheet, row, col) || getTagContentByRange(sheet, row, col, 'tablesMap') != undefined) {
                    return true;
                }
            });
        }
        return firstMerge;
    }

    return isSingleMergedCell(sheet, ranges);
}

class YoudataContextMenuView extends GC.Spread.Sheets.ContextMenu.MenuView {
    getCommandOptions(menuItemData) {
        return menuItemData;
    }

    doMenuAction(menuItemData, isEnter, newSize) {
        if (menuItemData.trigger === 'change' || isEnter) {
            menuItemData.doAction(isEnter, newSize, menuItemData);
        } else {
            menuItemData.newSize = newSize;
        }
    }

    createMenuItemElement(menuItemData) {
        if (['gc.spread.changeColWidth', 'gc.spread.changeRowHeight',
            'gc.spread.insertRowsBefore', 'gc.spread.insertRowsAfter',
            'gc.spread.insertColsLeft', 'gc.spread.insertColsRight',
        ].includes(menuItemData.name)) {
            const menuItemContainer = super.createMenuItemElement(menuItemData)[0];
            menuItemContainer.innerHTML = '';
            if (!menuItemData.trigger) {
                menuItemData.trigger = 'enter';
            }
            if (menuItemData.trigger === 'enter') {
                menuItemData.command = () => {
                    menuItemData.doAction(false, menuItemData.newSize === undefined ? menuItemData.initSize : menuItemData.newSize, menuItemData);
                    delete menuItemData.newSize;
                };
            }
            const app = new Vue({
                ...Demo,
            });
            app.$mount(menuItemContainer);

            // ReactDOM.render(<MenuItem
            //     initValue={menuItemData.initSize}
            //     beforeText={menuItemData.beforeText}
            //     afterText={menuItemData.afterText}
            //     min={menuItemData.min === undefined ? 1 : menuItemData.min}
            //     step={menuItemData.step === undefined ? 1 : menuItemData.step}
            //     trigger={menuItemData.trigger}
            //     onValChange={this.doMenuAction.bind(this, menuItemData, false)}
            //     onEnter={this.doMenuAction.bind(this, menuItemData, true)}
            // />, menuItemContainer);
            return app.$el;
        }
        return super.createMenuItemElement(menuItemData);
    }
}

/**
 * 针对标签页的菜单修复
 * @param {Object[]} menuItems
 * @param {GCTYPE.Spread.Sheets.Workbook} spread
*/
function patchSheetTabMenu(menuItems, spread, evt) {
    const deleteItem = menuItems.find((item) => (item.workArea === 'sheetTab' && item.name === 'gc.spread.deleteSheet'));
    menuItems.splice(0, menuItems.length);
    menuItems.push({
        name: 'gc.spread.renameSheet',
        text: '重命名',
        workArea: 'sheetTab',
        command(context) {
            context._tabStrip._doMouseDbClick({
                pageX: evt.pageX,
                pageY: evt.pageY,
            });
        },
    });
    if (deleteItem) {
        if (spread.getSheetCount() === 1) {
            deleteItem.disable = true;
        } else {
            const deleteRawCmd = deleteItem.command;
            deleteItem.command = (context) => {
                // Modal.confirm({
                //     title: '提示',
                //     content: '确定要删除此工作表吗?',
                //     onOk() {
                //         context.commandManager().execute({
                //             cmd: deleteRawCmd,
                //         });
                //     },
                // });
            };
        }
        menuItems.push(deleteItem);
    }
}

/**
 * 针对单元格区（非浮动元素等）的菜单修复
 * @param {Object[]} menuItems
 * @param {GCTYPE.Spread.Sheets.Workbook} workbook
*/
function patchRangeMenu(menuItems, workbook, isImport, readonly) {
    const isReadonly = isImport || readonly;
    const copyItem = menuItems.find((item) => item.name === 'gc.spread.copy');
    const cutItem = menuItems.find((item) => item.name === 'gc.spread.cut');
    const pasteKey = isImport ? 'pasteValues' : 'pasteAll';
    const pasteItem = menuItems.find((item) => item.name === `gc.spread.${pasteKey}`);
    delete copyItem.iconClass;
    delete cutItem.iconClass;
    delete pasteItem.iconClass;
    delete pasteItem.group;
    pasteItem.text = '粘贴';
    menuItems.splice(0, menuItems.length);
    menuItems.push(copyItem);
    if (!readonly) {
        menuItems.push(cutItem, pasteItem);
    }
    if (isReadonly) {
        return;
    }
    menuItems.push(SepItem);
    const sheet = workbook.getActiveSheet();
    const sels = sheet.getSelections();
    if (getRangeMergeState(sheet, sels)) {
        menuItems.push({
            name: 'gc.spread.mergeCell',
            text: '合并单元格',
            workArea: 'sheetTab',
            command(context) {
                mergeCells(sheet, context);
            },
        });
    } else if (getRangeMergeState(sheet, sels, false)) {
        menuItems.push({
            name: 'gc.spread.splitCell',
            text: '拆分单元格',
            workArea: 'viewport',
            command(context) {
                unmergeCells(sheet, context);
            },
        });
    }
    const inDynamicTable = inDynamicTableArea(sheet, sels);
    function InsertRowOrRol(_isEnter, size, menuItemData) {
        if (_isEnter) {
            workbook.contextMenu._clearOldContextMenu();
        }

        const direction = menuItemData.name.includes('insertRows') ? 'row' : 'col';
        const step = (menuItemData.name.includes('Before') || menuItemData.name.includes('Left')) ? -1 : 1;
        const list = sels.map((sel) => getIndexByRangeStep(sheet, sel, direction, step));
        addRowCols(sheet, workbook, list, direction, size, inDynamicTable);
    }
    const _isFullSheet = isFullSheet(sels);
    const _isFullRow = isFullRowOrCol(sheet, sels, 'row');
    const _isFullCol = isFullRowOrCol(sheet, sels, 'col');
    if (!_isFullSheet) {
        if (_isFullRow) {
            let initSize = 1;
            if (sels.length === 1) {
                initSize = sels[0].rowCount;
            }
            menuItems.push({
                name: 'gc.spread.insertRowsBefore',
                workArea: 'rowHeader',
                beforeText: '向上插入',
                afterText: '行',
                initSize,
                doAction: InsertRowOrRol,
            });
            menuItems.push({
                name: 'gc.spread.insertRowsAfter',
                workArea: 'rowHeader',
                beforeText: '向下插入',
                afterText: '行',
                initSize,
                doAction: InsertRowOrRol,
            });
        } else if (_isFullCol) {
            let initSize = 1;
            if (sels.length === 1) {
                initSize = sels[0].colCount;
            }
            menuItems.push({
                name: 'gc.spread.insertColsLeft',
                workArea: 'colHeader',
                beforeText: '向左插入',
                afterText: '列',
                initSize,
                doAction: InsertRowOrRol,
            });
            menuItems.push({
                name: 'gc.spread.insertColsRight',
                workArea: 'colHeader',
                beforeText: '向右插入',
                afterText: '列',
                initSize,
                doAction: InsertRowOrRol,
            });
        } else if (sels.length === 1) {
            const insertItem = {
                name: 'gc.spread.insertRowCol',
                text: '插入行列',
                workArea: 'viewport',
            };
            insertItem.subMenu = [
                {
                    name: 'gc.spread.insertRowsBefore',
                    workArea: 'rowHeader',
                    beforeText: '向上插入',
                    afterText: '行',
                    initSize: sels[0].rowCount,
                    doAction: InsertRowOrRol,
                },
                {
                    name: 'gc.spread.insertRowsAfter',
                    workArea: 'rowHeader',
                    beforeText: '向下插入',
                    afterText: '行',
                    initSize: sels[0].rowCount,
                    doAction: InsertRowOrRol,
                },
                {
                    name: 'gc.spread.insertColsLeft',
                    workArea: 'colHeader',
                    beforeText: '向左插入',
                    afterText: '列',
                    initSize: sels[0].colCount,
                    doAction: InsertRowOrRol,
                },
                {
                    name: 'gc.spread.insertColsRight',
                    workArea: 'colHeader',
                    beforeText: '向右插入',
                    afterText: '列',
                    initSize: sels[0].colCount,
                    doAction: InsertRowOrRol,
                },
            ];
            menuItems.push(insertItem);
        }
    }
    const {
        showWidgetList,
        widgetList,
    } = getWidgetList(sheet, sels);
    if (showWidgetList && widgetList.length) {
        menuItems.push({
            name: 'gc.spread.insertWidget',
            text: '插入填报控件',
            workArea: 'viewport',
            subMenu: widgetList.map((w) => ({
                name: 'gc.spread.insertWidget.' + w.type,
                text: w.alias,
                workArea: 'viewport',
                iconClass: w.iconClassName || ('iconfont icon-' + w.iconName),
                command() {
                    if (w.type === 'SerialNumber') {
                        applySerialNumber(workbook, sheet, sels);
                    } else {
                        // dispatch({
                        //     type: 'spread/setActivePannel',
                        //     payload: {
                        //         type: w.type,
                        //         ranges: sels,
                        //         activePannelKey: 'widgetEdit',
                        //     },
                        // });
                        // dispatch({
                        //     type: 'datamodel/patchSettingData',
                        //     payload: {},
                        // });
                    }
                },
            })),
        });
    }
    let insertTypeModes = [
        {
            name: '现有单元格右移',
            type: 'right',
        },
        {
            name: '现有单元格下移',
            type: 'down',
        },
    ];
    let deleteTypeModes = [
        {
            name: '右侧单元格左移',
            type: 'left',
        },
        {
            name: '下方单元格上移',
            type: 'up',
        },
    ];

    if (!_isFullRow && !_isFullCol && !_isFullSheet) {
        if (inDynamicTable) {
            insertTypeModes = insertTypeModes.filter((item) => item.type === 'right');
            deleteTypeModes = deleteTypeModes.filter((item) => item.type === 'left');
        }
        if (insertTypeModes.length) {
            menuItems.push({
                name: 'gc.spread.insertCell',
                text: '插入单元格',
                workArea: 'viewport',
                subMenu: insertTypeModes.map((w) => ({
                    name: 'gc.spread.insertCell.' + w.type,
                    text: w.name,
                    workArea: 'viewport',
                    iconClass: w.iconClassName || ('iconfont icon-' + w.iconName),
                    command(context) {
                        if (inDynamicTable) {
                            dynamicTableInsertColExecutor(workbook, sheet, sels);
                        } else {
                            if (w.type === 'right') {
                                addCellAndMoveRight(sheet, workbook, sels);
                            } else if (w.type === 'down') {
                                addCellAndMoveDown(sheet, workbook, sels);
                            }
                        }
                    },
                })),
            });
        }
        if (deleteTypeModes.length) {
            menuItems.push({
                name: 'gc.spread.deleteCell',
                text: '删除单元格',
                workArea: 'viewport',
                subMenu: deleteTypeModes.map((w, i) => ({
                    name: 'gc.spread.deleteCell.' + w.type,
                    text: w.name,
                    workArea: 'viewport',
                    iconClass: w.iconClassName || ('iconfont icon-' + w.iconName),
                    command(context) {
                        if (inDynamicTable) {
                            dynamicTableDeleteColExecutor(workbook, sheet, sels);
                        } else {
                            if (w.type === 'up') {
                                deleteCellAndMoveUp(sheet, workbook, sels);
                            } else if (w.type === 'left') {
                                deleteCellAndMoveLeft(sheet, workbook, sels);
                            }
                        }
                    },
                })),
            });
        }
    }

    if (_isFullRow || _isFullSheet) {
        menuItems.push({
            name: 'gc.spread.changeRowHeight',
            workArea: 'viewport',
            initSize: sheet.getRowHeight(Math.max(sels[0].row, 0)),
            beforeText: '行高设为',
            afterText: '像素',
            step: 3,
            min: 0,
            trigger: 'change',
            doAction(isEnter, newSize) {
                if (isEnter) {
                    workbook.contextMenu._clearOldContextMenu();
                } else {
                    const list = getRangeRowOrColList(sels, 'row');
                    setRowColSize(sheet, workbook, list, 'row', newSize);
                }
            },
        });
        menuItems.push({
            name: 'gc.spread.autoFitRow',
            text: '行高自适应',
            workArea: 'viewport',
            command(context) {
                setWordWrap(sheet, context);
            },
        });
    }
    if (_isFullCol || _isFullSheet) {
        menuItems.push({
            name: 'gc.spread.changeColWidth',
            workArea: 'viewport',
            initSize: sheet.getColumnWidth(Math.max(sels[0].col, 0)),
            beforeText: '列宽设为',
            afterText: '像素',
            step: 3,
            min: 0,
            trigger: 'change',
            doAction(isEnter, newSize) {
                if (isEnter) {
                    workbook.contextMenu._clearOldContextMenu();
                } else {
                    const list = getRangeRowOrColList(sels, 'col');
                    setRowColSize(sheet, workbook, list, 'col', newSize);
                }
            },
        });
        menuItems.push({
            name: 'gc.spread.autoFitColumn',
            text: '列宽自适应',
            workArea: 'viewport',
            command(context) {
                context.commandManager().execute({
                    cmd: 'autoFitColumn',
                    sheetName: sheet.name(),
                    columns: getRangeRowOrColList(sels, 'col').map((idx) => ({ col: idx })),
                    rowHeader: false,
                });
            },
        });
    }

    menuItems.push(SepItem);
    let clearWidgetOrContentList = [];
    function clearCell(context, cmdOptions) {
        if (cmdOptions.clearType === 1 || cmdOptions.clearType === 0) {
            // dispatch({
            //     type: 'spread/toggleLinkWidget',
            //     payload: {
            //         showLinkWidget: false,
            //     },
            // });
        }
        if (cmdOptions.clearType === 3 || cmdOptions.clearType === 0) {
            if (inDynamicTableArea(sheet, sels)) {
                // dispatch({
                //     type: 'spread/setActiveWidget',
                //     payload: null,
                // });
            } else {
                // dispatch({
                //     type: 'spread/setActivePannel',
                //     payload: {
                //         activePannelKey: undefined,
                //     },
                // });
            }
        }
        clearRange(sheet, context, sels, cmdOptions.clearType);
    }
    const clearContentItem = {
        name: 'gc.spread.clearCell.content',
        text: '清除内容',
        workArea: 'viewport',
        clearType: 1,
        command: clearCell,
    };
    const clearWidgetItem = {
        name: 'gc.spread.clearCell.widget',
        text: '清除填报控件',
        clearType: 3,
        workArea: 'viewport',
        command: clearCell,
    };
    if (isSingleCell(sheet, sels)) {
        const isWidget = isWidgetCell(sheet, sels[0].row, sels[0].col);
        if (isWidget) {
            clearWidgetOrContentList = [clearWidgetItem];
        } else {
            clearWidgetOrContentList = [clearContentItem];
        }
    } else {
        if (selectionsContainerWidget(sheet, sels)) {
            clearWidgetOrContentList = [clearWidgetItem, clearContentItem];
        } else {
            clearWidgetOrContentList = [clearContentItem];
        }
    }
    menuItems.push({
        name: 'gc.spread.clearCell',
        text: '清除',
        workArea: 'viewport',
        subMenu: [
            ...clearWidgetOrContentList,
            {
                name: 'gc.spread.clearCell.style',
                text: '清除格式',
                clearType: 2,
                workArea: 'viewport',
                command: clearCell,
            },
            {
                name: 'gc.spread.clearCell.all',
                text: '清除全部',
                clearType: 0,
                workArea: 'viewport',
                command: clearCell,
            },
        ],
    });
    if (!_isFullSheet) {
        if (_isFullRow) {
            menuItems.push({
                command: 'gc.spread.contextMenu.deleteRows',
                name: 'gc.spread.deleteRows',
                workArea: 'rowHeader',
                text: '删除' + getRangeRowOrColDesc(sels, 'row'),
            });
        } else if (_isFullCol) {
            menuItems.push({
                // command: 'gc.spread.contextMenu.deleteColumns',
                name: 'gc.spread.deleteColumns',
                workArea: 'colHeader',
                text: '删除' + getRangeRowOrColDesc(sels, 'col'),
                command() {
                    deleteColumns(sheet, workbook, sels, inDynamicTable);
                },
            });
        } else if (sels.length === 1) {
            const deleteItem = {
                name: 'gc.spread.deleteRowOrCol',
                text: '删除行列',
                workArea: 'viewport',
            };
            deleteItem.subMenu = [
                {
                    command: 'gc.spread.contextMenu.deleteRows',
                    name: 'gc.spread.deleteRows',
                    workArea: 'viewport',
                    text: '删除' + getRangeRowOrColDesc(sels, 'row'),
                },
                {
                    // command: 'gc.spread.contextMenu.deleteColumns',
                    name: 'gc.spread.deleteColumns',
                    workArea: 'viewport',
                    text: '删除' + getRangeRowOrColDesc(sels, 'col'),
                    command() {
                        deleteColumns(sheet, workbook, sels, inDynamicTable);
                    },
                },
            ];
            menuItems.push(deleteItem);
        }
    }
}

/**
 * 针对浮动元素的菜单修复
 * @param {Object[]} menuData
 * @param {Object[]} menuItems
 * @param {GCTYPE.Spread.Sheets.Workbook} workbook
*/
function patchFloatingObjectMenu(menuData, menuItems, isReadonly) {
    const copyItem = menuData.find((item) => item.name === 'gc.spread.copy');
    const cutItem = menuData.find((item) => item.name === 'gc.spread.cut');
    const pasteItem = menuData.find((item) => item.name === 'gc.spread.pasteAll');
    delete copyItem.iconClass;
    delete cutItem.iconClass;
    delete pasteItem.iconClass;
    delete pasteItem.group;
    copyItem.command = 'copyFloatingObjects';
    cutItem.command = 'cutFloatingObjects';
    pasteItem.text = '粘贴';
    menuItems.push(copyItem, cutItem, pasteItem);
    menuItems.push({
        name: 'gc.spread.deletePicture',
        text: '删除',
        workArea: 'sheetTab',
        command: 'deleteFloatingObjects',
    });
}

/**
 * @param {GCTYPE.Spread.Sheets.Workbook} workbook
 * @param {Object} tabbarOption
*/
export default function (workbook, tabbarOption, isImport, readonly) {
    const isReadonly = isImport || readonly;
    workbook.contextMenu.menuView = new YoudataContextMenuView();
    workbook.contextMenu.onOpenMenu = function (menuData, itemsDataForShown, hitInfo, spread, evt) {
        if (itemsDataForShown.length === 0) {
            const floatingObject = _.get(hitInfo.worksheetHitInfo, ['floatingObjectHitInfo', 'floatingObject']);
            if (!isReadonly && floatingObject && floatingObject.typeName === '1') { // picture
                patchFloatingObjectMenu(menuData, itemsDataForShown);
            }
            return;
        }
        if (hitInfo.tabStripHitInfo && hitInfo.tabStripHitInfo.sheetTab
            && hitInfo.tabStripHitInfo.sheetTab.sheetName !== 'newSheet'
            && tabbarOption.tabEditable !== false) {
            patchSheetTabMenu(itemsDataForShown, spread, evt);
        } else if (hitInfo.worksheetHitInfo
            && (
                (hitInfo.worksheetHitInfo.hitTestType === 3
                    && !hitInfo.worksheetHitInfo.floatingObjectHitInfo
                    && !hitInfo.worksheetHitInfo.shapeHitInfo
                    && !hitInfo.worksheetHitInfo.pivotTableInfo
                    && !hitInfo.worksheetHitInfo.commentHitInfo
                )
                || [0, 1, 2].includes(hitInfo.worksheetHitInfo.hitTestType)
            )
        ) {
            patchRangeMenu(itemsDataForShown, spread, isImport, readonly);
        } else {
            itemsDataForShown.splice(0, itemsDataForShown.length);
        }
    };
    const widgetSwitchEvent = GC.Spread.Sheets.Events.SelectionChanged + '.widgetSwitch';
    function initWidgetSwitch(sheet) {
        sheet.unbind(widgetSwitchEvent);
        sheet.bind(widgetSwitchEvent, (e, info) => {
            const sels = info.newSelections;
            if (isSingleCell(sheet, sels)) {
                const widget = getSelectedWidget(sheet.getCellType(sels[0].row, sels[0].col));
                if (widget && widget.type === 'Select') {
                    if (_.get(widget, 'settings.selectionMethod.value') === 'multiple') {
                        widget.type = 'MultipleSelect';
                    }
                }
                const table = getTable(sheet, sels);
                const dynamicTable = table && table.name();
                if (widget && widget.type !== 'SerialNumber' || dynamicTable) {
                    // dispatch({
                    //     type: 'spread/setActivePannel',
                    //     payload: {
                    //         ranges: sels,
                    //         activePannelKey: 'widgetEdit',
                    //         widget: widget && widget.type === 'SerialNumber' ? null : widget,
                    //         dynamicTable,
                    //     },
                    // });
                } else {
                    // dispatch({
                    //     type: 'spread/setActivePannel',
                    //     payload: {
                    //         activePannelKey: null,
                    //     },
                    // });
                }
            } else {
                // dispatch({
                //     type: 'spread/setActivePannel',
                //     payload: {
                //         activePannelKey: null,
                //     },
                // });
            }
        });
    }
    if (!isReadonly) {
        initWidgetSwitch(workbook.getActiveSheet());
        // 绑定row||col改变,然后改变绑定的ranges
        const changeBindRangesWhenRolOrColChange = function (args) {
            if (['addRows', 'deleteRows', 'addColumns', 'deleteColumns', 'tableInsertColumns', 'tableDeleteColumns'].includes(args && args.propertyName)) {
                // dispatch({
                //     type: 'form/exchangeTableRangesByRowChange',
                //     payload: { workbook },
                // });
                // dispatch({
                //     type: 'spread/exchangeRuleRangesByRowChange',
                //     payload: { workbook },
                // });
            }
        };
        workbook.bind(GC.Spread.Sheets.Events.RowChanged + '.changeBindRange', (_sender, args) => {
            changeBindRangesWhenRolOrColChange(args);
        });
        workbook.bind(GC.Spread.Sheets.Events.ColumnChanged + '.changeBindRange', (_sender, args) => {
            changeBindRangesWhenRolOrColChange(args);
        });
        // 动态表列改变
        workbook.bind(GC.Spread.Sheets.Events.TableColumnsChanged + '.changeBindRange', (_sender, args) => {
            changeBindRangesWhenRolOrColChange(args);
        });

        // sheetName更改了之后替换ranges里面的内容
        workbook.bind(GC.Spread.Sheets.Events.SheetNameChanged + '.exchangeRanges', (_sender, args) => {
            const { newValue, oldValue } = args;
            ['form/exchangeTableRangesSheetNameChange', 'spread/exchangeRuleRangesBySheetNameChange'].forEach((reducerName) => {
                // dispatch({
                //     type: reducerName,
                //     payload: {
                //         newSheetName: newValue,
                //         oldSheetName: oldValue,
                //         workbook,
                //     },
                // });
            });
        });
        workbook.bind(GC.Spread.Sheets.Events.SheetChanged + '.initMenu', (_sender, args) => {
            if (args.propertyName === 'insertSheet') {
                const sheet = workbook.getSheet(args.sheetIndex);
                initWidgetSwitch(sheet);
            }
            if (args.propertyName === 'isSelected' && !args.newValue) {
                const sheet = workbook.getSheet(args.sheetIndex);
                sheet.unbind(widgetSwitchEvent);
            }
            if (args.propertyName === 'isSelected' && args.newValue) {
                const sheet = workbook.getSheet(args.sheetIndex);
                if (sheet) {
                    initWidgetSwitch(sheet);
                }
            }
        });
        // 执行命令后，更新已保存状态
        workbook.commandManager().addListener('toggleSpreadState', (args) => {
            if (!['gc.spread.contextMenu.copy', 'copy', 'openList'].includes(args.command.cmd)) {
                // dispatch({
                //     type: 'form/toggleSaved',
                //     payload: false,
                // });
            }
        });
    }
}

