<template>
  <Transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
const old = {
  paddingTop: '',
  paddingBottom: '',
  overflow: '',
};

function beforeEnter(el: Element) {
  const hel = el as HTMLElement;
  old.paddingTop = hel.style.paddingTop;
  old.paddingBottom = hel.style.paddingBottom;
  hel.style.height = '0';
  hel.style.paddingTop = '0';
  hel.style.paddingBottom = '0';
}

function enter(el: Element) {
  const hel = el as HTMLElement;
  old.overflow = hel.style.overflow;
  hel.style.height = hel.scrollHeight ? `${hel.scrollHeight}px` : '';
  hel.style.paddingTop = old.paddingTop;
  hel.style.paddingBottom = old.paddingBottom;
  hel.style.overflow = 'hidden';
}

function afterEnter(el: Element) {
  const hel = el as HTMLElement;
  hel.style.height = '';
  hel.style.overflow = old.overflow;
}

function beforeLeave(el: Element) {
  const hel = el as HTMLElement;
  old.paddingTop = hel.style.paddingTop;
  old.paddingBottom = hel.style.paddingBottom;
  old.overflow = hel.style.overflow;
  hel.style.height = `${hel.scrollHeight}px`;
  hel.style.overflow = 'hidden';
}

function leave(el: Element) {
  const hel = el as HTMLElement;
  if (hel.scrollHeight) {
    hel.style.height = '0';
    hel.style.paddingTop = '0';
    hel.style.paddingBottom = '0';
  }
}

function afterLeave(el: Element) {
  const hel = el as HTMLElement;
  hel.style.height = '';
  hel.style.overflow = old.overflow;
  hel.style.paddingTop = old.paddingTop;
  hel.style.paddingBottom = old.paddingBottom;
}
</script>
