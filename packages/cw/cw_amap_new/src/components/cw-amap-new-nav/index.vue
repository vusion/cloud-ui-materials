<template>
  <a :class="$style.root" @click="toDest" :href="currentHref" :target="target">
    <img :class="$style.vaniconv" style="width: 20px; height: 20px" src="./loction.png" alt="" />
    <span :class="$style.label">{{ label }}</span>
  </a>
</template>

<script>
// test change
// release v1.0.5
export default {
  name: 'cw-amap-new-nav',
  props: {
    label: {
      type: String,
    },
    callnativet: {
      type: Boolean,
      default: true,
    },
    canto: {
      type: Boolean,
      default: true,
    },
    lalg: {
      type: String,
    },
    target: {
      type: String,
      default: '_self',
    },
  },
  data() {
    return {};
  },
  computed: {
    currentHref() {
      const { lalg, label, callnativet } = this;
      console.log(`https://uri.amap.com/marker?position=${lalg}&name=${label}&coordinate=gaode&callnative=${callnativet ? 1 : 0}`);
      return `https://uri.amap.com/marker?position=${lalg}&name=${label}&coordinate=gaode&callnative=${callnativet ? 1 : 0}`;
    },
  },
  methods: {
    toDest($event) {
      if (!this.canto) {
        $event.preventDefault();
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
