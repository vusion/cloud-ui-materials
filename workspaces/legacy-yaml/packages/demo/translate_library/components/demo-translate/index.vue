<template>
  <div>
    <div>{{ $tt('dialog') }}</div>
    <u-text>{{ $tt('dialog') }}</u-text>
  </div>
</template>

<script>
import i18nMixin from './mixins/i18n-mixin';
export default {
    name:"demo-translate",
    mixins:[i18nMixin('demo-translate')],
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