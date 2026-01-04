<template>
  <div :class="$style.root">
    <div :class="$style.spaceBetweenSection">
      <span :class="[$style.leftAttributeTitle, $style.underline]">子表单字段</span>
      <el-popover
        popper-class="cw-form-designer-library-sub-form-popover"
        placement="bottom-end"
        trigger="click"
        :visible-arrow="false"
        :open-delay="0"
      >
        <template #reference>
          <s-others-icon size="small" hover name="add2"></s-others-icon>
        </template>
        <div class="renderListSection" v-for="item in selectableComponents" :key="item.tag" @click.stop="selectRenderList(item)">
          <s-toolbox-icon class="renderListIcon" :name="`page-${item.icon}`"></s-toolbox-icon>
          <span>{{ item.title }}</span>
        </div>
      </el-popover>
    </div>

    <div :class="$style.spaceBetweenSection">
      <span :class="$style.leftAttributeTitle">序号</span>
      <s-others-icon
        hover
        :name="indexColumnHidden ? 'hide' : 'show'"
        @click.stop="handleInitialColumnDisplayStatus('index', indexColumnHidden)"
      ></s-others-icon>
    </div>
    <!-- 可排序、非初始化列部分 -->
    <s-drag-field key="fieldList" :fieldList="fieldList" @drop="(...args) => onDrop(...args, updateFieldList)">
      <template #section="{ item, index }">
        <div :class="$style.fieldSection">
          <s-others-icon style="font-size: 20px" :class="$style.renderListIcon" name="drag" hover :draggable="true" :dragBtn="true"></s-others-icon>
          <s-toolbox-icon :class="$style.renderListIcon" :name="`page-${item.icon}`"></s-toolbox-icon>
          <el-input
            :class="$style.fieldInput"
            v-model="item.label"
            placeholder="请输入标题"
            @change="(value) => handleFieldTitle(value, item)"
          ></el-input>
          <s-others-icon hover name="remove2" @click.stop="handleDelField(item)"></s-others-icon>
        </div>
      </template>
    </s-drag-field>
    <div
      ref="dropAreaRef"
      data-drop-area
      :class="$style.dropArea"
      @dragover.prevent="handDropAreaOver"
      @dragleave="handleDropAreaDragLeave"
      @drop.prevent="handleDropAreaDrop"
    >
      <s-others-icon :class="$style.dropAreaIcon" name="drag-in-copy"></s-others-icon>
      <span>拖入属性添加</span>
    </div>

    <div :class="$style.spaceBetweenSection">
      <span :class="$style.leftAttributeTitle">操作列</span>
      <s-others-icon
        hover
        :name="actionColumnHidden ? 'hide' : 'show'"
        @click.stop="handleInitialColumnDisplayStatus('action', actionColumnHidden)"
      ></s-others-icon>
    </div>
    <!-- 子表单操作按钮部分 -->
    <div :class="$style.spaceBetweenSection">
      <span :class="[$style.leftAttributeTitle, $style.underline]">子表单操作按钮</span>
      <el-popover
        popper-class="cw-form-designer-library-sub-form-popover"
        placement="bottom-end"
        trigger="click"
        :visible-arrow="false"
        :open-delay="0"
      >
        <template #reference>
          <s-others-icon size="small" hover name="add2"></s-others-icon>
        </template>
        <div
          v-for="item in actionBtnList"
          :key="item.type"
          class="btnSelectSection"
          :disabled="!item.hide"
          @click.stop="selectOperateBtnOrLink(item, 'btn')"
        >
          <span>{{ item.typeName }}</span>
        </div>
      </el-popover>
    </div>
    <s-drag-field key="actionBtnList" :fieldList="displayedActionBtnList" @drop="(...args) => onDrop(...args, updateActionBtnList)">
      <template #section="{ item, index }">
        <div v-if="!item.hidden" :class="$style.fieldSection">
          <s-others-icon style="font-size: 20px" :class="$style.renderListIcon" name="drag" hover :draggable="true" :dragBtn="true"></s-others-icon>
          <el-input
            :class="$style.fieldInput"
            v-model="item.label"
            placeholder="请输入标题"
            @change="(value) => updateConfig(value, item, 'text')"
          ></el-input>
          <div :class="$style.operateButton">
            <s-others-icon hover name="more" size="small" @click.stop="handleEditOption($event, item, 'btn')"></s-others-icon>
          </div>
          <s-others-icon hover name="remove2" @click.stop="onDelOperateBtnOrLink(item, 'btn')"></s-others-icon>
        </div>
      </template>
    </s-drag-field>

    <!-- 公用的虚拟弹出框 -->
    <u-virtual-popover
      ref="virtualPopover"
      placement="top"
      width="340px"
      :virtual-ref="triggerElement"
      :close-delay="0"
      popper-class="cw-form-designer-library-virtual-popover"
    >
      <div class="popoverHeader" style="width: 340px">
        <div>“{{ activeOption.typeName }}”操作按钮配置</div>
        <s-others-icon name="close" hover size="small" @click="handleClosePopover" />
      </div>
      <div class="popoverContent" style="padding: 10px 14px 10px 24px">
        <el-form :inline="false" label-position="left" label-width="70px">
          <el-form-item label="显示名">
            <el-input v-model="activeOption.label" placeholder="请输入显示名" @change="(value) => updateConfig(value, activeOption, 'text')" />
          </el-form-item>
          <el-form-item :label="activeOption.operateType === 'btn' ? '主题颜色' : '样式类型'">
            <el-select
              style="width: 100%"
              v-model="activeOption.color"
              placeholder="请选择"
              @change="(value) => updateConfig(value, activeOption, 'color')"
            >
              <el-option
                v-for="item in activeOption.operateType === 'btn' ? btnColorList : linkColorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </u-virtual-popover>

    <!-- 子表单操作列link部分 -->
    <div :class="$style.spaceBetweenSection">
      <span :class="[$style.leftAttributeTitle, $style.underline]">操作列按钮</span>
      <el-popover
        popper-class="cw-form-designer-library-sub-form-popover"
        placement="bottom-end"
        trigger="click"
        :visible-arrow="false"
        :open-delay="0"
      >
        <template #reference>
          <s-others-icon size="small" hover name="add2"></s-others-icon>
        </template>
        <div
          v-for="item in actionLinkList"
          :key="item.type"
          class="btnSelectSection"
          :disabled="!item.hide"
          @click.stop="selectOperateBtnOrLink(item, 'link')"
        >
          <span>{{ item.typeName }}</span>
        </div>
      </el-popover>
    </div>
    <s-drag-field key="actionLinkList" :fieldList="displayedActionLinkList" @drop="(...args) => onDrop(...args, updateActionLinkList)">
      <template #section="{ item, index }">
        <div v-if="!item.hidden" :class="$style.fieldSection">
          <s-others-icon style="font-size: 20px" :class="$style.renderListIcon" name="drag" hover :draggable="true" :dragBtn="true"></s-others-icon>
          <el-input
            :class="$style.fieldInput"
            v-model="item.label"
            placeholder="请输入标题"
            @change="(value) => updateConfig(value, item, 'text')"
          ></el-input>
          <div :class="$style.operateButton">
            <s-others-icon hover name="more" size="small" @click.stop="handleEditOption($event, item, 'link')"></s-others-icon>
          </div>
          <s-others-icon hover name="remove2" @click.stop="onDelOperateBtnOrLink(item, 'link')"></s-others-icon>
        </div>
      </template>
    </s-drag-field>

    <!-- 子表单分页器 -->
    <s-table-pagination :class="$style.leftAttributeTitle" style="margin-top: 10px" :subForm="subForm" :showUnderline="true"></s-table-pagination>
  </div>
