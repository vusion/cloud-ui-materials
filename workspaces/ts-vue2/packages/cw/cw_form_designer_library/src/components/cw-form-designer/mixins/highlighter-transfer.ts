import Vue from 'vue';
import throttle from 'lodash/throttle';
import * as utils from '../utils';
import { eventBus, getFormItemControlNodeTag } from '../utils';
import { getComponentBlock, getComponentMaterial } from '../config';
import { isDropColumn, getTableViewNode, isAllowAddNode, getColumnConfig, getCorrespondThOrTdNode } from '../customDesigner';
import { getSubFormColumnControlNode } from '@/components/cw-form-designer/components/property-panel/shared';

const selectableNodes = {
  'u-form': '表单',
  'u-form-item': '表单项',
  'u-table-view-column': '表单列',
};

export default Vue.extend({
  data() {
    return {
      contextVM: undefined,
      hover: undefined,
      selected: undefined,
      draghover: undefined,
      rootEl: null,
      dragging: false,
      targetPosition: undefined, // drop的目标位置
      dragNode: {}, // 画布中的拖拽节点
      dragTagName: '', // 拖拽节点的tag
      mousedownTarget: null,
      analogDragData: null,
      maskLayerStyle: null,
      ghostposition: null,
      ghostRafId: null, // 更新拖拽 ghost 位置的 RAF ID
    };
  },
  watch: {
    hover: {
      handler(newVal, oldValue) {
        this.setHighlighter(newVal, 'hover');
      },
    },
    selected: {
      handler(newVal, oldValue) {
        this.setHighlighter(newVal, 'selected');
      },
    },
    draghover: {
      handler(newVal, oldValue) {
        this.setHighlighter(newVal, 'draghover');
      },
    },
  },
  mounted() {
    this.rootEl = this.$refs.root;
    this.throttleMouseover = this.genThrottledFunc(this.onMouseover);
    this.throttleHandleDrag = this.genThrottledFunc(this.handleDragOver, 100, { leading: true, trailing: false });

    eventBus.on('clearDragHover', this.clearDragHover);
    eventBus.on('setDragTagName', this.setDragTagName);
    eventBus.on('getDragTagName', this.getDragTagName);
    this.rootEl.addEventListener('mousedown', this.onMouseDown, true);
    this.rootEl.addEventListener('mouseover', this.throttleMouseover, true);
    window.addEventListener('mouseup', this.onMouseUp, true);
    this.rootEl.addEventListener('mouseleave', this.onMouseleave, true);
    this.rootEl.addEventListener('click', this.onClick, true);
    this.rootEl.addEventListener('dragover', this.onDragOver, true);
    this.rootEl.addEventListener('drop', this.onDrop, true);
    this.rootEl.addEventListener('dragend', this.clearDragHover, true);

    this.$once('hook:beforeDestroy', () => {
      eventBus.off('clearDragHover', this.clearDragHover);
      eventBus.off('setDragTagName', this.setDragTagName);
      eventBus.off('getDragTagName', this.getDragTagName);
      this.rootEl.removeEventListener('mousedown', this.onMouseDown, true);
      this.rootEl.removeEventListener('mouseover', this.throttleMouseover, true);
      window.removeEventListener('mouseup', this.onMouseUp, true);
      this.rootEl.removeEventListener('mouseleave', this.onMouseleave, true);
      this.rootEl.removeEventListener('click', this.onClick, true);
      this.rootEl.removeEventListener('dragover', this.onDragOver, true);
      this.rootEl.removeEventListener('drop', this.onDrop, true);
      this.rootEl.removeEventListener('dragend', this.clearDragHover, true);
      this.rootEl = null;
    });
  },
  methods: {
    setDragTagName({ tagName }) {
      this.dragTagName = tagName;
    },
    getDragTagName() {
      return this.dragTagName;
    },
    onMouseover(e) {
      if (this.dragging) return;
      this.cancelEvent(e);
      const target = this.getTrappedTarget(e);
      if (target) {
        this.hover = this.getNodeInfo(target);
      } else {
        this.hover = undefined;
      }
    },
    onMouseleave(e) {
      if (e.target !== this.rootEl) return;
      this.cancelEvent(e);

      this.hover = {};
    },
    onClick(event) {
      const target = this.getTrappedTarget(event);
      if (target) {
        const nodeInfo = this.getNodeInfo(target);
        this.selected = nodeInfo;
        this.scrollIntoView(target, 'smooth');
        this.$emit('setSelectedNode', nodeInfo.nodePath);
      }
    },
    onDragOver(e) {
      e.preventDefault();
      if (this.$refs.drop.position) {
        // 设置鼠标加号样式
        e.dataTransfer.dropEffect = this.$refs.drop.disableDrop ? 'none' : 'copy';
      }
      this.dragging = true;
      this.throttleHandleDrag(e);
    },
    handleDragOver(event) {
      if (!this.dragging) {
        this.dragging = true;
        this.hover = undefined;
        this.selected = undefined;
        return;
      }
      let target = this.getTrappedTarget(event);
      if (!target) {
        // 增加默认插入位置
        if (this.formNode.children.length) {
          // 表单中有节点，默认位置为最后一个节点后面
          const lastFormItem = this.formNode.children[this.formNode.children.length - 1];
          target = this.queryNodeByPath(lastFormItem.nodePath);
          const { x, y, width, height } = target.getBoundingClientRect();
          // 模拟拖拽，补充完整的事件对象属性
          this.handleDragOver({
            ...event,
            target,
            clientX: x + width / 2 + 5,
            clientY: y + height / 2 + 5,
            x: x + width / 2 + 5,
            y: y + height / 2 + 5,
          });
          return;
        } else {
          // 表单中无节点，默认位置就是form nested
          target = this.queryNodeByPath(this.formNode.nodePath);
        }
      } else {
        // 从画布中拖拽，自身不作为可drop目标
        if (this.dragNode.el && this.dragNode.el === target) {
          this.draghover = undefined;
          this.targetPosition = undefined;
          return;
        }
      }

      const nodeInfo = this.getNodeInfo(target);
      const referNodeTag = target?.getAttribute('vusion-node-tag');
      // 1.拖拽到子表单表格列上
      if (utils.isTableColumnTag(referNodeTag)) {
        const { isInitialColumn, isDropColumn } = getColumnConfig(target);
        nodeInfo.nested = isDropColumn;
        nodeInfo.next = !isInitialColumn && !isDropColumn;
        if (nodeInfo.next) {
          this.scrollSubForm(target, event); // 滚动子表单
        }
      } else if (referNodeTag === 'u-form') {
        // 2.参考节点是form
        nodeInfo.nested = true;
        nodeInfo.next = false;
      } else if (referNodeTag === 'u-table-view') {
        // 不允许直接append到table，清空 draghover
        this.draghover = undefined;
        this.targetPosition = undefined;
        return;
      }
      this.targetPosition = this.getVisibleRect(target, this.rootEl, event);
      nodeInfo.rect = this.targetPosition;
      this.draghover = nodeInfo;
    },

    onDrop(event) {
      if (!this.draghover || this.$refs.drop.disableDrop) return;
      event.preventDefault();
      const data = event.dataTransfer.getData('application/json');
      const { title, tagName, actionMsg } = JSON.parse(data);
      const block = getComponentBlock(tagName);

      this.addBlock({
        // 参考组件信息
        position: this.$refs.drop.position,
        nodePath: this.draghover.nodePath,
        // 待插入组件信息
        tagName,
        title,
        block,
        actionMsg,
      });
      this.clearDragHover();
    },
    // 多处会触发，延时到dom更新后，再清空画布中的拖拽提示等反馈信息
    clearDragHover() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.dragging = false;
          this.draghover = undefined;
          this.dragNode = {};
          if (this.rootEl) {
            this.rootEl.style.cursor = '';
          }
        });
      });
    },
    genThrottledFunc(cb, delay = 150, options = { leading: false, trailing: true }) {
      return throttle(cb, delay, options);
    },
    getTrappedTarget(event) {
      let target = event.target;
      const isTrappedTag = (el) => {
        if (!el) return false;
        const tag = el.getAttribute('vusion-node-tag') || '';
        if (tag === 'u-table-view-column') {
          const { isInitialColumn, isDropColumn } = getColumnConfig(el);
          return !isInitialColumn || (this.dragging && isDropColumn);
        }
        if (this.dragging) {
          return ['u-form-item'].includes(tag);
        } else {
          return ['u-form', 'u-form-item'].includes(tag);
        }
      };

      while (target && target !== this.rootEl) {
        if (isTrappedTag(target)) {
          return target;
        }
        target = target.parentNode;
      }
      return null;
    },
    getNodeInfo(target) {
      if (!target) return {};
      const tagName = target.getAttribute('vusion-node-tag') || '';
      const nodePath = target.getAttribute('vusion-node-path') || '';
      const title = selectableNodes?.[tagName] || '';
      return {
        tag: tagName,
        nodePath,
        title,
        el: target,
        next: true, // next标识组件是否可以前后放置
        nested: false, // nested标识组件是否可以嵌套放置
      };
    },
    async setHighlighter(info, mode = 'hover') {
      await this.$nextTick(); // 取保dom更新后，再设置样式
      if (!info?.el) {
        this[`${mode}Highlighter`] = undefined;
        return;
      }
      let { top, left, width, height } = this.getVisibleRect(info.el);

      // 子表单的table-column需要特殊处理
      if (info.tag === 'u-table-view-column') {
        const tableViewNode = getTableViewNode(info.el);
        if (tableViewNode) {
          const rect = this.getVisibleRect(tableViewNode);
          top = rect.top;
          height = rect.height;
        }
      }
      const rectStyle = {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px',
      };
      const data = {
        mode,
        nodePath: info.nodePath,
        rectStyle,
        info,
      };
      this[`${mode}Highlighter`] = data;
    },
    getVisibleRect(el, parentNode = this.rootEl, event) {
      if (!parentNode || !el) return {};
      const parentRect = parentNode.getBoundingClientRect();
      const currentRect = el.getBoundingClientRect();

      return {
        top: currentRect.top - parentRect.top,
        left: currentRect.left - parentRect.left,
        width: currentRect.width,
        height: currentRect.height,
        x: event ? event.x - parentRect.x : undefined,
        y: event ? event.y - parentRect.y : undefined,
      };
    },
    cancelEvent(e) {
      if (this.dragging) return;
      if (this.$el.contains(e.target))
        // helperVM 中的事件不拦截、不处理
        return;
      this.forceCancelEvent(e);
    },
    forceCancelEvent(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
    },
    preventDefault(e) {
      e.preventDefault();
    },
    // ============================== 模拟拖拽 ==============================
    // 模拟拖拽
    onMouseDown(e) {
      this.mousedownTarget = e.target;
      window.addEventListener('mousemove', this.onMouseMove, true);
    },
    onMouseUp(e) {
      if (this.mousedownTarget) {
        window.removeEventListener('mousemove', this.onMouseMove, true);
        if (this.mouseStartTimer) {
          clearTimeout(this.mouseStartTimer);
          this.mouseStartTimer = null;
        }
        this.$refs.drop.onAnalogDragDrop(this.analogDragData);
        this.dragTagName = null;
        this.maskLayerStyle = null;
        this.analogDragData = null;
        this.ghostposition = null;
        this.mousedownTarget = null;
        if (this.ghostRafId !== null) {
          cancelAnimationFrame(this.ghostRafId);
          this.ghostRafId = null;
        }
      }
    },
    onMouseMove(e) {
      e.preventDefault();
      if (this.analogDragData) {
        this.throttleHandleDrag(e);
        this.updateGhostPosition(e);
      } else if (this.mousedownTarget) {
        // 避免稍微移动就开始拖拽，页面动画闪烁
        if (this.mouseStartTimer) return;
        this.mouseStartTimer = setTimeout(() => {
          if (this.mousedownTarget) {
            this.analogDrag(e);
            clearTimeout(this.mouseStartTimer);
            this.mouseStartTimer = null;
          }
        }, 100);
      }
    },
    analogDrag(e) {
      // 检查目标元素是否可拖拽
      let target = this.mousedownTarget;
      while (target && target !== this.rootEl) {
        const tag = target.getAttribute('vusion-node-tag');

        if (tag && ['u-form-item', 'u-table-view-column'].includes(tag)) {
          if (target.hasAttribute('sub-form-initial-column')) return;
          const { top, left, width, height, x, y } = this.getVisibleRect(target, this.rootEl, e);
          this.maskLayerStyle = {
            top: top + 'px',
            left: left + 'px',
            width: width + 'px',
            height: height + 'px',
          };
          // 模拟dragstart
          const nodePath = target.getAttribute('vusion-node-path');
          const dragNode = this.view.findNodeByPath(nodePath);
          let tagName = dragNode.tag;
          if (tagName === 'u-form-item') {
            tagName = getFormItemControlNodeTag(dragNode);
          } else if (tagName === 'u-table-view-column') {
            tagName = getSubFormColumnControlNode(dragNode)?.tag;
          }
          const material = getComponentMaterial(tagName);
          if (!material) return;
          this.hover = undefined;
          this.selected = undefined;
          this.dragging = true;
          const title = material.title;
          this.$refs.dragghost.setTitle(title);
          this.updateGhostPosition(e);

          // 获取可拖拽节点的控件
          const data = {
            title,
            tagName,
            command: 'moveNode',
            actionMsg: `移动“${title}”组件`,
            originNodeTag: dragNode.tag,
          };
          this.analogDragData = data;
          this.dragTagName = tagName;
          this.dragNode = {
            el: target,
            node: dragNode,
          };
          return;
        }
        target = target.parentElement;
      }
    },
    updateGhostPosition(e) {
      const { x, y } = this.getVisibleRect(this.mousedownTarget, this.rootEl, e);
      if (this.ghostRafId !== null) {
        cancelAnimationFrame(this.ghostRafId);
      }
      this.ghostRafId = requestAnimationFrame(() => {
        // 模拟拖拽时，根据 disableDrop 设置鼠标样式
        if (this.rootEl && this.$refs.drop) {
          this.rootEl.style.cursor = this.$refs.drop.disableDrop ? 'not-allowed' : 'copy';
        }
        this.ghostposition = {
          top: y + 10,
          left: x + 10,
          pointerEvents: 'auto',
        };
        this.ghostRafId = null;
      });
    },
    // ============================== 滚动视图 ==============================
    async scrollIntoView(element, behavior = 'auto') {
      if (!element) return;
      await this.$nextTick();

      // fix: 修改点击子表单头节点，视图无法自动滚动
      if (element?.tagName === 'TH') {
        element = getCorrespondThOrTdNode(element);
      }

      // 检查元素是否完全可见，如果完全可见则不需要滚动
      if (this.checkOcclusion(element)) {
        return;
      }

      element.scrollIntoView({
        behavior,
        block: 'center',
        inline: 'center',
      });
    },
    // 检查元素是否完全可见
    // 参考位置是 rootEl 的父元素容器，而不是视口
    // 返回 true 表示完全可见，false 表示需要滚动
    checkOcclusion(element) {
      if (!this.rootEl?.parentElement) {
        return false;
      }

      const elementRect = element.getBoundingClientRect();
      const containerRect = this.rootEl.parentElement.getBoundingClientRect();

      // 检查元素是否在容器内
      const isInContainer =
        elementRect.bottom > containerRect.top &&
        elementRect.top < containerRect.bottom &&
        elementRect.right > containerRect.left &&
        elementRect.left < containerRect.right;

      if (!isInContainer) {
        return false;
      }

      // 检查元素是否完全在容器内
      const isFullyInContainer =
        elementRect.top >= containerRect.top &&
        elementRect.left >= containerRect.left &&
        elementRect.bottom <= containerRect.bottom &&
        elementRect.right <= containerRect.right;

      // 检查元素的四个角和中心点是否可见
      // 四个角都向中心点方向偏移5px，避免检测点正好在边界上
      const testPoints = [
        { x: elementRect.left + 5, y: elementRect.top + 5 }, // 左上角
        { x: elementRect.right - 5, y: elementRect.top + 5 }, // 右上角
        { x: elementRect.left + 5, y: elementRect.bottom - 5 }, // 左下角
        { x: elementRect.right - 5, y: elementRect.bottom - 5 }, // 右下角
        { x: elementRect.left + elementRect.width / 2, y: elementRect.top + elementRect.height / 2 }, // 中心点
      ];

      // 过滤出在容器内的点
      const samplePoints = testPoints.filter(
        (point) => point.x >= containerRect.left && point.x <= containerRect.right && point.y >= containerRect.top && point.y <= containerRect.bottom
      );

      if (samplePoints.length === 0) {
        return false;
      }

      // 检查这些点是否可见（属于目标元素或其子元素）
      let visiblePoints = 0;

      // 定义覆盖层选择器（这些元素不应该被视为遮挡）
      const overlaySelectors = ['[class*="highlighter"]', '[class*="loading"]'];

      for (const point of samplePoints) {
        const topElement = document.elementFromPoint(point.x, point.y);
        if (!topElement) {
          continue;
        }

        // 检查该点上的元素是否是目标元素或其子元素
        if (element.contains(topElement) || topElement === element) {
          visiblePoints++;
          continue;
        }

        // 检查是否是覆盖层元素（高亮框、遮罩层等）
        const style = window.getComputedStyle(topElement);
        const isOverlay =
          style.pointerEvents === 'none' ||
          style.position === 'fixed' ||
          (style.position === 'absolute' && overlaySelectors.some((selector) => topElement.matches(selector)));
        if (isOverlay) {
          // 覆盖层不视为遮挡，继续检查下层元素
          const elements = document.elementsFromPoint(point.x, point.y);
          const realElement = elements.find((el) => el !== topElement && (element.contains(el) || el === element));
          if (realElement) {
            visiblePoints++;
          }
        }
      }

      // 如果 100% 的点可见且元素完全在容器内，认为元素完全可见
      return visiblePoints === samplePoints.length && isFullyInContainer;
    },
    scrollSubForm(target, event) {
      if (!target || !event) return;

      // 步骤1: 获取鼠标位置和表格节点
      const mouseX = event.clientX || event.x;
      const tableViewNode = getTableViewNode(target);
      if (!tableViewNode) return;

      // 步骤2: 查找序号列和操作列
      const indexColumn = tableViewNode.querySelector('th[sub-form-initial-column="index"]');
      const actionColumn = tableViewNode.querySelector('th[sub-form-initial-column="action"]');
      if (!indexColumn || !actionColumn) return;

      // 步骤3: 计算鼠标与列的横向距离，判断目标列
      const limit = 50;
      const indexRight = indexColumn.getBoundingClientRect().right;
      const actionLeft = actionColumn.getBoundingClientRect().left;
      const targetColumn = mouseX - indexRight <= limit ? indexColumn : actionLeft - mouseX <= limit ? actionColumn : null;
      if (!targetColumn) return;

      // 步骤4: 查找滚动容器并执行滚动
      const scrollContainer = tableViewNode.querySelector('[class^="f-scroll-view_wrap__"]');
      if (scrollContainer) {
        scrollContainer.scrollBy({
          left: targetColumn === indexColumn ? -50 : 50,
          behavior: 'smooth',
        });
      }
    },
  },
});
