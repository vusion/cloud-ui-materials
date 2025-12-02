export const u_date_time_picker = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '日期时间选择属性',
      },
      children: [
        {
          tag: 'el-form-item',
          props: {
            label: '占位提示',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-input',
              field: 'placeholder',
              group: 'control', // 这个字段的分组是control
            },
          ],
        },
      ],
    },
  ],
};
