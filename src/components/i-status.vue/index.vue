<template>
<div :class="$style.root"><slot></slot></div>
</template>

<script>
export default {
    name: 'i-status',
};
</script>

<style module>
.root {
    display: inline-block;
    color: var(--status-icon-color);
}

.root::before {
    margin-right: var(--status-icon-space, 6px);
    font-size: 24px;
    vertical-align: -4px;
}

.root[size="mini"]::before {
    font-size: 14px;
    vertical-align: 0;
    margin-right: 3px;
}

.root[size="small"]::before {
    font-size: 18px;
    vertical-align: -2px;
    margin-right: 4px;
}

.root[size="large"] {
    font-size: 16px;
}

.root[size="large"]::before {
    font-size: 32px;
    vertical-align: -6px;
    margin-right: 8px;
}

.root[name="success"]::before {
    icon-font: url("./assets/success.svg");
    color: var(--brand-success, #37cdad);
}

.root[name="paused"]::before {
    icon-font: url("./assets/paused.svg");
    color: var(--brand-error, #ff5a5a);
}

.root[name="warning"]::before {
    icon-font: url("./assets/warning.svg");
    color: var(--brand-warning, #ffae3c);
}

.root[name="waiting"]::before {
    icon-font: url("./assets/waiting.svg");
    color: var(--brand-disabled-dark, #c2cdde);
}

.root[name="error"]::before {
    icon-font: url("./assets/error.svg");
    color: var(--brand-error, #ff5a5a);
}

.root[name="enabled"]::before {
    icon-font: url("./assets/enabled.svg");
    color: var(--brand-success, #37cdad);
}

.root[name="disabled"]::before {
    icon-font: url("./assets/disabled.svg");
    color: var(--brand-error, #ff5a5a);
}

.root[name="unused"]::before {
    icon-font: url("./assets/unused.svg");
    color: var(--brand-disabled-dark, #c2cdde);
}

.root[name="end"]::before {
    icon-font: url("./assets/end.svg");
    color: var(--brand-disabled-dark, #c2cdde);
}

.root[name="expired"]::before {
    icon-font: url("./assets/expired.svg");
    color: var(--brand-disabled-dark, #c2cdde);
}

.root[name="locked"]::before {
    icon-font: url("./assets/locked.svg");
    color: var(--brand-success, #37cdad);
}
.root[name="unlocked"]::before {
    icon-font: url("./assets/unlocked.svg");
    color: var(--brand-success, #37cdad);
}

.root[name="binding"]::before {
    icon-font: url("./assets/binding.svg");
    color: var(--brand-success, #37cdad);
}

.root[name="migrating"]::before {
    icon-font: url("./assets/migrating.svg");
    color: var(--brand-problem, #ffd52e);
}

.root[name="unpaid"]::before {
    icon-font: url("./assets/unpaid.svg");
    color: var(--brand-warning, #ffae3c);
}
</style>
