export const u_input = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '单行输入属性',
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
            label: '文本类型',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-select',
              field: 'type',
              group: 'control', // 这个字段的分组是control
              props: {
                style: 'width:100%',
                placeholder: '请选择',
              },
              children: [
                {
                  tag: 'el-option',
                  props: {
                    key: 'text',
                    label: '文本',
                    value: 'text',
                  },
                },
                {
                  tag: 'el-option',
                  props: {
                    key: 'password',
                    label: '密码',
                    value: 'password',
                  },
                },
              ],
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
