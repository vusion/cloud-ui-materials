<template>
   <a-affix v-bind="[$attrs, $props]">
    <slot v-for="(item, name) in $slots" :name="name" :slot="name"></slot>
   </a-affix>
</template>

<script>
export default {
    name:"cw-antd-affix",
    props:{

    }
}
</script>

<style>
</style>