<!-- 复现：数据里手写 rowSpan 配置（不是列属性的 auto-row-span）时，隐藏列后合并错位 -->
<template>
<u-linear-layout direction="vertical" gap="small">
    <u-text>复现问题：数据里手写的合并配置 <code>item.rowSpan = [[列下标, 跨行数]]</code>（注意不是列属性的「自动合并相同数据」），列下标按<b>列配置里的原始顺序</b>解释；用「展示列」隐藏列后，合并不该迁移到别的列上。</u-text>
    <u-text>这个 demo 的两条配置：property3（第 3 列，下标 2）合并第 1~2 行；property4（第 4 列，下标 3）合并第 3~4 行。</u-text>
    <u-text>操作：点表格右上角「展示列」→ 取消勾选 property3 / property4（或先取消勾选它们前面的 property1）→ 确定，观察下面这行统计。</u-text>
    <u-text>当前表格里被合并的单元格（数据级 rowSpan）：{{ mergedCellCount }} 个 {{ mergedCellTexts.length ? `（${mergedCellTexts.join('、')}）` : '' }}</u-text>
    <u-table-view ref="tableview" :data="data" :default-column-width="120" configurable>
        <u-table-view-column title="property1" field="property1"></u-table-view-column>
        <u-table-view-column title="property2" field="property2"></u-table-view-column>
        <u-table-view-column title="property3" field="property3"></u-table-view-column>
        <u-table-view-column title="property4" field="property4"></u-table-view-column>
        <u-table-view-column title="property5" field="property5"></u-table-view-column>
        <template #config-columns>
            <u-table-view-column-config
                :value.sync="visibleColumns"
                @select="onSelectColumns">
                <template #title>
                    <i-ico name="setting"></i-ico>
                    <u-text>展示列</u-text>
                </template>
            </u-table-view-column-config>
        </template>
    </u-table-view>
    <u-text>期望：隐藏 property1（在两条配置列之前）时两条合并位置都不变；隐藏 property3 只有它自己的合并不生效、property4 的合并还在；全部勾回来后和初始一致；整个过程不能有数据丢失。</u-text>
</u-linear-layout>
</template>
<script>
const FIELDS = ['property1', 'property2', 'property3', 'property4', 'property5'];

export default {
    data() {
        return {
            // 「展示列」面板的选中项，由 u-table-view-column-config 自己改列显隐，这里只用来观察结果
            visibleColumns: FIELDS.slice(),
            mergedCellCount: 0,
            mergedCellTexts: [],
            data: [
                // rowSpan: [[列下标, 跨行数]]，下标按列的原始顺序：property3 是第 3 列（下标 2）
                { property1: 'p1-1', property2: 'p2-1', property3: 'p3-1', property4: 'p4-1', property5: 'p5-1', rowSpan: [[2, 2]] },
                { property1: 'p1-2', property2: 'p2-2', property3: 'p3-1', property4: 'p4-2', property5: 'p5-2' },
                // property4 是第 4 列（下标 3），合并第 3~4 行
                { property1: 'p1-3', property2: 'p2-3', property3: 'p3-3', property4: 'p4-3', property5: 'p5-3', rowSpan: [[3, 2]] },
                { property1: 'p1-4', property2: 'p2-4', property3: 'p3-4', property4: 'p4-3', property5: 'p5-4' },
                { property1: 'p1-5', property2: 'p2-5', property3: 'p3-5', property4: 'p4-5', property5: 'p5-5' },
            ],
        };
    },
    watch: {
        visibleColumns() {
            this.$nextTick(this.countMergedCells);
        },
    },
    mounted() {
        // 表格首次渲染完成后统计（合并是在渲染时按配置算出来的）
        this.$nextTick(() => this.$nextTick(this.countMergedCells));
    },
    methods: {
        onSelectColumns(event) {
            // 面板点「确定」后触发，显隐由 u-table-view-column-config 自己处理
            console.log('展示列确定：', event.value);
        },
        // 统计页面上带 rowspan 的单元格，方便直接确认「合并没有迁移到别的列」
        countMergedCells() {
            const root = this.$refs.tableview && this.$refs.tableview.$el;
            const cells = root ? Array.from(root.querySelectorAll('tbody td[rowspan]')) : [];
            this.mergedCellCount = cells.length;
            this.mergedCellTexts = cells.map((td) => `${td.textContent.trim()}(跨${td.getAttribute('rowspan')}行)`);
        },
    },
};
</script>