<template>
 <base-component />
</template>
<script>
/**
 * 组件文档地址： https://tdesign.tencent.com/vue/components/cascader
 */
import { BaseComponent, lowCodeFormFieldMixin } from 'virtual-lcap:lcap-ui';
import '@lcap-ui/dist-theme/index.css';
export default {
  name: 'cw-el-cascader-pro',
  inheritAttrs: false,
  mixins: [lowCodeFormFieldMixin('cw-el-cascader-pro', 'cw-el-form-cascader-pro')],
  props: {
    popupProps: {

    }
  },
  components: {
    BaseComponent,
  },
};
</script>
<style>
.el-p-cascader__popup {
  z-index: 10000;
}
.el-p-cascader .el-p-fake-arrow {
  color: #999999;
}
.el-p-cascader__item.el-p-is-selected  {
  color: #337EFF;
}
</style>
