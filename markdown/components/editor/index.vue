<template>
  <div>{{value}}</div>
</template>

<script>
export default {
    name:"editor",
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