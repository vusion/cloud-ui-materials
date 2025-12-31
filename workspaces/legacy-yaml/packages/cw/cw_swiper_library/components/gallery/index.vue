<template>
  <div
    class="gallery-container"
    @mouseover="onGalleryWrapperMouseEnter"
    @mouseleave="onGalleryWrapperMouseLeave"
  >
    <div class="swiper-button-prev gallery-button-prev" slot="button-prev">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.9395 22.4072L20.9403 22.4072C20.9399 22.4002 20.9397 22.3932 20.9395 22.3862C20.9397 22.3792 20.9399 22.3722 20.9403 22.3652L20.9395 22.3652C20.9414 22.2396 20.9823 22.1173 21.0572 22.0155L27.1121 15.647C27.3644 15.3838 27.5343 15.0525 27.6011 14.6939C27.6679 14.3354 27.6286 13.9651 27.4881 13.6285C27.3476 13.292 27.1119 13.0038 26.8101 12.7994C26.5082 12.595 26.1533 12.4832 25.7888 12.4778C25.5413 12.4752 25.2957 12.5225 25.0668 12.6168C24.8379 12.7111 24.6302 12.8505 24.4562 13.0266L17.9184 19.5693C17.6307 19.8617 17.3867 20.1941 17.1941 20.5564C16.8814 21.112 16.7133 21.7338 16.7006 22.3652L16.7 22.3652C16.7001 22.3722 16.7002 22.3792 16.7003 22.3862C16.7002 22.3932 16.7001 22.4002 16.7 22.4072L16.7006 22.4072C16.7133 23.0386 16.8814 23.6605 17.1941 24.2161C17.3867 24.5783 17.6307 24.9108 17.9184 25.2032L24.4562 31.7458C24.6302 31.922 24.8379 32.0614 25.0668 32.1557C25.2957 32.2499 25.5413 32.2972 25.7888 32.2947C26.1533 32.2893 26.5082 32.1775 26.8101 31.9731C27.1119 31.7687 27.3476 31.4805 27.4881 31.1439C27.6286 30.8074 27.6679 30.4371 27.6011 30.0785C27.5343 29.7199 27.3644 29.3887 27.1121 29.1254L21.0572 22.7569C20.9823 22.6552 20.9414 22.5329 20.9395 22.4072Z"
          fill="#D83B2F"
        />
      </svg>
    </div>
    <swiper
      ref="gallery"
      :options="swiperOption"
      :style="{
        width: `${imgWidth * slidesPerView +
          spaceBetween * (slidesPerView - 1)}px !important`,
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in dataSourceDeep"
        :key="index"
        :style="{ width: `${imgWidth}px !important` }"
      >
        <div v-for="gridIndex in grid" :key="gridIndex">
          <img
            alt="图片获取失败"
            :class="item[gridIndex - 1].link ? 'img' : 'linkless-img'"
            :src="item[gridIndex - 1].url"
            :width="imgWidth"
            :height="imgHeight"
            @click="onGalleryItemClick(item[gridIndex - 1].link)"
          />
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-next gallery-button-next" slot="button-next">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.0605 22.4072L23.0597 22.4072C23.0601 22.4002 23.0603 22.3932 23.0605 22.3862C23.0603 22.3792 23.0601 22.3722 23.0597 22.3652L23.0605 22.3652C23.0586 22.2396 23.0177 22.1173 22.9428 22.0155L16.8879 15.647C16.6356 15.3838 16.4657 15.0525 16.3989 14.6939C16.3321 14.3354 16.3714 13.9651 16.5119 13.6285C16.6524 13.292 16.8881 13.0038 17.1899 12.7994C17.4918 12.595 17.8467 12.4832 18.2112 12.4778C18.4587 12.4752 18.7043 12.5225 18.9332 12.6168C19.1621 12.7111 19.3698 12.8505 19.5438 13.0266L26.0816 19.5693C26.3693 19.8617 26.6133 20.1941 26.8059 20.5564C27.1186 21.112 27.2867 21.7338 27.2994 22.3652L27.3 22.3652C27.2999 22.3722 27.2998 22.3792 27.2997 22.3862C27.2998 22.3932 27.2999 22.4002 27.3 22.4072L27.2994 22.4072C27.2867 23.0386 27.1186 23.6605 26.8059 24.2161C26.6133 24.5783 26.3693 24.9108 26.0816 25.2032L19.5438 31.7458C19.3698 31.922 19.1621 32.0614 18.9332 32.1557C18.7043 32.2499 18.4587 32.2972 18.2112 32.2947C17.8467 32.2893 17.4918 32.1775 17.1899 31.9731C16.8881 31.7687 16.6524 31.4805 16.5119 31.1439C16.3714 30.8074 16.3321 30.4371 16.3989 30.0785C16.4657 29.7199 16.6356 29.3887 16.8879 29.1254L22.9428 22.7569C23.0177 22.6552 23.0586 22.5329 23.0605 22.4072Z"
          fill="#D83B2F"
        />
      </svg>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  name: "gallery",
  props: {
    grid: {
      type: Number,
      default: 2,
    },
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
      default: 2500,
    },
    dataSource: {
      type: Array,
      default: () => {
        return new Array(10).fill({
          url:
            "https://projectmanage.netease-official.lcap.163yun.com/upload/app/POPO20231226140339_20231226140352462.png",
          link: "https://news.163.com/",
        }).concat(new Array(10).fill({
          url:
            "https://projectmanage.netease-official.lcap.163yun.com/upload/app/POPO20231226140339_20231226140352462.png",
        }));
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
        navigation: {
          nextEl: ".gallery-button-next",
          prevEl: ".gallery-button-prev",
        },
      },
    };
  },
  computed: {
    gallery() {
      return this.$refs.gallery.swiperInstance;
    },
    dataSourceDeep() {
      return new Array(parseInt(this.dataSource.length / 2))
        .fill(undefined)
        .map((item, index) => [
          this.dataSource[index * 2],
          this.dataSource[index * 2 + 1],
        ]);
    },
  },
  methods: {
    onGalleryWrapperMouseEnter() {
      this.gallery.autoplay.stop();
    },
    onGalleryWrapperMouseLeave() {
      this.gallery.autoplay.start();
    },
    onSwiper(e) {
      console.log("onSwiper", e);
    },
    onSlideChange(e) {
      console.log("onSlideChange", e);
    },
    onGalleryItemClick(link) {
      if(link) {
        window.open(link);
      }
    },
  },
};
</script>

<style>
/* @import "swiper/swiper-bundle.css"; */
.gallery-container {
  display: flex;
  align-items: center;
}
.gallery-container .swiper-container {
  margin: unset;
}
.gallery-container .img {
  cursor: pointer;
  border: 1px solid #e7e7e7;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
}
.gallery-container .linkless-img {
  border: 1px solid #e7e7e7;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
}

.gallery-container .swiper-slide {
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: fit-content;
}
.gallery-container .swiper-slide > div {
  height: calc((100% - 60px) / 2) !important;
  width: 100%;
  background-color: blanchedalmond;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.gallery-container .swiper-button-prev,
.gallery-container .swiper-button-next {
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gallery-container .swiper-button-next {
  z-index: 10;
  position: unset;
  margin-left: 28px;
  margin-top: 0px;
}
.gallery-container .swiper-button-prev {
  z-index: 10;
  position: unset;
  margin-right: 28px;
  margin-top: 0px;
}
.gallery-container .swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}
</style>