</template>

<script>
import STablePagination from './basic/s-table-pagination.vue';
import SDragField from './basic/s-drag-field.vue';
import UVirtualPopover from './basic/u-virtual-popover.vue';
import * as sharedUtils from '../shared';
import { componentMaterials } from '@/components/cw-form-designer/config';
import { batchOperate } from '@/mini-nasl/utils';
import * as utils from '@/components/cw-form-designer/utils';
import { eventBus } from '@/components/cw-form-designer/utils';
import { getAttrValue, setAttrValue } from '../fields';

const btnBasicList = [
  {
    label: '添加',
    type: 'addBtn',
  },
  {
    label: '导出',
    type: 'exportBtn',
  },
];
const btnColorList = [
  {
    label: '主要按钮',
    value: 'primary',
  },
  {
    label: '次要按钮',
    value: 'primary_secondary',
  },
  {
    label: '普通按钮',
    value: 'default',
  },
  {
    label: '危险操作按钮',
    value: 'danger',
  },
  {
    label: '次要危险按钮',
    value: 'danger_secondary',
  },
];

const linkBasicList = [
  {
    label: '复制',
    type: 'copyLink',
  },
  {
    label: '删除',
    type: 'deleteLink',
  },
];

const linkColorList = [
  {
    label: '默认',
    value: 'default',
  },
  {
    label: '浅色',
    value: 'light',
  },
  {
    label: '成功色',
    value: 'success',
  },
  {
    label: '警告色',
    value: 'warning',
  },
  {
    label: '危险色',
    value: 'danger',
  },
];

