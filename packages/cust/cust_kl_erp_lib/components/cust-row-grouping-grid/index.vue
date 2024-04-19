<template>
  <div ref="container" :class="{
    [$style.hideTableHeaderColumnFilter]: !showHeaderColumnFilter,
    [$style.root]: true,
  }">
    <div>
      <div :class="$style.tableHeader">
        <div :class="$style.title" vusion-slot-name="default" s-empty="true">
          <slot></slot>
        </div>
        <div ref="dropZone" style="flex: 1;" :class="$style.dropZone">
          <u-label size="huge" :text="item" type="line" v-for="item in groupBy" removable @remove="removeGroup(item)" />
          <div :class="$style.stackedList" v-if="groupBy.length === 0">拖拽列到此处进行分组</div>
        </div>
        <div :class="$style.toolbar">
          <u-button shape="square" @click="toggleFilter">
            <icon icon="material-symbols:search" />
          </u-button>
          <u-button shape="square" @click="toggleGroup">
            <icon icon="carbon:expand-categories" />
          </u-button>
          <u-button shape="square" @click="toggleWide">
            <icon icon="fluent:auto-fit-width-20-filled" />
          </u-button>
          <u-button shape="square">
            <icon icon="uil:setting" />
            <popup-list :list="columnToggleOption" @change="updateData('showColumns', $event)" :value="showColumns">
            </popup-list>
          </u-button>
          <u-button shape="square">
            <icon icon="tabler:sum"></icon>
            <popup-list :list="calcColumnOption" @change="updateData('checkedCalcColumns', $event)"
              :value="checkedCalcColumns">
            </popup-list>
          </u-button>
          <u-button shape="square" @click="downloadExcel">
            <icon icon="clarity:export-line"></icon>
          </u-button>
        </div>
      </div>
      <tabulator-component @addGroupBy="addGroup" :showColumns="showColumns" :groupState="groupState"
        :tableData="tableData" :layout="layout" :columns="columns" :groupBy="groupBy" :dropZoneClass="$style.dropZone"
        :checkedCalcColumns="checkedCalcColumns" ref="tabulator" :height="height" />
    </div>
  </div>
</template>
<script>
import supportDatasource from '../../mixins/support.datasource';
import TabulatorComponent from './table/tabulator-component.vue';
import PopupList from './popup.vue';
import { Icon } from '@iconify/vue2';
import lodash from 'lodash';

export default {
  name: "cust-row-grouping-grid",
  components: {
    TabulatorComponent,
    PopupList,
    Icon
  },
  props: {
    dataSource: [Function, Object, Array],
    dataSchema: { type: String, default: "entity" },
    options: Array,
    height: { type: String, default: "100%" },
  },
  mixins: [supportDatasource],
  data() {
    return {
      tabulator: null,
      groupBy: [],
      groupState: true,
      showColumns: [],
      showHeaderColumnFilter: false,
      checkedCalcColumns: [],
      columnToggleOption: [],
      layout: 'fitColumns',
      columns: [],
      calcColumnOption: [],
    }
  },
  computed: {
    tableData() {
      return lodash.get(this, 'currentDataSource.data', [])
    },
  },
  watch: {
    columns(val) {
      if (val && val.length > 0) {
        this.showColumns = val.map(item => item.field)
        this.columnToggleOption = val.map(item => ({
          text: item.title,
          value: item.field
        }))
      }
    },
    showColumns(val) {
      this.calcColumnOption = this.columns.filter(item => val.includes(item.field) && item.bottomCalc).map(item => ({
        text: item.title,
        value: item.field
      }));
      this.checkedCalcColumns = this.checkedCalcColumns.filter(item => val.includes(item));
    }
  },
  methods: {
    addGroup(field) {
      this.groupBy = lodash.uniq([...this.groupBy, field]);
    },
    toggleFilter() {
      this.showHeaderColumnFilter = !this.showHeaderColumnFilter;
    },
    downloadExcel() {
      this.$refs.tabulator.downloadExcel();
    },
    updateData(key, value) {
      this[key] = value;
    },
    toggleGroup() {
      this.groupState = !this.groupState;
    },
    removeGroup(event) {
      this.groupBy = this.groupBy.filter(item => item !== event);
    },
    toggleWide() {
      this.groupState = true;
      this.$nextTick(() => this.layout = this.layout === 'fitDataFill' ? 'fitColumns' : 'fitDataFill');
    },
  },
}
</script>
<style>
.tabulator-moving {
  font-weight: bold;
  .tabulator-header-filter {
    display: none;
  }
}
.tabulator-col-title {
  cursor: move;
}
</style>
<style module>
.root {
  :global(.tabulator-header) {
    :global(.tabulator-col) {
      background-color: var(--table-view-head-background, #f7f8fa);
    }
  }
  
  :global(.tabulator) {
    :global(&[tabulator-layout="fitColumns"]) {
      :global(.tabulator-table) {
        width: 100%;
      }
    }
    :global(.tabulator-footer) {
      display: none;
  
      :global(.tabulator-calcs-holder) {
        :global(.tabulator-row) {
          background-color: #fdff94 !important;
        }
      }
    }
  }
  
  :global(.tabulator-row.tabulator-group) {
    background: #fdff94;
  }
  
  :global(.tabulator-table) {
    :global(.tabulator-calcs) {
      display: none;
    }
  }
  
  
  :global(.tabulator-header-filter) {
    :global(input:focus:not(:focus-visible)) {
      outline: none;
    }
  }
  
  
  :global(.row-grouping-header) {
    cursor: move;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  
  
  :global(.tabulator-col--is-dragging) {
    opacity: 0.5;
  }
  
  :global(.tabulator-group) {
    position: relative;
    span {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  
    :global(.tabulator-col-resize-handle) {
      width: 0;
    }
  
    :global(.tabulator-group-toggle) {
      position: relative;
      z-index: 1;
    }
  
    :global(.custom-group) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.dropZone {
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  margin:  0 5px;
  min-width: 250px;

  .stackedList {
    width: 100%;
  }
}
.toolbar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  color: var(--table-view-head-color);

  [class^=u-button] {
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 19px;
      color: var(--text-color-secondary);
    }
  }
}

.tableHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .title {
    min-width: 30px;
  }
}

.hideTableHeaderColumnFilter {
  :global(.tabulator-header) {
    height: 34px;
  }
}

.stackedList {
  height: 40px;
  background-color: var(--gray-lighter);
  line-height: 40px;
  color: #696767;
  text-align: center;
}

.tableHeader div[s-empty]:empty {
  position: relative;
  text-align: center;
  background: #fff;
  text-align: center;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  &::before {
    content: "请拖入表格标题";
    font-size: 12px;
    display: inline-block;
    margin-bottom: 2px;
    color: var(--gray-lighter);
  }
}
</style>
