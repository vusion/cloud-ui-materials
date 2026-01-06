<template>
  <div class='print-view-split-header' :class="[$style.root, {
    [$style.designerPrintHeader]: $env.VUE_APP_DESIGNER
  }]" >
    <slot name="default"></slot>
  </div>
  </template>
  <script>
  export default {
    name: 'cut-print-header',
    props: {},
  };
  </script>
  <style module>
  .root {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
    height: 100%;
  }
  .designerPrintHeader {
    height: 20px;
  }
  </style>
  