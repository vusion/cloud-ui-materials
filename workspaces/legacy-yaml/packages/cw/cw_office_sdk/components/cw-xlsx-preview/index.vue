<template>
  <div :class="$style.root">
      <div :class="$style.content" ref="content"></div>
      <div :class="$style.loading" v-if="isLoading">
          <div :class="$style.loader"></div>
      </div>
  </div>
</template>

<script>
import jsPreviewExcel from '@js-preview/excel';
import '@js-preview/excel/lib/index.css';
export default {
  name: 'cw-xlsx-preview',
  props: {
      value: {
          type: [String, Object],
      },
  },
  data() {
      return {
          isLoading: false,
      };
  },
  watch: {
      value() {
          this.init();
      },
  },
  beforeDestroy() {
      if (this.xlsxPreviewer) {
          this.xlsxPreviewer.destroy();
          this.xlsxPreviewer = null;
      }
      // 清理 observer
      try {
          if (this._observer) {
              this._observer.disconnect();
              this._observer = null;
          }
          if (this._restoreFns) {
              this._restoreFns.forEach(fn => {
                  try { fn(); } catch (e) {}
              });
              this._restoreFns = null;
          }
      } catch (e) {}
  },
  mounted() {
      this.init();
  },
  methods: {
      init() {
          if (this.xlsxPreviewer) {
              this.xlsxPreviewer.destroy();
              this.xlsxPreviewer = null;
          }
          if (!this.value) return;
          if (this.value instanceof Blob || typeof this.value === 'string') {
              this.isLoading = true;

              // 在调用第三方预览前，先建立一个 MutationObserver，拦截 container 内新增的可编辑元素，覆盖其 focus，并移除 autofocus
              const content = this.$refs.content;
              const patchedEls = new Set();
              this._restoreFns = [];

              const patchEl = (el) => {
                  if (!el || patchedEls.has(el)) return;
                  patchedEls.add(el);
                  try {
                      if (el.hasAttribute && el.hasAttribute('autofocus')) el.removeAttribute('autofocus');
                      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                          // 设置 readonly 避免 iOS/Android 立即弹键盘
                          el.setAttribute('readonly', 'true');
                      } else if (el.isContentEditable) {
                          el.setAttribute('contenteditable', 'false');
                      }

                      // 覆盖实例 focus，防止后续聚焦
                      try {
                          el._origFocus = el.focus;
                          el.focus = function () { /* noop */ };
                      } catch (e) {}

                      // 收集恢复函数
                      this._restoreFns.push(() => {
                          try {
                              if (el._origFocus) el.focus = el._origFocus;
                              if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                                  if (el.hasAttribute('readonly')) el.removeAttribute('readonly');
                              } else if (el.getAttribute && el.getAttribute('contenteditable') === 'false') {
                                  el.setAttribute('contenteditable', 'true');
                              }
                          } catch (e) {}
                      });
                  } catch (e) {
                      // ignore
                  }
              };

              const patchElementRecursively = (node) => {
                  if (!node) return;
                  if (node.nodeType !== 1) return;
                  try {
                      if (node.matches && node.matches('input, textarea, [contenteditable]')) {
                          patchEl(node);
                      }
                      const children = node.querySelectorAll && node.querySelectorAll('input, textarea, [contenteditable]');
                      if (children && children.length) {
                          Array.prototype.forEach.call(children, c => patchEl(c));
                      }
                  } catch (e) {}
              };

              try {
                  this._observer = new MutationObserver((mutations) => {
                      mutations.forEach(m => {
                          if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
                              Array.prototype.forEach.call(m.addedNodes, n => patchElementRecursively(n));
                          }
                          if (m.type === 'attributes' && m.attributeName === 'autofocus') {
                              try { m.target.removeAttribute('autofocus'); } catch (e) {}
                          }
                      });
                  });
                  this._observer.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ['autofocus'] });

                  // 对已有元素也先做一次处理
                  patchElementRecursively(content);
              } catch (e) {
                  // ignore observer 错误
              }

              this.xlsxPreviewer = jsPreviewExcel.init(this.$refs.content);
              this.xlsxPreviewer.preview(this.value).then(
                  () => {
                      this.isLoading = false;

                      // 预览成功后短时恢复（或者在需要时保持不可编辑）；恢复顺序：先再次 blur，然后在短延迟后恢复原始 focus/属性
                      setTimeout(() => {
                          try {
                              const active = document.activeElement;
                              if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
                                  active.blur();
                              }
                          } catch (e) {}

                          // 断开 observer 并恢复原始属性
                          try {
                              if (this._observer) {
                                  this._observer.disconnect();
                                  this._observer = null;
                              }
                              if (this._restoreFns) {
                                  this._restoreFns.forEach(fn => {
                                      try { fn(); } catch (e) {}
                                  });
                                  this._restoreFns = null;
                              }
                          } catch (e) {}
                      }, 50);
                  },
                  () => {
                      this.isLoading = false;
                      // 失败路径也尝试清理
                      setTimeout(() => {
                          try {
                              const active = document.activeElement;
                              if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
                                  active.blur();
                              }
                          } catch (e) {}

                          try {
                              if (this._observer) {
                                  this._observer.disconnect();
                                  this._observer = null;
                              }
                              if (this._restoreFns) {
                                  this._restoreFns.forEach(fn => {
                                      try { fn(); } catch (e) {}
                                  });
                                  this._restoreFns = null;
                              }
                          } catch (e) {}
                      }, 50);
                  }
              );
          }
      },
  },
};
</script>

<style module>
.root {
  height: 300px;
  position: relative;
}

.content {
  height: 100%;
  width: 100%;
}

.loading {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
      transform: rotate(1turn);
  }
}
</style>
