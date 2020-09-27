<template>
<div :class="$style.root">
    <img :src="src" v-bind="$attrs">
</div>
</template>

<script>

export default {
    name: 'lcap-configable-demo',
    inheritAttrs: false,
    props: {
        src: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>

<style module >
.root {
    position: relative;
    display: inline-block;
    width: 128px;
    height: 128px;
    text-align: center;
}
.root img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-height: 100%;
    max-width: 100%;
}
</style>
