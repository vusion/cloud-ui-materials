<template>
    <div :class="$style.root">
        <iframe
            :src="currentPreviewSrc"
            :class="$style.content"
            frameborder="0"
            v-if="currentPreviewSrc"></iframe>
    </div>
</template>

<script>
export default {
    name: 'cw-ppt-preview',
    props: {
        value: {
            type: String,
        },
    },

    computed: {
        currentPreviewSrc() {
            if (!this.value) return;
            return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                this.value
            )}`;
        },
    },
};
</script>

<style module>
.root {
    height: 500px;
}

.content {
    width: 100%;
    height: 100%;
}
</style>
