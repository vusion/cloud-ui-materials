<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="(node, index) in columns1"
      :key="index"
      :prop="node.props"
      :label="node.label"
      :designer="$env.VUE_APP_DESIGNER"
    >
      <div s-empty="true" vusion-slot-name="item">
        <slot name="item" :item="node"></slot>
      </div>
    </el-table-column>
  </el-table>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import supportDatasource from "../../mixins/support.datasource";
Vue.use(ElementUI);
export default {
  name: "cw-element-table",
  mixins: [supportDatasource],
  props: {
    columns1: {
      type: Array,
      default() {
        return [
          {
            props: "date",
            label: "日期"
          },
          {
            props: "name",
            label: "姓名"
          },
          {
            props: "address",
            label: "地址"
          },
        ]
      }
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>

<style>
div[s-empty]:empty {
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  text-align: left;
  background: #fff;
  line-height: 1.4;
  padding: 10px 18px 10px 10px;
  text-align: center;
  width: 30%;
  height: 30%;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
}

div[s-empty]:empty::before {
  content: "+";
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}
</style>
