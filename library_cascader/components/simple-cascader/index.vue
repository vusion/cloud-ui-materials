<template>
  <cascader
    :allowClear="true"
    :showSearch="true"
    :options="options"
    :placeholder="placeholder"
    :value="value"
    @change="onChange"
  />
</template>

<script>
import Cascader from "ant-design-vue/lib/cascader";
import "ant-design-vue/lib/cascader/style/css";
export default {
  name: "simple-cascader",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    originOptions: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  components: {
    Cascader,
  },
  data() {
    return {};
  },
  computed: {
    options() {
      return this.transformData(this.originOptions);
    },
  },
  methods: {
    onChange(value) {
      console.log("value", value);
      this.$emit("update:value", value);
    },
    transformData(data) {
      return data.map((item) => {
        const transformedItem = {
          value: item.id,
          label: item.name,
        };

        if (item.children && item.children.length > 0) {
          transformedItem.children = this.transformData(item.children);
        }

        return transformedItem;
      });
    },
  },
};
</script>

<style>
.ant-cascader-menus {
  position: absolute;
  z-index: 10510;
  font-size: 14px;
  white-space: nowrap;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled),
.ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover {
  font-weight: 600;
  background-color: #e0f1ff;
  color: #004fd6;
}
</style>
