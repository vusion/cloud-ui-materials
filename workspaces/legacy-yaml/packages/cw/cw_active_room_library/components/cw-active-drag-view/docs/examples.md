### 基本用法

``` vue

<template>
<cw-active-drag-view :value="comList" @onSaveData="handleSave">
     <cw-active-drag-view-cell :key="1" >
       
        <div style="margin-right:10px">日历</div>     
      </cw-active-drag-view-cell>
        <cw-active-drag-view-cell style="padding:10px" :key="2">
       
        <div style="padding:10px ;background:yellow;"> 工作经历</div>
        </cw-active-drag-view-cell>
        <cw-active-drag-view-cell style="background:blue" :key="3">今日任务</cw-active-drag-view-cell>
        <cw-active-drag-view-cell style="background:red" :key="4">明日事件</cw-active-drag-view-cell>
</cw-active-drag-view>
</template>
<script>
export default {
  methods:{
    handleSave(e){
      console.log(e)
    }
  },
  data(){
    return {
//      comList: [
//     {
//         "order": 2,
//         "basis": "25%",
//         "hidden": true
//     },
//     {
//         "order": 1,
//         "basis": "55%",
//         "hidden": false
//     },
//     {
//         "order": 0,
//         "basis": "48.7968%",
//         "hidden": false
//     },
//     {
//         "order": 3,
//         "basis": "30%",
//         "hidden": false
//     }
// ],
      comList:[
        {
        name:"日历",
        hidden:true,
        order:1,
        basis:"25%"
        },
        {
        name:"工作经历",
        hidden:false,
        order:2,
        basis:"55%"
        },
        {
        name:"今日任务",
        hidden:false,
        order:0,
        basis:"30%"
        },
        {
        name:"明日事件",
        hidden:false,
        order:3,
        basis:"30%"
        },
      ]
    }
  }
}
</script>
```
