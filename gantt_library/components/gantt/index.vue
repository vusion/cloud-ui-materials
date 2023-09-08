<template>
  <div class="ganttRoot">
    <div v-if="isShowLegend" id="legend_container"></div>
    <u-linear-layout
      v-if="showFunctionBar"
      type="flex"
      justify="space-between"
      class="functionBar"
    >
      <div>
        <u-input
          placeholder="请输入任务名称"
          v-model="searchTitle"
          class="searchInput"
          @change="searchTask"
        ></u-input>
      </div>
      <div>
        <u-select
          v-model="defaultDateView"
          @select="ganttChangeDateView($event)"
        >
          <u-select-item value="year">年</u-select-item>
          <u-select-item value="month">月</u-select-item>
          <u-select-item value="week">周</u-select-item>
          <u-select-item value="day">日</u-select-item>
        </u-select>
        <u-button
          class="showTodayButton"
          icon=""
          v-if="showToday"
          @click="changeToday"
          >今天</u-button
        >
      </div>
    </u-linear-layout>
    <div id="gantt" ref="gantt" class="ganttContainer" />
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css"; // 样式模块
import { locale } from "./locale.js";
import {
  basicConfig,
  initialData,
  initialTableConfig,
  ganttPlugins,
  basicTemplate,
} from "./ganttConfig";
import supportDataSource from "./mixins/support.datasource";
import moment from "moment";

