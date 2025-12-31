export const u_region_select = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '地区选择属性',
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
            label: '筛选',
            'label-width': '230px',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-switch',
              field: 'region-filterable',
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
            label: '可清空',
            'label-width': '230px',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-switch',
              field: 'region-clearable',
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
            label: '只显示最后一项',
            'label-width': '230px',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-switch',
              field: 'region-show-final-valuee',
              group: 'control', // 这个字段的分组是control
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
