<template>
  <div :class="$style.root">
    <div :class="$style.dataPermission">
      <div v-for="(entity, entityIndex) in dataPermission" :key="entityIndex" :class="$style.entityBlock">
        <div :class="$style.entityTitle">{{ entity.name }}</div>
        <div :class="$style.entityPermissionRow">
          <div :class="$style.entityPermissionLabel">实体权限</div>
          <u-radios :value.sync="entity.permission" :class="$style.radioGroup">
            <u-radio
              v-for="(option, optionIndex) in entityPermissionList"
              :key="optionIndex"
              :label="option.value"
            >
              <template #item>
                <u-text :text="option.label"></u-text>
              </template>
            </u-radio>
          </u-radios>
        </div>
        <div v-for="(property, propertyIndex) in entity.properties" :key="propertyIndex" :class="$style.propertyRow">
          <div :class="$style.propertyName">{{ property.name }}</div>
          <u-radios :value.sync="property.permission" :class="$style.radioGroup">
            <u-radio
              v-for="(option, optionIndex) in propertyPermissionList"
              :key="optionIndex"
              :label="option.value"
            >
              <template #item>
                <u-text :text="option.label"></u-text>
              </template>
            </u-radio>
          </u-radios>
        </div>
      </div>
    </div>
    <cw-form-template-render
      ref="formTemplateRender"
      :initLayout="initLayout"
      :initData="initData"
      :dataPermission="currentDataPermission"
      @renderSuccess="onRenderSuccess"
      @renderFailed="onRenderFailed"
    ></cw-form-template-render>
  </div>
</template>

<script>
import { initLayout, initData, dataPermission } from './config2';
export default {
  name: 'ExamplesDemo1',
  data() {
    return {
      entityPermissionList: [
        {
          label: '可编辑',
          value: 'editable',
        },
        {
          label: '只读',
          value: 'readonly',
        },
      ],
      propertyPermissionList: [
        {
          label: '可编辑',
          value: 'editable',
        },
        {
          label: '隐藏',
          value: 'hidden',
        },
        {
          label: '预览',
          value: 'preview',
        },
        {
          label: '只读',
          value: 'readonly',
        },
        {
          label: '禁用',
          value: 'disabled',
        },
      ],
      initLayout,
      initData: JSON.stringify(initData),
      dataPermission,
      currentDataPermission: undefined,
    };
  },
  watch: {
    dataPermission: {
      handler(newVal) {
        this.currentDataPermission = JSON.stringify(newVal);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async validate() {
      const valid = await this.$refs.formJsonRender.validate('submit', false);
      console.log('validate', valid);
    },
    async getFormData() {
      const formData = await this.$refs.formJsonRender.getFormData();
      console.log('getFormData', formData);
    },
    onRenderSuccess(event) {
      console.log('onRenderSuccess', event);
    },
    onRenderFailed(event) {
      console.log('onRenderFailed', event);
    },
  },
};
</script>

<style module>
.root {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.dataPermission {
  width: 600px;
  min-width: 600px;
  padding: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: #fff;
  max-height: 100vh;
  overflow-y: auto;
}

.entityBlock {
  margin-bottom: 24px;
}

.entityBlock:last-child {
  margin-bottom: 0;
}

.entityTitle {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}

.entityPermissionRow {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e5e5e5;
  gap: 12px;
}

.entityPermissionLabel {
  width: 100px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex-shrink: 0;
}

.propertyRow {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.propertyRow:last-child {
  margin-bottom: 0;
}

.propertyName {
  width: 100px;
  font-size: 14px;
  color: #333;
  flex-shrink: 0;
}

.radioGroup {
  flex: 1;
}
</style>
