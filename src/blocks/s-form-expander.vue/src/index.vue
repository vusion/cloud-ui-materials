<template>
<u-form :class="$style.form" layout="inline" :expanded="expanded">
    <u-grid-layout>
        <u-grid-layout-row :repeat="4">
            <u-grid-layout-column>
                <u-form-item label="状态">
                    <u-select auto-select>
                        <u-select-item>认证中</u-select-item>
                    </u-select>
                </u-form-item>
            </u-grid-layout-column>
            <u-grid-layout-column>
                <u-form-item label="备案类型">
                    <u-select auto-select>
                        <u-select-item>全部</u-select-item>
                    </u-select>
                </u-form-item>
            </u-grid-layout-column>
            <u-grid-layout-column>
                <u-form-item label="备案号">
                    <u-input maxlength="63"></u-input>
                </u-form-item>
            </u-grid-layout-column>
        </u-grid-layout-row>
        <u-grid-layout-row :repeat="4">
            <u-grid-layout-column>
                <u-form-item label="用户名">
                    <u-input maxlength="63"></u-input>
                </u-form-item>
            </u-grid-layout-column>
            <u-grid-layout-column>
                <u-form-item label="单位名称">
                    <u-input maxlength="63"></u-input>
                </u-form-item>
            </u-grid-layout-column>
            <u-grid-layout-column>
                <u-form-item>
                    <u-button color="primary">查询</u-button>
                </u-form-item>
            </u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
    <u-link :class="$style.expander" :expanded="expanded" @click="expanded = !expanded">{{ expanded ? '基本' : '更多' }}筛选</u-link>
</u-form>
</template>

<script>
export default {
    data() {
        return {
            expanded: false,
        };
    },
};
</script>

<style module>
.form {
    position: relative;
    height: 34px;
    overflow: hidden;
}

.form[expanded] {
    height: auto;
}

.expander {
    position: absolute;
    right: 20px;
    bottom: 8px;
}

.expander::after {
    display: inline-block;
    text-decoration: none;
    icon-font: url('cloud-ui.vusion/src/components/i-icon.vue/icons/angle-down.svg');
    margin-left: 3px;
    vertical-align: -2px;
}

.expander[expanded]::after {
    transform: rotate(180deg);
}
</style>
