<template>
  <div class="ganttRoot">
    <u-linear-layout type="flex" justify="space-between" class="functionBar">

      <div>
        <u-input placeholder="请输入任务名称" v-model="searchTitle" class="searchInput"></u-input>
        <u-button icon="search" text="搜索" color="primary" @click="searchTask">搜索</u-button>
      </div>
      <div>
        <u-select v-model="defaultDateView" @select="ganttChangeDateView($event)">
          <u-select-item value="y">年</u-select-item>
          <u-select-item value="m">月</u-select-item>
          <u-select-item value="w">周</u-select-item>
          <u-select-item value="d">日</u-select-item>
        </u-select>
        <u-button icon="" v-if="showToday" @click="changeToday">今日</u-button>
      </div>
    </u-linear-layout>
    <div id="gantt" ref="gantt" class="ganttContainer"/>
  </div>
</template>

<script>
import {gantt} from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'; // 样式模块
import {locale} from "@/locale";
import {basicConfig, initialData, ganttPlugins} from "@/ganttConfig";
import supportDataSource from "@/mixins/support.datasource";
import _ from 'lodash';


export default {
  name: 'lcap-gantt',
  data() {
    return {
      defaultDateView: 'd',
      ganttInstance: null,
      searchTitle: '',
      ganttEvent: {},
    };
  },
  props: {
    dataSource: [Function, Array, Object],
    linkSource: [Function, Array, Object],
    showToday: {type: Boolean, default: true},
    taskView: {type: String, default: 'd'},
    ganttTableConfig: {type: String, default: '{}'},
    startDateField: {type: String, default: ''},
    endDateField: {type: String, default: ''},
    parentField: {type: String, default: ''},
  },
  mixins: [supportDataSource],
  mounted() {
    this.$nextTick(() => {
      this.initGantt();
      // console.log(_.at({ 'a': [{ 'b': { 'c': 3 } }, 4] }, 'a[0].b.c'));
      // this.ganttChangeEvent();//交互事件
    });
  },
  computed: {
    changedObj() {
      let {dataSource, linkSource} = this;
      return {dataSource, linkSource};
    },
  },
  watch: {
    changedObj: {
      handler() {
        this.$nextTick(() => {
          this.initGantt();
          // this.ganttChangeEvent();//交互事件
        });
      },
      deep: true,
    },
    taskView: {
      handler() {
        this.ganttChangeDateView(this.taskView);
      },
    },
  },
  methods: {
    hasSubstr(parentId, type) {
      let task = gantt.getTask(parentId);
      if (type == 'title') {
        if (task.text.toLowerCase().indexOf(this.searchTitle) !== -1)
          return true;
      }
    },
    searchTask() {
      if (this.searchTitle) {
        this.ganttEvent.onBeforeTaskDisplay = gantt.attachEvent("onBeforeTaskDisplay", (id, task) => {
          if (this.hasSubstr(id, 'title')) {
            return true;
          }
          return false;
        });
        gantt.refreshData()
        gantt.render()
      } else {
        this.ganttEvent.onBeforeTaskDisplay = gantt.attachEvent("onBeforeTaskDisplay", (id, task) => {
          return true
        })
        gantt.refreshData()
        gantt.render()
      }

    },
    initGantt() {
      gantt.clearAll();
      gantt.serverList("priority", [
        {key: 0, label: "最高"},
        {key: 1, label: "较高"},
        {key: 2, label: "普通"},
        {key: 3, label: "较低"},
        {key: 4, label: "最低"},
      ]);
      gantt.locale = locale;
      // 启用动态加载
      gantt.config = {
        ...gantt.config,
        ...basicConfig,
      };
      gantt.plugins(ganttPlugins);
      if (this.showToday) {
        this.createTodayLine();
      }
      this.changeTaskColor();
      this.highlightWeekend();
      this.parseIDETableConfig(this.ganttTableConfig);
      gantt.init(this.$refs.gantt);
      gantt.parse({
        data: this.innerDataSource || initialData.data,
        links: this.innerLinkSource || initialData.links,
      });
    },
    highlightWeekend() {
      gantt.templates.timeline_cell_class = (item, date) => {
        if (date.getDay() === 0 || date.getDay() === 6) {
          return 'weekend';
        }
        return '';
      }
    },
    // 今日线
    createTodayLine() {
      var dateToStr = gantt.date.date_to_str("%Y年%M%d日");
      var markerId = gantt.addMarker({
        id: 'markerLine',
        start_date: new Date(),
        css: "today",
        text: "今日",
        title: dateToStr(new Date())
      });
      gantt.updateMarker(markerId);
    },
    //定位到今日线
    changeToday() {
      this.$nextTick(() => {
        let ganTT = document.getElementsByClassName('gantt_marker today')
        gantt.scrollTo(ganTT[0].offsetLeft - 300, null);
      })
    },
    changeTaskColor() {
      gantt.templates.task_class = function (start, end, task) {
        console.log(task);
        // task.state值为default/unfinished/finished/canceled其中一种
        return `milestone-${task.state}`;
      }
    },
    // 切换年月周日视图
    ganttChangeDateView(event) {
      switch (event.value) {
        case 'y':
          gantt.config.scale_unit = "year";
          gantt.config.step = 1;
          gantt.config.subscales = null;
          gantt.config.date_scale = "%Y年";
          gantt.templates.date_scale = null;
          break;
        case 'm':
          gantt.config.scale_unit = 'month';
          gantt.config.step = 1;
          gantt.config.date_scale = "%m月";
          gantt.templates.date_scale = null;
          break;
        case 'w':
          gantt.config.scale_unit = 'week';
          gantt.config.step = 1;
          gantt.config.date_scale = "第%w周";
          gantt.templates.date_scale = null;
          break;
        case 'd':
          gantt.config.scale_unit = 'day';
          gantt.config.step = 1;
          gantt.config.date_scale = "%m月%d日";
          gantt.templates.date_scale = null;
          gantt.config.subscales = null;
          break;
      }
      gantt.render();
    },
    // gantt交互事件注册
    ganttChangeEvent() {
      // gantt渲染
      this.ganttEvent.onGanttReady = gantt.attachEvent("onGanttReady", () => {
        //弹窗标题 日期范围
        gantt.templates.task_time = function (start, end, task) {
          return "周期：" + moment(start).format('YYYY-MM-DD') + " 至 " + moment(end).format('YYYY-MM-DD');
        };
        // 浮窗
        gantt.templates.tooltip_text = (start, end, task) => {
          return "<b>项目名称:</b> " + task.text + "<br><b>负责人:</b>" + task.head + "<br/><b>开始时间:</b> "
            + moment(start).format('YYYY-MM-DD')
            + "<br/><b>结束时间:</b> "
            + moment(new Date(end).valueOf() - 1000 * 60 * 60 * 24).format('YYYY-MM-DD');
        }
        //弹窗标题 计划名称
        gantt.templates.task_text = function (start, end, task) {
          return task.text;
        };
        gantt.templates.timeline_cell_class = function (task, date) {
          if (!gantt.isWorkTime({task: task, date: date})) {
            return "weekend";
          } else {
            return 'weekday'
          }
        };
        gantt.templates.task_end_date = (date) => {
          return gantt.templates.task_date(this.moment(new Date(date.valueOf() - 1000 * 60 * 60 * 24)).format("YYYY-MM-DD"));
        };
        gantt.templates.grid_date_format = (date, column) => {
          if (column === "end_date") {
            return this.moment(new Date(date.valueOf() - 1000 * 60 * 60 * 24)).format("YYYY-MM-DD");
          } else {
            return this.moment(date).format("YYYY-MM-DD");
          }
        }
      });
      // 修改默认弹窗
      gantt.attachEvent("onBeforeLightbox", (id) => {
        var task = gantt.getTask(id);
        task.proTemplate = `${gantt.locale.labels.taskProjectType_0}`
        return true;
      });
      // 用户完成拖动并释放鼠标
      this.ganttEvent.onAfterTaskChanged = gantt.attachEvent("onAfterTaskChanged", (id, mode, task) => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          gantt.render();
        }, 500)
      });
      // 保存新增
      this.ganttEvent.onLightboxSave = gantt.attachEvent("onLightboxSave", (id, item) => {
        if (!item.text) {
          this.$toast.error("请填写计划名称!");
          return false;
        }
        return true;
      });
    },
    parseIDETableConfig(config) {
      let configList = JSON.parse(config);
      console.log(configList);

    }
  }
};
</script>

<style>
.ganttRoot {
  width: 100%;
  height: 600px;
}

.ganttContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.weekend {
  background: #fafafa !important;
}

.weekday {
  background: #fff;
}

.milestone-default {
  border: none;
  background: rgba(0, 0, 0, 0.45);
}

.milestone-unfinished {
  border: none;
  background: #5692f0 !important;
}

.milestone-finished {
  border: none;
  background: #84bd54 !important;
}

.milestone-canceled {
  border: none;
  background: #da645d !important;
}

.gantt_task_progress {
  opacity: 0.2 !important;
}

</style>
