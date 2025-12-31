export const u_uploader = {
  tag: 'div',
  children: [
    {
      tag: 'u-group-attr-panel',
      props: {
        title: '文件上传属性',
      },
      children: [
        {
          tag: 'el-form-item',
          props: {
            label: '按钮名称',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-input',
              field: 'uploader-text-btn',
              group: 'control', // 这个字段的分组是control
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '按钮类型',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-select',
              field: 'uploader-color-btn',
              group: 'control', // 这个字段的分组是control
              props: {
                style: 'width:100%',
              },
              children: [
                {
                  tag: 'el-option',
                  props: {
                    label: '主要按钮',
                    value: 'primary',
                  },
                },
                {
                  tag: 'el-option',
                  props: { label: '次要按钮', value: 'primary_secondary' },
                },
                {
                  tag: 'el-option',
                  props: { label: '普通按钮', value: 'default' },
                },
                {
                  tag: 'el-option',
                  props: { label: '危险按钮', value: 'danger' },
                },
                {
                  tag: 'el-option',
                  props: { label: '次要危险按钮', value: 'danger_secondary' },
                },
              ],
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '文件类型',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-select',
              field: 'uploader-accept',
              group: 'control', // 这个字段的分组是control
              props: {
                style: 'width:100%',
              },
              children: [
                {
                  tag: 'el-option',
                  props: {
                    label: '不限制',
                    value: '',
                  },
                },
                {
                  tag: 'el-option',
                  props: {
                    label: '文档',
                    value: '.doc,.docx',
                  },
                },
                {
                  tag: 'el-option',
                  props: {
                    label: '图片',
                    value: '.jpg,.jpeg,.png,.bmp,.gif,.tiff,.tif,.webp,.svg,.psd,.raw',
                  },
                },
                {
                  tag: 'el-option',
                  props: { label: 'PDF', value: '.pdf' },
                },
                {
                  tag: 'el-option',
                  props: { label: '表格', value: '.xlsx' },
                },
                {
                  tag: 'el-option',
                  props: { label: '文本', value: '.txt' },
                },
                {
                  tag: 'el-option',
                  props: { label: '幻灯片', value: '.ppt,.pptx' },
                },
                {
                  tag: 'el-option',
                  props: { label: '压缩包', value: '.zip' },
                },
                {
                  tag: 'el-option',
                  props: { label: 'csv', value: '.csv' },
                },
              ],
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '最多文件数量',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-input-number',
              props: {
                step: 1,
                min: 1,
                max: 50,
                'controls-position': 'right',
                style: 'width:100%',
              },
              field: 'uploader-limit',
              group: 'control', // 这个字段的分组是control
            },
          ],
        },
        {
          tag: 'el-form-item',
          props: {
            label: '最大文件大小',
            style: 'margin-bottom:15px',
          },
          children: [
            {
              tag: 'el-input-number',
              props: {
                step: 1,
                min: 1,
                max: 50,
                'controls-position': 'right',
                style: 'width:100%',
              },
              field: 'uploader-max-size-pc',
              group: 'control', // 这个字段的分组是control
            },
          ],
        },
      ],
    },
  ],
};
