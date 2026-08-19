/**
 * 创建 IntersectionObserver 并开始观察元素
 * @param element 要观察的元素
 * @param root 根元素
 * @param callback 回调函数
 * @param marginBottom 底部边距
 * @returns IntersectionObserver 实例，必须在组件销毁时调用 disconnect() 和 unobserve() 进行清理
 * 
 * @example
 * const observer = observe(element, root, callback, 100);
 * // 在组件销毁时清理
 * beforeDestroy() {
 *   if (observer) {
 *     observer.unobserve(element);
 *     observer.disconnect();
 *   }
 * }
 */
export default function observe(element: HTMLElement, root: HTMLElement, callback: Function, marginBottom: number): IntersectionObserver | null {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!window || !window.IntersectionObserver) {
    callback();
    return null;
  }
  let io: IntersectionObserver | null = null;
  try {
    io = new window.IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        callback();
        if (io) {
          io.unobserve(element);
        }
      }
    }, {
      rootMargin: `0px 0px ${marginBottom}px 0px`,
      root
    });
    io.observe(element);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    callback();
  }
  return io;
}