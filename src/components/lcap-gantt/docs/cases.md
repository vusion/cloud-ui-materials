```html

<lcap-gantt ref="lcap_gantt1" :data-source="[
        { id: 1, text1: '项目 #1', start: '2023-04-20 00:00', duration: 4, progress: 0.6, open: true, head: '赵一', state: 'default', color: '#5692f0', iconUrl: '' },
        { id: 2, text1: '规划', start: '2023-04-20 00:00', duration: 3, progress: 0.8, parent: 1, head: '钱二', state: 'finished', color: '#5692f0', iconUrl: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d177d0536094224a3132392c8a83c0b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?' },
        { id: 3, text1: '实施', start: '2023-04-24 00:00', duration: 4, progress: 0.5, parent: 1, head: '孙三', state: 'unfinished', color: '#84bd54' },
        { id: 4, text1: '复盘', start: '2023-04-28 00:00', duration: 3, progress: 0.1, parent: 1, head: '李四', state: 'canceled', color: '#da645d' },
    ]" text-field="gantt.title" start-field="gantt.startTime" duration-field="gantt.duration"
            progress-field="gantt.precent" id-field="gantt.key" parent-field="gantt.parent" color-field="gantt.color"
            :ganttTableConfig="[{'nameField':'gantt.title','labelField':'项目名','showTooltip':true,'width':120},{'nameField':'gantt.startTime','labelField':'开始时间','showTooltip':true,'width':'150'},{'nameField':'gantt.createdTime','labelField':'创建时间','showTooltip':false,'width':120},{'nameField':'gantt.color','labelField':'列标题','showTooltip':false,'width':120}]"></lcap-gantt>
```
