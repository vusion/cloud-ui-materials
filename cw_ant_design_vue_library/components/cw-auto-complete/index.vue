<template>
  <div class="global-search-wrapper" style="width: 300px">
    <a-auto-complete
      class="global-search"
      size="large"
      style="width: 100%"
      :placeholder="placeholder"
      option-label-prop="title"
      @select="onSelect"
      @search="handleSearch"
      v-model="currentValue"
      allowClear
    >
      <template slot="dataSource">
        <template v-if="valueField">
          <a-select-option  v-for="item in listSource" :key="get(item,valueField)" :title="get(item,valueField)" >
            {{ get(item,valueField) }}
          </a-select-option>
        </template>
        <template v-else>
          <a-select-option  v-for="item in listSource" :key="item" :title="item">
            {{ item }}
          </a-select-option>
        </template>
      </template>
    </a-auto-complete>
  </div>
</template>

<script>
import { MField } from '../../widgets/m-field';
import supportDatasource from "@/mixins/support.datasource";
import AutoComplete from 'ant-design-vue/es/auto-complete';
import Input from 'ant-design-vue/es/input';
import Select from "ant-design-vue/es/select"
import Vue from "vue"
import get from "lodash/get"
Vue.use(AutoComplete)
Vue.use(Input)
Vue.use(Select)
export default {
    name:"cw-auto-complete",
    props:{
      value:{
        type:String,
      },
      placeholder:{
        type: String,
        default: "请输入"
      },
      valueField: {
        type: String,
      }
  },
  mixins: [supportDatasource,
    MField
  ],
  data() {
    return {
      listSource: [],
      currentValue:""
    };
  },
  async mounted() {
    await this.load()
  },
  watch:{
    value:{
      handler(val){
        this.currentValue = val
      }
    }
  },
  methods: {
    get,
    onSelect(value) {
      this.$emit('update:value', value)
      this.$emit('onChange',value)
      this.$emit('update', value)
    },
    async handleSearch(value) {
      this.listSource = []
      this.listSource = value ? await this.searchResult(value) : [];
      this.$emit('update:value', value)
      this.$emit('update', value)
      this.$emit('onChange',value)
    },
    async searchResult(query) {
      await this.load()
      // console.log(this.currentDataSource.data);
      const result = this.currentDataSource.data.filter(item => {
        if (typeof item === "object") {
          return  get(item,this.valueField).toString().indexOf(query) !== -1
        }else if(typeof item === "string"){
          return item.indexOf(query) !== -1
        } else {
          throw new Error("数据源格式不正确,只能是对象或者是字符串")
        }
      });
      return result
    },
  }
}
</script>

<style>
.ant-select-dropdown{
  z-index: 6000;
}
</style>