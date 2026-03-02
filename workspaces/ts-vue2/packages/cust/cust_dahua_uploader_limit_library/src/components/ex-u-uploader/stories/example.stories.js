import Component from '../index';

export default {
  id: 'ex-u-uploader-examples',
  title: '组件列表/ExUUploader/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<ex-u-uploader v-bind="$props"></ex-u-uploader>',
  }),
  args: {
    text: 'Hello world',
  },
};

/**
 * 异步检查图片宽高比的辅助函数
 * @param {File} file - 图片文件
 * @returns {Promise<string|null>} - 如果不符合要求返回错误消息，否则返回null
 */
async function checkImageAspectRatio(file) {
  // 只检查图片类型文件
  if (!file.type || !file.type.startsWith('image/')) {
    return null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const width = img.width;
      const height = img.height;

      // 检查是否为精确的 3:4 比例
      const targetWidth = 3;
      const targetHeight = 4;

      // 计算最大公约数，将宽高比简化为最简形式
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(width, height);
      const simplifiedWidth = width / divisor;
      const simplifiedHeight = height / divisor;

      // 检查是否为精确的 3:4 比例
      const isExactMatch = simplifiedWidth === targetWidth && simplifiedHeight === targetHeight;

      if (!isExactMatch) {
        // 如果不是精确的 3:4（如 301:401），提示错误并阻止上传
        const errorMessage = `图片 "${file.name}" 的宽高比为 ${width}:${height}，不符合要求的 3:4 比例，无法上传`;
        resolve(errorMessage);
      } else {
        resolve(null);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      // 图片加载失败，不阻止上传（可能是其他原因）
      resolve(null);
    };

    img.src = url;
  });
}

export const Example2 = {
  name: '图片宽高比校验（3:4）- 事件绑定方式',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    methods: {
      // 使用事件绑定的方式进行图片宽高比校验（回调函数方式）
      async handleCheckFile(event) {
        // 异步检查图片宽高比
        const errorMessage = await checkImageAspectRatio(event.file);
        // 异步操作完成后，通过回调函数将结果传回子组件
        // errorMessage 为字符串表示校验失败，null 或空字符串表示通过
        const callback = event?.callback;
        if (callback && typeof callback === 'function') {
          callback(errorMessage || null);
        }
      },
    },
    template: `<ex-u-uploader 
      v-bind="$props" 
      display="inline"
      url="/upload" 
      urlField="filePath"
      :limit="999"
      :file-icon-switcher="true"
      :download-icon-switcher="true"
      :file-size="true"
      maxSize="50MB"
      converter="json"
      @custom-check-file="handleCheckFile">
      <u-button color="primary" icon="upload">上传</u-button>
      <template #file-list>
        <i-ico style="margin: 0px 8px 0px 0px;" flag="file-icon" name="file-default" icotype="only"></i-ico>
        <u-text style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;" flag="file-name" text="文件名称"></u-text>
        <u-text style="margin: 0px 8px 0px 0px;" flag="file-size" text="文件大小"></u-text>
        <i-ico style="margin: 0px 8px 0px 0px;" flag="download-icon" name="download" icotype="only"></i-ico>
      </template>
    </ex-u-uploader>`,
  }),
  args: {
    accept: 'image/*',
    listType: 'image',
    multiple: true,
  },
};
