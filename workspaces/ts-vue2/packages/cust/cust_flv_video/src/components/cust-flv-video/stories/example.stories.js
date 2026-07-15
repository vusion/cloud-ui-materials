import Component from '../index';

// 公开可用的 FLV 点播测试地址
const FLV_VOD_DEMO =
  'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv';

export default {
  id: 'cust-flv-video-examples',
  title: '组件列表/CustFlvVideo/示例',
  component: Component,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FLV 播放器组件，基于 flv.js 实现 HTTP-FLV 流播放。

\`\`\`html
<cust-flv-video
  src="https://example.com/live/stream.flv"
  :is-live="true"
  :autoplay="true"
  :muted="true"
  :controls="true"
  @play="onPlay"
  @error="onError"
/>
\`\`\`

- 点播文件：\`isLive\` 设为 \`false\`
- 直播流：\`isLive\` 设为 \`true\`，并填入 HTTP-FLV 地址
- 自动播放：建议同时开启 \`muted\`，以兼容浏览器策略
        `.trim(),
      },
    },
  },
  argTypes: {
    src: { control: 'text', description: 'FLV 视频地址' },
    isLive: { control: 'boolean', description: '是否为直播流' },
    autoplay: { control: 'boolean', description: '是否自动播放' },
    muted: { control: 'boolean', description: '是否静音' },
    controls: { control: 'boolean', description: '是否显示控制条' },
    poster: { control: 'text', description: '封面图地址' },
    loop: { control: 'boolean', description: '是否循环播放' },
  },
};

const renderPlayer = (methods = {}) => (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div style="width: 800px; height: 450px;">
    <cust-flv-video
      v-bind="$props"
      @play="onPlay"
      @pause="onPause"
      @loaded="onLoaded"
      @error="onError"
    />
  </div>`,
  methods: {
    onPlay() {
      console.log('[cust-flv-video] play');
      methods.onPlay && methods.onPlay();
    },
    onPause() {
      console.log('[cust-flv-video] pause');
      methods.onPause && methods.onPause();
    },
    onLoaded() {
      console.log('[cust-flv-video] loaded');
      methods.onLoaded && methods.onLoaded();
    },
    onError(e) {
      console.error('[cust-flv-video] error', e);
      methods.onError && methods.onError(e);
    },
  },
});

/** 可直接播放的 FLV 点播示例 */
export const VodExample = {
  name: 'FLV 点播',
  render: renderPlayer(),
  args: {
    src: FLV_VOD_DEMO,
    isLive: false,
    autoplay: false,
    muted: false,
    controls: true,
    loop: false,
  },
};

/** 自动播放示例（静音） */
export const AutoplayExample = {
  name: '自动播放（静音）',
  render: renderPlayer(),
  args: {
    src: FLV_VOD_DEMO,
    isLive: false,
    autoplay: true,
    muted: true,
    controls: true,
  },
};

const FLV_LIVE_DEMO =
  'http://124.129.136.6:1891/live/720P/37020000161320153152.flv';

/** SRS 监控直播流示例（纯视频、无音频） */
export const LiveExample = {
  name: 'FLV 直播',
  render: renderPlayer(),
  args: {
    src: FLV_LIVE_DEMO,
    isLive: true,
    autoplay: true,
    muted: true,
    controls: true,
    autoDetectMedia: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '监控类直播流通常只有视频轨道、没有音频。请保持 `isLive: true` 和 `autoDetectMedia: true`。',
      },
    },
  },
};
