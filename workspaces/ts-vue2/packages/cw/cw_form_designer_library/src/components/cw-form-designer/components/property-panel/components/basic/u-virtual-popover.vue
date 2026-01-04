<template>
  <div v-if="internalReference" ref="wrapper" tttt="test" :key="popoverKey">
    <el-popover ref="popover" :reference="internalReference" :value="internalValue" trigger="manual" v-bind="$attrs">
      <slot></slot>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'VirtualPopover',
  inheritAttrs: false,
  props: {
    // 虚拟触发元素的引用（必需）
    virtualRef: {
      default: null,
    },
  },
  data() {
    return {
      internalReference: null,
      popoverKey: 0,
      internalValue: false,
      isSwitching: false, // 标记是否正在切换 reference
    };
  },
  watch: {
    virtualRef: {
      handler(newRef) {
        // watch 只负责更新 reference，不负责显示逻辑
        if (newRef && this.internalReference !== newRef) {
          this.updateReference(newRef);
        }
      },
      immediate: true,
    },
    internalValue: {
      handler(newVal) {
        if (!this.isSwitching) {
          this.$emit(newVal ? 'show' : 'hide');
        }
      },
    },
  },
  methods: {
    updateReference(newRef) {
      if (this.internalReference === newRef) return;

      const wasVisible = this.internalValue;
      this.isSwitching = true;

      // 如果之前是显示的，先关闭
      if (wasVisible) {
        this.internalValue = false;
      }

      // 更新 reference 并强制重新渲染
      this.internalReference = newRef;
      this.popoverKey += 1;

      // 如果之前是显示的，在 DOM 更新后恢复显示
      if (wasVisible) {
        this.$nextTick(() => {
          this.internalValue = true;
          this.isSwitching = false;
        });
      } else {
        this.isSwitching = false;
      }
    },
    show() {
      // 等待 Vue 响应式更新完成，确保 virtualRef prop 已更新
      this.$nextTick(() => {
        // 如果 reference 需要更新，先更新再显示
        if (this.virtualRef && this.internalReference !== this.virtualRef) {
          const wasVisible = this.internalValue;
          this.updateReference(this.virtualRef);

          // 如果是新显示（之前未显示），等待 DOM 更新和 el-popover 初始化完成后再显示
          if (!wasVisible) {
            this.$nextTick(() => {
              this.internalValue = true;
              this.isSwitching = false;
            });
          }
          return;
        }

        // reference 已正确，直接显示（不切换）
        if (this.internalReference) {
          this.internalValue = true;
        }
      });
    },
    hide() {
      this.internalValue = false;
    },
    toggle() {
      this.internalValue ? this.hide() : this.show();
    },
  },
};
</script>
