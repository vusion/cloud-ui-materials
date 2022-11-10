import GC from '@spread';
import {clearCellStyle, clearCellWidget, getActualCellRange, getActualRange, getFieldsFromTag, getFieldValidator, traverseCellRange} from '../utils';
import registerCmd from './util';
import consts from '../consts';

export function setColor(workbook) {
  registerCmd(workbook, 'setColor', (options) => {
    const {
      sheet,
      method,
      value,
      sels
    } = options;

    sheet.suspendPaint();
    for (let n = 0; n < sels.length; n++) {
      let sel = getActualRange(sheet, sels[n]);
      sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount)[method](value);
    }
    sheet.resumePaint();
  });
}


export function isBindFieldCell(sheet, row, col) {
  let tag = sheet.getTag(row, col);
  if (tag && tag.tablesMap && getTagKeys(tag.tablesMap).length) {
    return true;
  }
  return false;
}

export function setStyle(workbook) {
  registerCmd(workbook, 'setStyle', (options) => {
    const {
      sheet,
      prop,
      isLabelStyle,
      optionValue1,
      optionValue2,
      selections
    } = options;
    let styleEle = document.createElement('span'),
      defaultStyle = sheet.getDefaultStyle();

    // eslint-disable-next-line no-inner-declarations
    function updateStyleFont(style) {
      if (!style.font) {
        style.font = defaultStyle.font || consts.defaultFont;
      }
      styleEle.style.font = style.font;
      let styleFont = styleEle.style[prop];
      if (styleFont === optionValue1[0] || styleFont === optionValue1[1]) {
        if (defaultStyle.font) {
          styleEle.style.font = defaultStyle.font;
          let defaultFontProp = styleEle.style[prop];
          styleEle.style.font = style.font;
          styleEle.style[prop] = defaultFontProp;
        }
        else {
          styleEle.style[prop] = optionValue2;
        }
      } else {
        styleEle.style[prop] = optionValue1[0];
      }
      style.font = styleEle.style.font;
    }

    sheet.suspendPaint();
    for (let n = 0; n < selections.length; n++) {
      let sel = getActualRange(sheet, selections[n]);
      for (let r = sel.row; r < sel.row + sel.rowCount; r++) {
        for (let c = sel.col; c < sel.col + sel.colCount; c++) {
          let style = sheet.getStyle(r, c);
          if (!style) {
            style = new GC.Spread.Sheets.Style();
          }
          // reset themeFont to make sure font be used
          style.themeFont = undefined;
          if (isLabelStyle) {
            if (!style.labelOptions) {
              style.labelOptions = {};
            }
            updateStyleFont(style.labelOptions);
          } else {
            updateStyleFont(style);
          }

          sheet.setStyle(r, c, style);
        }
      }
    }
    sheet.resumePaint();
    styleEle = null;
  });
}

/**
 * 边框设置
 * @param {*} borderType
 * @param {*} borderStyle
 * @returns
 */
function getBorderSettings(borderType, borderStyle) {
  let result = [];

  switch (borderType) {
    case 'outside':
      result.push({lineStyle: borderStyle, options: {outline: true}});
      break;

    case 'inside':
      result.push({lineStyle: borderStyle, options: {innerHorizontal: true}});
      result.push({lineStyle: borderStyle, options: {innerVertical: true}});
      break;

    case 'all':
    case 'none':
      result.push({lineStyle: borderStyle, options: {all: true}});
      break;

    case 'left':
      result.push({lineStyle: borderStyle, options: {left: true}});
      break;

    case 'innerVertical':
      result.push({lineStyle: borderStyle, options: {innerVertical: true}});
      break;

    case 'right':
      result.push({lineStyle: borderStyle, options: {right: true}});
      break;

    case 'top':
      result.push({lineStyle: borderStyle, options: {top: true}});
      break;

    case 'innerHorizontal':
      result.push({lineStyle: borderStyle, options: {innerHorizontal: true}});
      break;

    case 'bottom':
      result.push({lineStyle: borderStyle, options: {bottom: true}});
      break;
    case 'diagonalUp':
      result.push({lineStyle: borderStyle, options: {up: true}});
      break;
    case 'diagonalDown':
      result.push({lineStyle: borderStyle, options: {down: true}});

      break;
  }

  return result;
}

