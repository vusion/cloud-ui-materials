<template>
  <div
    class="swiper-container"
    @mouseover="onSwiperWrapperMouseEnter"
    @mouseleave="onSwiperWrapperMouseLeave"
  >
    <swiper
      ref="swiper"
      :options="swiperOption"
      :style="{
        width: `${
          imgWidth * slidesPerView + spaceBetween * (slidesPerView - 1)
        }px !important`,
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in dataSource"
        :key="index"
        :style="{ width: `${imgWidth}px !important`, height: 100 }"
      >
        <div s-empty="true" vusion-slot-name="item">
          <slot name="item" :item="item"></slot>
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
    imgWidth: {
      type: Number,
      default: 240,
    },
    imgHeight: {
      type: Number,
      default: 196,
    },
    slidesPerView: {
      type: Number | String,
      default: 5,
    },
    delay: {
      type: Number,
      default: 1000,
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
        loop: true,
        virtual: true,
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiperInstance;
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
      console.log("onSlideChange", e);
    },
    onSwiperItemClick(link) {
      if (link) {
        window.open(link);
      }
    },
  },
};
</script>

<style>
.swiper-container {
  display: flex;
  align-items: center;
}
.swiper-container .swiper-container {
  margin: unset;
}
.swiper-container .img {
  cursor: pointer;
  border: 1px solid #e7e7e7;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
}
.swiper-container .link-less-img {
  border: 1px solid #e7e7e7;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
}

.swiper-container .swiper-slide {
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: fit-content;
}
.swiper-container .swiper-slide > div {
  height: calc((100% - 60px) / 2) !important;
  width: 100%;
  background-color: blanchedalmond;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
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
