<template>
    <j-group 
        :source="node"
        @click="onClick" 
        :configs="configs">
        <j-text :configs="{
            textColor: this.coin ? '#60CFC4' : '#EB6864',
            content: node.name,
        }">
        </j-text>
    </j-group>
</template>
<script>
import { LinearLayout } from '@joskii/jflow-core';
const layout = new LinearLayout({
  direction: 'vertical',
  gap: 0
});
export default {
  props: {
    node: Object
  },
  data() {
    return {
      configs: {
        layout,
        borderRadius: 8,
        borderColor: '#EB6864',
        borderWidth: 2,
        padding: 20
      },
      coin: false
    };
  },
  methods: {
    onClick() {
      this.coin = !this.coin;
    }
  }
};
</script>