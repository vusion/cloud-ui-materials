<template>
<div :class="$style.root">
    <span :class="$style.label">{{ label }}</span>
    <span :class="$style.content">
        <slot></slot>
    </span>
</div>
</template>

<script>
export default { name: 'u-summary-card-item', props: { label: String } };
</script>

<style module>
.root {
    display: inline-block;
    width: 50%;
    vertical-align: text-top;
}

.label {
    display: inline-block;
    min-width: 6.5em;
    color: #999;
}

.content {
    display: inline-block;
    max-width: 170px;
    vertical-align: top;
}

.root[label-size="large"] .label {
    min-width: 7.5em;
}

.label:lang(en) {
    width: 50%;
    padding-right: 10px;
}

.content:lang(en) {
    width: 130px;
}
</style>
