<template>
<div :class="$style.root">{{ now }}</div>
</template>

<script>
import { utils } from 'cloud-ui.vusion';
export default {
    name: 'lcap-clock',
    props: {
        format: {
            type: String,
            default: 'YYYY-MM-DD HH:mm',
        },
    },
    data() {
        return {
            now: '',
        };
    },
    created() {
        this.loop();
    },
    beforeDestroy() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    },
    methods: {
        loop() {
            this.now = utils.dateFormatter.format(new Date(), this.format);
            this.timer = setTimeout(() => {
                this.loop();
            }, 1000);
        },
    },
};
</script>

<style module>
.root {}
</style>
