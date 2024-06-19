<template>
    <a-calendar ref="calendar" v-model="currentValue" :locale="locale"   mode="month" valueFormat="YYYY-MM-DD" :fullscreen="false" @panelChange="handlePanelChange" @select="handleSelect" >
      <ul slot="dateCellRender" slot-scope="value" class="events">
        <span v-for="item in getListData(value)" :key="item.content" class="cicle"></span>
      </ul>
    </a-calendar>
</template>

<script>
import TimePickerLocale from "ant-design-vue/lib/date-picker/locale/zh_CN";
export default {
  name:"cw-antd-calendar",
  props:{
    value:{
      type:String,
    },
    valueField: {
      type:String,
    },
    dataSource: {
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      currentValue: null,
      locale: TimePickerLocale,
    }
  },
  mounted() {
    const el = this.$refs["calendar"].$el
      .querySelector(".ant-radio-group")
    el.remove()
  },
  watch:{
    value:{
      handler(val){
        this.currentValue = val
      }
    },
  },
  methods: {
    getListData(value) {
      const listData = this.dataSource.filter(item => {
        return item[this.valueField] === value.format('YYYY-MM-DD');
      });
      return listData || [];
    },
    handlePanelChange(e, mode) {
      this.$emit('update:value', e)
      this.$emit('onPanelChange',e);
    },
    handleSelect(e) {
      this.$emit('update:value', e)
      this.$emit('onSelect',e);
    },
  }
}
</script>

<style>
.cicle{
  background: #1890ff;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  text-align: center;
  display: inline-block;
  margin-top: 10px;
}
</style>