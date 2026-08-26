import { onUnmounted } from 'vue';
import Component from '../index';

export default {
  id: 'cw-qrcode-scan-view-examples',
  title: 'cw-qrcode-scan-view-examples',
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

export const Designer = {
  name: '设计器模式',
  render: () => ({
    components: {
      'cw-qrcode-scan-view': Component,
    },
    setup() {
      const targetWindow = window;
      const previousEnv = targetWindow.$uilibenv;
      targetWindow.$uilibenv = { ...(previousEnv || {}), IDE_DESIGNER: true };
      onUnmounted(() => {
        if (previousEnv === undefined) {
          delete targetWindow.$uilibenv;
        } else {
          targetWindow.$uilibenv = previousEnv;
        }
      });
    },
    template: '<cw-qrcode-scan-view></cw-qrcode-scan-view>',
  }),
};

