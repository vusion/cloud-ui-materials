<template>
  <!-- 视频播放 -->
  <video
    class="video"
    controls=""
    ref="video"
    id="video"
    :src="videoUrl"
    :poster="poster"
    v-on:error.prevent="error($event)"
  >
  </video>
</template>

<script>
export default {
  name: "lcap-video-basic",
  props: {
    videoUrl: {
      type: String,
      default: "",
    },
    poster: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // videoUrls: ''
      show: true,
      isError: false, // 是否不能播放视频
      errMsg: "",
    };
  },
  watch: {
    videoUrl(val) {
      this.$refs.video.src = val
    }
  },
  computed: {},
  components: {},
  mounted() {
    let video = document.getElementById("video");
    // 如果是手机端，在挂载时播放
    if (this.isMobile) {
      video.play()
    }
  },
  methods: {
    close() {
      this.show = false;
      this.$emit("close");
    },
    error(e) {
      console.log(e);
      if (this.videoUrl == '') {
        this.isError = true
        this.errMsg = "该文章暂无视频！"
      } else {
        this.isError = true
        this.errMsg = "视频链接失效！无法播放！"
      }
    },
  },
};
</script>

<style scoped>
.video {
  width: 45.3125vw;
  height: 50.1vh;
  background: #000;
}

</style>
