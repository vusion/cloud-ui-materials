<template>
  <div
    ref="pictureContainer"
    @click="handleClick"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <picture v-if="isIntersecting">
      <!-- Extra small screens (e.g., small phones) -->
      <source
        v-if="smallPhoneSrc"
        :srcset="smallPhoneSrc"
        media="(max-width: 480px)"
      />
      <!-- Small screens (e.g., phones) -->
      <source
        v-if="phoneSrc"
        :srcset="phoneSrc"
        media="(min-width: 481px) and (max-width: 767px)"
      />
      <!-- Medium screens (e.g., tablets) -->
      <source
        v-if="tabletSrc"
        :srcset="tabletSrc"
        media="(min-width: 768px) and (max-width: 1024px)"
      />
      <!-- Large screens (e.g., laptops) -->
      <source
        v-if="laptopSrc"
        :srcset="laptopSrc"
        media="(min-width: 1025px) and (max-width: 1440px)"
      />
      <!-- Extra large screens (e.g., desktops) -->
      <source
        v-if="desktopSrc"
        :srcset="desktopSrc"
        media="(min-width: 1441px) and (max-width: 1920px)"
      />
      <!-- 2K screens -->
      <source
        v-if="twoKSrc"
        :srcset="twoKSrc"
        media="(min-width: 1921px) and (max-width: 2560px)"
      />
      <!-- 4K screens -->
      <source v-if="fourKSrc" :srcset="fourKSrc" media="(min-width: 2561px)" />
      <!-- Default image -->
      <img :style="imageStyle" :src="defaultSrc || fallbackSrc" :alt="alt" />
    </picture>
  </div>
</template>

<script>
export default {
  name: "responsive-picture",
  props: {
    smallPhoneSrc: {
      type: String,
      default: "",
    },
    phoneSrc: {
      type: String,
      default: "",
    },
    tabletSrc: {
      type: String,
      default: "",
    },
    laptopSrc: {
      type: String,
      default: "",
    },
    desktopSrc: {
      type: String,
      default: "",
    },
    twoKSrc: {
      type: String,
      default: "",
    },
    fourKSrc: {
      type: String,
      default: "",
    },
    defaultSrc: {
      type: String,
      required: true,
    },
    fallbackSrc: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
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
  data() {
    return {
      isIntersecting: false,
    };
  },
  mounted() {
    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the element is intersecting, set isIntersecting to true and disconnect the observer
        if (entry.isIntersecting) {
          this.isIntersecting = true;
          observer.disconnect();
        }
      });
    });

    // Observe the picture container element
    observer.observe(this.$refs.pictureContainer);
  },
  computed: {
    imageStyle() {
      return {
        "object-fit": this.fit,
        "object-position": `${this.verticalCenter} ${this.horizontalCenter}`,
      };
    },
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
    handleMouseOver(event) {
      this.$emit("mouseover", event);
    },
    handleMouseLeave(event) {
      this.$emit("mouseleave", event);
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
/* Add any styles you need here */
</style>
