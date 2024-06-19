<template>
  <a-date-picker style="width:100%" :locale="locale"	 valueFormat="YYYY-MM-DD" :getCalendarContainer="getPopupContainer" v-model="currentValue" :format="format" @change="handleChange"  v-bind="[$attrs, $props]" v-on="$listeners"/>
</template>

<script>
import TimePickerLocale from "ant-design-vue/lib/date-picker/locale/zh_CN";
import commonSelectMix from "@/mixins/common.select";
export default {
    name:"cw-antd-date-picker",
    props:{
    value:{
      type:String,
    },
    format: {
      type: String,
      default:"YYYY-MM-DD"
    }
  },
  mixins: [ commonSelectMix], 
  data() {
    return {
      locale: TimePickerLocale,
      currentValue:null
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