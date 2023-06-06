### 基本用法

```html
<lcap-gantt :data-source="[
        { id: 1, text: '项目 #1', start_date: '2023-04-20 00:00', duration: 9, progress: 0.6, open: true, head: '赵一', state: 'default' },
        { id: 2, text: '规划', start_date: '2023-04-20 00:00', duration: 3, progress: 0.4, parent: 1, head: '钱二', state: 'finished' },
        { id: 3, text: '实施', start_date: '2023-04-24 00:00', duration: 4, progress: 0.5, parent: 1, head: '孙三', state: 'unfinished' },
        { id: 4, text: '复盘', start_date: '2023-04-28 00:00', duration: 3, progress: 0.6, parent: 1, head: '李四', state: 'canceled' },
    ]" 
            :link-source="[
        { id: 2, source: 2, target: 3, type: '0' },
        { id: 3, source: 3, target: 4, type: '0' },
    ]"
            :ganttTableConfig="[{'labelField':'项目名称','iconField':'icon','showIcon':false,'nameField':'text'},{'labelField':'负责人','iconField':'icon','showIcon':false,'nameField':'head'}]"
            parent-field="parent"
>
</lcap-gantt>
```
