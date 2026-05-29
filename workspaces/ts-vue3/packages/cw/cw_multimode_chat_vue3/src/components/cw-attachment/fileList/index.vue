<template>
<div :class="$style.root" :display="isAllImage?'':'grid'">
  <cw-file-card v-for="(item, index) in list"
    :class="$style.item"
    :key="index"
    :item="item"
    :imgPreview="isAllImage"
    :disabled="disabled"
    :readonly="readonly"
    @remove="onRemove"></cw-file-card>
</div>
</template>

<script>
import CWFileCard from './card.vue';
const IMG_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'];

export default {
  name: 'cw-bubble-filelist',
  components: {
    'cw-file-card': CWFileCard,
  },
  props: {
    list: { type: Array, default: () => ([]),},
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  data() {
    return {}
  },
  computed: {
    isAllImage() {
      return this.list.every(item => IMG_EXTS.some((key) => item.name && item.name.endsWith(`.${key}`)));
    }
  },
  methods: {
    onRemove(item) {
      this.$emit('remove', item);
    }
  },
}
</script>

<style module>
.root {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 14px;
    line-height: 1.5714285714285714;
    width: 100%;
    max-height: 160px;
    overflow-y: auto;
    padding: 8px 16px;
}
.root[display="grid"] {
  display: grid;
  grid-template-columns: minmax(90px,1fr) minmax(90px,1fr) minmax(90px,1fr);
}
.root::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.root::-webkit-scrollbar-thumb {
  background: rgba(29, 33, 41, 0.16);
  border-radius: 4px;
}
</style>