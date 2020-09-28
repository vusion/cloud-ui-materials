<template>
<div :class="$style.root"></div>
</template>

<script>
import './theme';
import VueEcharts from 'vue-echarts';

export default {
    name: 'lcap-x-echarts',
    extends: VueEcharts,
    props: {
        theme: { type: [String, Object], default: 'cloud-ui' },
        autoresize: { type: Boolean, default: true },
    },
};
</script>

<style module>
.root {
    /* width: 600px; */
    height: 400px;
}

.root[border] {
    border: 1px solid var(--border-color-base);
    padding: 15px;
}
</style>
