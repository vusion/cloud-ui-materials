<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut animate__fast"
    @after-enter="onTransitionAterEnter"
  >
    <div
      ref="root"
      :class="$style.root"
      v-if="currentVisible || animationVisible"
      :placement="placement"
      @click="maskClosable ? !hideMask && cancel() : targetCancel('mask')"
      tabindex="1"
      @keydown.esc="targetCancel('esc') && cancel()"
      :hideMask="hideMask"
    >
      <transition
        :enter-active-class="'placement animate__animated animate__fadeIn' + animatePlacement"
        :leave-active-class="'placement animate__animated animate__fast animate__fadeOut' + animatePlacement"
      >
        <div
          :class="$style.drawer"
          :style="drawerWidthBind"
          v-if="currentVisible && animationVisible"
          :size="size"
          v-bind="$attrs"
          v-on="$listeners"
          @click.stop
        >
          <slot name="inject"></slot>
          <slot name="drawer">
            <div :class="$style.head" v-show="showHead" vusion-slot-name="head" :child-cut-disabled="true" ref="head">
              <slot name="head">
                <div
                  v-if="((title || $slots.title) && !isTitleSlotEmpty) || $env.VUE_APP_DESIGNER"
                  :class="$style.title"
                  vusion-slot-name="title"
                  vusion-slot-name-edit="title"
                  :child-cut-disabled="true"
                >
                  <slot name="title">
                    <s-empty v-if="!$slots.title && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty>
                    <template v-else>
                      {{ title }}
                    </template>
                  </slot>
                </div>
                <a :class="$style.close" @click="cancel()"></a>
              </slot>
            </div>
            <div :class="$style.body" vusion-slot-name="body" :child-cut-disabled="true" :style="{ height: bodyHeight }">
              <slot name="body">
                <s-empty v-if="!$slots.body && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty>
                <template v-else>
                  {{ content }}
                </template>
              </slot>
            </div>

            <div
              :class="$style.foot"
              v-show="showFoot && (okButton || cancelButton) && (!isFootSlotEmpty || $env.VUE_APP_DESIGNER)"
              vusion-slot-name="foot"
              :child-cut-disabled="true"
              ref="foot"
            >
              <slot name="foot">
                <s-empty v-if="!$slots.foot && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty>
                <u-linear-layout gap="small" v-else>
                  <u-button :class="$style.button" v-if="okButton" color="primary" @click="ok()">
                    {{ okButton }}
                  </u-button>
                  <u-button :class="$style.button" v-if="cancelButton" @click="cancel()">
                    {{ cancelButton }}
                  </u-button>
                </u-linear-layout>
              </slot>
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import UModal from '@lcap-ui/src/components/u-modal.vue/index.vue';
import SEmpty from '@lcap-ui/src/components/s-empty.vue';
export default {
  name: 'u-drawer',
  extends: UModal,
  Component: {
    SEmpty,
    UModal,
  },
  props: {
    placement: {
      type: String,
      default: 'right',
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    showFoot: {
      type: Boolean,
      default: true,
    },
    showHead: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'normal',
    },
    drawerWidth: {
      type: Number,
    },
    hideMask: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      animationVisible: this.visible,
      bodyHeight: undefined,
    };
  },
  computed: {
    animatePlacement() {
      return this.placement.replace(/^[a-z]/, (m) => m.toUpperCase());
    },
    drawerWidthBind() {
      if (this.drawerWidth) {
        return { width: this.drawerWidth + 'px' };
      }
      return;
    },
  },
  watch: {
    // @TODO: 为了让两个动画错开的临时解决方案
    currentVisible(currentVisible) {
      if (currentVisible && !this.$env.VUE_APP_DESIGNER) {
        // 通过方法改变visible 不需要重复触发事件
        if (this._openByMethod) {
          this._openByMethod = false;
        } else {
          this.$parent.openEvent();
        }
      }
      this.$nextTick(() => (this.animationVisible = currentVisible));
    },
  },
  methods: {
    targetCancel(type) {
      console.log('target', type);
      if (type === 'esc') {
        this.$emit('esc');
      }
      if (type === 'mask') {
        this.$emit('mask');
      }
    },
    onTransitionAterEnter() {
      this.$emit('opened');
      const headEl = this.$refs.head;
      const footEl = this.$refs.foot;
      this.$nextTick(() => this.onEnableDrag());
      if (!headEl && !footEl) return;
      if (this.placement === 'right' || this.placement === 'left') {
        const height = headEl.offsetHeight + footEl.offsetHeight;
        this.bodyHeight = `calc(100% - ${height}px)`;
      } else this.bodyHeight = undefined;
    },
    onEnableDrag() {
      var drawer = this.$el.querySelector("[class^='yunshang-u-drawer_drawer___']");
      // 创建拖拽手柄
      var handle = document.createElement('div');
      handle.style.position = 'absolute';
      handle.style.left = '0';
      handle.style.top = '0';
      handle.style.bottom = '0';
      handle.style.width = '10px'; // 手柄宽度，可根据需要调整
      handle.style.cursor = 'ew-resize';
      // 可拖拽图标样式，这里用半透明背景示意，实际可换成图标
      handle.style.background = 'rgba(0, 0, 0, 0.1)';
      handle.style.display = 'none'; // 初始隐藏

      // 确保目标元素有定位属性
      if (getComputedStyle(drawer).position === 'static') {
        drawer.style.position = 'relative';
      }
      drawer.appendChild(handle);

      // 当鼠标在 drawer 内移动时，根据离左侧距离显示或隐藏手柄
      drawer.addEventListener('mousemove', function (e) {
        var rect = drawer.getBoundingClientRect();
        // 定义手柄显示的触发范围（例如 20px 内）
        var threshold = 10;
        if (e.clientX - rect.left <= threshold) {
          handle.style.display = 'block';
        } else if (!isDragging) {
          handle.style.display = 'none';
        }
      });

      // 鼠标离开 drawer 时隐藏（除非处于拖拽状态）
      drawer.addEventListener('mouseleave', function () {
        if (!isDragging) {
          handle.style.display = 'none';
        }
      });

      var isDragging = false;
      var startX, startWidth;

      // 按下鼠标开始拖拽
      handle.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX;
        // 获取初始宽度
        startWidth = drawer.getBoundingClientRect().width;
        // 禁用选中文本
        e.preventDefault();
        document.body.style.userSelect = 'none';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      // 拖拽时改变宽度
      function onMouseMove(e) {
        if (!isDragging) return;
        // 计算宽度变化：向左拖动（e.clientX 较小）则宽度增大，向右拖动则宽度减小
        var newWidth = startWidth + (startX - e.clientX);
        // 设置最小宽度
        if (newWidth < 100) newWidth = 100;
        drawer.style.width = newWidth + 'px';
      }

      // 结束拖拽
      function onMouseUp(e) {
        if (isDragging) {
          isDragging = false;
          document.body.style.userSelect = '';
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
      }
    },
  },
};
</script>
<style module>
.root {
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  width: unset !important;
  height: unset !important;
  z-index: var(--z-index-modal);
  -webkit-overflow-scrolling: touch;
  touch-action: cross-slide-y pinch-zoom double-tap-zoom;
  overflow: hidden;
  overflow-y: auto;
  background: var(--drawer-wrap-background);
}

