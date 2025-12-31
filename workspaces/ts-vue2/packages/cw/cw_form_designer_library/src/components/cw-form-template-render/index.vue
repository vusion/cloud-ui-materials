<template>
  <div :class="$style.root" ref="rootRef" :renderError="renderError">
    <div v-if="inIDE" :class="$style.designer">表单模版渲染器</div>
    <component ref="viewNodeRef" v-if="dynamicComponent && !renderError" :initData="currentData" :is="dynamicComponent" :key="componentKey" />
    <div v-else-if="renderError" :class="$style.errorBox">渲染出错! 请检查模板是否正确</div>
  </div>
</template>
<script>
import Vue from 'vue';
import { compile, parseComponent } from 'vue-template-compiler';
import * as FormDesignerComponents from './componetns/inidex.js';
import { UNumberInput } from 'virtual-lcap:lcap-ui';

export default {
  name: 'cw-form-template-render',
  provide() {
    if (this.type === 'designer') {
      return {
        $env: {
          ...this.$env,
          VUE_APP_DESIGNER: true,
          emptyDataSourceTip: '请添加选项或绑定数据源',
        },
      };
    }
  },
  props: {
    type: {
      type: String,
      default: 'render',
    },
    initLayout: {
      type: String,
    },
    initData: {
      type: String,
      default: '{}',
    },
    dataPermission: {
      type: String,
    },
  },
  data() {
    return {
      dynamicComponent: null,
      componentKey: 0,
      renderError: false,
      inIDE: this.$env?.VUE_APP_DESIGNER ?? false,
      currentData: {},
      formNode: null,
      renderLayout: '', // 经过权限处理后的模版
    };
  },
  watch: {
    initLayout: {
      handler(newVal, oldVal) {
        // console.log('initLayout变化', newVal, oldVal);
        if (newVal === oldVal) return;
        // 强制销毁旧组件实例（通过改变 key）
        this.componentKey += 1;
        // 清理旧组件构造函数
        this.dynamicComponent = null;
        // 如果有新值，在下一个tick中创建新组件，确保旧组件完全卸载
        if (newVal) {
          // 确保 currentData 已更新（在创建组件前）
          this.currentData = this.getCurrentData();
          this.$nextTick(() => {
            this.compileAndRender(newVal);
          });
        }
      },
      immediate: true,
    },
    initData: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return;

        this.currentData = this.getCurrentData();
        if (this.dynamicComponent && this.$refs.viewNodeRef) {
          this.componentKey += 1;
        }
      },
    },
    dataPermission: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return;
        this.compileAndRender(this.initLayout);
      },
    },
  },
  methods: {
    // ================================ 组件 Method ===============================
    // ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓    ↓    ↓
    // ===========================================================================
    async validate(trigger = 'submit', muted = false) {
      if (this.formNode) {
        return await this.formNode.validate(trigger, muted);
      }
      console.error('cw-form-template-render组件, validate失败: 未找到form节点');
    },
    getFormData() {
      if (this.formNode) {
        return this.$refs.viewNodeRef.currentData;
      }
      console.error('cw-form-template-render组件, getFormData失败: 未找到form节点');
    },
    // ===========================================================================
    // ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑    ↑    ↑   ↑
    // ================================ 组件 Method ===============================
    getCurrentData() {
      try {
        return JSON.parse(this.initData) || {};
      } catch (e) {
        console.error('cw-form-template-render组件, initData解析失败:', e);
        return {};
      }
    },
    compileAndRender(templateString) {
      if (!templateString) {
        console.error('cw-form-template-render 组件: 模板字符串为空，无法渲染');
        return;
      }
      this.renderError && (this.renderError = false);

      try {
        if (this.type === 'designer') {
          this.compileForDesigner();
        } else {
          this.compileForRender();
        }
        this.$nextTick(() => {
          this.renderSuccess();
          this.formNode = this.$refs.rootRef?.querySelector?.('[formTemplateRenderRef]')?.__vue__;
        });
      } catch (e) {
        this.handleVueError(e);
      }
    },

    compileForDesigner() {
      const compiled = Vue.compile(this.initLayout);
      // 设计模式下，某些组件（比如：文件上传，单选组，多选组）需要提供画布环境变量$env，
      // ⚠️：原方案是沙箱隔离，这里直接fork原组件代码，添加$env的inject
      this.dynamicComponent = Vue.extend({
        components: { ...FormDesignerComponents },
        render: compiled.render,
        staticRenderFns: compiled.staticRenderFns,
      });
    },
    compileForRender() {
      this.renderLayout = this.handleDataPermission();
      const descriptor = parseComponent(this.renderLayout);
      let render = null;
      let staticRenderFns = [];

      // 编译template
      if (descriptor.template) {
        const compiled = compile(descriptor.template.content);
        render = typeof compiled.render === 'string' ? new Function(compiled.render) : compiled.render;
        staticRenderFns = Array.isArray(compiled.staticRenderFns)
          ? compiled.staticRenderFns.map((fn) => (typeof fn === 'string' ? new Function(fn) : fn))
          : [];
      }

      // 执行script
      let componentOptions = {};
      if (descriptor.script) {
        componentOptions = this.executeScript(descriptor.script.content);
      }

      this.dynamicComponent = Vue.extend({
        components: { 'u-number-input-decimal': UNumberInput }, // 需要额外注册小数输入组件
        ...componentOptions,
        ...(render ? { render, staticRenderFns } : {}),
      });
    },
    handleDataPermission() {
      if (!this.dataPermission) return this.initLayout;
      try {
        const permissions = JSON.parse(this.dataPermission);
        if (!Array.isArray(permissions) || permissions.length === 0) {
          return this.initLayout;
        }
        // 建立权限映射表：包含实体级别和属性级别的权限
        const { propertyMap, entityMap } = this.buildPermissionMap(permissions);
        // 统一处理数据权限（主表单和子表单）
        return this.processDataPermissions(this.initLayout, entityMap, propertyMap);
      } catch (e) {
        console.error('cw-form-template-render组件, dataPermission解析失败:', e);
        return this.initLayout;
      }
    },
    /**
     * 建立权限映射表
     * @param {Array} permissions - 权限配置数组
     * @returns {Object}
     */
    buildPermissionMap(permissions) {
      const propertyMap = {}; // 属性级别权限：{ entityName: { propertyName: permission } }
      const entityMap = {}; // 实体级别权限：{ entityName: permission }
      permissions.forEach(({ name: entityName, permission, properties }) => {
        if (!entityName) return;
        // 构建实体级别权限
        if (permission) entityMap[entityName] = permission;
        // 构建属性级别权限
        if (Array.isArray(properties) && properties.length > 0) {
          propertyMap[entityName] = properties.reduce((acc, { name, permission: propPermission }) => {
            if (name) {
              acc[name] = propPermission ?? permission;
            }
            return acc;
          }, {});
        }
      });
      return { propertyMap, entityMap };
    },

    /**
     * 统一处理数据权限（主表单和子表单）
     * @param {string} template - 模板字符串
     * @param {Object} entityMap - 实体级别权限映射表：{ entityName: permission }
     * @param {Object} propertyMap - 属性级别权限映射表：{ entityName: { propertyName: permission } }
     * @returns {string} - 处理后的模板
     */
    processDataPermissions(template, entityMap, propertyMap) {
      const subFormBindEntityRegex = /subFormBindEntity\s*=\s*["']([^"']+)["']/;

      // 匹配所有 u-form-item（主表单和子表单都用 u-form-item 包裹）
      return template.replace(/(<u-form-item[^>]*>[\s\S]*?<\/u-form-item>)/g, (formItemBlock) => {
        // 检查是否有 subFormBindEntity 属性(子表单)
        const subFormEntityName = formItemBlock.match(subFormBindEntityRegex)?.[1];
        if (subFormEntityName) {
          const entityPermission = entityMap[subFormEntityName];
          const propertyPermission = propertyMap[subFormEntityName];

          // 如果权限配置存在，处理子表单权限
          if (entityPermission && propertyPermission) {
            return this.processSubFormPermission(formItemBlock, subFormEntityName, entityPermission, propertyPermission);
          }

          console.error(`cw-form-template-render组件, 子表单绑定实体: ${subFormEntityName} 不存在`);
          return formItemBlock;
        } else {
          // 主表单
          return this.processFormItemPermission(formItemBlock, entityMap, propertyMap);
        }
      });
    },
    processSubFormPermission(formItemBlock, entityName, enityPermission, propertyPermission) {
      // step1：子表单整体只读时，删除可操作行和列
      if (enityPermission === 'readonly') {
        // 匹配所有 operateType 属性的位置，然后倒序遍历
        const operateTypeMatches = Array.from(formItemBlock.matchAll(/operateType\s*=\s*["'][^"']+["']/g));
        // 倒序遍历，从后往前删除标签块（避免索引变化影响）
        for (let i = operateTypeMatches.length - 1; i >= 0; i--) {
          const operateTypeIndex = operateTypeMatches[i].index;
          // 在 operateType 之前查找最近的标签开始位置和标签名
          const tagMatches = Array.from(formItemBlock.substring(0, operateTypeIndex).matchAll(/<([a-zA-Z][\w-]*)\s/g));
          if (tagMatches.length > 0) {
            const { index: startIndex, 1: tagName } = tagMatches[tagMatches.length - 1];
            const closingTag = `</${tagName}>`;
            const closingIndex = formItemBlock.indexOf(closingTag, startIndex);
            // 查找对应的闭合标签并删除整个标签块
            if (closingIndex !== -1) {
              formItemBlock = formItemBlock.substring(0, startIndex) + formItemBlock.substring(closingIndex + closingTag.length);
            }
          }
        }
      }
      // step2：遍历propertyPermission，对每个属性进行权限处理，检查formItemBlock是否有对应属性
      return formItemBlock.replace(/(<u-table-view-column[^>]*>[\s\S]*?<\/u-table-view-column>)/g, (columnBlock) => {
        // 提取 field 属性值
        const fieldMatch = columnBlock.match(/field\s*=\s*["']([^"']+)["']/);
        if (fieldMatch && fieldMatch[1]) {
          const fieldName = fieldMatch[1];
          const permission = propertyPermission[fieldName];
          // 如果该字段有权限配置，应用权限
          if (permission) {
            const res = this.applyPermission(columnBlock, new RegExp(`:value(\\.sync)?="current\\.item\\.${fieldName}"`), permission);
            return res;
          }
        }
        return columnBlock;
      });
    },
    processFormItemPermission(formItemBlock, entityMap, propertyMap) {
      // 匹配主表单字段绑定：:value.sync="xxx.yyy" 或 :value="xxx.yyy"，提取绑定路径
      const fieldMatch = formItemBlock.match(/:value(\.sync)?="([^"]+)"/);
      if (!fieldMatch?.[2]) return formItemBlock;

      const bindingPath = fieldMatch[2]; // 完整绑定路径，如 Form_482bd3cd.property1
      const [entityName, propertyName] = bindingPath.split('.');

      // 查找权限配置并应用权限
      const permission = propertyMap[entityName]?.[propertyName];
      if (entityMap[entityName] && permission) {
        return this.applyPermission(formItemBlock, new RegExp(`:value(\\.sync)?="${bindingPath}"`), permission);
      }
      console.error(`cw-form-template-render组件, 主表单绑定字段: ${bindingPath} 不存在`);
      return formItemBlock;
    },
    /**
     * 应用权限到代码块
     * @param {string} block - 代码块
     * @param {RegExp|string} pattern - 正则表达式或字符串模式
     * @param {string} permission - 权限类型
     * @returns {string} - 处理后的代码块
     */
    applyPermission(block, pattern, permission) {
      if (permission === 'hidden') {
        return ''; // hidden: 直接返回空字符串
      } else if (permission === 'editable') {
        return block; // editable: 直接返回原代码块
      } else if (['disabled', 'preview', 'readonly'].includes(permission) && pattern instanceof RegExp) {
        // 其他权限类型，在匹配的代码块后添加权限属性
        return block.replace(pattern, (match) => {
          return `${match} ${permission}`;
        });
      }
      return block;
    },
    executeScript(scriptContent) {
      const exports = {};
      const module = { exports };

      const require = (id) => {
        if (id === 'vue') return Vue;
        if (id.indexOf('.vue') !== -1) return {};
        throw new Error(`Cannot find module '${id}'`);
      };

      let code = scriptContent
        .replace(/import\s+(\w+)\s+from\s+['"](.+?)['"];/g, (_, varName, path) => `const ${varName} = require('${path}');`)
        .replace(/export\s+default\s+/, 'module.exports.default = ');

      new Function('Vue', 'exports', 'module', 'require', code)(Vue, exports, module, require);
      return module.exports.default || module.exports;
    },

    renderSuccess() {
      this.$emit('renderSuccess', { type: this.type, initLayout: this.initLayout, initData: this.initData });
    },
    handleVueError(err) {
      console.error('cw-form-template-render组件, compileAndRender编译失败:', err);
      this.renderError = true;
      this.dynamicComponent = null;
      this.$emit('renderFailed', { type: this.type, initLayout: this.initLayout, initData: this.initData });
    },
  },
};
</script>
<style module>
.root {
  background: #fff;
  min-height: 400px;
}

.errorBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: #fff;
  color: #a8071a;
}

.designer {
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #111;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
</style>
