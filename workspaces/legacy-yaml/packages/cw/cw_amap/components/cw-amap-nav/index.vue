<template>
  <a :class="$style.root" @click="toDest" :href="currentHref" :target="target">
    <img
      :class="$style.vaniconv"
      :src="iconUrl"
      alt=""
      width="20"
      height="20"
    />
    <span :class="$style.label">{{ label }}</span>
  </a>
</template>

<script>
// 显式加载图片，避免被当作模块对象字符串化成 [object Module]
import iconMod from './loction.png';
const iconUrlResolved = typeof iconMod === 'string' ? iconMod : iconMod.default;

export default {
  name: 'cw-amap-nav',
  props: {
    label: String,
    callnativet: { type: Boolean, default: true },
    canto: { type: Boolean, default: true },
    lalg: String,
    target: { type: String, default: '_self' },
  },
  data() {
    return {
      iconUrl: iconUrlResolved,
    };
  },
  computed: {
    currentHref() {
      const { lalg, label, callnativet } = this;
      return `https://uri.amap.com/marker?position=${lalg}&name=${label}&coordinate=gaode&callnative=${callnativet ? 1 : 0}`;
    },
  },
  methods: {
    toDest(e) {
      if (!this.canto) {
        e.preventDefault();
        return null;
      }
    },
  },
};
</script>

<style module>
.root {
  display: flex;
  font-size: 16px;
  align-items: center;
}
.vaniconv {
  font-size: 16px;
  color: #00c0cc;
  vertical-align: baseline;
}
.label {
  margin-left: 10px;
}
</style>