.root::after {
  content: '';
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}

.root:focus {
  outline: var(--focus-outline);
}

.drawer {
  float: left;
  width: var(--drawer-width);
  height: 100%;
  background: var(--drawer-background);
  border-radius: var(--drawer-border-radius);
}

.root[placement='right'] .drawer {
  float: right;
}

.root[placement='right'] > .drawer[size='small'],
.root[placement='left'] > .drawer[size='small'] {
  width: var(--drawer-width-small);
}

.root[placement='right'] > .drawer[size='normal'],
.root[placement='left'] > .drawer[size='normal'] {
  width: var(--drawer-width);
}

.root[placement='right'] > .drawer[size='large'],
.root[placement='left'] > .drawer[size='large'] {
  width: var(--drawer-width-large);
}

.root[placement='right'] > .drawer[size='auto'],
.root[placement='left'] > .drawer[size='auto'] {
  width: auto;
}

.head {
  position: relative;
  padding: var(--drawer-head-padding);
  border-bottom: 1px solid var(--drawer-border-color);
}

.title {
  margin: 0;
  font-size: var(--font-size-base);
}

.close {
  position: absolute;
  right: 15px;
  top: 15px;
  color: var(--drawer-close-color);
}

.close::before {
  content: '\e668';
  font-family: 'lcap-ui-icons';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-decoration: inherit;
  text-rendering: optimizeLegibility;
  text-transform: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  font-size: var(--drawer-close-size);
  line-height: 0.8;
}

.close:hover {
  color: var(--drawer-close-color-hover);
}

.body {
  padding: var(--drawer-body-padding);
  overflow-y: var(--drawer-body-overflow-y);
  height: calc(100% - 140px);
}

.foot {
  position: fixed;
  width: inherit;
  padding: var(--drawer-foot-padding);
  border-top: 1px solid var(--drawer-border-color);
  bottom: 0;
}

.root[static] {
  position: static;
  padding: var(--drawer-static-padding);
}

.root[hidemask] {
  background: transparent;
  left: initial;
}
.root[hidemask] .drawer {
  border-left: 1px solid var(--drawer-border-color);
}

.root[placement='top'] > .drawer,
.root[placement='bottom'] > .drawer {
  float: initial;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
}

.root[placement='top'] > .drawer {
  top: 0;
}
.root[placement='bottom'] > .drawer {
  bottom: 0;
}

.root[placement='top'] > .drawer > .body,
.root[placement='bottom'] > .drawer > .body {
  flex: 1;
  height: var(--drawer-height);
}
.root[placement='top'] > .drawer > .foot,
.root[placement='bottom'] > .drawer > .foot {
  position: static;
}

.root[placement='top'] > .drawer[size='small'],
.root[placement='bottom'] > .drawer[size='small'] {
  height: var(--drawer-height-small);
}

.root[placement='top'] > .drawer[size='normal'],
.root[placement='bottom'] > .drawer[size='normal'] {
  height: var(--drawer-height);
}

.root[placement='top'] > .drawer[size='large'],
.root[placement='bottom'] > .drawer[size='large'] {
  height: var(--drawer-height-large);
}

.root[placement='top'] > .drawer[size='auto'],
.root[placement='bottom'] > .drawer[size='auto'] {
  height: auto;
  max-height: var(--drawer-max-height);
}
</style>
<style>
[class^='yunshang-u-drawer_close___'] {
  left: 15px !important;
  top: 19px !important;
}
[class^='yunshang-u-drawer_close___']::before {
  font-size: 16px !important;
  color: #00000073 !important;
}
[class^='yunshang-u-drawer_head___'] {
  padding: 16px 16px 16px 42px !important;
}
[class^='yunshang-u-drawer_title___'] [class^='u-text___'] {
  font-size: 16px !important;
  color: rgba(0, 0, 0, 0.85) !important;
}
</style>
