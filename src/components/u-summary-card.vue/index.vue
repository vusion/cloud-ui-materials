<template>
<div :class="$style.root">
    <slot></slot>
</div>
</template>

<script>
export default { name: 'u-summary-card' };
</script>

<style module>
.root {
    width: 580px;
    padding: 20px;
    border: 1px solid #e1e8ed;
}
</style>