export default {
  name: 'SSubForm',
  components: {
    STablePagination,
    SDragField,
    UVirtualPopover,
  },
  props: {
    selectedNode: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    displayedActionBtnList() {
      return this.actionBtnList.filter((item) => !item.hide);
    },
    displayedActionLinkList() {
      return this.actionLinkList.filter((item) => !item.hide);
    },
  },
  data() {
    return {
      view: null,
      subForm: null, // 子表单节点
      validator: null, // 验证器节点
      indexColumn: null, // 序号列节点
      actionColumn: null, // 操作列节点
      addBtn: null, // 添加按钮节点
      exportBtn: null, // 导出按钮节点
      copyLink: null, // 复制链接节点
      deleteLink: null, // 删除链接节点
      selectableComponents: [],
      indexColumnHidden: false,
      actionColumnHidden: false,
      fieldList: [], // 字段列表
      operateRowList: [], // 操作行列表
      operateColumnList: [], // 操作列列表
      actionBtnList: [], // 操作行按钮列表
      actionLinkList: [], // 操作列链接列表
      triggerElement: null, // 触发元素
      activeOption: {},
      btnColorList,
      linkColorList,
    };
  },
  created() {
    // 获取可添加的组件列表
    this.getSelectableComponents();
    const { addBtn, exportBtn, copyLink, deleteLink, index, action, subForm, validator, operateRowList, operateColumnList } =
      sharedUtils.getSubFormNodeList(this.selectedNode);
    Object.assign(this, {
      view: this.selectedNode.view,
      subForm,
      addBtn,
      exportBtn,
      copyLink,
      deleteLink,
      validator,
      indexColumn: index,
      actionColumn: action,
      operateRowList,
      operateColumnList,
      indexColumnHidden: getAttrValue({ node: index, key: 'hidden' }) ?? false,
      actionColumnHidden: getAttrValue({ node: action, key: 'hidden' }) ?? false,
    });
    this.updateFieldList();
    this.updateActionBtnList();
    this.updateActionLinkList();
  },
  mounted() {
    eventBus.on('updateFieldList', this.updateFieldList);

    this.$once('hook:beforeDestroy', () => {
      eventBus.off('updateFieldList', this.updateFieldList);
    });
  },
  methods: {
    getSelectableComponents() {
      this.selectableComponents = componentMaterials
        .flatMap((item) => item.components)
        .filter((item) => sharedUtils.allowAddNodeTags.includes(item.tagName))
        .map(({ icon, title, tagName, block }) => ({
          icon,
          title,
          tagName,
          block,
        }));
    },
    updateFieldList() {
      this.fieldList = this.getSubFormFieldList();
    },
    getSubFormFieldList() {
      return this.subForm.children
        .map((item) => {
          if (!getAttrValue({ node: item, key: 'subFormInitialColumn' })) {
            const labelNode = sharedUtils.getSubFormColumnLabelNode(item),
              controlNode = sharedUtils.getSubFormColumnControlNode(item);
            return {
              icon: this.selectableComponents.find((item) => item.tagName === controlNode.tag)?.icon,
              label: getAttrValue({ node: labelNode, key: 'text' }),
              node: item,
            };
          }
        })
        .filter(Boolean);
    },
    async selectRenderList(item) {
      const hasError = await batchOperate(this.selectedNode.view, '添加子表单字段', async () => {
        const { action: actionNode } = sharedUtils.getSubFormNodeList(this.selectedNode);
        const info = {
          ...item,
          actionMsg: '添加子表单字段',
          nodePath: actionNode.nodePath,
          position: 'insertBefore',
          resetSelectedNode: true,
        };
        eventBus.emit('addBlock', info);
      });
      if (hasError) {
        this.$message.error('添加子表单字段失败');
      } else {
        this.updateFieldList();
      }
    },
    // 处理初始化列显示状态
    handleInitialColumnDisplayStatus(type, hidden) {
      const column = type === 'index' ? this.indexColumn : this.actionColumn;
      this[`${type}ColumnHidden`] = !hidden;
      setAttrValue({ node: column, key: 'hidden', value: !hidden, type: 'static' });
    },
    // 处理字段标题
    handleFieldTitle(value, item) {
      const labelNode = sharedUtils.getSubFormColumnLabelNode(item.node);
      if (labelNode) {
        setAttrValue({ node: labelNode, key: 'text', value });
      }
    },
    // 删除字段
    async handleDelField(item) {
      const hasError = await batchOperate(this.view, '删除子表单字段', async () => {
        utils.onDelSubFormColumn(item.node);
      });
      if (hasError) {
        this.$message.error('删除子表单字段失败');
      } else {
        this.updateFieldList();
      }
    },
    // 处理所有拖拽放置逻辑
    async onDrop(event, targetNode, originNode, position, handler) {
      const hasError = await batchOperate(this.view, '移动子表单字段', async () => {
        // step1: 移动节点
        const originColumnNode = originNode.item.node,
          targetColumnNode = targetNode.item.node;
        if (originColumnNode && targetColumnNode) {
          originColumnNode.moveNode({
            sourceNode: targetColumnNode,
            position,
          });
        }
      });
      if (hasError) {
        this.$message.error('移动子表单字段失败');
      } else {
        // step2: 更新对应列表
        typeof handler === 'function' && handler();
      }
    },
    updateActionBtnList() {
      this.actionBtnList = this.getSubFormOperateBtnOrLinkList('btn');
    },
    updateActionLinkList() {
      this.actionLinkList = this.getSubFormOperateBtnOrLinkList('link');
    },
    getSubFormOperateBtnOrLinkList(type = 'btn') {
      const target = type === 'btn' ? this.operateRowList : this.operateColumnList;
      const list = type === 'btn' ? btnBasicList : linkBasicList;
      return target.children.map((item) => {
        const type = getAttrValue({ node: item, key: 'subFormBtnType' });
        return {
          type,
          label: getAttrValue({ node: item, key: 'text' }),
          color: getAttrValue({ node: item, key: 'color' }) || 'default',
          node: item,
          typeName: list?.find((m) => m?.type === type)?.label,
          hide: (item?.staticStyle || '').includes(' display: none;'),
        };
      });
    },
    selectOperateBtnOrLink(item, type = 'btn') {
      if (!item.hide) return;
      this.changeDisplayStatus(item.node, false);
      this.updateBtnOrLinkList(type);
    },
    // 更新操作按钮配置（text:显示名; color:样式类型）
    updateConfig(value, item, type = 'text') {
      setAttrValue({ node: item.node, key: type, value });
      this.updateBtnOrLinkList(item.operateType);
    },
    updateBtnOrLinkList(type) {
      if (type === 'btn') {
        this.updateActionBtnList();
      } else if (type === 'link') {
        this.updateActionLinkList();
      }
    },
    handleEditOption(event, item, type = 'btn') {
      console.log('handleEditOption', item);
      this.activeOption = { ...item, operateType: type };
      this.triggerElement = event.target;
      this.$refs.virtualPopover.show();
    },
    onDelOperateBtnOrLink(item, type = 'btn') {
      this.changeDisplayStatus(item.node, true);
      this.updateBtnOrLinkList(type);
    },
    // 改变显示状态
    changeDisplayStatus(node, status) {
      const originStyle = node?.staticStyle || '';
      const hasStylePrefix = originStyle.includes('--custom-start: auto;');
      const newStaticStyle = status
        ? hasStylePrefix
          ? `${originStyle} display: none;`
          : `${originStyle}--custom-start: auto; display: none;`
        : `${originStyle.replace(' display: none;', '')}`;
      node?.update({
        staticStyle: newStaticStyle,
      });
    },
    handleClosePopover() {
      this.$refs.virtualPopover.hide();
      this.triggerElement = null;
      this.activeOption = {};
    },
    handDropAreaOver(event) {
      const originType = eventBus.request('getDragTagName');
      if (sharedUtils.allowAddNodeTags.includes(originType)) {
        event.dataTransfer.dropEffect = 'copy';
        event.currentTarget.setAttribute('active', true);
      } else {
        event.dataTransfer.dropEffect = 'none';
        event.currentTarget.setAttribute('disabled', true);
      }
    },
    handleDropAreaDragLeave(event) {
      const dropArea = this.$refs.dropAreaRef;
      if (!dropArea) return;
      const relatedTarget = event.relatedTarget;
      if (!relatedTarget || !dropArea.contains(relatedTarget)) {
        dropArea.removeAttribute('disabled');
      }
    },
    handleDropAreaDrop(event) {
      // step1: 清除active状态
      if (this.$refs.dropAreaRef.getAttribute('active')) {
        this.$refs.dropAreaRef.removeAttribute('active');
      }
      // step2: 获取拖拽数据,添加子表单字段
      const info = event.dataTransfer.getData('application/json');
      if (info) {
        const { tagName } = JSON.parse(info);
        const material = this.selectableComponents.find((item) => item.tagName === tagName);
        material && this.selectRenderList(material);
      }
    },
  },
};
</script>

