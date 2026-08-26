import Component from '../index';

export default {
  id: 'large-file-split-uploader-blocks',
  title: '组件列表/LargeFileSplitUploader/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '单个文件按钮',
  render: () => ({
    template: `
      <large-file-split-uploader
        display="inline"
        url="/upload"
        url-field="filePath"
        converter="json"
      >
        <el-button flag="large-file-uploader-button" type="primary">上传</el-button>
      </large-file-split-uploader>
    `,
  }),
};
