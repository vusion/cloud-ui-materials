<!-- 纯数组前端分页 -->
<template>
    <div><button v-html="text" @click="onClick"></button><u-table-view ref="tableView" :configurable="true"
            :pagination="true" :pageSize="20" :pageNumber="1" :line="true" :dataSource='tableDataSource'
            :striped="true">
            <template #config-columns>
                <u-table-view-column-config>
                    <template #title>
                        <i-ico name="setting">
                            <u-text text="展示列1"></u-text>
                        </i-ico>
                    </template>
                </u-table-view-column-config>
            </template>
            <u-table-view-column field="name">
                <template #title>
                    名称2
                </template>
            </u-table-view-column>
            <u-table-view-column-group thtextalign="right">
                <template #title>表格列分组</template>
                <u-table-view-column-group>
                    <template #title>表格列分组</template>
                    <u-table-view-column field="class">
                        <template #title>
                            <u-text text="分类"></u-text>
                        </template>
                    </u-table-view-column>
                    <u-table-view-column field="price">
                        <template #title>
                            <u-text text="价格"></u-text>
                        </template>
                    </u-table-view-column>
                </u-table-view-column-group>

            </u-table-view-column-group>


            <u-table-view-column field="place">
                <template #title>
                    <u-text text="产地"></u-text>
                </template>
            </u-table-view-column>
            <u-table-view-column field="code">
                <template #title>
                    <u-text text="物码"></u-text>
                </template>
            </u-table-view-column>
            <u-table-view-column-group thtextalign="right">
                <template #title>表格列分组2</template>
                <u-table-view-column-dynamic thtextalign="right" :dataSource='columnDataSource'
                    v-dependencies.reload="[]" valueField="value">
                    <template #title="current" ref="template_153">
                        <u-text :text="((current || {}).columnItem || {}).text"></u-text>
                    </template>
                    <template #cell="current" ref="template_154"></template>
                </u-table-view-column-dynamic>
            </u-table-view-column-group>
        </u-table-view></div>
</template>
<script>

export default {
    data() {
        return {
            text: 'bbb',
            tableDataSource: [
                // {
                //     id: 0,
                //     name: '苹果',
                //     class: '水果',
                //     price: 5,
                //     place: '山东',
                //     code: '100000',
                // },
                // {
                //     id: 2,
                //     name: '香蕉',
                //     class: '水果',
                //     price: 5,
                //     place: '山东',
                //     code: '100001',
                // },
                // {
                //     id: 3,
                //     name: '苹果',
                //     class: '水果',
                //     price: 5,
                //     place: '山东',
                //     code: '100000',
                // },
                // {
                //     id: 4,
                //     name: '香蕉',
                //     class: '水果',
                //     price: 5,
                //     place: '山东',
                //     code: '100001',
                // },
            ],
            columnDataSource: [{ "text": "动态列1", "value": "ddl1" }, { "text": "动态列2", "value": "ddl2" }],
        };
    },
    methods: {
        onClick() {
            console.log("refs", this.$refs.tableView)
            this.$refs.tableView.exportExcel()
        }
    },
};
</script>