<template>
<div :class="$style.root">
    <div :class="$style.head">{{ title }}</div>
    <div :class="$style.body"><slot></slot></div>
</div>
</template>

<script>
export default { name: 'u-summary-card-group', props: { title: String } };
</script>

<style module>
.root {

}

.head {
    line-height: 1;
}

.body {
    margin-top: 20px;
}

.root + .root {
    margin-top: 20px;
}
</style>
