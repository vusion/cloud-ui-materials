<template>
    <tr :class="$style['expand-content']" v-if="vm && item.expanded">
        <f-collapse-transition>
            <td :colspan="visibleColumnVMs.length" :class="$style['expand-td']" v-show="item.expanded">
                <f-slot name="expand-content" :vm="vm" :props="slotProps"></f-slot>
            </td>
        </f-collapse-transition>
    </tr>
</template>
<script>
export default {
  name: 'u-table-render-tr-expander',
  props: {
    vm: Object,
    slotProps: Object,
    slotName: String,
    item: Object,
    visibleColumnVMs: Array
  }
};
</script>
<style module src="./index.css"></style>

