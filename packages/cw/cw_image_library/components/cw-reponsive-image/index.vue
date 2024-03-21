<template>
  <!-- <div class="test"></div> -->
  <div
    class="image-container"
    @click="$emit('click')"
    @mouseenter="$emit('mouseenter')"
    @mouseout="$emit('mouseout')"
  >
    <img
      v-if="normalSrc"
      class="small-image responsive-lazy-load"
      :style="imageStyle"
      :data-src="src"
      :alt="alt"
    />
  </div>
</template>

<script>
export default {
  name: "cw-responsive-image",
  props: {
    normalSrc: {
      type: String,
      default: "",
    },
    bucket: {
      type: String,
      default: "nos",
    },
    thumbnailWidth: {
      type: Number,
      default: 200,
    },
    thumbnailHeight: {
      type: Number,
      default: 200,
    },
    alt: {
      type: String,
      default: "A descriptive alt text",
    },
    verticalCenter: {
      type: String,
      default: "center",
    },
    horizontalCenter: {
      type: String,
      default: "center",
    },
    fit: {
      type: String,
      default: "contain",
    },
  },
  computed: {
    src() {
      const bucketMap = {
        nos: `${this.normalSrc}?imageView&thumbnail=${this.thumbnailWidth}x${this.thumbnailHeight}`,
        obs: `${this.normalSrc}?x-image-process=image/resize,w_${this.thumbnailWidth},h_${this.thumbnailHeight}`,
      };
      return bucketMap[this.bucket];
    },
    imageStyle() {
      return {
        "object-fit": this.fit,
        "object-position": `${this.verticalCenter} ${this.horizontalCenter}`,
      };
    },
  },
  mounted() {
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("responsive-lazy-load");
              console.log("lazyImage", lazyImage);
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        },
        {
          rootMargin: "0px",
          threshold: 0.1, // 当图片有10%出现在视口中时开始加载
        }
      );

      lazyImageObserver.observe(this.$el.querySelector("img"));
    } else {
      console.warn(
        "Fallback for browsers that don't support Intersection Observer"
      );
    }
    const container = document.querySelector(".image-container");
    const smallImage = container.querySelector(".small-image");

    // 创建大图片
    const largeImage = new Image();
    largeImage.src = this.normalSrc; // 大图片的路径
    largeImage.classList.add("large-image");
    largeImage.onload = function () {
      // 当大图片加载完成后，添加到容器中
      container.appendChild(largeImage);
    };

    // 监听大图片的加载，完成后更新透明度
    largeImage.addEventListener("load", function () {
      setTimeout(() => {
        // 确保过渡效果平滑
        smallImage.style.opacity = "0";
        largeImage.style.opacity = "1";
        largeImage.style.filter = "blur(0px)";
      }, 100); // 延迟确保CSS过渡应用
    });
  },
};
</script>

<style>
/* .test {
  height: 1000px;
  width: 300px;
  background-color: lightpink;
} */
.image-container {
  position: relative;
  width: 100%;
}

.small-image {
  /* 使图片填充容器 */
  width: 100%;
  /* 初始模糊效果 */
  transition: opacity 1s ease-out;
}

.large-image {
  /* 与小图片相同的尺寸，确保替换时位置匹配 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0; /* 初始时不可见 */
  filter: blur(3px);
  transition: opacity 1s ease-out; /* 渐变效果时间 */
  transition: filter 2s ease-out; /* 渐变效果时间 */
}
</style>
