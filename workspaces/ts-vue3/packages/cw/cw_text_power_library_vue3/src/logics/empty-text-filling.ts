import '@nasl/types';
import { watch } from 'vue';

let activeObserver: MutationObserver | null = null;
const teardownMap = new WeakMap<object, () => void>();

function getVm(ele: Element) {
  const el = ele as HTMLElement & { __vueParentComponent?: object; __vue__?: object };
  return el.__vueParentComponent ?? el.__vue__ ?? null;
}

function getText(vm: any): string | undefined {
  if (!vm) return undefined;
  if (vm.props && 'text' in vm.props) return vm.props.text;
  if (vm.proxy?.text !== undefined) return vm.proxy.text;
  return vm.ctx?.text ?? vm.setupState?.text;
}

function fillIfEmpty(ele: Element) {
  const vm = getVm(ele);
  if (!vm || teardownMap.has(vm)) return;

  const text = getText(vm);
  if (text) return;
  if (ele.childNodes.length !== 1) return;

  const textChild = document.createTextNode('--');
  ele.appendChild(textChild);

  const stop = watch(
    () => getText(vm),
    (newText) => {
      if (newText && textChild.parentNode === ele) {
        ele.removeChild(textChild);
      }
      stop();
      teardownMap.delete(vm);
    },
  );
  teardownMap.set(vm, stop);
}

/**
 * @NaslLogic
 * @type both
 * @title 文字组件空字符串替换
 * @description 文字组件空字符串替换
 * @param text 占位文本
 */
export function emptyTextFilling(text?: nasl.core.String): void {
  void text;

  if (activeObserver) {
    activeObserver.disconnect();
    activeObserver = null;
  }

  activeObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'childList') continue;
      const root = mutation.target as ParentNode;
      const eles = 'querySelectorAll' in root
        ? root.querySelectorAll('[class^="el-text"]')
        : [];
      eles.forEach((ele) => fillIfEmpty(ele));
    }
  });

  activeObserver.observe(document.body, { childList: true, subtree: true });
}
