<template>
  <div :class="$style.root">
    <div ref="content" :class="$style.content" />
    <div v-if="isLoading" :class="$style.loading">
      <div :class="$style.loader" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import jsPreviewExcel from '@js-preview/excel';
import '@js-preview/excel/lib/index.css';

const props = defineProps<{
  value?: string | Blob | object;
}>();

const content = ref<HTMLDivElement | null>(null);
const isLoading = ref(false);
let xlsxPreviewer: ReturnType<typeof jsPreviewExcel.init> | null = null;
let observer: MutationObserver | null = null;
let restoreFns: Array<() => void> | null = null;

function cleanupObserver() {
  try {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (restoreFns) {
      restoreFns.forEach((fn) => {
        try {
          fn();
        } catch {
          /* ignore */
        }
      });
      restoreFns = null;
    }
  } catch {
    /* ignore */
  }
}

function init() {
  if (xlsxPreviewer) {
    xlsxPreviewer.destroy();
    xlsxPreviewer = null;
  }
  cleanupObserver();
  if (!props.value || !content.value) return;

  if (props.value instanceof Blob || typeof props.value === 'string') {
    isLoading.value = true;
    const contentEl = content.value;
    const patchedEls = new Set<Element>();
    restoreFns = [];

    const patchEl = (el: Element) => {
      if (!el || patchedEls.has(el)) return;
      patchedEls.add(el);
      try {
        if (el.hasAttribute && el.hasAttribute('autofocus')) el.removeAttribute('autofocus');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('readonly', 'true');
        } else if ((el as HTMLElement).isContentEditable) {
          el.setAttribute('contenteditable', 'false');
        }
        try {
          (el as any)._origFocus = (el as HTMLElement).focus;
          (el as HTMLElement).focus = function () {
            /* noop */
          };
        } catch {
          /* ignore */
        }
        restoreFns!.push(() => {
          try {
            if ((el as any)._origFocus) (el as HTMLElement).focus = (el as any)._origFocus;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
              if (el.hasAttribute('readonly')) el.removeAttribute('readonly');
            } else if (el.getAttribute && el.getAttribute('contenteditable') === 'false') {
              el.setAttribute('contenteditable', 'true');
            }
          } catch {
            /* ignore */
          }
        });
      } catch {
        /* ignore */
      }
    };

    const patchElementRecursively = (node: Node) => {
      if (!node || node.nodeType !== 1) return;
      const element = node as Element;
      try {
        if (element.matches && element.matches('input, textarea, [contenteditable]')) {
          patchEl(element);
        }
        const children = element.querySelectorAll?.('input, textarea, [contenteditable]');
        if (children && children.length) {
          Array.prototype.forEach.call(children, (c: Element) => patchEl(c));
        }
      } catch {
        /* ignore */
      }
    };

    try {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
            Array.prototype.forEach.call(m.addedNodes, (n: Node) => patchElementRecursively(n));
          }
          if (m.type === 'attributes' && m.attributeName === 'autofocus') {
            try {
              m.target.removeAttribute('autofocus');
            } catch {
              /* ignore */
            }
          }
        });
      });
      observer.observe(contentEl, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['autofocus'],
      });
      patchElementRecursively(contentEl);
    } catch {
      /* ignore observer errors */
    }

    xlsxPreviewer = jsPreviewExcel.init(contentEl);
    xlsxPreviewer.preview(props.value).then(
      () => {
        isLoading.value = false;
        setTimeout(() => {
          try {
            const active = document.activeElement as HTMLElement | null;
            if (
              active &&
              (active.tagName === 'INPUT' ||
                active.tagName === 'TEXTAREA' ||
                active.isContentEditable)
            ) {
              active.blur();
            }
          } catch {
            /* ignore */
          }
          cleanupObserver();
        }, 50);
      },
      () => {
        isLoading.value = false;
        setTimeout(() => {
          try {
            const active = document.activeElement as HTMLElement | null;
            if (
              active &&
              (active.tagName === 'INPUT' ||
                active.tagName === 'TEXTAREA' ||
                active.isContentEditable)
            ) {
              active.blur();
            }
          } catch {
            /* ignore */
          }
          cleanupObserver();
        }, 50);
      },
    );
  }
}

watch(() => props.value, init);

onMounted(() => {
  init();
});

onUnmounted(() => {
  if (xlsxPreviewer) {
    xlsxPreviewer.destroy();
    xlsxPreviewer = null;
  }
  cleanupObserver();
});
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
