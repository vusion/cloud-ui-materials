<template>
<div :class="$style.root">
    <div :class="$style.point"></div>
    <slot></slot>
</div>
</template>

<script>
export default { name: 'u-timeline-item' };
</script>

<style module>
.root {
    position: relative;
    padding-left: 20px;
    min-height: 84px;
    padding-bottom: 10px;
}

.point {
    position: absolute;
    width: 12px;
    height: 12px;
    background: white;
    border: 2px solid var(--border-color-base, #dadee3);
    border-radius: 100px;
    left: 0;
    top: 6px;
}

.root:not(:last-child)::before {
    content: '';
    display: block;
    position: absolute;
    border: 1px solid var(--border-color-base, #9fafc8);
    height: calc(100% - 4px);
    left: 5px;
    top: 10px;
}

.root[color="primary"] .point {
    border-color: var(--timeline-point-border-color-primary, #4988e8);
}

.root[color="success"] .point, .root[color="done"] .point {
    border-color: var(--timeline-point-border-color-primary, #3ad0af);
}

.root[color="warning"] .point, .root[color="doing"] .point {
    border-color: var(--timeline-point-border-color-primary, #ffa136);
}

.root[color="error"] .point {
    border-color: var(--timeline-point-border-color-primary, #fe5a5a);
}
</style>
