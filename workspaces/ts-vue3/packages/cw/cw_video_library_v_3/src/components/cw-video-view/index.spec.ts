import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CwVideoView from './index.vue';
import videojs from 'video.js';

// Mock video.js
vi.mock('video.js', () => {
  const player = {
    on: vi.fn(),
    off: vi.fn(),
    ready: vi.fn((cb) => cb.call(player)),
    dispose: vi.fn(),
    src: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    currentTime: vi.fn(() => 0),
    duration: vi.fn(() => 100),
    remainingTime: vi.fn(() => 100),
    load: vi.fn(),
    controlBar: {
      progressControl: {
        enable: vi.fn(),
        disable: vi.fn(),
      },
      playbackRateMenuButton: {
        show: vi.fn(),
        hide: vi.fn(),
      },
      getChild: vi.fn(() => ({
        off: vi.fn(),
        on: vi.fn(),
      })),
    },
  };
  const vjs = vi.fn((el, options, cb) => {
    if (typeof options === 'function') {
      options.call(player);
    } else if (typeof cb === 'function') {
      cb.call(player);
    }
    return player;
  });
  (vjs as any).addLanguage = vi.fn();
  return {
    default: vjs,
  };
});

describe('CwVideoView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear sessionStorage
    sessionStorage.clear();
  });

  it('应该正确渲染视频容器和 video 标签', () => {
    const wrapper = mount(CwVideoView, {
      props: {
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
      },
    });
    expect(wrapper.find('video').exists()).toBe(true);
    expect(wrapper.find('.video-js').exists()).toBe(true);
  });

  it('应该正确应用宽度和高度 props', () => {
    const wrapper = mount(CwVideoView, {
      props: {
        width: '800px',
        height: 600,
      },
    });
    const root = wrapper.element as HTMLElement;
    expect(root.style.width).toBe('800px');
    expect(root.style.height).toBe('600px');
  });

  it('应该在挂载时初始化 video.js', () => {
    mount(CwVideoView, {
      props: {
        src: 'test.mp4',
        autoplay: true,
      },
    });
    expect(videojs).toHaveBeenCalled();
  });

  it('应该暴露 play 和 pause 方法', async () => {
    const wrapper = mount(CwVideoView);
    const vm = wrapper.vm as any;
    expect(typeof vm.play).toBe('function');
    expect(typeof vm.pause).toBe('function');
    
    vm.play();
    const player = (videojs as any).mock.results[0].value;
    expect(player.play).toHaveBeenCalled();
  });

  it('监听 draggable 属性变化并更新播放器控制栏', async () => {
    const wrapper = mount(CwVideoView, {
      props: {
        draggable: true
      }
    });
    const player = (videojs as any).mock.results[0].value;
    
    await wrapper.setProps({ draggable: false });
    expect(player.controlBar.progressControl.disable).toHaveBeenCalled();
    
    await wrapper.setProps({ draggable: true });
    expect(player.controlBar.progressControl.enable).toHaveBeenCalled();
  });

  it('应该根据 src 属性更新播放器源', async () => {
    const wrapper = mount(CwVideoView, {
      props: {
        src: 'old.mp4'
      }
    });
    const player = (videojs as any).mock.results[0].value;
    
    await wrapper.setProps({ src: 'new.mp4' });
    expect(player.src).toHaveBeenCalledWith([
      { src: 'new.mp4', type: 'video/mp4' }
    ]);
  });
});
