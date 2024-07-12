<template>
  <div class="progress-step">
    <div
      v-for="(node, idx) in data"
      :key="idx"
      :class="[
        'progress-step_item',
        isLast(idx) && 'is_last',
        Array.isArray(node) && 'is_parallel'
      ]"
      :style="getStepItemStyle()"
    >
      <!-- 并行节点 -->
      <template v-if="Array.isArray(node)">
        <div class="step-item_rect" :style="getStepItemRectStyle()">
          <!-- 线条 -->
          <div class="step-item_line" :style="getStepItemLineStyle('rect')"></div>
          <!-- 上边节点 -->
          <progress-step class="step-item_rect_top" :data="node[0]" position="top" :style="{
            top: rectTop
          }" />
          <!-- 下边节点 -->
          <progress-step class="step-item_rect_bottom" :data="node[1]" position="bottom" :style="{
            bottom: rectBot
          }" />
        </div>
      </template>
      <!-- 单个串行节点 -->
      <template v-else>
        <!-- 头部节点 -->
        <div class="step-item_head">
          <!-- 线条 -->
          <div v-if="!isLast(idx)" class="step-item_line" :style="getStepItemLineStyle()"></div>
          <CheckCircle :checked="node.status"/>
        </div>
        <!-- 主体内容 -->
        <div class="step-item_main">
          <div class="progress-step_title">{{ node.title }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import useStatuColor from './composable/useStatuColor';
import useParallelNodesLen from './composable/useParallelNodesLen';
import useStepItemInfo from './composable/useStepItemInfo';
import { getStyle, numberToPx } from './tools';
import CheckCircle from './CheckCircle.vue';
export default {
  name: "progress-step",
  props: {
    position: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => []
    },
    status: {
      type: Array,
      default: () => ["pending", "processing", "completed"]
    },
    colors: {
      type: Array,
      default: () => ["#d2d2d2", "#3a84fb", "#67d36f"]
    },
    size: {
      type: Number,
      default: 15
    },
    stepWidth: {
      type: Number,
      default: 80
    },
    space: {
      type: Number,
      default: 20
    }
  },
  components: {
    CheckCircle
  },
  data() {
    return {
      reactHeight: 100,
      defaultBGC: "#d2d2d",
      parallelNodesLen: 0
    };
  },
  watch: {
    data: {
      handler() {
        this.parallelNodesLen = useParallelNodesLen(this.data);
        // this.reactHeight = this.parallelNodesLen * 100;
        // console.log(this.reactHeight)
      },
      immediate: true
    }
  },
  computed: {
    statusToColor() {
      return useStatuColor(this.status, this.colors);
    },
    itemLine() {
      return this.stepWidth + this.space;
    },
    reactItemLine() {
      return this.stepWidth - 10;
    },
    stepItemTop() {
      return this.reactHeight / 2 - 12;
    },
    flexBasis() {
      return useStepItemInfo(this, this.parallelNodesLen, this.reactHeight).flexBasis;
    },
    rectTop() {
      return numberToPx(useStepItemInfo(this, this.parallelNodesLen, this.reactHeight).rectTop);
    },
    rectBot() {
      return numberToPx(useStepItemInfo(this, this.parallelNodesLen, this.reactHeight).rectBot)
    }
  },
  methods: {
    isLast(index) {
      return index === this.data.length - 1;
    },
    getStepItemStyle() {
      return {
        flexBasis: this.stepWidth + 'px',
      }
    },
    getStepItemRectStyle() {
      return {
        width: numberToPx(this.flexBasis),
        height: numberToPx(this.reactHeight),
        marginRight: `0 ${numberToPx(this.space)}`
      };
    },
    getStepItemLineStyle(props) {
      return {
        width: props === 'rect' ? numberToPx(this.reactItemLine) : numberToPx(this.itemLine),
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-step {
  display: flex;
  align-items: flex-start;

  .progress-step_item {
    flex-shrink: 0;
    text-align: center;
    box-sizing: border-box;
    margin-right: 20px; /* Adjust this value according to your computed style */
    margin-top: 38px; /* Adjust this value according to your computed style */
    &.is_last {
      margin-right: 0;
    }

    &.is_parallel {
      margin-top: -2px;
    }

    .step-item_line {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px; 
      transform: translateY(-50%);
      border-top: 1px solid #3a84fb;
    }

    .step-item_rect {
      width: 100px; /* Adjust this value according to your computed style */
      height: 100px; /* Adjust this value according to your computed style */
      position: relative;
      border: 1px solid #3a84fb;
      background-color: #fff;
      align-self: center;
      margin: 0 20px; /* Adjust this value according to your computed style */

      &>.step-item_line {
        left: 100%;
        top: 50%;
        width: 50px; /* Adjust this value according to your computed style */
      }

      .step-item_rect_top,
      .step-item_rect_bottom {
        position: absolute;
        width: 100%;

        .step-item_line {
          border-top-color: transparent;
        }
      }

      .step-item_rect_top {
        top: 20px; 
      }

      .step-item_rect_bottom {
        bottom: 20px; 
      }
    }

    .step-item_head {
      position: relative;
      display: flex;
      justify-content: center;

      .progress-step_icon {
        display: inline-block;
        box-sizing: border-box;
        width: 15px; /* Adjust this value according to your computed style */
        height: 15px; /* Adjust this value according to your computed style */
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      }
    }

    .step-item_main {
      margin-top: 5px;
      
      .progress-step_title {
        color: #000;
        font-size: 12px;
        position: absolute;
        max-width: 80px;
      }
    }
  }
}
</style>

