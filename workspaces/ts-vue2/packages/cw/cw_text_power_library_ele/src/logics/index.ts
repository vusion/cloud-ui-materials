import '@nasl/types';

/**
 * @NaslLogic
 * @type both
 * @title 文字组件空字符串替换
 * @desc 文字组件空字符串替换
 * @param text?: nasl.core.String
 */
export function emptyTextFilling(text?: string) {
  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const eles = (mutation.target as Element).querySelectorAll?.(
          '[class^="u-text"]',
        );
        if (!eles) continue;
        const vms = [...eles]
          .map((ele) => (ele as any).__vue__)
          .filter(Boolean);
        vms.forEach((vm) => {
          const textChild = document.createTextNode('--');
          if (!vm.text && vm.$el.childNodes.length === 1)
            vm.$el.appendChild(textChild);
          const teardown = vm.$watch('text', () => {
            if (textChild && vm.$el) {
              vm.$el.removeChild(textChild);
            }
            teardown();
          });
        });
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  (this as any).$on('hook:beforeDestroy', () => {
    observer.disconnect();
  });
}
