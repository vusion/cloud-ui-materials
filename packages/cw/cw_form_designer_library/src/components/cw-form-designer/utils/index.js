import { EventEmitter } from '@/mini-nasl/common/EventEmitter';

export * from './sub-form';
export * from './addblock';

export const eventBus = new EventEmitter();

// 创建拖拽图片
export function dragImage(node, styles = {}) {
  if (!node) return null;
  const dragNode = node;
  const needAttach = !dragNode.isConnected;

  dragNode.style.position = 'absolute';
  dragNode.style.top = '-999px';
  dragNode.style.left = '-999px';
  dragNode.style.opacity = '1';
  dragNode.style.pointerEvents = 'none';

  Object.assign(dragNode.style, styles);

  // 只有在节点尚未挂载时才追加到 body，避免重复 DOM 操作
  if (needAttach) {
    document.body.appendChild(dragNode);

    // 延迟清理：确保拖拽操作完成后再移除
    setTimeout(() => {
      if (dragNode && dragNode.parentNode) {
        dragNode.parentNode.removeChild(dragNode);
      }
    }, 100);
  }

  return dragNode;
}

// 获取生产环境下的沙箱地址
export function getIframeSrc() {
  const librarySrc = document.querySelector('script[src*="cw_form_designer_library"]')?.src || '';
  if (librarySrc) {
    return librarySrc.replace('index.js', 'sandbox.html'); // 沙箱的html文件地址
  }
}

// 获取沙箱要加载的资源配置
export function getAssetsConfig() {
  const jsRe = /(?:vue@2|pc-ui.*index\.js)/;
  // const jsRe = /pc-ui.*index\.js/;
  const cssRe = /pc-ui.*index\.css/;
  return Array.from(document.querySelectorAll('.lazyload')).reduce(
    (acc, el) => {
      const src = el.src || el.href;
      if (!src) return acc;
      if (jsRe.test(src)) {
        acc.js.push(src);
      } else if (cssRe.test(src)) {
        acc.css.push(src);
      }
      return acc;
    },
    { js: [], css: [], theme: '' }
  );
}

// 获取自定义主题样式
export function getCustomThemeStyle() {
  const themeStyle = document.querySelector('style#theme');
  if (themeStyle) {
    return themeStyle.textContent || themeStyle.innerHTML;
  }
  return '';
}

// 获取页面中的form表单(目前页面中只允许有一个form表单)
export function getFormNode(view) {
  let form = null;
  const isFormNode = (node) => {
    return node.concept === 'ViewElement' && node.tag === 'u-form';
  };
  view.traverseStrictChildrenStopWhen(
    (node) => {
      isFormNode(node) && (form = node);
    },
    (node) => isFormNode(node)
  );
  return form;
}

// 向上查找最近的form表单
export function getUpperFormNode(node) {
  const isFormNode = (n) => n?.concept === 'ViewElement' && n?.tag === 'u-form';
  while (node) {
    if (isFormNode(node)) return node;
    node = node.parentNode;
  }
  return null;
}

// 获取主表单实体
export function getFormEntity(view) {
  return view.entities.find((entity) => entity.origin === 'form');
}

export function objectToString(obj) {
  // 递归处理对象，保留undefined的key，而不是直接删除
  const replacer = (key, value) => {
    if (typeof value === 'undefined') {
      return '__CW_UNDEFINED__'; // 临时标记，用于后处理
    }
    return value;
  };
  let jsonStr = JSON.stringify(obj, replacer, 0);
  // 将临时标记替换为 undefined 字样（原本会变成字符串）
  jsonStr = jsonStr.replace(/"__CW_UNDEFINED__"/g, null);
  return jsonStr;
}
