<template>
<a :class="$style.root" :href="currentHref" :target="target" :disabled="disabled" @click="onClick" v-on="listeners">
    <div :class="$style.title">{{ title }}</div>
    <div :class="$style.number" :alignment="alignment">
        <!-- 兼容小数，暂固定为小数点后两位 -->
        <u-countup v-if="!isNaN(value) && !isInteger" :end="value" :decimals="2"></u-countup>
        <u-countup v-else :end="isNaN(value) ? 0 : value" :duration="1"></u-countup>
        <span style="font-size: 16px;" v-if="unit">{{ unit }}</span>
    </div>
</a>
</template>

<script>
import { ULink } from 'cloud-ui.vusion';

export default {
    name: 'u-number-portlet',
    extends: ULink,
    props: {
        title: String,
        value: [String, Number],
        unit: String,
        alignment: String,
    },
    computed: {
        isInteger() {
            return Number.isInteger(parseFloat(this.value));
        },
    },
};
</script>

<style module>
.root {
    display: block;
    background: #f7f8fd;
    border-radius: var(--border-radius-base);
    padding: 15px 18px;
    transition: var(--transition-duration-base);
}

.root:hover {
    background: var(--background-color-base);
}

.title {
    color: #8a8e9e;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.number {
    font-size: 32px;
    line-height: 1;
    margin-top: 8px;
}

.number[alignment="left"] {
    text-align: left;
}

.number[alignment="center"] {
    text-align: center;
}

.number[alignment="right"] {
    text-align: right;
}

.root[color="primary"] .number { color: var(--brand-primary); }
.root[color="info"] .number { color: var(--brand-info); }
.root[color="success"] .number { color: var(--brand-success); }
.root[color="warning"] .number { color: var(--brand-warning); }
.root[color="error"] .number { color: var(--brand-error); }

.root [class^="u-countup_count"] {
    color: inherit;
}
</style>
