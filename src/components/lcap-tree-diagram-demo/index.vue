<template>
  <div :class="$style['tree-diagram']">
    <TreeItem
      v-for="(item, index) in dataFromDataSource"
      isRoot
      :key="index"
      :treeNodeData="item"
      :showChildDotNum="showChildDotNum"
      :textField="textField"
      :showTextEllipsis="showTextEllipsis"
      @on-node-toggle="onTogglePop"
      @on-click="click"
    >
      <!-- <template #dialog="dialog">
        <s-empty v-if="!$slots.dialog && $env.VUE_APP_DESIGNER"></s-empty>
        <slot v-else name="dialog" :item="dialog"></slot>
      </template> -->
    </TreeItem>
    <m-popper
      v-if="referenceEl"
      class="popper"
      ref="popper"
      :append-to="appendTo"
      :disabled="disabled || readonly"
      :placement="placement"
      :reference="referenceEl"
      trigger="manual"
      :opened="showPopper"
      style="--popper-box-shadow: none"
      @toggle="onToggle($event)"
      @close="onPopperClose"
    >
      <div :class="$style.popcontent" @click.stop>
        <div :class="[$style.edit]" @click.stop="onEdit">编辑</div>
        <div :class="[$style.delete]" @click.stop="onDelete">删除</div>
        <div :class="$style['recent-edit']">最近编辑</div>
        <div :class="$style.info">
          <span>{{ updateTime }}</span> <span>{{ updateBy }}</span>
        </div>
      </div>
    </m-popper>
  </div>
</template>
<script>
import TreeItem from './src/index';
import SEmpty from './src/s-empty/index';
import deepClone from 'lodash/cloneDeep';
import { get, set } from 'lodash';
import { addTreeLevel } from '../../utils';
import SupportDataSource from '../../mixins/support.datasource.js';
import { fakeData } from './fakeData.js';
export default {
  name: 'LcapTreeDiagramDemo',
  mixins: [SupportDataSource],
  components: {
    TreeItem,
    SEmpty,
  },
  props: {
    dataSource: {
      type: [Array, Object, Function],
    },
    showChildDotNum: { type: Boolean, default: true },
    showTextEllipsis: { type: Boolean, default: true },
    valueField: { type: String, default: 'id' },
    parentField: { type: String, default: 'parentId' },
    textField: { type: String, default: 'label' },
    appendTo: {
      type: String,
      default: 'body',
      validator: (value) => ['body', 'reference'].includes(value),
    },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    alignment: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right'].includes(value);
      },
    },
  },
  data() {
    return {
      customStyle: {},
      showPopper: false,
      referenceEl: null,
      env: !window.appInfo,
      dataFromDataSource: [],
      updateTime: '',
      updateBy: '',
    };
  },
  watch: {
    'currentDataSource.data': {
      async handler(val) {
        let dataFromDataSource = await this.handleDataSource(val);
        if (this.$env.VUE_APP_DESIGNER) {
          this.dataFromDataSource = fakeData;
        } else {
          this.dataFromDataSource = dataFromDataSource;
        }
      },
    },
  },
  computed: {
    placement() {
      if (this.alignment === 'left') return 'bottom-start';
      else if (this.alignment === 'right') return 'bottom-end';
    },
  },
  methods: {
    parseCustomStyle(element) {
      const cssList = element.style.cssText.split(';');
      const cssObj = {};
      cssList.forEach((item) => {
        const [key, value] = item.split(':');
        if (key && value) {
          cssObj[key.trim()] = value.trim();
        }
      });
      return cssObj;
    },
    listToTree(data, options) {
      const { valueField, parentField, childrenField } = options;
      const nodesMap = {};
      data.forEach((item) => {
        const id = get(item, valueField);
        if (id) {
          nodesMap[id] = item;
        }
      });
      const tree = [];
      data.forEach((item) => {
        this.$set(item, 'expand', true);
        const parentId = get(item, parentField);
        const parent = nodesMap[parentId];
        // 没有parentId 或者 parent不存在的不处理
        if (!parentId || !parent) {
          tree.push(item);
        } else {
          if (!get(parent, childrenField)) {
            set(parent, childrenField, []);
          }
          get(parent, childrenField).push(item);
        }
      });
      return tree;
    },
    async handleDataSource(val) {
      const temp = await this.listToTree(deepClone(val), {
        parentField: this.parentField,
        valueField: this.valueField,
        childrenField: 'children',
      });
      return addTreeLevel(temp);
    },
    async reload() {
      if (this.currentDataSource?.load) {
        this.load();
      }
    },
    onEdit() {
      this.showPopper = false;
      this.$emit('onEdit', this.curEventsData);
    },
    onDelete() {
      this.showPopper = false;
      this.$emit('onDelete', this.curEventsData);
    },
    onTogglePop(value) {
      this.$emit('onTogglePop', value);
      this.$refs.popper && this.$refs.popper.toggle(true);
    },
    onToggle($event) {
      this.$emit('toggle', $event);
      if ($event && $event.opened) {
        this.preventBlur = true;
      }
    },
    onPopperClose(e) {
      this.$emit('blur', e, this);
      this.showPopper = false;
      setTimeout(() => {
        // 为了不触发input的blur，否则会有两次blur
        this.preventBlur = false;
      }, 0);
    },
    click(e, data) {
      console.log(e, data);
      this.referenceEl = e.target;
      this.showPopper = !this.showPopper;
      e.item = data;
      e.value = get(data, this.valueField);
      this.curEventsData = e;
      this.updateTime = e.item?.updatedTime?.split('T')?.[0] || '2023-05-20';
      this.updateBy = e.item?.updateBy || '轻舟';
      this.$emit('click', e);
    },
  },
};
</script>
<style module>
.tree-diagram {
  display: inline-block;
  overflow: scroll;
}

.tree-diagram::-webkit-scrollbar {
  display: none;
}

.popper {
  z-index: 1;
  border-radius: 10px;
}

.popcontent {
  width: 160px;
  padding: 10px;
  user-select: none;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(3, 3, 3, 0.1);
  margin-top: 6px;
  border-radius: 10px;
}

.recent-edit {
  padding-left: 4px;
  color: #b5b6b6;
}

.info {
  padding-left: 4px;
  display: flex;
  justify-content: space-between;
}

.edit,
.delete,
.info {
  color: #0f0f0f;
  font-weight: 400;
  height: 30px;
  line-height: 30px;
  padding-left: 4px;
}

.edit:hover,
.delete:hover {
  background: #f8f8f8;
  border-radius: 6px;
  width: 100%;
  height: 30px;
  line-height: 30px;
}

.delete {
  margin: 10px auto;
}
</style>
