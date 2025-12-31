<template>
  <div v-if="selectedTab === 'attr'">
    <el-form ref="formRef" v-if="schema" :model="initValues" label-width="auto" label-position="left" :class="$style.propertyPanel">
      <SItem :key="selectedNode.id" :schema="schema" :data="initValues" :handleFieldChange="handleFieldChange" :selected-node="selectedNode"></SItem>
    </el-form>
  </div>
</template>

<script>
import { pcSchema } from './schema';
import groupHandlers, { getFormItemControlNode } from './fields';
import SItem from './render/s-item.vue';
import { eventBus } from '@/components/cw-form-designer/utils';
import { batchOperate } from '@/mini-nasl/utils';
import * as sharedUtils from './shared';

export default {
  name: 'attr-panel',
  components: {
    SItem,
  },
  props: {
    selectedTab: {
      type: String,
    },
    selectedNode: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      schema: null,
      initValues: null,
      fieldGroupMap: {},
      activeName: 'property',
      dataSource: [
        { label: '属性', value: 'property' },
        { label: '样式', value: 'style' },
      ],
    };
  },
  watch: {
    selectedNode: {
      handler(newVal) {
        this.getSchema(newVal);
        this.getInitValues(newVal);
      },
      immediate: true,
    },
  },
  computed: {
    // 是否是子表单节点
    isSubFormNode() {
      return sharedUtils.isSubFormNode(this.selectedNode);
    },
    // 是否是子表单列节点
    isSubFormColumnNode() {
      return sharedUtils.isSubFormColumnNode(this.selectedNode);
    },
  },
  methods: {
    getSchema(selectedNode) {
      if (!selectedNode.nodePath) {
        this.schema = Object.create(null);
        return;
      }
      const pickSchema = (tag) => pcSchema[tag] || Object.create(null);
      const mergeChildren = (schema, extraChildren = []) => {
        const currentChildren = Array.isArray(schema.children) ? schema.children : [];
        return {
          ...schema,
          children: [...extraChildren, ...currentChildren],
        };
      };

      if (selectedNode.tag === 'u-form') {
        this.schema = pickSchema('u-form');
      } else if (this.isSubFormNode) {
        this.schema = pickSchema('u-sub-form');
      } else if (this.isSubFormColumnNode) {
        const controlNode = sharedUtils.getSubFormColumnControlNode(selectedNode);
        if (controlNode) {
          const controlSchema = pickSchema(controlNode.tag);
          const tableViewColumnSchema = pickSchema('u-table-view-column');
          this.schema = mergeChildren(controlSchema, [tableViewColumnSchema]);
        }
      } else if (selectedNode.tag === 'u-form-item') {
        const controlNode = getFormItemControlNode(selectedNode);
        if (controlNode) {
          const controlSchema = pickSchema(controlNode.tag);
          const formItemSchema = pickSchema('u-form-item');
          this.schema = mergeChildren(controlSchema, [formItemSchema]);
        }
      }
    },
    getInitValues(selectedNode) {
      if (!this.schema || !selectedNode.nodePath) return {};
      const initGroups = {
        groups: {
          form: [],
          'form-item': [],
          control: [],
          'table-view-column': [],
        },
        map: {},
      };
      const collectFieldGroups = (schema, acc = initGroups) => {
        if (!schema?.children) return acc;

        schema.children.forEach((child) => {
          const { field, group } = child;
          if (field && group && acc.groups[group]) {
            acc.groups[group].push(field);
            acc.map[field] = group;
          }
          collectFieldGroups(child, acc);
        });

        return acc;
      };

      const { groups: fieldKeys, map: fieldGroupMap } = collectFieldGroups(this.schema);
      this.fieldGroupMap = fieldGroupMap;

      let res = {};
      Object.keys(fieldKeys).forEach((group) => {
        fieldKeys[group].forEach((key) => {
          const handler = groupHandlers[group]?.[key]?.getValue;
          if (handler) {
            const targetNode = this.getTargetNode({ node: selectedNode, group, key });
            if (targetNode) {
              res[key] = handler?.({ node: targetNode, key });
            }
          }
        });
      });
      this.initValues = res;
    },
    getTargetNode({ node, group, key }) {
      if (!node || typeof group !== 'string') return null;

      if (['form', 'form-item'].includes(group)) {
        return node;
      } else if (group === 'control') {
        if (this.isSubFormColumnNode) {
          return sharedUtils.getSubFormColumnControlNode(node);
        }
        return getFormItemControlNode(node);
      } else if (group === 'table-view-column') {
        return groupHandlers[group]?.[key]?.getSelectedNode?.({ node, key });
      }
    },
    async handleFieldChange(key, value, oldValue) {
      // console.log('handleFieldChange', key, value);
      // 获取字段的分组
      const group = this.fieldGroupMap[key];
      // 获取处理该字段的函数
      const handler = groupHandlers[group]?.[key]?.setValue;
      if (handler) {
        // 批量操作更新面板属性
        const hasError = await batchOperate(this.selectedNode?.view, '更新面板属性', async () => {
          const targetNode = this.getTargetNode({ node: this.selectedNode, group, key });
          if (targetNode) {
            await handler?.({ node: targetNode, key, value, oldValue });
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" module>
.propertyPanel {
  [class^='el-form-item'] {
    height: 32px;
    line-height: 32px;
  }
  [class^='el-form-item__label'] {
    font-size: 12px;
    margin-left: unset !important;
  }
  [class^='el-form-item__content'] {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