<style lang="scss" module>
.root {
  width: 100%;
  font-size: 12px;

  .leftAttributeTitle {
    user-select: none;
    color: #555555;
  }

  .underline {
    border-width: 0px 0px 1px 0px;
    border-style: dashed;
    border-color: #c9cdd4;
  }

  .spaceBetweenSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 2px; */
    height: 30px;
  }

  .fieldInput {
    flex: 1;
    [class*='el-input__inner'] {
      height: 26px;
      line-height: 26px;
    }
  }

  .fieldSection {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
    height: 36px;
  }

  .renderListIcon {
    font-size: 18px;
    margin-right: 6px;
  }

  .renderListIcon svg {
    display: block;
  }

  .operateButton {
    width: 24px;
    height: 24px;
    line-height: 28px;
  }

  .dropArea {
    width: 248px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px dashed #dadee8;
    margin: 4px auto;
    color: #555555;
  }

  .dropArea:hover,
  .dropArea[active] {
    border-color: #3377ff;
    color: #3377ff;
    background: #edf3ff;
  }

  .dropArea[disabled] {
    border-color: #ff4d4d;
    color: #ff4d4d;
    background: #ffebeb;
  }

  .dropArea:hover .dropAreaIcon,
  .dropArea[active] .dropAreaIcon {
    color: #3377ff;
  }

  .dropArea[disabled] .dropAreaIcon {
    color: #ff4d4d;
  }

  .dropAreaIcon {
    color: #999999;
    margin-right: 4px;
  }
}
</style>

<style lang="scss">
.cw-form-designer-library-sub-form-popover {
  padding: 8px 0;
  font-size: 12px;

  .renderListSection {
    height: 28px;
    line-height: 28px;
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    justify-content: start;
    align-items: center;
    user-select: none;
  }

  .renderListIcon {
    font-size: 18px;
    margin-right: 6px;
  }

  .renderListIcon svg {
    display: block;
  }

  .btnSelectSection {
    /* width: 96px; */
    padding: 10px 12px;
  }

  .btnSelectSection[disabled] {
    user-select: none;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .renderListSection:hover,
  .btnSelectSection:hover {
    background-color: #cddeff;
  }
}
</style>