function setRangeBorder(sheet, range, options) {
  let outline = options.all || options.outline,
    rowCount = sheet.getRowCount(),
    columnCount = sheet.getColumnCount(),
    startRow = range.row, endRow = startRow + range.rowCount - 1,
    startCol = range.col, endCol = startCol + range.colCount - 1;

  // update related borders for all cells arround the range

  // left side
  if ((startCol > 0) && (outline || options.left)) {
    sheet.getRange(startRow, startCol - 1, range.rowCount, 1).borderRight(undefined);
  }
  // top side
  if ((startRow > 0) && (outline || options.top)) {
    sheet.getRange(startRow - 1, startCol, 1, range.colCount).borderBottom(undefined);
  }
  // right side
  if ((endCol < columnCount - 1) && (outline || options.right)) {
    sheet.getRange(startRow, endCol + 1, range.rowCount, 1).borderLeft(undefined);
  }
  // bottom side
  if ((endRow < rowCount - 1) && (outline || options.bottom)) {
    sheet.getRange(endRow + 1, startCol, 1, range.colCount).borderTop(undefined);
  }
}


export function setBorderlines(workbook) {
  console.log('resgister lines')
  // debugger
  registerCmd(workbook, 'setBorderlines', (options) => {
    const {
      sheet,
      borderType,
      borderStyle,
      borderColor,
      sels
    } = options;
    let settings = getBorderSettings(borderType, borderStyle);

    sheet.suspendPaint();

    for (let n = 0; n < sels.length; n++) {
      let sel = getActualCellRange(sheet, sels[n]);
      settings.forEach((setting) => {
        let lineBorder = new GC.Spread.Sheets.LineBorder(borderColor, setting.lineStyle);
        let options = setting.options;
        if(options.up) {
          sel.diagonalUp(lineBorder);
        } else if (options.down) {
          sel.diagonalDown(lineBorder);
        } else if (borderType === 'none') {
          sel.setBorder(undefined, setting.options);
        } else {
          sel.setBorder(lineBorder, setting.options);
          setRangeBorder(sheet, sel, setting.options);
        }
      });
    }
    sheet.resumePaint();
    console.log('setBorderlines done')
  });
}

export function setTextDecoration(workbook) {
  registerCmd(workbook, 'setTextDecoration', (options) => {
    const {
      sheet,
      flag,
      sels
    } = options;

    sheet.suspendPaint();
    for (let n = 0; n < sels.length; n++) {
      let sel = getActualRange(sheet, sels[n]),
        textDecoration = sheet.getCell(sel.row, sel.col).textDecoration();
      if ((textDecoration & flag) === flag) {
        textDecoration = textDecoration - flag;
      } else {
        textDecoration = textDecoration | flag;
      }
      sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).textDecoration(textDecoration);
    }
    sheet.resumePaint();
  });
}

export function setAlignment(workbook) {
  registerCmd(workbook, 'setAlignment', (options) => {
    let {
      sheet,
      type,
      value,
      sels
    } = options;
    let align;

    value = value.toLowerCase();

    if (value === 'middle') {
      value = 'center';
    }

    if (type === 'hAlign') {
      align = GC.Spread.Sheets.HorizontalAlign[value];
    } else {
      align = GC.Spread.Sheets.VerticalAlign[value];
    }

    sheet.suspendPaint();
    for (let n = 0; n < sels.length; n++) {
      let sel = getActualRange(sheet, sels[n]);
      sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount)[type](align);
    }
    sheet.resumePaint();
  });
}

export function mergeCells(workbook) {
  registerCmd(workbook, 'mergeCells', (options) => {
    let {
      sheet,
      sels
    } = options;

    for (let n = 0; n < sels.length; n++) {
      let sel = getActualRange(sheet, sels[n]);
      sheet.addSpan(sel.row, sel.col, sel.rowCount, sel.colCount);
    }
  });
}

export function unmergeCells(workbook) {
  registerCmd(workbook, 'unmergeCells', (options) => {
    let {
      sheet,
      sels
    } = options;
    // eslint-disable-next-line no-inner-declarations
    function removeSpan(range) {
      sheet.removeSpan(range.row, range.col);
    }
    for (let n = 0; n < sels.length; n++) {
      let sel = getActualRange(sheet, sels[n]);
      sheet.getSpans(sel).forEach(removeSpan);
    }
  });
}

