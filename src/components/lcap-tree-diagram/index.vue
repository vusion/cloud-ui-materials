<template>
  <div>
    <LcapTreeDiagram
      v-if="$env.VUE_APP_DESIGNER"
      :data="fakeData"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :label-class-name="labelClassName"
      :render-content="renderContent"
      :showChildDotNum="showChildDotNum"
      selected-key="selectedKey"
      :textField="textField"
      :isDesingerEnv="$env.VUE_APP_DESIGNER"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
      @on-click="click"
      @on-dbclick="dbclick"
      @on-mouseover="mouseover"
      @on-mouseout="mouseout"
      @on-node-toggle="onTogglePop"
    >
      <!-- <template #default="scope">
        <slot :item="scope.item"></slot>
        <s-empty v-if="
            $env.VUE_APP_DESIGNER &&
            $scopedSlots &&
            !(
              $scopedSlots.default &&
              $scopedSlots.default({
                ...scope,
              })
            ) &&
            !!$attrs['vusion-node-path']
          "></s-empty>
      </template> -->
    </LcapTreeDiagram>
    <LcapTreeDiagram
      v-else
      v-for="item in sourceData"
      :key="item.id"
      :data="item"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :label-class-name="labelClassName"
      :render-content="renderContent"
      :showChildDotNum="showChildDotNum"
      selected-key="selectedKey"
      :textField="textField"
      :isDesingerEnv="$env.VUE_APP_DESIGNER"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
      @on-click="click"
      @on-dbclick="dbclick"
      @on-mouseover="mouseover"
      @on-mouseout="mouseout"
      @on-node-toggle="onTogglePop"
    >
      <!-- <template #default="scope">
        <slot :item="scope.item"></slot>
        <s-empty v-if="
            $env.VUE_APP_DESIGNER &&
            $scopedSlots &&
            !(
              $scopedSlots.default &&
              $scopedSlots.default({
                ...scope,
              })
            ) &&
            !!$attrs['vusion-node-path']
          "></s-empty>
      </template> -->
    </LcapTreeDiagram>
    <m-popper
      v-if="referenceEl"
      class="popper"
      ref="popper"
      :append-to="appendTo"
      :disabled="disabled || readonly"
      :placement="placement"
      @toggle="onToggle($event)"
      @close="onPopperClose"
      :reference="referenceEl"
      trigger="manual"
      :opened="showPopper"
    >
      <div :class="$style.popcontent" @click.stop>
       <div :class="[$style.edit, dialogTextHover ? $style.hover : '']" @click.stop="onEdit">编辑</div>
       <div :class="[$style.delete, dialogDeleteHover ? $style.hover : '']" @click.stop="onDelete">删除</div>
       <div :class="$style.recent">最近编辑 2023-05-28 张三丰</div>
      </div>
    </m-popper>
  </div>
</template>

<script>
import LcapTreeDiagram from './src/components/tree.vue';
import SupportDataSource from './src/mixins/support.datasource.js';
import deepClone from 'lodash/cloneDeep'
import { addCurIndex } from './src/util.js'

export default {
  name: 'lcap-tree-diagram',
  mixins: [SupportDataSource],
  components: {
    LcapTreeDiagram,
  },
  props: {
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
  },
  data() {
    return {
      showPopper: false,
      referenceEl: null,
      dialogTextHover: false,
      dialogDeleteHover: false,
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
      }
    };
  },
  computed: {
    placement() {
        if (this.alignment === 'left')
            return 'bottom-start';
        else if (this.alignment === 'right')
            return 'bottom-end';
    },
  },
  watch: {
    'currentDataSource.data': {
      handler(val) {
        let temp = this.normalize(deepClone(val), this.parentField, this.valueField) || [];
        this.sourceData = addCurIndex(temp)
      },
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.popper && this.$refs.popper.toggle(true);
    // })
  },
  methods: {
    onEdit(e, data) {
      this.dialogDeleteHover = false;
      this.dialogTextHover = !this.dialogTextHover
      console.log(this.curEventsData)
      // e.value = data[this.valueField];
      this.$emit('onEdit', this.curEventsData);
    },
    onDelete(e, data) {
      this.dialogTextHover = false;
      this.dialogDeleteHover = !this.dialogDeleteHover
      this.$emit('onDelete', this.curEventsData);
    },
    onTogglePop(value) {
      this.$emit('onTogglePop', value);
      this.$refs.popper && this.$refs.popper.toggle(true);
    },
    onToggle($event) {
      // debugger
      this.$emit('toggle', $event);
      if ($event && $event.opened) {
          this.preventBlur = true;
      }
    },
    onPopperClose(e) {
      this.$emit('blur', e, this);
      this.showPopper = false;
      setTimeout(() => { // 为了不触发input的blur，否则会有两次blur
          this.preventBlur = false;
      }, 0);
    },
    dbclick(e, data) {
      let $events = Object.assign(e, data)
      this.$emit('dbclick', $events);
    },
    mouseover(e, data) {
      let $events = Object.assign(e, data)
      this.$emit('mouseover', $events);
    },
    mouseout(e, data) {
      let $events = Object.assign(e, data)
      this.$emit('mouseout', $events);
    },
    click(e, data) {
      this.referenceEl = e.target
      this.showPopper = !this.showPopper;
      e.item = data;
      e.value = data[this.valueField];
      this.curEventsData = e
      this.$emit('click',  e);
    },
    normalize(list, pField, vField) {
      let result = [];
      const map = list?.reduce((res, v, index) => {
         v.curIndex = index;
        res[v[vField]] = v;
        return res;
      }, {});
      for (let item of list) {
        this.$set(item, 'expand', true);
        const parentId = item[pField];
        if (parentId === 0) {
          item.curIndex = 1;
          result.push(item)
          continue
        }
        if (map[item[pField]]) {
          const parent = map[item[pField]]
          parent.children = parent.children || [];
          parent.children.push(item)
        }
      }
      return result
    },
    labelClassName() {
      return 'clickable-node';
    },
    renderContent(h, data) {
      return data[this.textField]
    },
    onExpand(e, data) {
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
  }
}  
</script>

<style module>
.clickable-node {
  background: red;
  border: 1px solid green;
  color: pink;
}

.popper {
  z-index: 1;
  box-shadow: 0 0 2px rgba(0, 0, 0, .15);
  border-radius: 10px;
}

.popcontent {
  width: 200px;
  padding: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: 0 0 2px rgba(0, 0, 0, .15);
}

.edit, .delete {
  color: #000;
}

.delete {
  margin: 10px auto;
}
.recent {
  /* color: #eee; */
}

.hover {
  background: #eaf2ff;
}
</style>
