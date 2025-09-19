<template>
  <div :class="$style.root" ref="lodopPrintRef">
    <slot></slot>
  </div>
</template>

<script>
import { getLodop } from './LodopFuncs.js';

const PRINT_MODES = ['preview', 'direct', 'select', 'maintain', 'design'];

export default {
  name: 'lodop-print',
  props: {
    title: {
      type: String,
      default: '打印',
    },
    mode: {
      type: String,
      default: 'preview',
    },
    intTop: {
      type: [String, Number],
      default: 0,
    },
    intLeft: {
      type: [String, Number],
      default: 0,
    },
    intWidth: {
      type: [String, Number],
      default: '100%',
    },
    intHeight: {
      type: [String, Number],
      default: '100%',
    },
  },
  data() {
    return {
      LODOP: null,
    };
  },
  methods: {
    print() {
      if (!PRINT_MODES.includes(this.mode)) {
        console.warn(`未知的打印模式: ${this.mode}，使用默认预览模式`);
        this.mode = 'preview';
      }
      if (!this.createLodopTask()) return;

      try {
        switch (this.mode) {
          case 'preview':
            this.LODOP.PREVIEW(); // 预览打印
            break;
          case 'direct':
            this.LODOP.PRINT(); // 直接打印
            break;
          case 'select':
            this.LODOP.PRINTA(); // 选择打印机
            break;
          case 'maintain':
            this.LODOP.PRINT_SETUP(); // 打印维护
            break;
          case 'design':
            this.LODOP.PRINT_DESIGN();
            break;
        }
      } catch (error) {
        console.error('打印执行失败:', error);
      }
    },
    // 创建当前组件默认插槽内容的打印任务
    createLodopTask() {
      try {
        this.LODOP = getLodop();
        if (!this.LODOP || typeof this.LODOP.PRINT_INIT !== 'function') {
          return false;
        }
        this.LODOP.PRINT_INIT(`${this.title || '打印'}`);
        const width = this.$refs.lodopPrintRef?.offsetWidth;
        const height = this.$refs.lodopPrintRef?.offsetHeight;
        // 获取包含样式的完整HTML内容
        const htmlWithStyles = this.getHtmlWithStyles();
        // 调试：输出HTML内容（可选）
        if (process.env.NODE_ENV === 'development') {
          console.log('打印HTML内容:', htmlWithStyles);
        }

        this.LODOP.ADD_PRINT_HTM(this.intTop, this.intLeft, this.intWidth, this.intHeight, htmlWithStyles);
        return true;
      } catch (error) {
        console.error('创建打印任务失败:', error);
        return false;
      }
    },

    // 获取包含样式的HTML内容
    getHtmlWithStyles() {
      const element = this.$refs.lodopPrintRef;
      if (!element || !element.innerHTML) return '';
      // 获取页面中的所有样式
      const allStyles = this.getAllPageStyles();
      // 获取元素的HTML内容
      const elementHtml = element.innerHTML;
      // 按照Lodop示例的方式组合
      const strBodyStyle = `<style>${allStyles}</style>`;
      const strFormHtml = `<!DOCTYPE html>
        <html>
          <head>${strBodyStyle}</head>
          <body>${elementHtml}</body>
        </html>`;
      return strFormHtml;
    },

    // 获取页面中的所有样式
    getAllPageStyles() {
      try {
        return Array.from(document.querySelectorAll('style'))
          .map((tag) => tag?.innerHTML?.trim() || '')
          .filter(Boolean)
          .join('\n');
      } catch (e) {
        console.error('获取页面样式失败:', e);
        return '';
      }
    },
  },
};
</script>
<style module>
.root {
  width: 100%;
}
</style>