export function setWordWrap(workbook) {
  registerCmd(workbook, 'setWordWrap', (options) => {
    let {
      sheet,
      isToggle,
      sels
    } = options;

    sheet.suspendPaint();
    for (let n = 0; n < sels.length; n++) {
      let sel = getActualRange(sheet, sels[n]),
        wordWrap = isToggle ? !sheet.getCell(sel.row, sel.col).wordWrap() : true,
        startRow = sel.row,
        endRow = sel.row + sel.rowCount - 1;

      sheet.getRange(startRow, sel.col, sel.rowCount, sel.colCount).wordWrap(wordWrap);

      for (let row = startRow; row <= endRow; row++) {
        sheet.autoFitRow(row);
      }
    }
    sheet.resumePaint();
  });
}

export function setRowColSize(workbook) {
  registerCmd(workbook, 'setRowColSize', (options) => {
    /** @type {{sheet: GCTYPE.Spread.Sheets.Worksheet}} */
    let {
      sheet,
      list,
      size,
      direction,
    } = options;
    sheet.suspendPaint();
    list.forEach((idx) => {
      if (direction === 'row') {
        sheet.setRowHeight(idx, size);
      }
      else {
        sheet.setColumnWidth(idx, size);
      }
    });
    sheet.resumePaint();
  });
}
export function brushStyle(workbook) {
  registerCmd(workbook, 'brushStyle', (options) => {
    /** @type {{sheet: GCTYPE.Spread.Sheets.Worksheet}} */
    let {
      sheet,
      originRange: sels,
      col,
      row
    } = options;
    sheet.suspendPaint();
    let sel = getActualRange(sheet, sels[0]);
    let rowStart = sel.row;
    let colStart = sel.col;
    for (let i = 0; i < sel.rowCount; i++) {
      for (let j = 0; j < sel.colCount; j++) {
        const originRow = rowStart + i;
        const originCol = colStart + j;
        const targetRow = row + i;
        const targetCol = col + j;
        let originStyle = (sheet.getStyle(originRow, originCol, GC.Spread.Sheets.SheetArea.viewport) || sheet.getDefaultStyle()).clone() || {};
        const targetStyle = sheet.getStyle(targetRow, targetCol, GC.Spread.Sheets.SheetArea.viewport) || {};
        consts.ignoreStyles.forEach(key => {
          delete originStyle[key];
          if (targetStyle[key]) {
            originStyle[key] = targetStyle[key];
          }
        });
        sheet.setStyle(targetRow, targetCol, originStyle);
      }
    }
    sheet.resumePaint();
  });
}

export function clearRange(workbook) {
  registerCmd(workbook, 'clearRange', (options) => {
    /** @type {{sheet: GCTYPE.Spread.Sheets.Worksheet, ranges: Array.<GCTYPE.Spread.Sheets.Range>}} */
    let {
      sheet,
      ranges,
      clearType,
    } = options;
    sheet.suspendPaint();
    function clearSingleRange(range, type) {
      if (type === 1) { // 内容
        sheet.clear(range.row, range.col, range.rowCount, range.colCount, 3, 1);
        sheet.clear(range.row, range.col, range.rowCount, range.colCount, GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.hyperlink);
      }
      else if (type === 2) { // 样式
        range = getActualRange(sheet, range);
        traverseCellRange(range, (row, col) => {
          clearCellStyle(sheet, row, col);
        });
      }
      else if (type === 3) { // 控件
        range = getActualRange(sheet, range);
        traverseCellRange(range, (row, col) => {
          clearCellWidget(sheet, row, col);
          // 清除填报控件后保留字段的校验器
          let dv = null;
          let fields = getFieldsFromTag(sheet, row, col);
          if (fields.length) {
            dv = getFieldValidator(fields[0].type);
          }
          sheet.setDataValidator(row, col, dv);
        });
      }
      else if (type === 0) {
        sheet.clear(range.row, range.col, range.rowCount, range.colCount, 3, 1);
        sheet.clear(range.row, range.col, range.rowCount, range.colCount, 3, 2);
        sheet.clear(range.row, range.col, range.rowCount, range.colCount, GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.hyperlink);
      }
    }
    for (let r = 0; r < ranges.length; r++) {
      clearSingleRange(ranges[r], clearType);
    }
    sheet.resumePaint();
  });
}
