<template>
  <a-steps  v-bind="[$attrs, $props]">
    <slot v-for="(item, name) in $slots" :name="name" :slot="name"></slot>
  </a-steps>
</template>

<script>
export default {
    name:"cw-antd-steps",
    props:{
      value:{
        type:String,
        default:"请在这里编写代码"
      }
    }
}
</script>

<style>

</style>