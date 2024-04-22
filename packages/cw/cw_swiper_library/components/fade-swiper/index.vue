<template>
  <div class="fade-container" v-if="dataSource && dataSource.length">
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
        <div s-empty="true" vusion-slot-name="item">
          <slot name="item" v-bind="item" :item="item"></slot>
        </div>
        <!-- <img
          alt="图片获取失败"
          :class="item.link ? 'img' : 'linkless-img'"
          :src="item.url"
          :width="imgWidth"
          :height="imgHeight"
        /> -->
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination">
      <div
        v-for="(item, index) in dataSource"
        :key="`pagination-${index}`"
        @click="paginationClick(index)"
      >
        <svg
          width="120"
          height="2"
          xmlns="http://www.w3.org/2000/svg"
          style="margin-right: 8px"
        >
          <!-- 背景条 -->
          <rect
            v-if="activeIndex === index"
            x="0"
            y="0"
            width="120"
            height="2"
            fill="#002BEC"
          />
          <rect x="0" y="0" width="120" height="2" fill="#565B7333" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

import "swiper/swiper-bundle.min.css";

export default {
  name: "fade-swiper",
  props: {
    spaceBetween: {
      type: Number,
      default: 30,
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
    dataSchema: { type: String, default: "entity" },
    // imgWidth: {
    //   type: Number,
    //   default: 240,
    // },
    // imgHeight: {
    //   type: Number,
    //   default: 196,
    // },
    height: {
      type: Number,
      default: 300,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  mounted() {},
  computed: {
    swiperOption() {
      return {
        notNextTick: true,
        spaceBetween: this.spaceBetween,
        height: this.height,
        effect: "fade",
        pagination: false,
      };
    },
    swiper() {
      return this.$refs.swiper.swiperInstance;
    },
  },
  methods: {
    onSwiper(e) {
      // console.log("onSwiper", e);
    },
    onSlideChange() {
      this.activeIndex = this.swiper.activeIndex;
      this.$emit("onSwiperChange", this.activeIndex);
    },
    onSwiperItemClick(item) {
      this.slideNext();
    },
    paginationClick(index) {
      this.swiper.slideTo(index);
    },
    slideNext() {
      if (!this.swiper.slideNext()) {
        this.swiper.slideTo(0);
      }
    },
  },
};
</script>

<style lang="less">
.fade-container {
  position: relative;
  padding-bottom: 46px;
  .swiper-pagination {
    left: 50%;
    transform: translateX(-50%);
    height: 20px;
    width: max-content;
    bottom: 0;
    & > div {
      height: 100%;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }
  }
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
