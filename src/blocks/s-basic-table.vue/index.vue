<template>
<u-linear-layout direction="vertical">
    <u-linear-layout>
        列表页。
    </u-linear-layout>
    <u-linear-layout>
        <u-button color="primary" icon="create" to="create">创建</u-button>
        <u-button square icon="refresh" @click="$refs.tableView.reload()"></u-button>
    </u-linear-layout>
    <u-table-view ref="tableView" :data-source="load">
        <u-table-view-column type="checkbox" width="8%"></u-table-view-column>
        <u-table-view-column title="名称" field="name"></u-table-view-column>
        <u-table-view-column title="描述" field="description"></u-table-view-column>
        <u-table-view-column title="操作">
            <template #cell="{ item }">
                <u-linear-layout gap="small">
                    <u-link :to="{ path: 'detail', query: { id: item.id } }">
                        查看详情
                    </u-link>
                </u-linear-layout>
            </template>
        </u-table-view-column>
    </u-table-view>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        async load() {
            const result = await this.$services.service_PLACEHOLDER.loadList_PLACEHOLDER();
            return result;
        },
    },
};
</script>
<style module>
.root {}
</style>
