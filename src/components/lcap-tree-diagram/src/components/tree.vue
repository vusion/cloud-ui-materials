<template>
  <div class="lcap-tree-container">
    <div class="lcap-tree" :class="{horizontal, collapsable}">
      <lcap-tree-node
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        :selected-class-name="selectedClassName"
        :selected-key="selectedKey"
        :showChildDotNum="showChildDotNum"
        @on-expand="(e, data) => $emit('on-expand', e, data)"
        @on-node-focus="(e, data) => $emit('on-node-focus', e, data)"
        @on-node-click="(e, data) => $emit('on-click', e, data)"
        @on-node-dbclick="(e, data) => $emit('on-dbclick', e, data)"
        @on-node-mouseover="(e, data) => $emit('on-mouseover', e, data)"
        @on-node-mouseout="(e, data) => $emit('on-mouseout', e, data)"
        @on-node-drag-start="(e, data) => onDragStart(e, data)"
        @on-node-drag-over="(e, data) => onDragOver(e, data)"
        @on-node-drop="(e, data) => onDrop(e, data)"
      />
    </div>
  </div>
</template>

<script>
import render from "./node";

export default {
  name: "lcapTree",
  data() {
    return {
      dragState: {
        dragg: null,
        drop: null,
      },
    };
  },
  components: {
    'lcap-tree-node': {
      render,
      functional: true,
    },
  },
  props: {
    data: {
      // type: Object,
      type: [Array, Object, Function],
      required: true,
    },
    textField: { type: String, default: 'label' },
    props: {
      type: Object,
      default: function() {
        return {
          label: this.textField,
          expand: "expand",
          children: "children",
        }
      }
    },
    horizontal: { type: Boolean, default: true },
    selectedKey: String,
    collapsable: Boolean,
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [Function, String],
    selectedClassName: [Function, String],
    showChildDotNum: Boolean,
   
  },
  methods: {
    onDragStart(event, data) {
      let dragState = this.dragState;
      try {
        event.dataTransfer.setData("text/plain", "");
      } catch (e) {}
      dragState.drag = data;
    },
    onDragOver(event, data) {
      event.preventDefault();
    },
    onDrop(event, data) {
      event.preventDefault();
      let dragState = this.dragState;
      let drag = dragState.drag;
      dragState.drop = data;
      this.$emit("on-node-drop", event, drag, data);
    },
  },
};
</script>

<style lang="less">
@import "./tree";
</style>
