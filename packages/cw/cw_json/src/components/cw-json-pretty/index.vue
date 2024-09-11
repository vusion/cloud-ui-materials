<template>
  <div :class="$style.root">
    <vue-json-pretty
      :data="parsedJsonData"
      :show-line-numbers="showLines"
      :display-data-types="showTypes"
      :deep="deep"
      :expandable="expandable"
      :theme="theme"
      :spacing="indentSpacing"
    />
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';

export default {
  components: {
    VueJsonPretty,
  },
  props: {
    jsonData: {
      type: [Object, String],
      required: true,
    },
    showLines: {
      type: Boolean,
      default: false,
    },
    showTypes: {
      type: Boolean,
      default: false,
    },
    deep: {
      type: Number,
      default: Infinity,
    },
    expandable: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'light',
    },
    indentSpacing: {
      type: Number,
      default: 2,
    },
  },
  watch: {
    jsonData: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      },
    },
  },
  computed: {
    parsedJsonData() {
      // 检查jsonData是否是字符串，如果是则parse成对象
      if (typeof this.jsonData === 'string') {
        try {
          return JSON.parse(this.jsonData); // 尝试解析字符串
        } catch (e) {
          console.error('Invalid JSON string:', e);
          return {}; // 如果解析失败，返回空对象，或者你可以选择处理错误
        }
      }
      return this.jsonData; // 如果已经是对象，直接返回
    },
  },
};
</script>
<style module>
.root {
  display: flex;
}
.vue-json-pretty {
  font-size: 14px;
  line-height: 1.5;
  margin: 10px;
}
</style>
