<template>
<div :class="$style.root">
  <div id="gantt" ref="gantt" :class="$style.container" />
</div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'; // 样式模块
import { locale } from "@/locale";
import { basicConfig, initialData } from "@/ganttConfig";
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
            gantt.config = {
                ...gantt.config,
                ...basicConfig,
            };
            gantt.plugins({
                click_drag: true,
                drag_timeline: true,// 拖动图
                marker: true,// 时间标记
                fullscreen: true,// 全屏
                tooltip: true,// 鼠标经过时信息
                undo: true // 允许撤销
            })
            gantt.init(this.$refs.gantt);
            gantt.parse(initialData);
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
    overflow: hidden;
}
</style>
