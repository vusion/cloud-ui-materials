import {gantt} from 'dhtmlx-gantt';
import {locale} from "@/locale";

function ganttDealById(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].key == id)
            return list[i].label;
    }
    return "";
}

export const ganttPlugins = {
    click_drag: true,
    drag_timeline: true,// 拖动图
    marker: true,// 时间标记
    fullscreen: true,// 全屏
    tooltip: true,// 鼠标经过时信息
    undo: true // 允许撤销
};

export const initialData = {
    data: [
        {id: 1, text: '项目 #1', start_date: '2023-04-15 00:00', duration: 3, progress: 0.6, open: true},
        {id: 2, text: '任务 #1', start_date: '2023-04-18 00:00', duration: 3, progress: 0.4, parent: 1},
        {id: 3, text: '任务 #2', start_date: '2023-04-20 00:00', duration: 3, progress: 0.4, parent: 1},
    ],
    links: [
        {id: 1, source: 1, target: 2, type: '0'},
        {id: 2, source: 2, target: 3, type: '0'},
    ],
};

export const basicConfig = {
    branch_loading: true,
    xml_date: "%Y-%m-%d",
    order_branch: true,
    autofit: true,
    drag_links: false,//连线
    readonly: false, //只读
    date_scale: "%m月%d日", //右侧显示列名
    layout: {//拖拽布局
        css: "gantt_container",
        rows: [
            {
                cols: [
                    {view: "grid", id: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
                    {resizer: true, width: 1},
                    {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                    {view: "scrollbar", scroll: "y", id: "scrollVer"}
                ]
            },
            {view: "scrollbar", scroll: "x", id: "scrollHor", height: 20}
        ]
    },
    start_on_monday: true,
    work_time: true,
    resize_rows: true,
    fit_tasks: true,
    lightbox: {
        sections: [
            {name: "text", height: 70, map_to: "text", type: "textarea", focus: true, width: "*"},
            {name: "time", height: 40, map_to: "auto", type: "duration", time_format: ["%Y", "%m", "%d"]},
            {name: "projectClass", height: 30, map_to: "proTemplate", type: "template",},
            {name: "head", height: 22, map_to: "head_id", type: "select", options: gantt.serverList('staff', [])},
            {name: "description", height: 70, map_to: "description", type: "textarea"},
            {name: "priority", height: 40, map_to: "priority", type: "radio", options: gantt.serverList("priority")},
        ],
    },
};




