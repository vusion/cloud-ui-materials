<template>
    <div :class="$style.root">
        <j-jflow
            ref="jflow"
            :class="$style.wrapper"
            :genVueComponentKey="genVueComponentKey"
            :configs="configs"
            :loading="jflowloading"
            @instancemousemove="onmousemove"
            @zoompan="onZoomPan"
            @update:loading="onUpdate">
            <template #ProcessNode="{ source }">
                <process-node :node="source"></process-node>
            </template>
            <template #plainlink="{ configs }">
                <process-link :node="configs.source" :configs="configs" @drop="onDropToLink($event, configs)"></process-link>
            </template>
        </j-jflow>
        <poppup-comp :meta="poppups.poppupMeta"></poppup-comp>
        <div :class="$style.operator">
            <div :class="[$style.operatorIcon]" @click="zoomInHandler">
                <img :src="zoomInIcon"/>
            </div>
            <div :class="[$style.operatorIcon]" @click="zoomOutHandler">
                <img :src="zoomOutIcon"/>
            </div>
            <div :class="[$style.operatorIcon]" @click="onFit">
                <img :src="fitIcon"/>
            </div>
        </div>
    </div>
</template>
<script>
import FreeLayout, { resetLinkCache } from "./layout/free-layout";
import processNode from "./components/nodes/process-node";
import processLink from "./components/links/process-flow-link.vue";
import cursorMixin from "./mixins/cursor-mixin";
import hoverMixin from "./mixins/hover-mixin";
import poppupComp from "./components/poppup/poppup";
import { render as renderLegend } from "./components/custom/legend";
import zoomInIcon from "./assets/zoomin.png";
import zoomOutIcon from "./assets/zoomout.png";
import fitIcon from "./assets/fit.png";
const adapter = {
  enableWheelMove: true,
  canvas: {
    wheel(event, jflow) {
      event.preventDefault();
      if (!adapter.enableWheelMove) {
        return;
      }
      let {
        offsetX,
        offsetY,
        deltaX,
        deltaY
      } = event;
      if (event.ctrlKey) {
        deltaY = -deltaY;
        jflow.zoomHandler(offsetX, offsetY, deltaX, deltaY, event);
      } else if (event.shiftKey) {
        jflow.panHandler(-deltaY, 0, event);
      } else {
        jflow.panHandler(-deltaX, -deltaY, event);
      }
    }
  }
};
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
export default {
  components: {
    'process-node': processNode,
    'process-link': processLink,
    poppupComp
  },
  mixins: [cursorMixin, hoverMixin],
  props: {
    ast: {
      type: Object,
      default: () => ({})
    },
    initialZoom: {
      type: String,
      default: ''
    }
  },
  provide() {
    return {
      renderJFlow: this.renderJFlow,
      poppups: this.poppups,
      closePoppup: this.closePoppup
    };
  },
  data() {
    const layout = new FreeLayout(this.ast);
    const zoom = this.initialZoom.trim() ? parseFloat(this.initialZoom) || undefined : undefined;
    return {
      zoomInIcon,
      zoomOutIcon,
      fitIcon,
      jflowloading: true,
      configs: {
        allowDrop: false,
        layout,
        eventAdapter: adapter,
        initialZoom: zoom
        // minZoom: 0.25,
      },
      poppups: {
        poppupMeta: {
          type: undefined,
          active: false,
          clientX: 0,
          clientY: 0,
          target: null,
          timer: null
        }
      },
      currentZoom: 1
    };
  },
  watch: {
    jflowloading(val) {
      if (!val) {
        this.initiialize();
      }
    }
  },
  mounted() {
    this.debouncedResize = debounce(this.resize, 200);
    window.addEventListener('resize', this.debouncedResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debouncedResize);
  },
  methods: {
    initiialize() {
      const jflow = this.$refs.jflow.getInstance();
      jflow.addEventListener('afterJflowRender', event => {
        const ctx = event.detail.ctx;
        renderLegend(jflow, ctx);
      });
      this.renderJFlow();
      this.syncZoom();
    },
    genVueComponentKey(source) {
      return source.name;
    },
    renderJFlow() {
      this.$refs.jflow.renderJFlow();
    },
    onmousemove() {
      this.setHover(null);
    },
    resize() {
      this.$nextTick(() => {
        const jflow = this.$refs.jflow.getInstance();
        jflow.resizeCanvas();
        jflow.scrollBarOnPanAndZoom();
        this.renderJFlow();
      });
    },
    closePoppup() {
      if (this.poppups.poppupMeta.timer) {
        clearTimeout(this.poppups.poppupMeta.timer);
      }
      Object.assign(this.poppups.poppupMeta, {
        type: undefined,
        active: false,
        clientX: 0,
        clientY: 0,
        target: null,
        timer: null
      });
    },
    onZoomPan() {
      this.syncZoom();
      this.closePoppup();
    },
    onUpdate(val) {
      if (!val) {
        this.initiialize();
      }
    },
    zoomInHandler() {
      this.onZoom(Math.min(3, this.currentZoom + 0.2));
    },
    zoomOutHandler() {
      this.onZoom(Math.max(0.25, this.currentZoom - 0.2));
    },
    getJFlowInstance() {
      return this.$refs.jflow.getInstance();
    },
    onZoom(newScale) {
      const jflowInstance = this.getJFlowInstance();
      const scale = jflowInstance.scale;
      const {
        actual_width: cw,
        actual_height: ch
      } = jflowInstance.canvasMeta;
      const {
        width: p_width,
        height: p_height,
        x,
        y
      } = jflowInstance.bounding_box;
      const position = jflowInstance.position;
      const deltaScale = newScale - scale;
      const currentWidth = p_width * scale;
      const currentHeight = p_height * scale;
      const deltaWidth = p_width * deltaScale;
      const deltaHeight = p_height * deltaScale;
      const tX = cw / 2 - position.x;
      const tY = ch / 2 - position.y;
      const pX = -tX / currentWidth;
      const pY = -tY / currentHeight;
      jflowInstance.scale = newScale;
      jflowInstance._recalculatePosition(pX * deltaWidth, pY * deltaHeight);
      this.doScaleZoom();
      this.renderJFlow();
    },
    onFit() {
      const jflowInstance = this.getJFlowInstance();
      const {
        actual_width: cw,
        actual_height: ch
      } = jflowInstance.canvasMeta;
      const {
        width: p_width,
        height: p_height,
        x: p_x,
        y: p_y
      } = jflowInstance.bounding_box;
      if (p_width === 1 || p_height === 1) {
        return;
      }
      const sw = cw / p_width;
      const sh = ch / p_height;
      const scale = Math.min(sw, sh);
      const x = cw / 2 - p_width * scale / 2;
      const y = ch / 2 - p_height * scale / 2;
      jflowInstance.scale = scale;
      Object.assign(jflowInstance.position, {
        offsetX: x - p_x * scale,
        offsetY: y - p_y * scale,
        x,
        y
      });
      this.doScaleZoom();
      this.renderJFlow();
    },
    doScaleZoom() {
      const jflowInstance = this.getJFlowInstance();
      jflowInstance.dispatchEvent(new CustomEvent('zoompan', {
        detail: {
          deltaX: 0,
          deltaY: 0
        }
      }));
    },
    syncZoom() {
      const jflowInstance = this.getJFlowInstance();
      this.currentZoom = jflowInstance.scale;
    }
  }
};
</script>
<style module>
.root {
    width: 100%;
    height: 100%;
    min-height: inherit;
    position: relative;
    background-color: #fff;
    overflow: visible;
    position: relative;
    /* line-height: calc(var(--select-height) - var(--select-border-width)*2); */
}
.wrapper {
    width: 100%;
    height: 100%;
    min-height: inherit;
}
.operator {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #fff;
    border: 1px solid #E5E5E5;
    border-bottom-left-radius: 4px;
    overflow: hidden;
}
.operatorIcon {
    display: inline-block;
    width: 32px;
    height: 32px;
    cursor: pointer;
    padding: 6px;
}
.operatorIcon:hover {
    background-color: #F9F9F9;
}
.operatorIcon > img {
    width: 20px;
    height: 20px;
}

</style>
