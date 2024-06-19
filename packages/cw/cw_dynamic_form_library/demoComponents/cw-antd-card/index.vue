<template>
  <a-card title="Default size card" style="width: 100%">
    <slot v-for="(item, name) in $slots" :name="name" :slot="name"></slot>
  </a-card>
</template>

<script>
export default {
    name:"cw-antd-card",
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