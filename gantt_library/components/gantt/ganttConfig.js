import { gantt } from "dhtmlx-gantt";
import moment from "moment";

export const ganttPlugins = {
  click_drag: false, // 是否可拖动
  drag_timeline: true, // 拖动图
  marker: true, // 时间标记
  fullscreen: true, // 全屏
  tooltip: true, // 鼠标经过时信息
  undo: true, // 允许撤销
};

const currTime = moment(new Date().valueOf()).format("YYYY-MM-DD");
const project1Time = moment(
  new Date().valueOf() + 2 * 24 * 60 * 60 * 1000
).format("YYYY-MM-DD");
const project2Time = moment(
  new Date().valueOf() + 4 * 24 * 60 * 60 * 1000
).format("YYYY-MM-DD");
export const initialData = {
  data: [
    {
      id: 1,
      text: "项目 #1",
      start_date: currTime,
      duration: 3,
      progress: 0.6,
      open: true,
      color: "#468fe3",
    },
    {
      id: 2,
      text: "示例123",
      start_date: project1Time,
      duration: 3,
      progress: 0.4,
      parent: 1,
      color: "#109b1b",
    },
    {
      id: 3,
      text: "示例2",
      start_date: project2Time,
      duration: 3,
      progress: 0.4,
      parent: 1,
      color: "#ce4a46",
    },
  ],
  links: [
    { id: 1, source: 1, target: 2, type: "0" },
    { id: 2, source: 2, target: 3, type: "0" },
  ],
};
export const initialTableConfig = [
  { labelField: "项目名称", nameField: "text", showTooltip: true, width: 120 },
  {
    labelField: "开始日期",
    nameField: "start_date",
    showTooltip: true,
    width: 140,
  },
];

export const basicConfig = {
  branch_loading: true,
  order_branch: true,
  autofit: true,
  drag_links: false, //连线
  readonly: true, //只读
  layout: {
    //拖拽布局
    css: "gantt_container",
    resizer: true,
    cols: [
      {
        // adding horizontal scrollbar to the grid via the scrollX attribute
        rows: [
          {
            view: "grid",
            scrollX: "gridScroll",
            scrollable: true,
            scrollY: "scrollVer",
          },
          { view: "scrollbar", id: "gridScroll" },
        ],
      },
    ],
    rows: [
      {
        cols: [
          {
            view: "grid",
            id: "grid",
            scrollX: "scrollHor",
            scrollY: "scrollVer",
          },
          { resizer: true, width: 1 },
          {
            view: "timeline",
            id: "timeline",
            scrollX: "scrollHor",
            scrollY: "scrollVer",
          },
          { view: "scrollbar", scroll: "y", id: "scrollVer" },
        ],
      },
      { view: "scrollbar", scroll: "x", id: "scrollHor", height: 20 },
    ],
  },
  start_on_monday: true,
//   work_time: {
//     days: [1, 2, 3, 4, 5],
//     hours: [
//         { from: 9, to: 12 },
//         { from: 13, to: 17 }
//     ],
//     breaks: [6, 7]
//   },
  resize_rows: true,
  fit_tasks: true,
  tooltip_hide_timeout: 0,
};
export const basicTemplate = {
  task_end_date: function(date) {
    return gantt.templates.task_date(
      moment(new Date(date.valueOf() - 1000 * 60 * 60 * 24)).format(
        "YYYY-MM-DD"
      )
    );
  },
  //弹窗标题 日期范围
  task_time: function(start, end, task) {
    return (
      "周期：" +
      moment(start).format("YYYY-MM-DD") +
      " 至 " +
      moment(end).format("YYYY-MM-DD")
    );
  },
  //弹窗标题 计划名称
  task_text: function(start, end, task) {
    return task.text;
  },
  timeline_cell_class: function(task, date) {
    if (!gantt.isWorkTime({ task: task, date: date })) {
      return "weekend";
    } else {
      return "weekday";
    }
  },
  grid_date_format: function(date, column) {
    if (column === "end_date") {
      return moment(new Date(date.valueOf() - 1000 * 60 * 60 * 24)).format(
        "YYYY-MM-DD"
      );
    } else if (column === "start_date") {
      return moment(date).format("YYYY-MM-DD");
    }
  },
};
