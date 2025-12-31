<template>
    <div :class="$style.root"
         :fit="fit"
         :style="wrapStyle"
         :vertical-center="verticalCenter"
         :horizontal-center="horizontalCenter"
         v-on="$listeners">
        <template v-if="ready && src || isEmpty">
            <s-image-designer class="" :src="convertedSrc" :style="imageStyle" v-bind="$attrs" @click.native="onClick" :preview="preview"/>
            <u-lightbox v-if="preview" :visible.sync="visible" close-button>
                <u-lightbox-item title="图片预览">
                    <s-image class="" :src="convertedSrc"/>
                </u-lightbox-item>
            </u-lightbox>
        </template>
        <template v-else-if="placeholderReady && convertedPlaceholderSrc || placeholderIsEmpty">
            <s-image-designer class="" :src="convertedPlaceholderSrc" :style="imageStyle" v-bind="$attrs" @click.native="onClick" hsj="hsj" :preview="preview"/>
            <u-lightbox v-if="preview" :visible.sync="visible" close-button>
                <u-lightbox-item title="图片预览">
                    <s-image class="" :src="convertedPlaceholderSrc" />
                </u-lightbox-item>
            </u-lightbox>
        </template>
        <template v-else-if="loadingType !== 'none'">
            <u-loading size="small" :class="$style.loading"></u-loading>
        </template>
    </div>
</template>

<script>
import SImageDesigner from "@lcap-ui/src/components/s-image.vue/index.designer";
import UImage from './index.vue';
export default {
  name: 'u-image-designer',
  components: {
    SImageDesigner
  },
  mixins: [UImage]
};
</script>
<style module>
.root {
    display: inline-block;
    overflow: hidden;
}

.root img {
    width: var(--image-width);
    height: var(--image-height);
    display: block;
    max-width: none;
    max-height: none;
    object-position: left top;
}
.root img[preview] {
    cursor: pointer;
}

.root .loading {
    width: var(--image-width);
    height: var(--image-height);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>