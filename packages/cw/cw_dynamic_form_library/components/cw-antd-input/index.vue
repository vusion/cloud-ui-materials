<template>
  <a-input v-model="currentValue"  @change="handleChange" v-bind="[$attrs, $props]" v-on="$listeners" />
</template>

<script>
export default {
  name:"cw-antd-input",
  props: {
    value:{
          type:String,
    },
  },
  data() {
    return {
        currentValue:""
    }
  },
  watch: {
    value:{
      handler(val) {
        this.currentValue = val
      },
      immediate: true
    },
  },
  methods: {
    handleChange(e) {
        this.$emit('update:value', e.target.value)
        this.$emit("onChange",e)
    }
  }
}
</script>

<style>

</style>