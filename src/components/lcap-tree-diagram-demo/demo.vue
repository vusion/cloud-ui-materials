<template>
  <div>
    <LcapTreeDiagram v-if="false" :data="fakeData" :horizontal="horizontal" :collapsable="collapsable" :label-class-name="labelClassName" :render-content="renderContent" :showChildDotNum="showChildDotNum" selected-key="selectedKey"
      :textField="textField" :isDesingerEnv="$env.VUE_APP_DESIGNER" @on-expand="onExpand" @on-node-click="onNodeClick" @on-node-toggle="onTogglePop">
    </LcapTreeDiagram>
    <LcapTreeDiagram v-else v-for="item in dataFromDataSource" :key="item.id" :data="item" :horizontal="horizontal" :collapsable="collapsable" :label-class-name="labelClassName" :render-content="renderContent"
      :showChildDotNum="showChildDotNum" selected-key="selectedKey" :textField="textField" :isDesingerEnv="$env.VUE_APP_DESIGNER" @on-expand.stop="onExpand" @on-node-click="onNodeClick" @on-click="click" @on-node-toggle="onTogglePop">
    </LcapTreeDiagram>
    <m-popper v-if="referenceEl" class="popper" ref="popper" :append-to="appendTo" :disabled="disabled || readonly" :placement="placement" @toggle="onToggle($event)" @close="onPopperClose" :reference="referenceEl" trigger="manual"
      :opened="showPopper" style="--popper-box-shadow: none">
      <div :class="$style.popcontent" @click.stop>
        <div :class="[$style.edit]" @click.stop="onEdit">编辑</div>
        <div :class="[$style.delete]" @click.stop="onDelete">删除</div>
        <div :class="$style['recent-edit']">最近编辑 </div>
        <div :class="$style.info"><span>{{ updateTime }}</span> <span>{{updateBy}}</span></div>
      </div>
    </m-popper>
  </div>
</template>

<script>
import LcapTreeDiagram from './src/components/tree.vue';
import deepClone from 'lodash/cloneDeep';
import { addTreeLevel, normalizeDataSource } from '../../utils';

export default {
  name: 'DemoItem',
  components: {
    LcapTreeDiagram,
  },
  props: {
    dataSource: {
      type: [Array, Object, Function],
    },
    showChildDotNum: { type: Boolean, default: true },
    valueField: { type: String, default: 'id' },
    parentField: { type: String, default: 'parentId' },
    textField: { type: String, default: 'label' },
    appendTo: {
      type: String,
      default: 'body',
      validator: (value) => ['body', 'reference'].includes(value),
    },
    disabled: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: {
      type: String,
      default() {
        // return this.$t('selectDateText');
      },
    },
    alignment: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right'].includes(value);
      },
    },
    dataEntity: { type: String, default: '' },
  },
  data() {
    return {
      showPopper: false,
      referenceEl: null,
      env: !window.appInfo,
      expandAll: false,
      horizontal: true,
      collapsable: true,
      sourceData: [],
      curEventsData: {},
      fakeData: {
        id: 1,
        label: 'XXXPOC测试',
        parentId: 0,
        expand: true,
        curIndex: 1,
        children: [
          {
            id: 2,
            label: '产品研发部',
            parentId: 1,
            expand: true,
            curIndex: 2,
            children: [
              {
                id: 5,
                label: '研发-前端',
                parentId: 2,
                expand: true,
                curIndex: 3,
              },
              {
                id: 6,
                label: '研发-后端1',
                parentId: 2,
                expand: true,
                curIndex: 3,
                children: [
                  {
                    id: 8,
                    label: '研发-后端11研发-',
                    parentId: 2,
                    expand: true,
                    curIndex: 3,
                  },
                ],
              },
            ],
          },
          {
            id: 10,
            label: '研发',
            parentId: 2,
            expand: true,
            curIndex: 2,
          },
        ],
      },
      updateBy: '轻舟',
      updateTime: '',
      dataFromDataSource: [],
    };
  },
  computed: {
    placement() {
      if (this.alignment === 'left') return 'bottom-start';
      else if (this.alignment === 'right') return 'bottom-end';
    },
  },
  watch: {
    dataSource: {
      async handler(val) {
        let dataFromDataSource = await this.handleDataSource(
          normalizeDataSource(val).data,
        );
        this.dataFromDataSource = dataFromDataSource;
      },
      immediate: true,
    },
  },

  methods: {
    async handleDataSource(val) {
      const temp = await this.normalize(deepClone(val), {
        parentField: this.parentField,
        valueField: this.valueField,
        childrenField: 'children',
        dEntity: this.dataEntity,
      });
      return addTreeLevel(temp);
    },
    async reload() {
      this.dataFromDataSource = await this.handleDataSource(this.dataSource);
    },

    onEdit(e, data) {
      this.showPopper = false;
      this.$emit('onEdit', this.curEventsData);
    },
    onDelete(e, data) {
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
      this.dialogEditHover = false;
      setTimeout(() => {
        // 为了不触发input的blur，否则会有两次blur
        this.preventBlur = false;
      }, 0);
    },

    click(e, data) {
      this.referenceEl = e.target;
      this.showPopper = !this.showPopper;
      e.item = data;
      e.value = data[this.valueField];
      this.curEventsData = e;

      this.updateTime = e.item?.updatedTime?.split('T')?.[0];
      this.updateBy = e.item?.updateBy;
      this.$emit('click', e);
    },
    normalize(list, options) {
      const { parentField: pField, valueField: vField, dEntity } = options;

      let tempArr = [];
      tempArr = list?.map((item) => {
        if (dEntity) {
          return item[dEntity];
        } else {
          return item;
        }
      });

      let result = [];
      const map = tempArr?.reduce((res, v) => {
        res[v[vField]] = v;
        return res;
      }, {});
      for (let item of tempArr) {
        this.$set(item, 'expand', true);
        const parentId = item[pField];
        if (parentId === 0) {
          item.curIndex = 1;
          result.push(item);
          continue;
        }
        if (map[item[pField]]) {
          const parent = map[item[pField]];
          parent.children = parent.children || [];
          parent.children.push(item);
        }
      }
      return result;
    },
    labelClassName() {
      return 'clickable-node';
    },
    renderContent(h, data) {
      return data[this.textField];
    },
    onExpand(e, data) {
      this.expandEvent = e.target.dataset.btn === 'true';
      if ('expand' in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, 'expand', true);
      }
    },
    onNodeClick(e, data) {
      console.log('onNodeClick: %o', data);
      this.$set(data, 'selectedKey', !data.selectedKey);
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    collapse(list) {
      let _this = this;
      list.forEach(function (child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    toggleExpand(data, val) {
      let _this = this;
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, 'expand', val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, 'expand', val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>

<style module>
.popper {
  z-index: 1;
  border-radius: 10px;
}

.popcontent {
  width: 160px;
  padding: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #fff;
  -webkit-box-sizing: border-box;
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
