<template>
  <span class="copy-link-wrapper" v-tooltip.top="'复制文档链接'" @click="copyLink" >
    <svg aria-hidden="true" width="19.2" height="19.2" viewBox="0 0 24 24" fill="currentColor" class="ov-icon" style="font-size: 1.2em;"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1012 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 018.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 11-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1012 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"></path></svg>
  </span>
</template>

<script>

export default {
  props: ['slug'],
  name: 'copy-link',
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
