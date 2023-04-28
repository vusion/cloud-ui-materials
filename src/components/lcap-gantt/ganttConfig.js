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
        { id: 1, text: '项目 #1', start_date: '2023-04-15 00:00', duration: 3, progress: 0.6, open: true },
        { id: 2, text: '任务 #1', start_date: '2023-04-18 00:00', duration: 3, progress: 0.4, parent: 1 },
        { id: 3, text: '任务 #2', start_date: '2023-04-20 00:00', duration: 3, progress: 0.4, parent: 1 },
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' },
        { id: 2, source: 2, target: 3, type: '0' },
    ],
};

export const basicConfig = {
    branch_loading: true,
    xml_date: "%Y-%m-%d",
    order_branch: true,
    autofit: true,
    drag_links: true,//连线
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
    columns: [
        //{ name: "add", width: 44 }
        {
            name: "text",
            min_width: 130,
            max_width: 200,
            label: "任务",
            align: "left",
            resize: true,
            tree: true,
            editor: {type: 'text', map_to: 'text'}
        },
        {name: "id", label: "", hide: true},
        {name: "start_date", label: "开始时间", width: 120, resize: true, align: "left"},
        {
            name: "head", width: 110, height: 40, label: "负责人", resize: true, align: "center",
            // editor: {
            //      map_to: "head_id", type: "select", options: gantt.serverList("staff"),
            // },
            // #这里的template渲染的是任务头像跟名称，this.genttDealById 是在methods定义的方法根据id获取名称，gantt.serverList()是甘特图获取数据集分发

        },
        // { name: "end_date", label: "结束时间", align: "center" },
        {
            name: "taskProgress", label: "任务状态", align: "center", width: 130, editor: {
                type: "select", map_to: "taskProgress", options: [
                    // #这里的labels.taskProgress_0属性是自定义汉化属性描述
                    {key: "0", label: locale.labels.taskProgress_0},
                    {key: "1", label: locale.labels.taskProgress_1},
                    {key: "2", label: locale.labels.taskProgress_2},
                    {key: "3", label: locale.labels.taskProgress_3},
                    {key: "4", label: locale.labels.taskProgress_4},
                ],
            },
            // #obj形参是单个的tasks.data中的数据
            template: function (obj) {
                let re = '';
                switch (obj.taskProgress) {
                    case "0":
                        // #这里的样式类名只能通过css读取，写在less scss无法读取
                        re = `<div class='taskProgress color_bg_1' >未开始</div>`
                        break;
                    case "1":
                        re = `<div class='taskProgress color_bg_2' >进行中</div>`
                        break;
                    case "2":
                        re = `<div class='taskProgress color_bg_3'  >已完成</div>`
                        break;
                    case "3":
                        re = `<div  class='taskProgress color_bg_4'>已延期</div>`
                        break;
                    case "4":
                        re = `<div  class='taskProgress color_bg_5' >搁置中</div>`
                        break;
                }
                return re
            }
        },
    ],
};




