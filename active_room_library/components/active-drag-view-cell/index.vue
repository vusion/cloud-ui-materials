<template>
  <!-- <div class="active-drag-view-cell"> -->
    <div class="cell" v-panel-resize:horizontal="handleResizer" vusion-slot-name="default">
        <slot></slot>
    </div>
    <!-- <div class="cell" v-panel-resize:horizontal="handleResizer">2</div>
    <div class="cell" v-panel-resize:horizontal="handleResizer">2</div>
    <div class="cell" v-panel-resize:horizontal="handleResizer">2</div> -->
  <!-- </div> -->
</template>

<script>
import PanelResize from '@/directives/resize'
// import PanelResize from '@/directives/rezizer'
export default {
    name:"active-drag-view-cell",
    directives: {
        PanelResize
    },
    props:{
      value:{
        type:String,
        default:"请在这里编写代码"
      }
    },
    methods:{
      handleResizer(e){
        console.log(e,888);
      }
    }
}
</script>

<style type="less">

.active-drag-view-cell{
    width: 800px;
    height: 600px;
    background:  linear-gradient(90deg,#f5f5f5 10px, #ccc 10px, #ffffff 100%)
    linear-gradient(90deg,#f5f5f5 10px, #ccc 10px, #ffffff 100%);
    background-size: 100px 100px;
    display: flex;
    flex-wrap: wrap;
}

.resizable-container {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: stretch;
    min-width: 0;
    min-height: 0;
    height: 100%;
    flex-wrap: wrap;
}

.drag-disabled-room .ide-divider{
    display: none;
}

.ide-divider {
    opacity: 0;
    &:hover{
       opacity: .1;
    }
    position: absolute;
    z-index: 97;
    &:after {
        position: absolute;
        background-color: #505050;
        content: "";
    }

    &.horizontal {
        right: 0;
        top: 0;
        width: 7px;
        height: 100%;
        margin: 0 -3px;
        cursor: ew-resize;

        &:after {
            top: 0;
            bottom: 0;
            left: 3px;
            width: 1px;
        }
    }

    &.vertical {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 7px;
        margin: -3px 0;
        cursor: ns-resize;

        &:after {
            left: 0;
            right: 0;
            top: 3px;
            height: 1px;
        }
    }
}
.container {
    width: 400px;
    height: 450px;
    margin: 50px auto;
    border: 2px solid rgb(18, 78, 243);
}
.item {
}
.item-1 {
    background-color: pink;
}
.item-2 {
    background-color: palegoldenrod;
}
.item-3 {
    background-color: peachpuff;
}
.cell{
    background: pink ;
    flex-basis: 33.3%;
    min-height: 40px;
}
</style>