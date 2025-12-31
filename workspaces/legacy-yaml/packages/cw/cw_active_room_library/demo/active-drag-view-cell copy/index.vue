<template>
  <div class="active-drag-view-cell">
    <div class="container">
        <div class="resizable-container" v-panel-resize:horizontal="handleResizer">
            <div class="item item-1 wrapper" weight="0.3">1</div>
            <div class="item item-2 wrapper" weight="0.35">2</div>
            <div class="item item-3 wrapper" weight="0.35">3</div>
        </div>
    </div>
  </div>
</template>

<script>
import PanelResize from '@/directives/rezizer'
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



.ide-divider {
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
</style>