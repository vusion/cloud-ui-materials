import GC from '@spread';
import registerCmd, {getSubStrings} from './util';

function execInSelections(sheet, styleProperty, selections, func) {
  sheet.suspendPaint();
  for (let k = 0; k < selections.length; k++) {
    let selection = selections[k];
    let col = selection.col, row = selection.row,
      rowCount = selection.rowCount, colCount = selection.colCount;
    if ((col === -1 || row === -1) && styleProperty) {
      let style, r, c;
      // whole sheet was selected, need set row / column' style one by one
      if (col === -1 && row === -1) {
        for (r = 0; r < rowCount; r++) {
          // eslint-disable-next-line no-cond-assign
          if ((style = sheet.getStyle(r, -1)) && style[styleProperty] !== undefined) {
            func(sheet, r, -1);
          }
        }
        for (c = 0; c < colCount; c++) {
          // eslint-disable-next-line no-cond-assign
          if ((style = sheet.getStyle(-1, c)) && style[styleProperty] !== undefined) {
            func(sheet, -1, c);
          }
        }
      }
      // Get actual range for whole rows / columns / sheet selection
      if (col === -1) {
        col = 0;
      }
      if (row === -1) {
        row = 0;
      }
      // set to each cell with style that in the adjusted selection range
      for (let i = 0; i < rowCount; i++) {
        r = row + i;
        for (let j = 0; j < colCount; j++) {
          c = col + j;
          // eslint-disable-next-line no-cond-assign
          if ((style = sheet.getStyle(r, c)) && style[styleProperty] !== undefined) {
            func(sheet, r, c);
          }
        }
      }
    }
    if (selection.col == -1 && selection.row == -1) {
      func(sheet, -1, -1);
    }
    else if (selection.row == -1) {
      for (let i = 0; i < selection.colCount; i++) {
        func(sheet, -1, selection.col + i);
      }
    }
    else if (selection.col == -1) {
      for (let i = 0; i < selection.rowCount; i++) {
        func(sheet, selection.row + i, -1);
      }
    }
    else {
      for (let i = 0; i < selection.rowCount; i++) {
        for (let j = 0; j < selection.colCount; j++) {
          func(sheet, selection.row + i, selection.col + j);
        }
      }
    }
  }
  sheet.resumePaint();
}

function setFormatter(value, workbook, selections) {
  /** @type {GCTYPE.Spread.Sheets.Worksheet} */
  let sheet = workbook.getActiveSheet();

  execInSelections(sheet, 'formatter', selections, function (sheet, row, column) {
    let style = sheet.getStyle(row, column) || new GC.Spread.Sheets.Style();
    let formatString = value && value.trim(), isValidFormat = true;
    if (formatString && formatString[0] !== '=' && formatString.match(/\{\{=.*\}\}/g) === null) {
      try {
        new GC.Spread.Formatter.GeneralFormatter(formatString);
      } catch (e) {
        isValidFormat = false;
      }
    }
    if (isValidFormat) {
      style.formatter = value;
      sheet.setStyle(row, column, style);
    }
  });
}
export function setFormat(workbook) {
  registerCmd(workbook, 'setFormat', (options) => {
    const {value, selections} = options;
    setFormatter(value, workbook, selections);
  });
}

//This method is used to get the formatter which not include the string and color
//in order to not misleading with the charactor 'e' / 'E' in scientific notation.
function getScientificNotationCheckingFormattter(formatter) {
  if (!formatter) {
    return formatter;
  }
  let i;
  let signalQuoteSubStrings = getSubStrings(formatter, '\'', '\'');
  for (i = 0; i < signalQuoteSubStrings.length; i++) {
    formatter = formatter.replace(signalQuoteSubStrings[i], '');
  }
  let doubleQuoteSubStrings = getSubStrings(formatter, '\'', '\'');
  for (i = 0; i < doubleQuoteSubStrings.length; i++) {
    formatter = formatter.replace(doubleQuoteSubStrings[i], '');
  }
  let colorStrings = getSubStrings(formatter, '[', ']');
  for (i = 0; i < colorStrings.length; i++) {
    formatter = formatter.replace(colorStrings[i], '');
  }
  return formatter;
}

