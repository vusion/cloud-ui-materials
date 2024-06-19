<template>
  <a-dropdown v-bind="[$attrs, $props]" :getPopupContainer="getPopupContainer" >
    <slot v-for="(item, name) in $slots" :name="name" :slot="name"></slot>
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      Hover me <a-icon type="down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;">1st menu item</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">2nd menu item</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">3rd menu item</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
    name:"cw-antd-dropdown",
    props:{
      value:{
        type:String,
        default:"请在这里编写代码"
      }
  },
  methods: {
    getPopupContainer() {
      return document.getElementById('ant_design_vue_library')
    }
  }
}
</script>

<style>

</style>