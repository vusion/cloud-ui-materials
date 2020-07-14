<template>
<u-linear-layout direction="vertical">
    <u-linear-layout>
        列表页。
    </u-linear-layout>
    <u-form layout="inline">
        <u-grid-layout>
            <u-grid-layout-row :repeat="3">
                <u-grid-layout-column>
                    <u-form-item label="用户名">
                        <u-input v-model="filter.username" maxlength="63"></u-input>
                    </u-form-item>
                </u-grid-layout-column>
                <u-grid-layout-column>
                    <u-form-item label="单位名称">
                        <u-input v-model="filter.department" maxlength="63"></u-input>
                    </u-form-item>
                </u-grid-layout-column>
                <u-grid-layout-column>
                    <u-form-item>
                        <u-button color="primary" @click="$refs.tableView.reload()">查询</u-button>
                    </u-form-item>
                </u-grid-layout-column>
            </u-grid-layout-row>
        </u-grid-layout>
    </u-form>
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
        return {
            filter: {
                username: '',
                department: '',
            },
        };
    },
    methods: {
        async load() {
            const result = await this.$services.service_PLACEHOLDER.loadList_PLACEHOLDER({
                query: this.filter,
            });
            return result;
        },
    },
};
</script>
<style module>
.root {}
</style>
