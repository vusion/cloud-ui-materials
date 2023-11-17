<template>
  <div></div>
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
    this.$nextTick(() => {
      this.luckyVM = new LuckyWheel(this.$el, {
        width: this.$el.style.width || "300px",
        height: this.$el.style.height || "300px",
        blocks: this.blocks,
        prizes: this.prizes.length === 0 ? this.prizesDesign : this.prizes,
        buttons: this.buttons.length === 0 ? this.buttonsDesign : this.buttons,
        defaultConfig: this.defaultConfig,
        start: this.start,
        end: this.end,
      });
    });
  },
  watch: {
    $props: {
      handler() {},
    },
    deep: true,
    immediate: true,
  },
  methods: {
    stop(index) {
      this.luckyVM.stop(index);
    },
    start() {
      // 开始游戏
      this.luckyVM.play();
      // 使用定时器模拟接口
      this.$emit("start");
    },
    end(prize) {
      // 开始游戏
      console.log("当前中奖,此时应该提示用户中奖信息", prize);
      this.$emit("end", prize);
    },
  },
  // prizes
  // [
  //       {
  //         fonts: [
  //           {
  //             text: "特斯拉",
  //             top: "10%",
  //             fontSize: "24px",
  //             fontColor: "red",
  //             fontWeight: "700",
  //           },
  //         ],
  //         imgs: [
  //               {
  //                 src: '/static/imgs/prize.png',
  //                 width: '40%',
  //                 top: '10%'
  //               }
  //         ],
  //         background: "lightblue",
  //       },
  //       ...
  // ]

  // buttons
  // [
  //       {
  //         radius: "45%",
  //         imgs: [
  //           {
  //             src: "/static/imgs/wheel-btn.png",
  //             width: "100%",
  //             top: "-130%",
  //           },
  //         ],
  //       },
  // {
  //   radius: "40%",
  //   background: "#869cfa",
  //   pointer: true,
  //   fonts: [{ text: "开始\n抽奖", top: "-20px" }],
  // },
  //     ]
};
</script>

<style></style>
