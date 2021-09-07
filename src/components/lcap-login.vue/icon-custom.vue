<template>
<svg :class="$style.icon" aria-hidden="true">
    <use :xlink:href="href" />
</svg>
</template>

<script>
export default {
    name: 'icon-custom',
    props: {
        name: String,
    },
    computed: {
        href() {
            return `#icon-${this.name}`;
        },
    },
};
</script>

<style module>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
