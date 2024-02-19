<template>
  <div :class="$style.absoluteStyle" :style="{
    width: `${width + dw}px`,
    height: `${Math.round((width + dw) / ratio)}px`,
    transform: `translate(${x + dx}px, ${y + dy}px)`,
  }">
    <div :class="[
      $style.imgMoveContainer,
      operation === 'move' ? $style.cursorGrabbing : '',
      operation ? $style.operation : '',
    ]" @mousedown="handlePanStart" @touchstart="handlePanStart">
      <div v-if="!fixSize" data-direction="left-top" :class="[
        $style.absoluteStyle,
        $style.selector,
        $style.cursorResize,
      ]" :style="{ top: '0%', left: '0%' }" />
      <div v-if="!fixSize" data-direction="right-top" :class="[
        $style.absoluteStyle,
        $style.selector,
        $style.cursorResize,
      ]" :style="{ top: '0%', left: '100%' }" />
      <div v-if="!fixSize" data-direction="left-bottom" :class="[
        $style.absoluteStyle,
        $style.selector,
        $style.cursorResize,
      ]" :style="{ top: '100%', left: '0%' }" />
      <div v-if="!fixSize" data-direction="right-bottom" :class="[
        $style.absoluteStyle,
        $style.selector,
        $style.cursorResize,
      ]" :style="{ top: '100%', left: '100%' }" />
    </div>
    <div :class="[
      $style.absoluteStyle,
      $style.cursorGrabbing,
      $style.delete
    ]" :style="{ top: '0%', left: '50%' }" @click="onDelete" v-if="!fixSize">
      <img src="./assets/close.png" alt="delete object" />
    </div>
    <canvas ref="imgCanvas" :class="$style.imgCanvasView" />
  </div>
</template>

