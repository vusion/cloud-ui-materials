<template>
  <div class="print-view" v-show="$env.VUE_APP_DESIGNER || isShowPrint">
    <div class="print-room" vusion-slot-name="default" ref="print-room">
      <slot></slot>
      <div v-if="!$slots.default" style="color: #ccccccd0; padding: 3px">
        请将打印的内容拖入这块区域
      </div>
    </div>
  </div>
</template>

<script>
import printJS from "print-js"
export default {
  name: "cw-print-view",
  props: {
    value: {
      type: String,
      default: "请在这里编写代码",
    },
    isShowPrint: {
      type: Boolean,
      default: false,
    },
  },
    methods:{
      async print() {
        printJS({
          printable: this.$refs["print-room"],
          type: 'html'
        })
      },
    }
}
</script>
<style>
.print-block-room {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  background: white;
  z-index: 9000;
}

.print-view {
  min-height: 200px;
  border: 1px #ccc dashed;
  position: relative;
  background: transparent;
}

@media print {
  [column="auto"] {
    page-break-inside: auto;
  }
  [class^="l-root__"],
  body > div:first-of-type,
  [class^="u-drawer_drawer__"],
  [class^="u-modal_dialog__"] {
    display: none;
  }
  [class^="u-info-list_item__"]{
    display: flex !important;
  }
  .print-block-room {
    display: block;
  }
}
</style>
