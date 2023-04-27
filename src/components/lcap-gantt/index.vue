<template>
<div :class="$style.root">
    <div>
        <u-select v-model="defaultDateView" @select="ganttChangeDateView($event)">
            <u-select-item value="y">年</u-select-item>
            <u-select-item value="m">月</u-select-item>
            <u-select-item value="w">周</u-select-item>
            <u-select-item value="d">日</u-select-item>
        </u-select>

    </div>

    <div id="gantt" ref="gantt" :class="$style.container" />
</div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'; // 样式模块
import { locale } from "@/locale";
import { basicConfig, initialData, ganttPlugins } from "@/ganttConfig";
export default {
    name: 'lcap-gantt',
    data() {
        return {
            defaultDateView: 'd',
            ganttInstance: null,
        };
    },
    mounted() {
        this.initGantt();

    },
    methods: {
        initGantt() {
            gantt.serverList("priority", [
                { key: 0, label: "最高" },
                { key: 1, label: "较高" },
                { key: 2, label: "普通" },
                { key: 3, label: "较低" },
                { key: 4, label: "最低" },
            ]);
            gantt.locale = locale;
            // 启用动态加载
            gantt.config = {
                ...gantt.config,
                ...basicConfig,
            };
            gantt.plugins(ganttPlugins);
            gantt.addMarker({
                start_date: new Date(),
                text: '今日'
            });
            gantt.init(this.$refs.gantt);
            gantt.parse(initialData);
        },
        highlightWeekend() {
            gantt.templates.timeline_cell_class = (item, date) => {
                if (date.getDay() === 0 || date.getDay() === 6) { return '$style.weekend'; } return '';
            }
        },
        // 切换年月周日视图
        ganttChangeDateView(event) {
            console.log(event);
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
.weekend{
    background:#ddd;
}
</style>
