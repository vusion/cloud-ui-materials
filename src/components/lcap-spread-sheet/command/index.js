import {
  setStyle,
  setColor,
  setBorderlines,
  setTextDecoration,
  setAlignment,
  mergeCells,
  unmergeCells,
  setWordWrap,
  setRowColSize,
  clearRange,
  brushStyle
} from './cellStyle';
import { setFormat, decreaseDecimal, increaseDecimal } from './format';


export default function initCommand(workbook) {
  setStyle(workbook);
  setColor(workbook);
  brushStyle(workbook);
  setBorderlines(workbook);
  setTextDecoration(workbook);
  setAlignment(workbook);
  mergeCells(workbook);
  unmergeCells(workbook);
  setWordWrap(workbook);
  setRowColSize(workbook);
  setFormat(workbook);
  clearRange(workbook);
  decreaseDecimal(workbook);
  increaseDecimal(workbook);
  console.log('initCommand');
}
