export const u_form = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '表单属性',
      },
      children: [
        {
          tag: 'el-form-item',
          props: {
            label: '列数',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 's-group-btn',
              field: 'repeat',
              group: 'form', // 这个字段的分组是form
              props: {
                dataSource: [
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                  { label: '4', value: 4 },
                ],
              },
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '标题布局',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 's-group-btn',
              field: 'labelLayout',
              group: 'form', // 这个字段的分组是form
              props: {
                dataSource: [
                  { label: '水平', value: 'inline' },
                  { label: '垂直', value: 'block' },
                ],
              },
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '标题宽度',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 's-group-btn',
              field: 'labelSize',
              group: 'form', // 这个字段的分组是form
              props: {
                dataSource: [
                  { label: '小', value: 'small' },
                  { label: '正常', value: 'normal' },
                  { label: '大', value: 'large' },
                ],
              },
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '标签过长省略',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-switch',
              field: 'labelEllipsis',
              group: 'form', // 这个字段的分组是form
              props: {
                style: 'height: 32px;',
              },
            },
          ],
        },
      ],
    },
  ],
};
