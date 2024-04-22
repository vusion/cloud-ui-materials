import * as XLSX from "xlsx";
import _ from 'lodash';

export const downLoadExcelStyle = (list, options, setFileContents) => {
  let sheetName = options.sheetName || "Sheet1";
  let workbook = XLSX.utils.book_new();
  let compression = "compress" in options ? options.compress : true;
  let writeOptions = options.writeOptions || {
    bookType: "xlsx",
    bookSST: true,
    compression,
  };
  let output = null;

  writeOptions.type = "binary";

  workbook.SheetNames = [];
  workbook.Sheets = {};

  function generateSheet() {
    let rows = [],
      merges = [],
      worksheet = {},
      range = {
        s: { c: 0, r: 0 },
        e: {
          c: list[0]
            ? list[0].columns.reduce(
                (a, b) => a + (b && b.width ? b.width : 1),
                0
              )
            : 0,
          r: list.length,
        },
      };

    list.forEach((row, i) => {
      let rowData = [];
      if (row.type === "group") {
        const groupRow = _.get(row, 'columns.0.value', []);
        groupRow.forEach((group, j) => {
          rowData.push(group);
        });
      } else {
        row.columns.forEach(function (col, j) {
          if (col) {
            rowData.push(
              !(col.value instanceof Date) && typeof col.value === "object"
                ? JSON.stringify(col.value)
                : col.value
            );
          } else {
            rowData.push("");
          }
        });
      }
      rows.push(rowData);
    });

    XLSX.utils.sheet_add_aoa(worksheet, rows);

    worksheet["!ref"] = XLSX.utils.encode_range(range);

    if (merges.length) {
      worksheet["!merges"] = merges;
    }

    return worksheet;
  }

  workbook.SheetNames.push(sheetName);
  workbook.Sheets[sheetName] = generateSheet();

  if (options.documentProcessing) {
    workbook = options.documentProcessing(workbook);
  }

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  output = XLSX.write(workbook, writeOptions);

  setFileContents(s2ab(output), "application/octet-stream");
};
