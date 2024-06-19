<template>
  <div>
    <a-tree-select
    :getPopupContainer="getPopupContainer"
    v-model="currentValue"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    :placeholder="placeholder"
    tree-default-expand-all
    :tree-checkable="treeCheckable"
    :showSearch="showSearch"
    :allowClear="allowClear"
    :filterTreeNode="handleFilter"
    @change="handleChange"
    :replaceFields="replaceFieldsComputed"
  >
    <!-- <span v-if="key === '0-0-1'" slot="title" slot-scope="{ key, value }" style="color: #08c">
      Child Node1 {{ value }}
    </span> -->
  </a-tree-select>
  </div>
</template>

<script>
import { MField } from '../../widgets/m-field';
import supportDatasource from "@/mixins/support.datasource";
import commonSelectMix from "@/mixins/common.select";
import Vue from "vue"
import get from "lodash/get"
export default {
    name:"cw-tree-select",
    props:{
      value:{
        type:String,
      },
      treeCheckable: {
        type: Boolean,
        default:false
      },
      placeholder: {
        type: String,
        default: "请选择"
      },
      allowClear: {
        type: Boolean,
        default: true
      },
      replaceFields: {
        type: String | Object,
      },
      showSearch: {
        type: Boolean,
        default: false
      },
      valueField: {
        type: String
      },
      parentId: {
        type: String
      }
    },
    mixins: [supportDatasource,MField,commonSelectMix],
  data() {
    return {
        treeData: [],
        currentValue:undefined
      }
  },
  watch:{
    value:{
      handler(val){
        this.currentValue = val
      }
    },
    "currentDataSource.data":{
      handler(val){
       this.init()
      }
    }
  },
  async mounted() {
    await this.load()
    // console.log(this.dataSource)
    // this.init()
  },
  computed:{
    replaceFieldsComputed() {
       return  typeof this.replaceFields === 'string' ? JSON.parse(this.replaceFields) : this.replaceFields
    }
  },
  methods: {
    init() {
      const data = this.currentDataSource.data
      // console.log(data)
      // const data = [{ id:"223", title: 223, value: 223,  }, { id:"234", title: 224, value: 224, parentId: "123" },{ id:"123", title: 123, value: 123,  }, {id:"892", title: 892, value: 892, parentId: "123" }]
      data.map(item => {
        item.parentId = item.parentId || ""
        item.key = item.id 
        return item
      })
      function transformData(data, parentId) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parentId == parentId) {
            let item = {
              ...data[i],
              children: transformData(data, data[i].id)
            };
            result.push(item);
          }
        }
        return result;
      }
      let transformedData = transformData(data, "");
      // console.log(transformedData)
      // this.treeData = this.currentDataSource.data
      this.treeData = transformedData
    },
    handleChange(value) {
        console.log(value, "change")
        this.$emit('update:value', value)
        this.$emit('onChange',value)
        this.$emit('update', value)
    },
    
    handleFilter(inputValue,treeNode) {
    const title = treeNode.data.props.title.toUpperCase();
    const inputValueUpper = inputValue.toUpperCase();
    if(title.indexOf(inputValueUpper) > -1){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style>

</style>