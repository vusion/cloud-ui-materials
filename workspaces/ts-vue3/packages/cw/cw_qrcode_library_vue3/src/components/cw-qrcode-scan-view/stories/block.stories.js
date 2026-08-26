import Component from '../index';

export default {
  id: 'cw-qrcode-scan-view-blocks',
  title: 'cw-qrcode-scan-view-blocks',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    components: {
      'cw-qrcode-scan-view': Component,
    },
    template: '<cw-qrcode-scan-view></cw-qrcode-scan-view>',
  }),
};
