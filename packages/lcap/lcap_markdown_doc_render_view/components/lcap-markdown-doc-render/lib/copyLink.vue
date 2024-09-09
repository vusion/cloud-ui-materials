<template>
  <span class="copy-link-wrapper" v-tooltip.top="'复制文档链接'" @click="copyLink" >
    <v-icon name="ri-link-m"  />
  </span>
</template>

<script>
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiLinkM } from "oh-vue-icons/icons";
addIcons(RiLinkM);
export default {
  props: ['slug'],
  name: 'copy-link',
  components: {
    "v-icon": OhVueIcon
  },
  methods: {
    copyLink() {
      if (!this.slug) {
        return;
      }
      const el = document.createElement('textarea');
      const query = this.$route.query;
      query.title = this.slug.replace(/^#/, '');


      el.value = window.location.origin + window.location.pathname + '?' + (new URLSearchParams(query).toString());
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$emit('copied', this.slug);
    }
  }
};
</script>

<style>
.copy-link-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 3px;
  border: 1px solid #E5E5E5;
  border-radius: 100%;
  margin-left: 15px;
  margin-top: 2px;
  cursor: pointer;
  color: #8B8B8B; 
}

.copy-link {
  cursor: pointer;
  color: #8B8B8B; /* 链接颜色 */
  font-size: 14px; /* 字体大小 */
  display: flex;
  align-items: center;
  font-weight: bolder;
}

.copy-link-wrapper:hover {
  background-color: #0056FF;
  border: 1px solid #0056FF;
  color: #FFFFFF; /* 悬停时更改颜色 */
  .copy-link {
    color: #FFFFFF; /* 悬停时更改颜色 */
  }
}

</style>
