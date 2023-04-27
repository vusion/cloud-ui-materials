<template>
<div :class="$style.root">
  <div id="gantt" ref="gantt" :class="$style.container" />
</div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'; // 样式模块
import {locale} from "@/locale";

export default {
    name: 'lcap-gantt',
    data() {
        return {
        };
    },
    mounted() {
        this.initGantt();

    },
    methods: {
        initGantt() {
            gantt.locale = locale;
            // 启用动态加载
            gantt.config.branch_loading = true
            //日期格式化
            gantt.config.xml_date = "%Y-%m-%d";
            gantt.config.order_branch = true;
            gantt.config.order_branch_free = true;
            //左侧是否自适应
            gantt.config.autofit = true;
            gantt.config.drag_links = true;//连线
            gantt.config.readonly = false; //只读
            gantt.config.date_scale = "%m月%d日"; //右侧显示列名
            gantt.config.layout = {//拖拽布局
                css: "gantt_container",
                rows: [
                    {
                        cols: [
                            { view: "grid", id: "grid", scrollX: "scrollHor", scrollY: "scrollVer" },
                            { resizer: true, width: 1 },
                            { view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                            { view: "scrollbar", scroll: "y", id: "scrollVer" }
                        ]
                    },
                    { view: "scrollbar", scroll: "x", id: "scrollHor", height: 20 }
                ]
            };
            gantt.config.start_on_monday = true;
            gantt.config.work_time = true;
            gantt.config.fit_tasks = true; //自动调整图表坐标轴区间用于适配task的长度
            gantt.init(this.$refs.gantt);
            gantt.parse({
                data: [
                    { id: 1, text: '项目 #1', start_date: '2023-04-15 00:00', duration: 3, progress: 0.6 },
                    { id: 2, text: '任务 #1', start_date: '2023-04-18 00:00', duration: 3, progress: 0.4, parent: 1 },
                    { id: 3, text: '任务 #2', start_date: '2023-04-20 00:00', duration: 3, progress: 0.4, parent: 1 },
                ],
                links: [
                    { id: 1, source: 1, target: 2, type: '0' },
                    { id: 2, source: 2, target: 3, type: '0' },
                ],
            });
        }
    }

};
</script>

<style module>
.root {
    width: 1200px;
    height: 600px;
}
.container {
  width: 100%;
  height: 100%;
}
</style>
