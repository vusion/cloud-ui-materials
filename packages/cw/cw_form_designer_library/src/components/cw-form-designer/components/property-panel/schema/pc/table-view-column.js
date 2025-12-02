export const u_table_view_column = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '表单列属性',
      },
      children: [
        {
          tag: 's-title',
          field: 'label',
          group: 'table-view-column', // 这个字段的分组是table-view-column
        },
        {
          tag: 'el-form-item',
          props: {
            label: '状态',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 's-group-btn',
              field: 'hideField',
              group: 'form-item', // 这个字段的分组是form-item
              props: {
                dataSource: [
                  { label: '显示', value: false },
                  { label: '隐藏', value: true },
                ],
              },
            },
          ],
        },
        {
          tag: 's-rules', // 校验规则
          props: {
            group: 'table-view-column', // 这个字段的分组是table-view-column
          },
        },
      ],
    },
  ],
};
