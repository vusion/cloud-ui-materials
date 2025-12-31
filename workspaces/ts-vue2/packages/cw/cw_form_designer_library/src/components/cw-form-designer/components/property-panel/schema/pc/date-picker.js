export const u_date_picker = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '日期选择属性',
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
            label: '日期类型',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-select',
              field: 'picker',
              group: 'control', // 这个字段的分组是control
              props: {
                style: 'width:100%',
              },
              children: [
                {
                  tag: 'el-option',
                  props: {
                    label: '日期',
                    value: 'date',
                  },
                },
                {
                  tag: 'el-option',
                  props: {
                    label: '周',
                    value: 'week',
                  },
                },
                {
                  tag: 'el-option',
                  props: {
                    label: '月份',
                    value: 'month',
                  },
                },
                {
                  tag: 'el-option',
                  props: {
                    label: '季度',
                    value: 'quarter',
                  },
                },
                {
                  tag: 'el-option',
                  props: {
                    label: '年份',
                    value: 'year',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