export default {
  name: "gantt",
  data() {
    return {
      defaultDateView: "d",
      ganttInstance: null,
      searchTitle: "",
      ganttEvent: {},
      customStyle: {},
      entityName: "",
    };
  },
  props: {
    dataSource: [Function, Array, Object],
    linkSource: [Function, Array, Object],
    showToday: { type: Boolean, default: true },
    showFunctionBar: { type: Boolean, default: false },
    taskView: { type: String, default: "day" },
    ganttTableConfig: [Function, Array, Object],
    startField: { type: String, default: "" },
    endField: { type: String, default: "" },
    durationField: { type: String, default: "" },
    progressField: { type: String, default: "" },
    colorField: { type: String, default: "" },
    textField: { type: String, default: "" },
    iconField: { type: String, default: "" },
    idField: { type: String, default: "" },
    parentField: { type: String, default: "" },
    skins: { type: String, default: "default" },
    ganttStartDate: { type: String, default: "" },
    ganttEndDate: { type: String, default: "" },
    jumpWeekend: { type: Boolean, default: true },
    isShowLegend: { type: Boolean, default: true },
    dayDateScale: { type: String, default: "%m月%d日" },
    markers: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [supportDataSource],
  mounted() {
    // 监听style样式变化
    this.customStyle = this.parseCustomStyle(this.$el);
    const observer = new MutationObserver(
      function(mutations) {
        mutations.map(
          function(mutation) {
            if (mutation.type === "attributes") {
              this.customStyle = this.parseCustomStyle(this.$el);
            }
          }.bind(this)
        );
      }.bind(this)
    );
    observer.observe(this.$el, { attributes: true });
    this.initBlurEvent();
    gantt.attachEvent("onTaskClick", (id) => {
      // 处理单击事件的代码
      this.$emit("click", id);
    });
    this.addMarker();
  },
  computed: {
    changedObj() {
      let {
        currentDataSource,
        ganttTableConfig,
        skins,
        customStyle,
        ganttStartDate,
        ganttEndDate,
      } = this;
      return {
        currentDataSource,
        ganttTableConfig,
        skins,
        customStyle,
        ganttStartDate,
        ganttEndDate,
      };
    },
  },
  watch: {
    changedObj: {
      handler() {
        this.$nextTick(() => {
          this.initGantt();
          this.ganttChangeEvent(); //交互事件
          this.addMarker();
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
      if (type == "title") {
        if (task.text.toLowerCase().indexOf(this.searchTitle) !== -1)
          return true;
      }
    },
    parseCustomStyle(element) {
      const cssList = element.style.cssText.split(";");
      const cssObj = {};
      cssList.forEach((item) => {
        const [key, value] = item.split(":");
        if (key && value) {
          cssObj[key.trim()] = value.trim();
        }
      });
      return cssObj;
    },
    searchTask() {
      if (this.searchTitle) {
        this.ganttEvent.onBeforeTaskDisplay = gantt.attachEvent(
          "onBeforeTaskDisplay",
          (id, task) => {
            if (this.hasSubstr(id, "title")) {
              return true;
            }
            return false;
          }
        );
        gantt.refreshData();
        gantt.render();
      } else {
        this.ganttEvent.onBeforeTaskDisplay = gantt.attachEvent(
          "onBeforeTaskDisplay",
          (id, task) => {
            return true;
          }
        );
        gantt.refreshData();
        gantt.render();
      }
    },
    initGantt() {
      gantt.clearAll();
      gantt.locale = locale;
      // 启用动态加载
      gantt.config = { ...gantt.config, ...basicConfig, date_scale: this.dayDateScale };
      gantt.templates = { ...gantt.templates, ...basicTemplate };
      gantt.plugins(ganttPlugins);
      if (this.showToday) {
        this.createTodayLine();
      }
      this.highlightWeekend();
      this.initSkins();
      this.initStartEndDate();
      // 无配置项时，使用默认配置来兜底显示
      if (this.ganttTableConfig) {
        this.parseIDETableConfig(
          JSON.parse(JSON.stringify(this.ganttTableConfig))
        );
      } else {
        this.parseIDETableConfig(initialTableConfig);
      }
      gantt.config.sections = [
        { key: "row", label: "", align: "center", width: 80 },
      ];
      gantt.init(this.$refs.gantt);
      let ganttDataSources, ganttFinalDataSources;
      if (this.$env.VUE_APP_DESIGNER || !window.appInfo) {
        ganttDataSources = initialData.data;
      } else {
        ganttDataSources = this.currentDataSource.data;
      }
      ganttDataSources = this.handleDateDiff(
        JSON.parse(JSON.stringify(ganttDataSources))
      );
      ganttFinalDataSources = this.normalizeGanttData(ganttDataSources);
      if (!ganttFinalDataSources[0]) return;
      console.log(ganttFinalDataSources, initialData, this.currentDataSource)
      gantt.parse({
        data: ganttFinalDataSources,
      });
    },
    addMarker() {
      gantt.templates.legend = () => {
        let legendContent = "";

        this.markers.forEach((marker) => {
          legendContent += `<div style='width: fit-content;background: ${marker.color};'>${marker.label}</div>`;
        });
        return legendContent;
      };
      gantt.templates.scale_cell_class = (item) => {
        let className = '';
        this.markers.forEach((marker) => {
          if (item >= marker.start && item <= marker.end) {
            className = `bg-${marker.color}`; // 返回包含background-color样式的字符串
          }
        });
        return className
      };
      var legendContainer = document.getElementById("legend_container");
      legendContainer.innerHTML = gantt.templates.legend();
    },
    highlightWeekend() {
      gantt.config.work_time = this.jumpWeekend;
      gantt.templates.timeline_cell_class = (item, date) => {
        if (date.getDay() === 0 || date.getDay() === 6) {
          return "weekend";
        }
        return "";
      };
    },
    // 今日线
    createTodayLine() {
      let dateToStr = gantt.date.date_to_str("%Y年%M%d日");
      let markerId = gantt.addMarker({
        id: "markerLine",
        start_date: new Date(),
        css: "today",
        text: "今日",
        title: dateToStr(new Date()),
      });
      gantt.updateMarker(markerId);
    },
    //定位到今日线
    changeToday() {
      this.$nextTick(() => {
        let ganTT = document.getElementsByClassName("gantt_marker today");
        if (ganTT.length > 0) {
          gantt.scrollTo(ganTT[0].offsetLeft - 300, null);
        } else {
          console.log("图上未显示今日标记线");
        }
      });
    },
    // 切换年月周日视图
    ganttChangeDateView(event) {
      switch (event.value || event) {
        case "year":
          gantt.config.scale_unit = "year";
          gantt.config.step = 1;
          gantt.config.subscales = null;
          gantt.config.date_scale = "%Y年";
          gantt.templates.date_scale = null;
          break;
        case "month":
          gantt.config.scale_unit = "month";
          gantt.config.step = 1;
          gantt.config.date_scale = "%m月";
          gantt.templates.date_scale = null;
          break;
        case "week":
          gantt.config.scale_unit = "week";
          gantt.config.step = 1;
          gantt.config.date_scale = "第%w周";
          gantt.templates.date_scale = null;
          break;
        case "day":
          gantt.config.scale_unit = "day";
          gantt.config.step = 1;
          gantt.config.date_scale = this.dayDateScale || "%m月%d日";
          gantt.templates.date_scale = null;
          break;
      }
      gantt.render();
    },

    // gantt交互事件注册
    ganttChangeEvent() {
      this.ganttEvent.onScaleClick = gantt.attachEvent(
        "onScaleClick",
        (e, date) => {
          this.$emit("scaleClick", date);
        }
      );

      // gantt渲染
      this.ganttEvent.onGanttReady = gantt.attachEvent("onGanttReady", () => {
        gantt.templates.tooltip_text = (start, end, task) => {
          let template = "";
          if (!this.ganttTableConfig) return template;
          for (let item of this.ganttTableConfig) {
            const currentField = this.extractEntityField(item?.nameField);
            if (
              item.showTooltip &&
              currentField === this.extractEntityField(this.textField)
            ) {
              template += `<b>${item.labelField}:</b> ${task.text}<br/>`;
            } else if (
              item.showTooltip &&
              (currentField !== this.extractEntityField(this.startField) ||
                currentField !== this.extractEntityField(this.endField))
            ) {
              template += `<b>${item.labelField}:</b> ${task[currentField]}<br/>`;
            }
          }
          template +=
            "<b>开始时间:</b> " +
            moment(start).format("YYYY-MM-DD") +
            "<br/><b>结束时间:</b> " +
            moment(new Date(end).valueOf() - 1000 * 60 * 60 * 24).format(
              "YYYY-MM-DD"
            );
          return template;
        };
        gantt.templates.grid_file = (item) => {
          if (!item) return "<div class='gantt_tree_icon gantt_file'></div>";
          let template = "";
          const iconUrl = item[this.extractEntityField(this.iconField)];
          const isSvg = iconUrl && iconUrl.endsWith(".svg");
          if (iconUrl) {
            template += `<div class="gantt_tree_icon"><img src="${iconUrl}"></img></div>`;
            return template;
          } else {
            return "<div class='gantt_tree_icon gantt_file'></div>";
          }
        };
      });
    },
    // 解析左侧数据表格配置项
    parseIDETableConfig(config) {
      if (!config) return;
      let tableConfig = [];
      config.map((item) => {
        let obj = {};
        const currentField = this.extractEntityField(item?.nameField);
        if (currentField === this.startField) {
          obj = {
            name: "start_date",
            align: "center",
            template: function(task) {
              return moment(task.start_date).format("YYYY-MM-DD");
            },
          };
        } else if (currentField === this.endField) {
          obj = {
            name: "end_date",
            align: "center",
            template: function(task) {
              return moment(task.start_date).format("YYYY-MM-DD");
            },
          };
        } else if (currentField === this.extractEntityField(this.textField)) {
          obj = { name: "text", tree: true, align: "left" };
        } else {
          obj = {
            name: this.extractEntityField(item.nameField),
            align: "center",
          };
        }
        obj = Object.assign(obj, {
          label: item.labelField,
          resize: true,
          width: item.width,
          customIcon: item.iconField,
        });
        tableConfig.push(obj);
      });
      gantt.config.columns = JSON.parse(JSON.stringify(tableConfig));
    },
    initSkins() {
      switch (this.skins) {
        case "default":
          require("dhtmlx-gantt/codebase/dhtmlxgantt.css"); // 样式模块
          break;
        case "skyblue":
          require("dhtmlx-gantt/codebase/skins/dhtmlxgantt_skyblue.css");
          break;
        case "meadow":
          require("dhtmlx-gantt/codebase/skins/dhtmlxgantt_meadow.css");
          break;
        case "broadway":
          require("dhtmlx-gantt/codebase/skins/dhtmlxgantt_broadway.css");
          break;
      }
    },
    initStartEndDate() {
      if (this.ganttStartDate) {
        gantt.config.start_date = this.ganttStartDate;
      }
      if (this.ganttEndDate) {
        gantt.config.end_date = this.ganttEndDate;
      }
    },
    changeObjKey(obj, oldKey, newKey) {
      if (oldKey === newKey) return;
      if (obj?.hasOwnProperty(oldKey)) {
        obj[newKey] = obj[oldKey];
        if (!["start_date", "end_date"].includes(newKey)) {
          delete obj[oldKey];
        }
      }
    },
    extractEntityName(list) {
      if (list?.length === 0 || !list) {
        return "";
      }
      const field = list[0]?.nameField;
      if (field && field.indexOf(".") !== -1) {
        return field.split(".")[0];
      } else {
        return "";
      }
    },
    extractEntityField(string) {
      if (!string) {
        return "";
      }
      if (string.indexOf(".") !== -1) {
        const len = string.split(".").length;
        return string.split(".")[len - 1];
      } else {
        return string;
      }
    },
    flatList(list, entityName) {
      if (entityName?.length === 0) {
        return list;
      }
      let res = [];
      for (let i = 0; i < list.length; i++) {
        res.push(list[i][entityName]);
      }
      return res;
    },
    normalizeGanttData(ganttFinalDataSources) {
      const entityName = this.extractEntityName(this.ganttTableConfig);
      this.entityName = entityName;
      ganttFinalDataSources = this.flatList(ganttFinalDataSources, entityName);
      ganttFinalDataSources.map((obj) => {
        this.changeObjKey(
          obj,
          this.extractEntityField(this.startField),
          "start_date"
        );
        this.changeObjKey(
          obj,
          this.extractEntityField(this.endField),
          "end_date"
        );
        this.changeObjKey(
          obj,
          this.extractEntityField(this.durationField),
          "duration"
        );
        this.changeObjKey(obj, this.extractEntityField(this.idField), "id");
        this.changeObjKey(
          obj,
          this.extractEntityField(this.colorField),
          "color"
        );
        this.changeObjKey(
          obj,
          this.extractEntityField(this.progressField),
          "progress"
        );
        this.changeObjKey(
          obj,
          this.extractEntityField(this.parentField),
          "parent"
        );
        this.changeObjKey(obj, this.extractEntityField(this.textField), "text");
      });
      return ganttFinalDataSources;
    },
    handleDateDiff(dataSource) {
      if (this.endField) {
        dataSource.map((item) => {
          const start = item[this.extractEntityField(this.startField)];
          const end = item[this.extractEntityField(this.endField)];
          const diff = moment(end).diff(moment(start), "days");
          item.duration = diff;
        });
        gantt.config.work_time = false;
      }
      return dataSource;
    },
    initBlurEvent() {
      const ganttContainer = document.querySelector(".ganttContainer");
      ganttContainer.addEventListener(
        "mouseleave",
        function(e) {
          const template = document.querySelector(".gantt_tooltip");
          if (template) {
            template.style.display = "none";
          }
        },
        true
      );
      ganttContainer.addEventListener(
        "click",
        function(e) {
          const template = document.querySelector(".gantt_tooltip");
          if (template) {
            setTimeout(() => {
              template.style.display = "none";
            }, 1000);
          }
        },
        true
      );
      ganttContainer.addEventListener(
        "mouseenter",
        function(e) {
          const template = document.querySelector(".gantt_tooltip");
          if (template) {
            template.style.display = "block";
          }
        },
        true
      );
    },
  },
};
</script>

<style>
@import "./index.css";
</style>
