<template>
<u-info-list>
    <u-info-list-group title="基本信息" column="3">
        <u-info-list-item label="名称">名称</u-info-list-item>
    </u-info-list-group>
</u-info-list>
</template>

<script>
export default {
    data() {
        return {
            instance: {},
        };
    },
    created() {
        this.$subscribe('name_PLACEHOLDER.loadDetail', (instance) => {
            this.instance = instance;
        });
    },
};
</script>
