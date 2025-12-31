export const u_textarea = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '多行输入属性',
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
        {
          tag: 'el-form-item',
          props: {
            label: '最大字符数',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-input-number',
              props: {
                step: 1,
                'controls-position': 'right',
                style: 'width:100%',
                precision: 0,
                min: 0,
                placeholder: '不限制',
              },
              field: 'maxlength',
              group: 'control', // 这个字段的分组是control
            },
          ],
        },
      ],
    },
  ],
};
