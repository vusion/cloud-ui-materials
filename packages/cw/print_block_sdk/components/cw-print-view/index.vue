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
  methods: {
    async print() {
      const historyEl = document.querySelector(".print-block-room");
      if (historyEl) {
          historyEl.remove();
      }

      // 确认打印前所有元素已经完全加载和显示
      const el = this.$refs["print-room"].cloneNode(true);
      el.classList.add("print-block-room");
      document.body.appendChild(el);
      console.log("el", el);
      let promises = [];
      this.getCanvas(el, "", promises);
      console.log("Promises:", promises);

      try {
        await Promise.all(promises);
        console.log("All canvas data copied successfully");
        window.print();
      } catch (error) {
        console.error("Error during canvas data copying:", error);
      }
    },
    getCanvas(el, path = "", promises) {
      const children = el.childNodes;
      children.forEach((item, index) => {
        if (item.childNodes.length > 0) {
          this.getCanvas(item, (path += item.tagName), promises);
        } else {
          if (item.tagName === "CANVAS") {
            const source = this.$refs["print-room"].querySelector(
              `${path.toLowerCase()} ${item.tagName.toLowerCase()}:nth-child(${
                index + 1
              })`
            );
            promises.push(this.copyCanvasData(item, source));
          }
        }
      });
    },
    copyCanvasData(target, source) {
      return new Promise((resolve, reject) => {
        const data = source.toDataURL("image/png");
        const img = new Image();
        img.src = data;
        img.onload = () => {
          const ctx = target.getContext("2d");
          ctx.drawImage(img, 0, 0, source.width, source.height);
          resolve(true);
        };
        img.onerror = () => {
          reject(false);
        };
      });
    },
  },
};
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
