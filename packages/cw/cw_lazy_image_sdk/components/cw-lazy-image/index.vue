<template>
    <img    :fit="fit"   :vertical-center="verticalCenter"
         :horizontal-center="horizontalCenter" class="cw-lazy-image" v-lazy="value" alt="" :style="imageStyle">
</template>

<script>
export default {
    name:"cw-lazy-image",
    props:{
      value:{
        type:String,
      },
        fit: {
            type: String,
            default: 'contain',
        },
       verticalCenter: {
            type: String,
            default: 'center',
        },
        horizontalCenter: {
            type: String,
            default: 'center',
        },
    },
    computed: {
       imageStyle() {
            return {
                'object-fit': this.fit,
                'object-position': `${this.verticalCenter} ${this.horizontalCenter}`,
            };
        },
     }
    
}
</script>

<style>
.cw-lazy-image{
    width: var(--image-width);
    height: var(--image-height);
}
</style>