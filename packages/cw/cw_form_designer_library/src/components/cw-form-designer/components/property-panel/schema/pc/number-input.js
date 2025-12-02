export const u_number_input = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '整数输入属性',
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
            label: '最小值',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-input-number',
              props: {
                step: 1,
                'controls-position': 'right',
                style: 'width:100%',
              },
              field: 'min',
              group: 'control', // 这个字段的分组是control
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '最大值',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-input-number',
              props: {
                step: 1,
                'controls-position': 'right',
                style: 'width:100%',
              },
              field: 'max',
              group: 'control', // 这个字段的分组是control
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '隐藏按钮',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-switch',
              field: 'hideButtons',
              group: 'control', // 这个字段的分组是control
              props: {
                style: 'height: 32px;',
              },
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '后缀单位',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-input',
              field: 'unitValue',
              group: 'control', // 这个字段的分组是control
            },
          ],
        },
      ],
    },
  ],
};
