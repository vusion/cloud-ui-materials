<template>
  <ex-u-table-view
    :ref="`tableView_1`"
    :dataSource="dataSource"
    :valueField="`entity1.id`"
    :pagination="true"
    :showSizer="true"
    :pageSize="20"
    :pageNumber="1"
    :footerCalcShow="true"
    key="tableView_1"
    footerCalcType="count"
    :footerCalcDeDuplicate="true"
  >
    <ex-u-table-view-column :ref="`table_view_column_1`" :key="`table_view_column_1`" :type="`index`" :width="60">
      <template #title :ref="`template_3`">
        <u-text :ref="`text_3`" :text="`序号`"></u-text>
      </template>
      <template #expander="current" :ref="`template_4`">
        <ex-u-table-view-expander :ref="`table_view_expander_1_${(current || {}).__nodeKey || (current || {}).index}`"></ex-u-table-view-expander>
      </template>
      <template #cell="current" :ref="`template_30`"></template>
      <template #editcell="current" :ref="`template_31`"></template>
      <template #expand-content="current" :ref="`template_32`"></template>
    </ex-u-table-view-column>
    <ex-u-table-view-column :ref="`table_view_column_4`" :key="`table_view_column_4`" :field="`entity1.property1`">
      <template #title :ref="`template_11`">
        <u-text :ref="`text_8`" :text="`property1`"></u-text>
      </template>
      <template #cell="current" :ref="`template_12`">
        <u-linear-layout :ref="`linear_layout_5_${(current || {}).__nodeKey || (current || {}).index}`" :gap="`small`">
          <u-text
            :ref="`text_9_${(current || {}).__nodeKey || (current || {}).index}`"
            :text="(((current || {}).item || {}).entity1 || {}).property1"
          ></u-text>
        </u-linear-layout>
      </template>
      <template #expander="current" :ref="`template_13`">
        <ex-u-table-view-expander :ref="`table_view_expander_4_${(current || {}).__nodeKey || (current || {}).index}`"></ex-u-table-view-expander>
      </template>
      <template #editcell="current" :ref="`template_37`"></template>
      <template #expand-content="current" :ref="`template_38`"></template>
    </ex-u-table-view-column>
    <ex-u-table-view-column :ref="`table_view_column_5`" :key="`table_view_column_5`" :field="`entity1.property2`">
      <template #title :ref="`template_14`">
        <u-text :ref="`text_10`" :text="`property2`"></u-text>
      </template>
      <template #cell="current" :ref="`template_15`">
        <u-linear-layout :ref="`linear_layout_6_${(current || {}).__nodeKey || (current || {}).index}`" :gap="`small`">
          <u-text
            :ref="`text_11_${(current || {}).__nodeKey || (current || {}).index}`"
            :text="(((current || {}).item || {}).entity1 || {}).property2"
          ></u-text>
        </u-linear-layout>
      </template>
      <template #expander="current" :ref="`template_16`">
        <ex-u-table-view-expander :ref="`table_view_expander_5_${(current || {}).__nodeKey || (current || {}).index}`"></ex-u-table-view-expander>
      </template>
      <template #editcell="current" :ref="`template_39`"></template>
      <template #expand-content="current" :ref="`template_40`"></template>
    </ex-u-table-view-column>
    <template #loading :ref="`template_26`"></template>
    <template #error :ref="`template_27`"></template>
    <template #empty :ref="`template_28`"></template>
    <template #dragGhost="current" :ref="`template_29`"></template>
  </ex-u-table-view>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [
        {
          entity1: {
            property1: 1,
            property2: 1.0,
          },
        },
        {
          entity1: {
            property1: 2,
            property2: 2.0,
          },
        },
        {
          entity1: {
            property1: 1,
            property2: 2.0,
          },
        },
      ],
    };
  },
};
</script>
