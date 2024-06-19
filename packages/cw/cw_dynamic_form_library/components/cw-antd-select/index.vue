<template>
    <a-select class="custom-select" v-bind="[$attrs, $props]" v-model="currentValue" style="width: 100%;" @change="handleChange"  :getPopupContainer="getPopupContainer" v-on="$listeners">
      <a-select-option v-for="(item,index) in sourceList" :key="index" :value="item.value"  > {{ item.label }}</a-select-option>
    </a-select>
</template>

<script>
import supportDatasource from "@/mixins/support.datasource";
import commonSelectMix from "@/mixins/common.select";
export default {
  name: "cw-antd-select",
  model: {//model选项可以自定义prop名称和event名称
    value: 'value',
    event: 'on-change'
    },
    props:{
      value:{
        type:String,
      },
      valueField: {
        type: String,
      },
      dataSource: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default:"请选择"
      }
  },
  data(){
    return {
      sourceList: [],
      currentValue:""
    }
  },
  watch: {
    value:{
      handler(val){
        this.currentValue = val
      },
      immediate: true
    }
  },
  mixins: [supportDatasource,commonSelectMix],
  async mounted() { 
    await this.load()
    this.sourceList = this.currentDataSource.data
  },
  methods: {
    handleChange(val) {
      this.$emit('update:value', val)
      this.$emit('change', val)
      this.$emit('onChange',val)
    }
  }
}
</script>

<style scoped>
.custom-select{
  line-height: 32px !important;
}
</style>