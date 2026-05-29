<template>
  <span :class="$style.root">
    <i :class="$style.item"></i>
    <i :class="$style.item"></i>
    <i :class="$style.item"></i>
  </span>
</template>

<style module>
:root {
  --cw-bubble-loading-background-color: #337EFF;
  --cw-bubble-loading-background-color-light: #337EFF66;
}
.root {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 0 4px;
}
.item {
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: var(--cw-bubble-loading-background-color);
  border-radius: 50%;
  animation: loading 1.5s infinite ease-in-out both;
}
.root i:nth-child(1) {
  animation-delay: -0.4s;
}

.root i:nth-child(2) {
  animation-delay: -0.2s;
}

@keyframes loading {
  0%,
  80%,
  100% {
    transform: scale(1);
    background: var(--cw-bubble-loading-background-color-light);
  }
  40% {
    transform: scale(1.5);
    background: var(--cw-bubble-loading-background-color);
  }
}
</style>
