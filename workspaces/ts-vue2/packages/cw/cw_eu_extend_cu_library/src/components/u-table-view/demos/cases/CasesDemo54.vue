<!-- 复现：在「展示列」里隐藏开了自动合并的列后，rowspan 错位到后面的列；多列合并互相干扰 -->
<template>
<u-linear-layout direction="vertical" gap="small">
    <u-text>复现问题：表格开了「自动合并」后，用表格自带的「展示列」面板隐藏某一列，合并（rowspan）会错位到后面的列上。</u-text>
    <u-text>这个 demo 里有两列以上开了自动合并，且合并段故意错开：property4 合并第 2~3 行、property6 合并第 1~2 行、property7 合并第 3~5 行；property1/2/3/5 是不合并的普通列。</u-text>
    <u-text>操作：点表格右上角「展示列」→ 逐个取消勾选 property4 / property6 / property7（也可以一次勾掉两列，或者勾掉普通列 property5）→ 确定，观察下面这行统计和第 4、5 行的单元格。</u-text>
    <u-text>当前表格里被合并的单元格：{{ mergedCellCount }} 个 {{ mergedCellTexts.length ? `（${mergedCellTexts.join('、')}）` : '' }}</u-text>
    <u-table-view :data="data" :default-column-width="110" configurable>
        <u-table-view-column title="property1" field="property1"></u-table-view-column>
        <u-table-view-column title="property2" field="property2"></u-table-view-column>
        <u-table-view-column title="property3" field="property3"></u-table-view-column>
        <u-table-view-column title="property4" field="property4" :auto-row-span="true"></u-table-view-column>
        <u-table-view-column title="property5" field="property5"></u-table-view-column>
        <u-table-view-column title="property6" field="property6" :auto-row-span="true"></u-table-view-column>
        <u-table-view-column title="property7" field="property7" :auto-row-span="true"></u-table-view-column>
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
    <u-text>期望：隐藏某个合并列后，只有它自己的合并消失，其它列的合并位置、合并段、所有数据都不变（尤其后面相邻的列不能被牵连）；隐藏普通列不影响任何合并；全部勾回来后和初始一致。</u-text>
</u-linear-layout>
</template>
<script>
// 贴近用户现场：多列开自动合并，且合并段错开，避免所有列都对齐而掩盖错位问题
// property4：第 2~3 行同值；property6：第 1~2 行同值；property7：第 3~5 行同值
const FIELDS = ['property1', 'property2', 'property3', 'property4', 'property5', 'property6', 'property7'];

export default {
    data() {
        return {
            // 「展示列」面板的选中项，由 u-table-view-column-config 自己改列显隐，这里只用来观察结果
            visibleColumns: FIELDS.slice(),
            mergedCellCount: 0,
            mergedCellTexts: [],
            data: [
                { property1: 'p1-1', property2: 'p2-1', property3: 'p3-1', property4: '12rdd', property5: '12edq1', property6: 'k1', property7: 'z1' },
                { property1: 'p1-2', property2: 'p2-2', property3: 'p3-2', property4: '32131', property5: '12rf123', property6: 'k1', property7: 'z2' },
                { property1: 'p1-3', property2: 'p2-3', property3: 'p3-3', property4: '32131', property5: 'e132', property6: 'k3', property7: 'z3' },
                { property1: 'p1-4', property2: 'p2-4', property3: 'p3-4', property4: 'p4-4', property5: '1e22e21', property6: 'k4', property7: 'z3' },
                { property1: 'p1-5', property2: 'p2-5', property3: 'p3-5', property4: 'p4-5', property5: 'e12e', property6: 'k5', property7: 'z3' },
            ],
        };
    },
    watch: {
        visibleColumns() {
            this.$nextTick(this.countMergedCells);
        },
    },
    mounted() {
        // 表格首次渲染和合并计算都在挂载这一轮里完成，等两轮 tick 后再统计
        this.$nextTick(() => this.$nextTick(this.countMergedCells));
    },
    methods: {
        onSelectColumns(event) {
            // 面板点「确定」后触发，显隐由 u-table-view-column-config 自己处理
            console.log('展示列确定：', event.value);
        },
        // 统计页面上带 rowspan 的单元格，方便直接确认「合并没有迁移到别的列」
        countMergedCells() {
            const cells = this.$el ? Array.from(this.$el.querySelectorAll('tbody td[rowspan]')) : [];
            this.mergedCellCount = cells.length;
            this.mergedCellTexts = cells.map((td) => `${td.textContent.trim()}(跨${td.getAttribute('rowspan')}行)`);
        },
    },
};
</script>