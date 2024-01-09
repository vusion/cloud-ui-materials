<template>
  <div  class="cw-ant-calendar" style="--calendar-primary-background: #1890ff;--calendar-value-border-radius:2px">
    <a-calendar v-model="currentValue" ref="calendar" :header-render="headerRender" :locale="locale"  valueFormat="YYYY-MM-DD"  :fullscreen="false" @panelChange="handlePanelChange" @select="handleSelect" :getPopupContainer="getPopupContainer">
      <ul slot="dateCellRender" slot-scope="value" class="events">
        <span v-for="item in getListData(value)" :key="item.content" class="cicle"></span>
      </ul>
    </a-calendar>
    <a-button type="primary">清空</a-button>
  </div>
</template>

<script>
import TimePickerLocale from "ant-design-vue/lib/date-picker/locale/zh_CN";
import Vue from "vue"
import moment from "moment"
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Calendar from "ant-design-vue/es/calendar";
import Button from "ant-design-vue/es/button";
Vue.use(Calendar);
Vue.use(Button)
import "ant-design-vue/es/calendar/style/css";
import supportDatasource from "@/mixins/support.datasource";
import get from "lodash/get";
export default {
  name: "cw-antd-calendar",
  props: {
    value: {
      type: String,
    },
    valueField: {
      type: String,
    },
    dataSource: {
      type: Array,
      default: () => []
    },
  },
  mixins: [supportDatasource],
  data() {
    return {
      currentValue: null,
      locale: TimePickerLocale,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val 
      }
    },
  },
  async mounted() {
    const el = this.$refs["calendar"].$el
      .querySelector(".ant-radio-group")
    el.remove()
    await this.load()
  },
  methods: {
    getPopupContainer() {
      return document.querySelector(".cw-antd-library")
    },
    getListData(value) {
      let arr=[]
      const listData = this.currentDataSource.data.filter(item => {
        if (typeof item === "object") {
          const isExist = get(item, this.valueField) === value.format('YYYY-MM-DD');
          if (isExist&& !arr.includes(value.format('YYYY-MM-DD'))) {
            arr.push(value.format('YYYY-MM-DD'))
            return true
          } else {
            return false
          }
        } else if (typeof item === "string") {
          const isExist = item === value.format('YYYY-MM-DD');
          if (isExist && !arr.includes(value.format('YYYY-MM-DD'))) {
            arr.push(value.format('YYYY-MM-DD'))
            return true
          } else {
            return false
          }
        } else {
          throw new Error("数据源格式不正确,只能是对象或者是字符串")
        }
      });

      return listData || [];
    },
    handleSelect(e) {
      this.$emit('update:value', e)
      this.$emit('onSelect', e);
    },
    handlePanelChange(e, mode) {
      this.$emit('update:value', e)
      this.$emit('onPanelChange',e);
    },
  }
}
</script>

<style>

.cw-ant-calendar .cicle{
  background:var(--calendar-primary-background);
  width: 4px;
  height: 4px;
  border-radius: 2px;
  text-align: center;
  display: inline-block;
  margin-top: 0px;
}
.cw-ant-calendar .ant-fullcalendar-value{
  border-radius: var(--calendar-value-border-radius);
}
.cw-ant-calendar .ant-fullcalendar-selected-day .ant-fullcalendar-value{
  background: var(--calendar-primary-background) ;
}
.cw-ant-calendar .ant-fullcalendar-today .ant-fullcalendar-value{
  box-shadow: inset 0 0 0 1px var(--calendar-primary-background);
}

.cw-ant-calendar .ant-fullcalendar-selected-day .cicle{
  background: #fff;
}
</style>