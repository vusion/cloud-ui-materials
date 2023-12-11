<template>
  <div vusion-slot-name="default" class="test-room">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name:"test-view",
    props:{
      value:{
        type:String,
        default:"请在这里编写代码"
      }
    }
}
</script>

<style>
.test-room{
  min-height: 100px;
}
</style>