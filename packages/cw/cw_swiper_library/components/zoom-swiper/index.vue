<template>
  <div
    class="zoom-container"
    v-if="dataSource && dataSource.length"
    @mouseover="onSwiperWrapperMouseEnter"
    @mouseleave="onSwiperWrapperMouseLeave"
  >
    <swiper
      ref="swiper"
      :options="swiperOption"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in dataSource"
        :key="index"
        @click="onSwiperItemClick(item)"
      >
        <img
          alt="图片获取失败"
          :class="item.link ? 'img' : 'linkless-img'"
          :src="item.url"
          :width="imgWidth"
          :height="imgHeight"
        />
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
    delay: {
      type: Number,
      default: 3000,
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
    imgWidth: {
      type: Number,
      default: 240,
    },
    imgHeight: {
      type: Number,
      default: 196,
    },
    height: {
      type: Number,
      default: 300,
    },
    effect: {
      type: String,
      default: "ease-in-out",
    },
    scale: {
      type: Number,
      default: 0.8,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        initialSlide: 1,
        slidesPerView: 3,
        spaceBetween: this.spaceBetween,
        autoplay: {
          delay: this.delay,
          stopOnLastSlide: false,
        },
        height: this.height,
        loop: true,
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiperInstance;
    },
    designModeUpdates() {
      return {
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
      this.$el.style.setProperty("--duration", `${this.duration}ms`);
      this.$el.style.setProperty("--effect", `${this.effect}`);
      this.$el.style.setProperty("--scale", `${this.scale}`);
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
    onSlideChange(e) {
      console.log("e", e);
      this.swiper.setTransition(this.duration);
      // this.$nextTick(() => {
      //   this.$forceUpdate();
      // });
    },
    onSwiperItemClick(item) {
      this.$emit("onSwiperItemClick", item);
    },
  },
};
</script>

<style lang="less">
.zoom-container {
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-wrapper {
    transition-timing-function: var(--effect) !important;
  }
  .swiper-slide.swiper-slide-next {
    transform: scale(1);
    transition: var(----duration);
  }

  .swiper-slide {
    text-align: center;
    transform: scale(var(--scale));
    font-size: 18px;
    background: #fff;
    transition: var(----duration);

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
  div[s-empty]:empty {
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

  div[s-empty]:empty::before {
    content: "+";
    font-size: 20px;
    line-height: 12px;
    display: inline-block;
    margin-bottom: 2px;
  }
}
</style>
