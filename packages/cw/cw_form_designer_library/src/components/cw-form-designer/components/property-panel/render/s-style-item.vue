<template>
  <div>
    <u-group-attr-panel title="自定义" :is-expanded="true">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="formRules" :inline-message="true">
        <el-form-item prop="customStyle">
          <el-input
            type="textarea"
            :placeholder="customInputExplain"
            v-model="ruleForm.customStyle"
            rows="5"
            @blur="handleCustomStyleBlur"
          ></el-input>
          <!-- <template #error="{ error }">
            <div class="customStyleError">{{ error }}</div>
          </template> -->
        </el-form-item>
      </el-form>
    </u-group-attr-panel>
  </div>
</template>

<script>
import { parse } from 'postcss';
export default {
  name: 'SStyleItem',
  props: {
    selectedNode: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      ruleForm: {
        customStyle: '',
      },
      formRules: {
        customStyle: [{ validator: this.isValidCustomStyle, trigger: 'blur' }],
      },
      customInputExplain: '可以填写符合css语法规范的代码，例如：\r\ncolor: red; \r\nborder: 1px solid red;',
    };
  },
  watch: {
    staticStyle: {
      handler(newVal) {
        this.resetInputVal();
      },
      immediate: true,
    },
  },
  computed: {
    staticStyle() {
      return JSON.parse(JSON.stringify(this.selectedNode?.staticStyle || {}));
    },
  },
  methods: {
    isValidCustomStyle(rule, customStyle, callback) {
      if (!customStyle || customStyle.trim() === '') {
        callback();
      }
      try {
        const ast = parse(customStyle);

        const nodes = ast.nodes;
        const allDecl = nodes?.every((node) => node.type === 'decl');
        const callbackInfo = allDecl ? undefined : '代码有误，请及时调整或删除！为避免影响其他样式生效，当前代码在重启IDE后会自动删除！';
        callback(callbackInfo);
      } catch (error) {
        callback('代码有误，请及时调整或删除！为避免影响其他样式生效，当前代码在重启IDE后会自动删除！');
      }
    },
    resetInputVal() {
      this.ruleForm.customStyle = this.getStyleAttr('customStyle');
    },
    handleCustomStyleBlur() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          this.updateStyleAttr('customStyle', this.ruleForm.customStyle);
        }
      });
    },
    updateStyleAttr(name, value = null) {
      const allStyleObj = this.getStyleObjectInNasl();
      const styleObj = allStyleObj.styleObj;
      const customStyleObj = allStyleObj.customStyleObj;

      if (name === 'customStyle') {
        const valueObj = this.parseStyleToObject(value);
        Object.keys(valueObj).forEach((key) => {
          delete styleObj[key];
        });
        allStyleObj.customStyle = value;
      } else {
        if (value === null || value === undefined || value === '') {
          delete styleObj[name];
        } else {
          styleObj[name] = value; // update new value
        }
        // 删除自定义框里相同的属性
        if (customStyleObj[name]) {
          delete customStyleObj[name];
          allStyleObj.customStyle = this.stringifyStyleObject(customStyleObj);
        }
      }

      let newStyleStr = this.stringifyStyleObject(styleObj);
      if (allStyleObj.customStyle) {
        // 说明有更改
        newStyleStr = `${newStyleStr} --custom-start: auto; ${allStyleObj.customStyle}`;
      }
      this.selectedNode.setStaticStyle(newStyleStr); // 更新静态样式
    },
    stringifyStyleObject(styleObj) {
      return Object.keys(styleObj)
        .map((key) => `${key}:${String(styleObj[key]).trim()};`)
        .join('');
    },

    /**
     * 解析出自定义输入框里的样式和其他设置的样式
     * 自定义的样式可能和其他设置里的重复，有些情况需要处理
     */
    getStyleObjectInNasl() {
      const styleStr = this.getStaticStyle();
      const arr = styleStr.split('--custom-start: auto;');
      const customStyle = (arr[1] || '').trim();

      const style = {
        styleObj: this.parseStyleToObject(arr[0]),
        customStyleObj: this.parseStyleToObject(customStyle), // 自定义
        customStyle, // 这个是保留自定义里原本的文本。处理过的会把换成等去掉，会更改了样式。这里尽量不去更改customStyle
      };
      return style;
    },
    parseStyleToObject(styleStr = '') {
      const styleObj = styleStr.split(/;/gim).reduce((obj, item) => {
        // background-image:url(http://www...)
        item = item.trim();
        const pos = item.indexOf(':');
        if (pos >= 0) {
          const key = item.slice(0, pos).trim();
          const value = item.slice(pos + 1).trim();
          obj[key] = value;
        }
        return obj;
      }, {});
      return styleObj;
    },
    getStyleAttr(name) {
      const styleObj = this.getStyle();
      if (name === 'customStyle') return styleObj?.[name];
    },
    getStaticStyle() {
      return this.selectedNode.staticStyle || '';
    },
    getStyle() {
      const styleStr = this.getStaticStyle();
      return this.parseStyleAttr(styleStr);
    },
    parseStyleAttr(styleStr) {
      if (!styleStr) {
        return {};
      }
      const arr = styleStr.split('--custom-start: auto;');
      const customStyle = (arr[1] || '').trim();
      styleStr = arr[0];

      const styleObj = styleStr.split(/;/gim).reduce((obj, item) => {
        // background-image:url(http://www...)
        item = item.trim();
        const pos = item.indexOf(':');
        if (pos >= 0) {
          const key = item.slice(0, pos).trim();
          const value = item.slice(pos + 1).trim();
          obj[key] = value;
        }
        return obj;
      }, {});

      styleObj.customStyle = customStyle || '';
      return styleObj;
    },
  },
};
</script>
