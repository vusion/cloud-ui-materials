<template>
  <div
    class="swiper-container"
    v-if="dataSource && dataSource.length"
    @mouseover="onSwiperWrapperMouseEnter"
    @mouseleave="onSwiperWrapperMouseLeave"
  >
    <swiper
      ref="swiper"
      :options="swiperOption"
      direction="vertical"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in dataSource"
        :key="index"
        @click="onSwiperItemClick(item)"
      >
        <div s-empty="true" vusion-slot-name="item">
          <slot name="item" v-bind="item" ： :item="item"></slot>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  name: "basic-swiper",
  props: {
    spaceBetween: {
      type: Number,
      default: 30,
    },
    slidesPerView: {
      type: Number | String,
      default: 1,
    },
    delay: {
      type: Number,
      default: 1000,
    },
    direction: {
      type: String,
      default: "horizontal",
    },
    dataSource: {
      type: Array,
      default: () => {
        return new Array(7).fill({
          url: "https://projectmanage.netease-official.lcap.163yun.com/upload/app/POPO20231226140339_20231226140352462.png",
          link: "https://news.163.com/",
        });
      },
    },

    dataSchema: { type: String, default: "entity" },
    duration: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    effect: {
      type: String,
      default: "ease-in-out",
    },
    prevStyle: {
      type: String,
      default: "",
    },
    nextStyle: {
      type: String,
      default: "",
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        autoplay: {
          delay: this.delay,
        },
        height: this.height,
        loop: true,
        direction: this.direction,
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiperInstance;
    },
    designModeUpdates() {
      return {
        slidesPerView: this.slidesPerView,
        effect: this.effect,
        duration: this.duration,
        height: this.height,
        delay: this.delay,
        spaceBetween: this.spaceBetween,
        prevStyle: this.prevStyle,
        nextStyle: this.nextStyle,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$forceUpdate();
    });
    const style = document.createElement("style");

    // 设置 CSS 块的内容
    style.innerHTML = `
    .swiper-wrapper {
        transition-timing-function: ${this.effect} !important;
    }
    `;

    // 将 style 标签插入到 head 元素中
    document.head.appendChild(style);

    this.$on("hook:beforeDestroy", () => {
      document.head.removeChild(style);
    });
  },
  watch: {
    dataSource: {
      handler() {
        this.$forceUpdate();
      },
      deep: true,
      immediate: true,
    },
    designModeUpdates: {
      handler() {
        if (this.$env && this.$env.VUE_APP_DESIGNER) {
          this.$forceUpdate();
        }
      },
      deep: true,
    },
  },
  methods: {
    onSwiperWrapperMouseEnter() {
      this.swiper.autoplay.stop();
    },
    onSwiperWrapperMouseLeave() {
      this.swiper.autoplay.start();
    },
    onSwiper(e) {
      console.log("onSwiper", e);
    },
    onSlideChange() {
      this.swiper.setTransition(this.duration);
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    onSwiperItemClick(item) {
      this.$emit("onSwiperItemClick", item);
    },
  },
};
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content !important;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-container div[s-empty]:empty {
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  text-align: left;
  background: #fff;
  line-height: 1.4;
  padding: 10px 18px 10px 10px;
  text-align: center;
  width: 30%;
  height: 30%;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
}

.swiper-container div[s-empty]:empty::before {
  content: "+";
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}
</style>
