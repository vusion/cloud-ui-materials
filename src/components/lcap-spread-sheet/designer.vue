<template>
<div :class="$style.root">
    <form-items :spread="spread"></form-items>
    <cell-style :spread="spread"></cell-style>
</div>
</template>

<script>
import FormItems from './blocks/form-items';
import CellStyle from './blocks/cell-style';

export default {
    name: 'lcap-excel-designer',
    components: {
        FormItems,
        CellStyle,
    },
    props: {
        spread: Object,
    },
};
</script>

<style module>
.root {
    flex: 0 0 64px;
    display: flex;
    border-bottom: 1px #e8e8f0 solid;
    background-color: #f6f7fa;
    min-height: 0;
}
</style>
