<template>
  <div :class="$style.root">
      <u-linear-layout
          :class="$style.loading"
          v-if="loading"
          type="flex"
          justify="center"
          alignment="center">
          <div>
              <u-spinner></u-spinner>正在加载中...
          </div>
      </u-linear-layout>
      <u-linear-layout
          :class="$style.loading"
          v-else-if="!finnalSrc"
          type="flex"
          justify="center"
          alignment="center">
          <div>
              报表地址缺失
          </div>
      </u-linear-layout>
      <div :class="$style.wrapper">
          <template v-if="finnalSrc">
              <iframe
                  allowfullscreen="allowfullscreen"
                  v-show="!loading"
                  ref="iframeRef"
                  :class="$style.frame"
                  :src="finnalSrc"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="border:0px;"
                  @load="iframeLoaded"
              ></iframe>
          </template>
      </div>
  </div>
  </template>
  
  <script>
  export default {
      name: 'lcap-you-data',
      props: {
          src: {
              type: String,
              required: true,
          },
          scale: {
              type: String,
              default: '100',
          },
          bottomBarPos: {
              type: String,
              default: 'bottom',
          },
          hideProgressBar: {
              type: Boolean,
              default: true,
          },
          hidePageBar: {
              type: Boolean,
              default: true,
          },
          hideScaleBar: {
              type: Boolean,
              default: true,
          },
          hideTitle: {
              type: Boolean,
              default: true,
          },
          hidePrivate: {
              type: Boolean,
              default: true,
          },
          hidePublic: {
              type: Boolean,
              default: true,
          },
          side: {
              type: Boolean,
              default: false,
          },
          toolbar: {
              type: Array,
              default: () => ['export', 'refresh', 'print'],
          },
          mode: {
              type: String,
              default: 'normal',
          },
      },
      data() {
          return {
              loading: true,
          };
      },
      computed: {
          finnalSrc() {
              const { src } = this;
              if (!src) {
                  return '';
              }
              const url = new URL(src);
              const searchParams = url.searchParams;
              [
                  'scale',
                  'bottomBarPos',
                  'hideProgressBar',
                  'hidePageBar',
                  'hideScaleBar',
                  'hideTitle',
                  'hidePrivate',
                  'hidePublic',
                  'side',
                  'toolbar',
                  'mode',
              ].forEach((key) => {
                  if (this[key]) {
                      searchParams.delete(key);
                      if (key === 'toolbar' && Array.isArray(this[key])) {
                          searchParams.append(key, JSON.stringify(this[key]));
                      } else {
                          searchParams.append(key, this[key]);
                      }
                  }
              });
              return url.toString();
          },
      },
      methods: {
          iframeLoaded() {
              this.loading = false;
              this.$emit('load');
          },
      },
  };
  </script>
  
  <style module>
  .root {
      position: relative;
      width: 400px;
      height: 600px;
      /* overflow: auto; */
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      display: flex;
  }
  
  .loading {
      position: absolute;
  }
  .wrapper {
  
  }
  .frame {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0;
      margin: auto;
      box-sizing: border-box;
  }
  </style>
  