<script>
export default {
  name: "image-item",
  props: [
    "payload",
    "file",
    "width",
    "height",
    "originWidth",
    "originHeight",
    "x",
    "y",
    "fixSize"
  ],
  data() {
    return {
      startX: null,
      startY: null,
      canvas: null,
      operation: "",
      directions: [],
      dx: 0,
      dy: 0,
      dw: 0,
      dh: 0,
      x_mixin: null,
      y_mixin: null,
    };
  },
  computed: {
    ratio() {
      return this.originWidth / this.originHeight;
    },
  },
  watch: {
    async file(value) {
      value && (await this.render());
    },
  },
  async mounted() {
    console.log('render')
    await this.render();
  },
  methods: {
    async render() {
      // use canvas to prevent img tag's auto resize
      const canvas = this.$refs.imgCanvas;
      canvas.width = this.originWidth;
      canvas.height = this.originHeight;
      canvas.getContext("2d").drawImage(this.payload, 0, 0);
      let scale = 1;
      const MAX_TARGET = 500;
      if (this.width > MAX_TARGET) {
        scale = MAX_TARGET / this.width;
      }
      if (this.height > MAX_TARGET) {
        scale = Math.min(scale, MAX_TARGET / this.height);
      }
      this.$emit("onUpdate", {
        width: this.width * scale,
        height: this.height * scale,
      });
      if (
        !["image/jpeg", "image/png", "image/webp"].includes(
          this.file.type,
        )
      ) {
        canvas.toBlob((blob) => {
          this.$emit("onUpdate", {
            file: blob,
          });
        });
      }
    },
    handlePanMove(event) {
      let coordinate;
      if (event.type === "mousemove") {
        coordinate = this.handleMousemove(event);
      }
      if (event.type === "touchmove") {
        coordinate = this.handleTouchmove(event);
      }
      if (!coordinate) return console.log("ERROR");

      const _dx = (coordinate.detail.x - this.startX);
      const _dy = (coordinate.detail.y - this.startY);
      if (this.operation === "move") {
        this.dx = _dx;
        this.dy = _dy;
      } else if (this.operation === "scale") {
        if (this.directions.includes("left")) {
          this.dx = _dx;
          this.dw = -_dx;
        }
        if (this.directions.includes("top")) {
          this.dy = _dy;
          this.dh = -_dy;
        }
        if (this.directions.includes("right")) {
          this.dw = _dx;
        }
        if (this.directions.includes("bottom")) {
          this.dh = _dy;
        }
      }
    },

    handlePanEnd(event) {
      let coordinate;
      if (event.type === "mouseup") {
        coordinate = this.handleMouseup(event);
      }
      if (event.type === "touchend") {
        coordinate = this.handleTouchend(event);
      }
      if (!coordinate) return console.log("ERROR");
      if (this.operation === "move") {
        this.$emit("onUpdate", {
          x: this.x + this.dx,
          y: this.y + this.dy,
        });
        this.dx = 0;
        this.dy = 0;
      } else if (this.operation === "scale") {
        this.$emit("onUpdate", {
          x: this.x + this.dx,
          y: this.y + this.dy,
          width: this.width + this.dw,
          height: Math.round((this.width + this.dw) / this.ratio),
        });
        this.dx = 0;
        this.dy = 0;
        this.dw = 0;
        this.dh = 0;
        this.directions = [];
      }
      this.operation = "";
    },
    handlePanStart(event) {
      let coordinate;
      if (this.fixSize) {
        return
      }
      if (event.type === "mousedown") {
        coordinate = this.handleMousedown(event);
      }
      if (event.type === "touchstart") {
        coordinate = this.handleTouchStart(event);
      }
      if (!coordinate) return console.log("ERROR");

      this.startX = coordinate.detail.x;
      this.startY = coordinate.detail.y;
      if (coordinate.detail.target === event.currentTarget) {
        return (this.operation = "move");
      }
      this.operation = "scale";
      this.directions =
        coordinate.detail.target.dataset.direction.split("-");
    },
    onDelete() {
      this.$emit("onDelete");
    },
    handleMousedown(event) {
      console.log('mousedown')
      this.x_mixin = event.clientX;
      this.y_mixin = event.clientY;
      const target = event.target;
      window.addEventListener("mousemove", this.handlePanMove);
      window.addEventListener("mouseup", this.handlePanEnd);
      return {
        detail: { x: this.x_mixin, y: this.y_mixin, target },
      };
    },

    handleMousemove(event) {
      const dx = event.clientX - this.x_mixin;
      const dy = event.clientY - this.y_mixin;
      this.x_mixin = event.clientX;
      this.y_mixin = event.clientY;

      return {
        detail: { x: this.x_mixin, y: this.y_mixin, dx, dy },
      };
    },

    handleMouseup(event) {
      this.x_mixin = event.clientX;
      this.y_mixin = event.clientY;
      window.removeEventListener("mousemove", this.handlePanMove);
      window.removeEventListener("mouseup", this.handlePanEnd);
      return {
        detail: { x: this.x_mixin, y: this.y_mixin },
      };
    },
    handleTouchStart(event) {
      if (event.touches.length > 1) return;
      const touch = event.touches[0];
      this.x_mixin = touch.clientX;
      this.y_mixin = touch.clientY;
      const target = touch.target;

      window.addEventListener("touchmove", this.handlePanMove, {
        passive: false,
      });
      window.addEventListener("touchend", this.handlePanEnd);
      return {
        detail: { x: this.x_mixin, y: this.y_mixin, target },
      };
    },
    handleTouchmove(event) {
      if (event.touches.length > 1) return;
      const touch = event.touches[0];
      const dx = touch.clientX - this.x_mixin;
      const dy = touch.clientY - this.y_mixin;
      this.x_mixin = touch.clientX;
      this.y_mixin = touch.clientY;

      return {
        detail: { x: this.x_mixin, y: this.y_mixin, dx, dy },
      };
    },
    handleTouchend(event) {
      const touch = event.changedTouches[0];
      this.x_mixin = touch.clientX;
      this.y_mixin = touch.clientY;

      window.removeEventListener("touchmove", this.handlePanMove);
      window.removeEventListener("touchend", this.handlePanEnd);
      return {
        detail: { x: this.x_mixin, y: this.y_mixin },
      };
    },
  },
};
</script>

<style module>
.absoluteStyle {
  position: absolute;
  user-select: none;
  top: 0;
  left: 0;
  cursor: grab;
}

.cursorGrabbing {
  cursor: grabbing;
}

.cursorResize {
  cursor: nwse-resize;
}

.operation {
  background-color: rgba(0, 0, 0, 0.3);
}

.selector {
  border-radius: 10px;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  background-color: var(--brand-primary);
  border: 1px solid var(--brand-primary);
}

.delete {
  border-radius: 10px;
  width: 18px;
  height: 18px;
  margin-left: -9px;
  margin-top: -9px;
  background-color: var(--color-white);
  img {
    width: 100%;
    height: 100%;
  }
}
.imgCanvasView {
  border: 1px dashed var(--brand-primary);
  width: 100%;
  height: 100%;
}
.imgMoveContainer {
  position: absolute;
  user-select: none;
  top: 0;
  left: 0;
  cursor: grab;
  width: 100%;
  height: 100%;
}
</style>
