<template>
    <a-cascader v-model="currentValue" :getPopupContainer="getPopupContainer" v-bind="[$attrs, $props]" v-on="$listeners"  :options="sourceList"  @change="handleChange" />
</template>

<script>
import commonSelectMix from "@/mixins/common.select";
import supportDatasource from "@/mixins/support.datasource";
export default {
    name:"cw-antd-cascader",
    props:{
      value:{
        type:Array,
      }
  },
  mixins: [ commonSelectMix,supportDatasource], 
  data() {
    return {
      sourceList: [],
      currentValue:[]
    };
  },
  methods: {
    handleChange(val) {
      this.$emit('update:value', val)
      this.$emit('onChange',val)
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
  async mounted() { 
    await this.load()
    this.sourceList = this.currentDataSource.data
  },
}
</script>

<style>

</style>