<template>
  <div>
    <u-skeleton type="image" v-if="VUE_APP_DESIGNER" />
    <recycle-scroller
      :items="imagesData"
      :item-size="5"  
      class="preview-img-list"
      key-field="key"
    >
      <template #default="{ item, index }">
        <li @click="preview(index)">
          <img :src="item" alt="" />
        </li>
      </template>
    </recycle-scroller>
  </div>
</template>

<script>
import Vue from 'vue'
import VueImageSwipe from 'vue-image-swipe'
import { convertToPdfAndGetResult } from './convert'
import { RecycleScroller } from 'vue-virtual-scroller/dist/vue-virtual-scroller.umd'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import './vue-image-swipe.css'

Vue.use(VueImageSwipe)

export default {
  name: 'LocalPptPreview',
  components: {
    RecycleScroller
  },
  props: {
    urlString: {
      type: String,
      default: 'http://dev.bjztest.neteasepmo.lcap.163yun.com/upload/app/06889c61-5b85-4b8a-9eac-8d14f9159f8a/aaaa-69页_20240725105022250.pptx'
    }
  },
  watch: {
    urlString: {
      handler() {
        !this.VUE_APP_DESIGNER && this.convertPhotos();
      },
      immediate: true,
    },
  },
  data() {
    return {
      VUE_APP_DESIGNER: this.$env && this.$env.VUE_APP_DESIGNER,
      imagesData: [],
      isLoading: false
    }
  },
  methods: {
    convertPhotos() {
      this.isLoading = true;
      convertToPdfAndGetResult(this.urlString, 1, this.updateImages)
        .then(pageUrls => {
          this.$nextTick(() => this.imagesData = pageUrls)
        })
        .catch(error => {
          this.$emit('error', error);
        })
        .finally(() => this.isLoading = false);
    },
    updateImages(partialPageUrls) {
      this.imagesData = [...this.imagesData, ...partialPageUrls.filter(url => !this.imagesData.includes(url))];
    },
    preview(index) {
      this.$imagePreview({
        images: this.imagesData,
        index: index,
      })
    }
  },
};
</script>

<style module></style>
