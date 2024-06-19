<template>
  <a-config-provider :locale="zh_CN">
    <a-time-picker style="width:100%"  :valueFormat="format" :getPopupContainer="getPopupContainer" v-model="currentValue"  @change="handleChange"  v-bind="[$attrs, $props]" v-on="$listeners" />
  </a-config-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import commonSelectMix from "@/mixins/common.select";
export default {
  name:"cw-antd-time-picker",
  props:{
    value:{
      type:String,
    },
    format: {
      type: String,
      default:"HH:mm:ss"
    }
  },
  mixins: [ commonSelectMix], 
  data() {
    return {
      currentValue:null,
      zh_CN
    };
  },
  watch: {
    value:{
      handler(val){
        this.currentValue = val
      },
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('update:value', val)
      this.$emit('onChange',val)
    }
  },
}
</script>

<style>

</style>