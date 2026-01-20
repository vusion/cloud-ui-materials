<template>
  <a
    :class="isInNavbar ? $style.root : $style.dropdownRoot"
    :selected="parentVM.router ? active : isSelected"
    :readonly="parentVM.readonly"
    :disabled="disabled || parentVM.disabled"
    :href="currentHref"
    :target="target"
    @click="parentVM.router ? onClick($event) : onSelect($event)"
    v-on="listeners"
    v-ellipsis-title
    :vusion-slot-name-edit="isInNavbar ? 'navbarNode' : 'leafNode'"
    :vusion-slot-name="isInNavbar ? 'navbarNode' : 'leafNode'"
  >
    <!-- dynamic-item节点只能是 导航栏插槽 或 叶子节点插槽 -->
    <slot v-if="isInNavbar" name="navbarNode" :item="node" :index="index">
      {{ text }}
    </slot>
    <slot v-else name="leafNode" :item="node" :index="index">
      {{ text }}
    </slot>
  </a>
</template>

<script>
import UNavbarItemMulti from './item.vue';

export default {
  name: 'u-navbar-dynamic-item',
  groupName: 'u-navbar-dynamic-group',
  extends: UNavbarItemMulti,
  props: {
    node: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: undefined,
    },
  },
};
</script>
