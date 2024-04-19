<template>
  <div ref="table" class="tabulator" />
</template>
<script>
// import Tabulator from 'tabulator-tables/dist/js/tabulator'
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import lodash from 'lodash';
import 'tabulator-tables/dist/css/tabulator_bootstrap3.min.css';
import { downLoadExcelStyle } from './downloadExcel'
import MovableColumnModule from './movableColumnHeader'

Tabulator.registerModule(MovableColumnModule);
Tabulator.extendModule('download', 'downloaders', {
  xlsxStyle: downLoadExcelStyle
});

export default {
  name: "tabulator-component",
  props: {
    dropZoneClass: {
      type: String,
      default: '',
    },
    layout: {
      type: String,
      default: 'fitColumns'
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    groupBy: {
      type: Array,
      default: () => [],
    },
    groupState: {
      type: Boolean,
      default: true,
    },
    showColumns: {
      type: Array,
      default: () => [],
    },
    checkedCalcColumns: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: '100%',
    },
  },
  mounted() {
    this.updateOptions();
  },
  watch: {
    height: {
      handler(val) {
        this.tabulatorInstance.setHeight(val);
      }
    },
    tableData: {
      handler() {
        if (this.tabulatorInstance) {
          this.tabulatorInstance.setData(this.tableData);
        }
      },
      deep: true
    },
    columns: {
      handler: function (val) {
        this.updateOptions();
        // this.tabulatorInstance.updateDefinition({
        //   columns: val
        // });
      },
      deep: true
    },
    layout: {
      handler: function () {
        this.updateOptions()
        if (this.tabulatorInstance && this.tabulatorInstance.initialized) {
          setTimeout(() => {
            this.toggleHide(this.showColumns);
            this.tabulatorInstance.setGroupBy(this.groupBy.slice());
            this.updateCalcStyle(this.checkedCalcColumns)
          }, 100)
        }
      },
    },
    groupState: {
      handler: function (val) {
        if (this.tabulatorInstance && this.tabulatorInstance.initialized) {
          this.tabulatorInstance.setGroupStartOpen(val);
          this.tabulatorInstance.setGroupBy(['orderId']);
          this.$nextTick(() => {
            this.tabulatorInstance.setGroupBy(this.groupBy.slice());
            this.updateCalcStyle(this.checkedCalcColumns)
          })
        }
      },
    },
    groupBy: {
      handler: function (val) {
        if (this.tabulatorInstance && this.tabulatorInstance.initialized) {
          this.$nextTick(() => {
            this.tabulatorInstance.setGroupBy(val.slice());
            this.tabulatorInstance.options.groupHeaderDownload = val.map(() => this.getGroupHeaderDownload())
            this.updateCalcStyle(this.checkedCalcColumns)
          })
        }
      },
    },
    showColumns: {
      handler: function (val) {
        this.toggleHide(val);
      },
    },
    checkedCalcColumns: {
      handler: function (val) {
        if (this.tabulatorInstance && this.tabulatorInstance.initialized) {
          this.tabulatorInstance.setGroupBy(this.groupBy.slice());
          this.updateCalcStyle(val)
        }
      },
    },
  },
  methods: {
    updateCalcStyle(val) {
      const footerElement = this.$refs.table.querySelector('.tabulator-footer');
      if (!footerElement) return;
      footerElement.style.display = val.length ? 'block' : 'none';
      const fieldElements = footerElement.querySelectorAll('.tabulator-cell')
      fieldElements.forEach(item => {
        const field = item.getAttribute('tabulator-field');
        item.style.visibility = val.includes(field) ? 'visible' : 'hidden';
      })
    },
    downloadExcel() {
      this.tabulatorInstance.download('xlsxStyle', 'data.xlsx', { sheetName: "My Data" })
    },
    getPath(group) {
      let path = group.getKey();
      if (group.getParentGroup()) {
        path = this.getPath(group.getParentGroup()) + '.groups.' + path;
      }
      return path;
    },
    toggleHide(val) {
      if (!(this.tabulatorInstance && this.tabulatorInstance.initialized)) return;
      this.tabulatorInstance.getColumns().forEach(item => {
        if (val.includes(item.getField())) {
          item.show();
        } else {
          item.hide();
        }
      });
      this.tabulatorInstance.redraw();
      this.updateCalcStyle(this.checkedCalcColumns)
    },
    getGroupHeader() {
      const self = this;
      return (value, count, data, group) => {
        const field = group.getField();
        const item = self.columns.find(item => item.field === field);
        const table = group.getTable();
        let placeholder = ''
        if (self.checkedCalcColumns.length) {
          const rowSingle = lodash.get(table.getRows(), 0, null);
          let rowSingleElement = rowSingle.getElement().cloneNode(true);
          rowSingleElement.querySelectorAll('.tabulator-cell').forEach(item => {
            item.innerHTML = '&nbsp;';
            item.setAttribute('title', null);
          });
          if (data.length) {
            self.checkedCalcColumns.forEach(item => {
              const columnDefine = table.getColumn(item).getDefinition();
              const sum = lodash.sum(data.map(_ => Number(_[item]))).toFixed(lodash.get(columnDefine, 'bottomCalcParams.precision', 0));
              const element = rowSingleElement.querySelector(`[tabulator-field="${item}"]`);
              if (element) {
                element.innerHTML = sum;
                element.setAttribute('title', sum);
              }
            });
          } else {
            const groupedData = group.getTable().getData().filter((item) => item[field] == value);
            self.checkedCalcColumns.forEach(item => {
              const sum = lodash.sum(groupedData.map(_ => Number(_[item]))).toFixed(lodash.get(item, 'bottomCalcParams.precision', 0));
              const element = rowSingleElement.querySelector(`[tabulator-field="${item}"]`);
              if (element) {
                element.innerHTML = sum;
                element.setAttribute('title', sum);
              }
            });
          }
          placeholder = `<div class='custom-group'>${rowSingleElement.innerHTML}</div>`;
        }
        return `${item.title} : <span>${value}</span>${placeholder}`
      }
    },
    getGroupHeaderDownload() {
      const self = this;
      return (value, count, data, group) => {
        const field = group.getField();
        const table = group.getTable();
        const title = table.getColumn(field) ? _.get(table.getColumn(field).getDefinition(), 'title', field) : field;
        const arr = []
        const totalArr = data.length ? data : group.getTable().getData().filter((item) => item[field] == value);
        table.getColumns().forEach((item, index) => {
          let text = ''
          const config = item.getDefinition();
          if (index === 0) {
            text += `${title} : ${value}  `
          }

          if (self.checkedCalcColumns.includes(item.getField())) {
            const sum = lodash.sum(totalArr.map(_ => Number(_[item.getField()]))).toFixed(lodash.get(config, 'bottomCalcParams.precision', 0));
            text += `${sum}`
          } 
          arr.push(text)
        })
        return arr;
      }
    },
    updateOptions() {
      this.tabulatorInstance && this.tabulatorInstance.destroy();
      this.tabulatorInstance = null;
      this.tabulatorInstance = new Tabulator(
        this.$refs.table,
        {
          data: this.tableData,
          columns: this.columns,
          groupClosedShowCalcs: true,
          groupStartOpen: this.groupState,
          resizableColumnFit: true,
          groupBy: this.groupBy.slice(),
          columnCalcs: 'table',
          resizableColumnFit: true,
          movableHeaderConnectedElements: `.${this.dropZoneClass}`,
          groupHeader: this.getGroupHeader(),
          groupHeaderDownload: this.getGroupHeaderDownload(),
          layout: this.layout,
          height: this.height
        })

      this.tabulatorInstance.on('movableHeaderElementDrop', (e, element, column) => {
        this.$emit('addGroupBy', column.getField());
      });
    }
  },
}
</script>