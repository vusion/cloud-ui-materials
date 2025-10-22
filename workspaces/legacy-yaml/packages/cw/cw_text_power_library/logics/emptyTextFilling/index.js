/**
 * @param {string} options <false> 这是一个描述
 * @returns {string} result
 */
export default (text) => {
  // 创建一个MutationObserver实例，配置其观察节点的子节点变化
  const observer = new MutationObserver(function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        const eles = mutation.target.querySelectorAll('[class^="u-text"]');
        const vms = [...eles].map((ele) => ele.__vue__).filter(Boolean);
        vms.forEach((vm) => {
          const textChild = document.createTextNode('--');
          if (!vm.text && vm.$el.childNodes.length === 1)
            vm.$el.appendChild(textChild);
          const teardown = vm.$watch("text", () => {
            if (textChild && vm.$el) {
              vm.$el.removeChild(textChild);
            }
            teardown();
          });
        });
      }
    }
  });

  // 为整个文档设置观察配置，并开始观察
  observer.observe(document.body, { childList: true, subtree: true });
  this.$on('hook:beforeDestroy', () => {
    observer.disconnect()
  })
};
