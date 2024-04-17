<template>
  <div class="g-container">
    <div class="design-slot" s-empty="true" vusion-slot-name="default">
      <slot name="default"></slot>
    </div>
    <div class="ball">
      <div
        v-for="j in 10"
        :key="j"
        class="point"
        :style="getPointStyle(j)"
      ></div>
    </div>
    <svg>
      <defs>
        <filter id="foggyBorder">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "mouse",
  props: {
    color1: {
      type: String,
      default: "#9884f7",
    },
    color2: {
      type: String,
      default: "#8cd9ff",
    },
    filter: {
      type: Number,
      default: 100,
    },
    transition: {
      type: Number,
      default: 5,
    },
  },
  mounted() {
    const container = document.querySelector(".g-container");
    const ballPoints = container.querySelectorAll(".ball .point");
    container.addEventListener(
      "mousemove",
      (event) => {
        var rect = container.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;
        ballPoints.forEach((ballPoint) => {
          ballPoint.style.setProperty("--mouseX", `${mouseX}px`);
          ballPoint.style.setProperty("--mouseY", `${mouseY}px`);
        });
      },
      true
    );
    ballPoints.forEach((element) => {
      element.style.setProperty("--color1", this.color1);
      element.style.setProperty("--color2", this.color2);
      element.style.setProperty("--filter", `${this.filter}px`);
      element.style.setProperty("--transition", `${this.transition}s`);
    });
    this.setInitState();

    const timerId = setInterval(() => {
      this.setInitState();
    }, 20000);
    this.$on("hook:beforeDestroy", () => {
      clearInterval(timerId);
    });
  },
  computed: {
    isIDE() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    colorMap() {
      return {
        color1: this.color1,
        color2: this.color2,
      };
    },
  },
  watch: {
    colorMap: {
      handler() {
        document.querySelectorAll(".point").forEach((element) => {
          element.style.setProperty("--color1", this.colorMap.color1);
          element.style.setProperty("--color2", this.colorMap.color2);
        });
      },
      deep: true,
    },
  },
  methods: {
    getPointStyle(j) {
      return {
        width: `calc(20vmax + 1vmax * ${j})`,
        height: `calc(20vmax + 1vmax * ${j})`,
      };
    },
    randomPercentage() {
      return Math.floor(Math.random() * 11) + 39; // 生成一个随机数
    },
    setInitState() {
      document.querySelectorAll(".point").forEach((element, index) => {
        const topLeft = this.randomPercentage() + "%";
        const topRight = this.randomPercentage() + "%";
        const bottomRight = this.randomPercentage() + "%";
        const bottomLeft = this.randomPercentage() + "%";
        element.style.borderRadius = `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
        let randomX = 0;
        let randomY = 0;
        if (index) {
          randomX = Math.floor(Math.random() * 35) - 10; // 生成随机数
          randomY = Math.floor(Math.random() * 35) - 10; // 生成随机数
        }
        element.style.setProperty("--randomX", `${randomX}%`);
        element.style.setProperty("--randomY", `${randomY}%`);
      });
    },
  },
};
</script>

<style lang="less">
@points: 10;
:root {
  --mouseY: 50%;
  --mouseX: 50%;
  --color1: #9884f7;
  --color2: #8cd9ff;
  --filter: 100px;
  --transition: 5s;
}

.design-slot {
  z-index: 1;
  height: 100%;
  width: 100%;
}

div[s-empty]:empty {
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  text-align: left;
  background: transparent;
  line-height: 1.4;
  padding: 10px 18px 10px 10px;
  text-align: center;
  height: 100%;
  width: 100%;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
}

div[s-empty]:empty::before {
  content: "+";
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}

.g-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ball {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  filter: blur(var(--filter));

  .point {
    position: absolute;
    top: var(--mouseY);
    left: var(--mouseX);
    transform: translate(
      calc(-50% - var(--randomX)),
      calc(-50% - var(--randomY))
    );
    animation: rotate 20s infinite linear;
  }

  .loop2(@j) when (@j =< @points) {
    @color-1: var(--color1); // 开始颜色
    @color-2: var(--color2); // 结束颜色;
    svg {
      width: 0;
      height: 0;
    }
    .point:nth-child(@{j}) {
      width: 3vmax + 1vmax * @j;
      height: 3vmax + 1vmax * @j;
      background: linear-gradient(135deg, @color-1, @color-2);
      border-radius: 45% 49% 47% 48%;
      transition: var(--transition);
      transition-delay: 20ms * @j;
      transition-timing-function: cubic-bezier(0.27, 1.06, 0.82, 1.11);
    }
    .loop2(@j + 1);
  }
  .loop2(0);
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%);
  }
  25% {
    transform: translate(
      calc(-50% - var(--randomX)),
      calc(-50% - var(--randomY))
    );
  }
  50% {
    transform: translate(
      calc(-50% - var(--randomX)),
      calc(-50% - var(--randomY))
    );
  }
  75% {
    transform: translate(
      calc(-50% - var(--randomX)),
      calc(-50% - var(--randomY))
    );
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
</style>
