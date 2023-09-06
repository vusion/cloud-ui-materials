### 基本用法

```html
<gantt
  :data-source="[
        { id: 1, text1: '项目 #1', start: '2023-04-20 00:00', end: '2023-04-24 00:00', duration: 4, progress: 0.6, open: true, head: '赵一', state: 'default', color: '#5692f0', iconUrl: '' },
        { id: 2, text1: '规划', start: '2023-04-20 00:00', end: '2023-04-24 00:00', duration: 3, progress: 0.8, parent: 1, head: '钱二', state: 'finished', color: '#5692f0', iconUrl: 'https://picnew7.photophoto.cn/20130122/shuimopingguotupian-10863377_1.jpg' },
        { id: 3, text1: '实施', start: '2023-04-24 00:00', end: '2023-04-28 00:00', duration: 4, progress: 0.5, parent: 1, head: '孙三', state: 'unfinished', color: '#84bd54' },
        { id: 4, text1: '复盘', start: '2023-04-28 00:00', end: '2023-05-3 00:00', duration: 3, progress: 0.1, parent: 1, head: '李四', state: 'canceled', color: '#da645d' },
    ]"
  :ganttTableConfig="[
            {'labelField':'项目名称','nameField':'text1', showTooltip: true, width: '170'},
            {'labelField':'负责人','nameField':'head', showTooltip: true, width: '100'},
            {'labelField':'开始日期','nameField':'start', showTooltip: true, width: '150'},
            {'labelField':'结束日期','nameField':'end', showTooltip: true, width: '150'}
            
            ]"
  parent-field="parent"
  start-field="start"
  duration-field="duration"
  progress-field="progress"
  text-field="text1"
  taskView="day"
  color-field="color"
  id-field="id"
  icon-field="iconUrl"
  :jumpWeekend="false"
  :showFunctionBar="true"
  skins="default"
  ganttEndDate="2023-07-19 20:07:41"
  style="--gantt-table-header-font-size:15px;
                --gantt-table-scale-color: green;
                --gantt-table-scale-font-size: 12px;
                --gantt-table-header-font-color:red; 
                --gantt-table-header-text-align: center;
                --gantt-table-background-color-striped: #f5f5f5;
               --gantt-table-background-color-hover: #f5f5f5;
               --gantt-table-cell-color: #000;
                --gantt-table-header-font-weight: bold;
                --gantt-item-progress-transparent: 0.5;
                
"
>
</gantt>
```
