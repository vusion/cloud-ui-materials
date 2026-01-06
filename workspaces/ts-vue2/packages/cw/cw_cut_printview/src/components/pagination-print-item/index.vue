<template>
  <div class='print-view-split-line' :class="[$style.root, {
    ['print-view-split-landscape']: isHorizontal,
    [$style.designerPrintSplit]: $env.VUE_APP_DESIGNER
  }]" >
    <u-text v-if="$env.VUE_APP_DESIGNER">分页占位符，打印时不会显示</u-text>
  </div>
  </template>
  <script>
  export default {
    name: 'pagination-print-item',
    props: {
      isHorizontal: {
        type: Boolean,
        default: false,
      },
    },
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
  .designerPrintSplit {
    border: 2px dashed #ddd;
    height: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin: 10px;
  }
  </style>
  