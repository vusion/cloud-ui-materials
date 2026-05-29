<!-- 基本用法 -->
<template>
<div>
    <u-linear-layout 
        :loadingIconRotate="false"
        style="height: 200px; border: 1px solid #aaa; padding: 20px; margin: 20px;" ref="linearLayout"></u-linear-layout>
    <u-button @click="onOpen">打开加载</u-button>
    <u-button @click="onClose">关闭加载</u-button>
</div>
</template>

<script>
export default {
    methods: {
        onOpen() {
            this.$refs.linearLayout.openLoading();
        },
        onClose() {
            this.$refs.linearLayout.closeLoading();
        },
    }
}
</script>