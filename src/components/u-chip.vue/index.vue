<template>
<span :class="$style.root" :editing="editing" :error="error || !mutedMessage && touched && !valid" v-on="$listeners">
    <slot></slot>
    <span v-if="removable" :class="$style.remove" @click.stop="remove()"></span>
</span>
</template>

<script>
import { UValidator } from 'cloud-ui.vusion';

export default {
    name: 'u-chip',
    mixins: [UValidator],
    props: {
        removable: { type: Boolean, default: false },
        editing: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
    },
    methods: {
        remove() {
            if (this.$emitPrevent('before-remove', null, this)) return;
            this.$emit('remove', null, this);
        },
    },
};
</script>

<style module>
.root {
    position: relative;
    max-width: 558px;
    display: inline-block;
    padding: 0 var(--chip-padding-x, 10px);
    font-size: var(--chip-font-size, var(--font-size-base));
    line-height: var(--chip-line-height, 1.8);
    background: var(--chip-background-color, var(--background-color-base, #eef2f7));
    color: var(--chip-color, var(--color-base, #666));
    border: 1px solid var(--chip-background-color, var(--background-color-base, #eef2f7));
    border-radius: var(--chip-border-radius, 100px);
}

.root:not(:last-child) {
    margin-right: var(--chip-space, 5px);
}

.remove {
    cursor: var(--cursor-pointer);
    margin-left: var(--select-tag-margin-x);
    color: var(--select-tag-remove-color);
}

.remove::before {
    icon-font: url('cloud-ui.vusion/src/components/i-icon.vue/assets/close.svg');
    vertical-align: -2px;
}

.remove:hover {
    color: var(--select-tag-remove-color-hover);
}

.root[editing] {
    background: white;
    border-style: dashed;
}

.root[error] {
    border-style: solid;
    border-color: var(--brand-error);
}

.root[display="block"] {
    display: block;
}
</style>
