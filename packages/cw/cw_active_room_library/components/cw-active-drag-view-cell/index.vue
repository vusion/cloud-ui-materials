<template>
    <div class="cell" ref="cell"  v-panel-resize:horizontal="handleResizer" vusion-slot-name="default">
        <slot></slot>
    </div>
</template>

<script>
import PanelResize from '@/directives/resize'
// import PanelResize from '@/directives/rezizer'
export default {
    name:"cw-active-drag-view-cell",
    directives: {
        PanelResize
    },
    props:{
      value:{
        type:String,
        default:"25%"
      },
      basis:{
        type:Number,
        default:1
      },
      basisLen:{
        type:Number,
        default:4
      },
    },
    data(){
        return {
            selfBasis:""
        }
    },
    watch:{
        value:{
            handler(v){
                this.init()
            },
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            // const flexBasis = (Math.floor (100 / (this.basisLen *this.basis)*10))/10 + "%"
            this.$refs.cell.style.flexBasis = this.value
            this.selfBasis = this.value
        },
        handleResizer(len,e){
          this.selfBasis = len
      }
    }
}
</script>

<style type="less">

.active-drag-view-cell{
    width: 800px;
    min-height: 30px;
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
.drag-room .cell{
    overflow: hidden;
    min-height: 40px;
}

.drag-room:not(.drag-disabled-room) .cell:hover{
    box-shadow: inset 0px 0px 1px 2px #ccc;
}
</style>