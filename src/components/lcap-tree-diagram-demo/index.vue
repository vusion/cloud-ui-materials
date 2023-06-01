<template>
  <div>
    <new-item></new-item>
  </div>
</template>
<script>
import NewItem from './new.vue';
import DemoItem from './demo.vue';

export default {
  name: 'lcap-tree-diagram',
  components: {
    NewItem,
    DemoItem,
  },
  data() {
    return {};
  },
  methods: {},
};
