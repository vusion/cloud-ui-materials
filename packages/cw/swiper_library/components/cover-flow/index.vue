<template>
  <div
    :style="{
      height: `${(imgHeight > 338 ? imgHeight : 338) * 3}px !important`,
    }"
    class="cover-flow-container"
  >
    <div class="text-container">
      <div class="swiper-button-prev cover-flow-button-prev" slot="button-prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          @mouseenter="hoverPrev = true"
          @mouseleave="hoverPrev = false"
        >
          <rect
            v-show="hoverPrev"
            opacity="0.1"
            width="44"
            height="44"
            rx="4"
            transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 44 44)"
            fill="#D83B2F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.4061 20.9395V20.9403C22.3991 20.9399 22.3921 20.9397 22.3851 20.9395C22.3781 20.9397 22.3711 20.9399 22.3641 20.9403V20.9395C22.2385 20.9414 22.1161 20.9823 22.0144 21.0572L15.6459 27.1121C15.3826 27.3644 15.0514 27.5343 14.6928 27.6011C14.3342 27.6679 13.9639 27.6286 13.6274 27.4881C13.2908 27.3476 13.0027 27.1119 12.7982 26.8101C12.5938 26.5082 12.4821 26.1533 12.4767 25.7888C12.4741 25.5413 12.5214 25.2957 12.6157 25.0668C12.7099 24.8379 12.8493 24.6302 13.0255 24.4562L19.5682 17.9184C19.8605 17.6307 20.193 17.3868 20.5553 17.1941C21.1109 16.8814 21.7327 16.7133 22.3641 16.7006V16.7C22.3711 16.7001 22.3781 16.7002 22.3851 16.7003C22.3921 16.7002 22.3991 16.7001 22.4061 16.7V16.7006C23.0375 16.7133 23.6593 16.8814 24.2149 17.1941C24.5772 17.3868 24.9097 17.6307 25.2021 17.9184L31.7447 24.4562C31.9209 24.6302 32.0603 24.8379 32.1545 25.0668C32.2488 25.2957 32.2961 25.5413 32.2936 25.7888C32.2882 26.1533 32.1764 26.5082 31.972 26.8101C31.7675 27.1119 31.4794 27.3476 31.1428 27.4881C30.8063 27.6286 30.436 27.6679 30.0774 27.6011C29.7188 27.5343 29.3876 27.3644 29.1243 27.1121L22.7558 21.0572C22.6541 20.9823 22.5317 20.9414 22.4061 20.9395Z"
            fill="#D83B2F"
          />
        </svg>
      </div>
      <swiper
        ref="coverFlowText"
        class="text-swiper"
        :options="swiperTextOption"
        @slideChange="onSlideTextChange"
      >
        <swiper-slide
          v-for="({ text }, index) in dataSource"
          :key="index"
          :data-swiper-slide-index="index"
        >
          <div class="story-container" @click="handleSlideClick(index)">
            <div class="story-describe">{{ text }}</div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next cover-flow-button-next" slot="button-next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          @mouseenter="hoverNext = true"
          @mouseleave="hoverNext = false"
        >
          <rect
            v-show="hoverNext"
            opacity="0.1"
            width="44"
            height="44"
            rx="4"
            transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 44 44)"
            fill="#D83B2F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.5939 23.0605L21.5939 23.0597C21.6009 23.0601 21.6079 23.0603 21.6149 23.0605C21.6219 23.0603 21.6289 23.0601 21.6359 23.0597L21.6359 23.0605C21.7615 23.0586 21.8839 23.0177 21.9856 22.9428L28.3541 16.8879C28.6174 16.6356 28.9486 16.4657 29.3072 16.3989C29.6658 16.3321 30.0361 16.3714 30.3726 16.5119C30.7092 16.6524 30.9973 16.8881 31.2018 17.1899C31.4062 17.4918 31.5179 17.8467 31.5233 18.2112C31.5259 18.4587 31.4786 18.7043 31.3843 18.9332C31.2901 19.1621 31.1507 19.3698 30.9745 19.5438L24.4318 26.0816C24.1395 26.3693 23.807 26.6133 23.4447 26.8059C22.8891 27.1186 22.2673 27.2867 21.6359 27.2994L21.6359 27.3C21.6289 27.2999 21.6219 27.2998 21.6149 27.2997C21.6079 27.2998 21.6009 27.2999 21.5939 27.3L21.5939 27.2994C20.9625 27.2867 20.3407 27.1186 19.7851 26.8059C19.4228 26.6133 19.0903 26.3693 18.7979 26.0816L12.2553 19.5438C12.0791 19.3698 11.9397 19.1621 11.8455 18.9332C11.7512 18.7043 11.7039 18.4587 11.7064 18.2112C11.7118 17.8467 11.8236 17.4918 12.028 17.1899C12.2325 16.8881 12.5206 16.6524 12.8572 16.5119C13.1937 16.3714 13.564 16.3321 13.9226 16.3989C14.2812 16.4657 14.6124 16.6356 14.8757 16.8879L21.2442 22.9428C21.3459 23.0177 21.4683 23.0586 21.5939 23.0605Z"
            fill="#D83B2F"
          />
        </svg>
      </div>
    </div>
    <swiper
      ref="coverFlow"
      class="img-swiper"
      :style="{
        width: `${(this.imgWidth > 600 ? this.imgWidth : 600) *
          1.1}px !important`,
      }"
      :options="swiperImgOption"
      @slideChange="onSlideImgChange"
    >
      <swiper-slide v-for="({ url }, index) in dataSource" :key="index">
        <div class="img-wrapper">
          <img
            alt="图片获取失败"
            :src="url"
            :width="imgWidth"
            :height="imgHeight"
            @click="$emit('galleryItemClick', url, index)"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "coverFlow",
  props: {
    imgWidth: {
      type: Number,
      default: 200,
    },
    imgHeight: {
      type: Number,
      default: 200,
    },
    dataSource: {
      type: Array,
      default: () => {
        return new Array(20).fill({
          url:
            "https://img2.baidu.com/it/u=3006610358,19267819&fm=253&fmt=auto&app=138&f=JPEG",
          text: "我的老婆",
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
      hoverPrev: false,
      hoverNext: false,
      swiperImgOption: {
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        direction: "vertical",
        effect: "coverflow",
        initialSlide: 1,
        coverflowEffect: {
          depth: 100,
          modifier: 1,
          rotate: 50,
          scale: 1,
          slideShadows: true,
          stretch: 0,
        },
      },
      swiperTextOption: {
        grabCursor: true,
        centeredSlides: true,
        initialSlide: 1,
        spaceBetween: 30,
        direction: "vertical",
        slidesPerView: 5,
        navigation: {
          nextEl: ".cover-flow-button-next",
          prevEl: ".cover-flow-button-prev",
        },
      },
    };
  },
  methods: {
    onSlideImgChange() {
      this.$refs.coverFlowText.$swiper.slideTo(
        this.$refs.coverFlow.$swiper.realIndex
      );
    },
    onSlideTextChange() {
      this.$refs.coverFlow.$swiper.slideTo(
        this.$refs.coverFlowText.$swiper.realIndex
      );
    },
    handleSlideClick(index) {
      console.log("点击事件", index);
      this.$refs.coverFlowText.$swiper.slideTo(index);
      this.$refs.coverFlow.$swiper.slideTo(index);
    },
  },
};
</script>

<style>
.cover-flow-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.cover-flow-container .text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cover-flow-container .text-container .swiper-button-prev,
.cover-flow-container .text-container .swiper-button-next {
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.cover-flow-container .text-container .swiper-button-next {
  z-index: 10;
  position: unset;
  margin-top: 56px;
}
.cover-flow-container .text-container .swiper-button-prev {
  z-index: 10;
  position: unset;
  margin-bottom: 56px;
}
.cover-flow-container .text-container .swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}
.cover-flow-container .swiper-slide {
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-flow-container .story-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cover-flow-container .swiper-slide-active.swiper-slide .story-describe {
  font-family: PingFang SC;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  width: 540px;
  height: 56px;
  background-color: #d83b2f;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.cover-flow-container .swiper-slide .story-describe {
  color: rgba(0, 0, 0, 0.2);
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  padding-left: 20px;
}

.cover-flow-container .story-container img {
  border-radius: 8px;
  opacity: 0.8;
}
.cover-flow-container .swiper-slide-active .story-container img {
  border-radius: 8px;
  border: 1px solid #d1d1d1;
  opacity: 1;
}
.cover-flow-container .img-wrapper {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 600px;
  min-height: 338px;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
  background: #f0f1f2;
  z-index: 1;
}
.cover-flow-container .text-swiper {
  height: 414px;
}
.cover-flow-container .text-swiper .swiper-slide-prev .story-describe {
  color: rgba(0, 0, 0, 0.8);
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
}
.cover-flow-container .text-swiper .swiper-slide-next .story-describe {
  color: rgba(0, 0, 0, 0.8);
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
}
.cover-flow-container .cover-flow-container .img-swiper {
  height: 100%;
  box-sizing: border-box;
}
.cover-flow-container .img-swiper .swiper-wrapper {
  align-items: center;
}
</style>
