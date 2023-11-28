<template>
  <div :class="{ readonly: readonly && !$env.VUE_APP_DESIGNER }"></div>
</template>

<script>
import { LuckyWheel } from "lucky-canvas";
export default {
  name: "wheel",
  props: {
    borderColor: {
      type: String,
      default: "lightpink",
    },
    borderPadding: {
      type: Number,
      default: 0,
    },
    borderImg: {
      type: String,
      default: "",
    },
    borderImgPadding: {
      type: Number,
      default: 0,
    },
    borderImgWidth: {
      type: Number,
      default: 0,
    },
    boderImgHeight: {
      type: Number,
      default: 0,
    },
    backgroundImg: {
      type: String,
      default: "",
    },
    backgroundImgWidth: {
      type: Number,
      default: 0,
    },
    backgroundImgHeight: {
      type: Number,
      default: 0,
    },
    gutter: {
      type: Number,
      default: 20,
    },
    prizes: {
      type: Array,
      default: () => [],
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      blocks: [],
      defaultConfig: {
        gutter: this.gutter + "px",
      },
      luckyVM: null,
      prizesDesign: [],
      buttonsDesign: [],
    };
  },
  created() {
    // 设计模式初始值
    if (this.$env.VUE_APP_DESIGNER) {
      if (this.prizes.length === 0) {
        this.prizesDesign = new Array(6).fill({
          fonts: [
            {
              text: "特斯拉",
              top: "10%",
              fontSize: "24px",
              fontColor: "red",
              fontWeight: "700",
            },
          ],
          background: "lightblue",
        });
      }
      if (this.buttons.length === 0) {
        this.buttonsDesign = [
          {
            radius: "40%",
            background: "#869cfa",
            pointer: true,
            fonts: [{ text: "开始\n抽奖", top: "-20px" }],
          },
        ];
      }
    }
  },
  mounted() {
    console.log("vm", this);
    // 大转盘从外到内依次设置
    // 1. 外边框border
    if (this.borderPadding) {
      this.blocks.push({
        padding: this.borderPadding + "px",
        background: this.borderColor,
      });
    }
    // 2. 外边框背景图
    if (this.borderImg) {
      this.blocks.push({
        // 边框背景图
        padding: this.borderImgPadding + "px",
        imgs: [
          {
            src: this.borderImg,
            width: this.borderImgWidth || "100%",
            height: this.borderImgHeight || "100%",
          },
        ],
      });
    }
    // 3. 转盘本体背景图
    if (this.backgroundImg) {
      this.blocks.imgs = [
        {
          src: "/static/imgs/wheel-bg.png",
          width: this.backgroundImgWidth || "100%",
          height: this.backgroundImgHeight || "100%",
        },
      ];
    }
    this.creatVM();
  },
  watch: {
    $props: {
      handler(value) {
        console.log("执行了", value);
        if (this.$env.VUE_APP_DESIGNER) {
          this.creatVM();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    creatVM() {
      this.$nextTick(() => {
        this.luckyVM = new LuckyWheel(this.$el, {
          width: this.$el.style.width || "300px",
          height: this.$el.style.height || "300px",
          blocks: this.blocks,
          prizes: this.prizes.length === 0 ? this.prizesDesign : this.prizes,
          buttons:
            this.buttons.length === 0 ? this.buttonsDesign : this.buttons,
          defaultConfig: this.defaultConfig,
          start: this.beforeStart,
          end: this.end,
        });
      });
    },
    stop(index) {
      this.luckyVM.stop(index);
    },
    beforeStart() {
      this.$emit("beforeStart");
    },
    start() {
      // 开始游戏
      this.luckyVM.play();
      // 使用定时器模拟接口
    },
    end(prize) {
      // 开始游戏
      console.log("当前中奖,此时应该提示用户中奖信息", prize);
      this.$emit("end", prize);
    },
  },
};
</script>

<style scoped>
.readonly {
  cursor: not-allowed;
  pointer-events: none;
}
</style>
