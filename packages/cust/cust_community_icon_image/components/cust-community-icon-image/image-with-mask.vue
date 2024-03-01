<template>
    <div :class="$style.root">
        <u-image :src="img" fit="fill"></u-image>
        <div v-if="maskStyle" :class="$style.mask" :style="maskStyle"></div>
    </div>
</template>

<script>
export default {
    name: 'custom-community-icon-with-mask',
    props: {
        img: {
            type: String,
            default: undefined,
        },
        mask: {
            type: String,
            default: '',
        },
    },
    computed: {
        maskStyle() {
            console.log(this.$attrs);
            if (!this.mask) return null;
            return {
                'background-image': this.mask,
            };
        },
    },
};
</script>

<style module>
.root {
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: var(--image-width);
    height: var(--image-height);
    color: #fff;
}

.root [class^='u-image__'] {
    width: 100%;
    height: 100%;
}

.mask {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
