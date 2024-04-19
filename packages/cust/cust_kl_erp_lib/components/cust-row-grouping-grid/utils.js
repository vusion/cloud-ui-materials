import moment from "moment";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import  "flatpickr/dist/l10n/zh.js";


function dateFilterFunction(headerValue, rowValue, rowData, filterParams){
   var date = moment(headerValue);
   
   var value = moment(rowValue)
   return date.isSame(value, 'day');
}

function getHeaderFilter(typeName) {
  switch (typeName) {
    case "Date":
    case "DateTime":
      return function(cell, onRendered, success, cancel, editorParams) {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.style = "padding: 4px;width: 100%;box-sizing: border-box;"
        flatpickr(input, {
          locale: 'zh',
          onChange: (selectedDates) => {
            selectedDates.length && success(selectedDates[0]);
          }
        })
        return input;
      }
    default:
      return "input";
  }
}

const getExtraParams = (column) => {
  switch (column.typeName) {
    case "DateTime":
    case "Date":
      return {
        headerFilter: getHeaderFilter(column.typeName),
        headerFilterFunc: dateFilterFunction,
        headerFilterPlaceholder: "请选择日期",
      };
    case 'Double':
    case 'Long':
    case 'Integer':
    case 'Decimal':
      return {
        headerFilter: "input",
        headerFilterPlaceholder: "请输入数字",
        bottomCalcParams: {
          precision: column.decimalPlaces,
        },
        bottomCalc: "sum",
        ...column.thousandths ? {
          formatter: "money",
        } : {}
      };
    default:
      return {
        headerFilter: "input",
        headerFilterPlaceholder: "请输入关键字",
      };
  }
};

function getMutator(column) {
  return function(value) {
    if ([ "Date", "DateTime"].includes(column.typeName)) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
    return value;
  }
}

export function formatColumns(columns, inDesigner) {
  return columns.map((column) => {
    return {
      title: column.title,
      field: column.propertyPath,
      headerSort: false,
      tooltip: !inDesigner,
      visible: true,
      mutator: getMutator(column),
      ...getExtraParams(column),
    };
  });
}

export function elOffset() {
  let box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft,
  };
}


export function elVisible(el) {
  return !(el.offsetWidth <= 0 && el.offsetHeight <= 0);
}