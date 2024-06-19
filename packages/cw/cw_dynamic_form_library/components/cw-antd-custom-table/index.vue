<template>
  <div>
     <a-config-provider :locale="zh_CN">
      <a-table bordered :scroll="{x:200}"  :columns="columns" :data-source="sourceList" @change="onChange" :getPopupContainer="getPopupContainer">
        <template
        v-for="col in columnsKey"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          {{ text }}
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <!-- <a-popconfirm :locale="{okText:'确定'}" :getPopupContainer="getPopupContainer"  title="是否要删除?" @confirm="() => cancel(record.key)">
              <a>删除</a>
          </a-popconfirm> -->
        </div>
        <div class="editable-row-operations" @click="handleDetail(text)">
          查看详情
        </div>
      </template>
      </a-table>
     </a-config-provider>
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import commonSelectMix from "@/mixins/common.select";
import commonDataMix from "@/mixins/common.data";
import supportDatasource from "@/mixins/support.datasource";
import includes from "lodash/includes"
export default {
  name:"cw-antd-custom-table",
    props:{
      value:{
        type: Array,
        default: ()=>[]
      },
      titleMap: {
        type: Object ,
        default: ()=>{}
      },
      action:{
        type:Boolean,
        default: true
      }
  },
  mixins: [supportDatasource,commonSelectMix,commonDataMix],
  data() {
    return {
      zh_CN:zh_CN,
      sourceList: [],
    }
  },
  async mounted() {
    // await this.load()
    // this.sourceList = this.currentDataSource.data
  },
  watch:{
    value:{
      handler(val) {
        this.sourceList = this.inIDE ? [] : val 
      },
      deep: true,
      immediate: true
    },
    titleMap:{
      handler(val) {
        
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    columnsKey() {
      if (this.sourceList.length > 0) {
        return Object.keys(this.sourceList[0]).filter(item=> !['editable','key','update_time','create_by','update_by','update_time'].includes(item))
      } else {
        return []
      }
    },
    columns() {
      let columns = this.columnsKey.map(item=>this.getColumnItem(item)) 
        if (columns.length > 0 &&this.action) {
          columns.push({
          title: '操作',
          fixed: 'right',
          scopedSlots: { customRender: 'operation' },
          width:100
        })
      }
      return columns
    },
    inIDE(){
      return this.$env&& this.$env.VUE_APP_DESIGNER || false
    }
  },
  methods: {
    getColumnItem(item){
      let filters = undefined
      if(this.titleMap[item] &&this.titleMap[item]['options']) {
        const options = this.getJsonResultObj(this.titleMap[item]['options']) 
        filters = options.map(item=>{item.text=item.value;return item})
      }

     return ({
        title: this.titleMap? this.titleMap[item]? this.titleMap[item]['comment']:item==="create_time"?'创建时间':item:item, 
        dataIndex:item,
        key: item,
        filters: filters,
        sorter:this.titleMap[item]&&this.titleMap[item].type==="Long" ? (a, b) => a[item] - b[item]:false,
        defaultSortOrder: 'ascend',
        filterMultiple: false,
        onFilter:filters?(value, record) => (record[item]? record[item].includes(value):false):false,
        scopedSlots: { customRender: item },
        width:200
      })
    },
    onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    },
    handleDetail(item){
      let arr = []
      Object.keys(item).forEach(it=>{
        if(this.titleMap[it]){
          const key = this.titleMap[it].comment
          arr.push({
            name:it,
            value:item[it],
            title:key
          })
        }else{
          arr.push({
            name:it,
            value:item[it],
            title:it
          })
        }
      })
      console.log(arr);
      this.$emit("clickItem",arr)
    }
  }
}
</script>

<style>
.editable-row-operations{
  color: #1890ff;
  cursor: pointer;
}
</style>