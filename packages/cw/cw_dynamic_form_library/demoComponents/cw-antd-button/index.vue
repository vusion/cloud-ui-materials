<template>
    <a-button v-bind="[$attrs, $props]" v-on="$listeners" >
      <slot v-for="(item, name) in $slots" :name="name" :slot="name"></slot>
      <span v-if="text">{{ text }}</span>
    </a-button>
</template>

<script>
export default {
  name: "cw-antd-button",
  props: {
    text: {
      type: String,
      default: "按钮"
    },
  },
  mounted() {
      console.log(this.$attrs);
  },

  methods: {
    
  }
}
</script>

<style>

</style>