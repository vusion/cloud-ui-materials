import { flushPromises, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Component from '../index.vue';

const { FakeHtml5Qrcode } = vi.hoisted(() => {
  class FakeHtml5Qrcode {
    static instances: FakeHtml5Qrcode[] = [];
    static cameras: unknown[] = [];
    static getCameras = vi.fn(async () => FakeHtml5Qrcode.cameras);

    start = vi.fn(() => Promise.resolve());
    stop = vi.fn(() => Promise.resolve());
    clear = vi.fn();

    constructor(public elementId: string) {
      FakeHtml5Qrcode.instances.push(this);
    }
  }

  return { FakeHtml5Qrcode };
});

vi.mock('html5-qrcode', () => ({
  Html5Qrcode: FakeHtml5Qrcode,
}));

function mountComponent(designer = false) {
  return mount(Component, {
    global: {
      plugins: [
        {
          install(app) {
            app.config.globalProperties.$env = { VUE_APP_DESIGNER: designer };
          },
        },
      ],
    },
  });
}

describe('cw-qrcode-scan-view', () => {
  beforeEach(() => {
    FakeHtml5Qrcode.instances = [];
    FakeHtml5Qrcode.cameras = [];
    FakeHtml5Qrcode.getCameras.mockReset().mockImplementation(async () => FakeHtml5Qrcode.cameras);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders reader and render containers outside designer mode', () => {
    const wrapper = mountComponent();

    expect(wrapper.find('#reader').exists()).toBe(true);
    expect(wrapper.text()).toContain('');
    expect(wrapper.findAll('div').length).toBeGreaterThanOrEqual(2);
  });

  it('renders designer placeholder without initializing a camera', async () => {
    const wrapper = mountComponent(true);

    await nextTick();

    expect(wrapper.find('#reader').exists()).toBe(false);
    expect(wrapper.text()).toContain('二维码扫码组件');
    expect(FakeHtml5Qrcode.getCameras).not.toHaveBeenCalled();
  });

  it('keeps loading while cameras are pending and creates no instance for an empty device list', async () => {
    let resolveCameras: (devices: unknown[]) => void = () => {};
    FakeHtml5Qrcode.getCameras.mockReturnValue(
      new Promise<unknown[]>((resolve) => {
        resolveCameras = resolve;
      }),
    );
    const wrapper = mountComponent();

    expect((wrapper.vm as unknown as { loading: boolean }).loading).toBe(true);
    resolveCameras([]);
    await flushPromises();

    expect(FakeHtml5Qrcode.instances).toHaveLength(0);
    expect((wrapper.vm as unknown as { loading: boolean }).loading).toBe(true);
  });

  it('creates a reader instance and starts scanning when cameras exist', async () => {
    FakeHtml5Qrcode.cameras = [{ id: 'camera' }];
    mountComponent();
    await flushPromises();

    expect(FakeHtml5Qrcode.instances).toHaveLength(1);
    expect(FakeHtml5Qrcode.instances[0].elementId).toBe('reader');
    expect(FakeHtml5Qrcode.instances[0].start).toHaveBeenCalledTimes(1);
    expect(FakeHtml5Qrcode.instances[0].start).toHaveBeenCalledWith(
      { facingMode: 'environment' },
      expect.objectContaining({
        fps: 30,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.777778,
        experimentalFeatures: { useBarCodeDetectorIfSupported: true },
        videoConstraints: {
          facingMode: 'environment',
          focusMode: 'continuous',
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
        },
      }),
      expect.any(Function),
    );
  });

  it('emits the platform scan event and stops then clears after decoding', async () => {
    FakeHtml5Qrcode.cameras = [{ id: 'camera' }];
    const onScan = vi.fn();
    const wrapper = mount(Component, {
      props: { onScan },
      global: {
        plugins: [
          {
            install(app) {
              app.config.globalProperties.$env = { VUE_APP_DESIGNER: false };
            },
          },
        ],
      },
    });
    await flushPromises();
    const instance = FakeHtml5Qrcode.instances[0];
    const decodedCallback = instance.start.mock.calls[0][2];

    decodedCallback('decoded-text', { decodedText: 'decoded-text' });
    await flushPromises();

    expect(onScan).toHaveBeenCalledWith('decoded-text');
    expect(wrapper.emitted('scan')).toEqual([['decoded-text']]);
    expect(wrapper.emitted('onScan')).toBeUndefined();
    expect(instance.stop).toHaveBeenCalledTimes(1);
    expect(instance.clear).toHaveBeenCalledTimes(1);
  });

  it('stores camera errors and resets loading after rejection', async () => {
    const cameraError = new Error('camera denied');
    FakeHtml5Qrcode.getCameras.mockRejectedValue(cameraError);
    const wrapper = mountComponent();
    await flushPromises();

    expect((wrapper.vm as unknown as { message: unknown }).message).toBe(cameraError);
    expect((wrapper.vm as unknown as { loading: boolean }).loading).toBe(false);
  });

  it('alerts and logs scanning failures for object errors', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const scanningError = new Error('start failed');
    FakeHtml5Qrcode.cameras = [{ id: 'camera' }];
    const wrapper = mountComponent(true);
    await (wrapper.vm as unknown as { getCameras: () => Promise<void> }).getCameras();
    await flushPromises();

    FakeHtml5Qrcode.instances[0].start.mockRejectedValue(scanningError);
    await (wrapper.vm as unknown as { start: () => void }).start();
    await flushPromises();

    expect(alertSpy).toHaveBeenCalledTimes(2);
    expect(alertSpy).toHaveBeenNthCalledWith(1, scanningError);
    expect(alertSpy).toHaveBeenNthCalledWith(2, scanningError);
    expect(logSpy).toHaveBeenCalledWith('扫码错误信息', scanningError);
  });

  it('stops on unmount and clears after 500 milliseconds', async () => {
    vi.useFakeTimers();
    FakeHtml5Qrcode.cameras = [{ id: 'camera' }];
    const wrapper = mountComponent();
    await flushPromises();
    const instance = FakeHtml5Qrcode.instances[0];

    wrapper.unmount();
    expect(instance.stop).toHaveBeenCalledTimes(1);
    expect(instance.clear).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(500);
    expect(instance.clear).toHaveBeenCalledTimes(1);
  });

  it('only exposes start and getCameras', () => {
    const wrapper = mountComponent(true);

    expect(Object.keys(wrapper.vm.$.exposed || {})).toEqual(['start', 'getCameras']);
  });
});







