<template>
<span :class="$style.root">
    <span :class="$style.color" :style="{ backgroundColor: currentValue }"></span>
    <u-popup @open="onOpen" @close="onClose" :placement="placement">
        <u-pallette :class="$style.pallette" slot="root" :value="currentValue" @input="onInput">
            <slot></slot>
        </u-pallette>
    </u-popup>
</span>
</template>

<script>
export default {
    name: 'u-color-picker',
    props: {
        value: { type: String, default: '#000000' },
        placement: { type: String }
    },
    data() {
        return {
            currentValue: this.value,
        };
    },
    watch: {
        value(value) {
            this.currentValue = this.value;
        },
        currentValue(value, oldValue) {
            this.$emit('change', {
                value,
                oldValue,
            });
        },
    },
    methods: {
        onInput(value) {
            this.currentValue = value;
            this.$emit('input', value);
            this.$emit('update:value', value);
        },
        onOpen($event) {
            this.$emit('open', Object.assign({
                value: this.currentValue,
            }, $event), this);
        },
        onClose($event) {
            this.$emit('close', Object.assign({
                value: this.currentValue,
            }, $event), this);
        },
    },
};
</script>

<style module>
.root {
    position: relative;
    display: inline-block;
    border: var(--border-width-base) solid var(--border-color-base);
    border-radius: 3px;
    vertical-align: -6px;
}

.color {
    display: block;
    width: 26px;
    height: 14px;
    margin: 3px;
    border-radius: 2px;
}

.pallette {
    border: none;
}
</style>
