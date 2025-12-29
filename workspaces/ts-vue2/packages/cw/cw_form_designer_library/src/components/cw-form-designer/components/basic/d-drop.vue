<template>
  <div>
    <div v-show="rectStyle" :class="$style.root" :style="rectStyle">
      <!-- 用于显示nested的拖拽样式 -->
      <div :class="$style.mask" :style="maskStyle" v-if="maskStyle"></div>
      <!-- 用于显示nexted的拖拽位置 -->
      <div :class="$style.dragTip" v-if="!disabledDragTipStyle" :style="dragTipStyle"></div>
      <!-- 用于显示禁止拖拽的样式 -->
      <div :class="$style.disabledDragTip" :style="disabledDragTipStyle"></div>
    </div>
  </div>
</template>

<script>
import { getComponentMaterial } from '../../config';
import { eventBus, dragImage, getFormItemControlNodeTag } from '../../utils';
import { getFormItemControlNode } from '../property-panel/fields';
import { isDropColumn, getTableViewNode, isTableItemTag, isAllowAddNode, getCorrespondThOrTdNode } from '../../customDesigner';

export default {
  name: 'd-drop',
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    targetPosition: {
      type: Object,
    },
  },
  data() {
    return {
      rootEl: null,
      rectStyle: undefined,
      position: undefined, // 'append' | 'insertBefore' | 'insertAfter' | 'replace'
      maskStyle: undefined,
      dragTipStyle: undefined,
      disabledDragTipStyle: undefined,
      disableDrop: false, // 是否禁止放置
    };
  },
  watch: {
    info: {
      handler(value) {
        this.computeStyle();
      },
    },
  },
  mounted() {
    this.rootEl = this.$parent.$el;
    this.rootEl.addEventListener('dragleave', this.onDragLeave, true);

    this.$once('hook:beforeDestroy', () => {
      this.rootEl.removeEventListener('dragleave', this.onDragLeave, true);
      this.rootEl = null;
    });
  },
  methods: {
    onDragLeave(e) {
      this.dragover = false;
      this.dragTipStyle = undefined;
      this.rectStyle = undefined;
      this.maskStyle = undefined;
      this.disabledDragTipStyle = undefined;
      this.disableDrop = false;
      this.$parent.clearDragHover();
    },
    // 模拟拖拽的drop事件
    onAnalogDragDrop(analogDragData) {
      if (this.info.nodePath && !this.disableDrop) {
        const { actionMsg } = analogDragData;
        this.$emit('moveNode', {
          referNodePath: this.info.nodePath,
          actionMsg,
        });
      }
      eventBus.emit('clearDragHover');
    },
    computeStyle() {
      // reset样式
      this.rectStyle = undefined;
      this.maskStyle = undefined;
      this.dragTipStyle = undefined;
      this.position = undefined;
      this.disabledDragTipStyle = undefined;
      this.disableDrop = false;

      const el = this.info.el;
      /**
       * 如果节点不是 Element，则取消计算样式
       */
      if (!el || el.nodeType !== 1) return;

      const { left, top, width, height } = this.info.rect;
      const { marginTop, marginBottom, marginLeft, marginRight } = this.getMargin(el);
      /**
       * 如果不在区域内部，则取消计算样式
       * 目前的 inferNode 针对于没有 nodePath 的组件节点
       */
      if (
        !this.isInRect(this.targetPosition, {
          left: left - marginLeft,
          top: top - marginTop,
          width: width + marginLeft + marginRight + 2,
          height: height + marginBottom + marginTop + 10,
        })
      ) {
        return;
      }

      this.rectStyle = {
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
      };

      let upArea = false;
      let downArea = false;
      let leftArea = false;
      let rightArea = false;

      let splitValue = 2;
      if (String(this.info.nested) === 'true') {
        // 可以嵌套的组件分为4个区域
        // 同时支持内部和前后的时候按照 1/4, 2/4, 1/4 划分
        splitValue = 4;
      }

      if (splitValue === 2) {
        // 在内部区域划分前后和内部添加 一半的切分方式
        upArea = this.targetPosition.y >= top - marginTop && this.targetPosition.y <= top + height / 2;
        // 靠近下部分的支持一点溢出的区域
        downArea = this.targetPosition.y >= top + height / 2 && this.targetPosition.y <= top + height + marginBottom + 10;

        leftArea = this.targetPosition.x >= left - marginLeft && this.targetPosition.x <= left + width / 2;
        rightArea = this.targetPosition.x >= left + width / 2 && this.targetPosition.x <= left + width + marginRight;
      } else {
        const upAreaY = top + height / 4;
        const downAreaY = top + (height * 3) / 4;
        upArea = this.targetPosition.y >= top && this.targetPosition.y <= upAreaY;
        downArea = this.targetPosition.y >= downAreaY && this.targetPosition.y <= top + height + 10;

        leftArea = this.targetPosition.x >= left && this.targetPosition.x <= left + width / 4;
        rightArea = this.targetPosition.x >= left + (width * 3) / 4 && this.targetPosition.x <= left + width;
      }

      let display = this.getDisplayType(el);
      // column 左右切换顺序
      if (this.info.tag === 'u-grid-layout-column') {
        display = 'inline';
      }
      const area = display === 'block' || display === 'flex' ? upArea || downArea : leftArea || rightArea;
      this.area = {
        area,
        upArea,
        downArea,
        leftArea,
        rightArea,
      };
      // 用于记录最终拖放的父元素
      let containerEl;

      this.dragTipStyle = {
        width: '3px',
        height: height + 'px',
      };

      // console.log('d-drop', this.info.next, this.info.nested, this.info.tag, this.$parent.analogDragData?.originNodeTag);

      // 进入组件的前后 或者 左右区域
      if (String(this.info.next) === 'true') {
        containerEl = this.info.el.parentElement;
        this.maskStyle = undefined;
        /* 如果是布局组件，那么拖入布局组件内部，同为 nested 和 next 的组件， 先判断 next */
        // 现在的 block
        if (display === 'block' || display === 'flex') {
          // 拖拽方向的提示线条
          this.dragTipStyle = {
            width: width + 'px',
            height: '3px',
          };
          if (upArea) {
            this.position = 'insertBefore';
            this.dragTipStyle.top = 0 - marginTop / 2 - 2 + 'px'; // 减2是因为线也有高度
          } else {
            this.position = 'insertAfter';
            this.dragTipStyle.top = height + marginBottom / 2 - 2 + 'px'; // 减2是因为线也有高度
          }
        } else if (display === 'inline' || display === 'table-cell') {
          this.dragTipStyle = {
            width: '3px',
            height: height + 'px',
          };
          if (leftArea) {
            this.position = 'insertBefore';
            this.dragTipStyle.left = 0 - marginLeft / 2 - 2 + 'px';
          } else {
            this.position = 'insertAfter';
            this.dragTipStyle.left = width + marginRight / 2 - 2 + 'px';
          }
        }

        // 表单设计器中的table-column需要特殊处理(next)
        if (isTableItemTag(this.info.tag)) {
          Object.assign(this.dragTipStyle, {
            width: '3px',
            top: el.tagName === 'TH' ? '0px' : '-40px',
            height: this.$parent.getVisibleRect(getTableViewNode(el)).height + 'px',
          });

          if (!isAllowAddNode(this.$parent.dragTagName)) {
            this.disabledDragTipStyle = this.dragTipStyle;
            this.dragTipStyle = undefined;
            this.disableDrop = true;
          }
        }

        if (this.$parent.analogDragData && this.$parent.analogDragData?.originNodeTag !== this.info.tag) {
          this.disabledDragTipStyle = this.dragTipStyle;
          this.dragTipStyle = undefined;
          this.disableDrop = true;
        }
      } else if (String(this.info.nested) === 'true') {
        containerEl = this.info.el;
        // append 节点的位置绘制， nested 组件为空的大部分情况下都有 + 号
        const nestedEl = this.info.nestedEl || this.info.el;
        const nestedRect = this.$parent.getVisibleRect(nestedEl);
        this.maskStyle = {
          width: nestedRect.width + 'px',
          height: nestedRect.height + 'px',
          top: nestedRect.top - top + 'px',
          left: nestedRect.left - left + 'px',
        };
        this.maskStyle.background = 'rgba(78, 117, 236, 0.32)';
        this.dragTipStyle = undefined;
        this.position = this.info.position || 'append';

        // 表单设计器中的table-column需要特殊处理(nested)
        if (isTableItemTag(this.info?.tag)) {
          const correspondNode = getCorrespondThOrTdNode(nestedEl);
          const { height } = this.$parent.getVisibleRect(correspondNode);
          Object.assign(this.maskStyle, {
            height: `${nestedRect.height + height}px`,
            background: 'transparent',
            outline: 'none',
            borderWidth: '0',
            left: '0',
          });
          if (correspondNode?.tagName === 'TH') {
            this.maskStyle.top = '-40px';
          }
          this.info.templateNodePath = this.info.nodePath;
          if (
            !isAllowAddNode(this.$parent.dragTagName) ||
            (this.$parent.analogDragData && this.$parent.analogDragData?.originNodeTag !== this.info.tag)
          ) {
            Object.assign(this.maskStyle, {
              background: 'rgba(242, 73, 87, 0.32)',
            });
            this.disableDrop = true;
          }
        }
      } else {
        this.rectStyle = undefined; // 清空情况下的 drop 承载区域取消
        this.maskStyle = undefined;
        this.dragTipStyle = undefined;
        this.position = null;
      }
      // todo: 左侧结构树放置数据
    },
    isInRect(position, rect) {
      if (!position || !rect) return false;

      return position.x >= rect.left && position.x <= rect.left + rect.width && position.y >= rect.top && position.y <= rect.top + rect.height;
    },
    /**
     * 获取html元素的display属性
     */
    getDisplayType(node) {
      const nodeStyle = getComputedStyle(node);
      let display = (nodeStyle.display || '')
        .replace(/-block$/, '')
        .replace(/-flex$/, '')
        .replace(/-table$/, '');
      const width = node.style.width;
      const parentNode = node.parentElement;
      if (parentNode) {
        const parentNodeStyle = getComputedStyle(parentNode);
        const parentDisplay = (parentNodeStyle.display || '')
          .replace(/-block$/, '')
          .replace(/-flex$/, '')
          .replace(/-table$/, '');
        if (parentDisplay === 'flex') {
          const direction = parentNodeStyle.flexDirection;
          if (direction === 'column') {
            return 'block';
          } else return width === '100%' ? 'block' : 'inline';
        }
      }
      if (['left', 'right'].includes(nodeStyle.float)) {
        display = 'inline';
      }
      return display;
    },
    /**
     * 判断元素文字是否换行
     */
    computeBreakline(el) {
      let breakline = false;
      const breaklineRect = {};
      // 不使用getDisplayType，el本身是inline的才处理换行
      const nodeStyle = getComputedStyle(el);
      const display = (nodeStyle.display || '')
        .replace(/-block$/, '')
        .replace(/-flex$/, '')
        .replace(/-table$/, '');
      if (display === 'inline') {
        const elStyle = getComputedStyle(el);
        const offsetHeight = el.offsetHeight;
        const lineHeight = +(elStyle.lineHeight || '').replace(/px/, '');
        if (offsetHeight / lineHeight > 1) {
          breakline = true;
          const span = document.createElement('span');
          el.parentElement.insertBefore(span, el);
          breaklineRect.first = span.getBoundingClientRect();
          if (el.nextElementSibling) {
            el.parentElement.insertBefore(span, el.nextElementSibling);
          } else {
            el.parentElement.appendChild(span);
          }
          breaklineRect.last = span.getBoundingClientRect();
          span.remove();
        }
      }
      return {
        breakline,
        breaklineRect,
      };
    },
    getMargin(el) {
      const style = getComputedStyle(el);
      return {
        marginTop: parseFloat(style.marginTop) || 0,
        marginBottom: parseFloat(style.marginBottom) || 0,
        marginLeft: parseFloat(style.marginLeft) || 0,
        marginRight: parseFloat(style.marginRight) || 0,
      };
    },
  },
};
</script>
<style lang="scss" module>
.root {
  position: fixed;
  min-width: 20px;
  min-height: 20px;
  z-index: 99999999;
  pointer-events: none;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999999;
    border: 1px solid white;
    outline: 1px dashed #4a88e8;
    outline-offset: -1px;
    pointer-events: none;
    color: transparent;
  }
  .mask::after {
    content: '+';
    font-size: 20px;
    line-height: 12px;
    display: inline-block;
    margin-bottom: 2px;
    position: absolute;
    left: calc(50% - 6px);
    top: calc(50% - 7px);
    color: inherit;
  }

  .dragTip {
    position: absolute;
    width: 0;
    height: 0;
    background: #4e75ec;
    box-shadow: 0px 0px 8px rgba(255, 255, 255);
    // transition: left 0.2s ease-out;
  }

  .disabledDragTip {
    position: absolute;
    background: #f24957;
    box-shadow: 0px 0px 8px #ffffff;
  }
}
</style>
