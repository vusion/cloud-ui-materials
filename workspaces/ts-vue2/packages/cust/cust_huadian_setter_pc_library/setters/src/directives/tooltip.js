import { nextTick, createVNode, render } from 'vue';
import { ElTooltip } from 'element-plus';

/**
 * v-tooltip 指令
 * 用于检测文本是否单行溢出，如果溢出则显示tooltip
 * 使用方式：v-tooltip
 */
export default {
  mounted(el, binding) {
    // 检查元素是否已经设置了溢出样式，如果没有则设置
    const computedStyle = window.getComputedStyle(el);
    if (computedStyle.overflow !== 'hidden') {
      el.style.overflow = 'hidden';
    }
    if (computedStyle.textOverflow !== 'ellipsis') {
      el.style.textOverflow = 'ellipsis';
    }
    if (computedStyle.whiteSpace !== 'nowrap') {
      el.style.whiteSpace = 'nowrap';
    }
    
    // 创建一个MutationObserver来监听DOM变化
    const observer = new MutationObserver(() => {
      checkOverflow(el);
    });

    // 配置观察选项
    const config = { childList: true, subtree: true, characterData: true };

    // 开始观察目标节点
    observer.observe(el, config);

    // 初始检查
    nextTick(() => {
      checkOverflow(el);
    });

    // 存储observer以便在卸载时清理
    el._tooltipObserver = observer;
    
    // 添加鼠标事件监听
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
  },
  updated(el) {
    // 元素更新时重新检查
    nextTick(() => {
      checkOverflow(el);
    });
  },
  unmounted(el) {
    // 清理observer
    if (el._tooltipObserver) {
      el._tooltipObserver.disconnect();
      delete el._tooltipObserver;
    }

    // 移除事件监听
    el.removeEventListener('mouseenter', handleMouseEnter);
    el.removeEventListener('mouseleave', handleMouseLeave);
    
    // 移除tooltip容器
    removeTooltip();
  }
};

// 当前活动的tooltip元素
let activeTooltip = null;

/**
 * 处理鼠标进入事件
 * @param {MouseEvent} e 鼠标事件
 */
function handleMouseEnter(e) {
  const el = e.currentTarget;
  
  // 如果文本没有溢出，不显示tooltip
  if (!el._isOverflowing) return;
  
  // 移除可能存在的tooltip
  removeTooltip();
  
  // 创建tooltip容器
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  // 创建tooltip内容
  const content = el.textContent.trim();
  
  // 计算位置
  const rect = el.getBoundingClientRect();
  const tooltipStyle = {
    position: 'fixed',
    top: `${rect.top - 10}px`,
    left: `${rect.left + rect.width / 2}px`,
    transform: 'translate(-50%, -100%)',
    backgroundColor: '#303133',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    zIndex: 9999,
    maxWidth: '300px',
    wordBreak: 'break-word',
    pointerEvents: 'none',
    transition: 'opacity 0.3s',
    opacity: 0
  };
  
  // 设置容器样式
  Object.assign(container.style, tooltipStyle);
  container.textContent = content;
  
  // 添加小三角形
  const arrow = document.createElement('div');
  arrow.style.position = 'absolute';
  arrow.style.left = '50%';
  arrow.style.top = '100%';
  arrow.style.transform = 'translateX(-50%)';
  arrow.style.width = '0';
  arrow.style.height = '0';
  arrow.style.borderLeft = '6px solid transparent';
  arrow.style.borderRight = '6px solid transparent';
  arrow.style.borderTop = '6px solid #303133';
  container.appendChild(arrow);
  
  // 保存当前tooltip
  activeTooltip = container;
  
  // 显示tooltip（延迟一帧以确保过渡效果）
  requestAnimationFrame(() => {
    container.style.opacity = '1';
  });
}

/**
 * 处理鼠标离开事件
 */
function handleMouseLeave() {
  removeTooltip();
}

/**
 * 移除当前tooltip
 */
function removeTooltip() {
  if (activeTooltip) {
    // 添加淡出效果
    activeTooltip.style.opacity = '0';
    
    // 等待过渡完成后移除元素
    setTimeout(() => {
      if (activeTooltip && activeTooltip.parentNode) {
        activeTooltip.parentNode.removeChild(activeTooltip);
      }
      activeTooltip = null;
    }, 300);
  }
}

/**
 * 检查元素是否文本溢出
 * @param {HTMLElement} el 要检查的元素
 */
function checkOverflow(el) {
  // 检查元素是否存在
  if (!el) return;

  // 检查元素是否有内容
  if (!el.textContent.trim()) return;

  // 检查是否溢出
  const isOverflowing = el.scrollWidth > el.clientWidth;
  
  // 存储溢出状态
  el._isOverflowing = isOverflowing;
  
  // 根据是否溢出设置鼠标样式
  el.style.cursor = isOverflowing ? 'pointer' : '';
}