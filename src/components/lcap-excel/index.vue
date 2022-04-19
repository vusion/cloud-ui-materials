<template>
  <div id="app">
    <gc-spread-sheets-designer :styleInfo='styleInfo' :config='config' :spreadOptions='spreadOptions' @designerInitialized='designerInitialized'>
    </gc-spread-sheets-designer>
  </div>
</template>

<script>

import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
import '@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css';
import * as GC from '@grapecity/spread-sheets';
import "@grapecity/spread-sheets-print";
import "@grapecity/spread-sheets-shapes";
import '@grapecity/spread-sheets-pivot-addon';
import "@grapecity/spread-sheets-tablesheet";
import '@grapecity/spread-sheets-resources-zh';
GC.Spread.Common.CultureManager.culture("zh-cn");
import '@grapecity/spread-sheets-designer-resources-cn';
import "./custom.css";
import * as ExcelIO from '@grapecity/spread-excelio';

//Apply License
//GC.Spread.Sheets.LicenseKey = 'sjs-distribution-key';
//ExcelIO.LicenseKey = 'sjs-distribution-key';
//GC.Spread.Sheets.Designer.LicenseKey = 'designer-component-distribution-key';

import { Designer } from '@grapecity/spread-sheets-designer-vue';

export default {
  name: 'lcap-excel',
  data: function () {
    var config = GC.Spread.Sheets.Designer.DefaultConfig;
    config.commandMap = {
      Welcome: {
        title: "Welcome",
        text: "Welcome",
        iconClass: "ribbon-button-welcome",
        bigButton: "true",
        commandName: "Welcome",
        execute: async (context, propertyName, fontItalicChecked) => {
          alert("Welcome to new designer.");
        },
      },
    };
    config.ribbon[0].buttonGroups.unshift({
      label: "NewDesigner",
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
    });
    return {
      styleInfo: { height: "98vh", width: '100%' },
      config: config,
      spreadOptions: {
        sheetCount: 2,
      },
      designer: null
    };
  },
  methods: {
    designerInitialized(value) {
      this.designer = value;

    }
  }
}
</script>
<style>
</style>
