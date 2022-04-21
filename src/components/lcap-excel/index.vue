<template>
  <gc-spread-sheets-designer
    :styleInfo="styleInfo"
    :config="config"
    :spreadOptions="spreadOptions"
    @designerInitialized="designerInitialized"
  >
  </gc-spread-sheets-designer>
</template>

<script>
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css"
import "@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css"
import * as GC from "@grapecity/spread-sheets"
import "@grapecity/spread-sheets-print"
import "@grapecity/spread-sheets-shapes"
import "@grapecity/spread-sheets-pivot-addon"
import "@grapecity/spread-sheets-tablesheet"
import "@grapecity/spread-sheets-resources-zh"

GC.Spread.Common.CultureManager.culture("zh-cn")
import "@grapecity/spread-sheets-designer-resources-cn"
import "./custom.css"
import {fakeData} from "./data";
import * as ExcelIO from "@grapecity/spread-excelio"

import {Designer} from "@grapecity/spread-sheets-designer-vue"

export default {
  name: "lcap-excel",
  data: function () {
    var config = GC.Spread.Sheets.Designer.DefaultConfig
    config.commandMap = {
      Welcome: {
        title: "导入逻辑",
        text: "Welcome",
        iconClass: "ribbon-button-welcome",
        bigButton: "true",
        commandName: "Welcome",
        execute: async (context, propertyName, fontItalicChecked) => {
          alert("Welcome to new designer.")
        },
      },
    }
    config.ribbon[0].buttonGroups.unshift({
      label: "导入逻辑",
      thumbnailClass: "welcome",
      commandGroup: {
        children: [
          {
            direction: "vertical",
            commands: ["Welcome"],
          },
          // This is custom button ----------------end-------------
        ],
      },
    })
    return {
      styleInfo: {height: "98vh", width: "100%"},
      config: config,
      spreadOptions: {
        sheetCount: 2,
      },
      designer: null,
    }
  },
  created() {
    var spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
    this.refresh();
  },
  methods: {
    designerInitialized(value) {
      this.designer = fakeData
    },

    loadTable(ss, data) {
      ss.suspendPaint;
      try {
        var sheet = ss.getActiveSheet;
        var table = sheet.tables.addFromDataSource(
          "Table1",
          0,
          0,
          data,
          GC.Spread.Sheets.Tables.TableThemes.medium2
        );
      } catch (e) {
        console.log(e.message);
      }
      ss.resumePaint;
    },

    //4:- 创建refresh函数
    refresh() {
      var ss = GC.Spread.Sheets.findControl(document.getElementById("ss"));
      var sheet = ss.getActiveSheet();
      sheet.reset();
      sheet.setColumnCount(7);
      var data = fakeData;
      this.loadTable(ss, data);
    }


  },
}
</script>
<style>
</style>
