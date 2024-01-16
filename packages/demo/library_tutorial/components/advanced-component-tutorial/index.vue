<template>
  <div>
    <a-tree-select
      style="width: 100%"
      :value="value"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :tree-data="options"
      :placeholder="placeholder"
      :allowClear="allowClear"
      :size="size"
      @change="onChange"
    >
    </a-tree-select>
    <img :src="icon" alt="" />
  </div>
</template>

<script>
import ATreeSelect from "ant-design-vue/lib/tree-select";
import "ant-design-vue/lib/tree-select/style/css";

// 示例中以 【vue：】开头的为vue2语法，如有困惑可以参考 https://v2.vuejs.org/ 文档
// 示例中以 【cw：】开头的为低代码组件特定需要，需要引起注意

const options = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
        disabled: true,
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];
export default {
  name: "advanced-component-tutorial", // 组件名，脚手架初始化时自动生成，勿修改
  components: { ATreeSelect }, // 引入组件
  // 注意：props需要与yaml配置一一对应配合使用，否则无法在低代码ide右侧的配置栏中使用
  props: {
    // vue2：props为property的缩写，用于继承（inherit）父级组件的参数
    placeholder: {
      // vue2: 简单类型，这里以String为例
      type: String,
      default: "默认值--用于测试简单类型传参", // 简单类型可以直接使用default
    },
    options: {
      type: [Array, Function], // 或
      default() {
        // 复杂类型默认值必须通过函数返回值的方式抛出
        return [];
      },
    },
    size: {
      type: String,
      default: "default",
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: undefined,
      treeData,
    };
  },
  methods: {
    onChange(value) {
      console.log("当前选中值", value);
      this.value = value;
      this.$emit("change", value); // 将value值进行抛出，这可以是ide的事件callback中可以获取到
      this.$emit("update:placeholder", value); // 实现双向数据绑定，ide中如果配置开启【是否将组件输入赋值给变量】，则会直接赋值给ide中传入的局部变量
    },
    onSearch() {
      console.log(...arguments);
    },
    onSelect() {
      console.log(...arguments);
    },
    advancedLogicTutorial(index) {
      console.log('参数', index)
    },
  },
};
</script>

<style></style>