export function increaseDecimal(workbook) {
  registerCmd(workbook, 'increaseDecimal', ({
    seles
  }) => {
    /** @type {GCTYPE.Spread.Sheets.Worksheet} */
    let sheet = workbook.getActiveSheet();

    sheet.suspendPaint();
    let formatString = '';
    for (let p = 0; p < seles.length; p++) {
      let selectCells = seles[p];
      let defaultActiveCell = sheet.getCell(selectCells.row, selectCells.col);
      let defaultFormatter = defaultActiveCell.formatter();
      let defaultText = defaultActiveCell.value();
      let i;
      if (defaultText !== undefined && defaultText !== null) {
        let zero = '0';
        let numberSign = '#';
        let decimalPoint = '.';
        let zeroPointZero = '0' + decimalPoint + '0';

        let scientificNotationCheckingFormatter = getScientificNotationCheckingFormattter(defaultFormatter);
        if (!defaultFormatter || (defaultFormatter === 'General' || (scientificNotationCheckingFormatter && (scientificNotationCheckingFormatter.indexOf('E') >= 0 || scientificNotationCheckingFormatter.indexOf('e') >= 0)))) {
          scientificNotationCheckingFormatter = zeroPointZero;
          if ((!isNaN(defaultText)) && ((defaultText + '').split('.').length > 1)) {
            let afterPointZero = (defaultText + '').split('.')[1].length;
            for (let m = 0; m < afterPointZero; m++) {
              scientificNotationCheckingFormatter = scientificNotationCheckingFormatter + '0';
            }
          }
        } else {
          formatString = defaultFormatter;
          let formatters = formatString.split(';');
          for (i = 0; i < formatters.length && i < 2; i++) {
            if (formatters[i] && formatters[i].indexOf('/') < 0 && formatters[i].indexOf(':') < 0 && formatters[i].indexOf('?') < 0) {
              let indexOfDecimalPoint = formatters[i].lastIndexOf(decimalPoint);
              if (indexOfDecimalPoint !== -1) {
                formatters[i] = formatters[i].slice(0, indexOfDecimalPoint + 1) + zero + formatters[i].slice(indexOfDecimalPoint + 1);
              } else {
                let indexOfZero = formatters[i].lastIndexOf(zero);
                let indexOfNumberSign = formatters[i].lastIndexOf(numberSign);
                let insertIndex = indexOfZero > indexOfNumberSign ? indexOfZero : indexOfNumberSign;
                if (insertIndex >= 0) {
                  formatters[i] = formatters[i].slice(0, insertIndex + 1) + decimalPoint + zero + formatters[i].slice(insertIndex + 1);
                }
              }
            }
          }
          formatString = formatters.join(';');
          scientificNotationCheckingFormatter = formatString;
        }
        for (let r = selectCells.row; r < selectCells.rowCount + selectCells.row; r++) {
          for (let c = selectCells.col; c < selectCells.colCount + selectCells.col; c++) {
            let style = sheet.getActualStyle(r, c);
            style.formatter = scientificNotationCheckingFormatter;
            style.locked = undefined;
            sheet.setStyle(r, c, style);
          }
        }
      }
    }
    sheet.resumePaint();
  });
}

export function decreaseDecimal(workbook) {
  registerCmd(workbook, 'decreaseDecimal', ({
    seles
  }) => {
    /** @type {GCTYPE.Spread.Sheets.Worksheet} */
    let sheet = workbook.getActiveSheet();
    sheet.suspendPaint();
    for (let p = 0; p < seles.length; p++) {
      let selectCells = seles[p];
      let defaultActiveCell = sheet.getCell(selectCells.row, selectCells.col);
      let defaultFormatter = defaultActiveCell.formatter();
      let defaultText = defaultActiveCell.value();
      let decimalPoint = '.';
      let i;
      if (defaultText !== undefined && defaultText !== null) {
        let formatString = null;
        if (!defaultFormatter || defaultFormatter === 'General') {
          if (!isNaN(defaultText)) {
            let result = String(defaultText).split('.');
            if (result.length === 2) {
              result[0] = '0';
              let isScience = false;
              let sb = '';
              for (i = 0; i < result[1].length - 1; i++) {
                if ((i + 1 < result[1].length) && (result[1].charAt(i + 1) === 'e' || result[1].charAt(i + 1) === 'E')) {
                  isScience = true;
                  break;
                }
                sb = sb + ('0');
              }

              if (isScience) {
                sb = sb + ('E+00');
              }
              result[1] = sb.toString();
              formatString = result[0] + (result[1] !== '' ? decimalPoint + result[1] : '');
            }
          }
        } else {
          formatString = defaultFormatter;
          let formatters = formatString.split(';');
          for (i = 0; i < formatters.length && i < 2; i++) {
            if (formatters[i] && formatters[i].indexOf('/') < 0 && formatters[i].indexOf(':') < 0 && formatters[i].indexOf('?') < 0) {
              let indexOfDecimalPoint = formatters[i].lastIndexOf(decimalPoint);
              if (indexOfDecimalPoint !== -1 && indexOfDecimalPoint + 1 < formatters[i].length) {
                formatters[i] = formatters[i].slice(0, indexOfDecimalPoint + 1) + formatters[i].slice(indexOfDecimalPoint + 2);
                let tempString = indexOfDecimalPoint + 1 < formatters[i].length ? formatters[i].substr(indexOfDecimalPoint + 1, 1) : '';
                if (tempString === '' || tempString !== '0') {
                  formatters[i] = formatters[i].slice(0, indexOfDecimalPoint) + formatters[i].slice(indexOfDecimalPoint + 1);
                }
              } else {
                //do nothing.
              }
            }
          }
          formatString = formatters.join(';');
        }
        for (let r = selectCells.row; r < selectCells.rowCount + selectCells.row; r++) {
          for (let c = selectCells.col; c < selectCells.colCount + selectCells.col; c++) {
            let style = sheet.getActualStyle(r, c);
            style.locked = undefined;
            style.formatter = formatString;
            sheet.setStyle(r, c, style);
          }
        }
      }
    }
    sheet.resumePaint();
  });
}
