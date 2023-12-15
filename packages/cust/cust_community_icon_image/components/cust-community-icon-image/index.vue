<template>
	<div :class="$style.root" :style="rootStyle">
		<svg aria-hidden="true" :class="$style.icon"><use :xlink:href="iconName"></use></svg>
	</div>
</template>

<script>
export default {
	name: 'custom-community-icon',
	props: {
		backgroundImg: {
			type: String,
			default: undefined,
		},
		icon: {
			type: String,
			default: 'youjian',
		}
	},
	computed: {
		iconName(){
			return `#others-${this.icon}`;
		},
		rootStyle(){
			return {
				'background-image': this.backgroundImg,
			};
		}
	}
};

</script>

<style module>
.root{
	position: relative;
	display: inline-block;
	overflow: hidden;
	width: var(--image-width);
	height: var(--image-height);
	color: #fff;
}

.icon{
	width: 100%;
	height: 100%;
	fill: currentColor;
}

</style>