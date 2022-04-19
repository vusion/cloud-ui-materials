<template>
  <div :class="$style.root">
    <gc-spread-sheets
      :hostClass='$style.hostClass'
    >
      <gc-worksheet
        :dataSource="dataTable"
        :autoGenerateColumns='autoGenerateColumns'
      >
        <gc-column
          :width="width"
          :dataField="'price'"
          :visible='visible'
          :formatter='formatter'
          :resizable='resizable'
        ></gc-column>
      </gc-worksheet>
    </gc-spread-sheets>
  </div>
</template>
<script>
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css'
import '@grapecity/spread-sheets-vue'

export default {
  name: 'lcap-excel',
  data() {
    return {
      hostClass: 'spread-host',
      autoGenerateColumns: true,
      width: 300,
      visible: true,
      resizable: true,
      formatter: "$ #.00"
    }
  },
  computed: {
    dataTable() {
      let dataTable = [];
      for (let i = 0; i < 42; i++) {
        dataTable.push({price: i + 0.56})
      }
      return dataTable
    }
  }
};
</script>
<style module>
.root {
}

.hostClass {
  width: 100%;
  height: 98vh;
}
</style>
